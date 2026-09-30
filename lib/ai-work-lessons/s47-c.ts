import type { Lesson } from "../lesson-types";

// Chặng 47, bài 11-15. Giáo trình: scripts/curriculum/stage-47.json.
// Không nêu nút bấm, giá hay phiên bản công cụ; ngôn ngữ được hỗ trợ: xem tài liệu chính thức của công cụ.
export const S47_C_LESSONS: Lesson[] = [
  {
    "id": 2350,
    "slug": "dich-truc-tiep-cuoc-goi-voi-doi-tac-nuoc-ngoai",
    "title": "Chặng 47, Bài 11: Dịch trực tiếp cuộc gọi với đối tác nước ngoài",
    "subtitle": "Phiên dịch nhanh nhưng mới vào nghề: nghe tạm ổn, còn chỗ quan trọng thì phải hỏi lại.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "🌐",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Một cuộc gọi với đối tác nước ngoài có đúng vài câu quyết định: giá, số lượng, hạn giao. Nếu công cụ dịch trực tiếp nghe sai đúng những câu đó mà bạn không biết, hai bên ra khỏi cuộc gọi với hai cách hiểu khác nhau. Biết kiểm câu quan trọng bằng hai động tác đơn giản giúp bạn dùng được công cụ mà không đánh cược cả đơn hàng.",
    "openingQuestion": "Bạn gọi video với đối tác, công cụ dịch hiện phụ đề tiếng Việt. Đối tác nói một câu về hạn giao hàng mà phụ đề ghi 'cuối tháng'. Bạn nên làm gì?",
    "openingOptions": [
      "Ghi 'cuối tháng' vào biên bản vì phụ đề hiển thị rất rõ chữ nên không cần hỏi lại",
      "Đoán ngày 30 cho chắc rồi báo kho chuẩn bị theo ngày đó",
      "Nhắc lại hạn giao bằng lời và nhờ đối tác xác nhận bằng ngày cụ thể",
      "Tắt phụ đề và nghe tiếng gốc dù bạn chưa rành ngôn ngữ đó"
    ],
    "correctOption": 2,
    "explanation": "Phụ đề hiện rõ không có nghĩa là dịch đúng: 'cuối tháng' có thể là ngày 25, ngày 30 hoặc 'sau ngày 28', tuỳ câu gốc. Việc an toàn là nhắc lại điều bạn hiểu và xin người nói xác nhận bằng ngày cụ thể, vì chỉ người nói mới biết mình định nói gì. Tin phụ đề là đặt cược vào một câu dịch, còn tự đoán ngày 30 là bịa thêm thông tin. Tắt phụ đề thì bạn mất luôn chỗ dựa mà chưa có gì thay thế.",
    "diagram": [
      {
        "label": "Người kia nói, công cụ dịch ra phụ đề",
        "arrow": true
      },
      {
        "label": "Bạn đánh dấu câu quan trọng: giá, số, ngày",
        "arrow": true
      },
      {
        "label": "Dịch ngược hoặc nhắc lại bằng lời bạn",
        "arrow": true
      },
      {
        "label": "Người kia xác nhận rồi bạn mới ghi nhận"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: công ty phân phối nhỏ gọi đối tác ở nước ngoài",
      "description": "Chị Hà bàn đơn hàng với nhà cung cấp qua công cụ dịch trực tiếp. Mọi thứ trôi chảy, nhưng với ba con số cuối cuộc gọi chị nhắc lại bằng lời: 'Vậy là 800 thùng, giao ngày 20, giá như báo giá tuần trước, đúng không?'. Đối tác sửa lại số lượng thành 600. Hai phút kiểm lại tránh được một đơn hàng sai."
    },
    "quiz": [
      {
        "question": "Vì sao câu quan trọng trong cuộc gọi cần kiểm lại dù phụ đề trông trôi chảy?",
        "options": [
          "Vì phụ đề luôn chậm hơn người nói ít nhất một phút rưỡi, nên phải chờ rồi mới hiểu được",
          "Vì công cụ dịch chỉ chạy đúng khi hai bên nói cùng tốc độ",
          "Phụ đề trôi chảy vẫn có thể dịch sai số, ngày hoặc phủ định",
          "Vì phụ đề chỉ hiện từ khoá chứ không bao giờ hiện cả câu"
        ],
        "correct": 2,
        "explanation": "Lỗi nguy hiểm nhất là lỗi nghe hợp lý: sai một con số, một ngày hoặc thiếu chữ 'không'. Phụ đề chậm vài giây là bình thường, không phải lý do kiểm. Công cụ thường hiện cả câu chứ không chỉ từ khoá, và tốc độ nói chỉ ảnh hưởng độ chính xác chứ không quyết định đúng sai."
      },
      {
        "question": "Dịch ngược nghĩa là gì, và dùng khi nào?",
        "options": [
          "Dịch câu đã hiểu ngược về ngôn ngữ gốc để xem nghĩa có còn giữ nguyên không",
          "Bật phụ đề tiếng gốc bên cạnh tiếng Việt trong suốt cuộc gọi",
          "Dịch cả biên bản một lượt sau buổi họp để đối chiếu với bản ghi",
          "Nhờ đối tác nói chậm lại gấp đôi khi bàn về con số và ngày"
        ],
        "correct": 0,
        "explanation": "Dịch ngược là lấy câu bạn định nói hoặc câu bạn hiểu, dịch sang ngôn ngữ của người kia và xem nghĩa có lệch không. Dùng cho câu quan trọng: giá, số lượng, hạn. Bật phụ đề gốc, dịch biên bản cuối buổi hay yêu cầu nói chậm đều có ích nhưng không phải là dịch ngược."
      },
      {
        "question": "Công cụ dịch hiện 'không thể giao trước ngày 20'. Bạn chưa chắc. Bước hợp lý nhất?",
        "options": [
          "Báo kho chuẩn bị nhận hàng trước ngày 20 để kịp tiến độ chung, dù đối tác chưa hề hứa",
          "Hỏi lại: 'Vậy ngày sớm nhất có thể giao là ngày 20, đúng không?'",
          "Chuyển câu thành 'có thể giao ngày 20' vì nghĩa gần giống nhau",
          "Im lặng để tránh làm đối tác phật ý rồi kiểm lại bằng email sau"
        ],
        "correct": 1,
        "explanation": "'Không thể giao trước ngày 20' và 'có thể giao ngày 20' khác hẳn nhau: một câu là mốc sớm nhất, câu kia là cam kết. Báo kho chuẩn bị trước ngày 20 làm sai hẳn hướng. Im lặng để kiểm sau có thể muộn, vì hai bên đã tưởng mình thống nhất. Hỏi lại tại chỗ chỉ tốn mười giây."
      },
      {
        "question": "Khi nào nên chuyển từ dịch tự động sang phiên dịch viên người thật?",
        "options": [
          "Khi đối tác nói nhanh hơn người Việt bình thường hay nói",
          "Khi cuộc gọi kéo dài hơn một giờ đồng hồ liên tục",
          "Khi nội dung có hệ quả pháp lý hoặc tài chính lớn và sai một chữ là mất nhiều",
          "Khi công cụ dịch hiện phụ đề trễ hơn người nói vài giây"
        ],
        "correct": 2,
        "explanation": "Tiêu chí là mức rủi ro của nội dung, không phải tốc độ hay độ dài cuộc gọi. Ký hợp đồng, thoả thuận giá lớn, điều khoản trách nhiệm: nên có người thật hoặc bộ phận pháp chế xem. Nói nhanh, gọi dài hay phụ đề trễ chỉ làm bạn thêm mệt chứ không tự nó đòi hỏi phiên dịch."
      },
      {
        "question": "Trước cuộc gọi, việc chuẩn bị nào giúp bản dịch ít sai nhất?",
        "options": [
          "Gửi cho đối tác ảnh chụp màn hình công cụ dịch mà bạn dùng",
          "Chọn công cụ dịch có giao diện đẹp nhất trong các công cụ có sẵn",
          "Soạn sẵn toàn bộ lời thoại rồi đọc đúng từng chữ trong cuộc gọi, không chừa chỗ hỏi lại",
          "Lập danh sách tên riêng, sản phẩm và thuật ngữ, xem công cụ xử lý ra sao"
        ],
        "correct": 3,
        "explanation": "Tên riêng, tên sản phẩm và thuật ngữ ngành là chỗ công cụ dịch hay hiểu sai. Thử trước vài câu với chúng để biết chỗ nào cần diễn đạt lại. Giao diện đẹp không liên quan độ chính xác. Đọc thuộc lời thoại làm cuộc gọi cứng và không giúp nghe hiểu phía đối tác. Còn ảnh chụp màn hình thì không làm bản dịch đúng hơn."
      }
    ],
    "keyTakeaways": [
      "Phụ đề dịch trực tiếp nghe trôi chảy, không đồng nghĩa với đúng.",
      "Câu quan trọng (giá, số, ngày, phủ định) luôn nhắc lại bằng lời và xin xác nhận.",
      "Dịch ngược: dịch câu đã hiểu về ngôn ngữ gốc để xem nghĩa có giữ nguyên không.",
      "Chuẩn bị trước danh sách tên riêng và thuật ngữ.",
      "Nội dung pháp lý hoặc tài chính lớn thì cần người thật xem."
    ],
    "practicePrompt": {
      "question": "Đối tác nói một câu, phụ đề hiện 'giá đã bao gồm vận chuyển'. Bạn cần báo giá cho sếp ngay sau cuộc gọi. Làm gì?",
      "options": [
        "Nhắc lại 'giá đã gồm vận chuyển đến kho chúng tôi, đúng không?' và ghi lại câu trả lời",
        "Ghi nguyên văn phụ đề vào báo giá vì đã hiển thị rõ ràng",
        "Bỏ qua chi tiết vận chuyển và báo giá như chưa gồm để an toàn",
        "Gửi email hỏi sau một tuần khi nào thuận tiện cho đối tác"
      ],
      "correct": 0,
      "explanation": "Chi tiết 'đã gồm vận chuyển' ảnh hưởng thẳng đến giá bạn báo sếp, nên phải xác nhận ngay khi đối tác còn trên cuộc gọi, kèm phạm vi (đến kho nào). Ghi nguyên phụ đề là tin vào một câu dịch chưa kiểm; tự báo 'chưa gồm' là đoán; để một tuần thì quên mất ngữ cảnh."
    },
    "summary": {
      "keyIdea": "Dịch trực tiếp giúp hiểu ý chung; câu quyết định phải được xác nhận bằng lời.",
      "formula": "Nghe phụ đề, nhắc lại câu quan trọng, người kia xác nhận, rồi mới ghi vào biên bản.",
      "commonMistake": "Coi phụ đề hiện rõ là bản dịch đã đúng.",
      "action": "Soạn trước ba câu xác nhận mẫu cho giá, số lượng và ngày giao."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Nghĩ tới một cuộc gọi hoặc email nước ngoài sắp tới. Liệt kê 5 thứ quan trọng sẽ bàn (giá, số lượng, ngày, tên riêng, điều kiện), rồi viết sẵn cho mỗi thứ một câu nhắc lại để xin xác nhận, bằng cả tiếng Việt và ngôn ngữ của đối tác.",
      "secondary": "Nếu có bản dịch tự động trong tay, thử dịch ngược một câu của bạn và xem nghĩa có lệch không."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Thứ Năm, bạn có cuộc gọi video với đối tác ở nước ngoài. Công cụ dịch hiện phụ đề ngay khi họ nói. Bài này không dạy chọn công cụ nào, mà dạy cách tận dụng nó mà không để một câu dịch sai quyết định đơn hàng."
      },
      {
        "type": "feynman",
        "title": "Dịch trực tiếp đơn giản hơn bạn nghĩ",
        "intro": "Hình dung một phiên dịch viên mới vào nghề ngồi cạnh bạn: nhanh, chăm chỉ, nghe ra đại ý rất tốt, nhưng thỉnh thoảng nghe nhầm một con số mà vẫn nói rất tự tin.",
        "columns": [
          "Thành phần",
          "Phiên dịch mới vào nghề",
          "Công cụ dịch trực tiếp"
        ],
        "rows": [
          [
            "Điểm mạnh",
            "Nắm đại ý, nói nhanh",
            "Hiện phụ đề gần như tức thì"
          ],
          [
            "Điểm yếu",
            "Nghe nhầm số, ngày, chữ 'không'",
            "Dịch sai đúng chỗ ít dấu hiệu nhất: số, ngày, phủ định"
          ],
          [
            "Cách làm việc chung",
            "Bạn hỏi lại chỗ quan trọng",
            "Bạn nhắc lại và xin người kia xác nhận"
          ]
        ],
        "oneLiner": "Dịch trực tiếp là người phiên dịch nhanh nhưng mới nghề: tin đại ý, kiểm chỗ quyết định."
      },
      {
        "type": "heading",
        "text": "Chỗ dịch hay lệch và cách kiểm"
      },
      {
        "type": "paragraph",
        "text": "Phụ đề hiện trơn tru tạo cảm giác an tâm, nhưng sai sót thường nằm ở những thứ nhỏ: một con số, một ngày, chữ 'không', hoặc tên riêng. Đó cũng là những thứ khó nhận ra khi nhìn phụ đề, nên cần một thói quen cố định thay vì trông chờ vào mắt nhìn."
      },
      {
        "type": "flow",
        "title": "Kiểm một câu quan trọng trong cuộc gọi",
        "steps": [
          {
            "label": "Nhận ra câu quan trọng",
            "detail": "Mỗi khi nghe giá, số lượng, ngày hoặc điều kiện, bạn ghi lại ngay điều bạn hiểu ra giấy."
          },
          {
            "label": "Nhắc lại bằng lời",
            "detail": "Nói lại điều bạn hiểu, ngắn và có đủ con số: 'Vậy là 600 thùng, giao ngày 20, đúng không?'"
          },
          {
            "label": "Dịch ngược nếu còn nghi",
            "detail": "Dịch câu của bạn sang ngôn ngữ của người kia bằng công cụ và xem nghĩa có còn giữ nguyên không."
          },
          {
            "label": "Người kia xác nhận",
            "detail": "Chỉ khi người nói đồng ý thì điều đó mới thành thoả thuận. Bạn ghi lại cùng thời điểm trong cuộc gọi."
          },
          {
            "label": "Gửi email tóm tắt",
            "detail": "Sau cuộc gọi, gửi email ngắn nhắc lại các điểm đã chốt để hai bên cùng nhìn vào một văn bản."
          }
        ]
      },
      {
        "type": "list",
        "items": [
          "Trước cuộc gọi: lập danh sách tên riêng, sản phẩm, thuật ngữ và thử vài câu có chúng.",
          "Trong cuộc gọi: mỗi con số hoặc ngày đều nhắc lại bằng lời.",
          "Nếu có nghi ngờ: dịch ngược câu của mình hoặc nhờ đối tác diễn đạt lại.",
          "Sau cuộc gọi: gửi email xác nhận các điểm đã chốt.",
          "Công cụ hỗ trợ những ngôn ngữ nào thì xem tài liệu chính thức của công cụ, đừng đoán."
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Tin được ở mức đại ý",
          "text": "Nắm chủ đề đang bàn, thái độ chung, các ý chính. Cuộc trò chuyện thông thường, chào hỏi, bàn tiến độ chung. Sai một chữ ở đây ít gây hậu quả."
        },
        "right": {
          "label": "Phải xác nhận lại",
          "text": "Giá, số lượng, ngày giờ, điều kiện thanh toán, câu có chữ 'không', tên riêng, điều khoản. Sai một chữ ở đây là sai đơn hàng hoặc sai cam kết."
        }
      },
      {
        "type": "callout",
        "label": "Nội dung nhạy cảm",
        "text": "Cuộc gọi bàn hợp đồng, giá bí mật hay thông tin khách hàng đi qua công cụ dịch là dữ liệu đi ra ngoài công ty. Hỏi bộ phận IT hoặc pháp chế công cụ nào được dùng, và với điều khoản quan trọng thì nhờ chuyên gia hoặc phiên dịch viên người thật."
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Soát bản ghi cuộc gọi do công cụ dịch tạo",
        "task": "Đối tác thực tế nói: giá báo tuần trước còn hiệu lực, họ giao được khoảng 600 thùng, sớm nhất ngày 20, chưa chốt phí vận chuyển. Đánh dấu những câu trong bản dịch không khớp.",
        "segments": [
          {
            "text": "Đối tác xác nhận giá báo tuần trước vẫn còn hiệu lực."
          },
          {
            "text": "Họ có thể giao 800 thùng.",
            "error": "Đối tác nói khoảng 600 thùng. Con số 800 là lỗi nghe sai, kiểu lỗi trông rất hợp lý."
          },
          {
            "text": "Ngày giao sớm nhất là ngày 20."
          },
          {
            "text": "Họ cam kết giao đúng ngày 20.",
            "error": "Đối tác chỉ nói sớm nhất ngày 20, chưa cam kết. Bản dịch biến mốc sớm nhất thành cam kết."
          },
          {
            "text": "Phí vận chuyển đã bao gồm trong giá.",
            "error": "Đối tác nói chưa chốt phí vận chuyển. Bản dịch đảo thành đã bao gồm."
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Cuộc gọi chốt đơn trong 20 phút",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Phụ đề hiện: 'Chúng tôi giao 600 thùng vào ngày 20.' Trước đó bạn nghe loáng thoáng con số 800. Sếp đang chờ kết quả.",
            "choices": [
              {
                "label": "Ghi 600 thùng và kết thúc cuộc gọi cho kịp giờ",
                "next": "bad_fast"
              },
              {
                "label": "Nhắc lại: 'Vậy là 600 thùng, ngày 20, đúng không?' và chờ xác nhận",
                "next": "s2"
              }
            ]
          },
          "bad_fast": {
            "text": "Thực ra đối tác nói 800 thùng nhưng phụ đề trễ và hiện số cũ. Hai bên mỗi bên hiểu một số, kho chuẩn bị chỗ thiếu 200 thùng.",
            "ending": "bad"
          },
          "s2": {
            "text": "Đối tác đáp: 'Không, 800 thùng, ngày 20 là sớm nhất.' Bạn thấy bản dịch có thể đang lệch cả chữ 'sớm nhất'.",
            "choices": [
              {
                "label": "Ghi 800 thùng, ngày sớm nhất 20, rồi gửi email xác nhận sau cuộc gọi",
                "next": "good"
              },
              {
                "label": "Ghi 800 thùng, ngày 20 chắc chắn, vì như vậy báo sếp gọn hơn",
                "next": "bad_commit"
              }
            ]
          },
          "bad_commit": {
            "text": "Số lượng đã đúng nhưng bạn biến mốc sớm nhất thành cam kết. Sếp báo khách ngày 20 chắc chắn, rồi đối tác giao ngày 24.",
            "ending": "bad"
          },
          "good": {
            "text": "Email xác nhận gửi đi, đối tác trả lời 'đúng vậy'. Sếp nhận thông tin có số lượng, mốc ngày và điều kiện rõ ràng.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Nghe đại ý bằng phụ đề, xác nhận chỗ quyết định bằng lời.",
          "Bài sau: khi bản dịch có số, đơn vị và ngày tháng - soi từng cái."
        ]
      }
    ]
  },
  {
    "id": 2351,
    "slug": "dich-mot-doan-hoi-thoai-kiem-so-va-don-vi",
    "title": "Chặng 47, Bài 12: Dịch hội thoại: kiểm số, đơn vị, ngày tháng",
    "subtitle": "Cùng một dấu chấm, ở nước này là hàng nghìn, ở nước kia là số lẻ.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "🔢",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Số, đơn vị tiền và ngày tháng là thứ dễ dịch sai nhất mà hậu quả lớn nhất. Một dấu chấm đặt sai chỗ biến 1,5 triệu thành 1.500 triệu; một ngày viết kiểu tháng trước ngày sau làm cả lô hàng lỡ hạn. Một thói quen kiểm ba thứ này chặn được phần lớn lỗi đắt tiền.",
    "openingQuestion": "Bản dịch của cuộc họp ghi 'giá 1.500' còn bản gốc nói 'one point five'. Vấn đề có thể nằm ở đâu?",
    "openingOptions": [
      "Bản gốc nói nhỏ nên công cụ nghe nhầm sang số khác hẳn mỗi khi gặp giọng vùng miền",
      "Dấu chấm và dấu phẩy thập phân được hiểu khác nhau giữa hai ngôn ngữ",
      "Công cụ không dịch được số nên tự thêm ba chữ số cho đủ dài",
      "Con số chỉ sai khi bản dịch ngắn hơn bản gốc khoảng hai chữ"
    ],
    "correctOption": 1,
    "explanation": "Ở tiếng Anh, dấu chấm là thập phân: 1.5 là một rưỡi, còn dấu phẩy là phân cách hàng nghìn. Tiếng Việt dùng ngược lại: 1,5 là một rưỡi và 1.500 là một nghìn năm trăm. Một bản dịch máy giữ nguyên chữ số mà không đổi quy ước dễ đọc thành 1.500. Nói nhỏ hay nghe nhầm thì ra số khác hẳn chứ không ra đúng 1.500, và độ dài bản dịch không liên quan.",
    "diagram": [
      {
        "label": "Bản gốc: số, đơn vị, ngày",
        "arrow": true
      },
      {
        "label": "Bản dịch: máy giữ hay đổi quy ước?",
        "arrow": true
      },
      {
        "label": "Soi ba thứ: dấu phân cách, đơn vị, thứ tự ngày",
        "arrow": true
      },
      {
        "label": "Chốt số cuối cùng bằng chữ hoặc hỏi lại"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: công ty nhập hàng gặp nhầm dấu phân cách",
      "description": "Anh Tuấn nhận báo giá tiếng nước ngoài ghi '2,500 units'. Bản dịch tự động giữ nguyên '2,500' và anh đọc thành hai phẩy năm cái. Thực tế là hai nghìn năm trăm cái. May là anh đối chiếu với số lượng đặt hàng trước khi trả lời. Từ đó anh luôn viết số bằng chữ trong email xác nhận."
    },
    "quiz": [
      {
        "question": "Theo quy ước tiếng Anh, '1,500' nghĩa là gì?",
        "options": [
          "Một phẩy năm (1,5 theo cách đọc tiếng Việt, đảo dấu)",
          "Một nghìn năm trăm",
          "Mười lăm nghìn (1,5 × 10.000, nhầm số chữ số)",
          "Một trăm năm mươi (dấu phẩy thay thế cho chữ số 0)"
        ],
        "correct": 1,
        "explanation": "Tiếng Anh dùng dấu phẩy ngăn hàng nghìn, nên 1,500 là 1.500 theo cách viết Việt, tức một nghìn năm trăm. Đọc thành một phẩy năm là áp quy ước tiếng Việt vào số tiếng Anh, sai theo hướng ngược lại; hai đáp án còn lại là tự bịa ra cách quy đổi không có thật."
      },
      {
        "question": "Ngày '03/04' trong một email từ nước ngoài có thể là ngày nào?",
        "options": [
          "Ngày 3 tháng 4 hoặc ngày 4 tháng 3, tuỳ quy ước của người viết",
          "Chắc chắn ngày 3 tháng 4 vì cả thế giới viết ngày trước",
          "Chắc chắn ngày 4 tháng 3 vì máy tính luôn viết tháng trước",
          "Ngày 3 của tháng hiện tại vì phần tháng bị lược đi"
        ],
        "correct": 0,
        "explanation": "Một số nơi viết ngày trước tháng, nơi khác viết tháng trước ngày, nên 03/04 mập mờ nếu không có ngữ cảnh. Không có quy ước chung cho cả thế giới, và máy tính cũng không luôn viết tháng trước. Cách an toàn là hỏi lại hoặc yêu cầu viết tháng bằng chữ."
      },
      {
        "question": "Báo giá ghi '100 tấn' còn bản dịch của bạn ghi '100 tạ'. Việc nên làm là gì?",
        "options": [
          "Giữ '100 tạ' vì hai đơn vị gần nhau nên khác biệt không đáng kể",
          "Nhân số lượng với 0,5 để cân bằng hai cách hiểu của hai bên",
          "Đối chiếu với bản gốc và sửa theo đơn vị gốc, vì sai một bậc là chênh mười lần",
          "Bỏ đơn vị và chỉ ghi '100' để tránh phải chọn giữa hai cách"
        ],
        "correct": 2,
        "explanation": "Một tấn bằng mười tạ, nên nhầm đơn vị nghĩa là chênh mười lần. Bỏ đơn vị làm con số vô nghĩa, và nhân đôi nửa chừng chỉ thêm một con số sai mới. Việc đúng là mở bản gốc và sửa theo đơn vị ở đó."
      },
      {
        "question": "Cách nào xác nhận số tiền lớn giữa hai bên ít gây hiểu nhầm nhất?",
        "options": [
          "Viết thêm bằng chữ bên cạnh chữ số và ghi rõ đơn vị tiền",
          "Chỉ viết chữ số vì chữ số ai cũng đọc giống nhau",
          "Dịch hai lần bằng hai công cụ và chọn số nào xuất hiện nhiều",
          "Viết số thật to và in đậm trong email cho dễ nhìn thấy"
        ],
        "correct": 0,
        "explanation": "Số viết bằng chữ không bị hiểu khác đi theo dấu chấm hay phẩy, và đơn vị tiền ngăn nhầm giữa các loại tiền. Chữ số đơn lẻ chính là chỗ mập mờ. Hai công cụ có thể cùng sai một kiểu, và in đậm chỉ làm sai sót nổi bật hơn chứ không sửa được."
      },
      {
        "question": "Công cụ dịch '5 tỷ đồng' thành '5 billion' trong bản tiếng Anh. Có gì đáng lưu ý?",
        "options": [
          "Cần kiểm số mũ: tỷ tiếng Việt là 10^9 nhưng một số cách dùng cũ của 'billion' khác",
          "Không có gì đáng lưu ý vì hai từ luôn cùng nghĩa ở mọi nơi",
          "Nên đổi thành '5 million' cho an toàn vì tiếng Anh ít dùng billion",
          "Nên viết '5 tỷ' giữ nguyên tiếng Việt và hy vọng họ tra được"
        ],
        "correct": 0,
        "explanation": "Ngày nay billion thường là mười mũ chín, khớp với tỷ, nhưng số có nhiều số không rất dễ nhầm khi dịch, nên cần đếm lại. Đổi sang million làm sai hẳn một nghìn lần, còn để nguyên tiếng Việt bắt đối tác tự tra. Cách chắc nhất là viết đủ chữ số và đơn vị: 5.000.000.000 đồng."
      }
    ],
    "keyTakeaways": [
      "Dấu chấm và phẩy đổi vai giữa tiếng Việt và tiếng Anh.",
      "Ngày dạng 03/04 có thể là hai ngày khác nhau; yêu cầu viết tháng bằng chữ.",
      "Nhầm đơn vị một bậc là chênh mười, trăm hoặc nghìn lần.",
      "Số tiền lớn: viết cả chữ số lẫn chữ và ghi rõ đơn vị tiền.",
      "Khi nghi ngờ, mở bản gốc và đối chiếu từng số."
    ],
    "practicePrompt": {
      "question": "Email gốc viết '12/05, 2.500 units, 1,2 kg mỗi thùng'. Bản dịch của bạn ghi '12 tháng 5, 2,5 đơn vị, 1.2 kg mỗi thùng'. Nhận xét nào đúng?",
      "options": [
        "Cần hỏi lại ngày và sửa số lượng thành 2.500, vì dấu chấm bị hiểu nhầm thành thập phân",
        "Bản dịch đúng hết vì máy đã chuyển sang quy ước Việt",
        "Chỉ cần sửa '1.2 kg' vì chỉ nó dùng dấu chấm sai",
        "Bỏ hết số và viết 'nhiều đơn vị' cho khỏi sai"
      ],
      "correct": 0,
      "explanation": "Ngày 12/05 mập mờ, 2.500 bị dịch thành 2,5 nên sai tới nghìn lần, và 1.2 kg lại đúng quy ước Anh nhưng lệch với cách đọc Việt. Nên soi cả ba. Bỏ hết số làm bản dịch vô dụng."
    },
    "summary": {
      "keyIdea": "Số, đơn vị và ngày là chỗ dịch sai đắt nhất; kiểm bằng ba câu hỏi cố định.",
      "formula": "Dấu chấm/phẩy: quy ước nào? Đơn vị: bậc nào? Ngày: ngày trước hay tháng trước?",
      "commonMistake": "Đọc con số trong bản dịch như thể nó đã theo quy ước của mình.",
      "action": "Tự lập thẻ ba câu hỏi và dán cạnh màn hình."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Tìm một email hoặc tài liệu nước ngoài có số liệu (báo giá, hoá đơn, lịch giao hàng). Dịch bằng công cụ, rồi đối chiếu từng con số, đơn vị và ngày với bản gốc, ghi lại chỗ lệch.",
      "secondary": "Viết lại một email xác nhận có số tiền bằng cả chữ số và chữ."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bản dịch ghi '1.500' còn bản gốc nói 'one point five'. Chỉ một dấu chấm, mà chênh một nghìn lần. Bài này dạy ba thứ cần soi trước khi tin bất kỳ con số nào trong bản dịch."
      },
      {
        "type": "feynman",
        "title": "Kiểm số khi dịch đơn giản hơn bạn nghĩ",
        "intro": "Hình dung bạn đổi tiền ở quầy: người thu ngân đếm lại từng tờ trước mặt bạn. Không phải vì họ nghi ngờ, mà vì tiền thì đếm lại rẻ hơn sai một lần.",
        "columns": [
          "Thứ cần soi",
          "Ở quầy đổi tiền",
          "Trong bản dịch"
        ],
        "rows": [
          [
            "Dấu phân cách",
            "Xem tờ tiền loại nào",
            "Dấu chấm hay phẩy là thập phân?"
          ],
          [
            "Đơn vị",
            "Đô la hay euro, đồng hay nghìn đồng",
            "Kg hay tạ, triệu hay tỷ, loại tiền nào"
          ],
          [
            "Ngày",
            "Ngày đổi có ghi rõ trên biên lai",
            "Ngày trước hay tháng trước"
          ]
        ],
        "oneLiner": "Đếm lại số khi dịch cũng như đếm lại tiền ở quầy: rẻ hơn nhiều so với sai một lần."
      },
      {
        "type": "heading",
        "text": "Ba chỗ con số hay lệch"
      },
      {
        "type": "paragraph",
        "text": "Đầu tiên là dấu phân cách: tiếng Việt viết 1.500 cho một nghìn năm trăm và 1,5 cho một rưỡi, tiếng Anh thì ngược lại. Thứ hai là đơn vị: tạ, tấn, triệu, tỷ mà nhầm một bậc là chênh nhiều lần. Thứ ba là ngày: 03/04 có thể là hai ngày khác nhau."
      },
      {
        "type": "flow",
        "title": "Soi một con số trong bản dịch",
        "steps": [
          {
            "label": "Tìm mọi con số",
            "detail": "Khoanh hoặc tô màu mọi số, đơn vị và ngày trong bản dịch trước khi đọc kỹ phần chữ."
          },
          {
            "label": "Đối chiếu bản gốc",
            "detail": "Mở bản gốc cạnh bản dịch và so từng con số một, không đọc lướt."
          },
          {
            "label": "Hỏi ba câu",
            "detail": "Dấu chấm hay phẩy là thập phân? Đơn vị bậc nào? Ngày trước hay tháng trước?"
          },
          {
            "label": "Viết lại rõ nghĩa",
            "detail": "Viết số bằng chữ và ghi rõ đơn vị, ngày viết tháng bằng chữ: '12 tháng 5'."
          },
          {
            "label": "Hỏi lại khi còn nghi",
            "detail": "Mập mờ thì hỏi người gửi bằng một câu ngắn thay vì đoán."
          }
        ]
      },
      {
        "type": "list",
        "items": [
          "Viết ngày bằng chữ: '3 tháng 4', không viết 03/04.",
          "Số tiền lớn: chữ số kèm chữ và ghi đơn vị tiền.",
          "Đơn vị đo: ghi đầy đủ (kg, tấn) và đổi sang đơn vị bạn quen rồi kiểm lại.",
          "Đối chiếu số lượng với đơn hàng hoặc báo giá đã có.",
          "Số nào quyết định tiền hoặc hạn thì cho người thứ hai đọc lại."
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Dễ nhầm",
          "text": "1.500 đọc theo quy ước Việt khi bản gốc là Anh. 03/04 không biết ngày hay tháng trước. '100 tạ' thay cho '100 tấn'. Số không có đơn vị tiền."
        },
        "right": {
          "label": "Đã rõ nghĩa",
          "text": "'Một nghìn năm trăm' ghi cả chữ. '3 tháng 4'. '100 tấn (tức 100.000 kg)'. '5.000.000.000 đồng'. Mỗi con số có đơn vị đi kèm."
        }
      },
      {
        "type": "callout",
        "label": "Số liệu luôn cần người kiểm",
        "text": "Công cụ dịch không biết con số nào quan trọng với bạn. Số liệu tài chính hay hợp đồng thì nhờ kế toán trưởng hoặc pháp chế xem lại, đừng chỉ dựa vào bản dịch."
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Soát bản dịch báo giá",
        "task": "Bản gốc (tiếng Anh): 'Quote valid until 03/04 (April 3). 2,500 units at 1.2 USD each. Weight: 1.5 tons.' Đánh dấu chỗ bản dịch lệch.",
        "segments": [
          {
            "text": "Báo giá có hiệu lực đến ngày 3 tháng 4."
          },
          {
            "text": "Số lượng là 2,5 đơn vị.",
            "error": "Bản gốc là 2,500 theo quy ước Anh, tức 2.500 đơn vị. Bản dịch đọc dấu phẩy thành thập phân."
          },
          {
            "text": "Giá mỗi đơn vị là 1,2 đô la Mỹ."
          },
          {
            "text": "Khối lượng là 1,5 tạ.",
            "error": "Bản gốc ghi tons (tấn). Nhầm sang tạ làm khối lượng nhỏ hơn mười lần."
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Đối chiếu bản dịch trước khi báo sếp",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bản dịch ghi 'giá 1.500' nhưng bản gốc là 'one point five million dong per unit'. Sếp chờ báo giá để gửi khách trong 15 phút.",
            "choices": [
              {
                "label": "Gửi sếp '1.500 đồng' vì số đã hiện trong bản dịch",
                "next": "bad_blind"
              },
              {
                "label": "Mở bản gốc, xem dấu chấm là thập phân và đơn vị là triệu",
                "next": "s2"
              }
            ]
          },
          "bad_blind": {
            "text": "Sếp báo khách giá 1.500 đồng một đơn vị. Đối tác bất ngờ, hợp đồng phải đàm phán lại từ đầu, và khách mất tin vào báo giá.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bạn thấy đúng là 1,5 triệu đồng. Giờ cần gửi sếp con số cho rõ.",
            "choices": [
              {
                "label": "Gửi '1,5 triệu đồng (một triệu năm trăm nghìn đồng) mỗi đơn vị' và nêu nguồn là bản gốc",
                "next": "good"
              },
              {
                "label": "Gửi '1,5' và nhắn sếp tự hiểu đơn vị",
                "next": "bad_unit"
              }
            ]
          },
          "bad_unit": {
            "text": "Sếp hiểu 1,5 nghìn đồng. Báo giá khách lệch ba bậc và phải đính chính sau đó.",
            "ending": "bad"
          },
          "good": {
            "text": "Sếp nhận con số có đơn vị và dạng chữ, có nguồn để đối chiếu. Báo giá đi đúng, không ai phải sửa.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Mỗi con số có ba thứ đi kèm: dấu, đơn vị và ngày. Soi đủ ba thứ.",
          "Bài sau: khi AI đọc thành tiếng, những chỗ này lại có một kiểu lệch khác."
        ]
      }
    ]
  },
  {
    "id": 2352,
    "slug": "giong-doc-tao-bang-ai-cho-ban-tin-noi-bo",
    "title": "Chặng 47, Bài 13: Giọng đọc AI cho bản tin nội bộ: khi nào hợp",
    "subtitle": "Người dẫn chương trình không biết gì về công ty bạn: đọc trôi, nhưng không biết tên.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "🎙️",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Bản tin nội bộ dạng âm thanh một phút giúp đồng nghiệp nghe khi đang di chuyển. Nhưng một giọng đọc sai tên sếp, đọc nhầm con số hoặc nghe như đang đọc thông báo của người khác thì mất sạch thiện cảm. Biết khi nào giọng AI hợp và cách chuẩn bị văn bản giúp bản nghe đầu tiên đã dùng được.",
    "openingQuestion": "Bạn nhờ công cụ tạo giọng đọc một thông báo nội bộ. Sau khi tạo, việc nên làm đầu tiên là gì?",
    "openingOptions": [
      "Nghe lại toàn bộ, chú ý chỗ tên riêng, con số và chỗ ngắt nghỉ",
      "Gửi ngay cả nhóm vì giọng đọc máy không bao giờ đọc sai tên hay số",
      "Đọc lướt văn bản trên màn hình và bỏ qua bản nghe cho nhanh",
      "Chọn giọng khác mỗi khi tạo lại để nhân viên không chán"
    ],
    "correctOption": 0,
    "explanation": "Giọng đọc tạo bằng AI đọc trôi chảy nhưng không biết tên riêng của công ty, cách đọc viết tắt hay con số nào cần nhấn. Lỗi phát âm chỉ lộ ra khi nghe, không lộ khi đọc chữ. Nghe lại trước khi gửi là bước rẻ nhất để bắt chúng. Gửi ngay là đặt niềm tin vào một thứ chưa kiểm, còn đọc lướt chữ thì bỏ qua đúng chỗ dễ sai. Đổi giọng mỗi lần làm bản tin thiếu nhất quán.",
    "diagram": [
      {
        "label": "Văn bản bản tin ngắn, đã sửa cho dễ đọc",
        "arrow": true
      },
      {
        "label": "Tạo giọng đọc",
        "arrow": true
      },
      {
        "label": "Nghe lại: tên, số, ngắt nghỉ",
        "arrow": true
      },
      {
        "label": "Sửa văn bản, tạo lại rồi mới gửi"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: phòng truyền thông nội bộ công ty 300 người",
      "description": "Phòng truyền thông thử làm bản tin âm thanh hai phút mỗi sáng thứ Hai bằng giọng đọc AI. Bản đầu đọc sai tên trưởng phòng và đọc 'Q3' thành chữ cái. Họ thêm bước nghe lại và viết tên theo cách đọc, bản tin sau đã dùng được. Họ cũng ghi rõ 'giọng đọc do AI tạo' ở đầu bản tin."
    },
    "quiz": [
      {
        "question": "Khi nào giọng đọc AI hợp cho bản tin nội bộ?",
        "options": [
          "Khi nội dung ngắn, ít tên riêng và không cần cảm xúc đặc biệt",
          "Khi cần truyền đạt lời chia buồn hoặc xin lỗi trước toàn công ty",
          "Khi bản tin có nhiều thuật ngữ và tên địa danh hiếm gặp mà khó kiểm tra",
          "Khi thông báo quan trọng cần sếp xuất hiện bằng chính giọng mình"
        ],
        "correct": 0,
        "explanation": "Giọng AI hợp với thông tin ngắn, rõ, ít sắc thái: lịch tuần, nhắc việc, tin vận hành. Lời chia buồn hoặc xin lỗi cần giọng người thật. Nhiều tên riêng hiếm là chỗ dễ đọc sai, và thông báo quan trọng của sếp nên là tiếng của sếp."
      },
      {
        "question": "Tạo giọng giống hệt một đồng nghiệp thật cần điều kiện gì?",
        "options": [
          "Chỉ cần công ty đã mua công cụ tạo giọng đọc là đủ, không cần hỏi thêm ai",
          "Người đó đồng ý rõ ràng, bằng văn bản, trước khi bạn làm",
          "Chỉ cần ghi chú 'giọng mô phỏng' ở cuối bản tin",
          "Không cần gì nếu chỉ dùng trong nội bộ công ty của mình"
        ],
        "correct": 1,
        "explanation": "Giọng nói là dấu hiệu nhận diện cá nhân, nên sao chép cần sự đồng ý của chủ giọng, kể cả dùng nội bộ. Ghi chú cuối bản tin hay việc công ty mua công cụ không thay được sự đồng ý đó. Nếu chưa chắc về quy định, hỏi bộ phận pháp chế."
      },
      {
        "question": "Bản tin 300 chữ nên kéo dài bao lâu nếu đọc khoảng 150 chữ mỗi phút?",
        "options": [
          "Khoảng 2 phút (300 ÷ 150)",
          "Khoảng 0,5 phút (150 ÷ 300, nhầm thứ tự phép chia)",
          "Khoảng 450 phút (300 × 150, nhân thay vì chia)",
          "Khoảng 1 phút (300 ÷ 300, dùng nhầm số chữ làm tốc độ)"
        ],
        "correct": 0,
        "explanation": "Thời lượng bằng số chữ chia tốc độ đọc: 300 ÷ 150 = 2 phút. Số 150 là con số minh hoạ, tốc độ thật phụ thuộc giọng. Đảo thứ tự ra 0,5 phút, nhân ra số vô lý, còn chia cho chính nó thì bỏ qua tốc độ."
      },
      {
        "question": "Vì sao nên ghi rõ 'giọng đọc do AI tạo' trong bản tin?",
        "options": [
          "Vì luật bắt buộc mọi bản tin nội bộ phải ghi như vậy",
          "Vì nếu không ghi, công cụ sẽ tự khoá không cho tạo",
          "Để người nghe biết giọng không phải người thật và không bị hiểu lầm",
          "Vì ghi như vậy thì mọi lỗi phát âm được coi là hợp lý"
        ],
        "correct": 2,
        "explanation": "Công khai là tôn trọng người nghe và tránh hiểu nhầm đây là giọng thật của ai đó. Không có quy định chung nào bắt mọi bản tin phải ghi như vậy, công cụ không tự khoá, và ghi chú không biện minh cho lỗi phát âm; vẫn phải sửa lỗi."
      },
      {
        "question": "Bản nghe đầu tiên đọc sai tên 'Nguyễn Thị Bích' và đọc 'KPI' từng chữ. Nên làm gì?",
        "options": [
          "Giữ nguyên vì người nghe trong công ty tự hiểu được, kể cả khi tên bị đọc sai",
          "Viết lại văn bản đúng cách đọc rồi tạo lại và nghe kiểm",
          "Tăng tốc độ đọc để lỗi ít lộ hơn khi nghe nhanh, và người nghe khó để ý",
          "Xoá hết tên riêng và viết tắt khỏi bản tin cho gọn, dù họ cần biết ai là ai"
        ],
        "correct": 1,
        "explanation": "Đọc sai tên và viết tắt làm người nghe mất tin cậy. Việc đúng là chỉnh văn bản, ví dụ viết tắt thành từ đầy đủ và thêm cách đọc, rồi nghe lại. Tăng tốc không sửa lỗi mà làm khó nghe hơn; xoá hết tên làm bản tin thiếu thông tin cần có."
      }
    ],
    "keyTakeaways": [
      "Giọng AI hợp với tin ngắn, rõ, ít cảm xúc; không hợp lời xin lỗi hay chia buồn.",
      "Luôn nghe lại trước khi gửi: lỗi phát âm chỉ lộ khi nghe.",
      "Thời lượng ≈ số chữ ÷ tốc độ đọc (số liệu minh hoạ).",
      "Giọng của người thật chỉ được mô phỏng khi họ đồng ý rõ ràng.",
      "Ghi rõ 'giọng đọc do AI tạo'."
    ],
    "practicePrompt": {
      "question": "Sếp nhờ làm bản tin âm thanh 1 phút về lịch nghỉ lễ và nhắc hạn nộp báo cáo. Cách giao việc nào cho công cụ tạo giọng hợp lý nhất?",
      "options": [
        "Dán văn bản ngắn đã sửa, chọn giọng thân thiện, tạo xong nghe lại cả bản",
        "Dán cả email dài của sếp và để công cụ tự chọn chỗ đọc",
        "Tạo bằng giọng mô phỏng của sếp mà chưa hỏi sếp",
        "Gửi ngay bản đầu tiên vì đã nghe thử ba giây đầu"
      ],
      "correct": 0,
      "explanation": "Văn bản ngắn đã sửa giúp giọng đọc ít vấp, và nghe lại cả bản mới bắt được lỗi ở giữa. Dán email dài khiến bản đọc loãng, mô phỏng giọng sếp khi chưa hỏi là vi phạm sự đồng ý, còn nghe ba giây đầu bỏ sót phần lớn bản tin."
    },
    "summary": {
      "keyIdea": "Giọng AI là người đọc trôi nhưng không biết tên: sửa văn bản cho dễ đọc rồi nghe lại.",
      "formula": "Viết ngắn, sửa tên và viết tắt, tạo giọng, nghe cả bản, sửa rồi mới gửi.",
      "commonMistake": "Gửi bản tin khi chưa nghe lại hết.",
      "action": "Chọn một thông báo tuần này và tạo thử bản nghe 1 phút."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn một thông báo nội bộ ngắn (lịch tuần hoặc nhắc hạn). Viết lại thành đoạn 100-150 chữ, liệt kê tên riêng và chữ viết tắt trong đó, tạo bản nghe thử bằng công cụ giọng đọc mà công ty cho phép, ghi lại ba chỗ nghe chưa ổn.",
      "secondary": "Hỏi một đồng nghiệp nghe thử và cho biết họ hiểu đúng ý chính chưa."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Sáng thứ Hai bạn muốn gửi đồng nghiệp một bản tin nghe được một phút thay vì email dài ít ai đọc. Giọng đọc AI làm được việc đó trong vài phút, nhưng chỉ khi bạn biết chỗ nó hay vấp."
      },
      {
        "type": "feynman",
        "title": "Giọng đọc AI đơn giản hơn bạn nghĩ",
        "intro": "Hình dung một người dẫn chương trình radio giỏi nhưng chưa từng làm việc ở công ty bạn: đọc lưu loát mọi thứ đặt trước mặt, nhưng không biết tên sếp đọc thế nào.",
        "columns": [
          "Thành phần",
          "Người dẫn chương trình mới",
          "Giọng đọc AI"
        ],
        "rows": [
          [
            "Điểm mạnh",
            "Đọc trôi, rõ, đều giọng",
            "Đọc nhanh, đều, lặp lại được nhiều lần"
          ],
          [
            "Điểm yếu",
            "Không biết tên và viết tắt của công ty",
            "Đọc sai tên riêng, viết tắt, số"
          ],
          [
            "Cách làm việc chung",
            "Bạn đưa kịch bản có ghi cách đọc",
            "Bạn sửa văn bản và nghe lại trước khi gửi"
          ]
        ],
        "oneLiner": "Giọng đọc AI là người dẫn chương trình mới: đọc giỏi, nhưng bạn phải ghi cách đọc tên."
      },
      {
        "type": "heading",
        "text": "Khi nào hợp và khi nào không"
      },
      {
        "type": "paragraph",
        "text": "Giọng AI hợp với thông tin ngắn và rõ như lịch tuần, nhắc hạn, tóm tắt tin vận hành. Nó không hợp với lời xin lỗi, chia buồn hay thông điệp mà cả công ty cần nghe chính giọng của sếp. Khi bản tin nhiều tên riêng hiếm, phải sửa nhiều hơn và bạn cân nhắc lại xem có đáng không."
      },
      {
        "type": "chart",
        "title": "Bản tin dài bao lâu khi đọc",
        "caption": "Số liệu minh hoạ: tốc độ đọc giả định, thật phụ thuộc giọng và cài đặt. Kéo tốc độ để xem số chữ ảnh hưởng thời lượng bản tin.",
        "kind": "line",
        "xLabel": "Số chữ",
        "yLabel": "Giây",
        "x": {
          "from": 60,
          "to": 300,
          "step": 30
        },
        "params": [
          {
            "id": "wpm",
            "label": "Tốc độ đọc",
            "min": 100,
            "max": 200,
            "step": 10,
            "value": 150,
            "unit": "chữ/phút"
          }
        ],
        "series": [
          {
            "label": "Thời lượng (giây)",
            "expr": "x / wpm * 60"
          }
        ]
      },
      {
        "type": "list",
        "items": [
          "Viết ngắn: 100-150 chữ cho một bản tin một phút.",
          "Sửa tên riêng và viết tắt thành cách đọc.",
          "Tạo giọng, rồi nghe cả bản, không chỉ câu đầu.",
          "Ghi 'giọng đọc do AI tạo' ở đầu hoặc cuối bản tin.",
          "Không tạo giọng giống người thật khi họ chưa đồng ý."
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Hợp dùng giọng AI",
          "text": "Lịch tuần, nhắc hạn, tin vận hành, hướng dẫn ngắn lặp lại. Nội dung rõ, ít cảm xúc, ít tên riêng hiếm."
        },
        "right": {
          "label": "Nên dùng giọng người",
          "text": "Lời xin lỗi, chia buồn, thông điệp từ lãnh đạo, thông báo nhạy cảm. Nội dung nhiều sắc thái hoặc người nghe kỳ vọng nghe người thật."
        }
      },
      {
        "type": "callout",
        "label": "Giọng là dấu hiệu nhận diện",
        "text": "Tạo giọng giống một người thật cần sự đồng ý rõ ràng của người đó, kể cả dùng nội bộ. Không chắc thì hỏi bộ phận pháp chế, đừng thử trước rồi xin sau."
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Giao việc tạo bản tin âm thanh một phút",
        "task": "Bạn cần bản tin 1 phút nhắc lịch nghỉ lễ và hạn nộp báo cáo thứ Sáu. Lắp yêu cầu cho công cụ viết kịch bản đọc.",
        "parts": [
          {
            "id": "content",
            "label": "Nội dung",
            "options": [
              {
                "text": "Viết bản tin về lịch công ty.",
                "feedback": "Công cụ không biết lịch nghỉ hay hạn nộp, nên sẽ tự bịa ngày và quy định."
              },
              {
                "text": "Nghỉ lễ từ thứ Năm tới hết thứ Sáu, làm lại thứ Hai; hạn nộp báo cáo là thứ Sáu tuần này, gửi chị Lan.",
                "good": true,
                "feedback": "Có đủ dữ kiện thật, bản tin chỉ việc diễn đạt lại thay vì bịa."
              }
            ]
          },
          {
            "id": "form",
            "label": "Độ dài và văn phong",
            "options": [
              {
                "text": "Viết thật hay và đầy đủ.",
                "feedback": "Không có giới hạn nên bản tin dài và khó đọc thành tiếng."
              },
              {
                "text": "Khoảng 130 chữ, câu ngắn, dùng để đọc thành tiếng, không có ký tự đặc biệt.",
                "good": true,
                "feedback": "Câu ngắn và độ dài rõ giúp giọng đọc ngắt nghỉ tự nhiên, vừa một phút."
              }
            ]
          },
          {
            "id": "names",
            "label": "Tên và viết tắt",
            "options": [
              {
                "text": "Giữ nguyên tên và viết tắt như văn bản gốc.",
                "feedback": "Giọng đọc dễ vấp tên và đọc viết tắt từng chữ cái."
              },
              {
                "text": "Viết KPI thành 'chỉ tiêu công việc' và tên 'Bích' kèm cách đọc nếu cần.",
                "good": true,
                "feedback": "Đổi viết tắt thành từ đọc được giúp bản nghe tự nhiên."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "content",
              "form",
              "names"
            ],
            "text": "Chào cả nhóm. Công ty nghỉ lễ từ thứ Năm tới hết thứ Sáu, thứ Hai chúng ta làm việc lại. Nhắc nhẹ: hạn nộp báo cáo chỉ tiêu công việc là thứ Sáu tuần này, xin gửi về cho chị Lan. Chúc mọi người nghỉ lễ vui vẻ."
          },
          {
            "requires": [
              "content"
            ],
            "text": "Chào cả nhóm. Công ty nghỉ lễ từ thứ Năm tới hết thứ Sáu và hạn nộp báo cáo KPI là thứ Sáu. (Đúng dữ kiện nhưng dài, có viết tắt và dễ đọc sai khi nghe.)"
          },
          {
            "text": "Kính chào toàn thể anh chị em. Năm nay công ty nghỉ lễ 5 ngày, đồng thời hạn báo cáo được dời sang 25/10... (Công cụ tự bịa số ngày nghỉ và hạn nộp vì bạn không đưa dữ kiện.)"
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Bản tin âm thanh gửi trước giờ họp",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn đã tạo xong bản tin một phút. Còn 10 phút là tới giờ gửi cả công ty. Bạn mới đọc văn bản, chưa nghe.",
            "choices": [
              {
                "label": "Gửi luôn vì văn bản đã kiểm kỹ",
                "next": "bad_send"
              },
              {
                "label": "Nghe cả bản, ghi lại chỗ vấp tên và số",
                "next": "s2"
              }
            ]
          },
          "bad_send": {
            "text": "Giọng đọc phát âm tên trưởng phòng sai và đọc '15/10' thành 'mười lăm trên mười'. Cả công ty nhắn nhau chuyện này thay vì nội dung bản tin.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bạn nghe thấy đọc sai tên và đọc ngày lạ. Còn 6 phút.",
            "choices": [
              {
                "label": "Sửa văn bản: viết '15 tháng 10', thêm cách đọc tên, tạo lại, nghe lại phần đã sửa",
                "next": "good"
              },
              {
                "label": "Đổi sang giọng khác, hy vọng giọng mới đọc đúng",
                "next": "bad_voice"
              }
            ]
          },
          "bad_voice": {
            "text": "Giọng mới vẫn sai tên và còn đọc chậm hơn. Bạn mất thêm thời gian mà chưa sửa được lỗi gốc nằm ở văn bản.",
            "ending": "bad"
          },
          "good": {
            "text": "Bản nghe lần hai đọc đúng tên và ngày. Bạn gửi đúng giờ, kèm dòng 'giọng đọc do AI tạo'.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Giọng AI đọc trôi, bạn phải chỉ đường: sửa văn bản, nghe lại, rồi mới gửi.",
          "Bài sau: sửa số, tên và chữ viết tắt để giọng đọc không vấp."
        ]
      }
    ]
  },
  {
    "id": 2353,
    "slug": "giong-doc-viet-phat-am-so-ten-viet-tat-sua-thanh-van-ban",
    "title": "Chặng 47, Bài 14: Sửa văn bản cho giọng đọc: số, tên, chữ viết tắt",
    "subtitle": "Viết cho người nghe khác viết cho người đọc: chữ phải đọc lên được.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "🔊",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Văn bản đẹp trên màn hình chưa chắc nghe được. 'Q3', 'TP.HCM', '1.500.000đ' là thứ mắt lướt qua dễ, nhưng giọng đọc có thể đọc từng chữ cái hoặc đọc nhầm. Vài phút viết lại cho dễ đọc thành tiếng làm bản nghe tự nhiên hơn, và người nghe hiểu ngay lần đầu.",
    "openingQuestion": "Văn bản có chữ 'Q3: doanh thu 1.500.000đ'. Cách viết lại nào giúp giọng đọc ít vấp nhất?",
    "openingOptions": [
      "'Quý ba: doanh thu một triệu năm trăm nghìn đồng'",
      "'Q 3: doanh thu 1 500 000 đ' để giọng đọc tách được các số",
      "'Q3 - doanh thu: 1.500.000đ (một triệu rưỡi)' giữ cả hai dạng",
      "'Quý 3: doanh thu 1,5 triệu VNĐ' để ngắn và hiện đại hơn"
    ],
    "correctOption": 0,
    "explanation": "Giọng đọc làm việc với chữ: viết tắt và ký hiệu có thể bị đọc từng chữ cái, còn số có dấu chấm có thể bị đọc lạc. Viết thành từ đọc được như 'quý ba' và 'một triệu năm trăm nghìn đồng' bỏ hết chỗ mơ hồ. Tách số bằng dấu cách vẫn có thể bị đọc rời, giữ cả hai dạng thì giọng đọc đọc luôn cả hai, còn '1,5 triệu VNĐ' vẫn để viết tắt VNĐ cho giọng đọc tự đoán.",
    "diagram": [
      {
        "label": "Văn bản gốc: viết tắt, số, ký hiệu",
        "arrow": true
      },
      {
        "label": "Đổi thành chữ đọc được",
        "arrow": true
      },
      {
        "label": "Nghe trước và nghe sau",
        "arrow": true
      },
      {
        "label": "Giữ lại bản văn bản đã sửa để dùng lại"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: nhóm đào tạo nội bộ làm bản hướng dẫn âm thanh",
      "description": "Nhóm đào tạo nhận thấy giọng đọc vấp những chữ như 'TP.HCM', 'OKR' và '2024-25'. Họ tạo một bảng nhỏ gồm viết tắt và cách đọc, dán vào đầu mỗi kịch bản để thay trước khi tạo giọng. Số lần phải nghe lại để sửa giảm rõ rệt, và bản đọc thống nhất giữa các video."
    },
    "quiz": [
      {
        "question": "Vì sao nên viết 'Thành phố Hồ Chí Minh' thay cho 'TP.HCM' trong văn bản cho giọng đọc?",
        "options": [
          "Giọng đọc có thể đọc từng chữ cái hoặc đọc lạc chữ viết tắt",
          "Vì giọng đọc không đọc được bất kỳ chữ nào có dấu chấm",
          "Vì luật quy định mọi văn bản đọc thành tiếng phải viết đủ mọi từ, kể cả từ viết tắt",
          "Vì viết đủ làm bản nghe dài hơn và nghe có vẻ trang trọng"
        ],
        "correct": 0,
        "explanation": "Viết tắt mơ hồ với giọng đọc: có thể đọc từng chữ cái, bỏ qua hoặc đọc nhầm. Viết đủ loại bỏ rủi ro. Dấu chấm không làm công cụ hỏng, không có luật chung nào quy định việc này, và mục đích không phải kéo dài hay tạo vẻ trang trọng."
      },
      {
        "question": "Số điện thoại 0912 345 678 nên được viết thế nào để đọc rõ?",
        "options": [
          "Viết thành từng nhóm chữ số đọc được, tách bằng dấu phẩy",
          "Viết liền 0912345678 để giọng đọc đọc thành một số lớn",
          "Viết 'chín trăm mười hai triệu ba trăm bốn mươi lăm nghìn', như đọc một số tiền",
          "Bỏ số điện thoại khỏi bản tin vì giọng đọc không đọc được số"
        ],
        "correct": 0,
        "explanation": "Số điện thoại cần đọc theo từng chữ số và nhóm, để người nghe ghi lại. Viết liền có thể bị đọc như một số lớn, còn đọc như số tiền làm người nghe không ghi được. Bỏ hẳn số là bỏ luôn thông tin họ cần."
      },
      {
        "question": "Tên 'Nguyễn Thị Bích' được giọng đọc phát âm sai. Cách sửa hợp lý nhất?",
        "options": [
          "Thử viết lại bằng cách đánh vần hoặc cách viết gần âm rồi nghe lại",
          "Đổi tên sang tên không dấu 'Nguyen Thi Bich' và tin kết quả",
          "Bỏ tên ra khỏi bản tin để tránh đọc sai trong mọi trường hợp mà người nghe vẫn cần",
          "Tăng âm lượng để người nghe ít chú ý tới chỗ phát âm sai"
        ],
        "correct": 0,
        "explanation": "Đánh vần hoặc viết gần âm là cách thông thường để chỉ cho giọng đọc cách đọc, rồi nghe kiểm. Bỏ dấu làm giọng đọc càng dễ đọc sai. Bỏ tên làm mất thông tin, và âm lượng không liên quan tới độ chính xác phát âm."
      },
      {
        "question": "Sau khi sửa văn bản, vì sao vẫn phải nghe lại bản sau?",
        "options": [
          "Bản sửa có thể tạo lỗi mới: sai dấu ngắt hoặc đọc vấp chỗ khác",
          "Vì giọng đọc đổi giọng sau mỗi lần tạo và cần chọn lại mà bạn không kiểm soát được",
          "Vì nghe lại là quy định bắt buộc của công cụ giọng đọc, nếu không công cụ báo lỗi",
          "Vì bản sửa luôn đọc chậm hơn bản gốc khoảng vài giây, nên cần chỉnh lại tốc độ"
        ],
        "correct": 0,
        "explanation": "Mỗi lần sửa có thể tạo ra một chỗ vấp mới, nên kiểm lại bằng tai là bước duy nhất chắc chắn. Giọng không đổi sau mỗi lần tạo, nghe lại không phải quy định của công cụ, và tốc độ không phải vấn đề chính."
      },
      {
        "question": "Câu nào dưới đây thêm nghĩa mà văn bản gốc không có khi 'sửa cho dễ đọc'?",
        "options": [
          "'Doanh thu quý ba tăng mạnh' thay cho 'Doanh thu Q3: 1,5 triệu'",
          "'Quý ba' thay cho 'Q3' trong câu có nhắc tới doanh thu",
          "'Một triệu rưỡi đồng' thay cho '1,5 triệu đồng' khi đọc, chỉ đổi cách đọc số",
          "'Thành phố Hồ Chí Minh' thay cho 'TP.HCM' ở đầu câu"
        ],
        "correct": 0,
        "explanation": "Sửa cho dễ đọc chỉ đổi cách diễn đạt, không đổi nghĩa. 'Tăng mạnh' là nhận định mới mà văn bản gốc không có, nó còn bỏ mất con số. Ba đáp án còn lại chỉ đổi dạng chữ."
      }
    ],
    "keyTakeaways": [
      "Viết cho người nghe: chữ phải đọc lên được.",
      "Viết tắt thành từ đầy đủ; ngày, số thành dạng đọc được.",
      "Tên riêng khó: viết gần âm rồi nghe lại.",
      "Sửa xong phải nghe lại, vì sửa có thể sinh lỗi mới.",
      "Sửa để dễ đọc, không thêm nghĩa."
    ],
    "practicePrompt": {
      "question": "Bạn có bảng viết tắt 'OKR = mục tiêu và kết quả chính'. Khi tạo kịch bản âm thanh, cách dùng bảng này tốt nhất là gì?",
      "options": [
        "Thay mọi 'OKR' bằng cách đọc đầy đủ trước khi tạo giọng",
        "Để giọng đọc tự hiểu OKR là gì",
        "Xoá mọi chỗ có OKR khỏi kịch bản",
        "Chỉ thay lần xuất hiện đầu tiên"
      ],
      "correct": 0,
      "explanation": "Thay trước khi tạo giúp giọng đọc không vấp và người nghe hiểu ngay. Để giọng tự hiểu thì nó có thể đọc từng chữ cái. Xoá là mất nội dung, còn thay lần đầu làm lần sau lại bị đọc sai."
    },
    "summary": {
      "keyIdea": "Văn bản cho giọng đọc viết sao để đọc lên là hiểu, không phải để mắt lướt.",
      "formula": "Viết tắt thành chữ, số thành chữ đọc được, tên viết gần âm, rồi nghe lại.",
      "commonMistake": "Thêm nhận định 'cho mượt' làm đổi nghĩa văn bản gốc.",
      "action": "Lập bảng 10 chữ viết tắt và tên hay gặp cùng cách đọc."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Lấy một đoạn 100 chữ trong tài liệu của bạn. Gạch chân mọi viết tắt, số và tên riêng, viết lại thành dạng đọc được, rồi dùng công cụ giọng đọc mà công ty cho phép nghe bản trước và bản sau.",
      "secondary": "Lưu lại bảng viết tắt - cách đọc để dùng cho các bản tin sau."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bạn có văn bản ghi 'Q3: doanh thu 1.500.000đ, TP.HCM vượt chỉ tiêu'. Trên màn hình nó đẹp gọn. Bấm đọc thành tiếng, giọng đọc có thể vấp ngay ở chữ đầu. Bài này dạy viết lại để đọc lên là hiểu."
      },
      {
        "type": "feynman",
        "title": "Viết cho người nghe đơn giản hơn bạn nghĩ",
        "intro": "Hình dung bạn đọc to một công thức nấu ăn cho người đang nấu ở bếp: bạn không đọc 'tbsp' mà nói 'một muỗng canh'. Giọng đọc AI cũng cần được viết như thế.",
        "columns": [
          "Thứ cần đổi",
          "Đọc công thức ở bếp",
          "Văn bản cho giọng đọc"
        ],
        "rows": [
          [
            "Viết tắt",
            "Không nói 'tbsp', nói 'muỗng canh'",
            "'Q3' thành 'quý ba'"
          ],
          [
            "Con số",
            "Nói rõ từng số để người nghe kịp ghi",
            "'1.500.000đ' thành 'một triệu năm trăm nghìn đồng'"
          ],
          [
            "Tên riêng",
            "Đánh vần tên món lạ",
            "Viết gần âm và nghe kiểm"
          ]
        ],
        "oneLiner": "Viết cho người nghe là viết ra thứ bạn sẽ nói thành lời."
      },
      {
        "type": "heading",
        "text": "Ba thứ cần đổi trước khi tạo giọng"
      },
      {
        "type": "paragraph",
        "text": "Đầu tiên là viết tắt: chữ như Q3 hay TP.HCM có thể bị đọc từng chữ cái. Thứ hai là số và ngày: dấu chấm, gạch chéo làm giọng đọc lạc. Thứ ba là tên riêng: đặc biệt tên người và sản phẩm hiếm. Đổi cả ba thành dạng đọc được, rồi nghe kiểm."
      },
      {
        "type": "flow",
        "title": "Sửa một đoạn văn cho giọng đọc",
        "steps": [
          {
            "label": "Gạch chân chỗ mơ hồ",
            "detail": "Tô màu mọi viết tắt, số, ngày, ký hiệu và tên riêng trong đoạn văn."
          },
          {
            "label": "Đổi sang chữ đọc được",
            "detail": "'Q3' thành 'quý ba', '15/10' thành 'mười lăm tháng mười', '1,5 triệu' thành 'một triệu rưỡi'."
          },
          {
            "label": "Ghi cách đọc tên",
            "detail": "Tên khó thì viết gần âm hoặc đánh vần; ghi vào bảng để lần sau dùng lại."
          },
          {
            "label": "Nghe bản trước và sau",
            "detail": "So hai bản để thấy chỗ nào đã tốt hơn, chỗ nào còn vấp."
          },
          {
            "label": "Giữ bảng đổi",
            "detail": "Lưu bảng viết tắt và cách đọc để thay tự động cho những bản tin sau."
          }
        ]
      },
      {
        "type": "list",
        "items": [
          "Viết tắt: đổi thành chữ đầy đủ khi đọc thành tiếng.",
          "Số tiền: viết thành chữ và kèm đơn vị tiền.",
          "Ngày: '15 tháng 10' thay cho '15/10'.",
          "Số điện thoại: nhóm vài chữ số để người nghe ghi được.",
          "Sửa xong luôn nghe lại, và không thêm nhận định mới."
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Dành cho mắt",
          "text": "'Q3: doanh thu 1.500.000đ. KPI đạt 105%. Liên hệ: 0912 345 678.' Gọn, nhưng mắt phải tự giải nghĩa viết tắt và số."
        },
        "right": {
          "label": "Dành cho tai",
          "text": "'Quý ba, doanh thu một triệu năm trăm nghìn đồng. Chỉ tiêu đạt một trăm linh năm phần trăm. Liên hệ: không chín một hai, ba bốn năm, sáu bảy tám.'"
        }
      },
      {
        "type": "callout",
        "label": "Sửa để dễ đọc, không sửa nghĩa",
        "text": "Khi viết lại, chỉ đổi dạng chữ, đừng thêm nhận định như 'tăng mạnh' hay 'rất tốt'. Nếu nhờ AI viết lại hộ, đối chiếu từng con số với bản gốc, vì AI có thể đổi số mà không báo."
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Soát bản viết lại cho giọng đọc",
        "task": "Văn bản gốc: 'Q3: doanh thu 1,5 triệu đồng; hạn nộp 15/10; liên hệ chị Bích.' AI viết lại cho dễ đọc. Đánh dấu chỗ đã đổi nghĩa.",
        "segments": [
          {
            "text": "Quý ba, doanh thu một triệu rưỡi đồng."
          },
          {
            "text": "Doanh thu tăng mạnh so với quý trước.",
            "error": "Văn bản gốc không có nhận định tăng mạnh hay so quý trước. AI tự thêm nghĩa."
          },
          {
            "text": "Hạn nộp là ngày mười lăm tháng mười."
          },
          {
            "text": "Hạn nộp là ngày mười lăm tháng năm.",
            "error": "Văn bản gốc là 15/10, tức tháng mười. Bản viết lại đọc nhầm tháng."
          },
          {
            "text": "Liên hệ chị Bích."
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Kịch bản bản tin trước giờ gửi",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn nhờ AI viết lại đoạn văn cho dễ đọc. Kết quả trôi chảy, có câu 'doanh thu tăng ấn tượng 20%'. Văn bản gốc không có con số này.",
            "choices": [
              {
                "label": "Giữ nguyên vì nghe hợp lý và làm bản tin hấp dẫn hơn",
                "next": "bad_keep"
              },
              {
                "label": "Đối chiếu với bản gốc và xoá nhận định không có nguồn",
                "next": "s2"
              }
            ]
          },
          "bad_keep": {
            "text": "Con số 20% lan truyền trong công ty, trưởng phòng tài chính hỏi nguồn và không ai trả lời được. Bản tin phải rút lại.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bạn xoá câu và còn lại bản đúng với gốc. Giờ cần kiểm phát âm.",
            "choices": [
              {
                "label": "Tạo giọng đọc rồi nghe cả bản, ghi lại chỗ vấp",
                "next": "good"
              },
              {
                "label": "Gửi ngay vì văn bản đã đúng",
                "next": "bad_skip"
              }
            ]
          },
          "bad_skip": {
            "text": "Văn bản đúng nhưng giọng đọc vẫn đọc 'KPI' từng chữ cái và sai tên chị Bích, làm bản tin mất trang trọng.",
            "ending": "bad"
          },
          "good": {
            "text": "Bạn sửa hai chỗ vấp, nghe lại và gửi. Nội dung đúng gốc, phát âm tự nhiên.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Viết cho tai: đổi viết tắt, số và tên thành chữ đọc được, và không thêm nghĩa.",
          "Bài sau: ghép các bước thành một dự án nhỏ, bản hướng dẫn dạng âm thanh."
        ]
      }
    ]
  },
  {
    "id": 2354,
    "slug": "du-an-nho-huong-dan-nghe-cho-nhan-vien-moi",
    "title": "Chặng 47, Bài 15: Dự án nhỏ: bản hướng dẫn dạng âm thanh cho nhân viên mới",
    "subtitle": "Một kịch bản hai phút, một giọng đọc, và một lần nghe từng câu trước khi phát hành.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "🎧",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Nhân viên mới thường được phát một chồng tài liệu ngày đầu và quên gần hết. Một bản hướng dẫn âm thanh hai phút nghe được khi đi làm là cách gọn để nhắc họ những việc quan trọng. Dự án này gom những gì bạn học: viết kịch bản, sửa cho giọng đọc, nghe kiểm từng câu.",
    "openingQuestion": "Bạn làm bản hướng dẫn âm thanh hai phút. Thứ tự hợp lý nhất là gì?",
    "openingOptions": [
      "Viết kịch bản, sửa cho dễ đọc, tạo giọng, nghe từng câu rồi sửa",
      "Tạo giọng trước rồi viết kịch bản khớp với phần đã đọc để khỏi phải nghe lại",
      "Viết kịch bản dài nhất có thể rồi cắt sau khi nghe",
      "Tạo giọng ngay từ email hướng dẫn gốc và gửi luôn"
    ],
    "correctOption": 0,
    "explanation": "Kịch bản là nền: nếu viết sai hoặc dài, giọng đọc chỉ làm lỗi nghe rõ hơn. Sửa cho dễ đọc trước khi tạo giọng giúp ít phải tạo lại, và nghe từng câu mới bắt được lỗi phát âm hoặc ý thiếu. Tạo giọng trước rồi viết là đảo thứ tự, viết dài rồi cắt tốn công, còn dùng nguyên email gốc thường mang viết tắt và văn viết không hợp để nghe.",
    "diagram": [
      {
        "label": "Xác định 3-5 điều nhân viên mới cần biết",
        "arrow": true
      },
      {
        "label": "Viết kịch bản 250-300 chữ, câu ngắn",
        "arrow": true
      },
      {
        "label": "Sửa số, tên, viết tắt rồi tạo giọng",
        "arrow": true
      },
      {
        "label": "Nghe từng câu và sửa",
        "arrow": true
      },
      {
        "label": "Phát hành kèm ghi chú giọng AI"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: phòng nhân sự công ty 80 người",
      "description": "Phòng nhân sự muốn nhắc nhân viên mới ba việc ngày đầu: nhận thẻ, cài phần mềm, gặp người phụ trách. Họ viết kịch bản 250 chữ, sửa 'HR' thành 'phòng nhân sự', tạo giọng và nghe từng câu. Họ phát hiện giọng đọc vấp tên phòng ban và sửa trước khi gửi, rồi gắn bản nghe vào email chào mừng."
    },
    "quiz": [
      {
        "question": "Kịch bản bản hướng dẫn hai phút nên dài khoảng bao nhiêu chữ nếu đọc khoảng 140 chữ mỗi phút?",
        "options": [
          "Khoảng 70 chữ (140 ÷ 2, chia thay vì nhân)",
          "Khoảng 280 chữ (2 × 140)",
          "Khoảng 142 chữ (140 + 2, cộng nhầm số phút)",
          "Khoảng 560 chữ (2 × 140 × 2, nhân đôi thừa)"
        ],
        "correct": 1,
        "explanation": "Số chữ bằng số phút nhân tốc độ: 2 × 140 = 280 chữ (số liệu minh hoạ, tốc độ thật tuỳ giọng). Chia ra 70 chữ, cộng ra 142 chữ, và nhân đôi ra 560 chữ đều là cách nhầm phép tính thường gặp."
      },
      {
        "question": "Bản hướng dẫn cho nhân viên mới nên có mấy ý chính?",
        "options": [
          "Càng nhiều càng tốt, tới hết mọi quy định của công ty",
          "Một ý duy nhất thật chung chung để dễ nhớ",
          "Ba đến năm ý, mỗi ý một việc cụ thể làm được ngay",
          "Mười ý trở lên để không ai hỏi lại bất cứ điều gì"
        ],
        "correct": 2,
        "explanation": "Người nghe chỉ nhớ được vài ý. Ba đến năm việc cụ thể giúp họ làm ngay trong ngày đầu. Đưa hết quy định hoặc mười ý sẽ quá tải, còn một ý chung chung thì không ai làm theo được."
      },
      {
        "question": "Khi nghe kiểm từng câu, việc nào quan trọng nhất cần làm?",
        "options": [
          "Đánh dấu câu đọc sai tên, số hoặc làm đổi nghĩa rồi sửa văn bản tại đó",
          "Đánh dấu câu nào bạn thấy giọng đọc nghe chưa hay rồi xoá đi, dù nội dung vẫn đúng",
          "Nghe một lần ở tốc độ gấp đôi để kiểm lỗi cho nhanh",
          "Nghe riêng ba câu đầu vì người nghe chỉ chú ý phần mở"
        ],
        "correct": 0,
        "explanation": "Nghe kiểm để bắt lỗi phát âm và lỗi nghĩa, rồi sửa ở văn bản. Xoá câu chỉ vì 'chưa hay' làm mất nội dung, nghe gấp đôi dễ bỏ lỡ chỗ vấp, còn nghe ba câu đầu bỏ qua phần lớn bản nghe."
      },
      {
        "question": "Ai nên xem bản hướng dẫn trước khi phát cho nhân viên mới?",
        "options": [
          "Không ai cần xem vì giọng AI đã đọc đúng theo kịch bản",
          "Người phụ trách nội dung đó, vì họ biết quy trình thật đúng hay sai",
          "Chỉ cần chính người làm kịch bản xem lại một lần cuối, khi chưa ai đối chiếu",
          "Một công cụ AI khác kiểm thay cho người phụ trách"
        ],
        "correct": 1,
        "explanation": "Người tạo bản nghe có thể không nắm quy trình thật, chẳng hạn cách nhận thẻ hoặc người cần gặp. Người phụ trách xác nhận nội dung đúng. Giọng đọc đúng theo kịch bản không có nghĩa kịch bản đúng, và công cụ AI khác không biết quy trình nội bộ."
      },
      {
        "question": "Bản hướng dẫn cần nói gì về giọng đọc?",
        "options": [
          "Ghi rõ đây là giọng đọc do AI tạo, và cho biết nơi hỏi người thật",
          "Giấu chi tiết này để nhân viên tưởng là giọng người thật, dù như vậy gây hiểu lầm",
          "Không cần nói gì vì nhân viên sẽ tự nhận ra",
          "Chỉ ghi khi có nhân viên thắc mắc sau ngày đầu"
        ],
        "correct": 0,
        "explanation": "Công khai để nhân viên biết đây là giọng máy và biết hỏi ai khi cần. Giấu chi tiết này gây hiểu nhầm, còn đợi người ta hỏi mới nói là bỏ lỡ lúc quan trọng nhất."
      }
    ],
    "keyTakeaways": [
      "Kịch bản 250-300 chữ, 3-5 ý, câu ngắn cho bản hai phút.",
      "Sửa số, tên và viết tắt trước khi tạo giọng.",
      "Nghe từng câu, sửa ở văn bản rồi tạo lại.",
      "Người phụ trách xác nhận nội dung đúng quy trình thật.",
      "Ghi rõ giọng do AI tạo."
    ],
    "practicePrompt": {
      "question": "Bạn nhờ công cụ viết kịch bản hướng dẫn cho nhân viên mới. Cách giao việc nào cho kịch bản bám sát thực tế nhất?",
      "options": [
        "Đưa ba việc ngày đầu có thật, độ dài 280 chữ, văn phong thân thiện",
        "Nhờ công cụ tự nghĩ những việc nhân viên mới nên làm",
        "Dán nguyên sổ tay nhân viên 40 trang và nhờ tóm tắt",
        "Nhờ công cụ bắt chước một bản hướng dẫn của công ty khác cùng ngành"
      ],
      "correct": 0,
      "explanation": "Đưa việc thật và giới hạn độ dài giúp công cụ viết đúng chuyện của công ty bạn. Để công cụ tự nghĩ sẽ bịa quy trình, dán cả sổ tay cho kịch bản loãng, và bắt chước công ty khác sẽ có quy trình không giống bạn."
    },
    "summary": {
      "keyIdea": "Dự án nhỏ ghép ba kỹ năng: kịch bản ngắn, văn bản sửa cho tai, nghe kiểm từng câu.",
      "formula": "3-5 ý, 280 chữ, sửa cho giọng đọc, nghe từng câu, người phụ trách duyệt, ghi giọng AI.",
      "commonMistake": "Phát bản nghe khi chưa có người phụ trách xác nhận quy trình.",
      "action": "Chọn 3 việc ngày đầu của nhân viên mới ở nơi bạn và viết kịch bản hai phút."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn ba việc một nhân viên mới ở nơi bạn cần làm trong ngày đầu. Viết kịch bản khoảng 250 chữ, sửa viết tắt và số, tạo bản nghe thử bằng công cụ giọng đọc được công ty cho phép, rồi nghe từng câu và ghi lại ba chỗ cần sửa.",
      "secondary": "Nhờ người phụ trách các việc đó đọc kịch bản và xác nhận đúng hay sai."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Ngày đầu đi làm, nhân viên mới nhận một chồng giấy tờ và quên gần hết trước trưa. Một bản hướng dẫn âm thanh hai phút có thể nhắc họ ba việc quan trọng. Đây là dự án nhỏ ghép các kỹ năng của mấy bài trước."
      },
      {
        "type": "feynman",
        "title": "Bản hướng dẫn âm thanh đơn giản hơn bạn nghĩ",
        "intro": "Hình dung một bảo tàng phát cho khách chiếc tai nghe hướng dẫn: vài phút, vài điểm chính, đọc rõ ràng. Không ai phát cả cuốn sách qua tai nghe.",
        "columns": [
          "Thành phần",
          "Tai nghe hướng dẫn ở bảo tàng",
          "Bản hướng dẫn cho nhân viên mới"
        ],
        "rows": [
          [
            "Độ dài",
            "Vài phút mỗi điểm dừng",
            "Khoảng hai phút, 3-5 ý"
          ],
          [
            "Nội dung",
            "Chỉ điều khách cần biết lúc đó",
            "Ba việc làm được ngay ngày đầu"
          ],
          [
            "Kiểm tra",
            "Người biên soạn nghe thử",
            "Bạn nghe từng câu, người phụ trách duyệt"
          ]
        ],
        "oneLiner": "Bản hướng dẫn âm thanh tốt là bản ngắn, rõ, và đã có người nghe thử."
      },
      {
        "type": "heading",
        "text": "Từ ý tới bản nghe trong bốn bước"
      },
      {
        "type": "paragraph",
        "text": "Bắt đầu bằng việc nhân viên mới cần làm, không phải bằng công cụ. Chọn ba đến năm ý, viết kịch bản khoảng 280 chữ bằng câu ngắn, sửa viết tắt và số, tạo giọng rồi nghe từng câu. Mỗi bước có một lỗi hay gặp, và bài này chỉ cách chặn nó."
      },
      {
        "type": "flow",
        "title": "Quy trình làm bản hướng dẫn hai phút",
        "steps": [
          {
            "label": "Chọn ba đến năm ý",
            "detail": "Hỏi người phụ trách: ngày đầu nhân viên mới cần làm được việc gì. Ghi mỗi ý thành một hành động cụ thể."
          },
          {
            "label": "Viết kịch bản",
            "detail": "Khoảng 280 chữ, câu ngắn, xưng hô thân thiện, mở bằng lời chào và đóng bằng nơi hỏi người thật."
          },
          {
            "label": "Sửa cho giọng đọc",
            "detail": "Đổi viết tắt, số, ngày và tên thành chữ đọc được như bài trước."
          },
          {
            "label": "Tạo giọng và nghe từng câu",
            "detail": "Tạo bản nghe, mở từng câu, đánh dấu chỗ phát âm sai hoặc ý thiếu, sửa văn bản rồi tạo lại."
          },
          {
            "label": "Người phụ trách duyệt",
            "detail": "Người biết quy trình thật nghe hoặc đọc kịch bản và xác nhận đúng trước khi phát."
          }
        ]
      },
      {
        "type": "list",
        "items": [
          "Mỗi ý là một việc làm được: nhận thẻ ở đâu, gặp ai, cài gì.",
          "Không đưa quy định dài hay điều khoản; chỉ lối vào chúng.",
          "Ghi rõ đây là giọng đọc do AI tạo.",
          "Kèm nơi hỏi người thật: phòng nhân sự hoặc người hướng dẫn.",
          "Không đưa thông tin nội bộ nhạy cảm vào công cụ chưa được duyệt."
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Bản làm vội",
          "text": "Dán cả sổ tay và nhờ công cụ tóm tắt, gửi ngay bản đầu tiên. Nhiều ý, dài, đọc sai tên phòng ban, chưa ai xác nhận quy trình."
        },
        "right": {
          "label": "Bản làm có kiểm",
          "text": "Ba việc ngày đầu, 280 chữ, đã sửa viết tắt, nghe từng câu, có người phụ trách duyệt, ghi giọng AI và nơi hỏi người thật."
        }
      },
      {
        "type": "callout",
        "label": "Dữ liệu nội bộ",
        "text": "Kịch bản có thể chứa tên phòng ban, phần mềm hay quy trình nội bộ. Dùng công cụ công ty đã duyệt, không dán thông tin nhạy cảm vào công cụ cá nhân, và hỏi bộ phận IT nếu chưa chắc."
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Giao việc viết kịch bản hai phút",
        "task": "Nhân viên mới ngày đầu cần: nhận thẻ ở quầy lễ tân, cài phần mềm chấm công, gặp chị Lan phòng nhân sự lúc 10 giờ. Lắp yêu cầu cho công cụ viết kịch bản.",
        "parts": [
          {
            "id": "facts",
            "label": "Dữ kiện",
            "options": [
              {
                "text": "Viết hướng dẫn cho nhân viên mới.",
                "feedback": "Công cụ không biết việc nào là việc thật nên tự bịa quy trình."
              },
              {
                "text": "Ba việc: nhận thẻ ở quầy lễ tân, cài phần mềm chấm công, gặp chị Lan phòng nhân sự lúc 10 giờ.",
                "good": true,
                "feedback": "Có đủ việc, nơi và giờ thật, kịch bản chỉ việc diễn đạt."
              }
            ]
          },
          {
            "id": "len",
            "label": "Độ dài",
            "options": [
              {
                "text": "Viết đủ chi tiết và đầy đủ.",
                "feedback": "Không giới hạn nên bản dài, nghe quá hai phút."
              },
              {
                "text": "Khoảng 280 chữ, câu ngắn, đọc thành tiếng, không ký hiệu.",
                "good": true,
                "feedback": "Độ dài và dạng câu rõ giúp vừa hai phút và đọc tự nhiên."
              }
            ]
          },
          {
            "id": "tone",
            "label": "Giọng và kết",
            "options": [
              {
                "text": "Giọng thật hào hứng và hứa nhiều điều.",
                "feedback": "Công cụ dễ hứa thêm phúc lợi hay chính sách công ty không có."
              },
              {
                "text": "Thân thiện, xưng 'bạn', kết bằng nơi hỏi người thật và ghi 'giọng do AI tạo'.",
                "good": true,
                "feedback": "Giọng rõ, không hứa thêm, người nghe biết hỏi ai."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "facts",
              "len",
              "tone"
            ],
            "text": "Chào bạn, chào mừng bạn đến với công ty. Hôm nay bạn có ba việc. Một, nhận thẻ ra vào ở quầy lễ tân. Hai, cài phần mềm chấm công. Ba, gặp chị Lan phòng nhân sự lúc mười giờ. Cần giúp gì, hãy hỏi phòng nhân sự. Bản hướng dẫn này do giọng đọc AI tạo."
          },
          {
            "requires": [
              "facts"
            ],
            "text": "Chào mừng bạn. Hôm nay bạn nhận thẻ, cài phần mềm và gặp chị Lan lúc mười giờ... (Đúng dữ kiện nhưng dài, không ghi nơi hỏi người thật và không nói rõ giọng AI.)"
          },
          {
            "text": "Chào mừng bạn đến đại gia đình chúng tôi! Ngày đầu bạn sẽ được tặng bộ quà chào mừng và tham gia buổi tiệc đón... (Công cụ tự bịa quà và tiệc vì bạn không đưa việc thật.)"
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Phát hành bản hướng dẫn cho nhân viên mới",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bản nghe đã tạo xong, dài hai phút. Nghe lướt thì ổn. Ngày mai có nhân viên mới bắt đầu làm.",
            "choices": [
              {
                "label": "Phát luôn vì nghe lướt thấy ổn",
                "next": "bad_ship"
              },
              {
                "label": "Nghe từng câu, đánh dấu chỗ sai, rồi gửi kịch bản cho người phụ trách xem",
                "next": "s2"
              }
            ]
          },
          "bad_ship": {
            "text": "Bản nghe đọc sai tên phòng ban và nhắc một phần mềm cũ đã đổi. Nhân viên mới đi tìm sai chỗ và phòng nhân sự phải giải thích lại.",
            "ending": "bad"
          },
          "s2": {
            "text": "Nghe kỹ thấy hai chỗ phát âm sai. Người phụ trách chỉ ra phần mềm đã đổi tên.",
            "choices": [
              {
                "label": "Sửa văn bản theo hai lời góp, tạo lại, nghe lại rồi phát hành kèm ghi chú giọng AI",
                "next": "good"
              },
              {
                "label": "Chỉ sửa chỗ phát âm và bỏ qua chỗ tên phần mềm vì nhỏ",
                "next": "bad_half"
              }
            ]
          },
          "bad_half": {
            "text": "Nhân viên mới vẫn đi tìm phần mềm theo tên cũ và mất một buổi sáng mới biết tên mới.",
            "ending": "bad"
          },
          "good": {
            "text": "Bản hướng dẫn đúng quy trình, đọc rõ, có nơi hỏi người thật. Nhân viên mới bắt đầu ngày đầu mà ít phải hỏi lại.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Bản hướng dẫn tốt là bản ngắn, đã nghe thử và đã có người thật xác nhận.",
          "Bài sau: họp xong, giữ hay xoá bản ghi thế nào cho đúng."
        ]
      }
    ]
  }
];
