import type { Lesson } from "../lesson-types";

// Chặng 66, bài 1-5. Giáo trình: scripts/curriculum/stage-66.json.
// Không dựa vào tính năng cụ thể của công cụ AI nào: chỉ dạy khái niệm bền và cách kiểm tra kết quả.
export const S66_A_LESSONS: Lesson[] = [
  {
    "id": 2720,
    "slug": "may-tinh-cua-ban-gom-may-thanh-phan-bang-ngoi-nha",
    "title": "Chặng 66, Bài 1: Máy tính của bạn như một căn nhà: bàn làm việc, tủ hồ sơ và kho",
    "subtitle": "Mặt bàn, tủ hồ sơ và người làm việc: ba thứ quyết định máy nhanh hay chậm.",
    "duration": "8 phút",
    "difficulty": "Dễ",
    "emoji": "🏠",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Khi máy chậm, lời khuyên phổ biến nhất là \"mua thêm bộ nhớ\" - nhưng \"bộ nhớ\" có hai nghĩa rất khác nhau, và mua nhầm loại thì máy vẫn chậm y nguyên. Hiểu máy gồm mấy phần và mỗi phần làm gì giúp bạn mô tả triệu chứng đúng cho người sửa, hoặc cho AI, và tránh tốn tiền vào thứ không phải nguyên nhân.",
    "openingQuestion": "Giữa buổi họp, bạn đang mở 25 tab trình duyệt, một bảng tính lớn và phần mềm họp trực tuyến. Máy bắt đầu đơ từng giây. Cách nghĩ nào đúng nhất về nguyên nhân?",
    "openingOptions": [
      "Mặt bàn làm việc quá chật vì mở quá nhiều thứ cùng lúc",
      "Tủ hồ sơ đã đầy nên máy không còn chỗ để lưu thêm",
      "Máy bị nhiễm virus vì mở quá nhiều tab trình duyệt một lúc",
      "Màn hình quá cũ nên không hiển thị kịp nhiều cửa sổ"
    ],
    "correctOption": 0,
    "explanation": "Mọi thứ đang mở nằm trên \"mặt bàn\" (bộ nhớ RAM) - chỗ làm việc tạm, rộng bao nhiêu thì trải được bấy nhiêu việc cùng lúc. Bàn chật thì máy phải xếp đi xếp lại, nên giật. Tủ hồ sơ đầy (ổ lưu trữ) gây ra lỗi khác: không lưu thêm được tệp. Nhiều tab không tự biến thành virus; còn màn hình chỉ hiển thị, không quyết định tốc độ xử lý. Chẩn đoán đúng chỗ thì mới sửa đúng chỗ.",
    "diagram": [
      {
        "label": "Tủ hồ sơ (ổ lưu trữ): giữ tệp lâu dài, tắt máy vẫn còn",
        "arrow": true
      },
      {
        "label": "Mặt bàn (RAM): tệp đang mở được trải ra để làm việc",
        "arrow": true
      },
      {
        "label": "Người làm việc (bộ xử lý): đọc, tính, sắp xếp trên mặt bàn",
        "arrow": true
      },
      {
        "label": "Màn hình: bạn thấy kết quả, và bấm Lưu để cất về tủ"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một nhân viên hành chính mở cùng lúc bảng tính 40 trang, hai bản trình chiếu, trình duyệt với hàng chục tab và phần mềm họp. Máy giật đúng lúc chia sẻ màn hình. Chị không mua gì mà đóng bớt các tab và tệp không dùng: máy mượt lại ngay, vì mặt bàn đã được dọn. Chỉ khi máy vẫn chậm dù mở ít việc, chị mới cân nhắc nhờ bộ phận IT kiểm tra thêm."
    },
    "quiz": [
      {
        "question": "Bạn đang soạn báo cáo và chưa bấm Lưu thì mất điện. Phần nào của báo cáo thường mất?",
        "options": [
          "Phần mới gõ chưa lưu, vì nó chỉ nằm trên mặt bàn (RAM)",
          "Toàn bộ tệp, vì ổ lưu trữ cũng tự xoá khi mất điện đột ngột",
          "Phần đã lưu từ hôm qua, vì máy ghi đè bản cũ bằng bản đang mở",
          "Không mất gì, vì RAM giữ dữ liệu khi tắt máy"
        ],
        "correct": 0,
        "explanation": "RAM là chỗ làm việc tạm, mất điện là trống. Phần bạn đã lưu nằm trong ổ lưu trữ nên vẫn còn. Ổ lưu trữ không tự xoá khi mất điện, bản cũ không bị ghi đè nếu bạn chưa bấm Lưu, và RAM thì không giữ dữ liệu khi tắt. Đó là lý do phải bấm Lưu thường xuyên."
      },
      {
        "question": "Máy báo \"không đủ dung lượng\" khi lưu một tệp. Nên nghĩ tới phần nào trước?",
        "options": [
          "Mặt bàn (RAM) quá nhỏ để chứa tệp mới",
          "Tủ hồ sơ (ổ lưu trữ) đã đầy",
          "Bộ xử lý quá yếu nên không ghi nổi tệp lớn",
          "Màn hình chưa đủ độ phân giải để hiện tên tệp"
        ],
        "correct": 1,
        "explanation": "Lưu tệp là cất vào tủ hồ sơ, nên thông báo thiếu dung lượng nói về ổ lưu trữ. RAM chỉ là chỗ làm việc tạm và không chứa tệp đã lưu. Bộ xử lý ảnh hưởng tốc độ tính, không quyết định còn chỗ hay không; màn hình không liên quan gì tới dung lượng."
      },
      {
        "question": "Vì sao tắt máy rồi bật lại, tệp đã lưu vẫn còn nhưng các cửa sổ đang mở thì mất?",
        "options": [
          "Máy chỉ nhớ các tệp có đuôi phổ biến như .docx và .xlsx, còn cửa sổ thì không",
          "Hệ điều hành chủ động xoá cửa sổ để bảo vệ máy khỏi bị quá tải khi bật",
          "Ổ lưu trữ giữ dữ liệu khi tắt, còn RAM thì trống đi",
          "Cả hai đều xoá, tệp tự khôi phục lại từ mạng"
        ],
        "correct": 2,
        "explanation": "Hai loại bộ nhớ khác bản chất: ổ lưu trữ giữ lâu dài, RAM chỉ tạm thời. Đuôi tệp không quyết định điều này. Máy không xoá cửa sổ để tự bảo vệ, và tệp đã lưu không cần khôi phục từ mạng vì chưa bao giờ mất."
      },
      {
        "question": "Máy chậm dù bạn chỉ mở một trang Word. Bước nào hợp lý nhất để tìm nguyên nhân?",
        "options": [
          "Mua ngay thêm RAM, vì mọi trường hợp máy chậm đều do thiếu RAM",
          "Cài lại toàn bộ hệ điều hành để máy về trạng thái mới nguyên",
          "Đổi sang máy khác, vì máy cũ chắc chắn không còn cứu được nữa",
          "Xem phần nào đang chiếm nhiều sức máy nhất trong công cụ theo dõi của hệ điều hành"
        ],
        "correct": 3,
        "explanation": "Chậm khi chỉ mở ít việc là tín hiệu có thứ gì đó đang ngốn tài nguyên ngầm; công cụ theo dõi chỉ ra đó là gì và hoàn toàn miễn phí. Mua RAM khi chưa biết nguyên nhân dễ tốn tiền vô ích, cài lại hệ điều hành là biện pháp nặng và mất công, còn đổi máy là bỏ qua việc kiểm tra."
      },
      {
        "question": "Người bán hàng nói \"máy này bộ nhớ 512\". Bạn nên hỏi lại điều gì?",
        "options": [
          "Đó là 512 GB ổ lưu trữ hay 512 GB RAM, vì hai thứ khác hẳn nhau",
          "Không cần hỏi, vì \"bộ nhớ\" luôn là chỗ chứa tệp của bạn",
          "Hỏi màn hình rộng bao nhiêu, vì 512 thường chỉ độ phân giải",
          "Hỏi có bản quyền hệ điều hành không, vì 512 là mã bản quyền"
        ],
        "correct": 0,
        "explanation": "Từ \"bộ nhớ\" dùng cho cả hai thứ: con số hàng trăm GB thường là ổ lưu trữ (tủ hồ sơ), còn RAM thường chỉ vài đến vài chục GB. Hỏi rõ tránh hiểu nhầm. Bộ nhớ không phải lúc nào cũng là chỗ chứa tệp, và con số đó không phải độ phân giải hay mã bản quyền."
      }
    ],
    "keyTakeaways": [
      "Mặt bàn (RAM) là chỗ làm việc tạm: mở nhiều thì chật, tắt máy là trống.",
      "Tủ hồ sơ (ổ lưu trữ) giữ tệp lâu dài: đầy thì không lưu thêm được.",
      "Người làm việc (bộ xử lý) quyết định tốc độ tính toán.",
      "Chỉ có tệp đã bấm Lưu mới nằm trong tủ hồ sơ.",
      "Mô tả triệu chứng rõ (khi nào chậm, mở gì) quan trọng hơn đoán tên linh kiện."
    ],
    "practicePrompt": {
      "question": "Máy chỉ chậm vào buổi họp, lúc bạn mở nhiều cửa sổ, còn sáng sớm thì mượt. Điều này gợi ý nhất điều gì?",
      "options": [
        "Mặt bàn bị chiếm nhiều khi mở nhiều việc",
        "Tủ hồ sơ đã đầy từ sáng nên máy chậm theo giờ",
        "Bộ xử lý hỏng dần nên chỉ chậm vào buổi chiều tối",
        "Màn hình bị lỗi nên chạy chậm khi có người nhìn"
      ],
      "correct": 0,
      "explanation": "Chậm theo số việc đang mở chứ không theo giờ là dấu hiệu tài nguyên làm việc bị chiếm. Ổ đầy thì chậm cả lúc ít việc và kèm thông báo thiếu dung lượng; bộ xử lý hỏng thường treo bất kể giờ; màn hình không liên quan tới tốc độ."
    },
    "summary": {
      "keyIdea": "Máy gồm chỗ làm việc tạm (RAM), chỗ cất lâu dài (ổ lưu trữ) và người xử lý (bộ xử lý).",
      "formula": "Chậm khi mở nhiều việc → nghĩ tới mặt bàn. Không lưu được tệp → nghĩ tới tủ hồ sơ.",
      "commonMistake": "Nghe \"bộ nhớ\" là mua thêm mà không hỏi đó là RAM hay ổ lưu trữ.",
      "action": "Lần sau máy chậm, ghi lại: lúc nào chậm, đang mở những gì, rồi mới hỏi người sửa hoặc AI."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Mở công cụ theo dõi hiệu năng của hệ điều hành trên chiếc máy bạn đang dùng và mở thêm 5 tab cùng 2 tệp bạn hay làm. Ghi ra giấy ba dòng: bạn mở những gì, mức dùng bộ nhớ làm việc (RAM) thay đổi ra sao, và máy có chậm không. Mai bạn dùng đúng ba dòng đó để hỏi AI nên xử lý thế nào.",
      "secondary": "Nếu công cụ theo dõi làm bạn rối, chụp màn hình và hỏi người bên IT đó là gì, không tự cài thêm phần mềm."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Sáng thứ Hai, máy bạn đơ đúng lúc cả phòng chờ bạn chia sẻ màn hình. Người bên cạnh bảo \"thiếu bộ nhớ đó, mua thêm đi\". Nhưng bộ nhớ nào? Bài này giúp bạn biết máy gồm mấy phần và phần nào đang kêu cứu."
      },
      {
        "type": "feynman",
        "title": "Máy tính đơn giản hơn bạn nghĩ",
        "intro": "Hình dung một văn phòng nhỏ: có một mặt bàn để trải giấy tờ đang làm, một tủ hồ sơ cất giấy tờ lâu dài, và một người ngồi làm việc. Máy tính của bạn cũng chia việc y như thế.",
        "columns": [
          "Thành phần",
          "Trong văn phòng",
          "Trong máy tính"
        ],
        "rows": [
          [
            "Chỗ làm việc",
            "Mặt bàn: bao nhiêu giấy trải ra cùng lúc tuỳ bàn rộng bao nhiêu",
            "Bộ nhớ làm việc (RAM): chứa những gì đang mở, tắt máy là trống"
          ],
          [
            "Chỗ cất",
            "Tủ hồ sơ: giấy cất vào thì còn, dù bạn về nhà",
            "Ổ lưu trữ: chứa tệp đã lưu, tắt máy vẫn còn"
          ],
          [
            "Người làm việc",
            "Người đọc, tính và sắp xếp giấy trên bàn",
            "Bộ xử lý: tính toán và điều khiển mọi thứ"
          ],
          [
            "Khi quá tải",
            "Bàn chật thì xếp đi xếp lại; tủ đầy thì không cất thêm được",
            "RAM chật thì máy giật; ổ đầy thì không lưu thêm được tệp"
          ]
        ],
        "oneLiner": "Tủ hồ sơ để cất, mặt bàn để làm, người xử lý để tính: mỗi thứ quá tải cho một triệu chứng khác nhau."
      },
      {
        "type": "heading",
        "text": "Vì sao hai loại \"bộ nhớ\" hay bị nhầm"
      },
      {
        "type": "paragraph",
        "text": "Khi bạn mở một tệp, máy lấy bản từ tủ hồ sơ rồi trải ra mặt bàn để làm. Bạn sửa trên mặt bàn. Chỉ khi bấm Lưu, bản sửa mới được cất lại vào tủ. Vì cả hai đều được gọi là \"bộ nhớ\", nhiều người tưởng chúng là một, rồi mua nhầm."
      },
      {
        "type": "flow",
        "title": "Một tệp đi từ tủ hồ sơ tới màn hình của bạn",
        "steps": [
          {
            "label": "Tệp nằm trong tủ hồ sơ",
            "detail": "Tệp bạn lưu hôm qua nằm trong ổ lưu trữ. Tắt máy cả tuần nó vẫn ở đó."
          },
          {
            "label": "Mở tệp: lấy ra mặt bàn",
            "detail": "Khi bạn bấm mở, máy chép tệp vào bộ nhớ làm việc (RAM). Mở càng nhiều tệp, mặt bàn càng chật."
          },
          {
            "label": "Người xử lý làm việc",
            "detail": "Bộ xử lý đọc, tính và sắp xếp dữ liệu trên mặt bàn theo từng thao tác của bạn."
          },
          {
            "label": "Màn hình cho bạn thấy",
            "detail": "Kết quả hiện lên màn hình. Lúc này bản sửa vẫn chỉ nằm trên mặt bàn."
          },
          {
            "label": "Bấm Lưu: cất về tủ",
            "detail": "Chỉ khi lưu, bản sửa mới ghi vào ổ lưu trữ. Chưa lưu mà mất điện thì phần mới gõ mất."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Mặt bàn làm việc (RAM)",
          "text": "Nhanh, nhưng tạm thời. Chứa mọi thứ đang mở. Thường chỉ vài đến vài chục GB. Đầy thì máy giật. Tắt máy là trống."
        },
        "right": {
          "label": "Tủ hồ sơ (ổ lưu trữ)",
          "text": "Chậm hơn, nhưng lâu dài. Chứa mọi tệp đã lưu. Thường hàng trăm GB trở lên. Đầy thì không lưu thêm được. Tắt máy vẫn còn."
        }
      },
      {
        "type": "heading",
        "text": "Đọc triệu chứng như bác sĩ đọc bệnh án"
      },
      {
        "type": "list",
        "items": [
          "Giật khi mở nhiều việc, mượt khi mở ít: nghĩ tới mặt bàn (RAM) chật.",
          "Báo hết dung lượng, không lưu được tệp: nghĩ tới tủ hồ sơ (ổ lưu trữ) đầy.",
          "Mở một tệp mất rất lâu ngay cả khi máy còn trống: nghĩ tới ổ chậm hoặc máy đang chạy việc ngầm.",
          "Quạt kêu to, máy nóng khi chỉ mở vài việc: có thể có thứ đang ngốn sức xử lý; hỏi IT trước khi tự xoá gì."
        ]
      },
      {
        "type": "callout",
        "label": "Đừng chẩn đoán khi chưa thấy số",
        "text": "Người hay nói \"chắc thiếu RAM\" thường đoán. Công cụ theo dõi hiệu năng của hệ điều hành cho thấy mặt bàn và tủ hồ sơ đang đầy bao nhiêu. Nhìn số trước, mua sau."
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI chỉ ra nguyên nhân máy chậm",
        "task": "Máy chậm đúng lúc họp, bạn chưa biết vì sao. Lắp một prompt để AI xếp các nguyên nhân theo thứ tự đáng kiểm tra trước, không được mua gì khi chưa kiểm.",
        "parts": [
          {
            "id": "context",
            "label": "Mô tả máy và lúc xảy ra",
            "options": [
              {
                "text": "Máy tôi chậm lắm, giúp tôi với.",
                "feedback": "AI không biết máy nào, chậm khi nào - nó sẽ liệt kê một danh sách chung và có thể đoán linh kiện bạn không hề có."
              },
              {
                "text": "Laptop văn phòng dùng khoảng 4 năm. Chậm khi họp trực tuyến, đang mở 25 tab trình duyệt và bảng tính lớn; buổi sáng mở ít việc thì mượt.",
                "good": true,
                "feedback": "Có tuổi máy, lúc chậm và đang mở gì - AI có manh mối để nghiêng về chuyện mặt bàn quá chật thay vì đoán bừa."
              }
            ]
          },
          {
            "id": "task",
            "label": "Việc cần AI làm",
            "options": [
              {
                "text": "Xếp các nguyên nhân khả dĩ từ dễ kiểm và không tốn tiền tới khó kiểm; nói rõ cách kiểm từng cái.",
                "good": true,
                "feedback": "Bạn nhận được thứ tự hành động được, bắt đầu từ việc miễn phí như đóng bớt tab."
              },
              {
                "text": "Cho tôi biết nên mua linh kiện nào.",
                "feedback": "Bạn dẫn AI thẳng tới kết luận \"mua\", khi chưa biết nguyên nhân. Nó sẽ gợi ý linh kiện cụ thể nghe rất chắc chắn."
              }
            ]
          },
          {
            "id": "limit",
            "label": "Giới hạn",
            "options": [
              {
                "text": "Trả lời thật chi tiết mọi khả năng có thể xảy ra.",
                "feedback": "Yêu cầu \"mọi khả năng\" cho ra bài dài, lẫn cả những điều hiếm gặp, bạn khó biết bắt đầu từ đâu."
              },
              {
                "text": "Chỉ nêu 4 nguyên nhân hàng đầu; nếu không chắc thì nói không chắc, không đoán tên linh kiện cụ thể.",
                "good": true,
                "feedback": "Giới hạn số lượng và cho phép nói \"không chắc\" giảm hẳn chuyện AI bịa thông số."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "context",
              "task",
              "limit"
            ],
            "text": "Với mô tả của bạn, thứ tự nên kiểm:\n1) Mặt bàn (RAM) chật: đóng bớt tab và tệp không dùng, xem mức dùng RAM trong công cụ theo dõi lúc đang họp.\n2) Phần mềm ngầm chiếm sức máy: xem mục nào dùng nhiều nhất.\n3) Ổ lưu trữ gần đầy: xem còn trống bao nhiêu.\n4) Máy nóng: kiểm tra quạt và nơi đặt máy.\nTôi không chắc về cấu hình máy bạn nên chưa gợi ý mua gì; hãy đối chiếu số đo thật trước."
          },
          {
            "requires": [
              "context"
            ],
            "text": "Có thể do mở nhiều việc cùng lúc. Bạn nên thử đóng bớt tab, khởi động lại máy, và kiểm tra ổ đĩa. Nếu vẫn chậm, hãy cân nhắc nâng cấp linh kiện.\n(Có hướng đúng nhưng thiếu thứ tự kiểm và cách kiểm cụ thể.)"
          },
          {
            "text": "Máy bạn gần như chắc chắn cần thay bộ xử lý mới thế hệ gần nhất và nâng lên 32 GB RAM, chi phí vào khoảng 6-8 triệu đồng.\n(AI không biết máy bạn, nên tự bịa cả linh kiện lẫn giá.)"
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Máy giật khi họp lúc 9 giờ",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn chuẩn bị chia sẻ màn hình trong cuộc họp 9 giờ thì máy bắt đầu giật. Trên màn hình có 25 tab, một bảng tính lớn chưa lưu và hai bản trình chiếu.",
            "choices": [
              {
                "label": "Bấm Lưu bảng tính, đóng các tab và tệp chưa cần, rồi xem máy có mượt lại không",
                "next": "s2"
              },
              {
                "label": "Giữ nguyên mọi thứ và bấm nút tắt nguồn để khởi động lại cho nhanh",
                "next": "bad_lose"
              }
            ]
          },
          "bad_lose": {
            "text": "Máy tắt và bật lại, nhưng bảng tính bạn vừa sửa 40 phút chưa lưu nên mất phần mới. Bạn vào họp trễ và phải làm lại số liệu.",
            "ending": "bad"
          },
          "s2": {
            "text": "Máy mượt hơn hẳn. Sau họp, máy vẫn đôi lúc chậm khi mở nhiều việc. Bạn định xử lý lâu dài.",
            "choices": [
              {
                "label": "Mở công cụ theo dõi hiệu năng lúc đang mở nhiều việc, ghi mức RAM và dung lượng ổ trước khi quyết định mua gì",
                "next": "good"
              },
              {
                "label": "Đặt mua ngay thêm bộ nhớ cho máy mà không xem số đo nào",
                "next": "bad_buy"
              }
            ]
          },
          "bad_buy": {
            "text": "Linh kiện về, nhưng máy của bạn là loại không nâng cấp được hoặc vấn đề nằm ở phần mềm chạy ngầm. Bạn tốn tiền mà máy vẫn chậm.",
            "ending": "bad"
          },
          "good": {
            "text": "Số đo cho thấy RAM gần đầy mỗi khi mở 25 tab, còn ổ lưu trữ vẫn rộng. Bạn đem số này hỏi IT: có thể nâng RAM không, hay chỉ cần đổi thói quen mở tab. Quyết định dựa trên số thật.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Tủ hồ sơ để cất, mặt bàn để làm: đoán đúng chỗ kẹt là đã giải quyết nửa vấn đề.",
          "Bài sau: khi tủ hồ sơ báo đầy, cái gì đang chiếm chỗ và cái gì dọn được."
        ]
      }
    ]
  },
  {
    "id": 2721,
    "slug": "o-cung-day-vi-sao-may-bao-day-du-luong",
    "title": "Chặng 66, Bài 2: Ổ đĩa báo đầy: cái gì đang chiếm chỗ và cái gì dọn được",
    "subtitle": "Tủ hồ sơ đầy đúng lúc cần lưu báo cáo: lập danh sách trước, xoá sau.",
    "duration": "8 phút",
    "difficulty": "Dễ",
    "emoji": "🗄️",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Thông báo hết dung lượng thường đến đúng lúc bạn gấp nhất, và phản xạ tự nhiên là xoá thật nhanh. Xoá vội là cách mất nhầm bản báo cáo duy nhất hoặc tệp hệ thống. Biết nhóm tệp nào hay chiếm chỗ và cách kiểm trước khi xoá giúp bạn dọn được vài chục GB mà không đánh đổi dữ liệu.",
    "openingQuestion": "Máy báo hết dung lượng khi bạn lưu báo cáo quý lúc 4 giờ chiều, hạn nộp 5 giờ. Bạn thấy một thư mục lạ rất lớn mà không nhớ đã tạo. Bước nào hợp lý nhất?",
    "openingOptions": [
      "Xem thư mục đó chứa gì rồi mới quyết định xoá hay giữ",
      "Xoá ngay thư mục lạ vì nó lớn nhất nên giải phóng nhiều nhất",
      "Xoá các tệp gần đây nhất vì chúng mới nên ít quan trọng",
      "Lưu báo cáo tạm vào ổ USB rồi xoá luôn cả thư mục gốc đó đi"
    ],
    "correctOption": 0,
    "explanation": "Thư mục lớn mà không rõ nguồn có thể là dữ liệu của phần mềm, bản sao lưu hoặc tệp hệ thống - xoá là mất, có khi làm phần mềm lỗi. Xem bên trong chỉ mất một phút và cho bạn biết có dọn được không. \"Lớn nhất\" không có nghĩa là \"vô dụng\". Tệp mới gần đây lại thường là việc bạn đang làm dở. Còn chép báo cáo ra USB mà xoá bản gốc thì mất bản duy nhất nếu USB hỏng.",
    "diagram": [
      {
        "label": "Máy báo đầy: dừng lại, chưa xoá gì",
        "arrow": true
      },
      {
        "label": "Liệt kê nhóm tệp nặng nhất: video, tệp tải về, ảnh, thùng rác",
        "arrow": true
      },
      {
        "label": "Với mỗi nhóm hỏi: còn bản khác ở nơi khác không?",
        "arrow": true
      },
      {
        "label": "Chép bản chưa có sang chỗ an toàn, mở thử, rồi mới xoá bản trên máy"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một nhân viên kinh doanh thường ghi hình các buổi gặp khách bằng điện thoại và chép vào laptop. Sau vài tháng, ổ 256 GB báo đầy. Anh liệt kê các nhóm tệp và thấy video chiếm phần lớn. Anh chép video cũ lên kho chung công ty, mở thử vài tệp để chắc chúng chạy được, rồi mới xoá bản trên máy và dọn thùng rác. Máy trống lại mà không mất tệp nào."
    },
    "quiz": [
      {
        "question": "Nhóm tệp nào thường chiếm nhiều dung lượng nhất trên máy của người đi làm?",
        "options": [
          "Các tệp văn bản Word vì người đi làm viết nhiều văn bản nhất",
          "Video, bản ghi cuộc họp và tệp tải về lâu ngày chưa dọn",
          "Email đã gửi vì mỗi thư đều được lưu nguyên trong máy",
          "Ảnh chụp màn hình cỡ nhỏ vì mỗi ngày đều chụp hàng chục ảnh"
        ],
        "correct": 1,
        "explanation": "Một video hoặc bản ghi họp thường nặng gấp hàng trăm lần một tệp Word; vài chục tệp như vậy đã đầy hàng chục GB. Văn bản thuần chữ rất nhẹ. Email và ảnh chụp màn hình thường nhỏ hơn nhiều so với video, nên ít khi là thủ phạm chính."
      },
      {
        "question": "Bạn xoá 10 GB video nhưng ổ vẫn báo đầy. Điều gì có thể đang xảy ra?",
        "options": [
          "Ổ đã hỏng nên không còn nhận lệnh xoá nữa",
          "Video phải xoá thêm hai lần thì máy mới tính là xoá thật",
          "Tệp vừa xoá đang nằm trong thùng rác, chưa được trả chỗ",
          "Hệ điều hành chỉ trả chỗ lại sau đúng 30 ngày kể từ lúc xoá"
        ],
        "correct": 2,
        "explanation": "Xoá thông thường chuyển tệp vào thùng rác; chỗ chỉ được trả lại khi thùng rác được dọn. Kiểm tra thùng rác xem trong đó có gì rồi mới dọn. Ổ hỏng là hiếm và sẽ có triệu chứng khác, xoá hai lần không có ý nghĩa gì, và không có quy định cố định 30 ngày cho mọi máy."
      },
      {
        "question": "Bạn thấy một thư mục hệ thống rất lớn. Nên làm gì?",
        "options": [
          "Xoá những tệp bên trong mà tên nghe có vẻ tạm thời, vì tên có chữ \"temp\" thì an toàn",
          "Xoá cả thư mục rồi khởi động lại, nếu có lỗi thì hệ điều hành tự tạo lại",
          "Nén thư mục thành một tệp để nhỏ lại mà vẫn dùng được như cũ",
          "Không xoá; nếu nghi ngờ thì hỏi bộ phận IT"
        ],
        "correct": 3,
        "explanation": "Thư mục hệ thống chứa thứ máy cần để chạy; xoá nhầm có thể khiến máy không khởi động hoặc phần mềm hỏng, và không phải cái gì cũng tự tạo lại. Tên gợi ý \"tạm\" không đủ để chắc chắn, còn nén thư mục hệ thống có thể làm máy không đọc được nó. Hỏi IT mất vài phút, làm sai có thể mất cả buổi."
      },
      {
        "question": "Bạn định xoá 30 GB video họp cũ để lấy chỗ. Điều cần làm TRƯỚC khi xoá là gì?",
        "options": [
          "Chắc rằng còn một bản ở nơi khác và mở thử được",
          "Đổi tên các tệp thành \"cũ\" để khỏi nhầm khi xoá về sau",
          "Gửi từng tệp qua email cho chính mình",
          "Xoá luôn rồi khôi phục từ thùng rác nếu sau này cần lại"
        ],
        "correct": 0,
        "explanation": "Nguyên tắc: chỉ xoá bản trên máy khi đã có bản khác còn mở được, vì bản duy nhất mất là mất. Đổi tên không tạo thêm bản sao. Email video lớn thường vượt giới hạn tệp đính kèm và không phải cách lưu trữ. Thùng rác có thể đã được dọn, hoặc bạn bỏ qua mà không biết."
      },
      {
        "question": "Ổ 256 GB, hệ điều hành và phần mềm chiếm 80 GB, mỗi video 1 GB (số liệu minh hoạ). Chép được tối đa bao nhiêu video?",
        "options": [
          "256 video (= 256 ÷ 1, quên phần 80 GB hệ thống đã chiếm sẵn)",
          "176 video (= (256 − 80) ÷ 1)",
          "336 video (= 256 + 80, cộng thay vì trừ phần đã bị chiếm)",
          "80 video (= 80 ÷ 1, lấy nhầm phần hệ thống làm chỗ trống)"
        ],
        "correct": 1,
        "explanation": "Chỗ trống = tổng trừ đi phần đã dùng: 256 − 80 = 176 GB, chia 1 GB mỗi video ra 176 video. Dùng 256 là quên phần hệ thống; 336 là cộng thay vì trừ; 80 là lấy phần đã bị chiếm làm phần còn trống. Trong thực tế còn nên chừa chỗ trống để máy chạy ổn."
      }
    ],
    "keyTakeaways": [
      "Đầy ổ thường do video, bản ghi họp và tệp tải về, hiếm khi do văn bản.",
      "Xoá vào thùng rác chưa trả lại chỗ; thùng rác phải được dọn.",
      "Không xoá tệp hệ thống hoặc tệp lạ khi chưa biết nó là gì.",
      "Trước khi xoá: phải có bản khác còn mở được.",
      "Chỗ trống = tổng dung lượng − phần đã dùng."
    ],
    "practicePrompt": {
      "question": "Bạn cần 5 GB trống gấp. Hai lựa chọn: xoá thùng rác 6 GB chứa tệp bạn đã xoá hôm trước, hay xoá thư mục \"Dự án khách hàng\" 6 GB. Nên chọn gì?",
      "options": [
        "Xem nhanh thùng rác rồi dọn, giữ thư mục dự án",
        "Xoá thư mục dự án vì nó là tệp thật còn thùng rác đã bỏ",
        "Xoá cả hai cho chắc để có nhiều chỗ trống hơn hẳn",
        "Không xoá gì mà nén cả hai lại thành một tệp zip duy nhất"
      ],
      "correct": 0,
      "explanation": "Thùng rác chứa thứ bạn đã quyết bỏ - dọn nó sau một lần nhìn lại là rủi ro thấp nhất. Thư mục dự án là dữ liệu đang dùng. Xoá cả hai làm mất thứ không cần mất, còn nén chỉ giảm bớt chứ không giải phóng 5 GB trống và không phải lúc nào cũng đủ."
    },
    "summary": {
      "keyIdea": "Đầy ổ là dấu hiệu để kiểm kê, không phải để xoá vội.",
      "formula": "Liệt kê nhóm tệp nặng → kiểm còn bản khác → chép bản chưa có → xoá bản trên máy → dọn thùng rác.",
      "commonMistake": "Xoá thư mục lớn nhất hoặc tệp hệ thống vì nghĩ lớn là không cần.",
      "action": "Mở phần xem dung lượng của máy và ghi 3 nhóm tệp nặng nhất, chưa xoá gì."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Mở phần xem dung lượng ổ trên máy bạn (hoặc thư mục Tải về và Video). Ghi ra một trang ba cột: nhóm tệp, dung lượng ước tính, và \"còn bản khác ở đâu\". Đánh dấu nhóm nào có thể chép sang kho chung rồi xoá, nhóm nào không được đụng. Không xoá gì hôm nay; mai bạn cần trả lời được \"nhóm nào chiếm nhiều nhất\".",
      "secondary": "Nếu ổ còn trống dưới 15% thì nên dọn sớm; hỏi IT nếu công ty có quy định về nơi lưu video họp."
    },
    "sections": [
      {
        "type": "lead",
        "text": "4 giờ chiều, báo cáo quý chỉ còn một bước là bấm Lưu thì máy báo \"không đủ dung lượng\". Bài này dạy bạn thói quen đáng giá nhất lúc đó: lập danh sách trước, xoá sau."
      },
      {
        "type": "feynman",
        "title": "Ổ đầy đơn giản hơn bạn nghĩ",
        "intro": "Hình dung tủ hồ sơ của văn phòng đã đầy. Bạn sẽ không vứt cả ngăn đầu tiên mở ra. Bạn xem ngăn nào chiếm nhiều chỗ, cái gì đã có bản ở nơi khác, cái gì thực sự là giấy nháp, rồi mới bỏ.",
        "columns": [
          "Tình huống",
          "Tủ hồ sơ văn phòng",
          "Ổ lưu trữ của máy"
        ],
        "rows": [
          [
            "Chiếm nhiều chỗ nhất",
            "Mấy cuốn album ảnh dày cộp, không phải giấy A4",
            "Video, bản ghi họp, tệp tải về"
          ],
          [
            "Đã bỏ nhưng chưa vứt",
            "Giấy nằm trong thùng rác dưới bàn",
            "Tệp nằm trong thùng rác của máy"
          ],
          [
            "Không được đụng",
            "Hồ sơ của phòng khác đặt nhờ",
            "Tệp hệ thống và dữ liệu phần mềm"
          ],
          [
            "Trước khi bỏ",
            "Photo một bản cất chỗ khác nếu còn cần",
            "Chép sang kho chung, mở thử rồi mới xoá"
          ]
        ],
        "oneLiner": "Đầy ổ là lúc kiểm kê: xem cái gì nặng, cái gì đã có bản khác, rồi mới dọn."
      },
      {
        "type": "heading",
        "text": "Cái gì thường chiếm chỗ"
      },
      {
        "type": "paragraph",
        "text": "Dung lượng được tính bằng GB. Một tệp Word thường chỉ vài trăm KB, còn một video họp có thể vài GB: gấp hàng nghìn lần. Vì vậy vài chục video đã nặng hơn cả vạn tệp văn bản. Bạn dọn một video cũ có giá trị hơn dọn cả thư mục tài liệu."
      },
      {
        "type": "chart",
        "title": "Chỗ trống còn lại khi tích thêm video",
        "caption": "Số liệu minh hoạ, không phải đo từ máy thật. Kéo thanh trượt để khớp ổ của bạn: dung lượng ổ, phần hệ điều hành và phần mềm đã chiếm, và dung lượng mỗi video.",
        "kind": "line",
        "xLabel": "Số video đã lưu",
        "yLabel": "Chỗ trống còn lại (GB)",
        "x": {
          "from": 0,
          "to": 300,
          "step": 10
        },
        "params": [
          {
            "id": "disk",
            "label": "Dung lượng ổ",
            "min": 128,
            "max": 1024,
            "step": 64,
            "value": 256,
            "unit": "GB"
          },
          {
            "id": "base",
            "label": "Hệ điều hành và phần mềm chiếm",
            "min": 20,
            "max": 120,
            "step": 5,
            "value": 80,
            "unit": "GB"
          },
          {
            "id": "vid",
            "label": "Dung lượng mỗi video",
            "min": 0.2,
            "max": 3,
            "step": 0.1,
            "value": 1,
            "unit": "GB"
          }
        ],
        "series": [
          {
            "label": "Chỗ trống còn lại",
            "expr": "max(0, disk - base - x * vid)"
          }
        ]
      },
      {
        "type": "heading",
        "text": "Bốn nhóm cần kiểm tra trước khi xoá"
      },
      {
        "type": "list",
        "items": [
          "Video và bản ghi họp: nặng nhất, thường đã có bản ở kho chung hoặc ở người tổ chức họp.",
          "Thư mục Tải về: nhiều bản cài đặt và tệp dùng một lần, nhưng xem tên kỹ vì có thể lẫn tệp đã nhận từ khách.",
          "Ảnh và tệp đính kèm lưu từ email: hay trùng lặp với bản trong email.",
          "Thùng rác: chỗ đã bỏ nhưng chưa trả; xem nhanh một lượt rồi dọn."
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Thường dọn được sau khi kiểm",
          "text": "Video đã có bản ở kho chung, tệp cài đặt đã dùng xong, tệp tải về trùng lặp, nội dung thùng rác bạn đã xem qua, ảnh chụp màn hình cũ không còn cần."
        },
        "right": {
          "label": "Không xoá khi chưa chắc",
          "text": "Thư mục hệ thống và dữ liệu phần mềm, tệp bạn không nhận ra nguồn, bản duy nhất của báo cáo hoặc hợp đồng, thư mục do IT hoặc phần mềm công ty tạo ra."
        }
      },
      {
        "type": "callout",
        "label": "Quy tắc hai bản",
        "text": "Tệp quan trọng nên có ít nhất hai bản ở hai nơi khác nhau. Trước khi xoá bản trên máy, hãy mở thử bản còn lại để chắc nó đọc được: mở thử mất 10 giây, tìm lại tệp đã mất mất cả buổi."
      },
      {
        "type": "scenario",
        "title": "Máy báo đầy lúc 4 giờ chiều",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn bấm Lưu báo cáo quý thì máy báo hết dung lượng. Hạn nộp là 5 giờ. Ổ chứa rất nhiều thứ: video họp, tệp tải về, một thư mục lạ tên \"Backup_cu\".",
            "choices": [
              {
                "label": "Xoá thư mục \"Backup_cu\" vì tên có chữ cũ và nó nặng nhất",
                "next": "bad_delete"
              },
              {
                "label": "Mở xem dung lượng theo nhóm: thùng rác, tải về, video; chưa xoá gì",
                "next": "s2"
              }
            ]
          },
          "bad_delete": {
            "text": "Bạn xoá xong mới phát hiện \"Backup_cu\" là bản sao lưu duy nhất của hồ sơ khách quý trước. Không còn bản nào khác. Bạn lưu được báo cáo nhưng mất dữ liệu quý trước.",
            "ending": "bad"
          },
          "s2": {
            "text": "Thùng rác có 4 GB. Thư mục Video có 28 GB bản ghi họp, bạn nhớ người tổ chức cũng giữ bản ở kho chung. Còn cần 3 GB.",
            "choices": [
              {
                "label": "Dọn thùng rác sau khi nhìn lướt, rồi lưu báo cáo",
                "next": "s3"
              },
              {
                "label": "Kéo thả toàn bộ video vào một thư mục khác trên cùng máy cho gọn",
                "next": "bad_move"
              }
            ]
          },
          "bad_move": {
            "text": "Di chuyển sang thư mục khác trong cùng ổ không giải phóng chỗ nào: video vẫn nằm trên máy. Bạn mất 10 phút và vẫn không lưu được báo cáo.",
            "ending": "bad"
          },
          "s3": {
            "text": "Báo cáo đã lưu lúc 4 giờ 20. Video vẫn chiếm 28 GB và ổ sẽ đầy lại nhanh.",
            "choices": [
              {
                "label": "Mai hỏi người tổ chức xác nhận còn bản ở kho chung, mở thử vài video, rồi chép chuyển phần còn thiếu và xoá bản trên máy",
                "next": "good"
              },
              {
                "label": "Xoá ngay tất cả video vì hôm nay đã xong việc",
                "next": "bad_video"
              }
            ]
          },
          "bad_video": {
            "text": "Hai tuần sau sếp hỏi lại một đoạn ghi âm họp. Bản ở kho chung không có buổi đó và bạn đã xoá bản duy nhất.",
            "ending": "bad"
          },
          "good": {
            "text": "Bạn xác nhận còn bản ở kho chung, mở thử được, rồi mới dọn video trên máy. Báo cáo đã nộp đúng giờ, ổ trống 30 GB, và không mất tệp nào.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Đầy ổ là lúc kiểm kê: nhóm nào nặng, còn bản khác không, rồi mới xoá.",
          "Bài sau: tệp của bạn đang nằm trên máy mình hay trên kho chung."
        ]
      }
    ]
  },
  {
    "id": 2722,
    "slug": "tep-nam-o-dau-may-hay-nhom-luu-tru-chung",
    "title": "Chặng 66, Bài 3: Tệp này nằm ở đâu: trên máy bạn hay trên kho chung",
    "subtitle": "Ngăn kéo riêng dưới bàn hay tủ hồ sơ chung ngoài hành lang: đồng nghiệp chỉ thấy cái thứ hai.",
    "duration": "8 phút",
    "difficulty": "Dễ",
    "emoji": "📂",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "\"Em lưu rồi mà\" là câu gây ra nhiều buổi sáng hoảng loạn nhất ở văn phòng: bạn chắc chắn đã lưu, đồng nghiệp chắc chắn không thấy, và cả hai đều đúng. Khác biệt nằm ở chỗ lưu. Biết tệp đang ở máy mình hay ở kho chung giúp bạn tìm ra nguyên nhân trong một phút và tránh có ba bản báo cáo khác nhau cùng lưu hành.",
    "openingQuestion": "Bạn vừa lưu BaoCao_Q3.xlsx và nhắn đồng nghiệp Nam: \"Em lưu rồi nhé\". Nam trả lời: \"Anh không thấy tệp nào trong thư mục phòng.\" Giải thích hợp lý nhất là gì?",
    "openingOptions": [
      "Bạn lưu trên máy mình, chưa đưa vào thư mục chung",
      "Nam chưa mở hết thư mục nên bỏ sót tệp nằm trong đó",
      "Máy của Nam bị lỗi nên không hiển thị được tệp mới",
      "Tệp quá nặng nên kho chung tự xoá ngay sau khi lưu"
    ],
    "correctOption": 0,
    "explanation": "Bấm Lưu mặc định cất tệp vào một nơi trên máy bạn (ví dụ Màn hình nền hoặc Tài liệu); chỉ bạn thấy nơi đó. Đồng nghiệp chỉ thấy tệp nằm trong thư mục chung của phòng, nên Nam không thấy là điều bình thường. Bỏ sót do chưa mở hết thì có thể, nhưng nếu tệp thật sự ở thư mục chung thì tìm theo tên sẽ ra. Máy Nam lỗi hay kho tự xoá là giả thuyết hiếm, nên kiểm tra nơi lưu trước.",
    "diagram": [
      {
        "label": "Bạn lưu tệp: lúc này tệp nằm ở máy bạn",
        "arrow": true
      },
      {
        "label": "Tệp nằm trong thư mục đồng bộ hoặc thư mục chung?",
        "arrow": true
      },
      {
        "label": "Đồng bộ xong: kho chung có bản mới nhất",
        "arrow": true
      },
      {
        "label": "Đồng nghiệp có quyền thì thấy tệp trên kho chung"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: ở một phòng kế toán, ba người cùng sửa bảng tổng hợp. Mỗi người chép bảng về Màn hình nền của mình và gửi bản sửa qua email. Cuối tuần có bốn bản với tên na ná nhau và không ai biết bản nào đúng. Sau đó cả phòng thống nhất chỉ một bản nằm ở thư mục chung, mọi người sửa trực tiếp trên bản đó và ghi ngày giờ ở tên tệp khi chốt."
    },
    "quiz": [
      {
        "question": "Tệp nằm trên Màn hình nền của máy bạn. Ai thường thấy được tệp đó?",
        "options": [
          "Cả phòng, vì Màn hình nền là nơi chung của mọi máy trong công ty",
          "Những ai có địa chỉ email của bạn trong danh bạ công ty",
          "Chỉ người đăng nhập vào máy bạn",
          "Tất cả người trong cùng mạng Wi-Fi văn phòng vào lúc đó"
        ],
        "correct": 2,
        "explanation": "Màn hình nền là một thư mục trên máy của bạn, chỉ người dùng máy đó thấy. Nó không phải nơi chung của công ty, địa chỉ email không cho quyền xem tệp trên máy, và cùng Wi-Fi chỉ cho thấy cùng mạng chứ không cho xem thư mục riêng trên máy khác."
      },
      {
        "question": "Bạn lưu tệp vào thư mục đồng bộ rồi tắt máy ngay, nhưng đồng nghiệp vẫn chưa thấy bản mới. Có thể vì sao?",
        "options": [
          "Thư mục này chỉ cập nhật mỗi tuần một lần",
          "Tệp đã tự chuyển thành tệp chỉ đọc nên không ai thấy nữa",
          "Đồng nghiệp bị khoá tài khoản khi bạn tắt máy đột ngột",
          "Việc đồng bộ lên kho chung chưa kịp chạy xong"
        ],
        "correct": 3,
        "explanation": "Đồng bộ cần thời gian và kết nối mạng: tắt máy hoặc mất mạng giữa chừng thì bản mới có thể chưa lên kho. Không có lịch cố định mỗi tuần. Tệp không tự đổi thành chỉ đọc và tắt máy của bạn cũng không khoá tài khoản của người khác. Hãy kiểm tra trạng thái đồng bộ trước khi nhắn đồng nghiệp."
      },
      {
        "question": "Ba người mỗi người tải bản báo cáo về máy, sửa riêng rồi gửi qua email. Rủi ro lớn nhất là gì?",
        "options": [
          "Có nhiều phiên bản khác nhau và không rõ bản nào là bản đúng",
          "Email sẽ tự động ghép các bản sửa lại với nhau bằng cách lấy bản mới nhất",
          "Mỗi người chỉ sửa được đúng phần của mình nên không mất gì cả",
          "Bản gốc trên kho chung sẽ tự xoá khi có bản sửa"
        ],
        "correct": 0,
        "explanation": "Mỗi bản tải về là một bản sao độc lập; sửa riêng thì các bản lệch nhau và khó gộp. Email không tự ghép nội dung, không khoá phần sửa theo từng người, và bản gốc không tự xoá khi bạn tải về một bản sao."
      },
      {
        "question": "Cách nhanh nhất để biết một tệp đang nằm trên máy bạn hay trên kho chung là gì?",
        "options": [
          "Nhìn dung lượng tệp: tệp nhỏ thì nằm trên máy, tệp lớn thì nằm trên kho chung",
          "Xem đường dẫn hoặc vị trí đầy đủ của tệp",
          "Nhìn biểu tượng màu của tệp: luôn luôn xanh nghĩa là tệp đã nằm ở kho chung",
          "Hỏi đồng nghiệp xem họ nhớ tệp ở đâu"
        ],
        "correct": 1,
        "explanation": "Đường dẫn cho biết tệp nằm ở ổ của máy, ở thư mục đồng bộ hay trên kho chung. Dung lượng không liên quan tới nơi lưu, biểu tượng màu tuỳ phần mềm và không phải quy tắc chung, còn hỏi đồng nghiệp là đoán thay vì nhìn thẳng vào nơi tệp đang nằm."
      },
      {
        "question": "Bạn hỏi AI \"tệp của tôi đang nằm ở đâu\". Điều gì đúng?",
        "options": [
          "AI truy cập được máy bạn qua Internet nên tự tìm ra tệp",
          "AI biết vị trí mọi tệp của công ty vì đã đọc các thư mục chung",
          "AI không nhìn thấy máy bạn, nên bạn phải đưa đường dẫn để nó giải thích",
          "AI đoán đúng vì đã thấy tệp của bạn mỗi lần bạn mở cuộc trò chuyện"
        ],
        "correct": 2,
        "explanation": "AI chỉ thấy những gì bạn gõ hoặc đưa vào cuộc trò chuyện; nó không tự đọc máy bạn hay thư mục công ty. Hãy dán đường dẫn (không dán nội dung mật) để nó giúp đọc hiểu. Nếu không có đường dẫn, câu trả lời chỉ là đoán."
      }
    ],
    "keyTakeaways": [
      "Bấm Lưu thường cất tệp trên máy bạn; đồng nghiệp chỉ thấy tệp trên kho chung.",
      "Đường dẫn của tệp cho biết nó nằm ở máy hay ở kho chung.",
      "Đồng bộ cần thời gian và mạng: kiểm tra trạng thái trước khi báo \"đã lưu\".",
      "Mỗi bản tải về là một bản sao độc lập: sửa riêng thì tạo nhiều phiên bản.",
      "AI không thấy máy bạn: hãy đưa đường dẫn khi hỏi."
    ],
    "practicePrompt": {
      "question": "Cả phòng cần cùng sửa một bảng ngân sách trong tuần. Cách bố trí nào gọn nhất?",
      "options": [
        "Một bản duy nhất ở thư mục chung, mọi người sửa trên đó",
        "Mỗi người giữ một bản ở máy mình rồi gửi email cho trưởng phòng gộp",
        "Một người giữ bản ở máy mình, người khác đến máy đó để sửa",
        "Mỗi người một bản, đặt tên kèm tên mình, cuối tuần ai nhớ bản mới nhất thì chọn"
      ],
      "correct": 0,
      "explanation": "Một bản ở nơi chung nghĩa là mọi người luôn sửa trên cùng một thứ. Nhiều bản ở nhiều máy thì phải gộp thủ công và dễ mất chỗ sửa; đến máy người khác thì phụ thuộc người đó có mở máy; còn nhớ bản mới nhất là dựa vào trí nhớ."
    },
    "summary": {
      "keyIdea": "Tệp có thể nằm ở máy bạn hoặc ở kho chung, và đồng nghiệp chỉ thấy cái nằm ở kho chung.",
      "formula": "Không ai thấy tệp → xem đường dẫn → máy mình hay kho chung? → chuyển vào kho và kiểm tra đồng bộ.",
      "commonMistake": "Báo \"đã lưu\" khi tệp còn nằm ở Màn hình nền, hoặc sửa riêng trên bản sao rồi gửi email.",
      "action": "Mở 3 tệp bạn hay dùng, đọc đường dẫn của chúng và ghi \"máy\" hay \"kho chung\" bên cạnh."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn ba tệp công việc bạn dùng nhiều nhất. Với mỗi tệp, xem đường dẫn đầy đủ và ghi ra giấy: nằm ở máy hay ở thư mục chung, và có bản khác ở nơi nào không. Nếu có tệp quan trọng chỉ nằm trên máy, hỏi đồng nghiệp hoặc IT nơi lưu chung của phòng rồi chép một bản vào đó. Mai hãy báo bạn đã chuyển được mấy tệp.",
      "secondary": "Nếu công ty có quy định về nơi lưu tệp, làm theo quy định đó thay vì tự chọn chỗ."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bạn chắc chắn đã bấm Lưu, đồng nghiệp chắc chắn không thấy tệp. Cả hai đều nói thật, vì hai người đang nhìn vào hai nơi khác nhau. Bài này giúp bạn biết tệp của mình đang ở nơi nào."
      },
      {
        "type": "feynman",
        "title": "Nơi lưu đơn giản hơn bạn nghĩ",
        "intro": "Hình dung ngăn kéo riêng dưới bàn bạn và tủ hồ sơ chung ở hành lang. Giấy cất trong ngăn kéo thì chỉ bạn lấy được; muốn cả phòng xem thì phải cất vào tủ chung.",
        "columns": [
          "Thành phần",
          "Văn phòng",
          "Máy tính và mạng"
        ],
        "rows": [
          [
            "Nơi riêng",
            "Ngăn kéo dưới bàn bạn",
            "Màn hình nền, Tài liệu trên máy của bạn"
          ],
          [
            "Nơi chung",
            "Tủ hồ sơ ngoài hành lang của phòng",
            "Thư mục chung trên kho của công ty"
          ],
          [
            "Mang đi mang lại",
            "Đem giấy từ ngăn kéo ra tủ chung",
            "Đồng bộ hoặc chép tệp vào thư mục chung"
          ],
          [
            "Hậu quả khi nhầm",
            "Đồng nghiệp đến tủ không thấy giấy",
            "Đồng nghiệp không thấy tệp dù bạn đã Lưu"
          ]
        ],
        "oneLiner": "Lưu là cất vào đâu đó; chỉ khi cất vào nơi chung thì người khác mới thấy."
      },
      {
        "type": "heading",
        "text": "Ba nơi tệp thường nằm"
      },
      {
        "type": "paragraph",
        "text": "Nơi thứ nhất là ổ của máy: Màn hình nền, Tài liệu, Tải về. Nơi thứ hai là thư mục đồng bộ: nhìn như thư mục trên máy nhưng có một bản sao được giữ trên kho trực tuyến. Nơi thứ ba là kho chung của công ty: bạn truy cập qua mạng chứ không nằm trên máy."
      },
      {
        "type": "flow",
        "title": "Tệp của bạn đi tới đồng nghiệp thế nào",
        "steps": [
          {
            "label": "Bạn bấm Lưu",
            "detail": "Tệp được ghi vào nơi bạn chọn. Nếu không chọn, thường là một thư mục mặc định trên máy bạn."
          },
          {
            "label": "Kiểm tra nơi lưu",
            "detail": "Đường dẫn cho biết tệp nằm ở máy hay ở thư mục chung. Đây là bước hay bị bỏ qua nhất."
          },
          {
            "label": "Đồng bộ lên kho chung",
            "detail": "Nếu là thư mục đồng bộ, máy gửi bản mới lên kho khi có mạng. Tắt máy hoặc mất mạng giữa chừng thì chưa xong."
          },
          {
            "label": "Đồng nghiệp mở từ kho",
            "detail": "Người có quyền truy cập thấy tệp trong thư mục chung. Không có quyền thì họ vẫn không thấy dù tệp đã lên kho."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Tệp chỉ nằm trên máy bạn",
          "text": "Chỉ bạn thấy. Mất máy hoặc hỏng ổ là mất tệp. Không ai sửa cùng được. Phù hợp cho nháp cá nhân chưa cần chia sẻ."
        },
        "right": {
          "label": "Tệp nằm ở kho chung",
          "text": "Nhiều người cùng thấy và cùng sửa một bản. Thường có bản lịch sử và sao lưu do công ty lo. Phù hợp cho tài liệu của phòng."
        }
      },
      {
        "type": "heading",
        "text": "Ba câu hỏi kiểm tra trước khi nói \"đã lưu\""
      },
      {
        "type": "list",
        "items": [
          "Đường dẫn đầy đủ của tệp bắt đầu bằng gì: ổ của máy hay tên kho chung?",
          "Nếu là thư mục đồng bộ: trạng thái đã đồng bộ xong chưa?",
          "Đồng nghiệp có quyền vào thư mục đó không, hay cần xin quyền từ người quản lý?"
        ]
      },
      {
        "type": "callout",
        "label": "Một bản duy nhất",
        "text": "Khi nhiều người cùng làm một tài liệu, hãy cố giữ một bản duy nhất ở nơi chung. Mỗi lần tải về sửa riêng là thêm một bản nữa, và sau này người ta mất nhiều giờ để đối chiếu bản nào đúng."
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Soát câu trả lời của AI về tệp mất tích",
        "task": "Bạn kể với AI: \"Tôi lưu BaoCao_Q3.xlsx trong Màn hình nền máy mình. Thư mục chung của phòng tên Phong_KeHoach. Nam nói không thấy tệp.\" AI trả lời bên dưới. Đánh dấu những câu AI tự thêm mà bạn chưa hề nói.",
        "segments": [
          {
            "text": "Tệp BaoCao_Q3.xlsx hiện nằm trong Màn hình nền trên máy của bạn."
          },
          {
            "text": "Thư mục Phong_KeHoach là nơi cả phòng dùng chung."
          },
          {
            "text": "Màn hình nền chỉ có trên máy bạn, nên việc anh Nam không thấy tệp là bình thường."
          },
          {
            "text": "Tệp đã tự đồng bộ lên Phong_KeHoach lúc 9 giờ 15 sáng nay.",
            "error": "Bạn không hề nói tệp đã đồng bộ hay lúc mấy giờ: AI bịa chi tiết này, và nó còn mâu thuẫn với ý ngay trên (tệp đang ở Màn hình nền)."
          },
          {
            "text": "Quyền truy cập thư mục Phong_KeHoach của anh Nam đã được cấp từ tuần trước.",
            "error": "Bạn không cung cấp thông tin về quyền của Nam: AI bịa ra một sự thật về hệ thống của công ty."
          },
          {
            "text": "Cách xử lý: chép tệp vào Phong_KeHoach rồi nhắn anh Nam mở lại."
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Nam không thấy báo cáo trước giờ họp",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Còn 15 phút nữa họp. Nam nhắn: \"Anh không thấy BaoCao_Q3 trong thư mục phòng.\" Bạn nhớ mình lưu ở Màn hình nền.",
            "choices": [
              {
                "label": "Chép tệp vào thư mục chung của phòng và chờ đồng bộ xong rồi nhắn Nam",
                "next": "s2"
              },
              {
                "label": "Gửi tệp qua email cho Nam và cả ba người khác trong phòng cho nhanh",
                "next": "bad_mail"
              }
            ]
          },
          "bad_mail": {
            "text": "Mọi người đều nhận tệp, nhưng trong họp mỗi người mở một bản khác nhau vì có người đã tải bản từ tuần trước. Số liệu lệch nhau và buổi họp mất 15 phút để đối chiếu.",
            "ending": "bad"
          },
          "s2": {
            "text": "Thanh trạng thái vẫn báo đang đồng bộ. Nam nhắn lại: \"Vẫn chưa thấy.\"",
            "choices": [
              {
                "label": "Chờ đồng bộ xong, kiểm tra trạng thái và hỏi Nam đã có quyền vào thư mục chưa",
                "next": "good"
              },
              {
                "label": "Tắt máy rồi bật lại, hy vọng máy đồng bộ nhanh hơn",
                "next": "bad_restart"
              }
            ]
          },
          "bad_restart": {
            "text": "Khởi động lại làm việc đồng bộ dở dang. Khi máy bật lại, tệp vẫn chưa lên kho và họp đã bắt đầu.",
            "ending": "bad"
          },
          "good": {
            "text": "Đồng bộ xong sau hai phút. Nam báo đã thấy tệp. Bạn ghi lại: từ nay báo \"đã lưu\" chỉ sau khi nhìn thấy tệp xuất hiện ở thư mục chung.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Nhìn vào đường dẫn trước khi nói \"đã lưu\": máy bạn hay kho chung.",
          "Bài sau: khi máy treo, khởi động lại có thực sự giúp không."
        ]
      }
    ]
  },
  {
    "id": 2723,
    "slug": "khoi-dong-lai-may-co-that-su-giup-khong",
    "title": "Chặng 66, Bài 4: Khởi động lại máy: khi nào nó giúp, khi nào chỉ mất thời gian",
    "subtitle": "Dọn sạch mặt bàn, nhưng cũng vứt luôn mọi việc chưa lưu.",
    "duration": "8 phút",
    "difficulty": "Dễ",
    "emoji": "🔄",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "\"Thử tắt đi bật lại xem\" là lời khuyên đúng nhiều hơn sai, nhưng nó có hai cái bẫy: khởi động lại khi chưa lưu thì mất việc, và khởi động lại khi nguyên nhân là chỗ khác thì chỉ tốn thêm vài phút trước hạn nộp. Hiểu điều gì được dọn sạch giúp bạn dùng lời khuyên này đúng lúc.",
    "openingQuestion": "Máy treo, 30 phút nữa là hạn nộp bảng tính. Bảng tính chưa lưu phần sửa 40 phút gần nhất. Mọi người bảo \"khởi động lại đi\". Bạn nên làm gì trước?",
    "openingOptions": [
      "Thử cứu phần chưa lưu trước, rồi mới nghĩ tới khởi động lại",
      "Khởi động lại ngay vì đó là cách nhanh nhất để hết treo, khỏi lo phần chưa lưu",
      "Chờ thêm cho tới khi máy tự hết treo rồi mới làm gì đó",
      "Rút luôn dây nguồn cho chắc vì máy đang không trả lời gì"
    ],
    "correctOption": 0,
    "explanation": "Phần chưa lưu nằm trên mặt bàn (RAM); khởi động lại là dọn sạch mặt bàn nên phần đó có thể mất. Vì vậy việc đầu tiên là thử cứu công việc: chờ vài phút xem máy có trả lời lại không, rồi bấm Lưu, hoặc lưu bản sao ở chỗ khác nếu còn thao tác được. Khởi động lại ngay thì mất việc. Chờ vô thời hạn lãng phí giờ hạn nộp. Rút dây nguồn là biện pháp cuối cùng, có thể làm hỏng tệp đang mở.",
    "diagram": [
      {
        "label": "Máy treo: thử cứu việc đang dở, chờ vài phút",
        "arrow": true
      },
      {
        "label": "Lưu được thì lưu, ghi lại phần chưa lưu nếu không lưu được",
        "arrow": true
      },
      {
        "label": "Khởi động lại: dọn sạch mặt bàn, áp dụng cập nhật đang chờ",
        "arrow": true
      },
      {
        "label": "Mở lại việc, kiểm tra bản phục hồi nếu phần mềm có, lưu ngay"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một nhân viên kế toán làm bảng tổng hợp cuối tháng, máy treo lúc 4 giờ 30 chiều. Đồng nghiệp bảo tắt nguồn. Chị chờ hai phút, máy trả lời lại, chị bấm Lưu và chép sang một bản khác trước khi khởi động lại. Sau khi máy bật lên, các cửa sổ đều đã sạch, máy chạy mượt, và bảng tính còn nguyên."
    },
    "quiz": [
      {
        "question": "Khởi động lại máy thường giúp ích nhất trong trường hợp nào?",
        "options": [
          "Một tệp Excel rất nặng mở rất chậm trên mọi máy của cả phòng",
          "Wi-Fi văn phòng chập chờn với tất cả mọi người cùng lúc",
          "Ổ đĩa báo đầy mỗi khi bạn cố lưu thêm tệp mới vào máy",
          "Máy bật liên tục nhiều ngày, giật dần, có bản cập nhật đang chờ áp dụng"
        ],
        "correct": 3,
        "explanation": "Khởi động lại dọn sạch bộ nhớ làm việc, tắt chương trình ngầm bị kẹt và áp dụng cập nhật chờ sẵn. Tệp quá nặng là vấn đề của tệp, Wi-Fi chập chờn là vấn đề của mạng, còn ổ đầy là vấn đề dung lượng: khởi động lại không đổi được những điều đó."
      },
      {
        "question": "Điều gì KHÔNG đổi sau khi khởi động lại máy?",
        "options": [
          "Dung lượng còn trống của ổ lưu trữ",
          "Các chương trình đang chạy ngầm bị kẹt",
          "Những cửa sổ và tệp đang mở nhưng chưa lưu",
          "Phần bộ nhớ làm việc đang bị chiếm nhiều"
        ],
        "correct": 0,
        "explanation": "Ổ lưu trữ giữ nguyên các tệp đã lưu, nên dung lượng trống không đổi; ổ đầy phải dọn tệp mới có chỗ. Ngược lại, khởi động lại làm các chương trình chạy ngầm dừng, các cửa sổ chưa lưu mất và bộ nhớ làm việc được dọn."
      },
      {
        "question": "Bạn đóng nắp laptop rồi mở lại. Việc này có giống khởi động lại không?",
        "options": [
          "Có, vì đóng nắp luôn dọn sạch bộ nhớ làm việc như khởi động lại",
          "Không, máy thường chỉ ngủ và giữ nguyên mọi thứ đang mở",
          "Có, vì máy sẽ tự lưu mọi tệp đang mở rồi tắt hẳn",
          "Không, vì đóng nắp làm máy tự động cài mọi cập nhật đang chờ"
        ],
        "correct": 1,
        "explanation": "Chế độ ngủ giữ trạng thái đang mở để tiếp tục nhanh, nên không dọn mặt bàn và không áp dụng cập nhật. Vì vậy máy chậm kéo dài nhiều ngày không được cứu bằng cách đóng nắp. Máy không tự lưu mọi tệp khi ngủ: phần chưa lưu vẫn chưa được lưu."
      },
      {
        "question": "Cả buổi sáng video họp của bạn giật, nhưng người bên cạnh dùng chung Wi-Fi vẫn mượt. Khởi động lại máy có thể giải quyết được không?",
        "options": [
          "Chắc chắn giải quyết, vì khởi động lại luôn sửa được mọi lỗi video",
          "Không bao giờ, vì video chỉ phụ thuộc vào tốc độ mạng của nhà mạng",
          "Có thể thử, vì vấn đề có khả năng nằm ở máy bạn chứ không ở mạng chung",
          "Không, vì nên đợi tới khi mạng chung ổn định rồi mới thử gì đó"
        ],
        "correct": 2,
        "explanation": "Nếu máy bên cạnh dùng cùng mạng vẫn mượt, thì mạng chung ổn và lỗi nằm ở máy bạn hoặc phần mềm họp; khởi động lại là việc rẻ đáng thử. Nhưng không có gì \"chắc chắn\", và nói \"không bao giờ\" là bỏ qua khả năng máy bạn bị chiếm tài nguyên."
      },
      {
        "question": "Sau khi khởi động lại vì máy treo, bạn mở Word và thấy bản phục hồi. Nên nhìn nhận thế nào?",
        "options": [
          "Đó là bằng chứng máy luôn tự cứu được mọi việc chưa lưu",
          "Bản phục hồi luôn đầy đủ và không bao giờ thiếu một chữ nào",
          "Bạn không cần bấm Lưu nữa vì máy đã lo hết mọi thứ",
          "Đó là may mắn của phần mềm, không thể trông vào nó, nên phải lưu thường xuyên"
        ],
        "correct": 3,
        "explanation": "Một số phần mềm có lưu nháp tạm, nhưng nó chỉ cứu được phần gần đây và có khi không có. Đó là mạng an toàn, không phải kế hoạch. Nên kiểm bản phục hồi cẩn thận và lưu ngay, rồi duy trì thói quen lưu định kỳ."
      }
    ],
    "keyTakeaways": [
      "Khởi động lại dọn sạch mặt bàn (RAM) và tắt các chương trình ngầm bị kẹt.",
      "Cửa sổ và tệp chưa lưu mất khi khởi động lại.",
      "Nó không làm ổ lưu trữ trống thêm và không sửa mạng.",
      "Đóng nắp laptop thường chỉ là cho máy ngủ, không dọn gì.",
      "Trước khi khởi động lại: cứu việc, rồi khởi động lại, rồi kiểm bản phục hồi."
    ],
    "practicePrompt": {
      "question": "Máy chạy liên tục 10 ngày, dạo này hay giật. Đang chờ một bản cập nhật. Khi nào thích hợp để khởi động lại?",
      "options": [
        "Cuối ngày, sau khi lưu mọi việc và đóng các tệp",
        "Ngay giữa buổi họp để máy sạch trước khi thuyết trình",
        "Khi ổ đầy, vì khi đó khởi động lại sẽ tự giải phóng chỗ",
        "Đợi thêm 10 ngày nữa để chắc cập nhật dồn hết một lượt"
      ],
      "correct": 0,
      "explanation": "Cuối ngày sau khi lưu là lúc ít mất mát nhất. Giữa buổi họp thì gián đoạn và có thể mất việc; ổ đầy không được giải quyết bằng khởi động lại; đợi lâu hơn chỉ kéo dài thời gian máy giật và bản cập nhật chưa được áp dụng."
    },
    "summary": {
      "keyIdea": "Khởi động lại dọn mặt bàn và áp dụng cập nhật chờ sẵn, nhưng không sửa ổ đầy hay mạng yếu.",
      "formula": "Cứu việc đang dở → lưu → khởi động lại → mở lại → kiểm bản phục hồi → lưu ngay.",
      "commonMistake": "Khởi động lại khi chưa lưu, hoặc khởi động lại nhiều lần khi nguyên nhân là mạng hay ổ đầy.",
      "action": "Đặt thói quen: khởi động lại máy cuối tuần và luôn lưu trước."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Hôm nay nhìn lại chiếc máy bạn đang dùng: lần gần nhất bạn khởi động lại hẳn (không phải đóng nắp) là khi nào? Nếu trên 7 ngày, chọn một thời điểm cuối ngày, lưu mọi tệp, khởi động lại và ghi ra: máy có mượt hơn không, cửa sổ nào biến mất, có thông báo cập nhật nào xuất hiện. Mai bạn sẽ được hỏi thấy khác gì.",
      "secondary": "Nếu máy do công ty quản lý và có thông báo khởi động lại bắt buộc, đừng hoãn quá nhiều lần: nhiều cập nhật chỉ áp dụng sau khi khởi động lại."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Máy treo, hạn nộp còn nửa tiếng, và ai đi ngang qua cũng nói: \"Khởi động lại đi!\". Lời khuyên này đúng khá thường xuyên, nhưng nó có một cái giá mà ít ai nhắc: mọi thứ chưa lưu sẽ mất."
      },
      {
        "type": "feynman",
        "title": "Khởi động lại đơn giản hơn bạn nghĩ",
        "intro": "Hình dung bạn làm việc trên một mặt bàn đã chất đầy giấy tờ, nháp, cốc nước. Khởi động lại là dọn sạch cả mặt bàn một lượt: bàn trống, nhưng giấy nháp chưa cất vào tủ cũng đi theo.",
        "columns": [
          "Thành phần",
          "Mặt bàn văn phòng",
          "Máy tính"
        ],
        "rows": [
          [
            "Bị dọn đi",
            "Mọi thứ trải trên bàn, kể cả nháp chưa cất",
            "Bộ nhớ làm việc (RAM): mọi cửa sổ đang mở, phần chưa lưu"
          ],
          [
            "Còn nguyên",
            "Giấy đã cất trong tủ hồ sơ",
            "Tệp đã lưu trong ổ lưu trữ"
          ],
          [
            "Sau khi dọn",
            "Bàn gọn, dễ làm việc, bớt giấy cũ chiếm chỗ",
            "Máy mượt hơn, các chương trình ngầm bị kẹt dừng lại"
          ],
          [
            "Không đổi",
            "Tủ hồ sơ vẫn đầy hay vơi như trước",
            "Ổ lưu trữ vẫn đầy hay vơi như trước; mạng vẫn chậm nếu mạng chậm"
          ]
        ],
        "oneLiner": "Khởi động lại dọn mặt bàn, không dọn tủ hồ sơ: cứu việc dở trước rồi mới dọn."
      },
      {
        "type": "heading",
        "text": "Điều gì được dọn, điều gì không"
      },
      {
        "type": "paragraph",
        "text": "Khi máy chạy nhiều ngày, phần mềm để lại vụn trong bộ nhớ làm việc, và có chương trình ngầm bị kẹt chiếm sức máy. Khởi động lại xoá hết những thứ đó, và cũng là lúc hệ điều hành áp dụng các bản cập nhật đang chờ. Nhưng nó không biết bạn đang làm dở việc gì."
      },
      {
        "type": "flow",
        "title": "Khởi động lại đúng cách khi máy treo",
        "steps": [
          {
            "label": "Chờ và quan sát",
            "detail": "Nhiều khi máy chỉ bận, không phải đã hỏng. Đợi vài phút xem cửa sổ có trả lời lại không."
          },
          {
            "label": "Cứu việc đang dở",
            "detail": "Nếu thao tác được, bấm Lưu, hoặc lưu thêm bản sao sang tên khác. Nếu không, ghi nhanh lại phần đã sửa để làm lại."
          },
          {
            "label": "Khởi động lại",
            "detail": "Dùng chức năng khởi động lại của hệ điều hành; chỉ dùng cách tắt cưỡng bức khi máy hoàn toàn không phản hồi."
          },
          {
            "label": "Mở lại và kiểm tra",
            "detail": "Mở lại tệp, xem phần mềm có đưa ra bản phục hồi không, rồi lưu ngay. Đừng coi bản phục hồi là chắc chắn có."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Khởi động lại thường giúp",
          "text": "Máy chạy nhiều ngày rồi giật dần. Một chương trình kẹt và không đóng được. Có bản cập nhật đang chờ. Máy lạ: một số chương trình không hoạt động dù hôm qua vẫn bình thường."
        },
        "right": {
          "label": "Khởi động lại không giúp",
          "text": "Ổ đầy, không lưu được tệp. Wi-Fi chậm cả văn phòng. Một tệp quá nặng hoặc quá nhiều công thức. Lỗi lặp lại ngay sau khi khởi động, cần người xem kỹ hơn."
        }
      },
      {
        "type": "heading",
        "text": "Trước khi bấm Khởi động lại"
      },
      {
        "type": "list",
        "items": [
          "Có tệp nào đang sửa mà chưa lưu không? Nếu có, thử cứu trước.",
          "Có phần nào đã có bản ở nơi khác để không sợ mất không?",
          "Nguyên nhân có nằm ngoài máy (Wi-Fi, ổ đầy, tệp nặng) không? Nếu có, khởi động lại chỉ tốn thời gian.",
          "Đã chờ đủ vài phút chưa, hay máy chỉ đang bận?"
        ]
      },
      {
        "type": "callout",
        "label": "Đóng nắp không phải khởi động lại",
        "text": "Đóng nắp laptop hoặc để máy ngủ thường giữ nguyên mọi thứ đang mở nên không dọn gì cả. Một máy bạn chỉ cho ngủ mỗi tối có thể chạy liên tục hàng tuần mà chưa từng được dọn mặt bàn."
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI lập danh sách việc trước khi khởi động lại",
        "task": "Máy treo trước hạn nộp, bạn đang mở Excel, Word và thư nháp. Lắp một prompt để AI đưa ra trình tự việc cần làm trước, trong và sau khi khởi động lại.",
        "parts": [
          {
            "id": "context",
            "label": "Tình huống",
            "options": [
              {
                "text": "Máy tôi treo rồi.",
                "feedback": "AI không biết bạn đang mở gì, có việc chưa lưu không, còn bao lâu tới hạn: nó chỉ đưa lời khuyên chung chung."
              },
              {
                "text": "Laptop văn phòng treo 10 phút. Đang mở Excel (sửa 40 phút chưa lưu), Word và một thư nháp; hạn nộp còn 30 phút.",
                "good": true,
                "feedback": "Có việc dở, thời gian còn lại và các tệp đang mở: AI có thể ưu tiên cứu việc trước."
              }
            ]
          },
          {
            "id": "task",
            "label": "Việc cần làm",
            "options": [
              {
                "text": "Nói cho tôi biết nên làm gì.",
                "feedback": "Yêu cầu mơ hồ: AI có thể đề xuất ngay việc tắt nguồn mà không nhắc tới việc chưa lưu."
              },
              {
                "text": "Liệt kê từng bước: việc cần làm trước khi khởi động lại, việc làm sau, và điều gì có thể mất.",
                "good": true,
                "feedback": "Bạn nhận được trình tự kiểm được, và biết rõ rủi ro mất dữ liệu của từng bước."
              }
            ]
          },
          {
            "id": "limit",
            "label": "Giới hạn",
            "options": [
              {
                "text": "Hướng dẫn chi tiết cả các thao tác trong Cài đặt máy của tôi.",
                "feedback": "AI không biết máy và phiên bản của bạn: nó sẽ bịa tên mục và đường dẫn không tồn tại."
              },
              {
                "text": "Chỉ nêu nguyên tắc, không bịa tên nút hay menu; chỗ nào không chắc thì nói là không chắc.",
                "good": true,
                "feedback": "Bạn chặn được chuyện AI bịa đường dẫn menu. Bạn tự tìm nút trên máy mình."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "context",
              "task",
              "limit"
            ],
            "text": "Trước khi khởi động lại:\n1) Chờ 2-3 phút xem máy có trả lời lại không.\n2) Nếu thao tác được, bấm Lưu Excel trước, rồi lưu sang bản sao.\n3) Nếu không thao tác được, ghi nhanh các thay đổi chính trên giấy để làm lại.\nSau đó khởi động lại. Có thể mất phần 40 phút chưa lưu nếu không cứu được. Sau khi bật máy: mở Excel, xem có bản phục hồi không (có thể có hoặc không), và lưu ngay.\nTôi không biết tên nút trên máy bạn nên không chỉ đường dẫn cụ thể."
          },
          {
            "requires": [
              "context"
            ],
            "text": "Bạn nên lưu công việc rồi khởi động lại máy. Sau khi khởi động, mở lại các tệp và kiểm tra xem còn đủ nội dung không.\n(Đúng hướng, nhưng không nói rõ phần nào có thể mất và không có phương án nếu không lưu được.)"
          },
          {
            "text": "Hãy nhấn giữ nút nguồn 10 giây, vào mục Advanced Recovery trong Cài đặt để khôi phục toàn bộ dữ liệu chưa lưu, rồi bật lại.\n(AI bịa ra một mục menu và hứa khôi phục được mọi thứ chưa lưu, trong khi phần đó thường đã mất.)"
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Máy treo 30 phút trước hạn nộp",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bảng tính trên màn hình không phản hồi. Bạn đã sửa 40 phút chưa lưu. Đồng nghiệp bảo: \"Giữ nút nguồn đi, máy nào treo cũng hết!\"",
            "choices": [
              {
                "label": "Giữ nút nguồn ngay để tắt cưỡng bức",
                "next": "bad_power"
              },
              {
                "label": "Chờ 2-3 phút xem máy có trả lời lại không",
                "next": "s2"
              }
            ]
          },
          "bad_power": {
            "text": "Máy tắt đột ngột. Khi bật lên, phần bảng tính sửa 40 phút gần nhất không còn. Bạn làm lại mất hơn nửa thời gian còn lại và nộp trễ.",
            "ending": "bad"
          },
          "s2": {
            "text": "Sau 3 phút, bảng tính trả lời lại. Bạn vẫn có 27 phút.",
            "choices": [
              {
                "label": "Bấm Lưu và lưu thêm một bản sao, rồi khởi động lại máy",
                "next": "s3"
              },
              {
                "label": "Tiếp tục làm cho tới phút chót vì máy đã hết treo",
                "next": "bad_keep"
              }
            ]
          },
          "bad_keep": {
            "text": "Mười phút sau máy treo lần nữa, lần này không trả lời lại. Bạn mất thêm phần sửa mới.",
            "ending": "bad"
          },
          "s3": {
            "text": "Máy bật lại sau vài phút, mượt và không còn giật. Bạn mở bảng tính.",
            "choices": [
              {
                "label": "Mở bản đã lưu, đối chiếu với bản sao, hoàn tất phần còn lại và nộp",
                "next": "good"
              },
              {
                "label": "Bỏ bản sao, tin là máy mới bật chắc không mất gì",
                "next": "bad_trust"
              }
            ]
          },
          "bad_trust": {
            "text": "Bản chính bị thiếu hai dòng bạn sửa ngay trước lúc treo. Bạn nộp mà không biết, sếp phát hiện vào sáng hôm sau.",
            "ending": "bad"
          },
          "good": {
            "text": "Bản đã lưu và bản sao khớp nhau, chỉ thiếu hai dòng cuối, bạn bổ sung ngay và nộp đúng hạn.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Khởi động lại dọn mặt bàn, nhưng đừng để nó dọn luôn việc bạn chưa lưu.",
          "Bài sau: gom mọi thứ vào một bảng kiểm sức khoẻ cho chiếc máy bạn đang dùng."
        ]
      }
    ]
  },
  {
    "id": 2724,
    "slug": "du-an-nho-danh-gia-suc-khoe-may-tinh-ca-nhan",
    "title": "Chặng 66, Bài 5: Dự án nhỏ: bảng kiểm sức khoẻ cho chiếc máy bạn đang dùng",
    "subtitle": "Một trang ghi chép: dung lượng, tuổi máy, tệp chưa sao lưu, rồi nhờ AI xếp việc nên làm trước.",
    "duration": "10 phút",
    "difficulty": "Dễ",
    "emoji": "🩺",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Phần lớn người đi làm chỉ nhớ tới máy tính khi nó hỏng. Một trang kiểm tra 15 phút mỗi vài tháng cho bạn biết ổ còn trống bao nhiêu, tệp nào chưa có bản sao, máy có còn nhận cập nhật không: đủ để thấy rủi ro trước khi nó thành sự cố. Đây là dự án tổng hợp bốn bài đầu của chặng.",
    "openingQuestion": "Bạn lập bảng kiểm cho máy của mình: ổ còn trống 12%, máy dùng 5 năm, có 3 thư mục công việc chưa từng sao lưu, cập nhật đang chờ 2 tuần. Việc nào nên làm đầu tiên?",
    "openingOptions": [
      "Sao lưu 3 thư mục công việc chưa có bản nào",
      "Cài bản cập nhật đang chờ vì nó đã chờ lâu nhất",
      "Dọn ổ cho trống thêm vì 12% trống là gần đầy rồi",
      "Đặt mua máy mới vì máy đã dùng tới 5 năm rồi"
    ],
    "correctOption": 0,
    "explanation": "Tệp chưa có bản nào khác là thứ duy nhất trong bảng mà mất thì không lấy lại được. Sao lưu trước rồi mới dọn hoặc cập nhật, vì cả hai đều có rủi ro nhỏ làm sai tệp. Cập nhật và dọn ổ đều đáng làm nhưng chậm vài ngày thì không mất gì. Mua máy mới là quyết định tốn tiền, cần thêm thông tin từ IT chứ không chỉ dựa vào con số tuổi máy.",
    "diagram": [
      {
        "label": "Ghi số liệu: ổ trống, tuổi máy, cập nhật, tệp chưa sao lưu",
        "arrow": true
      },
      {
        "label": "Đưa trang ghi chép cho AI, không đưa nội dung mật",
        "arrow": true
      },
      {
        "label": "AI xếp việc theo rủi ro; bạn kiểm lại từng mục",
        "arrow": true
      },
      {
        "label": "Làm theo thứ tự: sao lưu, cập nhật, dọn dẹp; ghi ngày để kiểm lại"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một nhân viên nhân sự dành 15 phút lập trang ghi chép. Cô thấy thư mục hồ sơ ứng viên chỉ có trên máy, ổ còn 9% trống và bản cập nhật chờ ba tuần. Cô nhờ AI xếp thứ tự, nó đề xuất sao lưu trước. Cô chép hồ sơ lên kho chung, mở thử, rồi mới dọn ổ và cập nhật. Một tháng sau ổ cứng ngoài của đồng nghiệp hỏng, còn hồ sơ của cô vẫn an toàn."
    },
    "quiz": [
      {
        "question": "Mục nào trong bảng kiểm cho biết rủi ro mất dữ liệu không lấy lại được?",
        "options": [
          "Số tệp quan trọng chưa có bản nào ở nơi khác",
          "Phần trăm ổ lưu trữ còn trống trên máy hiện tại",
          "Số năm máy đã dùng kể từ ngày bạn được cấp",
          "Số ngày chờ của bản cập nhật chưa cài đặt"
        ],
        "correct": 0,
        "explanation": "Tệp chỉ có một bản mà mất thì không khôi phục được. Ổ đầy khiến bạn bất tiện nhưng tệp vẫn còn; tuổi máy chỉ là chỉ dấu cho nguy cơ hỏng chứ không phải là mất; cập nhật chờ làm tăng rủi ro bảo mật nhưng không tự làm mất tệp của bạn."
      },
      {
        "question": "Bạn đưa trang ghi chép cho AI để xếp thứ tự việc. Nên đưa phần nào?",
        "options": [
          "Chụp toàn màn hình máy cho AI nhìn",
          "Các con số và tên nhóm tệp, bỏ nội dung bên trong các tệp",
          "Dán nguyên nội dung từng hợp đồng để AI biết tệp nào quan trọng",
          "Đưa cả mật khẩu đăng nhập máy để AI kiểm tra giúp cho nhanh"
        ],
        "correct": 1,
        "explanation": "AI chỉ cần số đo và tên nhóm để xếp việc. Chụp toàn màn hình có thể lộ thông tin khác; nội dung hợp đồng là dữ liệu mật không nên đưa ra ngoài; mật khẩu thì không bao giờ đưa cho AI hay bất kỳ ai."
      },
      {
        "question": "AI xếp \"mua máy mới\" lên đầu danh sách. Bạn nên làm gì?",
        "options": [
          "Đặt mua luôn vì AI đã phân tích kỹ hơn bạn nhiều",
          "Bỏ qua cả danh sách vì AI đã sai ở mục đầu tiên",
          "Hỏi AI dựa trên số liệu nào, rồi đối chiếu với bảng kiểm của bạn",
          "Xin công ty duyệt ngân sách ngay mà chưa xem số liệu nào"
        ],
        "correct": 2,
        "explanation": "AI nói nghe chắc chắn không có nghĩa là có căn cứ: hãy hỏi nó dựa vào số nào trong bảng của bạn. Nếu không có số nào hỗ trợ, đó là chỗ nó đoán. Bỏ cả danh sách thì phí các mục đúng, còn xin duyệt ngân sách khi chưa có số liệu là lặp lại sai lầm."
      },
      {
        "question": "Bao lâu nên làm lại bảng kiểm sức khoẻ cho máy?",
        "options": [
          "Mỗi ngày trước khi bắt đầu làm việc để chắc máy luôn tốt",
          "Chỉ làm một lần duy nhất khi nhận máy, rồi không cần nữa",
          "Chỉ khi máy hỏng hẳn và không bật lên được nữa",
          "Vài tháng một lần, và khi máy có dấu hiệu bất thường"
        ],
        "correct": 3,
        "explanation": "Bảng kiểm nhẹ và ít tốn công nên vài tháng một lần đủ để phát hiện sớm: ổ đầy dần, tệp mới chưa sao lưu. Làm mỗi ngày là quá tay, làm một lần thì số liệu cũ đi, còn chờ hỏng hẳn thì đã quá muộn để sao lưu."
      },
      {
        "question": "Ổ 512 GB đang dùng 461 GB (số liệu minh hoạ). Phần trăm còn trống khoảng bao nhiêu?",
        "options": [
          "Khoảng 10% (= (512 − 461) ÷ 512)",
          "Khoảng 90% (= 461 ÷ 512, lấy phần đã dùng làm phần trống)",
          "Khoảng 51% (= 461 − 512 + 100, cộng trừ sai thứ tự)",
          "Khoảng 1% (= 512 ÷ 461 − 1, chia ngược rồi trừ)"
        ],
        "correct": 0,
        "explanation": "Phần trống là 512 − 461 = 51 GB; chia cho 512 ra khoảng 10%. Con số 90% là phần đã dùng chứ không phải phần trống; 51% sai vì trộn cộng trừ; 1% do chia ngược. Còn khoảng 10% trống thì nên dọn sớm."
      }
    ],
    "keyTakeaways": [
      "Bảng kiểm là một trang ghi số: ổ trống, tuổi máy, cập nhật chờ, tệp chưa sao lưu.",
      "Tệp chỉ có một bản là rủi ro lớn nhất: sao lưu trước rồi mới dọn hay cập nhật.",
      "Đưa AI số liệu và tên nhóm, không đưa nội dung mật hay mật khẩu.",
      "Hỏi AI dựa vào số nào, và đối chiếu với bảng của bạn.",
      "Làm lại bảng kiểm vài tháng một lần."
    ],
    "practicePrompt": {
      "question": "Bảng của bạn ghi: ổ trống 40%, máy 2 năm, 2 thư mục chưa sao lưu, cập nhật chờ 3 ngày. Thứ tự hợp lý là gì?",
      "options": [
        "Sao lưu 2 thư mục, rồi cập nhật, rồi xem lại sau vài tháng",
        "Cập nhật trước, vì nó đã nằm chờ lâu hơn, còn thư mục chưa sao lưu thì tính sau",
        "Dọn ổ trước, vì mọi máy đều nên có thật nhiều chỗ trống",
        "Không làm gì cả, vì ổ còn trống tới 40% là khá an toàn"
      ],
      "correct": 0,
      "explanation": "Chỉ có rủi ro mất dữ liệu thật là tệp chưa sao lưu, nên luôn đứng đầu. Ổ trống 40% và máy 2 năm chưa có gì khẩn cấp. Cập nhật chờ 3 ngày là việc thứ hai. Không làm gì nghĩa là bỏ qua hai thư mục chưa có bản nào."
    },
    "summary": {
      "keyIdea": "Một trang kiểm tra ngắn cho bạn biết rủi ro thật của máy, và thứ tự xử lý.",
      "formula": "Ghi số → đưa AI số liệu (không đưa nội dung mật) → kiểm từng đề xuất → sao lưu, cập nhật, dọn → ghi ngày.",
      "commonMistake": "Dọn ổ hoặc cập nhật trước khi sao lưu, hoặc tin đề xuất mua máy mới khi chưa có số liệu.",
      "action": "Lập trang bảng kiểm cho máy bạn đang dùng và đặt lịch kiểm lại sau 3 tháng."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Lập một trang bảng kiểm cho máy bạn đang dùng với 5 dòng: dung lượng ổ trống (phần trăm), số năm đã dùng, máy còn nhận cập nhật không, các thư mục công việc chưa có bản ở nơi khác, và lần cuối khởi động lại. Nhờ AI xếp việc theo thứ tự bằng chính các số đó, rồi làm MỘT việc đứng đầu. Mai bạn được hỏi việc đầu tiên là gì và đã làm chưa.",
      "secondary": "Nếu máy do công ty quản lý, hỏi IT trước khi cài hay xoá gì; bảng kiểm là để bạn hỏi có căn cứ."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bốn bài đầu đã cho bạn các mảnh ghép: máy gồm mấy phần, ổ đầy thì làm gì, tệp nằm ở đâu, khi nào nên khởi động lại. Bài này gom chúng vào một trang giấy 15 phút để bạn biết máy mình đang khoẻ hay yếu."
      },
      {
        "type": "feynman",
        "title": "Bảng kiểm đơn giản hơn bạn nghĩ",
        "intro": "Hình dung buổi khám sức khoẻ định kỳ: người ta đo vài chỉ số, ghi vào một phiếu, rồi bác sĩ căn cứ vào phiếu để xếp việc nên làm trước. Bảng kiểm cho máy cũng như vậy.",
        "columns": [
          "Thành phần",
          "Khám sức khoẻ",
          "Bảng kiểm máy tính"
        ],
        "rows": [
          [
            "Đo chỉ số",
            "Cân nặng, huyết áp, xét nghiệm",
            "Ổ trống bao nhiêu phần trăm, máy dùng mấy năm, cập nhật chờ mấy ngày"
          ],
          [
            "Rủi ro lớn nhất",
            "Bệnh không phát hiện sớm sẽ khó chữa",
            "Tệp chỉ có một bản: mất là mất"
          ],
          [
            "Căn cứ ra quyết định",
            "Phiếu số liệu chứ không phải cảm giác",
            "Trang ghi chép số, không phải đoán"
          ],
          [
            "Lịch khám lại",
            "Vài tháng hoặc một năm một lần",
            "Vài tháng một lần hoặc khi máy lạ"
          ]
        ],
        "oneLiner": "Bảng kiểm biến \"máy cứ thấy lạ lạ\" thành vài con số để bạn xếp việc có căn cứ."
      },
      {
        "type": "heading",
        "text": "Năm dòng của trang ghi chép"
      },
      {
        "type": "list",
        "items": [
          "Dòng 1 - Ổ trống: bao nhiêu phần trăm (bài 2). Dưới khoảng 15% thì nên dọn sớm.",
          "Dòng 2 - Tuổi máy và tình trạng: dùng mấy năm, còn nhận cập nhật không (hỏi IT nếu không chắc).",
          "Dòng 3 - Tệp chưa sao lưu: thư mục công việc chỉ có trên máy (bài 3).",
          "Dòng 4 - Cập nhật đang chờ: đã chờ bao nhiêu ngày.",
          "Dòng 5 - Lần khởi động lại gần nhất (bài 4)."
        ]
      },
      {
        "type": "flow",
        "title": "Từ trang ghi chép tới việc làm",
        "steps": [
          {
            "label": "Đo và ghi số",
            "detail": "Điền 5 dòng. Không đoán: không biết thì ghi \"chưa rõ\" và hỏi IT."
          },
          {
            "label": "Che bớt trước khi đưa AI",
            "detail": "Chỉ đưa số và tên nhóm tệp. Không đưa nội dung hợp đồng, bảng lương hay mật khẩu."
          },
          {
            "label": "AI xếp thứ tự việc",
            "detail": "Yêu cầu nó nói rõ mỗi việc dựa vào dòng nào. Việc nào không có căn cứ trong bảng là chỗ nó đoán."
          },
          {
            "label": "Bạn kiểm và làm",
            "detail": "Đối chiếu đề xuất với bảng, làm từng việc, đầu tiên là sao lưu tệp chưa có bản nào."
          },
          {
            "label": "Ghi ngày và hẹn kiểm lại",
            "detail": "Ghi ngày đã làm, đặt lịch kiểm lại sau vài tháng."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Nên đưa cho AI",
          "text": "Số phần trăm ổ trống, tuổi máy, số ngày cập nhật chờ, tên nhóm thư mục như \"hồ sơ khách hàng\", \"báo cáo quý\" (không cần nội dung)."
        },
        "right": {
          "label": "Không đưa cho AI",
          "text": "Nội dung hợp đồng, bảng lương, số liệu chưa công bố, mật khẩu, mã xác nhận, ảnh chụp màn hình có thông tin khách hàng."
        }
      },
      {
        "type": "heading",
        "text": "Đọc đề xuất của AI có phê phán"
      },
      {
        "type": "paragraph",
        "text": "AI sẽ trả lời rất trôi chảy, kể cả khi nó đoán. Với mỗi đề xuất, hỏi một câu: dựa vào dòng nào của bảng tôi đưa? Nếu đề xuất \"mua máy mới\" mà bảng chỉ ghi máy 2 năm và ổ trống 40%, thì nó không có căn cứ."
      },
      {
        "type": "callout",
        "label": "Thứ tự an toàn",
        "text": "Sao lưu trước, cập nhật sau, dọn dẹp sau cùng. Cả cập nhật và dọn dẹp đều có rủi ro nhỏ ảnh hưởng tới tệp: làm khi đã có bản sao thì nếu sai vẫn lấy lại được."
      },
      {
        "type": "scenario",
        "title": "Bạn có trang bảng kiểm, AI đưa danh sách việc",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bảng kiểm của bạn: ổ trống 11%, máy 4 năm, thư mục \"Hồ sơ khách\" chỉ có trên máy, cập nhật chờ 10 ngày. AI trả lời: \"1) Mua máy mới. 2) Cài cập nhật. 3) Dọn ổ. 4) Sao lưu.\"",
            "choices": [
              {
                "label": "Làm theo đúng thứ tự AI đưa, bắt đầu bằng việc mua máy mới",
                "next": "bad_buy"
              },
              {
                "label": "Hỏi AI mỗi việc dựa vào dòng nào trong bảng rồi sắp lại theo rủi ro",
                "next": "s2"
              }
            ]
          },
          "bad_buy": {
            "text": "Bạn xin ngân sách mua máy mới, nhưng chuyển dữ liệu sang máy mới lại cần bản sao, và thư mục \"Hồ sơ khách\" vẫn chưa có bản nào. Một tuần sau ổ cứng máy cũ lỗi trước khi bạn kịp chuyển.",
            "ending": "bad"
          },
          "s2": {
            "text": "AI xin lỗi và sắp lại: sao lưu \"Hồ sơ khách\" trước, rồi cập nhật, rồi dọn ổ; mua máy thì chờ ý kiến IT. Bạn bắt đầu làm.",
            "choices": [
              {
                "label": "Chép \"Hồ sơ khách\" lên kho chung, mở thử vài tệp, rồi mới cập nhật và dọn ổ",
                "next": "good"
              },
              {
                "label": "Dọn ổ trước cho nhẹ, vì 11% trống thấy nguy hiểm nhất",
                "next": "bad_clean"
              }
            ]
          },
          "bad_clean": {
            "text": "Trong lúc dọn vội, bạn xoá nhầm hai tệp trong thư mục \"Hồ sơ khách\" vì tên giống tệp tạm. Không có bản nào khác để khôi phục.",
            "ending": "bad"
          },
          "good": {
            "text": "Hồ sơ đã có bản ở kho chung và mở thử được. Sau đó bạn cập nhật, dọn ổ lên 30% trống, ghi ngày vào trang ghi chép và hẹn kiểm lại sau 3 tháng.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Một trang ghi chép và một việc đứng đầu: sao lưu tệp chưa có bản nào.",
          "Bài sau: sang Chặng mạng, vì sao Wi-Fi chậm không phải lúc nào cũng do máy bạn."
        ]
      }
    ]
  }
];
