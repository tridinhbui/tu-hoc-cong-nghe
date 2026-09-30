import type { Lesson } from "../lesson-types";

// Chặng 49, bài 1-5. Giáo trình: scripts/curriculum/stage-49.json.
// Nội dung khái niệm chung, không dựa vào tính năng riêng của công cụ nào.
export const S49_A_LESSONS: Lesson[] = [
  {
    "id": 2380,
    "slug": "noi-vao-dien-thoai-mot-phut-thanh-email-gon",
    "title": "Chặng 49, Bài 1: Nói vào điện thoại một phút, ra một email gọn",
    "subtitle": "Nói ý chính ngay trên taxi, nhờ AI sắp thành ba câu, rồi bạn đọc lại trước khi bấm gửi.",
    "duration": "8 phút",
    "difficulty": "Dễ",
    "emoji": "🎙️",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Ngay sau buổi gặp khách là lúc bạn nhớ rõ nhất, nhưng cũng là lúc tay đang xách cặp, mắt nhìn đường. Nói ra ý chính rồi để AI sắp thành email giúp bạn gửi thư cảm ơn trong vài phút thay vì để đến tối. Điều cần giữ là bước đọc lại: lời nói miệng hay lộn xộn, và AI dễ thêm điều bạn chưa nói.",
    "openingQuestion": "Bạn vừa ra khỏi buổi gặp khách và đang ngồi trên taxi. Bạn muốn gửi thư cảm ơn ngay. Cách nào vừa nhanh vừa an toàn?",
    "openingOptions": [
      "Nói ý chính vào điện thoại, nhờ AI sắp thành email ngắn rồi đọc lại trước khi gửi",
      "Nói một mạch cho AI rồi bấm gửi luôn vì AI chắc chắn hiểu đúng ý",
      "Đợi về văn phòng rồi gõ lại từ đầu vì nói vào điện thoại không dùng được",
      "Nhờ AI tự nghĩ nội dung thư cảm ơn để bạn khỏi phải nhớ lại buổi gặp"
    ],
    "correctOption": 0,
    "explanation": "Lời nói là nguyên liệu thô: có chỗ lặp, chỗ ngập ngừng, có khi nhầm tên. AI sắp nguyên liệu đó thành đoạn văn gọn, còn bạn là người biết điều gì thật sự đã hứa với khách. Vì vậy phải đọc lại. Gửi luôn thì nếu máy nghe nhầm tên hay AI thêm một cam kết, thư đã đi rồi. Gõ lại từ đầu thì bỏ phí khoảnh khắc nhớ rõ nhất. Để AI tự nghĩ nội dung thì thư không còn là của buổi gặp đó.",
    "diagram": [
      {
        "label": "Nói ý chính: tên người, điều đã thống nhất, bước tiếp theo",
        "arrow": true
      },
      {
        "label": "Máy chép lời nói thành chữ",
        "arrow": true
      },
      {
        "label": "AI sắp thành email ba câu, không thêm ý mới",
        "arrow": true
      },
      {
        "label": "Bạn đọc lại tên, con số, lời hẹn rồi mới gửi"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: chị Thu làm kinh doanh, ra khỏi buổi gặp một cửa hàng lúc 4 giờ chiều. Trên taxi chị nói vào điện thoại khoảng một phút: tên người gặp, hai điều đã thống nhất và hẹn gửi báo giá vào thứ Năm. AI sắp thành email ba câu. Khi đọc lại, chị thấy máy chép nhầm tên cửa hàng và AI viết thêm câu hứa giảm giá mà chị chưa hề nói. Chị sửa hai chỗ rồi gửi trước khi về tới văn phòng."
    },
    "quiz": [
      {
        "question": "Vì sao phải đọc lại email AI soạn từ lời nói của bạn trước khi gửi?",
        "options": [
          "Vì AI có thể thêm cam kết hay con số bạn chưa nói, và bạn chịu trách nhiệm về thư",
          "Vì máy luôn chép sai chính tả ở mọi câu tiếng Việt",
          "Vì email dài quá ba câu thì người nhận không đọc",
          "Vì đọc lại giúp AI học được giọng của bạn cho lần sau"
        ],
        "correct": 0,
        "explanation": "AI sắp chữ cho trơn tru, và khi thiếu thông tin nó có xu hướng điền thêm cho đầy đủ: một ưu đãi, một ngày hẹn. Người ký tên là bạn nên bạn phải soát. Máy không sai ở mọi câu, nên 'luôn sai' là nói quá. Độ dài ba câu là lời khuyên cho gọn, không phải lý do để đọc lại. Còn việc AI có học giọng bạn hay không không liên quan tới bước soát này."
      },
      {
        "question": "Khi nói vào điện thoại để soạn email, nên nói điều gì trước tiên?",
        "options": [
          "Người nhận là ai và bạn muốn họ làm gì",
          "Toàn bộ diễn biến buổi gặp từ phút đầu tiên tới lúc chia tay",
          "Lời chào dài và lịch sự để email có vẻ trang trọng hơn",
          "Các con số chi tiết mà bạn chưa nhớ chắc, để AI điền sau"
        ],
        "correct": 0,
        "explanation": "Email công việc tốt trả lời hai câu hỏi của người nhận: ai gửi, và mình cần làm gì. Kể toàn bộ diễn biến làm thư dài và lẫn ý. Lời chào AI tự thêm được nên không cần nói. Con số bạn chưa chắc thì đừng đọc lên, vì AI sẽ chép nó như điều chắc chắn; hãy tự điền sau khi kiểm."
      },
      {
        "question": "Bạn nói 'hẹn gửi báo giá thứ Năm' nhưng bản AI viết 'trong hôm nay'. Nên xử lý thế nào?",
        "options": [
          "Sửa lại đúng thứ Năm rồi mới gửi",
          "Giữ 'hôm nay' vì AI thường tính ngày đúng hơn bạn",
          "Xoá cả câu hẹn đó để thư khỏi có chỗ nào sai",
          "Gửi luôn rồi nhắn đính chính khi khách có hỏi lại"
        ],
        "correct": 0,
        "explanation": "Lời hẹn là thứ khách sẽ nhớ và dùng để trách bạn nếu sai. AI không biết lịch của bạn nên không có cơ sở để 'tính đúng hơn'. Xoá câu hẹn làm thư mất phần quan trọng nhất. Gửi sai rồi đính chính thì khách đã đọc bản sai và tin vào nó."
      },
      {
        "question": "Nói nhanh trên taxi ồn ào khiến máy chép nhầm tên khách. Cách nào giảm lỗi tốt nhất?",
        "options": [
          "Nói tên chậm, rõ, rồi đối chiếu với danh thiếp hay lịch hẹn khi đọc lại",
          "Nói to hơn và nhanh hơn để máy kịp bắt từng chữ",
          "Bỏ tên khách ra khỏi thư để khỏi phải lo chép sai",
          "Nhờ AI đoán tên đúng dựa trên ngữ cảnh của cuộc họp"
        ],
        "correct": 0,
        "explanation": "Tên riêng là loại từ máy khó đoán nhất vì không có trong ngữ cảnh. Nói chậm giúp chép đúng hơn, và đối chiếu với nguồn thật như danh thiếp mới chắc chắn. Nói to, nói nhanh không giúp gì trong chỗ ồn. Thư không có tên trông xa cách. AI đoán tên sẽ chọn một cái nghe hợp lý chứ không phải tên thật."
      },
      {
        "question": "Điều nào nên giữ ngoài đoạn bạn nói vào một ứng dụng AI chưa được công ty cho phép?",
        "options": [
          "Số hợp đồng, giá đã thoả thuận và thông tin nội bộ của khách",
          "Lời cảm ơn và lời chào chung chung",
          "Tên của chính bạn, chức danh công khai và địa chỉ công ty của bạn",
          "Việc bạn hẹn gặp lại khách vào đầu tuần sau"
        ],
        "correct": 0,
        "explanation": "Email cảm ơn chỉ cần ý chung. Số hợp đồng, giá và thông tin nội bộ của khách là dữ liệu kinh doanh, nên đưa vào công cụ nào là việc bộ phận IT hoặc quản lý quyết định, không phải bạn tự đoán. Lời cảm ơn, tên của bạn và lời hẹn gặp lại đều là những chi tiết người nhận vốn sẽ thấy trong thư."
      }
    ],
    "keyTakeaways": [
      "Nói ý chính: người nhận, điều đã thống nhất, bước tiếp theo.",
      "AI sắp xếp chữ, bạn là người chịu trách nhiệm về nội dung.",
      "Đọc lại tên, con số, ngày hẹn trước khi gửi.",
      "Tên riêng phải đối chiếu với nguồn thật, đừng tin bản chép.",
      "Số hợp đồng, giá và thông tin nội bộ không đọc vào công cụ chưa được duyệt."
    ],
    "practicePrompt": {
      "question": "Anh Bình nói vào điện thoại, AI trả về email ba câu rất trôi chảy, trong đó có câu 'chúng tôi sẽ giảm 5% cho đơn tiếp theo'. Anh Bình không nhớ mình từng nói vậy. Việc nên làm là gì?",
      "options": [
        "Xoá câu đó, vì đó là cam kết anh chưa nói",
        "Giữ lại vì email nghe trôi chảy và có thiện chí",
        "Đổi 5% thành 3% cho an toàn hơn",
        "Gửi luôn rồi hỏi sếp sau"
      ],
      "correct": 0,
      "explanation": "Câu giảm giá là điều AI thêm cho thư có vẻ đầy đủ. Một cam kết bạn chưa từng đưa ra không được nằm trong thư. Đổi con số thì vẫn là một lời hứa tự bịa. Hỏi sếp sau khi khách đã đọc thì quá muộn, còn giữ lại vì nghe trôi chảy là nhầm độ trơn của câu văn với độ đúng của nội dung."
    },
    "summary": {
      "keyIdea": "Nói cho nhanh, để AI sắp chữ, và bạn giữ quyền duyệt từng dòng.",
      "formula": "Ý chính nói ra + AI sắp xếp + bạn đọc lại = email gọn, đúng.",
      "commonMistake": "Bấm gửi ngay vì bản AI đọc rất trôi, không nhận ra trong đó có câu bạn chưa từng nói.",
      "action": "Hôm nay thử nói một email cảm ơn trong 60 giây và đọc lại thật chậm."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Sau buổi họp hoặc cuộc gọi tiếp theo, hãy nói vào điện thoại khoảng một phút: người nhận, hai điều đã thống nhất, bước tiếp theo. Nhờ AI sắp thành email ba câu, không thêm ý mới. Rồi gạch chân tên, con số và ngày hẹn và đối chiếu với ghi chú thật trước khi gửi.",
      "secondary": "Ghi lại xem AI đã thêm điều gì bạn chưa nói, để lần sau dặn rõ hơn."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bạn vừa bước ra khỏi buổi gặp khách, chiếc taxi chưa kịp nổ máy, và trong đầu còn nguyên những gì hai bên đã nói. Đây là lúc bài học này hữu ích nhất: nói một phút thay vì gõ mười phút."
      },
      {
        "type": "feynman",
        "title": "Nói rồi nhờ AI sắp thư đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới việc bạn kể lại cho một người trợ lý ngồi cạnh: bạn nói lộn xộn, người trợ lý ghi và viết lại cho gọn, còn bạn đọc lại rồi mới ký. Điện thoại và AI đóng vai trợ lý đó, nhưng là người trợ lý rất nhanh và hơi thích thêm thắt.",
        "columns": [
          "Thành phần",
          "Người trợ lý ngồi cạnh",
          "Điện thoại và AI"
        ],
        "rows": [
          [
            "Nghe",
            "Tai người",
            "Micro chép lời nói thành chữ"
          ],
          [
            "Viết lại",
            "Người trợ lý sắp ý",
            "AI sắp thành ba câu"
          ],
          [
            "Điều dễ sai",
            "Nghe nhầm tên",
            "Chép nhầm tên, thêm ý chưa nói"
          ],
          [
            "Người ký",
            "Bạn",
            "Bạn, sau khi đọc lại"
          ]
        ],
        "oneLiner": "Nói cho nhanh, để AI sắp chữ, nhưng chữ ký vẫn là của bạn nên bạn phải đọc lại."
      },
      {
        "type": "heading",
        "text": "Bản chép lời nói trông thế nào"
      },
      {
        "type": "paragraph",
        "text": "Khi nói, bạn hay lặp, ngập ngừng, đổi ý giữa câu. Máy chép lại đúng như vậy: dài, thiếu dấu câu và đôi khi sai một tên riêng. Đó là lý do ta không gửi thẳng bản chép, mà đưa nó cho AI làm nguyên liệu để viết thành một email gọn."
      },
      {
        "type": "flow",
        "title": "Từ lời nói trên taxi đến email đã soát",
        "steps": [
          {
            "label": "Nói ý chính",
            "detail": "Nói chậm và rõ: người nhận là ai, hai điều đã thống nhất, bước tiếp theo và ngày hẹn. Không cần nói câu chào, AI sẽ thêm."
          },
          {
            "label": "Máy chép thành chữ",
            "detail": "Bạn nhìn lướt bản chép để bắt những chỗ sai lộ liễu, nhất là tên người và tên công ty."
          },
          {
            "label": "Nhờ AI sắp thành email",
            "detail": "Dặn rõ: ba câu, giọng lịch sự, chỉ dùng những gì tôi nói, không thêm ưu đãi hay ngày hẹn mới."
          },
          {
            "label": "Đọc lại từng dòng",
            "detail": "Gạch chân tên, con số, ngày. Mỗi thứ đối chiếu với danh thiếp, lịch hẹn hay ghi chú thật của bạn."
          },
          {
            "label": "Gửi",
            "detail": "Chỉ khi mọi thứ gạch chân đã khớp. Nếu còn băn khoăn thì lưu nháp và soát lại ở chỗ ngồi yên tĩnh."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Dặn AI soạn thư cảm ơn từ lời nói của bạn",
        "task": "Bạn vừa nói vào điện thoại: gặp chị Hạnh ở cửa hàng Hoa Mai, đã thống nhất giao thử 50 hộp, hẹn gửi báo giá vào thứ Năm. Hãy lắp lời dặn để AI viết email đúng ý.",
        "parts": [
          {
            "id": "source",
            "label": "Nguồn thông tin",
            "options": [
              {
                "text": "Viết email cảm ơn khách giúp tôi, AI tự nghĩ nội dung.",
                "feedback": "Không đưa ý chính nên AI bịa một buổi gặp thật chung chung, có thể nhắc cả những điều không hề diễn ra."
              },
              {
                "text": "Đây là bản chép lời tôi nói: (dán). Chỉ dùng thông tin trong đó.",
                "good": true,
                "feedback": "AI có nguyên liệu thật và bị giới hạn vào đó, nên ít có cơ hội bịa thêm."
              }
            ]
          },
          {
            "id": "shape",
            "label": "Khuôn dạng",
            "options": [
              {
                "text": "Viết email dài, đầy đủ và thật chuyên nghiệp.",
                "feedback": "Dài và chung chung thì AI lấp chỗ trống bằng câu sáo rỗng, còn người nhận phải đọc lâu mới thấy ý chính."
              },
              {
                "text": "Viết đúng ba câu: cảm ơn, nhắc điều đã thống nhất, nêu bước tiếp theo kèm ngày.",
                "good": true,
                "feedback": "Ba câu có nhiệm vụ rõ ràng, người nhận đọc nửa phút là biết phải làm gì."
              }
            ]
          },
          {
            "id": "limit",
            "label": "Điều cấm",
            "options": [
              {
                "text": "Thêm một câu hấp dẫn để khách muốn đặt hàng thêm.",
                "feedback": "Câu hấp dẫn AI tự nghĩ thường là ưu đãi hoặc lời hứa mà bạn chưa hề đưa ra."
              },
              {
                "text": "Không thêm ưu đãi, con số hay ngày hẹn nào tôi chưa nói.",
                "good": true,
                "feedback": "Chặn đúng chỗ AI hay bịa, nên bản thư chỉ có điều bạn đã thật sự hứa."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "source",
              "shape",
              "limit"
            ],
            "text": "Chào chị Hạnh,\n\nCảm ơn chị đã dành thời gian gặp em chiều nay. Hai bên đã thống nhất giao thử 50 hộp cho cửa hàng Hoa Mai.\n\nEm sẽ gửi báo giá cho chị vào thứ Năm. Có gì cần thêm chị nhắn em nhé."
          },
          {
            "requires": [
              "source"
            ],
            "text": "Chào chị Hạnh,\n\nCảm ơn chị đã gặp em. Em sẽ gửi báo giá và có ưu đãi 10% cho đơn đầu tiên của cửa hàng.\n\n(Đúng ý chính nhưng AI tự thêm ưu đãi 10% mà bạn chưa nói.)"
          },
          {
            "text": "Kính gửi Quý đối tác,\n\nChúng tôi xin chân thành cảm ơn Quý đối tác đã tin tưởng hợp tác trong suốt thời gian qua và mong tiếp tục đồng hành lâu dài...\n\n(Thư chung chung, không nhắc 50 hộp hay ngày thứ Năm.)"
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Nói vào điện thoại rồi đọc lại",
          "text": "Nhanh, làm được khi tay bận. Bản thư có ý chính đúng lúc bạn còn nhớ rõ. Cái giá là bạn phải đọc lại, vì máy có thể chép nhầm và AI có thể thêm ý."
        },
        "right": {
          "label": "Gõ tay cả bức thư",
          "text": "Chắc chữ vì từng chữ do bạn viết. Nhưng chậm, thường bị dời đến tối, khi đó bạn đã quên bớt chi tiết và khách đã chờ lâu hơn."
        }
      },
      {
        "type": "callout",
        "label": "Ba thứ luôn soát",
        "text": "Tên người và công ty, con số, ngày hẹn. Đây là ba thứ khách nhớ nhất và cũng là ba thứ dễ sai nhất khi qua máy chép và AI. Thông tin nội bộ như giá đã thoả thuận hay số hợp đồng thì đừng đọc vào công cụ chưa được công ty cho phép."
      },
      {
        "type": "scenario",
        "title": "Email cảm ơn trên taxi lúc 4 giờ chiều",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn đã nói một phút vào điện thoại, AI trả về email ba câu. Taxi còn 10 phút nữa mới tới văn phòng.",
            "choices": [
              {
                "label": "Bấm gửi ngay vì bản thư đọc rất trôi",
                "next": "bad_send"
              },
              {
                "label": "Đọc lại, gạch chân tên, con số và ngày",
                "next": "s2"
              }
            ]
          },
          "bad_send": {
            "text": "Máy chép nhầm tên cửa hàng, AI thêm câu giảm giá bạn chưa hứa. Khách trả lời hỏi về mức giảm đó và bạn phải giải thích khó xử.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bạn thấy hai chỗ lạ: tên cửa hàng sai một chữ và có câu 'giảm 5% đơn sau'.",
            "choices": [
              {
                "label": "Đối chiếu tên với danh thiếp, xoá câu giảm giá rồi gửi",
                "next": "good"
              },
              {
                "label": "Giữ câu giảm giá vì nghe có thiện chí, chỉ sửa tên",
                "next": "bad_promise"
              }
            ]
          },
          "bad_promise": {
            "text": "Khách đọc được mức giảm và gửi bảng đặt hàng kèm lời nhắc mức giảm ấy. Công ty chưa duyệt, bạn phải xin lỗi.",
            "ending": "bad"
          },
          "good": {
            "text": "Thư đi lúc 4 giờ 10, đúng tên, đúng lời hẹn. Khách trả lời cảm ơn trước khi bạn tới văn phòng.",
            "ending": "good"
          }
        }
      },
      {
        "type": "list",
        "items": [
          "Nói chậm và rõ khi tới tên riêng và con số.",
          "Dặn AI rõ: ba câu, chỉ dùng điều tôi nói.",
          "Nghe chữ trôi chảy không có nghĩa là nội dung đúng.",
          "Nếu đang ở chỗ ồn hay đông người, lưu nháp và soát lại sau."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Nói một phút, đọc lại một phút: thư đi trong lúc khách còn nhớ bạn.",
          "Điều AI viết thêm là điều bạn chưa hứa."
        ]
      }
    ]
  },
  {
    "id": 2381,
    "slug": "chup-danh-thiep-va-bien-nhan-thanh-danh-sach",
    "title": "Chặng 49, Bài 2: Chụp danh thiếp và biên nhận thành một danh sách",
    "subtitle": "Mười tấm danh thiếp thành một bảng gọn, rồi soát từng số điện thoại trước khi lưu.",
    "duration": "8 phút",
    "difficulty": "Dễ",
    "emoji": "📇",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Cuối buổi hội thảo, túi áo bạn đầy danh thiếp và biên nhận. Chụp ảnh rồi nhờ AI chép thành bảng nhanh hơn gõ tay rất nhiều. Nhưng một chữ số điện thoại sai là cả cơ hội liên lạc biến mất, và AI thì đôi khi điền những chỗ nó đọc không ra bằng một con số trông rất hợp lý.",
    "openingQuestion": "Bạn có mười tấm danh thiếp sau hội thảo và chụp ảnh gửi AI để chép thành bảng. Bảng trả về đầy đủ, đẹp. Bước tiếp theo nên là gì?",
    "openingOptions": [
      "Đối chiếu số điện thoại và email với ảnh gốc rồi mới lưu vào danh bạ",
      "Lưu thẳng cả bảng vào danh bạ vì AI đọc chữ in rất chính xác",
      "Xoá ảnh gốc cho gọn vì bảng đã có đủ mọi thông tin cần thiết",
      "Nhờ AI kiểm tra lại bảng của chính nó để bảo đảm không có lỗi"
    ],
    "correctOption": 0,
    "explanation": "Ảnh chụp có thể mờ, chói sáng hay bị che một góc, và khi không đọc ra, AI có xu hướng viết một giá trị nghe hợp lý thay vì nói là không đọc được. Số điện thoại và email là chỗ sai không thể nhìn ra bằng mắt vì trông ở dạng nào cũng hợp lý. Chỉ có ảnh gốc mới kiểm được. Lưu thẳng thì lỗi đi vào danh bạ. Xoá ảnh mất nguồn đối chiếu. Nhờ AI tự kiểm thì nó kiểm bằng chính cái đọc đã sai.",
    "diagram": [
      {
        "label": "Chụp từng danh thiếp, đủ sáng, không chói",
        "arrow": true
      },
      {
        "label": "AI chép thành bảng: tên, công ty, số, email",
        "arrow": true
      },
      {
        "label": "Bạn đối chiếu số và email với ảnh gốc",
        "arrow": true
      },
      {
        "label": "Lưu vào danh bạ, giữ lại ảnh gốc một thời gian"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: anh Đức làm mua hàng, nhận mười hai danh thiếp sau hội thảo ngành bao bì. Anh chụp theo từng lô bốn tấm và nhờ AI chép thành bảng. Khi soát, anh thấy một tấm bị chói đèn nên AI ghi số điện thoại thiếu một chữ số nhưng vẫn để thành dãy mười số trông hợp lệ. Nếu anh lưu thẳng, cuộc gọi hẹn báo giá đã gọi nhầm người."
    },
    "quiz": [
      {
        "question": "Khi ảnh danh thiếp bị chói đèn ở góc có số điện thoại, AI thường làm gì?",
        "options": [
          "Có thể điền một dãy số nghe hợp lý thay vì báo là không đọc được",
          "Luôn dừng lại và báo rõ là không đọc được phần đó trước khi làm tiếp",
          "Bỏ trống ô và viết chú thích",
          "Tự gọi vào số để kiểm tra rồi mới điền"
        ],
        "correct": 0,
        "explanation": "AI được tạo ra để trả lời trôi chảy, nên chỗ thiếu dễ bị lấp bằng một giá trị trông đúng. Bạn phải dặn rõ 'ô nào không đọc được thì ghi KHÔNG ĐỌC ĐƯỢC'. Không có chuyện nó luôn tự báo hay tự gọi vào số, vì AI chép ảnh không có khả năng đó."
      },
      {
        "question": "Bạn nên dặn AI điều gì trước khi nhờ chép danh thiếp?",
        "options": [
          "Ô nào không đọc ra thì ghi rõ là không đọc được, đừng đoán",
          "Chép thật nhanh và đẹp, không cần hỏi lại",
          "Tự sửa các chữ trông lạ thành chữ phổ biến hơn cho bảng sạch đẹp",
          "Thêm chức danh để bảng nhìn đầy đủ hơn"
        ],
        "correct": 0,
        "explanation": "Dặn AI thà để trống còn hơn đoán là cách ngăn việc bịa số điện thoại hay email. Sửa chữ lạ thành chữ phổ biến sẽ làm một cái tên riêng bị đổi thành tên khác. Thêm chức danh chính là bịa thông tin mà danh thiếp không hề ghi."
      },
      {
        "question": "Bảng AI trả về có 10 dòng, bạn chỉ có thời gian soát 3 dòng. Nên soát những dòng nào?",
        "options": [
          "Dòng có ảnh mờ hoặc chói, và dòng của người bạn sắp gọi trước",
          "Ba dòng đầu tiên vì AI thường làm kỹ nhất ở những dòng mở đầu của bảng",
          "Ba dòng ngắn nhất vì dòng càng ít chữ thì càng ít chỗ để sai sót xảy ra",
          "Ba dòng bất kỳ, vì lỗi chia đều cho tất cả các dòng trong cả bảng"
        ],
        "correct": 0,
        "explanation": "Lỗi tập trung vào ảnh khó đọc, và người bạn sắp liên lạc là chỗ sai gây thiệt hại ngay. AI không làm kỹ hơn ở những dòng đầu. Dòng ngắn cũng có thể sai một số điện thoại. Lỗi không chia đều vì nó phụ thuộc chất lượng từng ảnh."
      },
      {
        "question": "Biên nhận taxi chụp lại có dòng 'Tổng 185.000'. AI ghi '1.850.000'. Vì sao dễ xảy ra?",
        "options": [
          "Chữ số nhỏ, dấu chấm mờ hoặc nét nhoè khiến máy đọc thừa một số không",
          "Vì AI luôn cộng thêm một chữ số để an toàn hơn",
          "Vì biên nhận tiếng Việt luôn ghi số theo cách khác hẳn",
          "Vì máy chụp hình tự đổi số nếu ảnh đã bị nén nhẹ"
        ],
        "correct": 0,
        "explanation": "Số tiền là chỗ nhầm kiểu nhỏ mà hậu quả lớn: 185.000 và 1.850.000 chỉ khác một chữ số. Dấu chấm ngăn cách và nét mờ khiến máy đọc sai. AI không cộng thêm số để an toàn, biên nhận tiếng Việt không đặc biệt, và nén ảnh nhẹ không tự đổi chữ số. Vì vậy số tiền cần so với ảnh, và tổng so với cộng tay."
      },
      {
        "question": "Sau khi lưu xong danh bạ, nên làm gì với ảnh danh thiếp gốc?",
        "options": [
          "Giữ lại một thời gian, nhất là khi chưa gọi thử số nào",
          "Xoá ngay cho gọn máy vì bảng đã có đủ",
          "Gửi toàn bộ ảnh lên mạng xã hội để lưu trữ lâu dài và chia sẻ",
          "Nộp hết cho AI giữ hộ vì nó nhớ tốt hơn"
        ],
        "correct": 0,
        "explanation": "Ảnh gốc là nguồn để đối chiếu nếu sau này số gọi không được. Xoá sớm thì mất cách kiểm. Đăng ảnh danh thiếp lên mạng xã hội làm lộ thông tin của người khác mà họ không đồng ý. Và trí nhớ của AI không phải nơi lưu trữ dữ liệu của bạn."
      }
    ],
    "keyTakeaways": [
      "Chụp đủ sáng, từng danh thiếp hoặc từng lô nhỏ.",
      "Dặn AI: ô nào không đọc ra thì ghi là không đọc được.",
      "Số điện thoại, email và số tiền luôn đối chiếu với ảnh gốc.",
      "Giữ ảnh gốc cho tới khi đã gọi thử.",
      "Không đăng ảnh danh thiếp hay biên nhận của người khác lên mạng."
    ],
    "practicePrompt": {
      "question": "Chị Mai chụp 8 biên nhận công tác, AI chép thành bảng và cộng tổng 2.480.000 đồng. Chị định nộp phiếu thanh toán. Bước nào còn thiếu?",
      "options": [
        "Tự cộng lại các khoản từ ảnh và so với tổng AI đưa ra",
        "Nhờ AI cộng lại lần nữa để chắc chắn hơn",
        "Làm tròn tổng xuống 2.400.000 cho dễ nhớ",
        "Bỏ biên nhận nhỏ nhất để bảng gọn hơn"
      ],
      "correct": 0,
      "explanation": "Tổng là chỗ một chữ số lệch sẽ thành tiền sai trên phiếu thanh toán. Cộng lại từ ảnh là cách kiểm độc lập. Nhờ AI cộng lại thì dùng chung dữ liệu đọc có thể sai. Làm tròn xuống hay bỏ biên nhận thì phiếu không còn khớp chứng từ thật."
    },
    "summary": {
      "keyIdea": "AI chép nhanh, nhưng số điện thoại và số tiền chỉ tin khi đã đối chiếu với ảnh.",
      "formula": "Ảnh rõ + dặn 'không đọc được thì ghi rõ' + đối chiếu số = bảng đáng tin.",
      "commonMistake": "Lưu thẳng bảng vào danh bạ vì AI đọc chữ in trông rất chính xác.",
      "action": "Chụp 3 danh thiếp cũ, nhờ AI chép và soát từng số điện thoại."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Lấy 3 đến 5 danh thiếp hoặc biên nhận có thật trong ví bạn. Chụp đủ sáng, nhờ AI chép thành bảng và dặn 'ô không đọc được thì ghi KHÔNG ĐỌC ĐƯỢC'. Rồi đối chiếu từng số điện thoại, email hoặc số tiền với tấm gốc và ghi lại có bao nhiêu chỗ sai.",
      "secondary": "Nếu có tấm nào AI đọc sai, xem ảnh bị mờ hay chói để lần sau chụp lại cho rõ."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Sau hội thảo, túi áo bạn có mười tấm danh thiếp, và trong ví còn ba biên nhận taxi. Gõ tay từng cái mất cả buổi tối. Bài này dạy cách chụp nhờ AI chép, và quan trọng hơn, cách soát để không lưu nhầm một số điện thoại."
      },
      {
        "type": "feynman",
        "title": "Chụp danh thiếp nhờ AI chép đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới một bạn thực tập đọc hộ bạn danh thiếp. Bạn ấy đọc rất nhanh, nhưng khi chữ quá mờ thì thay vì hỏi lại, bạn ấy viết đại một con số cho trọn dòng. Nhiệm vụ của bạn là dặn bạn ấy hỏi khi không đọc ra, rồi liếc lại tấm danh thiếp gốc.",
        "columns": [
          "Tình huống",
          "Bạn thực tập",
          "AI chép ảnh"
        ],
        "rows": [
          [
            "Chữ rõ",
            "Chép đúng",
            "Chép đúng"
          ],
          [
            "Chữ mờ hay chói",
            "Có thể viết đại",
            "Có thể điền số nghe hợp lý"
          ],
          [
            "Cách ngăn",
            "Dặn hỏi lại nếu không chắc",
            "Dặn ghi 'không đọc được'"
          ],
          [
            "Cách kiểm",
            "Liếc lại tấm gốc",
            "Đối chiếu với ảnh gốc"
          ]
        ],
        "oneLiner": "AI chép nhanh và trông rất chắc chắn, nên số điện thoại phải đối chiếu với ảnh gốc."
      },
      {
        "type": "heading",
        "text": "Vì sao lỗi ở danh thiếp khó thấy"
      },
      {
        "type": "paragraph",
        "text": "Một từ tiếng Việt sai dấu thì bạn nhìn ra ngay. Nhưng số điện thoại 0912 345 678 và 0912 345 687 trông bình đẳng như nhau. Bản chép sai không có dấu hiệu gì lộ ra, nên muốn biết đúng hay sai bạn phải đặt cạnh ảnh gốc."
      },
      {
        "type": "flow",
        "title": "Từ mười tấm danh thiếp đến danh bạ đã soát",
        "steps": [
          {
            "label": "Chụp cho rõ",
            "detail": "Đặt danh thiếp trên nền tối, đủ sáng, tránh chói đèn. Mỗi ảnh chụp 2-4 tấm để chữ vẫn đủ lớn."
          },
          {
            "label": "Dặn AI trước khi chép",
            "detail": "Yêu cầu bảng có cột tên, công ty, số, email và ghi KHÔNG ĐỌC ĐƯỢC ở ô nào không chắc, không đoán."
          },
          {
            "label": "Đọc lướt bảng",
            "detail": "Xem có dòng nào thiếu hoặc lạ, như email không có tên công ty hay số điện thoại quá ngắn."
          },
          {
            "label": "Đối chiếu với ảnh gốc",
            "detail": "Soát số điện thoại, email và chức danh, nhất là người bạn sắp gọi trước. Ảnh mờ thì chụp lại."
          },
          {
            "label": "Lưu và giữ ảnh gốc",
            "detail": "Lưu vào danh bạ, rồi giữ ảnh gốc cho tới khi bạn đã thật sự liên lạc được với từng người."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Soát bảng AI chép từ ảnh danh thiếp",
        "task": "Bạn chụp hai danh thiếp. Danh thiếp thứ nhất chỉ ghi: Nguyễn Thị Lan, Công ty Bao bì Tân Phát, 0934 567 120, lan@tanphat.example. Danh thiếp thứ hai bị chói ở góc dưới nên không đọc được số điện thoại, chỉ có: Trần Văn Quý, Công ty In Hòa Bình. Đánh dấu các dòng AI tự thêm.",
        "segments": [
          {
            "text": "Nguyễn Thị Lan, Công ty Bao bì Tân Phát."
          },
          {
            "text": "Điện thoại 0934 567 120, email lan@tanphat.example."
          },
          {
            "text": "Chức danh: Giám đốc kinh doanh.",
            "error": "Danh thiếp của chị Lan không ghi chức danh. AI thêm vào cho bảng trông đầy đủ."
          },
          {
            "text": "Trần Văn Quý, Công ty In Hòa Bình."
          },
          {
            "text": "Điện thoại 0987 654 321.",
            "error": "Số điện thoại của anh Quý bị chói nên không đọc được. AI điền một dãy số trông hợp lệ thay vì báo là không đọc được."
          },
          {
            "text": "Email quy@hoabinh.example.",
            "error": "Danh thiếp thứ hai không có email. AI đoán địa chỉ từ tên công ty, nên email này không chắc tồn tại."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Chụp ảnh và nhờ AI chép",
          "text": "Nhanh, một lượt mười tấm. Hợp khi bạn cần danh bạ kịp dùng trong tuần. Đổi lại phải có bước đối chiếu, và ảnh phải đủ sáng để AI đọc."
        },
        "right": {
          "label": "Gõ tay từng danh thiếp",
          "text": "Chậm nhưng mỗi số bạn nhìn tận mắt nên ít sai hơn. Phù hợp khi chỉ có một hai tấm quan trọng như khách lớn."
        }
      },
      {
        "type": "callout",
        "label": "Biên nhận có thêm một rủi ro",
        "text": "Trên biên nhận là số tiền, nên một chữ số thừa hay thiếu thành khoản tiền sai trên phiếu thanh toán. Luôn tự cộng lại tổng từ ảnh. Nếu biên nhận chứa thông tin cá nhân của người khác, đừng đưa vào công cụ chưa được công ty cho phép."
      },
      {
        "type": "scenario",
        "title": "Mười danh thiếp lúc 9 giờ tối",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "AI đã trả về bảng mười dòng gọn gàng. Ngày mai bạn cần gọi ba người trong đó để hẹn báo giá.",
            "choices": [
              {
                "label": "Lưu hết bảng vào danh bạ, mai gọi luôn",
                "next": "bad_save"
              },
              {
                "label": "Đối chiếu ba người cần gọi trước với ảnh gốc, rồi mới lưu",
                "next": "s2"
              }
            ]
          },
          "bad_save": {
            "text": "Sáng hôm sau, số của anh Quý gọi ra một người lạ. Bạn mất cả buổi sáng tìm lại danh thiếp và nhớ ra tấm đó bị chói đèn.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bạn thấy số của anh Quý được điền dù ảnh gốc bị chói.",
            "choices": [
              {
                "label": "Chụp lại tấm đó cho rõ và chép lại, hoặc gõ tay số đó",
                "next": "good"
              },
              {
                "label": "Giữ số AI điền vì trông giống số điện thoại thật",
                "next": "bad_keep"
              }
            ]
          },
          "bad_keep": {
            "text": "Số đó không tồn tại. Cơ hội hẹn báo giá trượt sang tuần sau vì bạn mất thời gian đoán lại số.",
            "ending": "bad"
          },
          "good": {
            "text": "Bạn chụp lại, số đúng 0987 654 312, không phải 321. Bạn gọi được ngay hôm sau và hẹn lịch báo giá.",
            "ending": "good"
          }
        }
      },
      {
        "type": "list",
        "items": [
          "Đặt danh thiếp cạnh nhau, chụp đủ sáng, tránh chói.",
          "Luôn dặn AI ghi 'không đọc được' thay vì đoán.",
          "Đối chiếu số điện thoại, email và số tiền với ảnh gốc.",
          "Giữ ảnh gốc cho tới khi đã gọi thử thành công."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Chụp mười tấm trong một phút, soát ba số quan trọng trong hai phút.",
          "AI chép nhanh, ảnh gốc là người kiểm chứng."
        ]
      }
    ]
  },
  {
    "id": 2382,
    "slug": "chup-bang-trang-sau-hop-thanh-viec-can-lam",
    "title": "Chặng 49, Bài 3: Chụp bảng trắng sau họp thành danh sách việc",
    "subtitle": "Bảng đầy mũi tên và chữ viết tay thành danh sách việc, rồi sửa những chỗ máy đọc sai.",
    "duration": "8 phút",
    "difficulty": "Dễ",
    "emoji": "📝",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Bảng trắng sau buổi họp chứa quyết định thật của cả nhóm nhưng sắp bị lau. Chụp ảnh và nhờ AI chép thành danh sách việc giúp bạn giữ lại trước khi quên. Điều cần cẩn thận là chữ viết tay và mũi tên: máy hay đọc sai tên người và hiểu nhầm mũi tên chỉ ai làm gì.",
    "openingQuestion": "Họp xong, bảng trắng đầy chữ viết tay và mũi tên, người dọn phòng sắp vào lau. Bạn chụp ảnh gửi AI. Sau khi nhận danh sách việc, việc đầu tiên nên làm là gì?",
    "openingOptions": [
      "Đối chiếu từng dòng với ảnh, sửa tên người và mũi tên bị hiểu sai",
      "Gửi luôn danh sách cho cả nhóm vì AI đã chép theo đúng ảnh",
      "Xoá ảnh gốc để danh sách là nguồn duy nhất cho khỏi lẫn",
      "Nhờ AI sắp lại thứ tự ưu tiên để danh sách trông chuyên nghiệp hơn nhiều"
    ],
    "correctOption": 0,
    "explanation": "Chữ viết tay của mỗi người mỗi khác và mũi tên trên bảng có thể chỉ 'việc này xong trước việc kia' hoặc 'việc này giao cho người kia'. AI đoán một cách, còn chỉ người dự họp mới biết cách đúng. Gửi luôn cho cả nhóm thì sai sót thành thông báo chính thức. Xoá ảnh thì mất nguồn đối chiếu. Sắp thứ tự ưu tiên khi chưa kiểm nội dung chỉ làm bản sai trông ngăn nắp hơn.",
    "diagram": [
      {
        "label": "Chụp bảng trước khi bị lau, đủ sáng và thẳng góc",
        "arrow": true
      },
      {
        "label": "AI chép thành danh sách: việc, người, hạn",
        "arrow": true
      },
      {
        "label": "Bạn sửa chữ đọc sai và mũi tên hiểu nhầm",
        "arrow": true
      },
      {
        "label": "Gửi nhóm và nhờ mỗi người xác nhận phần của mình"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: nhóm marketing họp xong, bảng có một mũi tên từ 'banner' sang tên 'Khoa'. AI hiểu là Khoa làm banner. Thực ra mũi tên ý là banner phải xong trước khi Khoa bắt đầu viết bài. Chị trưởng nhóm đối chiếu ảnh với trí nhớ buổi họp và sửa lại trước khi gửi, nhờ vậy không ai bị giao nhầm việc."
    },
    "quiz": [
      {
        "question": "Trên bảng có mũi tên từ 'thiết kế' sang 'Khoa'. Vì sao AI có thể chép sai ý?",
        "options": [
          "Mũi tên có thể chỉ người làm hoặc thứ tự trước sau, ảnh không cho biết ý nào",
          "Vì AI không đọc được mũi tên vẽ bằng bút nên bỏ qua hoặc đổi thành ký tự",
          "Vì tên 'Khoa' luôn bị máy đọc thành một từ khác trên mọi bảng",
          "Vì chữ in hoa trên bảng thường bị AI bỏ qua khi chép"
        ],
        "correct": 0,
        "explanation": "Một mũi tên chỉ là nét vẽ, ý nghĩa nằm trong đầu người vẽ. AI chọn cách hiểu có vẻ hợp lý nhất, và có thể là cách sai. Nó vẫn đọc được mũi tên, nên lý do không phải là không thấy. Không có quy luật cho tên Khoa hay chữ in hoa, nên không thể quy cho một lỗi cố định."
      },
      {
        "question": "Cách nào giúp AI chép bảng chính xác hơn ngay từ lúc chụp?",
        "options": [
          "Chụp thẳng góc, đủ sáng, tránh phản chiếu đèn lên mặt bảng",
          "Chụp xa cả phòng để thấy hết bảng trong một ảnh rồi phóng to lên sau",
          "Chụp nghiêng một bên để tránh bóng",
          "Chụp bằng chế độ làm mờ nền cho đẹp ảnh"
        ],
        "correct": 0,
        "explanation": "Chữ viết tay cần đủ lớn và rõ thì máy mới đọc được. Phản chiếu đèn làm mất nét chữ. Chụp xa làm chữ nhỏ lại, chụp nghiêng làm chữ méo, và làm mờ nền có thể làm mờ luôn nét bút ở rìa bảng."
      },
      {
        "question": "AI trả về danh sách việc, ô 'người làm' của một việc ghi 'Hương'. Nhưng trên bảng không ghi ai cả. Đây là lỗi gì?",
        "options": [
          "AI tự điền một người để dòng trông đầy đủ",
          "Lỗi của máy ảnh khi chụp, làm mất một phần chữ trên bảng",
          "Lỗi bình thường vì AI luôn đoán đúng người làm việc đó",
          "Lỗi do nhóm viết chữ quá đẹp nên máy thêm tên vào"
        ],
        "correct": 0,
        "explanation": "Khi một ô trống trong nguồn, AI có xu hướng điền cho đủ. Việc không có người làm là thông tin thật: bạn cần hỏi nhóm ai nhận. Lỗi này không do máy ảnh. AI không luôn đoán đúng, và chữ đẹp hay xấu không gây ra việc thêm tên."
      },
      {
        "question": "Nên gửi danh sách việc cho cả nhóm vào lúc nào?",
        "options": [
          "Sau khi bạn đã sửa theo ảnh và trí nhớ buổi họp, nhờ từng người xác nhận phần mình",
          "Ngay khi AI trả về để cả nhóm thấy danh sách sớm nhất có thể",
          "Đợi tới cuối tuần để gửi gộp cùng các ghi chú khác cho gọn",
          "Không cần gửi nếu đã chụp ảnh bảng và cất trong máy"
        ],
        "correct": 0,
        "explanation": "Danh sách chỉ hữu ích khi mọi người đồng ý đó là việc của mình. Nhờ xác nhận là cách bắt lỗi chép sai còn sót. Gửi ngay khi chưa soát đưa lỗi thành thông báo chính thức. Đợi cuối tuần thì mọi người quên việc. Chỉ chụp ảnh mà không gửi thì việc không có người nhận."
      },
      {
        "question": "Có một dòng chữ viết tay AI ghi chú 'không đọc rõ'. Nên làm gì?",
        "options": [
          "Hỏi người viết hoặc người dự họp dòng đó nói gì",
          "Xoá dòng đó khỏi danh sách cho bảng gọn hơn",
          "Nhờ AI đoán lại thêm một lần bằng ngữ cảnh dòng bên",
          "Giữ nguyên ghi chú không đọc rõ và gửi cả nhóm"
        ],
        "correct": 0,
        "explanation": "Một việc mà máy đọc không ra có thể là việc quan trọng. Cách chắc chắn là hỏi lại người biết. Xoá dòng làm mất việc. AI đoán thêm vẫn chỉ là đoán. Gửi nguyên ghi chú không rõ làm cả nhóm không biết phải làm gì."
      }
    ],
    "keyTakeaways": [
      "Chụp bảng trước khi bị lau, thẳng góc và đủ sáng.",
      "Mũi tên là chỗ AI dễ hiểu sai nhất: hỏi lại người dự họp.",
      "Ô nào trống trên bảng thì để trống, đừng để AI điền người.",
      "Nhờ từng người xác nhận phần việc của mình.",
      "Giữ ảnh gốc cho tới khi cả nhóm đã xác nhận."
    ],
    "practicePrompt": {
      "question": "Chị Lan chụp bảng họp, AI cho danh sách 6 việc có người và hạn đầy đủ. Chị thấy hạn của một việc ghi 'thứ Sáu' mà bảng chỉ ghi 'sớm'. Nên làm gì?",
      "options": [
        "Hỏi nhóm hạn thật là gì rồi điền lại",
        "Giữ 'thứ Sáu' vì hợp lý với các việc còn lại",
        "Đổi thành 'thứ Hai' để có thêm thời gian",
        "Xoá cột hạn đi cho cả bảng khỏi bị sai"
      ],
      "correct": 0,
      "explanation": "'Sớm' là thông tin mơ hồ thật, còn 'thứ Sáu' là AI tự chọn. Hạn là thứ người ta sẽ bị đòi nên phải hỏi lại. Đổi ngày theo ý mình là tự quyết định thay nhóm, còn xoá cột hạn làm mất thông tin cần có."
    },
    "summary": {
      "keyIdea": "Chụp bảng giữ được quyết định, nhưng mũi tên và chữ viết tay phải được người họp xác nhận.",
      "formula": "Ảnh thẳng, đủ sáng + AI chép + sửa theo trí nhớ buổi họp + nhóm xác nhận = danh sách việc đáng tin.",
      "commonMistake": "Gửi danh sách ngay vì AI chép trông đầy đủ, để mũi tên hiểu nhầm thành việc giao sai người.",
      "action": "Buổi họp sau, chụp bảng và nhờ AI chép trước khi rời phòng."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Ở buổi họp hoặc ghi chú viết tay gần nhất của bạn, chụp một trang. Nhờ AI chép thành danh sách có ba cột: việc, người, hạn, và dặn 'ô nào không ghi thì để trống'. Rồi đối chiếu từng dòng với ảnh, đánh dấu chỗ AI điền thêm.",
      "secondary": "Gửi danh sách đã soát cho một đồng nghiệp trong buổi họp và hỏi họ xác nhận việc của mình."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Cuối buổi họp, bảng trắng chứa mọi thứ: việc, tên, mũi tên, vài chữ gạch đi viết lại. Người dọn phòng đang chờ ở cửa. Bạn có khoảng hai phút để giữ nó lại, và bài này dạy cách dùng hai phút đó cho đúng."
      },
      {
        "type": "feynman",
        "title": "Chụp bảng thành danh sách việc đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới một người khách đọc bảng của bạn mà không dự buổi họp. Họ đọc được chữ, nhưng nhìn mũi tên thì chỉ đoán được: 'chắc là ai làm cái này'. Họ có thể đoán đúng, nhưng chỉ người họp mới chắc chắn. AI ở vào vị trí người khách đó.",
        "columns": [
          "Thứ trên bảng",
          "Người khách đọc bảng",
          "AI đọc ảnh"
        ],
        "rows": [
          [
            "Chữ viết tay",
            "Đọc được phần lớn",
            "Đọc được phần lớn, nhầm chữ xấu"
          ],
          [
            "Mũi tên",
            "Đoán ý",
            "Chọn một cách hiểu"
          ],
          [
            "Ô để trống",
            "Hỏi lại",
            "Có thể điền cho đủ"
          ],
          [
            "Cách kiểm",
            "Hỏi người họp",
            "Đối chiếu trí nhớ và nhóm"
          ]
        ],
        "oneLiner": "AI đọc bảng như người khách chưa dự họp: đọc được chữ nhưng ý của mũi tên phải hỏi người trong cuộc."
      },
      {
        "type": "heading",
        "text": "Chữ viết tay và mũi tên: hai chỗ dễ sai"
      },
      {
        "type": "paragraph",
        "text": "Chữ in rõ thì AI đọc rất tốt. Chữ viết tay vội của đồng nghiệp thì tuỳ người: một chữ 'Hương' có thể bị đọc thành 'Hưng'. Còn mũi tên thì không phải chữ, nên AI buộc phải diễn giải. Hai chỗ đó là nơi bạn dành thời gian soát, không phải mọi dòng."
      },
      {
        "type": "flow",
        "title": "Từ bảng trắng tới danh sách việc đã xác nhận",
        "steps": [
          {
            "label": "Chụp trước khi lau",
            "detail": "Đứng thẳng trước bảng, đủ sáng, tránh phản chiếu đèn. Nếu bảng lớn, chụp từng nửa để chữ không bị nhỏ."
          },
          {
            "label": "Nhờ AI chép",
            "detail": "Yêu cầu cột: việc, người, hạn. Dặn ô không ghi trên bảng thì để trống, chữ không đọc ra thì ghi 'không đọc rõ'."
          },
          {
            "label": "Soát tên và mũi tên",
            "detail": "Đối chiếu tên người với danh sách nhóm, xem mỗi mũi tên AI đã hiểu là 'giao cho' hay 'làm trước sau'."
          },
          {
            "label": "Hỏi lại chỗ chưa chắc",
            "detail": "Những dòng AI ghi không đọc rõ hoặc bạn nghi ngờ, hỏi người viết trên bảng hoặc người dự họp."
          },
          {
            "label": "Gửi nhóm và xin xác nhận",
            "detail": "Gửi danh sách đã soát, mỗi người trả lời 'đúng' cho phần của mình. Giữ ảnh gốc tới khi xong."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Chụp ảnh nhờ AI chép",
          "text": "Nhanh, chụp xong là có danh sách. Giữ được cả những việc nhỏ dễ quên. Phải soát chữ viết tay và mũi tên, và mất thêm một vòng xác nhận."
        },
        "right": {
          "label": "Viết lại bằng tay từ trí nhớ",
          "text": "Không phụ thuộc máy đọc, nhưng thường bỏ sót việc phụ và dễ quên ai nhận việc nào khi bảng đã bị lau."
        }
      },
      {
        "type": "callout",
        "label": "Ảnh bảng trắng có thể chứa thông tin nhạy cảm",
        "text": "Nếu bảng ghi số liệu nội bộ, tên khách hàng hay kế hoạch chưa công bố, đừng đưa ảnh vào công cụ AI chưa được công ty cho phép. Hỏi bộ phận IT hoặc quản lý trước; nếu chưa chắc, tự chép tay phần nhạy cảm."
      },
      {
        "type": "scenario",
        "title": "Hai phút trước khi bảng bị lau",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Họp xong, người dọn phòng đã đứng ở cửa. Bảng có sáu việc, vài mũi tên và hai chữ bạn đọc cũng khó.",
            "choices": [
              {
                "label": "Chụp luôn một tấm thật nhanh, không cần nhìn lại",
                "next": "s2a"
              },
              {
                "label": "Chụp thẳng góc, kiểm tra ảnh đủ sáng rồi chụp thêm một tấm",
                "next": "s2"
              }
            ]
          },
          "s2a": {
            "text": "Ảnh bị lệch và chói đèn ở góc phải, nửa cột người làm bị mất nét. Bảng đã bị lau.",
            "choices": [
              {
                "label": "Nhờ AI chép ảnh và gửi luôn nhóm",
                "next": "bad_send"
              },
              {
                "label": "Nhờ AI chép, rồi gọi hai đồng nghiệp xác nhận các dòng mờ",
                "next": "good_late"
              }
            ]
          },
          "bad_send": {
            "text": "Danh sách có hai việc ghi sai người. Hai đồng nghiệp làm nhầm phần của nhau cả tuần trước khi phát hiện.",
            "ending": "bad"
          },
          "good_late": {
            "text": "Hai đồng nghiệp nhớ ra các dòng mờ. Danh sách đúng nhưng mất thêm nửa tiếng vì ảnh không rõ.",
            "ending": "good"
          },
          "s2": {
            "text": "Ảnh rõ. AI trả về danh sách sáu việc, trong đó một mũi tên từ 'báo giá' sang 'Khoa' bị hiểu là Khoa làm báo giá.",
            "choices": [
              {
                "label": "Hỏi Khoa và chị trưởng nhóm mũi tên ý là gì, rồi sửa",
                "next": "good"
              },
              {
                "label": "Giữ cách hiểu của AI vì nghe hợp lý",
                "next": "bad_arrow"
              }
            ]
          },
          "bad_arrow": {
            "text": "Mũi tên thật ra nghĩa là 'báo giá phải xong trước khi Khoa gửi khách'. Khoa tưởng mình làm báo giá và việc trễ một ngày.",
            "ending": "bad"
          },
          "good": {
            "text": "Ý đúng là báo giá xong trước khi Khoa gửi khách. Bạn sửa, gửi nhóm và mọi người xác nhận trong buổi chiều.",
            "ending": "good"
          }
        }
      },
      {
        "type": "list",
        "items": [
          "Chụp trước khi lau, thẳng góc và đủ sáng.",
          "Dặn AI để trống ô không ghi và ghi 'không đọc rõ' khi không chắc.",
          "Mũi tên và chữ viết tay là chỗ soát đầu tiên.",
          "Nhờ từng người xác nhận phần việc của mình."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Hai phút chụp, năm phút soát, nhóm có danh sách việc thay vì một bức tường trắng.",
          "Mũi tên là ý của người vẽ, không phải của máy."
        ]
      }
    ]
  },
  {
    "id": 2383,
    "slug": "giong-noi-tieng-viet-va-cach-noi-de-may-nghe-dung",
    "title": "Chặng 49, Bài 4: Tiếng Việt, giọng vùng miền và cách nói để máy nghe đúng",
    "subtitle": "Nói chậm, đọc số từng chữ và đối chiếu bản chép, để tên khách và địa danh không bị nhầm.",
    "duration": "10 phút",
    "difficulty": "Dễ",
    "emoji": "🗣️",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Bạn nói nhanh vào điện thoại và khi đọc lại thì tên khách đã thành một từ khác, địa danh thành một chỗ không tồn tại. Tiếng Việt có dấu thanh, giọng mỗi vùng mỗi khác, nên máy nghe nhầm là chuyện thường. Biết vài cách nói và cách soát giúp bạn dùng giọng nói mà không sợ sai những chỗ quan trọng.",
    "openingQuestion": "Bạn nói nhanh vào điện thoại một tin nhắn cho khách tên Phượng ở phố Hàng Bồ. Bản chép ra tên khác và địa chỉ sai. Cách xử lý nào đúng nhất?",
    "openingOptions": [
      "Nói chậm lại, tách tên riêng ra, rồi đối chiếu bản chép với nguồn thật",
      "Nói nhanh hơn và to hơn để máy bắt kịp giọng của bạn dù tên riêng vẫn bị chép sai",
      "Bỏ hẳn tên và địa chỉ khỏi tin nhắn để khỏi bị chép sai",
      "Tin bản chép vì máy đã học giọng của bạn qua nhiều lần dùng"
    ],
    "correctOption": 0,
    "explanation": "Tên riêng và địa danh là loại từ máy khó đoán nhất, vì chúng không có trong ngữ cảnh câu. Nói chậm, tách rõ từng chữ và đọc số từng chữ giúp máy chép đúng hơn, nhưng không bao giờ chắc chắn, nên vẫn phải đối chiếu với nguồn thật như danh thiếp hay bản đồ. Nói nhanh hơn làm máy nghe kém hơn. Bỏ tên và địa chỉ làm tin nhắn mất ý. Còn tin rằng máy nhớ giọng bạn là chủ quan: nó có thể vẫn sai ở tên lạ.",
    "diagram": [
      {
        "label": "Nói chậm, dừng giữa các ý, đọc số từng chữ",
        "arrow": true
      },
      {
        "label": "Máy chép thành chữ, có thể nghe nhầm tên và địa danh",
        "arrow": true
      },
      {
        "label": "Bạn đối chiếu tên, địa chỉ, số với nguồn thật",
        "arrow": true
      },
      {
        "label": "Sửa tay chỗ sai rồi mới gửi hoặc lưu"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: anh Tùng ở miền Trung thường ghi chú giọng nói cho khách hàng. Anh thấy các tên như 'Thuý' và 'Thủy' hay bị chép lẫn, và địa chỉ 'đường Nguyễn Tri Phương' đôi khi ra tên khác. Anh đổi thói quen: nói tên một lần thật chậm, đọc số điện thoại từng chữ số, rồi đối chiếu tên với lịch hẹn trước khi gửi. Số lần phải sửa lại giảm rõ rệt theo cảm nhận của anh."
    },
    "quiz": [
      {
        "question": "Vì sao tên riêng thường bị máy chép sai hơn các từ thông dụng?",
        "options": [
          "Tên riêng ít nằm trong ngữ cảnh câu nên máy khó đoán",
          "Vì máy không có từ điển tên người Việt",
          "Vì tên riêng thường được người nói đọc nhanh hơn các từ khác trong câu",
          "Vì máy chỉ chép được chữ viết thường"
        ],
        "correct": 0,
        "explanation": "Với từ thông dụng, máy dựa vào các từ xung quanh để chọn từ đúng. Tên riêng như Phượng hay Hàng Bồ có thể xuất hiện ở bất cứ câu nào nên không có manh mối. Nguyên nhân không phải là không có từ điển, không phải tốc độ nói cố định, và máy không bị giới hạn ở chữ viết thường."
      },
      {
        "question": "Cách nào giảm nhầm lẫn khi đọc số điện thoại cho máy chép?",
        "options": [
          "Đọc từng chữ số, dừng giữa các nhóm",
          "Đọc cả dãy thật nhanh như một từ dài cho máy khỏi ngắt",
          "Đọc thành số lớn, như 'chín trăm mười hai'",
          "Chỉ đọc vài số cuối vì máy tự nhớ phần đầu"
        ],
        "correct": 0,
        "explanation": "Đọc từng chữ số tránh để máy gộp hai số thành một số lớn hay lẫn giữa 'hai' và 'bảy'. Số đọc như số lớn có thể bị chép thành 912 thay vì 0 9 1 2. Máy không nhớ phần đầu số điện thoại của khách, và đọc nhanh làm các chữ số dính vào nhau."
      },
      {
        "question": "Máy chép 'Thuý' thành 'Thủy' dù bạn nói đúng. Điều này cho thấy gì?",
        "options": [
          "Hai tên nghe gần nhau nên phải đối chiếu với nguồn chứ không tin bản chép",
          "Bạn nói sai và phải học lại cách phát âm cho đúng chuẩn",
          "Máy luôn đúng ở tên có dấu sắc nên bản chép này đáng tin",
          "Máy chỉ sai khi bạn nói giọng vùng miền nặng"
        ],
        "correct": 0,
        "explanation": "Nhiều tên nghe rất giống nhau, nhất là khi ở các vùng khác nhau. Máy chọn một cách, và không có cách nào biết đó có phải tên thật của khách. Vì thế phải đối chiếu với danh thiếp hay lịch hẹn. Việc máy chép khác không có nghĩa bạn nói sai, và lỗi này xảy ra với mọi giọng."
      },
      {
        "question": "Nói giọng vùng miền nặng vào điện thoại, máy chép nhiều chỗ lạ. Nên làm gì?",
        "options": [
          "Nói chậm hơn một chút và soát kỹ bản chép, sửa tay chỗ sai",
          "Đổi giọng thành giọng chuẩn cho máy dễ hiểu hơn và ít chép nhầm hơn",
          "Bỏ hẳn việc nhập bằng giọng nói",
          "Nói thật to để máy nhận ra giọng bạn"
        ],
        "correct": 0,
        "explanation": "Giọng vùng miền là giọng thật của bạn và không có lỗi. Nói chậm hơn và soát bản chép giúp bạn vẫn dùng được giọng nói. Cố đổi sang giọng khác thường làm bạn nói không tự nhiên, còn nói to không cải thiện cách máy nghe dấu thanh. Bỏ hẳn thì mất lợi ích tiết kiệm thời gian."
      },
      {
        "question": "Bạn nói vào điện thoại một tin có tên khách và số hợp đồng. Bước cuối cùng nên là gì?",
        "options": [
          "Đọc lại tên và số với nguồn thật trước khi gửi",
          "Gửi ngay vì đã nói chậm và rõ",
          "Nói lại lần thứ hai để máy học được giọng của bạn tốt hơn",
          "Xoá tên và số để tin gọn hơn"
        ],
        "correct": 0,
        "explanation": "Nói chậm giảm lỗi nhưng không loại bỏ hoàn toàn, và tên với số hợp đồng là chỗ sai gây hậu quả. Đối chiếu với nguồn thật mới chắc. Nói lại lần hai không bảo đảm máy sẽ đúng, và xoá tên số làm tin nhắn mất thông tin quan trọng."
      }
    ],
    "keyTakeaways": [
      "Nói chậm, dừng giữa các ý, tách rõ tên riêng.",
      "Đọc số từng chữ số, không đọc thành số lớn.",
      "Tên và địa danh luôn đối chiếu với nguồn thật.",
      "Giọng vùng miền không phải lỗi: chỉ cần nói chậm hơn và soát kỹ.",
      "Sửa tay chỗ sai rồi mới gửi."
    ],
    "practicePrompt": {
      "question": "Chị Hà đọc số hợp đồng '4 0 7 2' cho máy chép, bản chép ra '4.072'. Chị cần số hợp đồng đúng dạng mã. Nên xử lý thế nào?",
      "options": [
        "Kiểm lại với hợp đồng thật và gõ tay mã đúng",
        "Giữ '4.072' vì cùng các chữ số",
        "Nhờ AI tự chuẩn hoá mã cho đẹp hơn",
        "Xoá mã khỏi tin nhắn"
      ],
      "correct": 0,
      "explanation": "'4.072' là số tiền hay số lượng, còn mã hợp đồng là dãy ký tự. Đổi dạng có thể làm khách không tra được hợp đồng. AI chuẩn hoá theo ý nó cũng không biết dạng mã thật. Xoá mã thì khách không biết bạn nói hợp đồng nào."
    },
    "summary": {
      "keyIdea": "Máy nghe tiếng Việt khá tốt nhưng hay nhầm tên riêng, địa danh và số, nên bạn nói chậm và soát lại.",
      "formula": "Nói chậm + số từng chữ + đối chiếu nguồn thật = bản chép dùng được.",
      "commonMistake": "Tin bản chép vì nói rõ ràng, không đối chiếu tên với danh thiếp.",
      "action": "Đọc vào điện thoại ba tên khách và hai số, rồi đối chiếu từng cái."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Mở chế độ nhập bằng giọng nói trên điện thoại. Đọc vào ba tên khách thật, một địa chỉ và một số điện thoại, lần đầu nói tự nhiên, lần hai nói chậm và đọc số từng chữ. Đối chiếu từng bản chép với nguồn thật và ghi lại lần nào ít lỗi hơn.",
      "secondary": "Chọn một cách nói cho tên riêng (ví dụ nói chậm, dừng hai nhịp) và dùng thử cả tuần."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bạn đã bao giờ nói vào điện thoại một câu rất rõ, rồi thấy tên khách biến thành một từ hoàn toàn khác? Đây không phải lỗi của riêng bạn: tiếng Việt có sáu dấu thanh và nhiều tên gần âm nhau, nên máy nghe nhầm là chuyện bình thường."
      },
      {
        "type": "feynman",
        "title": "Để máy nghe đúng đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới việc bạn đọc tên cho một người nghe qua điện thoại ồn: bạn sẽ nói chậm, đánh vần và đọc từng số. Nói cho máy cũng vậy, vì máy cũng 'nghe qua điện thoại ồn', chỉ khác là nó không biết hỏi lại.",
        "columns": [
          "Tình huống",
          "Đọc tên qua điện thoại ồn",
          "Nói vào máy chép"
        ],
        "rows": [
          [
            "Tên lạ",
            "Đánh vần từng chữ",
            "Nói chậm, tách rõ tên"
          ],
          [
            "Số điện thoại",
            "Đọc từng số",
            "Đọc từng chữ số, dừng giữa nhóm"
          ],
          [
            "Người nghe chưa chắc",
            "Hỏi lại",
            "Không biết hỏi: bạn phải đối chiếu"
          ],
          [
            "Sau cuộc gọi",
            "Xác nhận lại tên",
            "Đối chiếu tên và số với nguồn thật"
          ]
        ],
        "oneLiner": "Máy không biết hỏi lại, nên bạn nói chậm để nó đỡ sai và đối chiếu để bắt chỗ nó vẫn sai."
      },
      {
        "type": "heading",
        "text": "Vì sao tiếng Việt dễ bị chép nhầm"
      },
      {
        "type": "paragraph",
        "text": "Một từ tiếng Việt chỉ đổi dấu là thành từ khác: 'ma', 'má', 'mả', 'mã'. Khi nói nhanh hoặc giọng vùng miền pha trộn dấu, máy phải đoán. Với từ thông dụng, các từ xung quanh giúp đoán đúng. Với tên riêng như Phượng hay phố Hàng Bồ, không có manh mối, nên máy dễ sai nhất ở chỗ bạn cần đúng nhất."
      },
      {
        "type": "flow",
        "title": "Nói để máy nghe đúng",
        "steps": [
          {
            "label": "Nói chậm và dừng giữa các ý",
            "detail": "Mỗi ý một hơi, dừng ngắn giữa ý. Nói nhanh liền mạch làm máy gộp hai từ thành một."
          },
          {
            "label": "Tách rõ tên riêng",
            "detail": "Nói tên một lần thật rõ, có thể nói thêm họ hoặc tên công ty đi kèm để máy có ngữ cảnh."
          },
          {
            "label": "Đọc số từng chữ số",
            "detail": "Số điện thoại, mã hợp đồng đọc từng chữ số: 'không chín một hai', không đọc thành 'chín trăm mười hai'."
          },
          {
            "label": "Đọc lại bản chép",
            "detail": "Tìm tên riêng, địa danh và số trước, vì đó là chỗ sai hay gặp nhất."
          },
          {
            "label": "Đối chiếu nguồn thật và sửa tay",
            "detail": "So với danh thiếp, lịch hẹn, bản đồ, hợp đồng. Chỗ nào khác thì sửa tay, rồi mới gửi."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Soát bản chép giọng nói",
        "task": "Bạn nói vào điện thoại: 'Gửi chị Thuý ở Hàng Bồ, hẹn thứ Tư lúc hai giờ chiều, số điện thoại không chín một hai ba bốn năm sáu bảy tám.' Bản chép máy trả về như dưới đây. Đánh dấu những chỗ đã bị chép sai hoặc thêm vào.",
        "segments": [
          {
            "text": "Gửi chị Thủy ở Hàng Bồ.",
            "error": "Bạn nói 'Thuý' nhưng máy chép thành 'Thủy': hai tên nghe gần nhau nên phải đối chiếu với danh thiếp."
          },
          {
            "text": "Hẹn thứ Tư lúc hai giờ chiều."
          },
          {
            "text": "Số điện thoại 0912 345 678."
          },
          {
            "text": "Chị nhớ mang theo hợp đồng bản gốc.",
            "error": "Bạn không hề nói câu này. Một phần mềm sắp chữ có thể thêm câu cho trọn ý, nhưng đó không phải lời bạn."
          },
          {
            "text": "Địa chỉ: 18 Hàng Bồ, Hoàn Kiếm.",
            "error": "Bạn chỉ nói 'Hàng Bồ', chưa nói số nhà 18. Con số do bản chép thêm vào."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Nói chậm, đọc số từng chữ",
          "text": "Máy chép ít lỗi hơn ở tên riêng và số. Mất thêm vài giây mỗi lần nói, nhưng tiết kiệm thời gian sửa."
        },
        "right": {
          "label": "Nói nhanh liền mạch",
          "text": "Nghe tự nhiên và nhanh khi nói, nhưng máy gộp từ, nhầm dấu và bỏ chữ. Bạn mất nhiều thời gian hơn để sửa lại sau."
        }
      },
      {
        "type": "callout",
        "label": "Giọng vùng miền không có lỗi",
        "text": "Bạn không cần đổi giọng cho máy. Chỉ cần nói chậm hơn và soát kỹ hơn ở tên, địa danh, số. Nếu máy luôn sai một từ nhất định, sửa tay hoặc thêm từ đó vào danh sách tên riêng nếu ứng dụng cho phép."
      },
      {
        "type": "scenario",
        "title": "Tin nhắn cho khách lúc đang đi bộ",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn vừa ra khỏi toà nhà, nói vào điện thoại tin nhắn hẹn chị Thuý thứ Tư lúc hai giờ. Bản chép hiện ra trên màn hình.",
            "choices": [
              {
                "label": "Gửi ngay, vì bạn đã nói rõ ràng",
                "next": "bad_send"
              },
              {
                "label": "Đọc lại tên và giờ, đối chiếu tên với danh thiếp trong máy",
                "next": "s2"
              }
            ]
          },
          "bad_send": {
            "text": "Tin nhắn gửi 'chị Thủy'. Chị Thuý thấy mình bị gọi sai tên và phản hồi lạnh hơn thường lệ.",
            "ending": "bad"
          },
          "s2": {
            "text": "Tên trong tin là 'Thủy' còn danh thiếp ghi 'Thuý'.",
            "choices": [
              {
                "label": "Sửa tay thành 'Thuý' rồi gửi",
                "next": "good"
              },
              {
                "label": "Để nguyên vì hai tên đọc gần giống nhau",
                "next": "bad_keep"
              }
            ]
          },
          "bad_keep": {
            "text": "Khách đọc thấy tên mình bị viết sai và hiểu là bạn không cẩn thận.",
            "ending": "bad"
          },
          "good": {
            "text": "Tin nhắn đúng tên, đúng giờ. Chị Thuý trả lời xác nhận trong năm phút.",
            "ending": "good"
          }
        }
      },
      {
        "type": "list",
        "items": [
          "Nói chậm, dừng giữa ý, tách rõ tên riêng.",
          "Đọc số từng chữ số.",
          "Soát tên riêng, địa danh và số trước tiên.",
          "Sửa tay chỗ sai, rồi mới gửi."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Máy nghe được tiếng Việt, chỉ chưa nghe chắc tên riêng.",
          "Nói chậm một chút, soát ba chỗ, và giọng nói của bạn vẫn là công cụ nhanh nhất."
        ]
      }
    ]
  },
  {
    "id": 2384,
    "slug": "du-an-bo-ba-thoi-quen-nhap-lieu-bang-giong-noi",
    "title": "Chặng 49, Bài 5: Mini dự án: ba thói quen nhập liệu bằng giọng nói",
    "subtitle": "Chọn ba việc lặp lại, làm bằng miệng cả tuần, rồi đếm số phút tiết kiệm được.",
    "duration": "10 phút",
    "difficulty": "Dễ",
    "emoji": "⏱️",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Dùng giọng nói một lần thì chỉ là thử cho vui. Dùng cho đúng ba việc lặp lại mỗi ngày mới tạo ra khác biệt, vì số phút cộng dồn theo tuần. Bài này giúp bạn chọn ba việc hợp, cách làm, và cách đo xem nói có thật sự nhanh hơn gõ không.",
    "openingQuestion": "Bạn muốn dùng giọng nói để tiết kiệm thời gian. Cách bắt đầu nào hợp lý nhất?",
    "openingOptions": [
      "Chọn ba việc lặp lại, làm bằng miệng cả tuần rồi đếm số phút tiết kiệm được",
      "Chuyển mọi việc gõ sang nói ngay từ ngày đầu để tiết kiệm tối đa",
      "Chỉ thử một lần, thấy nhanh là kết luận luôn cho cả năm",
      "Đợi tới khi có công cụ hoàn hảo không bao giờ chép sai rồi mới dùng"
    ],
    "correctOption": 0,
    "explanation": "Ba việc lặp lại là đủ nhỏ để theo dõi và đủ lặp để thấy số phút cộng dồn. Đếm phút thật, gồm cả thời gian soát lại, cho bạn biết việc nào đáng chuyển sang nói và việc nào vẫn nên gõ. Chuyển mọi việc cùng lúc thì không biết việc nào hiệu quả. Thử một lần không đủ dữ liệu. Đợi công cụ hoàn hảo thì sẽ không bao giờ bắt đầu, vì bước soát luôn cần có.",
    "diagram": [
      {
        "label": "Chọn ba việc lặp lại: nhắc việc, nhật ký khách, nháp tin nhắn",
        "arrow": true
      },
      {
        "label": "Làm bằng giọng nói cả tuần, có bước soát",
        "arrow": true
      },
      {
        "label": "Ghi phút gõ trước đây và phút nói nay",
        "arrow": true
      },
      {
        "label": "Giữ thói quen nào nhanh thật, bỏ cái nào không đáng"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: chị Ngọc làm chăm sóc khách hàng, mỗi ngày ghi khoảng tám nhật ký cuộc gọi. Chị thử nói nhật ký vào điện thoại trong một tuần và tự bấm giờ. Với nhật ký dài, nói nhanh hơn gõ rõ rệt. Với nhật ký chỉ một dòng, việc mở ứng dụng và soát làm nó không nhanh hơn. Chị giữ thói quen nói cho nhật ký dài và tiếp tục gõ những ghi chú một dòng."
    },
    "quiz": [
      {
        "question": "Vì sao nên bắt đầu bằng ba việc lặp lại chứ không phải tất cả mọi việc?",
        "options": [
          "Ba việc đủ nhỏ để theo dõi và đủ lặp để thấy số phút cộng dồn",
          "Vì điện thoại chỉ cho phép nhập giọng nói ba lần mỗi ngày trong một ứng dụng",
          "Vì ba việc là số lượng tối đa AI xử lý",
          "Vì những việc khác luôn gõ nhanh hơn"
        ],
        "correct": 0,
        "explanation": "Quá nhiều việc cùng lúc làm bạn không biết việc nào hiệu quả. Ba việc lặp lại cho đủ số liệu sau một tuần. Không có giới hạn ba lần mỗi ngày, AI không bị giới hạn ở ba việc, và việc khác không phải lúc nào cũng gõ nhanh hơn."
      },
      {
        "question": "Khi so nói với gõ, cần tính những phút nào cho bên nói?",
        "options": [
          "Cả phút nói lẫn phút soát và sửa lại bản chép",
          "Chỉ phút nói, vì máy tự sửa phần còn lại",
          "Chỉ phút soát, vì phần nói không mất thời gian đáng kể",
          "Không cần tính, chỉ cần cảm giác"
        ],
        "correct": 0,
        "explanation": "Nói nhanh nhưng bản chép cần soát và sửa, và thời gian đó là một phần của việc. Nếu bỏ phút soát thì số tiết kiệm bị thổi phồng. Máy không tự sửa hết lỗi, nói vẫn mất thời gian, và cảm giác dễ lệch hơn số đo thật."
      },
      {
        "question": "Mỗi việc gõ 3 phút, nói và soát mất 1,5 phút. Làm 8 việc mỗi ngày thì tiết kiệm bao nhiêu phút?",
        "options": [
          "12 phút (8 × (3 − 1,5) = 12)",
          "24 phút (8 × 3, bỏ qua phút nói và soát)",
          "1,5 phút (3 − 1,5, quên nhân với số việc)",
          "36 phút (8 × (3 + 1,5), cộng thay vì trừ)"
        ],
        "correct": 0,
        "explanation": "Mỗi việc tiết kiệm 3 − 1,5 = 1,5 phút, nhân 8 việc được 12 phút. 24 là chỉ tính thời gian gõ và quên trừ thời gian nói. 1,5 quên nhân số việc. 36 cộng hai thời gian lại thay vì trừ, là lỗi dấu hay gặp."
      },
      {
        "question": "Nhật ký khách chỉ có một dòng, nói lại mất thêm bước mở ứng dụng. Nên làm gì?",
        "options": [
          "Đo thử, nếu không nhanh hơn thì vẫn gõ cho loại ghi chú ngắn",
          "Bắt buộc nói cho mọi việc để nhất quán hơn",
          "Bỏ nhật ký một dòng vì không đáng ghi",
          "Nhờ AI gộp nhật ký thành một lần mỗi tuần"
        ],
        "correct": 0,
        "explanation": "Nói có lợi nhất với nội dung dài, nơi gõ tốn nhiều thời gian. Ghi chú rất ngắn thì chi phí mở ứng dụng và soát có thể bằng thời gian gõ. Ép nhất quán làm mất thời gian. Bỏ nhật ký làm mất thông tin, và gộp một lần mỗi tuần làm bạn quên chi tiết."
      },
      {
        "question": "Sau một tuần, bạn thấy việc nháp tin nhắn bằng nói tiết kiệm 10 phút nhưng đôi khi sai tên khách. Quyết định hợp lý là gì?",
        "options": [
          "Giữ thói quen nói, thêm bước soát tên khách trước khi gửi",
          "Bỏ nói hẳn vì đã có lúc sai tên khách",
          "Gửi luôn vì 10 phút tiết kiệm được là quan trọng nhất",
          "Chuyển sang gõ tất cả các việc khác cho chắc"
        ],
        "correct": 0,
        "explanation": "Số phút tiết kiệm có thật, còn lỗi tên khách được chặn bằng bước soát. Bỏ hẳn vì một lỗi là quá tay. Gửi không soát đổi 10 phút lấy rủi ro làm phật lòng khách. Gõ tất cả cũng không bảo đảm không sai tên, và mất hết số phút đã tiết kiệm."
      }
    ],
    "keyTakeaways": [
      "Chọn ba việc lặp lại, không phải mọi việc.",
      "Đếm cả phút nói lẫn phút soát.",
      "Nói có lợi nhất với nội dung dài.",
      "Việc ngắn một dòng có thể vẫn gõ nhanh hơn.",
      "Sau một tuần, giữ cái nhanh thật và bỏ cái không đáng."
    ],
    "practicePrompt": {
      "question": "Anh Nam thử nói nhắc việc một tuần, thấy mỗi việc mất 1 phút nói nhưng anh không tính thời gian soát. Anh kết luận 'nói nhanh gấp 3 lần gõ'. Điều gì còn thiếu?",
      "options": [
        "Tính thêm thời gian soát và sửa rồi so lại",
        "Nói thêm một tuần nữa cho chắc",
        "Thay đổi cách gõ cho nhanh hơn",
        "Bỏ phần nhắc việc dài"
      ],
      "correct": 0,
      "explanation": "Kết luận bỏ qua chi phí soát nên có thể thổi phồng lợi ích. Chỉ khi tính đủ, anh mới biết nói có thật sự nhanh hơn. Nói thêm một tuần mà vẫn không tính soát sẽ lặp lại sai sót. Thay cách gõ hay bỏ phần nhắc dài thì không liên quan tới thiếu sót trong phép đo."
    },
    "summary": {
      "keyIdea": "Giọng nói chỉ đáng dùng khi bạn đo được nó nhanh hơn, và cách đo phải tính cả bước soát.",
      "formula": "Phút gõ − (phút nói + phút soát) = phút tiết kiệm mỗi việc, nhân với số việc mỗi ngày.",
      "commonMistake": "Chỉ bấm giờ phần nói và quên phần soát nên tưởng mình nhanh hơn thực tế.",
      "action": "Chọn ba việc, ghi số phút trước và sau trong một tuần."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn ba việc bạn lặp lại mỗi ngày như ghi nhắc việc, nhật ký khách và nháp tin nhắn. Hôm nay làm mỗi việc một lần bằng giọng nói và bấm giờ cả bước soát. Ghi vào một ghi chú: việc, phút gõ thường lệ, phút nói cộng soát.",
      "secondary": "Ngày mai xem việc nào tiết kiệm nhiều nhất và giữ cho cả tuần."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bạn đã biết nói vào điện thoại, đã biết soát bản chép. Bài cuối của phần này là biến nó thành thói quen có số liệu: ba việc lặp lại, một tuần, và một phép đo trung thực."
      },
      {
        "type": "feynman",
        "title": "Thói quen nhập liệu bằng giọng nói đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới việc đi làm bằng xe máy thay vì đi bộ: một lần thì chưa thấy gì, nhưng mỗi ngày nhanh hơn mười phút thì cả tháng là mấy tiếng. Nhưng nếu đoạn đường chỉ hai trăm mét thì đi bộ còn nhanh hơn, vì lấy xe và khoá xe cũng mất thời gian.",
        "columns": [
          "Khái niệm",
          "Xe máy và đi bộ",
          "Nói và gõ"
        ],
        "rows": [
          [
            "Đường dài",
            "Xe máy nhanh hơn rõ",
            "Nhật ký dài: nói nhanh hơn"
          ],
          [
            "Đường ngắn",
            "Đi bộ nhanh hơn",
            "Ghi chú một dòng: gõ có thể nhanh hơn"
          ],
          [
            "Chi phí ẩn",
            "Lấy xe, khoá xe",
            "Mở ứng dụng, soát bản chép"
          ],
          [
            "Cách biết",
            "Bấm giờ cả quãng",
            "Bấm giờ cả nói lẫn soát"
          ]
        ],
        "oneLiner": "Nói nhanh hơn gõ khi nội dung dài, và chỉ tính là tiết kiệm nếu bạn đã trừ cả thời gian soát."
      },
      {
        "type": "heading",
        "text": "Ba việc hợp với giọng nói"
      },
      {
        "type": "paragraph",
        "text": "Hợp nhất là những việc bạn làm đều đặn, nội dung hơi dài và không cần định dạng phức tạp: ghi nhắc việc cho bản thân, nhật ký sau mỗi cuộc gặp khách, và nháp tin nhắn trả lời. Những việc cần chính xác tuyệt đối như nhập số liệu thanh toán thì để tay gõ."
      },
      {
        "type": "flow",
        "title": "Một tuần thử nghiệm ba thói quen",
        "steps": [
          {
            "label": "Chọn ba việc lặp lại",
            "detail": "Ví dụ: nhắc việc buổi sáng, nhật ký khách sau cuộc gọi, nháp tin nhắn trả lời. Chọn việc bạn làm ít nhất năm lần mỗi tuần."
          },
          {
            "label": "Ghi phút gõ thường lệ",
            "detail": "Bấm giờ một lần mỗi việc theo cách cũ để có số so sánh thật."
          },
          {
            "label": "Làm bằng giọng nói",
            "detail": "Nói, để AI sắp ý nếu cần, soát tên và số, rồi lưu. Bấm giờ từ lúc mở ứng dụng tới lúc lưu xong."
          },
          {
            "label": "Ghi lại cuối ngày",
            "detail": "Mỗi ngày ghi phút nói cộng soát cho từng việc. Ghi cả những lần bản chép phải sửa nhiều."
          },
          {
            "label": "Quyết định cuối tuần",
            "detail": "Giữ việc nào tiết kiệm rõ, bỏ hoặc đổi việc nào không nhanh hơn, và cộng số phút cả tuần."
          }
        ]
      },
      {
        "type": "chart",
        "title": "Số phút gõ so với số phút nói cho cùng một việc",
        "kind": "line",
        "caption": "Số liệu minh hoạ: kéo thanh trượt để thấy số phút mỗi ngày khi gõ và khi nói rồi soát. Đường nào thấp hơn là cách nhanh hơn với số việc đó.",
        "xLabel": "Số việc làm mỗi ngày",
        "yLabel": "Tổng số phút",
        "x": {
          "from": 1,
          "to": 10,
          "step": 1
        },
        "params": [
          {
            "id": "t",
            "label": "Phút gõ mỗi việc",
            "min": 1,
            "max": 5,
            "step": 0.5,
            "value": 3,
            "unit": "phút"
          },
          {
            "id": "s",
            "label": "Phút nói và soát mỗi việc",
            "min": 0.5,
            "max": 4,
            "step": 0.5,
            "value": 1.5,
            "unit": "phút"
          }
        ],
        "series": [
          {
            "label": "Gõ tay",
            "expr": "x * t"
          },
          {
            "label": "Nói rồi soát",
            "expr": "x * s"
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Dặn AI sắp ghi chú nói thành nhật ký khách",
        "task": "Bạn vừa nói vào điện thoại: 'Gọi anh Phát, anh muốn đổi giao hàng sang thứ Sáu, hỏi giá thêm cho 20 hộp, hẹn gọi lại thứ Ba.' Hãy lắp lời dặn để AI viết nhật ký ngắn đúng ý.",
        "parts": [
          {
            "id": "source",
            "label": "Nguồn thông tin",
            "options": [
              {
                "text": "Viết nhật ký cho cuộc gọi với khách giúp tôi.",
                "feedback": "Không có nội dung thật nên AI bịa ra một cuộc gọi chung chung, có thể có lý do đổi lịch bạn chưa nghe."
              },
              {
                "text": "Đây là lời tôi nói: (dán). Chỉ dùng thông tin trong đó.",
                "good": true,
                "feedback": "AI làm việc trên nguyên liệu thật của bạn, nên nhật ký chỉ ghi điều bạn đã nói."
              }
            ]
          },
          {
            "id": "shape",
            "label": "Khuôn dạng",
            "options": [
              {
                "text": "Viết một đoạn văn thật dài, mô tả đầy đủ cuộc gọi.",
                "feedback": "Đoạn dài thì AI kéo dài bằng chi tiết bịa, còn nhật ký về sau khó đọc."
              },
              {
                "text": "Ba dòng gạch đầu dòng: khách, yêu cầu, việc tiếp theo kèm ngày.",
                "good": true,
                "feedback": "Khuôn cố định giúp bạn tra cứu nhanh, và mỗi dòng có một nhiệm vụ rõ."
              }
            ]
          },
          {
            "id": "limit",
            "label": "Điều cấm",
            "options": [
              {
                "text": "Thêm nhận xét của bạn về thái độ khách để nhật ký hay hơn.",
                "feedback": "Nhận xét về thái độ là điều AI tự nghĩ ra, và nó sẽ nằm trong hồ sơ khách như một sự thật."
              },
              {
                "text": "Không thêm lý do, số lượng hay ngày nào tôi chưa nói.",
                "good": true,
                "feedback": "Chặn đúng chỗ AI hay điền thêm, nên nhật ký chỉ có sự việc đã xảy ra."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "source",
              "shape",
              "limit"
            ],
            "text": "- Khách: anh Phát\n- Yêu cầu: đổi giao hàng sang thứ Sáu; hỏi giá thêm cho 20 hộp\n- Việc tiếp theo: gọi lại anh Phát vào thứ Ba"
          },
          {
            "requires": [
              "source"
            ],
            "text": "Anh Phát gọi vì cần đổi lịch do kẹt kho, muốn hỏi giá 20 hộp và có vẻ hơi sốt ruột.\n\n(Đúng ý chính nhưng AI thêm lý do 'kẹt kho' và 'sốt ruột' bạn chưa nghe.)"
          },
          {
            "text": "Cuộc gọi với khách hàng diễn ra thuận lợi. Hai bên trao đổi về giao hàng và thống nhất sẽ liên hệ lại trong thời gian tới.\n\n(Chung chung, không có thứ Sáu, 20 hộp hay thứ Ba.)"
          }
        ]
      },
      {
        "type": "callout",
        "label": "Đo bằng số thật, không bằng cảm giác",
        "text": "Cảm giác 'nói nhanh hơn' thường đúng ở những ngày đầu vì bạn thấy mới, rồi lệch dần. Hãy ghi phút, cộng cả bước soát. Con số dưới một phút chênh lệch mỗi việc là chưa chắc, cần nhìn cả tuần mới kết luận."
      },
      {
        "type": "scenario",
        "title": "Cuối tuần tổng kết ba thói quen",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn đã ghi phút cả tuần. Nhắc việc tiết kiệm 12 phút, nhật ký khách tiết kiệm 20 phút, nháp tin nhắn tiết kiệm 10 phút nhưng hai lần sai tên khách.",
            "choices": [
              {
                "label": "Giữ cả ba thói quen và thêm bước soát tên khách trước khi gửi",
                "next": "good"
              },
              {
                "label": "Bỏ nháp tin nhắn vì đã có hai lần sai tên",
                "next": "s2"
              }
            ]
          },
          "s2": {
            "text": "Bạn quay lại gõ tin nhắn và mất thêm 10 phút mỗi tuần. Vài ngày sau bạn nhận ra lỗi sai tên chỉ cần soát là tránh được.",
            "choices": [
              {
                "label": "Quay lại nói, thêm bước soát tên",
                "next": "good"
              },
              {
                "label": "Tiếp tục gõ và bỏ luôn thói quen nói",
                "next": "bad_quit"
              }
            ]
          },
          "bad_quit": {
            "text": "Sau một tháng bạn quay lại gõ tất cả. Số phút tiết kiệm biến mất và bạn kết luận giọng nói không có ích.",
            "ending": "bad"
          },
          "good": {
            "text": "Cả ba thói quen được giữ, số phút tiết kiệm cộng dồn hơn 40 phút mỗi tuần theo số liệu của bạn, và tin nhắn đều qua bước soát tên.",
            "ending": "good"
          }
        }
      },
      {
        "type": "list",
        "items": [
          "Chọn ba việc lặp lại, không phải mọi việc.",
          "Bấm giờ cả nói lẫn soát.",
          "Nội dung dài lợi nhất, ghi chú ngắn chưa chắc.",
          "Cuối tuần giữ cái nhanh thật."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Ba thói quen, một tuần, một bảng phút: đó là toàn bộ dự án.",
          "Giọng nói là công cụ, con số mới là bằng chứng."
        ]
      }
    ]
  }
];
