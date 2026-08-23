import type { Lesson } from "./lesson-types";

// Chặng "Kiểm thử: cách một bản phát hành được xác nhận" (ids 1531-1536).
//
// Cả một tổ chức có thể ra quyết định phát hành dựa trên hai chữ màu xanh,
// trong khi hai chữ đó khẳng định ít hơn nhiều so với những gì người đọc
// nghĩ. Chặng này nói về kết luận kiểm thử khẳng định gì, chọn mẫu thế nào,
// và lớp lỗi mà kiểm thử về nguyên tắc không bắt được.

export const TESTING_LESSONS: Lesson[] = [
  {
    "id": 1531,
    "slug": "ket-luan-kiem-thu-khang-dinh-dieu-gi",
    "title": "Kiểm thử, Bài 1: Kết luận kiểm thử khẳng định điều gì - và không khẳng định gì",
    "subtitle": "Bộ kiểm thử xanh nói rằng chưa tìm thấy lỗi, không nói rằng không có lỗi.",
    "duration": "11 phút",
    "difficulty": "Trung bình",
    "track": "professional",
    "emoji": "🔍",
    "interactiveType": "sampling",
    "whyItMatters": "Cả một tổ chức có thể ra quyết định phát hành dựa trên hai chữ màu xanh, trong khi hai chữ đó khẳng định ít hơn nhiều so với những gì người đọc nghĩ.",
    "openingQuestion": "Bộ kiểm thử chạy xanh toàn bộ. Điều đó khẳng định gì?",
    "openingOptions": [
      "Những trường hợp đã được viết ra đều chạy đúng - không nói gì về trường hợp chưa viết",
      "Phần mềm không còn lỗi nào trong phạm vi các tính năng đã được phát triển",
      "Phần mềm đủ chất lượng để được phát hành lên môi trường thật cho người dùng",
      "Các thay đổi trong bản này không làm hỏng bất kỳ tính năng nào đang chạy"
    ],
    "correctOption": 0,
    "explanation": "Kiểm thử là một mẫu, và mẫu chỉ nói về những gì nằm trong mẫu. Lựa chọn thứ tư nghe gần đúng và nó vẫn quá mạnh: nó chỉ đúng với những tính năng CÓ kiểm thử bao phủ, và phần không được bao phủ là phần bạn không biết mình không biết. Đây là khác biệt giữa chưa tìm thấy lỗi và không có lỗi.",
    "diagram": [
      {
        "label": "Kiểm thử là một MẪU - nó nói về mẫu, không về tổng thể",
        "arrow": true
      },
      {
        "label": "Xanh = chưa tìm thấy lỗi, không phải không có lỗi",
        "arrow": true
      },
      {
        "label": "Ba loại kết luận: qua, không qua, và KHÔNG KẾT LUẬN ĐƯỢC",
        "arrow": true
      },
      {
        "label": "Loại thứ ba hay bị đọc nhầm thành loại thứ nhất"
      }
    ],
    "realWorldExample": {
      "company": "Kết luận thứ ba",
      "description": "Một phép kiểm bị bỏ qua vì môi trường chưa sẵn sàng không phải là qua và cũng không phải là không qua - nó là không kết luận được. Trên bảng kết quả nó thường hiện màu xám hoặc bị ẩn đi, và người đọc bảng lướt qua nó như thể mọi thứ đều ổn."
    },
    "quiz": [
      {
        "question": "Vì sao nói kiểm thử là một mẫu?",
        "options": [
          "Vì nó chỉ chạy những trường hợp đã được viết ra, không phải mọi trường hợp có thể",
          "Vì nó chỉ chạy trên một phần dữ liệu chứ không chạy trên toàn bộ dữ liệu thật",
          "Vì mỗi lần chạy chỉ dùng một phần trong bộ kiểm thử để tiết kiệm thời gian",
          "Vì môi trường kiểm thử chỉ mô phỏng được một phần của môi trường thật"
        ],
        "correct": 0,
        "explanation": "Số trạng thái có thể của một hệ thống thực tế là vô hạn, còn số phép kiểm thì hữu hạn. Lựa chọn thứ tư mô tả một hạn chế khác cũng thật, nhưng nó nói về CHẤT lượng của mẫu chứ không nói vì sao nó là mẫu."
      },
      {
        "question": "Loại kết luận thứ ba là gì và vì sao nó nguy hiểm?",
        "options": [
          "Không kết luận được - nó hiện màu xám và người đọc lướt qua như thể mọi thứ ổn",
          "Qua nhưng có cảnh báo - nó dễ bị bỏ qua vì không chặn được quá trình phát hành",
          "Không qua nhưng hoàn toàn không lặp lại - nó bị coi chính là lỗi ngẫu nhiên và đã được chạy lại",
          "Qua sau khi chạy lại - nó che giấu một lỗi chỉ xuất hiện trong một số điều kiện"
        ],
        "correct": 0,
        "explanation": "Ba lựa chọn kia đều là vấn đề thật của bảng kết quả. Cái này khác ở chỗ nó là một loại kết luận riêng về mặt logic, và gộp nó vào loại qua là một sai lầm về suy luận chứ không phải về quy trình."
      },
      {
        "question": "Vì sao độ bao phủ mã cao không đảm bảo chất lượng?",
        "options": [
          "Vì chạy qua một dòng mã khác với kiểm tra rằng dòng đó cho kết quả đúng",
          "Vì độ bao phủ chỉ tính những dòng đã chạy chứ không tính các nhánh điều kiện",
          "Vì các phần mã quan trọng nhất thường là phần khó viết kiểm thử nhất",
          "Vì độ bao phủ không phản ánh được chất lượng của dữ liệu dùng trong kiểm thử"
        ],
        "correct": 0,
        "explanation": "Một phép kiểm gọi hàm rồi không kiểm tra gì cả vẫn tính là đã bao phủ. Đây là lý do độ bao phủ hữu ích như một chỉ báo NGƯỢC - bao phủ thấp chắc chắn là vấn đề - nhưng bao phủ cao thì không khẳng định được gì."
      },
      {
        "question": "Điều gì nên đi kèm khi báo cáo kết quả kiểm thử cho người ra quyết định?",
        "options": [
          "Phạm vi đã kiểm và phạm vi chưa kiểm, vì cái thứ hai mới quyết định rủi ro còn lại",
          "Số lượng phép kiểm đã chạy và tỷ lệ phần trăm phép kiểm chạy thành công",
          "Thời gian chạy của chính bộ kiểm thử cùng với số lượng lỗi phát hiện được ở ngay trong lần này",
          "Danh sách các phép kiểm mới được thêm vào kể từ lần phát hành trước đó"
        ],
        "correct": 0,
        "explanation": "Ba lựa chọn kia đều mô tả những gì ĐÃ làm, và chúng khiến người đọc yên tâm theo tỷ lệ với con số. Phạm vi chưa kiểm là thứ duy nhất trả lời được câu hỏi họ thật sự cần: nếu có gì hỏng thì nó sẽ hỏng ở đâu."
      },
      {
        "question": "Bộ kiểm thử xanh liên tục trong sáu tháng nói lên điều gì?",
        "options": [
          "Có thể bộ kiểm thử đã không còn theo kịp những thay đổi của hệ thống",
          "Chất lượng mã của đội đã ổn định và quy trình phát triển đang hoạt động tốt",
          "Bộ kiểm thử đã bao phủ đủ những phần quan trọng nhất của hệ thống",
          "Các lỗi được phát hiện và sửa ngay trong quá trình phát triển trước khi chạy"
        ],
        "correct": 0,
        "explanation": "Một bộ kiểm thử không bao giờ bắt được gì thì hoặc là mã hoàn hảo, hoặc là bộ kiểm thử đang kiểm những thứ không còn thay đổi nữa. Khả năng thứ hai phổ biến hơn nhiều, và nó không tự báo."
      }
    ],
    "keyTakeaways": [
      "Kiểm thử là một mẫu: xanh nghĩa là CHƯA TÌM THẤY lỗi, không phải không có lỗi.",
      "Ba loại kết luận: qua, không qua, và KHÔNG KẾT LUẬN ĐƯỢC - loại ba hay bị gộp vào loại một.",
      "Độ bao phủ cao không khẳng định gì; bao phủ thấp thì chắc chắn là vấn đề.",
      "Báo cáo phải nói cả PHẠM VI CHƯA KIỂM - đó mới là rủi ro còn lại.",
      "Xanh liên tục rất lâu thường nghĩa là bộ kiểm thử đã không theo kịp hệ thống."
    ],
    "practicePrompt": {
      "question": "Người quản lý hỏi bản này đã kiểm kỹ chưa. Câu trả lời hữu ích nhất là gì?",
      "options": [
        "Nêu phần nào đã kiểm, phần nào chưa, và rủi ro lớn nhất còn lại nằm ở đâu",
        "Nêu số lượng phép kiểm đã chạy và tỷ lệ phần trăm bao phủ mã đạt được",
        "Trả lời rằng toàn bộ bộ kiểm thử đã chạy xanh nên bản này sẵn sàng phát hành",
        "Nêu danh sách các lỗi đã phát hiện và xác nhận rằng tất cả đã được sửa xong"
      ],
      "correct": 0,
      "explanation": "Ba câu trả lời kia đều đúng về mặt sự kiện và đều để người hỏi mang đi một kết luận mạnh hơn dữ liệu. Người ra quyết định cần biết rủi ro còn lại nằm ở đâu để cân với thời điểm phát hành."
    },
    "summary": {
      "keyIdea": "Kiểm thử là một mẫu; kết luận của nó chỉ nói về những gì nằm trong mẫu.",
      "formula": "Báo cáo = đã kiểm gì + chưa kiểm gì + rủi ro lớn nhất còn lại ở đâu.",
      "commonMistake": "Đọc xanh thành không có lỗi, và gộp không kết luận được vào qua.",
      "action": "Xem bảng kết quả gần nhất và đếm xem có bao nhiêu mục màu xám."
    },
    "application": {
      "title": "Làm ngay hôm nay",
      "message": "Mở bảng kết quả kiểm thử gần nhất và đếm số mục bị bỏ qua hoặc không chạy được. Đó là loại kết luận thứ ba, và nó thường bị đọc như loại thứ nhất.",
      "secondary": "Rồi thêm một dòng vào báo cáo phát hành: phạm vi CHƯA kiểm. Nó là dòng duy nhất trả lời được câu nếu có gì hỏng thì nó sẽ hỏng ở đâu."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Cả một tổ chức có thể ra quyết định phát hành dựa trên hai chữ màu xanh, trong khi hai chữ đó khẳng định ít hơn nhiều so với những gì người đọc nghĩ."
      },
      {
        "type": "heading",
        "text": "Kiểm thử là một mẫu"
      },
      {
        "type": "callout",
        "label": "Mẫu chỉ nói về mẫu",
        "text": "Số trạng thái có thể của một hệ thống thực tế là vô hạn; số phép kiểm thì hữu hạn. Bộ kiểm thử xanh nói rằng những trường hợp ĐÃ ĐƯỢC VIẾT RA đều chạy đúng - và không nói gì về những trường hợp chưa ai nghĩ tới."
      },
      {
        "type": "heading",
        "text": "Ba loại kết luận, không phải hai"
      },
      {
        "type": "list",
        "items": [
          "QUA: phép kiểm chạy và cho kết quả đúng như mong đợi.",
          "KHÔNG QUA: phép kiểm chạy và kết quả khác mong đợi.",
          "KHÔNG KẾT LUẬN ĐƯỢC: phép kiểm không chạy - môi trường chưa sẵn sàng, phụ thuộc chưa lên, hoặc nó bị bỏ qua."
        ]
      },
      {
        "type": "paragraph",
        "text": "Loại thứ ba là một kết luận riêng về mặt logic, nhưng trên bảng kết quả nó thường hiện màu xám hoặc bị ẩn đi. Người đọc lướt qua nó như thể mọi thứ đều ổn - và gộp nó vào loại thứ nhất là một sai lầm về suy luận, không phải về quy trình."
      },
      {
        "type": "heading",
        "text": "Về độ bao phủ"
      },
      {
        "type": "comparison",
        "left": {
          "label": "Bao phủ thấp",
          "text": "Chắc chắn là vấn đề. Ở đây con số nói được điều gì đó."
        },
        "right": {
          "label": "Bao phủ cao",
          "text": "Không khẳng định được gì. Một phép kiểm gọi hàm rồi không kiểm tra kết quả vẫn tính là đã bao phủ - chạy qua một dòng khác với kiểm tra dòng đó đúng."
        }
      },
      {
        "type": "closing",
        "lines": [
          "Nên khi báo cáo, đừng dừng ở những gì đã làm. Số phép kiểm và tỷ lệ bao phủ khiến người đọc yên tâm theo tỷ lệ với con số; PHẠM VI CHƯA KIỂM mới trả lời được câu họ thật sự cần.",
          "Bài sau là cách quyết định kiểm cái gì trước, khi không kiểm hết được."
        ]
      }
    ]
  },
  {
    "id": 1532,
    "slug": "muc-nghiem-trong-va-rui-ro-trong-kiem-thu",
    "title": "Kiểm thử, Bài 2: Mức nghiêm trọng và rủi ro - cách quyết định kiểm cái gì",
    "subtitle": "Không kiểm hết được, nên câu hỏi thật là chọn mẫu thế nào - kiểm cái gì trước.",
    "duration": "12 phút",
    "difficulty": "Khó",
    "track": "professional",
    "emoji": "🎯",
    "interactiveType": "sampling",
    "whyItMatters": "Phân bổ công kiểm thử theo cảm giác thì phần được kiểm kỹ nhất thường là phần dễ kiểm nhất, chứ không phải phần hỏng thì đau nhất.",
    "openingQuestion": "Nên dồn công kiểm thử vào đâu?",
    "openingOptions": [
      "Nơi xác suất hỏng nhân với thiệt hại khi hỏng là lớn nhất",
      "Nơi có nhiều thay đổi nhất trong bản phát hành này so với bản trước",
      "Nơi có độ bao phủ mã thấp nhất để nâng chỉ số bao phủ lên đồng đều",
      "Nơi người dùng sử dụng nhiều nhất tính theo số lượt truy cập mỗi ngày"
    ],
    "correctOption": 0,
    "explanation": "Hai thừa số này độc lập với nhau và cả hai đều cần. Phần thay đổi nhiều có xác suất hỏng cao nhưng nếu nó là trang cài đặt hiển thị thì thiệt hại nhỏ; phần thanh toán ít thay đổi nhưng hỏng một lần là mất tiền thật. Chọn theo lượt truy cập thì bỏ sót những luồng ít dùng mà hỏng thì không sửa được.",
    "diagram": [
      {
        "label": "Xác suất hỏng × thiệt hại khi hỏng = thứ tự ưu tiên",
        "arrow": true
      },
      {
        "label": "Xác suất: mã mới, mã phức tạp, mã hay sửa, mã ít người hiểu",
        "arrow": true
      },
      {
        "label": "Thiệt hại: mất tiền, mất dữ liệu, lộ dữ liệu, không sửa lại được",
        "arrow": true
      },
      {
        "label": "Phân biệt mức nghiêm trọng với mức ưu tiên - hai thang khác nhau"
      }
    ],
    "realWorldExample": {
      "company": "Nghiêm trọng không bằng ưu tiên",
      "description": "Một lỗi làm sai số tiền hiển thị trên hoá đơn là nghiêm trọng cao. Nếu nó chỉ xảy ra với một loại tiền tệ mà ba khách hàng dùng thì ưu tiên có thể thấp. Gộp hai thang này lại thì hoặc bạn hoãn phát hành vì một lỗi hiếm, hoặc bạn phát hành kèm một lỗi phổ biến."
    },
    "quiz": [
      {
        "question": "Vì sao chọn phần kiểm thử theo lượt truy cập là chưa đủ?",
        "options": [
          "Vì nó bỏ sót những luồng ít dùng mà hỏng thì hậu quả không sửa lại được",
          "Vì số lượt truy cập thay đổi theo mùa nên thứ tự ưu tiên sẽ không ổn định",
          "Vì các luồng nhiều lượt truy cập thường đã được kiểm thử kỹ từ trước",
          "Vì lượt truy cập không phản ánh được mức độ phức tạp của phần mã đó"
        ],
        "correct": 0,
        "explanation": "Luồng xoá tài khoản hay luồng khôi phục dữ liệu có lượt truy cập rất thấp, và hỏng một lần là một người dùng mất vĩnh viễn thứ họ không lấy lại được. Tần suất là một phần của xác suất, không phải của thiệt hại."
      },
      {
        "question": "Dấu hiệu nào cho thấy một phần mã có xác suất hỏng cao?",
        "options": [
          "Nó mới, phức tạp, hay bị sửa, hoặc chỉ có một người trong đội hiểu nó",
          "Nó có độ bao phủ kiểm thử thấp hơn mức trung bình của cả kho mã",
          "Nó gọi tới nhiều dịch vụ bên ngoài mà đội không kiểm soát được",
          "Nó nằm ở ngay trong phần đã được người dùng phản ánh nhiều nhất qua kênh hỗ trợ"
        ],
        "correct": 0,
        "explanation": "Bốn dấu hiệu này đo được từ lịch sử kho mã mà không cần phán đoán. Lựa chọn thứ hai là hệ quả chứ không phải nguyên nhân, và lựa chọn thứ tư là chỉ báo trễ - nó cho biết chỗ đã hỏng rồi."
      },
      {
        "question": "Mức nghiêm trọng khác mức ưu tiên ở chỗ nào?",
        "options": [
          "Nghiêm trọng đo hậu quả khi lỗi xảy ra; ưu tiên còn tính cả tần suất và bối cảnh",
          "Nghiêm trọng do đội kiểm thử đánh giá còn ưu tiên do đội sản phẩm quyết định",
          "Nghiêm trọng là thang cố định còn ưu tiên thay đổi theo từng bản phát hành",
          "Nghiêm trọng nói về mức độ ảnh hưởng còn ưu tiên nói về thời hạn phải sửa xong"
        ],
        "correct": 0,
        "explanation": "Lựa chọn thứ hai mô tả đúng ai thường điền vào ô nào, nhưng đó là hệ quả của phân biệt trên chứ không phải bản chất. Gộp hai thang lại thì hoặc bạn hoãn phát hành vì một lỗi hiếm, hoặc bạn phát hành kèm một lỗi phổ biến."
      },
      {
        "question": "Vì sao thang nghiêm trọng cần định nghĩa bằng ví dụ cụ thể?",
        "options": [
          "Vì các mức trừu tượng như cao hay trung bình được mỗi người hiểu một kiểu",
          "Vì các công cụ quản lý lỗi yêu cầu cấu hình sẵn các mức trước khi dùng",
          "Vì ví dụ cụ thể giúp người mới trong đội học được cách phân loại nhanh hơn",
          "Vì cần có bằng chứng khi giải thích quyết định phân loại cho các bên liên quan"
        ],
        "correct": 0,
        "explanation": "Không có ví dụ neo lại thì mức nghiêm trọng trôi theo tâm trạng và theo áp lực phát hành. Định nghĩa mức cao nhất bằng ba tình huống cụ thể của chính sản phẩm bạn thì nó đo được bởi hai người khác nhau và cho cùng kết quả."
      },
      {
        "question": "Điều gì xảy ra khi phân bổ công kiểm thử theo cảm giác?",
        "options": [
          "Phần được kiểm kỹ nhất thành phần DỄ kiểm nhất, không phải phần quan trọng nhất",
          "Công kiểm thử đã được phân bổ đều cho mọi phần nên rốt cuộc cũng không có phần nào bị bỏ sót",
          "Đội tập trung vào những phần vừa phát hiện lỗi nên bỏ qua phần khác",
          "Thời gian kiểm thử bị kéo dài vì không có tiêu chí để biết khi nào dừng lại"
        ],
        "correct": 0,
        "explanation": "Đây là lệch hệ thống chứ không phải sơ suất ngẫu nhiên: viết kiểm thử cho một hàm thuần tuý mất mười lăm phút, còn cho luồng thanh toán có ba dịch vụ ngoài mất hai ngày. Không có tiêu chí thì công trôi về phía rẻ."
      }
    ],
    "keyTakeaways": [
      "Thứ tự ưu tiên = xác suất hỏng NHÂN thiệt hại khi hỏng, cần cả hai thừa số.",
      "Xác suất cao: mã mới, phức tạp, hay sửa, hoặc chỉ một người hiểu.",
      "Thiệt hại cao: mất tiền, mất dữ liệu, lộ dữ liệu, và nhất là không sửa lại được.",
      "Nghiêm trọng đo hậu quả; ưu tiên còn tính tần suất và bối cảnh. Hai thang khác nhau.",
      "Không có tiêu chí thì công kiểm thử trôi về phía DỄ, không về phía quan trọng."
    ],
    "practicePrompt": {
      "question": "Luồng xoá tài khoản có rất ít lượt dùng. Nên xếp nó ở đâu?",
      "options": [
        "Cao, vì hỏng một lần là một người mất vĩnh viễn thứ không lấy lại được",
        "Thấp, vì tần suất sử dụng thấp nên xác suất gặp lỗi cũng rất thấp",
        "Trung bình, vì thật sự cần cân đối giữa tần suất thấp và hậu quả tương đối lớn hơn",
        "Thấp, vì người dùng xoá tài khoản đã có ý định rời đi nên ít khiếu nại"
      ],
      "correct": 0,
      "explanation": "Tần suất thấp làm giảm thừa số xác suất, nhưng thừa số thiệt hại ở đây thuộc loại cao nhất: KHÔNG SỬA LẠI ĐƯỢC. Một tích số có thừa số rất lớn thì thừa số nhỏ kia không kéo nó xuống nhiều."
    },
    "summary": {
      "keyIdea": "Không kiểm hết được, nên câu hỏi thật là kiểm cái gì trước.",
      "formula": "Xác suất hỏng × thiệt hại khi hỏng, và giữ nghiêm trọng tách khỏi ưu tiên.",
      "commonMistake": "Phân bổ theo cảm giác, nên phần kiểm kỹ nhất là phần dễ kiểm nhất.",
      "action": "Xếp năm phần của hệ thống theo tích xác suất nhân thiệt hại."
    },
    "application": {
      "title": "Làm ngay hôm nay",
      "message": "Liệt kê năm phần của hệ thống và cho mỗi phần hai điểm: xác suất hỏng và thiệt hại khi hỏng. Rồi xếp theo tích số.",
      "secondary": "So thứ tự đó với thứ tự thực tế mà công kiểm thử của bạn đang được phân bổ. Khoảng chênh giữa hai danh sách là phần đang trôi về phía dễ."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bài trước kết luận kiểm thử là một mẫu. Bài này là cách chọn mẫu: không kiểm hết được, nên câu hỏi thật là kiểm cái gì trước."
      },
      {
        "type": "heading",
        "text": "Hai thừa số"
      },
      {
        "type": "comparison",
        "left": {
          "label": "Xác suất hỏng",
          "text": "Mã mới, mã phức tạp, mã hay bị sửa, mã chỉ có một người trong đội hiểu. Bốn dấu hiệu này đo được từ lịch sử kho mã, không cần phán đoán."
        },
        "right": {
          "label": "Thiệt hại khi hỏng",
          "text": "Mất tiền, mất dữ liệu, lộ dữ liệu. Và mức cao nhất: KHÔNG SỬA LẠI ĐƯỢC."
        }
      },
      {
        "type": "paragraph",
        "text": "Cả hai đều cần. Phần thay đổi nhiều có xác suất cao nhưng nếu nó là trang cài đặt hiển thị thì thiệt hại nhỏ; phần thanh toán ít thay đổi nhưng hỏng một lần là mất tiền thật."
      },
      {
        "type": "callout",
        "label": "Đừng chọn theo lượt truy cập",
        "text": "Luồng xoá tài khoản hay luồng khôi phục dữ liệu có lượt dùng rất thấp, và hỏng một lần là một người mất vĩnh viễn thứ họ không lấy lại được. Tần suất là một phần của XÁC SUẤT, không phải của thiệt hại."
      },
      {
        "type": "heading",
        "text": "Hai thang, đừng gộp"
      },
      {
        "type": "paragraph",
        "text": "NGHIÊM TRỌNG đo hậu quả khi lỗi xảy ra. ƯU TIÊN còn tính cả tần suất và bối cảnh phát hành. Một lỗi làm sai số tiền trên hoá đơn là nghiêm trọng cao; nếu nó chỉ xảy ra với một loại tiền tệ mà ba khách hàng dùng thì ưu tiên có thể thấp."
      },
      {
        "type": "paragraph",
        "text": "Gộp hai thang lại thì hoặc bạn hoãn phát hành vì một lỗi hiếm, hoặc bạn phát hành kèm một lỗi phổ biến. Và thang nghiêm trọng phải được neo bằng VÍ DỤ CỤ THỂ của chính sản phẩm bạn, nếu không nó trôi theo áp lực phát hành."
      },
      {
        "type": "closing",
        "lines": [
          "Vì sao phải có tiêu chí thay vì cảm giác: viết kiểm thử cho một hàm thuần tuý mất mười lăm phút, còn cho luồng thanh toán có ba dịch vụ ngoài mất hai ngày.",
          "Không có tiêu chí thì công trôi về phía rẻ, và phần được kiểm kỹ nhất thành phần DỄ kiểm nhất. Bài sau là chuyện bằng chứng: cái gì đáng tin hơn cái gì."
        ]
      }
    ]
  },
  {
    "id": 1533,
    "slug": "bang-chung-kiem-thu-cai-gi-dang-tin-hon",
    "title": "Kiểm thử, Bài 3: Bằng chứng - cái gì đáng tin hơn cái gì",
    "subtitle": "Không phải mọi bằng chứng về chất lượng đều có cùng sức nặng, và thứ tự thì trái với thứ tự thuận tiện.",
    "duration": "11 phút",
    "difficulty": "Trung bình",
    "track": "professional",
    "emoji": "📑",
    "interactiveType": "sampling",
    "whyItMatters": "Quyết định phát hành luôn dựa trên bằng chứng gián tiếp, và biết bằng chứng nào yếu là cách duy nhất để không tin nó quá mức.",
    "openingQuestion": "Bằng chứng nào mạnh nhất cho việc một tính năng chạy đúng?",
    "openingOptions": [
      "Nó đang chạy trong môi trường thật và các chỉ số nghiệp vụ cho kết quả đúng",
      "Bộ kiểm thử tự động cho tính năng đó chạy xanh trên môi trường tích hợp",
      "Người phát triển đã kiểm tra thủ công toàn bộ các trường hợp sử dụng chính",
      "Bản thiết kế đã được rà soát và phê duyệt bởi những người có kinh nghiệm"
    ],
    "correctOption": 0,
    "explanation": "Thứ tự sức nặng của bằng chứng gần như ngược với thứ tự thuận tiện: cái mạnh nhất là quan sát hành vi thật trong môi trường thật, và nó cũng là cái tới muộn nhất và tốn nhất. Bằng chứng từ rà soát thiết kế là yếu nhất vì nó nói về ý định, không nói về thứ đã được xây ra.",
    "diagram": [
      {
        "label": "Mạnh nhất: hành vi thật trong môi trường thật",
        "arrow": true
      },
      {
        "label": "Rồi tới kiểm thử tự động, kiểm thủ công, rà soát",
        "arrow": true
      },
      {
        "label": "Yếu nhất: rà soát thiết kế - nói về ý định, không về thứ đã xây",
        "arrow": true
      },
      {
        "label": "Thứ tự sức nặng gần như NGƯỢC với thứ tự thuận tiện"
      }
    ],
    "realWorldExample": {
      "company": "Bằng chứng tiêu cực",
      "description": "Không có phiếu hỗ trợ nào về tính năng này là bằng chứng, nhưng là loại yếu nhất và hay bị dùng như loại mạnh nhất. Người dùng gặp lỗi thường bỏ đi thay vì báo, nên im lặng có thể nghĩa là mọi thứ ổn - hoặc nghĩa là không ai còn dùng nó."
    },
    "quiz": [
      {
        "question": "Vì sao rà soát thiết kế là bằng chứng yếu?",
        "options": [
          "Vì nó nói về ý định, không nói về thứ đã thật sự được xây ra",
          "Vì người rà soát thường không có đủ thời gian để đọc kỹ toàn bộ thiết kế",
          "Vì thiết kế thay đổi trong quá trình phát triển nên bản đã duyệt đã lỗi thời",
          "Vì rà soát chỉ phát hiện được vấn đề về kiến trúc chứ không phát hiện lỗi mã"
        ],
        "correct": 0,
        "explanation": "Ba lựa chọn kia đều làm rà soát yếu hơn nữa, nhưng chúng là khuyết điểm trong cách thực hiện. Cái này là giới hạn bản chất: kể cả một buổi rà soát hoàn hảo cũng chỉ xác nhận rằng kế hoạch hợp lý."
      },
      {
        "question": "Vì sao bằng chứng tiêu cực yếu hơn vẻ ngoài của nó?",
        "options": [
          "Vì người dùng gặp lỗi thường bỏ đi thay vì báo, nên im lặng có hai cách giải thích",
          "Vì các phiếu hỗ trợ thường xuyên bị phân loại sai nên số liệu tổng hợp lại không chính xác",
          "Vì cần thời gian để phiếu hỗ trợ tích luỹ đủ để có ý nghĩa thống kê",
          "Vì kênh hỗ trợ chỉ tiếp cận được một phần nhỏ trong tổng số người dùng"
        ],
        "correct": 0,
        "explanation": "Hai cách giải thích đó là mọi thứ ổn và không ai còn dùng nó, và chúng dẫn tới hai hành động trái ngược. Ba lựa chọn kia đều làm số liệu nhiễu hơn nhưng không tạo ra sự mơ hồ về hướng."
      },
      {
        "question": "Vì sao kiểm thủ công yếu hơn kiểm tự động?",
        "options": [
          "Vì nó không lặp lại được nên bằng chứng chỉ đúng cho đúng thời điểm đã kiểm",
          "Vì người kiểm thủ công dễ bỏ sót trường hợp hơn hẳn so với máy chạy tự động hằng ngày",
          "Vì kiểm thủ công tốn nhiều thời gian nên chỉ kiểm được ít trường hợp",
          "Vì kết quả kiểm thủ công không được ghi lại đầy đủ để đối chiếu về sau"
        ],
        "correct": 0,
        "explanation": "Ba lựa chọn kia đều là hạn chế thật nhưng chúng nói về phạm vi. Cái này nói về thời gian: một lượt kiểm thủ công hôm qua không nói gì về mã hôm nay, còn phép kiểm tự động chạy lại ở mỗi thay đổi."
      },
      {
        "question": "Vì sao kiểm thử tự động vẫn không phải bằng chứng mạnh nhất?",
        "options": [
          "Vì nó kiểm hệ thống trong điều kiện do bạn dựng ra, không phải điều kiện thật",
          "Vì các phép kiểm tự động có thể chứa lỗi giống như mã sản phẩm",
          "Vì môi trường tích hợp thường có phiên bản phụ thuộc khác môi trường thật",
          "Vì bộ kiểm thử chỉ chạy những trường hợp đã được nghĩ ra từ trước"
        ],
        "correct": 0,
        "explanation": "Ba lựa chọn kia đều là biểu hiện cụ thể của cùng một điều: dữ liệu bạn dựng, tải bạn dựng, phụ thuộc bạn giả lập. Toàn bộ điều kiện đều do bạn chọn, nên nó không đại diện cho thứ chưa ai nghĩ tới."
      },
      {
        "question": "Điều này gợi ý gì cho cách tổ chức việc kiểm chứng?",
        "options": [
          "Đưa được càng nhiều bằng chứng mạnh vào càng sớm càng tốt, vì chúng tới muộn nhất",
          "Tập trung vào kiểm thử tự động vì nó cân bằng giữa sức nặng và chi phí",
          "Giảm bớt các hoạt động rà soát vì chúng cung cấp bằng chứng yếu nhất",
          "Chờ cho có đủ bằng chứng thật mạnh trước khi ra quyết định phát hành cho người dùng"
        ],
        "correct": 0,
        "explanation": "Lựa chọn cuối là điều không làm được: bằng chứng mạnh nhất chỉ có SAU khi phát hành. Đó chính là lý do phát hành dần tồn tại - nó là cách lấy bằng chứng mạnh với một phần nhỏ người dùng."
      }
    ],
    "keyTakeaways": [
      "Mạnh nhất là hành vi thật trong môi trường thật - và nó tới muộn nhất.",
      "Rà soát thiết kế yếu nhất vì nó nói về Ý ĐỊNH, không về thứ đã xây.",
      "Kiểm thủ công yếu hơn tự động vì nó KHÔNG LẶP LẠI - chỉ đúng cho hôm đó.",
      "Kiểm tự động vẫn chạy trong điều kiện do bạn dựng, nên không đại diện cái chưa nghĩ tới.",
      "Bằng chứng tiêu cực có hai cách giải thích: mọi thứ ổn, hoặc không ai còn dùng."
    ],
    "practicePrompt": {
      "question": "Bằng chứng mạnh nhất chỉ có sau khi phát hành. Vậy phải làm sao?",
      "options": [
        "Phát hành dần - lấy bằng chứng mạnh với một phần nhỏ người dùng trước",
        "Tăng cường kiểm thử tự động để bù đắp cho việc chưa có bằng chứng thật",
        "Kéo dài giai đoạn kiểm thử trên môi trường tích hợp cho tới khi đủ tin tưởng",
        "Chấp nhận rủi ro và theo dõi chặt chỉ số trong vài giờ đầu sau khi phát hành"
      ],
      "correct": 0,
      "explanation": "Đây là chỗ hai chặng nối vào nhau: phát hành dần không phải một kỹ thuật triển khai mà là một cách lấy bằng chứng. Lựa chọn cuối mô tả đúng một nửa việc và bỏ mất nửa quan trọng là giới hạn phạm vi ảnh hưởng."
    },
    "summary": {
      "keyIdea": "Thứ tự sức nặng của bằng chứng gần như ngược với thứ tự thuận tiện.",
      "formula": "Hành vi thật > kiểm tự động > kiểm thủ công > rà soát > không có phàn nàn.",
      "commonMistake": "Dùng bằng chứng tiêu cực - không ai phàn nàn - như bằng chứng mạnh.",
      "action": "Với quyết định phát hành gần nhất, xếp hạng bằng chứng bạn đã dựa vào."
    },
    "application": {
      "title": "Làm ngay hôm nay",
      "message": "Với quyết định phát hành gần nhất của bạn, viết ra bạn đã dựa vào những bằng chứng nào và xếp chúng theo sức nặng.",
      "secondary": "Nếu phần lớn nằm ở nửa yếu của thang, đó không phải sai sót - đó là tình huống bình thường. Điều đáng làm là biết mình đang ở đó, thay vì tưởng mình ở nửa trên."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Quyết định phát hành luôn dựa trên bằng chứng gián tiếp. Biết bằng chứng nào yếu là cách duy nhất để không tin nó quá mức."
      },
      {
        "type": "heading",
        "text": "Thang sức nặng"
      },
      {
        "type": "list",
        "items": [
          "Hành vi THẬT trong môi trường thật, với chỉ số nghiệp vụ xác nhận. Mạnh nhất.",
          "Kiểm thử tự động: lặp lại được ở mỗi thay đổi, nhưng chạy trong điều kiện do bạn dựng.",
          "Kiểm thủ công: không lặp lại được, nên chỉ đúng cho đúng thời điểm đã kiểm.",
          "Rà soát mã: bắt được vấn đề mà kiểm thử không nghĩ tới, nhưng không xác nhận hành vi.",
          "Rà soát thiết kế: nói về Ý ĐỊNH, không về thứ đã được xây ra. Yếu nhất."
        ]
      },
      {
        "type": "callout",
        "label": "Ngược với thứ tự thuận tiện",
        "text": "Cái mạnh nhất tới muộn nhất và tốn nhất; cái yếu nhất làm được sớm nhất và rẻ nhất. Đây là lý do phần lớn quyết định phát hành thật sự dựa vào nửa dưới của thang này."
      },
      {
        "type": "heading",
        "text": "Một loại riêng: bằng chứng tiêu cực"
      },
      {
        "type": "comparison",
        "left": {
          "label": "Người ta đọc là",
          "text": "Không có phiếu hỗ trợ nào về tính năng này, vậy nó đang chạy tốt."
        },
        "right": {
          "label": "Nó cũng có nghĩa",
          "text": "Không ai còn dùng nó. Người dùng gặp lỗi thường bỏ đi thay vì báo - hai cách giải thích, hai hành động trái ngược."
        }
      },
      {
        "type": "closing",
        "lines": [
          "Kết luận thực dụng: đưa được càng nhiều bằng chứng mạnh vào càng sớm càng tốt. Nhưng bằng chứng mạnh nhất chỉ có SAU khi phát hành, nên chờ đủ nó là điều không làm được.",
          "Đó chính là lý do phát hành dần tồn tại - nó không phải một kỹ thuật triển khai mà là một cách lấy bằng chứng mạnh với một phần nhỏ người dùng."
        ]
      }
    ]
  },
  {
    "id": 1534,
    "slug": "chon-mau-trong-kiem-thu",
    "title": "Kiểm thử, Bài 4: Chọn mẫu - vì sao không ai kiểm hết, và làm sao vẫn kết luận được",
    "subtitle": "Số trường hợp là vô hạn; chọn mẫu là cách biến vô hạn thành một danh sách làm được.",
    "duration": "11 phút",
    "difficulty": "Khó",
    "track": "professional",
    "emoji": "🎲",
    "interactiveType": "sampling",
    "whyItMatters": "Cách chọn mẫu quyết định bạn tìm ra loại lỗi nào, và một mẫu chọn sai cho bạn cảm giác an toàn về đúng phần mà bạn chưa hề kiểm.",
    "openingQuestion": "Một hàm nhận một số nguyên. Có bao nhiêu trường hợp cần kiểm?",
    "openingOptions": [
      "Vài trường hợp, nếu chọn ở các biên - vì lỗi tập trung ở chỗ hành vi đổi",
      "Toàn bộ khoảng giá trị mà kiểu số nguyên đó có thể nhận được",
      "Một số lượng ngẫu nhiên đủ lớn để đạt được mức tin cậy thống kê",
      "Số trường hợp bằng với số nhánh điều kiện có trong thân hàm đó"
    ],
    "correctOption": 0,
    "explanation": "Kiểm hết là bất khả thi và cũng không cần: lỗi không rải đều trên khoảng giá trị mà tập trung ở chỗ hành vi ĐỔI - số không, số âm, giá trị lớn nhất, giá trị nhỏ nhất, và các ngưỡng do nghiệp vụ đặt ra. Chọn ngẫu nhiên đủ lớn thì tốn hơn nhiều và vẫn có xác suất cao bỏ sót đúng các biên.",
    "diagram": [
      {
        "label": "Lỗi tập trung ở chỗ hành vi ĐỔI, không rải đều",
        "arrow": true
      },
      {
        "label": "Chia lớp tương đương → chọn biên của mỗi lớp",
        "arrow": true
      },
      {
        "label": "Chọn theo rủi ro cho luồng, chọn ngẫu nhiên để bắt cái chưa nghĩ tới",
        "arrow": true
      },
      {
        "label": "Mẫu chọn sai cho cảm giác an toàn về đúng phần chưa kiểm"
      }
    ],
    "realWorldExample": {
      "company": "Ba cách chọn, ba loại lỗi",
      "description": "Chọn theo biên bắt lỗi ranh giới. Chọn theo rủi ro bắt lỗi ở chỗ đau nhất. Chọn ngẫu nhiên bắt loại lỗi mà hai cách kia bỏ sót vì chúng chỉ tìm ở nơi bạn đã nghĩ tới. Dùng một cách thì bạn mù với hai loại còn lại."
    },
    "quiz": [
      {
        "question": "Vì sao chọn ở biên hiệu quả hơn chọn ngẫu nhiên?",
        "options": [
          "Vì lỗi tập trung ở chỗ hành vi đổi chứ không rải đều trên khoảng giá trị",
          "Vì tất cả các giá trị biên dễ nghĩ ra hơn hẳn nên rốt cuộc tốn ít thời gian chuẩn bị hơn",
          "Vì giá trị biên thường là những giá trị mà người dùng hay nhập nhất",
          "Vì kiểm ở biên cho kết quả ổn định hơn giữa các lần chạy kiểm thử"
        ],
        "correct": 0,
        "explanation": "Đây là một giả định về phân bố lỗi, và nó được xác nhận qua thực tế: số không, số âm, giá trị lớn nhất và các ngưỡng nghiệp vụ là nơi các phép so sánh bị viết nhầm dấu lớn hơn thành lớn hơn hoặc bằng."
      },
      {
        "question": "Lớp tương đương là gì?",
        "options": [
          "Một nhóm giá trị mà hệ thống được kỳ vọng xử lý theo cùng một cách",
          "Một nhóm giá trị có cùng kiểu dữ liệu và cùng khoảng giá trị hợp lệ",
          "Một nhóm trường hợp kiểm thử được nhóm lại để chạy trong cùng một lượt",
          "Một nhóm giá trị xuất hiện với tần suất tương đương nhau trong dữ liệu thật"
        ],
        "correct": 0,
        "explanation": "Chữ ĐƯỢC KỲ VỌNG là phần quan trọng: đó là một giả định về mã, và nếu giả định sai thì mẫu của bạn sai theo. Chia lớp rồi kiểm biên của từng lớp là cách biến một khoảng vô hạn thành vài trường hợp."
      },
      {
        "question": "Vì sao vẫn cần chọn ngẫu nhiên bên cạnh hai cách kia?",
        "options": [
          "Vì hai cách kia chỉ tìm ở những nơi bạn đã nghĩ tới từ trước",
          "Vì chọn ngẫu nhiên cho phép ước lượng được tỷ lệ lỗi trên toàn bộ hệ thống",
          "Vì nó bổ sung thêm số lượng trường hợp kiểm thử để tăng độ bao phủ",
          "Vì nó giúp phát hiện những lỗi chỉ xuất hiện với các tổ hợp dữ liệu hiếm"
        ],
        "correct": 0,
        "explanation": "Lựa chọn cuối là một biểu hiện cụ thể của ý này. Điểm chung: chọn theo biên và theo rủi ro đều bắt đầu từ một mô hình về chỗ lỗi nằm, và mô hình đó chính là thứ có thể sai."
      },
      {
        "question": "Rủi ro lớn nhất của một mẫu chọn sai là gì?",
        "options": [
          "Nó cho cảm giác an toàn về đúng phần mà bạn chưa hề kiểm tới",
          "Nó làm lãng phí thời gian vào những trường hợp không có giá trị phát hiện",
          "Nó khiến độ bao phủ mã bị đánh giá cao hơn mức thực tế đạt được",
          "Nó tạo ra kết quả không lặp lại được nên khó điều tra khi có lỗi"
        ],
        "correct": 0,
        "explanation": "Lãng phí thời gian là chi phí thấy được và đo được. Cảm giác an toàn sai thì không - nó khiến bạn phân bổ ít công hơn cho đúng chỗ cần nhiều nhất, và nó chỉ lộ ra khi phần chưa kiểm hỏng trong môi trường thật."
      },
      {
        "question": "Khi số tổ hợp tham số quá lớn thì nên làm gì?",
        "options": [
          "Kiểm mọi CẶP tham số thay vì mọi tổ hợp, vì phần lớn lỗi phát sinh từ cặp",
          "Chọn ngẫu nhiên một số lượng tổ hợp đủ lớn để đại diện cho toàn bộ",
          "Chỉ kiểm những tổ hợp mà người dùng thực tế đang sử dụng nhiều nhất",
          "Giảm số tham số bằng cách gom những tham số ít dùng vào giá trị mặc định"
        ],
        "correct": 0,
        "explanation": "Đây là kỹ thuật phủ theo cặp, và nó dựa trên một quan sát thực nghiệm: phần lớn lỗi tổ hợp phát sinh từ tương tác giữa hai tham số. Nó đưa số trường hợp từ hàng nghìn xuống hàng chục mà giữ được phần lớn khả năng phát hiện."
      }
    ],
    "keyTakeaways": [
      "Lỗi tập trung ở chỗ hành vi ĐỔI, không rải đều - nên chọn ở biên.",
      "Lớp tương đương là một GIẢ ĐỊNH về mã; giả định sai thì mẫu sai theo.",
      "Ba cách chọn bắt ba loại lỗi - dùng một cách thì mù với hai loại còn lại.",
      "Chọn ngẫu nhiên cần thiết vì hai cách kia chỉ tìm ở nơi bạn đã nghĩ tới.",
      "Số tổ hợp quá lớn thì phủ theo CẶP - phần lớn lỗi tổ hợp đến từ hai tham số."
    ],
    "practicePrompt": {
      "question": "Bạn viết kiểm thử cho hàm tính phí theo bậc. Trường hợp đầu tiên nên là gì?",
      "options": [
        "Đúng giá trị ngưỡng chuyển bậc, và một đơn vị dưới nó cùng một đơn vị trên nó",
        "Một giá trị điển hình ở giữa mỗi bậc để xác nhận lại công thức của bậc đó đúng",
        "Giá trị lớn nhất và nhỏ nhất mà hàm có thể nhận được theo đặc tả",
        "Một tập giá trị ngẫu nhiên trải đều trên toàn bộ khoảng giá trị hợp lệ"
      ],
      "correct": 0,
      "explanation": "Giá trị điển hình giữa bậc là việc cần làm nhưng nó hiếm khi bắt được lỗi. Ngưỡng chuyển bậc là nơi phép so sánh bị viết nhầm dấu, và bộ ba dưới - đúng - trên bắt được cả hai chiều nhầm."
    },
    "summary": {
      "keyIdea": "Chọn mẫu là cách biến một số vô hạn trường hợp thành danh sách làm được.",
      "formula": "Chia lớp tương đương → kiểm biên từng lớp → thêm theo rủi ro → thêm ngẫu nhiên.",
      "commonMistake": "Dùng một cách chọn duy nhất, nên mù với hai loại lỗi còn lại.",
      "action": "Lấy một hàm và viết ra các lớp tương đương của tham số nó nhận."
    },
    "application": {
      "title": "Làm ngay hôm nay",
      "message": "Lấy một hàm trong mã của bạn và viết ra các lớp tương đương cho tham số của nó, rồi liệt kê biên của từng lớp.",
      "secondary": "So danh sách đó với các phép kiểm hiện có. Phần chênh lệch thường không phải trường hợp khó nghĩ - nó là trường hợp không ai nghĩ tới vì mã trông như đã xử lý rồi."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Số trường hợp có thể của một hệ thống là vô hạn. Chọn mẫu là cách biến vô hạn thành một danh sách làm được - và cách chọn quyết định bạn tìm ra loại lỗi nào."
      },
      {
        "type": "heading",
        "text": "Vì sao kiểm biên hiệu quả"
      },
      {
        "type": "callout",
        "label": "Lỗi không rải đều",
        "text": "Chúng tập trung ở chỗ hành vi ĐỔI: số không, số âm, giá trị lớn nhất, giá trị nhỏ nhất, và các ngưỡng do nghiệp vụ đặt ra. Đó là nơi phép so sánh bị viết nhầm dấu lớn hơn thành lớn hơn hoặc bằng."
      },
      {
        "type": "paragraph",
        "text": "Công cụ đi kèm là LỚP TƯƠNG ĐƯƠNG: một nhóm giá trị mà hệ thống được kỳ vọng xử lý theo cùng một cách. Chia lớp rồi kiểm biên từng lớp thì một khoảng vô hạn thành vài trường hợp. Lưu ý chữ được kỳ vọng - đó là một giả định về mã, và nếu nó sai thì mẫu của bạn sai theo."
      },
      {
        "type": "heading",
        "text": "Ba cách chọn, ba loại lỗi"
      },
      {
        "type": "list",
        "items": [
          "Theo BIÊN: bắt lỗi ranh giới.",
          "Theo RỦI RO: bắt lỗi ở chỗ đau nhất - đây là nội dung bài trước.",
          "NGẪU NHIÊN: bắt loại lỗi mà hai cách kia bỏ sót, vì chúng chỉ tìm ở nơi bạn đã nghĩ tới."
        ]
      },
      {
        "type": "paragraph",
        "text": "Cách thứ ba hay bị bỏ vì nó trông kém hiệu quả. Nhưng hai cách đầu đều bắt đầu từ một mô hình về chỗ lỗi nằm, và mô hình đó chính là thứ có thể sai - dùng một cách thì bạn mù với hai loại còn lại."
      },
      {
        "type": "heading",
        "text": "Khi tổ hợp bùng nổ"
      },
      {
        "type": "paragraph",
        "text": "Năm tham số mỗi cái bốn giá trị là hơn một nghìn tổ hợp. Kỹ thuật phủ theo CẶP dựa trên một quan sát thực nghiệm: phần lớn lỗi tổ hợp phát sinh từ tương tác giữa hai tham số, nên kiểm mọi cặp đưa con số xuống hàng chục mà giữ được phần lớn khả năng phát hiện."
      },
      {
        "type": "closing",
        "lines": [
          "Rủi ro lớn nhất của một mẫu chọn sai không phải lãng phí thời gian - đó là chi phí thấy được và đo được.",
          "Rủi ro thật là cảm giác an toàn về đúng phần bạn chưa hề kiểm tới, và nó chỉ lộ ra khi phần đó hỏng trong môi trường thật."
        ]
      }
    ]
  },
  {
    "id": 1535,
    "slug": "loi-an-va-gioi-han-cua-kiem-thu",
    "title": "Kiểm thử, Bài 5: Lỗi ẩn - vì sao chúng sống sót và giới hạn của kiểm thử",
    "subtitle": "Có một lớp lỗi mà kiểm thử về nguyên tắc không bắt được, và biết ranh giới đó là một phần của nghề.",
    "duration": "12 phút",
    "difficulty": "Khó",
    "track": "professional",
    "emoji": "🚩",
    "interactiveType": "sampling",
    "whyItMatters": "Tin rằng kiểm thử đủ kỹ sẽ bắt được mọi thứ dẫn tới việc không đầu tư vào lớp phòng vệ thứ hai - thứ duy nhất bắt được loại lỗi này.",
    "openingQuestion": "Loại lỗi nào kiểm thử về nguyên tắc không bắt được?",
    "openingOptions": [
      "Lỗi ở chỗ đặc tả sai - mã làm đúng thứ đã viết ra, và thứ đó không đúng",
      "Lỗi chỉ xuất hiện khi hệ thống chịu tải cao hơn mức kiểm thử mô phỏng được",
      "Lỗi phát sinh từ tương tác giữa nhiều thành phần chạy đồng thời với nhau",
      "Lỗi trong tất cả các thư viện bên thứ ba mà đội hoàn toàn không kiểm soát được mã nguồn"
    ],
    "correctOption": 0,
    "explanation": "Ba loại kia đều khó bắt và đều bắt được về nguyên tắc, bằng kiểm thử tải, kiểm thử đồng thời và kiểm thử tích hợp. Lỗi đặc tả thì khác về bản chất: phép kiểm được viết từ chính đặc tả đó, nên nó xác nhận mã khớp với một mô tả sai. Không có lượng kiểm thử nào bắt được điều này.",
    "diagram": [
      {
        "label": "Đặc tả sai: phép kiểm viết từ chính đặc tả đó → xanh",
        "arrow": true
      },
      {
        "label": "Ba điều kiện để lỗi ẩn sống lâu: khó thấy, ít gặp, không ai sở hữu",
        "arrow": true
      },
      {
        "label": "Bắt được bằng lớp phòng vệ THỨ HAI, không bằng kiểm kỹ hơn",
        "arrow": true
      },
      {
        "label": "Đối chiếu độc lập, kiểm bất biến, và mắt của người dùng thật"
      }
    ],
    "realWorldExample": {
      "company": "Kiểm bất biến thay vì kiểm kết quả",
      "description": "Một phép kiểm bất biến không so kết quả với giá trị mong đợi mà khẳng định một tính chất phải luôn đúng: tổng tiền vào bằng tổng tiền ra, số bản ghi sau khi lọc không lớn hơn trước khi lọc. Nó bắt được lỗi ở nơi bạn không biết mình cần kiểm."
    },
    "quiz": [
      {
        "question": "Vì sao lỗi đặc tả sai không bắt được bằng cách kiểm kỹ hơn?",
        "options": [
          "Vì phép kiểm được viết từ chính đặc tả đó nên nó xác nhận mã khớp với mô tả sai",
          "Vì đặc tả thường không đủ chi tiết để viết được phép kiểm chính xác",
          "Vì người viết kiểm thử và người viết đặc tả thường là hai người khác nhau",
          "Vì đặc tả thay đổi trong quá trình phát triển nên phép kiểm nhanh lỗi thời"
        ],
        "correct": 0,
        "explanation": "Đây là vòng lặp kín chứ không phải khuyết điểm về mức độ kỹ lưỡng. Thêm mười phép kiểm nữa từ cùng đặc tả đó thì cả mười đều xanh, và hệ thống vẫn làm sai thứ mà người dùng cần."
      },
      {
        "question": "Ba điều kiện để một lỗi ẩn sống lâu là gì?",
        "options": [
          "Khó thấy khi nhìn, ít gặp trong sử dụng, và không thuộc trách nhiệm rõ ràng của ai",
          "Nằm trong mã cũ, không có tài liệu, và người viết ra nó đã rời tổ chức",
          "Không gây lỗi rõ ràng, vốn không hề được ghi vào nhật ký, và cũng không ai báo cáo lại",
          "Nằm ở phần ít được thay đổi, ít được rà soát, và ít được kiểm thử bao phủ"
        ],
        "correct": 0,
        "explanation": "Điều kiện thứ ba là điều kiện hay bị bỏ qua nhất và cũng là điều kiện sửa được rẻ nhất: một lỗi có người sở hữu rõ ràng thì sớm muộn cũng được xử lý, kể cả khi nó khó thấy và ít gặp."
      },
      {
        "question": "Kiểm bất biến khác kiểm kết quả ở chỗ nào?",
        "options": [
          "Nó khẳng định một tính chất phải luôn đúng thay vì so với một giá trị mong đợi",
          "Nó chạy trên dữ liệu thật thay vì trên dữ liệu được chuẩn bị sẵn cho kiểm thử",
          "Nó kiểm tra toàn bộ hệ thống thay vì chỉ kiểm tra một hàm hay một thành phần",
          "Nó được chạy liên tục trong môi trường thật thay vì chạy trước khi phát hành"
        ],
        "correct": 0,
        "explanation": "Khác biệt này quan trọng vì nó phá được vòng lặp kín: giá trị mong đợi đến từ đặc tả, còn tính chất bất biến - tổng tiền vào bằng tổng tiền ra - đúng bất kể đặc tả nói gì."
      },
      {
        "question": "Vì sao đối chiếu độc lập bắt được lỗi mà kiểm thử không bắt được?",
        "options": [
          "Vì nó tính lại kết quả bằng một đường khác, không đi qua cùng giả định với mã",
          "Vì nó chạy trên toàn bộ phần dữ liệu chứ hoàn toàn không chỉ trên đúng một mẫu đã được chọn",
          "Vì nó chạy sau mỗi khi cả hệ thống đã hoạt động nên có phần dữ liệu thật để có thể so sánh",
          "Vì nó do đúng một đội khác thực hiện nên rốt cuộc tránh được thiên kiến của đội phát triển"
        ],
        "correct": 0,
        "explanation": "Lựa chọn cuối gần đúng và nó nói về con người; điểm mấu chốt thì về logic. Hai đường tính độc lập cho hai kết quả khác nhau là bằng chứng chắc chắn có gì đó sai, kể cả khi không ai biết đúng phải là bao nhiêu."
      },
      {
        "question": "Hệ quả thực tế của việc thừa nhận giới hạn này là gì?",
        "options": [
          "Đầu tư vào lớp phòng vệ thứ hai thay vì chỉ tăng thêm công cho lớp thứ nhất",
          "Giảm kỳ vọng về chất lượng và chấp nhận một tỷ lệ lỗi nhất định khi phát hành",
          "Chuyển trọng tâm từ kiểm thử tự động sang kiểm thử thủ công có người quan sát",
          "Tăng thời gian dành cho việc viết đặc tả trước khi bắt đầu phát triển"
        ],
        "correct": 0,
        "explanation": "Lựa chọn cuối cải thiện được tỷ lệ nhưng nó vẫn nằm trong cùng vòng lặp kín: đặc tả kỹ hơn vẫn có thể sai theo cùng một hướng. Lớp thứ hai phải dựa trên một nguồn thông tin ĐỘC LẬP với đặc tả."
      }
    ],
    "keyTakeaways": [
      "Đặc tả sai là vòng lặp kín: phép kiểm viết từ đặc tả đó nên nó luôn xanh.",
      "Ba điều kiện để lỗi ẩn sống lâu: khó thấy, ít gặp, và KHÔNG AI SỞ HỮU.",
      "Điều kiện thứ ba rẻ nhất để sửa - có người sở hữu thì sớm muộn cũng được xử lý.",
      "Kiểm bất biến phá vòng lặp kín: nó là bằng chứng đúng bất kể đặc tả nói gì.",
      "Đối chiếu độc lập: hai đường tính khác nhau, lệch nhau là chắc chắn có gì sai."
    ],
    "practicePrompt": {
      "question": "Một tính năng chạy xanh mọi phép kiểm nhưng người dùng nói nó sai. Nghi ngờ gì trước?",
      "options": [
        "Đặc tả - vì mã khớp với đặc tả và người dùng thì không đồng ý với đặc tả đó",
        "Dữ liệu thật có hình dạng khác dữ liệu dùng trong lúc kiểm thử nên rốt cuộc kết quả khác",
        "Người dùng đang hiểu sai cách tính năng hoạt động nên cần giải thích lại",
        "Có một đường mã khác cũng xử lý cùng việc đó mà kiểm thử chưa bao phủ"
      ],
      "correct": 0,
      "explanation": "Ba lựa chọn kia đều đáng kiểm và đều nằm trong nhóm mã sai. Nhóm còn lại là ĐẶC TẢ sai, và nó là nhóm duy nhất giải thích được vì sao mọi phép kiểm đều xanh mà kết quả vẫn không đúng với cái người dùng cần."
    },
    "summary": {
      "keyIdea": "Có một lớp lỗi mà kiểm thử về nguyên tắc không bắt được.",
      "formula": "Lớp hai = kiểm bất biến + đối chiếu độc lập + mắt của người dùng thật.",
      "commonMistake": "Phản ứng với lỗi lọt bằng cách viết thêm kiểm thử từ cùng đặc tả.",
      "action": "Viết một phép kiểm bất biến cho một tính chất phải luôn đúng."
    },
    "application": {
      "title": "Làm ngay hôm nay",
      "message": "Chọn một luồng quan trọng và viết ra một tính chất phải LUÔN đúng với nó, bất kể đặc tả nói gì - ví dụ tổng vào bằng tổng ra.",
      "secondary": "Rồi biến nó thành một phép kiểm chạy trên dữ liệu thật theo lịch. Nó không thay được bộ kiểm thử, nhưng nó là thứ duy nhất bắt được lỗi ở nơi bạn không biết mình cần kiểm."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Có một lớp lỗi mà kiểm thử về nguyên tắc không bắt được. Biết ranh giới đó là một phần của nghề, vì không biết nó dẫn tới việc không đầu tư vào thứ duy nhất bắt được chúng."
      },
      {
        "type": "heading",
        "text": "Vòng lặp kín"
      },
      {
        "type": "callout",
        "label": "Mã làm đúng thứ đã viết ra, và thứ đó không đúng",
        "text": "Phép kiểm được viết từ chính đặc tả đó, nên nó xác nhận mã khớp với một mô tả sai. Thêm mười phép kiểm nữa từ cùng đặc tả thì cả mười đều xanh, và hệ thống vẫn làm sai thứ mà người dùng cần."
      },
      {
        "type": "heading",
        "text": "Vì sao lỗi ẩn sống lâu"
      },
      {
        "type": "list",
        "items": [
          "KHÓ THẤY khi nhìn: nó không gây lỗi rõ ràng, chỉ cho ra một con số hơi lệch.",
          "ÍT GẶP trong sử dụng: chỉ với một loại dữ liệu, một cấu hình, một múi giờ.",
          "KHÔNG AI SỞ HỮU: nằm ở ranh giới giữa hai đội, hoặc trong phần không ai nhận."
        ]
      },
      {
        "type": "paragraph",
        "text": "Điều kiện thứ ba hay bị bỏ qua nhất và cũng rẻ nhất để sửa: một lỗi có người sở hữu rõ ràng thì sớm muộn cũng được xử lý, kể cả khi nó khó thấy và ít gặp."
      },
      {
        "type": "heading",
        "text": "Lớp phòng vệ thứ hai"
      },
      {
        "type": "comparison",
        "left": {
          "label": "Kiểm kết quả",
          "text": "So với một giá trị mong đợi. Giá trị đó đến từ đặc tả, nên nó nằm trong vòng lặp kín."
        },
        "right": {
          "label": "Kiểm bất biến",
          "text": "Khẳng định một tính chất phải LUÔN đúng: tổng vào bằng tổng ra, số bản ghi sau khi lọc không lớn hơn trước. Đúng bất kể đặc tả nói gì."
        }
      },
      {
        "type": "paragraph",
        "text": "Công cụ thứ hai là ĐỐI CHIẾU ĐỘC LẬP: tính lại kết quả bằng một đường khác, không đi qua cùng giả định với mã. Hai đường cho hai kết quả khác nhau là bằng chứng chắc chắn có gì đó sai, kể cả khi không ai biết đúng phải là bao nhiêu."
      },
      {
        "type": "closing",
        "lines": [
          "Công cụ thứ ba là mắt của người dùng thật, và đó là lý do phát hành dần vừa là kỹ thuật triển khai vừa là công cụ chất lượng.",
          "Hệ quả thực tế: khi một lỗi lọt ra, phản xạ viết thêm kiểm thử từ cùng đặc tả không giúp gì. Bài cuối chặng là cách chia trách nhiệm giữa các lớp này."
        ]
      }
    ]
  },
  {
    "id": 1536,
    "slug": "ba-tuyen-phong-ve-trong-chat-luong",
    "title": "Kiểm thử, Bài 6: Ba tuyến phòng vệ - ai chịu trách nhiệm gì",
    "subtitle": "Chất lượng có ba tuyến, và mỗi tuyến hỏng theo một kiểu riêng khi ranh giới bị mờ.",
    "duration": "11 phút",
    "difficulty": "Trung bình",
    "track": "professional",
    "emoji": "🛡️",
    "interactiveType": "sampling",
    "whyItMatters": "Khi trách nhiệm về chất lượng không được chia rõ, kết quả không phải là ba lớp bảo vệ mà là ba bên cùng cho rằng bên kia đang lo.",
    "openingQuestion": "Tuyến thứ nhất của chất lượng là ai?",
    "openingOptions": [
      "Chính đội xây ra sản phẩm - họ sở hữu chất lượng thứ mình làm",
      "Đội kiểm thử chuyên trách vì họ có kỹ năng và công cụ phù hợp nhất",
      "Người rà soát mã vì họ là người đầu tiên nhìn thay đổi bằng con mắt khác",
      "Hệ thống tích hợp liên tục vì nó chặn được thay đổi hỏng trước khi lên"
    ],
    "correctOption": 0,
    "explanation": "Khi tuyến thứ nhất được hiểu là một đội khác thì chất lượng trở thành việc của người khác, và đội xây ra sản phẩm mất đi động cơ mạnh nhất để làm tốt. Đó là kiểu hỏng phổ biến nhất của mô hình ba tuyến, và nó không sửa được bằng cách tăng người cho tuyến hai.",
    "diagram": [
      {
        "label": "Tuyến 1: đội xây - sở hữu chất lượng thứ mình làm",
        "arrow": true
      },
      {
        "label": "Tuyến 2: chuyên trách - xây năng lực, không xây thay",
        "arrow": true
      },
      {
        "label": "Tuyến 3: độc lập - hỏi phòng vệ có thật sự hoạt động không",
        "arrow": true
      },
      {
        "label": "Tuyến 3 báo cáo cho người KHÁC với người vận hành tuyến 1 và 2"
      }
    ],
    "realWorldExample": {
      "company": "Tuyến hai xây năng lực, không xây thay",
      "description": "Khi tuyến hai bắt đầu viết phần lớn phép kiểm thay cho các đội, hai điều xảy ra cùng lúc: họ trở thành nút thắt cho mọi bản phát hành, và các đội ngừng nghĩ về chất lượng vì đã có người khác nghĩ hộ."
    },
    "quiz": [
      {
        "question": "Kiểu hỏng phổ biến nhất của tuyến thứ nhất là gì?",
        "options": [
          "Nó được hiểu là một đội khác, nên chất lượng thành việc của người khác",
          "Đội xây hoàn toàn không có đủ kỹ năng viết kiểm thử nên rốt cuộc chất lượng kiểm thử thấp",
          "Áp lực thời hạn làm đội bỏ qua các bước kiểm tra trước khi đưa mã lên",
          "Đội xây quá quen với mã của mình nên bỏ sót những lỗi hiển nhiên"
        ],
        "correct": 0,
        "explanation": "Ba lựa chọn kia đều là vấn đề thật và đều sửa được bằng đào tạo, quy trình hoặc rà soát chéo. Cái này là vấn đề về cấu trúc trách nhiệm, và tăng người cho tuyến hai chỉ làm nó nặng thêm."
      },
      {
        "question": "Tuyến thứ hai nên làm gì?",
        "options": [
          "Xây năng lực và công cụ cho các đội, không viết kiểm thử thay cho họ",
          "Viết và duy trì bộ kiểm thử tích hợp cho toàn bộ hệ thống của tổ chức",
          "Rà soát và phê duyệt kế hoạch kiểm thử của từng đội trước mỗi bản phát hành",
          "Chạy kiểm thử cuối cùng trên môi trường thật trước khi cho phép phát hành"
        ],
        "correct": 0,
        "explanation": "Khi tuyến hai viết thay, họ trở thành nút thắt cho mọi bản phát hành, và các đội ngừng nghĩ về chất lượng vì đã có người nghĩ hộ. Lựa chọn thứ ba và thứ tư đều dẫn tới cùng kết cục đó qua đường khác."
      },
      {
        "question": "Vì sao tuyến thứ ba phải báo cáo cho người khác?",
        "options": [
          "Vì nếu báo cáo cho cùng người vận hành hai tuyến kia thì nó mất tính độc lập",
          "Vì tuyến thứ ba cần có thẩm quyền cao hơn để yêu cầu các đội khắc phục",
          "Vì kết quả đánh giá của tuyến ba cần được đưa vào báo cáo cho cấp cao nhất",
          "Vì tuyến ba cần nguồn lực riêng không bị ảnh hưởng bởi ưu tiên của đội kỹ thuật"
        ],
        "correct": 0,
        "explanation": "Người ta không đánh giá nghiêm khắc chính hệ thống mà mình chịu trách nhiệm vận hành. Đây là lý do cấu trúc báo cáo là một phần của thiết kế chứ không phải một chi tiết hành chính."
      },
      {
        "question": "Tuyến thứ ba hỏi câu hỏi gì?",
        "options": [
          "Các cơ chế phòng vệ có thật sự hoạt động không, chứ không phải sản phẩm có lỗi không",
          "Còn những lỗi nào chưa được phát hiện trong bản phát hành sắp tới",
          "Các đội có tuân thủ đầy đủ quy trình kiểm thử đã được ban hành không",
          "Chất lượng của sản phẩm có đạt mức mà thị trường yêu cầu hay không"
        ],
        "correct": 0,
        "explanation": "Phân biệt này quyết định tuyến ba làm gì hằng ngày: nó lấy mẫu, đối chiếu, và tìm chỗ mà quy trình được ghi ra khác với quy trình thật sự chạy. Lựa chọn thứ ba gần đúng nhưng tuân thủ hình thức không bằng hiệu lực thật."
      },
      {
        "question": "Điều gì xảy ra khi ranh giới giữa ba tuyến bị mờ?",
        "options": [
          "Không có ba lớp bảo vệ mà là ba bên cùng cho rằng bên kia đang lo",
          "Các tuyến chồng chéo công việc lên nhau nên tốn nguồn lực không cần thiết",
          "Quyết định phát hành bị chậm lại vì phải chờ ý kiến của cả ba tuyến",
          "Trách nhiệm khi có sự cố khó xác định nên việc rút kinh nghiệm kém hiệu quả"
        ],
        "correct": 0,
        "explanation": "Ba lựa chọn kia đều là hậu quả thật và đều có thể chịu được. Cái này là hậu quả nguy hiểm nhất vì nó không có triệu chứng cho tới lúc một sự cố đi qua cả ba tuyến mà không tuyến nào chặn."
      }
    ],
    "keyTakeaways": [
      "Tuyến 1 là chính ĐỘI XÂY - hiểu nó là đội khác thì chất lượng thành việc người khác.",
      "Tuyến 2 xây NĂNG LỰC, không xây thay - viết thay thì thành nút thắt và đội ngừng nghĩ.",
      "Tuyến 3 hỏi phòng vệ có HOẠT ĐỘNG không, không hỏi sản phẩm có lỗi không.",
      "Tuyến 3 phải báo cáo cho người KHÁC với người vận hành hai tuyến kia.",
      "Ranh giới mờ thì không phải ba lớp mà là ba bên cùng tưởng bên kia đang lo."
    ],
    "practicePrompt": {
      "question": "Một sự cố đi qua cả ba tuyến mà không tuyến nào chặn. Câu hỏi đúng trong biên bản là gì?",
      "options": [
        "Mỗi tuyến lẽ ra chặn bằng cơ chế nào, và vì sao cơ chế đó không hoạt động",
        "Tuyến nào đã bỏ sót và vì sao người phụ trách tuyến đó không phát hiện ra",
        "Cần thêm những phép kiểm nào để lần sau lỗi tương tự bị chặn lại sớm hơn",
        "Quy trình hiện tại có chỗ nào chưa được ghi đủ chi tiết để mọi người làm đúng"
      ],
      "correct": 0,
      "explanation": "Lựa chọn thứ hai đi tìm người và nó làm mọi người che thông tin ở lần sau. Lựa chọn thứ ba nhảy thẳng tới giải pháp cho lớp thứ nhất trước khi biết ba lớp đã hỏng ở đâu, và đó là phản xạ mà bài trước đã cảnh báo."
    },
    "summary": {
      "keyIdea": "Ba tuyến, và mỗi tuyến hỏng theo một kiểu riêng khi ranh giới bị mờ.",
      "formula": "Đội xây sở hữu → chuyên trách xây năng lực → độc lập kiểm hiệu lực phòng vệ.",
      "commonMistake": "Tuyến hai viết kiểm thử thay, thành nút thắt và đội ngừng nghĩ về chất lượng.",
      "action": "Viết ra ba tuyến của tổ chức bạn và xem tuyến nào đang làm việc của tuyến khác."
    },
    "application": {
      "title": "Làm ngay hôm nay",
      "message": "Viết ra ai đang là tuyến một, hai và ba trong tổ chức bạn. Nếu có ô nào trống hoặc có tên trùng ở hai ô, đó là chỗ ranh giới đang mờ.",
      "secondary": "Rồi kiểm một câu: tuyến ba báo cáo cho ai? Nếu đó là chính người vận hành tuyến một và hai thì bạn không có tuyến ba - bạn có một phần mở rộng của tuyến hai."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Khi trách nhiệm về chất lượng không được chia rõ, kết quả không phải là ba lớp bảo vệ mà là ba bên cùng cho rằng bên kia đang lo."
      },
      {
        "type": "heading",
        "text": "Ba tuyến"
      },
      {
        "type": "list",
        "items": [
          "TUYẾN MỘT: chính đội xây ra sản phẩm. Họ sở hữu chất lượng thứ mình làm.",
          "TUYẾN HAI: bộ phận chuyên trách. Xây năng lực và công cụ cho các đội - không viết thay.",
          "TUYẾN BA: đánh giá độc lập. Hỏi các cơ chế phòng vệ có THẬT SỰ hoạt động không."
        ]
      },
      {
        "type": "heading",
        "text": "Mỗi tuyến hỏng một kiểu"
      },
      {
        "type": "callout",
        "label": "Tuyến một bị hiểu thành đội khác",
        "text": "Đây là kiểu hỏng phổ biến nhất. Chất lượng thành việc của người khác, và đội xây mất đi động cơ mạnh nhất để làm tốt. Nó không sửa được bằng cách tăng người cho tuyến hai - làm vậy chỉ nặng thêm."
      },
      {
        "type": "comparison",
        "left": {
          "label": "Tuyến hai đúng vai",
          "text": "Xây công cụ, đào tạo, đặt tiêu chuẩn. Các đội tự viết kiểm thử của mình, tốt hơn theo thời gian."
        },
        "right": {
          "label": "Tuyến hai viết thay",
          "text": "Thành nút thắt cho mọi bản phát hành, và các đội ngừng nghĩ về chất lượng vì đã có người nghĩ hộ."
        }
      },
      {
        "type": "paragraph",
        "text": "Tuyến ba hỏng khi nó báo cáo cho chính người vận hành hai tuyến kia. Người ta không đánh giá nghiêm khắc hệ thống mà mình chịu trách nhiệm vận hành, nên cấu trúc báo cáo là một phần của thiết kế chứ không phải chi tiết hành chính."
      },
      {
        "type": "heading",
        "text": "Câu hỏi riêng của tuyến ba"
      },
      {
        "type": "paragraph",
        "text": "Không phải sản phẩm có lỗi không - đó là việc của hai tuyến kia. Câu hỏi là các cơ chế phòng vệ có hoạt động không, nên công việc hằng ngày của nó là lấy mẫu, đối chiếu, và tìm chỗ mà quy trình được ghi ra khác với quy trình thật sự chạy."
      },
      {
        "type": "closing",
        "lines": [
          "Khi một sự cố đi qua cả ba tuyến, câu hỏi đúng trong biên bản là mỗi tuyến LẼ RA chặn bằng cơ chế nào, và vì sao cơ chế đó không hoạt động.",
          "Đi tìm tuyến nào bỏ sót thì lần sau mọi người che thông tin, và bạn mất luôn cả thứ duy nhất giúp ba tuyến hoạt động: người ta nói ra khi thấy có gì đó không ổn."
        ]
      }
    ]
  },
];
