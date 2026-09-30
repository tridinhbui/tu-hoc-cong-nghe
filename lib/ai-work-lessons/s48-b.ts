import type { Lesson } from "../lesson-types";

// Chặng 48, bài 6-10. Giáo trình: scripts/curriculum/stage-48.json.
export const S48_B_LESSONS: Lesson[] = [
{
  "id": 2365,
  "slug": "tai-lieu-nen-la-gi-va-khong-nen-dua-gi",
  "title": "Chặng 48, Bài 6: Tài liệu nền nào nên đưa, tài liệu nào để ngoài",
  "subtitle": "Trợ lý chỉ giỏi bằng những gì bạn cho nó đọc - nên việc chọn tài liệu quan trọng hơn việc chọn công cụ.",
  "duration": "8 phút",
  "difficulty": "Dễ",
  "emoji": "🗂️",
  "track": "personal",
  "isFundamental": false,
  "whyItMatters": "Nhiều phòng tải lên cả thư mục chung rồi ngạc nhiên khi trợ lý trả lời bằng giá cũ hoặc lộ chuyện của một khách hàng. Sau bài này bạn có một bộ lọc ba câu hỏi để quyết định tài liệu nào vào, tài liệu nào ở ngoài.",
  "openingQuestion": "Phòng bạn có bảng giá hiện hành, quy trình đổi trả, hợp đồng đã ký với từng khách và vài bản nháp cũ. Bạn sắp lập trợ lý tra cứu. Nên đưa gì làm tài liệu nền?",
  "openingOptions": [
    "Bảng giá hiện hành và quy trình đổi trả đã được duyệt",
    "Toàn bộ thư mục chung của phòng, kể cả bản nháp cũ và file cá nhân, để trợ lý biết hết mọi thứ",
    "Hợp đồng đã ký với từng khách hàng, vì đó là loại giấy tờ thật nhất của phòng",
    "Những file bạn thấy thú vị nhất, không cần để ý file đó còn hiệu lực hay không"
  ],
  "correctOption": 0,
  "explanation": "Tài liệu nền là thứ trợ lý sẽ trích lại khi trả lời, nên nó phải còn hiệu lực, đã được người có thẩm quyền duyệt và nhiều người cần tra. Toàn bộ thư mục kéo theo bản nháp và bản cũ, khiến trợ lý nói sai mà vẫn tự tin. Hợp đồng từng khách chứa thông tin riêng không nên đưa cho cả phòng hỏi. Chọn theo cảm hứng thì bộ nền không có hệ thống, lần hỏi nào cũng may rủi.",
  "diagram": [
    {
      "label": "Liệt kê mọi tài liệu phòng đang dùng",
      "arrow": true
    },
    {
      "label": "Lọc: còn hiệu lực, đã duyệt, nhiều người cần tra",
      "arrow": true
    },
    {
      "label": "Loại: bản nháp, thông tin riêng của khách hoặc nhân sự",
      "arrow": true
    },
    {
      "label": "Đưa phần còn lại làm bộ nền và ghi lại danh sách"
    }
  ],
  "realWorldExample": {
    "company": "Tình huống minh hoạ",
    "description": "Tình huống minh hoạ: một phòng chăm sóc khách hàng tải cả thư mục chung lên trợ lý. Thư mục có bảng giá hai năm liền nhau và một file ghi chú cá nhân của trưởng nhóm về khách khó tính. Nhân viên mới hỏi giá và nhận giá năm cũ, còn người khác vô tình đọc được ghi chú về một khách. Phòng gỡ bộ nền, chỉ giữ lại bản giá hiện hành và quy trình đã duyệt, rồi trợ lý mới trả lời ổn định."
  },
  "quiz": [
    {
      "question": "Tiêu chí đầu tiên để một tài liệu được đưa vào bộ nền của phòng là gì?",
      "options": [
        "Dung lượng file nhỏ để trợ lý đọc cho nhanh",
        "Nằm ở thư mục có nhiều người mở nhất trong tuần",
        "Còn hiệu lực, đã được duyệt và nhiều người hay phải tra",
        "Trình bày đẹp, có hình minh hoạ rõ ràng"
      ],
      "correct": 2,
      "explanation": "Trợ lý trích lại đúng thứ bạn đưa, nên chất lượng nội dung là tiêu chí số một. Dung lượng chỉ ảnh hưởng tốc độ, không làm câu trả lời đúng hơn. Thư mục nhiều người mở chưa chắc là bản mới, còn trình bày đẹp không nói gì về chuyện còn hiệu lực hay chưa."
    },
    {
      "question": "Hợp đồng đã ký với từng khách có nên làm tài liệu nền cho cả phòng hỏi không?",
      "options": [
        "Có, vì hợp đồng là văn bản có giá trị nhất nên càng nhiều càng giúp trợ lý hiểu khách",
        "Không, chỉ dùng bản mẫu đã bỏ tên và số liệu khách",
        "Có, nếu đặt tên file dễ tìm để trợ lý lấy đúng",
        "Có, nếu đã dặn trợ lý là tuyệt đối không được tiết lộ tên khách cho người khác"
      ],
      "correct": 1,
      "explanation": "Bản ký với từng khách chứa tên, số tiền, điều khoản riêng; ai hỏi trợ lý cũng có thể lôi ra. Dặn trợ lý giữ bí mật không phải cơ chế bảo vệ chắc chắn, vì nó chỉ là một câu dặn chứ không phải khoá. Đặt tên dễ tìm còn làm việc lộ thông tin dễ hơn. Bản mẫu thì dạy trợ lý cấu trúc mà không kéo dữ liệu riêng."
    },
    {
      "question": "Bạn tìm thấy bản nháp quy trình đổi trả chưa được duyệt. Xử lý thế nào?",
      "options": [
        "Đưa vào, vì nó gần giống bản cuối và trợ lý sẽ tự hiểu đâu là ý chính",
        "Đưa vào nhưng đặt tên file có chữ nháp để trợ lý tự phân biệt",
        "Đưa vào cả hai bản cũ và nháp, để trợ lý so sánh rồi chọn bản hợp lý hơn",
        "Để ngoài cho tới khi được duyệt chính thức"
      ],
      "correct": 3,
      "explanation": "Trợ lý không biết bản nào đã được duyệt; nó thấy chữ trong file và dùng. Chữ nháp trong tên file chưa chắc khiến nó né, và nhờ nó tự chọn bản hợp lý là giao quyết định quy định cho một công cụ đoán chữ. Bản nháp chỉ vào bộ nền sau khi có người duyệt."
    },
    {
      "question": "Vì sao nên đưa ít tài liệu đúng thay vì đưa thật nhiều?",
      "options": [
        "Mỗi tài liệu thừa là một nguồn có thể kéo câu trả lời đi lệch",
        "Vì trợ lý chỉ đọc được vài file đầu, file sau bị bỏ qua",
        "Vì đưa nhiều file làm công cụ tính thêm phí cho mỗi lần hỏi của cả phòng",
        "Vì trợ lý đọc nhiều file sẽ mệt và trả lời chậm dần theo từng ngày sử dụng"
      ],
      "correct": 0,
      "explanation": "Điều đáng ngại không phải số file mà là chất lượng: mâu thuẫn giữa hai file cho trợ lý hai đáp án để chọn. Giới hạn số file tuỳ công cụ và không phải lý do để chọn lọc. Chuyện phí là tuỳ gói, không phải nguyên tắc chọn tài liệu. Trợ lý không mệt theo ngày dùng."
    },
    {
      "question": "Trước khi tải một file lên bộ nền, câu hỏi nào nên tự hỏi đầu tiên?",
      "options": [
        "File này có dài hơn 10 trang hay không?",
        "File này đã được dịch sang tiếng Anh chưa?",
        "Nếu đồng nghiệp đọc được cả file này thì có sao không?",
        "File này có được chính tay mình soạn không?"
      ],
      "correct": 2,
      "explanation": "Mọi người trong phòng hỏi được trợ lý sẽ đọc được nội dung file, nên câu hỏi về quyền xem đứng đầu. Số trang, ngôn ngữ và ai là người soạn đều không quyết định file có an toàn để chia sẻ hay không. Nếu câu trả lời là có sao, file ở ngoài bộ nền."
    }
  ],
  "keyTakeaways": [
    "Bộ nền chỉ gồm tài liệu còn hiệu lực, đã được duyệt và nhiều người cần tra.",
    "Bản nháp, bản cũ và file chứa thông tin riêng của khách hoặc nhân sự để ngoài.",
    "Ít tài liệu đúng tốt hơn nhiều tài liệu lẫn lộn.",
    "Hợp đồng riêng của khách được thay bằng bản mẫu đã bỏ tên và số liệu.",
    "Ghi danh sách tài liệu nền ra giấy để biết trợ lý đang dựa vào đâu."
  ],
  "practicePrompt": {
    "question": "Chị Hằng muốn thêm file 'Ghi chú họp nội bộ tuần này' vào bộ nền vì có nhiều thông tin hay. File chưa ai duyệt và có nhắc tên vài khách. Chị nên làm gì?",
    "options": [
      "Để ngoài; nếu có quy định nào đáng giữ thì viết thành một bản chính thức đã được duyệt",
      "Đưa vào ngay, vì nhiều thông tin thì trợ lý trả lời được nhiều câu hơn trước đây, kể cả biên bản",
      "Đưa vào nhưng xoá thủ công vài tên khách dễ nhận ra, còn phần còn lại giữ nguyên",
      "Đưa vào và dặn trợ lý chỉ dùng file này khi người hỏi là người trong cuộc họp"
    ],
    "correct": 0,
    "explanation": "Ghi chú họp chưa duyệt vừa chứa thông tin riêng vừa có thể đã lỗi thời. Xoá vài tên là che chưa hết, trợ lý cũng không xác minh được ai là người trong cuộc họp. Điều đáng giữ thì nên viết thành tài liệu chính thức, được duyệt rồi mới đưa vào."
  },
  "summary": {
    "keyIdea": "Trợ lý chỉ đúng bằng tài liệu bạn đưa, nên khâu lọc quan trọng hơn khâu tải lên.",
    "formula": "Bộ nền tốt = còn hiệu lực + đã được duyệt + nhiều người cần tra - thông tin riêng.",
    "commonMistake": "Tải cả thư mục chung lên vì ngại phải chọn, rồi để trợ lý tự phân biệt bản cũ với bản mới.",
    "action": "Liệt kê 10 tài liệu phòng hay dùng và gạch bỏ những cái không qua bộ lọc ba câu hỏi."
  },
  "application": {
    "title": "Làm ngay trong 20 phút",
    "message": "Mở thư mục chung của phòng, liệt kê 10 tài liệu được dùng nhiều nhất. Với mỗi file, ghi ba dấu: còn hiệu lực không, đã có người duyệt chưa, có chứa thông tin riêng của khách hoặc nhân sự không. Chọn 3 file qua cả ba và viết ra giấy lý do loại các file còn lại.",
    "secondary": "Gửi danh sách 3 file cho trưởng phòng xác nhận trước khi tải lên bất cứ đâu."
  },
  "sections": [
    {
      "type": "lead",
      "text": "Bạn chưa cần tạo trợ lý nào hôm nay. Việc đầu tiên là nhìn vào thư mục của phòng và quyết định thứ gì đáng để một người mới đọc, thứ gì không. Trợ lý sẽ đọc đúng như vậy."
    },
    {
      "type": "feynman",
      "title": "Chọn tài liệu nền đơn giản hơn bạn nghĩ",
      "intro": "Hãy nghĩ tới cuốn sổ tay bạn phát cho nhân viên mới ngày đầu đi làm. Bạn không photo cả ngăn tủ: bạn chọn những trang còn đúng, đã được sếp duyệt, và bỏ những thứ không nên tới tay người mới. Bộ nền cho trợ lý cũng vậy.",
      "columns": [
        "Khía cạnh",
        "Sổ tay nhân viên mới",
        "Bộ tài liệu nền"
      ],
      "rows": [
        [
          "Thứ đưa vào",
          "Quy trình hiện hành, bảng giá mới",
          "Bản hiện hành đã duyệt"
        ],
        [
          "Thứ để ngoài",
          "Bản nháp, ghi chú riêng về khách",
          "Bản nháp, bản cũ, thông tin riêng"
        ],
        [
          "Người đọc",
          "Một nhân viên mới",
          "Cả phòng hỏi trợ lý"
        ],
        [
          "Hậu quả nếu lẫn",
          "Làm sai quy trình cũ",
          "Trợ lý trả lời sai và rất tự tin"
        ]
      ],
      "oneLiner": "Đưa cho trợ lý đúng những trang bạn dám phát cho người mới, không hơn."
    },
    {
      "type": "heading",
      "text": "Ba câu hỏi lọc một tài liệu"
    },
    {
      "type": "paragraph",
      "text": "Câu một: tài liệu này còn hiệu lực không? Bảng giá năm ngoái thì không. Câu hai: có người có thẩm quyền duyệt chưa? Bản nháp của đồng nghiệp thì chưa. Câu ba: nếu cả phòng đọc được thì có sao không? Hợp đồng riêng với một khách thì có. Chỉ cần trượt một câu là file ở ngoài."
    },
    {
      "type": "list",
      "items": [
        "Nên đưa: bảng giá hiện hành, quy trình đổi trả, quy định nghỉ phép, mẫu hợp đồng đã bỏ tên khách.",
        "Nên để ngoài: bản nháp, bảng giá cũ, email nội bộ, bảng lương, ghi chú riêng về khách hàng.",
        "Cần hỏi trước: file có số liệu nhạy cảm hoặc điều khoản pháp lý; hỏi bộ phận pháp chế hoặc trưởng phòng."
      ]
    },
    {
      "type": "comparison",
      "left": {
        "label": "Bộ nền chọn lọc",
        "text": "Ít file, mỗi file rõ nguồn và rõ ngày. Câu trả lời nhất quán, lỗi dễ truy ra vì biết trợ lý đã đọc những gì."
      },
      "right": {
        "label": "Bộ nền tải cả thư mục",
        "text": "Nhiều file lẫn bản cũ và bản mới. Trợ lý có nhiều đáp án để chọn, không ai biết nó lấy từ đâu, và thông tin riêng có thể bị lộ."
      }
    },
    {
      "type": "callout",
      "label": "Quy tắc không ngoại lệ",
      "text": "Dữ liệu cá nhân của khách, nhân sự, lương thưởng: không đưa vào bộ nền dùng chung. Nếu cần trợ lý làm việc với loại dữ liệu đó, hỏi bộ phận pháp chế hoặc IT về công cụ được phép, đừng tự quyết."
    },
    {
      "type": "scenario",
      "title": "Thư mục chung và bản nháp quy trình",
      "start": "s1",
      "nodes": {
        "s1": {
          "text": "Trưởng phòng bảo bạn dựng bộ nền cho trợ lý hỏi đáp của phòng. Thư mục chung có 40 file, gồm bảng giá hiện hành, bảng giá năm ngoái, quy trình đổi trả bản nháp và bản chính thức, cùng hợp đồng của nhiều khách.",
          "choices": [
            {
              "label": "Chọn tất cả 40 file, để trợ lý tự biết cái nào đúng",
              "next": "bad_all"
            },
            {
              "label": "Đi qua từng file với ba câu hỏi lọc rồi lập danh sách",
              "next": "s2"
            }
          ]
        },
        "bad_all": {
          "text": "Tuần sau nhân viên mới hỏi giá và nhận con số của năm ngoái, còn một đồng nghiệp đọc được điều khoản riêng của một khách. Trưởng phòng yêu cầu gỡ toàn bộ và làm lại.",
          "ending": "bad"
        },
        "s2": {
          "text": "Bạn còn 12 file sau khi lọc. Có một bản chính thức quy trình đổi trả và một bản nháp gần giống.",
          "choices": [
            {
              "label": "Giữ cả hai bản để trợ lý có thêm ngữ cảnh",
              "next": "bad_draft"
            },
            {
              "label": "Chỉ giữ bản chính thức, bản nháp để ngoài",
              "next": "s3"
            }
          ]
        },
        "bad_draft": {
          "text": "Hai bản nói khác nhau về thời hạn đổi trả. Trợ lý lúc trả lời bản này lúc bản kia, và khách nhận hai câu trả lời khác nhau từ hai nhân viên.",
          "ending": "bad"
        },
        "s3": {
          "text": "Còn một hợp đồng mẫu cho khách doanh nghiệp, ghi sẵn tên một khách cụ thể làm ví dụ.",
          "choices": [
            {
              "label": "Xoá tên và số liệu của khách, giữ khung điều khoản, rồi hỏi pháp chế xác nhận",
              "next": "good"
            },
            {
              "label": "Đưa nguyên file vì đó chỉ là ví dụ",
              "next": "bad_name"
            }
          ]
        },
        "bad_name": {
          "text": "Trợ lý lấy tên và số tiền của khách ví dụ trả lời cho người khác, và khách đó phản ánh với công ty.",
          "ending": "bad"
        },
        "good": {
          "text": "Bộ nền gồm 11 file sạch, có danh sách ghi rõ nguồn và ngày duyệt. Nhân viên mới hỏi gì trợ lý cũng trả lời khớp với tài liệu, và bạn biết phải sửa ở đâu khi có thay đổi.",
          "ending": "good"
        }
      }
    },
    {
      "type": "aiLab",
      "mode": "spotError",
      "title": "Tìm file không nên đưa vào",
      "task": "Đây là danh sách một đồng nghiệp đề xuất làm bộ nền. Bấm vào những dòng không nên đưa vào, rồi nộp.",
      "segments": [
        {
          "text": "Bảng giá dịch vụ hiện hành, đã được giám đốc duyệt tháng này."
        },
        {
          "text": "Quy trình đổi trả bản chính thức, ghi rõ ngày hiệu lực."
        },
        {
          "text": "Bảng giá dịch vụ năm ngoái, giữ lại để đối chiếu.",
          "error": "Bản cũ: trợ lý có thể lấy nhầm giá đã hết hiệu lực. Lưu riêng bên ngoài bộ nền."
        },
        {
          "text": "Ghi chú riêng của trưởng nhóm về những khách hàng hay phàn nàn.",
          "error": "Thông tin riêng về khách, chưa duyệt. Cả phòng hỏi được trợ lý sẽ đọc được nó."
        },
        {
          "text": "Mẫu hợp đồng đã bỏ tên khách và số liệu riêng."
        }
      ]
    },
    {
      "type": "flow",
      "title": "Từ thư mục lộn xộn tới bộ nền",
      "steps": [
        {
          "label": "Liệt kê",
          "detail": "Ghi ra 10-20 tài liệu phòng hay dùng: tên, người giữ, ngày cập nhật."
        },
        {
          "label": "Lọc ba câu hỏi",
          "detail": "Còn hiệu lực? Đã duyệt? Cả phòng đọc được có sao không? Trượt một câu thì loại."
        },
        {
          "label": "Thay bản riêng bằng bản mẫu",
          "detail": "Với hợp đồng hoặc biểu mẫu có tên khách, tạo bản mẫu đã bỏ chi tiết riêng."
        },
        {
          "label": "Xin người duyệt xác nhận",
          "detail": "Trưởng phòng hoặc pháp chế nhìn danh sách rồi đồng ý."
        },
        {
          "label": "Ghi danh sách",
          "detail": "Lưu tên file, ngày, người duyệt. Khi có thay đổi, bạn biết bộ nền cần cập nhật ở đâu."
        }
      ]
    },
    {
      "type": "closing",
      "lines": [
        "Trước khi có trợ lý, bạn đã có một bộ tài liệu sạch - và thứ đó có ích ngay cả khi không dùng AI.",
        "Bài sau: dọn một file quy trình để trợ lý đọc đúng."
      ]
    }
  ]
},
{
  "id": 2366,
  "slug": "chuan-bi-file-cho-tro-ly-doc-dung",
  "title": "Chặng 48, Bài 7: Sửa một file quy trình để trợ lý đọc đúng",
  "subtitle": "Cùng nội dung, nhưng file có tiêu đề rõ và mỗi mục một ý thì trợ lý trích đúng hơn nhiều.",
  "duration": "10 phút",
  "difficulty": "Dễ",
  "emoji": "🧹",
  "track": "personal",
  "isFundamental": false,
  "whyItMatters": "Trợ lý cứ trích nhầm mục không phải lúc nào cũng vì nó kém; nhiều khi file PDF gộp ba bảng và một ghi chú vào một trang khiến ngay cả người đọc cũng rối. Sau bài này bạn biết dọn một file thành các mục mà cả người lẫn trợ lý đọc đúng.",
  "openingQuestion": "Trợ lý cứ trả lời về thời hạn thanh toán bằng số ngày của mục hoàn tiền, vì hai mục nằm sát nhau trong một bảng của file PDF. Việc đầu tiên nên làm là gì?",
  "openingOptions": [
    "Tách file thành các mục có tiêu đề riêng, mỗi mục một ý",
    "Thêm cho trợ lý một câu dặn rất dài, nhắc nó đọc thật kỹ từng dòng của bảng",
    "Đổi sang công cụ trợ lý khác, vì công cụ này rõ ràng không đọc được bảng",
    "Xoá hẳn bảng, chỉ giữ phần ghi chú cuối trang để file gọn hơn nhiều"
  ],
  "correctOption": 0,
  "explanation": "Khi hai ý nằm sát nhau trong một bảng hoặc một đoạn, trợ lý dễ lấy nhầm vì ranh giới giữa chúng không rõ, giống một người đọc vội. Tách thành mục có tiêu đề riêng cho mỗi ý là cách sửa tận gốc, còn dặn dò thêm không đổi được cấu trúc file. Đổi công cụ gặp đúng vấn đề đó với file cũ. Xoá bảng mất thông tin cần tra.",
  "diagram": [
    {
      "label": "Đọc file như người mới và đánh dấu chỗ rối",
      "arrow": true
    },
    {
      "label": "Tách mỗi ý thành một mục có tiêu đề riêng",
      "arrow": true
    },
    {
      "label": "Đưa ghi chú và ngoại lệ vào đúng mục",
      "arrow": true
    },
    {
      "label": "Hỏi thử vài câu để kiểm tra trợ lý đọc đúng"
    }
  ],
  "realWorldExample": {
    "company": "Tình huống minh hoạ",
    "description": "Tình huống minh hoạ: một phòng hành chính có file PDF quy trình tạm ứng gộp bốn bảng trên hai trang, ghi chú nhỏ ở cuối. Trợ lý trả lời sai hạn quyết toán vì lấy nhầm cột. Người phụ trách chia file thành các mục 'Ai được tạm ứng', 'Hạn quyết toán', 'Hồ sơ cần nộp', mỗi mục vài dòng. Hỏi lại cùng câu, trợ lý trả lời đúng và nói rõ lấy ở mục nào."
  },
  "quiz": [
    {
      "question": "Vì sao file một trang gộp nhiều bảng khiến trợ lý trích nhầm?",
      "options": [
        "Ranh giới giữa các ý không rõ, nên nó dễ lấy nhầm cột hoặc dòng",
        "Vì trợ lý chỉ biết đọc chữ trong đoạn văn, không biết đọc bảng nào cả",
        "Vì file PDF luôn bị khoá mật khẩu nên chỉ đọc nửa trang",
        "Vì trợ lý cố tình chọn dòng đầu tiên của bảng cho nhanh rồi bỏ phần còn lại"
      ],
      "correct": 0,
      "explanation": "Bảng gộp lẫn nhiều ý, và khi file được chuyển thành chữ thì cột và dòng có thể xáo trộn, nên ranh giới mờ. Trợ lý đọc được bảng ở mức nhất định nhưng không chắc khi bảng phức tạp. Khoá mật khẩu là chuyện khác, và nó không cố tình chọn dòng đầu."
    },
    {
      "question": "Một mục quy trình tốt nên chứa bao nhiêu ý chính?",
      "options": [
        "Càng nhiều càng tốt để trợ lý có đủ ngữ cảnh ở cùng một chỗ, vì cùng chủ đề",
        "Hai ý liên quan đặt sát nhau, vì tách ra thì người đọc phải lật qua lại nhiều",
        "Ba ý trở lên nhưng in đậm phần quan trọng để trợ lý biết ý nào cần lấy trước",
        "Một ý, kèm tiêu đề nói đúng ý đó"
      ],
      "correct": 3,
      "explanation": "Mỗi mục một ý giúp trích dẫn chính xác: trợ lý lấy nguyên mục đúng thứ người hỏi cần. Nhiều ý trong một mục thì dễ trộn lẫn. In đậm giúp mắt người, còn trợ lý không 'thấy' in đậm như bạn thấy, và hai ý sát nhau chính là tình huống dễ nhầm đã nói ở trên."
    },
    {
      "question": "Tiêu đề mục nào giúp trợ lý tìm đúng nhất?",
      "options": [
        "Lưu ý",
        "Hạn quyết toán tạm ứng (số ngày làm việc)",
        "Mục 3 (xem trang sau)",
        "Một số điều cần biết về quy trình chung của phòng khi làm việc"
      ],
      "correct": 1,
      "explanation": "Tiêu đề nói rõ nội dung mục thì cả người lẫn trợ lý tìm ra nhanh. 'Lưu ý' trống rỗng, 'Mục 3' chỉ có nghĩa khi nhìn cả file, còn tiêu đề dài mơ hồ không chỉ ra ý cụ thể nào. Một tiêu đề tốt trả lời câu hỏi mục này nói về cái gì."
    },
    {
      "question": "File có ngoại lệ ghi ở cuối trang thay vì cạnh quy định chính. Nên sửa thế nào?",
      "options": [
        "Giữ ở cuối trang vì đó là chỗ người ta hay ghi ngoại lệ trong mọi tài liệu",
        "Xoá ngoại lệ để trợ lý đỡ rối",
        "Đưa ngoại lệ lên ngay dưới quy định mà nó áp dụng",
        "Chuyển ngoại lệ sang một file riêng để trợ lý phải tự tìm khi cần tới"
      ],
      "correct": 2,
      "explanation": "Ngoại lệ tách xa quy định thì trợ lý trả lời theo quy định chính và bỏ sót ngoại lệ, vì nó đọc từng mục. Để ngoại lệ ngay dưới quy định giữ hai thứ đi cùng nhau. Xoá ngoại lệ là làm quy trình sai, còn file riêng khiến nó không biết phải nối hai nơi."
    },
    {
      "question": "Sau khi dọn file, cách kiểm tra nào đáng tin nhất?",
      "options": [
        "Hỏi lại đúng những câu trước đó trợ lý từng trả lời sai",
        "Đọc lại file một lần nữa xem có đẹp mắt và gọn gàng hơn trước không",
        "Hỏi một câu thật dễ để chắc rằng trợ lý vẫn còn trả lời được bình thường",
        "Nhờ chính trợ lý nhận xét xem file mới tốt hơn file cũ ở những điểm nào"
      ],
      "correct": 0,
      "explanation": "Câu từng sai là phép thử thật: nếu giờ nó đúng và chỉ ra đúng mục, bạn thấy cải thiện cụ thể. Nhìn đẹp mắt không đo độ chính xác, câu dễ không phân biệt file cũ với file mới, và lời nhận xét của trợ lý là ý kiến chứ không phải bằng chứng."
    },
    {
      "question": "Nên sửa file nguồn (Word, bảng tính) hay sửa bản PDF đã xuất ra?",
      "options": [
        "Sửa trực tiếp bản PDF cho nhanh rồi tải bản đó lên, vì PDF mới là cái trợ lý đọc",
        "Sửa file nguồn rồi xuất lại bản PDF",
        "Sửa cả hai nơi bằng tay",
        "Tải nguyên bản PDF cũ lên và viết thêm lời dặn ở ngoài để sửa các chỗ rối"
      ],
      "correct": 1,
      "explanation": "Sửa bản xuất ra làm file nguồn tụt lại phía sau, và lần cập nhật sau bạn lại mất công làm từ đầu. Sửa nguồn rồi xuất lại thì một nơi chứa sự thật. Lời dặn bên ngoài không sửa được cấu trúc file, còn sửa hai nơi bằng tay dễ lệch nhau."
    }
  ],
  "keyTakeaways": [
    "Mỗi mục một ý, tiêu đề nói đúng ý đó.",
    "Ngoại lệ đặt ngay dưới quy định mà nó áp dụng.",
    "Bảng phức tạp nên tách thành các mục ngắn hoặc danh sách.",
    "Sửa file nguồn rồi xuất lại, không sửa bản xuất ra.",
    "Kiểm tra bằng chính những câu hỏi trợ lý từng trả lời sai."
  ],
  "practicePrompt": {
    "question": "Anh Dũng dọn xong file quy trình nhưng chỉ hỏi trợ lý một câu dễ 'Công ty tên gì?' rồi kết luận file ổn. Còn thiếu bước nào?",
    "options": [
      "Hỏi lại những câu trước đó trợ lý từng trả lời sai và xem nó chỉ đúng mục",
      "Nhờ trợ lý đánh giá xem file đã đủ tốt chưa rồi tin theo đánh giá của nó",
      "Thêm nhiều tiêu đề hơn nữa cho tới khi mỗi dòng đều có một tiêu đề riêng",
      "Đợi một tuần để xem đồng nghiệp có phàn nàn gì về trợ lý rồi mới kiểm tra"
    ],
    "correct": 0,
    "explanation": "Câu dễ không chứng minh được file đã hết gây nhầm. Những câu từng sai mới là phép thử đúng. Nhờ trợ lý tự đánh giá là hỏi người có thể sai, tiêu đề cho từng dòng làm file vụn, còn chờ đồng nghiệp phàn nàn là để lỗi tới tay người dùng trước khi phát hiện."
  },
  "summary": {
    "keyIdea": "Trợ lý đọc đúng khi file chia rõ từng ý, cũng như người đọc vậy.",
    "formula": "File dễ đọc = tiêu đề rõ + mỗi mục một ý + ngoại lệ đặt cạnh quy định.",
    "commonMistake": "Đổ lỗi cho trợ lý kém trong khi file gộp nhiều ý vào một bảng khiến ai đọc cũng dễ nhầm.",
    "action": "Chọn một file quy trình và kiểm xem có mục nào chứa hai ý cần tách không."
  },
  "application": {
    "title": "Làm ngay trong 20 phút",
    "message": "Lấy một file quy trình đang gây nhầm (hoặc file dài nhất của phòng). Chia thành ít nhất 6 mục, mỗi mục một tiêu đề nói đúng ý và vài dòng ngắn. Kéo các ngoại lệ lên sát quy định. Rồi hỏi trợ lý ba câu, gồm ít nhất một câu nó từng trả lời sai, và ghi lại nó trích mục nào.",
    "secondary": "Lưu bản dọn vào thư mục riêng, giữ nguyên bản gốc chưa đụng."
  },
  "sections": [
    {
      "type": "lead",
      "text": "Một file quy trình rối làm khổ cả người mới vào lẫn trợ lý. Bài này bạn dọn một file thật: không đổi nội dung quy định, chỉ đổi cách xếp để mỗi ý nằm đúng chỗ của nó."
    },
    {
      "type": "feynman",
      "title": "Dọn file cho trợ lý đơn giản hơn bạn nghĩ",
      "intro": "Hãy nghĩ tới ngăn kéo bếp. Nếu dao, thìa và giấy ăn lẫn cả vào một ngăn, nấu ăn lúc vội thường lấy nhầm. Chia ngăn có nhãn thì ai lục cũng lấy đúng. File quy trình cũng cần những ngăn có nhãn.",
      "columns": [
        "Khía cạnh",
        "Ngăn kéo bếp",
        "File quy trình"
      ],
      "rows": [
        [
          "Khi lẫn lộn",
          "Lấy nhầm thìa thay vì dao",
          "Trích nhầm hạn thanh toán thay vì hạn hoàn tiền"
        ],
        [
          "Chia ngăn",
          "Mỗi loại một ngăn",
          "Mỗi ý một mục"
        ],
        [
          "Nhãn",
          "Tờ giấy ghi 'dao, kéo'",
          "Tiêu đề nói rõ nội dung"
        ],
        [
          "Đồ hiếm dùng",
          "Để cạnh đồ liên quan",
          "Ngoại lệ ngay dưới quy định"
        ]
      ],
      "oneLiner": "Trợ lý lấy đúng thứ khi mỗi thứ có một ngăn và một cái nhãn."
    },
    {
      "type": "heading",
      "text": "Bốn chỗ file hay gây nhầm"
    },
    {
      "type": "paragraph",
      "text": "Một: bảng gộp nhiều ý trong các cột. Hai: ghi chú hoặc ngoại lệ nằm xa quy định chính. Ba: tiêu đề chung chung như 'Lưu ý'. Bốn: một đoạn văn dài nhét ba quy định. Mỗi chỗ làm ranh giới giữa các ý mờ đi."
    },
    {
      "type": "list",
      "items": [
        "Bảng phức tạp: tách thành từng mục, hoặc viết mỗi dòng thành một câu đầy đủ.",
        "Ngoại lệ: đưa lên ngay dưới quy định mà nó áp dụng.",
        "Tiêu đề: viết thành câu trả lời cho 'mục này nói về cái gì'.",
        "Đoạn dài: tách thành các mục ngắn, mỗi mục một ý."
      ]
    },
    {
      "type": "comparison",
      "left": {
        "label": "File trước khi dọn",
        "text": "Một trang, ba bảng sát nhau, ghi chú nhỏ cuối trang. Người đọc vội cũng dễ nhầm, trợ lý cũng vậy."
      },
      "right": {
        "label": "File sau khi dọn",
        "text": "Sáu mục có tiêu đề, mỗi mục vài dòng, ngoại lệ ngay dưới quy định. Hỏi gì cũng tìm được đúng mục."
      }
    },
    {
      "type": "callout",
      "label": "Đừng đổi nội dung quy định",
      "text": "Dọn file là đổi cách xếp, không phải đổi quy định. Nếu bạn thấy quy định mâu thuẫn hoặc thiếu, ghi lại và hỏi người phụ trách, đừng tự sửa cho hợp lý."
    },
    {
      "type": "aiLab",
      "mode": "spotError",
      "title": "Trợ lý trả lời sai vì file rối - chỗ nào bịa?",
      "task": "Đồng nghiệp hỏi 'Hạn quyết toán tạm ứng là bao lâu?'. Trợ lý đọc file PDF gộp nhiều bảng và trả lời thế này. Bấm những câu đáng ngờ rồi nộp.",
      "segments": [
        {
          "text": "Theo quy trình tạm ứng, bạn cần nộp hồ sơ quyết toán trong vòng 30 ngày.",
          "error": "Con số này lấy từ bảng hoàn tiền nằm sát bên trong file rối, không phải hạn quyết toán. Trộn hai bảng vì ranh giới không rõ."
        },
        {
          "text": "Hồ sơ gồm phiếu đề nghị tạm ứng và hoá đơn gốc."
        },
        {
          "text": "Nếu nộp trễ, khoản tạm ứng sẽ bị khấu trừ vào lương tháng kế tiếp.",
          "error": "File không có quy định này; trợ lý suy đoán và nói như chắc chắn. Khi thiếu thông tin, phải nói không thấy trong tài liệu."
        },
        {
          "text": "Bạn gửi hồ sơ cho phòng kế toán để được xử lý."
        }
      ]
    },
    {
      "type": "scenario",
      "title": "Dọn file PDF gộp nhiều bảng",
      "start": "s1",
      "nodes": {
        "s1": {
          "text": "File quy trình tạm ứng của phòng hành chính dài hai trang, gộp bốn bảng. Trợ lý hay nhầm hạn quyết toán với hạn hoàn tiền. Bạn có bản Word gốc.",
          "choices": [
            {
              "label": "Sửa trực tiếp file PDF bằng công cụ chỉnh PDF cho nhanh",
              "next": "bad_pdf"
            },
            {
              "label": "Mở bản Word, tách bảng thành các mục có tiêu đề",
              "next": "s2"
            }
          ]
        },
        "bad_pdf": {
          "text": "Bản PDF vừa sửa xong đã lệch với bản Word. Tháng sau chính sách đổi, bạn cập nhật Word nhưng quên PDF, và trợ lý dùng bản cũ.",
          "ending": "bad"
        },
        "s2": {
          "text": "Bạn tách được sáu mục. Có một ngoại lệ về tạm ứng khẩn cấp đang nằm cuối trang.",
          "choices": [
            {
              "label": "Để nguyên ở cuối trang vì đó là chỗ quen thuộc",
              "next": "bad_end"
            },
            {
              "label": "Đưa ngoại lệ lên ngay dưới mục 'Ai được tạm ứng'",
              "next": "s3"
            }
          ]
        },
        "bad_end": {
          "text": "Trợ lý trả lời quy định chính mà bỏ sót ngoại lệ, và nhân viên khẩn cấp bị từ chối nhầm.",
          "ending": "bad"
        },
        "s3": {
          "text": "File mới đã sẵn sàng. Bạn cần kiểm xem trợ lý đọc đúng chưa.",
          "choices": [
            {
              "label": "Hỏi lại ba câu trợ lý từng trả lời sai",
              "next": "good"
            },
            {
              "label": "Hỏi một câu dễ nhất rồi kết luận",
              "next": "bad_easy"
            }
          ]
        },
        "bad_easy": {
          "text": "Câu dễ trả lời đúng, bạn công bố. Hai ngày sau trợ lý vẫn nhầm hạn quyết toán vì một mục còn gộp ý.",
          "ending": "bad"
        },
        "good": {
          "text": "Cả ba câu đều trả lời đúng và nêu rõ mục nguồn. Bạn lưu file Word là nguồn chính.",
          "ending": "good"
        }
      }
    },
    {
      "type": "flow",
      "title": "Dọn một file trong năm bước",
      "steps": [
        {
          "label": "Đọc như người mới",
          "detail": "Đánh dấu chỗ bạn phải đọc hai lần mới hiểu, đó là chỗ trợ lý sẽ nhầm."
        },
        {
          "label": "Tách mỗi ý một mục",
          "detail": "Đặt tiêu đề nói đúng nội dung mục, không dùng chữ chung chung."
        },
        {
          "label": "Kéo ngoại lệ lại gần",
          "detail": "Đặt ngay dưới quy định mà nó áp dụng."
        },
        {
          "label": "Sửa ở file nguồn",
          "detail": "Xuất lại bản PDF từ file Word hoặc bảng tính gốc."
        },
        {
          "label": "Hỏi lại câu từng sai",
          "detail": "Nếu trợ lý trả lời đúng và chỉ ra đúng mục thì file đã đạt."
        }
      ]
    },
    {
      "type": "closing",
      "lines": [
        "Một file sạch giúp cả người lẫn trợ lý; công sức bạn bỏ ra không uổng ngay cả khi đổi công cụ.",
        "Bài sau: khi bản cũ và bản mới nằm chung thư mục."
      ]
    }
  ]
},
{
  "id": 2367,
  "slug": "hai-ban-quy-dinh-cu-moi-tro-ly-tin-ban-nao",
  "title": "Chặng 48, Bài 8: Hai bản quy định cũ và mới: trợ lý tin bản nào",
  "subtitle": "Trợ lý không biết bản nào là bản hiện hành trừ khi bạn nói cho nó biết bằng tên file, ngày hiệu lực và một quy tắc.",
  "duration": "10 phút",
  "difficulty": "Dễ",
  "emoji": "📅",
  "track": "personal",
  "isFundamental": false,
  "whyItMatters": "Bảng giá năm ngoái vẫn nằm cạnh bảng giá mới, và trợ lý sẵn sàng dùng bản nào nó gặp trước. Bài này dạy ba việc bạn làm được ngay: đặt tên, ghi ngày hiệu lực, và dặn trợ lý quy tắc ưu tiên.",
  "openingQuestion": "Thư mục nền có hai file: 'bang-gia.pdf' và 'bang-gia-final.pdf'. Trợ lý báo giá khác nhau tuỳ lần hỏi. Cách xử lý nào gọn nhất?",
  "openingOptions": [
    "Chỉ giữ bản hiện hành, đặt tên có ngày hiệu lực, bản cũ lưu ngoài bộ nền",
    "Giữ cả hai file và dặn trợ lý luôn dùng file có chữ final trong tên",
    "Giữ cả hai file và hỏi trợ lý bản nào mới hơn rồi làm theo câu trả lời của nó",
    "Xoá hẳn cả hai file rồi nhờ đồng nghiệp đọc giá từ trí nhớ cho trợ lý"
  ],
  "correctOption": 0,
  "explanation": "Nguồn sự thật nên chỉ có một bản. Bản cũ lưu ở ngoài để tra khi cần nhưng không cho trợ lý đọc. Ngày hiệu lực trong tên file giúp cả người lẫn trợ lý biết đâu là bản hiện hành. Chữ final không đảm bảo gì vì có thể có final 2, còn hỏi trợ lý bản nào mới hơn là giao quyết định cho công cụ đoán. Xoá hết thì mất cả nguồn thật.",
  "diagram": [
    {
      "label": "Tìm các bản cùng loại nằm chung thư mục",
      "arrow": true
    },
    {
      "label": "Chọn bản hiện hành, đặt tên kèm ngày hiệu lực",
      "arrow": true
    },
    {
      "label": "Chuyển bản cũ ra ngoài bộ nền",
      "arrow": true
    },
    {
      "label": "Ghi quy tắc ưu tiên vào lời dặn trợ lý"
    }
  ],
  "realWorldExample": {
    "company": "Tình huống minh hoạ",
    "description": "Tình huống minh hoạ: một công ty có bảng phí dịch vụ áp dụng từ đầu quý này và bảng phí của quý trước vẫn nằm trong thư mục. Nhân viên sale hỏi trợ lý và có hôm nhận mức phí cũ. Trưởng nhóm đổi tên file thành 'bang-phi-hieu-luc-tu-2026-07-01', đưa bản quý trước sang thư mục lưu trữ, và thêm vào lời dặn: nếu hai tài liệu mâu thuẫn, dùng tài liệu có ngày hiệu lực mới hơn."
  },
  "quiz": [
    {
      "question": "Cách đặt tên file nào giúp phân biệt bản cũ và mới rõ nhất?",
      "options": [
        "bang-gia-final-final",
        "bang-gia-hieu-luc-tu-2026-07-01",
        "bang-gia-moi-nhat",
        "bang-gia-ban-cuoi-cung-da-duyet-xong-v3"
      ],
      "correct": 1,
      "explanation": "Ngày hiệu lực là thông tin khách quan, ai cũng so sánh được. 'Final', 'mới nhất' hay 'cuối cùng' chỉ có nghĩa vào lúc đặt tên, tới tháng sau có thêm bản mới thì chữ đó hết đúng mà vẫn nằm trong tên. Số v3 cũng không cho biết áp dụng từ khi nào."
    },
    {
      "question": "Trợ lý thấy hai bản mâu thuẫn trong bộ nền. Bạn nên làm gì?",
      "options": [
        "Dặn trợ lý lúc nào cũng chọn đáp án lớn hơn cho chắc ăn",
        "Để trợ lý trả lời cả hai con số rồi người hỏi tự chọn cho phù hợp",
        "Bỏ bản cũ ra khỏi bộ nền và chỉ giữ một bản hiện hành",
        "Chờ cho tới khi có khách phàn nàn về giá rồi mới xử lý sự việc"
      ],
      "correct": 2,
      "explanation": "Một nguồn thì không còn mâu thuẫn. Chọn số lớn hơn là quy tắc tuỳ tiện và sai khi bản mới thấp hơn. Trả lời cả hai đẩy việc chọn sang người hỏi, vốn không biết bản nào đúng. Chờ phàn nàn nghĩa là khách đã nhận sai giá."
    },
    {
      "question": "Khi buộc phải giữ cả hai bản (ví dụ để tra hợp đồng cũ), quy tắc nào nên dặn trợ lý?",
      "options": [
        "Mặc định dùng bản có ngày hiệu lực mới nhất, chỉ dùng bản cũ khi người hỏi nói rõ",
        "Dùng bản nào trợ lý đọc được trước vì thường thì nó đã chọn đúng rồi",
        "Luôn dùng bản cũ vì đã được dùng lâu nên ít rủi ro hơn bản mới",
        "Trộn số liệu hai bản và lấy số trung bình cho công bằng với cả hai bên"
      ],
      "correct": 0,
      "explanation": "Quy tắc rõ ràng: mặc định bản mới, bản cũ chỉ khi được gọi tên. Dùng bản đọc trước thì phụ thuộc thứ tự ngẫu nhiên. Bản cũ an toàn hơn chỉ vì quen thuộc, còn trung bình là bịa ra một con số chưa từng là giá của ai."
    },
    {
      "question": "Vì sao không nên hỏi trợ lý 'bản nào mới hơn?' để quyết định?",
      "options": [
        "Vì trợ lý không đọc được ngày tháng ở bất kỳ định dạng nào trong file",
        "Vì hỏi như vậy sẽ làm trợ lý quên hết các tài liệu đã đọc trước đó",
        "Vì công cụ nào cũng tính phí riêng cho câu hỏi về ngày tháng",
        "Nó chỉ suy luận từ chữ trong file nên có thể sai mà vẫn nói chắc"
      ],
      "correct": 3,
      "explanation": "Trợ lý có thể đọc được ngày, nhưng nếu hai file đều ghi ngày mập mờ hoặc không ghi, nó đoán. Quyết định bản nào hiện hành là việc của người chịu trách nhiệm. Các lý do về quên tài liệu hoặc tính phí riêng là bịa ra, không đúng thực tế."
    },
    {
      "question": "Ai nên là người xác nhận 'đây là bản hiện hành' trước khi đưa vào bộ nền?",
      "options": [
        "Bất kỳ ai đầu tiên thấy file trong thư mục, vì họ nắm rõ nhất",
        "Người chịu trách nhiệm quy định đó, ví dụ trưởng phòng hoặc kế toán trưởng",
        "Người có tên ở cuối cùng trong chuỗi email gửi file đó",
        "Người trẻ nhất phòng, vì họ rành công nghệ nhất và thao tác nhanh"
      ],
      "correct": 1,
      "explanation": "Bản hiện hành là một quyết định quản lý, không phải phát hiện kỹ thuật. Người đầu tiên thấy file hoặc người cuối trong chuỗi email chưa chắc có thẩm quyền, và tuổi tác hay độ rành công nghệ không liên quan tới việc biết bản nào đúng."
    }
  ],
  "keyTakeaways": [
    "Nguồn sự thật chỉ nên có một bản; bản cũ lưu ngoài bộ nền.",
    "Tên file chứa ngày hiệu lực, không dùng chữ final hay mới nhất.",
    "Nếu buộc giữ hai bản, dặn quy tắc: mặc định bản có ngày hiệu lực mới nhất.",
    "Đừng để trợ lý tự quyết định bản nào hiện hành.",
    "Người có thẩm quyền xác nhận bản hiện hành trước khi đưa vào."
  ],
  "practicePrompt": {
    "question": "Chị Lan để cả 'noi-quy-2025.pdf' và 'noi-quy-2026.pdf' trong bộ nền, dặn trợ lý 'dùng bản mới'. Trợ lý vẫn trích bản 2025 vì file 2026 chưa ghi ngày hiệu lực ở trong. Nên sửa gì?",
    "options": [
      "Ghi ngày hiệu lực ngay trong file 2026 và chuyển bản 2025 ra khỏi bộ nền",
      "Dặn thêm cho trợ lý rằng năm lớn hơn thì phải luôn được ưu tiên hơn mọi bản cũ",
      "Xoá chữ 2025 khỏi tên file cũ để trợ lý không còn nhìn thấy nó",
      "Đổi tên file 2026 thành final để trợ lý biết đó là bản cuối"
    ],
    "correct": 0,
    "explanation": "Lời dặn 'dùng bản mới' cần căn cứ rõ trong file: ngày hiệu lực. Bỏ bản cũ ra nữa thì không còn chỗ nhầm. Dặn thêm về năm vẫn dựa trên đoán khi file không ghi ngày. Xoá chữ khỏi tên file chỉ che, còn nội dung cũ vẫn trong bộ nền. Chữ final không phải bằng chứng hiệu lực."
  },
  "summary": {
    "keyIdea": "Trợ lý không biết bản nào đúng; bạn cho nó biết bằng tên, ngày hiệu lực và quy tắc.",
    "formula": "Bản hiện hành rõ = một nguồn + ngày hiệu lực + người duyệt.",
    "commonMistake": "Giữ cả hai bản rồi tin rằng chữ final hoặc chữ mới nhất trong tên đủ để trợ lý chọn đúng.",
    "action": "Tìm một cặp file cũ và mới trong thư mục của bạn và xử lý bằng ba bước trong bài."
  },
  "application": {
    "title": "Làm ngay trong 20 phút",
    "message": "Tìm một loại tài liệu phòng bạn có nhiều bản (bảng giá, nội quy, mẫu hợp đồng). Chọn bản hiện hành, đặt lại tên có ngày hiệu lực, chuyển các bản còn lại sang thư mục lưu trữ ngoài bộ nền, và viết hai câu quy tắc ưu tiên để dán vào lời dặn trợ lý.",
    "secondary": "Nhờ người có thẩm quyền xác nhận bằng một tin nhắn: đây là bản hiện hành."
  },
  "sections": [
    {
      "type": "lead",
      "text": "Thứ làm trợ lý trả lời sai nhiều nhất không phải chuyện nó kém. Đó là hai bản của cùng một quy định nằm chung một chỗ. Bài này dạy cách khiến chỉ còn một bản thật."
    },
    {
      "type": "feynman",
      "title": "Bản cũ và bản mới đơn giản hơn bạn nghĩ",
      "intro": "Hãy nghĩ tới thực đơn dán ở cửa quán. Nếu quán dán cả thực đơn cũ và mới cạnh nhau, khách sẽ gọi theo bản nào họ thấy trước. Quán tốt gỡ bản cũ xuống và ghi ngày bản mới. Trợ lý cũng như khách kia.",
      "columns": [
        "Khía cạnh",
        "Thực đơn ở quán",
        "Quy định trong bộ nền"
      ],
      "rows": [
        [
          "Bản cũ",
          "Gỡ xuống, cất vào tủ",
          "Chuyển ra thư mục lưu trữ"
        ],
        [
          "Dấu hiệu bản mới",
          "Ghi 'áp dụng từ ngày...'",
          "Tên file chứa ngày hiệu lực"
        ],
        [
          "Người quyết định",
          "Chủ quán",
          "Người có thẩm quyền của phòng"
        ],
        [
          "Nếu dán cả hai",
          "Khách gọi lung tung",
          "Trợ lý trả lời lúc này lúc khác"
        ]
      ],
      "oneLiner": "Chỉ để lại trên tường bản đang áp dụng, và ghi rõ từ ngày nào."
    },
    {
      "type": "heading",
      "text": "Ba việc để trợ lý không lấy nhầm bản"
    },
    {
      "type": "paragraph",
      "text": "Việc một: chỉ một bản hiện hành trong bộ nền. Việc hai: tên file ghi ngày hiệu lực, ví dụ bang-gia-hieu-luc-tu-2026-07-01. Việc ba: nếu buộc giữ hai bản, dặn rõ quy tắc ưu tiên. Ba việc này không cần kỹ thuật, chỉ cần kỷ luật."
    },
    {
      "type": "list",
      "items": [
        "Một nguồn: bản cũ ra thư mục lưu trữ, không nằm trong bộ nền.",
        "Tên có ngày: ngày hiệu lực là thông tin ai cũng so sánh được.",
        "Quy tắc: 'nếu hai tài liệu khác nhau, dùng tài liệu có ngày hiệu lực mới hơn và nói rõ bạn dùng tài liệu nào'."
      ]
    },
    {
      "type": "comparison",
      "left": {
        "label": "Một bản có ngày hiệu lực",
        "text": "Trợ lý trả lời nhất quán. Khi có thay đổi, bạn thay một file và xong."
      },
      "right": {
        "label": "Nhiều bản tên mơ hồ",
        "text": "Kết quả phụ thuộc vào thứ tự đọc. Không ai biết trợ lý đã lấy từ bản nào, và lỗi chỉ lộ khi khách phàn nàn."
      }
    },
    {
      "type": "callout",
      "label": "Ai quyết định bản hiện hành",
      "text": "Đó là quyết định của người chịu trách nhiệm quy định, không phải của bạn hay trợ lý. Nếu không chắc, hỏi họ một câu và lưu câu trả lời."
    },
    {
      "type": "aiLab",
      "mode": "spotError",
      "title": "Trợ lý trả lời giá từ hai bản lẫn nhau",
      "task": "Nhân viên hỏi 'Phí dịch vụ hiện nay là bao nhiêu?'. Trong bộ nền có cả bảng phí cũ và mới. Bấm những câu có vấn đề rồi nộp.",
      "segments": [
        {
          "text": "Theo bảng phí hiện hành, dịch vụ gói cơ bản tính theo tháng."
        },
        {
          "text": "Mức phí gói cơ bản là 500.000 đồng mỗi tháng (số minh hoạ).",
          "error": "Con số lấy từ bảng phí cũ vì hai bản nằm chung bộ nền. Khi hai bản khác nhau, phải dùng bản có ngày hiệu lực mới và nói rõ nguồn."
        },
        {
          "text": "Bạn có thể tham khảo file bảng phí để xem chi tiết."
        },
        {
          "text": "Bảng phí này áp dụng từ đầu năm và không thay đổi trong năm nay.",
          "error": "File không hề ghi thời hạn áp dụng. Trợ lý tự thêm chi tiết nghe hợp lý."
        }
      ]
    },
    {
      "type": "scenario",
      "title": "Hai bản quy định trong cùng một thư mục",
      "start": "s1",
      "nodes": {
        "s1": {
          "text": "Trưởng nhóm nhờ bạn dọn bộ nền vì trợ lý báo phí không ổn định. Bạn thấy 'bang-phi.pdf' và 'bang-phi-final.pdf' với nội dung hơi khác nhau.",
          "choices": [
            {
              "label": "Hỏi người phụ trách bảng phí bản nào đang áp dụng",
              "next": "s2"
            },
            {
              "label": "Thử hỏi trợ lý bản nào mới hơn rồi làm theo",
              "next": "bad_ask"
            }
          ]
        },
        "bad_ask": {
          "text": "Trợ lý chọn 'final' vì chữ đó. Nhưng bản final là bản nháp cuối năm trước, bản đang áp dụng là file khác. Phí báo cho khách sai suốt một tuần.",
          "ending": "bad"
        },
        "s2": {
          "text": "Người phụ trách xác nhận: bản áp dụng từ ngày 1 tháng 7 là bản đang dùng.",
          "choices": [
            {
              "label": "Đổi tên thành bang-phi-hieu-luc-tu-2026-07-01, bản còn lại ra thư mục lưu trữ",
              "next": "good"
            },
            {
              "label": "Giữ cả hai trong bộ nền, dặn trợ lý dùng bản có chữ final",
              "next": "bad_final"
            }
          ]
        },
        "bad_final": {
          "text": "Chữ final nằm ở bản sai. Trợ lý càng chắc chắn hơn về con số sai.",
          "ending": "bad"
        },
        "good": {
          "text": "Bộ nền chỉ còn một bảng phí rõ ngày. Bạn thêm vào lời dặn quy tắc ưu tiên ngày hiệu lực, và trợ lý báo phí nhất quán kể từ đó.",
          "ending": "good"
        }
      }
    },
    {
      "type": "flow",
      "title": "Xử lý cặp bản cũ - mới",
      "steps": [
        {
          "label": "Tìm các bản cùng loại",
          "detail": "Xem kỹ tên file và ngày sửa. Chỗ có hai cái tên gần giống là chỗ rủi ro."
        },
        {
          "label": "Hỏi người có thẩm quyền",
          "detail": "Họ xác nhận bản nào đang áp dụng và từ ngày nào."
        },
        {
          "label": "Đổi tên kèm ngày hiệu lực",
          "detail": "Dạng bang-gia-hieu-luc-tu-YYYY-MM-DD, ai đọc cũng hiểu."
        },
        {
          "label": "Chuyển bản cũ ra ngoài",
          "detail": "Đưa sang thư mục lưu trữ không thuộc bộ nền."
        },
        {
          "label": "Viết quy tắc ưu tiên",
          "detail": "Một hai câu dặn: nếu mâu thuẫn, dùng bản mới hơn và nói rõ nguồn."
        }
      ]
    },
    {
      "type": "closing",
      "lines": [
        "Một bản hiện hành, một cái tên có ngày: hai thói quen nhỏ chặn được cả loại lỗi lớn.",
        "Bài sau: dặn trợ lý luôn dẫn nguồn khi trả lời quy trình nội bộ."
      ]
    }
  ]
},
{
  "id": 2368,
  "slug": "hoi-dap-quy-trinh-noi-bo-co-dan-nguon",
  "title": "Chặng 48, Bài 9: Cho trợ lý trả lời quy trình kèm dẫn nguồn",
  "subtitle": "Một lời dặn ba phần: chỉ dựa tài liệu, nêu mục nào, và nói không biết khi tài liệu không có.",
  "duration": "10 phút",
  "difficulty": "Dễ",
  "emoji": "🔖",
  "track": "personal",
  "isFundamental": false,
  "whyItMatters": "Đồng nghiệp mới hỏi đi hỏi lại về xin nghỉ, thanh toán tạm ứng, và bạn trả lời lần thứ mười. Trợ lý có thể đỡ việc này, nhưng chỉ khi nó chỉ ra nguồn và biết nói 'không có trong tài liệu' thay vì bịa cho trọn câu.",
  "openingQuestion": "Bạn muốn trợ lý trả lời câu hỏi về quy trình xin nghỉ cho đồng nghiệp mới. Lời dặn nào đáng tin nhất?",
  "openingOptions": [
    "Chỉ trả lời từ tài liệu, nêu tên mục và nói không biết khi thiếu",
    "Trả lời thân thiện, đầy đủ để người mới khỏi hỏi lại",
    "Trả lời như một chuyên viên nhân sự giàu kinh nghiệm và luôn đưa ra lời khuyên cụ thể",
    "Trả lời ngắn nhất có thể, nếu không chắc thì đoán theo thông lệ của đa số công ty"
  ],
  "correctOption": 0,
  "explanation": "Ba phần của lời dặn mỗi phần chặn một lỗi: chỉ dựa tài liệu chặn chuyện kể theo hiểu biết chung, nêu mục cho người hỏi tự kiểm tra, còn nói không biết chặn chuyện bịa cho đủ câu. Thân thiện đầy đủ chưa phải đúng. Đóng vai chuyên viên khiến nó đưa lời khuyên chắc giọng nhưng không có trong quy định. Đoán theo thông lệ là bịa hợp lý.",
  "diagram": [
    {
      "label": "Người hỏi đặt câu hỏi về quy trình",
      "arrow": true
    },
    {
      "label": "Trợ lý tìm mục liên quan trong tài liệu nền",
      "arrow": true
    },
    {
      "label": "Trả lời chỉ từ mục đó và ghi rõ tên mục",
      "arrow": true
    },
    {
      "label": "Không có mục nào thì nói không thấy và chỉ người hỏi tiếp"
    }
  ],
  "realWorldExample": {
    "company": "Tình huống minh hoạ",
    "description": "Tình huống minh hoạ: một phòng nhân sự dựng trợ lý hỏi đáp cho nhân viên mới. Lần đầu không có lời dặn dẫn nguồn, trợ lý trả lời câu hỏi về nghỉ không lương bằng quy tắc nghe hợp lý nhưng không có trong tài liệu. Sau khi dặn 'trích mục nào, không có thì nói không biết và chỉ ai để hỏi', câu trả lời kèm tên mục, và với câu không có sẵn nó chỉ sang người phụ trách."
  },
  "quiz": [
    {
      "question": "Phần nào của lời dặn giúp người hỏi tự kiểm tra câu trả lời?",
      "options": [
        "Yêu cầu trả lời lịch sự, có câu chào",
        "Yêu cầu trả lời thật ngắn để khỏi phải đọc lâu",
        "Yêu cầu nêu tên mục trong tài liệu đã dùng",
        "Yêu cầu trả lời bằng đúng giọng của trưởng phòng"
      ],
      "correct": 2,
      "explanation": "Tên mục cho người hỏi mở tài liệu ra đối chiếu trong vài giây. Lịch sự, ngắn gọn và giọng trưởng phòng đều là chuyện cách nói, không cho bằng chứng để kiểm tra. Dẫn nguồn biến câu trả lời từ tin được thành kiểm được."
    },
    {
      "question": "Tài liệu không có quy định về nghỉ không lương. Trợ lý nên làm gì?",
      "options": [
        "Nói không thấy trong tài liệu và chỉ người hỏi sang bộ phận nhân sự",
        "Trả lời theo thông lệ chung của các công ty để người hỏi đỡ phải chờ đợi lâu",
        "Suy ra từ quy định nghỉ phép có lương",
        "Trả lời chung chung rằng mọi trường hợp đều tuỳ thuộc vào quyết định của sếp"
      ],
      "correct": 0,
      "explanation": "Khi tài liệu thiếu, câu trả lời an toàn là nói thật rằng không thấy và chỉ đúng người. Thông lệ chung không phải quy định của công ty bạn. Suy ra từ quy định khác là bịa có lý lẽ. Câu chung chung thì nghe như trả lời mà không cho người hỏi gì."
    },
    {
      "question": "Vì sao lời dặn 'nếu không có thì nói không biết' phải viết rõ ra?",
      "options": [
        "Vì trợ lý không có khái niệm không biết nên phải được lập trình thêm vào",
        "Vì nói không biết là cách duy nhất làm câu trả lời nghe trang trọng hơn",
        "Vì công cụ nào cũng thiết kế để từ chối mọi câu hỏi khi chưa được dặn",
        "Nếu không, trợ lý thường cố trả lời cho đủ câu thay vì dừng lại"
      ],
      "correct": 3,
      "explanation": "Trợ lý xu hướng viết tiếp chữ nghe hợp lý, nên nếu không được cho phép nói không biết, nó điền vào chỗ trống. Lời dặn rõ tạo một lối thoát hợp lệ. Hai lý do còn lại là bịa: nó không từ chối mọi câu, và không biết không làm câu nghe trang trọng hơn."
    },
    {
      "question": "Đồng nghiệp hỏi quy trình thanh toán tạm ứng, trợ lý trả lời đầy đủ nhưng không nêu mục. Điều gì đáng lo nhất?",
      "options": [
        "Câu trả lời dài quá nên người hỏi sẽ không đọc hết phần còn lại",
        "Không ai biết câu trả lời lấy từ tài liệu hay do trợ lý tự viết",
        "Câu trả lời có thể làm trợ lý tốn nhiều sức hơn cho các lần sau",
        "Câu trả lời thiếu lời chào nên đồng nghiệp sẽ thấy thiếu thân thiện"
      ],
      "correct": 1,
      "explanation": "Không có nguồn thì bạn không phân biệt được trích với bịa, nên sai sót ở lại không ai thấy. Độ dài, sức tính toán và lời chào đều không phải rủi ro chính. Dẫn nguồn là cách duy nhất cho người đọc kiểm được."
    },
    {
      "question": "Mục tiêu nào hợp lý để đo trợ lý hỏi đáp quy trình đã đạt chưa?",
      "options": [
        "Số người dùng mỗi ngày tăng lên mà không cần xem nội dung trả lời thế nào",
        "Câu trả lời nào cũng dài ít nhất một đoạn văn để trông đầy đủ chu đáo",
        "Mọi câu trả lời có nguồn đúng và câu ngoài tài liệu được nói là không biết",
        "Không có ai hỏi lại thêm câu nào sau khi nhận câu trả lời đầu tiên"
      ],
      "correct": 2,
      "explanation": "Đạt nghĩa là đúng và trung thực về giới hạn. Lượng người dùng đo độ phổ biến, không đo độ đúng. Độ dài không liên quan đến chính xác. Không ai hỏi lại có thể vì họ đã tin câu trả lời sai. Do đó cần mẫu câu hỏi thật, chấm nguồn và chấm câu ngoài tài liệu."
    }
  ],
  "keyTakeaways": [
    "Lời dặn ba phần: chỉ dựa tài liệu, nêu tên mục, nói không biết khi thiếu.",
    "Dẫn nguồn biến câu trả lời từ phải tin thành kiểm được.",
    "Cho trợ lý một lối thoát hợp lệ: 'không thấy trong tài liệu, hãy hỏi ...'.",
    "Đừng để trợ lý đóng vai chuyên viên đưa lời khuyên ngoài quy định.",
    "Thử bằng vài câu hỏi có trong tài liệu và vài câu không có."
  ],
  "practicePrompt": {
    "question": "Anh Tùng dặn trợ lý: 'Trả lời câu hỏi về quy trình dựa trên tài liệu.' Nhưng trợ lý vẫn trả lời câu hỏi về thưởng Tết dù tài liệu không nhắc tới. Anh nên thêm gì?",
    "options": [
      "Thêm: nếu tài liệu không có thì nói không thấy và chỉ người hỏi sang nhân sự",
      "Thêm: trả lời thật tự tin để người hỏi không thấy mình thiếu thông tin gì cả hết",
      "Thêm: nếu không chắc thì lấy thông lệ của công ty lớn để bổ sung",
      "Bỏ hết lời dặn cũ vì lời dặn càng ngắn thì trợ lý càng nghe kỹ"
    ],
    "correct": 0,
    "explanation": "Lời dặn thiếu đúng lối thoát: không nói trợ lý được phép và phải nói không biết. Tự tin hơn chỉ làm lỗi khó thấy hơn, thông lệ công ty lớn là nguồn ngoài tài liệu, và bỏ lời dặn cũ mất luôn phần 'chỉ dựa tài liệu' đang có tác dụng."
  },
  "summary": {
    "keyIdea": "Trợ lý dẫn nguồn và dám nói không biết thì có thể tin ở mức kiểm được.",
    "formula": "Lời dặn tốt = chỉ dựa tài liệu + nêu tên mục + nói không biết khi thiếu.",
    "commonMistake": "Dặn trợ lý 'trả lời đầy đủ, thân thiện' mà không cho phép nó nói không biết, nên nó bịa để đủ câu.",
    "action": "Soạn lời dặn ba phần cho trợ lý của phòng bạn và thử bằng 3 câu có trong tài liệu, 2 câu không có."
  },
  "application": {
    "title": "Làm ngay trong 20 phút",
    "message": "Viết lời dặn ba phần (chỉ dựa tài liệu, nêu tên mục, nói không biết và chỉ người hỏi tiếp) cho trợ lý hỏi đáp quy trình của phòng. Hỏi thử 3 câu có trong tài liệu và 2 câu không có, rồi ghi lại câu nào trợ lý trả lời đúng mục, câu nào nó bịa.",
    "secondary": "Nếu có câu nó vẫn bịa, thêm một câu dặn cụ thể hơn và hỏi lại."
  },
  "sections": [
    {
      "type": "lead",
      "text": "Điều làm trợ lý hỏi đáp có giá trị không phải là trả lời nhanh, mà là trả lời kiểm được. Bài này bạn viết lời dặn để nó luôn chỉ ra mục nào, và dám nói không biết."
    },
    {
      "type": "feynman",
      "title": "Trả lời có dẫn nguồn đơn giản hơn bạn nghĩ",
      "intro": "Hãy nghĩ tới một thủ thư giỏi. Khi bạn hỏi, họ không kể theo trí nhớ: họ rút cuốn sách, mở trang và chỉ cho bạn dòng cần đọc. Nếu thư viện không có sách đó, họ nói thẳng là không có và chỉ bạn tới nơi khác.",
      "columns": [
        "Khía cạnh",
        "Thủ thư giỏi",
        "Trợ lý có lời dặn tốt"
      ],
      "rows": [
        [
          "Khi có thông tin",
          "Chỉ trang và dòng",
          "Nêu tên mục trong tài liệu"
        ],
        [
          "Khi không có",
          "Nói không có, chỉ chỗ khác",
          "Nói không thấy, chỉ người hỏi tiếp"
        ],
        [
          "Khi không chắc",
          "Hỏi lại bạn cần gì",
          "Hỏi lại người dùng hoặc nêu phần chưa rõ"
        ],
        [
          "Người kiểm tra",
          "Bạn mở trang đó ra",
          "Người hỏi mở mục đó ra"
        ]
      ],
      "oneLiner": "Một câu trả lời đáng tin là câu bạn mở nguồn ra kiểm được trong ba mươi giây."
    },
    {
      "type": "heading",
      "text": "Ba phần của lời dặn"
    },
    {
      "type": "paragraph",
      "text": "Phần một: chỉ dựa vào tài liệu đã đưa, không dùng hiểu biết bên ngoài. Phần hai: mỗi câu trả lời ghi tên mục đã dùng. Phần ba: nếu tài liệu không có thì nói 'không thấy trong tài liệu' và chỉ người hỏi nên liên hệ ai. Thiếu phần nào, trợ lý mở ra một lỗ hổng tương ứng."
    },
    {
      "type": "list",
      "items": [
        "Thiếu phần một: trợ lý kể theo thông lệ chung, không phải quy định của công ty bạn.",
        "Thiếu phần hai: không ai biết câu nào trích, câu nào bịa.",
        "Thiếu phần ba: với câu ngoài tài liệu, trợ lý cố bịa cho đủ câu."
      ]
    },
    {
      "type": "aiLab",
      "mode": "prompt",
      "title": "Dặn trợ lý hỏi đáp quy trình xin nghỉ",
      "task": "Đồng nghiệp mới hỏi về quy trình xin nghỉ phép. Lắp lời dặn để trợ lý trả lời đúng và có nguồn.",
      "parts": [
        {
          "id": "scope",
          "label": "Phạm vi tài liệu",
          "options": [
            {
              "text": "Hãy trả lời dựa trên hiểu biết chung về cách công ty làm việc.",
              "feedback": "Hiểu biết chung không phải quy định của công ty bạn. Trợ lý sẽ kể một quy trình nghe hợp lý nhưng có thể khác thật."
            },
            {
              "text": "Chỉ dùng tài liệu 'Sổ tay nhân sự' đã đưa; không dùng thông tin ngoài tài liệu.",
              "good": true,
              "feedback": "Phạm vi rõ: câu trả lời ràng buộc vào tài liệu nên kiểm được."
            }
          ]
        },
        {
          "id": "cite",
          "label": "Dẫn nguồn",
          "options": [
            {
              "text": "Trả lời rõ ràng, dễ hiểu, thân thiện với người mới.",
              "feedback": "Dễ hiểu nhưng không có nguồn: bạn không phân biệt được câu nào trích, câu nào tự viết."
            },
            {
              "text": "Sau mỗi ý, ghi tên mục trong tài liệu, ví dụ (Mục 3.2 Xin nghỉ phép).",
              "good": true,
              "feedback": "Có tên mục, người hỏi mở ra đối chiếu trong vài giây."
            }
          ]
        },
        {
          "id": "unknown",
          "label": "Khi thiếu thông tin",
          "options": [
            {
              "text": "Nếu không chắc, hãy cố gắng đưa ra câu trả lời hợp lý nhất.",
              "feedback": "Khuyến khích đoán: trợ lý sẽ điền vào chỗ trống bằng chữ nghe hợp lý, không báo là đoán."
            },
            {
              "text": "Nếu tài liệu không có, nói 'không thấy trong tài liệu' và bảo người hỏi liên hệ phòng nhân sự.",
              "good": true,
              "feedback": "Có lối thoát trung thực: người hỏi biết nên hỏi ai, và trợ lý không bịa."
            }
          ]
        }
      ],
      "responses": [
        {
          "requires": [
            "scope",
            "cite",
            "unknown"
          ],
          "text": "Bạn xin nghỉ phép bằng cách gửi đơn cho quản lý trực tiếp ít nhất 3 ngày làm việc trước (Mục 3.2 Xin nghỉ phép). Về nghỉ không lương, tôi không thấy quy định trong tài liệu; bạn nên hỏi phòng nhân sự."
        },
        {
          "requires": [
            "scope",
            "cite"
          ],
          "text": "Bạn gửi đơn cho quản lý trực tiếp trước ít nhất 3 ngày làm việc (Mục 3.2). Nghỉ không lương thì cần giám đốc duyệt và chỉ được tối đa 5 ngày mỗi năm.\n\n(Vế sau không có trong tài liệu: trợ lý bịa vì không có lối thoát.)"
        },
        {
          "text": "Thường thì bạn chỉ cần báo trước cho quản lý là được, và công ty nào cũng cho nghỉ 12 ngày mỗi năm. Nếu cần nghỉ dài hơn cứ nhắn người phụ trách.\n\n(Không nguồn, con số tự nghĩ ra.)"
        }
      ]
    },
    {
      "type": "comparison",
      "left": {
        "label": "Lời dặn ba phần",
        "text": "Mỗi câu trả lời có tên mục, câu ngoài tài liệu được nói rõ là không biết. Bạn sửa tài liệu thì câu trả lời đổi theo."
      },
      "right": {
        "label": "Lời dặn 'trả lời thân thiện'",
        "text": "Nghe trơn tru nhưng không kiểm được. Khi sai, không ai biết sai từ đâu, và đồng nghiệp mới làm theo điều không có trong quy định."
      }
    },
    {
      "type": "callout",
      "label": "Không dẫn nguồn thì đừng tin",
      "text": "Nếu một câu trả lời không nêu tên mục, hãy coi nó như chưa kiểm. Đây cũng là quy tắc bạn nên dặn đồng nghiệp khi họ dùng trợ lý."
    },
    {
      "type": "scenario",
      "title": "Đồng nghiệp mới hỏi nghỉ không lương",
      "start": "s1",
      "nodes": {
        "s1": {
          "text": "Bạn vừa dặn trợ lý xong. Một đồng nghiệp mới hỏi: 'Nghỉ không lương một tuần thì cần làm gì?'. Sổ tay không có mục về nghỉ không lương.",
          "choices": [
            {
              "label": "Trợ lý trả lời một quy trình nghe hợp lý, bạn thấy ổn nên bỏ qua",
              "next": "bad_ok"
            },
            {
              "label": "Bạn kiểm tra xem câu trả lời có nêu mục và có nói không thấy không",
              "next": "s2"
            }
          ]
        },
        "bad_ok": {
          "text": "Quy trình trợ lý nêu không có trong quy định. Đồng nghiệp làm theo, bị từ chối và mất thêm ba ngày đi hỏi lại.",
          "ending": "bad"
        },
        "s2": {
          "text": "Trợ lý vừa trả lời có 'quy trình' vừa không nêu mục nào.",
          "choices": [
            {
              "label": "Thêm vào lời dặn: nếu không có thì nói không thấy và chỉ hỏi phòng nhân sự",
              "next": "good"
            },
            {
              "label": "Dặn thêm: hãy trả lời chắc chắn hơn",
              "next": "bad_sure"
            }
          ]
        },
        "bad_sure": {
          "text": "Trợ lý trả lời càng chắc giọng hơn với một quy trình vẫn không có trong tài liệu. Lỗi khó nhận ra hơn trước.",
          "ending": "bad"
        },
        "good": {
          "text": "Hỏi lại, trợ lý đáp: không thấy quy định về nghỉ không lương trong tài liệu, bạn nên hỏi phòng nhân sự. Đồng nghiệp hỏi đúng người và có câu trả lời thật trong một ngày.",
          "ending": "good"
        }
      }
    },
    {
      "type": "flow",
      "title": "Hỏi đáp quy trình có dẫn nguồn",
      "steps": [
        {
          "label": "Đưa tài liệu nền",
          "detail": "Bộ tài liệu đã lọc và đặt tên ở các bài trước."
        },
        {
          "label": "Viết lời dặn ba phần",
          "detail": "Chỉ dựa tài liệu, nêu tên mục, nói không biết khi thiếu."
        },
        {
          "label": "Thử với câu có trong tài liệu",
          "detail": "Kiểm tra trợ lý chỉ đúng mục và không thêm chi tiết."
        },
        {
          "label": "Thử với câu không có",
          "detail": "Kiểm tra trợ lý nói không thấy thay vì bịa."
        },
        {
          "label": "Sửa lời dặn theo câu sai",
          "detail": "Mỗi lỗi nhận ra là một câu dặn cụ thể thêm vào."
        }
      ]
    },
    {
      "type": "closing",
      "lines": [
        "Trợ lý biết nói không biết là trợ lý bạn có thể để đồng nghiệp hỏi mà không phải canh.",
        "Bài sau: gom ba tài liệu của phòng thành một dự án nhỏ hoàn chỉnh."
      ]
    }
  ]
},
{
  "id": 2369,
  "slug": "du-an-tro-ly-tra-cuu-so-tay-phong",
  "title": "Chặng 48, Bài 10: Mini dự án: trợ lý tra cứu sổ tay của phòng",
  "subtitle": "Ba tài liệu, một lời dặn, năm câu hỏi thật - và bạn có một trợ lý đồng nghiệp dùng được.",
  "duration": "10 phút",
  "difficulty": "Dễ",
  "emoji": "📘",
  "track": "personal",
  "isFundamental": false,
  "whyItMatters": "Bạn đã biết chọn tài liệu, dọn file, đặt tên bản và dặn dẫn nguồn. Bài này gộp tất cả thành một dự án nhỏ làm được trong một buổi, với phép thử rõ ràng là năm câu hỏi thật của đồng nghiệp.",
  "openingQuestion": "Bạn gom ba tài liệu vào một trợ lý tra cứu cho phòng. Trước khi chia sẻ cho đồng nghiệp, việc nào nên làm?",
  "openingOptions": [
    "Hỏi thử năm câu hỏi thật của đồng nghiệp và ghi lại đúng sai",
    "Chia sẻ ngay cho cả phòng, rồi sửa dần khi có người phàn nàn về câu trả lời",
    "Thêm thật nhiều tài liệu nữa để trợ lý chắc chắn không còn câu nào không biết",
    "Hỏi trợ lý xem nó sẵn sàng chưa rồi tin nó"
  ],
  "correctOption": 0,
  "explanation": "Năm câu hỏi thật, gồm cả câu có trong tài liệu và câu không có, là phép thử rẻ nhất để biết trợ lý đáng tin tới đâu. Chia sẻ trước rồi sửa sau đưa lỗi tới đồng nghiệp trước khi bạn thấy. Thêm tài liệu làm bộ nền dài ra mà chưa chắc đúng hơn. Hỏi trợ lý nó đã sẵn sàng chưa là hỏi chính thứ bạn đang cần kiểm.",
  "diagram": [
    {
      "label": "Chọn ba tài liệu đã lọc, đã dọn, có ngày hiệu lực",
      "arrow": true
    },
    {
      "label": "Viết lời dặn: chỉ dựa tài liệu, nêu mục, nói không biết",
      "arrow": true
    },
    {
      "label": "Hỏi thử năm câu hỏi thật của đồng nghiệp",
      "arrow": true
    },
    {
      "label": "Sửa theo câu sai rồi mới chia sẻ cho cả phòng"
    }
  ],
  "realWorldExample": {
    "company": "Tình huống minh hoạ",
    "description": "Tình huống minh hoạ: một nhân viên hành chính gom nội quy, quy trình tạm ứng và bảng phụ cấp công tác thành bộ nền ba file. Cô hỏi thử năm câu đồng nghiệp hay hỏi nhất, trong đó hai câu cố ý không có trong tài liệu. Trợ lý đúng ba câu có nguồn, nhưng bịa một câu về phụ cấp đi nước ngoài. Cô thêm một câu dặn, hỏi lại, rồi mới gửi đường dẫn cho phòng."
  },
  "quiz": [
    {
      "question": "Năm câu hỏi dùng để kiểm trợ lý nên lấy từ đâu?",
      "options": [
        "Từ những câu đồng nghiệp đã thật sự hỏi bạn trong vài tuần qua",
        "Từ những câu do chính trợ lý tự gợi ý để chắc chắn nó trả lời được",
        "Từ những câu hỏi khó nhất bạn nghĩ ra để thử sức trợ lý một lần",
        "Từ một danh sách câu hỏi mẫu mà người khác chia sẻ trên mạng"
      ],
      "correct": 0,
      "explanation": "Câu đồng nghiệp thật đã hỏi là phân bố sử dụng thật, nên phép thử sát thực tế. Câu do trợ lý gợi ý là tự chọn đề mình làm được. Câu khó nhất bạn nghĩ ra có thể chẳng ai hỏi, và danh sách từ nơi khác không biết gì về tài liệu của phòng bạn."
    },
    {
      "question": "Trong năm câu hỏi thử, nên có bao nhiêu câu mà tài liệu KHÔNG có đáp án?",
      "options": [
        "Không câu nào, hỏi thứ không có thì chẳng học được gì",
        "Cả năm câu, vì chỉ câu không có đáp án mới kiểm được độ trung thực",
        "Ít nhất một hai câu, để xem trợ lý có nói không biết hay không",
        "Đúng bằng một nửa, tức là hai câu rưỡi nên được làm tròn lên thành ba"
      ],
      "correct": 2,
      "explanation": "Câu có trong tài liệu kiểm độ chính xác, câu không có kiểm độ trung thực. Cần cả hai loại. Toàn câu có đáp án không bắt được lỗi bịa, còn toàn câu không có thì không biết trợ lý có trả lời đúng khi có tài liệu hay không."
    },
    {
      "question": "Trợ lý đúng 4/5 câu nhưng bịa ở câu thứ 5. Bạn nên làm gì?",
      "options": [
        "Bỏ câu thứ 5 ra khỏi danh sách thử vì nó hiếm",
        "Thêm câu dặn cụ thể cho trường hợp đó rồi hỏi lại cả năm câu",
        "Tính 80% là đủ tốt rồi chia sẻ cho phòng cùng lời nhắc bạn đọc kỹ",
        "Xoá toàn bộ lời dặn và viết lại từ đầu thật ngắn gọn cho chắc"
      ],
      "correct": 1,
      "explanation": "Một câu bịa cho thấy lời dặn có lỗ hổng cụ thể, sửa đúng chỗ rồi chạy lại cả năm để chắc không làm hỏng câu đã đúng. Bỏ câu sai là che lỗi, chia sẻ khi còn bịa là chuyển rủi ro cho đồng nghiệp, còn viết lại từ đầu mất những phần đang đúng."
    },
    {
      "question": "Sau khi chia sẻ, việc nào giữ cho trợ lý đáng tin lâu dài?",
      "options": [
        "Không đụng vào gì nữa để trợ lý khỏi bị thay đổi ngoài ý muốn nào",
        "Chỉ cập nhật khi có người phàn nàn về câu trả lời sai của trợ lý",
        "Thêm lời dặn mới vào cuối mỗi tuần dù bộ nền chưa có gì đổi",
        "Cập nhật bộ nền mỗi khi quy định đổi và ghi lại ngày cập nhật"
      ],
      "correct": 3,
      "explanation": "Quy định đổi mà bộ nền đứng yên thì trợ lý cũ dần thành sai. Ngày cập nhật cho mọi người biết trợ lý đang dựa vào bản nào. Chờ phàn nàn là để đồng nghiệp thử lỗi, còn thêm lời dặn đều đặn khi chưa có nhu cầu chỉ làm lời dặn dài và rối."
    },
    {
      "question": "Điều gì nên ghi trong trang hướng dẫn một dòng gửi kèm đường dẫn trợ lý?",
      "options": [
        "Trợ lý dựa trên tài liệu nào, cập nhật ngày nào, và hỏi ai khi nó không biết",
        "Trợ lý biết mọi thứ của công ty nên cứ hỏi bất kỳ điều gì cũng được",
        "Trợ lý luôn đúng nên không cần kiểm tra lại với tài liệu gốc nữa",
        "Trợ lý do bạn tự viết hoàn toàn nên chỉ mình bạn mới sửa được"
      ],
      "correct": 0,
      "explanation": "Người dùng cần biết phạm vi: dựa vào tài liệu nào, mới tới đâu, và khi nó không biết thì đi đâu. Nói nó biết mọi thứ hay luôn đúng là hứa quá, và khiến đồng nghiệp ngừng kiểm. Chuyện ai sửa không giúp người dùng dùng đúng."
    }
  ],
  "keyTakeaways": [
    "Dự án nhỏ gồm ba việc: bộ nền sạch, lời dặn ba phần, năm câu hỏi thử.",
    "Dùng câu hỏi đồng nghiệp đã thật sự hỏi, gồm cả câu không có trong tài liệu.",
    "Sửa lời dặn theo câu sai cụ thể, rồi chạy lại cả năm câu.",
    "Trước khi chia sẻ, ghi rõ tài liệu nguồn, ngày cập nhật và người hỏi tiếp.",
    "Quy định đổi thì cập nhật bộ nền và ghi ngày."
  ],
  "practicePrompt": {
    "question": "Chị Mai chia sẻ trợ lý ngay sau khi nó trả lời đúng 'Công ty mình nghỉ Tết mấy ngày?'. Đó là câu chị hay được hỏi nhất. Còn thiếu gì?",
    "options": [
      "Thử thêm bốn câu nữa, gồm câu không có trong tài liệu, trước khi chia sẻ",
      "Hỏi trợ lý thêm lần nữa cùng câu đó để chắc nó luôn trả lời giống hệt nhau",
      "Bổ sung thêm mười tài liệu nữa để nó trả lời được nhiều câu hơn nữa",
      "Không cần gì thêm, vì câu hỏi phổ biến nhất trả lời đúng là đủ rồi"
    ],
    "correct": 0,
    "explanation": "Một câu đúng không đại diện cho cách trợ lý xử lý các câu khác, nhất là câu ngoài tài liệu. Hỏi lại cùng câu chỉ kiểm độ ổn định. Thêm tài liệu mà chưa thử là tăng rủi ro, và câu phổ biến nhất thường là câu dễ nhất."
  },
  "summary": {
    "keyIdea": "Trợ lý tra cứu đáng tin là kết quả của bộ nền sạch, lời dặn rõ và phép thử bằng câu hỏi thật.",
    "formula": "Trợ lý dùng được = 3 tài liệu sạch + lời dặn ba phần + 5 câu hỏi thử + ghi ngày cập nhật.",
    "commonMistake": "Chia sẻ trợ lý ngay sau một câu trả lời đúng rồi để đồng nghiệp gặp các lỗi còn lại.",
    "action": "Làm đủ bốn bước trong bài với ba tài liệu thật của phòng mình."
  },
  "application": {
    "title": "Làm ngay trong 20 phút",
    "message": "Chọn 3 tài liệu thật của phòng (đã lọc, đã dọn, có ngày). Viết lời dặn ba phần. Lập danh sách 5 câu đồng nghiệp hay hỏi nhất, trong đó có ít nhất 1 câu không có đáp án trong tài liệu. Hỏi trợ lý, ghi kết quả đúng hay sai vào bảng năm dòng, và sửa lời dặn cho câu sai.",
    "secondary": "Khi cả năm câu đạt, soạn một dòng hướng dẫn: nguồn, ngày cập nhật, hỏi ai khi nó không biết."
  },
  "sections": [
    {
      "type": "lead",
      "text": "Đây là bài để làm, không chỉ để đọc. Bạn sẽ đi từ ba tài liệu rời rạc tới một trợ lý mà đồng nghiệp hỏi được, với phép thử rõ ràng để biết nó đáng tin hay chưa."
    },
    {
      "type": "feynman",
      "title": "Dự án trợ lý đơn giản hơn bạn nghĩ",
      "intro": "Hãy nghĩ tới việc dạy một bạn thực tập sinh. Bạn đưa cho bạn ấy vài tài liệu đúng, dặn cách trả lời khi có người hỏi, rồi hỏi thử vài câu trước khi để bạn ấy trực quầy. Trợ lý của phòng cũng cần chừng đó.",
      "columns": [
        "Khía cạnh",
        "Dạy thực tập sinh",
        "Dựng trợ lý của phòng"
      ],
      "rows": [
        [
          "Tài liệu đưa",
          "Sổ tay, bảng giá, quy trình",
          "Ba tài liệu sạch, có ngày"
        ],
        [
          "Lời dặn",
          "Khi không biết, hỏi lại chị",
          "Nêu mục, nói không biết"
        ],
        [
          "Phép thử",
          "Hỏi thử vài tình huống",
          "Năm câu hỏi thật"
        ],
        [
          "Khi sai",
          "Dặn thêm đúng chỗ sai",
          "Sửa lời dặn theo câu sai"
        ]
      ],
      "oneLiner": "Đưa tài liệu đúng, dặn cách trả lời, hỏi thử, sửa chỗ sai - rồi mới để người khác dùng."
    },
    {
      "type": "heading",
      "text": "Bốn bước làm trong một buổi"
    },
    {
      "type": "paragraph",
      "text": "Bước một: chọn ba tài liệu hay được hỏi nhất, lọc và dọn theo các bài trước. Bước hai: viết lời dặn ba phần. Bước ba: hỏi năm câu thật, ghi đúng sai. Bước bốn: sửa rồi mới chia sẻ kèm một dòng hướng dẫn."
    },
    {
      "type": "list",
      "items": [
        "Ba tài liệu: nội quy, quy trình tạm ứng hoặc thanh toán, bảng phụ cấp hoặc bảng giá - tuỳ phòng bạn.",
        "Năm câu hỏi: lấy từ tin nhắn đồng nghiệp đã hỏi; ít nhất một câu không có trong tài liệu.",
        "Bảng chấm: câu hỏi, trợ lý trả lời gì, có nêu mục không, đúng hay sai."
      ]
    },
    {
      "type": "aiLab",
      "mode": "prompt",
      "title": "Dặn trợ lý tra cứu sổ tay của phòng",
      "task": "Bạn gom nội quy, quy trình tạm ứng và bảng phụ cấp thành bộ nền. Lắp lời dặn cuối cùng cho trợ lý trước khi thử năm câu hỏi.",
      "parts": [
        {
          "id": "role",
          "label": "Vai trò và phạm vi",
          "options": [
            {
              "text": "Bạn là chuyên gia nhân sự giàu kinh nghiệm, hãy giải đáp mọi thắc mắc của nhân viên.",
              "feedback": "Vai chuyên gia khiến nó đưa lời khuyên chung kể cả khi sổ tay không nhắc, nghe chắc giọng nhưng không có căn cứ."
            },
            {
              "text": "Bạn là trợ lý tra cứu sổ tay phòng. Chỉ dùng ba tài liệu đã đưa.",
              "good": true,
              "feedback": "Vai hẹp, phạm vi rõ: trợ lý biết chỉ được dựa vào đâu."
            }
          ]
        },
        {
          "id": "format",
          "label": "Khuôn dạng câu trả lời",
          "options": [
            {
              "text": "Trả lời ngắn gọn, đúng trọng tâm.",
              "feedback": "Ngắn gọn tốt, nhưng thiếu yêu cầu nêu nguồn nên bạn không kiểm được."
            },
            {
              "text": "Trả lời tối đa 4 câu, cuối cùng ghi: Nguồn: tên tài liệu, mục.",
              "good": true,
              "feedback": "Có giới hạn và dòng nguồn cố định, đọc lướt cũng thấy và kiểm được."
            }
          ]
        },
        {
          "id": "gap",
          "label": "Khi không có trong tài liệu",
          "options": [
            {
              "text": "Nếu không có, hãy gợi ý cách làm phổ biến ở các công ty khác.",
              "feedback": "Cách phổ biến ở công ty khác không phải quy định của phòng bạn, và người hỏi dễ làm theo."
            },
            {
              "text": "Nếu không có, nói: 'Tôi không thấy trong tài liệu' và đề nghị hỏi trưởng phòng.",
              "good": true,
              "feedback": "Lối thoát rõ: không bịa, và đồng nghiệp biết hỏi ai tiếp."
            }
          ]
        }
      ],
      "responses": [
        {
          "requires": [
            "role",
            "format",
            "gap"
          ],
          "text": "Tạm ứng công tác cần phiếu đề nghị có chữ ký quản lý, nộp trước chuyến đi ít nhất 2 ngày làm việc.\nNguồn: Quy trình tạm ứng, Mục 2.\n\n(Với câu về phụ cấp đi nước ngoài, trợ lý đáp: Tôi không thấy trong tài liệu, bạn hỏi trưởng phòng.)"
        },
        {
          "requires": [
            "role"
          ],
          "text": "Tạm ứng công tác cần phiếu đề nghị và thường nộp trước chuyến đi. Phụ cấp đi nước ngoài thường là khoảng 50 đô mỗi ngày.\n\n(Không nêu nguồn, và con số phụ cấp không có trong tài liệu.)"
        },
        {
          "text": "Theo kinh nghiệm của mình, nhiều công ty cho tạm ứng tới 80% chi phí dự kiến và quyết toán trong 15 ngày, bạn cứ làm theo vậy nhé.\n\n(Toàn bộ là kể theo thông lệ, không liên quan sổ tay của phòng.)"
        }
      ]
    },
    {
      "type": "scenario",
      "title": "Năm câu hỏi thử trước khi chia sẻ",
      "start": "s1",
      "nodes": {
        "s1": {
          "text": "Bạn đã gom ba tài liệu và viết lời dặn. Trợ lý trả lời rất trôi chảy câu đầu tiên bạn hỏi.",
          "choices": [
            {
              "label": "Chia sẻ đường dẫn cho cả phòng vì trông ổn rồi",
              "next": "bad_early"
            },
            {
              "label": "Lập năm câu hỏi thật từ tin nhắn của đồng nghiệp, gồm một câu không có trong tài liệu",
              "next": "s2"
            }
          ]
        },
        "bad_early": {
          "text": "Hai hôm sau một đồng nghiệp nhận câu trả lời sai về phụ cấp và làm theo. Bạn phải thông báo đính chính cho cả phòng.",
          "ending": "bad"
        },
        "s2": {
          "text": "Trợ lý đúng bốn câu, nhưng ở câu không có trong tài liệu nó đưa ra một con số phụ cấp.",
          "choices": [
            {
              "label": "Bỏ câu đó khỏi danh sách vì hiếm ai hỏi",
              "next": "bad_drop"
            },
            {
              "label": "Thêm câu dặn 'nếu không có thì nói không thấy' rồi hỏi lại cả năm câu",
              "next": "good"
            }
          ]
        },
        "bad_drop": {
          "text": "Hôm sau đúng một đồng nghiệp hỏi về phụ cấp nước ngoài và nhận số bịa. Lỗi bạn cố tình không nhìn vẫn tới tay người dùng.",
          "ending": "bad"
        },
        "good": {
          "text": "Cả năm câu đều đạt. Bạn gửi đường dẫn kèm một dòng: dựa trên ba tài liệu, cập nhật ngày hôm nay, không có thì hỏi trưởng phòng.",
          "ending": "good"
        }
      }
    },
    {
      "type": "flow",
      "title": "Mini dự án trong một buổi",
      "steps": [
        {
          "label": "Chọn và dọn ba tài liệu",
          "detail": "Còn hiệu lực, đã duyệt, không chứa thông tin riêng; mỗi mục một ý."
        },
        {
          "label": "Viết lời dặn",
          "detail": "Chỉ dùng tài liệu, nêu mục, nói không biết và chỉ người hỏi tiếp."
        },
        {
          "label": "Hỏi năm câu thật",
          "detail": "Lấy từ câu đồng nghiệp đã hỏi; có ít nhất một câu không có đáp án."
        },
        {
          "label": "Sửa theo câu sai",
          "detail": "Thêm câu dặn đúng chỗ sai, hỏi lại cả năm câu."
        },
        {
          "label": "Chia sẻ kèm hướng dẫn",
          "detail": "Một dòng: nguồn, ngày cập nhật, hỏi ai khi trợ lý không biết."
        }
      ]
    },
    {
      "type": "closing",
      "lines": [
        "Bạn vừa làm một trợ lý nhỏ nhưng có phép thử và có giới hạn rõ, và đó là khác biệt giữa một món đồ chơi với công cụ của phòng.",
        "Phần tiếp theo: dạy trợ lý giọng và khuôn dạng của phòng."
      ]
    }
  ]
},
];
