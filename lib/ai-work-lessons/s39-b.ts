import type { Lesson } from "../lesson-types";

// Chặng 39, bài 6-10. Giáo trình: scripts/curriculum/stage-39.json.
export const S39_B_LESSONS: Lesson[] = [
  {
    "id": 2185,
    "slug": "phong-kham-to-roi-huong-dan-chuan-bi-truoc-kham",
    "title": "Chặng 39, Bài 6: Tờ hướng dẫn giấy tờ cần mang khi đến khám",
    "subtitle": "Một tờ giấy rõ ràng ở quầy đỡ cho bạn hàng chục cuộc gọi hỏi lại mỗi tuần.",
    "duration": "8 phút",
    "difficulty": "Dễ",
    "emoji": "📋",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Người bệnh hay quên thẻ hoặc giấy chuyển tuyến, đến quầy mới biết thiếu và phải quay về. Một tờ một trang, đúng theo quy định của phòng khám và đã được duyệt, giúp cả người bệnh lẫn bạn đỡ mất buổi sáng.",
    "openingQuestion": "Quản lý nhờ bạn làm tờ 'giấy tờ cần mang khi đến khám'. Bạn chưa biết phòng khám có nhận thẻ bảo hiểm hay giấy chuyển tuyến không. Nên làm gì trước khi nhờ AI viết?",
    "openingOptions": [
      "Hỏi quản lý danh sách giấy tờ chính thức, rồi mới nhờ AI trình bày",
      "Nhờ AI liệt kê giấy tờ thường gặp ở các phòng khám rồi in luôn",
      "Lấy tờ của phòng khám khác trên mạng và đổi tên phòng khám, để khỏi soạn lại từ đầu",
      "Bỏ mục giấy tờ chuyên môn, chỉ ghi giờ mở cửa và địa chỉ"
    ],
    "correctOption": 0,
    "explanation": "Danh sách giấy tờ là thông tin của riêng phòng khám, AI không thể biết. Nếu để nó liệt kê 'thường gặp', nó sẽ viết ra những thứ nghe hợp lý nhưng phòng bạn có thể không yêu cầu, và người bệnh sẽ mang thừa hoặc tin sai. Chép tờ của nơi khác thì cũng mang theo quy định của nơi đó. Bỏ hẳn mục giấy tờ thì tờ không còn giải quyết đúng chuyện người bệnh hay quên. Việc của AI chỉ là trình bày gọn danh sách bạn đưa.",
    "diagram": [
      {
        "label": "Quản lý cung cấp danh sách giấy tờ chính thức",
        "arrow": true
      },
      {
        "label": "Bạn dán danh sách và dặn AI chỉ dùng đúng chữ đó",
        "arrow": true
      },
      {
        "label": "AI trình bày thành tờ một trang, có ô để tích",
        "arrow": true
      },
      {
        "label": "Bác sĩ hoặc quản lý duyệt trước khi in"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Một phòng khám nhỏ nhận nhiều cuộc gọi mỗi buổi sáng chỉ để hỏi 'mang gì khi đến'. Lễ tân dán danh sách chính thức vào AI, nhờ dàn thành tờ một trang có ô tích, quản lý đọc và ký duyệt rồi mới in. Số cuộc gọi hỏi lại giảm rõ rệt, và không ai phải sửa vì AI thêm giấy tờ không có trong quy định."
    },
    "quiz": [
      {
        "question": "Nguồn nào quyết định danh sách giấy tờ ghi trên tờ hướng dẫn?",
        "options": [
          "Danh sách chính thức do phòng khám cung cấp",
          "Những gì AI thường viết cho các phòng khám khác",
          "Tờ hướng dẫn của phòng khám lớn nhất trong khu vực",
          "Danh sách mà bạn nhớ từ lần đi khám gần nhất của mình"
        ],
        "correct": 0,
        "explanation": "Giấy tờ cần mang là quy định của riêng từng phòng khám. AI không biết phòng bạn nhận gì, phòng khác có thể khác, và trí nhớ cá nhân dễ sót. Chỉ danh sách chính thức mới đủ căn cứ để in ra phát cho người bệnh."
      },
      {
        "question": "AI trả về tờ hướng dẫn có thêm dòng 'mang kết quả xét nghiệm 3 tháng gần nhất', dòng này không có trong danh sách của bạn. Nên làm gì?",
        "options": [
          "Xoá dòng đó vì nó do AI tự thêm",
          "Giữ lại vì nghe hợp lý với người đi khám",
          "Hỏi lại AI dòng đó có đúng không rồi giữ theo câu trả lời",
          "Đổi thành 'nên mang' để bớt nghiêm ngặt"
        ],
        "correct": 0,
        "explanation": "Dòng không nằm trong danh sách chính thức là chữ AI tự thêm. Hỏi lại chính AI không phải kiểm chứng vì nó có thể xác nhận luôn điều vừa bịa, còn đổi thành 'nên mang' vẫn là một yêu cầu phòng khám chưa hề đặt ra."
      },
      {
        "question": "Vì sao tờ hướng dẫn phải có bác sĩ hoặc quản lý duyệt trước khi in?",
        "options": [
          "Vì người duyệt biết quy định thật của phòng khám còn AI thì không",
          "Vì AI luôn viết sai chính tả tiếng Việt nên cần người sửa",
          "Vì tờ in ra cần có chữ ký mới đủ dài một trang giấy",
          "Vì luật bắt mọi tờ giấy trong phòng khám đều phải có chữ ký duyệt riêng"
        ],
        "correct": 0,
        "explanation": "Người duyệt đối chiếu nội dung với quy định thật của phòng khám. Lý do không phải AI sai chính tả hay chuyện độ dài, và bạn không nên nêu điều luật nào nếu không chắc. Có ai duyệt nghĩa là có người chịu trách nhiệm về những gì phát ra."
      },
      {
        "question": "Bạn dặn AI thế nào để nó không tự thêm giấy tờ?",
        "options": [
          "Chỉ dùng đúng các mục tôi dán vào, không thêm mục nào",
          "Hãy liệt kê đầy đủ nhất có thể để người bệnh khỏi thiếu",
          "Viết thật chi tiết như một cẩm nang cho người bệnh",
          "Viết theo kinh nghiệm của các phòng khám lớn ở Việt Nam"
        ],
        "correct": 0,
        "explanation": "Ràng buộc 'chỉ dùng các mục tôi dán vào' chặn đúng chỗ AI hay bịa. Ba lời dặn còn lại đều mời AI bổ sung từ kinh nghiệm chung của nó, tức là dẫn thẳng tới mục phòng khám bạn không yêu cầu."
      },
      {
        "question": "Tờ hướng dẫn tốt cho người bệnh lớn tuổi nên có đặc điểm nào?",
        "options": [
          "Chữ to, mỗi giấy tờ một dòng, có ô để tích",
          "Toàn bộ ý gói trong một đoạn văn liền mạch cho gọn",
          "Chữ nhỏ để dồn được nhiều chú ý vào một trang",
          "Nhiều thuật ngữ hành chính để tờ có vẻ chính thống"
        ],
        "correct": 0,
        "explanation": "Người đọc tờ này thường lo lắng và đọc nhanh, nên danh sách ngắn, chữ to và ô tích giúp họ tự soát từng thứ. Đoạn văn dài, chữ nhỏ hay thuật ngữ đều làm họ bỏ sót mà không biết."
      }
    ],
    "keyTakeaways": [
      "Danh sách giấy tờ là thông tin của phòng khám, không phải của AI.",
      "Dán danh sách vào và dặn 'chỉ dùng đúng chữ này'.",
      "Tờ một trang, chữ to, có ô tích, đọc được trong một phút.",
      "Bác sĩ hoặc quản lý duyệt trước khi in.",
      "Dòng nào AI tự thêm thì xoá, dù nghe rất hợp lý."
    ],
    "practicePrompt": {
      "question": "AI đưa ra tờ hướng dẫn có 6 dòng giấy tờ, trong khi danh sách bạn dán vào chỉ có 5 dòng. Việc làm hợp lý nhất là gì?",
      "options": [
        "Tìm dòng thừa, xoá đi rồi nhờ quản lý duyệt bản còn lại",
        "Giữ cả 6 dòng vì thừa còn hơn thiếu cho người bệnh",
        "Hỏi AI dòng thứ sáu lấy từ đâu rồi tin lời giải thích",
        "Gộp dòng thừa vào một dòng chung 'các giấy tờ khác nếu có'"
      ],
      "correct": 0,
      "explanation": "Dòng thừa là chữ AI tự thêm, nên phải xoá và đối chiếu lại từng dòng với danh sách gốc. Giữ vì 'thừa còn hơn thiếu' làm người bệnh mang thứ phòng khám không đòi, hỏi lại AI không kiểm chứng được gì, và gộp thành 'các giấy tờ khác' chỉ giấu chỗ sai đi."
    },
    "summary": {
      "keyIdea": "AI trình bày danh sách, phòng khám quyết định danh sách.",
      "formula": "Danh sách chính thức + dặn 'không thêm mục' + người duyệt = tờ dùng được.",
      "commonMistake": "Để AI tự liệt kê giấy tờ 'thường gặp' rồi in luôn.",
      "action": "Lấy danh sách giấy tờ thật của nơi bạn làm và soát từng dòng của tờ AI viết."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Xin quản lý danh sách giấy tờ chính thức, hoặc lấy từ một tờ hiện có. Dán vào AI, dặn chỉ dùng đúng các mục đó, xin bản một trang có ô tích. Đối chiếu từng dòng và gạch những dòng lạ, rồi gửi quản lý duyệt.",
      "secondary": "Ngày mai ghi lại AI đã thêm mấy dòng lạ, đó là dấu hiệu bạn cần dặn chặt hơn."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Sáng thứ Hai, người bệnh đến quầy và mới nhớ ra thẻ để ở nhà. Bạn ước gì họ đã nhận được một tờ giấy dặn trước. Bài này giúp bạn làm tờ đó, mà không để AI tự đặt ra quy định cho phòng khám."
      },
      {
        "type": "feynman",
        "title": "Tờ giấy dặn trước khi đi khám đơn giản hơn bạn nghĩ",
        "intro": "Nghĩ tới danh sách đồ mang khi đi picnic: người soạn danh sách phải biết chuyến đi cần gì, còn người trình bày chỉ việc kẻ ô cho dễ nhìn.",
        "columns": [
          "Thành phần",
          "Chuyện đời thường",
          "Khi làm với AI"
        ],
        "rows": [
          [
            "Người biết nội dung",
            "Người tổ chức chuyến đi biết cần mang gì",
            "Quản lý phòng khám biết giấy tờ nào cần"
          ],
          [
            "Người trình bày",
            "Bạn kẻ bảng, chữ to, ô để tích",
            "AI dàn danh sách thành tờ một trang"
          ],
          [
            "Rủi ro",
            "Ai đó tự thêm đồ không cần thiết",
            "AI tự thêm giấy tờ nghe hợp lý"
          ],
          [
            "Kiểm tra",
            "Người tổ chức đọc lại trước khi phát",
            "Bác sĩ hoặc quản lý duyệt trước khi in"
          ]
        ],
        "oneLiner": "Người có chuyên môn quyết định nội dung, AI chỉ giúp trình bày."
      },
      {
        "type": "heading",
        "text": "Vấn đề: người bệnh đến rồi mới biết thiếu"
      },
      {
        "type": "paragraph",
        "text": "Mỗi buổi sáng quầy nhận vài người thiếu thẻ hoặc giấy chuyển tuyến. Họ phải quay về, còn bạn mất thời gian giải thích. Một tờ dặn trước cầm về nhà xử lý được phần lớn chuyện này, nhưng chỉ khi nội dung trên đó đúng với phòng khám của bạn."
      },
      {
        "type": "list",
        "items": [
          "Bước 1: xin danh sách giấy tờ chính thức từ quản lý hoặc bác sĩ.",
          "Bước 2: dán vào AI và dặn chỉ dùng đúng các mục đó.",
          "Bước 3: nhờ AI dàn thành tờ một trang, chữ to, có ô để tích.",
          "Bước 4: đối chiếu từng dòng với danh sách gốc, gạch dòng lạ.",
          "Bước 5: gửi người có chuyên môn duyệt rồi mới in."
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Cách làm tốt",
          "text": "Dán danh sách chính thức, dặn không thêm mục, đọc lại từng dòng, có người duyệt và ghi ngày duyệt."
        },
        "right": {
          "label": "Cách làm dễ hỏng",
          "text": "Nhờ AI 'viết tờ hướng dẫn đi khám' rồi in ngay. Tờ nhìn rất đẹp nhưng có thể chứa yêu cầu phòng khám chưa từng đặt ra."
        }
      },
      {
        "type": "flow",
        "title": "Từ danh sách của quản lý tới tờ trên quầy",
        "steps": [
          {
            "label": "Lấy danh sách chính thức",
            "detail": "Xin quản lý hoặc bác sĩ danh sách giấy tờ hiện hành, ghi rõ ngày lấy. Đây là nguồn duy nhất cho nội dung."
          },
          {
            "label": "Giao AI trình bày",
            "detail": "Dán danh sách vào, dặn chỉ dùng đúng chữ trong đó và xin bản một trang, chữ to, mỗi giấy tờ một dòng có ô tích."
          },
          {
            "label": "Đối chiếu từng dòng",
            "detail": "Đặt tờ cạnh danh sách gốc, gạch từng dòng khớp. Dòng nào không có trong danh sách gốc thì xoá."
          },
          {
            "label": "Gửi duyệt",
            "detail": "Gửi người có chuyên môn kèm ghi chú 'bản nháp chờ duyệt'. Chỉ in sau khi họ đồng ý."
          },
          {
            "label": "In và cập nhật",
            "detail": "Ghi ngày duyệt ở chân tờ. Khi quy định đổi, làm lại từ bước đầu thay vì sửa tay."
          }
        ]
      },
      {
        "type": "callout",
        "label": "Chỉ một người quyết định",
        "text": "Bạn không cần biết luật hay quy định bảo hiểm. Nếu không chắc một giấy tờ có cần không, hãy hỏi quản lý hoặc bác sĩ, đừng để AI quyết định thay."
      },
      {
        "type": "scenario",
        "title": "Tờ hướng dẫn cho buổi sáng thứ Hai",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Quản lý gửi bạn danh sách 5 giấy tờ và nhờ làm tờ hướng dẫn trước 10 giờ. Bạn mở AI.",
            "choices": [
              {
                "label": "Dán danh sách và dặn chỉ dùng đúng 5 mục đó",
                "next": "s2"
              },
              {
                "label": "Gõ 'viết tờ hướng dẫn đi khám cho phòng khám' và bỏ qua danh sách",
                "next": "bad_invent"
              }
            ]
          },
          "bad_invent": {
            "text": "Tờ ra rất đẹp, có cả mục 'kết quả xét nghiệm 3 tháng' mà phòng khám không yêu cầu. Người bệnh tốn tiền đi lấy kết quả rồi được báo là không cần.",
            "ending": "bad"
          },
          "s2": {
            "text": "AI trả về tờ có 6 dòng. Bạn đếm thì thấy một dòng lạ.",
            "choices": [
              {
                "label": "Xoá dòng lạ, đối chiếu 5 dòng còn lại rồi gửi quản lý duyệt",
                "next": "s3"
              },
              {
                "label": "Giữ dòng lạ vì nghe có lý, in luôn cho kịp",
                "next": "bad_keep"
              }
            ]
          },
          "bad_keep": {
            "text": "Một người bệnh mang thêm giấy tờ không cần và phàn nàn với lễ tân rằng tờ ghi sai. Bạn phải thu hồi cả xấp đã in.",
            "ending": "bad"
          },
          "s3": {
            "text": "Quản lý duyệt và nhờ bạn thêm số điện thoại quầy. Bạn thêm đúng số quản lý đưa, không tự tra.",
            "choices": [
              {
                "label": "Ghi ngày duyệt ở chân tờ và in 50 bản",
                "next": "good"
              },
              {
                "label": "In không ghi ngày duyệt cho gọn",
                "next": "ok_nodate"
              }
            ]
          },
          "ok_nodate": {
            "text": "Tờ dùng được, nhưng ba tháng sau danh sách đổi mà không ai biết tờ nào là bản cũ, nên quầy vẫn phát bản lỗi thời.",
            "ending": "bad"
          },
          "good": {
            "text": "Người bệnh nhận tờ có ô tích, đến quầy đủ giấy tờ. Ba tháng sau danh sách đổi, ngày duyệt ở chân tờ giúp bạn biết cần làm lại.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Người có chuyên môn quyết định nội dung; AI trình bày, bạn đối chiếu.",
          "Bài sau: đổi câu chữ hành chính khó thành lời dễ hiểu."
        ]
      }
    ]
  },
  {
    "id": 2186,
    "slug": "phong-kham-doi-chu-kho-thanh-cach-noi-de-hieu",
    "title": "Chặng 39, Bài 7: Đổi câu chữ hành chính khó thành lời dễ hiểu",
    "subtitle": "Câu ngắn dễ đọc hơn, nhưng đổi nghĩa mới là chuyện đáng sợ.",
    "duration": "8 phút",
    "difficulty": "Dễ",
    "emoji": "✏️",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Biểu mẫu phòng khám thường viết như văn bản cơ quan, người bệnh đọc không hiểu vẫn ký. Câu viết lại dễ hiểu giúp họ biết mình đang đồng ý điều gì, miễn là nghĩa không bị đổi khi chuyển sang lời đơn giản.",
    "openingQuestion": "Bạn nhờ AI viết lại một câu trong mục người bệnh phải ký thành lời dễ hiểu hơn. Bước nào quan trọng nhất sau khi nhận kết quả?",
    "openingOptions": [
      "Đối chiếu để nghĩa của câu mới khớp câu gốc, rồi nhờ người phụ trách xem",
      "Đọc lướt thấy câu ngắn và dễ đọc là đủ để thay vào biểu mẫu, không ai cần xem thêm",
      "Nhờ AI tự đánh giá câu mới có giữ nguyên nghĩa hay không",
      "Chỉ kiểm chính tả và dấu câu rồi in ra cho người bệnh ký"
    ],
    "correctOption": 0,
    "explanation": "Câu ngắn đọc rất trôi nhưng có thể đã bỏ mất một điều kiện hay một ngoại lệ. Với mục người bệnh phải ký, chỉ một chữ bị đổi cũng thành cam kết khác. Vì thế phải đặt hai câu cạnh nhau, soát từng ý, và mục có tính chuyên môn hay pháp lý thì người phụ trách phải xem. Nhờ AI tự chấm bài của mình không phải là kiểm chứng.",
    "diagram": [
      {
        "label": "Câu gốc trong biểu mẫu",
        "arrow": true
      },
      {
        "label": "AI viết lại thành câu ngắn",
        "arrow": true
      },
      {
        "label": "Bạn đặt hai câu cạnh nhau, soát từng ý",
        "arrow": true
      },
      {
        "label": "Người phụ trách xem mục cần ký, rồi mới dùng"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Lễ tân một phòng khám nhờ AI viết lại phần 'điều kiện huỷ lịch' của biểu mẫu. Bản viết lại rất gọn nhưng bỏ mất câu 'trừ trường hợp huỷ trước 24 giờ'. Nhờ đặt hai bản cạnh nhau, lễ tân thấy ngay chỗ thiếu và sửa lại trước khi in cho người bệnh."
    },
    "quiz": [
      {
        "question": "Khi viết lại câu hành chính thành lời dễ hiểu, điều gì phải giữ nguyên?",
        "options": [
          "Nghĩa của câu, gồm điều kiện và ngoại lệ",
          "Số chữ của câu để bố cục biểu mẫu không đổi",
          "Toàn bộ từ ngữ gốc để người bệnh quen mắt",
          "Thứ tự các mục dù câu mới đã đổi cách diễn đạt"
        ],
        "correct": 0,
        "explanation": "Mục đích đổi câu là để dễ hiểu, không phải để giữ nguyên chữ hay số chữ. Điều không được đổi là nghĩa, nhất là điều kiện và ngoại lệ, vì mục người bệnh ký là cam kết thật."
      },
      {
        "question": "AI viết lại câu dài thành hai câu ngắn, mất chữ 'trừ trường hợp huỷ trước 24 giờ'. Đây là lỗi gì?",
        "options": [
          "Bỏ mất điều kiện khiến nghĩa đổi, người bệnh hiểu sai cam kết",
          "Lỗi nhỏ về văn phong, bản mới vẫn dùng rất tốt được cho người bệnh",
          "Lỗi chính tả vì AI viết thiếu một cụm từ ngắn trong câu",
          "Không phải lỗi vì câu ngắn thì đương nhiên bỏ bớt ý phụ"
        ],
        "correct": 0,
        "explanation": "Mất chữ 'trừ trường hợp' làm người bệnh tưởng huỷ lúc nào cũng bị phạt, hoặc ngược lại. Đó là đổi nghĩa, không phải chuyện văn phong hay chính tả, và câu ngắn không đồng nghĩa với được bỏ ý."
      },
      {
        "question": "Cách nào kiểm nghĩa hai câu tốt nhất?",
        "options": [
          "Đặt hai câu cạnh nhau, gạch từng điều kiện, con số, ngày tháng",
          "Hỏi AI 'câu mới có giữ nguyên nghĩa không' rồi tin trả lời",
          "Đọc câu mới thấy êm tai là biết nghĩa vẫn đúng",
          "Đếm số chữ hai câu, ít chữ hơn là gọn và đúng hơn"
        ],
        "correct": 0,
        "explanation": "Đối chiếu từng yếu tố cụ thể mới bắt được chỗ thiếu. AI dễ xác nhận bài của chính nó, còn 'êm tai' hay 'ít chữ' chỉ đo độ trôi chảy, không đo độ đúng."
      },
      {
        "question": "Mục nào cần nhờ người phụ trách xem thêm sau khi bạn đã đối chiếu?",
        "options": [
          "Mục người bệnh phải ký hoặc đồng ý, vì đó là cam kết",
          "Câu chào 'Xin chào quý khách' ở đầu tờ",
          "Tiêu đề của biểu mẫu nếu đã in đậm và căn giữa trang đầu",
          "Dòng ghi giờ mở cửa của phòng khám"
        ],
        "correct": 0,
        "explanation": "Mục ký hoặc đồng ý có hiệu lực với cả hai bên, nên chỉ bạn xem là chưa đủ, người phụ trách phải xác nhận. Các chi tiết còn lại ít rủi ro hơn nhiều."
      },
      {
        "question": "Lời dặn nào cho AI dễ giữ nghĩa nhất khi viết lại?",
        "options": [
          "Viết lại thành câu ngắn, giữ mọi điều kiện, con số, ngày tháng, và đánh dấu chỗ bạn không chắc",
          "Viết lại thật đơn giản để trẻ em cũng hiểu, càng ngắn càng tốt",
          "Viết lại theo giọng thân thiện, có thể bỏ chi tiết phụ cho gọn",
          "Viết lại hay hơn bản gốc, tự do chọn cách diễn đạt"
        ],
        "correct": 0,
        "explanation": "Lời dặn phải nêu rõ những gì không được đổi và cho phép AI báo chỗ không chắc. Ba lời dặn kia mời AI cắt chi tiết hoặc tự do sáng tác, đúng chỗ nghĩa bị lệch."
      }
    ],
    "keyTakeaways": [
      "Dễ hiểu là mục tiêu, giữ nguyên nghĩa là điều kiện bắt buộc.",
      "Dặn AI giữ mọi điều kiện, con số, ngày tháng.",
      "Đặt hai câu cạnh nhau rồi soát từng ý, đừng đọc lướt.",
      "Mục người bệnh ký phải có người phụ trách xem.",
      "Đừng nhờ AI tự chấm bài viết lại của chính nó."
    ],
    "practicePrompt": {
      "question": "Câu gốc: 'Người bệnh được hoàn phí nếu huỷ trước 24 giờ.' AI viết: 'Huỷ lịch được hoàn phí.' Nên xử lý thế nào?",
      "options": [
        "Trả lại điều kiện 24 giờ vì bản mới bỏ mất nó",
        "Giữ bản mới vì ngắn hơn, dễ đọc hơn và đủ ý chính",
        "Thêm chữ 'luôn luôn' để người bệnh không phải hỏi lại",
        "Để nguyên rồi ghi chú nhỏ bên dưới bằng chữ mờ"
      ],
      "correct": 0,
      "explanation": "Bản mới bỏ điều kiện 24 giờ nên người bệnh hiểu là huỷ lúc nào cũng hoàn phí. Thêm 'luôn luôn' còn đổi nghĩa xa hơn, và ghi chú chữ mờ không ai đọc, nên chỉ có cách trả lại điều kiện trong chính câu."
    },
    "summary": {
      "keyIdea": "Câu ngắn hơn chỉ tốt khi nghĩa vẫn y như cũ.",
      "formula": "Dặn giữ điều kiện, con số + đặt hai câu cạnh nhau + người phụ trách xem mục ký.",
      "commonMistake": "Thấy câu mới êm tai là dùng luôn, không soát điều kiện.",
      "action": "Chọn một câu dài trong biểu mẫu, viết lại, rồi gạch từng điều kiện ở cả hai bản."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Lấy một biểu mẫu thật của nơi bạn làm và chọn ba câu dài nhất. Nhờ AI viết lại, dặn giữ mọi điều kiện và con số. Với mỗi câu, đặt hai bản cạnh nhau và gạch điều kiện nào bị mất. Câu nào chạm tới phần người bệnh ký thì đánh dấu để hỏi người phụ trách.",
      "secondary": "Ngày mai ghi lại có bao nhiêu câu AI làm mất ý, để biết mức đối chiếu cần thiết."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Một câu trong biểu mẫu dài ba dòng, đầy 'trường hợp', 'theo quy định', 'trừ khi'. Người bệnh nhìn rồi ký cho xong. Bài này dạy bạn nhờ AI viết lại cho dễ hiểu, và kiểm lại để nghĩa không đổi."
      },
      {
        "type": "feynman",
        "title": "Viết lại cho dễ hiểu đơn giản hơn bạn nghĩ",
        "intro": "Giống như bạn kể lại cho bà một bản hợp đồng thuê nhà: bạn được phép nói ngắn hơn, nhưng không được bỏ mất chuyện tiền cọc và ngày trả nhà.",
        "columns": [
          "Thành phần",
          "Chuyện đời thường",
          "Khi làm với AI"
        ],
        "rows": [
          [
            "Việc cần làm",
            "Kể lại bằng lời dễ hiểu",
            "Viết lại câu dài thành câu ngắn"
          ],
          [
            "Được đổi",
            "Cách nói, thứ tự, từ ngữ",
            "Cách diễn đạt và độ dài câu"
          ],
          [
            "Không được đổi",
            "Tiền cọc, ngày trả nhà",
            "Điều kiện, ngoại lệ, con số, ngày tháng"
          ],
          [
            "Cách kiểm",
            "Hỏi lại xem bà hiểu có đúng không",
            "Đặt hai câu cạnh nhau và gạch từng ý"
          ]
        ],
        "oneLiner": "Được đổi cách nói, không được đổi nghĩa; đặt hai bản cạnh nhau để kiểm."
      },
      {
        "type": "heading",
        "text": "Vì sao câu ngắn lại nguy hiểm hơn bạn tưởng"
      },
      {
        "type": "paragraph",
        "text": "AI viết lại rất trôi, và đúng vì trôi nên bạn dễ tin. Nó có thể bỏ một ngoại lệ, đổi 'có thể' thành 'sẽ', hoặc gộp hai điều kiện thành một. Mỗi lỗi như vậy nhìn không ra nếu bạn chỉ đọc bản mới."
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Viết lại điều khoản huỷ lịch khám",
        "task": "Câu gốc: 'Người bệnh huỷ lịch trước 24 giờ được đổi sang buổi khác không mất phí; huỷ sau thời hạn này, phòng khám có thể thu phí theo bảng giá hiện hành.' Lắp prompt để AI viết lại câu dễ hiểu.",
        "parts": [
          {
            "id": "src",
            "label": "Câu gốc",
            "options": [
              {
                "text": "Viết lại điều khoản huỷ lịch của phòng khám.",
                "feedback": "Không có câu gốc, AI sẽ tự bịa điều khoản, có thể là điều khoản của nơi khác."
              },
              {
                "text": "Đây là câu gốc, dán nguyên văn: 'Người bệnh huỷ lịch trước 24 giờ được đổi sang buổi khác không mất phí; huỷ sau thời hạn này, phòng khám có thể thu phí theo bảng giá hiện hành.'",
                "good": true,
                "feedback": "Có nguyên văn để AI làm việc trên chính chữ của phòng khám."
              }
            ]
          },
          {
            "id": "keep",
            "label": "Điều phải giữ",
            "options": [
              {
                "text": "Giữ nguyên mốc 24 giờ, chuyện đổi buổi không mất phí và chuyện có thể thu phí theo bảng giá.",
                "good": true,
                "feedback": "Nêu rõ từng điều kiện phải còn lại, AI ít có cơ hội bỏ sót."
              },
              {
                "text": "Viết cho thật đơn giản, ngắn nhất có thể.",
                "feedback": "'Ngắn nhất' khiến AI cắt bỏ điều kiện đầu tiên, và mốc 24 giờ là thứ dễ mất nhất."
              }
            ]
          },
          {
            "id": "flag",
            "label": "Chỗ không chắc",
            "options": [
              {
                "text": "Nếu có chỗ nào bạn phải đoán, hãy đánh dấu và hỏi lại tôi, đừng tự điền.",
                "good": true,
                "feedback": "AI được phép nói 'không chắc' thay vì bịa cho trọn câu."
              },
              {
                "text": "Hãy viết thật trọn vẹn, không để trống chỗ nào.",
                "feedback": "Ép AI 'trọn vẹn' là mời nó lấp chỗ trống bằng chi tiết bịa."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "src",
              "keep",
              "flag"
            ],
            "text": "Huỷ lịch trước 24 giờ: bạn được đổi sang buổi khác, không mất phí.\nHuỷ sau 24 giờ: phòng khám có thể thu phí theo bảng giá hiện hành.\n\n(Giữ đủ mốc 24 giờ, không mất phí và có thể thu phí; không thêm số tiền.)"
          },
          {
            "requires": [
              "src"
            ],
            "text": "Bạn nên huỷ lịch sớm. Huỷ muộn có thể bị thu phí.\n\n(Bản này bỏ mất mốc 24 giờ và chuyện đổi buổi không mất phí, nên người bệnh không biết 'sớm' là bao lâu.)"
          },
          {
            "text": "Huỷ lịch khám sẽ bị phạt 100.000 đồng nếu huỷ trong vòng 12 giờ.\n\n(AI không có câu gốc nên bịa mốc 12 giờ và mức 100.000 đồng, những thứ phòng khám chưa từng đặt ra.)"
          }
        ]
      },
      {
        "type": "callout",
        "label": "Mục người bệnh ký",
        "text": "Câu nào người bệnh ký hoặc đồng ý là cam kết thật. Sau khi bạn đối chiếu, người phụ trách vẫn cần đọc lại. Nếu không chắc câu nào là 'cam kết', cứ hỏi họ."
      },
      {
        "type": "comparison",
        "left": {
          "label": "Đọc kỹ để giữ nghĩa",
          "text": "Gạch từng điều kiện, con số, ngày tháng trong câu gốc. Tìm từng thứ trong bản mới. Thiếu thứ nào thì trả lại."
        },
        "right": {
          "label": "Đọc lướt vì trôi",
          "text": "Thấy câu ngắn, dễ đọc, dùng luôn. Mất ngoại lệ mà không ai biết cho tới khi người bệnh hỏi lại."
        }
      },
      {
        "type": "flow",
        "title": "Quy trình viết lại một câu khó",
        "steps": [
          {
            "label": "Chọn câu",
            "detail": "Chọn câu người bệnh hay hỏi lại hoặc ký mà không hiểu. Không viết lại cả tờ một lần."
          },
          {
            "label": "Dán nguyên văn",
            "detail": "Dán câu gốc, không tóm tắt. AI phải làm việc trên chính chữ của phòng khám."
          },
          {
            "label": "Dặn điều phải giữ",
            "detail": "Liệt kê điều kiện, con số, ngày tháng cần giữ, và cho phép AI đánh dấu chỗ không chắc."
          },
          {
            "label": "Đặt hai bản cạnh nhau",
            "detail": "Gạch từng yếu tố ở câu gốc, tìm nó ở bản mới. Thiếu thì trả lại."
          },
          {
            "label": "Người phụ trách xem",
            "detail": "Mục người bệnh ký gửi người phụ trách. Họ đồng ý thì mới thay vào biểu mẫu."
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Câu điều khoản trước giờ mở cửa",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Biểu mẫu có câu 'Người bệnh xác nhận đã đọc và đồng ý với các điều khoản dưới đây, trừ mục 3 nếu có ghi chú riêng.' Quản lý nhờ bạn viết lại cho dễ hiểu.",
            "choices": [
              {
                "label": "Dán câu gốc, dặn giữ mọi điều kiện và ngoại lệ",
                "next": "s2"
              },
              {
                "label": "Nhờ AI 'viết lại cho thân thiện' mà không dán câu gốc",
                "next": "bad_free"
              }
            ]
          },
          "bad_free": {
            "text": "AI viết một câu thân thiện nhưng gạch bỏ chữ 'trừ mục 3'. Người bệnh có ghi chú riêng ở mục 3 vẫn bị coi như đã đồng ý đủ.",
            "ending": "bad"
          },
          "s2": {
            "text": "AI trả về: 'Bạn đồng ý với các điều khoản dưới đây.' Bạn đặt hai câu cạnh nhau.",
            "choices": [
              {
                "label": "Thấy thiếu ngoại lệ mục 3, nhờ AI viết lại và giữ ngoại lệ đó",
                "next": "s3"
              },
              {
                "label": "Chấp nhận vì câu đã ngắn và rõ",
                "next": "bad_short"
              }
            ]
          },
          "bad_short": {
            "text": "Người bệnh có ghi chú riêng ở mục 3 phản ánh rằng họ bị coi như đồng ý mọi điều khoản. Phòng khám phải sửa biểu mẫu và phát lại.",
            "ending": "bad"
          },
          "s3": {
            "text": "Bản mới: 'Bạn đồng ý với các điều khoản dưới đây, trừ mục 3 nếu có ghi chú riêng.' Mục này người bệnh ký.",
            "choices": [
              {
                "label": "Gửi người phụ trách xem trước khi thay vào biểu mẫu",
                "next": "good"
              },
              {
                "label": "Thay luôn vì bạn đã tự đối chiếu",
                "next": "bad_alone"
              }
            ]
          },
          "bad_alone": {
            "text": "Bạn giữ đúng ý nhưng không ai có thẩm quyền xem. Sau này khi có tranh luận, không có ai xác nhận câu này được duyệt.",
            "ending": "bad"
          },
          "good": {
            "text": "Người phụ trách sửa một chữ rồi ký duyệt. Biểu mẫu dễ đọc hơn mà vẫn giữ ngoại lệ mục 3.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Dễ hiểu là mục tiêu; giữ nguyên nghĩa là điều kiện.",
          "Bài sau: trình bày bảng giá để người bệnh khỏi hỏi lại."
        ]
      }
    ]
  },
  {
    "id": 2187,
    "slug": "phong-kham-bang-gia-dich-vu-de-doc",
    "title": "Chặng 39, Bài 8: Trình bày bảng giá dịch vụ để người bệnh khỏi hỏi lại",
    "subtitle": "Bảng giá gọn giảm cuộc gọi, nhưng một con số lệch là mất lòng tin.",
    "duration": "10 phút",
    "difficulty": "Dễ",
    "emoji": "💵",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Bảng giá dày chữ khiến người bệnh gọi hỏi lại, còn quầy phải đọc đi đọc lại cùng một dòng. Dàn thành bảng gọn bằng AI rất nhanh, nhưng chỉ đáng dùng khi mỗi con số đã được so với bản gốc.",
    "openingQuestion": "AI dàn bảng giá bạn dán vào thành bảng gọn, có 12 dòng. Cách kiểm nào chắc chắn nhất trước khi in?",
    "openingOptions": [
      "So từng dòng, từng con số với bảng giá gốc bạn đã dán",
      "Đọc lướt vì bảng gọn và thẳng hàng nên chắc là đúng",
      "Nhờ AI tính lại tổng các dòng để xem có khớp không",
      "Chỉ so ba dòng đầu, nếu khớp thì các dòng sau cũng đúng"
    ],
    "correctOption": 0,
    "explanation": "AI có thể đổi một con số, chuyển nhầm dòng, hoặc gộp hai dịch vụ mà bảng vẫn thẳng hàng và đẹp mắt. Lỗi kiểu này chỉ lộ ra khi đặt từng dòng cạnh bản gốc. So vài dòng đầu không nói được gì về các dòng sau, còn nhờ AI tự tính lại là nhờ chính nó chấm bài. Giá in ra sai nghĩa là quầy phải xin lỗi từng người bệnh.",
    "diagram": [
      {
        "label": "Bảng giá gốc do phòng khám cung cấp",
        "arrow": true
      },
      {
        "label": "AI dàn thành bảng gọn, có cột rõ ràng",
        "arrow": true
      },
      {
        "label": "Bạn so từng dòng với bản gốc",
        "arrow": true
      },
      {
        "label": "Người phụ trách duyệt rồi mới treo, phát"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Một quầy lễ tân dán bảng giá 15 dịch vụ vào AI để dàn thành bảng. Bản đầu đổi một con số ở dòng thứ chín và gộp hai dịch vụ thành một. Nhờ so từng dòng với bản gốc, lễ tân bắt được cả hai chỗ trước khi in."
    },
    "quiz": [
      {
        "question": "Ngoài chuyện gọn hơn, bảng giá dàn bằng AI cần đảm bảo điều gì?",
        "options": [
          "Mỗi số, mỗi tên dịch vụ trùng với bảng gốc",
          "Bảng có màu sắc đẹp để người bệnh chú ý hơn",
          "Thứ tự dịch vụ theo vần chữ cái cho dễ tìm hơn",
          "Có thêm cột ghi chú tự động về các ưu đãi hiện có"
        ],
        "correct": 0,
        "explanation": "Chỉ khi số và tên khớp bản gốc thì bảng mới là bảng giá của phòng khám. Màu sắc, thứ tự chữ cái hay cột ưu đãi thêm vào đều là thứ AI có thể tự bịa hoặc không có căn cứ."
      },
      {
        "question": "AI thêm cột 'giảm giá cho khách quen 10%' mà bảng gốc không có. Nên làm gì?",
        "options": [
          "Xoá cột đó vì phòng khám chưa từng công bố mức giảm",
          "Giữ lại vì đó là điểm cộng cho phòng khám",
          "Để lại nhưng ghi 'dự kiến' cho người bệnh khỏi phàn nàn",
          "Hỏi AI 10% lấy ở đâu rồi giữ nếu nó giải thích được"
        ],
        "correct": 0,
        "explanation": "Mức giảm là cam kết tài chính của phòng khám, AI không có quyền đặt ra. 'Dự kiến' vẫn là lời hứa người bệnh sẽ đòi, còn AI giải thích thuyết phục không chứng minh được phòng khám đã quyết định như vậy."
      },
      {
        "question": "Bảng gốc ghi 'khám tổng quát: 250.000'. AI viết '250 triệu' vì hiểu sai đơn vị. Đây là loại lỗi nào?",
        "options": [
          "Lệch đơn vị: con số đúng nhưng đơn vị sai, làm giá sai gấp nghìn lần",
          "Lỗi trình bày nhỏ, người bệnh nhìn là biết ngay",
          "Lỗi chính tả nên chỉ cần sửa lại chữ cho đúng",
          "Không phải lỗi vì AI đã giữ nguyên các chữ số"
        ],
        "correct": 0,
        "explanation": "Lệch đơn vị hay bị bỏ sót vì các chữ số vẫn giống bản gốc. Người bệnh không 'biết ngay' mà gọi hỏi hoặc bỏ đi, và giữ nguyên chữ số không có nghĩa giá đúng."
      },
      {
        "question": "Bạn muốn AI giữ giá thật khi dàn bảng. Lời dặn nào phù hợp?",
        "options": [
          "Chỉ dùng số liệu tôi dán, không đổi và không thêm dòng",
          "Làm tròn các con số cho dễ nhìn và dễ nhớ",
          "Cập nhật giá theo mức phổ biến hiện nay ở các phòng khám",
          "Sắp xếp lại giá từ thấp đến cao và điều chỉnh cho hợp lý"
        ],
        "correct": 0,
        "explanation": "Chỉ lời dặn 'không đổi, không thêm' giữ bảng bám bản gốc. Làm tròn, cập nhật theo thị trường hay điều chỉnh cho hợp lý đều để AI sửa giá, tức là biến bảng thành số của nó chứ không phải của phòng khám."
      },
      {
        "question": "Vì sao bảng giá rõ ràng thường giảm cuộc gọi hỏi giá?",
        "options": [
          "Người bệnh tìm được đúng dòng cần hỏi ngay tại bảng",
          "Vì bảng đẹp nên người bệnh tự thấy hài lòng và không cần biết giá",
          "Vì bảng dài hơn nên người bệnh chán đọc và ngại gọi",
          "Vì bảng luôn rẻ hơn giá thực tế nên khỏi hỏi nữa"
        ],
        "correct": 0,
        "explanation": "Bảng gọn giúp người bệnh tìm nhanh câu trả lời, nên đỡ phải gọi. Bảng đẹp mà giá sai hoặc mù mờ chỉ tạo thêm cuộc gọi, và giá 'rẻ hơn thực tế' chính là điều dẫn tới tranh cãi ở quầy."
      }
    ],
    "keyTakeaways": [
      "Bảng giá chỉ dùng số liệu bạn dán vào, không thêm, không đổi.",
      "So từng dòng, từng số, từng đơn vị với bản gốc.",
      "Cột hay ưu đãi AI tự thêm thì xoá.",
      "Người phụ trách duyệt bảng rồi mới treo hoặc phát.",
      "Bảng rõ ràng giúp người bệnh tự tìm được giá, đỡ gọi hỏi."
    ],
    "practicePrompt": {
      "question": "Bảng gốc có 'Xét nghiệm A: 120.000' và 'Xét nghiệm B: 180.000'. AI trả bảng ghi 'Xét nghiệm A và B: 300.000'. Nên làm gì?",
      "options": [
        "Trả lại thành hai dòng riêng đúng như bản gốc",
        "Giữ dòng gộp vì tổng 300.000 khớp với hai giá cộng lại",
        "Đổi thành 'khoảng 300.000' cho khỏi phải ghi chi tiết",
        "Xoá dòng B vì người bệnh thường chỉ làm xét nghiệm A"
      ],
      "correct": 0,
      "explanation": "Bảng giá phải giữ từng dịch vụ như bản gốc, vì người bệnh có thể chỉ làm một trong hai. Dòng gộp tuy cộng đúng nhưng đổi cách bán, 'khoảng' làm giá mờ đi, còn xoá dòng B là tự quyết thay phòng khám."
    },
    "summary": {
      "keyIdea": "Bảng gọn chỉ hữu ích khi mọi con số vẫn đúng bản gốc.",
      "formula": "Dán số liệu + dặn không đổi + so từng dòng + người duyệt.",
      "commonMistake": "Tin bảng vì nó thẳng hàng và đẹp mắt.",
      "action": "So từng dòng một bảng giá thật, ghi lại chỗ AI làm lệch."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Lấy một bảng giá dịch vụ thật (hoặc 10 dòng của nó) và dán vào AI, dặn chỉ dùng số liệu đã dán. Xin bảng ba cột: tên dịch vụ, giá, ghi chú. In cả bản gốc và bản AI, gạch từng dòng khớp. Gạch riêng dòng có đơn vị hoặc con số khác.",
      "secondary": "Ngày mai ghi lại số lỗi AI gây ra, để lần sau bạn biết phải soát kỹ tới đâu."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bảng giá của phòng khám là một khối chữ dày, người bệnh nhìn một lúc rồi cầm điện thoại gọi hỏi. Bài này dạy bạn nhờ AI dàn thành bảng gọn, và giữ cho từng con số vẫn đúng."
      },
      {
        "type": "feynman",
        "title": "Dàn bảng giá đơn giản hơn bạn nghĩ",
        "intro": "Giống như bạn chép lại thực đơn của quán cơm lên tờ giấy to: bạn sắp cho dễ nhìn, nhưng món nào giá bao nhiêu thì vẫn phải đúng như quán ghi.",
        "columns": [
          "Thành phần",
          "Chuyện đời thường",
          "Khi làm với AI"
        ],
        "rows": [
          [
            "Người sắp xếp",
            "Bạn chép và kẻ cột thực đơn",
            "AI dàn bảng gọn từ số liệu bạn dán"
          ],
          [
            "Điều được đổi",
            "Kiểu chữ, cột, thứ tự",
            "Cách trình bày, tên cột"
          ],
          [
            "Điều không được đổi",
            "Tên món và giá tiền",
            "Tên dịch vụ, giá, đơn vị"
          ],
          [
            "Cách kiểm",
            "Đối chiếu từng món với thực đơn gốc",
            "So từng dòng bảng mới với bảng gốc"
          ]
        ],
        "oneLiner": "Trình bày đẹp là việc của AI, con số đúng là việc của bạn."
      },
      {
        "type": "heading",
        "text": "Vấn đề: bảng dày chữ khiến người bệnh gọi hỏi"
      },
      {
        "type": "paragraph",
        "text": "Khi giá nằm lẫn trong đoạn chữ dài, người bệnh không tìm ra dòng mình cần và gọi hỏi. Mỗi cuộc gọi là vài phút của quầy. Một bảng ba cột rõ ràng giúp họ tự tìm, nhưng chỉ khi số trên đó là số thật."
      },
      {
        "type": "chart",
        "title": "Cuộc gọi hỏi giá giảm khi bảng giá rõ hơn",
        "caption": "Số liệu minh hoạ: giả định mỗi ngày có một số cuộc gọi hỏi giá khi bảng ở mức mù mờ. Kéo thanh trượt để xem, mức rõ 1 là khối chữ dày, mức 5 là bảng ba cột dễ tìm.",
        "kind": "bar",
        "xLabel": "Mức rõ của bảng giá (1 mù mờ, 5 rất rõ)",
        "yLabel": "Số cuộc gọi hỏi giá mỗi ngày",
        "x": {
          "from": 1,
          "to": 5,
          "step": 1
        },
        "params": [
          {
            "id": "calls",
            "label": "Cuộc gọi mỗi ngày khi bảng mù mờ",
            "min": 5,
            "max": 60,
            "step": 1,
            "value": 30,
            "unit": "cuộc"
          }
        ],
        "series": [
          {
            "label": "Cuộc gọi mỗi ngày",
            "expr": "calls * (6 - x) / 5"
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Soát bảng giá do AI dàn",
        "task": "Bảng gốc: khám tổng quát 250.000; siêu âm ổ bụng 180.000; xét nghiệm máu cơ bản 320.000; tái khám trong 7 ngày: miễn phí phí khám. Bảng dưới do AI dàn. Đánh dấu những dòng AI làm sai hoặc tự thêm.",
        "segments": [
          {
            "text": "Khám tổng quát - 250.000 đồng."
          },
          {
            "text": "Siêu âm ổ bụng - 190.000 đồng.",
            "error": "Bản gốc ghi 180.000 đồng; AI đổi số nên giá sai."
          },
          {
            "text": "Xét nghiệm máu cơ bản - 320.000 đồng."
          },
          {
            "text": "Tái khám trong 7 ngày - miễn phí phí khám."
          },
          {
            "text": "Khách quen được giảm 10% mọi dịch vụ.",
            "error": "Bản gốc không có ưu đãi này; đây là chữ AI tự thêm."
          },
          {
            "text": "Gói xét nghiệm máu và siêu âm - 480.000 đồng.",
            "error": "Bản gốc không có gói này; AI tự gộp hai dịch vụ và tự đặt giá."
          }
        ]
      },
      {
        "type": "list",
        "items": [
          "Dán số liệu nguyên văn, kèm đơn vị.",
          "Dặn 'chỉ dùng số liệu đã dán, không đổi, không thêm dòng'.",
          "Xin bảng ba cột: tên dịch vụ, giá, ghi chú.",
          "In cả hai bản, gạch từng dòng khớp.",
          "Người phụ trách duyệt rồi mới treo hoặc phát."
        ]
      },
      {
        "type": "callout",
        "label": "Ưu đãi và mức giảm",
        "text": "Chỉ người có thẩm quyền quyết định giảm giá. Nếu AI thêm một dòng ưu đãi mà bạn không thấy trong bản gốc, hãy xoá. Giá là lời hứa của phòng khám."
      },
      {
        "type": "comparison",
        "left": {
          "label": "Bảng đã kiểm",
          "text": "Mọi dòng khớp bản gốc, đơn vị đúng, không dòng lạ, có người duyệt. Người bệnh tìm được giá và tin bảng."
        },
        "right": {
          "label": "Bảng chưa kiểm",
          "text": "Nhìn đẹp, thẳng hàng. Có một hai dòng lệch hoặc thừa mà bạn chưa soát, và người bệnh phát hiện trước bạn."
        }
      },
      {
        "type": "scenario",
        "title": "Bảng giá trước giờ treo lên quầy",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Quản lý đưa bạn bảng giá 8 dịch vụ và nhờ dàn thành bảng gọn trước giờ treo. Bạn dán vào AI.",
            "choices": [
              {
                "label": "Dặn chỉ dùng số liệu đã dán, rồi so từng dòng khi AI trả bảng",
                "next": "s2"
              },
              {
                "label": "Nhờ AI 'làm bảng giá đẹp' và in luôn khi nhận bảng",
                "next": "bad_print"
              }
            ]
          },
          "bad_print": {
            "text": "Bảng in đẹp nhưng có một dịch vụ ghi sai giá. Người bệnh trả theo bảng, quầy phải xin lỗi và bù chênh lệch.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bạn so từng dòng và thấy dòng thứ năm ghi 190.000, bản gốc ghi 180.000.",
            "choices": [
              {
                "label": "Sửa lại 180.000, so tiếp các dòng còn lại rồi gửi quản lý duyệt",
                "next": "good"
              },
              {
                "label": "Bỏ qua vì chênh lệch chỉ 10.000 đồng",
                "next": "bad_small"
              }
            ]
          },
          "bad_small": {
            "text": "Người bệnh trả 190.000 rồi phát hiện giá niêm yết ở cổng khác là 180.000, và mất niềm tin vào bảng giá của phòng khám.",
            "ending": "bad"
          },
          "good": {
            "text": "Bảng khớp bản gốc, quản lý ký duyệt, cuộc gọi hỏi giá giảm dần trong tuần.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Bảng gọn chỉ có ích khi từng con số vẫn đúng.",
          "Bài sau: dịch tờ hướng dẫn cho khách nước ngoài và cách kiểm lại."
        ]
      }
    ]
  },
  {
    "id": 2188,
    "slug": "phong-kham-dich-tam-to-huong-dan-cho-khach-nuoc-ngoai",
    "title": "Chặng 39, Bài 9: Dịch tờ hướng dẫn cho khách nước ngoài và cách kiểm lại",
    "subtitle": "Bản dịch trôi chảy chưa chắc đúng, nhất là phần dặn dò chuyên môn.",
    "duration": "8 phút",
    "difficulty": "Dễ",
    "emoji": "🌐",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Phòng khám có khách ít nói tiếng Việt và bạn không biết ngôn ngữ của họ. AI dịch tờ hành chính rất nhanh, nhưng bạn không đọc được bản dịch, nên phải có người biết ngôn ngữ đó xem lại trước khi phát.",
    "openingQuestion": "AI dịch tờ hướng dẫn giấy tờ sang một ngôn ngữ bạn không biết. Bạn nên làm gì trước khi phát cho khách?",
    "openingOptions": [
      "Nhờ người biết ngôn ngữ đó đọc lại, rồi mới phát",
      "Phát luôn vì bản dịch của AI đọc rất trôi chảy",
      "Nhờ AI dịch ngược sang tiếng Việt rồi tự so là đủ",
      "Xoá các câu dài để bản dịch ít có cơ hội sai"
    ],
    "correctOption": 0,
    "explanation": "Bản dịch trôi chảy không chứng minh nghĩa đúng, và bạn không đọc được nó để tự kiểm. Dịch ngược bằng chính AI chỉ cho thấy nó hiểu bản dịch của mình thế nào, không phát hiện được chỗ hiểu sai từ đầu. Xoá câu dài làm mất thông tin khách cần. Người biết ngôn ngữ đó là người duy nhất đọc và xác nhận nghĩa, nhất là phần dặn dò liên quan tới sức khoẻ.",
    "diagram": [
      {
        "label": "Tờ hành chính tiếng Việt đã được duyệt",
        "arrow": true
      },
      {
        "label": "AI dịch sang ngôn ngữ của khách",
        "arrow": true
      },
      {
        "label": "Người biết ngôn ngữ đó đọc và sửa",
        "arrow": true
      },
      {
        "label": "Phần dặn dò chuyên môn chờ bác sĩ hoặc dược sĩ xác nhận"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Một phòng khám ở khu nhiều khách du lịch dùng AI dịch tờ 'giấy tờ cần mang' sang tiếng Anh. Một nhân viên biết tiếng Anh đọc lại và sửa hai chỗ dịch cứng. Còn phần dặn dò về thuốc, phòng khám nhờ bác sĩ soạn và xác nhận, không dùng bản dịch tự động."
    },
    "quiz": [
      {
        "question": "Bản dịch của AI đọc rất trôi. Điều đó cho biết gì về độ đúng?",
        "options": [
          "Chưa cho biết gì, vì AI dịch trôi kể cả khi sai nghĩa",
          "Cho biết bản dịch đúng vì AI luôn dịch chính xác",
          "Cho biết chỉ có tên riêng bị sai, phần còn lại thì đúng",
          "Cho biết bản dịch đủ dùng nếu khách chỉ cần hiểu đại ý"
        ],
        "correct": 0,
        "explanation": "Độ trôi chảy và độ đúng là hai chuyện khác nhau: AI có thể dịch sai nghĩa mà vẫn viết rất tự nhiên. Tên riêng không phải chỗ sai duy nhất, và 'đại ý' không đủ khi có dặn dò về giấy tờ hay tiền."
      },
      {
        "question": "Cách kiểm nào bắt được lỗi nghĩa mà người không biết ngôn ngữ đích không thấy?",
        "options": [
          "Người biết ngôn ngữ đó đọc trực tiếp bản dịch",
          "Nhờ AI dịch ngược sang tiếng Việt rồi so từng câu với bản gốc ban đầu",
          "Đếm số dòng của bản gốc và bản dịch xem có bằng nhau không",
          "Đổi sang công cụ dịch thứ hai và chọn bản nào ngắn hơn"
        ],
        "correct": 0,
        "explanation": "Dịch ngược bằng AI có thể đưa về đúng chữ gốc dù bản dịch sai, vì cùng một mô hình hiểu nhầm hai chiều giống nhau. Số dòng và độ ngắn không nói gì về nghĩa, chỉ người đọc được ngôn ngữ đích mới thấy."
      },
      {
        "question": "Phần nào của tờ hướng dẫn KHÔNG nên dùng bản dịch tự động rồi phát ngay?",
        "options": [
          "Phần dặn dò chuyên môn như dùng thuốc hay chăm sóc sau khám",
          "Dòng ghi giờ mở cửa của phòng khám vào các ngày trong tuần và cuối tuần",
          "Dòng hướng dẫn đường đến phòng khám từ ngã tư gần nhất",
          "Dòng ghi số điện thoại quầy lễ tân để đặt lịch hẹn"
        ],
        "correct": 0,
        "explanation": "Dặn dò chuyên môn sai một chữ có thể gây hại, nên phải do bác sĩ hoặc dược sĩ soạn và xác nhận, bản dịch tự động không đủ. Các dòng còn lại ít rủi ro hơn nhưng vẫn nên có người đọc lại."
      },
      {
        "question": "Bạn dán tờ tiếng Việt vào AI và xin bản dịch. Lời dặn nào hợp lý?",
        "options": [
          "Dịch sát nghĩa, giữ nguyên tên riêng và con số, không thêm ý",
          "Dịch tự do cho hay hơn bản gốc",
          "Dịch và tự bổ sung lời dặn cần thiết cho khách nước ngoài",
          "Dịch và rút gọn thành vài câu chính"
        ],
        "correct": 0,
        "explanation": "Dịch sát nghĩa và không thêm ý là điều bạn cần. Dịch tự do, tự bổ sung hay rút gọn đều cho AI quyền đổi nội dung mà bạn không kiểm được."
      },
      {
        "question": "Bạn không quen ai biết ngôn ngữ của khách. Cách xử lý nào ổn nhất?",
        "options": [
          "Nhờ quản lý tìm người biết ngôn ngữ đó, chưa có thì chưa phát tờ dịch",
          "Vẫn phát tờ dịch nhưng ghi thêm 'bản dịch tham khảo'",
          "Phát cả tờ dịch và tờ tiếng Việt để khách tự đối chiếu",
          "Bỏ tờ dịch và nói miệng với khách khi họ đến quầy"
        ],
        "correct": 0,
        "explanation": "Khi chưa có người kiểm, chưa phát tờ dịch là an toàn nhất. 'Bản tham khảo' vẫn có thể làm khách hiểu sai, và bắt khách tự đối chiếu với tiếng Việt là đẩy việc kiểm cho người không đọc được nó."
      }
    ],
    "keyTakeaways": [
      "Dịch trôi chảy không có nghĩa là dịch đúng.",
      "Người biết ngôn ngữ đích phải đọc lại trước khi phát.",
      "Dịch ngược bằng AI không thay được người đọc.",
      "Phần dặn dò chuyên môn không dùng bản dịch tự động, do người chuyên môn soạn.",
      "Chưa có người kiểm thì chưa phát tờ dịch."
    ],
    "practicePrompt": {
      "question": "AI dịch xong tờ 'giấy tờ cần mang' sang tiếng Anh, bạn không biết tiếng Anh. Quản lý bảo phát ngay. Bạn nên nói gì?",
      "options": [
        "Nên nhờ người biết tiếng Anh đọc lại trước khi phát",
        "Phát luôn vì tờ này chỉ là danh sách giấy tờ đơn giản",
        "Nhờ AI dịch ngược sang tiếng Việt rồi tự soát là chắc chắn",
        "Rút bớt chữ trong bản dịch để giảm bớt khả năng sai sót"
      ],
      "correct": 0,
      "explanation": "Ngay cả tờ đơn giản cũng có thể sai một từ, nên vẫn cần người đọc được tiếng Anh xem lại. Dịch ngược bằng AI không phát hiện được chỗ hiểu sai từ đầu, và rút chữ có thể làm mất thông tin khách cần."
    },
    "summary": {
      "keyIdea": "AI dịch nhanh, người biết ngôn ngữ mới xác nhận nghĩa.",
      "formula": "Dịch sát nghĩa + người biết ngôn ngữ đọc lại + dặn dò chuyên môn do người chuyên môn xác nhận.",
      "commonMistake": "Tin bản dịch vì đọc trôi và phát ngay.",
      "action": "Tìm một người biết ngoại ngữ trong hoặc ngoài phòng khám để làm người đọc lại."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn một tờ hành chính đã được duyệt (ví dụ giấy tờ cần mang) và nhờ AI dịch sang ngôn ngữ khách hay gặp, dặn dịch sát nghĩa và không thêm ý. Gửi bản dịch cho một người biết ngôn ngữ đó, kèm ghi chú 'bản nháp chờ đọc lại'. Hỏi họ sửa những gì.",
      "secondary": "Ghi lại người đã đọc và ngày đọc, để sau này biết tờ nào đã có người xác nhận."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Một vị khách ít nói tiếng Việt đến quầy, chỉ vào tờ giấy và lắc đầu. Bạn muốn có tờ dịch sẵn. AI dịch trong vài giây, nhưng bạn không đọc được kết quả. Bài này dạy cách dùng mà không tin mù."
      },
      {
        "type": "feynman",
        "title": "Kiểm bản dịch đơn giản hơn bạn nghĩ",
        "intro": "Giống như bạn nhờ người quen dịch lá thư sang tiếng nước ngoài: thư viết rất đẹp, nhưng chỉ người biết tiếng đó mới biết có chỗ nào sai nghĩa.",
        "columns": [
          "Thành phần",
          "Chuyện đời thường",
          "Khi làm với AI"
        ],
        "rows": [
          [
            "Người dịch",
            "Người quen dịch nhanh",
            "AI dịch trong vài giây"
          ],
          [
            "Bạn thấy gì",
            "Một lá thư mượt mà bạn không đọc được",
            "Bản dịch trôi chảy bạn không đọc được"
          ],
          [
            "Rủi ro",
            "Sai một chữ đổi cả ý",
            "Dịch sai nghĩa mà vẫn tự tin"
          ],
          [
            "Cách kiểm",
            "Nhờ người thứ hai biết tiếng đọc lại",
            "Người biết ngôn ngữ đích đọc lại"
          ]
        ],
        "oneLiner": "Đọc trôi không phải đúng nghĩa; cần người đọc được ngôn ngữ đích xác nhận."
      },
      {
        "type": "heading",
        "text": "Vấn đề: bạn không thể tự kiểm thứ bạn không đọc được"
      },
      {
        "type": "paragraph",
        "text": "Với tiếng Anh bạn còn thử được, nhưng với tiếng Hàn hay tiếng Nhật thì bản dịch chỉ là một dãy ký tự. Đó là lúc cần người thứ hai. Và dù người đó đọc được, phần dặn dò chuyên môn vẫn phải do bác sĩ hoặc dược sĩ soạn, không đi qua dịch tự động."
      },
      {
        "type": "list",
        "items": [
          "Chỉ dịch tờ đã được duyệt bằng tiếng Việt.",
          "Dặn AI dịch sát nghĩa, giữ nguyên tên riêng và số, không thêm ý.",
          "Nhờ người biết ngôn ngữ đích đọc lại và sửa.",
          "Tách phần dặn dò chuyên môn ra: bác sĩ hoặc dược sĩ soạn và xác nhận.",
          "Ghi rõ ai đọc lại, ngày nào, rồi mới phát."
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Dùng an toàn",
          "text": "Dịch tờ đã duyệt, có người đọc lại, ghi tên và ngày. Phần chuyên môn do người có chuyên môn soạn."
        },
        "right": {
          "label": "Dùng liều",
          "text": "Dịch xong thấy trôi, phát ngay, kể cả dặn dò dùng thuốc. Khi sai nghĩa, khách là người chịu thiệt đầu tiên."
        }
      },
      {
        "type": "flow",
        "title": "Từ tờ tiếng Việt tới tờ khách cầm về",
        "steps": [
          {
            "label": "Tờ tiếng Việt đã duyệt",
            "detail": "Chỉ dịch bản đã được người có thẩm quyền duyệt. Dịch bản nháp là nhân lỗi lên hai lần."
          },
          {
            "label": "AI dịch sát nghĩa",
            "detail": "Dặn giữ nguyên tên riêng, số, ngày và không thêm ý. Dặn báo chỗ nào khó dịch."
          },
          {
            "label": "Người biết ngôn ngữ đọc",
            "detail": "Nhờ đồng nghiệp, người quen hoặc dịch giả đọc và sửa. Bạn đánh dấu những chỗ họ sửa."
          },
          {
            "label": "Tách phần chuyên môn",
            "detail": "Dặn dò về thuốc hay chăm sóc sau khám do bác sĩ hoặc dược sĩ soạn và xác nhận ngôn ngữ đó."
          },
          {
            "label": "Ghi người và ngày, rồi phát",
            "detail": "Ở chân tờ ghi 'Đã đọc lại bởi ... ngày ...'. Chưa có người đọc thì chưa phát."
          }
        ]
      },
      {
        "type": "callout",
        "label": "Phần dặn dò chuyên môn",
        "text": "Nếu tờ có câu liên quan tới thuốc, liều dùng hay chăm sóc sau khám, đừng dịch bằng AI rồi phát. Hãy nhờ bác sĩ hoặc dược sĩ soạn, và người biết ngôn ngữ đích kiểm lại."
      },
      {
        "type": "scenario",
        "title": "Vị khách nói tiếng nước ngoài đến quầy",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Chiều thứ Sáu, một nhóm khách nước ngoài hẹn khám sáng thứ Hai. Quản lý muốn có tờ 'giấy tờ cần mang' bằng ngôn ngữ của họ. Không ai trong quầy biết ngôn ngữ đó.",
            "choices": [
              {
                "label": "Nhờ AI dịch bản tiếng Việt đã duyệt và tìm người biết ngôn ngữ đó đọc lại",
                "next": "s2"
              },
              {
                "label": "Nhờ AI dịch và in luôn 30 bản để kịp thứ Hai",
                "next": "bad_print"
              }
            ]
          },
          "bad_print": {
            "text": "Tờ dịch có một câu bị hiểu sai nghĩa; khách mang thiếu giấy tờ và mất buổi sáng. Không ai đọc được tờ để biết lỗi nằm ở đâu.",
            "ending": "bad"
          },
          "s2": {
            "text": "Một đồng nghiệp biết ngôn ngữ đó đọc lại và sửa hai chỗ dịch cứng. Còn một đoạn dặn dò dùng thuốc sau khám mà quản lý muốn thêm.",
            "choices": [
              {
                "label": "Nhờ bác sĩ soạn đoạn thuốc, rồi người biết ngôn ngữ kiểm lại",
                "next": "good"
              },
              {
                "label": "Nhờ AI dịch đoạn dặn thuốc luôn cho tiện",
                "next": "bad_med"
              }
            ]
          },
          "bad_med": {
            "text": "AI dịch sai một cụm trong đoạn dặn về thuốc, và không có ai đủ chuyên môn xem. Khách hiểu sai và phải quay lại phòng khám.",
            "ending": "bad"
          },
          "good": {
            "text": "Tờ giấy tờ được đồng nghiệp xác nhận, đoạn dặn thuốc do bác sĩ soạn và người biết ngôn ngữ kiểm. Chân tờ ghi tên người đọc lại và ngày đọc.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "AI dịch nhanh; người biết ngôn ngữ mới xác nhận nghĩa.",
          "Bài sau: dự án nhỏ, bộ ba tờ hướng dẫn được người có chuyên môn duyệt."
        ]
      }
    ]
  },
  {
    "id": 2189,
    "slug": "phong-kham-du-an-nho-bo-to-huong-dan-ba-trang",
    "title": "Chặng 39, Bài 10: Dự án nhỏ: bộ ba tờ hướng dẫn được người có chuyên môn duyệt",
    "subtitle": "Ba tờ, mỗi tờ một nhãn 'bản nháp chờ duyệt' và một cái tên người duyệt.",
    "duration": "10 phút",
    "difficulty": "Dễ",
    "emoji": "🗂️",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Sau ba bài về giấy tờ, bảng giá và bản dịch, bạn có đủ để làm một bộ tờ hướng dẫn dùng thật ở quầy. Điều khiến bộ tờ đáng tin không phải chữ đẹp mà là nhãn duyệt: ai xem, ngày nào, dựa trên nguồn nào.",
    "openingQuestion": "Bạn làm xong ba tờ hướng dẫn (giấy tờ, thanh toán, đổi lịch) bằng AI. Trước khi in, điều gì bắt buộc phải có trên mỗi tờ?",
    "openingOptions": [
      "Nhãn bản nháp, người duyệt và ngày duyệt",
      "Logo phòng khám phóng to để tờ nhìn chuyên nghiệp",
      "Dòng chữ 'Do AI soạn' ở cuối để khỏi bị hỏi",
      "Số trang để tờ có vẻ đầy đủ như tài liệu chính thức"
    ],
    "correctOption": 0,
    "explanation": "Tờ chưa duyệt là bản nháp, và nhãn 'bản nháp chờ duyệt' giữ nó không bị phát nhầm. Tên và ngày duyệt cho biết ai chịu trách nhiệm và khi nào cần làm lại. Logo hay số trang không làm tờ đáng tin hơn, còn 'Do AI soạn' cho biết công cụ chứ không cho biết có người có chuyên môn đã kiểm hay chưa.",
    "diagram": [
      {
        "label": "Xác định ba tờ và nguồn thông tin chính thức",
        "arrow": true
      },
      {
        "label": "AI soạn nháp từ nguồn bạn cung cấp",
        "arrow": true
      },
      {
        "label": "Bạn gắn nhãn bản nháp và đối chiếu với nguồn",
        "arrow": true
      },
      {
        "label": "Người có chuyên môn duyệt, ghi tên và ngày"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Một quầy lễ tân làm ba tờ: giấy tờ cần mang, cách thanh toán, cách đổi lịch. Mỗi tờ có dòng 'Bản nháp chờ duyệt - người duyệt: ... - ngày: ...'. Chỉ khi quản lý điền tên và ngày, tờ mới được in. Nhờ vậy tờ cũ không bị phát nhầm khi thông tin thay đổi."
    },
    "quiz": [
      {
        "question": "Nhãn 'bản nháp chờ duyệt' trên tờ hướng dẫn dùng để làm gì?",
        "options": [
          "Ngăn tờ chưa duyệt bị in và phát nhầm",
          "Làm tờ có vẻ chính thức hơn với người bệnh",
          "Báo cho người bệnh rằng tờ do AI soạn",
          "Giảm trách nhiệm của quầy nếu tờ có sai sót"
        ],
        "correct": 0,
        "explanation": "Nhãn giữ tờ ở trạng thái nháp cho tới khi có người duyệt. Nó không để trang trí, không dùng để thoái thác trách nhiệm, và người bệnh chỉ nên nhận tờ đã bỏ nhãn."
      },
      {
        "question": "Ba tờ (giấy tờ, thanh toán, đổi lịch) cần thông tin từ đâu?",
        "options": [
          "Từ người phụ trách phòng khám, dán vào cho AI trình bày",
          "Từ mô tả chung mà AI tự viết cho các phòng khám",
          "Từ tờ của một phòng khám khác đổi tên lại",
          "Từ trí nhớ của bạn về những lần người bệnh hỏi"
        ],
        "correct": 0,
        "explanation": "Cách thanh toán hay chính sách đổi lịch là quyết định của riêng phòng khám. AI, phòng khác hay trí nhớ của bạn đều không phải nguồn chính thức, và nội dung lấy từ đó dễ khác quy định thật."
      },
      {
        "question": "AI ghi trong tờ thanh toán 'nhận cả thẻ và ví điện tử'. Phòng khám chỉ nhận tiền mặt và chuyển khoản. Đây là gì?",
        "options": [
          "Chi tiết AI tự thêm, phải xoá vì không có trong nguồn",
          "Gợi ý hay, có thể giữ lại để mở rộng dịch vụ sau này nếu có",
          "Lỗi chính tả nên chỉ cần sửa lại chữ cho đúng",
          "Thông tin phụ nên có hay không cũng không sao"
        ],
        "correct": 0,
        "explanation": "Nguồn nói chỉ nhận tiền mặt và chuyển khoản, nên dòng thẻ và ví điện tử là chữ AI thêm. Người bệnh có thể đến với thẻ và bị từ chối, nên đây không phải gợi ý, lỗi chính tả hay chi tiết phụ."
      },
      {
        "question": "Vì sao mỗi tờ nên ghi ngày duyệt?",
        "options": [
          "Để biết khi quy định đổi thì tờ nào đã cũ",
          "Để người bệnh biết tờ mới in hôm nay",
          "Để tờ đủ dài cho đầy một trang giấy khổ A4 chuẩn",
          "Để tránh phải ghi tên người duyệt"
        ],
        "correct": 0,
        "explanation": "Ngày duyệt cho biết tờ dựa trên thông tin vào thời điểm nào, nên khi giờ mở cửa hay chính sách đổi thì bạn biết tờ nào cần làm lại. Nó không thay cho tên người duyệt."
      },
      {
        "question": "Người duyệt cần làm gì khi xem một tờ?",
        "options": [
          "So nội dung tờ với quy định thật rồi ký nếu khớp",
          "Đọc thấy mượt và dễ hiểu thì ký",
          "Nhờ AI tóm tắt tờ rồi ký theo bản tóm tắt",
          "Chỉ xem tiêu đề và cuối tờ rồi ký"
        ],
        "correct": 0,
        "explanation": "Người duyệt phải đối chiếu nội dung với quy định thật, vì chữ trôi chảy của AI không chứng minh nội dung đúng. Đọc tiêu đề hay xem bản AI tóm tắt cũng bỏ qua chỗ sai nằm giữa tờ."
      }
    ],
    "keyTakeaways": [
      "Mỗi tờ ghi 'bản nháp chờ duyệt', người duyệt và ngày duyệt.",
      "Nội dung từ người phụ trách, AI chỉ trình bày.",
      "Dòng AI tự thêm thì xoá, dù nghe hợp lý.",
      "Người duyệt so tờ với quy định thật, không chỉ đọc cho mượt.",
      "Khi quy định đổi, làm lại tờ từ nguồn mới."
    ],
    "practicePrompt": {
      "question": "Bạn có ba tờ nháp. Quản lý mới xem một tờ và bảo 'hai tờ kia giống vậy, in luôn đi'. Nên làm gì?",
      "options": [
        "Xin quản lý duyệt riêng từng tờ trước khi in",
        "In cả ba vì quản lý đã nói và đã xem tờ đầu",
        "Bỏ nhãn nháp của hai tờ kia rồi in cho nhanh",
        "In hai tờ đó nhưng ghi thêm 'bản tham khảo'"
      ],
      "correct": 0,
      "explanation": "Mỗi tờ có nội dung khác, và duyệt một tờ không bảo đảm hai tờ kia đúng. Bỏ nhãn hoặc ghi 'bản tham khảo' đều làm tờ chưa duyệt lọt ra ngoài mà trông như đã duyệt."
    },
    "summary": {
      "keyIdea": "Bộ tờ đáng tin nhờ nguồn chính thức, nhãn duyệt và người chịu trách nhiệm.",
      "formula": "Nguồn từ phòng khám + AI trình bày + đối chiếu + người duyệt ghi tên và ngày.",
      "commonMistake": "In tờ vì trông đẹp, chưa có ai duyệt.",
      "action": "Làm ba tờ nháp và gửi người phụ trách duyệt từng tờ."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn ba tờ cần nhất ở quầy của bạn (ví dụ giấy tờ, thanh toán, đổi lịch). Xin nguồn thông tin chính thức cho từng tờ, dán vào AI và xin bản nháp một trang. Ghi 'Bản nháp chờ duyệt - người duyệt: ... - ngày: ...' ở chân mỗi tờ, rồi gửi người phụ trách.",
      "secondary": "Ngày mai ghi lại tờ nào đã có người duyệt, tờ nào còn chờ."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bạn đã làm được từng tờ riêng lẻ. Bài này gom lại thành một bộ ba tờ, và thêm thứ khiến chúng dùng được ở quầy: nhãn duyệt. Đó là khác biệt giữa một tờ nháp và một tờ chính thức."
      },
      {
        "type": "feynman",
        "title": "Nhãn duyệt đơn giản hơn bạn nghĩ",
        "intro": "Giống như biên lai có chữ ký thủ quỹ: tờ giấy ai cũng in được, nhưng chữ ký cho biết đã có người chịu trách nhiệm về những gì ghi trên đó.",
        "columns": [
          "Thành phần",
          "Chuyện đời thường",
          "Khi làm với AI"
        ],
        "rows": [
          [
            "Ai làm ra",
            "Nhân viên viết biên lai",
            "Bạn và AI soạn nháp"
          ],
          [
            "Ai xác nhận",
            "Thủ quỹ ký",
            "Người phụ trách ký duyệt"
          ],
          [
            "Nhãn cho biết",
            "Đã ký hay chưa",
            "Bản nháp hay bản đã duyệt"
          ],
          [
            "Khi thay đổi",
            "Lập biên lai mới",
            "Làm lại tờ và duyệt lại"
          ]
        ],
        "oneLiner": "Tờ chưa có người duyệt vẫn chỉ là bản nháp, dù nhìn rất đẹp."
      },
      {
        "type": "heading",
        "text": "Ba tờ, ba nguồn, ba người có thể duyệt"
      },
      {
        "type": "paragraph",
        "text": "Tờ giấy tờ cần mang lấy từ danh sách của phòng khám. Tờ thanh toán lấy từ chính sách thu tiền. Tờ đổi lịch lấy từ quy định đổi và huỷ. Bạn không cần biết chi tiết chuyên môn, chỉ cần xin đúng nguồn và đúng người duyệt."
      },
      {
        "type": "list",
        "items": [
          "Tờ 1: giấy tờ cần mang, nguồn là danh sách chính thức.",
          "Tờ 2: cách thanh toán, nguồn là chính sách thu tiền của phòng khám.",
          "Tờ 3: đổi lịch, nguồn là quy định đổi và huỷ lịch.",
          "Mỗi tờ ghi 'Bản nháp chờ duyệt', người duyệt và ngày duyệt.",
          "Chỉ in tờ đã có tên và ngày duyệt."
        ]
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Soạn tờ hướng dẫn thanh toán",
        "task": "Nguồn từ quản lý: 'Phòng khám nhận tiền mặt và chuyển khoản. Thanh toán tại quầy sau khi khám. Xuất hoá đơn khi khách yêu cầu tại quầy.' Lắp prompt để AI soạn tờ thanh toán một trang.",
        "parts": [
          {
            "id": "src",
            "label": "Nguồn",
            "options": [
              {
                "text": "Viết tờ hướng dẫn thanh toán cho phòng khám.",
                "feedback": "Không có nguồn, AI sẽ tự bịa hình thức thanh toán, có thể là thứ phòng khám không nhận."
              },
              {
                "text": "Nguồn: 'Phòng khám nhận tiền mặt và chuyển khoản. Thanh toán tại quầy sau khi khám. Xuất hoá đơn khi khách yêu cầu tại quầy.'",
                "good": true,
                "feedback": "Có nguyên văn nguồn nên AI làm việc trên chữ của phòng khám."
              }
            ]
          },
          {
            "id": "limit",
            "label": "Giới hạn",
            "options": [
              {
                "text": "Chỉ dùng thông tin trong nguồn, không thêm hình thức thanh toán hay ưu đãi.",
                "good": true,
                "feedback": "Chặn đúng chỗ AI hay bịa là thêm hình thức thanh toán."
              },
              {
                "text": "Hãy viết đầy đủ để khách không hỏi thêm.",
                "feedback": "'Đầy đủ' mời AI thêm chi tiết như thẻ, ví điện tử hay trả góp mà phòng khám không có."
              }
            ]
          },
          {
            "id": "label",
            "label": "Nhãn",
            "options": [
              {
                "text": "Ghi ở đầu tờ: 'Bản nháp chờ duyệt - người duyệt: ..., ngày: ...'.",
                "good": true,
                "feedback": "Nhãn giữ tờ khỏi bị in nhầm trước khi có người ký."
              },
              {
                "text": "Ghi ở cuối tờ: 'Do AI soạn'.",
                "feedback": "Chỉ cho biết công cụ, không nói tờ đã có người kiểm hay chưa."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "src",
              "limit",
              "label"
            ],
            "text": "BẢN NHÁP CHỜ DUYỆT - người duyệt: ..., ngày: ...\n\nCách thanh toán\n- Thanh toán tại quầy sau khi khám.\n- Nhận tiền mặt và chuyển khoản.\n- Cần hoá đơn: báo với quầy khi thanh toán.\n\n(Chỉ dùng thông tin trong nguồn, có nhãn nháp.)"
          },
          {
            "requires": [
              "src"
            ],
            "text": "Cách thanh toán\n- Thanh toán tại quầy, nhận tiền mặt và chuyển khoản.\n- Xuất hoá đơn khi khách yêu cầu.\n\n(Đúng nội dung nhưng không có nhãn nháp, nên tờ có thể bị in mà chưa ai duyệt.)"
          },
          {
            "text": "Cách thanh toán\n- Chúng tôi nhận tiền mặt, chuyển khoản, thẻ và ví điện tử.\n- Có thể trả góp 0% cho dịch vụ trên 2.000.000 đồng.\n\n(Không có nguồn, AI bịa thẻ, ví điện tử và trả góp.)"
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Tờ đã sẵn sàng",
          "text": "Có nguồn chính thức, đã đối chiếu từng dòng, ghi tên và ngày duyệt. Bỏ nhãn nháp chỉ sau khi người duyệt đồng ý."
        },
        "right": {
          "label": "Tờ chưa sẵn sàng",
          "text": "Nhìn đẹp nhưng nội dung lấy từ trí nhớ hoặc từ AI, chưa có ai xem. Nếu in thì khách là người phát hiện lỗi đầu tiên."
        }
      },
      {
        "type": "flow",
        "title": "Từ ba tờ nháp tới ba tờ dùng được",
        "steps": [
          {
            "label": "Xin nguồn cho từng tờ",
            "detail": "Với mỗi tờ xin danh sách hoặc chính sách chính thức, ghi rõ ai cung cấp và ngày nào."
          },
          {
            "label": "AI soạn nháp",
            "detail": "Dán nguồn, dặn chỉ dùng thông tin trong đó, xin bản một trang, chữ to."
          },
          {
            "label": "Gắn nhãn nháp",
            "detail": "Đầu mỗi tờ ghi 'Bản nháp chờ duyệt', kèm chỗ trống cho tên người duyệt và ngày."
          },
          {
            "label": "Đối chiếu",
            "detail": "Đặt từng tờ cạnh nguồn, gạch từng dòng khớp, xoá dòng lạ."
          },
          {
            "label": "Người duyệt ký",
            "detail": "Người phụ trách xem, điền tên và ngày. Chỉ sau đó bạn bỏ nhãn nháp và in."
          }
        ]
      },
      {
        "type": "callout",
        "label": "Tên người duyệt",
        "text": "Tên người duyệt không phải thủ tục cho có. Khi khách hỏi vì sao tờ ghi vậy, bạn cần biết hỏi ai. Nếu người duyệt nghỉ việc hay đổi quy định, ngày duyệt cho biết phải làm lại."
      },
      {
        "type": "scenario",
        "title": "Ba tờ trước giờ khai trương",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Phòng khám mở thêm quầy mới vào thứ Hai. Quản lý nhờ bạn có ba tờ nháp trên quầy chiều nay. Bạn có nguồn cho hai tờ, còn tờ đổi lịch chưa có.",
            "choices": [
              {
                "label": "Làm hai tờ có nguồn, xin nguồn cho tờ đổi lịch rồi mới làm",
                "next": "s2"
              },
              {
                "label": "Nhờ AI viết luôn tờ đổi lịch 'theo thông lệ' cho đủ ba tờ",
                "next": "bad_invent"
              }
            ]
          },
          "bad_invent": {
            "text": "AI viết 'huỷ trước 12 giờ không mất phí', phòng khám không có quy định này. Người bệnh dựa vào tờ để đòi, và quầy phải giải thích.",
            "ending": "bad"
          },
          "s2": {
            "text": "Quản lý gửi chính sách đổi lịch. Bạn nhờ AI soạn từ đó, gắn nhãn nháp và đối chiếu.",
            "choices": [
              {
                "label": "Gửi quản lý duyệt cả ba, chỉ in tờ có tên và ngày duyệt",
                "next": "good"
              },
              {
                "label": "In cả ba trước cho kịp giờ, duyệt sau",
                "next": "bad_early"
              }
            ]
          },
          "bad_early": {
            "text": "Một tờ có câu AI thêm về tiền đặt cọc. Tờ đã phát ra ba mươi bản trước khi quản lý duyệt, và quầy phải thu hồi.",
            "ending": "bad"
          },
          "good": {
            "text": "Ba tờ được duyệt, có tên và ngày. Quầy phát đúng ba tờ, và ba tháng sau khi chính sách đổi, ngày duyệt giúp bạn biết cần làm lại tờ nào.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Bộ ba tờ đáng tin nhờ nguồn, nhãn nháp và tên người duyệt.",
          "Bài sau: quầy thuốc, nơi lời dặn phải bám đúng tờ hướng dẫn in sẵn trong hộp."
        ]
      }
    ]
  }
];
