import type { Lesson } from "../lesson-types";

// Chặng 56, bài 16-20. Giáo trình: scripts/curriculum/stage-56.json.
export const S56_D_LESSONS: Lesson[] = [
  {
    "id": 2535,
    "slug": "thay-chu-mau-bang-noi-dung-that-cua-ban",
    "title": "Chặng 56, Bài 16: Thay hết chữ mẫu bằng nội dung thật, không sót chữ 'Lorem'",
    "subtitle": "AI điền chữ mẫu cho trang đẹp; khách đọc thì thấy ngay chỗ nào chưa thật.",
    "duration": "8 phút",
    "difficulty": "Trung bình",
    "emoji": "🔎",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Một trang còn dòng Lorem ipsum hay số điện thoại 0123 456 789 nói với khách rằng chủ trang chưa chăm chút, hoặc tệ hơn là khách gọi nhầm số. Dành mười phút rà chữ mẫu trước khi gửi link là việc rẻ nhất để giữ lòng tin.",
    "openingQuestion": "Bạn gửi link trang tiệm bánh cho một khách quen. Chị nhắn lại: \"Số gọi đặt bánh bị sai rồi em.\" Trang có nút Gọi ngay và giao diện rất đẹp. Nguyên nhân dễ xảy ra nhất là gì?",
    "openingOptions": [
      "Số điện thoại mẫu AI điền lúc dựng trang vẫn chưa được thay",
      "Trình duyệt của chị khách quá cũ nên hiển thị sai các con số",
      "Nút Gọi ngay tự đổi số sau mỗi vài ngày để tránh bị quấy rối",
      "Màu nút quá nhạt nên chị bấm nhầm sang một dòng chữ khác ngay cạnh"
    ],
    "correctOption": 0,
    "explanation": "Khi bạn chưa đưa số thật, AI phải điền một thứ cho trang trông đủ bộ, và nó điền số mẫu, tên tạm, địa chỉ giả. Trang vẫn đẹp và nút vẫn bấm được nên bạn không nhận ra. Trình duyệt cũ không làm đổi một dãy số, nút không tự đổi số, và màu nhạt chỉ làm khó nhìn chứ không khiến khách gọi số khác. Chỗ sai nằm ở chính chữ trên trang, nên cách bắt lỗi duy nhất là đọc từng dòng.",
    "diagram": [
      {
        "label": "AI dựng trang, điền chữ mẫu vào chỗ trống",
        "arrow": true
      },
      {
        "label": "Bạn đọc to từng dòng như khách",
        "arrow": true
      },
      {
        "label": "Đánh dấu mọi chỗ giả: Lorem, số mẫu, tên tạm",
        "arrow": true
      },
      {
        "label": "Thay bằng thông tin thật từ bảng của bạn"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Một cô chủ tiệm hoa nhờ AI dựng trang giới thiệu. Bản đầu có địa chỉ \"123 Đường Mẫu\" và số điện thoại toàn số 0. Cô chỉ nhìn ảnh thấy đẹp nên gửi link cho nhóm khách. Hai người nhắn hỏi tiệm ở đâu. Từ hôm sau cô rà từng dòng bằng bảng thông tin thật trước khi gửi bất kỳ link nào."
    },
    "quiz": [
      {
        "question": "Cách đáng tin nhất để bắt hết chữ mẫu còn sót trên trang là gì?",
        "options": [
          "Đọc to từng dòng, đối chiếu với bảng thông tin thật của bạn",
          "Nhờ AI cho biết trang còn chữ mẫu nào không rồi tin câu trả lời",
          "Nhìn lướt bố cục thấy cân đối thì coi như chữ đã ổn",
          "Chỉ kiểm phần đầu trang vì khách hiếm khi cuộn xuống"
        ],
        "correct": 0,
        "explanation": "Đọc từng dòng đối chiếu với nguồn thật mới bắt được cả số điện thoại hay giờ mở cửa trông rất hợp lý. Hỏi AI thì nó có thể nói \"không còn\" với cùng giọng tự tin. Nhìn bố cục không thấy chữ. Khách cuộn hết trang khi tìm địa chỉ hay số gọi, thường nằm cuối."
      },
      {
        "question": "Trang ghi giờ mở cửa \"8:00 - 17:00\" nhưng tiệm thật mở 6:30. Đó là lỗi gì?",
        "options": [
          "Giờ do AI tự điền vì bạn chưa đưa giờ thật",
          "Lỗi phông chữ làm con số hiển thị lệch đi một chút",
          "Lỗi đường truyền làm giờ bị cập nhật chậm vài phút",
          "Lỗi của khách vì đọc nhầm dòng giờ mở cửa"
        ],
        "correct": 0,
        "explanation": "AI không biết tiệm mở lúc mấy giờ nên điền một giờ hành chính nghe hợp lý. Phông chữ không đổi con số, đường truyền không liên quan vì đây là chữ cố định trên trang, và lỗi nằm ở nội dung chứ không phải ở người đọc."
      },
      {
        "question": "Dòng \"Lorem ipsum dolor sit amet\" xuất hiện trên trang nghĩa là gì?",
        "options": [
          "Đó là chữ giữ chỗ, chưa phải nội dung của bạn",
          "Đó là câu khẩu hiệu tiếng Latin mà AI chọn cho sang",
          "Đó là mã lỗi báo trang bị hỏng ở phần này",
          "Đó là tên nhà thiết kế ký vào trang như bản quyền"
        ],
        "correct": 0,
        "explanation": "Lorem ipsum là đoạn chữ giả quen thuộc dùng để giữ chỗ khi chưa có nội dung. Nó không phải khẩu hiệu, mã lỗi hay chữ ký. Còn thấy nó nghĩa là khung đó chưa có chữ thật."
      },
      {
        "question": "Bạn đọc thấy tên \"Nguyễn Văn A\" ở phần giới thiệu chủ tiệm. Nên làm gì?",
        "options": [
          "Thay bằng tên thật hoặc bỏ dòng đó",
          "Giữ nguyên, vì khách biết đó chỉ là tên ví dụ",
          "Nhờ AI đổi thành một tên khác nghe thật hơn",
          "Đổi chữ thành màu nhạt để khách đỡ chú ý"
        ],
        "correct": 0,
        "explanation": "Tên tạm phải là tên thật hoặc bị xoá. Giữ nguyên thì khách không biết đó là ví dụ. Nhờ AI đặt tên khác nghe thật hơn là bịa thêm một người không tồn tại. Đổi màu không bỏ được chữ sai."
      },
      {
        "question": "Nên bắt đầu rà chữ mẫu từ đâu cho hiệu quả?",
        "options": [
          "Nơi khách cần hành động: số gọi, địa chỉ, giờ, giá",
          "Phần mô tả dài ở giữa trang vì nhiều chữ nhất",
          "Dòng bản quyền ở cuối trang vì hay có lỗi chính tả",
          "Tên các tệp ảnh vì khách sẽ nhìn thấy khi tải"
        ],
        "correct": 0,
        "explanation": "Sai ở chỗ khách hành động (gọi, đến, trả tiền) gây hại ngay, nên rà chúng trước. Đoạn dài sai chữ ít gây hậu quả hơn số gọi sai. Dòng bản quyền và tên tệp ảnh thường khách không đọc."
      }
    ],
    "keyTakeaways": [
      "AI điền chữ mẫu khi bạn chưa đưa thông tin thật; trang đẹp không đảm bảo chữ đúng.",
      "Rà từ chỗ khách hành động: số gọi, địa chỉ, giờ, giá.",
      "Đọc to từng dòng, đối chiếu bảng thông tin thật.",
      "Hỏi AI \"còn chữ mẫu không\" không thay được việc đọc.",
      "Tên tạm, số mẫu phải thay hoặc xoá, không để khách tự đoán."
    ],
    "practicePrompt": {
      "question": "Bạn rà trang và thấy ba lỗi: một dòng Lorem ở phần dịch vụ, số gọi mẫu ở nút liên hệ, tên tạm ở phần giới thiệu. Nên sửa theo thứ tự nào?",
      "options": [
        "Số gọi trước, rồi tên, rồi dòng Lorem",
        "Dòng Lorem trước vì nó dễ thấy nhất",
        "Tên tạm trước vì nó ngắn nhất để sửa",
        "Cả ba cùng lúc bằng một câu lệnh chung cho AI"
      ],
      "correct": 0,
      "explanation": "Số gọi sai làm mất khách ngay nên sửa trước. Dòng Lorem dễ thấy nhưng ít hậu quả hơn. Sửa theo độ dài không có lý do. Một câu lệnh chung khiến AI tự điền lại chữ mẫu mới."
    },
    "summary": {
      "keyIdea": "Trang đẹp vẫn có thể chứa chữ giả; chỉ việc đọc từng dòng mới bắt được.",
      "formula": "Đọc to từng dòng + bảng thông tin thật = không còn chữ mẫu.",
      "commonMistake": "Tin vào vẻ ngoài của trang hoặc hỏi lại AI thay vì tự đọc.",
      "action": "Đọc to toàn trang của bạn một lần và gạch mọi dòng không phải chữ thật."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Mở trang (hoặc bản nháp) của bạn, in ra hoặc mở cạnh bảng thông tin thật. Đọc to từng dòng, gạch dưới mọi chỗ còn chữ giả, số mẫu, tên tạm. Ghi lại thành danh sách đánh số và thay từng cái.",
      "secondary": "Mai bạn sẽ được hỏi: tìm ra bao nhiêu chỗ chữ giả, chỗ nào nghiêm trọng nhất?"
    },
    "sections": [
      {
        "type": "lead",
        "text": "Dựng xong trang, bạn thấy nó đẹp hơn mong đợi. Nhưng đẹp chưa phải đúng. Bài này dạy cách rà chữ giả trước khi bất kỳ khách nào thấy."
      },
      {
        "type": "feynman",
        "title": "Chữ mẫu đơn giản hơn bạn nghĩ",
        "intro": "Hình dung thợ làm bảng hiệu cửa hàng. Khi bạn chưa đưa tên và số điện thoại, ông ghi tạm \"TÊN TIỆM - 0123 456 789\" lên bảng để nhìn cho đủ bộ. Bảng vẫn sơn đẹp, treo lên vẫn chắc chắn.",
        "columns": [
          "Điều bạn thấy",
          "Bảng hiệu nháp",
          "Trang do AI dựng"
        ],
        "rows": [
          [
            "Chữ giữ chỗ",
            "Tên tiệm và số điện thoại ghi tạm",
            "Lorem ipsum, số mẫu, tên tạm"
          ],
          [
            "Vì sao có",
            "Thợ chưa có thông tin thật",
            "AI chưa được bạn đưa thông tin thật"
          ],
          [
            "Nguy cơ",
            "Khách gọi số tạm",
            "Khách gọi số mẫu, đến địa chỉ giả"
          ],
          [
            "Cách xử lý",
            "Đưa thông tin thật, đối chiếu trước khi treo",
            "Đọc từng dòng, đối chiếu bảng thông tin trước khi gửi link"
          ]
        ],
        "oneLiner": "AI không biết thì điền tạm; việc của bạn là đọc từng dòng và thay bằng chữ thật."
      },
      {
        "type": "heading",
        "text": "Chỗ nào chữ giả hay trốn"
      },
      {
        "type": "paragraph",
        "text": "Có ba nhóm hay sót. Nhóm một là chữ rõ ràng giả như Lorem ipsum hay \"Tiêu đề ở đây\", dễ thấy nhưng vẫn sót ở phần dưới. Nhóm hai là thông tin trông thật nhưng do AI đoán: giờ mở cửa, giá, địa chỉ quận, số điện thoại. Nhóm ba là tên: tên chủ tiệm, tên người đánh giá, tên sản phẩm tạm."
      },
      {
        "type": "paragraph",
        "text": "Nhóm hai nguy hiểm nhất vì nó không trông như lỗi. Không có tín hiệu nào báo rằng con số 8:00 là AI tự nghĩ ra, nên bạn chỉ phát hiện khi có người đối chiếu với thực tế."
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Chuẩn bị bảng thông tin thật: tên, số gọi, địa chỉ, giờ, giá.",
          "Bước 2 - Đọc to từng dòng của trang từ trên xuống dưới, như khách đọc.",
          "Bước 3 - Mỗi con số, tên, giờ: đối chiếu với bảng thật, không đối chiếu với trí nhớ.",
          "Bước 4 - Gạch chỗ sai, đánh số, sửa xong thì đọc lại toàn trang một lần."
        ]
      },
      {
        "type": "flow",
        "title": "Từ trang nháp đến trang không còn chữ giả",
        "steps": [
          {
            "label": "Mở trang cạnh bảng thông tin thật",
            "detail": "Đặt hai thứ cạnh nhau để không phải nhớ. Dựa vào trí nhớ dễ bỏ qua số sai vì nghe quen tai."
          },
          {
            "label": "Đọc to từ trên xuống dưới",
            "detail": "Đọc thành tiếng chậm hơn đọc thầm nên bắt được chữ thừa, tên tạm, câu vô nghĩa mà mắt lướt qua."
          },
          {
            "label": "Gạch và đánh số từng chỗ giả",
            "detail": "Ghi thành danh sách để khi nhờ AI sửa, bạn đưa đúng từng mục thay vì nói chung chung."
          },
          {
            "label": "Thay bằng chữ thật rồi đọc lại",
            "detail": "Sửa xong đọc lại toàn trang vì một lần sửa có thể kéo theo chỗ khác đổi theo."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Soát trang tiệm bánh do AI dựng",
        "task": "Bảng thông tin thật của tiệm: tên Bánh Nhà Lan, mở cửa 6:30 - 20:00 mỗi ngày, số gọi bạn đã ghi trong bảng, tiệm nằm ở Quận 3. Bản nháp AI dựng có các đoạn dưới đây. Đánh dấu những đoạn AI tự thêm hoặc còn là chữ mẫu.",
        "segments": [
          {
            "text": "Chào mừng đến với Bánh Nhà Lan - bánh ngọt làm mỗi sáng."
          },
          {
            "text": "Mở cửa từ 8:00 đến 17:00 các ngày trong tuần.",
            "error": "Bảng thật ghi 6:30 - 20:00 mỗi ngày; AI tự điền giờ hành chính."
          },
          {
            "text": "Tiệm nằm ở Quận 3."
          },
          {
            "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "error": "Đây là chữ giữ chỗ chưa có nội dung thật."
          },
          {
            "text": "Gọi đặt bánh: 0123 456 789.",
            "error": "Số này là số mẫu AI điền; bảng thật có số khác."
          },
          {
            "text": "Người sáng lập: Nguyễn Văn A, hơn 20 năm kinh nghiệm.",
            "error": "Tên tạm và số năm kinh nghiệm không có trong bảng, là AI bịa."
          }
        ]
      },
      {
        "type": "callout",
        "label": "Đừng nhờ AI tự rà",
        "text": "Hỏi AI \"trang còn chữ mẫu không\" là hỏi người đã điền chữ mẫu có điền sót không. Nó có thể trả lời \"không còn\" rất tự tin. Bạn là người có bảng thông tin thật, nên bạn là người kiểm."
      },
      {
        "type": "scenario",
        "title": "Hôm trước ngày gửi link cho khách",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Tối thứ Sáu, bạn định gửi link trang tiệm cho nhóm khách quen sáng mai. Trang trông hoàn chỉnh. Bạn còn khoảng mười lăm phút.",
            "choices": [
              {
                "label": "Gửi luôn, trang đẹp thế này chắc ổn",
                "next": "bad_send"
              },
              {
                "label": "Mở bảng thông tin thật, đọc to từng dòng của trang",
                "next": "s2"
              }
            ]
          },
          "bad_send": {
            "text": "Sáng hôm sau ba khách gọi vào số mẫu, một người gọi nhầm cho người lạ. Bạn phải xin lỗi và gửi lại link, nhưng nhiều người đã lưu link cũ.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bạn tìm ra hai chỗ: giờ mở cửa AI điền sai và một dòng Lorem ở phần dịch vụ. Còn mười phút.",
            "choices": [
              {
                "label": "Sửa hai chỗ, rồi đọc lại toàn trang một lần nữa",
                "next": "good"
              },
              {
                "label": "Nhờ AI sửa cả trang cho nhanh rồi gửi ngay",
                "next": "bad_ai"
              }
            ]
          },
          "bad_ai": {
            "text": "AI sửa hai chỗ nhưng tiện tay đổi luôn số gọi sang một số khác nghe hợp lý. Bạn không đọc lại nên gửi link đi, và số sai lại xuất hiện.",
            "ending": "bad"
          },
          "good": {
            "text": "Bạn thay giờ và xoá dòng Lorem, đọc lại thấy khớp bảng. Sáng mai khách gọi đúng số, đến đúng giờ.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Trang đẹp chưa phải trang đúng; bạn đọc từng dòng trước khách.",
          "Bài sau: nhờ một người xem thử và ghi lại họ vấp ở đâu."
        ]
      }
    ]
  },
  {
    "id": 2536,
    "slug": "nho-nguoi-khac-xem-va-ghi-lai-ho-vap-o-dau",
    "title": "Chặng 56, Bài 17: Nhờ một người xem thử và im lặng ghi lại họ vấp ở đâu",
    "subtitle": "Bạn đã đọc trang quá nhiều lần để còn thấy lỗi; một người lạ mắt thấy trong vài giây.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "👀",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Người làm trang không còn nhìn ra chỗ khó vì họ biết mọi thứ nằm đâu. Một người xem thử cho bạn dữ liệu thật về chỗ khách sẽ vấp, và tốn của bạn chưa tới mười phút.",
    "openingQuestion": "Bạn đưa trang cho cô hàng xóm và nhờ: \"Cô tìm giờ mở cửa giúp cháu.\" Cô mất gần một phút, lướt lên xuống vài lần. Bạn nên làm gì tiếp?",
    "openingOptions": [
      "Ghi lại chỗ cô dừng lâu rồi sửa để giờ mở cửa dễ tìm hơn",
      "Giải thích nhanh cho cô biết giờ mở cửa nằm ở chỗ nào",
      "Kết luận cô lớn tuổi nên không đại diện cho khách của mình",
      "Bỏ qua, vì một người thử chậm không nói lên điều gì cả"
    ],
    "correctOption": 0,
    "explanation": "Điều đáng giá là cô vấp ở đâu: cô dừng ở phần nào, bấm nhầm gì, nhìn chỗ nào mà không thấy. Chỉ cho cô ngay thì bạn mất dữ liệu đó và cô cũng không còn là người lạ. Gạt đi vì tuổi là đoán bừa về khách của mình. Một người chậm chính là tín hiệu mà một người nhanh có thể che mất. Ghi lại rồi sửa là vòng lặp đúng.",
    "diagram": [
      {
        "label": "Giao một việc cụ thể, ví dụ tìm giờ mở cửa",
        "arrow": true
      },
      {
        "label": "Im lặng nhìn, đếm giây, ghi chỗ họ vấp",
        "arrow": true
      },
      {
        "label": "Sửa đúng chỗ đó, không sửa lung tung",
        "arrow": true
      },
      {
        "label": "Nhờ một người khác thử lại và so số giây"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Một thợ làm móng tự dựng trang đặt lịch. Em gái thử trong ba giây, còn một khách quen mất gần bốn mươi giây vì nút đặt lịch chìm dưới ảnh. Cô đẩy nút lên đầu trang, nhờ khách thứ ba thử và thấy còn khoảng mười giây. Số giây giảm cho thấy sửa đúng chỗ."
    },
    "quiz": [
      {
        "question": "Khi người thử đang lúng túng, bạn nên làm gì?",
        "options": [
          "Im lặng và ghi lại chỗ họ vấp",
          "Gợi ý ngay chỗ cần bấm để họ khỏi bực",
          "Hỏi họ đã thấy trang đẹp chưa để giữ không khí",
          "Đưa điện thoại của bạn để họ thử trên máy khác"
        ],
        "correct": 0,
        "explanation": "Sự lúng túng chính là dữ liệu. Gợi ý ngay làm bạn mất phép thử vì khách thật sẽ không có bạn ngồi cạnh. Hỏi về độ đẹp là hỏi ý kiến chứ không đo việc làm được. Đổi máy làm sai điều kiện thử."
      },
      {
        "question": "Việc nào là giao việc tốt cho người xem thử?",
        "options": [
          "Tìm giờ mở cửa và bấm nút gọi trên trang",
          "Xem trang rồi cho biết bạn thấy thế nào",
          "Đọc hết trang và nói chỗ nào bạn thích nhất",
          "Kiểm tra trang có đẹp hơn trang của đối thủ không"
        ],
        "correct": 0,
        "explanation": "Một việc cụ thể đo được: có làm xong không, mất bao nhiêu giây. \"Thấy thế nào\" và \"thích chỗ nào\" chỉ thu về ý kiến, còn so với đối thủ người thử thường chưa thấy trang kia."
      },
      {
        "question": "Lần thử đầu mất 60 giây. Bạn sửa 3 lần, mỗi lần giảm khoảng 20% số giây hiện tại. Còn khoảng bao nhiêu giây?",
        "options": [
          "Khoảng 31 giây (60 × 0,8 × 0,8 × 0,8)",
          "Khoảng 24 giây (60 - 3 × 12, trừ thẳng từng lần)",
          "Khoảng 0 giây (60 × 20% × 3 = 36, rồi trừ hết)",
          "Khoảng 18 giây (60 × 0,3, cộng dồn 3 × 20% = 60%)"
        ],
        "correct": 0,
        "explanation": "Mỗi lần giảm 20% của số giây đang có, nên nhân 0,8 ba lần: 60 × 0,512 ≈ 31. Trừ thẳng 12 mỗi lần sai vì 20% tính trên số đang có, không phải số ban đầu. Cộng dồn 60% rồi lấy 40% còn lại của 60 cũng sai vì mỗi lần giảm tính trên kết quả mới."
      },
      {
        "question": "Vì sao nên nhờ người chưa từng thấy trang thử?",
        "options": [
          "Họ không biết sẵn thứ gì nằm ở đâu nên vấp đúng như khách",
          "Họ thường khen nhiều hơn nên bạn thêm tự tin",
          "Họ làm nhanh hơn nên tiết kiệm thời gian của bạn",
          "Họ không có ý kiến riêng nên chỉ làm theo bạn"
        ],
        "correct": 0,
        "explanation": "Người mới không có kiến thức trong đầu bạn, nên chỗ họ vấp là chỗ khách cũng vấp. Khen nhiều không phải lợi ích. Tốc độ không phải điểm chính, và người chưa thấy trang không phải là người không có ý kiến."
      },
      {
        "question": "Sau khi sửa, cách nào kiểm xem sửa có hiệu quả?",
        "options": [
          "Nhờ một người khác thử cùng việc và so số giây",
          "Tự thử lại thấy dễ hơn là đủ kết luận",
          "Hỏi lại cùng người thử đó xem còn nhớ vị trí không",
          "Đợi vài tuần xem có khách phàn nàn thêm không"
        ],
        "correct": 0,
        "explanation": "Người mới thử cùng việc cho số giây so sánh được. Bạn tự thử không đo được vì bạn biết sẵn đáp án. Người cũ đã nhớ vị trí. Đợi phàn nàn thì quá chậm và nhiều khách chỉ bỏ đi chứ không nói."
      }
    ],
    "keyTakeaways": [
      "Giao một việc cụ thể đo được, không hỏi \"thấy thế nào\".",
      "Im lặng, đếm giây, ghi chỗ họ vấp.",
      "Mỗi người thử chỉ có một lần đầu; đừng chỉ chỗ cho họ.",
      "Sửa đúng chỗ vấp rồi nhờ người khác thử lại.",
      "Số giây giảm là bằng chứng sửa có tác dụng."
    ],
    "practicePrompt": {
      "question": "Bạn có 3 người để thử nhưng chỉ sửa được một chỗ mỗi tuần. Cách dùng người thử nào hợp lý?",
      "options": [
        "Mỗi lần sửa dùng một người mới, cùng một việc",
        "Dùng cả ba người mỗi lần để chắc hơn",
        "Dùng mãi một người vì họ đã hiểu trang",
        "Bỏ qua người thử và tự đánh giá vì mình hiểu trang hơn"
      ],
      "correct": 0,
      "explanation": "Người mới mỗi lần giữ được điều kiện lần đầu nhìn trang, cùng việc thì so số giây được. Dùng cả ba mỗi lần khiến họ quen trang. Một người lặp lại thì chỉ đo trí nhớ. Tự đánh giá thì mất phép thử."
    },
    "summary": {
      "keyIdea": "Bạn không thấy chỗ khó của trang mình; một người mới thì thấy.",
      "formula": "Một việc cụ thể + im lặng + đếm giây + ghi chỗ vấp = dữ liệu để sửa.",
      "commonMistake": "Chỉ chỗ cần bấm cho người thử, làm mất điều bạn cần biết.",
      "action": "Chọn một người chưa từng thấy trang và giao việc tìm giờ mở cửa."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Nhờ một người quen chưa thấy trang: \"Tìm giúp mình giờ mở cửa\". Bấm đồng hồ, không nói gì thêm. Ghi số giây và ba chỗ họ dừng hoặc bấm nhầm. Sửa đúng chỗ đó trên trang của bạn.",
      "secondary": "Mai bạn sẽ được hỏi: mất bao nhiêu giây và chỗ vấp đầu tiên là gì?"
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bạn đã đọc trang của mình hàng chục lần nên không còn thấy chỗ khó. Bài này dạy cách mượn đôi mắt của một người mới mà không cần công cụ nào."
      },
      {
        "type": "feynman",
        "title": "Người xem thử đơn giản hơn bạn nghĩ",
        "intro": "Hình dung chủ quán vừa bày biển chỉ đường vào quán. Ông đi qua hằng ngày nên thấy biển rất rõ. Muốn biết biển có dễ thấy không, ông đứng ở ngã tư, nhìn một người lạ có ngẩng lên đúng biển hay không.",
        "columns": [
          "Điều cần biết",
          "Biển chỉ đường quán",
          "Trang web của bạn"
        ],
        "rows": [
          [
            "Người xem chuẩn",
            "Người lạ đi ngang",
            "Người chưa từng thấy trang"
          ],
          [
            "Việc giao",
            "Tìm lối vào quán",
            "Tìm giờ mở cửa hoặc nút gọi"
          ],
          [
            "Điều đo",
            "Họ ngẩng lên sau bao lâu",
            "Mất bao nhiêu giây, vấp ở đâu"
          ],
          [
            "Sai lầm hay gặp",
            "Chủ quán chỉ tay vào biển",
            "Bạn chỉ chỗ cần bấm cho họ"
          ]
        ],
        "oneLiner": "Muốn biết trang có dễ dùng không, nhìn một người mới dùng nó, đừng tự nhìn."
      },
      {
        "type": "heading",
        "text": "Giao đúng một việc, rồi im lặng"
      },
      {
        "type": "paragraph",
        "text": "Đưa trang cho một người quen chưa từng thấy và nói: \"Tìm giúp mình giờ mở cửa.\" Chỉ một câu, không nói thêm. Nếu họ hỏi \"bấm đâu?\", bạn trả lời \"cứ làm như bạn nghĩ\". Trong lúc họ làm, bạn ghi ba thứ: số giây, chỗ họ dừng lâu, chỗ họ bấm nhầm."
      },
      {
        "type": "paragraph",
        "text": "Mẹo là không biện hộ. Khi họ nói \"chỗ này khó tìm\", bạn ghi lại thay vì giải thích. Mỗi lời giải thích của bạn là một lần bạn tự che mất thông tin cần thiết."
      },
      {
        "type": "chart",
        "title": "Số giây tìm ra thông tin giảm theo số lần sửa",
        "caption": "Số liệu minh hoạ, không phải đo thật. Giả định mỗi lần sửa đúng chỗ vấp làm số giây giảm theo một tỷ lệ cố định và không xuống dưới 5 giây. Kéo hai thanh trượt cho khớp với trang của bạn.",
        "kind": "line",
        "xLabel": "Số lần sửa",
        "yLabel": "Giây để tìm ra giờ mở cửa",
        "x": {
          "from": 0,
          "to": 6,
          "step": 1
        },
        "params": [
          {
            "id": "start",
            "label": "Giây ở lần thử đầu",
            "min": 10,
            "max": 120,
            "step": 5,
            "value": 60,
            "unit": "giây"
          },
          {
            "id": "cut",
            "label": "Mỗi lần sửa giảm",
            "min": 5,
            "max": 40,
            "step": 5,
            "value": 20,
            "unit": "%"
          }
        ],
        "series": [
          {
            "label": "Giây cần để tìm",
            "expr": "max(start * (1 - cut / 100) ^ x, 5)"
          }
        ]
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Chọn người chưa từng thấy trang, không phải người đã giúp bạn dựng.",
          "Bước 2 - Giao một việc cụ thể đo được, như tìm giờ mở cửa.",
          "Bước 3 - Im lặng, bấm đồng hồ, ghi chỗ họ dừng và bấm nhầm.",
          "Bước 4 - Sửa đúng chỗ vấp, rồi nhờ người khác thử lại cùng việc."
        ]
      },
      {
        "type": "flow",
        "title": "Một vòng thử và sửa",
        "steps": [
          {
            "label": "Giao việc",
            "detail": "Nói đúng một câu, nêu việc chứ không nêu cách làm, để người thử tự tìm."
          },
          {
            "label": "Im lặng quan sát",
            "detail": "Bạn nhìn họ làm và ghi, không chỉ trỏ. Mọi gợi ý làm sai điều kiện của khách thật."
          },
          {
            "label": "Sửa đúng chỗ vấp",
            "detail": "Chỉ sửa chỗ họ vấp. Sửa tất cả những gì bạn thích sẽ khiến bạn không biết thay đổi nào có tác dụng."
          },
          {
            "label": "Thử lại với người mới",
            "detail": "Cùng một việc, một người khác. So số giây để biết sửa có tác dụng hay không."
          }
        ]
      },
      {
        "type": "callout",
        "label": "Một người thử không phải thống kê",
        "text": "Một hai người không nói được khách đông đảo sẽ làm gì. Nhưng một người vấp ở đâu cho bạn manh mối rất cụ thể để sửa, và nếu hai người vấp cùng chỗ thì gần như chắc chỗ đó có vấn đề."
      },
      {
        "type": "scenario",
        "title": "Buổi thử đầu tiên với chị hàng xóm",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Chị hàng xóm cầm điện thoại xem trang của bạn. Bạn nói: \"Chị tìm giúp em giờ mở cửa.\" Chị cuộn lên xuống, dừng ở ảnh, rồi nói \"ủa đâu rồi ta\".",
            "choices": [
              {
                "label": "Chỉ ngay: \"Ở cuối trang đó chị\"",
                "next": "bad_hint"
              },
              {
                "label": "Im lặng, ghi chị dừng ở ảnh và mất bao lâu",
                "next": "s2"
              }
            ]
          },
          "bad_hint": {
            "text": "Chị bấm đúng ngay và khen trang dễ dùng. Bạn không biết giờ mở cửa khó tìm, và khách thật sẽ không có bạn ngồi cạnh.",
            "ending": "bad"
          },
          "s2": {
            "text": "Chị mất 50 giây, phần lớn thời gian dừng ở ảnh lớn đầu trang vì giờ mở cửa nằm tít cuối. Bạn đã có dữ liệu.",
            "choices": [
              {
                "label": "Đưa giờ mở cửa lên gần đầu trang, nhờ người khác thử lại",
                "next": "good"
              },
              {
                "label": "Đổi luôn màu, phông chữ và ảnh vì chị nói chưa đẹp",
                "next": "bad_many"
              }
            ]
          },
          "bad_many": {
            "text": "Bạn sửa mọi thứ cùng lúc. Người thử kế tiếp vẫn mất nhiều giây và bạn không biết thay đổi nào giúp hay làm hại.",
            "ending": "bad"
          },
          "good": {
            "text": "Người thử thứ hai mất 12 giây. Bạn biết chính thay đổi về vị trí giờ mở cửa đã giúp.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Nhìn một người mới dùng trang, đừng tự nhìn.",
          "Bài sau: trước khi cho người lạ thấy, rà thông tin cá nhân và quyền dùng ảnh."
        ]
      }
    ]
  },
  {
    "id": 2537,
    "slug": "dua-trang-len-mang-can-nhac-gi-truoc",
    "title": "Chặng 56, Bài 18: Trước khi cho người lạ thấy trang: rà thông tin cá nhân và quyền dùng ảnh",
    "subtitle": "Trang trong máy bạn an toàn; trang mà người lạ mở được thì mọi dòng đều có thể bị đọc, chép, lưu lại.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "🛡️",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Khi link rời khỏi máy bạn, địa chỉ nhà, số điện thoại riêng hay ảnh của người chưa đồng ý đều có thể bị người lạ thấy và lưu lại. Sửa lại trang sau đó không thu hồi được những gì đã bị chụp màn hình.",
    "openingQuestion": "Trang tiệm làm tại nhà của bạn có địa chỉ nhà đầy đủ, số điện thoại riêng và ảnh chụp chung với hàng xóm. Trước khi đưa link cho người lạ, việc đầu tiên nên làm là gì?",
    "openingOptions": [
      "Quyết định từng thông tin cần hiện hay bỏ, rồi xin phép người có mặt trong ảnh",
      "Đưa link trước, nếu ai phàn nàn thì gỡ thông tin sau cũng kịp",
      "Nhờ AI tự quyết định thông tin nào nên ẩn cho an toàn",
      "Đổi màu chữ thông tin cá nhân sang nhạt để người lạ ít để ý"
    ],
    "correctOption": 0,
    "explanation": "Bạn là người biết thông tin nào là của riêng mình và ai xuất hiện trong ảnh, nên bạn là người quyết. Gỡ sau thì người lạ đã kịp chụp màn hình hay lưu ảnh. AI không biết hàng xóm có đồng ý hay không, và không biết số điện thoại nào là số riêng. Chữ nhạt vẫn đọc được và vẫn bị sao chép. Rà trước khi chia sẻ là bước duy nhất chặn được việc lộ.",
    "diagram": [
      {
        "label": "Liệt kê mọi thông tin và ảnh đang có trên trang",
        "arrow": true
      },
      {
        "label": "Đánh dấu cái nào là cá nhân hoặc của người khác",
        "arrow": true
      },
      {
        "label": "Bỏ, thay bằng thông tin kinh doanh, hoặc xin phép",
        "arrow": true
      },
      {
        "label": "Đọc hướng dẫn chính thức của nơi đăng trang để biết cách bật, tắt hiển thị"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Một người bán bánh tại nhà đăng địa chỉ nhà và số điện thoại cá nhân lên trang để khách đến lấy. Sau vài tuần có người lạ gọi vào giờ khuya và một người đến gõ cửa ngoài giờ bán. Chị đổi sang số riêng cho việc bán hàng và chỉ ghi khu vực, hẹn giờ nhận bánh qua tin nhắn."
    },
    "quiz": [
      {
        "question": "Thông tin nào nên cân nhắc kỹ nhất trước khi đưa lên trang mà người lạ mở được?",
        "options": [
          "Địa chỉ nhà và số điện thoại dùng cho việc riêng",
          "Tên tiệm và các món đang bán",
          "Giờ mở cửa và khu vực giao hàng",
          "Mô tả ngắn về câu chuyện làm bánh của bạn"
        ],
        "correct": 0,
        "explanation": "Địa chỉ nhà và số riêng liên quan trực tiếp đến an toàn và sự yên tĩnh của bạn, và không xoá được khi đã bị sao chép. Tên tiệm, món bán, giờ và khu vực là thông tin kinh doanh bạn muốn khách thấy."
      },
      {
        "question": "Ảnh chụp chung với bạn bè có thể đăng lên trang khi nào?",
        "options": [
          "Khi người trong ảnh đã đồng ý cho đăng",
          "Khi ảnh do chính bạn cầm máy chụp",
          "Khi ảnh đẹp và làm trang thêm sinh động",
          "Khi bạn đã che màu đi một phần khuôn mặt"
        ],
        "correct": 0,
        "explanation": "Người trong ảnh có quyền với hình ảnh của mình, nên cần họ đồng ý. Bạn cầm máy chụp không làm mất quyền đó. Đẹp không phải lý do. Che một phần mặt vẫn có thể nhận ra."
      },
      {
        "question": "Bạn dùng một tấm ảnh lấy từ mạng để làm ảnh đầu trang. Điều cần nhớ là gì?",
        "options": [
          "Ảnh có thể thuộc về người khác; cần biết nguồn và quyền dùng",
          "Ảnh nào tải được thì cũng dùng được cho trang của mình",
          "Ảnh đã nhỏ thì không ai quan tâm đến quyền sử dụng",
          "Ảnh không có tên người chụp thì coi như không có chủ"
        ],
        "correct": 0,
        "explanation": "Ảnh có chủ dù không ghi tên. Tải được không có nghĩa là được dùng. Kích thước nhỏ không làm mất quyền tác giả. Không ghi tên chỉ là thiếu thông tin. Hãy dùng ảnh của bạn hoặc ảnh có quyền sử dụng rõ ràng, và hỏi chuyên gia khi chưa chắc."
      },
      {
        "question": "Cách đúng để biết nơi đăng trang cho bật, tắt hiển thị công khai ra sao?",
        "options": [
          "Đọc hướng dẫn chính thức của nơi đăng trang",
          "Đoán theo giao diện của một dịch vụ khác đã dùng",
          "Nhờ AI kể lại các bước dù chưa đọc nơi đó",
          "Hỏi nhóm bạn bè vì họ đã từng đăng vài trang"
        ],
        "correct": 0,
        "explanation": "Giao diện và tuỳ chọn mỗi nơi đăng khác nhau và đổi theo thời gian. Hướng dẫn chính thức là nguồn đúng. Đoán theo dịch vụ khác hay nhờ AI kể có thể chỉ cách sai, còn bạn bè nhớ theo phiên bản cũ."
      },
      {
        "question": "Sau khi bỏ địa chỉ nhà khỏi trang, bạn vẫn cần làm gì?",
        "options": [
          "Kiểm lại toàn trang, vì địa chỉ có thể còn ở phần khác",
          "Coi như xong vì đã xoá chỗ đầu tiên thấy địa chỉ",
          "Chỉ kiểm phần liên hệ, các phần khác không chứa địa chỉ",
          "Nhờ AI xoá hết mà không cần bạn đọc lại"
        ],
        "correct": 0,
        "explanation": "Địa chỉ hay lặp ở cuối trang, trong chú thích ảnh hay phần bản đồ. Xoá một chỗ chưa đủ. Chỉ kiểm phần liên hệ bỏ sót các chỗ khác, và AI có thể xoá thiếu hoặc thay bằng địa chỉ giả nghe hợp lý."
      }
    ],
    "keyTakeaways": [
      "Link ra ngoài là ai cũng xem, sao chép và lưu lại được.",
      "Địa chỉ nhà, số riêng, ảnh người khác cần quyết định trước khi chia sẻ.",
      "Ảnh tải được không có nghĩa là được dùng.",
      "Cách bật, tắt hiển thị: đọc hướng dẫn chính thức của nơi đăng trang.",
      "Kiểm lại toàn trang sau khi bỏ một thông tin."
    ],
    "practicePrompt": {
      "question": "Bạn cần cho khách biết vị trí tiệm làm tại nhà nhưng không muốn lộ địa chỉ đầy đủ. Cách nào hợp lý?",
      "options": [
        "Ghi khu vực chung và hẹn điểm nhận hàng qua tin nhắn",
        "Ghi đầy đủ số nhà vì khách cần tìm cho dễ",
        "Bỏ hết thông tin vị trí và để khách tự hỏi bạn bè để biết đường",
        "Ghi địa chỉ của người quen thay cho địa chỉ nhà"
      ],
      "correct": 0,
      "explanation": "Khu vực chung đủ để khách biết có gần hay không, còn điểm nhận cụ thể gửi riêng cho người thật sự đặt hàng. Ghi đầy đủ là lộ. Bỏ hết làm khách không biết có tới được không. Dùng địa chỉ người khác đẩy rủi ro sang họ khi chưa hỏi."
    },
    "summary": {
      "keyIdea": "Rời khỏi máy bạn, trang là của mọi người mở link.",
      "formula": "Mỗi thông tin cá nhân hoặc ảnh người khác = quyết hiện, bỏ hay xin phép trước khi chia sẻ.",
      "commonMistake": "Cho rằng gỡ sau cũng kịp.",
      "action": "Liệt kê mọi thông tin cá nhân và ảnh trên trang, đánh dấu từng mục hiện, bỏ hay chưa xin phép."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Mở trang của bạn và lập bảng ba cột: mục, loại (địa chỉ, số điện thoại, ảnh người khác), quyết định (giữ, bỏ, xin phép). Điền hết mọi mục trên trang, gồm cả chú thích ảnh và phần cuối trang. Sửa những mục quyết định bỏ.",
      "secondary": "Mai bạn sẽ được hỏi: có mấy mục bạn quyết định bỏ hoặc phải xin phép?"
    },
    "sections": [
      {
        "type": "lead",
        "text": "Dựng xong và thử xong, bạn sắp đưa link cho người lạ. Bài này là lần rà cuối trước khi thông tin cá nhân hay ảnh của người khác ra khỏi tầm kiểm soát."
      },
      {
        "type": "feynman",
        "title": "Đưa trang ra ngoài đơn giản hơn bạn nghĩ",
        "intro": "Hình dung bạn treo tấm bảng lên cổng nhà. Nếu trên đó ghi tên, số nhà và ảnh cả gia đình, ai đi ngang cũng đọc và chụp được. Bạn không chọn người xem nữa.",
        "columns": [
          "Điều cần biết",
          "Bảng treo cổng nhà",
          "Trang web công khai"
        ],
        "rows": [
          [
            "Ai xem được",
            "Ai đi ngang",
            "Ai có link"
          ],
          [
            "Điều nên ghi",
            "Tên tiệm, giờ bán, cách liên hệ",
            "Thông tin kinh doanh bạn chủ động đưa"
          ],
          [
            "Điều nên cân nhắc",
            "Số nhà, ảnh người thân",
            "Địa chỉ nhà, số riêng, ảnh người khác"
          ],
          [
            "Gỡ xuống",
            "Người đã chụp thì đã có bản sao",
            "Người đã chụp màn hình thì đã có bản sao"
          ]
        ],
        "oneLiner": "Đưa trang ra ngoài là treo bảng ở cổng: chỉ ghi điều bạn sẵn sàng cho mọi người thấy."
      },
      {
        "type": "heading",
        "text": "Ba thứ cần rà trước khi chia sẻ"
      },
      {
        "type": "paragraph",
        "text": "Thứ nhất, thông tin liên hệ: bạn dùng số điện thoại nào cho việc bán hàng, và địa chỉ nào có thể công khai. Thứ hai, ảnh: ai có mặt trong ảnh và họ đã đồng ý chưa. Thứ ba, nguồn ảnh và chữ: phần nào do bạn làm, phần nào lấy từ nơi khác."
      },
      {
        "type": "paragraph",
        "text": "AI không trả lời được cả ba câu. Nó không biết số nào là số riêng, không biết người trong ảnh có đồng ý không. Những câu này chỉ bạn biết, nên chỉ bạn rà được."
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Liệt kê mọi thông tin cá nhân và ảnh trên trang, gồm cả chú thích và cuối trang.",
          "Bước 2 - Mỗi mục quyết định: giữ, bỏ, hoặc xin phép người liên quan.",
          "Bước 3 - Đọc hướng dẫn chính thức của nơi đăng trang để biết cách bật, tắt hiển thị; không đoán theo dịch vụ khác.",
          "Bước 4 - Kiểm lại toàn trang sau khi sửa; một thông tin hay xuất hiện ở nhiều chỗ."
        ]
      },
      {
        "type": "flow",
        "title": "Từ trang nháp đến trang sẵn sàng cho người lạ",
        "steps": [
          {
            "label": "Liệt kê mọi thông tin",
            "detail": "Địa chỉ, số điện thoại, tên người, ảnh, cả chú thích ảnh và phần cuối trang."
          },
          {
            "label": "Quyết định từng mục",
            "detail": "Mỗi mục: giữ vì là thông tin kinh doanh, bỏ vì là riêng tư, hay xin phép vì là của người khác."
          },
          {
            "label": "Sửa rồi kiểm lại toàn trang",
            "detail": "Một thông tin hay lặp ở nhiều chỗ. Xoá một chỗ chưa đủ, nên đọc lại cả trang."
          },
          {
            "label": "Đọc hướng dẫn nơi đăng trang",
            "detail": "Cách bật hay tắt hiển thị công khai khác nhau theo từng nơi, nên chỉ hướng dẫn chính thức của nơi đó mới đáng tin."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Rà bản nháp phần liên hệ và giới thiệu",
        "task": "Bạn đang soát trang tiệm làm tại nhà trước khi gửi link cho người lạ. Bảng thật: số bán hàng riêng là số tiệm, địa chỉ nhà không được công khai, ảnh gia đình chưa xin phép ai. Đánh dấu những đoạn không nên đưa lên.",
        "segments": [
          {
            "text": "Tiệm làm bánh tại nhà, nhận đơn qua tin nhắn."
          },
          {
            "text": "Địa chỉ: số 12 ngõ 5, nhà màu xanh cạnh cột điện.",
            "error": "Địa chỉ nhà đầy đủ, không nên công khai."
          },
          {
            "text": "Giao hàng trong khu vực Quận 3 và Quận 10."
          },
          {
            "text": "Gọi chị Lan (số cá nhân dùng chung với gia đình) để đặt bánh.",
            "error": "Số dùng cho việc riêng, nên dùng số riêng cho bán hàng."
          },
          {
            "text": "Ảnh: gia đình chị hàng xóm ăn bánh trong bữa tiệc.",
            "error": "Ảnh người khác chưa xin phép."
          },
          {
            "text": "Giờ nhận đơn: 7:00 - 19:00 mỗi ngày."
          }
        ]
      },
      {
        "type": "callout",
        "label": "Gỡ xuống không thu hồi được",
        "text": "Khi người lạ đã mở trang, họ có thể chụp màn hình hay lưu ảnh. Sửa trang sau đó không xoá những bản đã có. Vì vậy rà trước khi gửi link, không phải sau khi có người phàn nàn."
      },
      {
        "type": "scenario",
        "title": "Khách hỏi xin số điện thoại riêng",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Sắp gửi link, bạn nhận ra trang đang ghi số điện thoại dùng chung với gia đình. Khách có thể gọi vào giờ khuya.",
            "choices": [
              {
                "label": "Để nguyên, khách ít khi gọi khuya",
                "next": "bad_keep"
              },
              {
                "label": "Dùng một số riêng cho bán hàng, ghi giờ nhận đơn trên trang",
                "next": "s2"
              }
            ]
          },
          "bad_keep": {
            "text": "Vài tuần sau, có người lạ gọi lúc 23 giờ để hỏi về đơn. Cả nhà bị đánh thức và bạn phải đổi số, làm mất khách quen.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bạn còn một việc: ảnh bữa tiệc có hàng xóm nhưng chưa ai đồng ý.",
            "choices": [
              {
                "label": "Hỏi họ trước; nếu chưa đồng ý thì thay bằng ảnh bánh",
                "next": "good"
              },
              {
                "label": "Đăng luôn vì ảnh do bạn chụp",
                "next": "bad_photo"
              }
            ]
          },
          "bad_photo": {
            "text": "Người hàng xóm thấy mình trên trang bán hàng mà chưa ai hỏi. Họ khó chịu và quan hệ trở nên căng thẳng.",
            "ending": "bad"
          },
          "good": {
            "text": "Bạn thay bằng ảnh bánh do bạn chụp, số bán hàng riêng hiển thị đúng. Link ra ngoài mà bạn không phải lo.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Trang ra ngoài là ai cũng thấy; hỏi trước khi đăng.",
          "Bài sau: khi giá hoặc giờ mở cửa đổi, cập nhật trang thế nào."
        ]
      }
    ]
  },
  {
    "id": 2538,
    "slug": "cap-nhat-trang-khi-gia-hoac-gio-doi",
    "title": "Chặng 56, Bài 19: Cập nhật trang khi giá hoặc giờ mở cửa đổi",
    "subtitle": "Trang đúng hôm nay sẽ sai vào tháng sau nếu không ai biết mình có trách nhiệm sửa nó.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "🔄",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Trang cũ nói sai giá hoặc giờ còn tệ hơn không có trang, vì khách tin và đến đúng lúc tiệm đóng cửa. Một quy trình nhỏ gồm ai sửa, sửa ở đâu, kiểm lại cách nào biến việc cập nhật thành thói quen thay vì việc nhớ hoặc quên.",
    "openingQuestion": "Tiệm vừa tăng giá một món và đổi giờ đóng cửa sớm hơn một tiếng. Bạn nhờ AI sửa trang. Điều gì nên có trong yêu cầu gửi cho nó?",
    "openingOptions": [
      "Đoạn chữ cần sửa, giá và giờ mới, yêu cầu giữ nguyên phần khác",
      "Chỉ câu \"cập nhật giá và giờ mới nhất cho trang giúp mình\"",
      "Toàn bộ trang cùng lời nhờ AI tự tìm chỗ nào cần đổi",
      "Link trang cùng lời nhắn rằng bạn tin AI sẽ tự biết giá mới nhất"
    ],
    "correctOption": 0,
    "explanation": "AI không biết giá hay giờ mới của bạn, nên bạn phải đưa số liệu cụ thể và đoạn cần sửa. Nói chung chung \"mới nhất\" thì nó tự bịa số. Nhờ nó tự tìm chỗ cần đổi dễ khiến nó sửa thừa hoặc bỏ sót. Đưa link rồi tin AI tự biết là giao việc mà không đưa dữ kiện. Giữ nguyên phần khác để chỉ dòng cần sửa thay đổi.",
    "diagram": [
      {
        "label": "Giá hoặc giờ đổi ngoài đời",
        "arrow": true
      },
      {
        "label": "Người được giao sửa trang theo bảng thông tin thật",
        "arrow": true
      },
      {
        "label": "Kiểm lại: đọc dòng vừa sửa và các chỗ lặp lại",
        "arrow": true
      },
      {
        "label": "Ghi ngày sửa và nguồn để lần sau biết"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Một quán cà phê đổi giờ đóng cửa dịp lễ nhưng không ai sửa trang. Khách đến đúng giờ cũ và thấy cửa đóng. Sau đó quán giao cho một người phụ trách và dán tờ nhắc cạnh quầy: đổi giờ thì sửa trang cùng ngày, ghi ngày sửa, nhờ người thứ hai đọc lại."
    },
    "quiz": [
      {
        "question": "Khi giá một món đổi, việc đầu tiên trong quy trình cập nhật trang là gì?",
        "options": [
          "Sửa bảng thông tin thật trước, rồi mới sửa trang theo bảng",
          "Nhờ AI sửa trang trước rồi mới chỉnh bảng thông tin cho khớp sau",
          "Sửa trang ở một chỗ, các chỗ còn lại để tự đồng bộ",
          "Đợi khách hỏi rồi mới biết chỗ nào cần đổi"
        ],
        "correct": 0,
        "explanation": "Bảng thông tin thật là nguồn duy nhất để trang đối chiếu. Sửa trang mà không sửa bảng khiến hai nơi lệch nhau. Trang không tự đồng bộ, và đợi khách hỏi nghĩa là khách đã thấy giá sai."
      },
      {
        "question": "Vì sao nên có một người cụ thể chịu trách nhiệm sửa trang?",
        "options": [
          "Việc của mọi người thì dễ thành việc của không ai",
          "Một người sửa thì chắc chắn không bao giờ sai",
          "Nhiều người sửa thì AI không hiểu được yêu cầu",
          "Một người sửa thì trang tự cập nhật khi giá đổi"
        ],
        "correct": 0,
        "explanation": "Khi ai cũng nghĩ người khác sẽ làm, không ai làm. Một người chịu trách nhiệm vẫn có thể sai nên cần kiểm lại. AI không phụ thuộc số người sửa, và trang không tự cập nhật."
      },
      {
        "question": "Giá 45.000 đồng tăng 10%, rồi tiệm làm tròn xuống bội số 1.000 đồng. Giá mới trên trang là bao nhiêu?",
        "options": [
          "49.000 đồng (45.000 × 1,1 = 49.500, làm tròn xuống)",
          "50.000 đồng (45.000 + 10.000, đã cộng nhầm 10% thành mười nghìn)",
          "4.500 đồng (45.000 × 10%, chỉ lấy phần tăng)",
          "55.000 đồng (45.000 × 1,1 × 1,1, tăng hai lần)"
        ],
        "correct": 0,
        "explanation": "45.000 nhân 1,1 được 49.500, làm tròn xuống bội số 1.000 là 49.000. Cộng 10.000 nhầm 10% thành 10 nghìn. Lấy 45.000 × 10% chỉ được phần tăng là 4.500, chưa cộng vào giá cũ. Nhân 1,1 hai lần là tăng hai lần."
      },
      {
        "question": "Sau khi sửa giá ở phần bảng giá, bước nào còn cần làm?",
        "options": [
          "Đọc các chỗ khác có nhắc giá, như phần ưu đãi và liên hệ",
          "Coi như xong vì đã sửa ở nơi chính",
          "Nhờ AI cam kết các chỗ khác đã khớp",
          "Chỉ kiểm lại trang chủ vì khách thường vào đó trước tiên"
        ],
        "correct": 0,
        "explanation": "Giá thường lặp ở nhiều chỗ như ưu đãi, câu giới thiệu, chú thích ảnh. Sửa một chỗ chưa đủ. AI chỉ cam kết mà không đối chiếu được, còn kiểm chỉ trang chủ bỏ sót các trang khác."
      },
      {
        "question": "Vì sao nên ghi ngày sửa và nguồn mỗi lần cập nhật?",
        "options": [
          "Để lần sau biết thông tin này đã cũ hay còn mới",
          "Để khách thấy trang được sửa nhiều lần nên tin tưởng hơn",
          "Để AI nhớ lần sửa trước và tự sửa lần sau",
          "Để không phải kiểm lại thông tin nữa"
        ],
        "correct": 0,
        "explanation": "Ngày sửa và nguồn cho biết bao lâu rồi chưa rà, và sửa từ đâu. Khách không đọc ghi chú nội bộ. AI không nhớ giữa các cuộc trò chuyện, và có ngày sửa không thay việc kiểm lại."
      }
    ],
    "keyTakeaways": [
      "Giá hay giờ đổi thì sửa bảng thông tin thật trước, rồi sửa trang theo bảng.",
      "Giao một người cụ thể chịu trách nhiệm.",
      "Đưa AI dữ kiện mới và đoạn cần sửa, dặn giữ nguyên phần khác.",
      "Kiểm các chỗ lặp lại: giá hay có mặt ở nhiều nơi.",
      "Ghi ngày sửa và nguồn."
    ],
    "practicePrompt": {
      "question": "Tiệm đổi giờ đóng cửa từ 20:00 xuống 19:00 vào mỗi thứ Sáu. Bạn nhờ AI sửa. Điều nào cần có trong yêu cầu?",
      "options": [
        "Nêu rõ giờ mới, chỉ áp cho thứ Sáu, giữ nguyên các ngày khác",
        "Nói \"đổi giờ đóng cửa sớm hơn\" không cần nêu giờ",
        "Đưa cả trang rồi nhờ AI tự tìm giờ nào cần đổi giúp bạn luôn cho xong",
        "Nhờ AI đổi giờ tất cả các ngày sang 19:00 cho gọn"
      ],
      "correct": 0,
      "explanation": "AI cần giờ cụ thể và phạm vi cụ thể, nếu không nó sẽ tự chọn giờ. Đưa cả trang không rõ yêu cầu dễ làm nó sửa thừa. Đổi tất cả các ngày làm sai các ngày còn lại."
    },
    "summary": {
      "keyIdea": "Trang sống nhờ quy trình: ai sửa, sửa ở đâu, kiểm thế nào.",
      "formula": "Sửa bảng thật → sửa trang → kiểm chỗ lặp → ghi ngày sửa.",
      "commonMistake": "Sửa một chỗ rồi quên các chỗ khác cùng nhắc giá hoặc giờ.",
      "action": "Viết ra quy trình ba dòng và dán gần chỗ bạn làm việc."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Viết quy trình cập nhật trang của bạn: người phụ trách, nơi lưu bảng thông tin thật, bốn bước sửa và kiểm. Thử một lần với một thay đổi giả định: đổi giá một món, ghi ngày sửa. Đưa cho AI đúng dữ kiện và dặn giữ nguyên phần khác.",
      "secondary": "Mai bạn sẽ được hỏi: ai là người phụ trách và bạn ghi ngày sửa ở đâu?"
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bạn đã đưa trang ra ngoài. Thử thách tiếp theo không phải dựng mà là giữ cho nó đúng. Giá đổi, giờ đổi, và trang chỉ có giá trị khi còn khớp với thực tế."
      },
      {
        "type": "feynman",
        "title": "Cập nhật trang đơn giản hơn bạn nghĩ",
        "intro": "Hình dung bảng thực đơn viết phấn ở cửa quán. Hôm nay giá đổi, nếu không ai lau và viết lại thì bảng vẫn báo giá cũ. Quán nào tốt thì có một người cụ thể lo bảng và một tờ ghi giá chuẩn để đối chiếu.",
        "columns": [
          "Điều cần có",
          "Bảng phấn ở quán",
          "Trang web của bạn"
        ],
        "rows": [
          [
            "Nguồn đúng",
            "Tờ ghi giá chuẩn",
            "Bảng thông tin thật"
          ],
          [
            "Người lo",
            "Một nhân viên cụ thể",
            "Một người được giao sửa trang"
          ],
          [
            "Kiểm lại",
            "Đọc lại bảng sau khi viết",
            "Đọc các chỗ có nhắc giá và giờ"
          ],
          [
            "Dấu vết",
            "Ghi ngày viết dưới góc",
            "Ghi ngày sửa và nguồn"
          ]
        ],
        "oneLiner": "Trang cần một người lo và một nguồn chuẩn, giống bảng giá ở quán."
      },
      {
        "type": "heading",
        "text": "Sửa ở đâu, sửa thế nào"
      },
      {
        "type": "paragraph",
        "text": "Gốc của mọi thay đổi là bảng thông tin thật của bạn, vì đó là nơi bạn tin nhất. Khi giá hay giờ đổi, bạn sửa bảng trước, rồi sửa trang theo bảng. Làm ngược lại thì hai nơi lệch nhau và lần sau không biết nơi nào đúng."
      },
      {
        "type": "paragraph",
        "text": "Khi nhờ AI sửa, đưa đúng dữ kiện mới và đoạn cần đổi, rồi dặn giữ nguyên phần khác. AI không biết giá mới, nên nếu bạn chỉ nói \"cập nhật\" nó sẽ tự đoán và trang lại thêm một con số giả."
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Sửa bảng thông tin thật và ghi ngày.",
          "Bước 2 - Đưa AI đoạn cần sửa và dữ kiện mới, dặn giữ nguyên phần khác.",
          "Bước 3 - Đọc lại đoạn đã sửa và mọi chỗ khác có nhắc giá hay giờ.",
          "Bước 4 - Nhờ người thứ hai đọc lại trang trước khi coi là xong."
        ]
      },
      {
        "type": "flow",
        "title": "Quy trình cập nhật ba dòng",
        "steps": [
          {
            "label": "Giá hoặc giờ đổi ngoài đời",
            "detail": "Ngay hôm đó sửa bảng thông tin thật và ghi ngày, đừng đợi cuối tuần."
          },
          {
            "label": "Sửa trang theo bảng",
            "detail": "Đưa AI đúng dữ kiện mới, dặn giữ nguyên phần khác. Đọc kết quả so với bảng."
          },
          {
            "label": "Kiểm chỗ lặp lại",
            "detail": "Giá hay giờ hay có ở ưu đãi, liên hệ, chú thích ảnh. Mở từng chỗ đọc lại."
          },
          {
            "label": "Ghi ngày sửa",
            "detail": "Để lần sau biết thông tin này cũ hay mới, và ai là người đã sửa."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI đổi giờ đóng cửa và giá một món",
        "task": "Tiệm đổi giờ đóng cửa thứ Sáu từ 20:00 xuống 19:00, và bánh kem nhỏ tăng từ 45.000 lên 49.000 đồng. Lắp yêu cầu để AI sửa đúng hai chỗ.",
        "parts": [
          {
            "id": "data",
            "label": "Dữ kiện",
            "options": [
              {
                "text": "Cập nhật giá và giờ mới nhất cho trang.",
                "feedback": "AI không biết giá, giờ mới nên sẽ tự bịa con số."
              },
              {
                "text": "Giờ đóng cửa thứ Sáu: 19:00 (trước là 20:00). Bánh kem nhỏ: 49.000 đồng (trước là 45.000).",
                "good": true,
                "feedback": "Đủ số mới, số cũ và phạm vi, AI chỉ việc thay đúng chỗ."
              }
            ]
          },
          {
            "id": "scope",
            "label": "Phạm vi",
            "options": [
              {
                "text": "Sửa hai chỗ đó và giữ nguyên toàn bộ phần còn lại của trang.",
                "good": true,
                "feedback": "Giới hạn rõ nên AI không đổi thêm câu chữ khác."
              },
              {
                "text": "Chỉnh lại trang cho hợp lý theo thay đổi này.",
                "feedback": "\"Hợp lý\" cho AI quyền sửa thêm, dễ lệch sang phần bạn không muốn đổi."
              }
            ]
          },
          {
            "id": "report",
            "label": "Cách báo lại",
            "options": [
              {
                "text": "Liệt kê mỗi chỗ đã sửa: câu cũ, câu mới, và chỗ nào khác có nhắc giờ hay giá.",
                "good": true,
                "feedback": "Bạn đối chiếu nhanh được và biết còn chỗ lặp nào cần kiểm."
              },
              {
                "text": "Sửa xong báo \"đã xong\" là đủ.",
                "feedback": "Bạn không biết AI đã sửa gì, đổi thêm gì nên phải đọc lại cả trang."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "data",
              "scope",
              "report"
            ],
            "text": "Đã sửa 2 chỗ:\n1) Giờ đóng cửa thứ Sáu: \"20:00\" -> \"19:00\".\n2) Bánh kem nhỏ: \"45.000 đồng\" -> \"49.000 đồng\".\nChỗ khác còn nhắc: phần ưu đãi ghi \"bánh kem từ 45.000 đồng\" - bạn cần kiểm xem có đổi theo không."
          },
          {
            "requires": [
              "data"
            ],
            "text": "Đã cập nhật giờ thứ Sáu và giá bánh kem nhỏ. Ngoài ra tôi chỉnh lại câu giới thiệu cho phù hợp.\n\n(Đúng số, nhưng AI sửa thêm câu giới thiệu khi chưa được yêu cầu và không báo những chỗ còn lặp.)"
          },
          {
            "text": "Đã cập nhật trang theo giờ và giá mới nhất: đóng cửa 18:30 thứ Sáu, bánh kem 52.000 đồng.\n\n(Bạn chưa đưa số cụ thể nên AI tự bịa con số nghe hợp lý.)"
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Hôm đổi giờ dịp lễ",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Sáng nay tiệm thông báo nghỉ sớm vào dịp lễ. Bạn đang bận giao hàng và thấy việc sửa trang có thể để sau.",
            "choices": [
              {
                "label": "Để tuần sau rảnh rồi sửa",
                "next": "bad_late"
              },
              {
                "label": "Sửa bảng thông tin thật ngay, sửa trang theo bảng, ghi ngày",
                "next": "s2"
              }
            ]
          },
          "bad_late": {
            "text": "Hai khách đến tiệm đúng giờ cũ và thấy cửa đã đóng. Một người nhắn rằng trang ghi sai, và họ không quay lại.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bạn sửa xong dòng giờ ở phần liên hệ. Trang còn một chỗ nhắc giờ ở phần ưu đãi.",
            "choices": [
              {
                "label": "Đọc lại các chỗ nhắc giờ, sửa luôn phần ưu đãi, nhờ người thứ hai xem",
                "next": "good"
              },
              {
                "label": "Coi như xong vì đã sửa chỗ chính",
                "next": "bad_miss"
              }
            ]
          },
          "bad_miss": {
            "text": "Phần ưu đãi vẫn ghi giờ cũ. Khách đọc hai chỗ khác nhau và không biết tin chỗ nào, nhiều người chọn không đến.",
            "ending": "bad"
          },
          "good": {
            "text": "Hai chỗ khớp nhau và khớp bảng thông tin thật. Khách đến đúng giờ, bạn ghi ngày sửa để lần sau đối chiếu.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Trang sống được nhờ một quy trình nhỏ và một người chịu trách nhiệm.",
          "Bài sau: tổng kết, trình bày trang đầu tiên trong hai phút."
        ]
      }
    ]
  },
  {
    "id": 2539,
    "slug": "tong-ket-trang-web-dau-tien-cua-ban",
    "title": "Chặng 56, Bài 20: Tổng kết: trang đầu tiên của bạn, từ bản phác đến người xem thật",
    "subtitle": "Hai phút kể lại: trang này phục vụ ai, đã sửa gì, và bước tiếp theo là gì.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "🏁",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Kể lại được chặng đường cho người khác nghe là bằng chứng bạn hiểu điều mình đã làm, không chỉ giao cho AI. Một bản tóm tắt hai phút cũng là thứ bạn cần khi xin ý kiến, nhờ hỗ trợ, hoặc giao trang cho người khác giữ.",
    "openingQuestion": "Bạn được hỏi: \"Trang web đó làm để làm gì?\" Bạn chỉ có hai phút. Cách kể nào cho người nghe hiểu nhất?",
    "openingOptions": [
      "Phục vụ ai, họ cần làm gì, đã sửa những gì và bước tiếp theo",
      "Liệt kê mọi phần của trang theo thứ tự từ trên xuống dưới",
      "Kể lại từng câu lệnh bạn đã gõ cho AI từ bài đầu tiên",
      "Mô tả màu sắc và phông chữ vì đó là thứ người nghe nhìn thấy"
    ],
    "correctOption": 0,
    "explanation": "Người nghe muốn biết trang có ích cho ai và bạn đã làm cho nó tốt hơn ra sao. Liệt kê từng phần thì chỉ tả hình thức. Kể lại từng câu lệnh quá dài và không nói trang phục vụ ai. Màu sắc, phông chữ là chi tiết nhỏ so với mục đích. Kể theo bốn ý khiến hai phút đủ và người nghe nhớ được.",
    "diagram": [
      {
        "label": "Người xem là ai, cần làm gì",
        "arrow": true
      },
      {
        "label": "Trang được dựng thế nào từ bản phác",
        "arrow": true
      },
      {
        "label": "Những vòng sửa: chữ giả, người thử, điện thoại",
        "arrow": true
      },
      {
        "label": "Bước tiếp theo và ai giữ cho trang đúng"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Một chủ tiệm sửa xe làm trang đầu tiên cùng AI. Khi kể cho nhóm bạn nghe, cô chỉ nói: trang cho khách tìm giờ và gọi đặt lịch, sửa ba vòng (số mẫu, nút quá sát, ảnh nặng), người thử mất 10 giây tìm giờ, và bước tiếp theo là giao em trai cập nhật mỗi khi giá đổi."
    },
    "quiz": [
      {
        "question": "Phần đầu của bản tóm tắt hai phút nên nói gì?",
        "options": [
          "Trang phục vụ ai và họ cần làm gì",
          "Tên công cụ AI bạn đã dùng để dựng trang",
          "Số dòng chữ và số ảnh có trên trang",
          "Màu chủ đạo và phông chữ đã chọn cuối cùng"
        ],
        "correct": 0,
        "explanation": "Mục đích và người xem quyết định mọi thứ khác, nên nói trước. Tên công cụ, số dòng hay màu sắc là chi tiết bổ sung, không cho người nghe biết trang để làm gì."
      },
      {
        "question": "Phần \"đã sửa gì\" trong tóm tắt nên trình bày thế nào?",
        "options": [
          "Nêu vài vòng sửa cụ thể và điều mỗi vòng thay đổi",
          "Nói trang đã được sửa nhiều lần cho hoàn thiện",
          "Kể lại mọi lỗi đã gặp theo đúng thứ tự thời gian",
          "Chỉ nói bản cuối cùng mà không nhắc lại các vòng sửa"
        ],
        "correct": 0,
        "explanation": "Ví dụ cụ thể cho người nghe thấy bạn đã kiểm thật: thay số mẫu, chỉnh nút, thu nhỏ ảnh. Nói \"sửa nhiều lần\" là chung chung, kể mọi lỗi thì vượt hai phút. Bỏ các vòng sửa thì mất bằng chứng bạn đã kiểm."
      },
      {
        "question": "Hai phút trình bày, mỗi phần trong bốn phần dùng thời gian bằng nhau. Mỗi phần có bao nhiêu giây?",
        "options": [
          "30 giây (120 ÷ 4)",
          "20 giây (120 ÷ 6, đếm nhầm sáu phần)",
          "40 giây (120 ÷ 3, quên một phần)",
          "60 giây (2 phút × 30, nhầm đơn vị)"
        ],
        "correct": 0,
        "explanation": "Hai phút là 120 giây, chia cho bốn phần là 30 giây mỗi phần. Chia cho sáu hay ba là đếm sai số phần. Nhân 2 với 30 nhầm phút thành giây."
      },
      {
        "question": "Phần \"bước tiếp theo\" nên có gì?",
        "options": [
          "Một việc cụ thể và người phụ trách nó",
          "Một lời hứa sẽ làm cho trang tốt hơn nữa",
          "Một danh sách mười ý tưởng để chọn dần",
          "Một câu cảm ơn các công cụ đã giúp bạn"
        ],
        "correct": 0,
        "explanation": "Bước tiếp theo có giá trị khi có việc cụ thể và tên người lo, như giao em trai sửa giá mỗi khi đổi. Lời hứa chung chung, danh sách dài hay lời cảm ơn không cho biết ai làm gì."
      },
      {
        "question": "Bạn thấy bản tóm tắt vượt hai phút. Nên cắt phần nào trước?",
        "options": [
          "Chi tiết kỹ thuật và thứ tự câu lệnh bạn đã dùng",
          "Phần nói trang phục vụ ai và họ cần làm gì",
          "Phần những chỗ đã sửa và kết quả thử với người xem",
          "Phần bước tiếp theo và ai giữ cho trang đúng"
        ],
        "correct": 0,
        "explanation": "Chi tiết câu lệnh người nghe ít cần nhất. Cắt phần người xem hay kết quả thử thì mất lý do và bằng chứng. Cắt bước tiếp theo thì người nghe không biết trang sống tiếp thế nào."
      }
    ],
    "keyTakeaways": [
      "Kể bốn ý: phục vụ ai, đã sửa gì, kết quả thử, bước tiếp theo.",
      "Nêu ví dụ cụ thể thay vì nói chung chung.",
      "Mỗi phần khoảng 30 giây cho hai phút.",
      "Bước tiếp theo có người phụ trách.",
      "Cắt chi tiết kỹ thuật trước khi cắt mục đích."
    ],
    "practicePrompt": {
      "question": "Bạn nói: \"Em dựng trang, rất đẹp, khách khen nhiều.\" Thiếu gì so với một bản tóm tắt tốt?",
      "options": [
        "Người xem là ai, đã sửa gì, bước tiếp theo",
        "Lời khen cho AI vì AI đã giúp nhiều trong buổi làm",
        "Tên phông chữ và mã màu của trang",
        "Số lượng tệp ảnh đã dùng cho trang"
      ],
      "correct": 0,
      "explanation": "Một bản tóm tắt tốt nói trang phục vụ ai, đã sửa gì qua các vòng và làm gì tiếp. Lời khen, tên phông chữ hay số ảnh không thay thế các ý đó."
    },
    "summary": {
      "keyIdea": "Bạn hiểu trang khi kể lại được nó cho người khác.",
      "formula": "Phục vụ ai + đã sửa gì + kết quả thử + bước tiếp theo = hai phút.",
      "commonMistake": "Liệt kê hình thức thay vì nói mục đích.",
      "action": "Tập kể hai phút cho một người và xem họ hỏi lại chỗ nào."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Viết bốn dòng: trang phục vụ ai và họ cần làm gì; ba chỗ đã sửa; số giây người thử mất để tìm thông tin; bước tiếp theo và ai lo. Đọc to cho một người và bấm giờ để không vượt hai phút.",
      "secondary": "Mai bạn sẽ được hỏi: người nghe hỏi lại chỗ nào, và bạn sẽ sửa bản kể ra sao?"
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bạn đã đi từ một tờ giấy đến một trang người thật dùng được. Bài cuối không dạy thêm kỹ thuật mà dạy kể lại, vì kể được là bằng chứng bạn làm chủ trang của mình."
      },
      {
        "type": "feynman",
        "title": "Bản tóm tắt hai phút đơn giản hơn bạn nghĩ",
        "intro": "Hình dung bạn vừa sửa xong căn bếp và hàng xóm hỏi: \"Nhà chị sửa gì thế?\" Bạn không kể từng viên gạch. Bạn nói bếp dành cho ai nấu, đã đổi những gì, nấu thử thấy sao, và còn việc gì nữa.",
        "columns": [
          "Điều cần nói",
          "Kể về căn bếp",
          "Kể về trang web"
        ],
        "rows": [
          [
            "Dành cho ai",
            "Cả nhà, hay chỉ mình chị",
            "Khách tìm giờ và gọi đặt lịch"
          ],
          [
            "Đã làm gì",
            "Đổi bồn rửa, dời bếp ga",
            "Thay chữ giả, sửa nút, thu nhỏ ảnh"
          ],
          [
            "Thử thấy sao",
            "Nấu thử một bữa",
            "Người xem mất bao nhiêu giây"
          ],
          [
            "Tiếp theo",
            "Lắp thêm kệ",
            "Ai cập nhật khi giá đổi"
          ]
        ],
        "oneLiner": "Kể bốn ý, không kể từng chi tiết: dành cho ai, đã làm gì, thử thấy sao, tiếp theo."
      },
      {
        "type": "heading",
        "text": "Bốn ý trong hai phút"
      },
      {
        "type": "paragraph",
        "text": "Hai phút là khoảng 120 giây. Chia bốn ý, mỗi ý khoảng 30 giây. Ý một: trang phục vụ ai và họ cần làm gì. Ý hai: vài vòng sửa cụ thể. Ý ba: kết quả thử với một người xem thật. Ý bốn: bước tiếp theo và ai lo."
      },
      {
        "type": "paragraph",
        "text": "Mỗi ý chỉ cần một ví dụ cụ thể. \"Em sửa nút quá sát ở điện thoại\" có giá trị hơn \"em đã sửa nhiều chỗ\" vì người nghe hình dung được và tin bạn đã thử thật."
      },
      {
        "type": "flow",
        "title": "Từ bản phác đến người xem thật",
        "steps": [
          {
            "label": "Bản phác giấy",
            "detail": "Bạn vẽ bố cục và ghi chữ thật vào từng khung trước khi nhờ AI."
          },
          {
            "label": "Dựng từng phần",
            "detail": "Mỗi lần nhờ một phần, xem, ghi nhận xét, rồi mới làm tiếp."
          },
          {
            "label": "Sửa và kiểm",
            "detail": "Thay chữ giả, xem trên điện thoại, nhờ người thử và đếm giây."
          },
          {
            "label": "Ra ngoài và giữ cho đúng",
            "detail": "Rà thông tin cá nhân, quyền dùng ảnh, rồi giao người lo cập nhật."
          }
        ]
      },
      {
        "type": "sim",
        "tool": "editor",
        "mission": "about-page",
        "title": "Tự tay tạo một trang giới thiệu",
        "task": "Mở trình soạn thảo mô phỏng và hoàn thành nhiệm vụ trang giới thiệu, để thấy các phần của một trang ghép lại thế nào."
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Soát bản tóm tắt hai phút do AI viết",
        "task": "Bạn nhờ AI viết bản tóm tắt từ ghi chú của mình. Ghi chú chỉ có: trang cho khách tìm giờ mở cửa và gọi đặt bánh, đã thay số mẫu, thu nhỏ ảnh, một người thử mất khoảng 12 giây, việc tiếp theo là em trai cập nhật giá. Đánh dấu đoạn AI tự thêm.",
        "segments": [
          {
            "text": "Trang này giúp khách tìm giờ mở cửa và gọi đặt bánh."
          },
          {
            "text": "Chúng tôi đã thay số điện thoại mẫu và thu nhỏ ảnh cho trang tải nhanh hơn."
          },
          {
            "text": "Đã có hơn 500 khách truy cập trong tuần đầu tiên.",
            "error": "Ghi chú không có số khách; 500 là số AI bịa để nghe ấn tượng."
          },
          {
            "text": "Một người xem thử mất khoảng 12 giây để tìm giờ mở cửa."
          },
          {
            "text": "Trang đã được báo chí khen ngợi là giao diện đẹp nhất năm.",
            "error": "Không có trong ghi chú; AI bịa nguồn và lời khen."
          },
          {
            "text": "Bước tiếp theo: em trai sẽ cập nhật giá mỗi khi đổi."
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Hai phút trước mặt nhóm bạn",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Nhóm bạn mời bạn giới thiệu trang. Bạn có hai phút. Bạn có thể mở đầu bằng vẻ đẹp của trang hoặc bằng việc trang phục vụ ai.",
            "choices": [
              {
                "label": "Bắt đầu bằng màu sắc và phông chữ vì đó là thứ ai cũng thấy",
                "next": "bad_look"
              },
              {
                "label": "Nói ngay trang cho ai và họ cần làm gì",
                "next": "s2"
              }
            ]
          },
          "bad_look": {
            "text": "Bạn nói mười lăm giây về màu và phông, rồi hết thời gian mà chưa nói trang dành cho ai. Người nghe không biết trang có ích không.",
            "ending": "bad"
          },
          "s2": {
            "text": "Nhóm gật đầu. Bạn nói tiếp vài chỗ đã sửa và số giây người thử mất.",
            "choices": [
              {
                "label": "Kể thêm bước tiếp theo và ai lo giữ trang đúng",
                "next": "good"
              },
              {
                "label": "Kể lại toàn bộ câu lệnh đã gõ cho AI cho đầy đủ",
                "next": "bad_long"
              }
            ]
          },
          "bad_long": {
            "text": "Bạn kể đến câu lệnh thứ tám thì hết giờ. Người nghe chưa biết bước tiếp theo, và họ quên nửa đầu.",
            "ending": "bad"
          },
          "good": {
            "text": "Bạn nói đủ bốn ý trong chưa đầy hai phút. Một người trong nhóm xin link để thử và hỏi ai lo cập nhật.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Trang của bạn đã đi từ tờ giấy đến người xem thật.",
          "Hãy kể nó trong hai phút, rồi giao người giữ cho nó đúng."
        ]
      }
    ]
  }
];
