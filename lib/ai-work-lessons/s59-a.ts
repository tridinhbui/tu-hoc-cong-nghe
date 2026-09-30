import type { Lesson } from "../lesson-types";

// Chặng 59, bài 1-5. Giáo trình: scripts/curriculum/stage-59.json.
// Bài 3 chỉ dạy khái niệm bền (trang tĩnh / biểu mẫu / công cụ có tài khoản), không nêu tính năng hay giá của nhà cung cấp nào nên không cần nguồn chính thức.
export const S59_A_LESSONS: Lesson[] = [
  {
    "track": "personal",
    "isFundamental": false,
    "id": 2580,
    "slug": "dua-san-pham-len-mang-la-dua-di-dau-va-cho-ai-thay",
    "title": "Chặng 59, Bài 1: Đưa lên mạng nghĩa là gì: ai sẽ mở được đường dẫn của bạn",
    "subtitle": "Trang chạy ngon trên máy bạn chưa có nghĩa là người khác mở được - và khi mở được thì có thể là cả thế giới.",
    "duration": "8 phút",
    "difficulty": "Dễ",
    "emoji": "🌐",
    "whyItMatters": "Bạn đã làm được một công cụ nhỏ hoặc một trang giới thiệu, và câu hỏi tiếp theo của sếp là \"gửi anh xem thử\". Nếu không phân biệt được bản chỉ mình bạn xem, bản cả công ty xem và bản cả thế giới xem, bạn sẽ gửi một đường dẫn không ai mở được, hoặc tệ hơn, để lộ thứ chưa định cho ai thấy.",
    "openingQuestion": "Bạn làm xong trang đăng ký phòng họp trên máy mình, gửi đường dẫn bắt đầu bằng localhost cho đồng nghiệp và họ báo \"không mở được\". Lý do hợp lý nhất là gì?",
    "openingOptions": [
      "Đường dẫn đó chỉ trỏ về chính máy của người mở, không trỏ về máy bạn",
      "Đồng nghiệp chưa cài đúng phần mềm soạn trang mà bạn đã dùng để làm ra nó",
      "Đường dẫn gửi qua tin nhắn bị cắt mất vài ký tự nên không còn mở được nữa",
      "Trang của bạn quá nặng nên cần chờ thêm vài giờ rồi mới mở được trên máy khác"
    ],
    "correctOption": 0,
    "explanation": "Chữ localhost nghĩa là \"chính máy đang mở đường dẫn này\". Khi bạn mở, nó chỉ về máy bạn nên thấy trang; khi đồng nghiệp mở, nó chỉ về máy của họ, nơi không có trang nào cả. Họ không cần cài phần mềm soạn trang, vì người xem chỉ cần trình duyệt. Đường dẫn bị cắt hay trang quá nặng sẽ cho lỗi khác chứ không phải lỗi \"không tìm thấy\" ngay từ đầu. Muốn người khác mở được, trang phải nằm trên một máy luôn bật và có địa chỉ mà máy của họ tìm tới được.",
    "diagram": [
      {
        "label": "Trang chỉ nằm trên máy bạn",
        "arrow": true
      },
      {
        "label": "Đặt lên một máy luôn bật, có địa chỉ",
        "arrow": true
      },
      {
        "label": "Quyết định ai được mở: riêng, nội bộ hay công khai",
        "arrow": true
      },
      {
        "label": "Gửi đường dẫn thử cho một người rồi mới rộng hơn"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một nhân viên vận hành làm trang tra cứu lịch ca trực. Trên máy cô nó chạy rất mượt, nhưng khi gửi đường dẫn cho cả nhóm thì ai cũng báo không mở được. Sau khi được hướng dẫn đặt trang lên một chỗ có địa chỉ riêng, cô gửi thử cho một đồng nghiệp trước, nhờ mở bằng điện thoại ở mạng 4G, rồi mới gửi cả nhóm."
    },
    "quiz": [
      {
        "question": "Đường dẫn bắt đầu bằng localhost bạn gửi cho đồng nghiệp không mở được vì sao?",
        "options": [
          "Nó luôn trỏ về chính máy của người đang mở, không phải máy bạn",
          "Vì đồng nghiệp cần cài thêm đúng phần mềm soạn trang mà bạn đã dùng để làm",
          "Vì đường dẫn chỉ sống được vài phút rồi tự hết hạn",
          "Vì công ty chặn mọi đường dẫn gửi qua tin nhắn nội bộ"
        ],
        "correct": 0,
        "explanation": "localhost nghĩa là \"máy này\", nên mỗi người mở sẽ quay về máy của chính họ. Không cần cài phần mềm để xem một trang, đường dẫn này không tự hết hạn, và việc công ty chặn tin nhắn sẽ cho lỗi khác. Gốc vấn đề là địa chỉ, không phải người xem."
      },
      {
        "question": "Trang chỉ mở được khi nối vào mạng công ty. Người ngồi quán cà phê có mở được không?",
        "options": [
          "Thường là không, vì máy ngoài mạng không tìm tới địa chỉ đó",
          "Có, vì mạng công ty nối với Internet nên ai biết đường dẫn cũng vào được",
          "Có, nếu họ gõ đúng tên trang, vì tên trang là duy nhất trên toàn cầu",
        "Có, vì quán cà phê dùng cùng nhà mạng với công ty bạn"
        ],
        "correct": 0,
        "explanation": "Trang nội bộ chỉ có địa chỉ trong mạng công ty, máy ngoài mạng không tìm tới được. Mạng công ty nối ra Internet không có nghĩa trang bên trong tự mở ra ngoài, và biết tên cũng không đổi được việc địa chỉ không tới được."
      },
      {
        "question": "Bạn gửi đường dẫn công khai cho đúng ba người thân cận. Trang có riêng tư không?",
        "options": [
          "Không, bất cứ ai có đường dẫn hoặc đoán ra nó đều mở được",
          "Có, vì chỉ ba người biết nên xem như chỉ ba người mở được",
          "Có, vì đường dẫn dài và khó nhớ nên người lạ không bao giờ tìm ra",
          "Có, nếu bạn dặn ba người đó không chuyển tiếp cho ai khác"
        ],
        "correct": 0,
        "explanation": "Công khai nghĩa là không có khoá ở cửa: ai có đường dẫn đều vào. Đường dẫn có thể bị chuyển tiếp, dán vào chỗ khác, hoặc bị dò ra. Lời dặn không thay được một lớp đăng nhập thật."
      },
      {
        "question": "Trước khi đặt trang ra công khai, câu hỏi nào đáng hỏi đầu tiên?",
        "options": [
          "Trong trang có thứ gì tôi không muốn người lạ nhìn thấy không",
          "Tên trang có đủ ngắn để người ta nhớ và gõ lại sau một lần nhìn thấy",
          "Màu nền đã hợp với nhận diện thương hiệu của công ty chưa",
          "Trang mở nhanh hơn hay chậm hơn trang của đối thủ"
        ],
        "correct": 0,
        "explanation": "Các câu về tên, màu sắc và tốc độ đều đáng quan tâm, nhưng chúng sửa được sau khi ra mắt. Một số liệu nội bộ hay email khách đã lộ ra công khai thì không rút lại được. Nên kiểm thứ nhạy cảm trước."
      },
      {
        "question": "Bạn đưa trang thử lên mạng. Điều nào nên ghi lại ngay lúc đó?",
        "options": [
          "Trang đặt ở đâu, dưới tài khoản nào và cách gỡ nó xuống",
          "Chỉ cần nhớ đường dẫn, vì gỡ đi sau này là việc của IT",
          "Chỉ ghi tên tệp đã tải lên, vì nơi đặt thì tìm lại được dễ dàng",
          "Không cần ghi gì, vì trang thử thì không ai để ý tới cả"
        ],
        "correct": 0,
        "explanation": "Một trang thử bị bỏ quên vẫn mở ra với cả thế giới và có thể chứa dữ liệu cũ. Ghi nơi đặt, tài khoản và cách gỡ giúp bạn hay người kế nhiệm dọn được. IT không biết bạn đã đặt gì ở đâu nếu bạn không nói."
      }
    ],
    "keyTakeaways": [
      "Trang chạy trên máy bạn chưa có địa chỉ mà người khác tìm tới được.",
      "Có ba mức: chỉ mình bạn, trong mạng công ty, cả Internet.",
      "Công khai nghĩa là ai có đường dẫn đều mở được.",
      "Kiểm thứ nhạy cảm trong trang trước khi công khai.",
      "Ghi lại nơi đặt và cách gỡ ngay khi đưa lên."
    ],
    "practicePrompt": {
      "question": "Chị Hạnh làm trang danh sách câu hỏi thường gặp cho khách. Trang có một dòng ghi chú nội bộ: \"khách A nợ 3 tháng\". Chị nên làm gì trước khi gửi đường dẫn công khai?",
      "options": [
        "Xoá dòng ghi chú nội bộ rồi mới đưa lên, vì công khai ai cũng đọc được",
        "Giữ nguyên, vì người lạ sẽ không đọc hết cả trang một cách kỹ lưỡng",
        "Đổi màu chữ dòng đó thành trắng để nó không còn hiển thị trên trang",
        "Đặt dòng đó ở cuối trang, nơi ít người cuộn tới nên coi như đã ẩn đi rồi"
      ],
      "correct": 0,
      "explanation": "Chữ trắng hay đặt ở cuối trang vẫn nằm trong trang và người ta vẫn đọc được bằng cách bôi đen hoặc xem mã nguồn. Ghi chú nội bộ không có chỗ trong trang công khai, nên xoá hẳn trước khi đưa lên là cách duy nhất chắc chắn."
    },
    "summary": {
      "keyIdea": "Đưa lên mạng là chọn ai mở được đường dẫn, không chỉ là bấm đăng.",
      "formula": "Máy bạn → máy luôn bật có địa chỉ → chọn mức riêng, nội bộ hay công khai.",
      "commonMistake": "Tưởng gửi đường dẫn cho ít người thì trang là riêng tư.",
      "action": "Mở trang thử bằng điện thoại ở mạng 4G để biết người ngoài thấy gì."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Lấy một công cụ hoặc trang bạn đã làm (hoặc một tệp tài liệu bạn định chia sẻ). Viết ra ba dòng: ai cần mở nó, họ ở trong hay ngoài mạng công ty, và trong đó có thứ gì không nên để người lạ thấy. Sau đó gửi đường dẫn thử cho một đồng nghiệp và hỏi họ mở được chưa.",
      "secondary": "Ghi lại câu trả lời của đồng nghiệp, đó là bản thử mức truy cập đầu tiên của bạn."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Sáng thứ Ba bạn gửi đường dẫn cho đồng nghiệp: \"xem thử giúp mình\". Mười phút sau họ nhắn lại: \"không mở được\". Bài này nói vì sao, và ai sẽ mở được đường dẫn của bạn khi nó thật sự lên mạng."
      },
      {
        "type": "feynman",
        "title": "Đưa lên mạng đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới ba chỗ: phòng riêng trong nhà bạn, phòng khách có mời bạn bè, và cửa hàng mặt phố.",
        "columns": [
          "Ý",
          "Chuyện nhà bạn",
          "Chuyện trang của bạn"
        ],
        "rows": [
          [
            "Phòng riêng",
            "Chỉ bạn vào được",
            "Trang chạy trên máy bạn, địa chỉ localhost"
          ],
          [
            "Phòng khách",
            "Người bạn mời, đã biết đường tới nhà",
            "Trang trong mạng công ty, chỉ máy cùng mạng mở được"
          ],
          [
            "Cửa hàng mặt phố",
            "Ai đi ngang cũng bước vào được",
            "Trang công khai, có địa chỉ trên Internet"
          ],
          [
            "Chìa khoá",
            "Bạn chọn ai có chìa",
            "Mật khẩu hoặc đăng nhập quyết định ai xem được"
          ]
        ],
        "oneLiner": "Đưa lên mạng là chuyển trang từ phòng riêng ra chỗ khác, và chọn cửa mở cho ai."
      },
      {
        "type": "heading",
        "text": "Vấn đề: chạy được trên máy mình chưa phải là lên mạng"
      },
      {
        "type": "paragraph",
        "text": "Khi bạn làm một trang, máy của bạn đóng vai một máy chủ nhỏ chỉ phục vụ chính bạn. Địa chỉ của nó, thường là chữ localhost, có nghĩa là \"máy này\". Người khác gõ chữ đó sẽ về máy của họ, nên không thấy gì. Để họ thấy, trang phải nằm ở một máy khác luôn bật và có địa chỉ mà mọi máy tìm tới được."
      },
      {
        "type": "flow",
        "title": "Con đường từ máy bạn tới người xem",
        "steps": [
          {
            "label": "Trang nằm trên máy bạn",
            "detail": "Chỉ bạn mở được bằng localhost. Tắt máy là trang biến mất."
          },
          {
            "label": "Đặt lên một máy luôn bật",
            "detail": "Một máy do nhà cung cấp quản lý, bật suốt ngày đêm và có địa chỉ riêng."
          },
          {
            "label": "Chọn ai được mở",
            "detail": "Riêng (cần đăng nhập), nội bộ (chỉ trong mạng công ty) hoặc công khai (ai có đường dẫn cũng vào)."
          },
          {
            "label": "Mở thử từ máy khác",
            "detail": "Nhờ một đồng nghiệp, hoặc dùng điện thoại ở mạng 4G, để xem người ngoài thấy gì."
          }
        ]
      },
      {
        "type": "heading",
        "text": "Ba mức ai mở được"
      },
      {
        "type": "comparison",
        "left": {
          "label": "Riêng hoặc nội bộ",
          "text": "Cần đăng nhập hoặc phải đang ở trong mạng công ty. Phù hợp với công cụ làm việc, số liệu nội bộ, danh sách khách."
        },
        "right": {
          "label": "Công khai",
          "text": "Không có khoá ở cửa. Ai có đường dẫn, hoặc đoán ra nó, đều mở được. Phù hợp với trang giới thiệu, bảng giá đã duyệt."
        }
      },
      {
        "type": "callout",
        "label": "Hay nhầm",
        "text": "Gửi đường dẫn công khai cho ít người không biến nó thành riêng tư. Đường dẫn có thể bị chuyển tiếp hoặc dán vào chỗ khác. Thứ cần giấu thì phải có đăng nhập, hoặc đừng đưa lên."
      },
      {
        "type": "scenario",
        "title": "Gửi thử công cụ cho đồng nghiệp",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn vừa làm xong trang xem lịch phòng họp. Sếp nói: \"Gửi anh đường dẫn để anh xem chiều nay.\" Đường dẫn bạn đang có bắt đầu bằng localhost.",
            "choices": [
              {
                "label": "Gửi nguyên đường dẫn localhost, chắc sếp sẽ mở được",
                "next": "bad_local"
              },
              {
                "label": "Hỏi người phụ trách IT chỗ nào đặt trang thử để sếp có địa chỉ mở được",
                "next": "s2"
              }
            ]
          },
          "bad_local": {
            "text": "Sếp bấm vào và thấy trang báo không tìm thấy. Chiều đó sếp nghĩ công cụ chưa xong, dù nó chạy tốt, chỉ vì địa chỉ sai.",
            "ending": "bad"
          },
          "s2": {
            "text": "IT cho bạn một chỗ đặt trang thử và một địa chỉ. Trang lên rồi, nhưng trong bảng lịch có cột \"ghi chú cá nhân\" của vài đồng nghiệp.",
            "choices": [
              {
                "label": "Để nguyên và mở công khai, chắc không ai để ý",
                "next": "bad_public"
              },
              {
                "label": "Bỏ cột ghi chú khỏi bản thử và mở ở chế độ chỉ người có đăng nhập xem",
                "next": "s3"
              }
            ]
          },
          "bad_public": {
            "text": "Một đường dẫn công khai bị dán vào nhóm chat có cả người ngoài công ty. Vài ngày sau, ghi chú cá nhân của đồng nghiệp bị người lạ đọc được.",
            "ending": "bad"
          },
          "s3": {
            "text": "Bạn mở bản thử bằng điện thoại ở mạng 4G: trang đòi đăng nhập và không còn cột ghi chú. Bạn gửi sếp địa chỉ kèm một dòng mô tả.",
            "choices": [
              {
                "label": "Ghi lại nơi đặt, tài khoản và cách gỡ xuống vào một ghi chú chung",
                "next": "good"
              },
              {
                "label": "Gửi sếp xong là xong, không cần ghi gì thêm",
                "next": "bad_forget"
              }
            ]
          },
          "bad_forget": {
            "text": "Ba tháng sau bản thử vẫn chạy, không ai nhớ của ai, và dữ liệu cũ vẫn nằm đó. Khi bạn nghỉ, không ai biết phải gỡ thế nào.",
            "ending": "bad"
          },
          "good": {
            "text": "Sếp xem được trong 2 phút và góp ý ngay. Ghi chú của bạn giúp đồng nghiệp dọn bản thử khi xong việc.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Đưa lên mạng là chọn ai mở được, rồi mở thử từ bên ngoài.",
          "Bài sau: địa chỉ dễ nhớ của trang, tức tên miền."
        ]
      }
    ]
  },
  {
    "track": "personal",
    "isFundamental": false,
    "id": 2581,
    "slug": "ten-mien-nhu-bien-so-nha-mua-o-dau-va-ai-giu",
    "title": "Chặng 59, Bài 2: Tên miền như biển số nhà: mua ở đâu và ai đứng tên",
    "subtitle": "Tên miền là cái bạn thuê theo năm, và người đứng tên mới là chủ thật.",
    "duration": "8 phút",
    "difficulty": "Dễ",
    "emoji": "🏠",
    "whyItMatters": "Công ty định lấy một tên miền cho công cụ mới và người mua thường là người đang rảnh nhất, không phải người có thẩm quyền. Nếu tên miền đứng tên một cá nhân rồi người đó nghỉ việc, hoặc quên gia hạn, cả công cụ và email dùng tên miền đó có thể ngừng hoạt động.",
    "openingQuestion": "Đồng nghiệp đăng ký tên miền cho công cụ của phòng bằng email và thẻ cá nhân của anh ấy. Rủi ro lớn nhất về sau là gì?",
    "openingOptions": [
      "Anh nghỉ việc hoặc quên gia hạn thì công ty mất quyền kiểm soát tên miền",
      "Tên miền sẽ chạy chậm hơn so với tên miền đăng ký bằng thông tin công ty",
      "Khách hàng không nhìn thấy tên miền nếu nó không đứng tên công ty",
      "Tên miền bị xoá ngay sau một tháng nếu dùng thẻ cá nhân để thanh toán"
    ],
    "correctOption": 0,
    "explanation": "Người đứng tên và người nhận email của tên miền là người quyết định gia hạn, chuyển, đổi chỗ trỏ. Nếu đó là một cá nhân, công ty phụ thuộc vào người đó cho một thứ mà nhiều hệ thống dựa vào. Tốc độ không phụ thuộc người đứng tên, khách vẫn thấy tên miền bình thường, và không có quy tắc xoá sau một tháng vì thẻ cá nhân. Điều cần là đứng tên công ty, dùng hộp thư chung để nhận nhắc nhở và ghi ngày hết hạn.",
    "diagram": [
      {
        "label": "Chọn tên dễ nhớ, dễ đánh vần",
        "arrow": true
      },
      {
        "label": "Đăng ký ở một nơi bán tên miền, đứng tên công ty",
        "arrow": true
      },
      {
        "label": "Ghi ngày hết hạn, bật gia hạn tự động",
        "arrow": true
      },
      {
        "label": "Nhận nhắc nhở qua hộp thư chung, không phải cá nhân"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một công ty nhỏ nhờ anh kỹ thuật đăng ký tên miền từ năm đầu, bằng email riêng của anh. Hai năm sau anh nghỉ, thư nhắc gia hạn vẫn về hộp thư anh. Tên miền hết hạn, trang và email công ty ngừng chạy nửa ngày cho tới khi tìm được người đứng tên cũ."
    },
    "quiz": [
      {
        "question": "Tên miền thực chất là gì đối với công ty bạn?",
        "options": [
          "Một quyền sử dụng thuê theo năm, không phải mua đứt",
          "Một món đồ mua một lần, của công ty vĩnh viễn",
          "Một tệp nằm trên máy chủ của công ty bạn, có thể tự sao chép",
          "Một loại mật khẩu dùng để đăng nhập vào trang web của công ty"
        ],
        "correct": 0,
        "explanation": "Tên miền được thuê theo kỳ, hết kỳ mà không gia hạn thì quyền dùng có thể mất. Nó không phải tệp nằm trên máy chủ của bạn, cũng không phải mật khẩu; nó là cái tên trỏ tới nơi đặt trang."
      },
      {
        "question": "Ai nên đứng tên tên miền dùng cho công cụ của công ty?",
        "options": [
          "Chính công ty, với hộp thư chung nhận nhắc nhở",
          "Người đăng ký đầu tiên bằng thẻ cá nhân của mình, vì đó là cách nhanh nhất để có tên",
          "Nhân viên trẻ nhất, vì họ thạo công nghệ và sẽ ở lại công ty lâu dài",
          "Một công ty đứng ra bán tên miền, vì họ sẽ lo gia hạn cho bạn"
        ],
        "correct": 0,
        "explanation": "Người đứng tên là chủ thật của tên miền. Cá nhân có thể nghỉ việc, còn công ty thì còn. Nhà bán tên miền là bên cung cấp dịch vụ, không phải chủ. Hộp thư chung đảm bảo thư nhắc không rơi vào một người."
      },
      {
        "question": "Điều gì cần ghi lại ngay khi có tên miền?",
        "options": [
          "Ngày hết hạn và nơi đăng ký",
          "Chỉ tên tên miền, vì các thông tin khác tra ra dễ dàng khi cần",
          "Chỉ số tiền đã trả lần đầu, để báo cáo chi phí cho kế toán",
          "Mật khẩu tài khoản ghi thẳng vào tên tệp để khỏi phải nhớ"
        ],
        "correct": 0,
        "explanation": "Tên miền hết hạn thì trang và thư dùng nó ngừng hoạt động, nên ngày hết hạn là thông tin quan trọng nhất. Mật khẩu không nên ghi vào tên tệp hay ở chỗ ai cũng đọc được."
      },
      {
        "question": "Công ty thấy thư nhắc gia hạn tên miền nhưng người đứng tên đã nghỉ. Nên làm gì?",
        "options": [
          "Báo người phụ trách IT hoặc pháp chế để chuyển quyền đứng tên sang công ty",
          "Gia hạn bằng thẻ cá nhân của bạn rồi báo lại với công ty sau cùng",
          "Bỏ qua, vì tên miền mới đăng ký lại sẽ rẻ hơn tên miền cũ nhiều và khách sẽ quen nhanh",
          "Đăng nhập tài khoản của người cũ bằng mật khẩu mà bạn còn nhớ"
        ],
        "correct": 0,
        "explanation": "Việc chuyển quyền cần người có thẩm quyền, không nên đi đường tắt bằng thẻ cá nhân hay đăng nhập thay người khác. Bỏ qua thì mất tên miền mà khách và email đã quen."
      },
      {
        "question": "Nên bật gia hạn tự động cho tên miền công ty trong trường hợp nào?",
        "options": [
          "Khi công ty vẫn cần dùng tên đó và thẻ thanh toán còn hiệu lực",
          "Không bao giờ, vì gia hạn tự động hay bị trừ tiền mà không ai biết",
          "Chỉ khi tên miền còn dưới một tháng là hết hạn",
          "Chỉ khi người đứng tên là cá nhân, vì họ hay quên"
        ],
        "correct": 0,
        "explanation": "Gia hạn tự động tránh mất tên vì quên, nhưng cần thẻ còn hạn và một người xem hoá đơn. Bật chỉ trong tháng cuối hay chỉ cho cá nhân thì không giải quyết rủi ro quên."
      }
    ],
    "keyTakeaways": [
      "Tên miền là thuê theo năm, không phải mua đứt.",
      "Người đứng tên là chủ thật của tên miền.",
      "Dùng hộp thư chung để nhận nhắc nhở gia hạn.",
      "Ghi ngày hết hạn và nơi đăng ký ngay lúc có tên.",
      "Mật khẩu không ghi vào chỗ ai cũng đọc được."
    ],
    "practicePrompt": {
      "question": "Anh Bình nghỉ việc nhưng vẫn là người đứng tên tên miền công cụ của phòng. Bước đầu tiên hợp lý nhất là gì?",
      "options": [
        "Hỏi IT chuyển quyền đứng tên sang công ty trước khi anh rời đi",
        "Nhờ anh để lại mật khẩu trong một tin nhắn chung cho cả phòng đọc",
        "Đăng ký một tên miền mới và quên tên cũ để khỏi phải lo chuyển",
        "Chờ tới khi nhận thư hết hạn rồi mới tính chuyện xử lý sau"
      ],
      "correct": 0,
      "explanation": "Chuyển quyền lúc người đó còn hợp tác là dễ nhất. Mật khẩu trong tin nhắn chung là rò rỉ bí mật, đăng ký tên mới làm mất địa chỉ khách đã quen, còn chờ tới ngày hết hạn là chờ đúng lúc rủi ro cao nhất."
    },
    "summary": {
      "keyIdea": "Tên miền là địa chỉ thuê theo năm, và người đứng tên mới là chủ.",
      "formula": "Đứng tên công ty + hộp thư chung + ngày hết hạn đã ghi = không mất tên.",
      "commonMistake": "Đăng ký bằng thông tin cá nhân của một nhân viên.",
      "action": "Tìm ra ai đang đứng tên tên miền công ty bạn dùng."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn một tên miền công ty bạn đang dùng (trang chính hoặc email). Hỏi IT hoặc người phụ trách: ai đứng tên, hết hạn ngày nào, thư nhắc gửi về hộp thư của ai. Ghi ba câu trả lời vào một tệp chung.",
      "secondary": "Nếu không ai trả lời được, đó là việc đầu tiên cần xử lý."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Công ty muốn lấy một tên miền cho công cụ mới và người mua là người đang rảnh nhất. Bài này dạy bạn kiểm ba điều trước khi ai đó bấm thanh toán: ai đứng tên, khi nào hết hạn, và gia hạn thế nào."
      },
      {
        "type": "feynman",
        "title": "Tên miền đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới biển số nhà: nó giúp người ta tìm tới nhà bạn, nhưng nó không phải là ngôi nhà.",
        "columns": [
          "Ý",
          "Chuyện nhà bạn",
          "Chuyện tên miền"
        ],
        "rows": [
          [
            "Biển số nhà",
            "Giúp người khác tìm tới",
            "Tên miền giúp người dùng gõ tên thay vì dãy số"
          ],
          [
            "Sổ đứng tên",
            "Ai đứng tên là chủ nhà",
            "Người đứng tên là chủ của tên miền"
          ],
          [
            "Thuê nhà theo năm",
            "Hết hợp đồng thì phải gia hạn",
            "Tên miền thuê theo năm, phải gia hạn"
          ],
          [
            "Ngôi nhà",
            "Nơi thật sự để đồ",
            "Nơi đặt trang, là chuyện khác, bài sau"
          ]
        ],
        "oneLiner": "Tên miền chỉ là cái biển, còn người đứng tên và ngày hết hạn là thứ cần giữ chặt."
      },
      {
        "type": "heading",
        "text": "Vấn đề: người mua nhanh nhất không phải người giữ lâu nhất"
      },
      {
        "type": "paragraph",
        "text": "Tên miền thường được đăng ký trong năm phút bằng thẻ của người đang cần. Sau đó không ai nhớ ai đứng tên, thư nhắc gia hạn về một hộp thư cá nhân. Đến khi hết hạn, cả trang web lẫn email dùng tên miền đó có thể dừng cùng một lúc."
      },
      {
        "type": "flow",
        "title": "Ba điều cần kiểm ở một tên miền",
        "steps": [
          {
            "label": "Ai đứng tên",
            "detail": "Tra thông tin đăng ký hoặc hỏi IT. Người đứng tên nên là công ty, không phải một nhân viên."
          },
          {
            "label": "Khi nào hết hạn",
            "detail": "Ghi ngày hết hạn vào lịch chung và đặt nhắc trước một tháng."
          },
          {
            "label": "Gia hạn thế nào",
            "detail": "Bật gia hạn tự động nếu còn cần dùng, kèm thẻ còn hạn và một người xem hoá đơn."
          }
        ]
      },
      {
        "type": "callout",
        "label": "Hộp thư chung",
        "text": "Đặt email liên hệ của tên miền là một hộp thư chung như it@ hoặc admin@ của công ty. Khi nhân viên nghỉ, thư nhắc vẫn còn người nhận."
      },
      {
        "type": "heading",
        "text": "Nhờ AI lập danh sách kiểm, không đưa dữ liệu thật"
      },
      {
        "type": "paragraph",
        "text": "AI giúp bạn viết bảng kiểm nhanh. Hãy mô tả tình huống ở mức chung, đừng dán mật khẩu hay thông tin đăng nhập. Bảng kiểm xong, bạn đối chiếu từng dòng với tài khoản thật bằng tay."
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Lập bảng kiểm khi công ty lấy tên miền mới",
        "task": "Công ty bạn sắp đăng ký tên miền cho công cụ đặt phòng họp. Lắp một prompt để AI viết bảng kiểm trước khi thanh toán.",
        "parts": [
          {
            "id": "context",
            "label": "Bối cảnh",
            "options": [
              {
                "text": "Giúp tôi về tên miền.",
                "feedback": "Quá chung, AI sẽ viết một bài giới thiệu tên miền thay vì bảng kiểm."
              },
              {
                "text": "Công ty 50 người sắp đăng ký một tên miền cho công cụ nội bộ đặt phòng họp. Tôi không rành kỹ thuật.",
                "good": true,
                "feedback": "AI biết quy mô, mục đích và mức hiểu biết của bạn nên viết đúng cấp độ."
              }
            ]
          },
          {
            "id": "task",
            "label": "Việc cần làm",
            "options": [
              {
                "text": "Liệt kê 6 điều cần kiểm về người đứng tên, ngày hết hạn và gia hạn trước khi thanh toán.",
                "good": true,
                "feedback": "Có số lượng và ba chủ đề cụ thể, bảng kiểm sẽ bám sát việc cần làm."
              },
              {
                "text": "Nói cho tôi biết mọi thứ về tên miền.",
                "feedback": "Không giới hạn nên AI trả một bài dài khó dùng."
              }
            ]
          },
          {
            "id": "rule",
            "label": "Giới hạn",
            "options": [
              {
                "text": "Đừng hỏi tôi mật khẩu hay số thẻ. Trả về dạng ô tích, mỗi ô một câu.",
                "good": true,
                "feedback": "Không đưa bí mật vào cuộc trò chuyện, và định dạng dùng được ngay."
              },
              {
                "text": "Đây là mật khẩu tài khoản nhà đăng ký của công ty để bạn kiểm giúp.",
                "feedback": "Dán mật khẩu vào ô chat là gửi bí mật ra ngoài, tuyệt đối không làm."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "context",
              "task",
              "rule"
            ],
            "text": "Bảng kiểm trước khi thanh toán:\n[ ] Đứng tên công ty, không phải cá nhân\n[ ] Email liên hệ là hộp thư chung\n[ ] Ghi ngày hết hạn vào lịch chung\n[ ] Bật gia hạn tự động và thẻ còn hạn\n[ ] Có người xem hoá đơn hằng năm\n[ ] Ghi nơi đăng ký vào ghi chú chung"
          },
          {
            "requires": [
              "context"
            ],
            "text": "Tên miền là địa chỉ của một trang trên Internet. Có nhiều loại đuôi như .com, .vn... Bạn có thể chọn theo thương hiệu...\n\n(Dài, không phải bảng kiểm, vì thiếu việc cụ thể.)"
          },
          {
            "text": "Để kiểm tên miền, hãy gửi tôi thông tin đăng nhập tài khoản. Theo số liệu, 70% tên miền bị mất vì quên gia hạn...\n\n(AI vừa xin thông tin nhạy cảm vừa bịa số liệu.)"
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Nhân viên cũ vẫn đứng tên tên miền",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn biết tên miền của công cụ vẫn đứng tên anh Bình, người đã nghỉ việc. Thư nhắc gia hạn về hộp thư cá nhân của anh.",
            "choices": [
              {
                "label": "Chờ tới khi thư hết hạn về rồi mới tính",
                "next": "bad_wait"
              },
              {
                "label": "Báo IT, nhờ liên hệ anh Bình để chuyển quyền đứng tên sang công ty",
                "next": "s2"
              }
            ]
          },
          "bad_wait": {
            "text": "Ngày hết hạn trôi qua trong kỳ nghỉ lễ. Trang và email ngừng chạy nửa ngày, và phải đi tìm anh Bình để lấy lại quyền.",
            "ending": "bad"
          },
          "s2": {
            "text": "Anh Bình đồng ý hợp tác. IT cần bạn cung cấp danh sách các hệ thống đang dùng tên miền này.",
            "choices": [
              {
                "label": "Liệt kê trang, email và các công cụ dùng tên miền để IT báo trước cho các nhóm",
                "next": "s3"
              },
              {
                "label": "Bảo IT cứ chuyển đi, không cần liệt kê gì",
                "next": "bad_blind"
              }
            ]
          },
          "bad_blind": {
            "text": "Quá trình chuyển làm thay đổi một cấu hình, email của một phòng không nhận được thư trong hai ngày mà không ai biết nguyên nhân.",
            "ending": "bad"
          },
          "s3": {
            "text": "Quyền đứng tên đã chuyển sang công ty. Còn việc cuối: ngày hết hạn và thư nhắc.",
            "choices": [
              {
                "label": "Đổi email liên hệ sang hộp thư chung, ghi ngày hết hạn vào lịch chung",
                "next": "good"
              },
              {
                "label": "Giữ email cá nhân của bạn làm liên hệ cho tiện",
                "next": "bad_again"
              }
            ]
          },
          "bad_again": {
            "text": "Một năm sau bạn chuyển phòng, thư nhắc vẫn gửi về email cũ của bạn và không ai đọc. Vấn đề cũ lặp lại.",
            "ending": "bad"
          },
          "good": {
            "text": "Công ty giữ quyền kiểm soát tên miền, thư nhắc về hộp thư chung, và ngày hết hạn nằm trong lịch cả nhóm nhìn thấy.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Tên miền là địa chỉ thuê theo năm: kiểm người đứng tên, ngày hết hạn và gia hạn.",
          "Bài sau: thuê chỗ để trang thực sự chạy."
        ]
      }
    ]
  },
  {
    "track": "personal",
    "isFundamental": false,
    "id": 2582,
    "slug": "noi-luu-tru-nho-thue-cho-o-dau-de-san-pham-chay",
    "title": "Chặng 59, Bài 3: Thuê chỗ để sản phẩm chạy: chọn kiểu lưu trữ theo nhu cầu",
    "subtitle": "Một kệ trưng bày, một hộp thư góp ý và một quầy có nhân viên cần ba kiểu chỗ khác nhau.",
    "duration": "10 phút",
    "difficulty": "Dễ",
    "emoji": "🗄️",
    "whyItMatters": "Nhà cung cấp nào cũng nói mình đáp ứng mọi nhu cầu, nhưng một trang giới thiệu, một biểu mẫu nhận đăng ký và một công cụ có tài khoản đăng nhập cần những thứ rất khác nhau. Chọn chỗ thừa thì tốn tiền và công quản lý, chọn chỗ thiếu thì biểu mẫu không lưu được gì.",
    "openingQuestion": "Bạn có ba thứ cần đưa lên mạng: một trang giới thiệu chỉ có chữ và ảnh, một biểu mẫu đăng ký sự kiện, và một công cụ quản lý đơn có đăng nhập. Nhận định nào đúng nhất?",
    "openingOptions": [
      "Ba thứ cần ba mức chỗ đặt khác nhau, trang tĩnh là nhu cầu nhẹ nhất",
      "Cả ba dùng một kiểu chỗ đặt giống nhau cho đơn giản, chọn kiểu đắt nhất",
      "Cả ba chỉ cần chỗ chứa tệp, vì mọi trang web đều là tệp nằm sẵn đó cả",
      "Chỉ công cụ có đăng nhập mới cần chọn chỗ đặt, hai thứ kia tự chạy được"
    ],
    "correctOption": 0,
    "explanation": "Trang tĩnh chỉ là tệp có sẵn, ai mở cũng thấy nguyên như nhau, nên chỉ cần một chỗ chứa tệp. Biểu mẫu phải nhận và lưu dữ liệu người điền, nên cần một nơi xử lý. Công cụ có tài khoản cần chương trình chạy liên tục, nơi lưu dữ liệu và kiểm đăng nhập. Chọn kiểu đắt nhất cho cả ba là phí, còn coi cả ba là tệp thì biểu mẫu và công cụ sẽ không chạy. Cả ba đều cần chỗ đặt, không cái nào tự chạy.",
    "diagram": [
      {
        "label": "Mô tả việc sản phẩm phải làm",
        "arrow": true
      },
      {
        "label": "Trang tĩnh, biểu mẫu hay công cụ có tài khoản",
        "arrow": true
      },
      {
        "label": "Chọn kiểu chỗ đặt vừa đủ cho việc đó",
        "arrow": true
      },
      {
        "label": "Hỏi nhà cung cấp về sao lưu, hỗ trợ và cách rời đi"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một trung tâm đào tạo nhỏ đặt cả trang giới thiệu, biểu mẫu đăng ký và công cụ chấm điểm lên cùng một máy chủ thuê riêng cho \"tiện\". Họ phải trả tiền và lo cập nhật cho cả một máy chủ dù trang giới thiệu chỉ cần chỗ chứa tệp. Sau khi tách ba thứ theo nhu cầu, việc bảo trì chỉ còn tập trung vào công cụ chấm điểm."
    },
    "quiz": [
      {
        "question": "Trang giới thiệu chỉ có chữ và ảnh, ai mở cũng thấy như nhau. Kiểu chỗ đặt nào vừa đủ?",
        "options": [
          "Một chỗ chứa tệp tĩnh",
          "Một máy chủ thuê riêng có cơ sở dữ liệu để phòng khi cần mở rộng",
          "Một nền tảng chạy chương trình liên tục cùng hệ thống đăng nhập",
          "Ba máy chủ chạy song song để trang không bao giờ bị gián đoạn"
        ],
        "correct": 0,
        "explanation": "Trang tĩnh chỉ cần giao tệp có sẵn, nên chỗ chứa tệp là đủ và rẻ nhất. Máy chủ riêng, nền tảng chạy chương trình hay nhiều máy chủ đều để phục vụ việc phức tạp hơn mà trang này không cần."
      },
      {
        "question": "Một biểu mẫu đăng ký sự kiện cần thêm điều gì so với trang tĩnh?",
        "options": [
          "Một nơi nhận và lưu lại những gì người điền gửi lên",
          "Một tên miền thứ hai riêng chỉ dành cho biểu mẫu, tách khỏi trang chính",
          "Một màu nền nổi bật để người điền dễ nhận ra",
          "Một ảnh lớn hơn để trang trông chuyên nghiệp hơn"
        ],
        "correct": 0,
        "explanation": "Biểu mẫu khác trang tĩnh ở chỗ dữ liệu đi từ người dùng về. Cần có nơi nhận, lưu và cho bạn xem lại. Tên miền thứ hai hay màu sắc không giải quyết việc lưu dữ liệu."
      },
      {
        "question": "Công cụ quản lý đơn có đăng nhập cần những thành phần nào mà trang tĩnh không cần?",
        "options": [
          "Chương trình chạy liên tục, nơi lưu dữ liệu và bước kiểm tra đăng nhập",
          "Chỉ thêm một tệp nữa chứa danh sách tài khoản, đặt cạnh các tệp của trang",
          "Chỉ cần chọn tên miền dài hơn để người ngoài khó đoán ra",
          "Không cần thêm gì, chỉ cần đặt mật khẩu lên tệp trang"
        ],
        "correct": 0,
        "explanation": "Đăng nhập nghĩa là có người dùng, dữ liệu riêng từng người và logic kiểm tra ở phía máy chủ. Một tệp danh sách đặt cạnh trang có thể bị đọc thẳng bởi người lạ, và tên miền dài không phải là cơ chế bảo vệ."
      },
      {
        "question": "Kiểu chỗ đặt nào cũng cần được kiểm điều gì trước khi bạn tin dùng cho dữ liệu khách hàng?",
        "options": [
          "Họ sao lưu thế nào và bạn lấy dữ liệu ra ra sao khi muốn chuyển đi",
          "Logo nhà cung cấp có nổi tiếng và xuất hiện ở nhiều hội thảo trong ngành hay không",
          "Giá tháng đầu tiên có đang được giảm cho khách mới không",
          "Giao diện trang quản lý có nhiều màu sắc và hình động không"
        ],
        "correct": 0,
        "explanation": "Dữ liệu khách là thứ mất thì khó lấy lại, nên sao lưu và đường rút dữ liệu quan trọng hơn giao diện hay khuyến mãi. Sự nổi tiếng không đảm bảo bạn lấy lại được dữ liệu."
      },
      {
        "question": "Ở quy mô nhỏ, vì sao không nên chọn máy chủ thuê riêng cho một trang tĩnh?",
        "options": [
          "Bạn gánh thêm việc cập nhật và bảo mật mà trang đó không đòi hỏi",
          "Máy chủ riêng không thể chứa được trang chỉ có chữ và ảnh",
          "Máy chủ riêng chỉ chạy được cho công ty có trên 100 nhân viên",
          "Máy chủ riêng không có địa chỉ nên người ngoài không mở được, dù đã cấu hình xong"
        ],
        "correct": 0,
        "explanation": "Máy chủ riêng chứa trang tĩnh được, có địa chỉ và không giới hạn quy mô. Vấn đề là ai chọn nó phải tự vá lỗi, cập nhật và canh chừng, những việc vô ích với một trang chỉ cần giao tệp."
      }
    ],
    "keyTakeaways": [
      "Trang tĩnh chỉ cần chỗ chứa tệp.",
      "Biểu mẫu cần nơi nhận và lưu dữ liệu.",
      "Công cụ có tài khoản cần chương trình chạy liên tục và nơi lưu dữ liệu.",
      "Chọn kiểu vừa đủ cho việc, không phải kiểu mạnh nhất.",
      "Luôn hỏi về sao lưu và cách lấy dữ liệu ra."
    ],
    "practicePrompt": {
      "question": "Phòng nhân sự cần một trang đăng tin tuyển dụng chỉ có chữ, cập nhật mỗi tháng một lần. Lựa chọn hợp lý nhất là gì?",
      "options": [
        "Chỗ chứa tệp tĩnh, cập nhật bằng cách thay tệp khi cần",
        "Máy chủ riêng có cơ sở dữ liệu, để sau này tiện mở rộng",
        "Một công cụ có đăng nhập cho cả công ty, để bảo mật cao",
        "Không đưa lên mạng, gửi tệp PDF qua email cho từng ứng viên"
      ],
      "correct": 0,
      "explanation": "Nội dung ít đổi và không thu dữ liệu nên chỗ chứa tệp là vừa đủ. Máy chủ riêng hay công cụ đăng nhập thêm việc quản lý mà không cần thiết, còn gửi PDF từng người thì mất công và không ai tìm thấy tin."
    },
    "summary": {
      "keyIdea": "Chọn chỗ đặt theo việc sản phẩm phải làm, không theo cái mạnh nhất.",
      "formula": "Tĩnh → chỗ chứa tệp; có biểu mẫu → thêm nơi lưu dữ liệu; có tài khoản → chương trình chạy liên tục.",
      "commonMistake": "Chọn kiểu đắt nhất cho mọi thứ vì sợ thiếu.",
      "action": "Phân loại ba sản phẩm của bạn vào ba kiểu trên."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Liệt kê ba thứ công ty bạn đang có hoặc định đưa lên mạng (trang, biểu mẫu, công cụ). Với mỗi thứ ghi: có nhận dữ liệu từ người dùng không, có đăng nhập không, ai sẽ cập nhật. Từ đó phân vào một trong ba kiểu: tĩnh, có biểu mẫu, có tài khoản.",
      "secondary": "Gạch chân thứ bạn chưa chắc, đó là câu hỏi mang tới bài sau."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bạn có ba thứ cần đưa lên mạng và nhà cung cấp nào cũng bảo \"chúng tôi lo hết\". Bài này giúp bạn tự phân loại nhu cầu trước, để chọn chỗ vừa đủ thay vì chọn theo lời chào."
      },
      {
        "type": "feynman",
        "title": "Thuê chỗ đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới ba kiểu không gian: kệ trưng bày ở cửa hàng, hộp thư góp ý, và quầy có nhân viên trực.",
        "columns": [
          "Ý",
          "Chuyện cửa hàng",
          "Chuyện sản phẩm"
        ],
        "rows": [
          [
            "Kệ trưng bày",
            "Ai đến cũng thấy hàng như nhau, không cần người",
            "Trang tĩnh: tệp có sẵn, giao cho ai cũng giống nhau"
          ],
          [
            "Hộp thư góp ý",
            "Khách bỏ giấy vào, có người thu và đọc",
            "Biểu mẫu: nhận dữ liệu và lưu lại để bạn xem"
          ],
          [
            "Quầy có nhân viên",
            "Nhân viên kiểm tên, lấy đúng hồ sơ của từng khách",
            "Công cụ có tài khoản: chương trình chạy, kiểm đăng nhập, lưu dữ liệu riêng"
          ],
          [
            "Thuê mặt bằng",
            "Chọn kích cỡ vừa cho việc",
            "Chọn kiểu chỗ đặt vừa cho sản phẩm"
          ]
        ],
        "oneLiner": "Kệ, hộp thư và quầy phục vụ cần ba mặt bằng khác nhau, sản phẩm của bạn cũng vậy."
      },
      {
        "type": "heading",
        "text": "Vấn đề: một lời chào cho mọi nhu cầu"
      },
      {
        "type": "paragraph",
        "text": "Trang của nhà cung cấp hay liệt kê một dãy gói từ rẻ tới đắt, mỗi gói có nhiều tính năng. Người không rành kỹ thuật dễ chọn gói giữa cho chắc, rồi phát hiện hoặc thừa nhiều thứ không dùng hoặc thiếu đúng một thứ cần, như nơi lưu dữ liệu biểu mẫu."
      },
      {
        "type": "flow",
        "title": "Hỏi ba câu để biết mình cần kiểu nào",
        "steps": [
          {
            "label": "Có nhận dữ liệu từ người dùng không",
            "detail": "Nếu không, chỉ có chữ và ảnh cố định, thì đó là trang tĩnh: chỗ chứa tệp là đủ."
          },
          {
            "label": "Có dữ liệu cần lưu lâu dài không",
            "detail": "Nếu có, như danh sách đăng ký, bạn cần nơi lưu và đường để xem hoặc tải dữ liệu đó."
          },
          {
            "label": "Có người dùng đăng nhập không",
            "detail": "Nếu có, bạn cần chương trình chạy liên tục, kiểm tra quyền, và trách nhiệm bảo vệ dữ liệu riêng của từng người."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Nhu cầu nhẹ",
          "text": "Trang giới thiệu, bảng giá, trang hướng dẫn. Ít đổi, không thu dữ liệu, ai xem cũng thấy như nhau. Chỗ chứa tệp thường là đủ."
        },
        "right": {
          "label": "Nhu cầu nặng",
          "text": "Biểu mẫu thu thông tin, công cụ có tài khoản, trang đặt lịch. Có dữ liệu của người dùng, cần nơi xử lý và lưu, và bạn phải chịu trách nhiệm bảo vệ."
        }
      },
      {
        "type": "callout",
        "label": "Hai câu hỏi dành cho bất kỳ nhà cung cấp nào",
        "text": "Dữ liệu của tôi được sao lưu thế nào? Khi muốn chuyển sang nơi khác, tôi lấy dữ liệu ra bằng cách nào? Nếu họ không trả lời rõ, đó là lý do để cân nhắc lại."
      },
      {
        "type": "scenario",
        "title": "Chọn chỗ đặt cho ba thứ của phòng",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Sếp nhờ bạn đề xuất chỗ đặt cho trang giới thiệu, biểu mẫu đăng ký sự kiện, và công cụ quản lý đơn. Một nhà cung cấp chào gói \"trọn bộ\" đắt nhất cho cả ba.",
            "choices": [
              {
                "label": "Nhận gói trọn bộ cho chắc, đỡ phải suy nghĩ",
                "next": "bad_all"
              },
              {
                "label": "Phân ba thứ theo nhu cầu rồi mới so chỗ đặt phù hợp",
                "next": "s2"
              }
            ]
          },
          "bad_all": {
            "text": "Bạn trả phí cao suốt năm cho một máy chủ mà trang giới thiệu không cần. Và vì không ai hỏi về sao lưu, dữ liệu đăng ký sự kiện mất khi một lần cập nhật thất bại.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bạn xác định: trang giới thiệu là tĩnh, biểu mẫu cần nơi lưu, công cụ đơn hàng có đăng nhập. Giờ cần so sánh các nhà cung cấp.",
            "choices": [
              {
                "label": "Chọn theo giá tháng đầu thấp nhất",
                "next": "bad_price"
              },
              {
                "label": "Gửi cho mỗi nhà cung cấp danh sách câu hỏi về sao lưu, hỗ trợ và cách lấy dữ liệu ra",
                "next": "s3"
              }
            ]
          },
          "bad_price": {
            "text": "Giá tháng đầu rẻ nhưng sang tháng sau phí tăng, và khi muốn chuyển đi, bạn không lấy được dữ liệu ở dạng dùng được.",
            "ending": "bad"
          },
          "s3": {
            "text": "Hai nhà cung cấp trả lời rõ, một nhà né tránh câu hỏi về cách lấy dữ liệu ra.",
            "choices": [
              {
                "label": "Loại nhà né tránh, chọn chỗ vừa đủ cho từng thứ và ghi lại quyết định",
                "next": "good"
              },
              {
                "label": "Vẫn chọn nhà né tránh vì họ hứa gọi lại sau",
                "next": "bad_vague"
              }
            ]
          },
          "bad_vague": {
            "text": "Cuộc gọi không bao giờ tới. Khi cần chuyển đi, bạn mất hai tuần để lấy lại dữ liệu đăng ký.",
            "ending": "bad"
          },
          "good": {
            "text": "Trang giới thiệu đặt ở chỗ chứa tệp rẻ, biểu mẫu có nơi lưu và sao lưu, công cụ đơn hàng ở chỗ có hỗ trợ rõ ràng. Bạn giải thích được vì sao với sếp.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Chọn chỗ đặt theo việc sản phẩm làm: tĩnh, biểu mẫu hay tài khoản.",
          "Bài sau: nhờ AI biến nhu cầu thành danh sách câu hỏi cho nhà cung cấp."
        ]
      }
    ]
  },
  {
    "track": "personal",
    "isFundamental": false,
    "id": 2583,
    "slug": "mo-ta-nhu-cau-cho-nha-cung-cap-bang-cau-hoi-dung",
    "title": "Chặng 59, Bài 4: Hỏi nhà cung cấp đúng câu: bản mô tả nhu cầu một trang",
    "subtitle": "Một trang mô tả nhu cầu giúp bạn hỏi đúng chỗ thay vì nghe lời chào.",
    "duration": "8 phút",
    "difficulty": "Dễ",
    "emoji": "📝",
    "whyItMatters": "Khi gặp nhà cung cấp, người không rành kỹ thuật thường không biết hỏi gì nên nghe bán hàng và gật đầu. Một trang mô tả nhu cầu, cộng một danh sách câu hỏi do AI giúp soạn, đổi vai của bạn từ người nghe sang người hỏi.",
    "openingQuestion": "Bạn nhờ AI: \"Viết câu hỏi để hỏi nhà cung cấp lưu trữ.\" Kết quả là mười câu chung chung ai hỏi cũng được. Cách cải thiện hiệu quả nhất là gì?",
    "openingOptions": [
      "Mô tả sản phẩm của bạn, loại dữ liệu nó giữ và điều bạn lo nhất",
      "Thêm chữ \"hãy viết thật chi tiết và thật chuyên nghiệp\" vào cuối câu",
      "Yêu cầu AI viết gấp đôi số câu hỏi, rồi chọn lấy những câu hay nhất",
      "Đổi sang một AI khác để xem liệu nó có biết nhiều hơn về nhà cung cấp"
    ],
    "correctOption": 0,
    "explanation": "AI chỉ biết những gì bạn nói. Khi bạn cho biết sản phẩm là gì, nó giữ dữ liệu nào (ví dụ danh sách khách) và bạn lo điều gì (mất dữ liệu, ai xem được), câu hỏi sẽ bám vào đúng chỗ đó. Thêm chữ chuyên nghiệp chỉ làm văn dài ra, gấp đôi số câu chỉ thêm câu chung chung, và đổi công cụ không cho nó thêm thông tin về sản phẩm của bạn.",
    "diagram": [
      {
        "label": "Viết một trang mô tả nhu cầu của bạn",
        "arrow": true
      },
      {
        "label": "Nhờ AI biến nó thành danh sách câu hỏi",
        "arrow": true
      },
      {
        "label": "Bạn lọc câu hỏi và bỏ thông tin nhạy cảm",
        "arrow": true
      },
      {
        "label": "Gửi nhà cung cấp, so câu trả lời bằng bảng"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một phòng marketing cần nơi đặt trang đăng ký hội thảo. Trưởng phòng viết nửa trang mô tả: khoảng 500 người đăng ký, có tên và email, cần xuất danh sách, lo nhất là lộ email. AI giúp biến thành tám câu hỏi. Hai trong ba nhà cung cấp trả lời đủ, một nhà trả lời chung chung nên bị loại."
    },
    "quiz": [
      {
        "question": "Phần nào của trang mô tả nhu cầu giúp AI viết câu hỏi sát nhất với sản phẩm?",
        "options": [
          "Dữ liệu sản phẩm giữ và điều bạn lo nhất",
          "Tên công ty, địa chỉ và số điện thoại liên hệ của bạn",
          "Một lời chào lịch sự kèm câu cảm ơn ở cuối cùng",
          "Logo và màu sắc thương hiệu mà sản phẩm đang dùng"
        ],
        "correct": 0,
        "explanation": "Câu hỏi về lưu trữ phụ thuộc vào thứ cần lưu và nỗi lo của bạn. Tên công ty, lời chào hay màu sắc không đổi nội dung câu hỏi nào. Thông tin liên hệ thậm chí là dữ liệu không cần đưa vào."
      },
      {
        "question": "Điều nào KHÔNG nên đưa vào trang mô tả nhờ AI soạn?",
        "options": [
          "Mật khẩu hoặc danh sách khách thật của bạn",
          "Số lượng người dùng dự kiến theo từng tháng",
          "Loại thông tin bạn thu, như tên và email",
          "Một nỗi lo cụ thể như lỡ mất dữ liệu đăng ký"
        ],
        "correct": 0,
        "explanation": "Bản mô tả chỉ cần nói loại dữ liệu và quy mô, không cần giá trị thật. Dán mật khẩu hay danh sách khách vào ô chat là gửi bí mật ra ngoài."
      },
      {
        "question": "AI đưa ra 12 câu hỏi. Bước tiếp theo hợp lý nhất là gì?",
        "options": [
          "Đọc, bỏ câu không hợp và giữ khoảng 6-8 câu quan trọng nhất",
          "Gửi nguyên cả 12 câu vì AI đã chọn lọc kỹ rồi",
          "Xoá hết, vì câu hỏi do AI soạn thường không dùng được",
          "Chuyển cho nhà cung cấp tự chọn câu họ muốn trả lời"
        ],
        "correct": 0,
        "explanation": "AI có thể soạn tốt nhưng không biết nhà cung cấp nào hợp với bạn. Lọc còn vài câu giúp nhà cung cấp trả lời đủ. Xoá hết bỏ phí phần việc AI làm được, để nhà cung cấp chọn thì họ sẽ chọn câu dễ."
      },
      {
        "question": "Nhà cung cấp trả lời \"chúng tôi rất an toàn\" cho câu hỏi về sao lưu. Bạn nên làm gì?",
        "options": [
          "Hỏi lại cụ thể: sao lưu bao lâu một lần và khôi phục thử ra sao",
          "Ghi nhận là đạt, vì họ đã cam kết rõ ràng bằng văn bản",
          "Bỏ qua câu đó và chuyển sang câu hỏi về giá cả",
          "Nhờ AI kiểm xem nhà cung cấp có nói thật hay không"
        ],
        "correct": 0,
        "explanation": "\"Rất an toàn\" là lời, không phải thông tin. Cần con số và quy trình: sao lưu mấy giờ một lần, giữ bao lâu, đã thử khôi phục chưa. AI không thể biết nhà cung cấp có nói thật, bạn phải hỏi họ."
      },
      {
        "question": "Vì sao nên so các nhà cung cấp bằng một bảng thay vì nhớ trong đầu?",
        "options": [
          "Mọi nhà được hỏi cùng câu và so cùng tiêu chí, nên khác biệt hiện ra rõ",
          "Vì bảng làm báo cáo dài hơn và trông chuyên nghiệp hơn",
          "Vì máy tính đã tự chọn giúp bạn nhà cung cấp tốt nhất",
          "Vì nhà cung cấp chỉ chấp nhận câu hỏi được gửi dưới dạng bảng"
        ],
        "correct": 0,
        "explanation": "So bằng bảng buộc mỗi nhà trả lời cùng câu và cho phép thấy chỗ nào né tránh. Độ dài báo cáo không quan trọng, bảng không tự chọn hộ, và nhà cung cấp nào cũng nhận câu hỏi dưới mọi dạng."
      }
    ],
    "keyTakeaways": [
      "AI chỉ hỏi sát khi biết sản phẩm và nỗi lo của bạn.",
      "Mô tả loại dữ liệu và quy mô, không dán dữ liệu thật.",
      "Lọc lại câu hỏi AI soạn, giữ khoảng 6-8 câu.",
      "Câu trả lời chung chung cần được hỏi lại bằng con số.",
      "So nhà cung cấp bằng một bảng cùng tiêu chí."
    ],
    "practicePrompt": {
      "question": "Bạn cần hỏi nhà cung cấp về chỗ đặt một biểu mẫu thu email khách. Prompt nào cho AI kết quả hữu ích nhất?",
      "options": [
        "Tôi có biểu mẫu thu khoảng 500 email; liệt kê 7 câu hỏi về lưu, sao lưu và xuất dữ liệu",
        "Viết cho tôi những câu hỏi hay nhất mà một chuyên gia sẽ hỏi nhà cung cấp",
        "Đây là file chứa 500 email khách thật, hãy kiểm xem nhà cung cấp nào hợp",
        "Hỏi nhà cung cấp giúp tôi bằng một bản tiếng Anh dài và rất trang trọng"
      ],
      "correct": 0,
      "explanation": "Prompt đầu nói rõ dữ liệu, quy mô, số câu và chủ đề. Prompt thứ hai quá chung, prompt thứ ba đưa dữ liệu khách thật ra ngoài mà không cần, prompt cuối không làm rõ việc cần hỏi."
    },
    "summary": {
      "keyIdea": "Mô tả nhu cầu một trang rồi mới nhờ AI soạn câu hỏi.",
      "formula": "Sản phẩm + loại dữ liệu + nỗi lo → 6-8 câu hỏi → bảng so sánh.",
      "commonMistake": "Nhờ AI soạn câu hỏi mà không nói gì về sản phẩm.",
      "action": "Viết nửa trang mô tả nhu cầu của một sản phẩm của bạn."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Viết nửa trang mô tả một sản phẩm bạn định đưa lên mạng: nó làm gì, giữ loại dữ liệu nào (không ghi dữ liệu thật), ai dùng, bạn lo nhất điều gì. Nhờ AI soạn 8 câu hỏi cho nhà cung cấp, rồi gạch bỏ hai câu thừa.",
      "secondary": "Giữ danh sách này, bài sau dùng để so nhà cung cấp."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bạn sắp gặp một nhà cung cấp và biết mình sẽ gật đầu nhiều hơn là hỏi. Bài này dạy bạn viết một trang mô tả nhu cầu và nhờ AI biến nó thành danh sách câu hỏi đúng chỗ."
      },
      {
        "type": "feynman",
        "title": "Hỏi nhà cung cấp đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới việc đi khám: bác sĩ hỏi bạn đau ở đâu, từ bao giờ, rồi mới kê đơn.",
        "columns": [
          "Ý",
          "Chuyện đi khám",
          "Chuyện hỏi nhà cung cấp"
        ],
        "rows": [
          [
            "Kể triệu chứng",
            "Bác sĩ cần nghe bạn đau ở đâu",
            "AI cần nghe sản phẩm của bạn làm gì"
          ],
          [
            "Tiền sử",
            "Thuốc đã dùng, bệnh đã có",
            "Loại dữ liệu đã có, nỗi lo từng gặp"
          ],
          [
            "Câu hỏi của bác sĩ",
            "Sinh ra từ những gì bạn kể",
            "Câu hỏi nhà cung cấp sinh ra từ bản mô tả"
          ],
          [
            "Đơn thuốc",
            "Hợp với người bệnh này",
            "Bảng so sánh hợp với nhu cầu này"
          ]
        ],
        "oneLiner": "Nói rõ mình cần gì thì câu hỏi sinh ra mới đúng."
      },
      {
        "type": "heading",
        "text": "Vấn đề: câu hỏi chung chung cho câu trả lời chung chung"
      },
      {
        "type": "paragraph",
        "text": "Hỏi \"bên anh có an toàn không\" chỉ nhận được \"rất an toàn\". Một danh sách câu hỏi tốt bám vào ba chủ đề: dữ liệu của bạn nằm ở đâu, nếu hỏng thì khôi phục thế nào, và khi có sự cố ai hỗ trợ trong bao lâu."
      },
      {
        "type": "flow",
        "title": "Từ nhu cầu tới bảng so sánh",
        "steps": [
          {
            "label": "Viết nửa trang mô tả",
            "detail": "Sản phẩm làm gì, loại dữ liệu nào, bao nhiêu người dùng, bạn lo điều gì. Không ghi dữ liệu thật."
          },
          {
            "label": "Nhờ AI soạn câu hỏi",
            "detail": "Nói rõ số câu và ba chủ đề: nơi đặt dữ liệu, sao lưu, hỗ trợ."
          },
          {
            "label": "Bạn lọc câu hỏi",
            "detail": "Bỏ câu thừa, giữ 6-8 câu. Kiểm xem câu nào là điều bạn thật sự lo."
          },
          {
            "label": "Gửi và so câu trả lời",
            "detail": "Mỗi nhà một cột trong bảng. Câu nào trả lời chung chung thì hỏi lại bằng con số."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Soạn câu hỏi cho nhà cung cấp lưu trữ",
        "task": "Phòng bạn cần nơi đặt một biểu mẫu đăng ký hội thảo, khoảng 500 người, có tên và email. Lắp một prompt để AI soạn câu hỏi cho nhà cung cấp.",
        "parts": [
          {
            "id": "product",
            "label": "Sản phẩm",
            "options": [
              {
                "text": "Tôi cần nơi đặt thứ gì đó.",
                "feedback": "AI không biết thứ đó là gì nên hỏi chung chung."
              },
              {
                "text": "Tôi đặt một biểu mẫu đăng ký hội thảo, khoảng 500 người điền tên và email.",
                "good": true,
                "feedback": "Có loại sản phẩm, quy mô và dữ liệu, nên câu hỏi sẽ nhắm vào việc lưu email."
              }
            ]
          },
          {
            "id": "worry",
            "label": "Điều lo nhất",
            "options": [
              {
                "text": "Tôi lo danh sách email bị mất hoặc lộ, và muốn tải danh sách ra khi cần.",
                "good": true,
                "feedback": "Nỗi lo cụ thể nên có câu hỏi về sao lưu, quyền xem và xuất dữ liệu."
              },
              {
                "text": "Tôi lo mọi thứ.",
                "feedback": "Lo mọi thứ nghĩa là không có trọng tâm, câu hỏi sẽ dàn trải."
              }
            ]
          },
          {
            "id": "format",
            "label": "Định dạng",
            "options": [
              {
                "text": "Soạn 7 câu hỏi, chia ba nhóm: nơi đặt dữ liệu, sao lưu, hỗ trợ. Không hỏi giá.",
                "good": true,
                "feedback": "Số câu và nhóm rõ ràng nên danh sách dùng được ngay."
              },
              {
                "text": "Soạn thật nhiều câu hỏi thật hay.",
                "feedback": "Không giới hạn nên AI trả một danh sách dài, câu nào cũng chung."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "product",
              "worry",
              "format"
            ],
            "text": "Nơi đặt dữ liệu\n1. Danh sách email được lưu ở quốc gia nào?\n2. Ai trong công ty của bạn có quyền xem?\nSao lưu\n3. Bao lâu sao lưu một lần, giữ bao lâu?\n4. Đã thử khôi phục bao giờ chưa?\nHỗ trợ\n5. Sự cố báo qua kênh nào, phản hồi trong bao lâu?\n6. Tôi tải danh sách ra dạng bảng bằng cách nào?\n7. Khi chuyển đi, dữ liệu lấy ra thế nào?"
          },
          {
            "requires": [
              "product"
            ],
            "text": "1. Công ty bạn có bao nhiêu năm kinh nghiệm?\n2. Bạn có bao nhiêu khách hàng?\n3. Bạn có chứng chỉ gì?\n...\n\n(Câu hỏi chung vì chưa nói nỗi lo và định dạng.)"
          },
          {
            "text": "1. Hãy cho biết quy mô toàn cầu của nhà cung cấp, với 99,99% thời gian hoạt động...\n\n(AI bịa số liệu vì không được biết bạn cần hỏi gì.)"
          }
        ]
      },
      {
        "type": "callout",
        "label": "Đừng dán dữ liệu thật",
        "text": "Bản mô tả chỉ cần nói \"khoảng 500 email\", không cần dán danh sách. Dữ liệu khách, mật khẩu, hợp đồng không đưa vào ô chat của công cụ công ty chưa duyệt."
      },
      {
        "type": "scenario",
        "title": "Nhà cung cấp trả lời \"rất an toàn\"",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn gửi bảy câu hỏi. Nhà cung cấp trả lời mọi câu bằng \"hệ thống chúng tôi rất an toàn và đáng tin cậy\".",
            "choices": [
              {
                "label": "Ghi nhận là đạt vì họ trả lời nhanh và lịch sự",
                "next": "bad_accept"
              },
              {
                "label": "Hỏi lại ba câu then chốt bằng con số: sao lưu mấy giờ một lần, giữ bao lâu, đã thử khôi phục chưa",
                "next": "s2"
              }
            ]
          },
          "bad_accept": {
            "text": "Bạn chọn nhà này. Ba tháng sau biểu mẫu hỏng, họ chỉ có một bản sao lưu cũ hai tuần, và 300 đăng ký biến mất.",
            "ending": "bad"
          },
          "s2": {
            "text": "Nhà cung cấp trả lời: sao lưu mỗi ngày, giữ 30 ngày, đã thử khôi phục hằng quý. Một nhà khác vẫn chỉ nói chung chung.",
            "choices": [
              {
                "label": "Loại nhà vẫn trả lời chung chung, đưa bảng so sánh cho sếp",
                "next": "good"
              },
              {
                "label": "Chọn nhà chung chung vì giá rẻ hơn",
                "next": "bad_price"
              }
            ]
          },
          "bad_price": {
            "text": "Nhà rẻ hơn không thể nói rõ khi nào khôi phục được dữ liệu. Khi có sự cố, bạn không có kế hoạch nào.",
            "ending": "bad"
          },
          "good": {
            "text": "Sếp nhìn bảng thấy ngay nhà nào trả lời đủ, và ký với nhà có quy trình khôi phục rõ ràng.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Nói rõ nhu cầu thì câu hỏi mới đúng, và câu trả lời chung chung cần được hỏi lại.",
          "Bài sau: dự án nhỏ, đưa thử một trang tĩnh lên mạng."
        ]
      }
    ]
  },
  {
    "track": "personal",
    "isFundamental": false,
    "id": 2584,
    "slug": "du-an-nho-dua-mot-trang-tinh-len-mang-thu-nghiem",
    "title": "Chặng 59, Bài 5: Dự án nhỏ: đưa một trang tĩnh lên và mở bằng điện thoại",
    "subtitle": "Đưa lên, mở bằng mạng khác, ghi lại địa chỉ và cách gỡ xuống.",
    "duration": "10 phút",
    "difficulty": "Dễ",
    "emoji": "🚀",
    "whyItMatters": "Đọc về việc đưa trang lên mạng thì dễ, nhưng chỉ khi bạn làm một lần từ đầu tới cuối mới biết chỗ vấp. Một trang thử không chứa thông tin thật là bài tập an toàn: nếu sai, bạn chỉ cần gỡ xuống.",
    "openingQuestion": "Bạn vừa đưa một trang thử lên mạng và mở được trên máy tính ở công ty. Bước nào đáng làm tiếp theo nhất để biết người ngoài thấy gì?",
    "openingOptions": [
      "Mở đường dẫn bằng điện thoại ở mạng 4G, tắt Wi-Fi công ty",
      "Mở lại trên chính máy tính đó nhưng bằng một trình duyệt khác",
      "Gửi cho cả công ty để xem ai báo lỗi trước rồi mới sửa",
      "Chờ một ngày để trang ổn định rồi mới mở lại thử lần nữa"
    ],
    "correctOption": 0,
    "explanation": "Mạng công ty có thể cho bạn thấy những thứ người ngoài không thấy, hoặc ngược lại. Điện thoại ở mạng 4G là góc nhìn của một người lạ: nếu trang mở được, nó đã công khai thật. Mở trên trình duyệt khác cùng máy vẫn cùng mạng nên không cho thông tin mới. Gửi cả công ty là dùng đồng nghiệp làm người thử mà chưa tự thử, còn chờ một ngày thì không thêm gì.",
    "diagram": [
      {
        "label": "Tạo một trang thử không chứa thông tin thật",
        "arrow": true
      },
      {
        "label": "Đưa trang lên và bật chế độ công khai",
        "arrow": true
      },
      {
        "label": "Mở bằng điện thoại ở mạng khác",
        "arrow": true
      },
      {
        "label": "Ghi địa chỉ, chỗ đặt và cách gỡ xuống"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một chuyên viên đào tạo tạo trang thử chỉ có một dòng \"Trang thử của Lan\". Cô đưa lên, mở bằng 4G thấy đúng, ghi địa chỉ vào một ghi chú chung, rồi gỡ xuống sau hai ngày. Nhờ ghi lại cách gỡ, đồng nghiệp sau này làm lại được chỉ trong 10 phút."
    },
    "quiz": [
      {
        "question": "Vì sao trang thử nên chỉ có nội dung vô hại như một dòng chữ?",
        "options": [
          "Nếu có lỗi cấu hình, thứ bị lộ ra chẳng có gì để mất",
          "Vì trang có nhiều nội dung sẽ chạy chậm hơn trên điện thoại",
          "Vì nhà cung cấp không cho trang thử có nhiều chữ",
          "Vì dòng chữ đơn giản giúp trang không cần địa chỉ riêng"
        ],
        "correct": 0,
        "explanation": "Mục tiêu của trang thử là học cách làm, không phải ra mắt nội dung. Nội dung vô hại giúp lỗi công khai không gây hậu quả. Tốc độ, giới hạn của nhà cung cấp hay việc địa chỉ không liên quan."
      },
      {
        "question": "Điện thoại ở mạng 4G cho bạn biết điều gì mà máy ở công ty không cho biết?",
        "options": [
          "Người ở ngoài mạng công ty có thực sự mở được trang không",
          "Trang có đẹp hơn trên màn hình nhỏ hay không",
          "Công ty đã mua đúng gói dịch vụ hay chưa",
          "Đồng nghiệp nào đã mở thử trang trước bạn"
        ],
        "correct": 0,
        "explanation": "Mạng công ty có thể thấy trang mà người ngoài không thấy hoặc ngược lại. 4G đại diện cho một người lạ. Đó là kiểm tra truy cập, không phải kiểm tra giao diện hay gói dịch vụ."
      },
      {
        "question": "Sau khi thử xong, bạn nên ghi lại điều gì?",
        "options": [
          "Địa chỉ trang, nơi đặt, tài khoản quản lý và cách gỡ xuống",
          "Chỉ địa chỉ trang, vì các thông tin còn lại ai cũng nhớ được",
          "Chỉ ngày thử, để biết đã làm lần gần nhất là khi nào",
          "Không cần ghi gì, vì trang thử sẽ tự xoá sau vài ngày"
        ],
        "correct": 0,
        "explanation": "Trang thử không tự xoá. Nếu quên, nó nằm đó mở với cả thế giới. Ghi nơi đặt, tài khoản và cách gỡ giúp dọn sạch khi xong, và giúp người khác làm lại."
      },
      {
        "question": "Trang thử mở được trên 4G. Điều đó có nghĩa là gì?",
        "options": [
          "Trang đã công khai thật, ai có đường dẫn đều mở được",
          "Trang chỉ công khai cho những người đã từng đăng nhập trước",
          "Trang đã được kiểm tra bảo mật đầy đủ bởi nhà cung cấp",
          "Trang sẽ tự động có mặt trên kết quả tìm kiếm ngay hôm nay"
        ],
        "correct": 0,
        "explanation": "Mở được từ mạng ngoài nghĩa là không có khoá ở cửa. Nó không chứng tỏ đã qua kiểm tra bảo mật nào, và việc xuất hiện trên tìm kiếm là chuyện khác, không chắc chắn và không nhanh."
      },
      {
        "question": "Trang thử xong việc. Cách làm đúng nhất là gì?",
        "options": [
          "Gỡ trang xuống theo cách đã ghi, rồi mở lại đường dẫn để xác nhận nó không còn",
          "Để đó, vì một trang nhỏ không tốn gì và không ai để ý",
          "Đổi nội dung thành một dòng chữ khác rồi để lại làm kỷ niệm",
          "Xoá tệp ở máy tính của bạn là trang trên mạng sẽ tự biến mất"
        ],
        "correct": 0,
        "explanation": "Trang trên mạng độc lập với tệp ở máy bạn: xoá ở máy không gỡ được trang trên mạng. Để lại thì có nguy cơ quên và bị dùng sai. Sau khi gỡ, mở lại đường dẫn để chắc nó không còn."
      }
    ],
    "keyTakeaways": [
      "Dùng trang thử không chứa thông tin thật.",
      "Mở bằng 4G để biết người ngoài thấy gì.",
      "Ghi địa chỉ, nơi đặt, tài khoản và cách gỡ.",
      "Mở được từ ngoài mạng nghĩa là đã công khai thật.",
      "Gỡ xuống khi xong và kiểm lại."
    ],
    "practicePrompt": {
      "question": "Bạn đưa trang thử lên và quên ghi cách gỡ. Một tháng sau đồng nghiệp hỏi \"trang này của ai\". Bạn đáng ra nên làm gì từ đầu?",
      "options": [
        "Ghi ngay địa chỉ, nơi đặt, tài khoản và cách gỡ khi vừa đưa lên",
        "Đặt tên trang thật dễ nhớ để ai cũng tự đoán ra là của bạn",
        "Gửi đường dẫn vào nhóm chung cho mọi người tự chịu trách nhiệm",
        "Chờ khi nào có người hỏi rồi mới nghĩ tới việc ghi lại cũng được"
      ],
      "correct": 0,
      "explanation": "Ghi lúc vừa làm là lúc bạn nhớ rõ nhất. Tên dễ nhớ không cho biết ai quản lý, gửi nhóm chung làm nhiều người có đường dẫn mà không ai chịu trách nhiệm, còn chờ có người hỏi thì thường đã quá muộn."
    },
    "summary": {
      "keyIdea": "Làm một lần trang thử từ đầu tới cuối, rồi gỡ sạch.",
      "formula": "Trang vô hại → đưa lên → mở bằng 4G → ghi lại → gỡ xuống.",
      "commonMistake": "Bỏ quên trang thử sau khi xong.",
      "action": "Làm theo mô phỏng bên dưới rồi viết ghi chú ba dòng."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Làm một trang thử chỉ có một dòng chữ như \"Trang thử của tôi\" (hoặc dùng mô phỏng trong bài). Khi đưa lên, mở bằng điện thoại ở mạng 4G, rồi ghi ba dòng: địa chỉ, nơi đặt, cách gỡ. Nếu công ty có quy định về đưa trang lên mạng, hỏi IT trước khi làm thật.",
      "secondary": "Nếu làm thật, nhớ gỡ xuống và mở lại đường dẫn để chắc nó đã biến mất."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Hôm nay bạn làm thật một lần từ đầu tới cuối: đưa một trang thử lên, mở bằng điện thoại ở mạng khác, ghi lại rồi gỡ. Chính những lần đầu vấp này mới dạy bạn nhiều nhất."
      },
      {
        "type": "feynman",
        "title": "Đưa trang thử lên đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới việc dán một tờ thông báo thử lên bảng tin toà nhà: bạn dán, đi ra ngoài nhìn thử, ghi lại dán ở đâu, rồi gỡ xuống.",
        "columns": [
          "Ý",
          "Chuyện bảng tin",
          "Chuyện trang thử"
        ],
        "rows": [
          [
            "Tờ giấy thử",
            "Viết vài chữ vô hại",
            "Trang thử có một dòng chữ"
          ],
          [
            "Dán lên bảng tin",
            "Ai đi ngang cũng đọc được",
            "Công khai trang: ai có đường dẫn đều mở được"
          ],
          [
            "Ra ngoài nhìn thử",
            "Đứng ở vị trí người lạ",
            "Mở bằng 4G ở mạng khác"
          ],
          [
            "Ghi và gỡ",
            "Ghi chỗ dán, rồi gỡ tờ giấy",
            "Ghi nơi đặt và gỡ trang xuống"
          ]
        ],
        "oneLiner": "Dán thử, nhìn từ ngoài vào, ghi lại, gỡ xuống."
      },
      {
        "type": "heading",
        "text": "Vấn đề: lần đầu nào cũng có một chỗ vấp"
      },
      {
        "type": "paragraph",
        "text": "Những chỗ vấp thường gặp là quên tệp trang chính, quên bật chế độ công khai, hoặc thấy mở được trên máy mình mà người ngoài không mở được. Làm một lần với trang vô hại là cách rẻ nhất để gặp mọi chỗ vấp này."
      },
      {
        "type": "flow",
        "title": "Năm bước cho một trang thử",
        "steps": [
          {
            "label": "Tạo trang thật đơn giản",
            "detail": "Một dòng chữ như \"Trang thử của tôi\". Không có tên khách, số liệu hay email thật."
          },
          {
            "label": "Đưa trang lên một chỗ chứa tệp",
            "detail": "Tải tệp trang chính lên chỗ chứa. Kiểm xem tên tệp chính xác như yêu cầu."
          },
          {
            "label": "Bật chế độ trang web và công khai",
            "detail": "Đây là bước khiến người ngoài mở được, nên chỉ làm với trang vô hại."
          },
          {
            "label": "Mở bằng mạng khác",
            "detail": "Điện thoại ở mạng 4G, tắt Wi-Fi công ty, mở đúng đường dẫn."
          },
          {
            "label": "Ghi lại rồi gỡ xuống",
            "detail": "Ghi địa chỉ, nơi đặt, tài khoản và cách gỡ. Khi xong, gỡ và mở lại đường dẫn để kiểm."
          }
        ]
      },
      {
        "type": "sim",
        "tool": "cloud",
        "mission": "static-website",
        "title": "Đưa một trang tĩnh lên trong môi trường mô phỏng",
        "task": "Làm theo nhiệm vụ trong mô phỏng: tải trang lên chỗ chứa, bật chế độ trang web và công khai. Môi trường này chỉ để tập, không có dữ liệu thật."
      },
      {
        "type": "callout",
        "label": "Trước khi làm thật",
        "text": "Mô phỏng thì thoải mái. Khi làm thật, hỏi IT xem công ty có quy định về đưa trang lên mạng không, và chỉ dùng nội dung vô hại. Không đặt bất cứ tệp nào có tên khách, số liệu hay email thật."
      },
      {
        "type": "scenario",
        "title": "Trang thử chạy trên máy nhưng người ngoài không thấy",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn đã đưa trang thử lên và mở được trên máy công ty. Đồng nghiệp ở nhà nhắn: \"mình vẫn không mở được\".",
            "choices": [
              {
                "label": "Bảo đồng nghiệp đổi trình duyệt, chắc là lỗi của họ",
                "next": "bad_blame"
              },
              {
                "label": "Tự mở bằng điện thoại ở 4G để xem mình có thấy không",
                "next": "s2"
              }
            ]
          },
          "bad_blame": {
            "text": "Đồng nghiệp đổi ba trình duyệt vẫn không mở. Bạn mất một buổi chiều để nhận ra bạn chưa bật chế độ công khai.",
            "ending": "bad"
          },
          "s2": {
            "text": "Trên 4G, bạn cũng không mở được. Vậy trang chỉ mở được trong mạng công ty, chưa công khai.",
            "choices": [
              {
                "label": "Kiểm lại bước bật chế độ công khai, bật rồi mở lại bằng 4G",
                "next": "s3"
              },
              {
                "label": "Để nguyên và bảo đồng nghiệp vào công ty mà xem",
                "next": "bad_skip"
              }
            ]
          },
          "bad_skip": {
            "text": "Việc thử nghiệm không đạt mục tiêu: bạn chưa học được cách công khai, và lần sau vẫn vấp đúng chỗ đó.",
            "ending": "bad"
          },
          "s3": {
            "text": "Trên 4G trang đã mở được. Đồng nghiệp ở nhà cũng thấy. Giờ còn việc dọn.",
            "choices": [
              {
                "label": "Ghi địa chỉ, nơi đặt, cách gỡ, rồi gỡ trang và mở lại để kiểm",
                "next": "good"
              },
              {
                "label": "Để trang lại cho đẹp hồ sơ, sau này tính tiếp",
                "next": "bad_leave"
              }
            ]
          },
          "bad_leave": {
            "text": "Trang thử còn đó sáu tháng. Khi IT quét, họ phải đi hỏi ai là chủ, và không ai nhớ.",
            "ending": "bad"
          },
          "good": {
            "text": "Bạn có ghi chú ba dòng. Lần sau, bạn hoặc đồng nghiệp làm lại chỉ trong 10 phút và biết cách dọn sạch.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Làm một lần trang thử từ đầu tới cuối, rồi ghi lại và gỡ sạch.",
          "Bài sau: ổ khoá HTTPS nghĩa là gì và không có nghĩa là gì."
        ]
      }
    ]
  }
];
