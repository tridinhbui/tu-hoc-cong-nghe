import type { Lesson } from "../lesson-types";

// Chặng 55, bài 6-10. Giáo trình: scripts/curriculum/stage-55.json.
export const S55_B_LESSONS: Lesson[] = [
  {
    "id": 2505,
    "slug": "cong-duyet-khi-nao-bat-buoc-co-nguoi",
    "title": "Chặng 55, Bài 6: Cổng duyệt: những thứ không bao giờ đi ra ngoài khi chưa ai xem",
    "subtitle": "Như cổng bảo vệ công ty: không phải ai cũng bị chặn, nhưng xe chở hàng quý thì luôn phải dừng.",
    "duration": "8 phút",
    "difficulty": "Dễ",
    "emoji": "🚦",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Khi quy trình có AI chạy trơn tru, sẽ có lúc một email, một báo giá hay một tin nhắn đi ra khỏi công ty mà chưa ai đọc. Nếu bạn chưa vạch sẵn loại nào bắt buộc có người duyệt, lần đầu sai sót sẽ là lúc bạn biết mình cần cổng duyệt, và lúc đó khách hàng đã đọc rồi.",
    "openingQuestion": "Quy trình trả lời khách của phòng bạn có AI soạn nháp rồi gửi tự động. Sáng nay một email hứa hoàn tiền đã đi ra ngoài. Điều gì đáng lẽ phải có từ đầu?",
    "openingOptions": [
      "Một cổng duyệt: loại đầu ra có cam kết tiền thì phải qua người xem",
      "Một AI khác đọc lại email rồi tự xác nhận là ổn trước khi gửi đi cho khách",
      "Lời dặn trong prompt: hãy cẩn thận khi nhắc tới tiền hoàn",
      "Một bộ lọc chặn email dài hơn 200 chữ trước khi gửi đi"
    ],
    "correctOption": 0,
    "explanation": "Điểm mấu chốt là quyết định nằm ở người có thẩm quyền, không nằm ở máy. Cổng duyệt biến câu \"hãy cẩn thận\" thành một bước bắt buộc: email có cam kết tiền không đi ra nếu chưa có người xem. Một AI khác đọc lại vẫn là máy và có thể cùng sai một kiểu. Lời dặn trong prompt không phải chốt chặn vì AI có thể bỏ qua. Lọc theo độ dài không liên quan tới rủi ro: một email ngắn hứa hoàn tiền vẫn gây thiệt hại như email dài.",
    "diagram": [
      {
        "label": "AI soạn nháp đầu ra",
        "arrow": true
      },
      {
        "label": "Kiểm tra: có tiền, cam kết hay dữ liệu khách không?",
        "arrow": true
      },
      {
        "label": "Có: chờ người duyệt đã được chỉ định",
        "arrow": true
      },
      {
        "label": "Người duyệt đồng ý rồi mới gửi ra ngoài"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: phòng chăm sóc khách hàng 8 người",
      "description": "Phòng dùng AI soạn thư trả lời khách. Sau một lần AI hứa \"hoàn tiền toàn bộ\" trong thư chưa ai đọc, trưởng phòng ghi ra ba loại thư bắt buộc qua người duyệt: có số tiền, có lời cam kết thời hạn, và có thông tin cá nhân của khách. Thư hỏi giờ mở cửa hay cách đổi mật khẩu vẫn gửi thẳng. Người duyệt được chỉ định theo ca, nên không ai phải đoán \"việc này của ai\"."
    },
    "quiz": [
      {
        "question": "Loại đầu ra nào nên luôn đi qua người duyệt trước khi ra ngoài?",
        "options": [
          "Mọi thứ có tiền, cam kết với khách hoặc dữ liệu cá nhân của khách",
          "Chỉ những email dài hơn một trang giấy A4 khi in ra, vì thư ngắn thì ít rủi ro",
          "Chỉ email mà AI tự báo là mình không chắc chắn lắm về nội dung đã viết ra",
          "Chỉ email gửi cho khách mới, còn khách cũ quen biết thì để gửi thẳng cho nhanh"
        ],
        "correct": 0,
        "explanation": "Ba nhóm tiền, cam kết và dữ liệu cá nhân là nơi sai sót tốn kém nhất và khó rút lại. Độ dài không đo rủi ro. AI hầu như không biết khi nào mình sai, nên \"tự báo không chắc\" không đáng tin. Khách cũ cũng nhận cam kết sai như khách mới."
      },
      {
        "question": "Câu nào mô tả đúng chức năng của cổng duyệt?",
        "options": [
          "Bước bắt buộc chặn đầu ra cho tới khi người có thẩm quyền đồng ý",
          "Dòng nhắc trong prompt để AI tự kiểm lại trước khi trả lời",
          "Một thống kê cuối tuần cho biết AI đã sai bao nhiêu lần",
          "Bảng chấm điểm để AI xếp hạng những câu trả lời của chính nó trước khi gửi"
        ],
        "correct": 0,
        "explanation": "Cổng duyệt là chốt chặn thật: đầu ra đứng yên tới khi có người bấm đồng ý. Lời nhắc trong prompt có thể bị bỏ qua, thống kê cuối tuần tới sau khi sự cố đã xảy ra, và AI tự chấm điểm mình vẫn chỉ là máy kiểm máy."
      },
      {
        "question": "Vì sao cần chỉ định đích danh người duyệt cho từng loại đầu ra?",
        "options": [
          "Nếu ai cũng có thể duyệt thì mỗi người nghĩ người khác đã xem",
          "Để có người bị phạt khi AI viết sai một chi tiết nhỏ",
          "Vì mỗi email chỉ được phép có đúng một người đọc lại",
          "Để người duyệt biết mình duyệt nhanh hơn người còn lại"
        ],
        "correct": 0,
        "explanation": "Khi trách nhiệm chung, thường không ai kiểm: mỗi người tin người kia đã đọc. Chỉ định đích danh (hoặc theo ca) làm rõ ai phải xem. Mục đích không phải phạt, cũng không giới hạn số người đọc hay thi nhanh."
      },
      {
        "question": "Email hướng dẫn đổi mật khẩu theo mẫu có sẵn, AI chỉ điền tên khách. Nên xử lý thế nào?",
        "options": [
          "Cho gửi thẳng, dùng mẫu cố định và kiểm tra mẫu định kỳ",
          "Bắt người duyệt đọc từng thư để chắc không có sai sót",
          "Dừng hẳn việc dùng AI ở bước này vì mọi thứ đều có rủi ro",
          "Gửi trễ một ngày để người duyệt có thời gian đọc kỹ hơn"
        ],
        "correct": 0,
        "explanation": "Cổng duyệt chỉ nên đặt ở nơi rủi ro cao. Thư theo mẫu cố định, không tiền, không cam kết, là loại cho đi thẳng để người duyệt dành sức cho loại cần xem thật. Duyệt tất cả làm người duyệt mệt và bấm đồng ý cho xong (bài 8), còn trì hoãn không làm thư an toàn hơn."
      },
      {
        "question": "AI soạn bảng báo giá có giảm 15% cho khách. Ai nên là người duyệt?",
        "options": [
          "Người có quyền quyết định mức giảm giá, không phải người soạn",
          "Chính người nhờ AI soạn, vì họ hiểu rõ yêu cầu nhất",
          "Một đồng nghiệp bất kỳ đang rảnh ở phòng bên cạnh",
          "Khách hàng nhận báo giá, họ sẽ tự phản hồi lại nếu thấy có gì đó sai sót"
        ],
        "correct": 0,
        "explanation": "Người duyệt phải là người có thẩm quyền với nội dung đó. Mức giảm là quyết định của người có quyền về giá. Người nhờ AI soạn dễ duyệt theo ý mình, đồng nghĩa không có cổng thật. Đồng nghĩa rảnh nhưng không có quyền thì đồng ý cũng không có giá trị. Dùng khách làm bước kiểm tra là đã gửi ra ngoài rồi."
      }
    ],
    "keyTakeaways": [
      "Cổng duyệt là bước bắt buộc, không phải lời nhắc trong prompt.",
      "Ba loại đầu ra luôn qua người: tiền, cam kết, dữ liệu cá nhân của khách.",
      "Chỉ định đích danh người duyệt, theo ca nếu cần.",
      "Chỉ đặt cổng ở nơi rủi ro cao, để người duyệt còn sức xem thật."
    ],
    "practicePrompt": {
      "question": "Quy trình gửi thư nhắc thanh toán: AI soạn, hệ thống tự gửi. Bạn chọn bổ sung cổng duyệt ở đâu?",
      "options": [
        "Thư nhắc có lãi chậm trả hoặc hạn mới thì qua kế toán trước khi gửi",
        "Mọi thư nhắc, kể cả nhắc nhẹ theo mẫu, đều cần trưởng phòng đọc",
        "Không cần cổng vì khách sẽ gọi lại nếu thấy thư có gì sai",
        "Chỉ thêm câu \"hãy kiểm tra số tiền\" vào cuối prompt cho AI rồi gửi thẳng"
      ],
      "correct": 0,
      "explanation": "Lãi chậm trả và hạn mới là cam kết có tiền nên cần người có thẩm quyền xem. Thư nhắc nhẹ theo mẫu không cần cổng. Chờ khách phản hồi là để khách tìm lỗi thay bạn, và lời dặn trong prompt không phải chốt chặn."
    },
    "summary": {
      "keyIdea": "Quy trình an toàn không phải quy trình chậm: chỉ chặn đúng loại đầu ra mà sai một lần là mất nhiều.",
      "formula": "Có tiền, cam kết hoặc dữ liệu khách thì đi qua người duyệt đích danh; còn lại cho đi thẳng.",
      "commonMistake": "Bắt duyệt tất cả, hoặc không duyệt gì vì đã dặn AI cẩn thận trong prompt.",
      "action": "Viết ra ba loại đầu ra của bạn bắt buộc có người xem, và tên người duyệt cho từng loại."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Lấy một quy trình thật trong việc của bạn (ví dụ trả lời khách, gửi báo giá, báo cáo tuần). Viết ra giấy hoặc một file ghi chú: (1) ba loại đầu ra bắt buộc có người duyệt, (2) tên người duyệt cho từng loại, (3) một loại cho đi thẳng. Gửi bản này cho người bạn chỉ định duyệt để hỏi họ có đồng ý không.",
      "secondary": "Ngày mai bạn sẽ được hỏi: loại nào bạn đặt cổng, và ai được chọn làm người duyệt?"
    },
    "sections": [
      {
        "type": "lead",
        "text": "Nhiều quy trình có AI hỏng không vì AI viết dở, mà vì một bản nháp chưa ai đọc đã đi ra ngoài. Bài này cho bạn cách vạch sẵn ranh giới: cái gì đi thẳng, cái gì phải dừng lại chờ một người thật."
      },
      {
        "type": "feynman",
        "title": "Cổng duyệt đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới cổng bảo vệ của một công ty. Xe nhân viên chạy vào thẳng, nhưng xe chở hàng giá trị cao phải dừng, chờ bảo vệ kiểm giấy tờ rồi mới được ra.",
        "columns": [
          "Thành phần",
          "Cổng bảo vệ công ty",
          "Cổng duyệt trong quy trình AI"
        ],
        "rows": [
          [
            "Ai qua thẳng",
            "Nhân viên quẹt thẻ, ra vào bình thường",
            "Thư mẫu, câu trả lời thông tin chung, không tiền không cam kết"
          ],
          [
            "Ai bị giữ lại",
            "Xe chở hàng quý, kiện lớn",
            "Đầu ra có tiền, cam kết hoặc dữ liệu cá nhân của khách"
          ],
          [
            "Người kiểm",
            "Bảo vệ ca trực, có tên và có quyền",
            "Người duyệt được chỉ định, có thẩm quyền"
          ],
          [
            "Khi lỡ không kiểm",
            "Hàng ra khỏi cổng, khó lấy lại",
            "Thư đã gửi, khó thu hồi"
          ]
        ],
        "oneLiner": "Cổng duyệt là chỗ dừng bắt buộc cho đầu ra rủi ro cao, để phần còn lại chạy nhanh."
      },
      {
        "type": "heading",
        "text": "Nhìn vào một buổi sáng có sự cố"
      },
      {
        "type": "paragraph",
        "text": "Một khách hỏi về đơn hàng bị giao trễ. AI soạn thư xin lỗi và, để làm khách vui, viết thêm \"chúng tôi sẽ hoàn tiền toàn bộ\". Hệ thống tự gửi. Không ai quyết định hoàn tiền cả, nhưng khách đã có lời hứa bằng văn bản. Đây là lỗi của quy trình thiếu cổng, không chỉ của AI."
      },
      {
        "type": "flow",
        "title": "Đường đi của một thư qua cổng duyệt",
        "steps": [
          {
            "label": "AI soạn nháp",
            "detail": "AI nhận nội dung khách hỏi và viết bản nháp. Bản nháp chưa phải là thư, nó mới chỉ là đề xuất."
          },
          {
            "label": "Kiểm loại đầu ra",
            "detail": "Quy trình hỏi ba câu: có số tiền không, có cam kết thời hạn hay quyền lợi không, có thông tin cá nhân của khách không."
          },
          {
            "label": "Rẽ nhánh",
            "detail": "Cả ba đều không: cho đi thẳng. Một trong ba là có: đầu ra dừng lại ở trạng thái chờ duyệt."
          },
          {
            "label": "Người duyệt xem",
            "detail": "Người được chỉ định đọc bản nháp, sửa hoặc từ chối. Nếu họ không có thẩm quyền về nội dung đó, việc chuyển tiếp cho người có quyền là một phần của cổng."
          },
          {
            "label": "Gửi ra ngoài",
            "detail": "Chỉ sau khi có đồng ý, thư mới được gửi. Mọi thư bị sửa hay từ chối đều được ghi lại để sau này xem lại."
          }
        ]
      },
      {
        "type": "heading",
        "text": "Ba loại đầu ra luôn có người xem"
      },
      {
        "type": "list",
        "items": [
          "Tiền: số tiền, giá, mức giảm, hoàn tiền, phạt, lãi.",
          "Cam kết: thời hạn giao, bảo hành, điều khoản, lời hứa thay mặt công ty.",
          "Dữ liệu khách: tên, số điện thoại, đơn hàng, thông tin cá nhân gửi hoặc tham chiếu trong thư."
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Cho đi thẳng",
          "text": "Thư theo mẫu cố định, câu trả lời về giờ làm việc, hướng dẫn thao tác chung, nội dung nội bộ không đến khách. Kiểm mẫu định kỳ là đủ."
        },
        "right": {
          "label": "Phải qua người duyệt",
          "text": "Thư có số tiền hoặc mức giảm, thư hứa thời hạn, thư chứa thông tin cá nhân, mọi thứ mà nếu sai thì khó rút lại hoặc phải xin lỗi khách."
        }
      },
      {
        "type": "callout",
        "label": "Đừng nhầm cổng với lời dặn",
        "text": "Dòng \"hãy cẩn thận với số tiền\" trong prompt là lời nhắc, AI có thể bỏ qua. Cổng duyệt là bước trong quy trình: thiếu đồng ý của người thì đầu ra không đi tiếp. Chỉ cái sau mới là chốt chặn."
      },
      {
        "type": "scenario",
        "title": "Thư hoàn tiền lúc 4 giờ chiều",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn phụ trách quy trình trả lời khách. Hệ thống vừa đẩy ra một bản nháp AI viết cho khách Hương: xin lỗi vì giao trễ và đề nghị hoàn 30% giá trị đơn. Chưa ai quy định người duyệt cho thư loại này.",
            "choices": [
              {
                "label": "Cho gửi luôn vì thư viết lịch sự và nội dung nghe hợp lý",
                "next": "bad_send"
              },
              {
                "label": "Giữ thư lại, hỏi ai có quyền quyết định mức hoàn tiền",
                "next": "s2"
              }
            ]
          },
          "bad_send": {
            "text": "Khách Hương nhận thư và phản hồi ngay: cảm ơn và đòi hoàn đúng 30%. Chính sách công ty chỉ cho hoàn tối đa 10% trong trường hợp này. Bạn phải xin lỗi khách vì lời hứa không ai có quyền đưa ra.",
            "ending": "bad"
          },
          "s2": {
            "text": "Trưởng phòng cho biết người duyệt mọi thư có tiền là chị Thảo bên bộ phận kế toán. Chị đang trong họp, có thể trả lời sau 40 phút. Khách hàng đang chờ.",
            "choices": [
              {
                "label": "Gửi bản thư chỉ có lời xin lỗi và nói sẽ phản hồi về quyền lợi sau khi có xác nhận",
                "next": "s3"
              },
              {
                "label": "Đẩy thư sang một đồng nghiệp đang rảnh để duyệt cho nhanh",
                "next": "bad_wrong"
              }
            ]
          },
          "bad_wrong": {
            "text": "Đồng nghiệp đọc thấy thư ổn và đồng ý. Nhưng người này không có quyền về hoàn tiền, nên đồng ý đó không có giá trị. Thư đi ra với mức 30% sai chính sách, và khi sự cố xảy ra không ai rõ ai chịu trách nhiệm.",
            "ending": "bad"
          },
          "s3": {
            "text": "Khách nhận lời xin lỗi sớm. Sau khi chị Thảo xem, mức hoàn được sửa thành 10% theo đúng chính sách và gửi tiếp. Quy trình ghi lại lần duyệt này.",
            "choices": [
              {
                "label": "Ghi rõ vào quy trình: thư có tiền luôn qua kế toán, kèm tên người thay thế khi vắng",
                "next": "good"
              },
              {
                "label": "Coi đây là việc ngoại lệ và quay lại cách làm cũ",
                "next": "bad_back"
              }
            ]
          },
          "bad_back": {
            "text": "Hai tuần sau một thư hứa giảm giá khác lại ra ngoài mà chưa ai xem, vì người thay thế không được chỉ định. Cổng chỉ tồn tại khi nó được viết vào quy trình.",
            "ending": "bad"
          },
          "good": {
            "text": "Từ nay thư có tiền tự động dừng ở trạng thái chờ duyệt, có người chính và người thay. Khách không bị chờ lâu, và không lời hứa nào ra ngoài mà chưa có người có quyền gật đầu.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Cổng duyệt đặt ở nơi sai một lần là mất nhiều: tiền, cam kết, dữ liệu khách.",
          "Bài sau: phiếu duyệt - làm sao để người duyệt nhìn 30 giây là biết phải kiểm gì."
        ]
      }
    ]
  },
  {
    "id": 2506,
    "slug": "phieu-duyet-nguoi-xem-can-nhin-thay-gi",
    "title": "Chặng 55, Bài 7: Phiếu duyệt tốt: người xem cần thấy gì trong 30 giây",
    "subtitle": "Như phiếu kiểm hàng: người kiểm không cần đọc cả lô, chỉ cần thấy đúng ba thứ để quyết định.",
    "duration": "8 phút",
    "difficulty": "Dễ",
    "emoji": "📝",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Cổng duyệt chỉ có tác dụng khi người duyệt thật sự xem được điều cần xem. Nếu phiếu chỉ là bản nháp của AI trơ trọi, người duyệt phải tự đi tìm đầu vào gốc và đoán chỗ rủi ro, nên sẽ đọc lướt và bấm đồng ý. Phiếu thiết kế tốt biến 30 giây thành một lần kiểm thật.",
    "openingQuestion": "Người duyệt nhận một bản nháp email AI soạn. Không có gì khác. Vì sao họ khó phát hiện AI bịa một chi tiết?",
    "openingOptions": [
      "Họ không thấy yêu cầu gốc nên không đối chiếu được bản nháp",
      "Bản nháp của AI luôn dài hơn mức người thường muốn đọc hết nên họ bỏ qua",
      "AI viết hay quá nên người duyệt ngại sửa lại câu của nó",
      "Họ chưa được đào tạo cách đọc văn bản do máy viết ra"
    ],
    "correctOption": 0,
    "explanation": "Muốn biết AI có bịa không, phải đặt bản nháp cạnh thứ nó dựa vào. Nếu phiếu chỉ có bản nháp, người duyệt chỉ đánh giá được giọng văn và sự mạch lạc, không đánh giá được sự đúng sai so với yêu cầu gốc. Độ dài và sự ngại ngùng là triệu chứng phụ, còn chuyện đào tạo không giải quyết được việc thiếu đầu vào để so. Vì vậy phiếu tốt luôn gồm ba phần: đầu vào gốc, bản AI soạn, và điểm cần kiểm.",
    "diagram": [
      {
        "label": "Đầu vào gốc: yêu cầu của khách",
        "arrow": true
      },
      {
        "label": "Bản AI soạn ngay cạnh đó",
        "arrow": true
      },
      {
        "label": "Điểm cần kiểm: số, tên, cam kết được tô sẵn",
        "arrow": true
      },
      {
        "label": "Quyết định: đồng ý, sửa hoặc từ chối"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: nhóm kế toán công nợ 5 người",
      "description": "Nhóm dùng AI soạn thư xác nhận công nợ. Lúc đầu người duyệt chỉ nhận bản thư và hay bỏ sót con số sai. Sau khi đổi phiếu thành ba phần, bản thư, bảng công nợ gốc bên cạnh và danh sách ba con số cần đối chiếu, người duyệt phát hiện lỗi trong vài giây vì biết chính xác cần nhìn vào đâu."
    },
    "quiz": [
      {
        "question": "Phiếu duyệt tối thiểu gồm những phần nào?",
        "options": [
          "Đầu vào gốc, bản AI soạn và danh sách điểm cần kiểm",
          "Bản AI soạn, tên người viết prompt và ngày giờ gửi",
          "Bản AI soạn cùng điểm tự tin do AI tự chấm cho mình",
          "Chỉ bản AI soạn, còn đầu vào gốc thì người duyệt tự tìm"
        ],
        "correct": 0,
        "explanation": "Phiếu phải cho người duyệt đối chiếu được: có đầu vào gốc, bản soạn và điểm cần kiểm. Tên và ngày giờ là nhật ký, không giúp quyết định. Điểm tự tin của AI không đáng tin. Bắt người duyệt tự đi tìm đầu vào làm họ bỏ qua bước đối chiếu."
      },
      {
        "question": "Vì sao nên tô sẵn số, tên và cam kết trong bản nháp?",
        "options": [
          "Những thứ đó sai thì hậu quả lớn và mắt người dễ trôi qua",
          "Để bản nháp trông giống hệt một tài liệu có định dạng đẹp và chuyên nghiệp hơn",
          "Vì người duyệt chỉ được phép đọc phần được tô màu thôi",
          "Để AI biết phải viết lại đúng những chỗ đó ở lần sau"
        ],
        "correct": 0,
        "explanation": "Con số, tên và cam kết là nơi AI bịa hoặc lệch nhiều nhất và sai gây thiệt hại nhất. Tô sẵn giúp người duyệt không phải tìm. Đó không phải để trang trí, không cấm đọc phần khác, và AI không học từ màu tô."
      },
      {
        "question": "Phiếu quá dài 3 trang có thể gây vấn đề gì cho người duyệt?",
        "options": [
          "Họ đọc lướt, bỏ qua chỗ quan trọng và bấm đồng ý cho xong",
          "Họ sẽ duyệt kỹ hơn vì có nhiều thông tin để đối chiếu",
          "Hệ thống từ chối lưu phiếu vì vượt giới hạn độ dài cho phép",
          "Họ sẽ nhờ AI tóm tắt phiếu rồi duyệt phần tóm tắt thay phiếu"
        ],
        "correct": 0,
        "explanation": "Phiếu dài kéo dài thời gian mỗi lần duyệt và dẫn tới đọc lướt. Phiếu nên vừa 30 giây. Nhiều thông tin không làm duyệt kỹ hơn, và duyệt bản tóm tắt của AI làm mất mục đích kiểm bản gốc. Giới hạn hệ thống không phải là vấn đề thường gặp ở đây."
      },
      {
        "question": "Nhờ AI dựng mẫu phiếu duyệt rồi bạn cắt bớt. Vì sao bước cắt bớt là của bạn?",
        "options": [
          "Chỉ bạn biết điểm nào ở quy trình của mình sai một lần là thiệt hại",
          "AI không có khả năng tạo bảng nên bạn phải tự làm phần còn lại",
          "Vì mẫu của AI luôn có quá ít trường so với nhu cầu thật",
          "Vì AI chỉ làm được bản đầu tiên, các bản sau phải làm tay"
        ],
        "correct": 0,
        "explanation": "AI đưa ra mẫu chung khá đầy đủ, còn việc chọn điều đáng giữ cần hiểu rủi ro thật của quy trình bạn: đó là việc của người làm nghề. AI tạo bảng được, và mẫu thường thừa trường hơn là thiếu. Lần sau AI vẫn sửa được nếu bạn nhờ."
      },
      {
        "question": "Mỗi phiếu có 12 điểm cần kiểm, người duyệt luôn đồng ý. Nên sửa phiếu thế nào?",
        "options": [
          "Chỉ giữ 3 điểm rủi ro cao nhất và tô nổi chúng",
          "Thêm điểm cần kiểm để người duyệt phải đọc kỹ hơn nữa",
          "Đổi nút \"đồng ý\" sang màu khác để người duyệt chú ý hơn",
          "Yêu cầu người duyệt gõ lý do cho mỗi điểm trong 12 điểm"
        ],
        "correct": 0,
        "explanation": "Quá nhiều điểm khiến người duyệt xem tất cả như nhau và không kiểm điểm nào. Giữ ít điểm rủi ro cao nhất là cách kéo sự chú ý về đúng chỗ. Thêm điểm làm tệ hơn, đổi màu nút không đổi hành vi, và bắt gõ 12 lý do làm phiếu quay lại thành gánh nặng."
      }
    ],
    "keyTakeaways": [
      "Phiếu duyệt có ba phần: đầu vào gốc, bản AI soạn, điểm cần kiểm.",
      "Người duyệt phải quyết định được trong khoảng 30 giây.",
      "Tô sẵn số, tên, cam kết; giữ khoảng ba điểm rủi ro cao nhất.",
      "AI dựng mẫu được, còn bạn cắt theo rủi ro thật của quy trình."
    ],
    "practicePrompt": {
      "question": "Phiếu duyệt thư báo giá: bản thư 2 trang, không có yêu cầu gốc. Người duyệt nói \"đọc thấy ổn\". Cải thiện đầu tiên nên là gì?",
      "options": [
        "Đặt yêu cầu gốc của khách cạnh bản thư và tô sẵn giá, số lượng, hạn",
        "Yêu cầu người duyệt đọc thư chậm hơn và kỹ hơn trước khi đồng ý gửi đi",
        "Cho AI viết thư ngắn đi một nửa để người duyệt đọc nhanh hơn",
        "Thêm chữ ký của hai người duyệt thay vì một như hiện nay"
      ],
      "correct": 0,
      "explanation": "Thiếu yêu cầu gốc thì \"thấy ổn\" chỉ là ổn về giọng văn. Đặt nó cạnh bản thư và tô các điểm rủi ro giúp đối chiếu thật. Đọc chậm hơn không có gì để so, rút ngắn thư không thay đổi việc thiếu đầu vào, và hai chữ ký cùng thiếu thông tin vẫn cho kết quả như cũ."
    },
    "summary": {
      "keyIdea": "Người duyệt chỉ duyệt tốt khi thấy đủ để đối chiếu, và ít đủ để kịp đọc.",
      "formula": "Phiếu = đầu vào gốc + bản AI soạn + 3 điểm cần kiểm đã tô sẵn.",
      "commonMistake": "Chỉ đưa bản nháp của AI cho người duyệt và kỳ vọng họ tự tìm lỗi.",
      "action": "Dựng một phiếu cho quy trình của bạn và thử xem người khác quyết định được trong 30 giây không."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Lấy một bản nháp AI soạn gần đây (email hoặc báo cáo) và yêu cầu gốc đi kèm. Làm phiếu duyệt trên một trang: bên trái yêu cầu gốc, bên phải bản nháp, phía dưới ba điểm cần kiểm đã đánh dấu (số, tên hoặc cam kết). Đưa cho một đồng nghiệp và bấm giờ xem họ quyết định trong bao lâu.",
      "secondary": "Ngày mai bạn sẽ được hỏi: ba điểm cần kiểm của phiếu là gì và đồng nghiệp mất bao lâu?"
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bạn đã biết cái gì phải qua người duyệt. Bài này nói về thứ người duyệt nhìn thấy khi ngồi trước bàn: nếu nó sai, cổng duyệt chỉ còn là một cái nút bấm."
      },
      {
        "type": "feynman",
        "title": "Phiếu duyệt đơn giản hơn bạn nghĩ",
        "intro": "Nghĩ tới phiếu kiểm hàng ở kho. Người kiểm không đọc từng món trong lô; phiếu cho họ thấy đơn đặt hàng, hàng thực nhận và ba chỗ hay sai nhất, để họ gật hoặc lắc đầu trong vài chục giây.",
        "columns": [
          "Thành phần",
          "Phiếu kiểm hàng",
          "Phiếu duyệt đầu ra AI"
        ],
        "rows": [
          [
            "Thứ gốc để so",
            "Đơn đặt hàng",
            "Yêu cầu gốc của khách hoặc dữ liệu nguồn"
          ],
          [
            "Thứ cần kiểm",
            "Hàng thực nhận",
            "Bản AI soạn"
          ],
          [
            "Chỗ hay sai",
            "Số lượng, mã hàng, hạn dùng",
            "Con số, tên, cam kết"
          ],
          [
            "Quyết định",
            "Nhận, trả lại hoặc nhận một phần",
            "Đồng ý, sửa hoặc từ chối"
          ]
        ],
        "oneLiner": "Phiếu duyệt cho người xem đúng thứ để so và đúng chỗ dễ sai, không hơn."
      },
      {
        "type": "heading",
        "text": "Điều gì làm duyệt thành đóng dấu"
      },
      {
        "type": "paragraph",
        "text": "Khi phiếu chỉ có bản nháp, người duyệt chỉ chấm được văn phong: thư có lịch sự không, có mạch lạc không. Còn chuyện AI thêm một con số hay một lời hứa không có trong yêu cầu gốc thì họ không thấy được. Vậy phiếu tốt trả lời trước ba câu họ sẽ hỏi: khách nhờ gì, AI trả lời gì, và tôi nên nhìn kỹ chỗ nào."
      },
      {
        "type": "flow",
        "title": "Một phiếu duyệt đọc trong 30 giây",
        "steps": [
          {
            "label": "Đọc yêu cầu gốc",
            "detail": "Khoảng 5 giây: khách hỏi gì, dữ liệu nào liên quan. Phần này nằm ngay đầu phiếu, không cần mở thêm đâu khác."
          },
          {
            "label": "Nhìn bản AI soạn",
            "detail": "Khoảng 10 giây: đọc bản nháp có những chỗ đã được tô sẵn, nên mắt dừng đúng số, tên và cam kết."
          },
          {
            "label": "Đối chiếu ba điểm",
            "detail": "Khoảng 10 giây: so từng điểm đã tô với yêu cầu gốc. Có điểm nào AI thêm mà yêu cầu không có thì ghi chú."
          },
          {
            "label": "Quyết định",
            "detail": "Khoảng 5 giây: đồng ý, sửa tại chỗ hoặc từ chối kèm lý do ngắn. Mọi lựa chọn đều một cú bấm."
          }
        ]
      },
      {
        "type": "list",
        "items": [
          "Đầu vào gốc: nguyên văn yêu cầu hoặc dữ liệu, không phải bản AI tóm lại.",
          "Bản AI soạn: đặt ngay cạnh đầu vào gốc, không ở trang khác.",
          "Điểm cần kiểm: số, tên, cam kết, tô sẵn, tối đa khoảng ba điểm.",
          "Ba nút rõ ràng: đồng ý, sửa, từ chối kèm một dòng lý do."
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Phiếu thiếu",
          "text": "Chỉ có bản nháp. Người duyệt không thấy yêu cầu gốc, không biết phải nhìn vào đâu, nên đọc giọng văn rồi bấm đồng ý."
        },
        "right": {
          "label": "Phiếu tốt",
          "text": "Có yêu cầu gốc, bản soạn và ba điểm được tô. Người duyệt biết mình đang kiểm gì và quyết định được trong nửa phút."
        }
      },
      {
        "type": "callout",
        "label": "Cắt bớt là việc của bạn",
        "text": "AI dựng được một mẫu phiếu đầy đủ chỉ trong vài giây, thường dư nhiều trường. Hãy cắt bớt tới khi chỉ còn thứ người duyệt cần để quyết định. Phiếu nào cũng thêm được một trường nữa, nhưng mỗi trường thêm làm người duyệt xem kỹ những trường còn lại ít đi."
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI dựng mẫu phiếu duyệt thư xác nhận đơn hàng",
        "task": "Bạn muốn AI dựng mẫu phiếu duyệt cho thư xác nhận đơn hàng của khách. Hãy lắp một prompt rõ ràng.",
        "parts": [
          {
            "id": "context",
            "label": "Bối cảnh",
            "options": [
              {
                "text": "Tôi làm một công việc văn phòng, cần một mẫu phiếu.",
                "feedback": "Thiếu ai duyệt và duyệt bao nhiêu thư, AI sẽ dựng một phiếu chung chung dài dòng."
              },
              {
                "text": "Tôi làm vận hành bán hàng; thư xác nhận đơn do AI soạn, người duyệt là trưởng ca, xem khoảng 40 thư mỗi ngày.",
                "good": true,
                "feedback": "Có người soạn, người duyệt và khối lượng: AI biết phiếu phải nhanh."
              }
            ]
          },
          {
            "id": "task",
            "label": "Việc cần làm",
            "options": [
              {
                "text": "Dựng mẫu phiếu thật đầy đủ mọi trường có thể cần.",
                "feedback": "\"Đầy đủ mọi trường\" là lệnh ngược: phiếu dài và người duyệt đọc lướt."
              },
              {
                "text": "Dựng mẫu phiếu có ba phần: yêu cầu gốc của khách, bản thư AI soạn, tối đa ba điểm cần kiểm.",
                "good": true,
                "feedback": "Nói rõ cấu trúc và giới hạn điểm cần kiểm nên bản ra gọn."
              }
            ]
          },
          {
            "id": "format",
            "label": "Khuôn dạng",
            "options": [
              {
                "text": "Trình bày đẹp và chuyên nghiệp nhất có thể.",
                "feedback": "\"Đẹp và chuyên nghiệp\" không đo được; AI thêm màu mè thay vì thông tin."
              },
              {
                "text": "Trình bày dạng bảng hai cột, có chỗ tô nổi cho số tiền, ngày giao và địa chỉ; đọc được trong 30 giây.",
                "good": true,
                "feedback": "Có khuôn dạng, chỗ tô nổi và thời gian đọc để AI nhắm tới."
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
            "text": "MẪU PHIẾU DUYỆT - Thư xác nhận đơn\n| Yêu cầu gốc của khách | Bản thư AI soạn |\n| (dán nguyên văn) | (dán bản nháp) |\n\nĐiểm cần kiểm (tô nổi):\n1. Số tiền: khớp đơn hàng?\n2. Ngày giao: khớp lịch?\n3. Địa chỉ: khớp thông tin khách?\n\n[Đồng ý] [Sửa] [Từ chối + lý do]"
          },
          {
            "requires": [
              "context"
            ],
            "text": "MẪU PHIẾU DUYỆT\n- Mã đơn, tên khách, ngày tạo, người soạn, kênh gửi\n- Bản thư AI soạn\n- Ghi chú chung\n\n(Có bối cảnh nhưng thiếu yêu cầu gốc và điểm cần kiểm: mẫu đầy thông tin hành chính, người duyệt vẫn không biết xem chỗ nào.)"
          },
          {
            "text": "MẪU PHIẾU DUYỆT\nMã phiếu, ngày, người gửi, bộ phận, mức ưu tiên, loại nội dung, 14 trường kiểm tra...\n\n(Prompt mơ hồ nên AI tự bịa ra một mẫu hành chính dài dòng; người duyệt sẽ mất 3 phút và bỏ qua hết.)"
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Phiếu bị đẩy về vì không đủ thông tin",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn dựng xong mẫu phiếu và cho người duyệt thử với 10 thư. Sau buổi thử, chị Mai, người duyệt, nói: \"Phiếu có 9 ô kiểm, chị làm xong mỗi phiếu hết 2 phút.\" Bạn định chỉnh.",
            "choices": [
              {
                "label": "Giữ cả 9 ô và nhắc chị Mai làm nhanh hơn",
                "next": "bad_keep"
              },
              {
                "label": "Hỏi chị Mai ô nào từng giúp phát hiện lỗi, chỉ giữ tối đa ba ô đó",
                "next": "s2"
              }
            ]
          },
          "bad_keep": {
            "text": "Sau một tuần chị Mai bắt đầu tích hết 9 ô mà không đọc. Phiếu nhìn đầy đủ, nhưng một thư ghi sai ngày giao vẫn được đồng ý.",
            "ending": "bad"
          },
          "s2": {
            "text": "Chị Mai cho biết chỉ ba ô (số tiền, ngày giao, địa chỉ) từng bắt được lỗi. Bạn cắt còn ba ô và đặt yêu cầu gốc cạnh bản thư. Thời gian duyệt xuống còn khoảng nửa phút.",
            "choices": [
              {
                "label": "Thêm lại vài ô cho chắc vì \"có thể sau này cần\"",
                "next": "bad_add"
              },
              {
                "label": "Giữ phiếu gọn và xem lại sau hai tuần theo các lỗi thực tế bị bỏ sót",
                "next": "good"
              }
            ]
          },
          "bad_add": {
            "text": "Phiếu lại dài ra, thời gian duyệt tăng trở lại và người duyệt bắt đầu bỏ ô. Thêm vì \"có thể cần\" là cách phiếu phình lên.",
            "ending": "bad"
          },
          "good": {
            "text": "Hai tuần sau bạn xem nhật ký: hai lỗi lọt qua đều nằm ngoài ba ô. Bạn thay một ô theo dữ liệu thật. Phiếu vẫn gọn, còn người duyệt vẫn đọc thật.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Phiếu tốt = đầu vào gốc + bản AI soạn + ba điểm cần kiểm.",
          "Bài sau: khi người duyệt mệt và bấm đồng ý mà không đọc, nhận ra và chữa thế nào."
        ]
      }
    ]
  },
  {
    "id": 2507,
    "slug": "nguoi-duyet-met-va-bam-dong-y-mai",
    "title": "Chặng 55, Bài 8: Người duyệt bấm 'đồng ý' mà không đọc: dấu hiệu và cách chữa",
    "subtitle": "Như bảo vệ quẹt thẻ liền tay suốt ca: lâu dần, tay quẹt mà mắt không nhìn.",
    "duration": "8 phút",
    "difficulty": "Dễ",
    "emoji": "😴",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Một cổng duyệt mà người duyệt đồng ý trong hai giây mỗi phiếu thì chỉ là chữ ký rỗng: quy trình trông an toàn nhưng lỗi vẫn lọt qua. Bạn cần nhận ra dấu hiệu sớm bằng nhật ký và chữa bằng cách thiết kế lại, chứ không bằng cách nhắc người duyệt cố gắng hơn.",
    "openingQuestion": "Nhật ký duyệt cho thấy một người duyệt xong 60 phiếu trong 3 phút, tỷ lệ đồng ý 100%. Kết luận hợp lý nhất là gì?",
    "openingOptions": [
      "Có thể họ không đọc thật; cần xem lại khối lượng và thiết kế phiếu",
      "Họ là người duyệt giỏi nhất, nên giao thêm nhiều phiếu hơn nữa cho họ",
      "AI soạn quá tốt nên không cần duyệt, có thể bỏ hẳn cổng",
      "Người này làm việc rất hiệu quả và nên được khen thưởng ngay"
    ],
    "correctOption": 0,
    "explanation": "Ba giây cho mỗi phiếu không đủ để đối chiếu đầu vào với bản nháp, và 100% đồng ý ở khối lượng đó là dấu hiệu của thói quen bấm cho xong. Đó chưa phải lỗi của người, vì thường do phiếu quá dài, quá nhiều phiếu hoặc người duyệt quá mệt. Giao thêm phiếu làm tệ hơn, bỏ cổng vì \"AI tốt\" chỉ dựa trên dữ liệu không ai kiểm, còn khen thưởng tốc độ khuyến khích đúng hành vi sai.",
    "diagram": [
      {
        "label": "Quá nhiều phiếu, phiếu quá dài",
        "arrow": true
      },
      {
        "label": "Người duyệt mệt, đọc lướt",
        "arrow": true
      },
      {
        "label": "Đồng ý trong vài giây, gần 100%",
        "arrow": true
      },
      {
        "label": "Cổng thành hình thức, lỗi lọt qua"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: nhóm xử lý hồ sơ nhà cung cấp",
      "description": "Một người duyệt được giao hàng chục phiếu mỗi chiều. Nhật ký cho thấy thời gian mỗi phiếu giảm dần trong ngày, và các phiếu cuối ngày gần như luôn được đồng ý. Nhóm không khiển trách ai, họ chia phiếu cho hai người, cắt phiếu còn ba điểm cần kiểm và thỉnh thoảng đưa vào một phiếu có lỗi cố ý để biết người duyệt còn đọc thật hay không."
    },
    "quiz": [
      {
        "question": "Dấu hiệu nào cho thấy người duyệt có thể đang bấm đồng ý cho xong?",
        "options": [
          "Thời gian mỗi phiếu rất ngắn và tỷ lệ đồng ý gần như 100%",
          "Họ từ chối vài phiếu mỗi ngày kèm lý do ngắn gọn và cụ thể cho từng phiếu",
          "Họ thỉnh thoảng hỏi lại người soạn về một con số lạ",
          "Họ sửa tay các chỗ sai trên một số phiếu trước khi duyệt"
        ],
        "correct": 0,
        "explanation": "Đọc thật thì có lúc từ chối, sửa hoặc hỏi lại, và thời gian mỗi phiếu khác nhau theo độ phức tạp. Hai giây đều đặn và không từ chối lần nào mới là dấu hiệu đáng ngờ."
      },
      {
        "question": "Biểu đồ thời gian duyệt mỗi phiếu giảm mạnh dần trong ngày. Điều đó gợi ý gì?",
        "options": [
          "Người duyệt mệt dần và đọc lướt nhiều hơn về cuối ngày",
          "Người duyệt càng duyệt nhiều càng kiểm kỹ hơn, nên đọc nhanh hơn",
          "Phiếu cuối ngày luôn dễ hơn phiếu đầu ngày nên duyệt nhanh hơn",
          "Hệ thống duyệt ngày càng chạy nhanh nhờ người duyệt quen hơn"
        ],
        "correct": 0,
        "explanation": "Khi khối lượng tăng mà thời gian mỗi phiếu giảm đều thì thường là mệt và đọc lướt, không phải tiến bộ. Độ khó phiếu không tự giảm về cuối ngày, và \"quen tay\" chỉ giải thích được sự giảm nhẹ, không phải tụt xuống vài giây."
      },
      {
        "question": "Cách chữa nào đúng hướng khi người duyệt bấm đồng ý quá nhanh?",
        "options": [
          "Giảm số phiếu mỗi người và rút phiếu còn điểm cần kiểm chính",
          "Nhắc người duyệt trong họp rằng phải đọc kỹ từng phiếu một",
          "Thay người duyệt mới mỗi tuần để người mới luôn tỉnh táo",
          "Thêm một nút xác nhận \"tôi đã đọc\" phải bấm sau khi đồng ý"
        ],
        "correct": 0,
        "explanation": "Gốc rễ là thiết kế: quá nhiều phiếu và phiếu quá dài. Giảm tải và rút gọn phiếu sửa được nguyên nhân. Nhắc nhở miệng hiệu quả ngắn hạn, đổi người mỗi tuần mất kinh nghiệm, còn nút \"đã đọc\" chỉ là thêm một cú bấm vô nghĩa."
      },
      {
        "question": "Cố ý đưa vào vài phiếu có lỗi đã biết để làm gì?",
        "options": [
          "Để đo người duyệt còn đọc thật hay không, không phải để bắt lỗi họ",
          "Để phạt người duyệt nào bỏ sót lỗi, làm gương cho cả nhóm thấy hậu quả",
          "Để AI học cách viết ra lỗi, từ đó soạn nháp chính xác hơn về sau này",
          "Để tăng số phiếu bị từ chối cho báo cáo cuối tháng nhìn đẹp hơn với sếp"
        ],
        "correct": 0,
        "explanation": "Phiếu thử có lỗi đã biết là phép đo: nếu lỗi đó lọt qua, thiết kế đang hỏng. Mục tiêu là sửa quy trình. Phạt người làm họ giấu, AI không học từ việc này, và số phiếu bị từ chối không phải mục tiêu."
      },
      {
        "question": "Tỷ lệ đồng ý 100% trong một tháng có chắc là AI soạn tốt không?",
        "options": [
          "Không chắc; phải xem người duyệt có đọc thật không",
          "Chắc chắn, vì người duyệt đọc kỹ mới đồng ý",
          "Chắc chắn, vì AI đã được huấn luyện trên lượng dữ liệu lớn",
          "Chắc, nếu tháng trước cũng không có phiếu nào bị từ chối"
        ],
        "correct": 0,
        "explanation": "Hai cách giải thích cùng cho ra 100%: AI tốt hoặc người duyệt không đọc. Chỉ thời gian duyệt, phiếu thử lỗi và kiểm mẫu ngẫu nhiên mới phân biệt được. Dữ liệu huấn luyện lớn không bảo đảm đúng ở việc cụ thể của bạn, và một tháng trước cũng không cho thêm bằng chứng."
      }
    ],
    "keyTakeaways": [
      "Đồng ý cực nhanh và gần 100% là dấu hiệu của đóng dấu, chưa chắc AI tốt.",
      "Thời gian duyệt giảm dần trong ngày là tín hiệu mệt.",
      "Chữa bằng thiết kế: bớt phiếu, rút gọn phiếu, không phải nhắc nhở.",
      "Đưa phiếu thử có lỗi đã biết để đo xem người duyệt còn đọc."
    ],
    "practicePrompt": {
      "question": "Nhật ký cho thấy chị Hoa duyệt 50 phiếu mỗi chiều, đều khoảng 2 giây. Bạn nên làm gì đầu tiên?",
      "options": [
        "Chia phiếu cho thêm một người và rút phiếu còn ba điểm cần kiểm",
        "Nhắc chị Hoa đọc kỹ hơn và ghi nhận xét cuối tháng cho chị để chị rút kinh nghiệm",
        "Bỏ bước duyệt vì chị Hoa đồng ý hầu như mọi phiếu đều ổn",
        "Tăng lên 100 phiếu để kiểm tra chị Hoa chịu được bao nhiêu"
      ],
      "correct": 0,
      "explanation": "Khối lượng 50 phiếu và thời gian 2 giây cho thấy vấn đề ở thiết kế. Chia tải và rút gọn phiếu sửa được nguyên nhân. Nhắc nhở chỉ có tác dụng ngắn, bỏ duyệt mất chốt chặn, và tăng phiếu chỉ làm duyệt hình thức hơn."
    },
    "summary": {
      "keyIdea": "Người duyệt bấm đồng ý cho xong thường là lỗi thiết kế, không phải lỗi tính cách.",
      "formula": "Quá nhiều phiếu + phiếu quá dài = đọc lướt. Bớt phiếu + rút phiếu + phiếu thử lỗi = duyệt thật.",
      "commonMistake": "Nhắc người duyệt cố gắng hơn thay vì sửa khối lượng và phiếu.",
      "action": "Xem nhật ký duyệt của bạn: thời gian trung bình mỗi phiếu và tỷ lệ đồng ý."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Mở nhật ký hoặc bảng theo dõi của một việc bạn hay duyệt (hoặc hay nhờ người duyệt): thư, báo cáo, hóa đơn. Ghi lại thời gian bạn hoặc người đó dành cho mỗi phiếu ở ba lần đầu ngày và ba lần cuối ngày, cùng số phiếu bị từ chối trong tuần. Nếu chưa có nhật ký, tự bấm giờ 10 phiếu.",
      "secondary": "Ngày mai bạn sẽ được hỏi: thời gian mỗi phiếu đầu ngày và cuối ngày khác nhau bao nhiêu?"
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bạn đã có cổng duyệt và phiếu gọn. Nhưng một cổng còn gác thật hay không chỉ biết được khi nhìn dấu vết: thời gian mỗi phiếu, tỷ lệ đồng ý, thời điểm trong ngày. Bài này dạy đọc các dấu vết đó."
      },
      {
        "type": "feynman",
        "title": "Duyệt máy móc đơn giản hơn bạn nghĩ",
        "intro": "Hình dung một bảo vệ quẹt thẻ cho nhân viên ra vào suốt ca tám tiếng. Đầu ca, anh nhìn mặt từng người. Cuối ca, tay cứ quẹt còn mắt nhìn chỗ khác, và ai đưa thẻ nào anh cũng cho qua.",
        "columns": [
          "Thành phần",
          "Bảo vệ cuối ca",
          "Người duyệt phiếu AI"
        ],
        "rows": [
          [
            "Nguyên nhân",
            "Ca dài, hàng trăm lượt ra vào",
            "Quá nhiều phiếu, phiếu dài"
          ],
          [
            "Dấu hiệu",
            "Quẹt rất nhanh, không ngẩng đầu",
            "Mỗi phiếu vài giây, đồng ý gần 100%"
          ],
          [
            "Hậu quả",
            "Người lạ cầm thẻ nhặt được cũng vào",
            "Lỗi trong bản AI soạn đi ra ngoài"
          ],
          [
            "Cách chữa",
            "Chia ca ngắn, đổi nhịp, kiểm thử bất ngờ",
            "Chia phiếu, rút phiếu, phiếu thử lỗi"
          ]
        ],
        "oneLiner": "Đồng ý nhanh là triệu chứng của thiết kế quá tải, nên chữa thiết kế."
      },
      {
        "type": "heading",
        "text": "Đọc nhật ký như đọc điện tâm đồ"
      },
      {
        "type": "paragraph",
        "text": "Một nhật ký duyệt tốt ghi ít nhất thời điểm và thời gian mỗi phiếu. Khi bạn vẽ thời gian đó theo thứ tự phiếu trong ngày, hình dạng cho biết nhiều thứ: nếu đường đi xuống dốc, người duyệt đang mệt dần; nếu phẳng ở mức vài giây, họ chưa từng đọc."
      },
      {
        "type": "chart",
        "title": "Thời gian duyệt mỗi phiếu giảm dần trong ngày",
        "caption": "Số liệu minh hoạ, không phải đo thật. Kéo thanh trượt để xem: thời gian ban đầu và mỗi phiếu giảm bao nhiêu giây. Khi xuống dưới vài giây, người duyệt không thể đối chiếu được nữa.",
        "kind": "line",
        "xLabel": "Phiếu thứ mấy trong ngày",
        "yLabel": "Giây mỗi phiếu",
        "x": {
          "from": 1,
          "to": 40,
          "step": 1
        },
        "params": [
          {
            "id": "base",
            "label": "Thời gian phiếu đầu tiên",
            "min": 20,
            "max": 120,
            "step": 5,
            "value": 90,
            "unit": "giây"
          },
          {
            "id": "drop",
            "label": "Giảm mỗi phiếu tiếp theo",
            "min": 0,
            "max": 3,
            "step": 0.25,
            "value": 2,
            "unit": "giây"
          }
        ],
        "series": [
          {
            "label": "Giây dành cho mỗi phiếu",
            "expr": "max(base - drop * x, 2)"
          }
        ]
      },
      {
        "type": "flow",
        "title": "Từ nhật ký tới cách chữa",
        "steps": [
          {
            "label": "Thu nhật ký",
            "detail": "Ghi ai duyệt, lúc nào và mất bao nhiêu giây cho mỗi phiếu. Chỉ cần hai cột thời gian là đã thấy được xu hướng."
          },
          {
            "label": "Nhìn hình dạng",
            "detail": "Đường thời gian dốc xuống, hay phẳng ở vài giây, hay có nhiều phiếu đồng ý liên tiếp sau phiếu bị từ chối cuối cùng hàng giờ."
          },
          {
            "label": "Tìm nguyên nhân",
            "detail": "Hỏi người duyệt: bao nhiêu phiếu mỗi ngày, phiếu có dài không, có thấy yêu cầu gốc không. Ít khi là do lười."
          },
          {
            "label": "Thiết kế lại",
            "detail": "Chia phiếu cho nhiều người, rút còn ba điểm cần kiểm, đặt yêu cầu gốc cạnh bản soạn, thêm phiếu thử lỗi định kỳ."
          }
        ]
      },
      {
        "type": "list",
        "items": [
          "Thời gian mỗi phiếu đều chỉ vài giây.",
          "Tỷ lệ đồng ý gần 100% kéo dài nhiều tuần.",
          "Phiếu cuối ngày nhanh hơn phiếu đầu ngày rõ rệt.",
          "Không ai hỏi lại hay sửa gì trong nhiều ngày liền."
        ]
      },
      {
        "type": "callout",
        "label": "Đừng khiển trách người duyệt",
        "text": "Khi dấu hiệu xuất hiện, câu hỏi đầu tiên là \"phiếu và khối lượng đã đặt họ vào tình thế nào\", chứ không phải \"sao không đọc kỹ\". Nếu khiển trách, họ sẽ ghi thời gian giả, và bạn mất luôn tín hiệu duy nhất."
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Đọc nhật ký duyệt giả định của một buổi chiều",
        "task": "Dưới đây là các dòng nhật ký (số liệu giả định) của người duyệt. Phiếu nào ghi là đồng ý thì coi như đã đọc. Hãy đánh dấu những dòng cho thấy người duyệt có khả năng không đọc thật.",
        "segments": [
          {
            "text": "13:05 - Phiếu 1, thư xác nhận đơn 2 trang - mất 75 giây - Sửa ngày giao - Đồng ý."
          },
          {
            "text": "13:07 - Phiếu 2, thư báo giá có mức giảm - mất 62 giây - Từ chối: mức giảm vượt quyền."
          },
          {
            "text": "16:41 - Phiếu 38, thư báo giá có mức giảm 20% - mất 2 giây - Đồng ý.",
            "error": "Một thư có mức giảm cần so với chính sách, không thể xong trong 2 giây; đầu giờ chiều cùng loại phiếu mất hơn một phút."
          },
          {
            "text": "16:41 - Phiếu 39, thư xác nhận đơn 2 trang - mất 2 giây - Đồng ý.",
            "error": "Cùng mức 2 giây, không sửa gì, giống dòng trước: dấu hiệu bấm liền tay khi khối lượng dồn về cuối ngày."
          },
          {
            "text": "16:42 - Phiếu 40, thư hoàn tiền - mất 2 giây - Đồng ý.",
            "error": "Phiếu có tiền là loại phải đọc kỹ nhất, nhưng bị đồng ý nhanh như phiếu khác."
          },
          {
            "text": "Tổng kết ngày: 40 phiếu, 38 đồng ý, 1 sửa, 1 từ chối."
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Chị Hoa duyệt 2 giây mỗi phiếu",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Nhật ký tuần cho thấy chị Hoa duyệt trung bình 2 giây mỗi phiếu ở 45 phiếu mỗi chiều. Hôm qua có một thư ghi sai số tiền lọt ra ngoài. Trưởng nhóm hỏi bạn nên làm gì.",
            "choices": [
              {
                "label": "Gửi cảnh cáo chị Hoa vì không đọc kỹ phiếu",
                "next": "bad_blame"
              },
              {
                "label": "Hỏi chị Hoa về khối lượng và cách phiếu đang hiển thị",
                "next": "s2"
              }
            ]
          },
          "bad_blame": {
            "text": "Chị Hoa im lặng, tuần sau chị bấm giờ mỗi phiếu đúng 30 giây nhưng trong thực tế vẫn không đọc, vì 45 phiếu mỗi chiều vẫn y nguyên. Bạn mất luôn tín hiệu nhật ký.",
            "ending": "bad"
          },
          "s2": {
            "text": "Chị Hoa nói: 45 phiếu mỗi chiều, phiếu dài 2 trang và yêu cầu gốc nằm ở một file khác. Chị không có thời gian mở.",
            "choices": [
              {
                "label": "Chia phiếu cho hai người, đặt yêu cầu gốc cạnh bản soạn, rút còn ba điểm cần kiểm",
                "next": "good"
              },
              {
                "label": "Giao thêm phiếu cho chị vì chị duyệt nhanh nên có thời gian dư",
                "next": "bad_more"
              }
            ]
          },
          "bad_more": {
            "text": "Khối lượng tăng lên 70 phiếu. Thời gian mỗi phiếu giảm còn 1 giây. Hai thư sai nữa lọt ra ngoài trong tuần đó.",
            "ending": "bad"
          },
          "good": {
            "text": "Thời gian mỗi phiếu tăng lên khoảng 25 giây, tỷ lệ từ chối lên vài phần trăm và lỗi lọt ra ngoài biến mất trong hai tuần. Nhật ký bây giờ phản ánh đúng việc đọc thật.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Đồng ý cực nhanh là triệu chứng; thiết kế quá tải là nguyên nhân.",
          "Bài sau: ghi nhật ký để ba tháng sau vẫn tra lại được ai duyệt gì, dựa trên bản nào."
        ]
      }
    ]
  },
  {
    "id": 2508,
    "slug": "ghi-nhat-ky-de-sau-nay-tra-lai-duoc",
    "title": "Chặng 55, Bài 9: Ghi nhật ký: ai duyệt gì, lúc nào, dựa trên bản nào",
    "subtitle": "Như sổ giao ca: không ai đọc hằng ngày, nhưng khi có chuyện thì nó là thứ duy nhất cho bạn biết đã xảy ra gì.",
    "duration": "8 phút",
    "difficulty": "Dễ",
    "emoji": "📒",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Ba tháng sau, khách hỏi vì sao họ nhận được một lời hứa, hoặc sếp hỏi ai đã đồng ý bản này. Nếu quy trình không ghi lại ai duyệt gì, lúc nào và dựa trên bản nào, bạn chỉ còn trí nhớ. Nhật ký bốn cột tối thiểu biến câu hỏi đó thành một phút tra cứu.",
    "openingQuestion": "Ba tháng sau khách khiếu nại về một email có mức giảm giá. Bạn chỉ có thể tra một cột trong nhật ký. Cột nào giúp nhất?",
    "openingOptions": [
      "Bản AI soạn cụ thể mà người duyệt đã nhìn thấy và đồng ý",
      "Số thứ tự của phiếu trong ngày hôm đó của người duyệt phiếu ấy",
      "Tên công cụ AI mà quy trình dùng để soạn nháp hôm đó",
      "Độ dài của bản nháp tính theo số chữ khi được duyệt"
    ],
    "correctOption": 0,
    "explanation": "Điều cần tra là: lúc đồng ý, người duyệt đã thấy nội dung nào. Nếu nhật ký chỉ ghi \"đã duyệt\" mà không ghi bản nào, bạn không chứng minh được bản gửi ra ngoài có phải bản được đồng ý không. Số thứ tự trong ngày và độ dài chữ không trả lời câu hỏi đó, còn tên công cụ chỉ hữu ích khi so chất lượng. Bốn cột tối thiểu là: ai duyệt, lúc nào, bản nào và quyết định gì.",
    "diagram": [
      {
        "label": "Cột 1: Ai duyệt",
        "arrow": true
      },
      {
        "label": "Cột 2: Lúc nào",
        "arrow": true
      },
      {
        "label": "Cột 3: Bản nào (mã hoặc lưu nguyên văn)",
        "arrow": true
      },
      {
        "label": "Cột 4: Quyết định và lý do"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: bộ phận bán hàng 10 người",
      "description": "Khách khiếu nại về một email ghi mức giảm 15% sau ba tháng. Nhóm mở nhật ký, tìm đúng dòng: người duyệt, giờ duyệt, mã bản nháp và quyết định sửa 15% xuống 10% nhưng người gửi đã gửi bản chưa sửa. Nhờ có mã bản, họ biết lỗi ở bước gửi, không phải ở người duyệt hay AI."
    },
    "quiz": [
      {
        "question": "Bốn cột tối thiểu của nhật ký quy trình là gì?",
        "options": [
          "Ai duyệt, lúc nào, bản nào và quyết định gì",
          "Tên khách, giá trị đơn, ngày giao và người bán hàng",
          "Công cụ AI, phiên bản, độ dài bản nháp và thời gian chạy",
          "Số phiếu, màu nhãn, bộ phận nhận và mức ưu tiên xử lý"
        ],
        "correct": 0,
        "explanation": "Nhật ký phải trả lời được: ai, khi nào, dựa trên cái gì, kết quả ra sao. Dữ liệu khách hàng là thông tin nghiệp vụ, không phải vết duyệt. Công cụ, độ dài, số phiếu hay màu nhãn đều không đủ để dựng lại một lần duyệt."
      },
      {
        "question": "Vì sao phải ghi 'bản nào' chứ không chỉ 'đã duyệt'?",
        "options": [
          "Để biết bản gửi đi có đúng bản người duyệt đã đồng ý không",
          "Để AI biết lần sau phải viết bản nào ngắn hơn bản này",
          "Vì nhật ký chỉ có hiệu lực pháp lý khi có tên bản nháp",
          "Để tăng dung lượng lưu trữ của hệ thống ghi nhật ký"
        ],
        "correct": 0,
        "explanation": "\"Đã duyệt\" mà không ghi bản nào thì không chứng minh được bản ra ngoài là bản được duyệt, nhất là khi có sửa. AI không đọc nhật ký để học, dung lượng không phải mục tiêu, và hiệu lực pháp lý là chuyện bạn hỏi pháp chế chứ không do tên cột quyết định."
      },
      {
        "question": "Người duyệt sửa bản nháp trước khi đồng ý. Nhật ký nên lưu gì?",
        "options": [
          "Cả bản AI soạn lẫn bản sau khi sửa, kèm mã để đối chiếu",
          "Chỉ bản AI soạn, vì bản sửa là chuyện riêng của người duyệt",
          "Chỉ bản sau khi sửa, vì bản AI soạn đã bị thay thế rồi",
          "Chỉ dòng \"đã sửa\" để nhật ký gọn, không cần nội dung cụ thể"
        ],
        "correct": 0,
        "explanation": "Lưu cả hai cho thấy AI sai ở đâu và người sửa thế nào, đồng thời chứng minh bản nào đi ra. Chỉ một bản thì mất nửa câu chuyện, và \"đã sửa\" mà không có nội dung không tra lại được."
      },
      {
        "question": "Nhật ký có đáng ghi nếu chưa có sự cố nào xảy ra?",
        "options": [
          "Có, vì lúc có sự cố thì quá muộn để bắt đầu ghi",
          "Không, vì nhật ký chỉ cần bật lên khi đã có sự cố xảy ra",
          "Không, nếu tỷ lệ đồng ý của người duyệt đang là 100%",
          "Có, nhưng chỉ cần ghi vào cuối tháng dựa trên trí nhớ"
        ],
        "correct": 0,
        "explanation": "Nhật ký chỉ dùng được cho những gì đã được ghi. Ghi sau sự cố hoặc dựa trên trí nhớ cuối tháng không còn là bằng chứng. Tỷ lệ đồng ý không liên quan tới việc có cần ghi."
      },
      {
        "question": "Bảng nhật ký của bạn có hai mươi cột. Vấn đề chính là gì?",
        "options": [
          "Người ghi sẽ bỏ trống, làm cột cần thiết cũng mất dữ liệu",
          "Bảng có quá nhiều cột nên Excel không mở được file nữa",
          "Người đọc nhật ký sau này sẽ tin nhiều hơn vào các ghi chép",
          "AI sẽ tự điền tất cả hai mươi cột nên không còn việc ghi tay"
        ],
        "correct": 0,
        "explanation": "Khi bắt ghi quá nhiều, người ghi nản và điền qua loa hoặc bỏ trống, kể cả những cột thật sự cần. Bốn cột tối thiểu đầy đủ giá trị hơn hai mươi cột thưa. Excel mở được hai mươi cột, và nhiều cột không làm tăng độ tin cậy. AI có thể điền cột nhưng không đảm bảo điền đúng."
      }
    ],
    "keyTakeaways": [
      "Bốn cột tối thiểu: ai duyệt, lúc nào, bản nào, quyết định gì.",
      "Ghi mã hoặc nguyên văn của bản được duyệt, không chỉ chữ \"đã duyệt\".",
      "Nếu có sửa, lưu cả bản AI soạn và bản sau khi sửa.",
      "Ít cột nhưng ghi đủ thì tốt hơn nhiều cột bỏ trống."
    ],
    "practicePrompt": {
      "question": "Nhật ký hiện chỉ có: ngày, tên người duyệt, chữ \"OK\". Sếp hỏi bản nào đã được đồng ý cho khách A. Bạn thêm cột nào trước tiên?",
      "options": [
        "Cột mã bản nháp, để gắn dòng duyệt với đúng nội dung được xem",
        "Cột cảm nhận của người duyệt về chất lượng bản nháp AI soạn ra từng lần",
        "Cột tên công cụ AI và phiên bản được dùng để soạn bản đó",
        "Cột số chữ của bản nháp để theo dõi độ dài trung bình"
      ],
      "correct": 0,
      "explanation": "Mã bản nháp nối dòng duyệt với nội dung cụ thể, trả lời được câu sếp hỏi. Cảm nhận chất lượng, tên công cụ và số chữ có thể hữu ích cho việc khác nhưng không cho biết bản nào được đồng ý."
    },
    "summary": {
      "keyIdea": "Nhật ký tốt là thứ cho bạn dựng lại một lần duyệt sau ba tháng chỉ trong một phút.",
      "formula": "Nhật ký = ai duyệt + lúc nào + bản nào + quyết định gì (và lý do nếu từ chối).",
      "commonMistake": "Ghi \"đã duyệt\" mà không ghi bản nào, hoặc ghi hai mươi cột rồi bỏ trống một nửa.",
      "action": "Dựng bảng bốn cột cho một quy trình và điền thử ba dòng thật."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Tạo một bảng tính bốn cột: Người duyệt, Thời điểm, Mã bản (hoặc dán nguyên văn), Quyết định. Điền ba dòng từ những thứ bạn duyệt hoặc gửi trong tuần này. Sau đó thử một bài kiểm: chọn một dòng và tự hỏi \"nếu sếp hỏi về dòng này ba tháng nữa, bảng đã đủ để trả lời chưa?\".",
      "secondary": "Ngày mai bạn sẽ được hỏi: bảng của bạn có những cột nào, và có trả lời được câu hỏi ba tháng sau không?"
    },
    "sections": [
      {
        "type": "lead",
        "text": "Một quy trình có người duyệt nhưng không có nhật ký giống như họp xong mà không có biên bản: ai cũng nhớ khác nhau. Bài này chọn bốn cột tối thiểu để bạn có thể tra lại sau này."
      },
      {
        "type": "feynman",
        "title": "Nhật ký đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới sổ giao ca ở nhà máy hoặc cửa hàng. Mỗi ca ghi ai trực, lúc nào, giao lại cái gì và có vấn đề gì. Không ai đọc hằng ngày, nhưng khi mất hàng thì sổ là thứ đầu tiên được mở ra.",
        "columns": [
          "Thành phần",
          "Sổ giao ca",
          "Nhật ký quy trình có AI"
        ],
        "rows": [
          [
            "Ai",
            "Người trực ca",
            "Người duyệt"
          ],
          [
            "Lúc nào",
            "Giờ bắt đầu và kết thúc ca",
            "Thời điểm duyệt"
          ],
          [
            "Cái gì",
            "Hàng và tình trạng bàn giao",
            "Mã hoặc nguyên văn bản được duyệt"
          ],
          [
            "Kết quả",
            "Bình thường hay có vấn đề",
            "Đồng ý, sửa hoặc từ chối kèm lý do"
          ]
        ],
        "oneLiner": "Nhật ký là sổ giao ca của quy trình: hiếm khi đọc, nhưng lúc cần thì không thể thiếu."
      },
      {
        "type": "heading",
        "text": "Bốn cột tối thiểu"
      },
      {
        "type": "list",
        "items": [
          "Ai duyệt: tên hoặc mã người, để biết hỏi ai.",
          "Lúc nào: ngày giờ, để biết thứ tự sự việc.",
          "Bản nào: mã bản hoặc nguyên văn mà người duyệt đã thấy, để đối chiếu với bản đã gửi.",
          "Quyết định: đồng ý, sửa hay từ chối, cùng lý do nếu từ chối."
        ]
      },
      {
        "type": "paragraph",
        "text": "Nếu người duyệt có sửa, hãy lưu cả bản AI soạn và bản sau khi sửa. Hai bản cạnh nhau cho biết AI hay sai ở đâu, và sau này chứng minh được bản nào đã đi ra ngoài. Bạn không cần thêm cột thứ năm cho tới khi có một câu hỏi thật mà bốn cột không trả lời được."
      },
      {
        "type": "flow",
        "title": "Một lần tra cứu sau ba tháng",
        "steps": [
          {
            "label": "Câu hỏi tới",
            "detail": "Khách hoặc sếp hỏi: ai đồng ý email có mức giảm giá ngày đó, và đó là bản nào."
          },
          {
            "label": "Tìm theo thời điểm và khách",
            "detail": "Bạn lọc nhật ký theo ngày và tên khách, ra vài dòng duyệt."
          },
          {
            "label": "Mở đúng bản",
            "detail": "Cột bản nào dẫn tới mã hoặc nguyên văn. Bạn đặt nó cạnh email khách đã nhận."
          },
          {
            "label": "Kết luận",
            "detail": "Bản khớp thì quy trình đúng; bản lệch thì bạn biết lỗi ở bước sau duyệt, không phải ở người duyệt hay AI."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Nhật ký bốn cột",
          "text": "Ít cột nên người ghi điền đủ. Mỗi dòng dựng lại được một lần duyệt: ai, lúc nào, bản nào, quyết định gì."
        },
        "right": {
          "label": "Nhật ký hai mươi cột",
          "text": "Nhiều cột, nhiều ô bỏ trống, người ghi nản. Khi cần tra thì đúng cột cần nhất lại thiếu hoặc điền qua loa."
        }
      },
      {
        "type": "callout",
        "label": "Không ghi dữ liệu nhạy cảm vào nhật ký",
        "text": "Nhật ký có thể nhiều người mở. Đừng dán số tài khoản, số giấy tờ của khách vào đó; dùng mã bản và mã khách để liên kết tới nơi lưu an toàn. Hỏi bộ phận IT hoặc pháp chế về thời gian lưu nhật ký."
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI gợi ý các cột nhật ký cho quy trình thư khách",
        "task": "Bạn muốn AI giúp chọn các cột nhật ký cho quy trình thư trả lời khách có người duyệt. Hãy lắp prompt.",
        "parts": [
          {
            "id": "context",
            "label": "Bối cảnh",
            "options": [
              {
                "text": "Tôi cần một cái bảng để theo dõi công việc.",
                "feedback": "Không nói quy trình gì hay tra lại khi nào nên AI trả về mẫu theo dõi công việc chung chung."
              },
              {
                "text": "Tôi quản lý quy trình trả lời khách: AI soạn thư, một người duyệt, rồi gửi. Nhóm 6 người, cần tra lại được sau ba tháng.",
                "good": true,
                "feedback": "Có quy trình, số người và yêu cầu thời gian tra cứu: AI cho đề xuất sát."
              }
            ]
          },
          {
            "id": "task",
            "label": "Việc cần làm",
            "options": [
              {
                "text": "Liệt kê thật nhiều cột có thể hữu ích để theo dõi.",
                "feedback": "\"Thật nhiều cột\" cho ra hai mươi cột và người ghi bỏ trống."
              },
              {
                "text": "Đề xuất tối đa bốn cột và giải thích mỗi cột trả lời câu hỏi nào khi có khiếu nại.",
                "good": true,
                "feedback": "Giới hạn bốn cột và gắn với câu hỏi tra cứu nên AI buộc phải chọn."
              }
            ]
          },
          {
            "id": "format",
            "label": "Khuôn dạng",
            "options": [
              {
                "text": "Trả lời dài và chi tiết để tôi tham khảo.",
                "feedback": "\"Dài và chi tiết\" nên AI viết một đoạn văn, khó chuyển thành bảng."
              },
              {
                "text": "Trả về bảng ba cột: tên cột, nó trả lời câu hỏi nào, ví dụ một dòng điền thử.",
                "good": true,
                "feedback": "Có khuôn dạng bảng và ví dụ điền thử: dùng được ngay."
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
            "text": "| Cột | Trả lời câu hỏi | Ví dụ |\n| Người duyệt | Hỏi ai về quyết định này? | chị Thảo |\n| Thời điểm | Sự việc xảy ra khi nào? | 14/03 16:05 |\n| Mã bản | Người duyệt đã thấy nội dung nào? | TL-0412-v2 |\n| Quyết định | Đồng ý, sửa hay từ chối, vì sao? | Sửa: mức giảm 15% -> 10% |"
          },
          {
            "requires": [
              "context"
            ],
            "text": "Gợi ý các cột: Người duyệt, Ngày, Khách hàng, Loại thư, Người soạn, Công cụ AI, Độ dài, Thời gian xử lý, Ghi chú chung...\n\n(Có bối cảnh nhưng không giới hạn số cột và không gắn với câu hỏi tra cứu: nhiều cột thừa, vẫn thiếu cột bản nào.)"
          },
          {
            "text": "Bảng theo dõi công việc: Tên việc, Người phụ trách, Hạn, Trạng thái, Mức ưu tiên, Ghi chú...\n\n(Prompt mơ hồ nên AI trả lời mẫu theo dõi việc chung, không liên quan tới việc tra lại một lần duyệt.)"
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Khách khiếu nại một lời hứa sau ba tháng",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Khách Bình nói ba tháng trước công ty hứa giao trong 2 ngày bằng email. Sếp hỏi bạn: ai đã duyệt email đó và nội dung chính xác là gì? Nhật ký của nhóm có các cột: Ngày, Khách, \"OK\".",
            "choices": [
              {
                "label": "Trả lời theo trí nhớ: chắc là chị Thảo duyệt, chắc thư ghi 3 ngày",
                "next": "bad_memory"
              },
              {
                "label": "Tìm dòng của khách Bình trong nhật ký, rồi tìm cách xác nhận bản đã duyệt",
                "next": "s2"
              }
            ]
          },
          "bad_memory": {
            "text": "Bạn trả lời sếp rồi sau đó mới tìm thấy: người duyệt thật là anh Nam, và thư ghi 2 ngày. Lời đoán sai làm sếp xin lỗi khách dựa trên thông tin lệch, mất thêm uy tín.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bạn thấy dòng của khách Bình nhưng chỉ có \"OK\": không có tên người duyệt, không có mã bản. Bạn phải lục hộp thư gửi để tìm email, mất hai tiếng.",
            "choices": [
              {
                "label": "Sửa mẫu nhật ký thành bốn cột: người duyệt, lúc nào, mã bản, quyết định, áp dụng từ hôm nay",
                "next": "good"
              },
              {
                "label": "Ghi chú lần này là ngoại lệ, tiếp tục dùng cột \"OK\" như cũ",
                "next": "bad_same"
              }
            ]
          },
          "bad_same": {
            "text": "Hai tháng sau một khiếu nại khác lại gặp đúng tình huống: không biết ai duyệt, bản nào. Cùng một thiếu sót, tốn thêm hai tiếng.",
            "ending": "bad"
          },
          "good": {
            "text": "Từ nay mỗi lần duyệt đều ghi bốn cột. Lần khiếu nại tiếp theo, bạn mở nhật ký, lọc theo khách và trả lời sếp trong một phút, kèm đúng bản đã duyệt.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Bốn cột: ai duyệt, lúc nào, bản nào, quyết định gì.",
          "Bài sau: dự án nhỏ, dựng bộ phiếu duyệt và nhật ký rồi chạy thử với năm yêu cầu mẫu."
        ]
      }
    ]
  },
  {
    "id": 2509,
    "slug": "du-an-nho-mau-nhat-ky-va-phieu-duyet",
    "title": "Chặng 55, Bài 10: Dự án nhỏ: bộ phiếu duyệt và nhật ký cho quy trình của bạn",
    "subtitle": "Một buổi chiều để dựng thật, thử với năm yêu cầu, và ghi lại chỗ vướng.",
    "duration": "10 phút",
    "difficulty": "Dễ",
    "emoji": "🧰",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Biết phiếu duyệt và nhật ký là một chuyện, dùng thử trên năm yêu cầu thật là chuyện khác: chỉ khi chạy mới thấy phiếu thiếu chỗ nào, cột nào người ghi bỏ trống. Dự án nhỏ này cho bạn một bộ đồ nghề dùng được ngay và danh sách chỗ vướng để sửa trước khi chạy thật.",
    "openingQuestion": "Bạn vừa dựng xong phiếu duyệt và bảng nhật ký trên giấy. Bước nào nên làm tiếp theo trước khi cho cả nhóm dùng?",
    "openingOptions": [
      "Chạy thử với khoảng năm yêu cầu mẫu và ghi lại chỗ vướng",
      "Gửi ngay mẫu cho cả nhóm kèm thông báo bắt buộc dùng từ mai",
      "Nhờ AI chấm điểm phiếu rồi dùng điểm đó để quyết định triển khai",
      "Thêm cột và ô để phiếu đầy đủ hơn trước khi ai dùng thử nó"
    ],
    "correctOption": 0,
    "explanation": "Phiếu nào nhìn cũng hợp lý trên giấy; chỉ khi có người điền thật mới lộ ra ô khó hiểu, cột bị bỏ trống, bước thiếu. Năm yêu cầu mẫu là đủ nhỏ để làm trong một buổi và đủ để thấy các chỗ vướng lặp lại. Bắt dùng ngay làm lỗi thiết kế lan ra cả nhóm, AI chấm điểm phiếu không thay được người thật điền, và thêm cột khi chưa thử thường làm phiếu dài hơn chứ không tốt hơn.",
    "diagram": [
      {
        "label": "Dựng phiếu duyệt và bảng nhật ký",
        "arrow": true
      },
      {
        "label": "Chọn năm yêu cầu mẫu, đủ loại",
        "arrow": true
      },
      {
        "label": "Chạy thử: điền phiếu, duyệt, ghi nhật ký",
        "arrow": true
      },
      {
        "label": "Ghi chỗ vướng, sửa, rồi mới mở rộng"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: nhóm hỗ trợ khách hàng 4 người",
      "description": "Nhóm dựng phiếu và bảng nhật ký trong một buổi sáng, rồi chạy thử năm yêu cầu có đủ loại: hỏi giờ mở cửa, xin hoàn tiền, đổi địa chỉ, khiếu nại, xin hóa đơn. Họ ghi ra ba chỗ vướng: hai ô trong phiếu không ai điền, và không rõ ai duyệt thư đổi địa chỉ. Sau khi sửa, họ mới mở cho cả nhóm."
    },
    "quiz": [
      {
        "question": "Vì sao chọn năm yêu cầu mẫu có đủ loại thay vì năm yêu cầu giống nhau?",
        "options": [
          "Mỗi loại thử một nhánh khác nhau của quy trình và phiếu",
          "Để có đủ số lượng cho báo cáo trông có vẻ nhiều dữ liệu",
          "Vì AI chỉ hoạt động tốt khi nhận các yêu cầu khác nhau",
          "Để người duyệt không bị nhàm chán khi làm cùng một việc"
        ],
        "correct": 0,
        "explanation": "Năm yêu cầu giống nhau chỉ thử một đường đi. Đủ loại (hỏi thông tin, tiền, dữ liệu khách...) mới lộ chỗ nào đi thẳng, chỗ nào phải qua cổng. Đó không phải chuyện làm báo cáo, AI xử lý được yêu cầu giống nhau, và giảm nhàm chán không phải mục tiêu."
      },
      {
        "question": "Khi chạy thử, hai ô trên phiếu không ai điền. Nên làm gì?",
        "options": [
          "Bỏ hoặc gộp hai ô đó, vì ô không dùng chỉ làm phiếu dài",
          "Giữ nguyên và nhắc người duyệt điền cho đủ mọi ô",
          "Đổi ô thành bắt buộc để hệ thống chặn nếu còn để trống",
          "Nhờ AI tự điền hai ô đó để phiếu trông đủ và không còn ô trống nào"
        ],
        "correct": 0,
        "explanation": "Ô không ai điền là tín hiệu ô thừa hoặc khó hiểu. Bỏ hoặc gộp thì phiếu gọn hơn. Bắt điền bắt buộc làm người duyệt điền bừa, nhắc nhở không đổi nguyên nhân, và AI điền hộ tạo dữ liệu giả trong nhật ký."
      },
      {
        "question": "Ghi 'chỗ vướng' trong lúc chạy thử nhằm mục đích gì?",
        "options": [
          "Biến những khó khăn thật thành danh sách việc sửa cụ thể",
          "Để chứng minh quy trình cũ tốt hơn quy trình mới này",
          "Để người duyệt có bằng chứng khi muốn từ chối dùng phiếu",
          "Để gửi cho AI học cách viết phiếu tốt hơn ở lần sau"
        ],
        "correct": 0,
        "explanation": "Danh sách chỗ vướng cho biết chính xác cần sửa gì trước khi mở rộng. Nó không nhằm chống quy trình mới hay tạo cớ từ chối, và AI không học từ ghi chú riêng của bạn."
      },
      {
        "question": "Sau khi chạy thử và sửa, bạn nên làm gì tiếp theo?",
        "options": [
          "Chạy lại một vòng ngắn với yêu cầu mới, rồi mới mở cho cả nhóm",
          "Mở ngay cho cả nhóm vì đã sửa hết các chỗ vướng rồi",
          "Dừng lại, vì phiếu đã hoàn hảo sau một lần sửa duy nhất",
          "Chờ ba tháng rồi mới xem lại phiếu một lần cho chắc ăn"
        ],
        "correct": 0,
        "explanation": "Sửa xong chưa chắc đã ổn: một vòng ngắn với yêu cầu mới kiểm tra lại các thay đổi. Không chạy lại dễ để lỗi mới lọt. Không có phiếu nào hoàn hảo sau lần sửa đầu, và chờ ba tháng mới xem thì quá muộn."
      },
      {
        "question": "Năm yêu cầu mẫu nên lấy từ đâu?",
        "options": [
          "Từ những yêu cầu thật trong tuần trước của chính bạn",
          "Do AI tự bịa ra để mẫu có vẻ đa dạng hơn thực tế",
          "Chỉ chọn những yêu cầu dễ để phiếu qua thử nghiệm nhanh",
          "Sao chép yêu cầu từ một nhóm công ty khác làm khác việc"
        ],
        "correct": 0,
        "explanation": "Yêu cầu thật của bạn mới lộ ra chỗ vướng thật. Mẫu AI bịa thường quá gọn gàng, chọn chỉ yêu cầu dễ làm bỏ qua ca khó, và yêu cầu của nhóm khác không khớp quy trình của bạn. Nhớ gỡ thông tin cá nhân của khách trước khi dùng."
      }
    ],
    "keyTakeaways": [
      "Dựng bộ đồ nghề trước: một phiếu duyệt và một bảng nhật ký bốn cột.",
      "Chạy thử với khoảng năm yêu cầu thật, đủ loại, đã gỡ thông tin cá nhân.",
      "Ghi lại mọi chỗ vướng thành danh sách việc sửa.",
      "Sửa xong thì chạy lại một vòng ngắn rồi mới mở rộng."
    ],
    "practicePrompt": {
      "question": "Chạy thử năm yêu cầu, người duyệt phàn nàn phiếu thiếu chỗ ghi lý do từ chối. Bạn xử lý thế nào?",
      "options": [
        "Thêm một ô lý do ngắn chỉ hiện khi chọn Từ chối, rồi chạy lại",
        "Bỏ qua, vì từ chối hiếm khi xảy ra trong thực tế công việc",
        "Thêm năm ô lý do khác nhau để người duyệt chọn đủ mọi tình huống",
        "Đổi thành người soạn tự ghi lý do thay cho người duyệt"
      ],
      "correct": 0,
      "explanation": "Một ô lý do ngắn chỉ hiện khi cần giải quyết đúng chỗ vướng mà không làm phiếu dài. Bỏ qua mất thông tin để sửa AI, năm ô lý do làm phiếu phức tạp, còn để người soạn ghi thì lý do không còn là của người duyệt."
    },
    "summary": {
      "keyIdea": "Bộ phiếu và nhật ký chỉ tốt khi đã qua chạy thử bằng việc thật của bạn.",
      "formula": "Dựng bộ đồ nghề + chạy 5 yêu cầu thật + ghi chỗ vướng + sửa + chạy lại.",
      "commonMistake": "Mở ngay cho cả nhóm vì phiếu trông hợp lý trên giấy.",
      "action": "Chọn năm yêu cầu tuần trước của bạn và chạy thử bộ phiếu."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Dựng một phiếu duyệt một trang (yêu cầu gốc, bản AI soạn, ba điểm cần kiểm, ba nút) và một bảng nhật ký bốn cột. Chọn năm yêu cầu có thật từ tuần trước, gỡ thông tin cá nhân, rồi điền thử từng cái. Ghi lại ít nhất ba chỗ vướng: ô khó điền, thiếu thông tin, hoặc chưa rõ ai duyệt.",
      "secondary": "Ngày mai bạn sẽ được hỏi: ba chỗ vướng cụ thể bạn tìm thấy là gì?"
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bốn bài trước cho bạn các mảnh: cổng duyệt, phiếu duyệt, dấu hiệu duyệt máy móc, nhật ký. Bài này ghép chúng thành một bộ đồ nghề và thử với năm yêu cầu có thật, trong một buổi."
      },
      {
        "type": "feynman",
        "title": "Dự án thử nhỏ đơn giản hơn bạn nghĩ",
        "intro": "Khi may một bộ đồ mới, thợ may không cắt luôn cả cuộn vải. Họ may thử trên vải rẻ, mặc lên người, thấy chỗ chật chỗ rộng rồi mới cắt vải thật.",
        "columns": [
          "Thành phần",
          "May thử áo",
          "Chạy thử quy trình"
        ],
        "rows": [
          [
            "Vật liệu thử",
            "Vải rẻ",
            "Năm yêu cầu thật đã gỡ thông tin cá nhân"
          ],
          [
            "Cách thử",
            "Mặc lên người",
            "Điền phiếu, duyệt, ghi nhật ký thật"
          ],
          [
            "Phát hiện",
            "Chỗ chật, chỗ rộng",
            "Ô khó điền, bước thiếu, người duyệt chưa rõ"
          ],
          [
            "Sau đó",
            "Sửa rập rồi cắt vải thật",
            "Sửa phiếu rồi mở cho cả nhóm"
          ]
        ],
        "oneLiner": "Chạy thử nhỏ để lỗi lộ ra khi còn rẻ."
      },
      {
        "type": "heading",
        "text": "Bộ đồ nghề gồm hai thứ"
      },
      {
        "type": "list",
        "items": [
          "Phiếu duyệt một trang: yêu cầu gốc, bản AI soạn, ba điểm cần kiểm tô sẵn, ba nút (đồng ý, sửa, từ chối kèm lý do).",
          "Bảng nhật ký bốn cột: người duyệt, thời điểm, mã bản, quyết định.",
          "Một danh sách chỗ vướng để trống: mỗi lần thấy khó, ghi ngay một dòng."
        ]
      },
      {
        "type": "flow",
        "title": "Một buổi chạy thử năm yêu cầu",
        "steps": [
          {
            "label": "Chọn năm yêu cầu",
            "detail": "Lấy từ tuần trước của bạn, đủ loại: một câu hỏi thông tin, một có tiền, một có dữ liệu khách, một khiếu nại và một bất thường. Gỡ tên thật."
          },
          {
            "label": "Cho AI soạn nháp",
            "detail": "Mỗi yêu cầu nhờ AI soạn, rồi dán vào phiếu cạnh yêu cầu gốc."
          },
          {
            "label": "Duyệt như thật",
            "detail": "Bạn (hoặc một đồng nghiệp) điền phiếu, tô ba điểm, chọn đồng ý, sửa hay từ chối. Ghi dòng vào nhật ký."
          },
          {
            "label": "Ghi chỗ vướng",
            "detail": "Mỗi lần do dự, hỏi lại hoặc bỏ trống ô nào đều đáng một dòng vào danh sách chỗ vướng."
          },
          {
            "label": "Sửa rồi chạy lại",
            "detail": "Sửa phiếu và nhật ký theo danh sách, chạy lại một vòng ngắn. Khi đã thuận tay mới mở cho cả nhóm."
          }
        ]
      },
      {
        "type": "paragraph",
        "text": "Yêu cầu thứ nhất thường cho thấy lỗi lớn nhất, yêu cầu thứ năm thường cho thấy lỗi tinh tế: ô nào luôn bị bỏ trống, loại yêu cầu nào không ai biết ai duyệt. Đừng sửa giữa chừng khi chưa hết năm cái, vì bạn cần thấy mẫu lặp lại, không phải lỗi đơn lẻ."
      },
      {
        "type": "comparison",
        "left": {
          "label": "Chạy thử nhỏ",
          "text": "Năm yêu cầu thật, một buổi chiều, chỉ bạn và một đồng nghiệp biết. Lỗi tìm ra và sửa trước khi ai khác bị ảnh hưởng."
        },
        "right": {
          "label": "Triển khai ngay",
          "text": "Cả nhóm dùng từ hôm sau. Lỗi thiết kế lộ ra giữa lúc làm việc thật, và một lời hứa sai có thể đã gửi đi trước khi bạn kịp sửa."
        }
      },
      {
        "type": "callout",
        "label": "Gỡ thông tin cá nhân trước khi thử",
        "text": "Đừng dán tên, số điện thoại, số tài khoản thật của khách vào công cụ AI chưa được công ty duyệt. Thay bằng \"Khách A\", \"Khách B\" và số giả có cùng dạng. Hỏi bộ phận IT hoặc pháp chế nếu chưa rõ."
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI dựng bộ phiếu duyệt và nhật ký cho quy trình thư khách",
        "task": "Bạn muốn AI dựng nháp bộ phiếu duyệt một trang và bảng nhật ký bốn cột cho quy trình của mình. Hãy lắp prompt.",
        "parts": [
          {
            "id": "context",
            "label": "Bối cảnh",
            "options": [
              {
                "text": "Nhóm tôi trả lời khách hàng mỗi ngày.",
                "feedback": "Thiếu loại thư nào cần duyệt và khối lượng nên AI dựng phiếu cho mọi thư như nhau."
              },
              {
                "text": "Nhóm 4 người trả lời khách; AI soạn thư, một người duyệt các thư có tiền hoặc dữ liệu khách. Khoảng 30 thư mỗi ngày.",
                "good": true,
                "feedback": "Đủ quy mô, người duyệt và loại thư cần qua cổng: AI dựng sát."
              }
            ]
          },
          {
            "id": "task",
            "label": "Việc cần làm",
            "options": [
              {
                "text": "Dựng hệ thống quản lý duyệt hoàn chỉnh cho cả công ty.",
                "feedback": "Phạm vi quá to: AI đưa ra quy trình cả công ty, bạn không thử nổi trong một buổi."
              },
              {
                "text": "Dựng nháp một phiếu duyệt một trang và bảng nhật ký bốn cột; mỗi trường phải có lý do tồn tại.",
                "good": true,
                "feedback": "Giới hạn hai sản phẩm và yêu cầu có lý do: phạm vi vừa một buổi."
              }
            ]
          },
          {
            "id": "format",
            "label": "Khuôn dạng",
            "options": [
              {
                "text": "Trả lời đầy đủ nhất có thể.",
                "feedback": "\"Đầy đủ nhất\" làm AI thêm trường: bạn lại phải cắt nhiều hơn."
              },
              {
                "text": "Phiếu: bảng hai cột cộng ba điểm cần kiểm; nhật ký: bảng với một dòng ví dụ; ghi chú chỗ nào tôi nên cắt bớt.",
                "good": true,
                "feedback": "Có khuôn dạng rõ và yêu cầu ghi chú chỗ cắt bớt, đúng việc của bạn."
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
            "text": "PHIẾU DUYỆT (1 trang)\n| Yêu cầu gốc của khách | Bản AI soạn |\nĐiểm cần kiểm: 1) số tiền, 2) cam kết thời hạn, 3) thông tin khách\n[Đồng ý] [Sửa] [Từ chối + lý do]\n\nNHẬT KÝ\n| Người duyệt | Thời điểm | Mã bản | Quyết định |\n| chị Thảo | 14/03 16:05 | TL-0412-v2 | Sửa: mức giảm 15% -> 10% |\n\nCó thể cắt: ô ghi chú chung nếu người duyệt không dùng."
          },
          {
            "requires": [
              "context"
            ],
            "text": "PHIẾU DUYỆT\nMã phiếu, loại thư, ưu tiên, bản nháp, ghi chú chung, trạng thái...\nNHẬT KÝ\nNgày, người gửi, khách, loại, trạng thái...\n\n(Có bối cảnh nhưng thiếu phạm vi và khuôn dạng: nhiều trường hành chính, thiếu yêu cầu gốc và mã bản.)"
          },
          {
            "text": "HỆ THỐNG QUẢN LÝ DUYỆT\nModule 1: Phân quyền. Module 2: Quy trình phê duyệt nhiều cấp. Module 3: Báo cáo tổng hợp toàn công ty...\n\n(Prompt mơ hồ nên AI vẽ một hệ thống quá to so với một buổi chạy thử.)"
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Buổi chạy thử năm yêu cầu",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn đã chạy xong ba trong năm yêu cầu. Ở yêu cầu thứ ba (đổi địa chỉ giao), bạn không biết phải đưa phiếu cho ai duyệt vì nó có dữ liệu khách nhưng không có tiền.",
            "choices": [
              {
                "label": "Ghi vào danh sách chỗ vướng rồi chạy nốt hai yêu cầu còn lại",
                "next": "s2"
              },
              {
                "label": "Dừng lại, tự quyết người duyệt và bỏ qua hai yêu cầu còn lại",
                "next": "bad_stop"
              }
            ]
          },
          "bad_stop": {
            "text": "Bạn tự chọn người duyệt không hỏi ai và bỏ hai yêu cầu còn lại. Sau đó không biết đó là chỗ vướng riêng lẻ hay lặp lại, và người bạn chọn từ chối nhận việc.",
            "ending": "bad"
          },
          "s2": {
            "text": "Yêu cầu thứ tư và thứ năm cũng có chỗ vướng tương tự: không rõ ai duyệt loại thư có dữ liệu khách nhưng không có tiền. Bạn thấy mẫu lặp lại. Danh sách chỗ vướng có bốn dòng.",
            "choices": [
              {
                "label": "Hỏi trưởng nhóm, chỉ định người duyệt cho loại thư dữ liệu khách và chạy lại một vòng ngắn",
                "next": "good"
              },
              {
                "label": "Bỏ loại thư đó ra khỏi quy trình để khỏi phải quyết định",
                "next": "bad_drop"
              }
            ]
          },
          "bad_drop": {
            "text": "Loại thư đổi địa chỉ vẫn tồn tại và được gửi bằng tay không qua quy trình, nên không có nhật ký. Khoảng trống đó là nơi lỗi tiếp theo xuất hiện.",
            "ending": "bad"
          },
          "good": {
            "text": "Trưởng nhóm chỉ định người duyệt. Vòng chạy lại cho thấy phiếu điền suôn sẻ, nhật ký đủ bốn cột. Bạn mở bộ đồ nghề cho cả nhóm, kèm danh sách chỗ vướng đã sửa.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Dựng, chạy thử năm yêu cầu, ghi chỗ vướng, sửa rồi mới mở rộng.",
          "Bài sau: khi AI trả lời sai hoặc bỏ trống, bước dự phòng là gì."
        ]
      }
    ]
  }
];
