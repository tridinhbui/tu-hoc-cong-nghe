import type { Lesson } from "../lesson-types";

// Chặng 43, bài 11-15. Giáo trình: scripts/curriculum/stage-43.json.
// Không nêu nút bấm hay tính năng riêng của công cụ nào: chỉ dạy cách giao việc và kiểm kết quả.
export const S43_C_LESSONS: Lesson[] = [
  {
    "track": "personal",
    "isFundamental": false,
    "id": 2270,
    "slug": "dan-y-bai-trinh-bay-tu-mot-trang-ghi-chu",
    "title": "Chặng 43, Bài 11: Dàn ý bài trình bày từ một trang ghi chú",
    "subtitle": "Chiều nay bạn có một trang ghi chú lộn xộn, sáng mai phải họp: nhờ trợ lý dựng khung, bạn giữ quyền quyết định.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "🗂️",
    "whyItMatters": "Khó nhất của một bài trình bày không phải làm trang chiếu đẹp mà là biết mở đầu bằng gì, nói ba ý nào, kết bằng đề nghị gì. Trợ lý trong phần mềm trình chiếu dựng khung rất nhanh, nhưng chỉ đúng khi bạn cho nó biết người nghe là ai và bạn muốn họ làm gì sau buổi họp.",
    "openingQuestion": "Bạn dán trang ghi chú lộn xộn vào trợ lý và gõ: \"Làm cho tôi bài trình bày.\" Bản dàn ý trả về chung chung. Thiếu gì nhất?",
    "openingOptions": [
      "Người nghe là ai và bạn muốn họ quyết định điều gì sau buổi họp",
      "Yêu cầu trợ lý dùng nhiều hình ảnh đẹp hơn ở mỗi trang chiếu",
      "Một câu dặn trợ lý hãy làm thật sáng tạo và khác biệt mọi người",
      "Thêm số trang chiếu lên 20 để nội dung có vẻ đầy đủ hơn nữa"
    ],
    "correctOption": 0,
    "explanation": "Cùng một trang ghi chú, dàn ý gửi ban giám đốc (cần quyết định, số liệu, rủi ro) khác hẳn dàn ý cho đồng nghiệp cùng nhóm (cần chi tiết cách làm). Không biết người nghe và mục tiêu, trợ lý chỉ chia ghi chú thành các mục cho cân đối. Hình đẹp, sáng tạo hay 20 trang không cho nó thông tin nào để chọn ý quan trọng. Người nghe và điều bạn muốn họ làm chính là xương sống của dàn ý.",
    "diagram": [
      {
        "label": "Ghi chú lộn xộn của bạn",
        "arrow": true
      },
      {
        "label": "Bạn nói rõ người nghe và mục tiêu",
        "arrow": true
      },
      {
        "label": "Trợ lý dựng dàn ý 6 trang chiếu",
        "arrow": true
      },
      {
        "label": "Bạn sửa thứ tự, xoá ý thừa, kiểm số liệu"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: chị Hạnh, trưởng nhóm vận hành",
      "description": "Chị Hạnh có một trang ghi chú dài về việc đổi nhà cung cấp bao bì và 15 phút họp với giám đốc. Chị nhờ trợ lý dựng dàn ý 6 trang chiếu với mục tiêu \"xin duyệt đổi nhà cung cấp\". Bản đầu vẫn xếp thông tin theo thứ tự ghi chú; chị yêu cầu đưa đề nghị lên trang hai và dồn chi tiết sang phụ lục. Đây là tình huống minh hoạ, không phải một công ty có thật."
    },
    "quiz": [
      {
        "question": "Bạn muốn trợ lý dựng dàn ý từ ghi chú. Thông tin nào nên đưa vào yêu cầu TRƯỚC tiên?",
        "options": [
          "Người nghe là ai và bạn muốn họ làm gì sau buổi họp",
          "Tên phông chữ và màu nền bạn thích dùng cho toàn bài này",
          "Số trang chiếu tối đa, để trợ lý khỏi viết quá dài dòng ra",
          "Tên phần mềm trình chiếu đang dùng ở công ty của bạn"
        ],
        "correct": 0,
        "explanation": "Người nghe và hành động mong muốn quyết định thứ tự và độ sâu của mọi ý. Phông chữ, màu nền chỉ là hình thức, chỉnh sau vài giây. Số trang hữu ích nhưng chỉ chia lại độ dài chứ không chọn được ý nào quan trọng. Tên phần mềm không đổi nội dung dàn ý."
      },
      {
        "question": "Dàn ý trợ lý trả về xếp 4 trang toàn bối cảnh, đề nghị nằm ở trang 6. Sếp chỉ có 10 phút. Nên làm gì?",
        "options": [
          "Yêu cầu đưa đề nghị lên trang hai, bối cảnh chuyển xuống phụ lục",
          "Giữ nguyên thứ tự, vì trợ lý đã sắp theo ghi chú của bạn nên đúng",
          "Xoá trang 6 để bài ngắn lại, người nghe tự suy ra đề nghị",
          "Nhờ trợ lý viết thêm 3 trang bối cảnh cho người nghe hiểu kỹ hơn"
        ],
        "correct": 0,
        "explanation": "Người bận cần đề nghị trước rồi mới xem lý do. Trợ lý xếp theo thứ tự ghi chú vì bạn chưa dặn thứ tự khác; nó không biết sếp chỉ có 10 phút. Xoá đề nghị làm bài mất mục đích, còn viết thêm bối cảnh làm bài dài đúng chỗ đáng lẽ phải ngắn."
      },
      {
        "question": "Trợ lý viết vào dàn ý: \"Chi phí giảm 18% so với nhà cung cấp cũ\", nhưng ghi chú của bạn không có con số này. Đây là gì?",
        "options": [
          "Con số trợ lý tự thêm, cần xoá hoặc thay bằng số từ báo giá thật",
          "Con số hợp lý vì trợ lý đã tính từ các dòng còn lại của ghi chú",
          "Con số đúng, vì trợ lý có kho số liệu của nhiều ngành khác nhau",
          "Con số dùng tạm được, vì người nghe sẽ không kiểm lại đâu"
        ],
        "correct": 0,
        "explanation": "Trợ lý đoán chữ nghe hợp lý, kể cả con số. Nó không tính ra 18% từ ghi chú của bạn, cũng không có báo giá của nhà cung cấp bạn đang xét. Số không có nguồn trong ghi chú phải xoá hoặc thay bằng số thật; người nghe rất hay hỏi đúng chỗ đó."
      },
      {
        "question": "Ghi chú có 14 ý, bài chỉ có 6 trang. Cách xử lý ý nào hợp lý nhất?",
        "options": [
          "Giữ ba ý phục vụ đề nghị; ý còn lại để phần phụ lục hoặc lúc trả lời",
          "Dồn cả 14 ý vào 6 trang bằng cách thu nhỏ chữ cho vừa khung",
          "Bỏ ngẫu nhiên 8 ý cho vừa 6 trang rồi để trợ lý tự chọn",
          "Chọn 14 ý ngắn nhất, vì ý ngắn thì người nghe dễ nhớ hơn"
        ],
        "correct": 0,
        "explanation": "Mỗi trang chỉ nên phục vụ một ý gắn với mục tiêu. Thu nhỏ chữ chỉ làm người nghe không đọc nổi. Bỏ ngẫu nhiên có thể loại đúng ý quan trọng. Chọn theo độ ngắn không liên quan đến việc ý đó có giúp quyết định hay không."
      },
      {
        "question": "Vì sao vẫn cần đọc lại dàn ý do trợ lý dựng, dù trông rất mạch lạc?",
        "options": [
          "Nó viết trôi chảy cả khi bỏ sót hoặc thêm ý mà ghi chú không có",
          "Trợ lý luôn viết sai chính tả tiếng Việt nên phải đọc lại từng chữ",
          "Bản dàn ý chỉ dùng được sau khi đã gửi qua bộ phận kiểm duyệt",
          "Trợ lý chỉ nhớ được ba dòng đầu của trang ghi chú bạn dán vào"
        ],
        "correct": 0,
        "explanation": "Văn bản mạch lạc không có nghĩa là trung thành với ghi chú: trợ lý có thể thêm ý, đổi trọng tâm hoặc bỏ sót một điểm bạn coi là chính. Nó không cố ý giấu ý, cũng không chỉ nhớ ba dòng; và bộ phận kiểm duyệt không phải một bước bắt buộc. Việc của bạn là so lại từng trang với ghi chú và mục tiêu."
      }
    ],
    "keyTakeaways": [
      "Cho trợ lý biết người nghe và điều bạn muốn họ làm trước khi nhờ dựng dàn ý.",
      "Đề nghị lên sớm, chi tiết xuống phụ lục khi người nghe bận.",
      "Mỗi trang chiếu một ý, gắn với mục tiêu của buổi họp.",
      "Số liệu không có trong ghi chú của bạn là số trợ lý tự thêm: xoá hoặc thay bằng số thật.",
      "Dàn ý chỉ là khung; người quyết định thứ tự và nội dung là bạn."
    ],
    "practicePrompt": {
      "question": "Bạn có ghi chú về dự án đổi phần mềm chấm công và 10 phút họp với giám đốc nhân sự. Câu nào giúp trợ lý dựng dàn ý sát nhất?",
      "options": [
        "Dàn ý 6 trang để xin duyệt đổi phần mềm, đề nghị đặt ở trang hai, người nghe không rành kỹ thuật",
        "Làm giúp tôi bài trình bày thật chuyên nghiệp, đẹp và dễ nhớ nhất có thể cho buổi họp",
        "Tóm ghi chú này thành các mục theo đúng thứ tự tôi đã viết để tôi khỏi phải sắp xếp",
        "Viết bài trình bày dài 20 trang về phần mềm chấm công để cả phòng đều đọc được"
      ],
      "correct": 0,
      "explanation": "Câu đầu nêu mục tiêu (xin duyệt), độ dài, vị trí đề nghị và người nghe. Câu thứ hai chỉ có tính từ, câu thứ ba giữ nguyên thứ tự ghi chú nên bài không hướng tới quyết định, câu cuối tạo bài quá dài cho 10 phút."
    },
    "summary": {
      "keyIdea": "Trợ lý dựng khung nhanh; bạn chọn ý và thứ tự vì bạn biết người nghe.",
      "formula": "Ghi chú + người nghe + mục tiêu + số trang → dàn ý, rồi bạn sửa thứ tự và kiểm số.",
      "commonMistake": "Nhận dàn ý xếp theo thứ tự ghi chú và số liệu trợ lý tự thêm mà không đối chiếu lại.",
      "action": "Chọn một buổi họp sắp tới, viết một câu mục tiêu và nhờ trợ lý dựng dàn ý 6 trang."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Lấy một trang ghi chú thật của bạn (họp sắp tới, hoặc một việc cần báo cáo). Viết hai câu: người nghe là ai, bạn muốn họ quyết định gì. Nhờ trợ lý dựng dàn ý 6 trang chiếu, rồi gạch chân mọi con số và tên trong dàn ý và đối chiếu từng cái với ghi chú của bạn.",
      "secondary": "Ngày mai bảng điều khiển sẽ hỏi: dàn ý có số hay tên nào không có trong ghi chú gốc không?"
    },
    "sections": [
      {
        "type": "lead",
        "text": "Chiều thứ Tư, bạn có một trang ghi chú viết vội sau ba cuộc gọi, và 9 giờ sáng mai phải nói với giám đốc. Bài này dạy cách giao việc dựng khung cho trợ lý mà không đánh mất quyền chọn ý."
      },
      {
        "type": "feynman",
        "title": "Dàn ý bài trình bày đơn giản hơn bạn nghĩ",
        "intro": "Hình dung bạn dọn một tủ quần áo đầy đồ lẫn lộn để chuẩn bị đi công tác ba ngày. Bạn không mang cả tủ; bạn xếp theo chuyến đi.",
        "columns": [
          "Thành phần",
          "Ví dụ đời thường",
          "Trong công việc của bạn"
        ],
        "rows": [
          [
            "Đống đồ trong tủ",
            "Mọi thứ bạn có, chưa phân loại",
            "Trang ghi chú lộn xộn"
          ],
          [
            "Chuyến đi",
            "Đi đâu, mấy ngày, thời tiết ra sao",
            "Người nghe và mục tiêu buổi họp"
          ],
          [
            "Va li",
            "Chỉ đủ chỗ cho vài món cần thiết",
            "6 trang chiếu, mỗi trang một ý"
          ],
          [
            "Người giúp xếp đồ",
            "Xếp gọn nhanh nhưng không biết chuyến đi của bạn",
            "Trợ lý dựng dàn ý theo những gì bạn cho biết"
          ]
        ],
        "oneLiner": "Trợ lý là người xếp va li giỏi, nhưng chỉ xếp đúng khi bạn nói chuyến đi là đi đâu."
      },
      {
        "type": "heading",
        "text": "Bắt đầu từ người nghe, không phải từ ghi chú"
      },
      {
        "type": "paragraph",
        "text": "Ghi chú thường theo thứ tự bạn nghĩ ra. Người nghe cần thứ tự khác: điều họ cần quyết định trước, lý do sau. Vì vậy hai câu quan trọng nhất trong yêu cầu là người nghe là ai và bạn muốn họ làm gì sau buổi họp."
      },
      {
        "type": "list",
        "items": [
          "Bước 1: viết một câu mục tiêu, ví dụ \"xin duyệt đổi nhà cung cấp\".",
          "Bước 2: dán ghi chú và nói người nghe biết gì, chưa biết gì.",
          "Bước 3: chọn số trang chiếu và nơi đặt đề nghị.",
          "Bước 4: đọc dàn ý, sửa thứ tự và đối chiếu số liệu với ghi chú gốc."
        ]
      },
      {
        "type": "flow",
        "title": "Từ ghi chú tới dàn ý dùng được",
        "steps": [
          {
            "label": "Viết mục tiêu",
            "detail": "Một câu nói buổi họp phải kết thúc bằng quyết định gì. Nếu bạn không viết được câu này, trợ lý cũng không đoán được."
          },
          {
            "label": "Dán ghi chú",
            "detail": "Đưa nguyên ghi chú kèm người nghe. Không dán thông tin cá nhân hoặc bí mật mà công ty chưa cho phép đưa vào công cụ."
          },
          {
            "label": "Nhận dàn ý nháp",
            "detail": "Trợ lý đề xuất tiêu đề và ý chính cho từng trang. Đây là bản nháp, chưa phải bản cuối."
          },
          {
            "label": "Bạn chỉnh và kiểm",
            "detail": "Sửa thứ tự, xoá ý thừa, kiểm mọi con số và tên với ghi chú gốc trước khi làm trang chiếu."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Yêu cầu mơ hồ",
          "text": "\"Làm bài trình bày từ ghi chú này.\" Trợ lý chia ghi chú thành các mục cân đối, thường theo thứ tự cũ, và có thể thêm ý nghe hợp lý."
        },
        "right": {
          "label": "Yêu cầu có mục tiêu",
          "text": "\"6 trang, xin duyệt đổi phần mềm, đề nghị ở trang hai, người nghe là giám đốc không rành kỹ thuật.\" Dàn ý hướng thẳng tới quyết định."
        }
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Dựng dàn ý cho buổi họp 10 phút",
        "task": "Bạn có ghi chú về việc đổi phần mềm chấm công và 10 phút với giám đốc nhân sự. Lắp yêu cầu để trợ lý dựng dàn ý.",
        "parts": [
          {
            "id": "goal",
            "label": "Mục tiêu",
            "options": [
              {
                "text": "Làm bài trình bày về phần mềm chấm công.",
                "feedback": "Không nói bạn muốn người nghe quyết định gì - dàn ý sẽ là bài giới thiệu chung."
              },
              {
                "text": "Xin giám đốc duyệt đổi phần mềm chấm công trong quý này.",
                "good": true,
                "feedback": "Có quyết định cụ thể - dàn ý xoay quanh việc xin duyệt."
              }
            ]
          },
          {
            "id": "audience",
            "label": "Người nghe",
            "options": [
              {
                "text": "Người nghe là giám đốc nhân sự, biết quy trình chấm công nhưng chưa biết phần mềm mới.",
                "good": true,
                "feedback": "Trợ lý biết nên giải thích gì và bỏ gì."
              },
              {
                "text": "Người nghe là mọi người trong công ty.",
                "feedback": "Quá rộng - trợ lý giải thích cả những điều giám đốc đã biết."
              }
            ]
          },
          {
            "id": "shape",
            "label": "Hình dạng bài",
            "options": [
              {
                "text": "6 trang chiếu, đề nghị ở trang hai, chi tiết để phụ lục.",
                "good": true,
                "feedback": "Đúng với 10 phút: đề nghị sớm, chi tiết đủ để hỏi đáp."
              },
              {
                "text": "Càng nhiều trang càng tốt.",
                "feedback": "Bài dài vượt 10 phút, người nghe mất tập trung."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "goal",
              "audience",
              "shape"
            ],
            "text": "Trang 1: Đề nghị đổi phần mềm chấm công trong quý này.\nTrang 2: Điều tôi xin duyệt và thời hạn.\nTrang 3: Vấn đề hiện tại (từ ghi chú).\nTrang 4: Phần mềm mới giải quyết thế nào.\nTrang 5: Rủi ro và cách giảm.\nTrang 6: Các bước tiếp theo.\n(Chi tiết kỹ thuật để phụ lục.)"
          },
          {
            "requires": [
              "goal"
            ],
            "text": "Trang 1: Giới thiệu phần mềm chấm công.\nTrang 2: Tính năng chính.\nTrang 3: So sánh với hệ thống cũ...\n(Có mục tiêu nhưng chưa biết người nghe và độ dài, nên đề nghị bị đẩy về cuối và bài dài.)"
          },
          {
            "text": "Trang 1: Tổng quan về chấm công.\nTrang 2: Lịch sử phần mềm chấm công.\nTrang 3: Xu hướng thị trường tăng 25% mỗi năm...\n(Yêu cầu quá mơ hồ nên trợ lý bịa cả xu hướng và con số.)"
          }
        ]
      },
      {
        "type": "callout",
        "label": "Kiểm trước khi làm trang chiếu",
        "text": "Dàn ý trôi chảy chưa chắc trung thành với ghi chú. Gạch chân mọi con số, tên và ngày trong dàn ý rồi đối chiếu với ghi chú gốc; cái nào không có trong ghi chú thì là do trợ lý tự thêm."
      },
      {
        "type": "scenario",
        "title": "Đêm trước buổi họp giám đốc",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "8 giờ tối, bạn có ghi chú dài về đổi nhà cung cấp và 10 phút họp sáng mai. Trợ lý vừa dựng dàn ý, đề nghị nằm ở trang 6.",
            "choices": [
              {
                "label": "Giữ nguyên, ghi chú của mình cũng xếp như vậy",
                "next": "bad_order"
              },
              {
                "label": "Yêu cầu đưa đề nghị lên trang hai, bối cảnh xuống phụ lục",
                "next": "s2"
              }
            ]
          },
          "bad_order": {
            "text": "Sáng hôm sau, giám đốc nhìn đồng hồ ở trang 3. Bạn chưa kịp nói bạn xin gì thì hết giờ, phải hẹn lại tuần sau.",
            "ending": "bad"
          },
          "s2": {
            "text": "Dàn ý mới có câu \"Tiết kiệm 12% chi phí bao bì mỗi quý\". Bạn không nhớ có số này trong ghi chú.",
            "choices": [
              {
                "label": "Giữ lại, con số nghe hợp lý và làm bài thuyết phục hơn",
                "next": "bad_num"
              },
              {
                "label": "Tìm trong ghi chú và báo giá; không thấy thì xoá hoặc thay bằng số thật",
                "next": "good"
              }
            ]
          },
          "bad_num": {
            "text": "Giám đốc hỏi 12% tính từ đâu. Bạn không có căn cứ, và cả đề nghị bị nghi ngờ theo.",
            "ending": "bad"
          },
          "good": {
            "text": "Bạn thấy trong báo giá mức giảm thật là 9%, sửa lại kèm tên tài liệu. Sáng mai bạn nói đề nghị trong hai phút đầu và trả lời được câu hỏi về số liệu.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Bạn chọn mục tiêu và ý chính; trợ lý dựng khung.",
          "Bài sau: khi trang chiếu đã có nhưng đầy chữ, làm gọn mà không mất ý."
        ]
      }
    ]
  },
  {
    "track": "personal",
    "isFundamental": false,
    "id": 2271,
    "slug": "bai-trinh-bay-nhieu-chu-lam-gon-lai-nhu-the-nao",
    "title": "Chặng 43, Bài 12: Trang chiếu nhiều chữ: làm gọn mà không mất ý",
    "subtitle": "Trang chiếu đầy chữ làm người nghe cúi xuống điện thoại: rút còn ba ý, giữ nguyên số liệu.",
    "duration": "8 phút",
    "difficulty": "Trung bình",
    "emoji": "✂️",
    "whyItMatters": "Khi bạn nhờ trợ lý rút gọn một trang chiếu, có hai rủi ro: giữ quá nhiều chữ nên vẫn nặng, hoặc gọn nhưng đã đổi một con số hay thêm một câu bạn chưa từng viết. Biết kiểm hai điều đó giúp trang chiếu vừa dễ nhìn vừa không nói sai.",
    "openingQuestion": "Trợ lý rút trang chiếu 120 chữ còn 3 gạch đầu dòng, trông gọn. Điều đáng kiểm nhất trước khi dùng là gì?",
    "openingOptions": [
      "Số liệu, tên và cam kết trong ba dòng còn lại có khớp bản gốc không",
      "Ba dòng có cùng độ dài để nhìn đều và đẹp mắt trên màn hình chiếu không",
      "Trợ lý có dùng đúng phông chữ của công ty cho ba dòng đó không",
      "Ba dòng có bắt đầu bằng một động từ mạnh nghe hấp dẫn hơn không"
    ],
    "correctOption": 0,
    "explanation": "Rút gọn là lúc chữ dễ biến dạng nhất: \"tăng khoảng 8%\" thành \"tăng 8%\", hoặc \"dự kiến quý 3\" thành \"hoàn thành quý 3\". Người nghe tin cái trên màn hình, và sai một số hay một cam kết ảnh hưởng nhiều hơn độ đẹp. Độ dài đều, phông chữ và động từ mạnh là chuyện hình thức, sửa được trong vài giây, không làm bạn nói sai điều gì.",
    "diagram": [
      {
        "label": "Trang chiếu 120 chữ",
        "arrow": true
      },
      {
        "label": "Bạn nói rõ giữ ba ý và giữ nguyên số",
        "arrow": true
      },
      {
        "label": "Trợ lý rút còn ba gạch đầu dòng",
        "arrow": true
      },
      {
        "label": "Bạn đối chiếu số, tên, cam kết với bản gốc"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: anh Tuấn, phòng kinh doanh",
      "description": "Anh Tuấn có một trang chiếu 130 chữ về kết quả quý. Trợ lý rút còn ba ý, trong đó có câu \"doanh số vượt kế hoạch\" trong khi bản gốc nói \"đạt khoảng 96% kế hoạch\". Anh phát hiện khi đọc lại và sửa. Đây là tình huống minh hoạ, số liệu không từ một công ty thật."
    },
    "quiz": [
      {
        "question": "Trang chiếu 120 chữ nên rút còn khoảng bao nhiêu ý chính để người nghe theo kịp?",
        "options": [
          "Khoảng ba ý, mỗi ý một dòng ngắn",
          "Mười ý ngắn, giữ đủ mọi thông tin gốc",
          "Một câu dài ghép hết mọi ý lại",
          "Sáu ý nhỏ, mỗi ý hai câu, để khỏi bị hỏi lại"
        ],
        "correct": 0,
        "explanation": "Người nghe vừa nhìn vừa nghe bạn nói nên chỉ nhớ được vài ý. Mười ý vẫn là bức tường chữ, một câu dài không dễ đọc hơn, và sáu ý hai câu chỉ chia lại lượng chữ cũ. Phần còn lại nên nằm trong lời nói hoặc ghi chú của người trình bày."
      },
      {
        "question": "Bản gốc ghi \"tăng khoảng 8% so với quý trước\". Bản rút gọn nào giữ đúng ý?",
        "options": [
          "Tăng khoảng 8% so với quý trước",
          "Tăng 8% so với cả năm trước",
          "Tăng 8%, vượt kế hoạch đề ra từ đầu năm cho quý",
          "Tăng gần 10% so với quý trước, đã làm tròn"
        ],
        "correct": 0,
        "explanation": "Bản đúng chỉ giản lược, không đổi số hay mốc so sánh. \"Cả năm trước\" đổi mốc so sánh, \"vượt kế hoạch\" thêm cam kết bản gốc không có, còn làm tròn 8% thành 10% là đổi số. Cả ba lỗi cùng kiểu: câu gọn nhưng nói khác đi."
      },
      {
        "question": "Trợ lý rút gọn và thêm dòng \"khách hàng rất hài lòng\" mà bản gốc không có. Nên làm gì?",
        "options": [
          "Xoá dòng đó, trừ khi bạn có số liệu khảo sát để đưa vào",
          "Giữ lại, câu này nghe tích cực và dễ được lòng",
          "Giữ lại nhưng đổi thành in đậm để thu hút sự chú ý của mọi người",
          "Đổi thành \"khách hàng hài lòng 100%\" cho có vẻ chắc chắn hơn"
        ],
        "correct": 0,
        "explanation": "Khi rút gọn, trợ lý hay thêm câu khen nghe chắc tay. Nó không có dữ liệu khảo sát của bạn nên câu đó không có cơ sở; in đậm hay đổi thành 100% chỉ làm nó lộ hơn. Hỏi lại chính trợ lý không phải kiểm chứng, vì nó có thể xác nhận điều nó vừa nghĩ ra."
      },
      {
        "question": "Vì sao nên yêu cầu \"giữ nguyên mọi con số\" khi nhờ rút gọn trang chiếu?",
        "options": [
          "Để trợ lý khỏi làm tròn hay đổi số khi viết lại cho ngắn",
          "Để trang chiếu có thật nhiều con số nhìn cho chuyên nghiệp",
          "Vì trợ lý chỉ biết cách xử lý các câu có chứa con số",
          "Vì con số luôn dễ nhớ hơn chữ với mọi người nghe"
        ],
        "correct": 0,
        "explanation": "Rút gọn khiến chữ bị nén, và con số nằm trong câu rất dễ bị làm tròn hoặc đổi mốc. Dặn giữ nguyên số làm giảm rủi ro đó, dù bạn vẫn phải kiểm. Không phải trợ lý chỉ xử lý được câu có số, và nhiều số không làm trang chuyên nghiệp hơn."
      },
      {
        "question": "Người nghe cần chi tiết về cách tính, nhưng bạn đã rút gọn trang. Chi tiết nên để ở đâu?",
        "options": [
          "Trong ghi chú người trình bày hoặc trang phụ lục",
          "Trở lại thành bức tường chữ trên chính trang chiếu đó nữa",
          "Xoá hẳn, vì người nghe không bao giờ cần chi tiết cả",
          "Đưa vào chân trang bằng chữ nhỏ nhất mà phần mềm cho phép"
        ],
        "correct": 0,
        "explanation": "Trang chiếu là điểm tựa cho lời nói, không phải tài liệu đọc. Chi tiết nên ở ghi chú người trình bày hoặc phụ lục để trả lời khi có người hỏi. Trả lại bức tường chữ phá mục đích rút gọn; xoá hẳn khiến bạn không có gì khi bị hỏi; chữ nhỏ ở chân trang không ai đọc được."
      }
    ],
    "keyTakeaways": [
      "Một trang chiếu, khoảng ba ý; chi tiết để trong lời nói hoặc phụ lục.",
      "Dặn trợ lý giữ nguyên mọi con số, tên và mốc so sánh khi rút gọn.",
      "Rút gọn là lúc chữ dễ đổi nghĩa: \"khoảng\" thành \"đúng\", \"dự kiến\" thành \"đã xong\".",
      "Câu khen hoặc cam kết mà bản gốc không có là do trợ lý tự thêm.",
      "Bạn đối chiếu từng dòng với bản gốc trước khi trình bày."
    ],
    "practicePrompt": {
      "question": "Bản gốc: \"Dự kiến hoàn thành khoảng cuối quý 3, chi phí ước tính 240 triệu\". Dòng rút gọn nào an toàn để đưa lên trang chiếu?",
      "options": [
        "Dự kiến xong cuối quý 3, chi phí ước tính 240 triệu",
        "Đã hoàn thành trong quý 3 với chi phí đúng 240 triệu",
        "Xong sớm hơn dự kiến và tiết kiệm được hơn 240 triệu",
        "Hoàn thành quý 3, chi phí khoảng 250 triệu cho dễ nhớ"
      ],
      "correct": 0,
      "explanation": "Dòng đầu giữ \"dự kiến\" và \"ước tính\". Dòng hai biến kế hoạch thành việc đã xong và \"ước tính\" thành \"đúng\". Dòng ba thêm một kết quả chưa có. Dòng bốn đổi 240 thành 250 để dễ nhớ."
    },
    "summary": {
      "keyIdea": "Gọn không đồng nghĩa với đúng: rút chữ nhưng không đổi số hay cam kết.",
      "formula": "Trang dày chữ → ba ý + giữ nguyên số → đối chiếu từng dòng với bản gốc.",
      "commonMistake": "Nhận bản rút gọn vì trông sạch mà không thấy \"dự kiến\" đã thành \"đã xong\".",
      "action": "Lấy một trang chiếu nhiều chữ của bạn, nhờ rút còn ba ý và đối chiếu từng dòng."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn một trang chiếu nhiều chữ nhất trong bài trình bày gần đây của bạn. Nhờ trợ lý rút còn ba ý, dặn giữ nguyên mọi con số và từ \"dự kiến\", \"khoảng\", \"ước tính\". Đặt bản gốc và bản rút cạnh nhau, gạch chân mọi khác biệt.",
      "secondary": "Ngày mai bảng điều khiển sẽ hỏi: có dòng nào trợ lý đổi số hoặc thêm cam kết không?"
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bạn mở bài trình bày cũ và thấy một trang chiếu dày như trang sách. Ai cũng biết cần rút gọn; điều ít người nghĩ tới là rút gọn cũng là lúc câu chữ đổi nghĩa lặng lẽ nhất."
      },
      {
        "type": "feynman",
        "title": "Rút gọn trang chiếu đơn giản hơn bạn nghĩ",
        "intro": "Hình dung bạn ghi lại số điện thoại và địa chỉ của một quán ăn lên mẩu giấy nhỏ để đưa bạn. Bạn bỏ bớt lời kể, nhưng số điện thoại thì không được sai một chữ số.",
        "columns": [
          "Thành phần",
          "Ví dụ đời thường",
          "Trong công việc của bạn"
        ],
        "rows": [
          [
            "Cả đoạn kể về quán",
            "Đường đi, món ngon, lần bạn ăn ở đó",
            "Đoạn 120 chữ trên trang chiếu"
          ],
          [
            "Mẩu giấy",
            "Chỉ ghi đủ để tìm được quán",
            "Ba ý chính trên trang"
          ],
          [
            "Số điện thoại",
            "Sai một số là gọi nhầm người",
            "Con số, tên, mốc thời gian"
          ],
          [
            "Người viết hộ mẩu giấy",
            "Gọn tay nhưng có thể ghi nhầm số",
            "Trợ lý rút gọn, bạn kiểm số"
          ]
        ],
        "oneLiner": "Được bỏ lời, không được bỏ hoặc đổi con số: gọn tới đâu cũng phải đúng."
      },
      {
        "type": "heading",
        "text": "Hai loại lỗi khi rút gọn"
      },
      {
        "type": "paragraph",
        "text": "Loại thứ nhất là mất ý: dòng còn lại không nói đúng điều quan trọng nhất. Loại thứ hai nguy hiểm hơn là đổi hoặc thêm ý: câu gọn hơn nhưng nói khác bản gốc. Người nghe không có bản gốc trước mặt nên họ tin cái trên màn hình."
      },
      {
        "type": "list",
        "items": [
          "Dặn trợ lý: rút còn ba ý, giữ nguyên mọi con số, tên và mốc so sánh.",
          "Dặn giữ nguyên các từ chỉ mức chắc chắn: dự kiến, khoảng, ước tính.",
          "Đặt bản gốc cạnh bản rút, đọc từng dòng.",
          "Chi tiết cắt đi thì chuyển vào ghi chú người trình bày."
        ]
      },
      {
        "type": "flow",
        "title": "Rút gọn một trang chiếu an toàn",
        "steps": [
          {
            "label": "Dán trang gốc",
            "detail": "Đưa nguyên văn trang chiếu và nói rõ người nghe là ai để trợ lý biết ý nào quan trọng."
          },
          {
            "label": "Ra điều kiện",
            "detail": "Ba ý, giữ nguyên số và từ chỉ mức chắc chắn, không thêm câu nào bản gốc không có."
          },
          {
            "label": "Nhận bản rút",
            "detail": "Trợ lý viết lại thành ba gạch đầu dòng ngắn."
          },
          {
            "label": "Đối chiếu",
            "detail": "So từng dòng với bản gốc: số, tên, mốc, cam kết. Sửa ngay chỗ nào lệch."
          },
          {
            "label": "Chuyển chi tiết",
            "detail": "Phần cắt khỏi trang được đưa vào ghi chú người trình bày hoặc phụ lục."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Rút gọn đúng",
          "text": "\"Dự kiến xong cuối quý 3, chi phí ước tính 240 triệu.\" Ngắn hơn bản gốc nhưng mọi số, mọi mức chắc chắn còn nguyên."
        },
        "right": {
          "label": "Rút gọn đổi nghĩa",
          "text": "\"Xong quý 3 với chi phí 240 triệu.\" Ngắn nhưng dự kiến đã thành chắc chắn và ước tính đã thành con số cuối."
        }
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Soát bản rút gọn của trợ lý",
        "task": "Bản gốc trang chiếu: doanh số quý đạt khoảng 96% kế hoạch; khách mới tăng nhờ chương trình giới thiệu; dự kiến mở thêm một điểm bán vào quý sau; chưa quyết định ngân sách tuyển người. Đánh dấu những dòng trợ lý tự thêm hoặc đổi.",
        "segments": [
          {
            "text": "Doanh số quý đạt khoảng 96% kế hoạch."
          },
          {
            "text": "Doanh số quý vượt kế hoạch 4%.",
            "error": "Bản gốc nói đạt khoảng 96% - tức chưa đạt kế hoạch. Trợ lý đảo kết luận và thêm số 4%."
          },
          {
            "text": "Khách mới tăng nhờ chương trình giới thiệu."
          },
          {
            "text": "Dự kiến mở thêm một điểm bán vào quý sau."
          },
          {
            "text": "Ngân sách tuyển thêm 5 nhân viên đã được duyệt.",
            "error": "Bản gốc nói CHƯA quyết định ngân sách tuyển người; trợ lý bịa con số 5 và trạng thái đã duyệt."
          },
          {
            "text": "Khách hàng rất hài lòng với dịch vụ.",
            "error": "Bản gốc không có dòng này; trợ lý tự thêm câu khen nghe chắc tay."
          }
        ]
      },
      {
        "type": "callout",
        "label": "Lời khuyên cho người trình bày",
        "text": "Nếu rút gọn khiến bạn không nhớ lý do của một dòng, đừng bỏ lý do: viết nó vào ghi chú người trình bày. Khi có người hỏi, bạn có câu trả lời mà trang chiếu vẫn sạch."
      },
      {
        "type": "scenario",
        "title": "Trang chiếu doanh số 5 phút trước họp",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Còn 5 phút, bạn nhờ trợ lý rút trang chiếu 120 chữ còn 3 ý. Bản rút có dòng \"Doanh số vượt kế hoạch 4%\", trong khi bạn nhớ bản gốc ghi khoảng 96%.",
            "choices": [
              {
                "label": "Đưa lên luôn, trợ lý đã đọc bản gốc rồi",
                "next": "bad_swap"
              },
              {
                "label": "Mở bản gốc, sửa lại thành khoảng 96% kế hoạch",
                "next": "s2"
              }
            ]
          },
          "bad_swap": {
            "text": "Trưởng phòng hỏi vì sao số này khác báo cáo gửi tuần trước. Bạn không giải thích được, cả trang mất độ tin cậy.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bạn đã sửa số. Trang còn có câu \"khách hàng rất hài lòng\" mà bản gốc không có.",
            "choices": [
              {
                "label": "Giữ, câu đó làm trang dễ nghe hơn",
                "next": "bad_praise"
              },
              {
                "label": "Xoá, hoặc thay bằng số liệu khảo sát nếu bạn có",
                "next": "good"
              }
            ]
          },
          "bad_praise": {
            "text": "Một người hỏi khảo sát nào nói vậy. Bạn không có nguồn, và trang chiếu bị nghi ngờ ngay từ dòng cuối.",
            "ending": "bad"
          },
          "good": {
            "text": "Bạn nói ba ý trong hai phút và đặt chi tiết vào ghi chú. Khi có người hỏi về con số, bạn trả lời đúng.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Rút chữ, không đổi số, không thêm cam kết.",
          "Bài sau: hình minh hoạ do AI tạo cho trang chiếu, khi nào nên dùng."
        ]
      }
    ]
  },
  {
    "track": "personal",
    "isFundamental": false,
    "id": 2272,
    "slug": "hinh-anh-do-ai-tao-cho-bai-trinh-bay-dung-va-can-than",
    "title": "Chặng 43, Bài 13: Hình do AI tạo cho trang chiếu: dùng và cẩn thận",
    "subtitle": "Bạn cần một hình minh hoạ cho trang chiếu: hình AI tạo giúp được, nhưng có những chỗ phải dùng ảnh thật.",
    "duration": "8 phút",
    "difficulty": "Trung bình",
    "emoji": "🖼️",
    "whyItMatters": "Hình do AI tạo ra rất nhanh và không cần mua ảnh, nhưng người xem dễ tưởng đó là cảnh thật. Một trang chiếu dùng hình dựng để \"chứng minh\" điều có thật, hoặc chứa gương mặt giống một người thật, có thể làm bạn mất uy tín. Bài này dạy phân biệt chỗ hợp lý và chỗ nên dùng ảnh thật.",
    "openingQuestion": "Bạn cần hình cho trang chiếu \"Đội ngũ của chúng tôi\" trong hồ sơ gửi khách. Lựa chọn nào phù hợp nhất?",
    "openingOptions": [
      "Ảnh thật của đội, chụp bằng điện thoại cũng được, vì đây là bằng chứng có thật",
      "Nhờ AI tạo ảnh một đội ngũ trông thật để hồ sơ trông chuyên nghiệp hơn",
      "Tải ảnh một nhóm người đang cười từ Internet về cho trang chiếu đẹp lên",
      "Dùng ảnh AI tạo và không ghi chú gì, vì khách sẽ không để ý đâu"
    ],
    "correctOption": 0,
    "explanation": "Trang \"đội ngũ\" là để khách tin vào những người thật sẽ làm việc với họ. Ảnh AI tạo là hình dựng nên không phải bằng chứng, và nếu khách nhận ra sẽ nghi ngờ cả hồ sơ. Ảnh tải từ mạng có thể vướng bản quyền và không phải người của bạn. Ảnh thật, dù chụp giản dị, đúng với mục đích của trang.",
    "diagram": [
      {
        "label": "Bạn cần một hình cho trang chiếu",
        "arrow": true
      },
      {
        "label": "Hình cần là bằng chứng hay chỉ minh hoạ ý",
        "arrow": true
      },
      {
        "label": "Bằng chứng: ảnh thật; minh hoạ: có thể dùng hình AI",
        "arrow": true
      },
      {
        "label": "Hình AI thì ghi chú rõ và kiểm chi tiết lạ"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: chị Mai, phòng truyền thông nội bộ",
      "description": "Chị Mai cần hình cho trang chiếu về \"văn hoá làm việc linh hoạt\". Chị nhờ trợ lý tạo hình minh hoạ một bàn làm việc trừu tượng và ghi chú \"hình minh hoạ do AI tạo\". Với trang giới thiệu nhân sự thật, chị dùng ảnh do đồng nghiệp tự nguyện chụp. Đây là tình huống minh hoạ."
    },
    "quiz": [
      {
        "question": "Trang chiếu nào phù hợp để dùng hình AI tạo, kèm ghi chú?",
        "options": [
          "Trang giải thích một khái niệm trừu tượng như \"làm việc nhóm\"",
          "Trang chứng minh sản phẩm đã lắp ở nhà khách thật",
          "Trang giới thiệu chân dung ban giám đốc trong báo cáo thường niên",
          "Trang trưng bày kết quả một thí nghiệm hoặc kiểm tra chất lượng"
        ],
        "correct": 0,
        "explanation": "Hình minh hoạ ý trừu tượng không khẳng định điều gì có thật, nên hình AI phù hợp nếu ghi chú rõ. Ba trang còn lại là bằng chứng: lắp đặt thật, người thật, kết quả thật. Dùng hình dựng ở đó dễ khiến người xem tin nhầm hoặc nghi ngờ cả trang."
      },
      {
        "question": "Hình AI tạo một nhóm nhân viên, nhưng một người có sáu ngón tay và chữ trên áo lộn xộn. Nên làm gì?",
        "options": [
          "Không dùng hình đó, hoặc nhờ tạo lại và kiểm kỹ từng chi tiết",
          "Dùng luôn vì người xem thường chỉ nhìn tổng thể bức hình mà thôi",
          "Che chỗ bị lỗi bằng một dấu chấm tròn nhưng vẫn dùng hình đó",
          "Dùng và tự tin rằng ai hỏi thì mình giải thích là phong cách"
        ],
        "correct": 0,
        "explanation": "Ngón tay, chữ và logo là chỗ hình AI hay sai. Người xem có thể để ý, và một chi tiết sai làm cả bài trông cẩu thả. Che bằng dấu chấm chỉ làm lỗi nổi hơn, còn nói đó là phong cách là bao biện cho lỗi."
      },
      {
        "question": "Hình AI tạo gương mặt trông giống một người nổi tiếng. Vì sao nên tránh dùng?",
        "options": [
          "Vì hình có thể bị hiểu là người thật và gây hiểu lầm hoặc vướng quyền hình ảnh",
          "Vì hình AI bị cấm dùng hoàn toàn trong mọi bài trình bày công ty",
          "Vì hình AI tạo ra luôn có độ phân giải quá thấp để chiếu lên màn",
          "Vì người nổi tiếng có mặt sẽ làm người nghe không tập trung"
        ],
        "correct": 0,
        "explanation": "Gương mặt giống người thật có thể khiến người xem tưởng người đó đồng ý hoặc tham gia, và có thể đụng vào quyền hình ảnh; cần hỏi bộ phận pháp chế nếu cần dùng. Không có quy định chung cấm mọi hình AI, độ phân giải không phải vấn đề chính, còn chuyện tập trung chỉ là phụ."
      },
      {
        "question": "Cách ghi chú nào phù hợp khi dùng hình AI tạo trong trang chiếu?",
        "options": [
          "Ghi ở góc trang: \"Hình minh hoạ do AI tạo\"",
          "Không ghi gì vì ghi chú làm trang chiếu trông kém chuyên nghiệp",
          "Ghi \"Ảnh chụp thực tế\" để người xem tin tưởng hơn vào nội dung",
          "Ghi tên của trợ lý AI nhưng không nói hình có phải dựng không"
        ],
        "correct": 0,
        "explanation": "Người xem có quyền biết hình là dựng hay thật. Ghi ngắn gọn ở góc không làm trang xấu đi. Ghi \"ảnh chụp thực tế\" là nói dối, còn chỉ ghi tên công cụ mà không nói hình là dựng vẫn để người xem đoán."
      },
      {
        "question": "Khi không chắc nên dùng ảnh thật hay hình AI cho một trang, câu hỏi nào giúp quyết định nhanh nhất?",
        "options": [
          "Hình này có đang chứng minh một điều có thật không",
          "Hình nào tạo ra nhanh hơn trong năm phút",
          "Hình nào có màu sắc đẹp và bắt mắt hơn khi chiếu lên",
          "Hình nào ít tốn tiền hơn cho ngân sách của phòng mình"
        ],
        "correct": 0,
        "explanation": "Nếu hình là bằng chứng (người, nơi chốn, kết quả thật) thì phải là ảnh thật. Nếu chỉ minh hoạ ý thì hình AI hợp lý. Tốc độ, màu sắc và chi phí là những lý do phụ, không quyết định được nên dùng loại nào."
      }
    ],
    "keyTakeaways": [
      "Hình chứng minh điều có thật (người, nơi, kết quả) phải là ảnh thật.",
      "Hình minh hoạ ý trừu tượng có thể dùng hình AI tạo, kèm ghi chú.",
      "Kiểm tay, chữ, logo và mọi chi tiết lạ trong hình AI trước khi dùng.",
      "Không dùng hình AI có gương mặt giống người thật; hỏi bộ phận pháp chế nếu cần.",
      "Ghi rõ \"hình minh hoạ do AI tạo\" ở góc trang."
    ],
    "practicePrompt": {
      "question": "Trang \"Quy trình 3 bước\" cần một hình minh hoạ chung, không cần người thật hay địa điểm thật. Cách làm nào hợp lý?",
      "options": [
        "Nhờ AI tạo hình minh hoạ trừu tượng, kiểm chi tiết và ghi chú là hình AI tạo",
        "Tải ảnh có sẵn từ mạng về cho nhanh mà không xem nguồn và quyền dùng",
        "Nhờ AI tạo ảnh chụp \"khách hàng thật của công ty\" để tăng độ tin cậy với khách",
        "Bỏ hẳn hình vì mọi hình do AI tạo đều không được dùng trong công việc"
      ],
      "correct": 0,
      "explanation": "Hình minh hoạ chung không khẳng định điều gì có thật nên dùng hình AI là hợp lý, nhưng phải kiểm chi tiết và ghi chú. Ảnh tải về có thể vướng bản quyền, ảnh \"khách hàng thật\" dựng lên là gây hiểu nhầm, và không có quy định nào cấm mọi hình AI."
    },
    "summary": {
      "keyIdea": "Hình AI hợp để minh hoạ ý, không hợp để làm bằng chứng.",
      "formula": "Hình cần chứng minh điều có thật → ảnh thật; hình chỉ minh hoạ → hình AI có ghi chú và đã kiểm chi tiết.",
      "commonMistake": "Dùng hình AI trông rất thật để \"chứng minh\" đội ngũ, khách hàng hay kết quả.",
      "action": "Lật lại bài trình bày gần nhất và phân loại từng hình: bằng chứng hay minh hoạ."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Mở một bài trình bày của bạn và lập danh sách mọi hình. Với mỗi hình, ghi \"bằng chứng\" hoặc \"minh hoạ\". Với một hình minh hoạ, nhờ trợ lý tạo một hình thay thế, kiểm tay, chữ và chi tiết lạ, rồi thêm ghi chú \"hình minh hoạ do AI tạo\".",
      "secondary": "Ngày mai bảng điều khiển sẽ hỏi: bạn có hình nào phải đổi thành ảnh thật không?"
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bạn cần một hình cho trang chiếu và không có ngân sách mua ảnh. Trợ lý tạo hình chỉ mất vài giây, nhưng người xem sẽ hiểu hình đó là gì - thật hay dựng - và điều đó quyết định bạn được tin hay bị nghi ngờ."
      },
      {
        "type": "feynman",
        "title": "Hình AI tạo đơn giản hơn bạn nghĩ",
        "intro": "Hình dung một hoạ sĩ vẽ minh hoạ cho một bài báo: bạn xem là biết đó là tranh vẽ. Nếu bài báo đăng tranh vẽ và ghi \"ảnh chụp tại hiện trường\" thì đó là nói dối.",
        "columns": [
          "Thành phần",
          "Ví dụ đời thường",
          "Trong công việc của bạn"
        ],
        "rows": [
          [
            "Tranh minh hoạ trên báo",
            "Không ai coi là ảnh thật",
            "Hình AI tạo, ghi chú rõ là hình dựng"
          ],
          [
            "Ảnh phóng viên chụp",
            "Chứng minh có chuyện thật",
            "Ảnh thật của đội, sản phẩm, kết quả"
          ],
          [
            "Ghi chú dưới ảnh",
            "Cho người đọc biết loại hình",
            "Dòng \"hình minh hoạ do AI tạo\""
          ],
          [
            "Hoạ sĩ vẽ hộ",
            "Vẽ đẹp nhưng vẽ chi tiết sai vẫn nhìn như thật",
            "Trợ lý tạo hình, bạn kiểm chi tiết"
          ]
        ],
        "oneLiner": "Hình dựng dùng để minh hoạ, ảnh thật dùng để chứng minh, và luôn nói rõ loại nào."
      },
      {
        "type": "heading",
        "text": "Hỏi một câu trước khi tạo hình"
      },
      {
        "type": "paragraph",
        "text": "Câu hỏi là: hình này có đang chứng minh điều gì có thật không? Nếu có, dùng ảnh thật. Nếu chỉ minh hoạ một ý như \"làm việc nhóm\" hay \"quy trình\", hình AI có thể phù hợp."
      },
      {
        "type": "list",
        "items": [
          "Bằng chứng (ảnh đội, sản phẩm, công trình, kết quả): ảnh thật.",
          "Minh hoạ ý trừu tượng: hình AI, có ghi chú.",
          "Không tạo gương mặt giống người thật hoặc logo của công ty khác.",
          "Kiểm tay, chữ, logo và mọi chi tiết lạ trước khi dùng."
        ]
      },
      {
        "type": "flow",
        "title": "Quyết định dùng hình cho một trang chiếu",
        "steps": [
          {
            "label": "Nhìn mục đích trang",
            "detail": "Trang này chứng minh điều có thật hay chỉ giải thích một ý. Đây là bước quyết định loại hình."
          },
          {
            "label": "Chọn ảnh thật hoặc hình AI",
            "detail": "Bằng chứng thì chụp ảnh thật hoặc lấy ảnh bạn có quyền dùng. Minh hoạ thì có thể nhờ trợ lý tạo hình."
          },
          {
            "label": "Viết mô tả cụ thể",
            "detail": "Nếu tạo hình AI, mô tả rõ nội dung, phong cách và điều không muốn có (chữ, logo, gương mặt)."
          },
          {
            "label": "Kiểm chi tiết",
            "detail": "Xem kỹ tay, chữ, logo, đồ vật lạ. Chỗ nào sai thì tạo lại hoặc không dùng."
          },
          {
            "label": "Ghi chú",
            "detail": "Thêm dòng nhỏ \"hình minh hoạ do AI tạo\" ở góc trang."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Ảnh thật",
          "text": "Dùng khi hình chứng minh điều có thật: đội ngũ, sản phẩm, công trình, kết quả. Có thể giản dị, nhưng thật."
        },
        "right": {
          "label": "Hình AI tạo",
          "text": "Dùng để minh hoạ ý trừu tượng hoặc làm nền. Cần ghi chú và kiểm chi tiết lạ; không dùng để làm bằng chứng."
        }
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ trợ lý tạo hình cho trang \"Quy trình 3 bước\"",
        "task": "Bạn cần một hình minh hoạ trừu tượng cho trang quy trình. Lắp yêu cầu để trợ lý tạo hình.",
        "parts": [
          {
            "id": "purpose",
            "label": "Mục đích",
            "options": [
              {
                "text": "Tạo hình đẹp cho trang chiếu.",
                "feedback": "Quá mơ hồ - hình có thể chứa người, chữ, cảnh không liên quan."
              },
              {
                "text": "Hình minh hoạ trừu tượng cho một quy trình 3 bước, không cần người hay địa điểm thật.",
                "good": true,
                "feedback": "Nêu rõ đây là minh hoạ, tránh hình giả làm bằng chứng."
              }
            ]
          },
          {
            "id": "avoid",
            "label": "Điều cần tránh",
            "options": [
              {
                "text": "Không có chữ, logo hoặc gương mặt trong hình.",
                "good": true,
                "feedback": "Tránh đúng các chỗ hình AI hay sai và hay gây hiểu lầm."
              },
              {
                "text": "Càng nhiều chi tiết càng tốt.",
                "feedback": "Nhiều chi tiết thì càng nhiều chỗ để sai."
              }
            ]
          },
          {
            "id": "label",
            "label": "Ghi chú",
            "options": [
              {
                "text": "Sẽ ghi \"hình minh hoạ do AI tạo\" ở góc trang.",
                "good": true,
                "feedback": "Người xem biết hình là dựng."
              },
              {
                "text": "Không ghi gì, hình đẹp thì thôi.",
                "feedback": "Người xem có thể tưởng hình là thật."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "purpose",
              "avoid",
              "label"
            ],
            "text": "Hình: ba hình khối nối nhau bằng mũi tên trên nền màu nhạt, không chữ, không người.\nGhi chú ở góc: \"Hình minh hoạ do AI tạo\".\n(Hình rõ mục đích, không chi tiết dễ sai, có ghi chú.)"
          },
          {
            "requires": [
              "purpose"
            ],
            "text": "Hình: ba hình khối trừu tượng, nhưng có một dòng chữ mờ lộn xộn ở góc và hai bàn tay lạ.\n(Đúng mục đích nhưng chưa dặn tránh chữ và người nên hình có chi tiết sai.)"
          },
          {
            "text": "Hình: cảnh văn phòng có nhiều người, một biển hiệu chữ vô nghĩa và logo giống một hãng thật.\n(Yêu cầu mơ hồ nên hình có người, chữ sai và logo dễ gây hiểu lầm.)"
          }
        ]
      },
      {
        "type": "callout",
        "label": "Hỏi người phụ trách khi có nghi ngờ",
        "text": "Nếu hình có gương mặt, logo hoặc tác phẩm của người khác, hỏi bộ phận pháp chế hoặc truyền thông trước khi dùng. Đừng tự kết luận rằng hình dựng thì không sao."
      },
      {
        "type": "scenario",
        "title": "Hồ sơ gửi khách chiều nay",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn làm hồ sơ giới thiệu năng lực cho khách. Trang \"Đội ngũ\" còn thiếu hình, và bạn chưa có ảnh nào đủ đẹp.",
            "choices": [
              {
                "label": "Nhờ AI tạo ảnh một đội ngũ trông thật rồi để nguyên",
                "next": "bad_team"
              },
              {
                "label": "Nhờ đồng nghiệp chụp nhanh vài ảnh thật, giản dị nhưng đúng người",
                "next": "s2"
              }
            ]
          },
          "bad_team": {
            "text": "Khách gặp đội ngũ thật và thấy không ai giống hình. Họ hỏi vì sao hồ sơ dùng ảnh không thật.",
            "ending": "bad"
          },
          "s2": {
            "text": "Trang \"Quy trình 3 bước\" cần hình minh hoạ. Trợ lý tạo hình có một dòng chữ mờ lộn xộn ở góc.",
            "choices": [
              {
                "label": "Dùng luôn, chữ mờ chắc không ai đọc",
                "next": "bad_text"
              },
              {
                "label": "Yêu cầu tạo lại không có chữ, rồi thêm ghi chú hình AI",
                "next": "good"
              }
            ]
          },
          "bad_text": {
            "text": "Trưởng phòng kinh doanh chỉ vào dòng chữ vô nghĩa và hỏi đó là gì. Bạn phải rút hồ sơ ra sửa lại.",
            "ending": "bad"
          },
          "good": {
            "text": "Trang đội ngũ dùng ảnh thật, trang quy trình dùng hình minh hoạ có ghi chú. Khách khen hồ sơ rõ ràng và trung thực.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Ảnh thật để chứng minh, hình AI để minh hoạ, và luôn ghi rõ.",
          "Bài sau: biên bản họp do AI ghi, đọc lại trước khi gửi."
        ]
      }
    ]
  },
  {
    "track": "personal",
    "isFundamental": false,
    "id": 2273,
    "slug": "ghi-chu-cuoc-hop-do-ai-lam-doc-lai-truoc-khi-gui",
    "title": "Chặng 43, Bài 14: Biên bản họp do AI ghi: đọc lại trước khi gửi",
    "subtitle": "Cuộc họp một tiếng và công cụ đã ghi lại biên bản: đọc lại tên, hạn chót và việc được giao trước khi gửi cả nhóm.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "📝",
    "whyItMatters": "Biên bản do công cụ ghi lại làm bạn tiết kiệm nhiều thời gian, nhưng sai một tên người, một hạn chót hay một việc được giao nhầm chủ sẽ khiến cả nhóm làm sai hoặc quên việc. Cuộc họp càng dài thì càng dễ sót, nên đọc lại biên bản là bước không bỏ được.",
    "openingQuestion": "Công cụ ghi biên bản họp trả về bản tóm tắt gọn sau cuộc họp một tiếng. Bạn nên kiểm điều gì trước tiên khi cả nhóm sẽ làm theo biên bản này?",
    "openingOptions": [
      "Từng việc được giao: ai làm, hạn chót ngày nào, có đúng như trong họp không",
      "Bản tóm tắt có đủ ngắn để mọi người kịp đọc trong hai phút không",
      "Bản tóm tắt có dùng đúng phông chữ và màu của công ty không",
      "Bản tóm tắt có mở đầu bằng lời cảm ơn mọi người tham dự không"
    ],
    "correctOption": 0,
    "explanation": "Biên bản có giá trị nhất ở chỗ ai làm gì, hạn ngày nào. Công cụ ghi âm có thể nghe nhầm tên, gán việc cho người khác hoặc bỏ sót một việc được nhắc lướt, và cả nhóm sẽ làm theo bản viết. Độ ngắn, phông chữ và lời cảm ơn là chuyện hình thức. Sửa được ngay và không làm ai làm sai việc.",
    "diagram": [
      {
        "label": "Cuộc họp được ghi lại",
        "arrow": true
      },
      {
        "label": "Công cụ tạo biên bản và danh sách việc",
        "arrow": true
      },
      {
        "label": "Bạn đối chiếu tên, hạn, việc với trí nhớ và ghi chú",
        "arrow": true
      },
      {
        "label": "Gửi cả nhóm kèm chủ việc và hạn rõ"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: nhóm dự án của chị Lan",
      "description": "Sau buổi họp một tiếng, công cụ ghi biên bản ghi việc \"gửi báo giá\" cho anh Minh, trong khi thực tế chị Lan nhận việc đó. Chị đọc lại và sửa trước khi gửi. Nếu không, không ai gửi báo giá đúng hạn. Đây là tình huống minh hoạ; công cụ và người trong tình huống là hư cấu."
    },
    "quiz": [
      {
        "question": "Trong biên bản do công cụ ghi, mục nào cần đối chiếu kỹ nhất với cuộc họp?",
        "options": [
          "Tên người nhận việc và hạn chót của từng việc",
          "Câu mở đầu giới thiệu chủ đề cuộc họp",
          "Phần liệt kê danh sách người có mặt trong phòng họp",
          "Đoạn kết cảm ơn mọi người đã tham gia buổi họp hôm nay"
        ],
        "correct": 0,
        "explanation": "Tên người và hạn chót quyết định việc gì được làm, ai làm và khi nào; sai một trong hai là cả nhóm hành động sai. Câu mở đầu, danh sách người có mặt và lời kết ít gây hậu quả và dễ sửa."
      },
      {
        "question": "Công cụ ghi \"anh Nam gửi báo cáo trước thứ Sáu\", nhưng trong họp anh Nam nói \"tôi sẽ cố gắng gửi trước thứ Sáu nếu có số liệu\". Vấn đề là gì?",
        "options": [
          "Điều kiện \"nếu có số liệu\" bị mất, nên cam kết nghe chắc hơn thực tế",
          "Không có vấn đề vì công cụ chỉ cần ghi việc chính và hạn là đủ",
          "Công cụ ghi sai tên anh Nam vì tên nghe giống tên người khác",
          "Công cụ đã tự thêm thứ Sáu vì bản ghi không có mốc thời gian nào"
        ],
        "correct": 0,
        "explanation": "Khi tóm tắt, điều kiện và từ chỉ mức chắc chắn hay bị bỏ. Cả nhóm sẽ hiểu là anh Nam đã cam kết chắc chắn trong khi thật ra còn phụ thuộc số liệu. Vì vậy phải giữ điều kiện trong biên bản. Không phải chuyện tên hay mốc thời gian, và ghi thiếu điều kiện có thể gây hiểu lầm."
      },
      {
        "question": "Cuộc họp có hai người tên Minh. Biên bản chỉ ghi \"Minh làm báo giá\". Nên làm gì?",
        "options": [
          "Sửa thành họ tên hoặc bộ phận, để không ai hiểu nhầm là mình hoặc người kia",
          "Giữ nguyên vì cả nhóm đều nhớ rõ ai là Minh nào trong buổi họp",
          "Xoá dòng đó khỏi biên bản cho khỏi bị hiểu lầm về việc giao",
          "Nhờ công cụ đoán xem Minh nào rồi tin theo kết quả nó trả về"
        ],
        "correct": 0,
        "explanation": "Hai người cùng tên là nguồn gây nhầm việc phổ biến. Ghi rõ họ tên đầy đủ hoặc bộ phận. Không nên tin rằng mọi người đều nhớ, xoá dòng thì việc bị bỏ rơi, còn để công cụ đoán thì nó chỉ đoán chữ nghe hợp lý."
      },
      {
        "question": "Cuộc họp 90 phút có 12 việc được giao; công cụ chỉ liệt kê 8 việc. Cách xử lý hợp lý nhất?",
        "options": [
          "Nghe lại hoặc xem lại ghi chú để tìm bốn việc còn thiếu trước khi gửi",
          "Gửi biên bản có 8 việc, ai thấy thiếu việc của mình thì sẽ tự nhắc lại sau",
          "Thêm bốn việc bất kỳ cho đủ 12 rồi tự phân công lại cho mọi người",
          "Xoá bớt bốn việc trong danh sách cho khớp con số mà công cụ ghi"
        ],
        "correct": 0,
        "explanation": "Họp càng dài, việc bị bỏ sót càng nhiều, nhất là việc được nhắc lướt cuối cuộc họp. Việc bị sót là việc không ai làm. Chờ người khác tự nhắc thì không đảm bảo, còn thêm hoặc xoá bừa để cho khớp con số sẽ tạo ra các việc không có thật."
      },
      {
        "question": "Vì sao biên bản nên ghi mỗi việc kèm tên người và hạn chót?",
        "options": [
          "Vì việc không có chủ hoặc không có hạn thường không được làm",
          "Vì công cụ ghi biên bản chỉ chấp nhận việc có đủ hai thông tin đó",
          "Vì việc có tên người sẽ tự động được nhắc trên điện thoại của họ",
          "Vì biên bản dài sẽ được lưu trữ tốt hơn trong hệ thống của công ty"
        ],
        "correct": 0,
        "explanation": "Việc không có người nhận thì ai cũng nghĩ là người khác làm; việc không hạn thì luôn có việc khác gấp hơn. Không phải công cụ bắt buộc, và không có gì đảm bảo việc được nhắc tự động; độ dài biên bản cũng không liên quan tới việc được làm hay không."
      }
    ],
    "keyTakeaways": [
      "Đọc lại mọi việc được giao: ai làm, hạn ngày nào, có điều kiện gì.",
      "Cuộc họp càng dài thì càng dễ sót việc: đối chiếu số việc với ghi chú của bạn.",
      "Tên trùng hoặc nghe giống nhau dễ bị ghi nhầm: ghi họ tên đầy đủ.",
      "Giữ điều kiện và mức chắc chắn (\"nếu\", \"cố gắng\") khi tóm tắt.",
      "Mỗi việc trong biên bản có một chủ việc và một hạn."
    ],
    "practicePrompt": {
      "question": "Trong họp, chị Hà nói \"tôi sẽ gửi báo giá cho khách vào thứ Tư\". Dòng nào trong biên bản là đúng và đủ?",
      "options": [
        "Chị Hà gửi báo giá cho khách vào thứ Tư",
        "Báo giá sẽ được gửi cho khách trong tuần này",
        "Bộ phận kinh doanh gửi báo giá cho khách hàng",
        "Chị Hà gửi báo giá cho khách, dự kiến vào thứ Năm"
      ],
      "correct": 0,
      "explanation": "Dòng đầu có chủ việc (chị Hà), việc và hạn (thứ Tư). Dòng hai mất chủ việc và đổi hạn thành \"trong tuần\". Dòng ba đổi người thành cả bộ phận. Dòng bốn có chủ việc nhưng sai hạn."
    },
    "summary": {
      "keyIdea": "Biên bản do công cụ ghi là bản nháp: kiểm việc, người và hạn trước khi gửi.",
      "formula": "Biên bản nháp + ghi chú của bạn → đối chiếu tên, hạn, điều kiện → gửi kèm chủ việc và hạn.",
      "commonMistake": "Gửi ngay vì bản tóm tắt gọn và trôi chảy, trong khi tên và hạn chưa được đối chiếu.",
      "action": "Sau buổi họp tiếp theo, đối chiếu từng việc trong biên bản với ghi chú của bạn."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Lấy biên bản của một buổi họp gần đây (do công cụ ghi hoặc bạn nhờ trợ lý tóm tắt từ ghi chú). Lập bảng ba cột: việc, người, hạn. Đánh dấu việc nào thiếu người, thiếu hạn hoặc mất điều kiện, rồi sửa lại.",
      "secondary": "Ngày mai bảng điều khiển sẽ hỏi: có việc nào bị ghi sai người hoặc sai hạn không?"
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bạn vừa họp xong một tiếng, công cụ đã có sẵn biên bản trong hộp thư. Bấm gửi mất năm giây, nhưng nếu trong đó có một tên hoặc một hạn chót sai, cả nhóm sẽ làm theo bản sai."
      },
      {
        "type": "feynman",
        "title": "Biên bản họp do AI ghi đơn giản hơn bạn nghĩ",
        "intro": "Hình dung một bạn ngồi cạnh ghi lại cuộc họp rất nhanh nhưng đôi lúc nghe nhầm tên, quên vế \"nếu\" và bỏ sót việc được nhắc lướt. Bản ghi của bạn ấy dùng được, sau khi bạn đọc lại.",
        "columns": [
          "Thành phần",
          "Ví dụ đời thường",
          "Trong công việc của bạn"
        ],
        "rows": [
          [
            "Người ghi hộ",
            "Nhanh, gọn, đôi khi nghe nhầm",
            "Công cụ ghi biên bản"
          ],
          [
            "Tên người",
            "Nghe giống nhau dễ nhầm",
            "Hai người cùng tên Minh"
          ],
          [
            "Vế \"nếu có số liệu\"",
            "Người ghi hay bỏ vì nghe phụ",
            "Điều kiện trong cam kết"
          ],
          [
            "Người chịu trách nhiệm",
            "Là người ký tên gửi",
            "Bạn - người gửi biên bản"
          ]
        ],
        "oneLiner": "Công cụ ghi hộ, bạn chịu trách nhiệm: đọc lại rồi mới gửi."
      },
      {
        "type": "heading",
        "text": "Ba chỗ biên bản hay sai"
      },
      {
        "type": "paragraph",
        "text": "Tên (nghe nhầm hoặc trùng tên), hạn chót (\"tuần sau\" thành một ngày cụ thể bịa ra), và điều kiện (\"sẽ cố gắng\" thành \"sẽ làm\"). Ngoài ra là việc bị sót, nhất là ở cuối cuộc họp dài."
      },
      {
        "type": "list",
        "items": [
          "Đối chiếu từng việc: chủ việc, việc, hạn, điều kiện.",
          "Ghi họ tên đầy đủ khi có người trùng tên.",
          "Đếm số việc trong biên bản và so với ghi chú của bạn.",
          "Chỉ gửi khi mỗi việc có một chủ việc và một hạn."
        ]
      },
      {
        "type": "chart",
        "title": "Họp càng dài, sót việc càng nhiều",
        "caption": "Số liệu minh hoạ, không đo từ công cụ nào. Số việc giao ra và tỉ lệ sót do bạn chỉnh; đồ thị chỉ cho thấy họp dài hơn thì số việc có thể bị sót tăng theo.",
        "kind": "line",
        "xLabel": "Độ dài cuộc họp (phút)",
        "yLabel": "Số việc có thể bị sót",
        "x": {
          "from": 15,
          "to": 120,
          "step": 15
        },
        "params": [
          {
            "id": "tasks",
            "label": "Việc giao ra mỗi giờ họp",
            "min": 1,
            "max": 10,
            "step": 1,
            "value": 4,
            "unit": "việc"
          },
          {
            "id": "miss",
            "label": "Tỉ lệ việc bị sót",
            "min": 0,
            "max": 50,
            "step": 5,
            "value": 15,
            "unit": "%"
          }
        ],
        "series": [
          {
            "label": "Số việc có thể bị sót",
            "expr": "x / 60 * tasks * miss / 100"
          }
        ]
      },
      {
        "type": "flow",
        "title": "Từ cuộc họp tới biên bản có thể gửi",
        "steps": [
          {
            "label": "Ghi lại cuộc họp",
            "detail": "Công cụ nghe và ghi. Bạn nên tự ghi tay vài dòng: việc nào giao cho ai, hạn khi nào."
          },
          {
            "label": "Nhận biên bản nháp",
            "detail": "Công cụ tóm tắt và liệt kê việc. Đây mới là bản nháp."
          },
          {
            "label": "Đối chiếu",
            "detail": "So từng việc với ghi chú và trí nhớ: tên, hạn, điều kiện, số lượng việc."
          },
          {
            "label": "Sửa và bổ sung",
            "detail": "Sửa tên sai, thêm việc bị sót, giữ lại điều kiện, ghi họ tên đầy đủ khi trùng tên."
          },
          {
            "label": "Gửi kèm chủ việc và hạn",
            "detail": "Mỗi việc có tên người và ngày hạn; bạn là người chịu trách nhiệm cuối cùng về nội dung."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Biên bản dùng được",
          "text": "\"Nguyễn Minh (kinh doanh) gửi báo giá cho khách trước thứ Tư 15/10; nếu khách chưa xác nhận số lượng thì báo lại cho chị Hà.\" Có chủ việc, hạn, điều kiện."
        },
        "right": {
          "label": "Biên bản dễ gây nhầm",
          "text": "\"Minh làm báo giá sớm.\" Minh nào, khi nào, làm nếu điều kiện gì - mỗi người hiểu một kiểu."
        }
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Soát biên bản cuộc họp dự án",
        "task": "Ghi chú của bạn: chị Hà gửi báo giá vào thứ Tư; anh Nam gửi báo cáo trước thứ Sáu nếu có số liệu; chưa chốt ngày họp với khách; anh Minh chưa nhận việc nào. Đánh dấu những dòng biên bản có vấn đề.",
        "segments": [
          {
            "text": "Chị Hà gửi báo giá cho khách vào thứ Tư."
          },
          {
            "text": "Anh Nam chắc chắn gửi báo cáo trước thứ Sáu.",
            "error": "Ghi chú có điều kiện \"nếu có số liệu\"; biên bản bỏ điều kiện nên cam kết nghe chắc hơn thực tế."
          },
          {
            "text": "Họp với khách vào ngày 20/10.",
            "error": "Ghi chú nói chưa chốt ngày họp với khách; công cụ tự bịa ngày 20/10."
          },
          {
            "text": "Anh Minh soạn thư cảm ơn khách hàng.",
            "error": "Anh Minh chưa nhận việc nào; công cụ tự gán thêm một việc không có trong cuộc họp."
          },
          {
            "text": "Ngày họp với khách sẽ được chốt sau."
          },
          {
            "text": "Biên bản gửi cả nhóm sau khi đã đối chiếu với ghi chú."
          }
        ]
      },
      {
        "type": "callout",
        "label": "Người chịu trách nhiệm là bạn",
        "text": "Nếu biên bản có tên hoặc số liệu nhạy cảm, không gửi ra ngoài nhóm nếu chưa được phép. Với cuộc họp có nhân sự, tài chính hoặc pháp lý, hỏi người phụ trách trước khi dùng công cụ ghi và trước khi chia sẻ biên bản."
      },
      {
        "type": "scenario",
        "title": "Biên bản sau buổi họp thứ Hai",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Họp xong, công cụ tạo biên bản 8 việc. Bạn nhớ hôm nay giao khoảng 10 việc và có hai người tên Minh.",
            "choices": [
              {
                "label": "Gửi luôn cho nhanh, mọi người tự đọc và tự nhắc",
                "next": "bad_send"
              },
              {
                "label": "Đối chiếu với ghi chú, đếm việc và kiểm tên",
                "next": "s2"
              }
            ]
          },
          "bad_send": {
            "text": "Hai việc bị sót, và \"Minh làm báo giá\" khiến cả hai anh Minh đều tưởng người kia làm. Hạn qua mà không có báo giá.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bạn tìm ra hai việc bị sót và thấy một hạn ghi thứ Sáu trong khi trong họp là thứ Năm.",
            "choices": [
              {
                "label": "Thêm việc, sửa hạn, ghi họ tên đầy đủ rồi hỏi lại người trong họp nếu chưa chắc",
                "next": "good"
              },
              {
                "label": "Gửi bản cũ và tự nhớ lại hạn đúng cho mình",
                "next": "bad_own"
              }
            ]
          },
          "bad_own": {
            "text": "Người nhận việc làm theo hạn trong biên bản và giao muộn một ngày, ảnh hưởng khách.",
            "ending": "bad"
          },
          "good": {
            "text": "Biên bản có đủ 10 việc, mỗi việc một chủ việc và hạn. Cuối tuần cả nhóm biết mình cần làm gì.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Đọc lại tên, hạn, điều kiện và số việc trước khi gửi biên bản.",
          "Bài sau: dự án nhỏ, một buổi họp từ chuẩn bị đến biên bản."
        ]
      }
    ]
  },
  {
    "track": "personal",
    "isFundamental": false,
    "id": 2274,
    "slug": "du-an-nho-mot-buoi-hop-tu-chuan-bi-den-bien-ban",
    "title": "Chặng 43, Bài 15: Dự án nhỏ: một buổi họp từ chuẩn bị đến biên bản",
    "subtitle": "Tuần này bạn chủ trì một buổi họp: trợ lý giúp soạn chương trình, bạn ghi việc trong họp và gửi biên bản rõ chủ việc, rõ hạn.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "🎯",
    "whyItMatters": "Một buổi họp tốt gồm ba giai đoạn: trước họp (chương trình rõ), trong họp (ghi việc và người), sau họp (biên bản có hạn). Bài này ghép các kỹ năng của chặng: giao trợ lý phần soạn, tự giữ phần quyết định và kiểm.",
    "openingQuestion": "Bạn chủ trì buổi họp 30 phút với bốn người. Việc nào nên làm trước để buổi họp không thành buổi nói chuyện lan man?",
    "openingOptions": [
      "Viết mục tiêu buổi họp và nhờ trợ lý soạn chương trình có thời gian từng mục",
      "Mời thêm nhiều người để mọi bộ phận đều có mặt và nắm thông tin",
      "Bắt đầu họp ngay rồi ghi lại các việc phát sinh vào cuối buổi",
      "Nhờ trợ lý tự quyết định nội dung và mời người dự họp thay cho bạn"
    ],
    "correctOption": 0,
    "explanation": "Buổi họp lan man thường vì không ai biết họp để làm gì và mỗi mục bao lâu. Một mục tiêu rõ và chương trình có thời gian giúp mọi người chuẩn bị. Mời thêm người làm họp dài hơn, không chuẩn bị thì việc phát sinh không có chủ, còn để trợ lý tự quyết nội dung thì bạn đánh mất quyền chủ trì.",
    "diagram": [
      {
        "label": "Viết mục tiêu buổi họp",
        "arrow": true
      },
      {
        "label": "Trợ lý soạn chương trình có thời gian",
        "arrow": true
      },
      {
        "label": "Trong họp: ghi việc, người, hạn",
        "arrow": true
      },
      {
        "label": "Trợ lý soạn biên bản nháp",
        "arrow": true
      },
      {
        "label": "Bạn đối chiếu rồi gửi"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: nhóm 4 người của anh Sơn",
      "description": "Anh Sơn mở đầu bằng mục tiêu \"chốt lịch ra mắt sản phẩm\", nhờ trợ lý soạn chương trình 30 phút gồm bốn mục. Trong họp anh ghi bằng tay ba việc kèm tên và hạn. Sau họp, anh nhờ trợ lý sắp thành biên bản nháp, đối chiếu với ghi chú rồi gửi. Đây là tình huống minh hoạ."
    },
    "quiz": [
      {
        "question": "Yêu cầu nào giúp trợ lý soạn chương trình họp sát nhất?",
        "options": [
          "Họp 30 phút, 4 người, mục tiêu chốt lịch ra mắt, cần 3 mục có thời gian",
          "Soạn chương trình họp cho nhóm và làm cho thật chuyên nghiệp",
          "Soạn chương trình họp dài để có nhiều thời gian bàn về mọi việc",
          "Soạn chương trình giống hệt buổi họp tuần trước của nhóm khác"
        ],
        "correct": 0,
        "explanation": "Yêu cầu tốt có thời lượng, số người, mục tiêu và số mục. Câu chung chung không cho trợ lý biết bàn gì. Họp dài thì dễ lan man, và chương trình của nhóm khác không phù hợp mục tiêu của bạn."
      },
      {
        "question": "Trong họp, việc nào nên tự ghi tay hoặc gõ ngay?",
        "options": [
          "Mỗi việc được giao kèm tên người và hạn",
          "Toàn bộ lời từng người nói, từ đầu tới cuối buổi họp",
          "Chỉ các câu đùa và lời chào đầu buổi để giữ không khí",
          "Chỉ những ý kiến chưa ai đồng ý, để bàn lại sau này nữa"
        ],
        "correct": 0,
        "explanation": "Việc, người, hạn là ba thứ cần chính xác nhất và dễ sai nhất khi công cụ ghi. Ghi mọi lời nói làm bạn không tập trung chủ trì. Câu đùa và ý kiến chưa được chấp nhận không quyết định việc ai làm gì."
      },
      {
        "question": "Bạn nhờ trợ lý soạn biên bản từ ghi chú việc. Kết quả có việc \"Lan gửi báo giá thứ Tư\" nhưng ghi chú không có việc này. Nên làm gì?",
        "options": [
          "Xoá hoặc kiểm lại với Lan, vì đây là việc trợ lý tự thêm",
          "Giữ lại vì có thể trợ lý đã nghe được lúc cuối buổi họp",
          "Giữ lại và báo Lan làm ngay để tiết kiệm thời gian cho nhóm",
          "Đổi tên người thành người ít việc nhất cho phân công cân bằng"
        ],
        "correct": 0,
        "explanation": "Trợ lý chỉ có ghi chú bạn đưa; việc không có trong đó là do nó thêm. Giao việc không có thật cho Lan gây rối. Đổi người để cân bằng là tự phân công thay cả nhóm mà không ai đồng ý."
      },
      {
        "question": "Vì sao vẫn phải đối chiếu biên bản nháp với ghi chú, dù trợ lý viết rất mạch lạc?",
        "options": [
          "Nó có thể đổi tên, hạn hoặc bỏ điều kiện mà câu văn vẫn trôi chảy",
          "Vì trợ lý luôn viết dài hơn ghi chú và làm loãng hết nội dung chính",
          "Vì biên bản bắt buộc phải do người viết tay, không dùng công cụ",
          "Vì trợ lý không biết tên các thành viên trong buổi họp"
        ],
        "correct": 0,
        "explanation": "Câu văn mạch lạc không đảm bảo trung thành với ghi chú. Sai một tên, hạn hoặc bỏ một điều kiện là cả nhóm làm sai. Không có quy tắc chung rằng biên bản phải viết tay hay cần hai người ký; trợ lý biết tên nếu bạn đưa vào ghi chú."
      },
      {
        "question": "Khi nào biên bản họp thực sự hoàn tất?",
        "options": [
          "Khi mỗi việc có chủ việc và hạn, và bạn đã đối chiếu với ghi chú",
          "Khi trợ lý báo rằng biên bản đã đầy đủ, không còn lỗi và sẵn sàng gửi",
          "Khi biên bản đủ dài để nhìn ra là đã tóm hết cuộc họp",
          "Khi biên bản được gửi đi, dù chưa ai đọc lại nội dung"
        ],
        "correct": 0,
        "explanation": "Biên bản có giá trị khi việc có chủ và hạn, và người gửi đã kiểm. Trợ lý báo không còn lỗi không phải là kiểm chứng, độ dài không đo được chất lượng, và gửi đi mà chưa đọc là bỏ bước quan trọng nhất."
      }
    ],
    "keyTakeaways": [
      "Trước họp: một câu mục tiêu và chương trình có thời gian từng mục.",
      "Trong họp: tự ghi việc, người, hạn; đó là ba thứ không được sai.",
      "Sau họp: trợ lý sắp biên bản nháp từ ghi chú của bạn, không từ trí nhớ của nó.",
      "Đối chiếu tên, hạn, điều kiện và số việc trước khi gửi.",
      "Bạn chủ trì và chịu trách nhiệm; trợ lý soạn nháp."
    ],
    "practicePrompt": {
      "question": "Sau họp, bạn có ghi chú 3 việc kèm tên và hạn. Câu nào nhờ trợ lý soạn biên bản đúng cách?",
      "options": [
        "Soạn biên bản chỉ từ ghi chú này, mỗi việc kèm người và hạn, không thêm việc nào",
        "Viết biên bản họp hôm nay giúp tôi, cứ bổ sung việc nào cần thiết cho đầy đủ và hợp lý",
        "Tóm tắt cuộc họp thành một đoạn văn thật dài để mọi người đọc cho kỹ nhé",
        "Soạn biên bản giống mẫu của phòng khác, tên người và hạn cứ để trợ lý điền"
      ],
      "correct": 0,
      "explanation": "Câu đầu giới hạn trợ lý vào ghi chú và giữ chủ việc, hạn. Câu hai cho phép nó thêm việc, câu ba làm mất định dạng việc-người-hạn, câu bốn để trợ lý bịa tên và hạn."
    },
    "summary": {
      "keyIdea": "Trợ lý soạn và sắp, bạn chủ trì, ghi việc và kiểm biên bản.",
      "formula": "Mục tiêu → chương trình có thời gian → ghi việc, người, hạn → biên bản nháp → đối chiếu → gửi.",
      "commonMistake": "Để trợ lý điền tên và hạn từ trí nhớ thay vì từ ghi chú của bạn.",
      "action": "Chủ trì một buổi họp nhỏ tuần này theo đúng năm bước."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn một buổi họp sắp tới của bạn (hoặc một buổi giả định 30 phút với 3-4 người). Viết mục tiêu một câu và nhờ trợ lý soạn chương trình có thời gian. Sau họp, ghi ba việc với tên và hạn, nhờ trợ lý sắp thành biên bản nháp và đối chiếu từng dòng.",
      "secondary": "Ngày mai bảng điều khiển sẽ hỏi: biên bản của bạn có việc nào thiếu người hoặc thiếu hạn không?"
    },
    "sections": [
      {
        "type": "lead",
        "text": "Thứ Hai, bạn chủ trì buổi họp 30 phút với bốn người để chốt một việc. Bài cuối này ghép mọi thứ của chặng: soạn chương trình, ghi việc trong họp, biên bản và kiểm lại."
      },
      {
        "type": "feynman",
        "title": "Một buổi họp tốt đơn giản hơn bạn nghĩ",
        "intro": "Hình dung bạn tổ chức chuyến đi chơi nhóm bốn người. Trước đi: chốt đi đâu và mấy giờ. Trên đường: ghi ai lo gì. Sau chuyến đi: gửi cả nhóm bảng ai đã ứng bao nhiêu.",
        "columns": [
          "Thành phần",
          "Ví dụ đời thường",
          "Trong công việc của bạn"
        ],
        "rows": [
          [
            "Chốt điểm đến, giờ đi",
            "Ai cũng biết mình đi để làm gì",
            "Mục tiêu và chương trình có thời gian"
          ],
          [
            "Ghi ai lo gì",
            "Người lo vé, người lo ăn",
            "Việc, người, hạn trong họp"
          ],
          [
            "Bảng gửi sau chuyến",
            "Rõ ai nợ ai, hạn nào",
            "Biên bản có chủ việc và hạn"
          ],
          [
            "Bạn đi cùng có trí nhớ giỏi",
            "Nhớ nhiều nhưng có khi nhớ nhầm",
            "Trợ lý soạn nháp, bạn kiểm lại"
          ]
        ],
        "oneLiner": "Họp tốt là ba việc: biết mình họp để làm gì, ghi ai làm gì, và gửi lại cho rõ."
      },
      {
        "type": "heading",
        "text": "Ba giai đoạn của một buổi họp"
      },
      {
        "type": "list",
        "items": [
          "Trước họp: viết mục tiêu, nhờ trợ lý soạn chương trình có thời gian từng mục.",
          "Trong họp: bạn chủ trì, tự ghi việc, người và hạn.",
          "Sau họp: nhờ trợ lý sắp ghi chú thành biên bản nháp, đối chiếu, gửi."
        ]
      },
      {
        "type": "paragraph",
        "text": "Điều quan trọng nhất là trợ lý chỉ soạn từ những gì bạn đưa. Nếu bạn không ghi việc trong họp thì lúc soạn biên bản nó chỉ còn cách đoán."
      },
      {
        "type": "flow",
        "title": "Một buổi họp từ đầu đến cuối",
        "steps": [
          {
            "label": "Viết mục tiêu",
            "detail": "Một câu: họp xong cần chốt điều gì. Nếu không viết được câu này thì có thể không cần họp."
          },
          {
            "label": "Soạn chương trình",
            "detail": "Nhờ trợ lý chia thời gian cho từng mục theo mục tiêu, số người và thời lượng bạn đưa."
          },
          {
            "label": "Chủ trì và ghi",
            "detail": "Trong họp bạn ghi việc, người và hạn. Ai nhận việc thì nói lại để xác nhận."
          },
          {
            "label": "Soạn biên bản nháp",
            "detail": "Đưa ghi chú cho trợ lý và dặn chỉ dùng ghi chú, không thêm việc."
          },
          {
            "label": "Đối chiếu và gửi",
            "detail": "So từng dòng với ghi chú: tên, hạn, điều kiện, số việc. Sửa rồi gửi cả nhóm."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Họp không chuẩn bị",
          "text": "Mở họp không mục tiêu, ghi việc bằng trí nhớ, gửi tóm tắt sau ba ngày. Việc phát sinh không có chủ, hạn mờ."
        },
        "right": {
          "label": "Họp theo năm bước",
          "text": "Có mục tiêu, chương trình có thời gian, việc được ghi kèm người và hạn, biên bản gửi trong ngày sau khi đã kiểm."
        }
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Soạn chương trình họp 30 phút",
        "task": "Bạn chủ trì họp 30 phút với 4 người để chốt lịch ra mắt sản phẩm. Lắp yêu cầu để trợ lý soạn chương trình.",
        "parts": [
          {
            "id": "goal",
            "label": "Mục tiêu",
            "options": [
              {
                "text": "Họp để trao đổi về sản phẩm.",
                "feedback": "Mơ hồ - chương trình sẽ bàn mọi thứ mà không chốt được gì."
              },
              {
                "text": "Chốt ngày ra mắt sản phẩm và ai chịu trách nhiệm từng việc.",
                "good": true,
                "feedback": "Mục tiêu đo được: kết thúc phải có ngày và chủ việc."
              }
            ]
          },
          {
            "id": "frame",
            "label": "Khung họp",
            "options": [
              {
                "text": "30 phút, 4 người, chia thời gian cho 3 mục.",
                "good": true,
                "feedback": "Trợ lý biết giới hạn thời gian và số mục."
              },
              {
                "text": "Cứ soạn dài để bàn được nhiều thứ.",
                "feedback": "Chương trình dài làm họp vượt giờ."
              }
            ]
          },
          {
            "id": "output",
            "label": "Kết quả mong muốn",
            "options": [
              {
                "text": "Mỗi mục có thời gian và người dẫn dắt, cuối họp dành 5 phút ghi việc, người, hạn.",
                "good": true,
                "feedback": "Có sẵn khoảng thời gian để chốt việc trước khi mọi người rời phòng."
              },
              {
                "text": "Chỉ cần danh sách các chủ đề.",
                "feedback": "Không có thời gian và người phụ trách, họp dễ lan man."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "goal",
              "frame",
              "output"
            ],
            "text": "1. Nhắc mục tiêu, tình hình lịch hiện tại (5 phút, người chủ trì).\n2. Rủi ro có thể làm lùi ngày ra mắt (10 phút, người phụ trách sản phẩm).\n3. Chốt ngày và chủ việc (10 phút, cả nhóm).\n4. Ghi việc, người, hạn (5 phút).\n(Chương trình đủ 30 phút, có người và thời gian.)"
          },
          {
            "requires": [
              "goal"
            ],
            "text": "1. Trao đổi tổng quan.\n2. Bàn về tiến độ các phòng.\n3. Ý kiến khác.\n(Có mục tiêu nhưng thiếu thời gian và người phụ trách nên dễ vượt giờ.)"
          },
          {
            "text": "1. Giới thiệu sản phẩm mới, ngân sách 1,2 tỷ và khách hàng mục tiêu.\n2. Bàn về đối thủ.\n(Yêu cầu mơ hồ nên trợ lý bịa ngân sách và nội dung không liên quan tới buổi họp của bạn.)"
          }
        ]
      },
      {
        "type": "callout",
        "label": "Ghi trong họp là việc của bạn",
        "text": "Công cụ ghi biên bản có thể hỗ trợ, nhưng nếu buổi họp có thông tin nhạy cảm, hỏi bộ phận phụ trách trước khi dùng công cụ ghi. Việc, người và hạn vẫn nên có ghi chú riêng của bạn để đối chiếu."
      },
      {
        "type": "scenario",
        "title": "Buổi họp chốt lịch ra mắt",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Sáng thứ Hai bạn có 30 phút họp với bốn người để chốt lịch ra mắt sản phẩm. Bạn chưa chuẩn bị gì.",
            "choices": [
              {
                "label": "Vào họp và ghi lại việc phát sinh vào cuối buổi",
                "next": "bad_plan"
              },
              {
                "label": "Viết mục tiêu và nhờ trợ lý soạn chương trình có thời gian",
                "next": "s2"
              }
            ]
          },
          "bad_plan": {
            "text": "Buổi họp lan man, hết 30 phút vẫn chưa chốt ngày. Mọi người rời phòng mà không biết ai phải làm gì.",
            "ending": "bad"
          },
          "s2": {
            "text": "Trong họp có ba việc được giao. Bạn định nhớ trong đầu rồi nhờ trợ lý soạn biên bản.",
            "choices": [
              {
                "label": "Không ghi, để trợ lý tự soạn từ những gì nó nghĩ đã nói",
                "next": "bad_memory"
              },
              {
                "label": "Ghi ba việc kèm tên và hạn, đọc lại để mọi người xác nhận",
                "next": "s3"
              }
            ]
          },
          "bad_memory": {
            "text": "Biên bản có một hạn sai và một việc nhầm người. Cả nhóm làm theo bản sai, và bạn phải xin lỗi.",
            "ending": "bad"
          },
          "s3": {
            "text": "Trợ lý soạn biên bản từ ghi chú của bạn. Trong đó có thêm việc thứ tư mà ghi chú không có.",
            "choices": [
              {
                "label": "Xoá việc thứ tư, đối chiếu tên và hạn với ghi chú rồi gửi",
                "next": "good"
              },
              {
                "label": "Giữ việc thứ tư vì nó nghe hợp lý",
                "next": "bad_extra"
              }
            ]
          },
          "bad_extra": {
            "text": "Một đồng nghiệp bị giao việc không ai nhắc trong họp và than phiền với trưởng phòng.",
            "ending": "bad"
          },
          "good": {
            "text": "Biên bản có ba việc, mỗi việc một người và một hạn. Cả nhóm bắt đầu làm ngay chiều hôm đó.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Mục tiêu trước họp, ghi việc trong họp, kiểm biên bản sau họp.",
          "Bài sau chặng này: lịch hẹn, biểu mẫu và quy trình cả tuần."
        ]
      }
    ]
  }
];
