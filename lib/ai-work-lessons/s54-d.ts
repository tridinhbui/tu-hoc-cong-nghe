import type { Lesson } from "../lesson-types";

// Chặng 54, bài 16-20. Giáo trình: scripts/curriculum/stage-54.json.
// Cố ý không nêu tên nút, tên menu, giá hay tính năng cụ thể của công cụ nào:
// chỉ dạy khái niệm bền (đồng ý nhận tin, giờ yên tĩnh, dấu hiệu thư rác).
export const S54_D_LESSONS: Lesson[] = [
  {
    "id": 2495,
    "slug": "tin-nhan-xac-nhan-don-cho-khach",
    "title": "Chặng 54, Bài 16: Tin nhắn xác nhận đơn: ngắn, đủ ba thông tin",
    "subtitle": "Khách đặt xong chỉ muốn biết một điều: shop có nhận đơn của mình không.",
    "duration": "8 phút",
    "difficulty": "Trung bình",
    "emoji": "📦",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Tin xác nhận đơn là tin nhắn đầu tiên khách đọc sau khi trả tiền hoặc chốt hàng. Nếu thiếu tên hàng, số tiền hay ngày giao, khách phải nhắn hỏi lại và bạn mất thêm một vòng trả lời. Nếu AI tự điền sai một con số, khách giữ tin nhắn đó làm bằng chứng. Một mẫu ngắn, đủ ba thông tin và có người kiểm trước khi gửi tránh được cả hai.",
    "openingQuestion": "Khách vừa đặt 3 hộp trà qua tin nhắn. Bạn nhờ AI soạn tin xác nhận. Điều gì quan trọng nhất phải đúng trong tin đó?",
    "openingOptions": [
      "Tên hàng, số tiền và ngày giao phải khớp đúng đơn thật của khách",
      "Tin phải có nhiều biểu tượng vui để khách thấy thân thiện",
      "Tin phải dài và trang trọng để khách thấy cửa hàng chuyên nghiệp",
      "Tin phải kèm lời mời khách xem thêm sản phẩm mới của cửa hàng"
    ],
    "correctOption": 0,
    "explanation": "Tin xác nhận là một lời cam kết nhỏ: khách đọc và coi đó là điều cửa hàng đã hứa. Vì vậy ba thông tin tên hàng, số tiền và ngày giao phải khớp với đơn thật, còn giọng văn chỉ cần lịch sự và ngắn. Biểu tượng vui, độ dài trang trọng hay lời mời xem hàng mới đều không giúp khách biết đơn có đúng hay không, và lời mời quảng cáo còn làm loãng thông tin khách cần nhất.",
    "diagram": [
      {
        "label": "Đơn thật của khách",
        "arrow": true
      },
      {
        "label": "Mẫu tin có chỗ trống cho ba thông tin",
        "arrow": true
      },
      {
        "label": "AI điền nháp từ dữ liệu bạn đưa",
        "arrow": true
      },
      {
        "label": "Người thật đối chiếu với đơn rồi mới gửi"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Một cửa hàng trà nhỏ nhận đơn qua tin nhắn. Nhân viên nhờ AI viết tin xác nhận nhưng chỉ nói 'xác nhận đơn cho khách'. AI điền ngày giao 'trong 2 ngày' dù kho cần 4 ngày, khách chờ rồi phàn nàn. Sau đó cửa hàng dùng mẫu có ba chỗ trống điền từ phiếu đơn và một người đọc lại trước khi gửi."
    },
    "quiz": [
      {
        "question": "Ba thông tin tối thiểu trong một tin xác nhận đơn là gì?",
        "options": [
          "Tên hàng đã đặt, tổng số tiền và ngày giao dự kiến",
          "Lời chào, mã khuyến mãi tháng sau và đường dẫn trang chủ",
          "Giờ khách đặt, tên nhân viên bán và tên kho xuất hàng",
          "Ảnh sản phẩm, logo cửa hàng và đường dẫn mạng xã hội"
        ],
        "correct": 0,
        "explanation": "Khách cần biết mình mua gì, trả bao nhiêu và khi nào nhận. Mã khuyến mãi, logo hay đường dẫn là phần trang trí hoặc quảng cáo; giờ đặt và tên kho là thông tin nội bộ, khách không cần để kiểm tra đơn."
      },
      {
        "question": "Bạn đưa AI một phiếu đơn thiếu ngày giao. Cách xử lý nào đúng?",
        "options": [
          "Bỏ trống chỗ ngày giao và hỏi kho trước khi gửi",
          "Để AI tự điền ngày giao thông thường của ngành cho nhanh",
          "Ghi 'sớm nhất có thể' để khỏi phải cam kết ngày cụ thể",
          "Hỏi AI ngày giao hợp lý rồi gửi luôn cho khách"
        ],
        "correct": 0,
        "explanation": "AI không biết lịch kho của bạn nên sẽ đoán một ngày nghe hợp lý, và khách coi ngày đó là lời hứa. 'Sớm nhất có thể' làm khách phải nhắn hỏi lại. Chỗ trống cộng một cuộc hỏi kho là cách duy nhất cho ngày đúng."
      },
      {
        "question": "Vì sao tin xác nhận cần một người thật đọc lại trước khi gửi?",
        "options": [
          "AI có thể điền sai tên hàng hoặc con số mà vẫn viết rất trôi",
          "AI không viết được tiếng Việt có dấu cho tin nhắn ngắn",
          "Tin nhắn gửi khách bắt buộc phải có chữ ký tay của chủ cửa hàng",
          "Người đọc lại giúp tin nhắn dài hơn và trang trọng hơn"
        ],
        "correct": 0,
        "explanation": "Lỗi nguy hiểm không nằm ở giọng văn mà ở dữ kiện: một số tiền lệch vẫn đọc rất tự nhiên. AI viết được tiếng Việt có dấu, không có quy định chữ ký tay cho tin nhắn, và đọc lại không nhằm làm tin dài hơn."
      },
      {
        "question": "Tin xác nhận nên dài cỡ nào?",
        "options": [
          "Vài dòng ngắn, đọc xong trong một nhịp trên màn hình điện thoại",
          "Một đoạn văn dài giải thích quy trình đóng gói và vận chuyển",
          "Chỉ đúng một chữ 'OK' để khách không phải đọc nhiều",
          "Hai trang chính sách đổi trả gửi kèm để tránh tranh chấp sau này"
        ],
        "correct": 0,
        "explanation": "Khách đọc trên điện thoại, cần xác nhận nhanh. Một đoạn giải thích quy trình hay hai trang chính sách làm khách bỏ qua chính ba thông tin cần kiểm. Chỉ một chữ 'OK' lại không cho khách gì để đối chiếu."
      },
      {
        "question": "Bạn nhờ AI soạn mẫu tin xác nhận dùng cho mọi đơn. Cách làm nào tốt nhất?",
        "options": [
          "Mẫu có ba chỗ trống [tên hàng], [số tiền], [ngày giao] để điền từ đơn",
          "Mẫu có sẵn một tên hàng và một số tiền thường gặp nhất",
          "Mẫu viết sẵn cả ba thông tin theo đơn gần đây nhất",
          "Để AI tự viết tin mới cho mỗi đơn, không cần mẫu"
        ],
        "correct": 0,
        "explanation": "Chỗ trống buộc người điền phải lấy dữ kiện từ đơn thật. Mẫu có sẵn số cũ dễ bị gửi nhầm cho đơn khác, còn để AI viết mới mỗi lần thì mất tính nhất quán và tăng chỗ phải soát."
      }
    ],
    "keyTakeaways": [
      "Tin xác nhận đơn cần đúng ba thông tin: tên hàng, số tiền, ngày giao.",
      "Mẫu có chỗ trống để điền từ đơn thật, không để AI tự đoán dữ kiện.",
      "Ngắn vừa một màn hình điện thoại, giọng lịch sự là đủ.",
      "Luôn có một người đối chiếu tin với đơn trước khi gửi."
    ],
    "practicePrompt": {
      "question": "Đơn của khách có: 2 hộp trà sen, 360.000 đồng, ngày giao chưa có vì kho chưa trả lời. Bạn làm gì với tin xác nhận?",
      "options": [
        "Gửi tin có tên hàng và số tiền, ghi ngày giao sau khi kho trả lời",
        "Ghi đại một ngày giao gần nhất rồi đính chính sau nếu sai, để khách yên tâm",
        "Chờ có đủ cả ba thông tin mới gửi bất kỳ tin nào cho khách",
        "Nhờ AI chọn ngày giao hợp lý rồi gửi ngay"
      ],
      "correct": 0,
      "explanation": "Khách nên biết đơn đã được nhận, nhưng không nên nhận một ngày chưa ai xác nhận. Gửi phần chắc chắn, nói rõ ngày giao sẽ báo sau, rồi bổ sung khi kho trả lời. Đoán ngày hay để AI chọn là tự hứa thay kho."
    },
    "summary": {
      "keyIdea": "Tin xác nhận là lời cam kết nhỏ: ngắn, đủ ba thông tin, và khớp đơn thật.",
      "formula": "Mẫu ba chỗ trống + dữ liệu từ đơn + một người đối chiếu = tin gửi được.",
      "commonMistake": "Để AI điền ngày giao hoặc số tiền nghe hợp lý thay vì lấy từ đơn.",
      "action": "Viết mẫu ba chỗ trống cho đơn phổ biến nhất của bạn."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Lấy 3 đơn hàng thật gần đây của bạn (xoá tên khách). Nhờ AI soạn một mẫu tin xác nhận có ba chỗ trống, điền vào từng đơn, rồi đối chiếu từng con số với phiếu đơn. Lưu mẫu vào ghi chú, mai bạn sẽ được hỏi mẫu đã dùng cho đơn nào.",
      "secondary": "Ghi lại chỗ nào AI hay điền sai để thêm vào lời dặn trong mẫu."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Một khách vừa chốt đơn qua tin nhắn và đang chờ. Bạn muốn trả lời ngay mà không gõ lại từ đầu mỗi lần. Bài này dạy một mẫu xác nhận ngắn, đủ ba thông tin, để AI điền nháp còn người thật giữ quyền gửi."
      },
      {
        "type": "feynman",
        "title": "Tin xác nhận đơn đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới tờ phiếu nhận đồ ở tiệm giặt ủi: một mảnh giấy nhỏ ghi món đồ, tiền và ngày lấy. Khách giữ nó để đối chiếu, tiệm giữ liên kia.",
        "columns": [
          "Thành phần",
          "Phiếu ở tiệm giặt",
          "Tin xác nhận đơn"
        ],
        "rows": [
          [
            "Món đồ",
            "Áo sơ mi, 2 cái",
            "Tên hàng và số lượng"
          ],
          [
            "Tiền",
            "Số tiền phải trả",
            "Tổng số tiền của đơn"
          ],
          [
            "Ngày",
            "Ngày hẹn lấy",
            "Ngày giao dự kiến"
          ],
          [
            "Người kiểm",
            "Nhân viên đối chiếu với túi đồ",
            "Người thật đối chiếu với đơn trước khi gửi"
          ]
        ],
        "oneLiner": "Tin xác nhận là tờ phiếu nhận hàng bằng chữ: đủ ba dòng, khớp với đơn thật."
      },
      {
        "type": "heading",
        "text": "Vấn đề: khách nhắn hỏi lại vì tin thiếu"
      },
      {
        "type": "paragraph",
        "text": "Nhiều cửa hàng trả lời 'Dạ shop nhận đơn rồi ạ' và dừng ở đó. Khách không biết shop hiểu đúng đơn chưa, nên nhắn thêm: 'Giao ngày nào vậy?', 'Tổng bao nhiêu?'. Mỗi câu hỏi lại là một lượt trả lời của bạn."
      },
      {
        "type": "flow",
        "title": "Từ đơn thật tới tin gửi khách",
        "steps": [
          {
            "label": "Lấy dữ kiện từ phiếu đơn",
            "detail": "Tên hàng, số tiền, ngày giao chép từ phiếu đơn, không nhớ bằng đầu và không hỏi AI."
          },
          {
            "label": "Đưa vào mẫu có chỗ trống",
            "detail": "Mẫu có ba chỗ trống cố định và một câu chào ngắn; AI chỉ giúp điền và giữ giọng văn."
          },
          {
            "label": "Người thật đối chiếu",
            "detail": "Đọc từng con số trong tin cạnh phiếu đơn, tới khi khớp hết."
          },
          {
            "label": "Gửi và lưu tin",
            "detail": "Lưu tin đã gửi cùng đơn để sau này tra khi khách hỏi."
          }
        ]
      },
      {
        "type": "paragraph",
        "text": "Với AI, 'chỗ trống' là khái niệm quan trọng: bạn đưa mẫu và dữ kiện thật, nó chỉ ghép chữ. Nếu bạn không đưa dữ kiện, nó sẽ đoán một giá trị nghe hợp lý, và đó là cách con số sai lọt vào tin gửi khách."
      },
      {
        "type": "comparison",
        "left": {
          "label": "Tin tốt",
          "text": "Xin chào chị Hoa, shop xác nhận đơn: 2 hộp trà sen, tổng 360.000 đồng, giao dự kiến thứ Năm. Có gì lệch chị báo shop nhé."
        },
        "right": {
          "label": "Tin dễ gây hiểu lầm",
          "text": "Dạ shop nhận đơn của chị rồi ạ, cảm ơn chị đã tin tưởng, shop sẽ giao sớm nhất có thể và có nhiều ưu đãi tháng sau..."
        }
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Viết mẫu có ba chỗ trống: [tên hàng], [số tiền], [ngày giao].",
          "Bước 2 - Cho AI xem mẫu và một phiếu đơn (đã xoá tên khách) để nó điền thử.",
          "Bước 3 - Đối chiếu từng con số với phiếu đơn.",
          "Bước 4 - Thêm câu 'Có gì lệch chị báo shop nhé' để khách giúp bạn bắt lỗi."
        ]
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI điền mẫu xác nhận đơn",
        "task": "Khách đặt 3 hộp trà gừng, tổng 450.000 đồng, giao thứ Sáu. Lắp prompt để AI điền vào mẫu tin xác nhận.",
        "parts": [
          {
            "id": "context",
            "label": "Dữ kiện",
            "options": [
              {
                "text": "Khách đặt trà, xác nhận giúp tôi.",
                "feedback": "Thiếu số lượng, tiền và ngày: AI sẽ tự điền cho tin nghe đầy đủ."
              },
              {
                "text": "Đơn: 3 hộp trà gừng, tổng 450.000 đồng, giao thứ Sáu. Điền đúng những dữ kiện này, không thêm gì.",
                "good": true,
                "feedback": "Dữ kiện thật nằm ngay trong yêu cầu nên tin chỉ dùng số bạn đưa."
              }
            ]
          },
          {
            "id": "format",
            "label": "Mẫu",
            "options": [
              {
                "text": "Viết tin xác nhận cho hay và thu hút.",
                "feedback": "'Hay và thu hút' khiến AI thêm ưu đãi bạn chưa hề có."
              },
              {
                "text": "Dùng mẫu: Chào [tên], shop xác nhận [hàng], [tiền], giao [ngày]. Dưới 40 chữ.",
                "good": true,
                "feedback": "Mẫu có chỗ trống và giới hạn độ dài giữ tin ngắn đúng ba thông tin."
              }
            ]
          },
          {
            "id": "check",
            "label": "Chỗ cho người kiểm",
            "options": [
              {
                "text": "Thêm dòng cuối: 'Có gì lệch chị báo shop nhé.'",
                "good": true,
                "feedback": "Khách giúp bạn bắt lỗi trước khi đơn đi, và bạn có dấu vết kiểm."
              },
              {
                "text": "Không cần dòng nào, tin đã đủ.",
                "feedback": "Nếu lệch, khách chỉ phát hiện khi hàng tới, lúc đó đã muộn."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "context",
              "format",
              "check"
            ],
            "text": "Chào chị, shop xác nhận đơn: 3 hộp trà gừng, tổng 450.000 đồng, giao dự kiến thứ Sáu. Có gì lệch chị báo shop nhé."
          },
          {
            "requires": [
              "context"
            ],
            "text": "Dạ shop xác nhận đơn 3 hộp trà gừng, 450.000 đồng, giao thứ Sáu ạ. Cảm ơn chị đã ủng hộ shop rất nhiều, shop sẽ tiếp tục phục vụ chị ngày càng tốt hơn...\n\n(Đúng dữ kiện nhưng dài và không có dòng để khách kiểm.)"
          },
          {
            "text": "Chào chị, shop xác nhận đơn 2 hộp trà xanh, 380.000 đồng, giao ngày mai kèm quà tặng.\n\n(Không có dữ kiện thật nên AI tự bịa số lượng, tiền và quà tặng.)"
          }
        ]
      },
      {
        "type": "callout",
        "label": "Người thật luôn giữ nút gửi",
        "text": "AI điền nháp, người kiểm, rồi người gửi. Không nối thẳng đầu ra của AI vào tin nhắn gửi khách khi chưa có ai đọc. Một con số sai trong tin xác nhận là lời hứa sai gửi đi tên cửa hàng của bạn."
      },
      {
        "type": "scenario",
        "title": "Tin xác nhận lúc cao điểm",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Cuối ngày bạn có 12 đơn. Bạn có mẫu ba chỗ trống và AI vừa điền xong 12 tin nháp.",
            "choices": [
              {
                "label": "Gửi ngay cả 12 tin vì AI đã điền đủ",
                "next": "bad1"
              },
              {
                "label": "Đối chiếu từng tin với phiếu đơn rồi mới gửi",
                "next": "s2"
              }
            ]
          },
          "bad1": {
            "text": "Đơn số 7 bị điền nhầm 350.000 đồng thay vì 530.000 đồng. Khách chuyển khoản theo tin nhắn và shop phải xin lỗi, hoàn và xuất lại đơn.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bạn thấy đơn số 4 thiếu ngày giao vì kho chưa trả lời.",
            "choices": [
              {
                "label": "Giữ tin số 4, hỏi kho rồi mới gửi",
                "next": "good"
              },
              {
                "label": "Điền đại ngày giao thường gặp để kịp gửi",
                "next": "bad2"
              }
            ]
          },
          "bad2": {
            "text": "Kho giao trễ hai ngày so với ngày bạn điền. Khách nhắn hỏi và giữ tin xác nhận làm bằng chứng.",
            "ending": "bad"
          },
          "good": {
            "text": "Cả 12 tin đi đúng. Tin số 4 đến chậm hai giờ nhưng đúng ngày giao, không khách nào phải hỏi lại.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Ba thông tin, một mẫu, một người kiểm.",
          "Bài sau: khi nào tin nhắn không được gửi đi, dù đã soạn xong."
        ]
      }
    ]
  },
  {
    "id": 2496,
    "slug": "gio-yen-tinh-khong-nhan-tin-ban-dem",
    "title": "Chặng 54, Bài 17: Giờ yên tĩnh: khi nào tin nhắn không được gửi đi",
    "subtitle": "Tin hay đến đâu, 23 giờ đêm vẫn là tin làm phiền.",
    "duration": "8 phút",
    "difficulty": "Trung bình",
    "emoji": "🌙",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Hệ thống tự gửi tin không biết bây giờ là mấy giờ với khách. Nó gửi ngay khi có việc xảy ra, kể cả lúc khách đang ngủ. Một khung giờ được gửi, cộng quy tắc hoãn sang sáng hôm sau, là cách rẻ nhất để tránh bị chặn, bị phàn nàn hay mất thiện cảm của khách.",
    "openingQuestion": "Hệ thống của bạn gửi thông báo 'đơn đã được đóng gói' lúc kho xong việc, tức 23 giờ. Khách phàn nàn. Sửa thế nào gọn nhất?",
    "openingOptions": [
      "Đặt khung giờ được gửi, tin ngoài khung sẽ hoãn tới sáng hôm sau",
      "Bảo nhân viên kho đóng gói sớm hơn để tin không rơi vào ban đêm nữa",
      "Đổi nội dung tin cho thật lịch sự và có lời xin lỗi vì gửi muộn",
      "Tắt hẳn thông báo đóng gói vì khách nào cũng thấy phiền"
    ],
    "correctOption": 0,
    "explanation": "Vấn đề không nằm ở nội dung mà ở thời điểm. Một khung giờ được gửi với quy tắc hoãn là sửa ngay chỗ gốc: tin vẫn gửi, chỉ chuyển sang lúc khách dễ đọc. Bắt kho đổi giờ làm bỏ qua việc tin có thể phát sinh từ nhiều nguồn khác. Lời xin lỗi trong tin không làm khách bớt bị đánh thức, và tắt hẳn thông báo làm mất thông tin hữu ích mà nhiều khách muốn có.",
    "diagram": [
      {
        "label": "Có việc xảy ra cần báo khách",
        "arrow": true
      },
      {
        "label": "Kiểm tra giờ hiện tại theo giờ của khách",
        "arrow": true
      },
      {
        "label": "Trong khung giờ: gửi ngay",
        "arrow": true
      },
      {
        "label": "Ngoài khung giờ: xếp hàng gửi sáng hôm sau"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Một cửa hàng trực tuyến gửi tin 'đã giao cho đơn vị vận chuyển' ngay khi kho quét mã, có hôm lúc 23 giờ 30. Vài khách nhắn lại bằng tin giận dữ, một số tắt nhận tin. Cửa hàng đặt khung giờ gửi từ 8 đến 21 giờ và tin ngoài khung được xếp hàng tới 8 giờ sáng."
    },
    "quiz": [
      {
        "question": "Mục đích của 'giờ yên tĩnh' trong hệ thống tin nhắn là gì?",
        "options": [
          "Ngăn tin tự động làm phiền khách ngoài khung giờ hợp lý",
          "Giảm số tin gửi đi để tiết kiệm chi phí cho cửa hàng",
          "Bắt khách đọc hết mọi tin trước khi tin tiếp theo được gửi",
          "Giúp nhân viên không phải trực máy tính ban đêm"
        ],
        "correct": 0,
        "explanation": "Giờ yên tĩnh bảo vệ khách khỏi tin đến sai lúc, còn tin vẫn được gửi sau. Nó không nhằm giảm chi phí, không bắt khách đọc, và hệ thống vẫn chạy khi không ai trực."
      },
      {
        "question": "Tin phát sinh lúc 23 giờ và khung được gửi là 8 đến 21 giờ. Hệ thống nên làm gì?",
        "options": [
          "Xếp tin vào hàng chờ và gửi lúc 8 giờ sáng",
          "Huỷ tin vì đã quá giờ, khách sẽ tự xem trạng thái đơn",
          "Gửi ngay vì khách chưa chắc đã ngủ lúc đó",
          "Gửi nhưng thêm lời xin lỗi vì đã nhắn trễ vào ban đêm"
        ],
        "correct": 0,
        "explanation": "Hoãn giữ được thông tin mà không đánh thức khách. Huỷ tin làm khách mất thông tin, gửi ngay là chính lỗi ban đầu, còn lời xin lỗi không làm điện thoại bớt rung."
      },
      {
        "question": "Khách ở múi giờ khác với cửa hàng. Giờ nào dùng để so với khung được gửi?",
        "options": [
          "Giờ tại nơi khách đang ở",
          "Giờ của máy chủ đặt ở trung tâm dữ liệu",
          "Giờ của cửa hàng vì người gửi quyết định",
          "Giờ của điện thoại nhân viên bấm gửi tin"
        ],
        "correct": 0,
        "explanation": "Khung yên tĩnh bảo vệ giấc ngủ của khách nên tính theo giờ của khách. Giờ máy chủ hay giờ cửa hàng chỉ đúng khi trùng múi giờ, còn điện thoại nhân viên không liên quan."
      },
      {
        "question": "Tin nào thường vẫn được gửi ngoài giờ, nếu khách từng cho phép?",
        "options": [
          "Mã xác thực một lần khách đang chờ để đăng nhập",
          "Tin quảng cáo giảm giá cuối tuần cho toàn bộ danh sách",
          "Khảo sát mức hài lòng sau lần mua hàng gần nhất",
          "Nhắc khách xem lại giỏ hàng bỏ dở từ tuần trước"
        ],
        "correct": 0,
        "explanation": "Mã xác thực là tin khách đang chờ ngay, nên trì hoãn làm hỏng việc họ đang làm. Quảng cáo, khảo sát hay nhắc giỏ hàng không gấp gì, nên đều có thể chờ tới sáng."
      },
      {
        "question": "Bạn nên ghi gì vào tài liệu mô tả quy tắc giờ yên tĩnh?",
        "options": [
          "Khung giờ gửi, loại tin ngoại lệ và giờ hoãn tới",
          "Chỉ cần ghi 'không gửi ban đêm' vì ai cũng hiểu ban đêm là mấy giờ",
          "Danh sách khách hàng đã từng phàn nàn về tin nhắn ban đêm",
          "Mẫu tin xin lỗi dùng khi lỡ gửi sai giờ cho khách"
        ],
        "correct": 0,
        "explanation": "Quy tắc phải đủ cụ thể để người khác áp dụng được: khung giờ, tin nào được ngoại lệ, và hoãn tới lúc nào. 'Ban đêm' mỗi người hiểu một khác, danh sách phàn nàn là hậu quả chứ không phải quy tắc."
      }
    ],
    "keyTakeaways": [
      "Hệ thống tự gửi tin không biết mấy giờ với khách: bạn phải dạy nó.",
      "Đặt khung giờ được gửi và hoãn tin ngoài khung tới sáng.",
      "Tính giờ theo nơi khách ở, không theo giờ máy chủ.",
      "Tin khách đang chờ, như mã xác thực, là ngoại lệ có chủ đích."
    ],
    "practicePrompt": {
      "question": "Cửa hàng bạn có quy tắc: khung gửi 8-21 giờ. Có tin nhắc thanh toán phát sinh lúc 21 giờ 40. Bạn làm gì?",
      "options": [
        "Xếp hàng chờ và gửi lúc 8 giờ sáng hôm sau",
        "Gửi ngay vì chỉ trễ có 40 phút so với khung",
        "Huỷ tin vì khách sẽ tự nhớ thanh toán",
        "Gửi ngay nhưng bỏ chữ 'gấp' cho đỡ phiền"
      ],
      "correct": 0,
      "explanation": "Khung là ranh giới, và 21 giờ 40 nằm ngoài. Tin nhắc thanh toán không phải tin khách đang chờ nên có thể đợi tới 8 giờ. Gửi 'chỉ trễ chút' làm quy tắc thành thứ ai cũng nới được, còn huỷ tin làm mất nhắc nhở cần thiết."
    },
    "summary": {
      "keyIdea": "Đúng nội dung vẫn có thể sai thời điểm: đặt khung giờ và hoãn tin ngoài khung.",
      "formula": "Khung giờ + giờ của khách + danh sách ngoại lệ = giờ yên tĩnh.",
      "commonMistake": "Chỉ chỉnh lời lẽ trong tin thay vì chỉnh thời điểm gửi.",
      "action": "Viết ra khung giờ gửi và một loại tin ngoại lệ cho hệ thống của bạn."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Liệt kê mọi loại tin tự động mà công việc của bạn đang gửi (xác nhận, nhắc lịch, thông báo). Với mỗi loại, ghi giờ sớm nhất và muộn nhất hợp lý, và đánh dấu loại nào được ngoại lệ. Mai bạn sẽ được hỏi khung giờ bạn chọn là gì.",
      "secondary": "Nhờ AI đọc bảng của bạn và hỏi lại chỗ mơ hồ, đừng để nó tự thêm quy tắc."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Một khách nhắn lại lúc 23 giờ 30 rằng họ vừa bị đánh thức vì thông báo của bạn. Bài này dạy cách đặt khung giờ được gửi và quy tắc hoãn, để tin tự động không bao giờ làm phiền khách."
      },
      {
        "type": "feynman",
        "title": "Giờ yên tĩnh đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới người đưa thư. Họ không gõ cửa lúc nửa đêm; thư tới muộn thì để vào hộp thư sáng mai khách đọc.",
        "columns": [
          "Thành phần",
          "Người đưa thư",
          "Tin nhắn tự động"
        ],
        "rows": [
          [
            "Giờ làm việc",
            "Đưa thư ban ngày",
            "Khung giờ được gửi"
          ],
          [
            "Thư tới muộn",
            "Để vào hộp, giao sáng mai",
            "Xếp hàng, gửi lúc mở khung"
          ],
          [
            "Việc gấp",
            "Chuyển phát nhanh, gọi trước",
            "Tin ngoại lệ như mã xác thực"
          ],
          [
            "Người chịu trách nhiệm",
            "Bưu điện đặt giờ giao",
            "Bạn đặt khung và ghi ra giấy"
          ]
        ],
        "oneLiner": "Giờ yên tĩnh là người đưa thư biết giờ: thư tới muộn thì chờ sáng mai."
      },
      {
        "type": "heading",
        "text": "Vấn đề: hệ thống gửi ngay khi có việc"
      },
      {
        "type": "paragraph",
        "text": "Phần mềm tự động chạy theo sự kiện: kho xong thì gửi, thanh toán xong thì gửi. Nó không biết khách đang ở đâu, mấy giờ rồi. Bạn phải thêm một điều kiện kiểm giờ vào đúng chỗ đó."
      },
      {
        "type": "flow",
        "title": "Kiểm giờ trước khi gửi",
        "steps": [
          {
            "label": "Sự kiện phát sinh",
            "detail": "Một việc xảy ra cần báo khách, ví dụ kho đã đóng gói xong."
          },
          {
            "label": "Hỏi: giờ của khách là mấy giờ",
            "detail": "Hệ thống lấy giờ theo nơi khách ở, không phải giờ máy chủ hay giờ cửa hàng."
          },
          {
            "label": "Trong khung thì gửi",
            "detail": "Nếu giờ nằm trong khung được gửi và tin không phải loại nhạy cảm về thời gian, gửi ngay."
          },
          {
            "label": "Ngoài khung thì hoãn",
            "detail": "Xếp tin vào hàng chờ tới giờ mở khung, rồi gửi theo thứ tự."
          }
        ]
      },
      {
        "type": "paragraph",
        "text": "Có hai từ mới: khung giờ (khoảng giờ được phép gửi) và hàng chờ (nơi tin nằm cho tới giờ gửi). Còn lại là quy tắc bạn tự viết bằng câu nói thường."
      },
      {
        "type": "comparison",
        "left": {
          "label": "Quy tắc rõ",
          "text": "Tin quảng cáo và nhắc việc chỉ gửi từ 8 đến 21 giờ theo giờ của khách. Ngoài khung thì gửi lúc 8 giờ. Mã xác thực là ngoại lệ."
        },
        "right": {
          "label": "Quy tắc mơ hồ",
          "text": "Đừng gửi tin quá muộn, nếu trễ thì xem xét. Ai gửi thì tự quyết định theo tình hình từng ngày."
        }
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Chọn khung giờ gửi cho từng loại tin.",
          "Bước 2 - Ghi ra loại tin được ngoại lệ và lý do.",
          "Bước 3 - Ghi rõ tin ngoài khung hoãn tới lúc nào.",
          "Bước 4 - Thử một tin lúc 23 giờ và xem nó có nằm lại tới sáng không."
        ]
      },
      {
        "type": "callout",
        "label": "Hỏi người có trách nhiệm",
        "text": "Một số quốc gia và nền tảng có quy định riêng về giờ gửi tin quảng cáo. Nếu công việc của bạn gửi tin quảng cáo số lượng lớn, hãy hỏi bộ phận pháp chế hoặc chuyên gia trước khi chốt khung giờ."
      },
      {
        "type": "scenario",
        "title": "Khách phàn nàn vì tin lúc 23 giờ",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Sáng thứ Hai, một khách nhắn: 'Sao 23 giờ tối còn gửi tin thông báo?'. Đây là lần thứ ba trong tuần.",
            "choices": [
              {
                "label": "Xin lỗi khách rồi để hệ thống như cũ",
                "next": "bad1"
              },
              {
                "label": "Xin lỗi, rồi đặt khung giờ gửi và quy tắc hoãn",
                "next": "s2"
              }
            ]
          },
          "bad1": {
            "text": "Cuối tuần có thêm năm khách phàn nàn, hai người tắt nhận thông báo. Bạn mất một kênh liên lạc với họ.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bạn đặt khung 8-21 giờ. Một nhân viên hỏi: 'Mã xác thực cũng hoãn luôn à?'",
            "choices": [
              {
                "label": "Hoãn tất cả tin cho công bằng, kể cả mã xác thực",
                "next": "bad2"
              },
              {
                "label": "Hoãn tin thường, riêng mã xác thực gửi ngay và ghi vào tài liệu",
                "next": "good"
              }
            ]
          },
          "bad2": {
            "text": "Khách xin mã lúc 22 giờ nhưng mã tới sáng hôm sau. Khách không đăng nhập được và nhắn hỏi hàng loạt.",
            "ending": "bad"
          },
          "good": {
            "text": "Tin thường tới đúng giờ, mã xác thực vẫn tới ngay. Tuần sau không còn phàn nàn, và quy tắc ghi rõ cho người mới.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Nội dung đúng chưa đủ: thời điểm cũng phải đúng.",
          "Bài sau: gửi cho nhiều người mà không bị coi là thư rác."
        ]
      }
    ]
  },
  {
    "id": 2497,
    "slug": "tranh-bi-danh-dau-thu-rac-khi-gui-hang-loat",
    "title": "Chặng 54, Bài 18: Gửi cho nhiều người mà không bị coi là thư rác",
    "subtitle": "Bộ lọc thư rác đọc thư của bạn như một người khó tính.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "📨",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Khi gửi một bản thư cho 100 khách, nếu bộ lọc coi nó là thư rác thì cả trăm người không thấy gì, và lần sau thư của bạn dễ bị nghi ngờ hơn. Biết những dấu hiệu khiến thư bị nghi, và kiểm theo hướng dẫn chính thức của dịch vụ thư bạn dùng, giúp thư tới được hộp thư chính.",
    "openingQuestion": "Bạn gửi bản tin cho 100 khách và chỉ 12 người mở. Nhiều thư có thể đã vào mục thư rác. Bạn kiểm điều gì đầu tiên?",
    "openingOptions": [
      "Nội dung thư có dấu hiệu quen thuộc của thư rác hay không",
      "Tên người gửi có đủ ngắn để khách nhớ hay không",
      "Thư có được gửi vào đúng buổi sáng thứ Hai hay không",
      "Màu chữ tiêu đề có nổi bật so với hộp thư khách hay không"
    ],
    "correctOption": 0,
    "explanation": "Bộ lọc đánh giá thư qua nhiều dấu hiệu: tiêu đề giật gân, chữ viết hoa, quá nhiều đường dẫn, thiếu cách huỷ đăng ký, người gửi chưa được xác thực. Kiểm nội dung và cách gửi trước là việc bạn tự làm được ngay. Độ dài tên người gửi và màu tiêu đề hầu như không quyết định thư có vào thư rác, còn ngày giờ gửi chỉ ảnh hưởng mức mở thư chứ không phải chuyện lọc.",
    "diagram": [
      {
        "label": "Bản thư gửi 100 khách",
        "arrow": true
      },
      {
        "label": "Bộ lọc của dịch vụ thư chấm điểm nghi ngờ",
        "arrow": true
      },
      {
        "label": "Điểm cao: vào thư rác",
        "arrow": true
      },
      {
        "label": "Điểm thấp: vào hộp thư chính"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Một trung tâm đào tạo nhỏ gửi thư tháng cho 100 học viên, tiêu đề viết hoa toàn bộ, có 9 đường dẫn và không có dòng huỷ đăng ký. Chỉ một phần nhỏ khách thấy thư. Sau khi rút tiêu đề, giảm đường dẫn, thêm dòng huỷ đăng ký rõ ràng và đọc hướng dẫn của dịch vụ thư, phần khách nhận được thư tăng rõ rệt."
    },
    "quiz": [
      {
        "question": "Dấu hiệu nào trong bản thư dễ bị bộ lọc thư rác nghi ngờ?",
        "options": [
          "Tiêu đề viết hoa toàn bộ kèm nhiều dấu chấm than",
          "Một lời chào bằng tên riêng của từng khách",
          "Một đường dẫn tới trang sản phẩm đang bán",
          "Một dòng địa chỉ liên hệ của cửa hàng ở cuối thư"
        ],
        "correct": 0,
        "explanation": "Viết hoa toàn bộ và nhiều dấu chấm than là dấu hiệu quen thuộc của thư quảng cáo hàng loạt. Lời chào bằng tên, một đường dẫn hợp lý và địa chỉ liên hệ là điều thư bình thường vẫn có."
      },
      {
        "question": "Vì sao thư hàng loạt cần có cách huỷ đăng ký rõ ràng?",
        "options": [
          "Khách không muốn nhận nữa sẽ huỷ thay vì bấm báo thư rác",
          "Để danh sách khách hàng của bạn trông dài hơn",
          "Để bộ lọc nghĩ thư của bạn là thư cá nhân",
          "Để bạn gửi thư nhiều hơn mà khách không phàn nàn"
        ],
        "correct": 0,
        "explanation": "Khách bấm 'báo thư rác' làm điểm uy tín người gửi giảm và thư sau dễ bị lọc. Có nút huỷ rõ ràng cho khách lối thoát nhẹ hơn. Nó không làm thư thành thư cá nhân, không làm danh sách dài ra, và cũng không dùng để gửi nhiều hơn."
      },
      {
        "question": "Bạn nên kiểm điều gì về hướng dẫn gửi thư hàng loạt của dịch vụ thư đang dùng?",
        "options": [
          "Đọc trang hướng dẫn chính thức của đúng dịch vụ đó",
          "Nhờ AI kể lại hướng dẫn từ trí nhớ của nó rồi làm theo luôn",
          "Dùng quy tắc của một dịch vụ thư khác cho chắc",
          "Bỏ qua hướng dẫn nếu thư đã gửi được vài lần"
        ],
        "correct": 0,
        "explanation": "Quy tắc và giới hạn của từng dịch vụ thư khác nhau và đổi theo thời gian, nên nguồn đáng tin là trang hướng dẫn chính thức của đúng dịch vụ. AI có thể nhớ sai hoặc lỗi thời, và quy tắc của dịch vụ khác không chắc áp dụng."
      },
      {
        "question": "Bản thư có 12 đường dẫn, phần lớn là ngắn gọn rút link. Nên làm gì?",
        "options": [
          "Giữ vài đường dẫn cần thiết, dùng link đầy đủ",
          "Thêm đường dẫn nữa để khách có nhiều lựa chọn hơn",
          "Giữ nguyên vì đường dẫn càng nhiều khách càng bấm",
          "Đổi tất cả thành ảnh để bộ lọc không đọc được link"
        ],
        "correct": 0,
        "explanation": "Nhiều đường dẫn rút gọn là dấu hiệu bộ lọc hay nghi, vì người gửi thư rác thường che điểm đến. Ít đường dẫn rõ ràng thì an toàn hơn. Nhiều đường dẫn thêm không làm khách bấm nhiều hơn, và đổi sang ảnh còn bị coi là lảng tránh."
      },
      {
        "question": "Trước khi gửi 100 thư, cách nào giảm rủi ro nhất?",
        "options": [
          "Gửi thử cho vài hộp thư của mình, xem nó vào đâu",
          "Gửi luôn cho cả 100 người rồi xem ai phàn nàn",
          "Nhờ AI cam đoan là thư sẽ không bao giờ vào thư rác",
          "Gửi trong một phút để khách nhận cùng lúc"
        ],
        "correct": 0,
        "explanation": "Gửi thử cho vài hộp thư của chính bạn cho thấy thư rơi vào mục nào trước khi tới khách thật. Chờ phàn nàn thì đã muộn, AI không nhìn được hộp thư khách, và gửi dồn cùng lúc còn dễ bị nghi hơn."
      }
    ],
    "keyTakeaways": [
      "Bộ lọc thư rác chấm thư qua nhiều dấu hiệu, không chỉ một.",
      "Tiêu đề giật gân, nhiều đường dẫn, thiếu huỷ đăng ký là dấu hiệu hay gặp.",
      "Nguồn đúng cho quy tắc là hướng dẫn chính thức của dịch vụ thư bạn dùng.",
      "Gửi thử cho vài hộp thư của chính mình trước khi gửi số lượng lớn."
    ],
    "practicePrompt": {
      "question": "Bản thư có tiêu đề 'MIỄN PHÍ!!! CHỈ HÔM NAY!!!', không có dòng huỷ đăng ký. Bạn sửa điều gì trước tiên?",
      "options": [
        "Viết lại tiêu đề bình thường và thêm dòng huỷ đăng ký",
        "Giữ tiêu đề nhưng đổi màu chữ cho đỡ chói mắt và bớt dấu chấm than",
        "Chia 100 khách làm hai đợt gửi cách nhau một giờ",
        "Thêm ảnh khuyến mãi thật lớn để khách chú ý"
      ],
      "correct": 0,
      "explanation": "Hai dấu hiệu nặng nhất nằm đúng ở tiêu đề giật gân và thiếu cách huỷ. Sửa hai điểm này là hiệu quả nhất. Đổi màu, chia đợt hay thêm ảnh không xử lý nguyên nhân khiến bộ lọc nghi ngờ."
    },
    "summary": {
      "keyIdea": "Thư hàng loạt vào thư rác vì dấu hiệu trong thư và cách gửi, không phải do nội dung tốt hay xấu.",
      "formula": "Tiêu đề bình thường + ít đường dẫn rõ + có huỷ đăng ký + gửi thử = dễ tới hộp thư chính.",
      "commonMistake": "Gửi ngay cho cả danh sách mà chưa thử cho vài hộp thư của chính mình.",
      "action": "Soát bản thư tiếp theo của bạn với danh sách dấu hiệu trong bài."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Lấy một bản thư bạn định gửi số lượng lớn (hoặc viết một bản 100 chữ). Nhờ AI chỉ ra ba chỗ có thể bị nghi ngờ, rồi tự đối chiếu với trang hướng dẫn chính thức của dịch vụ thư bạn dùng. Ghi lại ba chỗ đã sửa, mai bạn sẽ được hỏi.",
      "secondary": "Gửi thử bản đã sửa cho hai hộp thư của chính bạn và ghi nó vào mục nào."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bạn vừa soạn xong bản thư gửi 100 khách, và chỉ còn việc bấm Gửi. Trước khi bấm, hãy nhìn nó như bộ lọc thư rác: người khó tính, đọc rất nhanh, và nghi ngờ mọi thứ quá giống quảng cáo."
      },
      {
        "type": "feynman",
        "title": "Bộ lọc thư rác đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới bảo vệ toà nhà cho người ra vào. Anh ta không biết mặt từng người, nên nhìn dấu hiệu: có thẻ không, đi một mình hay cả nhóm, ăn mặc ra sao.",
        "columns": [
          "Thành phần",
          "Bảo vệ toà nhà",
          "Bộ lọc thư rác"
        ],
        "rows": [
          [
            "Nhìn gì",
            "Thẻ, dáng vẻ, giờ vào",
            "Tiêu đề, đường dẫn, người gửi"
          ],
          [
            "Dấu hiệu đáng ngờ",
            "Không thẻ, đi đông người một lúc",
            "Giật gân, nhiều link, gửi hàng loạt"
          ],
          [
            "Cách qua cửa",
            "Có thẻ hợp lệ",
            "Người gửi được xác thực, có huỷ đăng ký"
          ],
          [
            "Bạn làm gì",
            "Đeo thẻ đàng hoàng",
            "Soát thư, đọc hướng dẫn, gửi thử"
          ]
        ],
        "oneLiner": "Bộ lọc là bảo vệ đọc dấu hiệu: bạn làm cho thư trông giống thư thật."
      },
      {
        "type": "heading",
        "text": "Vấn đề: thư vào thư rác mà bạn không hay biết"
      },
      {
        "type": "paragraph",
        "text": "Điểm nguy hiểm là bạn không thấy. Thư gửi đi bình thường, không lỗi nào báo về, chỉ có tỷ lệ mở thấp. Khi đó nhiều người tưởng khách không quan tâm."
      },
      {
        "type": "flow",
        "title": "Soát một bản thư trước khi gửi",
        "steps": [
          {
            "label": "Đọc tiêu đề",
            "detail": "Bỏ chữ viết hoa toàn bộ và dấu chấm than lặp lại."
          },
          {
            "label": "Đếm đường dẫn",
            "detail": "Giữ vài đường dẫn cần thiết, tránh link rút gọn che đích đến."
          },
          {
            "label": "Kiểm dòng huỷ đăng ký",
            "detail": "Khách phải tìm thấy cách ngừng nhận trong vài giây."
          },
          {
            "label": "Đối chiếu hướng dẫn chính thức",
            "detail": "Mở trang hướng dẫn của dịch vụ thư bạn dùng, kiểm các yêu cầu với người gửi."
          },
          {
            "label": "Gửi thử",
            "detail": "Gửi cho vài hộp thư của chính bạn, xem nó vào mục nào."
          }
        ]
      },
      {
        "type": "paragraph",
        "text": "Hai từ mới: xác thực người gửi (chứng minh thư đến từ tên miền của bạn) và uy tín người gửi (điểm tin cậy tích luỹ theo lịch sử gửi). Cách thiết lập cụ thể khác nhau ở từng dịch vụ, nên đọc hướng dẫn chính thức của dịch vụ bạn dùng, hoặc hỏi bộ phận IT."
      },
      {
        "type": "comparison",
        "left": {
          "label": "Thư ít bị nghi",
          "text": "Tiêu đề rõ ý, chào đúng tên khách, hai đường dẫn đầy đủ, có dòng 'Nếu không muốn nhận nữa, bấm vào đây'."
        },
        "right": {
          "label": "Thư dễ bị nghi",
          "text": "TIÊU ĐỀ VIẾT HOA!!!, mười đường dẫn rút gọn, không có cách huỷ, nhiều lời hứa 'miễn phí' và 'chỉ hôm nay'."
        }
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Soát bản thư gửi 100 khách",
        "task": "Bản thư dưới đây của một trung tâm đào tạo. Đánh dấu những chỗ dễ bị bộ lọc thư rác nghi ngờ.",
        "segments": [
          {
            "text": "Tiêu đề: Lịch khai giảng khoá tháng 10 và cách đăng ký"
          },
          {
            "text": "Chào chị Hoa, trung tâm gửi chị lịch các lớp tháng 10."
          },
          {
            "text": "MIỄN PHÍ 100%!!! ĐĂNG KÝ NGAY HÔM NAY KẺO MẤT!!!",
            "error": "Viết hoa toàn bộ, dấu chấm than lặp lại và lời hứa 'miễn phí 100%' là dấu hiệu điển hình của thư rác."
          },
          {
            "text": "Xem lịch chi tiết tại: bit.ly/xx12, bit.ly/yy34, bit.ly/zz56, bit.ly/aa78",
            "error": "Nhiều link rút gọn che điểm đến nên bộ lọc thường nghi ngờ."
          },
          {
            "text": "Trung tâm Ánh Dương, địa chỉ 25 Đường Số 3, liên hệ: 0900 000 000."
          },
          {
            "text": "Thư này được gửi tới 100 địa chỉ, bạn không cần làm gì để tiếp tục nhận.",
            "error": "Thiếu cách huỷ đăng ký: khách muốn ngừng nhận sẽ bấm 'báo thư rác'."
          }
        ]
      },
      {
        "type": "callout",
        "label": "Nguồn đúng là hướng dẫn chính thức",
        "text": "Quy tắc thư hàng loạt khác nhau giữa các dịch vụ và đổi theo thời gian. Đừng tin vào trí nhớ của AI hay bài viết cũ: mở trang hướng dẫn của đúng dịch vụ bạn dùng, hoặc hỏi bộ phận IT của công ty."
      },
      {
        "type": "scenario",
        "title": "Sáng thứ Sáu trước khi gửi bản tin",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bản tin cho 100 khách đã viết xong. AI khen 'thư rất hấp dẫn'. Đồng nghiệp hỏi sao không gửi luôn.",
            "choices": [
              {
                "label": "Gửi luôn cả danh sách vì AI đã khen",
                "next": "bad1"
              },
              {
                "label": "Soát theo danh sách dấu hiệu rồi gửi thử",
                "next": "s2"
              }
            ]
          },
          "bad1": {
            "text": "Cuối ngày chỉ 11 người mở thư. Khi kiểm, nhiều khách kể thư nằm trong mục thư rác và uy tín người gửi của bạn cũng tụt.",
            "ending": "bad"
          },
          "s2": {
            "text": "Gửi thử cho ba hộp thư của bạn, thư vào mục thư rác ở một hộp.",
            "choices": [
              {
                "label": "Sửa tiêu đề, giảm link, thêm dòng huỷ đăng ký rồi gửi thử lại",
                "next": "good"
              },
              {
                "label": "Bỏ qua vì hai hộp còn lại vào hộp thư chính",
                "next": "bad2"
              }
            ]
          },
          "bad2": {
            "text": "Phần lớn khách dùng loại hộp thư đã lọc thư bạn vào mục rác. Lần sau gửi, tỷ lệ tới khách còn thấp hơn.",
            "ending": "bad"
          },
          "good": {
            "text": "Sau khi sửa, cả ba hộp nhận thư ở mục chính. Khi gửi cho 100 khách, đa số mở được thư và có vài người chủ động huỷ đăng ký thay vì báo thư rác.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Thư ít bị nghi là thư giống thư thật: tiêu đề rõ, ít link, có lối huỷ.",
          "Bài sau: khách đồng ý nhận tin thế nào, và cách họ ngừng."
        ]
      }
    ]
  },
  {
    "id": 2498,
    "slug": "dong-y-nhan-tin-va-cach-ngung",
    "title": "Chặng 54, Bài 19: Khách đồng ý nhận tin thế nào, và cách họ ngừng nhận",
    "subtitle": "Một danh sách khách là danh sách những người đã nói có, không phải ai bạn từng có số.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "✅",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Có số điện thoại hay email của khách không có nghĩa họ muốn nhận mọi tin của bạn. Một dòng xin đồng ý rõ ràng, một dòng huỷ dễ thấy, và một danh sách được cập nhật khi khách từ chối giúp bạn giữ được lòng tin. Quy định cụ thể mỗi nơi mỗi khác, nên chỗ nào không chắc thì hỏi bộ phận pháp chế.",
    "openingQuestion": "Bạn có 300 số điện thoại khách từng mua hàng và muốn gửi tin khuyến mãi. Bước nào nên làm trước khi gửi?",
    "openingOptions": [
      "Kiểm xem khách đã đồng ý nhận tin loại này chưa",
      "Nhờ AI viết tin khuyến mãi thật hấp dẫn để khách thích",
      "Chia 300 số làm nhiều đợt để hệ thống đỡ quá tải",
      "Mua thêm danh sách số điện thoại để có nhiều khách hơn"
    ],
    "correctOption": 0,
    "explanation": "Khách mua hàng chưa chắc đã đồng ý nhận tin khuyến mãi. Việc đầu tiên là xem trong danh sách ai đã cho phép và cho phép loại tin nào. Nội dung hấp dẫn không thay được sự đồng ý, chia đợt gửi chỉ là chuyện kỹ thuật, và mua thêm danh sách càng đưa vào những người chưa từng nói có. Nếu không chắc quy định nơi bạn hoạt động, hãy hỏi bộ phận pháp chế.",
    "diagram": [
      {
        "label": "Khách nói có: dòng xin đồng ý rõ ràng",
        "arrow": true
      },
      {
        "label": "Lưu ai đồng ý, loại tin nào, ngày nào",
        "arrow": true
      },
      {
        "label": "Gửi tin chỉ cho người đã đồng ý",
        "arrow": true
      },
      {
        "label": "Khách bấm huỷ: xoá khỏi danh sách ngay"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Một cửa hàng gom số điện thoại của mọi khách từng mua và gửi tin khuyến mãi cho tất cả. Một khách từng nhắn 'đừng gửi tin nữa' nhưng vẫn nhận tin vì danh sách không được cập nhật. Khách đăng bài than phiền. Sau đó cửa hàng thêm cột 'đã từ chối' và kiểm cột này trước mỗi lần gửi."
    },
    "quiz": [
      {
        "question": "Khách mua hàng nhưng chưa từng nói gì về tin khuyến mãi. Điều nào đúng?",
        "options": [
          "Họ chưa chắc đã đồng ý nhận tin khuyến mãi",
          "Mua hàng nghĩa là khách tự động đồng ý nhận mọi loại tin",
          "Có số điện thoại thì cứ gửi, khách không thích sẽ tự báo",
          "Đã quen biết khách thì không cần hỏi, gửi là được"
        ],
        "correct": 0,
        "explanation": "Mua hàng và đồng ý nhận tin quảng cáo là hai việc khác nhau. Khách không phải 'tự báo' nếu không ai cho họ cơ hội nói có hay không. Nếu không rõ quy định, hãy hỏi bộ phận pháp chế."
      },
      {
        "question": "Dòng xin đồng ý nào rõ nhất?",
        "options": [
          "Tôi đồng ý nhận tin khuyến mãi qua tin nhắn từ cửa hàng này",
          "Bằng việc đặt hàng, bạn đồng ý với mọi điều khoản và chính sách của chúng tôi",
          "Nhận thông tin ưu đãi và các thông báo khác từ cửa hàng chúng tôi",
          "Bấm Tiếp tục để hoàn tất đơn hàng và nhận mọi thông tin"
        ],
        "correct": 0,
        "explanation": "Dòng rõ nhất nói đúng loại tin, kênh nhận và ai gửi, và khách chủ động chọn. Ba dòng còn lại gộp sự đồng ý vào việc đặt hàng hoặc nói mơ hồ 'mọi thông tin', khiến khách không biết mình đã đồng ý gì."
      },
      {
        "question": "Khách bấm huỷ nhận tin. Bạn cần làm gì tiếp theo?",
        "options": [
          "Xoá hoặc đánh dấu họ đã từ chối và dừng gửi ngay",
          "Giữ họ trong danh sách vì có thể họ đổi ý sau",
          "Gửi thêm một tin hỏi lại vì sao họ huỷ nhận tin",
          "Chờ hết đợt khuyến mãi hiện tại rồi mới cập nhật danh sách"
        ],
        "correct": 0,
        "explanation": "Huỷ có hiệu lực ngay, không phải sau đợt khuyến mãi. Giữ họ lại, hay gửi thêm tin hỏi lý do, đều là tiếp tục liên lạc với người đã nói không. Cách đúng là đánh dấu và dừng."
      },
      {
        "question": "Bạn cần biết ai đã đồng ý. Dữ liệu tối thiểu nên lưu bên cạnh mỗi khách là gì?",
        "options": [
          "Đồng ý loại tin nào, vào ngày nào, và qua kênh nào",
          "Chỉ cần tên khách, vì đồng ý thì luôn luôn đúng mãi",
          "Màu sắc khách thích để gửi tin cá nhân hoá hơn",
          "Địa chỉ nhà của khách để tính phí vận chuyển sau"
        ],
        "correct": 0,
        "explanation": "Muốn chứng minh và tôn trọng sự đồng ý, bạn cần biết loại tin, ngày và kênh. Chỉ tên khách không chứng minh được gì, còn màu ưa thích hay địa chỉ nhà không liên quan."
      },
      {
        "question": "Bạn không chắc quy định về gửi tin quảng cáo ở nơi mình bán hàng. Nên làm gì?",
        "options": [
          "Hỏi bộ phận pháp chế hoặc một chuyên gia tư vấn",
          "Nhờ AI cho biết điều luật cụ thể rồi làm theo",
          "Làm theo điều mà các cửa hàng khác trên mạng đang làm",
          "Gửi trước, nếu có người khiếu nại thì tính sau"
        ],
        "correct": 0,
        "explanation": "Quy định đổi theo nơi và theo thời điểm, và AI có thể nhớ sai hoặc lỗi thời. Người có trách nhiệm pháp lý mới đưa ra câu trả lời để bạn dựa vào. Bắt chước người khác hay gửi trước đều đẩy rủi ro sang bạn."
      }
    ],
    "keyTakeaways": [
      "Có số điện thoại không có nghĩa là khách đã đồng ý nhận tin.",
      "Dòng xin đồng ý nói rõ loại tin, kênh và ai gửi.",
      "Khách huỷ thì dừng ngay và đánh dấu trong danh sách.",
      "Không chắc về quy định thì hỏi bộ phận pháp chế, không nhờ AI trích điều luật."
    ],
    "practicePrompt": {
      "question": "Danh sách có 200 khách. Bạn thấy 15 người từng nhắn 'đừng gửi tin nữa'. Bạn làm gì trước khi gửi khuyến mãi?",
      "options": [
        "Đánh dấu 15 người đó là đã từ chối và loại khỏi đợt gửi",
        "Vẫn gửi nhưng thêm lời xin lỗi ở đầu tin",
        "Gửi cho cả 200 người vì họ từng mua hàng",
        "Gửi cho 15 người đó tin hỏi lại một lần nữa"
      ],
      "correct": 0,
      "explanation": "15 người đó đã nói không rõ ràng nên phải bị loại khỏi đợt gửi. Xin lỗi hay hỏi lại vẫn là liên lạc với người đã từ chối, và 'từng mua hàng' không xoá được lời từ chối."
    },
    "summary": {
      "keyIdea": "Danh sách tốt là danh sách của những người đã nói có, với cách nói không luôn dễ thấy.",
      "formula": "Dòng xin đồng ý rõ + lưu ngày và loại tin + dòng huỷ dễ thấy + cập nhật ngay.",
      "commonMistake": "Coi số điện thoại của khách cũ là sự cho phép gửi quảng cáo.",
      "action": "Thêm một cột 'đã đồng ý' và một cột 'đã từ chối' vào danh sách của bạn."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Mở danh sách khách (hoặc tạo bảng 10 dòng giả). Thêm hai cột: 'đồng ý loại tin nào, ngày nào' và 'đã từ chối'. Viết một dòng xin đồng ý và một dòng huỷ đăng ký cho loại tin bạn gửi. Mai bạn sẽ được hỏi bạn đã viết hai dòng đó ra sao.",
      "secondary": "Nhờ AI đọc hai dòng và chỉ chỗ mơ hồ, nhưng không nhờ nó nêu điều luật."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Một khách nhắn: 'Tôi đã bảo đừng gửi tin nữa mà.' Bạn mở danh sách và thấy tên họ vẫn nằm đó. Bài này dạy cách viết dòng xin đồng ý, dòng huỷ, và kiểm danh sách để chuyện đó không lặp lại."
      },
      {
        "type": "feynman",
        "title": "Sự đồng ý nhận tin đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới việc xin số điện thoại để rủ bạn đi chơi. Bạn hỏi 'cho mình xin số được không?', nghe câu có, rồi mới nhắn. Nếu bạn ấy bảo 'đừng nhắn nữa', bạn dừng.",
        "columns": [
          "Thành phần",
          "Xin số để nhắn rủ",
          "Xin đồng ý nhận tin"
        ],
        "rows": [
          [
            "Hỏi",
            "Cho mình xin số được không?",
            "Dòng xin đồng ý rõ ràng"
          ],
          [
            "Nói có",
            "Bạn đưa số",
            "Khách chủ động chọn đồng ý"
          ],
          [
            "Nói không",
            "Đừng nhắn nữa",
            "Khách bấm huỷ đăng ký"
          ],
          [
            "Bạn làm gì",
            "Dừng nhắn ngay",
            "Đánh dấu và dừng gửi ngay"
          ]
        ],
        "oneLiner": "Xin đồng ý là hỏi trước khi nhắn, và nghe lời khi họ bảo dừng."
      },
      {
        "type": "heading",
        "text": "Vấn đề: danh sách lớn dần mà không ai hỏi"
      },
      {
        "type": "paragraph",
        "text": "Danh sách khách thường lớn lên theo cách dễ nhất: ai mua là thêm vào. Đến khi gửi, bạn không biết ai thật sự muốn nhận, ai từng bảo dừng."
      },
      {
        "type": "flow",
        "title": "Vòng đời một địa chỉ trong danh sách",
        "steps": [
          {
            "label": "Xin đồng ý",
            "detail": "Dòng xin nói rõ loại tin, kênh nhận và ai gửi; khách chủ động chọn."
          },
          {
            "label": "Ghi lại",
            "detail": "Lưu loại tin, ngày đồng ý và kênh, để sau này tra."
          },
          {
            "label": "Gửi có kiểm tra",
            "detail": "Trước mỗi lần gửi, loại những người đã từ chối."
          },
          {
            "label": "Huỷ dễ dàng",
            "detail": "Mỗi tin có cách huỷ rõ ràng; khi khách bấm, đánh dấu và dừng ngay."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Dòng xin đồng ý rõ",
          "text": "Tôi đồng ý nhận tin khuyến mãi qua tin nhắn từ cửa hàng X. Tôi có thể huỷ bất kỳ lúc nào."
        },
        "right": {
          "label": "Dòng xin mập mờ",
          "text": "Bằng việc mua hàng, bạn đồng ý nhận thông tin từ chúng tôi và các đối tác của chúng tôi."
        }
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Viết dòng xin đồng ý nói rõ loại tin, kênh và ai gửi.",
          "Bước 2 - Viết dòng huỷ: ngắn, nằm trong mọi tin.",
          "Bước 3 - Thêm cột 'đã từ chối' vào danh sách và kiểm trước mỗi lần gửi.",
          "Bước 4 - Không chắc về quy định thì hỏi bộ phận pháp chế."
        ]
      },
      {
        "type": "callout",
        "label": "Không nhờ AI trích điều luật",
        "text": "Quy định về tin nhắn quảng cáo khác nhau theo nơi và theo thời gian. AI có thể nhớ sai hoặc lỗi thời và vẫn viết rất tự tin. Hỏi bộ phận pháp chế hoặc chuyên gia, và ghi lại câu trả lời của họ."
      },
      {
        "type": "scenario",
        "title": "Danh sách 300 khách và một lời từ chối",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn chuẩn bị gửi khuyến mãi cho 300 khách. Khi lọc, bạn thấy 18 người từng nhắn đừng gửi nữa, và 40 người chưa từng đồng ý gì cả.",
            "choices": [
              {
                "label": "Gửi cho cả 300 vì họ đều từng mua hàng",
                "next": "bad1"
              },
              {
                "label": "Loại 18 người đã từ chối, rồi tính tiếp phần còn lại",
                "next": "s2"
              }
            ]
          },
          "bad1": {
            "text": "Mười người trong 18 người phản hồi giận dữ, một người đăng bài than phiền. Bạn mất lòng tin của những khách từng ủng hộ.",
            "ending": "bad"
          },
          "s2": {
            "text": "Còn 40 người chưa từng đồng ý. Đồng nghiệp đề nghị cứ gửi, vì họ từng mua.",
            "choices": [
              {
                "label": "Gửi họ một tin xin đồng ý trước, chỉ gửi khuyến mãi khi họ nói có",
                "next": "good"
              },
              {
                "label": "Gửi khuyến mãi luôn, ai không thích sẽ tự huỷ",
                "next": "bad2"
              }
            ]
          },
          "bad2": {
            "text": "Một số khách coi đó là tin rác và báo cáo. Bạn không có bằng chứng họ từng đồng ý, và khi bị hỏi bạn không trả lời được.",
            "ending": "bad"
          },
          "good": {
            "text": "Một nửa số 40 người nói có. Danh sách của bạn nhỏ hơn nhưng sạch, và bạn có ngày, loại tin khi ai hỏi tới.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Hỏi trước, ghi lại, dừng khi được bảo dừng.",
          "Bài sau: tổng kết toàn bộ hệ thống hộp thư, lịch và tin nhắn trong một trang."
        ]
      }
    ]
  },
  {
    "id": 2499,
    "slug": "tong-ket-he-thong-nhan-tin-mot-trang",
    "title": "Chặng 54, Bài 20: Tổng kết: một trang mô tả hộp thư, lịch và tin nhắn của bạn chạy thế nào",
    "subtitle": "Nếu chưa viết ra được trong một trang thì bạn chưa thật sự hiểu hệ thống của mình.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "🗺️",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Sau 19 bài, bạn có nhiều mảnh: quy tắc hộp thư, mẫu trả lời, nhắc lịch, tin xác nhận, giờ yên tĩnh. Nếu không gom lại, đó chỉ là các mảnh rời mà người khác không hiểu được, và chính bạn cũng quên sau một tháng. Một trang sơ đồ cho biết cái gì tự chạy, cái gì cần người duyệt, và đo được bằng số giờ tiết kiệm.",
    "openingQuestion": "Bạn đã có quy tắc hộp thư, mẫu trả lời, nhắc lịch và tin xác nhận. Điều gì nên có trong trang mô tả để người khác tiếp quản được?",
    "openingOptions": [
      "Thư nào tự xử lý, thư nào người duyệt, nhắc lịch nào và giờ yên tĩnh",
      "Tên từng công cụ, số phiên bản và đường đi qua các menu trên máy của chúng",
      "Danh sách các khách hàng quan trọng cùng số điện thoại của họ",
      "Mô tả thật dài về lý do bạn thích từng tính năng của AI"
    ],
    "correctOption": 0,
    "explanation": "Trang mô tả phải trả lời được: việc nào máy làm một mình, việc nào cần người duyệt trước khi gửi, nhắc nhở nào chạy và khi nào, và khung giờ yên tĩnh. Tên công cụ, phiên bản hay đường đi menu đổi liên tục nên nhanh lỗi thời. Số điện thoại khách là dữ liệu cá nhân không nên nằm trong tài liệu chia sẻ, còn lý do thích tính năng không giúp ai vận hành.",
    "diagram": [
      {
        "label": "Thư đến, tin cần gửi, lịch cần nhắc",
        "arrow": true
      },
      {
        "label": "Phân loại: tự xử lý hay người duyệt",
        "arrow": true
      },
      {
        "label": "Chạy theo khung giờ yên tĩnh",
        "arrow": true
      },
      {
        "label": "Đo giờ tiết kiệm mỗi tuần"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Một chủ cửa hàng nhỏ có quy tắc hộp thư, mẫu trả lời và nhắc lịch rải rác trong nhiều ghi chú. Khi nhân viên mới tới, cô không chỉ được cho họ thứ gì tự chạy. Cô viết một trang: bốn loại thư tự xử lý, hai loại cần người duyệt, hai nhắc lịch và khung giờ yên tĩnh. Nhân viên mới tiếp quản trong một buổi."
    },
    "quiz": [
      {
        "question": "Vì sao nên gom toàn bộ hệ thống vào một trang?",
        "options": [
          "Người khác đọc một lần là hiểu và tiếp quản được",
          "Một trang ngắn hơn nên AI có thể tự viết luôn hộ bạn",
          "Một trang luôn đủ để thay thế mọi tài liệu khác",
          "Nhiều trang sẽ làm hệ thống chạy chậm hơn"
        ],
        "correct": 0,
        "explanation": "Mục đích của trang là cho người khác, và cho bạn sau một tháng, hiểu nhanh. Việc ngắn hơn không có nghĩa AI tự viết được, một trang không thay mọi tài liệu, và số trang không ảnh hưởng tốc độ chạy."
      },
      {
        "question": "Loại thư nào nên ghi là 'người duyệt trước khi gửi'?",
        "options": [
          "Thư có số tiền, cam kết hoặc phản hồi khiếu nại của khách",
          "Thư mời họp nội bộ chỉ gồm giờ và địa điểm phòng họp",
          "Thư cảm ơn chung chung sau mỗi đơn hàng thông thường",
          "Thư nhắc lịch họp đã có mẫu cố định trong hệ thống"
        ],
        "correct": 0,
        "explanation": "Thư có số tiền hay cam kết mà sai thì khách giữ làm bằng chứng, nên cần người duyệt. Thư mời họp, cảm ơn chung hoặc nhắc lịch mẫu cố định có rủi ro thấp nên có thể tự xử lý."
      },
      {
        "question": "Cách nào đo số giờ tiết kiệm mỗi tuần hợp lý nhất?",
        "options": [
          "Số thư tự xử lý nhân phút tiết kiệm mỗi thư, chia cho 60",
          "Số giờ bạn cảm thấy rảnh hơn mỗi tuần, ước đại khái",
          "Số giờ máy chạy nhân với số công cụ đang dùng",
          "Số thư nhận được trong tuần chia cho số người trong nhóm"
        ],
        "correct": 0,
        "explanation": "Số thư tự xử lý nhân phút mỗi thư rồi đổi ra giờ cho con số kiểm được, và bạn thử điều chỉnh từng thông số. Cảm giác rảnh, giờ máy chạy và thư chia đầu người đều không đo thời gian bạn thực sự tiết kiệm."
      },
      {
        "question": "Bạn tính tiết kiệm 3 phút mỗi thư cho 40 thư mỗi tuần. Kết quả là bao nhiêu giờ?",
        "options": [
          "2 giờ mỗi tuần (= 3 × 40 ÷ 60)",
          "120 giờ mỗi tuần (= 3 × 40, quên chia cho 60 phút)",
          "13,3 giờ mỗi tuần (= 40 ÷ 3, chia ngược phép tính)",
          "0,5 giờ mỗi tuần (= 40 ÷ 60 × 3 ÷ 4, chia nhầm cho 4)"
        ],
        "correct": 0,
        "explanation": "3 phút × 40 thư = 120 phút, chia 60 ra 2 giờ. 120 giờ là quên đổi phút ra giờ, 13,3 là chia ngược, và 0,5 giờ là chia thừa cho một số không có trong đề."
      },
      {
        "question": "Bạn ghi vào trang mô tả tên công cụ kèm đường đi menu. Vấn đề là gì?",
        "options": [
          "Giao diện đổi nên trang nhanh lỗi thời và gây nhầm",
          "Tên công cụ là thông tin mật không được ghi lại",
          "Đường đi menu khiến trang dài hơn một trang giấy",
          "AI không đọc được tên công cụ trong tài liệu"
        ],
        "correct": 0,
        "explanation": "Giao diện và tên menu đổi thường xuyên, nên trang sẽ sai sau vài tháng. Điều bền hơn là việc gì xảy ra, ai duyệt, và khi nào. Tên công cụ không phải thông tin mật và độ dài không phải vấn đề chính."
      }
    ],
    "keyTakeaways": [
      "Một trang: thư nào tự xử lý, thư nào người duyệt, nhắc lịch, giờ yên tĩnh.",
      "Thư có số tiền hoặc cam kết luôn có người duyệt.",
      "Đo bằng số thư tự xử lý × phút tiết kiệm ÷ 60.",
      "Viết việc và quy tắc, không viết đường đi menu của công cụ."
    ],
    "practicePrompt": {
      "question": "Trang của bạn ghi: 'Thư báo giá: AI soạn, chị Lan duyệt'. Đó thuộc nhóm nào?",
      "options": [
        "Người duyệt trước khi gửi, vì có số tiền",
        "Tự xử lý, vì AI đã soạn sẵn nội dung nên không cần ai đọc lại",
        "Bỏ qua, vì báo giá hiếm khi gửi sai",
        "Tự xử lý nếu khách đã quen với cửa hàng"
      ],
      "correct": 0,
      "explanation": "Báo giá có con số và cam kết về giá, nên sai là khách giữ làm bằng chứng. Vì vậy cần người duyệt, dù AI đã soạn đúng hình thức. Khách quen hay báo giá hiếm gửi không xoá được rủi ro."
    },
    "summary": {
      "keyIdea": "Một trang sơ đồ biến các mảnh rời thành hệ thống người khác hiểu được.",
      "formula": "Thư tự xử lý + thư người duyệt + nhắc lịch + giờ yên tĩnh = một trang.",
      "commonMistake": "Ghi tên công cụ và đường đi menu thay vì quy tắc và người chịu trách nhiệm.",
      "action": "Viết trang đầu tiên và tính số giờ tiết kiệm mỗi tuần."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Viết một trang cho hệ thống của bạn: liệt kê 3 loại thư tự xử lý, 2 loại người duyệt, 2 nhắc lịch và khung giờ yên tĩnh. Tính số giờ tiết kiệm mỗi tuần bằng số thư tự xử lý × phút tiết kiệm ÷ 60. Mai bạn sẽ được hỏi con số đó.",
      "secondary": "Đưa trang cho một đồng nghiệp đọc và hỏi họ chỗ nào chưa rõ."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bạn đã dọn hộp thư, viết mẫu trả lời, đặt nhắc lịch, soạn tin xác nhận và đặt giờ yên tĩnh. Bài cuối gom tất cả vào một trang: hệ thống của bạn chạy thế nào, ai duyệt, và tiết kiệm được bao nhiêu giờ."
      },
      {
        "type": "feynman",
        "title": "Một trang tổng kết đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới bản đồ sơ tán trong toà nhà: một tờ giấy cho biết lối nào đi đâu, ai chịu trách nhiệm tầng nào, để người mới tới cũng theo được.",
        "columns": [
          "Thành phần",
          "Bản đồ sơ tán",
          "Trang tổng kết hệ thống"
        ],
        "rows": [
          [
            "Lối đi",
            "Mũi tên chỉ các cửa thoát",
            "Thư tự xử lý đi theo quy tắc nào"
          ],
          [
            "Người chịu trách nhiệm",
            "Trưởng tầng",
            "Người duyệt cho từng loại thư"
          ],
          [
            "Quy định đặc biệt",
            "Thang máy không dùng khi cháy",
            "Giờ yên tĩnh và ngoại lệ"
          ],
          [
            "Dùng khi nào",
            "Khi có sự cố, ai cũng đọc được",
            "Khi tiếp quản hoặc kiểm tra định kỳ"
          ]
        ],
        "oneLiner": "Trang tổng kết là bản đồ sơ tán của hệ thống: ai cũng theo được."
      },
      {
        "type": "heading",
        "text": "Vấn đề: các mảnh rời sau một tháng"
      },
      {
        "type": "paragraph",
        "text": "Quy tắc nằm trong hộp thư, mẫu nằm trong ghi chú, nhắc lịch nằm trong lịch. Không ai thấy toàn bộ, kể cả bạn. Một trang gom lại biến chúng thành một thứ đọc được."
      },
      {
        "type": "chart",
        "title": "Giờ tiết kiệm mỗi tuần theo số thư tự xử lý",
        "caption": "Số liệu minh hoạ: kéo thanh trượt để thay phút tiết kiệm mỗi thư. Số giờ là phần còn lại sau khi bạn đã dành thời gian duyệt các thư cần người duyệt.",
        "kind": "line",
        "xLabel": "Số thư tự xử lý mỗi tuần",
        "yLabel": "Giờ tiết kiệm mỗi tuần",
        "x": {
          "from": 0,
          "to": 100,
          "step": 10
        },
        "params": [
          {
            "id": "mins",
            "label": "Phút tiết kiệm mỗi thư",
            "min": 0,
            "max": 10,
            "step": 0.5,
            "value": 3,
            "unit": "phút"
          }
        ],
        "series": [
          {
            "label": "Giờ tiết kiệm mỗi tuần",
            "expr": "x * mins / 60"
          }
        ]
      },
      {
        "type": "flow",
        "title": "Từ một thư tới chỗ của nó trong trang",
        "steps": [
          {
            "label": "Thư đến",
            "detail": "Một thư hoặc một việc cần nhắc xuất hiện."
          },
          {
            "label": "Xếp nhóm",
            "detail": "Theo quy tắc trong trang: tự xử lý, người duyệt hay chỉ để biết."
          },
          {
            "label": "Chạy đúng cách",
            "detail": "Thư tự xử lý đi theo mẫu; thư người duyệt chờ đúng người."
          },
          {
            "label": "Đi trong khung giờ",
            "detail": "Tin gửi khách chỉ đi trong giờ yên tĩnh đã đặt."
          },
          {
            "label": "Đo",
            "detail": "Cuối tuần đếm số thư tự xử lý và tính giờ tiết kiệm."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Trang dùng được",
          "text": "Báo giá: AI soạn, chị Lan duyệt. Xác nhận đơn: tự gửi trong 8-21 giờ. Nhắc lịch: một tuần và một ngày trước."
        },
        "right": {
          "label": "Trang khó dùng",
          "text": "Dùng công cụ X, vào menu Y, chọn mục Z, bật tính năng W phiên bản 3 theo hướng dẫn hiện tại."
        }
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Liệt kê các loại thư và tin bạn xử lý mỗi tuần.",
          "Bước 2 - Với mỗi loại, ghi: tự xử lý hay người duyệt, và ai duyệt.",
          "Bước 3 - Ghi nhắc lịch và khung giờ yên tĩnh.",
          "Bước 4 - Tính giờ tiết kiệm: số thư tự xử lý × phút ÷ 60."
        ]
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI sắp xếp trang tổng kết",
        "task": "Bạn có ghi chú rời về hộp thư, mẫu, nhắc lịch và giờ yên tĩnh. Lắp prompt để AI gom thành một trang nháp.",
        "parts": [
          {
            "id": "input",
            "label": "Dữ liệu đưa vào",
            "options": [
              {
                "text": "Viết giúp trang mô tả hệ thống của tôi.",
                "feedback": "Không có dữ liệu nên AI tự bịa hệ thống nghe hợp lý chứ không phải của bạn."
              },
              {
                "text": "Đây là ghi chú của tôi: [dán quy tắc hộp thư, mẫu, nhắc lịch, khung giờ]. Chỉ dùng những gì có trong ghi chú.",
                "good": true,
                "feedback": "Dữ liệu thật của bạn là nguyên liệu; AI chỉ sắp xếp, không thêm."
              }
            ]
          },
          {
            "id": "shape",
            "label": "Hình dạng trang",
            "options": [
              {
                "text": "Chia bốn mục: tự xử lý, người duyệt (ghi ai), nhắc lịch, giờ yên tĩnh.",
                "good": true,
                "feedback": "Bốn mục khớp với thứ người tiếp quản cần biết, dễ đối chiếu."
              },
              {
                "text": "Viết thành một bài tản văn cho dễ đọc.",
                "feedback": "Tản văn khó tra nhanh và dễ lẫn giữa việc máy làm với việc người làm."
              }
            ]
          },
          {
            "id": "gap",
            "label": "Chỗ chưa rõ",
            "options": [
              {
                "text": "Nếu ghi chú thiếu thông tin thì để trống và hỏi tôi.",
                "good": true,
                "feedback": "Chỗ trống lộ ra điều bạn chưa quyết, thay vì bị lấp bằng thứ AI đoán."
              },
              {
                "text": "Nếu thiếu thì tự điền cho đủ bốn mục.",
                "feedback": "AI sẽ điền quy tắc nghe hợp lý mà bạn chưa từng chọn."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "input",
              "shape",
              "gap"
            ],
            "text": "1. Tự xử lý: thư xác nhận đơn (mẫu 3 chỗ trống), thư mời họp nội bộ.\n2. Người duyệt: thư báo giá (chị Lan duyệt), thư xử lý khiếu nại.\n3. Nhắc lịch: một tuần và một ngày trước họp.\n4. Giờ yên tĩnh: 8-21 giờ; mã xác thực là ngoại lệ.\n[Chưa có thông tin về thư hoàn tiền - bạn điền giúp.]"
          },
          {
            "requires": [
              "input"
            ],
            "text": "Hệ thống hộp thư của bạn hoạt động hiệu quả nhờ sự kết hợp của các quy tắc, mẫu trả lời và nhắc lịch, giúp tiết kiệm thời gian mỗi tuần...\n\n(Đúng nội dung nhưng viết tản văn nên khó tra cứu.)"
          },
          {
            "text": "1. Tự xử lý: thư từ 50 khách hàng VIP.\n2. Người duyệt: giám đốc kinh doanh duyệt mọi thư.\n3. Nhắc lịch: mỗi sáng 6 giờ.\n\n(AI không có ghi chú nên tự bịa khách VIP, người duyệt và giờ nhắc.)"
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Người mới tiếp quản hệ thống",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Một đồng nghiệp sẽ thay bạn tuần tới. Bạn có các ghi chú rời nhưng chưa có trang tổng kết.",
            "choices": [
              {
                "label": "Bảo họ tự mò trong hộp thư và lịch cho nhanh",
                "next": "bad1"
              },
              {
                "label": "Viết trang một trang và đưa họ đọc",
                "next": "s2"
              }
            ]
          },
          "bad1": {
            "text": "Đồng nghiệp gửi nhầm một thư báo giá không qua người duyệt vì không biết quy tắc. Khách hỏi lại giá và bạn phải sửa.",
            "ending": "bad"
          },
          "s2": {
            "text": "Khi viết trang, bạn định ghi thêm đường đi menu cho từng công cụ.",
            "choices": [
              {
                "label": "Ghi quy tắc và người duyệt, bỏ đường đi menu",
                "next": "good"
              },
              {
                "label": "Ghi chi tiết từng menu, chụp màn hình cho đủ",
                "next": "bad2"
              }
            ]
          },
          "bad2": {
            "text": "Tháng sau công cụ đổi giao diện. Trang chứa đường đi sai, và đồng nghiệp mất thời gian làm theo hướng dẫn không còn đúng.",
            "ending": "bad"
          },
          "good": {
            "text": "Đồng nghiệp đọc trang trong 10 phút, biết thư nào tự chạy, thư nào gửi cho chị Lan duyệt. Bạn tính được hệ thống tiết kiệm khoảng hai giờ mỗi tuần.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Một trang, bốn mục, một con số đo được.",
          "Hết Chặng 54: hộp thư, lịch và tin nhắn của bạn giờ có người làm chủ."
        ]
      }
    ]
  }
];
