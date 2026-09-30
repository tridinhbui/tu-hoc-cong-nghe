import type { Lesson } from "../lesson-types";

// Chặng 41, bài 11-15. Giáo trình: scripts/curriculum/stage-41.json.
export const S41_C_LESSONS: Lesson[] = [
  {
    "id": 2230,
    "slug": "freelancer-viet-mo-ta-du-an-cho-portfolio",
    "title": "Chặng 41, Bài 11: Viết mô tả dự án cho portfolio từ ghi chú của chính bạn",
    "subtitle": "Ảnh đẹp chưa đủ: khách cần biết bạn được nhờ gì, làm thế nào và kết quả ra sao, kể bằng chuyện thật của bạn.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "🖼️",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Bạn có một thư mục ảnh sản phẩm đẹp nhưng cứ ngồi trước trang trống không biết kể gì. Người xem portfolio muốn hiểu cách bạn làm việc, không chỉ xem ảnh. AI dựng khung kể giúp bạn rất nhanh, miễn là nó chỉ sắp xếp ghi chú thật của bạn chứ không tự thêm những gì chưa từng xảy ra.",
    "openingQuestion": "Bạn có 6 ảnh sản phẩm của một dự án cũ và vài dòng ghi chú trong điện thoại. Cách nào cho ra mô tả portfolio dùng được mà không bịa?",
    "openingOptions": [
      "Dán ghi chú thật của bạn, nhờ AI xếp thành khung vấn đề, cách làm, kết quả",
      "Chỉ đưa ảnh và tên dự án, để AI tự nghĩ ra câu chuyện cho hấp dẫn",
      "Nhờ AI viết mô tả thật ấn tượng như một agency lớn rồi đăng ngay",
      "Bỏ qua phần chữ, chỉ để ảnh vì khách thích nhìn hơn đọc"
    ],
    "correctOption": 0,
    "explanation": "Khung vấn đề, cách làm, kết quả là cách kể quen thuộc, và AI làm tốt việc xếp chữ vào khung. Nhưng chất liệu phải là ghi chú thật của bạn: khách cần gì, bạn quyết định gì, ra kết quả nào. Nếu chỉ đưa tên dự án, AI sẽ tự chế chi tiết nghe hợp lý mà chưa từng xảy ra. Viết như agency lớn sẽ làm bạn nghe xa lạ và dễ khoa trương, còn bỏ hết chữ thì khách không thấy được cách bạn nghĩ.",
    "diagram": [
      {
        "label": "Ghi chú thật: khách cần gì, bạn làm gì",
        "arrow": true
      },
      {
        "label": "AI xếp thành khung vấn đề - cách làm - kết quả",
        "arrow": true
      },
      {
        "label": "Bạn soát từng câu: có trong ghi chú không?",
        "arrow": true
      },
      {
        "label": "Đăng kèm ảnh, giữ bản ghi chú gốc"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một bạn thiết kế bao bì nhận làm nhãn cho một tiệm bánh nhỏ. Bạn ghi lại ba dòng: tiệm cần nhãn dễ đọc trên kệ, bạn thử hai bản màu, chủ tiệm chọn bản có chữ lớn hơn. Bạn nhờ AI xếp ba dòng đó thành đoạn kể. Bản nháp có thêm câu 'doanh số tăng mạnh', bạn gạch đi vì chủ tiệm chưa từng nói vậy."
    },
    "quiz": [
      {
        "question": "Chất liệu tốt nhất để AI viết mô tả dự án portfolio của bạn là gì?",
        "options": [
          "Ghi chú thật của bạn về yêu cầu, việc đã làm và kết quả",
          "Tên dự án cùng ảnh, còn phần còn lại AI tự hình dung",
          "Mô tả dự án của người khác để AI viết lại thành của bạn cho nhanh gọn",
          "Một câu yêu cầu chung như 'viết cho thật ấn tượng'"
        ],
        "correct": 0,
        "explanation": "AI xếp chữ rất nhanh nhưng không biết dự án của bạn đã diễn ra thế nào. Thiếu ghi chú thật, nó lấp chỗ trống bằng chi tiết nghe hợp lý. Mượn mô tả của người khác thì là sao chép chuyện của họ, còn câu yêu cầu chung cho ra đoạn văn ai cũng viết được."
      },
      {
        "question": "Mô tả dự án theo khung 'vấn đề, cách làm, kết quả' giúp người xem điều gì?",
        "options": [
          "Hiểu bạn suy nghĩ và làm việc ra sao",
          "Thấy được tất cả ảnh của dự án ở kích thước lớn hơn",
          "Biết ngay giá bạn nhận cho dự án đó là bao nhiêu tiền",
          "Tin rằng bạn từng làm việc cho những thương hiệu rất lớn"
        ],
        "correct": 0,
        "explanation": "Khung này cho khách thấy bạn hiểu vấn đề rồi chọn cách làm, đó là thứ họ mua khi thuê bạn. Ảnh lớn hơn là việc của bố cục trang, giá thường nằm ở báo giá riêng, và tên thương hiệu lớn không có trong khung nếu bạn chưa từng làm cho họ."
      },
      {
        "question": "AI viết 'dự án giúp khách tăng doanh số mạnh' nhưng ghi chú của bạn không có số liệu nào. Nên làm gì?",
        "options": [
          "Gạch câu đó, hoặc hỏi khách xin số liệu thật rồi mới ghi",
          "Giữ nguyên câu vì nó nghe rất hợp với dự án này",
          "Đổi thành 'tăng 30%' cho cụ thể và có vẻ đáng tin hơn",
          "Giữ câu đó nhưng viết nhỏ hơn để không ai để ý kỹ"
        ],
        "correct": 0,
        "explanation": "Câu không có trong ghi chú là câu AI tự thêm, dù nghe hợp lý vẫn là khẳng định chưa được kiểm. Bịa thêm con số 30% còn nặng hơn, vì con số cụ thể tạo cảm giác có chứng cứ. Viết nhỏ đi không biến điều chưa xảy ra thành có thật."
      },
      {
        "question": "Bạn nên soát bản nháp của AI theo cách nào cho chắc?",
        "options": [
          "Đọc từng câu, đối chiếu với ghi chú gốc, câu nào không có thì bỏ",
          "Đọc lướt một lần, nếu văn trôi chảy thì coi như đúng vì cách đó có vẻ nhanh hơn",
          "Nhờ chính AI đó đọc lại và cam đoan mọi thứ đều chính xác như nhiều người vẫn làm quen tay",
          "Chỉ soát câu đầu và câu cuối vì phần giữa thường đúng để khỏi mất thêm công sức"
        ],
        "correct": 0,
        "explanation": "Chuyện bịa thường nằm ở giữa bài, nơi AI làm câu chuyện đầy đặn hơn. Văn trôi chảy không chứng minh nội dung đúng, và AI không có gì ngoài ghi chú bạn đưa nên nó không thể tự cam đoan. Soát từng câu với ghi chú là cách duy nhất bắt được chi tiết thêm vào."
      },
      {
        "question": "Bạn muốn đăng dự án làm cho một khách cũ. Việc nào nên làm trước khi đăng?",
        "options": [
          "Hỏi khách xem họ đồng ý cho đăng tên và hình ảnh không",
          "Đăng luôn vì sản phẩm là do chính bạn tạo ra để mọi việc xong gọn trong ngày",
          "Chỉ cần xoá logo khách khỏi ảnh là đã đủ an toàn",
          "Nhờ AI kiểm tra xem việc đăng có vi phạm gì không"
        ],
        "correct": 0,
        "explanation": "Bạn tạo ra thiết kế nhưng nội dung và thông tin kinh doanh của khách vẫn có thể cần sự đồng ý của họ, nhất là khi hợp đồng có điều khoản bảo mật. Xoá logo không che được thông tin nhận ra khách, và AI không đọc hợp đồng của bạn. Hỏi thẳng khách là nhanh và rẻ nhất; chuyện pháp lý hỏi chuyên gia."
      }
    ],
    "keyTakeaways": [
      "Portfolio kể bằng khung vấn đề - cách làm - kết quả, dựa trên ghi chú thật.",
      "AI xếp chữ vào khung, không được thêm sự kiện hay số liệu.",
      "Câu nào không có trong ghi chú của bạn thì bỏ hoặc xin bằng chứng.",
      "Hỏi khách trước khi đăng dự án làm cho họ."
    ],
    "practicePrompt": {
      "question": "Bản nháp AI viết: 'Khách rất hài lòng và giới thiệu thêm ba khách khác'. Ghi chú của bạn chỉ có 'khách nhắn cảm ơn'. Nên làm gì với câu này?",
      "options": [
        "Sửa lại đúng bằng 'khách nhắn cảm ơn' hoặc bỏ",
        "Giữ nguyên vì khách hài lòng thì hay giới thiệu thật",
        "Đổi 'ba khách' thành 'nhiều khách' cho nghe an toàn hơn",
        "Giữ câu và hỏi AI có chắc đúng không rồi tin câu trả lời"
      ],
      "correct": 0,
      "explanation": "Ghi chú chỉ nói khách nhắn cảm ơn, còn việc giới thiệu ba khách khác là AI thêm vào. Đổi thành 'nhiều khách' vẫn là khẳng định chưa có, chỉ mơ hồ hơn, và hỏi AI có chắc không thì nó cũng không có dữ liệu nào để kiểm."
    },
    "summary": {
      "keyIdea": "Portfolio thuyết phục khi kể chuyện thật theo khung rõ ràng.",
      "formula": "Ghi chú thật + khung vấn đề, cách làm, kết quả + soát từng câu = mô tả không bịa.",
      "commonMistake": "Để AI lấp chỗ trống bằng những câu hay nghe nhưng chưa từng xảy ra.",
      "action": "Chọn một dự án cũ và ghi ba dòng ghi chú về nó."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn một dự án cũ của bạn. Viết 5 dòng ghi chú: khách cần gì, bạn làm gì, một quyết định của bạn, kết quả nếu có. Dán vào AI nhờ xếp theo khung vấn đề, cách làm, kết quả rồi gạch mọi câu không có trong ghi chú.",
      "secondary": "Ghi lại những câu AI tự thêm để nhận ra kiểu chi tiết nó hay bịa."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bạn đã làm xong dự án, ảnh đã chụp, nhưng đến lúc viết vài dòng để đăng thì đầu óc trống rỗng. Bài này chỉ cách biến ghi chú rời rạc của chính bạn thành đoạn kể rõ ràng, mà không có chữ nào bịa."
      },
      {
        "type": "feynman",
        "title": "Mô tả dự án đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới người thợ sửa nhà kể lại cho hàng xóm: nhà bị dột chỗ nào, thợ làm gì, giờ hết dột chưa. Người ta tin vì nghe ra chuyện thật, không phải vì lời hoa mỹ. AI chỉ giúp bạn xếp chuyện đó gọn hơn.",
        "columns": [
          "Phần chuyện",
          "Thợ kể cho hàng xóm",
          "Mô tả dự án portfolio"
        ],
        "rows": [
          [
            "Vấn đề",
            "Nhà dột ở góc phòng ngủ",
            "Khách cần gì và vì sao"
          ],
          [
            "Cách làm",
            "Thay tấm lợp, trám lại mép",
            "Bạn chọn hướng nào và vì sao"
          ],
          [
            "Kết quả",
            "Mưa lớn không còn dột",
            "Điều đã thay đổi, chỉ ghi nếu có bằng chứng"
          ],
          [
            "Người xếp chữ",
            "Chính người thợ",
            "AI, còn nội dung là của bạn"
          ]
        ],
        "oneLiner": "Chuyện thật của bạn, AI chỉ xếp gọn lại."
      },
      {
        "type": "heading",
        "text": "Vấn đề: ảnh đẹp mà chữ thì trống"
      },
      {
        "type": "paragraph",
        "text": "Người xem portfolio nhìn ảnh vài giây rồi muốn biết đằng sau đó là gì. Nếu bạn để AI viết từ tên dự án, nó viết rất trôi chảy, nhưng những gì nó thêm vào là chuyện của dự án khác, không phải của bạn. Cách an toàn là tự ghi vài dòng thô trước, rồi mới nhờ AI xếp."
      },
      {
        "type": "flow",
        "title": "Từ ghi chú tới mô tả portfolio",
        "steps": [
          {
            "label": "Ghi vài dòng thô",
            "detail": "Khách cần gì, bạn làm gì, bạn đã chọn cái gì thay vì cái gì. Viết lộn xộn cũng được, miễn là thật."
          },
          {
            "label": "Nhờ AI xếp vào khung",
            "detail": "Yêu cầu rõ: chỉ dùng thông tin trong ghi chú, xếp thành vấn đề, cách làm, kết quả, không thêm sự kiện hay con số."
          },
          {
            "label": "Đánh dấu câu lạ",
            "detail": "Với mỗi câu trong bản nháp, tìm dòng tương ứng trong ghi chú. Không tìm được thì đánh dấu."
          },
          {
            "label": "Bỏ hoặc xin bằng chứng",
            "detail": "Câu đánh dấu thì bỏ, hoặc hỏi khách xin số liệu thật rồi mới ghi."
          },
          {
            "label": "Đăng kèm ảnh",
            "detail": "Giữ bản ghi chú gốc để sau này còn biết mỗi câu đến từ đâu."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Tìm câu AI tự thêm vào",
        "task": "Đây là bản nháp AI viết cho dự án nhãn bánh. Ghi chú của bạn chỉ có: tiệm cần nhãn dễ đọc trên kệ, bạn thử hai bản màu, chủ tiệm chọn bản chữ lớn hơn. Bấm vào các câu không có trong ghi chú rồi nộp.",
        "segments": [
          {
            "text": "Tiệm bánh cần một nhãn dễ đọc khi đặt cạnh nhiều sản phẩm khác trên kệ."
          },
          {
            "text": "Tôi đề xuất hai phương án màu để chủ tiệm so sánh trực tiếp."
          },
          {
            "text": "Chủ tiệm chọn bản có chữ lớn hơn vì dễ nhìn từ xa."
          },
          {
            "text": "Sau khi ra mắt, doanh số của tiệm tăng gấp đôi chỉ trong một tháng.",
            "error": "Ghi chú không hề có số liệu doanh số. Đây là kết quả AI bịa cho câu chuyện đẹp."
          },
          {
            "text": "Nhãn này sau đó được một tạp chí ẩm thực giới thiệu.",
            "error": "Không có tạp chí nào trong ghi chú. Chi tiết bịa nghe rất đáng tin nên dễ lọt qua."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Kể từ ghi chú thật",
          "text": "Mỗi câu có nguồn. Khách hỏi lại bạn trả lời được. Ngắn nhưng đáng tin, và cho thấy bạn đã làm gì."
        },
        "right": {
          "label": "Để AI tự bịa cho hay",
          "text": "Câu chữ đầy đặn nhưng có chỗ chưa từng xảy ra. Khách hỏi kỹ bạn không trả lời được và mất tín nhiệm cả portfolio."
        }
      },
      {
        "type": "callout",
        "label": "Dự án làm cho khách",
        "text": "Trước khi đăng tên hay hình ảnh của khách, hỏi họ đồng ý. Nếu hợp đồng có điều khoản bảo mật hay bản quyền, hỏi người am hiểu pháp lý thay vì tự suy đoán."
      },
      {
        "type": "scenario",
        "title": "Đêm trước khi gửi portfolio",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn có ghi chú ba dòng về dự án nhãn bánh và bản nháp AI dài hơn ghi chú gấp ba lần. Ngày mai bạn gửi portfolio cho một khách mới.",
            "choices": [
              {
                "label": "Gửi luôn bản nháp vì đọc rất mượt",
                "next": "bad1"
              },
              {
                "label": "Đối chiếu từng câu với ba dòng ghi chú",
                "next": "s2"
              }
            ]
          },
          "bad1": {
            "text": "Khách mới hỏi về việc tăng doanh số gấp đôi. Bạn không có số nào để đưa ra và họ nghi ngờ các dự án còn lại.",
            "ending": "bad"
          },
          "s2": {
            "text": "Có hai câu không tìm được trong ghi chú. Bạn cân nhắc.",
            "choices": [
              {
                "label": "Bỏ hai câu, chỉ giữ phần có trong ghi chú",
                "next": "good"
              },
              {
                "label": "Giữ lại vì chắc khách cũ cũng thấy như vậy",
                "next": "bad2"
              }
            ]
          },
          "good": {
            "text": "Bản mô tả ngắn hơn nhưng mỗi câu bạn đều giải thích được. Khách mới hỏi cách bạn chọn màu và bạn kể rõ ràng.",
            "ending": "good"
          },
          "bad2": {
            "text": "Bạn giữ hai câu vì cảm giác đúng. Khi khách cũ vô tình thấy portfolio, họ nhắn hỏi số liệu nào họ từng cung cấp.",
            "ending": "bad"
          }
        }
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Ghi 3 đến 5 dòng thô về một dự án cũ.",
          "Bước 2 - Nhờ AI xếp vào khung, cấm thêm sự kiện và số liệu.",
          "Bước 3 - Đối chiếu từng câu với ghi chú, gạch câu lạ.",
          "Bước 4 - Hỏi khách trước khi đăng."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Ghi chú thật của bạn là nguyên liệu, AI chỉ là người xếp gọn.",
          "Bài sau: nhờ khách cũ viết vài dòng đánh giá thật cho bạn."
        ]
      }
    ]
  },
  {
    "id": 2231,
    "slug": "freelancer-hoi-khach-cu-xin-loi-gioi-thieu",
    "title": "Chặng 41, Bài 12: Xin lời giới thiệu từ khách cũ một cách không gượng",
    "subtitle": "Một tin nhắn ngắn, dễ trả lời, để khách tự viết vài dòng thật của họ - bạn không viết hộ.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "💬",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Bạn có vài khách hài lòng nhưng ngại mở lời xin đánh giá vì sợ phiền hoặc sợ nghe như đang xin xỏ. Một tin nhắn soạn tốt làm việc đó nhẹ nhàng, và nhờ AI chỉnh giọng thì nhanh. Điều quan trọng là lời đánh giá phải do khách viết, không phải do bạn hay AI viết thay họ.",
    "openingQuestion": "Khách vừa nhận sản phẩm và nhắn 'đẹp quá, cảm ơn bạn'. Bạn muốn xin họ vài dòng đánh giá để đưa vào portfolio. Cách nào hợp lý nhất?",
    "openingOptions": [
      "Nhờ họ viết vài dòng bằng lời của họ, cho biết sẽ đăng ở đâu",
      "Nhờ AI viết sẵn đánh giá rồi gửi khách bấm đồng ý cho nhanh",
      "Tự viết lời khen, ghi tên khách và đăng vì họ đã khen rồi",
      "Gửi một mẫu dài kèm vài câu trả lời để khách chỉ việc chép lại"
    ],
    "correctOption": 0,
    "explanation": "Lời đánh giá có giá trị vì đó là giọng của khách. Nhờ họ viết bằng lời của họ, nói rõ sẽ đăng ở đâu, là cách trung thực và cũng dễ trả lời nhất nếu tin nhắn ngắn. Soạn sẵn đánh giá rồi để khách bấm đồng ý biến nó thành lời của bạn với chữ ký của khách. Tự viết dựa vào một câu cảm ơn là ghép lời họ không nói. Mẫu dài kèm câu trả lời sẵn khiến khách chép lại, và người đọc nhận ra ngay.",
    "diagram": [
      {
        "label": "Chọn khách vừa hài lòng, đúng lúc",
        "arrow": true
      },
      {
        "label": "AI soạn tin nhắn ngắn, dễ trả lời",
        "arrow": true
      },
      {
        "label": "Khách tự viết vài dòng bằng lời của họ",
        "arrow": true
      },
      {
        "label": "Hỏi ý họ về tên và nơi đăng, rồi mới đăng"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một bạn chụp ảnh sự kiện vừa giao ảnh cho một cặp vợ chồng. Hôm sau, bạn nhờ AI làm mềm một tin nhắn ngắn: cảm ơn, hỏi họ có thể viết hai ba câu về trải nghiệm, và hỏi có đồng ý cho ghi tên hay ẩn danh. Cô dâu trả lời bằng ba câu khác hẳn cách viết của bạn, và bạn đăng đúng nguyên văn."
    },
    "quiz": [
      {
        "question": "Thời điểm nào thường thuận lợi nhất để xin khách viết vài dòng đánh giá?",
        "options": [
          "Ngay sau khi khách vừa nhận kết quả và tỏ ra hài lòng",
          "Vài tháng sau khi giao, khi khách đã quên gần hết việc",
          "Đúng lúc khách đang góp ý sửa lần cuối cho sản phẩm",
          "Ngay trong tin nhắn báo giá, trước khi bắt đầu làm việc"
        ],
        "correct": 0,
        "explanation": "Cảm xúc hài lòng còn mới thì khách viết nhanh và cụ thể. Vài tháng sau họ quên chi tiết nên chỉ viết chung chung. Xin trong lúc đang sửa dễ làm họ thấy như bị đổi chác, còn xin trước khi làm thì họ chưa có gì để đánh giá."
      },
      {
        "question": "Vì sao không nên nhờ AI viết sẵn lời đánh giá rồi gửi khách bấm đồng ý?",
        "options": [
          "Vì đó không còn là lời của khách, người đọc sẽ nhận ra và mất tin",
          "Vì AI không viết được câu khen tiếng Việt cho tự nhiên",
          "Vì khách sẽ thấy tin nhắn quá dài nên không đọc hết",
          "Vì công cụ AI thường bị chặn khi gửi tin nhắn cho khách"
        ],
        "correct": 0,
        "explanation": "Đánh giá có giá trị chỉ khi nó phản ánh trải nghiệm thật của khách. Lời soạn sẵn thường nghe đồng nhất và quá hoàn hảo, người xem portfolio nhận ra. Vấn đề không nằm ở việc AI viết tiếng Việt kém, độ dài tin nhắn hay việc bị chặn, mà nằm ở chuyện ai là tác giả thật của câu chữ."
      },
      {
        "question": "Tin nhắn xin đánh giá nên có yếu tố nào để khách dễ đồng ý?",
        "options": [
          "Một yêu cầu nhỏ: vài dòng, kèm lời cho phép khách từ chối",
          "Một danh sách năm câu hỏi dài để khách trả lời đầy đủ",
          "Lời hứa giảm giá lần sau nếu khách viết đánh giá tốt",
          "Một đoạn giải thích dài về việc bạn cần đánh giá để kiếm việc"
        ],
        "correct": 0,
        "explanation": "Yêu cầu nhỏ và cho phép từ chối làm khách thấy nhẹ nhàng nên dễ nhận lời. Năm câu hỏi dài tốn công của họ. Giảm giá đổi lấy đánh giá tốt khiến lời khen thành có điều kiện, người xem sẽ mất tin và trong một số nơi còn bị cấm theo quy định của nền tảng."
      },
      {
        "question": "Khách viết 'ổn, tạm được' rồi bạn thấy hơi nhạt. Bạn nên xử lý thế nào?",
        "options": [
          "Hỏi thêm một câu mở như 'phần nào bạn thấy đáng nhớ nhất?'",
          "Nhờ AI viết lại thành 'tuyệt vời, vượt mọi mong đợi vì cách đó có vẻ nhanh hơn'",
          "Tự thêm vài câu khen vào và giữ tên khách ở cuối",
          "Bỏ đánh giá đó và chỉ đăng những lời khen dài dòng"
        ],
        "correct": 0,
        "explanation": "Câu hỏi mở mời khách kể thêm bằng lời của họ, nên lời đánh giá vẫn thật. Đổi 'ổn' thành 'vượt mọi mong đợi' là bóp méo ý khách, và thêm câu khen dưới tên họ là giả mạo lời của họ. Chỉ đăng lời khen dài dòng cũng dễ dẫn tới việc tự viết lời."
      },
      {
        "question": "Bạn muốn đăng đánh giá kèm tên đầy đủ và công ty của khách. Việc cần làm là gì?",
        "options": [
          "Hỏi khách đồng ý cho ghi tên nào và ghi ở đâu",
          "Không cần hỏi vì chính khách đã viết đánh giá cho bạn rồi",
          "Chỉ ghi tên công ty vì công ty thì không phải thông tin riêng",
          "Nhờ AI rút gọn tên để khách không nhận ra là mình"
        ],
        "correct": 0,
        "explanation": "Khách viết cho bạn đọc không có nghĩa họ đồng ý đăng công khai kèm tên và nơi làm việc. Tên công ty cũng có thể là thông tin khách muốn giữ. Rút gọn tên để họ khó nhận ra vẫn là đăng mà không hỏi. Hỏi rõ họ muốn ghi tên đầy đủ, tên viết tắt hay ẩn danh."
      }
    ],
    "keyTakeaways": [
      "Xin đánh giá khi khách vừa hài lòng, bằng một tin nhắn ngắn.",
      "Lời đánh giá phải do khách tự viết, bạn và AI không viết thay.",
      "Cho khách quyền từ chối và quyền chọn ghi tên hay ẩn danh.",
      "Không đổi lời khen lấy giảm giá."
    ],
    "practicePrompt": {
      "question": "Khách trả lời 'ok bạn cứ viết giúp mình một đoạn khen rồi mình đồng ý'. Bạn nên làm gì?",
      "options": [
        "Gợi ý vài câu hỏi để khách tự viết ngắn bằng lời họ",
        "Nhờ AI viết đoạn khen rồi ghi tên khách phía dưới",
        "Viết đoạn khen theo cảm nhận của bạn về khách hài lòng",
        "Không đăng gì vì khách chưa tự viết ra đoạn nào cả"
      ],
      "correct": 0,
      "explanation": "Khách đồng ý cho bạn viết không làm nó thành trải nghiệm thật của họ, và người xem vẫn tưởng đó là lời họ. Gợi ý ba câu hỏi ngắn giúp họ viết nhanh mà vẫn là giọng của họ. Bạn tự viết hay nhờ AI viết đều dẫn tới đánh giá do người khác soạn; còn không đăng gì thì bỏ phí một khách hài lòng."
    },
    "summary": {
      "keyIdea": "Lời giới thiệu tốt nhất là lời thật của khách, xin bằng một yêu cầu nhỏ và dễ.",
      "formula": "Tin nhắn ngắn AI làm mềm + khách tự viết + hỏi ý về tên = đánh giá thật.",
      "commonMistake": "Soạn sẵn lời khen rồi để khách bấm đồng ý.",
      "action": "Chọn một khách gần đây hài lòng và soạn tin xin đánh giá."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn một khách gần đây có phản hồi tốt. Viết tin nhắn xin họ hai ba câu đánh giá, gồm lời cảm ơn, nơi bạn định đăng, lựa chọn ghi tên hay ẩn danh, và cho phép từ chối. Nhờ AI làm mềm giọng, sửa lại cho đúng cách bạn nói rồi gửi.",
      "secondary": "Ghi lại khách trả lời sau bao lâu và họ nói gì."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bạn giao xong việc, khách nhắn cảm ơn, và bạn muốn xin vài dòng đánh giá nhưng ngại. Bài này chỉ cách nhờ AI soạn tin nhắn nhẹ nhàng, đồng thời giữ chuyện lời đánh giá là của khách."
      },
      {
        "type": "feynman",
        "title": "Xin lời giới thiệu đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới quán ăn nhỏ để cuốn sổ lưu bút cạnh quầy: khách tự cầm bút viết vài dòng nếu thấy vui. Không ai viết hộ, cũng không ai bị ép. AI giúp bạn đặt cuốn sổ ở chỗ dễ thấy và mời một cách lịch sự.",
        "columns": [
          "Việc",
          "Sổ lưu bút ở quán",
          "Xin đánh giá freelancer"
        ],
        "rows": [
          [
            "Lời mời",
            "Cuốn sổ đặt cạnh quầy thanh toán",
            "Tin nhắn ngắn, dễ trả lời"
          ],
          [
            "Người viết",
            "Khách tự cầm bút",
            "Khách tự viết bằng lời của họ"
          ],
          [
            "Quyền từ chối",
            "Khách không viết cũng không sao",
            "Nói rõ khách có thể bỏ qua"
          ],
          [
            "Người giúp",
            "Chủ quán đặt sổ",
            "AI làm mềm giọng tin nhắn"
          ]
        ],
        "oneLiner": "Bạn mời, khách viết; AI chỉ giúp lời mời nhẹ nhàng."
      },
      {
        "type": "heading",
        "text": "Vấn đề: ngại xin nên không xin"
      },
      {
        "type": "paragraph",
        "text": "Nhiều freelancer có khách hài lòng nhưng không bao giờ xin đánh giá vì ngại phiền. Một tin nhắn có ba phần là đủ: cảm ơn thật, một yêu cầu nhỏ, và cho phép khách nói không. AI giúp bạn chọn chữ, còn bạn quyết định xin ai và khi nào."
      },
      {
        "type": "flow",
        "title": "Từ khách hài lòng tới lời đánh giá thật",
        "steps": [
          {
            "label": "Chọn đúng khách, đúng lúc",
            "detail": "Khách vừa nhận kết quả và nhắn hài lòng. Đừng xin khi họ đang bực hay đang còn phải sửa."
          },
          {
            "label": "Soạn tin nhắn ngắn",
            "detail": "Cảm ơn, yêu cầu hai ba câu, nói nơi bạn dự định đăng, cho phép từ chối. Nhờ AI làm mềm giọng."
          },
          {
            "label": "Khách tự viết",
            "detail": "Nếu khách nhờ bạn viết hộ, gợi ý ba câu hỏi ngắn để họ tự trả lời."
          },
          {
            "label": "Hỏi về tên và nơi đăng",
            "detail": "Hỏi họ muốn ghi tên đầy đủ, tên viết tắt hay ẩn danh, và đồng ý đăng ở đâu."
          },
          {
            "label": "Đăng đúng nguyên văn",
            "detail": "Không sửa nghĩa. Nếu cần rút gọn, gửi lại cho khách xác nhận."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Soạn tin nhắn xin đánh giá",
        "task": "Khách vừa nhận sản phẩm và nhắn cảm ơn. Lắp prompt để AI soạn tin xin đánh giá đúng cách.",
        "parts": [
          {
            "id": "goal",
            "label": "Việc cần làm",
            "options": [
              {
                "text": "Viết cho tôi một lời đánh giá tuyệt vời của khách về tôi.",
                "feedback": "AI sẽ viết lời khen như thể khách nói, và bạn chỉ còn cách đăng lời không phải của họ."
              },
              {
                "text": "Soạn tin nhắn nhờ khách tự viết hai ba câu đánh giá bằng lời của họ.",
                "good": true,
                "feedback": "Đúng việc: AI giúp lời mời, còn nội dung do khách viết."
              }
            ]
          },
          {
            "id": "voice",
            "label": "Giọng và độ dài",
            "options": [
              {
                "text": "Viết thật trang trọng và đầy đủ để khách thấy được coi trọng.",
                "feedback": "Tin dài và cứng làm khách thấy nặng nề, dễ để đó rồi quên trả lời."
              },
              {
                "text": "Ngắn dưới 60 chữ, giọng thân, xưng em - anh/chị như tôi hay nói.",
                "good": true,
                "feedback": "Ngắn và đúng giọng bạn, khách đọc xong trả lời được ngay."
              }
            ]
          },
          {
            "id": "exit",
            "label": "Quyền của khách",
            "options": [
              {
                "text": "Nhắc khách rằng đánh giá tốt sẽ giúp họ được giảm giá lần sau.",
                "feedback": "Đổi ưu đãi lấy lời khen làm đánh giá mất giá trị, và một số nền tảng cấm việc này."
              },
              {
                "text": "Nói rõ khách có thể bỏ qua, và hỏi họ muốn ghi tên hay ẩn danh.",
                "good": true,
                "feedback": "Khách thấy thoải mái và bạn có sự đồng ý rõ ràng về tên."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "goal",
              "voice",
              "exit"
            ],
            "text": "Chào chị Lan, em cảm ơn chị đã tin tưởng em lần này! Nếu chị tiện, chị viết giúp em hai ba câu về trải nghiệm làm việc cùng em nhé, em muốn đưa vào portfolio. Chị muốn ghi tên đầy đủ hay ẩn danh đều được, và không viết cũng hoàn toàn không sao ạ."
          },
          {
            "requires": [
              "goal"
            ],
            "text": "Kính gửi Quý khách, chúng tôi rất mong Quý khách dành thời gian chia sẻ cảm nhận chi tiết về toàn bộ quá trình hợp tác, nếu có đánh giá tốt chúng tôi sẽ ưu đãi cho lần sau...\n\n(Dài, cứng, và hứa ưu đãi mà bạn chưa quyết.)"
          },
          {
            "text": "Đánh giá của chị Lan: 'Bạn làm việc cực kỳ chuyên nghiệp, sản phẩm vượt mong đợi, chắc chắn sẽ hợp tác lần nữa.'\n\n(Lời khen AI tự bịa, đặt dưới tên khách thật.)"
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Khách tự viết",
          "text": "Có chi tiết riêng, câu chữ hơi vụng nhưng thật. Người xem tin, và bạn có sự đồng ý rõ ràng."
        },
        "right": {
          "label": "Soạn sẵn rồi bấm đồng ý",
          "text": "Câu chữ bóng bẩy nhưng đồng nhất, dễ nhận ra. Khách thật có thể không nhớ mình đã nói vậy."
        }
      },
      {
        "type": "callout",
        "label": "Đừng gắn điều kiện",
        "text": "Đừng đổi giảm giá hay quà lấy lời khen. Đánh giá có thưởng có thể vi phạm quy định của nền tảng đăng tải; nếu chưa chắc, hỏi người am hiểu quy định của nơi bạn đăng."
      },
      {
        "type": "scenario",
        "title": "Khách nhắn: bạn viết giúp mình nhé",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Khách vừa nhận ảnh và rất hài lòng. Bạn gửi tin xin đánh giá, và họ trả lời: 'Mình bận, bạn viết đại một đoạn khen rồi mình đồng ý nhé'.",
            "choices": [
              {
                "label": "Nhờ AI viết đoạn khen và gửi khách bấm đồng ý",
                "next": "bad1"
              },
              {
                "label": "Gửi ba câu hỏi ngắn để khách trả lời nhanh",
                "next": "s2"
              }
            ]
          },
          "bad1": {
            "text": "Khách bấm đồng ý mà không đọc. Sau này một người xem hỏi khách về chi tiết trong đoạn, khách không nhớ đã nói vậy và bạn mất uy tín.",
            "ending": "bad"
          },
          "s2": {
            "text": "Khách trả lời hai trong ba câu hỏi bằng lời của họ, hơi cộc lốc.",
            "choices": [
              {
                "label": "Nhờ AI nối hai câu thành một đoạn nhưng giữ nguyên ý và gửi lại khách xác nhận",
                "next": "good"
              },
              {
                "label": "Thêm mấy câu khen cho đoạn nghe đầy đặn rồi đăng",
                "next": "bad2"
              }
            ]
          },
          "good": {
            "text": "Khách đọc lại, sửa một chữ và đồng ý ghi tên viết tắt. Bạn đăng đúng bản đó.",
            "ending": "good"
          },
          "bad2": {
            "text": "Đoạn có những lời khen khách chưa từng nói. Khi khách thấy trên portfolio, họ nhắn nhờ gỡ xuống.",
            "ending": "bad"
          }
        }
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Chọn một khách vừa hài lòng.",
          "Bước 2 - Nhờ AI làm mềm tin nhắn ngắn của bạn.",
          "Bước 3 - Để khách tự viết, hỏi về tên và nơi đăng.",
          "Bước 4 - Đăng đúng nguyên văn."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Lời đánh giá là của khách, lời mời là của bạn, AI chỉ giúp lời mời mềm hơn.",
          "Bài sau: đọc góp ý khó nghe và tách ra việc cần làm."
        ]
      }
    ]
  },
  {
    "id": 2232,
    "slug": "freelancer-tra-loi-gop-y-kho-nghe-cua-khach",
    "title": "Chặng 41, Bài 13: Đọc góp ý khó nghe và tách ra việc cần làm",
    "subtitle": "Khi khách nhắn 'không đúng ý', hãy tách cảm xúc khỏi yêu cầu rồi hỏi lại đúng chỗ họ chưa vừa.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "🧩",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Khách nhắn 'không đúng ý mình' và bạn thấy tim chùng xuống. Phản ứng thường gặp là chống chế hoặc sửa loạn cả bản. AI đọc giúp bạn: tách phần cảm xúc, tìm yêu cầu thật, và chỉ ra chỗ còn mơ hồ để hỏi lại. Bạn giữ được bình tĩnh và tiết kiệm nhiều vòng sửa.",
    "openingQuestion": "Khách nhắn: 'Không đúng ý mình, làm lại đi'. Bạn nên làm gì trước?",
    "openingOptions": [
      "Tách ra cái họ không vừa và hỏi lại đúng chỗ đó",
      "Làm lại toàn bộ từ đầu theo một hướng hoàn toàn khác",
      "Giải thích dài vì sao bản hiện tại vốn đã đúng brief",
      "Nhờ AI làm ngay ba phiên bản khác để khách tự chọn"
    ],
    "correctOption": 0,
    "explanation": "Câu 'không đúng ý' gộp cảm xúc với yêu cầu mà chưa nói rõ chỗ nào. Bạn cần tách ra điều họ thật sự không vừa, rồi hỏi lại một hai câu cụ thể. Làm lại toàn bộ tốn công và có thể bỏ đi cả phần khách đã thích. Giải thích dài khiến khách thấy bị phản bác. Làm ba bản khác mà chưa hiểu vấn đề là đoán mò gấp ba lần.",
    "diagram": [
      {
        "label": "Đọc nguyên văn tin nhắn của khách",
        "arrow": true
      },
      {
        "label": "AI tách: cảm xúc, yêu cầu rõ, chỗ còn mơ hồ",
        "arrow": true
      },
      {
        "label": "Bạn hỏi lại đúng chỗ mơ hồ",
        "arrow": true
      },
      {
        "label": "Sửa theo câu trả lời, xác nhận trước khi làm"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một bạn làm logo nhận tin 'thấy chưa đúng ý, hơi nhạt'. Bạn dán tin vào AI và hỏi: đâu là cảm xúc, đâu là yêu cầu, còn thiếu gì. AI chỉ ra 'nhạt' là cảm nhận chưa rõ. Bạn gửi khách hai câu hỏi: nhạt về màu hay về hình, và khách muốn cảm giác nào. Khách trả lời 'màu chưa nổi', và bạn chỉ sửa màu."
    },
    "quiz": [
      {
        "question": "Khách nhắn 'thấy chưa được'. Việc đầu tiên nên làm là gì?",
        "options": [
          "Tìm xem khách không vừa ở đâu bằng câu hỏi cụ thể",
          "Làm lại bản mới hoàn toàn để họ khỏi phải chờ lâu cho đỡ phải chờ đợi lâu",
          "Xin lỗi thật nhiều và hứa sửa miễn phí bao nhiêu lần cũng được",
          "Nhờ AI đoán giúp khách đang nghĩ gì rồi sửa theo đó"
        ],
        "correct": 0,
        "explanation": "'Chưa được' chưa chỉ ra điều gì cần sửa, nên bước đầu là hỏi. Làm lại hoàn toàn dễ bỏ mất phần khách đã thích. Hứa sửa không giới hạn là cam kết ngoài báo giá. AI không đọc được ý nghĩ của khách nên chỉ đoán, và đoán sai làm mất thêm một vòng."
      },
      {
        "question": "AI tách tin nhắn khó nghe thành các phần. Phần nào bạn đáng tin AI nhất?",
        "options": [
          "Phân loại câu nào là cảm xúc, câu nào là yêu cầu cụ thể",
          "Đoán chính xác lý do thật khiến khách không hài lòng vì cách đó có vẻ nhanh hơn",
          "Quyết định luôn bạn nên sửa hay nên từ chối yêu cầu như nhiều người vẫn làm quen tay",
          "Cam đoan khách sẽ hài lòng sau khi sửa theo gợi ý để khỏi mất thêm công sức"
        ],
        "correct": 0,
        "explanation": "Tách câu chữ là việc đọc hiểu, AI làm tốt và bạn kiểm được ngay với tin nhắn gốc. Lý do thật nằm trong đầu khách nên AI chỉ đoán. Việc sửa hay từ chối liên quan tới hợp đồng và mối quan hệ nên là của bạn, và không ai cam đoan được khách hài lòng."
      },
      {
        "question": "AI gợi ý: 'Khách muốn logo hiện đại hơn'. Tin nhắn gốc chỉ có 'hơi nhạt'. Nên hiểu thế nào?",
        "options": [
          "Đây là suy đoán, cần hỏi khách 'nhạt' về màu, hình hay cảm giác",
          "Đúng rồi, 'nhạt' nghĩa là thiếu hiện đại nên cứ sửa theo hướng đó",
          "Tin AI vì nó đã đọc rất nhiều góp ý của khách hàng khác",
          "Bỏ qua vì 'hơi nhạt' là ý kiến cá nhân chứ không phải yêu cầu"
        ],
        "correct": 0,
        "explanation": "'Hiện đại' là chữ AI thêm vào, khách chưa từng nói. 'Nhạt' có thể là màu, nét, hay chữ, và mỗi loại sửa khác nhau. Việc AI từng thấy nhiều góp ý khác không cho biết khách này nghĩ gì. Ý kiến cá nhân của khách chính là thứ bạn cần làm rõ, không phải gạt đi."
      },
      {
        "question": "Câu hỏi làm rõ nào tốt nhất để gửi lại cho khách?",
        "options": [
          "'Bạn thấy chỗ nào chưa vừa: màu, hình hay chữ?' kèm lời cảm ơn",
          "'Bạn muốn gì thì nói thẳng ra, mình sửa theo cho xong như nhiều người vẫn làm quen tay.'",
          "'Trong brief bạn đã duyệt rồi mà, sao giờ lại thấy khác?'",
          "'Bạn thích bản nào trong 10 mẫu mình vừa gửi lại đây?'"
        ],
        "correct": 0,
        "explanation": "Câu hỏi có lựa chọn cụ thể giúp khách nhìn vào từng phần và trả lời nhanh, đồng thời cho thấy bạn nghiêm túc. Giọng gắt hay viện dẫn brief làm khách phòng thủ. Gửi 10 mẫu mới bắt khách làm việc của bạn và chưa giải quyết được chỗ họ chưa vừa."
      },
      {
        "question": "Khi khách đòi thay đổi lớn nằm ngoài phạm vi đã báo giá, bạn nên làm gì?",
        "options": [
          "Nói rõ đó là việc thêm, báo lại thời gian và chi phí trước khi làm",
          "Nhận luôn cho khách vui và tính sau khi hoàn thành",
          "Từ chối thẳng và không giải thích để tránh cãi vã",
          "Nhờ AI viết một email thật dài giải thích vì sao không làm được"
        ],
        "correct": 0,
        "explanation": "Việc ngoài phạm vi cần nói sớm và cụ thể để khách quyết định có làm thêm không. Nhận rồi tính sau dễ thành tranh cãi về tiền. Từ chối cụt lủn phá quan hệ, và email dài không thay được việc nói rõ hai điều: việc đó là việc thêm và nó tốn bao nhiêu."
      }
    ],
    "keyTakeaways": [
      "Góp ý khó nghe thường trộn cảm xúc với yêu cầu; hãy tách chúng ra.",
      "AI phân loại câu chữ tốt nhưng không đọc được ý khách.",
      "Hỏi lại đúng chỗ mơ hồ trước khi sửa.",
      "Việc ngoài phạm vi nói rõ là việc thêm, kèm thời gian và chi phí."
    ],
    "practicePrompt": {
      "question": "Khách nhắn: 'Chưa đúng ý, thấy chưa ổn'. AI trả về 'khách muốn thay đổi toàn bộ phong cách'. Bạn nên làm gì?",
      "options": [
        "Coi đó là giả định, hỏi khách cụ thể chỗ nào chưa ổn",
        "Làm lại toàn bộ theo phong cách khác như AI gợi ý mà không hỏi khách",
        "Hỏi AI tiếp cho đến khi nó đưa ra câu trả lời chắc chắn",
        "Nhắn khách rằng bạn sẽ không sửa vì đã làm đúng brief"
      ],
      "correct": 0,
      "explanation": "'Toàn bộ phong cách' không có trong tin nhắn của khách, nó là suy diễn của AI. Cách an toàn là hỏi khách chỗ nào chưa ổn. Làm lại toàn bộ tốn công dựa trên đoán mò. Hỏi AI nhiều lần chỉ cho thêm suy đoán, và từ chối sửa mà chưa hiểu vấn đề dễ làm mất khách."
    },
    "summary": {
      "keyIdea": "Góp ý khó nghe là thông tin chưa rõ; tách ra rồi hỏi lại thay vì đoán.",
      "formula": "Tin nhắn gốc + AI tách + câu hỏi làm rõ = sửa đúng chỗ.",
      "commonMistake": "Sửa hoặc làm lại theo điều AI đoán mà không hỏi khách.",
      "action": "Lấy một góp ý gần đây và tách ra ba phần."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Lấy một tin nhắn góp ý của khách gần đây, ẩn tên họ nếu cần. Nhờ AI tách thành ba phần: cảm xúc, yêu cầu rõ, chỗ còn mơ hồ. Đối chiếu với tin gốc để gạch những câu AI thêm vào, rồi viết hai câu hỏi làm rõ.",
      "secondary": "Ghi lại câu nào AI hiểu sai để lần sau biết nó hay suy diễn kiểu gì."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Tin nhắn 'không đúng ý mình' đến vào buổi tối và bạn mất cả buổi bực bội. Bài này cho bạn cách bình tĩnh đọc lại nó, tách ra việc cần làm và hỏi khách đúng chỗ."
      },
      {
        "type": "feynman",
        "title": "Đọc góp ý khó nghe đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới bác sĩ khi bệnh nhân nói 'tôi thấy không khỏe'. Bác sĩ không kê thuốc ngay, mà hỏi đau ở đâu, từ khi nào, đau kiểu gì. Góp ý của khách cũng cần được hỏi cho ra chỗ thật sự có vấn đề.",
        "columns": [
          "Bước",
          "Bác sĩ hỏi bệnh",
          "Freelancer đọc góp ý"
        ],
        "rows": [
          [
            "Nghe lời than",
            "Tôi thấy không khỏe",
            "Không đúng ý mình"
          ],
          [
            "Hỏi chỗ cụ thể",
            "Đau ở đâu, từ khi nào",
            "Chưa vừa ở màu, hình hay chữ"
          ],
          [
            "Xác nhận",
            "Nhắc lại triệu chứng",
            "Nhắc lại yêu cầu để khách xác nhận"
          ],
          [
            "Người giúp đọc",
            "Bảng ghi chép",
            "AI phân loại câu chữ"
          ]
        ],
        "oneLiner": "Hỏi cho ra chỗ đau rồi mới sửa."
      },
      {
        "type": "heading",
        "text": "Vấn đề: cảm xúc trộn với yêu cầu"
      },
      {
        "type": "paragraph",
        "text": "Một câu như 'thất vọng quá, không đúng ý mình' có cảm xúc rõ nhưng gần như không có yêu cầu. Nếu bạn phản ứng với cảm xúc, bạn sẽ chống chế hoặc làm lại tất cả. AI đọc câu chữ không bị nhói lòng nên phân loại rất tốt, nhưng nó không biết khách nghĩ gì, chỉ biết khách viết gì."
      },
      {
        "type": "flow",
        "title": "Từ lời phàn nàn tới việc cần làm",
        "steps": [
          {
            "label": "Dán nguyên văn tin của khách",
            "detail": "Dán đúng chữ khách viết, ẩn tên và thông tin riêng. Đừng tóm tắt theo cảm giác của bạn."
          },
          {
            "label": "Nhờ AI tách ba phần",
            "detail": "Yêu cầu: câu nào là cảm xúc, câu nào là yêu cầu rõ, chỗ nào còn mơ hồ. Cấm đoán ý khách."
          },
          {
            "label": "Đối chiếu với tin gốc",
            "detail": "Mỗi ý AI nêu phải có câu tương ứng trong tin của khách. Ý nào không có là suy diễn."
          },
          {
            "label": "Viết một hai câu hỏi làm rõ",
            "detail": "Hỏi có lựa chọn: chỗ nào chưa vừa, màu, hình hay chữ."
          },
          {
            "label": "Xác nhận rồi mới sửa",
            "detail": "Nhắc lại việc sẽ sửa và hỏi khách đúng chưa, nếu là việc thêm thì báo chi phí."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI đọc tin nhắn khó nghe",
        "task": "Khách nhắn: 'Hơi nhạt, chưa đúng ý mình lắm'. Lắp prompt để AI giúp bạn tách việc cần làm.",
        "parts": [
          {
            "id": "input",
            "label": "Đưa gì cho AI",
            "options": [
              {
                "text": "Khách không hài lòng với logo, hãy gợi ý cách sửa.",
                "feedback": "Bạn tóm tắt theo cảm giác của mình nên AI trả về gợi ý chung chung, không bám chữ khách."
              },
              {
                "text": "Tin nhắn nguyên văn của khách: 'Hơi nhạt, chưa đúng ý mình lắm' (đã ẩn tên).",
                "good": true,
                "feedback": "Có nguyên văn nên AI bám đúng chữ khách viết."
              }
            ]
          },
          {
            "id": "task",
            "label": "Việc cần làm",
            "options": [
              {
                "text": "Cho biết khách thực sự đang nghĩ gì.",
                "feedback": "AI không đọc được suy nghĩ, nó sẽ đoán và nói như thật."
              },
              {
                "text": "Tách câu nào là cảm xúc, yêu cầu rõ, chỗ mơ hồ; chỉ dùng chữ trong tin nhắn.",
                "good": true,
                "feedback": "Đúng việc đọc hiểu, và có giới hạn không được đoán."
              }
            ]
          },
          {
            "id": "out",
            "label": "Kết quả mong muốn",
            "options": [
              {
                "text": "Viết luôn bản sửa tối ưu cho tôi.",
                "feedback": "Chưa biết chỗ nào chưa vừa mà sửa thì rất dễ sửa sai."
              },
              {
                "text": "Đề xuất hai câu hỏi làm rõ ngắn, có lựa chọn, giọng lịch sự.",
                "good": true,
                "feedback": "Bạn nhận được thứ dùng ngay: câu hỏi gửi lại khách."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "input",
              "task",
              "out"
            ],
            "text": "Cảm xúc: 'chưa đúng ý mình lắm' (chưa hài lòng, chưa nói lý do).\nYêu cầu rõ: chưa có.\nMơ hồ: 'nhạt' - chưa rõ về màu, hình hay chữ.\n\nCâu hỏi gợi ý: 'Bạn thấy phần nào nhạt nhất: màu, hình hay chữ ạ?' và 'Bạn thích cảm giác nào hơn: nổi bật hay nhẹ nhàng?'"
          },
          {
            "requires": [
              "input"
            ],
            "text": "Khách có thể muốn logo hiện đại, tươi sáng và đậm nét hơn. Bạn nên đổi phông chữ, tăng độ tương phản và thêm một biểu tượng.\n\n(AI tự bịa ra ba yêu cầu mà khách chưa từng nói.)"
          },
          {
            "text": "Khách không hài lòng với logo. Bạn nên làm lại theo phong cách hiện đại, màu sắc rực rỡ hơn và thêm hiệu ứng.\n\n(Gợi ý chung, không bám chữ của khách.)"
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Hỏi lại đúng chỗ",
          "text": "Một vòng hỏi, một vòng sửa. Khách thấy bạn lắng nghe. Bạn giữ được phần họ đã hài lòng."
        },
        "right": {
          "label": "Đoán rồi làm lại",
          "text": "Hai ba vòng sửa sai. Khách càng bực và bạn tốn thêm giờ làm không được trả."
        }
      },
      {
        "type": "callout",
        "label": "Khi khách gay gắt",
        "text": "Nếu tin nhắn có lời lẽ nặng hoặc đe doạ, đừng nhờ AI trả lời thay. Nghỉ một lúc rồi tự viết ngắn gọn. Với tranh chấp về tiền hay hợp đồng, hỏi người am hiểu pháp lý."
      },
      {
        "type": "scenario",
        "title": "Tin nhắn lúc 9 giờ tối",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Khách nhắn: 'Không đúng ý mình, làm lại đi'. Bạn thấy nóng mặt và đang định trả lời.",
            "choices": [
              {
                "label": "Trả lời ngay giải thích rằng bản này đúng brief",
                "next": "bad1"
              },
              {
                "label": "Dán tin vào AI để tách ý, rồi hỏi lại chỗ mơ hồ",
                "next": "s2"
              }
            ]
          },
          "bad1": {
            "text": "Khách càng bực vì thấy bị phản bác. Cuộc trao đổi thành cãi nhau về brief và họ dọa huỷ dự án.",
            "ending": "bad"
          },
          "s2": {
            "text": "AI chỉ ra tin nhắn không có yêu cầu cụ thể, chỉ có chỗ mơ hồ. Bạn cân nhắc câu trả lời.",
            "choices": [
              {
                "label": "Hỏi khách chỗ nào chưa vừa: màu, hình hay chữ",
                "next": "good"
              },
              {
                "label": "Làm lại toàn bộ theo hướng AI gợi ý rồi gửi khách",
                "next": "bad2"
              }
            ]
          },
          "good": {
            "text": "Khách trả lời 'màu chưa nổi'. Bạn chỉ sửa màu và khách đồng ý ngay ở vòng sau.",
            "ending": "good"
          },
          "bad2": {
            "text": "Bạn mất hai buổi làm bản mới. Khách nhìn rồi nói 'ủa mình chỉ chê màu thôi mà'.",
            "ending": "bad"
          }
        }
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Dán nguyên văn tin của khách, ẩn thông tin riêng.",
          "Bước 2 - Nhờ AI tách cảm xúc, yêu cầu, chỗ mơ hồ.",
          "Bước 3 - Gạch mọi ý không có trong tin gốc.",
          "Bước 4 - Hỏi lại khách đúng chỗ mơ hồ."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Cảm xúc của khách là thật, nhưng việc cần làm phải hỏi mới biết.",
          "Bài sau: gom số liệu kết quả thật của khách để kể chuyện có chứng cứ."
        ]
      }
    ]
  },
  {
    "id": 2233,
    "slug": "freelancer-thu-thap-so-lieu-ket-qua-that-de-ke-chuyen",
    "title": "Chặng 41, Bài 14: Gom số liệu kết quả thật của khách để kể chuyện có chứng cứ",
    "subtitle": "Muốn ghi 'giúp khách tăng đơn'? Hãy xin số thật hoặc cho phép ghi ẩn danh, rồi mới nhờ AI diễn đạt.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "📊",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Bạn muốn portfolio có câu 'giúp khách tăng đơn hàng' vì nghe thuyết phục. Nhưng nếu bạn không có số liệu do khách xác nhận, câu đó là lời hứa suông, thậm chí gây hiểu lầm. Bài này chỉ cách xin số thật, hỏi ý khách và nhờ AI diễn đạt mà không thêm bất cứ phần trăm nào khách chưa xác nhận.",
    "openingQuestion": "Bạn làm trang bán hàng cho một khách và muốn ghi 'giúp tăng đơn hàng'. Bạn chưa có số nào. Cách làm nào đúng?",
    "openingOptions": [
      "Xin khách số liệu thật hoặc cho phép ghi ẩn danh rồi mới diễn đạt",
      "Nhờ AI viết một con số tăng trưởng nghe hợp lý cho dự án này",
      "Ghi 'tăng đơn hàng đáng kể' vì không có số cụ thể nên khó bị bắt lỗi",
      "Bỏ qua kết quả và chỉ ghi chú những việc bạn đã làm cho khách"
    ],
    "correctOption": 0,
    "explanation": "Câu về kết quả chỉ đáng tin khi có nguồn: số liệu khách đưa, hoặc mô tả khách đồng ý cho ghi. Xin số thật là bước đúng, còn nếu khách không muốn công khai, xin phép ghi ẩn danh hoặc làm tròn khoảng. AI bịa một con số là tạo bằng chứng giả. 'Đáng kể' không có căn cứ vẫn là khẳng định chưa được kiểm chứng. Chỉ kể việc đã làm thì an toàn nhưng bỏ phí chứng cứ mà khách hoàn toàn có thể cho.",
    "diagram": [
      {
        "label": "Hỏi khách số liệu trước và sau, và cho phép ghi",
        "arrow": true
      },
      {
        "label": "AI diễn đạt đúng số khách xác nhận",
        "arrow": true
      },
      {
        "label": "Bạn soát: từng con số có nguồn không",
        "arrow": true
      },
      {
        "label": "Gửi khách xem lại câu trước khi đăng"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một bạn viết nội dung cho tiệm hoa. Bạn muốn ghi 'tăng đơn'. Bạn nhắn chủ tiệm: 'Chị cho em xin số đơn tháng trước và tháng sau khi đổi trang, và cho em biết chị có đồng ý em ghi số này không ạ?'. Chị chủ cho số đơn và đồng ý ghi làm tròn. AI diễn đạt đúng con số đó, không thêm phần trăm nào."
    },
    "quiz": [
      {
        "question": "Điều nào làm một câu về kết quả trong portfolio đáng tin?",
        "options": [
          "Con số hoặc nhận xét do chính khách cung cấp và đồng ý cho ghi",
          "Con số thật đẹp và cụ thể, nghe giống thống kê của công ty lớn",
          "Câu văn được AI viết mượt, rõ ràng và có cấu trúc tốt",
          "Câu ngắn gọn, đủ mạnh, không có chữ nào bị giải thích quá dài để mọi việc xong gọn trong ngày"
        ],
        "correct": 0,
        "explanation": "Độ tin cậy đến từ nguồn: khách là người có số và có quyền cho công khai. Con số đẹp không có nguồn có thể là bịa. Văn mượt không biến điều chưa được xác nhận thành đúng, và câu ngắn mạnh vẫn có thể là câu sai."
      },
      {
        "question": "Khách không muốn công khai số liệu bán hàng. Bạn nên làm gì?",
        "options": [
          "Xin phép ghi khoảng làm tròn hoặc ẩn danh, không thì bỏ phần số",
          "Vẫn ghi con số vì khách chỉ nói miệng chứ chưa cấm bằng văn bản",
          "Đổi con số thành phần trăm cho khách khó nhận ra",
          "Nhờ AI ước tính một con số hợp lý thay cho số thật vì trông chuyên nghiệp hơn hẳn"
        ],
        "correct": 0,
        "explanation": "Quyền công bố thuộc về khách, và số liệu kinh doanh thường nhạy cảm. Ẩn danh hay ghi khoảng là lựa chọn khách có thể chấp nhận. Đổi sang phần trăm vẫn là công bố dữ liệu của họ, và AI ước tính chỉ là bịa số dưới lớp vỏ hợp lý."
      },
      {
        "question": "AI viết 'giúp khách tăng đơn 40%' nhưng khách chỉ cho bạn 'đơn tăng lên nhiều'. Nên làm gì?",
        "options": [
          "Bỏ 40% hoặc hỏi khách xác nhận con số, chỉ ghi điều họ nói",
          "Giữ 40% vì nghe hợp lý với mức 'nhiều' khách nói để khỏi mất thêm công sức",
          "Đổi thành 50% cho tròn số và dễ nhớ hơn cho người xem",
          "Giữ 40% và nhờ AI thêm dấu ngoặc 'ước tính' phía sau"
        ],
        "correct": 0,
        "explanation": "Khách chưa từng nói 40%, con số đó là AI chế. Đổi số cho tròn hay thêm chữ 'ước tính' đều vẫn đưa vào portfolio con số không có nguồn, chỉ khác cách trình bày. Cách đúng là hỏi khách hoặc chỉ ghi những gì họ đã xác nhận."
      },
      {
        "question": "Bạn nên hỏi khách những gì để có chứng cứ tốt?",
        "options": [
          "Số trước và sau việc bạn làm, thời gian đo, và cho phép ghi",
          "Chỉ hỏi khách có hài lòng không rồi tự suy ra con số cho đỡ phải chờ đợi lâu",
          "Hỏi khách đoán xem đã tăng khoảng bao nhiêu phần trăm vì trông chuyên nghiệp hơn hẳn",
          "Xin toàn bộ báo cáo tài chính của công ty họ để tham khảo để mọi việc xong gọn trong ngày"
        ],
        "correct": 0,
        "explanation": "Con số có ý nghĩa cần mốc trước và sau, khoảng thời gian, và sự đồng ý công bố. Hỏi hài lòng chỉ cho cảm xúc, không cho số. Đoán bao nhiêu phần trăm là ước lượng cảm tính, còn xin toàn bộ báo cáo vượt xa điều bạn cần và có thể là dữ liệu khách không muốn chia sẻ."
      },
      {
        "question": "Trang của khách tăng đơn sau khi bạn làm, nhưng cùng lúc họ chạy quảng cáo. Câu nào trung thực hơn?",
        "options": [
          "'Đơn tăng sau khi ra mắt trang mới, cùng thời điểm chạy quảng cáo'",
          "'Trang mới do tôi làm đã giúp đơn hàng tăng gấp đôi'",
          "'Nhờ trang này mà khách đạt doanh số kỷ lục trong năm'",
          "'Trang này là nguyên nhân duy nhất khiến đơn hàng tăng'"
        ],
        "correct": 0,
        "explanation": "Có hai thay đổi cùng lúc thì không tách được phần đóng góp của riêng bạn. Câu trung thực nói đúng điều quan sát được và điều kiện đi kèm. Ba câu còn lại đều gán toàn bộ nguyên nhân cho bạn, vượt quá chứng cứ."
      }
    ],
    "keyTakeaways": [
      "Kết quả trong portfolio cần nguồn: số của khách, khách cho phép ghi.",
      "Xin số trước và sau, thời gian đo, và sự đồng ý.",
      "Khách không muốn công khai thì ghi ẩn danh hoặc bỏ phần số.",
      "AI không được tự thêm phần trăm hay mốc so sánh."
    ],
    "practicePrompt": {
      "question": "Khách cho biết tháng trước có khoảng 100 đơn, tháng này khoảng 130 đơn. AI viết 'tăng 30% nhờ thiết kế mới'. Điều gì cần soát?",
      "options": [
        "Con số 30% có tính từ hai số khách cho, và 'nhờ thiết kế mới' có căn cứ không",
        "Chỉ cần xem câu viết có mượt không vì con số đã đúng",
        "Đổi thành 'tăng hơn 30%' để chắc chắn không sai số",
        "Thêm 'gấp đôi hiệu quả quảng cáo cũ' để tăng sức nặng"
      ],
      "correct": 0,
      "explanation": "130 so với 100 là tăng 30%, nên con số khớp. Chữ 'nhờ thiết kế mới' là khẳng định nguyên nhân mà số liệu chưa chứng minh. Đổi thành 'hơn 30%' hay thêm so sánh với quảng cáo cũ là thêm điều khách chưa xác nhận."
    },
    "summary": {
      "keyIdea": "Kể chuyện có chứng cứ nghĩa là mỗi con số đều có nguồn và được khách cho phép.",
      "formula": "Số khách cung cấp + sự đồng ý + AI diễn đạt = câu kết quả đáng tin.",
      "commonMistake": "Để AI thêm phần trăm hay quan hệ nhân quả mà khách chưa xác nhận.",
      "action": "Soạn tin nhắn xin số liệu và sự đồng ý cho một dự án."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn một dự án cũ có thể có kết quả. Soạn tin nhắn cho khách xin: số trước và sau, khoảng thời gian đo, và họ có đồng ý cho ghi công khai, làm tròn hay ẩn danh không. Nhờ AI làm mềm giọng rồi gửi. Nếu khách đã trả lời, nhờ AI diễn đạt chỉ bằng đúng số đó.",
      "secondary": "Ghi lại câu nào AI tự thêm để gạch đi."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Chữ 'giúp khách tăng đơn' nghe rất đã, nhưng nếu khách hỏi lại 'tăng bao nhiêu' mà bạn không có số thì portfolio mất giá. Bài này chỉ cách xin số thật và diễn đạt mà không thêm gì."
      },
      {
        "type": "feynman",
        "title": "Số liệu kết quả đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới việc kể cho bạn bè rằng bạn giảm được vài cân. Người ta tin hơn nếu bạn nói cân nặng trước và sau, và trong bao lâu. Nhưng bạn cũng chỉ nói khi thấy thoải mái. Kết quả của khách cũng vậy: có mốc, có thời gian, có sự đồng ý.",
        "columns": [
          "Yếu tố",
          "Kể chuyện giảm cân",
          "Kể kết quả cho khách"
        ],
        "rows": [
          [
            "Mốc trước",
            "Cân nặng đầu tháng",
            "Số đơn hoặc chỉ số trước khi bạn làm"
          ],
          [
            "Mốc sau",
            "Cân nặng cuối tháng",
            "Cùng chỉ số sau khi làm"
          ],
          [
            "Thời gian",
            "Trong một tháng",
            "Khoảng thời gian đo"
          ],
          [
            "Quyền công bố",
            "Bạn quyết định kể",
            "Khách quyết định có cho ghi không"
          ]
        ],
        "oneLiner": "Có mốc trước, mốc sau, thời gian đo và sự đồng ý của khách."
      },
      {
        "type": "heading",
        "text": "Vấn đề: câu hay mà không có nguồn"
      },
      {
        "type": "paragraph",
        "text": "AI rất giỏi viết câu nghe như báo cáo: 'giúp khách tăng 35% lượng truy cập'. Nếu bạn không đưa số, nó vẫn có thể viết ra một con số. Vì vậy quy tắc đơn giản là: số nào cũng phải đến từ khách hoặc từ báo cáo họ cho bạn xem. AI chỉ được diễn đạt lại."
      },
      {
        "type": "flow",
        "title": "Từ ý muốn kể tới câu có chứng cứ",
        "steps": [
          {
            "label": "Xác định điều bạn muốn nói",
            "detail": "Ví dụ 'đơn hàng tăng'. Viết ra chỉ số cụ thể: số đơn mỗi tháng, lượt liên hệ, thời gian phản hồi."
          },
          {
            "label": "Xin khách số trước và sau",
            "detail": "Hỏi mốc trước, mốc sau, khoảng thời gian, và họ có đồng ý cho ghi không."
          },
          {
            "label": "Chọn mức công khai",
            "detail": "Số thật, số làm tròn, khoảng, hay ẩn danh. Khách chọn."
          },
          {
            "label": "Nhờ AI diễn đạt đúng số đó",
            "detail": "Đưa đúng số khách gửi, yêu cầu không thêm số nào và không nói nguyên nhân chưa chắc."
          },
          {
            "label": "Gửi khách xem lại câu",
            "detail": "Khách xác nhận câu cuối trước khi đăng."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Tìm số liệu không có nguồn",
        "task": "Khách chỉ cho bạn: tháng trước khoảng 100 đơn, tháng này khoảng 130 đơn, và đồng ý ghi làm tròn. Bấm vào những câu trong bản nháp của AI có thông tin không đến từ khách rồi nộp.",
        "segments": [
          {
            "text": "Tháng trước tiệm nhận khoảng 100 đơn hàng qua trang."
          },
          {
            "text": "Sau khi ra mắt trang mới, tháng này lên khoảng 130 đơn."
          },
          {
            "text": "Đó là mức tăng khoảng 30% theo số khách cung cấp."
          },
          {
            "text": "Tỷ lệ khách quay lại tăng thêm 25% nhờ trải nghiệm mới.",
            "error": "Khách không nói gì về tỷ lệ quay lại. Số 25% là AI bịa."
          },
          {
            "text": "Đây là kết quả tốt nhất trong ngành hoa tươi trong khu vực.",
            "error": "Không có dữ liệu so sánh ngành nào. Đây là lời khoe AI thêm cho có sức nặng."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Số do khách xác nhận",
          "text": "Có mốc trước sau, có nguồn. Khách hỏi lại bạn trả lời được và người xem tin."
        },
        "right": {
          "label": "Số AI tự thêm",
          "text": "Nghe mạnh và cụ thể nhưng không ai xác nhận. Một lần bị hỏi ngược là mất niềm tin."
        }
      },
      {
        "type": "callout",
        "label": "Số liệu là dữ liệu của khách",
        "text": "Số bán hàng, doanh thu hay thông tin khách hàng của họ thuộc về họ. Chỉ đưa vào công cụ AI phần bạn được phép, và hỏi bộ phận pháp chế hoặc người am hiểu khi hợp đồng có điều khoản bảo mật."
      },
      {
        "type": "scenario",
        "title": "Muốn ghi 'giúp khách tăng đơn'",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn vừa hoàn thành trang bán hàng cho tiệm hoa và muốn ghi kết quả vào portfolio. Bạn chưa có số nào.",
            "choices": [
              {
                "label": "Nhờ AI viết một con số tăng trưởng cho hợp",
                "next": "bad1"
              },
              {
                "label": "Nhắn khách xin số trước, sau và sự đồng ý",
                "next": "s2"
              }
            ]
          },
          "bad1": {
            "text": "Một khách tiềm năng hỏi 'tăng bao nhiêu từ đâu ra' và bạn không có nguồn. Họ nghi ngờ mọi dự án khác trong portfolio.",
            "ending": "bad"
          },
          "s2": {
            "text": "Khách cho số đơn nhưng nói 'đừng ghi tên tiệm mình'.",
            "choices": [
              {
                "label": "Ghi ẩn danh như 'một tiệm hoa nhỏ', đúng số khách cho",
                "next": "good"
              },
              {
                "label": "Vẫn ghi tên tiệm vì số liệu là do bạn tạo ra",
                "next": "bad2"
              }
            ]
          },
          "good": {
            "text": "Khách đọc lại câu và đồng ý. Portfolio có chứng cứ mà bạn không vi phạm mong muốn của khách.",
            "ending": "good"
          },
          "bad2": {
            "text": "Chủ tiệm thấy tên mình xuất hiện và nhắn yêu cầu gỡ. Bạn mất một khách quen.",
            "ending": "bad"
          }
        }
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Xác định chỉ số bạn muốn kể.",
          "Bước 2 - Xin khách số trước, sau, thời gian và sự đồng ý.",
          "Bước 3 - Nhờ AI diễn đạt, cấm thêm số.",
          "Bước 4 - Gửi khách xem lại câu."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Chứng cứ là số khách cho, không phải số nghe hợp lý.",
          "Bài sau: dự án nhỏ, trang portfolio ba dự án kèm lời kể ngắn."
        ]
      }
    ]
  },
  {
    "id": 2234,
    "slug": "freelancer-du-an-nho-trang-portfolio-ba-du-an",
    "title": "Chặng 41, Bài 15: Dự án nhỏ: trang portfolio ba dự án kèm lời kể ngắn",
    "subtitle": "Chọn ba việc, viết mỗi việc một đoạn, nhờ hai người quen đọc thử để biết phần nào chưa rõ.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "🗂️",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Bạn đã học cách kể một dự án, xin đánh giá, và gom số liệu. Giờ ghép lại: một trang portfolio ba dự án, mỗi dự án một đoạn ngắn. Ba việc chọn tốt còn hơn mười việc rải rác, và hai người đọc thử cho bạn biết ngay chỗ nào khó hiểu.",
    "openingQuestion": "Bạn có 12 dự án cũ và định đưa hết lên portfolio. Cách nào hợp lý hơn?",
    "openingOptions": [
      "Chọn ba dự án khác nhau nhất, mỗi dự án một đoạn kể rõ",
      "Đăng cả 12 dự án, mỗi cái một dòng cho khách tự chọn",
      "Chỉ chọn ba dự án đẹp nhất về ảnh, không cần lời kể",
      "Chọn ba dự án có tên khách lớn nhất dù bạn làm phần nhỏ"
    ],
    "correctOption": 0,
    "explanation": "Ba dự án khác nhau cho khách thấy bạn làm được nhiều kiểu việc, và mỗi dự án có đủ chỗ để kể vấn đề, cách làm, kết quả. Đăng cả 12 với một dòng làm khách không thấy được cách bạn nghĩ. Chỉ chọn theo ảnh bỏ mất phần thuyết phục nhất là lời kể. Chọn dự án theo tên khách lớn dễ khoe quá phần bạn làm, và người xem hỏi thì bạn khó trả lời.",
    "diagram": [
      {
        "label": "Chọn ba dự án khác nhau, có ghi chú thật",
        "arrow": true
      },
      {
        "label": "Mỗi dự án một đoạn: vấn đề, cách làm, kết quả",
        "arrow": true
      },
      {
        "label": "Nhờ hai người quen đọc thử và nói chỗ chưa rõ",
        "arrow": true
      },
      {
        "label": "Sửa theo phản hồi rồi mới đăng"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một bạn thiết kế đồ hoạ chọn ba dự án: một nhãn bánh, một poster sự kiện, một bộ ảnh giới thiệu quán cà phê. Mỗi dự án bạn viết một đoạn bốn năm câu từ ghi chú của mình. Một người bạn đọc và nói 'đoạn nhãn bánh mình không hiểu vì sao chọn màu đó'. Bạn thêm một câu giải thích và đoạn rõ hơn hẳn."
    },
    "quiz": [
      {
        "question": "Khi chọn ba dự án cho portfolio, tiêu chí nào hữu ích nhất?",
        "options": [
          "Khác nhau về loại việc và bạn có ghi chú thật để kể",
          "Ba dự án có ảnh đẹp nhất bất kể bạn nhớ gì về chúng vì trông chuyên nghiệp hơn hẳn",
          "Ba dự án gần nhất về thời gian để khách thấy mới nhất",
          "Ba dự án có tên khách nổi tiếng nhất trong danh sách của bạn"
        ],
        "correct": 0,
        "explanation": "Ba dự án khác nhau cho khách thấy phạm vi làm việc, còn ghi chú thật cho phép kể không bịa. Ảnh đẹp mà không nhớ gì thì kể sẽ gượng. Gần nhất về thời gian chưa chắc là tiêu biểu, và tên khách lớn dễ khiến bạn khoe phần bạn không làm."
      },
      {
        "question": "Mỗi đoạn kể dự án nên dài khoảng bao nhiêu?",
        "options": [
          "Vài câu ngắn: vấn đề, cách làm, kết quả nếu có bằng chứng",
          "Một trang đầy đủ để khách hiểu toàn bộ quá trình làm việc",
          "Một câu duy nhất thật gọn để khách không phải đọc lâu",
          "Càng dài càng tốt vì khách thích đọc nhiều chi tiết về bạn"
        ],
        "correct": 0,
        "explanation": "Bốn năm câu đủ cho khách hiểu bạn làm gì và nghĩ gì mà vẫn đọc nhanh. Một trang dài khiến khách bỏ qua, còn một câu duy nhất không đủ chỗ cho khung vấn đề, cách làm, kết quả. Nhiều chi tiết không có nghĩa là thuyết phục hơn."
      },
      {
        "question": "Vì sao nên nhờ hai người quen đọc thử trước khi đăng?",
        "options": [
          "Họ chỉ ra chỗ khó hiểu mà bạn không còn thấy vì quá quen",
          "Họ sẽ sửa câu chữ giúp bạn nên bạn không cần tự sửa",
          "Họ đảm bảo khách sẽ thích và đặt bạn làm việc ngay",
          "Họ thay được việc bạn hỏi khách xin phép đăng dự án"
        ],
        "correct": 0,
        "explanation": "Người đã làm dự án khó nhìn ra chỗ thiếu vì đầu đã biết hết. Người đọc thử cho biết chỗ nào họ lạc. Họ không thay bạn sửa, không đảm bảo gì về khách, và càng không thể thay việc xin phép khách cũ."
      },
      {
        "question": "Người đọc thử nói: 'đoạn 2 mình không hiểu bạn làm gì'. Bạn nên làm gì?",
        "options": [
          "Hỏi họ chỗ nào chưa rõ, rồi bổ sung từ ghi chú thật của bạn",
          "Giải thích cho họ hiểu bằng lời và giữ nguyên đoạn văn cho đỡ phải chờ đợi lâu",
          "Nhờ AI viết lại đoạn 2 dài và chi tiết hơn nhiều",
          "Bỏ dự án đó ra khỏi trang vì người đọc không hiểu"
        ],
        "correct": 0,
        "explanation": "Người đọc thử cho biết chỗ lạc, việc bạn cần là hiểu chính xác chỗ nào rồi bổ sung từ ghi chú thật. Giải thích bằng lời thì khách sau này không có bạn ngồi cạnh. AI viết dài hơn có thể thêm chi tiết bịa, còn bỏ cả dự án là phản ứng quá tay."
      },
      {
        "question": "Trước khi đăng trang portfolio, danh sách soát cuối nên có gì?",
        "options": [
          "Mỗi câu có nguồn, mỗi tên khách đã được đồng ý, mỗi số đã xác nhận",
          "Chỉ cần soát chính tả và cách trình bày đẹp mắt",
          "Chỉ cần AI đọc lại và báo không có lỗi nào",
          "Chỉ cần ba dự án đều có ảnh chất lượng thật cao"
        ],
        "correct": 0,
        "explanation": "Portfolio là lời cam kết về những gì bạn đã làm, nên nguồn, sự đồng ý và số liệu là ba thứ phải kiểm. Chính tả và ảnh đẹp quan trọng nhưng không thay được việc kiểm nội dung, và AI không biết nguồn thật của từng câu."
      }
    ],
    "keyTakeaways": [
      "Ba dự án khác nhau, mỗi dự án có ghi chú thật, hơn mười dự án một dòng.",
      "Mỗi đoạn vài câu: vấn đề, cách làm, kết quả nếu có chứng cứ.",
      "Nhờ hai người quen đọc thử để tìm chỗ chưa rõ.",
      "Soát cuối: nguồn, sự đồng ý, số liệu."
    ],
    "practicePrompt": {
      "question": "Bạn có ba đoạn kể, hai người bạn đọc và cả hai đều không hiểu đoạn 3. Nên làm gì tiếp?",
      "options": [
        "Hỏi cụ thể họ lạc ở đâu, rồi sửa đúng chỗ đó",
        "Xoá đoạn 3 và thay bằng một dự án bất kỳ khác",
        "Nhờ AI viết lại toàn bộ trang cho dễ hiểu hơn",
        "Giữ nguyên vì hai người đó có thể không phải khách mục tiêu"
      ],
      "correct": 0,
      "explanation": "Hai người cùng không hiểu một đoạn là tín hiệu rõ nhất. Việc cần là hỏi họ lạc ở đâu để sửa đúng chỗ. Thay dự án bừa bỏ mất ghi chú thật bạn có, AI viết lại toàn trang có thể thêm chi tiết bịa, và bỏ qua phản hồi vì họ 'không phải khách' là bỏ phí thông tin miễn phí."
    },
    "summary": {
      "keyIdea": "Ba dự án kể tốt, được người đọc thử, mạnh hơn nhiều dự án kể sơ.",
      "formula": "3 dự án + khung kể + 2 người đọc thử + soát nguồn = portfolio đáng tin.",
      "commonMistake": "Đăng thật nhiều dự án một dòng và không cho ai đọc thử.",
      "action": "Chọn ba dự án và viết ba đoạn nháp."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn ba dự án của bạn khác nhau về loại việc. Với mỗi dự án, dùng ghi chú thật để nhờ AI xếp thành đoạn bốn năm câu, rồi gạch mọi câu không có trong ghi chú. Gửi ba đoạn cho hai người quen đọc và hỏi 'chỗ nào bạn chưa hiểu?'",
      "secondary": "Ghi lại chỗ cả hai người cùng thấy chưa rõ để sửa trước."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Đây là bài ghép: bạn đã biết cách kể một dự án, xin đánh giá và gom số liệu. Giờ dựng một trang portfolio nhỏ gồm ba dự án, mỗi dự án một đoạn kể ngắn và kiểm được."
      },
      {
        "type": "feynman",
        "title": "Trang portfolio nhỏ đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới quầy trưng bày ở hội chợ: ba món tiêu biểu đặt gọn, mỗi món có tấm thẻ nhỏ ghi vài dòng. Khách dừng lại nếu thấy rõ. Trưng cả trăm món lộn xộn thì họ đi ngang qua.",
        "columns": [
          "Việc",
          "Quầy hội chợ",
          "Trang portfolio"
        ],
        "rows": [
          [
            "Chọn món",
            "Ba món tiêu biểu",
            "Ba dự án khác nhau"
          ],
          [
            "Thẻ nhỏ",
            "Vài dòng ghi chú",
            "Đoạn kể vấn đề, cách làm, kết quả"
          ],
          [
            "Hỏi thử",
            "Nhờ bạn bè xem quầy",
            "Hai người quen đọc thử"
          ],
          [
            "Bảo đảm",
            "Mọi ghi chú đều đúng",
            "Mọi câu có nguồn và được khách đồng ý"
          ]
        ],
        "oneLiner": "Ít mà rõ, thật và đã qua tay người đọc thử."
      },
      {
        "type": "heading",
        "text": "Vấn đề: nhiều dự án, ít chuyện"
      },
      {
        "type": "paragraph",
        "text": "Nhiều freelancer đăng đủ thứ mà mỗi thứ chỉ có tên và ảnh. Khách nhìn vào không biết bạn nghĩ gì. Chọn ba dự án khác nhau, mỗi dự án có ghi chú thật, rồi kể ngắn. Sau đó nhờ hai người quen đọc thử để tìm chỗ bạn quen mắt mà người khác thấy lạ."
      },
      {
        "type": "flow",
        "title": "Từ ba dự án tới trang portfolio",
        "steps": [
          {
            "label": "Chọn ba dự án khác nhau",
            "detail": "Khác loại việc hoặc khác kiểu khách. Mỗi dự án bạn phải có ghi chú thật và nhớ mình đã làm gì."
          },
          {
            "label": "Viết đoạn nháp từ ghi chú",
            "detail": "Nhờ AI xếp vào khung vấn đề, cách làm, kết quả, chỉ dùng thông tin bạn đưa."
          },
          {
            "label": "Soát nguồn",
            "detail": "Mỗi câu phải tìm được trong ghi chú. Số liệu phải có xác nhận của khách. Tên khách phải được đồng ý."
          },
          {
            "label": "Nhờ hai người quen đọc thử",
            "detail": "Hỏi họ: chỗ nào bạn chưa hiểu, bạn nghĩ tôi làm gì. Đừng hỏi 'hay không'."
          },
          {
            "label": "Sửa và đăng",
            "detail": "Sửa đúng chỗ họ lạc, rồi đăng kèm ảnh."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI viết một đoạn cho portfolio",
        "task": "Bạn có ghi chú về dự án poster sự kiện. Lắp prompt để AI viết đoạn kể ngắn mà không thêm gì.",
        "parts": [
          {
            "id": "material",
            "label": "Chất liệu đưa cho AI",
            "options": [
              {
                "text": "Poster sự kiện, viết cho thật hay.",
                "feedback": "Không có chất liệu thật, AI tự chế chuyện về buổi sự kiện."
              },
              {
                "text": "Ghi chú của tôi: ban tổ chức cần poster dễ đọc từ xa, tôi thử hai bố cục, họ chọn bố cục 2.",
                "good": true,
                "feedback": "Có chất liệu thật nên AI xếp đúng chuyện."
              }
            ]
          },
          {
            "id": "frame",
            "label": "Khung và độ dài",
            "options": [
              {
                "text": "Viết một bài dài, chi tiết, kể toàn bộ hành trình của dự án.",
                "feedback": "Bài dài đẩy AI thêm chi tiết cho đủ chữ, và người xem không đọc hết."
              },
              {
                "text": "Bốn câu: vấn đề, cách làm, kết quả nếu có trong ghi chú.",
                "good": true,
                "feedback": "Ngắn và có khung nên dễ kiểm từng câu."
              }
            ]
          },
          {
            "id": "limit",
            "label": "Điều cấm",
            "options": [
              {
                "text": "Thêm số liệu để thuyết phục hơn.",
                "feedback": "Đây là chỗ bịa số xuất hiện, và bạn khó biết được số nào là bịa."
              },
              {
                "text": "Không thêm sự kiện, số liệu hay tên nào ngoài ghi chú.",
                "good": true,
                "feedback": "Điều cấm rõ nên bản nháp chỉ chứa thứ bạn có."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "material",
              "frame",
              "limit"
            ],
            "text": "Ban tổ chức cần một tấm poster dễ đọc từ xa. Tôi thử hai bố cục khác nhau để họ so sánh. Họ chọn bố cục thứ hai. Kết quả cuối được in và treo tại địa điểm sự kiện.\n\n(Đúng chuyện thật; chỉ dòng 'in và treo' bạn cần kiểm nếu ghi chú chưa có.)"
          },
          {
            "requires": [
              "material"
            ],
            "text": "Poster giúp sự kiện thu hút hơn 500 khách tham dự và nhận nhiều lời khen từ ban tổ chức.\n\n(AI tự thêm số khách và lời khen.)"
          },
          {
            "text": "Poster sự kiện là dự án nổi bật, thể hiện phong cách sáng tạo và chuyên nghiệp của tôi trong nhiều năm làm nghề.\n\n(Chung chung, không có chuyện thật.)"
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Ba dự án kể rõ",
          "text": "Khách hiểu cách bạn nghĩ. Mỗi câu có nguồn nên khi hỏi bạn trả lời được."
        },
        "right": {
          "label": "Nhiều dự án một dòng",
          "text": "Khách chỉ thấy ảnh và tên. Không có gì phân biệt bạn với người khác."
        }
      },
      {
        "type": "callout",
        "label": "Người đọc thử",
        "text": "Đừng hỏi 'có hay không?' vì ai cũng lịch sự đáp 'hay'. Hỏi 'bạn nghĩ tôi làm gì trong dự án này?' và 'chỗ nào bạn phải đọc lại?'. Câu trả lời cho biết đoạn văn có rõ hay không."
      },
      {
        "type": "scenario",
        "title": "Trước khi đăng trang portfolio",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn có ba đoạn kể AI xếp giúp. Bạn còn nửa buổi trước khi gửi link cho khách mới.",
            "choices": [
              {
                "label": "Đăng luôn vì đọc lại thấy ổn",
                "next": "bad1"
              },
              {
                "label": "Gửi ba đoạn cho hai người quen đọc thử",
                "next": "s2"
              }
            ]
          },
          "bad1": {
            "text": "Khách mới hỏi về đoạn thứ hai và bạn nhận ra mình đã bỏ qua một bước quan trọng, đoạn đó có câu không có trong ghi chú.",
            "ending": "bad"
          },
          "s2": {
            "text": "Cả hai người đều nói đoạn thứ ba họ không hiểu bạn làm gì.",
            "choices": [
              {
                "label": "Hỏi họ lạc ở đâu, rồi bổ sung từ ghi chú thật",
                "next": "good"
              },
              {
                "label": "Nhờ AI viết lại đoạn 3 dài hơn cho dễ hiểu",
                "next": "bad2"
              }
            ]
          },
          "good": {
            "text": "Bạn thêm hai câu về việc bạn đã chọn gì và vì sao. Lần đọc sau cả hai đều hiểu.",
            "ending": "good"
          },
          "bad2": {
            "text": "Đoạn dài hơn nhưng có thêm chi tiết bạn chưa từng làm. Hai người đọc vẫn chưa rõ.",
            "ending": "bad"
          }
        }
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Chọn ba dự án khác nhau.",
          "Bước 2 - Viết đoạn nháp từ ghi chú, soát nguồn.",
          "Bước 3 - Nhờ hai người quen đọc thử.",
          "Bước 4 - Sửa đúng chỗ họ lạc, rồi đăng."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Ba dự án kể rõ, có nguồn và qua người đọc thử là đủ mạnh.",
          "Bài sau: xếp lịch tuần từ danh sách việc và hạn chót thật."
        ]
      }
    ]
  }
];
