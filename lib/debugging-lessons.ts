import type { Lesson } from "./lesson-types";

// Chặng 41 "Gỡ lỗi có phương pháp" (ids 1940-1945, professional track).
//
// Mọi chặng trước dạy cách viết mã và cách kiểm nó; chặng này dạy việc chiếm phần
// lớn thời gian thật của nghề: tìm ra vì sao nó sai. Trọng tâm là phương pháp
// (tái hiện, thu hẹp, giả thuyết kiểm được) chứ không phải công cụ của một ngôn
// ngữ cụ thể. Bài tập mô phỏng các kỹ thuật - chia đôi đầu vào, bisect, đọc
// stack trace, lần theo mã yêu cầu, tranh chấp bất đồng bộ - bằng JavaScript.

export const DEBUGGING_LESSONS: Lesson[] = [
  {
    "id": 1940,
    "slug": "tai-hien-thu-hep-gia-thuyet",
    "title": "Gỡ lỗi, Bài 1: Tái hiện, thu hẹp, giả thuyết",
    "subtitle": "Đoán và sửa thử là cách chậm nhất để tìm một lỗi - dù cảm giác là nhanh nhất.",
    "duration": "11 phút",
    "difficulty": "Trung bình",
    "emoji": "🔍",
    "track": "professional",
    "whyItMatters": "Người mới gỡ lỗi bằng cách nhìn mã, đoán chỗ sai, sửa, chạy lại, và lặp lại tới khi hết lỗi hoặc hết kiên nhẫn. Cách đó hiệu quả với lỗi dễ và vô vọng với lỗi khó. Người có kinh nghiệm không đoán giỏi hơn - họ có một quy trình khiến mỗi bước loại được một nửa khả năng, nên lỗi khó cũng chỉ tốn thêm vài bước.",
    "openingQuestion": "Người dùng báo \"đôi khi xuất hoá đơn bị lỗi\". Việc đầu tiên nên làm là gì?",
    "openingOptions": [
      "Đọc lại mã xuất hoá đơn để tìm chỗ nào trông có vẻ đáng ngờ nhất",
      "Tìm cách tái hiện lỗi một cách chắc chắn",
      "Thêm khối bắt lỗi quanh hàm xuất hoá đơn để người dùng không thấy lỗi",
      "Nâng cấp thư viện xuất PDF lên phiên bản mới nhất rồi hỏi lại người dùng"
    ],
    "correctOption": 1,
    "explanation": "Chưa tái hiện được thì mọi bản sửa đều là đoán, và bạn không có cách nào biết mình đã sửa đúng hay chỉ là lỗi tạm thời không xuất hiện. Tái hiện nghĩa là tìm đúng đầu vào và điều kiện - hoá đơn nào, người dùng nào, lúc nào - làm lỗi xảy ra mỗi lần. Từ đó mới thu hẹp được. Bọc khối bắt lỗi chỉ giấu triệu chứng, còn nâng thư viện là đổi một biến chưa biết lấy một biến chưa biết khác.",
    "diagram": [
      {
        "label": "Tái hiện: một cách chắc chắn làm lỗi xảy ra",
        "arrow": true
      },
      {
        "label": "Thu hẹp: chia đôi đầu vào, mã, hoặc thời gian",
        "arrow": true
      },
      {
        "label": "Giả thuyết kiểm được: nếu đúng thì X sẽ xảy ra",
        "arrow": true
      },
      {
        "label": "Sửa, rồi viết kiểm thử khoá lỗi lại"
      }
    ],
    "realWorldExample": {
      "company": "Một đội làm phần mềm kế toán (tình huống minh hoạ)",
      "description": "Hai ngày đoán và sửa thử không tìm ra vì sao \"đôi khi\" hoá đơn bị lệch tiền. Buổi sáng thứ ba, một người xuất lại toàn bộ hoá đơn tháng trước và so với bản lưu: đúng 14 hoá đơn lệch, và cả 14 đều có một dòng giảm giá theo phần trăm lẻ. Tái hiện được rồi thì tìm ra lỗi làm tròn chỉ mất hai mươi phút."
    },
    "quiz": [
      {
        "question": "Vì sao chia đôi (bisection) mạnh hơn kiểm tra từng chỗ nghi ngờ?",
        "options": [
          "Mỗi bước loại được một nửa số khả năng còn lại",
          "Vì nó luôn bắt đầu từ đoạn mã được viết gần đây nhất trong dự án",
          "Vì nó không cần chạy lại chương trình",
          "Vì máy tính xử lý phép chia cho hai nhanh hơn các phép chia khác"
        ],
        "correct": 0,
        "explanation": "Một nghìn khả năng thì kiểm từng cái mất tới một nghìn bước, còn chia đôi chỉ mất khoảng mười (2^10 = 1024). Chia đôi áp được cho nhiều thứ: đầu vào (nửa bộ dữ liệu nào gây lỗi), mã (tắt nửa tính năng), lịch sử (commit nào, Bài 3), thời gian (lỗi bắt đầu từ lúc nào)."
      },
      {
        "question": "Một giả thuyết gỡ lỗi \"tốt\" có đặc điểm gì?",
        "options": [
          "Nó giải thích được mọi triệu chứng mà người dùng đã báo cáo",
          "Nó được đề xuất bởi người có nhiều kinh nghiệm nhất với phần mã này trong đội",
          "Nó dự đoán được một điều kiểm tra được, và sai thì loại được hẳn",
          "Nó liên quan tới đoạn mã phức tạp nhất trong phần bị báo lỗi"
        ],
        "correct": 2,
        "explanation": "\"Có thể do bộ nhớ đệm\" không kiểm được. \"Nếu do bộ nhớ đệm thì tắt nó đi lỗi sẽ biến mất\" thì kiểm được trong một phút, và dù đúng hay sai bạn đều biết thêm một điều chắc chắn. Giải thích được mọi thứ chưa đủ: một giả thuyết mơ hồ giải thích được mọi thứ vì nó không dự đoán gì cả."
      },
      {
        "question": "Bạn sửa một dòng và lỗi biến mất. Việc gì còn thiếu trước khi coi là xong?",
        "options": [
          "Không thiếu gì, lỗi đã biến mất nghĩa là đã được sửa",
          "Chạy lại toàn bộ ứng dụng thêm vài lần để chắc lỗi không quay lại",
          "Hỏi lại người báo lỗi xem họ còn gặp lại lỗi đó trên máy của mình nữa hay không",
          "Giải thích được vì sao dòng đó gây lỗi, và viết kiểm thử khoá nó lại"
        ],
        "correct": 3,
        "explanation": "Lỗi biến mất sau một thay đổi có thể là trùng hợp - nhất là với lỗi \"đôi khi\". Nếu không giải thích được cơ chế, bạn có thể chỉ đổi thời gian chạy khiến lỗi tạm ẩn. Kiểm thử tái hiện lỗi, đỏ trước khi sửa và xanh sau khi sửa, là bằng chứng và cũng là rào chắn cho lần sau."
      },
      {
        "question": "\"Vịt cao su\" (rubber duck debugging) giúp gì?",
        "options": [
          "Buộc bạn nói rõ từng bước, và chỗ giả định sai thường lộ ra khi nói",
          "Giúp giảm căng thẳng để bạn tập trung vào mã tốt hơn khi bị kẹt lâu",
          "Là tên một công cụ gỡ lỗi tự động phổ biến trong nhiều ngôn ngữ",
          "Cho phép một người khác nhìn vào mã và chỉ ra lỗi thay cho bạn"
        ],
        "correct": 0,
        "explanation": "Khi đọc mã trong đầu, bạn đọc thứ mình nghĩ mã làm. Khi giải thích từng dòng thành lời cho người khác - hay một con vịt - bạn buộc phải nói thứ mã thật sự làm, và khoảng cách giữa hai điều đó thường chính là lỗi. Không cần ai trả lời."
      },
      {
        "question": "Đang gỡ lỗi mà sửa ba thứ cùng lúc thì có vấn đề gì?",
        "options": [
          "Không vấn đề gì, sửa nhiều thứ cùng lúc giúp tiết kiệm thời gian chạy lại",
          "Vì trình biên dịch không cho phép sửa quá một tệp giữa hai lần chạy",
          "Nếu lỗi hết, bạn không biết thứ nào đã sửa nó, và hai thứ kia có thể gây lỗi mới",
          "Vì hệ thống quản lý phiên bản sẽ từ chối một commit có quá nhiều thay đổi"
        ],
        "correct": 2,
        "explanation": "Mỗi lần chỉ đổi một biến là nguyên tắc của thí nghiệm. Đổi ba thứ thì kết quả không cho bạn biết gì về từng thứ, và hai thay đổi \"thừa\" ở lại trong mã mà không ai biết chúng có cần không - hoặc chúng có làm hỏng gì khác không."
      }
    ],
    "keyTakeaways": [
      "Tái hiện trước; chưa tái hiện được thì mọi bản sửa là đoán.",
      "Chia đôi: mỗi bước loại một nửa khả năng.",
      "Giả thuyết tốt dự đoán một điều kiểm được, và sai thì loại được.",
      "Mỗi lần đổi một thứ.",
      "Xong khi giải thích được cơ chế và có kiểm thử khoá lỗi lại."
    ],
    "practicePrompt": {
      "question": "Nhập tệp CSV 10.000 dòng thì lỗi, 100 dòng đầu thì không. Bước tiếp theo hiệu quả nhất?",
      "options": [
        "Đọc thủ công lần lượt từng dòng từ dòng 101 trở đi cho tới khi thấy dòng lạ",
        "Thử với nửa đầu và nửa sau của tệp, rồi chia tiếp nửa bị lỗi",
        "Tăng giới hạn bộ nhớ của tiến trình nhập lên gấp đôi rồi thử lại",
        "Viết lại toàn bộ bộ phân tích CSV bằng một thư viện khác cho chắc"
      ],
      "correct": 1,
      "explanation": "Chia đôi 10.000 dòng tìm ra dòng gây lỗi trong khoảng 14 lần chạy. Đọc tay có thể mất cả ngày. Tăng bộ nhớ hay đổi thư viện là giả thuyết chưa có bằng chứng - có thể đúng, nhưng chia đôi sẽ cho bạn biết trong vài phút."
    },
    "summary": {
      "keyIdea": "Gỡ lỗi là thu hẹp có hệ thống, không phải đoán giỏi.",
      "formula": "Tái hiện → chia đôi → giả thuyết kiểm được → đổi một thứ → giải thích → kiểm thử khoá lại.",
      "commonMistake": "Sửa thử nhiều chỗ cùng lúc cho tới khi lỗi biến mất, mà không biết vì sao.",
      "action": "Lần tới gặp lỗi, viết ra câu \"nếu giả thuyết này đúng thì...\" trước khi sửa gì."
    },
    "application": {
      "title": "Làm ngay hôm nay",
      "message": "Lấy lỗi gần nhất bạn đã sửa và viết lại ba dòng: bạn tái hiện nó thế nào, giả thuyết nào đúng, và kiểm thử nào giờ khoá nó lại. Nếu không viết được dòng thứ ba, viết kiểm thử đó ngay.",
      "secondary": "Bài sau: đọc thông báo lỗi và stack trace - thứ người mới hay bỏ qua nhất."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Chặng này nói về việc chiếm phần lớn thời gian thật của nghề lập trình: tìm ra vì sao mã sai. Bắt đầu bằng phương pháp, vì công cụ nào cũng vô ích nếu dùng để đoán."
      },
      {
        "type": "feynman",
        "title": "Gỡ lỗi giải thích bằng tìm chỗ rò nước",
        "intro": "Nhà bạn có một chỗ rò trong hệ thống ống nước chạy khắp các tầng.",
        "columns": [
          "Bước",
          "Tìm chỗ rò",
          "Gỡ lỗi"
        ],
        "rows": [
          [
            "Tái hiện",
            "Mở vòi nào thì nước rỉ ra",
            "Đầu vào nào thì lỗi xảy ra"
          ],
          [
            "Chia đôi",
            "Khoá van giữa nhà: còn rỉ thì rò ở nửa trên",
            "Tắt nửa mã hoặc nửa dữ liệu"
          ],
          [
            "Giả thuyết",
            "Nếu rò ở mối nối thì lau khô sẽ thấy giọt mới ở đó",
            "Nếu đúng thì X sẽ xảy ra"
          ],
          [
            "Khoá lại",
            "Thay ống, rồi để giấy dưới đó một tuần",
            "Sửa, rồi viết kiểm thử"
          ]
        ],
        "oneLiner": "Thợ giỏi không đoán giỏi hơn - họ khoá van giữa nhà trước khi đục tường."
      },
      {
        "type": "heading",
        "text": "Bốn bước"
      },
      {
        "type": "list",
        "items": [
          "Tái hiện: tìm đầu vào và điều kiện làm lỗi xảy ra mỗi lần. Nếu chỉ \"đôi khi\", tìm thứ khác nhau giữa lần lỗi và lần không.",
          "Thu hẹp: chia đôi đầu vào, tính năng, lịch sử, hay thời gian - thứ nào dễ chia nhất.",
          "Giả thuyết: viết thành \"nếu ... thì ...\", kiểm nó, và chỉ đổi một thứ mỗi lần.",
          "Khoá lại: giải thích cơ chế, sửa, và viết kiểm thử đỏ-trước-xanh-sau."
        ]
      },
      {
        "type": "callout",
        "label": "Ghi lại khi đang tìm",
        "text": "Với lỗi khó, viết nhật ký gỡ lỗi: đã thử gì, kết quả gì, loại được gì. Nó chặn việc thử lại cùng một thứ lần thứ ba, và khi phải nhờ người khác, bạn đưa được cho họ đúng những gì đã biết."
      },
      {
        "type": "exercise",
        "language": "javascript",
        "title": "Chia đôi để tìm dòng dữ liệu gây lỗi",
        "task": "xuLy(ds) ném lỗi nếu ds chứa ít nhất một dòng hỏng. Viết timDongHong(ds) trả về chỉ số của dòng hỏng DUY NHẤT bằng cách chia đôi (chỉ được gọi xuLy trên các đoạn con, không được tự kiểm tra từng dòng), và in số lần đã gọi xuLy. Mã hiện thử từng dòng một.",
        "starter": "const ds = Array.from({ length: 1000 }, (_, i) => ({ id: i, tien: i === 737 ? \"12,5\" : String(i * 10) }));\nlet soLanChay = 0;\nfunction xuLy(doan) {\n  soLanChay++;\n  for (const d of doan) if (!/^\\d+$/.test(d.tien)) throw new Error(\"Tiền không hợp lệ\");\n}\n\nfunction timDongHong(ds) {\n  for (let i = 0; i < ds.length; i++) {\n    try { xuLy([ds[i]]); } catch { return i; }\n  }\n  return -1;\n}\n\nconst i = timDongHong(ds);\nconsole.log(\"Dòng hỏng: \" + i + \" (tien = \" + ds[i].tien + \")\");\nconsole.log(\"Số lần chạy: \" + soLanChay);",
        "solution": "const ds = Array.from({ length: 1000 }, (_, i) => ({ id: i, tien: i === 737 ? \"12,5\" : String(i * 10) }));\nlet soLanChay = 0;\nfunction xuLy(doan) {\n  soLanChay++;\n  for (const d of doan) if (!/^\\d+$/.test(d.tien)) throw new Error(\"Tiền không hợp lệ\");\n}\n\nconst coLoi = (doan) => { try { xuLy(doan); return false; } catch { return true; } };\n\nfunction timDongHong(ds) {\n  let lo = 0, hi = ds.length;\n  while (hi - lo > 1) {\n    const giua = (lo + hi) >> 1;\n    if (coLoi(ds.slice(lo, giua))) hi = giua;\n    else lo = giua;\n  }\n  return lo;\n}\n\nconst i = timDongHong(ds);\nconsole.log(\"Dòng hỏng: \" + i + \" (tien = \" + ds[i].tien + \")\");\nconsole.log(\"Số lần chạy: \" + soLanChay);",
        "hints": [
          "Giữ một khoảng [lo, hi) chắc chắn chứa dòng hỏng. Chạy xuLy trên nửa đầu: lỗi thì dòng hỏng ở nửa đầu, không lỗi thì ở nửa sau.",
          "Dừng khi khoảng chỉ còn một dòng. Với 1000 dòng, cần khoảng 10 lần chạy."
        ],
        "expectedOutput": "Dòng hỏng: 737 (tien = 12,5)\nSố lần chạy: 10"
      },
      {
        "type": "closing",
        "lines": [
          "Quy trình không làm bạn thông minh hơn; nó làm cho việc bạn không biết chỗ sai ở đâu trở nên vô hại.",
          "Bài sau đọc thứ đầu tiên máy nói với bạn khi có lỗi: stack trace."
        ]
      }
    ]
  },
  {
    "id": 1941,
    "slug": "doc-thong-bao-loi-va-stack-trace",
    "title": "Gỡ lỗi, Bài 2: Đọc thông báo lỗi và stack trace",
    "subtitle": "Máy đã nói cho bạn lỗi ở đâu - chỉ cần biết đọc từ chỗ nào.",
    "duration": "10 phút",
    "difficulty": "Dễ",
    "emoji": "📜",
    "track": "professional",
    "whyItMatters": "Phần lớn thông báo lỗi chứa sẵn câu trả lời hoặc gần như vậy: loại lỗi, thông điệp, và đường đi chính xác của chương trình tới chỗ hỏng. Người mới thấy một khối chữ đỏ dài và chụp màn hình gửi người khác; người có kinh nghiệm đọc hai dòng đúng và biết phải mở tệp nào. Khác biệt là biết bỏ qua phần nào.",
    "openingQuestion": "Stack trace dài 30 dòng, phần lớn trong node_modules. Nên đọc dòng nào trước?",
    "openingOptions": [
      "Dòng cuối cùng, nơi chương trình bắt đầu",
      "Dòng khung đầu tiên nằm trong mã của chính bạn",
      "Dòng nằm giữa, vì lỗi thường xảy ra ở giữa chuỗi các lời gọi hàm",
      "Mọi dòng trong node_modules, vì lỗi thường nằm ở thư viện bên ngoài"
    ],
    "correctOption": 1,
    "explanation": "Đọc dòng thông điệp ở đầu trước (loại lỗi và nội dung), rồi đi xuống tới khung (frame) đầu tiên thuộc mã của bạn. Khung đó là chỗ mã của bạn gọi vào nơi hỏng - thường là chỗ bạn truyền sai thứ gì đó. Lỗi thật sự nằm trong thư viện phổ biến hiếm hơn nhiều so với lỗi do cách gọi thư viện. Dòng cuối thường là điểm khởi đầu của vòng lặp sự kiện hay bộ chạy, ít khi hữu ích.",
    "diagram": [
      {
        "label": "Dòng đầu: loại lỗi và thông điệp",
        "arrow": true
      },
      {
        "label": "Bỏ qua khung của thư viện và của môi trường chạy",
        "arrow": true
      },
      {
        "label": "Khung đầu tiên trong mã của bạn: mở tệp, tới dòng",
        "arrow": true
      },
      {
        "label": "Đọc tiếp các khung bên dưới nếu cần biết ai đã gọi"
      }
    ],
    "realWorldExample": {
      "company": "Kênh hỏi đáp nội bộ của một đội (tình huống minh hoạ)",
      "description": "Đội thống kê một tháng câu hỏi \"lỗi này là sao\": khoảng hai phần ba có câu trả lời nằm ngay trong hai dòng đầu của thông báo lỗi được dán kèm - tên biến chưa định nghĩa, tệp không tồn tại, cổng đã có người dùng. Họ thêm vào hướng dẫn cho người mới một mục ngắn: đọc dòng đầu, rồi tìm khung đầu tiên của mình."
    },
    "quiz": [
      {
        "question": "TypeError: Cannot read properties of undefined (reading 'ten') nói lên điều gì?",
        "options": [
          "Thuộc tính ten có giá trị sai kiểu",
          "Biến chứa ten bị viết sai chính tả ở đâu đó trong tệp hiện tại",
          "Thứ đứng trước .ten là undefined, không phải bản thân ten",
          "Đối tượng có thuộc tính ten nhưng thuộc tính đó được đặt chỉ đọc"
        ],
        "correct": 2,
        "explanation": "Lỗi không nằm ở ten mà ở vật chứa nó: trong nguoiDung.ten, chính nguoiDung là undefined. Câu hỏi tiếp theo là vì sao - hàm trả về undefined khi không tìm thấy, dữ liệu mạng thiếu một tầng, mảng rỗng mà vẫn lấy phần tử [0]. Khung stack chỉ đúng dòng đó."
      },
      {
        "question": "Stack trace của mã đã rút gọn (minified) trên production chỉ ra app.min.js:1:48213. Cần gì để đọc được?",
        "options": [
          "Tệp source map để ánh xạ về tệp và dòng của mã gốc",
          "Tải tệp app.min.js về và định dạng lại cho dễ đọc bằng công cụ",
          "Chạy lại ứng dụng trên máy cá nhân ở chế độ phát triển",
          "Không cần gì, vì cột 48213 đã đủ để tìm ra chỗ lỗi trong mã"
        ],
        "correct": 0,
        "explanation": "Bộ đóng gói ghép mọi tệp thành một dòng dài và đổi tên biến. Source map lưu bản đồ từ vị trí đã rút gọn về tệp và dòng gốc. Công cụ theo dõi lỗi dùng nó để hiện stack trace đọc được - thường source map được tải lên riêng thay vì công khai cùng trang."
      },
      {
        "question": "Với mã bất đồng bộ, stack trace đôi khi chỉ có vài khung và không thấy ai đã gọi. Vì sao?",
        "options": [
          "Vì mã bất đồng bộ không bao giờ tạo ra stack trace đầy đủ nào",
          "Vì trình duyệt cố tình giấu stack trace để bảo vệ mã nguồn",
          "Vì lỗi xảy ra trên một luồng khác, tách hẳn với luồng chính của chương trình đang chạy",
          "Vì hàm gọi lại chạy sau từ hàng đợi, lúc hàm gọi ban đầu đã kết thúc"
        ],
        "correct": 3,
        "explanation": "Khi hàm gọi lại chạy, ngăn xếp gọi chỉ còn vòng lặp sự kiện và chính hàm đó (Bài 229 ở chặng JavaScript). Dùng async/await thay cho chuỗi then giúp môi trường chạy dựng lại được \"async stack trace\" dài hơn; và mã yêu cầu trong log (Bài 4) nối các mảnh lại."
      },
      {
        "question": "Thông báo lỗi là \"ECONNREFUSED 127.0.0.1:5432\". Điều này gợi ý gì trước tiên?",
        "options": [
          "Mật khẩu kết nối cơ sở dữ liệu đã hết hạn và cần được đặt lại",
          "Không có dịch vụ nào đang nghe ở cổng 5432 trên máy đó",
          "Cơ sở dữ liệu đang quá tải nên từ chối nhận thêm kết nối mới",
          "Tường lửa của nhà cung cấp mạng đang chặn toàn bộ cổng 5432"
        ],
        "correct": 1,
        "explanation": "\"Connection refused\" nghĩa là máy đích trả lời ngay rằng không có ai nghe ở cổng đó - cơ sở dữ liệu chưa chạy, chạy ở cổng khác, hoặc (Bài 5 chặng Docker) bạn đang ở trong container và localhost không phải máy có Postgres. Sai mật khẩu cho lỗi xác thực; bị chặn thường là hết thời gian chờ chứ không phải bị từ chối."
      },
      {
        "question": "Tìm kiếm thông báo lỗi trên mạng hiệu quả nhất khi nào?",
        "options": [
          "Khi dán nguyên cả khối stack trace, kể cả đường dẫn trên máy bạn",
          "Khi bỏ đi tên thư viện để kết quả tìm kiếm rộng hơn",
          "Khi dùng phần cố định của thông điệp kèm tên thư viện, bỏ phần riêng của bạn",
          "Khi dịch thông báo lỗi sang tiếng Việt trước khi đem đi tìm"
        ],
        "correct": 2,
        "explanation": "Đường dẫn trên máy bạn, tên biến và giá trị cụ thể làm kết quả tìm kiếm rỗng. Giữ phần thông điệp chung (\"Cannot find module\", mã lỗi như ECONNREFUSED) cùng tên và phiên bản thư viện thì khả năng gặp người đã gặp cùng vấn đề cao hơn nhiều."
      }
    ],
    "keyTakeaways": [
      "Đọc dòng thông điệp trước: loại lỗi và nội dung.",
      "Đi xuống tới khung đầu tiên trong mã của bạn.",
      "\"Cannot read properties of undefined\": thứ đứng trước dấu chấm mới là thứ sai.",
      "Mã rút gọn cần source map; mã bất đồng bộ cần async/await và mã yêu cầu.",
      "Tìm kiếm bằng phần cố định của thông điệp cùng tên thư viện."
    ],
    "practicePrompt": {
      "question": "Lỗi: \"Error: ENOENT: no such file or directory, open './config.json'\". Tệp config.json nằm ngay trong thư mục dự án. Nguyên nhân khả dĩ nhất?",
      "options": [
        "Tệp config.json bị hỏng định dạng nên hệ điều hành không mở được",
        "Chương trình chạy từ một thư mục khác, nên ./ trỏ sai chỗ",
        "Ứng dụng thiếu quyền đọc tệp vì tệp được tạo bởi người dùng khác",
        "Tên tệp có chữ hoa chữ thường khác nhau trên hai hệ điều hành"
      ],
      "correct": 1,
      "explanation": "Đường dẫn tương đối tính từ thư mục làm việc hiện tại của tiến trình, không phải từ thư mục chứa tệp mã. Chạy node src/app.js từ thư mục cha thì ./config.json trỏ sai chỗ. Thiếu quyền cho lỗi EACCES, không phải ENOENT; chữ hoa thường cũng có thể gây ENOENT nhưng hiếm hơn."
    },
    "summary": {
      "keyIdea": "Thông báo lỗi là manh mối tốt nhất bạn có, nếu đọc đúng chỗ.",
      "formula": "Đọc thông điệp → bỏ khung thư viện → khung đầu tiên của bạn → đọc xuống nếu cần biết ai gọi.",
      "commonMistake": "Chụp màn hình khối chữ đỏ gửi người khác mà chưa đọc dòng đầu tiên.",
      "action": "Lần tới gặp stack trace, gạch chân khung đầu tiên thuộc mã của bạn trước khi làm gì khác."
    },
    "application": {
      "title": "Làm ngay hôm nay",
      "message": "Cố ý gây một lỗi trong dự án của bạn - gọi thuộc tính của một biến undefined sâu ba tầng hàm - rồi đọc stack trace: tìm dòng thông điệp, khung đầu tiên của bạn, và các khung gọi tới nó.",
      "secondary": "Bài sau: git bisect - chia đôi lịch sử để tìm commit gây lỗi."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Khi chương trình hỏng, nó để lại một bản tường thuật: hỏng vì sao, và đi qua những hàm nào để tới đó. Bài này dạy đọc bản tường thuật ấy theo đúng thứ tự."
      },
      {
        "type": "code",
        "language": "text",
        "caption": "Một stack trace và cách đọc nó",
        "code": "TypeError: Cannot read properties of undefined (reading 'email')   ← 1. đọc dòng này trước\n    at guiThuXacNhan (/app/src/thong-bao.js:14:32)                  ← 2. khung đầu tiên của bạn\n    at xuLyDonHang (/app/src/don-hang.js:41:5)                      ← 3. ai đã gọi nó\n    at /app/src/routes.js:22:11\n    at Layer.handle (/app/node_modules/express/lib/router/layer.js:95:5)   ← thư viện: bỏ qua\n    at next (/app/node_modules/express/lib/router/route.js:149:13)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)"
      },
      {
        "type": "conceptTable",
        "title": "Những lỗi hay gặp và câu hỏi đầu tiên",
        "concepts": [
          {
            "vi": "Không đọc được thuộc tính của undefined",
            "en": "TypeError",
            "def": "Thứ đứng trước dấu chấm là undefined. Nó lấy từ đâu?"
          },
          {
            "vi": "Không tìm thấy tệp",
            "en": "ENOENT",
            "def": "Đường dẫn tính từ thư mục làm việc nào?"
          },
          {
            "vi": "Bị từ chối kết nối",
            "en": "ECONNREFUSED",
            "def": "Có dịch vụ nào đang nghe ở địa chỉ và cổng đó không?"
          },
          {
            "vi": "Cổng đã có người dùng",
            "en": "EADDRINUSE",
            "def": "Tiến trình nào đang giữ cổng này?"
          },
          {
            "vi": "Không tìm thấy mô-đun",
            "en": "Cannot find module",
            "def": "Đã cài chưa, và đường dẫn nhập có đúng chữ hoa chữ thường?"
          }
        ]
      },
      {
        "type": "exercise",
        "language": "javascript",
        "title": "Tìm khung đầu tiên trong mã của bạn",
        "task": "Viết khungCuaToi(stack) trả về tệp, dòng và tên hàm của khung đầu tiên KHÔNG thuộc node_modules và không thuộc node: (môi trường chạy), cùng dòng thông điệp. Khung có hai dạng: \"at ten (tệp:dòng:cột)\" và \"at tệp:dòng:cột\" (hàm vô danh). Mã hiện lấy khung cuối cùng.",
        "starter": "const stack = `TypeError: Cannot read properties of undefined (reading 'email')\n    at Object.get (/app/node_modules/orm/lib/model.js:210:18)\n    at node:internal/util:430:7\n    at guiThuXacNhan (/app/src/thong-bao.js:14:32)\n    at xuLyDonHang (/app/src/don-hang.js:41:5)\n    at /app/src/routes.js:22:11\n    at Layer.handle (/app/node_modules/express/lib/router/layer.js:95:5)`;\n\nfunction khungCuaToi(stack) {\n  const dong = stack.split(\"\\n\");\n  const cuoi = dong[dong.length - 1].trim();\n  return { thongDiep: dong[0], ham: \"?\", vitri: cuoi };\n}\n\nconst k = khungCuaToi(stack);\nconsole.log(k.thongDiep);\nconsole.log(\"Mở \" + k.vitri + \" trong hàm \" + k.ham);",
        "solution": "const stack = `TypeError: Cannot read properties of undefined (reading 'email')\n    at Object.get (/app/node_modules/orm/lib/model.js:210:18)\n    at node:internal/util:430:7\n    at guiThuXacNhan (/app/src/thong-bao.js:14:32)\n    at xuLyDonHang (/app/src/don-hang.js:41:5)\n    at /app/src/routes.js:22:11\n    at Layer.handle (/app/node_modules/express/lib/router/layer.js:95:5)`;\n\nfunction khungCuaToi(stack) {\n  const dong = stack.split(\"\\n\");\n  for (const d of dong.slice(1)) {\n    const m = d.trim().match(/^at (?:(.+?) \\()?(.+?):(\\d+):\\d+\\)?$/);\n    if (!m) continue;\n    const [, ham, tep, so] = m;\n    if (tep.includes(\"/node_modules/\") || tep.startsWith(\"node:\")) continue;\n    return { thongDiep: dong[0], ham: ham ?? \"(vô danh)\", vitri: tep + \":\" + so };\n  }\n  return null;\n}\n\nconst k = khungCuaToi(stack);\nconsole.log(k.thongDiep);\nconsole.log(\"Mở \" + k.vitri + \" trong hàm \" + k.ham);",
        "hints": [
          "Duyệt các dòng từ dòng thứ hai; bỏ dòng có /node_modules/ hoặc bắt đầu bằng node:.",
          "Một biểu thức chính quy cho cả hai dạng: phần \"tên (\" là tuỳ chọn: /^at (?:(.+?) \\()?(.+?):(\\d+):\\d+\\)?$/."
        ],
        "expectedOutput": "TypeError: Cannot read properties of undefined (reading 'email')\nMở /app/src/thong-bao.js:14 trong hàm guiThuXacNhan"
      },
      {
        "type": "closing",
        "lines": [
          "Dòng đầu nói cái gì hỏng; khung đầu tiên của bạn nói bạn đã làm gì để nó hỏng.",
          "Bài sau tìm lỗi theo thời gian: commit nào đã gây ra nó."
        ]
      }
    ]
  },
  {
    "id": 1942,
    "slug": "git-bisect-tim-commit-gay-loi",
    "title": "Gỡ lỗi, Bài 3: git bisect - tìm commit gây lỗi",
    "subtitle": "Tuần trước còn chạy, hôm nay thì hỏng, ở giữa là 200 commit: chỉ cần 8 lần thử.",
    "duration": "11 phút",
    "difficulty": "Trung bình",
    "emoji": "🪓",
    "track": "professional",
    "whyItMatters": "Lỗi hồi quy - thứ từng chạy nay không chạy - là loại lỗi có một lợi thế lớn: bạn biết một điểm tốt và một điểm xấu trong lịch sử. git bisect chia đôi khoảng đó cho bạn, và nếu kiểm tra được viết thành lệnh, nó tự chạy tới commit gây lỗi. Không cần hiểu mã trước; commit tìm được sẽ chỉ ra chỗ cần đọc.",
    "openingQuestion": "Có 256 commit giữa bản tốt tuần trước và bản hỏng hôm nay. Cần kiểm tra khoảng bao nhiêu commit để tìm ra commit gây lỗi?",
    "openingOptions": [
      "Khoảng 128 (= 256 ÷ 2, trung bình phải xem một nửa số commit)",
      "Khoảng 8 (= log₂ 256, mỗi lần loại một nửa)",
      "Khoảng 16 (= √256, chia thành các khối)",
      "Cả 256 (= kiểm từng commit, vì lỗi có thể nằm ở bất kỳ đâu)"
    ],
    "correctOption": 1,
    "explanation": "Mỗi lần kiểm, bisect chọn commit ở giữa khoảng còn nghi ngờ: tốt thì lỗi nằm ở nửa sau, xấu thì ở nửa đầu. 256 → 128 → 64 → ... → 1 là 8 bước (log₂ 256). Đây chính là tìm kiếm nhị phân của chặng thuật toán, áp lên lịch sử. Với 1.000 commit cũng chỉ khoảng 10 lần.",
    "diagram": [
      {
        "label": "git bisect start, đánh dấu một commit xấu và một commit tốt",
        "arrow": true
      },
      {
        "label": "Git nhảy tới commit ở giữa",
        "arrow": true
      },
      {
        "label": "Bạn (hoặc một lệnh) nói tốt hay xấu",
        "arrow": true
      },
      {
        "label": "Lặp tới khi còn đúng một commit: commit gây lỗi"
      }
    ],
    "realWorldExample": {
      "company": "Một thư viện xử lý ảnh (tình huống minh hoạ)",
      "description": "Ảnh xuất ra bị lệch màu nhẹ, không ai nhớ từ bao giờ. Người bảo trì viết một tập lệnh so ảnh xuất với ảnh mẫu, đưa cho git bisect run và đi pha cà phê. Mười một bước sau, bisect chỉ ra một commit \"dọn dẹp\" đổi thứ tự hai kênh màu - trong một thay đổi mà không ai nghĩ là liên quan."
    },
    "quiz": [
      {
        "question": "git bisect run ./kiem-tra.sh dựa vào đâu để biết commit là tốt hay xấu?",
        "options": [
          "Nội dung tập lệnh in ra ở dòng cuối",
          "Mã thoát của tập lệnh: 0 là tốt, khác 0 là xấu",
          "Thời gian tập lệnh chạy, so với lần chạy ở commit tốt ban đầu",
          "Số tệp mà commit đó thay đổi so với commit liền trước"
        ],
        "correct": 1,
        "explanation": "Cùng quy ước với CI: mã thoát 0 là thành công. Riêng mã 125 có nghĩa \"bỏ qua commit này\" - dùng khi commit đó không dựng được vì một lỗi khác, không liên quan tới lỗi bạn đang tìm."
      },
      {
        "question": "Một commit ở giữa không dựng được vì lỗi khác. Nên làm gì?",
        "options": [
          "Dừng bisect và bắt đầu lại từ một khoảng lịch sử khác",
          "Đánh dấu nó là xấu vì nó đang hỏng",
          "Đánh dấu nó là tốt để bisect tiếp tục đi về phía sau",
          "Dùng git bisect skip để Git chọn một commit lân cận"
        ],
        "correct": 3,
        "explanation": "Đánh dấu xấu có thể khiến bisect kết luận sai rằng commit đó gây ra lỗi bạn đang tìm; đánh dấu tốt thì ngược lại. skip bảo Git chọn một commit lân cận. Nếu nhiều commit liền nhau không dựng được, kết quả có thể là một nhóm commit thay vì một."
      },
      {
        "question": "Vì sao lịch sử gồm các commit nhỏ, mỗi commit dựng được, làm bisect hữu ích hơn nhiều?",
        "options": [
          "Vì bisect chỉ chạy được trên kho có ít hơn một nghìn commit",
          "Vì commit nhỏ giúp Git nén kho mã tốt hơn nên chạy nhanh hơn",
          "Vì commit tìm được nhỏ thì chỉ ra đúng thay đổi gây lỗi",
          "Vì bisect tự động bỏ qua mọi commit lớn hơn một trăm dòng"
        ],
        "correct": 2,
        "explanation": "Bisect trả về một commit. Nếu commit đó sửa hai nghìn dòng ở ba mươi tệp, bạn lại phải gỡ lỗi trong một đống lớn. Commit nhỏ, một ý mỗi commit, và mỗi commit đều dựng được thì kết quả của bisect gần như là câu trả lời."
      },
      {
        "question": "Tập lệnh kiểm tra cho bisect nên có đặc điểm gì?",
        "options": [
          "Nhanh, tất định, và chỉ kiểm đúng lỗi đang tìm",
          "Chạy toàn bộ bộ kiểm thử cho chắc",
          "Hỏi ý kiến người dùng ở mỗi bước để có kết quả chính xác nhất",
          "In ra thật nhiều thông tin để dễ xem lại sau khi bisect xong"
        ],
        "correct": 0,
        "explanation": "Chạy cả bộ kiểm thử thì một kiểm thử khác đang hỏng ở giữa lịch sử sẽ làm bisect đi sai hướng. Kiểm đúng một điều - lỗi bạn đang tìm - và kiểm nhanh, vì nó chạy khoảng log₂(n) lần. Nếu lỗi chập chờn, kiểm vài lần trong tập lệnh để không đánh dấu nhầm."
      },
      {
        "question": "Bisect tìm ra commit gây lỗi. Việc tiếp theo là gì?",
        "options": [
          "Revert ngay commit đó mà không cần đọc lại, vì kết quả của bisect đã là chắc chắn",
          "Đọc thay đổi của commit để hiểu cơ chế, rồi mới quyết định sửa hay revert",
          "Gửi commit đó cho tác giả của nó và chờ họ tự sửa",
          "Xoá commit đó khỏi lịch sử để lỗi không bao giờ xuất hiện lại"
        ],
        "correct": 1,
        "explanation": "Commit tìm được là nơi lỗi xuất hiện, không nhất thiết là nơi lỗi nằm: nó có thể chỉ làm lộ một lỗi cũ ở chỗ khác. Đọc để hiểu cơ chế (Bài 1), rồi chọn giữa sửa tiếp hay revert. Viết lại lịch sử đã chia sẻ thì không bao giờ là lựa chọn."
      }
    ],
    "keyTakeaways": [
      "Lỗi hồi quy có sẵn một điểm tốt và một điểm xấu: chia đôi lịch sử.",
      "n commit chỉ cần khoảng log₂(n) lần kiểm.",
      "bisect run dùng mã thoát: 0 tốt, khác 0 xấu, 125 bỏ qua.",
      "Tập lệnh kiểm nhanh, tất định, chỉ kiểm đúng lỗi đang tìm.",
      "Commit nhỏ, mỗi commit dựng được, làm kết quả của bisect gần như là câu trả lời."
    ],
    "practicePrompt": {
      "question": "Bisect chỉ ra một commit chỉ nâng phiên bản một thư viện. Kết luận hợp lý nhất?",
      "options": [
        "Thư viện mới chắc chắn có lỗi, nên báo ngay cho tác giả thư viện",
        "Bisect đã chạy sai và cần làm lại từ đầu với khoảng hẹp hơn",
        "Thay đổi hành vi của thư viện làm lộ lỗi; đọc ghi chú phát hành rồi kiểm cách gọi",
        "Hạ phiên bản thư viện vĩnh viễn và khoá không cho nâng nữa"
      ],
      "correct": 2,
      "explanation": "Thường thì thư viện đổi một hành vi (theo ghi chú phát hành) mà mã của bạn dựa vào một cách ngầm. Đọc ghi chú phát hành trước, rồi xem mã gọi thư viện đó. Hạ phiên bản tạm thời để chữa cháy thì được; khoá vĩnh viễn là tích nợ."
    },
    "summary": {
      "keyIdea": "Lỗi hồi quy là bài toán tìm kiếm nhị phân trên lịch sử.",
      "formula": "bisect start + bad + good → kiểm commit giữa → lặp ~log₂(n) lần → đọc commit tìm được.",
      "commonMistake": "Dùng cả bộ kiểm thử làm tập lệnh kiểm, để một lỗi khác kéo bisect đi sai hướng.",
      "action": "Viết sẵn một tập lệnh kiểm cho lỗi bạn đang tìm trước khi bắt đầu bisect."
    },
    "application": {
      "title": "Làm ngay hôm nay",
      "message": "Trên một kho mã bất kỳ, chọn một hàm, cố ý sửa nó sai ở một commit cũ trên một nhánh thử, rồi dùng git bisect run với một lệnh kiểm để xem Git tự tìm lại commit đó sau bao nhiêu bước.",
      "secondary": "Bài sau: gỡ lỗi trên production bằng log và mã yêu cầu."
    },
    "sections": [
      {
        "type": "lead",
        "text": "\"Tuần trước còn chạy\" là một câu đáng giá: nó cho bạn một điểm tốt trong lịch sử. Có điểm tốt và điểm xấu, việc còn lại là chia đôi."
      },
      {
        "type": "code",
        "language": "bash",
        "caption": "Bisect tay và bisect tự động",
        "code": "$ git bisect start\n$ git bisect bad                  # commit hiện tại: hỏng\n$ git bisect good v2.3.0          # thẻ tuần trước: còn chạy\nBisecting: 127 revisions left to test after this (roughly 7 steps)\n$ npm test -- xuat-hoa-don        # tự kiểm\n$ git bisect good                 # hoặc: git bisect bad\n...\n$ git bisect reset                # xong thì quay về chỗ cũ\n\n# Tự động: tập lệnh trả 0 nếu tốt, khác 0 nếu xấu, 125 nếu bỏ qua\n$ git bisect start HEAD v2.3.0\n$ git bisect run npx vitest run tests/xuat-hoa-don.test.ts\n3f2a1c9 is the first bad commit"
      },
      {
        "type": "callout",
        "label": "Không chỉ cho mã",
        "text": "Cùng ý tưởng áp được cho mọi thứ có thứ tự: phiên bản thư viện (nâng dần), tệp cấu hình (bật nửa số tuỳ chọn), dữ liệu (nửa số bản ghi), thậm chí thời gian (lỗi bắt đầu trước hay sau lần triển khai lúc 14 giờ)."
      },
      {
        "type": "exercise",
        "language": "javascript",
        "title": "Tự viết git bisect",
        "task": "Lịch sử là mảng commit từ cũ tới mới; commit đầu chắc chắn tốt, commit cuối chắc chắn xấu, và từ một commit nào đó trở đi thì mọi commit đều xấu. Viết bisect(ls, laXau) trả về commit xấu ĐẦU TIÊN, gọi laXau càng ít càng tốt, và in số lần đã gọi. Mã hiện kiểm từ cũ tới mới từng commit một. Hàm laXau(c) có thể trả \"bỏ qua\" với commit không dựng được: khi đó hãy thử commit liền kề.",
        "starter": "const ls = Array.from({ length: 300 }, (_, i) => \"c\" + String(i).padStart(3, \"0\"));\nconst XAU_TU = 211;\nconst KHONG_DUNG_DUOC = new Set([\"c150\", \"c151\"]);\nlet soLan = 0;\nfunction laXau(c) {\n  soLan++;\n  if (KHONG_DUNG_DUOC.has(c)) return \"bỏ qua\";\n  return Number(c.slice(1)) >= XAU_TU;\n}\n\nfunction bisect(ls, laXau) {\n  for (const c of ls) if (laXau(c) === true) return c;\n  return null;\n}\n\nconsole.log(\"Commit gây lỗi: \" + bisect(ls, laXau));\nconsole.log(\"Số lần kiểm: \" + soLan);",
        "solution": "const ls = Array.from({ length: 300 }, (_, i) => \"c\" + String(i).padStart(3, \"0\"));\nconst XAU_TU = 211;\nconst KHONG_DUNG_DUOC = new Set([\"c150\", \"c151\"]);\nlet soLan = 0;\nfunction laXau(c) {\n  soLan++;\n  if (KHONG_DUNG_DUOC.has(c)) return \"bỏ qua\";\n  return Number(c.slice(1)) >= XAU_TU;\n}\n\nfunction bisect(ls, laXau) {\n  let tot = 0, xau = ls.length - 1;\n  while (xau - tot > 1) {\n    let giua = (tot + xau) >> 1;\n    let kq = laXau(ls[giua]);\n    for (let d = 1; kq === \"bỏ qua\" && giua + d < xau; d++) kq = laXau(ls[(giua += 1)]);\n    if (kq === \"bỏ qua\") break;\n    if (kq) xau = giua; else tot = giua;\n  }\n  return ls[xau];\n}\n\nconsole.log(\"Commit gây lỗi: \" + bisect(ls, laXau));\nconsole.log(\"Số lần kiểm: \" + soLan);",
        "hints": [
          "Giữ hai chỉ số: tot (commit chắc chắn tốt) và xau (commit chắc chắn xấu). Kiểm commit ở giữa và thu một đầu lại.",
          "Gặp \"bỏ qua\" thì dời sang commit kế tiếp và kiểm lại, miễn là vẫn còn nằm trước xau."
        ],
        "expectedOutput": "Commit gây lỗi: c211\nSố lần kiểm: 8"
      },
      {
        "type": "closing",
        "lines": [
          "Không cần hiểu mã để tìm ra commit gây lỗi; cần hiểu mã để hiểu commit đó.",
          "Bài sau gỡ lỗi ở nơi không đặt được điểm dừng: production."
        ]
      }
    ]
  },
  {
    "id": 1943,
    "slug": "go-loi-bang-log-va-ma-yeu-cau",
    "title": "Gỡ lỗi, Bài 4: Gỡ lỗi trên production bằng log và mã yêu cầu",
    "subtitle": "Không đặt được điểm dừng trên máy chủ thật - nên log phải kể được câu chuyện thay bạn.",
    "duration": "12 phút",
    "difficulty": "Trung bình",
    "emoji": "🧵",
    "track": "professional",
    "whyItMatters": "Trên production bạn không đặt được điểm dừng, không chạy lại được với dữ liệu của người dùng, và lỗi thường chỉ xảy ra một lần. Thứ duy nhất còn lại là những gì hệ thống đã ghi lại. Log có cấu trúc kèm một mã yêu cầu xuyên suốt biến hàng triệu dòng rời rạc thành câu chuyện của đúng một yêu cầu bị lỗi.",
    "openingQuestion": "Một yêu cầu thanh toán lỗi đi qua ba dịch vụ, mỗi dịch vụ ghi log riêng. Làm sao ghép log của đúng yêu cầu đó?",
    "openingOptions": [
      "Lọc log của cả ba dịch vụ theo đúng khoảng thời gian xảy ra lỗi mà người dùng báo",
      "Tìm theo tên người dùng trong log của từng dịch vụ một",
      "Chuyển tiếp một mã yêu cầu qua mọi dịch vụ, và ghi nó ở mọi dòng log",
      "Gộp ba dịch vụ thành một để chỉ còn một nguồn log duy nhất"
    ],
    "correctOption": 2,
    "explanation": "Lọc theo thời gian cho bạn log của hàng trăm yêu cầu xen kẽ nhau trong cùng giây. Mã yêu cầu (request id, hay trace id) được sinh ở cửa ngoài, gửi kèm trong phần đầu của mọi lời gọi giữa các dịch vụ, và ghi ở mọi dòng log. Lọc theo nó là thấy đúng câu chuyện của một yêu cầu, theo thứ tự, qua cả ba dịch vụ. Tên người dùng không có trên mọi dòng và một người dùng có nhiều yêu cầu.",
    "diagram": [
      {
        "label": "Cửa ngoài sinh mã yêu cầu và gửi kèm phần đầu",
        "arrow": true
      },
      {
        "label": "Mọi dịch vụ chuyển tiếp mã đó khi gọi dịch vụ khác",
        "arrow": true
      },
      {
        "label": "Mọi dòng log là JSON có mã yêu cầu",
        "arrow": true
      },
      {
        "label": "Lọc theo mã: câu chuyện của đúng một yêu cầu"
      }
    ],
    "realWorldExample": {
      "company": "Hệ thống đặt vé (tình huống minh hoạ)",
      "description": "Khách báo bị trừ tiền nhưng không nhận vé. Trang lỗi trả cho khách một mã tham chiếu - chính là mã yêu cầu. Nhân viên hỗ trợ dán mã đó vào công cụ log và thấy ngay: dịch vụ thanh toán thành công, dịch vụ xuất vé hết thời gian chờ khi gọi nhà cung cấp, và bước hoàn tiền chưa từng được gọi. Mười phút thay vì một buổi chiều."
    },
    "quiz": [
      {
        "question": "Vì sao log nên là dữ liệu có cấu trúc (như JSON) thay vì câu văn tự do?",
        "options": [
          "Vì JSON chiếm ít dung lượng lưu trữ hơn câu văn thông thường",
          "Vì công cụ lọc được theo từng trường thay vì dò chuỗi",
          "Vì câu văn tự do không hiển thị được tiếng Việt có dấu trong log",
          "Vì hệ điều hành chỉ cho phép ghi log dưới dạng JSON mà thôi"
        ],
        "correct": 1,
        "explanation": "\"Người dùng 42 đặt đơn 918 thất bại vì hết hàng\" đọc dễ nhưng muốn đếm số lần hết hàng theo sản phẩm thì phải viết biểu thức chính quy cho từng kiểu câu. {\"su_kien\":\"dat_don_that_bai\",\"ly_do\":\"het_hang\",\"don\":918} thì lọc, đếm, nhóm được ngay."
      },
      {
        "question": "Mức log (debug, info, warn, error) nên được dùng thế nào?",
        "options": [
          "Ghi mọi thứ ở mức error để chắc chắn không bỏ sót gì quan trọng",
          "Chỉ dùng hai mức info và error, các mức còn lại là thừa",
          "Mức thể hiện độ quan trọng của đoạn mã, không phải của sự kiện",
          "error cho việc cần người xử lý; warn cho bất thường tự phục hồi; info cho sự kiện nghiệp vụ"
        ],
        "correct": 3,
        "explanation": "Nếu mọi thứ đều là error thì không ai phân biệt được lỗi thật, và cảnh báo theo mức error trở nên vô dụng. Một lần thử lại thành công là warn; một đơn hàng được tạo là info; chi tiết từng bước là debug, thường tắt trên production và bật tạm khi cần."
      },
      {
        "question": "Thứ gì không được ghi vào log?",
        "options": [
          "Mã yêu cầu, tên của đường dẫn API vừa được gọi, và phương thức HTTP đã dùng",
          "Thời gian xử lý của mỗi yêu cầu tính bằng mili giây",
          "Mật khẩu, mã thông báo, số thẻ và dữ liệu cá nhân không cần thiết",
          "Mã trạng thái HTTP mà dịch vụ trả về cho người gọi"
        ],
        "correct": 2,
        "explanation": "Log được giữ lâu, được nhiều người đọc, và thường được gửi sang dịch vụ bên ngoài. Ghi nguyên thân yêu cầu đăng nhập là ghi mật khẩu. Che hoặc bỏ các trường nhạy cảm ngay ở bộ ghi log, trước khi chúng rời khỏi tiến trình (bài thu thập dữ liệu ở chặng triển khai)."
      },
      {
        "question": "Lỗi xảy ra một lần trên production, log hiện có không đủ để hiểu. Bước hợp lý?",
        "options": [
          "Thêm log ở những điểm quyết định còn thiếu, triển khai, và chờ lần sau",
          "Bật mức debug cho toàn bộ hệ thống vĩnh viễn để không bao giờ thiếu log",
          "Chép toàn bộ cơ sở dữ liệu production về máy cá nhân để chạy thử",
          "Kết luận lỗi không tái hiện được và đóng báo cáo lỗi lại"
        ],
        "correct": 0,
        "explanation": "Gỡ lỗi production thường là một vòng lặp: log hiện có loại được một số giả thuyết, bạn thêm log để phân biệt các giả thuyết còn lại, và lần xảy ra tiếp theo cho câu trả lời. Debug toàn hệ thống tốn rất nhiều và làm chìm tín hiệu; chép dữ liệu thật về máy cá nhân là vấn đề quyền riêng tư."
      },
      {
        "question": "Vì sao trả mã yêu cầu cho người dùng trên trang lỗi là một thói quen tốt?",
        "options": [
          "Vì người dùng có thể tự dùng mã đó để tra cứu và sửa lỗi mà không cần tới bộ phận hỗ trợ",
          "Vì mã đó giúp trình duyệt tự động gửi lại yêu cầu khi có mạng",
          "Vì báo lỗi của người dùng nối thẳng được tới log của đúng yêu cầu đó",
          "Vì pháp luật yêu cầu mọi trang lỗi phải có một mã tham chiếu"
        ],
        "correct": 2,
        "explanation": "\"Thanh toán lúc chiều bị lỗi\" gần như không tìm được trong log; \"mã tham chiếu 7f3a-91c2\" thì tìm được trong một giây. Mã yêu cầu không tiết lộ gì về hệ thống, nên hiện cho người dùng là an toàn."
      }
    ],
    "keyTakeaways": [
      "Production không có điểm dừng: log phải kể được câu chuyện.",
      "Log có cấu trúc để lọc theo trường thay vì dò chuỗi.",
      "Mã yêu cầu xuyên suốt mọi dịch vụ và mọi dòng log.",
      "Mức log có nghĩa: error là cần người xử lý.",
      "Không ghi bí mật và dữ liệu cá nhân; hiện mã yêu cầu cho người dùng."
    ],
    "practicePrompt": {
      "question": "Log của một yêu cầu lỗi chỉ có \"Error: timeout\" mà không biết gọi tới đâu. Thêm gì vào dòng log đó có ích nhất?",
      "options": [
        "Tên dịch vụ đích, thời gian đã chờ, số lần thử và mã yêu cầu",
        "Toàn bộ thân yêu cầu và phản hồi, gồm cả dữ liệu của người dùng",
        "Stack trace đầy đủ của mọi luồng đang chạy lúc xảy ra lỗi",
        "Một câu mô tả chi tiết bằng lời về những gì có thể đã xảy ra"
      ],
      "correct": 0,
      "explanation": "Ba câu hỏi đầu tiên với một lỗi hết thời gian chờ là: chờ ai, chờ bao lâu, đã thử mấy lần. Kèm mã yêu cầu để nối với phần còn lại của câu chuyện. Toàn bộ thân yêu cầu có thể chứa dữ liệu nhạy cảm và thường không trả lời được câu hỏi nào trong ba câu trên."
    },
    "summary": {
      "keyIdea": "Trên production, thứ bạn không ghi lại thì bạn không bao giờ biết.",
      "formula": "Log gỡ lỗi được = JSON + mã yêu cầu xuyên suốt + mức có nghĩa + không dữ liệu nhạy cảm.",
      "commonMistake": "Ghi log bằng câu văn tự do, không có mã yêu cầu, và ghi mọi thứ ở mức error.",
      "action": "Chọn một yêu cầu bất kỳ trên hệ thống của bạn và thử dựng lại câu chuyện của nó chỉ từ log."
    },
    "application": {
      "title": "Làm ngay hôm nay",
      "message": "Gọi một đường dẫn API của bạn, lấy mã yêu cầu (hoặc thêm cơ chế sinh nó nếu chưa có), rồi tìm trong log mọi dòng của đúng yêu cầu đó. Nếu không tìm được qua mọi dịch vụ nó đi qua, đó là việc cần làm đầu tiên.",
      "secondary": "Bài sau: những lỗi khó nhất - tranh chấp và lỗi chỉ xảy ra đôi khi."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Trên máy mình, bạn có điểm dừng và có thể chạy lại bao nhiêu lần tuỳ ý. Trên production, bạn chỉ có những gì hệ thống đã ghi lại lúc lỗi xảy ra. Bài này nói về việc ghi sao cho đủ."
      },
      {
        "type": "code",
        "language": "javascript",
        "caption": "Một dòng log tốt và cách truyền mã yêu cầu",
        "code": "// Mỗi dòng log là một đối tượng JSON\n{\"luc\":\"2026-09-29T08:14:03.221Z\",\"muc\":\"warn\",\"dich_vu\":\"xuat-ve\",\"ma_yc\":\"7f3a-91c2\",\n \"su_kien\":\"goi_nha_cung_cap_het_gio\",\"dich\":\"nha-cung-cap-ve\",\"cho_ms\":5000,\"lan_thu\":2}\n\n// Nhận mã từ phần đầu (hoặc sinh mới ở cửa ngoài), gắn vào log và chuyển tiếp\napp.use((req, res, next) => {\n  req.maYc = req.get(\"x-request-id\") ?? crypto.randomUUID();\n  res.set(\"x-request-id\", req.maYc);\n  req.log = logger.child({ ma_yc: req.maYc });\n  next();\n});\nawait fetch(URL_THANH_TOAN, { headers: { \"x-request-id\": req.maYc } });"
      },
      {
        "type": "list",
        "items": [
          "Ghi ở điểm quyết định và ranh giới: nhận yêu cầu, gọi dịch vụ ngoài, rẽ nhánh nghiệp vụ, trả kết quả.",
          "Mỗi dòng có đủ ngữ cảnh để hiểu mà không cần dòng khác: ai, cái gì, với giá trị nào, kết quả ra sao.",
          "Kèm thời gian xử lý ở các lời gọi ra ngoài; lỗi chậm cũng là lỗi.",
          "Log trả lời \"chuyện gì đã xảy ra với yêu cầu này\"; số đo (metrics) trả lời \"hệ thống đang khoẻ không\" - cần cả hai."
        ]
      },
      {
        "type": "exercise",
        "language": "javascript",
        "title": "Dựng lại câu chuyện của một yêu cầu lỗi",
        "task": "Log của ba dịch vụ bị trộn lẫn. Viết cauChuyen(log) tìm mọi yêu cầu có ít nhất một dòng mức error, rồi in câu chuyện của từng yêu cầu đó: các dòng của đúng mã yêu cầu ấy, sắp theo thời gian, dạng \"thời điểm dịch-vụ sự-kiện\". Mã hiện lọc theo khoảng thời gian quanh dòng lỗi, nên lẫn cả yêu cầu khác.",
        "starter": "const log = [\n  { luc: 100, dv: \"cong\", ma: \"a1\", muc: \"info\", sk: \"nhan_yeu_cau\" },\n  { luc: 101, dv: \"cong\", ma: \"b2\", muc: \"info\", sk: \"nhan_yeu_cau\" },\n  { luc: 103, dv: \"thanh-toan\", ma: \"a1\", muc: \"info\", sk: \"tru_tien_ok\" },\n  { luc: 104, dv: \"thanh-toan\", ma: \"b2\", muc: \"info\", sk: \"tru_tien_ok\" },\n  { luc: 105, dv: \"xuat-ve\", ma: \"b2\", muc: \"info\", sk: \"xuat_ve_ok\" },\n  { luc: 110, dv: \"xuat-ve\", ma: \"a1\", muc: \"warn\", sk: \"goi_nha_cung_cap_het_gio\" },\n  { luc: 102, dv: \"cong\", ma: \"c3\", muc: \"info\", sk: \"nhan_yeu_cau\" },\n  { luc: 116, dv: \"xuat-ve\", ma: \"a1\", muc: \"error\", sk: \"xuat_ve_that_bai\" },\n  { luc: 117, dv: \"cong\", ma: \"a1\", muc: \"info\", sk: \"tra_loi_500\" },\n];\n\nfunction cauChuyen(log) {\n  const loi = log.filter((d) => d.muc === \"error\");\n  return loi.map((l) => ({ ma: l.ma, dong: log.filter((d) => Math.abs(d.luc - l.luc) <= 15) }));\n}\n\nfor (const c of cauChuyen(log)) {\n  console.log(\"Yêu cầu \" + c.ma + \":\");\n  for (const d of c.dong) console.log(\"  \" + d.luc + \" \" + d.dv + \" \" + d.sk);\n}",
        "solution": "const log = [\n  { luc: 100, dv: \"cong\", ma: \"a1\", muc: \"info\", sk: \"nhan_yeu_cau\" },\n  { luc: 101, dv: \"cong\", ma: \"b2\", muc: \"info\", sk: \"nhan_yeu_cau\" },\n  { luc: 103, dv: \"thanh-toan\", ma: \"a1\", muc: \"info\", sk: \"tru_tien_ok\" },\n  { luc: 104, dv: \"thanh-toan\", ma: \"b2\", muc: \"info\", sk: \"tru_tien_ok\" },\n  { luc: 105, dv: \"xuat-ve\", ma: \"b2\", muc: \"info\", sk: \"xuat_ve_ok\" },\n  { luc: 110, dv: \"xuat-ve\", ma: \"a1\", muc: \"warn\", sk: \"goi_nha_cung_cap_het_gio\" },\n  { luc: 102, dv: \"cong\", ma: \"c3\", muc: \"info\", sk: \"nhan_yeu_cau\" },\n  { luc: 116, dv: \"xuat-ve\", ma: \"a1\", muc: \"error\", sk: \"xuat_ve_that_bai\" },\n  { luc: 117, dv: \"cong\", ma: \"a1\", muc: \"info\", sk: \"tra_loi_500\" },\n];\n\nfunction cauChuyen(log) {\n  const maLoi = [...new Set(log.filter((d) => d.muc === \"error\").map((d) => d.ma))];\n  return maLoi.map((ma) => ({ ma, dong: log.filter((d) => d.ma === ma).sort((a, b) => a.luc - b.luc) }));\n}\n\nfor (const c of cauChuyen(log)) {\n  console.log(\"Yêu cầu \" + c.ma + \":\");\n  for (const d of c.dong) console.log(\"  \" + d.luc + \" \" + d.dv + \" \" + d.sk);\n}",
        "hints": [
          "Khoảng thời gian gom cả yêu cầu b2 và c3 chạy cùng lúc. Lọc theo mã yêu cầu mới tách được đúng một câu chuyện.",
          "Log từ nhiều dịch vụ không đến theo thứ tự: sắp lại theo luc."
        ],
        "expectedOutput": "Yêu cầu a1:\n  100 cong nhan_yeu_cau\n  103 thanh-toan tru_tien_ok\n  110 xuat-ve goi_nha_cung_cap_het_gio\n  116 xuat-ve xuat_ve_that_bai\n  117 cong tra_loi_500"
      },
      {
        "type": "closing",
        "lines": [
          "Một mã yêu cầu biến hàng triệu dòng log thành câu chuyện của đúng một người dùng.",
          "Bài sau: những lỗi mà cả log cũng khó bắt - tranh chấp."
        ]
      }
    ]
  },
  {
    "id": 1944,
    "slug": "loi-tranh-chap-va-loi-luc-co-luc-khong",
    "title": "Gỡ lỗi, Bài 5: Lỗi tranh chấp và lỗi lúc có lúc không",
    "subtitle": "Hai việc đúng, chạy xen kẽ nhau theo một thứ tự xui xẻo, ra một kết quả sai.",
    "duration": "13 phút",
    "difficulty": "Khó",
    "emoji": "🏁",
    "track": "professional",
    "whyItMatters": "Lỗi tranh chấp (race condition) là loại lỗi khó nhất: mã đọc đúng, kiểm thử xanh, máy của bạn không bao giờ gặp, và nó chỉ xuất hiện dưới tải thật - rồi biến mất khi bạn thêm log để nhìn nó. Hiểu cơ chế \"đọc - chờ - ghi\" và biết vài cách khoá nó lại là khác biệt giữa sửa được trong một giờ và đoán mò trong một tuần.",
    "openingQuestion": "Hai yêu cầu cùng lúc mua sản phẩm cuối cùng còn trong kho. Mỗi yêu cầu đọc tồn kho = 1, kiểm tra > 0, rồi ghi tồn kho = 0. Kết quả?",
    "openingOptions": [
      "Cả hai mua thành công, bán hai món trong khi kho chỉ có một",
      "Một yêu cầu thành công, yêu cầu kia báo hết hàng như mong đợi",
      "Cả hai đều thất bại vì cơ sở dữ liệu phát hiện xung đột và huỷ cả hai",
      "Tồn kho thành âm một và cơ sở dữ liệu báo lỗi ràng buộc ngay"
    ],
    "correctOption": 0,
    "explanation": "Cả hai đều đọc trước khi bên kia kịp ghi, nên cả hai thấy 1 và cả hai đi tiếp. Cả hai ghi 0, không ai thấy số âm - chỉ là hai đơn hàng cho một món. Mỗi yêu cầu riêng lẻ đều đúng; cái sai nằm ở khoảng hở giữa đọc và ghi. Cách sửa là làm cho kiểm tra và ghi thành một thao tác không chia cắt được: UPDATE ... SET ton = ton - 1 WHERE id = ? AND ton > 0, rồi kiểm số dòng bị ảnh hưởng.",
    "diagram": [
      {
        "label": "A đọc tồn kho = 1",
        "arrow": true
      },
      {
        "label": "B đọc tồn kho = 1 (A chưa kịp ghi)",
        "arrow": true
      },
      {
        "label": "A ghi 0, B ghi 0",
        "arrow": true
      },
      {
        "label": "Hai đơn hàng, một món hàng"
      }
    ],
    "realWorldExample": {
      "company": "Đợt bán giới hạn của một cửa hàng trực tuyến (tình huống minh hoạ)",
      "description": "Đợt bán 100 đôi giày nhận 137 đơn thanh toán thành công. Kiểm thử luôn xanh vì chạy từng yêu cầu một. Trên máy của lập trình viên cũng không tái hiện được. Chỉ khi viết một tập lệnh bắn 500 yêu cầu song song, lỗi mới hiện ra - và bản sửa là đúng một câu UPDATE có điều kiện."
    },
    "quiz": [
      {
        "question": "Vì sao thêm log hoặc chạy trong trình gỡ lỗi đôi khi làm lỗi tranh chấp biến mất?",
        "options": [
          "Vì log tự động khoá tài nguyên dùng chung trong lúc ghi ra màn hình",
          "Chúng đổi thời gian chạy, nên thứ tự xui xẻo khó xảy ra hơn",
          "Vì trình gỡ lỗi sửa luôn những lỗi đơn giản mà nó phát hiện được",
          "Vì lỗi tranh chấp chỉ xảy ra khi chương trình được biên dịch tối ưu"
        ],
        "correct": 1,
        "explanation": "Lỗi tranh chấp phụ thuộc vào thứ tự chính xác của các bước xen kẽ. Thêm một dòng log hay một điểm dừng làm chậm một bên, đổi thứ tự đó, và lỗi \"biến mất\". Đây là lý do nó được gọi là heisenbug. Bắt nó bằng cách ép thứ tự xấu xảy ra (tăng song song, chèn độ trễ ở đúng khoảng hở) chứ không phải bằng cách quan sát kỹ hơn."
      },
      {
        "question": "JavaScript chạy một luồng. Tại sao vẫn có lỗi tranh chấp?",
        "options": [
          "Vì mỗi await là một điểm mà việc khác có thể chen vào giữa đọc và ghi",
          "Vì JavaScript thực ra luôn chạy nhiều luồng song song một cách ẩn",
          "Vì trình duyệt có thể chạy hai tab của cùng một trang trên cùng luồng",
          "JavaScript không thể có lỗi tranh chấp vì nó chỉ có một luồng"
        ],
        "correct": 0,
        "explanation": "Một luồng nghĩa là hai đoạn mã không chạy cùng một khoảnh khắc, nhưng chúng vẫn xen kẽ ở mỗi await. const x = await doc(); await ghi(x + 1); có một khoảng hở ở giữa, và một yêu cầu khác có thể đọc cùng giá trị trong khoảng đó. Cộng thêm nhiều tiến trình máy chủ cùng nói chuyện với một cơ sở dữ liệu."
      },
      {
        "question": "Cách nào loại bỏ khoảng hở giữa kiểm tra và ghi trong cơ sở dữ liệu?",
        "options": [
          "Kiểm tra hai lần liên tiếp trước khi ghi để chắc chắn giá trị không đổi",
          "Thêm một độ trễ ngẫu nhiên trước khi ghi để hai yêu cầu không trùng nhau",
          "Chạy máy chủ với đúng một tiến trình duy nhất để tránh mọi xung đột",
          "Gộp điều kiện vào câu lệnh ghi, hoặc khoá dòng trong một giao dịch"
        ],
        "correct": 3,
        "explanation": "UPDATE ... WHERE ton > 0 để cơ sở dữ liệu kiểm và ghi trong một bước nguyên tử; hoặc SELECT ... FOR UPDATE trong giao dịch để khoá dòng; hoặc ràng buộc duy nhất để chặn bản trùng. Kiểm hai lần vẫn còn khoảng hở, độ trễ ngẫu nhiên chỉ làm lỗi hiếm hơn, còn một tiến trình thì không mở rộng được."
      },
      {
        "question": "Làm sao tái hiện chắc chắn một lỗi tranh chấp nghi ngờ?",
        "options": [
          "Chạy ứng dụng thật nhiều lần liên tiếp trên máy cá nhân của bạn",
          "Chờ người dùng báo lại lỗi lần sau rồi xem log ngay lúc đó",
          "Chạy nhiều yêu cầu song song, và chèn độ trễ vào đúng khoảng hở nghi ngờ",
          "Đọc kỹ mã nguồn cho tới khi thấy chỗ có thể xảy ra tranh chấp"
        ],
        "correct": 2,
        "explanation": "Chạy tuần tự thì không bao giờ xen kẽ. Bắn song song tăng xác suất; chèn một độ trễ nhân tạo giữa đọc và ghi (chỉ trong kiểm thử) thì biến \"hiếm khi\" thành \"mỗi lần\". Khi đã tái hiện được mỗi lần, bạn có kiểm thử đỏ để chứng minh bản sửa."
      },
      {
        "question": "Hai người cùng mở trang sửa một bài viết, cùng bấm lưu. Người lưu sau ghi đè mất thay đổi của người trước. Cách xử lý phổ biến?",
        "options": [
          "Chỉ cho phép một người đăng nhập vào hệ thống tại một thời điểm",
          "Tự động gộp nội dung của hai người lại bằng cách nối văn bản",
          "Luôn giữ bản của người lưu trước và bỏ qua bản của người lưu sau",
          "Lưu kèm số phiên bản đã đọc; phiên bản đã đổi thì từ chối và báo người dùng"
        ],
        "correct": 3,
        "explanation": "Khoá lạc quan (optimistic locking): UPDATE bai SET ... , phien_ban = phien_ban + 1 WHERE id = ? AND phien_ban = ?. Không dòng nào được cập nhật nghĩa là người khác đã lưu trước; báo cho người dùng xem lại thay vì âm thầm ghi đè."
      }
    ],
    "keyTakeaways": [
      "Tranh chấp = khoảng hở giữa đọc và ghi, cộng một thứ tự xen kẽ xui xẻo.",
      "JavaScript một luồng vẫn xen kẽ ở mỗi await.",
      "Sửa bằng thao tác nguyên tử: câu lệnh ghi có điều kiện, khoá dòng, ràng buộc duy nhất.",
      "Tái hiện bằng chạy song song và chèn độ trễ vào khoảng hở.",
      "Khoá lạc quan bằng số phiên bản cho việc sửa đồng thời."
    ],
    "practicePrompt": {
      "question": "Điểm thưởng của người dùng thỉnh thoảng bị cộng thiếu khi họ hoàn thành hai bài học gần như cùng lúc. Mã: đọc điểm, cộng 10, ghi lại. Sửa gốc rễ là gì?",
      "options": [
        "Thêm độ trễ 100ms trước khi ghi để hai lần cộng không bao giờ trùng nhau",
        "Cộng trong một câu lệnh: UPDATE ... SET diem = diem + 10",
        "Đọc điểm hai lần và chỉ ghi khi hai lần đọc cho cùng một giá trị",
        "Chặn người dùng hoàn thành bài học thứ hai trong vòng một phút"
      ],
      "correct": 1,
      "explanation": "Đọc - cộng - ghi ở tầng ứng dụng có khoảng hở; hai lần cộng đọc cùng giá trị cũ và một lần bị mất. diem = diem + 10 trong câu UPDATE để cơ sở dữ liệu làm việc đó nguyên tử - giống bài tập đầu tiên của chặng cơ sở dữ liệu."
    },
    "summary": {
      "keyIdea": "Mỗi bên đều đúng; lỗi nằm ở khoảng hở giữa đọc và ghi khi hai bên xen kẽ.",
      "formula": "Tìm khoảng hở → ép nó xảy ra bằng song song và độ trễ → đóng nó bằng một thao tác nguyên tử.",
      "commonMistake": "\"Sửa\" bằng độ trễ hoặc kiểm tra hai lần, làm lỗi hiếm hơn mà không biến mất.",
      "action": "Tìm trong mã của bạn mọi chỗ đọc một giá trị, await, rồi ghi lại giá trị đã tính từ nó."
    },
    "application": {
      "title": "Làm ngay hôm nay",
      "message": "Chọn một đường dẫn API có đọc rồi ghi (đặt hàng, cộng điểm, đổi trạng thái) và viết một kiểm thử gọi nó 50 lần song song. So kết quả cuối với kết quả mong đợi. Nếu lệch, bạn vừa tìm được một lỗi tranh chấp trước người dùng.",
      "secondary": "Bài cuối: sau khi sửa xong - viết lại sự cố và khoá nó bằng kiểm thử."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Có những lỗi mà mọi dòng mã đều đúng. Chúng chỉ sai khi hai việc chạy xen kẽ nhau theo một thứ tự cụ thể - thứ tự mà máy của bạn gần như không bao giờ tạo ra, còn production thì tạo ra mỗi ngày."
      },
      {
        "type": "comparison",
        "left": {
          "label": "Có khoảng hở",
          "text": "const ton = await doc(id); if (ton > 0) await ghi(id, ton - 1); - giữa doc và ghi, một yêu cầu khác có thể đọc cùng giá trị."
        },
        "right": {
          "label": "Nguyên tử",
          "text": "UPDATE kho SET ton = ton - 1 WHERE id = ? AND ton > 0 - cơ sở dữ liệu kiểm và ghi trong một bước; 0 dòng bị ảnh hưởng nghĩa là hết hàng."
        }
      },
      {
        "type": "code",
        "language": "sql",
        "caption": "Ba cách đóng khoảng hở trong cơ sở dữ liệu",
        "code": "-- 1. Câu lệnh ghi có điều kiện (đơn giản nhất)\nUPDATE kho SET ton = ton - 1 WHERE san_pham_id = 42 AND ton > 0;   -- kiểm số dòng bị ảnh hưởng\n\n-- 2. Khoá dòng trong giao dịch, khi cần đọc rồi tính phức tạp\nBEGIN;\nSELECT ton FROM kho WHERE san_pham_id = 42 FOR UPDATE;              -- yêu cầu khác phải chờ\nUPDATE kho SET ton = ton - 1 WHERE san_pham_id = 42;\nCOMMIT;\n\n-- 3. Khoá lạc quan bằng số phiên bản, cho việc sửa của con người\nUPDATE bai_viet SET noi_dung = ?, phien_ban = phien_ban + 1\nWHERE id = ? AND phien_ban = ?;                                      -- 0 dòng: đã có người lưu trước"
      },
      {
        "type": "exercise",
        "language": "javascript",
        "title": "Tranh chấp giữa hai await, và cách khoá nó",
        "task": "Mô phỏng một kho có tồn 3 món và 5 yêu cầu mua chạy song song. Mỗi yêu cầu đọc tồn kho, await (khoảng hở), rồi ghi. Mã hiện bán quá số hàng. Viết muaAnToan dùng hàm truTonNeuCon có sẵn (kiểm và trừ trong một bước không có await ở giữa, như câu UPDATE có điều kiện) để bán đúng 3 món và 2 yêu cầu báo hết hàng.",
        "starter": "let ton = 3;\nconst doc = async () => { await null; return ton; };\nconst ghi = async (v) => { await null; ton = v; };\nconst truTonNeuCon = async () => { await null; if (ton > 0) { ton--; return true; } return false; };\n\nasync function mua(ai) {\n  const hienTai = await doc();\n  if (hienTai <= 0) return ai + \": hết hàng\";\n  await ghi(hienTai - 1);\n  return ai + \": mua được\";\n}\nconst muaAnToan = mua;\n\nconst kq = await Promise.all([\"An\", \"Bình\", \"Chi\", \"Dũng\", \"Em\"].map(muaAnToan));\nkq.forEach((d) => console.log(d));\nconsole.log(\"Bán ra: \" + kq.filter((d) => d.endsWith(\"mua được\")).length + \", tồn còn: \" + ton);",
        "solution": "let ton = 3;\nconst doc = async () => { await null; return ton; };\nconst ghi = async (v) => { await null; ton = v; };\nconst truTonNeuCon = async () => { await null; if (ton > 0) { ton--; return true; } return false; };\n\nasync function mua(ai) {\n  const hienTai = await doc();\n  if (hienTai <= 0) return ai + \": hết hàng\";\n  await ghi(hienTai - 1);\n  return ai + \": mua được\";\n}\nasync function muaAnToan(ai) {\n  return (await truTonNeuCon()) ? ai + \": mua được\" : ai + \": hết hàng\";\n}\n\nconst kq = await Promise.all([\"An\", \"Bình\", \"Chi\", \"Dũng\", \"Em\"].map(muaAnToan));\nkq.forEach((d) => console.log(d));\nconsole.log(\"Bán ra: \" + kq.filter((d) => d.endsWith(\"mua được\")).length + \", tồn còn: \" + ton);",
        "hints": [
          "Với Promise.all, cả năm yêu cầu đều chạy tới await doc() trước khi bất kỳ ai ghi: cả năm cùng thấy 3.",
          "Đừng tách đọc và ghi. truTonNeuCon kiểm và trừ liền nhau, không có await xen giữa - đúng như UPDATE ... WHERE ton > 0."
        ],
        "expectedOutput": "An: mua được\nBình: mua được\nChi: mua được\nDũng: hết hàng\nEm: hết hàng\nBán ra: 3, tồn còn: 0"
      },
      {
        "type": "closing",
        "lines": [
          "Không bắt được tranh chấp bằng cách nhìn kỹ hơn; phải ép nó xảy ra, rồi đóng khoảng hở.",
          "Bài cuối: sau khi lỗi đã được sửa, làm gì để nó không quay lại."
        ]
      }
    ]
  },
  {
    "id": 1945,
    "slug": "viet-lai-su-co-va-kiem-thu-hoi-quy",
    "title": "Gỡ lỗi, Bài 6: Viết lại sự cố và kiểm thử hồi quy",
    "subtitle": "Một lỗi đã sửa mà không để lại kiểm thử là một lỗi đã hẹn ngày quay lại.",
    "duration": "11 phút",
    "difficulty": "Trung bình",
    "emoji": "📝",
    "track": "professional",
    "whyItMatters": "Sửa xong một lỗi là nửa việc. Nửa còn lại quyết định đội có học được gì không: một kiểm thử khoá đúng lỗi đó lại, và với sự cố lớn, một bản viết lại không đổ lỗi - chuyện gì xảy ra, vì sao các lớp bảo vệ không chặn được, và sửa gì để lần sau không lặp lại. Không có nửa sau, cùng một lỗi quay lại dưới một cái tên khác.",
    "openingQuestion": "Bản viết lại sau sự cố kết luận: \"Nguyên nhân: lập trình viên X triển khai mã lỗi\". Vấn đề của kết luận này là gì?",
    "openingOptions": [
      "Nó dừng ở một người, không hỏi vì sao các lớp bảo vệ để lỗi lọt qua",
      "Nó không ghi rõ thời gian chính xác tới từng giây lúc mã lỗi được triển khai lên",
      "Nó nên ghi tên cả người duyệt mã chứ không chỉ người viết",
      "Nó quá ngắn so với độ dài tiêu chuẩn của một bản viết lại"
    ],
    "correctOption": 0,
    "explanation": "Ai cũng sẽ có lúc viết mã lỗi; câu hỏi đáng giá là vì sao lỗi đó đi được tới người dùng. Kiểm thử nào đáng lẽ bắt được nó? Vì sao canary không phát hiện? Vì sao quay lại mất 40 phút? Mỗi câu trả lời là một thay đổi hệ thống, có tác dụng với mọi người. Đổ lỗi cho cá nhân thì chỉ dạy mọi người giấu lỗi lần sau - và mất luôn thông tin cần để sửa.",
    "diagram": [
      {
        "label": "Dòng thời gian: chuyện gì xảy ra, lúc nào",
        "arrow": true
      },
      {
        "label": "Vì sao các lớp bảo vệ không chặn được",
        "arrow": true
      },
      {
        "label": "Việc cần làm: có người nhận, có hạn",
        "arrow": true
      },
      {
        "label": "Kiểm thử hồi quy khoá đúng lỗi này lại"
      }
    ],
    "realWorldExample": {
      "company": "Một đội vận hành dịch vụ thanh toán (tình huống minh hoạ)",
      "description": "Sự cố lặp lại lần thứ ba trong năm với cùng một triệu chứng: hết kết nối cơ sở dữ liệu vào giờ cao điểm. Hai bản viết lại trước đều kết luận \"đã khởi động lại dịch vụ\". Lần thứ ba, đội hỏi \"vì sao\" năm lần liên tiếp và tìm ra một lời gọi không trả kết nối về khi hết thời gian chờ. Sau bản sửa và một kiểm thử mô phỏng hết giờ, sự cố không quay lại."
    },
    "quiz": [
      {
        "question": "Một kiểm thử hồi quy tốt cho một lỗi vừa sửa phải thoả điều kiện nào?",
        "options": [
          "Kiểm tra toàn bộ chức năng liên quan chứ không riêng trường hợp gây lỗi",
          "Được viết sau khi sửa để chắc chắn nó xanh ngay từ lần chạy đầu",
          "Đỏ với mã trước khi sửa, xanh với mã sau khi sửa",
          "Chạy riêng để không làm chậm CI"
        ],
        "correct": 2,
        "explanation": "Một kiểm thử xanh cả trước lẫn sau khi sửa không chứng minh được gì - nó không bắt được lỗi này. Viết kiểm thử trước, thấy nó đỏ đúng vì lỗi đó, rồi mới sửa và thấy nó xanh. Và nó phải nằm trong bộ chạy ở CI, nếu không nó không bảo vệ ai."
      },
      {
        "question": "Kỹ thuật \"năm lần vì sao\" dùng để làm gì?",
        "options": [
          "Đi từ triệu chứng xuống nguyên nhân hệ thống, thay vì dừng ở lớp đầu",
          "Đếm số lần sự cố đã xảy ra trong năm để quyết định mức độ nghiêm trọng của nó",
          "Hỏi năm người khác nhau để có năm góc nhìn về sự cố",
          "Giới hạn thời gian của buổi họp sau sự cố ở năm câu hỏi"
        ],
        "correct": 0,
        "explanation": "Dịch vụ sập - vì sao? Hết kết nối cơ sở dữ liệu. Vì sao? Kết nối không được trả về. Vì sao? Lời gọi hết giờ bỏ qua bước trả. Vì sao không ai thấy? Không có số đo nào cho số kết nối đang dùng. Mỗi tầng cho một việc sửa khác nhau, và tầng sâu nhất thường có tác dụng rộng nhất."
      },
      {
        "question": "Dòng thời gian trong bản viết lại sau sự cố nên có những mốc nào?",
        "options": [
          "Chỉ thời điểm bắt đầu và kết thúc của sự cố, tính theo phút",
          "Thời điểm từng người trong đội được thông báo về sự cố",
          "Lúc bắt đầu, lúc phát hiện, lúc bắt đầu xử lý, lúc giảm thiểu, lúc khắc phục",
          "Thời điểm các commit liên quan được viết trong vài tháng trước"
        ],
        "correct": 2,
        "explanation": "Khoảng cách giữa các mốc chỉ ra chỗ cần cải thiện. Bắt đầu 14:00 mà 14:40 mới phát hiện: cảnh báo có vấn đề. Phát hiện 14:40 mà 15:30 mới quay lại được: đường quay lại có vấn đề. Chỉ ghi đầu và cuối thì mất hết thông tin đó."
      },
      {
        "question": "Việc cần làm sau sự cố thường bị bỏ quên. Điều gì giúp chúng được làm?",
        "options": [
          "Ghi thật nhiều việc để chắc chắn không bỏ sót điều gì quan trọng",
          "Giao toàn bộ việc cho người trực lúc xảy ra sự cố",
          "Chờ tới khi có thời gian rảnh mới bắt đầu làm các việc đó",
          "Mỗi việc cụ thể, có một người nhận, có hạn, và nằm trong danh sách việc chung"
        ],
        "correct": 3,
        "explanation": "\"Cải thiện giám sát\" không bao giờ xong; \"thêm cảnh báo khi số kết nối dùng trên 80%, An nhận, trước thứ sáu\" thì xong được. Ít việc làm được tốt hơn nhiều việc bị bỏ quên - và việc nằm ngoài danh sách việc chung của đội thì thực tế là không tồn tại."
      },
      {
        "question": "Khi nào đáng viết một bản viết lại sau sự cố đầy đủ?",
        "options": [
          "Sau mọi lỗi, kể cả lỗi chính tả trên giao diện người dùng",
          "Khi người dùng bị ảnh hưởng đáng kể, hoặc suýt bị, hoặc sự cố lặp lại",
          "Chỉ khi ban lãnh đạo yêu cầu một báo cáo chính thức",
          "Chỉ khi sự cố kéo dài hơn một ngày làm việc"
        ],
        "correct": 1,
        "explanation": "Viết cho mọi lỗi thì không ai đọc; không viết cho những sự cố lớn thì mất bài học. \"Suýt bị\" đáng viết vì nó cho bài học mà không tốn giá của sự cố thật. Và một sự cố lặp lại là dấu hiệu rõ nhất rằng lần trước chưa sửa tới gốc."
      }
    ],
    "keyTakeaways": [
      "Kiểm thử hồi quy phải đỏ trước khi sửa và xanh sau khi sửa.",
      "Viết lại không đổ lỗi: hỏi vì sao các lớp bảo vệ để lỗi lọt qua.",
      "\"Năm lần vì sao\" đi từ triệu chứng xuống nguyên nhân hệ thống.",
      "Dòng thời gian có đủ mốc phát hiện, giảm thiểu, khắc phục.",
      "Việc cần làm: cụ thể, một người nhận, có hạn."
    ],
    "practicePrompt": {
      "question": "Bạn sửa lỗi tính phí vận chuyển sai với đơn đúng 500.000đ. Kiểm thử mới gọi hàm với 300.000đ và 800.000đ, cả hai xanh trước và sau khi sửa. Vấn đề là gì?",
      "options": [
        "Không có vấn đề gì, hai giá trị đó đã đủ đại diện cho mọi đơn hàng",
        "Kiểm thử không có đúng ca đã gây lỗi, nên không chứng minh gì về bản sửa",
        "Kiểm thử nên dùng số tiền ngẫu nhiên để bao phủ nhiều trường hợp hơn",
        "Kiểm thử cần chạy trên dữ liệu thật của production mới đáng tin"
      ],
      "correct": 1,
      "explanation": "Lỗi nằm ở biên (500.000đ đúng mốc miễn phí vận chuyển). Kiểm thử không chạm biên thì xanh với cả mã lỗi. Kiểm thử hồi quy phải chứa đúng ca đã gây lỗi - ở đây là 500.000đ, và nên thêm 499.999đ - rồi thấy nó đỏ trước khi sửa."
    },
    "summary": {
      "keyIdea": "Sửa lỗi xong khi nó không thể quay lại mà không ai biết.",
      "formula": "Kiểm thử đỏ-trước-xanh-sau + viết lại không đổ lỗi + năm lần vì sao + việc có người nhận.",
      "commonMistake": "Viết kiểm thử sau khi sửa và không bao giờ thấy nó đỏ - nên không biết nó có bắt được lỗi không.",
      "action": "Với lỗi gần nhất bạn sửa, tạm bỏ bản sửa và chạy kiểm thử: nó có đỏ không?"
    },
    "application": {
      "title": "Làm ngay hôm nay",
      "message": "Lấy lần sự cố gần nhất của đội bạn và viết một bản một trang: dòng thời gian với năm mốc, ba lần \"vì sao\", và tối đa ba việc cần làm có người nhận. So với những gì đội đã thực sự làm sau sự cố đó.",
      "secondary": "Hết chặng. Bạn đã có đủ vòng: đóng gói, kiểm tra và phát hành tự động, và tìm lỗi khi nó vẫn lọt qua."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bài cuối của chặng nói về điều xảy ra sau khi lỗi đã được sửa. Đây là phần hay bị bỏ qua nhất, và cũng là phần quyết định lỗi có quay lại hay không."
      },
      {
        "type": "code",
        "language": "text",
        "caption": "Khung một trang cho bản viết lại sau sự cố",
        "code": "# Sự cố: [một câu mô tả tác động lên người dùng]\n\n## Tác động\nAi bị ảnh hưởng, bao nhiêu, trong bao lâu.\n\n## Dòng thời gian (giờ Việt Nam)\n14:02  Bắt đầu: triển khai api:3f2a1c9\n14:41  Phát hiện: cảnh báo tỷ lệ lỗi thanh toán\n14:45  Bắt đầu xử lý: người trực nhận cảnh báo\n15:10  Giảm thiểu: quay lại api:9c1e2d4\n16:30  Khắc phục: bản sửa và kiểm thử hồi quy đã lên\n\n## Vì sao (không nhắm vào cá nhân)\n1. Vì sao lỗi? ...   2. Vì sao kiểm thử không bắt? ...   3. Vì sao 39 phút mới phát hiện? ...\n\n## Việc cần làm\n- [ ] Kiểm thử cho ca đơn đúng mốc 500.000đ - Bình - 03/10\n- [ ] Cảnh báo tỷ lệ lỗi theo từng đường dẫn, không chỉ toàn dịch vụ - An - 10/10"
      },
      {
        "type": "comparison",
        "left": {
          "label": "Viết kiểm thử sau khi sửa",
          "text": "Kiểm thử xanh ngay lần đầu. Bạn không biết nó có bắt được lỗi này không, vì chưa từng thấy nó đỏ."
        },
        "right": {
          "label": "Viết kiểm thử trước khi sửa",
          "text": "Kiểm thử đỏ vì đúng lỗi đó; sửa xong thì xanh. Nó là bằng chứng bản sửa đúng, và là rào chắn lần sau."
        }
      },
      {
        "type": "exercise",
        "language": "javascript",
        "title": "Viết một kiểm thử bắt được lỗi",
        "task": "phiVanChuyen có hai bản: banLoi (lỗi ở mốc miễn phí) và banSua. Bộ ca kiểm thử hiện xanh với CẢ HAI bản - nghĩa là nó không bắt được lỗi. Thêm ca kiểm thử (không sửa hai hàm) để bản lỗi trượt ít nhất một ca và bản sửa đạt mọi ca. Đơn từ 500.000đ trở lên được miễn phí; dưới đó phí 30.000đ.",
        "starter": "const banLoi = (tien) => (tien > 500000 ? 0 : 30000);\nconst banSua = (tien) => (tien >= 500000 ? 0 : 30000);\n\nconst ca = [\n  [300000, 30000],\n  [800000, 0],\n];\n\nfor (const [ten, f] of [[\"bản lỗi\", banLoi], [\"bản sửa\", banSua]]) {\n  const truot = ca.filter(([tien, mong]) => f(tien) !== mong).map(([tien]) => tien);\n  console.log(ten + \": \" + (truot.length ? \"TRƯỢT ở \" + truot.join(\", \") : \"ĐẠT cả \" + ca.length + \" ca\"));\n}",
        "solution": "const banLoi = (tien) => (tien > 500000 ? 0 : 30000);\nconst banSua = (tien) => (tien >= 500000 ? 0 : 30000);\n\nconst ca = [\n  [300000, 30000],\n  [800000, 0],\n  [500000, 0],\n  [499999, 30000],\n];\n\nfor (const [ten, f] of [[\"bản lỗi\", banLoi], [\"bản sửa\", banSua]]) {\n  const truot = ca.filter(([tien, mong]) => f(tien) !== mong).map(([tien]) => tien);\n  console.log(ten + \": \" + (truot.length ? \"TRƯỢT ở \" + truot.join(\", \") : \"ĐẠT cả \" + ca.length + \" ca\"));\n}",
        "hints": [
          "Lỗi nằm đúng ở biên: > so với >=. Hai ca hiện có đều nằm xa biên.",
          "Thêm ca 500000 (mong 0) - bản lỗi trả 30000 nên trượt. Thêm cả 499999 (mong 30000) để khoá phía bên kia của biên."
        ],
        "expectedOutput": "bản lỗi: TRƯỢT ở 500000\nbản sửa: ĐẠT cả 4 ca"
      },
      {
        "type": "closing",
        "lines": [
          "Một lỗi đã sửa, có kiểm thử khoá lại, và có bài học cho hệ thống, là một lỗi không quay lại.",
          "Hết chặng gỡ lỗi. Bạn đã có đủ vòng: đóng gói, kiểm tra và phát hành tự động, và tìm lỗi khi nó vẫn lọt qua."
        ]
      }
    ]
  }
];
