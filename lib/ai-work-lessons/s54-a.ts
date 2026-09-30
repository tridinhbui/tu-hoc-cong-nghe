import type { Lesson } from "../lesson-types";

// Chặng 54, bài 1-5. Giáo trình: scripts/curriculum/stage-54.json.
// Không dựa vào tính năng cụ thể của công cụ nào; chỉ dạy cách giao việc và kiểm kết quả.
export const S54_A_LESSONS: Lesson[] = [
  {
    "id": 2480,
    "slug": "hop-thu-dau-tuan-loc-ra-viec-that",
    "title": "Chặng 54, Bài 1: Sáng thứ Hai 200 email chưa đọc: lọc ra việc thật bằng một câu lệnh",
    "subtitle": "Đọc hết 200 thư là mất cả buổi sáng; đọc 20 tiêu đề đã xếp nhóm thì mất năm phút.",
    "duration": "8 phút",
    "difficulty": "Dễ",
    "emoji": "📬",
    "whyItMatters": "Sau kỳ nghỉ, hộp thư là nơi bạn dễ bỏ sót đúng một thư quan trọng giữa 199 thư khác. Nhờ AI xếp tiêu đề thành ba nhóm giúp bạn thấy việc thật trong vài phút, miễn là bạn biết mình đang đưa gì cho nó và kiểm lại nhóm nào.",
    "openingQuestion": "Sáng thứ Hai bạn có 200 email chưa đọc. Bạn định nhờ AI phân nhóm. Cách làm nào hợp lý nhất?",
    "openingOptions": [
      "Dán 20 tiêu đề đã xoá tên người, nhờ xếp vào ba nhóm: cần làm, chỉ để biết, có thể bỏ",
      "Dán toàn bộ nội dung 200 thư kèm tên và số điện thoại, nhờ AI tự xoá những thư không quan trọng",
      "Nhờ AI đọc hộp thư và tự xoá mọi thư nó thấy không cần, rồi báo lại sau khi xong việc",
      "Chỉ hỏi AI một câu chung \"hôm nay có thư nào quan trọng không\" mà không đưa tiêu đề nào"
    ],
    "correctOption": 0,
    "explanation": "Đưa tiêu đề đã xoá tên người là đủ để AI xếp nhóm, và bạn không phải trao dữ liệu của người khác cho công cụ bên ngoài. Dán cả nội dung thư kèm số điện thoại thì đưa ra ngoài nhiều hơn mức cần. Để AI tự xoá là giao quyền quyết định mà không ai kiểm lại, nên một thư quan trọng có thể biến mất. Hỏi chung chung mà không đưa gì thì AI không có dữ kiện, chỉ đoán cho nghe hợp lý.",
    "diagram": [
      {
        "label": "200 thư chưa đọc",
        "arrow": true
      },
      {
        "label": "Chọn 20 tiêu đề, xoá tên người",
        "arrow": true
      },
      {
        "label": "AI xếp ba nhóm kèm lý do",
        "arrow": true
      },
      {
        "label": "Bạn đọc nhóm Cần làm trước, kiểm nhóm Có thể bỏ"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: chị kế toán tổng hợp đi phép hai tuần",
      "description": "Quay lại, chị có khoảng 200 thư. Thay vì đọc từ trên xuống, chị chọn 20 tiêu đề, xoá tên khách, nhờ AI xếp nhóm rồi tự mở nhóm Cần làm. Chị vẫn liếc qua nhóm Có thể bỏ và thấy một thư nhắc hạn thanh toán bị xếp nhầm, nên kết quả vẫn phải do người soát."
    },
    "quiz": [
      {
        "question": "Vì sao nên xoá tên người khỏi tiêu đề trước khi nhờ AI phân nhóm?",
        "options": [
          "Để không đưa thông tin cá nhân của người khác ra ngoài khi việc xếp nhóm không cần đến nó",
          "Để AI đọc nhanh hơn vì mỗi tên người làm nó mất thêm một bước suy nghĩ riêng",
          "Để AI không biết thư của ai mà xếp nhóm công bằng hơn giữa sếp và đồng nghiệp",
          "Vì AI luôn từ chối mọi tiêu đề có tên người và trả về câu trả lời rỗng"
        ],
        "correct": 0,
        "explanation": "Xếp nhóm chỉ cần nội dung tiêu đề, không cần biết ai gửi. Bớt tên là bớt dữ liệu cá nhân phải chia sẻ. Lý do tốc độ là sai vì tên không làm AI chậm đáng kể; lý do công bằng cũng sai vì AI không cần công bằng giữa người gửi; và AI không từ chối tiêu đề có tên người."
      },
      {
        "question": "Ba nhóm nào là cách chia đơn giản và dễ kiểm nhất cho 20 tiêu đề?",
        "options": [
          "Cần làm, chỉ để biết, có thể bỏ",
          "Quan trọng, rất quan trọng, cực kỳ quan trọng, xếp theo mức độ khẩn",
          "Của sếp, của đồng nghiệp, của khách hàng, xếp theo người gửi thư",
          "Cũ, mới, rất mới, xếp theo giờ thư đến mà không quan tâm nội dung"
        ],
        "correct": 0,
        "explanation": "Ba nhóm theo hành động bạn cần làm cho ra quyết định rõ: làm, đọc lướt, bỏ. Ba mức quan trọng chỉ khác nhau về mức độ, không cho bạn biết làm gì tiếp. Chia theo người gửi thì thư của sếp nhắc mừng sinh nhật cũng vào nhóm đầu. Chia theo giờ đến không nói gì về nội dung."
      },
      {
        "question": "AI xếp thư \"Nhắc hạn thanh toán ngày 5\" vào nhóm Có thể bỏ. Bạn nên làm gì?",
        "options": [
          "Mở thư đó ra đọc và kéo về nhóm Cần làm",
          "Tin AI vì nó đã xếp theo câu lệnh của chính bạn nên kết quả chắc chắn đúng",
          "Kệ nó, vì AI đã xếp theo câu lệnh",
          "Hỏi lại AI cùng câu đó mười lần, thấy lần nào cũng xếp vậy thì mới sửa tay"
        ],
        "correct": 0,
        "explanation": "AI xếp nhóm dựa trên chữ trong tiêu đề, không biết hạn thanh toán của bạn là thật. Nhóm Có thể bỏ luôn phải được liếc qua trước khi xoá. Tin tuyệt đối vì câu lệnh là của bạn là sai, xoá cả nhóm là mất thư hạn, còn hỏi lại nhiều lần chỉ cho câu trả lời giống nhau mà không kiểm được gì."
      },
      {
        "question": "Câu lệnh nào cho AI kết quả dễ dùng nhất?",
        "options": [
          "Xếp 20 tiêu đề dưới đây vào ba nhóm, mỗi dòng ghi số thứ tự, nhóm và lý do trong 8 chữ",
          "Xem giúp tôi tiêu đề nào đáng để ý",
          "Sắp xếp hộp thư thật thông minh và gọn gàng",
          "Đọc 20 tiêu đề rồi viết bài nhận xét về email công ty"
        ],
        "correct": 0,
        "explanation": "Câu lệnh tốt nêu rõ số lượng, số nhóm và hình dạng kết quả (số thứ tự, nhóm, lý do ngắn), nên bạn đối chiếu được từng dòng. \"Đáng để ý\" quá mơ hồ, \"thông minh và gọn gàng\" không đo được, còn yêu cầu viết bài nhận xét là việc khác hẳn, không giúp bạn lọc thư."
      },
      {
        "question": "Nhờ AI ghi lý do ngắn cho mỗi thư xếp nhóm giúp được gì?",
        "options": [
          "Bạn thấy ngay chỗ AI hiểu sai tiêu đề mà không phải mở từng thư",
          "Lý do dài làm AI chắc chắn hơn nên tỷ lệ xếp đúng tăng lên tới gần 100%",
          "Lý do đó chính là bằng chứng cho thấy AI đã đọc được nội dung đầy đủ của thư",
          "Nhờ lý do, bạn không còn phải đọc lại nhóm Có thể bỏ trước khi dọn hộp thư"
        ],
        "correct": 0,
        "explanation": "Lý do ngắn là chỗ để bạn soát: thấy \"vì có chữ khuyến mãi\" mà thư lại là hoá đơn thì biết ngay sai. Nhưng lý do không làm AI đúng hơn, không chứng minh AI đã đọc nội dung (nó chỉ thấy tiêu đề), và nhóm Có thể bỏ vẫn phải liếc qua."
      },
      {
        "question": "Sau khi xếp xong, thứ tự hợp lý để xử lý là gì?",
        "options": [
          "Làm nhóm Cần làm, liếc nhóm Có thể bỏ, đọc nhóm Chỉ để biết khi rảnh",
          "Đọc nhóm Chỉ để biết trước vì nhóm đó thường có nhiều thông tin nhất cho tuần mới",
          "Xoá nhóm Có thể bỏ ngay, sau đó trả lời hết mọi thư còn lại theo thứ tự thời gian",
          "Làm nhóm Có thể bỏ trước cho hộp thư nhẹ đi, để nhóm Cần làm sang ngày hôm sau"
        ],
        "correct": 0,
        "explanation": "Việc thật nằm ở nhóm Cần làm, nên làm trước; nhóm Có thể bỏ phải liếc một lượt rồi mới dọn. Đọc thông tin chung trước làm bạn tốn giờ vàng; xoá không liếc và trả lời theo giờ đến đều bỏ qua mức ưu tiên; để Cần làm sang mai thì chính việc thật bị chậm."
      }
    ],
    "keyTakeaways": [
      "Đưa tiêu đề đã xoá tên người, không đưa cả hộp thư.",
      "Ba nhóm theo hành động: cần làm, chỉ để biết, có thể bỏ.",
      "Yêu cầu AI ghi lý do ngắn để soát nhanh.",
      "Luôn liếc nhóm Có thể bỏ trước khi xoá.",
      "AI xếp nhóm; bạn quyết định việc gì thật."
    ],
    "practicePrompt": {
      "question": "Bạn có 20 tiêu đề, trong đó có \"Hoá đơn tháng 9 chờ xác nhận\". Phản ứng nào đúng nhất khi AI xếp nó vào nhóm Chỉ để biết?",
      "options": [
        "Đọc lại thư, thấy cần xác nhận nên chuyển sang Cần làm",
        "Giữ nguyên vì AI đã xếp theo đúng ba nhóm bạn yêu cầu",
        "Xoá thư vì hoá đơn thường cũng đã có bản trong phần mềm kế toán",
        "Đổi câu lệnh thành bốn nhóm để AI khỏi nhầm ở lần sau"
      ],
      "correct": 0,
      "explanation": "Hoá đơn chờ xác nhận là việc phải làm, nên đúng nhóm là Cần làm. Giữ nguyên là tin AI không kiểm. Xoá thư vì nghĩ có bản khác là đoán mà chưa biết chắc. Thêm nhóm không sửa được việc AI đọc tiêu đề thiếu ngữ cảnh."
    },
    "summary": {
      "keyIdea": "AI xếp nhanh được 20 tiêu đề; bạn mới biết thư nào thật sự là việc của mình.",
      "formula": "Tiêu đề đã xoá tên + ba nhóm + lý do ngắn = bản nháp phân loại để bạn soát.",
      "commonMistake": "Để AI xoá thư hoặc bỏ qua việc liếc nhóm Có thể bỏ.",
      "action": "Chọn 20 tiêu đề thật trong hộp thư, xoá tên người rồi thử."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Mở hộp thư của bạn, chép 20 tiêu đề gần nhất vào một tệp ghi chú, xoá tên người và tên công ty, rồi nhờ AI xếp vào ba nhóm kèm lý do ngắn. Sau đó mở nhóm Có thể bỏ và ghi lại xem AI xếp nhầm mấy thư.",
      "secondary": "Ngày mai bạn sẽ được hỏi: AI xếp nhầm mấy trong 20 thư, và nhầm kiểu gì?"
    },
    "sections": [
      {
        "type": "lead",
        "text": "Sáng thứ Hai sau kỳ nghỉ, màn hình ghi 200 thư chưa đọc và bạn không biết bắt đầu từ đâu. Bài này cho bạn một cách xếp 20 tiêu đề thành ba nhóm trong vài phút, mà không đưa dữ liệu của người khác ra ngoài."
      },
      {
        "type": "feynman",
        "title": "Lọc thư đơn giản hơn bạn nghĩ",
        "intro": "Hãy hình dung bạn đi làm về, thấy một chồng thư giấy trên bàn. Bạn không bóc từng phong bì: bạn lướt qua bì thư, tách ra thư cần trả lời, thư chỉ để biết, và quảng cáo.",
        "columns": [
          "Thành phần",
          "Đời thường",
          "Trong hộp thư"
        ],
        "rows": [
          [
            "Nhìn gì",
            "Bì thư bên ngoài",
            "Tiêu đề email"
          ],
          [
            "Chia mấy nhóm",
            "Cần trả lời, để đọc, bỏ",
            "Cần làm, chỉ để biết, có thể bỏ"
          ],
          [
            "Dễ sai ở đâu",
            "Tưởng hoá đơn là quảng cáo",
            "AI hiểu nhầm tiêu đề thiếu ngữ cảnh"
          ],
          [
            "Ai quyết định",
            "Bạn",
            "Bạn, AI chỉ xếp nháp"
          ]
        ],
        "oneLiner": "AI xếp bì thư giúp bạn, còn mở thư nào và xoá thư nào vẫn là việc của bạn."
      },
      {
        "type": "heading",
        "text": "Vấn đề: 200 thư nhưng chỉ vài thư là việc thật"
      },
      {
        "type": "paragraph",
        "text": "Trong 200 thư sau kỳ nghỉ, thường chỉ một nhúm cần bạn làm gì đó; còn lại là thông báo, bản tin, thư gửi chung. Khó không phải ở việc đọc mà ở việc tìm ra nhúm đó mà không đọc hết."
      },
      {
        "type": "heading",
        "text": "Cách làm: chọn 20, xoá tên, xếp ba nhóm"
      },
      {
        "type": "paragraph",
        "text": "Bạn không cần đưa 200 thư. Chép 20 tiêu đề gần nhất hoặc chưa đọc lâu nhất vào một tệp ghi chú, xoá tên người và tên công ty, rồi nhờ AI xếp nhóm. Hai khái niệm mới ở đây chỉ có hai: tiêu đề (dòng chữ đầu thư) và nhóm theo hành động (xếp theo việc bạn sẽ làm, không theo người gửi)."
      },
      {
        "type": "flow",
        "title": "Từ 200 thư đến danh sách việc thật",
        "steps": [
          {
            "label": "Chọn 20 tiêu đề",
            "detail": "Chép từ hộp thư vào tệp ghi chú, bắt đầu từ thư lâu nhất chưa đọc."
          },
          {
            "label": "Xoá tên người",
            "detail": "Thay tên bằng chữ chung như Khách A hoặc Đồng nghiệp, vì việc xếp nhóm không cần tên."
          },
          {
            "label": "Ra lệnh rõ",
            "detail": "Nêu số tiêu đề, ba nhóm và mỗi dòng ghi số thứ tự, nhóm, lý do ngắn."
          },
          {
            "label": "Soát kết quả",
            "detail": "Mở nhóm Cần làm và liếc nhóm Có thể bỏ để tìm thư bị xếp nhầm."
          },
          {
            "label": "Ghi việc thật",
            "detail": "Chép các việc thật vào danh sách của bạn rồi tiếp tục với 20 tiêu đề kế."
          }
        ]
      },
      {
        "type": "list",
        "items": [
          "Đưa tiêu đề, không đưa cả nội dung thư khi chỉ cần xếp nhóm.",
          "Mỗi dòng kết quả có số thứ tự để đối chiếu với bản gốc.",
          "Lý do ngắn giúp bạn thấy ngay AI hiểu sai chỗ nào.",
          "Làm theo từng lô 20, đừng đợi tới khi làm xong cả 200."
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Giao cho AI",
          "text": "Xếp tiêu đề vào nhóm, gợi ý lý do, rút gọn danh sách để bạn nhìn nhanh hơn."
        },
        "right": {
          "label": "Giữ cho bạn",
          "text": "Quyết định thư nào là việc thật, xoá thư nào, trả lời ai, và soát nhóm Có thể bỏ trước khi dọn."
        }
      },
      {
        "type": "callout",
        "label": "Nhóm Có thể bỏ là nhóm nguy hiểm nhất",
        "text": "AI chỉ thấy tiêu đề. Một thư hạn thanh toán có tiêu đề nghe như quảng cáo vẫn có thể rơi vào đó. Hãy liếc nhóm này trước khi xoá, và không bao giờ cho AI tự xoá."
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Viết câu lệnh để xếp 20 tiêu đề",
        "task": "Bạn đã chép 20 tiêu đề và xoá tên người. Hãy lắp câu lệnh để AI xếp chúng thành ba nhóm.",
        "parts": [
          {
            "id": "data",
            "label": "Dữ liệu đưa vào",
            "options": [
              {
                "text": "Đây là toàn bộ 200 thư của tôi, cả nội dung lẫn tên người gửi.",
                "feedback": "Đưa quá nhiều dữ liệu của người khác ra ngoài, trong khi việc xếp nhóm chỉ cần tiêu đề."
              },
              {
                "text": "Đây là 20 tiêu đề email, tôi đã xoá tên người và tên công ty.",
                "good": true,
                "feedback": "Đủ dữ kiện để xếp nhóm mà không lộ thông tin cá nhân."
              }
            ]
          },
          {
            "id": "task",
            "label": "Việc cần làm",
            "options": [
              {
                "text": "Xếp gọn hộp thư giúp tôi.",
                "feedback": "Mơ hồ: AI có thể tự bịa nhóm khác hoặc khuyên bạn xoá thư."
              },
              {
                "text": "Xếp từng tiêu đề vào ba nhóm: Cần làm, Chỉ để biết, Có thể bỏ.",
                "good": true,
                "feedback": "Nêu rõ số nhóm và tên nhóm, bạn đối chiếu được."
              }
            ]
          },
          {
            "id": "format",
            "label": "Khuôn kết quả",
            "options": [
              {
                "text": "Viết một đoạn nhận xét chung về hộp thư này.",
                "feedback": "Một đoạn văn không cho bạn biết thư số mấy thuộc nhóm nào."
              },
              {
                "text": "Mỗi dòng: số thứ tự, nhóm, lý do tối đa 8 chữ.",
                "good": true,
                "feedback": "Gọn, dễ soát và dễ bắt chỗ hiểu sai."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "data",
              "task",
              "format"
            ],
            "text": "1 | Cần làm | hạn thanh toán trong tiêu đề\n2 | Chỉ để biết | bản tin nội bộ định kỳ\n3 | Có thể bỏ | quảng cáo phần mềm\n4 | Cần làm | yêu cầu xác nhận lịch họp\n...\n(Mỗi dòng có nhóm và lý do ngắn, bạn mở thư số 3 liếc lại cho chắc.)"
          },
          {
            "requires": [
              "task"
            ],
            "text": "Hộp thư của bạn trông khá lộn xộn. Tôi gợi ý phân loại thành nhóm Thư cá nhân, Thư công việc, Thư khác và xoá những thư cũ hơn ba tháng.\n\n(Nhóm tự bịa, không có lý do từng thư, và còn gợi ý xoá.)"
          },
          {
            "text": "Hộp thư có nhiều thư chưa đọc, phần lớn là thư công việc quan trọng từ khách hàng Nguyễn Văn A và công ty ABC...\n\n(Không có dữ kiện nên AI bịa ra tên người và tên công ty.)"
          }
        ]
      },
      {
        "type": "scenario",
        "title": "20 tiêu đề, một thư bị xếp nhầm",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "AI trả về kết quả, nhóm Có thể bỏ có 7 thư. Bạn định dọn hộp thư nhanh để kịp họp lúc 9 giờ.",
            "choices": [
              {
                "label": "Xoá luôn 7 thư vì kết quả đã có lý do trông hợp lý",
                "next": "bad"
              },
              {
                "label": "Liếc 7 tiêu đề trong nhóm Có thể bỏ trước khi xoá",
                "next": "s2"
              }
            ]
          },
          "bad": {
            "text": "Một trong 7 thư là nhắc hạn nộp báo cáo, tiêu đề có chữ khuyến khích nên bị xếp nhầm. Đến thứ Năm bạn mới biết mình quá hạn.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bạn thấy một thư \"Nhắc nộp báo cáo quý trước thứ Tư\" nằm ở nhóm Có thể bỏ.",
            "choices": [
              {
                "label": "Mở thư, chuyển sang Cần làm và ghi việc vào danh sách",
                "next": "good"
              },
              {
                "label": "Kệ, vì mỗi lô chỉ sai một thư là chấp nhận được",
                "next": "bad2"
              }
            ]
          },
          "bad2": {
            "text": "Thư đó chính là việc có hạn thật. Tỷ lệ sai thấp không có nghĩa thư sai là thư nhỏ.",
            "ending": "bad"
          },
          "good": {
            "text": "Bạn nộp đúng hạn, ghi chú thêm: \"AI hay xếp thư nhắc hạn vào Có thể bỏ\", và lần sau thêm câu \"thư có hạn luôn vào Cần làm\" vào câu lệnh.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "AI xếp nhóm nhanh; bạn quyết định việc thật.",
          "Bài sau: nhờ AI viết quy tắc hộp thư, rồi tự đọc từng dòng điều kiện."
        ]
      }
    ],
    "track": "personal",
    "isFundamental": false
  },
  {
    "id": 2481,
    "slug": "quy-tac-hop-thu-tu-cau-noi-thuong",
    "title": "Chặng 54, Bài 2: Viết quy tắc hộp thư bằng câu nói thường rồi kiểm tra từng dòng",
    "subtitle": "Quy tắc hộp thư là một câu \"nếu... thì...\"; chỉ cần đọc kỹ chữ \"nếu\" là tránh được phần lớn rắc rối.",
    "duration": "8 phút",
    "difficulty": "Dễ",
    "emoji": "🗂️",
    "whyItMatters": "Một quy tắc hộp thư chạy âm thầm mỗi ngày. Nếu điều kiện rộng quá, nó chuyển nhầm thư của khách vào thư mục bạn không mở. Biết đọc từng dòng điều kiện giúp bạn tận dụng AI viết quy tắc mà vẫn không mất thư.",
    "openingQuestion": "Bạn nhờ AI viết quy tắc \"thư báo giá đưa vào thư mục Báo giá\". AI trả về điều kiện: tiêu đề có chữ \"giá\". Vấn đề nằm ở đâu?",
    "openingOptions": [
      "Điều kiện quá rộng: thư \"Giá xăng tăng\" hay \"Giảm giá cuối tuần\" cũng bị bắt vào thư mục",
      "Điều kiện quá hẹp: chỉ bắt được thư có đúng một chữ duy nhất nên sẽ bỏ sót nhiều thư trong hộp thư",
      "Điều kiện đúng hoàn toàn vì AI đã viết đúng theo câu bạn mô tả ban đầu của mình",
      "Thư mục Báo giá không thể nhận thư tự động, nên quy tắc này không bao giờ chạy được"
    ],
    "correctOption": 0,
    "explanation": "Chữ \"giá\" nằm trong cả bản tin giá xăng lẫn thư khuyến mãi, nên quy tắc bắt nhầm nhiều thư không liên quan. Nói là quá hẹp thì ngược với thực tế. Nói đúng hoàn toàn chỉ vì đúng theo câu bạn nói là nhầm, vì câu của bạn thiếu ràng buộc: nó không nói gì về người gửi hay cụm từ đầy đủ. Quy tắc chuyển thư vào thư mục là tính năng thông thường nên không phải vấn đề ở đây.",
    "diagram": [
      {
        "label": "Bạn mô tả bằng câu thường",
        "arrow": true
      },
      {
        "label": "AI viết điều kiện nếu... thì...",
        "arrow": true
      },
      {
        "label": "Bạn đọc từng dòng điều kiện",
        "arrow": true
      },
      {
        "label": "Thử trên thư cũ rồi mới bật"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: chị phụ trách mua hàng",
      "description": "Chị nhờ AI viết quy tắc chuyển thư có chữ \"hoá đơn\" vào thư mục Kế toán. Sau một tuần, chị phát hiện thư hỏi \"hoá đơn đã nhận chưa?\" của nhà cung cấp cũng đi vào đó và bị bỏ quên. Chị sửa điều kiện thêm địa chỉ người gửi, rồi thử lại trên 30 thư cũ."
    },
    "quiz": [
      {
        "question": "Một quy tắc hộp thư gồm hai phần nào?",
        "options": [
          "Điều kiện để bắt thư và hành động làm với thư bị bắt",
          "Tiêu đề thư và nội dung thư của email",
          "Người gửi và người nhận, hai thông tin duy nhất hộp thư có thể kiểm tra",
          "Thư mục chứa thư và thùng rác, hai nơi cuối cùng mà mọi thư sẽ đi đến"
        ],
        "correct": 0,
        "explanation": "Quy tắc là \"nếu điều kiện thì hành động\". Tiêu đề, người gửi, thư mục là các thứ có thể xuất hiện TRONG điều kiện hoặc hành động, chứ không phải hai phần của chính quy tắc. Nhớ cấu trúc hai phần giúp bạn đọc điều kiện và hành động riêng."
      },
      {
        "question": "Điều kiện nào ít bắt nhầm nhất cho thư báo giá từ nhà cung cấp quen?",
        "options": [
          "Người gửi là một địa chỉ cụ thể và tiêu đề có cụm \"báo giá\"",
          "Tiêu đề có chữ \"giá\", vì chữ này ngắn và xuất hiện trong mọi thư báo giá",
          "Nội dung thư có chữ \"tiền\"",
          "Thư đến trong giờ hành chính, vì nhà cung cấp chỉ gửi báo giá ban ngày"
        ],
        "correct": 0,
        "explanation": "Kết hợp người gửi cụ thể với một cụm từ đầy đủ thu hẹp phạm vi nhiều nhất. Chữ \"giá\" một mình trùng với bản tin và quảng cáo. Chữ \"tiền\" còn rộng hơn nữa. Giờ gửi không liên quan đến loại thư, nên điều kiện theo giờ bắt sót và nhầm cùng lúc."
      },
      {
        "question": "Bạn thử quy tắc trên 30 thư cũ và nó bắt 12 thư, trong đó 3 thư không phải báo giá. Kết luận nào đúng?",
        "options": [
          "Quy tắc bắt nhầm 3 trên 12 thư, nên cần thu hẹp điều kiện trước khi bật",
          "Quy tắc đạt 75%, nên đã tốt để bật luôn",
          "Quy tắc sai 3 trên 30 thư, tức 10%, là chấp nhận được",
          "Quy tắc không có vấn đề vì 3 thư nhầm đó đằng nào cũng nằm trong thư mục"
        ],
        "correct": 0,
        "explanation": "Đếm đúng mẫu số: 3 nhầm trên 12 thư được bắt là 25%, không phải 10% (phép 3 chia 30 lấy sai mẫu số). Và thư nhầm đi vào thư mục bạn không mở là thư có thể bị bỏ quên, nên \"đa số đúng\" chưa đủ để bật."
      },
      {
        "question": "Vì sao nên yêu cầu AI chỉ đọc lại điều kiện bằng lời thường sau khi viết xong?",
        "options": [
          "Để bạn so câu mô tả của AI với ý mình, phát hiện điều kiện rộng hoặc hẹp quá",
          "Để AI nhớ kỹ quy tắc hơn cho lần sau",
          "Để bản quy tắc dài hơn, vì hộp thư chỉ nhận quy tắc khi đủ một số dòng nhất định",
          "Để tránh phải thử trên thư cũ, vì đọc lại bằng lời đã đủ chứng minh quy tắc đúng"
        ],
        "correct": 0,
        "explanation": "Bản đọc lại bằng lời là chỗ bạn bắt sai nhanh nhất: thấy \"mọi thư có chữ giá\" là biết ngay quá rộng. AI không nhớ quy tắc sang lần sau trừ khi bạn dán lại. Độ dài quy tắc không quan trọng. Và đọc lại không thay được việc thử trên thư cũ."
      },
      {
        "question": "Hành động nào an toàn nhất cho một quy tắc bạn chưa thử kỹ?",
        "options": [
          "Gắn nhãn và chuyển vào thư mục, để thư vẫn còn trong tầm tìm lại",
          "Xoá luôn thư, vì hộp thư nào cũng có thùng rác để khôi phục trong vài tuần",
          "Đánh dấu đã đọc cho sạch hộp thư",
          "Chuyển tiếp sang email cá nhân, vì như vậy có hai bản của cùng một lá thư"
        ],
        "correct": 0,
        "explanation": "Gắn nhãn hoặc chuyển thư mục không làm mất gì: bạn vẫn tìm lại được khi quy tắc sai. Xoá dựa vào thùng rác là rủi ro, vì thùng rác có giới hạn thời gian. Đánh dấu đã đọc làm thư quan trọng biến mất khỏi mắt. Chuyển tiếp email cá nhân còn đẩy dữ liệu công việc ra ngoài."
      },
      {
        "question": "Điều kiện \"tiêu đề có chữ hoá đơn HOẶC nội dung có chữ thanh toán\" khác gì với \"VÀ\"?",
        "options": [
          "Với HOẶC, chỉ cần một vế đúng là thư bị bắt, nên phạm vi rộng hơn rất nhiều",
          "Với HOẶC, phải đúng cả hai vế mới bị bắt, nên phạm vi hẹp hơn so với VÀ",
          "Hai cách đó bắt đúng cùng những thư, chỉ khác chữ viết trong giao diện",
          "HOẶC chỉ dùng cho người gửi, còn VÀ mới dùng được cho nội dung thư"
        ],
        "correct": 0,
        "explanation": "HOẶC mở rộng (một vế đúng là đủ) còn VÀ thu hẹp (phải đúng cả hai). Nhầm hai chữ này là lỗi rất thường gặp khi đọc điều kiện AI viết. Hai cách bắt các tập thư khác nhau, và cả hai đều dùng được cho mọi trường của thư."
      }
    ],
    "keyTakeaways": [
      "Quy tắc = điều kiện + hành động.",
      "Điều kiện rộng bắt nhầm, điều kiện hẹp bỏ sót.",
      "Đọc lại điều kiện bằng lời thường rồi thử trên thư cũ.",
      "Mới thử thì gắn nhãn, không xoá.",
      "Chú ý chữ HOẶC và VÀ."
    ],
    "practicePrompt": {
      "question": "Bạn muốn chuyển thư của khách tên Hùng vào thư mục Khách VIP. Điều kiện nào an toàn hơn?",
      "options": [
        "Địa chỉ người gửi đúng bằng địa chỉ email của anh Hùng",
        "Tiêu đề hoặc nội dung thư có chữ Hùng ở bất kỳ vị trí nào, kể cả nhắc tên",
        "Tên hiển thị của người gửi có chứa chữ H",
        "Thư đến từ cùng tên miền công ty với anh Hùng"
      ],
      "correct": 0,
      "explanation": "Địa chỉ email là định danh duy nhất. Chữ Hùng trong nội dung sẽ bắt cả thư nhắc tên anh Hùng. Chữ H bắt vô số người. Cả tên miền thì bắt đồng nghiệp khác của anh Hùng chứ không chỉ anh."
    },
    "summary": {
      "keyIdea": "AI viết điều kiện giúp bạn, nhưng bạn đọc từng dòng để biết nó bắt gì.",
      "formula": "Mô tả → điều kiện → đọc lại bằng lời → thử trên 30 thư cũ → mới bật.",
      "commonMistake": "Tin điều kiện vì nó trông đúng theo câu mô tả của mình.",
      "action": "Viết một quy tắc, thử trên 30 thư cũ, đếm thư bắt nhầm."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn một loại thư bạn hay phải kéo tay vào thư mục (báo giá, hoá đơn, lịch họp). Mô tả bằng câu thường, nhờ AI viết điều kiện, rồi chọn 30 thư cũ và đếm có bao nhiêu thư điều kiện đó bắt đúng, bắt nhầm, và bỏ sót.",
      "secondary": "Ngày mai bạn sẽ được hỏi: điều kiện bắt nhầm mấy thư và bạn thu hẹp nó thế nào?"
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bạn mô tả bằng câu thường, AI viết thành quy tắc hộp thư. Nghe gọn, nhưng quy tắc sẽ chạy mà không ai nhìn. Bài này dạy bạn đọc từng dòng điều kiện để chắc rằng nó không bắt nhầm."
      },
      {
        "type": "feynman",
        "title": "Quy tắc hộp thư đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới người gác cổng khu nhà được dặn: \"Ai mang thùng hàng của công ty vận chuyển thì chỉ lối vào kho\". Nếu dặn mơ hồ, người gác cổng sẽ chỉ nhầm cả người đi giao bánh.",
        "columns": [
          "Thành phần",
          "Đời thường",
          "Trong hộp thư"
        ],
        "rows": [
          [
            "Lời dặn",
            "Thùng hàng của công ty vận chuyển",
            "Điều kiện của quy tắc"
          ],
          [
            "Việc làm",
            "Chỉ lối vào kho",
            "Chuyển vào thư mục"
          ],
          [
            "Dặn mơ hồ thì",
            "Chỉ nhầm cả người giao bánh",
            "Bắt nhầm thư không liên quan"
          ],
          [
            "Cách kiểm",
            "Quan sát người vào trong một buổi",
            "Thử trên 30 thư cũ"
          ]
        ],
        "oneLiner": "Quy tắc hộp thư là người gác cổng làm đúng từng chữ bạn dặn, không hơn."
      },
      {
        "type": "heading",
        "text": "Vấn đề: quy tắc chạy âm thầm"
      },
      {
        "type": "paragraph",
        "text": "Một quy tắc sai không báo lỗi. Nó chỉ làm một thư khách hàng không bao giờ xuất hiện ở nơi bạn nhìn, và bạn chỉ biết khi khách gọi điện hỏi."
      },
      {
        "type": "heading",
        "text": "Đọc điều kiện như đọc hợp đồng: từng chữ một"
      },
      {
        "type": "paragraph",
        "text": "Hai từ mới cần nhớ: điều kiện (phần \"nếu\") và hành động (phần \"thì\"). Điều kiện càng rộng càng bắt nhầm, càng hẹp càng bỏ sót. Mục tiêu là hẹp vừa đủ: người gửi cụ thể cộng cụm từ đầy đủ."
      },
      {
        "type": "flow",
        "title": "Từ câu nói thường đến quy tắc an toàn",
        "steps": [
          {
            "label": "Mô tả",
            "detail": "Viết một câu: thư nào, vào đâu."
          },
          {
            "label": "AI viết điều kiện",
            "detail": "Yêu cầu AI in điều kiện theo từng dòng."
          },
          {
            "label": "Đọc bằng lời",
            "detail": "Nhờ AI đọc lại điều kiện bằng câu thường và so với ý bạn."
          },
          {
            "label": "Thử 30 thư cũ",
            "detail": "Đếm thư bắt đúng, bắt nhầm, bỏ sót."
          },
          {
            "label": "Bật với hành động nhẹ",
            "detail": "Gắn nhãn hoặc chuyển thư mục, chưa xoá."
          }
        ]
      },
      {
        "type": "list",
        "items": [
          "Điều kiện có chữ đơn lẻ (như \"giá\") thì nghi ngờ quá rộng.",
          "Đọc kỹ HOẶC và VÀ: HOẶC mở rộng, VÀ thu hẹp.",
          "Ưu tiên người gửi cụ thể làm điều kiện chính.",
          "Quy tắc mới chỉ gắn nhãn, chưa xoá thư."
        ]
      },
      {
        "type": "callout",
        "label": "Rủi ro: quy tắc im lặng",
        "text": "Quy tắc hộp thư không báo khi bắt nhầm. Dành năm phút thử trên thư cũ trước khi bật, và sau một tuần mở thư mục để kiểm có thư nào không thuộc về đó."
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Soát điều kiện AI viết cho quy tắc Báo giá",
        "task": "Bạn nhờ AI viết quy tắc \"chuyển thư báo giá của nhà cung cấp Sao Mai vào thư mục Báo giá\". Đây là bản AI trả về kèm lời giải thích. Đánh dấu những dòng có vấn đề.",
        "segments": [
          {
            "text": "Quy tắc: Nếu người gửi có địa chỉ kết thúc bằng @saomai.example thì tiếp tục xét điều kiện sau."
          },
          {
            "text": "Điều kiện 2: tiêu đề có chữ \"giá\" HOẶC nội dung thư có chữ \"tiền\".",
            "error": "Chữ \"giá\" và \"tiền\" là từ đơn lẻ; nối bằng HOẶC làm quy tắc bắt cả thư hỏi tiền ship hay tin khuyến mãi, không chỉ báo giá."
          },
          {
            "text": "Hành động: chuyển vào thư mục Báo giá và gắn nhãn xanh."
          },
          {
            "text": "Lưu ý: quy tắc đã được thử trên 500 thư của bạn và không bắt nhầm thư nào.",
            "error": "AI không thể thử trên hộp thư của bạn, và bạn cũng chưa đưa thư nào cho nó. Đây là câu bịa để bạn yên tâm."
          },
          {
            "text": "Quy tắc áp dụng cho cả thư bạn gửi đi mà người nhận là Sao Mai.",
            "error": "Bạn chỉ yêu cầu thư nhà cung cấp gửi tới; thêm phạm vi thư gửi đi là AI tự thêm điều kiện bạn không hỏi."
          },
          {
            "text": "Nên thử quy tắc trên khoảng 30 thư cũ trước khi bật."
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Quy tắc hoá đơn bắt nhầm",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Sau một tuần, thư mục Kế toán có 40 thư, nhưng bạn nhận ra một thư hỏi \"hoá đơn đã nhận chưa\" của nhà cung cấp nằm đó và chưa ai trả lời.",
            "choices": [
              {
                "label": "Xoá quy tắc đi, tự kéo thư bằng tay như cũ",
                "next": "bad"
              },
              {
                "label": "Thêm điều kiện người gửi, thử lại trên 30 thư cũ rồi bật lại",
                "next": "good"
              }
            ]
          },
          "bad": {
            "text": "Bạn mất thời gian kéo tay mỗi ngày và quay lại cảnh hộp thư lộn xộn. Vấn đề chỉ là điều kiện rộng, không phải chuyện dùng quy tắc.",
            "ending": "bad"
          },
          "good": {
            "text": "Điều kiện mới chỉ bắt thư từ phòng kế toán của nhà cung cấp có tiêu đề chứa cụm đầy đủ. Bạn đếm 30 thư cũ, không còn nhầm, và ghi lại lý do sửa.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Quy tắc tốt: điều kiện hẹp vừa đủ, hành động nhẹ, đã thử trên thư cũ.",
          "Bài sau: chọn ba nhãn màu đủ cho cả tuần."
        ]
      }
    ],
    "track": "personal",
    "isFundamental": false
  },
  {
    "id": 2482,
    "slug": "nhan-mau-cho-email-de-nhin-la-biet",
    "title": "Chặng 54, Bài 3: Ba màu nhãn đủ cho cả tuần làm việc",
    "subtitle": "Quá nhiều nhãn thì bạn không dùng nhãn nào; ba nhãn thì nhìn qua là biết.",
    "duration": "8 phút",
    "difficulty": "Dễ",
    "emoji": "🏷️",
    "whyItMatters": "Nhiều người lập mười mấy nhãn rồi bỏ dở vì không nhớ nhãn nào để làm gì. Ba nhãn theo hành động cho bạn biết việc gì cần làm ngay, việc gì đang chờ người khác và việc gì để sau, mà không cần nghĩ lúc mở hộp thư.",
    "openingQuestion": "Bạn muốn gắn nhãn cho hộp thư để nhìn qua là biết việc gì cần làm. Bộ nhãn nào dùng bền nhất?",
    "openingOptions": [
      "Ba nhãn theo hành động: Gấp, Chờ người khác, Đọc sau",
      "Mười hai nhãn theo từng khách hàng và từng dự án, mỗi nhãn một màu riêng",
      "Năm nhãn theo cảm xúc của bạn khi đọc thư: vui, lo, bực, tò mò, chán",
      "Một nhãn duy nhất \"Quan trọng\" gắn cho mọi thư bạn thấy cần để ý sau này"
    ],
    "correctOption": 0,
    "explanation": "Nhãn theo hành động trả lời thẳng câu hỏi khi mở hộp thư: làm gì bây giờ. Mười hai nhãn theo khách thì bạn phải nhớ bảng màu nên sớm bỏ. Nhãn theo cảm xúc thay đổi theo ngày và không gợi việc. Một nhãn Quan trọng dần phủ hết hộp thư vì thư nào cũng thấy quan trọng.",
    "diagram": [
      {
        "label": "Chọn ba nhãn theo hành động",
        "arrow": true
      },
      {
        "label": "AI gợi ý từ khoá tiêu đề",
        "arrow": true
      },
      {
        "label": "Bạn thử trên thư cũ, sửa từ khoá",
        "arrow": true
      },
      {
        "label": "Gắn nhãn tự động, nhìn qua là biết"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: anh quản lý kho",
      "description": "Anh đặt ba nhãn: Gấp (đỏ), Chờ người khác (vàng), Đọc sau (xám). Nhờ AI gợi ý từ khoá như \"hết hàng\", \"đã gửi yêu cầu\", \"bản tin\" rồi tự thử trên 30 thư cũ. Thư \"Báo cáo hết hàng tuần\" bị gắn Gấp nhầm, anh sửa từ khoá rồi chạy lại."
    },
    "quiz": [
      {
        "question": "Vì sao nhãn \"Chờ người khác\" hữu ích?",
        "options": [
          "Nó nhắc bạn theo dõi việc đã giao đi mà bạn chưa nhận lại kết quả",
          "Nó làm thư biến khỏi hộp thư chính để bạn không bị làm phiền cho tới khi cần",
          "Nó báo cho người kia biết bạn đang chờ, nên họ trả lời nhanh hơn rất nhiều",
          "Nó thay cho thư nhắc vì tự gửi lời nhắc"
        ],
        "correct": 0,
        "explanation": "Nhãn chỉ nằm trong hộp thư của bạn, để bạn nhớ mình còn đang chờ ai. Nó không làm thư biến mất, không gửi gì cho người khác và không thay cho thư nhắc khi họ im lặng."
      },
      {
        "question": "AI gợi ý từ khoá \"gấp\" cho nhãn Gấp. Điểm yếu của từ khoá này là gì?",
        "options": [
          "Người gửi thư quảng cáo cũng hay viết \"gấp\" để gây chú ý, nên nhãn bị nhiễu",
          "Từ \"gấp\" quá dài nên hộp thư không đọc được như một từ khoá để so khớp",
          "Từ \"gấp\" chỉ dùng được với tiếng Anh, nên hộp thư tiếng Việt bỏ qua nó",
          "Từ \"gấp\" khiến AI từ chối viết quy tắc vì nó được coi là từ nhạy cảm"
        ],
        "correct": 0,
        "explanation": "Từ khoá ngắn và phổ biến thường trùng với thư không liên quan: quảng cáo hay dùng \"gấp\", \"cuối cùng\". Nên kết hợp với người gửi. Độ dài không phải vấn đề, hộp thư so khớp được tiếng Việt, và AI không từ chối."
      },
      {
        "question": "Tuần qua bạn gắn nhãn Gấp cho 48 thư trên tổng 60 thư. Điều này nói lên gì?",
        "options": [
          "Nhãn Gấp quá rộng: 48 trên 60 là 80% số thư, nên nhãn không còn phân biệt được",
          "Bạn rất bận nên 80% thư là việc gấp thật và nhãn đang hoạt động tốt",
          "Nhãn Gấp tốt vì 48 thư là con số nhỏ hơn 60, tức phần lớn thư đã được gắn nhãn",
          "Nhãn hoạt động ổn, chỉ cần thêm một nhãn Rất gấp để phân biệt thêm một tầng nữa"
        ],
        "correct": 0,
        "explanation": "48 chia 60 là 0,8, tức 80%: nhãn dùng cho gần hết thư thì không phân biệt được gì. Cách sửa là thu hẹp điều kiện để Gấp chỉ còn vài thư mỗi ngày, không phải thêm tầng Rất gấp."
      },
      {
        "question": "Bạn nên nhờ AI gợi ý gì để gắn nhãn tự động?",
        "options": [
          "Năm từ khoá tiêu đề cho mỗi nhãn, kèm ví dụ thư có thể bị bắt nhầm",
          "Một bộ nhãn mới để thay cả ba nhãn đã chọn",
          "Danh sách thư nào trong hộp thư thật của bạn là Gấp, mà không đưa thư nào vào",
          "Câu trả lời duy nhất đúng cho từ khoá, vì AI luôn biết từ khoá tối ưu nhất"
        ],
        "correct": 0,
        "explanation": "Gợi ý từ khoá kèm ví dụ bắt nhầm cho bạn chỗ để kiểm. AI không thể biết thư thật của bạn nếu bạn chưa đưa, và không có từ khoá tối ưu chung cho mọi công việc. Đổi bộ nhãn làm bạn mất công chọn."
      },
      {
        "question": "Khi nào nên gỡ nhãn Đọc sau khỏi một thư?",
        "options": [
          "Khi bạn đã đọc, hoặc đã quyết bỏ, để nhãn chỉ chứa thư còn lại thật",
          "Khi thư nằm quá một ngày, vì để lâu nghĩa là thư đó đã hết giá trị",
          "Không bao giờ gỡ, vì nhãn là lịch sử để tra cứu thư trong những năm sau",
          "Khi có thư mới tới, vì mỗi nhãn chỉ chứa được một số thư cố định nhất định"
        ],
        "correct": 0,
        "explanation": "Nhãn chỉ có ích khi phản ánh việc còn lại. Gỡ khi đã đọc hoặc bỏ. Thư để lâu vẫn có thể quan trọng, nhãn không phải kho lịch sử (đã có lưu trữ), và nhãn không có giới hạn số thư."
      },
      {
        "question": "Điều nào sau đây đúng về màu nhãn?",
        "options": [
          "Ba màu khác nhau rõ, như đỏ, vàng, xám, giúp nhìn danh sách là biết việc",
          "Nên dùng mười màu khác nhau để mỗi khách hàng có một màu riêng dễ nhớ và dễ tìm lại",
          "Màu không quan trọng vì AI sẽ tự biết thư nào gấp mà không cần nhìn màu",
          "Màu giống nhau cho mọi nhãn giúp hộp thư trông đồng bộ và chuyên nghiệp"
        ],
        "correct": 0,
        "explanation": "Ba màu tương phản là đủ để mắt phân biệt trong một giây. Mười màu vượt quá khả năng nhớ. AI không nhìn màu của bạn, và màu giống nhau thì mất luôn công dụng của nhãn."
      }
    ],
    "keyTakeaways": [
      "Ba nhãn theo hành động là đủ.",
      "Nhãn tốt phân biệt được: không gắn cho 80% thư.",
      "Từ khoá ngắn dễ bắt nhầm, kết hợp với người gửi.",
      "Gỡ nhãn khi việc đã xong.",
      "Thử gợi ý của AI trên thư cũ."
    ],
    "practicePrompt": {
      "question": "Bạn có thư từ khách ghi \"Xin chờ duyệt đơn\". Nhãn nào hợp nhất?",
      "options": [
        "Chờ người khác, vì việc nằm ở phía họ hoặc bộ phận duyệt",
        "Gấp, vì chữ duyệt thường đi với việc cần làm ngay bây giờ",
        "Đọc sau, vì thư chỉ thông tin và bạn không cần làm gì thêm",
        "Không gắn nhãn, vì nhãn chỉ dành cho thư của sếp và đồng nghiệp"
      ],
      "correct": 0,
      "explanation": "Khi việc đang chờ người khác duyệt, nhãn đúng là Chờ người khác. Gắn Gấp làm nhãn đầy lên. Đọc sau làm bạn quên theo dõi. Nhãn không chỉ dành cho thư nội bộ."
    },
    "summary": {
      "keyIdea": "Ba nhãn theo hành động cho bạn biết làm gì khi mở hộp thư.",
      "formula": "Gấp + Chờ người khác + Đọc sau, mỗi nhãn một màu, điều kiện hẹp.",
      "commonMistake": "Gắn nhãn quá nhiều hoặc dùng từ khoá quá rộng.",
      "action": "Thử từ khoá trên 30 thư cũ."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Tạo ba nhãn Gấp, Chờ người khác, Đọc sau trong hộp thư của bạn. Nhờ AI gợi ý năm từ khoá cho mỗi nhãn, rồi tìm từng từ khoá trong 30 thư cũ và ghi lại từ khoá nào bắt nhầm.",
      "secondary": "Ngày mai bạn sẽ được hỏi: từ khoá nào bắt nhầm nhiều nhất và bạn đã đổi thành gì?"
    },
    "sections": [
      {
        "type": "lead",
        "text": "Nhiều người lập mười mấy nhãn rồi bỏ. Bài này chỉ dùng ba nhãn theo hành động, và nhờ AI gợi ý từ khoá để gắn tự động, còn bạn kiểm lại."
      },
      {
        "type": "feynman",
        "title": "Nhãn màu đơn giản hơn bạn nghĩ",
        "intro": "Nhãn màu giống ba ngăn trên bàn làm việc: Việc hôm nay, Đang chờ người khác, Để đọc khi rảnh. Bạn không cần ngăn thứ tư để biết bắt đầu từ đâu.",
        "columns": [
          "Thành phần",
          "Đời thường",
          "Trong hộp thư"
        ],
        "rows": [
          [
            "Ngăn 1",
            "Việc hôm nay",
            "Nhãn Gấp"
          ],
          [
            "Ngăn 2",
            "Đang chờ người khác",
            "Nhãn Chờ người khác"
          ],
          [
            "Ngăn 3",
            "Để đọc khi rảnh",
            "Nhãn Đọc sau"
          ],
          [
            "Khi thêm ngăn thứ tư",
            "Bạn quên ngăn nào là gì",
            "Bạn bỏ không dùng nhãn"
          ]
        ],
        "oneLiner": "Ba nhãn theo hành động đủ nhìn qua là biết việc."
      },
      {
        "type": "heading",
        "text": "Vấn đề: nhãn nhiều thì không ai nhìn"
      },
      {
        "type": "paragraph",
        "text": "Một hộp thư có mười hai nhãn đủ màu trông rất gọn cho tới ngày thứ ba, khi bạn không nhớ màu tím là gì. Nhãn chỉ có ích khi bạn hiểu nó ngay lúc liếc."
      },
      {
        "type": "heading",
        "text": "Chọn ba nhãn theo hành động"
      },
      {
        "type": "paragraph",
        "text": "Nhãn là dấu màu gắn vào thư. Từ khoá là chữ hộp thư dùng để tự gắn nhãn. Hai khái niệm đó là đủ: bạn chọn nhãn, AI gợi ý từ khoá, bạn thử."
      },
      {
        "type": "flow",
        "title": "Từ ba nhãn đến gắn tự động",
        "steps": [
          {
            "label": "Chọn ba nhãn",
            "detail": "Gấp, Chờ người khác, Đọc sau."
          },
          {
            "label": "Nhờ AI gợi ý",
            "detail": "Năm từ khoá tiêu đề cho mỗi nhãn, kèm thư có thể bị bắt nhầm."
          },
          {
            "label": "Thử trên thư cũ",
            "detail": "Tìm từng từ khoá trong 30 thư cũ."
          },
          {
            "label": "Sửa từ khoá",
            "detail": "Bỏ từ bắt nhầm, thêm người gửi."
          },
          {
            "label": "Gắn tự động",
            "detail": "Bật quy tắc với hành động gắn nhãn."
          }
        ]
      },
      {
        "type": "list",
        "items": [
          "Nhãn Gấp chỉ nên có vài thư mỗi ngày.",
          "Nhãn Chờ người khác đi cùng ngày bạn sẽ nhắc lại.",
          "Nhãn Đọc sau xem một lần vào cuối ngày.",
          "Gỡ nhãn khi việc xong."
        ]
      },
      {
        "type": "callout",
        "label": "Nhãn chỉ có ích khi nó hiếm",
        "text": "Nếu một nhãn phủ quá nửa hộp thư, nó không nói gì nữa. Hãy đếm lại mỗi tuần và thu hẹp điều kiện."
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI gợi ý từ khoá cho nhãn Gấp",
        "task": "Bạn làm ở bộ phận mua hàng, nhãn Gấp dành cho thư nhà cung cấp cần phản hồi trong ngày.",
        "parts": [
          {
            "id": "ctx",
            "label": "Bối cảnh",
            "options": [
              {
                "text": "Tôi làm ở bộ phận mua hàng; nhãn Gấp dành cho thư nhà cung cấp cần tôi trả lời trong ngày.",
                "good": true,
                "feedback": "Nêu rõ vai trò và mục đích của nhãn nên từ khoá sát công việc."
              },
              {
                "text": "Tôi cần vài từ khoá cho email.",
                "feedback": "Thiếu bối cảnh nên AI gợi ý từ khoá chung chung."
              }
            ]
          },
          {
            "id": "task",
            "label": "Việc cần làm",
            "options": [
              {
                "text": "Cho năm từ khoá tiêu đề và cho mỗi từ một ví dụ thư có thể bị bắt nhầm.",
                "good": true,
                "feedback": "Có ví dụ bắt nhầm để bạn kiểm."
              },
              {
                "text": "Cho càng nhiều từ khoá càng tốt.",
                "feedback": "Danh sách dài đầy từ rộng, bạn khó chọn."
              }
            ]
          },
          {
            "id": "format",
            "label": "Khuôn kết quả",
            "options": [
              {
                "text": "Bảng ba cột: từ khoá, vì sao chọn, thư có thể bị bắt nhầm.",
                "good": true,
                "feedback": "Dễ đọc và so với thư cũ."
              },
              {
                "text": "Viết thành một đoạn văn.",
                "feedback": "Khó tách từng từ khoá để thử."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "ctx",
              "task",
              "format"
            ],
            "text": "Từ khoá | Vì sao | Có thể bắt nhầm\n\"chờ xác nhận\" | đơn cần trả lời | bản tin có cụm này\n\"hết hạn\" | có thời hạn | thư quảng cáo\n\"thanh toán\" | liên quan tiền | hoá đơn cũ\n(Bạn tìm từng từ trong thư cũ rồi chọn.)"
          },
          {
            "requires": [
              "ctx"
            ],
            "text": "Bạn có thể dùng các từ: gấp, khẩn, quan trọng, ngay, hôm nay.\n\n(Từ khoá chung chung, không kèm ví dụ bắt nhầm.)"
          },
          {
            "text": "Bạn nên dùng các từ khoá nổi tiếng mà mọi chuyên gia email đều áp dụng.\n\n(AI nói chung chung và bịa ra chuyện \"chuyên gia\".)"
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Nhãn Gấp đã phủ gần hết hộp thư",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Sau hai tuần, nhãn Gấp xuất hiện trên 40 trong 50 thư mỗi tuần. Bạn thấy màu đỏ khắp nơi và bắt đầu lờ chúng đi.",
            "choices": [
              {
                "label": "Thêm nhãn Rất gấp màu đỏ đậm để phân biệt",
                "next": "bad"
              },
              {
                "label": "Xem lại từ khoá, thu hẹp bằng người gửi, đếm lại sau một tuần",
                "next": "s2"
              }
            ]
          },
          "bad": {
            "text": "Nhãn Rất gấp cũng phủ dần. Hộp thư có bốn nhãn và bạn lại không nhớ nhãn nào để làm gì.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bạn thấy từ khoá \"gấp\" bắt cả thư quảng cáo. Bạn bỏ từ đó, chỉ giữ thư từ ba nhà cung cấp chính có chữ \"chờ xác nhận\".",
            "choices": [
              {
                "label": "Bật quy tắc mới và đếm số thư Gấp sau một tuần",
                "next": "good"
              },
              {
                "label": "Xoá hết nhãn, quay lại đọc từng thư",
                "next": "bad2"
              }
            ]
          },
          "bad2": {
            "text": "Bạn quay lại cảnh không có hệ thống và mỗi sáng phải đọc hết. Sửa từ khoá tốt hơn bỏ cả hệ thống.",
            "ending": "bad"
          },
          "good": {
            "text": "Tuần sau chỉ còn khoảng 6 thư Gấp mỗi tuần. Màu đỏ có nghĩa trở lại, và bạn ghi lại từ khoá đã loại.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Ba nhãn theo hành động, điều kiện hẹp, đếm lại mỗi tuần.",
          "Bài sau: gom thư thông báo tự động thành bản tóm tắt."
        ]
      }
    ],
    "track": "personal",
    "isFundamental": false
  },
  {
    "id": 2483,
    "slug": "thu-bao-tu-he-thong-gom-lai-mot-cho",
    "title": "Chặng 54, Bài 4: Thư thông báo tự động mỗi ngày mười cái: gom lại đọc một lần",
    "subtitle": "Thư phần mềm gửi nhiều nhưng ít cái cần bạn hành động ngay; chỉ cần phân biệt đúng loại.",
    "duration": "8 phút",
    "difficulty": "Dễ",
    "emoji": "🔔",
    "whyItMatters": "Mười thông báo mỗi ngày làm bạn mất tập trung mười lần, trong khi có thể chỉ một hai cái cần làm ngay. Gom phần còn lại thành bản tóm tắt cuối ngày giữ được sự chú ý, miễn là thông báo lỗi và thông báo hạn vẫn nổi lên ngay.",
    "openingQuestion": "Hộp thư nhận mười thông báo phần mềm mỗi ngày. Bạn nên chuyển loại nào thành bản tóm tắt cuối ngày?",
    "openingOptions": [
      "Thông báo chỉ để biết, như \"có người xem tài liệu\" hay \"báo cáo tuần đã tạo\"",
      "Mọi thông báo của phần mềm, vì chúng đều do máy gửi nên không quan trọng bằng thư người",
      "Thông báo thanh toán thất bại, vì tối mới kiểm tra thì cũng không ảnh hưởng nhiều",
      "Thông báo yêu cầu phê duyệt của sếp, vì sếp sẽ nhắc lại nếu việc đó thực sự cần gấp hơn"
    ],
    "correctOption": 0,
    "explanation": "Thông báo chỉ để biết không đòi bạn làm gì, nên đọc gộp cuối ngày là an toàn. Thông báo nào cũng gom thì lẫn cả thanh toán thất bại và phê duyệt, những thứ có hạn thật. Thanh toán thất bại có thể làm dịch vụ dừng. Phê duyệt chờ sếp không nên trông cậy vào việc sếp nhắc lại.",
    "diagram": [
      {
        "label": "Liệt kê các loại thông báo",
        "arrow": true
      },
      {
        "label": "Phân: nổi ngay, hay gom cuối ngày",
        "arrow": true
      },
      {
        "label": "AI tóm tắt phần gom thành một bản",
        "arrow": true
      },
      {
        "label": "Bạn đọc bản tóm tắt một lần"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: nhóm vận hành ba người",
      "description": "Nhóm nhận thông báo từ phần mềm quản lý việc, lịch và lưu trữ. Họ chuyển thông báo chỉ để biết vào một thư mục, nhờ AI tóm tắt cuối ngày, và giữ thông báo lỗi thanh toán, hạn nộp nổi lên ngay. Họ đếm lại sau hai tuần: không còn bỏ lỡ thông báo hạn."
    },
    "quiz": [
      {
        "question": "Thông báo nào nên nổi lên ngay, không gom cuối ngày?",
        "options": [
          "Thông báo thanh toán của dịch vụ bị từ chối",
          "Thông báo phần mềm vừa cập nhật",
          "Thông báo có người xem tài liệu bạn chia sẻ hôm qua",
          "Bản tin hằng tuần của nhà cung cấp dịch vụ bạn đang dùng"
        ],
        "correct": 0,
        "explanation": "Thanh toán bị từ chối có thể dừng dịch vụ nên cần xử lý sớm. Ba loại còn lại chỉ để biết và không hối thúc bạn làm gì."
      },
      {
        "question": "Vì sao bản tóm tắt cuối ngày do AI viết vẫn cần bạn liếc qua?",
        "options": [
          "AI có thể gộp một thông báo hạn thật vào câu chung chung làm bạn bỏ sót",
          "Vì AI luôn tóm tắt sai hết mọi thông báo nên không thể dùng được",
          "Vì bản tóm tắt dài hơn tổng các thông báo gốc cộng lại",
          "Vì hộp thư không cho đọc tóm tắt nếu bạn chưa đọc từng thông báo gốc"
        ],
        "correct": 0,
        "explanation": "Khi gộp, AI có thể làm mờ chi tiết như ngày hạn hoặc số tiền. Bạn liếc để chắc không mất gì quan trọng. AI không luôn sai, tóm tắt thường ngắn hơn bản gốc, và hộp thư không ràng buộc như vậy."
      },
      {
        "question": "Bạn muốn AI tóm tắt 10 thông báo. Câu lệnh nào tốt nhất?",
        "options": [
          "Gom 10 thông báo dưới đây thành tối đa 5 dòng, dòng nào có hạn hoặc số tiền phải ghi đầy đủ",
          "Tóm tắt 10 thông báo dưới đây thật ngắn gọn sao cho đọc nhanh nhất có thể",
          "Viết lại 10 thông báo dưới đây bằng giọng văn thân thiện dễ đọc hơn cho tôi",
          "Cho tôi biết tất cả những gì đáng chú ý trong 10 thông báo dưới đây nhé"
        ],
        "correct": 0,
        "explanation": "Câu lệnh tốt nêu giới hạn dòng và điều bắt buộc giữ (hạn, số tiền). \"Thật ngắn gọn\" có thể cắt mất hạn. Đổi giọng không giúp lọc. \"Đáng chú ý\" để AI tự chọn, và có thể bỏ thứ bạn cần."
      },
      {
        "question": "Bạn đặt quy tắc: thông báo từ phần mềm chứa chữ \"lỗi\" luôn nổi lên ngay. Kết quả có thể xảy ra là gì?",
        "options": [
          "Thư \"Lỗi đã được khắc phục\" cũng nổi lên, làm bạn giật mình vì tưởng có lỗi mới",
          "Không thư lỗi nào nổi lên vì quy tắc chỉ hoạt động với thư từ người thật",
          "Mọi thư đều nổi lên vì chữ lỗi có trong mọi thông báo phần mềm bạn nhận",
          "Quy tắc chặn luôn thư lỗi để tránh làm bạn lo lắng không cần thiết"
        ],
        "correct": 0,
        "explanation": "Chữ đơn lẻ bắt cả thư báo đã sửa. Cách sửa là thêm điều kiện (người gửi, cụm \"thất bại\") chứ không phải bỏ quy tắc. Quy tắc không phân biệt người hay máy, không phải thư nào cũng có chữ lỗi, và không có chức năng chặn để bạn đỡ lo."
      },
      {
        "question": "Bạn nhận 10 thông báo mỗi ngày, mỗi thông báo làm bạn mất trung bình 2 phút vì bị gián đoạn. Gom thành một lần đọc 5 phút tiết kiệm bao nhiêu phút mỗi ngày?",
        "options": [
          "15 phút (= 10 × 2 − 5)",
          "20 phút (= 10 × 2, quên trừ 5)",
          "25 phút (= 10 × 2 + 5, cộng nhầm)",
          "5 phút (= chỉ tính thời gian đọc)"
        ],
        "correct": 0,
        "explanation": "10 thông báo × 2 phút = 20 phút gián đoạn, trừ 5 phút đọc gộp thì còn tiết kiệm 15 phút. Ba đáp án còn lại là các sai lầm phổ biến: quên trừ, cộng nhầm, hoặc chỉ nhìn một phía. Đây là số liệu minh hoạ, thực tế mỗi người khác nhau."
      },
      {
        "question": "Khi nào nên xét lại danh sách thông báo được gom?",
        "options": [
          "Sau một hai tuần, khi bạn đã thấy loại nào thực sự cần phản ứng",
          "Không bao giờ, vì danh sách đã đúng ngay từ lần đầu do AI đề xuất",
          "Mỗi giờ một lần để bảo đảm không thư nào bị bỏ sót trong ngày",
          "Chỉ khi nhà cung cấp phần mềm gửi thông báo yêu cầu bạn xét lại"
        ],
        "correct": 0,
        "explanation": "Phân loại ban đầu chỉ là giả định; hai tuần dùng thật cho bạn dữ kiện. Mỗi giờ xét lại phá mục đích gom. Nhà cung cấp phần mềm không biết thói quen của bạn."
      }
    ],
    "keyTakeaways": [
      "Hai loại thông báo: phải nổi ngay và gom cuối ngày.",
      "Thanh toán, hạn nộp, phê duyệt: luôn nổi ngay.",
      "Bản tóm tắt phải giữ hạn và số tiền.",
      "Điều kiện bắt chữ lỗi cần thêm người gửi.",
      "Xét lại sau hai tuần."
    ],
    "practicePrompt": {
      "question": "Thông báo \"Tài liệu của bạn đã được 3 người xem\" nên xử lý thế nào?",
      "options": [
        "Gom vào bản tóm tắt cuối ngày",
        "Nổi lên ngay kèm âm thanh báo",
        "Xoá luôn vì không ai cần biết việc này",
        "Chuyển tiếp cho sếp để sếp biết"
      ],
      "correct": 0,
      "explanation": "Thông báo chỉ để biết thì gom là hợp lý. Nổi lên ngay làm gián đoạn vô ích. Xoá thì mất thông tin có thể hữu ích khi tra lại. Chuyển tiếp sếp tạo thêm thư cho người khác."
    },
    "summary": {
      "keyIdea": "Chia thông báo làm hai loại: nổi ngay và gom cuối ngày.",
      "formula": "Liệt kê → phân loại → gom phần nhẹ → tóm tắt → xét lại sau hai tuần.",
      "commonMistake": "Gom cả thông báo thanh toán hay hạn nộp vào bản tóm tắt.",
      "action": "Liệt kê mười thông báo gần nhất và phân loại."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Lấy 10 thư thông báo tự động gần nhất trong hộp thư. Ghi mỗi thư vào một trong hai cột: nổi ngay hoặc gom cuối ngày. Nhờ AI tóm tắt các thư ở cột gom thành tối đa 5 dòng, rồi tự đối chiếu xem có mất hạn hoặc số tiền nào không.",
      "secondary": "Ngày mai bạn sẽ được hỏi: thông báo nào bạn chuyển sang cột nổi ngay và vì sao?"
    },
    "sections": [
      {
        "type": "lead",
        "text": "Mỗi ngày phần mềm gửi bạn chừng mười thư thông báo. Hầu hết chỉ để biết, nhưng một hai cái lại cần làm ngay. Bài này dạy cách tách hai loại rồi gom phần nhẹ thành một bản tóm tắt."
      },
      {
        "type": "feynman",
        "title": "Gom thông báo đơn giản hơn bạn nghĩ",
        "intro": "Giống như bảo vệ toà nhà: người giao báo, tờ rơi để ở bàn đến cuối ngày mới đưa lên, còn chuyện báo cháy thì gọi ngay.",
        "columns": [
          "Thành phần",
          "Đời thường",
          "Trong hộp thư"
        ],
        "rows": [
          [
            "Loại nhẹ",
            "Tờ rơi, báo giấy",
            "Thông báo chỉ để biết"
          ],
          [
            "Loại nặng",
            "Báo cháy",
            "Thanh toán thất bại, hạn nộp, phê duyệt"
          ],
          [
            "Cách xử lý nhẹ",
            "Đưa một lần cuối ngày",
            "Gom thành bản tóm tắt"
          ],
          [
            "Cách xử lý nặng",
            "Gọi ngay",
            "Nổi lên ngay"
          ]
        ],
        "oneLiner": "Gom phần nhẹ, để phần nặng nổi lên ngay."
      },
      {
        "type": "heading",
        "text": "Vấn đề: mười lần gián đoạn một ngày"
      },
      {
        "type": "paragraph",
        "text": "Mỗi thông báo làm bạn nhìn sang hộp thư, đọc hai dòng, rồi mất mấy phút để quay lại việc cũ. Mười thông báo là hàng chục phút mỗi ngày mà ít khi có gì cần làm."
      },
      {
        "type": "heading",
        "text": "Phân loại trước, gom sau"
      },
      {
        "type": "paragraph",
        "text": "Hai từ mới: thông báo nổi ngay (cần bạn hành động sớm) và bản tóm tắt (AI gom nhiều thư thành vài dòng). Bạn phân loại, AI chỉ tóm tắt phần bạn đã quyết là nhẹ."
      },
      {
        "type": "flow",
        "title": "Từ mười thông báo đến một bản tóm tắt",
        "steps": [
          {
            "label": "Liệt kê",
            "detail": "Ghi 10 thông báo gần nhất và nguồn gửi."
          },
          {
            "label": "Phân loại",
            "detail": "Cột nổi ngay: thanh toán, hạn, phê duyệt. Cột gom: chỉ để biết."
          },
          {
            "label": "Chuyển thư cột gom",
            "detail": "Quy tắc chuyển vào thư mục riêng."
          },
          {
            "label": "Nhờ AI tóm tắt",
            "detail": "Tối đa 5 dòng, giữ hạn và số tiền."
          },
          {
            "label": "Đọc một lần",
            "detail": "Cuối ngày, liếc và đối chiếu với thư gốc."
          }
        ]
      },
      {
        "type": "list",
        "items": [
          "Thanh toán và hạn nộp: luôn nổi ngay.",
          "Thông báo có người xem hay đã tạo: gom.",
          "Yêu cầu phê duyệt đang chờ bạn: nổi ngay.",
          "Xét lại phân loại sau hai tuần."
        ]
      },
      {
        "type": "callout",
        "label": "Bản tóm tắt không thay thư gốc",
        "text": "AI gộp nhiều thư có thể làm mờ hạn hoặc số tiền. Khi bản tóm tắt nhắc một hạn, mở thư gốc kiểm lại trước khi tin."
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Yêu cầu AI tóm tắt 10 thông báo",
        "task": "Bạn đã chép 10 tiêu đề và nội dung ngắn của thông báo phần mềm, xoá tên người. Hãy lắp câu lệnh.",
        "parts": [
          {
            "id": "scope",
            "label": "Phạm vi",
            "options": [
              {
                "text": "Đây là 10 thông báo chỉ để biết, tôi đã xoá tên người; thông báo thanh toán và hạn nộp đã tách riêng.",
                "good": true,
                "feedback": "Đúng phạm vi: chỉ phần nhẹ."
              },
              {
                "text": "Đây là mọi thông báo của tôi, cả thanh toán, hạn nộp và phê duyệt.",
                "feedback": "Trộn phần nặng với nhẹ, AI có thể làm mờ hạn."
              }
            ]
          },
          {
            "id": "rule",
            "label": "Điều bắt buộc giữ",
            "options": [
              {
                "text": "Tóm tắt thật ngắn.",
                "feedback": "Có thể cắt mất hạn hoặc số tiền."
              },
              {
                "text": "Tối đa 5 dòng, dòng nào có hạn hoặc số tiền phải ghi đầy đủ.",
                "good": true,
                "feedback": "Giữ chi tiết quan trọng dù ngắn."
              }
            ]
          },
          {
            "id": "check",
            "label": "Khả năng kiểm",
            "options": [
              {
                "text": "Sau mỗi dòng ghi số thông báo gốc được gom.",
                "good": true,
                "feedback": "Bạn đối chiếu được với thư gốc."
              },
              {
                "text": "Không cần ghi gì thêm.",
                "feedback": "Bạn không biết dòng nào gom từ thư nào."
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
            "text": "1. Tài liệu nhóm được 7 người xem (thư 1, 4, 6)\n2. Báo cáo tuần đã tạo xong, không có lỗi (thư 2)\n3. Bản cập nhật tính năng mới (thư 3, 5)\n4. Hạn rà soát quyền truy cập: 25/10 (thư 7)\n(Có số thư gốc và hạn đầy đủ để đối chiếu.)"
          },
          {
            "requires": [
              "scope"
            ],
            "text": "Hôm nay có nhiều thông báo nhẹ, không có gì đáng lo. Mọi thứ đều ổn.\n\n(Ngắn nhưng bỏ mất hạn rà soát và không cho bạn đối chiếu.)"
          },
          {
            "text": "Hôm nay có ba thông báo quan trọng: khoản thanh toán 12.500.000 đồng đã quá hạn, tài khoản bị khoá và cần gửi xác minh ngay.\n\n(Bạn không đưa dữ kiện nên AI bịa số tiền và sự kiện.)"
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Thông báo thanh toán bị gom nhầm",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn gom mọi thông báo của một phần mềm vào thư mục tóm tắt. Bản tóm tắt chiều nay ghi: \"Có một thông báo về thanh toán\".",
            "choices": [
              {
                "label": "Bỏ qua, vì AI đã tóm tắt và không ghi là khẩn",
                "next": "bad"
              },
              {
                "label": "Mở thư gốc kiểm ngày và số tiền",
                "next": "s2"
              }
            ]
          },
          "bad": {
            "text": "Thanh toán thất bại thật. Hai ngày sau dịch vụ bị khoá, cả nhóm không làm việc được một buổi sáng.",
            "ending": "bad"
          },
          "s2": {
            "text": "Thư gốc ghi thanh toán thẻ thất bại, cần cập nhật trước ngày mai.",
            "choices": [
              {
                "label": "Xử lý ngay, đổi quy tắc để thông báo thanh toán luôn nổi lên",
                "next": "good"
              },
              {
                "label": "Xử lý rồi để nguyên quy tắc cũ",
                "next": "bad2"
              }
            ]
          },
          "bad2": {
            "text": "Tháng sau lại có thông báo thanh toán bị gom và lần này không ai mở thư gốc.",
            "ending": "bad"
          },
          "good": {
            "text": "Bạn sửa kịp hạn, tách thông báo thanh toán khỏi bản tóm tắt và ghi lại ngày sửa.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Gom phần nhẹ, để phần nặng nổi lên.",
          "Bài sau: dự án nhỏ, bộ năm quy tắc hộp thư của bạn."
        ]
      }
    ],
    "track": "personal",
    "isFundamental": false
  },
  {
    "id": 2484,
    "slug": "du-an-nho-hop-thu-gon-trong-mot-buoi",
    "title": "Chặng 54, Bài 5: Dự án nhỏ: một hộp thư gọn với năm quy tắc bạn tự tin",
    "subtitle": "Năm quy tắc đã thử trên 30 thư cũ tốt hơn hai mươi quy tắc chưa ai kiểm.",
    "duration": "10 phút",
    "difficulty": "Dễ",
    "emoji": "🧹",
    "whyItMatters": "Quy tắc chỉ có giá trị khi bạn tin nó. Một bộ năm quy tắc nhỏ, mỗi cái đã thử trên thư cũ và ghi lại chỗ bắt nhầm, cho bạn một hộp thư gọn mà bạn biết rõ nó làm gì.",
    "openingQuestion": "Bạn định lập bộ quy tắc cho hộp thư. Cách nào cho hộp thư đáng tin nhất?",
    "openingOptions": [
      "Chọn năm quy tắc, thử từng cái trên 30 thư cũ và ghi lại quy tắc nào bắt nhầm",
      "Lập hai mươi quy tắc một lần cho đủ mọi tình huống rồi bật hết trong một buổi",
      "Nhờ AI viết trọn bộ quy tắc rồi bật hết, vì AI đã biết quy tắc hợp lý nhất",
      "Bật quy tắc trước rồi chờ khách phàn nàn thì sửa, vì phản hồi là cách thử tốt nhất"
    ],
    "correctOption": 0,
    "explanation": "Năm quy tắc đã thử trên thư cũ cho bạn số liệu thật về bắt đúng và bắt nhầm. Hai mươi quy tắc bật một lần thì khi có thư lạc bạn không biết quy tắc nào gây ra. AI không biết hộp thư của bạn nên không thể xác nhận bộ quy tắc hợp lý. Chờ khách phàn nàn nghĩa là bạn trả giá bằng một thư bị bỏ lỡ.",
    "diagram": [
      {
        "label": "Liệt kê việc hay kéo tay",
        "arrow": true
      },
      {
        "label": "Chọn năm quy tắc",
        "arrow": true
      },
      {
        "label": "Thử từng quy tắc trên 30 thư cũ",
        "arrow": true
      },
      {
        "label": "Ghi quy tắc nào bắt nhầm",
        "arrow": true
      },
      {
        "label": "Bật dần, xét lại sau một tuần"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: một chuyên viên hành chính",
      "description": "Chuyên viên liệt kê năm việc hay kéo tay: hoá đơn, lịch họp, báo giá, bản tin, thư của sếp. Cô thử từng quy tắc trên 30 thư cũ, thấy quy tắc lịch họp bắt nhầm hai thư và sửa thêm điều kiện, rồi bật dần một quy tắc mỗi ngày."
    },
    "quiz": [
      {
        "question": "Vì sao nên bật từng quy tắc một thay vì bật cả năm cùng lúc?",
        "options": [
          "Khi có thư lạc chỗ, bạn biết ngay quy tắc nào gây ra",
          "Vì hộp thư chỉ cho chạy một quy tắc mỗi ngày",
          "Vì bật từng cái làm hộp thư xử lý nhanh hơn gấp nhiều lần",
          "Vì AI chỉ hiểu được quy tắc khi bạn đưa từng cái một cho nó"
        ],
        "correct": 0,
        "explanation": "Bật từng cái giúp truy nguyên: thư lạc xuất hiện sau khi bật quy tắc nào thì là quy tắc đó. Hộp thư cho nhiều quy tắc cùng chạy, tốc độ gần như không đổi, và AI không phụ thuộc cách bạn bật."
      },
      {
        "question": "Bạn thử một quy tắc trên 30 thư cũ: bắt 10 thư, trong đó 8 đúng, và bỏ sót 4 thư đáng lẽ thuộc về nó. Điều nào đúng?",
        "options": [
          "Quy tắc bắt nhầm 2 thư và bỏ sót 4 thư, cần chỉnh điều kiện",
          "Quy tắc đúng 80% nên bỏ sót 4 thư là chuyện bình thường, không cần chỉnh",
          "Quy tắc bắt nhầm 8 thư vì 8 là số thư đã bị bắt và đúng trong lần thử",
          "Quy tắc bỏ sót 2 thư vì 10 − 8 = 2"
        ],
        "correct": 0,
        "explanation": "Bắt nhầm = 10 − 8 = 2. Bỏ sót là 4 thư nằm ngoài nhóm bị bắt. Tính 80% chỉ nói về thư đã bắt, bỏ qua thư sót. Đáp án thứ hai nhầm \"đúng\" thành \"nhầm\", đáp án thứ ba nhầm nhầm-với-sót."
      },
      {
        "question": "Bộ năm quy tắc đầu tiên nên gồm loại việc nào?",
        "options": [
          "Những việc bạn kéo tay lặp lại nhiều nhất mỗi tuần",
          "Những việc hiếm khi xảy ra nhưng bạn thấy thú vị khi tự động hoá",
          "Những việc khó nhất, vì nếu làm được thì việc dễ sẽ tự làm được",
          "Những việc của đồng nghiệp"
        ],
        "correct": 0,
        "explanation": "Tự động hoá việc lặp lại nhiều nhất cho lợi ích lớn nhất trên mỗi quy tắc. Việc hiếm không đáng công. Việc khó làm sai dễ hơn và rủi ro lớn hơn khi mới bắt đầu. Hộp thư của đồng nghiệp là việc của họ."
      },
      {
        "question": "Ghi lại quy tắc nào bắt nhầm có ích gì?",
        "options": [
          "Sau này bạn biết phải thu hẹp điều kiện nào và có bằng chứng để kiểm lại",
          "Giúp bạn chứng minh rằng AI đã sai để không phải dùng AI nữa",
          "Giúp hộp thư tự học từ lỗi và sửa điều kiện mà không cần bạn can thiệp vào lần sau",
          "Giúp bạn quên lỗi đã xảy ra vì mọi thứ đã có trong tệp ghi chú"
        ],
        "correct": 0,
        "explanation": "Nhật ký lỗi cho bạn dữ kiện để chỉnh lần sau. Mục đích không phải kết tội AI. Hộp thư không tự học từ ghi chú của bạn. Ghi chép không giúp quên, mà giúp nhớ chính xác."
      },
      {
        "question": "Quy tắc nào nên hạn chế vì nhiều rủi ro nhất?",
        "options": [
          "Quy tắc tự xoá thư khi có một từ khoá",
          "Quy tắc gắn nhãn xanh cho thư từ sếp của bạn",
          "Quy tắc chuyển hoá đơn vào thư mục Kế toán",
          "Quy tắc đánh dấu sao cho thư có chữ Hợp đồng"
        ],
        "correct": 0,
        "explanation": "Xoá là hành động khó quay lại: thư lạc vào thùng rác dễ bị bỏ lỡ. Gắn nhãn, chuyển thư mục và đánh dấu sao vẫn để thư trong tầm nhìn."
      },
      {
        "question": "Sau một tuần chạy quy tắc, việc nào nên làm?",
        "options": [
          "Mở từng thư mục quy tắc, liếc tìm thư không thuộc về đó, ghi lại điều chỉnh",
          "Xoá hết các thư mục để bắt đầu lại với bộ quy tắc hoàn toàn mới",
          "Chỉ nhìn số thư chưa đọc ở hộp thư chính, nếu thấp là quy tắc tốt",
          "Nhờ AI báo cáo quy tắc nào hoạt động tốt dù chưa cho nó xem thư nào"
        ],
        "correct": 0,
        "explanation": "Liếc từng thư mục là cách duy nhất biết thư nào đi nhầm chỗ. Số thư chưa đọc thấp có thể vì thư bị chuyển nhầm và bạn không thấy. AI chưa thấy thư của bạn thì không thể đánh giá, và xoá hết là bỏ đi cả phần tốt."
      }
    ],
    "keyTakeaways": [
      "Năm quy tắc cho việc lặp lại nhiều nhất.",
      "Thử từng cái trên 30 thư cũ.",
      "Đếm bắt đúng, bắt nhầm, bỏ sót.",
      "Bật từng quy tắc một.",
      "Sau một tuần liếc từng thư mục."
    ],
    "practicePrompt": {
      "question": "Quy tắc của bạn bắt 12 thư, trong đó 9 đúng. Có bao nhiêu thư bắt nhầm?",
      "options": [
        "3 thư (= 12 − 9)",
        "9 thư, vì đó là số thư đúng",
        "12 thư, vì quy tắc bắt cả 12",
        "21 thư (= 12 + 9)"
      ],
      "correct": 0,
      "explanation": "Bắt nhầm bằng tổng thư bắt trừ thư đúng: 12 − 9 = 3. Chín là thư đúng, 12 là tổng thư bắt, còn 21 là phép cộng sai hướng."
    },
    "summary": {
      "keyIdea": "Năm quy tắc đã thử tốt hơn hai mươi quy tắc chưa thử.",
      "formula": "Chọn việc lặp lại → thử 30 thư cũ → ghi lỗi → bật dần → xét lại sau một tuần.",
      "commonMistake": "Bật hàng loạt mà không biết quy tắc nào gây ra thư lạc.",
      "action": "Lập năm quy tắc và ghi bảng thử."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Lập một bảng năm dòng: quy tắc, điều kiện, hành động, số thư bắt đúng, số thư bắt nhầm trên 30 thư cũ. Điền ít nhất hai quy tắc hôm nay và chọn một quy tắc bắt nhầm để sửa điều kiện.",
      "secondary": "Ngày mai bạn sẽ được hỏi: quy tắc nào bắt nhầm nhiều nhất và bạn đã sửa điều kiện ra sao?"
    },
    "sections": [
      {
        "type": "lead",
        "text": "Đây là dự án nhỏ gom cả chặng đầu: bạn sẽ lập năm quy tắc, thử trên 30 thư cũ và ghi lại chỗ bắt nhầm. Xong, bạn có hộp thư gọn mà mình hiểu rõ từng quy tắc."
      },
      {
        "type": "feynman",
        "title": "Bộ quy tắc đơn giản hơn bạn nghĩ",
        "intro": "Giống như dọn nhà: bạn không mua hai mươi cái kệ trước. Bạn chọn năm nơi đồ hay bừa nhất, đặt kệ, dùng một tuần rồi chỉnh.",
        "columns": [
          "Thành phần",
          "Đời thường",
          "Trong hộp thư"
        ],
        "rows": [
          [
            "Chọn chỗ",
            "Năm nơi hay bừa nhất",
            "Năm việc hay kéo tay nhất"
          ],
          [
            "Đặt kệ",
            "Một kệ cho mỗi nơi",
            "Một quy tắc cho mỗi việc"
          ],
          [
            "Thử dùng",
            "Một tuần",
            "30 thư cũ rồi một tuần chạy thật"
          ],
          [
            "Chỉnh",
            "Dời kệ cho hợp",
            "Sửa điều kiện bắt nhầm"
          ]
        ],
        "oneLiner": "Ít quy tắc, thử kỹ, chỉnh dần."
      },
      {
        "type": "heading",
        "text": "Vấn đề: quy tắc nhiều mà không ai tin"
      },
      {
        "type": "paragraph",
        "text": "Bộ quy tắc hai mươi dòng thường có vài cái chồng nhau, vài cái không ai nhớ. Khi có thư lạc, bạn không biết sửa cái nào nên bạn tắt hết."
      },
      {
        "type": "heading",
        "text": "Quy trình năm bước"
      },
      {
        "type": "paragraph",
        "text": "Hai khái niệm: bảng thử (ghi số thư bắt đúng, nhầm, sót) và bật dần (mỗi ngày bật một quy tắc). Hai thứ đó làm cho bộ quy tắc của bạn đáng tin."
      },
      {
        "type": "flow",
        "title": "Từ danh sách việc đến hộp thư gọn",
        "steps": [
          {
            "label": "Liệt kê việc kéo tay",
            "detail": "Năm việc bạn làm lặp lại nhiều nhất."
          },
          {
            "label": "Viết quy tắc",
            "detail": "Mô tả bằng câu thường, nhờ AI viết điều kiện, đọc từng dòng."
          },
          {
            "label": "Thử 30 thư cũ",
            "detail": "Ghi bắt đúng, nhầm, sót vào bảng thử."
          },
          {
            "label": "Sửa điều kiện",
            "detail": "Thêm người gửi hoặc cụm từ đầy đủ."
          },
          {
            "label": "Bật dần",
            "detail": "Mỗi ngày một quy tắc, cuối tuần liếc từng thư mục."
          }
        ]
      },
      {
        "type": "list",
        "items": [
          "Năm quy tắc là đủ cho tuần đầu.",
          "Hành động nhẹ: gắn nhãn, chuyển thư mục.",
          "Mỗi quy tắc một dòng trong bảng thử.",
          "Xoá thư tự động là chuyện để sau."
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Bộ quy tắc đáng tin",
          "text": "Năm quy tắc, mỗi cái có bảng thử, bật từng cái, ghi lại lỗi."
        },
        "right": {
          "label": "Bộ quy tắc khó tin",
          "text": "Hai mươi quy tắc chồng nhau, chưa thử, bật cùng lúc, không ghi chép."
        }
      },
      {
        "type": "scenario",
        "title": "Tuần đầu của bộ năm quy tắc",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn đã viết xong năm quy tắc trong hộp thư. Bạn muốn xong trước giờ nghỉ trưa.",
            "choices": [
              {
                "label": "Bật cả năm ngay, xem hộp thư sạch chưa",
                "next": "bad"
              },
              {
                "label": "Thử từng quy tắc trên 30 thư cũ, ghi bảng, rồi bật quy tắc đầu tiên",
                "next": "s2"
              }
            ]
          },
          "bad": {
            "text": "Hai ngày sau một thư khách đi vào thư mục lạ. Bạn không biết quy tắc nào gây ra và tắt cả năm cái.",
            "ending": "bad"
          },
          "s2": {
            "text": "Quy tắc Lịch họp bắt nhầm 2 thư vì điều kiện chỉ có chữ \"họp\".",
            "choices": [
              {
                "label": "Sửa thêm điều kiện người gửi và thử lại trên 30 thư",
                "next": "good"
              },
              {
                "label": "Bỏ quy tắc Lịch họp, giữ bốn quy tắc còn lại",
                "next": "bad2"
              }
            ]
          },
          "bad2": {
            "text": "Bốn quy tắc chạy ổn nhưng việc kéo tay lịch họp vẫn còn và bạn không rút được kinh nghiệm sửa điều kiện.",
            "ending": "bad"
          },
          "good": {
            "text": "Quy tắc sau khi sửa bắt đúng, không nhầm. Bạn ghi vào bảng và bật dần các quy tắc còn lại.",
            "ending": "good"
          }
        }
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Soát bảng thử AI tóm tắt cho bạn",
        "task": "Bạn dán bảng thử bạn tự ghi và nhờ AI tóm tắt. Bảng chỉ có: Hoá đơn 10 bắt, 9 đúng. Lịch họp 8 bắt, 6 đúng. Báo giá 5 bắt, 5 đúng. Đánh dấu chỗ AI thêm.",
        "segments": [
          {
            "text": "Quy tắc Hoá đơn bắt 10 thư, đúng 9 thư, nhầm 1 thư."
          },
          {
            "text": "Quy tắc Lịch họp bắt 8 thư, đúng 6 thư, nhầm 2 thư."
          },
          {
            "text": "Quy tắc Báo giá bắt 5 thư, đúng 5 thư, không nhầm."
          },
          {
            "text": "Tổng cộng các quy tắc đạt độ chính xác 97%.",
            "error": "Bảng chỉ cho 20 thư đúng trên 23 thư bắt, tức khoảng 87%; 97% là con số AI bịa."
          },
          {
            "text": "Quy tắc Lịch họp nên thêm điều kiện người gửi để giảm nhầm."
          },
          {
            "text": "Quy tắc Bản tin cũng chạy tốt, không bắt nhầm thư nào.",
            "error": "Bảng của bạn không có quy tắc Bản tin; AI tự thêm một quy tắc."
          }
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Năm quy tắc đã thử, bật dần, liếc lại sau một tuần.",
          "Bài sau: bộ trả lời mẫu cho câu khách hỏi đi hỏi lại."
        ]
      }
    ],
    "track": "personal",
    "isFundamental": false
  }
];
