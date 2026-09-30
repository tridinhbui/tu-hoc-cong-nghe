import type { Lesson } from "../lesson-types";

// Chặng 53, bài 16-20. Giáo trình: scripts/curriculum/stage-53.json.
// Nội dung về Power Automate chỉ nói khái niệm bền (lịch sử chạy, cảnh báo, quyền);
// không khẳng định nút bấm, giá hay tính năng theo phiên bản.
export const S53_D_LESSONS: Lesson[] = [
  {
    "id": 2475,
    "slug": "thu-luong-bang-du-lieu-mau-va-bao-ve-nguoi-that",
    "title": "Chặng 53, Bài 16: Thử luồng bằng dữ liệu mẫu và bảo vệ người nhận thật",
    "subtitle": "Trước khi in 500 tờ, bạn in thử một tờ. Luồng tự động cũng cần một tờ in thử.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "🧪",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Một luồng gửi thư chạy sai không sai một lần mà sai hàng chục lần, tới hàng chục người, trong vài giây. Thử bằng dữ liệu mẫu và người nhận là chính bạn là cách rẻ nhất để lỗi chỉ làm phiền đúng một người: bạn.",
    "openingQuestion": "Chiều thứ Năm bạn dựng xong luồng nhắc hạn nộp báo cáo cho 40 đồng nghiệp. Trước khi bật, việc đầu tiên nên làm là gì?",
    "openingOptions": [
      "Bật luôn, có sai thì 40 người báo lại là biết ngay chỗ hỏng",
      "Chạy thử với người nhận là chính bạn, dùng dữ liệu mẫu bịa ra",
      "Gửi thử cho trưởng phòng, vì sếp duyệt rồi thì luồng chắc ổn rồi",
      "Đọc lại tên các bước trên màn hình, thấy hợp lý là bật được"
    ],
    "correctOption": 1,
    "explanation": "Lỗi của luồng tự động bị nhân lên theo số người nhận: một ô tên trống thành 40 lá thư chào \"Xin chào ,\" trong vài giây, và thư đã gửi thì không thu hồi được. Chạy thử với người nhận là chính bạn giữ thiệt hại ở mức một hộp thư. Đợi 40 người báo lại là dùng đồng nghiệp làm người thử. Gửi cho trưởng phòng chỉ chuyển người bị làm phiền sang người khác. Đọc tên bước không cho thấy luồng thực sự làm gì với dữ liệu.",
    "diagram": [
      {
        "label": "Bạn dựng luồng xong",
        "arrow": true
      },
      {
        "label": "Đổi người nhận thành chính bạn",
        "arrow": true
      },
      {
        "label": "Chạy với dữ liệu mẫu, gắn nhãn [THỬ]",
        "arrow": true
      },
      {
        "label": "Đọc kết quả, sửa lỗi",
        "arrow": true
      },
      {
        "label": "Đổi lại người nhận thật, bật"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Một chị kế toán dựng luồng nhắc khách hàng đóng tiền và bật thử ngay với danh sách khách thật. Một ô \"tên khách\" bị trống trong bảng, nên vài chục khách nhận thư mở đầu bằng \"Kính gửi ,\". Nếu chị chạy thử trước với một dòng bịa và địa chỉ của chính mình, lỗi ô trống đã hiện ra trong hộp thư của chị."
    },
    "quiz": [
      {
        "question": "Vì sao lúc thử nên đặt người nhận là chính bạn?",
        "options": [
          "Để thư đi nhanh hơn vì ít người nhận hơn",
          "Nếu luồng gửi nhầm hoặc gửi lặp, chỉ mình bạn nhận thư lỗi",
          "Để hệ thống coi đây là chế độ thử và tự chặn gửi",
          "Để bạn đỡ phải viết nội dung thư cho đàng hoàng"
        ],
        "correct": 1,
        "explanation": "Đặt người nhận là chính bạn giới hạn thiệt hại ở một hộp thư. Số người nhận không làm luồng nhanh hơn đáng kể. Luồng không tự biết đây là lần thử: nếu bạn để người nhận thật, nó gửi thật. Nội dung thư vẫn phải đúng vì bạn dùng chính thư đó để kiểm."
      },
      {
        "question": "Dữ liệu mẫu để thử luồng nên trông thế nào?",
        "options": [
          "Bản sao 50 dòng thật đầu tiên, nhưng chỉ gửi cho bạn",
          "Vài dòng viết sơ sài, bỏ bớt cột để chạy thử cho nhanh",
          "Cùng cấu trúc với dữ liệu thật, nội dung bịa ra",
          "Một dòng duy nhất, đúng ngày hôm nay và đủ mọi trường"
        ],
        "correct": 2,
        "explanation": "Dữ liệu mẫu phải có đủ cột và kiểu giống thật thì luồng mới bộc lộ lỗi, còn tên người và số thì bịa để không lộ thông tin ai. Bản sao dữ liệu thật vẫn đưa thông tin người thật vào vòng thử. Bỏ bớt cột làm bạn không thấy lỗi ở đúng cột bị bỏ. Một dòng duy nhất không đủ để thấy trường hợp trống hay trùng."
      },
      {
        "question": "Nhãn [THỬ] ở đầu tiêu đề thư thử dùng để làm gì?",
        "options": [
          "Để thư không bị lọc vào mục thư rác của người nhận",
          "Để luồng tự hiểu là cần bỏ qua bước phê duyệt",
          "Để luồng chạy nhanh hơn vì bớt vài bước kiểm tra lúc thử",
          "Người nhận biết đây là thư thử, đừng làm theo"
        ],
        "correct": 3,
        "explanation": "Nhãn là quy ước cho con người: ai lỡ nhận thư thử cũng thấy ngay và không làm theo. Nó không ảnh hưởng tới bộ lọc thư rác, cũng không làm luồng bỏ bước nào hay chạy nhanh hơn, vì luồng chỉ đọc nội dung bạn viết vào tiêu đề như mọi chữ khác."
      },
      {
        "question": "Ngoài ca dữ liệu đẹp, ca thử nào nên có thêm?",
        "options": [
          "Dữ liệu trống hoặc thiếu một trường bắt buộc",
          "Chạy lại ca đầu thêm ba lần cho chắc ăn",
          "Dữ liệu thật của khách lớn nhất để sát thực tế",
          "Một ca nữa dữ liệu đẹp y hệt nhưng đổi tên người"
        ],
        "correct": 0,
        "explanation": "Lỗi thật thường đến từ dữ liệu xấu: ô trống, ngày sai, tên có dấu lạ. Chạy lại cùng ca đẹp không cho thông tin mới. Dùng dữ liệu thật của khách lớn là đưa rủi ro thật vào vòng thử. Một ca đẹp khác cũng chỉ lặp lại điều bạn đã biết."
      },
      {
        "question": "Thử xong và thư đến đúng hộp thư của bạn. Còn việc gì trước khi chạy thật?",
        "options": [
          "Xoá lịch sử chạy thử để khỏi lẫn với bản chạy thật",
          "Soát lại danh sách người nhận và bỏ nhãn [THỬ]",
          "Không cần gì nữa, thử xong là chạy thật y như vậy",
          "Tắt luồng rồi dựng lại từ đầu cho sạch sẽ"
        ],
        "correct": 1,
        "explanation": "Sau khi thử, luồng vẫn đang trỏ tới bạn và vẫn mang nhãn [THỬ], nên phải đổi lại người nhận thật và bỏ nhãn trước khi bật. Xoá lịch sử làm bạn mất dấu vết nếu có lỗi. Nói không cần gì là bỏ qua đúng hai thứ vừa đổi. Dựng lại từ đầu tốn công và sinh lỗi mới."
      }
    ],
    "keyTakeaways": [
      "Thử bằng dữ liệu bịa và người nhận là chính bạn trước khi chạy thật.",
      "Dữ liệu mẫu giữ cấu trúc thật, nội dung bịa, không chứa thông tin ai.",
      "Gắn nhãn [THỬ] để ai lỡ nhận cũng biết đừng làm theo.",
      "Thử cả ca xấu: ô trống, thiếu trường, tên dài.",
      "Trước khi bật thật: đổi lại người nhận và bỏ nhãn thử."
    ],
    "practicePrompt": {
      "question": "Bạn thử luồng xong, thư về hộp thư của bạn trông đẹp. Bước tiếp theo hợp lý nhất là gì?",
      "options": [
        "Thử thêm một dòng bịa có ô trống, rồi mới đổi người nhận thật",
        "Bật luôn cho người thật vì thư đẹp nghĩa là luồng đúng với mọi dòng dữ liệu",
        "Gửi bản thử cho cả nhóm xem thử luôn và nhờ góp ý",
        "Xoá dữ liệu mẫu để bảng sạch rồi bật"
      ],
      "correct": 0,
      "explanation": "Một ca đẹp chỉ chứng minh luồng chạy khi mọi thứ thuận lợi; lỗi thường nằm ở ô trống hay dữ liệu lạ. Bật luôn là dùng người thật làm người thử. Gửi cả nhóm bản thử làm họ nhầm là thư thật. Xoá dữ liệu mẫu làm bạn mất thứ để thử lại sau này."
    },
    "summary": {
      "keyIdea": "Chạy thử là bản in một tờ: rẻ, nhanh, và lỗi chỉ làm phiền đúng bạn.",
      "formula": "Người nhận là bạn + dữ liệu bịa + nhãn [THỬ] + ít nhất một ca xấu.",
      "commonMistake": "Thử đúng một ca đẹp rồi bật cho người thật.",
      "action": "Chọn một luồng bạn sắp dựng và viết trước ba ca thử, trong đó có một ca dữ liệu trống."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn một việc bạn định tự động hoá (nhắc việc, gửi thư, lưu tệp). Viết ra giấy ba ca thử: một ca đẹp, một ca có ô trống, một ca có tên rất dài. Bịa dữ liệu cho cả ba, ghi rõ người nhận lúc thử là chính bạn và nhãn [THỬ] bạn sẽ dùng.",
      "secondary": "Ngày mai ghi lại ca nào khiến bạn bất ngờ nhất khi thử, hoặc ca nào bạn định thử mà chưa kịp."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bạn vừa dựng xong luồng, màn hình báo \"đã lưu\", và cái nút Bật đang chờ bạn bấm. Bài này nói về thói quen nhỏ khiến bạn tự tin bấm nút đó: thử trước bằng dữ liệu bịa, gửi cho chính mình."
      },
      {
        "type": "feynman",
        "title": "Thử luồng đơn giản hơn bạn nghĩ",
        "intro": "Trước khi in 500 tờ rơi, bạn in thử một tờ để xem chữ có lỗi, màu có lệch không. Tờ in thử bạn đọc kỹ, xé đi, không ai bị ảnh hưởng.",
        "columns": [
          "Thành phần",
          "In thử một tờ",
          "Chạy thử luồng"
        ],
        "rows": [
          [
            "Thứ thử",
            "Một tờ giấy",
            "Một lần chạy với dữ liệu bịa"
          ],
          [
            "Người đọc",
            "Chính bạn",
            "Người nhận là chính bạn"
          ],
          [
            "Dấu hiệu nhận biết",
            "Gạch chéo chữ MẪU",
            "Nhãn [THỬ] ở tiêu đề"
          ],
          [
            "Cái giá nếu sai",
            "Một tờ giấy bỏ đi",
            "Một thư thử bỏ đi, thay vì 40 thư thật"
          ]
        ],
        "oneLiner": "Chạy thử là in một tờ trước khi in năm trăm: lỗi nào cũng nên chỉ làm phiền bạn."
      },
      {
        "type": "heading",
        "text": "Vấn đề: luồng nhân lỗi lên"
      },
      {
        "type": "paragraph",
        "text": "Một người gõ sai tên khách thì sai một thư. Một luồng tự động sai tên thì sai mọi thư nó gửi, trong vài giây, và thư đã gửi không gọi lại được. Vì vậy thử luồng không phải thủ tục cho đủ bộ, mà là lúc duy nhất lỗi còn rẻ."
      },
      {
        "type": "heading",
        "text": "Ba thứ cần có để thử an toàn"
      },
      {
        "type": "paragraph",
        "text": "Thứ nhất là người nhận thử: chính bạn. Thứ hai là dữ liệu mẫu: bảng cùng cột, cùng kiểu như bảng thật nhưng tên và số là bịa. Thứ ba là nhãn [THỬ] ở tiêu đề để ai lỡ nhận biết ngay."
      },
      {
        "type": "flow",
        "title": "Một vòng thử luồng",
        "steps": [
          {
            "label": "Đổi người nhận về bạn",
            "detail": "Trước mọi thứ khác, đổi người nhận thành địa chỉ của chính bạn. Nếu luồng có nhiều chỗ gửi (thư, tin nhắn, chuyển tệp), kiểm từng chỗ chứ không chỉ chỗ đầu tiên."
          },
          {
            "label": "Chuẩn bị dữ liệu mẫu",
            "detail": "Tạo vài dòng bịa cùng cột như dữ liệu thật: một dòng đẹp, một dòng có ô trống, một dòng có tên rất dài hoặc có dấu lạ."
          },
          {
            "label": "Chạy và đọc kết quả",
            "detail": "Chạy luồng, mở hộp thư của bạn, đọc từng chữ trong thư thử như người nhận sẽ đọc, không chỉ liếc xem có đến hay chưa."
          },
          {
            "label": "Sửa rồi chạy lại",
            "detail": "Mỗi lần sửa phải chạy lại cả ba dòng mẫu, vì sửa một chỗ có thể làm hỏng chỗ khác."
          },
          {
            "label": "Đổi về người thật",
            "detail": "Chỉ khi cả ba ca đều đúng: đổi người nhận về danh sách thật, bỏ nhãn [THỬ], soát lại một lần nữa rồi mới bật."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Dữ liệu mẫu tốt",
          "text": "Cùng cột, cùng kiểu như thật. Tên và số bịa ra, ví dụ \"Nguyễn Văn Thử\". Có một dòng đẹp, một dòng trống ô, một dòng bất thường. Dùng đi dùng lại được."
        },
        "right": {
          "label": "Dữ liệu mẫu dễ gây hại",
          "text": "Sao chép dòng thật của khách hàng vì cho nhanh. Bảng rút gọn thiếu cột. Chỉ một dòng đẹp. Địa chỉ người nhận chưa đổi nên thư thử đi tới người thật."
        }
      },
      {
        "type": "callout",
        "label": "Đừng quên",
        "text": "Nhãn [THỬ] là quy ước của con người, luồng không tự hiểu nó. Nếu người nhận vẫn là danh sách thật thì gắn nhãn cũng không cứu được: 40 người vẫn nhận thư thử. Đổi người nhận trước, gắn nhãn sau."
      },
      {
        "type": "scenario",
        "title": "Chiều thứ Năm, luồng nhắc hạn nộp báo cáo",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn vừa dựng xong luồng nhắc 40 đồng nghiệp nộp báo cáo trước thứ Sáu. Đã 4 giờ chiều và bạn muốn xong trước khi về.",
            "choices": [
              {
                "label": "Bật luôn cho cả 40 người, có lỗi thì sửa sau",
                "next": "bad_all"
              },
              {
                "label": "Đổi người nhận thành chính bạn rồi chạy với vài dòng bịa",
                "next": "s2"
              }
            ]
          },
          "bad_all": {
            "text": "Một ô \"tên\" trong bảng bị trống. Bốn mươi người nhận thư mở đầu \"Xin chào ,\" kèm hạn nộp sai ngày. Bạn phải gửi thêm thư đính chính, và từ đó mọi thư nhắc của bạn bị nghi ngờ.",
            "ending": "bad"
          },
          "s2": {
            "text": "Thư thử về hộp thư, trông gần như thư thật và tiêu đề giống hệt thư sẽ gửi đi. Hôm qua bạn đã lỡ chạy thử và có hai đồng nghiệp nhắn hỏi \"thư này là thật à?\".",
            "choices": [
              {
                "label": "Giữ nguyên tiêu đề, dù sao chỉ mình bạn nhận",
                "next": "bad_label"
              },
              {
                "label": "Thêm nhãn [THỬ] ở tiêu đề rồi thử thêm một dòng để trống tên",
                "next": "s3"
              }
            ]
          },
          "bad_label": {
            "text": "Lần thử sau, bạn quên đổi người nhận và hai đồng nghiệp trong danh sách cũ nhận thư giống hệt thư thật, không nhãn. Họ tưởng hạn nộp sáng nay là thật và nộp vội.",
            "ending": "bad"
          },
          "s3": {
            "text": "Dòng trống tên cho ra thư mở đầu \"Xin chào ,\". Bạn thêm một bước kiểm: nếu ô tên trống thì dùng \"bạn\". Chạy lại cả ba dòng mẫu đều cho thư ổn.",
            "choices": [
              {
                "label": "Đổi người nhận về danh sách thật, bỏ nhãn [THỬ], soát lại rồi bật",
                "next": "good"
              },
              {
                "label": "Bật luôn, vì chắc lần này không còn lỗi nào khác",
                "next": "bad_rush"
              }
            ]
          },
          "bad_rush": {
            "text": "Bạn bật mà quên bỏ nhãn [THỬ]. Cả 40 người nhận thư có chữ [THỬ] ở đầu và nhiều người bỏ qua vì nghĩ đó là thư chạy thử của hệ thống. Nửa số báo cáo nộp trễ.",
            "ending": "bad"
          },
          "good": {
            "text": "Sáng thứ Sáu, 40 thư đến đúng người, tên đầy đủ, không nhãn thử. Bạn giữ ba dòng mẫu trong một sheet riêng để thử lại mỗi lần sửa luồng.",
            "ending": "good"
          }
        }
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI chuẩn bị ca thử cho luồng nhắc hạn",
        "task": "Bạn cần AI giúp soạn dữ liệu mẫu và ca thử cho luồng nhắc hạn nộp báo cáo. Lắp prompt cho đúng.",
        "parts": [
          {
            "id": "ctx",
            "label": "Bối cảnh",
            "options": [
              {
                "text": "Giúp tôi thử một luồng.",
                "feedback": "Quá chung: AI không biết luồng làm gì nên chỉ liệt kê lời khuyên chung chung."
              },
              {
                "text": "Luồng của tôi đọc bảng có các cột Họ tên, Email, Hạn nộp và gửi thư nhắc trước hạn một ngày. Tôi cần dữ liệu mẫu để thử.",
                "good": true,
                "feedback": "Nêu đúng các cột và việc luồng làm, nên dữ liệu mẫu AI đưa ra khớp cấu trúc thật."
              }
            ]
          },
          {
            "id": "task",
            "label": "Việc cần làm",
            "options": [
              {
                "text": "Tạo 5 dòng bịa gồm: 2 dòng bình thường, 1 dòng trống họ tên, 1 dòng tên dài bất thường, 1 dòng email sai định dạng.",
                "good": true,
                "feedback": "Yêu cầu có cả ca xấu nên AI đưa các dòng khiến luồng bộc lộ lỗi."
              },
              {
                "text": "Tạo dữ liệu thật giống thật nhất có thể, lấy từ nhân viên công ty.",
                "feedback": "AI không có dữ liệu công ty, nó sẽ bịa tên nghe như thật và có thể trùng người thật."
              }
            ]
          },
          {
            "id": "rule",
            "label": "Ràng buộc",
            "options": [
              {
                "text": "Không dùng tên, email hay số điện thoại có thật; dùng email dạng ten@example.com.",
                "good": true,
                "feedback": "Địa chỉ ví dụ không gửi tới ai, nên lỡ sai người nhận vẫn không làm phiền ai."
              },
              {
                "text": "Không cần ràng buộc gì, cứ cho nhiều dữ liệu.",
                "feedback": "Không ràng buộc thì AI có thể đưa email trông như thật và thư thử đến một người lạ."
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
            "text": "Bảng mẫu (toàn bộ bịa):\n1. Nguyễn Văn A | a@example.com | 15/11\n2. Trần Thị B | b@example.com | 15/11\n3. (để trống) | c@example.com | 15/11\n4. Lê Hoàng Thanh Bình Minh An Khang Phúc Lộc | d@example.com | 15/11\n5. Phạm Văn E | email-sai | 15/11\nMỗi dòng kiểm một lỗi khác nhau; chỉ gửi tới địa chỉ của bạn khi thử."
          },
          {
            "requires": [
              "ctx"
            ],
            "text": "Bảng mẫu: 5 dòng bình thường, họ tên đầy đủ, email dạng ten@example.com.\n(Dữ liệu sạch nên luồng chạy ổn, nhưng không có dòng trống hay email sai để bộc lộ lỗi.)"
          },
          {
            "text": "Đây là 10 dòng dữ liệu nhân viên: Nguyễn Văn Nam (nam.nguyen@congty.vn), Lê Thị Hoa (hoa.le@congty.vn)...\n(AI tự bịa ra email công ty nghe như thật. Nếu địa chỉ có thật, thư thử sẽ đến người lạ.)"
          }
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Thử bằng dữ liệu bịa và người nhận là chính bạn, đừng thử trên người thật.",
          "Bài sau: đọc lịch sử chạy để biết luồng hôm qua hỏng ở đâu."
        ]
      }
    ]
  },
  {
    "id": 2476,
    "slug": "doc-lich-su-chay-luong-va-tim-loi-thuong-gap",
    "title": "Chặng 53, Bài 17: Đọc lịch sử chạy của luồng và tìm lỗi thường gặp",
    "subtitle": "Mỗi lần luồng chạy để lại một biên lai. Biết đọc biên lai là biết luồng hỏng ở đâu.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "🔎",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Luồng hỏng thường không kêu. Bạn chỉ thấy thư không đến hay tệp không về. Lịch sử chạy là nơi duy nhất cho biết lần nào hỏng, hỏng ở bước nào và vì sao, nên biết đọc nó là khác biệt giữa sửa trong mười phút và đoán cả buổi chiều.",
    "openingQuestion": "Sáng thứ Hai luồng gửi báo cáo tuần không gửi gì. Bạn mở lịch sử chạy và thấy một dòng chạy hôm qua ghi \"Thất bại\". Nhìn vào đâu trước?",
    "openingOptions": [
      "Nút chạy lại, vì chạy lại thường là hết lỗi",
      "Bước đầu tiên bị đánh dấu lỗi và thông điệp đi kèm",
      "Bước cuối cùng của luồng, vì lỗi hay nằm ở cuối luồng",
      "Tên luồng và ngày dựng, để xem có quá cũ không"
    ],
    "correctOption": 1,
    "explanation": "Một lần chạy gồm nhiều bước nối tiếp, và khi một bước hỏng thì các bước sau thường không chạy. Bước đầu tiên bị đánh dấu lỗi cùng thông điệp của nó là nơi nguyên nhân nằm; các bước đỏ phía sau thường chỉ là hậu quả. Bấm chạy lại khi chưa biết lỗi chỉ lặp lại lỗi, bước cuối cùng thường là nơi hậu quả hiện ra chứ không phải nơi lỗi bắt đầu, còn ngày dựng luồng không nói gì về lần chạy hôm qua.",
    "diagram": [
      {
        "label": "Luồng báo thất bại",
        "arrow": true
      },
      {
        "label": "Mở lần chạy lỗi",
        "arrow": true
      },
      {
        "label": "Tìm bước lỗi đầu tiên",
        "arrow": true
      },
      {
        "label": "Đọc thông điệp và dữ liệu vào ra",
        "arrow": true
      },
      {
        "label": "Chọn cách sửa"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Một chị hành chính có luồng tự lưu tệp đính kèm email vào thư mục chung. Ba tuần liền thư mục không có tệp mới. Chị mở lịch sử chạy: mọi lần chạy kể từ thứ Hai hai tuần trước đều dừng ở đúng bước lưu tệp, với thông điệp nói không có quyền ghi. Hoá ra thư mục vừa được chuyển chỗ. Một lần đọc lịch sử cho chị đúng tên bước và nguyên nhân."
    },
    "quiz": [
      {
        "question": "Luồng hôm qua báo thất bại. Việc đầu tiên khi đọc lịch sử chạy là gì?",
        "options": [
          "Mở lần chạy thất bại, tìm bước đầu tiên bị đánh dấu lỗi",
          "Xoá luồng và dựng lại vì lỗi chắc nằm ở cả luồng",
          "Chạy lại luồng mười lần xem có hết lỗi tự nhiên không, vì lỗi hay tự biến mất",
          "Đọc bước cuối cùng vì lỗi luôn nằm ở bước cuối"
        ],
        "correct": 0,
        "explanation": "Bước đầu tiên bị đánh dấu lỗi là nơi nguyên nhân nằm, các bước sau thường chỉ bị kéo theo. Xoá rồi dựng lại bỏ phí mọi thứ đang đúng và không biết lỗi từ đâu. Chạy lại nhiều lần thường lặp lại cùng lỗi và có thể gửi lặp thư. Bước cuối chỉ là chỗ hậu quả hiện ra."
      },
      {
        "question": "Thông điệp lỗi ghi \"không tìm thấy tệp\". Nguyên nhân thường gặp nhất là gì?",
        "options": [
          "Máy tính của bạn đang tắt nên luồng không đọc được tệp",
          "Tệp bị đổi tên, chuyển chỗ hoặc xoá",
          "Người gửi tệp dùng Excel bản cũ hơn bản của bạn",
          "Tên tệp quá ngắn nên luồng bỏ qua vì chưa đủ chữ"
        ],
        "correct": 1,
        "explanation": "Luồng đi tìm tệp theo đúng đường dẫn hay tên đã ghi, nên tệp đổi tên, chuyển thư mục hoặc bị xoá là nguyên nhân phổ biến. Nhiều luồng chạy trên máy chủ của nhà cung cấp, không phụ thuộc máy tính bạn đang bật hay tắt. Phiên bản Excel không làm tệp biến mất, và độ dài tên tệp không làm luồng bỏ qua."
      },
      {
        "question": "Lần chạy báo \"Thành công\" nhưng thư không đến. Nên xem gì?",
        "options": [
          "Không cần xem gì, đã thành công nghĩa là thư đã đến nơi",
          "Bước kích hoạt, vì thư chỉ gửi khi kích hoạt chạy hai lần",
          "Đầu vào của bước gửi thư, xem ô người nhận có trống không",
          "Số lần chạy trong ngày, nếu dưới mười thì hệ thống chặn thư"
        ],
        "correct": 2,
        "explanation": "Trạng thái thành công chỉ nói rằng các bước đã chạy hết, không nói rằng việc có ý nghĩa. Bước gửi thư có thể chạy với người nhận trống hoặc sai địa chỉ. Kích hoạt chạy hai lần không phải điều kiện để gửi thư, và hệ thống không chặn thư chỉ vì số lần chạy ít."
      },
      {
        "question": "Tỉ lệ chạy thành công tuần này 70%, tuần trước 98%. Đọc đúng là:",
        "options": [
          "Bình thường, luồng nào cũng có tuần tốt tuần xấu nên cứ chờ thêm",
          "Tỉ lệ thấp nghĩa là ít người dùng, không cần lo",
          "Chỉ là số hiển thị, lịch sử chạy không đáng tin",
          "Có thay đổi gần đây; cần tìm lỗi bắt đầu từ ngày nào"
        ],
        "correct": 3,
        "explanation": "Tụt từ 98% xuống 70% là một bước nhảy, không phải dao động ngẫu nhiên: thường có thứ gì đó đổi, như quyền truy cập, tên tệp hay cấu trúc bảng. Tìm ngày lỗi bắt đầu rồi xem điều gì đổi vào ngày đó. Coi là bình thường thì để lỗi kéo dài, còn tỉ lệ này đếm số lần chạy, không đếm số người dùng."
      },
      {
        "question": "Lỗi \"hết hạn kết nối\" lặp lại mỗi vài tuần. Cách xử lý đáng làm là gì?",
        "options": [
          "Hỏi ai giữ tài khoản kết nối và đặt lịch đăng nhập lại",
          "Tăng số lần thử lại lên 50 để luồng tự vượt qua lỗi hết hạn",
          "Đổi tên luồng để hệ thống coi như luồng mới",
          "Bỏ qua, vì lần sau luồng sẽ tự khoẻ lại"
        ],
        "correct": 0,
        "explanation": "Kết nối hết hạn là vấn đề về tài khoản hoặc quyền, cần người có tài khoản đăng nhập lại hoặc tổ chức cấp lại quyền. Thử lại nhiều lần không cho luồng thêm quyền, đổi tên luồng không đổi kết nối, và không tự khoẻ lại vì lỗi sẽ quay lại đúng chu kỳ cũ."
      }
    ],
    "keyTakeaways": [
      "Mở lần chạy lỗi, tìm bước lỗi đầu tiên, đọc thông điệp.",
      "Thành công chỉ nghĩa là các bước đã chạy hết, chưa chắc việc đã đúng.",
      "Lỗi hay gặp: tệp đổi tên hay chuyển chỗ, hết quyền, dữ liệu thiếu.",
      "Nhìn tỉ lệ thành công theo tuần để thấy luồng xuống dốc.",
      "Đừng chạy lại hay dựng lại khi chưa biết bước nào lỗi."
    ],
    "practicePrompt": {
      "question": "Lịch sử chạy cho thấy bước \"Lưu tệp\" thất bại với thông điệp \"không có quyền ghi\" từ thứ Hai. Kết luận hợp lý là gì?",
      "options": [
        "Thư mục đích hoặc quyền của tài khoản luồng đã đổi hồi thứ Hai",
        "Bước Lưu tệp viết sai, phải dựng lại cả luồng từ đầu",
        "Email đính kèm quá nặng nên luồng bị từ chối mọi tệp",
        "Luồng đã quá cũ và cần được thay bằng luồng mới"
      ],
      "correct": 0,
      "explanation": "Thông điệp nói thẳng vấn đề là quyền ghi, nên thứ cần kiểm là thư mục đích và quyền tài khoản luồng, bắt đầu từ thứ Hai. Dựng lại cả luồng không đổi được quyền. Tệp quá nặng sẽ cho thông điệp khác. Tuổi của luồng không phải nguyên nhân khi lỗi bắt đầu đúng một ngày."
    },
    "summary": {
      "keyIdea": "Lịch sử chạy là biên lai của từng lần chạy: nó cho biết bước nào hỏng, thông điệp gì.",
      "formula": "Mở lần lỗi → bước lỗi đầu tiên → thông điệp → dữ liệu vào ra → sửa → chạy thử lại.",
      "commonMistake": "Thấy chữ \"Thành công\" là yên tâm, hoặc thấy \"Thất bại\" là dựng lại cả luồng.",
      "action": "Mở lịch sử chạy của một luồng bạn đang dùng và đọc kỹ ba lần chạy gần nhất."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Mở lịch sử chạy của một luồng hoặc một nhiệm vụ tự động bạn có (nếu chưa có luồng, nhờ đồng nghiệp cho xem). Chọn một lần chạy, ghi ra 4 thứ: trạng thái, tên bước đã chạy lâu nhất, tên bước lỗi (nếu có), và một câu thông điệp. Tự đoán một nguyên nhân rồi ghi bạn sẽ kiểm bằng cách nào.",
      "secondary": "Ngày mai kể bạn đã tìm ra nguyên nhân thật chưa, và nguyên nhân đó có giống dự đoán của bạn không."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Sáng thứ Hai, không có thư báo cáo nào đến. Không có thông báo, không có lời xin lỗi, chỉ có sự im lặng. Bài này dạy bạn đọc lịch sử chạy: nơi luồng ghi lại điều nó đã làm và đã hỏng."
      },
      {
        "type": "feynman",
        "title": "Lịch sử chạy đơn giản hơn bạn nghĩ",
        "intro": "Khi gửi bưu kiện, bạn nhận một phiếu theo dõi: đã lấy hàng, đã tới kho, đang giao, giao thất bại ở khâu nào. Bạn không cần biết mọi thứ về chuyến xe, chỉ cần biết hàng kẹt ở khâu nào.",
        "columns": [
          "Thành phần",
          "Phiếu theo dõi bưu kiện",
          "Lịch sử chạy của luồng"
        ],
        "rows": [
          [
            "Một lần",
            "Một bưu kiện",
            "Một lần luồng chạy"
          ],
          [
            "Các khâu",
            "Lấy hàng, kho, giao",
            "Kích hoạt, điều kiện, từng hành động"
          ],
          [
            "Dấu hiệu hỏng",
            "Khâu giao báo thất bại",
            "Một bước đánh dấu lỗi"
          ],
          [
            "Lý do",
            "Ghi chú của bưu tá",
            "Thông điệp lỗi của bước đó"
          ]
        ],
        "oneLiner": "Lịch sử chạy là phiếu theo dõi của luồng: nhìn vào bước bị kẹt, đừng nhìn cả chuyến xe."
      },
      {
        "type": "heading",
        "text": "Bốn thứ đọc được trong một lần chạy"
      },
      {
        "type": "paragraph",
        "text": "Thường có bốn thứ: trạng thái chung của lần chạy, danh sách các bước theo thứ tự, bước nào đánh dấu lỗi, và thông điệp của bước đó. Nhiều công cụ còn cho xem dữ liệu đi vào và đi ra từng bước, nên tên và vị trí nút bấm sẽ khác nhau tuỳ công cụ, còn cách đọc thì giống nhau."
      },
      {
        "type": "flow",
        "title": "Đọc một lần chạy thất bại",
        "steps": [
          {
            "label": "Mở đúng lần chạy",
            "detail": "Chọn lần chạy có trạng thái thất bại, nhìn ngày giờ để khớp với lúc bạn thấy hỏng. Nhầm lần chạy là nhầm cả buổi chiều."
          },
          {
            "label": "Tìm bước lỗi đầu tiên",
            "detail": "Đi từ trên xuống, dừng ở bước đầu tiên bị đánh dấu lỗi. Các bước phía sau thường bị bỏ qua hoặc kéo theo, không phải nguyên nhân."
          },
          {
            "label": "Đọc thông điệp",
            "detail": "Đọc nguyên văn: nó thường nói thiếu quyền, không tìm thấy, dữ liệu trống hay hết giới hạn. Đừng đoán khi thông điệp đã nói rõ."
          },
          {
            "label": "Xem dữ liệu vào ra",
            "detail": "Nếu công cụ cho xem, đối chiếu đầu vào của bước lỗi: ô nào trống, tên tệp nào sai."
          },
          {
            "label": "Sửa rồi thử lại",
            "detail": "Sửa đúng một thứ, chạy thử bằng dữ liệu mẫu như bài trước, rồi xem lần chạy mới có sạch không."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Lỗi ở dữ liệu",
          "text": "Ô trống, ngày sai kiểu, tên có ký tự lạ. Dấu hiệu: thông điệp nhắc giá trị rỗng hay sai định dạng. Sửa ở nguồn dữ liệu hoặc thêm bước kiểm."
        },
        "right": {
          "label": "Lỗi ở quyền và kết nối",
          "text": "Hết hạn đăng nhập, thư mục bị chuyển, người gán quyền nghỉ việc. Dấu hiệu: thông điệp nhắc quyền, truy cập, xác thực. Sửa bằng người giữ tài khoản hoặc CNTT."
        }
      },
      {
        "type": "chart",
        "title": "Tỉ lệ chạy thành công theo tuần",
        "caption": "Số liệu minh hoạ: giả sử mỗi tuần có một số lần chạy cố định, lỗi bắt đầu từ một mức rồi tăng dần mỗi tuần. Kéo thanh trượt để xem tỉ lệ thành công tụt nhanh ra sao khi lỗi không được sửa.",
        "kind": "line",
        "xLabel": "Tuần",
        "yLabel": "Tỉ lệ thành công (%)",
        "x": {
          "from": 1,
          "to": 12,
          "step": 1
        },
        "params": [
          {
            "id": "runs",
            "label": "Số lần chạy mỗi tuần",
            "min": 20,
            "max": 200,
            "step": 10,
            "value": 100,
            "unit": "lần"
          },
          {
            "id": "base",
            "label": "Lần lỗi mỗi tuần lúc đầu",
            "min": 0,
            "max": 20,
            "step": 1,
            "value": 2,
            "unit": "lần"
          },
          {
            "id": "grow",
            "label": "Lỗi tăng thêm mỗi tuần",
            "min": 0,
            "max": 3,
            "step": 0.25,
            "value": 0.5,
            "unit": "lần"
          }
        ],
        "series": [
          {
            "label": "Tỉ lệ thành công",
            "expr": "max(0, 100 * (1 - (base + grow * x) / runs))"
          }
        ]
      },
      {
        "type": "callout",
        "label": "Đừng quên",
        "text": "\"Thành công\" chỉ nói các bước đã chạy hết. Một thư gửi tới ô người nhận trống vẫn có thể được ghi là thành công. Muốn chắc, hãy kiểm kết quả thật: thư có đến, tệp có nằm đúng chỗ."
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Soát bản giải thích lỗi do AI viết",
        "task": "Bạn dán thông điệp lỗi và nhờ AI giải thích. Thông điệp thật chỉ là: bước \"Lưu tệp\" thất bại ngày 14/10 lúc 08:02, lỗi \"không tìm thấy thư mục\". Đánh dấu những câu AI tự thêm mà bạn không có căn cứ.",
        "segments": [
          {
            "text": "Lần chạy ngày 14/10 thất bại ở bước \"Lưu tệp\"."
          },
          {
            "text": "Nguyên nhân là tài khoản luồng bị khoá do đăng nhập sai mật khẩu ba lần.",
            "error": "Thông điệp chỉ nói không tìm thấy thư mục, không nhắc khoá tài khoản hay mật khẩu. Đây là chuyện AI bịa cho nghe có lý."
          },
          {
            "text": "Thông điệp lỗi báo không tìm thấy thư mục đích."
          },
          {
            "text": "Lỗi này đã xảy ra 7 lần trong tháng qua.",
            "error": "AI không được xem lịch sử nhiều lần chạy nên con số 7 lần là bịa. Muốn biết thì đếm trong lịch sử chạy."
          },
          {
            "text": "Bạn nên kiểm xem thư mục có bị đổi tên hoặc chuyển chỗ không."
          },
          {
            "text": "Theo quy định nội bộ, lỗi này phải báo cáo trong 24 giờ.",
            "error": "Không có căn cứ nào trong thông điệp, AI tự tạo ra một quy định. Hỏi bộ phận CNTT xem công ty có quy định thật không."
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Sáng thứ Hai, luồng báo cáo tuần không chạy",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Lịch sử chạy cho thấy lần chạy thứ Hai tuần này thất bại ở bước \"Đọc bảng Excel\" với thông điệp \"không tìm thấy bảng\". Thứ Hai tuần trước vẫn thành công.",
            "choices": [
              {
                "label": "Bấm chạy lại liên tục cho tới khi thành công",
                "next": "bad_rerun"
              },
              {
                "label": "Hỏi đồng nghiệp hoặc mở tệp xem tệp nguồn có bị đổi tên, đổi bảng hay chuyển chỗ tuần qua không",
                "next": "s2"
              }
            ]
          },
          "bad_rerun": {
            "text": "Chạy lại bảy lần, cả bảy lần đều cùng lỗi, và mỗi lần chạy lại gửi thêm một thư \"báo cáo trống\" cho sếp. Sếp nhận bảy thư và hỏi bạn chuyện gì đang xảy ra.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bạn thấy đồng nghiệp đã đổi tên bảng trong tệp hôm thứ Sáu. Bạn có hai cách: sửa tên bảng trong luồng cho khớp, hoặc nhờ đồng nghiệp đổi lại.",
            "choices": [
              {
                "label": "Sửa luồng cho khớp tên mới, chạy thử bằng dòng mẫu, rồi báo đồng nghiệp đừng đổi tên bảng nếu không báo",
                "next": "good"
              },
              {
                "label": "Không nói gì, tự sửa luồng mỗi lần đồng nghiệp đổi tên",
                "next": "bad_silent"
              }
            ]
          },
          "bad_silent": {
            "text": "Tuần sau đồng nghiệp lại đổi tên bảng và luồng lại hỏng, lần này bạn đang nghỉ phép. Báo cáo không ra, sếp phải gọi điện hỏi ai đang giữ luồng.",
            "ending": "bad"
          },
          "good": {
            "text": "Luồng chạy lại, báo cáo tuần ra đúng hạn, và đồng nghiệp đồng ý báo trước khi đổi tên bảng. Bạn ghi lại nguyên nhân vào bản ghi của luồng.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Mở lần chạy lỗi, tìm bước lỗi đầu tiên, đọc thông điệp, rồi mới sửa.",
          "Bài sau: đặt cảnh báo để luồng hỏng thì có người biết ngay."
        ]
      }
    ]
  },
  {
    "id": 2477,
    "slug": "dat-canh-bao-khi-luong-hong-va-nguoi-thay-the",
    "title": "Chặng 53, Bài 18: Đặt cảnh báo khi luồng hỏng, và ai thay bạn khi bạn nghỉ",
    "subtitle": "Luồng hỏng im lặng là luồng hỏng đắt nhất. Cảnh báo là chuông báo cháy của nó.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "🔔",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Luồng không báo lỗi có thể hỏng ba ngày mà không ai biết, và đến khi phát hiện thì đã nợ ba ngày việc. Cảnh báo đặt đúng chỗ, gửi đúng người, kèm người dự phòng, biến lỗi thành chuyện nửa ngày.",
    "openingQuestion": "Luồng gửi nhắc thanh toán lỗi từ thứ Hai, đến thứ Năm mới có khách gọi hỏi. Nguyên nhân gốc của chuyện bốn ngày không ai biết là gì?",
    "openingOptions": [
      "Luồng quá phức tạp nên không thể báo lỗi được",
      "Không có ai được giao để nhận tin khi luồng hỏng",
      "Khách hàng nên tự phát hiện sớm hơn trong bốn ngày",
      "Hệ thống chỉ báo lỗi được vào đầu mỗi tuần"
    ],
    "correctOption": 1,
    "explanation": "Luồng hỏng thì lịch sử chạy vẫn ghi, nhưng chẳng ai mở nó mỗi sáng. Nếu không có cảnh báo gửi tới một người cụ thể, lỗi nằm im cho tới khi người ngoài cuộc phát hiện. Độ phức tạp không ngăn việc báo lỗi, mà báo lỗi là chuyện cấu hình. Trông chờ khách phát hiện là để khách làm người thử, và không công cụ nào chỉ báo lỗi vào đầu tuần.",
    "diagram": [
      {
        "label": "Luồng hỏng",
        "arrow": true
      },
      {
        "label": "Cảnh báo tới người chính",
        "arrow": true
      },
      {
        "label": "Nếu hai giờ chưa ai nhận",
        "arrow": true
      },
      {
        "label": "Cảnh báo tới người dự phòng",
        "arrow": true
      },
      {
        "label": "Sửa và ghi vào bản ghi"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Một phòng kinh doanh có luồng gửi báo giá tự động do anh Nam dựng. Cảnh báo lỗi chỉ gửi vào hộp thư của anh. Anh nghỉ phép hai tuần, luồng hỏng ngày thứ hai, và ba ngày sau mới có khách hỏi sao chưa nhận báo giá. Sau đó cả phòng đặt thêm cảnh báo vào nhóm chat chung và chọn một người dự phòng có quyền sửa."
    },
    "quiz": [
      {
        "question": "Luồng lỗi ba ngày không ai biết. Nguyên nhân gốc thường là gì?",
        "options": [
          "Cảnh báo chỉ vào hộp thư của người dựng luồng, mà người đó đang nghỉ",
          "Luồng quá phức tạp nên không thể báo lỗi được",
          "Hệ thống chỉ báo lỗi được vào các ngày đầu tuần",
          "Người nhận dữ liệu nên tự phát hiện trong ba ngày đó"
        ],
        "correct": 0,
        "explanation": "Cảnh báo đi tới một địa chỉ nhưng địa chỉ đó không có ai nhìn, nên lỗi nằm im. Độ phức tạp không quyết định việc báo lỗi, cấu hình mới quyết định. Hệ thống không có quy luật báo theo ngày đầu tuần. Trông chờ người nhận tự phát hiện là chuyển việc kiểm soát sang người không biết luồng tồn tại."
      },
      {
        "question": "Người dự phòng nên là ai?",
        "options": [
          "Sếp trực tiếp, vì sếp là người có quyền cao nhất",
          "Một người khác có quyền xem và sửa luồng",
          "Chính người dựng luồng, gọi điện lúc đi nghỉ phép",
          "Cả công ty, để ai thấy lỗi cũng có thể tự xử lý được"
        ],
        "correct": 1,
        "explanation": "Người dự phòng phải thật sự làm được việc: có quyền truy cập và hiểu bản ghi của luồng. Sếp có quyền cao nhưng chưa chắc có quyền vào luồng hay thời gian sửa. Gọi người đang nghỉ phép thì không còn là dự phòng. Giao cho cả công ty thì ai cũng nghĩ người khác sẽ lo."
      },
      {
        "question": "Cảnh báo nên gửi tới kênh nào?",
        "options": [
          "Một thư mục riêng mà mỗi tháng mới có người mở ra xem một lần",
          "Hộp thư chung cả công ty, hơn nghìn người đều nhận",
          "Nơi người nhận nhìn thấy hằng ngày, như nhóm chat của nhóm",
          "Chỉ hộp thư của bạn vì luồng là do bạn dựng"
        ],
        "correct": 2,
        "explanation": "Cảnh báo có tác dụng khi được nhìn thấy: kênh nhóm đang dùng hằng ngày là nơi tốt. Thư mục ít ai mở thì cảnh báo nằm đó như không có. Gửi cả công ty biến cảnh báo thành tiếng ồn mà ai cũng bỏ qua. Chỉ hộp thư của bạn là đúng điểm hỏng trong tình huống nghỉ phép."
      },
      {
        "question": "Cảnh báo chưa ai nhận thì bao lâu nên chuyển sang người dự phòng?",
        "options": [
          "Luôn mười lăm ngày để không làm phiền người dự phòng lúc họ đang bận",
          "Không đặt mốc, cứ gửi lại cho người chính mỗi giờ",
          "Mốc càng ngắn càng tốt, vài giây là chuyển ngay",
          "Đặt mốc theo độ gấp của việc, ví dụ vài giờ hoặc nửa ngày"
        ],
        "correct": 3,
        "explanation": "Mốc phải khớp độ gấp của việc: nhắc thanh toán cuối tháng có thể chờ nửa ngày, việc sát giờ thì chỉ vài giờ. Mười lăm ngày thì lỗi đã đủ thời gian gây hại. Gửi đi gửi lại cho một người đang vắng không giúp gì. Mốc vài giây làm người dự phòng bị gọi cả khi người chính chỉ đang đọc dở."
      },
      {
        "question": "Nội dung cảnh báo tốt nhất gồm những gì?",
        "options": [
          "Tên luồng, bước lỗi, giờ lỗi và đường dẫn tới lịch sử chạy",
          "Một chữ \"LỖI\" viết hoa đỏ để gây chú ý",
          "Toàn bộ thông điệp kỹ thuật dài sao chép nguyên văn từ lịch sử chạy",
          "Lời xin lỗi người nhận vì đã làm phiền họ"
        ],
        "correct": 0,
        "explanation": "Người nhận cần biết ngay luồng nào, hỏng ở đâu, từ khi nào và bấm đâu để xem, giống thông báo ở bài trước. Một chữ LỖI không chỉ đường. Dán cả thông điệp kỹ thuật dài làm họ lạc. Lời xin lỗi không giúp ai sửa luồng."
      }
    ],
    "keyTakeaways": [
      "Cảnh báo phải đến một người cụ thể, không phải một hộp thư ai cũng nghĩ có người xem.",
      "Luôn có người dự phòng có quyền và có bản ghi để sửa.",
      "Đặt cảnh báo nơi người nhận nhìn hằng ngày, như nhóm chat.",
      "Mốc chuyển sang người dự phòng tính theo độ gấp của việc.",
      "Nội dung cảnh báo: luồng nào, bước nào, lúc nào, bấm đâu."
    ],
    "practicePrompt": {
      "question": "Bạn sắp nghỉ phép hai tuần, luồng gửi báo giá do bạn dựng. Điều nào nên làm trước khi đi?",
      "options": [
        "Đặt cảnh báo vào nhóm chat và giao người dự phòng có quyền, kèm bản ghi",
        "Nhờ đồng nghiệp xem hộp thư của bạn mỗi ngày giúp bạn",
        "Tắt luồng trong hai tuần và nhắn khách tự chờ",
        "Để nguyên, vì luồng chạy ổn suốt từ lúc dựng tới giờ"
      ],
      "correct": 0,
      "explanation": "Cảnh báo vào nơi có người nhìn và một người dự phòng thật sự có quyền làm được việc. Nhờ xem hộp thư riêng thì mở thêm vấn đề quyền riêng tư và đặt việc vào một người không biết luồng. Tắt luồng làm mất việc đáng lẽ tự chạy. Chạy ổn tới nay không đảm bảo hai tuần tới."
    },
    "summary": {
      "keyIdea": "Luồng hỏng im lặng là luồng hỏng đắt nhất: cảnh báo biến lỗi ba ngày thành lỗi nửa ngày.",
      "formula": "Cảnh báo tới nơi có người nhìn + người dự phòng có quyền + mốc chuyển theo độ gấp.",
      "commonMistake": "Gửi cảnh báo vào hộp thư của mình rồi nghỉ phép.",
      "action": "Chọn một luồng của bạn, ghi tên người nhận cảnh báo và người dự phòng, rồi hỏi họ có đồng ý không."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn một luồng hoặc việc tự động của bạn (hoặc luồng bạn định dựng). Viết trên một tờ giấy: ai nhận cảnh báo, qua kênh nào, người dự phòng là ai, và sau bao lâu chưa ai nhận thì chuyển. Sau đó nhắn cho người dự phòng hỏi họ có đồng ý và có quyền vào luồng không.",
      "secondary": "Ngày mai ghi lại người dự phòng trả lời thế nào, và họ có quyền chưa."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Luồng lỗi từ thứ Hai, đến thứ Năm mới có khách gọi hỏi. Không ai làm sai, chỉ là không có chuông nào reo. Bài này dạy bạn đặt chuông và chọn người nghe khi bạn vắng."
      },
      {
        "type": "feynman",
        "title": "Cảnh báo luồng đơn giản hơn bạn nghĩ",
        "intro": "Toà nhà có chuông báo cháy và một người trực. Chuông reo trong phòng không ai ở thì vô dụng, và nếu người trực nghỉ mà không ai thay thì cũng thế.",
        "columns": [
          "Thành phần",
          "Chuông báo cháy",
          "Cảnh báo luồng"
        ],
        "rows": [
          [
            "Thứ phát hiện",
            "Cảm biến khói",
            "Bước đánh dấu lỗi"
          ],
          [
            "Tiếng báo",
            "Còi trong hành lang",
            "Thư hoặc tin nhắn vào nhóm chat"
          ],
          [
            "Người nghe",
            "Bảo vệ trực ca",
            "Người nhận cảnh báo"
          ],
          [
            "Phương án khi vắng",
            "Bảo vệ ca sau, theo danh sách",
            "Người dự phòng có quyền sửa"
          ]
        ],
        "oneLiner": "Cảnh báo là chuông báo cháy: nó chỉ có ích khi có người nghe và có người thay khi người đó vắng."
      },
      {
        "type": "heading",
        "text": "Ba câu hỏi khi đặt cảnh báo"
      },
      {
        "type": "paragraph",
        "text": "Thứ nhất, cảnh báo đến đâu: kênh nào người ta thật sự nhìn mỗi ngày. Thứ hai, đến ai: một người hoặc một nhóm nhỏ có tên, không phải \"mọi người\". Thứ ba, nếu người đó không phản hồi thì sao. Cách bật cảnh báo khác nhau tuỳ công cụ và tổ chức; đừng mặc định có sẵn, hãy hỏi CNTT hoặc thử gây lỗi có chủ ý trên dữ liệu mẫu để xem có thông báo nào đến không."
      },
      {
        "type": "flow",
        "title": "Đường đi của một cảnh báo",
        "steps": [
          {
            "label": "Luồng hỏng ở một bước",
            "detail": "Bước lỗi được ghi vào lịch sử chạy. Nếu cảnh báo được cấu hình, bước này kích hoạt nó."
          },
          {
            "label": "Cảnh báo đến người chính",
            "detail": "Thông báo vào kênh nhóm đang dùng, nêu luồng nào, bước nào, lúc nào, kèm đường dẫn tới lịch sử chạy."
          },
          {
            "label": "Người chính nhận hoặc đi vắng",
            "detail": "Nếu người chính xác nhận và sửa thì xong. Nếu không có ai phản hồi trong mốc đã đặt, cảnh báo đi tiếp."
          },
          {
            "label": "Cảnh báo đến người dự phòng",
            "detail": "Người dự phòng có quyền và có bản ghi để sửa. Tin nhắn nói rõ người chính chưa phản hồi."
          },
          {
            "label": "Sửa và ghi lại",
            "detail": "Sửa xong, ghi nguyên nhân vào bản ghi của luồng để lần sau không phải đoán."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Cảnh báo có tác dụng",
          "text": "Vào nhóm chat đang dùng hằng ngày. Đến một người có tên và một người dự phòng. Nêu luồng nào, bước nào, lúc nào, bấm đâu. Đã thử gây lỗi để biết nó thật sự đến."
        },
        "right": {
          "label": "Cảnh báo chỉ có trên giấy",
          "text": "Vào hộp thư cá nhân của người dựng luồng. Đến \"cả công ty\". Chỉ có chữ \"Lỗi\". Chưa ai thử xem có đến không, và không có người dự phòng."
        }
      },
      {
        "type": "callout",
        "label": "Người dự phòng phải có quyền thật",
        "text": "Đặt tên một người dự phòng nhưng không cấp quyền vào luồng thì cảnh báo đến nơi vẫn không ai sửa được. Hỏi bộ phận CNTT về quyền truy cập luồng trước, và đừng chia sẻ mật khẩu cá nhân để thay cho việc cấp quyền."
      },
      {
        "type": "scenario",
        "title": "Bạn sắp nghỉ phép hai tuần",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Thứ Sáu, bạn chuẩn bị nghỉ hai tuần. Luồng gửi nhắc thanh toán của bạn chạy mỗi sáng. Cảnh báo lỗi hiện đang chỉ vào hộp thư của bạn.",
            "choices": [
              {
                "label": "Để nguyên, luồng chạy ổn lâu nay rồi",
                "next": "bad_none"
              },
              {
                "label": "Đổi cảnh báo vào nhóm chat của nhóm và chọn một người dự phòng",
                "next": "s2"
              }
            ]
          },
          "bad_none": {
            "text": "Ngày thứ hai của kỳ nghỉ luồng hỏng vì tệp nguồn đổi tên. Không ai biết. Ba ngày sau khách gọi hỏi sao chưa thấy nhắc thanh toán, và bạn phải mở máy ở bãi biển để sửa.",
            "ending": "bad"
          },
          "s2": {
            "text": "Nhóm chat bắt đầu nhận cảnh báo. Bạn chọn chị Hà làm dự phòng vì chị ngồi cạnh và hay nhìn nhóm. Chị Hà chưa từng mở luồng.",
            "choices": [
              {
                "label": "Nhờ CNTT cấp quyền xem và sửa cho chị Hà, và đưa chị bản ghi một trang",
                "next": "good"
              },
              {
                "label": "Gửi chị Hà mật khẩu tài khoản của bạn để chị vào luồng khi cần",
                "next": "bad_pw"
              }
            ]
          },
          "bad_pw": {
            "text": "Chị Hà vào bằng tài khoản của bạn và sửa luồng, nhưng mọi thay đổi ghi tên bạn. Hai tuần sau phòng CNTT phát hiện mật khẩu bị chia sẻ, vi phạm quy định, và bạn phải đổi mật khẩu cùng báo cáo.",
            "ending": "bad"
          },
          "good": {
            "text": "Ngày thứ tư luồng hỏng, cảnh báo vào nhóm chat, chị Hà mở bản ghi, làm theo từng bước và sửa xong trong nửa giờ. Bạn trở về không có thư khiếu nại nào.",
            "ending": "good"
          }
        }
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI soạn thông báo cảnh báo luồng hỏng",
        "task": "Bạn cần một mẫu thông báo cảnh báo gửi vào nhóm chat khi luồng \"Nhắc thanh toán\" hỏng. Lắp prompt cho AI.",
        "parts": [
          {
            "id": "ctx",
            "label": "Bối cảnh",
            "options": [
              {
                "text": "Viết thông báo lỗi.",
                "feedback": "Thiếu tên luồng, người nhận và nơi đọc: AI viết một thông báo chung chung ai đọc cũng không biết làm gì."
              },
              {
                "text": "Luồng \"Nhắc thanh toán\" chạy 8 giờ sáng. Khi hỏng, thông báo vào nhóm chat phòng kế toán, người đọc không biết kỹ thuật.",
                "good": true,
                "feedback": "Nêu luồng, giờ chạy, nơi gửi và người đọc, nên thông báo viết đúng giọng và đúng mức chi tiết."
              }
            ]
          },
          {
            "id": "task",
            "label": "Nội dung cần có",
            "options": [
              {
                "text": "Có bốn dòng: tên luồng, bước lỗi, giờ lỗi, đường dẫn tới lịch sử chạy; thêm một dòng ghi ai xử lý trước và ai là dự phòng.",
                "good": true,
                "feedback": "Liệt kê đủ thứ người nhận cần để hành động ngay, không phải đoán."
              },
              {
                "text": "Giải thích thật chi tiết vì sao lỗi xảy ra về mặt kỹ thuật.",
                "feedback": "AI không biết nguyên nhân thật và sẽ tự bịa lý do kỹ thuật nghe có lý."
              }
            ]
          },
          {
            "id": "format",
            "label": "Độ dài và kiểu",
            "options": [
              {
                "text": "Dưới 60 chữ, gạch đầu dòng, không cảm thán, không lời xin lỗi.",
                "good": true,
                "feedback": "Ngắn, dễ quét mắt, không thêm chữ thừa giữa giờ làm việc."
              },
              {
                "text": "Viết thật thân thiện và dài để không ai hoảng.",
                "feedback": "Dài và nhiều chữ làm người nhận bỏ qua dòng quan trọng."
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
            "text": "Luồng \"Nhắc thanh toán\" hỏng lúc 08:02.\n- Bước lỗi: [tên bước]\n- Xem chi tiết: [đường dẫn lịch sử chạy]\n- Xử lý trước: [người chính]. Nếu sau 2 giờ chưa ai nhận: [người dự phòng]."
          },
          {
            "requires": [
              "ctx"
            ],
            "text": "Luồng \"Nhắc thanh toán\" vừa gặp sự cố. Mong các bạn xem giúp khi tiện.\n(Có tên luồng nhưng thiếu bước lỗi, đường dẫn và người xử lý, nên người đọc vẫn phải đi hỏi.)"
          },
          {
            "text": "Hệ thống phát hiện lỗi 500 do máy chủ quá tải lúc 08:02, nguyên nhân là cơ sở dữ liệu hết bộ nhớ...\n(AI tự bịa nguyên nhân kỹ thuật mà không có căn cứ nào từ lịch sử chạy.)"
          }
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Cảnh báo phải tới người đang nhìn, và luôn có người dự phòng có quyền thật.",
          "Bài sau: viết bản ghi một trang để bàn giao luồng mà không cần giải thích."
        ]
      }
    ]
  },
  {
    "id": 2478,
    "slug": "giao-luong-cho-dong-nghiep-ban-ghi-mot-trang",
    "title": "Chặng 53, Bài 19: Bàn giao luồng cho đồng nghiệp: bản ghi một trang, không cần bạn giải thích",
    "subtitle": "Một luồng mà chỉ người dựng hiểu là một quả bom hẹn giờ. Một trang giấy gỡ ngòi nổ.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "📄",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Người dựng luồng nghỉ phép, đổi việc hoặc đơn giản là quên sau sáu tháng. Nếu luồng hỏng hay cần tắt mà không ai hiểu nó làm gì, cả nhóm mất thời gian, và đôi khi mất dữ liệu. Một trang ghi đủ thứ cần thiết rẻ hơn rất nhiều so với một buổi ngồi dò lại.",
    "openingQuestion": "Bạn chuyển sang phòng khác, đồng nghiệp sẽ tiếp quản luồng gửi báo cáo tuần của bạn. Điều quan trọng nhất cần ghi lại trước hết là gì?",
    "openingOptions": [
      "Luồng làm gì, khi nào chạy, và ai bị ảnh hưởng nếu nó ngừng",
      "Tên các bước theo đúng thứ tự như trên màn hình, kèm ảnh từng bước",
      "Ngày bạn dựng luồng và tên bạn để ghi công",
      "Những lần luồng chạy thành công trong ba tháng qua"
    ],
    "correctOption": 0,
    "explanation": "Người tiếp quản cần trả lời nhanh ba câu: luồng này để làm gì, khi nào nó chạy, và nếu nó ngừng thì ai gặp rắc rối. Có ba câu đó, họ tự biết có cần can thiệp không. Tên các bước họ nhìn thấy ngay trên màn hình, ngày dựng chỉ là thông tin phụ, còn số lần thành công là con số không giúp xử lý khi có chuyện.",
    "diagram": [
      {
        "label": "Luồng chạy ổn",
        "arrow": true
      },
      {
        "label": "Bạn viết bản ghi một trang",
        "arrow": true
      },
      {
        "label": "AI đọc như người mới",
        "arrow": true
      },
      {
        "label": "Sửa chỗ khó hiểu",
        "arrow": true
      },
      {
        "label": "Giao cho đồng nghiệp"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Một phòng nhân sự có luồng nhắc phê duyệt phép do chị Lan dựng. Chị chuyển phòng, không để lại gì. Tháng sau luồng gửi nhầm thư cho một người đã nghỉ việc, và người tiếp quản không biết luồng chạy lúc nào, đọc bảng nào, hay tắt bằng cách nào. Họ mất nửa ngày dò lại, một trang ghi ngắn đã đủ để tránh việc này."
    },
    "quiz": [
      {
        "question": "Bản ghi một trang phải trả lời được câu nào trước hết?",
        "options": [
          "Luồng này làm gì, khi nào chạy, và ai bị ảnh hưởng nếu nó ngừng",
          "Ai là người đã tạo luồng và tạo vào ngày nào",
          "Luồng dùng những biểu tượng màu gì trên màn hình",
          "Luồng đã chạy bao nhiêu lần từ ngày dựng"
        ],
        "correct": 0,
        "explanation": "Ba câu đầu giúp người tiếp quản hiểu ngay luồng có quan trọng không và cần gấp đến đâu. Người tạo và ngày tạo giúp ghi công nhưng không giúp xử lý sự cố. Màu biểu tượng không mang thông tin gì. Số lần chạy chỉ là thống kê, không nói luồng để làm gì."
      },
      {
        "question": "Cách tắt luồng khẩn cấp nên ghi ở đâu?",
        "options": [
          "Trong đầu người dựng, vì chỉ người đó cần tắt",
          "Dòng đầu bản ghi, bằng các bước cụ thể",
          "Trong email cũ đã gửi đồng nghiệp vài tháng trước",
          "Không cần ghi, tắt luồng là việc của bộ phận CNTT"
        ],
        "correct": 1,
        "explanation": "Khi luồng gửi nhầm, người đang có mặt cần tắt ngay mà không phải tìm người dựng. Đặt cách tắt ở dòng đầu thì ai mở bản ghi cũng thấy. Kiến thức trong đầu một người thì mất khi người đó vắng. Email cũ chìm trong hộp thư. Không phải luồng nào CNTT cũng xử lý, và chờ họ thì thư vẫn đang đi."
      },
      {
        "question": "Có nên dán mật khẩu kết nối vào bản ghi không?",
        "options": [
          "Có, để người tiếp quản đăng nhập nhanh lúc cần mà không phải hỏi ai",
          "Có, nhưng in đậm để không ai bỏ sót khi đọc",
          "Không; chỉ ghi tài khoản nào giữ kết nối và hỏi ai",
          "Có, nếu bản ghi chỉ lưu trong thư mục của nhóm"
        ],
        "correct": 2,
        "explanation": "Mật khẩu trong tài liệu sẽ bị sao chép và nằm lại ở nhiều nơi, vượt quá kiểm soát của bạn. Bản ghi chỉ nên nói kết nối do tài khoản nào giữ và hỏi ai khi hết hạn. In đậm không làm mật khẩu an toàn hơn, và thư mục nhóm vẫn có nhiều người xem."
      },
      {
        "question": "Nhờ AI đọc bản ghi như người mới để làm gì?",
        "options": [
          "Để AI xác nhận bản ghi đúng 100% rồi khỏi cần ai đọc",
          "Để AI tự sửa luồng trong hệ thống cho khớp bản ghi",
          "Để AI ghi nhớ luồng và thay bạn trả lời về sau",
          "Tìm chỗ người mới sẽ hỏi lại hoặc hiểu sai"
        ],
        "correct": 3,
        "explanation": "AI đóng vai người chưa biết gì, nên những câu nó hỏi lại cho bạn thấy chỗ bản ghi còn thiếu hay mơ hồ. AI không biết luồng thật nên không thể xác nhận đúng sai. Nó cũng không tự sửa luồng nếu bạn chỉ dán chữ vào khung chat, và không nhớ luồng để trả lời thay bạn sau này."
      },
      {
        "question": "Bao lâu nên rà lại bản ghi?",
        "options": [
          "Mỗi khi luồng đổi, cộng một lần rà định kỳ vài tháng",
          "Một lần duy nhất lúc viết xong là đủ, sau đó chỉ cần giữ nguyên",
          "Mỗi sáng, vì luồng có thể đổi bất cứ lúc nào",
          "Khi có người hỏi, không cần rà chủ động"
        ],
        "correct": 0,
        "explanation": "Bản ghi lỗi thời còn tệ hơn không có bản ghi vì nó dẫn người đọc làm sai. Mỗi lần sửa luồng thì sửa bản ghi, và rà định kỳ để bắt những đổi không ai ghi. Rà mỗi sáng là quá mức, còn chỉ chờ người hỏi thì bản ghi sai đã gây hại trước khi bị phát hiện."
      }
    ],
    "keyTakeaways": [
      "Bản ghi một trang trả lời: làm gì, khi nào chạy, ai bị ảnh hưởng.",
      "Ghi cách tắt khẩn cấp ở dòng đầu, bằng các bước cụ thể.",
      "Không ghi mật khẩu; ghi tài khoản giữ kết nối và hỏi ai.",
      "Nhờ AI đọc như người mới để tìm chỗ thiếu, không để nó xác nhận.",
      "Mỗi lần sửa luồng là sửa bản ghi."
    ],
    "practicePrompt": {
      "question": "Bạn nhờ AI đọc bản ghi và nó hỏi: \"Luồng chạy vào giờ nào?\" mà bản ghi chưa ghi. Điều này cho thấy gì?",
      "options": [
        "Bản ghi thiếu thông tin người mới cần; bạn nên bổ sung",
        "AI đọc chưa kỹ, hãy nhờ lại nhiều lần bằng lời yêu cầu khác cho tới khi đủ",
        "Giờ chạy không quan trọng vì người mới sẽ tự thấy",
        "Bản ghi đủ tốt vì AI chưa chỉ ra lỗi nào về cách tắt"
      ],
      "correct": 0,
      "explanation": "Câu hỏi của AI đóng vai người mới cho thấy chỗ bản ghi bỏ trống: giờ chạy là thông tin cần có. Đổ cho AI đọc chưa kỹ là bỏ qua tín hiệu. Giờ chạy giúp người mới biết khi nào nên kiểm tra. Không có lỗi về một mục không có nghĩa các mục khác đầy đủ."
    },
    "summary": {
      "keyIdea": "Bản ghi một trang là thứ làm luồng của bạn sống được khi bạn không ở đó.",
      "formula": "Làm gì + khi nào + dữ liệu vào ra + ai bị ảnh hưởng + cách tắt + người liên hệ.",
      "commonMistake": "Coi sơ đồ luồng là đủ, hoặc để mọi thứ trong đầu người dựng.",
      "action": "Viết bản ghi một trang cho một luồng bạn đang dùng và nhờ AI đọc như người mới."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn một luồng hoặc một quy trình tự động của bạn. Viết một trang gồm: làm gì, chạy khi nào, dữ liệu vào và ra ở đâu, ai bị ảnh hưởng nếu ngừng, cách tắt, người liên hệ, ba lỗi hay gặp. Dán vào AI (đã bỏ hết tên người thật, đường dẫn nội bộ và mật khẩu), nhờ nó đóng vai người mới và hỏi lại mười câu.",
      "secondary": "Ngày mai ghi lại AI hỏi lại những câu nào mà bạn không trả lời được, rồi bổ sung vào bản ghi."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bạn sắp chuyển phòng, hoặc chỉ đơn giản là sắp nghỉ phép dài. Đồng nghiệp hỏi: \"Cái luồng em dựng chạy thế nào, lỡ hỏng thì làm sao?\" Một trang giấy trả lời giúp bạn, để bạn khỏi phải ngồi giải thích."
      },
      {
        "type": "feynman",
        "title": "Bản ghi bàn giao đơn giản hơn bạn nghĩ",
        "intro": "Khi bàn giao căn nhà cho người thuê mới, bạn để lại một tờ hướng dẫn: cầu dao ở đâu, van nước khoá thế nào, gọi ai khi hỏng. Họ không cần biết ai xây nhà.",
        "columns": [
          "Thành phần",
          "Tờ hướng dẫn căn nhà",
          "Bản ghi của luồng"
        ],
        "rows": [
          [
            "Công dụng",
            "Nhà dùng để ở",
            "Luồng làm việc gì"
          ],
          [
            "Khi nào cần",
            "Khi có sự cố",
            "Khi luồng hỏng hay cần sửa"
          ],
          [
            "Cách tắt khẩn cấp",
            "Vị trí cầu dao tổng",
            "Bước tắt luồng ngay"
          ],
          [
            "Người liên hệ",
            "Số chủ nhà, thợ điện",
            "Người giữ tài khoản, CNTT"
          ]
        ],
        "oneLiner": "Bản ghi là tờ hướng dẫn căn nhà: không kể ai xây, chỉ nói cách sống ở đó và gọi ai khi hỏng."
      },
      {
        "type": "heading",
        "text": "Một trang, sáu mục"
      },
      {
        "type": "paragraph",
        "text": "Sáu mục đủ cho hầu hết luồng văn phòng: mục đích, lịch chạy, dữ liệu vào ra, ai bị ảnh hưởng, cách tắt, người liên hệ. Thêm vào một mục ngắn: ba lỗi hay gặp và cách xử lý. Nếu một trang không đủ chỗ, luồng đó có lẽ đang làm quá nhiều việc."
      },
      {
        "type": "flow",
        "title": "Từ luồng chạy ổn tới bàn giao được",
        "steps": [
          {
            "label": "Viết sáu mục",
            "detail": "Viết ngắn, bằng lời bạn nói với đồng nghiệp. Mỗi mục một, hai câu, cách tắt viết thành các bước đánh số."
          },
          {
            "label": "Bỏ dữ liệu nhạy cảm",
            "detail": "Xoá tên người thật, đường dẫn nội bộ, mật khẩu. Chỉ ghi tài khoản giữ kết nối và hỏi ai khi cần."
          },
          {
            "label": "Nhờ AI đóng vai người mới",
            "detail": "Dán bản ghi đã làm sạch và nhờ AI hỏi lại những điều chưa rõ, thay vì nhờ nó xác nhận bản ghi đúng."
          },
          {
            "label": "Sửa theo câu hỏi",
            "detail": "Mỗi câu AI hỏi mà bản ghi chưa trả lời là một chỗ thiếu. Sửa, rồi nhờ người thật đọc thử."
          },
          {
            "label": "Giao và hẹn rà lại",
            "detail": "Đặt người giữ bản ghi và hẹn rà lại sau vài tháng hoặc mỗi khi luồng đổi."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Bản ghi dùng được",
          "text": "Dòng đầu nói luồng làm gì và cách tắt. Có người liên hệ. Có ba lỗi hay gặp. Đã có một người chưa biết luồng đọc thử và không phải hỏi lại."
        },
        "right": {
          "label": "Bản ghi gây hại",
          "text": "Chỉ là sơ đồ chép thành chữ. Dán mật khẩu cho tiện. Không ghi ngày cập nhật. Không ai rà lại nên sai từ lần luồng đổi gần nhất."
        }
      },
      {
        "type": "callout",
        "label": "Khi nhờ AI đọc bản ghi",
        "text": "Dán bản ghi đã bỏ tên người thật, đường dẫn nội bộ, mật khẩu, khoá truy cập. Nếu công ty chưa duyệt công cụ AI đang dùng, hỏi CNTT trước. Và AI chỉ chỉ ra chỗ thiếu: nó không biết luồng thật nên không xác nhận được bản ghi đúng hay sai."
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI đọc bản ghi như người mới",
        "task": "Bạn có bản ghi một trang của luồng gửi báo cáo tuần. Lắp prompt để AI đóng vai người mới và chỉ ra chỗ còn thiếu.",
        "parts": [
          {
            "id": "role",
            "label": "Vai của AI",
            "options": [
              {
                "text": "Bạn là chuyên gia luồng tự động, hãy khen bản ghi của tôi.",
                "feedback": "Nhờ khen thì AI khen; bạn không học được chỗ nào còn thiếu."
              },
              {
                "text": "Bạn là đồng nghiệp mới, chưa từng thấy luồng này, sẽ tiếp quản tuần sau.",
                "good": true,
                "feedback": "Đóng vai người chưa biết nên AI hỏi những câu người mới sẽ hỏi."
              }
            ]
          },
          {
            "id": "ask",
            "label": "Việc cần làm",
            "options": [
              {
                "text": "Đọc bản ghi dưới đây và liệt kê mười câu bạn sẽ phải hỏi lại, xếp theo mức quan trọng. Chỉ hỏi, không tự trả lời.",
                "good": true,
                "feedback": "Yêu cầu hỏi, không trả lời, để AI không bịa câu trả lời lấp chỗ thiếu."
              },
              {
                "text": "Đọc bản ghi và sửa cho hoàn chỉnh giúp tôi.",
                "feedback": "AI sẽ tự điền chỗ thiếu bằng chi tiết bịa, và bản ghi trông đầy đủ nhưng sai."
              }
            ]
          },
          {
            "id": "safe",
            "label": "Dữ liệu dán vào",
            "options": [
              {
                "text": "Tên người, đường dẫn thư mục thật và mật khẩu, để AI hiểu đầy đủ.",
                "feedback": "Đưa thông tin nhạy cảm vào ô chat là gửi nó ra ngoài công ty và không cần thiết cho việc rà soát."
              },
              {
                "text": "Bản ghi đã thay tên người bằng vai trò, đường dẫn bằng mô tả, bỏ hết mật khẩu.",
                "good": true,
                "feedback": "Đủ ý để AI đánh giá mà không lộ gì nhạy cảm."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "role",
              "ask",
              "safe"
            ],
            "text": "Mười câu tôi sẽ phải hỏi lại, xếp theo mức quan trọng:\n1. Nếu luồng gửi nhầm thư thì tắt bằng cách nào?\n2. Luồng chạy vào giờ nào, và chạy ở đâu?\n3. Ai là người liên hệ khi luồng hỏng?\n4. Bảng dữ liệu nguồn nằm ở đâu, ai cập nhật?\n5. Kết nối do tài khoản nào giữ và hết hạn khi nào?\n6-10. ..."
          },
          {
            "requires": [
              "role"
            ],
            "text": "Tôi đã đọc bản ghi, có vẻ khá đầy đủ. Bạn có thể bổ sung thêm vài chi tiết.\n(Câu trả lời chung chung vì bạn chưa yêu cầu liệt kê câu hỏi, nên không chỉ ra chỗ thiếu cụ thể nào.)"
          },
          {
            "text": "Bản ghi rất tốt! Luồng chạy lúc 7 giờ sáng hằng ngày và dùng tài khoản của phòng kế toán...\n(AI tự thêm giờ chạy và tài khoản mà bản ghi không hề có, cho bản ghi trông đầy đủ.)"
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Bạn giao luồng cho đồng nghiệp trước kỳ nghỉ",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn nghỉ phép hai tuần từ thứ Hai. Đồng nghiệp Bình sẽ trông luồng gửi báo cáo tuần. Bình hỏi: \"Em cần biết gì?\"",
            "choices": [
              {
                "label": "Nói miệng hai mươi phút rồi chúc Bình may mắn",
                "next": "bad_oral"
              },
              {
                "label": "Gửi Bình bản ghi một trang: mục đích, lịch chạy, cách tắt, người liên hệ",
                "next": "s2"
              }
            ]
          },
          "bad_oral": {
            "text": "Bình nhớ được nửa. Thứ Ba luồng gửi nhầm thư, Bình không biết cách tắt và phải gọi bạn khi bạn đang đi chơi. Thư đến thêm hai lần nữa trước khi có người tắt.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bình đọc bản ghi và hỏi một câu: \"Nếu hỏng thì em gọi ai ngoài chị?\" Bản ghi chưa có người liên hệ khác.",
            "choices": [
              {
                "label": "Bổ sung tên người liên hệ ở CNTT và quyền xem luồng cho Bình rồi gửi lại",
                "next": "good"
              },
              {
                "label": "Nói \"không sao đâu, sẽ không hỏng\" rồi đi nghỉ",
                "next": "bad_trust"
              }
            ]
          },
          "bad_trust": {
            "text": "Thứ Năm luồng hỏng vì kết nối hết hạn. Bình mở được bản ghi nhưng không biết hỏi ai về kết nối, báo cáo trễ hai ngày và sếp hỏi ai chịu trách nhiệm.",
            "ending": "bad"
          },
          "good": {
            "text": "Khi luồng hỏng vào thứ Tư, Bình đọc bản ghi, tắt luồng, hỏi đúng người ở CNTT và khôi phục trong một buổi sáng. Bạn trở về và chỉ phải đọc ghi chú.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Một trang, sáu mục, một người đọc thử: luồng của bạn có thể sống mà không cần bạn.",
          "Bài cuối của chặng: dựng, thử, giám sát và bàn giao một luồng cho quy trình thật."
        ]
      }
    ]
  },
  {
    "id": 2479,
    "slug": "capstone-luong-office-cho-mot-quy-trinh-that-cua-ban",
    "title": "Chặng 53, Bài 20: Tổng kết: dựng, thử, giám sát và bàn giao luồng Office cho một quy trình thật",
    "subtitle": "Bạn đã học từng mảnh. Bài này ghép chúng thành một quy trình thật, từ sơ đồ đến bản ghi.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "🏁",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Từng kỹ năng riêng lẻ chưa làm nên một luồng dùng được. Quy trình thật cần tất cả cùng lúc: phê duyệt có hạn chờ, tệp có tên rõ, thử trước khi bật, cảnh báo khi hỏng và một trang để người khác tiếp quản. Bài tổng kết giúp bạn thấy cả chuỗi.",
    "openingQuestion": "Bạn được giao dựng luồng cho quy trình \"đề nghị thanh toán nhỏ có hoá đơn đính kèm và quản lý duyệt\". Bắt đầu bằng việc gì?",
    "openingOptions": [
      "Vẽ sơ đồ: ai gửi gì, ai duyệt, tệp đi đâu, việc gì xảy ra khi từ chối hoặc quá hạn",
      "Mở công cụ và kéo thả các bước cho tới khi có gì đó chạy được",
      "Hỏi kế toán nên dùng hoá đơn nào rồi dựng luồng theo câu trả lời",
      "Chờ công cụ gợi ý một mẫu luồng có sẵn cho quy trình"
    ],
    "correctOption": 0,
    "explanation": "Sơ đồ buộc bạn trả lời trước những câu khó: từ chối thì sao, quá hạn thì sao, tệp lưu ở đâu. Nếu kéo thả khi chưa có sơ đồ, bạn dựng một luồng chỉ xử lý ca suôn sẻ. Hỏi kế toán về loại hoá đơn là việc cần làm nhưng nó là một đầu vào, không phải bước đầu tiên. Chờ mẫu có sẵn thì luồng không khớp quy trình thật của bạn.",
    "diagram": [
      {
        "label": "Chọn quy trình",
        "arrow": true
      },
      {
        "label": "Vẽ sơ đồ",
        "arrow": true
      },
      {
        "label": "Thử với dữ liệu mẫu",
        "arrow": true
      },
      {
        "label": "Đặt cảnh báo và người dự phòng",
        "arrow": true
      },
      {
        "label": "Viết bản ghi bàn giao"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Một văn phòng nhỏ có quy trình đề nghị thanh toán qua email và tin nhắn: người gửi nhắn, quản lý trả lời \"ok\", kế toán tự tìm hoá đơn. Họ chọn đúng quy trình này làm luồng đầu tiên vì nó lặp lại mỗi tuần, có người duyệt và có tệp, và đủ nhỏ để thử trong một buổi. Kết quả là mỗi đề nghị có một dòng ghi rõ ai duyệt, lúc nào, hoá đơn ở đâu."
    },
    "quiz": [
      {
        "question": "Chọn quy trình nào làm bài tổng kết?",
        "options": [
          "Việc lặp lại hằng tuần, có người duyệt và tệp, đủ nhỏ để thử trong một buổi",
          "Quy trình lớn nhất của công ty, để gây ấn tượng với sếp",
          "Việc chỉ xảy ra một lần mỗi năm vì có nhiều thời gian chuẩn bị",
          "Việc có dữ liệu lương vì đó là việc quan trọng nhất"
        ],
        "correct": 0,
        "explanation": "Quy trình đầu tiên nên lặp lại đủ thường để bạn thấy ngay hiệu quả, đủ nhỏ để kiểm được, có đủ cả phê duyệt và tệp để dùng hết bài học. Quy trình lớn nhất rủi ro cao và khó kiểm. Việc mỗi năm một lần hiếm khi chạy, nên khó thử. Dữ liệu lương nhạy cảm và nên có sự cho phép của CNTT trước."
      },
      {
        "question": "Thứ tự nào hợp lý khi làm một luồng mới?",
        "options": [
          "Bàn giao trước, rồi dựng và thử sau cho kịp hạn",
          "Vẽ sơ đồ, thử, đặt cảnh báo, bàn giao",
          "Dựng luôn trong công cụ, vẽ sơ đồ sau khi xong",
          "Thử bằng dữ liệu thật trước rồi mới đặt cảnh báo"
        ],
        "correct": 1,
        "explanation": "Sơ đồ đi trước để lộ các ca khó, thử đi trước khi bật để lỗi còn rẻ, cảnh báo đi trước khi bạn vắng, bàn giao đi sau cùng khi luồng đã ổn. Bàn giao trước thì ghi những thứ chưa tồn tại. Vẽ sơ đồ sau khi dựng thường chỉ chép lại cái đã làm. Thử bằng dữ liệu thật là đưa rủi ro vào người thật."
      },
      {
        "question": "Bộ ca thử tối thiểu cho quy trình có phê duyệt là gì?",
        "options": [
          "Chỉ ca được duyệt vì đó là ca hay xảy ra nhất",
          "Ca duyệt chạy lặp ba lần để đếm số lần thành công",
          "Duyệt, từ chối và quá hạn không ai trả lời",
          "Ba ca duyệt với ba người nhận khác nhau"
        ],
        "correct": 2,
        "explanation": "Luồng phê duyệt có ba nhánh và cần thử cả ba: đồng ý, từ chối, và không ai trả lời sau hạn chờ. Nhánh ít xảy ra nhất thường là nhánh hỏng. Chỉ thử ca duyệt bỏ qua hai nhánh còn lại. Lặp cùng ca không cho thông tin mới, còn đổi người nhận vẫn chỉ thử một nhánh."
      },
      {
        "question": "Bản ghi bàn giao khác sơ đồ ở điểm nào?",
        "options": [
          "Bản ghi chỉ là sơ đồ đã được viết thành chữ dài hơn",
          "Sơ đồ dành cho CNTT, bản ghi dành cho sếp duyệt",
          "Hai thứ trùng nhau nên chỉ cần giữ một trong hai",
          "Sơ đồ cho thấy luồng đi đâu; bản ghi thêm lý do, cách tắt và người liên hệ"
        ],
        "correct": 3,
        "explanation": "Sơ đồ trả lời \"đi thế nào\"; bản ghi trả lời thêm \"để làm gì, tắt ra sao, hỏng thì gọi ai\". Người tiếp quản cần cả hai. Coi bản ghi là sơ đồ dài hơn làm mất những mục bàn giao quan trọng. Đối tượng đọc không chia theo cấp bậc, và giữ một thứ bỏ thiếu thứ kia."
      },
      {
        "question": "Bạn không chắc luồng đụng tới dữ liệu nhạy cảm. Nên làm gì?",
        "options": [
          "Hỏi bộ phận CNTT hoặc pháp chế trước khi bật",
          "Bật thử trong một tuần, nếu không ai phàn nàn là ổn",
          "Xoá các cột nhạy cảm khỏi bảng rồi bật luôn",
          "Hỏi AI xem dữ liệu đó có nhạy cảm không rồi làm theo"
        ],
        "correct": 0,
        "explanation": "Chỉ bộ phận chịu trách nhiệm của tổ chức mới quyết định được loại dữ liệu nào luồng được phép đụng. Không ai phàn nàn không có nghĩa là không vi phạm. Xoá cột có thể làm luồng hỏng và không giải quyết câu hỏi quyền. AI không biết quy định nội bộ của công ty bạn."
      },
      {
        "question": "Sau khi luồng chạy ổn, việc nào vẫn cần làm đều đặn?",
        "options": [
          "Không cần gì, luồng ổn thì để yên là tốt nhất",
          "Xem lịch sử chạy định kỳ và rà lại bản ghi",
          "Dựng lại luồng mỗi tháng cho mới",
          "Tắt cảnh báo để bớt làm phiền nhóm"
        ],
        "correct": 1,
        "explanation": "Luồng sống trong một môi trường luôn đổi: tệp đổi tên, người đổi việc, quyền hết hạn. Xem lịch sử chạy định kỳ bắt lỗi sớm, rà bản ghi giữ nó đúng. Để yên là chờ lỗi tự lộ. Dựng lại hàng tháng tốn công và sinh lỗi mới, tắt cảnh báo thì quay về cảnh hỏng im lặng."
      },
      {
        "question": "Hạn chờ phê duyệt nên đặt thế nào?",
        "options": [
          "Không đặt hạn, chờ tới khi người duyệt nhớ ra",
          "Hạn càng ngắn càng tốt, để người duyệt luôn bị giục và không bỏ sót",
          "Theo nhu cầu thật của việc, kèm việc xảy ra khi quá hạn",
          "Hạn đặt theo giờ bạn thấy tiện nhất cho mình"
        ],
        "correct": 2,
        "explanation": "Hạn chờ phải khớp việc, ví dụ vài ngày cho đơn nhỏ, và luôn đi kèm quy tắc khi quá hạn như nhắc rồi chuyển người thay thế, như các bài trước. Không đặt hạn thì đơn nằm mãi. Hạn quá ngắn gây áp lực vô nghĩa. Hạn theo sự tiện của bạn bỏ qua nhịp làm việc của người duyệt."
      },
      {
        "question": "Khi nào luồng mới được gọi là đã bàn giao xong?",
        "options": [
          "Khi bạn gửi bản ghi qua email cho người tiếp quản",
          "Khi luồng chạy thành công ba lần liên tiếp",
          "Khi sếp đã nhấn đồng ý trên tin nhắn bàn giao",
          "Khi người tiếp quản tự xử lý được một lần lỗi thử theo bản ghi"
        ],
        "correct": 3,
        "explanation": "Bàn giao xong khi người nhận làm được việc, không chỉ khi tài liệu đã được gửi đi. Một lần thử lỗi có chủ ý cho bạn thấy bản ghi dùng được hay không. Gửi email chỉ chứng minh bạn đã gửi. Ba lần chạy thành công chưa thử nhánh lỗi. Sếp đồng ý không chứng tỏ người nhận hiểu luồng."
      }
    ],
    "keyTakeaways": [
      "Chọn quy trình nhỏ, lặp lại, có người duyệt và có tệp.",
      "Vẽ sơ đồ trước, kể cả nhánh từ chối và quá hạn.",
      "Thử ba nhánh bằng dữ liệu mẫu trước khi bật.",
      "Cảnh báo tới người đang nhìn, kèm người dự phòng có quyền.",
      "Bàn giao bằng một trang và kiểm bằng một lần lỗi thử."
    ],
    "practicePrompt": {
      "question": "Bạn vẽ xong sơ đồ quy trình đề nghị thanh toán và nhận ra sơ đồ chưa có nhánh \"người duyệt từ chối\". Nên làm gì?",
      "options": [
        "Thêm nhánh từ chối: báo người gửi kèm lý do, rồi kết thúc",
        "Bỏ qua vì từ chối hiếm khi xảy ra và sẽ xử lý bằng tay từng trường hợp",
        "Cho luồng tự duyệt lại sau một ngày nếu bị từ chối",
        "Xoá bước duyệt để khỏi phải có nhánh từ chối"
      ],
      "correct": 0,
      "explanation": "Nhánh từ chối là một ca thật phải có đường đi: người gửi được báo và biết lý do. Bỏ qua vì hiếm thì đến lúc xảy ra luồng không biết làm gì. Tự duyệt lại sau một ngày làm ngược ý người duyệt. Xoá bước duyệt làm mất chính điều quy trình cần kiểm soát."
    },
    "summary": {
      "keyIdea": "Luồng thật là cả chuỗi: sơ đồ, thử, cảnh báo, bản ghi, không chỉ các bước kéo thả.",
      "formula": "Sơ đồ có mọi nhánh → thử ba ca → cảnh báo + dự phòng → bản ghi một trang → người khác thử tiếp quản.",
      "commonMistake": "Dựng xong và bật luôn, coi phần còn lại là việc của sau này.",
      "action": "Chọn một quy trình thật của bạn, vẽ sơ đồ và liệt kê ba ca thử cùng người dự phòng."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn một quy trình thật của bạn có người duyệt và có tệp đính kèm (đề nghị thanh toán, xin nghỉ, đặt mua). Vẽ sơ đồ trên giấy với đủ ba nhánh: duyệt, từ chối, quá hạn. Viết ba ca thử bằng dữ liệu bịa, ghi người nhận cảnh báo và người dự phòng, rồi gửi sơ đồ cho một đồng nghiệp hỏi họ có hiểu không.",
      "secondary": "Ngày mai ghi lại câu hỏi đầu tiên của đồng nghiệp khi đọc sơ đồ: đó là chỗ bản ghi của bạn còn thiếu."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Chặng này đi từ một luồng nhỏ tới cả vòng đời của nó. Bài cuối không dạy thêm gì mới, mà ghép những mảnh đã học thành một quy trình thật, từ tờ giấy vẽ sơ đồ tới trang bàn giao."
      },
      {
        "type": "feynman",
        "title": "Dựng một luồng thật đơn giản hơn bạn nghĩ",
        "intro": "Nấu một bữa cỗ cần thực đơn trước, nếm thử trước khi dọn, có người trông bếp khi bạn vắng, và tờ ghi công thức cho người nấu lần sau.",
        "columns": [
          "Thành phần",
          "Nấu một bữa cỗ",
          "Dựng một luồng Office"
        ],
        "rows": [
          [
            "Kế hoạch",
            "Thực đơn, ai làm món nào",
            "Sơ đồ: ai gửi gì, ai duyệt, tệp đi đâu"
          ],
          [
            "Nếm thử",
            "Nếm món trước khi dọn",
            "Chạy thử bằng dữ liệu mẫu, người nhận là bạn"
          ],
          [
            "Người trông bếp",
            "Bếp phó khi bếp trưởng vắng",
            "Cảnh báo và người dự phòng"
          ],
          [
            "Công thức",
            "Tờ ghi cho lần nấu sau",
            "Bản ghi bàn giao một trang"
          ]
        ],
        "oneLiner": "Một luồng thật là một bữa cỗ: có thực đơn, có nếm thử, có người trông bếp và có công thức để lần sau ai nấu cũng được."
      },
      {
        "type": "heading",
        "text": "Bản đồ của cả chặng"
      },
      {
        "type": "paragraph",
        "text": "Phần một dạy bạn chọn việc và đặt ba phần kích hoạt, điều kiện, hành động. Phần hai thêm phê duyệt và thông báo. Phần ba lo tệp và Excel. Phần bốn, phần bạn vừa học, bảo vệ luồng khi nó sống: thử, xem lịch sử, cảnh báo, bàn giao."
      },
      {
        "type": "flow",
        "title": "Vòng đời một luồng Office",
        "steps": [
          {
            "label": "Chọn và vẽ",
            "detail": "Chọn quy trình nhỏ, lặp lại, có người duyệt và tệp. Vẽ sơ đồ có đủ nhánh duyệt, từ chối, quá hạn, và hỏi CNTT nếu đụng dữ liệu nhạy cảm."
          },
          {
            "label": "Dựng và thử",
            "detail": "Dựng theo sơ đồ. Thử bằng dữ liệu bịa, người nhận là bạn, gắn nhãn [THỬ], có cả ca xấu."
          },
          {
            "label": "Bật và giám sát",
            "detail": "Bật luồng thật. Xem lịch sử chạy trong những lần đầu, nhìn tỉ lệ thành công theo tuần."
          },
          {
            "label": "Cảnh báo và dự phòng",
            "detail": "Đặt cảnh báo vào nơi có người nhìn, chọn người dự phòng có quyền, đặt mốc chuyển theo độ gấp."
          },
          {
            "label": "Bàn giao",
            "detail": "Viết bản ghi một trang, nhờ AI hỏi như người mới, rồi kiểm bằng một lần lỗi thử."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Luồng làm một lần cho xong",
          "text": "Dựng thẳng trong công cụ, chỉ thử ca suôn sẻ, cảnh báo vào hộp thư của mình, không ghi gì. Chạy được cho tới khi có người đổi tên tệp hoặc bạn nghỉ phép."
        },
        "right": {
          "label": "Luồng sống được qua nhiều tháng",
          "text": "Có sơ đồ, đã thử ba nhánh, cảnh báo tới nhóm kèm người dự phòng, có bản ghi một trang. Hỏng thì biết sớm, người khác sửa được."
        }
      },
      {
        "type": "callout",
        "label": "Khi đụng dữ liệu công ty",
        "text": "Luồng đọc hợp đồng, lương, thông tin khách hàng hay tài khoản cá nhân cần được bộ phận CNTT hoặc pháp chế cho phép trước. Đây không phải chuyện tốn thời gian mà là chuyện ai chịu trách nhiệm khi có sự cố."
      },
      {
        "type": "scenario",
        "title": "Dựng luồng đề nghị thanh toán từ đầu tới bàn giao",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Quản lý giao bạn tự động hoá quy trình đề nghị thanh toán nhỏ: nhân viên gửi biểu mẫu kèm hoá đơn, quản lý duyệt, kế toán nhận một dòng ghi. Bạn bắt đầu thế nào?",
            "choices": [
              {
                "label": "Mở công cụ kéo thả các bước, nghĩ tới đâu làm tới đó",
                "next": "bad_drag"
              },
              {
                "label": "Vẽ sơ đồ trên giấy, có nhánh duyệt, từ chối và quá hạn",
                "next": "s2"
              }
            ]
          },
          "bad_drag": {
            "text": "Luồng chạy tốt với đơn được duyệt. Khi có đơn bị từ chối, luồng không biết làm gì và đơn nằm im. Hai tuần sau kế toán phát hiện bảy đơn mắc kẹt mà không ai hay.",
            "ending": "bad"
          },
          "s2": {
            "text": "Sơ đồ xong. Bạn dựng luồng và chuẩn bị thử. Có người muốn thử thẳng bằng đơn thật đang chờ duyệt cho nhanh.",
            "choices": [
              {
                "label": "Dùng đơn thật đang chờ để thử cho sát thực tế",
                "next": "bad_real"
              },
              {
                "label": "Thử bằng ba đơn bịa, người nhận là bạn, gắn nhãn [THỬ], đủ ba nhánh",
                "next": "s3"
              }
            ]
          },
          "bad_real": {
            "text": "Luồng gửi thông báo duyệt thật tới quản lý và kế toán khi đơn chưa đúng quy trình. Kế toán ghi nhầm một khoản vào sổ và phải chỉnh lại thủ công cuối tháng.",
            "ending": "bad"
          },
          "s3": {
            "text": "Ba nhánh đều chạy đúng. Bạn đặt cảnh báo vào nhóm chat của kế toán, nhưng còn hai việc: người dự phòng và bản ghi.",
            "choices": [
              {
                "label": "Chọn người dự phòng có quyền, viết bản ghi một trang, nhờ AI hỏi như người mới",
                "next": "good"
              },
              {
                "label": "Bật luôn, bản ghi để khi nào rảnh thì viết",
                "next": "bad_nodoc"
              }
            ]
          },
          "bad_nodoc": {
            "text": "Hai tháng sau bạn chuyển việc. Luồng hỏng vì quyền hết hạn, không ai biết luồng chạy ở đâu hay hỏi ai. Kế toán quay lại ghi tay trong ba tuần.",
            "ending": "bad"
          },
          "good": {
            "text": "Luồng chạy, cảnh báo vào nhóm, người dự phòng có quyền, bản ghi một trang đã được đồng nghiệp đọc thử. Khi quyền hết hạn, người dự phòng xử lý trong buổi sáng.",
            "ending": "good"
          }
        }
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI lập checklist bàn giao cho luồng đề nghị thanh toán",
        "task": "Bạn cần AI giúp lập checklist trước khi bàn giao luồng. Lắp prompt cho đúng.",
        "parts": [
          {
            "id": "ctx",
            "label": "Bối cảnh",
            "options": [
              {
                "text": "Lập checklist cho luồng.",
                "feedback": "Không nói luồng làm gì, nên checklist chung chung, dùng cho luồng nào cũng được."
              },
              {
                "text": "Luồng nhận biểu mẫu đề nghị thanh toán kèm hoá đơn, chuyển quản lý duyệt, rồi ghi một dòng vào bảng của kế toán.",
                "good": true,
                "feedback": "Đủ các phần của luồng, nên checklist bám đúng các chỗ có thể hỏng."
              }
            ]
          },
          {
            "id": "ask",
            "label": "Việc cần làm",
            "options": [
              {
                "text": "Liệt kê 10 việc cần kiểm trước khi bàn giao, chia theo: thử, cảnh báo, bản ghi, dữ liệu nhạy cảm.",
                "good": true,
                "feedback": "Có nhóm rõ ràng nên checklist dễ tick từng việc và không bỏ sót nhóm nào."
              },
              {
                "text": "Nói luồng này có an toàn để bàn giao không.",
                "feedback": "AI không biết luồng thật, nó sẽ trả lời \"an toàn\" một cách tự tin mà không có căn cứ."
              }
            ]
          },
          {
            "id": "limit",
            "label": "Giới hạn",
            "options": [
              {
                "text": "Chỉ liệt kê việc cần kiểm; không khẳng định luồng đúng hay sai, không bịa quy định của công ty.",
                "good": true,
                "feedback": "Giữ AI trong vai người lập danh sách, còn quyết định là của bạn và bộ phận liên quan."
              },
              {
                "text": "Thêm cả các quy định pháp luật liên quan để chắc chắn.",
                "feedback": "AI có thể bịa điều luật. Quy định thật phải hỏi bộ phận pháp chế."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "ctx",
              "ask",
              "limit"
            ],
            "text": "Checklist bàn giao (chỉ là gợi ý để bạn kiểm):\nThử: đã thử duyệt, từ chối, quá hạn bằng đơn bịa? Nhãn [THỬ] đã bỏ?\nCảnh báo: cảnh báo vào nhóm nào? Người dự phòng có quyền chưa?\nBản ghi: có cách tắt ở dòng đầu? Có người liên hệ?\nDữ liệu nhạy cảm: đã hỏi CNTT hoặc pháp chế về hoá đơn có thông tin cá nhân?\n(Bạn tự kiểm từng mục; AI không biết luồng thật.)"
          },
          {
            "requires": [
              "ctx"
            ],
            "text": "Checklist: kiểm thử, thêm cảnh báo, viết tài liệu, rà dữ liệu.\n(Có đủ bốn chữ nhưng không chia nhỏ thành việc cụ thể để tick.)"
          },
          {
            "text": "Luồng này an toàn để bàn giao và tuân thủ quy định tài chính hiện hành...\n(AI khẳng định an toàn và tuân thủ mà không biết gì về luồng hay quy định của công ty bạn.)"
          }
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Sơ đồ, thử, giám sát, cảnh báo, bản ghi: luồng của bạn giờ sống được khi bạn vắng mặt.",
          "Bước tiếp theo: lấy một quy trình thật của bạn và làm đúng chuỗi này."
        ]
      }
    ]
  }
];
