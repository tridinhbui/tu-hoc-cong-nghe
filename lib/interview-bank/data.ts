import type { InterviewQuestion } from "./types";

/**
 * Câu hỏi phỏng vấn kỹ thuật cho nghề Chuyên viên phân tích dữ liệu (Data
 * Analyst), dải id 3001-3999. Có chấm điểm: mọi quy tắc viết quiz trong
 * AGENTS.md áp dụng, nhất là cân bằng độ dài phương án.
 */
export const DATA_QUESTIONS: InterviewQuestion[] = [
  {
    id: 3001,
    career: "data",
    category: "SQL",
    difficulty: "de",
    question:
      "Cần liệt kê MỌI khách hàng trong bảng customers, kể cả người chưa có đơn nào trong bảng orders. Câu JOIN nào đúng?",
    options: [
      "customers INNER JOIN orders ON khoá khách hàng",
      "orders LEFT JOIN customers ON khoá khách hàng",
      "customers LEFT JOIN orders ON khoá khách hàng",
      "customers CROSS JOIN orders rồi lọc theo khoá",
    ],
    correct: 2,
    explanation:
      "LEFT JOIN giữ mọi dòng của bảng bên trái, nên đặt customers bên trái thì khách chưa có đơn vẫn xuất hiện với các cột của orders là NULL. INNER JOIN chỉ giữ dòng khớp ở cả hai bảng nên đánh rơi đúng nhóm khách chưa mua. Đảo thứ tự thành orders LEFT JOIN customers thì bảng được giữ trọn lại là orders, vẫn mất khách chưa mua. CROSS JOIN rồi lọc theo khoá thực chất là INNER JOIN.",
  },
  {
    id: 3002,
    career: "data",
    category: "SQL",
    difficulty: "de",
    question:
      "Muốn chỉ giữ những thành phố có tổng doanh thu trên 1 tỉ sau khi GROUP BY city, điều kiện SUM(revenue) > 1e9 đặt ở đâu?",
    options: [
      "Trong mệnh đề WHERE, trước GROUP BY",
      "Trong mệnh đề HAVING, sau GROUP BY",
      "Trong ORDER BY kèm LIMIT để cắt bớt dòng",
      "Trong SELECT dưới dạng CASE WHEN ... END",
    ],
    correct: 1,
    explanation:
      "WHERE lọc từng dòng TRƯỚC khi gom nhóm, lúc đó SUM(revenue) chưa tồn tại nên đặt hàm tổng hợp trong WHERE sẽ báo lỗi. HAVING chạy SAU GROUP BY và lọc trên kết quả tổng hợp, nên đó là chỗ đúng. ORDER BY kèm LIMIT chỉ lấy N thành phố đầu chứ không lọc theo ngưỡng; CASE WHEN trong SELECT gắn nhãn cho từng nhóm nhưng không loại nhóm nào khỏi kết quả.",
  },
  {
    id: 3003,
    career: "data",
    category: "SQL",
    difficulty: "trung-binh",
    question:
      "Bảng users có 1.000 dòng, cột phone bị NULL ở 200 dòng. COUNT(*) và COUNT(phone) lần lượt trả về bao nhiêu?",
    options: [
      "COUNT(*) = 1.000, COUNT(phone) = 1.000",
      "COUNT(*) = 800, COUNT(phone) = 800",
      "COUNT(*) = 1.000, COUNT(phone) = 800",
      "COUNT(*) = 1.000, COUNT(phone) = 200",
    ],
    correct: 2,
    explanation:
      "COUNT(*) đếm số dòng bất kể giá trị nên trả về 1.000. COUNT(phone) chỉ đếm những dòng mà phone khác NULL, tức 1.000 − 200 = 800. Nhầm phổ biến là nghĩ COUNT(cột) cũng đếm mọi dòng, dẫn tới tỉ lệ điền dữ liệu luôn ra 100%; hoặc ngược lại nghĩ COUNT(*) cũng bỏ NULL. Kết quả đúng là 1.000 và 800.",
  },
  {
    id: 3004,
    career: "data",
    category: "SQL",
    difficulty: "kho",
    question:
      "Cần lấy đơn hàng GẦN NHẤT của mỗi khách, giữ đúng một dòng mỗi khách kể cả khi hai đơn trùng thời điểm. Cách nào đúng?",
    options: [
      "ROW_NUMBER() OVER (PARTITION BY khách ORDER BY thời gian DESC), lọc = 1",
      "RANK() OVER (PARTITION BY khách ORDER BY thời gian DESC), lọc = 1",
      "GROUP BY khách, lấy MAX(thời gian) cùng mọi cột khác của đơn",
      "ROW_NUMBER() OVER (ORDER BY thời gian DESC), lọc giá trị = 1",
    ],
    correct: 0,
    explanation:
      "ROW_NUMBER đánh số liên tục không trùng trong từng partition, nên lọc = 1 luôn ra đúng một dòng mỗi khách, kể cả khi hai đơn trùng thời điểm. RANK cho hai đơn trùng thời điểm cùng hạng 1, nên khách đó xuất hiện hai lần. GROUP BY với MAX chỉ lấy được thời gian lớn nhất, các cột còn lại không gắn với đúng đơn đó. Bỏ PARTITION BY thì chỉ còn một đơn mới nhất của toàn bảng.",
  },
  {
    id: 3005,
    career: "data",
    category: "Thống kê cơ bản",
    difficulty: "de",
    question:
      "Lương tháng của 5 nhân viên là 8, 9, 10, 11 và 62 triệu. Trung vị và trung bình lần lượt là bao nhiêu?",
    options: [
      "Trung vị 10, trung bình 20",
      "Trung vị 20, trung bình 10 (đảo hai khái niệm)",
      "Trung vị 10, trung bình 9,5 (bỏ số 62)",
      "Trung vị 36, trung bình 20 (= (10 + 62) ÷ 2)",
    ],
    correct: 0,
    explanation:
      "Trung vị là giá trị đứng giữa khi đã sắp xếp: 8, 9, 10, 11, 62 nên trung vị là 10. Trung bình là tổng chia số phần tử: (8 + 9 + 10 + 11 + 62) ÷ 5 = 100 ÷ 5 = 20. Bỏ số 62 để ra 9,5 là tự ý loại ngoại lai, mà câu hỏi không cho phép. Ví dụ này cho thấy vì sao lương thường báo cáo bằng trung vị: một giá trị lớn kéo trung bình lên gấp đôi.",
  },
  {
    id: 3006,
    career: "data",
    category: "Thống kê cơ bản",
    difficulty: "trung-binh",
    question: "Một thử nghiệm A/B cho p-value = 0,03. Diễn giải nào đúng?",
    options: [
      "Có 3% khả năng phiên bản B không tốt hơn A",
      "Có 97% khả năng phiên bản B thật sự tốt hơn A",
      "Nếu A và B như nhau, chênh lệch cỡ này chỉ xảy ra khoảng 3%",
      "Hiệu ứng của B lớn hơn A khoảng 3 điểm phần trăm",
    ],
    correct: 2,
    explanation:
      "p-value là xác suất thấy kết quả ít nhất cực đoan như vậy NẾU giả thuyết không (A và B như nhau) là đúng, ở đây là 0,03 tức khoảng 3%. Nó không phải xác suất giả thuyết đúng hay sai, nên hai cách đọc 3% không tốt hơn và 97% tốt hơn đều là lỗi hiểu phổ biến nhất. p-value cũng không nói gì về độ lớn hiệu ứng: muốn biết B hơn bao nhiêu phải nhìn khoảng tin cậy.",
  },
  {
    id: 3007,
    career: "data",
    category: "Thống kê cơ bản",
    difficulty: "trung-binh",
    question:
      "Dữ liệu cho thấy thành phố bán nhiều kem cũng có nhiều ca đuối nước. Kết luận phù hợp nhất là gì?",
    options: [
      "Ăn kem trước khi bơi làm tăng nguy cơ đuối nước",
      "Hai chỉ số tương quan, nhiều khả năng cùng do thời tiết nóng",
      "Đuối nước khiến người dân mua nhiều kem hơn",
      "Hệ số tương quan đủ cao thì có thể kết luận là quan hệ nhân quả",
    ],
    correct: 1,
    explanation:
      "Tương quan không phải nhân quả. Ở đây có một biến gây nhiễu rõ ràng: trời nóng làm người ta vừa ăn kem nhiều hơn vừa đi bơi nhiều hơn, nên hai chỉ số cùng tăng mà không cái nào gây ra cái nào. Kết luận ăn kem gây đuối nước, hay chiều ngược lại, đều bỏ qua biến gây nhiễu. Hệ số tương quan cao đến đâu cũng không biến quan hệ thành nhân quả; muốn nói nhân quả cần thử nghiệm có đối chứng.",
  },
  {
    id: 3008,
    career: "data",
    category: "Chỉ số sản phẩm",
    difficulty: "de",
    question:
      "Trang bán hàng có 2.000 lượt truy cập từ 1.600 người dùng, trong đó 80 người mua. Tỉ lệ chuyển đổi tính theo người dùng là bao nhiêu?",
    options: [
      "4% (= 80 ÷ 2.000, chia theo lượt)",
      "5% (= 80 ÷ 1.600 người dùng)",
      "80% (= 1.600 ÷ 2.000)",
      "20% (= 1.600 ÷ 80, đảo tử mẫu)",
    ],
    correct: 1,
    explanation:
      "Tỉ lệ chuyển đổi theo người dùng lấy số người mua chia số người dùng: 80 ÷ 1.600 = 5%. Chia cho 2.000 lượt truy cập ra 4% là tỉ lệ theo phiên, một chỉ số khác, và luôn thấp hơn khi một người vào nhiều lần. Khi báo cáo phải ghi rõ mẫu số là người dùng hay phiên, vì hai con số này thường bị trộn lẫn trên cùng dashboard.",
  },
  {
    id: 3009,
    career: "data",
    category: "Chỉ số sản phẩm",
    difficulty: "trung-binh",
    question:
      "Một ứng dụng có DAU trung bình 3.000 và MAU 12.000. Tỉ lệ DAU/MAU (độ gắn bó) là bao nhiêu?",
    options: [
      "400% (= 12.000 ÷ 3.000)",
      "75% (= 1 − 3.000 ÷ 12.000)",
      "25% (= 3.000 ÷ 12.000)",
      "0,83% (= 3.000 ÷ 12.000 ÷ 30)",
    ],
    correct: 2,
    explanation:
      "DAU/MAU = 3.000 ÷ 12.000 = 25%, nghĩa là người dùng hoạt động trong tháng trung bình mở ứng dụng khoảng một phần tư số ngày. Đảo thành MAU/DAU ra 400% là con số không có ý nghĩa gắn bó. Lấy 1 trừ tỉ lệ để ra 75% là nhầm chỉ số này với tỉ lệ rời bỏ, vốn đo người dùng không quay lại chứ không đo tần suất quay lại. Chia tiếp cho 30 ngày ra 0,83% là chia hai lần cho độ dài kỳ, vì DAU đã là số trung bình mỗi ngày.",
  },
  {
    id: 3010,
    career: "data",
    category: "Chỉ số sản phẩm",
    difficulty: "trung-binh",
    question:
      "Retention ngày 7 của nhóm người dùng đăng ký tuần này là 30%. Chỉ số này đo cái gì?",
    options: [
      "30% người dùng trong nhóm đó đã dùng ứng dụng đủ 7 ngày liên tiếp",
      "30% trong nhóm đó quay lại hoạt động vào ngày thứ 7 sau đăng ký",
      "30% tổng số người dùng hiện có hoạt động trong 7 ngày gần nhất",
      "Trong 7 ngày đầu, 30% nhóm đăng ký đã rời bỏ ứng dụng",
    ],
    correct: 1,
    explanation:
      "Retention ngày N theo cohort là tỉ lệ người trong nhóm đăng ký cùng thời điểm còn hoạt động vào ngày N (hoặc trong khung ngày N, tuỳ định nghĩa đội thống nhất). Nó không đòi hỏi dùng liên tiếp đủ 7 ngày, vốn là chỉ số chuỗi ngày khắt khe hơn nhiều. Đếm trên toàn bộ người dùng hiện có là WAU chứ không phải retention theo cohort, và 30% còn lại là tỉ lệ giữ chân, không phải tỉ lệ rời bỏ.",
  },
  {
    id: 3011,
    career: "data",
    category: "Thử nghiệm A/B",
    difficulty: "trung-binh",
    question:
      "Thử nghiệm A/B chia 50/50 nhưng nhóm A nhận 10.000 người, nhóm B chỉ 9.000. Nên làm gì trước khi đọc kết quả?",
    options: [
      "Đọc kết quả bình thường vì mẫu đã đủ lớn",
      "Chuẩn hoá theo tỉ lệ rồi so sánh như thường",
      "Cắt ngẫu nhiên nhóm A xuống 9.000 cho cân bằng",
      "Điều tra lỗi chia nhóm (sample ratio mismatch)",
    ],
    correct: 3,
    explanation:
      "Lệch 10.000 so với 9.000 khi thiết kế 50/50 là sample ratio mismatch: với cỡ mẫu này, kiểm định chi bình phương cho p-value cực nhỏ, nên gần như chắc chắn có lỗi ở khâu chia nhóm hoặc ghi log. Lỗi đó thường làm hai nhóm khác nhau một cách có hệ thống, ví dụ B làm rơi người dùng tải chậm. Chuẩn hoá theo tỉ lệ hay cắt bớt A không sửa được thiên lệch ấy, chỉ che nó đi.",
  },
  {
    id: 3012,
    career: "data",
    category: "Thử nghiệm A/B",
    difficulty: "kho",
    question:
      "Thử nghiệm dự kiến chạy 14 ngày. Ngày thứ 3 p-value = 0,03 và PM muốn dừng sớm để triển khai. Rủi ro chính là gì?",
    options: [
      "Nhìn kết quả liên tục rồi dừng khi đạt ngưỡng làm tăng dương tính giả",
      "p = 0,03 đã dưới 0,05 nên dừng sớm chỉ tiết kiệm thời gian, không rủi ro",
      "Rủi ro duy nhất là cỡ mẫu nhỏ làm giảm lực kiểm định của thử nghiệm",
      "Dừng sớm làm p-value tăng lên, nên kết quả sẽ kém ý nghĩa hơn thực tế",
    ],
    correct: 0,
    explanation:
      "Kiểm định cố định mức 5% chỉ đúng khi nhìn kết quả một lần ở cỡ mẫu đã định. Nhìn trộm mỗi ngày và dừng ngay khi p < 0,05 cho dữ liệu nhiều cơ hội chạm ngưỡng do ngẫu nhiên, nên tỉ lệ dương tính giả thực tế cao hơn 5% nhiều. Lực kiểm định thấp là vấn đề của việc KHÔNG phát hiện được hiệu ứng, ngược với rủi ro ở đây. Muốn dừng sớm hợp lệ phải dùng thiết kế tuần tự.",
  },
  {
    id: 3013,
    career: "data",
    category: "Thử nghiệm A/B",
    difficulty: "kho",
    question:
      "Tỉ lệ chuyển đổi của B cao hơn A ở cả mobile lẫn desktop, nhưng gộp lại thì B thấp hơn A. Giải thích hợp lý nhất?",
    options: [
      "Chắc chắn có lỗi tính toán vì điều này không thể xảy ra",
      "Nghịch lý Simpson do tỉ trọng thiết bị hai nhóm khác nhau",
      "Mẫu mobile quá nhỏ nên nên bỏ đi và chỉ đọc desktop",
      "Số liệu gộp luôn đáng tin hơn số liệu chia theo nhóm",
    ],
    correct: 1,
    explanation:
      "Đây là nghịch lý Simpson: nếu nhóm B nhận tỉ trọng mobile (vốn có chuyển đổi thấp) cao hơn nhóm A, thì B thắng trong từng phân khúc mà vẫn thua khi gộp. Nó hoàn toàn có thể xảy ra về mặt số học, nên không phải lỗi tính. Số gộp không tự động đáng tin hơn; ở đây chính nó bị méo bởi cơ cấu. Việc cần làm là kiểm tra vì sao cơ cấu thiết bị hai nhóm lệch nhau.",
  },
  {
    id: 3014,
    career: "data",
    category: "Trực quan hoá & dashboard",
    difficulty: "de",
    question:
      "Cần thể hiện doanh thu theo từng tháng trong 24 tháng để thấy xu hướng. Loại biểu đồ nào phù hợp nhất?",
    options: [
      "Biểu đồ tròn, mỗi tháng một lát",
      "Biểu đồ đường theo trục thời gian",
      "Biểu đồ phân tán doanh thu theo chi phí",
      "Bảng số 24 dòng tô màu theo giá trị",
    ],
    correct: 1,
    explanation:
      "Biểu đồ đường là lựa chọn chuẩn cho dữ liệu theo thời gian liên tục vì mắt đọc xu hướng, mùa vụ và điểm gãy theo độ dốc của đường. Biểu đồ tròn 24 lát gần như không so sánh được và không có khái niệm thứ tự thời gian. Biểu đồ phân tán trả lời câu hỏi khác (quan hệ hai biến). Bảng tô màu đọc được giá trị cụ thể nhưng xu hướng thì người xem phải tự dựng lại trong đầu.",
  },
  {
    id: 3015,
    career: "data",
    category: "Trực quan hoá & dashboard",
    difficulty: "trung-binh",
    question:
      "Biểu đồ cột so sánh doanh thu hai quý, trục tung bắt đầu từ 95 thay vì 0 khiến cột Q2 trông gấp đôi Q1. Vấn đề là gì?",
    options: [
      "Trục cắt khiến chênh lệch nhỏ trông như rất lớn",
      "Không có vấn đề vì con số trên trục vẫn chính xác",
      "Nên đổi sang biểu đồ tròn để thấy tỉ lệ đúng",
      "Trục bắt đầu từ 0 chỉ bắt buộc với biểu đồ đường",
    ],
    correct: 0,
    explanation:
      "Với biểu đồ cột, người xem so sánh bằng chiều cao cột, nên chiều cao phải tỉ lệ với giá trị: trục cột phải bắt đầu từ 0. Cắt trục từ 95 làm chênh lệch vài phần trăm trông như gấp đôi, dù con số trên trục vẫn đúng. Quy tắc bắt đầu từ 0 áp cho cột chứ không bắt buộc cho đường, vì biểu đồ đường được đọc bằng độ dốc chứ không bằng chiều dài.",
  },
  {
    id: 3016,
    career: "data",
    category: "Trực quan hoá & dashboard",
    difficulty: "kho",
    question:
      "Dashboard doanh thu cho ban giám đốc có 30 biểu đồ và ít ai dùng. Hướng cải thiện nào đúng nhất?",
    options: [
      "Thêm bộ lọc cho từng biểu đồ để ai cũng tự tìm được số mình cần",
      "Giữ vài chỉ số chính gắn với quyết định, có so sánh với mục tiêu",
      "Chuyển toàn bộ sang một bảng số chi tiết để không mất thông tin",
      "Thêm màu sắc và hiệu ứng để dashboard hấp dẫn và dễ nhớ hơn",
    ],
    correct: 1,
    explanation:
      "Dashboard cho lãnh đạo nên trả lời vài câu hỏi quyết định: đang tốt hay xấu so với mục tiêu và kỳ trước, và cần chú ý ở đâu. 30 biểu đồ ngang hàng buộc người xem tự tìm tín hiệu, nên họ bỏ đi. Thêm bộ lọc tăng thêm độ phức tạp cho đúng nhóm người không có thời gian. Bảng số chi tiết giữ thông tin nhưng không làm nổi bật gì; màu mè thì không giải quyết câu hỏi nào.",
  },
];
