import type { Lesson } from "../lesson-types";

// Chặng 57, bài 16-20. Giáo trình: scripts/curriculum/stage-57.json.
export const S57_D_LESSONS: Lesson[] = [
  {
    "id": 2555,
    "slug": "nhoi-nguoi-dung-that-thu-mot-cong-cu-trong-mot-buoi",
    "title": "Chặng 57, Bài 16: Nhờ một đồng nghiệp thử công cụ mà bạn không được chỉ dẫn",
    "subtitle": "Người làm ra công cụ là người tệ nhất để thử nó: đầu họ đã chứa sẵn câu trả lời.",
    "duration": "8 phút",
    "difficulty": "Trung bình",
    "emoji": "👀",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Công cụ nhỏ của bạn chạy mượt khi chính bạn bấm, vì bạn biết phải bấm gì trước. Đồng nghiệp thì không biết. Một buổi quan sát mười lăm phút cho thấy những chỗ kẹt mà bạn không bao giờ tự nhìn ra, trước khi cả phòng gặp chúng vào đúng ngày cần gấp.",
    "openingQuestion": "Bạn vừa làm xong bảng theo dõi đơn hàng và nhờ chị Hà ở phòng bên thử. Chị cầm máy, nhìn một lúc rồi hỏi: \"Giờ chị bấm vào đâu?\" Bạn nên làm gì?",
    "openingOptions": [
      "Im lặng, ghi lại chỗ chị kẹt và chị định bấm gì",
      "Chỉ ngay chỗ cần bấm để chị đỡ mất thời gian chờ",
      "Giải thích từng ô trong bảng trước rồi mới cho chị thử",
      "Nhắc chị đọc hướng dẫn bạn đã gửi qua email hôm qua"
    ],
    "correctOption": 0,
    "explanation": "Điều bạn cần học là chỗ nào người lạ không tự hiểu được. Nếu bạn chỉ tay hay giải thích, bạn vừa vá chỗ kẹt bằng lời nói và mất luôn bằng chứng rằng công cụ có vấn đề. Ngày chị Hà dùng thật, bạn không đứng cạnh để chỉ. Còn nhắc đọc hướng dẫn thì cũng che mất câu hỏi quan trọng: công cụ có tự nói rõ cách dùng không. Ngồi im, nhìn, ghi lại câu chị nói thành tiếng và chỗ tay chị chần chừ.",
    "diagram": [
      {
        "label": "Chọn một việc cụ thể cho người thử",
        "arrow": true
      },
      {
        "label": "Đưa công cụ, không hướng dẫn, không gợi ý",
        "arrow": true
      },
      {
        "label": "Quan sát và ghi chỗ họ kẹt",
        "arrow": true
      },
      {
        "label": "Sau đó mới hỏi, rồi sửa"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Anh Quân ở phòng kế hoạch làm một biểu mẫu xin mượn phòng họp, tự thử thấy rất gọn. Anh nhờ cô Mai mới vào làm thử mà không nói gì. Cô dừng ở ô \"Mã đơn vị\" gần một phút vì không biết mã của mình là gì. Anh chưa bao giờ nghĩ ô đó khó, vì anh thuộc lòng mã từ lâu."
    },
    "quiz": [
      {
        "question": "Vì sao chính bạn, người làm ra công cụ, không thể tự thử để tìm chỗ khó dùng?",
        "options": [
          "Bạn đã biết sẵn cách dùng, nên không còn thấy chỗ nào khó",
          "Vì tự thử thì không có ai góp ý lại",
          "Vì tự thử chỉ hợp với công cụ lớn, công cụ nhỏ của cá nhân thì khỏi cần",
          "Vì máy của bạn chạy khác với máy của đồng nghiệp nên kết quả sẽ không khớp"
        ],
        "correct": 0,
        "explanation": "Vấn đề không phải thái độ hay cấu hình máy mà là kiến thức ngầm: bạn biết mã đơn vị của mình, biết ô nào nhập trước. Kiến thức đó làm chỗ khó biến mất khỏi tầm nhìn. Công cụ nhỏ càng cần người lạ thử vì không ai khác nhìn qua nó trước."
      },
      {
        "question": "Trong lúc quan sát người thử, việc nào đúng?",
        "options": [
          "Ngồi lệch một bên, im lặng và ghi lại",
          "Ngồi sát cạnh, hễ thấy họ bấm sai là nhắc ngay để khỏi mất thời gian",
          "Đứng sau lưng, giải thích vì sao từng nút được thiết kế như vậy",
          "Rời phòng đi làm việc khác và quay lại hỏi kết quả sau một tiếng"
        ],
        "correct": 0,
        "explanation": "Bạn cần thấy hành vi thật chứ không phải hành vi sau khi được gợi ý. Nhắc ngay hay giải thích đều làm người thử đổi cách làm. Bỏ đi hẳn thì bạn mất đúng thứ cần quan sát: họ dừng ở đâu và nhíu mày ở chỗ nào."
      },
      {
        "question": "Nên đưa cho người thử việc nào?",
        "options": [
          "Một việc có thật, ví dụ nhập đơn hàng của hôm nay và xem tổng",
          "\"Anh cứ bấm thử xem thế nào rồi cho ý kiến\"",
          "Đọc cả bảng rồi chấm điểm giao diện từ 1 đến 10",
          "\"Anh xem có chỗ nào chưa ổn thì nói nhé\" sau khi xem qua"
        ],
        "correct": 0,
        "explanation": "Người thử cần một mục tiêu để biết mình thành công hay kẹt. Bấm thử cho có thì chẳng ai kẹt thật, và họ chỉ trả lời xã giao. Một điểm số từ 1 đến 10 cũng không chỉ ra chỗ nào sai. Việc có thật cho phép bạn đếm: làm xong chưa, mất bao lâu, kẹt ở bước nào."
      },
      {
        "question": "Cần mấy người thử để thấy phần lớn chỗ kẹt lớn của một công cụ nhỏ?",
        "options": [
          "Khoảng ba đến năm người, mỗi người thử riêng",
          "Một người là đủ cho cả phòng",
          "Ít nhất ba mươi người, nếu không thì số liệu chưa đáng tin",
          "Càng đông càng tốt, nên mời cả phòng thử cùng lúc trong một buổi họp"
        ],
        "correct": 0,
        "explanation": "Chỗ kẹt lớn thường lặp lại ở người thứ hai, thứ ba, nên ít người cũng đủ thấy. Một người thì có thể là tật riêng. Ba mươi người là quá tay với công cụ nhỏ, và thử chung cả phòng thì người này bắt chước người kia nên mất tín hiệu độc lập."
      },
      {
        "question": "Người thử nói \"để em xem... à, chắc là ô này\" rồi bấm nhầm. Điều đó nghĩa là gì?",
        "options": [
          "Nhãn hay vị trí ô đó mơ hồ, đáng ghi vào danh sách sửa",
          "Người thử chưa tập trung nên bỏ qua, vì lỗi thuộc về họ chứ không phải công cụ",
          "Công cụ đã tốt vì họ tự làm xong",
          "Phải đào tạo lại người thử cách đọc bảng trước khi cho thử lần nữa"
        ],
        "correct": 0,
        "explanation": "Khi người thử đoán và đoán sai, tức là công cụ không tự nói rõ điều cần làm. Đổ cho người thử là đúng thói quen làm ra công cụ khó dùng. Làm xong nhưng sau hai lần đoán vẫn là một chỗ kẹt, vì ngày gấp sẽ không ai có thì giờ đoán."
      }
    ],
    "keyTakeaways": [
      "Người làm ra công cụ không thể tự thử để thấy chỗ khó dùng.",
      "Đưa một việc có thật, không hướng dẫn, không gợi ý.",
      "Ngồi lệch một bên, im lặng và ghi chỗ họ kẹt.",
      "Ba đến năm người, mỗi người thử riêng, là đủ cho công cụ nhỏ.",
      "Chỗ người thử phải đoán là chỗ cần sửa, dù họ vẫn làm xong."
    ],
    "practicePrompt": {
      "question": "Người thử dừng ba mươi giây ở nút \"Chốt\" rồi hỏi bạn: \"Bấm vào đây thì nó gửi luôn hay chỉ lưu?\" Bạn ghi lại gì?",
      "options": [
        "Nút \"Chốt\" không nói rõ nó gửi đi hay chỉ lưu nháp",
        "Người thử chưa đọc kỹ nút, cần nhắc họ chú ý hơn khi bấm vào nút",
        "Công cụ ổn vì người thử đã tự hiểu sau ba mươi giây",
        "Không ghi gì, vì đây chỉ là câu hỏi nhỏ chứ không phải lỗi"
      ],
      "correct": 0,
      "explanation": "Sự chần chừ và câu hỏi đều là bằng chứng cho một chỗ nhãn nút mơ hồ, và nhãn nút sai có hậu quả thật: gửi nhầm hoặc tưởng đã gửi mà chưa. Đổ cho người thử hay coi là việc nhỏ đều làm mất chỗ kẹt."
    },
    "summary": {
      "keyIdea": "Bạn không thấy được chỗ khó của chính công cụ mình; người lạ cho bạn thấy trong mười lăm phút.",
      "formula": "Một việc thật + không gợi ý + ngồi im ghi lại = ba chỗ kẹt đáng sửa.",
      "commonMistake": "Chỉ tay giúp ngay khi người thử kẹt, rồi tưởng công cụ dễ dùng.",
      "action": "Chọn một người chưa từng thấy công cụ và hẹn mười lăm phút."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn một công cụ nhỏ bạn đã làm (biểu mẫu, bảng hay máy tính đơn giản). Mời một đồng nghiệp chưa thấy nó thử một việc thật, không hướng dẫn. Ghi lại đúng ba chỗ họ dừng hoặc hỏi, cùng câu họ nói thành tiếng.",
      "secondary": "Mai bạn sẽ được hỏi: ba chỗ kẹt đó là gì, và bạn đã nhịn không chỉ tay được chưa?"
    },
    "sections": [
      {
        "type": "lead",
        "text": "Sáng thứ Hai, bạn gửi link bảng theo dõi mới cho cả phòng. Đến trưa có ba người nhắn hỏi cùng một câu: \"Nhập ở đâu ạ?\" Bài này cho bạn cách biết trước những câu hỏi đó, bằng một buổi quan sát ngắn."
      },
      {
        "type": "feynman",
        "title": "Thử công cụ với người lạ đơn giản hơn bạn nghĩ",
        "intro": "Hình dung bạn làm một tấm biển chỉ đường trong toà nhà của mình. Bạn biết rõ lối đi nên thấy biển nào cũng rõ. Muốn biết biển có dùng được không, hãy nhờ người mới đến đi theo nó.",
        "columns": [
          "Thành phần",
          "Ví dụ đời thường",
          "Trong việc của bạn"
        ],
        "rows": [
          [
            "Người làm",
            "Người làm biển, thuộc hết lối đi",
            "Bạn, người làm công cụ, thuộc từng ô"
          ],
          [
            "Người thử",
            "Khách lần đầu đến toà nhà",
            "Đồng nghiệp chưa từng thấy công cụ"
          ],
          [
            "Chỗ kẹt",
            "Khách đứng lại ở ngã ba",
            "Người thử dừng hoặc hỏi"
          ],
          [
            "Việc của bạn",
            "Đứng xa nhìn, không chỉ đường",
            "Ngồi im ghi chép, không gợi ý"
          ]
        ],
        "oneLiner": "Nếu khách phải hỏi đường thì tấm biển chưa đủ tốt: công cụ cũng vậy."
      },
      {
        "type": "heading",
        "text": "Vấn đề: bạn biết quá nhiều"
      },
      {
        "type": "paragraph",
        "text": "Khi làm xong một biểu mẫu, bạn biết ô nào nhập trước, mã đơn vị của mình là gì, nút nào phải bấm sau cùng. Kiến thức đó làm bạn không còn nhìn thấy chỗ khó. Người thử lần đầu thì ngược lại: mọi thứ đều mới và chỗ mơ hồ hiện ra ngay."
      },
      {
        "type": "flow",
        "title": "Một buổi thử mười lăm phút",
        "steps": [
          {
            "label": "Chọn việc thật",
            "detail": "Một việc người thử làm thật trong tuần, ví dụ nhập đơn hàng của hôm nay. Không phải câu hỏi chung chung \"xem thử đi\"."
          },
          {
            "label": "Đưa công cụ, im lặng",
            "detail": "Nói một câu giao việc rồi thôi. Không giới thiệu công cụ, không nói chỗ nào nên bấm."
          },
          {
            "label": "Quan sát và ghi",
            "detail": "Ghi lại chỗ tay họ dừng, chỗ họ nhíu mày, câu họ nói thành tiếng như \"chắc là ô này\"."
          },
          {
            "label": "Hỏi sau cùng",
            "detail": "Khi họ xong, hỏi: chỗ nào làm bạn lúng túng? Bạn mong đợi gì khi bấm nút đó?"
          },
          {
            "label": "Gom ba chỗ kẹt",
            "detail": "Chọn ba chỗ lặp lại hoặc nặng nhất. Bài sau sẽ xếp chúng thành danh sách việc sửa."
          }
        ]
      },
      {
        "type": "list",
        "items": [
          "Chọn một người chưa từng thấy công cụ, tốt nhất là người sẽ dùng thật.",
          "Đưa một việc có thật, không dùng chữ \"thử\" chung chung.",
          "Ngồi lệch bên cạnh; nếu bị hỏi, nói \"anh cứ làm như bình thường\".",
          "Ghi từng lần dừng quá vài giây và từng lời than nhỏ."
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Buổi thử có ích",
          "text": "Một việc cụ thể. Người thử làm một mình. Bạn im lặng và ghi. Hỏi \"bạn đã mong đợi gì\" sau khi làm xong."
        },
        "right": {
          "label": "Buổi thử vô ích",
          "text": "\"Anh xem cho ý kiến nhé.\" Bạn đứng sau lưng giải thích từng ô. Kết thúc bằng \"ổn chứ?\" và người thử gật đầu cho xong."
        }
      },
      {
        "type": "scenario",
        "title": "Buổi thử đầu tiên với chị Hà",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Chị Hà mở bảng theo dõi đơn hàng và dừng ở ô \"Trạng thái\" gần một phút. Chị hỏi nhỏ: \"Chỗ này chọn gì hả em?\" Bạn thấy rõ phải chọn \"Đang giao\".",
            "choices": [
              {
                "label": "Nói luôn \"chị chọn Đang giao\" cho chị khỏi mất thời gian",
                "next": "bad_help"
              },
              {
                "label": "Nói \"chị cứ làm như bình thường\" và ghi lại chỗ chị dừng",
                "next": "s2"
              }
            ]
          },
          "bad_help": {
            "text": "Chị Hà làm xong nhanh và khen bảng dễ dùng. Bạn không biết rằng nhãn \"Trạng thái\" thiếu gợi ý. Tuần sau ba người dùng thật chọn sai trạng thái và số liệu giao hàng lệch cả tuần.",
            "ending": "bad"
          },
          "s2": {
            "text": "Chị chọn đại một giá trị rồi tiếp tục. Chị nói: \"Chắc cũng không quan trọng.\" Sau khi xong, chị hỏi: \"Cột cuối để làm gì?\"",
            "choices": [
              {
                "label": "Ghi lại: chị chọn đại ở ô Trạng thái và không hiểu cột cuối",
                "next": "s3"
              },
              {
                "label": "Giải thích ngay cột cuối là tổng tiền, rồi bỏ qua việc chị chọn đại",
                "next": "bad_skip"
              }
            ]
          },
          "bad_skip": {
            "text": "Chị Hà gật đầu, bạn thấy mọi thứ ổn. Nhưng chỗ chọn đại ở ô Trạng thái vẫn còn nguyên, và nó mới là chỗ gây sai số thật.",
            "ending": "bad"
          },
          "s3": {
            "text": "Sau buổi thử, bạn hỏi: \"Chị đã mong đợi gì ở ô Trạng thái?\" Chị nói: \"Chị tưởng nó tự điền.\"",
            "choices": [
              {
                "label": "Thêm gợi ý dưới ô và thử lại với người thứ hai",
                "next": "good"
              },
              {
                "label": "Cho rằng chị Hà làm không cẩn thận nên không cần sửa gì",
                "next": "bad_blame"
              }
            ]
          },
          "bad_blame": {
            "text": "Bạn giữ nguyên bảng. Hai tuần sau người thứ hai, rồi người thứ ba cũng tưởng ô đó tự điền. Đến lúc ấy cả phòng đã nhập sai một nhóm đơn hàng.",
            "ending": "bad"
          },
          "good": {
            "text": "Bạn có đúng ba chỗ kẹt: ô Trạng thái, cột cuối, nút Lưu. Bạn sửa nhãn rồi nhờ người thứ hai thử. Lần này chị Mai làm không hỏi câu nào.",
            "ending": "good"
          }
        }
      },
      {
        "type": "callout",
        "label": "Nhịn không chỉ tay",
        "text": "Khó nhất của buổi thử là nhịn. Mỗi lần bạn giúp, bạn vừa xoá một chỗ kẹt khỏi sổ ghi chép, nhưng chỗ kẹt đó vẫn chờ người dùng thật vào ngày bạn không có mặt."
      },
      {
        "type": "closing",
        "lines": [
          "Người lạ thấy chỗ kẹt mà bạn không thấy.",
          "Bài sau: biến những lời nhận xét lộn xộn thành danh sách việc sửa."
        ]
      }
    ]
  },
  {
    "id": 2556,
    "slug": "gom-phan-hoi-cua-nguoi-thu-thanh-danh-sach-viec-sua",
    "title": "Chặng 57, Bài 17: Biến phản hồi lộn xộn của người thử thành danh sách việc sửa",
    "subtitle": "Mười lời nhận xét chưa phải mười việc phải làm. Việc của bạn là phân loại, không phải chiều theo tất cả.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "🗂️",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Sau buổi thử, bạn có một nắm ghi chú lộn xộn: lỗi thật, sở thích riêng, ý tưởng mới, lời than. Sửa theo thứ tự ghi chép thì tuần sau bạn vẫn bận với chỗ trang trí trong khi chỗ gây sai đơn hàng còn nguyên. Phân loại một lần tiết kiệm được nhiều ngày sửa nhầm chỗ.",
    "openingQuestion": "Bốn người thử để lại mười nhận xét. Một người muốn đổi màu nút, hai người bấm nhầm Gửi thay cho Lưu nháp, một người muốn thêm biểu đồ. Bạn nên sửa gì đầu tiên?",
    "openingOptions": [
      "Nút Gửi và Lưu nháp, vì hai người bấm nhầm và gây hậu quả thật",
      "Màu nút, vì sửa nhanh nhất và người thử thấy ngay thay đổi",
      "Biểu đồ, vì nó làm công cụ trông chuyên nghiệp hơn hẳn",
      "Đổi hết theo thứ tự ghi chép để công bằng với mọi nhận xét ấy nhé"
    ],
    "correctOption": 0,
    "explanation": "Nhận xét được xếp theo hai câu hỏi: nó có làm người dùng không hoàn tất hoặc làm sai việc không, và có bao nhiêu người gặp. Bấm nhầm Gửi/Lưu nháp thoả cả hai. Màu nút là sở thích của một người và biểu đồ là tính năng mới, chưa ai kẹt vì thiếu nó. Sửa theo thứ tự ghi chép thì coi lời than và lỗi thật ngang nhau, nên lỗi gây hại vẫn nằm đó.",
    "diagram": [
      {
        "label": "Chép lại nguyên văn từng nhận xét",
        "arrow": true
      },
      {
        "label": "Hỏi: có chặn việc không, mấy người gặp",
        "arrow": true
      },
      {
        "label": "Xếp: sửa ngay, sửa sau, không sửa",
        "arrow": true
      },
      {
        "label": "Chỉ sửa nhóm đầu, rồi thử lại"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Chị Thu làm một bảng xin mua văn phòng phẩm cho phòng mười lăm người. Sau buổi thử, chị có tám nhận xét. Ba người không biết đơn đã gửi chưa, một người muốn hình nền, một muốn thêm cột \"mã kho\". Chị sửa thông báo sau khi gửi trước, để hai việc kia sang tuần sau, và phòng không hỏi lại câu nào."
    },
    "quiz": [
      {
        "question": "Nhận xét nào nên xếp vào nhóm \"sửa ngay\"?",
        "options": [
          "Nhận xét khiến người thử không hoàn tất được việc hoặc làm sai",
          "Nhận xét đến từ người có chức vụ cao nhất, vì họ hiểu công việc rõ hơn cả",
          "Nhận xét nghe hay nhất, vì có thể dùng khoe với sếp về sau",
          "Nhận xét dễ làm nhất, vì cuối ngày mới thấy tiến độ rõ ràng"
        ],
        "correct": 0,
        "explanation": "Tiêu chí là tác hại lên việc của người dùng, chứ không phải ai nói, nghe hay hay dễ làm. Chức vụ cao không biến sở thích thành lỗi, và chọn việc dễ trước là cách tự lừa tiến độ trong khi lỗi chặn việc còn nguyên."
      },
      {
        "question": "Ba người đều nói \"ô ngày khó hiểu\" bằng ba cách khác nhau. Nên ghi thế nào?",
        "options": [
          "Gộp thành một việc và ghi số người gặp",
          "Ghi ba việc riêng, mỗi cách nói là một việc",
          "Chỉ giữ lời của người nói rõ nhất, bỏ hai người còn lại vì trùng",
          "Bỏ hết, vì mỗi người nói một kiểu thì chưa chắc là cùng vấn đề"
        ],
        "correct": 0,
        "explanation": "Nhiều người gặp cùng một chỗ là tín hiệu mạnh nhất, nên gộp và ghi số người. Ba việc riêng làm danh sách phình ra mà không thêm thông tin. Bỏ hai người mất luôn tín hiệu số đông, và bỏ phiếu cả phòng là chuyển việc phân loại cho người chưa từng thấy vấn đề."
      },
      {
        "question": "Người thử đề nghị: \"Thêm một biểu đồ doanh thu cho đẹp.\" Bạn xếp vào đâu?",
        "options": [
          "Sửa sau hoặc không sửa, vì chưa ai bị kẹt vì thiếu nó",
          "Sửa ngay, vì biểu đồ giúp người dùng hiểu số liệu nhanh hơn",
          "Sửa ngay, vì thêm tính năng mới là cách giữ người thử hài lòng",
          "Xếp vào nhóm lỗi, vì thiếu biểu đồ là thiếu sót của công cụ"
        ],
        "correct": 0,
        "explanation": "Tính năng mới xuất phát từ ý muốn, không phải từ việc bị chặn. Công cụ nhỏ có một việc và nên làm tốt việc đó. Nếu nhiều người hỏi lại biểu đồ sau vài tuần dùng thật, lúc đó mới nâng nhóm."
      },
      {
        "question": "Nhờ AI phân loại 10 nhận xét. Vì sao phải dặn \"không được thêm nhận xét ngoài danh sách\"?",
        "options": [
          "AI hay tự thêm những ý nghe hợp lý mà không ai từng nói",
          "Để AI trả lời ngắn và tiết kiệm lượt dùng mỗi ngày",
          "Để AI không tìm thấy lỗi gì mới mà bạn chưa thấy ở công cụ",
          "Vì AI luôn tính sai số lượng nhận xét nếu không bị giới hạn"
        ],
        "correct": 0,
        "explanation": "Khi thiếu ràng buộc, AI có xu hướng bổ sung \"gợi ý thêm\" nghe hợp lý, và bạn có thể tưởng đó là phản hồi thật. Dặn giới hạn giữ danh sách bám vào bằng chứng bạn có. Nó không liên quan tới độ dài hay việc đếm."
      },
      {
        "question": "Sau khi sửa ba việc \"sửa ngay\", bước tiếp theo nên là gì?",
        "options": [
          "Nhờ một người thử mới làm lại việc đó để xem chỗ kẹt đã hết chưa",
          "Gửi công cụ cho cả phòng và chờ phản hồi qua email",
          "Tiếp tục sửa luôn nhóm \"sửa sau\" vì đang có đà làm",
          "Hỏi chính những người đã thử lần trước rằng họ đã hài lòng chưa, để có thêm đánh giá"
        ],
        "correct": 0,
        "explanation": "Bạn chỉ biết bản sửa có hiệu quả khi người chưa thấy lỗi cũ thử lại. Gửi cả phòng là biến người dùng thật thành người thử. Người thử cũ đã biết chỗ sửa, và nhóm sửa sau vẫn là thứ chưa có bằng chứng đáng làm."
      }
    ],
    "keyTakeaways": [
      "Nhận xét thô chưa phải việc phải làm; phải phân loại trước.",
      "Hai câu hỏi xếp nhóm: có chặn việc không, mấy người gặp.",
      "Ba nhóm: sửa ngay, sửa sau, không sửa.",
      "Gộp các nhận xét nói cùng một chỗ và ghi số người.",
      "Sửa xong thì nhờ người mới thử lại, không hỏi người cũ."
    ],
    "practicePrompt": {
      "question": "Bạn có nhận xét: \"Thêm nút in ra giấy\" (1 người), \"Ô mã đơn vị không ghi ví dụ\" (3 người kẹt), \"Đổi phông chữ\" (1 người). Thứ tự sửa hợp lý?",
      "options": [
        "Ô mã đơn vị, rồi nút in khi có thêm người hỏi, phông chữ thì bỏ",
        "Phông chữ trước vì sửa nhanh, rồi nút in, cuối cùng mới tới ô mã",
        "Nút in trước vì tính năng mới, ô mã đơn vị làm khi rảnh",
        "Làm cả ba cùng lúc trong một buổi để khỏi phải xếp thứ tự"
      ],
      "correct": 0,
      "explanation": "Ô mã đơn vị làm ba người kẹt nên sửa ngay. Nút in là ý muốn của một người, chờ thêm bằng chứng. Phông chữ là sở thích. Làm sửa nhanh trước hoặc làm tất cả cùng lúc đều bỏ qua việc xếp theo tác hại."
    },
    "summary": {
      "keyIdea": "Phản hồi là nguyên liệu; danh sách việc sửa là thứ bạn nấu ra từ nó.",
      "formula": "Nhận xét → gộp theo chỗ → hỏi chặn việc? mấy người? → sửa ngay / sau / không.",
      "commonMistake": "Sửa theo thứ tự ghi chép hoặc theo người nói to nhất.",
      "action": "Xếp mười nhận xét của bạn vào ba nhóm và chỉ làm nhóm đầu."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Lấy ghi chú từ một buổi thử (hoặc viết 8-10 nhận xét giả định về một công cụ của bạn). Xếp vào ba cột: sửa ngay, sửa sau, không sửa, mỗi dòng một lý do ngắn. Chỉ chọn tối đa ba việc \"sửa ngay\" cho tuần này.",
      "secondary": "Mai bạn sẽ được hỏi: ba việc sửa ngay là gì và có nhận xét nào bạn định bỏ không?"
    },
    "sections": [
      {
        "type": "lead",
        "text": "Buổi thử kết thúc, bạn cầm mười dòng ghi chú: lỗi, sở thích, ý tưởng và cả một lời than. Nếu sửa hết thì mất cả tháng, và phần lớn chẳng ai cần. Bài này dạy cách chọn."
      },
      {
        "type": "feynman",
        "title": "Gom phản hồi thành việc sửa đơn giản hơn bạn nghĩ",
        "intro": "Hình dung bác sĩ phòng khám nghe bệnh nhân kể một loạt triệu chứng. Bác sĩ không chữa theo thứ tự bệnh nhân kể, mà hỏi: triệu chứng nào nguy hiểm, triệu chứng nào nhiều người cùng bị.",
        "columns": [
          "Thành phần",
          "Ví dụ đời thường",
          "Trong việc của bạn"
        ],
        "rows": [
          [
            "Đầu vào",
            "Bệnh nhân kể lộn xộn",
            "Mười nhận xét thô của người thử"
          ],
          [
            "Câu hỏi chính",
            "Có nguy hiểm không?",
            "Có chặn người dùng làm xong việc không?"
          ],
          [
            "Tín hiệu mạnh",
            "Nhiều bệnh nhân cùng triệu chứng",
            "Nhiều người thử cùng kẹt một chỗ"
          ],
          [
            "Kết quả",
            "Chữa ngay / theo dõi / không cần chữa",
            "Sửa ngay / sửa sau / không sửa"
          ]
        ],
        "oneLiner": "Không phải lời nào cũng là bệnh: việc của bạn là xếp chúng theo mức nặng."
      },
      {
        "type": "heading",
        "text": "Vấn đề: mọi nhận xét nghe đều hợp lý"
      },
      {
        "type": "paragraph",
        "text": "Đọc từng nhận xét, cái nào cũng có lý. Nhưng công cụ nhỏ của bạn có một việc để làm, và bạn có vài giờ mỗi tuần. Phân loại là cách bảo vệ thời gian đó, để chỗ chặn việc được sửa trước chỗ chỉ làm đẹp."
      },
      {
        "type": "flow",
        "title": "Từ mười nhận xét đến ba việc sửa",
        "steps": [
          {
            "label": "Chép nguyên văn",
            "detail": "Ghi từng nhận xét đúng lời người thử, kèm tên người nói và lúc họ nói. Đừng diễn giải ngay."
          },
          {
            "label": "Gộp theo chỗ",
            "detail": "Những nhận xét nói cùng một chỗ trong công cụ thì gộp lại và ghi số người."
          },
          {
            "label": "Hỏi hai câu",
            "detail": "Có chặn người dùng làm xong việc hoặc làm sai không? Có bao nhiêu người gặp?"
          },
          {
            "label": "Xếp ba nhóm",
            "detail": "Sửa ngay (chặn việc hoặc nhiều người), sửa sau (khó chịu nhưng vẫn làm được), không sửa (sở thích riêng)."
          },
          {
            "label": "Chọn tối đa ba",
            "detail": "Chọn ba việc của nhóm đầu cho tuần này, rồi nhờ người mới thử lại."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Sửa ngay",
          "text": "Người thử không xong việc, hoặc làm sai mà không biết. Có từ hai người trở lên gặp. Ví dụ: nút Gửi và Lưu nháp sát nhau."
        },
        "right": {
          "label": "Không sửa",
          "text": "Sở thích của một người, không ai bị chặn. Tính năng mới chưa ai cần. Ví dụ: hình nền, đổi phông chữ."
        }
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI xếp nhóm mười nhận xét thô",
        "task": "Bạn có mười nhận xét thô về biểu mẫu xin nghỉ phép từ bốn người thử. Lắp một prompt để AI xếp chúng thành ba nhóm.",
        "parts": [
          {
            "id": "ctx",
            "label": "Bối cảnh",
            "options": [
              {
                "text": "Đây là nhận xét của người thử, hãy sắp xếp giúp tôi.",
                "feedback": "AI không biết công cụ là gì và ai dùng; nó sẽ xếp theo cảm giác chung chung."
              },
              {
                "text": "Công cụ là biểu mẫu xin nghỉ phép cho cả phòng 20 người, dùng mỗi tuần vài lần. Có 10 nhận xét thô từ 4 người thử.",
                "good": true,
                "feedback": "Đủ công cụ, người dùng và tần suất để AI cân nhắc mức quan trọng."
              }
            ]
          },
          {
            "id": "task",
            "label": "Việc cần làm",
            "options": [
              {
                "text": "Chia 10 nhận xét thành ba nhóm: sửa ngay, sửa sau, không sửa. Mỗi nhận xét kèm một câu lý do.",
                "good": true,
                "feedback": "Nói rõ ba nhóm và đòi lý do, nên bạn kiểm được từng quyết định."
              },
              {
                "text": "Làm cho công cụ tốt hơn theo các nhận xét này.",
                "feedback": "Mục tiêu mơ hồ: AI sẽ thêm tính năng mới mà chẳng ai xin."
              }
            ]
          },
          {
            "id": "rule",
            "label": "Nguyên tắc và giới hạn",
            "options": [
              {
                "text": "Nhận xét nào có từ hai người trở lên hoặc làm người dùng không hoàn tất việc thì xếp sửa ngay. Không được thêm nhận xét nào ngoài danh sách.",
                "good": true,
                "feedback": "Cho tiêu chí đo được và cấm bịa thêm; bạn đối chiếu được với 10 nhận xét gốc."
              },
              {
                "text": "Ưu tiên những gì quan trọng nhất.",
                "feedback": "\"Quan trọng\" với ai? AI tự chọn và có thể xếp chỗ thẩm mỹ lên trên lỗi chặn việc."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "ctx",
              "task",
              "rule"
            ],
            "text": "SỬA NGAY (3): (1) Ô \"Ngày nghỉ\" không báo lỗi khi chọn ngày đã qua - 2 người gặp, dễ gửi sai đơn. (2) Nút Gửi và Lưu nháp nằm sát nhau - 2 người bấm nhầm. (3) Không có thông báo sau khi gửi - 3 người không biết đơn đã đi chưa.\nSỬA SAU (4): đổi màu nút, thêm đếm ngược số ngày phép, ...\nKHÔNG SỬA (3): \"thêm hình nền\", \"đổi tên phòng ban\"... - chỉ 1 người nêu và không chặn việc."
          },
          {
            "requires": [
              "ctx",
              "task"
            ],
            "text": "SỬA NGAY: thêm thông báo sau khi gửi; đổi nút. SỬA SAU: đổi màu. KHÔNG SỬA: hình nền.\n(Xếp được nhưng có nhận xét không có trong danh sách của bạn, vì thiếu nguyên tắc và giới hạn.)"
          },
          {
            "text": "Để làm công cụ tốt hơn, bạn nên: thêm hệ thống phê duyệt nhiều cấp, tích hợp lịch phòng, đổi giao diện sang chế độ tối, thêm báo cáo hằng tháng...\n(AI tự bịa thêm cả loạt tính năng không ai xin, vì nó không biết công cụ và nhận xét nào là thật.)"
          }
        ]
      },
      {
        "type": "callout",
        "label": "AI xếp nháp, bạn quyết định",
        "text": "AI có thể giúp gom và xếp nháp rất nhanh, nhưng chỉ bạn biết ai sẽ dùng công cụ và việc nào hậu quả nặng. Luôn đối chiếu danh sách AI trả về với mười nhận xét gốc, xem có nhận xét nào lạ không."
      },
      {
        "type": "scenario",
        "title": "Mười nhận xét, một tuần để sửa",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn có 10 nhận xét. Ba người kẹt cùng ở ô mã đơn vị, một người muốn đổi màu, một người muốn thêm biểu đồ. Bạn có thời gian sửa khoảng ba việc.",
            "choices": [
              {
                "label": "Sửa theo thứ tự ghi chép từ nhận xét đầu tiên",
                "next": "bad_order"
              },
              {
                "label": "Gộp, đếm số người kẹt và chọn ba việc chặn việc nhiều nhất",
                "next": "s2"
              }
            ]
          },
          "bad_order": {
            "text": "Nhận xét đầu là đổi màu, rồi phông chữ, rồi biểu đồ. Hết tuần, ô mã đơn vị vẫn còn nguyên và ba người dùng thật tiếp tục nhập sai.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bạn sửa ô mã đơn vị, nút Gửi và thông báo sau khi gửi. Có thêm một nhận xét của người thử số 2: \"Thêm báo cáo tháng\". Bạn thấy hợp lý.",
            "choices": [
              {
                "label": "Xếp vào sửa sau, ghi số người xin và xem xét lại sau một tháng dùng",
                "next": "good"
              },
              {
                "label": "Thêm ngay báo cáo tháng, vì người thử đã ngỏ ý rồi",
                "next": "bad_creep"
              }
            ]
          },
          "bad_creep": {
            "text": "Báo cáo tháng ngốn hết tuần tới. Người dùng thật vẫn kẹt ở những chỗ bạn chưa kịp thử lại và không ai dùng báo cáo đó.",
            "ending": "bad"
          },
          "good": {
            "text": "Bạn nhờ một người mới thử lại ba chỗ đã sửa. Cô ấy nhập đơn trong ba phút, không hỏi câu nào. Báo cáo tháng ở lại danh sách chờ.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Phân loại phản hồi trước, sửa sau.",
          "Bài sau: khi người thử khen \"ổn rồi\", ta nên nghe gì."
        ]
      }
    ]
  },
  {
    "id": 2557,
    "slug": "dung-tin-loi-khen-cua-nguoi-thu-sai-cach",
    "title": "Chặng 57, Bài 18: Người thử khen 'ổn rồi' có nghĩa là gì: đọc phản hồi cho đúng",
    "subtitle": "Lời khen lịch sự là phản hồi dễ nghe nhất và ít thông tin nhất.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "🙂",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Đồng nghiệp hiếm khi nói thẳng \"công cụ của bạn khó dùng\". Họ nói \"ổn rồi\", \"cũng được\", rồi về và không dùng. Nếu bạn tin lời khen, bạn sẽ bàn giao một công cụ không ai mở. Đọc phản hồi theo hành vi thay vì theo lời nói là kỹ năng đáng học sớm.",
    "openingQuestion": "Sau buổi thử, anh Tùng nói: \"Ổn rồi em, dùng được.\" Nhưng bạn ghi lại là anh dừng hai lần và hỏi bạn một câu. Bạn tin gì?",
    "openingOptions": [
      "Hai lần dừng và câu hỏi, vì hành vi nói nhiều hơn lời khen",
      "Lời \"ổn rồi\", vì người thử tự nói ra là thông tin trực tiếp nhất",
      "Không tin gì cả, vì ý kiến của một người không đáng để tính",
      "Chỉ tin nếu anh Tùng nói lại lời khen đó bằng văn bản gửi lại"
    ],
    "correctOption": 0,
    "explanation": "Lời nói của người thử bị nhiễu bởi phép lịch sự: họ muốn bạn vui, ngại chê sản phẩm của đồng nghiệp. Hành vi thì ít bị lọc hơn: dừng, hỏi, bấm nhầm. Bỏ hết ý kiến một người là vứt dữ liệu, còn đòi văn bản không làm lời khen thật hơn. Cách tốt là đặt lời nói cạnh hành vi, và tin chỗ hai thứ lệch nhau.",
    "diagram": [
      {
        "label": "Ghi lời nói và hành vi riêng",
        "arrow": true
      },
      {
        "label": "Đặt cạnh nhau, tìm chỗ lệch",
        "arrow": true
      },
      {
        "label": "Hỏi câu hỏi về việc đã làm, không hỏi ý kiến",
        "arrow": true
      },
      {
        "label": "Tin hành vi hơn lời khen"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Chị Hoa nhờ ba đồng nghiệp thử bảng theo dõi khách hàng. Cả ba nói \"hay đó chị\". Hai tuần sau, chị xem lịch sử chỉnh sửa và thấy chỉ chính chị nhập dữ liệu vào bảng. Khi chị hỏi lại một cách khác: \"Tuần qua em ghi khách mới vào đâu?\", ba người đều trả lời là vẫn ghi vào sổ tay cá nhân."
    },
    "quiz": [
      {
        "question": "Vì sao phản hồi bằng lời thường ít đáng tin hơn hành vi quan sát?",
        "options": [
          "Người thử muốn lịch sự nên hay nói tốt hơn điều họ thật sự làm",
          "Vì người thử không hiểu công cụ nên ý kiến vô giá trị",
          "Vì lời nói luôn được ghi lại sai, còn hành vi thì luôn ghi đúng",
          "Vì chỉ hành vi mới được tính là dữ liệu, còn lời nói chỉ là cảm xúc"
        ],
        "correct": 0,
        "explanation": "Lời khen chịu áp lực xã giao, nhất là khi người làm công cụ là đồng nghiệp đứng ngay bên cạnh. Điều này không có nghĩa lời nói vô giá trị hay hành vi luôn đúng, mà là hai thứ cần đặt cạnh nhau để tìm chỗ lệch."
      },
      {
        "question": "Câu hỏi nào lấy được thông tin thật hơn?",
        "options": [
          "\"Lần gần nhất em ghi khách mới, em đã ghi ở đâu?\"",
          "\"Em thấy bảng này có tiện không?\"",
          "\"Bảng này có dễ dùng không, chấm em thấy mấy điểm?\"",
          "\"Em có thích bảng này không, cứ nói thật nhé?\""
        ],
        "correct": 0,
        "explanation": "Câu hỏi về một việc đã xảy ra buộc người trả lời kể lại sự thật, khó nói cho vừa lòng. Ba câu kia đều xin ý kiến, nơi lời khen lịch sự lọt vào dễ nhất, kể cả khi thêm \"nói thật nhé\"."
      },
      {
        "question": "Người thử nói \"để em xem lại sau rồi báo anh nhé\" và không bao giờ báo. Nên hiểu là gì?",
        "options": [
          "Tín hiệu yếu: họ chưa thấy công cụ đủ hữu ích để bỏ thời gian",
          "Họ đang rất bận nhưng vẫn rất hài lòng với công cụ",
          "Họ sẽ báo lại sau cùng khi đã có thời gian, chỉ cần chờ thêm một cách kiên nhẫn",
          "Công cụ đã tốt vì họ không có góp ý nào cần báo lại"
        ],
        "correct": 0,
        "explanation": "Hứa hẹn mơ hồ là một cách từ chối lịch sự. Một công cụ thật sự cần việc của họ thì họ sẽ dùng ngay, hoặc hỏi lại khi nó chưa chạy. Sự im lặng không phải lời khen."
      },
      {
        "question": "Cách nào tốt nhất để biết công cụ có được dùng thật?",
        "options": [
          "Xem ai đã dùng nó cho việc thật sau vài ngày, không chỉ trong buổi thử",
          "Hỏi người thử cuối buổi xem họ có dùng nó trong tuần không",
          "Đếm số lời khen nhận được trong buổi thử và so với lời chê",
          "Nhờ sếp thông báo cả phòng bắt buộc dùng công cụ từ tuần sau, vì như vậy ai cũng phải dùng thử"
        ],
        "correct": 0,
        "explanation": "Việc dùng sau buổi thử là bằng chứng không phụ thuộc phép lịch sự. Hỏi cuối buổi chỉ lấy lại một lời hứa. Đếm lời khen đo thái độ chứ không đo việc dùng, còn bắt buộc dùng thì che mất câu hỏi công cụ có tự đứng được không."
      },
      {
        "question": "Bạn thấy mình muốn giải thích khi người thử chê một chỗ. Điều đó cho thấy gì?",
        "options": [
          "Bạn đang nghe để bảo vệ công cụ, chứ chưa nghe để học",
          "Bạn đúng, vì người thử có thể đã hiểu sai cách dùng",
          "Công cụ thật sự không có vấn đề vì bạn thấy nó rất hợp lý",
          "Bạn cần giải thích để người thử không đưa ra nhận xét sai lệch"
        ],
        "correct": 0,
        "explanation": "Muốn giải thích là dấu hiệu quen thuộc của việc nghe để bác bỏ. Nếu người thử hiểu sai thì đó chính là chỗ công cụ chưa tự nói rõ. Ngày dùng thật, bạn không có mặt để giải thích."
      }
    ],
    "keyTakeaways": [
      "Lời khen lịch sự chứa ít thông tin nhất.",
      "Ghi lời nói và hành vi riêng, rồi tìm chỗ lệch nhau.",
      "Hỏi về việc đã làm, không hỏi ý kiến.",
      "Hứa hẹn mơ hồ không phải lời khen.",
      "Bằng chứng mạnh nhất là việc dùng thật sau buổi thử."
    ],
    "practicePrompt": {
      "question": "Ba đồng nghiệp đều nói \"bảng ổn lắm\". Một tuần sau chỉ mình bạn ghi dữ liệu vào đó. Bạn rút ra gì?",
      "options": [
        "Lời khen không có nghĩa là dùng, cần hỏi họ vướng gì khi ghi thật",
        "Bảng đã tốt, chỉ là đồng nghiệp chưa có thói quen ghi dữ liệu vào bảng",
        "Đồng nghiệp nói dối, nên không nhờ họ thử lần nào nữa",
        "Cần bắt buộc dùng bảng để thói quen hình thành dần dần"
      ],
      "correct": 0,
      "explanation": "Lời khen và việc dùng lệch nhau là tín hiệu để đi hỏi tiếp, bằng câu hỏi về việc đã làm. Coi là thói quen xấu hay bắt buộc đều che mất chỗ kẹt. Trách họ nói dối cũng sai: họ chỉ đang lịch sự."
    },
    "summary": {
      "keyIdea": "Đọc phản hồi bằng mắt và bằng việc dùng, không chỉ bằng tai.",
      "formula": "Lời nói + hành vi + việc dùng thật sau đó; tin chỗ chúng lệch nhau.",
      "commonMistake": "Nghe \"ổn rồi\", dừng thử và bàn giao.",
      "action": "Chọn một lời khen bạn từng nhận và hỏi lại bằng câu về việc đã làm."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Nghĩ tới một công cụ hoặc mẫu biểu bạn đã chia sẻ với đồng nghiệp. Hỏi hai người: \"Lần gần nhất em cần việc này, em đã làm ở đâu?\" Ghi câu trả lời nguyên văn và xem họ có dùng công cụ của bạn không.",
      "secondary": "Mai bạn sẽ được hỏi: hai người trả lời gì, và có ai dùng công cụ không?"
    },
    "sections": [
      {
        "type": "lead",
        "text": "\"Ổn rồi em, dùng được.\" Nghe xong, bạn thở phào và nghĩ mình đã xong. Hai tuần sau, không ai mở bảng. Bài này dạy cách nghe lời khen cho đúng."
      },
      {
        "type": "feynman",
        "title": "Đọc phản hồi của người thử đơn giản hơn bạn nghĩ",
        "intro": "Hình dung bạn nấu một món cho bạn bè ăn thử. Ai cũng nói \"ngon lắm\", nhưng bạn thấy đĩa của họ còn đầy một nửa. Đĩa còn đầy nói thật hơn lời khen.",
        "columns": [
          "Thành phần",
          "Ví dụ đời thường",
          "Trong việc của bạn"
        ],
        "rows": [
          [
            "Lời nói",
            "\"Ngon lắm!\"",
            "\"Ổn rồi, dùng được\""
          ],
          [
            "Hành vi",
            "Đĩa còn đầy, không xin thêm",
            "Dừng hai lần, hỏi một câu"
          ],
          [
            "Bằng chứng mạnh",
            "Lần sau có tự gọi món đó không",
            "Tuần sau có tự mở công cụ không"
          ],
          [
            "Việc của bạn",
            "Nhìn cái đĩa, đừng chỉ nghe lời",
            "Ghi hành vi bên cạnh lời nói"
          ]
        ],
        "oneLiner": "Đĩa còn đầy, bảng không ai mở: hành vi thật hơn lời khen."
      },
      {
        "type": "heading",
        "text": "Vì sao lời khen không đủ"
      },
      {
        "type": "paragraph",
        "text": "Người thử là đồng nghiệp, đứng cạnh bạn, biết bạn đã bỏ công. Chê thẳng thì ngại, nên họ nói điều dễ chịu. Đó là phép lịch sự chứ không phải nói dối. Nhưng nó làm lời khen gần như không chứa thông tin."
      },
      {
        "type": "flow",
        "title": "Đọc một buổi phản hồi cho đúng",
        "steps": [
          {
            "label": "Ghi hai cột",
            "detail": "Một cột cho lời nói, một cột cho hành vi: dừng, hỏi, bấm nhầm, bỏ qua."
          },
          {
            "label": "Tìm chỗ lệch",
            "detail": "Chỗ người thử nói \"dễ\" nhưng vừa dừng ba mươi giây là chỗ đáng tin nhất."
          },
          {
            "label": "Hỏi về việc đã làm",
            "detail": "Thay \"có tiện không\" bằng \"lần gần nhất em làm việc này, em đã làm thế nào\"."
          },
          {
            "label": "Đợi vài ngày",
            "detail": "Xem ai dùng công cụ cho việc thật sau buổi thử, không cần nhắc."
          },
          {
            "label": "Kết luận",
            "detail": "Tin chỗ lời nói và hành vi khớp nhau; điều tra chỗ chúng lệch."
          }
        ]
      },
      {
        "type": "list",
        "items": [
          "Lời khen chung chung (\"ổn\", \"hay đó\") coi như thông tin bằng không.",
          "Lời hứa mơ hồ (\"để em xem rồi báo\") là từ chối nhẹ nhàng.",
          "Câu hỏi về việc đã làm khó trả lời cho vừa lòng hơn câu hỏi ý kiến.",
          "Nhìn việc dùng sau vài ngày, không nhìn số lời khen."
        ]
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Đọc bản ghi phản hồi: chỗ nào ta đang nghe điều mình muốn nghe",
        "task": "Dưới đây là bản tóm tắt buổi thử do bạn viết vội. Bản ghi gốc: anh Tùng dừng hai lần ở ô Mã khách và hỏi một câu, nói \"ổn rồi\" lúc cuối; chị Hoa nói \"để em xem rồi báo\"; cô Mai bấm nhầm nút Lưu và Gửi. Đánh dấu những câu tóm tắt đang bóp méo bản ghi.",
        "segments": [
          {
            "text": "Anh Tùng dừng hai lần ở ô Mã khách và hỏi một câu về ô đó."
          },
          {
            "text": "Anh Tùng thấy công cụ rất dễ dùng, không có vấn đề gì.",
            "error": "Bản ghi chỉ có \"ổn rồi\" lúc cuối, và anh dừng hai lần. Câu tóm tắt lấy lời khen và bỏ hành vi."
          },
          {
            "text": "Chị Hoa nói sẽ xem lại rồi báo."
          },
          {
            "text": "Chị Hoa đã đồng ý dùng công cụ trong tuần sau.",
            "error": "Chị chỉ nói \"để em xem rồi báo\", một lời hẹn mơ hồ chứ không phải đồng ý dùng. Đây là chỗ ta nghe điều mình muốn nghe."
          },
          {
            "text": "Cô Mai bấm nhầm giữa nút Lưu và Gửi."
          },
          {
            "text": "Ba người thử đều hài lòng và công cụ sẵn sàng bàn giao.",
            "error": "Không có bản ghi nào nói ba người hài lòng: chỉ một người nói \"ổn\", một người hẹn mơ hồ, một người bấm nhầm. Kết luận \"sẵn sàng bàn giao\" không có bằng chứng."
          }
        ]
      },
      {
        "type": "callout",
        "label": "Một câu hỏi thay cho ba lời khen",
        "text": "Thay vì hỏi \"bạn thấy thế nào\", hãy hỏi \"lần gần nhất bạn làm việc này, bạn đã làm ở đâu và thế nào\". Câu trả lời kể lại việc thật, và nếu họ kể là vẫn dùng sổ tay riêng, đó là phản hồi thật nhất bạn có thể nhận."
      },
      {
        "type": "scenario",
        "title": "Ba lời khen và một bảng trống",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Ba đồng nghiệp đều nói \"ổn rồi\". Bạn định bàn giao. Nhưng bản ghi của bạn cho thấy chị Hoa dừng ở ô Ngày và anh Tùng hỏi \"sao không tự điền ngày\".",
            "choices": [
              {
                "label": "Bàn giao vì cả ba đều khen",
                "next": "bad_ship"
              },
              {
                "label": "Hỏi họ về việc đã làm và hẹn xem việc dùng sau ba ngày",
                "next": "s2"
              }
            ]
          },
          "bad_ship": {
            "text": "Một tuần sau chỉ mình bạn ghi dữ liệu. Ba người vẫn dùng sổ tay riêng vì không muốn tự nhập ngày, và bạn phải đi nhắc từng người.",
            "ending": "bad"
          },
          "s2": {
            "text": "Sau ba ngày, chỉ chị Hoa ghi vào bảng. Anh Tùng nói: \"Anh quên mất.\" Cô Mai chưa mở lần nào.",
            "choices": [
              {
                "label": "Hỏi từng người \"lần gần nhất em cần ghi khách mới, em ghi ở đâu?\"",
                "next": "good"
              },
              {
                "label": "Nhắn cả phòng \"mọi người nhớ dùng bảng mới nhé\"",
                "next": "bad_nag"
              }
            ]
          },
          "bad_nag": {
            "text": "Tin nhắn nhận vài biểu tượng ngón cái. Tuần sau số người dùng không đổi, và bạn vẫn chưa biết vì sao.",
            "ending": "bad"
          },
          "good": {
            "text": "Anh Tùng nói: \"Anh ghi vào sổ tay vì không phải nhập ngày.\" Bạn thêm điền ngày tự động. Tuần sau ba người đều ghi vào bảng.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Nghe hành vi, không chỉ nghe lời khen.",
          "Bài sau: khi công cụ hỏng đúng lúc đồng nghiệp cần."
        ]
      }
    ]
  },
  {
    "id": 2558,
    "slug": "cong-cu-hong-luc-dong-nghiep-can-nhat-thi-lam-sao",
    "title": "Chặng 57, Bài 19: Công cụ hỏng đúng lúc đồng nghiệp cần: kế hoạch dự phòng",
    "subtitle": "Mọi công cụ rồi cũng có ngày không chạy. Câu hỏi là lúc đó đồng nghiệp làm gì.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "🛟",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Công cụ nhỏ càng được dùng nhiều thì ngày nó hỏng càng đau: sáng cuối tháng, đồng nghiệp cần nhập bốn mươi đơn và bảng không mở. Nếu có một trang cách làm tay và biết gọi ai, ngày hỏng chỉ là chậm vài giờ, chứ không phải mất cả ngày làm việc.",
    "openingQuestion": "Sáng cuối tháng, bảng theo dõi đơn hàng báo lỗi và không mở được. Phòng bạn cần nhập 40 đơn trước trưa. Điều gì làm ngày đó đỡ nhất?",
    "openingOptions": [
      "Một trang cách làm tay đã viết sẵn và tên người để gọi",
      "Một công cụ mới, tốt hơn, làm xong vào đầu tuần sau",
      "Lời hứa \"công cụ này rất ít khi hỏng\" của người làm ra nó",
      "Một buổi họp cả phòng để bàn vì sao công cụ lại hỏng"
    ],
    "correctOption": 0,
    "explanation": "Lúc công cụ hỏng, người dùng cần biết làm gì ngay bây giờ: một tờ hướng dẫn cách làm tay và số điện thoại người sửa. Công cụ mới tuần sau không giúp buổi sáng hôm đó. Lời hứa \"ít khi hỏng\" chẳng bảo vệ được ai khi nó hỏng. Còn họp bàn nguyên nhân là việc cần làm sau, không phải lúc 40 đơn đang chờ.",
    "diagram": [
      {
        "label": "Công cụ ngừng chạy",
        "arrow": true
      },
      {
        "label": "Người dùng mở trang cách làm tay",
        "arrow": true
      },
      {
        "label": "Làm tay, ghi lại đơn đã xử lý",
        "arrow": true
      },
      {
        "label": "Gọi người duy trì; sau đó nhập bù"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Phòng kế toán của anh Đạt dùng một bảng tính tự tổng hợp chi phí. Có lần bảng bị sửa nhầm công thức đúng ngày cuối tháng. Vì anh đã in sẵn một trang \"cách tổng hợp tay bằng bảng cũ\" và ghi số điện thoại người duy trì, cả phòng làm tay trong hai giờ thay vì chờ đến chiều."
    },
    "quiz": [
      {
        "question": "Trang dự phòng cần có gì đầu tiên?",
        "options": [
          "Các bước làm tay, theo thứ tự, để người chưa từng thấy công cụ làm được",
          "Giải thích chi tiết vì sao công cụ hỏng và cách nó đã được lập trình",
          "Danh sách tất cả tính năng của công cụ để mọi người biết đủ về nó",
          "Lời xin lỗi gửi đồng nghiệp và cam kết lần sau sẽ không hỏng nữa"
        ],
        "correct": 0,
        "explanation": "Khi công cụ hỏng, người dùng cần làm xong việc của họ, không cần hiểu nguyên nhân. Phần nguyên nhân và lời xin lỗi là việc của sau đó. Một trang ngắn, làm từng bước, có người gọi là thứ duy nhất họ cần trong lúc gấp."
      },
      {
        "question": "Trang dự phòng nên để ở đâu?",
        "options": [
          "Ở chỗ mở được mà không cần công cụ bị hỏng, ví dụ in ra hoặc thư mục chung",
          "Ở ngay bên trong công cụ, để người dùng thấy khi mở",
          "Chỉ trong đầu của người làm ra công cụ, vì anh ta hiểu nhất",
          "Trong email gửi từ tháng trước, người dùng tự tìm lại khi cần"
        ],
        "correct": 0,
        "explanation": "Nếu trang hướng dẫn nằm trong chính công cụ hỏng thì đúng lúc cần nhất lại không mở được. Cũng không thể phụ thuộc vào đầu của một người hay vào hộp thư mà chẳng ai nhớ chỗ nào."
      },
      {
        "question": "Trong lúc làm tay, việc nào bắt buộc?",
        "options": [
          "Ghi lại từng đơn đã xử lý để nhập bù khi công cụ chạy lại",
          "Làm thật nhanh và nhớ trong đầu đơn nào đã làm",
          "Dừng hẳn việc cho tới khi người duy trì sửa xong công cụ",
          "Nhờ mỗi người tự chọn cách ghi của riêng mình cho nhanh"
        ],
        "correct": 0,
        "explanation": "Làm tay mà không ghi sẽ mất dấu: đơn nào đã xử lý, đơn nào chưa, và lúc nhập bù sẽ trùng hoặc sót. Dừng việc thì chỉ chuyển cái chậm sang chỗ khác, và mỗi người một kiểu ghi thì không ghép lại được."
      },
      {
        "question": "Bạn cần kiểm cái gì khi ghi \"người gọi khi hỏng\" trên trang dự phòng?",
        "options": [
          "Người đó có số điện thoại, có thể nghe máy và có người thay khi vắng",
          "Người đó là người đã làm ra công cụ, không quan trọng họ có mặt hay không",
          "Chỉ cần ghi tên, vì ai cũng sẽ tự biết cách liên lạc",
          "Ghi tên sếp trực tiếp, để sếp quyết định ai làm gì tiếp theo"
        ],
        "correct": 0,
        "explanation": "Một cái tên mà không liên lạc được không phải kế hoạch. Người duy trì có thể nghỉ phép hay họp, nên cần một người thay. Đưa cho sếp thì thêm một chặng chuyển lời trong lúc gấp."
      },
      {
        "question": "Làm tay 40 đơn mất 5 phút mỗi đơn. Tổng thời gian cho 40 đơn là bao nhiêu?",
        "options": [
          "200 phút, tức là khoảng 3 giờ 20 phút",
          "45 phút (= 40 + 5, cộng hai số thay vì nhân)",
          "8 phút (= 40 ÷ 5, chia thay vì nhân)",
          "120 phút (= 40 × 3, nhầm 5 phút thành 3 phút)"
        ],
        "correct": 0,
        "explanation": "Tổng là 40 × 5 = 200 phút. Con số này là lý do cần ước lượng trước: nếu 200 phút là quá dài cho hạn trưa, bạn cần chia việc cho nhiều người hoặc làm cách đơn giản hơn. Ba đáp án kia là nhầm phép tính."
      }
    ],
    "keyTakeaways": [
      "Mọi công cụ sẽ có ngày hỏng; kế hoạch dự phòng viết từ trước.",
      "Trang dự phòng ngắn, theo bước, người chưa từng thấy công cụ làm được.",
      "Để ở nơi mở được khi công cụ hỏng.",
      "Làm tay thì ghi từng việc đã làm để nhập bù.",
      "Ghi người gọi và người thay khi họ vắng."
    ],
    "practicePrompt": {
      "question": "Công cụ hỏng lúc 9 giờ, còn 30 đơn cần xử lý trước trưa. Việc đầu tiên của đồng nghiệp là gì?",
      "options": [
        "Mở trang cách làm tay và ghi lại từng đơn đã xử lý",
        "Chờ người duy trì sửa xong rồi mới bắt đầu nhập",
        "Tự dựng lại một bảng mới theo trí nhớ để làm cho nhanh",
        "Báo cả phòng hoãn việc tới ngày mai cho an toàn"
      ],
      "correct": 0,
      "explanation": "Hạn trưa vẫn còn, nên việc đầu tiên là làm tay theo trang đã viết sẵn và ghi lại đơn đã xử lý. Chờ sửa có thể mất cả buổi. Dựng bảng mới theo trí nhớ dễ sai và sót, còn hoãn việc sang mai bỏ luôn hạn."
    },
    "summary": {
      "keyIdea": "Công cụ nhỏ phải đi kèm cách làm khi nó không chạy.",
      "formula": "Trang làm tay + nơi mở được + người gọi + ghi lại đơn đã xử lý.",
      "commonMistake": "Nghĩ rằng công cụ đủ tốt thì không cần kế hoạch dự phòng.",
      "action": "Viết trang dự phòng một trang cho công cụ quan trọng nhất của bạn."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn một công cụ bạn và đồng nghiệp đang dùng. Viết trang dự phòng một mặt giấy: 5-7 bước làm tay, cách ghi lại việc đã làm, tên và số điện thoại hai người gọi. Nhờ một người không biết công cụ đọc thử và đánh dấu chỗ khó hiểu.",
      "secondary": "Mai bạn sẽ được hỏi: trang đó cất ở đâu và ai đã đọc thử?"
    },
    "sections": [
      {
        "type": "lead",
        "text": "Thứ Sáu cuối tháng, 9 giờ sáng, bảng theo dõi báo \"không mở được\". Ba đồng nghiệp đang nhìn bạn. Bài này giúp bạn có sẵn một tờ giấy để họ làm tiếp việc của mình."
      },
      {
        "type": "feynman",
        "title": "Kế hoạch dự phòng đơn giản hơn bạn nghĩ",
        "intro": "Hình dung toà nhà có thang máy. Thang máy rất ít hỏng, nhưng vẫn có cầu thang và biển chỉ cầu thang. Khi thang hỏng, không ai đứng chờ: họ đi bộ lên.",
        "columns": [
          "Thành phần",
          "Ví dụ đời thường",
          "Trong việc của bạn"
        ],
        "rows": [
          [
            "Công cụ chính",
            "Thang máy, nhanh và tiện",
            "Bảng hay biểu mẫu của bạn"
          ],
          [
            "Đường dự phòng",
            "Cầu thang bộ, chậm hơn nhưng luôn đi được",
            "Trang cách làm tay từng bước"
          ],
          [
            "Biển chỉ đường",
            "Mũi tên ở sảnh",
            "Trang dự phòng để nơi mở được"
          ],
          [
            "Người gọi",
            "Bảo vệ toà nhà",
            "Người duy trì công cụ"
          ]
        ],
        "oneLiner": "Kế hoạch dự phòng là cầu thang bộ: chậm hơn, nhưng vẫn đưa bạn lên tầng."
      },
      {
        "type": "heading",
        "text": "Vấn đề: ngày hỏng luôn là ngày gấp"
      },
      {
        "type": "paragraph",
        "text": "Công cụ hay hỏng đúng lúc dùng nhiều nhất, vì lúc đó dữ liệu lớn, nhiều người vào cùng lúc. Đồng nghiệp sẽ không bình tĩnh đọc tài liệu dài. Họ cần một tờ ngắn, làm theo được ngay và biết gọi ai."
      },
      {
        "type": "chart",
        "title": "Làm tay mất bao nhiêu giờ",
        "caption": "Số liệu minh hoạ, không phải đo thật. Kéo thanh trượt để xem thời gian làm tay tăng theo số đơn. Phần 15 phút đầu là thời gian mở trang dự phòng và chuẩn bị.",
        "kind": "line",
        "xLabel": "Số đơn cần làm tay",
        "yLabel": "Giờ làm tay",
        "x": {
          "from": 1,
          "to": 60,
          "step": 1
        },
        "params": [
          {
            "id": "phut",
            "label": "Phút làm tay mỗi đơn",
            "min": 1,
            "max": 10,
            "step": 0.5,
            "value": 5,
            "unit": "phút"
          },
          {
            "id": "nguoi",
            "label": "Số người cùng làm",
            "min": 1,
            "max": 5,
            "step": 1,
            "value": 1,
            "unit": "người"
          }
        ],
        "series": [
          {
            "label": "Giờ làm tay",
            "expr": "(15 + x * phut) / nguoi / 60"
          }
        ]
      },
      {
        "type": "flow",
        "title": "Khi công cụ hỏng: bốn việc theo thứ tự",
        "steps": [
          {
            "label": "Dừng và xác nhận",
            "detail": "Thử mở lại một lần; nếu vẫn không chạy thì báo người duy trì và chuyển sang trang dự phòng."
          },
          {
            "label": "Làm tay theo trang",
            "detail": "Làm theo từng bước đã viết sẵn, trên bản giấy hoặc bản sao lưu."
          },
          {
            "label": "Ghi từng việc đã làm",
            "detail": "Mỗi đơn xử lý xong ghi ngay một dòng, để nhập bù không trùng, không sót."
          },
          {
            "label": "Nhập bù sau khi sửa",
            "detail": "Khi công cụ chạy lại, nhập các dòng đã ghi và kiểm lại tổng."
          }
        ]
      },
      {
        "type": "list",
        "items": [
          "Viết trang dự phòng bằng chữ của người dùng, không dùng từ chuyên môn.",
          "Mỗi bước một câu, bắt đầu bằng động từ: \"Mở\", \"Ghi\", \"Gọi\".",
          "Cất ở nơi không phụ thuộc công cụ: in ra, thư mục chung, ghim trong nhóm chat.",
          "Ghi tên người duy trì và người thay thế, cùng giờ họ có mặt."
        ]
      },
      {
        "type": "scenario",
        "title": "Bảng hỏng lúc 9 giờ, còn 40 đơn",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "9 giờ sáng cuối tháng, bảng báo lỗi. Cả phòng cần nhập 40 đơn trước 12 giờ. Bạn là người duy trì, đang ở ngoài gặp khách.",
            "choices": [
              {
                "label": "Nhắn cả phòng \"chờ chút, tôi về sẽ xem\"",
                "next": "bad_wait"
              },
              {
                "label": "Bảo mọi người mở trang dự phòng đã in và bắt đầu làm tay, ghi từng đơn",
                "next": "s2"
              }
            ]
          },
          "bad_wait": {
            "text": "Bạn về lúc 11 giờ. Cả phòng đã chờ hai tiếng và còn 40 đơn chưa nhập. Đến trưa chỉ kịp xử lý một nửa.",
            "ending": "bad"
          },
          "s2": {
            "text": "Cả phòng bắt đầu làm tay. Mỗi đơn mất khoảng 5 phút. Cô Mai hỏi: \"Nếu có người làm xong đơn mà chưa ghi thì sao?\"",
            "choices": [
              {
                "label": "Nói \"cứ làm nhanh, tôi sẽ đối chiếu sau theo trí nhớ\"",
                "next": "bad_noghi"
              },
              {
                "label": "Nhắc ghi ngay mỗi đơn vào tờ theo dõi và chia việc cho ba người",
                "next": "good"
              }
            ]
          },
          "bad_noghi": {
            "text": "Công cụ chạy lại lúc 11 giờ. Khi nhập bù, sáu đơn bị nhập hai lần và năm đơn bị sót vì không ai nhớ rõ đã làm đến đâu.",
            "ending": "bad"
          },
          "good": {
            "text": "Ba người làm song song, mỗi đơn ghi ngay vào tờ theo dõi. Công cụ chạy lại lúc 11 giờ, bạn nhập bù trong 15 phút. Cả 40 đơn xong trước trưa, không trùng, không sót.",
            "ending": "good"
          }
        }
      },
      {
        "type": "callout",
        "label": "Ước lượng trước khi cần",
        "text": "Tính sẵn làm tay một đơn mất bao lâu và bao nhiêu đơn thì cả phòng làm kịp. Con số minh hoạ trong biểu đồ trên cho thấy: khi số đơn gấp đôi, thời gian gấp đôi, và chỉ thêm người mới kéo nó xuống."
      },
      {
        "type": "closing",
        "lines": [
          "Kế hoạch dự phòng là tờ giấy viết từ trước.",
          "Bài sau: dự án tổng kết, công cụ có hướng dẫn một trang và người duy trì."
        ]
      }
    ]
  },
  {
    "id": 2559,
    "slug": "du-an-tong-ket-cong-cu-nho-co-ban-huong-dan-va-nguoi-duy-tri",
    "title": "Chặng 57, Bài 20: Dự án tổng kết: công cụ nhỏ có hướng dẫn một trang và người duy trì",
    "subtitle": "Một công cụ chưa xong khi chạy được; nó xong khi người khác dùng được mà không cần bạn.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "🎁",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Công cụ nhỏ hay chết theo cách lặng lẽ: người làm ra nó chuyển phòng hoặc nghỉ phép, không ai biết sửa, rồi mọi người quay lại làm tay. Bàn giao gồm ba thứ: công cụ chạy được, hướng dẫn một trang và một cái tên người sửa khi hỏng.",
    "openingQuestion": "Công cụ của bạn chạy tốt, đồng nghiệp đã thử. Bạn sắp nghỉ phép ba tuần. Thứ gì quan trọng nhất cần để lại cho phòng?",
    "openingOptions": [
      "Hướng dẫn một trang và tên người sửa khi công cụ hỏng",
      "Lời dặn miệng \"có gì hỏi em khi em về nhé\"",
      "Một buổi họp dài giải thích toàn bộ cách công cụ được làm",
      "Mật khẩu tài khoản của bạn gửi trong tin nhắn cho cả phòng"
    ],
    "correctOption": 0,
    "explanation": "Khi bạn vắng, phòng cần hai thứ: cách dùng ngắn gọn để làm việc hằng ngày và một người có quyền sửa khi hỏng. Lời dặn miệng không giúp gì khi bạn đang đi xa. Họp dài về cách làm ra công cụ không phải thứ người dùng cần. Gửi mật khẩu cá nhân cho cả phòng là việc không nên làm: hãy chia quyền truy cập bằng cách của công ty và hỏi bộ phận IT.",
    "diagram": [
      {
        "label": "Hoàn tất công cụ, thử lần cuối",
        "arrow": true
      },
      {
        "label": "Viết hướng dẫn một trang",
        "arrow": true
      },
      {
        "label": "Chọn người duy trì và người thay",
        "arrow": true
      },
      {
        "label": "Bàn giao: nhờ người mới dùng thử thật"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Chị Ngân làm một biểu mẫu nhận yêu cầu hỗ trợ cho phòng hành chính. Trước khi chuyển sang dự án khác, chị viết một trang hướng dẫn và ghi anh Bình là người sửa, cô Hà là người thay. Sáu tháng sau biểu mẫu vẫn chạy: khi có lỗi, anh Bình mở trang ghi chú của chị và sửa trong mười phút."
    },
    "quiz": [
      {
        "question": "Hướng dẫn một trang nên dài và viết cho ai?",
        "options": [
          "Vừa một mặt giấy, cho người chưa từng thấy công cụ",
          "Mười trang đầy đủ, cho người làm ra công cụ tự xem lại sau này",
          "Vài dòng ghi chú cho chính bạn, vì người khác sẽ tự đoán được",
          "Càng chi tiết càng tốt, gồm cả lịch sử mọi thay đổi của công cụ"
        ],
        "correct": 0,
        "explanation": "Một mặt giấy buộc bạn chọn việc quan trọng nhất, và người đọc là người chưa từng thấy công cụ. Văn bản dài hay ghi chú cho riêng mình đều không được đọc khi người dùng cần."
      },
      {
        "question": "Người duy trì công cụ nên là ai?",
        "options": [
          "Một người có tên, có quyền sửa và có người thay khi vắng",
          "Bất kỳ ai trong phòng, tuỳ lúc đó ai rảnh thì sửa",
          "Không cần ai cả, vì công cụ nhỏ tự chạy tốt được lâu",
          "Chính bạn cho mãi mãi, kể cả khi chuyển sang phòng khác"
        ],
        "correct": 0,
        "explanation": "Khi \"ai rảnh thì sửa\", thường không ai sửa. Công cụ không tự chạy mãi vì dữ liệu và nhu cầu đổi. Và bạn sẽ không ở đó mãi, nên cần tên một người và một người thay ghi rõ trên trang hướng dẫn."
      },
      {
        "question": "Bàn giao xong, bạn kiểm tra thế nào?",
        "options": [
          "Nhờ một người chưa từng dùng làm một việc thật, chỉ với trang hướng dẫn",
          "Hỏi lại người nhận xem họ có hiểu hết cách dùng hay chưa",
          "Đọc lại trang hướng dẫn thêm một lần để chắc không có lỗi chính tả",
          "Gửi email thông báo bàn giao và coi như đã hoàn tất"
        ],
        "correct": 0,
        "explanation": "Bàn giao đạt khi người mới làm được việc mà không cần bạn, nên cách kiểm duy nhất là xem họ làm. Hỏi \"có hiểu không\" nhận về câu trả lời lịch sự. Đọc lại chính tả hay gửi email thì không chứng minh được điều gì."
      },
      {
        "question": "Bạn nhờ AI viết hướng dẫn. Điều gì giúp tránh hướng dẫn bịa tính năng?",
        "options": [
          "Liệt kê đúng các nút và ô có thật trong công cụ",
          "Yêu cầu AI viết thật ngắn để không có thời gian bịa",
          "Yêu cầu AI \"viết chính xác nhất có thể\" là đủ",
          "Để AI tự khám phá công cụ rồi tự viết toàn bộ hướng dẫn"
        ],
        "correct": 0,
        "explanation": "AI không nhìn thấy công cụ của bạn; nó viết những gì nghe hợp lý. Đưa danh sách nút và ô có thật cho nó cái để bám. Viết ngắn hay dặn \"chính xác nhất\" không cho nó thông tin nào thêm, và nó cũng không thể tự khám phá một công cụ trong tệp của bạn."
      },
      {
        "question": "Trang hướng dẫn cần có thông tin gì ngoài các bước dùng?",
        "options": [
          "Việc cần làm khi công cụ hỏng và tên người gọi",
          "Lịch sử ai đã góp ý và họ góp ý những gì",
          "Danh sách các tính năng định làm trong tương lai",
          "Lời cảm ơn đồng nghiệp đã thử và góp ý cho công cụ"
        ],
        "correct": 0,
        "explanation": "Ngày công cụ hỏng, người dùng cần biết làm gì tiếp và gọi ai, đó là phần nối với bài trước. Lịch sử góp ý và kế hoạch tương lai là thông tin của người làm, còn lời cảm ơn nên gửi riêng."
      }
    ],
    "keyTakeaways": [
      "Công cụ xong khi người khác dùng được mà không cần bạn.",
      "Hướng dẫn một mặt giấy, viết cho người chưa từng thấy nó.",
      "Có người duy trì có tên và một người thay khi vắng.",
      "Nhờ người mới làm một việc thật để kiểm bàn giao.",
      "Đưa cho AI danh sách nút thật để nó không bịa tính năng."
    ],
    "practicePrompt": {
      "question": "Bạn chuyển sang phòng khác tuần sau. Công cụ chạy tốt. Việc nào làm trước khi đi?",
      "options": [
        "Viết trang hướng dẫn, chọn người duy trì và nhờ họ dùng thử",
        "Để lại công cụ vì nó chạy tốt, chẳng cần giải thích gì thêm",
        "Tặng mật khẩu tài khoản của bạn cho cả phòng dùng chung",
        "Đợi cả phòng hỏi rồi mới soạn hướng dẫn cho từng câu hỏi"
      ],
      "correct": 0,
      "explanation": "Công cụ chạy tốt hôm nay không đảm bảo nó chạy mai khi bạn đi. Bàn giao gồm hướng dẫn, người duy trì và một lần dùng thử. Chia sẻ mật khẩu cá nhân là thói quen xấu, và chờ câu hỏi nghĩa là bạn phải có mặt để trả lời."
    },
    "summary": {
      "keyIdea": "Bàn giao là một phần của việc làm công cụ, không phải việc thêm.",
      "formula": "Công cụ chạy + hướng dẫn một trang + người duy trì + một lần người mới thử.",
      "commonMistake": "Coi công cụ chạy được là xong và đi khỏi.",
      "action": "Viết trang hướng dẫn, chọn người duy trì và bàn giao cho một đồng nghiệp."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn công cụ nhỏ bạn đã làm trong chặng này. Viết trang hướng dẫn một mặt giấy: 3 bước dùng chính, việc cần làm khi hỏng, tên người duy trì và người thay. Nhờ một đồng nghiệp làm một việc thật chỉ bằng trang đó và ghi chỗ họ vướng.",
      "secondary": "Mai bạn sẽ được hỏi: đồng nghiệp đã làm được việc đó chưa, và chỗ vướng nào bạn sửa trong trang?"
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bạn đã làm công cụ, đã cho người lạ thử, đã xếp việc sửa và đã viết kế hoạch dự phòng. Còn một việc cuối: để công cụ sống tiếp khi bạn không còn đứng cạnh nó."
      },
      {
        "type": "feynman",
        "title": "Bàn giao công cụ đơn giản hơn bạn nghĩ",
        "intro": "Hình dung bạn cho hàng xóm mượn chìa khoá nhà khi đi du lịch. Bạn để lại một tờ giấy: tưới cây ở đâu, công tắc nào là của bếp, gọi ai khi ống nước hỏng. Nhà là của bạn, nhưng người ở lại cần tờ giấy đó.",
        "columns": [
          "Thành phần",
          "Ví dụ đời thường",
          "Trong việc của bạn"
        ],
        "rows": [
          [
            "Chìa khoá",
            "Quyền vào nhà",
            "Quyền dùng và sửa công cụ"
          ],
          [
            "Tờ giấy dặn dò",
            "Ngắn, theo thứ tự việc",
            "Hướng dẫn một trang"
          ],
          [
            "Số gọi khi ống nước hỏng",
            "Thợ sửa quen",
            "Người duy trì và người thay"
          ],
          [
            "Kiểm tra trước khi đi",
            "Hàng xóm thử mở khoá",
            "Đồng nghiệp làm một việc thật"
          ]
        ],
        "oneLiner": "Bàn giao là tờ dặn dò ngắn và một cái tên để gọi."
      },
      {
        "type": "heading",
        "text": "Vấn đề: công cụ chết khi người làm đi"
      },
      {
        "type": "paragraph",
        "text": "Công cụ nhỏ thường nằm trong đầu của một người. Khi người đó nghỉ phép hay chuyển phòng, đồng nghiệp không biết nhập ở đâu, không biết sửa thế nào, và sau vài tuần họ quay lại làm tay. Ba thứ nhỏ ngăn được điều đó."
      },
      {
        "type": "flow",
        "title": "Bàn giao trong ba bước",
        "steps": [
          {
            "label": "Hướng dẫn một trang",
            "detail": "Ba việc dùng chính, mỗi việc vài bước; một dòng việc cần làm khi hỏng. Viết cho người chưa từng thấy công cụ."
          },
          {
            "label": "Người duy trì",
            "detail": "Ghi tên một người có quyền sửa và một người thay. Hỏi họ trước; đừng ghi tên ai mà họ chưa biết."
          },
          {
            "label": "Một lần người mới thử",
            "detail": "Nhờ người chưa từng dùng làm một việc thật chỉ với trang đó. Chỗ họ vướng là chỗ sửa trang."
          }
        ]
      },
      {
        "type": "list",
        "items": [
          "Dùng chữ của người dùng, không dùng từ của người làm công cụ.",
          "Ghi ngày sửa gần nhất và nơi cất bản sao lưu.",
          "Quyền truy cập cấp cho từng người theo cách của công ty; không chia sẻ mật khẩu cá nhân.",
          "Nếu công cụ chứa dữ liệu khách hay lương, hỏi bộ phận IT hoặc chuyên gia trước khi bàn giao."
        ]
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI viết nháp hướng dẫn một trang",
        "task": "Bạn cần trang hướng dẫn cho bảng theo dõi đơn hàng của phòng 8 người. Lắp một prompt để AI viết nháp.",
        "parts": [
          {
            "id": "ctx",
            "label": "Bối cảnh",
            "options": [
              {
                "text": "Viết hướng dẫn cho công cụ của tôi.",
                "feedback": "Không có tên công cụ, việc và người dùng nên AI viết một bản chung chung hoặc bịa tính năng."
              },
              {
                "text": "Công cụ là bảng theo dõi đơn hàng của phòng 8 người. Việc chính là nhập đơn mới và xem tổng cuối ngày. Người dùng không biết kỹ thuật.",
                "good": true,
                "feedback": "Đủ công cụ, việc chính và người đọc; AI viết bám vào đúng thứ có thật."
              }
            ]
          },
          {
            "id": "task",
            "label": "Việc cần làm",
            "options": [
              {
                "text": "Viết hướng dẫn một trang: 3 bước nhập đơn, 2 bước xem tổng, 1 dòng việc cần làm khi công cụ không mở và tên người gọi.",
                "good": true,
                "feedback": "Đếm được số bước và có chỗ cho kế hoạch dự phòng; bạn kiểm được từng mục."
              },
              {
                "text": "Viết hướng dẫn đầy đủ nhất có thể, bao gồm mọi tính năng.",
                "feedback": "\"Đầy đủ nhất\" tạo ra nhiều trang không ai đọc và AI sẽ thêm tính năng không có."
              }
            ]
          },
          {
            "id": "rule",
            "label": "Giới hạn",
            "options": [
              {
                "text": "Chỉ dùng những nút và ô tôi liệt kê: Ô Ngày, Ô Khách, Ô Tiền, nút Lưu. Không bịa tính năng. Người duy trì: chị Lan, số 09xx xxx xxx.",
                "good": true,
                "feedback": "Liệt kê đúng những thứ có thật và cấm bịa; bạn đối chiếu hướng dẫn với công cụ dễ dàng."
              },
              {
                "text": "Viết tự nhiên, dễ hiểu, không cần theo khuôn nào.",
                "feedback": "Không có giới hạn, AI sẽ thêm nút và tính năng nghe hợp lý mà công cụ không có."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "ctx",
              "task",
              "rule"
            ],
            "text": "HƯỚNG DẪN BẢNG THEO DÕI ĐƠN HÀNG (1 trang)\nNhập đơn mới: 1) Mở bảng, chọn dòng trống đầu tiên. 2) Điền Ngày, Khách, Tiền. 3) Bấm Lưu.\nXem tổng cuối ngày: 1) Kéo xuống dòng Tổng. 2) Đối chiếu với sổ giao hàng.\nKhi bảng không mở: làm tay theo tờ dự phòng và gọi chị Lan, số 09xx xxx xxx."
          },
          {
            "requires": [
              "ctx",
              "task"
            ],
            "text": "HƯỚNG DẪN: Nhập đơn: điền Ngày, Khách, Tiền rồi bấm Lưu và chọn Xuất báo cáo nếu cần. Xem tổng ở cuối bảng...\n(Đúng khuôn, nhưng AI tự thêm nút \"Xuất báo cáo\" mà công cụ không có, vì bạn chưa liệt kê nút thật.)"
          },
          {
            "text": "HƯỚNG DẪN SỬ DỤNG TOÀN DIỆN: 1. Giới thiệu hệ thống quản lý đơn hàng thông minh... 2. Đăng nhập bằng tài khoản... 3. Dùng bộ lọc nâng cao, biểu đồ doanh thu, nhắc việc tự động...\n(AI bịa cả loạt tính năng không tồn tại và dài nhiều trang, vì bạn không nói công cụ là gì và việc gì.)"
          }
        ]
      },
      {
        "type": "callout",
        "label": "AI viết nháp, người mới thử mới là người chấm",
        "text": "Nháp của AI đọc rất trôi nhưng chưa ai chạy thử. Hãy nhờ một người làm đúng từng bước trên trang và đánh dấu bước nào không khớp với công cụ thật."
      },
      {
        "type": "scenario",
        "title": "Ngày cuối trước khi nghỉ phép",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn nghỉ phép ba tuần từ thứ Hai. Công cụ chạy tốt. Đồng nghiệp hay hỏi cách dùng, bạn mới soạn bản nháp hướng dẫn.",
            "choices": [
              {
                "label": "Để lại công cụ và nói \"có gì nhắn em\"",
                "next": "bad_leave"
              },
              {
                "label": "Hoàn tất hướng dẫn, ghi người duy trì và người thay rồi nhờ chị Lan thử",
                "next": "s2"
              }
            ]
          },
          "bad_leave": {
            "text": "Ngày thứ tư của kỳ nghỉ, bảng báo lỗi. Bạn đang ở xa, không có sóng. Cả phòng quay lại làm tay và không ai dám sửa.",
            "ending": "bad"
          },
          "s2": {
            "text": "Chị Lan làm theo hướng dẫn và kẹt ở bước 2: nút \"Xuất\" ghi trong hướng dẫn, nhưng công cụ không có nút đó.",
            "choices": [
              {
                "label": "Sửa trang cho khớp công cụ thật rồi nhờ chị thử lại",
                "next": "good"
              },
              {
                "label": "Bảo chị thông cảm, nút đó tên khác, chị cứ đoán là được",
                "next": "bad_guess"
              }
            ]
          },
          "bad_guess": {
            "text": "Chị Lan đoán được, nhưng người thứ hai thì không. Trang hướng dẫn vẫn sai, và tuần bạn vắng hai người bỏ việc giữa chừng.",
            "ending": "bad"
          },
          "good": {
            "text": "Trang được sửa, chị Lan làm một đơn mất hai phút không hỏi ai. Bạn ghi anh Bình là người duy trì, chị Lan là người thay, rồi đi nghỉ yên tâm.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Công cụ xong khi người khác dùng được mà không cần bạn.",
          "Bạn đã đi từ một việc lặp lại tới công cụ có người giữ: hãy làm thử với việc tiếp theo."
        ]
      }
    ]
  }
];
