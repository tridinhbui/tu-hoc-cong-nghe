import type { Lesson } from "../lesson-types";

// Chặng 65, bài 1-5. Giáo trình: scripts/curriculum/stage-65.json.
// Nội dung chung chung về quyền riêng tư; không dẫn điều luật, quy định cụ thể hỏi pháp chế.
export const S65_A_LESSONS: Lesson[] = [
  {
    "id": 2700,
    "slug": "bang-tinh-danh-sach-khach-chua-nhung-gi-ban-khong-nghi-toi",
    "title": "Chặng 65, Bài 1: Bảng tính danh sách khách chứa những gì bạn không nghĩ tới",
    "subtitle": "Mỗi cột trông vô hại, nhưng ghép lại thì chỉ đúng một người trả lời được.",
    "duration": "8 phút",
    "difficulty": "Dễ",
    "emoji": "🔎",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Phần lớn rò rỉ dữ liệu cá nhân ở văn phòng không đến từ hacker mà từ một tệp Excel gửi nhầm chỗ, hoặc dán nguyên bảng vào một công cụ lạ. Người gửi thường nghĩ “chỉ là danh sách khách thôi”. Khi bạn biết cột nào nhận ra được một con người, bạn biết phải cẩn thận ở đâu trước khi chia sẻ.",
    "openingQuestion": "Sáng thứ Hai, bạn cần gửi đối tác bảng 2.000 khách để họ tính quà tặng. Bảng có các cột: họ tên, số điện thoại, email, quận, ngày sinh, sản phẩm đã mua, ghi chú của CSKH. Cột nào cần xem kỹ nhất trước khi gửi?",
    "openingOptions": [
      "Mọi cột nhận ra được khách, kể cả ghi chú CSKH có thể chứa chuyện riêng",
      "Chỉ cột họ tên, vì tên là thứ duy nhất cho biết khách là ai",
      "Chỉ cột số điện thoại, vì đó là cột bị lạm dụng nhiều nhất",
      "Không cột nào, vì bảng đã nằm trong máy công ty nên coi như an toàn hết rồi"
    ],
    "correctOption": 0,
    "explanation": "Dữ liệu cá nhân là mọi thông tin gắn được với một con người cụ thể, dù trực tiếp như họ tên, số điện thoại, email, hay gián tiếp như ngày sinh kết hợp quận. Ghi chú của CSKH hay bị bỏ sót nhất vì là ô chữ tự do: nhân viên có thể gõ vào đó tình trạng sức khoẻ, hoàn cảnh gia đình. Chỉ kiểm cột tên hoặc cột số điện thoại là bỏ lọt phần còn lại, còn “nằm trong máy công ty” không cho phép bạn gửi ra ngoài cho ai cũng được.",
    "diagram": [
      {
        "label": "Mở bảng, đọc từng tiêu đề cột",
        "arrow": true
      },
      {
        "label": "Đánh dấu cột nhận ra một người",
        "arrow": true
      },
      {
        "label": "Đánh dấu cột chỉ nhận ra khi ghép",
        "arrow": true
      },
      {
        "label": "Quyết định giữ, gộp hay xoá từng cột trước khi chia sẻ"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Một nhân viên marketing gửi đối tác bảng khách để tính quà Tết. Bảng có cột “ghi chú” do tổng đài viên gõ tay, trong đó có dòng “khách đang điều trị, nhờ gọi vào buổi chiều”. Người gửi không hề để ý vì chỉ nhìn ba cột đầu. Đây là tình huống giả định, nhưng dạng lỗi thì rất quen: ô chữ tự do chứa thứ mà không ai định chia sẻ."
    },
    "quiz": [
      {
        "question": "Cột nào trong bảng khách tự nó đã nhận ra được một người?",
        "options": [
          "Số điện thoại di động hoặc email riêng của khách",
          "Tên thành phố nơi khách đang sinh sống",
          "Nhóm sản phẩm khách hay mua nhất",
          "Tháng khách bắt đầu đăng ký dịch vụ"
        ],
        "correct": 0,
        "explanation": "Số điện thoại di động và email riêng thường thuộc về đúng một người nên gọi hay nhắn là tới thẳng họ. Tên thành phố, nhóm sản phẩm và tháng đăng ký đều có rất nhiều người cùng giá trị, chúng chỉ nhận ra người khi ghép với cột khác."
      },
      {
        "question": "Vì sao ô “ghi chú” do nhân viên gõ tay cần kiểm kỹ khi chia sẻ bảng?",
        "options": [
          "Ô chữ tự do có thể chứa chuyện riêng mà không ai định chia sẻ",
          "Vì ô ghi chú luôn làm tệp nặng hơn và dễ treo máy người nhận",
          "Vì ô ghi chú thường bị nhập sai chính tả nên trông thiếu chuyên nghiệp",
          "Vì cột ghi chú bị khoá bản quyền nên chỉ người soạn mới được mở"
        ],
        "correct": 0,
        "explanation": "Ô chữ tự do không có khuôn nên người gõ có thể ghi bất cứ điều gì: bệnh, hoàn cảnh gia đình, phàn nàn. Nặng tệp, sai chính tả hay bản quyền đều không phải lý do; vấn đề là nội dung nhạy cảm nằm lẫn trong đó."
      },
      {
        "question": "Bảng chỉ còn cột ngày sinh đầy đủ, quận và nghề nghiệp, đã xoá hết tên. Nhận định nào đúng?",
        "options": [
          "Vẫn có thể nhận ra người khi ba cột này ghép lại",
          "Hoàn toàn an toàn, vì tên là cột duy nhất cho biết một người là ai",
          "An toàn, vì ngày sinh nằm trong thế giới số không ai đối chiếu được",
          "Chỉ nguy hiểm nếu bảng có trên 10.000 dòng, còn ít dòng thì yên tâm"
        ],
        "correct": 0,
        "explanation": "Ngày sinh đầy đủ, quận và nghề nghiệp ghép lại thu hẹp về rất ít người, đôi khi chỉ một người; ai quen biết khách đều có thể đối chiếu. Bảng ít dòng thậm chí còn dễ lộ hơn vì mỗi tổ hợp ít lặp lại. Xoá tên chưa đủ."
      },
      {
        "question": "Bảng khách nằm trên ổ chung của công ty. Bạn muốn dán cả bảng vào một công cụ AI bạn tự tìm thấy. Điều đúng nhất là gì?",
        "options": [
          "Dán dữ liệu thật ra ngoài cần công ty cho phép công cụ đó",
          "Được phép, vì bảng vốn đã nằm trong hệ thống của công ty mình nên mặc nhiên an toàn",
          "Được phép nếu bạn xoá cột họ tên, vì tên là thứ duy nhất dễ lộ người",
          "Được phép nếu bạn dán từng nhóm 100 dòng một, vì ít dòng thì không sao"
        ],
        "correct": 0,
        "explanation": "Công cụ ngoài là một hệ thống khác, nằm ngoài sự kiểm soát của công ty. Xoá một cột hay dán chia nhỏ không đổi được việc dữ liệu đã rời đi, và ghép các cột còn lại vẫn nhận ra người. Muốn dùng thì hỏi bộ phận IT hoặc pháp chế công cụ nào được duyệt."
      },
      {
        "question": "Bạn cần nhờ AI gợi ý cách đặt cột cho một bảng khách mới. Cách làm nào vừa hiệu quả vừa an toàn?",
        "options": [
          "Chỉ gửi tên các cột cùng hai dòng ví dụ bịa",
          "Gửi 50 dòng đầu của bảng thật để AI thấy kiểu dữ liệu thực tế",
          "Gửi bảng thật đã xoá cột họ tên để AI vẫn hiểu khách là ai",
          "Gửi bảng thật nhưng dặn AI “đừng lưu lại” để bảo đảm không rò"
        ],
        "correct": 0,
        "explanation": "AI chỉ cần cấu trúc, tức tên cột và vài dòng mẫu do bạn bịa. Dữ liệu thật dù chỉ 50 dòng là người thật. Dặn AI “đừng lưu” không thay cho việc công ty cho phép công cụ đó; xoá cột tên cũng không ngăn việc ghép các cột còn lại."
      }
    ],
    "keyTakeaways": [
      "Dữ liệu cá nhân là thông tin gắn được với một con người cụ thể, trực tiếp hoặc khi ghép lại.",
      "Số điện thoại, email riêng, địa chỉ nhà nhận ra người ngay; ngày sinh, quận, chức danh nhận ra khi ghép.",
      "Ô ghi chú chữ tự do là chỗ hay chứa điều nhạy cảm nhất mà không ai nhớ.",
      "Muốn nhờ AI về bảng, chỉ gửi tên cột và dòng ví dụ bịa, không gửi người thật.",
      "Quy định cụ thể về từng loại dữ liệu: hỏi bộ phận pháp chế."
    ],
    "practicePrompt": {
      "question": "Bảng học viên của trung tâm đào tạo có: họ tên, email, lớp, điểm, ghi chú của giáo viên. Bạn chia sẻ với phòng kế toán để in giấy chứng nhận. Nên chia sẻ những cột nào?",
      "options": [
        "Họ tên và lớp, vì in chứng nhận chỉ cần hai thứ đó",
        "Cả năm cột, vì kế toán cũng là người nội bộ của trung tâm",
        "Chỉ email và điểm, vì họ tên bị coi là thông tin nhạy cảm nhất",
        "Không chia sẻ gì, cứ đưa kế toán bản in một học viên một lần"
      ],
      "correct": 0,
      "explanation": "Chỉ chia sẻ phần cần cho đúng việc: chứng nhận cần họ tên và lớp. Điểm và ghi chú của giáo viên không liên quan tới việc in giấy, nên không cần đi theo. Gửi cả năm cột chỉ vì cùng công ty là thói quen làm dữ liệu đi xa hơn cần thiết; bỏ hẳn việc chia sẻ thì không thực tế."
    },
    "summary": {
      "keyIdea": "Một bảng khách là một tập hợp các mảnh ghép về con người, không phải đống chữ trung tính.",
      "formula": "Cột nhận ra người ngay + cột nhận ra khi ghép + ô chữ tự do = những gì cần cân nhắc trước khi chia sẻ.",
      "commonMistake": "Chỉ nhìn cột họ tên rồi coi phần còn lại là an toàn.",
      "action": "Mở một bảng thật của bạn và gạch chân cột nào nhận ra được một người."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Mở một bảng khách, nhân viên hoặc học viên mà bạn đang giữ. Chép riêng tên các cột ra một giấy nháp, chia làm ba nhóm: nhận ra người ngay, nhận ra khi ghép, không liên quan tới người. Đọc thêm 20 ô của cột ghi chú và đánh dấu ô nào chứa chuyện riêng. Ngày mai bạn sẽ được hỏi bạn tìm ra bao nhiêu cột trong mỗi nhóm.",
      "secondary": "Nếu bảng thuộc loại bạn thường gửi ra ngoài, ghi ra một cột bạn sẽ không gửi lần sau."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Thứ Hai nào bạn cũng gửi ai đó một tệp Excel. Bài này dạy một thói quen: trước khi bấm gửi, nhìn lại từng cột và hỏi “cột này nhận ra ai?”. Không cần biết luật hay kỹ thuật, chỉ cần nhìn kỹ."
      },
      {
        "type": "feynman",
        "title": "Một bảng khách đơn giản hơn bạn nghĩ",
        "intro": "Hình dung cuốn sổ khách của một tiệm tạp hoá: mỗi trang một khách, ghi tên, số điện thoại, nhà ở đâu, hay mua gì, lần cuối ghé khi nào. Bảng tính chỉ là cuốn sổ đó sắp thành cột.",
        "columns": [
          "Thứ trong sổ",
          "Cuốn sổ tiệm tạp hoá",
          "Bảng tính khách"
        ],
        "rows": [
          [
            "Nhận ra ngay",
            "Tên và số điện thoại của khách",
            "Họ tên, số điện thoại, email riêng"
          ],
          [
            "Nhận ra khi ghép",
            "“Bà bán vé số ở góc chợ, sinh tháng 3”",
            "Ngày sinh + quận + nghề nghiệp"
          ],
          [
            "Ghi chú tự do",
            "Dòng chữ bà chủ ghi bên lề",
            "Ô ghi chú của CSKH"
          ],
          [
            "Khi cho người lạ mượn",
            "Họ đọc được chuyện của cả xóm",
            "Người nhận biết được cả chân dung khách"
          ]
        ],
        "oneLiner": "Một bảng khách là cuốn sổ của cả xóm: người cầm nó biết nhiều về khách hơn từng cột riêng lẻ."
      },
      {
        "type": "heading",
        "text": "Khoảnh khắc: sắp bấm “Gửi”"
      },
      {
        "type": "paragraph",
        "text": "Bạn sắp gửi bảng cho một đối tác. Bạn nhìn và thấy vài cột quen thuộc. Vấn đề là cột quen chưa chắc vô hại, còn cột lạ thì dễ bị bỏ qua. Cách làm an toàn là đi từng cột, hỏi một câu: nếu người lạ cầm cột này, họ có nhận ra một con người không?"
      },
      {
        "type": "heading",
        "text": "Ba nhóm cột cần phân biệt"
      },
      {
        "type": "paragraph",
        "text": "Thuật ngữ đầu tiên: dữ liệu cá nhân là thông tin gắn được với một con người cụ thể. Thuật ngữ thứ hai: nhận ra gián tiếp, nghĩa là từng cột chưa đủ nhưng ghép vài cột lại thì đủ."
      },
      {
        "type": "list",
        "items": [
          "Nhận ra ngay: họ tên, số điện thoại di động, email riêng, địa chỉ nhà, số giấy tờ tuỳ thân.",
          "Nhận ra khi ghép: ngày sinh, quận hoặc phường, chức danh, tên trường, giờ thường đặt hàng.",
          "Ô chữ tự do: ghi chú CSKH, lý do hoàn tiền, phản hồi của khách - bất cứ thứ gì ai đó gõ tay.",
          "Không nhận ra người: mã sản phẩm, số lượng, tháng, nhóm hàng (nhưng vẫn nhận ra khi ghép với nhóm trên)."
        ]
      },
      {
        "type": "flow",
        "title": "Đọc một bảng khách từng bước",
        "steps": [
          {
            "label": "Đọc tiêu đề",
            "detail": "Chép tên các cột ra giấy nháp. Chưa nhìn dữ liệu, chỉ nhìn tên cột để biết bảng hỏi những gì."
          },
          {
            "label": "Gạch cột nhận ra ngay",
            "detail": "Gạch chân mọi cột mà người lạ cầm lên có thể gọi, nhắn hoặc tìm tới nhà khách."
          },
          {
            "label": "Gạch cột ghép được",
            "detail": "Đánh dấu cột như ngày sinh, quận, chức danh: một mình thì hiền, ghép hai ba cột lại thì nhận ra."
          },
          {
            "label": "Đọc thử ô chữ tự do",
            "detail": "Cuộn đọc ít nhất 20 ô ghi chú. Ô nào chứa sức khoẻ, hoàn cảnh hay lời phàn nàn cá nhân thì đánh dấu."
          },
          {
            "label": "Quyết định từng cột",
            "detail": "Với mỗi cột ghi một chữ: giữ, gộp, hoặc bỏ. Người nhận chỉ nên nhận đúng phần họ cần cho việc của họ."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Nhìn một cột",
          "text": "Cột ngày sinh: “nhiều người sinh cùng ngày nên chắc không sao”. Cột quận: “chỉ là khu vực”. Cách nhìn này bỏ sót việc ghép cột."
        },
        "right": {
          "label": "Nhìn một tổ hợp",
          "text": "Ngày sinh đầy đủ + quận + chức danh: trong một công ty nhỏ hoặc một phường nhỏ, có khi chỉ còn một người khớp. Đây mới là cách nhìn của người cầm bảng."
        }
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI gợi ý cột cho bảng khách mới mà không đưa người thật",
        "task": "Bạn muốn nhờ một công cụ AI đề xuất cấu trúc cột cho bảng theo dõi khách VIP. Lắp prompt sao cho AI giúp được mà bạn không phải đưa dữ liệu khách thật.",
        "parts": [
          {
            "id": "input",
            "label": "Bạn đưa gì cho AI",
            "options": [
              {
                "text": "Dán 50 dòng đầu của bảng khách hiện tại để AI thấy dữ liệu thực.",
                "feedback": "Đó là 50 con người thật, gồm tên và số điện thoại, đã rời khỏi công ty. AI không cần họ để gợi ý cấu trúc cột."
              },
              {
                "text": "Chỉ tên các cột hiện có và hai dòng ví dụ bịa, ghi rõ “dữ liệu giả”.",
                "good": true,
                "feedback": "AI đủ thông tin để hiểu kiểu dữ liệu, và không người thật nào bị đưa ra ngoài."
              }
            ]
          },
          {
            "id": "task",
            "label": "Việc cần làm",
            "options": [
              {
                "text": "Đề xuất cột cần có, cột nên bỏ, và cột nào là dữ liệu cá nhân cần cẩn thận, kèm lý do ngắn.",
                "good": true,
                "feedback": "Yêu cầu có ba phần rõ ràng, nên câu trả lời bám đúng việc và bạn soát từng ý được."
              },
              {
                "text": "Làm cho bảng của tôi tốt hơn.",
                "feedback": "Mục tiêu mơ hồ nên AI sẽ viết chung chung, thậm chí thêm cả cột thu nhiều dữ liệu hơn mức cần."
              }
            ]
          },
          {
            "id": "format",
            "label": "Khuôn trả lời",
            "options": [
              {
                "text": "Trả lời thật chi tiết mọi khía cạnh về dữ liệu khách.",
                "feedback": "Không có giới hạn nên AI viết dài, lẫn nhiều ý thừa và khó soát."
              },
              {
                "text": "Trả về bảng ba cột: tên cột, giữ hay bỏ, lý do trong một câu; dưới 15 dòng.",
                "good": true,
                "feedback": "Khuôn rõ ràng giúp bạn soát nhanh từng dòng và biết AI đã bỏ sót gì."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "input",
              "task",
              "format"
            ],
            "text": "Tên cột | Giữ/Bỏ | Lý do\nHọ tên | Giữ | Cần để xưng hô, là dữ liệu cá nhân nhận ra ngay\nSố điện thoại | Giữ | Cần liên hệ, là dữ liệu cá nhân nhận ra ngay\nNgày sinh đầy đủ | Bỏ, chỉ giữ tháng | Ghép với quận dễ nhận ra người\nGhi chú tự do | Đổi thành ô chọn sẵn | Ô chữ tự do dễ chứa chuyện riêng\n(Mọi dòng đều bám sát cấu trúc cột bạn đưa, không có người thật nào.)"
          },
          {
            "requires": [
              "input"
            ],
            "text": "Bảng VIP nên có nhiều cột hơn để hiểu khách sâu: thêm nghề nghiệp, thu nhập ước tính, sở thích, tình trạng gia đình...\n(Bạn không đưa người thật, nhưng yêu cầu mơ hồ nên AI gợi ý thu thêm dữ liệu, ngược với điều bạn cần.)"
          },
          {
            "text": "Dựa vào 50 dòng bạn đưa, khách Nguyễn Thị Hà ở quận 3 mua nhiều nhất, bạn nên ưu tiên chăm sóc chị Hà...\n(Dữ liệu người thật đã rời công ty, và AI còn bịa thêm kết luận về một khách cụ thể.)"
          }
        ]
      },
      {
        "type": "callout",
        "label": "Đừng quên ô “ghi chú”",
        "text": "Ô ghi chú không có khuôn, nên là nơi người gõ tự do nhất và cũng bất cẩn nhất. Trước khi gửi bất kỳ bảng nào, cuộn đọc ít nhất vài chục ô của cột này. Nếu ô nào chứa sức khoẻ, tài chính hay chuyện gia đình của khách, đừng để nó đi theo bảng. Quy định cụ thể về loại dữ liệu nhạy cảm: hỏi bộ phận pháp chế."
      },
      {
        "type": "scenario",
        "title": "Đối tác xin cả bảng khách",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Đối tác nhắn: “Chị gửi em bảng khách đầy đủ để em tính quà nhé.” Bảng của bạn có 2.000 dòng với họ tên, số điện thoại, email, ngày sinh, quận và ghi chú CSKH. Quà chỉ cần biết mỗi khách thuộc nhóm nào (Bạc, Vàng, Kim cương) và số lượng mỗi nhóm.",
            "choices": [
              {
                "label": "Gửi nguyên bảng cho nhanh, đối tác cũng là người làm ăn đàng hoàng",
                "next": "bad_all"
              },
              {
                "label": "Hỏi lại: đối tác thực sự cần những thông tin nào để tính quà",
                "next": "s2"
              }
            ]
          },
          "bad_all": {
            "text": "Bảng ra đi với đủ số điện thoại, ngày sinh và cả ghi chú có chuyện riêng của khách. Hai tuần sau, một khách nhận được cuộc gọi chào bán từ một công ty lạ, biết cả ngày sinh của chị. Không ai biết bảng đã đi qua tay mấy người.",
            "ending": "bad"
          },
          "s2": {
            "text": "Đối tác đáp: chỉ cần mã nhóm và số lượng để đặt quà. Họ không cần biết khách là ai. Bạn bắt đầu làm bảng gửi.",
            "choices": [
              {
                "label": "Gửi bảng đếm: mỗi nhóm khách một dòng với số lượng, không có dòng khách nào",
                "next": "good"
              },
              {
                "label": "Xoá cột họ tên rồi gửi 2.000 dòng còn lại, vì tên là thứ quan trọng nhất",
                "next": "bad_partial"
              }
            ]
          },
          "bad_partial": {
            "text": "Bảng vẫn còn số điện thoại, ngày sinh, quận và ghi chú. Ai có danh bạ của khách đều ghép lại được. Bạn tưởng đã xử lý xong nhưng người thật vẫn nhận ra được.",
            "ending": "bad"
          },
          "good": {
            "text": "Đối tác nhận ba dòng: Bạc 1.200, Vàng 650, Kim cương 150. Đủ để đặt quà, không cần tên ai. Bạn ghi vào ghi chú việc: “chỉ chia sẻ số lượng theo nhóm”.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Nhìn từng cột và hỏi: người lạ cầm cột này có nhận ra ai không.",
          "Bài sau: vì sao bỏ tên vẫn nhận ra người khi các mảnh dữ liệu ghép lại."
        ]
      }
    ]
  },
  {
    "id": 2701,
    "slug": "tach-ten-so-dien-thoai-ma-khach-du-lieu-nao-ghep-lai-duoc",
    "title": "Chặng 65, Bài 2: Bỏ tên vẫn nhận ra người: các mảnh dữ liệu ghép lại",
    "subtitle": "Ngày sinh, khu vực, chức danh: ba mảnh nhỏ cùng chỉ về một người.",
    "duration": "8 phút",
    "difficulty": "Dễ",
    "emoji": "🧩",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Nhiều người nghĩ xoá cột họ tên là xong. Nhưng trong một công ty vài trăm người hay một khu phố vài chục nhà, ngày sinh cộng chức danh cộng khu vực đủ để ai cũng biết đó là ai. Hiểu việc ghép mảnh giúp bạn không tự tin quá mức khi gửi một bảng “đã bỏ tên”.",
    "openingQuestion": "Phòng bạn có 40 người. Bảng khảo sát nhân viên đã xoá cột họ tên, chỉ còn: phòng ban, chức danh, năm sinh, giới tính, mức hài lòng. Bạn định gửi cả công ty xem. Rủi ro lớn nhất là gì?",
    "openingOptions": [
      "Một số dòng chỉ khớp với một người nên đồng nghiệp đoán ra ai đã trả lời",
      "Bảng thiếu họ tên nên không ai biết bảng nói về nhân viên nào",
      "Bảng có cột giới tính nên bị coi là phân biệt đối xử",
      "Không có rủi ro, vì mọi người trong công ty đều đã là người quen"
    ],
    "correctOption": 0,
    "explanation": "Khi nhóm nhỏ, một tổ hợp như “trưởng phòng kế toán, nữ, sinh 1985” chỉ khớp một người, dù không có tên. Đồng nghiệp lại biết nhau nên đoán ra rất nhanh, và người trả lời thật thà có thể bị lộ mức hài lòng thấp của mình. Việc thiếu tên không làm bảng vô nghĩa, cột giới tính tự nó không phải vấn đề, còn việc “người quen” chính là lý do dễ đoán ra chứ không làm bảng an toàn hơn.",
    "diagram": [
      {
        "label": "Mảnh 1: ngày sinh hoặc năm sinh",
        "arrow": true
      },
      {
        "label": "Mảnh 2: khu vực hoặc phòng ban",
        "arrow": true
      },
      {
        "label": "Mảnh 3: chức danh hoặc nghề",
        "arrow": true
      },
      {
        "label": "Ghép lại: còn một người khớp"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Một công ty vài chục người gửi bảng khảo sát “ẩn danh” cho cả nhóm, chỉ bỏ cột tên. Dòng “kho vận, nam, 52 tuổi, lương hài lòng thấp” chỉ khớp đúng một người. Anh ấy biết ngay mọi người đoán ra mình, từ đó lần sau không dám trả lời thật. Đây là tình huống giả định, nhưng là cách khảo sát nội bộ thường hỏng."
    },
    "quiz": [
      {
        "question": "Bảng đã xoá cột họ tên nhưng còn ngày sinh, quận và chức danh. Vì sao vẫn có thể nhận ra người?",
        "options": [
          "Ghép ba mảnh lại có thể chỉ còn một người khớp",
          "Vì ngày sinh được coi là dữ liệu cá nhân nguy hiểm nhất trong mọi bảng tính",
          "Vì cột quận và chức danh luôn chứa sẵn họ tên viết tắt của người đó",
          "Vì phần mềm Excel tự khôi phục lại cột họ tên đã xoá khi mở bảng"
        ],
        "correct": 0,
        "explanation": "Từng mảnh chỉ thu hẹp một phần, ghép ba mảnh thì có thể chỉ còn một người. Ngày sinh không phải thứ nguy hiểm riêng lẻ, hai cột kia không chứa tên viết tắt, và Excel không thể khôi phục một cột đã xoá khỏi tệp gửi đi."
      },
      {
        "question": "Nhóm nào dễ bị nhận ra nhất khi gộp các mảnh ngày sinh, khu vực, chức danh?",
        "options": [
          "Một nhóm nhỏ, như phòng ban 8 người",
          "Một nhóm rất đông, như khách của cả thành phố lớn với hàng triệu người",
          "Một nhóm ở nhiều nước, vì mỗi nước có quy định khác nhau về dữ liệu",
          "Một nhóm cùng độ tuổi, vì ai cùng tuổi đều trông giống nhau trong bảng"
        ],
        "correct": 0,
        "explanation": "Càng ít người trong nhóm thì mỗi tổ hợp càng hiếm và càng dễ chỉ về một người. Nhóm đông có nhiều người trùng tổ hợp nên khó chỉ ra ai; quy định khác nhau giữa các nước không liên quan tới việc ghép mảnh; cùng độ tuổi không khiến dòng bị lẫn nếu còn cột khác."
      },
      {
        "question": "Khi tự đánh giá một bảng “đã bỏ tên”, câu hỏi nào hữu ích nhất?",
        "options": [
          "Một người quen biết họ có đoán ra dòng này là ai không",
          "Bảng này nặng bao nhiêu megabyte khi nén thành tệp",
          "Bảng này có được định dạng đẹp và dễ đọc cho người nhận không",
          "Bảng này được tạo ra từ phần mềm nào của công ty"
        ],
        "correct": 0,
        "explanation": "Nhận ra là chuyện của người đọc, nên hãy thử đặt mình vào người quen biết đối tượng. Dung lượng, định dạng hay phần mềm tạo bảng không cho biết gì về khả năng lộ danh tính."
      },
      {
        "question": "Bạn muốn bảng vẫn hữu ích nhưng khó nhận ra người hơn. Cách nào đúng hướng?",
        "options": [
          "Đổi ngày sinh thành nhóm tuổi 10 năm, quận thành vùng rộng hơn",
          "Giữ nguyên các cột nhưng đổi tên tiêu đề cột cho khó hiểu hơn, vì nghĩ tên cột làm lộ người",
          "Đổi thứ tự các dòng ngẫu nhiên để khó đoán dòng nào của ai",
          "Xoá một nửa số dòng ngẫu nhiên để bảng trông ít dữ liệu hơn"
        ],
        "correct": 0,
        "explanation": "Gộp giá trị cho rộng hơn, như nhóm tuổi và vùng, làm mỗi tổ hợp có nhiều người hơn nên khó chỉ về một. Đổi tên cột hay xáo thứ tự dòng không thay nội dung từng dòng; xoá ngẫu nhiên nửa số dòng không giúp gì cho các dòng còn lại."
      },
      {
        "question": "Bảng khảo sát có 12 nhân viên phòng pháp chế. Bạn gửi báo cáo “theo chức danh”. Điều nào đúng?",
        "options": [
          "Nhóm chỉ 1 người như “Trưởng phòng” sẽ bị lộ câu trả lời của mình",
          "Báo cáo theo chức danh luôn an toàn vì chức danh là thông tin của công ty",
          "Chỉ cần ghi chú cuối báo cáo “ẩn danh” là mọi người đều yên tâm",
          "Chỉ nguy hiểm khi báo cáo có tên, còn theo chức danh thì không sao"
        ],
        "correct": 0,
        "explanation": "Chức danh chỉ có một người giữ thì kết quả của nhóm đó chính là câu trả lời của người ấy. Dòng chữ “ẩn danh” không làm thay đổi việc ai cũng đoán ra; chức danh là thông tin của công ty nhưng nó chỉ thẳng vào một cá nhân."
      }
    ],
    "keyTakeaways": [
      "Xoá cột họ tên chưa biến bảng thành vô danh.",
      "Ngày sinh, khu vực, chức danh ghép lại có thể chỉ khớp một người.",
      "Nhóm càng nhỏ, tổ hợp càng dễ chỉ ra một người.",
      "Gộp giá trị rộng hơn (nhóm tuổi, vùng) làm khó nhận ra hơn.",
      "Thử hỏi: một người quen biết họ có đoán ra dòng này là ai không."
    ],
    "practicePrompt": {
      "question": "Bảng khách chỉ còn cột: tuổi, phường, nghề. Bạn phân vân có gửi được không. Cách kiểm tra đơn giản nhất là gì?",
      "options": [
        "Đếm xem mỗi tổ hợp tuổi, phường, nghề có bao nhiêu dòng; dòng chỉ một người là rủi ro",
        "Kiểm tra xem tên tệp có chứa họ tên khách không, nếu không thì gửi được",
        "Hỏi từng khách có đồng ý chia sẻ hay không rồi gửi bảng",
        "Đếm tổng số dòng của bảng, nếu trên 1.000 dòng thì luôn an toàn"
      ],
      "correct": 0,
      "explanation": "Đếm số dòng trên mỗi tổ hợp là cách nhanh nhất để thấy dòng nào bị lẻ loi. Tên tệp không liên quan, hỏi từng khách là bước khác chứ không phải kiểm tra việc ghép mảnh, còn tổng số dòng lớn vẫn có thể chứa những tổ hợp chỉ một người."
    },
    "summary": {
      "keyIdea": "Nhận ra một người không cần tên; chỉ cần đủ mảnh ghép cùng chỉ về họ.",
      "formula": "Nhóm nhỏ + nhiều cột ghép = ít người khớp; gộp giá trị cho rộng = nhiều người khớp.",
      "commonMistake": "Xoá cột tên rồi gọi bảng là “ẩn danh”.",
      "action": "Chọn một bảng của bạn, đếm số dòng cho mỗi tổ hợp vài cột, tìm dòng chỉ có một người."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Lấy một bảng bạn hay chia sẻ (khảo sát, danh sách nhân viên, khách hàng). Chọn ba cột như tuổi hoặc năm sinh, khu vực hoặc phòng ban, chức danh. Dùng bộ lọc của Excel hoặc Google Sheets để đếm xem có bao nhiêu tổ hợp chỉ khớp đúng một dòng. Ghi lại con số đó và cách bạn sẽ gộp cột cho bớt lẻ loi.",
      "secondary": "Thử gộp năm sinh thành nhóm 10 năm và đếm lại xem số dòng lẻ loi giảm thế nào."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Một đồng nghiệp hỏi: “Mình xoá cột tên rồi, gửi được chưa?”. Bài này trả lời bằng một thí nghiệm nhỏ: ghép vài mảnh dữ liệu vô hại và xem bao nhiêu người còn lại."
      },
      {
        "type": "feynman",
        "title": "Nhận ra một người đơn giản hơn bạn nghĩ",
        "intro": "Hình dung trò chơi đoán người ở văn phòng: “người đó là nữ, ở phòng kế toán, đeo kính, sinh tháng Tư”. Nghe từng ý thì nhiều người khớp, nhưng thêm vài ý là mọi người cùng đoán ra một cái tên.",
        "columns": [
          "Số mảnh ghép",
          "Trò đoán người",
          "Bảng dữ liệu"
        ],
        "rows": [
          [
            "Một mảnh",
            "“Nữ” - cả nửa công ty khớp",
            "Một cột như giới tính: rất nhiều dòng khớp"
          ],
          [
            "Hai mảnh",
            "“Nữ, kế toán” - còn vài người",
            "Giới tính + phòng: còn vài dòng"
          ],
          [
            "Ba mảnh",
            "“Nữ, kế toán, sinh tháng Tư” - có thể chỉ còn một",
            "Thêm ngày sinh: có thể chỉ một dòng khớp"
          ],
          [
            "Nhóm nhỏ",
            "Công ty 20 người: đoán ra rất nhanh",
            "Bảng nhỏ: mỗi tổ hợp càng hiếm, càng lộ"
          ]
        ],
        "oneLiner": "Mỗi mảnh dữ liệu là một câu gợi ý; càng nhiều gợi ý và càng ít người trong nhóm thì càng dễ đoán ra đúng một người."
      },
      {
        "type": "heading",
        "text": "Khoảnh khắc: bảng khảo sát “ẩn danh” gửi cả công ty"
      },
      {
        "type": "paragraph",
        "text": "Bạn vừa gom câu trả lời khảo sát hài lòng của 40 nhân viên và đã xoá cột họ tên. Sếp nhờ gửi bảng cho cả công ty xem. Bạn thấy nhẹ nhõm vì không còn tên ai. Nhưng bảng còn phòng, chức danh, năm sinh. Đồng nghiệp biết nhau rất rõ."
      },
      {
        "type": "heading",
        "text": "Ghép mảnh: hai thuật ngữ cần nhớ"
      },
      {
        "type": "paragraph",
        "text": "Thuật ngữ đầu tiên là định danh gián tiếp: một mảnh dữ liệu không nhận ra ai nhưng ghép với mảnh khác thì nhận ra. Thuật ngữ thứ hai là nhóm nhỏ: khi một nhóm có ít người thì mỗi tổ hợp mảnh càng hiếm, nên càng dễ chỉ vào một người."
      },
      {
        "type": "flow",
        "title": "Một người bị nhận ra thế nào",
        "steps": [
          {
            "label": "Bảng còn đủ 40 dòng",
            "detail": "Ban đầu không có dòng nào ghi tên. Bạn thấy yên tâm vì không ai đọc ra họ tên."
          },
          {
            "label": "Lọc theo phòng",
            "detail": "Lọc phòng Kế toán: còn 5 dòng. Đồng nghiệp đã thu hẹp từ 40 người xuống 5 người."
          },
          {
            "label": "Lọc thêm chức danh",
            "detail": "Lọc chức danh Trưởng phòng: còn 1 dòng. Ai biết phòng kế toán chỉ có một trưởng phòng là đoán ra ngay."
          },
          {
            "label": "Đọc câu trả lời",
            "detail": "Dòng đó ghi mức hài lòng 2/5 và góp ý về sếp. Người trả lời bị lộ dù không có tên."
          },
          {
            "label": "Hậu quả",
            "detail": "Lần sau người đó, và cả những người khác, không dám trả lời thật nữa. Khảo sát mất giá trị."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Gửi bảng thô",
          "text": "Phòng ban, chức danh, năm sinh đầy đủ, giới tính. Phòng nhỏ thì nhiều dòng chỉ khớp một người, câu trả lời bị đoán ra."
        },
        "right": {
          "label": "Gửi bảng đã gộp",
          "text": "Chỉ hiển thị kết quả theo nhóm đủ lớn (ví dụ từ 5 người trở lên), nhóm tuổi 10 năm, khối thay vì phòng nhỏ. Mỗi ô có nhiều người nên khó chỉ ra ai."
        }
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Đếm số dòng của từng tổ hợp vài cột hay dùng (phòng, chức danh, tuổi).",
          "Bước 2 - Tìm tổ hợp chỉ có một hoặc hai dòng: đó là chỗ dễ lộ.",
          "Bước 3 - Gộp cột cho rộng hơn: năm sinh thành nhóm tuổi, phòng nhỏ thành khối.",
          "Bước 4 - Nếu nhóm vẫn quá nhỏ, chỉ báo cáo tổng chung thay vì từng nhóm."
        ]
      },
      {
        "type": "scenario",
        "title": "Khảo sát hài lòng ở công ty 40 người",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn đã xoá cột họ tên khỏi bảng khảo sát hài lòng của 40 nhân viên. Bảng còn phòng ban, chức danh, năm sinh, giới tính, mức hài lòng. Sếp muốn cả công ty xem để thấy nhân viên nghĩ gì. Phòng pháp chế có 1 người, phòng kế toán 5 người.",
            "choices": [
              {
                "label": "Gửi nguyên bảng vì đã xoá tên, sếp còn khen làm nhanh",
                "next": "bad_raw"
              },
              {
                "label": "Đếm xem tổ hợp nào chỉ có 1-2 dòng trước khi quyết định",
                "next": "s2"
              }
            ]
          },
          "bad_raw": {
            "text": "Ngay chiều hôm đó, mọi người bàn tán dòng “pháp chế, nữ, hài lòng 1/5”. Chị ấy bị hỏi han và mất niềm tin vào khảo sát. Lần sau nhiều người trả lời cho qua chuyện.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bạn thấy: phòng pháp chế 1 người, chức danh Giám đốc 1 người, năm sinh 1990 chỉ có 2 người. Nhiều dòng lẻ loi.",
            "choices": [
              {
                "label": "Gộp: phòng thành khối, năm sinh thành nhóm 10 năm, chỉ báo cáo nhóm từ 5 người trở lên",
                "next": "s3"
              },
              {
                "label": "Chỉ xoá các dòng của người lẻ loi, vì họ dễ bị nhận ra nhất",
                "next": "bad_delete"
              }
            ]
          },
          "bad_delete": {
            "text": "Những người ở nhóm nhỏ bị bỏ khỏi khảo sát, đúng người có ý kiến nhất. Báo cáo lệch, và những người bị loại còn thấy mình bị gạt ra.",
            "ending": "bad"
          },
          "s3": {
            "text": "Sau khi gộp, không còn ô nào dưới 5 người. Phần nhóm nhỏ bạn chỉ đưa vào tổng chung. Bạn viết ghi chú: “Nhóm dưới 5 người không hiển thị riêng”.",
            "choices": [
              {
                "label": "Gửi bảng đã gộp kèm ghi chú nhóm nhỏ không hiển thị riêng",
                "next": "good"
              },
              {
                "label": "Gửi bảng thô kèm bảng gộp, để sếp chọn cái nào cho tiện",
                "next": "bad_both"
              }
            ]
          },
          "bad_both": {
            "text": "Bảng thô đi theo cùng thư, ai mở cũng thấy. Công sức gộp nhóm coi như bỏ: người nhận chỉ cần mở bảng thô là đoán ra ai đã trả lời.",
            "ending": "bad"
          },
          "good": {
            "text": "Cả công ty thấy xu hướng chung, không ai bị chỉ mặt. Lần khảo sát sau, số người trả lời thật thà tăng. Bạn ghi lại quy tắc “nhóm dưới 5 người không hiển thị” cho lần sau.",
            "ending": "good"
          }
        }
      },
      {
        "type": "callout",
        "label": "Tự hỏi trước khi gửi",
        "text": "Hãy tưởng tượng một người quen biết các nhân vật trong bảng đang cầm nó. Họ có đoán được dòng nào là ai không? Nếu câu trả lời là “có thể”, hãy gộp cột hoặc bỏ nhóm nhỏ. Nếu bảng thuộc loại bắt buộc theo quy định, hỏi bộ phận pháp chế."
      },
      {
        "type": "closing",
        "lines": [
          "Bỏ tên chưa đủ: hãy đếm xem mỗi tổ hợp còn bao nhiêu người.",
          "Bài sau: ba câu hỏi trước khi dán tài liệu có tên người vào một công cụ."
        ]
      }
    ]
  },
  {
    "id": 2702,
    "slug": "hoi-truoc-khi-dan-ba-cau-cho-moi-tai-lieu-co-ten-nguoi",
    "title": "Chặng 65, Bài 3: Ba câu hỏi trước khi dán tài liệu có tên người vào công cụ",
    "subtitle": "Cần gì, ai bị nhắc tới, công cụ có được phép không: ba giây trước khi bấm dán.",
    "duration": "8 phút",
    "difficulty": "Dễ",
    "emoji": "🛑",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Khoảnh khắc nguy hiểm nhất là khoảnh khắc bạn bận, deadline gần, và thấy một công cụ có thể làm nhanh giúp. Khi đó không ai đọc lại chính sách. Một thói quen ba câu hỏi ngắn giúp bạn quyết định đúng ngay cả lúc vội, thay vì chỉ nhớ quy định khi đã lỡ dán.",
    "openingQuestion": "Sếp nhờ tóm tắt 15 bản đánh giá nhân viên trước buổi họp lúc 2 giờ chiều. Bạn đang cầm tệp với họ tên, điểm, nhận xét của quản lý, và định dán vào công cụ AI. Bước đầu tiên hợp lý nhất là gì?",
    "openingOptions": [
      "Hỏi bản thân ba câu: cần gì, ai bị nhắc tới, công cụ có được phép không",
      "Dán ngay để kịp giờ, vì tóm tắt xong rồi xoá cuộc trò chuyện đó đi là coi như chưa có gì",
      "Xoá cột điểm rồi dán, vì điểm là thứ duy nhất nhạy cảm trong tệp",
      "Dán từng bản một để AI không thấy toàn bộ tệp cùng lúc"
    ],
    "correctOption": 0,
    "explanation": "Đánh giá nhân viên là dữ liệu về con người cụ thể và khá nhạy cảm. Ba câu hỏi giúp bạn dừng đúng lúc: bạn thực sự cần AI làm gì, có những ai bị nhắc tên trong tài liệu, và công cụ này đã được công ty cho phép cho loại dữ liệu này chưa. Dán rồi xoá không rút lại được việc dữ liệu đã rời đi; xoá một cột không làm phần còn lại hết nhận ra người; chia nhỏ từng bản vẫn là gửi đủ mọi bản ra ngoài.",
    "diagram": [
      {
        "label": "Cần AI làm gì với tài liệu này",
        "arrow": true
      },
      {
        "label": "Ai bị nhắc tới trong tài liệu",
        "arrow": true
      },
      {
        "label": "Công cụ có được phép cho loại này không",
        "arrow": true
      },
      {
        "label": "Dán, làm mờ trước, hoặc làm tay"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Một trợ lý nhân sự dán bảng nhận xét của quản lý về 15 nhân viên vào một ứng dụng AI cá nhân để tóm tắt trước giờ họp. Kết quả tóm tắt rất gọn, nhưng tuần sau phòng IT phát hiện công cụ đó chưa được công ty duyệt. Đây là tình huống giả định, dạng việc rất dễ xảy ra lúc gấp."
    },
    "quiz": [
      {
        "question": "Câu hỏi nào trong ba câu trước khi dán giúp bạn biết có cần làm mờ dữ liệu không?",
        "options": [
          "Tài liệu này nhắc tới những ai, có tên hoặc chi tiết riêng không",
          "Tài liệu này dài bao nhiêu trang khi in ra",
          "Tài liệu này được viết bằng ngôn ngữ nào",
          "Tài liệu này do phòng nào tạo ra đầu tiên"
        ],
        "correct": 0,
        "explanation": "Việc có tên người hay chi tiết riêng quyết định liệu tài liệu có phải dữ liệu cá nhân cần cẩn thận không. Số trang, ngôn ngữ và phòng tạo ra không cho biết người thật nào đang bị nhắc tới."
      },
      {
        "question": "Bạn cần AI giúp tóm tắt ý chính của một email dài chứa tên khách. Điều nào đúng?",
        "options": [
          "Có thể thay tên khách bằng “Khách A” rồi nhờ AI tóm tắt",
          "Bắt buộc phải dán nguyên văn thì AI mới hiểu được email",
          "Bắt buộc phải bỏ việc, vì AI không bao giờ xử lý được tên khách",
          "Có thể dán nguyên văn nếu thêm câu “hãy quên email này sau khi xong”"
        ],
        "correct": 0,
        "explanation": "AI chỉ cần nội dung, không cần biết khách là ai, nên thay tên bằng nhãn chung vẫn giữ nguyên nghĩa. Yêu cầu AI “quên” không bảo đảm gì và không thay việc kiểm tra công cụ có được phép; và không phải lúc nào cũng phải từ bỏ việc dùng AI."
      },
      {
        "question": "Công ty có công cụ AI đã được duyệt cho tài liệu nội bộ, còn bạn đang dùng bản AI miễn phí cá nhân. Nên làm gì?",
        "options": [
          "Dùng công cụ đã được công ty duyệt nếu tài liệu có dữ liệu cá nhân",
          "Dùng bản miễn phí vì nhanh hơn, dù tài liệu có dữ liệu cá nhân của người khác",
          "Dùng cả hai, rồi chọn kết quả nào ngắn hơn để gửi sếp",
          "Dùng bản miễn phí nhưng bấm tắt lịch sử cuộc trò chuyện trước khi dán"
        ],
        "correct": 0,
        "explanation": "Công cụ đã duyệt thường đi kèm cam kết và kiểm soát mà công ty đã xem xét. Tắt lịch sử không cho bạn biết dữ liệu đi đâu; dùng cả hai chỉ làm dữ liệu đi ra hai nơi; và sự tiện lợi không phải lý do hợp lệ."
      },
      {
        "question": "Bạn không chắc một công cụ có được phép dùng cho loại dữ liệu này hay không. Cách xử lý nào hợp lý?",
        "options": [
          "Hỏi bộ phận IT hoặc pháp chế trước, trong lúc đó làm tay",
          "Dán thử một đoạn nhỏ để xem có bị chặn không",
          "Đoán theo cảm giác, vì công cụ nào phổ biến thì chắc đã được duyệt",
          "Bỏ qua, vì thường chẳng ai kiểm tra việc dán vào công cụ"
        ],
        "correct": 0,
        "explanation": "Khi không chắc, người có thẩm quyền trả lời được là IT hoặc pháp chế. Dán thử đã là gửi dữ liệu đi; độ phổ biến không có nghĩa là được duyệt; và việc không ai kiểm tra không làm cho nó đúng."
      },
      {
        "question": "Một đoạn nào sau đây ít rủi ro nhất để dán vào công cụ AI chưa được duyệt?",
        "options": [
          "Dàn ý bài thuyết trình về xu hướng bán lẻ, không có tên ai",
          "Bảng tên khách kèm số điện thoại đã xoá ba chữ số cuối",
          "Email phàn nàn của khách có tên và địa chỉ giao hàng",
          "Biên bản họp nhân sự ghi tên người bị nhắc nhở"
        ],
        "correct": 0,
        "explanation": "Dàn ý chung không nhắc người thật nào nên rủi ro thấp. Số điện thoại xoá ba chữ số vẫn ghép được với tên; email phàn nàn có tên và địa chỉ; biên bản nhân sự ghi người bị nhắc nhở đều là dữ liệu về người thật."
      }
    ],
    "keyTakeaways": [
      "Ba câu hỏi trước khi dán: cần gì, ai bị nhắc tới, công cụ có được phép không.",
      "AI thường chỉ cần nội dung, không cần biết người thật là ai.",
      "Thay tên bằng nhãn chung (Khách A) giữ nguyên nghĩa câu hỏi.",
      "Tắt lịch sử hay dặn “hãy quên” không thay cho việc công ty cho phép công cụ.",
      "Không chắc thì hỏi IT hoặc pháp chế, trong lúc đó làm tay."
    ],
    "practicePrompt": {
      "question": "Bạn cần AI sửa câu chữ một thư phản hồi cho khách tên Lê Văn Bình, ở số 12 đường Trần Phú. Cách làm an toàn nhất là gì?",
      "options": [
        "Thay tên và địa chỉ bằng “Khách A” và “địa chỉ khách”, sửa xong điền lại",
        "Dán nguyên thư, vì AI cần tên thật mới sửa được văn phong",
        "Xoá hẳn phần mở đầu thư rồi dán phần còn lại",
        "Dán nguyên thư nhưng dùng tài khoản cá nhân của đồng nghiệp"
      ],
      "correct": 0,
      "explanation": "Văn phong không phụ thuộc vào tên khách, nên thay bằng nhãn chung là đủ và điền lại sau. Dán nguyên thư đưa tên và địa chỉ thật ra ngoài; xoá phần mở đầu có thể còn sót tên ở chỗ khác trong thư; dùng tài khoản của người khác không làm dữ liệu an toàn hơn."
    },
    "summary": {
      "keyIdea": "Ba câu hỏi ngắn trước khi dán tốt hơn một bản chính sách dài đọc sau khi đã lỡ.",
      "formula": "Cần gì? Ai bị nhắc tới? Công cụ có được phép không? Rồi mới dán, làm mờ, hoặc làm tay.",
      "commonMistake": "Dán trước rồi mới nghĩ, hoặc nghĩ rằng “xoá cuộc trò chuyện” rút lại được.",
      "action": "Viết ba câu hỏi lên một mảnh giấy nhớ dán cạnh màn hình."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chép ba câu hỏi (cần gì, ai bị nhắc tới, công cụ có được phép không) ra một mảnh giấy hoặc ghi chú cạnh màn hình. Rồi lấy ba tài liệu bạn đã hoặc sắp nhờ AI xử lý tuần này và trả lời ba câu cho từng tài liệu. Đánh dấu tài liệu nào cần thay tên bằng nhãn chung. Ngày mai bạn sẽ được hỏi tài liệu nào đổi kết quả.",
      "secondary": "Nếu chưa biết công ty duyệt công cụ AI nào, gửi IT một tin hỏi ngắn và lưu câu trả lời."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Thói quen dán vào ô chat nhanh đến mức ta không nhận ra mình vừa gửi thứ gì. Bài này chỉ dạy một việc: chen ba câu hỏi vào giữa “sao chép” và “dán”."
      },
      {
        "type": "feynman",
        "title": "Ba câu hỏi đơn giản hơn bạn nghĩ",
        "intro": "Hình dung bạn sắp nhờ một người bạn quen xem giúp một tờ giấy. Trước khi đưa, bạn tự hỏi: mình cần bạn làm gì? Trên giấy có thông tin của ai khác không? Và người bạn này có được phép cầm giấy tờ này không?",
        "columns": [
          "Câu hỏi",
          "Trước khi đưa giấy cho bạn",
          "Trước khi dán vào công cụ"
        ],
        "rows": [
          [
            "Cần gì",
            "Mình chỉ nhờ xem chính tả hay nhờ xem cả nội dung?",
            "Mình cần tóm tắt, sửa văn, hay chỉ cần cấu trúc?"
          ],
          [
            "Ai bị nhắc tới",
            "Trên giấy có tên, số của người khác không?",
            "Tài liệu có tên khách, nhân viên, địa chỉ, số liên lạc không?"
          ],
          [
            "Được phép không",
            "Giấy này có phải loại bí mật không cho cầm ra ngoài?",
            "Công cụ này có được công ty duyệt cho loại dữ liệu này không?"
          ],
          [
            "Nếu không chắc",
            "Hỏi người phụ trách trước khi đưa",
            "Hỏi IT hoặc pháp chế, trong lúc đó làm tay"
          ]
        ],
        "oneLiner": "Trước khi dán, hỏi ba câu như trước khi đưa giấy tờ cho người lạ xem: cần gì, có ai bị nhắc tên, có được phép không."
      },
      {
        "type": "heading",
        "text": "Khoảnh khắc: deadline 2 giờ chiều"
      },
      {
        "type": "paragraph",
        "text": "Sếp cần tóm tắt 15 bản đánh giá nhân viên trước buổi họp. Bạn mở tệp và thấy họ tên, điểm, nhận xét. Có ứng dụng AI đang mở sẵn trên tab bên cạnh. Đây đúng là lúc hay dán nhất, và cũng là lúc ba câu hỏi có giá trị nhất."
      },
      {
        "type": "heading",
        "text": "Ba câu hỏi, từng câu một"
      },
      {
        "type": "paragraph",
        "text": "Câu một: cần gì? Nếu chỉ cần sửa văn phong hay đặt tiêu đề thì không cần nội dung thật; bạn có thể thay bằng ví dụ. Câu hai: ai bị nhắc tới? Nếu tài liệu có người thật, cần nghĩ tới việc làm mờ trước. Câu ba: được phép không? Công ty đã duyệt công cụ nào thì dùng công cụ đó cho dữ liệu nội bộ."
      },
      {
        "type": "list",
        "items": [
          "Cần gì: văn phong, cấu trúc, tóm tắt, hay thông tin cụ thể về người?",
          "Ai bị nhắc tới: khách, nhân viên, đối tác; tên, số, địa chỉ hay chi tiết đủ để nhận ra?",
          "Được phép: công cụ đã được công ty duyệt cho loại dữ liệu này chưa?",
          "Không chắc: hỏi IT hoặc pháp chế, trong lúc chờ thì làm tay hoặc dùng ví dụ bịa."
        ]
      },
      {
        "type": "flow",
        "title": "Đi qua ba câu hỏi với bản đánh giá nhân viên",
        "steps": [
          {
            "label": "Cần gì",
            "detail": "Sếp cần biết điểm mạnh yếu chung của cả nhóm, không cần tên từng người. Vậy AI chỉ cần các nhận xét, không cần họ tên."
          },
          {
            "label": "Ai bị nhắc tới",
            "detail": "Tệp có 15 người với họ tên, điểm và nhận xét của quản lý. Đây là dữ liệu về con người cụ thể."
          },
          {
            "label": "Được phép không",
            "detail": "Công cụ bên cạnh là ứng dụng cá nhân, chưa rõ công ty đã duyệt chưa. Bạn chưa chắc."
          },
          {
            "label": "Quyết định",
            "detail": "Bạn thay họ tên bằng “Nhân viên 1, 2, 3…”, bỏ cột chứa thông tin riêng, và hỏi IT công cụ nào được dùng. Trong lúc đó bạn gạch ý chính bằng tay."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Dán trước, nghĩ sau",
          "text": "Nhanh được vài phút, nhưng nếu công cụ chưa duyệt thì dữ liệu nhân viên đã rời công ty và không lấy lại được."
        },
        "right": {
          "label": "Hỏi ba câu trước",
          "text": "Mất thêm ba mươi giây nhưng biết chắc mình gửi cái gì, đi đâu, và có thể dùng nhãn thay tên khi cần."
        }
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Soát ghi chú tự kiểm của một đồng nghiệp",
        "task": "Đồng nghiệp nhờ AI viết bản ghi chú tự kiểm “ba câu hỏi trước khi dán” từ một đoạn mô tả quy trình của bạn. Mô tả chỉ có: ba câu hỏi là cần gì, ai bị nhắc tới, công cụ có được phép không; và khi không chắc thì hỏi IT hoặc pháp chế. Bấm những đoạn AI tự thêm hoặc nói sai.",
        "segments": [
          {
            "text": "Trước khi dán tài liệu có tên người, hãy dừng lại và tự hỏi ba câu."
          },
          {
            "text": "Câu một: mình cần AI làm gì với tài liệu này."
          },
          {
            "text": "Câu hai: tài liệu nhắc tới ai, có tên hay chi tiết riêng không."
          },
          {
            "text": "Nếu đã tắt lịch sử cuộc trò chuyện thì mọi công cụ đều được phép dùng, không cần hỏi ai.",
            "error": "Mô tả không hề nói vậy. Tắt lịch sử không thay cho việc công ty duyệt công cụ; AI đã tự thêm một kết luận sai và nguy hiểm."
          },
          {
            "text": "Câu ba: công cụ này có được công ty cho phép dùng với loại dữ liệu này không."
          },
          {
            "text": "Theo quy định, dán dữ liệu khách vào công cụ chưa duyệt sẽ bị phạt tối thiểu 50 triệu đồng.",
            "error": "Mô tả không nhắc mức phạt nào. AI tự bịa con số cụ thể; quy định và mức xử lý phải hỏi bộ phận pháp chế."
          },
          {
            "text": "Khi không chắc, hỏi IT hoặc pháp chế trước khi dán."
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Bản đánh giá nhân viên lúc 1 giờ chiều",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "12 giờ 50, sếp nhắn: “Em tóm tắt giúp anh 15 bản đánh giá nhân viên này trước 2 giờ.” Bạn có tệp và hai công cụ: một ứng dụng AI cá nhân bạn hay dùng, và công cụ AI công ty đã duyệt mà bạn chưa quen.",
            "choices": [
              {
                "label": "Dán cả tệp vào ứng dụng cá nhân cho nhanh, bạn thạo nó hơn",
                "next": "bad_paste"
              },
              {
                "label": "Dừng lại, tự hỏi ba câu trước khi chọn công cụ",
                "next": "s2"
              }
            ]
          },
          "bad_paste": {
            "text": "Bản tóm tắt ra rất nhanh. Nhưng 15 bản đánh giá với tên thật, điểm và nhận xét nhạy cảm vừa vào một hệ thống công ty không kiểm soát. Hôm sau IT phát hiện và yêu cầu báo cáo sự việc.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bạn thấy: sếp chỉ cần điểm mạnh yếu chung; tệp có tên 15 người; ứng dụng cá nhân chưa được công ty duyệt. Còn 50 phút.",
            "choices": [
              {
                "label": "Đổi tên thành Nhân viên 1-15, dùng công cụ công ty đã duyệt để tóm tắt",
                "next": "good"
              },
              {
                "label": "Gửi sếp nguyên tệp và bảo sếp tự xem, vì AI là rủi ro",
                "next": "bad_refuse"
              }
            ]
          },
          "bad_refuse": {
            "text": "Sếp mất cả giờ đọc 15 bản dài, vào họp muộn và không có tóm tắt. Bạn tránh được rủi ro nhưng bỏ luôn việc mình có thể làm an toàn.",
            "ending": "bad"
          },
          "good": {
            "text": "Bản tóm tắt ra trong vài phút, không một tên thật nào rời công ty. Bạn ghi vào ghi chú: nhãn “Nhân viên 1-15” lưu ở bảng riêng trong máy, không gửi đi đâu.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Trước khi dán: cần gì, ai bị nhắc tới, công cụ có được phép không.",
          "Bài sau: các nguyên tắc chung gói gọn trên một trang."
        ]
      }
    ]
  },
  {
    "id": 2703,
    "slug": "nguyen-tac-chung-tren-mot-trang-thu-gon-dung-muc-dich",
    "title": "Chặng 65, Bài 4: Nguyên tắc chung trên một trang: thu gọn, đúng mục đích, có thời hạn",
    "subtitle": "Ba ý đủ để tự kiểm phần lớn tình huống hằng ngày, và lúc nào thì phải hỏi pháp chế.",
    "duration": "8 phút",
    "difficulty": "Dễ",
    "emoji": "📄",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Bạn không cần thuộc luật để làm việc an toàn hơn. Hầu hết tình huống hằng ngày chạy quanh vài nguyên tắc: thu ít, dùng đúng việc, giữ có thời hạn, cho người ta biết. Nắm được khung này giúp bạn nhận ra lúc nào một việc “hơi lạ” và cần dừng lại hỏi người có chuyên môn.",
    "openingQuestion": "Đồng nghiệp đề nghị thêm cột “ngày sinh” và “địa chỉ nhà” vào biểu mẫu đăng ký nhận bản tin, dù bản tin chỉ gửi qua email. Theo nguyên tắc “thu gọn”, bạn nên nói gì?",
    "openingOptions": [
      "Chỉ thu thứ thật cần cho việc gửi bản tin, tức là email",
      "Cứ thu thật nhiều, vì sau này có thể cần dùng vào việc khác",
      "Thu luôn nhưng không ghi vào đâu, để khách đỡ phải đọc lằng nhằng",
      "Thu nhưng để trống nếu khách không điền, rồi tự suy ra giúp họ"
    ],
    "correctOption": 0,
    "explanation": "Nguyên tắc thu gọn: chỉ thu dữ liệu thật cần cho mục đích đã nói. Bản tin gửi qua email thì cần email, không cần ngày sinh hay địa chỉ nhà. Thu nhiều “phòng khi cần” làm công ty giữ thêm thứ có thể rò rỉ mà không có mục đích rõ; thu mà không ghi rõ thì khách không biết mình đã đưa gì; còn tự suy ra thông tin thay khách là thêm một kiểu thu khác.",
    "diagram": [
      {
        "label": "Thu gọn: chỉ cần thứ thật cần",
        "arrow": true
      },
      {
        "label": "Đúng mục đích: dùng đúng việc đã nói",
        "arrow": true
      },
      {
        "label": "Có thời hạn: giữ vừa đủ rồi xoá",
        "arrow": true
      },
      {
        "label": "Cho người ta biết và có người chịu trách nhiệm"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Một cửa hàng online thu số điện thoại để giao hàng. Ba năm sau, bộ phận marketing dùng chính danh sách đó để nhắn khuyến mãi dù khách chưa được hỏi. Nhiều khách khó chịu và một số đòi xoá số. Đây là tình huống giả định, minh hoạ dạng lệch mục đích quen thuộc."
    },
    "quiz": [
      {
        "question": "Nguyên tắc “thu gọn” nghĩa là gì trong công việc hằng ngày?",
        "options": [
          "Chỉ thu dữ liệu thật cần cho việc đã nói với người cho dữ liệu",
          "Nén tệp dữ liệu cho nhẹ hơn trước khi gửi email",
          "Gộp mọi biểu mẫu thành một biểu mẫu thật dài",
          "Thu đầy đủ mọi thứ rồi chỉ chọn phần hay dùng"
        ],
        "correct": 0,
        "explanation": "Thu gọn là thu ít ngay từ đầu, không phải thu hết rồi bỏ bớt. Nén tệp là chuyện kỹ thuật khác; gộp biểu mẫu thành một cái dài thường làm thu nhiều hơn chứ không ít hơn."
      },
      {
        "question": "Số điện thoại thu để giao hàng, bây giờ muốn nhắn khuyến mãi. Nguyên tắc nào liên quan?",
        "options": [
          "Đúng mục đích: dùng vào việc khác cần xem xét lại",
          "Thu gọn: vì số điện thoại là dữ liệu ít nhất có thể thu",
          "Có thời hạn: vì số điện thoại chỉ được giữ tối đa một ngày",
          "Không nguyên tắc nào, vì khách đã cho số rồi thì dùng việc gì cũng được"
        ],
        "correct": 0,
        "explanation": "Mục đích lúc thu là giao hàng; nhắn khuyến mãi là mục đích khác nên phải cân nhắc, thường cần hỏi thêm người cho dữ liệu hoặc hỏi pháp chế. Không có quy tắc một ngày; và “khách đã cho số” không phải giấy phép dùng vào mọi việc."
      },
      {
        "question": "Một tệp ứng viên từ đợt tuyển năm ngoái vẫn nằm trong máy bạn. Điều gì nên làm?",
        "options": [
          "Xem tệp còn mục đích giữ không, và hỏi chính sách lưu trữ của công ty",
          "Giữ vĩnh viễn, vì dữ liệu càng nhiều thì càng có ích về sau",
          "Xoá ngay không hỏi ai, dù công ty có thể phải giữ theo quy định",
          "Chuyển sang máy cá nhân để khỏi ảnh hưởng ổ đĩa công ty"
        ],
        "correct": 0,
        "explanation": "Có thời hạn nghĩa là giữ khi còn mục đích, hết mục đích thì xem xét xoá, và thời hạn cụ thể do chính sách hoặc pháp chế quyết định. Giữ mãi làm rủi ro tồn tại; xoá không hỏi có thể trái yêu cầu phải lưu; chuyển sang máy cá nhân còn đưa dữ liệu ra ngoài."
      },
      {
        "question": "Bạn muốn nhờ AI tóm tắt nguyên tắc để phổ biến cho nhóm. Điều nào nên đưa vào câu trả lời?",
        "options": [
          "Ghi rõ “quy định cụ thể hỏi bộ phận pháp chế”",
          "Trích dẫn số điều luật đầy đủ để nhóm tin tưởng",
          "Một con số phạt cụ thể để nhóm sợ mà làm đúng",
          "Khẳng định rằng chỉ cần làm theo bài này là đúng luật"
        ],
        "correct": 0,
        "explanation": "AI chỉ nên nói nguyên tắc chung; quy định cụ thể thay đổi và phụ thuộc hoàn cảnh nên phải nhắc hỏi pháp chế. Số điều luật và mức phạt AI dễ bịa, còn khẳng định “đúng luật” là lời hứa không ai kiểm được."
      },
      {
        "question": "Vì sao “giữ thêm phòng khi cần” là thói quen rủi ro với dữ liệu cá nhân?",
        "options": [
          "Giữ càng lâu, càng nhiều thì càng có nhiều thứ có thể lộ mà không có mục đích",
          "Vì máy tính cũ hơn sẽ chạy chậm hơn theo từng tháng",
          "Vì người cho dữ liệu sẽ tự xoá dữ liệu của họ sau một năm",
          "Vì dữ liệu tự hỏng theo thời gian nên không còn dùng được"
        ],
        "correct": 0,
        "explanation": "Dữ liệu không mục đích vẫn có thể rò rỉ, bị nhầm hoặc bị dùng sai, nên giữ thêm chỉ thêm rủi ro. Tốc độ máy không liên quan; người cho dữ liệu không tự xoá hộ bạn; và dữ liệu không tự hỏng theo thời gian."
      }
    ],
    "keyTakeaways": [
      "Thu gọn: chỉ thu thứ thật cần cho việc đã nói.",
      "Đúng mục đích: dùng dữ liệu vào việc khác thì phải xem xét lại.",
      "Có thời hạn: giữ khi còn mục đích, hết thì xem xét xoá.",
      "Cho người ta biết thu gì, để làm gì, giữ bao lâu, liên hệ ai.",
      "Quy định cụ thể: hỏi bộ phận pháp chế, không tin vào số điều luật AI đưa ra."
    ],
    "practicePrompt": {
      "question": "Bộ phận kho thu số CCCD của tài xế giao hàng để “phòng khi cần”, dù việc nhận hàng chỉ cần tên và biển số. Nguyên tắc nào bị vi phạm rõ nhất?",
      "options": [
        "Thu gọn, vì số CCCD không cần cho việc nhận hàng",
        "Có thời hạn, vì tài xế chỉ giao hàng đúng một lần",
        "Đúng mục đích, vì kho được phép dùng CCCD vào mọi việc",
        "Cho người ta biết, vì tài xế đã tự ghi số vào sổ"
      ],
      "correct": 0,
      "explanation": "Việc nhận hàng chỉ cần tên và biển số, nên thu thêm số CCCD là thu thừa. Thời hạn chưa phải vấn đề chính khi chưa biết giữ bao lâu; “được dùng vào mọi việc” là ngược với đúng mục đích; và việc tài xế tự ghi không làm cho mục đích thu hợp lý hơn."
    },
    "summary": {
      "keyIdea": "Bốn ý, nhớ được khi đang vội: thu ít, dùng đúng việc, giữ có hạn, nói rõ cho người ta.",
      "formula": "Thu gọn + đúng mục đích + có thời hạn + cho biết = khung tự kiểm; luật cụ thể thì hỏi pháp chế.",
      "commonMistake": "Tin rằng “thu nhiều phòng khi cần” là chuẩn bị tốt.",
      "action": "Viết bốn ý này lên một trang và dán cạnh bàn làm việc."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Lấy một biểu mẫu hoặc bảng bạn đang dùng để thu thông tin người khác (đăng ký, tuyển dụng, khách hàng). Với mỗi trường, viết một câu: “trường này dùng để làm việc gì”. Gạch những trường không ghi được lý do. Ngày mai bạn sẽ được hỏi bạn đã gạch bao nhiêu trường.",
      "secondary": "Ghi thêm bên cạnh mỗi trường giữ bao lâu, và nếu chưa biết thì ghi “hỏi pháp chế”."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Luật về dữ liệu cá nhân dài và thay đổi theo thời gian, nhưng vài nguyên tắc nền thì khá ổn định. Bài này gói chúng trên một trang, để bạn dùng hằng ngày và biết lúc nào phải nhờ chuyên gia."
      },
      {
        "type": "feynman",
        "title": "Nguyên tắc dữ liệu đơn giản hơn bạn nghĩ",
        "intro": "Hình dung bạn mượn chìa khoá nhà hàng xóm để tưới cây trong tuần họ đi vắng. Bạn chỉ lấy một chìa cần thiết, chỉ vào nhà để tưới cây, trả lại khi họ về, và ai hỏi bạn cũng nói rõ mình giữ chìa làm gì.",
        "columns": [
          "Nguyên tắc",
          "Mượn chìa tưới cây",
          "Dữ liệu cá nhân"
        ],
        "rows": [
          [
            "Thu gọn",
            "Chỉ mượn chìa cổng, không mượn cả chùm",
            "Chỉ thu thứ thật cần cho việc"
          ],
          [
            "Đúng mục đích",
            "Chỉ vào nhà để tưới cây, không xem tủ",
            "Chỉ dùng cho việc đã nói lúc thu"
          ],
          [
            "Có thời hạn",
            "Trả lại khi hàng xóm về",
            "Xoá hoặc xem lại khi hết mục đích"
          ],
          [
            "Nói rõ",
            "Hàng xóm biết chìa ở đâu, bạn dùng thế nào",
            "Người cho dữ liệu biết thu gì, để làm gì, giữ bao lâu"
          ]
        ],
        "oneLiner": "Dữ liệu người khác đưa là chìa khoá nhà họ: lấy ít, dùng đúng việc, trả khi xong, và nói rõ mình giữ làm gì."
      },
      {
        "type": "heading",
        "text": "Khoảnh khắc: một yêu cầu “chỉ thêm một cột”"
      },
      {
        "type": "paragraph",
        "text": "Đồng nghiệp đề nghị thêm cột ngày sinh và địa chỉ nhà vào biểu mẫu nhận bản tin. Lý do: “sau này có thể cần”. Bạn thấy hơi lạ nhưng không có cách diễn đạt cho gọn. Bốn nguyên tắc dưới đây cho bạn câu trả lời trong một nhịp."
      },
      {
        "type": "heading",
        "text": "Bốn nguyên tắc bằng lời thường"
      },
      {
        "type": "paragraph",
        "text": "Thuật ngữ đầu tiên là mục đích: lý do bạn thu dữ liệu, nói ra được bằng một câu. Thuật ngữ thứ hai là thời hạn giữ: khoảng thời gian bạn còn cần dữ liệu đó cho mục đích. Khi không ghi nổi hai thứ này, thường là bạn đang thu thừa hoặc giữ thừa."
      },
      {
        "type": "list",
        "items": [
          "Thu gọn: mỗi trường phải trả lời được “để làm gì”, không thì bỏ.",
          "Đúng mục đích: dữ liệu thu để giao hàng thì dùng để giao hàng; việc khác cần xem xét lại.",
          "Có thời hạn: khi hết việc, xem xét xoá; thời hạn cụ thể theo chính sách hoặc pháp chế.",
          "Nói rõ: người cho dữ liệu nên biết thu gì, để làm gì, giữ bao lâu, hỏi ai."
        ]
      },
      {
        "type": "flow",
        "title": "Áp bốn nguyên tắc vào một biểu mẫu",
        "steps": [
          {
            "label": "Liệt kê trường",
            "detail": "Biểu mẫu hỏi: email, họ tên, ngày sinh, địa chỉ nhà, số điện thoại. Bạn chép từng trường ra."
          },
          {
            "label": "Hỏi “để làm gì”",
            "detail": "Email: để gửi bản tin. Họ tên: để xưng hô. Ngày sinh, địa chỉ nhà, số điện thoại: không ghi nổi lý do cho bản tin."
          },
          {
            "label": "Cắt bớt",
            "detail": "Giữ email và họ tên. Ba trường kia bỏ, hoặc chỉ hỏi khi thực sự có dịch vụ cần."
          },
          {
            "label": "Nói rõ",
            "detail": "Thêm một dòng dưới nút gửi: dùng để gửi bản tin, giữ tới khi bạn huỷ đăng ký, liên hệ theo địa chỉ hỗ trợ."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Thu phòng khi cần",
          "text": "Nhiều trường hơn, mục đích mơ hồ, giữ không hạn. Khi rò rỉ thì lộ nhiều thứ không ai cần tới."
        },
        "right": {
          "label": "Thu theo mục đích",
          "text": "Ít trường, mỗi trường có một lý do, có mốc xem lại. Khi có chuyện thì thiệt hại nhỏ hơn và dễ giải thích."
        }
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI gói nguyên tắc trên một trang",
        "task": "Bạn muốn một tờ hướng dẫn ngắn cho nhóm. Lắp prompt để AI viết đúng nguyên tắc chung mà không bịa số điều luật hay mức phạt.",
        "parts": [
          {
            "id": "context",
            "label": "Bối cảnh",
            "options": [
              {
                "text": "Giải thích luật bảo vệ dữ liệu cá nhân cho nhân viên văn phòng.",
                "feedback": "AI sẽ tự đưa số điều, tên luật, mức phạt có thể sai hoặc lỗi thời."
              },
              {
                "text": "Tôi cần tờ hướng dẫn cho nhân viên văn phòng không học luật: thu ít, dùng đúng việc, giữ có hạn, nói rõ cho người cho dữ liệu.",
                "good": true,
                "feedback": "Bốn ý cần nói đã được nêu sẵn, AI không phải tự chọn nội dung."
              }
            ]
          },
          {
            "id": "limit",
            "label": "Giới hạn",
            "options": [
              {
                "text": "Không nhắc số điều luật hay mức phạt; quy định cụ thể thì ghi “hỏi bộ phận pháp chế”.",
                "good": true,
                "feedback": "AI có lối thoát đúng cho phần mình không biết thay vì bịa."
              },
              {
                "text": "Viết cho đầy đủ và có sức thuyết phục.",
                "feedback": "“Có sức thuyết phục” khiến AI thêm số liệu, trích dẫn để nghe thật."
              }
            ]
          },
          {
            "id": "format",
            "label": "Khuôn",
            "options": [
              {
                "text": "Mỗi nguyên tắc một câu ví dụ đời thường, tổng dưới 150 chữ.",
                "good": true,
                "feedback": "Ví dụ đời thường và giới hạn độ dài giúp tờ hướng dẫn dễ đọc."
              },
              {
                "text": "Viết theo văn bản pháp lý nghiêm túc.",
                "feedback": "Văn pháp lý khiến người đọc không hiểu, và AI dễ đưa ra câu khẳng định vượt quá thứ nó biết."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "context",
              "limit",
              "format"
            ],
            "text": "1. Thu gọn: chỉ hỏi thứ thật cần, như bản tin thì cần email.\n2. Đúng mục đích: số điện thoại thu để giao hàng thì không tự nhắn khuyến mãi.\n3. Có thời hạn: hết việc thì xem xét xoá, thời hạn cụ thể hỏi pháp chế.\n4. Nói rõ: cho người ta biết thu gì, để làm gì, giữ bao lâu.\nQuy định cụ thể: hỏi bộ phận pháp chế."
          },
          {
            "requires": [
              "context"
            ],
            "text": "Nhân viên cần nhớ: thu ít, dùng đúng việc, giữ có hạn và nói rõ. Việc vi phạm có thể bị xử lý theo quy định hiện hành...\n(Đúng ý chính nhưng thiếu ví dụ và không nhắc hỏi pháp chế, nên dễ bị đọc như lời doạ chung chung.)"
          },
          {
            "text": "Theo Điều 14 của luật, mọi tổ chức vi phạm sẽ bị phạt tối đa 5% doanh thu năm trước và bị đình chỉ hoạt động...\n(Số điều, mức phạt và hình thức xử lý đều do AI tự bịa cho nghe chắc chắn.)"
          }
        ]
      },
      {
        "type": "callout",
        "label": "Đường dây nóng với pháp chế",
        "text": "Bạn dùng bốn nguyên tắc để phát hiện việc hơi lạ, không để phán quyết đúng sai theo luật. Khi việc liên quan tới dữ liệu nhạy cảm, dữ liệu trẻ em, chuyển dữ liệu ra nước ngoài hoặc một yêu cầu từ khách muốn xem hay xoá dữ liệu của họ, hãy gửi bộ phận pháp chế."
      },
      {
        "type": "scenario",
        "title": "Thêm hai cột vào biểu mẫu bản tin",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Đồng nghiệp gửi bạn biểu mẫu bản tin với hai cột mới: ngày sinh và địa chỉ nhà. Cô nói “cứ thu, sau dùng sau”. Sáng mai biểu mẫu sẽ đăng lên trang chủ.",
            "choices": [
              {
                "label": "Đồng ý, vì cột nào có thêm cũng không hại gì",
                "next": "bad_keep"
              },
              {
                "label": "Hỏi: mỗi cột này dùng để làm việc gì cho bản tin",
                "next": "s2"
              }
            ]
          },
          "bad_keep": {
            "text": "Hai tháng sau, tệp đăng ký bị gửi nhầm ra ngoài với 3.000 dòng ngày sinh và địa chỉ nhà. Không ai nhớ vì sao công ty thu hai cột đó, và bản tin chưa bao giờ dùng chúng.",
            "ending": "bad"
          },
          "s2": {
            "text": "Đồng nghiệp đáp: “Ngày sinh để tặng quà, địa chỉ để gửi quà sau này.” Hiện chưa có chương trình quà nào.",
            "choices": [
              {
                "label": "Bỏ hai cột, đến khi có chương trình quà sẽ hỏi riêng kèm thông báo rõ ràng",
                "next": "good"
              },
              {
                "label": "Giữ hai cột nhưng để khách tuỳ chọn điền, không ghi mục đích",
                "next": "bad_optional"
              }
            ]
          },
          "bad_optional": {
            "text": "Nhiều khách vẫn điền vì nghĩ là bắt buộc. Không ghi mục đích nên công ty giữ dữ liệu mà không biết dùng thế nào và không nói được với khách.",
            "ending": "bad"
          },
          "good": {
            "text": "Biểu mẫu chỉ còn email và họ tên, kèm một dòng mục đích. Khi chương trình quà bắt đầu, hai trường được hỏi lại riêng, nói rõ dùng để gửi quà và giữ tới cuối chương trình.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Thu ít, dùng đúng việc, giữ có hạn, nói rõ; quy định cụ thể hỏi pháp chế.",
          "Bài sau: vẽ mini bản đồ dữ liệu cá nhân của một quy trình bạn làm."
        ]
      }
    ]
  },
  {
    "id": 2704,
    "slug": "mini-ban-do-du-lieu-ca-nhan-cua-mot-quy-trinh-cua-ban",
    "title": "Chặng 65, Bài 5: Mini: bản đồ dữ liệu cá nhân của một quy trình bạn làm",
    "subtitle": "Dữ liệu vào từ đâu, ai xem, để ở đâu, đi đâu tiếp: năm ô trên một tờ giấy.",
    "duration": "10 phút",
    "difficulty": "Dễ",
    "emoji": "🗺️",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Khi có người hỏi “dữ liệu khách của mình đang nằm ở đâu”, ít ai trả lời được ngay. Một bản đồ đơn giản cho một quy trình, như tiếp nhận đơn hay tuyển dụng, giúp bạn thấy chỗ dữ liệu nằm thừa, chỗ quá nhiều người xem, và chỗ nó đi ra ngoài mà không ai để ý.",
    "openingQuestion": "Quy trình đặt hàng: khách điền form, sale nhận email, kế toán nhập phần mềm, kho in phiếu, một số người lưu tệp vào máy riêng. Khi vẽ bản đồ dữ liệu, bạn nên bắt đầu từ đâu?",
    "openingOptions": [
      "Từ chỗ dữ liệu vào: khách điền gì, rồi theo từng chặng tới nơi nó dừng",
      "Từ phần mềm kế toán, vì đó là nơi dữ liệu quan trọng nhất",
      "Từ tệp lưu trong máy riêng, vì đó là chỗ duy nhất có rủi ro",
      "Từ danh sách người trong công ty, rồi đoán ai đang giữ dữ liệu"
    ],
    "correctOption": 0,
    "explanation": "Bản đồ dữ liệu theo dòng chảy: bắt đầu ở chỗ dữ liệu vào rồi theo từng bước tới nơi nó nằm lại hoặc đi ra ngoài. Nếu bắt đầu từ phần mềm kế toán, bạn bỏ lỡ các bản sao ở email và máy riêng; nếu chỉ nhìn máy riêng, bạn bỏ qua nguồn và các chặng khác; còn đoán theo danh sách người thì dễ thiếu những bản sao không ai kể ra.",
    "diagram": [
      {
        "label": "Dữ liệu vào từ đâu",
        "arrow": true
      },
      {
        "label": "Ai xem và ai sửa",
        "arrow": true
      },
      {
        "label": "Nằm ở đâu, bản sao ở đâu",
        "arrow": true
      },
      {
        "label": "Đi đâu tiếp, xoá khi nào"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Một phòng hành chính lập bản đồ quy trình tiếp nhận hồ sơ xin việc. Họ phát hiện hồ sơ nằm ở năm nơi: hộp thư chung, ổ chung, máy ba người phỏng vấn, một nhóm chat và thùng rác email. Chỉ một nơi có người phụ trách xoá. Đây là tình huống giả định, nhưng kiểu “một tệp nằm năm chỗ” rất hay gặp."
    },
    "quiz": [
      {
        "question": "Bản đồ dữ liệu cá nhân của một quy trình nên trả lời những câu hỏi nào?",
        "options": [
          "Dữ liệu vào từ đâu, ai xem, nằm ở đâu, đi đâu, xoá khi nào",
          "Dữ liệu nặng bao nhiêu, định dạng gì, tên tệp ra sao, ai đặt tên",
          "Công ty có bao nhiêu phòng, mỗi phòng bao nhiêu người, ai là sếp",
          "Phần mềm nào đắt nhất, hãng nào tốt nhất, khi nào nên nâng cấp"
        ],
        "correct": 0,
        "explanation": "Bản đồ theo dòng chảy: vào, xem, nằm, đi, xoá. Dung lượng và tên tệp, cơ cấu phòng ban hay giá phần mềm đều là thông tin khác, không cho biết dữ liệu cá nhân đang đi đâu."
      },
      {
        "question": "Khi vẽ bản đồ, bạn phát hiện một tệp khách nằm ở ba máy cá nhân. Điều gì nên làm đầu tiên?",
        "options": [
          "Ghi chỗ đó vào bản đồ và hỏi vì sao cần bản sao",
          "Xoá ngay cả ba bản sao để gọn, không hỏi ai",
          "Bỏ qua, vì bản sao trong máy cá nhân thì không đáng kể",
          "Gửi email cho cả công ty hỏi ai đã lưu tệp đó"
        ],
        "correct": 0,
        "explanation": "Bước đầu là ghi lại sự thật và hỏi lý do: có thể mỗi người cần để làm việc hoặc chỉ là thói quen. Xoá ngay không hỏi có thể mất dữ liệu đang dùng; bỏ qua để rủi ro nằm đó; và email cả công ty còn lan thêm chi tiết."
      },
      {
        "question": "Quy trình chỉ cần email khách để gửi hoá đơn, nhưng biểu mẫu thu cả ngày sinh. Bản đồ giúp thấy điều gì?",
        "options": [
          "Một trường dữ liệu không có bước nào dùng tới, tức là thu thừa",
          "Một trường đang thiếu nên biểu mẫu chưa đầy đủ",
          "Một trường cần được in to hơn trên phiếu in",
          "Một trường cần chuyển thành ô chọn sẵn để khách đỡ gõ"
        ],
        "correct": 0,
        "explanation": "Nếu dòng chảy không có bước nào dùng ngày sinh thì nó thu thừa. Không thiếu trường nào; kích thước chữ trên phiếu hay kiểu ô chọn là chuyện trình bày chứ không phải mục đích của dữ liệu."
      },
      {
        "question": "Nhóm chat công ty có người nhờ gửi ảnh CCCD của khách để “tiện xử lý”. Nên ghi gì vào bản đồ?",
        "options": [
          "Ghi nhóm chat là một nơi dữ liệu đi ra, và hỏi có cần không",
          "Ghi nhóm chat vào phần “lưu trữ chính thức” vì ai cũng dùng",
          "Không ghi, vì tin nhắn chat tự xoá sau một thời gian",
          "Ghi như một nơi an toàn nhất vì nhóm chỉ có người trong công ty"
        ],
        "correct": 0,
        "explanation": "Nhóm chat là một nơi dữ liệu nằm và lan rộng, nên ghi vào bản đồ và hỏi có cần thật không. Chat không tự xoá, không phải nơi lưu trữ chính thức, và nhiều người trong nhóm vẫn có thể chuyển tiếp ảnh đi."
      },
      {
        "question": "Bản đồ xong, bạn chọn việc làm trước. Việc nào hợp lý nhất?",
        "options": [
          "Bỏ trường thu thừa hoặc bản sao không ai dùng tới",
          "Mua thêm phần mềm quản lý để gom mọi dữ liệu về một chỗ",
          "Vẽ lại bản đồ đẹp hơn rồi in to treo ở phòng họp",
          "Thêm nhiều bước duyệt trước khi ai đó được xem dữ liệu"
        ],
        "correct": 0,
        "explanation": "Bỏ phần thừa là việc rẻ nhất, nhanh nhất và giảm rủi ro ngay. Mua phần mềm là khoản lớn, chưa chắc cần; bản đồ đẹp không đổi được dữ liệu; thêm bước duyệt làm chậm mà không giải quyết việc thu thừa."
      }
    ],
    "keyTakeaways": [
      "Bản đồ dữ liệu là dòng chảy: vào, ai xem, nằm ở đâu, đi đâu, xoá khi nào.",
      "Bắt đầu ở chỗ dữ liệu vào, rồi theo từng chặng.",
      "Bản sao ở máy riêng, nhóm chat và email là chỗ hay bị bỏ sót.",
      "Bản đồ giúp thấy trường thu thừa và chỗ không ai phụ trách xoá.",
      "Việc rẻ nhất sau bản đồ: bỏ trường thừa và bản sao không dùng."
    ],
    "practicePrompt": {
      "question": "Bạn vẽ bản đồ tiếp nhận hồ sơ xin việc và thấy hồ sơ nằm ở 4 nơi, nhưng chỉ 1 nơi có người phụ trách xoá. Bước tiếp theo hợp lý nhất là gì?",
      "options": [
        "Hỏi nơi nào cần giữ bản sao, rồi phân công một người phụ trách xoá cho từng nơi còn lại",
        "Xoá ba nơi còn lại ngay hôm nay để chỉ còn một nơi",
        "Giữ nguyên cả bốn nơi vì công ty chưa có sự cố nào",
        "Gộp cả bốn nơi vào một nhóm chat để ai cũng thấy"
      ],
      "correct": 0,
      "explanation": "Hỏi nơi nào cần và giao người phụ trách giữ lại những gì đang dùng và có người chịu trách nhiệm. Xoá vội có thể mất hồ sơ đang cần; chưa có sự cố không có nghĩa là an toàn; gom vào nhóm chat chỉ làm dữ liệu lan nhanh hơn."
    },
    "summary": {
      "keyIdea": "Một tờ giấy vẽ dòng chảy dữ liệu của một quy trình cho thấy nhiều điều hơn một buổi họp dài.",
      "formula": "Vào → xem → nằm → đi → xoá: năm ô, mỗi ô một câu trả lời.",
      "commonMistake": "Chỉ liệt kê phần mềm chính thức và bỏ quên bản sao trong email, máy riêng, nhóm chat.",
      "action": "Chọn một quy trình bạn làm hằng tuần và vẽ năm ô cho nó."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn một quy trình bạn làm có dữ liệu người khác (nhận đơn, tuyển dụng, chăm sóc khách, chấm công). Trên một tờ giấy vẽ năm ô: dữ liệu vào từ đâu, ai xem, nằm ở đâu (kể cả email, máy riêng, nhóm chat), đi đâu tiếp, xoá khi nào. Đánh dấu một ô mà bạn không trả lời được. Ngày mai bạn sẽ được hỏi ô nào bị bỏ trống.",
      "secondary": "Nếu có ô bạn không biết, hỏi người làm cùng quy trình thay vì đoán."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bạn không cần phần mềm sơ đồ hay chuyên gia để biết dữ liệu cá nhân đang đi đâu trong công việc của mình. Một tờ giấy và năm câu hỏi là đủ cho bước đầu."
      },
      {
        "type": "feynman",
        "title": "Bản đồ dữ liệu đơn giản hơn bạn nghĩ",
        "intro": "Hình dung đường đi của một bưu kiện: người gửi đưa ở bưu cục, qua kho trung chuyển, lên xe tải, tới bưu tá, đến tay người nhận. Bạn biết mỗi chặng ai cầm, cầm bao lâu, và có bản sao phiếu nào ở đâu.",
        "columns": [
          "Bản đồ",
          "Đường đi của bưu kiện",
          "Dữ liệu cá nhân"
        ],
        "rows": [
          [
            "Điểm bắt đầu",
            "Người gửi đưa bưu kiện ở bưu cục",
            "Khách điền form hoặc gửi email"
          ],
          [
            "Ai cầm",
            "Nhân viên kho, tài xế, bưu tá",
            "Sale, kế toán, kho, nhân viên hỗ trợ"
          ],
          [
            "Chỗ nằm lại",
            "Kho trung chuyển và phiếu lưu",
            "Hộp thư, ổ chung, máy riêng, nhóm chat"
          ],
          [
            "Điểm kết thúc",
            "Giao tới người nhận rồi xong việc",
            "Bị xoá khi hết mục đích, hoặc vẫn nằm đó"
          ]
        ],
        "oneLiner": "Dữ liệu cá nhân cũng có hành trình như bưu kiện; vẽ ra hành trình đó là cách nhanh nhất để thấy chỗ nó bị bỏ quên."
      },
      {
        "type": "heading",
        "text": "Khoảnh khắc: “dữ liệu khách đang nằm ở đâu?”"
      },
      {
        "type": "paragraph",
        "text": "Sếp hỏi bạn trong giờ họp: “Thông tin khách đặt hàng của mình đang nằm những đâu?”. Bạn nhớ phần mềm kế toán và hộp thư chung, rồi ngập ngừng. Còn email của sale, tệp in phiếu của kho, và ảnh chụp trong nhóm chat thì sao? Bản đồ trả lời câu này."
      },
      {
        "type": "heading",
        "text": "Năm ô của bản đồ"
      },
      {
        "type": "paragraph",
        "text": "Thuật ngữ đầu tiên là luồng dữ liệu: đường đi của dữ liệu từ chỗ vào tới chỗ kết thúc. Thuật ngữ thứ hai là bản sao: bất kỳ chỗ nào khác cũng đang giữ một phần dữ liệu đó, như email đính kèm hay tệp trong máy riêng."
      },
      {
        "type": "list",
        "items": [
          "Vào: dữ liệu đến từ đâu (form, email, điện thoại, hội chợ).",
          "Xem: ai mở và ai sửa ở mỗi bước.",
          "Nằm: nơi chính thức và mọi bản sao, kể cả email và nhóm chat.",
          "Đi: gửi tiếp cho ai, bên trong hay ngoài công ty.",
          "Xoá: khi nào, ai phụ trách; nếu chưa ai thì ghi “chưa có”."
        ]
      },
      {
        "type": "flow",
        "title": "Vẽ bản đồ cho quy trình đặt hàng",
        "steps": [
          {
            "label": "Vào",
            "detail": "Khách điền biểu mẫu trên web: họ tên, số điện thoại, địa chỉ, sản phẩm. Dữ liệu đến hộp thư bán hàng."
          },
          {
            "label": "Xem",
            "detail": "Sale đọc email, kế toán nhập vào phần mềm, kho nhận phiếu in. Ba nhóm cùng thấy họ tên và địa chỉ."
          },
          {
            "label": "Nằm",
            "detail": "Hộp thư bán hàng, phần mềm kế toán, phiếu in trong kho, và hai sale lưu tệp ở máy riêng. Bốn nơi, hai nơi không ai rà soát."
          },
          {
            "label": "Đi",
            "detail": "Địa chỉ và số điện thoại được gửi cho hãng vận chuyển qua email; một phần vào nhóm chat khi khách gọi giục."
          },
          {
            "label": "Xoá",
            "detail": "Chỉ kế toán có quy tắc lưu; các nơi còn lại chưa ai phụ trách. Ghi ô này là “chưa có”."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Nhớ bằng đầu",
          "text": "“Dữ liệu nằm trong phần mềm.” Bạn quên email, máy riêng, nhóm chat, thùng rác. Khi có câu hỏi, bạn trả lời thiếu."
        },
        "right": {
          "label": "Vẽ ra giấy",
          "text": "Mỗi chặng một ô, có bản sao, có người phụ trách. Thấy ngay chỗ dữ liệu nằm thừa hoặc không ai chịu trách nhiệm."
        }
      },
      {
        "type": "callout",
        "label": "Bản đồ không cần đẹp",
        "text": "Một tờ giấy nhàu với năm hàng là đủ. Điều quan trọng là bạn viết cả những chỗ không chính thức: máy riêng, ảnh chụp, tin nhắn. Những chỗ đó chính là nơi dữ liệu hay rò mà không ai nhìn thấy. Nếu thấy dữ liệu đi ra nước ngoài hoặc tới nhà cung cấp mới, hỏi bộ phận pháp chế."
      },
      {
        "type": "scenario",
        "title": "Vẽ bản đồ quy trình tiếp nhận hồ sơ xin việc",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn được nhờ vẽ bản đồ cho quy trình tuyển dụng. Ứng viên gửi CV qua email; HR in ra cho ba người phỏng vấn; một số người chụp ảnh gửi nhóm chat; kết thúc đợt thì không ai dọn. Bạn mở tờ giấy trắng.",
            "choices": [
              {
                "label": "Chỉ ghi phần mềm tuyển dụng chính thức, vì đó là hệ thống công ty dùng",
                "next": "bad_official"
              },
              {
                "label": "Theo hành trình một CV thực tế, ghi từng chỗ nó đi qua",
                "next": "s2"
              }
            ]
          },
          "bad_official": {
            "text": "Bản đồ gọn đẹp nhưng thiếu ba nơi: email, ảnh trong nhóm chat, bản in trong ngăn kéo. Khi một ứng viên xin xoá hồ sơ, công ty chỉ xoá ở phần mềm, các bản sao còn nguyên.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bạn thấy CV nằm ở sáu nơi: hộp thư HR, phần mềm, bản in, máy ba người phỏng vấn, ảnh trong nhóm chat, thùng rác email. Chỉ phần mềm có quy tắc xoá.",
            "choices": [
              {
                "label": "Ghi đủ sáu nơi, gạch nơi nào thật sự cần, đặt người phụ trách và mốc xoá cho nơi còn lại",
                "next": "good"
              },
              {
                "label": "Xoá ngay năm nơi không chính thức để chỉ còn phần mềm",
                "next": "bad_rush"
              }
            ]
          },
          "bad_rush": {
            "text": "Một người phỏng vấn đang cần bản in để chấm tuần sau và bị mất tài liệu. Phần còn lại của đợt phỏng vấn trễ, và mọi người không muốn tham gia rà soát lần sau.",
            "ending": "bad"
          },
          "good": {
            "text": "Bản đồ có sáu dòng, ba dòng được gạch vì không cần nữa, ba dòng còn lại có tên người phụ trách và mốc xoá sau đợt tuyển. Khi một ứng viên xin xoá hồ sơ, công ty biết chính xác phải xoá ở đâu.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Một tờ giấy năm ô cho thấy dữ liệu đi đâu, nằm đâu, và ai lo xoá.",
          "Bài sau: biểu mẫu đăng ký chỉ hỏi những thứ thật cần."
        ]
      }
    ]
  }
];
