import type { Lesson } from "../lesson-types";

// Chặng 46, bài 1-5. Giáo trình: scripts/curriculum/stage-46.json.
export const S46_A_LESSONS: Lesson[] = [
  {
    "duration": "8 phút",
    "difficulty": "Dễ",
    "track": "personal",
    "isFundamental": false,
    "id": 2320,
    "slug": "anh-cho-ban-tin-noi-bo-mo-ta-truoc-khi-tao",
    "title": "Chặng 46, Bài 1: Cần một ảnh cho bản tin nội bộ: mô tả trước khi tạo",
    "subtitle": "Nhờ AI vẽ mà chỉ nói 'một ảnh đẹp' thì cũng như dặn thợ chụp ảnh 'chụp cái gì đó'.",
    "emoji": "🖼️",
    "whyItMatters": "Bản tin phòng cần một ảnh minh hoạ vào chiều thứ Năm, mà kho ảnh công ty không có tấm nào hợp. Công cụ tạo ảnh bằng AI làm được trong vài phút, nhưng chất lượng phụ thuộc gần hết vào đoạn mô tả bạn viết. Viết mô tả đủ ba phần giúp bạn có ảnh dùng được sau một hai lượt thử, thay vì mười lượt.",
    "openingQuestion": "Bạn gõ vào công cụ tạo ảnh: \"một ảnh đẹp cho bản tin tháng 10\". Kết quả là một bức tranh rực rỡ chẳng liên quan gì tới phòng bạn. Điều gì thiếu nhất?",
    "openingOptions": [
      "Mô tả cụ thể: ai hoặc vật gì, ở đâu, theo phong cách nào",
      "Thêm chữ \"siêu nét, chất lượng cao nhất\" để ảnh đẹp hơn",
      "Gõ câu dài gấp ba lần, thêm thật nhiều tính từ khen",
      "Đổi sang công cụ khác, vì công cụ này không hiểu tiếng Việt"
    ],
    "correctOption": 0,
    "explanation": "Công cụ tạo ảnh không biết phòng bạn làm gì, bản tin nói về điều gì, hay bạn muốn ảnh thật hay tranh vẽ. Thiếu thông tin, nó tự chọn theo thói quen nhiều người hay mô tả: rực rỡ, bóng bẩy, chung chung. Thêm chữ 'siêu nét' hay tính từ khen không cho nó thêm thông tin nào về nội dung. Ba phần chủ thể, bối cảnh, phong cách mới là thứ nó cần để vẽ đúng ý bạn.",
    "diagram": [
      {
        "label": "Bạn nghĩ ra ý cần minh hoạ",
        "arrow": true
      },
      {
        "label": "Viết mô tả: chủ thể, bối cảnh, phong cách",
        "arrow": true
      },
      {
        "label": "Tạo ba bản và so cạnh nhau",
        "arrow": true
      },
      {
        "label": "Chọn một bản, sửa mô tả nếu cần, rồi kiểm tra"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Một nhân viên hành chính cần ảnh cho mục 'An toàn tại văn phòng' của bản tin. Lần đầu cô gõ 'ảnh an toàn lao động' và nhận về công nhân đội mũ bảo hộ ở công trường, trong khi phòng cô là văn phòng. Lần hai cô mô tả 'hai đồng nghiệp đang kiểm tra bình chữa cháy ở hành lang văn phòng, tranh minh hoạ phẳng, tông xanh dương' và được ảnh dùng được ngay. Đây là tình huống dựng để minh hoạ, không phải một vụ việc có thật."
    },
    "quiz": [
      {
        "question": "Mô tả ảnh nên có những phần nào trước tiên?",
        "options": [
          "Chủ thể, bối cảnh, phong cách và tỷ lệ khung",
          "Chỉ chủ đề chung như 'an toàn lao động', vì AI sẽ tự chọn phần còn lại",
          "Một dãy tính từ khen như 'đẹp, sang, ấn tượng, hiện đại, chuyên nghiệp'",
          "Tên công ty và khẩu hiệu, để AI vẽ đúng thương hiệu của bạn"
        ],
        "correct": 0,
        "explanation": "Bốn phần này cho AI biết vẽ gì, ở đâu, kiểu nào và cắt khung ra sao. Chủ đề chung để AI tự chọn thì nó chọn theo thói quen, thường là cảnh công trường hay văn phòng bóng bẩy. Tính từ khen không chứa thông tin nào. Tên công ty không đủ để nó hiểu hình ảnh bạn cần."
      },
      {
        "question": "Vì sao nên tạo ba bản rồi so, thay vì chỉ lấy bản đầu tiên?",
        "options": [
          "Cùng một mô tả cho ra mỗi lần một kết quả khác nhau",
          "Ba bản luôn rẻ hơn một bản vì công cụ tính gộp theo gói ba ảnh",
          "Chỉ bản thứ ba mới được công cụ làm kỹ hơn hai bản trước",
          "Công cụ yêu cầu phải có ba bản mới cho tải ảnh về"
        ],
        "correct": 0,
        "explanation": "Mỗi lần tạo, công cụ chọn ngẫu nhiên một cách vẽ khác, nên ba bản từ cùng mô tả khác nhau thật. So cạnh nhau bạn thấy ngay bản nào đúng ý. Chuyện giá hay thứ tự bản không phải quy luật chung, và không công cụ nào bắt buộc ba bản mới cho tải."
      },
      {
        "question": "Ảnh ra sai ở chỗ con người cầm vật gì đó. Cách sửa hiệu quả nhất là gì?",
        "options": [
          "Nói rõ hơn đúng chỗ sai: 'tay phải cầm một bình chữa cháy màu đỏ'",
          "Gõ lại y nguyên và hy vọng lần sau ngẫu nhiên ra đúng ý mình",
          "Xoá hết mô tả, chỉ để lại hai chữ 'người' và 'bình' cho AI tự vẽ lại",
          "Thêm câu 'không được sai' vào cuối mô tả cũ"
        ],
        "correct": 0,
        "explanation": "Sửa đúng chỗ sai bằng chi tiết cụ thể cho AI điều cần vẽ. Gõ lại y nguyên là đánh cược. Xoá bớt mô tả làm AI mất thông tin nên sai nhiều hơn. Câu 'không được sai' không nói sai ở đâu, nên AI không có gì để sửa."
      },
      {
        "question": "Bản tin cần tranh minh hoạ phẳng, dễ chịu. Phần nào của mô tả quyết định điều đó?",
        "options": [
          "Phong cách: 'tranh minh hoạ phẳng, tông xanh dịu'",
          "Chủ thể: 'hai đồng nghiệp đang trò chuyện'",
          "Bối cảnh: 'trong một văn phòng mở có nhiều cây xanh'",
          "Tỷ lệ khung: 'ảnh ngang 16:9 cho đầu bài'"
        ],
        "correct": 0,
        "explanation": "Phong cách nói ảnh trông thế nào: ảnh chụp, tranh phẳng, màu nước. Chủ thể nói vẽ ai hay vật gì, bối cảnh nói vẽ ở đâu. Tỷ lệ chỉ quyết định hình chữ nhật của khung. Bốn phần bổ sung cho nhau nhưng không thay nhau."
      },
      {
        "question": "Trước khi đưa ảnh AI vào bản tin gửi cả phòng, việc nào nên làm?",
        "options": [
          "Xem kỹ ảnh: tay, chữ, đồ vật có thật và có đúng ý không",
          "Chỉ cần nhìn màu sắc, vì AI luôn vẽ hình đúng",
          "Gửi luôn, vì người đọc sẽ tự bỏ qua lỗi nhỏ trong ảnh như vậy",
          "Nhờ chính công cụ tạo ảnh xác nhận ảnh đã đúng"
        ],
        "correct": 0,
        "explanation": "Ảnh AI hay lỗi ở những chi tiết nhỏ như số ngón tay, chữ trên bảng, vật cầm trên tay, và lỗi đó vẫn đập vào mắt người đọc. Công cụ không tự kiểm được bản vẽ của chính nó theo ý bạn. Vì vậy người đưa ảnh vào bản tin phải nhìn kỹ từng chỗ trước khi gửi."
      }
    ],
    "keyTakeaways": [
      "Mô tả ảnh gồm ba phần: chủ thể, bối cảnh, phong cách.",
      "Càng cụ thể về nội dung càng tốt; tính từ khen không thêm thông tin.",
      "Tạo ba bản rồi so, vì mỗi lần ra một kết quả khác.",
      "Sửa đúng chỗ sai bằng chi tiết cụ thể, không gõ lại y nguyên.",
      "Nhìn kỹ tay, chữ, đồ vật trước khi đưa ảnh vào tài liệu."
    ],
    "practicePrompt": {
      "question": "Bạn cần ảnh cho mục 'Chào mừng đồng nghiệp mới' của bản tin. Đoạn mô tả nào dùng được ngay?",
      "options": [
        "Một nhân viên đang bắt tay đồng nghiệp mới ở quầy lễ tân, tranh phẳng tông cam",
        "Ảnh chào mừng đồng nghiệp mới thật đẹp, thật ấm áp, thật chuyên nghiệp và thật cuốn hút",
        "Chào mừng, đồng nghiệp, mới, bản tin, tháng 10, công ty",
        "Một bức ảnh giống hệt ảnh bìa bản tin tháng trước"
      ],
      "correct": 0,
      "explanation": "Mô tả đầu có chủ thể (nhân viên bắt tay đồng nghiệp mới), bối cảnh (quầy lễ tân) và phong cách (tranh phẳng tông cam). Mô tả hai chỉ có tính từ. Mô tả ba là dãy từ khoá rời, AI phải đoán cả mối quan hệ giữa chúng. Mô tả bốn đòi sao chép một ảnh mà AI chưa từng thấy."
    },
    "summary": {
      "keyIdea": "Ảnh AI đúng ý bắt đầu từ mô tả cụ thể, không phải từ công cụ xịn.",
      "formula": "Mô tả = chủ thể + bối cảnh + phong cách. Tạo ba bản, chọn một, kiểm chi tiết.",
      "commonMistake": "Gõ câu chung chung rồi trách công cụ vẽ không đúng ý.",
      "action": "Viết mô tả ba phần cho một ảnh bạn thật sự cần tuần này."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn một ảnh bạn cần cho email, bản tin hoặc slide tuần này. Viết mô tả có đủ chủ thể, bối cảnh, phong cách vào ghi chú, tạo ba bản, chọn một và ghi lại mô tả đã dùng. Soi kỹ tay, chữ và đồ vật trong ảnh trước khi dùng.",
      "secondary": "Hôm sau bạn sẽ được hỏi: mô tả nào cho ảnh dùng được ngay?"
    },
    "sections": [
      {
        "type": "lead",
        "text": "Chiều thứ Năm, bản tin phòng còn thiếu đúng một tấm ảnh minh hoạ. Kho ảnh công ty không có, chụp thì không kịp. Bài này dạy cách viết mô tả để AI vẽ đúng ý ngay lần đầu."
      },
      {
        "type": "feynman",
        "title": "Mô tả ảnh đơn giản hơn bạn nghĩ",
        "intro": "Hình dung bạn nhờ một hoạ sĩ ngoài phố vẽ tranh. Nếu chỉ nói 'vẽ cái gì đẹp đẹp', họ vẽ hoa hoặc phong cảnh quen tay. Muốn đúng ý, bạn phải nói vẽ ai, ở đâu, kiểu nào.",
        "columns": [
          "Thành phần",
          "Ví dụ đời thường",
          "Trong bài này"
        ],
        "rows": [
          [
            "Vẽ ai hay vật gì",
            "Hoạ sĩ hỏi 'vẽ chân dung hay vẽ cảnh?'",
            "Chủ thể: hai đồng nghiệp kiểm tra bình chữa cháy"
          ],
          [
            "Vẽ ở đâu",
            "Trong quán cà phê hay ngoài bãi biển?",
            "Bối cảnh: hành lang văn phòng buổi sáng"
          ],
          [
            "Vẽ kiểu nào",
            "Tranh sơn dầu, tranh màu nước hay tranh phẳng",
            "Phong cách: minh hoạ phẳng, tông xanh dương"
          ]
        ],
        "oneLiner": "Mô tả ảnh là dặn hoạ sĩ: vẽ ai, ở đâu, kiểu nào."
      },
      {
        "type": "heading",
        "text": "Vấn đề: một tấm ảnh, ba phút, và một công cụ không đọc được ý bạn"
      },
      {
        "type": "paragraph",
        "text": "Công cụ tạo ảnh đọc mô tả của bạn rồi vẽ một bức chưa từng tồn tại. Nó không biết bản tin của bạn nói gì. Phần bạn không nói, nó điền bằng thói quen chung: màu rực, bố cục bóng bẩy, người cười kiểu quảng cáo. Vì vậy thứ quyết định ảnh đúng ý hay không là đoạn mô tả, không phải công cụ nào."
      },
      {
        "type": "flow",
        "title": "Từ ý tưởng tới một ảnh dùng được",
        "steps": [
          {
            "label": "Nói ý bằng một câu",
            "detail": "Viết ra ảnh này để minh hoạ điều gì trong bản tin. Nếu chưa nói được bằng một câu thì chưa nên tạo."
          },
          {
            "label": "Điền ba phần",
            "detail": "Chủ thể, bối cảnh, phong cách. Mỗi phần một cụm ngắn, cụ thể, không tính từ khen."
          },
          {
            "label": "Tạo ba bản",
            "detail": "Cùng một mô tả cho ra những bản khác nhau. Đặt cạnh nhau để so."
          },
          {
            "label": "Chọn và sửa một chỗ",
            "detail": "Chọn bản gần nhất, chỉ sửa đúng chỗ chưa ưng bằng chi tiết cụ thể."
          },
          {
            "label": "Soi chi tiết rồi mới dùng",
            "detail": "Nhìn tay, chữ, đồ vật, nền. Chỗ nào lạ thì sửa hoặc bỏ."
          }
        ]
      },
      {
        "type": "list",
        "items": [
          "Chủ thể: ai hoặc vật gì, làm gì. Ví dụ: hai đồng nghiệp đang kiểm tra bình chữa cháy.",
          "Bối cảnh: ở đâu, lúc nào. Ví dụ: hành lang văn phòng buổi sáng.",
          "Phong cách: ảnh chụp hay tranh vẽ, màu gì. Ví dụ: minh hoạ phẳng, tông xanh dương.",
          "Khung: ngang hay dọc, để chừa chỗ đặt tiêu đề nếu cần."
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Mô tả mơ hồ",
          "text": "'Ảnh đẹp cho bản tin tháng 10.' AI phải đoán chủ đề, bối cảnh và kiểu vẽ, nên kết quả thường chung chung hoặc lạc đề."
        },
        "right": {
          "label": "Mô tả ba phần",
          "text": "'Hai đồng nghiệp kiểm tra bình chữa cháy ở hành lang văn phòng, minh hoạ phẳng, tông xanh dương, khung ngang.' AI có đủ dữ kiện để vẽ đúng ý."
        }
      },
      {
        "type": "callout",
        "label": "Nhìn kỹ trước khi dùng",
        "text": "Ảnh AI đẹp ở cái nhìn đầu nhưng hay sai ở chi tiết nhỏ: bàn tay, chữ trên bảng, vật đang cầm. Người gửi bản tin là bạn, nên người chịu trách nhiệm cho chi tiết lạ trong ảnh cũng là bạn."
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Viết mô tả ảnh cho mục An toàn tại văn phòng",
        "task": "Bản tin cần một ảnh cho mục 'An toàn tại văn phòng': nhắc mọi người biết vị trí bình chữa cháy. Ghép ba phần mô tả để AI tạo bản nháp.",
        "parts": [
          {
            "id": "subject",
            "label": "Chủ thể",
            "options": [
              {
                "text": "Một ảnh về an toàn.",
                "feedback": "AI chưa biết vẽ ai hay vật gì, nên chọn đại, thường ra công nhân công trường."
              },
              {
                "text": "Hai đồng nghiệp đang chỉ vào một bình chữa cháy treo trên tường.",
                "good": true,
                "feedback": "Có người, có hành động, có vật chính - đúng điều bản tin muốn nhắc."
              }
            ]
          },
          {
            "id": "scene",
            "label": "Bối cảnh",
            "options": [
              {
                "text": "Ở hành lang một văn phòng buổi sáng, có cửa kính và cây xanh.",
                "good": true,
                "feedback": "Nói rõ là văn phòng, nên AI không vẽ nhầm sang công trường hay nhà máy."
              },
              {
                "text": "Ở một nơi nào đó an toàn và đẹp.",
                "feedback": "'Nơi nào đó' là ô trống để AI tự điền, thường theo hướng bóng bẩy và xa thực tế."
              }
            ]
          },
          {
            "id": "style",
            "label": "Phong cách",
            "options": [
              {
                "text": "Thật đẹp, thật ấn tượng, thật chuyên nghiệp.",
                "feedback": "Ba tính từ khen không cho biết ảnh chụp hay tranh vẽ, màu nào, nên AI chọn theo thói quen."
              },
              {
                "text": "Tranh minh hoạ phẳng, tông xanh dương, ảnh ngang.",
                "good": true,
                "feedback": "Kiểu vẽ, màu và khung đều rõ, dễ đặt cạnh tiêu đề bản tin."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "subject",
              "scene",
              "style"
            ],
            "text": "Bản nháp: tranh phẳng tông xanh, hai người mặc áo sơ mi đứng ở hành lang có cửa kính, một người đưa tay chỉ bình chữa cháy màu đỏ trên tường. Khung ngang, còn chỗ trống phía trên để đặt tiêu đề. (Dùng được sau khi soi tay và bình chữa cháy.)"
          },
          {
            "requires": [
              "subject",
              "scene"
            ],
            "text": "Bản nháp: hai người trong hành lang văn phòng chỉ vào bình chữa cháy, nhưng kiểu vẽ lại là ảnh bóng bẩy kiểu quảng cáo, màu rực, không hợp giọng bản tin. (Đủ nội dung nhưng thiếu phong cách nên lệch tông.)"
          },
          {
            "text": "Bản nháp: một công nhân đội mũ bảo hộ vàng đứng giữa công trường, phía sau có dấu tích lửa. (AI tự bịa bối cảnh vì mô tả chỉ nói 'an toàn'. Không liên quan tới văn phòng của bạn.)"
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Ba bản ảnh, một giờ trước hạn gửi bản tin",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn đã tạo ba bản từ cùng một mô tả. Bản A đẹp nhất nhưng người trong ảnh có sáu ngón tay. Bản B hơi đơn giản, đúng ý. Bản C có biển chữ lạ trên tường. Còn một giờ.",
            "choices": [
              {
                "label": "Chọn bản A vì đẹp nhất, gửi luôn",
                "next": "bad_a"
              },
              {
                "label": "Phóng to từng bản, soi tay và chữ, rồi chọn",
                "next": "s2"
              }
            ]
          },
          "bad_a": {
            "text": "Bản tin gửi đi. Buổi chiều cả phòng bàn tán về bàn tay sáu ngón, và ảnh minh hoạ an toàn thành trò đùa.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bản B sạch lỗi nhưng bình chữa cháy nhìn hơi mờ. Bạn còn thời gian cho thêm một lượt.",
            "choices": [
              {
                "label": "Gõ lại mô tả thật dài, thêm mười tính từ khen",
                "next": "bad_long"
              },
              {
                "label": "Giữ mô tả, thêm 'bình chữa cháy màu đỏ, rõ nét, treo ở chính giữa'",
                "next": "good"
              }
            ]
          },
          "bad_long": {
            "text": "Ảnh mới đầy màu sắc nhưng bình chữa cháy còn mờ hơn, và có thêm các chi tiết lạ. Hết giờ, bản tin phải gửi bằng ảnh cũ.",
            "ending": "bad"
          },
          "good": {
            "text": "Lượt mới cho bình chữa cháy đỏ rõ ở chính giữa. Bạn soi lại tay và nền, ghi mô tả đã dùng vào ghi chú rồi gửi đúng hạn.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Mô tả ba phần, tạo ba bản, soi kỹ rồi mới dùng.",
          "Bài sau: ảnh chụp vội bằng điện thoại cũng sửa được."
        ]
      }
    ]
  },
  {
    "duration": "8 phút",
    "difficulty": "Dễ",
    "track": "personal",
    "isFundamental": false,
    "id": 2321,
    "slug": "sua-anh-chup-dien-thoai-de-dung-duoc",
    "title": "Chặng 46, Bài 2: Ảnh chụp vội bằng điện thoại: sửa cho dùng được",
    "subtitle": "Sửa ảnh giống nhờ thợ chỉnh lại: bảo rõ việc cần sửa, và kiểm xem sản phẩm còn là sản phẩm không.",
    "emoji": "📷",
    "whyItMatters": "Ảnh sản phẩm chụp vội thường tối, lệch, nền lộn xộn. Công cụ sửa ảnh bằng AI làm sáng, chỉnh thẳng, xoá nền trong vài giây. Nhưng có một rủi ro: nó có thể lặng lẽ đổi màu, bỏ chi tiết hay thêm chữ mới, khiến ảnh đẹp hơn mà khách nhận hàng thì thất vọng.",
    "openingQuestion": "Bạn nhờ AI làm sáng ảnh hộp trà chụp trong kho tối. Ảnh ra đẹp hơn hẳn. Bạn nên kiểm điều gì trước khi đăng?",
    "openingOptions": [
      "Màu, logo và chữ trên hộp còn giống hộp thật không",
      "Kích thước tệp, vì ảnh đẹp thường nặng hơn nhiều so với ảnh thường",
      "Số lượt sửa, vì sửa quá ba lượt ảnh sẽ bị hỏng",
      "Tên tệp, vì công cụ thường đổi tên khi sửa xong"
    ],
    "correctOption": 0,
    "explanation": "Khi làm sáng hay xoá nền, AI có thể đổi tông màu, làm mờ logo hoặc vẽ lại chữ trên bao bì theo cách nghe hợp lý nhưng không đúng. Khách mua theo ảnh rồi nhận hộp khác màu thì khiếu nại. Kích thước tệp, tên tệp hay số lượt sửa là chi tiết phụ, không làm khách hiểu sai sản phẩm. Điều phải khớp với hàng thật là màu, logo và chữ.",
    "diagram": [
      {
        "label": "Xem ảnh gốc: tối, lệch hay nền rối",
        "arrow": true
      },
      {
        "label": "Nêu từng việc cần sửa, theo thứ tự",
        "arrow": true
      },
      {
        "label": "Đặt ảnh sau cạnh ảnh gốc để so",
        "arrow": true
      },
      {
        "label": "Kiểm màu, logo, chữ rồi mới đăng"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Một cửa hàng nhỏ bán hộp trà chụp ảnh ở kho chiều tối. Họ nhờ công cụ AI làm sáng và xoá nền. Ảnh ra sáng đẹp, nhưng hộp trà xanh rêu biến thành xanh lá tươi, và dòng chữ nhỏ trên nắp hộp bị vẽ lại thành những nét lạ. Khách đặt hàng nhận hộp xanh rêu và nhắn hỏi 'sao khác ảnh'. Đây là tình huống dựng để minh hoạ."
    },
    "quiz": [
      {
        "question": "Ảnh sản phẩm quá tối. Cách giao việc cho công cụ sửa ảnh nào rõ nhất?",
        "options": [
          "Làm sáng ảnh vừa đủ, giữ nguyên màu thật của hộp",
          "Sửa cho ảnh này đẹp hơn và chuyên nghiệp hơn, tuỳ bạn chọn cách làm",
          "Làm ảnh sáng thật nhiều cho đến khi không còn chỗ nào tối nữa",
          "Sửa lại mọi thứ trong ảnh và thêm hiệu ứng ưa thích của công cụ"
        ],
        "correct": 0,
        "explanation": "Việc rõ ràng nêu đúng một việc (làm sáng) và một ràng buộc (giữ màu). 'Đẹp hơn, chuyên nghiệp hơn' để AI tự chọn việc sửa. Làm sáng thật nhiều sẽ cháy sáng và mất chi tiết. 'Sửa mọi thứ' mở cửa cho AI đổi cả sản phẩm."
      },
      {
        "question": "Sau khi sửa, cách kiểm nào đáng tin nhất?",
        "options": [
          "Đặt ảnh sau cạnh ảnh gốc và so từng chi tiết",
          "Nhờ công cụ sửa ảnh tự cho biết ảnh có trung thực không",
          "Chỉ nhìn ảnh sau, vì nó đã đẹp thì chắc là đúng",
          "So bằng cảm giác trong đầu sau khi nhìn hộp hàng thật"
        ],
        "correct": 0,
        "explanation": "Nhìn hai ảnh cạnh nhau cho thấy ngay chỗ nào đã đổi. Công cụ không báo cáo trung thực những thay đổi nó tự thêm. Chỉ nhìn ảnh sau thì đẹp dễ làm mắt bỏ qua lỗi. Nhớ hộp hàng thật trong đầu thì trí nhớ về màu rất kém; cần cầm hộp hàng thật hoặc ảnh gốc ra so."
      },
      {
        "question": "Điều nào sau đây là dấu hiệu AI đã vẽ thêm vào ảnh sản phẩm?",
        "options": [
          "Chữ nhỏ trên bao bì trở thành nét lạ, không đọc được",
          "Ảnh sáng hơn ảnh gốc ở vùng góc dưới",
          "Ảnh được cắt gọn để sản phẩm nằm giữa khung",
          "Nền ảnh đổi từ sàn kho sang nền trắng"
        ],
        "correct": 0,
        "explanation": "Làm sáng, cắt khung và đổi nền là những việc bạn yêu cầu. Chữ trên bao bì bị thay bằng nét lạ là AI tự vẽ lại phần nó không đọc rõ, một thay đổi bạn không yêu cầu và khách có thể nhận ra. Đó là lỗi phải sửa hoặc chụp lại."
      },
      {
        "question": "Bạn cần chỉnh thẳng, làm sáng và xoá nền cho một ảnh. Nên làm thế nào?",
        "options": [
          "Yêu cầu từng việc một, xem lại sau mỗi việc",
          "Gộp cả ba việc và hai việc khác vào một yêu cầu thật dài",
          "Làm cả ba rồi nhờ người khác xem hộ sau khi đã đăng",
          "Để công cụ tự quyết việc nào cần làm trước"
        ],
        "correct": 0,
        "explanation": "Mỗi lượt một việc giúp bạn thấy việc nào làm hỏng ảnh và quay lại bước trước. Gộp nhiều việc thì lỗi lẫn vào nhau, khó tìm nguyên nhân. Đăng rồi mới nhờ xem là kiểm sau khi đã lỡ. Để công cụ tự quyết thì quay lại việc không có ràng buộc nào."
      },
      {
        "question": "Khi nào nên chụp lại thay vì sửa tiếp bằng AI?",
        "options": [
          "Khi lỗi nằm ở chi tiết sản phẩm cần đúng, như chữ hoặc màu",
          "Khi ảnh gốc hơi tối, vì tối luôn là lỗi không sửa được",
          "Khi bạn đã dùng công cụ này hơn hai lần trong cùng một ngày làm việc",
          "Khi ảnh sau có tệp nặng hơn ảnh gốc một chút"
        ],
        "correct": 0,
        "explanation": "Chữ, logo và màu của sản phẩm phải khớp hàng thật; nếu AI làm sai mà sửa mãi không được thì chụp lại là cách nhanh và an toàn. Ảnh hơi tối thì AI thường làm sáng ổn. Số lần dùng hay dung lượng tệp không liên quan đến độ đúng của ảnh."
      }
    ],
    "keyTakeaways": [
      "Nêu từng việc cần sửa, kèm ràng buộc như giữ màu thật.",
      "Mỗi lượt một việc, xem lại rồi mới làm việc tiếp.",
      "Đặt ảnh sau cạnh ảnh gốc để thấy chỗ AI đã đổi.",
      "Màu, logo, chữ trên sản phẩm phải khớp hàng thật.",
      "Sai ở chi tiết sản phẩm thì chụp lại, đừng sửa mãi."
    ],
    "practicePrompt": {
      "question": "Ảnh đôi giày chụp dưới đèn vàng, AI sửa xong nhìn sáng đẹp nhưng đôi giày nâu thành đỏ gạch. Bạn làm gì?",
      "options": [
        "Yêu cầu làm sáng lại, giữ màu nâu thật, rồi so với giày thật",
        "Đăng luôn vì ảnh đỏ gạch nhìn hút mắt hơn ảnh gốc, khách sẽ thích hơn",
        "Ghi chú 'màu có thể khác thực tế' nhỏ dưới ảnh và đăng",
        "Xoá ảnh đó và dùng ảnh minh hoạ do AI vẽ cho nhanh"
      ],
      "correct": 0,
      "explanation": "Đổi màu giày là lỗi sai sự thật, sửa được bằng cách nêu rõ ràng buộc giữ màu nâu rồi so với giày thật. Đăng ảnh hút mắt nhưng sai màu làm khách nhận hàng thất vọng. Ghi chú nhỏ không bù được một ảnh sai rõ rệt. Ảnh AI vẽ mới không phải ảnh sản phẩm thật."
    },
    "summary": {
      "keyIdea": "Sửa ảnh bằng AI là chỉnh ánh sáng và khung, không phải đổi sản phẩm.",
      "formula": "Một việc mỗi lượt + ràng buộc giữ màu, logo, chữ + so với ảnh gốc.",
      "commonMistake": "Thấy ảnh đẹp hơn rồi đăng mà không soi lại màu và chữ trên sản phẩm.",
      "action": "Sửa một ảnh chụp vội và so từng chi tiết với ảnh gốc."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Lấy một ảnh bạn chụp bằng điện thoại (sản phẩm, tài liệu hoặc góc làm việc) bị tối hoặc lệch. Nhờ công cụ sửa ảnh làm từng việc một, mỗi lượt lưu một bản. Sau đó đặt ảnh gốc cạnh ảnh cuối và ghi ra ba điều đã đổi.",
      "secondary": "Hôm sau bạn sẽ được hỏi: AI đã đổi chi tiết nào mà bạn không yêu cầu?"
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bạn chụp hộp trà ở kho lúc chiều tối, ảnh vừa tối vừa lệch, mà hôm nay phải đăng bán. Bài này dạy cách nhờ AI sửa cho dùng được, và cách kiểm xem nó có lặng lẽ làm sai sản phẩm không."
      },
      {
        "type": "feynman",
        "title": "Sửa ảnh đơn giản hơn bạn nghĩ",
        "intro": "Hình dung bạn mang tấm ảnh in tới tiệm chỉnh ảnh. Nói 'làm cho đẹp' thì thợ chỉnh theo gu của họ. Nói 'sáng lên một chút, giữ màu hộp' thì họ làm đúng việc.",
        "columns": [
          "Thành phần",
          "Ví dụ đời thường",
          "Trong bài này"
        ],
        "rows": [
          [
            "Việc cần sửa",
            "Nhờ thợ 'sáng lên một chút và xoay thẳng'",
            "Bạn nêu từng việc một cho công cụ AI"
          ],
          [
            "Giữ nguyên",
            "Dặn 'đừng đổi màu hộp, đừng đụng chữ'",
            "Ràng buộc đi kèm mỗi yêu cầu"
          ],
          [
            "Nhận ảnh về",
            "Cầm ảnh ra đặt cạnh hộp thật để xem khác chỗ nào",
            "Đặt ảnh sau cạnh ảnh gốc và hàng thật"
          ]
        ],
        "oneLiner": "Sửa ảnh là dặn đúng việc, rồi so lại với bản gốc."
      },
      {
        "type": "heading",
        "text": "Vấn đề: ảnh đẹp hơn nhưng khách nhận hàng khác"
      },
      {
        "type": "paragraph",
        "text": "Công cụ sửa ảnh bằng AI không chỉ làm sáng, nó còn vẽ lại phần nó đoán. Vùng tối được 'đoán' là màu gì, chữ mờ được 'đoán' là nét gì. Đoán hợp lý nhưng không đúng hộp của bạn. Vì vậy quy trình có hai nửa: giao việc rõ, rồi kiểm."
      },
      {
        "type": "flow",
        "title": "Quy trình sửa một ảnh chụp vội",
        "steps": [
          {
            "label": "Xem ảnh gốc",
            "detail": "Ghi ra lỗi: tối, lệch, nền rối, bóng loá. Mỗi lỗi là một việc."
          },
          {
            "label": "Giao một việc kèm ràng buộc",
            "detail": "Ví dụ: 'Làm sáng vừa đủ, giữ nguyên màu hộp và chữ trên nắp'."
          },
          {
            "label": "Lưu bản sau mỗi lượt",
            "detail": "Có bản để quay lại khi một lượt làm hỏng ảnh."
          },
          {
            "label": "So với ảnh gốc và hàng thật",
            "detail": "Soi màu, logo, chữ, hình dáng. Chỗ nào khác, ghi lại."
          },
          {
            "label": "Quyết định: dùng, sửa tiếp hay chụp lại",
            "detail": "Lỗi ở chi tiết sản phẩm mà không sửa được thì chụp lại."
          }
        ]
      },
      {
        "type": "list",
        "items": [
          "Lỗi ánh sáng: nhờ làm sáng vừa đủ, nói rõ giữ nguyên màu.",
          "Lỗi lệch: nhờ chỉnh thẳng, không cắt mất sản phẩm.",
          "Nền rối: nhờ xoá nền hoặc thay nền trơn, giữ nguyên hình sản phẩm.",
          "Mỗi lượt một việc, lưu một bản."
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Yêu cầu dễ hỏng",
          "text": "'Sửa cho ảnh đẹp và chuyên nghiệp hơn.' AI chọn cách sửa, có thể đổi màu, làm phẳng chi tiết và vẽ lại chữ."
        },
        "right": {
          "label": "Yêu cầu có kiểm soát",
          "text": "'Làm sáng vừa đủ, giữ nguyên màu xanh rêu của hộp và chữ trên nắp.' Một việc, một ràng buộc, dễ so lại."
        }
      },
      {
        "type": "callout",
        "label": "Chi tiết khách nhìn thấy",
        "text": "Khách so ảnh với hàng thật ngay khi nhận. Màu, logo và chữ trên bao bì là ba thứ dễ bị AI đổi nhất và khách nhận ra sớm nhất."
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Soát bản ghi việc của AI sau khi sửa ảnh",
        "task": "Bạn nhờ AI làm sáng ảnh hộp trà xanh rêu, chữ 'TRÀ SEN 200g' trên nắp. Đây là bản AI báo cáo đã làm. Đánh dấu những chỗ AI báo đã làm nhưng thực ra thay đổi sản phẩm hoặc không đúng thật.",
        "segments": [
          {
            "text": "Đã làm sáng vùng tối ở nửa dưới của ảnh."
          },
          {
            "text": "Đã chỉnh hộp trà thành màu xanh lá tươi cho nổi bật hơn.",
            "error": "Bạn yêu cầu giữ màu hộp. Xanh rêu thành xanh lá tươi là đổi màu sản phẩm, khách nhận hàng sẽ thấy khác."
          },
          {
            "text": "Đã xoay ảnh thẳng lại khoảng vài độ."
          },
          {
            "text": "Đã làm rõ chữ trên nắp thành 'TRÀ SEN PREMIUM 250g'.",
            "error": "Chữ thật là 'TRÀ SEN 200g'. AI tự vẽ lại chữ mờ và bịa thêm 'PREMIUM' cùng số 250g, nội dung sai sự thật."
          },
          {
            "text": "Đã thay nền sàn kho bằng nền trắng."
          },
          {
            "text": "Đã thêm một bông sen bên cạnh hộp để trang trí.",
            "error": "Bạn không yêu cầu thêm vật. Bông sen làm ảnh không còn là ảnh hàng thật, dễ gây hiểu nhầm về phần đi kèm."
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Ảnh đôi giày bị đổi màu",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn nhờ AI làm sáng ảnh đôi giày nâu chụp dưới đèn vàng. Ảnh ra sáng đẹp, nhưng giày có vẻ ngả sang đỏ gạch. Đôi giày thật đang để trên bàn cạnh bạn.",
            "choices": [
              {
                "label": "Đăng luôn, ảnh đỏ gạch nhìn hút mắt hơn",
                "next": "bad_post"
              },
              {
                "label": "Đặt ảnh sau cạnh giày thật và ảnh gốc để so màu",
                "next": "s2"
              }
            ]
          },
          "bad_post": {
            "text": "Khách đặt mua theo ảnh. Nhận được giày nâu, hai người gửi lại hàng và nhắn hỏi sao khác ảnh. Bạn phải hoàn tiền.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bạn thấy rõ ảnh sau đỏ hơn giày thật. Còn thời gian cho một lượt sửa.",
            "choices": [
              {
                "label": "Yêu cầu 'làm sáng vừa đủ, giữ nguyên màu nâu thật', rồi so lại",
                "next": "good"
              },
              {
                "label": "Yêu cầu 'sửa cho đẹp hơn nữa' và hy vọng màu tự đúng",
                "next": "bad_vague"
              }
            ]
          },
          "bad_vague": {
            "text": "AI sửa thêm theo ý nó, giày nay gần như đỏ hẳn và còn mất chi tiết đường chỉ. Bạn phải chụp lại vào hôm sau.",
            "ending": "bad"
          },
          "good": {
            "text": "Lượt mới giữ đúng màu nâu, sáng vừa đủ. Bạn đặt cạnh giày thật thấy khớp, lưu cả hai bản rồi đăng.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Một việc mỗi lượt, giữ ràng buộc, so với bản gốc.",
          "Bài sau: khi nhận một ảnh từ khách, làm sao biết nó do AI tạo."
        ]
      }
    ]
  },
  {
    "duration": "8 phút",
    "difficulty": "Dễ",
    "track": "personal",
    "isFundamental": false,
    "id": 2322,
    "slug": "nhan-ra-anh-do-ai-tao-dau-hieu-co-ban",
    "title": "Chặng 46, Bài 3: Nhận ra ảnh do AI tạo: những dấu hiệu cơ bản",
    "subtitle": "Kiểm ảnh giống kiểm một tờ tiền: nhìn các chi tiết nhỏ, rồi hỏi nguồn gốc.",
    "emoji": "🔍",
    "whyItMatters": "Khách gửi ảnh 'hiện trường' để khiếu nại, đối tác gửi ảnh để chứng minh giao hàng. Ảnh do AI tạo ngày càng giống thật, và công cụ phát hiện AI cũng hay sai. Biết soi vài dấu hiệu cơ bản và hỏi nguồn gốc giúp bạn không đưa ảnh giả vào báo cáo hay quyết định.",
    "openingQuestion": "Khách gửi một ảnh chụp lô hàng bị hỏng để đòi bồi thường. Ảnh rất rõ, nhưng bạn thấy hơi lạ. Bước đầu tiên hợp lý nhất là gì?",
    "openingOptions": [
      "Phóng to soi tay, chữ, bóng đổ và hỏi khách nguồn gốc ảnh",
      "Đưa ảnh vào công cụ phát hiện AI và tin ngay điểm số nó trả",
      "Từ chối ngay vì ảnh rõ như vậy chắc chắn là ảnh do AI vẽ",
      "Bồi thường luôn cho nhanh vì khách đã bỏ công gửi ảnh"
    ],
    "correctOption": 0,
    "explanation": "Soi chi tiết và hỏi nguồn gốc là hai việc kiểm được bằng mắt và bằng một câu hỏi, không cần công cụ đặc biệt. Điểm số từ công cụ phát hiện AI có thể sai cả hai hướng, nên chỉ là một tín hiệu phụ. Ảnh rõ không có nghĩa là ảnh giả, nhiều ảnh thật cũng rõ. Bồi thường luôn là bỏ qua bước xác minh, dễ mở đường cho gian lận.",
    "diagram": [
      {
        "label": "Nhận ảnh cần xác minh",
        "arrow": true
      },
      {
        "label": "Soi chi tiết: ngón tay, chữ, bóng đổ, nền",
        "arrow": true
      },
      {
        "label": "Hỏi nguồn gốc: ai chụp, khi nào, ảnh gốc ở đâu",
        "arrow": true
      },
      {
        "label": "Đối chiếu nguồn khác rồi mới kết luận"
      }
    ],
    "realWorldExample": {
      "company": "Bức ảnh giả vụ nổ gần Lầu Năm Góc (tháng 5 năm 2023)",
      "description": "Tháng 5 năm 2023, một bức ảnh do AI tạo ra, vẽ khói đen bốc lên gần toà nhà Lầu Năm Góc ở Mỹ, lan rất nhanh trên mạng xã hội và được một số tài khoản có dấu tích xác thực chia sẻ. Cơ quan chức năng và các hãng tin cho biết đó không phải sự kiện có thật. Bài học: một ảnh nhìn thuyết phục vẫn cần đối chiếu nguồn độc lập."
    },
    "quiz": [
      {
        "question": "Dấu hiệu nào trong ảnh thường khiến nghi ngờ ảnh do AI tạo?",
        "options": [
          "Chữ trên biển hiệu méo, sai nét hoặc không đọc được",
          "Ảnh có độ sáng cao hơn những ảnh khác trong thư",
          "Ảnh có kích thước lớn hơn ảnh điện thoại thường",
          "Ảnh chụp ngoài trời vào ban ngày"
        ],
        "correct": 0,
        "explanation": "Công cụ tạo ảnh vẽ chữ như vẽ hình nên hay méo nét, lẫn ký tự hoặc tạo ra những 'chữ' không tồn tại. Độ sáng, kích thước hay chụp ngoài trời là chuyện bình thường của ảnh thật, không phải dấu hiệu của ảnh giả."
      },
      {
        "question": "Bạn thấy bàn tay trong ảnh có bảy ngón. Điều này cho biết gì?",
        "options": [
          "Một tín hiệu đáng ngờ, cần kiểm thêm các dấu hiệu khác",
          "Bằng chứng chắc chắn ảnh do AI tạo và không cần kiểm gì thêm",
          "Chắc chắn là lỗi của máy ảnh điện thoại khi chụp",
          "Không cho biết gì vì ai cũng có thể bị chụp sai ngón"
        ],
        "correct": 0,
        "explanation": "Ngón tay bất thường là dấu hiệu hay gặp ở ảnh AI, nhưng công cụ mới ngày càng ít mắc lỗi này, và ảnh thật cũng có thể bị chỉnh sửa. Nên xem nó là tín hiệu để kiểm thêm: chữ, bóng đổ, nền, nguồn gốc. Một dấu hiệu đơn lẻ chưa đủ kết luận."
      },
      {
        "question": "Công cụ phát hiện ảnh AI báo 'có thể là ảnh thật'. Nên hiểu thế nào?",
        "options": [
          "Đó chỉ là một tín hiệu, vẫn cần hỏi nguồn gốc ảnh",
          "Đó là kết luận tuyệt đối, dùng ngay được",
          "Công cụ này luôn sai nên không nên đọc kết quả của nó",
          "Ảnh chắc chắn là thật vì công cụ không bao giờ bỏ sót"
        ],
        "correct": 0,
        "explanation": "Công cụ phát hiện có thể bỏ sót ảnh giả và cũng có thể nghi nhầm ảnh thật. Kết quả của nó là một ý kiến để tham khảo, không phải bằng chứng. Nguồn gốc (ai chụp, lúc nào, ảnh gốc ở đâu) là thứ kiểm được bằng hỏi và đối chiếu."
      },
      {
        "question": "Cách nào tốt nhất để kiểm nguồn gốc một ảnh 'hiện trường' từ khách?",
        "options": [
          "Xin ảnh gốc, giờ chụp và thử tìm cùng sự kiện ở nguồn khác",
          "Hỏi khách 'ảnh này thật không' rồi tin câu trả lời 'thật' của họ",
          "Đoán theo độ rõ nét, vì ảnh giả thường mờ hơn ảnh thật",
          "Hỏi chính công cụ tạo ảnh xem nó có tạo ảnh này không"
        ],
        "correct": 0,
        "explanation": "Ảnh gốc thường kèm giờ chụp và thông tin thiết bị; nguồn khác xác nhận cùng sự kiện là bằng chứng độc lập. Câu trả lời 'thật' của người muốn qua mặt chẳng chứng minh gì. Ảnh AI hiện nay rất rõ nét nên độ mờ không phân biệt được. Công cụ tạo ảnh không lưu lại ảnh nào là của bạn hỏi."
      },
      {
        "question": "Bóng đổ trong ảnh hướng về phía mặt trời. Điều đó ý nghĩa gì khi kiểm ảnh?",
        "options": [
          "Bóng các vật phải nhất quán một hướng với một nguồn sáng",
          "Bóng hướng về mặt trời là dấu hiệu chắc chắn của ảnh AI chứ không phải ảnh thật",
          "Bóng đổ không cần kiểm vì nó không liên quan tới ảnh giả",
          "Bóng chỉ cần nhất quán trong ảnh chụp ban đêm"
        ],
        "correct": 0,
        "explanation": "Trong ảnh thật có một nguồn sáng thì bóng của mọi vật đều cùng hướng. Ảnh AI đôi khi vẽ bóng mỗi vật một hướng hoặc vật thiếu bóng. Một bóng hướng về phía nguồn sáng là lỗi logic ánh sáng, nhưng bạn phải xét cả ảnh chứ không phải một vật."
      }
    ],
    "keyTakeaways": [
      "Soi chi tiết nhỏ: ngón tay, chữ, bóng đổ, đồ vật trong nền.",
      "Một dấu hiệu đơn lẻ chưa đủ kết luận; cần nhiều tín hiệu.",
      "Công cụ phát hiện AI chỉ là ý kiến tham khảo, có thể sai.",
      "Hỏi nguồn gốc: ai chụp, khi nào, ảnh gốc ở đâu.",
      "Đối chiếu nguồn độc lập trước khi dùng ảnh làm căn cứ."
    ],
    "practicePrompt": {
      "question": "Khách gửi ảnh kho hàng bị ngập để đòi bồi thường. Ảnh rõ, nhưng biển 'LỐI THOÁT' trong ảnh có chữ méo. Việc hợp lý nhất?",
      "options": [
        "Xin ảnh gốc và giờ chụp, hỏi thêm nguồn khác, chưa kết luận vội",
        "Kết luận khách dùng ảnh AI và từ chối thanh toán ngay vì chữ trong ảnh bị méo",
        "Bỏ qua chữ méo vì ảnh rõ nên chắc chắn là thật",
        "Đăng ảnh lên nhóm chung để mọi người đoán thật hay giả"
      ],
      "correct": 0,
      "explanation": "Chữ méo là tín hiệu đáng ngờ nhưng chưa phải kết luận; cần ảnh gốc, giờ chụp và nguồn khác. Từ chối ngay có thể oan cho khách. Bỏ qua dấu hiệu vì ảnh rõ là kiểm quá ít. Đăng lên nhóm chung lan rộng ảnh chưa xác minh và có thể dính thông tin của khách."
    },
    "summary": {
      "keyIdea": "Phát hiện ảnh AI là soi chi tiết và hỏi nguồn gốc, không phải tin một công cụ.",
      "formula": "Ngón tay + chữ + bóng đổ + nền + nguồn gốc + đối chiếu nguồn khác.",
      "commonMistake": "Kết luận ngay từ một dấu hiệu hoặc từ điểm số của công cụ phát hiện.",
      "action": "Áp dụng 5 bước soi này cho một ảnh bạn nhận được tuần này."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Lấy ba ảnh bạn nhận được gần đây qua email hoặc nhóm chat (từ khách, đối tác hay đồng nghiệp). Với mỗi ảnh, phóng to soi tay, chữ, bóng đổ và nền, ghi ra một tín hiệu đáng ngờ nếu có, rồi viết một câu hỏi nguồn gốc bạn sẽ gửi người gửi.",
      "secondary": "Hôm sau bạn sẽ được hỏi: ảnh nào có tín hiệu đáng ngờ và bạn đã hỏi gì?"
    },
    "sections": [
      {
        "type": "lead",
        "text": "Khách gửi một ảnh 'hiện trường' để khiếu nại, ảnh rõ nhưng có gì đó lạ. Bài này dạy vài dấu hiệu cơ bản để soi, và quan trọng hơn, cách hỏi về nguồn gốc."
      },
      {
        "type": "feynman",
        "title": "Nhận ra ảnh AI đơn giản hơn bạn nghĩ",
        "intro": "Hình dung bạn kiểm một tờ tiền nghi là giả: không chỉ nhìn tổng thể, mà soi hoạ tiết nhỏ, cầm lên ánh sáng, rồi hỏi tờ tiền từ đâu tới.",
        "columns": [
          "Thành phần",
          "Ví dụ đời thường",
          "Trong bài này"
        ],
        "rows": [
          [
            "Soi chi tiết nhỏ",
            "Nhìn hình chìm và đường vân trên tờ tiền",
            "Nhìn ngón tay, chữ, bóng đổ trong ảnh"
          ],
          [
            "Hỏi nguồn gốc",
            "Hỏi ai đưa tờ tiền và khi nào",
            "Hỏi ai chụp ảnh, lúc nào, ảnh gốc ở đâu"
          ],
          [
            "Đối chiếu",
            "Đem ra quầy ngân hàng kiểm lại",
            "Tìm nguồn độc lập xác nhận sự kiện"
          ]
        ],
        "oneLiner": "Kiểm ảnh là soi chi tiết, hỏi nguồn, rồi đối chiếu."
      },
      {
        "type": "heading",
        "text": "Vấn đề: ảnh giả ngày càng giống thật"
      },
      {
        "type": "paragraph",
        "text": "Ảnh do AI tạo không còn luôn lộ ra ở những lỗi rõ như sáu ngón tay. Công cụ phát hiện AI cũng không chắc chắn. Vì vậy cách an toàn không phải đoán 'giả hay thật' bằng mắt một lần, mà là gom nhiều tín hiệu nhỏ và hỏi về nguồn gốc."
      },
      {
        "type": "flow",
        "title": "Năm bước kiểm một ảnh đáng ngờ",
        "steps": [
          {
            "label": "Phóng to soi tay và người",
            "detail": "Số ngón, khớp tay, răng, đồ trang sức hai bên tai có đối xứng bất thường không."
          },
          {
            "label": "Đọc chữ trong ảnh",
            "detail": "Biển hiệu, nhãn, chữ trên áo có nét méo, ký tự lạ hay chính tả vô lý không."
          },
          {
            "label": "Xem bóng đổ và ánh sáng",
            "detail": "Mọi vật có bóng cùng hướng không, có vật nào thiếu bóng hoặc phản chiếu sai không."
          },
          {
            "label": "Soi nền và chi tiết xa",
            "detail": "Đám đông, hàng rào, cửa sổ có bị chảy, lặp lại hoặc dính vào nhau không."
          },
          {
            "label": "Hỏi nguồn gốc và đối chiếu",
            "detail": "Xin ảnh gốc, giờ chụp, địa điểm. Tìm nguồn khác xác nhận cùng sự kiện."
          }
        ]
      },
      {
        "type": "list",
        "items": [
          "Tín hiệu trong ảnh chỉ để nghi ngờ, không đủ để kết luận.",
          "Ảnh thật có thể bị chỉnh sửa, ảnh giả có thể nhìn rất sạch.",
          "Công cụ phát hiện AI là ý kiến tham khảo, có thể nghi nhầm hoặc bỏ sót.",
          "Nguồn gốc và đối chiếu độc lập là bằng chứng mạnh nhất bạn có."
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Tín hiệu đáng nghi",
          "text": "Chữ méo, bóng đổ nhiều hướng, nền chảy, tay bất thường, người gửi không có ảnh gốc và không nhớ giờ chụp."
        },
        "right": {
          "label": "Dấu hiệu đáng tin hơn",
          "text": "Có ảnh gốc kèm giờ chụp, nhiều ảnh cùng một sự kiện từ các góc khác nhau, nguồn khác độc lập xác nhận."
        }
      },
      {
        "type": "callout",
        "label": "Đừng buộc tội vội",
        "text": "Ảnh nghi ngờ chưa phải ảnh giả. Hãy nói với người gửi bằng câu hỏi ('bạn gửi giúp ảnh gốc và giờ chụp được không?') thay vì kết luận họ gian lận. Quyết định về khiếu nại hay bồi thường là việc của người có thẩm quyền."
      },
      {
        "type": "scenario",
        "title": "Ảnh hiện trường từ khách hàng",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Khách đòi bồi thường lô hàng bị ngập, gửi một ảnh kho đầy nước. Ảnh rất rõ. Bạn phóng to thấy biển 'LỐI THOÁT' có chữ méo và một cây cột có bóng hướng ngược lại với các vật khác.",
            "choices": [
              {
                "label": "Nhắn khách 'ảnh này do AI tạo, chúng tôi từ chối'",
                "next": "bad_accuse"
              },
              {
                "label": "Nhắn xin ảnh gốc, giờ chụp và thêm ảnh từ góc khác",
                "next": "s2"
              }
            ]
          },
          "bad_accuse": {
            "text": "Khách phản hồi gay gắt, đăng lên mạng xã hội. Sau đó bạn biết ảnh được chỉnh lại bằng một ứng dụng sửa ảnh chứ không hoàn toàn do AI tạo, và bạn đã kết luận quá sớm.",
            "ending": "bad"
          },
          "s2": {
            "text": "Khách gửi thêm hai ảnh chụp từ góc khác, cùng kho nước, biển chữ vẫn rõ ràng. Bạn đối chiếu thấy ảnh đầu đã bị làm mờ chữ khi tải lên ứng dụng.",
            "choices": [
              {
                "label": "Chuyển hồ sơ kèm ba ảnh và ghi chú quan sát cho bộ phận xử lý khiếu nại",
                "next": "good"
              },
              {
                "label": "Bỏ ảnh đầu, tự quyết mức bồi thường theo cảm giác",
                "next": "bad_solo"
              }
            ]
          },
          "bad_solo": {
            "text": "Mức bồi thường bạn tự đưa ra vượt thẩm quyền và không có căn cứ. Quản lý yêu cầu bạn giải trình và hồ sơ bị trả về.",
            "ending": "bad"
          },
          "good": {
            "text": "Bộ phận khiếu nại nhận đủ ảnh, ghi chú các điểm cần hỏi, và xử lý theo quy trình. Bạn không phải đoán ảnh thật hay giả, và khách được giải quyết công bằng.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Soi chi tiết, hỏi nguồn gốc, đối chiếu rồi mới kết luận.",
          "Bài sau: khi nào ảnh AI làm mất lòng tin của khách."
        ]
      }
    ]
  },
  {
    "duration": "8 phút",
    "difficulty": "Dễ",
    "track": "personal",
    "isFundamental": false,
    "id": 2323,
    "slug": "ai-de-lam-anh-cua-hang-so-khi-nao-khong-nen",
    "title": "Chặng 46, Bài 4: Khi nào ảnh AI làm mất lòng tin của khách",
    "subtitle": "Ảnh minh hoạ thì vẽ thoải mái. Ảnh sản phẩm thật và ảnh người thật là chuyện khác.",
    "emoji": "🛍️",
    "whyItMatters": "Có ba loại ảnh: ảnh minh hoạ, ảnh sản phẩm và ảnh có người thật. Ảnh AI hợp với loại đầu, nguy hiểm với hai loại sau vì khách tin ảnh như tin hàng. Phân biệt sớm giúp bạn tiết kiệm thời gian mà không đánh đổi lòng tin.",
    "openingQuestion": "Cửa hàng bạn chưa kịp chụp ảnh lô đèn bàn mới. Đồng nghiệp đề nghị nhờ AI vẽ ảnh đèn rồi đăng bán. Điều quan trọng nhất cần cân nhắc là gì?",
    "openingOptions": [
      "Ảnh sản phẩm là lời hứa với khách: hàng nhận phải giống ảnh",
      "Công cụ AI vẽ đèn có đủ độ phân giải cho trang bán hàng không",
      "Ảnh AI có bị trang bán hàng chặn tự động khi đăng lên không",
      "Ảnh AI vẽ đèn bóng loáng hơn ảnh chụp nên khách dễ thích"
    ],
    "correctOption": 0,
    "explanation": "Khách dựa vào ảnh để quyết định mua vì họ không cầm được hàng. AI vẽ đèn theo mô tả nên hình dáng, chất liệu, màu có thể khác hàng thật, dù nhìn rất thuyết phục. Độ phân giải hay chuyện trang chặn ảnh là kỹ thuật phụ. Ảnh bóng loáng hơn thật làm khách kỳ vọng cao rồi thất vọng. Vấn đề cốt lõi là lời hứa ảnh đưa ra.",
    "diagram": [
      {
        "label": "Xác định ảnh này làm gì",
        "arrow": true
      },
      {
        "label": "Phân loại: minh hoạ, sản phẩm hay người thật",
        "arrow": true
      },
      {
        "label": "Minh hoạ: dùng AI; sản phẩm và người: dùng ảnh thật",
        "arrow": true
      },
      {
        "label": "Ghi chú nếu có ảnh AI để khách không hiểu nhầm"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Một cửa hàng đèn bàn đăng ảnh đèn do AI vẽ vì chưa có ảnh thật. Ảnh đẹp, bán được vài đơn. Nhưng hàng về thì chân đèn mảnh hơn, màu thân đèn nhạt hơn ảnh. Nhiều khách nhắn hỏi sao khác, vài người trả hàng, và cửa hàng mất cả đánh giá tốt lẫn phí vận chuyển hai chiều. Đây là tình huống dựng để minh hoạ."
    },
    "quiz": [
      {
        "question": "Loại ảnh nào phù hợp nhất để dùng ảnh do AI tạo?",
        "options": [
          "Ảnh minh hoạ cho bài viết về khái niệm chung",
          "Ảnh đôi giày đang bán trong cửa hàng của bạn",
          "Ảnh nhân viên thật của công ty ở trang giới thiệu",
          "Ảnh hàng thật để khách kiểm tra trước khi mua"
        ],
        "correct": 0,
        "explanation": "Ảnh minh hoạ diễn tả ý chứ không hứa về vật cụ thể nên AI tạo được. Ảnh sản phẩm đang bán phải đúng hàng thật. Ảnh nhân viên thật phải là người thật. Ảnh để khách kiểm hàng mà là ảnh AI thì khác lời hứa."
      },
      {
        "question": "Vì sao ảnh AI cho sản phẩm đang bán có thể gây rắc rối?",
        "options": [
          "Khách kỳ vọng theo ảnh, nhận hàng khác thì thất vọng và khiếu nại",
          "Ảnh AI luôn bị tải lên chậm hơn ảnh chụp thường",
          "Ảnh AI không có màu nên khách không thấy sản phẩm",
          "Ảnh AI luôn mờ hơn ảnh thật ở mọi độ phân giải"
        ],
        "correct": 0,
        "explanation": "Khách tin ảnh như tin hàng. AI vẽ theo mô tả nên chi tiết có thể lệch hàng thật, dù nhìn thuyết phục. Tốc độ tải, màu hay độ mờ không phải gốc vấn đề: ảnh AI có thể rất nét và nhiều màu mà vẫn sai hàng."
      },
      {
        "question": "Bạn muốn đăng ảnh một nhân viên đang tư vấn khách, nhưng chưa có ảnh thật. Việc hợp lý là gì?",
        "options": [
          "Chụp ảnh thật có xin phép, hoặc dùng ảnh minh hoạ không mặt người cụ thể",
          "Nhờ AI vẽ một nhân viên giống đồng nghiệp A để giới thiệu",
          "Nhờ AI ghép mặt đồng nghiệp A vào một ảnh tư vấn có sẵn cho giống thật mà không hỏi anh ấy",
          "Dùng ảnh AI và không ghi chú để khách tưởng là nhân viên thật"
        ],
        "correct": 0,
        "explanation": "Ảnh người thật cần sự đồng ý của họ, và khách tin người trong ảnh có thật. Vẽ người giống đồng nghiệp hay ghép mặt họ mà chưa xin phép là dùng hình ảnh người khác sai mục đích. Ảnh AI không ghi chú còn dễ khiến khách hiểu nhầm."
      },
      {
        "question": "Khi dùng ảnh AI để minh hoạ trong bài đăng, cách nào giúp khách khỏi hiểu nhầm?",
        "options": [
          "Ghi chú 'ảnh minh hoạ' gần ảnh",
          "Đặt ảnh AI cạnh ảnh hàng thật mà không ghi gì",
          "Phóng to ảnh để khách nhìn rõ hơn từng chi tiết",
          "Dùng màu nhạt hơn cho ảnh để giống ảnh cũ"
        ],
        "correct": 0,
        "explanation": "Dòng ghi chú ngắn cho khách biết ảnh không phải hàng thật. Đặt ảnh AI cạnh hàng thật không ghi chú khiến khách tưởng cả hai đều là hàng thật. Phóng to hay chỉnh màu nhạt không làm khách biết ảnh nào do AI vẽ, nên không giảm hiểu nhầm."
      },
      {
        "question": "Bạn cần nhanh một ảnh nền cho banner sự kiện (không có sản phẩm cụ thể). Ảnh AI có hợp không?",
        "options": [
          "Hợp, nếu bạn kiểm chi tiết lạ rồi mới dùng",
          "Không bao giờ hợp, vì mọi ảnh AI đều làm khách mất lòng tin",
          "Hợp, và không cần kiểm gì vì nền không ai để ý",
          "Chỉ hợp khi xoá hết màu khỏi ảnh nền"
        ],
        "correct": 0,
        "explanation": "Nền banner không hứa điều gì về hàng hay người cụ thể, nên AI làm tốt và nhanh. Vẫn cần soi chi tiết lạ như chữ méo hay hình kỳ quặc. Không phải mọi ảnh AI đều mất lòng tin; chính việc ảnh hứa điều gì mới quyết định. Xoá màu không làm ảnh an toàn hơn."
      }
    ],
    "keyTakeaways": [
      "Ảnh minh hoạ cho khái niệm chung hợp với AI.",
      "Ảnh sản phẩm đang bán phải là ảnh hàng thật.",
      "Ảnh người thật cần người thật đồng ý, không tự vẽ hay ghép.",
      "Ghi chú 'ảnh minh hoạ' để khách khỏi hiểu nhầm.",
      "Hỏi: ảnh này đang hứa điều gì với khách?"
    ],
    "practicePrompt": {
      "question": "Bạn cần ảnh cho bài đăng 'Mẹo bảo quản đồ gỗ' và một ảnh cho chiếc bàn gỗ bạn đang bán. Phân loại nào đúng?",
      "options": [
        "Bài mẹo: ảnh minh hoạ do AI tạo được; bàn đang bán: phải là ảnh bàn thật",
        "Cả hai dùng ảnh AI cho đồng bộ và đỡ tốn công chụp",
        "Cả hai dùng ảnh thật, vì ảnh AI không bao giờ được phép",
        "Bài mẹo dùng ảnh thật; bàn đang bán dùng ảnh AI cho đẹp hơn"
      ],
      "correct": 0,
      "explanation": "Bài mẹo chỉ minh hoạ khái niệm nên ảnh AI hợp. Chiếc bàn đang bán là lời hứa với khách, phải là ảnh bàn thật. Dùng AI cho cả hai làm hỏng lời hứa về sản phẩm. Cấm AI hoàn toàn thì phí phần nó làm tốt. Đảo lại thì sai cả hai."
    },
    "summary": {
      "keyIdea": "Ảnh AI hợp khi ảnh chỉ minh hoạ, nguy hiểm khi ảnh hứa điều gì về hàng hoặc người thật.",
      "formula": "Minh hoạ → AI được. Sản phẩm → ảnh thật. Người thật → người thật đồng ý.",
      "commonMistake": "Dùng ảnh AI đẹp hơn hàng thật rồi khách nhận hàng thất vọng.",
      "action": "Phân loại ảnh trong một bài đăng của bạn thành minh hoạ, sản phẩm, người thật."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Mở một bài đăng, trang giới thiệu hoặc slide bạn đã làm. Liệt kê mọi ảnh trong đó và gắn nhãn: minh hoạ, sản phẩm hay người thật. Với mỗi ảnh nhãn 'sản phẩm' hoặc 'người thật' mà không phải ảnh thật, ghi việc bạn sẽ đổi.",
      "secondary": "Hôm sau bạn sẽ được hỏi: bạn gắn nhãn bao nhiêu ảnh và đổi ảnh nào?"
    },
    "sections": [
      {
        "type": "lead",
        "text": "Đèn bàn mới về kho, chưa kịp chụp ảnh, mà đồng nghiệp gợi ý nhờ AI vẽ cho nhanh. Bài này giúp bạn tách ba loại ảnh và biết loại nào nên để AI, loại nào nên là ảnh thật."
      },
      {
        "type": "feynman",
        "title": "Chọn ảnh đơn giản hơn bạn nghĩ",
        "intro": "Hình dung tờ rơi nhà hàng: tranh vẽ đầu bếp cười ở góc là minh hoạ, còn ảnh món ăn trên thực đơn là lời hứa. Nếu món ra khác ảnh quá, khách thấy bị lừa.",
        "columns": [
          "Thành phần",
          "Ví dụ đời thường",
          "Trong bài này"
        ],
        "rows": [
          [
            "Ảnh minh hoạ",
            "Tranh vẽ đầu bếp trên tờ rơi",
            "Ảnh AI cho khái niệm chung, bài viết, nền banner"
          ],
          [
            "Ảnh sản phẩm",
            "Ảnh món ăn trên thực đơn",
            "Ảnh hàng đang bán: phải đúng hàng thật"
          ],
          [
            "Ảnh người thật",
            "Ảnh chủ quán trên tường",
            "Người thật đồng ý; không vẽ hay ghép giả"
          ]
        ],
        "oneLiner": "Ảnh nào hứa điều gì với khách thì phải là ảnh thật."
      },
      {
        "type": "heading",
        "text": "Vấn đề: ảnh đẹp hơn hàng thật"
      },
      {
        "type": "paragraph",
        "text": "Ảnh AI tạo ra những sản phẩm hoàn hảo: không xước, màu đều, ánh sáng đẹp. Đó chính là rủi ro. Khách so hàng với ảnh ngay khi nhận, và khoảng cách giữa hai thứ là lý do khiếu nại, trả hàng, đánh giá xấu."
      },
      {
        "type": "flow",
        "title": "Hỏi trước khi dùng ảnh AI",
        "steps": [
          {
            "label": "Ảnh này hứa điều gì?",
            "detail": "Nếu khách tin ảnh sẽ tin điều gì về hàng, người hay dịch vụ của bạn."
          },
          {
            "label": "Có phải sản phẩm đang bán không?",
            "detail": "Nếu có, phải là ảnh hàng thật của bạn."
          },
          {
            "label": "Có người thật không?",
            "detail": "Nếu có, cần người đó đồng ý, không vẽ hay ghép."
          },
          {
            "label": "Nếu chỉ là minh hoạ",
            "detail": "Dùng AI, ghi chú 'ảnh minh hoạ', soi chi tiết lạ."
          },
          {
            "label": "Còn mơ hồ?",
            "detail": "Hỏi người phụ trách thương hiệu hoặc pháp chế trước khi đăng."
          }
        ]
      },
      {
        "type": "list",
        "items": [
          "Ảnh minh hoạ: ý tưởng, khái niệm, nền banner, hình trang trí.",
          "Ảnh sản phẩm: hàng đang bán, bao bì, kích thước thật, màu thật.",
          "Ảnh có người thật: nhân viên, khách, đối tác, người nổi tiếng.",
          "Ghi chú 'ảnh minh hoạ' giúp khách hiểu đúng loại ảnh."
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Ảnh AI hợp",
          "text": "Bài viết về mẹo, nền banner, hình trang trí bản tin, ý tưởng ban đầu chưa gửi ra ngoài. Ảnh không hứa điều gì về hàng hay người cụ thể."
        },
        "right": {
          "label": "Ảnh AI gây mất tin",
          "text": "Ảnh hàng đang bán, ảnh 'nhân viên thật', ảnh 'hiện trường', ảnh trước sau khi dùng. Khách coi ảnh là bằng chứng."
        }
      },
      {
        "type": "callout",
        "label": "Chuyện lòng tin",
        "text": "Một lần khách phát hiện ảnh không khớp hàng, họ nghi ngờ cả những ảnh thật khác của bạn. Lòng tin mất nhanh hơn cách tiết kiệm vài giờ chụp ảnh."
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI gợi ý: ảnh nào cho bài đăng này",
        "task": "Bạn sắp đăng ba thứ: bài mẹo 'cách bảo quản đèn bàn', ảnh chiếc đèn đang bán, và ảnh nhân viên kho. Viết yêu cầu nhờ AI gợi ý nguồn ảnh cho từng thứ.",
        "parts": [
          {
            "id": "context",
            "label": "Bối cảnh",
            "options": [
              {
                "text": "Tôi làm cửa hàng đèn bàn nhỏ. Bài đăng có ba ảnh: minh hoạ mẹo bảo quản, chiếc đèn đang bán, nhân viên kho thật.",
                "good": true,
                "feedback": "Phân ba loại ngay từ đầu, nên AI trả lời theo từng loại thay vì chung chung."
              },
              {
                "text": "Tôi cần ảnh cho bài đăng.",
                "feedback": "Không nói loại ảnh nào, AI sẽ gợi ý dùng AI vẽ cho tất cả, kể cả ảnh hàng thật."
              }
            ]
          },
          {
            "id": "task",
            "label": "Việc cần làm",
            "options": [
              {
                "text": "Với mỗi ảnh, cho biết dùng ảnh AI hay ảnh thật, và lý do ngắn.",
                "good": true,
                "feedback": "Yêu cầu quyết định kèm lý do, bạn đọc và kiểm được."
              },
              {
                "text": "Cho tôi ảnh đẹp nhất có thể cho cả ba.",
                "feedback": "'Đẹp nhất' nghiêng về ảnh AI hoàn hảo, bỏ qua câu hỏi ảnh hứa điều gì."
              }
            ]
          },
          {
            "id": "format",
            "label": "Định dạng",
            "options": [
              {
                "text": "Trả lời bằng bảng ba dòng: loại ảnh, nguồn, ghi chú cho khách.",
                "good": true,
                "feedback": "Bảng ngắn dễ so với suy nghĩ của bạn và dễ dán vào ghi chú."
              },
              {
                "text": "Viết một bài dài giải thích mọi khả năng.",
                "feedback": "Bài dài che mất quyết định cụ thể, bạn mất thời gian tìm ra điều cần làm."
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
            "text": "Bảng gợi ý:\n1) Minh hoạ mẹo bảo quản - ảnh AI được, ghi chú 'ảnh minh hoạ'.\n2) Chiếc đèn đang bán - phải là ảnh đèn thật của cửa hàng, vì khách dựa vào ảnh để mua.\n3) Nhân viên kho - phải là ảnh người thật, có xin phép người trong ảnh."
          },
          {
            "requires": [
              "context"
            ],
            "text": "Gợi ý chung: bài đăng có thể dùng ảnh minh hoạ cho mẹo bảo quản; hai ảnh còn lại nên là ảnh thật... (AI trả lời đúng hướng nhưng dài và thiếu bảng nên khó so với danh sách của bạn.)"
          },
          {
            "text": "Bạn có thể dùng ảnh AI cho cả ba: một chiếc đèn bàn đẹp lung linh và một nhân viên kho cười tươi, trông thật chuyên nghiệp và thu hút khách. (AI không biết phân loại ảnh, nên đề xuất vẽ cả ảnh sản phẩm và người thật.)"
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Ảnh đèn chưa kịp chụp",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Lô đèn bàn mới chưa kịp chụp ảnh, còn hai ngày là khuyến mãi bắt đầu. Đồng nghiệp đề nghị nhờ AI vẽ ảnh đèn đăng luôn.",
            "choices": [
              {
                "label": "Nhờ AI vẽ ảnh đèn thật đẹp và đăng bán",
                "next": "bad_ai"
              },
              {
                "label": "Chụp nhanh ảnh thật bằng điện thoại; dùng AI cho ảnh nền khuyến mãi",
                "next": "s2"
              }
            ]
          },
          "bad_ai": {
            "text": "Ảnh đẹp, bán được vài đơn. Hàng về thì chân đèn mảnh hơn và màu nhạt hơn ảnh, vài khách trả hàng và để lại đánh giá xấu.",
            "ending": "bad"
          },
          "s2": {
            "text": "Ảnh chụp điện thoại hơi tối. Còn thời gian chỉnh.",
            "choices": [
              {
                "label": "Chỉnh sáng vừa đủ bằng công cụ sửa ảnh, giữ màu thật, ghi chú ảnh nền là 'minh hoạ'",
                "next": "good"
              },
              {
                "label": "Nhờ AI làm lại cả chiếc đèn cho giống ảnh quảng cáo",
                "next": "bad_redo"
              }
            ]
          },
          "bad_redo": {
            "text": "AI vẽ chiếc đèn đẹp hơn hàng thật và đổi luôn hình dạng chân đèn. Bạn quay lại đúng vấn đề ban đầu, và mất thêm một buổi.",
            "ending": "bad"
          },
          "good": {
            "text": "Ảnh đèn sáng hơn, vẫn đúng màu và hình dáng. Ảnh nền có ghi chú minh hoạ. Khách nhận hàng thấy khớp ảnh, đánh giá tốt.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Ảnh hứa điều gì thì phải thật ở điều đó.",
          "Bài sau: dự án nhỏ, bộ ba ảnh cho một bài đăng."
        ]
      }
    ]
  },
  {
    "duration": "8 phút",
    "difficulty": "Dễ",
    "track": "personal",
    "isFundamental": false,
    "id": 2324,
    "slug": "du-an-nho-bo-ba-anh-cho-mot-bai-dang",
    "title": "Chặng 46, Bài 5: Dự án nhỏ: bộ ba ảnh cho một bài đăng",
    "subtitle": "Ba ảnh nhìn cùng một nhà, mô tả ghi lại để lần sau làm lại được.",
    "emoji": "🎨",
    "whyItMatters": "Một thông báo thường cần vài ảnh đi cùng nhau: đầu bài, giữa bài và cuối bài. Ba ảnh mỗi ảnh một phong cách làm bài đăng trông lộn xộn. Gộp những gì bạn học ở bốn bài trước vào một dự án nhỏ giúp bạn có bộ ảnh nhất quán và một đoạn mô tả lưu lại dùng mãi.",
    "openingQuestion": "Bạn tạo ba ảnh cho thông báo 'Ngày hội đồng nghiệp'. Ảnh đầu tranh phẳng xanh, ảnh hai ảnh chụp thật, ảnh ba hoạt hình hồng. Điều gì cần sửa trước?",
    "openingOptions": [
      "Cho cả ba ảnh cùng phong cách và bảng màu",
      "Cho cả ba ảnh cùng kích thước đúng tới từng pixel",
      "Cho cả ba ảnh cùng một nhân vật trong mỗi khung",
      "Cho cả ba ảnh nền trắng để tránh chênh lệch màu"
    ],
    "correctOption": 0,
    "explanation": "Bộ ảnh nhìn cùng một nhà khi chung phong cách và bảng màu, dù nội dung khác nhau. Kích thước đều là chi tiết phụ, sửa sau bằng cắt khung. Cùng một nhân vật mỗi ảnh là ràng buộc không cần và khó thực hiện. Nền trắng cho cả ba làm mất sức gợi của từng ảnh mà vẫn không cùng phong cách.",
    "diagram": [
      {
        "label": "Viết một đoạn chuẩn: phong cách và bảng màu",
        "arrow": true
      },
      {
        "label": "Thêm phần riêng cho từng ảnh: chủ thể, bối cảnh",
        "arrow": true
      },
      {
        "label": "Tạo ba bản mỗi ảnh, chọn cùng nhà",
        "arrow": true
      },
      {
        "label": "Soi chi tiết và lưu mô tả đã dùng"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Một nhóm hành chính làm thông báo 'Ngày hội đồng nghiệp' với ba ảnh: đầu bài, giữa bài, cuối bài. Họ viết một dòng chuẩn 'tranh minh hoạ phẳng, tông cam và xanh lá, nét viền mảnh' rồi dán vào đầu mỗi yêu cầu. Ba ảnh nhìn cùng một nhà, và khi làm thông báo tháng sau họ dán lại dòng đó, tiết kiệm được cả buổi. Đây là tình huống dựng để minh hoạ."
    },
    "quiz": [
      {
        "question": "Cách đơn giản nhất để ba ảnh nhìn cùng một nhà là gì?",
        "options": [
          "Dùng chung một đoạn mô tả phong cách và bảng màu cho cả ba",
          "Dùng chung một câu mô tả chủ thể cho cả ba ảnh",
          "Tạo ba ảnh rồi chọn ba ảnh có màu tình cờ giống nhau",
          "Tạo ba ảnh bằng ba công cụ khác nhau rồi trộn lại"
        ],
        "correct": 0,
        "explanation": "Dán cùng một đoạn phong cách và màu vào mỗi yêu cầu làm công cụ vẽ theo cùng một kiểu. Dùng chung chủ thể thì ba ảnh giống nội dung nhưng khác kiểu. Chọn màu tình cờ giống thì tốn công và khó lặp lại. Ba công cụ khác nhau thường cho ba kiểu khác nhau."
      },
      {
        "question": "Phần nào của mô tả nên khác nhau giữa ba ảnh?",
        "options": [
          "Chủ thể và bối cảnh của từng ảnh",
          "Bảng màu của từng ảnh, để mỗi ảnh nổi bật riêng",
          "Phong cách vẽ của từng ảnh, để bài đăng thêm đa dạng",
          "Tỷ lệ khung của từng ảnh, để tránh bị lặp lại"
        ],
        "correct": 0,
        "explanation": "Mỗi ảnh nói một phần khác nhau của thông báo nên chủ thể và bối cảnh khác nhau. Phong cách, bảng màu và khung nên giữ chung để ba ảnh nhìn cùng một nhà. Mỗi ảnh một màu hay một phong cách làm bài đăng trông lộn xộn."
      },
      {
        "question": "Vì sao nên ghi lại đoạn mô tả đã dùng cho từng ảnh?",
        "options": [
          "Để lần sau dán lại là ra ảnh cùng kiểu, không phải làm lại từ đầu",
          "Để chứng minh với sếp rằng bạn đã dùng nhiều công cụ",
          "Vì công cụ tạo ảnh bắt buộc có mô tả mới cho tải ảnh",
          "Vì mô tả ghi lại giúp ảnh tự sáng hơn khi tạo lần sau"
        ],
        "correct": 0,
        "explanation": "Mô tả lưu lại là công thức: lần sau đổi chủ thể, giữ nguyên phần phong cách. Nó không phải thủ tục bắt buộc của công cụ và không làm ảnh tự sáng hơn. Ghi lại cũng giúp đồng nghiệp làm tiếp đúng kiểu, nhưng mục đích chính là tái sử dụng."
      },
      {
        "question": "Ảnh số hai đẹp nhưng có chữ méo ở tấm áp phích trong nền. Nên làm gì?",
        "options": [
          "Sửa hoặc tạo lại ảnh, hoặc bỏ tấm áp phích khỏi mô tả",
          "Giữ nguyên vì chữ nhỏ trong nền thì không ai đọc kỹ đâu",
          "Để AI tự sửa chữ bằng cách gõ lại y nguyên mô tả",
          "Đổi ảnh hai sang phong cách khác cho chữ đỡ lộ"
        ],
        "correct": 0,
        "explanation": "Chữ méo là lỗi người đọc nhìn thấy và nghi ngờ cả bài đăng. Cách sửa thực tế là bỏ vật có chữ khỏi mô tả hoặc tạo lại. Gõ lại y nguyên là đánh cược. Đổi phong cách làm ba ảnh không còn cùng nhà. 'Không ai đọc' là đoán, và chữ méo vẫn gây chú ý."
      },
      {
        "question": "Ảnh số ba có người giống hệt một đồng nghiệp thật. Bạn làm gì?",
        "options": [
          "Bỏ chi tiết người giống đồng nghiệp hoặc xin phép người đó",
          "Đăng luôn, vì nhìn giống không phải lỗi gì cả",
          "Sửa cho người đó giống thêm để thông báo trông thân mật hơn",
          "Ghi tên đồng nghiệp dưới ảnh để mọi người nhận ra"
        ],
        "correct": 0,
        "explanation": "Ảnh người giống đồng nghiệp thật dễ khiến mọi người tưởng đó là họ và họ chưa đồng ý. Cách an toàn là bỏ chi tiết giống hoặc xin phép người đó. Đăng luôn hay làm giống thêm đều mở rộng rủi ro. Ghi tên dưới ảnh AI là gắn tên người vào ảnh họ không tham gia."
      }
    ],
    "keyTakeaways": [
      "Viết một đoạn chuẩn phong cách và màu, dán vào mọi yêu cầu.",
      "Chủ thể và bối cảnh khác nhau giữa các ảnh; phong cách giống nhau.",
      "Tạo ba bản mỗi ảnh rồi chọn cùng một nhà.",
      "Soi tay, chữ, người giống ai đó trước khi dùng.",
      "Ghi lại mô tả đã dùng để làm lại lần sau."
    ],
    "practicePrompt": {
      "question": "Bộ ba ảnh cho thông báo 'Khai trương phòng họp mới'. Đâu là đoạn chuẩn dùng chung hợp lý?",
      "options": [
        "Tranh minh hoạ phẳng, tông xanh dương và trắng, nét viền mảnh",
        "Ảnh đẹp, sáng sủa, hiện đại và đầy cảm xúc, còn lại tuỳ từng ảnh",
        "Một nhân viên đang bước vào phòng họp mới lúc buổi sáng",
        "Ảnh đầu chụp thật, ảnh hai tranh vẽ, ảnh ba hoạt hình"
      ],
      "correct": 0,
      "explanation": "Đoạn chuẩn chỉ nói về phong cách và màu, áp dụng cho mọi ảnh. Đoạn thứ hai toàn tính từ, không cho AI kiểu vẽ rõ. Đoạn thứ ba là một chủ thể và bối cảnh riêng của một ảnh. Đoạn thứ tư chính là lỗi cần tránh: mỗi ảnh một kiểu."
    },
    "summary": {
      "keyIdea": "Bộ ảnh nhất quán bắt nguồn từ một đoạn chuẩn dùng chung.",
      "formula": "Đoạn chuẩn (phong cách + màu) + phần riêng (chủ thể + bối cảnh) × ba ảnh, rồi soi và lưu.",
      "commonMistake": "Mỗi ảnh một kiểu vẽ rồi mong chọn lại cho giống.",
      "action": "Làm bộ ba ảnh cho một thông báo thật và lưu ba mô tả."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn một thông báo hoặc bài đăng bạn sắp gửi. Viết một đoạn chuẩn phong cách và màu, rồi ba phần riêng cho ba ảnh. Tạo và chọn ba ảnh, soi tay, chữ, người giống ai đó, rồi lưu đoạn chuẩn và ba mô tả vào một ghi chú để dùng lại.",
      "secondary": "Hôm sau bạn sẽ được hỏi: đoạn chuẩn của bạn là gì và bạn dùng lại ở đâu?"
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bài cuối của phần này là một dự án nhỏ: làm bộ ba ảnh cho một bài đăng, nhìn cùng một nhà, và ghi lại mô tả để lần sau làm lại được."
      },
      {
        "type": "feynman",
        "title": "Bộ ảnh nhất quán đơn giản hơn bạn nghĩ",
        "intro": "Hình dung ba tờ áp phích của cùng một rạp phim: nội dung mỗi tờ khác nhau nhưng khổ chữ, màu và kiểu vẽ giống nhau nên ai cũng nhận ra cùng một rạp.",
        "columns": [
          "Thành phần",
          "Ví dụ đời thường",
          "Trong bài này"
        ],
        "rows": [
          [
            "Phần chung",
            "Kiểu chữ và màu của rạp",
            "Đoạn chuẩn: phong cách và bảng màu"
          ],
          [
            "Phần riêng",
            "Tên phim và cảnh trên mỗi tờ",
            "Chủ thể và bối cảnh của mỗi ảnh"
          ],
          [
            "Sổ tay",
            "Bản mẫu áp phích để dùng lại",
            "Mô tả đã ghi lại để lần sau dán vào"
          ]
        ],
        "oneLiner": "Bộ ảnh cùng nhà là một phần chung dán vào ba phần riêng."
      },
      {
        "type": "heading",
        "text": "Vấn đề: ba ảnh, ba kiểu"
      },
      {
        "type": "paragraph",
        "text": "Công cụ tạo ảnh không nhớ ảnh trước nên mỗi lần tạo có thể ra một kiểu mới. Nếu bạn chỉ thay chủ thể, ba ảnh sẽ lệch kiểu. Giải pháp không phải chọn may mắn, mà là dán cùng một đoạn chuẩn vào đầu mỗi yêu cầu."
      },
      {
        "type": "flow",
        "title": "Dự án bộ ba ảnh",
        "steps": [
          {
            "label": "Viết đoạn chuẩn",
            "detail": "Một hai câu: kiểu vẽ, tông màu, độ dày nét, khung. Ví dụ: tranh phẳng, tông cam và xanh lá, nét viền mảnh, khung ngang."
          },
          {
            "label": "Viết ba phần riêng",
            "detail": "Mỗi ảnh một câu chủ thể và bối cảnh, ví dụ: đồng nghiệp chào nhau ở cổng, bàn trà bánh, nhóm chụp ảnh chung."
          },
          {
            "label": "Tạo ba bản mỗi ảnh",
            "detail": "Dán đoạn chuẩn rồi phần riêng. Chọn trong ba bản bản hợp nhất với hai ảnh kia."
          },
          {
            "label": "Soi chi tiết",
            "detail": "Tay, chữ, đồ vật lạ, người giống đồng nghiệp thật."
          },
          {
            "label": "Lưu công thức",
            "detail": "Ghi đoạn chuẩn và ba phần riêng vào một ghi chú, đặt tên để lần sau tìm được."
          }
        ]
      },
      {
        "type": "list",
        "items": [
          "Đoạn chuẩn ngắn, không quá hai câu, để dán vào đâu cũng gọn.",
          "Phần riêng chỉ nói điều khác nhau giữa các ảnh.",
          "Không đặt chữ quan trọng vào ảnh AI; thêm chữ bằng công cụ thiết kế.",
          "Soi từng ảnh trước khi ghép thành bộ."
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Ba ảnh rời rạc",
          "text": "Mỗi ảnh một kiểu: ảnh chụp, tranh vẽ, hoạt hình. Màu sắc không ăn nhau, bài đăng nhìn như ghép vội."
        },
        "right": {
          "label": "Bộ ba cùng nhà",
          "text": "Cùng kiểu tranh phẳng, cùng tông màu. Nội dung khác nhau, nhưng ai nhìn cũng thấy là một bộ."
        }
      },
      {
        "type": "callout",
        "label": "Không chữ, không mặt quen",
        "text": "Trong ảnh AI, chữ hay bị méo và khuôn mặt có thể giống người thật ngoài ý muốn. Giữ chữ cho công cụ thiết kế và tránh vẽ người giống đồng nghiệp cụ thể."
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Soát ghi chú của một bộ ba ảnh",
        "task": "Đồng nghiệp gửi bạn ghi chú về bộ ba ảnh cho thông báo 'Ngày hội đồng nghiệp'. Họ nói đã dùng cùng một đoạn chuẩn 'tranh phẳng, tông cam và xanh lá'. Đánh dấu những câu không khớp với việc đã làm hoặc có rủi ro.",
        "segments": [
          {
            "text": "Ảnh đầu: đồng nghiệp chào nhau ở cổng, tranh phẳng, tông cam và xanh lá."
          },
          {
            "text": "Ảnh hai: bàn trà bánh, ảnh chụp thật có màu tím, dùng để tăng độ nổi bật.",
            "error": "Ảnh chụp thật màu tím phá đoạn chuẩn (tranh phẳng, cam và xanh lá), nên bộ ba không còn cùng nhà."
          },
          {
            "text": "Ảnh ba: nhóm chụp chung, tranh phẳng, tông cam và xanh lá."
          },
          {
            "text": "Trên bàn trà có tấm biển in chữ 'NGAY HOI DONG NGHIEP 2025'.",
            "error": "Chữ trong ảnh AI hay méo và sai dấu; đã mất dấu tiếng Việt và năm có thể sai. Nên thêm chữ bằng công cụ thiết kế."
          },
          {
            "text": "Nhân vật ở giữa ảnh ba giống hệt chị Lan phòng kế toán.",
            "error": "Người giống đồng nghiệp thật mà chưa xin phép dễ gây hiểu nhầm và khó chịu; nên bỏ chi tiết đó hoặc xin phép chị Lan."
          },
          {
            "text": "Mô tả từng ảnh đã được lưu lại trong ghi chú chung của nhóm."
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Hạn chót bộ ba ảnh",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn đã có ba ảnh cho bài đăng Ngày hội đồng nghiệp. Hai ảnh cùng kiểu tranh phẳng cam xanh, nhưng ảnh thứ ba hơi khác: nét dày hơn và nền màu hồng. Còn 30 phút.",
            "choices": [
              {
                "label": "Đăng luôn, vì ảnh thứ ba đẹp hơn hai ảnh kia",
                "next": "bad_mismatch"
              },
              {
                "label": "Tạo lại ảnh ba với đoạn chuẩn đã dùng cho hai ảnh đầu",
                "next": "s2"
              }
            ]
          },
          "bad_mismatch": {
            "text": "Bài đăng lên, mọi người nhận xét ảnh cuối 'như của nhà khác'. Bạn phải thay ảnh, và bài đã lan đi bản chưa sửa.",
            "ending": "bad"
          },
          "s2": {
            "text": "Ảnh ba mới cùng kiểu với hai ảnh kia, nhưng nhân vật ở giữa có nét giống một đồng nghiệp trong phòng.",
            "choices": [
              {
                "label": "Bỏ chi tiết mặt cụ thể khỏi mô tả, tạo lại, rồi soi chi tiết",
                "next": "good"
              },
              {
                "label": "Đăng luôn, vì mọi người sẽ thấy vui khi nhận ra đồng nghiệp",
                "next": "bad_face"
              }
            ]
          },
          "bad_face": {
            "text": "Đồng nghiệp trong ảnh không biết mình bị 'vẽ' vào bài đăng và thấy khó chịu. Bài bị gỡ, bạn phải xin lỗi.",
            "ending": "bad"
          },
          "good": {
            "text": "Bộ ba ảnh nhất quán, không dính người thật. Bạn lưu đoạn chuẩn và ba mô tả vào ghi chú, bài đăng xong đúng giờ, lần sau chỉ cần đổi phần riêng.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Một đoạn chuẩn, ba phần riêng, soi kỹ rồi lưu lại.",
          "Bài sau: ghi lại màu và phong cách để mọi ảnh trông cùng một nhà."
        ]
      }
    ]
  }
];
