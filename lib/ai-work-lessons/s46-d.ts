import type { Lesson } from "../lesson-types";

// Chặng 46, bài 16-20. Giáo trình: scripts/curriculum/stage-46.json.
export const S46_D_LESSONS: Lesson[] = [
  {
    "id": 2335,
    "slug": "ban-quyen-anh-va-nhac-nen-dung-ai-tao-hay-thu-vien",
    "title": "Chặng 46, Bài 16: Ảnh, nhạc nền: nguồn nào dùng được cho công việc",
    "subtitle": "Mỗi ảnh, mỗi bài nhạc đều có một chủ và một điều kiện đi kèm - bạn chỉ cần ghi lại trước khi đăng.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "🎵",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Một bài đăng công khai của công ty có ảnh và nhạc nền nhìn rất nhỏ so với nội dung chính, nhưng chính chúng hay gây rắc rối nhất: ảnh tải vội từ kết quả tìm kiếm, nhạc lấy từ một video đang thịnh hành. Thói quen ghi nguồn và điều kiện dùng mất hai phút mỗi món và giúp bạn trả lời được ngay khi có người hỏi \"ảnh này ở đâu ra\".",
    "openingQuestion": "Bạn chuẩn bị bài đăng công khai giới thiệu sản phẩm mới của công ty, có một ảnh tìm được trên mạng và một bài nhạc nền. Trước khi đăng, việc nào nên làm đầu tiên?",
    "openingOptions": [
      "Ghi lại ai là chủ của ảnh và nhạc, và họ cho dùng vào việc gì",
      "Tải ảnh có độ phân giải cao nhất để bài đăng trông sắc nét",
      "Chọn bài nhạc đang được nhiều người dùng nhất để bài dễ lan rộng",
      "Đăng thử ở chế độ riêng tư rồi xem có ai phản ánh gì không"
    ],
    "correctOption": 0,
    "explanation": "Điều cần biết trước tiên với mọi ảnh, nhạc là nó của ai và chủ của nó cho phép dùng vào việc gì. Có trên mạng hay đang thịnh hành không cho bạn biết điều đó. Độ phân giải chỉ quyết định ảnh có rõ hay không, không quyết định được phép dùng hay không. Đăng thử ở chế độ riêng tư chỉ hoãn câu hỏi, còn bài đăng công khai thì người ngoài đã thấy.",
    "diagram": [
      {
        "label": "Liệt kê mọi ảnh, nhạc trong bài",
        "arrow": true
      },
      {
        "label": "Tìm chủ và điều kiện sử dụng của từng món",
        "arrow": true
      },
      {
        "label": "Ghi nguồn vào bảng, món nào mơ hồ thì hỏi pháp chế",
        "arrow": true
      },
      {
        "label": "Chỉ đăng những món đã rõ"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Một nhân viên truyền thông lấy ảnh đẹp từ kết quả tìm kiếm và nhạc nền từ một video đang nhiều người xem để làm clip quảng bá. Vài ngày sau bộ phận pháp chế hỏi nguồn của từng món, nhưng không ai còn nhớ đã lấy ở đâu. Clip phải gỡ và làm lại. Đây là tình huống minh hoạ, không phải một vụ việc có thật."
    },
    "quiz": [
      {
        "question": "Ảnh tìm thấy trong kết quả tìm kiếm, không ghi nguồn. Dùng cho bài đăng công khai của công ty được chưa?",
        "options": [
          "Chưa, phải tìm chủ ảnh và điều kiện dùng",
          "Được, vì ảnh hiện trong kết quả tìm kiếm nghĩa là ai cũng dùng được tự do",
          "Được nếu cắt bớt một góc ảnh để khác bản gốc và không ai nhận ra",
          "Được nếu ghi ở cuối bài dòng 'ảnh sưu tầm từ internet' cho minh bạch"
        ],
        "correct": 0,
        "explanation": "Kết quả tìm kiếm chỉ cho bạn thấy ảnh, không cho biết ai là chủ hay điều kiện dùng. Cắt góc ảnh không làm ảnh thành của bạn, và dòng 'sưu tầm từ internet' chỉ nói bạn không biết nguồn chứ không xin được phép. Việc đầu tiên là truy ra chủ ảnh."
      },
      {
        "question": "Một thư viện ảnh ghi 'miễn phí'. Bạn nên đọc thêm điều gì trước khi dùng cho bài đăng của công ty?",
        "options": [
          "Điều kiện đi kèm: có dùng thương mại được không, có phải ghi tên tác giả không",
          "Không cần đọc thêm: đã ghi miễn phí thì mọi mục đích đều dùng được",
          "Số lượt tải của ảnh: nhiều lượt tải thì chắc chắn an toàn",
          "Độ phân giải ảnh: đủ lớn là được dùng, còn lại không quan trọng"
        ],
        "correct": 0,
        "explanation": "Miễn phí chỉ nói về giá tiền, còn điều kiện dùng là chuyện khác: có nơi cho dùng cá nhân nhưng không cho dùng thương mại, có nơi bắt ghi tên tác giả. Số lượt tải và độ phân giải không nói gì về quyền dùng."
      },
      {
        "question": "Bạn tạo một ảnh bằng công cụ AI cho bài đăng. Điều nào nên làm?",
        "options": [
          "Xem điều khoản của công cụ đã tạo ảnh về việc dùng cho công việc",
          "Coi như ảnh của mình vì mình gõ câu lệnh, không ai có quyền gì khác",
          "Xoá hình mờ của công cụ là hết mọi ràng buộc, rồi đăng thoải mái",
          "Chỉ cần ghi 'ảnh tạo bằng AI' là đủ"
        ],
        "correct": 0,
        "explanation": "Điều kiện dùng ảnh do công cụ tạo ra nằm trong điều khoản của chính công cụ đó, và mỗi công cụ một khác; việc dùng vào quảng cáo lớn thì hỏi pháp chế. Gõ câu lệnh không tự biến thành quyền sở hữu chắc chắn, xoá hình mờ không xoá điều kiện, còn dòng ghi chú chỉ nói cách làm ra ảnh chứ không xin được phép."
      },
      {
        "question": "Đồng nghiệp gợi ý lấy bài hát đang thịnh hành trên mạng làm nhạc nền cho video đăng công khai. Bạn nên làm gì?",
        "options": [
          "Chọn nhạc từ nguồn có giấy phép rõ cho đăng công khai, ghi lại nguồn",
          "Tải bài đang thịnh hành về chèn vào, vì nhiều người khác cũng đang dùng rồi",
          "Dùng bài đó nhưng hạ nhỏ âm lượng ở đoạn đầu để đỡ bị phát hiện",
          "Cắt bài còn dưới 10 giây thì không còn vấn đề gì"
        ],
        "correct": 0,
        "explanation": "Nhiều người khác dùng không chứng tỏ họ được phép. Hạ âm lượng hay cắt ngắn không đổi việc bài hát có chủ; mỗi nguồn nhạc có điều kiện riêng. Cách chắc chắn là chọn nhạc của nguồn cho phép dùng vào đăng công khai và ghi lại."
      },
      {
        "question": "Ảnh chụp đường phố có nhiều người đi đường, bạn không rõ điều kiện đăng. Làm gì?",
        "options": [
          "Hỏi bộ phận pháp chế trước khi đăng, kèm ảnh",
          "Đăng thử, có người phản ánh thì gỡ xuống, coi như không thiệt hại gì",
          "Làm mờ vài khuôn mặt rồi đăng, vì vậy không còn vấn đề gì nữa",
          "Hỏi AI xem ảnh có dùng được không rồi làm theo"
        ],
        "correct": 0,
        "explanation": "Điều còn mơ hồ về quyền thì người có thẩm quyền trả lời là pháp chế, không phải AI hay phán đoán của bạn. Đăng rồi gỡ vẫn để lại bài đã bị người khác thấy và lưu, còn làm mờ vài khuôn mặt không giải quyết các câu hỏi khác về ảnh."
      }
    ],
    "keyTakeaways": [
      "Mỗi ảnh, mỗi bài nhạc đều có chủ và điều kiện sử dụng.",
      "Có trên mạng hoặc 'miễn phí' chưa có nghĩa là dùng được cho công việc.",
      "Ảnh do AI tạo có điều khoản riêng của công cụ: đọc trước khi dùng.",
      "Ghi nguồn và điều kiện vào một bảng ngắn cho mỗi bài đăng.",
      "Điều mơ hồ thì hỏi bộ phận pháp chế, không hỏi AI."
    ],
    "practicePrompt": {
      "question": "Bạn cần ảnh minh hoạ cho bài đăng về chính sách nghỉ phép. Cách làm nào vừa nhanh vừa có thể trả lời được khi có người hỏi nguồn?",
      "options": [
        "Chọn ảnh từ thư viện cho dùng thương mại, lưu đường dẫn và điều kiện",
        "Tìm ảnh đẹp nhất trên mạng, tải về rồi bỏ tên tệp gốc đi",
        "Nhờ đồng nghiệp gửi một ảnh đang có, không cần hỏi lấy từ đâu",
        "Dùng ảnh trong bài của công ty khác cùng ngành cho có tính tham khảo"
      ],
      "correct": 0,
      "explanation": "Ảnh lấy từ nguồn có điều kiện rõ và đường dẫn lưu lại cho bạn câu trả lời khi được hỏi. Bỏ tên tệp gốc chỉ làm mất dấu vết, còn ảnh đồng nghiệp đưa hay ảnh của công ty khác thì bạn vẫn chưa biết chủ và điều kiện."
    },
    "summary": {
      "keyIdea": "Trước khi đăng, mỗi ảnh và mỗi bài nhạc phải trả lời được hai câu: của ai, cho dùng vào việc gì.",
      "formula": "Liệt kê → tìm chủ và điều kiện → ghi bảng → món mơ hồ hỏi pháp chế → đăng.",
      "commonMistake": "Coi 'có trên mạng' hoặc 'miễn phí' là giấy phép dùng.",
      "action": "Lập bảng 4 cột (món, nguồn, điều kiện, ngày kiểm) cho bài đăng kế tiếp."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Mở một bài đăng hoặc slide gần nhất của phòng bạn có ảnh hoặc nhạc. Lập bảng cho từng món: nguồn, điều kiện sử dụng, ngày bạn kiểm. Món nào bạn không trả lời được thì đánh dấu đỏ và nhắn hỏi bộ phận pháp chế.",
      "secondary": "Đếm xem bao nhiêu món không truy ra được nguồn; con số đó cho bạn biết thói quen cần sửa."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bạn đang làm bài đăng giới thiệu sản phẩm và còn thiếu một tấm ảnh minh hoạ cùng một bài nhạc nền cho clip mười lăm giây. Hai món nhỏ này lại là chỗ người ngoài nhìn vào và hỏi 'cái này ở đâu ra'. Bài này giúp bạn trả lời được câu đó."
      },
      {
        "type": "feynman",
        "title": "Nguồn ảnh, nhạc đơn giản hơn bạn nghĩ",
        "intro": "Hình dung bạn mượn một cái bàn họp của công ty khác cho sự kiện. Bạn không chỉ cần thấy cái bàn đẹp: bạn cần biết bàn của ai, mượn bao lâu, dùng vào việc gì.",
        "columns": [
          "Thành phần",
          "Mượn cái bàn",
          "Dùng ảnh, nhạc"
        ],
        "rows": [
          [
            "Của ai",
            "Công ty chủ bàn",
            "Tác giả hoặc chủ sở hữu ảnh, nhạc"
          ],
          [
            "Điều kiện",
            "Mượn một ngày, không mang ra ngoài",
            "Giấy phép: thương mại hay không, có ghi tên không"
          ],
          [
            "Bằng chứng",
            "Tin nhắn đồng ý của lễ tân",
            "Đường dẫn và ảnh chụp trang điều kiện"
          ]
        ],
        "oneLiner": "Dùng ảnh hay nhạc giống mượn đồ: cần biết của ai và được dùng vào việc gì."
      },
      {
        "type": "heading",
        "text": "Vấn đề: ai cũng 'lấy tạm' một tấm ảnh"
      },
      {
        "type": "paragraph",
        "text": "Trong ngày làm việc bận rộn, tìm ảnh nhanh nhất là mở kết quả tìm kiếm và tải về. Ảnh hiện ra ngay ở đó rất dễ khiến người ta nghĩ nó là của chung. Thực ra kết quả tìm kiếm chỉ là danh sách chỉ tới ảnh của người khác, và mỗi ảnh vẫn có chủ của nó."
      },
      {
        "type": "heading",
        "text": "Ba nguồn, ba cách kiểm"
      },
      {
        "type": "list",
        "items": [
          "Ảnh, nhạc từ thư viện: đọc trang điều kiện, xem có cho dùng thương mại và đăng công khai không.",
          "Ảnh, nhạc do công ty có sẵn hoặc đã mua: hỏi người quản lý tài nguyên phạm vi dùng là gì.",
          "Ảnh do công cụ AI tạo: đọc điều khoản của chính công cụ đó về việc dùng cho công việc."
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Điều nên ghi lại",
          "text": "Tên món, đường dẫn hoặc tên người cung cấp, điều kiện sử dụng, ngày bạn kiểm, người đã duyệt."
        },
        "right": {
          "label": "Điều không phải là bằng chứng",
          "text": "'Thấy ai cũng dùng', 'có trên mạng', 'được tải nhiều', 'miễn phí' mà chưa đọc điều kiện."
        }
      },
      {
        "type": "callout",
        "label": "Khi còn mơ hồ",
        "text": "Nếu ảnh có người thật, có logo của bên khác, hoặc bạn không chắc điều kiện, hỏi bộ phận pháp chế. Đừng hỏi AI rồi coi câu trả lời như giấy phép: nó có thể đoán rất tự tin."
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI soạn bảng nguồn cho bài đăng",
        "task": "Bài đăng của phòng có 3 ảnh và 1 bài nhạc. Lắp một câu lệnh để AI dựng bảng ghi nguồn mà bạn sẽ tự điền đủ từ thông tin thật.",
        "parts": [
          {
            "id": "ctx",
            "label": "Bối cảnh",
            "options": [
              {
                "text": "Lập bảng nguồn ảnh.",
                "feedback": "AI không biết bài đăng là gì, công khai hay nội bộ, nên sẽ bịa tên nguồn cho đẹp bảng."
              },
              {
                "text": "Tôi làm truyền thông nội bộ. Bài đăng công khai có 3 ảnh và 1 bài nhạc; tôi sẽ tự điền nguồn thật từ thư viện công ty dùng.",
                "good": true,
                "feedback": "Nêu rõ bài đăng công khai và việc bạn tự điền nguồn thật, AI không phải đoán."
              }
            ]
          },
          {
            "id": "task",
            "label": "Việc cần làm",
            "options": [
              {
                "text": "Điền sẵn nguồn và điều kiện cho nhanh để tôi khỏi mất công.",
                "feedback": "AI không thấy ảnh của bạn, sẽ điền nguồn và điều kiện nghe hợp lý nhưng bịa."
              },
              {
                "text": "Dựng bảng 4 cột: tên món, nguồn, điều kiện sử dụng, ngày kiểm. Để trống chỗ tôi phải tự điền, không tự suy đoán nguồn.",
                "good": true,
                "feedback": "Dặn để trống là cách tránh AI điền nguồn giả vào bảng."
              }
            ]
          },
          {
            "id": "fmt",
            "label": "Khuôn dạng",
            "options": [
              {
                "text": "Viết dài và đầy đủ nhất có thể.",
                "feedback": "'Dài nhất có thể' làm AI viết thêm lời giải thích cho bạn đọc, không ra bảng dùng được."
              },
              {
                "text": "Trả về bảng văn bản gọn, mỗi món một dòng, thêm một dòng cuối nhắc món nào mơ hồ thì hỏi pháp chế.",
                "good": true,
                "feedback": "Bảng gọn và dòng nhắc pháp chế cho bạn một khung kiểm dùng ngay."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "ctx",
              "task",
              "fmt"
            ],
            "text": "| Món | Nguồn | Điều kiện | Ngày kiểm |\n| Ảnh 1 | (bạn điền) | (bạn điền) | (bạn điền) |\n| Ảnh 2 | (bạn điền) | (bạn điền) | (bạn điền) |\n| Ảnh 3 | (bạn điền) | (bạn điền) | (bạn điền) |\n| Nhạc nền | (bạn điền) | (bạn điền) | (bạn điền) |\nLưu ý: món nào không rõ điều kiện, hỏi bộ phận pháp chế trước khi đăng."
          },
          {
            "requires": [
              "ctx"
            ],
            "text": "Bảng nguồn:\nẢnh 1 - nguồn: thư viện công ty - điều kiện: dùng tự do\nẢnh 2 - nguồn: thư viện công ty - điều kiện: dùng tự do\n(AI tự điền 'thư viện công ty' và 'dùng tự do' vì bạn không bảo để trống - những điều này chưa ai kiểm.)"
          },
          {
            "text": "Ảnh 1 chụp bởi nhiếp ảnh gia Nguyễn Văn A, được cấp phép thương mại vô thời hạn.\n(Tên người và giấy phép hoàn toàn do AI bịa, vì nó không biết gì về ảnh của bạn.)"
          }
        ]
      },
      {
        "type": "flow",
        "title": "Từ ảnh tìm được tới bài đăng an toàn",
        "steps": [
          {
            "label": "Liệt kê",
            "detail": "Ghi mọi ảnh, nhạc, phông chữ và video sẽ có trong bài đăng. Những món bị quên sẽ là món không có nguồn."
          },
          {
            "label": "Tìm chủ",
            "detail": "Với mỗi món, truy về trang gốc hoặc người cung cấp. Nếu chỉ thấy bản sao ở nơi khác, chưa có nguồn."
          },
          {
            "label": "Đọc điều kiện",
            "detail": "Xem có cho dùng công khai và thương mại không, có phải ghi tên tác giả không, có được chỉnh sửa không."
          },
          {
            "label": "Ghi bảng",
            "detail": "Điền tên, đường dẫn, điều kiện, ngày kiểm. Đây là bằng chứng của bạn khi có người hỏi."
          },
          {
            "label": "Hỏi khi mơ hồ",
            "detail": "Món nào chưa rõ thì gửi bộ phận pháp chế cùng bảng, không đăng cho tới khi có câu trả lời."
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Clip mười lăm giây lúc 4 giờ chiều",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Sếp cần clip giới thiệu sản phẩm đăng lúc 5 giờ. Bạn có ảnh sản phẩm của công ty, còn thiếu ảnh phông nền và bài nhạc. Đồng nghiệp gửi link một bài hát đang thịnh hành.",
            "choices": [
              {
                "label": "Tải bài hát đó về chèn vào vì đang nhiều người dùng",
                "next": "bad_song"
              },
              {
                "label": "Chọn nhạc và ảnh nền từ thư viện cho dùng công khai, ghi lại điều kiện",
                "next": "s2"
              }
            ]
          },
          "bad_song": {
            "text": "Clip đăng đúng giờ. Hai ngày sau, một thông báo vi phạm nhạc làm clip bị gỡ giữa chiến dịch, và pháp chế hỏi bạn giấy phép bài hát.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bạn ghi vào bảng: tên món, nguồn, điều kiện. Ảnh nền có dòng 'phải ghi tên tác giả', còn bạn đang định không ghi.",
            "choices": [
              {
                "label": "Bỏ qua dòng đó cho gọn clip vì chẳng ai đọc",
                "next": "bad_credit"
              },
              {
                "label": "Thêm dòng ghi tên tác giả ở cuối clip đúng như điều kiện",
                "next": "s3"
              }
            ]
          },
          "bad_credit": {
            "text": "Tác giả ảnh tự tìm thấy clip và nhắn công ty vì không được ghi tên. Bạn phải thêm dòng ghi tên và đăng lại clip.",
            "ending": "bad"
          },
          "s3": {
            "text": "Bạn có một ảnh đông người ở một sự kiện bên ngoài, không rõ điều kiện đăng.",
            "choices": [
              {
                "label": "Gửi ảnh và bảng cho pháp chế, tạm dùng ảnh khác trong lúc chờ",
                "next": "good"
              },
              {
                "label": "Đăng luôn vì đã sắp tới giờ",
                "next": "bad_late"
              }
            ]
          },
          "bad_late": {
            "text": "Một người trong ảnh nhắn yêu cầu gỡ vì chưa từng đồng ý, và bạn phải gỡ clip đang chạy.",
            "ending": "bad"
          },
          "good": {
            "text": "Clip đăng đúng 5 giờ. Khi có người hỏi nguồn, bạn đưa bảng ra trong một phút.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Trước khi đăng: mỗi ảnh, mỗi bài nhạc đều có chủ và điều kiện.",
          "Ghi lại nguồn và điều kiện ngay lúc chọn, đừng đợi có người hỏi.",
          "Điều mơ hồ thì hỏi pháp chế, không để AI trả lời thay."
        ]
      }
    ]
  },
  {
    "id": 2336,
    "slug": "hinh-nguoi-that-khuon-mat-va-su-dong-y",
    "title": "Chặng 46, Bài 17: Ảnh có người thật: xin phép và những điều không làm",
    "subtitle": "Khuôn mặt đồng nghiệp trên áp phích là của họ trước khi là của bạn.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "🙋",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Áp phích có ảnh đồng nghiệp thật thì gần gũi hơn ảnh kho, và AI làm cho việc ghép, chỉnh ảnh người dễ tới mức quên hỏi họ. Nhưng khuôn mặt, giọng nói là phần rất riêng của mỗi người. Một lời xin phép rõ ràng mất hai phút, còn hình ảnh đã đăng mà người trong ảnh không đồng ý thì khó kéo lại.",
    "openingQuestion": "Bạn muốn đưa ảnh ba đồng nghiệp chụp ở buổi tập huấn vào áp phích tuyển dụng. Điều nào đáng làm trước khi đăng?",
    "openingOptions": [
      "Hỏi từng người, nói rõ ảnh dùng ở đâu và lúc nào sẽ gỡ",
      "Báo trong nhóm chat chung rằng ảnh sẽ được dùng vào tuần sau",
      "Nhờ trưởng phòng đồng ý thay cho cả ba người trong ảnh",
      "Chỉnh lại khuôn mặt bằng AI cho đẹp hơn rồi đăng vì ảnh thật đã được sửa"
    ],
    "correctOption": 0,
    "explanation": "Xin phép từng người, nói rõ nơi dùng và thời hạn là cách duy nhất biết họ thực sự đồng ý. Báo trong nhóm chat chung không cho họ cơ hội nói không; trưởng phòng không đồng ý thay cho khuôn mặt của người khác; còn chỉnh ảnh bằng AI là thay đổi thêm, cần họ đồng ý thêm, chứ không làm cho việc xin phép thành thừa.",
    "diagram": [
      {
        "label": "Xác định ai xuất hiện trong ảnh",
        "arrow": true
      },
      {
        "label": "Hỏi từng người: dùng ở đâu, bao lâu",
        "arrow": true
      },
      {
        "label": "Lưu câu đồng ý bằng văn bản",
        "arrow": true
      },
      {
        "label": "Chỉ dùng đúng phạm vi đã xin"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Một phòng nhân sự dùng ảnh nhóm tại buổi tập huấn cho áp phích tuyển dụng mà không hỏi lại những người trong ảnh. Một nhân viên đã nghỉ việc nhìn thấy mình trên áp phích của công ty cũ và yêu cầu gỡ. Phòng phải in lại toàn bộ áp phích. Đây là tình huống minh hoạ, không phải vụ việc có thật."
    },
    "quiz": [
      {
        "question": "Bạn muốn đăng ảnh đồng nghiệp dự sự kiện lên trang công khai của công ty. Cách làm đúng là gì?",
        "options": [
          "Hỏi từng người được chụp, nói rõ ảnh dùng ở đâu, bao lâu, và lưu lại câu đồng ý",
          "Báo trong nhóm chat chung, ai không nói gì nghĩa là đồng ý",
          "Đăng trước, vì họ tham dự sự kiện công ty nên mặc nhiên đồng ý",
          "Xin trưởng phòng là đủ, thay mặt cả nhóm"
        ],
        "correct": 0,
        "explanation": "Đồng ý thật sự là người trong ảnh biết ảnh dùng vào đâu và nói có. Im lặng không phải đồng ý, tham dự sự kiện không phải đồng ý đăng công khai, và trưởng phòng không thể đồng ý thay khuôn mặt của người khác."
      },
      {
        "question": "Bạn định nhờ AI tạo ảnh giám đốc đang khen sản phẩm dù ông chưa từng nói câu đó. Nên làm gì?",
        "options": [
          "Không làm, kể cả khi có ghi chú AI, vì người đó chưa từng nói hay làm việc ấy",
          "Làm được nếu ghi nhỏ ở góc ảnh 'ảnh minh hoạ do AI tạo ra'",
          "Làm được nếu giám đốc thường nói những ý tương tự trong họp",
          "Làm được nếu chỉ đăng trong nhóm chat công ty"
        ],
        "correct": 0,
        "explanation": "Tạo hình hoặc lời của người thật vào việc họ chưa từng làm là giả mạo, và dòng ghi chú nhỏ không đổi điều đó. Ý tương tự trong họp không phải lời xác nhận, và nhóm chat công ty vẫn là nơi ảnh sẽ bị chia sẻ tiếp."
      },
      {
        "question": "Một đồng nghiệp đã đồng ý để bạn đăng ảnh, sáu tháng sau xin gỡ. Nên làm gì?",
        "options": [
          "Gỡ ảnh khỏi những nơi công ty kiểm soát được",
          "Giữ nguyên vì họ đã đồng ý lúc chụp, đồng ý là không rút lại được",
          "Gỡ khỏi trang công khai nhưng vẫn dùng ở ấn phẩm in vì đã in rồi",
          "Chỉ làm mờ khuôn mặt, còn tên người đó vẫn giữ ở phần chú thích ảnh"
        ],
        "correct": 0,
        "explanation": "Người trong ảnh có thể đổi ý, và việc của bạn là gỡ khỏi nơi bạn kiểm soát được. Giữ vì 'đã đồng ý rồi' bỏ qua quyền đổi ý, còn làm mờ mặt mà giữ tên thì người ta vẫn nhận ra họ."
      },
      {
        "question": "Bạn định dùng AI chỉnh ảnh chân dung một nhân viên cho trẻ hơn. Làm sao cho đúng?",
        "options": [
          "Hỏi chính người đó trước và chỉ chỉnh ở mức họ đồng ý",
          "Tự chỉnh cho đẹp, vì ảnh đẹp hơn thì ai cũng vui",
          "Chỉnh thoải mái vì đó là ảnh công ty chụp nên công ty toàn quyền quyết định",
          "Nhờ AI chỉnh cho giống ảnh hồi còn trẻ rồi dùng luôn, không báo ai"
        ],
        "correct": 0,
        "explanation": "Khuôn mặt vẫn là của người đó dù ảnh do công ty chụp. Chỉnh để 'đẹp hơn' là ý của bạn, chưa chắc là ý của họ, và càng chỉnh nhiều càng khác người thật. Hỏi trước và dừng ở mức họ đồng ý."
      },
      {
        "question": "Ảnh toàn cảnh sự kiện có nhiều khuôn mặt nhỏ, một vài người rõ mặt. Bạn nên làm gì?",
        "options": [
          "Dùng ảnh toàn cảnh; ai rõ mặt nổi bật thì hỏi lại hoặc thay ảnh",
          "Đăng hết, vì đã ở nơi công cộng thì ai chụp cũng được",
          "Đăng hết và ghi cuối bài 'ai không muốn lên hình thì tự liên hệ gỡ'",
          "Dùng AI thay toàn bộ khuôn mặt bằng mặt người giả để khỏi phải xin phép"
        ],
        "correct": 0,
        "explanation": "Ảnh toàn cảnh rủi ro thấp hơn, nhưng người rõ mặt vẫn cần được hỏi. Bắt người ta tự đi tìm để xin gỡ là đẩy việc cho họ, còn thay bằng mặt giả là tạo thêm một thứ không có thật."
      }
    ],
    "keyTakeaways": [
      "Xin phép từng người, nói rõ nơi dùng và thời hạn.",
      "Im lặng, tham dự sự kiện hay lời của trưởng phòng không thay được câu đồng ý.",
      "Không tạo hình hoặc lời của người thật vào việc họ chưa làm.",
      "Người trong ảnh có thể đổi ý: gỡ khỏi nơi mình kiểm soát.",
      "Chỉnh ảnh người bằng AI cũng cần họ đồng ý."
    ],
    "practicePrompt": {
      "question": "Một cộng tác viên nhắn: 'Ảnh tôi trên áp phích cũ của công ty, tôi không muốn dùng nữa.' Phản hồi nào đúng?",
      "options": [
        "Cảm ơn, gỡ khỏi những nơi công ty kiểm soát và báo lại khi xong",
        "Nhắn rằng họ đã đồng ý trước đó nên không gỡ được nữa, xin thông cảm",
        "Chỉ gỡ ảnh khỏi trang web, còn áp phích in thì để nguyên",
        "Nhờ AI làm cho ảnh không nhận ra người rồi dùng tiếp"
      ],
      "correct": 0,
      "explanation": "Gỡ khỏi nơi công ty kiểm soát và báo lại là phản hồi tôn trọng quyền đổi ý. Nhắc lại lời đồng ý cũ bỏ qua điều họ vừa nói, gỡ một phần là làm nửa việc, còn nhờ AI che đi vẫn là dùng ảnh người đó khi họ đã nói không."
    },
    "summary": {
      "keyIdea": "Khuôn mặt và giọng nói là của người thật, nên dùng phải có phép và không bao giờ tạo giả.",
      "formula": "Hỏi từng người → nói rõ nơi dùng, thời hạn → lưu lời đồng ý → gỡ khi họ rút lại.",
      "commonMistake": "Coi im lặng hoặc lời của trưởng phòng là đồng ý của người trong ảnh.",
      "action": "Soạn một mẫu tin xin phép ngắn để dùng lại cho các lần sau."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Soạn mẫu tin xin phép dùng ảnh gồm ba dòng: ảnh dùng vào việc gì, đăng ở đâu, bao lâu thì gỡ. Gửi thử cho một đồng nghiệp có ảnh trong tài liệu sắp tới của phòng bạn và lưu lại câu trả lời của họ.",
      "secondary": "Ghi ra giấy ba việc phòng bạn cam kết không bao giờ làm với ảnh người thật."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Sắp có đợt tuyển dụng và bạn thấy tấm ảnh nhóm ở buổi tập huấn rất hợp cho áp phích. Ba người trong ảnh ngồi ngay bên cạnh bạn. Hỏi họ một câu mất ba mươi giây, còn không hỏi thì có thể mất cả áp phích."
      },
      {
        "type": "feynman",
        "title": "Xin phép dùng ảnh đơn giản hơn bạn nghĩ",
        "intro": "Hình dung bạn mượn chiếc xe máy của đồng nghiệp đi việc. Bạn hỏi mượn đi đâu, bao giờ trả. Dùng ảnh người thật cũng vậy: khuôn mặt là thứ của họ.",
        "columns": [
          "Thành phần",
          "Mượn xe",
          "Dùng ảnh người"
        ],
        "rows": [
          [
            "Của ai",
            "Chủ chiếc xe",
            "Người có mặt trong ảnh"
          ],
          [
            "Phải hỏi gì",
            "Đi đâu, bao giờ trả",
            "Đăng ở đâu, bao lâu thì gỡ"
          ],
          [
            "Khi chủ đổi ý",
            "Trả xe ngay",
            "Gỡ ảnh khỏi nơi mình kiểm soát"
          ]
        ],
        "oneLiner": "Khuôn mặt mượn như xe: hỏi chủ, nói rõ dùng vào đâu, trả khi họ đòi."
      },
      {
        "type": "heading",
        "text": "Hai việc khác nhau: xin phép và không làm"
      },
      {
        "type": "paragraph",
        "text": "Có việc xin phép là được: dùng ảnh thật của đồng nghiệp, chỉnh nhẹ độ sáng. Có việc không xin phép cũng không làm: tạo ảnh hay giọng của người thật nói điều họ chưa nói, ghép mặt người thật vào việc họ chưa làm. Khác biệt nằm ở chỗ người trong ảnh có thật sự làm và biết việc đó hay không."
      },
      {
        "type": "list",
        "items": [
          "Hỏi từng người, không hỏi qua nhóm chat chung hay trưởng phòng.",
          "Nói rõ ba điều: ảnh dùng vào việc gì, đăng ở đâu, bao lâu sẽ gỡ.",
          "Lưu lời đồng ý bằng văn bản (tin nhắn, email).",
          "Muốn chỉnh ảnh bằng AI, hỏi thêm chính họ."
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Làm được sau khi xin phép",
          "text": "Dùng ảnh thật, cắt, chỉnh sáng theo mức họ đồng ý, đăng đúng nơi và thời hạn đã nói."
        },
        "right": {
          "label": "Không làm, dù có ghi chú AI",
          "text": "Tạo giọng, hình hay lời của người thật để họ 'nói' hoặc 'làm' việc chưa từng xảy ra."
        }
      },
      {
        "type": "callout",
        "label": "Khi có người muốn rút lại",
        "text": "Họ có quyền đổi ý. Việc của bạn là gỡ khỏi nơi công ty kiểm soát và báo lại. Câu hỏi pháp lý sâu hơn thì hỏi bộ phận pháp chế."
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Soát lời xin phép do AI soạn",
        "task": "Bạn nhờ AI soạn tin xin phép cho hai đồng nghiệp. Bạn chỉ cho AI biết: ảnh dùng cho áp phích tuyển dụng, đăng trên trang của công ty, chưa quyết định gỡ khi nào. Bấm những câu AI tự thêm điều bạn chưa từng cung cấp.",
        "segments": [
          {
            "text": "Chào anh chị, em xin phép dùng ảnh anh chị chụp ở buổi tập huấn cho áp phích tuyển dụng."
          },
          {
            "text": "Ảnh sẽ chỉ được đăng trên trang của công ty."
          },
          {
            "text": "Ảnh sẽ được gỡ tự động sau đúng 30 ngày.",
            "error": "Bạn chưa quyết định thời hạn gỡ; AI tự bịa ra con số 30 ngày, một cam kết công ty chưa hứa."
          },
          {
            "text": "Theo quy định pháp luật, công ty không cần xin phép khi dùng ảnh nhân viên.",
            "error": "Đây là điều AI tự khẳng định về pháp luật, sai hướng và ngược với điều bạn đang làm. Câu hỏi pháp lý phải hỏi pháp chế."
          },
          {
            "text": "Nếu anh chị không muốn, em sẽ gỡ ảnh theo yêu cầu."
          },
          {
            "text": "Anh chị chỉ cần trả lời 'đồng ý' hoặc 'không đồng ý' qua tin nhắn này."
          }
        ]
      },
      {
        "type": "flow",
        "title": "Từ ảnh nhóm tới áp phích có phép",
        "steps": [
          {
            "label": "Lập danh sách người",
            "detail": "Ghi tên từng người có mặt rõ trong ảnh. Người chỉ thấy lưng hay rất nhỏ vẫn nên được cân nhắc."
          },
          {
            "label": "Soạn tin xin phép",
            "detail": "Ba dòng: dùng vào việc gì, đăng ở đâu, bao lâu thì gỡ. Không hứa điều công ty chưa quyết định."
          },
          {
            "label": "Gửi riêng từng người",
            "detail": "Gửi riêng để mỗi người dễ nói không mà không ngại."
          },
          {
            "label": "Lưu câu trả lời",
            "detail": "Chụp hoặc lưu tin nhắn đồng ý kèm ngày, đặt cạnh bảng nguồn của bài đăng."
          },
          {
            "label": "Gỡ khi được yêu cầu",
            "detail": "Nếu ai đó rút lại, gỡ khỏi những nơi bạn kiểm soát và báo lại cho họ."
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Áp phích tuyển dụng cần ảnh người thật",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn có ảnh nhóm ba đồng nghiệp ở buổi tập huấn, còn hai giờ tới hạn gửi in. Một người trong ảnh đang nghỉ phép.",
            "choices": [
              {
                "label": "In luôn vì cả nhóm đã thấy ảnh trong nhóm chat",
                "next": "bad_print"
              },
              {
                "label": "Nhắn riêng từng người, kể cả người đang nghỉ phép, nói rõ dùng ở đâu và bao lâu",
                "next": "s2"
              }
            ]
          },
          "bad_print": {
            "text": "Người nghỉ phép quay lại, thấy mình trên áp phích khắp công ty và xin gỡ. Áp phích phải in lại.",
            "ending": "bad"
          },
          "s2": {
            "text": "Hai người đồng ý. Người đang nghỉ phép chưa trả lời, hạn in còn 30 phút.",
            "choices": [
              {
                "label": "Dùng ảnh hai người còn lại, cắt người chưa trả lời khỏi ảnh",
                "next": "s3"
              },
              {
                "label": "Dùng AI tạo một khuôn mặt thay cho người chưa trả lời",
                "next": "bad_fake"
              }
            ]
          },
          "bad_fake": {
            "text": "Khuôn mặt giả bị nhận ra là ghép, và một khuôn mặt nhìn giống một người có thật nào đó gây thêm phản ánh. Áp phích phải thu hồi.",
            "ending": "bad"
          },
          "s3": {
            "text": "Áp phích in xong. Hai tuần sau một đồng nghiệp xin gỡ ảnh khỏi trang công ty.",
            "choices": [
              {
                "label": "Gỡ ảnh khỏi trang và báo lại khi xong",
                "next": "good"
              },
              {
                "label": "Báo rằng họ đã đồng ý nên không gỡ",
                "next": "bad_refuse"
              }
            ]
          },
          "bad_refuse": {
            "text": "Đồng nghiệp nhắn tiếp lên trưởng phòng, câu chuyện lớn hơn nhiều so với một tấm ảnh.",
            "ending": "bad"
          },
          "good": {
            "text": "Việc gỡ xong trong mười phút. Đồng nghiệp đó tiếp tục sẵn lòng giúp lần sau.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Hỏi từng người, nói rõ dùng ở đâu và bao lâu.",
          "Không bao giờ tạo hình hay lời của người thật vào việc họ chưa làm.",
          "Họ rút lại thì gỡ khỏi nơi mình kiểm soát."
        ]
      }
    ]
  },
  {
    "id": 2337,
    "slug": "ghi-chu-ai-da-dung-trong-anh-va-video",
    "title": "Chặng 46, Bài 18: Ghi chú 'có dùng AI' ở đâu và bằng lời nào",
    "subtitle": "Một dòng ngắn, đặt đúng chỗ, nói đúng mức AI tham gia: đủ để người xem không bị hiểu nhầm.",
    "duration": "8 phút",
    "difficulty": "Trung bình",
    "emoji": "🏷️",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Người xem ngày càng hay hỏi 'ảnh này thật hay AI'. Một dòng ghi chú ngắn, nói thật mức AI tham gia, giúp họ không bị hiểu nhầm và giúp bạn khỏi phải giải thích sau. Nếu phòng bạn chưa có quy ước chung, mỗi người sẽ ghi một kiểu, hoặc không ghi gì.",
    "openingQuestion": "Phòng bạn có ảnh minh hoạ do AI tạo trong bản tin gửi khách. Cách ghi nào giúp người xem hiểu đúng nhất?",
    "openingOptions": [
      "Ảnh minh hoạ do AI tạo, đã được nhân viên phòng chúng tôi duyệt",
      "Ảnh có sự hỗ trợ của công nghệ hiện đại trong quá trình thực hiện",
      "Hình ảnh: nguồn internet",
      "Ảnh do đội thiết kế phòng chúng tôi sáng tạo hoàn toàn bằng tay"
    ],
    "correctOption": 0,
    "explanation": "Dòng ghi chú tốt nói thẳng hai điều: ảnh do AI tạo và có người duyệt. 'Công nghệ hiện đại' quá mơ hồ để người xem hiểu, 'nguồn internet' nói sai về cách làm ra ảnh, còn 'sáng tạo hoàn toàn bằng tay' là khẳng định sai sự thật. Ghi chú có giá trị khi nó giúp người xem hiểu đúng.",
    "diagram": [
      {
        "label": "Xác định mức AI tham gia",
        "arrow": true
      },
      {
        "label": "Viết một dòng thẳng, dễ hiểu",
        "arrow": true
      },
      {
        "label": "Đặt cạnh ảnh hoặc cuối bài",
        "arrow": true
      },
      {
        "label": "Dùng cùng một cách ghi trong phòng"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Một phòng truyền thông dùng ảnh do AI tạo trong bản tin khách hàng, không ghi chú. Khách nhìn ảnh một khu nhà máy và hỏi ở đâu, vì nhà máy đó không tồn tại. Phòng phải giải thích và gửi bản đính chính. Đây là tình huống minh hoạ, không phải vụ việc có thật."
    },
    "quiz": [
      {
        "question": "Vì sao nên ghi chú khi ấn phẩm có phần do AI tạo?",
        "options": [
          "Để người xem biết ảnh hoặc video có phần do máy tạo",
          "Để né trách nhiệm nếu ảnh có lỗi, vì lỗi đó là của AI chứ không phải của mình",
          "Vì công cụ AI bắt buộc người dùng phải ghi dòng chữ đó ở mọi ảnh",
          "Để bài đăng trông hiện đại và được hệ thống đẩy lên nhiều người hơn"
        ],
        "correct": 0,
        "explanation": "Mục đích của ghi chú là để người xem hiểu đúng ảnh được làm ra thế nào. Nó không chuyển lỗi sang AI, không phải mọi công cụ đều bắt buộc ghi, và không có gì đảm bảo nó giúp bài đăng được đẩy nhiều hơn."
      },
      {
        "question": "Dòng ghi chú nào rõ ràng và thật nhất cho một ảnh do AI tạo được nhân viên duyệt?",
        "options": [
          "Ảnh minh hoạ do AI tạo, đã được nhân viên phòng chúng tôi duyệt",
          "Ảnh có sự hỗ trợ của công nghệ hiện đại",
          "Ảnh này hoàn toàn do đội thiết kế chúng tôi sáng tạo",
          "Hình ảnh: lấy từ nguồn trên internet"
        ],
        "correct": 0,
        "explanation": "Dòng đúng nói cả hai điều người xem cần biết. 'Công nghệ hiện đại' không nói gì, 'hoàn toàn do đội thiết kế sáng tạo' nói sai, còn 'nguồn internet' không nói ảnh đã được tạo bằng AI."
      },
      {
        "question": "Nên đặt ghi chú có dùng AI ở đâu?",
        "options": [
          "Gần ảnh hoặc ở cuối bài, dễ thấy",
          "Trong phần điều khoản cuối trang web mà ít ai kéo xuống đọc tới",
          "Trong tên tệp ảnh, vì người xem tải về sẽ thấy khi lưu",
          "Chỉ ghi trong email nội bộ gửi sếp, không cần ghi trên ấn phẩm"
        ],
        "correct": 0,
        "explanation": "Ghi chú chỉ có tác dụng khi người xem nhìn thấy nó cùng lúc với ảnh. Điều khoản cuối trang, tên tệp hay email nội bộ đều nằm ngoài tầm mắt người xem."
      },
      {
        "question": "Ảnh do nhân viên chụp, AI chỉ chỉnh sáng tối, sản phẩm giữ nguyên. Có cần ghi chú như ảnh do AI tạo không?",
        "options": [
          "Tuỳ quy ước phòng, nhưng nên phân biệt ảnh tạo mới với ảnh chỉnh nhẹ",
          "Phải ghi giống hệt nhau cho cả việc AI chỉ làm sáng ảnh lẫn việc tạo cả bức ảnh",
          "Không bao giờ phải ghi nếu ảnh gốc do chính mình chụp",
          "Chỉ ghi khi sếp nhắc, còn không thì thôi"
        ],
        "correct": 0,
        "explanation": "Quy ước chung của phòng nên phân biệt mức tham gia của AI: tạo mới khác chỉnh nhẹ. Ghi như nhau cho mọi mức làm người xem không còn phân biệt được, còn 'không bao giờ' hay 'chỉ khi sếp nhắc' thì bỏ người xem ra khỏi câu chuyện."
      },
      {
        "question": "Video ngắn có giọng đọc do AI tổng hợp, nghe giống một đồng nghiệp. Cần làm gì?",
        "options": [
          "Xin phép đồng nghiệp đó và ghi rõ là giọng tổng hợp",
          "Không cần gì, giọng máy thì không thuộc về ai",
          "Chỉ ghi 'có dùng AI' ở cuối video nhưng không nói rõ phần nào",
          "Dùng thoải mái nếu đồng nghiệp không bao giờ xem video này"
        ],
        "correct": 0,
        "explanation": "Giọng nghe giống một người thật thì cần xin phép người đó, và ghi chú nói rõ đó là giọng tổng hợp. 'Giọng máy không thuộc về ai' là sai khi nó mô phỏng một người cụ thể, và việc người đó có xem hay không không thay đổi điều gì."
      }
    ],
    "keyTakeaways": [
      "Ghi chú giúp người xem hiểu đúng ảnh, video được làm ra thế nào.",
      "Nói thẳng mức AI tham gia: tạo mới hay chỉ chỉnh nhẹ.",
      "Đặt cạnh ảnh hoặc cuối bài, nơi người xem nhìn thấy.",
      "Cả phòng dùng cùng một cách ghi.",
      "Không ghi chú nào thay được việc xin phép người thật."
    ],
    "practicePrompt": {
      "question": "Phòng bạn chưa có quy ước ghi chú AI. Bước đầu tiên hợp lý là gì?",
      "options": [
        "Họp ngắn chốt 2-3 mẫu câu theo mức AI tham gia và áp dụng chung",
        "Để mỗi người tự quyết vì ai cũng hiểu cách ghi phù hợp",
        "Chỉ ghi khi khách hỏi tới, còn lại coi như không cần",
        "Sao chép câu ghi chú của một công ty khác về dùng lại cho nhanh gọn"
      ],
      "correct": 0,
      "explanation": "Một quy ước ngắn theo mức AI tham gia giúp mọi ấn phẩm của phòng nhất quán. Để mỗi người tự quyết thì cách ghi lệch nhau, chỉ ghi khi hỏi thì người xem bị hiểu nhầm trước, còn chép công ty khác thì mức AI tham gia có thể không giống phòng bạn."
    },
    "summary": {
      "keyIdea": "Ghi chú AI là một dòng thật, dễ thấy, nói đúng mức AI tham gia.",
      "formula": "Mức AI tham gia → mẫu câu tương ứng → đặt gần ảnh hoặc cuối bài.",
      "commonMistake": "Ghi chú mơ hồ ('công nghệ hiện đại') hoặc ghi sai sự thật.",
      "action": "Soạn 2 mẫu câu: một cho ảnh tạo mới, một cho ảnh chỉnh nhẹ."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Lấy ba ấn phẩm gần nhất của phòng bạn có dùng AI. Với mỗi cái, viết dòng ghi chú đúng mức AI tham gia (tạo mới hay chỉnh nhẹ) và đề xuất nơi đặt. Sau đó gửi hai mẫu câu bạn soạn cho trưởng phòng để xin chốt làm quy ước.",
      "secondary": "Ghi lại ấn phẩm nào trước đây không có ghi chú nhưng cần."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bản tin gửi khách tuần này có một ảnh minh hoạ do AI tạo và một ảnh sản phẩm thật. Nhìn bằng mắt thường, người xem khó phân biệt. Một dòng ghi chú ngắn sẽ giúp họ khỏi nhầm."
      },
      {
        "type": "feynman",
        "title": "Ghi chú AI đơn giản hơn bạn nghĩ",
        "intro": "Hình dung nhãn trên hộp bánh: 'có hương liệu nhân tạo'. Nhãn không để chê hộp bánh, mà để người mua biết trong hộp có gì. Ghi chú AI cũng là nhãn cho người xem.",
        "columns": [
          "Thành phần",
          "Nhãn trên hộp bánh",
          "Ghi chú AI"
        ],
        "rows": [
          [
            "Nói gì",
            "Trong hộp có gì",
            "AI tham gia ở phần nào"
          ],
          [
            "Đặt ở đâu",
            "Mặt ngoài hộp, dễ đọc",
            "Cạnh ảnh hoặc cuối bài"
          ],
          [
            "Nếu nói sai",
            "Người mua mất tin",
            "Người xem mất tin vào cả phòng"
          ]
        ],
        "oneLiner": "Ghi chú AI là cái nhãn: nói đúng bên trong có gì, đặt chỗ dễ thấy."
      },
      {
        "type": "heading",
        "text": "Hai mức AI tham gia, hai cách ghi"
      },
      {
        "type": "paragraph",
        "text": "AI tạo mới cả bức ảnh hoặc video khác với AI chỉ chỉnh sáng tối của ảnh do người chụp. Nếu ghi như nhau cho cả hai, người xem không còn phân biệt được. Vì vậy quy ước của phòng nên có ít nhất hai mẫu câu: một cho nội dung tạo mới, một cho nội dung chỉnh nhẹ."
      },
      {
        "type": "list",
        "items": [
          "Tạo mới: 'Ảnh minh hoạ do AI tạo, đã được nhân viên duyệt'.",
          "Chỉnh nhẹ: 'Ảnh do phòng chụp, có dùng AI chỉnh sáng'.",
          "Giọng hoặc hình giống một người: xin phép người đó trước rồi mới ghi 'giọng tổng hợp'."
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Ghi chú tốt",
          "text": "Ngắn, nói thẳng, đúng với cách làm, đặt gần ảnh."
        },
        "right": {
          "label": "Ghi chú kém",
          "text": "Mơ hồ ('công nghệ hiện đại'), sai ('hoàn toàn thủ công'), hoặc đặt nơi không ai thấy."
        }
      },
      {
        "type": "callout",
        "label": "Ghi chú không thay việc xin phép",
        "text": "Dòng 'có dùng AI' không làm cho việc giả người thật thành được phép. Với ảnh hay giọng của người thật, xin phép vẫn là việc đầu tiên."
      },
      {
        "type": "flow",
        "title": "Từ ảnh AI tới dòng ghi chú",
        "steps": [
          {
            "label": "Xác định mức tham gia",
            "detail": "Hỏi: AI tạo mới cả ảnh, hay chỉ chỉnh ảnh do người chụp?"
          },
          {
            "label": "Chọn mẫu câu",
            "detail": "Lấy mẫu câu tương ứng trong quy ước phòng, không tự chế mỗi lần."
          },
          {
            "label": "Đặt chỗ dễ thấy",
            "detail": "Cạnh ảnh, dưới video, hoặc cuối bài. Không đặt trong điều khoản hay tên tệp."
          },
          {
            "label": "Người duyệt xem lại",
            "detail": "Một đồng nghiệp đọc ghi chú cùng ấn phẩm, xem có khớp với thật không."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI gợi ý hai mẫu câu ghi chú",
        "task": "Phòng bạn cần hai mẫu câu ghi chú, một cho ảnh AI tạo mới và một cho ảnh chỉnh nhẹ. Lắp câu lệnh để AI gợi ý mẫu bạn chọn lại.",
        "parts": [
          {
            "id": "ctx",
            "label": "Bối cảnh",
            "options": [
              {
                "text": "Viết ghi chú AI.",
                "feedback": "AI không biết việc của bạn nên viết câu chung chung, có thể sai mức tham gia."
              },
              {
                "text": "Phòng truyền thông nội bộ dùng AI để tạo ảnh minh hoạ cho bản tin khách và đôi khi chỉnh sáng ảnh chụp.",
                "good": true,
                "feedback": "Nêu rõ hai mức AI tham gia để gợi ý bám đúng việc thật."
              }
            ]
          },
          {
            "id": "task",
            "label": "Việc cần làm",
            "options": [
              {
                "text": "Viết thật hay để khách ấn tượng.",
                "feedback": "'Hay và ấn tượng' kéo AI về phía khoe công nghệ, dễ sai sự thật."
              },
              {
                "text": "Gợi ý 3 mẫu câu cho mỗi trường hợp, trung thực, dưới 15 chữ, không khoe khoang.",
                "good": true,
                "feedback": "Số lượng và giới hạn rõ cho bạn thứ để chọn."
              }
            ]
          },
          {
            "id": "fmt",
            "label": "Khuôn dạng",
            "options": [
              {
                "text": "Viết một đoạn văn dài giải thích vì sao phải ghi chú.",
                "feedback": "Đoạn giải thích không phải mẫu câu dùng được."
              },
              {
                "text": "Trả về hai nhóm có tiêu đề 'Tạo mới' và 'Chỉnh nhẹ', mỗi mẫu một dòng.",
                "good": true,
                "feedback": "Hai nhóm rõ để bạn đặt thẳng vào quy ước phòng."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "ctx",
              "task",
              "fmt"
            ],
            "text": "Tạo mới:\n- Ảnh minh hoạ do AI tạo, đã được nhân viên duyệt.\n- Hình do AI tạo, có người kiểm.\n- Ảnh AI tạo, nhân viên phòng duyệt.\nChỉnh nhẹ:\n- Ảnh do phòng chụp, có dùng AI chỉnh sáng.\n- Ảnh chụp thật, AI chỉ chỉnh ánh sáng.\n- Ảnh gốc của phòng, chỉnh sáng bằng AI."
          },
          {
            "requires": [
              "ctx"
            ],
            "text": "Ghi chú AI giúp người xem hiểu đúng và tạo niềm tin. Bạn nên ghi chú rõ ràng ở mọi ấn phẩm vì xu hướng minh bạch đang ngày càng quan trọng...\n(Có bối cảnh nhưng không có mẫu câu dùng được, AI chỉ viết bài giảng.)"
          },
          {
            "text": "Ảnh được tạo nhờ công nghệ tiên tiến nhất, ứng dụng trí tuệ nhân tạo thế hệ mới.\n(Khoe khoang, mơ hồ, không nói thật mức tham gia của AI.)"
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Bản tin khách hàng lúc 3 giờ chiều",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bản tin gửi khách có ảnh nhà máy do AI tạo, nhìn rất thật. Bạn định gửi lúc 4 giờ.",
            "choices": [
              {
                "label": "Gửi luôn vì ảnh trông thật thì không cần ghi chú",
                "next": "bad_nonote"
              },
              {
                "label": "Thêm dòng ghi chú 'Ảnh minh hoạ do AI tạo' ngay dưới ảnh",
                "next": "s2"
              }
            ]
          },
          "bad_nonote": {
            "text": "Một khách hỏi nhà máy đó ở đâu vì muốn đến thăm. Bạn phải xin lỗi và gửi bản đính chính.",
            "ending": "bad"
          },
          "s2": {
            "text": "Đồng nghiệp đề nghị đổi dòng ghi chú thành 'Ảnh thực hiện bằng công nghệ hiện đại' cho gọn.",
            "choices": [
              {
                "label": "Đồng ý vì nghe chuyên nghiệp hơn",
                "next": "bad_vague"
              },
              {
                "label": "Giữ câu thẳng 'do AI tạo' vì đó là điều người xem cần biết",
                "next": "s3"
              }
            ]
          },
          "bad_vague": {
            "text": "Khách vẫn không phân biệt được ảnh thật hay ảnh minh hoạ, và vẫn hỏi như trước.",
            "ending": "bad"
          },
          "s3": {
            "text": "Trưởng phòng hỏi có nên ghi như nhau cho cả ảnh sản phẩm thật chỉ chỉnh sáng không.",
            "choices": [
              {
                "label": "Đề nghị hai mẫu câu: 'do AI tạo' và 'chỉnh sáng bằng AI', rồi chốt làm quy ước",
                "next": "good"
              },
              {
                "label": "Đề nghị bỏ hết ghi chú để bản tin gọn",
                "next": "bad_drop"
              }
            ]
          },
          "bad_drop": {
            "text": "Không có quy ước, mỗi người lại tự ghi một kiểu và bản tin sau lại lộn xộn.",
            "ending": "bad"
          },
          "good": {
            "text": "Phòng chốt hai mẫu câu. Từ bản tin sau, ai cũng ghi giống nhau.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Một dòng thẳng, đặt gần ảnh, nói đúng mức AI tham gia.",
          "Cả phòng dùng chung hai hoặc ba mẫu câu.",
          "Ghi chú không thay được việc xin phép người thật."
        ]
      }
    ]
  },
  {
    "id": 2338,
    "slug": "cuoc-kiem-tra-truoc-khi-dang-mot-ban-thiet-ke",
    "title": "Chặng 46, Bài 19: Danh sách kiểm trước khi đăng bản thiết kế",
    "subtitle": "Sáu câu hỏi ngắn, hỏi theo thứ tự, bắt được phần lớn lỗi trước khi người ngoài nhìn thấy.",
    "duration": "8 phút",
    "difficulty": "Trung bình",
    "emoji": "✅",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "AI dựng bản thiết kế rất nhanh, nhưng chữ sai, số bịa, logo lệch màu hay ảnh người chưa xin phép thì nó không tự báo. Lỗi nhỏ ở bản thiết kế đăng công khai thường bị người ngoài thấy trước chính bạn. Một danh sách sáu câu, dùng mỗi lần, rẻ hơn rất nhiều so với một lần đính chính.",
    "openingQuestion": "AI vừa dựng xong banner cho đợt khuyến mãi. Bạn thấy đẹp và sắp đăng. Bước kiểm nào đáng làm trước?",
    "openingOptions": [
      "Đọc từng chữ và từng con số trên banner một lượt riêng",
      "Xem lại màu nền xem có hợp với mùa khuyến mãi không",
      "Hỏi AI xem banner có còn lỗi nào không rồi tin theo câu trả lời",
      "Chia sẻ thử cho vài đồng nghiệp xem có ai thích không"
    ],
    "correctOption": 0,
    "explanation": "Chữ và số là chỗ AI hay sai nhất và sai kín nhất: chữ lệch dấu, số do AI tự điền. Nên đọc riêng từng chữ, từng số, đừng nhìn tổng thể rồi thấy đẹp là xong. Màu nền là chuyện thẩm mỹ, hỏi lại chính AI có thể nhận đã đúng cái nó vừa làm sai, và 'có ai thích không' không phải là kiểm lỗi.",
    "diagram": [
      {
        "label": "Chữ và số",
        "arrow": true
      },
      {
        "label": "Logo và màu thương hiệu",
        "arrow": true
      },
      {
        "label": "Bản quyền ảnh, nhạc và người thật",
        "arrow": true
      },
      {
        "label": "Ghi chú AI và tính nhất quán"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Một phòng marketing đăng banner khuyến mãi do AI dựng, trên đó AI tự điền 'giảm 40%' trong khi chương trình chỉ giảm 30%. Khách đến cửa hàng đòi mức giảm 40% và cửa hàng phải xử lý từng trường hợp. Đây là tình huống minh hoạ, không phải vụ việc có thật."
    },
    "quiz": [
      {
        "question": "Cách kiểm chữ và số trên bản thiết kế do AI dựng nào đúng nhất?",
        "options": [
          "Đọc từng chữ, từng số trong ảnh một lượt riêng, không nhìn tổng thể",
          "Liếc tổng thể thấy đẹp là đủ vì chữ AI viết thường đúng",
          "Nhờ chính AI đọc lại rồi tin nếu nó nói không có lỗi",
          "Chỉ kiểm chữ lớn ở tiêu đề, chữ nhỏ thì bỏ qua"
        ],
        "correct": 0,
        "explanation": "Chữ và số sai thường chỉ lộ ra khi đọc từng chữ. Liếc tổng thể bỏ sót lỗi dấu và số lạ, nhờ AI đọc lại có thể nhận cái sai của nó là đúng, còn chữ nhỏ (điều kiện khuyến mãi, hạn dùng) lại hay là chỗ lỗi gây hậu quả."
      },
      {
        "question": "Logo của công ty trong bản thiết kế nên được kiểm bằng cách nào?",
        "options": [
          "So với tệp logo gốc của công ty",
          "Nhìn giống logo là được, màu lệch một chút cũng không sao",
          "Nhờ AI vẽ lại logo cho sắc nét hơn bản gốc rồi dùng bản mới",
          "Kiểm nếu khách hàng phàn nàn, còn trước đó thì không cần"
        ],
        "correct": 0,
        "explanation": "Logo phải khớp tệp gốc về hình, màu và tỉ lệ. 'Giống là được' làm logo lệch dần qua các lần dùng, AI vẽ lại thường không giống bản gốc, và đợi khách phàn nàn thì bản sai đã đăng."
      },
      {
        "question": "AI tự điền vào banner con số 'tăng 35%' mà bạn chưa từng cung cấp. Bạn nên làm gì?",
        "options": [
          "Đối chiếu với báo cáo gốc; không có nguồn thì bỏ số đó",
          "Giữ lại vì con số tròn và trông thuyết phục người xem",
          "Giữ con số nhưng đổi thành 'tăng khoảng 35%' cho đỡ chắc chắn hơn",
          "Đổi sang con số khác bằng cách hỏi lại AI"
        ],
        "correct": 0,
        "explanation": "Con số không có nguồn là con số AI bịa, và thêm chữ 'khoảng' không biến nó thành thật. Hỏi lại AI chỉ cho một con số khác cũng không có nguồn. Số trên ấn phẩm phải truy ra được báo cáo gốc."
      },
      {
        "question": "Ba ấn phẩm của cùng đợt dùng ba màu xanh khác nhau và hai kiểu chữ. Bạn nên làm gì?",
        "options": [
          "Đối chiếu với bộ chuẩn thương hiệu: màu, phông chữ, cách đặt logo",
          "Để nguyên vì mỗi ấn phẩm có phong cách riêng thì người xem thấy phong phú hơn",
          "Chỉnh lại cùng màu nhưng phông chữ thì để AI tự chọn",
          "Chỉ kiểm màu, còn phông chữ người xem không để ý"
        ],
        "correct": 0,
        "explanation": "Một đợt ấn phẩm phải nhìn ra là của cùng một công ty: màu, phông chữ, vị trí logo theo bộ chuẩn. Để phong cách tự do làm thương hiệu loãng, để AI chọn phông thì mỗi lần một kiểu, còn phông chữ người xem để ý nhiều hơn bạn tưởng."
      },
      {
        "question": "Bản thiết kế có ảnh người thật và nhạc nền. Trước khi đăng, bạn cần kiểm gì?",
        "options": [
          "Đã có ghi chép nguồn, điều kiện dùng và lời đồng ý cho từng thứ",
          "Chỉ cần ghi chép nguồn ảnh; nhạc và người thì đã kiểm lúc làm",
          "Hỏi các đồng nghiệp trong nhóm chat xem có ai phản đối không, im lặng là xong",
          "Không cần kiểm thêm vì đã kiểm ở lần đăng trước"
        ],
        "correct": 0,
        "explanation": "Mỗi món có điều kiện riêng, nên phải kiểm cả ba: nguồn ảnh, điều kiện nhạc, lời đồng ý của người trong ảnh. Im lặng không phải đồng ý, và lần đăng trước chỉ kiểm được những món của lần đó."
      }
    ],
    "keyTakeaways": [
      "Kiểm chữ và số bằng cách đọc riêng từng cái.",
      "Logo so với tệp gốc, màu và phông chữ so với bộ chuẩn thương hiệu.",
      "Mọi con số trên ấn phẩm phải truy ra nguồn.",
      "Ảnh, nhạc, người thật: kiểm nguồn, điều kiện, lời đồng ý.",
      "Đừng nhờ chính AI kiểm bản AI vừa làm."
    ],
    "practicePrompt": {
      "question": "Bạn chỉ còn 10 phút trước khi đăng banner. Nên bỏ qua mục nào của danh sách kiểm?",
      "options": [
        "Không bỏ mục nào; rút ngắn mỗi mục nhưng vẫn kiểm đủ sáu",
        "Bỏ kiểm bản quyền, vì ảnh này đã được duyệt ở lần trước rồi",
        "Bỏ kiểm số, vì AI dựng theo đúng nội dung đã nhập",
        "Bỏ kiểm logo, vì logo nhìn giống thật là đủ"
      ],
      "correct": 0,
      "explanation": "Thiếu thời gian thì rút ngắn từng mục chứ không bỏ hẳn mục nào. Bản quyền của lần trước không bảo đảm cho ảnh lần này, số AI dựng vẫn có thể tự thêm, và logo nhìn giống vẫn có thể lệch màu."
    },
    "summary": {
      "keyIdea": "Sáu câu hỏi theo thứ tự, dùng mỗi lần, bắt lỗi trước khi người ngoài thấy.",
      "formula": "Chữ và số → logo và màu → bản quyền → người thật → ghi chú AI → nhất quán.",
      "commonMistake": "Nhìn thấy đẹp là đăng, hoặc nhờ chính AI kiểm bản AI vừa làm.",
      "action": "In danh sách sáu câu và dán cạnh màn hình làm việc."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Lấy một bản thiết kế bạn đã làm hoặc sắp đăng. Chạy lần lượt danh sách sáu câu trong bài: chữ và số, logo và màu, bản quyền, người thật, ghi chú AI, tính nhất quán. Ghi lại mỗi mục đạt hay chưa và đã sửa gì.",
      "secondary": "Đếm xem mục nào bạn hay bỏ quên nhất để đặt lên đầu danh sách của mình."
    },
    "sections": [
      {
        "type": "lead",
        "text": "AI vừa dựng xong banner trong hai phút và nhìn rất đẹp. Bạn định đăng ngay. Nhưng cái đẹp không cho biết chữ có đúng dấu, số có thật, logo có khớp hay ảnh có phép hay không. Đó là việc của danh sách kiểm."
      },
      {
        "type": "feynman",
        "title": "Danh sách kiểm đơn giản hơn bạn nghĩ",
        "intro": "Hình dung phi công trước khi cất cánh: dù đã bay hàng nghìn giờ, họ vẫn đọc từng mục trong danh sách kiểm. Không phải vì họ không giỏi, mà vì lỗi nhỏ bị bỏ sót thì hậu quả lớn.",
        "columns": [
          "Thành phần",
          "Phi công",
          "Người làm thiết kế"
        ],
        "rows": [
          [
            "Danh sách",
            "Kiểm trước khi cất cánh",
            "Kiểm trước khi đăng"
          ],
          [
            "Vì sao dùng",
            "Lỗi nhỏ gây hậu quả lớn",
            "Lỗi chữ, số, bản quyền để lại dấu vết công khai"
          ],
          [
            "Khi gấp",
            "Vẫn đọc đủ từng mục",
            "Rút ngắn mỗi mục, không bỏ mục"
          ]
        ],
        "oneLiner": "Danh sách kiểm là thói quen của người giỏi: làm đủ mọi lần, kể cả khi gấp."
      },
      {
        "type": "heading",
        "text": "Sáu câu hỏi theo thứ tự"
      },
      {
        "type": "list",
        "items": [
          "1. Chữ và số: đọc từng chữ, đối chiếu từng số với nguồn.",
          "2. Logo và màu: so với tệp logo gốc và bộ chuẩn thương hiệu.",
          "3. Bản quyền: mỗi ảnh, nhạc, phông chữ đều đã ghi nguồn và điều kiện.",
          "4. Người thật: có lời đồng ý, không ghép hay tạo giả.",
          "5. Ghi chú AI: đúng mức tham gia, đặt chỗ dễ thấy.",
          "6. Nhất quán: cùng màu, cùng phông, cùng cách đặt logo với các ấn phẩm khác trong đợt."
        ]
      },
      {
        "type": "paragraph",
        "text": "Thứ tự có lý do: chữ và số sai thì mọi thứ còn lại vô nghĩa, nên kiểm trước. Bản quyền và người thật có thể buộc bạn thay ảnh, nên kiểm trước khi chỉnh màu hay căn lề."
      },
      {
        "type": "comparison",
        "left": {
          "label": "Kiểm đúng cách",
          "text": "Đọc riêng từng chữ, so logo với tệp gốc, truy mọi số về nguồn, xem bảng nguồn ảnh và nhạc."
        },
        "right": {
          "label": "Kiểm cho có",
          "text": "Nhìn tổng thể thấy đẹp, hỏi chính AI 'còn lỗi không', hoặc kiểm một lần rồi dùng mãi."
        }
      },
      {
        "type": "callout",
        "label": "Đừng nhờ AI kiểm AI",
        "text": "AI có thể xác nhận chính điều nó vừa làm sai. Nhờ AI gợi ý thêm mục kiểm thì được, nhưng người đọc và đối chiếu vẫn là bạn."
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI soạn danh sách kiểm cho phòng",
        "task": "Phòng bạn hay đăng banner và slide. Lắp câu lệnh để AI soạn khung danh sách kiểm, còn bạn tự điền thông tin thật.",
        "parts": [
          {
            "id": "ctx",
            "label": "Bối cảnh",
            "options": [
              {
                "text": "Soạn danh sách kiểm.",
                "feedback": "AI không biết bạn làm ấn phẩm gì nên soạn một danh sách chung chung."
              },
              {
                "text": "Phòng marketing đăng banner, slide và video ngắn lên trang công khai của công ty; có dùng AI để dựng và có ảnh người thật.",
                "good": true,
                "feedback": "Nêu đủ loại ấn phẩm và điểm rủi ro để AI đặt mục kiểm đúng chỗ."
              }
            ]
          },
          {
            "id": "task",
            "label": "Việc cần làm",
            "options": [
              {
                "text": "Soạn càng nhiều mục càng tốt và điền luôn mã màu, phông chữ của công ty.",
                "feedback": "AI sẽ bịa mã màu và phông chữ, những thứ chỉ bộ chuẩn thương hiệu mới biết."
              },
              {
                "text": "Soạn đúng 6 mục, mỗi mục một câu hỏi có thể trả lời có hoặc không, không tự điền thông tin thương hiệu của công ty.",
                "good": true,
                "feedback": "Sáu câu có/không và không bịa thông tin thương hiệu là khung dùng được."
              }
            ]
          },
          {
            "id": "fmt",
            "label": "Khuôn dạng",
            "options": [
              {
                "text": "Viết thành một đoạn văn liền.",
                "feedback": "Đoạn văn không tích được, khó dùng khi kiểm."
              },
              {
                "text": "Trả về danh sách đánh số, có ô [ ] đầu mỗi dòng để tôi tích.",
                "good": true,
                "feedback": "Ô tích giúp bạn dùng thẳng khi kiểm."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "ctx",
              "task",
              "fmt"
            ],
            "text": "1. [ ] Mọi chữ và số đã được đọc riêng và đối chiếu với nguồn?\n2. [ ] Logo khớp tệp gốc của công ty?\n3. [ ] Màu và phông chữ khớp bộ chuẩn thương hiệu?\n4. [ ] Mọi ảnh, nhạc đã có nguồn và điều kiện được ghi lại?\n5. [ ] Người thật trong ảnh, video đã đồng ý?\n6. [ ] Ghi chú AI đã có, đúng mức tham gia, đặt dễ thấy?"
          },
          {
            "requires": [
              "ctx"
            ],
            "text": "Danh sách kiểm:\n- Màu chính phải là #1E40AF, phông chữ phải là Roboto.\n- Logo phải rộng 240 pixel.\n(AI tự bịa mã màu, phông chữ và kích thước vì không biết bộ chuẩn của công ty bạn.)"
          },
          {
            "text": "Hãy kiểm tra kỹ mọi thứ trước khi đăng bài, bao gồm nội dung, hình ảnh và sự phù hợp với thương hiệu, nhằm đảm bảo chất lượng tốt nhất.\n(Một đoạn chung chung, không có mục nào để kiểm.)"
          }
        ]
      },
      {
        "type": "flow",
        "title": "Đi qua danh sách kiểm",
        "steps": [
          {
            "label": "Chữ và số",
            "detail": "Đọc từng chữ, đối chiếu từng số với nguồn. Nếu không có nguồn thì bỏ số đó."
          },
          {
            "label": "Logo và màu",
            "detail": "So logo với tệp gốc, màu và phông chữ với bộ chuẩn thương hiệu."
          },
          {
            "label": "Bản quyền",
            "detail": "Mỗi ảnh, nhạc, phông chữ có dòng trong bảng nguồn và điều kiện hợp với việc đăng công khai."
          },
          {
            "label": "Người thật",
            "detail": "Mỗi khuôn mặt, giọng đều có lời đồng ý; không có ảnh hay giọng tạo giả."
          },
          {
            "label": "Ghi chú AI và nhất quán",
            "detail": "Ghi chú đúng mức AI tham gia và ấn phẩm khớp cách trình bày của cả đợt."
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Banner khuyến mãi lúc 11 giờ",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "AI dựng xong banner 'Giảm 40% - hết hạn 30/11'. Chương trình thật giảm 30% tới 30/11. Còn 20 phút tới giờ đăng.",
            "choices": [
              {
                "label": "Đăng luôn vì banner đã đẹp và đúng ngày",
                "next": "bad_post"
              },
              {
                "label": "Đọc từng chữ, số, đối chiếu với thông báo chương trình",
                "next": "s2"
              }
            ]
          },
          "bad_post": {
            "text": "Khách tới cửa hàng đòi giảm 40% theo banner. Cửa hàng phải xử lý từng trường hợp và công ty phải đăng đính chính.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bạn phát hiện 40% sai, sửa thành 30%. Bạn chợt nhớ banner có logo, một ảnh kho và nhạc nền cho bản video.",
            "choices": [
              {
                "label": "Đối chiếu logo với tệp gốc, xem bảng nguồn ảnh và nhạc",
                "next": "s3"
              },
              {
                "label": "Đăng ngay vì số đã đúng, còn lại chắc ổn",
                "next": "bad_half"
              }
            ]
          },
          "bad_half": {
            "text": "Bài đăng lên, nhưng bài nhạc nền không có điều kiện dùng công khai, video bị gỡ giữa chiến dịch.",
            "ending": "bad"
          },
          "s3": {
            "text": "Logo trên banner lệch màu xanh so với bản gốc. Ảnh kho có ghi điều kiện ghi tên tác giả.",
            "choices": [
              {
                "label": "Thay logo bằng tệp gốc, thêm dòng ghi tên tác giả, rồi đăng",
                "next": "good"
              },
              {
                "label": "Để logo vì người xem không phân biệt được hai màu xanh",
                "next": "bad_logo"
              }
            ]
          },
          "bad_logo": {
            "text": "Bộ phận thương hiệu yêu cầu gỡ banner vì logo sai màu và mọi ấn phẩm trong đợt bị soát lại.",
            "ending": "bad"
          },
          "good": {
            "text": "Banner đăng muộn mười phút nhưng đúng số, đúng logo và có nguồn đầy đủ.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Sáu câu hỏi theo thứ tự, dùng mỗi lần đăng.",
          "Gấp thì rút ngắn từng mục, không bỏ mục nào.",
          "Đừng nhờ AI kiểm chính bản AI vừa làm."
        ]
      }
    ]
  },
  {
    "id": 2339,
    "slug": "bai-tong-ket-bo-an-pham-cho-mot-su-kien-nho",
    "title": "Chặng 46, Bài 20: Tổng kết: bộ ấn phẩm cho một sự kiện nhỏ của phòng",
    "subtitle": "Một banner, năm slide và một video cùng một diện mạo, đã kiểm nguồn và người thật.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "🎬",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Sự kiện nhỏ của phòng thường cần cả banner, bộ slide và video ngắn trong cùng một tuần. Làm từng món riêng với AI thì nhanh, nhưng ghép lại thì mỗi món một màu, một giọng và không ai nhớ nguồn của món nào. Bài này ghép mọi thứ của chặng vào một quy trình làm bộ ấn phẩm.",
    "openingQuestion": "Phòng bạn sắp tổ chức buổi chia sẻ nội bộ và cần banner, 5 slide, video 30 giây. Nên bắt đầu bằng việc gì?",
    "openingOptions": [
      "Chốt một bộ chuẩn gồm màu, phông chữ, logo và giọng văn, rồi mới tạo từng món",
      "Tạo ba món riêng theo gợi ý của AI rồi chỉnh cho giống nhau sau",
      "Làm video trước vì video tốn công nhất, các món khác làm sau",
      "Tạo banner đẹp nhất rồi chép nguyên banner vào slide và video"
    ],
    "correctOption": 0,
    "explanation": "Có một bộ chuẩn trước khi làm khiến cả ba món cùng một diện mạo từ đầu. Tạo riêng rồi chỉnh sau tốn công gấp đôi và vẫn lệch; làm video trước không liên quan đến nhất quán; còn chép nguyên banner vào slide và video thì mỗi khung hình đều lặp một thiết kế thay vì cùng một bộ nhận diện.",
    "diagram": [
      {
        "label": "Chốt bộ chuẩn thương hiệu",
        "arrow": true
      },
      {
        "label": "Làm banner, slide, video theo bộ chuẩn",
        "arrow": true
      },
      {
        "label": "Lập bảng nguồn ảnh, nhạc, người thật",
        "arrow": true
      },
      {
        "label": "Chạy danh sách kiểm rồi đăng"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Một phòng đào tạo làm bộ ấn phẩm cho buổi chia sẻ nội bộ: banner, năm slide, video 30 giây. Nhờ chốt bộ chuẩn và bảng nguồn từ đầu, khi sếp hỏi ảnh nền lấy ở đâu và ai đồng ý cho quay, phòng trả lời trong một phút. Đây là tình huống minh hoạ, không phải vụ việc có thật."
    },
    "quiz": [
      {
        "question": "Bộ ấn phẩm gồm banner, 5 slide và video. Bước đầu tiên hợp lý là gì?",
        "options": [
          "Chốt trước một bộ chuẩn: màu, phông chữ, logo, giọng văn, rồi mới tạo từng món",
          "Tạo ba món riêng theo gợi ý của AI rồi chỉnh cho giống nhau sau",
          "Làm video trước vì video tốn công nhất, các món còn lại làm sau",
          "Tạo banner đẹp nhất rồi chép nguyên vào slide và video"
        ],
        "correct": 0,
        "explanation": "Bộ chuẩn đặt trước giúp cả ba món cùng một diện mạo ngay từ đầu. Chỉnh sau tốn công mà vẫn lệch, thứ tự theo độ tốn công không giúp nhất quán, còn chép nguyên banner vào slide làm slide và video mất đặc thù của mình."
      },
      {
        "question": "Làm xong bộ ấn phẩm, cách kiểm bản quyền nào đúng?",
        "options": [
          "Lập bảng nguồn cho mọi ảnh, nhạc, phông chữ",
          "Kiểm ảnh thôi, còn nhạc và phông chữ thì mặc định đã dùng được",
          "Nhờ AI cam đoan mọi thứ đã được phép dùng rồi lưu câu trả lời đó",
          "Chỉ kiểm khi bộ ấn phẩm đăng ra ngoài, dùng nội bộ thì bỏ qua"
        ],
        "correct": 0,
        "explanation": "Mỗi ảnh, nhạc, phông chữ đều có điều kiện riêng nên phải có bảng nguồn. Nhạc và phông chữ không mặc định dùng được, lời cam đoan của AI không phải giấy phép, và dùng nội bộ vẫn có thể bị chuyển ra ngoài."
      },
      {
        "question": "Video 30 giây có người thật phát biểu. Cần có gì trước khi dùng?",
        "options": [
          "Lời đồng ý của từng người xuất hiện và của giọng được dùng",
          "Chỉ cần lời đồng ý của trưởng phòng vì sự kiện do phòng tổ chức",
          "Đủ khi người đó không phản đối lúc được quay trực tiếp",
          "Dùng lại lời đồng ý lần trước cho bài đăng cũ vì cùng một người"
        ],
        "correct": 0,
        "explanation": "Mỗi người xuất hiện hoặc có giọng trong video cần tự đồng ý cho việc dùng này. Trưởng phòng không đồng ý thay, không phản đối lúc quay không phải đồng ý, và lời đồng ý cũ chỉ áp cho phạm vi lúc đó."
      },
      {
        "question": "Năm slide có số liệu lấy từ báo cáo. Cách kiểm nào đúng?",
        "options": [
          "Mỗi số trên slide ghi được nguồn và đối chiếu được với báo cáo gốc",
          "AI vừa dựng xong slide nên số đã khớp với báo cáo, chỉ kiểm phần chữ",
          "Chỉ kiểm số ở slide đầu, các slide sau AI dựng theo cùng mẫu nên giống",
          "Làm tròn hết số tới hàng chục cho gọn, vì người xem chỉ cần ước chừng"
        ],
        "correct": 0,
        "explanation": "Mọi số trên slide đều phải truy được về báo cáo gốc, từng slide một. AI có thể tự đổi số khi dựng, kiểm slide đầu không bảo đảm các slide sau, còn làm tròn hết số làm mất độ chính xác mà báo cáo cần."
      },
      {
        "question": "Ghi chú 'có dùng AI' nên thể hiện thế nào trong cả bộ ấn phẩm?",
        "options": [
          "Dùng cùng một cách ghi ở cả banner, slide và video theo quy ước phòng",
          "Chỉ ghi ở banner vì đó là thứ người ta thấy đầu tiên",
          "Ghi mỗi món một kiểu cho tự nhiên và đỡ lặp lại",
          "Ghi thật chi tiết cả tên từng câu lệnh đã dùng, dưới mọi ấn phẩm"
        ],
        "correct": 0,
        "explanation": "Cùng một cách ghi theo quy ước phòng giúp người xem hiểu đúng ở mọi món. Chỉ ghi ở banner bỏ sót slide và video, mỗi món một kiểu làm lộn xộn, còn ghi cả câu lệnh thì quá dài và không giúp người xem hiểu thêm."
      }
    ],
    "keyTakeaways": [
      "Chốt bộ chuẩn thương hiệu trước khi tạo từng món.",
      "Một bảng nguồn chung cho ảnh, nhạc, phông chữ của cả bộ.",
      "Mỗi người thật xuất hiện đều có lời đồng ý riêng.",
      "Số liệu trên slide truy được về báo cáo gốc.",
      "Chạy danh sách kiểm sáu câu trước khi đăng từng món."
    ],
    "practicePrompt": {
      "question": "Video đã xong, còn 15 phút trước giờ đăng. Bạn chưa có bảng nguồn cho bài nhạc nền. Nên làm gì?",
      "options": [
        "Tìm nguồn và điều kiện bài nhạc, nếu không rõ thì thay nhạc có nguồn rõ",
        "Đăng luôn, vì video đã qua kiểm chữ và số",
        "Hỏi AI bài nhạc có dùng được không rồi đăng theo trả lời",
        "Hạ âm lượng nhạc xuống thật nhỏ để khỏi ai để ý"
      ],
      "correct": 0,
      "explanation": "Nhạc không rõ nguồn thì thay bằng nhạc có nguồn rõ, việc đó mất vài phút. Kiểm chữ và số không thay được kiểm bản quyền, AI không cấp phép, và hạ âm lượng không đổi điều kiện dùng."
    },
    "summary": {
      "keyIdea": "Một bộ chuẩn đi trước, một bảng nguồn đi theo, một danh sách kiểm đi cuối.",
      "formula": "Bộ chuẩn → làm ba món → bảng nguồn và đồng ý → danh sách kiểm → đăng.",
      "commonMistake": "Làm từng món riêng rồi mới nhớ tới nguồn và người thật.",
      "action": "Lập sẵn thư mục chung có bộ chuẩn và bảng nguồn cho phòng."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn một sự kiện nhỏ sắp tới của phòng. Viết vào một trang: màu, phông chữ, logo, giọng văn sẽ dùng, và danh sách ảnh, nhạc, người thật dự kiến xuất hiện. Gửi cho một đồng nghiệp xem có đủ để làm cả ba món không.",
      "secondary": "Gạch chân món nào chưa có nguồn hoặc chưa có lời đồng ý."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Tuần sau phòng bạn có buổi chia sẻ nội bộ. Sếp nhờ một banner, năm slide và một video ngắn. Có AI, bạn làm cả ba trong vài giờ. Câu hỏi là làm sao để ba món ra cùng một bộ mặt, và biết mỗi ảnh, mỗi giọng ở đâu ra."
      },
      {
        "type": "feynman",
        "title": "Bộ ấn phẩm đơn giản hơn bạn nghĩ",
        "intro": "Hình dung một cửa hàng: biển hiệu, thực đơn và đồng phục nhân viên đều cùng một màu, cùng một kiểu chữ. Nhìn vào là biết của cùng một nơi. Bộ ấn phẩm của bạn cũng vậy.",
        "columns": [
          "Thành phần",
          "Cửa hàng",
          "Bộ ấn phẩm"
        ],
        "rows": [
          [
            "Diện mạo chung",
            "Màu và chữ của biển hiệu",
            "Bộ chuẩn: màu, phông chữ, logo"
          ],
          [
            "Giấy tờ nguồn gốc",
            "Hoá đơn nguyên liệu",
            "Bảng nguồn ảnh, nhạc, phông chữ"
          ],
          [
            "Người thật",
            "Nhân viên đồng ý mặc đồng phục",
            "Người đồng ý xuất hiện trong ảnh, video"
          ]
        ],
        "oneLiner": "Bộ ấn phẩm như một cửa hàng: cùng một diện mạo và giấy tờ nguồn gốc rõ ràng."
      },
      {
        "type": "heading",
        "text": "Bốn việc theo đúng thứ tự"
      },
      {
        "type": "list",
        "items": [
          "Chốt bộ chuẩn: màu, phông chữ, logo, giọng văn, mẫu ghi chú AI.",
          "Làm banner, slide, video theo đúng bộ chuẩn.",
          "Lập bảng nguồn và lời đồng ý: mỗi ảnh, nhạc, phông chữ, mỗi người thật một dòng.",
          "Chạy danh sách kiểm sáu câu cho từng món trước khi đăng."
        ]
      },
      {
        "type": "paragraph",
        "text": "Thứ tự này tránh hai lỗi hay gặp: làm xong mới thấy ba món khác nhau, và làm xong mới thấy không có ai nhớ nguồn. Cả hai đều rẻ khi xử lý ở đầu và tốn kém ở cuối."
      },
      {
        "type": "comparison",
        "left": {
          "label": "Làm theo quy trình",
          "text": "Bộ chuẩn trước, bảng nguồn song song, danh sách kiểm cuối. Ba món cùng diện mạo, nguồn rõ."
        },
        "right": {
          "label": "Làm rời rạc",
          "text": "Mỗi món một công cụ, một màu, nhạc lấy vội. Cuối cùng phải sửa cả ba hoặc gỡ một món."
        }
      },
      {
        "type": "callout",
        "label": "Điều còn mơ hồ",
        "text": "Nhạc, ảnh có người lạ, logo của bên khác: món nào bạn không chắc thì hỏi bộ phận pháp chế trước khi đăng."
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Soát bản tóm tắt bộ ấn phẩm do AI viết",
        "task": "Bạn nhờ AI viết bản tóm tắt gửi sếp về bộ ấn phẩm. Bạn chỉ cung cấp: một banner, năm slide, một video 30 giây; ảnh nền lấy từ thư viện cho dùng thương mại và phải ghi tên tác giả; nhạc nền chưa chọn xong. Bấm những câu AI tự thêm điều bạn chưa từng nói.",
        "segments": [
          {
            "text": "Bộ ấn phẩm gồm một banner, năm slide và một video 30 giây."
          },
          {
            "text": "Ảnh nền lấy từ thư viện cho dùng thương mại, có ghi tên tác giả ở cuối ấn phẩm."
          },
          {
            "text": "Nhạc nền đã được cấp phép đầy đủ cho đăng công khai.",
            "error": "Bạn nói nhạc nền CHƯA chọn xong. AI tự khẳng định nhạc đã cấp phép, một điều chưa ai kiểm."
          },
          {
            "text": "Tất cả người xuất hiện trong video đều đã ký giấy đồng ý.",
            "error": "Bạn chưa hề cung cấp thông tin về lời đồng ý của ai. AI tự bịa ra việc đã ký giấy."
          },
          {
            "text": "Ghi chú 'có dùng AI' được đặt cạnh ảnh theo quy ước phòng."
          },
          {
            "text": "Bộ ấn phẩm dự kiến đăng ngày 14/12.",
            "error": "Bạn không nhắc ngày đăng. AI tự điền một ngày cụ thể có thể sai."
          }
        ]
      },
      {
        "type": "flow",
        "title": "Từ ý tưởng tới bộ ấn phẩm đã kiểm",
        "steps": [
          {
            "label": "Bộ chuẩn",
            "detail": "Một trang ghi màu, phông chữ, logo, giọng văn, mẫu ghi chú AI. Mọi món làm theo trang này."
          },
          {
            "label": "Ba món",
            "detail": "Banner, năm slide, video 30 giây, cùng nhìn như một bộ."
          },
          {
            "label": "Bảng nguồn và đồng ý",
            "detail": "Mỗi ảnh, nhạc, phông chữ, người thật một dòng: nguồn, điều kiện, lời đồng ý."
          },
          {
            "label": "Danh sách kiểm",
            "detail": "Chạy sáu câu cho từng món: chữ và số, logo, bản quyền, người thật, ghi chú AI, nhất quán."
          },
          {
            "label": "Đăng và lưu",
            "detail": "Đăng, rồi lưu bảng nguồn cùng bộ chuẩn để lần sau dùng lại."
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Hai ngày trước buổi chia sẻ",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn cần banner, năm slide và video. Bạn có logo, một ảnh nền và ý tưởng chung. AI có thể dựng cả ba ngay hôm nay.",
            "choices": [
              {
                "label": "Nhờ AI dựng từng món riêng, món nào đẹp thì giữ",
                "next": "bad_mix"
              },
              {
                "label": "Chốt trước một trang bộ chuẩn rồi nhờ AI dựng ba món theo trang đó",
                "next": "s2"
              }
            ]
          },
          "bad_mix": {
            "text": "Banner xanh, slide cam, video tím; mỗi món một kiểu chữ. Bạn mất cả buổi chiều chỉnh lại mà vẫn lệch.",
            "ending": "bad"
          },
          "s2": {
            "text": "Ba món đã đồng bộ. Video cần giọng phát biểu của chị Hà và một bài nhạc nền.",
            "choices": [
              {
                "label": "Xin chị Hà đồng ý, chọn nhạc từ nguồn cho dùng công khai và ghi vào bảng",
                "next": "s3"
              },
              {
                "label": "Dùng luôn giọng chị Hà vì chị từng phát biểu ở buổi họp, nhạc lấy bài quen thuộc",
                "next": "bad_rights"
              }
            ]
          },
          "bad_rights": {
            "text": "Chị Hà bất ngờ khi nghe giọng mình trong video công khai và nhắn yêu cầu gỡ; bài nhạc cũng bị báo vi phạm. Video phải làm lại.",
            "ending": "bad"
          },
          "s3": {
            "text": "Bảng nguồn đã đủ. Còn một giờ, bạn đang ở bước danh sách kiểm.",
            "choices": [
              {
                "label": "Đọc từng chữ, số, so logo và màu với bộ chuẩn, kiểm ghi chú AI cho cả ba món",
                "next": "good"
              },
              {
                "label": "Kiểm banner cho kỹ, còn slide và video thì tin là giống banner",
                "next": "bad_skip"
              }
            ]
          },
          "bad_skip": {
            "text": "Slide thứ tư có con số AI tự thêm vào. Sếp hỏi nguồn số đó giữa buổi chia sẻ và bạn không trả lời được.",
            "ending": "bad"
          },
          "good": {
            "text": "Buổi chia sẻ diễn ra suôn sẻ. Khi sếp hỏi ảnh và nhạc lấy ở đâu, bạn đưa bảng nguồn ra trong một phút.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Bộ chuẩn đi trước, bảng nguồn đi theo, danh sách kiểm đi cuối.",
          "Ba món cùng một diện mạo, mỗi ảnh và mỗi người thật đều có dấu vết.",
          "Món nào mơ hồ thì hỏi pháp chế trước khi đăng."
        ]
      }
    ]
  }
];
