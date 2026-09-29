import type { Lesson } from "./lesson-types";

// Chặng 40 "CI/CD: kiểm tra và phát hành tự động" (ids 1930-1935, professional track).
//
// Nối tiếp chặng Docker: image đã đóng gói được, giờ để máy tự dựng, tự kiểm và
// tự đưa lên mỗi lần đẩy mã. Ví dụ pipeline viết theo cú pháp GitHub Actions vì
// đó là thứ người học dễ gặp nhất, nhưng mọi nguyên tắc (fail-fast, cache theo
// tệp khoá, bí mật và PR từ fork, canary, test chập chờn) áp dụng cho mọi hệ CI.

export const CICD_LESSONS: Lesson[] = [
  {
    "id": 1930,
    "slug": "ci-la-gi-va-vi-sao-can-no",
    "title": "CI/CD, Bài 1: CI là gì và vì sao cần nó",
    "subtitle": "Một cổng tự động mà mọi thay đổi phải đi qua - vì con người luôn quên chạy lại kiểm thử.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "🔁",
    "track": "professional",
    "whyItMatters": "Kiểm thử chỉ bảo vệ bạn khi nó được chạy. Trong một đội, luôn có người đẩy mã lúc vội, quên chạy lại, hoặc chạy trên máy có sẵn thứ mà máy người khác không có. CI (tích hợp liên tục) chạy cùng một bộ kiểm tra trên một máy sạch cho mọi thay đổi, trước khi nó được gộp - biến \"nhớ chạy kiểm thử\" từ thói quen thành luật.",
    "openingQuestion": "Đội có đủ unit test, nhưng mỗi tuần vẫn có lỗi lọt lên nhánh chính. Nguyên nhân phổ biến nhất?",
    "openingOptions": [
      "Unit test viết chưa đủ nhiều nên không phát hiện được mọi loại lỗi",
      "Kiểm thử chỉ chạy khi có người nhớ chạy, trên máy của chính người đó",
      "Nhánh chính nhận quá nhiều thay đổi cùng lúc nên kiểm thử bị lẫn lộn",
      "Máy của lập trình viên quá yếu để chạy hết toàn bộ bộ kiểm thử"
    ],
    "correctOption": 1,
    "explanation": "Một cổng chỉ chạy khi có người nhớ chạy thì không phải là cổng (đúng như bài công cụ và thói quen ở chặng JavaScript). Người vội bỏ qua, người khác chạy trên máy có sẵn biến môi trường hay dữ liệu cục bộ mà máy sạch không có. CI chạy cùng một bộ kiểm tra trên máy sạch cho mọi thay đổi, và nhánh chính được khoá để chỉ nhận thay đổi đã xanh. Viết thêm kiểm thử không giúp gì nếu chúng không được chạy.",
    "diagram": [
      {
        "label": "Đẩy mã lên một nhánh hoặc mở pull request",
        "arrow": true
      },
      {
        "label": "CI dựng trên máy sạch và chạy kiểm tra",
        "arrow": true
      },
      {
        "label": "Kết quả gắn vào pull request: xanh hoặc đỏ",
        "arrow": true
      },
      {
        "label": "Nhánh chính chỉ nhận thay đổi đã xanh"
      }
    ],
    "realWorldExample": {
      "company": "Đội sáu người làm ứng dụng web (tình huống minh hoạ)",
      "description": "Trước CI, nhánh chính \"đỏ\" vài lần một tuần và ai kéo mã về đúng lúc đó mất nửa buổi tìm xem lỗi của ai. Sau khi bật CI và khoá nhánh chính, lỗi vẫn xảy ra - nhưng chúng nằm trên pull request của người gây ra, được thấy trong mười phút và sửa trước khi chạm tới ai khác."
    },
    "quiz": [
      {
        "question": "CI khác với việc mỗi người tự chạy kiểm thử trên máy mình ở điểm cốt lõi nào?",
        "options": [
          "CI chạy nhanh hơn nhiều vì dùng máy chủ mạnh hơn máy cá nhân",
          "CI chạy tự động trên máy sạch cho mọi thay đổi, không phụ thuộc trí nhớ ai",
          "CI dùng một bộ kiểm thử riêng, khác với bộ kiểm thử lập trình viên chạy",
          "CI chỉ chạy kiểm thử một lần mỗi ngày vào ban đêm khi không ai làm việc"
        ],
        "correct": 1,
        "explanation": "Giá trị của CI không nằm ở tốc độ mà ở hai thứ: nó luôn chạy, và chạy trên máy sạch. Máy sạch bắt được lỗi \"chạy trên máy tôi\" - thiếu tệp chưa commit, thiếu biến môi trường, thư viện cài tay. Chạy mỗi đêm một lần thì lỗi được phát hiện muộn cả ngày, khi đã có mười thay đổi khác chồng lên."
      },
      {
        "question": "Các bước trong pipeline nên được xếp theo thứ tự nào?",
        "options": [
          "Bước rẻ và hay hỏng chạy trước, để người đẩy mã nhận phản hồi sớm nhất",
          "Bước quan trọng nhất chạy trước tiên, dù nó tốn nhiều thời gian chờ nhất trong cả pipeline",
          "Theo thứ tự bảng chữ cái của tên từng bước để dễ tìm lại trong nhật ký chạy",
          "Thứ tự không quan trọng, vì kết quả cuối cùng vẫn chỉ là xanh hoặc là đỏ"
        ],
        "correct": 0,
        "explanation": "Kiểm tra định dạng và kiểu mất vài giây và bắt được rất nhiều lỗi; kiểm thử đầu-cuối mất mười phút. Chạy cái nhanh trước và dừng ngay khi hỏng (fail-fast) nghĩa là một lỗi chính tả được báo trong ba mươi giây thay vì sau mười phút chờ."
      },
      {
        "question": "\"Khoá nhánh chính\" (branch protection) thêm gì vào CI?",
        "options": [
          "Nó chặn mọi người đọc mã của nhánh chính nếu chưa được quản trị viên cấp quyền",
          "Nó tự động sửa các lỗi mà CI tìm thấy trước khi thay đổi được gộp vào nhánh chính",
          "Nó làm CI chạy nhanh hơn vì từ đó chỉ kiểm tra những tệp nằm trên nhánh chính",
          "Nó bắt buộc CI phải xanh trước khi gộp, nên kết quả đỏ không bị bỏ qua"
        ],
        "correct": 3,
        "explanation": "CI chỉ báo kết quả; khoá nhánh biến kết quả đó thành điều kiện. Không khoá thì một người vội vẫn gộp khi CI đang đỏ, \"sửa sau\". Khoá nhánh cũng thường kèm yêu cầu ít nhất một người duyệt - bài pull request ở chặng Git."
      },
      {
        "question": "CI và CD khác nhau thế nào?",
        "options": [
          "CI dành cho mã chạy phía máy chủ, còn CD dành riêng cho mã chạy phía trình duyệt người dùng",
          "CI chạy trên máy cá nhân, còn CD chạy trên máy chủ của nhà cung cấp",
          "CI kiểm mỗi thay đổi trước khi gộp; CD đưa thay đổi đã gộp tới môi trường chạy",
          "Hai tên gọi chỉ cùng một thứ, chỉ khác nhau giữa các công cụ"
        ],
        "correct": 2,
        "explanation": "CI (tích hợp liên tục) trả lời \"thay đổi này có làm hỏng gì không\". CD (phân phối hoặc triển khai liên tục) trả lời \"làm sao đưa nó tới người dùng an toàn\": dựng image, đẩy lên kho, triển khai dần, quay lại khi hỏng. Bài 5 của chặng này nói về CD."
      },
      {
        "question": "Pipeline hiện mất 40 phút. Hậu quả thực tế đáng lo nhất là gì?",
        "options": [
          "Người ta gộp nhiều thay đổi một lần hoặc bỏ qua CI, nên lỗi khó truy nguồn",
          "Chi phí thuê máy chủ CI tăng lên gấp nhiều lần so với một pipeline ngắn hơn cùng số kiểm thử",
          "Kiểm thử chạy lâu sẽ tự động trở nên chập chờn và không còn đáng tin cậy nữa",
          "Nhà cung cấp CI sẽ giới hạn số lần được chạy mỗi ngày của cả đội phát triển"
        ],
        "correct": 0,
        "explanation": "Phản hồi chậm làm thay đổi hành vi: người ta dồn nhiều thay đổi vào một lần đẩy để đỡ phải chờ, chuyển sang việc khác rồi quên, hoặc tìm cách bỏ qua. Một pipeline đỏ với ba mươi commit khó truy hơn nhiều so với một pipeline đỏ với một commit. Bài 3 nói về cách rút ngắn nó."
      }
    ],
    "keyTakeaways": [
      "CI chạy cùng bộ kiểm tra trên máy sạch cho mọi thay đổi, không phụ thuộc trí nhớ.",
      "Xếp bước rẻ và hay hỏng lên trước, dừng ngay khi có lỗi.",
      "Khoá nhánh chính biến kết quả CI thành điều kiện gộp.",
      "CI hỏi \"có hỏng gì không\"; CD hỏi \"đưa tới người dùng thế nào\".",
      "Pipeline chậm thay đổi hành vi của cả đội theo hướng xấu."
    ],
    "practicePrompt": {
      "question": "Pipeline gồm: kiểm thử đầu-cuối (8 phút), unit test (2 phút), kiểm tra định dạng (15 giây), theo đúng thứ tự đó. Thay đổi phổ biến nhất trong đội là lỗi định dạng. Sửa gì trước?",
      "options": [
        "Bỏ hẳn bước kiểm tra định dạng vì lỗi định dạng không làm hỏng chức năng nào",
        "Đưa kiểm tra định dạng lên đầu và dừng ngay khi nó hỏng",
        "Chạy kiểm thử đầu-cuối trên một máy mạnh hơn để giảm tám phút chờ",
        "Chuyển toàn bộ pipeline sang chạy một lần vào cuối mỗi ngày làm việc"
      ],
      "correct": 1,
      "explanation": "Với thứ tự hiện tại, lỗi định dạng - loại hay gặp nhất - chỉ được báo sau hơn mười phút. Đưa bước 15 giây lên đầu cùng fail-fast thì phần lớn lỗi được báo trong chưa tới một phút, mà không tốn thêm máy nào."
    },
    "summary": {
      "keyIdea": "CI biến \"nhớ chạy kiểm thử\" thành một cổng tự động mà mọi thay đổi phải qua.",
      "formula": "CI tốt = máy sạch + mọi thay đổi + bước rẻ trước + fail-fast + khoá nhánh chính.",
      "commonMistake": "Có CI nhưng không khoá nhánh, nên kết quả đỏ bị bỏ qua khi đang vội.",
      "action": "Kiểm nhánh chính của dự án bạn: có gộp được khi CI đang đỏ không?"
    },
    "application": {
      "title": "Làm ngay hôm nay",
      "message": "Mở cài đặt kho mã của dự án bạn, tìm mục bảo vệ nhánh và kiểm: nhánh chính có yêu cầu CI xanh trước khi gộp không? Nếu không, bật lên và chọn đúng những bước kiểm tra bắt buộc.",
      "secondary": "Bài sau: viết pipeline đầu tiên."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Chặng Docker cho bạn một image dựng lại được. Chặng này cho máy làm việc đó thay bạn, mỗi lần có thay đổi - kèm mọi kiểm tra bạn hay quên."
      },
      {
        "type": "feynman",
        "title": "CI giải thích bằng dây chuyền đóng hộp",
        "intro": "Hình dung một xưởng đóng hộp sữa, và mỗi thay đổi mã là một hộp đi trên băng chuyền.",
        "columns": [
          "Khái niệm",
          "Xưởng",
          "Phần mềm"
        ],
        "rows": [
          [
            "Kiểm tra rẻ trước",
            "Cân trọng lượng ngay đầu băng chuyền",
            "Định dạng và kiểu chạy đầu tiên"
          ],
          [
            "Fail-fast",
            "Hộp nhẹ bị đẩy khỏi băng ngay, không đi tiếp",
            "Bước hỏng dừng cả pipeline"
          ],
          [
            "Máy sạch",
            "Mọi hộp qua cùng một máy kiểm, không phải tay từng người",
            "Kiểm thử chạy trên máy mới, không có gì cài sẵn"
          ],
          [
            "Khoá nhánh",
            "Hộp chưa qua kiểm không được vào kho",
            "Chưa xanh thì không gộp"
          ]
        ],
        "oneLiner": "Một xưởng không trông vào việc công nhân nhớ cân từng hộp; nó đặt cái cân lên băng chuyền."
      },
      {
        "type": "heading",
        "text": "Ba nguyên tắc"
      },
      {
        "type": "list",
        "items": [
          "Mọi thay đổi đều qua: pull request, và cả những lần đẩy thẳng lên nhánh chính nếu còn được phép.",
          "Máy sạch: mỗi lần chạy bắt đầu từ trạng thái trống, cài đúng những gì khai báo.",
          "Nhanh và nói rõ: bước rẻ trước, dừng khi hỏng, và thông báo chỉ thẳng vào dòng lỗi."
        ]
      },
      {
        "type": "callout",
        "label": "Kiểm thử bạn không chạy được trên máy sạch",
        "text": "Lần đầu bật CI thường đỏ ngay dù trên máy ai cũng xanh. Đó không phải lỗi của CI: đó là những phụ thuộc ẩn - một tệp chưa commit, một biến môi trường trong shell của ai đó - mà giờ mới lộ ra. Sửa chúng là phần giá trị đầu tiên CI mang lại."
      },
      {
        "type": "exercise",
        "language": "javascript",
        "title": "Fail-fast: phản hồi tới sau bao lâu",
        "task": "Mỗi bước có thời gian (giây) và xác suất hỏng. tgPhanHoi(buoc, loi) trả về số giây từ lúc đẩy mã tới lúc biết kết quả, khi các bước chạy tuần tự và dừng ngay ở bước hỏng đầu tiên (loi là tên bước hỏng, hoặc null nếu tất cả xanh). Sửa hàm (hiện nó chạy hết mọi bước dù đã hỏng), rồi xếp lại mảng buocTot để thời gian phản hồi TRUNG BÌNH theo xác suất hỏng là nhỏ nhất.",
        "starter": "const buoc = [\n  { ten: \"e2e\", giay: 480, hong: 0.05 },\n  { ten: \"unit\", giay: 120, hong: 0.15 },\n  { ten: \"dinh-dang\", giay: 15, hong: 0.3 },\n];\nconst buocTot = [...buoc];\n\nfunction tgPhanHoi(ds, loi) {\n  return ds.reduce((s, b) => s + b.giay, 0);\n}\nfunction trungBinh(ds) {\n  let tb = 0, conXanh = 1;\n  for (const b of ds) { tb += conXanh * b.hong * tgPhanHoi(ds, b.ten); conXanh *= 1 - b.hong; }\n  return Math.round(tb + conXanh * tgPhanHoi(ds, null));\n}\n\nconsole.log(\"Hỏng ở dinh-dang: \" + tgPhanHoi(buoc, \"dinh-dang\") + \"s\");\nconsole.log(\"Trung bình, thứ tự cũ: \" + trungBinh(buoc) + \"s\");\nconsole.log(\"Trung bình, thứ tự mới: \" + trungBinh(buocTot) + \"s | \" + buocTot.map((b) => b.ten).join(\" -> \"));",
        "solution": "const buoc = [\n  { ten: \"e2e\", giay: 480, hong: 0.05 },\n  { ten: \"unit\", giay: 120, hong: 0.15 },\n  { ten: \"dinh-dang\", giay: 15, hong: 0.3 },\n];\nconst buocTot = [...buoc].sort((a, b) => a.giay / a.hong - b.giay / b.hong);\n\nfunction tgPhanHoi(ds, loi) {\n  let s = 0;\n  for (const b of ds) {\n    s += b.giay;\n    if (b.ten === loi) break;\n  }\n  return s;\n}\nfunction trungBinh(ds) {\n  let tb = 0, conXanh = 1;\n  for (const b of ds) { tb += conXanh * b.hong * tgPhanHoi(ds, b.ten); conXanh *= 1 - b.hong; }\n  return Math.round(tb + conXanh * tgPhanHoi(ds, null));\n}\n\nconsole.log(\"Hỏng ở dinh-dang: \" + tgPhanHoi(buoc, \"dinh-dang\") + \"s\");\nconsole.log(\"Trung bình, thứ tự cũ: \" + trungBinh(buoc) + \"s\");\nconsole.log(\"Trung bình, thứ tự mới: \" + trungBinh(buocTot) + \"s | \" + buocTot.map((b) => b.ten).join(\" -> \"));",
        "hints": [
          "Cộng dần thời gian và dừng (break) ngay sau bước hỏng.",
          "Bước nên đứng trước nếu nó vừa rẻ vừa hay hỏng: sắp theo giây chia cho xác suất hỏng, tăng dần."
        ],
        "expectedOutput": "Hỏng ở dinh-dang: 615s\nTrung bình, thứ tự cũ: 606s\nTrung bình, thứ tự mới: 385s | dinh-dang -> unit -> e2e"
      },
      {
        "type": "closing",
        "lines": [
          "CI không làm mã của bạn đúng hơn; nó làm việc kiểm tra không thể bị quên.",
          "Bài sau viết pipeline đầu tiên."
        ]
      }
    ]
  },
  {
    "id": 1931,
    "slug": "viet-pipeline-dau-tien",
    "title": "CI/CD, Bài 2: Viết pipeline đầu tiên",
    "subtitle": "Sự kiện kích hoạt, job, bước, và những job chạy song song được.",
    "duration": "12 phút",
    "difficulty": "Trung bình",
    "emoji": "🛠️",
    "track": "professional",
    "whyItMatters": "Một tệp cấu hình vài chục dòng quyết định mọi thay đổi của cả đội được kiểm thế nào. Hiểu cấu trúc của nó - sự kiện nào kích hoạt, job nào phụ thuộc job nào - là điều kiện để đọc, sửa và làm nó nhanh hơn, thay vì chép một mẫu trên mạng rồi không dám đụng vào.",
    "openingQuestion": "Pipeline có bốn job: lint, test, build, deploy. Nếu không khai báo phụ thuộc, chúng chạy thế nào?",
    "openingOptions": [
      "Tuần tự theo thứ tự viết trong tệp, job sau chờ job trước xong",
      "Song song cùng lúc, nên deploy có thể chạy trước khi test xong",
      "Chỉ job đầu tiên chạy, các job còn lại chờ người bấm tay",
      "Theo thứ tự bảng chữ cái của tên job trong tệp cấu hình"
    ],
    "correctOption": 1,
    "explanation": "Trong phần lớn hệ CI, các job mặc định chạy song song trên các máy riêng. Muốn deploy chỉ chạy sau khi test và build xanh, phải khai báo phụ thuộc (needs trong GitHub Actions). Còn các bước (steps) bên trong một job thì chạy tuần tự trên cùng một máy. Hiểu nhầm điểm này dẫn tới những lần triển khai mã chưa qua kiểm thử.",
    "diagram": [
      {
        "label": "Sự kiện: push, pull_request, lịch chạy",
        "arrow": true
      },
      {
        "label": "Job: chạy trên một máy riêng, song song nếu không phụ thuộc",
        "arrow": true
      },
      {
        "label": "Bước trong job: tuần tự, dùng chung hệ thống tệp",
        "arrow": true
      },
      {
        "label": "needs: nối các job thành đồ thị phụ thuộc"
      }
    ],
    "realWorldExample": {
      "company": "Một kho mã mẫu được chép lại nhiều lần (tình huống minh hoạ)",
      "description": "Tệp pipeline mẫu có job deploy không khai báo needs. Nhóm chép về dùng suốt hai tháng mà không ai để ý, vì kiểm thử hầu như luôn xanh. Lần đầu tiên kiểm thử đỏ, bản lỗi vẫn lên production - deploy đã chạy xong song song từ trước."
    },
    "quiz": [
      {
        "question": "Các bước (steps) trong cùng một job có đặc điểm gì?",
        "options": [
          "Chạy song song trên nhiều máy để giảm tổng thời gian của job",
          "Chạy tuần tự trên cùng một máy và dùng chung hệ thống tệp",
          "Mỗi bước chạy trong một container riêng nên không chia sẻ được tệp",
          "Chỉ bước cuối cùng được phép truy cập mã nguồn đã được lấy về"
        ],
        "correct": 1,
        "explanation": "Bước lấy mã, bước cài thư viện, bước chạy kiểm thử cùng chạy trên một máy theo thứ tự, nên bước sau thấy tệp bước trước tạo ra. Giữa các job thì khác: mỗi job một máy mới, muốn chuyển tệp phải dùng artifact hoặc cache."
      },
      {
        "question": "Vì sao chạy CI trên sự kiện pull_request thay vì chỉ trên push vào nhánh chính?",
        "options": [
          "Vì sự kiện push không được hỗ trợ trong phần lớn các hệ thống CI",
          "Vì pull_request chạy nhanh hơn nhờ chỉ kiểm tra các tệp đã thay đổi",
          "Vì như thế lỗi được thấy trước khi gộp, không phải sau khi đã vào nhánh chính",
          "Vì sự kiện pull_request tự động sửa được các lỗi định dạng mà không cần người nào can thiệp"
        ],
        "correct": 2,
        "explanation": "Chạy sau khi đã gộp nghĩa là nhánh chính đã hỏng trong lúc bạn phát hiện. Chạy trên pull request đặt kết quả ngay cạnh thay đổi, trước khi nó chạm tới ai. Nhiều đội chạy cả hai: pull_request để chặn, push lên nhánh chính để dựng và triển khai."
      },
      {
        "question": "Ma trận (matrix) trong pipeline dùng để làm gì?",
        "options": [
          "Chạy cùng một job với nhiều tổ hợp tham số, như nhiều phiên bản ngôn ngữ",
          "Sắp xếp các job theo dạng bảng để dễ đọc hơn trong giao diện CI",
          "Tính toán ma trận phụ thuộc giữa các job để tìm ra thứ tự chạy tối ưu cho cả pipeline",
          "Chia nhỏ một kiểm thử lớn thành nhiều phần bằng nhau về thời gian"
        ],
        "correct": 0,
        "explanation": "matrix: { node: [20, 22] } nhân job thành hai bản chạy song song, mỗi bản một phiên bản Node. Hữu ích cho thư viện phải hỗ trợ nhiều phiên bản. Với ứng dụng chỉ chạy một phiên bản thì ma trận thường là tốn máy vô ích."
      },
      {
        "question": "Bước chạy kiểm thử thất bại nhưng job vẫn báo xanh. Nguyên nhân thường gặp?",
        "options": [
          "Hệ thống CI bị lỗi tạm thời và báo sai trạng thái của job",
          "Kiểm thử quá nhanh nên CI không kịp ghi nhận kết quả của nó",
          "Máy CI thiếu bộ nhớ nên bỏ qua kết quả của bước cuối cùng",
          "Lệnh trả mã thoát 0 dù có lỗi, ví dụ vì bị nối ống vào một lệnh khác"
        ],
        "correct": 3,
        "explanation": "CI chỉ biết bước hỏng qua mã thoát khác 0. npm test | tee log.txt trả mã của tee (thành công), không phải của npm test. Tập lệnh nuốt lỗi, hoặc || true để \"cho qua\", cũng vậy. Bật set -o pipefail và đừng để lệnh kiểm thử nằm giữa một ống."
      },
      {
        "question": "Job deploy chỉ nên chạy khi nào?",
        "options": [
          "Khi test và build đã xanh, trên nhánh chính, không phải trên mọi pull request",
          "Mỗi khi có bất kỳ ai đẩy mã lên bất kỳ nhánh nào của kho",
          "Song song với test để tiết kiệm thời gian cho cả đội phát triển",
          "Chỉ khi có người bấm nút tay, vì triển khai tự động lên production luôn là không an toàn"
        ],
        "correct": 0,
        "explanation": "needs: [test, build] cộng điều kiện chỉ chạy trên nhánh chính. Pull request thì kiểm tra, không triển khai lên production - nếu cần xem trước thì triển khai vào một môi trường xem thử riêng. Triển khai tự động là an toàn khi có các cổng này và có đường quay lại (Bài 5)."
      }
    ],
    "keyTakeaways": [
      "Job song song trên máy riêng; bước trong job tuần tự trên cùng máy.",
      "needs nối job thành đồ thị; thiếu nó thì deploy có thể chạy trước test.",
      "Chạy CI trên pull request để thấy lỗi trước khi gộp.",
      "CI chỉ biết lỗi qua mã thoát: cẩn thận ống và || true.",
      "Tổng thời gian pipeline là đường dài nhất trong đồ thị phụ thuộc."
    ],
    "practicePrompt": {
      "question": "lint (1 phút), test (5 phút), build (3 phút), deploy (2 phút); test và build chỉ cần lint, deploy cần cả hai. Tổng thời gian nhỏ nhất là bao nhiêu?",
      "options": [
        "11 phút (= 1 + 5 + 3 + 2, cộng tất cả vì các job chạy tuần tự)",
        "8 phút (= 1 + 5 + 2, test và build chạy song song sau lint)",
        "6 phút (= 1 + 3 + 2, lấy đường qua job build vì nó ngắn hơn)",
        "5 phút (= thời gian của job dài nhất, vì mọi job chạy song song)"
      ],
      "correct": 1,
      "explanation": "Sau lint, test và build chạy song song; deploy phải chờ cả hai, tức chờ cái lâu hơn là test. Đường dài nhất (đường tới hạn) là lint → test → deploy = 1 + 5 + 2 = 8 phút. Muốn nhanh hơn phải rút ngắn chính đường đó; rút ngắn build không giúp gì."
    },
    "summary": {
      "keyIdea": "Pipeline là một đồ thị job; thời gian của nó là đường dài nhất trong đồ thị.",
      "formula": "Sự kiện → job song song (nối bằng needs) → bước tuần tự; tổng = đường tới hạn.",
      "commonMistake": "Quên needs cho deploy, hoặc để lệnh kiểm thử trong ống làm mất mã thoát.",
      "action": "Vẽ đồ thị job của pipeline bạn đang có và đánh dấu đường tới hạn."
    },
    "application": {
      "title": "Làm ngay hôm nay",
      "message": "Mở tệp pipeline của dự án bạn và trả lời: job deploy có needs không, và có điều kiện nhánh không? Rồi cố ý làm hỏng một kiểm thử trên một nhánh thử để chắc rằng pipeline thật sự đỏ.",
      "secondary": "Bài sau: làm pipeline nhanh hơn bằng cache và song song."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Tệp pipeline trông như cấu hình, nhưng thực ra nó mô tả một đồ thị: những việc gì chạy, chạy trên máy nào, và cái gì phải chờ cái gì."
      },
      {
        "type": "code",
        "language": "text",
        "caption": "Một pipeline cho ứng dụng Node đóng gói bằng Docker",
        "code": "name: ci\non:\n  pull_request:\n  push:\n    branches: [main]\n\njobs:\n  lint:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with: { node-version: 22 }\n      - run: npm ci\n      - run: npm run lint && npm run typecheck\n\n  test:\n    needs: lint\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with: { node-version: 22 }\n      - run: npm ci\n      - run: npm test\n\n  build:\n    needs: lint\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: docker build -t api:${{ github.sha }} .\n\n  deploy:\n    needs: [test, build]\n    if: github.ref == 'refs/heads/main'\n    runs-on: ubuntu-latest\n    steps:\n      - run: echo \"triển khai api:${{ github.sha }}\""
      },
      {
        "type": "conceptTable",
        "title": "Từ vựng",
        "concepts": [
          {
            "vi": "Sự kiện",
            "en": "Trigger / on",
            "def": "Điều gì làm pipeline chạy: đẩy mã, mở pull request, lịch hằng đêm."
          },
          {
            "vi": "Job",
            "en": "Job",
            "def": "Một đơn vị chạy trên một máy riêng. Mặc định song song."
          },
          {
            "vi": "Bước",
            "en": "Step",
            "def": "Một lệnh trong job. Tuần tự, dùng chung hệ thống tệp."
          },
          {
            "vi": "Phụ thuộc",
            "en": "needs",
            "def": "Job này chỉ bắt đầu khi các job kia xanh."
          },
          {
            "vi": "Đường tới hạn",
            "en": "Critical path",
            "def": "Chuỗi phụ thuộc dài nhất; quyết định tổng thời gian."
          }
        ]
      },
      {
        "type": "exercise",
        "language": "javascript",
        "title": "Đường tới hạn của một pipeline",
        "task": "Mỗi job có thời gian (phút) và danh sách job phải chờ. tongThoiGian(jobs) trả về thời điểm job cuối cùng xong khi mọi job chạy song song ngay khi đủ điều kiện, cùng đường tới hạn (chuỗi job dài nhất). Mã hiện cộng thời gian mọi job như thể chạy tuần tự.",
        "starter": "const jobs = {\n  lint: { phut: 1, can: [] },\n  test: { phut: 5, can: [\"lint\"] },\n  build: { phut: 3, can: [\"lint\"] },\n  scan: { phut: 2, can: [\"build\"] },\n  deploy: { phut: 2, can: [\"test\", \"scan\"] },\n};\n\nfunction tongThoiGian(jobs) {\n  const tong = Object.values(jobs).reduce((s, j) => s + j.phut, 0);\n  return { tong, duong: Object.keys(jobs) };\n}\n\nconst kq = tongThoiGian(jobs);\nconsole.log(\"Tổng: \" + kq.tong + \" phút\");\nconsole.log(\"Đường tới hạn: \" + kq.duong.join(\" -> \"));",
        "solution": "const jobs = {\n  lint: { phut: 1, can: [] },\n  test: { phut: 5, can: [\"lint\"] },\n  build: { phut: 3, can: [\"lint\"] },\n  scan: { phut: 2, can: [\"build\"] },\n  deploy: { phut: 2, can: [\"test\", \"scan\"] },\n};\n\nfunction tongThoiGian(jobs) {\n  const xong = {}, truoc = {};\n  const tinh = (ten) => {\n    if (xong[ten] !== undefined) return xong[ten];\n    let batDau = 0;\n    for (const c of jobs[ten].can) {\n      const t = tinh(c);\n      if (t > batDau) { batDau = t; truoc[ten] = c; }\n    }\n    return (xong[ten] = batDau + jobs[ten].phut);\n  };\n  let cuoi = null;\n  for (const ten of Object.keys(jobs)) if (cuoi === null || tinh(ten) > xong[cuoi]) cuoi = ten;\n  const duong = [];\n  for (let j = cuoi; j; j = truoc[j]) duong.unshift(j);\n  return { tong: xong[cuoi], duong };\n}\n\nconst kq = tongThoiGian(jobs);\nconsole.log(\"Tổng: \" + kq.tong + \" phút\");\nconsole.log(\"Đường tới hạn: \" + kq.duong.join(\" -> \"));",
        "hints": [
          "Thời điểm xong của một job = thời điểm xong muộn nhất trong các job nó chờ, cộng thời gian của chính nó. Tính đệ quy.",
          "Ghi lại job nào là job chờ muộn nhất (truoc) để lần ngược ra đường tới hạn."
        ],
        "expectedOutput": "Tổng: 8 phút\nĐường tới hạn: lint -> test -> deploy"
      },
      {
        "type": "closing",
        "lines": [
          "Đọc pipeline như một đồ thị: cái gì song song, cái gì phải chờ, và đường nào dài nhất.",
          "Bài sau rút ngắn chính đường đó."
        ]
      }
    ]
  },
  {
    "id": 1932,
    "slug": "cache-va-song-song-trong-pipeline",
    "title": "CI/CD, Bài 3: Cache, song song và pipeline nhanh",
    "subtitle": "Mỗi lần chạy bắt đầu từ máy trống - trừ những thứ bạn chủ động mang theo, đúng cách.",
    "duration": "12 phút",
    "difficulty": "Trung bình",
    "emoji": "⚡",
    "track": "professional",
    "whyItMatters": "Máy sạch là điểm mạnh của CI, nhưng nó cũng có nghĩa là mỗi lần chạy phải tải lại mọi thư viện. Cache đúng cách cắt phần lớn thời gian đó; cache sai cách thì tệ hơn không có - nó đưa thư viện cũ vào lần chạy mới và làm CI xanh với một tổ hợp phiên bản không ai thật sự dùng.",
    "openingQuestion": "Cache thư viện được đặt khoá theo tên nhánh. Rủi ro là gì?",
    "openingOptions": [
      "Cache không bao giờ được dùng lại vì mỗi lần chạy lại tạo một nhánh mới",
      "Mỗi nhánh cần một bản cache riêng nên tốn quá nhiều dung lượng lưu trữ",
      "Thêm hay nâng thư viện mà khoá không đổi, nên CI chạy với thư viện cũ",
      "Hai nhánh cùng tên ở hai kho mã khác nhau sẽ dùng nhầm cache của nhau"
    ],
    "correctOption": 2,
    "explanation": "Khoá cache phải đổi đúng khi thứ bên trong cần đổi. Thư viện được quyết định bởi tệp khoá (package-lock.json), không phải tên nhánh. Đặt khoá bằng giá trị băm của tệp khoá thì nâng một thư viện là đổi khoá, cache cũ không được dùng; còn khi tệp khoá giữ nguyên - phần lớn các lần - cache trúng và tiết kiệm được vài phút.",
    "diagram": [
      {
        "label": "Tính khoá cache từ giá trị băm của tệp khoá",
        "arrow": true
      },
      {
        "label": "Trúng: khôi phục thư viện, bỏ qua tải lại",
        "arrow": true
      },
      {
        "label": "Trượt: cài từ đầu, lưu cache với khoá mới",
        "arrow": true
      },
      {
        "label": "Chia kiểm thử ra nhiều máy chạy song song"
      }
    ],
    "realWorldExample": {
      "company": "Pipeline của một kho mã lớn (tình huống minh hoạ)",
      "description": "CI mất 25 phút. Đo từng bước cho thấy 9 phút là cài thư viện, 12 phút là kiểm thử chạy trên một máy. Cache theo băm tệp khoá đưa bước cài xuống 40 giây; chia kiểm thử ra bốn máy đưa phần kiểm thử xuống khoảng 3 phút rưỡi. Tổng còn dưới 7 phút, không bỏ một kiểm thử nào."
    },
    "quiz": [
      {
        "question": "Trước khi tối ưu pipeline, việc đầu tiên nên làm là gì?",
        "options": [
          "Nâng cấp lên loại máy CI mạnh nhất mà nhà cung cấp đang có",
          "Đo thời gian từng bước để biết thời gian thật sự đi đâu",
          "Bỏ bớt các kiểm thử chạy lâu nhất ra khỏi pipeline chính",
          "Chuyển toàn bộ pipeline sang một nhà cung cấp CI khác nhanh hơn"
        ],
        "correct": 1,
        "explanation": "Nguyên tắc ở chặng hiệu năng áp dụng y nguyên: đo trước, đoán sau. Rất thường gặp là một bước không ai nghĩ tới - tải một image lớn, cài một công cụ toàn cục - chiếm phần lớn thời gian. Bỏ kiểm thử là tối ưu sai thứ: nhanh hơn vì bảo vệ ít hơn."
      },
      {
        "question": "Nên cache thư mục nào của một dự án Node?",
        "options": [
          "Thư mục node_modules, để khỏi phải chạy lại lệnh cài thư viện trong mỗi lần chạy CI",
          "Bộ nhớ đệm tải gói của npm, rồi vẫn chạy npm ci để cài đúng theo tệp khoá",
          "Toàn bộ thư mục dự án, gồm cả mã nguồn và kết quả kiểm thử",
          "Không nên cache gì cả, vì cache luôn làm kết quả CI sai lệch"
        ],
        "correct": 1,
        "explanation": "npm ci xoá node_modules và cài đúng theo tệp khoá; nó nhanh khi các gói đã có sẵn trong bộ nhớ đệm tải (~/.npm). Cache node_modules trực tiếp dễ mang theo trạng thái lệch - gói cài từ một lần chạy khác, phần biên dịch cho hệ điều hành khác. Cache thứ tải về, và vẫn cài lại cho đúng."
      },
      {
        "question": "Chia kiểm thử ra 4 máy song song. Vì sao tổng thời gian thường không giảm đúng 4 lần?",
        "options": [
          "Vì các máy CI dùng chung một bộ xử lý vật lý nên đều chạy chậm lại khi song song",
          "Vì kiểm thử không thể thật sự chạy song song trừ khi được viết bằng một ngôn ngữ đặc biệt",
          "Vì mỗi máy vẫn phải cài đặt riêng, và nhóm kiểm thử chậm nhất quyết định tổng",
          "Vì hệ thống CI giới hạn mỗi pipeline chỉ được dùng tối đa hai máy chạy cùng lúc"
        ],
        "correct": 2,
        "explanation": "Mỗi máy trả chi phí cố định (lấy mã, khôi phục cache, khởi động) và pipeline chờ máy chậm nhất. Chia theo số tệp thì một máy có thể nhận hết các kiểm thử chậm. Chia theo thời gian chạy lần trước cân bằng hơn nhiều."
      },
      {
        "question": "Chỉ chạy kiểm thử liên quan tới tệp đã đổi. Điều kiện để việc này an toàn là gì?",
        "options": [
          "Đồ thị phụ thuộc giữa các mô-đun phải đúng, và vẫn chạy đủ bộ trên nhánh chính",
          "Chỉ cần đặt tên tệp kiểm thử giống với tên tệp mã nguồn tương ứng",
          "Không cần điều kiện gì thêm, vì kiểm thử của các tệp khác không bao giờ bị thay đổi này ảnh hưởng",
          "Kho mã phải có ít hơn một trăm tệp để công cụ tính được phụ thuộc"
        ],
        "correct": 0,
        "explanation": "Sửa một hàm tiện ích dùng chung có thể làm hỏng kiểm thử ở mười mô-đun khác. Công cụ chọn kiểm thử phải biết ai dùng ai; khi không chắc, nó phải chọn thừa chứ không chọn thiếu. Chạy đủ bộ trên nhánh chính là lưới an toàn cho những lần nó chọn sai."
      },
      {
        "question": "Hai pull request đẩy liên tiếp lên cùng một nhánh trong vòng một phút. Cấu hình hợp lý?",
        "options": [
          "Chạy đủ cả hai lần để có lịch sử kết quả đầy đủ cho từng commit",
          "Chờ cả hai chạy xong rồi mới cho phép đẩy tiếp lần thứ ba",
          "Chạy lần thứ hai trên cùng máy với lần đầu để dùng lại bộ nhớ",
          "Huỷ lần chạy cũ khi có lần chạy mới trên cùng nhánh"
        ],
        "correct": 3,
        "explanation": "Kết quả của commit đã bị thay thế không còn ai cần. Cấu hình concurrency với cancel-in-progress huỷ lần chạy cũ, giải phóng máy và trả kết quả của commit mới sớm hơn. Ngoại lệ là nhánh chính và job triển khai: ở đó thường nên xếp hàng thay vì huỷ."
      }
    ],
    "keyTakeaways": [
      "Đo từng bước trước khi tối ưu.",
      "Khoá cache theo băm tệp khoá, không theo tên nhánh.",
      "Cache thứ tải về, vẫn cài lại theo tệp khoá.",
      "Chia kiểm thử theo thời gian chạy, không theo số tệp.",
      "Huỷ lần chạy cũ trên cùng nhánh khi có commit mới."
    ],
    "practicePrompt": {
      "question": "Sau khi thêm cache, CI xanh nhưng trên máy mới của đồng nghiệp npm ci báo lỗi xung đột phiên bản. Nguyên nhân khả dĩ nhất?",
      "options": [
        "Máy của đồng nghiệp dùng hệ điều hành khác nên không cài được các thư viện",
        "Cache node_modules đưa thư viện cũ vào CI, che đi việc tệp khoá đã hỏng",
        "npm ci luôn lỗi trên máy mới cho tới khi chạy npm install ít nhất một lần",
        "Hệ thống CI dùng một bản npm được sửa đổi riêng, khác với bản thông thường"
      ],
      "correct": 1,
      "explanation": "Khi node_modules được khôi phục nguyên từ cache, CI không còn thật sự cài theo tệp khoá, nên một tệp khoá hỏng vẫn xanh. Máy mới không có cache nên lộ lỗi. Cache thứ tải về và luôn chạy npm ci thì CI kiểm đúng thứ một máy mới sẽ làm."
    },
    "summary": {
      "keyIdea": "Cache đúng làm CI nhanh; cache sai làm CI nói dối.",
      "formula": "Pipeline nhanh = đo + cache theo băm tệp khoá + chia theo thời gian + huỷ lần chạy cũ.",
      "commonMistake": "Khoá cache theo tên nhánh, hoặc khôi phục nguyên node_modules thay vì cài lại.",
      "action": "Ghi thời gian từng bước của pipeline bạn và tìm bước chiếm nhiều nhất."
    },
    "application": {
      "title": "Làm ngay hôm nay",
      "message": "Mở lần chạy CI gần nhất và ghi thời gian từng bước vào một bảng. Nếu bước cài thư viện chiếm hơn một phần tư, kiểm khoá cache của nó có dựa trên tệp khoá không.",
      "secondary": "Bài sau: bí mật và quyền trong pipeline."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Mỗi phút pipeline chờ được nhân với mọi lần đẩy mã của cả đội. Rút ngắn nó là việc đáng làm - miễn là không rút bằng cách bỏ bớt thứ nó kiểm."
      },
      {
        "type": "code",
        "language": "text",
        "caption": "Cache theo băm tệp khoá, huỷ lần chạy cũ, chia kiểm thử",
        "code": "concurrency:\n  group: ci-${{ github.ref }}\n  cancel-in-progress: ${{ github.ref != 'refs/heads/main' }}\n\njobs:\n  test:\n    runs-on: ubuntu-latest\n    strategy:\n      matrix: { shard: [1, 2, 3, 4] }\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/cache@v4\n        with:\n          path: ~/.npm                                   # thứ tải về, không phải node_modules\n          key: npm-${{ hashFiles('package-lock.json') }}  # đổi khi thư viện đổi\n      - run: npm ci\n      - run: npx vitest run --shard=${{ matrix.shard }}/4"
      },
      {
        "type": "heading",
        "text": "Bốn đòn bẩy, theo thứ tự nên thử"
      },
      {
        "type": "list",
        "items": [
          "Đo: ghi thời gian từng bước; tối ưu bước chiếm nhiều nhất.",
          "Cache đúng khoá: băm tệp khoá cho thư viện, băm Dockerfile và tệp khoá cho lớp image.",
          "Song song: tách job độc lập, chia kiểm thử ra nhiều máy theo thời gian chạy.",
          "Làm ít hơn một cách an toàn: huỷ lần chạy bị thay thế, chọn kiểm thử theo phụ thuộc trên pull request."
        ]
      },
      {
        "type": "exercise",
        "language": "javascript",
        "title": "Khoá cache: trúng khi nên trúng, trượt khi nên trượt",
        "task": "Viết khoaCache(lanChay) để cache trúng khi và chỉ khi tệp khoá giống lần đã lưu. Mỗi lần chạy có nhánh và nội dung package-lock. Hàm bam có sẵn. Mã hiện dùng tên nhánh làm khoá: lần nâng thư viện trên cùng nhánh vẫn trúng cache cũ (sai), còn nhánh mới với cùng tệp khoá thì trượt (phí). In trúng/trượt và cảnh báo khi cache trúng mà thư viện đã đổi.",
        "starter": "const bam = (s) => { let h = 0; for (const c of s) h = (h * 31 + c.charCodeAt(0)) >>> 0; return h.toString(16); };\nconst lanChay = [\n  { nhanh: \"main\", lock: \"react@18 vite@5\" },\n  { nhanh: \"sua-nut\", lock: \"react@18 vite@5\" },\n  { nhanh: \"sua-nut\", lock: \"react@19 vite@5\" },\n  { nhanh: \"main\", lock: \"react@18 vite@5\" },\n];\n\nfunction khoaCache(lan) { return \"npm-\" + lan.nhanh; }\n\nconst kho = new Map();\nfor (const lan of lanChay) {\n  const k = khoaCache(lan);\n  const trung = kho.has(k);\n  const lech = trung && kho.get(k) !== lan.lock;\n  console.log(lan.nhanh + \" \" + lan.lock + \": \" + (trung ? \"trúng\" : \"trượt\") + (lech ? \" - CẢNH BÁO: thư viện cũ\" : \"\"));\n  if (!trung) kho.set(k, lan.lock);\n}",
        "solution": "const bam = (s) => { let h = 0; for (const c of s) h = (h * 31 + c.charCodeAt(0)) >>> 0; return h.toString(16); };\nconst lanChay = [\n  { nhanh: \"main\", lock: \"react@18 vite@5\" },\n  { nhanh: \"sua-nut\", lock: \"react@18 vite@5\" },\n  { nhanh: \"sua-nut\", lock: \"react@19 vite@5\" },\n  { nhanh: \"main\", lock: \"react@18 vite@5\" },\n];\n\nfunction khoaCache(lan) { return \"npm-\" + bam(lan.lock); }\n\nconst kho = new Map();\nfor (const lan of lanChay) {\n  const k = khoaCache(lan);\n  const trung = kho.has(k);\n  const lech = trung && kho.get(k) !== lan.lock;\n  console.log(lan.nhanh + \" \" + lan.lock + \": \" + (trung ? \"trúng\" : \"trượt\") + (lech ? \" - CẢNH BÁO: thư viện cũ\" : \"\"));\n  if (!trung) kho.set(k, lan.lock);\n}",
        "hints": [
          "Thứ quyết định nội dung cache là tệp khoá, không phải nhánh.",
          "Khoá = tiền tố + bam(lan.lock)."
        ],
        "expectedOutput": "main react@18 vite@5: trượt\nsua-nut react@18 vite@5: trúng\nsua-nut react@19 vite@5: trượt\nmain react@18 vite@5: trúng"
      },
      {
        "type": "closing",
        "lines": [
          "Nhanh bằng cách làm ít việc thừa, không bằng cách kiểm ít hơn.",
          "Bài sau nói về thứ nguy hiểm nhất trong pipeline: bí mật."
        ]
      }
    ]
  },
  {
    "id": 1933,
    "slug": "bi-mat-va-quyen-trong-pipeline",
    "title": "CI/CD, Bài 4: Bí mật và quyền trong pipeline",
    "subtitle": "Pipeline chạy mã của bất kỳ ai mở được pull request - kể cả người lạ.",
    "duration": "12 phút",
    "difficulty": "Khó",
    "emoji": "🔑",
    "track": "professional",
    "whyItMatters": "Pipeline giữ những chìa khoá quý nhất: quyền đẩy image lên kho, quyền triển khai lên production, khoá dịch vụ đám mây. Đồng thời nó chạy mã mà ai cũng sửa được qua một pull request. Ghép hai điều đó sai cách là mở cửa cho người lạ dùng chìa khoá của bạn - một trong những con đường tấn công chuỗi cung ứng phổ biến nhất.",
    "openingQuestion": "Một người lạ fork kho mã công khai của bạn và mở pull request sửa tệp kiểm thử. Pipeline có nên chạy với các bí mật triển khai không?",
    "openingOptions": [
      "Có, vì kiểm thử cần đủ môi trường giống production để có kết quả đúng",
      "Có, nếu bí mật đã được che kỹ trong nhật ký để người lạ không đọc được",
      "Không, vì mã của họ có thể gửi bí mật ra ngoài trước khi ai kịp đọc",
      "Không, vì pull request mở từ một fork không thể chạy pipeline nào cả"
    ],
    "correctOption": 2,
    "explanation": "Người mở pull request quyết định mã chạy trong pipeline, kể cả tệp kiểm thử và tập lệnh cài đặt. Nếu bí mật có mặt, một dòng curl gửi chúng về máy của họ là đủ - che trong nhật ký không ngăn được việc gửi đi. Vì vậy các hệ CI mặc định không đưa bí mật vào pull request từ fork. Việc cần bí mật (triển khai, đẩy image) chỉ chạy sau khi mã đã được duyệt và gộp.",
    "diagram": [
      {
        "label": "Pull request: chạy kiểm tra, không có bí mật",
        "arrow": true
      },
      {
        "label": "Duyệt và gộp vào nhánh chính",
        "arrow": true
      },
      {
        "label": "Job triển khai: bí mật của môi trường, quyền tối thiểu",
        "arrow": true
      },
      {
        "label": "Ưu tiên mã thông báo ngắn hạn thay cho khoá dài hạn"
      }
    ],
    "realWorldExample": {
      "company": "Một thư viện mã nguồn mở phổ biến (tình huống minh hoạ)",
      "description": "Pipeline dùng một sự kiện chạy với quyền của kho gốc cho mọi pull request, để tiện bình luận kết quả lên PR. Một kẻ tấn công mở PR sửa tập lệnh cài đặt, lấy được mã thông báo có quyền phát hành gói, và đẩy một phiên bản chứa mã độc tới hàng nghìn dự án phụ thuộc."
    },
    "quiz": [
      {
        "question": "Tính năng che bí mật trong nhật ký CI bảo vệ được gì, và không bảo vệ được gì?",
        "options": [
          "Bảo vệ hoàn toàn, vì bí mật đã che thì mã không đọc được giá trị thật",
          "Chặn giá trị hiện nguyên văn trong nhật ký, không chặn mã gửi nó ra ngoài",
          "Chỉ bảo vệ khi nhật ký được đặt ở chế độ riêng tư trong kho mã",
          "Không bảo vệ được gì, vì che bí mật chỉ là tính năng hiển thị"
        ],
        "correct": 1,
        "explanation": "Che bí mật thay chuỗi khớp bằng *** khi in ra nhật ký. Mã vẫn đọc được giá trị thật, gửi nó qua mạng, hoặc in ra ở dạng biến đổi (base64, chèn dấu cách) mà bộ che không nhận ra. Nó là một lớp giảm thiểu, không phải ranh giới."
      },
      {
        "question": "Vì sao nên đặt quyền mặc định của mã thông báo CI là chỉ đọc?",
        "options": [
          "Vì mã thông báo có quyền ghi làm cả pipeline chạy chậm hơn một cách đáng kể",
          "Vì hệ thống CI tính phí theo số lượng quyền được cấp cho mỗi lần chạy pipeline",
          "Vì quyền chỉ đọc là đủ cho mọi việc trong pipeline, kể cả triển khai và phát hành gói",
          "Vì mỗi job chỉ nên có quyền nó cần, nên job bị chiếm thì thiệt hại nhỏ"
        ],
        "correct": 3,
        "explanation": "Nguyên tắc quyền tối thiểu. Job chạy kiểm thử không cần quyền đẩy mã hay tạo bản phát hành. Đặt permissions: contents: read ở đầu tệp, rồi cấp thêm đúng quyền cho đúng job cần - job phát hành cần ghi, job kiểm thử thì không."
      },
      {
        "question": "Dùng một action của bên thứ ba theo thẻ @v2 có rủi ro gì?",
        "options": [
          "Thẻ có thể bị gán lại sang mã khác; ghim theo mã commit mới chắc chắn",
          "Thẻ v2 luôn là bản thử nghiệm nên có thể chạy không ổn định",
          "Action của bên thứ ba không được chạy trên máy CI của nhà cung cấp",
          "Không có rủi ro gì, vì mọi action đều được nhà cung cấp CI kiểm duyệt"
        ],
        "correct": 0,
        "explanation": "Action là mã chạy trong pipeline với quyền và bí mật của bạn. Thẻ là con trỏ có thể dời: nếu tài khoản của tác giả bị chiếm, @v2 có thể trỏ sang mã độc ngay hôm sau. Ghim theo mã commit đầy đủ nghĩa là bạn chạy đúng mã đã đọc, và nâng cấp có chủ đích."
      },
      {
        "question": "Thay khoá truy cập đám mây dài hạn trong bí mật CI bằng gì thì an toàn hơn?",
        "options": [
          "Mã hoá khoá bằng base64 trước khi lưu vào phần bí mật của CI",
          "Chia khoá làm hai phần và lưu ở hai bí mật khác nhau trong CI",
          "Mã thông báo ngắn hạn cấp cho đúng lần chạy qua liên kết định danh (OIDC)",
          "Lưu khoá trong một tệp đã được mã hoá cẩn thận, đặt ngay trong kho mã của dự án"
        ],
        "correct": 2,
        "explanation": "Với liên kết định danh, nhà cung cấp đám mây tin định danh của lần chạy CI (kho nào, nhánh nào) và cấp một mã thông báo sống vài phút. Không có khoá dài hạn nào để lộ; mã thông báo bị lấy cũng hết hạn gần như ngay. Và có thể ràng buộc chỉ nhánh chính mới được cấp quyền triển khai."
      },
      {
        "question": "Bí mật của môi trường production nên gắn với cái gì trong CI?",
        "options": [
          "Với toàn bộ kho mã, để mọi job đều dùng được khi cần thiết",
          "Với một môi trường có luật bảo vệ, chỉ job triển khai từ nhánh chính dùng được",
          "Với tài khoản cá nhân của trưởng nhóm, để chỉ duy nhất người đó triển khai được lên production",
          "Với từng pull request, để mỗi người tự cung cấp bí mật của riêng mình"
        ],
        "correct": 1,
        "explanation": "Môi trường (environment) trong CI cho phép gắn bí mật kèm luật: chỉ nhánh chính, có thể yêu cầu người duyệt trước khi chạy. Nhờ vậy một job khác hay một nhánh thử nghiệm không thể đọc bí mật production, dù cùng kho mã."
      }
    ],
    "keyTakeaways": [
      "Mã trong pull request là mã của người mở nó: không đưa bí mật vào đó.",
      "Che trong nhật ký là lớp giảm thiểu, không phải ranh giới.",
      "Quyền mặc định chỉ đọc; cấp thêm đúng cho job cần.",
      "Ghim action bên thứ ba theo mã commit.",
      "Ưu tiên mã thông báo ngắn hạn và bí mật gắn với môi trường có bảo vệ."
    ],
    "practicePrompt": {
      "question": "Bạn cần bình luận kết quả kiểm thử lên pull request từ fork, việc cần quyền ghi. Cách an toàn nhất?",
      "options": [
        "Cho job kiểm thử chạy với quyền của kho gốc để nó tự bình luận được kết quả lên pull request của họ",
        "Chạy kiểm thử không quyền, lưu kết quả; một job riêng có quyền chỉ đọc kết quả rồi bình luận",
        "Tắt hẳn CI cho pull request từ fork và kiểm thử tay trên máy mình",
        "Tạo một mã thông báo có quyền ghi và dán thẳng vào tệp pipeline"
      ],
      "correct": 1,
      "explanation": "Tách hai việc: job chạy mã của người lạ không có quyền gì, chỉ tạo ra kết quả; job có quyền không chạy mã của họ, chỉ đọc kết quả dạng dữ liệu và bình luận. Chạy mã người lạ với quyền kho gốc chính là lỗ hổng trong ví dụ đầu bài."
    },
    "summary": {
      "keyIdea": "Tách mã không tin cậy khỏi quyền: pull request thì kiểm, nhánh chính mới có chìa khoá.",
      "formula": "An toàn = không bí mật cho PR từ fork + quyền tối thiểu + ghim action + mã thông báo ngắn hạn.",
      "commonMistake": "Chạy mã từ pull request với quyền và bí mật của kho gốc cho tiện.",
      "action": "Đọc lại phần permissions và các sự kiện kích hoạt trong tệp pipeline của bạn."
    },
    "application": {
      "title": "Làm ngay hôm nay",
      "message": "Tìm trong tệp pipeline mọi action bên thứ ba và ghi lại chúng đang ghim theo thẻ hay theo mã commit. Thêm permissions: contents: read ở đầu tệp và xem job nào thật sự cần hơn.",
      "secondary": "Bài sau: triển khai tự động và quay lại khi hỏng."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Pipeline là nơi hiếm hoi mà mã do người khác viết chạy cạnh những chìa khoá quan trọng nhất của bạn. Bài này nói về cách giữ hai thứ đó tách nhau."
      },
      {
        "type": "code",
        "language": "text",
        "caption": "Quyền tối thiểu, môi trường có bảo vệ, action ghim theo commit",
        "code": "permissions:\n  contents: read                    # mặc định cho mọi job: chỉ đọc\n\njobs:\n  test:                             # chạy cả với pull request từ fork: không bí mật\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683   # ghim theo commit\n      - run: npm ci && npm test\n\n  deploy:\n    if: github.ref == 'refs/heads/main'\n    needs: test\n    environment: production         # bí mật gắn với môi trường, có luật bảo vệ\n    permissions:\n      contents: read\n      id-token: write               # xin mã thông báo ngắn hạn qua OIDC\n    runs-on: ubuntu-latest\n    steps:\n      - run: ./trien-khai.sh"
      },
      {
        "type": "heading",
        "text": "Ai viết mã đang chạy?"
      },
      {
        "type": "comparison",
        "left": {
          "label": "Pull request",
          "text": "Mã do người mở PR quyết định, kể cả khi họ là người lạ. Chỉ chạy kiểm tra, không bí mật, quyền chỉ đọc."
        },
        "right": {
          "label": "Nhánh chính",
          "text": "Mã đã được duyệt và gộp. Được dùng bí mật của môi trường, và chỉ đúng job cần."
        }
      },
      {
        "type": "callout",
        "label": "Tệp khác cũng là mã",
        "text": "Người mở PR không cần sửa tệp pipeline để chạy mã của họ: tập lệnh trong package.json, tệp cấu hình của công cụ kiểm thử, một Makefile - tất cả đều được chạy. Vì vậy \"PR không đụng tới tệp pipeline\" không phải là lý do để tin nó."
      },
      {
        "type": "exercise",
        "language": "javascript",
        "title": "Che bí mật trong nhật ký, và giới hạn của nó",
        "task": "cheLog(dong, biMat) phải thay MỌI lần xuất hiện của từng bí mật bằng ***, kể cả dạng đã mã hoá URL của nó (encodeURIComponent) - dạng mà mật khẩu có ký tự đặc biệt mang khi nằm trong chuỗi kết nối. Mã hiện dùng replace nên chỉ che lần đầu, và bỏ sót dạng mã hoá. Dòng cuối in số dòng còn lộ; sau khi sửa phải là 0 - nhưng nhớ rằng che trong nhật ký không ngăn được mã gửi bí mật ra ngoài.",
        "starter": "const biMat = [\"sk_live_9f8e7d\", \"p@ss/w0rd!\"];\nconst log = [\n  \"Gọi API với sk_live_9f8e7d, thử lại với sk_live_9f8e7d\",\n  \"Kết nối postgres://app:\" + encodeURIComponent(\"p@ss/w0rd!\") + \"@db:5432/app\",\n  \"Mật khẩu thô: p@ss/w0rd!\",\n  \"Kiểm thử xong: 128 đạt\",\n];\n\nfunction cheLog(dong, biMat) {\n  let kq = dong;\n  for (const b of biMat) kq = kq.replace(b, \"***\");\n  return kq;\n}\n\nconst daChe = log.map((d) => cheLog(d, biMat));\ndaChe.forEach((d) => console.log(d));\nconst conLo = daChe.filter((d) => biMat.some((b) => d.includes(b) || d.includes(encodeURIComponent(b)))).length;\nconsole.log(\"Dòng còn lộ: \" + conLo);",
        "solution": "const biMat = [\"sk_live_9f8e7d\", \"p@ss/w0rd!\"];\nconst log = [\n  \"Gọi API với sk_live_9f8e7d, thử lại với sk_live_9f8e7d\",\n  \"Kết nối postgres://app:\" + encodeURIComponent(\"p@ss/w0rd!\") + \"@db:5432/app\",\n  \"Mật khẩu thô: p@ss/w0rd!\",\n  \"Kiểm thử xong: 128 đạt\",\n];\n\nfunction cheLog(dong, biMat) {\n  let kq = dong;\n  for (const b of biMat) {\n    kq = kq.replaceAll(b, \"***\");\n    kq = kq.replaceAll(encodeURIComponent(b), \"***\");\n  }\n  return kq;\n}\n\nconst daChe = log.map((d) => cheLog(d, biMat));\ndaChe.forEach((d) => console.log(d));\nconst conLo = daChe.filter((d) => biMat.some((b) => d.includes(b) || d.includes(encodeURIComponent(b)))).length;\nconsole.log(\"Dòng còn lộ: \" + conLo);",
        "hints": [
          "replace với chuỗi chỉ thay lần đầu tiên; dùng replaceAll.",
          "Che thêm dạng encodeURIComponent(b): p@ss/w0rd! trong URL thành p%40ss%2Fw0rd!, và bộ che chỉ tìm chuỗi thô sẽ bỏ qua nó."
        ],
        "expectedOutput": "Gọi API với ***, thử lại với ***\nKết nối postgres://app:***@db:5432/app\nMật khẩu thô: ***\nKiểm thử xong: 128 đạt\nDòng còn lộ: 0"
      },
      {
        "type": "closing",
        "lines": [
          "Chìa khoá chỉ đi theo mã đã được duyệt, và chỉ cho đúng job cần.",
          "Bài sau đưa mã đã duyệt tới người dùng - và kéo nó về khi hỏng."
        ]
      }
    ]
  },
  {
    "id": 1934,
    "slug": "trien-khai-tu-dong-canary-va-quay-lai",
    "title": "CI/CD, Bài 5: Triển khai tự động, canary và quay lại",
    "subtitle": "Đưa bản mới tới một phần nhỏ người dùng trước, để một lỗi chỉ chạm tới một phần nhỏ.",
    "duration": "13 phút",
    "difficulty": "Khó",
    "emoji": "🐤",
    "track": "professional",
    "whyItMatters": "Kiểm thử tốt đến đâu cũng có lỗi chỉ lộ ra với dữ liệu và lưu lượng thật. Câu hỏi không phải là có lỗi lọt qua không, mà là khi nó lọt qua thì bao nhiêu người bị ảnh hưởng và bao lâu mới quay lại được. Triển khai dần kèm đo đạc tự động và quay lại một bước biến một sự cố toàn hệ thống thành một đoạn biểu đồ nhỏ.",
    "openingQuestion": "Bản mới đưa tới 5% lưu lượng. Sau 10 phút, tỷ lệ lỗi của nhóm 5% là 0,8%, nhóm còn lại 0,5%. Nên làm gì?",
    "openingOptions": [
      "Đưa lên 100% ngay, vì 0,8% vẫn là tỷ lệ lỗi rất thấp trong thực tế",
      "Quay lại ngay lập tức, vì bất kỳ mức tăng nào cũng là dấu hiệu có lỗi",
      "Giữ ở 5% lâu hơn, vì ở mức này chênh lệch có thể chỉ là dao động ngẫu nhiên",
      "Tăng lên 50% để có thêm dữ liệu trước khi đưa ra quyết định cuối cùng"
    ],
    "correctOption": 2,
    "explanation": "Quyết định phải dựa trên so sánh, không dựa trên con số tuyệt đối: 0,8% là thấp nhưng cao hơn nhóm đối chứng 60%. Với 5% lưu lượng trong 10 phút, số yêu cầu có thể quá ít để chênh lệch đó có ý nghĩa - vài lỗi ngẫu nhiên là đủ tạo ra nó. Hệ thống canary tốt đặt số yêu cầu tối thiểu trước khi phán xét, rồi mới tăng hoặc quay lại. Tăng lên 50% khi còn nghi ngờ là đưa rủi ro tới gấp mười lần số người.",
    "diagram": [
      {
        "label": "Triển khai bản mới cho một phần nhỏ lưu lượng",
        "arrow": true
      },
      {
        "label": "So chỉ số với nhóm đối chứng, đủ số yêu cầu tối thiểu",
        "arrow": true
      },
      {
        "label": "Tốt thì tăng dần: 5% → 25% → 100%",
        "arrow": true
      },
      {
        "label": "Xấu thì quay lại tự động, không chờ người"
      }
    ],
    "realWorldExample": {
      "company": "Dịch vụ thanh toán của một sàn thương mại (tình huống minh hoạ)",
      "description": "Một thay đổi làm hỏng đường thanh toán cho một loại thẻ hiếm. Kiểm thử không có ca đó. Canary ở 5% phát hiện tỷ lệ lỗi thanh toán tăng sau 12 phút và tự quay lại. Tổng cộng vài chục giao dịch bị ảnh hưởng - thay vì toàn bộ khách dùng loại thẻ đó trong một buổi tối."
    },
    "quiz": [
      {
        "question": "Vì sao \"quay lại\" nên là triển khai lại image cũ đã có sẵn thay vì dựng lại từ commit cũ?",
        "options": [
          "Vì dựng lại từ commit cũ sẽ tạo ra một image có kích thước lớn hơn",
          "Vì image cũ đã chạy thật và đã có sẵn, quay lại chỉ mất vài giây",
          "Vì hệ thống CI không cho phép dựng lại từ một commit đã được gộp",
          "Vì commit cũ luôn bị xoá khỏi lịch sử sau mỗi lần triển khai mới"
        ],
        "correct": 1,
        "explanation": "Dựng lại có thể ra thứ khác (thư viện mới, image nền mới) và mất nhiều phút - đúng những phút đang có sự cố. Image cũ được gắn thẻ theo commit (Bài 6 chặng Docker) và vẫn nằm trên kho: quay lại chỉ là trỏ về nó."
      },
      {
        "question": "Thay đổi nào khiến việc quay lại bằng image cũ KHÔNG còn an toàn?",
        "options": [
          "Thay đổi màu sắc của một nút bấm trên giao diện người dùng",
          "Thêm một đường dẫn API mới mà hiện tại chưa có ai gọi tới cả",
          "Xoá một cột trong cơ sở dữ liệu mà bản cũ vẫn còn đọc tới",
          "Sửa nội dung một thông báo lỗi đang hiển thị cho người dùng"
        ],
        "correct": 2,
        "explanation": "Mã quay lại được, dữ liệu thì không (bài quy trình phát hành ở chặng triển khai). Bản cũ đọc cột đã bị xoá sẽ hỏng ngay. Vì vậy thay đổi cấu trúc dữ liệu đi theo kiểu mở rộng rồi thu hẹp: thêm cột mới, chạy cả hai, chỉ xoá cột cũ ở một lần triển khai sau khi chắc không cần quay lại."
      },
      {
        "question": "Canary nên được so với cái gì để quyết định?",
        "options": [
          "Với phần lưu lượng còn chạy bản cũ trong cùng khoảng thời gian",
          "Với mục tiêu tỷ lệ lỗi cố định mà đội đã tự đặt ra từ trước đó",
          "Với số liệu của cùng giờ này vào tuần trước để loại trừ yếu tố thời gian",
          "Với ý kiến của nhóm hỗ trợ khách hàng sau khi họ đã kiểm tra thủ công"
        ],
        "correct": 0,
        "explanation": "Lưu lượng thay đổi theo giờ, theo ngày, theo sự kiện. So với bản cũ chạy song song cùng lúc loại được những yếu tố đó: hai nhóm cùng gặp cùng một thế giới, khác nhau đúng ở phiên bản. Ngưỡng cố định bỏ lỡ những lần tăng tương đối lớn nhưng tuyệt đối còn thấp."
      },
      {
        "question": "Triển khai xanh-lam (blue-green) khác canary thế nào?",
        "options": [
          "Xanh-lam chỉ dùng cho ứng dụng web, còn canary dùng cho ứng dụng di động",
          "Xanh-lam triển khai lên máy thật, còn canary chỉ triển khai lên máy thử nghiệm",
          "Hai cách hoàn toàn giống nhau, chỉ khác tên gọi giữa các nhà cung cấp",
          "Xanh-lam dựng đủ môi trường mới rồi chuyển toàn bộ lưu lượng một lần"
        ],
        "correct": 3,
        "explanation": "Xanh-lam có hai môi trường đầy đủ; chuyển lưu lượng từ cái này sang cái kia một lần, và quay lại bằng cách chuyển ngược. Nhanh và đơn giản, nhưng khi chuyển thì mọi người dùng nhận bản mới cùng lúc. Canary tăng dần, nên lỗi chỉ chạm tới một phần nhỏ trước. Hai cách có thể kết hợp."
      },
      {
        "question": "Vì sao quyết định quay lại canary nên được tự động hoá?",
        "options": [
          "Vì người trực có thể không nhìn biểu đồ đúng lúc, và mỗi phút chờ là thêm người bị ảnh hưởng",
          "Vì hệ thống tự động luôn chính xác hơn con người trong mọi tình huống, kể cả những tình huống chưa gặp bao giờ",
          "Vì quy định pháp luật yêu cầu mọi lần quay lại phải được tự động hoá",
          "Vì quay lại thủ công bắt buộc phải dựng lại toàn bộ image từ đầu"
        ],
        "correct": 0,
        "explanation": "Triển khai thường xảy ra khi người ta đang làm việc khác. Một luật đơn giản - chỉ số chính xấu hơn đối chứng quá ngưỡng, với đủ số yêu cầu - quay lại trong vài phút, còn con người thì được báo để điều tra sau. Thứ cần con người là tìm nguyên nhân, không phải bấm nút quay lại."
      }
    ],
    "keyTakeaways": [
      "Triển khai dần: một phần nhỏ trước, tăng khi chỉ số tốt.",
      "So với bản cũ chạy song song, và chờ đủ số yêu cầu.",
      "Quay lại = trỏ về image cũ theo thẻ commit, không dựng lại.",
      "Thay đổi dữ liệu theo kiểu mở rộng rồi thu hẹp để còn quay lại được.",
      "Tự động hoá quyết định quay lại; con người tìm nguyên nhân."
    ],
    "practicePrompt": {
      "question": "Canary chạy ổn ở 5% trong một giờ, bạn tăng lên 100%, và 20 phút sau cơ sở dữ liệu quá tải. Bài học chính?",
      "options": [
        "Canary vô dụng với những lỗi về hiệu năng, nên từ nay không cần dùng tới nó nữa cho các bản sau",
        "Lỗi phụ thuộc tải chỉ lộ ở lưu lượng lớn: cần thêm các nấc trung gian và theo dõi tài nguyên dùng chung",
        "Nên giữ canary ở mức 5% lưu lượng vĩnh viễn để tránh mọi rủi ro có thể xảy ra về sau với các bản phát hành mới",
        "Cơ sở dữ liệu cần được nâng cấp lên cấu hình mạnh hơn trước mỗi lần triển khai một bản mới"
      ],
      "correct": 1,
      "explanation": "Bản mới có thể gọi cơ sở dữ liệu nhiều gấp ba lần; ở 5% thì không ai thấy, ở 100% thì quá tải. Thêm các nấc 25%, 50% và đưa tải của tài nguyên dùng chung (cơ sở dữ liệu, bộ đệm) vào các chỉ số được so, không chỉ tỷ lệ lỗi của chính dịch vụ."
    },
    "summary": {
      "keyIdea": "Lỗi sẽ lọt qua; triển khai dần quyết định nó chạm tới bao nhiêu người và trong bao lâu.",
      "formula": "Canary = phần nhỏ + so với đối chứng + số yêu cầu tối thiểu + tăng dần + quay lại tự động.",
      "commonMistake": "Nhìn con số tuyệt đối thay vì so với đối chứng, hoặc nhảy thẳng từ 5% lên 100%.",
      "action": "Ghi lại quy trình quay lại hiện tại của bạn và đo nó mất bao nhiêu phút."
    },
    "application": {
      "title": "Làm ngay hôm nay",
      "message": "Thử quay lại phiên bản trước trên môi trường thử nghiệm và bấm giờ. Nếu cần dựng lại image hay chạy lệnh tay nào ngoài một bước, ghi chúng ra - đó là những việc sẽ chậm nhất đúng lúc bạn cần nhanh nhất.",
      "secondary": "Bài sau: giữ pipeline đáng tin khi có kiểm thử chập chờn."
    },
    "sections": [
      {
        "type": "lead",
        "text": "CI trả lời \"có hỏng gì không\" với những gì kiểm thử biết. Triển khai dần trả lời câu đó với thứ kiểm thử không biết: người dùng thật, dữ liệu thật, tải thật."
      },
      {
        "type": "conceptTable",
        "title": "Ba cách đưa bản mới lên",
        "concepts": [
          {
            "vi": "Thay dần",
            "en": "Rolling",
            "def": "Thay từng máy một. Đơn giản, nhưng khó so sánh và quay lại chậm."
          },
          {
            "vi": "Xanh-lam",
            "en": "Blue-green",
            "def": "Hai môi trường đủ; chuyển toàn bộ lưu lượng một lần, quay lại bằng chuyển ngược."
          },
          {
            "vi": "Chim hoàng yến",
            "en": "Canary",
            "def": "Phần nhỏ lưu lượng trước, so với đối chứng, tăng dần theo chỉ số."
          }
        ]
      },
      {
        "type": "code",
        "language": "text",
        "caption": "Một kế hoạch canary",
        "code": "bước:\n  - dat_trong_so: 5        # % lưu lượng tới bản mới\n    cho_toi_thieu: 10m\n    yeu_cau_toi_thieu: 2000\n  - dat_trong_so: 25\n    cho_toi_thieu: 15m\n  - dat_trong_so: 50\n    cho_toi_thieu: 15m\n  - dat_trong_so: 100\nphan_tich:\n  so_voi: ban_dang_chay     # đối chứng cùng thời điểm\n  chi_so:\n    - ty_le_loi_5xx:     { xau_hon_toi_da: 25% }\n    - do_tre_p95:        { xau_hon_toi_da: 20% }\n    - tai_co_so_du_lieu: { xau_hon_toi_da: 30% }\n  khi_that_bai: quay_lai"
      },
      {
        "type": "callout",
        "label": "Quay lại cần được tập",
        "text": "Một đường quay lại chưa từng được dùng là một đường quay lại có thể không chạy. Quay lại thử trên môi trường thử nghiệm định kỳ, và coi thời gian quay lại là một chỉ số cần giữ thấp."
      },
      {
        "type": "exercise",
        "language": "javascript",
        "title": "Canary: tăng, chờ, hay quay lại",
        "task": "quyetDinh(canary, doiChung) trả về \"chờ\" khi canary chưa đủ 2000 yêu cầu, \"quay lại\" khi tỷ lệ lỗi của canary cao hơn đối chứng quá 25% (tính tương đối), ngược lại \"tăng\". Mã hiện so tỷ lệ lỗi của canary với ngưỡng tuyệt đối 1% và không chờ đủ mẫu.",
        "starter": "function quyetDinh(canary, doiChung) {\n  const tyLe = canary.loi / canary.yeuCau;\n  return tyLe > 0.01 ? \"quay lại\" : \"tăng\";\n}\n\nconst ca = [\n  [\"ít mẫu, có vẻ xấu\", { yeuCau: 300, loi: 3 }, { yeuCau: 6000, loi: 30 }],\n  [\"đủ mẫu, xấu hơn nhiều\", { yeuCau: 2500, loi: 20 }, { yeuCau: 50000, loi: 250 }],\n  [\"đủ mẫu, tương đương\", { yeuCau: 2400, loi: 13 }, { yeuCau: 48000, loi: 240 }],\n  [\"đối chứng cũng đang lỗi\", { yeuCau: 3000, loi: 45 }, { yeuCau: 60000, loi: 840 }],\n];\nfor (const [ten, c, d] of ca) console.log(ten + \": \" + quyetDinh(c, d));",
        "solution": "function quyetDinh(canary, doiChung) {\n  if (canary.yeuCau < 2000) return \"chờ\";\n  const tyLeC = canary.loi / canary.yeuCau;\n  const tyLeD = doiChung.loi / doiChung.yeuCau;\n  return tyLeC > tyLeD * 1.25 ? \"quay lại\" : \"tăng\";\n}\n\nconst ca = [\n  [\"ít mẫu, có vẻ xấu\", { yeuCau: 300, loi: 3 }, { yeuCau: 6000, loi: 30 }],\n  [\"đủ mẫu, xấu hơn nhiều\", { yeuCau: 2500, loi: 20 }, { yeuCau: 50000, loi: 250 }],\n  [\"đủ mẫu, tương đương\", { yeuCau: 2400, loi: 13 }, { yeuCau: 48000, loi: 240 }],\n  [\"đối chứng cũng đang lỗi\", { yeuCau: 3000, loi: 45 }, { yeuCau: 60000, loi: 840 }],\n];\nfor (const [ten, c, d] of ca) console.log(ten + \": \" + quyetDinh(c, d));",
        "hints": [
          "Chưa đủ mẫu thì mọi chênh lệch đều có thể là ngẫu nhiên: trả \"chờ\" trước khi so.",
          "So tương đối: canary xấu khi tỷ lệ của nó lớn hơn tỷ lệ đối chứng nhân 1,25. Trường hợp cuối cho thấy vì sao ngưỡng tuyệt đối sai: cả hệ thống đang lỗi, không phải lỗi của bản mới."
        ],
        "expectedOutput": "ít mẫu, có vẻ xấu: chờ\nđủ mẫu, xấu hơn nhiều: quay lại\nđủ mẫu, tương đương: tăng\nđối chứng cũng đang lỗi: tăng"
      },
      {
        "type": "closing",
        "lines": [
          "Không triển khai nào an toàn tuyệt đối; triển khai dần làm cho mỗi lần sai trở nên nhỏ.",
          "Bài cuối giữ cho cả hệ thống này đáng tin: test chập chờn."
        ]
      }
    ]
  },
  {
    "id": 1935,
    "slug": "test-chap-chon-va-giu-pipeline-xanh",
    "title": "CI/CD, Bài 6: Test chập chờn và giữ pipeline đáng tin",
    "subtitle": "Một kiểm thử lúc xanh lúc đỏ với cùng một mã dạy cả đội bấm \"chạy lại\" mà không đọc.",
    "duration": "12 phút",
    "difficulty": "Trung bình",
    "emoji": "🎲",
    "track": "professional",
    "whyItMatters": "CI chỉ có giá trị khi màu đỏ có nghĩa. Mỗi kiểm thử chập chờn làm màu đỏ mất nghĩa thêm một chút: người ta quen bấm chạy lại, rồi quen gộp khi đỏ, và tới ngày một lỗi thật xuất hiện thì không ai tin nó. Chập chờn không phải phiền toái nhỏ - nó là thứ làm mục ruỗng cả hệ thống kiểm tra.",
    "openingQuestion": "Một kiểm thử đỏ khoảng 1 lần trong 20 lần chạy, với cùng một commit. Phản ứng tốt nhất?",
    "openingOptions": [
      "Thêm chạy lại tự động ba lần cho mọi kiểm thử trong bộ để pipeline luôn luôn xanh",
      "Xoá kiểm thử đó đi vì nó không đáng tin cậy và chỉ gây phiền toái cho cả đội",
      "Bỏ qua, vì 95% số lần chạy vẫn xanh là một tỷ lệ hoàn toàn chấp nhận được",
      "Cách ly nó khỏi cổng gộp, ghi lại và giao cho người sửa trong hạn định"
    ],
    "correctOption": 3,
    "explanation": "Kiểm thử chập chờn thường đang nói điều gì đó thật: một tranh chấp về thời gian, một phụ thuộc vào thứ tự, đôi khi chính là lỗi của sản phẩm. Xoá nó là mất thông tin; chạy lại tự động mọi kiểm thử là che mọi chập chờn khác đi. Cách ly (vẫn chạy, không chặn gộp) giữ pipeline có nghĩa trong khi có người tìm nguyên nhân. Và với 50 kiểm thử như vậy, xác suất cả pipeline xanh chỉ còn khoảng 8%.",
    "diagram": [
      {
        "label": "Phát hiện: cùng commit, lúc xanh lúc đỏ",
        "arrow": true
      },
      {
        "label": "Cách ly: vẫn chạy, không chặn gộp",
        "arrow": true
      },
      {
        "label": "Tìm nguyên nhân: thời gian, thứ tự, trạng thái dùng chung",
        "arrow": true
      },
      {
        "label": "Sửa và đưa trở lại cổng"
      }
    ],
    "realWorldExample": {
      "company": "Kho mã của một đội hai mươi người (tình huống minh hoạ)",
      "description": "Pipeline đỏ khoảng một phần ba số lần, và câu cửa miệng là \"chạy lại đi\". Đội dành một tuần đo: 11 kiểm thử chiếm gần hết các lần đỏ vô cớ, 7 trong số đó dùng chung một bảng cơ sở dữ liệu mà không dọn. Sửa xong, tỷ lệ đỏ vô cớ xuống dưới 2%, và lần đầu tiên sau nhiều tháng, người ta đọc nhật ký khi thấy đỏ."
    },
    "quiz": [
      {
        "question": "Nguyên nhân phổ biến nhất của kiểm thử chập chờn là gì?",
        "options": [
          "Máy CI thỉnh thoảng bị lỗi phần cứng làm kết quả sai lệch",
          "Kiểm thử chờ bằng thời gian cố định, hoặc phụ thuộc thứ tự và trạng thái dùng chung",
          "Kiểm thử được viết bằng ngôn ngữ thông dịch nên chạy không ổn định",
          "Có quá nhiều kiểm thử dồn trong một tệp, làm bộ chạy kiểm thử bị quá tải và bỏ sót kết quả"
        ],
        "correct": 1,
        "explanation": "sleep(500) rồi kiểm tra là cá cược rằng việc kia xong trong 500ms - thắng trên máy nhanh, thua trên máy CI đang bận. Kiểm thử A để lại dữ liệu mà kiểm thử B vô tình dựa vào, nên đổi thứ tự là hỏng. Ngày giờ, số ngẫu nhiên không cố định hạt giống, gọi mạng thật cũng hay gặp."
      },
      {
        "question": "Thay sleep(2000) trước khi kiểm tra bằng gì?",
        "options": [
          "Tăng lên sleep(10000) để chắc chắn việc kia luôn kịp hoàn thành",
          "Chờ tới khi điều kiện đúng, có thời gian chờ tối đa, rồi mới kiểm tra",
          "Bỏ hẳn phần chờ và kiểm tra kết quả ngay sau khi gọi hàm",
          "Chạy kiểm thử đó trên một máy riêng không chia sẻ với ai khác"
        ],
        "correct": 1,
        "explanation": "Chờ theo điều kiện (hỏi lại mỗi vài chục mili giây cho tới khi phần tử xuất hiện hoặc dữ liệu có mặt, tối đa vài giây) vừa nhanh khi việc xong sớm, vừa không hỏng khi máy chậm. Tăng sleep làm mọi lần chạy chậm hơn mà chỉ đẩy xác suất hỏng xuống, không xoá nó."
      },
      {
        "question": "Vì sao \"tự động chạy lại mọi kiểm thử hỏng tối đa 3 lần\" là một chính sách nguy hiểm?",
        "options": [
          "Vì chạy lại ba lần làm chi phí CI tăng lên gấp ba cho mọi pipeline",
          "Vì hệ thống CI không cho phép một kiểm thử được chạy lại quá hai lần liên tiếp trong cùng pipeline",
          "Vì nó che luôn những lỗi thật chỉ xảy ra thỉnh thoảng, như tranh chấp trong sản phẩm",
          "Vì kiểm thử chạy lại sẽ luôn cho kết quả giống hệt lần chạy đầu tiên"
        ],
        "correct": 2,
        "explanation": "Một lỗi tranh chấp trong mã sản phẩm biểu hiện đúng như một kiểm thử chập chờn. Chạy lại tới khi xanh là giấu nó đi cho tới khi nó xảy ra với người dùng. Nếu buộc phải chạy lại, hãy ghi lại mọi lần \"xanh sau khi chạy lại\" để có dữ liệu mà sửa."
      },
      {
        "question": "Làm sao phát hiện kiểm thử chập chờn một cách có hệ thống?",
        "options": [
          "Ghi kết quả mọi lần chạy; kiểm thử vừa đạt vừa trượt trên cùng commit là chập chờn",
          "Hỏi ý kiến các thành viên trong đội xem kiểm thử nào hay gây khó chịu nhất cho họ mỗi tuần",
          "Chờ tới khi một kiểm thử đỏ ba ngày liên tiếp rồi mới đánh dấu",
          "Chạy toàn bộ bộ kiểm thử một lần trên máy cá nhân của trưởng nhóm"
        ],
        "correct": 0,
        "explanation": "Định nghĩa chính xác nhất: cùng một mã, khác kết quả. Lưu kết quả theo (tên kiểm thử, commit) và đánh dấu những cặp có cả đạt lẫn trượt. Có dữ liệu thì còn xếp được hạng - kiểm thử nào gây nhiều lần đỏ vô cớ nhất - và sửa từ đầu danh sách."
      },
      {
        "question": "Kiểm thử A xanh khi chạy riêng nhưng đỏ khi chạy sau kiểm thử B. Điều đó gợi ý gì?",
        "options": [
          "Kiểm thử A viết sai và cần được viết lại hoàn toàn từ đầu",
          "Bộ chạy kiểm thử có lỗi trong cách sắp xếp thứ tự các tệp",
          "Máy CI không đủ bộ nhớ để chạy hai kiểm thử liên tiếp nhau, nên kiểm thử thứ hai bị cắt ngang giữa chừng",
          "B để lại trạng thái dùng chung - dữ liệu, biến toàn cục, thời gian giả - mà không dọn"
        ],
        "correct": 3,
        "explanation": "Kiểm thử phải độc lập: tự dựng thứ mình cần và dọn sau khi xong. Khi thứ tự quyết định kết quả, có trạng thái rò giữa chúng. Chạy kiểm thử theo thứ tự ngẫu nhiên (có in hạt giống để tái hiện) làm loại lỗi này lộ ra sớm thay vì tình cờ."
      }
    ],
    "keyTakeaways": [
      "Chập chờn = cùng mã, khác kết quả; nó làm màu đỏ mất nghĩa.",
      "Nguyên nhân hay gặp: chờ theo thời gian cố định, thứ tự, trạng thái dùng chung.",
      "Chờ theo điều kiện có giới hạn, không sleep cố định.",
      "Cách ly và sửa có hạn định; không che bằng chạy lại tự động.",
      "Ghi kết quả theo commit để phát hiện và xếp hạng có hệ thống."
    ],
    "practicePrompt": {
      "question": "Pipeline có 40 kiểm thử, mỗi cái độc lập và chập chờn với xác suất đỏ 1%. Xác suất một lần chạy với mã đúng mà vẫn đỏ là khoảng bao nhiêu?",
      "options": [
        "1% (= xác suất của một kiểm thử, vì chúng độc lập với nhau)",
        "33% (= 1 − 0,99^40, ít nhất một trong bốn mươi kiểm thử đỏ)",
        "40% (= 40 × 1%, cộng xác suất của từng kiểm thử lại với nhau)",
        "4% (= 40 × 0,1%, vì chỉ khoảng một phần mười số lần đỏ là lỗi thật)"
      ],
      "correct": 1,
      "explanation": "Pipeline xanh chỉ khi cả 40 cùng xanh: 0,99^40 ≈ 0,67. Vậy khoảng một phần ba số lần chạy đỏ vô cớ. Cộng 40 × 1% = 40% là xấp xỉ sai vì bỏ qua trường hợp nhiều kiểm thử cùng đỏ. Đây là lý do vài kiểm thử \"chỉ hơi chập chờn\" đủ phá niềm tin vào cả pipeline."
    },
    "summary": {
      "keyIdea": "Màu đỏ chỉ có giá trị khi nó có nghĩa; mỗi kiểm thử chập chờn làm nó mất nghĩa một chút.",
      "formula": "Giữ CI đáng tin = đo theo commit + cách ly + sửa nguyên nhân + không che bằng chạy lại.",
      "commonMistake": "Bật chạy lại tự động cho mọi kiểm thử, che luôn cả lỗi tranh chấp thật trong sản phẩm.",
      "action": "Đếm số lần \"chạy lại cho xanh\" trong tuần qua của đội bạn."
    },
    "application": {
      "title": "Làm ngay hôm nay",
      "message": "Chạy bộ kiểm thử của bạn mười lần liên tiếp trên cùng một commit, lần nào cũng xáo thứ tự. Ghi lại kiểm thử nào có cả đạt lẫn trượt - đó là danh sách việc cần sửa, xếp theo số lần trượt.",
      "secondary": "Chặng sau: khi có lỗi thật, tìm nó thế nào - gỡ lỗi có phương pháp."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bài cuối của chặng không nói về cách làm CI nhanh hơn hay an toàn hơn, mà về cách giữ cho nó còn được tin. Một pipeline mà mọi người đã quen bỏ qua thì dù chạy nhanh đến đâu cũng không bảo vệ ai."
      },
      {
        "type": "comparison",
        "left": {
          "label": "Chờ theo thời gian",
          "text": "sleep(500) rồi kiểm tra. Nhanh trên máy bạn, hỏng trên máy CI đang bận. Tăng lên thì chậm mọi lần mà vẫn không chắc."
        },
        "right": {
          "label": "Chờ theo điều kiện",
          "text": "Hỏi lại mỗi 50ms tới khi điều kiện đúng, tối đa 5 giây. Nhanh khi việc xong sớm, không hỏng khi máy chậm."
        }
      },
      {
        "type": "code",
        "language": "javascript",
        "caption": "Chờ theo điều kiện thay cho sleep",
        "code": "async function choDen(dieuKien, { toiDa = 5000, moi = 50 } = {}) {\n  const batDau = Date.now();\n  while (Date.now() - batDau < toiDa) {\n    if (await dieuKien()) return;\n    await new Promise((r) => setTimeout(r, moi));\n  }\n  throw new Error(\"Hết \" + toiDa + \"ms mà điều kiện vẫn chưa đúng\");\n}\n\n// Thay vì: await sleep(2000); expect(await db.dem(\"don\")).toBe(1);\nawait choDen(async () => (await db.dem(\"don\")) === 1);"
      },
      {
        "type": "list",
        "items": [
          "Cố định thời gian và hạt giống ngẫu nhiên trong kiểm thử; in hạt giống khi hỏng để tái hiện.",
          "Mỗi kiểm thử tự dựng dữ liệu của mình và dọn sau khi xong; không dựa vào kiểm thử khác.",
          "Không gọi mạng thật trong unit test; dùng máy chủ giả hoặc bản ghi lại.",
          "Chạy theo thứ tự ngẫu nhiên để lỗi phụ thuộc thứ tự lộ ra sớm."
        ]
      },
      {
        "type": "exercise",
        "language": "javascript",
        "title": "Tìm kiểm thử chập chờn từ lịch sử chạy",
        "task": "Lịch sử là danh sách [tên kiểm thử, commit, kết quả]. Một kiểm thử là chập chờn nếu có ít nhất một commit mà nó vừa đạt vừa trượt. In các kiểm thử chập chờn, xếp theo số lần trượt giảm dần (hoà thì theo tên). Mã hiện đánh dấu mọi kiểm thử từng trượt, nên cả kiểm thử hỏng thật (trượt đều trên một commit lỗi) cũng bị coi là chập chờn.",
        "starter": "const ls = [\n  [\"dang-nhap\", \"a1\", \"đạt\"], [\"dang-nhap\", \"a1\", \"trượt\"], [\"dang-nhap\", \"b2\", \"đạt\"],\n  [\"thanh-toan\", \"a1\", \"đạt\"], [\"thanh-toan\", \"b2\", \"trượt\"], [\"thanh-toan\", \"b2\", \"trượt\"],\n  [\"gio-hang\", \"a1\", \"trượt\"], [\"gio-hang\", \"a1\", \"đạt\"], [\"gio-hang\", \"b2\", \"trượt\"], [\"gio-hang\", \"b2\", \"đạt\"],\n  [\"tim-kiem\", \"a1\", \"đạt\"], [\"tim-kiem\", \"b2\", \"đạt\"],\n];\n\nfunction chapChon(ls) {\n  const truot = {};\n  for (const [ten, , kq] of ls) if (kq === \"trượt\") truot[ten] = (truot[ten] ?? 0) + 1;\n  return Object.entries(truot);\n}\n\nfor (const [ten, n] of chapChon(ls)) console.log(ten + \": \" + n + \" lần trượt\");",
        "solution": "const ls = [\n  [\"dang-nhap\", \"a1\", \"đạt\"], [\"dang-nhap\", \"a1\", \"trượt\"], [\"dang-nhap\", \"b2\", \"đạt\"],\n  [\"thanh-toan\", \"a1\", \"đạt\"], [\"thanh-toan\", \"b2\", \"trượt\"], [\"thanh-toan\", \"b2\", \"trượt\"],\n  [\"gio-hang\", \"a1\", \"trượt\"], [\"gio-hang\", \"a1\", \"đạt\"], [\"gio-hang\", \"b2\", \"trượt\"], [\"gio-hang\", \"b2\", \"đạt\"],\n  [\"tim-kiem\", \"a1\", \"đạt\"], [\"tim-kiem\", \"b2\", \"đạt\"],\n];\n\nfunction chapChon(ls) {\n  const theoCap = new Map();\n  const truot = {};\n  for (const [ten, commit, kq] of ls) {\n    const k = ten + \"@\" + commit;\n    if (!theoCap.has(k)) theoCap.set(k, new Set());\n    theoCap.get(k).add(kq);\n    if (kq === \"trượt\") truot[ten] = (truot[ten] ?? 0) + 1;\n  }\n  const ds = new Set([...theoCap].filter(([, s]) => s.size === 2).map(([k]) => k.split(\"@\")[0]));\n  return [...ds].map((t) => [t, truot[t]]).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));\n}\n\nfor (const [ten, n] of chapChon(ls)) console.log(ten + \": \" + n + \" lần trượt\");",
        "hints": [
          "Nhóm theo cặp (kiểm thử, commit): chập chờn là có cặp chứa cả \"đạt\" lẫn \"trượt\".",
          "thanh-toan trượt cả hai lần trên b2: đó là kiểm thử bắt được lỗi thật của commit b2, không phải chập chờn."
        ],
        "expectedOutput": "gio-hang: 2 lần trượt\ndang-nhap: 1 lần trượt"
      },
      {
        "type": "closing",
        "lines": [
          "Một CI đáng tin là CI mà màu đỏ khiến người ta dừng lại đọc.",
          "Chặng sau: khi màu đỏ là thật, tìm lỗi thế nào cho nhanh."
        ]
      }
    ]
  }
];
