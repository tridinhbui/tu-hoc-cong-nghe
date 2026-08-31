// `patch` không làm gì - nó chỉ đặt tên cho hình dạng của một entry, để chỗ
// này đọc ra là "vá lên bài học" chứ không phải "định nghĩa bài học".
//
// Hai hàm dựng `d(...)` và `q(...)` từng ở đây đã được gỡ: chúng không còn
// chỗ gọi nào, và một hàm dựng `diagram`/`quiz` nằm sẵn trong file này là lời
// mời viết nội dung dạy vào đây - đúng cái bẫy mà lesson-override-shadowing
// vừa được dọn.
const patch = (lesson) => lesson;

export const lessonOverrides = {
  // Chặng trái phiếu (141-154). Every one of these ten questions had the
  // correct answer as the longest option, and the second question of each
  // lesson restated its own explanation in the option - 194 to 283 characters
  // against 40-70 for the distractors. Prompts and explanations unchanged.





  // Chặng kế toán cơ bản (23-40). The same defect as the bond chặng, one step
  // worse: 6-7 of every 7 questions had the correct answer as the longest
  // option, and the distractors were padded with filler ("đã tính toán sai
  // sót đâu đó trong quá trình lập báo cáo") to reach a length nobody would
  // pick. Prompts and explanations unchanged.




  "tai-chinh-xanh-tieu-chuan-esg-tin-chi-carbon": patch({
    "quiz": [
      {
        "question": "Hiện tượng 'tẩy xanh' (Greenwashing) trong báo cáo doanh nghiệp có nghĩa là gì?",
        "options": [
          "Tô vẽ hình ảnh xanh bằng truyền thông, thực tế không đổi",
          "Chuyển toàn bộ nhà máy sang dùng năng lượng tái tạo mua ngoài",
          "Đặt mục tiêu trung hoà carbon xa hơn mốc mà ngành cam kết",
          "Công bố báo cáo phát triển bền vững hằng năm cho cổ đông"
        ],
        "correct": 0,
        "explanation": "Ba câu hỏi lọc nhanh giúp nhận diện: số liệu có so với năm gốc cụ thể nào không, phạm vi tính đến đâu (chỉ nhà máy mình hay cả điện mua vào và chuỗi cung ứng), và ai là bên kiểm chứng độc lập. Một cam kết không trả lời được cả ba thì nên đọc như tài liệu marketing. Dấu hiệu điển hình khác là dồn toàn bộ mục tiêu về một mốc rất xa như 2050 mà không có mốc trung hạn nào."
      },
      {
        "question": "Tín chỉ carbon (Carbon Credit) đại diện cho quyền phát thải bao nhiêu khí nhà kính?",
        "options": [
          "1 tấn CO₂ tương đương, viết tắt là tCO₂e",
          "100 tấn CO₂ tương đương, theo lô giao dịch tối thiểu",
          "Không có đơn vị cố định, tuỳ phương pháp từng dự án",
          "1 kg CO₂ tương đương, quy đổi theo hệ mét chuẩn"
        ],
        "correct": 0,
        "explanation": "Một tín chỉ tương ứng một tấn CO₂ tương đương. Chữ 'tương đương' là phần quan trọng: mỗi khí nhà kính giữ nhiệt ở mức khác nhau - một tấn metan gây hiệu ứng xấp xỉ 28 tấn CO₂ - nên tất cả phải quy về một đơn vị chung thì mới cộng được, giao dịch được và đặt hạn ngạch được. Đây chính là 'đồng tiền chung' của thị trường carbon."
      },
      {
        "question": "Vì sao cùng một doanh nghiệp lại nhận điểm ESG rất khác nhau từ các tổ chức xếp hạng khác nhau?",
        "options": [
          "Vì mỗi tổ chức chọn chỉ số và trọng số khác nhau",
          "Vì điểm ESG được cập nhật lại mỗi ngày theo giá cổ phiếu",
          "Vì một trong các tổ chức xếp hạng chắc chắn đã tính sai",
          "Vì doanh nghiệp gửi số liệu cho mỗi tổ chức"
        ],
        "correct": 0,
        "explanation": "Đây là khác biệt căn bản giữa ESG và số liệu tài chính. Lợi nhuận sau kiểm toán là một con số được lập theo chuẩn mực chung; điểm ESG là một Ý KIẾN được xây trên lựa chọn phương pháp riêng của từng tổ chức. Vì vậy khi dùng điểm ESG để ra quyết định đầu tư, phải đọc kèm phương pháp luận, và tuyệt đối không so trực tiếp điểm của hai bảng xếp hạng khác nhau."
      },
      {
        "question": "Khác biệt cốt lõi giữa Green Bond và Sustainability-Linked Loan là gì?",
        "options": [
          "Green Bond ràng buộc mục đích dùng vốn, SLL ràng buộc kết quả",
          "Sustainability-Linked Loan luôn rẻ hơn Green Bond",
          "Green Bond chỉ dành cho doanh nghiệp nhà nước, SLL cho tư nhân",
          "Green Bond phải được kiểm toán độc lập, SLL thì không cần"
        ],
        "correct": 0,
        "explanation": "Hai cấu trúc ràng buộc doanh nghiệp ở hai chỗ khác nhau. Green Bond hỏi 'tiền này đi đâu' - vốn huy động phải dùng cho dự án xanh đã xác định và phải báo cáo phân bổ định kỳ, nhưng lãi suất không đổi dù kết quả môi trường ra sao. Sustainability-Linked Loan hỏi 'anh đạt được gì' - tiền dùng cho mục đích chung, nhưng lãi suất tăng hoặc giảm theo việc doanh nghiệp có chạm các chỉ tiêu ESG đã cam kết hay không."
      },
      {
        "question": "Một doanh nghiệp mua tín chỉ carbon để bù trừ toàn bộ phát thải nhưng không giảm phát thải thực tế. Đánh giá thế nào?",
        "options": [
          "Là greenwashing - thứ tự đúng là Đo, Giảm, rồi mới Bù trừ",
          "Chưa đánh giá được nếu chưa biết doanh nghiệp thuộc ngành nào",
          "Tốt hơn giảm phát thải vì chi phí trên mỗi tấn rẻ hơn nhiều",
          "Hợp lệ, vì bù trừ và giảm phát thải có giá trị ngang nhau"
        ],
        "correct": 0,
        "explanation": "Bù trừ chỉ nên áp dụng cho phần phát thải còn lại sau khi đã thực sự cắt giảm hết mức khả thi. Vấn đề lớn nhất của thị trường tự nguyện là tính bổ sung: nếu khu rừng đó vốn đã được bảo vệ dù có bán tín chỉ hay không, thì tín chỉ ấy không tạo ra thêm lượng CO₂ nào được cắt giảm trong thực tế. Cả cơ quan quản lý lẫn nhà đầu tư tổ chức đang ngày càng siết chặt việc chất vấn các tuyên bố 'trung hoà carbon' dựa hoàn toàn vào bù trừ."
      }
    ]
  }),

  // Case chuyên sâu (1001-1040). Two questions per lesson were written short
  // ("Inventory", "Working capital tăng mạnh") and two long, and the long pair
  // was always the correct one - so the tell here is per-question rather than
  // uniform. The short options also left non-Vietnamese fragments in place;
  // those are translated, everything else kept verbatim.






























  "phim-tat-excel-va-ky-luat-ban-phim": patch({
    "quiz": [
      {
        "question": "Tổ hợp Ctrl + phím mũi tên làm gì?",
        "options": [
          "Di chuyển con trỏ từng ô một theo hướng của phím mũi tên được nhấn",
          "Áp dụng định dạng số cho vùng dữ liệu",
          "Chèn thêm một dòng hoặc một cột ngay tại vị trí con trỏ đang đứng",
          "Nhảy tới ô cuối cùng của vùng dữ liệu liên tiếp theo hướng đó"
        ],
        "correct": 3,
        "explanation": "Kết hợp thêm Shift sẽ vừa nhảy vừa chọn cả vùng. Đây là cặp thao tác nền tảng: gần như mọi phím tắt chọn vùng trong mô hình tài chính đều xây trên nó."
      },
      {
        "question": "F2 dùng để làm gì và vì sao quan trọng khi dò lỗi?",
        "options": [
          "Vào chế độ sửa và tô màu các ô mà công thức đang tham chiếu",
          "Lưu nhanh file đang mở mà không cần mở hộp thoại lưu của hệ thống",
          "Xóa nội dung của ô hiện tại nhưng vẫn giữ nguyên định dạng đã đặt",
          "Chuyển sang sheet kế tiếp trong tệp"
        ],
        "correct": 0,
        "explanation": "Khi bạn nghi ngờ một con số, F2 cho thấy ngay công thức đang lấy dữ liệu từ đâu. Rất nhiều lỗi lệch một dòng hoặc một cột được phát hiện chỉ bằng thao tác này."
      },
      {
        "question": "Phím F4 khi đang soạn công thức có tác dụng gì?",
        "options": [
          "Lặp lại thao tác cuối cùng vừa thực hiện trên ô hoặc vùng đang chọn",
          "Xoay vòng giữa các dạng tham chiếu tuyệt đối và tương đối",
          "Tính lại toàn bộ bảng tính",
          "Mở hộp thoại định dạng ô để chỉnh kiểu số, phông chữ và đường viền"
        ],
        "correct": 1,
        "explanation": "Nắm chắc tham chiếu tuyệt đối và tương đối là điều kiện để viết một công thức rồi kéo cho cả bảng - kỹ thuật cốt lõi giúp mô hình nhất quán và giảm mạnh nguy cơ sai sót."
      },
      {
        "question": "Vì sao nên tránh trộn ô (merge cells) trong mô hình tài chính?",
        "options": [
          "Vì ô đã trộn làm tăng đáng kể dung lượng của tệp bảng tính khi lưu lại",
          "Vì Excel không in được ô đã trộn ra PDF",
          "Vì nó phá vỡ việc chọn vùng, sao chép và điều hướng bằng phím tắt",
          "Vì ô đã trộn chỉ nhận giá trị nhập tay chứ không nhận được công thức"
        ],
        "correct": 2,
        "explanation": "Người làm mô hình chuyên nghiệp gần như không bao giờ trộn ô. Muốn căn giữa tiêu đề trên nhiều cột, hãy dùng tùy chọn căn giữa theo vùng chọn - đạt hiệu quả trình bày tương đương mà không phá cấu trúc bảng."
      }
    ,
    {
      "question": "Vì sao bài kiểm tra dựng mô hình lại chấm cả tốc độ thao tác chứ không chỉ chấm kết quả?",
      "options": [
        "Vì thời gian tiết kiệm được là thời gian dành cho rà soát và chạy kịch bản",
        "Vì tốc độ gõ phím phản ánh mức độ thành thạo các công thức tài chính",
        "Vì mô hình dựng nhanh hơn thường có ít lỗi công thức hơn mô hình dựng chậm",
        "Vì nhà tuyển dụng cần đo khả năng chịu áp lực của ứng viên trong thời gian ngắn"
      ],
      "correct": 0,
      "explanation": "Trong chín mươi phút, phần chênh lệch do dùng chuột chiếm đúng khoảng thời gian mà người làm nhanh dùng để kiểm tra lại và thử vài kịch bản. Cùng một mô hình, người có thời gian rà soát nộp bài đúng - người kia nộp bài chưa kiểm tra."
    }
    ]
  }),

  "sql-co-ban-cho-ky-su-he-thong": patch({
    "quiz": [
      {
        "question": "WHERE và HAVING khác nhau thế nào?",
        "options": [
          "Không có khác biệt thực chất, hai mệnh đề thay thế được cho nhau",
          "HAVING chỉ được phép dùng trong các truy vấn có mệnh đề JOIN đi kèm",
          "WHERE dùng cho cột kiểu số, còn HAVING dùng cho cột kiểu văn bản",
          "WHERE lọc dòng trước khi gom nhóm; HAVING lọc nhóm sau khi tổng hợp"
        ],
        "correct": 3,
        "explanation": "Muốn lọc các lượt gọi của tháng 8 thì dùng WHERE. Muốn chỉ lấy những dịch vụ có tổng số lỗi trên 1.000 thì dùng HAVING, vì điều kiện đó chỉ tồn tại sau khi đã gom nhóm và tính tổng."
      },
      {
        "question": "INNER JOIN và LEFT JOIN khác nhau ra sao?",
        "options": [
          "INNER JOIN chỉ giữ dòng khớp cả hai bên; LEFT JOIN giữ trọn bảng trái",
          "LEFT JOIN chạy nhanh hơn INNER JOIN vì không phải đối chiếu hai chiều",
          "INNER JOIN chỉ ghép được đúng hai bảng, còn LEFT JOIN ghép được nhiều hơn",
          "Không có khác biệt về kết quả, chỉ khác nhau về cách viết câu truy vấn"
        ],
        "correct": 0,
        "explanation": "Đây là phân biệt quan trọng bậc nhất trong thực tế. Dùng INNER JOIN khi ghép bảng lượt gọi với bảng khai báo dịch vụ sẽ âm thầm làm biến mất các dịch vụ chưa khai báo, khiến tổng lưu lượng bị thiếu mà bạn không hề biết."
      },
      {
        "question": "Vì sao SQL phù hợp hơn bảng tính khi dữ liệu lớn?",
        "options": [
          "Vì SQL có sẵn nhiều hàm thống kê chuyên dụng hơn so với bảng tính",
          "Vì SQL tự động phát hiện và cảnh báo các giá trị bất thường trong dữ liệu",
          "Vì dữ liệu được xử lý ngay tại nơi lưu trữ, chỉ trả về kết quả tổng hợp",
          "Vì kết quả truy vấn SQL luôn đúng nên không cần bước kiểm tra lại nữa"
        ],
        "correct": 2,
        "explanation": "Nguyên tắc chung là đưa phép tính đến chỗ dữ liệu, chứ không kéo dữ liệu đến chỗ phép tính. Kéo mười triệu dòng về bảng tính rồi mới lọc là cách làm vừa chậm vừa dễ hỏng."
      },
      {
        "question": "Sau khi chạy một truy vấn tổng hợp, bước kiểm tra cần thiết là gì?",
        "options": [
          "Xóa truy vấn ngay sau khi đã lấy được con số cần dùng cho báo cáo",
          "Chạy lại đúng truy vấn đó lần thứ hai để chắc chắn kết quả không đổi",
          "In kết quả ra giấy và lưu lại làm bằng chứng cho lần rà soát về sau",
          "Đối chiếu số dòng và tổng giá trị với một nguồn đã biết cùng kỳ"
        ],
        "correct": 3,
        "explanation": "Một điều kiện lọc sai hoặc một kiểu JOIN sai sẽ cho ra kết quả trông hoàn toàn bình thường. Đối chiếu với một con số tổng đã biết là cách duy nhất phát hiện được, và nên là bước bắt buộc trước khi dùng số liệu cho bất kỳ quyết định nào."
      },
      {
        "question": "Thứ tự thực thi logic của một câu truy vấn cơ bản là gì?",
        "options": [
          "FROM và JOIN trước, rồi WHERE, rồi GROUP BY, rồi HAVING, cuối cùng mới SELECT và ORDER BY",
          "SELECT trước, rồi FROM, rồi WHERE",
          "WHERE luôn chạy đầu tiên",
          "GROUP BY chạy trước WHERE"
        ],
        "correct": 0,
        "explanation": "Hiểu thứ tự này giải thích vì sao không thể dùng tên cột đặt ở SELECT trong mệnh đề WHERE - tại thời điểm WHERE chạy, cột đó chưa tồn tại. Đây là lỗi phổ biến nhất của người mới học SQL."
      }
    ]
  }),
};

export function applyLessonOverrides(lessons) {
  return lessons.map((lesson) => {
    const override = lessonOverrides[lesson.slug];
    return override ? { ...lesson, ...override } : lesson;
  });
}
