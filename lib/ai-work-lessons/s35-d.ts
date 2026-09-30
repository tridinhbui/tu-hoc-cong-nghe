import type { Lesson } from "../lesson-types";

// Chặng 35, bài 16-20. Giáo trình: scripts/curriculum/stage-35.json.
export const S35_D_LESSONS: Lesson[] = [
  {
    "track": "personal",
    "isFundamental": false,
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "id": 2115,
    "slug": "khach-khieu-nai-phong-o-ngay-dem-dau",
    "title": "Chặng 35, Bài 16: Khách khiếu nại về phòng ngay đêm đầu tiên",
    "subtitle": "Mười một giờ đêm, điều hoà kêu ù ù và khách đứng ở quầy: xin lỗi thế nào, đề xuất gì, ghi lại ra sao.",
    "emoji": "🛎️",
    "whyItMatters": "Khiếu nại đêm đầu là lúc khách quyết định ở lại hay đổi nơi khác. Người trực quầy thường một mình, mệt, và dễ nói câu hứa vội hoặc câu chống chế. AI không đứng ở quầy, nhưng nó giúp bạn chuẩn bị sẵn câu nói và cách ghi sự việc để đêm nào cũng xử lý bình tĩnh như nhau.",
    "openingQuestion": "Mười một giờ đêm, khách xuống quầy nói điều hoà phòng kêu ồn, không ngủ được và muốn đổi phòng. Việc đầu tiên bạn nên làm là gì?",
    "openingOptions": [
      "Nghe hết, xin lỗi về việc cụ thể rồi hỏi khách muốn xử lý thế nào",
      "Giải thích ngay máy mới bảo trì nên không thể hỏng",
      "Hứa đổi phòng cao cấp hơn miễn phí để khách hết phàn nàn nhanh nhất",
      "Bảo khách sáng mai gặp quản lý, vì đêm khuya bạn không có quyền quyết"
    ],
    "correctOption": 0,
    "explanation": "Khách đang bực vì không ngủ được, nên họ cần thấy mình được nghe trước khi nghe giải thích. Xin lỗi đúng việc (tiếng ồn ở phòng họ) rồi hỏi họ muốn gì là mở đường cho phương án. Giải thích rằng máy mới bảo trì nghe như chối lỗi. Hứa phòng cao cấp miễn phí là quyết định vượt quyền của bạn và sẽ thành tiền lệ. Đẩy sang sáng mai bỏ mặc khách giữa đêm khi họ cần chỗ ngủ ngay.",
    "diagram": [
      {
        "label": "Nghe khách nói hết, không ngắt lời",
        "arrow": true
      },
      {
        "label": "Xin lỗi đúng việc và kiểm tra thật",
        "arrow": true
      },
      {
        "label": "Đưa hai phương án trong quyền của bạn",
        "arrow": true
      },
      {
        "label": "Ghi sự việc, giờ, phương án đã chọn để giao ca sau"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một nhà nghỉ nhỏ có bảy phòng, người trực đêm là chị Hạnh. Khách phàn nàn điều hoà ồn lúc khuya. Chị lên xem cùng khách, xác nhận tiếng ồn có thật, và còn hai phòng trống nên đề nghị đổi. Sáng hôm sau chị để lại ghi chú cho thợ kiểm tra máy ở phòng đó. Nhờ ghi chú, khách sau không gặp lại lỗi này."
    },
    "quiz": [
      {
        "question": "Khách nói điều hoà ồn lúc khuya. Câu nào là lời xin lỗi tốt nhất?",
        "options": [
          "Xin lỗi anh, tiếng ồn điều hoà làm anh khó ngủ. Em lên kiểm tra cùng anh ngay",
          "Xin lỗi vì sự bất tiện, chúng tôi luôn đặt sự hài lòng của quý khách lên hàng đầu",
          "Xin lỗi anh, nhưng máy này mới bảo trì tháng trước nên chắc không có vấn đề gì",
          "Xin lỗi anh, em sẽ báo lại với quản lý, mai anh chờ điện thoại của bên em nhé"
        ],
        "correct": 0,
        "explanation": "Lời xin lỗi tốt gọi đúng tên việc (tiếng ồn, khó ngủ) và đi kèm hành động ngay. Câu đầu hàng đầu của công ty là khẩu hiệu chung chung. Câu nói máy mới bảo trì là chống chế khi chưa kiểm tra. Câu hẹn mai gọi lại đẩy việc đi trong lúc khách cần giải pháp ngay đêm nay."
      },
      {
        "question": "Bạn được phép đổi phòng cùng hạng nếu còn trống. Khi khách đòi đổi, nên làm gì?",
        "options": [
          "Đổi sang phòng cùng hạng còn trống và hỏi khách cần giúp mang hành lý không",
          "Đổi ngay sang phòng hạng cao hơn nữa cho khách nguôi giận và khỏi mất công thương lượng thêm",
          "Từ chối đổi vì phòng đã bán cho khách này rồi, chỉ có thể gọi thợ sửa vào sáng hôm sau",
          "Nhờ AI quyết định xem có nên đổi phòng hay không"
        ],
        "correct": 0,
        "explanation": "Bạn chỉ hứa điều nằm trong quyền của mình: phòng cùng hạng còn trống thì đổi là giải pháp gọn nhất. Nâng hạng miễn phí là quyết định về tiền của chủ cơ sở. Từ chối và chờ thợ bỏ khách không ngủ được. AI không biết phòng nào còn trống, cũng không đứng ra chịu trách nhiệm cho quyết định."
      },
      {
        "question": "Vì sao sau vụ việc bạn nên ghi lại giờ, số phòng, điều khách nói và cách đã xử lý?",
        "options": [
          "Ca sau và chủ cơ sở biết chuyện gì đã xảy ra mà khỏi hỏi khách lại",
          "Để có bằng chứng chứng minh khách đã nói sai nếu sau này họ để lại đánh giá xấu trên mạng",
          "Vì ghi chép càng dài thì cơ sở càng trông chuyên nghiệp và khách càng dễ nguôi giận",
          "Để nhờ AI tự quyết bồi thường cho khách"
        ],
        "correct": 0,
        "explanation": "Ghi chép là cầu nối giữa các ca: người sau khỏi hỏi khách kể lại lần hai và thợ biết máy nào cần xem. Nó không dùng để cãi khách. Độ dài không làm khách nguôi giận, vì khách không đọc ghi chép. Và bồi thường là quyết định của chủ cơ sở, không phải của AI."
      },
      {
        "question": "Bạn nhờ AI soạn câu nói mẫu cho tình huống này. Yêu cầu nào hợp lý nhất?",
        "options": [
          "Soạn ba câu xin lỗi ngắn nêu đúng việc, không hứa hoàn tiền hay nâng hạng",
          "Soạn câu trả lời khiến khách hài lòng nhất có thể, kể cả khi phải hứa thêm quyền lợi",
          "Soạn một đoạn dài giải thích kỹ thuật vì sao điều hoà có thể kêu để khách hiểu và thông cảm",
          "Soạn câu ngắn, tuỳ AI muốn bồi thường gì cho khách cũng được để khách vui"
        ],
        "correct": 0,
        "explanation": "Giới hạn nói rõ điều KHÔNG được hứa giữ AI trong quyền của bạn. Yêu cầu làm khách hài lòng nhất khiến AI tự thêm quyền lợi mà cơ sở chưa duyệt. Đoạn giải thích kỹ thuật nghe như lý do chống chế. Để AI tự chọn mức bồi thường là trao quyết định tiền cho thứ không chịu trách nhiệm."
      },
      {
        "question": "Khách nói: 'Tôi sẽ để lại đánh giá một sao'. Cách phản hồi nào đúng nhất?",
        "options": [
          "Ghi nhận cảm giác của khách, nhắc lại phương án đang làm và không tranh luận",
          "Nhắc khách đánh giá sai có thể bị gỡ",
          "Im lặng làm tiếp, lời đe doạ không đáng bận tâm",
          "Hứa giảm nửa tiền để khách khỏi đăng đánh giá"
        ],
        "correct": 0,
        "explanation": "Khách nói vậy vì đang bực, nên ghi nhận cảm giác và cho thấy bạn đang làm việc là cách hạ nhiệt. Đe doạ gỡ đánh giá biến khiếu nại thành cãi nhau. Giảm giá đổi lấy im lặng vượt quyền và tạo tiền lệ xấu. Im lặng hoàn toàn khiến khách thấy mình bị phớt lờ."
      }
    ],
    "keyTakeaways": [
      "Nghe hết trước, xin lỗi đúng việc rồi mới nói tới phương án.",
      "Chỉ hứa điều nằm trong quyền của bạn; việc về tiền thì hỏi chủ cơ sở.",
      "Đề xuất hai phương án để khách có cảm giác được chọn.",
      "Ghi lại giờ, số phòng, sự việc và cách xử lý để giao ca.",
      "AI giúp soạn câu nói mẫu, bạn quyết định điều được hứa."
    ],
    "practicePrompt": {
      "question": "Bạn nhờ AI viết lời xin lỗi khách và nó viết 'chúng tôi xin hoàn 100% tiền phòng đêm nay'. Cơ sở chưa có quy định hoàn tiền kiểu này. Bạn nên làm gì?",
      "options": [
        "Xoá lời hứa hoàn tiền và hỏi chủ cơ sở nếu khách thật sự cần bồi thường",
        "Gửi nguyên văn cho khách vì AI đã viết thì chắc là chính sách hợp lý, khỏi hỏi ai",
        "Giữ lời hứa nhưng đổi thành hoàn 50% để nghe vừa phải hơn",
        "Yêu cầu AI viết lại cho hay hơn mà vẫn để nguyên lời hứa hoàn tiền"
      ],
      "correct": 0,
      "explanation": "Lời hứa về tiền không phải của AI, cũng không phải của bạn nếu chủ chưa duyệt. Xoá nó và hỏi chủ là cách đúng. Gửi nguyên văn biến câu AI đoán thành cam kết thật. Đổi thành 50% vẫn là con số tự bịa. Viết lại cho hay hơn không làm lời hứa đó có thẩm quyền."
    },
    "summary": {
      "keyIdea": "Đêm đầu tiên, khách cần thấy mình được nghe và có phương án, không cần một bài giải thích.",
      "formula": "Nghe hết + xin lỗi đúng việc + hai phương án trong quyền + ghi lại = khiếu nại được xử lý gọn.",
      "commonMistake": "Chống chế hoặc hứa vượt quyền chỉ để khách hết bực ngay lúc đó.",
      "action": "Viết ba câu xin lỗi ngắn cho tình huống hay gặp nhất ở cơ sở của bạn."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Nghĩ tới một lần khách phàn nàn thật ở nơi bạn làm (ồn, nóng, chưa dọn kịp). Nhờ AI soạn ba câu xin lỗi mẫu, cấm hứa hoàn tiền hay nâng hạng. Sau đó viết mẫu ghi chú sự việc gồm: giờ, số phòng, điều khách nói, việc đã làm. Chưa cần dùng ngay, chỉ cần lưu ở nơi ca trực nào cũng thấy.",
      "secondary": "Hỏi chủ cơ sở một điều: trong tình huống này bạn được quyết những gì mà không cần xin phép."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Mười một giờ đêm, một mình ở quầy, và một khách đang đứng trước mặt nói không ngủ được. Bài này giúp bạn có sẵn lời nói và cách ghi chép để xử lý bình tĩnh, còn AI chỉ đứng sau chuẩn bị giúp."
      },
      {
        "type": "feynman",
        "title": "Xử lý khiếu nại đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới lúc một người bạn đến nhà than bị mất ngủ vì hàng xóm. Bạn không cãi rằng hàng xóm tốt lắm, cũng không hứa đi mắng họ. Bạn nghe, tỏ ra hiểu, rồi hỏi cần giúp gì. Khiếu nại ở quầy cũng vậy.",
        "columns": [
          "Việc",
          "Với người bạn",
          "Với khách ở quầy"
        ],
        "rows": [
          [
            "Nghe",
            "Để bạn kể hết chuyện",
            "Nghe hết, không ngắt lời"
          ],
          [
            "Tỏ ra hiểu",
            "Nói: nghe mệt thật",
            "Xin lỗi đúng việc: tiếng ồn làm anh khó ngủ"
          ],
          [
            "Giúp",
            "Cho ngủ nhờ phòng khách",
            "Đề xuất đổi phòng hoặc kiểm tra máy"
          ],
          [
            "Nhớ lại",
            "Nhớ để lần sau hỏi thăm",
            "Ghi lại để ca sau và thợ biết"
          ]
        ],
        "oneLiner": "Nghe trước, xin lỗi đúng việc, đưa phương án, rồi ghi lại - AI chỉ giúp bạn soạn câu, không ngồi vào chỗ của bạn."
      },
      {
        "type": "heading",
        "text": "Vì sao đêm đầu tiên quan trọng nhất"
      },
      {
        "type": "paragraph",
        "text": "Khách chưa quen cơ sở của bạn, nên ấn tượng về đêm đầu quyết định họ có ở tiếp không. Một vấn đề nhỏ được xử lý ngay đôi khi để lại thiện cảm hơn một đêm không có vấn đề gì. Điều khách nhớ là bạn có quan tâm hay không, không phải điều hoà hỏng hay không."
      },
      {
        "type": "flow",
        "title": "Từ lời phàn nàn tới một ghi chép giao ca",
        "steps": [
          {
            "label": "Nghe khách nói hết",
            "detail": "Đứng đối diện, không nhìn màn hình. Khách cần thấy bạn nghe. Có thể gật đầu và nhắc lại ý chính: điều hoà kêu, anh không ngủ được."
          },
          {
            "label": "Xin lỗi đúng việc",
            "detail": "Gọi tên việc, không nói xin lỗi vì sự bất tiện chung chung. Tránh chữ nhưng, vì nó xoá nhẹ lời xin lỗi vừa nói."
          },
          {
            "label": "Kiểm tra thật",
            "detail": "Nếu được, lên phòng cùng khách xem. Có chuyện thật thì nói có, chưa nghe rõ thì hỏi thêm, đừng đoán thay khách."
          },
          {
            "label": "Đưa phương án trong quyền của bạn",
            "detail": "Ví dụ đổi sang phòng cùng hạng còn trống, hoặc kiểm tra máy ngay. Việc nâng hạng hay hoàn tiền thì hỏi chủ."
          },
          {
            "label": "Ghi lại để giao ca",
            "detail": "Giờ, số phòng, điều khách nói, việc đã làm, việc còn chờ. Ba dòng là đủ, miễn ca sau đọc được."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI soạn câu xin lỗi mẫu cho quầy",
        "task": "Bạn muốn có sẵn vài câu xin lỗi khi khách phàn nàn tiếng ồn. Lắp prompt để AI soạn đúng việc, không hứa thay chủ.",
        "parts": [
          {
            "id": "ctx",
            "label": "Bối cảnh",
            "options": [
              {
                "text": "Khách khó tính, hãy soạn thư xin lỗi.",
                "feedback": "Thiếu bối cảnh: AI không biết đây là lời nói ở quầy hay thư, nên viết văn trang trọng dài dòng không hợp với người đang đứng trước mặt."
              },
              {
                "text": "Tôi trực quầy homestay 7 phòng lúc 11 giờ đêm. Khách phàn nàn điều hoà phòng họ kêu ồn, không ngủ được.",
                "good": true,
                "feedback": "Nêu rõ nơi, giờ và việc cụ thể, nên AI viết câu ngắn để nói thành lời, đúng tình huống."
              }
            ]
          },
          {
            "id": "limit",
            "label": "Điều không được hứa",
            "options": [
              {
                "text": "Cứ làm khách vui, muốn bồi thường gì cũng được.",
                "feedback": "AI sẽ tự thêm hoàn tiền, nâng hạng, tặng bữa sáng: toàn những điều bạn không có quyền hứa."
              },
              {
                "text": "Không hứa hoàn tiền, giảm giá hay nâng hạng. Chỉ được đề nghị đổi phòng cùng hạng nếu còn trống và kiểm tra máy.",
                "good": true,
                "feedback": "Giới hạn rõ giữ câu nói trong quyền của bạn, và không có lời hứa nào phải rút lại sau đó."
              }
            ]
          },
          {
            "id": "form",
            "label": "Khuôn dạng",
            "options": [
              {
                "text": "Viết một bài xin lỗi thật đầy đủ và cảm động.",
                "feedback": "Bài dài không đọc được lúc đứng ở quầy, và nghe giống bài diễn văn hơn lời nói thật."
              },
              {
                "text": "Ba câu, mỗi câu dưới 20 chữ, xưng em - anh/chị, nêu đúng việc và một hành động cụ thể.",
                "good": true,
                "feedback": "Ngắn để nhớ và nói được ngay, xưng hô rõ và có hành động kèm theo."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "ctx",
              "limit",
              "form"
            ],
            "text": "1. Em xin lỗi, tiếng điều hoà làm anh khó ngủ.\n2. Em lên kiểm tra máy cùng anh ngay bây giờ ạ.\n3. Nếu còn phòng cùng hạng, em sẽ đổi cho anh trong ít phút."
          },
          {
            "requires": [
              "ctx"
            ],
            "text": "Chúng tôi xin lỗi vì sự cố. Để bù đắp, chúng tôi xin hoàn 100% tiền phòng đêm nay và tặng bữa sáng cao cấp.\n\n(Bối cảnh đúng nhưng AI tự thêm hoàn tiền và tặng bữa sáng, hai điều bạn chưa được quyền hứa.)"
          },
          {
            "text": "Kính gửi Quý khách, chúng tôi vô cùng chân thành xin lỗi về mọi bất tiện mà Quý khách đã gặp phải và luôn cam kết mang đến trải nghiệm tốt nhất...\n\n(Câu chung chung, không nhắc tới điều hoà hay tiếng ồn nên khách thấy như bị đọc kịch bản.)"
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Xin lỗi đúng việc",
          "text": "Gọi tên điều đã xảy ra, đi cùng một hành động ngay. Khách thấy mình được nghe và biết bước tiếp theo. Không dùng chữ nhưng để chuyển sang giải thích."
        },
        "right": {
          "label": "Xin lỗi chung chung",
          "text": "Câu nào cũng dùng được cho mọi chuyện nên khách nghe ra ngay là mẫu có sẵn. Không có hành động đi kèm, khách phải hỏi thêm và càng bực hơn."
        }
      },
      {
        "type": "callout",
        "label": "Điều bạn chưa được quyết thì đừng hứa",
        "text": "Hoàn tiền, giảm giá, nâng hạng phòng là quyết định của chủ cơ sở. Nếu khách đòi, hãy nói bạn sẽ chuyển ý kiến tới người quyết định và cho khách biết khi nào có trả lời. Nếu khách nói tới vấn đề an toàn hay sức khoẻ, hỏi chủ cơ sở hoặc người có chuyên môn."
      },
      {
        "type": "scenario",
        "title": "Mười một giờ đêm ở quầy",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Khách nam khoảng 40 tuổi xuống quầy: điều hoà phòng 204 kêu ồn, anh không ngủ được và muốn đổi phòng. Homestay còn phòng 205 trống, cùng hạng.",
            "choices": [
              {
                "label": "Nghe hết, xin lỗi về tiếng ồn rồi đề nghị lên xem máy cùng anh",
                "next": "s2"
              },
              {
                "label": "Nói rằng máy mới bảo trì tháng trước nên chắc anh nghe nhầm",
                "next": "bad_defend"
              }
            ]
          },
          "bad_defend": {
            "text": "Khách cảm thấy bị nói dối. Anh vẫn đòi đổi phòng, giọng gắt hơn, và hôm sau để lại đánh giá nhắc đúng câu bạn nói.",
            "ending": "bad"
          },
          "s2": {
            "text": "Lên phòng, bạn nghe rõ tiếng kêu ù ù từ máy. Khách nhìn bạn chờ.",
            "choices": [
              {
                "label": "Đề nghị đổi sang phòng 205 cùng hạng và giúp mang hành lý",
                "next": "s3"
              },
              {
                "label": "Hứa hoàn tiền cả đêm để khách yên tâm, chuyện chủ tính sau",
                "next": "bad_promise"
              }
            ]
          },
          "bad_promise": {
            "text": "Khách đồng ý, nhưng sáng ra chủ cơ sở không chấp nhận hoàn tiền. Khách bị thất hứa và giận hơn cả lúc đầu.",
            "ending": "bad"
          },
          "s3": {
            "text": "Khách đã sang phòng 205 và nói cảm ơn. Bạn còn năm phút trước khi quay lại quầy.",
            "choices": [
              {
                "label": "Ghi lại: giờ, phòng 204, tiếng ồn máy, đổi sang 205, cần thợ xem máy",
                "next": "good"
              },
              {
                "label": "Không ghi, chuyện đã xong và bạn nhớ được",
                "next": "bad_forget"
              }
            ]
          },
          "bad_forget": {
            "text": "Sáng hôm sau ca khác xếp khách mới vào phòng 204. Máy vẫn kêu, và khách mới cũng phàn nàn.",
            "ending": "bad"
          },
          "good": {
            "text": "Sáng hôm sau ca sáng đọc ghi chú và gọi thợ. Phòng 204 được đóng cho tới khi máy sửa xong, khách đêm trước để lại đánh giá cảm ơn nhân viên trực.",
            "ending": "good"
          }
        }
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Nghĩ tới một khiếu nại có thật ở nơi bạn làm.",
          "Bước 2 - Nhờ AI soạn ba câu xin lỗi ngắn, nêu rõ điều không được hứa.",
          "Bước 3 - Đọc lại và sửa cho đúng giọng của bạn.",
          "Bước 4 - Viết mẫu ghi chú giao ca gồm giờ, phòng, sự việc, cách xử lý."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Khiếu nại đêm đầu: nghe, xin lỗi đúng việc, đưa phương án, ghi lại.",
          "Bài sau: khách xin điều trái quy định, và cách từ chối vẫn giữ được khách."
        ]
      }
    ]
  },
  {
    "track": "personal",
    "isFundamental": false,
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "id": 2116,
    "slug": "khach-yeu-cau-viec-ngoai-quy-dinh",
    "title": "Chặng 35, Bài 17: Khách yêu cầu điều trái quy định của cơ sở",
    "subtitle": "Từ chối mà khách vẫn thấy được tôn trọng: nêu lý do, đưa lựa chọn khác, và giữ nguyên quy định.",
    "emoji": "🙅",
    "whyItMatters": "Có những yêu cầu bạn không thể nhận: thêm người ở không đăng ký, nhận thú cưng khi cơ sở không cho, trả phòng muộn khi kín khách. Từ chối cộc lốc thì mất khách, đồng ý cho êm thì cơ sở bị rủi ro. AI giúp bạn chỉnh giọng câu từ chối cho lịch sự, nhưng quy định vẫn là quy định.",
    "openingQuestion": "Khách đặt phòng cho hai người, đến nơi xin cho thêm hai bạn ngủ cùng mà không đăng ký. Cơ sở quy định mọi người ở phải đăng ký. Bạn làm gì trước?",
    "openingOptions": [
      "Giải thích quy định và đưa một lựa chọn hợp lệ, như thêm phòng",
      "Cho ở luôn cho đỡ mất lòng và nhắc khách lần sau đăng ký sớm hơn",
      "Nói thẳng không được, không có ngoại lệ nào",
      "Nhờ AI viết thư từ chối thật cứng để khách khỏi hỏi thêm lần nữa"
    ],
    "correctOption": 0,
    "explanation": "Từ chối vẫn cần cho khách một hướng đi, vì họ có nhu cầu thật là chỗ ngủ cho bốn người. Nêu lý do ngắn rồi đưa lựa chọn hợp lệ, như đặt thêm phòng, giúp khách thấy được phục vụ. Cho ở luôn là phá quy định và thường liên quan đến đăng ký lưu trú. Nói không có ngoại lệ là đóng cửa với khách. Thư cứng chỉ làm khách bực thêm.",
    "diagram": [
      {
        "label": "Nghe rõ khách cần gì phía sau yêu cầu",
        "arrow": true
      },
      {
        "label": "Nêu quy định bằng một câu và lý do ngắn",
        "arrow": true
      },
      {
        "label": "Đưa hai lựa chọn hợp lệ khác",
        "arrow": true
      },
      {
        "label": "Nếu khách vẫn muốn ngoại lệ, chuyển cho người có quyền quyết"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một khách sạn nhỏ quy định không cho ở quá số người đã đăng ký. Một gia đình xin thêm một người bà. Nhân viên nói rõ quy định, rồi đề xuất thêm một giường phụ có tính phí hoặc đặt thêm phòng liền kề. Gia đình chọn giường phụ, và nhân viên ghi lại tên người ở thêm đúng như quy định đăng ký lưu trú của cơ sở."
    },
    "quiz": [
      {
        "question": "Khách xin thêm người ở ngoài số đã đăng ký. Cách từ chối nào tốt nhất?",
        "options": [
          "Nêu quy định, nói lý do ngắn, rồi đề xuất phòng phụ hoặc giường thêm",
          "Xin lỗi anh, quy định là quy định nên bên em hoàn toàn không thể giải quyết được gì thêm cho anh",
          "Nói tạm được, nhưng đề nghị khách đừng cho ai biết để các khách khác không xin theo",
          "Hẹn khách sáng mai gặp chủ, còn đêm nay cứ để mọi người ở như cũ cho đỡ rắc rối"
        ],
        "correct": 0,
        "explanation": "Khách có nhu cầu thật (chỗ ngủ cho nhiều người) nên câu trả lời cần có lối ra hợp lệ. Câu chỉ nói quy định đóng cửa với khách. Cho ở lén là phá quy định và bạn phải chịu trách nhiệm. Hẹn sáng mai mà vẫn để ở là chấp nhận điều trái quy định trong lúc chờ."
      },
      {
        "question": "Vì sao nên hỏi khách 'anh cần gì' trước khi từ chối?",
        "options": [
          "Vì nhu cầu thật của khách có thể được đáp ứng bằng cách hợp lệ khác",
          "Vì hỏi nhiều sẽ khiến khách thấy ngại và tự rút lại yêu cầu ban đầu của họ",
          "Vì nếu khách trả lời có lý do đặc biệt thì bạn có thể bỏ qua quy định",
          "Vì phải hỏi đủ ba câu mới được từ chối"
        ],
        "correct": 0,
        "explanation": "Yêu cầu chỉ là cách khách nghĩ ra để giải quyết một nhu cầu. Biết nhu cầu, bạn có thể đề xuất cách khác. Hỏi không nhằm làm khách ngại, không mở cửa cho ngoại lệ chỉ vì lý do đặc biệt, và không có con số câu hỏi bắt buộc nào để từ chối được coi là đúng."
      },
      {
        "question": "Bạn nhờ AI chỉnh giọng thư từ chối cho mềm hơn. Điều gì phải giữ nguyên?",
        "options": [
          "Nội dung quy định và điều kiện, chỉ đổi cách diễn đạt",
          "Độ dài của thư, vì thư ngắn hơn thì quy định nghe cũng nhẹ hơn với khách",
          "Lời hứa cuối thư, vì AI đã cân nhắc kỹ để khách hài lòng nhất có thể",
          "Tên cơ sở và chữ ký, còn nội dung quy định thì AI muốn diễn đạt lại thế nào cũng được"
        ],
        "correct": 0,
        "explanation": "Chỉnh giọng là đổi cách nói, không đổi điều được và không được. Nếu AI đổi quy định thành thứ mềm hơn, khách hiểu rằng có thể xin được. Độ dài không phải điều cần giữ. Và một lời hứa do AI thêm vào không phải cam kết của cơ sở, bạn phải đọc soát từng câu."
      },
      {
        "question": "Khách nói: 'Lần trước tôi ở nơi khác họ cho được mà'. Nên trả lời thế nào?",
        "options": [
          "Cảm ơn khách đã chia sẻ, nhắc lại quy định ở đây và đưa lựa chọn khác",
          "Nói rằng nơi khác làm sai còn bên này đúng",
          "Đồng ý cho khách một lần để không so sánh nữa, những lần sau sẽ nói rõ hơn",
          "Chuyển đề tài sang việc khác như giờ ăn sáng để khách quên yêu cầu đang xin"
        ],
        "correct": 0,
        "explanation": "So sánh với nơi khác là cách khách thử xem quy định có mềm được không. Bạn không cần bàn về nơi khác, chỉ cần ôn hoà giữ quy định ở đây và đưa lựa chọn. Chê nơi khác là tranh cãi thừa. Đồng ý một lần tạo tiền lệ. Lảng sang việc khác thì khách sẽ quay lại hỏi lần nữa."
      },
      {
        "question": "Khi nào nên chuyển yêu cầu của khách sang chủ cơ sở hay quản lý?",
        "options": [
          "Khi khách xin ngoại lệ mà bạn không có quyền quyết định",
          "Khi khách nói to hoặc tỏ ra khó chịu",
          "Mọi lúc mà khách hỏi, để bạn khỏi phải chịu bất cứ trách nhiệm nào",
          "Chỉ khi khách doạ để lại đánh giá xấu, còn lại thì bạn tự quyết hết"
        ],
        "correct": 0,
        "explanation": "Chuyển lên khi việc vượt quyền của bạn, không phải vì khách to tiếng hay vì bạn muốn né trách nhiệm. Nếu chuyển mọi thứ, bạn không xử lý được việc nào. Và đánh giá xấu không phải tiêu chí quyết định ai có quyền: quy định quyết việc đó."
      }
    ],
    "keyTakeaways": [
      "Hỏi nhu cầu thật của khách trước khi từ chối.",
      "Từ chối bằng quy định ngắn, kèm lựa chọn hợp lệ khác.",
      "AI chỉnh giọng, bạn giữ nội dung quy định.",
      "Không so sánh với nơi khác, không tranh luận.",
      "Việc vượt quyền của bạn thì chuyển cho người quyết định."
    ],
    "practicePrompt": {
      "question": "AI viết lại thư từ chối cho êm hơn và thêm câu 'lần này chúng tôi sẽ châm chước'. Bạn chưa hề định châm chước. Bạn làm gì?",
      "options": [
        "Xoá câu đó, vì quy định do bạn giữ chứ không phải AI quyết",
        "Giữ lại vì câu này làm thư nghe thân thiện và dễ được khách chấp nhận hơn",
        "Đổi thành câu 'có thể sẽ châm chước' để vừa mềm vừa chưa cam kết hẳn",
        "Hỏi lại AI xem có nên châm chước không rồi làm theo câu trả lời"
      ],
      "correct": 0,
      "explanation": "Châm chước là một quyết định, và nó thuộc về bạn hoặc chủ cơ sở. Câu AI thêm vào biến thư từ chối thành lời hứa. Giữ lại cho thân thiện làm khách hiểu rằng xin là được. 'Có thể sẽ' khiến khách hy vọng và hỏi lại. Hỏi AI không thay được người có thẩm quyền."
    },
    "summary": {
      "keyIdea": "Từ chối được khách khi câu từ chối có lý do ngắn và một lối ra khác.",
      "formula": "Nhu cầu thật + quy định một câu + lựa chọn hợp lệ = từ chối mà khách vẫn ở lại.",
      "commonMistake": "Nhờ AI làm mềm thư rồi quên soát: AI thêm cả lời hứa mà bạn không định cho.",
      "action": "Chọn một quy định khách hay xin ngoại lệ và soạn câu từ chối kèm hai lựa chọn."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn quy định mà khách ở chỗ bạn hay xin ngoại lệ nhất (thêm người, trả phòng muộn, mang thú cưng). Viết ra: quy định, lý do ngắn, hai lựa chọn hợp lệ. Nhờ AI chỉnh giọng thành ba câu mẫu, rồi đối chiếu từng câu xem AI có thêm lời hứa nào không.",
      "secondary": "Nếu chưa chắc quy định ghi đâu, hỏi chủ cơ sở trước khi nhờ AI soạn."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Từ chối một khách không có nghĩa là mất khách. Bài này giúp bạn từ chối bằng một lý do ngắn và một lối ra khác, còn AI giúp câu chữ nhẹ nhàng mà không đổi quy định."
      },
      {
        "type": "feynman",
        "title": "Từ chối lịch sự đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới người phục vụ ở quán khi hết món khách gọi. Họ không nói không có rồi im lặng. Họ nói món đó hết rồi, nhưng có món này gần giống, anh chị dùng thử không. Từ chối kèm gợi ý thì khách vẫn vui.",
        "columns": [
          "Thành phần",
          "Quán ăn hết món",
          "Quầy khách sạn"
        ],
        "rows": [
          [
            "Nói rõ việc",
            "Món này hết rồi ạ",
            "Bên em chỉ nhận người đã đăng ký ạ"
          ],
          [
            "Lý do ngắn",
            "Bếp làm hết từ trưa",
            "Để đảm bảo an toàn và đăng ký lưu trú"
          ],
          [
            "Lựa chọn khác",
            "Món gần giống, giá tương đương",
            "Thêm giường phụ hoặc phòng liền kề"
          ],
          [
            "Ai quyết",
            "Bếp trưởng",
            "Chủ cơ sở hoặc quản lý"
          ]
        ],
        "oneLiner": "Nói không kèm lối ra khác, bằng một câu ngắn - AI giúp chỉnh giọng, còn nội dung quy định vẫn của bạn."
      },
      {
        "type": "heading",
        "text": "Yêu cầu và nhu cầu là hai chuyện khác nhau"
      },
      {
        "type": "paragraph",
        "text": "Khách xin thêm hai người ngủ chung phòng. Đó là yêu cầu. Nhu cầu phía sau có thể là đi nhóm bốn người và không muốn tốn nhiều tiền. Khi bạn hiểu nhu cầu, bạn có thể đề xuất phòng bốn giường hoặc phòng phụ giá thấp hơn, những thứ không phá quy định."
      },
      {
        "type": "flow",
        "title": "Từ yêu cầu trái quy định tới một lựa chọn hợp lệ",
        "steps": [
          {
            "label": "Nghe và hỏi nhu cầu",
            "detail": "Hỏi: anh chị đi mấy người, cần ở bao lâu. Đừng từ chối trước khi nghe hết."
          },
          {
            "label": "Nói quy định bằng một câu",
            "detail": "Ví dụ: bên em phải đăng ký mọi người ở. Không dài dòng, không trách khách."
          },
          {
            "label": "Đưa hai lựa chọn hợp lệ",
            "detail": "Nêu ra thứ bạn thật sự làm được, như thêm giường phụ hoặc đặt thêm phòng. Khách được chọn thì thấy mình có quyền."
          },
          {
            "label": "Chuyển nếu vượt quyền",
            "detail": "Khách vẫn xin ngoại lệ thì nói bạn sẽ hỏi người có quyền và cho khách biết kết quả sớm nhất."
          },
          {
            "label": "Ghi lại",
            "detail": "Ghi yêu cầu, lựa chọn khách chọn, để lần sau xử lý nhất quán."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI chỉnh giọng thư từ chối",
        "task": "Bạn cần từ chối yêu cầu thêm người ở không đăng ký. Lắp prompt để AI chỉnh giọng thư mà không đổi quy định.",
        "parts": [
          {
            "id": "rule",
            "label": "Quy định cần giữ",
            "options": [
              {
                "text": "Từ chối giúp tôi, viết sao cho khách dễ chịu.",
                "feedback": "Không nói quy định là gì, AI tự chế ra lý do, có thể là điều cơ sở chưa hề quy định."
              },
              {
                "text": "Quy định: mọi người ở phải đăng ký trước. Giữ nguyên điều này, không thêm ngoại lệ.",
                "good": true,
                "feedback": "AI biết chính xác điều không được đổi và chỉ có việc chỉnh cách nói."
              }
            ]
          },
          {
            "id": "alt",
            "label": "Lựa chọn khác",
            "options": [
              {
                "text": "Tuỳ AI nghĩ ra cách giúp khách.",
                "feedback": "AI có thể đề xuất giường phụ hay giảm giá mà cơ sở không có, làm khách hy vọng vào thứ không tồn tại."
              },
              {
                "text": "Đề xuất hai lựa chọn có thật: giường phụ có phí hoặc đặt thêm phòng liền kề nếu còn.",
                "good": true,
                "feedback": "Lựa chọn là thứ cơ sở làm được, nên thư có lối ra cụ thể."
              }
            ]
          },
          {
            "id": "tone",
            "label": "Giọng và độ dài",
            "options": [
              {
                "text": "Viết thật trang trọng và dài để khách thấy được tôn trọng.",
                "feedback": "Thư dài trang trọng thường khiến khách thấy xa cách và khó tìm ra điều chính cần biết."
              },
              {
                "text": "Dưới 80 chữ, giọng ấm, xưng em - anh/chị, câu đầu ghi nhận mong muốn của khách.",
                "good": true,
                "feedback": "Ngắn, ấm, đọc lướt cũng hiểu, và bắt đầu bằng việc lắng nghe."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "rule",
              "alt",
              "tone"
            ],
            "text": "Chào anh, em hiểu nhóm mình muốn ở chung cho tiện ạ. Bên em cần đăng ký tất cả mọi người ở nên chưa thể thêm người ngoài số đã đặt. Anh có thể chọn giường phụ có phí hoặc thêm một phòng liền kề nếu còn trống. Em giữ giúp anh phương án nào ạ?"
          },
          {
            "requires": [
              "rule"
            ],
            "text": "Chào anh, mọi người ở phải đăng ký nên em chưa thể thêm được. Tuy vậy em sẽ giảm 20% cho nhóm và tặng thêm bữa sáng để anh thông cảm.\n\n(Quy định giữ đúng nhưng AI tự thêm giảm giá và bữa sáng, hai điều cơ sở chưa duyệt.)"
          },
          {
            "text": "Kính gửi Quý khách, rất tiếc chúng tôi không thể đáp ứng yêu cầu này. Chúng tôi luôn tuân thủ nghiêm ngặt mọi quy định và mong Quý khách thông cảm.\n\n(Nghe lạnh và không cho khách lối ra nào.)"
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Từ chối kèm lối ra",
          "text": "Nêu quy định ngắn, đưa hai lựa chọn khác. Khách thấy được phục vụ và có thể quyết ngay. Cơ sở giữ được quy định và giữ được khách."
        },
        "right": {
          "label": "Từ chối cộc lốc hoặc đồng ý cho êm",
          "text": "Cộc lốc thì khách bỏ đi hoặc để lại đánh giá xấu. Đồng ý cho êm thì quy định thành chữ trên giấy, và lần sau khách nào cũng xin theo."
        }
      },
      {
        "type": "callout",
        "label": "Quy định liên quan luật thì hỏi người có chuyên môn",
        "text": "Chuyện đăng ký lưu trú, số người tối đa hay an toàn phòng cháy có thể gắn với quy định của địa phương. Đừng nhờ AI kết luận điều gì được hay không. Hỏi chủ cơ sở hoặc bộ phận pháp chế, rồi ghi quy định thành câu ngắn để cả quầy nói giống nhau."
      },
      {
        "type": "scenario",
        "title": "Nhóm bốn người, đặt phòng hai người",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Khách đặt phòng cho hai người, đến nơi kéo theo hai bạn nữa và hỏi có cho ở chung không. Cơ sở quy định người ở phải đăng ký. Còn một phòng đôi trống.",
            "choices": [
              {
                "label": "Hỏi nhóm định ở mấy đêm và ngủ cách nào rồi nêu quy định kèm lựa chọn",
                "next": "s2"
              },
              {
                "label": "Cho ở luôn, đừng ghi tên hai bạn thêm để đỡ mất thời gian",
                "next": "bad_skip"
              }
            ]
          },
          "bad_skip": {
            "text": "Đêm đó có việc cần xác nhận người lưu trú, nhưng tên hai bạn không có trong sổ. Bạn và cơ sở bị nhắc nhở vì quy định đăng ký.",
            "ending": "bad"
          },
          "s2": {
            "text": "Nhóm nói họ muốn tiết kiệm và ở hai đêm. Bạn có hai lựa chọn hợp lệ.",
            "choices": [
              {
                "label": "Đề xuất thêm phòng đôi còn trống và ghi tên tất cả người ở",
                "next": "good"
              },
              {
                "label": "Từ chối thẳng và nói không có cách nào khác",
                "next": "bad_cold"
              }
            ]
          },
          "bad_cold": {
            "text": "Nhóm bỏ đi tìm nơi khác dù bạn còn phòng trống. Cơ sở mất hai đêm doanh thu vì một câu từ chối không có lối ra.",
            "ending": "bad"
          },
          "good": {
            "text": "Nhóm chọn thêm phòng đôi. Bạn ghi đủ bốn tên, khách hài lòng vì được giúp chứ không bị từ chối, và cơ sở có thêm doanh thu hợp lệ.",
            "ending": "good"
          }
        }
      },
      {
        "type": "scenario",
        "title": "Khi khách nhờ AI trong thư trả lời",
        "start": "a1",
        "nodes": {
          "a1": {
            "text": "AI vừa viết xong thư từ chối và chèn thêm câu 'lần này chúng tôi sẽ miễn phí phòng phụ'. Bạn chưa hỏi chủ cơ sở về điều đó.",
            "choices": [
              {
                "label": "Gửi luôn, AI viết hợp lý và khách sẽ vui",
                "next": "bad_send"
              },
              {
                "label": "Xoá câu miễn phí, hỏi chủ trước khi hứa bất cứ điều gì",
                "next": "good"
              }
            ]
          },
          "bad_send": {
            "text": "Khách nhận thư, mừng rỡ mang theo cả nhóm. Chủ cơ sở thấy hoá đơn có phòng phụ miễn phí thì không đồng ý, và bạn phải xin lỗi khách vì thất hứa.",
            "ending": "bad"
          },
          "good": {
            "text": "Bạn hỏi chủ và được trả lời chỉ giảm nửa giá phòng phụ. Bạn sửa thư đúng con số đó, khách vui vì lời hứa là thật.",
            "ending": "good"
          }
        }
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Chọn một quy định khách hay xin ngoại lệ ở nơi bạn.",
          "Bước 2 - Viết quy định bằng một câu và hai lựa chọn hợp lệ.",
          "Bước 3 - Nhờ AI chỉnh giọng, cấm thêm lời hứa.",
          "Bước 4 - Đọc từng câu xem AI có thêm điều gì cơ sở chưa duyệt."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Từ chối tốt là một quy định giữ nguyên và một lối ra khác cho khách.",
          "Bài sau: thư xin lỗi do AI viết nghe có thật lòng không."
        ]
      }
    ]
  },
  {
    "track": "personal",
    "isFundamental": false,
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "id": 2117,
    "slug": "soat-thu-xin-loi-co-that-long",
    "title": "Chặng 35, Bài 18: Thư xin lỗi khách này nghe có thật lòng không",
    "subtitle": "Thư xin lỗi khuôn mẫu thì khách đọc ra ngay: tập sửa thành thư có sự việc, việc đã làm và điều sẽ đổi.",
    "emoji": "💌",
    "whyItMatters": "Thư xin lỗi do AI viết thường trơn tru nhưng nghe như thư mẫu: không nhắc việc cụ thể, hứa những điều chưa chắc làm được. Khách đọc là biết. Bạn học cách soát thư theo ba câu hỏi: đã nêu sự việc thật chưa, đã nói việc đã làm chưa, và lời hứa nào có người chịu trách nhiệm.",
    "openingQuestion": "Bạn nhờ AI viết thư xin lỗi khách vì phòng chưa dọn kịp. Thư bắt đầu: 'Chúng tôi xin chân thành xin lỗi về mọi bất tiện.' Điều gì đáng lo nhất?",
    "openingOptions": [
      "Không nêu phòng nào, giờ nào, nên khách thấy như thư mẫu",
      "Thư dùng từ trang trọng nên khách sẽ thấy xa cách và khó gần",
      "Thư quá ngắn so với thư xin lỗi khác",
      "AI không được phép viết thư xin lỗi thay cho nhân viên cơ sở"
    ],
    "correctOption": 0,
    "explanation": "Khách nhận ra một thư có thật lòng hay không qua việc nó có nhắc điều cụ thể của họ không. Câu xin lỗi mọi bất tiện dùng được cho mọi khách nên chẳng chứng tỏ bạn biết chuyện gì đã xảy ra. Từ trang trọng chỉ là vấn đề phụ. Độ dài không quyết định độ chân thành. Và AI được phép hỗ trợ soạn thư, miễn bạn soát nội dung và chịu trách nhiệm.",
    "diagram": [
      {
        "label": "AI viết bản nháp thư xin lỗi",
        "arrow": true
      },
      {
        "label": "Bạn gạch câu chung chung và lời hứa chưa chắc",
        "arrow": true
      },
      {
        "label": "Thêm sự việc thật, việc đã làm, điều sẽ đổi",
        "arrow": true
      },
      {
        "label": "Bạn ký tên và chịu trách nhiệm về từng lời hứa"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một homestay có khách đến sớm nhưng phòng chưa dọn xong vì ca trước báo thiếu người. Bản nháp AI viết chỉ nói xin lỗi vì bất tiện. Chủ homestay sửa lại: nêu đúng phòng 3 chưa dọn kịp lúc 12 giờ, nói đã mời khách uống trà chờ, và cam kết từ tuần sau báo sớm lịch dọn phòng cho ca trực. Khách hồi âm cảm ơn."
    },
    "quiz": [
      {
        "question": "Câu nào cho thấy thư xin lỗi thật lòng hơn?",
        "options": [
          "Phòng 3 chưa dọn kịp lúc 12 giờ nên anh chị phải chờ ngoài quầy, em xin lỗi ạ",
          "Em xin lỗi vì tình huống chưa như mong đợi, mong anh chị thông cảm",
          "Em xin lỗi vì tình huống chưa như mong đợi, mong anh chị thông cảm cho bên em nhé, lần sau sẽ tốt hơn",
          "Cơ sở luôn đặt khách lên hàng đầu và xin lỗi chuyện này"
        ],
        "correct": 0,
        "explanation": "Thư thật lòng nêu đúng việc, phòng nào, giờ nào, ảnh hưởng ra sao. Ba câu kia đều dùng được cho mọi khách nên khách nghe ra thư mẫu. Riêng câu về tình huống chưa như mong đợi không nói rõ điều gì xảy ra, còn câu hàng đầu là khẩu hiệu chứ không phải lời xin lỗi."
      },
      {
        "question": "Thư có câu 'chúng tôi sẽ không bao giờ để chuyện này xảy ra nữa'. Nên làm gì?",
        "options": [
          "Thay bằng một việc cụ thể sẽ đổi, do bạn thật sự làm được",
          "Giữ nguyên vì càng cam kết mạnh khách càng tin lời xin lỗi là thật",
          "Bỏ hết mọi lời hứa vì xin lỗi mà có hứa thì lúc nào cũng rủi ro",
          "Nhờ AI viết lời hứa mạnh hơn nữa, cam kết cả ba tháng tới không lặp lại"
        ],
        "correct": 0,
        "explanation": "Không bao giờ nữa là lời hứa không ai giữ được. Nó dễ thành nói dối lần hai khi việc lặp lại. Việc cụ thể (báo lịch dọn cho ca trực) kiểm chứng được. Bỏ hết lời hứa làm thư thiếu phần hướng tới. Hứa mạnh hơn thì càng khó giữ."
      },
      {
        "question": "Bản nháp AI viết có câu 'chúng tôi đã sa thải nhân viên gây lỗi'. Bạn nên làm gì?",
        "options": [
          "Xoá câu đó vì nó bịa việc chưa hề xảy ra và không nên nói với khách",
          "Giữ lại để khách thấy cơ sở xử lý nghiêm và biết chuyện được coi trọng",
          "Đổi sang sa thải một phần, vì như vậy nghe nhẹ hơn nhưng vẫn nghiêm",
          "Nhờ AI cho biết nhân viên nào gây ra lỗi để điền tên vào thư"
        ],
        "correct": 0,
        "explanation": "AI có thể bịa những việc tưởng như xử lý mạnh tay. Không có ai bị sa thải thì đó là thông tin sai gửi cho khách. Thay đổi mức độ vẫn là bịa. AI không biết nhân viên nào gây lỗi vì nó không có dữ liệu của cơ sở bạn. Và chuyện nhân sự không nên nói với khách."
      },
      {
        "question": "Ba thứ nên có trong một thư xin lỗi tốt là gì?",
        "options": [
          "Sự việc cụ thể, việc đã làm ngay và điều sẽ đổi",
          "Lời xin lỗi thật dài, lời hứa mạnh và một món quà tặng khách",
          "Lý do cơ sở không có lỗi, lời xin lỗi ngắn và lời cảm ơn khách",
          "Tên nhân viên gây lỗi, hình phạt và cam kết không lặp lại nữa"
        ],
        "correct": 0,
        "explanation": "Sự việc cụ thể cho thấy bạn hiểu chuyện, việc đã làm cho thấy bạn hành động và điều sẽ đổi cho thấy bạn học được. Xin lỗi dài kèm quà không phải lúc nào cũng cần. Giải thích cơ sở không có lỗi là chống chế. Nêu tên nhân viên hay hình phạt là chuyện nội bộ không nên gửi khách."
      },
      {
        "question": "Trước khi gửi thư xin lỗi do AI viết, bước kiểm nào đáng làm nhất?",
        "options": [
          "Đối chiếu từng sự việc và lời hứa trong thư với điều thật đã xảy ra",
          "Nhờ AI đọc lại thư và tự cho điểm độ chân thành từ một đến mười",
          "Đọc kỹ chính tả và dấu câu, vì lỗi chính tả làm khách nghĩ thiếu thật lòng",
          "Gửi trước cho vài đồng nghiệp bình chọn bản nào nghe hay hơn rồi gửi"
        ],
        "correct": 0,
        "explanation": "Rủi ro lớn nhất là AI viết điều không đúng sự thật hay lời hứa chưa được duyệt, và chỉ bạn biết sự thật. AI tự chấm điểm chân thành thì chấm theo văn phong chứ không theo sự việc. Chính tả quan trọng nhưng không phải điểm rủi ro chính. Bình chọn chỉ chọn cái nghe hay, không kiểm tra cái đúng."
      }
    ],
    "keyTakeaways": [
      "Thư thật lòng nêu đúng sự việc của khách này.",
      "Nói việc đã làm và một điều sẽ đổi mà bạn giữ được.",
      "AI hay bịa việc xử lý mạnh tay hoặc lời hứa lớn, hãy gạch.",
      "Không giải thích để chống chế, không nêu chuyện nhân sự.",
      "Bạn ký tên nên bạn đối chiếu sự thật."
    ],
    "practicePrompt": {
      "question": "Bản nháp AI viết: 'Chúng tôi xin lỗi vì sự cố và đã hoàn tiền toàn bộ.' Thực tế bạn chưa hoàn tiền. Cách xử lý đúng là gì?",
      "options": [
        "Sửa thành đúng việc đã làm, hoặc bỏ câu nếu chưa có gì để nói",
        "Gửi luôn, sau đó làm hoàn tiền cho khớp với thư đã gửi cho khách",
        "Đổi thành sẽ hoàn tiền trong thời gian sớm nhất để nghe mềm hơn",
        "Nhờ AI xác nhận giúp thư đã đúng sự thật rồi mới gửi cho khách"
      ],
      "correct": 0,
      "explanation": "Thư chỉ được nói điều đã xảy ra hoặc điều bạn thật sự sẽ làm. Câu hoàn tiền là điều AI bịa ra. Gửi trước rồi làm sau đặt bạn vào thế bị ép. Sẽ hoàn sớm nhất vẫn là lời hứa chưa ai duyệt. AI không có dữ liệu để xác nhận sự thật."
    },
    "summary": {
      "keyIdea": "Thư xin lỗi thật lòng nằm ở chi tiết đúng, không phải ở từ trang trọng.",
      "formula": "Sự việc cụ thể + việc đã làm + một điều sẽ đổi giữ được = thư đọc lên thấy thật.",
      "commonMistake": "Gửi bản nháp trơn tru của AI mà không soát xem điều nó tả có thật hay không.",
      "action": "Lấy một thư xin lỗi cũ của cơ sở và gạch các câu ai đọc cũng dùng được."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Tìm một thư hay tin nhắn xin lỗi khách mà cơ sở của bạn từng gửi, hoặc nhờ AI viết một bản cho tình huống phòng chưa dọn kịp. Dùng bút gạch hai loại câu: câu chung chung ai đọc cũng dùng được, và câu là lời hứa chưa chắc giữ được. Viết lại thành ba câu: sự việc, việc đã làm, một điều sẽ đổi.",
      "secondary": "Lưu bản sửa vào sổ mẫu của quầy, ghi rõ chỗ nào phải điền lại từng lần."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Một thư xin lỗi chỉ có giá trị khi khách thấy người viết biết chuyện gì đã xảy ra. Bài này tập soát thư AI viết theo ba câu hỏi để biến một thư khuôn mẫu thành thư thật lòng."
      },
      {
        "type": "feynman",
        "title": "Thư xin lỗi thật lòng đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới lời xin lỗi của một người bạn khi họ đến muộn buổi hẹn. Nghe xin lỗi vì đã để bạn chờ 30 phút ở quán cà phê thì bạn thấy được tôn trọng. Nghe xin lỗi vì mọi bất tiện thì bạn thấy họ đọc cho xong.",
        "columns": [
          "Thứ",
          "Lời xin lỗi thật",
          "Lời xin lỗi khuôn mẫu"
        ],
        "rows": [
          [
            "Nêu việc",
            "Để bạn chờ 30 phút ở quán",
            "Về mọi bất tiện"
          ],
          [
            "Việc đã làm",
            "Đã gọi món cho bạn trong lúc chờ",
            "Không nói"
          ],
          [
            "Điều sẽ đổi",
            "Lần sau đi sớm hơn 15 phút",
            "Sẽ không bao giờ tái diễn"
          ],
          [
            "Cảm giác của người nghe",
            "Được tôn trọng",
            "Bị đọc cho xong"
          ]
        ],
        "oneLiner": "Nêu đúng việc, nói việc đã làm, hứa điều giữ được - AI viết nháp, bạn soát từng chi tiết."
      },
      {
        "type": "heading",
        "text": "Vì sao thư trơn tru của AI lại dễ hỏng"
      },
      {
        "type": "paragraph",
        "text": "AI viết những câu thường thấy trong thư xin lỗi nên bản nháp nghe rất chuyên nghiệp. Nhưng nó không biết phòng nào chưa dọn hay ai đã nói gì với khách. Để lấp chỗ trống, nó hoặc viết chung chung, hoặc bịa thêm việc đã làm. Cả hai đều làm thư kém tin cậy."
      },
      {
        "type": "flow",
        "title": "Soát một thư xin lỗi trước khi gửi",
        "steps": [
          {
            "label": "Đọc và gạch câu chung chung",
            "detail": "Câu nào dán vào thư cho khách khác vẫn dùng được thì gạch. Ví dụ: xin lỗi về mọi bất tiện."
          },
          {
            "label": "Kiểm việc đã làm có thật không",
            "detail": "Mỗi câu nói cơ sở đã làm gì đều phải khớp với thực tế. Chưa làm thì bỏ hoặc làm ngay rồi mới viết."
          },
          {
            "label": "Kiểm lời hứa có ai chịu trách nhiệm",
            "detail": "Lời hứa nào không rõ ai giữ, hoặc quá lớn như không bao giờ, thì thay bằng một việc nhỏ có người làm."
          },
          {
            "label": "Thêm sự việc cụ thể",
            "detail": "Ghi phòng nào, giờ nào, khách chờ bao lâu. Chi tiết đúng là thứ AI không tự biết."
          },
          {
            "label": "Ký tên và gửi",
            "detail": "Bạn là người ký, nên bạn chịu trách nhiệm cho từng câu."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Soát thư xin lỗi khách chờ phòng",
        "task": "AI viết thư xin lỗi khách phải chờ phòng ở quầy. Chạm vào những đoạn cần gạch hoặc sửa trước khi gửi.",
        "segments": [
          {
            "text": "Chào anh Long, em xin lỗi vì phòng 3 chưa dọn xong lúc 12 giờ nên anh chị phải chờ ở quầy gần một tiếng."
          },
          {
            "text": "Chúng tôi xin chân thành xin lỗi về mọi sự bất tiện mà Quý khách có thể đã gặp phải.",
            "error": "Câu chung chung, dán cho khách nào cũng được. Nó không nhắc gì tới việc thật nên khách thấy thư mẫu."
          },
          {
            "text": "Trong lúc chờ, em đã mời anh chị trà và giữ hành lý ở quầy."
          },
          {
            "text": "Chúng tôi đã sa thải nhân viên phụ trách dọn phòng và cam kết chuyện này sẽ không bao giờ xảy ra nữa.",
            "error": "Bịa việc chưa hề xảy ra, và chuyện nhân sự không nên nói với khách. Lời không bao giờ nữa không ai giữ được."
          },
          {
            "text": "Từ tuần sau, quầy sẽ nhận lịch dọn phòng từ ca sáng trước 10 giờ để báo sớm cho khách đến sớm."
          },
          {
            "text": "Để bù đắp, cơ sở xin hoàn lại 100% tiền phòng đêm nay cho anh chị.",
            "error": "Lời hoàn tiền là AI tự thêm, chủ cơ sở chưa duyệt. Gửi đi thì thành cam kết thật."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Thư có sự việc, việc đã làm, điều sẽ đổi",
          "text": "Khách đọc thấy đúng chuyện của mình. Từng câu kiểm được với thực tế. Lời hứa nhỏ, có người làm. Thư ngắn nhưng nặng ký."
        },
        "right": {
          "label": "Thư khuôn mẫu trơn tru",
          "text": "Ai đọc cũng thấy giống thư gửi khách khác. Dễ lẫn những việc bịa và lời hứa lớn. Khách nhận ra ngay và mất niềm tin thay vì được xoa dịu."
        }
      },
      {
        "type": "callout",
        "label": "Đừng nhờ AI đoán điều đã xảy ra",
        "text": "AI không có tin nhắn hay ghi chép của cơ sở bạn nên không biết ai làm gì. Bạn đưa sự việc thật vào prompt: phòng nào, giờ nào, việc đã làm. Nếu chuyện liên quan tới bồi thường, hỏi chủ cơ sở. Chuyện liên quan tới sức khoẻ hay pháp lý, hỏi chuyên gia."
      },
      {
        "type": "scenario",
        "title": "Sửa thư trước khi gửi",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "AI viết xong thư. Bạn thấy nó nghe rất chuyên nghiệp và có câu hứa hoàn tiền toàn bộ. Khách đang chờ thư trả lời.",
            "choices": [
              {
                "label": "Gửi luôn vì thư đã hay và khách đang chờ",
                "next": "bad_send"
              },
              {
                "label": "Đọc lại từng câu, đối chiếu với điều đã xảy ra",
                "next": "s2"
              }
            ]
          },
          "bad_send": {
            "text": "Khách đọc thư và gửi lại ngay: vậy khi nào tôi nhận được tiền hoàn? Bạn không có câu trả lời, vì chủ chưa duyệt hoàn tiền.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bạn thấy hai câu đáng ngờ: câu hoàn tiền và câu không bao giờ tái diễn.",
            "choices": [
              {
                "label": "Xoá câu hoàn tiền, thay câu không bao giờ bằng việc báo lịch dọn sớm hơn",
                "next": "good"
              },
              {
                "label": "Đổi hoàn toàn bộ thành hoàn một phần cho nghe vừa phải",
                "next": "bad_part"
              }
            ]
          },
          "bad_part": {
            "text": "Một phần là bao nhiêu? Khách hỏi lại con số, và bạn vẫn chưa được chủ duyệt nên không trả lời được.",
            "ending": "bad"
          },
          "good": {
            "text": "Thư mới nêu đúng phòng 3, giờ chờ, việc mời trà và điều sẽ đổi. Khách trả lời cảm ơn và nói sẽ quay lại.",
            "ending": "good"
          }
        }
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Lấy một thư xin lỗi bạn từng gửi hoặc nhờ AI viết một bản.",
          "Bước 2 - Gạch câu chung chung và câu hứa chưa chắc.",
          "Bước 3 - Viết lại: sự việc, việc đã làm, một điều sẽ đổi.",
          "Bước 4 - Đối chiếu từng câu với điều thật rồi mới gửi."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Thư xin lỗi thật lòng là thư đúng sự việc, đúng việc đã làm, đúng lời hứa.",
          "Bài sau: mini-dự án lập checklist cho tuần đông khách nhất."
        ]
      }
    ]
  },
  {
    "track": "personal",
    "isFundamental": false,
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "id": 2118,
    "slug": "mini-du-an-checklist-mua-cao-diem",
    "title": "Chặng 35, Bài 19: Mini-dự án: checklist cho tuần đông khách nhất",
    "subtitle": "Trước, trong và sau tuần đông nhất: một danh sách có người phụ trách, và AI đóng vai khách khó để thử lại.",
    "emoji": "✅",
    "whyItMatters": "Tuần đông khách là lúc mọi việc nhỏ đều thành việc gấp: phòng chưa dọn, câu trả lời mẫu thiếu, nhân sự thiếu. Một checklist làm trước giúp bạn khỏi nhớ bằng đầu. Bài này dựng checklist theo ba giai đoạn, rồi nhờ AI đóng vai khách khó để thử xem danh sách có đứng vững không.",
    "openingQuestion": "Còn hai tuần nữa tới kỳ nghỉ lễ, cơ sở kín phòng. Bạn định chuẩn bị bằng cách nhớ trong đầu những việc cần làm. Rủi ro lớn nhất của cách đó là gì?",
    "openingOptions": [
      "Việc bị quên hoặc không ai nhận, chỉ lộ ra khi đã quá đông",
      "Bạn sẽ phải nhớ quá nhiều nên thấy căng thẳng suốt hai tuần",
      "Nhân viên sẽ nghĩ bạn không tin tưởng họ trong lúc chuẩn bị",
      "AI sẽ giận vì không được dùng để nhắc việc thay cho bạn cả hai tuần"
    ],
    "correctOption": 0,
    "explanation": "Việc nhớ trong đầu không có người nhận và không có hạn, nên đến khi khách đông mới lộ ra chỗ thiếu. Cảm giác căng thẳng có thật nhưng không phải rủi ro chính. Nhân viên thường thấy dễ chịu hơn khi có danh sách rõ ràng. Và AI không có cảm xúc, nó chỉ giúp bạn soạn danh sách chứ không nhận việc thay bạn.",
    "diagram": [
      {
        "label": "Liệt kê việc cần làm theo ba giai đoạn: trước, trong, sau",
        "arrow": true
      },
      {
        "label": "Mỗi việc có người phụ trách và hạn cụ thể",
        "arrow": true
      },
      {
        "label": "Nhờ AI đóng vai khách khó để thử danh sách",
        "arrow": true
      },
      {
        "label": "Sửa chỗ thiếu rồi in ra dán ở quầy"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một homestay 10 phòng chuẩn bị cho dịp nghỉ lễ. Chủ liệt kê việc ở ba giai đoạn: trước lễ (kiểm điều hoà, in sổ câu mẫu, chốt lịch ca), trong lễ (họp 5 phút mỗi sáng, ai nghỉ trưa lúc nào) và sau lễ (ghi lại điều gì chưa ổn). Chủ nhờ AI đóng vai khách đến sớm khi phòng chưa dọn để thử câu trả lời mẫu, rồi sửa hai câu chưa ổn."
    },
    "quiz": [
      {
        "question": "Việc nào nên nằm ở phần 'trước mùa cao điểm' của checklist?",
        "options": [
          "Kiểm điều hoà, chốt lịch ca và in sổ câu trả lời mẫu",
          "Họp nhanh 5 phút mỗi sáng để nhắc việc trong ngày",
          "Họp nhanh 5 phút mỗi sáng để nhắc mọi người việc trong ngày",
          "Gửi thư cảm ơn khách đã ở lại và hỏi ý kiến về kỳ nghỉ vừa rồi"
        ],
        "correct": 0,
        "explanation": "Trước mùa là những việc chuẩn bị mà đến lúc đông không còn thời gian làm. Ghi điều chưa ổn và gửi thư cảm ơn là việc sau mùa. Họp 5 phút mỗi sáng là việc trong mùa. Xếp sai giai đoạn làm checklist khó dùng lúc cần."
      },
      {
        "question": "Mỗi mục trong checklist nên có thêm gì để không bị bỏ sót?",
        "options": [
          "Tên người phụ trách và hạn hoàn thành",
          "Một dòng mô tả thật dài để ai đọc cũng hiểu chi tiết từng bước",
          "Một biểu tượng màu để nhìn nhanh thấy việc nào quan trọng nhất",
          "Điểm ưu tiên do AI tự chấm dựa trên mức độ phổ biến của việc"
        ],
        "correct": 0,
        "explanation": "Việc không có người nhận thì ai cũng nghĩ người khác làm. Hạn giúp biết khi nào là trễ. Mô tả dài làm danh sách khó đọc lúc gấp. Biểu tượng màu chỉ là trang trí. Và điểm ưu tiên do AI chấm dựa vào cái phổ biến chứ không dựa vào cơ sở của bạn."
      },
      {
        "question": "Bạn nhờ AI đóng vai khách khó để thử câu trả lời mẫu. Lợi ích chính là gì?",
        "options": [
          "Bạn phát hiện chỗ câu mẫu thiếu hoặc nghe cứng trước khi gặp khách thật",
          "AI sẽ trực quầy thay bạn cả tuần đông nhất",
          "AI biết chính xác khách thật sẽ phản ứng thế nào, nên bạn khỏi cần thử lại",
          "Câu mẫu do AI thử qua sẽ tự động được công nhận là quy định của cơ sở"
        ],
        "correct": 0,
        "explanation": "Đóng vai là bản tập luyện: khách AI hỏi những điều làm bạn lộ ra câu mẫu thiếu. Nó không thay bạn trực quầy. Nó chỉ mô phỏng khách chứ không biết khách thật. Và câu mẫu chỉ thành quy định khi chủ cơ sở duyệt, không phải khi AI thử qua."
      },
      {
        "question": "AI đóng vai khách đòi giảm giá và câu mẫu của bạn không có phần này. Nên làm gì?",
        "options": [
          "Ghi thêm vào checklist mục giá và quyền giảm, hỏi chủ trước",
          "Bỏ qua vì khách thật sẽ không đòi giảm giá",
          "Bỏ qua vì khách thật sẽ không đòi giảm giá trong mùa cao điểm",
          "Đồng ý giảm nhẹ 5% cho mọi yêu cầu để câu mẫu nghe dễ chịu hơn"
        ],
        "correct": 0,
        "explanation": "Chỗ thiếu lộ ra khi đóng vai là điều bạn cần bổ sung, nhưng chính sách giá là của chủ, nên hỏi trước. AI tự viết chính sách là bịa quyền. Bỏ qua thì đến lúc thật bạn không có câu để nói. Giảm 5% là con số tự nghĩ ra, không ai duyệt."
      },
      {
        "question": "Sau tuần đông nhất, việc nào giúp lần sau tốt hơn?",
        "options": [
          "Ghi lại điều gì thiếu và điều gì thừa, cập nhật checklist",
          "Xoá checklist cũ đi để lần sau làm mới từ đầu cho khỏi bị ảnh hưởng",
          "Chỉ ghi những điều tốt để nhân viên thấy vui và có động lực tiếp",
          "Chỉ ghi khiếu nại vì việc khác ổn rồi"
        ],
        "correct": 0,
        "explanation": "Checklist tốt lên nhờ sau mỗi mùa ta sửa nó theo điều đã xảy ra. Xoá đi là mất kinh nghiệm. Chỉ ghi điều tốt bỏ sót đúng những chỗ cần sửa. AI viết lại mà không có ghi chép thì chỉ trả về một checklist chung chung."
      }
    ],
    "keyTakeaways": [
      "Chia checklist thành trước, trong, sau mùa cao điểm.",
      "Mỗi việc có người phụ trách và hạn cụ thể.",
      "Nhờ AI đóng vai khách khó để thử câu trả lời mẫu.",
      "Chỗ thiếu lộ ra khi thử, việc về giá và quyền thì hỏi chủ.",
      "Sau mùa, cập nhật checklist theo điều đã xảy ra."
    ],
    "practicePrompt": {
      "question": "AI viết checklist mùa cao điểm gồm 40 mục chung chung, không ai phụ trách. Bạn làm gì trước?",
      "options": [
        "Cắt còn những việc của cơ sở bạn và gán người, hạn cho từng việc",
        "In luôn 40 mục dán ở quầy vì AI đã liệt kê rất đầy đủ",
        "Nhờ AI thêm 20 mục nữa để không sót việc nào trong mùa",
        "Chia 40 mục đều cho mọi người, mỗi người nhận một phần bằng nhau"
      ],
      "correct": 0,
      "explanation": "Checklist dùng được là cái ngắn, đúng với cơ sở và có người nhận. 40 mục chung chung không ai phụ trách sẽ bị bỏ qua. Thêm mục làm danh sách dài hơn. Chia đều không xét ai đủ khả năng hay đủ thời gian làm việc nào."
    },
    "summary": {
      "keyIdea": "Checklist tốt có người phụ trách, hạn và được thử trước khi mùa cao điểm bắt đầu.",
      "formula": "Trước + trong + sau, mỗi việc có tên và hạn, thử bằng khách khó do AI đóng = danh sách đứng vững.",
      "commonMistake": "Nhờ AI liệt kê thật nhiều rồi tin rằng danh sách dài là danh sách đủ.",
      "action": "Viết checklist mười việc cho mùa đông khách kế tiếp của bạn, mỗi việc có tên và hạn."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn một tuần đông khách sắp tới (hoặc đã qua) ở nơi bạn làm. Viết mười việc ở ba giai đoạn trước, trong, sau, gán tên người và hạn cho từng việc. Nhờ AI đóng vai một khách đến sớm khi phòng chưa dọn để thử câu trả lời mẫu, rồi ghi hai chỗ cần bổ sung.",
      "secondary": "Hỏi chủ cơ sở về giá, ưu đãi và quyền quyết của bạn trước khi để AI viết thêm câu mẫu về những điều đó."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Tuần đông nhất là lúc thiếu thời gian nghĩ. Mini-dự án này dựng cho bạn một checklist ba giai đoạn và một buổi tập với khách khó do AI đóng, để chỗ thiếu lộ ra trước khi khách thật tới."
      },
      {
        "type": "feynman",
        "title": "Checklist đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới danh sách đi chợ trước ngày Tết. Bạn không nhớ hết bằng đầu, nên bạn ghi ra, chia ai mua gì, và soát lại trước khi đi. Checklist mùa cao điểm là danh sách đi chợ cho cơ sở của bạn.",
        "columns": [
          "Thành phần",
          "Danh sách đi chợ",
          "Checklist cao điểm"
        ],
        "rows": [
          [
            "Ghi ra",
            "Thịt, rau, gạo nếp",
            "Phòng, câu mẫu, lịch ca"
          ],
          [
            "Chia người",
            "Anh mua thịt, em mua rau",
            "Ai kiểm điều hoà, ai in sổ câu mẫu"
          ],
          [
            "Hạn",
            "Trước 28 Tết",
            "Trước 3 ngày khách đến"
          ],
          [
            "Soát lại",
            "Đối chiếu với giỏ hàng",
            "Thử bằng khách khó AI đóng"
          ]
        ],
        "oneLiner": "Ghi ra, chia người, đặt hạn và soát lại - AI giúp liệt kê và đóng vai thử, bạn quyết ai làm gì."
      },
      {
        "type": "heading",
        "text": "Ba giai đoạn, ba loại việc"
      },
      {
        "type": "paragraph",
        "text": "Trước mùa là việc chuẩn bị mà lúc đông sẽ không còn thời gian làm: kiểm phòng, in câu mẫu, chốt lịch ca. Trong mùa là việc giữ nhịp: họp nhanh mỗi sáng, ai nghỉ lúc nào. Sau mùa là việc ghi lại điều gì đã xảy ra để lần sau tốt hơn."
      },
      {
        "type": "flow",
        "title": "Dựng checklist cho tuần đông khách",
        "steps": [
          {
            "label": "Liệt kê việc theo ba giai đoạn",
            "detail": "Bạn nói với AI đặc điểm cơ sở (số phòng, số nhân sự, dịp lễ nào) và xin danh sách nháp mỗi giai đoạn."
          },
          {
            "label": "Cắt cho vừa cơ sở của bạn",
            "detail": "Bỏ việc không hợp, thêm việc chỉ bạn biết. Mười việc thật tốt hơn bốn mươi việc chung chung."
          },
          {
            "label": "Gán người và hạn",
            "detail": "Mỗi việc một tên và một ngày. Người nhận đồng ý thì mới ghi."
          },
          {
            "label": "Thử bằng khách khó do AI đóng",
            "detail": "Nhờ AI đóng vai khách đến sớm hay khách đòi giảm giá, bạn trả lời bằng câu mẫu để xem còn thiếu gì."
          },
          {
            "label": "Sửa và dán ở quầy",
            "detail": "Bổ sung chỗ thiếu, hỏi chủ về giá và quyền, rồi in ra."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI đóng vai khách khó",
        "task": "Bạn muốn thử câu trả lời mẫu bằng cách nhờ AI đóng vai một khách khó. Lắp prompt để buổi tập có ích.",
        "parts": [
          {
            "id": "role",
            "label": "Vai của AI",
            "options": [
              {
                "text": "Hãy làm khách hàng đi.",
                "feedback": "Quá chung: AI đóng một khách dễ tính hoặc bịa bối cảnh không giống cơ sở của bạn."
              },
              {
                "text": "Đóng vai khách đến sớm 3 tiếng, phòng chưa dọn, có hai trẻ nhỏ, đang mệt và hơi bực.",
                "good": true,
                "feedback": "Vai cụ thể nên AI hỏi những câu khó thật, đúng tình huống bạn sợ nhất trong mùa đông."
              }
            ]
          },
          {
            "id": "rule",
            "label": "Luật của buổi tập",
            "options": [
              {
                "text": "Cứ nói chuyện thoải mái, tôi trả lời sao cũng được.",
                "feedback": "Không có luật thì buổi tập trôi qua mà bạn không biết câu nào ổn, câu nào chưa."
              },
              {
                "text": "Mỗi lượt hỏi một điều thôi, đợi tôi trả lời, và cuối buổi nói ba chỗ câu trả lời của tôi còn thiếu.",
                "good": true,
                "feedback": "Từng lượt một giúp bạn nghĩ kịp, và phần nhận xét cuối buổi chỉ ra chỗ cần sửa."
              }
            ]
          },
          {
            "id": "limit",
            "label": "Giới hạn",
            "options": [
              {
                "text": "Nếu tôi không biết chính sách, cứ tự đặt chính sách giúp tôi.",
                "feedback": "AI bịa chính sách về giá và phòng, rồi bạn nhớ lầm là của cơ sở."
              },
              {
                "text": "Không tự đặt chính sách. Nếu khách hỏi điều tôi chưa có quy định, hãy ghi là 'cần hỏi chủ'.",
                "good": true,
                "feedback": "Chỗ chưa có quy định được ghi lại để hỏi chủ, thay vì bị AI lấp bằng điều bịa."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "role",
              "rule",
              "limit"
            ],
            "text": "Khách (đóng vai): Chào bạn, gia đình tôi đến sớm hơn dự kiến, có hai bé đang mệt. Phòng đã xong chưa?\n\n(Sau ba lượt) Nhận xét: 1) Bạn chưa nói giờ phòng sẵn sàng. 2) Bạn chưa đề xuất chỗ chờ cho trẻ nhỏ. 3) Khách hỏi giá gửi hành lý nhưng chưa có quy định, ghi: cần hỏi chủ."
          },
          {
            "requires": [
              "role"
            ],
            "text": "Khách: Tôi muốn nhận phòng ngay, không thì hoàn tiền và tặng thêm một đêm miễn phí vì phải chờ.\n\n(AI đóng đúng vai nhưng tự nghĩ ra yêu sách về hoàn tiền và đêm miễn phí, nên bạn tập trả lời cho một chính sách không có thật.)"
          },
          {
            "text": "Khách: Xin chào, tôi muốn đặt phòng. Giá bao nhiêu vậy? Cảm ơn bạn nhé!\n\n(Khách dễ tính, không phải tình huống khó nên bạn không học được gì mới.)"
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Checklist có người và hạn",
          "text": "Mỗi việc có tên và ngày, nên việc nào trễ là thấy ngay. Ngắn, đúng với cơ sở, và được thử bằng tình huống khó trước khi khách thật tới."
        },
        "right": {
          "label": "Danh sách dài AI liệt kê",
          "text": "Bốn mươi việc chung chung, không ai nhận. Nhiều việc không hợp với cơ sở bạn, nên dần dần không ai đọc. Đến lúc đông thì bị bỏ quên."
        }
      },
      {
        "type": "callout",
        "label": "Chỗ nào chưa có quy định thì ghi cần hỏi chủ",
        "text": "Khi đóng vai, AI sẽ hỏi những điều bạn chưa có câu trả lời, như giá gửi hành lý hay chính sách trả phòng muộn. Đừng để AI lấp chỗ trống. Ghi vào checklist là cần hỏi chủ cơ sở và giữ nguyên cho tới khi có câu trả lời thật."
      },
      {
        "type": "scenario",
        "title": "Hai tuần trước kỳ nghỉ lễ",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Cơ sở của bạn kín phòng trong kỳ nghỉ lễ. Bạn có hai tuần chuẩn bị và AI đã liệt kê 35 việc.",
            "choices": [
              {
                "label": "In cả 35 việc dán ở quầy, coi như đã chuẩn bị xong",
                "next": "bad_long"
              },
              {
                "label": "Chọn mười việc đúng với cơ sở, gán tên và hạn cho từng việc",
                "next": "s2"
              }
            ]
          },
          "bad_long": {
            "text": "Không ai đọc hết 35 việc. Đến ngày đông nhất, chưa ai kiểm điều hoà phòng 6 và câu trả lời mẫu vẫn chưa có.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bạn có checklist mười việc. Còn một ngày để thử.",
            "choices": [
              {
                "label": "Nhờ AI đóng vai khách đến sớm, ghi ba chỗ câu mẫu còn thiếu",
                "next": "s3"
              },
              {
                "label": "Không thử vì các câu mẫu đã được bạn viết cẩn thận rồi",
                "next": "bad_notest"
              }
            ]
          },
          "bad_notest": {
            "text": "Khách đến sớm thật xuất hiện và hỏi giá gửi hành lý. Không ai có câu trả lời và mỗi người nói một kiểu.",
            "ending": "bad"
          },
          "s3": {
            "text": "AI đóng vai khách hỏi về giá gửi hành lý và chính sách trả phòng muộn. Bạn chưa có quy định cho hai điều này.",
            "choices": [
              {
                "label": "Ghi vào checklist là cần hỏi chủ rồi nhắn hỏi chủ ngay",
                "next": "good"
              },
              {
                "label": "Nhờ AI viết chính sách cho hai điều đó rồi dán vào sổ",
                "next": "bad_invent"
              }
            ]
          },
          "bad_invent": {
            "text": "AI viết chính sách gửi hành lý miễn phí không giới hạn. Nhân viên nói đúng điều đó với khách và chủ cơ sở phải xin lỗi vì không thể thực hiện.",
            "ending": "bad"
          },
          "good": {
            "text": "Chủ trả lời trong buổi chiều. Bạn cập nhật sổ câu mẫu, in checklist mười việc và cả quầy nói giống nhau khi khách đông.",
            "ending": "good"
          }
        }
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Chọn tuần đông khách sắp tới và liệt kê mười việc ở ba giai đoạn.",
          "Bước 2 - Gán tên người và hạn cho từng việc.",
          "Bước 3 - Nhờ AI đóng vai một khách khó, ghi ba chỗ còn thiếu.",
          "Bước 4 - Hỏi chủ những điều chưa có quy định, rồi in checklist."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Checklist tốt: ngắn, có tên và hạn, đã được thử trước khi khách tới.",
          "Bài cuối của chặng: một ngày làm việc trọn vẹn ở quầy."
        ]
      }
    ]
  },
  {
    "track": "personal",
    "isFundamental": false,
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "id": 2119,
    "slug": "de-an-cuoi-mot-ngay-lam-viec-tron-ven",
    "title": "Chặng 35, Bài 20: Capstone: một ngày làm việc trọn vẹn ở quầy",
    "subtitle": "Từ tin nhắn buổi sáng tới khiếu nại chiều muộn: bạn tự đi trọn một ngày bằng bộ mẫu đã dựng ở các bài trước.",
    "emoji": "🏁",
    "whyItMatters": "Bốn bài trước bạn dựng từng mảnh: tin nhắn mẫu, lịch trình, bảng giá, câu xin lỗi, checklist. Bài cuối ghép lại thành một ngày thật, để thấy mảnh nào dùng ở đâu và AI đứng ở chỗ nào: giúp soạn nháp, còn kiểm chứng và quyết định vẫn là bạn.",
    "openingQuestion": "Ngày làm việc của bạn có tin nhắn sáng, xếp lịch cho khách, đổi giá và một khiếu nại chiều muộn. Cách dùng AI nào giúp cả ngày trơn tru mà ít rủi ro nhất?",
    "openingOptions": [
      "Dùng bộ mẫu đã dựng, để AI soạn nháp, và tự kiểm mọi con số",
      "Để AI trả lời mọi tin nhắn tự động",
      "Không dùng AI trong ngày bận vì sợ nó sai còn mất thời gian sửa",
      "Dùng AI cho mọi việc nhưng chỉ đọc kỹ những việc bạn thấy quan trọng"
    ],
    "correctOption": 0,
    "explanation": "Bộ mẫu đã dựng giúp mỗi tình huống có điểm xuất phát, AI soạn nháp cho nhanh, còn con số, lời hứa và quyết định là của bạn. Trả lời tự động bỏ qua bước kiểm nên lỗi đi thẳng tới khách. Bỏ AI là bỏ phí phần giúp thật sự. Đọc kỹ chỉ việc quan trọng thì bỏ sót lỗi ở những việc trông nhỏ như giờ nhận phòng.",
    "diagram": [
      {
        "label": "Sáng: tin nhắn khách, dùng tin nhắn mẫu, kiểm giờ và giá",
        "arrow": true
      },
      {
        "label": "Trưa: xếp lịch, đối chiếu thời gian di chuyển thật",
        "arrow": true
      },
      {
        "label": "Chiều: cân giá theo số phòng còn, hỏi chủ khi vượt quyền",
        "arrow": true
      },
      {
        "label": "Muộn: khiếu nại, nghe, xin lỗi đúng việc, ghi lại"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: chị Mai làm quầy một homestay nhỏ. Sáng chị dùng bộ tin nhắn mẫu và điền giờ, giá thật. Trưa chị nhờ AI nháp lịch trình rồi đối chiếu giờ mở cửa. Chiều muộn có khách phàn nàn, chị dùng câu xin lỗi mẫu, đề nghị đổi phòng và ghi lại cho ca sau. Cuối ngày chị ghi ba việc cần sửa vào checklist."
    },
    "quiz": [
      {
        "question": "Tin nhắn buổi sáng hỏi giờ nhận phòng. Cách dùng bộ mẫu nào đúng?",
        "options": [
          "Dùng tin nhắn mẫu, điền giờ và giá thật, rồi đọc lại trước khi gửi",
          "Để AI tự trả lời vì bộ mẫu đã có giọng của cơ sở và không cần soát nữa",
          "Viết mới hoàn toàn mỗi lần cho mỗi khách",
          "Dùng mẫu nhưng để AI đoán giờ và giá"
        ],
        "correct": 0,
        "explanation": "Mẫu cho câu chữ nhất quán, còn giờ và giá là số thật của cơ sở nên bạn điền và soát. AI tự trả lời khiến lỗi đi thẳng tới khách. Viết mới mỗi lần tốn thời gian mà không tăng chất lượng. AI đoán giờ, giá từ tin cũ là cách cho ra số lệch mà vẫn trông hợp lý."
      },
      {
        "question": "AI nháp lịch trình ba ngày cho nhóm có trẻ nhỏ. Việc bạn cần làm trước khi gửi?",
        "options": [
          "Đối chiếu giờ mở cửa và thời gian di chuyển giữa các điểm với nguồn chính thức",
          "Gửi ngay vì AI đã tính nhịp thoải mái cho trẻ nhỏ và người lớn tuổi",
          "Rút ngắn lịch trình còn nửa vì lịch nào ngắn hơn thì ít sai hơn",
          "Nhờ AI kiểm tra lại lịch trình của chính nó rồi coi như đã xác minh"
        ],
        "correct": 0,
        "explanation": "AI có thể xếp điểm đóng cửa hôm đó hay hai điểm cách nhau nửa ngày đường vào cùng buổi. Chỉ nguồn chính thức mới biết giờ mở cửa thật. Rút ngắn lịch không sửa lỗi có sẵn. AI kiểm chính nó vẫn dùng cùng kiến thức nên không phát hiện được lỗi."
      },
      {
        "question": "Khách nước ngoài nhắn hỏi về giờ trả phòng. Cách an toàn nhất?",
        "options": [
          "Nhờ AI dịch và soạn trả lời, rồi dịch ngược để kiểm nghĩa trước khi gửi",
          "Gửi thẳng câu AI dịch vì AI dịch đủ tốt cho mọi câu về giờ giấc",
          "Trả lời bằng tiếng Việt để khách tự dịch bằng công cụ của họ",
          "Nhờ AI dịch hai lần bằng hai công cụ và chọn bản nào ngắn hơn"
        ],
        "correct": 0,
        "explanation": "Dịch ngược giúp bạn thấy nghĩa có giữ nguyên không, nhất là giờ, ngày, số. Gửi thẳng bỏ bước kiểm. Trả lời tiếng Việt làm khách khó hiểu. Chọn bản ngắn hơn không liên quan độ đúng và có thể bỏ mất chi tiết quan trọng."
      },
      {
        "question": "Chiều muộn khách thấy nơi khác rẻ hơn và đòi giảm. Cách trả lời hợp lý?",
        "options": [
          "Cảm ơn khách, nêu giá trị đi kèm và hỏi chủ nếu muốn thương lượng",
          "Giảm ngay theo giá nơi kia để khỏi mất khách đang đứng ở quầy",
          "Nói nơi kia chắc chắn kém chất lượng nên không thể rẻ như vậy",
          "Nhờ AI tự quyết mức giảm hợp lý rồi báo cho khách con số đó"
        ],
        "correct": 0,
        "explanation": "Giảm vội làm mất giá trị và tạo tiền lệ. Chê nơi khác là tranh cãi mà không có bằng chứng. Mức giảm là quyết định của chủ, không phải của AI. Nêu giá trị thật đi kèm rồi hỏi chủ khi cần thương lượng giữ bạn trong quyền của mình."
      },
      {
        "question": "Cuối ngày, việc nào giúp ngày mai tốt hơn?",
        "options": [
          "Ghi ba việc chưa ổn hôm nay vào checklist và sổ câu mẫu",
          "Xoá hết tin nhắn hôm nay để sáng mai bắt đầu lại từ đầu cho sạch",
          "Nhờ AI viết báo cáo cả ngày rồi lưu lại mà không cần đọc",
          "Chỉ ghi lại các khiếu nại vì các việc khác đã ổn thoả rồi"
        ],
        "correct": 0,
        "explanation": "Ghi ba việc cụ thể giúp cập nhật bộ mẫu cho lần sau. Xoá tin nhắn là mất dữ liệu học. Báo cáo AI viết mà không đọc có thể chứa điều bịa. Chỉ ghi khiếu nại bỏ sót những chỗ gần lỗi khác, như một câu mẫu chưa đủ ý."
      }
    ],
    "keyTakeaways": [
      "Mỗi tình huống có một mẫu điểm xuất phát, AI soạn nháp.",
      "Con số, giờ, giá luôn lấy từ nguồn thật và được soát.",
      "Lịch trình và bản dịch cần được đối chiếu trước khi gửi khách.",
      "Chuyện giá và ngoại lệ thì hỏi chủ cơ sở.",
      "Cuối ngày ghi lại để bộ mẫu tốt lên."
    ],
    "practicePrompt": {
      "question": "Giữa ngày bận, AI viết sẵn một loạt câu trả lời khách. Bạn chỉ còn 10 phút. Ưu tiên đọc soát phần nào trước?",
      "options": [
        "Giờ, giá và mọi lời hứa trong câu trả lời, vì sai ở đó gây hậu quả lớn nhất",
        "Chính tả và dấu câu, vì đó là thứ khách nhìn thấy đầu tiên và dễ chê nhất khi đọc",
        "Phần chào đầu và chào cuối, vì tạo ấn tượng tốt với khách",
        "Không cần soát vì AI đã viết theo bộ mẫu bạn dựng từ trước"
      ],
      "correct": 0,
      "explanation": "Giờ, giá và lời hứa là chỗ AI dễ bịa và hậu quả nặng nhất khi sai. Chính tả quan trọng nhưng không gây mất tiền hay thất hứa. Lời chào tạo ấn tượng nhưng không sai chỗ nguy hiểm. Bộ mẫu không thay được bước kiểm."
    },
    "summary": {
      "keyIdea": "Bộ mẫu giúp nhanh, kiểm chứng giúp đúng, và mọi quyết định về tiền, quyền vẫn của người.",
      "formula": "Mẫu + AI soạn nháp + bạn kiểm số và lời hứa + hỏi chủ khi vượt quyền = một ngày trơn tru.",
      "commonMistake": "Tin rằng có bộ mẫu rồi thì không cần đọc soát từng câu trả lời.",
      "action": "Đi thử một ngày với bộ mẫu của bạn, ghi ba chỗ còn thiếu."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Gom các mẫu bạn đã dựng ở chặng này vào một trang: tin nhắn khi khách hỏi đêm, câu xin lỗi, câu từ chối, checklist. Ghi bên cạnh mỗi mẫu một dòng: điền số thật lấy từ đâu và câu nào phải hỏi chủ. Ngày mai dùng thử một mẫu với khách thật và ghi lại một chỗ cần sửa.",
      "secondary": "Gửi trang mẫu này cho đồng nghiệp cùng ca để cả quầy nói giống nhau."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Chặng này bạn đã dựng từng mảnh cho quầy của mình. Bài cuối đi trọn một ngày để xem mảnh nào dùng ở đâu, và chỗ nào bạn phải tự kiểm chứng thay vì tin AI."
      },
      {
        "type": "feynman",
        "title": "Một ngày làm việc với AI đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới người phụ bếp trong một nhà hàng đông khách. Anh ta sơ chế nhanh, đặt sẵn nguyên liệu, nhưng đầu bếp vẫn nếm món trước khi ra. AI là người phụ bếp của quầy bạn, còn bạn là đầu bếp nếm trước khi gửi ra ngoài.",
        "columns": [
          "Việc",
          "Trong bếp",
          "Ở quầy"
        ],
        "rows": [
          [
            "Chuẩn bị nhanh",
            "Sơ chế, cắt sẵn",
            "Tin nhắn mẫu, nháp lịch trình"
          ],
          [
            "Kiểm trước khi ra",
            "Nếm món",
            "Soát giờ, giá, lời hứa"
          ],
          [
            "Quyết định",
            "Đầu bếp chọn món",
            "Bạn và chủ cơ sở quyết giá, ngoại lệ"
          ],
          [
            "Học lại",
            "Rút kinh nghiệm cuối ca",
            "Ghi ba việc chưa ổn"
          ]
        ],
        "oneLiner": "AI chuẩn bị nhanh, bạn nếm trước khi ra - bộ mẫu là công thức, kiểm chứng là bước nếm."
      },
      {
        "type": "heading",
        "text": "Bốn chặng trong một ngày"
      },
      {
        "type": "paragraph",
        "text": "Buổi sáng là tin nhắn khách, buổi trưa là lịch trình và bản dịch, buổi chiều là giá, cuối ngày là khiếu nại và ghi chép. Mỗi lúc có một mẫu bạn đã dựng và một thứ phải kiểm: giờ, thời gian di chuyển, giá, lời hứa."
      },
      {
        "type": "flow",
        "title": "Một ngày ở quầy với bộ mẫu",
        "steps": [
          {
            "label": "Sáng: tin nhắn khách",
            "detail": "Dùng tin nhắn mẫu, điền giờ và giá thật, đọc lại rồi gửi. Nếu khách hỏi điều chưa chắc, nói sẽ xác nhận sáng mai."
          },
          {
            "label": "Trưa: lịch trình và bản dịch",
            "detail": "AI nháp lịch, bạn đối chiếu giờ mở cửa và thời gian di chuyển. Bản dịch thì dịch ngược để kiểm nghĩa."
          },
          {
            "label": "Chiều: giá và ngoại lệ",
            "detail": "Xem số phòng còn, dùng bảng giá đã dựng. Khách đòi giảm thì nêu giá trị và hỏi chủ nếu muốn thương lượng."
          },
          {
            "label": "Muộn: khiếu nại",
            "detail": "Nghe hết, xin lỗi đúng việc, đề xuất phương án trong quyền, ghi lại sự việc để giao ca."
          },
          {
            "label": "Cuối ngày: ghi và cập nhật",
            "detail": "Ghi ba việc chưa ổn, sửa bộ mẫu nếu cần, và lưu vào nơi cả quầy đều thấy."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI nháp phản hồi buổi sáng",
        "task": "Sáng ra có ba tin nhắn khách và bạn chỉ có 15 phút. Lắp prompt để AI nháp phản hồi mà không bịa giờ và giá.",
        "parts": [
          {
            "id": "src",
            "label": "Dữ liệu bạn đưa",
            "options": [
              {
                "text": "Cứ trả lời các tin nhắn khách như bạn thấy hợp lý.",
                "feedback": "AI không biết giờ nhận phòng hay giá của cơ sở, nên tự chế ra giờ và giá nghe hợp lý nhưng sai."
              },
              {
                "text": "Đây là giờ nhận phòng 14 giờ, trả phòng 12 giờ, giá phòng đôi đã có trong bảng: (dán). Chỉ dùng số này.",
                "good": true,
                "feedback": "Số thật đi vào từ bạn, AI chỉ viết chữ quanh số đó."
              }
            ]
          },
          {
            "id": "unknown",
            "label": "Điều chưa biết",
            "options": [
              {
                "text": "Nếu thiếu thông tin thì tự đoán cho hợp lý.",
                "feedback": "Đoán trong tin nhắn khách là tự tạo ra cam kết mà bạn chưa kiểm chứng."
              },
              {
                "text": "Nếu khách hỏi điều tôi chưa cung cấp, viết là em sẽ xác nhận và báo lại, không đoán.",
                "good": true,
                "feedback": "Chỗ chưa biết được ghi thành một hẹn xác nhận, thay vì một lời hứa sai."
              }
            ]
          },
          {
            "id": "form",
            "label": "Khuôn dạng",
            "options": [
              {
                "text": "Viết một bài dài đủ cho cả ba khách.",
                "feedback": "Ba khách khác nhau, một bài dài khiến bạn phải cắt và dán, dễ nhầm giữa các khách."
              },
              {
                "text": "Ba câu trả lời riêng, mỗi câu dưới 50 chữ, có lời chào đúng tên khách.",
                "good": true,
                "feedback": "Mỗi khách một câu ngắn, dễ soát và gửi từng người."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "src",
              "unknown",
              "form"
            ],
            "text": "1. Chào chị Lan, giờ nhận phòng là 14 giờ và trả phòng 12 giờ ạ.\n2. Chào anh Nam, phòng đôi giá như bảng em gửi, em sẽ xác nhận phòng trống và báo lại anh trong sáng nay.\n3. Chào chị Thu, em xác nhận lại việc đón sân bay rồi báo chị nhé."
          },
          {
            "requires": [
              "src"
            ],
            "text": "Chào chị Lan, mình nhận phòng lúc 14 giờ, và nếu chị đến sớm có thể vào ngay lúc 11 giờ miễn phí ạ.\n\n(Giờ đúng nhưng AI tự thêm đến sớm được vào miễn phí, điều bạn chưa hề quyết.)"
          },
          {
            "text": "Chào quý khách, phòng đôi hiện có giá 800.000 đồng một đêm, nhận phòng lúc 13 giờ, có đón sân bay miễn phí.\n\n(Giờ, giá và đón sân bay đều do AI bịa vì bạn không đưa dữ liệu nào.)"
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Dùng bộ mẫu và kiểm chứng",
          "text": "Nhanh vì có mẫu sẵn, đúng vì số lấy từ nguồn thật. Chỗ chưa chắc được nói là sẽ xác nhận. Ngày bận mà không loạn."
        },
        "right": {
          "label": "Để AI trả lời tự động cả ngày",
          "text": "Nhanh nhưng giờ, giá, lời hứa bị bịa mà không ai kiểm. Khách nhận thông tin sai và cơ sở phải xin lỗi lần lượt từng người."
        }
      },
      {
        "type": "callout",
        "label": "Bộ mẫu cần được duyệt bởi người có quyền",
        "text": "Giá, quy định ở, hoàn tiền hay ưu đãi phải do chủ cơ sở duyệt trước khi vào mẫu. Chuyện đăng ký lưu trú hay an toàn thì hỏi chủ hoặc bộ phận pháp chế. AI giúp câu chữ, không giúp quyết chính sách."
      },
      {
        "type": "scenario",
        "title": "Một ngày ở quầy, từ sáng tới chiều muộn",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "8 giờ sáng: ba tin nhắn khách đang chờ. Bạn có bộ tin nhắn mẫu và bảng giờ, giá đã lưu.",
            "choices": [
              {
                "label": "Dùng mẫu, điền giờ và giá từ bảng, đọc lại rồi gửi",
                "next": "s2"
              },
              {
                "label": "Nhờ AI trả lời cả ba tin, không đưa dữ liệu, gửi luôn cho nhanh",
                "next": "bad_morning"
              }
            ]
          },
          "bad_morning": {
            "text": "AI bịa giờ nhận phòng và đón sân bay miễn phí. Ba khách cùng hiểu sai và bạn mất cả buổi chiều gọi lại đính chính.",
            "ending": "bad"
          },
          "s2": {
            "text": "Trưa, AI nháp lịch trình ba ngày cho nhóm có trẻ nhỏ. Có điểm thăm quan mà bạn không chắc hôm đó có mở cửa.",
            "choices": [
              {
                "label": "Xác minh giờ mở cửa ở nguồn chính thức rồi mới gửi",
                "next": "s3"
              },
              {
                "label": "Gửi luôn vì AI đã nói lịch này thoải mái cho trẻ nhỏ",
                "next": "bad_noon"
              }
            ]
          },
          "bad_noon": {
            "text": "Nhóm khách đến nơi thì điểm đó đóng cửa hôm ấy. Họ mất nửa ngày và gọi lại phàn nàn với giọng khá gay gắt.",
            "ending": "bad"
          },
          "s3": {
            "text": "Chiều muộn, một khách khiếu nại điều hoà ồn và đòi giảm giá vì thấy nơi khác rẻ hơn.",
            "choices": [
              {
                "label": "Nghe hết, xin lỗi đúng việc, đề nghị đổi phòng, chuyển chuyện giảm giá cho chủ",
                "next": "good"
              },
              {
                "label": "Giảm 30% ngay để khách nguôi giận và khỏi so sánh tiếp",
                "next": "bad_evening"
              }
            ]
          },
          "bad_evening": {
            "text": "Chủ cơ sở không đồng ý mức giảm này, và bạn phải nhắn xin lỗi khách vì thất hứa sau khi khách đã vui.",
            "ending": "bad"
          },
          "good": {
            "text": "Khách chuyển sang phòng khác, chủ trả lời chuyện giá vào sáng hôm sau. Bạn ghi lại sự việc cho ca sau và ba điều cần sửa trong sổ mẫu.",
            "ending": "good"
          }
        }
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Gom các mẫu đã dựng ở chặng này vào một trang.",
          "Bước 2 - Ghi cạnh mỗi mẫu: số lấy từ đâu, câu nào phải hỏi chủ.",
          "Bước 3 - Dùng thử một mẫu với khách thật vào ngày mai.",
          "Bước 4 - Ghi một chỗ cần sửa và cập nhật mẫu."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Bộ mẫu làm nhanh, kiểm chứng làm đúng, quyết định là của bạn.",
          "Hết chặng 35: bạn đã có một bộ công cụ cho quầy, dùng được ngay ngày mai."
        ]
      }
    ]
  }
];
