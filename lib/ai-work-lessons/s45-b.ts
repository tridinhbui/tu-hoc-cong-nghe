import type { Lesson } from "../lesson-types";

// Chặng 45, bài 6-10. Giáo trình: scripts/curriculum/stage-45.json.
// Không dựa vào tính năng riêng của công cụ nào: chỉ dạy cách hỏi, kiểm nguồn và ghi nguồn.
export const S45_B_LESSONS: Lesson[] = [
  {
    "id": 2305,
    "slug": "nguon-goc-hay-nguon-tong-hop-phan-biet",
    "title": "Chặng 45, Bài 6: Nguồn gốc hay bài chép lại từ bài chép lại",
    "subtitle": "Năm trang nói giống nhau chưa chắc là năm bằng chứng: có khi chỉ là một tin được chuyền tay.",
    "duration": "8 phút",
    "difficulty": "Dễ",
    "emoji": "🔎",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Khi thấy cùng một con số ở nhiều trang, ta dễ yên tâm vì nghĩ nhiều người đã kiểm. Thực ra họ có thể cùng chép từ một chỗ, và nếu chỗ đó sai thì cả năm trang cùng sai. Biết lần ngược về gốc giúp bạn khỏi đưa một con số mượn vào báo cáo gửi sếp hay khách.",
    "openingQuestion": "Bạn tìm một con số và thấy nó xuất hiện y hệt ở năm trang web khác nhau. Điều gì cho bạn biết con số này đáng tin hơn một trang đơn lẻ?",
    "openingOptions": [
      "Chỉ khi ít nhất hai trang trong số đó tự đo hoặc tự khảo sát, không chép nhau",
      "Năm trang đều hiện ở trang đầu kết quả tìm kiếm của công cụ bạn dùng, nên coi như đã được kiểm",
      "Cả năm trang đều trình bày con số bằng cùng một cách viết và cùng đơn vị",
      "Trang nào có giao diện chuyên nghiệp và ít quảng cáo nhất thì đáng tin nhất"
    ],
    "correctOption": 0,
    "explanation": "Số trang lặp lại một con số không phải là số bằng chứng. Nếu cả năm trang cùng chép từ một báo cáo, bạn có đúng một nguồn được nhân lên năm lần, và lỗi của nó cũng nhân lên năm lần. Độ hiển thị trong kết quả tìm kiếm, cách viết giống nhau hay giao diện đẹp đều không cho biết ai là người đo. Thứ đáng đếm là số nguồn độc lập, tức những nơi tự thu thập số liệu.",
    "diagram": [
      {
        "label": "Thấy một con số ở nhiều trang",
        "arrow": true
      },
      {
        "label": "Mở từng trang, tìm câu 'theo', 'nguồn', 'dẫn từ'",
        "arrow": true
      },
      {
        "label": "Lần ngược tới nơi đầu tiên công bố số liệu",
        "arrow": true
      },
      {
        "label": "Đếm số nguồn gốc độc lập, không đếm số trang"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Một nhân viên kinh doanh thấy con số về quy mô thị trường ở năm trang. Mở từng trang, cả năm đều ghi 'theo một báo cáo' rồi dẫn về cùng một công ty tư vấn. Cô ghi 'một nguồn' vào bản chào giá, kèm tên báo cáo và năm công bố. Đây là tình huống giả định để minh hoạ cách đếm."
    },
    "quiz": [
      {
        "question": "Bạn thấy một con số ở bảy trang và cả bảy đều ghi 'theo báo cáo của cùng một hãng'. Bạn có bao nhiêu nguồn độc lập?",
        "options": [
          "Một nguồn, vì cả bảy trang đều dẫn về báo cáo của hãng đó",
          "Bảy nguồn, vì mỗi trang là một nơi công bố khác nhau",
          "Bảy nguồn trừ đi trang đầu tiên, vì trang đầu coi như bản gốc (7 - 1 = 6)",
          "Không nguồn nào, vì báo cáo của một hãng tư nhân thì không đáng kể"
        ],
        "correct": 0,
        "explanation": "Bảy trang cùng dẫn về một báo cáo nghĩa là chỉ có một nơi thực sự thu thập số liệu. Các trang còn lại là bản chép lại. Nếu đếm bảy là lấy số trang thay cho số bằng chứng. Bỏ trang đầu cũng không đổi gì, còn việc loại bỏ báo cáo chỉ vì hãng tư nhân là kết luận vội."
      },
      {
        "question": "Cách nhanh nhất để tìm gốc của một con số trên một trang tin là gì?",
        "options": [
          "Tìm câu dẫn như 'theo', 'nguồn' hoặc liên kết trong đoạn chứa con số đó",
          "Đọc phần bình luận của độc giả bên dưới bài để xem người ta bàn gì về số này",
          "Chép con số vào công cụ tìm kiếm và lấy kết quả đầu tiên xuất hiện làm gốc",
          "Xem bài đăng lúc nào, vì bài đăng sớm nhất luôn là bản gốc của con số"
        ],
        "correct": 0,
        "explanation": "Trang chép lại thường để dấu vết: một câu 'theo...', một chú thích nguồn hoặc liên kết. Bình luận độc giả không phải bằng chứng. Kết quả tìm kiếm đầu tiên chỉ là trang được xếp cao, còn bài sớm nhất vẫn có thể chép từ nơi khác."
      },
      {
        "question": "Hai bài báo cùng ghi 'tăng 12%', và cả hai đều dẫn một khảo sát nội bộ của một công ty. Kết luận hợp lý là gì?",
        "options": [
          "Đây là một nguồn, và nên ghi rõ đó là khảo sát do chính công ty thực hiện",
          "Đây là hai nguồn đồng thuận nên con số chắc chắn đúng và dùng được ngay mà khỏi hỏi thêm",
          "Con số sai, vì khảo sát nội bộ của công ty bao giờ cũng bị thổi phồng lên",
          "Đây là hai nguồn, nhưng chỉ tin được khi tổng hai mức tăng cộng lại khớp"
        ],
        "correct": 0,
        "explanation": "Hai bài cùng dẫn một khảo sát là một nguồn. Việc đồng thuận giữa hai bài chỉ phản ánh rằng họ cùng đọc một thứ. Khảo sát nội bộ không tự động sai, nhưng người đọc cần biết ai đo và vì sao họ đo. Phép cộng hai mức tăng chẳng kiểm được gì."
      },
      {
        "question": "Bạn tìm được một cơ quan thống kê tự công bố số liệu và một bài báo dẫn lại nó. Bạn nên dẫn nguồn nào vào báo cáo?",
        "options": [
          "Trang của cơ quan thống kê, vì đó là nơi đầu tiên công bố số liệu",
          "Bài báo, vì nó dễ đọc hơn và có phần giải thích dành cho người không chuyên",
          "Cả hai đều dẫn ngang hàng để báo cáo trông có nhiều nguồn tham khảo hơn",
          "Bài báo, vì báo chí đã kiểm tra lại số liệu của cơ quan trước khi đăng"
        ],
        "correct": 0,
        "explanation": "Luôn dẫn về nơi công bố đầu tiên để người đọc kiểm được số gốc, đơn vị và thời điểm. Bài báo có thể hữu ích để hiểu bối cảnh nhưng có thể làm tròn, bỏ chú thích hoặc hiểu sai. Kê thêm bản chép lại chỉ tạo cảm giác có nhiều nguồn và không được coi là đã kiểm."
      },
      {
        "question": "Khi lần ngược, bạn thấy mọi đường đều dẫn tới một trang chỉ ghi 'theo nguồn tin thân cận'. Nên ghi điều này vào báo cáo thế nào?",
        "options": [
          "Ghi con số kèm lưu ý rằng chưa tìm được nguồn gốc kiểm chứng được",
          "Bỏ lưu ý đi và ghi con số thẳng vì nó đã xuất hiện ở rất nhiều trang",
          "Ghi con số là chắc chắn, vì nguồn tin thân cận thường biết rõ nội bộ",
          "Xoá hẳn mọi nhắc tới con số, vì con số chưa kiểm chứng thì không bao giờ dùng được"
        ],
        "correct": 0,
        "explanation": "Con số chưa có gốc kiểm chứng vẫn có thể có ích như một dữ kiện tham khảo, miễn là bạn nói thật về độ chắc chắn của nó. Độ lan rộng không làm nó chắc hơn. Gọi nó là chắc chắn là nói quá, còn xoá hẳn thì có thể mất thông tin cần cho quyết định."
      }
    ],
    "keyTakeaways": [
      "Nhiều trang giống nhau chưa chắc là nhiều bằng chứng.",
      "Lần ngược theo câu 'theo', 'nguồn', liên kết để tìm nơi công bố đầu tiên.",
      "Đếm nguồn độc lập, không đếm số trang.",
      "Dẫn về nguồn gốc, không dẫn bản chép lại.",
      "Chưa tìm được gốc thì nói thẳng là chưa kiểm chứng được."
    ],
    "practicePrompt": {
      "question": "Bạn thấy số '35% doanh nghiệp nhỏ đã dùng công cụ này' ở ba trang. Trang A ghi 'theo khảo sát X', trang B ghi 'theo trang A', trang C ghi 'theo nhiều nguồn'. Việc nên làm đầu tiên là gì?",
      "options": [
        "Mở khảo sát X, tìm đúng con số 35% và đọc cách khảo sát được làm",
        "Dùng số liệu ở trang C, vì 'nhiều nguồn' nghĩa là đã được kiểm chéo",
        "Lấy trang B, vì trang này đã dẫn lại trang A nên tính là hai nguồn",
        "Đếm xem cụm '35%' xuất hiện ở bao nhiêu trang rồi lấy con số phổ biến nhất"
      ],
      "correct": 0,
      "explanation": "Trang B chỉ chép trang A, còn trang C không chỉ ra nguồn cụ thể, nên cả ba cùng quay về khảo sát X. Bước hợp lý là mở thẳng khảo sát đó để xem con số có thật ở đó không và khảo sát hỏi ai. Đếm số trang hay tin 'nhiều nguồn' là tin vào số lượng thay cho gốc."
    },
    "summary": {
      "keyIdea": "Số trang lặp lại một con số không phải là số bằng chứng.",
      "formula": "Lần ngược tới nơi công bố đầu tiên, rồi đếm số nơi tự thu thập số liệu.",
      "commonMistake": "Yên tâm vì thấy con số ở nhiều trang, trong khi tất cả cùng chép từ một chỗ.",
      "action": "Chọn một con số bạn định dùng tuần này và lần ngược nó tới trang đầu tiên công bố."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Lấy một con số trong tài liệu bạn sắp gửi đi (bản chào giá, báo cáo, bài thuyết trình). Tìm 3 trang nói con số đó, mở từng trang, ghi tên nơi mỗi trang dẫn về. Kết luận: bạn đếm được mấy nguồn độc lập, và nguồn gốc là ai.",
      "secondary": "Ghi nguồn gốc cùng năm công bố ngay cạnh con số trong tài liệu của bạn."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Thứ Ba, bạn thấy con số thị phần ở năm trang và thấy yên tâm: nhiều người nói vậy thì chắc đúng. Bài này dạy cách tự hỏi 'năm trang này có thật là năm người đo không?' trước khi đưa con số vào tài liệu."
      },
      {
        "type": "feynman",
        "title": "Nguồn gốc đơn giản hơn bạn nghĩ",
        "intro": "Hình dung một tin đồn trong công ty: sáng nghe ở phòng kế toán, trưa nghe ở phòng kinh doanh, chiều nghe ở kho. Bạn tưởng ba người xác nhận, nhưng hoá ra cả ba cùng nghe từ một người ở căng tin.",
        "columns": [
          "Thành phần",
          "Tin đồn trong công ty",
          "Con số trên mạng"
        ],
        "rows": [
          [
            "Người nói đầu tiên",
            "Người ở căng tin",
            "Nơi tự đo hoặc khảo sát (nguồn gốc)"
          ],
          [
            "Người chuyền lại",
            "Kế toán, kinh doanh, kho",
            "Các trang chép hoặc tóm tắt lại"
          ],
          [
            "Điều dễ nhầm",
            "Ba người kể nghĩa là ba lần xác nhận",
            "Nhiều trang nghĩa là nhiều bằng chứng"
          ],
          [
            "Cách kiểm",
            "Hỏi 'anh nghe ai kể?' cho tới người đầu tiên",
            "Mở trang, tìm câu 'theo' cho tới nơi công bố đầu tiên"
          ]
        ],
        "oneLiner": "Đếm người đã tự biết, không đếm người đã nghe lại."
      },
      {
        "type": "heading",
        "text": "Vấn đề: một nguồn nhân thành nhiều bản"
      },
      {
        "type": "paragraph",
        "text": "Trên mạng, một báo cáo được đăng ở một nơi rồi được tóm tắt, dịch và đăng lại nhiều lần. Mỗi bản sau mất dần chú thích và đôi khi làm tròn hay hiểu sai. Công cụ tìm kiếm có AI càng dễ gộp các bản này thành một câu tổng hợp nghe rất chắc chắn."
      },
      {
        "type": "heading",
        "text": "Hai thuật ngữ cần nhớ"
      },
      {
        "type": "list",
        "items": [
          "Nguồn gốc (nguồn sơ cấp): nơi tự đo, tự khảo sát hoặc tự ban hành, như cơ quan thống kê, báo cáo của chính công ty, văn bản gốc.",
          "Nguồn thứ cấp: nơi tóm tắt hay dẫn lại nguồn gốc, như bài báo, blog, video giải thích. Hữu ích để hiểu nhưng không phải bằng chứng."
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Dấu hiệu bản chép lại",
          "text": "Ghi 'theo nguồn tin', 'nhiều báo cáo cho thấy' mà không có tên. Số liệu không có năm hoặc đơn vị. Cùng một câu văn xuất hiện ở nhiều trang. Liên kết dẫn về một trang khác thay vì về báo cáo."
        },
        "right": {
          "label": "Dấu hiệu nơi công bố gốc",
          "text": "Có tên đơn vị thực hiện, năm, cách lấy mẫu hay phương pháp đo. Có bảng số hoặc tệp đính kèm. Trang ghi 'chúng tôi khảo sát' hay 'chúng tôi công bố'."
        }
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Soát đoạn ghi nguồn do AI viết",
        "task": "Bạn nhờ AI tóm tắt một số liệu, và có trong tay ghi chú thật: một báo cáo khảo sát 500 doanh nghiệp nhỏ, do một hiệp hội ngành phát hành, nói 'khoảng một phần ba' dùng công cụ thiết kế trực tuyến. Đánh dấu những đoạn AI tự thêm vào.",
        "segments": [
          {
            "text": "Một khảo sát 500 doanh nghiệp nhỏ do hiệp hội ngành thực hiện đã được đăng tải."
          },
          {
            "text": "Kết quả cho thấy 34,7% doanh nghiệp dùng công cụ thiết kế trực tuyến.",
            "error": "Báo cáo chỉ nói 'khoảng một phần ba'. Con số 34,7% là AI bịa thêm cho nghe chính xác."
          },
          {
            "text": "Khảo sát hỏi các doanh nghiệp nhỏ về công cụ họ đang dùng."
          },
          {
            "text": "Con số này được ba viện nghiên cứu độc lập xác nhận lại.",
            "error": "Ghi chú không hề nói có viện nào xác nhận. Đây là chi tiết bịa để tăng độ tin cậy."
          },
          {
            "text": "Báo cáo do hiệp hội ngành phát hành."
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Con số ở năm trang, bạn lần ngược thế nào",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Sếp cần một câu về quy mô thị trường cho bản chào giá ngày mai. Bạn thấy cùng một con số ở năm trang, câu chữ gần giống nhau.",
            "choices": [
              {
                "label": "Dán luôn con số và ghi 'nhiều nguồn cùng công bố'",
                "next": "bad1"
              },
              {
                "label": "Mở từng trang, tìm câu dẫn nguồn trong đoạn chứa con số",
                "next": "s2"
              }
            ]
          },
          "bad1": {
            "text": "Khách hàng hỏi con số lấy từ đâu. Bạn mở lại thì thấy cả năm trang cùng dẫn một báo cáo cũ hai năm. Cụm 'nhiều nguồn' trong bản chào giá khiến bạn mất uy tín.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bốn trang ghi 'theo báo cáo của hãng X'. Trang còn lại không ghi nguồn. Bạn tìm báo cáo của hãng X.",
            "choices": [
              {
                "label": "Mở báo cáo gốc, tìm đúng con số và ghi lại trang, năm, đơn vị đo",
                "next": "good"
              },
              {
                "label": "Dùng con số ở trang không ghi nguồn vì trang đó viết ngắn gọn dễ dùng nhất",
                "next": "bad2"
              }
            ]
          },
          "bad2": {
            "text": "Con số ở trang đó làm tròn khác và không có năm. Khi khách đối chiếu, hai con số không khớp và bạn không giải thích được.",
            "ending": "bad"
          },
          "good": {
            "text": "Bạn ghi 'theo báo cáo của hãng X, năm công bố, trang 14' và thêm một dòng: cả năm trang đều quay về cùng một nguồn. Khách hỏi lại, bạn mở đúng trang trong vài giây.",
            "ending": "good"
          }
        }
      },
      {
        "type": "flow",
        "title": "Lần ngược một con số về nguồn gốc",
        "steps": [
          {
            "label": "Tìm câu dẫn gần con số",
            "detail": "Đọc đoạn chứa con số và tìm các cụm 'theo', 'nguồn:', 'dẫn từ' hoặc một liên kết. Nếu không có gì, ghi lại: trang này chưa cho biết gốc."
          },
          {
            "label": "Đi theo liên kết hoặc tên báo cáo",
            "detail": "Mở trang được dẫn. Nếu nó lại dẫn tiếp, đi tiếp, và nhớ rằng mỗi lần dẫn lại là một bản chép chứ chưa phải gốc."
          },
          {
            "label": "Dừng ở nơi tự công bố số liệu",
            "detail": "Bạn đã tới gốc khi trang nói 'chúng tôi khảo sát', 'chúng tôi đo' hoặc là văn bản ban hành. Nếu đi vòng và quay về trang cũ, đó là tín hiệu không có gốc."
          },
          {
            "label": "Tìm đúng con số trong gốc",
            "detail": "Kiểm xem số, đơn vị, năm và đối tượng có giống như bản chép không. Bản chép hay làm tròn hoặc bỏ chú thích."
          },
          {
            "label": "Ghi nguồn và đếm lại",
            "detail": "Ghi tên đơn vị, năm và trang. Rồi đếm: bạn có bao nhiêu nguồn độc lập? Thường ít hơn số trang bạn đã thấy."
          }
        ]
      },
      {
        "type": "callout",
        "label": "Lưu ý",
        "text": "Đây không phải chuyện nghi ngờ mọi nguồn. Nhiều bài báo tốt dẫn lại số liệu đúng. Việc kiểm chỉ nhằm biết con số đứng trên một chân hay nhiều chân."
      },
      {
        "type": "closing",
        "lines": [
          "Đếm nguồn độc lập, không đếm số trang.",
          "Bài sau: khi nào dùng tìm kiếm thường, khi nào dùng AI."
        ]
      }
    ]
  },
  {
    "id": 2306,
    "slug": "ai-tim-kiem-hay-tim-kiem-thuong",
    "title": "Chặng 45, Bài 7: Khi nào dùng tìm kiếm thường, khi nào dùng AI",
    "subtitle": "Mỗi việc một dụng cụ: búa không vặn được ốc, và ngược lại.",
    "duration": "8 phút",
    "difficulty": "Dễ",
    "emoji": "🧭",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Nhiều người dùng AI cho mọi thứ, kể cả những việc một lượt tìm kiếm thường cho câu trả lời chính xác trong 10 giây. Cũng có người không dám dùng AI cho việc nó làm rất tốt. Chọn đúng dụng cụ tiết kiệm thời gian và tránh một số sai sót.",
    "openingQuestion": "Bạn cần số điện thoại chính xác của một cơ quan để gọi chiều nay. Cách tìm nào hợp lý nhất?",
    "openingOptions": [
      "Tìm kiếm thường rồi mở trang chính thức của cơ quan đó để lấy số",
      "Hỏi AI và chép nguyên con số nó viết ra vì nó trả lời nhanh hơn",
      "Hỏi AI ba lần, nếu ba lần ra cùng một số thì coi như số đã đúng",
      "Nhờ AI viết lại số cho dễ đọc rồi gọi thẳng luôn mà không cần kiểm lại"
    ],
    "correctOption": 0,
    "explanation": "Số điện thoại là dữ kiện có một đáp án đúng và nằm trên một trang chính thức, nên tìm kiếm thường dẫn bạn tới thẳng đó. AI có thể viết ra một số nghe hợp lý nhưng sai, và hỏi ba lần chỉ cho bạn cùng một đoán. Một cuộc gọi nhầm số không quá nghiêm trọng, nhưng nếu đó là số hay địa chỉ trên văn bản gửi khách thì khác.",
    "diagram": [
      {
        "label": "Việc cần làm: tìm một dữ kiện, so sánh, hay hiểu khái niệm?",
        "arrow": true
      },
      {
        "label": "Dữ kiện có một đáp án: tìm kiếm thường tới trang chính thức",
        "arrow": true
      },
      {
        "label": "So sánh hoặc khái niệm mới: AI giúp gom và giải thích",
        "arrow": true
      },
      {
        "label": "Mọi số và tên từ AI: mở nguồn kiểm lại"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Một nhân viên hành chính có ba việc buổi sáng: tìm số tổng đài một cơ quan, so sánh hai phần mềm chấm công và hiểu thuật ngữ 'đối soát'. Chị dùng tìm kiếm thường cho việc đầu, nhờ AI gom bảng so sánh rồi tự kiểm từng dòng cho việc hai, và nhờ AI giải thích bằng ví dụ đời thường cho việc ba."
    },
    "quiz": [
      {
        "question": "Việc nào trong số này hợp nhất để dùng tìm kiếm thường thay vì AI?",
        "options": [
          "Tìm địa chỉ trang đăng ký chính thức của một cơ quan",
          "Giải thích một khái niệm lạ bằng ví dụ quen thuộc cho người mới",
          "Gợi ý ba cách chia dàn ý cho một bản báo cáo dài hai mươi trang",
          "Gom ưu nhược điểm của hai phần mềm vào một bảng dễ đọc"
        ],
        "correct": 0,
        "explanation": "Địa chỉ trang chính thức là dữ kiện chỉ có một đáp án đúng, nên tìm kiếm thường dẫn tới thẳng trang đó. Ba việc kia là việc AI làm tốt: giải thích, gợi ý cấu trúc và gom thông tin, miễn là bạn kiểm lại các dữ kiện cụ thể."
      },
      {
        "question": "Khi nào nên dùng AI hơn tìm kiếm thường?",
        "options": [
          "Khi bạn cần hiểu một khái niệm lạ và muốn được giải thích từng bước",
          "Khi bạn cần một con số chính xác để đưa vào hoá đơn gửi khách hàng",
          "Khi bạn cần trích nguyên văn một điều khoản từ văn bản gốc để dán",
          "Khi bạn cần biết giá thị trường vừa thay đổi sáng nay của một mặt hàng"
        ],
        "correct": 0,
        "explanation": "AI giỏi diễn giải, đổi cách nói và đưa ví dụ, nên hợp với việc hiểu khái niệm. Con số cho hoá đơn, trích điều khoản và giá mới nhất đều cần nguồn chính xác hoặc mới, nên phải đi tới trang gốc."
      },
      {
        "question": "Vì sao không nên chép nguyên con số AI đưa ra cho một dữ kiện cần chính xác?",
        "options": [
          "Vì AI có thể viết ra con số nghe hợp lý nhưng chưa từng tồn tại",
          "Vì AI chỉ biết tiếng Anh nên số liệu tiếng Việt bao giờ cũng bị sai",
          "Vì AI bị cấm hoàn toàn khi trả lời câu hỏi có liên quan tới số",
          "Vì con số AI đưa ra luôn bị làm tròn tới hàng nghìn gần nhất"
        ],
        "correct": 0,
        "explanation": "AI sinh ra chữ nghe hợp lý, và một con số 'hợp lý' có thể là bịa. Nhận định rằng AI chỉ biết tiếng Anh hay bị cấm đều không đúng, và không có quy tắc làm tròn cố định nào như vậy."
      },
      {
        "question": "Bạn cần so sánh hai phần mềm để chọn mua. Cách dùng AI nào hợp lý?",
        "options": [
          "Nhờ AI lập bảng so sánh, rồi mở trang chính thức của từng phần mềm để kiểm từng ô",
          "Nhờ AI lập bảng so sánh rồi gửi thẳng cho sếp để sếp tự quyết định, vì AI đã tổng hợp từ nhiều nguồn",
          "Nhờ AI chọn luôn phần mềm tốt hơn rồi mua theo lựa chọn của nó",
          "Không dùng AI, chỉ đọc trang quảng cáo của từng hãng rồi tự so sánh"
        ],
        "correct": 0,
        "explanation": "AI giúp dựng khung và gom ý nhanh, nhưng các ô cụ thể như tính năng hay điều khoản phải kiểm ở trang chính thức. Gửi bảng chưa kiểm cho sếp đẩy rủi ro sang người khác. Giao cả quyết định cho AI là giao sai việc, còn chỉ đọc quảng cáo thì bỏ qua một công cụ hữu ích."
      },
      {
        "question": "Bạn hỏi AI một thuật ngữ và nhận được một giải thích nghe hợp lý. Bước tiếp theo nên là gì nếu định dùng thuật ngữ đó trong tài liệu gửi khách?",
        "options": [
          "Đối chiếu định nghĩa với một nguồn đáng tin như từ điển chuyên ngành hoặc tài liệu của ngành",
          "Dùng luôn, vì giải thích nghe rõ ràng nghĩa là AI đã hiểu đúng rồi",
          "Hỏi lại cùng câu đó một lần nữa, nếu AI đáp giống nhau thì chắc chắn đúng",
          "Thay thuật ngữ bằng một từ gần nghĩa mà bạn tự nghĩ ra cho dễ nghe"
        ],
        "correct": 0,
        "explanation": "Giải thích rõ ràng không đảm bảo đúng, và hỏi lại chỉ cho thêm một đoán tương tự. Tài liệu gửi khách cần thuật ngữ chính xác, nên hãy đối chiếu với nguồn của ngành. Đổi sang từ gần nghĩa tự nghĩ ra có thể làm sai nghĩa."
      }
    ],
    "keyTakeaways": [
      "Dữ kiện có một đáp án đúng: tìm kiếm thường, vào trang chính thức.",
      "So sánh, gom ý, hiểu khái niệm: AI làm nhanh, bạn kiểm các dữ kiện cụ thể.",
      "Mọi số, tên, ngày từ AI phải mở nguồn kiểm.",
      "Hỏi AI nhiều lần không phải là kiểm chứng.",
      "Chọn dụng cụ theo việc, không theo thói quen."
    ],
    "practicePrompt": {
      "question": "Chị Hà cần ba việc: (1) số điện thoại cục thuế địa phương, (2) so sánh hai phần mềm kế toán, (3) hiểu 'khấu hao' là gì. Cách chọn nào hợp lý?",
      "options": [
        "(1) tìm kiếm thường, (2) AI dựng bảng rồi kiểm nguồn, (3) AI giải thích bằng ví dụ",
        "Cả ba việc đều hỏi AI cho nhanh rồi lấy nguyên kết quả ghi vào báo cáo",
        "Cả ba việc đều tìm kiếm thường vì AI hay bịa nên không nên dùng cho việc nào",
        "(1) và (2) hỏi AI, (3) tìm kiếm thường vì khái niệm phải lấy từ nơi chính thức nhất"
      ],
      "correct": 0,
      "explanation": "Số điện thoại có một đáp án đúng nên đi thẳng trang chính thức. So sánh cần AI dựng khung nhưng dữ kiện phải kiểm. Khái niệm mới là việc AI giải thích tốt, đặc biệt khi yêu cầu ví dụ. Hỏi AI cho cả ba mà không kiểm là đặt số điện thoại vào tay một người hay đoán, còn bỏ AI hoàn toàn thì phí phần nó làm tốt."
    },
    "summary": {
      "keyIdea": "Dữ kiện có một đáp án đúng thì tìm kiếm thường; hiểu, so sánh, gom ý thì AI, rồi kiểm.",
      "formula": "Hỏi trước: việc này có một đáp án đúng nằm ở một trang chính thức không?",
      "commonMistake": "Dùng AI cho mọi thứ, hoặc không dùng AI cho thứ nó làm tốt.",
      "action": "Nhìn ba việc tra cứu của bạn ngày mai và ghi dụng cụ nào hợp cho từng việc."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn ba câu hỏi công việc có thật của tuần này (một dữ kiện, một so sánh, một khái niệm). Với mỗi câu, ghi dụng cụ bạn định dùng và lý do, rồi làm thử cả ba. Ghi lại dụng cụ nào tiết kiệm thời gian nhất cho việc nào.",
      "secondary": "Đếm xem bạn đã phải mở nguồn kiểm mấy lần trong số ba việc."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Sáng thứ Tư bạn có một danh sách nhỏ: một số điện thoại, một bảng so sánh và một thuật ngữ lạ. Ba việc, ba kiểu cần khác nhau. Bài này dạy cách chọn cách tìm cho từng việc."
      },
      {
        "type": "feynman",
        "title": "Chọn cách tìm đơn giản hơn bạn nghĩ",
        "intro": "Hình dung bạn có hai cách tìm đồ trong nhà. Một là mở thẳng ngăn kéo có nhãn, hai là hỏi một người bạn thông minh nhưng đôi khi nhớ nhầm. Đồ có chỗ cố định thì mở ngăn kéo; còn cần ý kiến thì hỏi bạn.",
        "columns": [
          "Thành phần",
          "Hai cách tìm đồ trong nhà",
          "Hai cách tìm thông tin"
        ],
        "rows": [
          [
            "Cách chắc chắn",
            "Mở ngăn kéo có nhãn",
            "Tìm kiếm thường tới trang chính thức"
          ],
          [
            "Cách linh hoạt",
            "Hỏi người bạn thông minh",
            "Hỏi AI giải thích và tổng hợp"
          ],
          [
            "Điểm yếu",
            "Bạn có thể nhớ nhầm",
            "AI có thể bịa dữ kiện nghe hợp lý"
          ],
          [
            "Khi nào dùng",
            "Đồ có chỗ cố định: mở ngăn kéo",
            "Dữ kiện có một đáp án: trang chính thức"
          ]
        ],
        "oneLiner": "Đồ có chỗ cố định thì mở ngăn kéo; cần hiểu hay so sánh thì hỏi AI và kiểm lại."
      },
      {
        "type": "heading",
        "text": "Ba loại việc tra cứu"
      },
      {
        "type": "list",
        "items": [
          "Dữ kiện: một số, một địa chỉ, một ngày, một tên. Có đúng một đáp án. Dùng tìm kiếm thường và vào trang chính thức.",
          "So sánh: hai phần mềm, hai nhà cung cấp. AI dựng khung nhanh, bạn kiểm từng ô ở trang gốc.",
          "Hiểu khái niệm: một thuật ngữ lạ. AI giải thích bằng ví dụ, rồi bạn đối chiếu với nguồn của ngành nếu sẽ dùng lại."
        ]
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI giải thích một khái niệm lạ",
        "task": "Bạn là nhân viên hành chính, sếp nhắc 'đối soát công nợ' và bạn chưa hiểu. Lắp prompt để AI giải thích cho người chưa từng làm kế toán.",
        "parts": [
          {
            "id": "role",
            "label": "Bạn là ai",
            "options": [
              {
                "text": "Giải thích thuật ngữ này.",
                "feedback": "AI không biết bạn biết gì, nên có thể trả lời bằng thuật ngữ chuyên môn khác."
              },
              {
                "text": "Tôi làm hành chính, chưa học kế toán. Sếp nhắc 'đối soát công nợ' trong cuộc họp và tôi chưa hiểu.",
                "good": true,
                "feedback": "AI biết trình độ và hoàn cảnh của bạn nên có thể điều chỉnh mức giải thích."
              }
            ]
          },
          {
            "id": "task",
            "label": "Bạn muốn gì",
            "options": [
              {
                "text": "Giải thích bằng một ví dụ đời thường có hai công ty, rồi nói tôi cần kiểm điều gì khi được giao việc này.",
                "good": true,
                "feedback": "Có ví dụ và có việc tiếp theo, nên bạn dùng được ngay."
              },
              {
                "text": "Nói hết mọi thứ về đối soát công nợ.",
                "feedback": "Yêu cầu quá rộng, AI sẽ trả lời dài và chung chung."
              }
            ]
          },
          {
            "id": "limit",
            "label": "Giới hạn",
            "options": [
              {
                "text": "Càng chi tiết càng tốt.",
                "feedback": "Không có giới hạn nên AI có thể viết rất dài và thêm chi tiết không cần thiết."
              },
              {
                "text": "Dưới 150 chữ, không dùng thuật ngữ khác mà không giải thích, và nói rõ chỗ nào tôi nên hỏi lại kế toán trưởng.",
                "good": true,
                "feedback": "Có giới hạn độ dài và biết lúc nào cần hỏi người có chuyên môn."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "role",
              "task",
              "limit"
            ],
            "text": "Đối soát công nợ giống việc hai người bạn cùng ghi sổ chi tiêu chung rồi ngồi đối chiếu xem sổ hai bên có khớp không. Ví dụ: công ty A bán hàng cho công ty B và ghi 'B còn nợ 10 triệu', còn B ghi 'còn nợ 8 triệu'. Hai bên cần tìm ra khoản chênh 2 triệu nằm ở đâu. Khi được giao, bạn hỏi kế toán trưởng: đối soát với ai, tới ngày nào, theo mẫu nào."
          },
          {
            "requires": [
              "role"
            ],
            "text": "Đối soát công nợ là việc so sánh sổ sách của hai bên để đảm bảo số tiền còn nợ khớp nhau. Đây là khái niệm quan trọng trong kế toán doanh nghiệp, bao gồm nhiều bước và quy trình khác nhau...\n(Đúng hướng nhưng chung chung, không có ví dụ và không nói bạn nên làm gì.)"
          },
          {
            "text": "Đối soát công nợ là quy trình bắt buộc theo quy định và phải thực hiện vào ngày cuối mỗi quý với mọi khách hàng...\n(Vì không có bối cảnh nên AI tự thêm quy định và thời hạn mà nó không chắc.)"
          }
        ]
      },
      {
        "type": "callout",
        "label": "Nguyên tắc",
        "text": "Khi AI giải thích một khái niệm mà bạn sẽ dùng trong tài liệu gửi ra ngoài, hãy đối chiếu với một nguồn của ngành. Giải thích nghe rõ không có nghĩa là đúng."
      },
      {
        "type": "scenario",
        "title": "Ba việc buổi sáng, chọn cách tìm nào",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Sếp nhờ bạn tìm địa chỉ trang đăng ký của một cơ quan để gửi cho khách trước trưa.",
            "choices": [
              {
                "label": "Hỏi AI địa chỉ rồi gửi ngay cho khách",
                "next": "bad1"
              },
              {
                "label": "Tìm kiếm thường, mở trang chính thức và kiểm địa chỉ trang",
                "next": "s2"
              }
            ]
          },
          "bad1": {
            "text": "AI đưa một địa chỉ nghe rất hợp lý nhưng không tồn tại. Khách bấm vào và thấy trang lỗi, rồi gọi phàn nàn.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bạn gửi đúng địa chỉ. Sếp nhờ tiếp: so sánh hai phần mềm chấm công cho công ty.",
            "choices": [
              {
                "label": "Nhờ AI dựng bảng so sánh, rồi mở trang chính thức kiểm từng ô",
                "next": "good"
              },
              {
                "label": "Nhờ AI chọn luôn phần mềm tốt hơn rồi báo sếp mua",
                "next": "bad2"
              }
            ]
          },
          "bad2": {
            "text": "AI chọn một phần mềm dựa trên thông tin chung. Khi triển khai, bạn phát hiện nó thiếu tính năng công ty cần, vì bạn chưa hề kiểm.",
            "ending": "bad"
          },
          "good": {
            "text": "Bảng so sánh dựng xong trong vài phút. Bạn kiểm hai ô và sửa một chỗ AI ghi sai. Sếp nhận bảng có dẫn nguồn cho từng ô.",
            "ending": "good"
          }
        }
      },
      {
        "type": "flow",
        "title": "Chọn cách tìm cho một việc",
        "steps": [
          {
            "label": "Hỏi: có một đáp án đúng không",
            "detail": "Số điện thoại, ngày, tên, địa chỉ là dữ kiện có một đáp án. Nếu có, đi tìm kiếm thường."
          },
          {
            "label": "Đi thẳng trang chính thức",
            "detail": "Tìm kiếm thường, bỏ qua trang chép lại, mở trang của đơn vị sở hữu thông tin."
          },
          {
            "label": "Nếu cần hiểu hoặc so sánh, nhờ AI",
            "detail": "Đưa bối cảnh, nói rõ bạn muốn gì và dài bao nhiêu. AI giỏi dựng khung và giải thích."
          },
          {
            "label": "Kiểm mọi dữ kiện cụ thể",
            "detail": "Số, tên, ngày từ AI đều mở nguồn kiểm. Hỏi AI lại không phải là kiểm."
          },
          {
            "label": "Ghi lại nguồn",
            "detail": "Dán nguồn cạnh thông tin trong tài liệu của bạn để lần sau mở lại trong vài giây."
          }
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Dữ kiện thì tìm kiếm thường; hiểu và so sánh thì AI, rồi kiểm.",
          "Bài sau: con số này của năm nào."
        ]
      }
    ]
  },
  {
    "id": 2307,
    "slug": "tin-cu-hay-tin-moi-kiem-ngay-thang",
    "title": "Chặng 45, Bài 8: Con số này của năm nào",
    "subtitle": "Một con số đúng của mấy năm trước có thể là con số sai của hôm nay.",
    "duration": "8 phút",
    "difficulty": "Dễ",
    "emoji": "📅",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Bạn thường không gặp số sai, mà gặp số đúng của thời điểm khác. Đưa nó vào bản chào giá hay báo cáo thì người đọc hiểu đó là tình hình hiện tại. Một phút kiểm ngày tháng đáng hơn nhiều so với việc sửa sai sau khi đã gửi.",
    "openingQuestion": "Bạn định đưa một con số về quy mô thị trường vào bản chào giá. Trang nguồn không ghi năm đăng. Bạn nên làm gì?",
    "openingOptions": [
      "Tìm năm công bố ở nguồn gốc, và nếu không thấy thì không đưa số đó vào",
      "Dùng luôn vì con số xuất hiện ở trang đầu kết quả tìm kiếm",
      "Ghi 'theo thị trường hiện nay' để người đọc hiểu đó là số mới",
      "Hỏi AI xem con số có còn đúng không rồi làm theo câu trả lời"
    ],
    "correctOption": 0,
    "explanation": "Con số không có năm thì không biết là của thời điểm nào, nên không thể xem là tình hình hiện tại. Trang hiện cao trong kết quả tìm kiếm không có nghĩa là số mới. Ghi 'hiện nay' là gắn thêm một khẳng định bạn chưa kiểm, còn hỏi AI chỉ cho một câu trả lời nghe hợp lý mà không có nguồn. Cách an toàn là tìm năm công bố, và nếu không có thì dùng nguồn khác.",
    "diagram": [
      {
        "label": "Số liệu bạn muốn dùng",
        "arrow": true
      },
      {
        "label": "Tìm ngày đăng và ngày cập nhật ở nguồn gốc",
        "arrow": true
      },
      {
        "label": "Nhờ AI chỉ ra số liệu nào có thể đã cũ",
        "arrow": true
      },
      {
        "label": "Ghi 'theo nguồn X, năm Y' cạnh con số"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Một nhân viên lập bản chào giá dùng số liệu tăng trưởng thị trường từ một bài đăng ba năm trước, vì bài hiện cao trong kết quả tìm kiếm. Khách hàng đối chiếu thì thấy số mới khác nhiều. Đây là tình huống giả định để minh hoạ việc thiếu kiểm ngày."
    },
    "quiz": [
      {
        "question": "Trang nguồn ghi 'đăng ngày 3/2/2021' nhưng không ghi ngày cập nhật. Bạn nên coi số liệu trong đó là của thời điểm nào?",
        "options": [
          "Không muộn hơn 2021, nên cần tìm số mới hơn nếu cần tình hình hiện tại",
          "Của hôm nay, vì trang vẫn còn mở được và hiện trong kết quả tìm kiếm",
          "Của hôm nay, nếu tên trang có chữ 'cập nhật' ở đầu tiêu đề bài",
          "Của 2022, vì số liệu thường được đăng chậm hơn thực tế một năm"
        ],
        "correct": 0,
        "explanation": "Ngày đăng cho biết số liệu không thể mới hơn thời điểm đó. Trang vẫn mở được hay có chữ 'cập nhật' trong tiêu đề không chứng minh nội dung mới. Cộng thêm một năm cho độ chậm là đoán, không có căn cứ."
      },
      {
        "question": "Bạn cần số liệu mới cho bản chào giá. Cách nào giảm rủi ro dùng số cũ nhất?",
        "options": [
          "Ghi rõ 'theo nguồn X, năm Y' cạnh con số và kiểm năm đó còn phù hợp",
          "Bỏ hết năm khỏi tài liệu để con số trông gọn hơn và dễ đọc hơn",
          "Dùng con số ở bài có nhiều lượt chia sẻ nhất vì nhiều người đã đọc",
          "Hỏi AI đưa con số mới nhất rồi dán vào bản chào giá ngay"
        ],
        "correct": 0,
        "explanation": "Ghi nguồn và năm cạnh con số giúp người đọc, và chính bạn, biết số đó thuộc thời điểm nào. Bỏ năm đi làm người đọc hiểu nhầm. Lượt chia sẻ không phải độ mới, và AI có thể trả lời bằng số đã cũ hoặc bịa."
      },
      {
        "question": "Bạn hỏi AI một con số về mức giá trung bình, nó đáp ngay một số kèm câu 'theo dữ liệu mới nhất'. Nên xử lý thế nào?",
        "options": [
          "Hỏi tiếp nó dựa vào nguồn nào và năm nào, rồi mở nguồn đó để kiểm",
          "Tin câu 'mới nhất' vì AI luôn biết các dữ liệu cập nhật của hôm nay",
          "Hỏi lại cùng một câu để xem AI có đổi con số hay không",
          "Bỏ qua câu đó và dùng con số vì nó đã kèm cụm từ 'theo dữ liệu'"
        ],
        "correct": 0,
        "explanation": "Cụm 'mới nhất' là lời AI nói, không phải bằng chứng. Mô hình có thể học từ dữ liệu tới một thời điểm cũ hoặc bịa cụm này. Hãy hỏi nguồn và năm cụ thể, rồi mở nguồn. Hỏi lại cùng câu chỉ cho thêm một câu trả lời tự tin."
      },
      {
        "question": "Một số liệu có năm 2019 và mức tăng trưởng hằng năm của thị trường khoảng 8% (số minh hoạ). Sau 4 năm, sai lệch tối thiểu so với số hiện nay là bao nhiêu?",
        "options": [
          "Khoảng 36%, vì 1,08 mũ 4 xấp xỉ 1,36",
          "32%, vì 8% nhân với 4 năm cho mức tăng cộng dồn đơn giản",
          "8%, vì mức tăng hằng năm chính là sai lệch của số liệu cũ",
          "4%, vì chia đôi mức tăng hằng năm cho nửa kỳ cho mức sai lệch"
        ],
        "correct": 0,
        "explanation": "Với tăng trưởng 8% mỗi năm, sau 4 năm gốc tăng thành 1,08 lần 4, tức khoảng 1,36, nghĩa là chênh khoảng 36%. Nhân đơn giản 8% x 4 = 32% bỏ qua lãi gộp. Hai đáp án kia không dựa trên phép tính nào. Số liệu là minh hoạ."
      },
      {
        "question": "Nguồn là một báo cáo thường niên, tiêu đề ghi năm 2022, nhưng phần số liệu chú thích 'dữ liệu tới cuối 2020'. Nên ghi số liệu thuộc năm nào?",
        "options": [
          "2020, vì đó là thời điểm số liệu thực sự được đo",
          "2022, vì đó là năm ghi trên tiêu đề báo cáo và dễ nhớ nhất",
          "2021, vì lấy giữa hai năm để phản ánh một mức trung bình",
          "Không cần ghi năm vì báo cáo đã có tiêu đề rõ ràng rồi"
        ],
        "correct": 0,
        "explanation": "Năm trên bìa là năm phát hành, còn thời điểm đo nằm ở chú thích. Dùng năm đo mới đúng khi đánh giá độ cũ của con số. Lấy số giữa hai năm là tự chế, và bỏ năm đi làm người đọc không biết số đó cũ tới đâu."
      }
    ],
    "keyTakeaways": [
      "Số đúng của năm cũ có thể là số sai của hôm nay.",
      "Tìm cả ngày đăng, ngày cập nhật và thời điểm số liệu được đo.",
      "Ghi 'theo nguồn X, năm Y' cạnh con số.",
      "Hỏi AI nguồn và năm, rồi mở nguồn kiểm.",
      "Không có năm thì không nên dùng như số hiện nay."
    ],
    "practicePrompt": {
      "question": "Bạn thấy hai con số cho cùng một chỉ tiêu: A từ bài đăng 2020, B từ báo cáo dữ liệu tới cuối năm ngoái. Bản chào giá cần tình hình hiện tại. Nên làm gì?",
      "options": [
        "Dùng B, ghi rõ nguồn và năm, và nói A là số cũ hơn chỉ để tham khảo",
        "Dùng A vì nó xuất hiện nhiều hơn trong kết quả tìm kiếm của bạn nên chắc đúng",
        "Lấy trung bình của A và B cho một con số nằm giữa hai mốc",
        "Dùng cả A và B như hai nguồn đồng thuận để tăng độ tin cậy"
      ],
      "correct": 0,
      "explanation": "B mới hơn nên hợp với bản chào giá về tình hình hiện tại, và ghi nguồn cùng năm cho người đọc biết. Độ phổ biến trong kết quả tìm kiếm không phải độ mới. Lấy trung bình hai số của hai thời điểm tạo ra một con số không thuộc thời điểm nào, còn coi chúng là hai nguồn đồng thuận bỏ qua việc chúng khác năm."
    },
    "summary": {
      "keyIdea": "Mỗi con số thuộc về một thời điểm; hãy biết thời điểm đó trước khi dùng.",
      "formula": "Ngày đăng, ngày cập nhật, thời điểm đo, rồi ghi 'theo nguồn X, năm Y'.",
      "commonMistake": "Dùng con số cũ như tình hình hiện tại vì nó hiện cao trong kết quả tìm kiếm.",
      "action": "Mở tài liệu bạn sắp gửi và ghi năm cạnh mỗi con số chưa có năm."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Mở một báo cáo hoặc bản chào giá của bạn, chọn 5 con số. Với mỗi số, ghi nguồn, năm đăng và năm đo. Đánh dấu số nào cũ hơn hai năm và tìm thử số mới hơn hoặc thêm chú thích năm ngay cạnh số.",
      "secondary": "Nhờ AI liệt kê số liệu nào trong đoạn văn của bạn có thể đã cũ, rồi tự kiểm chứng."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bạn tìm được con số hoàn hảo cho bản chào giá ngày mai. Nhưng nó của năm nào? Bài này dạy cách kiểm ngày tháng trong một phút, vì số đúng của năm cũ vẫn có thể làm bản chào giá của bạn sai."
      },
      {
        "type": "feynman",
        "title": "Độ mới của số liệu đơn giản hơn bạn nghĩ",
        "intro": "Hình dung bạn nhìn một bảng giá dán ở cửa hàng. Nếu tờ giấy đã ngả vàng, bạn sẽ hỏi lại giá bây giờ. Con số trên mạng cũng có tờ giấy ngả vàng, chỉ là màu không hiện ra.",
        "columns": [
          "Thành phần",
          "Bảng giá ở cửa hàng",
          "Con số trên mạng"
        ],
        "rows": [
          [
            "Dấu hiệu tuổi",
            "Giấy ngả vàng, mực nhạt",
            "Ngày đăng, ngày cập nhật, năm đo"
          ],
          [
            "Điều dễ nhầm",
            "Giá vẫn in rõ nên tưởng còn đúng",
            "Số vẫn hiện trong kết quả nên tưởng còn mới"
          ],
          [
            "Cách kiểm",
            "Hỏi người bán giá hôm nay",
            "Mở nguồn gốc, tìm năm và đối chiếu số mới"
          ],
          [
            "Cách ghi lại",
            "Ghi 'giá ngày ...'",
            "Ghi 'theo nguồn X, năm Y'"
          ]
        ],
        "oneLiner": "Mỗi con số có một ngày sinh; biết ngày đó trước khi dùng."
      },
      {
        "type": "heading",
        "text": "Ba ngày cần phân biệt"
      },
      {
        "type": "list",
        "items": [
          "Ngày đăng: lúc trang được đưa lên mạng.",
          "Ngày cập nhật: lúc trang được sửa. Có khi chỉ sửa một dòng chứ số liệu không đổi.",
          "Thời điểm đo: lúc số liệu thực sự được thu thập. Thường nằm ở chú thích, và đây mới là tuổi thật của con số."
        ]
      },
      {
        "type": "chart",
        "title": "Số liệu cũ lệch bao nhiêu so với hiện nay",
        "caption": "Số liệu minh hoạ: giả sử thị trường tăng đều một tỷ lệ mỗi năm. Kéo thanh trượt để xem số liệu cũ x năm lệch bao nhiêu phần trăm so với số hiện nay. Thị trường thật không tăng đều như vậy; hình chỉ cho thấy độ lệch tích luỹ theo thời gian.",
        "kind": "line",
        "xLabel": "Số năm nguồn đã cũ",
        "yLabel": "Độ lệch so với số hiện nay (%)",
        "x": {
          "from": 0,
          "to": 6,
          "step": 1
        },
        "params": [
          {
            "id": "rate",
            "label": "Tốc độ thay đổi mỗi năm",
            "min": 0,
            "max": 20,
            "step": 1,
            "value": 8,
            "unit": "%"
          }
        ],
        "series": [
          {
            "label": "Độ lệch cộng dồn",
            "expr": "100 * ((1 + rate / 100) ^ x - 1)"
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Dấu hiệu số liệu có thể đã cũ",
          "text": "Không có năm. Năm đăng xa hơn hai hay ba năm so với hiện nay. Nói về giá, tỷ lệ, thị phần hay quy định, những thứ hay đổi. Chú thích thời điểm đo cũ hơn ngày đăng khá xa."
        },
        "right": {
          "label": "Dấu hiệu số liệu còn dùng được",
          "text": "Ghi rõ năm đo và đơn vị. Nói về thứ ít đổi như một định nghĩa hay một sự kiện đã xảy ra. Có nguồn gốc mở được, và bạn đã đối chiếu thấy không có số mới hơn."
        }
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Soát đoạn số liệu bản chào giá",
        "task": "Bạn có ghi chú thật: báo cáo thị trường do hiệp hội ngành phát hành năm 2021, số liệu đo cuối 2020, nói quy mô 'khoảng 50 nghìn tỷ đồng', không nhắc tỷ lệ tăng. Nhờ AI viết đoạn cho bản chào giá 2024. Đánh dấu chỗ AI thêm hoặc làm lệch.",
        "segments": [
          {
            "text": "Thị trường này có quy mô khoảng 50 nghìn tỷ đồng theo báo cáo của hiệp hội ngành."
          },
          {
            "text": "Hiện nay quy mô đó vẫn giữ nguyên, sau ba năm không biến động.",
            "error": "Ghi chú nói số đo cuối 2020 và không nói gì về hiện nay. AI biến số cũ thành khẳng định về hiện tại."
          },
          {
            "text": "Báo cáo phát hành năm 2021 với số liệu đo đến cuối 2020."
          },
          {
            "text": "Mức tăng trưởng hằng năm của thị trường là 12%.",
            "error": "Báo cáo không nhắc tỷ lệ tăng. Con số 12% là AI bịa."
          },
          {
            "text": "Khách hàng nên cân nhắc thêm các số liệu cập nhật hơn trước khi ra quyết định."
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Bản chào giá ngày mai",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn có một con số đẹp cho bản chào giá, đăng năm 2020, và không tìm được số mới hơn sau 10 phút.",
            "choices": [
              {
                "label": "Dùng con số và ghi 'tình hình thị trường hiện nay'",
                "next": "bad1"
              },
              {
                "label": "Dùng con số, ghi 'theo nguồn X, năm 2020' và nói rõ đây có thể đã thay đổi",
                "next": "good"
              },
              {
                "label": "Đưa con số vào mà không ghi nguồn hay năm để bản chào giá gọn",
                "next": "bad2"
              }
            ]
          },
          "bad1": {
            "text": "Khách hàng tìm được số mới cho thấy mức chênh rất lớn và hỏi vì sao bản chào giá ghi 'hiện nay'. Bạn không có cách nào giải thích.",
            "ending": "bad"
          },
          "bad2": {
            "text": "Sếp hỏi số từ đâu và năm nào, bạn phải lục lại lịch sử tìm kiếm để nhớ. Con số không nguồn bị gạch khỏi bản chào giá phút chót.",
            "ending": "bad"
          },
          "good": {
            "text": "Bản chào giá ghi rõ nguồn và năm. Khách hàng hỏi lại, bạn trả lời ngay, và còn gợi ý hai bên cùng cập nhật số liệu khi có.",
            "ending": "good"
          }
        }
      },
      {
        "type": "flow",
        "title": "Kiểm độ mới của một con số",
        "steps": [
          {
            "label": "Tìm ngày đăng",
            "detail": "Thường nằm dưới tiêu đề hoặc cuối bài. Nếu không có, coi như chưa biết độ mới."
          },
          {
            "label": "Tìm ngày cập nhật",
            "detail": "Nếu có, xem trang sửa gì. Cập nhật một dòng không có nghĩa số liệu được làm mới."
          },
          {
            "label": "Tìm thời điểm đo",
            "detail": "Đọc chú thích: 'dữ liệu tới', 'khảo sát năm'. Đó là tuổi thật của con số."
          },
          {
            "label": "Nhờ AI chỉ ra số có thể đã cũ",
            "detail": "Dán đoạn văn và hỏi số liệu nào có thể đã thay đổi theo thời gian. AI gợi ý chỗ cần kiểm, không phải để trả lời thay bạn."
          },
          {
            "label": "Ghi nguồn và năm cạnh số",
            "detail": "Viết 'theo nguồn X, năm Y' ngay cạnh con số để người đọc tự đánh giá."
          }
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Mỗi con số có một ngày sinh; ghi nó cạnh con số.",
          "Bài sau: bắt AI nói chỗ nó chưa chắc."
        ]
      }
    ]
  },
  {
    "id": 2308,
    "slug": "hoi-them-de-bat-ai-neu-cho-chua-chac",
    "title": "Chặng 45, Bài 9: Bắt AI nói chỗ nó chưa chắc",
    "subtitle": "Thêm một dòng vào câu hỏi để AI tách điều có nguồn khỏi điều đoán.",
    "duration": "8 phút",
    "difficulty": "Dễ",
    "emoji": "🎚️",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Mặc định AI trả lời một giọng đều đều, phần có nguồn và phần đoán nghe như nhau. Nếu bạn không yêu cầu, bạn không biết chỗ nào nên kiểm trước. Một dòng thêm vào câu hỏi biến câu trả lời thành bản đồ những chỗ cần kiểm.",
    "openingQuestion": "AI trả lời bạn một đoạn dài, giọng chắc chắn từ đầu tới cuối. Cách nào giúp bạn biết chỗ nào cần kiểm trước?",
    "openingOptions": [
      "Yêu cầu AI tách rõ điều có nguồn, điều suy đoán và điều không tìm thấy",
      "Hỏi lại cùng câu đó nhiều lần và xem lần sau AI có trả lời giống lần đầu không",
      "Đọc kỹ những câu dài nhất vì đó thường là chỗ AI bịa nhiều nhất",
      "Tin những câu có con số cụ thể và kiểm những câu không có số"
    ],
    "correctOption": 0,
    "explanation": "Tách ba nhóm (có nguồn, suy đoán, không tìm thấy) cho bạn biết ngay phần nào đã có dấu vết và phần nào là AI tự nối. Hỏi lại cho cùng một đoán, độ dài câu không liên quan tới độ đúng, và con số cụ thể là chỗ AI dễ bịa để nghe chính xác nên kiểm trước chứ không phải tin. Yêu cầu này không biến AI thành không thể sai, nhưng cho bạn một bản đồ kiểm.",
    "diagram": [
      {
        "label": "Hỏi như bình thường: giọng đều, khó thấy chỗ yếu",
        "arrow": true
      },
      {
        "label": "Thêm yêu cầu tách: có nguồn, suy đoán, không tìm thấy",
        "arrow": true
      },
      {
        "label": "So hai câu trả lời cạnh nhau",
        "arrow": true
      },
      {
        "label": "Kiểm trước mục suy đoán và mục có nguồn quan trọng"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Một nhân viên nghiên cứu thị trường hỏi AI về đối thủ và nhận đoạn văn liền mạch. Khi thêm dòng 'tách rõ điều có nguồn, điều suy đoán, điều không tìm thấy', câu trả lời hiện ra hai dòng có nguồn, ba dòng suy đoán và một mục 'không tìm thấy giá'. Cô kiểm ngay mục có nguồn quan trọng và bỏ hẳn các dòng suy đoán khỏi báo cáo."
    },
    "quiz": [
      {
        "question": "Dòng nào thêm vào câu hỏi giúp AI lộ ra chỗ nó chưa chắc?",
        "options": [
          "Hãy tách rõ điều có nguồn, điều bạn suy đoán và điều bạn không tìm thấy",
          "Hãy trả lời thật chắc chắn và không được nói là bạn không biết gì cả",
          "Hãy trả lời ngắn nhất có thể để tôi khỏi phải đọc những chi tiết thừa trong câu trả lời",
          "Hãy trả lời như một chuyên gia có nhiều năm kinh nghiệm trong ngành này"
        ],
        "correct": 0,
        "explanation": "Yêu cầu tách ba nhóm khiến AI phải đánh dấu chỗ nào đã có dấu vết nguồn và chỗ nào là tự nối. Bắt trả lời chắc chắn đẩy AI sang bịa, còn ngắn nhất hay 'như chuyên gia' không hỏi gì về độ chắc chắn."
      },
      {
        "question": "AI ghi 'Không tìm thấy thông tin về giá của đối thủ'. Đây là tín hiệu thế nào?",
        "options": [
          "Tốt: AI nói thật chỗ trống thay vì bịa một con số cho đủ",
          "Xấu: AI trả lời thiếu nên lần sau phải đổi sang một công cụ khác ngay",
          "Xấu: AI lười nên phải hỏi lại cho tới khi nó đưa ra một con số",
          "Trung tính: AI chỉ nói vậy khi không muốn trả lời câu hỏi của bạn"
        ],
        "correct": 0,
        "explanation": "Một chỗ 'không tìm thấy' là kết quả có giá trị: bạn biết chỗ đó cần tìm bằng cách khác. Ép AI cho con số chỉ dẫn tới bịa. Nó cũng không phải lười hay từ chối, mà là nói thật giới hạn của những gì nó tìm được."
      },
      {
        "question": "Khi AI đánh dấu một ý là 'suy đoán', bạn nên làm gì với ý đó trong báo cáo gửi sếp?",
        "options": [
          "Kiểm bằng nguồn khác trước khi dùng, hoặc ghi rõ đó là suy đoán chưa kiểm",
          "Bỏ chữ 'suy đoán' đi và viết ý đó như một sự thật đã được xác nhận",
          "Dùng nguyên vì AI đã tự nhận nên chắc chắn là đã thành thật",
          "Xoá ý đó khỏi báo cáo trong mọi trường hợp vì suy đoán luôn vô giá trị"
        ],
        "correct": 0,
        "explanation": "Suy đoán có thể là hướng đi hữu ích nếu được nói rõ là suy đoán hoặc được kiểm. Bỏ nhãn đi làm suy đoán thành 'sự thật', còn tin vì AI 'thành thật' nhầm giữa nhãn và bằng chứng. Xoá hẳn thì mất cả những gợi ý cần kiểm."
      },
      {
        "question": "Vì sao nên so hai câu trả lời (có và không có yêu cầu tách) của cùng một câu hỏi?",
        "options": [
          "Để thấy yêu cầu tách đã lôi ra những chỗ AI vốn nói rất chắc mà không có nguồn",
          "Để chọn câu trả lời dài hơn, vì dài hơn thì thường đầy đủ hơn",
          "Để chứng tỏ AI không nhất quán nên không bao giờ dùng được cho công việc",
          "Để lấy giá trị trung bình của hai câu trả lời làm kết quả cuối"
        ],
        "correct": 0,
        "explanation": "Đặt cạnh nhau, bạn thấy chỗ nào trong bản thường là AI đoán nhưng viết như sự thật. Độ dài không liên quan tới độ đúng. Hai bản khác nhau không chứng minh AI vô dụng, và không có thứ gọi là trung bình của hai câu trả lời."
      },
      {
        "question": "AI ghi 'có nguồn' cho một ý, kèm tên một báo cáo. Bước nào là kiểm chứng thật?",
        "options": [
          "Mở báo cáo và tìm xem ý đó có nằm trong đó không",
          "Hỏi AI 'nguồn này có thật không' rồi tin theo câu trả lời nó đưa ra",
          "Kiểm xem tên báo cáo có nghe giống các báo cáo khác cùng ngành không",
          "Dựa vào việc AI viết chữ 'có nguồn' bằng chữ in đậm cho dễ nhận ra"
        ],
        "correct": 0,
        "explanation": "Nhãn 'có nguồn' chỉ là chữ AI viết. Chỉ khi mở nguồn và tìm thấy ý đó bạn mới kiểm chứng xong. Hỏi lại chính AI có thể làm nó xác nhận điều nó vừa bịa, còn tên nghe quen hay chữ in đậm chẳng nói gì về thực tế."
      }
    ],
    "keyTakeaways": [
      "Mặc định, AI trả lời một giọng đều, khó thấy chỗ yếu.",
      "Một dòng thêm vào câu hỏi có thể tách 'có nguồn', 'suy đoán', 'không tìm thấy'.",
      "'Không tìm thấy' là kết quả có giá trị.",
      "Nhãn 'có nguồn' vẫn cần mở nguồn để kiểm.",
      "So hai câu trả lời để thấy chỗ AI vốn nói chắc mà không có nguồn."
    ],
    "practicePrompt": {
      "question": "Bạn muốn AI cho biết điểm yếu của một đối thủ. Dòng nào thêm vào câu hỏi hợp lý nhất?",
      "options": [
        "Chia câu trả lời thành: có nguồn (kèm liên kết), suy đoán, không tìm thấy",
        "Hãy nói chắc chắn và đưa cho tôi ít nhất năm điểm yếu thật rõ ràng, đừng ghi chú gì thêm",
        "Hãy viết như một báo cáo chuyên nghiệp dài ít nhất hai trang giấy",
        "Hãy cho tôi điểm yếu, nếu không chắc thì cứ đoán cho đủ ý"
      ],
      "correct": 0,
      "explanation": "Chia thành ba nhóm giúp bạn thấy nhóm nào cần kiểm trước. Bắt đủ năm điểm ép AI đoán cho đủ số. Yêu cầu độ dài hay văn phong không hỏi gì về độ chắc chắn, và nói 'cứ đoán cho đủ' chính là khuyến khích bịa."
    },
    "summary": {
      "keyIdea": "Thêm một dòng vào câu hỏi để AI tách điều có nguồn khỏi điều đoán.",
      "formula": "Có nguồn (kèm liên kết) / suy đoán / không tìm thấy.",
      "commonMistake": "Coi giọng chắc chắn của AI là dấu hiệu nó chắc chắn.",
      "action": "Thêm dòng tách ba nhóm vào câu hỏi AI tiếp theo của bạn."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn một câu hỏi công việc bạn từng hỏi AI. Hỏi lại hai lần: một lần như cũ, một lần thêm dòng 'tách rõ điều có nguồn, điều suy đoán, điều không tìm thấy'. Đặt hai câu trả lời cạnh nhau và tô màu những câu chỉ xuất hiện ở bản thường mà bản tách xếp vào 'suy đoán'.",
      "secondary": "Mở nguồn của hai ý có nguồn quan trọng nhất và ghi xem chúng có đúng như AI nói không."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bạn hỏi AI một câu và nhận đoạn văn trôi chảy, giọng đều từ đầu tới cuối. Chỗ nào có nguồn, chỗ nào AI tự nối? Bài này dạy một dòng thêm vào câu hỏi để thấy rõ ranh giới đó."
      },
      {
        "type": "feynman",
        "title": "Nói chỗ chưa chắc đơn giản hơn bạn nghĩ",
        "intro": "Hình dung một nhân viên báo cáo miệng với sếp. Người kém thì nói một mạch nghe như cái gì cũng chắc. Người giỏi nói: 'cái này em thấy tận mắt, cái này em nghe nói, cái này em chưa biết'. Bạn cần dặn AI nói theo kiểu thứ hai.",
        "columns": [
          "Thành phần",
          "Nhân viên báo cáo miệng",
          "AI trả lời bạn"
        ],
        "rows": [
          [
            "Giọng mặc định",
            "Nói một mạch nghe như đều chắc",
            "Văn trôi chảy, giọng đều từ đầu tới cuối"
          ],
          [
            "Phần thấy tận mắt",
            "Em thấy tận mắt",
            "Điều có nguồn: có liên kết hoặc tên nguồn"
          ],
          [
            "Phần nghe nói",
            "Em nghe nói, chưa kiểm",
            "Suy đoán: AI tự nối từ những gì nó biết"
          ],
          [
            "Phần chưa biết",
            "Em chưa biết",
            "Không tìm thấy: chỗ trống cần kiểm bằng cách khác"
          ]
        ],
        "oneLiner": "Dặn AI báo cáo như người giỏi: nói rõ cái gì đã thấy, cái gì nghe nói, cái gì chưa biết."
      },
      {
        "type": "heading",
        "text": "Một dòng thêm vào câu hỏi"
      },
      {
        "type": "paragraph",
        "text": "Sau câu hỏi chính, thêm: 'Hãy tách câu trả lời thành ba phần: điều có nguồn (kèm tên nguồn), điều bạn suy đoán, và điều bạn không tìm thấy.' Dòng này không làm AI trở nên không thể sai, nhưng buộc nó đánh dấu ranh giới và cho bạn biết nên kiểm chỗ nào trước."
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Hỏi về đối thủ và bắt AI nói chỗ chưa chắc",
        "task": "Bạn cần biết điểm yếu của một đối thủ cho buổi họp chiều nay. Lắp câu hỏi để AI trả lời có phân tách độ chắc chắn.",
        "parts": [
          {
            "id": "ask",
            "label": "Câu hỏi chính",
            "options": [
              {
                "text": "Cho tôi biết mọi thứ về đối thủ.",
                "feedback": "Quá rộng, AI sẽ trả lời chung chung và dễ thêm chi tiết bịa."
              },
              {
                "text": "Liệt kê điểm yếu của đối thủ X trong mảng dịch vụ giao hàng, trong phạm vi thông tin công khai.",
                "good": true,
                "feedback": "Có đối tượng, mảng và phạm vi, nên AI có chỗ bám."
              }
            ]
          },
          {
            "id": "split",
            "label": "Yêu cầu tách",
            "options": [
              {
                "text": "Hãy trả lời chắc chắn, đừng nói là không biết.",
                "feedback": "Ép AI chắc chắn là khuyến khích nó bịa cho đủ."
              },
              {
                "text": "Tách thành ba phần: điều có nguồn (kèm tên nguồn), điều suy đoán, điều không tìm thấy.",
                "good": true,
                "feedback": "Bạn nhận được bản đồ độ chắc chắn để biết chỗ nào kiểm trước."
              }
            ]
          },
          {
            "id": "rule",
            "label": "Quy tắc khi thiếu nguồn",
            "options": [
              {
                "text": "Nếu thiếu thông tin thì cứ đoán hợp lý cho đủ ý.",
                "feedback": "Khuyến khích đoán cho đủ và các ý đoán sẽ nghe như sự thật."
              },
              {
                "text": "Nếu không tìm thấy thì ghi 'không tìm thấy', đừng đoán con số hay tên.",
                "good": true,
                "feedback": "AI được phép nói chỗ trống, nên bạn biết đâu là chỗ cần tìm tiếp."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "ask",
              "split",
              "rule"
            ],
            "text": "Có nguồn: (1) Thời gian giao hàng của đối thủ X được khách phàn nàn trên mục đánh giá của hai ứng dụng (nguồn: trang đánh giá của ứng dụng). \nSuy đoán: Có thể thiếu nhân lực ở giờ cao điểm, dựa trên mẫu phàn nàn giờ tối.\nKhông tìm thấy: Không có thông tin công khai về chi phí vận hành hay hợp đồng với đối tác."
          },
          {
            "requires": [
              "ask"
            ],
            "text": "Đối thủ X có một số điểm yếu đáng chú ý: thời gian giao hàng chưa ổn định, chăm sóc khách hàng chậm, chi phí vận hành cao và quan hệ đối tác chưa bền vững.\n(Giọng đều nên bạn không biết ý nào có nguồn và ý nào là đoán.)"
          },
          {
            "text": "Đối thủ X có năm điểm yếu: giao trễ trung bình 2 ngày, tỷ lệ hài lòng 61%, chi phí vận hành cao hơn ngành 18%...\n(Vì bị ép đủ con số, AI bịa các tỷ lệ nghe chính xác.)"
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Không yêu cầu tách",
          "text": "Một đoạn văn liền mạch. Giọng đều, bạn không phân biệt được chỗ nào có nguồn. Bạn hoặc tin hết, hoặc phải kiểm hết."
        },
        "right": {
          "label": "Có yêu cầu tách",
          "text": "Ba nhóm: có nguồn, suy đoán, không tìm thấy. Bạn kiểm ngay nhóm có nguồn quan trọng, coi nhóm suy đoán như gợi ý, và biết chỗ trống cần tìm tiếp."
        }
      },
      {
        "type": "scenario",
        "title": "Hai câu trả lời về cùng một đối thủ",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn hỏi AI hai lần. Bản thường là một đoạn chắc nịch. Bản có yêu cầu tách cho ba mục, trong đó có một mục 'suy đoán' nói đối thủ sắp tăng giá.",
            "choices": [
              {
                "label": "Đưa ý 'sắp tăng giá' vào báo cáo như một thông tin chắc chắn",
                "next": "bad1"
              },
              {
                "label": "Ghi ý đó là 'suy đoán chưa kiểm' và tìm thêm nguồn trước buổi họp",
                "next": "s2"
              }
            ]
          },
          "bad1": {
            "text": "Trong buổi họp, sếp dựa vào ý này để hoãn một kế hoạch giá. Hai tuần sau đối thủ không hề tăng giá, và bạn không có nguồn để giải thích.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bạn tìm một buổi công bố của đối thủ và không thấy dấu hiệu tăng giá. Bạn còn một mục 'có nguồn' quan trọng.",
            "choices": [
              {
                "label": "Mở nguồn của mục đó, tìm đúng ý, rồi ghi số trang trong báo cáo",
                "next": "good"
              },
              {
                "label": "Bỏ qua việc mở nguồn vì AI đã ghi 'có nguồn' và nguồn nghe quen",
                "next": "bad2"
              }
            ]
          },
          "bad2": {
            "text": "Bạn đưa mục đó vào báo cáo. Khi sếp hỏi trang nào, bạn mở nguồn và thấy ý đó không nằm trong đó: AI đã gán sai nguồn.",
            "ending": "bad"
          },
          "good": {
            "text": "Bạn thấy ý đó có trong nguồn. Báo cáo của bạn có hai nhóm rõ ràng: điều đã kiểm và điều còn là suy đoán. Sếp biết chính xác chỗ nào vững.",
            "ending": "good"
          }
        }
      },
      {
        "type": "flow",
        "title": "Từ câu trả lời đều giọng tới bản đồ kiểm",
        "steps": [
          {
            "label": "Hỏi bình thường",
            "detail": "Hỏi câu hỏi chính, ghi lại câu trả lời để so sánh."
          },
          {
            "label": "Hỏi lại, thêm dòng tách",
            "detail": "Thêm: tách có nguồn (kèm tên nguồn), suy đoán, không tìm thấy."
          },
          {
            "label": "Đặt hai bản cạnh nhau",
            "detail": "Tìm các câu nói chắc ở bản thường mà bản tách xếp vào 'suy đoán'. Đó là chỗ AI vốn đoán."
          },
          {
            "label": "Kiểm nhóm có nguồn",
            "detail": "Mở từng nguồn, tìm đúng ý. Nhãn 'có nguồn' không phải là kiểm chứng."
          },
          {
            "label": "Xử lý nhóm còn lại",
            "detail": "Suy đoán: ghi rõ là suy đoán hoặc kiểm bằng nguồn khác. Không tìm thấy: tìm bằng cách khác hoặc ghi 'chưa có thông tin'."
          }
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Dặn AI nói rõ chỗ chưa chắc, rồi kiểm phần có nguồn.",
          "Bài sau: dự án nhỏ so sánh hai nhà cung cấp có nguồn cho từng dòng."
        ]
      }
    ]
  },
  {
    "id": 2309,
    "slug": "du-an-nho-so-sanh-hai-nha-cung-cap-co-nguon",
    "title": "Chặng 45, Bài 10: Dự án nhỏ: so sánh hai nhà cung cấp có nguồn cho từng dòng",
    "subtitle": "Một bảng so sánh mà ô nào cũng mở được nguồn thì sếp mới dám quyết dựa vào nó.",
    "duration": "10 phút",
    "difficulty": "Dễ",
    "emoji": "📋",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Bảng so sánh nhà cung cấp là loại tài liệu dẫn tới quyết định tốn tiền. Bảng AI dựng trong một phút trông rất đầy đủ, nhưng ô nào đúng, ô nào bịa thì không ai biết. Thêm cột nguồn cho từng dòng biến nó từ bản nháp thành tài liệu có thể bảo vệ trước sếp.",
    "openingQuestion": "Bạn nhờ AI lập bảng so sánh hai nhà cung cấp dịch vụ. Yêu cầu nào làm bảng dùng được để trình sếp?",
    "openingOptions": [
      "Mỗi dòng phải kèm nguồn mở được, và ô nào không có nguồn thì ghi 'chưa kiểm'",
      "Bảng có thật nhiều dòng để trông đầy đủ và không bỏ sót tiêu chí nào",
      "Bảng dùng ngôn ngữ chuyên nghiệp và định dạng màu sắc rõ ràng dễ nhìn",
      "Bảng do AI tự chọn tiêu chí theo cách nó thấy hợp lý nhất cho công ty"
    ],
    "correctOption": 0,
    "explanation": "Bảng có nhiều dòng hay định dạng đẹp không cho biết ô nào đúng. Nguồn mở được cho từng dòng mới cho phép sếp kiểm, và chữ 'chưa kiểm' nói thật chỗ còn thiếu. Để AI tự chọn tiêu chí cũng nguy hiểm vì tiêu chí phải xuất phát từ nhu cầu của công ty, là việc của bạn và sếp, không phải của AI.",
    "diagram": [
      {
        "label": "Chốt tiêu chí theo nhu cầu của công ty",
        "arrow": true
      },
      {
        "label": "Nhờ AI dựng bảng, mỗi dòng có cột nguồn",
        "arrow": true
      },
      {
        "label": "Mở từng nguồn, kiểm ô, sửa hoặc ghi 'chưa kiểm'",
        "arrow": true
      },
      {
        "label": "Trình sếp: bảng kèm nguồn và danh sách ô chưa kiểm"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Một nhân viên mua hàng cần chọn giữa hai nhà cung cấp phần mềm quản lý kho. AI dựng bảng mười dòng. Cô mở nguồn từng dòng, thấy hai dòng AI ghi sai và ba dòng không có nguồn công khai. Cô trình sếp bảng đã sửa, kèm danh sách ba câu cần hỏi trực tiếp nhà cung cấp. Đây là tình huống giả định."
    },
    "quiz": [
      {
        "question": "Bước đầu tiên khi lập bảng so sánh hai nhà cung cấp là gì?",
        "options": [
          "Chốt các tiêu chí theo nhu cầu thật của công ty, trước khi nhờ AI dựng bảng",
          "Nhờ AI liệt kê mọi tiêu chí có thể nghĩ ra rồi chọn những dòng hay nhất",
          "Mở trang quảng cáo của cả hai nhà cung cấp và chép các tiêu chí họ tự nêu",
          "Chọn sẵn nhà cung cấp mình thích rồi nhờ AI tìm các lý do để ủng hộ lựa chọn đó"
        ],
        "correct": 0,
        "explanation": "Tiêu chí xuất phát từ nhu cầu của công ty, như ngân sách, thời gian triển khai, hỗ trợ tiếng Việt. Tiêu chí do AI nghĩ hay do trang quảng cáo nêu sẽ thiên về điều người viết muốn khoe. Chọn trước rồi tìm lý do ủng hộ là thiên kiến xác nhận."
      },
      {
        "question": "Bảng AI dựng có một ô ghi 'hỗ trợ khách hàng 24/7', không có nguồn. Nên làm gì?",
        "options": [
          "Tìm trang chính thức của nhà cung cấp để kiểm, không thấy thì ghi 'chưa kiểm'",
          "Giữ nguyên ô vì 24/7 là tính năng phổ biến ở hầu hết các nhà cung cấp",
          "Bỏ dòng này ra khỏi bảng vì ô nào không có nguồn thì không có giá trị",
          "Hỏi lại AI 'có đúng không' và nếu nó nói đúng thì ghi vào bảng"
        ],
        "correct": 0,
        "explanation": "Một ô không nguồn chưa chắc sai nhưng chưa thể tin. Mở trang chính thức để kiểm, hoặc ghi 'chưa kiểm' và hỏi trực tiếp nhà cung cấp. Coi là phổ biến cũng là đoán, xoá hẳn thì mất một tiêu chí quan trọng, còn hỏi lại AI chỉ cho thêm một câu trả lời chưa có nguồn."
      },
      {
        "question": "Hai nguồn cho cùng một ô nói khác nhau: trang chính thức ghi 'tối thiểu 12 tháng', một bài đánh giá ghi '6 tháng'. Bạn ghi gì?",
        "options": [
          "Ghi '12 tháng (theo trang chính thức)' và chú thích là có bài đánh giá ghi khác",
          "Ghi '6 tháng' vì bài đánh giá viết sau và có thể phản ánh thực tế mới hơn",
          "Ghi '9 tháng' là trung bình của hai con số cho công bằng với cả hai nguồn",
          "Bỏ ô này khỏi bảng vì hai nguồn đang mâu thuẫn nhau thì không thể chọn được nguồn nào cho đúng"
        ],
        "correct": 0,
        "explanation": "Trang chính thức của nhà cung cấp là nguồn gốc cho điều khoản của họ, nên ưu tiên nó, và chú thích mâu thuẫn để sếp biết cần hỏi lại. Lấy trung bình tạo ra con số không ai công bố. Bài đánh giá có thể cũ hoặc sai, và bỏ ô đi là mất thông tin."
      },
      {
        "question": "Bảng hoàn thành, sếp hỏi 'sao không chọn luôn nhà A cho nhanh vì AI cho A điểm cao hơn'. Bạn trả lời thế nào?",
        "options": [
          "Nói rõ điểm đó dựa trên các ô đã kiểm nguồn, và chỉ ra ô nào còn chưa kiểm",
          "Nói AI đã tổng hợp từ nhiều nguồn nên điểm của nó đáng tin hơn điểm con người chấm",
          "Đồng ý ngay và chọn nhà A, vì AI chấm điểm không bị thiên vị như con người",
          "Đổi điểm cho khớp ý sếp để tiết kiệm thời gian của cả hai bên"
        ],
        "correct": 0,
        "explanation": "Bảng có giá trị khi bạn chỉ ra được từng ô dựa trên nguồn nào và ô nào còn trống. Điểm do AI chấm không phải bằng chứng, và AI cũng có thể thiên lệch theo dữ liệu nó đọc. Chỉnh điểm cho khớp ý sếp là làm sai lệch tài liệu."
      },
      {
        "question": "Trong một bảng 10 dòng, bạn kiểm được 7 ô có nguồn và 3 ô không tìm thấy nguồn. Tỷ lệ ô đã kiểm là bao nhiêu và nên trình sếp thế nào?",
        "options": [
          "70%, trình bảng kèm danh sách 3 ô chưa kiểm cần hỏi trực tiếp nhà cung cấp",
          "30%, vì 3 ô chưa kiểm là số đáng nói nhất và quyết định tính hợp lệ cả bảng",
          "70%, nên coi cả bảng đã kiểm xong và không cần nhắc tới 3 ô còn lại",
          "100%, vì AI đã trả lời cả 10 ô nên bảng coi như được kiểm đủ"
        ],
        "correct": 0,
        "explanation": "7 trên 10 ô có nguồn là 70%. Cách trình thật thà là giữ bảng, nói rõ 3 ô chưa kiểm và đề xuất cách kiểm. Lấy 30% làm tỷ lệ đã kiểm là nhầm chiều, và coi cả bảng đã xong hoặc tính 100% vì AI trả lời hết là che đi chỗ hổng."
      }
    ],
    "keyTakeaways": [
      "Tiêu chí xuất phát từ nhu cầu công ty, không từ AI hay trang quảng cáo.",
      "Mỗi dòng của bảng có một cột nguồn mở được.",
      "Ô nào chưa kiểm thì ghi 'chưa kiểm', không đoán.",
      "Khi hai nguồn mâu thuẫn, ưu tiên nguồn gốc và chú thích điểm khác.",
      "Trình sếp kèm danh sách ô chưa kiểm."
    ],
    "practicePrompt": {
      "question": "Bạn có bảng so sánh hai nhà cung cấp do AI dựng, 12 dòng, cột 'nguồn' toàn trống. Việc làm hợp lý nhất trước khi trình sếp là gì?",
      "options": [
        "Mở trang chính thức của từng nhà cung cấp, điền nguồn cho từng dòng và ghi 'chưa kiểm' chỗ nào không thấy",
        "Xoá cột nguồn cho bảng gọn hơn rồi trình sếp vì AI đã dựng xong",
        "Điền tên của hai nhà cung cấp vào cột nguồn để trông có nguồn",
        "Nhờ AI điền cột nguồn rồi trình ngay vì nó biết mỗi dòng lấy từ đâu"
      ],
      "correct": 0,
      "explanation": "Cột nguồn chỉ có ý nghĩa khi từng ô mở được. Xoá cột hay điền tên nhà cung cấp làm bảng trông có nguồn mà không kiểm được. Nhờ AI điền nguồn có thể dẫn tới đường liên kết nghe thật mà không tồn tại, nên bạn vẫn phải mở từng cái."
    },
    "summary": {
      "keyIdea": "Bảng so sánh có giá trị khi mỗi dòng mở được nguồn, và chỗ chưa kiểm được nói thật.",
      "formula": "Tiêu chí của bạn, AI dựng khung, bạn kiểm nguồn từng ô, trình kèm danh sách chưa kiểm.",
      "commonMistake": "Trình bảng AI dựng vì nó trông đầy đủ mà chưa mở một nguồn nào.",
      "action": "Thêm cột 'nguồn' và cột 'đã kiểm' vào bảng so sánh tiếp theo của bạn."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn hai dịch vụ hoặc phần mềm bạn đang cân nhắc thật (ví dụ hai công cụ họp trực tuyến). Ghi 5 tiêu chí của bạn, nhờ AI dựng bảng với cột nguồn, rồi mở nguồn và kiểm ít nhất 5 ô. Đánh dấu ô nào 'đã kiểm' và ô nào 'chưa kiểm'.",
      "secondary": "Ghi lại 2 câu bạn cần hỏi trực tiếp nhà cung cấp cho các ô chưa kiểm."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Sếp nhờ bạn chọn giữa hai nhà cung cấp. Bài cuối của phần này gom mọi thứ vào một dự án nhỏ: lập bảng so sánh mà từng dòng đều mở được nguồn, và chỗ nào chưa kiểm thì nói thật."
      },
      {
        "type": "feynman",
        "title": "Bảng có nguồn đơn giản hơn bạn nghĩ",
        "intro": "Hình dung bạn mua xe cũ và nhờ bạn thân so sánh hai chiếc. Nếu bạn thân chỉ nói 'chiếc này tốt hơn', bạn không biết gì. Nếu anh ta đưa thêm ảnh sổ bảo dưỡng cho từng điểm, bạn mới dám quyết.",
        "columns": [
          "Thành phần",
          "Nhờ bạn thân so sánh hai xe",
          "Bảng so sánh hai nhà cung cấp"
        ],
        "rows": [
          [
            "Kết luận",
            "Chiếc này tốt hơn",
            "Nhà cung cấp A có điểm cao hơn"
          ],
          [
            "Bằng chứng",
            "Ảnh sổ bảo dưỡng cho từng điểm",
            "Nguồn mở được cho từng dòng"
          ],
          [
            "Chỗ chưa biết",
            "Chưa xem được hộp số",
            "Ô ghi 'chưa kiểm'"
          ],
          [
            "Người quyết",
            "Bạn, dựa trên bằng chứng",
            "Sếp, dựa trên bảng và nguồn"
          ]
        ],
        "oneLiner": "Kết luận đáng tin khi từng ô kèm bằng chứng, và chỗ chưa biết được nói thẳng."
      },
      {
        "type": "heading",
        "text": "Ba việc của bạn, một việc của AI"
      },
      {
        "type": "list",
        "items": [
          "Việc của bạn: chốt tiêu chí theo nhu cầu của công ty, như ngân sách, thời gian triển khai, hỗ trợ tiếng Việt.",
          "Việc của AI: dựng khung bảng và gợi ý chỗ có thể tìm thông tin cho từng ô.",
          "Việc của bạn: mở từng nguồn, kiểm ô, sửa hoặc ghi 'chưa kiểm'.",
          "Việc của bạn: trình sếp bảng kèm danh sách ô chưa kiểm và đề xuất cách kiểm."
        ]
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI dựng bảng so sánh có cột nguồn",
        "task": "Công ty bạn cần chọn giữa hai phần mềm quản lý kho (A và B). Tiêu chí của bạn: chi phí cho 10 người dùng, thời gian triển khai, hỗ trợ tiếng Việt. Lắp prompt để AI dựng bảng.",
        "parts": [
          {
            "id": "criteria",
            "label": "Tiêu chí",
            "options": [
              {
                "text": "So sánh A và B ở mọi khía cạnh quan trọng.",
                "feedback": "AI tự chọn khía cạnh, nên bảng có thể xoay quanh điều công ty bạn không cần."
              },
              {
                "text": "So sánh A và B theo ba tiêu chí: chi phí cho 10 người dùng, thời gian triển khai, hỗ trợ tiếng Việt.",
                "good": true,
                "feedback": "Tiêu chí xuất phát từ nhu cầu của công ty nên bảng dùng được."
              }
            ]
          },
          {
            "id": "source",
            "label": "Nguồn cho từng dòng",
            "options": [
              {
                "text": "Chỉ cần kết luận nhà nào tốt hơn cho nhanh.",
                "feedback": "Bạn không có gì để kiểm và không có gì để trình sếp."
              },
              {
                "text": "Mỗi ô kèm tên nguồn và liên kết trang chính thức, nếu không chắc thì ghi 'chưa tìm thấy nguồn'.",
                "good": true,
                "feedback": "Bạn biết mở đâu để kiểm, và biết ô nào còn trống."
              }
            ]
          },
          {
            "id": "rule",
            "label": "Quy tắc khi thiếu thông tin",
            "options": [
              {
                "text": "Nếu thiếu số liệu thì ước lượng cho đủ bảng.",
                "feedback": "Ước lượng thành con số trong ô, và ô nào cũng trông như đã được kiểm."
              },
              {
                "text": "Không ước lượng: nếu không tìm thấy thì ghi 'chưa tìm thấy', và liệt kê ô đó cuối bảng.",
                "good": true,
                "feedback": "Chỗ trống hiện rõ và trở thành danh sách câu cần hỏi nhà cung cấp."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "criteria",
              "source",
              "rule"
            ],
            "text": "| Tiêu chí | A | B |\n| Chi phí cho 10 người | Chưa tìm thấy nguồn | Có bảng giá theo gói (trang giá của B) |\n| Thời gian triển khai | Theo trang hướng dẫn của A | Chưa tìm thấy nguồn |\n| Hỗ trợ tiếng Việt | Có giao diện tiếng Việt (trang tính năng của A) | Chưa tìm thấy nguồn |\n\nChưa kiểm: chi phí của A, thời gian triển khai của B, tiếng Việt của B. Cần hỏi trực tiếp nhà cung cấp."
          },
          {
            "requires": [
              "criteria"
            ],
            "text": "| Tiêu chí | A | B |\n| Chi phí cho 10 người | Hợp lý | Cao hơn |\n| Thời gian triển khai | Nhanh | Trung bình |\n| Hỗ trợ tiếng Việt | Tốt | Khá |\n\n(Bảng gọn nhưng không có nguồn, nên không ô nào kiểm được.)"
          },
          {
            "text": "| Tiêu chí | A | B |\n| Chi phí | 18 triệu/năm | 25 triệu/năm |\n| Triển khai | 7 ngày | 14 ngày |\n| Khách hàng | 4.000 | 1.500 |\n\n(AI tự chọn tiêu chí và tự điền số cho đủ bảng, không có nguồn.)"
          }
        ]
      },
      {
        "type": "callout",
        "label": "Nguyên tắc",
        "text": "Đừng để AI chấm điểm hay chọn nhà cung cấp thay bạn. Quyết định là của sếp, dựa trên các ô đã kiểm; việc của bạn là cho sếp thấy ô nào vững, ô nào còn trống."
      },
      {
        "type": "scenario",
        "title": "Trình bảng so sánh cho sếp",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "AI dựng xong bảng 8 dòng, rất gọn. Cột nguồn có 8 liên kết. Còn một tiếng nữa là tới cuộc họp.",
            "choices": [
              {
                "label": "Trình luôn vì cột nguồn đã đầy đủ liên kết",
                "next": "bad1"
              },
              {
                "label": "Mở từng liên kết và tìm đúng thông tin trong đó",
                "next": "s2"
              }
            ]
          },
          "bad1": {
            "text": "Sếp bấm thử một liên kết và thấy trang không tồn tại. Hai ô khác ghi sai so với trang thật. Cả bảng bị nghi ngờ.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bạn mở được 6 liên kết đúng, 1 liên kết hỏng và 1 liên kết đúng trang nhưng không có thông tin AI nói.",
            "choices": [
              {
                "label": "Sửa hai ô, ghi 'chưa kiểm' và thêm câu cần hỏi nhà cung cấp, rồi trình",
                "next": "good"
              },
              {
                "label": "Giữ nguyên hai ô đó vì 6 trên 8 đã đúng, chắc hai ô còn lại cũng gần đúng",
                "next": "bad2"
              }
            ]
          },
          "bad2": {
            "text": "Hai ô còn lại nằm ở tiêu chí chi phí mà sếp quan tâm nhất. Khi nhà cung cấp báo giá khác với bảng, sếp hỏi vì sao bạn không kiểm.",
            "ending": "bad"
          },
          "good": {
            "text": "Sếp nhận bảng kèm nguồn và danh sách ba câu cần hỏi trực tiếp. Sếp chọn nhà cung cấp dựa trên các ô đã kiểm và giao bạn hỏi nốt ba câu.",
            "ending": "good"
          }
        }
      },
      {
        "type": "flow",
        "title": "Dự án nhỏ từ đầu tới cuối",
        "steps": [
          {
            "label": "Chốt tiêu chí",
            "detail": "Viết 3-5 tiêu chí theo nhu cầu thật của công ty: ngân sách, thời gian, yêu cầu riêng. Đây là việc của bạn, không giao AI."
          },
          {
            "label": "Nhờ AI dựng bảng có cột nguồn",
            "detail": "Nói rõ tiêu chí, yêu cầu mỗi ô kèm nguồn và quy tắc: không tìm thấy thì ghi 'chưa tìm thấy', không ước lượng."
          },
          {
            "label": "Mở từng nguồn",
            "detail": "Bấm từng liên kết, tìm đúng thông tin. Sửa ô sai, đánh dấu ô không có nguồn, để ý ô chỉ có bài đánh giá hoặc quảng cáo."
          },
          {
            "label": "Xử lý mâu thuẫn",
            "detail": "Nếu hai nguồn khác nhau, ưu tiên trang chính thức của nhà cung cấp và chú thích điểm khác."
          },
          {
            "label": "Trình sếp",
            "detail": "Gửi bảng đã kiểm kèm danh sách ô chưa kiểm và cách kiểm (hỏi trực tiếp, xin báo giá). Quyết định là của sếp."
          }
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Bảng có nguồn cho từng dòng, và chỗ chưa kiểm được nói thật.",
          "Phần sau của chặng: kiểm nguồn sâu hơn và bắt lỗi bịa."
        ]
      }
    ]
  }
];
