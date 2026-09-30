import type { Lesson } from "../lesson-types";

// Chặng 34, bài 11-15. Giáo trình: scripts/curriculum/stage-34.json.
// Số liệu, giá và tên quán trong các bài là minh hoạ; không có khẳng định về công cụ cụ thể.
export const S34_C_LESSONS: Lesson[] = [
  {
    "id": 2090,
    "slug": "xep-lich-ca-cho-tuan-toi",
    "title": "Chặng 34, Bài 11: Xếp lịch ca cho tuần tới khi ai cũng có chuyện riêng",
    "subtitle": "Xếp ca giống xếp chỗ ngồi tiệc cưới: đủ người ở bàn đông, và không ai bị xếp cạnh điều họ đã báo trước là không được.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "🗓️",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Chiều thứ Năm bạn phải chốt lịch tuần sau cho chín nhân viên, trong khi hai bạn xin nghỉ thứ Bảy, một bạn chỉ đi học buổi tối và quầy nào cũng cần đủ người vào giờ cao điểm. Nhờ AI xếp thì nhanh, nhưng nếu đưa thiếu ràng buộc, nó trả về một bảng đẹp mà thứ Bảy lại trống quầy. Bài này dạy cách giao đủ điều kiện và tự kiểm bảng trước khi dán lên nhóm.",
    "openingQuestion": "Bạn cần chốt lịch tuần sau cho 9 nhân viên: hai bạn xin nghỉ thứ Bảy, một bạn chỉ làm được ca sáng. Bạn nhờ AI xếp. Nên đưa gì cho AI trước tiên?",
    "openingOptions": [
      "Số người tối thiểu mỗi ca theo giờ, kèm ràng buộc từng người",
      "Chỉ danh sách tên chín nhân viên, còn lại AI tự đoán được quán cần mấy người",
      "Nguyện vọng của nhân viên, vì giờ đông khách AI tự suy ra từ tên món trong menu",
      "Tên quán và loại đồ uống bán chạy để AI chọn giờ làm hợp lý cho từng ngày"
    ],
    "correctOption": 0,
    "explanation": "AI chỉ xếp được điều nó biết. Nếu không có số người tối thiểu theo từng khung giờ, nó sẽ chia đều người ra các ca, và giờ cao điểm cuối tuần vẫn thiếu tay. Nếu không có ràng buộc riêng của từng người như nghỉ thứ Bảy hay chỉ làm ca sáng, bảng sẽ vi phạm ngay dòng đầu. AI cũng không biết menu của bạn kéo khách vào giờ nào, và tên quán hay loại đồ uống không cho nó con số nào để tính số người cần.",
    "diagram": [
      {
        "label": "Liệt kê ca cần người và số người tối thiểu mỗi khung giờ",
        "arrow": true
      },
      {
        "label": "Gom ràng buộc từng người: ngày nghỉ, giờ chỉ làm được, luật nghỉ giữa hai ca",
        "arrow": true
      },
      {
        "label": "AI đề xuất bảng ca theo đúng các điều kiện đó",
        "arrow": true
      },
      {
        "label": "Bạn tự kiểm ca thiếu người và giờ nghỉ liền kề rồi mới chốt"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: chị Thảo quản lý một quán cà phê nhỏ có chín nhân viên. Chị dán cho AI số người cần ở ba khung giờ, ngày xin nghỉ của từng bạn và luật quán là nghỉ ít nhất mười một tiếng giữa hai ca. Bảng AI đề xuất trông ổn, nhưng khi tự đếm từng cột chị thấy chiều thứ Bảy chỉ còn hai người trong khi cần ba. Chị sửa một dòng và nhắc AI xếp lại phần đó, thay vì phát hiện ra vào đúng giờ khách đông."
    },
    "quiz": [
      {
        "question": "Ràng buộc nào phải nói rõ với AI khi nhờ xếp lịch ca cho cả tuần?",
        "options": [
          "Số người tối thiểu mỗi khung giờ, ngày xin nghỉ và giờ nghỉ giữa hai ca",
          "Chỉ số ca mỗi người, vì như vậy công bằng nên AI sẽ tự cân đối phần còn lại",
          "Tên và tuổi từng người, để AI đoán ai hợp làm ca nào",
          "Doanh thu tuần trước của quán, AI sẽ suy ra số người cần mỗi ca"
        ],
        "correct": 0,
        "explanation": "Bảng ca là bài toán điều kiện: thiếu điều kiện nào thì AI bỏ qua điều kiện đó. Chỉ nêu số ca mỗi người thì AI không biết giờ nào cần bao nhiêu tay. Tên và tuổi không nói gì về giờ làm được. Doanh thu cả tuần không cho biết khung giờ nào đông, nên AI không suy ra được số người từng ca."
      },
      {
        "question": "AI đưa bảng ca có vẻ đầy đủ. Bước kiểm nào nên làm trước khi dán lên nhóm?",
        "options": [
          "Đếm số người từng khung giờ và số tiếng nghỉ giữa hai ca của từng người",
          "Đọc lướt qua thấy các ô đều nhau là đủ, vì AI xếp bảng theo thuật toán nên luôn cân đối",
          "Hỏi lại chính AI xem bảng đúng chưa và tin câu trả lời nó đưa, vì nó vừa xếp xong",
          "Chỉ kiểm dòng đầu tiên rồi suy ra các dòng sau, vì cách xếp mỗi ngày đều giống nhau"
        ],
        "correct": 0,
        "explanation": "Lỗi hay nằm ở đếm: thiếu một người ở khung cao điểm, hoặc ca tối rồi ca sáng liền nhau. Đọc lướt không bắt được. Hỏi lại AI thì nó thường trả lời 'đúng rồi' dù bảng sai. Dòng đầu đúng không bảo đảm các dòng sau đúng."
      },
      {
        "question": "Một bạn nhắn tối nay xin nghỉ thứ Bảy, khi bảng đã xếp xong. Cách xử lý hợp lý nhất?",
        "options": [
          "Cập nhật ràng buộc mới và nhờ AI xếp lại, rồi kiểm lại cả cột thứ Bảy",
          "Đổi tên bạn đó thành tên người khác trong bảng bằng tay, không cần kiểm lại",
          "Nhờ AI 'sửa lịch cho phù hợp' mà không nói thay đổi gì cụ thể",
          "Giữ nguyên bảng vì đã chốt và bảo bạn đó tự tìm người đổi ca"
        ],
        "correct": 0,
        "explanation": "Đổi ca tay mà không kiểm dễ làm người thay bị dính ca liền hoặc quầy lệch số người. Yêu cầu chung chung như 'sửa cho phù hợp' khiến AI có thể đổi cả những ca đã ổn. Bắt nhân viên tự tìm người thay là bỏ trách nhiệm cân đối của bạn và dễ ra ca thiếu người."
      },
      {
        "question": "Vì sao nên yêu cầu AI ghi lý do cho mỗi ca đặt vào một người?",
        "options": [
          "Để bạn nhìn ra ngay ca nào nó xếp trái ràng buộc rồi sửa",
          "Vì lý do AI viết ra là sự thật",
          "Vì bảng có lý do thì nhân viên sẽ không xin đổi ca",
          "Vì có lý do thì bảng chạy nhanh hơn"
        ],
        "correct": 0,
        "explanation": "Lý do ngắn bên cạnh mỗi ca giúp bạn soát nhanh: thấy chữ 'người này xin nghỉ' cạnh một ca là biết sai. Nhưng lý do do AI viết vẫn có thể sai, nên không thay được việc kiểm. Nó cũng không ngăn nhân viên xin đổi ca, và không làm bảng chính xác hơn, chỉ làm lỗi dễ thấy hơn."
      },
      {
        "question": "Quán cần 2 người ca sáng, 3 người ca chiều mỗi ngày trong 7 ngày. Bảng của AI có 33 lượt ca. Kết luận nào đúng?",
        "options": [
          "Thiếu 2 lượt, vì cần 7 × (2 + 3) = 35 lượt ca",
          "Đủ, vì 33 gần bằng 35 và chênh chút không đáng kể ở quán nhỏ",
          "Thừa 2 lượt, vì 2 + 3 = 5 và 5 × 7 = 33 nên đã đủ",
          "Chưa thể kết luận vì AI luôn xếp đủ số lượt ca theo yêu cầu"
        ],
        "correct": 0,
        "explanation": "Cần 5 người mỗi ngày nhân 7 ngày là 35 lượt, nên 33 lượt là thiếu 2. Chênh 'chút' có thể chính là quầy trống lúc đông khách. Con số 33 không thể là 5 × 7. Và AI không luôn xếp đủ: đếm lại là việc của bạn."
      }
    ],
    "keyTakeaways": [
      "Giao cho AI đủ ba thứ: số người tối thiểu mỗi khung giờ, ràng buộc từng người, luật nghỉ giữa hai ca.",
      "Bảng AI xếp là bản nháp, không phải bản chốt.",
      "Tự đếm người từng khung giờ và giờ nghỉ liền kề trước khi dán lên nhóm.",
      "Khi có thay đổi, nêu ràng buộc mới cụ thể rồi kiểm lại cả cột bị ảnh hưởng."
    ],
    "practicePrompt": {
      "question": "Chị Lan gửi AI danh sách tên nhân viên và nhờ 'xếp lịch tuần sau cho hợp lý', rồi dán bảng lên nhóm. Thiếu bước gì?",
      "options": [
        "Nêu số người cần mỗi khung giờ và ràng buộc từng người, rồi tự đếm lại bảng",
        "Nhờ AI xếp thêm một bảng khác để chọn cái đẹp hơn",
        "Thêm phần chúc tuần mới vui vẻ vào bảng cho thân thiện",
        "Chia bảng làm hai nửa để nhân viên ca sáng và ca chiều khỏi đọc nhầm với nhau"
      ],
      "correct": 0,
      "explanation": "Không có số người tối thiểu và ràng buộc thì AI chỉ chia đều người ra các ô, và không ai đếm lại thì lỗi lộ ra vào đúng giờ đông. Xếp thêm bảng không thêm điều kiện nào. Lời chúc và cách chia bảng không sửa được ca thiếu người."
    },
    "summary": {
      "keyIdea": "AI xếp bảng ca nhanh, nhưng chỉ đúng với điều kiện bạn đưa, và bạn là người đếm lại.",
      "formula": "Số người tối thiểu từng khung giờ + ràng buộc từng người + luật nghỉ = bảng nháp để tự kiểm.",
      "commonMistake": "Chỉ đưa danh sách tên rồi tin bảng vì nó nhìn cân đối.",
      "action": "Viết ra số người tối thiểu của ba khung giờ trong tuần của bạn trước khi hỏi AI."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Lấy bảng ca tuần này của quán (hoặc của đội bạn). Viết ra số người tối thiểu ở từng khung giờ và ba ràng buộc thật của nhân viên. Nhờ AI xếp tuần sau theo đó, rồi tự đếm số người từng khung giờ và số tiếng nghỉ giữa hai ca. Ghi lại đúng một chỗ AI xếp sai.",
      "secondary": "Nếu chưa có nhân viên, dùng lịch làm việc của gia đình hoặc nhóm bạn."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Lịch ca là việc mà bạn làm mỗi tuần và ai cũng nhìn vào. Một ô sai không chỉ làm quầy thiếu người mà còn làm một bạn mất buổi học. Bài này dạy cách giao việc cho AI có điều kiện rõ, và cách tự kiểm bảng để không phải sửa lúc khách đã đông."
      },
      {
        "type": "feynman",
        "title": "Xếp lịch ca đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới việc xếp chỗ ngồi tiệc cưới. Bạn biết bàn nào ngồi được mấy người, và biết vài người không được ngồi cạnh nhau. AI giúp xếp nhanh, nhưng nếu bạn quên nói bàn nào chỉ có sáu ghế thì nó cũng xếp tám người vào.",
        "columns": [
          "Thành phần",
          "Xếp chỗ tiệc cưới",
          "Xếp lịch ca"
        ],
        "rows": [
          [
            "Sức chứa",
            "Số ghế mỗi bàn",
            "Số người tối thiểu mỗi khung giờ"
          ],
          [
            "Điều không được",
            "Hai người không ngồi cạnh nhau",
            "Ngày xin nghỉ, giờ chỉ làm được, giờ nghỉ giữa hai ca"
          ],
          [
            "Người giúp xếp nhanh",
            "Cô dâu chú rể thử nhiều cách",
            "AI đề xuất bảng nháp"
          ],
          [
            "Kiểm tra",
            "Đếm ghế từng bàn",
            "Đếm người từng khung giờ"
          ]
        ],
        "oneLiner": "Nói rõ sức chứa và điều không được, để AI xếp nháp và bạn đếm lại."
      },
      {
        "type": "heading",
        "text": "Bảng đẹp chưa chắc là bảng đủ người"
      },
      {
        "type": "paragraph",
        "text": "AI viết bảng rất gọn, hàng cột thẳng, tên đều nhau, nên bạn dễ tin. Nhưng một bảng có 35 lượt ca cần mà chỉ có 33 vẫn nhìn gọn như bảng đủ. Vì vậy ta tách việc: AI đề xuất, còn con số cần và luật nghỉ là của bạn."
      },
      {
        "type": "chart",
        "title": "Cần bao nhiêu người theo khung giờ trong một ngày thường",
        "caption": "Số liệu minh hoạ, không phải số đo thật của quán nào: bạn thay bằng số của quán mình. Đường này cho thấy cùng một ngày mà giờ đông cần gấp ba số người giờ vắng.",
        "kind": "bar",
        "xLabel": "Khung giờ",
        "yLabel": "Số nhân viên cần",
        "data": [
          {
            "label": "7h",
            "values": [
              2
            ]
          },
          {
            "label": "9h",
            "values": [
              3
            ]
          },
          {
            "label": "11h",
            "values": [
              4
            ]
          },
          {
            "label": "13h",
            "values": [
              3
            ]
          },
          {
            "label": "15h",
            "values": [
              2
            ]
          },
          {
            "label": "17h",
            "values": [
              3
            ]
          },
          {
            "label": "19h",
            "values": [
              4
            ]
          },
          {
            "label": "21h",
            "values": [
              2
            ]
          }
        ],
        "seriesLabels": [
          "Số người cần (minh hoạ)"
        ]
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Giao việc xếp ca cho AI",
        "task": "Bạn có 9 nhân viên và cần lịch tuần sau. Lắp prompt để AI xếp một bảng nháp mà bạn còn kiểm được.",
        "parts": [
          {
            "id": "need",
            "label": "Số người cần",
            "options": [
              {
                "text": "Quán có 9 nhân viên, hãy xếp cho hợp lý.",
                "feedback": "Không có số người tối thiểu, AI chia đều và giờ đông cuối tuần vẫn thiếu tay."
              },
              {
                "text": "Cần 2 người ca sáng, 3 người ca chiều, 4 người 11h-13h và 19h-21h mỗi ngày.",
                "good": true,
                "feedback": "Có số người cụ thể từng khung giờ, AI đối chiếu được và bạn cũng đếm lại được."
              }
            ]
          },
          {
            "id": "limit",
            "label": "Ràng buộc từng người",
            "options": [
              {
                "text": "Mọi người đều linh hoạt nên xếp tuỳ ý.",
                "feedback": "Bạn Mai xin nghỉ thứ Bảy và bạn Nam chỉ làm ca sáng sẽ bị xếp sai ngay dòng đầu."
              },
              {
                "text": "Mai nghỉ thứ Bảy, Nam chỉ làm ca sáng, và nghỉ ít nhất 11 tiếng giữa hai ca.",
                "good": true,
                "feedback": "Ràng buộc nêu đích danh, nên vi phạm nào cũng lộ ra khi bạn dò bảng."
              }
            ]
          },
          {
            "id": "format",
            "label": "Cách trình bày",
            "options": [
              {
                "text": "Xếp xong cho tôi bảng gọn nhất có thể.",
                "feedback": "Bảng gọn nhưng không có lý do, bạn không biết chỗ nào nó đã bỏ qua ràng buộc."
              },
              {
                "text": "Bảng theo ngày và ca, thêm cột đếm số người mỗi ca và ghi chú nếu thiếu.",
                "good": true,
                "feedback": "Cột đếm và ghi chú thiếu giúp bạn thấy lỗi ngay thay vì phải tự đếm từ đầu."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "need",
              "limit",
              "format"
            ],
            "text": "Thứ Bảy 11h-13h: Hoa, Lan, Minh, Tú (4/4). Thứ Bảy 19h-21h: Hoa, Lan, Tú (3/4, THIẾU 1 người, chưa có ai rảnh).\nMai không xếp thứ Bảy. Nam chỉ ca sáng.\n(Bảng có cột đếm và cảnh báo, bạn thấy ngay chỗ cần xử lý.)"
          },
          {
            "requires": [
              "need"
            ],
            "text": "Thứ Bảy 19h-21h: Hoa, Lan, Mai, Tú.\n(Đủ người nhưng Mai đã báo nghỉ thứ Bảy, và ca sáng thứ Bảy của Nam bị xếp sang ca tối.)"
          },
          {
            "text": "Thứ Hai đến Chủ nhật, mỗi ca 2 người, chia đều cho 9 bạn.\n(Đều tay nhưng 19h thứ Bảy chỉ có 2 người, và không ràng buộc nào được nhắc tới.)"
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Đưa đủ ba thứ rồi kiểm",
          "text": "AI biết cần bao nhiêu người, ai nghỉ ngày nào, nghỉ giữa ca bao lâu. Bảng nháp có cột đếm nên bạn dò trong vài phút. Sai ở đâu bạn thấy ngay và sửa đúng chỗ đó."
        },
        "right": {
          "label": "Chỉ đưa danh sách tên",
          "text": "AI đoán số người và bỏ qua ngày nghỉ. Bảng đều nhưng sai nhiều chỗ. Bạn không biết bắt đầu kiểm từ đâu, và khi phát hiện thường đã dán lên nhóm."
        }
      },
      {
        "type": "callout",
        "label": "Chuyện luật lao động",
        "text": "Nghỉ giữa ca, số giờ tối đa mỗi tuần, làm thêm giờ và phụ cấp là quy định của pháp luật lao động và của công ty. AI có thể nhắc nhưng có thể nhớ sai. Điều nào liên quan tới quy định, hỏi bộ phận nhân sự hoặc chuyên gia lao động rồi ghi vào luật của quán."
      },
      {
        "type": "scenario",
        "title": "Chiều thứ Năm, chốt lịch tuần sau",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "AI đã trả về bảng ca tuần sau cho chín bạn. Bảng nhìn gọn, mỗi ngày đủ tên. Còn 40 phút trước khi bạn phải đăng lên nhóm.",
            "choices": [
              {
                "label": "Đăng luôn, vì bảng nhìn đều và đủ tên",
                "next": "bad_post"
              },
              {
                "label": "Đếm người từng khung giờ và giờ nghỉ giữa hai ca trước",
                "next": "s2"
              }
            ]
          },
          "bad_post": {
            "text": "Sáng thứ Bảy quầy chỉ có hai người trong giờ đông. Bạn Mai vốn xin nghỉ đã bị xếp ca và nhắn phản đối. Bạn phải đi gọi từng người xin đổi ca lúc 6 giờ sáng.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bạn thấy tối thứ Bảy 19h-21h chỉ có ba người trong khi cần bốn, và Hoa làm ca tối thứ Sáu rồi ca sáng thứ Bảy.",
            "choices": [
              {
                "label": "Sửa tay hai ô rồi đăng luôn, khỏi kiểm lại",
                "next": "bad_manual"
              },
              {
                "label": "Nhắn AI ràng buộc rõ, xếp lại hai ca đó, rồi đếm lại cả cột thứ Bảy",
                "next": "good"
              }
            ]
          },
          "bad_manual": {
            "text": "Bạn đổi Hoa sang người khác nhưng người đó lại có ca sáng thứ Sáu ngay trước. Thứ Bảy lại thiếu một ca khác mà bạn không nhận ra.",
            "ending": "bad"
          },
          "good": {
            "text": "Bảng mới đủ người ở mọi khung giờ và không ai bị ca liền. Bạn đăng lúc 4 giờ chiều, và lưu ba dòng ràng buộc làm mẫu cho tuần sau.",
            "ending": "good"
          }
        }
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Viết số người tối thiểu cho từng khung giờ trong tuần.",
          "Bước 2 - Ghi ràng buộc thật của từng người và luật nghỉ giữa hai ca.",
          "Bước 3 - Nhờ AI xếp nháp, yêu cầu thêm cột đếm số người.",
          "Bước 4 - Tự đếm lại và chỉ khi đủ mới dán lên nhóm."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "AI xếp nháp, con số cần và luật nghỉ là của bạn, kiểm là của bạn.",
          "Bài sau: rà lịch ca AI vừa xếp để bắt chỗ vô lý."
        ]
      }
    ]
  },
  {
    "id": 2091,
    "slug": "soat-lich-ca-ai-vua-xep",
    "title": "Chặng 34, Bài 12: Lịch ca AI vừa xếp có chỗ vô lý",
    "subtitle": "Rà lịch ca như soát hoá đơn: từng dòng một, so với luật của quán, không tin vì cả bảng trông đều.",
    "duration": "8 phút",
    "difficulty": "Trung bình",
    "emoji": "🔎",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Bạn nhận được một bảng ca từ AI hoặc từ đồng nghiệp, và nó nhìn rất ổn. Nhưng có bạn làm hai ca liền, có bạn không có ngày nghỉ, có tối thứ Bảy chỉ có một người. Những lỗi này không lộ khi đọc lướt mà chỉ lộ khi bạn dò từng dòng theo luật của quán. Bài này cho bạn một quy trình dò ngắn để bắt chúng trước khi lịch được dán lên nhóm.",
    "openingQuestion": "AI vừa trả bảng ca tuần sau, trông đều và đầy đủ. Cách rà nào bắt được nhiều lỗi vô lý nhất?",
    "openingOptions": [
      "Dò từng người theo luật quán: ca liền, ngày nghỉ, rồi đếm người mỗi ca",
      "Đọc từ trên xuống, thấy đẹp mắt thì coi như ổn vì AI xếp theo thuật toán",
      "Chỉ soát ngày thứ Bảy và Chủ nhật vì các ngày trong tuần ít khi sai",
      "Nhờ chính AI đó tự khẳng định bảng của nó không vi phạm luật nào"
    ],
    "correctOption": 0,
    "explanation": "Dò theo từng người và từng khung giờ bắt được cả hai loại lỗi: lỗi về người (ca liền, thiếu ngày nghỉ) và lỗi về ca (thiếu người). Đọc xuôi thấy đẹp không cho bạn thấy con số nào. Chỉ soát cuối tuần bỏ qua ca liền vào giữa tuần. Còn nhờ chính AI tự khẳng định thì nó thường trả lời 'không vi phạm' vì nó không có cách kiểm luật của quán ngoài điều bạn đã nói.",
    "diagram": [
      {
        "label": "Ghi ra luật của quán: nghỉ giữa hai ca, ngày nghỉ, số người tối thiểu",
        "arrow": true
      },
      {
        "label": "Dò từng người: ca liền và ngày nghỉ trong tuần",
        "arrow": true
      },
      {
        "label": "Dò từng ca: đếm người có đủ không",
        "arrow": true
      },
      {
        "label": "Gạch chỗ sai, xin AI sửa đúng chỗ đó rồi dò lại"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một quán ăn có bảng ca do AI xếp cho tám bạn. Người quản lý dò từng dòng và thấy ba chỗ: một bạn làm ca tối thứ Ba rồi ca sáng thứ Tư, một bạn làm bảy ngày liền, và tối thứ Bảy chỉ có một người. Cô chỉ nhờ AI sửa ba chỗ đó, rồi dò lại cả tuần một lần nữa thay vì xếp lại từ đầu."
    },
    "quiz": [
      {
        "question": "Bảng ca có người làm ca tối ngày Ba rồi ca sáng ngày Tư. Luật quán là nghỉ ít nhất 11 tiếng. Ca tối kết thúc 23h, ca sáng bắt đầu 7h. Kết luận?",
        "options": [
          "Vi phạm, vì chỉ nghỉ 8 tiếng (23h đến 7h) trong khi cần 11 tiếng",
          "Không vi phạm, vì hai ca nằm ở hai ngày khác nhau nên tính là nghỉ đủ",
          "Không vi phạm, vì 23h đến 7h là 12 tiếng nên còn dư một tiếng",
          "Vi phạm một tiếng thôi, cho qua được vì người làm không phàn nàn"
        ],
        "correct": 0,
        "explanation": "23h đến 7h sáng hôm sau là 8 tiếng, thiếu 3 tiếng so với 11. Hai ngày khác nhau không có nghĩa là nghỉ đủ, vì luật tính theo tiếng chứ không theo ngày. 12 tiếng là phép tính sai. Và thiếu 3 tiếng, không phải 1, nên đây không phải chuyện cho qua."
      },
      {
        "question": "Ngày Chủ nhật của bảng có tên bảy người, trong đó bạn Nam đã làm liên tục từ thứ Hai. Việc nên làm?",
        "options": [
          "Kiểm xem Nam có ngày nghỉ nào trong tuần không, thiếu thì thay ca",
          "Bỏ qua, vì AI hay xếp một người nhiều ca nếu người đó làm tốt và quầy đang cần",
          "Xoá tên Nam khỏi Chủ nhật để có ngày nghỉ, còn quầy thiếu người thì tính sau",
          "Thêm ca cho Nam vào thứ Bảy để cân đối số ca giữa mọi người trong tuần"
        ],
        "correct": 0,
        "explanation": "Không có ngày nghỉ trong tuần là lỗi cần sửa, dù bạn đó có làm tốt hay không. Xoá tên mà không thay làm Chủ nhật thiếu người. Thêm ca cho Nam càng làm bạn ấy mệt hơn."
      },
      {
        "question": "Vì sao khi phát hiện lỗi nên nhờ AI sửa đúng chỗ đó thay vì xếp lại cả bảng?",
        "options": [
          "Xếp lại cả bảng có thể làm hỏng những ô đã đúng",
          "Vì AI chỉ sửa được một ô mỗi lần",
          "Vì sửa từng ô thì bảng hết lỗi hoàn toàn",
          "Vì xếp lại làm AI mất giọng của bạn"
        ],
        "correct": 0,
        "explanation": "Bảng mới có thể phá những ô bạn đã dò kỹ, và bạn phải dò lại từ đầu. AI sửa được nhiều ô cùng lúc, và không cách nào bảo đảm hết lỗi hoàn toàn: dù sửa gì bạn vẫn phải dò lại. Giọng văn không liên quan tới bảng ca."
      },
      {
        "question": "Bảng cho thấy tối thứ Bảy có 1 người trong khi quầy cần 3. Cách xử lý nào hợp lý?",
        "options": [
          "Nêu rõ số người còn thiếu và ràng buộc, nhờ AI đề xuất người rảnh cho ca đó",
          "Nhờ AI ghi ba tên bất kỳ vào ca đó cho đủ số người",
          "Bỏ qua vì tối thứ Bảy ở quán thường có khách vãng lai ít",
          "Xếp thêm ba người vào ca đó mà không kiểm ai đã hết giờ làm trong tuần, miễn là đủ số người"
        ],
        "correct": 0,
        "explanation": "AI cần biết ai còn rảnh và ai đã đủ giờ mới đề xuất được đúng. Ghi tên bất kỳ có thể chọn người đã xin nghỉ hoặc vừa làm ca liền. Giả định 'khách ít' là đoán, không phải số đo. Và thêm người mà không kiểm là cách đổi lỗi này lấy lỗi khác."
      },
      {
        "question": "Nếu bảng có 8 người, mỗi người tối đa 5 ca một tuần, quầy cần 6 ca mỗi ngày trong 7 ngày. Bảng có thể đủ không?",
        "options": [
          "Không, vì cần 42 lượt ca mà 8 người chỉ làm tối đa 40",
          "Có, vì 8 người nhân 6 ca là 48 lượt, đủ cho 42 lượt cần",
          "Có, vì cần 6 người mỗi ngày mà có 8 người nên còn dư",
          "Chưa biết được, vì AI luôn tìm ra cách xếp cho vừa"
        ],
        "correct": 0,
        "explanation": "Cần 6 nhân 7 là 42 lượt, còn 8 người nhân 5 là 40, thiếu 2, nên không xếp đủ mà không thêm giờ hoặc người. Nhân 8 với 6 là nhầm số ca cần với số ca mỗi người. Có dư người trong danh sách không có nghĩa là đủ lượt ca. Và AI không tạo ra lượt ca thừa."
      }
    ],
    "keyTakeaways": [
      "Dò từng người (ca liền, ngày nghỉ) rồi dò từng ca (đủ người).",
      "Luật của quán viết ra thành số, không giữ trong đầu.",
      "Chỉ nhờ AI sửa đúng chỗ sai, rồi dò lại cả bảng.",
      "Đếm lượt ca cần và lượt ca có, vì bảng gọn có thể thiếu."
    ],
    "practicePrompt": {
      "question": "Bảng ca có lỗi ở ba ô. Chị Hà nhờ AI 'xếp lại cho đúng' và dán luôn bảng mới. Rủi ro lớn nhất là gì?",
      "options": [
        "Bảng mới có thể phá những ô đã đúng, và chưa ai dò lại",
        "AI sẽ không chịu xếp lại lần thứ hai",
        "Bảng mới luôn dài hơn bảng cũ nên nhân viên khó đọc hơn nhiều",
        "Nhân viên sẽ nhận ra bảng do AI xếp và không tin"
      ],
      "correct": 0,
      "explanation": "Xếp lại cả bảng làm những ô đã đúng có thể đổi theo, và không dò lại thì lỗi mới lọt qua. AI thường vẫn xếp lại được nhiều lần. Độ dài bảng không tăng vì số dòng vẫn theo số ca. Và nhân viên quan tâm bảng đúng hay sai chứ không quan tâm ai xếp."
    },
    "summary": {
      "keyIdea": "Bảng ca trông đều chưa phải là bảng đúng: dò từng người và từng ca theo luật của quán.",
      "formula": "Luật viết thành số + dò từng người + dò từng ca = bảng đã soát.",
      "commonMistake": "Đọc lướt, thấy đều tay rồi đăng, hoặc nhờ AI tự khẳng định bảng của nó đúng.",
      "action": "Viết ba luật ca của quán bạn thành số cụ thể (giờ nghỉ, ngày nghỉ, người tối thiểu)."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Lấy một bảng ca thật của tuần này. Viết ba luật của quán thành con số (giờ nghỉ giữa hai ca, ngày nghỉ, số người tối thiểu) rồi dò từng người và từng ca. Đánh dấu tối đa ba chỗ vô lý, ghi luật nào bị phá ở mỗi chỗ.",
      "secondary": "Chưa có bảng thật thì dùng bảng ca trong bài và làm lại phần dò bằng giấy."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Nhận một bảng ca thì ai cũng muốn đăng cho xong. Nhưng lỗi ca liền hay thiếu người chỉ lộ ra khi đã có người phải đi làm. Bài này cho bạn một cách dò ngắn và một buổi tập bắt lỗi trên bảng giả."
      },
      {
        "type": "feynman",
        "title": "Soát lịch ca đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới việc soát hoá đơn nhập hàng. Bạn không đọc từ đầu tới cuối cho thuận mắt, mà so từng dòng với đơn đặt và kiểm tổng. Lịch ca cũng vậy: so từng người với luật quán, rồi kiểm tổng người của từng ca.",
        "columns": [
          "Bước",
          "Soát hoá đơn nhập hàng",
          "Soát lịch ca"
        ],
        "rows": [
          [
            "So từng dòng",
            "Dòng hàng với đơn đặt",
            "Từng người với luật nghỉ và ngày nghỉ"
          ],
          [
            "Kiểm tổng",
            "Tổng tiền cuối hoá đơn",
            "Số người mỗi ca so với số cần"
          ],
          [
            "Chỗ hay sai",
            "Số lượng, đơn giá",
            "Ca liền, thiếu ngày nghỉ, thiếu người"
          ],
          [
            "Sau khi thấy sai",
            "Gạch dòng, hỏi nhà cung cấp",
            "Gạch ô, nhờ AI sửa đúng ô đó"
          ]
        ],
        "oneLiner": "Không đọc cho thuận mắt: so từng dòng với luật, rồi kiểm tổng."
      },
      {
        "type": "heading",
        "text": "Ba loại lỗi hay gặp"
      },
      {
        "type": "paragraph",
        "text": "Loại một là ca liền: người làm ca tối rồi ca sáng hôm sau, nghỉ chưa đủ số tiếng. Loại hai là thiếu ngày nghỉ: một người làm cả tuần. Loại ba là thiếu người: ca cần ba mà chỉ có một. Ba loại này không lộ khi đọc lướt nhưng lộ ngay khi bạn dò theo luật."
      },
      {
        "type": "flow",
        "title": "Dò một bảng ca trong năm bước",
        "steps": [
          {
            "label": "Viết luật thành số",
            "detail": "Ví dụ: nghỉ ít nhất 11 tiếng giữa hai ca, mỗi người nghỉ ít nhất 1 ngày trong tuần, tối thứ Bảy cần 3 người."
          },
          {
            "label": "Dò từng người",
            "detail": "Đọc hàng ngang của mỗi người: có ca tối ngay trước ca sáng không, có ngày nào để trống không."
          },
          {
            "label": "Dò từng ca",
            "detail": "Đọc cột dọc: đếm số người mỗi ca và so với số cần."
          },
          {
            "label": "Gạch chỗ sai và ghi luật bị phá",
            "detail": "Ghi ngắn: 'Hoa, thứ Ba tối sang thứ Tư sáng, nghỉ 8 tiếng'."
          },
          {
            "label": "Nhờ AI sửa đúng chỗ đó, rồi dò lại",
            "detail": "Sửa xong dò lại cả bảng, vì sửa một ô có thể làm sai ô khác."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Bắt lỗi trong bảng ca AI vừa xếp",
        "task": "Luật quán: nghỉ ít nhất 11 tiếng giữa hai ca (ca sáng 7h-15h, ca tối 15h-23h), mỗi người nghỉ ít nhất 1 ngày, tối thứ Bảy cần 3 người, Mai đã báo nghỉ thứ Bảy. Bấm các dòng vi phạm luật rồi nộp.",
        "segments": [
          {
            "text": "Thứ Hai: Lan ca sáng, Minh ca tối, Hoa ca sáng."
          },
          {
            "text": "Thứ Ba: Hoa ca tối, Nam ca sáng, Tú ca tối."
          },
          {
            "text": "Thứ Tư: Hoa ca sáng, Lan ca sáng, Minh ca tối.",
            "error": "Hoa làm ca tối thứ Ba (đến 23h) rồi ca sáng thứ Tư (từ 7h): chỉ nghỉ 8 tiếng, thiếu 3 tiếng so với luật 11 tiếng."
          },
          {
            "text": "Thứ Sáu: Nam ca sáng, Tú ca tối, Lan ca tối."
          },
          {
            "text": "Thứ Bảy: ca tối chỉ có Tú.",
            "error": "Tối thứ Bảy cần 3 người mà bảng chỉ có 1 người."
          },
          {
            "text": "Thứ Bảy: Mai ca sáng.",
            "error": "Mai đã báo nghỉ thứ Bảy nhưng vẫn bị xếp ca."
          },
          {
            "text": "Tổng kết: Nam làm cả bảy ngày, không có ngày nghỉ.",
            "error": "Nam không có ngày nghỉ nào trong tuần, vi phạm luật mỗi người nghỉ ít nhất 1 ngày."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Dò theo luật viết thành số",
          "text": "Mỗi lỗi có một luật đặt cạnh, nên bạn biết sai ở đâu và sửa đúng chỗ. Bạn dò được cả bảng trong vài phút và lần sau dùng lại được bộ luật đó."
        },
        "right": {
          "label": "Đọc lướt thấy ổn thì đăng",
          "text": "Bạn chỉ thấy bảng gọn, không thấy con số nào. Lỗi lộ ra khi ca đã bắt đầu, lúc đó sửa thì phải gọi từng người và làm phiền cả nhóm."
        }
      },
      {
        "type": "callout",
        "label": "Khi AI nói 'bảng không vi phạm luật nào'",
        "text": "AI chỉ biết luật mà bạn đã gõ vào, và nó có thể khẳng định chắc chắn dù bảng sai. Câu trả lời đó không thay được lần dò của bạn. Với quy định pháp luật về giờ làm và nghỉ, hỏi bộ phận nhân sự hoặc chuyên gia."
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI sửa đúng chỗ sai",
        "task": "Bạn đã tìm ra ba chỗ sai trong bảng. Lắp prompt để AI sửa mà không phá phần đã đúng.",
        "parts": [
          {
            "id": "scope",
            "label": "Phạm vi",
            "options": [
              {
                "text": "Bảng sai rồi, xếp lại toàn bộ cho đúng.",
                "feedback": "Xếp lại cả bảng có thể phá những ô đã đúng, và bạn phải dò lại từ đầu."
              },
              {
                "text": "Giữ nguyên bảng, chỉ sửa 3 chỗ tôi nêu: Hoa thứ Tư, tối thứ Bảy, Nam không có ngày nghỉ.",
                "good": true,
                "feedback": "Phạm vi rõ, AI không đụng những ô đã đúng nên bạn chỉ dò lại chỗ đổi."
              }
            ]
          },
          {
            "id": "rule",
            "label": "Luật kèm theo",
            "options": [
              {
                "text": "Sửa sao cho hợp lý.",
                "feedback": "Không có luật, AI sửa theo ý nó và có thể vẫn để ca liền."
              },
              {
                "text": "Sửa theo luật: nghỉ ít nhất 11 tiếng giữa hai ca; Mai không xếp thứ Bảy.",
                "good": true,
                "feedback": "Luật cụ thể giúp AI chọn người thay mà không phá luật khác."
              }
            ]
          },
          {
            "id": "check",
            "label": "Cách trả kết quả",
            "options": [
              {
                "text": "Chỉ cần bảng mới, không cần giải thích.",
                "feedback": "Không có ghi chú, bạn không biết AI đã đổi những ô nào."
              },
              {
                "text": "Trả bảng mới và liệt kê từng ô đã đổi, từ tên nào sang tên nào.",
                "good": true,
                "feedback": "Danh sách thay đổi cho bạn dò lại đúng những ô đó."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "scope",
              "rule",
              "check"
            ],
            "text": "Đã đổi 3 chỗ:\n1) Thứ Tư sáng: Hoa -> Lan (Hoa nghỉ đủ 11 tiếng sau ca tối thứ Ba).\n2) Thứ Bảy tối: thêm Minh và Nam.\n3) Chủ nhật: Nam nghỉ.\n(Các ô khác giữ nguyên.)"
          },
          {
            "requires": [
              "scope"
            ],
            "text": "Đã sửa 3 chỗ, nhưng thứ Tư sáng Hoa được đổi sang Nam, mà Nam đã làm ca tối thứ Ba.\n(Đúng phạm vi nhưng thiếu luật nghỉ nên lỗi mới xuất hiện.)"
          },
          {
            "text": "Đây là bảng mới hoàn toàn, đã cân đối lại cho mọi người.\n(Chưa nói đổi gì, và thứ Bảy có ca của Mai trở lại.)"
          }
        ]
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Viết ba luật của quán thành con số.",
          "Bước 2 - Dò từng người, rồi từng ca.",
          "Bước 3 - Ghi luật bị phá ở mỗi chỗ sai.",
          "Bước 4 - Chỉ nhờ AI sửa các chỗ đó, rồi dò lại cả bảng."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Bảng đẹp không phải bảng đúng: dò từng dòng theo luật.",
          "Bài sau: nhân viên xin đổi ca chỉ vài tiếng trước giờ làm."
        ]
      }
    ]
  },
  {
    "id": 2092,
    "slug": "nhan-vien-xin-doi-ca-sat-gio",
    "title": "Chặng 34, Bài 13: Nhân viên xin đổi ca chỉ vài tiếng trước giờ làm",
    "subtitle": "Hai lời xin đổi ca cùng lúc giống hai xe cùng xin rẽ vào một làn: bạn cần luật ưu tiên rõ chứ không cần đoán ý từng người.",
    "duration": "8 phút",
    "difficulty": "Trung bình",
    "emoji": "🔁",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Ba giờ chiều, hai bạn cùng nhắn xin đổi ca tối nay, một bạn vì con ốm, một bạn vì đi hẹn. Bạn biết trả lời quá gắt thì mất người, dễ dãi thì quầy trống và những bạn khác thấy bất công. AI có thể giúp bạn soạn tin trả lời gọn và lịch sự, nhưng cân bằng giữa công bằng và nhu cầu của quầy là việc của bạn. Bài này tập qua một tình huống.",
    "openingQuestion": "Hai nhân viên cùng nhắn xin đổi ca tối nay, cách nhau năm phút, lý do khác nhau. Bạn nên làm gì trước khi trả lời?",
    "openingOptions": [
      "Xem quầy tối nay cần tối thiểu bao nhiêu người, rồi áp cùng một luật cho cả hai",
      "Đồng ý bạn nhắn trước vì nhanh nhất, người sau thì từ chối luôn",
      "Nhờ AI chọn xem lý do của ai đáng thương hơn để quyết định thay bạn",
      "Từ chối cả hai để khỏi bị coi là thiên vị rồi tính sau"
    ],
    "correctOption": 0,
    "explanation": "Việc đầu tiên là biết quầy cần tối thiểu bao nhiêu người, vì nếu đổi ca mà quầy vẫn đủ thì có thể cho cả hai. Áp cùng một luật cho cả hai là cách công bằng nhất và dễ nói với cả nhóm. Đồng ý người nhắn trước là chọn theo tốc độ gõ, không theo nhu cầu. AI không biết hoàn cảnh thật của họ và cũng không nên quyết định thay bạn. Từ chối cả hai thì quầy đỡ rủi ro nhưng bỏ qua khả năng có giải pháp cho cả hai.",
    "diagram": [
      {
        "label": "Xem số người tối thiểu của ca tối nay",
        "arrow": true
      },
      {
        "label": "Đặt luật áp cho cả hai: tìm người đổi, báo trước, không thiếu người",
        "arrow": true
      },
      {
        "label": "Nhờ AI soạn tin trả lời gọn, đúng luật",
        "arrow": true
      },
      {
        "label": "Đọc lại tin, thêm điều bạn thật sự cam kết rồi mới gửi"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: quán bánh mì của anh Đức có hai bạn cùng xin đổi ca tối thứ Sáu. Anh xem thấy ca tối cần ba người và đang có bốn. Anh cho một bạn nghỉ và bạn kia tự tìm người đổi, rồi ghi lại quy tắc 'báo trước ít nhất ba tiếng, tự tìm người thay, quầy không được dưới mức tối thiểu'. Lần sau anh chỉ cần gửi lại đúng quy tắc đó."
    },
    "quiz": [
      {
        "question": "Điều đầu tiên nên kiểm khi có người xin đổi ca sát giờ là gì?",
        "options": [
          "Ca đó cần tối thiểu bao nhiêu người và sau khi đổi còn đủ không",
          "Lý do xin đổi nghe có đáng thương không, vì đó là căn cứ duy nhất",
          "Ai xin nhanh hơn, vì thứ tự xin quyết định công bằng",
          "Người xin đã từng xin đổi ca tháng trước chưa, để từ chối luôn"
        ],
        "correct": 0,
        "explanation": "Quầy còn đủ người hay không là dữ kiện khách quan, kiểm được ngay. Nếu chỉ chọn theo lý do đáng thương thì bạn thành người phán xét chuyện riêng tư. Thứ tự xin chỉ là tốc độ gõ. Từ chối vì tiền lệ mà chưa xem quầy là bỏ qua khả năng đổi được."
      },
      {
        "question": "Vì sao nên có một luật đổi ca chung thay vì quyết từng trường hợp?",
        "options": [
          "Cả nhóm cùng biết luật nên thấy công bằng, và bạn trả lời nhanh hơn",
          "Vì luật chung giúp không ai xin đổi ca nữa",
          "Vì AI chỉ soạn được tin khi có luật, không có luật thì không soạn",
          "Vì luật chung cho phép bạn từ chối mọi yêu cầu mà không phải giải thích"
        ],
        "correct": 0,
        "explanation": "Luật chung ví dụ 'báo trước ba tiếng, tự tìm người thay, quầy không dưới mức tối thiểu' cho mọi người cùng một chuẩn. Nó không xoá nhu cầu đổi ca. AI vẫn soạn được tin mà không cần luật, nhưng tin sẽ khó nhất quán. Còn từ chối không giải thích thì nhân viên sẽ thấy bạn tuỳ tiện."
      },
      {
        "question": "Bạn nhờ AI soạn tin trả lời một bạn xin đổi ca. Câu nào trong yêu cầu giúp tin không hứa quá tay?",
        "options": [
          "Chỉ nhắc luật đổi ca của quán, không hứa thưởng hay ưu tiên lần sau",
          "Viết thật thông cảm và nói rằng lần sau sẽ ưu tiên xếp ca theo ý bạn ấy",
          "Viết ngắn và hứa sẽ giải quyết mọi việc trong một tiếng",
          "Viết thật nhiều lời để bạn ấy thấy được coi trọng"
        ],
        "correct": 0,
        "explanation": "Hứa 'ưu tiên lần sau' là cam kết bạn chưa chắc giữ được và sẽ bị nhắc lại. Hứa giải quyết trong một tiếng cũng là cam kết chưa chắc làm được. Nhiều lời làm tin dài mà chưa nói rõ việc đổi ca được hay không."
      },
      {
        "question": "Nhân viên xin đổi ca vì con ốm, kể chuyện gia đình khá nhiều. Bạn có nên dán nguyên tin đó vào một công cụ AI chưa được công ty duyệt để soạn trả lời?",
        "options": [
          "Không, hãy lược bỏ chuyện riêng và chỉ đưa 'xin đổi ca tối nay'",
          "Có, vì tin nhắn nào rồi cũng gửi lại cho chính bạn đó đọc nên không có gì nhạy cảm",
          "Có, nếu chỉ xoá tên bạn đó còn phần còn lại thì để nguyên vì đủ ẩn danh",
          "Không cần lo, vì công cụ nào cũng tự xoá tin ngay sau khi trả lời xong"
        ],
        "correct": 0,
        "explanation": "Chuyện sức khoẻ của con là thông tin riêng tư, và bạn không cần nó để soạn tin về luật đổi ca. Xoá mỗi tên vẫn còn chi tiết nhận ra được người trong quán nhỏ. Công cụ có xoá hay không tuỳ chính sách từng bản, bạn không nên giả định."
      },
      {
        "question": "Quầy tối nay cần 3 người, đang có 4. Hai bạn xin đổi ca. Nếu cho cả hai nghỉ thì còn bao nhiêu người, và kết luận?",
        "options": [
          "Còn 2 người (= 4 − 2), thiếu 1, nên chỉ cho một bạn nghỉ hoặc tìm người thay",
          "Còn 3 người (= 4 − 1), vì mỗi ca chỉ tính thiếu một người",
          "Còn 2 người và vẫn đủ, vì quầy nhỏ có thể làm ít người hơn",
          "Còn 4 người, vì người xin đổi ca sẽ có người khác vào thay tự động"
        ],
        "correct": 0,
        "explanation": "4 trừ 2 là 2, mà cần tối thiểu 3, nên cho cả hai nghỉ thì thiếu 1. Chỉ cho một bạn nghỉ là còn 3, đúng mức tối thiểu. 'Quầy nhỏ làm được' là đoán, luật tối thiểu là con số bạn đã đặt. Và không ai tự động vào thay nếu không có ai được gọi."
      }
    ],
    "keyTakeaways": [
      "Kiểm số người tối thiểu của ca trước khi cân nhắc lý do.",
      "Một luật đổi ca chung: báo trước, tự tìm người thay, không dưới mức tối thiểu.",
      "AI soạn tin, không quyết định thay bạn và không hứa thay bạn.",
      "Chuyện riêng của nhân viên không đưa vào công cụ AI chưa được duyệt."
    ],
    "practicePrompt": {
      "question": "Anh Sơn nhờ AI trả lời hai bạn xin đổi ca, và AI viết 'lần sau em sẽ ưu tiên xếp ca theo ý bạn'. Anh nên làm gì?",
      "options": [
        "Xoá lời hứa đó, chỉ giữ luật đổi ca và việc cụ thể của tối nay",
        "Gửi nguyên vì AI viết lịch sự nên đúng giọng",
        "Gửi và nhờ AI nhắc lại lời hứa ở mọi tin sau cho nhất quán",
        "Chuyển tin cho một nhân viên khác gửi để anh khỏi chịu trách nhiệm"
      ],
      "correct": 0,
      "explanation": "Lời hứa ưu tiên lần sau là cam kết của anh, và AI đã viết thay khi anh chưa quyết. Lịch sự không có nghĩa là được hứa. Nhắc lại lời hứa ở mọi tin làm cam kết nhân lên. Nhờ người khác gửi thì cam kết vẫn mang tên anh mà không ai kiểm soát."
    },
    "summary": {
      "keyIdea": "Đổi ca sát giờ: kiểm quầy còn đủ người, áp một luật cho tất cả, và tự giữ mọi cam kết.",
      "formula": "Số người tối thiểu + luật chung + tin ngắn không hứa thêm = xử lý công bằng, nhanh.",
      "commonMistake": "Chọn theo ai nhắn trước hoặc để AI hứa thay bạn.",
      "action": "Viết ba dòng luật đổi ca của quán bạn."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Viết luật đổi ca của quán hoặc đội bạn trong ba dòng: báo trước bao lâu, ai tìm người thay, và số người tối thiểu từng ca. Nhờ AI soạn hai tin mẫu: một tin đồng ý, một tin từ chối lịch sự dựa đúng luật đó, không hứa thêm điều gì. Đọc lại và xoá mọi câu hứa bạn chưa quyết.",
      "secondary": "Gửi luật cho một đồng nghiệp đọc thử xem có chỗ nào khó hiểu không."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Tin xin đổi ca thường đến vào lúc bạn bận nhất. Bài này không dạy bạn nói không hay có, mà dạy hai việc gọn: kiểm quầy còn đủ người và trả lời theo một luật chung. AI giúp phần soạn tin, phần quyết là của bạn."
      },
      {
        "type": "feynman",
        "title": "Xử lý đổi ca đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới ngã tư có luật ưu tiên. Nếu ai cũng tự đoán ý người kia thì hai xe kẹt nhau. Có luật rõ như 'xe bên phải đi trước' thì ai cũng biết phải làm gì, dù không ai vừa lòng hoàn toàn.",
        "columns": [
          "Thành phần",
          "Ngã tư có luật ưu tiên",
          "Đổi ca sát giờ"
        ],
        "rows": [
          [
            "Luật chung",
            "Xe bên phải đi trước",
            "Báo trước, tự tìm người thay, quầy đủ người"
          ],
          [
            "Điều cần đếm",
            "Có xe nào đang chắn không",
            "Số người tối thiểu của ca"
          ],
          [
            "Người quyết",
            "Ai cũng theo luật",
            "Bạn quyết theo luật, không theo ai gõ nhanh"
          ],
          [
            "Người giúp việc phụ",
            "Đèn giao thông",
            "AI soạn tin ngắn"
          ]
        ],
        "oneLiner": "Có luật rõ thì bạn khỏi phải đoán, và không bị coi là thiên vị."
      },
      {
        "type": "heading",
        "text": "Công bằng không phải là đồng ý hết"
      },
      {
        "type": "paragraph",
        "text": "Nhân viên thấy công bằng khi cùng một trường hợp được xử lý cùng một cách, dù kết quả khác nhau. Nếu quầy chỉ đủ cho một người nghỉ, bạn nói rõ điều đó cùng luật là đủ. Không cần so hoàn cảnh ai đáng thương hơn."
      },
      {
        "type": "flow",
        "title": "Từ tin xin đổi ca đến tin trả lời",
        "steps": [
          {
            "label": "Xem số người tối thiểu của ca",
            "detail": "Ví dụ ca tối cần 3 người, đang có 4. Khi đổi xong còn bao nhiêu?"
          },
          {
            "label": "Đối chiếu với luật đổi ca",
            "detail": "Báo trước bao lâu, ai tìm người thay, quầy có đủ người không."
          },
          {
            "label": "Nhờ AI soạn tin ngắn",
            "detail": "Đưa luật và quyết định, cấm AI hứa thêm điều gì."
          },
          {
            "label": "Đọc lại và gửi",
            "detail": "Xoá lời hứa chưa quyết, kiểm giọng phù hợp với người nhận."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Trả lời theo luật chung",
          "text": "Cả hai bạn nhận cùng một chuẩn. Bạn trả lời nhanh vì không phải cân từng lý do. Nhóm biết trước luật nên ít tranh cãi."
        },
        "right": {
          "label": "Trả lời theo cảm giác từng lúc",
          "text": "Hôm nay dễ dãi, mai nghiêm khắc. Người bị từ chối cảm thấy bất công vì hôm trước người khác được. Bạn tốn nhiều thời gian và dễ nhớ nhầm đã hứa gì."
        }
      },
      {
        "type": "callout",
        "label": "AI soạn tin, bạn giữ cam kết",
        "text": "Câu 'lần sau sẽ ưu tiên' hay 'quán sẽ có phụ cấp' nghe tử tế nhưng là lời hứa. Nếu liên quan đến tiền công, làm thêm giờ hay quy định lao động, hỏi bộ phận nhân sự hoặc kế toán trưởng trước khi viết vào tin."
      },
      {
        "type": "scenario",
        "title": "Ba giờ chiều, hai tin xin đổi ca",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Ca tối nay cần 3 người và bạn có 4. Bạn Hạnh xin nghỉ vì con ốm, bạn Kiên xin đổi vì có hẹn. Kiên nhắn trước Hạnh năm phút.",
            "choices": [
              {
                "label": "Đồng ý Kiên vì nhắn trước, từ chối Hạnh",
                "next": "bad_first"
              },
              {
                "label": "Kiểm quầy: cho phép một người nghỉ, người kia tự tìm người thay theo luật",
                "next": "s2"
              }
            ]
          },
          "bad_first": {
            "text": "Hạnh nhắn lại rằng chuyện con ốm không quan trọng bằng cái hẹn của Kiên. Cả nhóm chuyền nhau tin đó và bạn phải giải thích trong buổi họp sau.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bạn nhờ AI soạn hai tin theo luật. Bản nháp cho Hạnh có dòng 'lần sau em sẽ ưu tiên xếp ca theo ý chị'.",
            "choices": [
              {
                "label": "Gửi nguyên cho nhanh vì AI viết lịch sự",
                "next": "bad_promise"
              },
              {
                "label": "Xoá dòng hứa, giữ luật và việc của tối nay, rồi gửi",
                "next": "good"
              }
            ]
          },
          "bad_promise": {
            "text": "Hai tuần sau Hạnh nhắc lại lời hứa khi bạn đã xếp ca khác. Bạn phải xin lỗi và mất thêm niềm tin.",
            "ending": "bad"
          },
          "good": {
            "text": "Cả hai bạn nhận tin ngắn, đúng luật. Hạnh được nghỉ, Kiên tự tìm được người đổi. Quầy tối nay đủ ba người, và bạn lưu hai tin mẫu cho lần sau.",
            "ending": "good"
          }
        }
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Kiểm số người tối thiểu của ca và số người còn lại sau khi đổi.",
          "Bước 2 - Áp cùng luật cho mọi lời xin.",
          "Bước 3 - Nhờ AI soạn tin ngắn, cấm hứa thêm điều gì.",
          "Bước 4 - Đọc và xoá mọi lời hứa chưa được quyết."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Luật rõ giúp bạn công bằng và nhanh, AI giúp gọn tin.",
          "Bài sau: ước lượng nguyên liệu cần nhập cho cuối tuần."
        ]
      }
    ]
  },
  {
    "id": 2093,
    "slug": "uoc-luong-luong-hang-can-nhap",
    "title": "Chặng 34, Bài 14: Ước lượng lượng nguyên liệu cần nhập cho cuối tuần",
    "subtitle": "Nhập hàng giống chuẩn bị bữa tiệc: lấy số khách, nhân với phần mỗi người, cộng phần hao rồi trừ đi thứ đã có sẵn trong tủ.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "📦",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Thứ Năm bạn phải chốt đơn nhập cho cuối tuần, mà gần quán có sự kiện nên khách có thể đông hơn bình thường. Nhập ít thì hết hàng giữa giờ đông, nhập nhiều thì ôm tồn và bỏ đi đồ tươi. AI tính nhanh nếu bạn đưa đủ số, nhưng nó không nhìn thấy tủ lạnh của bạn. Bài này dạy cách đưa số cho đúng và đối chiếu với tủ thật.",
    "openingQuestion": "Tuần trước quán bán 120 phần cơm gà, cuối tuần này gần quán có sự kiện nên bạn dự kiến 150 phần. Muốn AI tính lượng gà cần nhập, bạn phải đưa thêm gì?",
    "openingOptions": [
      "Số gam gà mỗi phần, tỷ lệ hao hụt và lượng gà còn trong tủ",
      "Chỉ số phần dự kiến 150, AI biết mỗi phần dùng bao nhiêu gà",
      "Doanh thu tuần trước, AI sẽ suy ra số gà cần từ tiền bán được",
      "Tên nhà cung cấp gà, để AI chọn lượng nhập đúng với nhà đó"
    ],
    "correctOption": 0,
    "explanation": "Lượng nhập bằng số phần nhân với gam mỗi phần, cộng hao hụt khi sơ chế, rồi trừ phần còn trong tủ. Thiếu một trong ba thứ là AI phải đoán, và đoán về hàng tươi thì hoặc thừa hoặc thiếu. AI không biết mỗi phần của bạn dùng bao nhiêu gà vì mỗi quán khác nhau. Doanh thu chỉ cho biết tiền, không cho biết số phần hay số gam. Tên nhà cung cấp không nói gì về số bạn cần.",
    "diagram": [
      {
        "label": "Ghi số phần dự kiến, lấy từ số bán tuần trước và sự kiện",
        "arrow": true
      },
      {
        "label": "Đưa gam mỗi phần, tỷ lệ hao hụt và số còn trong tủ",
        "arrow": true
      },
      {
        "label": "AI tính lượng nhập gợi ý kèm phép tính",
        "arrow": true
      },
      {
        "label": "Bạn đối chiếu với tủ thật rồi chốt đơn"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: quán cơm gà của chị Vân bán khoảng 120 phần mỗi cuối tuần. Cuối tuần có nhạc hội gần quán, chị dự kiến 150 phần. Chị đưa AI gam gà mỗi phần, hao hụt khi sơ chế và số gà còn trong tủ, rồi nhờ tính kèm từng bước. Sáng hôm sau chị mở tủ đếm lại và thấy tủ còn ít hơn số chị ghi, nên giảm bớt trừ tồn trước khi chốt đơn."
    },
    "quiz": [
      {
        "question": "Muốn tính lượng nguyên liệu cần nhập, công thức đầy đủ là gì?",
        "options": [
          "Số phần dự kiến nhân gam mỗi phần nhân (1 cộng tỷ lệ hao hụt), rồi trừ tồn trong tủ",
          "Số phần dự kiến nhân gam mỗi phần, không cần tính hao hụt và tồn",
          "Số phần bán tuần trước nhân giá bán, chia giá nhập",
          "Tồn trong tủ cộng số phần dự kiến, chia cho số nhà cung cấp"
        ],
        "correct": 0,
        "explanation": "Hao hụt khi sơ chế và tồn hiện có đều làm lượng nhập thay đổi, bỏ chúng là sai số lớn ở đồ tươi. Nhân giá bán rồi chia giá nhập cho ra tiền, không phải lượng nguyên liệu. Chia cho số nhà cung cấp không có ý nghĩa vì lượng cần không phụ thuộc số nhà."
      },
      {
        "question": "Số phần dự kiến 150, mỗi phần 150g gà, hao hụt sơ chế 10%, tủ còn 3kg. Cần nhập bao nhiêu gà?",
        "options": [
          "21,75 kg",
          "19,5 kg (= 22,5 − 3, quên hao hụt)",
          "24,75 kg (= 22,5 × 1,1, quên trừ tồn)",
          "16,8 kg (= 120 × 0,15 × 1,1 − 3, dùng số tuần trước)"
        ],
        "correct": 0,
        "explanation": "Tính 150 × 150g = 22.500g = 22,5 kg; cộng hao hụt 10% ra 24,75 kg; trừ 3 kg tồn ra 21,75 kg. 19,5 kg quên hao hụt nên thiếu hàng. 24,75 kg quên tồn nên nhập thừa. 16,8 kg dùng 120 phần của tuần trước trong khi cuối tuần này dự kiến 150."
      },
      {
        "question": "Vì sao vẫn phải đối chiếu số tồn trong tủ với tủ lạnh thật, dù AI đã tính?",
        "options": [
          "AI chỉ biết số bạn gõ, còn tủ thật mới cho biết còn bao nhiêu và còn dùng được không",
          "Vì AI luôn làm tròn số lên hết mức có thể nên bạn phải đếm lại toàn bộ số phần bằng tay mới yên tâm",
          "Vì AI không biết làm phép nhân với đơn vị gam và kg",
          "Vì tủ lạnh của mỗi quán được AI kết nối tự động nên có thể bị lệch"
        ],
        "correct": 0,
        "explanation": "Số tồn bạn ghi có thể đã cũ, đồ có thể sắp hết hạn hoặc đã bị dùng cho món khác. AI không nhìn thấy tủ. Nó làm phép nhân và đổi đơn vị được khi bạn đưa đủ số. Và nó không kết nối với tủ lạnh nào nếu bạn không gõ số vào."
      },
      {
        "question": "Sự kiện gần quán có thể làm khách đông hơn. Cách nào hợp lý nhất để dự kiến số phần?",
        "options": [
          "Lấy số bán tuần trước làm gốc, thêm một hệ số ước lượng bạn tự chọn và ghi rõ đó là ước lượng",
          "Nhờ AI cho biết chính xác sự kiện gần quán sẽ kéo thêm bao nhiêu phần khách vào quán mình",
          "Nhân đôi số phần tuần trước cho chắc vì sự kiện đông",
          "Bỏ qua sự kiện vì AI không biết ngày sự kiện"
        ],
        "correct": 0,
        "explanation": "AI không biết quy mô sự kiện và quán bạn nằm cách đó bao xa, nên nó chỉ có thể đoán. Hệ số bạn chọn dựa trên kinh nghiệm thì kiểm được. Nhân đôi là thừa cho đồ tươi có thể bỏ. Bỏ qua sự kiện thì dễ hết hàng giữa giờ đông."
      },
      {
        "question": "AI trả lời 'cần nhập 21,75 kg gà' nhưng không nêu phép tính. Bạn nên làm gì?",
        "options": [
          "Yêu cầu ghi từng bước tính rồi tự tính lại bằng máy tính",
          "Chốt đơn luôn vì AI tính không sai",
          "Làm tròn xuống 20 kg cho dễ đặt",
          "Hỏi AI 'có chắc không' và tin nếu nó nói chắc"
        ],
        "correct": 0,
        "explanation": "Con số không kèm phép tính thì không biết nó đã dùng hao hụt và tồn nào. Tự tính lại chỉ mất một phút. AI có thể sai phép tính hoặc dùng số sai mà vẫn nói chắc. Làm tròn xuống làm thiếu hàng, còn hỏi 'có chắc không' thì AI thường nói chắc."
      }
    ],
    "keyTakeaways": [
      "Lượng nhập = số phần × gam mỗi phần × (1 + hao hụt) − tồn trong tủ.",
      "Đưa AI đủ ba số: gam mỗi phần, hao hụt, tồn.",
      "Sự kiện chỉ là ước lượng của bạn, hãy ghi rõ đó là ước lượng.",
      "Bắt AI ghi từng bước tính, rồi đối chiếu với tủ thật."
    ],
    "practicePrompt": {
      "question": "Anh Bảo hỏi AI 'cuối tuần cần nhập bao nhiêu thịt' mà không đưa gam mỗi phần, hao hụt hay tồn. AI trả lời '25 kg'. Anh nên làm gì?",
      "options": [
        "Đưa đủ ba số và yêu cầu ghi từng bước tính, rồi tự tính lại",
        "Nhập đúng 25 kg vì AI đã trả lời chắc chắn",
        "Nhân đôi con số của AI để chắc chắn không thiếu",
        "Hỏi AI thêm ba lần, lấy số xuất hiện nhiều nhất"
      ],
      "correct": 0,
      "explanation": "Không có ba số đó, con số 25 kg chỉ là đoán, và bạn không kiểm được. Nhập theo con số chắc chắn nhưng không có căn cứ làm thừa hoặc thiếu hàng. Nhân đôi làm thừa đồ tươi. Hỏi nhiều lần vẫn dựa trên thiếu dữ kiện, chỉ ra thêm con số đoán khác."
    },
    "summary": {
      "keyIdea": "Lượng nhập là phép tính bạn kiểm được, không phải con số AI đoán.",
      "formula": "Lượng nhập = số phần dự kiến × gam mỗi phần × (1 + hao hụt) − tồn trong tủ.",
      "commonMistake": "Bỏ hao hụt hoặc quên trừ tồn, rồi tin số AI đưa vì nó nói chắc.",
      "action": "Đo gam mỗi phần thật của một món chủ lực trong quán."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn một nguyên liệu chính của quán (thịt, cà phê, sữa...). Ghi số gam mỗi phần, tỷ lệ hao hụt ước tính và số còn trong tủ hôm nay. Nhờ AI tính lượng cần nhập cho cuối tuần này kèm phép tính từng bước, rồi tự tính lại bằng máy tính và so với tủ thật.",
      "secondary": "Ghi lại sai lệch giữa số AI tính và số tủ thật để lần sau chỉnh lại hao hụt."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Nhập hàng là phép tính có thể kiểm được, nhưng nhiều người làm theo cảm giác. AI tính nhanh và gọn nếu được đưa đủ số, còn tủ lạnh thật của bạn thì chỉ mình bạn thấy. Bài này dạy hai việc: đưa đủ số cho AI, và đối chiếu với tủ thật."
      },
      {
        "type": "feynman",
        "title": "Ước lượng lượng nhập đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới việc chuẩn bị nấu tiệc gia đình. Bạn lấy số khách, nhân phần mỗi người, cộng thêm chút hao khi gọt và nấu, rồi trừ đi thứ đã có sẵn trong tủ. AI làm phép tính đó nhanh hơn, nhưng nó không biết tủ nhà bạn còn gì.",
        "columns": [
          "Thành phần",
          "Nấu tiệc gia đình",
          "Nhập hàng cho quán"
        ],
        "rows": [
          [
            "Số khách",
            "Số người mời",
            "Số phần dự kiến"
          ],
          [
            "Phần mỗi người",
            "Lượng thức ăn cho một người",
            "Gam nguyên liệu mỗi phần"
          ],
          [
            "Hao",
            "Gọt vỏ, bỏ xương",
            "Hao hụt sơ chế"
          ],
          [
            "Đã có sẵn",
            "Đồ trong tủ lạnh nhà",
            "Tồn trong tủ của quán"
          ]
        ],
        "oneLiner": "Số khách nhân phần, cộng hao, trừ đồ đã có: AI tính, bạn đưa số và đối chiếu tủ thật."
      },
      {
        "type": "heading",
        "text": "Bốn con số cho một phép tính"
      },
      {
        "type": "paragraph",
        "text": "Phép tính chỉ cần bốn số: số phần dự kiến, gam mỗi phần, tỷ lệ hao hụt và tồn trong tủ. Ba số đầu bạn biết hoặc đo được, số dự kiến là ước lượng có căn cứ từ tuần trước và sự kiện. Nếu thiếu số nào, AI sẽ tự đoán và bạn không biết đoán ở chỗ nào."
      },
      {
        "type": "chart",
        "title": "Lượng gà cần nhập theo số phần bán",
        "caption": "Số liệu minh hoạ, không phải số đo thật của quán nào: kéo thanh trượt cho khớp với món và tủ của bạn. Đường cho thấy lượng cần nhập tăng đều theo số phần, còn tồn trong tủ chỉ dịch cả đường xuống.",
        "kind": "line",
        "xLabel": "Số phần bán",
        "yLabel": "Kg cần nhập",
        "x": {
          "from": 40,
          "to": 200,
          "step": 20
        },
        "params": [
          {
            "id": "g",
            "label": "Gam mỗi phần",
            "min": 100,
            "max": 250,
            "step": 10,
            "value": 150,
            "unit": "g"
          },
          {
            "id": "hao",
            "label": "Hao hụt sơ chế",
            "min": 0,
            "max": 20,
            "step": 1,
            "value": 10,
            "unit": "%"
          },
          {
            "id": "ton",
            "label": "Tồn trong tủ",
            "min": 0,
            "max": 10,
            "step": 1,
            "value": 3,
            "unit": "kg"
          }
        ],
        "series": [
          {
            "label": "Lượng cần nhập (kg)",
            "expr": "max(0, x * g * (1 + hao / 100) / 1000 - ton)"
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI tính lượng nhập cuối tuần",
        "task": "Bạn cần chốt đơn thịt gà cho cuối tuần có sự kiện gần quán. Lắp prompt để AI tính kèm từng bước, không đoán số.",
        "parts": [
          {
            "id": "input",
            "label": "Số đưa cho AI",
            "options": [
              {
                "text": "Cuối tuần đông hơn, tính giúp tôi cần nhập bao nhiêu gà.",
                "feedback": "Không có số phần, gam và tồn, AI đoán một con số nghe hợp lý mà bạn không kiểm được."
              },
              {
                "text": "Dự kiến 150 phần, mỗi phần 150g gà, hao hụt sơ chế 10%, tủ còn 3kg.",
                "good": true,
                "feedback": "Đủ bốn số, AI tính được và bạn tính lại được."
              }
            ]
          },
          {
            "id": "steps",
            "label": "Cách trả kết quả",
            "options": [
              {
                "text": "Chỉ cần con số cuối cùng, tôi không cần phép tính.",
                "feedback": "Con số không kèm phép tính thì bạn không biết nó đã dùng hao hụt và tồn nào."
              },
              {
                "text": "Ghi từng bước tính và ghi rõ số nào tôi đã đưa, số nào là giả định.",
                "good": true,
                "feedback": "Từng bước cho bạn soát lại, và giả định lộ ra để bạn sửa."
              }
            ]
          },
          {
            "id": "limit",
            "label": "Giới hạn",
            "options": [
              {
                "text": "Tính rộng rãi để chắc chắn không thiếu.",
                "feedback": "'Rộng rãi' là AI tự cộng thêm, đồ tươi thừa sẽ phải bỏ."
              },
              {
                "text": "Không tự thêm số dự phòng; nếu cần thêm thì đề xuất riêng và nói rõ lý do.",
                "good": true,
                "feedback": "Bạn quyết mức dự phòng, không phải AI cộng lặng lẽ."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "input",
              "steps",
              "limit"
            ],
            "text": "1) 150 phần × 150g = 22.500g = 22,5 kg.\n2) Hao hụt 10%: 22,5 × 1,1 = 24,75 kg.\n3) Trừ tồn 3 kg: 21,75 kg.\nGiả định: 150 phần là dự kiến của bạn. Nếu muốn dự phòng, đề xuất thêm 5% (khoảng 1 kg) - bạn quyết."
          },
          {
            "requires": [
              "input"
            ],
            "text": "Cần nhập khoảng 24 kg gà.\n(Có số nhưng không có phép tính, và không rõ đã trừ tồn hay tính hao hụt chưa.)"
          },
          {
            "text": "Cuối tuần có sự kiện nên khách đông, gợi ý nhập 30 kg gà cho chắc.\n(Con số tự nghĩ ra: không có số phần, gam, hao hụt hay tồn để đối chiếu.)"
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Đưa đủ số, bắt ghi từng bước",
          "text": "Con số của AI kiểm được bằng máy tính trong một phút. Giả định lộ rõ, bạn sửa được. Bạn chốt đơn với con số có căn cứ."
        },
        "right": {
          "label": "Hỏi chung rồi tin con số",
          "text": "Bạn không biết con số đến từ đâu. Đồ tươi thừa thì bỏ, thiếu thì hết hàng đúng giờ đông. Tuần sau bạn không rút được bài học vì không biết sai ở đâu."
        }
      },
      {
        "type": "callout",
        "label": "AI không thấy tủ lạnh của bạn",
        "text": "Số tồn bạn gõ có thể đã cũ, và đồ trong tủ có thể sắp hết hạn hoặc không còn dùng được. Trước khi chốt đơn, mở tủ đếm lại. Về hạn sử dụng và an toàn thực phẩm, làm theo quy định của cơ sở và hỏi chuyên gia an toàn thực phẩm khi chưa chắc."
      },
      {
        "type": "scenario",
        "title": "Thứ Năm, chốt đơn thịt gà cuối tuần",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "AI vừa trả về 'cần nhập 21,75 kg gà' kèm từng bước. Bạn có số tồn ghi 3 kg từ hôm thứ Ba.",
            "choices": [
              {
                "label": "Đặt đúng 21,75 kg luôn vì AI đã ghi rõ phép tính",
                "next": "bad_order"
              },
              {
                "label": "Mở tủ đếm lại và tự tính lại phép tính trước",
                "next": "s2"
              }
            ]
          },
          "bad_order": {
            "text": "Tủ thật chỉ còn 1 kg vì hôm thứ Tư có đơn tiệc nhỏ. Cuối tuần quán hết gà trước 8 giờ tối và bạn phải cắt món khỏi menu giữa giờ đông.",
            "ending": "bad"
          },
          "s2": {
            "text": "Tủ chỉ còn 1 kg. Phép tính lại: 24,75 − 1 = 23,75 kg. Nhà cung cấp cho đặt theo mức 5 kg.",
            "choices": [
              {
                "label": "Đặt 25 kg và ghi lại số dư để trừ tuần sau",
                "next": "good"
              },
              {
                "label": "Đặt 40 kg cho chắc, dù không tính lại",
                "next": "bad_over"
              }
            ]
          },
          "bad_over": {
            "text": "Sau cuối tuần còn hơn 15 kg gà tươi. Bạn phải bỏ một phần vì không kịp dùng.",
            "ending": "bad"
          },
          "good": {
            "text": "Cuối tuần đủ gà tới tối Chủ nhật, dư khoảng 1 kg bạn dùng ngay đầu tuần. Bạn ghi lại số bán thật để tuần sau ước lượng tốt hơn.",
            "ending": "good"
          }
        }
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Ghi số phần dự kiến, gam mỗi phần, hao hụt, tồn.",
          "Bước 2 - Nhờ AI tính và ghi từng bước, không tự thêm dự phòng.",
          "Bước 3 - Tự tính lại và mở tủ đếm số tồn thật.",
          "Bước 4 - Chốt đơn theo bước nhập của nhà cung cấp, ghi số bán thật cho tuần sau."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "AI tính nhanh, tủ thật quyết số tồn, bạn quyết mức dự phòng.",
          "Bài sau: mini-dự án bảng giá vốn cho một món chủ lực."
        ]
      }
    ]
  },
  {
    "id": 2094,
    "slug": "mini-du-an-bang-gia-von-mot-mon",
    "title": "Chặng 34, Bài 15: Mini-dự án: bảng giá vốn cho một món chủ lực",
    "subtitle": "Giá vốn món giống tính tiền chợ cho một bữa cơm: cộng từng thứ bỏ vào nồi, kể cả phần bỏ đi, rồi mới biết bữa ăn tốn bao nhiêu.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "🧮",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Bạn bán một món chủ lực mỗi ngày mà chưa chắc biết nó tốn bao nhiêu để làm ra. Giá nhập đổi theo tuần, hao hụt khi sơ chế làm số thật lớn hơn số trên giấy, và nhiều quán chỉ nhớ giá vốn 'ước chừng'. Trong bài này bạn tự dựng bảng giá vốn cho một món bằng số của chính mình, nhờ AI giúp tính và kiểm, rồi so với giá bán.",
    "openingQuestion": "Bạn muốn biết món cơm gà lãi bao nhiêu. Giá vốn một phần bạn nên tính từ đâu?",
    "openingOptions": [
      "Cộng từng nguyên liệu theo định lượng và giá nhập hiện tại, có tính hao hụt",
      "Lấy giá bán trừ đi 30%, vì quán nào cũng chừng đó",
      "Lấy tổng tiền nhập hàng cả tuần chia cho số món bán được",
      "Nhờ AI tự ước tính giá vốn từ tên món mà không cần đưa số"
    ],
    "correctOption": 0,
    "explanation": "Giá vốn một phần là tổng tiền của từng nguyên liệu trong phần đó, tính bằng định lượng nhân giá nhập hiện tại, và có cộng hao hụt khi sơ chế. Trừ theo phần trăm cố định là chuyện đoán, mỗi món mỗi khác. Chia tổng tiền nhập tuần cho số món gộp cả những món khác và hàng tồn chưa dùng nên cho ra số lệch. AI không biết định lượng và giá nhập của bạn nên ước tính từ tên món chỉ là con số nghe hợp lý.",
    "diagram": [
      {
        "label": "Ghi định lượng từng nguyên liệu của một phần và giá nhập hiện tại",
        "arrow": true
      },
      {
        "label": "Cộng hao hụt sơ chế cho nguyên liệu bị hao",
        "arrow": true
      },
      {
        "label": "AI tính bảng từng dòng và tổng giá vốn",
        "arrow": true
      },
      {
        "label": "Bạn tự tính lại tổng, so với giá bán để ra tỷ lệ giá vốn"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: chị Mai bán cơm gà mỗi ngày. Chị ghi định lượng một phần gồm gà, gạo, rau, nước sốt và hộp, kèm giá nhập tuần này, rồi nhờ AI dựng bảng từng dòng. Chị tự cộng lại bằng máy tính và thấy AI làm tròn một dòng sai. Khi so giá vốn với giá bán, chị nhận ra món chủ lực của mình lãi mỏng hơn chị tưởng và quyết định thử chỉnh khẩu phần thay vì tăng giá."
    },
    "quiz": [
      {
        "question": "Một phần cơm gà có giá vốn 22.000 đồng, giá bán 55.000 đồng. Tỷ lệ giá vốn là bao nhiêu?",
        "options": [
          "40% (= 22.000 ÷ 55.000)",
          "60% (= 33.000 ÷ 55.000, là lãi gộp)",
          "250% (= 55.000 ÷ 22.000, chia ngược)",
          "33% (= 55.000 − 22.000, lấy tiền làm phần trăm)"
        ],
        "correct": 0,
        "explanation": "Tỷ lệ giá vốn là giá vốn chia giá bán: 22.000 ÷ 55.000 = 40%. 60% là phần lãi gộp còn lại sau khi trừ giá vốn. 250% là chia ngược giá bán cho giá vốn. 33.000 là số tiền lãi gộp, không phải phần trăm."
      },
      {
        "question": "Vì sao phải tính hao hụt vào giá vốn?",
        "options": [
          "Vì phần bỏ đi khi sơ chế vẫn là tiền bạn đã trả",
          "Vì hao hụt luôn làm món ngon hơn",
          "Vì tính hao hụt thì món nào cũng ra tỷ lệ giá vốn thấp hơn",
          "Vì AI chỉ tính được giá vốn khi có hao hụt"
        ],
        "correct": 0,
        "explanation": "Mua 1 kg gà có xương mà chỉ dùng được 0,9 kg thì 0,9 kg đó phải gánh cả tiền của 1 kg. Không tính hao hụt thì giá vốn thấp hơn thực tế. Hao hụt không liên quan chất lượng món. Và nó làm giá vốn cao lên chứ không hạ xuống. AI tính được giá vốn không cần hao hụt, nhưng kết quả sẽ sai."
      },
      {
        "question": "Giá nhập gà tăng từ 90.000 lên 100.000 đồng/kg, mỗi phần dùng 150g. Giá vốn phần gà tăng bao nhiêu (chưa tính hao hụt)?",
        "options": [
          "Tăng 1.500 đồng (= 150g × 10.000 ÷ 1000)",
          "Tăng 10.000 đồng (= chính chênh giá một kg, quên đổi ra 150g)",
          "Tăng 15.000 đồng (= 150 × 100, nhầm đơn vị kg và gam)",
          "Không đổi, vì giá bán món vẫn giữ nguyên"
        ],
        "correct": 0,
        "explanation": "Mỗi kg tăng 10.000, mỗi phần dùng 0,15 kg nên phần gà tăng 0,15 × 10.000 = 1.500 đồng. 10.000 đồng là chênh giá của cả kg. 15.000 nhầm giữa gam và kg. Và giá bán không đổi không có nghĩa giá vốn không đổi: chính chỗ đó làm lãi mỏng dần."
      },
      {
        "question": "AI dựng bảng giá vốn và ghi tổng 21.400 đồng, nhưng cộng các dòng ra 20.880 đồng. Bạn nên làm gì?",
        "options": [
          "Tự cộng lại từng dòng, sửa tổng theo số cộng được và yêu cầu AI tính lại",
          "Giữ tổng của AI vì AI làm phép cộng chính xác",
          "Lấy trung bình hai con số 21.400 và 20.880 làm tổng",
          "Bỏ dòng có giá lớn nhất để hai số khớp nhau ngay"
        ],
        "correct": 0,
        "explanation": "AI có thể sai phép cộng hoặc làm tròn giữa chừng, và lúc đó tổng không khớp với từng dòng. Tự cộng lại rất nhanh và dùng số cộng được. Lấy trung bình hoặc bỏ dòng chỉ làm số sai thêm mà nhìn có vẻ khớp."
      },
      {
        "question": "Bạn có nên dán bảng giá vốn và giá nhập thật của quán vào công cụ AI chưa được công ty duyệt?",
        "options": [
          "Không, hãy dùng số tròn giả hoặc công cụ đã được duyệt",
          "Có, vì giá nhập là thông tin ai cũng hỏi được ở chợ",
          "Có, nếu chỉ xoá tên nhà cung cấp còn số để nguyên",
          "Không cần lo, vì công cụ AI nào cũng tự xoá dữ liệu sau khi trả lời"
        ],
        "correct": 0,
        "explanation": "Giá nhập và tỷ lệ lãi là thông tin kinh doanh nhạy cảm dù không phải bí mật quốc gia. Chỉ xoá tên nhà cung cấp thì các con số vẫn lộ cấu trúc chi phí. Việc công cụ có xoá dữ liệu hay không tuỳ chính sách từng bản, bạn hỏi chủ quán hoặc người phụ trách thay vì đoán."
      }
    ],
    "keyTakeaways": [
      "Giá vốn một phần = tổng (định lượng × giá nhập hiện tại), có cộng hao hụt.",
      "Tỷ lệ giá vốn = giá vốn ÷ giá bán.",
      "Luôn tự cộng lại tổng của AI.",
      "Giá nhập đổi thì bảng cũng phải cập nhật, không giữ bảng cũ."
    ],
    "practicePrompt": {
      "question": "Chị Loan tính giá vốn phần cơm gà = giá bán trừ 30%, không xem định lượng. Rủi ro lớn nhất là gì?",
      "options": [
        "Con số không phản ánh nguyên liệu thật, nên không biết món lãi hay lỗ khi giá nhập đổi",
        "AI sẽ không hiểu khái niệm phần trăm",
        "Bảng sẽ quá dài để in ra",
        "Nhà cung cấp sẽ tăng giá khi thấy quán tính theo phần trăm"
      ],
      "correct": 0,
      "explanation": "Trừ theo phần trăm cố định không nhìn vào nguyên liệu thật, nên khi giá gà tăng bảng vẫn báo lãi cũ. AI hiểu phần trăm bình thường. Độ dài bảng không liên quan. Và nhà cung cấp không biết cách bạn tính giá vốn."
    },
    "summary": {
      "keyIdea": "Giá vốn món là phép cộng bạn kiểm được: định lượng nhân giá nhập, có hao hụt.",
      "formula": "Giá vốn = Σ (định lượng × giá nhập × (1 + hao hụt)); tỷ lệ giá vốn = giá vốn ÷ giá bán.",
      "commonMistake": "Tính theo phần trăm cố định, hoặc tin tổng của AI mà không cộng lại.",
      "action": "Chọn một món chủ lực và ghi định lượng thật của một phần."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn một món chủ lực của bạn (hoặc một món bạn thường nấu). Ghi từng nguyên liệu một phần: định lượng, giá nhập hiện tại, hao hụt. Nhờ AI dựng bảng từng dòng, tự cộng lại tổng, rồi chia cho giá bán để ra tỷ lệ giá vốn. Ghi ra một thay đổi (khẩu phần, nguồn nhập hay giá bán) bạn muốn thử.",
      "secondary": "Dùng số tròn giả nếu chưa muốn nhập số thật vào công cụ AI."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Nhiều quán nhỏ biết doanh thu mỗi ngày nhưng không biết mỗi món lãi bao nhiêu. Bài này là một mini-dự án: bạn tự nhập số của mình, nhờ AI dựng bảng, rồi kiểm và so với giá bán. Kết quả là một bảng bạn dùng lại được mỗi khi giá nhập đổi."
      },
      {
        "type": "feynman",
        "title": "Tính giá vốn đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới việc tính tiền chợ cho một bữa cơm gia đình. Bạn cộng từng thứ bỏ vào nồi: thịt, rau, gia vị. Phần vỏ bỏ đi vẫn là tiền đã trả. Giá vốn món ăn cũng vậy, chỉ khác là bạn ghi định lượng cho từng phần.",
        "columns": [
          "Thành phần",
          "Bữa cơm gia đình",
          "Món trong quán"
        ],
        "rows": [
          [
            "Cộng từng thứ",
            "Thịt, rau, gia vị đã mua",
            "Định lượng × giá nhập từng nguyên liệu"
          ],
          [
            "Phần bỏ đi",
            "Vỏ, xương",
            "Hao hụt sơ chế"
          ],
          [
            "Chia theo người",
            "Tiền chợ ÷ số người ăn",
            "Giá vốn một phần"
          ],
          [
            "So sánh",
            "Có vượt ngân sách không",
            "Giá vốn ÷ giá bán"
          ]
        ],
        "oneLiner": "Cộng từng nguyên liệu kể cả phần hao, rồi chia cho giá bán."
      },
      {
        "type": "heading",
        "text": "Từ định lượng ra tỷ lệ giá vốn"
      },
      {
        "type": "paragraph",
        "text": "Bạn cần ba loại số: định lượng từng nguyên liệu trong một phần, giá nhập hiện tại, và tỷ lệ hao hụt. Khi cộng lại được giá vốn một phần. Chia cho giá bán ra tỷ lệ giá vốn, phần còn lại là lãi gộp trước khi tính tiền thuê mặt bằng, lương và điện nước."
      },
      {
        "type": "chart",
        "title": "Giá vốn thay đổi theo giá bán món",
        "caption": "Số liệu minh hoạ, không phải số đo thật: kéo thanh trượt sang giá vốn một phần của bạn. Giá bán càng cao thì tỷ lệ giá vốn càng thấp, còn lãi gộp mỗi phần thì tăng.",
        "kind": "line",
        "xLabel": "Giá bán một phần (đồng)",
        "yLabel": "Tỷ lệ giá vốn (%) / lãi gộp (nghìn đồng)",
        "x": {
          "from": 40000,
          "to": 100000,
          "step": 10000
        },
        "params": [
          {
            "id": "cost",
            "label": "Giá vốn một phần",
            "min": 15000,
            "max": 40000,
            "step": 1000,
            "value": 22000,
            "unit": "đồng"
          }
        ],
        "series": [
          {
            "label": "Tỷ lệ giá vốn (%)",
            "expr": "cost * 100 / x"
          },
          {
            "label": "Lãi gộp mỗi phần (nghìn đồng)",
            "expr": "(x - cost) / 1000"
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI dựng bảng giá vốn một món",
        "task": "Bạn muốn biết giá vốn một phần cơm gà. Lắp prompt để AI dựng bảng từng dòng và không tự bịa giá.",
        "parts": [
          {
            "id": "data",
            "label": "Số đưa cho AI",
            "options": [
              {
                "text": "Tính giúp giá vốn cơm gà của quán tôi, giá hiện tại ở chợ.",
                "feedback": "AI không biết định lượng và giá nhập của bạn, nó bịa số nghe hợp lý và bạn không kiểm được."
              },
              {
                "text": "Gà 150g giá 90.000đ/kg, gạo 120g giá 24.000đ/kg, rau 1.500đ, nước sốt 2.000đ, hộp 1.000đ, hao hụt gà 10%.",
                "good": true,
                "feedback": "Có định lượng, giá nhập và hao hụt do chính bạn đưa, AI chỉ làm phép tính."
              }
            ]
          },
          {
            "id": "table",
            "label": "Cách trả kết quả",
            "options": [
              {
                "text": "Chỉ cần tổng giá vốn cuối cùng.",
                "feedback": "Không có bảng từng dòng, bạn không biết dòng nào sai hoặc dòng nào quyết định giá vốn."
              },
              {
                "text": "Bảng từng dòng: nguyên liệu, định lượng, đơn giá, thành tiền, rồi tổng và tỷ lệ so với giá bán.",
                "good": true,
                "feedback": "Bạn cộng lại được từng dòng và thấy nguyên liệu nào chiếm nhiều nhất."
              }
            ]
          },
          {
            "id": "guard",
            "label": "Giới hạn",
            "options": [
              {
                "text": "Nếu thiếu giá nào thì cứ điền giá phổ biến.",
                "feedback": "Giá 'phổ biến' là AI tự bịa và nằm lẫn với số thật của bạn."
              },
              {
                "text": "Chỉ dùng số tôi đưa; nếu thiếu số thì ghi [cần bổ sung] và không điền.",
                "good": true,
                "feedback": "Chỗ thiếu lộ ra, bạn biết cần bổ sung gì thay vì tin một con số bịa."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "data",
              "table",
              "guard"
            ],
            "text": "Gà: 150g × 90.000 ÷ 1000 × 1,1 = 14.850đ\nGạo: 120g × 24.000 ÷ 1000 = 2.880đ\nRau 1.500đ, nước sốt 2.000đ, hộp 1.000đ.\nTổng giá vốn: 22.230đ.\nSo với giá bán bạn đưa sau: giá vốn ÷ giá bán."
          },
          {
            "requires": [
              "data"
            ],
            "text": "Giá vốn một phần cơm gà khoảng 22.000đ.\n(Có số nhưng không có bảng từng dòng nên bạn không kiểm được.)"
          },
          {
            "text": "Giá vốn cơm gà thường khoảng 18.000-25.000đ tuỳ nơi, gồm gà, gạo, rau và gia vị.\n(Khoảng chung chung, không phải giá vốn của quán bạn.)"
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Bảng từng dòng từ số thật",
          "text": "Bạn thấy nguyên liệu nào chiếm nhiều giá vốn nhất, và cộng lại được từng dòng. Khi giá nhập đổi, bạn sửa đúng một dòng rồi tính lại."
        },
        "right": {
          "label": "Ước chừng theo phần trăm",
          "text": "Một con số duy nhất không kèm căn cứ. Giá nhập tăng thì con số vẫn thế, và bạn chỉ biết lãi mỏng khi nhìn sổ cuối tháng."
        }
      },
      {
        "type": "callout",
        "label": "Giá vốn mới là một phần của lãi",
        "text": "Bảng này chưa tính tiền thuê mặt bằng, lương, điện nước hay thuế. Nó cho biết món có lãi gộp bao nhiêu, không phải lãi ròng. Với thuế và sổ sách, hỏi kế toán trưởng hoặc chuyên gia thay vì để AI kết luận."
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Bắt lỗi trong bảng giá vốn AI vừa dựng",
        "task": "Bạn đưa AI: gà 150g giá 90.000đ/kg, hao hụt 10%; gạo 120g giá 24.000đ/kg; rau 1.500đ. Giá bán 55.000đ. Bấm các dòng sai rồi nộp.",
        "segments": [
          {
            "text": "Gà: 150g × 90.000 ÷ 1000 × 1,1 = 14.850đ."
          },
          {
            "text": "Gạo: 120g × 24.000 ÷ 1000 = 2.880đ."
          },
          {
            "text": "Rau: 1.500đ."
          },
          {
            "text": "Nước mắm hiệu X nhập từ nhà cung cấp Y: 800đ.",
            "error": "Bạn không hề đưa nước mắm hay nhà cung cấp Y: AI tự thêm nguyên liệu và giá, số này lẫn vào giá vốn."
          },
          {
            "text": "Tổng giá vốn: 20.500đ.",
            "error": "Cộng ba dòng bạn đưa cho 14.850 + 2.880 + 1.500 = 19.230đ (thêm dòng tự bịa 800đ ra 20.030đ), nên tổng 20.500đ không khớp với dòng nào."
          },
          {
            "text": "Tỷ lệ giá vốn: 20.500 ÷ 55.000 = 63%.",
            "error": "20.500 ÷ 55.000 ra khoảng 37%. Con số 63% là tỷ lệ lãi gộp, AI đã nhầm hai khái niệm."
          }
        ]
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Ghi định lượng, giá nhập và hao hụt cho một món.",
          "Bước 2 - Nhờ AI dựng bảng từng dòng, không cho tự thêm số.",
          "Bước 3 - Tự cộng lại và tính tỷ lệ giá vốn ÷ giá bán.",
          "Bước 4 - Cập nhật khi giá nhập đổi, không giữ bảng cũ."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Bảng giá vốn là phép cộng bạn kiểm được, AI giúp dựng và tính nhanh.",
          "Bài sau: chuyển sang phần quảng bá quán."
        ]
      }
    ]
  }
];
