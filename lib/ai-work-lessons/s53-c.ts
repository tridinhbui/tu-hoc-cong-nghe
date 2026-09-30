import type { Lesson } from "../lesson-types";

// Chặng 53, bài 11-15. Giáo trình: scripts/curriculum/stage-53.json.
// Nội dung chung về công cụ (không nêu nút bấm hay phiên bản), nên không cần nguồn tài liệu riêng.
export const S53_C_LESSONS: Lesson[] = [
  {
    "id": 2470,
    "slug": "dat-ten-tep-tu-dong-de-ba-thang-sau-van-tim-ra",
    "title": "Chặng 53, Bài 11: Đặt tên tệp tự động để ba tháng sau vẫn tìm ra",
    "subtitle": "Tên tệp là nhãn gáy hồ sơ: viết đúng một lần, cả nhóm tìm ra trong mười giây.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "🏷️",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Nửa giờ tìm 'bao gia final 2' không nằm ở việc tìm, mà ở việc tên tệp không nói gì. Khi luồng tự động lưu tệp hộ bạn, tên cũng phải do luồng đặt theo một quy ước cố định; nếu không, tự động hoá chỉ giúp bạn tạo ra đống tệp lộn xộn nhanh hơn.",
    "openingQuestion": "Thư mục chung có 'bao gia final', 'bao gia final 2' và 'bao gia final that'. Bạn cần bản gửi khách tuần trước. Cách đặt tên nào tránh được cảnh này?",
    "openingOptions": [
      "Ngày, đối tác, loại tệp, theo đúng một thứ tự cố định",
      "Thêm chữ 'final' và số thứ tự mỗi lần sửa bản báo giá",
      "Đặt tên thật ngắn gọn để nhìn thư mục cho đỡ rối mắt",
      "Để mỗi người tự đặt theo cách mình nhớ nhất cho tiện"
    ],
    "correctOption": 0,
    "explanation": "Tên tệp tốt trả lời được ba câu hỏi mà không cần mở tệp: khi nào, với ai, là loại gì. Khi cả nhóm dùng cùng một thứ tự, bạn chỉ cần nhớ quy ước chứ không phải nhớ từng tệp. 'Final 2' chỉ cho biết có nhiều hơn một bản, không cho biết bản nào đến từ đâu. Tên ngắn và mỗi người một kiểu thì mỗi người tìm theo trí nhớ riêng, còn người khác thì bó tay.",
    "diagram": [
      {
        "label": "Lấy dữ kiện từ chính tệp (ngày, đối tác, loại)",
        "arrow": true
      },
      {
        "label": "Ghép theo quy ước: ngày_đối tác_loại_bản",
        "arrow": true
      },
      {
        "label": "Luồng lưu tệp vào thư mục với tên đã chuẩn hoá",
        "arrow": true
      },
      {
        "label": "Ba tháng sau: tìm bằng vài chữ đầu của tên"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: phòng kinh doanh 5 người",
      "description": "Mỗi người đặt tên báo giá một kiểu nên khi khách hỏi lại điều khoản cũ, cả phòng mất gần nửa giờ mở từng tệp. Trưởng phòng chốt một quy ước gồm ngày theo năm-tháng-ngày, tên đối tác, loại tệp và số bản, rồi nhờ luồng tự động đổi tên theo đúng khuôn. Đây là tình huống minh hoạ, không phải số liệu đo được."
    },
    "quiz": [
      {
        "question": "Vì sao nên ghi ngày theo dạng năm-tháng-ngày ở đầu tên tệp?",
        "options": [
          "Excel không mở được tệp có tên bắt đầu bằng chữ cái",
          "Xếp theo tên cũng là xếp theo thời gian",
          "Dạng ngày-tháng-năm bị cấm trong mọi hệ điều hành",
          "Ngày đặt ở cuối thì máy tự cắt mất phần đuôi tên tệp"
        ],
        "correct": 1,
        "explanation": "Khi năm đứng trước tháng và tháng đứng trước ngày, danh sách xếp theo chữ cái cũng là xếp đúng theo thời gian. Ba phương án còn lại đều là điều không có thật: tệp bắt đầu bằng chữ vẫn mở được, không có lệnh cấm định dạng ngày-tháng-năm (chỉ dấu gạch chéo gây rắc rối), và tên không bị cắt chỉ vì ngày nằm ở cuối."
      },
      {
        "question": "Tên nào ba tháng sau vẫn cho bạn biết tệp là gì mà không cần mở?",
        "options": [
          "BaoGia_final_moi_nhat_sua_lan_3",
          "Bao gia Minh Phat (cuoi cung) (2)",
          "2025-10-14_MinhPhat_BaoGia_v2",
          "Tep gui khach hom thu Ba tuan truoc"
        ],
        "correct": 2,
        "explanation": "Chỉ tên đầu tiên có đủ ngày, đối tác, loại và số bản theo một thứ tự cố định. 'Final, mới nhất, sửa lần 3' mô tả tâm trạng người đặt chứ không mô tả tệp; tên có dấu ngoặc và số trong ngoặc là dấu vết của việc lưu trùng; còn tên kể chuyện chỉ đúng trong trí nhớ của một người vào một tuần."
      },
      {
        "question": "Luồng tự động nên lấy dữ kiện để đặt tên tệp từ đâu?",
        "options": [
          "Từ nội dung hoặc thông tin có sẵn của chính tệp đó",
          "Từ giờ máy tính của người vừa mở thư mục chung",
          "Từ tên tệp gốc, giữ nguyên rồi thêm chữ tự động ở cuối",
          "Từ trí nhớ của người chạy luồng, nhập tay mỗi lần một lần"
        ],
        "correct": 0,
        "explanation": "Dữ kiện đặt tên phải đến từ tệp hoặc từ thư đi kèm: ngày trong tài liệu, tên đối tác ở người gửi, loại tệp ở phần đuôi. Giờ máy của người mở thư mục không liên quan tới tệp; giữ tên gốc rồi thêm đuôi chỉ kéo theo sự lộn xộn cũ; còn nhập tay mỗi lần thì đã không còn là tự động và lại phụ thuộc trí nhớ."
      },
      {
        "question": "Hai tệp sinh ra cùng ngày, cùng đối tác, cùng loại. Quy ước nên xử lý thế nào?",
        "options": [
          "Cho tệp sau ghi đè lên tệp trước vì cùng tên rồi",
          "Có thêm số bản hoặc giờ phút để tên không bao giờ trùng",
          "Bỏ hẳn ngày khỏi tên để hai tệp cùng vào một nhóm",
          "Đặt thêm chữ \"moi\" để phân biệt với tệp đã có từ trước đó"
        ],
        "correct": 1,
        "explanation": "Quy ước cần một phần luôn khác nhau giữa hai tệp, như số bản (v1, v2) hoặc giờ phút. Cho ghi đè là mất tệp cũ mà không ai hay. Bỏ ngày làm mất trục thời gian đang giúp tìm. Chữ 'mới' chỉ đúng ở hôm nay: tuần sau lại có tệp mới hơn, và hai chữ 'mới' cùng nằm trong thư mục."
      },
      {
        "question": "Ký tự nào nên tránh trong tên tệp do luồng tự động tạo ra?",
        "options": [
          "Dấu gạch dưới dùng để tách các phần của tên tệp",
          "Chữ số ở đầu, vì chữ số làm máy nhận nhầm là mật khẩu",
          "Khoảng trắng thừa, dấu gạch chéo và ký tự đặc biệt",
          "Chữ in hoa, vì chữ in hoa luôn làm tệp bị khoá lại"
        ],
        "correct": 2,
        "explanation": "Khoảng trắng thừa, gạch chéo và các ký hiệu đặc biệt dễ làm đường dẫn sai hoặc làm bước sau của luồng không đọc được tên. Gạch dưới là cách tách phần an toàn nhất. Chữ số đầu tên lại là cách xếp ngày hay dùng, còn chữ in hoa không hề khoá tệp."
      }
    ],
    "keyTakeaways": [
      "Tên tệp phải trả lời: khi nào, với ai, là loại gì.",
      "Ngày theo năm-tháng-ngày đặt đầu tên để xếp theo thời gian.",
      "Luồng lấy dữ kiện từ tệp rồi ghép theo một khuôn cố định.",
      "Thêm số bản hoặc giờ phút để hai tệp không trùng tên.",
      "Tránh khoảng trắng thừa và ký tự đặc biệt trong tên."
    ],
    "practicePrompt": {
      "question": "Chị Hoa dặn luồng: lưu hợp đồng của khách vào thư mục chung. Tên nào hợp quy ước 'ngày_đối tác_loại'?",
      "options": [
        "2025-11-03_HoaBinh_HopDong",
        "HopDong_moi_nhat_cua_khach_Hoa_Binh",
        "hop dong hoa binh ngay 3 thang 11",
        "HopDong (2) - ban sua cuoi"
      ],
      "correct": 0,
      "explanation": "Chỉ tên đầu tiên theo đúng khuôn ngày, đối tác, loại và không có khoảng trắng. Ba tên còn lại hoặc thiếu ngày, hoặc dùng khoảng trắng và số trong ngoặc, hoặc chỉ là mô tả bằng lời, nên luồng khác lại đặt ra một kiểu khác."
    },
    "summary": {
      "keyIdea": "Tên tệp là nhãn hồ sơ; để luồng đặt tên theo một khuôn cố định.",
      "formula": "ngày (năm-tháng-ngày) + đối tác + loại + số bản",
      "commonMistake": "Đặt tên kể lại tâm trạng ('final', 'mới nhất') thay vì nêu dữ kiện.",
      "action": "Viết quy ước đặt tên của bạn thành một dòng và dán vào thư mục chung."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Mở thư mục bạn hay dùng nhất. Chọn 10 tệp có tên khó hiểu, viết cho mỗi tệp tên mới theo khuôn 'ngày_đối tác_loại_bản' vào một ghi chú. Sau đó viết quy ước thành một dòng, ví dụ 2025-10-14_TenDoiTac_BaoGia_v1, để ngày mai nhờ luồng đặt tên theo đúng dòng đó.",
      "secondary": "Đếm xem trong 10 tệp, bao nhiêu tệp bạn phải mở ra mới biết nó là gì. Con số đó là lý do quy ước đáng viết."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Một buổi chiều bạn cần bản báo giá đã gửi khách tuần trước, và thư mục chung có ba tệp tên 'bao gia final', 'bao gia final 2', 'bao gia final that'. Bài này dạy bạn đặt một quy ước tên để cả bạn lẫn luồng tự động đều tìm và lưu đúng."
      },
      {
        "type": "feynman",
        "title": "Đặt tên tệp đơn giản hơn bạn nghĩ",
        "intro": "Hãy nhìn một tủ hồ sơ giấy: mỗi hồ sơ có nhãn trên gáy, viết theo cùng một kiểu. Bạn không mở từng hồ sơ để biết bên trong có gì.",
        "columns": [
          "Thành phần",
          "Nhãn trên gáy hồ sơ",
          "Tên tệp"
        ],
        "rows": [
          [
            "Khi nào",
            "Ngày lập hồ sơ",
            "Ngày ở đầu tên, năm trước rồi tháng, ngày"
          ],
          [
            "Với ai",
            "Tên khách hàng",
            "Tên đối tác hoặc phòng ban"
          ],
          [
            "Là gì",
            "Loại: hợp đồng, báo giá",
            "Loại tệp: BaoGia, HopDong, BienBan"
          ],
          [
            "Bản nào",
            "Hồ sơ gốc hay bản sao",
            "Số bản: v1, v2"
          ]
        ],
        "oneLiner": "Tên tệp là nhãn gáy hồ sơ: cùng một khuôn thì người lẫn luồng tự động đều tìm ra."
      },
      {
        "type": "heading",
        "text": "Bốn phần của một tên tệp tốt"
      },
      {
        "type": "paragraph",
        "text": "Một quy ước gọn gồm bốn phần: ngày, đối tác, loại, số bản, tách nhau bằng gạch dưới. Ví dụ 2025-10-14_MinhPhat_BaoGia_v2. Ngày đặt đầu tiên theo dạng năm-tháng-ngày để danh sách tự xếp theo thời gian. Quy ước không cần hoàn hảo, chỉ cần cả nhóm cùng dùng."
      },
      {
        "type": "list",
        "items": [
          "Ngày đầu tiên, dạng năm-tháng-ngày, để xếp theo thời gian.",
          "Tên đối tác viết liền, không khoảng trắng, không dấu nếu hệ thống của bạn hay lỗi tiếng Việt.",
          "Loại tệp lấy từ một danh sách ngắn cả nhóm đã thống nhất.",
          "Số bản (v1, v2) thay cho chữ 'final' để hai tệp không trùng."
        ]
      },
      {
        "type": "flow",
        "title": "Luồng đặt tên tự động đi qua các bước nào",
        "steps": [
          {
            "label": "Có tệp mới",
            "detail": "Một tệp đính kèm vừa về hoặc vừa được lưu. Luồng bắt đầu từ sự kiện này, không từ việc bạn nhớ ra."
          },
          {
            "label": "Lấy dữ kiện",
            "detail": "Luồng đọc ngày từ thư, tên đối tác từ người gửi và loại từ phần đuôi hoặc từ tiêu đề. Chỗ nào không chắc, nó đánh dấu chờ người xem."
          },
          {
            "label": "Ghép theo khuôn",
            "detail": "Bốn phần được nối bằng gạch dưới theo đúng thứ tự quy ước; ký tự lạ bị bỏ."
          },
          {
            "label": "Kiểm trùng tên",
            "detail": "Nếu đã có tên này, luồng tăng số bản thay vì ghi đè."
          },
          {
            "label": "Lưu vào thư mục",
            "detail": "Tệp được lưu, nhật ký ghi tên mới để bạn soát lại khi cần."
          }
        ]
      },
      {
        "type": "callout",
        "label": "Cẩn thận: đổi tên sai hàng loạt",
        "text": "Luồng đổi tên sai thì sai cả trăm tệp trong một phút. Lần đầu hãy chạy trên năm tệp thử, xem tên ra có đúng khuôn không rồi mới bật cho cả thư mục."
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Dặn AI viết quy ước đặt tên cho luồng",
        "task": "Bạn cần AI soạn quy ước đặt tên tệp cho phòng kinh doanh để dán vào luồng. Lắp yêu cầu cho đủ dữ kiện.",
        "parts": [
          {
            "id": "context",
            "label": "Bối cảnh",
            "options": [
              {
                "text": "Tôi làm phòng kinh doanh, nhận báo giá và hợp đồng của khoảng 15 đối tác, thư mục chung cả nhóm 5 người dùng.",
                "good": true,
                "feedback": "Đủ người, loại tệp và quy mô - AI đề xuất khuôn hợp với phòng của bạn."
              },
              {
                "text": "Tôi muốn thư mục gọn hơn.",
                "feedback": "Quá chung - AI sẽ đưa lời khuyên ai cũng áp dụng được, không có khuôn cụ thể."
              }
            ]
          },
          {
            "id": "task",
            "label": "Việc cần làm",
            "options": [
              {
                "text": "Đặt tên sao cho hay.",
                "feedback": "Không đo được 'hay' - AI đưa ra tên dài, nhiều chữ trang trí."
              },
              {
                "text": "Đề xuất một khuôn đặt tên gồm ngày, đối tác, loại, số bản, kèm 3 ví dụ.",
                "good": true,
                "feedback": "Có khuôn và có ví dụ để bạn kiểm ngay bằng mắt."
              }
            ]
          },
          {
            "id": "limit",
            "label": "Giới hạn",
            "options": [
              {
                "text": "Không khoảng trắng và không ký tự đặc biệt, tối đa 50 ký tự, ngày theo năm-tháng-ngày.",
                "good": true,
                "feedback": "Giới hạn cụ thể, luồng đọc được và tên không bị cắt giữa chừng."
              },
              {
                "text": "Càng đẹp càng tốt.",
                "feedback": "Đẹp không phải giới hạn - AI có thể cho tên có dấu gạch chéo làm luồng báo lỗi."
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
            "text": "Quy ước: ngày_đối tác_loại_bản. Ví dụ:\n- 2025-10-14_MinhPhat_BaoGia_v1\n- 2025-10-20_AnKhang_HopDong_v2\n- 2025-11-03_HoaBinh_BienBan_v1\nLuật: không khoảng trắng, không ký tự đặc biệt, tối đa 50 ký tự, ngày theo năm-tháng-ngày."
          },
          {
            "requires": [
              "context"
            ],
            "text": "Bạn nên đặt tên rõ ràng, có ngày, có tên khách, dùng thống nhất trong nhóm...\n(Có bối cảnh nhưng thiếu khuôn và giới hạn, nên chỉ ra lời khuyên chung chung, chưa dán được vào luồng.)"
          },
          {
            "text": "Tên tệp đẹp: 'Tài_liệu_quan_trọng_của_chúng_ta/2025'...\n(Thiếu dữ kiện nên AI tự chế, lại có dấu gạch chéo làm luồng báo lỗi.)"
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Luồng đổi tên lần đầu chạy",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn dựng xong luồng đặt tên theo quy ước. Thư mục chung có 400 tệp cũ và một thông báo ngày mai bạn sẽ nghỉ phép.",
            "choices": [
              {
                "label": "Bật luồng đổi tên cho cả 400 tệp ngay chiều nay rồi đi về",
                "next": "bad"
              },
              {
                "label": "Chạy thử trên 5 tệp và xem tên ra có đúng khuôn không",
                "next": "s2"
              }
            ]
          },
          "bad": {
            "text": "Luồng hiểu nhầm tên đối tác ở một loại thư và đổi cả 60 tệp thành cùng một tên. Sáng hôm sau đồng nghiệp không tìm ra báo giá nào, và bạn đang nghỉ phép.",
            "ending": "bad"
          },
          "s2": {
            "text": "Cả 5 tệp ra đúng khuôn, trừ một tệp không có ngày nên tên thiếu phần đầu.",
            "choices": [
              {
                "label": "Bổ sung bước: tệp thiếu ngày thì gắn nhãn 'CanXem' và chuyển riêng ra chờ người kiểm",
                "next": "good"
              },
              {
                "label": "Bỏ qua, vì chỉ một trong năm tệp lỗi",
                "next": "bad2"
              }
            ]
          },
          "bad2": {
            "text": "Với 400 tệp, tỷ lệ đó thành hàng chục tệp tên lệch khuôn, nằm lẫn trong thư mục. Khi cần, bạn lại phải mở từng tệp - đúng việc luồng sinh ra để tránh.",
            "ending": "bad"
          },
          "good": {
            "text": "Tệp thiếu ngày được gom vào một thư mục riêng để bạn xem. Sau khi bổ sung, bạn bật luồng cho cả thư mục, và đồng nghiệp tìm đúng tệp trong vài giây.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Một khuôn tên, dữ kiện lấy từ tệp, thử trên vài tệp trước.",
          "Bài sau: khi luồng tự chuyển tệp vào thư mục, quy tắc nào làm mất tệp."
        ]
      }
    ]
  },
  {
    "id": 2471,
    "slug": "chuyen-va-sap-xep-tep-vao-thu-muc-theo-quy-tac",
    "title": "Chặng 53, Bài 12: Chuyển tệp vào thư mục theo quy tắc, và quy tắc nào dễ làm mất tệp",
    "subtitle": "Chuyển tệp như xếp sách lên kệ: sách trùng mã không được đẩy sách cũ ra khỏi kệ.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "🗂️",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Sắp xếp tay tệp theo tháng là việc lặp lại, nên rất hợp để luồng làm hộ. Nhưng một quy tắc viết vội có thể ghi đè lên tệp trùng tên, và tệp bị ghi đè thường không còn đường về. Biết chỗ nào quy tắc làm mất tệp là phần quan trọng nhất của bài.",
    "openingQuestion": "Cuối tháng bạn kéo 80 tệp vào thư mục 'Tháng 10'. Bạn nhờ luồng làm việc này. Điều gì cần hỏi trước tiên trước khi bật luồng?",
    "openingOptions": [
      "Nếu thư mục đích đã có tệp cùng tên thì luồng làm gì",
      "Luồng có chạy nhanh hơn việc kéo thả bằng tay hay không",
      "Thư mục đích nên đặt biểu tượng màu gì cho dễ nhìn nhất",
      "Luồng có cần bật vào đúng 6 giờ sáng mỗi ngày hay không"
    ],
    "correctOption": 0,
    "explanation": "Quy tắc chuyển tệp có ba phần: điều kiện chọn tệp, thư mục đích và việc làm khi tên bị trùng. Phần thứ ba hay bị bỏ qua vì lần thử đầu không có tệp trùng. Khi có tệp trùng mà quy tắc chọn 'ghi đè', tệp cũ biến mất. Tốc độ, màu biểu tượng và giờ chạy đều sửa được sau; một tệp bị ghi đè thì không chắc sửa được.",
    "diagram": [
      {
        "label": "Chọn tệp theo điều kiện (loại, ngày, tên)",
        "arrow": true
      },
      {
        "label": "Kiểm thư mục đích: đã có tệp cùng tên chưa",
        "arrow": true
      },
      {
        "label": "Trùng tên: đổi tên hoặc để lại, không ghi đè",
        "arrow": true
      },
      {
        "label": "Chuyển tệp và ghi vào nhật ký"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: bộ phận hành chính 4 người",
      "description": "Bộ phận này cho luồng chuyển mọi tệp 'Bang_luong' sang thư mục tháng. Tháng sau có hai tệp cùng tên, và quy tắc ghi đè làm tệp của chi nhánh này mất đúng vào ngày chốt sổ. Họ sửa quy tắc thành 'trùng tên thì thêm số bản' và bật thư mục phục hồi. Đây là tình huống minh hoạ."
    },
    "quiz": [
      {
        "question": "Quy tắc nào dễ làm mất tệp nhất khi luồng chuyển tệp vào thư mục?",
        "options": [
          "Gắn thêm số bản khi gặp tên trùng ở thư mục đích",
          "Ghi đè khi tên tệp trùng với tệp đã có",
          "Sao chép tệp sang đích rồi giữ nguyên tệp nguồn",
          "Chỉ chọn tệp có đuôi .xlsx và bỏ qua các tệp khác"
        ],
        "correct": 1,
        "explanation": "Ghi đè là lệnh duy nhất trong bốn phương án làm tệp cũ biến mất. Thêm số bản giữ cả hai tệp; sao chép giữ cả nguồn lẫn đích; chọn theo đuôi chỉ thu hẹp tập tệp cần chuyển, không xoá gì. Vì vậy luồng mới cần hỏi 'trùng tên thì sao' chứ không chỉ 'tệp nào'."
      },
      {
        "question": "Bạn muốn thử luồng chuyển tệp an toàn. Làm gì đầu tiên?",
        "options": [
          "Chạy thẳng trên thư mục chung vì luồng đã được dựng đúng",
          "Chạy thẳng trên thư mục chung, lỗi thì nhờ bộ phận IT khôi phục",
          "Chạy trên thư mục thử với bản sao của vài tệp",
          "Chạy trên đúng 80 tệp thật vì 5 tệp thì chưa đủ kết luận"
        ],
        "correct": 2,
        "explanation": "Thử trên bản sao là cách duy nhất vừa thấy luồng làm gì vừa không rủi ro. 'Đã dựng đúng' là niềm tin, không phải bằng chứng. Nhờ IT khôi phục chỉ là kế hoạch dự phòng và không phải lúc nào cũng có bản sao cần. Chạy ngay trên 80 tệp thật đưa toàn bộ rủi ro vào một lần."
      },
      {
        "question": "Luồng gặp tệp tên trùng, mà bạn chưa kịp dặn cách xử lý. Kết quả hợp lý nhất?",
        "options": [
          "Luồng dừng lại hoặc để tệp ở chỗ cũ và báo cho bạn",
          "Luồng chọn ghi đè vì tệp mới luôn mới hơn tệp cũ",
          "Luồng xoá tệp nguồn để tránh hai tệp cùng tên tồn tại",
          "Luồng tự đổi tên ngẫu nhiên rồi chuyển đi không báo ai"
        ],
        "correct": 0,
        "explanation": "Khi chưa có quy tắc cho trường hợp lạ, hành vi an toàn là không làm gì không đảo ngược được: dừng hoặc giữ nguyên và báo người. Ghi đè với lý do 'mới hơn' chỉ đúng khi bạn đã biết tệp nào mới hơn. Xoá tệp nguồn là mất dữ liệu. Đổi tên ngẫu nhiên không báo thì không ai biết đã đổi gì."
      },
      {
        "question": "Quy tắc 'chuyển mọi tệp có chữ Bao_cao vào thư mục Báo cáo' có vấn đề gì?",
        "options": [
          "Quy tắc dùng chữ quá dài nên luồng không đọc được",
          "Chữ Bao_cao có thể khớp cả tệp không phải báo cáo chính thức",
          "Thư mục Báo cáo đã có dấu, luồng không ghi vào được",
          "Chỉ người tạo luồng mới thấy các tệp sau khi chuyển"
        ],
        "correct": 1,
        "explanation": "Điều kiện lọc theo từ khoá thường quá rộng: 'Bao_cao_nhap', 'Bao_cao_huy' hay bản sao của tệp khác cũng bị cuốn vào. Độ dài chữ không cản luồng. Thư mục có dấu tiếng Việt thường vẫn ghi được, chỉ đôi lúc lỗi ở hệ thống cũ. Quyền xem thư mục do cài đặt chia sẻ quyết định, không do người tạo luồng."
      },
      {
        "question": "Sau khi luồng chạy, cách nào giúp biết luồng đã chuyển những tệp nào?",
        "options": [
          "Đọc nhật ký chạy, đối chiếu số tệp nguồn và số tệp đích",
          "Tin là đã đúng nếu luồng không báo lỗi nào ra ngoài suốt tuần",
          "Mở ngẫu nhiên một tệp trong thư mục đích để xem thử",
          "Hỏi đồng nghiệp xem có ai thấy tệp biến mất chưa"
        ],
        "correct": 0,
        "explanation": "Đếm số tệp trước và sau rồi đối chiếu với nhật ký là kiểm có hệ thống. Không có báo lỗi chưa có nghĩa là mọi tệp đã đi đúng chỗ. Mở một tệp ngẫu nhiên chỉ kiểm một phần nhỏ. Chờ đồng nghiệp phát hiện thì bạn chỉ biết khi người khác đã bị ảnh hưởng."
      }
    ],
    "keyTakeaways": [
      "Quy tắc chuyển tệp có ba phần: chọn tệp, đích, xử lý trùng tên.",
      "Ghi đè là quy tắc dễ làm mất tệp nhất.",
      "Chưa biết xử lý trường hợp lạ thì dừng và báo người.",
      "Điều kiện lọc theo từ khoá thường rộng hơn bạn nghĩ.",
      "Thử trên bản sao, rồi đối chiếu số tệp trước và sau."
    ],
    "practicePrompt": {
      "question": "Luồng chuyển tệp 'Bang_luong' vào thư mục tháng, quy tắc trùng tên là 'ghi đè'. Điều gì xảy ra ở tháng có hai tệp cùng tên?",
      "options": [
        "Tệp đến sau đè lên tệp trước, tệp trước mất",
        "Cả hai được giữ lại, luồng tự thêm số bản vào tên",
        "Luồng hỏi bạn chọn giữ tệp nào rồi mới chuyển",
        "Luồng bỏ qua cả hai tệp và ghi lỗi vào nhật ký"
      ],
      "correct": 0,
      "explanation": "Đã chọn 'ghi đè' thì luồng không hỏi và không giữ hai bản: tệp đến sau thay thế tệp trước. Các phương án còn lại mô tả những quy tắc khác (thêm số bản, hỏi người, bỏ qua) mà bạn phải tự chọn chứ luồng không tự làm."
    },
    "summary": {
      "keyIdea": "Quy tắc chuyển tệp phải nói rõ cả điều gì xảy ra khi tên trùng.",
      "formula": "điều kiện chọn + thư mục đích + cách xử lý trùng tên",
      "commonMistake": "Chỉ thử với tệp không trùng nên quy tắc ghi đè không bao giờ lộ ra.",
      "action": "Viết câu trả lời cho câu hỏi 'trùng tên thì làm gì' trước khi bật luồng."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Tạo một thư mục thử, chép vào 6 tệp của bạn, trong đó cố ý có 2 tệp cùng tên. Viết ra giấy quy tắc bạn muốn: chọn tệp nào, chuyển đến đâu, nếu trùng tên thì làm gì. Ngày mai bạn sẽ mang quy tắc đó vào một luồng thử.",
      "secondary": "Nếu bạn chỉ viết được hai phần đầu, đó chính là lỗ hổng thường làm mất tệp."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Mỗi cuối tháng bạn kéo hàng chục tệp vào thư mục 'Tháng này'. Nhờ luồng làm việc này thì tiện, nhưng có một loại quy tắc làm mất tệp mà không báo. Bài này giúp bạn tìm ra chỗ đó trước khi nó tìm ra bạn."
      },
      {
        "type": "feynman",
        "title": "Chuyển tệp theo quy tắc đơn giản hơn bạn nghĩ",
        "intro": "Hãy hình dung một thủ thư xếp sách lên kệ theo mã. Nếu hai cuốn cùng mã, thủ thư giỏi sẽ hỏi trước chứ không vứt cuốn cũ đi để lấy chỗ.",
        "columns": [
          "Thành phần",
          "Thủ thư xếp sách",
          "Luồng chuyển tệp"
        ],
        "rows": [
          [
            "Chọn gì",
            "Sách mới nhập, đúng loại",
            "Điều kiện: đuôi tệp, tên, ngày"
          ],
          [
            "Xếp đâu",
            "Kệ theo mã số",
            "Thư mục đích"
          ],
          [
            "Trùng mã",
            "Hỏi, giữ cả hai, đánh số",
            "Đổi tên, để lại, hoặc dừng báo"
          ],
          [
            "Ghi chép",
            "Sổ nhập kho",
            "Nhật ký chạy của luồng"
          ]
        ],
        "oneLiner": "Quy tắc tốt nói rõ phải làm gì khi hai tệp trùng tên, và không bao giờ âm thầm xoá tệp cũ."
      },
      {
        "type": "heading",
        "text": "Ba phần của một quy tắc chuyển tệp"
      },
      {
        "type": "paragraph",
        "text": "Quy tắc nào cũng gồm ba phần: chọn tệp nào, chuyển đến thư mục nào, và làm gì khi tên bị trùng. Hai phần đầu ai cũng viết. Phần thứ ba thường bị quên, vì khi thử lần đầu chưa có tệp nào trùng."
      },
      {
        "type": "list",
        "items": [
          "Chọn tệp: càng hẹp càng an toàn (đuôi tệp, một phần tên, ngày).",
          "Thư mục đích: nếu đích tính theo ngày, hãy kiểm thư mục đó có sẵn chưa.",
          "Trùng tên: thêm số bản, để tệp ở chỗ cũ hoặc dừng báo; tránh ghi đè.",
          "Nhật ký: ghi lại mọi tệp đã chuyển, để lần sau bạn đối chiếu."
        ]
      },
      {
        "type": "flow",
        "title": "Một tệp đi qua quy tắc chuyển",
        "steps": [
          {
            "label": "Luồng thấy tệp mới",
            "detail": "Tệp vừa xuất hiện trong thư mục nguồn, luồng bắt đầu kiểm."
          },
          {
            "label": "So với điều kiện",
            "detail": "Luồng so đuôi và tên tệp với điều kiện đã dặn. Không khớp thì tệp nằm yên."
          },
          {
            "label": "Tìm thư mục đích",
            "detail": "Luồng xác định thư mục tháng hiện tại, tạo nếu chưa có."
          },
          {
            "label": "Kiểm trùng tên",
            "detail": "Nếu đích đã có tệp cùng tên, luồng theo đúng quy tắc trùng tên bạn đã chọn."
          },
          {
            "label": "Chuyển và ghi nhật ký",
            "detail": "Tệp được chuyển, dòng nhật ký ghi tên tệp, nguồn, đích và giờ chạy."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Soát quy tắc chuyển tệp do AI soạn",
        "task": "Bạn nhờ AI mô tả quy tắc cho luồng chuyển tệp bảng lương. Yêu cầu của bạn: chỉ chuyển tệp Bang_luong đuôi .xlsx, đích là thư mục tháng, và khi trùng tên thì giữ cả hai. Đánh dấu chỗ AI tự thêm hoặc làm sai.",
        "segments": [
          {
            "text": "Luồng chỉ chọn tệp có tên bắt đầu bằng Bang_luong và đuôi .xlsx."
          },
          {
            "text": "Mọi tệp chứa chữ 'luong' ở bất kỳ vị trí nào cũng được chuyển.",
            "error": "Bạn yêu cầu chỉ tệp Bang_luong đuôi .xlsx. Điều kiện 'chứa chữ luong' quá rộng và sẽ kéo cả tệp tạm và tệp khác vào."
          },
          {
            "text": "Thư mục đích là thư mục tháng hiện tại, tạo mới nếu chưa có."
          },
          {
            "text": "Nếu đích đã có tệp cùng tên, tệp cũ bị ghi đè bằng tệp mới.",
            "error": "Bạn dặn giữ cả hai. AI đổi thành ghi đè, tức là tệp cũ biến mất khi có tệp trùng tên."
          },
          {
            "text": "Mỗi tệp đã chuyển được ghi một dòng vào nhật ký."
          },
          {
            "text": "Tệp nguồn được xoá sau khi chuyển xong mà không cần kiểm tra.",
            "error": "Bạn chưa yêu cầu xoá gì. Chuyển tệp đã làm tệp rời nguồn; thêm bước xoá là việc AI tự bịa."
          }
        ]
      },
      {
        "type": "callout",
        "label": "Cẩn thận: quy tắc ghi đè",
        "text": "Luồng không biết tệp nào quan trọng hơn. Khi quy tắc nói 'ghi đè', nó sẽ làm đúng như vậy, kể cả với tệp duy nhất của chi nhánh kia. Nếu thật sự cần ghi đè, hãy bật thêm thư mục lưu bản cũ."
      },
      {
        "type": "scenario",
        "title": "Luồng chuyển tệp chốt sổ",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn dựng luồng chuyển tệp 'Bang_luong' vào thư mục tháng. Ngày chốt sổ là ngày mai, kế toán trưởng cần đủ 5 tệp của 5 chi nhánh.",
            "choices": [
              {
                "label": "Để quy tắc trùng tên là ghi đè, vì 'tệp mới nhất luôn đúng hơn'",
                "next": "bad"
              },
              {
                "label": "Đặt quy tắc trùng tên là thêm số bản rồi thử với 2 tệp cùng tên",
                "next": "s2"
              }
            ]
          },
          "bad": {
            "text": "Hai chi nhánh cùng gửi tệp tên 'Bang_luong'. Tệp gửi sau đè tệp gửi trước, và bảng lương của một chi nhánh mất đúng hôm chốt sổ. Không ai biết cho tới khi kế toán đếm lại.",
            "ending": "bad"
          },
          "s2": {
            "text": "Hai tệp cùng tên được giữ thành Bang_luong_v1 và Bang_luong_v2. Bạn còn 20 phút.",
            "choices": [
              {
                "label": "Đối chiếu số tệp trong nhật ký với số tệp chi nhánh đã gửi trước khi bật cho cả tháng",
                "next": "good"
              },
              {
                "label": "Tin luồng, bật luôn cho cả tháng vì thử đã ổn",
                "next": "bad2"
              }
            ]
          },
          "bad2": {
            "text": "Luồng chuyển được hầu hết, nhưng hai tệp tên có dấu cách lại bị bỏ qua vì điều kiện chọn tệp quá hẹp. Kế toán thiếu tệp và phải gọi từng chi nhánh.",
            "ending": "bad"
          },
          "good": {
            "text": "Bạn thấy nhật ký ghi 5 tệp và thư mục có đủ 5 tệp. Một tệp có dấu cách được đổi tên trước khi chuyển. Kế toán trưởng nhận đủ trước giờ chốt.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Quy tắc tốt nói rõ cả điều gì xảy ra khi tên trùng.",
          "Bài sau: gom số từ nhiều tệp nhỏ của chi nhánh về một bảng."
        ]
      }
    ]
  },
  {
    "id": 2472,
    "slug": "excel-tu-cap-nhat-tu-nhieu-file-nho",
    "title": "Chặng 53, Bài 13: Excel tự gom số từ nhiều tệp nhỏ của từng chi nhánh",
    "subtitle": "Năm tệp nhỏ thành một bảng: như năm phiếu thu được dán vào một sổ cái.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "📊",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Cuối tuần năm chi nhánh gửi năm tệp, và bạn mất cả buổi chiều chép số sang một bảng tổng. Gom tự động chép thay bạn, nhưng một tổng sai vẫn là tổng sai. Nên ba lần đầu bạn tự cộng lại bằng tay để biết luồng đúng thật chứ không chỉ chạy được.",
    "openingQuestion": "Năm chi nhánh gửi năm tệp doanh số. Bạn cho luồng gom về một bảng tổng. Lần đầu chạy, bạn nên làm gì với con số tổng?",
    "openingOptions": [
      "Tự cộng lại năm con số từ năm tệp để đối chiếu",
      "Gửi ngay cho sếp vì luồng đã chạy xong không lỗi",
      "Nhờ AI xem con số tổng có hợp lý không rồi dùng",
      "So với con số tuần trước, nếu gần bằng thì coi là đúng"
    ],
    "correctOption": 0,
    "explanation": "Luồng chạy xong không báo lỗi chỉ cho biết nó chạy được, chưa cho biết nó cộng đúng. Một cột bị đọc thiếu, một dòng tiêu đề bị tính thành số, hay một tệp gửi muộn bị bỏ sót đều cho ra tổng sai mà không báo gì. Cộng tay năm con số chỉ mất vài phút và là phép thử chắc nhất. AI đánh giá 'hợp lý' và so với tuần trước không đo được sai lệch.",
    "diagram": [
      {
        "label": "Năm tệp của năm chi nhánh nằm trong một thư mục",
        "arrow": true
      },
      {
        "label": "Luồng đọc từng tệp, lấy đúng cột doanh số",
        "arrow": true
      },
      {
        "label": "Gộp các dòng vào một bảng tổng",
        "arrow": true
      },
      {
        "label": "Bạn cộng tay đối chiếu, ba lần đầu"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: chuỗi 5 cửa hàng",
      "description": "Mỗi cửa hàng gửi một tệp doanh số cuối ngày, và chị kế toán gom bằng tay khoảng 40 phút. Khi chuyển sang luồng gom tự động, tuần đầu tổng lệch vì tệp của một cửa hàng có thêm một dòng ghi chú ở đầu bảng. Nhờ cộng tay đối chiếu, chị phát hiện ra trước khi gửi quản lý. Đây là tình huống minh hoạ."
    },
    "quiz": [
      {
        "question": "Bạn gom năm tệp về một bảng. Tại sao vẫn nên cộng tay ba lần đầu?",
        "options": [
          "Để biết luồng cộng đúng thật chứ không chỉ chạy được",
          "Vì luồng không thể cộng được các số có dấu phẩy",
          "Vì luồng chỉ đọc được tệp có đúng năm cột doanh số ở đầu bảng",
          "Vì cộng tay nhanh hơn luồng với năm tệp nhỏ thế này"
        ],
        "correct": 0,
        "explanation": "Luồng chạy xong và không báo lỗi không chứng minh số đúng. Cộng tay đưa ra một con số độc lập để so sánh; nếu lệch, bạn biết luồng có lỗi trước khi sếp biết. Luồng vẫn cộng được số có dấu phẩy, không bị giới hạn cố định ở năm cột, và cộng tay thì chắc chắn chậm hơn chứ không nhanh hơn."
      },
      {
        "question": "Tệp chi nhánh Đà Nẵng có thêm một dòng ghi chú trên cùng. Hậu quả hay gặp nhất?",
        "options": [
          "Luồng đọc nhầm dòng ghi chú thành tiêu đề hoặc thành dữ liệu",
          "Luồng tự xoá dòng ghi chú và không ai hay biết gì",
          "Luồng bỏ qua cả tệp Đà Nẵng và báo lỗi cho người dùng",
          "Luồng chép dòng ghi chú sang mọi tệp của chi nhánh khác"
        ],
        "correct": 0,
        "explanation": "Luồng mong tiêu đề ở dòng đầu, nên dòng ghi chú có thể được hiểu là tiêu đề, làm lệch cột, hoặc bị tính như một dòng dữ liệu. Nó không tự xoá dòng ghi chú, không tự báo lỗi nếu bảng vẫn đọc được, và càng không chép sang tệp khác. Vì vậy cấu trúc các tệp nguồn phải giống nhau."
      },
      {
        "question": "Hai tệp của cùng một chi nhánh được gửi trong tuần (bản gửi lần một và bản sửa). Luồng cần làm gì?",
        "options": [
          "Cộng cả hai bản vào tổng vì luồng không phân biệt được bản nào",
          "Chỉ lấy một bản theo quy tắc đã chọn, ví dụ bản mới nhất",
          "Bỏ cả hai bản và chờ người nhập lại số từ đầu",
          "Lấy bản nhỏ hơn vì số nhỏ thì ít rủi ro sai hơn"
        ],
        "correct": 1,
        "explanation": "Hai bản của cùng một chi nhánh nếu cộng chung sẽ đếm đôi doanh số. Bỏ cả hai thì mất dữ liệu đúng. Chọn bản có số nhỏ hơn là một thiên lệch không có cơ sở. Quy tắc rõ ràng, ví dụ chỉ lấy bản mới nhất của mỗi chi nhánh, tránh cả ba lỗi này."
      },
      {
        "question": "Cột doanh số trong tệp Huế lưu dưới dạng chữ '1.250', không phải số. Luồng sẽ gặp vấn đề gì?",
        "options": [
          "Luồng tự hiểu đúng đó là một nghìn hai trăm năm mươi",
          "Luồng báo lỗi rất rõ và dừng cả quá trình gom số",
          "Phép cộng bỏ qua hoặc tính sai giá trị đó",
          "Luồng nhân giá trị đó lên một nghìn lần khi cộng"
        ],
        "correct": 2,
        "explanation": "Số lưu dạng chữ không được cộng như số. Kết quả là bị bỏ qua hoặc hiểu sai dấu chấm ngăn cách nghìn, nên tổng thiếu hoặc lệch mà luồng không luôn báo lỗi. Đây là lý do cột số phải được kiểm kiểu dữ liệu, và là một phần việc của bài sau về cấu trúc bảng."
      },
      {
        "question": "Luồng đã đúng ba tuần liên tiếp. Bạn nên làm gì tiếp?",
        "options": [
          "Giữ một phép kiểm nhẹ, như so tổng với số lượng tệp nhận",
          "Bỏ mọi kiểm tra vì ba tuần đúng liên tiếp nghĩa là luồng hoàn hảo",
          "Cộng tay lại cả năm tệp mỗi tuần như hồi tuần đầu tiên dùng luồng",
          "Tắt luồng đi vì luồng tự động nói chung không đáng tin cậy"
        ],
        "correct": 0,
        "explanation": "Sau ba lần đúng, bạn giảm kiểm xuống mức nhẹ nhưng không bỏ: ví dụ kiểm số tệp nhận đủ năm và tổng không lệch quá xa tuần trước. Bỏ hẳn kiểm thì lỗi lần tới sẽ lọt. Cộng tay lại mọi tuần là phí công, và tắt luồng là bỏ phần đã chứng minh được giá trị."
      }
    ],
    "keyTakeaways": [
      "Luồng chạy không lỗi không có nghĩa là tổng đúng.",
      "Ba lần đầu, cộng tay năm con số để đối chiếu.",
      "Các tệp nguồn phải cùng cấu trúc: cùng cột, cùng dòng tiêu đề.",
      "Hai bản của cùng một chi nhánh: chọn một theo quy tắc rõ.",
      "Sau khi ổn, giữ một phép kiểm nhẹ thay vì bỏ hẳn."
    ],
    "practicePrompt": {
      "question": "Luồng gom năm tệp cho tổng 1.820 triệu, cộng tay cho 1.770 triệu. Việc hợp lý nhất?",
      "options": [
        "Tìm nguyên nhân chênh 50 triệu trước khi gửi ai",
        "Dùng 1.820 triệu vì luồng thường đúng hơn cộng tay",
        "Dùng 1.770 triệu và tắt luôn luồng để khỏi lỗi nữa",
        "Lấy trung bình hai số, 1.795 triệu, cho công bằng"
      ],
      "correct": 0,
      "explanation": "Chênh lệch 50 triệu là tín hiệu có lỗi ở một bên: có thể luồng đếm đôi một tệp hoặc cộng tay sót một dòng. Chọn một con số vì nó 'thường đúng' hay lấy trung bình đều bỏ qua việc tìm lỗi, còn tắt luồng thì bỏ phần việc đã tiết kiệm công sức."
    },
    "summary": {
      "keyIdea": "Gom số tự động chỉ đáng tin sau khi bạn đã tự cộng đối chiếu.",
      "formula": "tổng luồng = tổng cộng tay, nếu lệch thì tìm nguyên nhân trước khi gửi",
      "commonMistake": "Cho rằng luồng chạy xong không lỗi nghĩa là số đúng.",
      "action": "Cộng tay số của năm tệp gần nhất rồi so với tổng của luồng."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Lấy ba tệp số liệu nhỏ bạn thực sự nhận hằng tuần (của chi nhánh, nhóm hoặc dự án). Mở từng tệp, ghi lại dòng tiêu đề và tên cột doanh số, rồi tự cộng ba con số vào một ghi chú. Ngày mai bạn sẽ dùng ghi chú này làm đáp án đối chiếu cho luồng gom.",
      "secondary": "Nếu ba tệp có dòng tiêu đề hay tên cột khác nhau, ghi lại điểm khác - đó là nơi luồng dễ sai nhất."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Cuối tuần, năm chi nhánh gửi năm tệp doanh số. Bạn mất cả buổi chiều chép từng con số sang một bảng tổng. Luồng gom số làm được việc đó, nhưng nếu bạn không kiểm, một con số sai sẽ đi thẳng vào báo cáo."
      },
      {
        "type": "feynman",
        "title": "Gom số từ nhiều tệp đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới việc dán năm phiếu thu của năm quầy vào một cuốn sổ cái. Người dán giỏi sẽ dán đúng cột, không dán phiếu nháp, rồi cộng thử lại.",
        "columns": [
          "Thành phần",
          "Dán phiếu vào sổ cái",
          "Luồng gom tệp"
        ],
        "rows": [
          [
            "Nguồn",
            "Năm phiếu thu của năm quầy",
            "Năm tệp của năm chi nhánh"
          ],
          [
            "Dán vào đâu",
            "Đúng cột của sổ cái",
            "Đúng cột của bảng tổng"
          ],
          [
            "Lỗi hay gặp",
            "Dán cả phiếu nháp",
            "Đọc nhầm dòng ghi chú, đếm đôi bản sửa"
          ],
          [
            "Kiểm tra",
            "Cộng thử cuối ngày",
            "Cộng tay ba lần đầu để đối chiếu"
          ]
        ],
        "oneLiner": "Gom số là dán phiếu vào sổ cái: luồng dán nhanh, còn bạn cộng thử để biết nó dán đúng."
      },
      {
        "type": "heading",
        "text": "Điều gì khiến tổng lệch"
      },
      {
        "type": "paragraph",
        "text": "Phần lớn tổng sai không đến từ phép cộng mà từ dữ liệu đầu vào: tệp có thêm dòng ghi chú, số lưu dạng chữ, tệp gửi muộn, hai bản của cùng một chi nhánh. Luồng không hiểu ý bạn, nó chỉ làm đúng điều bạn cài."
      },
      {
        "type": "chart",
        "title": "Tổng doanh số tuần theo chi nhánh",
        "caption": "Số liệu minh hoạ, đơn vị triệu đồng, chỉ để bạn thấy một bảng tổng trông thế nào. Hãy cộng tay năm cột này rồi so với con số luồng của bạn cho ra.",
        "kind": "bar",
        "yLabel": "Doanh số (triệu đồng)",
        "xLabel": "Chi nhánh",
        "data": [
          {
            "label": "Hà Nội",
            "values": [
              420
            ]
          },
          {
            "label": "Đà Nẵng",
            "values": [
              310
            ]
          },
          {
            "label": "Huế",
            "values": [
              250
            ]
          },
          {
            "label": "TP.HCM",
            "values": [
              560
            ]
          },
          {
            "label": "Cần Thơ",
            "values": [
              280
            ]
          }
        ],
        "seriesLabels": [
          "Doanh số tuần (số liệu minh hoạ)"
        ]
      },
      {
        "type": "list",
        "items": [
          "Ba lần đầu: cộng tay và so với tổng của luồng.",
          "Nếu lệch: tìm dòng ghi chú, số dạng chữ, bản gửi đôi.",
          "Khi đã ổn: giữ phép kiểm nhẹ, như đủ năm tệp.",
          "Mọi chi nhánh dùng cùng một mẫu tệp để luồng đọc được."
        ]
      },
      {
        "type": "callout",
        "label": "Cẩn thận: tổng đúng không có nghĩa là đủ",
        "text": "Một tệp đến muộn làm tổng thiếu một chi nhánh mà vẫn không lỗi. Luôn để luồng báo số tệp đã nhận trên tổng số chi nhánh cần có."
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Dặn AI mô tả cách gom số",
        "task": "Bạn cần AI viết mô tả luồng gom năm tệp doanh số về một bảng tổng. Lắp yêu cầu cho đủ dữ kiện.",
        "parts": [
          {
            "id": "context",
            "label": "Bối cảnh",
            "options": [
              {
                "text": "Năm chi nhánh gửi năm tệp Excel mỗi thứ Sáu; mỗi tệp có cột Ngày và cột Doanh số, tiêu đề ở dòng 1.",
                "good": true,
                "feedback": "Có số tệp, cột và dòng tiêu đề - AI mô tả được đúng chỗ luồng đọc."
              },
              {
                "text": "Tôi có nhiều tệp số liệu.",
                "feedback": "Không rõ bao nhiêu tệp và cột nào, AI sẽ tự đoán cấu trúc."
              }
            ]
          },
          {
            "id": "task",
            "label": "Việc cần làm",
            "options": [
              {
                "text": "Gom cho tôi.",
                "feedback": "Quá ngắn - AI không biết phải gộp dòng hay cộng tổng."
              },
              {
                "text": "Mô tả các bước gộp các dòng vào một bảng tổng và cách tôi cộng tay để kiểm ba lần đầu.",
                "good": true,
                "feedback": "Có cả bước gom lẫn bước kiểm, nên bản mô tả dùng được ngay."
              }
            ]
          },
          {
            "id": "limit",
            "label": "Giới hạn",
            "options": [
              {
                "text": "Nếu thiếu tệp hoặc lệch cấu trúc thì dừng và báo, không tự suy số.",
                "good": true,
                "feedback": "Chặn trường hợp luồng bịa hoặc bỏ sót mà không báo."
              },
              {
                "text": "Tự xử lý mọi trường hợp lạ giúp tôi.",
                "feedback": "Để AI tự xử lý là mở đường cho tổng sai không ai biết."
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
            "text": "Các bước: (1) Lấy 5 tệp trong thư mục tuần. (2) Đọc cột Ngày và Doanh số từ dòng 2 trở đi. (3) Gộp các dòng vào bảng tổng. (4) Nếu thiếu tệp hoặc cấu trúc khác, dừng và báo. Kiểm: tự cộng cột Doanh số của từng tệp trong ba tuần đầu rồi so với tổng của luồng."
          },
          {
            "requires": [
              "context"
            ],
            "text": "Luồng sẽ đọc các tệp và gộp lại thành một bảng tổng...\n(Có dữ kiện nhưng thiếu bước kiểm và giới hạn, nên chưa an toàn để giao cho sếp.)"
          },
          {
            "text": "Luồng sẽ tự động làm mọi thứ và cho kết quả tổng chính xác 100%...\n(Thiếu dữ kiện nên AI hứa quá mức, và 'chính xác 100%' là điều bạn không được tin.)"
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Tuần đầu của luồng gom số",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Luồng vừa gom xong năm tệp, tổng là 1.820 triệu (số liệu minh hoạ). Sếp cần con số trong một tiếng nữa.",
            "choices": [
              {
                "label": "Gửi sếp ngay, vì luồng chạy xong không báo lỗi gì",
                "next": "bad"
              },
              {
                "label": "Cộng tay năm cột doanh số và so với tổng của luồng",
                "next": "s2"
              }
            ]
          },
          "bad": {
            "text": "Tệp Đà Nẵng có thêm một dòng ghi chú ở đầu, luồng tính nó là dữ liệu. Tổng lệch 50 triệu. Sếp báo cáo lên trên với số sai và phải đính chính.",
            "ending": "bad"
          },
          "s2": {
            "text": "Cộng tay được 1.770 triệu, lệch 50 triệu so với luồng.",
            "choices": [
              {
                "label": "Mở từng tệp nguồn tìm nguyên nhân chênh, sửa cấu trúc rồi chạy lại",
                "next": "good"
              },
              {
                "label": "Lấy trung bình 1.795 triệu cho công bằng",
                "next": "bad2"
              }
            ]
          },
          "bad2": {
            "text": "Con số 1.795 triệu không có trong tệp nào. Khi sếp hỏi số này ở đâu ra, bạn không trả lời được và phải làm lại từ đầu.",
            "ending": "bad"
          },
          "good": {
            "text": "Bạn tìm ra dòng ghi chú thừa ở tệp Đà Nẵng, sửa mẫu và chạy lại: tổng là 1.770 triệu, khớp với cộng tay. Sếp nhận đúng số đúng giờ.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Gom số là việc của luồng; xác nhận số đúng vẫn là việc của bạn.",
          "Bài sau: vì sao bảng phải có tiêu đề và định dạng bảng thì luồng mới đọc được."
        ]
      }
    ]
  },
  {
    "id": 2473,
    "slug": "bang-excel-la-dieu-kien-de-luong-doc-duoc-dong",
    "title": "Chặng 53, Bài 14: Bảng Excel phải có tiêu đề và định dạng bảng thì luồng mới đọc được dòng",
    "subtitle": "Luồng đọc Excel như thủ thư đọc sổ: cần tiêu đề cột và một bảng có ranh giới rõ.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "📋",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Phần lớn luồng Excel báo 'không tìm thấy dòng nào' không hỏng ở luồng mà hỏng ở bảng: dữ liệu nằm lẫn tiêu đề thứ hai, ô gộp, dòng trống giữa chừng. Sửa cấu trúc bảng mất năm phút, nhưng chỉ khi bạn biết đó là chỗ cần nhìn.",
    "openingQuestion": "Luồng của bạn báo 'không tìm thấy dòng nào' dù tệp Excel rõ ràng có 200 dòng số. Bạn nên kiểm điều gì trước?",
    "openingOptions": [
      "Dữ liệu đã được định dạng thành bảng có tiêu đề chưa",
      "Tên luồng có dài quá mức mà luồng cho phép hay không",
      "Tệp Excel có đang được mở trên máy của đồng nghiệp hay không",
      "Số dòng 200 có vượt quá giới hạn mà luồng xử lý được hay không"
    ],
    "correctOption": 0,
    "explanation": "Luồng Excel thường đọc các dòng của một bảng có tên và tiêu đề cột rõ ràng. Nếu dữ liệu chỉ là một vùng ô bình thường, luồng không nhận ra ranh giới và báo không có dòng nào. Tên luồng không ảnh hưởng tới việc đọc dòng. Tệp đang được mở có thể gây lỗi khoá tệp, nhưng triệu chứng đó khác. Hai trăm dòng là rất nhỏ, không chạm giới hạn thông thường.",
    "diagram": [
      {
        "label": "Có dữ liệu trong một vùng ô",
        "arrow": true
      },
      {
        "label": "Định dạng thành bảng: có tiêu đề, có tên bảng",
        "arrow": true
      },
      {
        "label": "Luồng chọn đúng bảng theo tên",
        "arrow": true
      },
      {
        "label": "Luồng đọc được từng dòng"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: phòng nhân sự 3 người",
      "description": "Một chị nhân sự dựng luồng đọc bảng ứng viên từ Excel. Luồng báo không có dòng nào vì chị chỉ gõ số liệu vào một vùng ô, không định dạng thành bảng. Sau khi định dạng thành bảng và đặt tên, luồng đọc được cả 120 dòng. Đây là tình huống minh hoạ."
    },
    "quiz": [
      {
        "question": "Vì sao luồng cần dữ liệu Excel được định dạng thành bảng?",
        "options": [
          "Để tệp Excel luôn có màu sắc dễ nhìn hơn với người đọc",
          "Để Excel tự động sửa lỗi chính tả trong từng ô dữ liệu",
          "Để biết chỗ bắt đầu, chỗ kết thúc và tên từng cột",
          "Để luồng có thể xoá những dòng trùng nhau một cách tự động"
        ],
        "correct": 2,
        "explanation": "Định dạng bảng cho luồng một ranh giới rõ: dòng đầu là tiêu đề và các dòng sau là dữ liệu có tên cột. Màu sắc chỉ là thẩm mỹ, bảng không tự sửa chính tả, và không tự xoá dòng trùng (đó là hành động khác cần làm riêng)."
      },
      {
        "question": "Tệp có dòng trống ở giữa bảng. Điều gì có thể xảy ra?",
        "options": [
          "Luồng chỉ đọc phần phía trên dòng trống và bỏ phần sau",
          "Luồng đọc hết và tự điền dữ liệu vào dòng trống",
          "Luồng xoá dòng trống và ghi lại số dòng đã xoá ra ngoài",
          "Luồng đọc phần sau dòng trống và bỏ phần trên"
        ],
        "correct": 0,
        "explanation": "Dòng trống khiến nhiều cách đọc coi như bảng đã kết thúc, nên các dòng sau bị bỏ mà bạn không biết. Luồng không tự điền vào chỗ trống, không tự xoá dòng trống, và thường đọc từ trên xuống chứ không bỏ phần đầu. Bảng liên tục, không dòng trống, là cách tránh."
      },
      {
        "question": "Tiêu đề cột có hai ô gộp ở dòng đầu. Luồng sẽ gặp khó khăn gì?",
        "options": [
          "Luồng không gặp vấn đề gì vì ô gộp nhìn vẫn rất đẹp mắt và gọn",
          "Không tách được tên từng cột vì hai cột dùng chung một ô",
          "Luồng tự chia ô gộp thành hai ô bằng nhau trước khi đọc",
          "Luồng bỏ qua ô gộp và lấy tên cột từ dòng dưới cùng"
        ],
        "correct": 1,
        "explanation": "Ô gộp có một giá trị cho hai cột nên một trong hai cột không có tên riêng. Nhìn đẹp với mắt người không có nghĩa luồng đọc được. Luồng không tự chia ô và cũng không tự đi tìm tên cột ở dòng dưới. Mỗi cột nên có một tiêu đề riêng ở dòng đầu."
      },
      {
        "question": "Tệp có hai bảng dữ liệu khác nhau trên cùng một trang tính. Cách tốt hơn là gì?",
        "options": [
          "Đặt mỗi bảng ở một trang tính, hoặc đặt tên riêng cho từng bảng",
          "Gộp hai bảng thành một bằng cách dán nối dòng",
          "Xoá một bảng vì luồng chỉ làm được với một bảng",
          "Để nguyên, vì luồng tự đoán bảng nào mình cần đọc"
        ],
        "correct": 0,
        "explanation": "Mỗi bảng có tên riêng thì luồng chọn đúng bảng theo tên. Gộp hai bảng khác cột thành một làm cột lộn xộn. Luồng đọc được nhiều bảng, nên không cần xoá. Để luồng tự đoán là cách nhanh nhất để đọc nhầm bảng."
      },
      {
        "question": "Sau khi định dạng bảng, luồng vẫn báo thiếu cột 'Doanh số'. Nguyên nhân có thể nhất?",
        "options": [
          "Luồng không hiểu tiếng Việt có dấu nên không đọc được tên cột viết bằng chữ có dấu",
          "Excel đã đổi tên cột theo ý riêng mà không báo trước",
          "Tên cột trong tệp khác tên cột luồng đang tìm, dù chỉ thừa một khoảng trắng",
          "Bảng chứa quá nhiều số nên luồng bỏ qua cột cuối cùng"
        ],
        "correct": 2,
        "explanation": "Luồng so tên cột theo từng ký tự, nên 'Doanh số ' có thêm một khoảng trắng cuối là khác với 'Doanh số'. Tiếng Việt có dấu thường vẫn đọc được bình thường. Excel không tự đổi tên cột, và số lượng số không khiến luồng bỏ cột cuối."
      }
    ],
    "keyTakeaways": [
      "Luồng đọc dòng của một bảng có tiêu đề, không phải vùng ô bất kỳ.",
      "Mỗi cột một tiêu đề riêng, không gộp ô ở dòng tiêu đề.",
      "Không để dòng trống ở giữa bảng.",
      "Mỗi bảng một tên rõ ràng, tốt nhất mỗi bảng một trang tính.",
      "Tên cột luồng tìm phải khớp đúng, kể cả khoảng trắng."
    ],
    "practicePrompt": {
      "question": "Luồng đọc bảng 'Ứng viên' báo không có dòng nào. Bảng của bạn là vùng ô bình thường có tiêu đề ở dòng 3. Việc nên làm trước?",
      "options": [
        "Định dạng vùng thành bảng, tiêu đề ở dòng đầu của vùng",
        "Viết lại toàn bộ luồng từ đầu vì luồng đã bị hỏng không đọc được bảng",
        "Xoá hết dữ liệu rồi nhập lại bằng tay vào tệp mới",
        "Đổi tên luồng cho giống tên bảng trong tệp Excel"
      ],
      "correct": 0,
      "explanation": "Vùng ô bình thường chưa có ranh giới cho luồng, nên việc đầu tiên là định dạng thành bảng với tiêu đề ở dòng đầu. Luồng chưa hỏng nên không cần viết lại, nhập lại dữ liệu là phí công, và đổi tên luồng không tác động tới việc đọc dòng."
    },
    "summary": {
      "keyIdea": "Luồng chỉ đọc được dòng khi dữ liệu nằm trong một bảng có ranh giới rõ.",
      "formula": "vùng ô → định dạng bảng → tiêu đề mỗi cột → tên bảng → luồng đọc",
      "commonMistake": "Gộp ô tiêu đề, để dòng trống giữa bảng, rồi đổ lỗi cho luồng.",
      "action": "Mở tệp nguồn của bạn và kiểm: có tiêu đề riêng mỗi cột, không gộp ô, không dòng trống."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Mở một tệp Excel bạn hay đưa vào quy trình. Định dạng dữ liệu thành bảng, đặt mỗi cột một tiêu đề riêng, bỏ ô gộp và dòng trống, rồi đặt một tên bảng ngắn, không dấu cách, ví dụ BangDoanhSo. Ghi lại tên bảng để ngày mai dùng trong luồng.",
      "secondary": "Đếm xem bạn đã sửa mấy chỗ: thường 2-3 chỗ là đủ làm bảng đọc được."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bạn dựng luồng đọc một tệp Excel, bấm chạy, và luồng báo không tìm thấy dòng nào. Tệp rõ ràng có 200 dòng. Bài này giúp bạn nhận ra lỗi nằm ở cấu trúc bảng chứ không phải ở luồng."
      },
      {
        "type": "feynman",
        "title": "Bảng Excel cho luồng đơn giản hơn bạn nghĩ",
        "intro": "Hãy hình dung một thủ thư đọc sổ mượn sách. Sổ có dòng đầu ghi tên cột, từng dòng là một lượt mượn. Nếu sổ chỉ là những ô rời, không ai biết đâu là dòng đầu.",
        "columns": [
          "Thành phần",
          "Sổ mượn sách của thủ thư",
          "Bảng Excel cho luồng"
        ],
        "rows": [
          [
            "Dòng đầu",
            "Tên các cột: ngày, tên sách, người mượn",
            "Tiêu đề, mỗi cột một ô riêng"
          ],
          [
            "Các dòng sau",
            "Từng lượt mượn, liền nhau",
            "Từng dòng dữ liệu, không dòng trống"
          ],
          [
            "Ranh giới",
            "Trang sổ có đầu có cuối",
            "Định dạng bảng và tên bảng"
          ],
          [
            "Lỗi hay gặp",
            "Gạch xoá, dán chồng thêm trang",
            "Ô gộp, hai bảng chung một trang tính"
          ]
        ],
        "oneLiner": "Định dạng thành bảng cho luồng biết đâu là tiêu đề, đâu là dòng, và đâu là hết."
      },
      {
        "type": "heading",
        "text": "Năm dấu hiệu bảng chưa sẵn sàng"
      },
      {
        "type": "list",
        "items": [
          "Dòng tiêu đề nằm ở dòng 3 hoặc dòng 5 thay vì dòng đầu của bảng.",
          "Có ô gộp ở dòng tiêu đề, nhìn đẹp nhưng hai cột chung một tên.",
          "Có dòng trống ở giữa, luồng dừng đọc ở đó.",
          "Hai bảng chung một trang tính mà không đặt tên.",
          "Tên cột có khoảng trắng thừa hoặc khác chữ hoa thường so với luồng cần."
        ]
      },
      {
        "type": "flow",
        "title": "Từ vùng ô thành bảng luồng đọc được",
        "steps": [
          {
            "label": "Xem lại vùng dữ liệu",
            "detail": "Kiểm xem dòng đầu có phải tiêu đề không, có dòng trống hay ô gộp không."
          },
          {
            "label": "Sửa tiêu đề",
            "detail": "Mỗi cột có một tiêu đề riêng, ngắn, không thừa khoảng trắng."
          },
          {
            "label": "Định dạng thành bảng",
            "detail": "Chọn vùng và dùng chức năng định dạng thành bảng để Excel ghi nhận ranh giới."
          },
          {
            "label": "Đặt tên bảng",
            "detail": "Một tên ngắn, không dấu cách, để luồng chọn đúng bảng."
          },
          {
            "label": "Chạy thử luồng",
            "detail": "Kiểm luồng đọc ra đúng số dòng và đúng tên cột."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Soát hướng dẫn chuẩn bị bảng do AI viết",
        "task": "Bạn nhờ AI liệt kê các việc cần làm để bảng Excel đọc được bằng luồng. Bảng của bạn chỉ có cột Ngày, Tên khách, Doanh số, tiêu đề ở dòng 1. Đánh dấu những điều AI nói sai hoặc tự thêm.",
        "segments": [
          {
            "text": "Mỗi cột cần một tiêu đề riêng ở dòng đầu, ví dụ Ngày, Tên khách, Doanh số."
          },
          {
            "text": "Dữ liệu cần được định dạng thành bảng và đặt một tên ngắn, không dấu cách."
          },
          {
            "text": "Nên gộp ô tiêu đề cho Tên khách và Doanh số để bảng trông gọn hơn.",
            "error": "Gộp ô là điều làm hỏng bảng: hai cột dùng chung một tiêu đề thì luồng không tách được tên từng cột."
          },
          {
            "text": "Nên chèn một dòng trống giữa mỗi 10 dòng để luồng dễ phân nhóm.",
            "error": "Dòng trống làm nhiều cách đọc dừng lại ở đó; luồng sẽ bỏ phần sau. AI bịa ra một mẹo gây lỗi."
          },
          {
            "text": "Khi tên cột trong luồng là 'Doanh số' thì tiêu đề trong bảng cũng phải đúng như vậy."
          },
          {
            "text": "Excel sẽ tự sửa tiêu đề sai chính tả nên không cần kiểm lại tên cột.",
            "error": "Excel không tự sửa tên cột; một khoảng trắng thừa cũng khiến luồng không tìm thấy cột."
          }
        ]
      },
      {
        "type": "callout",
        "label": "Cẩn thận: bảng đẹp chưa chắc luồng đọc được",
        "text": "Bảng nhìn gọn với mắt người, như ô gộp hay dòng trống ngăn nhóm, thường lại là bảng khó đọc nhất với luồng. Hãy thiết kế bảng cho luồng trước, rồi trình bày đẹp bằng một trang tính khác."
      },
      {
        "type": "scenario",
        "title": "Luồng báo không có dòng nào",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Thứ Hai, luồng báo cáo tuần báo: không tìm thấy dòng nào trong tệp. Bạn mở tệp và thấy 200 dòng dữ liệu, tiêu đề ở dòng 3, hai ô tiêu đề đã gộp.",
            "choices": [
              {
                "label": "Báo IT là luồng hỏng và chờ họ sửa",
                "next": "bad"
              },
              {
                "label": "Đưa tiêu đề lên dòng đầu, bỏ ô gộp, định dạng thành bảng rồi chạy lại",
                "next": "s2"
              }
            ]
          },
          "bad": {
            "text": "IT không thấy lỗi nào ở luồng vì luồng vẫn chạy. Hai ngày sau bạn mới biết lỗi nằm ở cấu trúc tệp, và báo cáo tuần đã trễ.",
            "ending": "bad"
          },
          "s2": {
            "text": "Luồng đọc được 200 dòng nhưng báo thiếu cột 'Doanh số'. Tiêu đề trong tệp là 'Doanh số ' với khoảng trắng cuối.",
            "choices": [
              {
                "label": "Xoá khoảng trắng thừa để tên cột khớp đúng",
                "next": "good"
              },
              {
                "label": "Đổi tên cột trong luồng thành 'Doanh' cho đỡ lỗi",
                "next": "bad2"
              }
            ]
          },
          "bad2": {
            "text": "Luồng chạy nhưng lấy nhầm cột khác có chữ 'Doanh' và báo cáo dùng số sai. Đến khi sếp hỏi, bạn mới thấy cả tuần số liệu đã lệch.",
            "ending": "bad"
          },
          "good": {
            "text": "Sau khi xoá khoảng trắng, luồng đọc đủ 200 dòng và đủ ba cột. Báo cáo tuần chạy đúng giờ sáng thứ Hai.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Bảng có tiêu đề, không gộp ô, không dòng trống thì luồng mới đọc được.",
          "Bài sau: dựng một luồng báo cáo tuần từ Excel, gửi email cho chính bạn trước."
        ]
      }
    ]
  },
  {
    "id": 2474,
    "slug": "mini-du-an-bao-cao-tuan-excel-gui-email-tu-dong",
    "title": "Chặng 53, Bài 15: Mini dự án: báo cáo tuần từ Excel tự gửi email vào sáng thứ Hai",
    "subtitle": "Luồng chọn số tuần, AI viết vài dòng tóm tắt, và bạn là người đọc đầu tiên.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "📨",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Báo cáo tuần là việc lặp lại đúng hình mẫu để tự động hoá, và cũng là việc dễ gửi sai nhất: số cũ, người nhận sai, AI thêm một câu bịa. Bài này ghép các bài trước thành một luồng hoàn chỉnh, với một nguyên tắc: gửi cho bạn trước khi gửi cho sếp.",
    "openingQuestion": "Bạn dựng xong luồng gửi báo cáo tuần cho sếp vào 8 giờ sáng thứ Hai. Lần đầu chạy, người nhận nên là ai?",
    "openingOptions": [
      "Chính bạn, để đọc kỹ rồi mới chuyển tiếp cho sếp",
      "Sếp luôn, vì luồng đã thử xong trên dữ liệu mẫu",
      "Cả nhóm, để mọi người cùng góp ý cho bản đầu",
      "Sếp và bạn cùng lúc, để sếp phản hồi ngay nếu có lỗi"
    ],
    "correctOption": 0,
    "explanation": "Lần chạy đầu luôn gửi cho chính bạn: nếu số sai, câu tóm tắt có chi tiết bịa hoặc tiêu đề khó hiểu, chỉ bạn thấy và sửa. Gửi sếp hay cả nhóm ngay lần đầu thì lỗi trở thành lỗi công khai. Gửi đồng thời cho bạn và sếp nghe như cách chữa cháy, nhưng sếp vẫn đọc bản chưa kiểm. Dữ liệu mẫu đúng không đảm bảo dữ liệu thật đúng.",
    "diagram": [
      {
        "label": "Sáng thứ Hai: luồng chạy theo lịch",
        "arrow": true
      },
      {
        "label": "Chọn dữ liệu của đúng tuần vừa qua từ bảng Excel",
        "arrow": true
      },
      {
        "label": "AI viết 3-4 dòng tóm tắt từ số đã chọn",
        "arrow": true
      },
      {
        "label": "Gửi email cho bạn, bạn soát rồi mới chuyển sếp"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: trưởng nhóm kinh doanh",
      "description": "Mỗi sáng thứ Hai, anh mất 40 phút ghép số tuần từ Excel và viết email cho sếp. Anh dựng luồng chọn dòng của tuần trước, nhờ AI viết tóm tắt từ chính các dòng đó, và trong ba tuần đầu tiên luồng gửi cho anh trước. Đây là tình huống minh hoạ."
    },
    "quiz": [
      {
        "question": "Luồng báo cáo tuần nên chọn dữ liệu của tuần nào?",
        "options": [
          "Toàn bộ tệp Excel, rồi AI tự chọn tuần trong đó",
          "Tuần vừa kết thúc, xác định theo ngày chạy của luồng",
          "Tuần được người chạy luồng nhập tay vào mỗi sáng thứ Hai đầu tuần",
          "Tuần có doanh số cao nhất, để báo cáo đẹp hơn"
        ],
        "correct": 1,
        "explanation": "Luồng tự chọn tuần vừa kết thúc theo ngày chạy thì không cần ai nhớ, và không lẫn tuần. Để AI tự chọn tuần từ cả tệp là trao quyền quyết định số cho một bên hay bịa. Nhập tay mỗi sáng thì không còn tự động. Chọn tuần cao nhất là bóp méo báo cáo."
      },
      {
        "question": "AI viết phần tóm tắt từ số liệu tuần. Cách dặn nào an toàn nhất?",
        "options": [
          "Chỉ dùng các số trong bảng bên dưới, thiếu thì ghi \"chưa có số\"",
          "Viết tóm tắt thật hay và thuyết phục để sếp hài lòng",
          "Viết tóm tắt như chuyên gia phân tích và đưa thêm dự báo",
          "Viết tóm tắt dựa trên mọi thứ bạn biết về ngành này"
        ],
        "correct": 0,
        "explanation": "Bắt AI chỉ dùng số đã có và ghi rõ khi thiếu là cách chặn việc bịa. 'Hay và thuyết phục' khuyến khích văn hoa hơn chính xác. Dự báo và kiến thức ngành là những thứ không có trong dữ liệu tuần, nên AI sẽ tự bịa."
      },
      {
        "question": "Sau ba tuần luồng gửi bạn trước và không có lỗi, bước tiếp theo hợp lý là gì?",
        "options": [
          "Xoá luôn mọi bước kiểm và để luồng gửi cho cả công ty",
          "Dừng luồng vì báo cáo tự động không bao giờ đủ tin cậy",
          "Chuyển người nhận sang sếp, vẫn giữ bạn đồng gửi",
          "Tăng số người nhận tới 10 để lấy thêm góp ý cho luồng"
        ],
        "correct": 2,
        "explanation": "Chuyển người nhận sang sếp nhưng giữ bạn cùng nhận để còn thấy bản đã gửi và phát hiện lỗi sớm. Bỏ hết kiểm và gửi cả công ty làm tăng rủi ro rất nhiều. Dừng luồng bỏ phần đã chứng minh. Tăng người nhận để 'góp ý' là đưa lỗi ra cho nhiều người thấy hơn."
      },
      {
        "question": "Số liệu báo cáo có tuần này tăng 18% so với tuần trước. AI viết 'nhờ chiến dịch quảng cáo mới'. Bạn nên làm gì?",
        "options": [
          "Bỏ vế nguyên nhân vì dữ liệu chỉ cho biết con số, không cho biết lý do",
          "Giữ nguyên vì AI thường đoán đúng nguyên nhân tăng trưởng",
          "Giữ nguyên nhưng thêm chữ \"có thể\" để cẩn thận hơn",
          "Đổi 18% thành 20% cho tròn số rồi giữ vế nguyên nhân"
        ],
        "correct": 0,
        "explanation": "Dữ liệu chỉ cho biết con số tăng 18%; nguyên nhân là chi tiết AI thêm vào vì nghe hợp lý. Báo cáo chỉ nên nói điều có trong dữ liệu hoặc điều bạn biết thật. Thêm chữ 'có thể' không biến một phỏng đoán thành sự thật. Làm tròn 18% thành 20% là sửa số để cho đẹp, sai cả hai cách."
      },
      {
        "question": "Luồng không chạy vào sáng thứ Hai vì tệp Excel đang bị đồng nghiệp mở. Cách xử lý tốt?",
        "options": [
          "Luồng bỏ qua tuần đó và không báo gì cho ai cả mà chạy tiếp tuần sau",
          "Luồng thử lại sau vài phút, nếu vẫn lỗi thì báo cho bạn",
          "Luồng gửi báo cáo của tuần trước thay cho tuần này",
          "Luồng ép đóng tệp của đồng nghiệp rồi chạy ngay"
        ],
        "correct": 1,
        "explanation": "Thử lại rồi báo người khi vẫn lỗi là hành vi chủ động và an toàn. Bỏ qua mà không báo khiến sếp thiếu báo cáo mà bạn không hay. Gửi báo cáo tuần trước là gửi số cũ mà ngỡ là mới. Ép đóng tệp của người khác có thể làm họ mất dữ liệu chưa lưu."
      }
    ],
    "keyTakeaways": [
      "Báo cáo tuần: luồng chọn tuần vừa qua theo ngày chạy.",
      "AI chỉ tóm tắt từ số đã chọn, thiếu thì ghi 'chưa có số'.",
      "Lần đầu gửi cho chính bạn, không gửi sếp ngay.",
      "Nguyên nhân tăng giảm không có trong dữ liệu thì bỏ khỏi báo cáo.",
      "Có kế hoạch khi luồng lỗi: thử lại, rồi báo người."
    ],
    "practicePrompt": {
      "question": "Bạn nhờ AI viết 3 dòng tóm tắt tuần từ bảng số liệu. Một dòng ghi 'khách hàng hài lòng hơn tuần trước' dù bảng không có số về mức hài lòng. Việc nên làm?",
      "options": [
        "Xoá dòng đó vì dữ liệu không nói gì về sự hài lòng",
        "Giữ dòng đó vì nghe hợp lý và khiến báo cáo tích cực",
        "Đổi thành 'khách hàng hài lòng rất nhiều' cho nhất quán",
        "Hỏi AI xem dòng đó có đúng không rồi làm theo câu trả lời của AI"
      ],
      "correct": 0,
      "explanation": "Bảng không có số về mức hài lòng nên câu đó là AI tự bịa. Giữ vì nghe hợp lý là tin vào văn trôi chảy. Đổi thành 'rất nhiều' làm sai hơn. Hỏi lại AI thì nó có thể xác nhận luôn điều nó vừa bịa; chỉ dữ liệu mới xác nhận được."
    },
    "summary": {
      "keyIdea": "Báo cáo tuần tự động là luồng ghép: chọn số, AI tóm tắt, bạn soát rồi gửi.",
      "formula": "số của tuần + tóm tắt chỉ từ số đó + người nhận là bạn trước",
      "commonMistake": "Gửi sếp ngay lần đầu, hoặc để AI thêm nguyên nhân mà dữ liệu không có.",
      "action": "Viết ra ba số bạn muốn sếp đọc đầu tiên mỗi sáng thứ Hai."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Mở bảng Excel bạn dùng làm báo cáo tuần. Chọn ba dòng tuần gần nhất, ghi ra ba con số chính, rồi nhờ AI viết 3 dòng tóm tắt và dặn rõ: chỉ dùng ba số này, thiếu thì ghi chưa có số. Đánh dấu mọi câu không có trong ba số để bạn biết AI hay thêm gì.",
      "secondary": "Ghi lại tên bảng và tên cột bạn dùng; đó là đầu vào cho luồng thật."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Mỗi sáng thứ Hai bạn mất gần một tiếng ghép số tuần và viết email cho sếp. Mini dự án này ghép cả chặng thành một luồng: chọn số của tuần qua, nhờ AI viết tóm tắt, rồi gửi cho chính bạn để soát trước."
      },
      {
        "type": "feynman",
        "title": "Báo cáo tuần tự động đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới một bản tin nội bộ có người soạn và người duyệt. Người soạn gom tin, người duyệt đọc trước rồi mới in cho cả cơ quan.",
        "columns": [
          "Thành phần",
          "Bản tin nội bộ",
          "Luồng báo cáo tuần"
        ],
        "rows": [
          [
            "Gom tin",
            "Người soạn lấy tin trong tuần",
            "Luồng chọn dòng của tuần vừa qua"
          ],
          [
            "Viết lời",
            "Phóng viên viết vài dòng",
            "AI viết tóm tắt từ số đã chọn"
          ],
          [
            "Duyệt",
            "Tổng biên tập đọc bản thử",
            "Bạn nhận bản thử, soát rồi mới gửi sếp"
          ],
          [
            "Phát hành",
            "In cho cả cơ quan",
            "Luồng gửi sếp từ tuần thứ tư"
          ]
        ],
        "oneLiner": "Luồng soạn, AI viết vài dòng, bạn là người duyệt đầu tiên."
      },
      {
        "type": "heading",
        "text": "Các mảnh ghép từ những bài trước"
      },
      {
        "type": "paragraph",
        "text": "Dự án dùng mọi thứ bạn vừa học: tệp Excel phải là một bảng có tiêu đề, luồng đọc dòng của tuần, tên tệp báo cáo đặt theo quy ước và mỗi lần chạy có nhật ký để soát. Phần mới duy nhất là AI viết vài dòng tóm tắt, và đó là nơi cần nhiều cảnh giác nhất."
      },
      {
        "type": "list",
        "items": [
          "Đầu vào: bảng Excel có tiêu đề, một dòng mỗi ngày hoặc mỗi đơn.",
          "Chọn dữ liệu: tuần vừa kết thúc, tính từ ngày chạy.",
          "Tóm tắt: AI chỉ được dùng các số đã chọn.",
          "Gửi: lần đầu cho bạn, sau ba tuần đúng mới chuyển sang sếp."
        ]
      },
      {
        "type": "flow",
        "title": "Luồng báo cáo tuần chạy ra sao",
        "steps": [
          {
            "label": "Đến giờ chạy",
            "detail": "Luồng chạy vào 8 giờ sáng thứ Hai theo lịch đã cài, không cần bạn nhớ."
          },
          {
            "label": "Chọn dòng của tuần qua",
            "detail": "Luồng lọc các dòng có ngày từ thứ Hai tuần trước tới Chủ nhật, và cộng vài chỉ số chính."
          },
          {
            "label": "AI viết tóm tắt",
            "detail": "Số đã chọn được đưa vào yêu cầu, kèm lời dặn chỉ dùng các số này và ghi 'chưa có số' khi thiếu."
          },
          {
            "label": "Gửi email cho bạn",
            "detail": "Bản thử đến hộp thư của bạn, có bảng số và đoạn tóm tắt để bạn đối chiếu."
          },
          {
            "label": "Bạn soát rồi chuyển sếp",
            "detail": "Sau ba tuần đúng liên tiếp, bạn mới đổi người nhận sang sếp và giữ mình đồng gửi."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Dặn AI viết phần tóm tắt tuần",
        "task": "Bạn có ba số của tuần: doanh số 1.820 triệu, 312 đơn, 6 đơn hoàn trả (số liệu minh hoạ). Lắp yêu cầu để AI viết 3 dòng tóm tắt an toàn.",
        "parts": [
          {
            "id": "context",
            "label": "Bối cảnh",
            "options": [
              {
                "text": "Đây là số liệu tuần của phòng kinh doanh: doanh số 1.820 triệu, 312 đơn, 6 đơn hoàn trả, sếp đọc trên điện thoại.",
                "good": true,
                "feedback": "Có số thật và người đọc - AI viết đúng độ dài và đúng số."
              },
              {
                "text": "Hãy tóm tắt tình hình kinh doanh tuần này.",
                "feedback": "Không có số nào, AI sẽ tự bịa số cho nghe hợp lý."
              }
            ]
          },
          {
            "id": "task",
            "label": "Việc cần làm",
            "options": [
              {
                "text": "Viết 3 dòng: doanh số, số đơn, tỷ lệ hoàn trả, mỗi dòng một ý.",
                "good": true,
                "feedback": "Nêu đúng ba ý cần viết, nên bản tóm tắt dễ đối chiếu với bảng."
              },
              {
                "text": "Viết thật ấn tượng để sếp vui.",
                "feedback": "Mục tiêu là làm vui, nên AI có xu hướng tô hồng số liệu."
              }
            ]
          },
          {
            "id": "limit",
            "label": "Giới hạn",
            "options": [
              {
                "text": "Đừng đoán nguyên nhân.",
                "feedback": "Đúng ý nhưng còn thiếu: chưa dặn thiếu số thì làm gì."
              },
              {
                "text": "Chỉ dùng ba số trên; số nào thiếu thì ghi 'chưa có số', không đoán nguyên nhân.",
                "good": true,
                "feedback": "Chặn cả việc bịa số lẫn việc thêm nguyên nhân không có trong dữ liệu."
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
            "text": "- Doanh số tuần: 1.820 triệu đồng.\n- Số đơn: 312 đơn.\n- Đơn hoàn trả: 6 đơn (khoảng 1,9% tổng số đơn).\nChưa có số về mức hài lòng của khách."
          },
          {
            "requires": [
              "context"
            ],
            "text": "Tuần này kinh doanh khá tốt, doanh số 1.820 triệu, tăng nhờ chiến dịch mới...\n(Có số thật nhưng thiếu giới hạn, nên AI tự thêm 'tăng nhờ chiến dịch mới' mà dữ liệu không có.)"
          },
          {
            "text": "Tuần này doanh số đạt 2.450 triệu, tăng 22% so với tuần trước, khách hàng rất hài lòng...\n(Không có số thật, nên AI bịa cả con số và mức tăng.)"
          }
        ]
      },
      {
        "type": "callout",
        "label": "Cẩn thận: người nhận sai",
        "text": "Luồng gửi tự động nhưng địa chỉ thì do bạn gõ. Một địa chỉ sai ở danh sách nhận có thể đưa số liệu nội bộ tới người ngoài. Hãy kiểm danh sách nhận kỹ hơn cả nội dung."
      },
      {
        "type": "scenario",
        "title": "Tuần thứ tư của luồng báo cáo",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Ba tuần đầu luồng gửi bạn, và bạn đã soát đều đúng. Tuần thứ tư, bạn đang vội đi họp vào sáng thứ Hai.",
            "choices": [
              {
                "label": "Chuyển người nhận sang sếp, giữ bạn cùng nhận, và soát bản của bạn khi tới nơi",
                "next": "good"
              },
              {
                "label": "Bỏ bạn khỏi danh sách nhận và coi như xong",
                "next": "bad"
              }
            ]
          },
          "bad": {
            "text": "Tuần đó tệp nguồn thiếu một ngày, tổng lệch. Bạn không thấy bản gửi nên không phát hiện, và sếp đọc số sai trong cuộc họp giao ban.",
            "ending": "bad"
          },
          "good": {
            "text": "Sếp nhận báo cáo, bạn nhận cùng bản. Khi mở ra bạn thấy tổng thiếu một ngày vì tệp nguồn đến muộn và nhắn sếp sửa trong 10 phút, trước giờ họp.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Luồng chọn số, AI viết lời, bạn soát đầu tiên.",
          "Bài sau: thử luồng bằng dữ liệu mẫu và bảo vệ người nhận thật."
        ]
      }
    ]
  }
];
