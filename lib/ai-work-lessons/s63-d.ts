import type { Lesson } from "../lesson-types";

// Chặng 63, bài 16-20. Giáo trình: scripts/curriculum/stage-63.json.
// Không dựa vào tính năng cụ thể của công cụ nào; số liệu đều để minh hoạ.
export const S63_D_LESSONS: Lesson[] = [
  {
    "track": "personal",
    "isFundamental": false,
    "difficulty": "Trung bình",
    "duration": "8 phút",
    "id": 2675,
    "slug": "hai-thu-cung-tang-kem-bang-chung-nhan-qua",
    "title": "Chặng 63, Bài 16: Hai thứ cùng tăng không có nghĩa cái này gây ra cái kia",
    "subtitle": "Kem bán chạy và người đuối nước đều tăng mùa hè, nhưng kem không làm ai chìm.",
    "emoji": "🍦",
    "whyItMatters": "Trong báo cáo, câu \"A tăng thì B tăng nên A làm B tăng\" xuất hiện rất thường và nghe rất thuyết phục. Nếu bạn dừng ở đó, công ty có thể dồn tiền vào việc không có tác dụng, hoặc cắt một việc vốn đang có ích.",
    "openingQuestion": "Báo cáo mùa hè ghi: tháng nào bán được nhiều kem thì tháng đó có nhiều vụ đuối nước. Cách hiểu nào hợp lý nhất?",
    "openingOptions": [
      "Có một yếu tố thứ ba, như thời tiết nóng, làm cả hai cùng tăng",
      "Kem làm người ăn thấy đuối sức và nặng bụng nên dễ chìm khi xuống nước bơi",
      "Có người đuối nước thương tâm nên người xung quanh kéo nhau đi ăn kem nhiều hơn",
      "Hai số này trùng nhau hoàn toàn do tình cờ trong năm nay, không có lý do nào cả"
    ],
    "correctOption": 0,
    "explanation": "Trời nóng khiến người ta ăn kem nhiều hơn và cũng khiến người ta đi bơi nhiều hơn; đi bơi nhiều thì số vụ đuối nước tăng theo. Kem và đuối nước không tác động lên nhau, chúng cùng bị một yếu tố thứ ba kéo lên. Cách giải thích \"kem làm đuối sức\" là bịa ra cơ chế cho vừa số liệu, còn \"tình cờ\" bỏ qua việc hai đường này tăng giảm đều đặn theo mùa, nên hiếm khi chỉ là trùng hợp.",
    "diagram": [
      {
        "label": "Thấy hai số cùng tăng",
        "arrow": true
      },
      {
        "label": "Tự hỏi: có yếu tố thứ ba kéo cả hai không",
        "arrow": true
      },
      {
        "label": "So trong nhóm có cùng điều kiện (cùng mức nóng)",
        "arrow": true
      },
      {
        "label": "Chỉ kết luận nhân quả khi mối liên hệ còn đứng vững"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Một phòng marketing thấy tháng nào gửi nhiều email khuyến mãi thì tháng đó doanh số cao, nên xin tăng gấp đôi số email. Khi rà lại, tháng doanh số cao vốn là tháng lễ, và đội chỉ gửi nhiều email vào đúng các tháng lễ. Mùa lễ làm cả hai cùng tăng; số email có thật sự kéo doanh số hay không thì báo cáo chưa trả lời được. (Số liệu và tình huống đều để minh hoạ.)"
    },
    "quiz": [
      {
        "question": "Kem bán chạy và đuối nước cùng tăng vào mùa hè. Yếu tố thứ ba hợp lý nhất là gì?",
        "options": [
          "Thời tiết nóng, khiến người ta vừa ăn kem vừa đi bơi nhiều",
          "Kem chứa nhiều đường nên làm người ăn mất sức khi bơi dưới nước",
          "Người đuối nước làm người thân ăn kem để an ủi, nên kem bán tăng theo",
          "Lượng kem bán ra quyết định số người đuối nước, theo chiều từ kem sang nước"
        ],
        "correct": 0,
        "explanation": "Nóng là nguyên nhân chung: nó đẩy cả hai số lên mà kem và đuối nước không tác động lên nhau. Ba đáp án còn lại đều nối kem với đuối nước bằng một cơ chế tự nghĩ ra thay vì tìm cái chung đứng sau cả hai."
      },
      {
        "question": "Hai số liệu tăng giảm cùng nhau. Điều chắc chắn rút ra được là gì?",
        "options": [
          "Hai số có liên quan với nhau, chưa biết cái nào gây ra cái nào",
          "Số thứ nhất gây ra số thứ hai, vì nó tăng trước trong bảng",
          "Số thứ hai gây ra số thứ nhất, vì nó lớn hơn nên có sức nặng hơn",
          "Hai số hoàn toàn độc lập và việc chúng tăng cùng nhau chỉ là ngẫu nhiên"
        ],
        "correct": 0,
        "explanation": "Chỉ biết hai số đi cùng nhau thì mới có liên quan, còn hướng nhân quả thì chưa. Thứ tự cột trong bảng hay độ lớn của số không nói cái nào là nguyên nhân, và \"ngẫu nhiên\" cũng là kết luận không có bằng chứng."
      },
      {
        "question": "Chỉ số nào giúp nghi ngờ rằng email khuyến mãi chưa chắc làm tăng doanh số?",
        "options": [
          "Email gửi nhiều nhất đúng vào các tháng lễ, vốn đã bán chạy",
          "Doanh số cả hai năm đều có đơn hàng vào mọi tháng, không tháng nào bằng 0",
          "Số email gửi ra tháng này lớn hơn số email gửi tháng trước",
          "Tỷ lệ mở email trung bình được báo cáo bằng một số tròn"
        ],
        "correct": 0,
        "explanation": "Khi lịch gửi email trùng với mùa lễ, mùa lễ có thể là người kéo doanh số. Số email tăng hay tỷ lệ mở tròn số không nói gì về việc có yếu tố thứ ba. Đơn hàng có mặt ở mọi tháng cũng không liên quan tới nhân quả."
      },
      {
        "question": "Cách nào gần nhất với việc kiểm tra yếu tố thứ ba?",
        "options": [
          "So sánh các tháng có cùng mức nóng nhưng bán kem khác nhau",
          "So sánh tháng nóng nhất với tháng lạnh nhất của cả năm",
          "Cộng hai số lại rồi xem tổng có tăng theo mùa không",
          "Hỏi ý kiến người có nhiều kinh nghiệm nhất trong phòng"
        ],
        "correct": 0,
        "explanation": "Giữ yếu tố nghi ngờ cố định rồi so nhóm còn lại là cách tách nó ra. So tháng nóng nhất với lạnh nhất vẫn để thời tiết lẫn vào; cộng hai số không tách được gì; ý kiến kinh nghiệm chưa phải phép kiểm tra."
      },
      {
        "question": "Khi nào mới nên nói \"A làm B tăng\" trong báo cáo?",
        "options": [
          "Khi đã loại được yếu tố thứ ba và có thử nghiệm hoặc cách so sánh công bằng",
          "Khi hai số cùng tăng ở ít nhất ba tháng liên tiếp trong bảng",
          "Khi con số chênh lệch lớn tới mức mắt nhìn thấy ngay lập tức",
          "Khi người viết báo cáo là người có chức vụ cao và nhiều năm kinh nghiệm nhất phòng"
        ],
        "correct": 0,
        "explanation": "Nhân quả cần bằng chứng loại trừ yếu tố khác, không đến từ việc cùng tăng vài tháng, độ lớn của chênh lệch hay chức vụ người viết. Ba tháng liên tiếp vẫn có thể cùng chịu một mùa."
      }
    ],
    "keyTakeaways": [
      "Hai số cùng tăng chỉ cho biết chúng đi cùng nhau.",
      "Luôn hỏi: có yếu tố thứ ba làm cả hai cùng tăng không?",
      "Cách kiểm: so sánh trong nhóm có cùng điều kiện.",
      "Mùa vụ, dịp lễ và quy mô là những yếu tố thứ ba hay gặp nhất.",
      "Chưa chắc thì viết \"đi cùng nhau\", đừng viết \"gây ra\"."
    ],
    "practicePrompt": {
      "question": "Báo cáo nhân sự ghi: phòng nào có nhiều người đi tập huấn thì phòng đó nghỉ việc ít hơn. Câu nào viết đúng mức chắc chắn?",
      "options": [
        "Phòng có nhiều người đi tập huấn thì ít nghỉ việc hơn; chưa rõ tập huấn có phải nguyên nhân",
        "Tập huấn giúp giảm nghỉ việc, nên cần mở rộng ngân sách tập huấn cho mọi phòng",
        "Nghỉ việc ít hơn do tập huấn, vì đó là điều duy nhất khác nhau giữa các phòng",
        "Hai số này chẳng liên quan gì nhau vì mỗi phòng có hoàn cảnh riêng của nó"
      ],
      "correct": 0,
      "explanation": "Câu đúng mô tả mối liên hệ và nói rõ chưa biết nhân quả: có thể phòng ổn định mới cho người đi học. Hai câu nhân quả khẳng định quá mức và câu cuối bác bỏ cả mối liên hệ có thật."
    },
    "summary": {
      "keyIdea": "Cùng tăng chỉ là đi cùng nhau; nhân quả phải chứng minh riêng.",
      "formula": "Thấy hai số đi cùng → tìm yếu tố thứ ba → so trong nhóm cùng điều kiện → mới kết luận.",
      "commonMistake": "Nhìn hai đường cùng đi lên rồi viết ngay \"A làm B tăng\" vào báo cáo.",
      "action": "Chọn một câu \"A làm B\" trong báo cáo gần đây và viết ra một yếu tố thứ ba có thể kéo cả hai."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Mở một báo cáo của phòng bạn có câu kiểu \"nhờ X mà Y tăng\". Viết ra giấy hai yếu tố khác (mùa, chiến dịch khác, đổi nhân sự) có thể làm Y tăng. Với mỗi yếu tố, ghi số liệu nào trong tay bạn có thể cho thấy nó có thật hay không, rồi viết lại câu đó cho đúng mức chắc chắn.",
      "secondary": "Mai bạn sẽ được hỏi: yếu tố thứ ba nào bạn tìm ra, và câu đã viết lại ra sao."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Tháng bảy, báo cáo quý đặt hai đường cạnh nhau: doanh số kem và số vụ đuối nước. Cả hai vọt lên. Ai đó trong phòng họp nói đùa \"cấm bán kem đi\". Câu đùa ấy chính là lỗi mà bài này giúp bạn bắt được trong báo cáo của mình."
      },
      {
        "type": "feynman",
        "title": "Hai đứa trẻ cùng ướt áo mưa",
        "intro": "Trời đổ mưa, bạn thấy cả bác bán ô lẫn người đi xe máy mặc áo mưa tăng vọt. Không ai nghĩ bán ô làm người ta mặc áo mưa; cả hai chỉ đang phản ứng với cơn mưa.",
        "columns": [
          "Thành phần",
          "Ví dụ đời thường",
          "Trong số liệu"
        ],
        "rows": [
          [
            "Hai thứ thấy cùng tăng",
            "Ô bán chạy và áo mưa mặc nhiều",
            "Hai cột số cùng đi lên trong báo cáo"
          ],
          [
            "Yếu tố thứ ba",
            "Cơn mưa làm cả hai tăng",
            "Mùa vụ, dịp lễ, đợt nóng, quy mô công ty"
          ],
          [
            "Cách kiểm tra",
            "Chỉ so các ngày đều mưa như nhau",
            "So các nhóm có cùng điều kiện rồi mới xét"
          ]
        ],
        "oneLiner": "Hai thứ cùng tăng thường chỉ là hai hậu quả của một nguyên nhân thứ ba."
      },
      {
        "type": "heading",
        "text": "Bước một: chỉ ra mối liên hệ, chưa gọi tên nguyên nhân"
      },
      {
        "type": "paragraph",
        "text": "Khi thấy hai số đi cùng nhau, việc đầu tiên là mô tả đúng điều bạn thấy: \"tháng nào bán nhiều kem thì tháng đó đuối nước nhiều hơn\". Đó là một sự thật về số liệu. Chữ \"vì\" hay \"nhờ\" là bước nhảy thêm, và bước nhảy cần bằng chứng riêng."
      },
      {
        "type": "paragraph",
        "text": "Tới đây bạn mới có một thuật ngữ mới: yếu tố gây nhiễu, tức là cái thứ ba kéo cả hai số cùng lúc. Bạn không cần nhớ tên, chỉ cần nhớ câu hỏi: \"còn gì khác cũng làm cả hai tăng?\""
      },
      {
        "type": "flow",
        "title": "Kiểm tra một câu \"A làm B tăng\"",
        "steps": [
          {
            "label": "Mô tả đúng điều thấy",
            "detail": "Viết lại: \"A và B cùng tăng ở những tháng nào\". Chưa dùng chữ vì hay nhờ."
          },
          {
            "label": "Liệt kê yếu tố thứ ba",
            "detail": "Nghĩ tới mùa vụ, dịp lễ, đợt giảm giá, đổi nhân sự. Mỗi yếu tố là một nghi vấn cần kiểm."
          },
          {
            "label": "So trong nhóm cùng điều kiện",
            "detail": "Chỉ so các tháng cùng mùa, cùng mức giá, rồi xem mối liên hệ còn không."
          },
          {
            "label": "Chốt mức chắc chắn",
            "detail": "Còn nguyên thì viết \"có thể\"; vẫn mờ thì chỉ viết \"đi cùng nhau\"."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Câu viết quá chắc",
          "text": "\"Gửi nhiều email nên doanh số tăng.\" Người đọc hiểu là cứ gửi thêm thì doanh số lên, rồi ra quyết định tốn tiền dựa trên đó."
        },
        "right": {
          "label": "Câu viết đúng mức",
          "text": "\"Các tháng gửi nhiều email cũng là tháng lễ có doanh số cao; chưa tách được tác động riêng của email.\" Người đọc biết phần nào chắc, phần nào chưa."
        }
      },
      {
        "type": "callout",
        "label": "Dấu hiệu nên nghi",
        "text": "Báo cáo chỉ đưa một biểu đồ hai đường cùng đi lên và một câu kết luận chắc nịch, không có dòng nào nói về mùa vụ hay nhóm so sánh. Hãy hỏi: nếu bỏ A đi, B có thật sự đổi không?"
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Soát đoạn nhận xét về chiến dịch email",
        "task": "Bản ghi chép thật chỉ có: doanh số tháng 11 và 12 cao nhất năm; tháng 11 và 12 công ty gửi nhiều email nhất; tháng 11 và 12 có dịp lễ cuối năm; chưa có tháng nào gửi nhiều email mà không phải lễ. Đánh dấu câu AI tự thêm.",
        "segments": [
          {
            "text": "Doanh số tháng 11 và 12 cao nhất năm."
          },
          {
            "text": "Đây cũng là hai tháng công ty gửi nhiều email nhất."
          },
          {
            "text": "Vì vậy mỗi email gửi thêm làm doanh số tăng khoảng 4%.",
            "error": "Bản ghi không có phép tính nào cho thấy \"4%\"; con số do AI bịa, và câu \"vì vậy\" biến hai thứ đi cùng nhau thành nhân quả."
          },
          {
            "text": "Hai tháng này đều có dịp lễ cuối năm."
          },
          {
            "text": "Khi bỏ hết email, doanh số chắc chắn sẽ giảm một nửa.",
            "error": "Chưa có tháng nào không lễ mà gửi nhiều email, nên không thể biết bỏ email thì doanh số ra sao; \"một nửa\" là bịa."
          },
          {
            "text": "Chưa tách được tác động riêng của email khỏi dịp lễ."
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Sếp hỏi: có nên tăng ngân sách email không?",
        "start": "a",
        "nodes": {
          "a": {
            "text": "Sếp nhìn biểu đồ email và doanh số cùng lên: \"Vậy gấp đôi ngân sách email quý sau nhé?\" Bạn chỉ có số liệu theo tháng của cả năm.",
            "choices": [
              {
                "label": "Đồng ý ngay, vì hai đường cùng đi lên rõ ràng",
                "next": "bad1"
              },
              {
                "label": "Hỏi lại: tháng gửi nhiều có trùng dịp lễ không, rồi tìm tháng nào gửi nhiều mà không lễ",
                "next": "b"
              }
            ]
          },
          "bad1": {
            "text": "Ngân sách được nhân đôi. Quý sau không có lễ, doanh số không nhúc nhích. Sếp hỏi số tiền thêm đã mua được gì, và bạn không có câu trả lời.",
            "ending": "bad"
          },
          "b": {
            "text": "Bạn thấy tháng 3 gửi nhiều email nhưng không có dịp lễ, doanh số tháng đó tăng chỉ khoảng nhẹ so với tháng thường (số liệu minh hoạ).",
            "choices": [
              {
                "label": "Đề xuất thử nghiệm nhỏ: một nhóm khách nhận nhiều email, một nhóm nhận như cũ, rồi so",
                "next": "good"
              },
              {
                "label": "Kết luận email vô dụng và đề nghị bỏ hẳn ngân sách email",
                "next": "bad2"
              }
            ]
          },
          "bad2": {
            "text": "Bỏ email làm mất liên lạc với khách cũ. Bạn đã nhảy từ \"chưa chứng minh có tác dụng\" sang \"chứng minh vô dụng\", cả hai đều chưa có bằng chứng.",
            "ending": "bad"
          },
          "good": {
            "text": "Sếp đồng ý chạy thử hai nhóm trong một tháng rồi quyết định. Nhờ có nhóm so sánh, con số lần này đáng tin hơn hai đường cùng đi lên.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Hai số cùng tăng mới là lời mời hỏi thêm, chưa phải câu trả lời.",
          "Bài sau: người dùng nhiều tính năng giữ lại tốt, vì tính năng hay vì vốn đã trung thành."
        ]
      }
    ]
  },
  {
    "track": "personal",
    "isFundamental": false,
    "difficulty": "Trung bình",
    "duration": "10 phút",
    "id": 2676,
    "slug": "nhan-qua-nguoc-nguoi-dung-nhieu-tinh-nang-co-phai-vi-tinh-nang",
    "title": "Chặng 63, Bài 17: Người dùng nhiều tính năng: nhờ tính năng hay vốn đã trung thành",
    "subtitle": "Nhóm dùng nhiều ở lại lâu hơn, nhưng có thể họ dùng nhiều vì họ vốn ở lại.",
    "emoji": "🔁",
    "whyItMatters": "Quyết định đầu tư vào một tính năng, một khoá đào tạo hay một chương trình thường dựa trên câu \"người dùng nó thì giữ lại tốt hơn\". Nếu chiều nhân quả ngược lại, tiền đổ vào đó không kéo được ai ở lại.",
    "openingQuestion": "Báo cáo sản phẩm ghi: người dùng từ năm tính năng trở lên giữ lại tốt gấp đôi nhóm còn lại, nên cần ép mọi khách mới dùng đủ năm tính năng. Điều nào nên hỏi trước?",
    "openingOptions": [
      "Có khi khách vốn đã gắn bó mới tìm hiểu nhiều tính năng, chứ không phải ngược lại",
      "Năm tính năng có đủ đẹp để khách thích khi lần đầu nhìn thấy không",
      "Nhóm dùng ít tính năng chiếm bao nhiêu phần trăm tổng số khách",
      "Đội thiết kế có sẵn sàng làm thêm màn hình hướng dẫn cho khách mới"
    ],
    "correctOption": 0,
    "explanation": "Hai chiều giải thích đều khớp số liệu: tính năng khiến khách ở lại, hoặc khách sẵn gắn bó nên dành thời gian khám phá nhiều tính năng. Nếu là chiều sau, ép khách mới dùng đủ năm tính năng không biến họ thành khách trung thành. Ba câu hỏi còn lại là chuyện thẩm mỹ, quy mô nhóm và nhân lực, chưa chạm tới việc chiều nhân quả có đúng hay không.",
    "diagram": [
      {
        "label": "Thấy nhóm dùng nhiều giữ lại tốt",
        "arrow": true
      },
      {
        "label": "Nêu cả hai chiều: tính năng → giữ lại, hoặc gắn bó → dùng nhiều",
        "arrow": true
      },
      {
        "label": "Tìm điểm khác nhau đo được giữa hai chiều",
        "arrow": true
      },
      {
        "label": "Thử nhỏ: cho một nhóm mới dùng thử rồi so"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Một trung tâm đào tạo thấy học viên dự đủ buổi cuối tuần thì thi đạt cao hơn hẳn, nên bắt buộc dự đủ. Điểm thi không nhích. Hoá ra học viên học tốt vốn hăng hái nên đi đủ; ép người học yếu đi đủ không làm họ học tốt lên. (Tình huống và số liệu để minh hoạ.)"
    },
    "quiz": [
      {
        "question": "Nhóm dùng nhiều tính năng ở lại lâu hơn. Nhìn theo chiều ngược, điều gì có thể đúng?",
        "options": [
          "Khách vốn trung thành mới bỏ công tìm hiểu nhiều tính năng",
          "Khách dùng nhiều tính năng nên bị ép ở lại vì đã lỡ tốn công học",
          "Khách dùng nhiều tính năng nên chắc chắn hiểu rõ giá trị sản phẩm hơn hết",
          "Số tính năng của một khách tăng lên sẽ làm khách đó mua thêm gói"
        ],
        "correct": 0,
        "explanation": "Nhìn ngược nghĩa là xem kết quả có thể là nguyên nhân: người muốn ở lại thì dành thời gian khám phá. Ba đáp án còn lại vẫn giữ chiều tính năng dẫn tới giữ lại, chỉ thêm cơ chế khác."
      },
      {
        "question": "Đâu là cách kiểm tra được chiều nhân quả mà không phải suy đoán?",
        "options": [
          "Chia ngẫu nhiên khách mới thành hai nhóm, một nhóm được hướng dẫn dùng đủ năm tính năng",
          "Hỏi các khách đang dùng nhiều xem họ thấy tính năng có hữu ích không",
          "Xem nhóm dùng nhiều có doanh thu trung bình cao hơn nhóm dùng ít không trong cùng một quý gần nhất",
          "Đếm số tính năng mà mỗi khách đã từng mở trong 30 ngày đầu tiên"
        ],
        "correct": 0,
        "explanation": "Chia ngẫu nhiên cho phép so hai nhóm giống nhau ngoài việc có được hướng dẫn hay không. Hỏi khách đang dùng nhiều chỉ thu thêm ý kiến từ nhóm vốn đã gắn bó, còn hai cách kia vẫn chỉ quan sát nhóm tự chọn."
      },
      {
        "question": "Đội thiết kế ép mọi khách mới đi qua năm tính năng, nhưng giữ lại không tăng. Nguyên nhân dễ nhất?",
        "options": [
          "Khách dùng nhiều tính năng là khách vốn gắn bó, không phải vì tính năng",
          "Khách không đọc kỹ hướng dẫn nên bỏ qua năm tính năng",
          "Năm tính năng là con số quá ít để tạo ra thay đổi",
          "Số liệu ban đầu bị nhập sai nên mối liên hệ thật ra không có"
        ],
        "correct": 0,
        "explanation": "Ép người ít gắn bó dùng nhiều không biến họ thành người gắn bó, vì tính năng không phải nguyên nhân. Ba đáp án kia tìm lỗi ở hướng dẫn, ở con số năm hay ở dữ liệu trong khi lời giải thích chiều ngược đã đủ."
      },
      {
        "question": "Nhóm \"dùng nhiều\" khác nhóm \"dùng ít\" ở điều gì trước khi họ dùng tính năng?",
        "options": [
          "Họ đã khác nhau về mức quan tâm và thời gian rảnh ngay từ đầu",
          "Họ đã có sẵn tài khoản trả phí và cao cấp hơn nhóm còn lại",
          "Họ đều mua sản phẩm vào cùng một ngày trong tháng đầu tiên",
          "Họ được gọi điện chăm sóc nhiều hơn ngay từ tuần lễ đầu tiên của thời gian dùng thử"
        ],
        "correct": 0,
        "explanation": "Nhóm tự chọn dùng nhiều thường vốn khác ở mức quan tâm và thời gian, nên so họ với nhóm còn lại không công bằng. Ba đáp án kia nêu những chi tiết cụ thể mà báo cáo chưa hề nói tới."
      },
      {
        "question": "Câu nào trong báo cáo nên viết để không nói quá?",
        "options": [
          "Khách dùng từ năm tính năng giữ lại tốt hơn; chưa rõ tính năng là nguyên nhân",
          "Dùng năm tính năng giúp khách ở lại lâu, nên cần ép khách mới dùng hết trong sáu tháng đầu",
          "Khách dùng ít tính năng là khách ít giá trị nên có thể bỏ qua hoàn toàn",
          "Số tính năng không liên quan gì tới việc khách có ở lại hay không"
        ],
        "correct": 0,
        "explanation": "Câu đúng nêu điều đo được và nói rõ điều chưa biết. Hai câu còn lại khẳng định nhân quả hoặc bác bỏ quan hệ mà số liệu chưa chứng minh, một câu khác còn đánh giá nhóm khách chưa có căn cứ."
      }
    ],
    "keyTakeaways": [
      "Khi A đi cùng B, hỏi cả hai chiều: A gây ra B hay B gây ra A.",
      "Nhóm tự chọn dùng nhiều thường vốn khác nhóm còn lại.",
      "Tìm một điểm khác nhau giữa hai cách giải thích mà đo được.",
      "Kiểm bằng thử nhỏ: chia nhóm ngẫu nhiên rồi so.",
      "Chưa kiểm được thì viết \"đi cùng nhau\", đừng viết \"nhờ\"."
    ],
    "practicePrompt": {
      "question": "Báo cáo đào tạo ghi: nhân viên dùng nền tảng học trực tuyến nhiều thì được thăng chức nhiều hơn, nên công ty nên bắt mọi người học. Cách đọc thận trọng nhất là gì?",
      "options": [
        "Có thể người ham tiến thân vốn học nhiều; thử cho một nhóm học rồi so",
        "Học nhiều chắc chắn dẫn tới thăng chức, nên đó là việc bắt buộc nên làm",
        "Thăng chức làm người ta thấy cần học thêm, vì vậy không cần can thiệp gì",
        "Hai việc không có liên hệ vì mỗi người có năng lực hoàn toàn khác nhau"
      ],
      "correct": 0,
      "explanation": "Đáp án đúng nêu chiều ngược và đề xuất cách kiểm bằng so sánh. Đáp án khẳng định nhân quả thì bỏ chiều ngược; đáp án thăng chức gây ra học cũng chỉ chọn một chiều; đáp án cuối phủ nhận cả mối liên hệ."
    },
    "summary": {
      "keyIdea": "Đi cùng nhau chưa nói ai dẫn ai; hãy nêu cả hai chiều rồi tìm cách kiểm.",
      "formula": "Nhóm tự chọn dùng nhiều + giữ lại tốt → hai chiều giải thích → thử nhỏ chia ngẫu nhiên.",
      "commonMistake": "Ép mọi người làm hành vi của nhóm giỏi rồi ngạc nhiên khi kết quả không đổi.",
      "action": "Viết ra hai chiều giải thích cho một mối liên hệ trong báo cáo của bạn."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Lấy một câu trong báo cáo kiểu \"những ai làm X thì đạt Y cao hơn\" (đi họp đều, dùng công cụ mới, tham gia đào tạo). Viết hai dòng: chiều X dẫn tới Y, và chiều Y hoặc một tính cách dẫn tới X. Rồi ghi một việc nhỏ, làm được trong tuần, để phân biệt hai chiều.",
      "secondary": "Mai bạn sẽ được hỏi: hai chiều bạn nêu là gì và việc kiểm bạn đề xuất là gì."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Chiều thứ Sáu, trưởng nhóm sản phẩm chiếu một biểu đồ: người dùng năm tính năng trở lên giữ lại tốt gấp đôi. Cả phòng gật gù rồi bàn chuyện ép khách mới dùng hết. Bài này dạy bạn giơ tay hỏi một câu: có khi nào chiều ngược lại mới đúng?"
      },
      {
        "type": "feynman",
        "title": "Người đi phòng tập",
        "intro": "Những người đến phòng tập sớm và đều đặn thường khoẻ. Nhưng người khoẻ vốn hay đi tập đều hơn, nên ép người yếu đi đủ buổi chưa chắc làm họ khoẻ như người kia.",
        "columns": [
          "Thành phần",
          "Ví dụ đời thường",
          "Trong số liệu"
        ],
        "rows": [
          [
            "Điều thấy",
            "Người đi tập nhiều thì khoẻ",
            "Khách dùng nhiều tính năng thì ở lại lâu"
          ],
          [
            "Chiều ngược",
            "Người khoẻ hăng hái đi tập",
            "Khách gắn bó mới thử nhiều tính năng"
          ],
          [
            "Cách kiểm",
            "Cho một nhóm người yếu đi tập rồi so",
            "Cho một nhóm khách mới dùng thử rồi so"
          ]
        ],
        "oneLiner": "Người ở nhóm \"làm nhiều\" thường vốn đã khác nhóm còn lại."
      },
      {
        "type": "heading",
        "text": "Cùng một con số, hai câu chuyện"
      },
      {
        "type": "paragraph",
        "text": "Câu chuyện một: tính năng hay nên khách ở lại. Câu chuyện hai: khách vốn đã thích sản phẩm nên có sẵn thời gian khám phá tính năng. Cả hai cho ra đúng con số \"dùng nhiều thì giữ tốt\". Chỉ nhìn con số thì bạn không phân biệt được."
      },
      {
        "type": "paragraph",
        "text": "Khái niệm mới ở đây là chiều nhân quả: cái nào đứng trước, cái nào đứng sau. Báo cáo hiếm khi cho biết điều này, nên việc của bạn là hỏi."
      },
      {
        "type": "flow",
        "title": "Tách hai câu chuyện",
        "steps": [
          {
            "label": "Viết cả hai chiều",
            "detail": "Một dòng cho chiều tính năng dẫn tới giữ lại, một dòng cho chiều gắn bó dẫn tới dùng nhiều."
          },
          {
            "label": "Tìm điểm khác nhau đo được",
            "detail": "Ví dụ: khách dùng nhiều ngay tuần đầu có khác khách dùng nhiều sau ba tháng không? Chiều gắn bó thường tới muộn hơn."
          },
          {
            "label": "Thử nhỏ, chia ngẫu nhiên",
            "detail": "Một nhóm khách mới được hướng dẫn dùng tính năng, một nhóm để nguyên, theo dõi cùng khoảng thời gian."
          },
          {
            "label": "So rồi mới quyết",
            "detail": "Hai nhóm giữ lại khác nhau thì tính năng có tác dụng; bằng nhau thì đừng đổ tiền ép."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Nhóm tự chọn",
          "text": "Khách tự mình quyết định dùng nhiều. Nhóm này vốn đã có điểm chung về mức quan tâm và thời gian, nên so họ với nhóm còn lại là so hai loại người."
        },
        "right": {
          "label": "Nhóm chia ngẫu nhiên",
          "text": "Bạn chia khách bằng bốc thăm. Hai nhóm giống nhau ở mọi điều ngoài việc có được hướng dẫn hay không, nên chênh lệch đáng tin hơn."
        }
      },
      {
        "type": "callout",
        "label": "Khi chưa thể thử",
        "text": "Không phải lúc nào cũng thử được. Khi đó, hãy viết vào báo cáo cả hai chiều giải thích và nói rõ chưa phân biệt được, thay vì chọn chiều hợp ý người đề xuất."
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Soát đoạn phân tích người dùng năm tính năng",
        "task": "Số liệu thật chỉ có: nhóm dùng từ năm tính năng trở lên ở lại tới tháng thứ sáu nhiều gấp đôi nhóm còn lại; khách tự chọn dùng bao nhiêu tính năng tuỳ ý; chưa thử ép dùng. Đánh dấu câu AI tự thêm.",
        "segments": [
          {
            "text": "Nhóm dùng từ năm tính năng ở lại tới tháng thứ sáu nhiều gấp đôi nhóm còn lại."
          },
          {
            "text": "Khách tự chọn dùng bao nhiêu tính năng tuỳ ý."
          },
          {
            "text": "Thử nghiệm ép khách mới dùng năm tính năng đã làm giữ lại tăng 40%.",
            "error": "Bản ghi nói rõ chưa từng thử ép; \"tăng 40%\" là kết quả bịa ra."
          },
          {
            "text": "Vì vậy tính năng là nguyên nhân khiến khách ở lại.",
            "error": "Kết luận nhân quả không có trong số liệu; chiều ngược lại, khách gắn bó nên dùng nhiều, cũng khớp."
          },
          {
            "text": "Chưa phân biệt được hai chiều giải thích."
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Họp quyết định ép khách dùng năm tính năng",
        "start": "a",
        "nodes": {
          "a": {
            "text": "Trưởng nhóm đề xuất thêm màn hình bắt mọi khách mới đi qua năm tính năng, dự kiến tốn hai tuần của ba người. Bạn cầm biểu đồ giữ lại.",
            "choices": [
              {
                "label": "Ủng hộ làm luôn cho cả khách mới, vì biểu đồ rất rõ",
                "next": "bad1"
              },
              {
                "label": "Đề xuất chỉ thêm màn hình cho một nửa khách mới, nửa kia để nguyên, theo dõi một tháng",
                "next": "b"
              }
            ]
          },
          "bad1": {
            "text": "Sau hai tuần làm, giữ lại của khách mới không đổi. Hai tuần công của ba người đã đi vào một tính năng không có tác dụng.",
            "ending": "bad"
          },
          "b": {
            "text": "Một tháng sau hai nhóm đã có số. Trưởng nhóm hỏi bạn muốn báo cáo thế nào.",
            "choices": [
              {
                "label": "Báo cả hai nhóm, nói rõ chênh lệch bao nhiêu và nhóm đủ lớn hay chưa",
                "next": "good"
              },
              {
                "label": "Chỉ báo nhóm có màn hình vì kết quả đẹp hơn",
                "next": "bad2"
              }
            ]
          },
          "bad2": {
            "text": "Bỏ nhóm so sánh đi thì con số chỉ còn là một ý kiến. Quý sau đội lại tranh cãi như cũ.",
            "ending": "bad"
          },
          "good": {
            "text": "Hai nhóm được báo cạnh nhau: màn hình có tác dụng nhỏ, không đáng mở rộng cho cả khách cũ. Quyết định dựa trên bằng chứng, không phải biểu đồ tự chọn.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Mỗi lần nghe \"ai làm X thì tốt hơn\", hãy nhớ hỏi chiều ngược.",
          "Bài sau: biểu đồ cắt cụt, khi trục số không bắt đầu từ 0."
        ]
      }
    ]
  },
  {
    "track": "personal",
    "isFundamental": false,
    "difficulty": "Trung bình",
    "duration": "10 phút",
    "id": 2677,
    "slug": "bieu-do-cat-cut-truc-so-khong-bat-dau-tu-0",
    "title": "Chặng 63, Bài 18: Biểu đồ cắt cụt: trục số không bắt đầu từ 0",
    "subtitle": "Cột B trông cao gấp ba, nhưng chênh thật chỉ vài phần trăm.",
    "emoji": "📊",
    "whyItMatters": "Mắt người so chiều cao cột chứ không đọc nhãn trục. Một biểu đồ cắt cụt làm khác biệt nhỏ trông như một cú nhảy, và người ra quyết định nhớ hình chứ không nhớ con số.",
    "openingQuestion": "Biểu đồ hai cột: cột A cao bằng một phần ba cột B, trục dọc bắt đầu từ 48 và kết thúc ở 58. Bạn nên làm gì trước khi tin cột B hơn hẳn cột A?",
    "openingOptions": [
      "Đọc giá trị thật của hai cột và xem trục có bắt đầu từ 0 không",
      "Đếm xem biểu đồ dùng bao nhiêu màu sắc khác nhau để thể hiện số liệu",
      "Hỏi người làm biểu đồ đã dùng phần mềm nào để dựng hình",
      "Kiểm tra cột nào được tô đậm hơn và ở vị trí nổi bật hơn"
    ],
    "correctOption": 0,
    "explanation": "Trục bắt đầu từ 48 cắt bỏ 48 đơn vị đầu của cả hai cột, nên phần còn lại phóng đại khác biệt. Nếu hai giá trị thật là 50 và 56, cột B chỉ hơn cột A khoảng 12%, trong khi hình cho thấy gần gấp ba. Màu sắc, phần mềm hay vị trí tô đậm không cho bạn biết hai cột thật sự chênh bao nhiêu; giá trị và điểm bắt đầu của trục mới cho biết.",
    "diagram": [
      {
        "label": "Thấy cột B cao hơn hẳn",
        "arrow": true
      },
      {
        "label": "Đọc nhãn trục: bắt đầu từ đâu",
        "arrow": true
      },
      {
        "label": "Đọc giá trị thật của từng cột",
        "arrow": true
      },
      {
        "label": "Tính chênh thật rồi vẽ lại từ 0"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Một phòng vận hành vẽ biểu đồ thời gian xử lý đơn: tuần trước 50 phút, tuần này 47 phút, trục chỉ chạy từ 46 tới 51. Cột tuần này trông thấp bằng một phần tư cột cũ, nhìn như cải thiện vượt bậc. Khi vẽ lại từ 0, hai cột chỉ hơn kém nhau 6%. Cải thiện vẫn có thật nhưng nhỏ hơn hình rất nhiều. (Số liệu để minh hoạ.)"
    },
    "quiz": [
      {
        "question": "Trục dọc bắt đầu từ 48, cột A = 50, cột B = 56. Cột B trông cao gấp mấy lần cột A?",
        "options": [
          "Gấp 4 lần (vì 56 - 48 = 8 và 50 - 48 = 2, 8 : 2 = 4)",
          "Gấp 1,12 lần (vì 56 : 50 = 1,12, tính trên giá trị thật)",
          "Gấp 1,2 lần (vì 56 - 50 = 6 rồi chia cho 5 là 1,2)",
          "Gấp 56 lần (vì lấy giá trị cột B chia cho đơn vị của trục)"
        ],
        "correct": 0,
        "explanation": "Chiều cao vẽ ra là phần vượt quá điểm bắt đầu của trục: 8 đơn vị cho B và 2 cho A nên trông B cao gấp 4 lần. Giá trị thật chỉ hơn 1,12 lần, đó là con số cần ghi trong báo cáo."
      },
      {
        "question": "Chênh thật giữa 50 và 56 là bao nhiêu phần trăm so với 50?",
        "options": [
          "Khoảng 12% (6 chia cho 50)",
          "6% (= 56 - 50, bỏ quên bước chia cho 50)",
          "300% (lấy chiều cao nhìn thấy trên trục cắt cụt)",
          "112% (lấy 56 chia 50 rồi quên trừ đi phần 100%)"
        ],
        "correct": 0,
        "explanation": "Chênh là 56 - 50 = 6, rồi 6 chia 50 = 0,12, tức 12%. Đáp án 6% quên chia, 300% lấy chênh lệch từ hình cắt cụt, còn 112% là tỷ lệ chứ chưa phải mức tăng."
      },
      {
        "question": "Khi nào biểu đồ cột bắt đầu từ số khác 0 là chấp nhận được?",
        "options": [
          "Khi cột chỉ là mốc để so, không dùng chiều cao để so sánh độ lớn",
          "Khi người xem đã biết sẵn các con số trong bảng phía dưới trang",
          "Khi khác biệt thật sự nhỏ nên cần phóng to cho dễ thấy hơn",
          "Khi biểu đồ đẹp hơn nếu cắt bớt phần thấp của trục số"
        ],
        "correct": 0,
        "explanation": "Cột là cách so độ lớn bằng chiều cao, nên cắt trục làm sai phép so. Chỉ khi chiều cao không còn là thứ người xem so sánh, ví dụ biểu đồ đường theo dõi biến động, cắt mới tạm chấp nhận. Muốn thấy khác biệt nhỏ thì ghi số chênh, đừng phóng to."
      },
      {
        "question": "Cách sửa trung thực nhất cho biểu đồ cắt cụt là gì?",
        "options": [
          "Vẽ lại trục từ 0 và ghi rõ số chênh thật trên hình",
          "Giữ trục cắt nhưng thêm mũi tên và chữ \"tăng mạnh\" cạnh cột",
          "Giữ trục cắt nhưng đổi màu cột B sang màu đỏ cho nổi bật",
          "Xoá nhãn trục đi để người xem khỏi bị phân tâm bởi con số"
        ],
        "correct": 0,
        "explanation": "Vẽ từ 0 làm chiều cao phản ánh đúng độ lớn, và ghi số chênh để người xem thấy cả hai thông tin. Mũi tên, màu đỏ hay xoá nhãn đều làm khác biệt trông lớn hoặc khó kiểm hơn."
      },
      {
        "question": "Bạn nhận biểu đồ cột mà không ghi giá trị. Nên làm gì đầu tiên?",
        "options": [
          "Đọc điểm bắt đầu của trục rồi xin số gốc của từng cột",
          "So chiều cao cột bằng mắt và kết luận theo tỷ lệ chiều cao",
          "Đếm số vạch chia trên trục rồi lấy số vạch làm giá trị cột",
          "Tin biểu đồ vì hình vẽ chắc chắn được làm từ số thật"
        ],
        "correct": 0,
        "explanation": "Không có giá trị thì chỉ có hai việc đáng làm: xem trục bắt đầu ở đâu và xin số gốc. So bằng mắt hay đếm vạch không cho biết cột ứng với bao nhiêu, còn hình vẽ từ số thật vẫn có thể bị cắt."
      }
    ],
    "keyTakeaways": [
      "Biểu đồ cột phải bắt đầu từ 0 vì mắt so chiều cao.",
      "Cắt trục phóng đại khác biệt: 50 và 56 có thể trông gấp 4.",
      "Đọc nhãn trục trước khi đọc hình.",
      "Khác biệt thật = (B - A) chia A.",
      "Muốn nhấn mạnh chênh nhỏ thì ghi số chênh, đừng cắt trục."
    ],
    "practicePrompt": {
      "question": "Một cột ghi 200 triệu, cột kia 220 triệu; trục bắt đầu từ 190. Hai cột trông chênh bao nhiêu lần và chênh thật là bao nhiêu?",
      "options": [
        "Trông gấp 3 lần (30 : 10); chênh thật 10%",
        "Trông gấp 1,1 lần; chênh thật 10 triệu nên là 10% trên trục đó",
        "Trông gấp 2 lần (220 : 110); chênh thật 20% theo tỷ lệ đó",
        "Trông bằng nhau vì hai cột cùng nằm trên một trục chung"
      ],
      "correct": 0,
      "explanation": "Phần vượt điểm bắt đầu là 10 và 30 nên hình gấp 3 lần, còn chênh thật là (220 - 200) chia 200 = 10%. Các đáp án khác đều nhầm hình với giá trị thật hoặc tính sai phép chia."
    },
    "summary": {
      "keyIdea": "Chiều cao cột chỉ trung thực khi trục bắt đầu từ 0.",
      "formula": "Chênh thật = (B - A) ÷ A; hình trông gấp (B - mốc) ÷ (A - mốc).",
      "commonMistake": "Nhớ hình cột thay vì nhớ giá trị và điểm bắt đầu của trục.",
      "action": "Với mỗi biểu đồ cột bạn gặp, liếc điểm bắt đầu của trục trước tiên."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Tìm một biểu đồ cột thật trong báo cáo hoặc slide của phòng bạn. Ghi lại điểm bắt đầu của trục và giá trị từng cột. Tính chênh thật bằng (B - A) chia A, so với mức hình đang gợi, rồi vẽ lại bản từ 0 (tay hoặc bảng tính) kèm một dòng ghi chênh thật.",
      "secondary": "Mai bạn sẽ được hỏi: trục bắt đầu từ đâu, và chênh thật khác chênh nhìn thấy bao nhiêu."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Sếp chiếu slide: hai cột, cột bên phải cao gấp ba cột bên trái, tiêu đề ghi \"vượt trội\". Không ai đọc dòng chữ nhỏ dưới trục. Nếu bạn là người đọc dòng ấy, bài này cho bạn cách biến cảm giác \"hình kỳ lạ\" thành một con số cụ thể."
      },
      {
        "type": "feynman",
        "title": "Thước đo bị cắt đầu",
        "intro": "Hai đứa trẻ cao 150 cm và 156 cm, nhưng ai đó cắt mất 148 cm dưới chân của cả hai rồi bày phần còn lại ra. Một đứa còn 2 cm, đứa kia còn 8 cm, nhìn như đứa này cao gấp bốn.",
        "columns": [
          "Thành phần",
          "Ví dụ đời thường",
          "Trong số liệu"
        ],
        "rows": [
          [
            "Điều thấy",
            "Cao gấp bốn lần",
            "Cột B trông cao gấp bốn lần cột A"
          ],
          [
            "Sự thật",
            "Chỉ hơn nhau 6 cm trên 150",
            "Chênh thật chỉ 12%"
          ],
          [
            "Cách kiểm",
            "Đo lại từ sàn nhà",
            "Xem trục có bắt đầu từ 0 không"
          ]
        ],
        "oneLiner": "Cắt trục là cắt bớt phần chung rồi bày phần chênh ra như thể nó là tất cả."
      },
      {
        "type": "heading",
        "text": "Đọc trục trước khi đọc hình"
      },
      {
        "type": "paragraph",
        "text": "Biểu đồ cột nhờ mắt so chiều cao. Mắt không đọc nhãn trục, nên khi trục bắt đầu từ một số lớn hơn 0, mắt bị đánh lừa. Bạn chỉ cần một thói quen: nhìn nhãn thấp nhất của trục trước khi nhìn cột."
      },
      {
        "type": "paragraph",
        "text": "Khái niệm mới: trục cắt cụt là trục bắt đầu từ một số khác 0. Kéo thanh trượt bên dưới để thấy cùng hai giá trị (A = 50, B tuỳ chọn) hiện ra ra sao khi điểm bắt đầu của trục dịch lên."
      },
      {
        "type": "chart",
        "title": "Cột B trông cao gấp mấy lần cột A khi trục bắt đầu ở mốc khác nhau",
        "caption": "Cột A = 50; cột B lấy theo thanh trượt. Mỗi điểm là một mốc bắt đầu của trục. Số liệu minh hoạ. Điểm đầu tiên (mốc 0) là hình trung thực.",
        "kind": "line",
        "xLabel": "Mốc bắt đầu của trục",
        "yLabel": "Số lần B trông cao hơn A",
        "x": {
          "from": 0,
          "to": 48,
          "step": 4
        },
        "params": [
          {
            "id": "b",
            "label": "Giá trị thật của cột B",
            "min": 51,
            "max": 60,
            "step": 1,
            "value": 56,
            "unit": ""
          }
        ],
        "series": [
          {
            "label": "Hình nhìn thấy",
            "expr": "(b - x) / (50 - x)"
          }
        ]
      },
      {
        "type": "flow",
        "title": "Sửa một biểu đồ cắt cụt",
        "steps": [
          {
            "label": "Đọc điểm bắt đầu của trục",
            "detail": "Nhãn thấp nhất là 0 hay một số khác? Ghi lại số đó."
          },
          {
            "label": "Đọc giá trị thật của hai cột",
            "detail": "Xin số gốc nếu biểu đồ không ghi. Không có số thì không kết luận được."
          },
          {
            "label": "Tính chênh thật",
            "detail": "(B - A) ÷ A. Với 50 và 56 là 6 ÷ 50 = 12%."
          },
          {
            "label": "Vẽ lại từ 0 và ghi số chênh",
            "detail": "Để chiều cao khớp độ lớn, đặt số chênh thật cạnh cột."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Hình cắt cụt",
          "text": "Trục từ 48 tới 58. Cột B trông gấp 4 lần cột A, kèm tiêu đề \"vượt trội\". Người xem nhớ \"B áp đảo\"."
        },
        "right": {
          "label": "Hình từ 0",
          "text": "Trục từ 0 tới 60. Hai cột gần bằng nhau, cạnh đó ghi \"B hơn A 12%\". Người xem nhớ con số thật."
        }
      },
      {
        "type": "callout",
        "label": "Ngoại lệ hẹp",
        "text": "Biểu đồ đường theo dõi biến động có thể cắt trục vì mắt so độ dốc, không so chiều cao. Khi đó hãy ghi chú \"trục bắt đầu từ ...\" ngay trên hình để người xem không hiểu nhầm."
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Soát nhận xét dưới biểu đồ doanh thu hai chi nhánh",
        "task": "Số liệu thật: chi nhánh Bắc 50 tỷ, chi nhánh Nam 56 tỷ (minh hoạ); biểu đồ có trục bắt đầu từ 48. Đánh dấu câu AI tự thêm.",
        "segments": [
          {
            "text": "Chi nhánh Bắc đạt 50 tỷ đồng, chi nhánh Nam đạt 56 tỷ đồng."
          },
          {
            "text": "Biểu đồ dùng trục bắt đầu từ 48 nên hình phóng đại khác biệt."
          },
          {
            "text": "Chi nhánh Nam cao gấp bốn lần chi nhánh Bắc.",
            "error": "Gấp bốn chỉ là chiều cao trông thấy trên trục cắt; doanh thu thật hơn nhau 12%."
          },
          {
            "text": "Chênh lệch thật là 6 tỷ đồng, tức 12% so với chi nhánh Bắc."
          },
          {
            "text": "Chi nhánh Nam luôn dẫn đầu cả năm trước.",
            "error": "Không có số liệu của năm trước trong bản ghi; câu này AI tự thêm."
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Slide họp quý có cột cắt cụt",
        "start": "a",
        "nodes": {
          "a": {
            "text": "Bạn nhận slide của đồng nghiệp: hai cột, một cột cao gấp ba cột kia, tiêu đề \"Dự án mới vượt xa dự án cũ\". Trục không ghi nhãn thấp nhất.",
            "choices": [
              {
                "label": "Chiếu nguyên bản này vì sắp họp, không còn thời gian",
                "next": "bad1"
              },
              {
                "label": "Hỏi đồng nghiệp điểm bắt đầu của trục và hai con số gốc",
                "next": "b"
              }
            ]
          },
          "bad1": {
            "text": "Giám đốc tài chính hỏi con số hai cột rồi nhận ra chênh lệch chỉ vài phần trăm. Cả slide mất uy tín.",
            "ending": "bad"
          },
          "b": {
            "text": "Đồng nghiệp cho biết trục bắt đầu từ 48 và hai cột là 50 và 56. Còn 10 phút.",
            "choices": [
              {
                "label": "Vẽ lại từ 0 và đổi tiêu đề thành \"Dự án mới cao hơn 12%\"",
                "next": "good"
              },
              {
                "label": "Giữ hình, chỉ thêm mũi tên đỏ và chữ \"tăng vọt\"",
                "next": "bad2"
              }
            ]
          },
          "bad2": {
            "text": "Mũi tên làm hình thêm gây hiểu nhầm. Người xem vẫn nhớ \"gấp ba\".",
            "ending": "bad"
          },
          "good": {
            "text": "Slide mới nêu đúng 12%. Có người hỏi 12% có đáng không, cuộc họp bàn về chuyện thật thay vì một hình đánh lừa.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Trước khi đọc cột, hãy đọc trục.",
          "Bài sau: bộ năm câu hỏi ngắn khi nhận báo cáo số từ người khác."
        ]
      }
    ]
  },
  {
    "track": "personal",
    "isFundamental": false,
    "difficulty": "Trung bình",
    "duration": "10 phút",
    "id": 2678,
    "slug": "nam-cau-hoi-khi-nhan-bao-cao-tu-nguoi-khac",
    "title": "Chặng 63, Bài 19: Năm câu hỏi khi nhận một báo cáo số từ người khác",
    "subtitle": "Số gốc, kỳ so sánh, nhóm bị loại, ai đo, đo thế nào: năm câu, chưa tới hai phút.",
    "emoji": "❓",
    "whyItMatters": "Bạn không có thời gian dựng lại từng báo cáo, nhưng bạn có hai phút để hỏi. Năm câu hỏi cố định bắt được phần lớn lỗi phổ biến và cũng cho người viết thấy bạn đọc kỹ.",
    "openingQuestion": "Đồng nghiệp gửi báo cáo \"tỷ lệ hài lòng của khách tăng lên 92%\", sắp họp. Bạn chỉ kịp hỏi một câu. Câu nào đem lại nhiều thông tin nhất?",
    "openingOptions": [
      "92% là trên bao nhiêu người, và so với kỳ nào, nhóm nào",
      "Báo cáo này được làm bằng công cụ nào và mất bao lâu",
      "Tại sao lại chọn màu xanh lá để thể hiện chỉ số hài lòng",
      "Ai là người trình bày phần này trong cuộc họp hôm nay"
    ],
    "correctOption": 0,
    "explanation": "Một tỷ lệ phần trăm không nói gì khi thiếu số gốc và điểm so sánh: 92% trên 12 người khác hẳn 92% trên 1.200 người, và \"tăng\" so với kỳ nào cũng quyết định ý nghĩa. Câu hỏi về công cụ, màu sắc hay người trình bày không giúp bạn đánh giá con số. Ba thứ cần biết là số gốc, kỳ so sánh và nhóm được tính.",
    "diagram": [
      {
        "label": "Số gốc: trên bao nhiêu",
        "arrow": true
      },
      {
        "label": "Kỳ so sánh: so với lúc nào",
        "arrow": true
      },
      {
        "label": "Nhóm bị loại: ai không được tính",
        "arrow": true
      },
      {
        "label": "Ai đo và đo thế nào",
        "arrow": false
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Một báo cáo chăm sóc khách hàng ghi \"hài lòng 92%\". Hỏi năm câu, hoá ra khảo sát gửi cho 25 khách vừa được giải quyết xong khiếu nại, 23 người trả lời, và khách đã bỏ đi không được hỏi. Con số không sai, nhưng nó chỉ nói về những khách còn ở lại. (Tình huống và số liệu để minh hoạ.)"
    },
    "quiz": [
      {
        "question": "Báo cáo ghi \"khiếu nại tăng 100%\". Câu hỏi đầu tiên nên là gì?",
        "options": [
          "Số khiếu nại thật là bao nhiêu ở kỳ trước và kỳ này",
          "Khiếu nại nào do nhân viên mới xử lý nhiều nhất trong tháng",
          "Có nên gửi email xin lỗi toàn bộ những khách đã khiếu nại không",
          "Báo cáo có dùng biểu đồ tròn hay biểu đồ cột cho dễ nhìn hơn"
        ],
        "correct": 0,
        "explanation": "Tăng 100% từ 2 lên 4 là rất khác tăng 100% từ 2.000 lên 4.000; số gốc cho biết tầm vóc. Ba câu còn lại hỏi về người xử lý, hành động sau đó hoặc hình thức, chưa giúp đánh giá con số."
      },
      {
        "question": "Vì sao phải hỏi \"so với kỳ nào\"?",
        "options": [
          "Vì kỳ trước có thể bất thường nên tăng hay giảm đều gây hiểu nhầm",
          "Vì mọi báo cáo bắt buộc phải có đúng hai kỳ để so sánh với nhau",
          "Vì kỳ so sánh càng xa thì con số càng chính xác hơn cho phép",
          "Vì so sánh với kỳ trước luôn cho kết quả tốt hơn so với kỳ cùng năm"
        ],
        "correct": 0,
        "explanation": "Một tháng đặc biệt thấp (nghỉ lễ, sự cố) làm tháng sau tăng đẹp dù không có gì cải thiện. Không có quy tắc bắt buộc hai kỳ, kỳ xa không chính xác hơn, và kỳ trước không luôn cho kết quả đẹp."
      },
      {
        "question": "\"Nhóm nào bị loại\" giúp bắt lỗi nào?",
        "options": [
          "Con số chỉ mô tả những người còn lại sau khi bỏ những người không hợp ý",
          "Con số được làm tròn nên không khớp với bảng chi tiết đính kèm",
          "Con số được nhập bằng tay nên có thể bị gõ sai vài chữ số",
          "Con số nằm trong trang cuối nên ít người đọc thấy khi duyệt"
        ],
        "correct": 0,
        "explanation": "Loại bớt nhóm (khách đã bỏ đi, đơn bị huỷ, nhân viên nghỉ việc) làm con số đẹp hơn thực tế mà người viết có khi không cố ý. Làm tròn, gõ sai hay vị trí trang là lỗi khác."
      },
      {
        "question": "Câu \"ai đo và đo thế nào\" áp dụng thế nào cho chỉ số hài lòng?",
        "options": [
          "Hỏi ai gửi khảo sát, gửi cho ai, và bao nhiêu phần trăm trả lời",
          "Hỏi khảo sát dùng phông chữ nào và màu nào để khách dễ đọc",
          "Hỏi khảo sát được dịch sang bao nhiêu ngôn ngữ trên toàn hệ thống",
          "Hỏi số câu hỏi có đủ nhiều để báo cáo đạt chuẩn chất lượng"
        ],
        "correct": 0,
        "explanation": "Người đo và cách đo quyết định con số. Nếu chỉ gửi cho khách vừa được phục vụ tốt, tỷ lệ hài lòng sẽ cao giả tạo; tỷ lệ trả lời thấp cũng làm mẫu lệch. Phông chữ, ngôn ngữ hay số câu hỏi không chạm tới điều đó."
      },
      {
        "question": "Nhận báo cáo phút chót, bạn hỏi được năm câu. Hành động nào sau đó là hợp lý?",
        "options": [
          "Ghi câu trả lời thành một dòng chú thích cạnh con số trong báo cáo",
          "Giữ câu trả lời trong đầu rồi nhắc lại nếu có ai hỏi lúc họp",
          "Chỉ hỏi khi số liệu trông xấu, còn số đẹp thì cứ dùng luôn",
          "Chuyển toàn bộ năm câu hỏi cho sếp để sếp tự đi hỏi người viết và chờ kết quả"
        ],
        "correct": 0,
        "explanation": "Ghi chú cạnh con số giữ lại thông tin cho mọi người đọc sau, không bị mất khi bạn quên. Hỏi chỉ khi số xấu thì tạo thiên kiến, và chuyển cho sếp là đẩy việc của mình đi."
      }
    ],
    "keyTakeaways": [
      "Năm câu: số gốc, kỳ so sánh, nhóm bị loại, ai đo, đo thế nào.",
      "Phần trăm không có số gốc thì chưa là thông tin.",
      "Kỳ so sánh bất thường làm tăng hay giảm đều gây hiểu nhầm.",
      "Nhóm bị loại thường là nhóm làm con số xấu đi.",
      "Ghi câu trả lời thành chú thích cạnh con số."
    ],
    "practicePrompt": {
      "question": "Báo cáo ghi \"thời gian xử lý đơn giảm 30%\". Bạn chỉ hỏi được một câu; câu nào đáng hỏi nhất?",
      "options": [
        "Giảm từ bao nhiêu xuống bao nhiêu, đo trên những đơn nào",
        "Ai là người đã nghĩ ra sáng kiến giúp xử lý đơn nhanh hơn",
        "Báo cáo này dự kiến gửi cho bao nhiêu người đọc sau cuộc họp",
        "Có nên viết thêm lời cảm ơn các bạn tham gia trong phần cuối"
      ],
      "correct": 0,
      "explanation": "Giảm 30% chỉ có nghĩa khi biết từ đâu xuống đâu và tính trên đơn nào (có thể đã loại các đơn chậm). Ba câu còn lại hỏi người, số người đọc và lời cảm ơn, không cho biết con số có đáng tin hay không."
    },
    "summary": {
      "keyIdea": "Năm câu hỏi ngắn thay cho việc dựng lại cả báo cáo.",
      "formula": "Số gốc + kỳ so sánh + nhóm bị loại + ai đo + đo thế nào = con số đọc được.",
      "commonMistake": "Chỉ hỏi khi số liệu trông xấu, còn số đẹp thì dùng luôn.",
      "action": "In năm câu hỏi ra giấy nhỏ, dán cạnh màn hình."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Dán năm câu hỏi (số gốc, kỳ so sánh, nhóm bị loại, ai đo, đo thế nào) lên một ghi chú. Lấy một báo cáo bạn vừa nhận trong tuần, trả lời từng câu bằng một dòng dựa trên chính báo cáo đó, chỗ nào không tìm được thì đánh dấu \"cần hỏi\" và nhắn người viết.",
      "secondary": "Mai bạn sẽ được hỏi: câu nào trong năm câu báo cáo của bạn chưa trả lời được."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Mười phút trước họp, một đồng nghiệp gửi báo cáo có một con số đẹp: \"hài lòng tăng lên 92%\". Bạn không kịp dựng lại bảng tính. Năm câu hỏi ngắn trong bài này là thứ bạn có thể dùng ngay cả khi chỉ có hai phút."
      },
      {
        "type": "feynman",
        "title": "Mua một chiếc xe cũ",
        "intro": "Trước khi mua xe cũ, bạn hỏi vài câu: đã đi bao nhiêu cây số, so với xe cùng đời thì sao, có tai nạn nào không ghi trong giấy, ai kiểm tra, kiểm tra thế nào. Bạn không cần là thợ máy; câu hỏi tốt bắt được phần lớn rắc rối.",
        "columns": [
          "Thành phần",
          "Ví dụ đời thường",
          "Trong số liệu"
        ],
        "rows": [
          [
            "Số gốc",
            "Đã đi bao nhiêu cây số",
            "Con số này tính trên bao nhiêu"
          ],
          [
            "Kỳ so sánh",
            "So với xe cùng đời",
            "So với kỳ nào, nhóm nào"
          ],
          [
            "Nhóm bị loại",
            "Tai nạn bị giấu trong giấy tờ",
            "Ai không được tính trong con số"
          ],
          [
            "Ai đo, đo thế nào",
            "Thợ nào kiểm và kiểm gì",
            "Ai lấy số liệu, bằng cách nào"
          ]
        ],
        "oneLiner": "Năm câu hỏi ngắn cho bạn biết phần lớn chuyện con số không tự kể."
      },
      {
        "type": "heading",
        "text": "Năm câu, theo thứ tự"
      },
      {
        "type": "list",
        "items": [
          "Số gốc: con số này tính trên bao nhiêu (bao nhiêu khách, đơn, người trả lời)?",
          "Kỳ so sánh: so với kỳ nào, và kỳ đó có bình thường không?",
          "Nhóm bị loại: ai hoặc cái gì không được tính vào?",
          "Ai đo: người lấy số liệu có lợi ích gì trong kết quả không?",
          "Đo thế nào: khảo sát, hệ thống tự ghi, hay ước lượng?"
        ]
      },
      {
        "type": "paragraph",
        "text": "Bạn không cần hỏi cả năm câu mọi lúc. Hãy hỏi câu mà con số trước mặt dễ bị sai nhất: phần trăm thì hỏi số gốc, \"tăng\" thì hỏi kỳ so sánh, trung bình thì hỏi nhóm bị loại."
      },
      {
        "type": "flow",
        "title": "Hai phút trước cuộc họp",
        "steps": [
          {
            "label": "Đọc con số đẹp nhất",
            "detail": "Số gây ấn tượng nhất trong báo cáo thường cần kiểm kỹ nhất."
          },
          {
            "label": "Chọn một hai câu phù hợp",
            "detail": "Phần trăm: số gốc. Tăng giảm: kỳ so sánh. Trung bình: nhóm bị loại."
          },
          {
            "label": "Nhắn hỏi người viết",
            "detail": "Một tin ngắn: \"92% này tính trên bao nhiêu khách, so với tháng nào?\""
          },
          {
            "label": "Ghi câu trả lời cạnh số",
            "detail": "Một dòng chú thích giúp mọi người đọc sau đều thấy."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Báo cáo chưa qua năm câu",
          "text": "\"Hài lòng 92%, tăng so với kỳ trước.\" Người đọc không biết 92% là bao nhiêu người, kỳ trước là lúc nào, và ai không được hỏi."
        },
        "right": {
          "label": "Báo cáo đã qua năm câu",
          "text": "\"Hài lòng 92% (23 trên 25 khách trả lời), so với 88% tháng 8; không gồm khách đã bỏ đi; khảo sát gửi sau khi giải quyết.\" Người đọc tự đánh giá được."
        }
      },
      {
        "type": "callout",
        "label": "Giọng hỏi",
        "text": "Hỏi để hiểu, không để bắt lỗi. Một câu như \"92% này tính trên bao nhiêu khách vậy?\" khiến người viết thoải mái bổ sung hơn là \"con số này có đúng không?\"."
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Soát phần trả lời của đồng nghiệp về con số 92%",
        "task": "Đồng nghiệp trả lời qua tin nhắn, AI tóm tắt lại. Tin nhắn thật chỉ có: 23 trên 25 khách trả lời khảo sát là hài lòng; khảo sát gửi sau khi đóng khiếu nại; so với tháng 8 (88%); khách đã hủy dịch vụ không được gửi. Đánh dấu câu AI tự thêm.",
        "segments": [
          {
            "text": "23 trên 25 khách trả lời khảo sát là hài lòng."
          },
          {
            "text": "Khảo sát chỉ gửi sau khi khiếu nại đã được đóng."
          },
          {
            "text": "Kết quả tháng 8 là 88%, khảo sát tháng 8 cũng có 25 khách."
          },
          {
            "text": "Khách đã hủy dịch vụ không được gửi khảo sát."
          },
          {
            "text": "Toàn bộ khách hàng của công ty đều hài lòng ở mức 92%.",
            "error": "Mới chỉ khảo sát 25 khách, chưa phải toàn bộ khách của công ty; AI khái quát quá mức."
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Con số 92% trước cuộc họp",
        "start": "a",
        "nodes": {
          "a": {
            "text": "Còn 10 phút. Đồng nghiệp gửi báo cáo có dòng \"hài lòng tăng lên 92%\". Bạn cần quyết định làm gì.",
            "choices": [
              {
                "label": "Trích nguyên con số vào slide của mình cho kịp",
                "next": "bad1"
              },
              {
                "label": "Nhắn hỏi số gốc, kỳ so sánh và nhóm nào không được khảo sát",
                "next": "b"
              }
            ]
          },
          "bad1": {
            "text": "Trong họp, giám đốc hỏi 92% là trên bao nhiêu khách. Bạn không biết, và cuộc họp dừng để hỏi lại.",
            "ending": "bad"
          },
          "b": {
            "text": "Đồng nghiệp trả lời: 23 trên 25 khách, khách đã hủy không được gửi khảo sát. Còn 5 phút.",
            "choices": [
              {
                "label": "Ghi vào slide: \"92% (23/25 khách trả lời, không gồm khách đã hủy)\"",
                "next": "good"
              },
              {
                "label": "Bỏ con số đi vì mẫu nhỏ quá, slide chỉ còn lời nhận xét",
                "next": "bad2"
              }
            ]
          },
          "bad2": {
            "text": "Slide mất phần có thật. Con số vẫn dùng được nếu ghi rõ giới hạn của nó.",
            "ending": "bad"
          },
          "good": {
            "text": "Giám đốc hỏi lại, bạn trả lời ngay. Con số được dùng đúng với tầm vóc của nó.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Năm câu hỏi, hai phút: số gốc, kỳ, nhóm bị loại, ai đo, đo thế nào.",
          "Bài cuối: thẩm tra một báo cáo thật của phòng bạn."
        ]
      }
    ]
  },
  {
    "track": "personal",
    "isFundamental": false,
    "difficulty": "Trung bình",
    "duration": "10 phút",
    "id": 2679,
    "slug": "capstone-tham-tra-mot-bao-cao-that-cua-phong-ban",
    "title": "Chặng 63, Bài 20: Capstone: thẩm tra một báo cáo thật của phòng bạn",
    "subtitle": "Gom số gốc, so sánh, mẫu, nhân quả thành một ghi chú một trang gửi đồng nghiệp.",
    "emoji": "🧾",
    "whyItMatters": "Biết năm câu hỏi chưa đủ; giá trị nằm ở lúc bạn áp vào báo cáo thật và đưa ghi chú ngắn cho người viết. Đó cũng là thói quen làm bạn thành người đọc số đáng tin trong phòng.",
    "openingQuestion": "Bạn thẩm tra xong một báo cáo và thấy ba chỗ đáng hỏi. Ghi chú gửi đồng nghiệp nên có gì để được đón nhận và dùng được?",
    "openingOptions": [
      "Từng chỗ nghi ngờ kèm câu hỏi cụ thể và cách kiểm đề xuất",
      "Một nhận xét chung rằng báo cáo cần làm lại cẩn thận hơn nhiều",
      "Danh sách lỗi chính tả và lỗi định dạng của cả báo cáo",
      "Lời khuyên nên chuyển phần phân tích sang người khác làm"
    ],
    "correctOption": 0,
    "explanation": "Ghi chú hữu ích chỉ đúng chỗ, nêu câu hỏi cụ thể và đề xuất cách kiểm để người viết biết làm gì tiếp. Nhận xét chung \"làm lại cẩn thận hơn\" không chỉ ra chỗ nào. Lỗi chính tả làm lạc hướng khỏi phần con số, còn đề nghị đổi người làm là phán xét chứ không giúp báo cáo tốt lên.",
    "diagram": [
      {
        "label": "Rà số gốc và tỷ lệ",
        "arrow": true
      },
      {
        "label": "Rà so sánh và kỳ",
        "arrow": true
      },
      {
        "label": "Rà mẫu, nhóm bị loại, nhân quả",
        "arrow": true
      },
      {
        "label": "Viết ghi chú một trang cho người viết"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Chị Hà, trưởng nhóm vận hành, rà báo cáo quý của phòng mình và viết ghi chú một trang: ba câu hỏi về số gốc, hai về kỳ so sánh, một về câu \"nhờ dự án X\". Người viết bổ sung số gốc và đổi câu nhân quả thành \"đi cùng nhau\". Báo cáo quý sau có mục \"giới hạn của số liệu\" ngay từ đầu. (Tình huống minh hoạ.)"
    },
    "quiz": [
      {
        "question": "Thứ tự rà hợp lý cho một báo cáo thật là gì?",
        "options": [
          "Số gốc, rồi kỳ so sánh, rồi mẫu và nhóm bị loại, rồi nhân quả",
          "Nhân quả trước vì đó là phần người đọc quan tâm nhiều nhất",
          "Định dạng và biểu đồ trước rồi mới tới các con số ở phần sau",
          "Đọc phần kết luận trước rồi tìm số liệu để xác nhận kết luận"
        ],
        "correct": 0,
        "explanation": "Đi từ nền lên: số gốc và kỳ so sánh sai thì mọi phân tích sau đó đều sai theo. Bắt đầu từ nhân quả, định dạng hay kết luận dễ khiến bạn tin điều cần kiểm."
      },
      {
        "question": "Ghi chú thẩm tra nên dài cỡ nào?",
        "options": [
          "Một trang, mỗi chỗ nghi ngờ vài dòng",
          "Ba trang, đủ để trích nguyên các đoạn báo cáo cần bàn",
          "Nửa dòng, chỉ cần viết chung là \"cần kiểm lại số liệu\"",
          "Mười trang như một báo cáo phản biện đầy đủ theo chuẩn học thuật"
        ],
        "correct": 0,
        "explanation": "Một trang đủ để nêu các chỗ đáng hỏi mà người viết đọc hết. Quá dài thì không ai đọc, quá ngắn thì không chỉ ra chỗ nào."
      },
      {
        "question": "Báo cáo viết \"nhờ chiến dịch X mà doanh số tăng\". Cách ghi chú tốt là gì?",
        "options": [
          "Hỏi có tháng nào tăng khi không chạy chiến dịch, và đề xuất so nhóm",
          "Gạch đỏ cả câu và ghi bên lề rằng \"không đủ cơ sở\"",
          "Đề nghị bỏ hẳn phần nhận xét nhân quả ra khỏi báo cáo",
          "Chấp nhận câu đó vì chiến dịch đúng là chạy vào tháng ấy"
        ],
        "correct": 0,
        "explanation": "Ghi chú tốt biến nghi ngờ thành câu hỏi kiểm được và có cách làm. Gạch đỏ chung chung và đề nghị bỏ không giúp người viết sửa; chấp nhận vì trùng tháng chính là lỗi \"cùng tăng\"."
      },
      {
        "question": "Bạn thấy một con số 95% không có số gốc. Ghi chú nên viết gì?",
        "options": [
          "\"95% trên bao nhiêu người? Xin bổ sung số gốc cạnh con số.\"",
          "\"Con số này nghe quá tốt nên chắc chắn là sai, xin làm lại.\"",
          "\"Nên bỏ con số này, dùng số khác đẹp hơn của kỳ trước.\"",
          "\"Tôi đã tự tính lại ra 80%, báo cáo cần sửa ngay.\""
        ],
        "correct": 0,
        "explanation": "Câu hỏi cụ thể kèm đề nghị bổ sung cho người viết một việc làm được. Suy đoán \"chắc sai\", đề nghị đổi số hay tự khẳng định 80% khi chưa có dữ liệu đều vượt quá thông tin bạn có."
      },
      {
        "question": "Sau khi gửi ghi chú, việc nào đáng làm nhất?",
        "options": [
          "Hẹn xem bản cập nhật và hỏi người viết cần hỗ trợ gì thêm",
          "Nhắc lại ghi chú trong họp để mọi người biết bạn đã phát hiện",
          "Chờ người viết tự sửa rồi mới đọc lại sau khi báo cáo được gửi",
          "Gửi ghi chú cho cấp trên để cấp trên biết báo cáo này có lỗi"
        ],
        "correct": 0,
        "explanation": "Theo dõi bản cập nhật và hỗ trợ giữ mối quan hệ làm việc. Nhắc trước cả họp hoặc gửi lên cấp trên biến ghi chú thành chuyện bắt lỗi."
      }
    ],
    "keyTakeaways": [
      "Rà theo thứ tự: số gốc, kỳ so sánh, mẫu, nhóm bị loại, nhân quả.",
      "Ghi chú một trang, mỗi chỗ kèm câu hỏi và cách kiểm.",
      "Hỏi để hiểu, không để bắt lỗi.",
      "Nhân quả viết thành \"đi cùng nhau\" nếu chưa kiểm được.",
      "Theo dõi bản cập nhật sau khi gửi ghi chú."
    ],
    "practicePrompt": {
      "question": "Bạn rà báo cáo và thấy: phần trăm không số gốc, một biểu đồ cột cắt cụt, một câu \"nhờ X mà Y tăng\". Ghi chú nào đúng?",
      "options": [
        "Ba mục: xin số gốc; vẽ lại cột từ 0; đổi câu thành đi cùng nhau hoặc đề xuất so nhóm",
        "Một câu: báo cáo có vài chỗ cần làm lại cho cẩn thận hơn trước khi gửi",
        "Ba mục: xin đổi người viết; xoá biểu đồ; bỏ hết câu nhận xét của báo cáo",
        "Hai mục: sửa chính tả tiêu đề; đổi màu biểu đồ cho đẹp và dễ nhìn hơn"
      ],
      "correct": 0,
      "explanation": "Đáp án đúng mỗi mục có chỗ cụ thể và việc làm. Câu chung chung không chỉ chỗ nào; đổi người, xoá biểu đồ là phán xét; sửa chính tả và màu sắc bỏ qua cả ba vấn đề thật."
    },
    "summary": {
      "keyIdea": "Áp năm câu hỏi vào báo cáo thật và viết ghi chú một trang giúp người viết làm tốt hơn.",
      "formula": "Số gốc → kỳ so sánh → mẫu và nhóm bị loại → nhân quả → ghi chú một trang.",
      "commonMistake": "Nhận xét chung \"cần làm lại\" thay vì chỉ từng chỗ và cách kiểm.",
      "action": "Gửi ghi chú cho người viết trong ngày để họ kịp sửa."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn một báo cáo có sẵn của phòng bạn (báo cáo tuần hoặc tháng là đủ). Rà theo thứ tự số gốc, kỳ so sánh, mẫu, nhân quả, rồi viết một ghi chú khoảng 10 dòng: mỗi chỗ nghi ngờ một câu hỏi và một cách kiểm. Gửi cho người viết hoặc đồng nghiệp tin cậy, không gửi tài liệu nội bộ vào công cụ AI chưa được duyệt.",
      "secondary": "Mai bạn sẽ được hỏi: bạn đã tìm ra bao nhiêu chỗ đáng hỏi và người nhận phản hồi ra sao."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Thứ Hai, báo cáo quý của phòng nằm trong hộp thư. Bạn đã có đủ các công cụ: số gốc, kỳ so sánh, mẫu nhỏ, nhân quả, biểu đồ cắt cụt. Bài cuối này là lần đầu bạn dùng chúng cùng lúc, trên một báo cáo có thật."
      },
      {
        "type": "feynman",
        "title": "Khám sức khoẻ tổng quát",
        "intro": "Đi khám tổng quát, bác sĩ không làm một xét nghiệm duy nhất: huyết áp, máu, tim, phổi, rồi ghi một tờ kết quả ngắn cho bạn đọc được. Thẩm tra báo cáo cũng vậy, nhiều phép kiểm nhỏ rồi một ghi chú cô đọng.",
        "columns": [
          "Thành phần",
          "Ví dụ đời thường",
          "Trong số liệu"
        ],
        "rows": [
          [
            "Nhiều phép kiểm nhỏ",
            "Huyết áp, máu, tim, phổi",
            "Số gốc, kỳ so sánh, mẫu, nhân quả, biểu đồ"
          ],
          [
            "Một tờ kết quả",
            "Tờ kết quả ngắn cho bệnh nhân",
            "Ghi chú một trang cho người viết"
          ],
          [
            "Bước tiếp theo",
            "Hẹn tái khám",
            "Hẹn xem bản cập nhật"
          ]
        ],
        "oneLiner": "Thẩm tra là nhiều phép kiểm nhỏ, gom thành một ghi chú ngắn người khác dùng được."
      },
      {
        "type": "heading",
        "text": "Quy trình ba lượt đọc"
      },
      {
        "type": "paragraph",
        "text": "Lượt một, đọc lướt để tìm mọi con số có phần trăm hoặc \"tăng, giảm\" và khoanh lại. Lượt hai, với mỗi số khoanh, hỏi bốn điều: số gốc, kỳ so sánh, nhóm bị loại, ai đo. Lượt ba, tìm các câu có \"nhờ\", \"do\", \"vì\" và hỏi có yếu tố thứ ba hay chiều ngược lại không."
      },
      {
        "type": "paragraph",
        "text": "Lượt bốn dành cho biểu đồ: nhãn thấp nhất của trục là bao nhiêu. Cả bốn lượt xong, bạn sẽ có danh sách ngắn các chỗ cần hỏi, không dài quá một trang."
      },
      {
        "type": "flow",
        "title": "Từ báo cáo tới ghi chú một trang",
        "steps": [
          {
            "label": "Khoanh các con số",
            "detail": "Mọi phần trăm, tăng giảm, trung bình trong báo cáo."
          },
          {
            "label": "Hỏi bốn điều cho từng số",
            "detail": "Số gốc, kỳ so sánh, nhóm bị loại, ai đo và đo thế nào."
          },
          {
            "label": "Soát các câu nhân quả và biểu đồ",
            "detail": "Yếu tố thứ ba, chiều ngược lại, trục bắt đầu từ đâu."
          },
          {
            "label": "Viết ghi chú một trang",
            "detail": "Mỗi chỗ: câu hỏi, lý do, cách kiểm đề xuất. Gửi người viết."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Ghi chú khó dùng",
          "text": "\"Báo cáo chưa đủ chặt chẽ, cần xem lại số liệu và cách trình bày.\" Người viết không biết chỗ nào, nên không biết sửa gì."
        },
        "right": {
          "label": "Ghi chú dùng được",
          "text": "\"Trang 2: 92% trên bao nhiêu khách? Trang 3: cột cắt cụt, xin vẽ lại từ 0. Trang 4: câu 'nhờ dự án X' chưa tách mùa vụ.\" Mỗi dòng là một việc làm được."
        }
      },
      {
        "type": "callout",
        "label": "Dùng AI cho ghi chú, đừng đưa tài liệu nội bộ",
        "text": "AI có thể giúp bạn viết ghi chú cho gọn và lịch sự. Nhưng số liệu chưa công bố, dữ liệu khách hàng hay lương không đưa vào công cụ chưa được công ty duyệt. Hãy dán dạng đã che, hoặc chỉ dán câu hỏi của bạn."
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI chỉnh ghi chú thẩm tra cho gọn và lịch sự",
        "task": "Bạn đã có ba chỗ nghi ngờ: 92% thiếu số gốc, cột cắt cụt, câu \"nhờ dự án X\". Lắp prompt để AI viết ghi chú một trang gửi đồng nghiệp (bạn đã che mọi số liệu nội bộ).",
        "parts": [
          {
            "id": "context",
            "label": "Bối cảnh",
            "options": [
              {
                "text": "Viết ghi chú về báo cáo.",
                "feedback": "AI không biết báo cáo nào, chỗ nghi ngờ gì; nó sẽ nói chung chung."
              },
              {
                "text": "Tôi là đồng nghiệp đọc báo cáo quý. Có ba chỗ: phần trăm thiếu số gốc, một cột cắt cụt, một câu \"nhờ dự án X\" chưa tách mùa vụ.",
                "good": true,
                "feedback": "Đủ người đọc, báo cáo và từng chỗ nghi ngờ, AI chỉ việc diễn đạt."
              }
            ]
          },
          {
            "id": "task",
            "label": "Việc cần làm",
            "options": [
              {
                "text": "Viết ghi chú hỏi số gốc, xin vẽ lại cột từ 0, đề xuất cách kiểm câu nhân quả; mỗi chỗ một câu hỏi.",
                "good": true,
                "feedback": "Nói rõ mỗi chỗ cần câu hỏi và cách kiểm, nên ghi chú dùng được ngay."
              },
              {
                "text": "Viết ghi chú thật chặt để người viết biết mình sai.",
                "feedback": "Mục tiêu sai: ghi chú để giúp sửa, không để chê; AI sẽ viết gay gắt."
              }
            ]
          },
          {
            "id": "format",
            "label": "Giọng và độ dài",
            "options": [
              {
                "text": "Viết hay và chuyên nghiệp nhất có thể.",
                "feedback": "Không đo được; AI viết dài và văn hoa, người đọc khó tìm việc phải làm."
              },
              {
                "text": "Giọng thân thiện, dưới 200 chữ, gạch đầu dòng, không thêm lỗi hay số liệu nào ngoài ba chỗ trên.",
                "good": true,
                "feedback": "Giọng, độ dài, dạng gạch đầu dòng và ranh giới rõ, nên bản nháp sát yêu cầu."
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
            "text": "Chào bạn, mình đọc báo cáo quý và có ba điểm muốn hỏi thêm:\n- Phần trăm ở trang 2: con số này tính trên bao nhiêu khách? Bạn bổ sung số gốc cạnh con số giúp mình nhé.\n- Biểu đồ trang 3: trục đang không bắt đầu từ 0, bạn thử vẽ lại từ 0 và ghi số chênh thật.\n- Câu \"nhờ dự án X\": bạn thử so với tháng cùng mùa không chạy dự án nhé.\nCảm ơn bạn!"
          },
          {
            "requires": [
              "context"
            ],
            "text": "Chào bạn, mình có vài góp ý cho báo cáo: cần bổ sung số gốc, chỉnh biểu đồ và xem lại câu nhân quả để báo cáo chặt chẽ hơn, vì đây là phần quan trọng...\n\n(Có đúng ba chỗ, nhưng chưa nói rõ cách kiểm và giọng văn còn dài dòng.)"
          },
          {
            "text": "Báo cáo còn nhiều sai sót nghiêm trọng: số liệu 92% sai, biểu đồ gian dối, kết luận nhân quả vô căn cứ. Đề nghị làm lại toàn bộ.\n\n(AI tự buộc tội \"sai\", \"gian dối\" vì prompt không cho giới hạn; ghi chú này không giúp ai sửa được.)"
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Gửi ghi chú thẩm tra cho người viết",
        "start": "a",
        "nodes": {
          "a": {
            "text": "Bạn có ghi chú ba chỗ nghi ngờ. Người viết báo cáo là đồng nghiệp lâu năm, cuối ngày còn họp quý.",
            "choices": [
              {
                "label": "Gửi ghi chú riêng cho người viết kèm lời đề nghị trao đổi nếu cần",
                "next": "b"
              },
              {
                "label": "Đọc to ba chỗ nghi ngờ ngay giữa cuộc họp quý",
                "next": "bad1"
              }
            ]
          },
          "bad1": {
            "text": "Người viết bị bất ngờ trước cả phòng và phòng thủ. Cuộc họp mất nửa giờ tranh cãi, còn ba chỗ kia vẫn chưa ai kiểm.",
            "ending": "bad"
          },
          "b": {
            "text": "Người viết cảm ơn và bổ sung số gốc. Nhưng biểu đồ cắt cụt vẫn chưa sửa sau hai ngày.",
            "choices": [
              {
                "label": "Nhắn lại, hỏi có cần bạn vẽ hộ bản từ 0 không",
                "next": "good"
              },
              {
                "label": "Báo thẳng cấp trên rằng người viết không chịu sửa biểu đồ",
                "next": "bad2"
              }
            ]
          },
          "bad2": {
            "text": "Người viết thấy bị đánh sau lưng. Quan hệ căng, và lần sau họ không gửi bản nháp cho bạn xem nữa.",
            "ending": "bad"
          },
          "good": {
            "text": "Bạn vẽ hộ bản từ 0 trong mười phút. Báo cáo được gửi đúng hạn, có thêm mục giới hạn của số liệu; người viết nhờ bạn đọc các báo cáo sau.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Bạn đã có bộ kiểm: số gốc, kỳ so sánh, mẫu, nhân quả, trục biểu đồ.",
          "Từ giờ, mỗi báo cáo số bạn đọc đều có thể qua bộ kiểm này."
        ]
      }
    ]
  }
];
