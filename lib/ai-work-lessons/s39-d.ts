import type { Lesson } from "../lesson-types";

// Chặng 39, bài 16-20. Giáo trình: scripts/curriculum/stage-39.json.
export const S39_D_LESSONS: Lesson[] = [
  {
    "id": 2195,
    "slug": "phong-kham-khong-dan-ho-so-benh-nhan-vao-ai",
    "title": "Chặng 39, Bài 16: Không dán hồ sơ người bệnh vào AI: ba tình huống suýt lộ",
    "subtitle": "Ô chat giống một cuộc gọi ra ngoài: thứ bạn dán vào đã rời khỏi phòng khám.",
    "duration": "8 phút",
    "difficulty": "Trung bình",
    "emoji": "🔒",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Ở quầy lễ tân, việc dễ làm nhất là dán nguyên một đoạn ghi chú vào AI để nhờ tóm gọn. Nhưng tên, số điện thoại, mã hồ sơ hay ảnh đơn thuốc là thông tin của người bệnh, không phải của bạn. Một lần dán vội có thể để lộ người bệnh mà không ai hay biết. Biết ba tình huống dễ nhầm nhất giúp bạn vẫn dùng AI cho phần chữ mà không đụng vào dữ liệu thật.",
    "openingQuestion": "Đồng nghiệp ca chiều nói: \"Mình dán ghi chú ca này vào AI tóm giúp cho nhanh nhé\". Trong ghi chú có tên, số điện thoại và mã hồ sơ. Bạn nên làm gì?",
    "openingOptions": [
      "Nhắc dừng lại, chỉ nhờ AI với câu mẫu không có thông tin thật",
      "Cho dán, vì AI chỉ đọc chứ không lưu lại thông tin nào",
      "Cho dán nhưng xoá số điện thoại, còn tên và mã hồ sơ giữ lại",
      "Cho dán, nếu đồng nghiệp hứa chỉ dán duy nhất lần này thôi và tự chịu trách nhiệm"
    ],
    "correctOption": 0,
    "explanation": "Thứ bạn dán vào ô chat được gửi ra một hệ thống bên ngoài phòng khám, và bạn không tự quyết được nó được lưu, xem hay dùng vào việc gì. Xoá mỗi số điện thoại thì tên cộng mã hồ sơ vẫn nhận ra được người bệnh. Nói AI chỉ đọc không lưu là điều không ai bảo đảm thay bạn. Và chỉ dán một lần cũng đã là một lần gửi ra ngoài, không lấy lại được. Cách an toàn là nhờ AI trên câu mẫu, chỗ trống để tự điền.",
    "diagram": [
      {
        "label": "Có người muốn nhờ AI tóm một ca",
        "arrow": true
      },
      {
        "label": "Soi xem có tên, số, mã hồ sơ, ảnh giấy tờ không",
        "arrow": true
      },
      {
        "label": "Có: dừng, chuyển sang câu mẫu không thông tin thật",
        "arrow": true
      },
      {
        "label": "Không rõ: hỏi quản lý trước khi dán"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một nhân viên lễ tân chụp tờ đơn thuốc viết tay để nhờ AI đọc giúp chữ khó. Tờ giấy có họ tên, tuổi và tên thuốc của người bệnh. Đồng nghiệp thấy và nhắc chị dừng lại. Hai người cùng viết lại yêu cầu bằng câu mẫu không có thông tin thật, và hỏi quản lý xem việc đọc chữ khó nên chuyển cho ai."
    },
    "quiz": [
      {
        "question": "Nhân viên muốn dán nguyên ghi chú ca khám vào AI để tóm tắt. Phần nào trong đó không được dán?",
        "options": [
          "Tên, số điện thoại, mã hồ sơ và tình trạng của người bệnh",
          "Chỉ số điện thoại, vì tên và tình trạng thì ai cũng đoán được",
          "Chỉ mã hồ sơ, vì tên người bệnh trùng nhiều nên không nhận ra ai",
          "Không có gì bị cấm, vì tắt lịch sử là dữ liệu tự biến mất ngay"
        ],
        "correct": 0,
        "explanation": "Cả tên, số, mã hồ sơ lẫn tình trạng đều là thông tin nhận diện hoặc thông tin sức khoẻ của người bệnh. Chỉ giấu một mục thì các mục còn lại vẫn chỉ ra được người đó, và tắt lịch sử không có nghĩa dữ liệu chưa hề rời khỏi phòng khám."
      },
      {
        "question": "Bạn muốn chụp một đơn thuốc để AI đọc giúp chữ viết tay. Nên xử lý thế nào?",
        "options": [
          "Không chụp gửi AI, vì tờ đơn có tên và thuốc của người bệnh",
          "Chụp được, vì ảnh không phải chữ nên AI không lưu lại gì cả",
          "Chụp được, nếu cắt bớt phần đầu tờ giấy chỉ để lại tên thuốc",
          "Chụp được, vì đơn đã có chữ ký bác sĩ nên là giấy tờ công khai"
        ],
        "correct": 0,
        "explanation": "Ảnh đơn thuốc chứa tên, thuốc và nét chữ, nên vẫn là hồ sơ người bệnh. Ảnh không an toàn hơn chữ, cắt một góc chưa chắc che hết chi tiết nhận diện, và chữ ký của bác sĩ không biến đơn thành công khai. Chữ khó đọc thì hỏi người kê đơn."
      },
      {
        "question": "Cần soạn một tin nhắn nhắc lịch hẹn với sự giúp của AI. Cách làm nào đúng?",
        "options": [
          "Dùng câu mẫu có {tên}, {giờ}, điền thông tin thật sau ở ngoài",
          "Đưa tên thật nhưng bỏ họ, chỉ giữ tên gọi ở nhà của người bệnh",
          "Đổi tên thật thành tên bạn bè, còn số điện thoại giữ nguyên",
          "Đưa một người bệnh thật làm ví dụ để tin nghe sát thực tế nhất"
        ],
        "correct": 0,
        "explanation": "Câu mẫu có chỗ trống cho AI viết phần chữ, còn tên và giờ điền sau trên máy của bạn nên không gì rời khỏi phòng khám. Bỏ họ hay đổi tên mà giữ số điện thoại vẫn để lộ người thật, và lấy người thật làm ví dụ là đúng việc không được làm."
      },
      {
        "question": "Vì sao \"tôi chỉ dán một lần thôi\" không phải là lý do đủ để yên tâm?",
        "options": [
          "Vì đã gửi ra ngoài thì không lấy lại được, dù chỉ một lần",
          "Vì một lần thì được, từ lần thứ hai trở đi mới bị coi là rò rỉ",
          "Vì lần đầu AI chưa quen nên bạn phải dán nhiều lần mới xong",
          "Vì mỗi lần dán đều bị công cụ AI tính phí thêm cho phòng khám"
        ],
        "correct": 0,
        "explanation": "Rủi ro nằm ở việc dữ liệu đã đi ra ngoài, không nằm ở số lần. Không có ngưỡng một lần thì miễn; việc AI quen hay chưa và chuyện tính phí không liên quan tới bảo mật thông tin người bệnh."
      },
      {
        "question": "Ai quyết định công cụ AI nào được nhận loại dữ liệu nào ở phòng khám của bạn?",
        "options": [
          "Quản lý hoặc bộ phận phụ trách, bạn hỏi chứ không tự đoán",
          "Nhà cung cấp AI, vì họ đã cam kết bảo mật trên trang chủ",
          "Người dùng, miễn là đã đọc điều khoản rồi bấm đồng ý",
          "Đồng nghiệp làm lâu nhất, vì đã dùng AI trước mọi người"
        ],
        "correct": 0,
        "explanation": "Quy định dùng công cụ và dữ liệu là việc của phòng khám, do người có trách nhiệm quyết. Lời cam kết trên trang chủ không thay quy định nội bộ, bấm đồng ý điều khoản không phải là được phép, và thâm niên không cho ai quyền quyết thay."
      }
    ],
    "keyTakeaways": [
      "Tên, số điện thoại, mã hồ sơ, tình trạng và ảnh giấy tờ của người bệnh không dán vào AI.",
      "Dán vào ô chat là gửi ra ngoài phòng khám, dù chỉ một lần.",
      "Nhờ AI trên câu mẫu có chỗ trống, điền thông tin thật ở ngoài.",
      "Che một phần vẫn có thể để lộ người thật.",
      "Không chắc thì hỏi quản lý trước khi dán."
    ],
    "practicePrompt": {
      "question": "Chị Mai muốn AI viết lại tin nhắn xin lỗi vì trễ giờ khám. Cách nào giữ được thông tin người bệnh?",
      "options": [
        "Đưa câu mẫu \"Chào {tên}, phòng khám xin lỗi vì trễ giờ\"",
        "Dán tin đã gửi cho người bệnh đó, chỉ xoá số điện thoại",
        "Dán cả đoạn chat của người bệnh để AI hiểu hoàn cảnh hơn",
        "Chụp màn hình cuộc trò chuyện, che tên bằng một ô đen"
      ],
      "correct": 0,
      "explanation": "Câu mẫu chỉ có phần chữ chung, tên điền sau ở ngoài. Tin đã gửi vẫn còn tên và lịch khám. Đoạn chat chứa nhiều chi tiết của người bệnh hơn nữa. Ảnh chụp có che tên vẫn lộ giờ hẹn, nội dung và có thể cả tên còn sót ở chỗ khác."
    },
    "summary": {
      "keyIdea": "AI nhận phần chữ chung, còn thông tin thật của người bệnh ở lại trong phòng khám.",
      "formula": "Câu mẫu có chỗ trống + điền thông tin thật ở ngoài = dùng AI mà không lộ ai.",
      "commonMistake": "Nghĩ rằng xoá bớt một mục như số điện thoại là đủ an toàn.",
      "action": "Liệt kê 5 loại thông tin ở quầy của bạn mà không bao giờ dán vào AI."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Lấy một tin nhắn hoặc ghi chú bạn hay viết ở quầy (nhắc lịch, xin lỗi, hướng dẫn). Viết lại thành câu mẫu có 2-3 chỗ trống như {tên}, {giờ}. Gạch chân mọi chỗ trong bản gốc là thông tin thật để chắc rằng nó nằm ngoài câu mẫu. Ghi thêm một dòng: việc nào bạn chưa chắc thì hỏi ai.",
      "secondary": "Ngày mai bạn sẽ được hỏi: câu mẫu nào đã dùng thử, và có chỗ trống nào bạn quên chưa che."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Giữa hai ca khám, lễ tân thường muốn nhờ AI tóm lại một ghi chú thật dài. Bài này chỉ ba tình huống suýt lộ hay gặp và cách vẫn dùng AI được mà không đụng vào thông tin của người bệnh."
      },
      {
        "type": "feynman",
        "title": "Không dán hồ sơ người bệnh đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới việc bạn đọc to một tờ phiếu khám giữa quán cà phê đông người: bạn không định nói cho ai, nhưng lời đã ra khỏi miệng và bạn không thu lại được. Dán vào ô chat cũng vậy.",
        "columns": [
          "Thành phần",
          "Đọc phiếu khám giữa quán đông",
          "Dán vào ô chat AI"
        ],
        "rows": [
          [
            "Nơi nói ra",
            "Quán cà phê đông người",
            "Ô chat của công cụ AI"
          ],
          [
            "Ai nghe được",
            "Người ngồi quanh bàn",
            "Hệ thống bên ngoài phòng khám"
          ],
          [
            "Thu lại được không",
            "Không, lời đã ra",
            "Không, dữ liệu đã đi"
          ],
          [
            "Cách làm đúng",
            "Chỉ nói chuyện chung, không đọc tên",
            "Dùng câu mẫu, không đưa thông tin thật"
          ]
        ],
        "oneLiner": "Dán vào AI là nói ra ngoài phòng khám: chỉ nói phần chung, giữ phần riêng lại."
      },
      {
        "type": "heading",
        "text": "Ba tình huống suýt lộ ở quầy lễ tân"
      },
      {
        "type": "paragraph",
        "text": "Tình huống một: dán ghi chú ca khám để tóm. Tình huống hai: chụp ảnh đơn thuốc, phiếu hẹn để nhờ đọc chữ. Tình huống ba: dán cả đoạn chat của người bệnh để soạn câu trả lời. Ba việc đều có ý tốt và đều đưa tên, số, tình trạng ra ngoài."
      },
      {
        "type": "flow",
        "title": "Trước khi dán bất cứ thứ gì vào AI",
        "steps": [
          {
            "label": "Dừng và nhìn nội dung",
            "detail": "Đọc lại thứ định dán. Có tên, số điện thoại, mã hồ sơ, ngày khám, thuốc, hay ảnh giấy tờ không?"
          },
          {
            "label": "Đổi sang câu mẫu",
            "detail": "Viết lại yêu cầu bằng chỗ trống như {tên}, {giờ}. AI chỉ cần biết dạng tin nhắn, không cần biết người thật."
          },
          {
            "label": "Nhờ AI viết phần chữ",
            "detail": "AI soạn câu mẫu, bạn đọc lại xem giọng văn đã ấm và rõ chưa."
          },
          {
            "label": "Điền thông tin thật ở ngoài",
            "detail": "Tên, giờ, số điền trên máy của phòng khám, không qua AI."
          },
          {
            "label": "Không chắc thì hỏi",
            "detail": "Gặp loại thông tin chưa rõ là dùng được hay không, hỏi quản lý trước khi làm."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI soạn tin nhắn nhắc lịch mà không lộ người bệnh",
        "task": "Bạn cần tin nhắn nhắc lịch cho người bệnh. Lắp yêu cầu gửi cho AI sao cho không có thông tin thật nào rời khỏi phòng khám.",
        "parts": [
          {
            "id": "who",
            "label": "Người nhận",
            "options": [
              {
                "text": "Gửi cho anh Trần Văn Hùng, số 09xx xxx xxx, khám lúc 9 giờ.",
                "feedback": "Tên và số điện thoại thật đã ra ngoài phòng khám, dù bạn chỉ nhờ viết một tin nhắn."
              },
              {
                "text": "Gửi cho {tên}, hẹn lúc {giờ}, chỗ trống bạn sẽ tự điền.",
                "good": true,
                "feedback": "AI chỉ thấy chỗ trống nên không có thông tin thật nào bị gửi đi."
              }
            ]
          },
          {
            "id": "ctx",
            "label": "Bối cảnh",
            "options": [
              {
                "text": "Đây là ghi chú của ca khám: (dán nguyên ghi chú).",
                "feedback": "Ghi chú ca khám chứa tình trạng người bệnh, đúng loại thông tin không được dán."
              },
              {
                "text": "Tin nhắn nhắc một lịch hẹn khám thường, không nói lý do khám.",
                "good": true,
                "feedback": "Không có lý do khám thì tin đủ dùng và không lộ tình trạng nào."
              }
            ]
          },
          {
            "id": "form",
            "label": "Khuôn dạng",
            "options": [
              {
                "text": "Viết ngắn, thêm lời chúc sức khoẻ và hỏi thăm bệnh tình.",
                "feedback": "AI sẽ tự nhắc bệnh tình, và tin nhắn có thể lộ điều người bệnh không muốn ai khác đọc trên điện thoại."
              },
              {
                "text": "Dưới 40 chữ, giọng lịch sự, chỉ nhắc giờ và địa chỉ phòng khám.",
                "good": true,
                "feedback": "Ngắn, đủ ý và không chạm vào chuyện sức khoẻ."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "who",
              "ctx",
              "form"
            ],
            "text": "Chào {tên}, phòng khám xin nhắc lịch hẹn của bạn lúc {giờ}. Bạn vui lòng đến trước 10 phút. Cảm ơn bạn."
          },
          {
            "requires": [
              "who"
            ],
            "text": "(Chưa dùng chỗ trống nên AI viết luôn cho anh Hùng, và thêm lời hỏi thăm bệnh tình dài dòng. Tin nhắn dùng thông tin thật nên không nên gửi ra ngoài.)"
          },
          {
            "text": "Chào anh Hùng, hy vọng bệnh của anh đã đỡ hơn. Nhắc anh lịch khám 9 giờ...\n\n(Tin có tên thật và nhắc bệnh tình: cả hai đều không nên đi qua AI.)"
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Dán thông tin thật vào AI",
          "text": "Nhanh trong 30 giây nhưng đã gửi tên, số, tình trạng ra ngoài. Không lấy lại được. Người bệnh không biết và không được hỏi ý kiến."
        },
        "right": {
          "label": "Dùng câu mẫu có chỗ trống",
          "text": "Chậm hơn khoảng một phút vì phải điền tay. Thông tin thật ở lại trong phòng khám. Mẫu dùng lại được cho hàng chục người."
        }
      },
      {
        "type": "callout",
        "label": "Che một phần chưa phải là an toàn",
        "text": "Xoá số điện thoại nhưng giữ tên và ngày khám, hoặc che họ tên trên ảnh nhưng còn mã hồ sơ, vẫn để lộ người thật. Nếu không chắc một thông tin có dán được không, hỏi quản lý hoặc bộ phận pháp chế của phòng khám, không tự suy ra."
      },
      {
        "type": "scenario",
        "title": "Đồng nghiệp muốn tóm ca cho nhanh",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Cuối ca, đồng nghiệp mở ô chat AI và nói sẽ dán ghi chú ca khám vào, có tên và số điện thoại người bệnh. Bạn đứng cạnh đó.",
            "choices": [
              {
                "label": "Để đồng nghiệp dán, vì bạn cũng thấy tiện và đang bận",
                "next": "bad1"
              },
              {
                "label": "Nhắc dừng lại và đề nghị viết yêu cầu bằng câu mẫu",
                "next": "s2"
              }
            ]
          },
          "bad1": {
            "text": "Ghi chú đã đi ra ngoài. Sáng hôm sau quản lý hỏi cả ca vì có người thấy màn hình. Không ai thu lại được điều đã dán.",
            "ending": "bad"
          },
          "s2": {
            "text": "Đồng nghiệp hơi ngại nhưng đồng ý. Hai người viết yêu cầu \"tóm ghi chú một ca khám gồm tên, lý do, hẹn lại\" mà không dán gì thật. Bạn còn phải quyết định cách hỏi tiếp.",
            "choices": [
              {
                "label": "Tự nghĩ ra quy tắc chung cho cả quầy rồi nhắn nhóm",
                "next": "bad2"
              },
              {
                "label": "Hỏi quản lý công cụ nào và dữ liệu loại nào được phép",
                "next": "good"
              }
            ]
          },
          "bad2": {
            "text": "Quy tắc bạn tự nghĩ khác với quy định của phòng khám. Hai người làm theo hai cách khác nhau, và không ai biết cách nào đúng.",
            "ending": "bad"
          },
          "good": {
            "text": "Quản lý ghi lại câu trả lời thành một tờ ngắn dán ở quầy. Từ đó cả ca dùng chung một quy tắc và không ai phải đoán.",
            "ending": "good"
          }
        }
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Nhìn lại thứ định dán: có tên, số, mã hồ sơ, ảnh giấy tờ không?",
          "Bước 2 - Nếu có, viết lại thành câu mẫu với chỗ trống.",
          "Bước 3 - Cho AI viết phần chữ, điền thông tin thật ở ngoài.",
          "Bước 4 - Việc chưa rõ thì hỏi quản lý trước khi làm."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "AI giúp phần chữ, còn thông tin người bệnh ở lại với phòng khám.",
          "Bài sau: thay tên thật bằng mã trước khi nhờ AI, và vì sao vẫn phải hỏi quy định."
        ]
      }
    ]
  },
  {
    "id": 2196,
    "slug": "phong-kham-thay-ten-that-bang-ma-truoc-khi-nho-ai",
    "title": "Chặng 39, Bài 17: Ẩn danh tài liệu trước khi nhờ AI giúp phần hành chính",
    "subtitle": "Thay tên thật bằng mã như dán nhãn lên hộp: AI thấy nhãn, chỉ bạn giữ bảng tra.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "🏷️",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Bảng lịch hẹn có họ tên, số điện thoại và giờ khám của hàng chục người. Bạn muốn AI xếp lại cho gọn, nhưng dán nguyên bảng là đưa hết ra ngoài. Thay tên và số bằng mã ngẫu nhiên là bước giảm rủi ro rất rẻ. Điều cần hiểu là nó chỉ giảm chứ không xoá rủi ro, nên vẫn cần hỏi quy định nội bộ.",
    "openingQuestion": "Bạn cần AI sắp xếp bảng 30 lịch hẹn theo giờ. Bảng có họ tên và số điện thoại. Cách chuẩn bị nào hợp lý nhất?",
    "openingOptions": [
      "Thay tên và số điện thoại bằng mã, giữ bảng tra ở máy bạn",
      "Xoá cột số điện thoại, giữ nguyên họ tên vì cần để sắp xếp",
      "Viết tắt họ tên thành chữ cái đầu, giữ nguyên số điện thoại",
      "Dán nguyên bảng, vì AI chỉ sắp xếp chứ không đọc nội dung"
    ],
    "correctOption": 0,
    "explanation": "Mã như KH01, KH02 cho AI đủ thứ cần để sắp xếp theo giờ, còn bảng tra mã với tên thật nằm trên máy bạn nên bạn ghép lại được sau. Xoá số điện thoại mà giữ họ tên vẫn để lộ người thật. Viết tắt tên mà giữ số điện thoại thì số điện thoại đã đủ để nhận ra người. AI luôn đọc nội dung mới sắp xếp được, nên ý chỉ sắp xếp chứ không đọc là sai.",
    "diagram": [
      {
        "label": "Bảng lịch hẹn có tên và số thật",
        "arrow": true
      },
      {
        "label": "Thay tên, số bằng mã ngẫu nhiên như KH01",
        "arrow": true
      },
      {
        "label": "AI sắp xếp bảng chỉ có mã và giờ",
        "arrow": true
      },
      {
        "label": "Bạn tra mã về tên thật ở máy mình, và hỏi quy định"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một nhân viên hành chính có bảng 25 lịch hẹn khám trong tuần. Chị thay mỗi tên bằng mã KH01 đến KH25, xoá cột số điện thoại, giữ giờ và loại dịch vụ. Chị lưu bảng tra mã ở một tệp riêng trên máy. AI sắp xếp theo giờ và đánh dấu hai lịch bị trùng. Trước khi gửi bảng đã sắp xếp, chị hỏi quản lý xem cách này có được phép không."
    },
    "quiz": [
      {
        "question": "Mục đích chính của việc thay tên thật bằng mã trước khi nhờ AI là gì?",
        "options": [
          "AI làm việc trên mã, còn tên thật ở lại máy của bạn",
          "Để AI đọc bảng nhanh hơn vì mã ngắn hơn tên người",
          "Để AI chắc chắn không thể nhận ra bất cứ ai trong bảng",
          "Để không cần báo quản lý biết là mình đang dùng AI"
        ],
        "correct": 0,
        "explanation": "Mã cho AI đủ dữ liệu để sắp xếp mà không thấy tên. Nó không làm AI đọc nhanh hơn đáng kể, không loại bỏ hết mọi khả năng nhận ra người (giờ khám hiếm, dịch vụ đặc thù vẫn gợi ra ai), và cũng không thay việc hỏi quản lý."
      },
      {
        "question": "Bảng đã thay tên bằng mã nhưng còn cột \"lý do khám\" ghi chi tiết bệnh. Nên làm gì?",
        "options": [
          "Bỏ hoặc rút gọn cột đó thành loại dịch vụ chung trước khi dán",
          "Giữ nguyên, vì đã có mã nên không ai biết bệnh của ai",
          "Giữ nguyên, nhưng đổi chữ in thường sang in hoa cho khác",
          "Giữ nguyên, vì AI cần biết bệnh mới sắp xếp lịch cho đúng"
        ],
        "correct": 0,
        "explanation": "Mã chỉ che tên, còn chi tiết bệnh cộng giờ khám cụ thể vẫn có thể chỉ ra một người. Đổi chữ hoa thường không che gì. Sắp xếp theo giờ không cần biết bệnh gì, chỉ cần loại dịch vụ chung."
      },
      {
        "question": "Vì sao vẫn phải hỏi quy định nội bộ dù đã thay tên bằng mã?",
        "options": [
          "Vì mã vẫn có thể liên kết ngược tới người thật qua thông tin khác",
          "Vì mã do AI đặt nên không đáng tin bằng mã do bạn tự đặt",
          "Vì quy định bắt buộc dùng mã dài ít nhất mười ký tự mới hợp lệ",
          "Vì hỏi quản lý là thủ tục mà ai cũng làm nhưng không có tác dụng"
        ],
        "correct": 0,
        "explanation": "Giờ hẹn, ngày sinh, dịch vụ hiếm hay bảng tra bị lộ đều giúp ghép mã về người thật. Việc mã tự đặt hay AI đặt không phải vấn đề, và không có độ dài ký tự tiêu chuẩn nào; còn hỏi quy định là để biết ai được phép, chứ không phải thủ tục vô nghĩa."
      },
      {
        "question": "Bảng tra mã với tên thật nên để ở đâu?",
        "options": [
          "Ở tệp riêng trên máy của bạn hoặc nơi phòng khám quy định",
          "Trong cùng cuộc chat với AI để nó dịch mã ngược lại khi cần",
          "Ở ngay cột bên cạnh trong bảng để lúc nào cũng nhìn thấy",
          "Gửi cho đồng nghiệp qua ứng dụng nhắn tin cho tiện sao lưu"
        ],
        "correct": 0,
        "explanation": "Bảng tra là chìa khoá, đưa cho AI thì mã mất tác dụng. Để cạnh bảng thì dán bảng nào cũng kéo theo cột tên. Gửi qua ứng dụng nhắn tin cá nhân là đưa chìa khoá ra ngoài kênh của phòng khám."
      },
      {
        "question": "Bạn nhờ AI đổi bảng mã thành tên thật để in. Việc nào đúng hơn?",
        "options": [
          "Tự ghép mã với tên bằng bảng tra trên máy của bạn",
          "Dán lại bảng tra cho AI ghép, vì AI làm nhanh hơn tay bạn",
          "Dán bảng tra nhưng xoá một nửa số dòng để giảm rủi ro",
          "Nhờ AI đoán tên thật từ giờ hẹn và loại dịch vụ đã có"
        ],
        "correct": 0,
        "explanation": "Ghép ngược là bước cuối cùng và phải nằm ngoài AI, nếu không toàn bộ việc dùng mã đổ bỏ. Đưa một nửa bảng tra vẫn là gửi tên thật ra ngoài. Nhờ AI đoán tên là bịa, và có thể ghép nhầm người."
      }
    ],
    "keyTakeaways": [
      "Thay tên, số bằng mã như KH01 trước khi nhờ AI sắp xếp hay tóm.",
      "Bảng tra mã với tên thật ở lại máy bạn, không đưa cho AI.",
      "Bỏ cột chi tiết không cần cho việc, như lý do khám.",
      "Ẩn danh giảm rủi ro chứ không xoá hết: giờ, dịch vụ hiếm vẫn gợi ra người.",
      "Vẫn hỏi quản lý xem cách này có được phép."
    ],
    "practicePrompt": {
      "question": "Chị Hà đã thay tên bằng mã nhưng để nguyên cột ngày sinh và địa chỉ nhà. Việc gì nên làm tiếp?",
      "options": [
        "Bỏ hai cột đó, rồi hỏi quản lý trước khi dán",
        "Dán luôn, vì tên đã là mã nên ai đọc cũng không biết",
        "Đổi ngày sinh sang dạng viết tắt rồi dán luôn cho kịp",
        "Dán cho AI và nhờ nó tự xoá những chỗ nhạy cảm giúp"
      ],
      "correct": 0,
      "explanation": "Ngày sinh và địa chỉ gần như chỉ ra đúng một người, mã tên không cứu được. Đổi dạng viết ngày sinh không che thông tin. Nhờ AI tự xoá thì bảng đã gửi ra ngoài rồi mới được xoá."
    },
    "summary": {
      "keyIdea": "Đổi tên thật thành mã cho AI thấy khung, còn chìa khoá nằm ở bạn.",
      "formula": "Mã thay tên + bỏ cột không cần + bảng tra ở máy mình + hỏi quy định = dùng AI thận trọng.",
      "commonMistake": "Cho rằng thay mỗi cột tên là đã ẩn danh xong.",
      "action": "Chọn một bảng bạn hay xử lý và đánh dấu cột nào cần bỏ, cột nào đổi thành mã."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Lấy một bảng lịch hẹn mẫu (hoặc tự dựng 6 dòng bịa hoàn toàn, không dùng người thật). Thay tên bằng KH01, KH02..., xoá cột số điện thoại và ngày sinh, lưu bảng tra thành một tệp riêng. Ghi thêm một câu hỏi cho quản lý về việc dùng cách này.",
      "secondary": "Ngày mai bạn sẽ được hỏi: cột nào bạn bỏ, cột nào giữ, và vì sao."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Có việc hành chính cần đến AI mà bảng lại có đầy tên người. Bài này dạy cách thay tên bằng mã để AI vẫn làm được việc, và vì sao đó chưa phải cách nào hoàn toàn an toàn."
      },
      {
        "type": "feynman",
        "title": "Ẩn danh bằng mã đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới việc dán nhãn số lên từng hộp đồ gửi kho: người kho chỉ thấy số hộp, còn bạn giữ cuốn sổ ghi số nào là của ai. Thay tên bằng mã cho AI cũng vậy.",
        "columns": [
          "Thành phần",
          "Dán nhãn số lên hộp gửi kho",
          "Thay tên bằng mã cho AI"
        ],
        "rows": [
          [
            "Thứ người ngoài thấy",
            "Số trên hộp",
            "Mã KH01, KH02"
          ],
          [
            "Thứ chỉ bạn giữ",
            "Sổ ghi số hộp là của ai",
            "Bảng tra mã với tên thật"
          ],
          [
            "Nguy cơ còn lại",
            "Hộp có hình dáng đặc biệt, ai cũng đoán ra",
            "Giờ hẹn hoặc dịch vụ hiếm gợi ra người"
          ],
          [
            "Cách làm đúng",
            "Bỏ chi tiết dễ nhận ra khỏi nhãn",
            "Bỏ cột thừa và hỏi quy định"
          ]
        ],
        "oneLiner": "Mã cho AI thấy khung, bảng tra ở lại với bạn, và mã không phải phép màu che được mọi thứ."
      },
      {
        "type": "heading",
        "text": "Vì sao chỉ đổi mỗi cột tên thì chưa đủ"
      },
      {
        "type": "paragraph",
        "text": "Một bảng chỉ có mã, giờ khám và loại dịch vụ vẫn có thể chỉ ra người thật nếu ai đó biết người này thường khám vào giờ nào. Vì vậy ta bỏ thêm mọi cột không cần cho việc, và không coi mã là tấm khiên tuyệt đối."
      },
      {
        "type": "flow",
        "title": "Từ bảng có tên thật tới bảng chỉ có mã",
        "steps": [
          {
            "label": "Chọn việc cần AI làm",
            "detail": "Chỉ rõ bạn cần gì, ví dụ sắp xếp theo giờ và tìm lịch trùng. Việc đó quyết định cột nào phải giữ."
          },
          {
            "label": "Bỏ cột không cần",
            "detail": "Số điện thoại, ngày sinh, địa chỉ, lý do khám thường không cần cho việc sắp xếp giờ."
          },
          {
            "label": "Thay tên bằng mã",
            "detail": "KH01, KH02 do bạn tự đặt, không đặt theo chữ cái tên hay số điện thoại."
          },
          {
            "label": "Lưu bảng tra ở nơi riêng",
            "detail": "Tệp riêng trên máy bạn hoặc nơi phòng khám quy định, không dán vào AI."
          },
          {
            "label": "Hỏi quản lý rồi mới dán",
            "detail": "Xin xác nhận cách làm này có được phép với loại công cụ bạn định dùng."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Bản nháp AI viết sau khi bạn đưa bảng đã ẩn danh",
        "task": "AI đã sắp xếp bảng chỉ có mã và giờ. Bấm vào những câu có vẻ AI tự bịa ra thêm, rồi nộp.",
        "segments": [
          {
            "text": "Bảng đã sắp xếp theo giờ tăng dần: KH03 lúc 8:00, KH01 lúc 8:30, KH07 lúc 9:00."
          },
          {
            "text": "Có hai lịch trùng giờ: KH02 và KH05 cùng hẹn lúc 10:30."
          },
          {
            "text": "KH04 là bệnh nhân lớn tuổi nên tôi xếp vào khung giờ sáng sớm cho tiện đi lại.",
            "error": "Bảng chỉ có mã và giờ, không có tuổi. AI tự bịa ra thông tin về KH04 rồi dùng nó để sắp xếp."
          },
          {
            "text": "KH06 thường hẹn cùng bác sĩ với KH02 nên tôi để hai lịch sát nhau.",
            "error": "Không có bác sĩ hay lịch sử hẹn trong bảng. Đây là chi tiết AI bịa để nghe hợp lý."
          },
          {
            "text": "Tổng cộng bảng có 7 lịch hẹn, lịch cuối là KH08 lúc 16:00."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Ẩn danh đúng cách",
          "text": "Bỏ cột thừa, thay tên bằng mã, bảng tra ở máy bạn. AI chỉ thấy khung. Vẫn hỏi quản lý để biết cách làm có được phép."
        },
        "right": {
          "label": "Ẩn danh nửa vời",
          "text": "Chỉ đổi tên còn giữ số điện thoại, ngày sinh hay lý do khám. Bảng tra nằm cạnh trong cùng tệp. Cảm giác an toàn nhưng người thật vẫn nhận ra được."
        }
      },
      {
        "type": "callout",
        "label": "Ẩn danh không phải giấy phép",
        "text": "Đổi tên thành mã là cách giảm rủi ro, không có nghĩa dữ liệu hết được bảo vệ hay bạn tự được phép dùng công cụ nào cũng được. Quy định về loại dữ liệu và công cụ là của phòng khám. Điều gì liên quan luật, hỏi bộ phận pháp chế hoặc người phụ trách, không tự kết luận."
      },
      {
        "type": "scenario",
        "title": "Bảng 25 lịch hẹn cần xếp trước giờ đóng cửa",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Còn một tiếng là đóng cửa, bạn có bảng 25 lịch hẹn cần xếp lại theo giờ. Bảng có họ tên, số điện thoại và lý do khám.",
            "choices": [
              {
                "label": "Dán nguyên bảng cho nhanh, vì chỉ còn một tiếng",
                "next": "bad1"
              },
              {
                "label": "Bỏ cột thừa, thay tên bằng mã, lưu bảng tra riêng",
                "next": "s2"
              }
            ]
          },
          "bad1": {
            "text": "Bảng đã rời khỏi phòng khám, gồm cả họ tên, số điện thoại và lý do khám. Bạn tiết kiệm được hai mươi phút nhưng không thể thu lại điều đã gửi.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bảng chỉ còn mã, giờ và loại dịch vụ. AI đã sắp xếp xong. Bạn đang phân vân về bước cuối.",
            "choices": [
              {
                "label": "Dán bảng tra vào AI để nó ghép mã ngược lại thành tên cho nhanh",
                "next": "bad2"
              },
              {
                "label": "Tự ghép mã với tên bằng bảng tra trên máy mình",
                "next": "good"
              }
            ]
          },
          "bad2": {
            "text": "Bạn vừa đưa chìa khoá cho AI. Toàn bộ công sức đổi mã coi như bỏ.",
            "ending": "bad"
          },
          "good": {
            "text": "Bạn ghép xong trong mười phút và ghi lại một câu hỏi cho quản lý về việc dùng cách này. Không thông tin thật nào rời khỏi máy bạn.",
            "ending": "good"
          }
        }
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Xác định rõ việc AI cần làm, rồi bỏ mọi cột không cần cho việc đó.",
          "Bước 2 - Thay tên bằng mã bạn tự đặt.",
          "Bước 3 - Lưu bảng tra ở nơi riêng, không dán cho AI.",
          "Bước 4 - Hỏi quản lý xem cách làm này có được phép."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Mã cho AI thấy khung, bảng tra ở lại với bạn.",
          "Bài sau: ba câu hỏi ngắn gửi quản lý trước khi dùng AI."
        ]
      }
    ]
  },
  {
    "id": 2197,
    "slug": "phong-kham-hoi-quan-ly-truoc-khi-dung-ai-ve-quy-dinh",
    "title": "Chặng 39, Bài 18: Hỏi quản lý và bộ phận pháp chế trước khi dùng AI",
    "subtitle": "Một câu hỏi đúng người, đúng lúc rẻ hơn mọi lần sửa sai sau đó.",
    "duration": "8 phút",
    "difficulty": "Trung bình",
    "emoji": "🙋",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Nhiều nhân viên phòng khám dùng AI theo cách tự thấy hợp lý, rồi mới biết là công cụ đó chưa được duyệt hoặc loại dữ liệu đó không được đưa vào. Bạn không cần biết luật để dùng AI cho đúng, chỉ cần biết hỏi ai và hỏi gì. Ba câu hỏi ngắn gửi đúng người giúp cả quầy dùng chung một quy tắc.",
    "openingQuestion": "Bạn thấy AI rất tiện cho việc soạn tin nhắn ở quầy nhưng không biết phòng khám có cho phép hay không. Bước đầu tiên hợp lý là gì?",
    "openingOptions": [
      "Hỏi quản lý: được dùng công cụ nào, dữ liệu loại nào, ai duyệt",
      "Cứ dùng thử một tuần, nếu không ai phàn nàn nghĩa là được phép",
      "Tra trên mạng điều luật liên quan rồi tự kết luận cho cả quầy",
      "Hỏi đồng nghiệp lâu năm, vì họ chắc chắn biết quy định rồi"
    ],
    "correctOption": 0,
    "explanation": "Quy định dùng công cụ và dữ liệu là việc của phòng khám, và người trả lời được là quản lý hoặc bộ phận pháp chế. Dùng thử rồi chờ phản ứng là cách để chuyện xảy ra trước, hỏi sau. Tự tra luật thì dễ hiểu sai và bạn không có trách nhiệm kết luận thay ai. Đồng nghiệp lâu năm có thể biết thói quen chứ chưa chắc biết quy định hiện hành. Hỏi đúng người là bước rẻ nhất.",
    "diagram": [
      {
        "label": "Bạn có một việc muốn nhờ AI làm",
        "arrow": true
      },
      {
        "label": "Viết ba câu hỏi ngắn: công cụ, dữ liệu, người duyệt",
        "arrow": true
      },
      {
        "label": "Gửi đúng người có trách nhiệm, chờ trả lời",
        "arrow": true
      },
      {
        "label": "Ghi kết quả thành tờ ngắn cả quầy cùng dùng"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một lễ tân trưởng thấy các bạn trong ca mỗi người dùng một công cụ AI khác nhau. Chị gửi quản lý ba câu hỏi: công cụ nào được dùng, loại thông tin nào được đưa vào, ai là người duyệt. Vài ngày sau quản lý trả lời bằng một tờ ngắn. Chị dán tờ đó cạnh máy và cả ca làm theo một cách."
    },
    "quiz": [
      {
        "question": "Trong ba câu hỏi gửi quản lý, câu nào giúp tránh dùng nhầm công cụ?",
        "options": [
          "Phòng khám cho phép dùng công cụ AI nào cho việc hành chính?",
          "Công cụ AI nào đang được nhiều người dùng nhất trên mạng?",
          "Mất bao lâu để công cụ AI trả lời một yêu cầu thông thường?",
          "Công cụ AI nào có giao diện dễ nhìn và dễ dùng nhất hiện nay?"
        ],
        "correct": 0,
        "explanation": "Câu hỏi đầu phải hỏi phòng khám cho phép công cụ nào. Số người dùng, tốc độ trả lời hay giao diện dễ nhìn không cho biết công cụ đó có được duyệt để đưa dữ liệu của phòng khám vào hay không."
      },
      {
        "question": "Khi hỏi \"loại dữ liệu nào được đưa vào AI\", bạn nên nêu ví dụ cụ thể như thế nào?",
        "options": [
          "Nêu ví dụ như tên người bệnh, giờ hẹn, giá dịch vụ, tờ hướng dẫn",
          "Chỉ hỏi \"dữ liệu nào được dùng\" cho ngắn, quản lý tự hiểu ý bạn",
          "Nêu ví dụ bằng điều luật liên quan để trông chuyên nghiệp hơn",
          "Nêu ví dụ chung chung như \"các thông tin\" để khỏi bị hỏi ngược lại"
        ],
        "correct": 0,
        "explanation": "Ví dụ cụ thể giúp người trả lời biết đúng loại nào, và trả lời được ngay từng loại. Câu hỏi quá ngắn dễ bị trả lời chung chung. Trích điều luật là việc bạn không nên làm, còn nói chung chung khiến câu trả lời cũng chung chung."
      },
      {
        "question": "Ai là người duyệt việc dùng AI thường không do bạn tự đặt, mà là ai?",
        "options": [
          "Người quản lý hoặc bộ phận pháp chế, tuỳ cách phòng khám tổ chức",
          "Chính bạn, vì bạn là người trực tiếp dùng nên bạn duyệt cho mình",
          "Nhà cung cấp công cụ, vì họ mới biết dữ liệu được xử lý ra sao",
          "Bất kỳ đồng nghiệp nào cùng ca, miễn là họ đồng ý bằng lời"
        ],
        "correct": 0,
        "explanation": "Người duyệt là người có trách nhiệm trong phòng khám. Tự duyệt cho mình không có tác dụng kiểm tra, nhà cung cấp trả lời về sản phẩm của họ chứ không thay quy định của phòng khám, và đồng ý bằng lời của đồng nghiệp không phải là duyệt."
      },
      {
        "question": "Trong thư hỏi quản lý, bạn có nên dẫn số điều, khoản của luật để hỏi chắc chắn hơn?",
        "options": [
          "Không, chỉ mô tả việc muốn làm rồi hỏi người có trách nhiệm",
          "Có, dẫn điều luật giúp thư nghe nghiêm túc hơn nên được duyệt nhanh",
          "Có, nhưng chỉ khi bạn đã tra được điều luật trên ba trang mạng",
          "Có, vì AI đã tóm điều luật giúp bạn nên nội dung chắc là đúng"
        ],
        "correct": 0,
        "explanation": "Việc của bạn là mô tả việc định làm, còn giải thích luật là của bộ phận pháp chế. Điều luật tra trên mạng có thể lỗi thời hay không áp dụng, và bản tóm tắt của AI về luật rất dễ sai chi tiết."
      },
      {
        "question": "Quản lý trả lời bằng miệng \"cứ dùng cho việc chữ, đừng đưa thông tin bệnh nhân\". Bước hợp lý tiếp theo là gì?",
        "options": [
          "Viết lại thành hai ba dòng, nhắn xác nhận lại rồi lưu",
          "Coi như xong, vì lời nói của quản lý là đủ cho mọi trường hợp về sau",
          "Chụp ảnh nhóm chat làm bằng chứng rồi gửi cho AI để nó ghi nhớ",
          "Chờ một tuần xem có ai phản đối không rồi mới bắt đầu dùng"
        ],
        "correct": 0,
        "explanation": "Viết lại và nhắn xác nhận giúp bạn và cả quầy có một bản chung, tránh mỗi người nhớ một kiểu. Chỉ dựa vào lời nói dễ bị quên hay hiểu khác nhau. Gửi cho AI không phải là lưu quy định, còn chờ phản đối là cách làm dựa vào may rủi."
      }
    ],
    "keyTakeaways": [
      "Ba câu hỏi cần gửi: công cụ nào, dữ liệu loại nào, ai duyệt.",
      "Hỏi người có trách nhiệm, không tự tra luật rồi kết luận.",
      "Nêu ví dụ cụ thể để câu trả lời cụ thể.",
      "Ghi câu trả lời thành tờ ngắn cho cả quầy.",
      "Hỏi trước, dùng sau."
    ],
    "practicePrompt": {
      "question": "Bạn soạn thư hỏi quản lý về việc dùng AI. Phương án nào là bản tốt nhất?",
      "options": [
        "Mô tả việc định làm rồi hỏi ba câu: công cụ, dữ liệu, người duyệt",
        "Viết \"Em có dùng AI được không ạ?\" rồi chờ quản lý trả lời khi nào rảnh",
        "Dẫn điều luật đã tra trên mạng rồi khẳng định là được phép",
        "Kể lại việc đã lỡ dùng AI tuần qua rồi hỏi có sao không"
      ],
      "correct": 0,
      "explanation": "Bản tốt mô tả việc và hỏi đủ ba điểm để nhận lại câu trả lời dùng được ngay. Câu hỏi có/không quá ngắn dễ nhận câu trả lời mơ hồ. Dẫn điều luật là việc của bộ phận pháp chế. Kể chuyện đã lỡ dùng là muộn, nên hỏi từ trước."
    },
    "summary": {
      "keyIdea": "Biết hỏi đúng người ba câu ngắn là kỹ năng quan trọng hơn biết luật.",
      "formula": "Việc muốn làm + công cụ nào + dữ liệu loại nào + ai duyệt = thư hỏi quản lý.",
      "commonMistake": "Tự suy ra là được phép vì chưa ai nói không.",
      "action": "Soạn và gửi ba câu hỏi ngắn cho quản lý của bạn."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Soạn ba câu hỏi ngắn cho quản lý hoặc bộ phận pháp chế: được dùng công cụ AI nào, được đưa dữ liệu loại nào vào (nêu 3 ví dụ ở quầy của bạn), ai duyệt trước khi dùng. Đọc lại một lần để bỏ điều luật hay từ khó nếu có, rồi lưu thành bản nháp hoặc gửi đi.",
      "secondary": "Ngày mai bạn sẽ được hỏi: quản lý đã trả lời chưa, và bạn ghi lại câu trả lời ở đâu."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bạn không cần biết luật để dùng AI cho đúng, nhưng cần biết hỏi ai. Bài này giúp bạn soạn ba câu hỏi ngắn cho quản lý, thay vì tự đoán hay tự tra luật."
      },
      {
        "type": "feynman",
        "title": "Hỏi trước khi dùng AI đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới việc bạn mượn chìa khoá tủ thuốc của phòng khám: bạn không tự lấy, bạn hỏi người giữ chìa xem được mở tủ nào và ghi vào sổ. Dùng AI cho việc phòng khám cũng cần người giữ chìa.",
        "columns": [
          "Thành phần",
          "Mượn chìa tủ thuốc",
          "Dùng AI cho việc phòng khám"
        ],
        "rows": [
          [
            "Người giữ quyết định",
            "Người giữ chìa tủ",
            "Quản lý, bộ phận pháp chế"
          ],
          [
            "Bạn hỏi gì",
            "Được mở tủ nào",
            "Được dùng công cụ nào"
          ],
          [
            "Có ghi lại không",
            "Có, vào sổ",
            "Có, thành tờ ngắn dán ở quầy"
          ],
          [
            "Tự làm thì sao",
            "Có thể lấy nhầm thứ không được động",
            "Có thể đưa nhầm dữ liệu không được đưa"
          ]
        ],
        "oneLiner": "Hỏi người giữ chìa trước, rồi ghi lại điều họ trả lời."
      },
      {
        "type": "heading",
        "text": "Ba câu hỏi ngắn, đúng người"
      },
      {
        "type": "paragraph",
        "text": "Câu một: được dùng công cụ nào. Câu hai: được đưa loại dữ liệu nào, nêu ví dụ cụ thể. Câu ba: ai duyệt trước khi dùng. Bạn không cần trích điều luật, vì đó là việc của bộ phận pháp chế."
      },
      {
        "type": "flow",
        "title": "Từ ý định tới quy tắc cả quầy dùng chung",
        "steps": [
          {
            "label": "Mô tả việc muốn làm",
            "detail": "Một hai câu: bạn muốn nhờ AI làm việc gì, cho ai, bao lâu một lần."
          },
          {
            "label": "Viết ba câu hỏi",
            "detail": "Công cụ nào được dùng, dữ liệu loại nào được đưa, ai là người duyệt."
          },
          {
            "label": "Gửi đúng người",
            "detail": "Quản lý hoặc bộ phận pháp chế, tuỳ cách phòng khám tổ chức. Không hỏi qua người thứ ba."
          },
          {
            "label": "Ghi lại câu trả lời",
            "detail": "Viết thành hai ba dòng và nhắn xác nhận lại để tránh hiểu khác nhau."
          },
          {
            "label": "Chia sẻ cho cả quầy",
            "detail": "Dán tờ ngắn cạnh máy để mọi người dùng chung một quy tắc."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI gọt thư hỏi quản lý cho ngắn và rõ",
        "task": "Bạn có bản nháp thư hỏi quản lý về việc dùng AI. Lắp yêu cầu để AI chỉ gọt câu chữ, không thêm gì vào.",
        "parts": [
          {
            "id": "role",
            "label": "Việc của AI",
            "options": [
              {
                "text": "Viết giúp tôi thư hỏi quản lý về luật dùng AI trong y tế.",
                "feedback": "AI sẽ viết cả những điều luật nghe hợp lý nhưng có thể bịa hoặc lỗi thời, đúng thứ bạn không nên đưa vào thư."
              },
              {
                "text": "Gọt bản nháp dưới đây cho ngắn và lịch sự, giữ nguyên ba câu hỏi của tôi.",
                "good": true,
                "feedback": "AI chỉ làm việc chữ và ba câu hỏi vẫn là của bạn."
              }
            ]
          },
          {
            "id": "data",
            "label": "Nội dung đưa vào",
            "options": [
              {
                "text": "Dán bản nháp cùng danh sách các ca khám tuần trước làm ví dụ.",
                "feedback": "Danh sách ca khám là thông tin người bệnh, không nên đưa cho AI."
              },
              {
                "text": "Dán bản nháp chỉ có ba câu hỏi và ví dụ chung như tên, giờ hẹn, giá dịch vụ.",
                "good": true,
                "feedback": "Ví dụ chung đủ để nhờ gọt câu chữ và không có người thật nào."
              }
            ]
          },
          {
            "id": "limit",
            "label": "Giới hạn",
            "options": [
              {
                "text": "Thêm căn cứ pháp lý để thư có sức nặng hơn.",
                "feedback": "AI tự viết điều luật nghe hợp lý nhưng có thể sai, và việc đó không phải của bạn."
              },
              {
                "text": "Không thêm điều luật hay lời hứa nào, dưới 100 chữ.",
                "good": true,
                "feedback": "Giới hạn giữ thư ngắn và không trích điều bịa."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "role",
              "data",
              "limit"
            ],
            "text": "Kính gửi anh/chị,\n\nEm xin hỏi ba điều trước khi dùng AI cho việc hành chính ở quầy: (1) công cụ nào được dùng, (2) loại dữ liệu nào được đưa vào (ví dụ tên, giờ hẹn, giá dịch vụ), (3) ai là người duyệt. Em cảm ơn anh/chị."
          },
          {
            "requires": [
              "role"
            ],
            "text": "Thư ngắn nhưng AI đã tự thêm câu \"theo quy định hiện hành về bảo vệ dữ liệu\" mà bạn chưa hề hỏi.\n\n(Cụm này nghe hợp lý nhưng là chữ AI thêm.)"
          },
          {
            "text": "Kính gửi anh/chị, căn cứ Điều ... của luật ..., em kính đề nghị...\n\n(AI viết số điều luật nghe rất thật nhưng bạn không thể tin và không nên đưa vào thư.)"
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Hỏi trước rồi mới dùng",
          "text": "Có câu trả lời của người có trách nhiệm. Cả quầy dùng chung một quy tắc. Nếu có sai sót, bạn có lý do rõ ràng để giải thích."
        },
        "right": {
          "label": "Dùng trước, chờ ai phản đối",
          "text": "Mỗi người dùng một kiểu. Chỉ biết là sai khi có chuyện xảy ra. Không có ai chịu trách nhiệm cho quy tắc chung."
        }
      },
      {
        "type": "callout",
        "label": "Không trích luật, chỉ hỏi người có trách nhiệm",
        "text": "Bạn không cần biết điều nào khoản nào. Nhiệm vụ của bạn là mô tả việc định làm và hỏi. Điều gì liên quan luật, để bộ phận pháp chế hoặc người phụ trách trả lời. Nếu AI đưa số điều luật, đừng đưa vào thư."
      },
      {
        "type": "scenario",
        "title": "Ba câu hỏi gửi quản lý",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn muốn nhờ AI soạn tin nhắn ở quầy nhưng chưa biết quy định. Quản lý đang bận cả buổi sáng.",
            "choices": [
              {
                "label": "Cứ dùng thử, chờ xem có ai nhắc không",
                "next": "bad1"
              },
              {
                "label": "Soạn ba câu hỏi ngắn và gửi cho quản lý",
                "next": "s2"
              }
            ]
          },
          "bad1": {
            "text": "Một tuần sau quản lý phát hiện cả quầy dùng ba công cụ khác nhau, có người đã dán cả tên người bệnh. Mọi thứ phải làm lại.",
            "ending": "bad"
          },
          "s2": {
            "text": "Quản lý trả lời bằng miệng khi đi ngang: \"Được dùng cho việc chữ, đừng đưa thông tin người bệnh.\"",
            "choices": [
              {
                "label": "Viết lại thành hai ba dòng và nhắn xác nhận với quản lý",
                "next": "good"
              },
              {
                "label": "Coi như xong, nhớ trong đầu là đủ",
                "next": "bad2"
              }
            ]
          },
          "bad2": {
            "text": "Một tháng sau, mỗi người trong ca nhớ khác nhau về câu \"đừng đưa thông tin\". Bạn không có gì để chứng minh mình hiểu đúng.",
            "ending": "bad"
          },
          "good": {
            "text": "Quản lý xác nhận, bạn in tờ ngắn dán cạnh máy. Từ đó cả ca dùng chung một quy tắc.",
            "ending": "good"
          }
        }
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Mô tả việc bạn muốn nhờ AI làm, một hai câu.",
          "Bước 2 - Viết ba câu hỏi: công cụ nào, dữ liệu loại nào, ai duyệt.",
          "Bước 3 - Gửi cho quản lý hoặc bộ phận pháp chế.",
          "Bước 4 - Ghi câu trả lời thành tờ ngắn và chia sẻ."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Hỏi đúng người ba câu ngắn là cách tự bảo vệ mình và người bệnh.",
          "Bài sau: ghi nhật ký lỗi nhỏ và báo nội bộ mà không đổ lỗi."
        ]
      }
    ]
  },
  {
    "id": 2198,
    "slug": "phong-kham-nhat-ky-loi-sai-va-cach-bao-cao-noi-bo",
    "title": "Chặng 39, Bài 19: Ghi nhật ký lỗi nhỏ và báo nội bộ mà không đổ lỗi",
    "subtitle": "Một tờ ghi ngắn: chuyện gì xảy ra, ai biết, đã làm gì, và quản lý quyết bước tiếp theo.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "📓",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Một tin nhắn nhầm người nhận, một tờ hướng dẫn in sai ngày: lỗi nhỏ nào ở phòng khám cũng có thể xảy ra. Điều làm nó thành chuyện lớn thường là không ai báo, hoặc báo muộn và lộn xộn. Một bản báo cáo ngắn, đủ bốn ý, không đổ lỗi giúp quản lý quyết định nhanh, và giúp bạn khỏi phải nhớ lại mọi chuyện khi bị hỏi.",
    "openingQuestion": "Bạn lỡ nhắn tin nhắc lịch hẹn nhầm số điện thoại của người khác. Ngay sau khi phát hiện, việc nào nên làm đầu tiên?",
    "openingOptions": [
      "Ghi lại đúng việc đã xảy ra rồi báo quản lý ngay",
      "Xoá tin đã gửi đi và coi như chưa có chuyện gì xảy ra với người nhận",
      "Nhắn người nhận nhầm xin đừng nói với ai về tin đó",
      "Chờ tới cuối tuần xem người nhận nhầm có phàn nàn không"
    ],
    "correctOption": 0,
    "explanation": "Báo ngay cùng bản ghi ngắn cho quản lý quyết định bước tiếp, vì bạn không có đủ thông tin và trách nhiệm để quyết một mình. Xoá tin chỉ giấu dấu vết, người nhận đã đọc rồi. Nhắn người nhận nhầm xin đừng nói ra làm chuyện lớn hơn. Chờ xem có phàn nàn là để lỗi nằm im tới khi bị người khác phát hiện.",
    "diagram": [
      {
        "label": "Phát hiện một lỗi nhỏ",
        "arrow": true
      },
      {
        "label": "Ghi bốn ý: chuyện gì, ai biết, đã làm gì, cần gì",
        "arrow": true
      },
      {
        "label": "Gửi quản lý càng sớm càng tốt",
        "arrow": true
      },
      {
        "label": "Quản lý quyết bước tiếp, bạn ghi nhận kết quả"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một lễ tân gửi nhầm tin nhắn hẹn lịch cho một số điện thoại khác. Chị ghi lại bốn ý trong năm phút: gửi lúc nào, tin có nội dung gì, ai đã nhận, và chị đã làm gì. Chị gửi bản ghi cho quản lý cùng câu hỏi \"anh/chị muốn xử lý bước tiếp theo thế nào\". Quản lý gọi người nhận nhầm, và chị bổ sung một bước kiểm số trước khi gửi vào quy trình."
    },
    "quiz": [
      {
        "question": "Bản báo cáo lỗi nội bộ nên có đủ bốn ý nào?",
        "options": [
          "Chuyện gì xảy ra, ai biết, đã làm gì, cần quản lý quyết gì",
          "Ai gây ra lỗi, phạt bao nhiêu, ai chịu trách nhiệm, ai giám sát",
          "Bạn cảm thấy thế nào, lý do bào chữa, ai sai, ai đúng",
          "Ngày giờ lỗi, lời xin lỗi thật dài, lời hứa sẽ không lặp lại"
        ],
        "correct": 0,
        "explanation": "Bốn ý đó đủ để quản lý nắm tình hình và quyết bước tiếp. Truy ai gây lỗi, phạt hay kết tội thuộc việc của quản lý, lời bào chữa và cảm xúc làm bản ghi dài mà không thêm thông tin, và lời xin lỗi hay lời hứa không thay cho mô tả sự việc."
      },
      {
        "question": "Câu nào trong bản báo cáo là câu mô tả sự việc, không đổ lỗi?",
        "options": [
          "Tin nhắn hẹn lịch đã được gửi tới nhầm một số điện thoại lúc 10:20",
          "Do đồng nghiệp ca sáng ghi nhầm số nên tin mới đi nhầm người",
          "Tôi chỉ làm theo bảng chưa kiểm nên lỗi không hoàn toàn của tôi",
          "Hệ thống nhắn tin quá dở nên chuyện này chắc chắn sẽ còn xảy ra"
        ],
        "correct": 0,
        "explanation": "Mô tả sự việc chỉ nêu điều đã xảy ra, có giờ và có thể kiểm. Các câu còn lại chuyển trách nhiệm sang người khác hoặc hệ thống trước khi có ai điều tra, và không giúp quản lý biết chuyện gì đã xảy ra."
      },
      {
        "question": "Bạn nhờ AI viết lại bản báo cáo cho gọn. Cách nào đúng?",
        "options": [
          "Chỉ đưa bản ghi đã bỏ tên và số thật, rồi đọc lại kết quả",
          "Dán nguyên bản gồm tên người nhận nhầm và số điện thoại thật",
          "Dán cả đoạn chat gốc để AI có đủ bằng chứng viết lại cho chuẩn",
          "Nhờ AI tự viết báo cáo dựa trên ký ức của nó về những lỗi tương tự"
        ],
        "correct": 0,
        "explanation": "Báo cáo lỗi thường chứa thông tin người thật, nên bỏ tên và số khỏi bản đưa cho AI. Dán đoạn chat gốc là đưa thêm dữ liệu ra ngoài, và AI không có ký ức về sự việc của bạn nên nếu bảo nó tự viết là nó bịa."
      },
      {
        "question": "Sau khi báo quản lý, bạn nên ghi thêm điều gì vào nhật ký lỗi của mình?",
        "options": [
          "Kết quả xử lý và một bước kiểm nhỏ để lỗi tương tự không lặp lại",
          "Tên người bạn nghĩ đã góp phần gây ra lỗi để sau này tránh",
          "Lý do vì sao lỗi này không đáng kể so với các lỗi trước đây",
          "Một lời hứa là lần sau bạn sẽ không bao giờ mắc lại lỗi nào"
        ],
        "correct": 0,
        "explanation": "Nhật ký hữu ích khi nó ghi kết quả và một thay đổi cụ thể trong quy trình. Ghi tên người khác là đổ lỗi, hạ thấp lỗi làm bạn bỏ bài học, và lời hứa không bao giờ mắc lỗi thì không kiểm chứng được."
      },
      {
        "question": "Báo lỗi sau ba ngày vì \"muốn chắc chắn trước\". Điều đó có vấn đề gì?",
        "options": [
          "Quản lý mất ba ngày mà không thể chặn hay xử lý sớm",
          "Không sao, vì báo càng muộn thì càng đầy đủ và chuyên nghiệp",
          "Không sao, vì lỗi nhỏ thì lúc nào báo cũng như nhau cả",
          "Chỉ có vấn đề nếu lỗi đó bị ai khác phát hiện trước bạn"
        ],
        "correct": 0,
        "explanation": "Trong ba ngày đó người nhận nhầm có thể đã đọc, chia sẻ hay hiểu lầm mà quản lý không có cơ hội can thiệp. Bản báo cáo ngắn gửi sớm tốt hơn bản đầy đủ gửi muộn, và lỗi có bị ai phát hiện trước hay không không đổi việc báo muộn là sai."
      }
    ],
    "keyTakeaways": [
      "Báo sớm, ngắn, đủ bốn ý: chuyện gì, ai biết, đã làm gì, cần quyết gì.",
      "Mô tả sự việc, không đổ lỗi cho ai.",
      "Ghi thêm một bước kiểm nhỏ để lỗi không lặp lại.",
      "Đưa cho AI chỉ bản đã bỏ tên và số thật.",
      "Việc quyết bước tiếp thuộc về quản lý."
    ],
    "practicePrompt": {
      "question": "Tin nhắn nhắc lịch gửi nhầm người. Bạn nhờ AI viết báo cáo. Yêu cầu nào tốt nhất?",
      "options": [
        "Đây là bản ghi bỏ tên: gửi lúc, tới ai, đã làm gì. Gọt cho ngắn, giữ đủ bốn ý.",
        "Viết báo cáo lỗi thật hay để quản lý thấy tôi có trách nhiệm.",
        "Viết giúp tôi lý do vì sao lỗi này không phải lỗi của tôi.",
        "Dán nguyên tin nhắn nhầm và số điện thoại, viết bản báo cáo."
      ],
      "correct": 0,
      "explanation": "Yêu cầu tốt đưa dữ kiện đã bỏ thông tin thật và giữ nguyên bốn ý. Bảo AI viết cho hay dễ ra lời thêm mắm muối, yêu cầu biện hộ là đổ lỗi, còn dán tin nhắn với số thật là đưa thông tin người khác ra ngoài."
    },
    "summary": {
      "keyIdea": "Báo sớm, ngắn, đủ bốn ý và không đổ lỗi để quản lý quyết được ngay.",
      "formula": "Chuyện gì xảy ra + ai biết + đã làm gì + cần quyết gì = một bản báo lỗi.",
      "commonMistake": "Giấu hoặc chờ, rồi báo muộn bằng một bản dài đầy lời biện hộ.",
      "action": "Viết thử một bản báo lỗi mẫu bốn dòng cho một lỗi giả định ở quầy."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Nghĩ tới một lỗi nhỏ có thể xảy ra ở quầy (gửi nhầm người, in sai ngày). Viết bốn dòng: chuyện gì xảy ra, ai đã biết, bạn đã làm gì, bạn cần quản lý quyết gì. Chưa cần dùng thông tin thật. Nhờ AI gọt lại bản giả định đó cho ngắn.",
      "secondary": "Ngày mai bạn sẽ được hỏi: bản bốn dòng của bạn nằm ở đâu và có từ nào đổ lỗi không."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Lỗi nhỏ nào ở phòng khám cũng có thể xảy ra. Bài này dạy cách ghi và báo ngắn gọn, đủ ý, không đổ lỗi, để quản lý quyết được bước tiếp theo."
      },
      {
        "type": "feynman",
        "title": "Báo lỗi nội bộ đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới việc bạn làm đổ ly nước trên bàn làm việc: bạn không giấu mà báo ngay, nói ly đổ lúc nào, nước chảy tới đâu, và bạn đã lau chưa. Người dọn dẹp cần đúng bốn điều đó để xử lý.",
        "columns": [
          "Thành phần",
          "Làm đổ ly nước ở bàn",
          "Gửi nhầm một tin nhắn"
        ],
        "rows": [
          [
            "Chuyện gì",
            "Ly nước đổ trên bàn",
            "Tin nhắn gửi nhầm số"
          ],
          [
            "Ai biết",
            "Người ngồi cạnh",
            "Người nhận nhầm, đồng nghiệp ca"
          ],
          [
            "Đã làm gì",
            "Lau tạm phần nước",
            "Ngừng gửi tin tương tự, ghi lại"
          ],
          [
            "Cần gì",
            "Người dọn hoàn tất",
            "Quản lý quyết bước tiếp theo"
          ]
        ],
        "oneLiner": "Báo sớm, nói đúng những gì đã xảy ra và đã làm, để người có trách nhiệm quyết bước tiếp theo."
      },
      {
        "type": "heading",
        "text": "Bốn ý, không đổ lỗi"
      },
      {
        "type": "paragraph",
        "text": "Một bản báo lỗi tốt dài không quá vài dòng. Nó nói chuyện gì đã xảy ra, những ai biết, bạn đã làm gì ngay sau đó, và bạn cần quản lý quyết điều gì. Nó không nói ai sai, vì việc tìm nguyên nhân là của quản lý sau khi có đủ thông tin."
      },
      {
        "type": "flow",
        "title": "Từ lúc phát hiện lỗi tới khi quản lý quyết",
        "steps": [
          {
            "label": "Dừng lại và ghi nhanh",
            "detail": "Ghi ngay giờ, việc đã xảy ra, ai liên quan. Đừng chờ đến khi nhớ đầy đủ."
          },
          {
            "label": "Giữ bằng chứng nguyên vẹn",
            "detail": "Không xoá tin hay sửa số liệu. Quản lý cần thấy việc đúng như nó xảy ra."
          },
          {
            "label": "Viết bốn ý",
            "detail": "Chuyện gì, ai biết, đã làm gì, cần quyết gì. Dùng câu ngắn và dữ kiện có giờ."
          },
          {
            "label": "Gửi quản lý sớm",
            "detail": "Bản ngắn gửi sớm tốt hơn bản dài gửi muộn. Nếu cần, nhờ AI gọt lại bản đã bỏ tên và số thật."
          },
          {
            "label": "Ghi kết quả và một bước kiểm mới",
            "detail": "Sau khi quản lý xử lý, ghi lại kết quả và một thay đổi nhỏ để lần sau không lặp lại."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI gọt bản báo lỗi tin nhắn gửi nhầm",
        "task": "Bạn đã có bản ghi bốn ý. Lắp yêu cầu để AI chỉ gọt câu chữ, không thêm chi tiết và không đổ lỗi.",
        "parts": [
          {
            "id": "input",
            "label": "Nội dung đưa vào",
            "options": [
              {
                "text": "Dán nguyên tin nhắn nhầm, số điện thoại người nhận và tên người bệnh.",
                "feedback": "Đó là thông tin của người thật, không nên đưa cho AI."
              },
              {
                "text": "Dán bản ghi bốn ý đã bỏ tên và số thật, chỉ ghi \"người nhận nhầm\", \"tin nhắn hẹn lịch\".",
                "good": true,
                "feedback": "AI có đủ dữ kiện để gọt câu chữ mà không thấy thông tin thật."
              }
            ]
          },
          {
            "id": "task",
            "label": "Việc AI làm",
            "options": [
              {
                "text": "Viết lại thật hay để quản lý thấy tôi rất có trách nhiệm.",
                "feedback": "AI sẽ thêm lời xin lỗi và lời hứa dài dòng, những thứ không có trong sự việc."
              },
              {
                "text": "Gọt cho ngắn, giữ đủ bốn ý và giữ đúng giờ, việc đã làm.",
                "good": true,
                "feedback": "Yêu cầu chỉ làm việc chữ, giữ dữ kiện đã có."
              }
            ]
          },
          {
            "id": "limit",
            "label": "Giới hạn",
            "options": [
              {
                "text": "Nếu thiếu thông tin thì tự bổ sung cho đủ ý.",
                "feedback": "AI sẽ tự bịa chi tiết như giờ hoặc tên người, và bản báo cáo không còn đúng sự thật."
              },
              {
                "text": "Không thêm chi tiết nào ngoài bản ghi; thiếu thì đánh dấu [chưa rõ].",
                "good": true,
                "feedback": "Chỗ thiếu được đánh dấu để bạn bổ sung bằng thông tin thật."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "input",
              "task",
              "limit"
            ],
            "text": "Chuyện gì: tin nhắn hẹn lịch được gửi nhầm cho một người khác lúc 10:20.\nAi biết: người nhận nhầm và tôi.\nĐã làm gì: tôi dừng gửi tin tương tự và giữ nguyên tin nhắn.\nCần quản lý quyết: liên hệ người nhận nhầm như thế nào. [chưa rõ: người nhận đã đọc hay chưa]"
          },
          {
            "requires": [
              "input"
            ],
            "text": "Báo cáo: sự việc xảy ra do nhân viên ca sáng nhập nhầm số, và tôi đã ngay lập tức liên hệ người nhận...\n\n(Câu đầu đổ lỗi cho ca sáng, câu sau khẳng định điều bạn chưa làm. Cả hai đều do AI bịa.)"
          },
          {
            "text": "Kính gửi anh/chị, tôi xin lỗi vì sự cố nghiêm trọng vừa xảy ra với người bệnh Nguyễn Văn A, số 09xx...\n\n(Có tên và số thật trong bản, lại thêm chữ xin lỗi sâu sắc mà bạn không yêu cầu.)"
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Báo cáo bốn ý, không đổ lỗi",
          "text": "Có giờ, có việc đã làm, có điều cần quyết. Quản lý đọc trong một phút. Người nhận biết bạn đã làm gì ngay sau khi phát hiện."
        },
        "right": {
          "label": "Báo cáo dài, đổ lỗi hoặc giấu",
          "text": "Nhiều lời xin lỗi, ít dữ kiện. Đổ cho người hay hệ thống trước khi có ai kiểm tra. Hoặc báo muộn khi việc đã lan."
        }
      },
      {
        "type": "callout",
        "label": "Việc quyết là của quản lý",
        "text": "Bạn báo dữ kiện và điều bạn đã làm, còn việc có gọi người nhận nhầm, có báo thêm ai, có cần xử lý pháp lý hay không thì quản lý hoặc bộ phận pháp chế quyết. Đừng tự tuyên bố lỗi nhỏ hay lớn thay họ."
      },
      {
        "type": "scenario",
        "title": "Tin nhắn nhầm người nhận lúc 10:20",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn vừa gửi tin nhắc lịch cho một số điện thoại, rồi nhận ra bạn gõ nhầm một số. Người nhận chưa trả lời.",
            "choices": [
              {
                "label": "Ghi lại việc đã xảy ra và báo quản lý ngay",
                "next": "s2"
              },
              {
                "label": "Chờ xem người nhận có phản hồi rồi mới quyết",
                "next": "bad1"
              }
            ]
          },
          "bad1": {
            "text": "Người nhận nhầm chuyển tin cho một nhóm bạn. Khi quản lý biết thì tin đã đi xa, và bạn không còn lợi thế báo sớm.",
            "ending": "bad"
          },
          "s2": {
            "text": "Quản lý cảm ơn và hỏi bạn ghi lại được những gì. Bạn cần viết bản báo cáo.",
            "choices": [
              {
                "label": "Viết bốn ý ngắn: chuyện gì, ai biết, đã làm gì, cần quyết gì",
                "next": "good"
              },
              {
                "label": "Viết một trang dài giải thích vì sao lỗi không phải do bạn",
                "next": "bad2"
              }
            ]
          },
          "bad2": {
            "text": "Quản lý phải đọc lâu mới tìm ra dữ kiện chính và mất thêm thời gian. Không khí trong nhóm cũng nặng hơn.",
            "ending": "bad"
          },
          "good": {
            "text": "Quản lý xử lý trong mười phút và thêm bước kiểm số vào quy trình. Nhật ký của bạn có thêm một dòng bài học.",
            "ending": "good"
          }
        }
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Ghi ngay giờ, việc đã xảy ra, ai liên quan.",
          "Bước 2 - Giữ nguyên bằng chứng, không xoá tin hay sửa số.",
          "Bước 3 - Viết bốn ý rồi gửi quản lý sớm.",
          "Bước 4 - Ghi kết quả và một bước kiểm mới."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Báo sớm, ngắn, không đổ lỗi là cách nhanh nhất để lỗi nhỏ ở yên trong kích thước nhỏ.",
          "Bài sau: dự án cuối, ghép cả bộ quy trình hành chính có người duyệt."
        ]
      }
    ]
  },
  {
    "id": 2199,
    "slug": "phong-kham-du-an-cuoi-bo-quy-trinh-hanh-chinh-co-ai-ho-tro",
    "title": "Chặng 39, Bài 20: Dự án cuối: bộ quy trình hành chính có AI hỗ trợ và có người duyệt",
    "subtitle": "Ghép các mảnh đã làm thành một bộ gọn, ghi rõ việc nào AI giúp và ai duyệt.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "📋",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Bạn đã làm tin mẫu, tờ hướng dẫn, quy trình ca và biết những việc không được làm với AI. Nếu chúng nằm rải rác mỗi nơi một mảnh, đến lúc cần thì không ai tìm ra. Một bộ gọn, mỗi mảnh ghi rõ người duyệt và ngày duyệt, giúp cả phòng khám dùng chung và giúp người mới vào ca hiểu ngay việc nào tự làm, việc nào phải hỏi.",
    "openingQuestion": "Bạn ghép tin mẫu, tờ hướng dẫn và quy trình ca thành một bộ để dùng trong phòng khám. Điều nào không thể thiếu trước khi đưa cả bộ vào dùng?",
    "openingOptions": [
      "Ghi rõ ai duyệt từng mảnh và ngày duyệt trước khi dùng",
      "Nhờ AI đọc lại cả bộ và xác nhận rằng nội dung đã ổn",
      "Nhân bản bộ tài liệu ra nhiều bản in để ai cũng có một bản",
      "Đặt tên bộ tài liệu thật ấn tượng để nhân viên dễ nhớ"
    ],
    "correctOption": 0,
    "explanation": "Bộ quy trình chỉ có giá trị khi có người có trách nhiệm đã xem và đồng ý, và khi ai đọc cũng thấy được điều đó. AI đọc lại không thay được người duyệt, vì nó không chịu trách nhiệm và không biết quy định phòng khám. In nhiều bản mà chưa duyệt chỉ phát tán bản có thể sai. Tên ấn tượng không làm nội dung đúng hơn.",
    "diagram": [
      {
        "label": "Gom các mảnh: tin mẫu, tờ hướng dẫn, quy trình ca",
        "arrow": true
      },
      {
        "label": "Thêm danh sách việc không được làm với AI",
        "arrow": true
      },
      {
        "label": "Mỗi mảnh ghi người duyệt và ngày duyệt",
        "arrow": true
      },
      {
        "label": "Trình quản lý duyệt cả bộ rồi mới đưa vào dùng"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một phòng khám nhỏ gom lại sáu tin mẫu, ba tờ hướng dẫn, một quy trình ca một trang và danh sách việc không làm với AI vào cùng một thư mục. Mỗi tệp ghi rõ tên người duyệt và ngày duyệt ở dòng đầu. Người mới vào ca chỉ cần đọc thư mục đó trong nửa giờ đầu và biết việc nào tự làm, việc nào phải hỏi."
    },
    "quiz": [
      {
        "question": "Bộ quy trình hành chính hoàn chỉnh cần có đủ những mảnh nào?",
        "options": [
          "Tin mẫu, tờ hướng dẫn, quy trình ca, danh sách việc không làm với AI",
          "Chỉ tin mẫu và tờ hướng dẫn, vì hai thứ đó nhân viên dùng nhiều nhất",
          "Chỉ quy trình ca, vì các mảnh còn lại nằm sẵn trong quy trình rồi",
          "Tin mẫu và một danh sách công cụ AI đang được ưa chuộng hiện nay"
        ],
        "correct": 0,
        "explanation": "Bộ đủ cần cả bốn mảnh vì mỗi mảnh trả lời một câu hỏi: nói gì, phát gì, làm gì, không làm gì. Bỏ danh sách việc không làm với AI là bỏ luôn phần bảo vệ người bệnh, và danh sách công cụ ưa chuộng không phải là thứ quản lý duyệt."
      },
      {
        "question": "Ghi \"người duyệt\" trên mỗi mảnh để làm gì?",
        "options": [
          "Để người đọc biết mảnh nào đã có người chịu trách nhiệm xem qua",
          "Để người duyệt có thể bị phạt nếu tài liệu sau này có lỗi",
          "Để AI biết tài liệu nào tin được khi đọc lại toàn bộ bộ",
          "Để tài liệu trông trang trọng và đủ chữ ký như văn bản chính thức"
        ],
        "correct": 0,
        "explanation": "Tên và ngày duyệt cho người đọc biết mảnh nào đã qua kiểm tra và hỏi ai khi có thắc mắc. Mục đích không phải để phạt, AI không đọc tài liệu theo cách đó, và tính trang trọng không phải lý do."
      },
      {
        "question": "Bản nháp bộ quy trình có câu \"AI đã kiểm tra toàn bộ nội dung nên không cần duyệt\". Bạn xử lý ra sao?",
        "options": [
          "Xoá câu đó, vì việc duyệt phải do người có trách nhiệm làm",
          "Giữ nguyên, vì AI đọc rất nhanh nên có thể duyệt thay người",
          "Giữ nguyên nhưng thêm tên công cụ AI để có căn cứ rõ ràng",
          "Sửa thành \"AI đã kiểm tra hai lần\" để nghe đáng tin hơn"
        ],
        "correct": 0,
        "explanation": "AI có thể góp ý câu chữ nhưng không chịu trách nhiệm với nội dung và không biết quy định phòng khám. Thêm tên công cụ hay tăng số lần kiểm không biến AI thành người duyệt."
      },
      {
        "question": "Người mới vào ca hỏi việc nào được nhờ AI. Bạn nên chỉ họ đâu?",
        "options": [
          "Danh sách việc được và không được làm với AI trong bộ quy trình",
          "Tự hỏi AI xem việc nào nên nhờ AI làm giúp cho phù hợp",
          "Đoán theo việc nhiều đồng nghiệp đang làm rồi làm tương tự",
          "Nói miệng vài việc bạn nhớ và bảo họ cứ làm là sẽ ổn"
        ],
        "correct": 0,
        "explanation": "Danh sách viết sẵn, đã có người duyệt, là câu trả lời chung cho cả ca. Hỏi AI thì được câu trả lời không dựa trên quy định phòng khám, bắt chước đồng nghiệp lan truyền cả thói quen sai, và nói miệng dễ thiếu hoặc lệch."
      },
      {
        "question": "Một mảnh trong bộ đã quá lâu chưa duyệt lại. Điều nào nên làm?",
        "options": [
          "Ghi ngày duyệt lại rồi nhờ người có trách nhiệm xem trước khi dùng tiếp",
          "Cứ dùng tiếp, vì tài liệu không tự hỏng theo thời gian",
          "Xoá luôn ngày duyệt cũ để không ai thấy nó đã quá cũ",
          "Nhờ AI tự cập nhật mảnh đó cho phù hợp với hiện tại"
        ],
        "correct": 0,
        "explanation": "Giá, giờ mở cửa hay quy định đổi theo thời gian, nên mảnh đã cũ cần được người có trách nhiệm xem lại. Xoá ngày duyệt che lỗi thay vì sửa, và AI không biết phòng khám đã đổi gì."
      }
    ],
    "keyTakeaways": [
      "Bộ đủ bốn mảnh: tin mẫu, tờ hướng dẫn, quy trình ca, danh sách việc không làm với AI.",
      "Mỗi mảnh ghi người duyệt và ngày duyệt.",
      "AI giúp soạn, người duyệt mới là người chịu trách nhiệm.",
      "Có ngày duyệt lại để tài liệu không cũ dần.",
      "Người mới đọc bộ này trước khi làm việc."
    ],
    "practicePrompt": {
      "question": "Bạn hoàn tất bộ quy trình và sắp trình quản lý. Việc nào cần làm cuối cùng?",
      "options": [
        "Ghi người duyệt và ngày duyệt trên từng mảnh, rồi mới trình",
        "Xoá dòng người duyệt để bộ tài liệu trông gọn hơn",
        "Nhờ AI ký tên xác nhận rằng bộ tài liệu đã đầy đủ",
        "Gửi thẳng cho nhân viên dùng ngay, sửa sau khi có phản hồi từ quầy"
      ],
      "correct": 0,
      "explanation": "Người duyệt và ngày duyệt là thứ phân biệt bộ đã kiểm với bản nháp. Xoá dòng đó bỏ mất bằng chứng, AI không ký xác nhận được, và gửi thẳng cho nhân viên dùng khi chưa duyệt là để lỗi đi vào việc thật."
    },
    "summary": {
      "keyIdea": "Bộ quy trình gọn, đủ bốn mảnh, có người duyệt và ngày duyệt trên từng mảnh.",
      "formula": "Tin mẫu + tờ hướng dẫn + quy trình ca + việc không làm với AI + người duyệt = bộ dùng được.",
      "commonMistake": "Cho AI đọc lại rồi coi như đã duyệt.",
      "action": "Dựng khung thư mục bốn mảnh cho phòng khám của bạn."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Tạo một thư mục hoặc một tệp có bốn mục: tin mẫu, tờ hướng dẫn, quy trình ca, việc không làm với AI. Dưới mỗi mục ghi tên một mảnh bạn đã có (hoặc \"chưa có\"), người duyệt và ngày duyệt dự kiến. Nhờ AI gọt tiêu đề cho gọn, nhưng không đưa thông tin người bệnh.",
      "secondary": "Ngày mai bạn sẽ được hỏi: mục nào còn \"chưa có\", và ai sẽ duyệt mục đầu tiên."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Sau nhiều bài, bạn đã có nhiều mảnh rời: tin mẫu, tờ hướng dẫn, quy trình ca, danh sách việc không làm với AI. Bài cuối ghép chúng thành một bộ gọn, mỗi mảnh có người duyệt."
      },
      {
        "type": "feynman",
        "title": "Bộ quy trình có người duyệt đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới cuốn sổ tay công thức của một quán ăn: mỗi món có ghi bếp trưởng đã nếm và cho phép phục vụ. Người mới vào bếp làm theo sổ, không tự nghĩ ra món.",
        "columns": [
          "Thành phần",
          "Sổ công thức quán ăn",
          "Bộ quy trình phòng khám"
        ],
        "rows": [
          [
            "Nội dung",
            "Công thức từng món",
            "Tin mẫu, hướng dẫn, quy trình ca"
          ],
          [
            "Người duyệt",
            "Bếp trưởng nếm thử",
            "Quản lý hoặc người có chuyên môn"
          ],
          [
            "Ghi ngày",
            "Ngày chốt công thức",
            "Ngày duyệt và ngày xem lại"
          ],
          [
            "Điều cấm",
            "Món không được đổi nguyên liệu",
            "Việc không được làm với AI"
          ]
        ],
        "oneLiner": "Bộ quy trình như cuốn sổ công thức: có nội dung, có người duyệt, có điều cấm, để ai cũng làm giống nhau."
      },
      {
        "type": "heading",
        "text": "Bốn mảnh và một dòng người duyệt"
      },
      {
        "type": "paragraph",
        "text": "Bốn mảnh là tin mẫu cho quầy, tờ hướng dẫn giấy tờ khi đến khám, quy trình ca một trang, và danh sách việc không được làm với AI. Trên đầu mỗi mảnh, một dòng ghi ai duyệt và duyệt ngày nào. AI giúp soạn, nhưng dòng đó là của người."
      },
      {
        "type": "flow",
        "title": "Từ các mảnh rời tới bộ đã duyệt",
        "steps": [
          {
            "label": "Gom các mảnh đã làm",
            "detail": "Tin mẫu, tờ hướng dẫn, quy trình ca. Đặt chung một thư mục dễ tìm."
          },
          {
            "label": "Thêm danh sách việc không làm với AI",
            "detail": "Ghi ngắn: không dán thông tin người bệnh, không nhờ AI trả lời câu hỏi chuyên môn, không gửi tin chưa duyệt."
          },
          {
            "label": "Ghi người duyệt và ngày",
            "detail": "Mỗi mảnh có một dòng đầu: người duyệt, ngày duyệt, ngày xem lại."
          },
          {
            "label": "Trình quản lý duyệt",
            "detail": "Đưa cả bộ cho quản lý hoặc người có chuyên môn. Họ sửa hoặc đồng ý."
          },
          {
            "label": "Đưa vào dùng và đặt lịch xem lại",
            "detail": "Phổ biến cho cả ca, đặt lịch xem lại để tài liệu không cũ dần."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Bản nháp bộ quy trình do AI viết giúp",
        "task": "AI đã viết bản nháp phần mở đầu của bộ quy trình. Bấm vào những câu AI tự thêm mà bạn chưa hề đưa hoặc chưa được duyệt, rồi nộp.",
        "segments": [
          {
            "text": "Bộ quy trình gồm bốn phần: tin mẫu, tờ hướng dẫn, quy trình ca và danh sách việc không làm với AI."
          },
          {
            "text": "Mỗi phần có một dòng đầu ghi người duyệt và ngày duyệt."
          },
          {
            "text": "Bộ quy trình này đã được cơ quan y tế địa phương chứng nhận hợp lệ.",
            "error": "Bạn chưa hề đưa thông tin này. AI tự thêm một chứng nhận không có thật để nghe uy tín hơn."
          },
          {
            "text": "Nhân viên có thể dùng AI để trả lời câu hỏi về thuốc của người bệnh nếu câu hỏi đơn giản.",
            "error": "Đây là điều cấm trong danh sách việc không làm với AI. Câu hỏi về thuốc phải chuyển cho dược sĩ hoặc bác sĩ."
          },
          {
            "text": "Bộ quy trình cần được xem lại mỗi ba tháng và khi có thay đổi lớn."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Bộ có người duyệt",
          "text": "Mỗi mảnh có tên người và ngày duyệt. Người mới đọc là làm được. Khi có thắc mắc biết hỏi ai. Cả ca dùng chung một quy tắc."
        },
        "right": {
          "label": "Bộ chưa ai duyệt",
          "text": "Mỗi người nhớ một kiểu. Không rõ mảnh nào còn đúng. AI viết gì thì dùng đó, chưa ai thực sự xem lại."
        }
      },
      {
        "type": "callout",
        "label": "AI giúp soạn, người mới duyệt",
        "text": "AI giúp gọt câu chữ và sắp xếp gọn gàng. Nội dung liên quan chuyên môn y tế hay quy định là việc của người có chuyên môn hoặc bộ phận pháp chế duyệt. Đừng để AI thêm chứng nhận, số liệu hay lời hứa mà bạn chưa hề đưa."
      },
      {
        "type": "scenario",
        "title": "Trình bộ quy trình cho quản lý",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn đã có bốn mảnh nhưng chưa mảnh nào có người duyệt. Quản lý hỏi khi nào bộ có thể đưa vào dùng.",
            "choices": [
              {
                "label": "Đưa vào dùng ngay, vì nhân viên đang cần",
                "next": "bad1"
              },
              {
                "label": "Đề nghị quản lý xem và duyệt từng mảnh trước",
                "next": "s2"
              }
            ]
          },
          "bad1": {
            "text": "Tuần sau người mới dùng một tờ hướng dẫn có chỗ sai giờ mở cửa. Không ai biết ai đã xem tờ đó, và việc sửa mất nhiều thời gian.",
            "ending": "bad"
          },
          "s2": {
            "text": "Quản lý đồng ý xem và nhờ bạn chuẩn bị. Bạn cần quyết định phần cuối.",
            "choices": [
              {
                "label": "Ghi người duyệt, ngày duyệt và ngày xem lại lên từng mảnh",
                "next": "good"
              },
              {
                "label": "Chỉ nhờ AI đọc lại rồi ghi \"đã kiểm tra\" ở cuối bộ",
                "next": "bad2"
              }
            ]
          },
          "bad2": {
            "text": "Dòng \"đã kiểm tra\" không có tên người nên không ai chịu trách nhiệm. Khi có chỗ sai, không ai biết hỏi ai.",
            "ending": "bad"
          },
          "good": {
            "text": "Bộ được duyệt trong ba ngày. Người mới đọc trong nửa giờ và biết việc nào tự làm, việc nào phải hỏi.",
            "ending": "good"
          }
        }
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Gom bốn mảnh vào một thư mục.",
          "Bước 2 - Thêm danh sách việc không làm với AI.",
          "Bước 3 - Ghi người duyệt, ngày duyệt, ngày xem lại trên từng mảnh.",
          "Bước 4 - Trình quản lý duyệt rồi mới đưa vào dùng."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Bộ quy trình tốt là bộ ai cũng đọc được và biết ai đã duyệt.",
          "Bạn đã hoàn tất chặng: dùng AI cho việc hành chính phòng khám, có người duyệt và không đụng vào thông tin người bệnh."
        ]
      }
    ]
  }
];
