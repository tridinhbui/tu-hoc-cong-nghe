import type { Lesson } from "../lesson-types";

// Chặng 42, bài 11-15. Giáo trình: scripts/curriculum/stage-42.json.
// Không nêu khả năng riêng của công cụ nào: chỉ khái niệm bền (đọc tệp, nguồn, chỗ dùng chung, cách hỏi).
export const S42_C_LESSONS: Lesson[] = [
  {
    "track": "personal",
    "isFundamental": false,
    "correctOption": 0,
    "id": 2250,
    "slug": "dinh-kem-tep-nen-cho-cong-cu-doc-gi",
    "title": "Chặng 42, Bài 11: Đính kèm tệp - công cụ đọc được gì và bỏ sót gì",
    "subtitle": "Cùng một công cụ, nhưng bảng tính đọc chắc còn bản scan mờ thì dễ đọc sai.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "📎",
    "whyItMatters": "Bạn đính kèm tệp vì muốn công cụ nhìn đúng tài liệu của mình thay vì đoán. Nhưng mỗi loại tệp được đọc theo một cách khác nhau, và chỗ đọc sai không báo lỗi: nó vẫn trả lời trôi chảy. Biết loại nào đọc chắc, loại nào dễ sai giúp bạn biết chỗ nào phải kiểm lại.",
    "openingQuestion": "Bạn gửi cho công cụ AI hai tệp: một bảng tính doanh thu và một tờ hoá đơn chụp bằng điện thoại hơi nghiêng. Kết quả nào của nó cần bạn soát kỹ hơn?",
    "openingOptions": [
      "Các con số đọc từ tờ hoá đơn chụp nghiêng, vì công cụ phải đoán từng chữ trên ảnh",
      "Các con số lấy từ bảng tính, vì bảng tính luôn chứa nhiều ô hơn ảnh chụp",
      "Cả hai đều chắc như nhau, vì công cụ đọc mọi loại tệp theo cùng một cách",
      "Tên tệp mà bạn đã đặt, vì công cụ thường ghi sai tên tệp khi trả lời"
    ],
    "explanation": "Bảng tính có sẵn chữ và số trong từng ô, nên công cụ đọc lại chính những gì đã được lưu. Ảnh chụp thì chỉ là các điểm ảnh: công cụ phải nhận dạng từng ký tự, và chữ mờ, nghiêng, số 1 với số 7 hay dấu phẩy dễ bị đọc nhầm. Vì vậy phần đọc từ ảnh cần bạn đối chiếu với tờ giấy thật. Nhiều ô hơn không làm bảng tính kém chắc, và tên tệp không phải chỗ hay sai.",
    "diagram": [
      {
        "label": "Bạn đính kèm tệp",
        "arrow": true
      },
      {
        "label": "Công cụ trích chữ và số ra",
        "arrow": true
      },
      {
        "label": "Loại tệp quyết định độ chắc",
        "arrow": true
      },
      {
        "label": "Bạn đối chiếu chỗ đọc từ ảnh",
        "arrow": true
      },
      {
        "label": "Dùng kết quả đã kiểm"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Một bạn kế toán gửi công cụ AI một bảng chi phí và một xấp hoá đơn chụp bằng điện thoại, nhờ nhập vào bảng tổng. Bảng chi phí được chép đúng hết. Ở phần hoá đơn, một số tiền 1.780.000 bị đọc thành 1.700.000 vì nét số 8 bị mờ. Bạn ấy chỉ phát hiện ra khi đối chiếu tổng với sổ. Số liệu ở đây là minh hoạ, không phải của công ty nào."
    },
    "quiz": [
      {
        "question": "Bạn đính kèm một bảng tính có công thức và nhờ công cụ tóm tắt. Điều gì đúng nhất?",
        "options": [
          "Công cụ thường đọc chắc chữ và số trong ô, nhưng bạn vẫn cần kiểm phép tính nó tự làm thêm",
          "Công cụ đọc ô rất chắc nên mọi phép cộng trừ nó tự tính thêm đều chính xác tuyệt đối, khỏi cần kiểm",
          "Công cụ không đọc được bảng tính nên chỉ bắt đầu hiểu khi bạn copy từng dòng sang khung chat",
          "Công cụ chỉ đọc được chữ trong bảng tính và luôn bỏ qua mọi ô chứa con số"
        ],
        "correct": 0,
        "explanation": "Đọc lại nội dung ô là phần công cụ làm chắc, vì chữ và số đã nằm sẵn trong tệp. Nhưng nếu nó tự cộng hay tính phần trăm, đó là phép tính sinh ra từ dự đoán chữ chứ không phải phép tính của bảng tính, nên vẫn phải kiểm. Nói rằng nó không đọc được bảng tính hay bỏ qua số là sai; còn tin mọi phép tính nó làm thêm cũng sai."
      },
      {
        "question": "Một bản scan hợp đồng bị mờ ở góc. Cách dùng nào an toàn nhất?",
        "options": [
          "Đối chiếu ngày, số tiền và tên trong kết quả với bản gốc",
          "Tin kết quả, vì công cụ đã đọc kỹ cả ảnh mờ",
          "Chụp lại scan nhỏ hơn cho công cụ đỡ mỏi mắt",
          "Nhờ công cụ đoán phần bị mờ cho đủ hết các dòng"
        ],
        "correct": 0,
        "explanation": "Ảnh mờ khiến công cụ phải đoán ký tự, và chỗ đoán sai không có dấu hiệu gì để bạn nhận ra. Vì vậy các chi tiết quan trọng như ngày, số tiền, tên phải đối chiếu với bản gốc. Chụp nhỏ hơn làm ảnh kém rõ thêm, còn nhờ nó đoán phần mờ thì tạo ra chi tiết bịa."
      },
      {
        "question": "Vì sao công cụ có thể trả lời đúng về trang đầu một tài liệu 80 trang nhưng sai về trang 70?",
        "options": [
          "Tài liệu dài có thể không được đưa vào hết, nên nó chỉ dựa trên phần đã đọc được",
          "Vì các trang cuối của mọi tài liệu luôn bị người soạn viết sai chính tả nhiều hơn",
          "Vì công cụ chỉ đọc được trang lẻ và bỏ trang chẵn trong những tài liệu dài",
          "Vì trang 70 chứa toàn số nên công cụ không bao giờ đọc được những trang này"
        ],
        "correct": 0,
        "explanation": "Mỗi công cụ chỉ xử lý được một lượng nội dung nhất định cùng lúc, và với tài liệu dài, phần không vừa có thể bị cắt hoặc chỉ được xem lướt. Cách kiểm là hỏi về một chi tiết chỉ có ở trang cuối rồi tự mở trang đó ra xem. Các giải thích về trang lẻ hay chính tả không có cơ sở."
      },
      {
        "question": "Bạn cần công cụ so hai bảng giá dạng ảnh chụp. Bước nào nên làm trước?",
        "options": [
          "Yêu cầu nó chép lại từng bảng thành chữ để bạn soát trước khi so sánh",
          "Yêu cầu so ngay hai ảnh và tin phần kết luận nó viết ở cuối bài trả lời",
          "Xoá bớt các dòng khó đọc trên ảnh để công cụ khỏi phải chọn",
          "Ghép hai ảnh thành một tệp rồi hỏi một câu duy nhất"
        ],
        "correct": 0,
        "explanation": "Bắt nó chép ra chữ trước tách việc đọc khỏi việc so sánh: bạn soát được bước đọc rồi mới tin bước so. So thẳng hai ảnh khiến lỗi đọc trộn vào kết luận và khó lần ra. Xoá dòng khó đọc làm mất dữ liệu, còn ghép ảnh không giúp đọc chắc hơn."
      },
      {
        "question": "Điều nào là dấu hiệu công cụ có thể đã đọc sai một tệp bạn đính kèm?",
        "options": [
          "Nó nêu chi tiết cụ thể mà bạn không tìm thấy ở đâu trong tệp",
          "Nó trả lời bằng một câu ngắn hơn bạn nghĩ",
          "Nó nhắc lại đúng tên các cột trong bảng của bạn",
          "Nó hỏi ngược lại bạn một câu để làm rõ yêu cầu"
        ],
        "correct": 0,
        "explanation": "Chi tiết bạn không tìm thấy trong tệp là dấu hiệu rõ nhất của phần được tự thêm. Câu ngắn, nhắc đúng tên cột hay hỏi lại làm rõ đều là hành vi bình thường, thậm chí là dấu hiệu tốt. Cách thử nhanh: bảo nó chỉ ra dòng hay trang chứa chi tiết đó."
      }
    ],
    "keyTakeaways": [
      "Bảng tính và tệp chữ: công cụ đọc chắc vì chữ, số nằm sẵn trong tệp.",
      "Ảnh chụp và bản scan: công cụ phải nhận dạng ký tự, nên dễ sai ở số và chữ mờ.",
      "Tài liệu quá dài có thể chỉ được đọc một phần.",
      "Bảo nó chép ra chữ trước, soát, rồi mới nhờ so sánh hay tóm tắt.",
      "Chi tiết nào bạn không tìm thấy trong tệp thì coi là bịa cho tới khi chứng minh được."
    ],
    "practicePrompt": {
      "question": "Bạn gửi một bản scan bảng lương mờ và nhờ tính tổng. Kết quả là 48.300.000 nhưng sổ ghi 47.300.000. Bước hợp lý tiếp theo là gì?",
      "options": [
        "Bảo công cụ liệt kê từng dòng nó đã đọc, rồi so từng dòng với bản gốc",
        "Tin con số của công cụ và sửa lại sổ cho khớp",
        "Gửi lại đúng tệp đó nhiều lần cho tới khi ra số giống sổ",
        "Bỏ luôn việc kiểm tra vì chênh lệch chỉ một triệu đồng"
      ],
      "correct": 0,
      "explanation": "Liệt kê từng dòng cho thấy công cụ đọc dòng nào ra số nào, nên bạn tìm ra dòng đọc nhầm. Sửa sổ theo công cụ là đảo ngược thứ tự tin cậy. Gửi lại nhiều lần chỉ tới khi ra số mong muốn là chọn kết quả theo ý mình, còn chênh một triệu ở bảng lương vẫn là chênh thật."
    },
    "summary": {
      "keyIdea": "Loại tệp quyết định độ chắc của việc đọc: chữ sẵn trong tệp thì chắc, ảnh và scan thì phải soát.",
      "formula": "Chép ra chữ trước → soát với bản gốc → rồi mới nhờ tóm tắt hoặc so sánh.",
      "commonMistake": "Tin một con số đọc từ ảnh chỉ vì câu trả lời quanh nó nghe rất trôi chảy.",
      "action": "Thử một tệp chữ và một ảnh chụp cùng nội dung, xem chỗ nào công cụ khác nhau."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn một hoá đơn hoặc tờ giấy có ít nhất 5 con số, chụp bằng điện thoại. Bảo công cụ AI chép ra từng con số thành danh sách, rồi đối chiếu với tờ giấy thật và đếm xem có bao nhiêu con số bị sai. Ghi lại con số đó ngay hôm nay.",
      "secondary": "Hôm sau, chụp lại tờ giấy hơi nghiêng hoặc thiếu sáng và so xem số lỗi có tăng không."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Sáng thứ Hai bạn có một bảng tính và một xấp hoá đơn chụp. Đính kèm vào công cụ AI thì nhanh, nhưng công cụ có đọc đúng cả hai như nhau không? Bài này chỉ ra loại tệp nào đọc chắc, loại nào phải soát."
      },
      {
        "type": "feynman",
        "title": "Đính kèm tệp đơn giản hơn bạn nghĩ",
        "intro": "Hình dung bạn nhờ một người trợ lý ngồi đọc giúp. Đưa họ một cuốn sổ chép tay rõ ràng thì họ đọc gần như không sai. Đưa họ tờ giấy nhàu, mờ, thì họ vẫn đọc, nhưng đôi chỗ phải đoán.",
        "columns": [
          "Thành phần",
          "Người trợ lý đọc giấy",
          "Công cụ AI đọc tệp"
        ],
        "rows": [
          [
            "Tài liệu rõ ràng",
            "Đọc gần như chắc chắn",
            "Bảng tính, tệp chữ: đọc chắc"
          ],
          [
            "Tài liệu mờ, nghiêng",
            "Phải đoán vài chữ",
            "Ảnh, bản scan: dễ đọc nhầm ký tự"
          ],
          [
            "Tài liệu rất dài",
            "Đọc kỹ đầu, lướt cuối",
            "Có thể chỉ xử lý được một phần"
          ],
          [
            "Cách kiểm",
            "Hỏi lại đoạn khó, so với giấy thật",
            "Bảo chép ra chữ, đối chiếu bản gốc"
          ]
        ],
        "oneLiner": "Tệp càng rõ thì công cụ đọc càng chắc; chỗ nào đọc từ ảnh mờ thì bạn là người kiểm cuối."
      },
      {
        "type": "heading",
        "text": "Vấn đề: câu trả lời trôi chảy che chỗ đọc sai"
      },
      {
        "type": "paragraph",
        "text": "Khi một người đọc sai họ thường ngập ngừng. Công cụ AI thì không: chữ đọc nhầm và chữ đọc đúng được viết ra cùng một giọng. Vì vậy bạn cần biết trước loại tệp nào có nguy cơ, thay vì chờ công cụ báo lỗi, vì nó sẽ không báo."
      },
      {
        "type": "list",
        "items": [
          "Tệp chữ, bảng tính: nội dung ô đã có sẵn, công cụ đọc chắc; phép tính thêm của nó vẫn cần kiểm.",
          "Ảnh chụp, bản scan: công cụ nhận dạng ký tự, dễ nhầm số và chữ khi mờ hoặc nghiêng.",
          "Tài liệu rất dài: có thể chỉ một phần được xem kỹ; hỏi thử chi tiết ở trang cuối để biết."
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Đọc chắc",
          "text": "Tệp có chữ và số nằm sẵn: bảng tính, tài liệu soạn thảo, tệp văn bản. Công cụ lấy lại đúng nội dung; bạn chỉ soát các phép tính nó làm thêm."
        },
        "right": {
          "label": "Dễ đọc sai",
          "text": "Ảnh điện thoại, bản scan mờ, chữ viết tay, bảng có ô gộp phức tạp. Công cụ phải đoán ký tự; số 1 và 7, 3 và 8, dấu phẩy và dấu chấm hay bị nhầm."
        }
      },
      {
        "type": "flow",
        "title": "Từ tệp đính kèm tới câu trả lời",
        "steps": [
          {
            "label": "Bạn đính kèm tệp",
            "detail": "Tệp được gửi cùng câu hỏi của bạn tới công cụ để nó dùng làm tài liệu tham khảo."
          },
          {
            "label": "Trích nội dung",
            "detail": "Với tệp chữ, công cụ lấy lại chữ có sẵn. Với ảnh, nó phải nhận dạng ký tự trên các điểm ảnh, nên có thể nhầm."
          },
          {
            "label": "Cắt bớt nếu quá dài",
            "detail": "Công cụ chỉ xử lý được một lượng nhất định cùng lúc. Tài liệu rất dài có thể bị xem lướt hoặc cắt bớt."
          },
          {
            "label": "Viết câu trả lời",
            "detail": "Công cụ viết trôi chảy dựa trên những gì đã đọc được, kể cả chỗ đọc nhầm hoặc chỗ thiếu."
          },
          {
            "label": "Bạn đối chiếu",
            "detail": "Bạn soát chi tiết quan trọng với tệp gốc trước khi dùng: ngày, tiền, tên."
          }
        ]
      },
      {
        "type": "callout",
        "label": "Cách kiểm nhanh",
        "text": "Bảo công cụ chép ra chữ toàn bộ những gì nó đọc được, rồi so với tệp gốc trước khi nhờ tóm tắt. Nếu nó nêu một chi tiết mà bạn không tìm thấy trong tệp, hỏi 'chi tiết này ở dòng hay trang nào?'."
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Soát kết quả đọc một hoá đơn chụp",
        "task": "Tờ hoá đơn thật ghi: Công ty vận chuyển, ngày 05/09, 3 kiện hàng, tổng 2.400.000 đồng, chưa có thông tin bảo hiểm. Công cụ tóm tắt như dưới. Bấm những đoạn công cụ tự thêm hoặc đọc sai.",
        "segments": [
          {
            "text": "Hoá đơn của công ty vận chuyển, ngày 05/09."
          },
          {
            "text": "Tổng cộng 3 kiện hàng."
          },
          {
            "text": "Tổng tiền 2.400.000 đồng."
          },
          {
            "text": "Hoá đơn đã bao gồm bảo hiểm hàng hoá trị giá 50 triệu đồng.",
            "error": "Hoá đơn không có thông tin bảo hiểm. Công cụ tự thêm một chi tiết nghe hợp lý và bịa luôn con số."
          },
          {
            "text": "Thanh toán trong vòng 15 ngày kể từ ngày xuất hoá đơn.",
            "error": "Hoá đơn không nêu hạn thanh toán; đây là chi tiết thường gặp nên công cụ điền vào cho đủ."
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Xấp hoá đơn cần nhập trước 5 giờ chiều",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn có 12 tờ hoá đơn chụp bằng điện thoại và cần nhập tổng vào bảng. Còn hai tiếng.",
            "choices": [
              {
                "label": "Gửi cả 12 ảnh, nhờ công cụ ra tổng rồi dán thẳng vào bảng",
                "next": "bad"
              },
              {
                "label": "Bảo công cụ chép từng số ra danh sách, rồi đối chiếu với ảnh",
                "next": "s2"
              }
            ]
          },
          "bad": {
            "text": "Tổng trông hợp lý nên bạn nộp luôn. Cuối tuần kế toán trưởng đối chiếu sổ và thấy lệch một khoản, do một số bị đọc nhầm. Bạn phải rà lại cả 12 tờ.",
            "ending": "bad"
          },
          "s2": {
            "text": "Danh sách có 12 số. Khi soát, bạn thấy hai số nhìn không giống ảnh.",
            "choices": [
              {
                "label": "Sửa hai số theo ảnh gốc, ghi chú lại và mới cộng tổng",
                "next": "good"
              },
              {
                "label": "Bỏ hai hoá đơn đó ra khỏi tổng cho đỡ rắc rối",
                "next": "bad2"
              }
            ]
          },
          "good": {
            "text": "Tổng khớp với sổ ngay lần đầu. Bạn rút ra: ảnh mờ thì đối chiếu luôn, mất thêm mười phút nhưng khỏi rà lại sau.",
            "ending": "good"
          },
          "bad2": {
            "text": "Tổng thiếu hai khoản nên vẫn lệch với sổ, và bạn phải giải thích vì sao thiếu.",
            "ending": "bad"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Tệp chữ đọc chắc, ảnh mờ phải soát; luôn bảo công cụ chép ra chữ trước.",
          "Bài sau: khi công cụ tìm trên web, làm sao biết câu nào có nguồn thật."
        ]
      }
    ]
  },
  {
    "track": "personal",
    "isFundamental": false,
    "correctOption": 0,
    "id": 2251,
    "slug": "tim-kiem-web-ket-qua-co-nguon-hay-khong",
    "title": "Chặng 42, Bài 12: Tìm kiếm trên web - câu trả lời có dẫn nguồn hay tự nghĩ ra",
    "subtitle": "Một câu có đường dẫn chưa chắc đã đúng: bạn chỉ tin khi mở nguồn và thấy chính câu đó.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "🔎",
    "whyItMatters": "Bạn cần thông tin của tuần này mà công cụ AI chưa từng được học. Khi bật tìm kiếm, nó đưa cả nguồn, trông rất đáng tin. Nhưng có câu được rút từ nguồn thật, có câu chỉ đứng cạnh một đường dẫn cho có. Biết phân biệt hai loại giúp bạn khỏi gửi sếp một thông tin không có gốc.",
    "openingQuestion": "Công cụ trả lời về một quy định vừa thay đổi và ghi kèm ba đường dẫn. Bạn nên làm gì trước khi dùng thông tin đó?",
    "openingOptions": [
      "Bấm vào từng đường dẫn và tìm xem câu đó có thật sự nằm trong trang không",
      "Dùng luôn, vì có đường dẫn nghĩa là công cụ đã đọc và trích đúng cả ba trang",
      "Hỏi lại công cụ rằng câu trả lời có đúng không rồi tin theo lời khẳng định",
      "Đếm số đường dẫn: ba nguồn trở lên thì thông tin chắc chắn là đúng và không cần mở ra"
    ],
    "explanation": "Đường dẫn chỉ cho biết công cụ đã tìm thấy trang đó; nó không bảo đảm trang nói đúng điều được viết. Có khi câu trả lời là suy đoán rồi gắn nguồn cho giống thật, có khi nguồn nói khác đi. Chỉ bằng cách mở nguồn và thấy chính ý đó trong trang bạn mới biết. Hỏi lại công cụ không phải kiểm chứng, và số lượng đường dẫn không nói lên điều gì về độ đúng.",
    "diagram": [
      {
        "label": "Bạn bật tìm kiếm và đặt câu hỏi",
        "arrow": true
      },
      {
        "label": "Công cụ tìm và đọc các trang",
        "arrow": true
      },
      {
        "label": "Nó viết câu trả lời kèm nguồn",
        "arrow": true
      },
      {
        "label": "Bạn bấm nguồn, tìm đúng câu đó",
        "arrow": true
      },
      {
        "label": "Chỉ dùng phần đã thấy trong nguồn"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Một bạn nhân sự hỏi công cụ về mức thay đổi một chế độ nghỉ phép và nhận câu trả lời kèm hai đường dẫn. Khi mở, đường dẫn đầu đúng là trang chính thức và có câu đó. Đường dẫn thứ hai là một bài blog không nhắc gì tới con số vừa được nêu. Bạn ấy chỉ dùng phần có nguồn đầu và hỏi lại phòng pháp chế cho phần còn lại. Đây là tình huống minh hoạ, không phải một công ty cụ thể."
    },
    "quiz": [
      {
        "question": "Công cụ AI cần bật tìm kiếm để làm gì?",
        "options": [
          "Để lấy thông tin mới hơn phần nó đã học",
          "Để hiểu tiếng Việt tốt hơn khi bạn gõ có dấu và không dấu",
          "Để không bao giờ trả lời sai vì nó sẽ đối chiếu với mọi trang web trên mạng",
          "Để tự động xoá các câu trả lời cũ khỏi cuộc trò chuyện của bạn"
        ],
        "correct": 0,
        "explanation": "Kiến thức của công cụ dừng ở một thời điểm, nên chuyện mới trong tuần phải nhờ tìm web. Tìm kiếm không làm nó hiểu tiếng Việt hơn, không bảo đảm không sai (nó vẫn có thể hiểu sai trang), và cũng không xoá gì khỏi cuộc trò chuyện."
      },
      {
        "question": "Bạn thấy câu trả lời có nguồn ghi dạng 'theo một số báo cáo' nhưng không có đường dẫn nào. Nghĩa là gì?",
        "options": [
          "Chưa có gì để kiểm; coi đó là ý chưa có nguồn",
          "Câu này chắc chắn đúng vì nhiều báo cáo cùng nói như vậy",
          "Nguồn đã bị ẩn để bảo vệ bản quyền, cứ yên tâm dùng",
          "Công cụ đã kiểm ba lần trước khi viết câu đó ra cho bạn"
        ],
        "correct": 0,
        "explanation": "Cụm 'theo một số báo cáo' chỉ trông như có nguồn; bạn không mở được gì để đối chiếu. Đó chính là loại câu trông có nguồn mà không có nguồn thật. Việc ẩn nguồn để bảo vệ bản quyền hay kiểm ba lần đều là điều bạn không có bằng chứng."
      },
      {
        "question": "Đường dẫn công cụ đưa ra mở ra trang không tồn tại. Kết luận hợp lý nhất?",
        "options": [
          "Không dùng câu đó cho tới khi tìm được nguồn khác",
          "Chỉ là lỗi mạng, câu trả lời vẫn đúng",
          "Trang đã bị xoá nên câu trả lời đúng ở thời điểm trước",
          "Đường dẫn cũ thì càng đáng tin vì đã tồn tại lâu năm"
        ],
        "correct": 0,
        "explanation": "Đường dẫn không mở được là một dấu hiệu công cụ có thể đã tạo đường dẫn nghe hợp lý mà chưa từng tồn tại, hoặc nguồn đã mất. Dù lý do nào, bạn không còn gì để kiểm chứng. Cho rằng nội dung vẫn đúng hoặc đường dẫn cũ đáng tin là suy đoán không có cơ sở."
      },
      {
        "question": "Nguồn công cụ đưa là một trang có nhắc chủ đề của bạn, nhưng không có con số nó vừa nêu. Nên xử lý thế nào?",
        "options": [
          "Bỏ con số đó cho tới khi có nguồn nói đúng con số ấy",
          "Giữ con số vì chủ đề của trang đã khớp với câu hỏi",
          "Làm tròn con số cho gần với những gì trang nói là được",
          "Ghi thêm tên trang vào báo cáo để con số trông có gốc"
        ],
        "correct": 0,
        "explanation": "Chủ đề khớp mà con số không có trong trang nghĩa là con số không có gốc ở nguồn đó. Làm tròn cho gần hay chỉ thêm tên trang vào báo cáo chỉ làm con số trông có nguồn, trong khi nó vẫn chưa được chứng minh. Chỉ giữ thứ bạn đã thấy tận mắt trong trang."
      },
      {
        "question": "Trong ba nguồn công cụ đưa, có một nguồn là bài đăng ẩn danh trên diễn đàn. Cách dùng đúng là gì?",
        "options": [
          "Ưu tiên nguồn chính thức, còn diễn đàn chỉ để tham khảo thêm",
          "Xếp cả ba nguồn ngang nhau vì công cụ đã chọn giúp bạn",
          "Ưu tiên bài diễn đàn vì được nhiều người đọc và bình luận",
          "Loại hết nguồn khác và chỉ giữ diễn đàn vì thông tin mới nhất"
        ],
        "correct": 0,
        "explanation": "Nguồn chính thức, có người chịu trách nhiệm, đáng tin hơn một bài ẩn danh. Công cụ chọn nguồn theo mức liên quan tới câu hỏi chứ không xếp theo độ tin cậy, nên bạn phải tự cân nhắc. Số người đọc hay tính mới không thay cho việc biết ai đứng sau thông tin."
      }
    ],
    "keyTakeaways": [
      "Tìm kiếm web giúp có thông tin mới, nhưng không làm câu trả lời tự động đúng.",
      "Có đường dẫn không có nghĩa là trang đó nói đúng điều được viết.",
      "Mở nguồn và tìm đúng câu, đúng con số đó trong trang.",
      "Cụm như 'theo một số báo cáo' mà không có đường dẫn thì chưa có nguồn.",
      "Nguồn chính thức, có tên người hoặc tổ chức chịu trách nhiệm, đáng tin hơn bài ẩn danh."
    ],
    "practicePrompt": {
      "question": "Bạn cần biết một hạn nộp hồ sơ vừa đổi trong tuần này. Cách dùng công cụ AI nào hợp lý nhất?",
      "options": [
        "Bật tìm kiếm, mở trang nguồn chính thức và tự đọc ngày ở đó",
        "Hỏi công cụ không bật tìm kiếm cho nhanh vì nó biết hết mọi quy định",
        "Hỏi ba lần và lấy ngày xuất hiện nhiều lần nhất trong các câu trả lời",
        "Dùng ngày công cụ nêu vì nó kèm một đường dẫn trông có vẻ chính thức"
      ],
      "correct": 0,
      "explanation": "Hạn nộp mới đổi là thông tin sau thời điểm công cụ được huấn luyện, nên phải tìm web và tự đọc ngày ở nguồn chính thức. Không bật tìm kiếm thì nó chỉ đoán. Hỏi nhiều lần chỉ lặp lại cùng một cách đoán, và một đường dẫn trông chính thức vẫn cần bạn mở ra kiểm."
    },
    "summary": {
      "keyIdea": "Nguồn là chỗ để bạn kiểm, không phải chỗ để bạn tin sẵn.",
      "formula": "Bật tìm kiếm → mở nguồn → tìm đúng câu đó trong trang → chỉ dùng phần đã thấy.",
      "commonMistake": "Coi đường dẫn đi kèm là bằng chứng mà không bấm vào.",
      "action": "Lần tới công cụ dẫn nguồn, mở ít nhất một nguồn và tìm đúng con số."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn một câu hỏi về việc của tuần này, ví dụ một thay đổi của nhà cung cấp hay một thủ tục. Bật tìm kiếm, hỏi công cụ, rồi mở từng nguồn và ghi vào một bảng nhỏ: câu nào tìm thấy trong nguồn, câu nào không.",
      "secondary": "Gửi bảng đó cho đồng nghiệp nếu bạn định dùng thông tin trong công việc."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Sếp hỏi về một thay đổi vừa có trong tuần. Công cụ AI không biết chuyện mới nếu không tìm web. Khi có tìm kiếm và có đường dẫn, bạn cần biết câu nào là thật, câu nào chỉ đứng cạnh một đường dẫn."
      },
      {
        "type": "feynman",
        "title": "Tìm kiếm có dẫn nguồn đơn giản hơn bạn nghĩ",
        "intro": "Hình dung bạn nhờ một bạn đồng nghiệp đi tra cứu rồi báo lại. Bạn ấy có thể đọc thật và nói đúng, hoặc nói theo trí nhớ rồi bảo 'có trong tài liệu đấy'. Bạn không biết khác biệt cho tới khi mở tài liệu ra.",
        "columns": [
          "Thành phần",
          "Đồng nghiệp đi tra cứu",
          "Công cụ AI có tìm kiếm"
        ],
        "rows": [
          [
            "Việc làm",
            "Đọc vài trang rồi tóm lại",
            "Tìm vài trang, đọc, viết câu trả lời"
          ],
          [
            "Nguồn",
            "Nói 'có trong tài liệu X'",
            "Kèm đường dẫn hoặc tên trang"
          ],
          [
            "Rủi ro",
            "Nhớ nhầm nhưng nói rất chắc",
            "Câu trả lời khác điều trang thực sự nói"
          ],
          [
            "Cách kiểm",
            "Mở tài liệu, tìm đúng đoạn",
            "Bấm nguồn, tìm đúng câu và con số"
          ]
        ],
        "oneLiner": "Nguồn chỉ có giá trị khi bạn mở ra và thấy chính câu đó."
      },
      {
        "type": "heading",
        "text": "Câu có nguồn thật và câu chỉ trông có nguồn"
      },
      {
        "type": "paragraph",
        "text": "Khi bật tìm kiếm, công cụ đọc một số trang rồi viết lại. Phần lớn chi tiết thường lấy từ trang, nhưng có thể có câu suy đoán hoặc câu tóm tắt lệch ý. Bạn không phân biệt được bằng cách đọc câu trả lời, vì cả hai đều được viết trôi chảy."
      },
      {
        "type": "comparison",
        "left": {
          "label": "Có nguồn thật",
          "text": "Có đường dẫn mở được. Trong trang có chính câu hoặc con số đó. Trang thuộc tổ chức hoặc người chịu trách nhiệm rõ ràng. Ngày đăng còn đủ mới cho việc bạn cần."
        },
        "right": {
          "label": "Chỉ trông có nguồn",
          "text": "Cụm chung chung như 'theo các nghiên cứu'. Đường dẫn không mở được. Trang chỉ cùng chủ đề nhưng không có con số đó. Bài ẩn danh hoặc đã cũ."
        }
      },
      {
        "type": "flow",
        "title": "Từ câu hỏi có tìm kiếm tới thông tin đã kiểm",
        "steps": [
          {
            "label": "Bạn bật tìm kiếm và hỏi",
            "detail": "Tìm kiếm cho phép công cụ lấy trang mới hơn phần nó đã học. Bạn nên hỏi cụ thể: việc gì, ở đâu, tính tới thời điểm nào."
          },
          {
            "label": "Công cụ chọn và đọc trang",
            "detail": "Nó chọn trang theo mức liên quan tới câu hỏi, chưa chắc theo độ tin cậy, rồi đọc phần nội dung có thể xử lý."
          },
          {
            "label": "Nó viết câu trả lời",
            "detail": "Câu trả lời trôi chảy, có thể pha lẫn ý lấy từ trang và ý tự suy ra. Đường dẫn được gắn kèm."
          },
          {
            "label": "Bạn mở nguồn",
            "detail": "Bấm vào đường dẫn và tìm đúng câu hoặc con số. Nếu không có, coi đó là chưa có nguồn."
          },
          {
            "label": "Bạn chỉ giữ phần đã kiểm",
            "detail": "Phần thấy trong nguồn chính thức thì dùng được. Phần còn lại hỏi thêm người có chuyên môn."
          }
        ]
      },
      {
        "type": "callout",
        "label": "Cẩn thận với chuyện pháp lý, thuế, y tế",
        "text": "Với các việc này, đừng dựa vào câu trả lời của công cụ dù có nguồn. Đọc bản chính thức và hỏi bộ phận pháp chế, kế toán trưởng hoặc chuyên gia trước khi làm theo."
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Soát câu trả lời có nguồn",
        "task": "Bạn hỏi về một nhà cung cấp phần mềm nhỏ. Trang chính thức của họ chỉ nói: ra mắt tính năng nhập dữ liệu từ bảng tính, hỗ trợ tiếng Việt, chưa công bố giá. Bấm những câu không có trong nguồn.",
        "segments": [
          {
            "text": "Nhà cung cấp vừa ra mắt tính năng nhập dữ liệu từ bảng tính."
          },
          {
            "text": "Sản phẩm có hỗ trợ giao diện tiếng Việt."
          },
          {
            "text": "Giá khởi điểm là 99 nghìn đồng mỗi người mỗi tháng.",
            "error": "Trang chính thức nói rõ chưa công bố giá. Công cụ tự điền một mức giá nghe hợp lý."
          },
          {
            "text": "Theo các đánh giá của khách hàng, hơn 90% người dùng hài lòng.",
            "error": "Không có đánh giá hay tỷ lệ nào trong nguồn; câu chỉ mượn cụm 'theo các đánh giá' để trông có gốc."
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Sếp hỏi về đối thủ trước cuộc họp",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Sếp nhắn: 'Đối thủ A vừa thay đổi gì trong tuần này?' Bạn bật tìm kiếm và công cụ đưa ba ý kèm hai đường dẫn.",
            "choices": [
              {
                "label": "Chép nguyên ba ý vào email trả lời sếp",
                "next": "bad"
              },
              {
                "label": "Mở hai đường dẫn, tìm từng ý trong trang",
                "next": "s2"
              }
            ]
          },
          "bad": {
            "text": "Trong họp, sếp nêu ý thứ hai và bị đồng nghiệp hỏi nguồn. Khi mở, trang không hề nhắc tới ý đó.",
            "ending": "bad"
          },
          "s2": {
            "text": "Hai ý có trong trang chính thức của đối thủ; ý thứ ba thì không thấy ở đâu.",
            "choices": [
              {
                "label": "Gửi hai ý đã có nguồn, ghi rõ ý thứ ba chưa kiểm được",
                "next": "good"
              },
              {
                "label": "Bỏ luôn cả câu trả lời vì công cụ đã sai một ý",
                "next": "bad2"
              }
            ]
          },
          "good": {
            "text": "Sếp có hai ý chắc kèm đường dẫn để mở khi cần, và biết ý thứ ba còn chờ kiểm. Cuộc họp diễn ra suôn sẻ.",
            "ending": "good"
          },
          "bad2": {
            "text": "Sếp không có gì để nói về đối thủ trong họp, trong khi hai ý đầu hoàn toàn dùng được.",
            "ending": "bad"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Nguồn chỉ có giá trị khi bạn mở ra và thấy đúng câu đó.",
          "Bài sau: gom tài liệu vào một không gian dự án để khỏi dặn lại mỗi lần."
        ]
      }
    ]
  },
  {
    "track": "personal",
    "isFundamental": false,
    "correctOption": 0,
    "id": 2252,
    "slug": "khong-gian-du-an-gom-tai-lieu-mot-cho",
    "title": "Chặng 42, Bài 13: Không gian dự án - gom tài liệu và dặn dò một lần",
    "subtitle": "Một chỗ chứa tài liệu của một khách hàng và một lời dặn chung, để khỏi dán lại mỗi ngày.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "🗂️",
    "whyItMatters": "Mỗi lần mở cuộc trò chuyện mới, bạn lại dán tài liệu và nhắc lại cách trả lời khách hàng đó. Nhiều công cụ có chỗ để gom tài liệu và lời dặn một lần cho từng công việc. Dùng đúng thì mỗi câu hỏi sau chỉ cần vài chữ, và câu trả lời bám tài liệu của bạn thay vì đoán.",
    "openingQuestion": "Ngày nào bạn cũng dán bộ tài liệu của khách hàng A rồi viết lại đúng lời dặn 'trả lời ngắn, gọi khách là anh Hùng'. Cách nào tiết kiệm nhất?",
    "openingOptions": [
      "Gom tài liệu và lời dặn vào một chỗ dùng chung của công cụ để mỗi lần hỏi chỉ cần nói việc",
      "Dán bộ tài liệu vào mỗi câu hỏi để công cụ chắc chắn nhìn thấy đầy đủ mọi thứ",
      "Viết lời dặn dài hơn, thật chi tiết, rồi dán vào đầu cuộc trò chuyện mỗi ngày",
      "Chỉ dán một nửa tài liệu để công cụ đọc nhanh hơn và đỡ nhầm lẫn giữa các trang"
    ],
    "explanation": "Điều bạn lặp lại mỗi ngày là tài liệu và cách trả lời, nên gom chúng vào một chỗ dùng chung để công cụ nhìn thấy mỗi lần bạn hỏi. Tên gọi và cách làm khác nhau giữa các công cụ, nên hãy xem hướng dẫn của chính công cụ bạn dùng. Dán lại vào từng câu hỏi hay dặn dài hơn chỉ tốn công như cũ, còn dán một nửa tài liệu làm nó thiếu thông tin và dễ đoán.",
    "diagram": [
      {
        "label": "Chọn tài liệu của một khách hàng",
        "arrow": true
      },
      {
        "label": "Gom vào một chỗ dùng chung",
        "arrow": true
      },
      {
        "label": "Viết lời dặn ngắn, rõ, một lần",
        "arrow": true
      },
      {
        "label": "Hỏi từng câu ngắn",
        "arrow": true
      },
      {
        "label": "Kiểm xem trả lời có bám tài liệu"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Một bạn chăm sóc khách hàng phụ trách một khách sạn nhỏ. Mỗi sáng bạn ấy dán hợp đồng, bảng giá và ba lá thư cũ vào cuộc trò chuyện mới, mất khoảng mười phút. Sau khi gom bộ tài liệu vào một chỗ dùng chung và dặn giọng văn một lần, mỗi câu hỏi chỉ còn một dòng. Số phút ở đây là minh hoạ, không phải đo thật."
    },
    "quiz": [
      {
        "question": "Khi gom tài liệu của một khách hàng vào một chỗ dùng chung, điều gì thay đổi nhiều nhất?",
        "options": [
          "Bạn không phải dán lại tài liệu mỗi lần hỏi",
          "Công cụ tự hiểu mọi tài liệu dù bạn không dặn gì",
          "Công cụ tự sửa lỗi sai có sẵn trong các tài liệu",
          "Công cụ luôn trả lời đúng mọi câu về khách hàng"
        ],
        "correct": 0,
        "explanation": "Lợi ích chính là khỏi lặp lại việc dán tài liệu. Nó không tự hiểu thay bạn, không sửa lỗi sai trong tài liệu (nếu hợp đồng viết sai thì trả lời cũng bám theo chỗ sai) và không bảo đảm mọi câu đều đúng, nên bạn vẫn phải kiểm."
      },
      {
        "question": "Lời dặn chung nào viết tốt nhất cho khách hàng A?",
        "options": [
          "Trả lời dưới 100 chữ, gọi khách là anh Hùng, chỉ dựa trên tài liệu, thiếu thì nói chưa có",
          "Trả lời thật chuyên nghiệp, thật tử tế và hay nhất có thể trong mọi trường hợp",
          "Hãy nhớ mọi điều về khách hàng A và luôn làm hài lòng khách hàng đó",
          "Cố gắng giúp tối đa, và nếu tài liệu không có thì cứ suy luận cho đủ ý"
        ],
        "correct": 0,
        "explanation": "Lời dặn tốt có điều kiện đo được: độ dài, cách xưng hô, chỉ dựa trên tài liệu và cách xử lý khi thiếu. Các câu 'chuyên nghiệp nhất', 'làm hài lòng khách' không đo được, còn 'suy luận cho đủ ý' khuyến khích công cụ bịa khi tài liệu không có."
      },
      {
        "question": "Bộ tài liệu của khách A có hai bảng giá khác nhau, cũ và mới. Bạn nên làm gì?",
        "options": [
          "Gom bảng mới nhất và ghi rõ trong lời dặn là chỉ dùng bảng mới",
          "Gom cả hai và để công cụ tự chọn bảng phù hợp với câu hỏi",
          "Gom bảng cũ vì nó có nhiều ví dụ hơn và thường đầy đủ hơn cả bảng mới",
          "Bỏ cả hai bảng và nhờ công cụ nhớ giá khách từng hỏi trước đây"
        ],
        "correct": 0,
        "explanation": "Hai bản mâu thuẫn trong cùng một chỗ dùng chung khiến câu trả lời lúc theo bản này lúc theo bản kia. Chỉ đưa bản đúng, hoặc ghi rõ bản nào có hiệu lực, là cách tránh mâu thuẫn. Để nó tự chọn hay ưu tiên bản đầy đủ hơn đều không đảm bảo giá đúng."
      },
      {
        "question": "Bạn muốn dùng một chỗ chung cho hai khách hàng khác nhau để tiết kiệm công. Rủi ro lớn nhất là gì?",
        "options": [
          "Thông tin của khách này bị lẫn sang câu trả lời cho khách kia",
          "Công cụ sẽ chạy chậm hơn hẳn ở mọi câu hỏi sau đó",
          "Công cụ từ chối đọc những tài liệu có nhiều hơn một tên riêng",
          "Công cụ chỉ trả lời được câu hỏi liên quan tới khách đầu tiên"
        ],
        "correct": 0,
        "explanation": "Khi hai bộ tài liệu chung một chỗ, một câu hỏi có thể được trả lời bằng thông tin của khách kia, và bạn khó nhận ra. Mỗi khách nên có chỗ riêng. Các rủi ro về tốc độ, từ chối đọc hay chỉ trả lời khách đầu không phải vấn đề chính."
      },
      {
        "question": "Trước khi tải tài liệu khách hàng vào một công cụ, điều nào cần làm?",
        "options": [
          "Kiểm tra công ty cho phép dùng công cụ đó với loại tài liệu này",
          "Đổi tên tệp cho ngắn gọn để công cụ dễ đọc và dễ tìm hơn mỗi khi cần",
          "Đặt mật khẩu cho tệp rồi gửi mật khẩu trong lời dặn",
          "Xoá các trang có chữ ký để công cụ khỏi đọc nhầm"
        ],
        "correct": 0,
        "explanation": "Tài liệu khách hàng là dữ liệu của công ty và khách; công ty có quy định về công cụ nào được dùng. Đổi tên tệp không liên quan tới rủi ro dữ liệu, và gửi mật khẩu trong lời dặn còn làm lộ thêm thông tin. Xoá chữ ký không giải quyết vấn đề gửi dữ liệu ra ngoài."
      }
    ],
    "keyTakeaways": [
      "Gom tài liệu và lời dặn vào một chỗ dùng chung để khỏi lặp lại mỗi ngày.",
      "Mỗi khách hàng một chỗ riêng, để thông tin không lẫn nhau.",
      "Lời dặn tốt có điều đo được: độ dài, xưng hô, chỉ dựa trên tài liệu.",
      "Chỉ đưa bản tài liệu đúng và còn hiệu lực.",
      "Tên gọi và cách làm khác nhau giữa các công cụ; xem hướng dẫn của công cụ bạn dùng."
    ],
    "practicePrompt": {
      "question": "Bạn gom hợp đồng và bảng giá của khách B vào một chỗ chung. Lời dặn nào giúp câu trả lời bám tài liệu nhất?",
      "options": [
        "Chỉ trả lời từ tài liệu này; nếu không thấy thì nói chưa có thông tin",
        "Trả lời như một chuyên gia có nhiều năm kinh nghiệm về khách B",
        "Trả lời càng chi tiết càng tốt, bổ sung thêm những gì thường gặp cho đủ ý",
        "Trả lời nhanh và thân thiện, tránh nhắc quá nhiều tới tài liệu"
      ],
      "correct": 0,
      "explanation": "Lời dặn chỉ dựa trên tài liệu và nói 'chưa có' khi thiếu là điều biến chỗ chung thành nguồn để kiểm. 'Chuyên gia nhiều năm' và 'bổ sung những gì thường gặp' khuyến khích công cụ thêm thứ không có trong tài liệu, còn 'tránh nhắc tài liệu' làm bạn khó đối chiếu."
    },
    "summary": {
      "keyIdea": "Gom một lần, dặn một lần, rồi mỗi câu hỏi chỉ nói việc; kiểm bằng cách yêu cầu bám tài liệu.",
      "formula": "Tài liệu đúng + lời dặn đo được + mỗi khách một chỗ = câu trả lời bám tài liệu.",
      "commonMistake": "Gom lẫn nhiều khách hoặc nhiều phiên bản trong một chỗ rồi tin câu trả lời.",
      "action": "Chọn một khách hàng và ghi ra 3 tài liệu sẽ gom, cùng 3 dòng lời dặn."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn một khách hàng hoặc một dự án bạn xử lý hằng tuần. Kiểm tra công ty cho phép dùng công cụ nào với loại tài liệu đó, rồi gom 3 tài liệu và viết 3 dòng lời dặn (độ dài, xưng hô, chỉ dựa trên tài liệu). Hỏi thử một câu và ghi lại kết quả.",
      "secondary": "Hôm sau, hỏi một câu mà tài liệu không có để xem nó có nói chưa có thông tin không."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Mỗi sáng bạn dán bộ tài liệu của cùng một khách hàng rồi dặn lại giọng văn. Lặp lại như vậy là dấu hiệu cần một chỗ dùng chung. Bài này dạy cách gom và dặn để sau đó bạn chỉ cần hỏi."
      },
      {
        "type": "feynman",
        "title": "Không gian dự án đơn giản hơn bạn nghĩ",
        "intro": "Hình dung một chiếc tủ hồ sơ riêng cho từng khách hàng, kèm tờ giấy dán ở cửa tủ ghi cách làm việc với khách đó. Ai mở tủ ra cũng thấy cùng tài liệu và cùng lời dặn.",
        "columns": [
          "Thành phần",
          "Tủ hồ sơ của khách",
          "Không gian dự án"
        ],
        "rows": [
          [
            "Chỗ chứa",
            "Một ngăn tủ cho mỗi khách",
            "Một chỗ dùng chung cho mỗi khách hoặc dự án"
          ],
          [
            "Nội dung",
            "Hợp đồng, bảng giá, thư cũ",
            "Tài liệu bạn đã gom vào"
          ],
          [
            "Lời dặn",
            "Tờ ghi chú dán ở cửa tủ",
            "Lời dặn chung, đọc mỗi lần bạn hỏi"
          ],
          [
            "Rủi ro",
            "Bỏ nhầm hồ sơ khách khác vào tủ",
            "Tài liệu lẫn khách, hoặc bản cũ lẫn bản mới"
          ]
        ],
        "oneLiner": "Mỗi khách một tủ, một lời dặn: gom một lần rồi dùng lại."
      },
      {
        "type": "heading",
        "text": "Vấn đề: dán lại và dặn lại mỗi ngày"
      },
      {
        "type": "paragraph",
        "text": "Việc lặp lại tốn công và dễ sai: hôm nay bạn quên dán bảng giá, ngày mai lời dặn ngắn hơn hôm qua, và câu trả lời khác nhau mà không rõ vì sao. Nhiều công cụ có chỗ để gom tài liệu và lời dặn một lần, gọi bằng những tên khác nhau. Bài này không dạy nút bấm vì giao diện thay đổi; hãy xem hướng dẫn của công cụ bạn dùng."
      },
      {
        "type": "list",
        "items": [
          "Chọn ít tài liệu nhưng đúng: hợp đồng đang hiệu lực, bảng giá mới nhất, vài lá thư mẫu.",
          "Mỗi khách hoặc dự án một chỗ riêng để thông tin không lẫn.",
          "Lời dặn có điều đo được: độ dài, xưng hô, chỉ dựa trên tài liệu, thiếu thì nói chưa có.",
          "Kiểm tra công ty cho phép dùng công cụ đó với tài liệu này."
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Dặn tốt",
          "text": "Trả lời dưới 100 chữ, gọi khách là anh Hùng, chỉ dựa trên tài liệu đã gom. Nếu tài liệu không có thì nói chưa có thông tin, đừng đoán."
        },
        "right": {
          "label": "Dặn mơ hồ",
          "text": "Hãy trả lời thật chuyên nghiệp và làm hài lòng khách hàng. Cố gắng giúp tối đa mọi lúc, kể cả khi tài liệu không có."
        }
      },
      {
        "type": "flow",
        "title": "Từ chỗ dùng chung tới câu trả lời bám tài liệu",
        "steps": [
          {
            "label": "Chọn tài liệu",
            "detail": "Chọn vài tài liệu đúng và còn hiệu lực của một khách hàng; bỏ bản cũ mâu thuẫn."
          },
          {
            "label": "Gom vào một chỗ",
            "detail": "Đưa tài liệu vào chỗ dùng chung của công cụ. Kiểm tra công ty cho phép dùng công cụ này với loại dữ liệu đó."
          },
          {
            "label": "Viết lời dặn",
            "detail": "Ghi ngắn: độ dài, cách xưng hô, chỉ dựa trên tài liệu, thiếu thì nói chưa có."
          },
          {
            "label": "Hỏi từng câu",
            "detail": "Mỗi lần chỉ cần nêu việc, không dán lại tài liệu hay lời dặn."
          },
          {
            "label": "Kiểm câu trả lời",
            "detail": "Hỏi thêm một câu tài liệu không có, xem công cụ có nói chưa có thông tin hay tự bịa."
          }
        ]
      },
      {
        "type": "callout",
        "label": "Chỗ dùng chung vẫn là dữ liệu gửi ra ngoài",
        "text": "Tài liệu khách hàng thuộc về công ty và khách. Hỏi bộ phận IT hoặc quản lý trước khi tải lên một công cụ, và không đưa dữ liệu nhạy cảm nếu công ty chưa duyệt."
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Lắp lời dặn cho không gian của khách Hùng",
        "task": "Bạn đã gom hợp đồng và bảng giá của khách Hùng. Chọn từng phần để dựng lời dặn chung.",
        "parts": [
          {
            "id": "scope",
            "label": "Nguồn trả lời",
            "options": [
              {
                "text": "Chỉ dựa trên tài liệu đã gom; nếu không có thì nói chưa có thông tin.",
                "good": true,
                "feedback": "Công cụ biết phải dừng khi tài liệu thiếu, nên ít bịa chi tiết."
              },
              {
                "text": "Dựa trên tài liệu và bổ sung thêm những gì thường gặp trong ngành.",
                "feedback": "Phần bổ sung là chỗ công cụ thêm chi tiết không có trong hợp đồng, và bạn khó nhận ra."
              }
            ]
          },
          {
            "id": "tone",
            "label": "Giọng và xưng hô",
            "options": [
              {
                "text": "Thân thiện, gọi khách là anh Hùng, dưới 100 chữ.",
                "good": true,
                "feedback": "Giọng, cách xưng hô và độ dài đều đo được nên câu trả lời đồng nhất mỗi ngày."
              },
              {
                "text": "Viết thật hay và thật chuyên nghiệp.",
                "feedback": "Không đo được, nên mỗi ngày một kiểu và thường dài dòng."
              }
            ]
          },
          {
            "id": "format",
            "label": "Cách trình bày",
            "options": [
              {
                "text": "Nêu câu trả lời trước, sau đó ghi tên tài liệu và mục đã dùng.",
                "good": true,
                "feedback": "Có tên tài liệu và mục nên bạn mở ra đối chiếu được ngay."
              },
              {
                "text": "Chỉ viết đoạn văn liền mạch, không cần ghi tài liệu nào.",
                "feedback": "Không có dấu vết để đối chiếu, bạn phải đọc cả bộ tài liệu để kiểm."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "scope",
              "tone",
              "format"
            ],
            "text": "Chào anh Hùng, theo hợp đồng hiện hành, thời hạn thanh toán là 30 ngày kể từ ngày nhận hoá đơn. (Nguồn: Hợp đồng, mục Thanh toán.) Phần chiết khấu thêm thì tài liệu chưa có thông tin."
          },
          {
            "requires": [
              "scope"
            ],
            "text": "Chào anh Hùng, thời hạn thanh toán là 30 ngày. (Không ghi rõ ở mục nào của tài liệu, nên bạn phải tự mở tìm.)"
          },
          {
            "text": "Kính gửi Quý khách, chúng tôi luôn sẵn sàng hỗ trợ. Thông thường thanh toán trong 15 ngày và có chiết khấu 5% cho khách thân thiết... (Con số 15 ngày và 5% không có trong tài liệu, công cụ tự thêm vào.)"
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Hai khách hàng, một chỗ chung",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn phụ trách hai khách, Hùng và Mai. Bạn muốn tiết kiệm công nên nghĩ tới việc dùng chung một chỗ.",
            "choices": [
              {
                "label": "Gom cả hai bộ tài liệu vào một chỗ cho đỡ tốn công",
                "next": "bad"
              },
              {
                "label": "Tạo hai chỗ riêng, mỗi khách một chỗ",
                "next": "s2"
              }
            ]
          },
          "bad": {
            "text": "Tuần sau, công cụ dùng giá của khách Mai để trả lời khách Hùng. Bạn chỉ phát hiện khi khách hỏi vì sao giá khác hợp đồng.",
            "ending": "bad"
          },
          "s2": {
            "text": "Mỗi chỗ có tài liệu và lời dặn riêng. Bạn hỏi thử một câu mà tài liệu không có.",
            "choices": [
              {
                "label": "Kiểm câu trả lời có nói chưa có thông tin, rồi mới dùng hằng ngày",
                "next": "good"
              },
              {
                "label": "Bỏ qua vì công cụ thường tự biết khi nào thiếu",
                "next": "bad2"
              }
            ]
          },
          "good": {
            "text": "Công cụ trả lời chưa có thông tin cho câu đó, và bạn biết lời dặn đang hoạt động đúng. Từ đó mỗi câu hỏi chỉ cần một dòng.",
            "ending": "good"
          },
          "bad2": {
            "text": "Một hôm công cụ tự bịa một điều khoản chiết khấu và bạn gửi luôn cho khách, phải xin lỗi sau đó.",
            "ending": "bad"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Gom một lần, dặn một lần, mỗi khách một chỗ riêng.",
          "Bài sau: cùng một bảng số, hỏi ba cách khác nhau để thấy chỗ sai."
        ]
      }
    ]
  },
  {
    "track": "personal",
    "isFundamental": false,
    "correctOption": 0,
    "id": 2253,
    "slug": "cung-mot-bang-tinh-hoi-ba-cach",
    "title": "Chặng 42, Bài 14: Cùng một bảng số, hỏi ba cách khác nhau",
    "subtitle": "Cách hỏi quyết định công cụ nói 'trông ổn' hay chỉ ra dòng bị sai.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "📊",
    "whyItMatters": "Bạn nhờ công cụ tóm tắt một bảng doanh thu. Câu hỏi 'tóm tắt giúp tôi' cho ra một đoạn trôi chảy, nhưng không chắc đã bắt được ô nhập sai. Cùng bảng đó, hỏi khác đi sẽ lộ ra con số lệch. Bài này cho bạn ba cách hỏi để so sánh.",
    "openingQuestion": "Bảng doanh thu 200 dòng có một ô bị gõ thừa số 0. Cách hỏi nào có khả năng làm lộ ô đó cao nhất?",
    "openingOptions": [
      "Liệt kê những dòng có giá trị bất thường so với các dòng còn lại và nói vì sao",
      "Tóm tắt bảng doanh thu này thành ba câu để tôi gửi cho sếp đọc nhanh",
      "Cho tôi biết doanh thu trông có ổn không, tôi đang cần trả lời gấp",
      "Viết một đoạn nhận xét tích cực về tình hình doanh thu của công ty"
    ],
    "explanation": "Một yêu cầu tóm tắt chỉ cần công cụ viết ba câu nghe hợp lý, và một ô lệch bị che đi trong đó. Câu hỏi yêu cầu liệt kê dòng bất thường buộc nó nhìn vào từng dòng và nêu lý do, nên lỗi dễ lộ ra. Hỏi 'có ổn không' khuyến khích trả lời 'ổn', còn nhờ viết nhận xét tích cực gần như bảo nó bỏ qua chỗ xấu. Dù vậy, công cụ vẫn có thể bỏ sót, nên bạn vẫn cần kiểm bằng bảng tính.",
    "diagram": [
      {
        "label": "Cùng một bảng số",
        "arrow": true
      },
      {
        "label": "Hỏi cách 1: tóm tắt chung",
        "arrow": true
      },
      {
        "label": "Hỏi cách 2: tìm dòng bất thường",
        "arrow": true
      },
      {
        "label": "Hỏi cách 3: tự tính lại có kiểm",
        "arrow": true
      },
      {
        "label": "So sánh ba câu trả lời"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Một bạn kinh doanh có bảng doanh thu 150 dòng, trong đó một dòng gõ thừa số 0 làm doanh thu một chi nhánh phóng lên gấp mười lần. Hỏi 'tóm tắt' thì công cụ viết 'doanh thu tăng mạnh nhờ chi nhánh phía Nam', chấp nhận số đó. Hỏi 'liệt kê dòng bất thường' thì nó nêu đúng dòng ấy. Số liệu là minh hoạ."
    },
    "quiz": [
      {
        "question": "Bạn hỏi 'doanh thu quý này có ổn không?'. Điều gì dễ xảy ra?",
        "options": [
          "Công cụ nghiêng về trả lời 'ổn' mà không soát từng dòng",
          "Công cụ tự tính lại bảng và báo mọi ô sai ngay",
          "Công cụ từ chối trả lời vì câu hỏi quá chung",
          "Công cụ hỏi lại bạn để biết 'ổn' nghĩa là gì"
        ],
        "correct": 0,
        "explanation": "Câu hỏi có đáp án gợi sẵn 'ổn hay không' khiến công cụ chọn câu nghe xuôi thay vì soát. Nó không tự tính lại bảng, không thường từ chối, và hiếm khi hỏi lại mà thường trả lời luôn."
      },
      {
        "question": "Cách hỏi nào giúp bạn kiểm được công cụ đã nhìn dòng nào?",
        "options": [
          "Yêu cầu nêu số dòng và giá trị của từng chỗ nó cho là bất thường",
          "Yêu cầu trả lời ngắn nhất có thể để dễ đọc",
          "Yêu cầu trả lời bằng giọng văn thân thiện cho dễ tiếp cận",
          "Yêu cầu nêu kết luận cuối cùng trước, phần còn lại để sau nếu cần"
        ],
        "correct": 0,
        "explanation": "Nêu số dòng và giá trị cho bạn một chỗ cụ thể để mở bảng ra đối chiếu. Yêu cầu ngắn, giọng thân thiện hay kết luận trước không giúp bạn biết nó đã nhìn tới đâu."
      },
      {
        "question": "Công cụ nói 'tổng doanh thu là 12,4 tỷ'. Bạn nên làm gì?",
        "options": [
          "Tính lại tổng bằng công thức của bảng tính rồi so",
          "Tin số đó vì công cụ nêu con số cụ thể tới một chữ số thập phân",
          "Hỏi lại công cụ cùng câu hỏi để xem số có đổi không",
          "Làm tròn lên 13 tỷ cho an toàn khi báo cáo lên trên"
        ],
        "correct": 0,
        "explanation": "Tổng là việc của bảng tính, nên tính bằng công thức rồi so. Con số có chữ số thập phân chưa chứng tỏ đúng. Hỏi lại chỉ cho một câu trả lời khác từ cùng một cách đoán, còn làm tròn lên là thay đổi số liệu."
      },
      {
        "question": "Bảng có 500 dòng và công cụ bỏ sót 2% số dòng lỗi (số liệu minh hoạ). Khoảng bao nhiêu dòng lỗi có thể không được báo?",
        "options": [
          "Khoảng 10 dòng lỗi có thể không được báo (500 × 2 ÷ 100)",
          "Khoảng 100 dòng lỗi (500 × 0,2, nhầm 2% thành 20% khi đổi ra số)",
          "Khoảng 1 dòng lỗi (500 ÷ 500, chia cho chính số dòng)",
          "Không dòng nào, vì 2% là quá nhỏ để có thể tính tới"
        ],
        "correct": 0,
        "explanation": "500 × 2 ÷ 100 = 10 dòng. Đáp án 100 nhân nhầm 2% thành 20%, đáp án 1 chia cho số dòng là phép tính vô nghĩa. Và 2% vẫn là 10 dòng với bảng 500 dòng, đủ để làm sai báo cáo."
      },
      {
        "question": "Vì sao nên thử ít nhất hai cách hỏi trên cùng bảng số?",
        "options": [
          "Vì nếu hai câu trả lời mâu thuẫn thì đó là chỗ cần soát",
          "Vì hỏi hai lần thì công cụ tự sửa các lỗi của lần đầu",
          "Vì câu trả lời thứ hai luôn chính xác hơn câu trả lời đầu tiên",
          "Vì mỗi lần hỏi thêm công cụ sẽ có thêm dữ liệu về công ty bạn"
        ],
        "correct": 0,
        "explanation": "Hai câu trả lời khác nhau chỉ ra chỗ công cụ không chắc và bạn nên mở bảng ra soát. Công cụ không tự sửa lỗi lần đầu, câu trả lời sau không mặc nhiên đúng hơn và việc hỏi thêm không cho nó dữ liệu công ty."
      }
    ],
    "keyTakeaways": [
      "Câu hỏi có đáp án gợi sẵn ('có ổn không') khiến công cụ trả lời xuôi.",
      "Yêu cầu nêu số dòng và giá trị bất thường giúp bạn có chỗ để kiểm.",
      "Tổng và tỷ lệ tính bằng bảng tính; công cụ chỉ viết phần chữ.",
      "Hai cách hỏi cho hai câu trả lời khác nhau là dấu hiệu cần soát.",
      "Tỷ lệ bỏ sót nhỏ vẫn là nhiều dòng khi bảng lớn."
    ],
    "practicePrompt": {
      "question": "Bảng của bạn có 300 dòng và bạn nhờ công cụ tìm ô nhập sai. Yêu cầu nào hợp lý nhất?",
      "options": [
        "Liệt kê từng dòng có giá trị lệch nhiều so với dòng khác, nêu số dòng và lý do",
        "Cho biết bảng này có vấn đề gì không, trả lời có hoặc không",
        "Tóm tắt bảng và nhận xét tích cực để gửi sếp",
        "Sửa giúp mọi ô sai rồi gửi lại bảng đã sửa cho tôi"
      ],
      "correct": 0,
      "explanation": "Liệt kê số dòng và lý do cho bạn chỗ để đối chiếu. 'Có hay không' dễ nhận câu 'không'. Tóm tắt kèm nhận xét tích cực làm chìm lỗi, và để công cụ tự sửa ô sẽ đổi số liệu mà bạn chưa kiểm."
    },
    "summary": {
      "keyIdea": "Cách hỏi quyết định công cụ soát hay chỉ viết cho xuôi.",
      "formula": "Hỏi để nó nêu dòng và lý do, tính tổng bằng bảng tính, so hai cách hỏi.",
      "commonMistake": "Hỏi câu có đáp án gợi sẵn và tin câu trả lời 'ổn'.",
      "action": "Thử ba cách hỏi trên cùng một bảng và ghi lại cách nào lộ ra lỗi."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Lấy một bảng số thật của bạn có 30 dòng trở lên. Tự sửa lén một ô cho thành số bất thường (gõ thừa số 0), rồi hỏi công cụ theo ba cách: tóm tắt, có ổn không, và liệt kê dòng bất thường. Ghi cách nào bắt được ô đã sửa.",
      "secondary": "Nhớ khôi phục ô về giá trị cũ ngay sau khi thử."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bạn nhờ công cụ tóm tắt bảng doanh thu và nhận một đoạn rất trôi chảy. Nhưng có ô nào trong bảng bị gõ sai không? Câu trả lời phụ thuộc vào cách bạn hỏi."
      },
      {
        "type": "feynman",
        "title": "Cách hỏi đơn giản hơn bạn nghĩ",
        "intro": "Hình dung bạn đưa một xấp phiếu cho người soát. Nếu bạn nói 'nhìn qua xem có ổn không', họ liếc rồi gật đầu. Nếu bạn nói 'chỉ ra phiếu nào lệch và nói vì sao', họ phải xem từng phiếu.",
        "columns": [
          "Thành phần",
          "Người soát phiếu",
          "Công cụ AI"
        ],
        "rows": [
          [
            "Hỏi chung",
            "Liếc qua và gật đầu",
            "Tóm tắt xuôi, chấp nhận số đã có"
          ],
          [
            "Hỏi cụ thể",
            "Xem từng phiếu, chỉ ra phiếu lệch",
            "Nêu dòng bất thường kèm lý do"
          ],
          [
            "Đáp án gợi sẵn",
            "Dễ nói 'ổn' để vừa lòng",
            "Nghiêng về trả lời theo hướng câu hỏi gợi"
          ],
          [
            "Cách kiểm",
            "Mở đúng phiếu được chỉ ra",
            "Mở đúng dòng được nêu trong bảng"
          ]
        ],
        "oneLiner": "Hỏi cụ thể buộc công cụ nhìn từng dòng; hỏi chung để nó nói cho xuôi."
      },
      {
        "type": "heading",
        "text": "Ba cách hỏi cùng một bảng"
      },
      {
        "type": "list",
        "items": [
          "Cách 1 - Tóm tắt chung: 'Tóm tắt bảng này thành ba câu.' Ra câu văn mượt, ít khi nêu lỗi.",
          "Cách 2 - Câu hỏi gợi sẵn: 'Doanh thu có ổn không?' Nghiêng về trả lời 'ổn'.",
          "Cách 3 - Yêu cầu cụ thể: 'Liệt kê dòng có giá trị bất thường, nêu số dòng và lý do.' Có chỗ để bạn kiểm."
        ]
      },
      {
        "type": "paragraph",
        "text": "Cách 3 không bảo đảm bắt hết lỗi; công cụ vẫn có thể bỏ sót. Nhưng nó cho bạn số dòng để mở bảng ra đối chiếu, và khi hai cách hỏi cho hai kết luận khác nhau thì đó là chỗ cần soát."
      },
      {
        "type": "chart",
        "title": "Bảng càng lớn, số dòng lỗi có thể bị bỏ sót càng nhiều",
        "caption": "Số liệu minh hoạ: giả sử công cụ bỏ sót một tỷ lệ dòng lỗi. Kéo thanh trượt để thấy số dòng bỏ sót khi bảng lớn dần; tỷ lệ 2% không hề nhỏ với bảng nghìn dòng.",
        "kind": "line",
        "xLabel": "Số dòng dữ liệu",
        "yLabel": "Số dòng lỗi có thể bị bỏ sót",
        "x": {
          "from": 100,
          "to": 1000,
          "step": 100
        },
        "params": [
          {
            "id": "miss",
            "label": "Tỷ lệ dòng lỗi bị bỏ sót",
            "min": 0,
            "max": 10,
            "step": 0.5,
            "value": 2,
            "unit": "%"
          }
        ],
        "series": [
          {
            "label": "Số dòng lỗi bị bỏ sót",
            "expr": "x * miss / 100"
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Hỏi để soát",
          "text": "Liệt kê dòng bất thường, nêu số dòng, giá trị và lý do. Tính tổng bằng công thức bảng tính rồi so với con số công cụ nêu."
        },
        "right": {
          "label": "Hỏi để nghe xuôi",
          "text": "Tóm tắt giúp tôi, doanh thu có ổn không, viết nhận xét tích cực. Câu trả lời trôi chảy nhưng khó biết đã nhìn những dòng nào."
        }
      },
      {
        "type": "flow",
        "title": "So sánh ba cách hỏi",
        "steps": [
          {
            "label": "Chuẩn bị bảng",
            "detail": "Chọn một bảng bạn hiểu rõ, biết chắc số nào đúng, ví dụ đã tự soát một lần."
          },
          {
            "label": "Hỏi cách 1 và 2",
            "detail": "Hỏi tóm tắt chung và câu hỏi 'có ổn không' trong hai lượt riêng, ghi lại từng câu trả lời."
          },
          {
            "label": "Hỏi cách 3",
            "detail": "Yêu cầu liệt kê dòng bất thường, số dòng và lý do; đây là lượt có chỗ để bạn kiểm."
          },
          {
            "label": "So sánh",
            "detail": "Xem lượt nào nêu được dòng lệch, lượt nào cho kết luận mâu thuẫn."
          },
          {
            "label": "Kiểm bằng bảng tính",
            "detail": "Mở đúng dòng được nêu và tính lại tổng bằng công thức trước khi dùng."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Soát nhận xét về bảng doanh thu",
        "task": "Bảng thật ghi doanh thu quý 3 của bốn chi nhánh: 120, 135, 128 và 1.310 triệu (dòng cuối đã gõ thừa số 0, đúng ra là 131). Công cụ nhận xét như dưới. Bấm những câu sai hoặc bịa.",
        "segments": [
          {
            "text": "Ba chi nhánh đầu có doanh thu khá đồng đều, quanh mức 120 đến 135 triệu."
          },
          {
            "text": "Chi nhánh thứ tư đạt 1.310 triệu, tăng trưởng vượt bậc so với các chi nhánh khác.",
            "error": "1.310 triệu lệch mười lần so với ba chi nhánh kia, khả năng cao là gõ thừa một số 0. Công cụ coi đó là tăng trưởng thay vì báo dòng bất thường."
          },
          {
            "text": "Tổng doanh thu quý 3 là 1.693 triệu, tính cả dòng thứ tư."
          },
          {
            "text": "Tình hình chung rất tốt, không có dòng nào cần lưu ý.",
            "error": "Câu này bỏ qua dòng bất thường vừa nêu ngay phía trên và kết luận thay bạn."
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Báo cáo doanh thu gửi sếp lúc 4 giờ chiều",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn có bảng 200 dòng và cần gửi nhận xét cho sếp. Công cụ vừa trả lời câu 'có ổn không?': 'Nhìn chung ổn'.",
            "choices": [
              {
                "label": "Gửi nhận xét 'nhìn chung ổn' cho sếp luôn",
                "next": "bad"
              },
              {
                "label": "Hỏi thêm: liệt kê dòng bất thường, nêu số dòng và lý do",
                "next": "s2"
              }
            ]
          },
          "bad": {
            "text": "Tuần sau kế toán phát hiện một dòng gõ thừa số 0 làm tổng lệch hàng trăm triệu. Nhận xét bạn gửi sếp đã sai từ đầu.",
            "ending": "bad"
          },
          "s2": {
            "text": "Công cụ nêu dòng 87 có giá trị gấp mười lần các dòng khác.",
            "choices": [
              {
                "label": "Mở dòng 87, sửa nếu đúng là gõ nhầm, rồi tính lại tổng bằng công thức",
                "next": "good"
              },
              {
                "label": "Xoá dòng 87 khỏi bảng cho khỏi lệch",
                "next": "bad2"
              }
            ]
          },
          "good": {
            "text": "Bạn sửa dòng 87 và tổng khớp với sổ. Nhận xét gửi sếp dựa trên số đã kiểm.",
            "ending": "good"
          },
          "bad2": {
            "text": "Bảng thiếu một chi nhánh, tổng thấp hơn thực tế, và sếp nhận một báo cáo thiếu.",
            "ending": "bad"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Hỏi cụ thể để công cụ nhìn từng dòng; tính tổng bằng bảng tính.",
          "Bài sau: dựng bộ tài liệu cho một khách hàng và kiểm xem trả lời có bám tài liệu."
        ]
      }
    ]
  },
  {
    "track": "personal",
    "isFundamental": false,
    "correctOption": 0,
    "id": 2254,
    "slug": "du-an-nho-bo-tai-lieu-mot-khach-hang",
    "title": "Chặng 42, Bài 15: Dự án nhỏ - dựng bộ tài liệu cho một khách hàng",
    "subtitle": "Ba tài liệu, ba câu hỏi, và một bước kiểm: câu trả lời có bám tài liệu không.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "🧩",
    "whyItMatters": "Đây là bài gộp lại những gì bạn đã học ở phần này: đính kèm tệp, nguồn, chỗ dùng chung, cách hỏi. Bạn dựng một bộ tài liệu nhỏ cho một khách hàng thật và biết chắc câu trả lời của công cụ có bám tài liệu hay không, thay vì tin theo cảm giác.",
    "openingQuestion": "Bạn đã gom 3 tài liệu của khách hàng vào một chỗ và chuẩn bị đặt câu hỏi thử. Câu hỏi nào cho biết công cụ có bám tài liệu?",
    "openingOptions": [
      "Một câu mà đáp án nằm rõ trong tài liệu và một câu mà đáp án không hề có",
      "Ba câu hỏi chung chung để xem công cụ trả lời trôi chảy tới đâu",
      "Một câu hỏi rất dài, chứa mọi chi tiết bạn nhớ về khách hàng này",
      "Cùng một câu hỏi lặp lại ba lần để xem có ra ba đáp án giống nhau"
    ],
    "explanation": "Một câu có đáp án trong tài liệu cho biết công cụ có tìm đúng chỗ không. Một câu mà tài liệu không có cho biết nó có nói chưa có thông tin hay tự bịa. Hai loại câu này cùng nhau kiểm được hành vi bám tài liệu. Câu chung chung chỉ cho thấy nó viết trôi, câu dài chứa mọi chi tiết làm bạn khó tách nguồn của thông tin, và lặp một câu ba lần chỉ kiểm được tính nhất quán chứ không kiểm được tính đúng.",
    "diagram": [
      {
        "label": "Chọn 3 tài liệu của khách",
        "arrow": true
      },
      {
        "label": "Gom vào một chỗ và dặn một lần",
        "arrow": true
      },
      {
        "label": "Đặt 3 câu hỏi có chủ ý",
        "arrow": true
      },
      {
        "label": "Đối chiếu từng câu với tài liệu",
        "arrow": true
      },
      {
        "label": "Ghi lại chỗ bám và chỗ bịa"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Một bạn quản lý tài khoản của một công ty in ấn gom hợp đồng, bảng giá và một email thoả thuận vào một chỗ. Câu hỏi đầu (hạn thanh toán) có đáp án trong hợp đồng và công cụ trả lời đúng, nêu tên tài liệu. Câu thứ ba (chính sách hoàn tiền) không có trong tài liệu, và công cụ trả lời chưa có thông tin. Khi lời dặn chưa có câu 'thiếu thì nói chưa có', cùng câu hỏi đó nhận về một chính sách tự nghĩ ra. Đây là tình huống minh hoạ."
    },
    "quiz": [
      {
        "question": "Bạn chọn 3 tài liệu cho bộ của khách A. Bộ nào hợp lý nhất?",
        "options": [
          "Hợp đồng đang hiệu lực, bảng giá mới nhất và email chốt điều khoản gần nhất",
          "Mọi tệp bạn từng gửi cho khách trong hai năm, kể cả bản nháp cũ",
          "Ba bản của cùng một hợp đồng ở các giai đoạn sửa đổi khác nhau",
          "Hợp đồng, cộng ảnh chụp màn hình các cuộc trò chuyện cá nhân"
        ],
        "correct": 0,
        "explanation": "Cần bản đang hiệu lực và mới nhất. Mọi tệp cũ và các bản nháp mâu thuẫn nhau làm câu trả lời lúc theo bản này, lúc theo bản kia. Ba bản cùng hợp đồng cũng mâu thuẫn như vậy, còn trò chuyện cá nhân không phải tài liệu chính thức."
      },
      {
        "question": "Công cụ trả lời đúng câu đầu nhưng với câu mà tài liệu không có, nó vẫn đưa ra một đáp án. Kết luận?",
        "options": [
          "Lời dặn cần thêm ý thiếu thông tin thì nói chưa có",
          "Công cụ hoạt động tốt, vì nó trả lời đủ mọi câu bạn hỏi",
          "Tài liệu quá ít nên cần bỏ thêm bản cũ vào cho đủ ý",
          "Câu hỏi quá dễ nên công cụ khỏi cần tài liệu"
        ],
        "correct": 0,
        "explanation": "Nó bịa đáp án cho câu tài liệu không có nghĩa là lời dặn thiếu điều kiện dừng. Trả lời đủ mọi câu không phải dấu hiệu tốt ở đây. Thêm bản cũ chỉ tạo mâu thuẫn, và độ dễ của câu hỏi không liên quan."
      },
      {
        "question": "Cách nào kiểm nhanh nhất câu trả lời có đến từ tài liệu?",
        "options": [
          "Yêu cầu nêu tên tài liệu và mục, rồi mở đúng mục đó",
          "Hỏi lại công cụ rằng nó có chắc chắn về câu vừa trả lời không",
          "Đọc lại câu trả lời xem nghe có hợp lý và mượt mà không",
          "Nhờ một công cụ AI khác đọc lại và cho điểm câu trả lời"
        ],
        "correct": 0,
        "explanation": "Tên tài liệu và mục cho bạn chỗ để mở ra so, và đó là bằng chứng thật. Hỏi 'có chắc không' và 'nghe hợp lý' đều dựa trên cảm giác, còn một công cụ khác chấm điểm có thể lặp lại cùng lỗi."
      },
      {
        "question": "Bạn đặt 3 câu hỏi và công cụ trả lời đúng 2 câu, còn 1 câu bịa. Tỷ lệ bám tài liệu là bao nhiêu?",
        "options": [
          "Khoảng 67% (2 ÷ 3), và câu bịa cần sửa lời dặn",
          "Khoảng 33% (1 ÷ 3), vì chỉ tính câu bị bịa",
          "Khoảng 50% (1 ÷ 2), vì chỉ tính hai câu đầu",
          "100%, vì công cụ đã trả lời cả ba câu hỏi bạn đặt"
        ],
        "correct": 0,
        "explanation": "2 câu đúng trên 3 câu là khoảng 67%. Đáp án 33% chỉ đếm câu bịa, đáp án 50% bỏ mất một câu và 100% coi việc có trả lời là đúng. Điều quan trọng hơn con số: câu bịa cho biết lời dặn cần sửa."
      },
      {
        "question": "Sau khi sửa lời dặn, bạn nên làm gì để biết sửa có hiệu quả?",
        "options": [
          "Hỏi lại đúng câu đã bịa và một câu mới, rồi đối chiếu với tài liệu",
          "Chỉ hỏi những câu đã trả lời đúng để chắc là không có gì hỏng",
          "Dùng luôn cho khách vì bản dặn mới chắc chắn tốt hơn bản dặn cũ rồi",
          "Xoá cuộc trò chuyện cũ để công cụ quên các lần trả lời trước"
        ],
        "correct": 0,
        "explanation": "Hỏi lại đúng câu đã bịa cho biết lỗi đã hết chưa, và một câu mới cho biết sửa có làm hỏng điều khác không. Chỉ hỏi câu đã đúng không thử được chỗ sửa, dùng luôn cho khách là bỏ qua kiểm tra, còn xoá cuộc trò chuyện không thay đổi lời dặn."
      }
    ],
    "keyTakeaways": [
      "Chọn ít tài liệu nhưng đúng: bản hiệu lực, mới nhất.",
      "Đặt câu có đáp án trong tài liệu và câu không có để kiểm hành vi.",
      "Lời dặn phải nói rõ: thiếu thông tin thì nói chưa có.",
      "Yêu cầu nêu tên tài liệu và mục để đối chiếu.",
      "Sửa lời dặn rồi hỏi lại đúng câu đã lỗi."
    ],
    "practicePrompt": {
      "question": "Công cụ trả lời câu về hạn thanh toán bằng 45 ngày, nhưng hợp đồng ghi 30 ngày. Bước đầu tiên hợp lý là gì?",
      "options": [
        "Yêu cầu nó chỉ ra tên tài liệu và mục chứa con số 45 ngày",
        "Dùng 45 ngày vì công cụ đã đọc cả bộ tài liệu của khách, nên không cần kiểm",
        "Đổi hợp đồng thành 45 ngày cho khớp với câu trả lời",
        "Hỏi lại tới khi nó trả lời 30 ngày rồi dùng luôn"
      ],
      "correct": 0,
      "explanation": "Yêu cầu nêu nguồn của con số cho bạn biết nó lấy từ đâu, và thường lộ ra rằng nó không có nguồn. Tin công cụ hay đổi hợp đồng theo nó là đảo ngược thứ tự tin cậy. Hỏi tới khi ra số mong muốn là chọn câu trả lời theo ý mình mà chưa hiểu vì sao lỗi."
    },
    "summary": {
      "keyIdea": "Bộ tài liệu tốt cộng câu hỏi có chủ ý cho bạn biết công cụ có bám tài liệu hay không.",
      "formula": "3 tài liệu đúng + lời dặn có điều kiện dừng + 1 câu có đáp án + 1 câu không có = phép thử bám tài liệu.",
      "commonMistake": "Chỉ hỏi những câu dễ rồi kết luận công cụ đáng tin.",
      "action": "Dựng bộ 3 tài liệu cho một khách hàng thật và ghi kết quả 3 câu hỏi."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn một khách hàng thật. Kiểm tra công ty cho phép dùng công cụ nào, gom 3 tài liệu (hợp đồng hoặc thoả thuận, bảng giá, một email quan trọng), viết lời dặn 3 dòng có câu 'thiếu thông tin thì nói chưa có'. Đặt 3 câu hỏi: một có đáp án trong tài liệu, một cần tìm hai chỗ, một mà tài liệu không có. Ghi lại câu nào bám, câu nào bịa.",
      "secondary": "Ngày mai bạn sẽ được hỏi kết quả 3 câu đó."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bạn đã biết công cụ đọc tệp thế nào, cách kiểm nguồn, cách gom tài liệu và cách hỏi. Bài này gộp lại thành một dự án nhỏ, dựng bộ tài liệu cho một khách hàng và kiểm xem trả lời có bám tài liệu không."
      },
      {
        "type": "feynman",
        "title": "Dựng bộ tài liệu đơn giản hơn bạn nghĩ",
        "intro": "Hình dung bạn giao hồ sơ một khách hàng cho đồng nghiệp mới rồi thử họ bằng ba câu hỏi: hai câu có đáp án trong hồ sơ, một câu thì không. Nếu họ trả lời cả ba, bạn biết họ đang đoán.",
        "columns": [
          "Thành phần",
          "Đồng nghiệp mới",
          "Công cụ AI"
        ],
        "rows": [
          [
            "Hồ sơ",
            "Ba tài liệu đúng của khách",
            "Ba tài liệu gom vào một chỗ"
          ],
          [
            "Lời dặn",
            "Chỉ trả lời điều có trong hồ sơ",
            "Chỉ dựa trên tài liệu, thiếu thì nói chưa có"
          ],
          [
            "Phép thử",
            "Hai câu có đáp án, một câu không",
            "Câu có đáp án, câu cần hai chỗ, câu không có"
          ],
          [
            "Kết quả tốt",
            "Nói 'trong hồ sơ chưa có' với câu thứ ba",
            "Nêu tên tài liệu và nói chưa có thông tin"
          ]
        ],
        "oneLiner": "Đáng tin nhất là người nói 'chưa có' đúng chỗ, không phải người trả lời mọi câu."
      },
      {
        "type": "heading",
        "text": "Bước 1: chọn ba tài liệu"
      },
      {
        "type": "list",
        "items": [
          "Hợp đồng hoặc thoả thuận đang hiệu lực.",
          "Bảng giá hoặc phụ lục mới nhất.",
          "Một email hay biên bản ghi điều khoản gần đây nhất.",
          "Kiểm tra công ty cho phép dùng công cụ nào với loại tài liệu này, và bỏ thông tin nhạy cảm không cần thiết."
        ]
      },
      {
        "type": "heading",
        "text": "Bước 2: gom và dặn"
      },
      {
        "type": "paragraph",
        "text": "Đưa ba tài liệu vào một chỗ dùng chung của công cụ (tên gọi và cách làm khác nhau tuỳ công cụ, hãy xem hướng dẫn của công cụ bạn dùng). Viết lời dặn ngắn: chỉ dựa trên tài liệu, nêu tên tài liệu và mục đã dùng, và nếu không có thì nói chưa có thông tin."
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Lắp lời dặn cho bộ tài liệu khách Lan",
        "task": "Bạn đã gom hợp đồng, bảng giá và một email của khách Lan. Chọn từng phần để dựng lời dặn.",
        "parts": [
          {
            "id": "source",
            "label": "Nguồn",
            "options": [
              {
                "text": "Chỉ dựa trên ba tài liệu đã gom; không có thì nói chưa có thông tin.",
                "good": true,
                "feedback": "Có điều kiện dừng nên câu ngoài tài liệu được trả lời 'chưa có' thay vì bịa."
              },
              {
                "text": "Dựa trên tài liệu và kinh nghiệm chung về loại hợp đồng này.",
                "feedback": "Kinh nghiệm chung là chỗ công cụ thêm điều khoản không có trong tài liệu của Lan."
              }
            ]
          },
          {
            "id": "cite",
            "label": "Dẫn nguồn",
            "options": [
              {
                "text": "Sau mỗi câu trả lời, ghi tên tài liệu và mục đã dùng.",
                "good": true,
                "feedback": "Bạn mở đúng mục để kiểm trong vài giây."
              },
              {
                "text": "Trả lời gọn, không cần nhắc tài liệu để dễ đọc.",
                "feedback": "Không có dấu vết nguồn, bạn phải đọc lại cả bộ để biết câu trả lời đúng hay không."
              }
            ]
          },
          {
            "id": "length",
            "label": "Độ dài",
            "options": [
              {
                "text": "Dưới 80 chữ, xưng anh chị, một ý một dòng.",
                "good": true,
                "feedback": "Đo được, nên các câu trả lời ngắn và đồng nhất."
              },
              {
                "text": "Trả lời đầy đủ nhất có thể.",
                "feedback": "Đầy đủ nhất là chỗ công cụ kéo dài và thêm chi tiết ngoài tài liệu."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "source",
              "cite",
              "length"
            ],
            "text": "Anh chị Lan, hạn thanh toán là 30 ngày kể từ ngày nhận hoá đơn. (Hợp đồng, mục Thanh toán.) Về hoàn tiền, tài liệu chưa có thông tin."
          },
          {
            "requires": [
              "source"
            ],
            "text": "Hạn thanh toán là 30 ngày; về hoàn tiền tài liệu chưa nêu rõ. (Không có tên tài liệu và mục nên bạn phải tự tìm để kiểm.)"
          },
          {
            "text": "Thông thường khách sẽ được hoàn tiền trong 7 ngày nếu không hài lòng, và hạn thanh toán là 45 ngày... (Cả hai điều này không có trong tài liệu; công cụ tự thêm từ kinh nghiệm chung.)"
          }
        ]
      },
      {
        "type": "heading",
        "text": "Bước 3: ba câu hỏi có chủ ý"
      },
      {
        "type": "comparison",
        "left": {
          "label": "Câu hỏi để kiểm bám tài liệu",
          "text": "Một câu có đáp án rõ trong tài liệu (hạn thanh toán). Một câu cần ghép hai chỗ (giá cộng phụ phí). Một câu tài liệu không có (chính sách hoàn tiền)."
        },
        "right": {
          "label": "Câu hỏi chỉ thử được độ trôi",
          "text": "Ba câu chung chung như 'khách này thế nào', 'điều khoản có tốt không'. Công cụ trả lời xuôi nhưng bạn không biết nó bám hay bịa."
        }
      },
      {
        "type": "flow",
        "title": "Kiểm bộ tài liệu bằng ba câu hỏi",
        "steps": [
          {
            "label": "Câu 1: có trong tài liệu",
            "detail": "Hỏi một điều nằm rõ trong hợp đồng, ví dụ hạn thanh toán. Mở đúng mục để đối chiếu."
          },
          {
            "label": "Câu 2: ghép hai chỗ",
            "detail": "Hỏi điều cần lấy từ hai tài liệu, ví dụ giá trong bảng giá cộng phụ phí trong hợp đồng."
          },
          {
            "label": "Câu 3: không có",
            "detail": "Hỏi điều tài liệu không có. Câu trả lời đúng là nói chưa có thông tin."
          },
          {
            "label": "Ghi kết quả",
            "detail": "Đánh dấu câu nào bám, câu nào bịa và bịa ở đâu."
          },
          {
            "label": "Sửa và hỏi lại",
            "detail": "Sửa lời dặn cho câu bịa, hỏi lại đúng câu đó và một câu mới."
          }
        ]
      },
      {
        "type": "callout",
        "label": "Bộ tài liệu là dữ liệu của khách",
        "text": "Trước khi tải lên, hỏi quản lý hoặc bộ phận IT. Nếu tài liệu có điều khoản pháp lý, đừng dựa vào câu trả lời của công cụ để quyết định; hỏi bộ phận pháp chế."
      },
      {
        "type": "scenario",
        "title": "Thử bộ tài liệu của khách Lan",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn đã gom 3 tài liệu và viết lời dặn. Câu 3 (chính sách hoàn tiền, tài liệu không có) nhận về: 'Khách được hoàn tiền trong 7 ngày'.",
            "choices": [
              {
                "label": "Bỏ qua vì câu trả lời nghe hợp lý, đưa bộ này vào dùng",
                "next": "bad"
              },
              {
                "label": "Thêm vào lời dặn: thiếu thông tin thì nói chưa có, rồi hỏi lại câu 3",
                "next": "s2"
              }
            ]
          },
          "bad": {
            "text": "Một tuần sau công cụ nói với đồng nghiệp rằng khách được hoàn tiền trong 7 ngày. Khách yêu cầu hoàn tiền theo đúng lời đó, và bạn phải giải thích vì sao hợp đồng không có điều khoản này.",
            "ending": "bad"
          },
          "s2": {
            "text": "Lần này công cụ trả lời: 'Tài liệu chưa có thông tin về hoàn tiền.' Bạn còn hai câu chưa kiểm.",
            "choices": [
              {
                "label": "Đối chiếu câu 1 và câu 2 với hợp đồng và bảng giá rồi mới dùng",
                "next": "good"
              },
              {
                "label": "Tin cả hai câu còn lại vì câu 3 đã sửa xong",
                "next": "bad2"
              }
            ]
          },
          "good": {
            "text": "Cả hai câu đều khớp tài liệu. Bạn ghi lại kết quả và dùng bộ này, biết rõ nó sẽ nói chưa có khi thiếu.",
            "ending": "good"
          },
          "bad2": {
            "text": "Câu 2 cộng nhầm phụ phí và bạn gửi báo giá sai cho khách. Sửa lời dặn ở một chỗ không bảo đảm các chỗ khác đúng.",
            "ending": "bad"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Bộ tài liệu tốt cộng câu hỏi có chủ ý cho bạn biết công cụ có bám tài liệu.",
          "Chặng sau: chọn công cụ cho bản thân và cho cả nhóm."
        ]
      }
    ]
  }
];
