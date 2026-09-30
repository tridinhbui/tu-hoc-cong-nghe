import type { Lesson } from "../lesson-types";

// Chặng 49, bài 6-10. Giáo trình: scripts/curriculum/stage-49.json.
// Không nêu nút bấm, giá hay tính năng riêng của công cụ nào: chỉ khái niệm bền và cách kiểm kết quả.
export const S49_B_LESSONS: Lesson[] = [
  {
    "id": 2385,
    "slug": "dich-cuoc-tro-chuyen-voi-doi-tac-nuoc-ngoai-tai-cho",
    "title": "Chặng 49, Bài 6: Dịch cuộc trò chuyện với đối tác nước ngoài ngay tại chỗ",
    "subtitle": "Một người phiên dịch nghe nhanh nhưng không đứng ra chịu trách nhiệm: bạn phải tự xác nhận chỗ quan trọng.",
    "duration": "10 phút",
    "difficulty": "Dễ",
    "emoji": "🗣️",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Chỉ cần một con số hay một ngày giao hàng bị hiểu sai trong cuộc gặp là cả hai bên mất vài tuần sửa lại. Dịch trực tiếp trên điện thoại giúp bạn nói chuyện được ngay, nhưng nó chỉ đủ tin cho ý chính; những chỗ tiền, ngày, số lượng bạn phải xác nhận lại bằng cách khác.",
    "openingQuestion": "Nhà cung cấp Hàn Quốc ghé văn phòng, hai bên chỉ có vài câu tiếng Anh. Bạn bật dịch trực tiếp trên điện thoại. Khi ông ấy nói về số lượng và ngày giao, bạn nên làm gì?",
    "openingOptions": [
      "Nhắc lại con số và ngày bằng lời rồi viết ra cho ông ấy xem",
      "Tin bản dịch trên màn hình vì nghe trôi",
      "Nói nhanh hơn để bản dịch kịp cập nhật trước khi ông ấy nói tiếp",
      "Chỉ gật đầu, để bản dịch văn bản được gửi qua email sau cuộc gặp"
    ],
    "correctOption": 0,
    "explanation": "Dịch trực tiếp nghe rất trôi, nhưng số lượng và ngày giao là hai loại thông tin dễ sai nhất mà bạn không thể nhận ra sai nếu chỉ nhìn màn hình. Cách an toàn là nhắc lại bằng lời, viết con số ra giấy hoặc tin nhắn để chính ông ấy nhìn và xác nhận. Nói nhanh hơn làm bản dịch tệ thêm, còn gật đầu chờ email là để sai sót nằm im tới khi đơn hàng đã chạy.",
    "diagram": [
      {
        "label": "Nói câu ngắn, một ý",
        "arrow": true
      },
      {
        "label": "Điện thoại dịch hai chiều",
        "arrow": true
      },
      {
        "label": "Nhắc lại con số, ngày bằng cách viết",
        "arrow": true
      },
      {
        "label": "Đối tác xác nhận, bạn ghi lại"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Hai bên gặp nhau bằng dịch trực tiếp, ai cũng hiểu ý chính nên buổi nói chuyện trôi chảy. Cuối buổi, người mua viết ngày giao và số lượng ra giấy, người bán gật đầu và ký tắt bên cạnh. Một tuần sau hai bên thấy cùng một con số. Tình huống này chỉ để minh hoạ cách dùng, không phải một vụ việc có thật."
    },
    "quiz": [
      {
        "question": "Khi dùng dịch trực tiếp, cách nói nào giúp bản dịch chính xác hơn?",
        "options": [
          "Nói từng câu ngắn, mỗi câu một ý, dừng chút giữa các câu",
          "Nói thật nhanh và liền mạch để máy bắt kịp nhịp tự nhiên",
          "Dùng nhiều thành ngữ, tiếng lóng cho cuộc trò chuyện thân mật",
          "Gộp cả ý trong một câu dài để máy hiểu được cả bối cảnh"
        ],
        "correct": 0,
        "explanation": "Câu ngắn giúp bản dịch bám đúng ý; câu dài nhiều ý làm máy nhầm chủ ngữ, còn thành ngữ và tiếng lóng thường bị dịch theo nghĩa đen. Nói nhanh và liền mạch khiến máy cắt sai chỗ, và bạn là người chịu hậu quả khi hiểu sai."
      },
      {
        "question": "Điều nào đúng về độ tin cậy của dịch trực tiếp?",
        "options": [
          "Đủ cho ý chính, chưa đủ cho con số và điều khoản",
          "Đủ chính xác để ký hợp đồng ngay tại bàn",
          "Chính xác hơn một phiên dịch viên có nhiều kinh nghiệm",
          "Luôn đúng nếu điện thoại nhận giọng nói rõ ràng hết"
        ],
        "correct": 0,
        "explanation": "Dịch trực tiếp rất hợp để hiểu ý chính và giữ cuộc nói chuyện trôi, nhưng vẫn có thể sai số, tên riêng hay sắc thái. Nhận giọng rõ không bảo đảm dịch đúng nghĩa, và ký hợp đồng cần bản văn đã được người có chuyên môn xem lại."
      },
      {
        "question": "Người kia vừa nói một ngày giao hàng qua bản dịch. Bước nào vững nhất?",
        "options": [
          "Viết ngày đó ra giấy và nhờ họ xác nhận lại",
          "Hỏi lại chính ứng dụng dịch xem bản dịch vừa rồi có đúng không",
          "Giả định ngày đó đúng vì máy đã hiển thị rõ ràng bằng chữ",
          "Đợi tới khi nhận hoá đơn rồi mới đối chiếu lại ngày giao"
        ],
        "correct": 0,
        "explanation": "Hỏi lại chính ứng dụng chỉ cho cùng câu trả lời vì nó không biết ý ông ấy thật sự là gì. Xác nhận phải đi qua người thật: viết ngày ra để họ nhìn và gật. Đợi hoá đơn là muộn, còn giả định đúng là cách sai sót lọt qua."
      },
      {
        "question": "Điều gì nên cân nhắc trước khi để điện thoại nghe cuộc nói chuyện kinh doanh?",
        "options": [
          "Nội dung có thể được gửi ra dịch vụ bên ngoài, nên cần xem quy định",
          "Điện thoại chỉ nghe khi cả hai cùng nói đồng thời với nhau",
          "Âm thanh luôn được xoá ngay sau khi dịch xong mọi trường hợp",
          "Chỉ bản dịch văn bản mới được lưu, còn giọng nói thì không"
        ],
        "correct": 0,
        "explanation": "Giọng nói thường được gửi tới máy chủ để dịch, và mỗi dịch vụ có cách lưu khác nhau. Vì vậy chuyện nhạy cảm như giá, khách hàng, kế hoạch nên hỏi bộ phận IT trước; không nên tự giả định là âm thanh được xoá ngay."
      },
      {
        "question": "Khi nào nên nhờ phiên dịch viên thật thay vì chỉ dùng điện thoại?",
        "options": [
          "Khi bàn điều khoản, giá hoặc cam kết có hệ quả pháp lý",
          "Khi đối tác nói giọng hơi nặng ở một vài từ khó nghe",
          "Khi điện thoại đang hết pin chỉ còn dưới hai mươi phần trăm",
          "Khi buổi gặp kéo dài hơn một tiếng đồng hồ liên tục"
        ],
        "correct": 0,
        "explanation": "Điều khoản, giá và cam kết là chỗ một từ sai có thể tốn tiền hoặc kiện tụng, nên cần người thật chịu trách nhiệm. Giọng nặng, pin yếu hay buổi dài chỉ là bất tiện, bạn xử lý bằng cách nói chậm, sạc pin hoặc nghỉ giữa buổi."
      }
    ],
    "keyTakeaways": [
      "Dịch trực tiếp đủ cho ý chính, không đủ cho con số và điều khoản.",
      "Nói câu ngắn, một ý, tránh thành ngữ.",
      "Con số, ngày, số lượng: viết ra và để đối tác xác nhận.",
      "Cuộc nói chuyện có thể đi qua máy chủ bên ngoài: hỏi IT trước khi bàn chuyện nhạy cảm.",
      "Điều khoản và cam kết cần người thật chịu trách nhiệm."
    ],
    "practicePrompt": {
      "question": "Đối tác nói \"mười hai\" nhưng bản dịch hiện \"hai mươi\". Bạn nên làm gì?",
      "options": [
        "Viết cả hai con số ra và hỏi lại \"12 hay 20?\" cho họ chỉ",
        "Tin bản dịch trên màn hình, vì đã hiện ra thành chữ rõ ràng mà",
        "Nói chậm hơn rồi nghe lại một lần nữa mà không hỏi gì",
        "Bỏ qua con số, hôm sau nhắn email hỏi lại cho chắc ăn"
      ],
      "correct": 0,
      "explanation": "Lỗi số kiểu này rất hay gặp khi nghe. Viết hai con số ra để họ chỉ vào là cách nhanh nhất, không cần tranh luận ai đúng. Nghe lại một lần không chắc khác kết quả, và để tới hôm sau là lúc hai bên đã hiểu khác nhau."
    },
    "summary": {
      "keyIdea": "Dịch trực tiếp là chiếc cầu tạm: đi qua được, nhưng chỗ quan trọng phải có người thật đỡ.",
      "formula": "Câu ngắn + viết lại con số + đối tác xác nhận = hiểu đúng.",
      "commonMistake": "Thấy bản dịch trôi chảy nên tin cả con số và ngày giao mà không hỏi lại.",
      "action": "Lần tới có buổi gặp nước ngoài, chuẩn bị sẵn một tờ giấy để viết con số và ngày ngay tại bàn."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Soạn trước một tờ \"xác nhận nhanh\" cho buổi gặp sắp tới, chỉ có ô trống: số lượng, ngày giao, giá, người liên hệ. Thử dùng dịch trực tiếp nói một câu về từng ô với bạn hay đồng nghiệp biết ngoại ngữ, xem câu nào bản dịch hiểu sai.",
      "secondary": "Ghi lại cụm nào dịch sai để lần sau nói theo cách khác, ngắn và rõ hơn."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Nhà cung cấp đã tới, hai bên gật đầu chào, và rồi ai cũng im lặng vì vốn tiếng Anh chỉ đủ hỏi thăm. Điện thoại có thể dịch tại chỗ; bài này nói cách dùng nó để hiểu đúng ý chính mà không để một con số bị hiểu nhầm."
      },
      {
        "type": "feynman",
        "title": "Dịch trực tiếp đơn giản hơn bạn nghĩ",
        "intro": "Hình dung bạn thuê một người phiên dịch ở chợ: nghe nhanh, nói trôi, nhưng ông ấy không đứng ra bảo đảm điều mình nói.",
        "columns": [
          "Thành phần",
          "Người phiên dịch ở chợ",
          "Dịch trực tiếp trên điện thoại"
        ],
        "rows": [
          [
            "Tốc độ",
            "Nghe và nói lại gần như ngay",
            "Hiện chữ và đọc lên gần như ngay"
          ],
          [
            "Điểm mạnh",
            "Giúp hai bên hiểu ý chính",
            "Giúp hiểu ý chính, không cần hẹn trước"
          ],
          [
            "Điểm yếu",
            "Nghe nhầm số, bỏ qua sắc thái",
            "Sai số, tên riêng, từ có nhiều nghĩa"
          ],
          [
            "Ai chịu trách nhiệm",
            "Bạn, vì ông ấy chỉ chuyển lời",
            "Bạn, vì máy chỉ chuyển lời"
          ]
        ],
        "oneLiner": "Dịch trực tiếp là người chuyển lời nhanh: hiểu ý chính nhờ nó, còn con số phải tự xác nhận."
      },
      {
        "type": "heading",
        "text": "Tình huống: buổi gặp năm mươi phút, hai ngôn ngữ"
      },
      {
        "type": "paragraph",
        "text": "Điện thoại nghe giọng nói của người kia, đổi thành chữ trong ngôn ngữ của họ, dịch sang tiếng Việt rồi hiện lên màn hình, có khi đọc lên. Vì mỗi bước đều có thể nghe sai, lỗi đầu tiên dễ bị nhân lên ở các bước sau."
      },
      {
        "type": "flow",
        "title": "Một câu nói đi qua điện thoại thế nào",
        "steps": [
          {
            "label": "Bạn nói một câu ngắn",
            "detail": "Một ý mỗi câu, tránh thành ngữ. Câu càng gọn, càng ít chỗ để máy hiểu nhầm."
          },
          {
            "label": "Máy nghe và đổi thành chữ",
            "detail": "Giọng nặng, tiếng ồn hay tên riêng là chỗ máy hay nghe sai ngay từ bước này."
          },
          {
            "label": "Máy dịch sang ngôn ngữ kia",
            "detail": "Bản dịch thường nghe rất tự nhiên, nhưng từ có nhiều nghĩa có thể bị chọn sai nghĩa."
          },
          {
            "label": "Bạn nhắc lại con số bằng cách viết",
            "detail": "Viết số lượng, ngày, giá ra cho cả hai cùng nhìn, đừng chỉ dựa vào lời nói."
          },
          {
            "label": "Đối tác xác nhận, bạn ghi lại",
            "detail": "Chụp tờ giấy hoặc gõ lại vào ghi chú. Đó mới là thứ hai bên cùng giữ, không phải bản dịch."
          }
        ]
      },
      {
        "type": "list",
        "items": [
          "Nói câu ngắn, một ý, dừng chút giữa các câu.",
          "Tên riêng, sản phẩm: đọc chậm hoặc viết ra.",
          "Con số, ngày, số lượng: viết ra cho đối tác xác nhận.",
          "Nghe không rõ thì hỏi lại, đừng đoán theo chữ trên màn hình."
        ]
      },
      {
        "type": "callout",
        "label": "Cẩn thận: giọng nói đi đâu",
        "text": "Nhiều dịch vụ dịch cần gửi âm thanh hoặc văn bản ra máy chủ bên ngoài. Giá chưa công bố, tên khách hàng hay kế hoạch chưa ra mắt chỉ nên bàn khi công ty đã cho phép. Nếu chưa chắc, hỏi bộ phận IT hoặc pháp chế."
      },
      {
        "type": "scenario",
        "title": "Buổi gặp nhà cung cấp Hàn Quốc",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Ông Kim nói một câu dài về điều kiện giao hàng. Bản dịch hiện ra là \"giao trong hai tuần, tối thiểu 500 thùng\". Bạn thấy hơi lạ vì lần trước ông nói một tháng.",
            "choices": [
              {
                "label": "Viết \"2 tuần, tối thiểu 500 thùng?\" ra màn hình và đưa cho ông xem",
                "next": "s2"
              },
              {
                "label": "Gật đầu rồi nói tiếp chuyện giá, vì máy đã dịch rõ rồi",
                "next": "bad1"
              }
            ]
          },
          "bad1": {
            "text": "Hai tuần sau ông Kim giao đúng như ông hiểu: một tháng. Bạn đã báo khách hai tuần nên giờ phải xin lỗi khách và nhờ kho gấp.",
            "ending": "bad"
          },
          "s2": {
            "text": "Ông Kim lắc đầu, viết \"4 tuần\" và chỉ vào chữ \"tối thiểu\" rồi viết \"500 - 1000\". Bản dịch đã đổi một con số và hiểu sai cả khoảng số lượng.",
            "choices": [
              {
                "label": "Chụp tờ giấy, gõ lại vào ghi chú: \"4 tuần, 500 đến 1000 thùng\", rồi nhờ ông ký tắt",
                "next": "good"
              },
              {
                "label": "Nhớ trong đầu số mới, vì cuộc họp sắp xong rồi",
                "next": "bad2"
              }
            ]
          },
          "bad2": {
            "text": "Buổi chiều bạn quên mất khoảng số lượng và báo lại với sếp là \"khoảng 500\". Hai bên lại phải gọi điện xác nhận.",
            "ending": "bad"
          },
          "good": {
            "text": "Hai bên có một tờ giấy ghi rõ: 4 tuần, 500 đến 1000 thùng. Bạn gửi ảnh cho sếp ngay sau buổi gặp và không ai phải hỏi lại.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Dịch trực tiếp giúp bạn hiểu ý chính; con số nằm trên tờ giấy hai bên cùng ký.",
          "Bài sau: chụp biển báo và thực đơn, và cách biết khi nào bản dịch đủ tin để bấm nút."
        ]
      }
    ]
  },
  {
    "id": 2386,
    "slug": "dich-bien-bao-thuc-don-va-huong-dan-khi-di-cong-tac",
    "title": "Chặng 49, Bài 7: Dịch biển báo, thực đơn và hướng dẫn khi đi công tác",
    "subtitle": "Chụp một tấm biển lạ rất dễ; khó là biết khi nào bản dịch đủ tin để bấm nút hoặc đưa tiền.",
    "duration": "8 phút",
    "difficulty": "Dễ",
    "emoji": "📷",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Đi công tác là lúc bạn gặp nhiều chữ lạ nhất mà không có ai hỏi: máy bán vé, biển chỉ đường, bảng giá, hướng dẫn thuốc. Chụp và dịch giúp bạn hiểu nhanh, nhưng bấm sai nút mua vé hay hiểu sai một dòng cảnh báo có thể tốn tiền hoặc gây nguy hiểm.",
    "openingQuestion": "Bạn đứng trước máy bán vé ở sân bay toàn chữ lạ, chỉ còn 10 phút. Bạn chụp màn hình máy và nhờ AI dịch. Khi nào nên bấm nút thanh toán dựa trên bản dịch?",
    "openingOptions": [
      "Khi bản dịch khớp với điều bạn đã biết và không có chỗ mơ hồ",
      "Khi bản dịch trôi chảy, không có chữ nào bị để nguyên ngôn ngữ gốc",
      "Khi bản dịch có đủ mọi dòng trong ảnh, kể cả chữ nhỏ ở góc dưới",
      "Khi bản dịch ra nhanh trong vài giây và ảnh chụp đã thật rõ nét"
    ],
    "correctOption": 0,
    "explanation": "Bản dịch chỉ đáng tin để bấm khi nó khớp với việc bạn đã biết mình cần làm (ví dụ chọn đúng ga, đúng ngày) và không còn chỗ mơ hồ về tiền. Trôi chảy, đủ dòng hay nhanh không chứng minh nghĩa đúng: ảnh nhoè hay chữ nhỏ vẫn làm máy đoán, và nó đoán bằng giọng rất tự tin. Nếu còn một dòng về giá hoặc huỷ vé chưa rõ, hỏi nhân viên trước khi bấm.",
    "diagram": [
      {
        "label": "Chụp rõ, đủ sáng",
        "arrow": true
      },
      {
        "label": "Nhờ dịch và nói rõ bạn cần làm gì",
        "arrow": true
      },
      {
        "label": "Đối chiếu dòng về tiền, ngày, cảnh báo",
        "arrow": true
      },
      {
        "label": "Còn mơ hồ thì hỏi người thật"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Một người đi công tác chụp menu ở quán ăn địa phương và nhờ AI dịch từng món. Bản dịch giúp anh chọn món mình thích, nhưng ở dòng nhỏ ghi \"phụ thu theo người\" bản dịch chỉ có hai chữ mơ hồ. Anh hỏi nhân viên và biết đó là phí dịch vụ. Tình huống này chỉ để minh hoạ, không phải vụ việc có thật."
    },
    "quiz": [
      {
        "question": "Khi chụp ảnh biển báo để dịch, điều gì giúp kết quả tốt hơn?",
        "options": [
          "Chụp thẳng, đủ sáng, không bị lóa hoặc cắt chữ",
          "Chụp xa thật xa để gom cả con đường vào trong khung ảnh",
          "Chụp nghiêng để thấy cả các biển ở hai bên của đường",
          "Chụp lúc đang đi để kịp dịch mà không mất thêm thời gian"
        ],
        "correct": 0,
        "explanation": "Ảnh nghiêng, xa hoặc rung làm máy đọc sai chữ, và đã đọc sai thì bản dịch tốt mấy cũng sai theo. Ảnh thẳng, đủ sáng và không cắt chữ giúp máy đọc đúng từng ký tự trước khi dịch."
      },
      {
        "question": "Dòng nào trong bản dịch của máy bán vé nên được kiểm lại kỹ nhất trước khi bấm?",
        "options": [
          "Dòng có số tiền, ngày giờ hoặc điều kiện huỷ vé",
          "Dòng chào mừng ở đầu màn hình khi bạn tới gần máy",
          "Dòng ghi tên công ty vận hành ở góc dưới màn hình",
          "Dòng hướng dẫn chọn ngôn ngữ hiển thị ở phía trên cùng"
        ],
        "correct": 0,
        "explanation": "Tiền, ngày giờ và điều kiện huỷ là những dòng mà hiểu sai sẽ mất tiền hoặc lỡ chuyến và khó đòi lại. Lời chào, tên công ty hay chọn ngôn ngữ dịch sai cũng không gây hậu quả gì đáng kể."
      },
      {
        "question": "Bạn chụp hướng dẫn dùng một loại thuốc ở nước ngoài và AI dịch ra. Nên xử lý thế nào?",
        "options": [
          "Dùng bản dịch để hiểu sơ bộ, rồi hỏi dược sĩ hoặc bác sĩ trước khi dùng thuốc",
          "Làm theo bản dịch từng dòng vì AI dịch theo đúng từng chữ trên nhãn",
          "Bỏ qua bản dịch nếu có chữ nào dịch thiếu, rồi uống theo cảm giác",
          "Gửi ảnh cho đồng nghiệp hỏi xem họ từng dùng loại này chưa"
        ],
        "correct": 0,
        "explanation": "Thuốc là chuyện sức khoẻ, bản dịch chỉ giúp bạn hiểu sơ bộ còn liều dùng phải do dược sĩ hoặc bác sĩ xác nhận. Làm theo từng dòng hoặc uống theo cảm giác đều rủi ro, còn kinh nghiệm của đồng nghiệp không thay được lời chuyên gia."
      },
      {
        "question": "Ảnh chụp bảng giá bị nhoè một góc, nhưng bản dịch vẫn hiện đủ các dòng. Điều này cho thấy gì?",
        "options": [
          "Máy có thể đã đoán phần nhoè, nên con số ở đó cần kiểm lại",
          "Máy đọc được cả chữ nhoè nên bản dịch đã đủ tin cậy",
          "Bản dịch đủ dòng nghĩa là ảnh không còn vấn đề gì",
          "Phần nhoè thường là phần không quan trọng nên bỏ qua"
        ],
        "correct": 0,
        "explanation": "Khi chữ không đọc được, máy vẫn viết ra một đáp án nghe hợp lý thay vì báo \"không đọc được\". Vì vậy số tiền ở chỗ nhoè là thứ phải chụp lại hoặc hỏi người. Bản dịch đủ dòng không có nghĩa ảnh rõ."
      },
      {
        "question": "Bạn nhờ AI dịch mà chỉ gõ \"dịch giúp\" kèm ảnh. Thêm điều gì cải thiện kết quả nhiều nhất?",
        "options": [
          "Nói rõ bạn cần làm gì, ví dụ mua vé đi ga nào",
          "Thêm lời nhắc \"dịch thật chuẩn\" ở cuối yêu cầu của bạn",
          "Yêu cầu dịch sang đúng ba ngôn ngữ phổ biến nhất hiện nay",
          "Nhờ dịch lại cùng một ảnh ba lần rồi chọn bản hay nhất"
        ],
        "correct": 0,
        "explanation": "Khi biết bạn cần làm gì, AI chọn được nghĩa phù hợp và chỉ ra nút cần bấm. \"Dịch thật chuẩn\" không thêm thông tin nào, còn dịch ba lần hay sang nhiều ngôn ngữ chỉ cho nhiều bản khác nhau mà không giúp bạn chọn đúng."
      }
    ],
    "keyTakeaways": [
      "Chụp thẳng, đủ sáng, không cắt chữ.",
      "Nói rõ bạn đang cần làm gì, không chỉ \"dịch giúp\".",
      "Dòng về tiền, ngày, điều kiện huỷ: đối chiếu kỹ trước khi bấm.",
      "Chữ nhoè thì máy có thể đoán: chụp lại hoặc hỏi người.",
      "Thuốc, pháp lý, tài chính: hỏi chuyên gia, bản dịch chỉ để hiểu sơ bộ."
    ],
    "practicePrompt": {
      "question": "Máy bán vé có một dòng bản dịch mờ nghĩa về phí huỷ. Bạn chỉ còn vài phút. Nên làm gì?",
      "options": [
        "Hỏi nhân viên sân bay về dòng đó rồi mới bấm mua",
        "Bấm mua vì phần lớn các dòng khác đã rõ nghĩa rồi",
        "Nhờ AI dịch lại dòng đó đến khi có bản dịch dễ hiểu",
        "Chọn đại phương án rẻ nhất để không phải đọc nữa"
      ],
      "correct": 0,
      "explanation": "Dòng về phí huỷ nằm đúng nhóm \"tiền\" nên phải rõ trước khi bấm, và người tại chỗ trả lời chắc hơn máy. Dịch lại nhiều lần chỉ cho nhiều cách diễn đạt khác nhau, còn chọn đại là đánh cược vào điều bạn chưa hiểu."
    },
    "summary": {
      "keyIdea": "Bản dịch từ ảnh giúp bạn hiểu; quyết định về tiền, sức khoẻ phải có người thật xác nhận.",
      "formula": "Ảnh rõ + nói mình cần làm gì + kiểm dòng tiền = bấm được.",
      "commonMistake": "Tin bản dịch trôi chảy mà không để ý chỗ ảnh nhoè hoặc dòng có tiền.",
      "action": "Lần tới gặp chữ lạ, chụp ảnh và nói rõ việc bạn đang cần làm trước khi nhờ dịch."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chụp ba thứ có chữ nước ngoài quanh bạn: nhãn một sản phẩm nhập, một hướng dẫn sử dụng, một email tiếng Anh. Với mỗi ảnh, nhờ AI dịch và nói rõ bạn cần làm gì. Đánh dấu dòng nào bạn sẽ không dám dựa vào nếu chưa hỏi người.",
      "secondary": "Ghi lại dòng nào bản dịch mơ hồ và vì sao, để nhận ra chúng nhanh hơn lần sau."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Sân bay lạ, máy bán vé toàn chữ lạ và hàng người đang xếp sau lưng bạn. Điện thoại chụp được, dịch được; câu hỏi là khi nào tin để bấm nút."
      },
      {
        "type": "feynman",
        "title": "Dịch từ ảnh đơn giản hơn bạn nghĩ",
        "intro": "Hình dung bạn nhờ một người khách ở ga đọc giúp tấm bảng: họ đọc nhanh, nhưng nếu chữ mờ, họ sẽ đoán rồi nói như thể chắc chắn.",
        "columns": [
          "Thành phần",
          "Người khách đọc giúp",
          "Dịch từ ảnh bằng AI"
        ],
        "rows": [
          [
            "Bước đầu",
            "Nhìn tấm bảng và đọc chữ",
            "Đọc chữ trong ảnh, rồi mới dịch"
          ],
          [
            "Điểm mạnh",
            "Nhanh, hiểu ngữ cảnh chung",
            "Nhanh, dịch được nhiều ngôn ngữ"
          ],
          [
            "Điểm yếu",
            "Chữ mờ thì đoán",
            "Chữ mờ thì đoán, và nói rất tự tin"
          ],
          [
            "Cách kiểm",
            "Hỏi thêm một người nữa",
            "Đối chiếu dòng tiền, hỏi nhân viên"
          ]
        ],
        "oneLiner": "Dịch từ ảnh là người đọc giúp nhanh nhưng hay đoán: dùng để hiểu, còn chuyện tiền thì hỏi thêm người."
      },
      {
        "type": "heading",
        "text": "Tình huống: mười phút trước giờ bay"
      },
      {
        "type": "paragraph",
        "text": "AI trước hết đọc chữ trong ảnh, rồi mới dịch. Nếu bước đọc sai vì ảnh nghiêng hay nhoè thì bước dịch sai theo, và lỗi này không hiện ra trong bản dịch."
      },
      {
        "type": "flow",
        "title": "Từ tấm biển đến quyết định bấm nút",
        "steps": [
          {
            "label": "Chụp rõ",
            "detail": "Thẳng, đủ sáng, không cắt chữ. Chụp lại ngay nếu bị lóa."
          },
          {
            "label": "Nói rõ việc cần làm",
            "detail": "Ví dụ: \"Tôi muốn mua vé một chiều đi ga trung tâm, nút nào là xác nhận thanh toán?\""
          },
          {
            "label": "Đọc bản dịch và tìm chỗ mơ hồ",
            "detail": "Tô đậm những dòng có tiền, ngày giờ, điều kiện huỷ."
          },
          {
            "label": "Hỏi người nếu còn mơ hồ",
            "detail": "Nhân viên tại chỗ trả lời chắc hơn và chịu trách nhiệm hơn máy."
          },
          {
            "label": "Bấm khi đã hiểu",
            "detail": "Bạn bấm vì hiểu, không phải vì bản dịch trông trôi."
          }
        ]
      },
      {
        "type": "callout",
        "label": "Cẩn thận: chữ nhoè, thuốc và pháp lý",
        "text": "Khi không đọc được, máy vẫn viết ra câu nghe hợp lý thay vì báo lỗi. Với thuốc, hợp đồng hay giấy tờ pháp lý, bản dịch chỉ để hiểu sơ bộ: hỏi dược sĩ, bác sĩ hoặc chuyên gia pháp chế trước khi làm theo."
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Lắp yêu cầu dịch máy bán vé",
        "task": "Bạn chụp màn hình máy bán vé ở nhà ga nước ngoài. Lắp một yêu cầu để AI giúp bạn mua vé một chiều đúng chỗ.",
        "parts": [
          {
            "id": "goal",
            "label": "Việc bạn cần làm",
            "options": [
              {
                "text": "Dịch giúp.",
                "feedback": "AI chỉ dịch từng chữ mà không biết bạn cần nút nào, nên bạn phải tự đoán phần còn lại."
              },
              {
                "text": "Tôi muốn mua một vé một chiều đi ga trung tâm vào sáng mai. Chỉ cho tôi nút cần bấm.",
                "good": true,
                "feedback": "Có mục tiêu cụ thể nên AI chỉ ra đúng nút và bước theo thứ tự."
              }
            ]
          },
          {
            "id": "focus",
            "label": "Chỗ cần chú ý",
            "options": [
              {
                "text": "Đánh dấu mọi dòng có số tiền, giờ khởi hành, điều kiện huỷ.",
                "good": true,
                "feedback": "AI tách riêng các dòng quan trọng để bạn soát trước khi bấm."
              },
              {
                "text": "Dịch hết cho đẹp.",
                "feedback": "Bản dịch đủ mọi dòng nhưng bạn vẫn phải tự tìm chỗ quan trọng giữa đống chữ."
              }
            ]
          },
          {
            "id": "safety",
            "label": "Khi không chắc",
            "options": [
              {
                "text": "Nếu chữ nào không đọc rõ, hãy đoán nghĩa gần nhất.",
                "feedback": "Bạn đang bảo AI đoán: nó sẽ điền chữ nghe hợp lý ở chỗ nhoè, có khi là con số sai."
              },
              {
                "text": "Nếu chữ nào không đọc rõ, hãy báo cho tôi thay vì đoán.",
                "good": true,
                "feedback": "Chỗ không rõ được nêu ra để bạn chụp lại hoặc hỏi nhân viên."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "goal",
              "focus",
              "safety"
            ],
            "text": "Bước 1: chọn \"Mua vé một chiều\". Bước 2: chọn ga đến \"Trung tâm\". Dòng cần soát: giá 24 (số liệu minh hoạ), giờ khởi hành 08:10. Chưa đọc rõ: dòng nhỏ phía dưới về điều kiện đổi vé, bạn nên hỏi nhân viên."
          },
          {
            "requires": [
              "goal"
            ],
            "text": "Bước 1: chọn mua vé. Giá hiển thị là 24 (số liệu minh hoạ). Bản dịch không nói rõ điều kiện huỷ hay giờ, nên bạn phải tự kiểm lại."
          },
          {
            "text": "Đây là máy bán vé. Bạn nên chọn vé rẻ nhất, hình như có giảm 50% cho người đi công tác. (AI không biết bạn cần gì nên tự thêm ưu đãi không có trong ảnh.)"
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Máy bán vé ở sân bay",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bản dịch ghi: \"Vé một chiều, 24, không hoàn tiền nếu huỷ\" nhưng dòng chữ nhỏ dưới cùng bị lóa đèn không đọc được.",
            "choices": [
              {
                "label": "Chụp lại tránh lóa rồi nhờ dịch dòng nhỏ đó",
                "next": "s2"
              },
              {
                "label": "Bấm mua vì giá và điểm đến đã rõ rồi",
                "next": "bad1"
              }
            ]
          },
          "bad1": {
            "text": "Dòng bị lóa ghi phụ phí hành lý ký gửi. Bạn phải trả thêm ở quầy và suýt lỡ chuyến vì xếp hàng lại.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bản dịch mới ghi: \"Hành lý ký gửi tính thêm phí\". Bạn chỉ có một túi xách tay.",
            "choices": [
              {
                "label": "Hỏi nhân viên gần đó cho chắc rằng túi xách tay không bị tính phí rồi mua",
                "next": "good"
              },
              {
                "label": "Bấm mua luôn, không cần hỏi vì máy đã dịch rõ",
                "next": "bad2"
              }
            ]
          },
          "bad2": {
            "text": "Túi của bạn hơi quá kích cỡ xách tay theo quy định hãng, và bạn phải trả phí tại cổng. Một câu hỏi 10 giây đã đủ tránh chuyện đó.",
            "ending": "bad"
          },
          "good": {
            "text": "Nhân viên xác nhận túi của bạn hợp lệ. Bạn mua vé, còn thừa 4 phút, và lưu ảnh màn hình đã dịch để dùng khi cần.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Chụp rõ, nói rõ việc cần làm, soát dòng tiền, và hỏi người khi còn mơ hồ.",
          "Bài sau: bản dịch nghe trơn nhưng sai một từ, và cách bắt lỗi bằng dịch ngược."
        ]
      }
    ]
  },
  {
    "id": 2387,
    "slug": "ban-dich-nghe-tron-nhung-sai-nghia-mot-tu",
    "title": "Chặng 49, Bài 8: Bản dịch nghe trơn nhưng sai nghĩa một từ",
    "subtitle": "Một từ bị đảo như \"trước\" thành \"sau\" vẫn cho một câu đọc rất tự nhiên: bạn phải dịch ngược để bắt.",
    "duration": "10 phút",
    "difficulty": "Dễ",
    "emoji": "🔍",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Lỗi dịch nguy hiểm nhất không phải câu vụng về mà là câu mượt mà sai một từ: trước thành sau, tối thiểu thành tối đa, bao gồm thành không bao gồm. Một điều khoản giao hàng hay thanh toán đọc trôi nhưng sai một chữ có thể làm bạn giao trễ hoặc trả tiền nhầm thời điểm.",
    "openingQuestion": "Bản dịch điều khoản giao hàng đọc rất tự nhiên: \"Người bán giao hàng sau khi nhận thanh toán\". Bản gốc có thể nói \"trước\". Cách nhanh nhất để phát hiện lỗi này là gì?",
    "openingOptions": [
      "Dịch ngược câu đó sang ngôn ngữ gốc rồi so với bản gốc",
      "Đọc lại bản dịch vài lần xem câu có trôi chảy và tự nhiên không",
      "Nhờ AI cho biết bản dịch của chính nó chính xác bao nhiêu phần trăm",
      "Kiểm tra độ dài bản dịch có tương đương với độ dài bản gốc không"
    ],
    "correctOption": 0,
    "explanation": "Một câu sai một từ vẫn đọc trôi, nên đọc lại nhiều lần không bắt được lỗi, vì cảm giác \"tự nhiên\" chính là thứ làm bạn bỏ sót. Dịch ngược bằng một phiên trò chuyện mới (không cho AI thấy bản gốc) rồi so với gốc làm chữ bị đảo lộ ra. Hỏi AI tự chấm phần trăm chỉ cho một con số nghe tự tin, còn độ dài tương đương không nói gì về nghĩa.",
    "diagram": [
      {
        "label": "Dịch bản gốc sang tiếng Việt",
        "arrow": true
      },
      {
        "label": "Mở phiên mới, dịch ngược về ngôn ngữ gốc",
        "arrow": true
      },
      {
        "label": "So hai bản ở các từ then chốt",
        "arrow": true
      },
      {
        "label": "Lệch thì hỏi người biết ngôn ngữ đó"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Một nhân viên mua hàng dịch điều khoản thanh toán của nhà cung cấp. Bản dịch ghi thanh toán \"sau\" khi nhận hàng, còn bản gốc ghi \"trước\". Chị dịch ngược sang ngôn ngữ gốc trong một phiên khác và thấy chữ \"trước\" quay lại. Chị hỏi người biết ngôn ngữ đó trước khi ký. Tình huống chỉ để minh hoạ, không phải vụ việc có thật."
    },
    "quiz": [
      {
        "question": "Vì sao đọc lại bản dịch nhiều lần vẫn dễ bỏ sót lỗi sai một từ?",
        "options": [
          "Câu sai một từ vẫn trôi chảy nên tai bạn không thấy gì lạ",
          "Bản dịch luôn chứa nhiều lỗi nhỏ nên mắt bạn quen dần rồi bỏ qua lỗi lớn",
          "Bạn thường đọc quá nhanh nên bỏ qua ngay mọi từ mới",
          "Máy cố tình đổi từ để bạn phải đọc lại bản gốc"
        ],
        "correct": 0,
        "explanation": "Lỗi đổi nghĩa không làm câu vụng hơn, nên cảm giác tự nhiên che mất nó. Đọc nhiều lần chỉ củng cố cảm giác đó. Nó không phải cố tình đổi từ, và không liên quan đến tốc độ đọc hay nhiều lỗi nhỏ."
      },
      {
        "question": "Khi dịch ngược để kiểm tra, cách làm nào cho kết quả đáng tin nhất?",
        "options": [
          "Mở phiên trò chuyện mới và chỉ đưa bản dịch tiếng Việt vào",
          "Hỏi ngay trong cùng cuộc trò chuyện vừa có bản gốc hiện ra phía trên",
          "Yêu cầu AI đối chiếu hai bản rồi tự kết luận là đúng",
          "Dịch ngược hai lần liên tiếp rồi lấy lần cho kết quả hay hơn"
        ],
        "correct": 0,
        "explanation": "Nếu AI vẫn thấy bản gốc, nó sẽ chép lại gần như nguyên văn thay vì dịch từ bản tiếng Việt, nên kết quả không chứng minh gì. Phiên mới buộc nó dịch thật từ bản của bạn, nên chữ bị đảo sẽ lộ ra khi so với gốc."
      },
      {
        "question": "Trong điều khoản giao hàng, nhóm từ nào cần soát kỹ nhất sau khi dịch?",
        "options": [
          "Từ chỉ thời điểm, số lượng và phạm vi như trước, sau, tối thiểu, bao gồm",
          "Từ chào hỏi, lời cảm ơn và câu xã giao ở đầu và cuối văn bản",
          "Tên công ty viết hoa ở phần đầu trang của văn bản",
          "Số trang và định dạng phông chữ của toàn bộ văn bản"
        ],
        "correct": 0,
        "explanation": "Những từ chỉ thời điểm, số lượng và phạm vi quyết định ai phải làm gì, khi nào, bao nhiêu, nên đổi một từ là đổi cả nghĩa vụ. Lời chào, tên công ty hay số trang ít khi làm đổi nghĩa vụ của hai bên."
      },
      {
        "question": "Bản dịch ngược ra \"sau khi thanh toán\" trong khi bản gốc ghi \"trước khi thanh toán\". Bước đúng là gì?",
        "options": [
          "Coi đây là dấu hiệu lỗi và hỏi người biết ngôn ngữ gốc",
          "Cho rằng hai bản có nghĩa gần giống nhau nên cứ bỏ qua chỗ lệch đó",
          "Sửa bản gốc cho khớp với bản dịch để khỏi lệch",
          "Dịch lại tới khi ra đúng chữ mong muốn rồi dùng ngay"
        ],
        "correct": 0,
        "explanation": "Chữ trước/sau đổi chỗ là lỗi đổi nghĩa thật, không phải khác biệt nhỏ. Không sửa bản gốc theo bản dịch và không dịch lại đến khi ra chữ mình thích, vì điều đó chỉ che lỗi; cần người biết ngôn ngữ gốc xác nhận nghĩa."
      },
      {
        "question": "Khi nào dịch ngược là chưa đủ để yên tâm?",
        "options": [
          "Khi văn bản là hợp đồng hoặc điều khoản có ràng buộc pháp lý",
          "Khi văn bản chỉ là một email hỏi thăm sức khoẻ khách",
          "Khi bản dịch và bản dịch ngược đã khớp ở từng câu nhỏ",
          "Khi bản gốc có dưới mười câu và không có con số nào trong đó, dù nội dung quan trọng"
        ],
        "correct": 0,
        "explanation": "Dịch ngược giúp bắt lỗi nghĩa rõ ràng nhưng không thay được chuyên gia khi văn bản có ràng buộc pháp lý; khi đó hỏi bộ phận pháp chế hoặc luật sư. Email hỏi thăm hay đoạn ngắn không số thì dịch ngược là đủ."
      }
    ],
    "keyTakeaways": [
      "Câu sai một từ vẫn đọc trôi: đừng tin cảm giác \"tự nhiên\".",
      "Dịch ngược trong phiên mới, không cho AI thấy bản gốc.",
      "Soát riêng các từ về thời điểm, số lượng, phạm vi.",
      "Lệch ở từ then chốt thì hỏi người biết ngôn ngữ gốc.",
      "Hợp đồng và điều khoản pháp lý: hỏi pháp chế."
    ],
    "practicePrompt": {
      "question": "Bản dịch ngược ra \"tối đa 500 thùng\" trong khi bản gốc ghi \"tối thiểu 500 thùng\". Điều gì đúng?",
      "options": [
        "Đây là lỗi đổi nghĩa, phải kiểm lại với người hiểu ngôn ngữ gốc",
        "Hai cụm này gần nghĩa nên cứ dùng bản dịch tiếng Việt",
        "Dịch lại cho tới khi máy ra chữ \"tối thiểu\" thì dùng",
        "Gửi luôn cho đối tác xem bản dịch và chờ họ phản hồi"
      ],
      "correct": 0,
      "explanation": "Tối thiểu và tối đa ngược nhau: ai đặt 600 thùng sẽ bị hiểu sai nghĩa vụ. Dịch lại nhiều lần chỉ tìm chữ vừa ý chứ không làm bản gốc rõ hơn, còn gửi đối tác xem để họ phát hiện thì đẩy rủi ro sang bên kia."
    },
    "summary": {
      "keyIdea": "Câu mượt không có nghĩa là câu đúng: một từ bị đảo vẫn đọc rất tự nhiên.",
      "formula": "Dịch → dịch ngược trong phiên mới → so các từ then chốt → lệch thì hỏi người.",
      "commonMistake": "Đọc bản dịch vài lần thấy trôi chảy rồi tin là đúng.",
      "action": "Chọn một điều khoản bạn từng dịch và thử dịch ngược trong một phiên mới."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Lấy một đoạn tiếng nước ngoài có con số hoặc thời hạn từ email hoặc tài liệu của bạn (đoạn không nhạy cảm). Nhờ AI dịch sang tiếng Việt, mở phiên mới dịch ngược lại, rồi gạch chân mọi từ chỉ thời điểm, số lượng, phạm vi và so với bản gốc.",
      "secondary": "Ghi lại chữ nào bị đổi nghĩa để tự lập một danh sách từ phải soát."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bản dịch điều khoản giao hàng đọc rất tự nhiên, không có lỗi chính tả, không chữ nào vụng. Chỉ có một từ \"trước\" bị đổi thành \"sau\", và bạn sẽ chỉ biết khi hàng đã giao trễ."
      },
      {
        "type": "feynman",
        "title": "Dịch ngược đơn giản hơn bạn nghĩ",
        "intro": "Hình dung bạn nhờ một người nói lại địa chỉ rồi bạn nói ngược lại cho người thứ hai nghe xem còn đúng không: nếu chữ nào méo, nó méo ra ở lượt quay về.",
        "columns": [
          "Thành phần",
          "Truyền lời hai lượt",
          "Dịch xuôi rồi dịch ngược"
        ],
        "rows": [
          [
            "Lượt đi",
            "Người A nói cho người B",
            "Dịch bản gốc sang tiếng Việt"
          ],
          [
            "Lượt về",
            "Người B nói lại cho người C",
            "Phiên mới dịch bản tiếng Việt về ngôn ngữ gốc"
          ],
          [
            "Chỗ so sánh",
            "Địa chỉ cuối có đúng địa chỉ đầu",
            "Các từ then chốt có khớp bản gốc"
          ],
          [
            "Điểm yếu",
            "Nếu người B nghe lại bản gốc thì phép thử vô nghĩa",
            "Nếu phiên ngược còn thấy bản gốc thì phép thử vô nghĩa"
          ]
        ],
        "oneLiner": "Dịch ngược là cho một người thứ hai nghe lại: nếu không ai biết bản gốc, chữ nào méo sẽ lộ."
      },
      {
        "type": "heading",
        "text": "Tình huống: điều khoản ký trong ngày mai"
      },
      {
        "type": "paragraph",
        "text": "Lỗi đổi nghĩa không làm câu vụng hơn, nên đọc lại không bắt được. Bạn cần một phép thử khác: dịch ngược ở phiên mới rồi so ở các từ then chốt, nhất là từ về thời điểm, số lượng và phạm vi."
      },
      {
        "type": "flow",
        "title": "Quy trình dịch ngược bốn bước",
        "steps": [
          {
            "label": "Dịch xuôi",
            "detail": "Dịch bản gốc sang tiếng Việt và đọc để hiểu ý chính."
          },
          {
            "label": "Mở phiên mới",
            "detail": "Đưa riêng bản tiếng Việt vào, không cho AI thấy bản gốc."
          },
          {
            "label": "Dịch ngược",
            "detail": "Nhờ dịch về ngôn ngữ gốc, rồi đặt cạnh bản gốc."
          },
          {
            "label": "So từ then chốt",
            "detail": "Gạch chân trước/sau, tối thiểu/tối đa, bao gồm/không bao gồm, con số, ngày. Lệch thì hỏi người biết ngôn ngữ gốc."
          }
        ]
      },
      {
        "type": "list",
        "items": [
          "Từ chỉ thời điểm: trước, sau, trong vòng, chậm nhất.",
          "Từ chỉ phạm vi: bao gồm, chưa bao gồm, chỉ, ngoại trừ.",
          "Từ chỉ số lượng: tối thiểu, tối đa, ít nhất, khoảng.",
          "Con số, ngày, đơn vị tiền và đơn vị đo."
        ]
      },
      {
        "type": "callout",
        "label": "Giới hạn của dịch ngược",
        "text": "Dịch ngược bắt được lỗi đổi nghĩa rõ ràng, nhưng không bảo đảm đúng sắc thái pháp lý. Với hợp đồng, điều khoản bồi thường hay cam kết, hãy hỏi bộ phận pháp chế hoặc luật sư trước khi ký."
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Soát bản dịch điều khoản giao hàng",
        "task": "Bản gốc (tiếng Anh) ghi: người bán giao hàng TRƯỚC khi người mua thanh toán; phí vận chuyển do người bán chịu; giao tối thiểu 500 thùng; hiệu lực tới 31/12. AI dịch ra bản dưới. Bấm vào những câu không đúng với bản gốc.",
        "segments": [
          {
            "text": "Điều 1: Bên bán sẽ giao hàng cho Bên mua."
          },
          {
            "text": "Điều 2: Bên bán giao hàng sau khi Bên mua thanh toán.",
            "error": "Bản gốc ghi người bán giao TRƯỚC khi thanh toán; bản dịch đảo thành \"sau\", đổi hẳn ai phải ứng vốn trước."
          },
          {
            "text": "Điều 3: Phí vận chuyển do Bên bán chịu."
          },
          {
            "text": "Điều 4: Số lượng mỗi lần giao tối đa 500 thùng.",
            "error": "Bản gốc ghi tối thiểu 500 thùng; \"tối đa\" là nghĩa ngược lại."
          },
          {
            "text": "Điều 5: Hợp đồng có hiệu lực tới ngày 31/12."
          },
          {
            "text": "Điều 6: Giá đã bao gồm thuế giá trị gia tăng.",
            "error": "Bản gốc không có câu nào về thuế; đây là câu AI tự thêm nghe hợp lý, cần hỏi kế toán trưởng nếu muốn đưa vào."
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Hôm trước khi ký hợp đồng",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn vừa dịch xong điều khoản thanh toán, đọc thấy trôi chảy. Ngày mai phải ký và chỉ còn một tiếng buổi chiều.",
            "choices": [
              {
                "label": "Mở phiên mới, dịch ngược và gạch chân các từ trước/sau, tối thiểu/tối đa",
                "next": "s2"
              },
              {
                "label": "Ký luôn vì bản dịch đã đọc lại hai lần và thấy ổn",
                "next": "bad1"
              }
            ]
          },
          "bad1": {
            "text": "Một tháng sau bạn mới biết điều khoản ghi người bán giao hàng trước, không phải sau. Bạn đã chuyển khoản trước như bản dịch nói, và giờ phải đàm phán lại.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bản dịch ngược ra \"thanh toán sau khi nhận hàng\" nhưng bản gốc ghi thanh toán trước khi nhận hàng. Hai bản lệch ở đúng từ về thời điểm.",
            "choices": [
              {
                "label": "Gửi cả ba bản cho người biết ngôn ngữ gốc hoặc pháp chế xác nhận trước khi ký",
                "next": "good"
              },
              {
                "label": "Sửa bản tiếng Việt cho khớp ý bạn tưởng rồi ký",
                "next": "bad2"
              }
            ]
          },
          "bad2": {
            "text": "Bạn sửa theo cảm giác mà không biết bản gốc thực sự nghĩa là gì. Hợp đồng ký đúng là hai bên hiểu khác nhau.",
            "ending": "bad"
          },
          "good": {
            "text": "Người xác nhận chỉ ra bản gốc ghi trước khi nhận hàng. Bạn sửa kịp, ký đúng điều khoản và lưu ba bản cạnh nhau để lần sau so nhanh.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Câu trôi không chứng minh nghĩa đúng: dịch ngược và soát từ then chốt.",
          "Bài sau: gom ghi chú rải rác cả ngày và giữ lại nguyên văn lời hẹn."
        ]
      }
    ]
  },
  {
    "id": 2388,
    "slug": "ghi-chu-cong-viec-nhanh-tren-duong-va-gom-lai-cuoi-ngay",
    "title": "Chặng 49, Bài 9: Ghi chú nhanh trên đường và gom lại cuối ngày",
    "subtitle": "Cả ngày bạn rải ghi chú khắp nơi; cuối ngày một người thư ký gom lại, miễn là bạn dặn giữ nguyên lời hẹn.",
    "duration": "8 phút",
    "difficulty": "Dễ",
    "emoji": "📝",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Ghi chú rải trong tin nhắn, ảnh chụp và ghi âm là thứ dễ mất nhất: tối về bạn chỉ nhớ có việc gì đó hẹn thứ Năm. Gom lại bằng AI giúp có một danh sách cho ngày mai, nhưng nếu AI được phép viết lại tự do, lời hẹn và con số sẽ bị làm tròn, làm mượt và sai đi.",
    "openingQuestion": "Cuối ngày bạn có bốn ghi chú rải rác, trong đó một dòng: \"Chị Hoa hẹn gọi lại thứ Năm sau 3 giờ\". Bạn nhờ AI gom thành danh sách việc. Bạn nên dặn gì để lời hẹn này không đổi?",
    "openingOptions": [
      "Giữ nguyên văn các lời hẹn, giờ và con số, đừng diễn đạt lại",
      "Viết lại cho thật gọn, tự nhiên và dễ đọc hơn so với bản gốc",
      "Sắp xếp các việc theo độ quan trọng mà AI tự đánh giá lấy",
      "Thêm lời nhắc và hạn chót hợp lý cho từng việc trong danh sách"
    ],
    "correctOption": 0,
    "explanation": "AI gom ghi chú rất giỏi nhưng khi được \"viết lại cho gọn\" nó sẽ làm tròn, suy ra và điền những chỗ trống: \"sau 3 giờ\" có thể thành \"3 giờ\", hay \"thứ Năm\" thành một ngày cụ thể. Dặn giữ nguyên văn lời hẹn, giờ và con số, và chỉ sắp xếp chứ không thêm, giữ cho danh sách là việc của bạn chứ không phải phỏng đoán của máy. Tự xếp hạng ưu tiên hay thêm hạn chót đều là AI quyết định thay bạn.",
    "diagram": [
      {
        "label": "Ghi nhanh trong ngày, không chỉnh",
        "arrow": true
      },
      {
        "label": "Đưa tất cả cho AI cùng một lúc",
        "arrow": true
      },
      {
        "label": "Dặn giữ nguyên văn lời hẹn, số",
        "arrow": true
      },
      {
        "label": "Đối chiếu danh sách với ghi chú gốc"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Một nhân viên kinh doanh gặp năm khách trong ngày và chỉ ghi vài chữ sau mỗi cuộc. Tối, chị dán tất cả vào AI kèm lời dặn \"giữ nguyên lời hẹn và con số, đánh dấu chỗ nào bạn không chắc\". Danh sách sáng hôm sau có sáu việc, một chỗ được đánh dấu cần hỏi lại. Tình huống chỉ để minh hoạ, không phải vụ việc có thật."
    },
    "quiz": [
      {
        "question": "Cách ghi chú nào giúp AI gom lại tốt nhất vào cuối ngày?",
        "options": [
          "Ghi ngắn nhưng đủ ai, việc gì, hẹn khi nào",
          "Ghi thật dài cho mỗi việc để AI không hiểu sai gì",
          "Chỉ ghi vài từ khoá rời rạc để khỏi mất thời gian",
          "Ghi bằng ký hiệu riêng mà chỉ bạn mới hiểu"
        ],
        "correct": 0,
        "explanation": "Ghi ngắn nhưng đủ ba thứ ai, việc gì, hẹn khi nào là đủ cho AI gom đúng. Từ khoá rời rạc hoặc ký hiệu riêng khiến AI đoán nghĩa, còn ghi quá dài tốn thời gian khi bạn đang đi đường."
      },
      {
        "question": "AI gom ghi chú thành \"Gọi chị Hoa thứ Năm 3 giờ\", còn ghi chú gốc là \"sau 3 giờ\". Đây là lỗi gì?",
        "options": [
          "AI bỏ mất chữ \"sau\" và làm lời hẹn chặt hơn thực tế",
          "AI tính sai múi giờ khi chuyển lời hẹn sang lịch",
          "AI tự đổi sang ngày khác vì không đọc được chữ viết trong ghi chú gốc của bạn",
          "AI hiểu đúng nhưng chỉ viết gọn lại cho dễ nhìn hơn"
        ],
        "correct": 0,
        "explanation": "Chữ \"sau\" làm lời hẹn là một khoảng thời gian, còn \"3 giờ\" là một mốc cụ thể. Đây không phải lỗi múi giờ hay lỗi đọc chữ, và cũng không phải viết gọn vô hại vì nó đổi ý người hẹn."
      },
      {
        "question": "Nên xử lý thế nào với một ghi chú quá mơ hồ như \"hỏi anh Tuấn vụ đó\"?",
        "options": [
          "Đánh dấu cần hỏi lại, không để AI đoán \"vụ đó\" là gì",
          "Để AI đoán vụ đó dựa trên các ghi chú quanh nó",
          "Xoá ghi chú đi vì không ai hiểu nổi nữa",
          "Giữ nguyên và tự hiểu, để AI ghi thêm chi tiết"
        ],
        "correct": 0,
        "explanation": "AI không biết \"vụ đó\" là gì, nếu đoán thì nó sẽ tạo ra một việc nghe hợp lý nhưng có thể sai hẳn. Xoá thì mất việc thật, còn để AI ghi thêm chi tiết chính là cho nó bịa. Đánh dấu để bạn tự nhớ hoặc hỏi lại."
      },
      {
        "question": "Ghi chú có tên khách và số điện thoại. Điều gì cần cân nhắc trước khi đưa cho AI?",
        "options": [
          "Công ty có cho phép đưa thông tin khách vào công cụ đó không",
          "Số điện thoại thường không chứa thông tin nhạy cảm",
          "Chỉ cần xoá tên, để lại số vẫn an toàn tuyệt đối",
          "AI không lưu thông tin nên nhập gì cũng được"
        ],
        "correct": 0,
        "explanation": "Tên và số điện thoại khách là dữ liệu cá nhân, nên trước hết phải xem công ty có duyệt công cụ đó không. Số điện thoại không phải thông tin vô hại, xoá một phần chưa chắc an toàn, và việc có lưu hay không phụ thuộc từng dịch vụ."
      },
      {
        "question": "Sau khi AI gom xong danh sách, bước cuối nên làm gì?",
        "options": [
          "Đối chiếu từng mục có giờ, tên hoặc số với ghi chú gốc",
          "Gửi ngay danh sách cho cả nhóm vì máy đã soát sẵn",
          "Xoá ghi chú gốc để chỉ còn một bản gọn gàng",
          "Hỏi AI xem nó có bỏ sót việc nào không rồi tin câu trả lời"
        ],
        "correct": 0,
        "explanation": "Đối chiếu là bước duy nhất biết danh sách có đúng không. Xoá ghi chú gốc làm bạn mất thứ duy nhất để so, còn hỏi AI có bỏ sót không chỉ cho câu trả lời tự tin mà không kiểm được."
      }
    ],
    "keyTakeaways": [
      "Ghi ngắn nhưng đủ ai, việc gì, hẹn khi nào.",
      "Dặn giữ nguyên văn lời hẹn, giờ và con số.",
      "Chỗ mơ hồ: đánh dấu hỏi lại, đừng để AI đoán.",
      "Đừng đưa thông tin khách vào công cụ công ty chưa duyệt.",
      "Luôn đối chiếu danh sách với ghi chú gốc trước khi dùng."
    ],
    "practicePrompt": {
      "question": "Ghi chú: \"Anh Nam muốn báo giá trước cuối tuần\". AI gom thành \"Gửi báo giá cho anh Nam thứ Sáu\". Bạn nên làm gì?",
      "options": [
        "Đổi lại theo ghi chú gốc: \"trước cuối tuần\", chưa chốt thứ Sáu",
        "Giữ thứ Sáu vì nghe hợp lý và cụ thể hơn",
        "Để nguyên và hi vọng anh Nam cũng hiểu như vậy",
        "Hỏi AI xem thứ Sáu có đúng ý anh Nam không"
      ],
      "correct": 0,
      "explanation": "\"Trước cuối tuần\" là một khoảng thời gian, còn \"thứ Sáu\" là mốc do AI chọn; nếu anh Nam cần thứ Tư thì bạn trễ. Hỏi AI về ý người khác không có kết quả đáng tin vì nó không ở đó."
    },
    "summary": {
      "keyIdea": "AI gom nhanh, nhưng lời hẹn của khách phải nguyên văn: bạn cần nó sắp xếp, không cần nó diễn đạt lại.",
      "formula": "Ghi nhanh + dặn giữ nguyên văn + đối chiếu gốc = danh sách đáng tin.",
      "commonMistake": "Để AI \"viết lại cho gọn\" nên giờ hẹn và con số bị làm tròn hoặc điền thêm.",
      "action": "Tối nay gom ba ghi chú của hôm nay bằng một yêu cầu có câu \"giữ nguyên văn lời hẹn\"."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Lấy 4-5 ghi chú thật của hôm nay (tin nhắn, ảnh chụp bảng, ghi âm đã chép ra chữ), bỏ tên khách nếu công ty chưa duyệt công cụ. Nhờ AI gom thành danh sách việc cho ngày mai, dặn giữ nguyên văn lời hẹn và đánh dấu chỗ mơ hồ. Đối chiếu từng dòng với ghi chú gốc.",
      "secondary": "Đếm xem AI đã đổi bao nhiêu chỗ giờ hoặc con số, để biết mức cẩn thận bạn cần."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Cả ngày bạn rải ghi chú khắp nơi: một tin nhắn cho chính mình, ảnh chụp bảng, một đoạn ghi âm lúc đi bộ. Tối về chúng nằm ở ba chỗ khác nhau, và bạn không còn nhớ việc nào gấp."
      },
      {
        "type": "feynman",
        "title": "Gom ghi chú đơn giản hơn bạn nghĩ",
        "intro": "Hình dung một người thư ký cuối ngày gom những tờ giấy nhớ vàng dán khắp bàn thành một danh sách. Nếu bạn dặn chép nguyên văn thì chị chép; nếu không, chị sẽ tự viết lại cho gọn.",
        "columns": [
          "Thành phần",
          "Thư ký gom giấy nhớ",
          "AI gom ghi chú"
        ],
        "rows": [
          [
            "Việc làm",
            "Xếp các tờ giấy nhớ thành một danh sách",
            "Xếp các ghi chú thành danh sách việc"
          ],
          [
            "Điểm mạnh",
            "Nhanh, không bỏ sót tờ nào",
            "Nhanh, gom từ nhiều nguồn"
          ],
          [
            "Điểm yếu",
            "Tự hiểu chỗ viết tắt và có thể hiểu sai",
            "Điền chỗ trống, làm tròn giờ và số"
          ],
          [
            "Cách dặn",
            "Chép nguyên văn giờ hẹn, chỗ nào không rõ thì hỏi",
            "Giữ nguyên văn, đánh dấu chỗ mơ hồ"
          ]
        ],
        "oneLiner": "AI gom ghi chú như một thư ký nhanh: dặn giữ nguyên văn lời hẹn, còn chỗ mơ hồ thì để chị hỏi lại."
      },
      {
        "type": "heading",
        "text": "Tình huống: bốn ghi chú, một buổi tối"
      },
      {
        "type": "paragraph",
        "text": "Việc của AI là gom, nhóm và sắp xếp. Việc của bạn là giữ nguyên lời hẹn và con số, vì đó là chỗ người khác dựa vào bạn. Hai việc khác nhau, nên lời dặn phải tách bạch."
      },
      {
        "type": "flow",
        "title": "Gom ghi chú cuối ngày",
        "steps": [
          {
            "label": "Ghi nhanh, đừng chỉnh",
            "detail": "Trong ngày chỉ ghi ai, việc gì, hẹn khi nào. Chữ gọn là đủ."
          },
          {
            "label": "Đưa tất cả cho AI một lượt",
            "detail": "Dán tin nhắn, chữ chép từ ảnh hoặc ghi âm vào cùng một yêu cầu."
          },
          {
            "label": "Dặn rõ ba điều",
            "detail": "Giữ nguyên văn giờ và con số; chỉ sắp xếp, không thêm; đánh dấu chỗ không chắc."
          },
          {
            "label": "Đối chiếu với ghi chú gốc",
            "detail": "Đọc từng dòng có giờ, tên, số và so với gốc trước khi dùng."
          },
          {
            "label": "Chuyển thành việc của ngày mai",
            "detail": "Copy vào lịch hoặc danh sách việc của bạn, xoá mục đã xong."
          }
        ]
      },
      {
        "type": "callout",
        "label": "Cẩn thận: dữ liệu khách hàng",
        "text": "Tên và số điện thoại khách là dữ liệu cá nhân. Chỉ đưa vào công cụ công ty đã duyệt; nếu chưa chắc, bỏ tên, dùng ký hiệu và hỏi bộ phận IT hoặc pháp chế."
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Lắp yêu cầu gom ghi chú",
        "task": "Bạn có 4 ghi chú rải trong ngày, gồm lời hẹn \"chị Hoa gọi lại thứ Năm sau 3 giờ\". Lắp yêu cầu để AI gom thành danh sách việc cho ngày mai.",
        "parts": [
          {
            "id": "rule",
            "label": "Cách xử lý lời hẹn",
            "options": [
              {
                "text": "Giữ nguyên văn mọi lời hẹn, giờ và con số, chỉ sắp xếp, không diễn đạt lại.",
                "good": true,
                "feedback": "Lời hẹn và con số được giữ nguyên nên danh sách đáng tin và dễ đối chiếu."
              },
              {
                "text": "Viết lại cho gọn và dễ đọc.",
                "feedback": "AI có thể làm tròn \"sau 3 giờ\" thành \"3 giờ\" hoặc điền ngày tự chọn; bạn sẽ không nhận ra."
              }
            ]
          },
          {
            "id": "unsure",
            "label": "Chỗ không chắc",
            "options": [
              {
                "text": "Nếu ghi chú mơ hồ, hãy đoán ý cho tôi.",
                "feedback": "AI sẽ bịa chi tiết nghe hợp lý cho ghi chú như \"hỏi anh Tuấn vụ đó\"."
              },
              {
                "text": "Nếu ghi chú mơ hồ, hãy đánh dấu \"cần hỏi lại\" và không đoán.",
                "good": true,
                "feedback": "Chỗ mơ hồ được nêu rõ để bạn tự xử lý."
              }
            ]
          },
          {
            "id": "format",
            "label": "Cách trình bày",
            "options": [
              {
                "text": "Liệt kê theo dạng: việc - người - hạn - ghi chú gốc.",
                "good": true,
                "feedback": "Có cột ghi chú gốc nên bạn đối chiếu được ngay trên danh sách."
              },
              {
                "text": "Trình bày cho đẹp.",
                "feedback": "\"Đẹp\" không phải yêu cầu đo được; danh sách thường mất cột bạn cần để kiểm."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "rule",
              "unsure",
              "format"
            ],
            "text": "1. Gọi lại chị Hoa - thứ Năm, sau 3 giờ (gốc: \"Chị Hoa hẹn gọi lại thứ Năm sau 3 giờ\").\n2. Gửi báo giá anh Nam - trước cuối tuần (gốc giữ nguyên).\n3. Cần hỏi lại: \"hỏi anh Tuấn vụ đó\" - ghi chú chưa rõ."
          },
          {
            "requires": [
              "rule"
            ],
            "text": "1. Gọi lại chị Hoa - thứ Năm.\n2. Gửi báo giá anh Nam.\n3. Hỏi anh Tuấn về vụ đó.\n(Đã bỏ chữ \"sau 3 giờ\" và không ghi chỗ mơ hồ.)"
          },
          {
            "text": "1. Gọi chị Hoa thứ Năm 3 giờ chiều.\n2. Gửi báo giá anh Nam thứ Sáu.\n3. Hỏi anh Tuấn về hợp đồng mới.\n(Giờ, ngày và nội dung \"hợp đồng mới\" do AI tự điền.)"
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Tối thứ Tư, gom ghi chú",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn có bốn ghi chú. AI trả danh sách gọn ghẽ, trong đó có \"Gọi chị Hoa thứ Năm 3 giờ chiều\". Ghi chú gốc ghi \"sau 3 giờ\".",
            "choices": [
              {
                "label": "Đối chiếu ghi chú gốc và sửa lại thành \"sau 3 giờ\"",
                "next": "s2"
              },
              {
                "label": "Dùng luôn, vì danh sách trông rất hợp lý",
                "next": "bad1"
              }
            ]
          },
          "bad1": {
            "text": "Bạn gọi lúc 3 giờ, chị Hoa đang họp và không nghe máy. Chị cảm thấy bạn không để ý lời chị dặn.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bạn thấy thêm một mục \"Hỏi anh Tuấn về hợp đồng mới\" trong khi ghi chú gốc chỉ ghi \"hỏi anh Tuấn vụ đó\".",
            "choices": [
              {
                "label": "Đổi lại thành \"hỏi anh Tuấn vụ đó - nhớ lại là vụ gì\" và đánh dấu cần tự nhớ",
                "next": "good"
              },
              {
                "label": "Giữ mục \"hợp đồng mới\" vì nghe có lý",
                "next": "bad2"
              }
            ]
          },
          "bad2": {
            "text": "Anh Tuấn thật ra muốn hỏi về lô hàng lỗi. Bạn chuẩn bị nhầm tài liệu và mất nửa buổi sáng.",
            "ending": "bad"
          },
          "good": {
            "text": "Danh sách của bạn có ba mục đúng giờ, đúng lời hẹn, và một mục ghi rõ \"cần nhớ lại\". Sáng mai bạn chỉ cần làm theo.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "AI gom và sắp xếp; lời hẹn và con số giữ nguyên văn, bạn đối chiếu với gốc.",
          "Bài sau: mini dự án, một ngày đi gặp khách chỉ bằng điện thoại."
        ]
      }
    ]
  },
  {
    "id": 2389,
    "slug": "du-an-quy-trinh-di-cong-tac-mot-ngay-tren-dien-thoai",
    "title": "Chặng 49, Bài 10: Mini dự án: một ngày đi gặp khách chỉ bằng điện thoại",
    "subtitle": "Một ngày đi gặp khách gồm chuẩn bị, nghe, ghi chép và cảm ơn; mỗi bước có một chỗ AI giúp và một chỗ bạn phải kiểm.",
    "duration": "10 phút",
    "difficulty": "Dễ",
    "emoji": "🧭",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Bạn đã học từng mảnh: nói thay gõ, chụp danh thiếp, dịch tại chỗ, gom ghi chú. Mini dự án này nối chúng thành một quy trình năm bước cho cả chuyến đi gặp khách, để lần sau bạn không phải nghĩ lại từ đầu mà chỉ cần làm theo một danh sách.",
    "openingQuestion": "Bạn sắp đi gặp một khách hàng mới cả ngày và chỉ mang điện thoại. Bước nào nên làm ĐẦU TIÊN để chuyến đi trôi chảy?",
    "openingOptions": [
      "Chuẩn bị: ghi mục tiêu, thông tin cần hỏi và câu hỏi chính trước chuyến đi",
      "Gặp khách trước, vì ghi chép lúc đó sẽ tự nhiên và đầy đủ nhất",
      "Tải sẵn ứng dụng dịch và ghi âm để lúc cần là có ngay",
      "Soạn sẵn thư cảm ơn, rồi sửa lại sau khi gặp khách xong"
    ],
    "correctOption": 0,
    "explanation": "Chuyến đi thành công nhờ phần chuẩn bị: bạn biết mình cần gì, sẽ hỏi gì, và chỗ nào phải xác nhận lại. Nếu không có mục tiêu, các công cụ điện thoại chỉ ghi lại một buổi trò chuyện lan man. Có ứng dụng sẵn là cần nhưng chưa đủ; soạn thư cảm ơn trước khi gặp thì bạn chưa biết thư nói gì; và gặp trước không chuẩn bị thường bỏ sót điều quan trọng.",
    "diagram": [
      {
        "label": "Chuẩn bị mục tiêu và câu hỏi",
        "arrow": true
      },
      {
        "label": "Nghe và ghi nhanh khi gặp",
        "arrow": true
      },
      {
        "label": "Xác nhận con số, ngày bằng cách viết",
        "arrow": true
      },
      {
        "label": "Gom ghi chú cuối ngày",
        "arrow": true
      },
      {
        "label": "Gửi thư cảm ơn sau khi đọc lại"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Một nhân viên kinh doanh đi gặp ba khách trong một ngày chỉ với điện thoại. Sáng cô ghi ba câu hỏi chính cho mỗi khách. Giữa ngày cô chụp danh thiếp và ghi nhanh, chiều gom ghi chú, tối gửi ba thư cảm ơn sau khi đọc lại. Tình huống chỉ để minh hoạ, không phải một vụ việc có thật."
    },
    "quiz": [
      {
        "question": "Mục đích của bước chuẩn bị trước chuyến đi là gì?",
        "options": [
          "Biết mình cần lấy được gì từ buổi gặp",
          "Có sẵn các công cụ để khỏi phải tìm lúc gặp",
          "Soạn sẵn mọi câu trả lời khách có thể hỏi bạn",
          "Viết xong thư cảm ơn để gửi ngay sau cuộc gặp"
        ],
        "correct": 0,
        "explanation": "Mục tiêu và câu hỏi chính làm bạn biết nghe và ghi cái gì. Công cụ sẵn sàng hay thư viết trước đều có ích nhưng không quyết định buổi gặp có lấy được điều cần hay không."
      },
      {
        "question": "Trong buổi gặp, điều nào nên viết ra để khách xác nhận?",
        "options": [
          "Số lượng, ngày giao, giá và người liên hệ",
          "Lời chào và cách xưng hô hai bên",
          "Nhận xét chung của bạn về văn phòng khách",
          "Nội dung cuộc trò chuyện ngoài lề về giao thông"
        ],
        "correct": 0,
        "explanation": "Số lượng, ngày, giá và người liên hệ là thứ hai bên sẽ dựa vào nên phải xác nhận. Lời chào, nhận xét về văn phòng hay chuyện ngoài lề không ảnh hưởng tới việc làm tiếp theo."
      },
      {
        "question": "Khi gom ghi chú cuối ngày, lời dặn AI nào là quan trọng nhất?",
        "options": [
          "Giữ nguyên văn lời hẹn và con số, chỗ mơ hồ thì đánh dấu",
          "Viết ngắn gọn, đẹp và đúng văn phong công ty",
          "Tự sắp xếp theo độ quan trọng rồi bỏ việc nhỏ",
          "Thêm hạn chót phù hợp cho từng việc"
        ],
        "correct": 0,
        "explanation": "Lời hẹn và con số là chỗ người khác dựa vào bạn nên phải nguyên văn. Văn phong đẹp, tự bỏ việc nhỏ hay thêm hạn chót là AI quyết định thay bạn, có thể sai."
      },
      {
        "question": "Thư cảm ơn do AI soạn sau buổi gặp. Bước nào bắt buộc trước khi gửi?",
        "options": [
          "Đọc lại và kiểm mọi con số, tên, lời hứa trong thư",
          "Gửi ngay để khách nhận khi còn nhớ buổi gặp",
          "Nhờ AI tự kiểm xem thư có lỗi gì không rồi gửi",
          "Thêm vài câu chúc tụng thật dài để thư trang trọng hơn với khách"
        ],
        "correct": 0,
        "explanation": "Người gửi là bạn nên chịu trách nhiệm cho mọi con số và lời hứa trong thư; AI có thể tự thêm lời hứa bạn chưa nói. Gửi ngay hay để AI tự kiểm không thay được việc đọc, và câu chúc dài không làm thư đúng hơn."
      },
      {
        "question": "Dữ liệu nào nên cẩn thận nhất khi dùng công cụ trên điện thoại cho chuyến gặp khách?",
        "options": [
          "Tên, số điện thoại khách và giá chưa công bố",
          "Địa chỉ quán cà phê bạn hẹn gặp khách",
          "Tên tài liệu công khai của công ty",
          "Lịch xe buýt tới nhà khách"
        ],
        "correct": 0,
        "explanation": "Tên, số điện thoại khách và giá chưa công bố là dữ liệu nhạy cảm, nên cần xem công ty có duyệt công cụ hay chưa. Địa chỉ quán, tài liệu công khai hay lịch xe buýt có rủi ro thấp."
      }
    ],
    "keyTakeaways": [
      "Chuẩn bị mục tiêu và câu hỏi trước chuyến đi.",
      "Con số, ngày, giá: viết ra và để khách xác nhận.",
      "Gom ghi chú cuối ngày, dặn giữ nguyên lời hẹn.",
      "Đọc lại thư cảm ơn, kiểm số, tên, lời hứa.",
      "Dữ liệu khách chỉ vào công cụ công ty đã duyệt."
    ],
    "practicePrompt": {
      "question": "Bước nào trong quy trình năm bước KHÔNG nên giao hoàn toàn cho AI?",
      "options": [
        "Xác nhận con số và ngày với khách bằng cách viết",
        "Nháp thư cảm ơn sau buổi gặp",
        "Gom ghi chú thành danh sách việc",
        "Gợi ý câu hỏi trước chuyến đi"
      ],
      "correct": 0,
      "explanation": "Xác nhận với khách là việc giữa hai người, AI không thể thay. Nháp thư, gom ghi chú và gợi ý câu hỏi đều là việc chữ mà AI làm tốt nếu bạn đọc lại."
    },
    "summary": {
      "keyIdea": "Quy trình năm bước: chuẩn bị, nghe và ghi, xác nhận, gom lại, cảm ơn.",
      "formula": "Mục tiêu + ghi nhanh + viết ra xác nhận + gom nguyên văn + đọc lại thư = một ngày gọn.",
      "commonMistake": "Tin vào công cụ cho cả ngày mà quên bước xác nhận và đọc lại.",
      "action": "Viết ra quy trình năm bước cho chuyến đi gặp khách kế tiếp của bạn."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn một buổi gặp khách hoặc đối tác sắp tới. Viết quy trình năm bước cho nó: mục tiêu ba câu hỏi, cách ghi nhanh, hai con số phải xác nhận, yêu cầu gom cuối ngày (có câu \"giữ nguyên văn lời hẹn\") và dàn ý thư cảm ơn. Lưu thành một ghi chú trên điện thoại.",
      "secondary": "Sau buổi gặp, đánh dấu bước nào bạn bỏ qua và vì sao."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bốn bài trước dạy từng mảnh: dịch tại chỗ, đọc chữ lạ, bắt lỗi dịch, gom ghi chú. Bài này nối chúng lại thành một quy trình mà bạn có thể làm đi làm lại cho mỗi chuyến gặp khách."
      },
      {
        "type": "feynman",
        "title": "Quy trình đi gặp khách đơn giản hơn bạn nghĩ",
        "intro": "Hình dung một buổi đi chợ: bạn có danh sách trước khi đi, ghi nhanh giá lúc mua, hỏi lại người bán số tiền, về nhà xếp lại, rồi cảm ơn người bán quen.",
        "columns": [
          "Bước",
          "Đi chợ",
          "Gặp khách bằng điện thoại"
        ],
        "rows": [
          [
            "Trước khi đi",
            "Lập danh sách cần mua",
            "Ghi mục tiêu và câu hỏi chính"
          ],
          [
            "Lúc mua",
            "Hỏi giá, nhẩm nhanh",
            "Nghe và ghi nhanh, không chỉnh"
          ],
          [
            "Trả tiền",
            "Hỏi lại số tiền trước khi đưa",
            "Viết số, ngày ra cho khách xác nhận"
          ],
          [
            "Về nhà",
            "Xếp lại đồ, ghi chi tiêu",
            "Gom ghi chú, giữ nguyên lời hẹn"
          ],
          [
            "Sau đó",
            "Cảm ơn người bán",
            "Đọc lại thư cảm ơn rồi gửi"
          ]
        ],
        "oneLiner": "Đi gặp khách như đi chợ có danh sách: chuẩn bị trước, hỏi lại số tiền, về nhà xếp lại, rồi cảm ơn."
      },
      {
        "type": "heading",
        "text": "Tình huống: ba khách trong một ngày"
      },
      {
        "type": "paragraph",
        "text": "Mỗi bước có một việc điện thoại làm giúp bạn và một điều bạn phải kiểm. Bốn bài trước là bốn mảnh ghép; việc của bài này là nối chúng theo đúng thứ tự."
      },
      {
        "type": "flow",
        "title": "Năm bước cho một chuyến gặp khách",
        "steps": [
          {
            "label": "1. Chuẩn bị",
            "detail": "Ghi mục tiêu, ba câu hỏi chính và hai thứ phải xác nhận (số lượng, ngày). Nhờ AI gợi ý thêm câu hỏi, rồi chọn."
          },
          {
            "label": "2. Nghe và ghi nhanh",
            "detail": "Ghi ai, việc gì, hẹn khi nào. Nếu có người nước ngoài thì dịch trực tiếp cho ý chính."
          },
          {
            "label": "3. Xác nhận bằng cách viết",
            "detail": "Viết số lượng, ngày, giá ra cho khách xem và gật, như bài 6."
          },
          {
            "label": "4. Gom cuối ngày",
            "detail": "Đưa ghi chú cho AI, dặn giữ nguyên văn lời hẹn và đánh dấu chỗ mơ hồ, như bài 9."
          },
          {
            "label": "5. Thư cảm ơn",
            "detail": "AI nháp ba câu từ danh sách đã đối chiếu. Bạn đọc lại con số, tên, lời hứa rồi gửi."
          }
        ]
      },
      {
        "type": "list",
        "items": [
          "Trước chuyến đi: mục tiêu, ba câu hỏi, hai thứ phải xác nhận.",
          "Trong chuyến đi: ghi nhanh, viết con số ra cho khách xác nhận.",
          "Cuối ngày: gom nguyên văn, đối chiếu với ghi chú gốc.",
          "Sau chuyến đi: đọc lại thư cảm ơn rồi mới gửi."
        ]
      },
      {
        "type": "callout",
        "label": "Cẩn thận: dữ liệu và trách nhiệm",
        "text": "Chỉ đưa tên và số điện thoại khách, giá chưa công bố vào công cụ công ty đã duyệt. Và người gửi thư là bạn: con số, tên và lời hứa trong thư đều do bạn chịu trách nhiệm."
      },
      {
        "type": "scenario",
        "title": "Một ngày, ba khách, một điện thoại",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Sáng thứ Ba, bạn có ba buổi gặp khách và chỉ mang điện thoại. Bạn còn 15 phút trước buổi đầu.",
            "choices": [
              {
                "label": "Ghi mục tiêu, ba câu hỏi và hai thứ cần xác nhận cho từng khách",
                "next": "s2"
              },
              {
                "label": "Đi thẳng vào gặp, lúc gặp sẽ ghi lại những gì quan trọng",
                "next": "bad1"
              }
            ]
          },
          "bad1": {
            "text": "Buổi đầu lan man và bạn quên hỏi ngày giao. Khách phải gọi lại hai lần để hoàn thiện đơn, khiến họ thấy bạn thiếu chuẩn bị.",
            "ending": "bad"
          },
          "s2": {
            "text": "Buổi thứ hai, khách nói một con số và một ngày giao. Bạn thấy mình chưa chắc đã hiểu đúng.",
            "choices": [
              {
                "label": "Viết số và ngày ra màn hình để khách xác nhận",
                "next": "s3"
              },
              {
                "label": "Gật đầu, vì ghi âm đã lưu lại cuộc trò chuyện",
                "next": "bad2"
              }
            ]
          },
          "bad2": {
            "text": "Ghi âm có, nhưng tối về bạn không muốn nghe lại cả một tiếng. Con số bạn nhớ khác con số khách nói, và hai bên đã hiểu khác nhau.",
            "ending": "bad"
          },
          "s3": {
            "text": "Tối về, bạn có ba khách và nhiều ghi chú. Bạn nhờ AI gom và viết ba thư cảm ơn.",
            "choices": [
              {
                "label": "Dặn giữ nguyên văn lời hẹn, rồi đối chiếu số và lời hứa với ghi chú gốc trước khi gửi",
                "next": "good"
              },
              {
                "label": "Gửi luôn ba thư vì AI viết trôi chảy và lịch sự",
                "next": "bad3"
              }
            ]
          },
          "bad3": {
            "text": "Một thư có câu \"chúng tôi sẽ giảm giá 5%\" mà bạn chưa hề hứa. Khách trả lời đồng ý, và bạn phải giải thích với sếp.",
            "ending": "bad"
          },
          "good": {
            "text": "Ba thư đúng số, đúng ngày, không có lời hứa thừa. Sáng hôm sau cả ba khách trả lời xác nhận và bạn có sẵn quy trình năm bước để dùng cho chuyến sau.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Chuẩn bị, ghi nhanh, xác nhận bằng cách viết, gom nguyên văn, đọc lại thư.",
          "Phần tiếp: giữ điện thoại làm việc an toàn."
        ]
      }
    ]
  }
];
