import type { Lesson } from "../lesson-types";

// Chặng 40, bài 11-15. Giáo trình: scripts/curriculum/stage-40.json.
export const S40_C_LESSONS: Lesson[] = [
  {
    "id": 2210,
    "slug": "kiem-chung-danh-dau-con-so-va-ten-rieng-can-soat",
    "title": "Chặng 40, Bài 11: Đánh dấu mọi con số và tên riêng cần soát trước khi đăng",
    "subtitle": "Bài có mười hai con số thì có mười hai chỗ có thể sai; việc của bạn là biết chúng nằm ở đâu.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "track": "personal",
    "isFundamental": false,
    "emoji": "🔎",
    "whyItMatters": "Người đọc tha cho một câu văn vụng, nhưng không tha cho một con số sai hay một cái tên viết nhầm. Lỗi kiểu đó nằm im trong bài đã đăng, đến khi có người trong công ty hoặc khách hàng chỉ ra thì bạn phải đính chính công khai. Nhờ AI gom hết các con số và tên riêng vào một danh sách giúp bạn không bỏ sót chỗ nào, còn việc đối chiếu với nguồn vẫn là của bạn.",
    "openingQuestion": "Bản tin tháng của bạn có 12 con số và 9 tên người, tên phòng ban. Sáng mai phải đăng. Việc nào nên làm đầu tiên?",
    "openingOptions": [
      "Gom mọi con số và tên riêng thành một danh sách để đối chiếu",
      "Nhờ AI đọc lại cả bài và trả lời bài đã ổn để đăng chưa",
      "Đăng bài trước rồi chờ đồng nghiệp báo nếu có chỗ nào sai cho kịp giờ",
      "Chỉ soát các con số lớn vì con số nhỏ ít ai để ý tới"
    ],
    "correctOption": 0,
    "explanation": "Danh sách biến một bài viết trôi chảy khó soát thành mười hai mục nhỏ mà bạn tích từng cái sau khi đối chiếu với nguồn. Nhờ AI đọc lại rồi hỏi bài đã ổn chưa chỉ cho một lời khen chung, vì AI không có nguồn của công ty để so. Đăng trước rồi chờ người khác báo là để độc giả làm việc soát của bạn. Con số nhỏ cũng dễ sai như con số lớn, và tên người viết sai còn gây phật lòng nhiều hơn.",
    "diagram": [
      {
        "label": "Bài viết đã xong bản nháp",
        "arrow": true
      },
      {
        "label": "AI liệt kê số, ngày, tên riêng kèm câu chứa chúng",
        "arrow": true
      },
      {
        "label": "Bạn đối chiếu từng mục với nguồn của công ty",
        "arrow": true
      },
      {
        "label": "Sửa mục sai, ghi người xác nhận, rồi đăng"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: phòng truyền thông một công ty phân phối",
      "description": "Chị phụ trách bản tin nhờ AI liệt kê mọi con số và tên riêng trong bài dài hai trang. Danh sách có mười một mục; khi đối chiếu với báo cáo quý, chị thấy một con số bị chép nhầm cột và một tên trưởng phòng bỏ sót chữ đệm. Chị sửa cả hai trước khi đăng. Đây là tình huống minh hoạ, không phải số liệu của một công ty có thật."
    },
    "quiz": [
      {
        "question": "Vì sao nên nhờ AI liệt kê con số kèm cả câu chứa nó, thay vì chỉ liệt kê con số?",
        "options": [
          "Vì có cả câu, bạn biết con số ấy đang nói về việc gì để đối chiếu",
          "Vì câu dài hơn thì AI ít bịa hơn so với chỉ chép mỗi con số",
          "Vì AI chỉ hiểu được số khi nó nằm trong một câu đầy đủ",
          "Vì danh sách dài trông nghiêm túc hơn khi gửi cho sếp xem"
        ],
        "correct": 0,
        "explanation": "Con số đứng một mình như \"15%\" không cho bạn biết cần tra ở đâu. Kèm câu chứa nó, bạn biết ngay là tăng trưởng của phòng nào, tháng nào. Các lý do còn lại đều sai: độ dài câu không làm AI hết bịa, AI xử lý con số đơn lẻ được, và độ dài danh sách không phải mục tiêu."
      },
      {
        "question": "AI trả về danh sách 11 con số, còn bạn tự đếm thấy bài có 12. Nên làm gì?",
        "options": [
          "Tự dò lại bài để tìm con số bị sót rồi thêm vào danh sách",
          "Coi như đủ vì AI đã liệt kê gần hết, sót một cái không đáng kể",
          "Xoá luôn con số nào AI không liệt kê ra khỏi bài viết cho gọn",
          "Nhờ AI kiểm tra lại và tin hoàn toàn vào câu trả lời lần hai"
        ],
        "correct": 0,
        "explanation": "AI có thể bỏ sót hoặc gộp hai con số làm một, nên danh sách của nó là điểm khởi đầu chứ không phải bản đầy đủ đã được bảo đảm. Con số bị sót chính là chỗ chưa ai soát, nên phải tự tìm. Xoá con số khỏi bài chỉ vì AI quên nó thì làm mất thông tin. Hỏi lại AI cũng chưa phải kiểm chứng."
      },
      {
        "question": "Trong bài có câu \"doanh thu tăng gần gấp đôi\". Nó có cần vào danh sách soát không?",
        "options": [
          "Có, vì \"gần gấp đôi\" là một khẳng định về số dù chưa có con số cụ thể",
          "Không, vì danh sách chỉ dành cho những con số viết bằng chữ số nên cách nói về lượng thì bỏ qua",
          "Không, vì cụm từ mơ hồ thì ai cũng hiểu là ước chừng, khỏi soát",
          "Có, nhưng chỉ khi câu đó nằm ở tiêu đề của bài viết"
        ],
        "correct": 0,
        "explanation": "Người đọc hiểu \"gần gấp đôi\" là khoảng 1,8 tới 2 lần và sẽ nhớ như một sự thật. Vì thế nó cần đối chiếu như một con số thật. Danh sách soát nên gồm cả những cách nói về lượng như \"gần gấp đôi\", \"đa số\", \"hàng trăm\", không chỉ chữ số. Vị trí trong bài không quyết định việc có cần soát hay không."
      },
      {
        "question": "Vì sao tên riêng cũng phải đưa vào danh sách soát, không chỉ số liệu?",
        "options": [
          "Tên người, phòng ban, chức danh viết sai làm mất uy tín và dễ gây phật lòng",
          "Vì tên riêng tiếng Việt thì AI chưa bao giờ viết được cho đúng",
          "Vì tên riêng là dữ liệu cá nhân nên luật cấm đăng lên bản tin",
          "Vì tên riêng dài nên chiếm nhiều chỗ trong bản tin cần rút gọn"
        ],
        "correct": 0,
        "explanation": "Sai một chữ đệm hay nhầm chức danh, người trong cuộc sẽ thấy bạn không để tâm tới họ. AI đôi khi thay hoặc đoán tên khi bản ghi thiếu, nhất là tên dễ nhầm. Không phải AI không viết được tên tiếng Việt, cũng không có quy tắc cấm nêu tên người trong bản tin nội bộ; điều cần là tên đúng với hồ sơ của công ty."
      },
      {
        "question": "Sau khi đối chiếu xong một con số với nguồn, bạn nên ghi thêm gì cạnh nó trong bảng soát?",
        "options": [
          "Nguồn đã dùng và tên người hoặc ngày xác nhận",
          "Nhận xét của AI rằng con số đó nghe có vẻ hợp lý",
          "Số lần con số đó xuất hiện trong bài viết của bạn",
          "Cỡ chữ và màu làm nổi bật con số ấy"
        ],
        "correct": 0,
        "explanation": "Ghi nguồn và người xác nhận biến việc soát thành dấu vết: hôm sau có ai hỏi, bạn mở ra là thấy con số lấy từ đâu, ai gật đầu. Ý kiến \"nghe hợp lý\" của AI không phải bằng chứng. Số lần xuất hiện và màu chữ là chuyện trình bày, không giúp trả lời được câu hỏi \"con số này lấy ở đâu\"."
      }
    ],
    "keyTakeaways": [
      "Trước khi đăng, gom mọi con số, ngày và tên riêng vào một danh sách.",
      "Nhờ AI liệt kê kèm câu chứa nó, nhưng tự đếm lại xem có sót không.",
      "Cách nói về lượng như \"gần gấp đôi\" cũng là một con số cần soát.",
      "Đối chiếu từng mục với nguồn của công ty rồi ghi người xác nhận."
    ],
    "practicePrompt": {
      "question": "Bài có câu \"Phòng Kinh doanh do anh Hùng phụ trách đã đạt 120% chỉ tiêu quý ba\". Bạn đưa vào danh sách soát những gì?",
      "options": [
        "Tên anh Hùng, chức danh, con số 120% và mốc quý ba, mỗi thứ một mục",
        "Chỉ con số 120%, vì tên và mốc thời gian không thể sai được",
        "Cả câu như một mục duy nhất và tích đã soát khi đọc lướt xong",
        "Chỉ tên anh Hùng, vì con số sẽ do phòng Kinh doanh tự chịu trách nhiệm"
      ],
      "correct": 0,
      "explanation": "Một câu có thể chứa bốn thứ cần đối chiếu độc lập: người, chức danh, con số, mốc thời gian. Gộp thành một mục thì khi tích, bạn khó biết mình đã đối chiếu phần nào. Chỉ soát con số là bỏ phần dễ nhầm tên, còn nói người khác chịu trách nhiệm thì người đăng bài vẫn là bạn."
    },
    "summary": {
      "keyIdea": "AI gom giúp mọi chỗ có thể sai vào một danh sách; bạn là người đối chiếu với nguồn.",
      "formula": "Bài viết → danh sách số, ngày, tên → đối chiếu từng mục → ghi người xác nhận → đăng.",
      "commonMistake": "Tin danh sách của AI là đủ và không tự dò lại xem còn con số nào bị sót.",
      "action": "Với bài kế tiếp, lập danh sách số và tên riêng trước khi bấm đăng."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Lấy một bài bạn đã viết trong tháng này (bản tin, email toàn công ty hoặc bài đăng). Nhờ AI liệt kê mọi con số, ngày và tên riêng kèm câu chứa chúng. Đếm lại bằng mắt xem có sót không, rồi đối chiếu ít nhất năm mục với tài liệu gốc của công ty và ghi nguồn cạnh mỗi mục.",
      "secondary": "Ghi lại chỗ suýt sai (nếu có): loại lỗi đó sẽ là dòng đầu của bảng soát của bạn."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Sáng thứ Năm bạn hoàn thành bài cho bản tin tháng, đọc lại thấy trôi chảy. Nhưng trong bài có mười hai con số và chín cái tên, và mắt bạn đã quen nên không còn thấy chỗ nào lạ nữa. Bài này dạy cách làm cho những chỗ đó nổi lên trước khi độc giả tìm ra chúng."
      },
      {
        "type": "feynman",
        "title": "Soát bài đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới người thủ quỹ đếm tiền cuối ngày. Họ không nhìn cả tủ tiền rồi nói \"có vẻ đủ\"; họ trải từng xấp ra bàn, đếm từng xấp, và đối chiếu với sổ.",
        "columns": [
          "Thành phần",
          "Đếm tiền cuối ngày",
          "Soát bài trước khi đăng"
        ],
        "rows": [
          [
            "Thứ cần đếm",
            "Từng xấp tiền",
            "Từng con số, ngày và tên riêng"
          ],
          [
            "Người trải ra bàn",
            "Người phụ đếm nhanh",
            "AI liệt kê thành danh sách"
          ],
          [
            "Cái để đối chiếu",
            "Sổ quỹ",
            "Báo cáo, hồ sơ, nguồn của công ty"
          ],
          [
            "Người chịu trách nhiệm",
            "Thủ quỹ ký tên",
            "Bạn ghi tên người xác nhận"
          ]
        ],
        "oneLiner": "AI trải các xấp tiền ra bàn cho gọn; đối chiếu với sổ và ký tên vẫn là việc của bạn."
      },
      {
        "type": "heading",
        "text": "Vì sao mắt bạn bỏ sót chính bài của mình"
      },
      {
        "type": "paragraph",
        "text": "Khi tự đọc lại bài mình viết, não điền chỗ trống bằng điều nó đã biết. Con số 12% bạn định gõ thành 21% vẫn trông \"đúng\" vì bạn nhớ mình nghĩ tới 12%. Danh sách tách con số ra khỏi câu văn nên buộc bạn nhìn từng mục như người lạ."
      },
      {
        "type": "flow",
        "title": "Từ bài nháp tới bản đã soát",
        "steps": [
          {
            "label": "Đưa AI bài viết",
            "detail": "Dán bài đã viết xong, chưa cần chỉnh giọng văn. Nếu bài chứa dữ liệu nội bộ, dùng công cụ công ty cho phép."
          },
          {
            "label": "Nhờ liệt kê",
            "detail": "Yêu cầu bảng ba cột: mục cần soát, câu chứa nó, loại (con số, ngày, tên người, tên đơn vị). Bảo AI không được sửa hay đoán thêm."
          },
          {
            "label": "Tự đếm lại",
            "detail": "Đọc bài một lượt và tự kiểm xem có mục nào AI bỏ sót hoặc gộp nhầm không, nhất là các cách nói như \"gần gấp đôi\"."
          },
          {
            "label": "Đối chiếu nguồn",
            "detail": "Mở báo cáo, hồ sơ, danh sách nhân sự của công ty; so từng mục. Không có nguồn thì đánh dấu để hỏi người phụ trách."
          },
          {
            "label": "Ghi và sửa",
            "detail": "Ghi nguồn, người xác nhận, ngày. Sửa chỗ sai trong bài rồi mới đăng."
          }
        ]
      },
      {
        "type": "heading",
        "text": "Nhờ AI làm bảng, đừng nhờ AI phán đúng sai"
      },
      {
        "type": "paragraph",
        "text": "Có hai cách giao việc nghe gần giống nhau. \"Liệt kê mọi con số\" là việc đọc và trích, AI làm khá tốt. \"Con số nào sai\" là việc cần nguồn mà AI không có, nên nó sẽ trả lời theo cảm giác. Giữ yêu cầu ở cách thứ nhất."
      },
      {
        "type": "list",
        "items": [
          "Yêu cầu bảng: mục cần soát, câu chứa nó, loại mục.",
          "Dặn rõ: không sửa, không thêm, không đoán con số còn thiếu.",
          "Đưa cả cách nói về lượng như \"gần gấp đôi\", \"đa số\", \"hàng trăm\" vào danh sách.",
          "Thêm hai cột của bạn: nguồn và người xác nhận."
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Nhờ liệt kê (nên)",
          "text": "\"Liệt kê mọi con số, ngày và tên riêng trong bài kèm câu chứa chúng, không sửa gì.\" Kết quả là danh sách bạn tự đối chiếu, việc AI làm tốt."
        },
        "right": {
          "label": "Nhờ phán đúng sai (tránh)",
          "text": "\"Kiểm tra giúp mình bài này có sai số liệu không.\" AI không có báo cáo của công ty nên sẽ trả lời theo cảm giác, có khi nói \"bài ổn\" khi còn sai."
        }
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Soát danh sách AI vừa liệt kê",
        "task": "Bài của bạn có đoạn: \"Trong quý ba, phòng Kinh doanh do anh Hùng phụ trách đạt khoảng 120% chỉ tiêu. Phòng Chăm sóc khách hàng của chị Mai xử lý gần 800 phiếu mỗi tháng.\" Bạn nhờ AI liệt kê những gì cần soát. Đánh dấu chỗ AI tự thêm.",
        "segments": [
          {
            "text": "Tên người: anh Hùng (phụ trách phòng Kinh doanh)."
          },
          {
            "text": "Con số: khoảng 120% chỉ tiêu quý ba."
          },
          {
            "text": "Tên người: chị Mai (phòng Chăm sóc khách hàng)."
          },
          {
            "text": "Con số: 800 phiếu, đã được xác nhận bởi hệ thống hỗ trợ khách hàng.",
            "error": "Bài chỉ viết \"gần 800 phiếu\" và không nói ai xác nhận. AI làm tròn thành 800 và tự thêm nguồn để danh sách trông chắc chắn."
          },
          {
            "text": "Con số: doanh thu phòng Kinh doanh quý ba là 4,2 tỷ đồng.",
            "error": "Trong đoạn văn không có con số doanh thu nào. AI thêm một con số nghe hợp lý, nếu không soát kỹ nó sẽ lọt vào bản đăng."
          },
          {
            "text": "Mốc thời gian: quý ba."
          }
        ]
      },
      {
        "type": "callout",
        "label": "Lưu ý về nguồn",
        "text": "Danh sách của AI chỉ cho bạn biết cần soát gì, không cho biết con số đúng hay sai. Nếu công ty chưa có báo cáo hay hồ sơ nào để đối chiếu, hãy hỏi người phụ trách thay vì tin con số vì nó nghe hợp lý."
      },
      {
        "type": "scenario",
        "title": "Mười phút trước giờ đăng bản tin",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bản tin phải đăng lúc 10 giờ. Bạn có danh sách 12 mục do AI liệt kê, còn 10 phút. Mục số 7 ghi \"chi phí đào tạo giảm 8%\" và bạn không nhớ số này lấy từ đâu.",
            "choices": [
              {
                "label": "Giữ nguyên vì 8% nghe rất bình thường",
                "next": "bad_keep"
              },
              {
                "label": "Hỏi nhanh anh kế toán số 8% lấy từ báo cáo nào",
                "next": "s2"
              }
            ]
          },
          "bad_keep": {
            "text": "Bản tin đăng đúng giờ. Chiều hôm sau, kế toán trưởng nhắn: chi phí đào tạo chỉ giảm 3%, con số 8% là của một hạng mục khác. Bạn phải đăng đính chính.",
            "ending": "bad"
          },
          "s2": {
            "text": "Anh kế toán trả lời: 8% là mức giảm của riêng hạng mục thuê giảng viên, cả chi phí đào tạo giảm 3%. Còn 4 phút.",
            "choices": [
              {
                "label": "Sửa câu trong bài thành \"hạng mục thuê giảng viên giảm 8%\", ghi người xác nhận rồi đăng",
                "next": "good"
              },
              {
                "label": "Xoá luôn câu này và mọi con số khác cho khỏi rủi ro",
                "next": "bad_empty"
              }
            ]
          },
          "bad_empty": {
            "text": "Bài đăng không còn sai, nhưng cũng không còn ý nào để đọc: bản tin chỉ còn những câu chung chung mà không ai nhớ.",
            "ending": "bad"
          },
          "good": {
            "text": "Bản tin đăng đúng giờ, con số nói đúng phạm vi của nó. Trong bảng soát có dòng ghi tên anh kế toán và ngày xác nhận, hôm sau có người hỏi bạn mở ra trả lời được ngay.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Mỗi con số và tên riêng là một chỗ có thể sai, nên đưa chúng ra khỏi câu văn để soát từng cái.",
          "Bài sau: đòi nguồn từ AI và tự mở nguồn đó ra đọc."
        ]
      }
    ]
  },
  {
    "id": 2211,
    "slug": "kiem-chung-hoi-ai-nguon-va-khong-tin-nguon-do-ai-bia",
    "title": "Chặng 40, Bài 12: Đòi nguồn từ AI và vì sao phải tự mở nguồn đọc",
    "subtitle": "Một tên bài báo và một đường dẫn trông rất thật vẫn có thể chưa từng tồn tại.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "track": "personal",
    "isFundamental": false,
    "emoji": "🔗",
    "whyItMatters": "Khi bạn hỏi nguồn, AI thường đưa ngay tên bài, tên tổ chức và đường dẫn, nghe rất đúng. Nếu bạn chép nó vào bài mà chưa mở ra đọc, cả bài đứng trên một nguồn có thể không tồn tại hoặc không hề nói điều đó. Thói quen mở trang gốc mất khoảng hai phút cho mỗi nguồn và là cách duy nhất để biết.",
    "openingQuestion": "AI trả lời về xu hướng làm việc từ xa, kèm \"nguồn: báo cáo của một tổ chức nghiên cứu, mục 3.2\" và một đường dẫn. Bạn định dùng trong bài đăng nội bộ. Bước nào không thể bỏ?",
    "openingOptions": [
      "Mở đường dẫn và tìm đúng ý đó trong trang gốc",
      "Hỏi lại AI rằng nguồn này có chắc chắn thật hay không",
      "Dùng luôn vì AI đã ghi rõ cả mục 3.2 của báo cáo",
      "Chỉ giữ tên tổ chức, bỏ đường dẫn cho bài viết gọn"
    ],
    "correctOption": 0,
    "explanation": "Chỉ khi mở trang gốc bạn mới thấy nguồn có tồn tại không và có nói đúng điều AI kể không. Hỏi lại AI không phải kiểm chứng, vì nó có thể xác nhận luôn điều nó vừa bịa. Ghi rõ mục 3.2 làm nguồn nghe đáng tin hơn nhưng không chứng minh gì, vì chi tiết cụ thể là thứ AI viết rất trôi. Bỏ đường dẫn chỉ giấu đi dấu vết để người khác kiểm lại.",
    "diagram": [
      {
        "label": "AI đưa câu trả lời kèm nguồn",
        "arrow": true
      },
      {
        "label": "Bạn mở đường dẫn hoặc tìm tài liệu gốc",
        "arrow": true
      },
      {
        "label": "Tìm đúng ý đó trong trang gốc",
        "arrow": true
      },
      {
        "label": "Không có hoặc không khớp thì bỏ ý, có thì ghi nguồn thật"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: bộ phận nhân sự soạn bài về phúc lợi",
      "description": "Một nhân viên nhờ AI viết đoạn về lợi ích của chế độ làm việc linh hoạt và xin nguồn. AI đưa tên một bài nghiên cứu và đường dẫn. Khi mở ra, trang báo lỗi không tìm thấy; tìm theo tên bài thì không có bài nào như vậy. Nhân viên bỏ câu đó và viết lại dựa trên khảo sát nội bộ của công ty. Đây là tình huống minh hoạ, không nói về một công ty có thật."
    },
    "quiz": [
      {
        "question": "Vì sao AI có thể đưa ra tên bài báo và đường dẫn trông rất thật nhưng không tồn tại?",
        "options": [
          "Nó sinh ra chữ nghe hợp lý, gồm cả tên nguồn, không tra từ một kho nguồn có thật",
          "Vì đường dẫn đã bị xoá khỏi mạng sau khi AI đọc xong",
          "Vì AI cố tình đánh lừa người dùng để họ không kiểm tra nữa",
          "Vì các bài viết tiếng Việt thường không được đăng lên mạng"
        ],
        "correct": 0,
        "explanation": "AI tạo câu trả lời bằng cách dự đoán chữ tiếp theo, và một tên bài kèm đường dẫn có hình dạng quen thuộc nên nó viết ra rất trôi. Điều đó không có nghĩa là nó cố ý lừa; nó không phân biệt được nguồn thật với nguồn nghe hợp lý. Đường dẫn bị xoá cũng không phải nguyên nhân thường gặp."
      },
      {
        "question": "Bạn mở đường dẫn và thấy bài có thật, nhưng không có câu nào nói điều AI kể. Nên làm gì?",
        "options": [
          "Bỏ ý đó hoặc tìm nguồn khác thật sự nói điều ấy",
          "Giữ ý đó vì bài có cùng chủ đề nên chắc là gần đúng",
          "Ghi nguồn như cũ vì ít ai mở đường dẫn ra kiểm tra lại",
          "Sửa nội dung bài gốc cho khớp với câu AI đã nói cho đỡ mâu thuẫn"
        ],
        "correct": 0,
        "explanation": "Nguồn thật nhưng không nói điều đó vẫn là nguồn không chống đỡ được ý của bạn. Ghi nguồn ấy vào bài là gán cho người khác điều họ chưa nói. Cùng chủ đề không có nghĩa là cùng nội dung. Việc đúng là bỏ ý đó, hoặc tìm nguồn thật nói đúng điều ấy."
      },
      {
        "question": "Cách nào tốt hơn để nhờ AI hỗ trợ khi bạn cần nguồn cho một ý?",
        "options": [
          "Đưa tài liệu của bạn và nhờ nó chỉ ra đoạn nào trong đó nói ý ấy",
          "Hỏi thẳng \"nguồn của ý này là gì\" rồi chép câu trả lời",
          "Nhờ AI tự nghĩ ra nguồn phù hợp nhất với bài của bạn",
          "Không dùng AI cho mọi việc liên quan đến nguồn hay dữ liệu vì AI chưa bao giờ đọc nguồn"
        ],
        "correct": 0,
        "explanation": "Khi bạn đưa sẵn tài liệu thật, AI chỉ việc tìm và trích đoạn có trong đó, việc này khá đáng tin và bạn kiểm được ngay bằng mắt. Hỏi nguồn khi không đưa gì là mời nó nghĩ ra một cái. Bỏ hẳn AI thì phí phần nó làm tốt: đọc nhanh tài liệu dài."
      },
      {
        "question": "Bạn hỏi lại AI: \"Nguồn này có thật không?\" và nó đáp \"Có, đây là nguồn đáng tin cậy\". Kết luận nào đúng?",
        "options": [
          "Câu đáp chưa chứng minh gì, phải tự mở nguồn",
          "Nguồn coi như đã được kiểm chứng vì AI đã xác nhận",
          "Nguồn chắc chắn giả vì AI phải nói có mới đúng",
          "Chỉ cần hỏi thêm một lần nữa là đủ chắc chắn cho chắc"
        ],
        "correct": 0,
        "explanation": "AI trả lời cùng cách với mọi câu khác: bằng chữ nghe hợp lý. Nó có thể xác nhận một nguồn nó vừa bịa. Vì thế câu đáp không thay được việc mở trang gốc. Cũng không thể kết luận ngược lại rằng nguồn chắc chắn giả; nguồn có thể thật, chỉ là bạn chưa biết cho tới khi mở ra đọc."
      },
      {
        "question": "Trong bài đăng nội bộ, bạn nên ghi nguồn cho một con số như thế nào?",
        "options": [
          "Tên tài liệu thật bạn đã mở, mục hoặc trang chứa số và ngày xem",
          "Cụm \"theo nghiên cứu gần đây\" để không cần nêu tên cụ thể nên bài có vẻ tin cậy hơn",
          "Tên AI đã trả lời, như \"theo ChatGPT\" hoặc \"theo Gemini\"",
          "Đường dẫn AI đưa, dù bạn chưa mở ra kịp trước giờ đăng"
        ],
        "correct": 0,
        "explanation": "Nguồn tốt là thứ người khác đi theo được: tài liệu, mục hoặc trang, ngày xem. \"Theo nghiên cứu gần đây\" không cho ai chỗ để kiểm. AI không phải nguồn vì nó không tự có dữ kiện mới, và đường dẫn chưa mở là chỉ một lời hứa chưa được thử."
      }
    ],
    "keyTakeaways": [
      "Nguồn AI đưa ra có thể là chữ nghe hợp lý chứ không phải một tài liệu có thật.",
      "Hỏi lại AI rằng nguồn có thật không không phải là kiểm chứng.",
      "Tự mở nguồn, tìm đúng ý trong trang gốc; không thấy thì bỏ ý.",
      "Đưa tài liệu thật cho AI và nhờ nó chỉ ra đoạn liên quan, đáng tin hơn hỏi nguồn trơn."
    ],
    "practicePrompt": {
      "question": "AI đưa nguồn cho ý \"nhân viên hài lòng hơn khi được chọn giờ làm\". Bạn mở đường dẫn: trang không tìm thấy. Việc hợp lý nhất là gì?",
      "options": [
        "Tìm tên bài trên trang tìm kiếm; không có thì bỏ câu hoặc thay bằng khảo sát nội bộ",
        "Giữ câu vì lỗi trang có thể chỉ là tạm thời và nguồn vẫn có thật",
        "Ghi nguồn không kèm đường dẫn để không ai bắt bẻ được",
        "Nhờ AI đưa một đường dẫn khác và dùng cái mở được đầu tiên"
      ],
      "correct": 0,
      "explanation": "Trang không mở được chưa kết luận là nguồn giả, nên tìm thêm bằng tên bài; nếu vẫn không thấy, bạn không có gì để dựa vào, và câu đó phải bỏ hoặc đổi sang dữ liệu bạn có. Giữ câu vì \"có thể tạm thời\" là đặt cược. Bỏ đường dẫn là giấu chứ không giải quyết. Lấy đường dẫn AI đưa tiếp theo mà chỉ cần mở được thì vẫn chưa biết trang có nói điều đó."
    },
    "summary": {
      "keyIdea": "Nguồn AI đưa là lời gợi ý cần kiểm chứng, không phải bằng chứng.",
      "formula": "Xin nguồn → tự mở trang gốc → tìm đúng ý → khớp thì ghi tên tài liệu và ngày, không khớp thì bỏ ý.",
      "commonMistake": "Hỏi lại AI rằng nguồn có thật không rồi coi câu đáp là bằng chứng.",
      "action": "Lần tới AI đưa nguồn, dành hai phút mở từng nguồn trước khi chép vào bài."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn một ý bạn hay dùng trong công việc (một xu hướng, một số liệu ngành). Hỏi AI về ý đó và xin nguồn. Với từng nguồn nó đưa, mở ra và tìm đúng câu nói ý ấy. Ghi lại bảng ba cột: nguồn AI đưa, có mở được không, có nói đúng ý không.",
      "secondary": "Đếm xem bao nhiêu nguồn qua được cả hai bước; con số đó là mức tin cậy thực tế của công cụ bạn đang dùng với việc của bạn."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bạn hỏi AI một câu về xu hướng ngành, nó trả lời trôi chảy và ghi cả tên báo cáo lẫn đường dẫn. Trông rất đáng tin, và chính vì thế bạn dễ chép vào bài mà không mở ra xem. Bài này luyện thói quen ngược lại."
      },
      {
        "type": "feynman",
        "title": "Nguồn của AI đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới một người chỉ đường rất chắc chắn. Họ nói: \"Đi thẳng, rẽ trái ở quán cà phê, nhà số 12\". Nghe rành rọt, nhưng bạn chỉ biết nhà số 12 có thật khi đi tới tận nơi và bấm chuông.",
        "columns": [
          "Thành phần",
          "Người chỉ đường",
          "Nguồn AI đưa"
        ],
        "rows": [
          [
            "Điều họ nói",
            "Địa chỉ nghe rất cụ thể",
            "Tên bài, mục, đường dẫn nghe rất cụ thể"
          ],
          [
            "Có thể sai vì",
            "Nhớ nhầm hoặc đoán cho khỏi mất mặt",
            "Sinh chữ nghe hợp lý chứ không tra kho nguồn"
          ],
          [
            "Cách kiểm",
            "Đi tới nơi, nhìn số nhà",
            "Mở trang gốc, tìm đúng ý"
          ],
          [
            "Kết luận khi không thấy",
            "Không có nhà đó, hỏi lại",
            "Không có nguồn đó, bỏ ý"
          ]
        ],
        "oneLiner": "Địa chỉ AI đưa chỉ có giá trị sau khi bạn đã đi tới tận nơi và tự nhìn thấy."
      },
      {
        "type": "heading",
        "text": "Ba kết quả khi bạn mở nguồn"
      },
      {
        "type": "paragraph",
        "text": "Khi mở nguồn, bạn gặp một trong ba trường hợp: nguồn không tồn tại, nguồn có thật nhưng không nói điều đó, hoặc nguồn có thật và nói đúng. Chỉ trường hợp thứ ba cho bạn quyền ghi nguồn. Hai trường hợp đầu nghĩa là ý đó đang chưa có gì chống đỡ, và bạn phải bỏ hoặc tìm chỗ dựa khác."
      },
      {
        "type": "flow",
        "title": "Mở nguồn đúng cách",
        "steps": [
          {
            "label": "Xin nguồn cụ thể",
            "detail": "Yêu cầu tên tài liệu, tổ chức phát hành, mục hoặc trang. Đặt thêm điều kiện: nếu không chắc, hãy nói không chắc thay vì đoán."
          },
          {
            "label": "Tự tìm tài liệu",
            "detail": "Mở đường dẫn, hoặc gõ tên tài liệu vào trang tìm kiếm. Đường dẫn AI đưa có thể sai dù tên tài liệu có thật."
          },
          {
            "label": "Tìm đúng ý",
            "detail": "Đọc mục được nhắc tới và tìm câu nói đúng điều trong bài của bạn. Chủ đề gần giống chưa đủ."
          },
          {
            "label": "Quyết định",
            "detail": "Khớp thì ghi tên tài liệu, mục và ngày xem. Không khớp hoặc không thấy thì bỏ ý hoặc đổi sang dữ liệu bạn có."
          }
        ]
      },
      {
        "type": "heading",
        "text": "Cách hỏi AI tốt hơn"
      },
      {
        "type": "paragraph",
        "text": "Thay vì hỏi \"nguồn ở đâu\", đưa cho AI tài liệu thật (báo cáo, biên bản, số liệu công ty) rồi hỏi \"đoạn nào trong tài liệu này nói về việc ...\". Lúc đó AI trích từ thứ bạn đã đưa, và bạn kiểm ngay được bằng mắt."
      },
      {
        "type": "list",
        "items": [
          "Chỉ tin nguồn sau khi tự mở và thấy đúng ý trong đó.",
          "Không tìm thấy thì bỏ ý, đừng giữ ý và giấu nguồn.",
          "Ưu tiên tài liệu của công ty hoặc tài liệu bạn đã có trong tay.",
          "Ghi tên tài liệu, mục và ngày xem trong bài hoặc bảng soát."
        ]
      },
      {
        "type": "callout",
        "label": "Đừng hỏi AI để kiểm AI",
        "text": "Hỏi \"nguồn này có thật không\" là bắt AI tự chấm bài của nó. Câu đáp vẫn được sinh ra theo cùng cách, nên chưa phải bằng chứng. Việc kiểm phải nằm ở nơi ngoài AI: trang gốc, tài liệu công ty, người phụ trách."
      },
      {
        "type": "scenario",
        "title": "Nguồn trơn cho bài về làm việc linh hoạt",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn soạn bài cho bản tin nhân sự. AI viết: \"Các nghiên cứu cho thấy làm việc linh hoạt làm tăng sự hài lòng\" và đưa tên một báo cáo cùng đường dẫn. Bài đăng lúc 11 giờ, còn 30 phút.",
            "choices": [
              {
                "label": "Chép nguồn vào bài, không mở vì đã sát giờ",
                "next": "bad_copy"
              },
              {
                "label": "Mở đường dẫn ra xem",
                "next": "s2"
              }
            ]
          },
          "bad_copy": {
            "text": "Bài đăng đúng giờ. Một trưởng phòng bấm vào đường dẫn, trang báo lỗi. Họ hỏi lại bạn báo cáo ấy ở đâu và bạn không có gì để trả lời.",
            "ending": "bad"
          },
          "s2": {
            "text": "Trang mở được và có một báo cáo, nhưng bạn tìm hoài không thấy câu nào nói về sự hài lòng của nhân viên; báo cáo bàn về chi phí văn phòng.",
            "choices": [
              {
                "label": "Vẫn ghi nguồn đó vì báo cáo cùng chủ đề làm việc linh hoạt",
                "next": "bad_close"
              },
              {
                "label": "Bỏ câu \"các nghiên cứu cho thấy\", thay bằng kết quả khảo sát nội bộ mà phòng bạn đang có",
                "next": "good"
              }
            ]
          },
          "bad_close": {
            "text": "Bài gán cho báo cáo một điều nó không nói. Người trong ban giám đốc đọc kỹ thấy sai và cả bản tin mất uy tín vì một câu.",
            "ending": "bad"
          },
          "good": {
            "text": "Bài chỉ nói điều công ty có bằng chứng, kèm tên khảo sát và tháng thực hiện. Bạn cũng ghi vào bảng soát: nguồn AI đưa không khớp, đã bỏ.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Nguồn AI đưa chỉ là gợi ý; nguồn bạn đã mở và thấy đúng ý mới là bằng chứng.",
          "Bài sau: tìm những câu khẳng định quá mạnh trong chính bài của bạn."
        ]
      }
    ]
  },
  {
    "id": 2212,
    "slug": "kiem-chung-tim-cau-khang-dinh-qua-muc-trong-bai",
    "title": "Chặng 40, Bài 13: Tìm câu khẳng định quá mạnh trong bài của chính mình",
    "subtitle": "\"Số một\", \"chắc chắn\", \"luôn luôn\": những chữ nghe mạnh nhưng ít khi có bằng chứng đi kèm.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "track": "personal",
    "isFundamental": false,
    "emoji": "📣",
    "whyItMatters": "Khi viết về công ty mình, người ta dễ dùng những chữ tuyệt đối vì chúng nghe có sức nặng. Nhưng mỗi chữ như \"số một\" hay \"chắc chắn\" là một lời hứa mà người đọc có quyền kiểm lại. AI giúp bạn tìm ra mọi câu như vậy trong vài giây, còn việc giữ hay hạ giọng thì dựa trên bằng chứng của công ty, và chỉ bạn quyết được.",
    "openingQuestion": "Bài giới thiệu dịch vụ của bạn có câu \"Chúng tôi là đơn vị số một, luôn giao đúng hẹn\". Bạn nhờ AI soát. Bạn nên nhờ nó làm gì?",
    "openingOptions": [
      "Liệt kê các câu tuyệt đối để bạn đối chiếu với bằng chứng",
      "Viết lại cho hay hơn và mạnh hơn nữa để thuyết phục khách",
      "Thêm vài con số ấn tượng để câu văn có vẻ đáng tin hơn",
      "Xoá mọi tính từ mạnh khỏi bài cho an toàn tuyệt đối"
    ],
    "correctOption": 0,
    "explanation": "Việc đúng là nhờ AI tìm và liệt kê, vì nhận ra chữ tuyệt đối là việc đọc mà AI làm nhanh. Còn giữ hay bỏ thì tùy bằng chứng công ty có, mà AI không biết. Nhờ viết mạnh hơn là làm ngược mục tiêu. Nhờ thêm số ấn tượng thì AI sẽ bịa số. Xoá hết tính từ mạnh làm bài mất đặc điểm và cũng bỏ luôn những câu thật sự có bằng chứng.",
    "diagram": [
      {
        "label": "Bài viết có nhiều câu nghe mạnh",
        "arrow": true
      },
      {
        "label": "AI liệt kê câu tuyệt đối, kèm chữ gây ra",
        "arrow": true
      },
      {
        "label": "Bạn hỏi: công ty có bằng chứng nào cho câu này",
        "arrow": true
      },
      {
        "label": "Có thì giữ và ghi nguồn; không thì hạ giọng hoặc bỏ"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: đội marketing của một công ty giao nhận",
      "description": "Đội viết trang giới thiệu có câu \"nhanh nhất thành phố\". Khi liệt kê các câu tuyệt đối, cả đội nhận ra công ty chỉ có số liệu thời gian giao trung bình của chính mình, không có dữ liệu so với đơn vị khác. Họ đổi thành câu dựa trên số liệu của mình, kèm tháng đo. Đây là tình huống minh hoạ, không phải một công ty có thật."
    },
    "quiz": [
      {
        "question": "Câu nào trong các câu sau là câu khẳng định quá mức cần soát?",
        "options": [
          "\"Sản phẩm của chúng tôi luôn được khách hàng ưa chuộng nhất.\"",
          "\"Quý ba, phòng chúng tôi giao 320 đơn, theo báo cáo nội bộ.\"",
          "\"Khảo sát tháng 9 của công ty cho điểm hài lòng trung bình 4,2 trên 5.\"",
          "\"Chúng tôi đang mở thêm một điểm nhận hàng trong tháng tới.\""
        ],
        "correct": 0,
        "explanation": "Câu đầu chứa \"luôn\" và \"nhất\": hai chữ tuyệt đối mà công ty khó có bằng chứng, nhất là so với tất cả đối thủ. Các câu còn lại nói việc cụ thể có nguồn hoặc kế hoạch, người đọc kiểm được bằng báo cáo hoặc chờ xem."
      },
      {
        "question": "Với câu \"chắc chắn giảm chi phí\", cách sửa nào đúng hơn cả?",
        "options": [
          "Nêu điều đã đo: \"giúp phòng A giảm chi phí giấy in 10% trong tháng thử nghiệm\"",
          "Đổi \"chắc chắn\" thành \"nhất định\" cho câu có vẻ mềm mại hơn và giữ nguyên lời hứa bên trong",
          "Giữ nguyên và thêm dấu chấm than để nhấn mạnh sự tin tưởng",
          "Xoá cả câu khỏi bài vì mọi lời hứa đều tiềm ẩn rủi ro"
        ],
        "correct": 0,
        "explanation": "Cách sửa tốt thay lời hứa chung bằng kết quả đã đo, có phạm vi và thời gian; người đọc vừa thấy giá trị, vừa kiểm được. Đổi \"chắc chắn\" thành \"nhất định\" chỉ là đổi chữ mà vẫn hứa. Dấu chấm than làm mạnh hơn. Xoá cả câu thì mất thông tin có ích mà công ty thật sự có."
      },
      {
        "question": "Vì sao nên nhờ AI liệt kê câu tuyệt đối thay vì nhờ AI viết lại bài cho \"đúng sự thật\"?",
        "options": [
          "AI không biết sự thật của công ty; nó chỉ tìm được câu, còn bằng chứng do bạn có",
          "Vì AI viết lại bài thì tốn nhiều thời gian hơn so với liệt kê",
          "Vì AI chỉ liệt kê được, không có khả năng viết lại văn bản",
          "Vì bài viết lại bởi AI thì luật cấm không cho đăng lên nữa"
        ],
        "correct": 0,
        "explanation": "Sự thật về công ty nằm ở báo cáo, dữ liệu và người phụ trách của bạn, AI không có những thứ đó. Nếu bảo nó viết lại \"cho đúng\", nó sẽ tự điền lại điều nghe hợp lý. AI vẫn viết lại được văn bản và không có quy tắc cấm đăng bài AI hỗ trợ; vấn đề là nó không biết câu nào có bằng chứng."
      },
      {
        "question": "Đối thủ chưa bao giờ công bố dữ liệu, còn công ty bạn muốn viết \"tốt hơn mọi đối thủ\". Việc hợp lý nhất là gì?",
        "options": [
          "Bỏ so sánh, chỉ nói điểm mạnh công ty đo được",
          "Giữ câu vì không ai chứng minh được điều ngược lại",
          "Dùng \"gần như tốt hơn mọi đối thủ\" để giảm bớt rủi ro",
          "Nhờ AI tìm dữ liệu chứng minh công ty hơn đối thủ"
        ],
        "correct": 0,
        "explanation": "Nếu không có dữ liệu để so sánh, câu đó không có gì đỡ. Việc \"không ai chứng minh được điều ngược lại\" là gánh nặng đặt sai chỗ: người viết mới là người phải có bằng chứng. Thêm chữ \"gần như\" chỉ làm nhẹ giọng mà vẫn không có gì đỡ. Nhờ AI tìm dữ liệu là mời nó bịa."
      },
      {
        "question": "Trong bản liệt kê câu tuyệt đối, có câu \"phòng chúng tôi chưa từng trễ hạn trong quý ba\". Công ty có bảng theo dõi hạn nộp đầy đủ. Nên làm gì?",
        "options": [
          "Đối chiếu với bảng theo dõi; nếu khớp thì giữ và ghi nguồn",
          "Xoá ngay vì mọi câu có chữ \"chưa từng\" đều quá mạnh",
          "Giữ nguyên vì AI đã liệt kê mà không nói câu đó sai",
          "Đổi thành \"hiếm khi trễ hạn\" cho chắc ăn trong mọi trường hợp"
        ],
        "correct": 0,
        "explanation": "Chữ tuyệt đối không tự động là sai; nó chỉ cần bằng chứng. Ở đây công ty có bảng theo dõi, nên đối chiếu, nếu khớp thì câu mạnh này giữ được và mạnh nhờ có nguồn. AI liệt kê câu không có nghĩa nó xác nhận câu đúng. Đổi thành \"hiếm khi\" khi dữ liệu nói chưa từng là làm yếu đi điều thật."
      }
    ],
    "keyTakeaways": [
      "Chữ như \"số một\", \"chắc chắn\", \"luôn\", \"mọi\" là lời hứa người đọc có quyền kiểm.",
      "Nhờ AI liệt kê câu tuyệt đối; bạn quyết giữ hay bỏ theo bằng chứng của công ty.",
      "Có bằng chứng thì giữ và ghi nguồn; không có thì nêu điều đã đo hoặc hạ giọng.",
      "Đừng bảo AI \"thêm số liệu cho đáng tin\": nó sẽ bịa."
    ],
    "practicePrompt": {
      "question": "Bạn có số liệu: tháng 9 công ty giao trung bình 1,8 ngày, chưa có dữ liệu của bên khác. Câu nào nên dùng trong bài?",
      "options": [
        "\"Tháng 9, thời gian giao trung bình của chúng tôi là 1,8 ngày.\"",
        "\"Chúng tôi là đơn vị giao hàng nhanh nhất hiện nay.\"",
        "\"Chúng tôi giao nhanh hơn gần như mọi đơn vị trên thị trường, dù chưa so sánh.\"",
        "\"Giao hàng nhanh là điều chắc chắn với mọi đơn của quý khách.\""
      ],
      "correct": 0,
      "explanation": "Câu đúng chỉ nói điều đã đo: con số, thời gian, chủ thể là công ty. Ba câu còn lại đều so sánh hoặc hứa mà công ty không có dữ liệu: \"nhanh nhất\" và \"hơn gần như mọi đơn vị\" cần số liệu của bên khác, còn \"mọi đơn\" là lời hứa tuyệt đối vượt quá một con số trung bình."
    },
    "summary": {
      "keyIdea": "Mỗi câu tuyệt đối trong bài là một lời hứa; giữ nó chỉ khi có bằng chứng của công ty.",
      "formula": "Bài → AI liệt kê câu tuyệt đối → hỏi \"bằng chứng đâu\" → giữ kèm nguồn, hoặc thay bằng điều đã đo.",
      "commonMistake": "Nhờ AI viết mạnh hơn hoặc thêm số liệu, khiến bài có thêm những lời hứa không có gì đỡ.",
      "action": "Lấy bài giới thiệu gần nhất của bạn, gạch dưới mọi chữ \"nhất\", \"luôn\", \"mọi\", \"chắc chắn\"."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Lấy trang giới thiệu, email chào hàng hoặc bài đăng gần nhất của bạn. Nhờ AI liệt kê mọi câu có chữ tuyệt đối. Với từng câu, ghi công ty có bằng chứng gì (báo cáo, số đo, phản hồi) và quyết định giữ, sửa hay bỏ.",
      "secondary": "Với câu giữ lại, ghi luôn tên tài liệu bằng chứng cạnh câu đó."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bạn viết trang giới thiệu cho phòng mình và thấy nó hơi nhạt, nên thêm vài chữ cho có lực: \"số một\", \"luôn luôn\", \"chắc chắn\". Đọc lại thấy thuyết phục. Nhưng hãy hỏi thử: nếu khách hàng hỏi \"bằng chứng đâu\", bạn mở ra được gì?"
      },
      {
        "type": "feynman",
        "title": "Câu khẳng định mạnh đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới tấm biển trước quán: \"Phở ngon nhất phố\". Ai đọc cũng biết đó là quảng cáo. Nhưng trong bản tin công ty hay email gửi khách, người ta đọc chữ \"nhất\" như một sự thật đã được kiểm chứng.",
        "columns": [
          "Thành phần",
          "Biển quảng cáo quán phở",
          "Câu trong bài của công ty"
        ],
        "rows": [
          [
            "Người đọc hiểu là",
            "Lời quảng cáo vui",
            "Thông tin công ty đứng ra bảo đảm"
          ],
          [
            "Chữ mạnh",
            "\"Ngon nhất phố\"",
            "\"Số một\", \"luôn\", \"chắc chắn\""
          ],
          [
            "Cần bằng chứng?",
            "Ít ai đòi",
            "Khách, đối tác, sếp đều có thể đòi"
          ],
          [
            "Chỗ dựa tốt hơn",
            "Đông khách mỗi trưa",
            "Con số đã đo kèm tháng và nguồn"
          ]
        ],
        "oneLiner": "Chữ mạnh chỉ đứng vững khi có bằng chứng của công ty đứng sau nó."
      },
      {
        "type": "heading",
        "text": "Những chữ nên để ý"
      },
      {
        "type": "paragraph",
        "text": "Không phải câu nào có chữ mạnh cũng sai. Nhưng nhóm chữ sau luôn đáng dừng lại hỏi một câu: chỉ tiêu tuyệt đối (\"luôn\", \"không bao giờ\", \"mọi\"), xếp hạng (\"số một\", \"tốt nhất\", \"hàng đầu\"), và độ chắc chắn (\"chắc chắn\", \"cam kết\", \"đảm bảo\")."
      },
      {
        "type": "flow",
        "title": "Soát câu khẳng định trong bốn bước",
        "steps": [
          {
            "label": "Nhờ AI liệt kê",
            "detail": "Dán bài và yêu cầu liệt kê mọi câu chứa chữ tuyệt đối, xếp hạng hoặc cam kết, kèm chữ gây ra và không được sửa gì."
          },
          {
            "label": "Hỏi bằng chứng",
            "detail": "Với từng câu, tự hỏi: công ty có báo cáo, số đo, phản hồi nào chứng minh câu này không? Ai giữ tài liệu đó?"
          },
          {
            "label": "Chọn cách xử lý",
            "detail": "Có bằng chứng thì giữ và ghi nguồn. Có một phần thì đổi thành điều đã đo. Không có gì thì bỏ hoặc hạ giọng."
          },
          {
            "label": "Đọc lại toàn bài",
            "detail": "Sau khi sửa, đọc lại: bài vẫn phải có sức nặng, nhưng mỗi chỗ nặng đều có thứ để dựa vào."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI tìm câu khẳng định quá mạnh",
        "task": "Bạn có đoạn giới thiệu dịch vụ dài ba câu chứa \"số một\", \"luôn đúng hẹn\", \"chắc chắn hài lòng\". Lắp prompt để AI liệt kê những câu này cho bạn soát.",
        "parts": [
          {
            "id": "task",
            "label": "Việc cần làm",
            "options": [
              {
                "text": "Làm cho đoạn văn này thuyết phục hơn.",
                "feedback": "AI sẽ thêm chữ mạnh và số ấn tượng để thuyết phục, làm bài thêm nhiều lời hứa không có gì đỡ."
              },
              {
                "text": "Liệt kê mọi câu chứa chữ tuyệt đối, xếp hạng hoặc cam kết, kèm chữ gây ra.",
                "good": true,
                "feedback": "Đây là việc đọc và trích, AI làm nhanh, và kết quả là danh sách bạn tự soát với bằng chứng."
              }
            ]
          },
          {
            "id": "limit",
            "label": "Giới hạn",
            "options": [
              {
                "text": "Không sửa câu nào, không thêm số liệu, không đoán bằng chứng.",
                "good": true,
                "feedback": "Chặn được AI tự điền số liệu và tự viết lại; bạn nhận đúng danh sách gốc."
              },
              {
                "text": "Nếu thấy câu nào chưa đúng thì cứ sửa cho đúng.",
                "feedback": "AI không biết đúng hay sai theo dữ liệu công ty, nên nó sẽ sửa theo cảm giác và có thể tự bịa số liệu."
              }
            ]
          },
          {
            "id": "format",
            "label": "Định dạng",
            "options": [
              {
                "text": "Bảng ba cột: câu gốc, chữ gây ra, loại (tuyệt đối, xếp hạng, cam kết).",
                "good": true,
                "feedback": "Bảng cho bạn thêm cột bằng chứng và quyết định ngay bên cạnh."
              },
              {
                "text": "Viết một đoạn nhận xét chung về giọng văn của bài.",
                "feedback": "Nhận xét chung không chỉ ra câu nào cần đối chiếu, bạn phải đọc lại từ đầu."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "task",
              "limit",
              "format"
            ],
            "text": "| Câu gốc | Chữ gây ra | Loại |\n| Chúng tôi là đơn vị số một trong ngành. | số một | xếp hạng |\n| Chúng tôi luôn giao đúng hẹn. | luôn | tuyệt đối |\n| Quý khách chắc chắn hài lòng. | chắc chắn | cam kết |\n\n(Ba câu, không sửa, không thêm số liệu. Bạn còn phải tìm bằng chứng cho từng câu.)"
          },
          {
            "requires": [
              "task"
            ],
            "text": "Các câu có chữ mạnh: \"số một\", \"luôn giao đúng hẹn\", \"chắc chắn hài lòng\".\n\nGợi ý sửa: \"Chúng tôi là đơn vị hàng đầu, giao đúng hẹn 99,5% và 100% khách hài lòng.\"\n\n(AI tự thêm hai con số không hề có trong dữ liệu của bạn.)"
          },
          {
            "text": "Bản viết lại: \"Là đơn vị số một trong ngành, chúng tôi luôn giao đúng hẹn và cam kết mang lại sự hài lòng tuyệt đối cho mọi khách hàng!\"\n\n(Câu trở nên mạnh hơn, nhiều lời hứa hơn, không có gì đỡ.)"
          }
        ]
      },
      {
        "type": "callout",
        "label": "Người giữ bằng chứng",
        "text": "Trước khi giữ một câu mạnh, hãy biết ai giữ bằng chứng của nó: kế toán, phòng vận hành, bảng theo dõi. Nếu bạn không nói được, câu đó chưa sẵn sàng để đăng. Chuyện pháp lý như cam kết trong quảng cáo hoặc hợp đồng thì hỏi bộ phận pháp chế."
      },
      {
        "type": "scenario",
        "title": "Trang giới thiệu dịch vụ trước giờ gửi khách",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Sếp nhờ bạn hoàn thiện trang giới thiệu để gửi khách chiều nay. AI đã liệt kê ba câu mạnh: \"số một\", \"luôn đúng hẹn\", \"chắc chắn hài lòng\". Bạn còn một giờ.",
            "choices": [
              {
                "label": "Giữ cả ba câu vì chúng làm trang giới thiệu có sức nặng",
                "next": "bad_keep"
              },
              {
                "label": "Hỏi từng câu: công ty có bằng chứng nào, ai giữ",
                "next": "s2"
              }
            ]
          },
          "bad_keep": {
            "text": "Trang được gửi. Vài ngày sau khách phản hồi một đơn bị trễ và trích lại câu \"luôn đúng hẹn\" để khiếu nại. Sếp hỏi vì sao trang hứa điều công ty chưa từng bảo đảm.",
            "ending": "bad"
          },
          "s2": {
            "text": "Phòng vận hành có bảng theo dõi: quý vừa rồi, 94 trên 100 đơn đúng hẹn (số liệu minh hoạ). Không có dữ liệu nào về việc công ty có phải số một hay không.",
            "choices": [
              {
                "label": "Đổi \"luôn đúng hẹn\" thành \"quý vừa rồi, 94 trên 100 đơn đúng hẹn\", bỏ \"số một\" và \"chắc chắn hài lòng\"",
                "next": "good"
              },
              {
                "label": "Bỏ luôn cả đoạn giới thiệu cho khỏi rủi ro",
                "next": "bad_empty"
              }
            ]
          },
          "bad_empty": {
            "text": "Trang giới thiệu chỉ còn tên công ty và địa chỉ. Khách không có lý do nào để chọn bạn và sếp phải nhờ người viết lại từ đầu.",
            "ending": "bad"
          },
          "good": {
            "text": "Trang nói điều công ty làm được, kèm số đo và quý đo. Khi khách hỏi, bạn mở ngay bảng theo dõi của phòng vận hành để chứng minh.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Chữ mạnh chỉ nên đứng ở nơi có bằng chứng của công ty đứng sau.",
          "Bài sau: soạn thông cáo báo chí chỉ từ sự kiện có thật."
        ]
      }
    ]
  },
  {
    "id": 2213,
    "slug": "kiem-chung-viet-thong-cao-bao-chi-tu-du-lieu-that",
    "title": "Chặng 40, Bài 14: Soạn thông cáo báo chí từ sự kiện thật của công ty",
    "subtitle": "Thông cáo chỉ nói điều đã xảy ra, và người trong đó chưa nói thì AI không được nói thay.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "track": "personal",
    "isFundamental": false,
    "emoji": "📰",
    "whyItMatters": "Thông cáo báo chí là văn bản công ty đứng tên trước bên ngoài. Nếu AI thêm một câu trích lời của giám đốc mà giám đốc chưa hề nói, hoặc một con số hợp tác chưa ai chốt, công ty phải đính chính công khai. Đưa AI đúng dữ kiện (ai, làm gì, khi nào) và cấm nó thêm lời trích là cách dùng AI mà vẫn giữ được thông cáo trung thực.",
    "openingQuestion": "Công ty vừa ký hợp tác với một đối tác. Bạn đưa AI dữ kiện và nhờ soạn thông cáo. Trong bản nháp, câu nào cần gạch ra trước tiên?",
    "openingOptions": [
      "Lời trích dẫn của giám đốc mà chưa ai từng nói",
      "Câu mở đầu vì nó không có tính từ hoa mỹ nào cả",
      "Ngày ký kết vì bạn đã ghi ngày này trong dữ kiện",
      "Tên hai công ty vì bạn đã đưa AI đúng cả hai tên"
    ],
    "correctOption": 0,
    "explanation": "Lời trích là lời của một người thật, và nếu người đó chưa nói thì công ty đang đặt vào miệng họ điều họ chưa từng nói. AI viết lời trích rất trôi vì thông cáo nào cũng có lời trích, nên nó tự thêm. Câu mở đầu, ngày ký và tên hai công ty đều lấy từ dữ kiện bạn đưa, vẫn cần soát nhưng không phải là chỗ AI bịa thêm.",
    "diagram": [
      {
        "label": "Bạn chốt dữ kiện: ai, làm gì, khi nào, ở đâu",
        "arrow": true
      },
      {
        "label": "AI soạn thông cáo, cấm thêm lời trích và số liệu",
        "arrow": true
      },
      {
        "label": "Bạn soát từng câu với dữ kiện đã chốt",
        "arrow": true
      },
      {
        "label": "Người trong cuộc duyệt, rồi mới gửi ra ngoài"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: công ty phần mềm ký hợp tác",
      "description": "Phòng truyền thông đưa AI dữ kiện ngày ký, tên hai bên và phạm vi hợp tác. Bản nháp có câu trích lời tổng giám đốc: \"Sự hợp tác này sẽ mở ra kỷ nguyên mới\". Tổng giám đốc chưa nói câu đó và không muốn dùng. Nhóm gạch câu, để một chỗ trống cho lời trích thật, chờ tổng giám đốc gửi rồi mới điền. Đây là tình huống minh hoạ, không phải một công ty có thật."
    },
    "quiz": [
      {
        "question": "Phần nào của thông cáo báo chí AI không được tự viết?",
        "options": [
          "Lời trích dẫn của người thật, vì họ chưa nói",
          "Câu mở đầu nêu ai làm việc gì vào ngày nào",
          "Đoạn giới thiệu ngắn về công ty đã có sẵn trong hồ sơ",
          "Phần liên hệ để phóng viên hỏi thêm về thông cáo"
        ],
        "correct": 0,
        "explanation": "Lời trích là lời của một người cụ thể; AI viết được câu nghe giống họ nhưng đó không phải lời họ đã nói. Các phần còn lại (mở đầu, giới thiệu công ty, thông tin liên hệ) đến từ dữ kiện bạn đưa nên AI có thể soạn, miễn là bạn soát lại."
      },
      {
        "question": "Trước khi nhờ AI soạn thông cáo, bạn nên chuẩn bị gì?",
        "options": [
          "Danh sách dữ kiện đã chốt: ai, làm gì, khi nào, ở đâu, phạm vi",
          "Một bài thông cáo hay của công ty khác để AI viết lại đổi tên công ty rồi dùng",
          "Lời trích dẫn AI đề xuất để người trong cuộc chọn lại",
          "Một câu chốt chung là sự kiện quan trọng và đáng chú ý"
        ],
        "correct": 0,
        "explanation": "AI chỉ nên viết quanh dữ kiện đã chốt. Đưa danh sách dữ kiện rõ giúp nó không phải đoán. Bài của công ty khác có thể khiến AI chép cả câu chữ và chi tiết không thuộc về bạn. Lời trích để người trong cuộc chọn lại vẫn là lời chưa ai nói, còn \"quan trọng\" là đánh giá, không phải dữ kiện."
      },
      {
        "question": "Trong bản nháp có câu \"dự án sẽ phục vụ hơn một triệu người dùng\". Dữ kiện bạn đưa không có con số này. Bạn làm gì?",
        "options": [
          "Gạch câu đó, hoặc hỏi người phụ trách dự án con số thật",
          "Giữ lại vì con số lớn làm thông cáo hấp dẫn hơn nhiều",
          "Đổi thành \"hàng triệu người dùng\" cho có vẻ không cụ thể",
          "Nhờ AI tìm con số tương tự ở các dự án khác để so"
        ],
        "correct": 0,
        "explanation": "Con số không có trong dữ kiện nghĩa là AI tự thêm. Thông cáo là văn bản công khai; con số sai bị người khác trích lại. Đổi thành \"hàng triệu\" chỉ làm nó mơ hồ hơn chứ không có thêm bằng chứng. Con số của dự án khác không nói gì về dự án này."
      },
      {
        "question": "Cách dặn nào giúp AI tránh thêm chi tiết khi soạn thông cáo?",
        "options": [
          "Chỉ dùng dữ kiện trong danh sách; thiếu gì thì để trống và hỏi bạn",
          "Viết sao cho thật ấn tượng và hấp dẫn báo chí",
          "Viết như một thông cáo của công ty lớn cùng ngành",
          "Viết đầy đủ mọi chi tiết mà một thông cáo thường có kể cả lời trích và số liệu nếu cần"
        ],
        "correct": 0,
        "explanation": "Lệnh \"chỉ dùng dữ kiện trong danh sách, thiếu thì để trống\" chặn được việc AI điền chỗ thiếu bằng điều nghe hợp lý. \"Ấn tượng\", \"như công ty lớn\", \"đầy đủ mọi chi tiết\" đều cho AI lý do để thêm những gì chưa có: một câu trích, một con số, một kế hoạch tương lai chưa ai quyết."
      },
      {
        "question": "Ai nên duyệt thông cáo trước khi gửi ra bên ngoài?",
        "options": [
          "Người trong cuộc và người phụ trách phát ngôn của công ty",
          "Chỉ AI, bằng cách nhờ nó đọc lại lần cuối",
          "Chỉ người soạn thảo vì người đó nắm rõ nhất nội dung nên ký tắt là đủ",
          "Không cần ai, vì thông cáo đã dựa trên dữ kiện thật"
        ],
        "correct": 0,
        "explanation": "Thông cáo là tiếng nói chính thức của công ty, nên người được nhắc tới và người phụ trách phát ngôn cần đọc và đồng ý. Người soạn thảo dễ quen mắt với lỗi của mình, còn AI không có thẩm quyền xác nhận. Dữ kiện thật vẫn có thể bị diễn đạt sai hoặc bị hiểu sai."
      }
    ],
    "keyTakeaways": [
      "Chốt dữ kiện trước: ai, làm gì, khi nào, ở đâu, phạm vi.",
      "Cấm AI thêm lời trích của người thật và con số không có trong dữ kiện.",
      "Chỗ thiếu thì để trống rồi hỏi người phụ trách, đừng để AI điền.",
      "Người trong cuộc duyệt trước khi thông cáo ra bên ngoài."
    ],
    "practicePrompt": {
      "question": "Bạn đưa AI dữ kiện ký hợp tác. Bản nháp ghi \"Ông Nam, Giám đốc, cho biết: Chúng tôi rất phấn khởi\". Ông Nam chưa nói gì với bạn. Xử lý ra sao?",
      "options": [
        "Xoá lời trích, hoặc để chỗ trống chờ ông Nam gửi lời thật",
        "Giữ vì lời trích như vậy thông cáo nào cũng có",
        "Giữ và nhắn ông Nam nếu ông không thích thì sẽ sửa sau khi bài đã đăng",
        "Đổi \"cho biết\" thành \"dự kiến sẽ nói\" để tránh sai"
      ],
      "correct": 0,
      "explanation": "Lời trích phải là lời người đó đã nói hoặc đã duyệt. \"Thông cáo nào cũng có\" là lý do AI viết ra nó chứ không phải lý do dùng nó. Chờ ông sửa sau nghĩa là thông cáo có thể đã ra ngoài. Đổi thành \"dự kiến sẽ nói\" biến một lời chưa từng có thành lời tiên đoán vẫn không phải của ông."
    },
    "summary": {
      "keyIdea": "Thông cáo chỉ nên chứa dữ kiện đã chốt; lời trích của người thật phải do chính người đó nói hoặc duyệt.",
      "formula": "Dữ kiện đã chốt → AI soạn, không thêm gì → soát từng câu với dữ kiện → người trong cuộc duyệt.",
      "commonMistake": "Để AI điền lời trích hoặc số liệu vì \"thông cáo nào cũng có\".",
      "action": "Trước khi nhờ AI soạn thông cáo, viết danh sách dữ kiện đã chốt và gửi người phụ trách xem."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn một sự kiện thật gần đây của công ty (ký hợp tác, khai trương, sự kiện nội bộ). Viết danh sách 6 dữ kiện đã chốt: ai, làm gì, khi nào, ở đâu, phạm vi, người liên hệ. Nhờ AI soạn thông cáo 150 chữ chỉ từ danh sách đó, cấm thêm lời trích. Gạch mọi câu không có trong danh sách.",
      "secondary": "Gửi bản đã gạch cho người phụ trách sự kiện xem và ghi lại họ sửa gì."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Công ty vừa ký hợp tác với một đối tác và sếp muốn có thông cáo gửi báo trong chiều nay. Bạn đưa AI vài dòng ghi chú, nó trả về một bài trôi chảy, có cả lời của tổng giám đốc. Đẹp thật, chỉ có điều tổng giám đốc chưa nói câu đó."
      },
      {
        "type": "feynman",
        "title": "Thông cáo báo chí đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới tờ biên nhận: nó chỉ ghi điều đã xảy ra, ai giao, ai nhận, ngày nào, bao nhiêu. Không ai viết thêm vào biên nhận \"chúng tôi rất vui\" thay cho người nhận. Thông cáo báo chí có cùng tinh thần, chỉ khác là nó gửi cho báo và công chúng.",
        "columns": [
          "Thành phần",
          "Tờ biên nhận",
          "Thông cáo báo chí"
        ],
        "rows": [
          [
            "Nội dung chính",
            "Ai giao, ai nhận, ngày nào",
            "Ai làm gì, khi nào, ở đâu"
          ],
          [
            "Cái không được thêm",
            "Điều chưa xảy ra",
            "Lời người thật chưa nói, số chưa chốt"
          ],
          [
            "Người ký nhận",
            "Bên giao và bên nhận",
            "Người trong cuộc, người phát ngôn"
          ],
          [
            "Khi thiếu thông tin",
            "Để trống, hỏi lại",
            "Để trống, hỏi người phụ trách"
          ]
        ],
        "oneLiner": "Thông cáo chỉ ghi điều đã xảy ra, và lời của ai thì phải do người đó nói hoặc duyệt."
      },
      {
        "type": "heading",
        "text": "Vì sao AI hay thêm lời trích"
      },
      {
        "type": "paragraph",
        "text": "AI đã đọc rất nhiều thông cáo, mà thông cáo nào cũng có một câu bắt đầu bằng \"ông X, giám đốc, cho biết\". Nên khi bạn yêu cầu một thông cáo, nó viết luôn phần đó, kèm cảm xúc \"rất phấn khởi\" mà không ai bảo. Lời trích đó nghe hợp lý nhưng không là lời của ai cả."
      },
      {
        "type": "flow",
        "title": "Soạn thông cáo từ dữ kiện thật",
        "steps": [
          {
            "label": "Chốt dữ kiện",
            "detail": "Viết ra: bên nào, làm gì, ngày nào, ở đâu, phạm vi, người liên hệ. Chỗ chưa chốt thì ghi rõ là chưa chốt."
          },
          {
            "label": "Giao cho AI",
            "detail": "Đưa danh sách dữ kiện và dặn: chỉ dùng dữ kiện này, không thêm lời trích, không thêm con số, thiếu thì để [trống]."
          },
          {
            "label": "Soát từng câu",
            "detail": "Với mỗi câu trong bản nháp, tìm dữ kiện tương ứng trong danh sách. Câu nào không có thì gạch."
          },
          {
            "label": "Xin lời thật",
            "detail": "Nếu muốn có lời trích, hỏi người trong cuộc và dùng đúng lời họ gửi hoặc duyệt."
          },
          {
            "label": "Duyệt trước khi gửi",
            "detail": "Người trong cuộc và người phát ngôn đọc bản cuối. Pháp lý hay điều khoản hợp đồng thì hỏi bộ phận pháp chế."
          }
        ]
      },
      {
        "type": "list",
        "items": [
          "Không nhờ AI viết \"thông cáo hay\"; nhờ AI viết \"thông cáo chỉ từ dữ kiện sau\".",
          "Để chỗ trống cho lời trích, không chặn thông cáo phải có lời trích.",
          "Con số chưa chốt thì viết \"chưa công bố\" hoặc bỏ, không làm tròn.",
          "Nói kế hoạch tương lai chỉ khi có người cam kết."
        ]
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Soát bản nháp thông cáo do AI soạn",
        "task": "Dữ kiện bạn đưa: công ty Bình An ký hợp tác với công ty Việt Tiến ngày 12/10; hai bên hợp tác về hệ thống quản lý kho; chưa chốt giá trị hợp đồng; người liên hệ là chị Hà, phòng Truyền thông. Đánh dấu những câu AI tự thêm.",
        "segments": [
          {
            "text": "Ngày 12/10, công ty Bình An và công ty Việt Tiến ký kết thỏa thuận hợp tác."
          },
          {
            "text": "Hai bên sẽ hợp tác về hệ thống quản lý kho."
          },
          {
            "text": "Ông Nam, Tổng giám đốc Bình An, cho biết: \"Sự hợp tác này sẽ mở ra một kỷ nguyên mới cho cả hai bên.\"",
            "error": "Dữ kiện không có lời trích nào. AI tự viết lời cho một người thật và ông Nam chưa nói câu đó."
          },
          {
            "text": "Hợp đồng có giá trị 30 tỷ đồng và kéo dài ba năm.",
            "error": "Dữ kiện ghi rõ giá trị hợp đồng chưa chốt. Giá trị và thời hạn đều do AI tự bịa."
          },
          {
            "text": "Dự kiến hệ thống sẽ giúp giảm 40% chi phí kho vận.",
            "error": "Con số 40% và cả lời hứa về kết quả không có trong dữ kiện; đây là dự báo AI tự thêm."
          },
          {
            "text": "Liên hệ: chị Hà, phòng Truyền thông."
          }
        ]
      },
      {
        "type": "callout",
        "label": "Chưa xong khi chưa duyệt",
        "text": "Thông cáo đã soát vẫn còn một bước: người được nhắc tên và người phát ngôn đọc và đồng ý. Điều khoản hợp đồng hay cam kết pháp lý trong thông cáo thì hỏi bộ phận pháp chế, đừng tự quyết."
      },
      {
        "type": "scenario",
        "title": "Thông cáo hợp tác trước giờ gửi báo",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn có bản nháp thông cáo do AI soạn từ dữ kiện. Trong đó có lời trích của tổng giám đốc và một con số 30 tỷ mà dữ kiện không có. Báo cần bài lúc 4 giờ chiều, giờ là 2 giờ.",
            "choices": [
              {
                "label": "Gửi luôn vì bài đọc rất hợp lý và đúng giọng thông cáo",
                "next": "bad_send"
              },
              {
                "label": "Gạch lời trích và con số, nhắn tổng giám đốc xin một lời trích thật",
                "next": "s2"
              }
            ]
          },
          "bad_send": {
            "text": "Bài đăng lên báo. Tổng giám đốc gọi hỏi vì sao có câu ông chưa từng nói, còn đối tác nhắn hỏi con số 30 tỷ từ đâu ra vì hai bên chưa chốt giá.",
            "ending": "bad"
          },
          "s2": {
            "text": "Tổng giám đốc trả lời lúc 3 giờ: ông gửi một câu ngắn của riêng ông. Người liên hệ bên đối tác cũng xác nhận giá trị hợp đồng chưa công bố.",
            "choices": [
              {
                "label": "Đưa lời trích thật vào, bỏ con số, gửi người phát ngôn duyệt rồi gửi báo",
                "next": "good"
              },
              {
                "label": "Viết lại lời trích cho hay hơn rồi gửi, vì ông nói hơi cộc",
                "next": "bad_edit"
              }
            ]
          },
          "bad_edit": {
            "text": "Bản trích lời sau khi \"làm hay\" khác với điều ông Nam viết. Ông đọc bài báo và yêu cầu đính chính vì câu đó không phải của ông.",
            "ending": "bad"
          },
          "good": {
            "text": "Thông cáo ra đúng giờ, lời trích do chính ông Nam gửi, con số chưa chốt được bỏ. Không ai phải đính chính.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Thông cáo chỉ ghi điều đã xảy ra; lời của ai phải do người đó nói hoặc duyệt.",
          "Bài sau: dự án nhỏ, một trang bảng soát sự thật dùng cho mọi bài."
        ]
      }
    ]
  },
  {
    "id": 2214,
    "slug": "kiem-chung-du-an-nho-bang-soat-su-that-truoc-khi-dang",
    "title": "Chặng 40, Bài 15: Dự án nhỏ: bảng soát sự thật một trang cho mọi bài",
    "subtitle": "Một bảng bốn cột, dùng lại cho mọi bài: con số, nguồn, người xác nhận, ngày.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "track": "personal",
    "isFundamental": false,
    "emoji": "📋",
    "whyItMatters": "Bốn bài trước dạy từng kỹ năng: liệt kê con số, mở nguồn, hạ giọng câu mạnh, soạn thông cáo từ dữ kiện thật. Bài này gom chúng thành một tờ giấy dùng lại được. Có bảng, việc soát thôi phụ thuộc vào trí nhớ và tinh thần của một buổi sáng, và mọi người trong nhóm soát theo cùng một cách.",
    "openingQuestion": "Bạn muốn cả nhóm truyền thông soát bài theo cùng một cách trước khi đăng. Cột nào của bảng soát sự thật quan trọng nhất để có dấu vết về sau?",
    "openingOptions": [
      "Người xác nhận và ngày, để biết ai đã gật đầu khi nào",
      "Cột nhận xét chung về việc bài viết hay hoặc chưa hay",
      "Cột số thứ tự để đếm xem bài có bao nhiêu mục",
      "Cột màu để phân biệt mục quan trọng với mục thường"
    ],
    "correctOption": 0,
    "explanation": "Con số và nguồn cho bạn biết cần kiểm gì, nhưng người xác nhận và ngày là dấu vết: hôm sau có ai hỏi, bạn biết ai đã kiểm và kiểm dựa trên tài liệu bản nào. Nhận xét hay hay dở là ý kiến, không phải bằng chứng. Số thứ tự và màu giúp trình bày gọn nhưng không trả lời được câu hỏi \"ai bảo con số này đúng\".",
    "diagram": [
      {
        "label": "Bài nháp có số, tên, câu mạnh",
        "arrow": true
      },
      {
        "label": "Ghi vào bảng: mục, nguồn, người xác nhận, ngày",
        "arrow": true
      },
      {
        "label": "Mục nào trống nguồn hoặc người xác nhận thì chưa được đăng",
        "arrow": true
      },
      {
        "label": "Đăng xong, lưu bảng cùng bài"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: nhóm truyền thông ba người",
      "description": "Ba người trong nhóm mỗi người soát theo một cách. Sau khi thống nhất một bảng bốn cột, họ thử với bài sắp đăng và thấy hai chỗ suýt sai: một con số lấy từ bản báo cáo cũ và một tên trưởng nhóm viết thiếu. Họ giữ bảng đó cho các bài sau. Đây là tình huống minh hoạ, không phải một công ty có thật."
    },
    "quiz": [
      {
        "question": "Bảng soát sự thật một trang nên có những cột nào?",
        "options": [
          "Mục cần soát, nguồn, người xác nhận, ngày",
          "Mục cần soát, ý kiến của AI, màu, số thứ tự",
          "Tiêu đề bài, tên người viết, số chữ, ngày đăng",
          "Mục cần soát, mức độ hay của câu văn, cỡ chữ"
        ],
        "correct": 0,
        "explanation": "Bảng soát phục vụ một câu hỏi: con số hay tên này lấy từ đâu, ai đã xác nhận, khi nào. Nên bốn cột chính là mục, nguồn, người xác nhận, ngày. Tiêu đề, số chữ hay cỡ chữ là chuyện trình bày; ý kiến của AI hay độ hay của câu văn không phải bằng chứng."
      },
      {
        "question": "Trong bảng, một dòng có nguồn nhưng cột \"người xác nhận\" còn trống. Dòng đó ở trạng thái nào?",
        "options": [
          "Chưa xong, vì chưa có ai gật đầu với con số",
          "Xong, vì đã có nguồn nên coi như đúng",
          "Xong, vì người soạn bài coi như là người xác nhận",
          "Bỏ qua được nếu con số nhỏ và ít người chú ý"
        ],
        "correct": 0,
        "explanation": "Nguồn cho biết con số lấy ở đâu; người xác nhận là người đã đối chiếu hoặc chịu trách nhiệm cho nó. Thiếu cột này, con số vẫn chưa ai đứng ra bảo đảm. Người soạn bài tự xác nhận cho mình thì mất tác dụng của một lượt soát độc lập, và con số nhỏ cũng có thể sai."
      },
      {
        "question": "Vì sao nên lưu bảng soát cùng bài đã đăng?",
        "options": [
          "Khi có người hỏi hoặc đính chính, bạn mở ra biết ngay số nào lấy từ đâu",
          "Vì bảng đã lưu sẽ tự động sửa bài nếu có sai",
          "Vì quy định bắt buộc lưu mọi bảng trong mười năm",
          "Vì AI cần bảng đó để nhớ những gì đã soát"
        ],
        "correct": 0,
        "explanation": "Bảng là dấu vết: khi ai đó hỏi về một con số, bạn không phải nhớ lại mà mở ra đọc. Bảng không tự sửa gì; không có quy định chung nào ở đây về mười năm, và AI không giữ bảng của bạn giữa các lần dùng nếu bạn không đưa lại."
      },
      {
        "question": "Lần đầu dùng bảng với một bài, bạn nên ghi lại điều gì thêm ngoài các cột?",
        "options": [
          "Những chỗ suýt sai, để sau này biết loại lỗi nào hay gặp",
          "Cảm giác của bạn về việc bài viết có hay không sau khi đọc lại một lượt",
          "Số phút đã tốn để soát, không cần ghi chỗ sai",
          "Danh sách những người không được xem bảng này"
        ],
        "correct": 0,
        "explanation": "Chỗ suýt sai là dữ liệu quý nhất: nó cho biết nhóm hay sai ở loại nào (con số cũ, tên viết thiếu, câu mạnh) và biến thành dòng nhắc trong bảng cho lần sau. Cảm giác về độ hay không giúp soát. Số phút chỉ đo công sức, không đo lỗi."
      },
      {
        "question": "Đồng nghiệp bảo: \"Bài ngắn, khỏi lập bảng\". Điều gì đúng nhất?",
        "options": [
          "Bài ngắn thì bảng cũng ngắn, nhưng vẫn cần cho con số và tên riêng trong đó",
          "Đúng, bài dưới 200 chữ thì không cần soát",
          "Chỉ bài đăng ngoài công ty mới cần bảng, bài nội bộ thì không",
          "Chỉ bài do AI viết mới cần bảng, bài tự viết thì khỏi"
        ],
        "correct": 0,
        "explanation": "Độ dài bài không quyết định rủi ro; một bài ngắn chứa một con số sai vẫn là bài sai. Bảng sẽ ngắn tương ứng, tốn vài phút. Bài nội bộ cũng bị đọc kỹ, và bài tự viết cũng có con số chép nhầm, nên cả hai đều cần soát."
      }
    ],
    "keyTakeaways": [
      "Bảng soát bốn cột: mục cần soát, nguồn, người xác nhận, ngày.",
      "Dòng nào thiếu nguồn hoặc người xác nhận thì chưa được đăng.",
      "Ghi cả chỗ suýt sai để bảng dần có dòng nhắc riêng cho nhóm bạn.",
      "Lưu bảng cùng bài đã đăng để có dấu vết khi cần đính chính."
    ],
    "practicePrompt": {
      "question": "Bảng soát của bài sắp đăng có 10 dòng: 8 dòng đủ nguồn và người xác nhận, 2 dòng chưa có người xác nhận. Còn 10 phút. Nên làm gì?",
      "options": [
        "Hỏi nhanh người phụ trách hai dòng còn thiếu; chưa có thì bỏ hai mục đó khỏi bài",
        "Đăng vì 8 trên 10 dòng đã đủ, hai dòng còn lại là chuyện nhỏ",
        "Nhờ AI xác nhận hai dòng còn lại rồi ghi tên AI vào bảng",
        "Tự ghi tên mình vào cột xác nhận vì bạn là người viết bài"
      ],
      "correct": 0,
      "explanation": "Dòng thiếu người xác nhận là chỗ chưa ai bảo đảm, nên phải xin xác nhận hoặc bỏ mục đó khỏi bài. 8 trên 10 dòng đủ vẫn để lọt hai chỗ có thể sai. AI không có nguồn công ty nên không xác nhận được. Tự ghi tên mình là biến bảng thành thủ tục rỗng."
    },
    "summary": {
      "keyIdea": "Một bảng soát bốn cột biến việc soát bài từ thói quen cá nhân thành quy trình cả nhóm dùng lại được.",
      "formula": "Mục cần soát + nguồn + người xác nhận + ngày; thiếu một cột thì chưa đăng.",
      "commonMistake": "Coi bảng là thủ tục: ghi cho có, tự xác nhận cho mình, hoặc bỏ qua với bài ngắn.",
      "action": "Dùng bảng cho bài sắp đăng của bạn và ghi lại chỗ suýt sai."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Lập bảng soát bốn cột (bảng tính hoặc giấy đều được). Lấy một bài sắp đăng, nhờ AI liệt kê số, ngày, tên riêng và các câu mạnh vào cột đầu. Tự điền nguồn, người xác nhận, ngày. Nộp lại cho bạn: ít nhất một chỗ suýt sai hoặc một mục bạn phải bỏ vì không có nguồn.",
      "secondary": "Gửi bảng cho một đồng nghiệp và hỏi họ muốn thêm cột nào."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Chiều thứ Sáu, bài đã xong, còn mười phút. Bạn nhớ mang máng là có kiểm mấy con số, nhưng không chắc con nào và dựa vào đâu. Bài này làm cho lần sau bạn không phải nhớ nữa: bạn chỉ cần mở một tờ bảng."
      },
      {
        "type": "feynman",
        "title": "Bảng soát đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới danh sách kiểm tra của người lái máy bay trước khi cất cánh. Phi công giỏi không cần nhớ hết mọi bước; họ đọc từng dòng, kiểm, rồi tích. Nhờ thế mỗi chuyến đi qua cùng một quy trình, ai lái cũng vậy.",
        "columns": [
          "Thành phần",
          "Danh sách kiểm tra trước cất cánh",
          "Bảng soát sự thật"
        ],
        "rows": [
          [
            "Mỗi dòng là",
            "Một thứ cần kiểm",
            "Một con số, tên hoặc câu cần soát"
          ],
          [
            "Người kiểm",
            "Phi công đọc và xác nhận",
            "Người xác nhận ghi tên"
          ],
          [
            "Khi chưa tích",
            "Chưa cất cánh",
            "Chưa đăng bài"
          ],
          [
            "Lợi ích",
            "Ai lái cũng theo cùng một quy trình",
            "Cả nhóm soát theo cùng một cách"
          ]
        ],
        "oneLiner": "Bảng soát làm cho việc kiểm dựa vào tờ giấy, không dựa vào trí nhớ của bạn trong phút chót."
      },
      {
        "type": "heading",
        "text": "Bốn cột, một trang"
      },
      {
        "type": "paragraph",
        "text": "Bảng chỉ có bốn cột: mục cần soát (con số, ngày, tên, câu mạnh), nguồn đã dùng (tên tài liệu, mục hoặc trang), người xác nhận, và ngày xác nhận. Đơn giản là để người bận nhất trong nhóm cũng chịu dùng."
      },
      {
        "type": "list",
        "items": [
          "Cột 1: mục cần soát, lấy từ danh sách AI liệt kê (bài 11).",
          "Cột 2: nguồn bạn đã tự mở và thấy đúng ý (bài 12).",
          "Cột 3: người xác nhận, có tên thật, không phải \"đã kiểm\".",
          "Cột 4: ngày xác nhận; tài liệu và số liệu đổi theo thời gian."
        ]
      },
      {
        "type": "flow",
        "title": "Một bài đi qua bảng soát",
        "steps": [
          {
            "label": "AI liệt kê",
            "detail": "Dán bài, nhờ AI liệt kê số, ngày, tên riêng và câu mạnh vào bảng bốn cột. Nhờ để trống ba cột cuối."
          },
          {
            "label": "Bạn đếm lại",
            "detail": "Đọc bài, thêm mục AI bỏ sót vào bảng. Đây là lúc bạn hay bắt được con số bị gộp."
          },
          {
            "label": "Điền nguồn",
            "detail": "Với từng mục, mở tài liệu công ty, ghi tên tài liệu và mục. Không tìm ra nguồn thì đánh dấu đỏ."
          },
          {
            "label": "Xin xác nhận",
            "detail": "Gửi mục cần người khác xác nhận cho đúng người (kế toán, vận hành, trưởng phòng) và ghi tên, ngày."
          },
          {
            "label": "Chốt và lưu",
            "detail": "Mục đỏ thì sửa hoặc bỏ khỏi bài. Đăng xong, lưu bảng cùng bài để mở ra khi có người hỏi."
          }
        ]
      },
      {
        "type": "callout",
        "label": "Bảng không thay người",
        "text": "Bảng không tự biết con số nào đúng. Nó chỉ buộc bạn trả lời bốn câu hỏi cho từng mục. Nếu chỉ điền cho có, chẳng hạn ghi tên mình vào cột xác nhận, bảng mất hết giá trị."
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Soát bảng AI vừa điền hộ",
        "task": "Bạn nhờ AI điền luôn cả nguồn và người xác nhận vào bảng cho bài sắp đăng, dù bạn chỉ đưa nó danh sách mục. Hãy đánh dấu những dòng AI tự bịa.",
        "segments": [
          {
            "text": "Mục 1: \"Doanh thu quý ba tăng 8%\" - nguồn để trống, cần bạn điền."
          },
          {
            "text": "Mục 2: tên \"chị Mai, phòng Chăm sóc khách hàng\" - cần đối chiếu danh sách nhân sự."
          },
          {
            "text": "Mục 3: \"1.200 phiếu hỗ trợ\" - nguồn: báo cáo CSKH quý ba, trang 4; người xác nhận: chị Mai; ngày: 10/10.",
            "error": "Bạn chưa đưa báo cáo nào và chị Mai chưa xác nhận gì. AI tự điền nguồn, trang, người xác nhận và ngày cho dòng trông đã xong."
          },
          {
            "text": "Mục 4: \"chưa từng trễ hạn\" - đã được kế toán trưởng xác nhận ngày 09/10.",
            "error": "Kế toán trưởng chưa xem bài này. Ghi tên một người thật vào ô xác nhận khi họ chưa xác nhận là làm giả dấu vết."
          },
          {
            "text": "Mục 5: \"ngày ra mắt 15/11\" - cần hỏi người phụ trách sự kiện."
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Thử bảng với bản tin chiều thứ Sáu",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn thử bảng soát với bản tin sắp đăng. Có 10 mục; bạn làm xong 8, còn hai mục: con số \"giảm 12% chi phí\" chưa tìm ra nguồn và một tên trưởng nhóm chưa chắc chính tả. Còn 20 phút.",
            "choices": [
              {
                "label": "Ghi \"đã kiểm\" vào hai dòng đó cho bảng nhìn đủ rồi đăng",
                "next": "bad_fill"
              },
              {
                "label": "Hỏi người phụ trách chi phí về con số và xem lại danh sách nhân sự cho cái tên",
                "next": "s2"
              }
            ]
          },
          "bad_fill": {
            "text": "Bản tin đăng đúng giờ. Hôm sau kế toán trưởng nhắn: mức giảm là 7%, không phải 12%. Bảng ghi \"đã kiểm\" nhưng không có tên ai, nên không ai biết con số 12% từ đâu ra.",
            "ending": "bad"
          },
          "s2": {
            "text": "Kế toán trả lời: mức giảm chi phí là 7% và gửi bảng đối chiếu. Tên trưởng nhóm trong danh sách nhân sự có thêm chữ đệm mà bản nháp thiếu.",
            "choices": [
              {
                "label": "Sửa cả hai chỗ, ghi tên kế toán, ngày xác nhận, tên tài liệu vào bảng rồi đăng",
                "next": "good"
              },
              {
                "label": "Chỉ sửa con số, còn cái tên thì bỏ qua vì chỉ thiếu một chữ",
                "next": "bad_name"
              }
            ]
          },
          "bad_name": {
            "text": "Con số đúng, nhưng người trưởng nhóm thấy tên mình bị viết thiếu trong bản tin toàn công ty và nhắn hỏi bạn có dùng danh sách nhân sự không.",
            "ending": "bad"
          },
          "good": {
            "text": "Bản tin đăng đúng giờ, không có chỗ nào phải đính chính. Bảng ghi rõ hai chỗ suýt sai, và bạn thêm hai dòng nhắc vào đầu bảng cho lần sau: kiểm con số chi phí với kế toán, kiểm tên với danh sách nhân sự.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Bảng soát bốn cột: mục, nguồn, người xác nhận, ngày; thiếu một cột thì chưa đăng.",
          "Bài sau: từ một tin viết ra bài web, bài mạng xã hội và email."
        ]
      }
    ]
  }
];
