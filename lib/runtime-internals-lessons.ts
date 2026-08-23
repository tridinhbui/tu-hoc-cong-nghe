import type { Lesson } from "./lesson-types";

// Chặng "Nội bộ runtime: cấu trúc và hiệu năng máy ảo" (ids 1471-1474).
//
// Chặng tối ưu ở phần trên dừng ở tầng hàm và tầng cấu trúc dữ liệu. Bốn bài
// này đi xuống tầng dưới nó: máy ảo làm gì với mã của bạn, vì sao bố cục bộ
// nhớ quyết định tốc độ hơn cả độ phức tạp thuật toán, đọc bộ đếm phần cứng,
// và câu hỏi cuối cùng - khi nào thì nên dừng tối ưu.

export const RUNTIME_INTERNALS_LESSONS: Lesson[] = [
  {
    "id": 1471,
    "slug": "may-ao-lam-gi-tu-ma-nguon-toi-lenh-may",
    "title": "Runtime, Bài 1: Máy ảo làm gì - từ mã nguồn tới lệnh máy",
    "subtitle": "Giữa dòng mã bạn viết và lệnh mà bộ xử lý chạy có vài lớp, và mỗi lớp giải thích một loại bất ngờ về hiệu năng.",
    "duration": "11 phút",
    "difficulty": "Khó",
    "track": "professional",
    "emoji": "🏗️",
    "whyItMatters": "Phần lớn kết quả đo hiệu năng gây bất ngờ đều giải thích được bằng một lớp mà người viết mã không nhìn thấy.",
    "openingQuestion": "Vì sao cùng một đoạn mã chạy nhanh dần lên trong vài giây đầu?",
    "openingOptions": [
      "Vì máy ảo dịch lại phần mã chạy nhiều thành lệnh máy sau khi quan sát đủ lâu",
      "Vì bộ nhớ đệm của bộ xử lý dần chứa đủ dữ liệu mà đoạn mã đó cần",
      "Vì hệ điều hành nâng mức ưu tiên cho tiến trình đang chạy liên tục",
      "Vì các kết nối và tài nguyên bên ngoài đã được khởi tạo xong sau vài lượt gọi"
    ],
    "correctOption": 0,
    "explanation": "Máy ảo bắt đầu bằng cách thông dịch, đồng thời đếm xem phần nào chạy nhiều. Vượt ngưỡng thì nó biên dịch phần đó thành lệnh máy và còn tối ưu dựa trên những gì đã quan sát được. Ba lựa chọn kia đều là hiện tượng thật và đều nhỏ hơn nhiều - đây là lý do một phép đo hiệu năng không có giai đoạn làm nóng gần như luôn sai.",
    "diagram": [
      {
        "label": "Thông dịch trước, đồng thời ĐẾM phần nào chạy nhiều",
        "arrow": true
      },
      {
        "label": "Vượt ngưỡng → biên dịch thành lệnh máy, tối ưu theo quan sát",
        "arrow": true
      },
      {
        "label": "Nên đo mà không làm nóng thì gần như luôn sai",
        "arrow": true
      },
      {
        "label": "Và tối ưu dựa trên giả định có thể bị huỷ khi giả định sai"
      }
    ],
    "realWorldExample": {
      "company": "Tối ưu dựa trên giả định",
      "description": "Nếu một lượt gọi phương thức luôn rơi vào cùng một kiểu đối tượng, máy ảo giả định điều đó và gắn thẳng phần mã cần chạy. Khi một kiểu khác xuất hiện, giả định bị huỷ và phần mã đó quay lại trạng thái chậm - điều này giải thích vì sao một thay đổi nhỏ có thể làm chậm hẳn một vòng lặp."
    },
    "quiz": [
      {
        "question": "Vì sao đo hiệu năng mà không làm nóng thì kết quả sai?",
        "options": [
          "Vì phần lớn thời gian đo rơi vào giai đoạn mã còn đang được thông dịch",
          "Vì bộ nhớ đệm của bộ xử lý chưa chứa dữ liệu nên mọi truy cập đều chậm",
          "Vì máy ảo cần khoảng thời gian để cấp phát đủ bộ nhớ cho vùng làm việc",
          "Vì các lượt đo đầu tiên bị ảnh hưởng bởi thời gian khởi động tiến trình"
        ],
        "correct": 0,
        "explanation": "Chênh lệch giữa mã thông dịch và mã đã biên dịch thường là hàng chục lần, nên nếu phần lớn lượt đo rơi vào giai đoạn đầu thì con số bạn có nói về một chương trình khác với chương trình chạy thật."
      },
      {
        "question": "Tối ưu dựa trên giả định hoạt động thế nào?",
        "options": [
          "Máy ảo giả định điều đã quan sát được và huỷ tối ưu khi giả định không còn đúng",
          "Máy ảo phân tích mã nguồn để suy ra các trường hợp có thể xảy ra khi chạy",
          "Máy ảo dùng thông tin từ những lần chạy trước được lưu lại giữa các phiên",
          "Máy ảo áp dụng các quy tắc tối ưu chuẩn cho từng mẫu mã thường gặp"
        ],
        "correct": 0,
        "explanation": "Đây là điều làm máy ảo khác trình biên dịch tĩnh: nó tối ưu dựa trên thứ ĐANG xảy ra chứ không phải thứ có thể xảy ra. Đổi lại, nó phải sẵn sàng rút lui khi thực tế đổi."
      },
      {
        "question": "Vì sao một thay đổi nhỏ có thể làm chậm hẳn một vòng lặp?",
        "options": [
          "Vì nó làm xuất hiện thêm một kiểu đối tượng, khiến giả định tối ưu bị huỷ",
          "Vì nó làm mã dài hơn ngưỡng mà máy ảo chấp nhận để gắn thẳng vào",
          "Vì nó thay đổi thứ tự truy cập bộ nhớ nên bộ nhớ đệm hoạt động kém đi",
          "Vì nó thêm một lượt kiểm tra điều kiện vào bên trong thân vòng lặp"
        ],
        "correct": 0,
        "explanation": "Ba lựa chọn kia đều là cơ chế thật và đều gây chậm ở mức vài phần trăm. Việc huỷ tối ưu thì đưa đoạn mã về trạng thái chậm hơn hàng chục lần, và nó xảy ra mà không có dấu hiệu nào trong mã."
      },
      {
        "question": "Vì sao gắn thẳng phần mã của hàm được gọi lại quan trọng?",
        "options": [
          "Vì nó mở đường cho các tối ưu khác vốn không nhìn qua được ranh giới hàm",
          "Vì nó loại bỏ chi phí của lượt gọi hàm, vốn khá lớn ở ngay trong vòng lặp nóng",
          "Vì nó cho phép máy ảo sắp xếp lại thứ tự các lệnh để chạy song song",
          "Vì nó giảm số lượng khung ngăn xếp cần tạo ra trong quá trình chạy"
        ],
        "correct": 0,
        "explanation": "Lựa chọn thứ hai là lợi ích trực tiếp và nó nhỏ hơn nhiều. Lợi ích thật là gián tiếp: sau khi gắn thẳng, các tối ưu như loại bỏ tính toán thừa hay đưa biểu thức bất biến ra ngoài vòng lặp mới áp dụng được."
      },
      {
        "question": "Hệ quả nào cho việc viết mã hiệu năng cao?",
        "options": [
          "Giữ đường nóng đơn điệu về kiểu, và giữ hàm đủ nhỏ để được gắn thẳng",
          "Viết mã dài hơn nhưng tường minh để trình biên dịch dễ phân tích hơn",
          "Tránh dùng các cấu trúc trừu tượng vì chúng làm chậm quá trình biên dịch",
          "Gộp các hàm nhỏ lại thành hàm lớn để giảm số lượt gọi trong vòng lặp"
        ],
        "correct": 0,
        "explanation": "Lựa chọn cuối là điều nhiều người làm theo trực giác và nó NGƯỢC: hàm lớn quá ngưỡng thì không được gắn thẳng, nên gộp tay lại làm mất chính tối ưu mà bạn đang cố đạt."
      }
    ],
    "keyTakeaways": [
      "Máy ảo thông dịch trước, ĐẾM, rồi biên dịch phần chạy nhiều thành lệnh máy.",
      "Đo mà không làm nóng thì đo một chương trình khác - chênh lệch hàng chục lần.",
      "Tối ưu dựa trên GIẢ ĐỊNH, và giả định bị huỷ thì mã về lại trạng thái chậm.",
      "Gắn thẳng hàm quan trọng vì nó MỞ ĐƯỜNG cho các tối ưu khác, không vì tiết kiệm lượt gọi.",
      "Gộp hàm nhỏ thành hàm lớn là đi ngược - quá ngưỡng thì không được gắn thẳng."
    ],
    "practicePrompt": {
      "question": "Vòng lặp của bạn chậm hẳn sau khi thêm một nhánh xử lý kiểu mới. Nghi ngờ gì?",
      "options": [
        "Đường gọi vốn đơn điệu về kiểu nay có hai kiểu, nên tối ưu gắn thẳng bị huỷ",
        "Nhánh mới thêm một lượt kiểm tra điều kiện làm chậm mỗi vòng lặp",
        "Kiểu mới có kích thước lớn hơn nên gây thêm áp lực lên bộ nhớ đệm",
        "Mã trở nên dài hơn nên vượt quá ngưỡng mà máy ảo chấp nhận biên dịch"
      ],
      "correct": 0,
      "explanation": "Ba lựa chọn kia đều giải thích được mức chậm vài phần trăm. Chỉ việc huỷ tối ưu giải thích được mức chậm hàng chục lần, và mức đó mới khớp với chữ chậm hẳn."
    },
    "summary": {
      "keyIdea": "Giữa mã bạn viết và lệnh bộ xử lý chạy có vài lớp bạn không nhìn thấy.",
      "formula": "Thông dịch → đếm → biên dịch có giả định → huỷ tối ưu khi giả định sai.",
      "commonMistake": "Đo hiệu năng mà không làm nóng, rồi tin vào con số thu được.",
      "action": "Kiểm xem phép đo hiệu năng của bạn có giai đoạn làm nóng không."
    },
    "application": {
      "title": "Làm ngay hôm nay",
      "message": "Kiểm xem phép đo hiệu năng của bạn có giai đoạn làm nóng không, và nó dài bao nhiêu lượt lặp.",
      "secondary": "Nếu không có, chạy lại phép đo với một nghìn lượt làm nóng trước khi bắt đầu tính giờ. Chênh lệch giữa hai con số thường lớn tới mức làm đổi cả kết luận."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Phần lớn kết quả đo hiệu năng gây bất ngờ đều giải thích được bằng một lớp mà người viết mã không nhìn thấy."
      },
      {
        "type": "heading",
        "text": "Máy ảo làm gì"
      },
      {
        "type": "list",
        "items": [
          "Bắt đầu bằng THÔNG DỊCH, chạy ngay mà không cần chờ biên dịch.",
          "Đồng thời ĐẾM xem phần nào chạy nhiều.",
          "Vượt ngưỡng thì BIÊN DỊCH phần đó thành lệnh máy, và tối ưu dựa trên những gì đã quan sát được."
        ]
      },
      {
        "type": "callout",
        "label": "Hệ quả đầu tiên",
        "text": "Một phép đo hiệu năng không có giai đoạn làm nóng gần như luôn sai. Chênh lệch giữa mã thông dịch và mã đã biên dịch thường là hàng chục lần, nên con số bạn có nói về một chương trình khác với chương trình chạy thật."
      },
      {
        "type": "heading",
        "text": "Tối ưu dựa trên giả định"
      },
      {
        "type": "comparison",
        "left": {
          "label": "Trình biên dịch tĩnh",
          "text": "Tối ưu dựa trên thứ CÓ THỂ xảy ra. An toàn hơn, và bỏ lỡ nhiều cơ hội."
        },
        "right": {
          "label": "Máy ảo",
          "text": "Tối ưu dựa trên thứ ĐANG xảy ra. Mạnh hơn nhiều, và phải sẵn sàng rút lui khi thực tế đổi."
        }
      },
      {
        "type": "paragraph",
        "text": "Đây là lời giải thích cho một hiện tượng khó hiểu: một thay đổi nhỏ làm chậm hẳn một vòng lặp. Nếu nó làm xuất hiện thêm một kiểu đối tượng trên đường gọi vốn đơn điệu, giả định bị huỷ và đoạn mã quay về trạng thái chậm - không có dấu hiệu nào trong mã."
      },
      {
        "type": "closing",
        "lines": [
          "GẮN THẲNG phần mã của hàm được gọi là tối ưu quan trọng nhất, và không phải vì nó tiết kiệm chi phí gọi hàm. Nó MỞ ĐƯỜNG: sau khi gắn thẳng, các tối ưu khác mới nhìn qua được ranh giới hàm.",
          "Nên gộp tay các hàm nhỏ thành hàm lớn là đi ngược - quá ngưỡng thì không được gắn thẳng, và bạn mất chính tối ưu mình đang cố đạt."
        ]
      }
    ]
  },
  {
    "id": 1472,
    "slug": "bo-cuc-bo-nho-va-chi-phi-truy-cap",
    "title": "Runtime, Bài 2: Bố cục bộ nhớ - vì sao cách sắp dữ liệu quyết định tốc độ",
    "subtitle": "Bộ xử lý đọc theo khối, nên dữ liệu nằm gần nhau được đọc gần như miễn phí.",
    "duration": "12 phút",
    "difficulty": "Khó",
    "track": "professional",
    "emoji": "💧",
    "whyItMatters": "Chênh lệch giữa một truy cập trúng bộ nhớ đệm và một truy cập phải ra bộ nhớ chính là hàng trăm lần, và nó do bố cục dữ liệu quyết định chứ không do thuật toán.",
    "openingQuestion": "Vì sao duyệt một mảng nhanh hơn nhiều so với duyệt một danh sách liên kết cùng kích thước?",
    "openingOptions": [
      "Vì mảng nằm liền nhau nên một lượt đọc bộ nhớ mang về nhiều phần tử cùng lúc",
      "Vì mảng không cần lưu con trỏ nên tổng dung lượng cần đọc nhỏ hơn",
      "Vì việc truy cập mảng theo chỉ số nhanh hơn việc đi theo con trỏ",
      "Vì trình biên dịch tối ưu vòng lặp trên mảng tốt hơn hẳn trên danh sách liên kết"
    ],
    "correctOption": 0,
    "explanation": "Bộ xử lý không đọc từng byte mà đọc theo khối vài chục byte. Với mảng, một lượt đọc mang về nhiều phần tử kế tiếp và những phần tử đó gần như miễn phí. Với danh sách liên kết, mỗi nút có thể nằm ở một chỗ khác nhau nên mỗi bước là một lượt đọc mới - ba lựa chọn kia đều đúng và đều nhỏ hơn hiệu ứng này nhiều lần.",
    "diagram": [
      {
        "label": "Bộ xử lý đọc theo KHỐI, không theo từng byte",
        "arrow": true
      },
      {
        "label": "Dữ liệu nằm gần nhau → phần lớn phần tử gần như miễn phí",
        "arrow": true
      },
      {
        "label": "Đi theo con trỏ → mỗi bước một lượt đọc mới, chờ hàng trăm chu kỳ",
        "arrow": true
      },
      {
        "label": "Nên bố cục dữ liệu quyết định tốc độ hơn cả độ phức tạp thuật toán"
      }
    ],
    "realWorldExample": {
      "company": "Khi thuật toán tốt hơn lại chậm hơn",
      "description": "Một cấu trúc dữ liệu có độ phức tạp lý thuyết tốt hơn vẫn có thể chậm hơn trên dữ liệu nhỏ và vừa, nếu nó buộc bộ xử lý phải nhảy khắp bộ nhớ. Đây là lý do so sánh thuật toán bằng độ phức tạp mà không đo thật hay cho kết luận ngược."
    },
    "quiz": [
      {
        "question": "Vì sao chênh lệch giữa trúng và trượt bộ nhớ đệm lại lớn tới vậy?",
        "options": [
          "Vì một lượt đọc ra bộ nhớ chính mất hàng trăm chu kỳ mà bộ xử lý phải chờ",
          "Vì bộ nhớ chính có băng thông thấp hơn nhiều so với bộ nhớ đệm",
          "Vì mỗi lượt trượt buộc phải đẩy một khối khác ra khỏi bộ nhớ đệm",
          "Vì việc kiểm tra bộ nhớ đệm trước khi ra bộ nhớ chính cũng tốn thời gian"
        ],
        "correct": 0,
        "explanation": "Ba lựa chọn kia đều là yếu tố thật và đều nhỏ. Con số hàng trăm chu kỳ là thứ giải thích được vì sao bố cục dữ liệu có thể quan trọng hơn cả việc chọn thuật toán."
      },
      {
        "question": "Vì sao một cấu trúc có độ phức tạp tốt hơn vẫn có thể chậm hơn?",
        "options": [
          "Vì nó buộc bộ xử lý nhảy khắp bộ nhớ, và hằng số ẩn lớn hơn phần tiết kiệm được",
          "Vì việc triển khai nó phức tạp hơn nên dễ có sai sót làm giảm hiệu năng",
          "Vì nó cần thêm bộ nhớ để lưu cấu trúc phụ trợ nên gây áp lực bộ nhớ",
          "Vì nó chỉ đơn thuần hiệu quả từng khi dữ liệu được sắp xếp ngay trước theo một thứ tự nhất định"
        ],
        "correct": 0,
        "explanation": "Độ phức tạp bỏ qua hằng số, còn hằng số ở đây chênh nhau hàng trăm lần. Trên dữ liệu nhỏ và vừa, phần tiết kiệm về số phép tính không bù nổi phần mất về số lượt chờ bộ nhớ."
      },
      {
        "question": "Cách sắp dữ liệu nào thường tốt hơn cho việc duyệt nhiều lần?",
        "options": [
          "Gom các trường được dùng cùng nhau lại, thay vì gom theo từng đối tượng đầy đủ",
          "Sắp xếp các đối tượng theo đúng thứ tự mà chúng được truy cập nhiều nhất",
          "Chia dữ liệu thành nhiều khối nhỏ để mỗi khối vừa với bộ nhớ đệm",
          "Lưu các đối tượng dưới dạng nén để giảm tổng dung lượng cần đọc"
        ],
        "correct": 0,
        "explanation": "Nếu vòng lặp chỉ dùng hai trong hai mươi trường của mỗi đối tượng thì cách sắp theo đối tượng buộc bộ nhớ đệm chứa cả mười tám trường không dùng. Gom theo trường thì mỗi lượt đọc mang về toàn thứ cần."
      },
      {
        "question": "Vì sao truy cập theo bước nhảy lớn lại chậm?",
        "options": [
          "Vì mỗi lần nhảy sang một khối mới thì phần còn lại của khối vừa đọc bị bỏ phí",
          "Vì bộ xử lý không dự đoán được mẫu truy cập nên không nạp trước được",
          "Vì bước nhảy tương đối lớn khiến cho tăng lên số lượng trang bộ nhớ mà tiến trình phải chạm tới",
          "Vì các khối ở xa nhau thường nằm trên các thanh bộ nhớ vật lý khác nhau"
        ],
        "correct": 0,
        "explanation": "Lựa chọn thứ hai cũng là một yếu tố thật và bộ xử lý hiện đại dự đoán được cả bước nhảy đều. Vấn đề cốt lõi là lãng phí: bạn trả giá cho cả khối và chỉ dùng một phần nhỏ của nó."
      },
      {
        "question": "Khi nào nên nghĩ tới bố cục bộ nhớ?",
        "options": [
          "Khi đường nóng duyệt qua lượng dữ liệu lớn hơn nhiều so với bộ nhớ đệm",
          "Ngay từ đầu, vì bố cục khó thay đổi sau khi mã đã được viết xong",
          "Khi hồ sơ CPU cho thấy phần lớn thời gian nằm ở một hàm duy nhất",
          "Khi hệ thống chạy trên phần cứng có dung lượng bộ nhớ đệm nhỏ"
        ],
        "correct": 0,
        "explanation": "Với dữ liệu nhỏ, mọi thứ nằm gọn trong bộ nhớ đệm và bố cục không quan trọng. Lựa chọn thứ hai nghe cẩn thận nhưng nó dẫn tới việc tối ưu sớm ở khắp nơi, đúng cái mà bài về hồ sơ CPU đã cảnh báo."
      }
    ],
    "keyTakeaways": [
      "Bộ xử lý đọc theo KHỐI - dữ liệu nằm gần nhau thì phần lớn gần như miễn phí.",
      "Một lượt ra bộ nhớ chính mất hàng trăm chu kỳ chờ.",
      "Độ phức tạp bỏ qua hằng số, và hằng số ở đây chênh nhau hàng trăm lần.",
      "Gom theo TRƯỜNG được dùng cùng nhau, không gom theo đối tượng đầy đủ.",
      "Chỉ nghĩ tới bố cục khi đường nóng duyệt dữ liệu lớn hơn bộ nhớ đệm."
    ],
    "practicePrompt": {
      "question": "Vòng lặp duyệt một triệu đối tượng, mỗi cái hai mươi trường, và chỉ dùng hai trường. Sửa gì?",
      "options": [
        "Tách hai trường đó thành hai mảng riêng, để mỗi lượt đọc mang về toàn thứ cần",
        "Giảm kích thước mỗi đối tượng bằng cách dùng kiểu dữ liệu nhỏ hơn cho các trường",
        "Chia vòng lặp thành nhiều đoạn nhỏ để mỗi đoạn xử lý một phần dữ liệu",
        "Sắp xếp lại mảng đối tượng theo thứ tự mà vòng lặp sẽ truy cập chúng"
      ],
      "correct": 0,
      "explanation": "Lựa chọn thứ tư không giúp gì vì vòng lặp đã duyệt tuần tự rồi. Vấn đề không phải thứ tự mà là tỷ lệ hữu ích: mỗi khối đọc về chứa mười tám trường bạn không dùng, và tách mảng đưa tỷ lệ đó từ một phần mười lên gần như trọn vẹn."
    },
    "summary": {
      "keyIdea": "Bộ xử lý đọc theo khối, nên dữ liệu nằm gần nhau được đọc gần như miễn phí.",
      "formula": "Đo tỷ lệ hữu ích của mỗi khối đọc về, rồi sắp lại dữ liệu cho tỷ lệ đó tăng.",
      "commonMistake": "So sánh thuật toán bằng độ phức tạp mà không đo, vì nó bỏ qua hằng số.",
      "action": "Với vòng lặp nóng nhất, đếm xem mỗi đối tượng có bao nhiêu trường được dùng."
    },
    "application": {
      "title": "Làm ngay hôm nay",
      "message": "Với vòng lặp nóng nhất trong mã của bạn, đếm xem mỗi đối tượng có bao nhiêu trường và vòng lặp thật sự dùng bao nhiêu trong số đó.",
      "secondary": "Tỷ lệ đó chính là tỷ lệ hữu ích của mỗi lượt đọc bộ nhớ. Nếu nó dưới một phần ba, tách trường ra mảng riêng thường cho cải thiện lớn hơn mọi thứ khác bạn định làm."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Chênh lệch giữa một truy cập trúng bộ nhớ đệm và một truy cập phải ra bộ nhớ chính là hàng trăm lần, và nó do BỐ CỤC dữ liệu quyết định chứ không do thuật toán."
      },
      {
        "type": "heading",
        "text": "Bộ xử lý đọc theo khối"
      },
      {
        "type": "callout",
        "label": "Không đọc từng byte",
        "text": "Mỗi lượt đọc mang về một khối vài chục byte. Với mảng, khối đó chứa nhiều phần tử kế tiếp và chúng gần như miễn phí. Với danh sách liên kết, mỗi nút ở một chỗ khác nhau nên mỗi bước là một lượt chờ hàng trăm chu kỳ."
      },
      {
        "type": "heading",
        "text": "Khi độ phức tạp nói dối"
      },
      {
        "type": "comparison",
        "left": {
          "label": "Trên giấy",
          "text": "Cấu trúc có độ phức tạp tốt hơn thì phải nhanh hơn. Độ phức tạp bỏ qua hằng số."
        },
        "right": {
          "label": "Trên máy",
          "text": "Hằng số ở đây chênh nhau hàng trăm lần. Trên dữ liệu nhỏ và vừa, phần tiết kiệm về số phép tính không bù nổi phần mất về số lượt chờ bộ nhớ."
        }
      },
      {
        "type": "heading",
        "text": "Tỷ lệ hữu ích của một lượt đọc"
      },
      {
        "type": "paragraph",
        "text": "Nếu vòng lặp chỉ dùng hai trong hai mươi trường của mỗi đối tượng thì mỗi khối đọc về chứa mười tám trường vô ích. Gom dữ liệu theo TRƯỜNG được dùng cùng nhau - thay vì theo đối tượng đầy đủ - đưa tỷ lệ đó từ một phần mười lên gần như trọn vẹn."
      },
      {
        "type": "paragraph",
        "text": "Cùng lý do đó, truy cập theo bước nhảy lớn chậm vì lãng phí: bạn trả giá cho cả khối và chỉ dùng một phần nhỏ của nó."
      },
      {
        "type": "closing",
        "lines": [
          "Và một giới hạn cần nói rõ: chỉ nghĩ tới bố cục khi đường nóng duyệt lượng dữ liệu LỚN HƠN NHIỀU so với bộ nhớ đệm.",
          "Với dữ liệu nhỏ, mọi thứ nằm gọn trong đệm và bố cục không quan trọng - tối ưu nó ở khắp nơi là đúng cái mà bài về hồ sơ CPU đã cảnh báo."
        ]
      }
    ]
  },
  {
    "id": 1473,
    "slug": "do-hieu-nang-o-tang-runtime",
    "title": "Runtime, Bài 3: Đo ở tầng dưới - khi hồ sơ hàm đã hết cách",
    "subtitle": "Hồ sơ hàm nói thời gian ở đâu; bộ đếm phần cứng nói vì sao chỗ đó chậm.",
    "duration": "12 phút",
    "difficulty": "Khó",
    "track": "professional",
    "emoji": "📈",
    "whyItMatters": "Khi hồ sơ chỉ đúng vào một hàm mà bạn không thấy gì sai trong hàm đó, câu trả lời gần như luôn nằm ở tầng dưới nó.",
    "openingQuestion": "Hồ sơ chỉ ra một hàm chiếm 40% thời gian nhưng mã trong đó rất đơn giản. Bước tiếp theo?",
    "openingOptions": [
      "Xem bộ đếm phần cứng để biết thời gian đó là tính toán hay là chờ bộ nhớ",
      "Đọc kỹ lại mã của hàm đó để tìm phép tính tốn kém bị bỏ sót",
      "Xem các hàm mà nó gọi để tìm chỗ chậm nằm sâu hơn trong chuỗi gọi",
      "Đo lại nhiều lần để loại trừ khả năng kết quả là nhiễu ngẫu nhiên"
    ],
    "correctOption": 0,
    "explanation": "Một hàm đơn giản chiếm phần lớn thời gian gần như luôn nghĩa là nó đang CHỜ chứ không phải đang tính. Bộ đếm phần cứng phân biệt được hai chuyện đó bằng cách đếm số lệnh chạy trên mỗi chu kỳ và số lượt trượt bộ nhớ đệm. Ba bước kia đều hợp lý và đều tìm trong không gian mà bạn đã nhìn.",
    "diagram": [
      {
        "label": "Hồ sơ hàm nói THỜI GIAN Ở ĐÂU",
        "arrow": true
      },
      {
        "label": "Bộ đếm phần cứng nói VÌ SAO chỗ đó chậm",
        "arrow": true
      },
      {
        "label": "Số lệnh mỗi chu kỳ thấp → đang chờ, không phải đang tính",
        "arrow": true
      },
      {
        "label": "Rồi mới hỏi chờ cái gì: bộ nhớ, dự đoán nhánh, hay đồng bộ"
      }
    ],
    "realWorldExample": {
      "company": "Số lệnh trên mỗi chu kỳ",
      "description": "Đây là con số đầu tiên đáng nhìn ở tầng này. Thấp bất thường nghĩa là bộ xử lý đang đứng chờ nhiều hơn là đang làm việc, và điều đó chuyển câu hỏi từ mã của bạn sang thứ mà mã của bạn đang chờ."
    },
    "quiz": [
      {
        "question": "Số lệnh trên mỗi chu kỳ thấp nghĩa là gì?",
        "options": [
          "Bộ xử lý đang đứng chờ nhiều hơn là đang làm việc",
          "Mã đang thực hiện nhiều phép tính phức tạp tốn nhiều chu kỳ mỗi lệnh",
          "Chương trình đang bị hệ điều hành tạm dừng để nhường cho tiến trình khác",
          "Số luồng đang chạy vượt quá số nhân vật lý mà máy chủ có"
        ],
        "correct": 0,
        "explanation": "Con số này chuyển câu hỏi từ mã của bạn sang thứ mà mã của bạn đang chờ, và đó là bước quan trọng nhất ở tầng đo này. Ba lựa chọn kia đều làm chương trình chậm nhưng không làm con số này thấp theo cùng cách."
      },
      {
        "question": "Vì sao dự đoán nhánh sai lại tốn kém?",
        "options": [
          "Vì bộ xử lý phải bỏ phần việc đã làm trước theo hướng đoán và bắt đầu lại",
          "Vì mỗi lần dự đoán sai bộ xử lý phải nạp lại toàn bộ bộ nhớ đệm lệnh",
          "Vì việc kiểm tra điều kiện của nhánh tốn nhiều chu kỳ hơn lệnh thường",
          "Vì trình biên dịch phải sinh thêm mã để xử lý cả hai hướng của nhánh"
        ],
        "correct": 0,
        "explanation": "Bộ xử lý làm việc trước theo hướng nó đoán để không phải đứng chờ. Đoán sai thì toàn bộ phần đã làm bị bỏ - đó là lý do một nhánh khó đoán trong vòng lặp nóng đắt hơn nhiều so với vẻ ngoài của nó."
      },
      {
        "question": "Khi nào một nhánh trở nên khó đoán?",
        "options": [
          "Khi kết quả của nó thay đổi thất thường thay vì theo một khuôn mẫu ổn định",
          "Khi điều kiện của nhánh gồm nhiều phép so sánh ghép lại với nhau",
          "Khi nhánh nằm sâu bên trong nhiều lớp cấu trúc điều kiện lồng nhau",
          "Khi hai hướng của nhánh có khối lượng công việc chênh lệch lớn"
        ],
        "correct": 0,
        "explanation": "Bộ dự đoán học theo lịch sử, nên một nhánh luôn đúng hoặc luôn sai đều rẻ, và một nhánh xen kẽ đều đặn cũng rẻ. Chỉ nhánh thất thường - ví dụ phụ thuộc vào dữ liệu ngẫu nhiên - mới đắt."
      },
      {
        "question": "Vì sao chia sẻ sai giữa các luồng lại làm chậm chương trình?",
        "options": [
          "Vì hai luồng ghi vào cùng một khối bộ nhớ đệm, nên khối đó bị đẩy qua lại liên tục",
          "Vì hai luồng phải chờ nhau khi cùng truy cập vào một vùng dữ liệu chung",
          "Vì việc đồng bộ giữa các luồng cần thêm lệnh kiểm tra ở mỗi lượt truy cập",
          "Vì hệ điều hành phải chuyển đổi ngữ cảnh giữa các luồng thường xuyên hơn"
        ],
        "correct": 0,
        "explanation": "Điều làm hiện tượng này khó tìm là hai luồng ghi vào hai BIẾN KHÁC NHAU - không có tranh chấp logic nào - nhưng hai biến đó tình cờ nằm trong cùng một khối bộ nhớ đệm. Nhìn mã thì không thấy gì sai."
      },
      {
        "question": "Khi nào nên xuống tầng đo này?",
        "options": [
          "Khi tối ưu ở tầng thuật toán và tầng cấu trúc dữ liệu đã hết cách",
          "Ngay từ đầu, vì đo ở tầng thấp cho thông tin chính xác nhất về hiệu năng",
          "Khi hệ thống chạy trên phần cứng chuyên dụng cần tận dụng tối đa",
          "Khi hồ sơ hàm cho kết quả không ổn định giữa các lần chạy đo"
        ],
        "correct": 0,
        "explanation": "Tối ưu ở tầng này cho cải thiện theo hệ số nhỏ, còn đổi thuật toán cho cải thiện theo bậc. Xuống đây trước là bỏ qua cách rẻ hơn - trừ khi bạn đã ở trong đường nóng đã được tối ưu kỹ."
      }
    ],
    "keyTakeaways": [
      "Hồ sơ hàm nói thời gian Ở ĐÂU; bộ đếm phần cứng nói VÌ SAO chỗ đó chậm.",
      "Số lệnh trên mỗi chu kỳ thấp = đang chờ, không phải đang tính.",
      "Dự đoán nhánh sai đắt vì phần việc đã làm trước bị bỏ hết.",
      "Chia sẻ sai: hai luồng ghi hai biến KHÁC NHAU trong cùng một khối đệm.",
      "Chỉ xuống tầng này khi tầng thuật toán và cấu trúc dữ liệu đã hết cách."
    ],
    "practicePrompt": {
      "question": "Thêm một luồng thứ hai mà thông lượng không tăng, thậm chí giảm. Nghi ngờ gì?",
      "options": [
        "Chia sẻ sai, hoặc tranh chấp trên một tài nguyên dùng chung mà mã không thể hiện rõ",
        "Chi phí tạo và quản lý luồng lớn hơn phần công việc mà luồng thứ hai làm được",
        "Máy chỉ có một nhân vật lý nên hai luồng phải thay phiên nhau chạy",
        "Bộ nhớ không đủ cho hai luồng nên hệ điều hành phải hoán đổi dữ liệu ra đĩa"
      ],
      "correct": 0,
      "explanation": "Ba lựa chọn kia đều kiểm tra được trong vài phút và ít khi đúng ở một hệ thống bình thường. Chia sẻ sai thì khó tìm đúng vì mã không thể hiện gì - hai luồng ghi vào hai biến khác nhau và trông hoàn toàn độc lập."
    },
    "summary": {
      "keyIdea": "Khi hồ sơ chỉ vào một hàm đơn giản, câu trả lời nằm ở tầng dưới nó.",
      "formula": "Số lệnh mỗi chu kỳ → nếu thấp thì hỏi chờ cái gì: bộ nhớ, nhánh, hay đồng bộ.",
      "commonMistake": "Xuống tầng này trước khi thử tầng thuật toán, bỏ qua cách rẻ hơn nhiều.",
      "action": "Đo số lệnh trên mỗi chu kỳ cho đường nóng của bạn."
    },
    "application": {
      "title": "Làm ngay hôm nay",
      "message": "Đo số lệnh trên mỗi chu kỳ cho đường nóng của bạn. Đây là con số mà phần lớn kỹ sư chưa từng nhìn cho chính mã của mình.",
      "secondary": "Nếu nó thấp bất thường, bạn vừa biết rằng vấn đề không nằm trong mã bạn đang đọc mà nằm ở thứ mã đó đang chờ."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Khi hồ sơ chỉ đúng vào một hàm mà bạn không thấy gì sai trong hàm đó, câu trả lời gần như luôn nằm ở tầng dưới nó."
      },
      {
        "type": "heading",
        "text": "Hai loại công cụ"
      },
      {
        "type": "comparison",
        "left": {
          "label": "Hồ sơ hàm",
          "text": "Nói THỜI GIAN Ở ĐÂU. Đủ cho phần lớn công việc tối ưu."
        },
        "right": {
          "label": "Bộ đếm phần cứng",
          "text": "Nói VÌ SAO chỗ đó chậm. Cần khi hàm trông đơn giản mà vẫn chiếm phần lớn thời gian."
        }
      },
      {
        "type": "callout",
        "label": "Con số đầu tiên đáng nhìn",
        "text": "SỐ LỆNH TRÊN MỖI CHU KỲ. Thấp bất thường nghĩa là bộ xử lý đang đứng chờ nhiều hơn là đang làm việc - và điều đó chuyển câu hỏi từ mã của bạn sang thứ mà mã của bạn đang chờ."
      },
      {
        "type": "heading",
        "text": "Ba thứ đáng chờ"
      },
      {
        "type": "list",
        "items": [
          "BỘ NHỚ: số lượt trượt bộ nhớ đệm. Đây là nội dung bài trước, và nó là nguyên nhân phổ biến nhất.",
          "DỰ ĐOÁN NHÁNH: bộ xử lý làm việc trước theo hướng nó đoán; đoán sai thì phần đã làm bị bỏ hết. Chỉ nhánh THẤT THƯỜNG mới đắt - nhánh luôn đúng, luôn sai, hay xen kẽ đều đặn đều rẻ.",
          "ĐỒNG BỘ: gồm cả CHIA SẺ SAI, hiện tượng khó tìm nhất trong ba cái."
        ]
      },
      {
        "type": "paragraph",
        "text": "Chia sẻ sai khó tìm vì mã không thể hiện gì: hai luồng ghi vào hai BIẾN KHÁC NHAU, không có tranh chấp logic nào, nhưng hai biến đó tình cờ nằm trong cùng một khối bộ nhớ đệm - nên khối ấy bị đẩy qua lại giữa hai nhân liên tục."
      },
      {
        "type": "closing",
        "lines": [
          "Một cảnh báo về thứ tự: chỉ xuống tầng này khi tối ưu ở tầng thuật toán và tầng cấu trúc dữ liệu đã hết cách.",
          "Tối ưu ở đây cho cải thiện theo hệ số nhỏ, còn đổi thuật toán cho cải thiện theo bậc - xuống đây trước là bỏ qua cách rẻ hơn nhiều."
        ]
      }
    ]
  },
  {
    "id": 1474,
    "slug": "go-bo-diem-nghen-va-biet-khi-nao-dung",
    "title": "Runtime, Bài 4: Gỡ điểm nghẽn - và biết khi nào nên dừng",
    "subtitle": "Mỗi lần gỡ được một điểm nghẽn thì điểm nghẽn tiếp theo lộ ra, và có lúc điểm nghẽn tiếp theo là chính bạn.",
    "duration": "11 phút",
    "difficulty": "Khó",
    "track": "professional",
    "emoji": "🚪",
    "whyItMatters": "Không biết khi nào dừng là cách tiêu hết ngân sách kỹ thuật vào phần cải thiện mà không ai cảm nhận được.",
    "openingQuestion": "Bạn vừa làm một hàm nhanh gấp mười lần. Tổng thời gian giảm bao nhiêu?",
    "openingOptions": [
      "Tuỳ hàm đó chiếm bao nhiêu phần trăm tổng thời gian - nhiều nhất là đúng phần đó",
      "Khoảng mười lần, tương ứng với mức cải thiện của hàm được tối ưu",
      "Không xác định được vì còn phụ thuộc vào tải của hệ thống khi đo",
      "Khoảng một nửa, vì phần còn lại của chương trình cũng được hưởng lợi gián tiếp"
    ],
    "correctOption": 0,
    "explanation": "Nếu hàm đó chiếm hai mươi phần trăm thì làm nó nhanh vô hạn cũng chỉ giảm được hai mươi phần trăm. Đây là trần cứng, và nó là lý do phải tính mức cải thiện tối đa TRƯỚC khi bắt tay vào tối ưu - nhiều lượt tối ưu tốn hàng tuần cho một trần chỉ vài phần trăm.",
    "diagram": [
      {
        "label": "Trần cứng: phần trăm mà chỗ đó đang chiếm",
        "arrow": true
      },
      {
        "label": "Tính trần TRƯỚC khi bắt tay, không phải sau",
        "arrow": true
      },
      {
        "label": "Gỡ xong một chỗ thì chỗ tiếp theo lộ ra - đo lại từ đầu",
        "arrow": true
      },
      {
        "label": "Dừng khi cải thiện tiếp không ai cảm nhận được"
      }
    ],
    "realWorldExample": {
      "company": "Điểm nghẽn tiếp theo có thể là con người",
      "description": "Sau vài vòng tối ưu, mã thường phức tạp hơn hẳn lúc đầu. Từ một mức nào đó, thứ giới hạn tốc độ của cả đội không còn là hệ thống mà là thời gian mọi người cần để hiểu và sửa được phần mã đã tối ưu ấy."
    },
    "quiz": [
      {
        "question": "Vì sao phải tính mức cải thiện tối đa trước khi tối ưu?",
        "options": [
          "Vì trần cứng bằng đúng phần trăm mà chỗ đó đang chiếm, và nó thường nhỏ",
          "Vì cần có con số để báo cáo kết quả sau khi công việc hoàn thành",
          "Vì mức cải thiện quyết định nên chọn kỹ thuật tối ưu nào cho phù hợp",
          "Vì cần so sánh với chi phí hạ tầng tiết kiệm được để tính hiệu quả đầu tư"
        ],
        "correct": 0,
        "explanation": "Nhiều lượt tối ưu tốn hàng tuần cho một trần chỉ vài phần trăm, và phép tính chặn được điều đó mất năm phút. Ba lựa chọn kia đều hữu ích và đều là việc làm sau."
      },
      {
        "question": "Vì sao phải đo lại từ đầu sau mỗi lần gỡ được một điểm nghẽn?",
        "options": [
          "Vì tỷ lệ giữa các phần đã đổi, nên chỗ đáng làm tiếp theo có thể khác hẳn",
          "Vì cần xác nhận rằng thay đổi vừa rồi thật sự mang lại cải thiện đo được",
          "Vì thay đổi có thể đã làm chậm một phần khác của chương trình",
          "Vì kết quả đo cũ đã không còn phản ánh đúng phiên bản mã hiện tại"
        ],
        "correct": 0,
        "explanation": "Ba lựa chọn kia đều là lý do đúng để đo lại. Cái này giải thích vì sao phải đo lại TỪ ĐẦU chứ không chỉ đo chỗ vừa sửa: danh sách ưu tiên đã thay đổi, và chỗ đứng thứ tư trước đây có thể giờ đứng đầu."
      },
      {
        "question": "Dấu hiệu nào cho thấy nên dừng tối ưu?",
        "options": [
          "Mức cải thiện tiếp theo nằm dưới ngưỡng mà người dùng cảm nhận được",
          "Mã đã trở nên khó đọc tới mức người mới trong đội hoàn toàn không hiểu được",
          "Đã đạt được mục tiêu hiệu năng đặt ra từ đầu của dự án tối ưu",
          "Không còn tìm thấy điểm nghẽn nào rõ ràng trong hồ sơ hiệu năng"
        ],
        "correct": 0,
        "explanation": "Lựa chọn thứ hai là chi phí thật nhưng nó là hệ quả chứ không phải tiêu chí dừng. Lựa chọn thứ ba giả định mục tiêu ban đầu đặt đúng, còn tiêu chí này thì tự nó đúng bất kể mục tiêu đặt thế nào."
      },
      {
        "question": "Vì sao điểm nghẽn tiếp theo có thể là chính đội ngũ?",
        "options": [
          "Vì mã đã tối ưu thường phức tạp hơn, nên mọi thay đổi sau đó đều chậm lại",
          "Vì đội cần học thêm kỹ thuật mới để tiếp tục tối ưu ở mức sâu hơn",
          "Vì số người hiểu được phần mã đã tối ưu giảm xuống chỉ còn vài người",
          "Vì thời gian dành cho tối ưu lấy mất thời gian làm tính năng mới"
        ],
        "correct": 0,
        "explanation": "Lựa chọn thứ ba là một cách diễn đạt hẹp hơn của cùng ý này. Điều đáng nói là nó áp dụng cho MỌI thay đổi sau đó, không chỉ cho việc tối ưu tiếp - nên chi phí lan ra toàn bộ vòng đời còn lại."
      },
      {
        "question": "Cách nào thường cho cải thiện lớn hơn tối ưu mã?",
        "options": [
          "Không làm việc đó nữa - bỏ bớt công việc thay vì làm nó nhanh hơn",
          "Chuyển sang phần cứng mạnh hơn để có thêm năng lực xử lý",
          "Chạy công việc đó song song trên nhiều luồng hoặc nhiều máy",
          "Đặt bộ nhớ đệm cho kết quả để có thể tránh tính lại những thứ đã tính"
        ],
        "correct": 0,
        "explanation": "Ba lựa chọn kia đều làm công việc đó nhanh hơn hoặc rẻ hơn, và đều bị chặn bởi cùng trần cứng. Bỏ bớt công việc thì không có trần - một truy vấn không chạy thì nhanh vô hạn."
      }
    ],
    "keyTakeaways": [
      "Trần cứng bằng đúng phần trăm mà chỗ đó đang chiếm - tính TRƯỚC khi bắt tay.",
      "Gỡ xong một chỗ thì tỷ lệ đổi - đo lại TỪ ĐẦU, không chỉ đo chỗ vừa sửa.",
      "Dừng khi mức cải thiện tiếp theo nằm dưới ngưỡng người dùng cảm nhận được.",
      "Mã đã tối ưu làm chậm MỌI thay đổi sau đó, không chỉ việc tối ưu tiếp.",
      "Bỏ bớt công việc không có trần - một truy vấn không chạy thì nhanh vô hạn."
    ],
    "practicePrompt": {
      "question": "Hàm chiếm 8% thời gian, ước tính tối ưu được gấp đôi. Có nên làm không?",
      "options": [
        "Không - trần là 4%, và con số đó gần như chắc chắn không ai cảm nhận được",
        "Có, vì 4% là mức cải thiện đáng kể với một hệ thống có lưu lượng lớn",
        "Cần đo thêm để biếtxác mức cải thiện thật trước khi quyết định",
        "Có, nếu việc tối ưu không làm mã phức tạp hơn mức hiện tại đáng kể"
      ],
      "correct": 0,
      "explanation": "Phép tính này mất năm phút và nó chặn được cả tuần công việc. Lựa chọn thứ hai đúng trong trường hợp mục tiêu là chi phí hạ tầng chứ không phải trải nghiệm - và lúc đó nên nói rõ mục tiêu là gì trước khi bắt đầu."
    },
    "summary": {
      "keyIdea": "Mỗi lần gỡ được một điểm nghẽn thì điểm nghẽn tiếp theo lộ ra.",
      "formula": "Tính trần → sửa một chỗ → đo lại từ đầu → dừng khi dưới ngưỡng cảm nhận.",
      "commonMistake": "Bắt tay tối ưu trước khi tính trần, rồi tốn hàng tuần cho vài phần trăm.",
      "action": "Với việc tối ưu bạn đang định làm, tính trần cứng của nó trước."
    },
    "application": {
      "title": "Làm ngay hôm nay",
      "message": "Với việc tối ưu bạn đang định làm, tính trần cứng: phần đó đang chiếm bao nhiêu phần trăm tổng thời gian?",
      "secondary": "Rồi hỏi câu thứ hai, câu thường bị bỏ qua: có cách nào KHÔNG làm việc đó nữa không? Cách đó không có trần, còn mọi cách tối ưu đều có."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Không biết khi nào dừng là cách tiêu hết ngân sách kỹ thuật vào phần cải thiện mà không ai cảm nhận được."
      },
      {
        "type": "heading",
        "text": "Trần cứng"
      },
      {
        "type": "callout",
        "label": "Bằng đúng phần trăm chỗ đó đang chiếm",
        "text": "Nếu một hàm chiếm hai mươi phần trăm thì làm nó nhanh vô hạn cũng chỉ giảm được hai mươi phần trăm. Phép tính này mất năm phút và nó chặn được cả tuần công việc cho một trần chỉ vài phần trăm."
      },
      {
        "type": "heading",
        "text": "Sau mỗi lần gỡ"
      },
      {
        "type": "paragraph",
        "text": "Đo lại TỪ ĐẦU, không chỉ đo chỗ vừa sửa. Tỷ lệ giữa các phần đã đổi, nên danh sách ưu tiên cũng đổi - chỗ đứng thứ tư trước đây có thể giờ đứng đầu, và chỗ bạn định làm tiếp có thể đã tụt xuống."
      },
      {
        "type": "heading",
        "text": "Khi nào dừng"
      },
      {
        "type": "comparison",
        "left": {
          "label": "Tiêu chí đúng",
          "text": "Mức cải thiện tiếp theo nằm dưới ngưỡng mà người dùng cảm nhận được. Tiêu chí này đúng bất kể mục tiêu ban đầu đặt thế nào."
        },
        "right": {
          "label": "Chi phí nếu không dừng",
          "text": "Mã đã tối ưu phức tạp hơn hẳn, và nó làm chậm MỌI thay đổi sau đó - không chỉ việc tối ưu tiếp."
        }
      },
      {
        "type": "paragraph",
        "text": "Từ một mức nào đó, thứ giới hạn tốc độ của cả đội không còn là hệ thống mà là thời gian mọi người cần để hiểu và sửa được phần mã ấy. Điểm nghẽn tiếp theo là chính đội ngũ."
      },
      {
        "type": "closing",
        "lines": [
          "Và một câu hỏi nên hỏi trước mọi lượt tối ưu: có cách nào KHÔNG làm việc đó nữa không? Bỏ bớt công việc thì không có trần - một truy vấn không chạy thì nhanh vô hạn.",
          "Đây cũng là bài khép lại chặng runtime: từ máy ảo, bố cục bộ nhớ, bộ đếm phần cứng, tới câu hỏi cuối cùng là có đáng làm tiếp hay không."
        ]
      }
    ]
  },
];
