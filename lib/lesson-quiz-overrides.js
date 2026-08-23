// `patch` không làm gì - nó chỉ đặt tên cho hình dạng của một entry, để chỗ
// này đọc ra là "vá lên bài học" chứ không phải "định nghĩa bài học".
//
// Hai hàm dựng `d(...)` và `q(...)` từng ở đây đã được gỡ: chúng không còn
// chỗ gọi nào, và một hàm dựng `diagram`/`quiz` nằm sẵn trong file này là lời
// mời viết nội dung dạy vào đây - đúng cái bẫy mà lesson-override-shadowing
// vừa được dọn.
const patch = (lesson) => lesson;

export const lessonOverrides = {
  "wealth-management": patch({
    "quiz": [
      {
        "question": "Wealth management bắt đầu từ đâu?",
        "options": [
          "Net worth, mục tiêu, dòng tiền và khẩu vị rủi ro",
          "Danh sách cổ phiếu và quỹ đang được khuyến nghị",
          "Số vốn tối thiểu cần có để bắt đầu đầu tư",
          "Mức lợi nhuận mục tiêu muốn đạt mỗi năm"
        ],
        "correct": 0,
        "explanation": "Đầu tư chỉ là một phần của bức tranh. Chọn sản phẩm trước khi biết mình đang có gì, cần tiền lúc nào và chịu được biến động đến đâu là làm ngược thứ tự - danh mục khi đó phục vụ chính nó chứ không phục vụ mục tiêu nào."
      },
      {
        "question": "Vì sao asset allocation quan trọng hơn việc chọn đúng một mã?",
        "options": [
          "Vì tỷ trọng giữa các lớp tài sản chi phối phần lớn biến động",
          "Vì phí giao dịch khi chọn từng mã cao hơn nhiều so với quỹ",
          "Vì các mã trong cùng lớp tài sản luôn biến động giống nhau",
          "Vì chọn đúng mã là điều không ai làm được trong thực tế"
        ],
        "correct": 0,
        "explanation": "Tỷ lệ giữa cổ phiếu, trái phiếu và tiền quyết định phần lớn mức dao động của danh mục. Một mã thắng đậm trong phần nhỏ của danh mục khó bù được việc phân bổ sai lệch với khẩu vị rủi ro và khung thời gian của bạn."
      },
      {
        "question": "Tài sản nào thường nằm ở nhóm thanh khoản cao nhất?",
        "options": [
          "Tiền mặt và tiền gửi ngân hàng",
          "Cổ phiếu tăng trưởng chưa niêm yết",
          "Bất động sản cho thuê dài hạn",
          "Đồ sưu tầm và kim loại quý"
        ],
        "correct": 0,
        "explanation": "Thanh khoản đo mức dễ đổi ra tiền mà gần như không mất giá và không phải chờ - tiền gửi ngân hàng đạt cả hai điều kiện. Bất động sản cho thuê mất nhiều tháng để bán và chi phí giao dịch lớn. Cổ phiếu chưa niêm yết không có nơi khớp lệnh sẵn. Đồ sưu tầm và kim loại quý bán được nhưng giá phụ thuộc người mua cụ thể, nên bán gấp thường phải chấp nhận thiệt."
      },
      {
        "question": "Gia đình cần dùng quỹ mua nhà sau 3 năm. Ưu tiên nào đúng?",
        "options": [
          "Ưu tiên an toàn vốn hơn tăng trưởng",
          "Ưu tiên thanh khoản cao nhất có thể đạt",
          "Ưu tiên cổ phiếu vì 3 năm là dài hạn",
          "Ưu tiên tăng trưởng để kịp đủ tiền"
        ],
        "correct": 0,
        "explanation": "Cùng một gia đình có thể có ba khẩu vị rủi ro khác nhau cho ba túi tiền khác nhau: quỹ khẩn cấp cần thanh khoản, quỹ mua nhà 3 năm cần an toàn vốn, quỹ hưu trí 25 năm chịu được rủi ro cao hơn. Khung thời gian quyết định, không phải tuổi của người sở hữu."
      },
      {
        "question": "Tái cân bằng danh mục có ý nghĩa gì?",
        "options": [
          "Giữ đúng mức rủi ro đã chọn từ đầu",
          "Bán tài sản kém và giữ lại tài sản tốt",
          "Tăng lợi nhuận kỳ vọng của cả danh mục",
          "Chuyển dần sang tài sản an toàn hơn"
        ],
        "correct": 0,
        "explanation": "Sau một giai đoạn tăng, phần tài sản rủi ro phình lên và danh mục nghiêng sang mức rủi ro cao hơn mức bạn đã chọn - tái cân bằng là đưa tỷ trọng về lại đúng chỗ đó, kể cả khi phải bán bớt thứ đang lãi. Nó không nhằm tăng lợi nhuận kỳ vọng, và cũng không phải chuyển dần sang tài sản an toàn hơn - đó là việc khác, làm khi mục tiêu hoặc thời hạn đầu tư đổi."
      },
      {
        "question": "Vì sao kế hoạch tốt không chỉ nhắm tối đa hoá lợi nhuận?",
        "options": [
          "Vì còn phải lo thanh khoản ngắn hạn và rủi ro bất ngờ",
          "Vì tối đa hoá lợi nhuận chỉ áp dụng cho nhà đầu tư tổ chức",
          "Vì cơ quan quản lý có giới hạn mức lợi nhuận được hưởng",
          "Vì lợi nhuận cao luôn kéo theo thuế phải nộp cao hơn"
        ],
        "correct": 0,
        "explanation": "Một danh mục lợi nhuận cao nhưng không có tiền mặt cho nhu cầu sáu tháng tới sẽ buộc phải bán đúng lúc không nên bán. Bảo vệ trước biến cố và giữ đủ thanh khoản là điều kiện để phần đầu tư dài hạn được yên ổn chạy."
      }
    ],
  }),
  "value-at-risk-var-stress-testing": patch({
    "quiz": [
      {
        "question": "Một danh mục có VaR 1 ngày ở mức tin cậy 95% là 3 triệu USD, và VaR 1 ngày ở mức 99% là 5 triệu USD. Kết luận nào đúng?",
        "options": [
          "Khoảng 5% số ngày lỗ vượt 3 triệu; 1% số ngày vượt 5 triệu",
          "Có 95% khả năng lỗ đúng 3 triệu và 99% khả năng lỗ đủ 5 triệu",
          "Mức lỗ tối đa có thể xảy ra là 5 triệu trong mọi tình huống",
          "Danh mục lỗ trung bình 3 triệu mỗi ngày, tối đa 5 triệu"
        ],
        "correct": 0,
        "explanation": "Với cùng một danh mục, VaR luôn tăng khi mức tin cậy tăng - cắt sâu hơn vào đuôi phân phối lỗ thì ngưỡng lỗ phải lớn hơn. Nên 3 triệu ở 95% và 5 triệu ở 99% là nhất quán, không phải hai mức rủi ro để đem so hơn kém. Điều quan trọng hơn: VaR chỉ nói lỗ VƯỢT ngưỡng bao nhiêu lần, không nói vượt BAO XA. Ngày tệ nhất trong 1% kia có thể lỗ 8 triệu, cũng có thể 40 triệu - VaR im lặng về chuyện đó, và đó chính là lý do phải dùng thêm Expected Shortfall và stress test."
      },
      {
        "question": "Stress test là gì và khác VaR như thế nào?",
        "options": [
          "Stress test giả lập kịch bản cực đoan; VaR gắn với xác suất",
          "Stress test do cơ quan quản lý chạy; VaR do ngân hàng tự chạy",
          "Stress test dùng cho tín dụng; VaR dùng cho rủi ro thị trường",
          "Stress test tính theo ngày; VaR tính theo cả năm tài chính"
        ],
        "correct": 0,
        "explanation": "VaR trả lời câu hỏi có gắn xác suất: 'ở mức tin cậy X, ngưỡng lỗ là bao nhiêu', ước lượng từ phân phối lợi suất (mô phỏng lịch sử, tham số, hoặc Monte Carlo). Stress test bỏ xác suất đi và hỏi câu khác hẳn: 'nếu kịch bản cụ thể này xảy ra thì mất bao nhiêu' - lặp lại tháng 9/2008, hay VND mất giá 15% trong một tuần. Vì khủng hoảng thường là những biến động chưa từng có trong dữ liệu quá khứ, VaR hay đánh giá thấp rủi ro đúng vào lúc cần nó nhất. Hai công cụ bổ sung cho nhau chứ không thay thế nhau."
      },
      {
        "question": "Tại sao các ngân hàng cần VaR ngoài các phương pháp quản lý rủi ro khác?",
        "options": [
          "Cho một con số duy nhất để so sánh và tuân thủ Basel",
          "Loại bỏ nhu cầu giữ vốn dự phòng cho rủi ro thị trường",
          "Thay thế được hoàn toàn cho việc chạy stress test",
          "Cho biết chính xác khoản lỗ tối đa có thể xảy ra"
        ],
        "correct": 0,
        "explanation": "Giá trị thực dụng của VaR nằm ở chỗ nó nén rủi ro của những thứ rất khác nhau - trái phiếu, ngoại hối, phái sinh, cổ phiếu - về cùng MỘT đơn vị là tiền. Nhờ vậy hội đồng rủi ro so được bàn giao dịch này với bàn kia và đặt được hạn mức cụ thể, thay vì tranh luận định tính. Basel cũng yêu cầu đúng con số này để tính vốn cho rủi ro thị trường. Lựa chọn 'để tỉnh táo' không sai về tinh thần, nhưng đó là tác dụng phụ chứ không phải lý do ngân hàng bắt buộc phải tính VaR."
      },
      {
        "question": "VaR 1 ngày ở mức tin cậy 95% bằng 3 triệu USD. Cách diễn giải nào đúng?",
        "options": [
          "5% số ngày, khoản lỗ sẽ vượt quá 3 triệu USD",
          "Khoản lỗ tối đa có thể xảy ra đúng bằng 3 triệu USD",
          "95% số ngày, danh mục sẽ lãi ít nhất 3 triệu USD",
          "Trong mọi trường hợp lỗ không quá 3 triệu USD"
        ],
        "correct": 0,
        "explanation": "VaR là một ngưỡng phân vị, không phải mức trần. Nó nói 95% số ngày lỗ sẽ dưới 3 triệu, và im lặng hoàn toàn về 5% còn lại - đọc nó thành 'lỗ tối đa' chính là hiểu nhầm đã khiến nhiều tổ chức bất ngờ trong khủng hoảng 2008."
      },
      {
        "question": "Vì sao vẫn cần stress test dù đã tính VaR định kỳ?",
        "options": [
          "Vì VaR im lặng về mức lỗ khi vượt ngưỡng",
          "Vì VaR chỉ tính được cho danh mục cổ phiếu",
          "Vì stress test cho con số chính xác hơn hẳn VaR",
          "Vì Basel III đã bỏ yêu cầu tính VaR định kỳ"
        ],
        "correct": 0,
        "explanation": "Đúng phần đuôi phân phối - nơi tổn thất đủ lớn để đánh sập một tổ chức - là chỗ VaR không nói gì. Stress test đi thẳng vào vùng đó bằng cách hỏi 'nếu lặp lại 2008 thì danh mục này mất bao nhiêu', một câu hỏi về kịch bản chứ không về xác suất."
      }
    ]
  }),
  "basel-iii-regulatory-capital-requirements": patch({
    "quiz": [
      {
        "question": "Sự khác biệt giữa Tier 1 capital và Tier 2 capital là gì?",
        "options": [
          "Tier 1 là vốn chủ và lợi nhuận giữ lại, chịu tổn thất trước",
          "Tier 1 là tiền gửi khách hàng; Tier 2 là vốn vay liên ngân hàng",
          "Tier 1 do cổ đông góp; Tier 2 do ngân hàng trung ương cấp",
          "Tier 1 là vốn ngắn hạn; Tier 2 là vốn dài hạn trên 5 năm"
        ],
        "correct": 0,
        "explanation": "Điểm mấu chốt là THỨ TỰ hấp thụ lỗ. Tier 1 - chủ yếu là vốn cổ phần phổ thông và lợi nhuận giữ lại - chịu lỗ ngay lập tức trong khi ngân hàng vẫn đang hoạt động bình thường, nên được gọi là 'going-concern capital'. Tier 2 (nợ thứ cấp, trái phiếu chuyển đổi...) chỉ hấp thụ lỗ khi ngân hàng đã đổ vỡ và bước vào xử lý, tức 'gone-concern capital'. Vì hai loại phục vụ hai thời điểm khác nhau, chúng không thay thế được cho nhau - đó là lý do Basel III đặt yêu cầu riêng cho Tier 1 chứ không chỉ cho tổng vốn."
      },
      {
        "question": "RWA (Risk Weighted Assets) là gì?",
        "options": [
          "Tài sản được cân theo trọng số rủi ro của từng loại",
          "Tổng tài sản trừ đi phần đã trích lập dự phòng rủi ro",
          "Tài sản được định giá lại theo giá thị trường cuối kỳ",
          "Tài sản có rủi ro cao nhất trong danh mục ngân hàng"
        ],
        "correct": 0,
        "explanation": "Ý tưởng nền: một đồng cho chính phủ vay và một đồng cho vay tín chấp cá nhân không rủi ro như nhau, nên không thể đòi hỏi cùng một lượng vốn. RWA nhân mỗi tài sản với một trọng số rủi ro rồi cộng lại - trái phiếu chính phủ bằng nội tệ thường 0%, cho vay doanh nghiệp 100%, một số khoản đặc biệt rủi ro còn vượt 100%. Mọi tỷ lệ an toàn vốn đều lấy RWA làm mẫu số (CAR = Vốn / RWA), nên chính bộ trọng số này quyết định ngân hàng phải có bao nhiêu vốn. Đây cũng là chỗ ngân hàng có động cơ 'tối ưu hoá' bằng cách dồn vào tài sản trọng số thấp - một điểm mà cơ quan quản lý luôn soi kỹ."
      },
      {
        "question": "Nếu một ngân hàng không đạt yêu cầu Tier 1 capital ratio, điều gì xảy ra?",
        "options": [
          "Bị buộc tăng vốn, giảm tài sản rủi ro và dừng chia cổ tức",
          "Bị buộc sáp nhập vào một ngân hàng lớn hơn trong ngành",
          "Bị phạt tiền theo tỷ lệ phần trăm trên vốn còn thiếu",
          "Bị rút giấy phép hoạt động ngay trong vòng 30 ngày"
        ],
        "correct": 0,
        "explanation": "Yêu cầu vốn không phải khuyến nghị. Khi tỷ lệ tụt dưới ngưỡng đệm, ngân hàng rơi vào vùng bị hạn chế và Basel III chặn PHÂN PHỐI LỢI NHUẬN trước tiên - cắt cổ tức, cắt thưởng, cắt mua lại cổ phiếu - vì đó là cách giữ vốn lại nhanh nhất mà không cần huy động mới. Song song là lộ trình tăng vốn hoặc thu hẹp tài sản rủi ro dưới giám sát. Nếu vẫn không khắc phục được, cơ quan quản lý can thiệp trực tiếp, tới mức kiểm soát đặc biệt hoặc xử lý ngân hàng."
      },
      {
        "question": "Scenario: Ngân hàng nắm 100 tỷ trái phiếu chính phủ (hệ số rủi ro 0%) và 100 tỷ cho vay doanh nghiệp (hệ số 100%). RWA là bao nhiêu?",
        "options": [
          "100 tỷ (= 100 × 0% + 100 × 100%)",
          "200 tỷ (= cộng thẳng, bỏ qua hệ số rủi ro)",
          "0 tỷ (= lấy hệ số thấp nhất cho cả hai)",
          "50 tỷ (= trung bình hai hệ số rủi ro)"
        ],
        "correct": 0,
        "explanation": "RWA nhân từng nhóm tài sản với hệ số rủi ro của nó rồi mới cộng: 0 + 100 = 100 tỷ. Đây là lý do hai ngân hàng cùng tổng tài sản có thể phải giữ mức vốn rất khác nhau - cấu trúc tài sản quyết định, không phải quy mô."
      },
      {
        "question": "Tier 1 capital khác Tier 2 capital ở điểm cốt lõi nào?",
        "options": [
          "Tier 1 hấp thụ lỗ khi ngân hàng còn hoạt động",
          "Tier 1 gồm các khoản vay dài hạn từ cổ đông lớn",
          "Tier 2 có chất lượng cao hơn nên được ưu tiên",
          "Tier 2 chỉ tính khi ngân hàng vượt ngưỡng 10,5%"
        ],
        "correct": 0,
        "explanation": "Tier 1 là vốn chủ sở hữu và lợi nhuận giữ lại - chịu lỗ ngay trong lúc ngân hàng vẫn đang vận hành. Tier 2 gồm nợ thứ cấp, chỉ hấp thụ lỗ khi đã đến bước thanh lý, nên chất lượng thấp hơn và bị giới hạn tỷ trọng."
      }
    ]
  }),
  "dinh-gia-bat-dong-san-tai-san-vo-hinh": patch({
    "quiz": [
      {
        "question": "Ba phương pháp định giá bất động sản chính là gì?",
        "options": [
          "Income Approach, Cost Approach, Market Approach",
          "Cost Approach, Replacement Approach, Salvage Value",
          "Income Approach, DCF Approach, Book Value Approach",
          "DCF, Comparable Company, Precedent Transaction"
        ],
        "correct": 0,
        "explanation": "Ba cách này trả lời ba câu hỏi khác nhau về cùng một tài sản: Income Approach hỏi 'nó đẻ ra bao nhiêu tiền', Market Approach hỏi 'người ta vừa trả bao nhiêu cho cái tương tự', Cost Approach hỏi 'xây lại tốn bao nhiêu'. Một định giá tử tế chạy cả ba rồi giải thích vì sao chúng lệch nhau - chênh lệch giữa Income và Market thường tiết lộ thị trường đang kỳ vọng gì mà dòng tiền hiện tại chưa thể hiện. Một con số đứng đơn độc rất khó bảo vệ khi bị chất vấn."
      },
      {
        "question": "Income Approach định giá bất động sản dựa trên điều gì?",
        "options": [
          "Chiết khấu dòng tiền cho thuê (NOI) về hiện tại",
          "Lấy giá đất cộng chi phí xây dựng công trình trên đó",
          "So sánh với giá giao dịch của bất động sản tương tự",
          "Lấy chi phí xây mới trừ đi phần đã khấu hao"
        ],
        "correct": 0,
        "explanation": "Income Approach chính là DCF khoác áo bất động sản: lấy NOI (doanh thu cho thuê trừ chi phí vận hành, chưa trừ lãi vay và khấu hao) rồi hoặc chia cho cap rate để ra giá trị, hoặc chiết khấu dòng NOI nhiều năm về hiện tại. Vì thế nó nhạy nhất với đúng hai giả định: tỷ lệ lấp đầy và cap rate. Cap rate nhích 0,5 điểm phần trăm có thể làm định giá đổi cả chục phần trăm - đó là lý do báo cáo định giá bất động sản bắt buộc phải có bảng độ nhạy, không phải cho đẹp."
      },
      {
        "question": "Goodwill là gì?",
        "options": [
          "Phần giá mua vượt giá trị hợp lý của tài sản thuần",
          "Phần chênh lệch giữa giá trị sổ sách và giá thị trường",
          "Lợi thế cạnh tranh được ghi nhận là tài sản vô hình",
          "Giá trị thương hiệu được định giá bởi bên thứ ba"
        ],
        "correct": 0,
        "explanation": "Định nghĩa chuẩn dùng GIÁ TRỊ HỢP LÝ của tài sản thuần nhận diện được, không phải giá trị sổ sách - và 'nhận diện được' đã bao gồm cả tài sản vô hình tách bạch được như thương hiệu, hợp đồng khách hàng, bằng sáng chế. Phần dư còn lại chính là những thứ không thể tách rời khỏi doanh nghiệp: đội ngũ, hiệu ứng mạng lưới, kỳ vọng synergy. Goodwill không khấu hao mà phải kiểm tra suy giảm giá trị hằng năm - và một khoản ghi giảm goodwill lớn thường là lời thú nhận muộn màng rằng thương vụ đã mua hớ."
      },
      {
        "question": "Scenario: Một căn nhà cho thuê thu ròng 240 triệu/năm, cap rate thị trường khu vực là 8%. Income Approach cho giá trị bao nhiêu?",
        "options": [
          "3 tỷ (= 240 triệu ÷ 8%, vốn hóa thu nhập)",
          "1,92 tỷ (= 240 × 8, nhân thay vì chia)",
          "19,2 tỷ (= 240 ÷ 0,8%, sai bậc thập phân)",
          "240 triệu (= lấy luôn thu nhập một năm)"
        ],
        "correct": 0,
        "explanation": "Income Approach vốn hóa thu nhập ròng bằng cap rate: 240 ÷ 0,08 = 3 tỷ. Cap rate càng cao thì giá càng thấp, vì nó phản ánh mức lợi suất người mua đòi hỏi - khu vực rủi ro hơn đòi cap rate cao hơn, và cùng một dòng tiền sẽ được trả ít tiền hơn."
      },
      {
        "question": "Scenario: Mua lại một công ty với giá 500 tỷ trong khi giá trị tài sản thuần của nó là 380 tỷ. Goodwill ghi nhận là bao nhiêu?",
        "options": [
          "120 tỷ (= 500 − 380, phần vượt tài sản thuần)",
          "500 tỷ (= toàn bộ giá mua được ghi goodwill)",
          "380 tỷ (= chính là giá trị tài sản thuần)",
          "0 tỷ (= goodwill chỉ có khi mua dưới giá trị)"
        ],
        "correct": 0,
        "explanation": "Goodwill là phần giá mua vượt trên giá trị hợp lý của tài sản thuần: 500 − 380 = 120 tỷ. Nó đại diện cho những thứ không nằm trên bảng cân đối - thương hiệu, quan hệ khách hàng, đội ngũ - và cũng là khoản phải kiểm tra suy giảm hằng năm."
      }
    ]
  }),
  "valuation-report-tinh-hop-ly-dinh-gia": patch({
    "quiz": [
      {
        "question": "Executive Summary trong valuation report nên chứa gì?",
        "options": [
          "Kết luận: giá trị bao nhiêu, phương pháp nào, giả định nào",
          "Lý lịch và chứng chỉ hành nghề của người thực hiện định giá",
          "Toàn bộ số liệu chi tiết của từng phương pháp đã dùng",
          "Danh sách tài liệu và nguồn dữ liệu đã được tham khảo"
        ],
        "correct": 0,
        "explanation": "Executive Summary viết cho người chỉ đọc đúng một trang - thường là CFO, hội đồng đầu tư, hoặc thẩm phán. Nó phải trả lời trọn ba câu: giá trị bao nhiêu (nên là một KHOẢNG, không phải một số duy nhất), bằng phương pháp nào, dựa trên giả định nào. Đủ để người đọc ra quyết định mà không cần lật phần kỹ thuật. Nhồi chi tiết phương pháp vào đây là biến nó thành phần thân bài thứ hai và làm hỏng đúng chức năng của nó."
      },
      {
        "question": "Tại sao Sensitivity Analysis quan trọng?",
        "options": [
          "Cho thấy giá trị đổi thế nào khi giả định đổi",
          "Kiểm tra lại số học của toàn bộ mô hình định giá",
          "So sánh kết quả với các báo cáo định giá khác",
          "Chọn ra giả định có xác suất xảy ra cao nhất"
        ],
        "correct": 0,
        "explanation": "Định giá là một hàm số của các giả định, nên một con số đơn lẻ luôn tỏ ra chính xác hơn thực tế. Bảng độ nhạy hai chiều (thường là WACC × tốc độ tăng trưởng dài hạn) phơi bày điều đó: giá trị chạy trong khoảng nào, và quan trọng hơn - GIẢ ĐỊNH NÀO thực sự lái kết quả. Nghịch lý là nó khiến báo cáo đáng tin hơn chứ không yếu đi, vì người đọc thấy bạn biết rõ chỗ nào mong manh. Báo cáo giấu độ nhạy luôn là báo cáo bị đánh sập đầu tiên khi có tranh chấp."
      },
      {
        "question": "Khi một valuation report bị tranh cãi (ví dụ trong phiên tòa), điều gì được xem xét trước tiên?",
        "options": [
          "Phương pháp, giả định và dữ liệu đã dùng",
          "Con số cuối cùng so với giá thị trường hiện tại",
          "Mức phí đã trả cho đơn vị thực hiện định giá",
          "Uy tín và kinh nghiệm của đơn vị định giá"
        ],
        "correct": 0,
        "explanation": "Trong tranh chấp, không ai chứng minh được con số cuối là 'đúng' - giá trị hợp lý vốn dĩ là một ước lượng, không phải sự thật quan sát được. Cái bị mổ xẻ là QUY TRÌNH: phương pháp có phù hợp với loại tài sản không, giả định có nguồn và có nhất quán với nhau không, các giao dịch so sánh có thật sự tương đương không, ngày định giá có đúng không. Một định giá 50 triệu USD lập luận chặt chẽ sẽ đứng vững trước một định giá 50 triệu USD không giải thích nổi vì sao chọn WACC 9%."
      },
      {
        "question": "Vì sao Sensitivity Analysis là phần không thể thiếu của một valuation report?",
        "options": [
          "Vì nó cho thấy kết quả phụ thuộc giả định tới đâu",
          "Vì nó thay thế được phần phân tích ngành",
          "Vì cơ quan quản lý bắt buộc phải có phần này",
          "Vì nó giúp chọn ra phương pháp định giá đúng"
        ],
        "correct": 0,
        "explanation": "Một con số định giá duy nhất che mất việc nó được xây trên các giả định có thể sai. Cho thấy giá đổi ra sao khi tăng trưởng lệch 1% hay WACC lệch 0,5% biến báo cáo từ một lời khẳng định thành một dải kết quả - trung thực hơn và dùng được để đàm phán."
      },
      {
        "question": "Khi một valuation report bị đưa ra tranh chấp tại tòa, điều gì bị soi kỹ nhất?",
        "options": [
          "Giả định có hợp lý và được chứng minh không",
          "Báo cáo dài bao nhiêu trang và trình bày ra sao",
          "Con số cuối cùng có tròn trịa dễ nhớ hay không",
          "Danh tiếng của công ty tư vấn đã ký báo cáo"
        ],
        "correct": 0,
        "explanation": "Phương pháp định giá là chuẩn mực công khai nên hiếm khi bị bác; chỗ dễ tấn công là các con số đầu vào. Một giả định tăng trưởng 15% mỗi năm mà không có dữ liệu ngành nào đỡ sẽ làm sụp toàn bộ kết luận, dù phép tính phía sau hoàn toàn đúng."
      }
    ]
  }),
  "investment-thesis-research-report-structure": patch({
    "quiz": [
      {
        "question": "Các phần chính của một investment thesis là gì?",
        "options": [
          "Luận điểm, bằng chứng, lý do định giá sai, catalyst, rủi ro",
          "Tóm tắt, phân tích ngành, định giá, khuyến nghị mua bán",
          "Lịch sử giá, khối lượng giao dịch, và các mức kỹ thuật",
          "Báo cáo tài chính ba năm gần nhất kèm dự phóng năm năm"
        ],
        "correct": 0,
        "explanation": "Một luận điểm đầu tư đầy đủ phải trả lời được: tôi tin điều gì, dựa trên bằng chứng nào, VÌ SAO thị trường đang định giá sai (variant perception - nếu ai cũng nghĩ như tôi thì giá đã phản ánh rồi), điều gì sẽ khiến thị trường nhận ra, và nếu tôi sai thì sai ở đâu. Thiếu phần catalyst, đó là một nhận định có thể đúng mãi mà không bao giờ sinh lời. Thiếu phần rủi ro, đó là lời quảng cáo chứ không phải phân tích."
      },
      {
        "question": "Catalyst trong đầu tư là gì?",
        "options": [
          "Sự kiện sẽ kích hoạt việc thị trường định giá lại",
          "Mức giá mục tiêu mà nhà phân tích đặt ra cho cổ phiếu",
          "Chỉ báo kỹ thuật báo hiệu xu hướng giá sắp đảo chiều",
          "Yếu tố khiến cổ phiếu bị định giá sai ngay từ đầu"
        ],
        "correct": 0,
        "explanation": "Catalyst là câu trả lời cho 'vì sao là BÂY GIỜ'. Một cổ phiếu định giá thấp có thể tiếp tục định giá thấp nhiều năm - thị trường không có nghĩa vụ đồng ý với bạn theo lịch của bạn. Catalyst là sự kiện có thời điểm tương đối xác định buộc giá phải phản ứng: kết quả quý, ra mắt sản phẩm, bán mảng lỗ, thay CEO, phán quyết pháp lý, thay đổi quy định. Đây cũng là phần quyết định quy mô vị thế và thời hạn nắm giữ - không có catalyst thì không biết nên chờ bao lâu."
      },
      {
        "question": "Cấu trúc của một research report là gì?",
        "options": [
          "Tóm tắt, luận điểm, ngành, công ty, định giá, rủi ro, khuyến nghị",
          "Tóm tắt, số liệu lịch sử, dự phóng, và bảng so sánh ngành",
          "Giới thiệu công ty, phân tích SWOT, và khuyến nghị đầu tư",
          "Mở đầu, thân bài, kết luận và phụ lục số liệu kèm theo"
        ],
        "correct": 0,
        "explanation": "Trình tự này đi từ KẾT LUẬN xuống bằng chứng, vì người đọc chuyên nghiệp đọc theo đúng thứ tự đó và thường dừng giữa chừng. Mỗi phần có một nhiệm vụ riêng: ngành để định khung, công ty để nêu lợi thế cạnh tranh, định giá để ra con số, rủi ro để chứng minh bạn đã tự phản biện, khuyến nghị để nói rõ hành động và giá mục tiêu. Báo cáo chỉ có giá mục tiêu mà không có đường dẫn tới nó thì không ai đặt lệnh theo được."
      },
      {
        "question": "Yếu tố nào đủ tiêu chuẩn làm catalyst trong một investment thesis?",
        "options": [
          "Nhà máy mới chạy quý 3, có mốc thời gian rõ",
          "Ngành sẽ tốt lên trong vài năm tới",
          "Ban lãnh đạo có tầm nhìn tốt hơn đối thủ",
          "Cổ phiếu đang rẻ nên sớm muộn sẽ tăng"
        ],
        "correct": 0,
        "explanation": "Catalyst phải là một sự kiện cụ thể với thời điểm dự kiến, vì đó là thứ biến định giá thấp thành lợi nhuận thực. Không có nó, luận điểm chỉ nói rằng cổ phiếu rẻ - mà rẻ có thể rẻ mãi, và vốn nằm chờ vô hạn cũng là một khoản lỗ."
      },
      {
        "question": "Ba trụ cột của một investment thesis là gì?",
        "options": [
          "Nền tảng, định giá và chất xúc tác",
          "Phân tích kỹ thuật, tâm lý và dòng tiền",
          "Doanh thu, lợi nhuận và cổ tức",
          "Ngành, quy mô và thanh khoản"
        ],
        "correct": 0,
        "explanation": "Nền tảng trả lời doanh nghiệp có tốt lên không, định giá trả lời giá hiện tại đã phản ánh điều đó chưa, chất xúc tác trả lời khi nào thị trường nhận ra. Thiếu bất kỳ trụ nào thì luận điểm vẫn có thể đúng mà khoản đầu tư vẫn thua."
      }
    ]
  }),
  "quy-trinh-tham-dinh-tin-dung-5c-framework": patch({
    "quiz": [
      {
        "question": "Character trong 5C là gì?",
        "options": [
          "Thiện chí trả nợ, đo bằng lịch sử tín dụng và số ngày quá hạn",
          "Uy tín cá nhân của chủ doanh nghiệp trong cộng đồng địa phương",
          "Mức độ minh bạch của báo cáo tài chính đã được kiểm toán",
          "Năng lực điều hành của ban lãnh đạo doanh nghiệp vay vốn"
        ],
        "correct": 0,
        "explanation": "Đây đúng là chỗ bẫy của bản dịch. 'Character' không phải tính cách theo nghĩa thông thường, mà là thiện chí trả nợ ĐO BẰNG BẰNG CHỨNG - lịch sử tín dụng trên CIC, số ngày quá hạn, cách người vay xử lý các khoản nợ cũ khi gặp khó, uy tín với nhà cung cấp. Phân biệt then chốt trong tín dụng: willingness to pay (Character) tách hẳn khỏi ability to pay (Capacity). Một người thừa khả năng trả vẫn có thể chọn không trả, và hồ sơ quá khứ là chỉ báo tốt nhất cho lựa chọn đó."
      },
      {
        "question": "Capacity là gì?",
        "options": [
          "Khả năng trả nợ, đo bằng D/E, Interest Coverage, DSCR",
          "Giá trị tài sản bảo đảm mà khách hàng có thể thế chấp",
          "Quy mô vốn chủ sở hữu mà doanh nghiệp đang có sẵn",
          "Hạn mức tín dụng tối đa mà ngân hàng sẵn sàng cấp"
        ],
        "correct": 0,
        "explanation": "Capacity là chân đế của khoản vay: tiền ở đâu ra để trả. Với doanh nghiệp, người ta nhìn dòng tiền từ hoạt động kinh doanh chứ không phải lợi nhuận kế toán, qua Debt/EBITDA, Interest Coverage (EBIT chia lãi vay) và DSCR (dòng tiền khả dụng chia nghĩa vụ nợ). Với cá nhân là tỷ lệ nghĩa vụ trả nợ trên thu nhập. Nhớ đúng thứ tự ưu tiên: tài sản thế chấp chỉ là phương án dự phòng, DÒNG TIỀN mới là nguồn trả nợ - ngân hàng cho vay để thu lãi, không phải để đi phát mại nhà."
      },
      {
        "question": "Tại sao Conditions (điều kiện kinh tế) lại quan trọng?",
        "options": [
          "Vì suy thoái hoặc cú sốc ngành vẫn làm khách hàng mất khả năng trả",
          "Vì cơ quan quản lý yêu cầu đánh giá vĩ mô trong mọi hồ sơ vay",
          "Vì điều kiện kinh tế quyết định lãi suất mà ngân hàng được áp",
          "Vì bốn chữ C còn lại chỉ áp dụng cho khách hàng doanh nghiệp"
        ],
        "correct": 0,
        "explanation": "Bốn chữ C còn lại đều đo ở cấp TỪNG người vay; Conditions là chữ C duy nhất nhìn ra bên ngoài. Nó quan trọng vì rủi ro tín dụng có tính tương quan: khi ngành hoặc nền kinh tế xấu đi, cả một rổ khách hàng vốn tốt cùng gặp khó MỘT LÚC - đúng vào lúc giá tài sản thế chấp cũng giảm, nên phương án dự phòng hỏng cùng lúc với nguồn trả nợ chính. Đó chính là cơ chế đã làm vỡ nhiều danh mục trông rất an toàn khi xét từng hồ sơ riêng lẻ, và là lý do ngân hàng đặt hạn mức theo ngành chứ không chỉ theo khách hàng."
      },
      {
        "question": "Scenario: Hồ sơ vay có Capacity, Capital và Collateral đều tốt, nhưng Character đáng ngờ. Nên xử lý thế nào?",
        "options": [
          "Từ chối, vì thiếu ý định trả thì tài sản không cứu được",
          "Duyệt, vì ba chữ C còn lại đã bù đủ rủi ro",
          "Duyệt nhưng nâng lãi suất để bù phần rủi ro đó",
          "Duyệt nếu giá trị thế chấp vượt 150% khoản vay"
        ],
        "correct": 0,
        "explanation": "Character là điều kiện cần chứ không phải một điểm cộng có thể đánh đổi. Người có khả năng trả nhưng không có ý định trả sẽ biến khoản vay thành một vụ kiện kéo dài nhiều năm, và thu hồi tài sản thế chấp gần như luôn mất giá trị lẫn thời gian."
      },
      {
        "question": "Vì sao Conditions vẫn quan trọng khi bốn chữ C còn lại đều tốt?",
        "options": [
          "Vì suy thoái ngành có thể phá vỡ khả năng trả nợ",
          "Vì Conditions quyết định lãi suất trần theo quy định",
          "Vì Conditions thay thế Collateral khi không có tài sản",
          "Vì các chữ C khác chỉ đo được tại một thời điểm"
        ],
        "correct": 0,
        "explanation": "Bốn chữ C kia mô tả người vay ở hiện tại, còn khoản vay thì sống trong tương lai. Một doanh nghiệp vận tải khỏe mạnh vẫn có thể mất khả năng trả nợ khi giá nhiên liệu tăng gấp đôi - rủi ro đó không nằm ở hồ sơ mà nằm ở môi trường."
      }
    ]
  }),
  "hedging-instruments-fx-derivatives": patch({
    "quiz": [
      {
        "question": "Sự khác biệt giữa Forward, Futures và Options là gì?",
        "options": [
          "Forward tùy chỉnh OTC; futures chuẩn hóa trên sàn; options cho quyền",
          "Forward dùng cho ngoại tệ; futures cho hàng hóa; options cho cổ phiếu",
          "Forward có ký quỹ hằng ngày; futures thì thanh toán một lần cuối kỳ",
          "Forward và options bắt buộc thực hiện; futures thì không bắt buộc"
        ],
        "correct": 0,
        "explanation": "Có hai trục phân biệt, đừng trộn chúng vào nhau. Trục thứ nhất là NƠI GIAO DỊCH: Forward ký tay đôi ngoài sàn (OTC) nên tùy chỉnh được số tiền và ngày đáo hạn, đổi lại gánh rủi ro đối tác; Futures chuẩn hoá và giao dịch qua sàn có trung tâm bù trừ, phải ký quỹ và tất toán lãi lỗ hằng ngày. Trục thứ hai là NGHĨA VỤ: Forward và Futures đều BẮT BUỘC thực hiện khi đáo hạn, còn Options chỉ trao QUYỀN - nên người mua option phải trả phí (premium) để giữ được phần lợi khi giá đi thuận và bỏ quyền khi giá đi nghịch."
      },
      {
        "question": "Tại sao swaps được dùng trong quản lý rủi ro lãi suất?",
        "options": [
          "Một bên trả cố định, bên kia trả thả nổi, đổi dòng tiền lãi",
          "Hai bên hoán đổi cả phần gốc lẫn lãi của hai khoản vay khác nhau",
          "Ngân hàng đứng ra bảo lãnh lãi suất cố định cho doanh nghiệp",
          "Doanh nghiệp trả trước toàn bộ lãi để khóa mức lãi suất"
        ],
        "correct": 0,
        "explanation": "Interest Rate Swap không chuyển tiền gốc, chỉ hoán đổi DÒNG LÃI tính trên một số tiền danh nghĩa. Công dụng thực tế là khớp lại cấu trúc nợ với cấu trúc doanh thu: doanh nghiệp đang vay thả nổi nhưng có doanh thu ổn định sẽ trả cố định / nhận thả nổi để chốt cứng chi phí lãi vay, khỏi phải đoán lãi suất; ngân hàng dùng chiều ngược lại để cân bằng bảng cân đối. Lưu ý quan trọng: swap không làm rủi ro biến mất, nó chỉ chuyển rủi ro sang bên có khẩu vị ngược lại - và tạo ra rủi ro đối tác mới."
      },
      {
        "question": "Call option trên USD là gì?",
        "options": [
          "Quyền mua USD ở tỷ giá đã chốt, không bắt buộc thực hiện",
          "Quyền được bán USD ở tỷ giá đã chốt, không bắt buộc thực hiện",
          "Cam kết mua USD theo tỷ giá trung bình của kỳ tính toán",
          "Nghĩa vụ mua USD ở tỷ giá đã chốt vào ngày đáo hạn"
        ],
        "correct": 0,
        "explanation": "Call USD là quyền mua USD ở tỷ giá đã chốt trước (strike). Với doanh nghiệp Việt Nam nhập khẩu phải trả USD sau 3 tháng, nó hoạt động đúng như một hợp đồng bảo hiểm tỷ giá: USD tăng vượt strike thì thực hiện quyền và mua theo giá cũ; USD giảm thì bỏ quyền, ra thị trường mua rẻ hơn, và thiệt hại tối đa đúng bằng khoản phí đã trả. Khác biệt căn bản so với forward: forward khoá chặt tỷ giá cả hai chiều và không tốn phí ban đầu, còn option để ngỏ phần lợi nhưng phải trả phí - chọn cái nào là đánh đổi giữa chi phí và tính linh hoạt, không có cái nào luôn tốt hơn."
      },
      {
        "question": "Scenario: Doanh nghiệp nhập khẩu phải trả USD sau ba tháng và lo USD tăng giá. Công cụ nào khóa được tỷ giá mà không tốn phí trả trước?",
        "options": [
          "Hợp đồng forward mua USD kỳ hạn 3 tháng",
          "Mua call option USD, trả phí quyền chọn",
          "Bán khống USD trên thị trường giao ngay",
          "Interest rate swap để đổi lãi cố định"
        ],
        "correct": 0,
        "explanation": "Forward chốt sẵn tỷ giá cho một ngày trong tương lai và không đòi phí ban đầu, đổi lại là mất luôn phần lợi nếu USD giảm. Option giữ được phần lợi đó nhưng phải trả phí quyền chọn ngay từ đầu - hai cách bảo hiểm với hai cái giá khác nhau."
      },
      {
        "question": "Hedging khác đầu cơ ở điểm nào, dù cả hai đều dùng phái sinh?",
        "options": [
          "Hedging bù rủi ro có sẵn, đầu cơ tạo rủi ro mới",
          "Hedging chỉ dùng forward, đầu cơ chỉ dùng option",
          "Hedging luôn có lãi còn đầu cơ thì có thể lỗ",
          "Hedging do ngân hàng làm, đầu cơ do quỹ làm"
        ],
        "correct": 0,
        "explanation": "Cùng một hợp đồng forward là hedging với doanh nghiệp đang có khoản phải trả bằng USD, và là đầu cơ với người không có khoản đó. Phân biệt nằm ở vị thế gốc chứ không ở công cụ - đây cũng là lý do hedging làm quá tay sẽ trở thành đầu cơ."
      }
    ]
  }),
  "cap-table-va-vesting-cau-truc-von-startup": patch({
    "quiz": [
      {
        "question": "'Vesting Schedule' (lịch trình trao quyền) tiêu chuẩn 4 năm với '1 year cliff' cho cổ phần nhân viên/nhà sáng lập hoạt động như thế nào?",
        "options": [
          "Không nhận gì trong 12 tháng đầu, sau đó vest dần từng tháng",
          "Nhận toàn bộ cổ phần ngay khi ký hợp đồng lao động",
          "Nhận đều mỗi tháng ngay từ tháng đầu tiên làm việc",
          "Nhận một nửa sau hai năm và nửa còn lại vào cuối năm thứ tư"
        ],
        "correct": 0,
        "explanation": "Cấu trúc vesting '4 năm với 1 năm cliff' là chuẩn phổ biến nhất trong ngành startup toàn cầu: cơ chế 'cliff' bảo vệ công ty khỏi việc trao cổ phần cho người rời đi quá sớm (trước khi thực sự đóng góp giá trị đáng kể), trong khi lịch trình vesting dần sau đó tạo động lực giữ chân nhân tài lâu dài - đây là kiến thức cơ bản mọi PE/VC Analyst cần hiểu khi đánh giá cấu trúc sở hữu và động lực của đội ngũ sáng lập/nhân viên."
      },
      {
        "question": "'Anti-dilution Protection' (bảo vệ chống pha loãng) trong term sheet của VC bảo vệ nhà đầu tư khỏi rủi ro gì cụ thể?",
        "options": [
          "Rủi ro vòng gọi vốn sau có định giá thấp hơn vòng trước",
          "Rủi ro công ty phát hành thêm cổ phần cho nhân viên mới",
          "Rủi ro nhà sáng lập rời công ty trước khi vesting xong",
          "Rủi ro cổ phần ưu đãi bị chuyển đổi thành cổ phần thường"
        ],
        "correct": 0,
        "explanation": "Anti-dilution protection là một trong những điều khoản phức tạp và quan trọng nhất trong term sheet VC: nó không ngăn chặn hoàn toàn việc pha loãng (dilution vẫn xảy ra khi có cổ phần mới phát hành), nhưng điều chỉnh TỶ LỆ CHUYỂN ĐỔI của cổ phần ưu đãi cũ để phần nào bù đắp thiệt hại khi vòng gọi vốn sau có định giá thấp hơn - hiểu cơ chế này (đặc biệt 'weighted average' vs 'full ratchet', hai biến thể phổ biến với mức độ bảo vệ khác nhau) là kỹ năng cần thiết khi phân tích tác động của một vòng gọi vốn mới lên các nhà đầu tư hiện hữu."
      },
      {
        "question": "Tại sao việc đọc hiểu chi tiết Cap Table (không chỉ nhìn tỷ lệ % sở hữu bề mặt) lại đặc biệt quan trọng khi một PE/VC Analyst đánh giá một deal đầu tư mới vào một startup đã có nhiều vòng gọi vốn trước đó?",
        "options": [
          "Vì các lớp preference tích lũy có thể nuốt gần hết tiền exit",
          "Vì tỷ lệ phần trăm sở hữu thay đổi mỗi khi có vòng gọi vốn mới",
          "Vì cổ phần của nhà sáng lập chưa vesting hết nên chưa tính được",
          "Vì định giá của các vòng trước cần được kiểm toán lại từ đầu"
        ],
        "correct": 0,
        "explanation": "Đây là kỹ năng phân tích cốt lõi của PE/VC Analyst: 'Liquidation Preference Stack' (chồng lớp ưu tiên thanh lý) từ nhiều vòng gọi vốn (Seed, Series A, B, C...) tạo ra một cấu trúc phức tạp mà nhà đầu tư mới PHẢI mô hình hóa qua các kịch bản exit khác nhau (waterfall analysis) để hiểu thực sự họ sẽ nhận được bao nhiêu trong từng tình huống - một startup 'thành công vừa phải' về mặt định giá có thể vẫn khiến vòng đầu tư mới nhất nhận được rất ít, nếu các lớp preference tích lũy từ vòng trước đã chiếm phần lớn giá trị."
      },
      {
        "question": "Startup exit 20 triệu USD. VC nắm 20% với liquidation preference 1x trên khoản đầu tư 8 triệu. VC nhận bao nhiêu?",
        "options": [
          "8 triệu (lấy preference), vì lớn hơn 20% của 20 triệu",
          "4 triệu, đúng bằng 20% của giá trị exit 20 triệu USD",
          "12 triệu, gồm cả preference lẫn phần chia theo tỷ lệ",
          "20 triệu, vì cổ đông ưu đãi được nhận trước toàn bộ"
        ],
        "correct": 0,
        "explanation": "Cổ đông ưu đãi chọn phương án có lợi hơn: lấy lại 8 triệu vốn, hoặc chuyển đổi để nhận 20% × 20 = 4 triệu. Họ lấy 8 triệu, và phần còn lại 12 triệu mới chia cho những người khác - đây là lý do tỷ lệ sở hữu bề mặt gây hiểu nhầm."
      },
      {
        "question": "Vì sao một exit \"thành công vừa phải\" có thể khiến nhà sáng lập nhận rất ít?",
        "options": [
          "Vì tổng preference của các vòng đã gần bằng giá trị exit",
          "Vì cổ phần nhà sáng lập luôn bị pha loãng xuống dưới 5%",
          "Vì thuế đánh trên phần chênh lệch giá bán rất cao",
          "Vì nhà sáng lập phải hoàn lại lương đã nhận trong các năm lỗ"
        ],
        "correct": 0,
        "explanation": "Gọi vốn 60 triệu qua nhiều vòng với preference 1x, rồi exit ở 70 triệu: 60 triệu về tay nhà đầu tư trước, chỉ 10 triệu chia cho phần còn lại. Con số exit nghe lớn nhưng waterfall mới quyết định ai nhận gì."
      }
    ]
  }),
  "phan-tich-cvp-va-diem-hoa-von": patch({
    "quiz": [
      {
        "question": "'Operating Leverage' (Đòn bẩy hoạt động) - tỷ lệ giữa chi phí cố định và chi phí biến đổi trong cơ cấu chi phí của doanh nghiệp - ảnh hưởng thế nào đến mức độ biến động của lợi nhuận khi doanh thu thay đổi?",
        "options": [
          "Chi phí cố định càng lớn thì lợi nhuận càng biến động mạnh",
          "Chi phí cố định lớn giúp lợi nhuận ổn định qua các chu kỳ",
          "Đòn bẩy hoạt động chỉ ảnh hưởng khi doanh thu đang giảm",
          "Cơ cấu chi phí không tác động tới mức dao động lợi nhuận"
        ],
        "correct": 0,
        "explanation": "Đây là mối liên hệ quan trọng giữa cơ cấu chi phí và rủi ro kinh doanh: doanh nghiệp Operating Leverage cao có lợi nhuận 'khuếch đại' theo cả hai hướng - tăng mạnh khi doanh thu tăng (vượt điểm hòa vốn), nhưng cũng giảm mạnh khi doanh thu giảm (chi phí cố định vẫn phải trả). Đây là lý do các hãng hàng không (chi phí cố định rất cao - máy bay, phi hành đoàn, sân bay) thường có lợi nhuận biến động mạnh theo chu kỳ kinh tế hơn nhiều so với các công ty dịch vụ có chi phí biến đổi chiếm tỷ trọng lớn."
      },
      {
        "question": "'Contribution Margin Ratio' (Tỷ lệ Đóng góp trên Doanh thu) khác với 'Gross Margin' (Biên lợi nhuận gộp) như thế nào về cách phân loại chi phí?",
        "options": [
          "Contribution Margin tách theo hành vi, Gross Margin theo chức năng",
          "Contribution Margin tính trước thuế, Gross Margin tính sau thuế",
          "Contribution Margin dùng cho báo cáo ra bên ngoài doanh nghiệp",
          "Hai chỉ số giống nhau, chỉ khác tên gọi giữa các chuẩn mực"
        ],
        "correct": 0,
        "explanation": "Đây là phân biệt quan trọng giữa kế toán tài chính (financial accounting - dùng cho báo cáo bên ngoài, phân loại chi phí theo CHỨC NĂNG) và kế toán quản trị (management accounting - dùng cho quyết định nội bộ, phân loại chi phí theo HÀNH VI): Contribution Margin format tách biệt rõ ràng chi phí cố định và biến đổi, cho phép phân tích CVP và ra quyết định (như điểm hòa vốn, tác động của thay đổi sản lượng) mà báo cáo Gross Margin truyền thống không thể hiện trực tiếp được."
      },
      {
        "question": "Khi một doanh nghiệp cân nhắc giảm giá bán 10% để tăng doanh số, phân tích CVP giúp trả lời câu hỏi quan trọng nào trước khi đưa ra quyết định?",
        "options": [
          "Cần bán thêm bao nhiêu để bù phần biên đã mất khi giảm giá",
          "Đối thủ có giảm giá theo hay không sau khi mình giảm trước",
          "Chi phí cố định có giảm được tương ứng với mức giảm giá không",
          "Khách hàng có nhận ra sự thay đổi về giá bán hay không"
        ],
        "correct": 0,
        "explanation": "Đây là ứng dụng thực tế cực kỳ quan trọng của CVP trong quyết định định giá: vì Contribution Margin trên mỗi đơn vị nhạy cảm với thay đổi giá bán (do chi phí biến đổi không đổi), một mức giảm giá tưởng chừng nhỏ có thể làm giảm Contribution Margin theo tỷ lệ LỚN HƠN NHIỀU (đặc biệt với sản phẩm có biên lợi nhuận mỏng ban đầu), đòi hỏi mức tăng sản lượng rất lớn để hòa vốn cho việc giảm giá - phân tích này thường tiết lộ những chiến lược giảm giá 'hấp dẫn trên giấy' nhưng không thực tế khi tính toán kỹ."
      },
      {
        "question": "Giá bán 100.000đ, biến phí 60.000đ, định phí 400 triệu. Điểm hòa vốn là bao nhiêu sản phẩm?",
        "options": [
          "10.000 sản phẩm (= 400tr ÷ 40.000 số dư đảm phí)",
          "4.000 sản phẩm (= 400tr ÷ 100.000, chia cho giá bán)",
          "6.667 sản phẩm (= 400tr ÷ 60.000, chia cho biến phí)",
          "40.000 sản phẩm (= 400tr ÷ 10.000, sai số dư đảm phí)"
        ],
        "correct": 0,
        "explanation": "Số dư đảm phí = 100.000 − 60.000 = 40.000đ mỗi sản phẩm. Điểm hòa vốn = 400.000.000 / 40.000 = 10.000 sản phẩm. Chia cho giá bán thay vì cho số dư đảm phí là lỗi phổ biến nhất."
      },
      {
        "question": "Vẫn ví dụ trên nhưng giảm giá 10%. Cần bán thêm bao nhiêu phần trăm để hòa vốn?",
        "options": [
          "33% (số dư đảm phí rơi từ 40.000 xuống 30.000)",
          "10%, đúng bằng mức phần trăm đã giảm giá bán",
          "25%, vì doanh thu mỗi sản phẩm giảm một phần tư",
          "Không cần bán thêm vì định phí vẫn giữ nguyên"
        ],
        "correct": 0,
        "explanation": "Giảm giá 10% lấy đi 10.000đ, nhưng nó lấy từ số dư đảm phí 40.000 chứ không từ giá 100.000 - tức mất 25% biên. Điểm hòa vốn nhảy từ 10.000 lên 13.333 sản phẩm, tăng 33%. Đây là lý do các chiến lược giảm giá hay đổ vỡ khi tính kỹ."
      }
    ]
  }),
  "dinh-gia-tai-san-rong": patch({
    "quiz": [
      {
        "question": "NAV thường trả lời câu hỏi gì?",
        "options": [
          "Nếu bán hết tài sản rồi trừ nợ thì còn bao nhiêu cho cổ đông",
          "Mức doanh thu công ty dự kiến đạt được trong năm kế tiếp",
          "Tỷ lệ biên lợi nhuận gộp trên tổng doanh thu của công ty",
          "Tốc độ tăng trưởng số lượng người dùng sản phẩm của công ty"
        ],
        "correct": 0,
        "explanation": "NAV (Net Asset Value) là khung nhìn tài sản ròng khá trực tiếp: định giá từng tài sản riêng lẻ theo giá thị trường hợp lý, trừ đi toàn bộ nợ, phần còn lại là giá trị thuộc về cổ đông."
      },
      {
        "question": "Vì sao asset-based valuation thường KHÔNG phù hợp để định giá một công ty phần mềm (SaaS) đang tăng trưởng nhanh?",
        "options": [
          "Vì giá trị nằm ở tài sản vô hình không tách bán riêng được",
          "Vì công ty SaaS không phải công bố báo cáo tài chính định kỳ",
          "Vì công ty SaaS luôn có giá trị tài sản ròng âm theo mô hình",
          "Vì quy định hiện hành cấm dùng NAV cho lĩnh vực công nghệ"
        ],
        "correct": 0,
        "explanation": "Asset-based valuation giả định các tài sản có thể tách rời và bán riêng lẻ với giá trị thị trường rõ ràng - đúng với đất đai, tòa nhà, máy móc. Một công ty SaaS tạo giá trị chủ yếu từ tài sản vô hình khó định giá tách rời, nên DCF hoặc multiples (P/E, EV/Revenue) phản ánh giá trị thực tế tốt hơn nhiều."
      },
      {
        "question": "Công ty holding có tổng giá trị tài sản theo giá thị trường 6.000 tỷ và nợ vay 2.500 tỷ. NAV là bao nhiêu?",
        "options": [
          "3.500 tỷ (= 6.000 tài sản − 2.500 nợ vay)",
          "8.500 tỷ (= 6.000 + 2.500, cộng thay vì trừ)",
          "2.500 tỷ (chỉ lấy riêng phần nợ phải trả)",
          "6.000 tỷ (bỏ quên chưa trừ khoản nợ vay)"
        ],
        "correct": 0,
        "explanation": "NAV = Giá trị tài sản − Nợ = 6.000 − 2.500 = 3.500 tỷ. Đây là phần giá trị thuộc về cổ đông nếu bán hết tài sản theo giá thị trường và trả hết nợ."
      },
      {
        "question": "Vì sao NAV phù hợp với công ty holding bất động sản?",
        "options": [
          "Vì từng tài sản có giá thị trường rõ và bán rời được",
          "Vì công ty holding thường không vay nợ ngân hàng",
          "Vì bất động sản luôn tăng giá theo thời gian nắm giữ",
          "Vì holding không có dòng tiền để áp dụng phương pháp DCF"
        ],
        "correct": 0,
        "explanation": "NAV chỉ đúng khi giả định tách rời và bán từng tài sản là hợp lý. Một tòa nhà có giá thị trường tra được và bán riêng được; một đội ngũ kỹ sư thì không - đó là toàn bộ ranh giới áp dụng của phương pháp này."
      },
      {
        "question": "Cổ phiếu holding giao dịch thấp hơn NAV 30%. Cách giải thích phổ biến nhất?",
        "options": [
          "Chiết khấu holding, do chi phí quản lý và thuế khi bán tài sản",
          "Thị trường đã định giá sai và đây là cơ hội mua vào rõ ràng",
          "Giá trị tài sản trên sổ sách đã bị ghi nhận thấp hơn thực tế",
          "Công ty sắp phát hành thêm cổ phiếu làm pha loãng giá trị"
        ],
        "correct": 0,
        "explanation": "Chiết khấu 20-40% so với NAV là chuyện thường ở công ty holding: cổ đông không tự quyết được việc bán tài sản, phải gánh bộ máy quản lý, và bán thật thì còn thuế. Nó có thể là cơ hội, nhưng mặc định là một mức chiết khấu có lý do."
      }
    ]
  }),
  // Chặng trái phiếu (141-154). Every one of these ten questions had the
  // correct answer as the longest option, and the second question of each
  // lesson restated its own explanation in the option - 194 to 283 characters
  // against 40-70 for the distractors. Prompts and explanations unchanged.





  // Chặng kế toán cơ bản (23-40). The same defect as the bond chặng, one step
  // worse: 6-7 of every 7 questions had the correct answer as the longest
  // option, and the distractors were padded with filler ("đã tính toán sai
  // sót đâu đó trong quá trình lập báo cáo") to reach a length nobody would
  // pick. Prompts and explanations unchanged.
  "tai-chinh-bat-dong-san-cap-rate-noi-rental-yield": patch({
    "quiz": [
      {
        "question": "Lợi nhuận vận hành ròng NOI (Net Operating Income) của bất động sản được tính bằng công thức nào?",
        "options": [
          "Doanh thu cho thuê − chi phí vận hành, chưa trừ lãi vay",
          "Tổng giá trị hợp đồng mua bán − chi phí môi giới và thuế",
          "Doanh thu cho thuê − chi phí vận hành − lãi vay",
          "Doanh thu cho thuê − lãi vay − thuế thu nhập cá nhân"
        ],
        "correct": 0,
        "explanation": "NOI chỉ trừ các chi phí để giữ tài sản vận hành được, và KHÔNG trừ lãi vay hay thuế thu nhập. Ranh giới đó có mục đích rõ ràng: nó tách hiệu quả của bản thân bất động sản khỏi cách chủ sở hữu tài trợ cho nó, nhờ vậy hai căn hộ giống nhau sẽ có NOI giống nhau dù một người mua bằng tiền mặt còn một người vay 70%."
      },
      {
        "question": "Tỷ lệ đòn bẩy LTV (Loan-to-Value) = 70% khi mua nhà 3 tỷ đồng nghĩa là gì?",
        "options": [
          "Vay ngân hàng 2,1 tỷ, vốn tự có 900 triệu",
          "Ngân hàng cho vay cả 3 tỷ, người mua không cần vốn tự có",
          "Vốn tự có 2,1 tỷ, vay 900 triệu",
          "Vay 2,1 tỷ nhưng phải trả trước 70% ngay trong năm đầu"
        ],
        "correct": 0,
        "explanation": "LTV là tỷ lệ khoản vay trên GIÁ TRỊ tài sản, nên 70% của 3 tỷ là 2,1 tỷ tiền vay và 900 triệu vốn tự có. Lưu ý một cái bẫy thực tế: ngân hàng tính LTV trên giá ĐỊNH GIÁ của họ, thường thấp hơn giá bạn thật sự trả - nên số tiền mặt bạn phải chuẩn bị hầu như luôn nhiều hơn con số 30% trên giấy."
      },
      {
        "question": "Cùng một toà nhà cho NOI 700 triệu/năm. Nếu cap rate thị trường tăng từ 6% lên 7% do lãi suất tăng, giá trị toà nhà thay đổi thế nào?",
        "options": [
          "Giảm khoảng 14%, từ 11,67 tỷ xuống 10 tỷ",
          "Tăng khoảng 14%, vì cap rate cao là tài sản sinh lời tốt hơn",
          "Không đổi, vì NOI giữ nguyên nên giá trị cũng giữ nguyên",
          "Giảm đúng 1%, bằng mức tăng cap rate"
        ],
        "correct": 0,
        "explanation": "Giá trị = NOI / Cap Rate, nên cap rate nằm ở MẪU SỐ và quan hệ là nghịch: 700/0,06 = 11,67 tỷ, còn 700/0,07 = 10 tỷ, tức mất khoảng 14,3%. Đây chính là cơ chế khiến bất động sản cho thuê rớt giá trong chu kỳ lãi suất tăng dù toà nhà vẫn kín khách - nhà đầu tư đòi lợi suất cao hơn vì các kênh khác cũng đã sinh lời tốt hơn."
      },
      {
        "question": "Một căn hộ có cap rate 5%, bạn vay ngân hàng với lãi suất 11%/năm để mua. Điều gì xảy ra với dòng tiền của bạn?",
        "options": [
          "Đòn bẩy âm: dòng tiền hằng tháng âm, phải bù từ nguồn khác",
          "Không ảnh hưởng, vì lãi vay không nằm trong công thức tính NOI",
          "Dòng tiền dương vì đòn bẩy luôn khuếch đại lợi nhuận thu được",
          "Dòng tiền dương vì tiền thuê tăng theo lạm phát"
        ],
        "correct": 0,
        "explanation": "Đòn bẩy chỉ khuếch đại lợi nhuận khi cap rate CAO HƠN lãi vay. Ở đây tài sản sinh 5% trong khi tiền vay tốn 11%, nên mỗi đồng vay thêm là mỗi đồng làm dòng tiền xấu đi - đúng tình huống phổ biến ở Việt Nam nhiều năm nay. Thương vụ chỉ có lãi nếu giá đất tăng đủ bù phần lỗ dòng tiền, và khi đó nó là một khoản đặt cược vào giá, không phải một khoản đầu tư dòng tiền."
      },
      {
        "question": "DSCR = 0,85 cho một bất động sản cho thuê có nghĩa là gì?",
        "options": [
          "NOI chỉ đủ trả 85% nghĩa vụ nợ trong năm",
          "Tài sản sinh lời bằng 85% mức kỳ vọng ban đầu của chủ",
          "Ngân hàng đã cho vay 85% giá trị của bất động sản",
          "Tỷ lệ lấp đầy phòng của toà nhà đạt 85% trong năm"
        ],
        "correct": 0,
        "explanation": "DSCR (Debt Service Coverage Ratio) = NOI / tổng nghĩa vụ trả nợ trong năm. Dưới 1,0 nghĩa là bản thân tài sản không tự nuôi nổi khoản vay của nó. Ngân hàng tài trợ dự án thường đòi tối thiểu 1,2 để có đệm an toàn, và nhà đầu tư cá nhân nên tự áp cùng chuẩn đó - vì khi mất việc hoặc căn hộ trống ba tháng, chính khoảng đệm này quyết định bạn giữ được tài sản hay phải bán tháo."
      }
    ]
  }),

  "dau-tu-trai-phieu-doanh-nghiep-ytm-credit-rating": patch({
    "quiz": [
      {
        "question": "Lợi suất đến ngày đáo hạn YTM (Yield to Maturity) phản ánh điều gì?",
        "options": [
          "Tổng lợi suất nếu giữ tới đáo hạn, gồm coupon và lãi/lỗ vốn",
          "Tỷ lệ tăng giá của trái phiếu trong mười hai tháng gần đây nhất",
          "Lãi suất coupon chia cho giá thị trường của trái phiếu",
          "Mức lãi suất điều hành do ngân hàng trung ương công bố"
        ],
        "correct": 0,
        "explanation": "YTM là tỷ suất chiết khấu làm hiện giá toàn bộ dòng tiền tương lai bằng đúng giá bạn trả hôm nay, nên nó gộp cả coupon lẫn khoản lãi/lỗ vốn khi đáo hạn về mệnh giá. Hai giả định đi kèm cần nhớ: bạn giữ tới đáo hạn, và tái đầu tư mọi coupon đúng bằng mức YTM đó - bán sớm hoặc lãi suất đổi chiều thì lợi suất thực tế sẽ lệch khỏi con số này."
      },
      {
        "question": "Điều khoản covenant 'Debt-to-Equity < 3.0x' trong hợp đồng trái phiếu có mục đích gì?",
        "options": [
          "Ngăn doanh nghiệp vay thêm nợ làm loãng khả năng trả nợ",
          "Bảo đảm doanh nghiệp phải có lãi mọi năm",
          "Quy định coupon sẽ điều chỉnh theo lãi suất thị trường",
          "Ấn định mức cổ tức tối đa doanh nghiệp được phép chia"
        ],
        "correct": 0,
        "explanation": "Covenant không nhằm quản trị hộ doanh nghiệp mà nhằm bảo vệ thứ tự ưu tiên của người đã cho vay trước. Mỗi khoản nợ mới đều chia sẻ cùng một dòng tiền trả nợ, nên trần đòn bẩy giữ cho miếng bánh của bạn không bị cắt nhỏ thêm. Vi phạm covenant thường kích hoạt quyền yêu cầu mua lại trước hạn - công cụ can thiệp sớm duy nhất mà trái chủ có."
      },
      {
        "question": "Một trái phiếu doanh nghiệp có YTM 11,5% trong khi trái phiếu Chính phủ cùng kỳ hạn có lợi suất 4,5%. Credit spread 7% nói lên điều gì?",
        "options": [
          "Thị trường đòi 7 điểm để bù rủi ro vỡ nợ và thanh khoản",
          "Doanh nghiệp này sinh lời cao hơn Chính phủ 7 điểm phần trăm",
          "Trái phiếu này an toàn hơn trái phiếu Chính phủ cùng kỳ hạn",
          "Lạm phát kỳ vọng trong kỳ hạn của trái phiếu là 7% mỗi năm"
        ],
        "correct": 0,
        "explanation": "Spread là giá của rủi ro, không phải phần thưởng cho sự nhạy bén. Quy tắc thô để tự kiểm tra: spread xấp xỉ bằng xác suất vỡ nợ hằng năm nhân tỷ lệ mất vốn khi vỡ nợ. Với spread 7% và giả định mất 60% vốn, thị trường đang ngụ ý xác suất vỡ nợ khoảng 11-12% mỗi năm - tức cứ khoảng chín lô như thế này thì thống kê kỳ vọng có một lô mất khả năng trả nợ trong vòng một năm."
      },
      {
        "question": "Nhà đầu tư nói: 'Tôi giữ trái phiếu đến đáo hạn nên không lo rủi ro'. Nhận định này sai ở đâu?",
        "options": [
          "Nó chỉ triệt tiêu rủi ro lãi suất, không phải rủi ro tín dụng",
          "Nó sai vì trái phiếu doanh nghiệp không có đáo hạn",
          "Nó đúng, giữ tới đáo hạn thì loại bỏ được toàn bộ rủi ro",
          "Nó sai vì coupon của trái phiếu sẽ giảm dần theo thời gian"
        ],
        "correct": 0,
        "explanation": "Hai rủi ro này hành xử hoàn toàn khác nhau theo thời gian. Rủi ro lãi suất là biến động giá trên đường đi - giữ tới đáo hạn thì bạn nhận đủ mệnh giá và biến động đó không còn ý nghĩa. Nhưng rủi ro tín dụng là việc doanh nghiệp không trả được, và giữ lâu hơn chỉ đơn giản là ở lại với rủi ro đó lâu hơn. Đây chính là ngộ nhận đã khiến rất nhiều nhà đầu tư trái phiếu bất động sản Việt Nam mất vốn năm 2022."
      },
      {
        "question": "Trái phiếu riêng lẻ 'ba không' phổ biến ở Việt Nam giai đoạn 2020-2021 nghĩa là gì?",
        "options": [
          "Không xếp hạng, không tài sản đảm bảo tốt, không bảo lãnh",
          "Không niêm yết, không được chuyển nhượng, không được mua lại",
          "Không thuế, không phí phát hành, không ràng buộc covenant",
          "Không có lãi suất cố định, không kỳ hạn, không mệnh giá gốc"
        ],
        "correct": 0,
        "explanation": "Ba chữ 'không' này mô tả đúng ba lớp bảo vệ mà nhà đầu tư trái phiếu bình thường trông cậy vào, và cả ba đều vắng mặt. Không xếp hạng nghĩa là chưa từng có bên độc lập nào thẩm định khả năng trả nợ; tài sản đảm bảo yếu (thường là cổ phiếu của chính công ty phát hành hoặc quyền tài sản từ dự án chưa xong pháp lý) thì mất giá đúng lúc doanh nghiệp gặp khó; không bảo lãnh nghĩa là không có bên thứ ba nào đứng ra trả thay. Nghị định 65/2022 ra đời chính để siết lại nhóm này."
      }
    ]
  }),

  "tai-chinh-khoi-nghiep-cap-table-vc-valuation": patch({
    "quiz": [
      {
        "question": "Hiện tượng pha loãng cổ phần (Equity Dilution) xảy ra khi nào?",
        "options": [
          "Khi công ty phát hành thêm cổ phần mới cho nhà đầu tư",
          "Khi công ty chia cổ tức bằng tiền mặt cho cổ đông hiện hữu",
          "Khi giá cổ phiếu trên thị trường giảm dưới giá phát hành",
          "Khi công ty thua lỗ nhiều quý liên tiếp làm vốn chủ giảm"
        ],
        "correct": 0,
        "explanation": "Pha loãng là chuyện của MẪU SỐ: tổng số cổ phần tăng lên nên phần trăm của bạn nhỏ đi, hoàn toàn không liên quan tới việc công ty lãi hay lỗ. Điểm mấu chốt là pha loãng không đồng nghĩa với thiệt hại - nếu vòng mới định giá cao hơn hẳn, 48% của một công ty 50 triệu USD vẫn hơn xa 80% của một công ty 5 triệu USD."
      },
      {
        "question": "Công cụ đầu tư SAFE (Simple Agreement for Future Equity) có ưu điểm lớn nhất là gì?",
        "options": [
          "Nhận vốn nhanh và hoãn định giá tới vòng gọi vốn sau",
          "Cho nhà đầu tư một ghế trong hội đồng quản trị ngay lập tức",
          "Buộc công ty trả lãi suất cố định hằng năm cho nhà đầu tư",
          "Bảo đảm nhà đầu tư thu hồi vốn gốc nếu công ty thất bại"
        ],
        "correct": 0,
        "explanation": "Ở giai đoạn rất sớm, định giá gần như là phỏng đoán, và tranh cãi về nó có thể làm hỏng một vòng gọi vốn cần diễn ra nhanh. SAFE gỡ nút đó bằng cách nhận tiền ngay và để việc định giá cho vòng sau, khi đã có dữ liệu thật. Đổi lại, nhà đầu tư sớm được bù bằng valuation cap và discount - chính hai điều khoản này quyết định họ nhận bao nhiêu cổ phần lúc chuyển đổi."
      },
      {
        "question": "Term sheet ghi pre-money 4 triệu USD, đầu tư 1 triệu USD, kèm yêu cầu lập option pool 15% ĐẶT TRƯỚC vòng. Điều này có nghĩa gì với nhà sáng lập?",
        "options": [
          "Toàn bộ 15% pool trừ vào cổ đông hiện hữu, tức nhà sáng lập",
          "Pool chia đều giữa nhà sáng lập và nhà đầu tư mới, mỗi bên 7,5%",
          "Pool lấy từ số cổ phần chưa phát hành nên không ai bị pha loãng",
          "Nhà đầu tư phải bỏ thêm tiền ngoài 1 triệu USD để mua pool"
        ],
        "correct": 0,
        "explanation": "Chữ 'trước' (pre-money) là toàn bộ vấn đề: pool được tạo ra trước khi tính định giá, nên nó nằm gọn trong phần 4 triệu và bị trừ vào cổ đông hiện hữu - tức nhà sáng lập - chứ không san sẻ với nhà đầu tư mới. Vì vậy trước khi so sánh hai term sheet, phải quy cả hai về cùng một gốc; nếu không, bạn đang so hai con số không cùng đơn vị đo."
      },
      {
        "question": "Sáng lập khởi đầu 100%. Seed bán 20%, Series A bán 25%, Series B bán 20%. Sáng lập còn lại bao nhiêu?",
        "options": [
          "48% (= 100% × 0,8 × 0,75 × 0,8)",
          "35% (= 100% − 20% − 25% − 20%, trừ thẳng phần trăm)",
          "40% (= 100% × 0,8 × 0,5, nhầm tỷ lệ Series A)",
          "60% (chỉ tính hai vòng đầu là 0,8 × 0,75)"
        ],
        "correct": 0,
        "explanation": "Phải NHÂN DỒN các hệ số chứ không trừ thẳng phần trăm, vì mỗi vòng bán một tỷ lệ của công ty tại thời điểm đó chứ không phải của công ty ban đầu: 100% × 0,8 × 0,75 × 0,8 = 48%. Cách trừ thẳng ra 35% là sai. Và một lần nữa, con số cần nhìn không phải 48% mà là 48% nhân định giá hiện tại bằng bao nhiêu tiền."
      },
      {
        "question": "Khác biệt giữa '1x non-participating' và '1x participating' liquidation preference là gì?",
        "options": [
          "Participating lấy vốn về rồi vẫn chia tiếp, non-participating chọn một",
          "Participating chỉ áp dụng khi công ty IPO, còn non-participating khi bị mua lại",
          "Non-participating nghĩa là nhà đầu tư không được chia gì khi thoái vốn",
          "Participating trả gấp đôi vốn gốc, non-participating trả đúng một lần"
        ],
        "correct": 0,
        "explanation": "Participating cho nhà đầu tư ăn hai lần trên cùng một thương vụ, nên nó lấy đi phần đáng kể của nhà sáng lập, đặc biệt ở các thương vụ thoái vốn quy mô vừa - đúng kịch bản xảy ra thường xuyên nhất trong thực tế. Đây là lý do một term sheet định giá cao kèm 2x participating có thể tệ hơn hẳn một term sheet định giá thấp hơn kèm 1x non-participating, và là lý do phải luôn dựng bảng chia tiền theo kịch bản trước khi ký."
      }
    ]
  }),

  "quan-tri-rui-ro-dinh-luong-var-black-swan": patch({
    "quiz": [
      {
        "question": "Hạn chế LỚN NHẤT của chỉ số Value at Risk (VaR) là gì?",
        "options": [
          "VaR nói lỗ vượt ngưỡng bao nhiêu lần, không nói vượt bao xa",
          "VaR luôn đánh giá quá cao rủi ro nên trói vốn vô ích",
          "VaR quá phức tạp nên ngân hàng phải thuê tư vấn ngoài tính",
          "VaR chỉ áp dụng được cho danh mục cổ phiếu niêm yết"
        ],
        "correct": 0,
        "explanation": "Hai danh mục có thể cùng VaR 200 triệu, nhưng trong ngày tệ nhất một bên mất 250 triệu còn bên kia mất 4 tỷ - VaR chấm chúng cùng điểm. Chính lỗ hổng này khiến Basel III chuyển chuẩn đo rủi ro thị trường sang Expected Shortfall, thước đo trả lời câu hỏi 'khi đã vượt ngưỡng thì trung bình mất bao nhiêu'."
      },
      {
        "question": "Phương pháp Stress Testing trong quản trị rủi ro là gì?",
        "options": [
          "Giả lập kịch bản cực đoan cụ thể, không gắn xác suất",
          "Đo mức độ căng thẳng tâm lý của nhà giao dịch trong phiên",
          "Kiểm tra tốc độ xử lý của hệ thống giao dịch khi tải cao",
          "Tính lại VaR với mức tin cậy cao hơn, chẳng hạn 99,9%"
        ],
        "correct": 0,
        "explanation": "Stress test cố ý BỎ xác suất đi và hỏi một câu khác hẳn VaR: 'nếu kịch bản cụ thể này xảy ra thì mất bao nhiêu'. Điều đó cho phép nhìn thấy những rủi ro chưa từng xuất hiện trong dữ liệu lịch sử - đúng nhóm rủi ro mà VaR mù nhất, và cũng đúng nhóm đã gây ra các cuộc khủng hoảng lớn."
      },
      {
        "question": "Backtesting mô hình VaR 95% trong 250 ngày giao dịch cho thấy có 30 ngày lỗ vượt VaR. Kết luận gì?",
        "options": [
          "Mô hình đánh giá THẤP rủi ro - kỳ vọng chỉ 12-13 ngày",
          "Chưa kết luận được nếu chưa biết lợi nhuận cả năm của danh mục",
          "Mô hình hoạt động tốt vì 30 ngày vẫn dưới ngưỡng 5% cho phép",
          "Mô hình đánh giá quá cao rủi ro nên cần nới ngưỡng ra"
        ],
        "correct": 0,
        "explanation": "VaR 95% theo định nghĩa cho phép khoảng 5% số ngày vượt ngưỡng, tức 12-13 ngày trên 250 ngày giao dịch. Ghi nhận 30 lần vượt nghĩa là mô hình đang đánh giá thấp rủi ro một cách hệ thống và cần hiệu chuẩn lại. Điều ít người để ý: chỉ 2 lần vượt cũng là tín hiệu xấu - mô hình quá thận trọng sẽ trói vốn một cách vô ích."
      },
      {
        "question": "Vì sao mô hình VaR của nhiều ngân hàng lớn thất bại trong khủng hoảng 2008?",
        "options": [
          "Vì mô hình học từ dữ liệu yên ả, tương quan vọt lên gần 1",
          "Vì các ngân hàng không tính lại VaR đủ thường xuyên hằng ngày",
          "Vì công thức toán học của VaR bị chứng minh là sai từ 2007",
          "Vì cơ quan quản lý cấm dùng VaR ngay khi khủng hoảng nổ ra"
        ],
        "correct": 0,
        "explanation": "Bản thân công thức không sai - dữ liệu đầu vào đơn giản chưa từng chứa kịch bản giá nhà toàn nước Mỹ cùng giảm. Đây là bài học cốt lõi: mô hình rủi ro chỉ biết những gì nó đã được cho học. Tệ hơn nữa là tính phản thân - khi mọi tổ chức cùng dùng một mô hình và cùng bị ép cắt lỗ tại một ngưỡng, chính hành vi bán tháo đồng loạt tạo ra cú sập mà mô hình cho là gần như không thể."
      },
      {
        "question": "Reverse stress test khác stress test thông thường ở điểm nào?",
        "options": [
          "Nó hỏi ngược: điều gì phải xảy ra để tổ chức này phá sản?",
          "Nó chỉ áp dụng cho danh mục trái phiếu và tín dụng doanh nghiệp",
          "Nó chạy lại mô hình theo thứ tự thời gian ngược từ cuối lên",
          "Nó tính phần lợi nhuận tiềm năng thay vì tính mức thua lỗ"
        ],
        "correct": 0,
        "explanation": "Stress test thông thường bắt đầu từ kịch bản bạn đã nghĩ ra - nên nó chỉ soi được những rủi ro bạn đã tưởng tượng được. Reverse stress test đi ngược từ kết cục phá sản trở lại nguyên nhân, và chính vì thế nó buộc người ta gọi tên những giả định ngầm chưa ai chất vấn. Trong hầu hết các vụ đổ vỡ lớn, thứ giết chết tổ chức đều nằm trong nhóm giả định không ai nghĩ cần kiểm tra."
      }
    ]
  }),

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
          "Vì doanh nghiệp gửi số liệu khác nhau cho từng tổ chức"
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
  "khung-bao-cao-esg-csrd-sfdr-issb": patch({
    "quiz": [
      {
        "question": "Khái niệm 'double materiality' (tính trọng yếu kép) trong CSRD nghĩa là gì?",
        "options": [
          "Công bố cả hai chiều: tác động lên tài chính và lên xã hội",
          "Doanh nghiệp phải báo cáo theo cả chuẩn EU lẫn chuẩn quốc gia",
          "Báo cáo phải được hai đơn vị kiểm toán độc lập cùng xác nhận",
          "Doanh nghiệp phải báo cáo hai lần mỗi năm thay vì một lần"
        ],
        "correct": 0,
        "explanation": "Double materiality là điểm khác biệt then chốt giữa CSRD của EU và cách tiếp cận của ISSB. Chiều thứ nhất - financial materiality - hỏi: biến đổi khí hậu ảnh hưởng thế nào tới dòng tiền và rủi ro của doanh nghiệp? Chiều thứ hai - impact materiality - hỏi: hoạt động của doanh nghiệp gây tác động gì lên môi trường và xã hội? ISSB chỉ yêu cầu chiều thứ nhất, phục vụ nhà đầu tư. CSRD yêu cầu cả hai, phục vụ cả xã hội."
      },
      {
        "question": "Phát thải Scope 1, Scope 2 và Scope 3 khác nhau thế nào?",
        "options": [
          "Scope 1 trực tiếp, Scope 2 từ năng lượng mua, Scope 3 chuỗi giá trị",
          "Scope 1 nhỏ, Scope 2 trung bình, Scope 3 lớn - phân loại theo khối lượng",
          "Ba mức độ chính xác của phép đo, từ ước lượng thô tới đo trực tiếp",
          "Scope 1 cho sản xuất, Scope 2 cho dịch vụ, Scope 3 cho tài chính"
        ],
        "correct": 0,
        "explanation": "Đây là phân loại theo GHG Protocol, chuẩn nền tảng của mọi khung báo cáo. Scope 1: đốt nhiên liệu tại nhà máy, xe của công ty. Scope 2: điện, hơi nước, làm mát mua từ bên ngoài. Scope 3: nguyên vật liệu đầu vào, vận chuyển, đi lại của nhân viên, và cả việc khách hàng sử dụng sản phẩm. Với hầu hết doanh nghiệp, Scope 3 chiếm phần lớn tổng phát thải nhưng lại khó đo nhất - đây là điểm nghẽn thực tế của mọi chương trình ESG."
      },
      {
        "question": "SFDR phân loại quỹ đầu tư theo Điều 6, Điều 8 và Điều 9. Điều 9 nghĩa là gì?",
        "options": [
          "Quỹ lấy đầu tư bền vững làm mục tiêu chính - mức 'dark green'",
          "Quỹ có thúc đẩy đặc tính môi trường nhưng đó không phải mục tiêu",
          "Quỹ bị cấm phân phối cho nhà đầu tư cá nhân trong khối EU",
          "Quỹ chỉ được phép đầu tư vào trái phiếu chính phủ xanh"
        ],
        "correct": 0,
        "explanation": "SFDR (Sustainable Finance Disclosure Regulation) phân ba mức: Điều 6 - quỹ thông thường, không đưa yếu tố bền vững vào quy trình; Điều 8 - quỹ 'light green', có thúc đẩy đặc tính môi trường hoặc xã hội nhưng không phải mục tiêu chính; Điều 9 - quỹ 'dark green', đầu tư bền vững là mục tiêu. Đáng chú ý là sau khi quy định siết chặt, nhiều quỹ đã tự hạ cấp từ Điều 9 xuống Điều 8 vì không đáp ứng nổi tiêu chuẩn chứng minh - một bài học về khoảng cách giữa marketing và thực chất."
      }
    ,
    {
      "question": "Vì sao một doanh nghiệp Việt Nam không thuộc phạm vi điều chỉnh của CSRD vẫn có thể bị yêu cầu báo cáo phát thải?",
      "options": [
        "Vì khách hàng EU cần số liệu đó để hoàn thành phần Scope 3 của chính họ",
        "Vì CSRD áp dụng trực tiếp cho mọi doanh nghiệp có hoạt động xuất khẩu sang EU",
        "Vì cơ quan quản lý Việt Nam đã nội luật hóa toàn bộ nội dung của CSRD",
        "Vì doanh nghiệp không báo cáo sẽ bị EU áp thuế carbon ở mức cao nhất"
      ],
      "correct": 0,
      "explanation": "Phát thải chuỗi cung ứng của khách hàng chính là phát thải trực tiếp của nhà cung cấp. Nghĩa vụ pháp lý dừng ở biên giới EU, nhưng yêu cầu dữ liệu thì đi tiếp xuống chuỗi qua hợp đồng thương mại - đây là cách quy định EU lan ra ngoài phạm vi của nó."
    },
    {
      "question": "Quỹ được phân loại theo Điều 8 của SFDR khác Điều 9 ở điểm nào?",
      "options": [
        "Điều 8 chỉ quảng bá đặc tính bền vững, Điều 9 lấy đầu tư bền vững làm mục tiêu",
        "Điều 8 áp dụng cho quỹ mở còn Điều 9 áp dụng cho quỹ đóng và quỹ tư nhân",
        "Điều 8 yêu cầu công bố nhiều dữ liệu hơn Điều 9 vì phạm vi đầu tư rộng hơn",
        "Điều 8 dành cho quỹ đầu tư trong EU còn Điều 9 dành cho quỹ đầu tư ngoài EU"
      ],
      "correct": 0,
      "explanation": "Điều 9 là nhóm chặt nhất: mục tiêu đầu tư phải là bền vững, kèm nghĩa vụ chứng minh. Điều 8 chỉ cần quảng bá đặc tính môi trường hoặc xã hội. Khoảng cách giữa hai nhóm chính là chỗ rủi ro tẩy xanh dễ nảy sinh nhất."
    }
    ]
  }),

  "rui-ro-khi-hau-nhu-rui-ro-tai-chinh": patch({
    "quiz": [
      {
        "question": "Rủi ro vật lý (physical risk) được chia thành hai loại nào?",
        "options": [
          "Cấp tính (bão, lũ) và mãn tính (nước biển dâng, nhiệt độ)",
          "Rủi ro với tài sản hữu hình và rủi ro với các tài sản vô hình",
          "Rủi ro trong phạm vi quốc gia và rủi ro xuyên biên giới",
          "Rủi ro đã được bảo hiểm và rủi ro chưa được bảo hiểm"
        ],
        "correct": 0,
        "explanation": "Rủi ro cấp tính là các sự kiện rời rạc, tần suất và cường độ đang tăng - một trận lũ làm ngập nhà máy. Rủi ro mãn tính là dịch chuyển từ từ nhưng không đảo ngược - nước biển dâng làm một khu công nghiệp ven biển mất giá trị dần qua nhiều thập kỷ. Hai loại này đòi hỏi cách mô hình hóa khác nhau: cấp tính hợp với phân tích xác suất và bảo hiểm, mãn tính hợp với phân tích kịch bản dài hạn."
      },
      {
        "question": "Vì sao rủi ro chuyển đổi (transition risk) có thể xuất hiện đột ngột dù quá trình chuyển đổi diễn ra chậm?",
        "options": [
          "Vì thị trường định giá lại ngay theo kỳ vọng chính sách",
          "Vì công nghệ sạch mới luôn xuất hiện một cách hoàn toàn bất ngờ",
          "Rủi ro chuyển đổi không bao giờ đột ngột, nó luôn diễn ra từ từ",
          "Vì các cơ quan quản lý luôn ban hành quy định không báo trước"
        ],
        "correct": 0,
        "explanation": "Đây là điểm quan trọng nhất khi đánh giá rủi ro khí hậu về mặt tài chính. Tài sản được định giá theo dòng tiền tương lai kỳ vọng. Khi thị trường thay đổi kỳ vọng về chính sách carbon hay tốc độ áp dụng công nghệ sạch, giá điều chỉnh ngay chứ không chờ tác động vật lý. Ngân hàng Anh gọi rủi ro này là 'khoảnh khắc Minsky khí hậu' - khả năng thị trường định giá lại đột ngột và đồng loạt."
      },
      {
        "question": "Phân tích kịch bản khí hậu (climate scenario analysis) khác gì với dự báo thông thường?",
        "options": [
          "Nó kiểm tra sức chống chịu qua nhiều tương lai, không dự đoán một",
          "Không khác gì dự báo, chỉ là một tên gọi khác",
          "Nó dựa hoàn toàn vào dữ liệu quá khứ để ngoại suy về tương lai",
          "Nó chỉ áp dụng được cho doanh nghiệp trong ngành năng lượng"
        ],
        "correct": 0,
        "explanation": "Điểm mấu chốt là dữ liệu quá khứ vô dụng ở đây - chưa từng có tiền lệ để ngoại suy. Phân tích kịch bản thay vào đó hỏi: nếu thế giới đi theo đường A thì doanh nghiệp ra sao, đường B thì thế nào? Nghịch lý thú vị là hai kịch bản gây thiệt hại theo hai cách trái ngược: chuyển đổi nhanh gây rủi ro chuyển đổi cao nhưng rủi ro vật lý thấp; chuyển đổi chậm thì ngược lại. Doanh nghiệp phải chịu đựng được cả hai."
      }
    ,
    {
      "question": "Tài sản mắc kẹt (stranded asset) trong bối cảnh rủi ro khí hậu là gì?",
      "options": [
        "Tài sản mất phần lớn giá trị trước khi hết vòng đời kinh tế dự kiến",
        "Tài sản nằm ở khu vực có nguy cơ ngập lụt nên không thể chuyển nhượng",
        "Tài sản đã khấu hao hết nhưng doanh nghiệp vẫn tiếp tục sử dụng để sản xuất",
        "Tài sản mà doanh nghiệp không thể bán vì đang được dùng làm tài sản bảo đảm"
      ],
      "correct": 0,
      "explanation": "Mỏ than và nhà máy nhiệt điện được định giá theo giả định vận hành hết vòng đời. Thuế carbon, quy định mới hoặc điện tái tạo rẻ hơn có thể kết thúc vòng đời đó sớm, và phần giá trị còn lại trên sổ sách bốc hơi."
    },
    {
      "question": "Vì sao chuyển đổi diễn ra dần dần vẫn có thể gây cú sốc định giá đột ngột?",
      "options": [
        "Vì thị trường định giá lại một lần khi kỳ vọng đổi chiều, không đổi dần theo",
        "Vì các quy định về khí hậu luôn có hiệu lực ngay lập tức khi được ban hành",
        "Vì doanh nghiệp không công bố thông tin phát thải cho tới khi bị bắt buộc",
        "Vì tác động vật lý của biến đổi khí hậu xảy ra nhanh hơn dự báo khoa học"
      ],
      "correct": 0,
      "explanation": "Giá tài sản phản ánh kỳ vọng về tương lai, và kỳ vọng thì dịch chuyển theo bậc: một quyết định chính sách, một mốc chi phí công nghệ bị vượt qua. Quá trình vật lý chậm, còn việc thị trường thừa nhận nó thì diễn ra trong vài phiên."
    }
    ]
  }),

  "esg-trong-dinh-gia-doanh-nghiep": patch({
    "quiz": [
      {
        "question": "Bằng chứng thực nghiệm về mối quan hệ giữa ESG và hiệu quả tài chính nói gì?",
        "options": [
          "Không đồng nhất; bằng chứng mạnh nhất nằm ở chiều giảm rủi ro",
          "ESG không có bất kỳ liên hệ nào với kết quả tài chính doanh nghiệp",
          "Điểm ESG cao luôn dẫn tới lợi nhuận cổ phiếu vượt trội thị trường",
          "Điểm ESG cao luôn làm giảm lợi nhuận vì tốn chi phí tuân thủ"
        ],
        "correct": 0,
        "explanation": "Đây là điểm cần trung thực. Hàng nghìn nghiên cứu cho kết quả trái chiều, một phần vì các bảng xếp hạng ESG mâu thuẫn nhau nên chính biến số đầu vào đã không đáng tin. Phát hiện nhất quán nhất là ở chiều giảm rủi ro đuôi: doanh nghiệp có quản trị tốt ít gặp bê bối, kiện tụng, tai nạn môi trường - những sự kiện gây mất giá trị đột ngột. Trụ cột G có bằng chứng mạnh nhất, E và S yếu và phụ thuộc ngành hơn."
      },
      {
        "question": "Khi nào việc điều chỉnh chi phí vốn (WACC) vì yếu tố ESG là hợp lý?",
        "options": [
          "Chỉ khi rủi ro đó không đa dạng hóa được hoặc quan sát được",
          "Luôn luôn - mọi doanh nghiệp ESG kém đều nên bị áp WACC cao hơn",
          "Không bao giờ - WACC chỉ phụ thuộc vào cấu trúc vốn của công ty",
          "Chỉ với doanh nghiệp thuộc ngành năng lượng và khai khoáng"
        ],
        "correct": 0,
        "explanation": "Nguyên tắc tài chính chuẩn: rủi ro đặc thù (idiosyncratic) có thể đa dạng hóa nên về lý thuyết không được đền bù bằng chi phí vốn cao hơn - nó thuộc về kịch bản dòng tiền. Chỉ rủi ro hệ thống mới thuộc về chi phí vốn. Tuy nhiên có ngoại lệ thực tế: nếu quan sát được doanh nghiệp thực sự phải trả lãi suất cao hơn hoặc bị nhóm nhà đầu tư lớn loại trừ, thì đó là chi phí vốn quan sát được chứ không phải giả định."
      },
      {
        "question": "Vì sao điểm ESG từ các nhà cung cấp khác nhau lại mâu thuẫn với nhau?",
        "options": [
          "Vì khác nhau ở chọn chỉ số, cách đo và trọng số từng chỉ số",
          "Vì mỗi nhà cung cấp chỉ đánh giá một trụ cột ESG",
          "Vì một số nhà cung cấp cố tình chấm sai để bán dịch vụ tư vấn",
          "Vì dữ liệu doanh nghiệp công bố luôn sai lệch so với thực tế"
        ],
        "correct": 0,
        "explanation": "Nghiên cứu học thuật cho thấy tương quan giữa điểm ESG của các nhà cung cấp lớn chỉ khoảng 0,4-0,6 - thấp hơn nhiều so với tương quan gần như hoàn hảo giữa các tổ chức xếp hạng tín nhiệm. Nguyên nhân được phân rã thành ba nguồn: phạm vi (đo cái gì), đo lường (đo thế nào), và trọng số (cái nào quan trọng hơn). Hệ quả thực tế: đừng dùng điểm ESG tổng hợp làm đầu vào mô hình, hãy nhìn vào các chỉ số cụ thể trọng yếu với ngành đó."
      }
    ,
    {
      "question": "Cách chặt chẽ nhất để đưa một rủi ro ESG cụ thể vào mô hình định giá là gì?",
      "options": [
        "Cho nó chạy qua một biến số cụ thể của dòng tiền hoặc của chi phí vốn",
        "Cộng thêm một điểm phần trăm vào WACC theo mức điểm ESG tổng hợp của doanh nghiệp",
        "Chiết khấu giá trị doanh nghiệp cuối cùng theo tỷ lệ tương ứng với xếp hạng ESG",
        "Loại doanh nghiệp có điểm ESG thấp ra khỏi danh mục thay vì điều chỉnh mô hình"
      ],
      "correct": 0,
      "explanation": "Rủi ro ESG chỉ có ý nghĩa tài chính khi nó chạm vào doanh thu, chi phí, vốn đầu tư hay rủi ro dòng tiền - nên mỗi điều chỉnh phải nêu được cơ chế và con số. Cộng thêm một mức tùy tiện vào WACC nghe có vẻ chặt chẽ nhưng thực chất là con số không kiểm chứng được."
    },
    {
      "question": "Vì sao điểm ESG của các tổ chức xếp hạng khác nhau lại tương quan với nhau khá thấp?",
      "options": [
        "Vì mỗi tổ chức tự chọn tiêu chí, trọng số và cách đo lường khác nhau",
        "Vì các tổ chức xếp hạng cố ý giữ khác biệt để bảo vệ lợi thế thương mại của mình",
        "Vì doanh nghiệp cung cấp số liệu khác nhau cho mỗi tổ chức xếp hạng ESG",
        "Vì phần lớn tổ chức xếp hạng chỉ đánh giá trụ cột môi trường mà bỏ qua hai trụ cột kia"
      ],
      "correct": 0,
      "explanation": "Xếp hạng tín nhiệm đo một thứ đã định nghĩa rõ - khả năng trả nợ. ESG thì chưa có định nghĩa chung, nên mỗi bên tự chọn đo cái gì và nặng bao nhiêu. Hệ quả thực dụng: dùng dữ liệu thành phần để tự phân tích, đừng dùng điểm tổng hợp như một sự thật."
    }
    ]
  }),

  "quan-tri-doanh-nghiep-g-trong-esg": patch({
    "quiz": [
      {
        "question": "Thành viên hội đồng quản trị 'độc lập' theo chuẩn quản trị tốt nghĩa là gì?",
        "options": [
          "Người không có quan hệ vật chất với công ty ngoài ghế HĐQT",
          "Người được nhóm cổ đông lớn nhất đề cử vào hội đồng",
          "Người không sở hữu bất kỳ cổ phiếu nào của chính công ty đó",
          "Người có kinh nghiệm trong ngành ít nhất mười năm liên tục"
        ],
        "correct": 0,
        "explanation": "Bản chất của tính độc lập là khả năng nói không. Một thành viên HĐQT phụ thuộc vào công ty về thu nhập, hợp đồng kinh doanh, hay quan hệ gia đình sẽ khó phản đối một đề xuất tồi từ ban điều hành. Điểm quan trọng khi phân tích: đừng chỉ đếm số thành viên được gắn nhãn 'độc lập' trong báo cáo thường niên, hãy đọc tiểu sử để xem họ có thực sự độc lập hay không - đây là chỗ hình thức và thực chất hay lệch nhau nhất."
      },
      {
        "question": "Vấn đề người đại diện (agency problem) trong quản trị doanh nghiệp là gì?",
        "options": [
          "Xung đột khi người điều hành không phải người sở hữu",
          "Doanh nghiệp thuê quá nhiều đại lý bán hàng làm tăng chi phí",
          "Việc công ty phải trả phí cho các đơn vị trung gian tài chính",
          "Tranh chấp giữa công ty và các đại lý phân phối sản phẩm"
        ],
        "correct": 0,
        "explanation": "Agency problem là nền tảng lý thuyết của toàn bộ ngành quản trị doanh nghiệp. Khi quyền sở hữu tách khỏi quyền quản lý, người quản lý có thông tin nhiều hơn và động cơ khác với chủ sở hữu. Các cơ chế quản trị - HĐQT độc lập, thù lao gắn với hiệu quả dài hạn, kiểm toán độc lập, quyền biểu quyết của cổ đông - đều là công cụ để thu hẹp khoảng cách đó. Ở thị trường có cổ đông kiểm soát tập trung, dạng xung đột chính lại chuyển thành cổ đông lớn với cổ đông thiểu số."
      },
      {
        "question": "Vì sao giao dịch với bên liên quan (related-party transactions) là dấu hiệu cần đặc biệt chú ý?",
        "options": [
          "Vì giá có thể lệch thị trường, chuyển giá trị ra ngoài công ty",
          "Vì mọi giao dịch với bên liên quan đều bị pháp luật hiện hành cấm",
          "Vì chúng không được ghi nhận trong báo cáo tài chính hợp nhất",
          "Vì chúng luôn làm tăng chi phí kiểm toán độc lập hằng năm"
        ],
        "correct": 0,
        "explanation": "Giao dịch bên liên quan không phải lúc nào cũng xấu - nhiều tập đoàn có lý do vận hành chính đáng. Vấn đề là chúng thiếu cơ chế thị trường để kiểm chứng giá. Nếu công ty niêm yết mua nguyên liệu từ công ty riêng của chủ tịch với giá cao hơn thị trường, giá trị chảy ra ngoài mà mọi thứ vẫn hợp pháp và được thuyết minh đầy đủ. Vì thế cần đọc kỹ thuyết minh về bên liên quan, xem quy mô so với doanh thu và xu hướng qua các năm."
      }
    ,
    {
      "question": "Cấu trúc cổ phiếu hai hạng (dual-class shares) tạo ra rủi ro quản trị nào?",
      "options": [
        "Nhóm nắm quyền biểu quyết vượt xa tỷ lệ vốn mà họ thực sự góp vào công ty",
        "Cổ đông nhỏ không được nhận cổ tức ngang với nhóm cổ đông sáng lập",
        "Doanh nghiệp không được phép phát hành thêm cổ phiếu cho nhà đầu tư mới",
        "Toàn bộ thành viên hội đồng quản trị buộc phải là người nội bộ công ty"
      ],
      "correct": 0,
      "explanation": "Quyền biểu quyết tách khỏi quyền lợi kinh tế: người quyết định không phải người chịu phần lớn hậu quả tài chính. Nó giúp ban lãnh đạo theo đuổi tầm nhìn dài hạn mà không sợ áp lực ngắn hạn, nhưng cũng khiến cổ đông gần như không có cách sửa sai."
    },
    {
      "question": "Vì sao giao dịch với bên liên quan là điểm cần soi kỹ khi phân tích một doanh nghiệp?",
      "options": [
        "Vì đây là kênh dễ nhất để chuyển giá trị ra khỏi tay cổ đông thiểu số",
        "Vì luật doanh nghiệp cấm hoàn toàn mọi giao dịch giữa công ty và bên liên quan",
        "Vì các giao dịch này luôn được ghi nhận ngoài báo cáo tài chính hợp nhất",
        "Vì chúng làm tăng chi phí kiểm toán và kéo dài thời gian phát hành báo cáo"
      ],
      "correct": 0,
      "explanation": "Bán rẻ cho công ty của người nhà, thuê tài sản với giá cao, cho vay không lãi - mỗi giao dịch đều có thể hợp pháp và được thuyết minh đầy đủ, nhưng tổng lại là dòng giá trị rời khỏi công ty đại chúng. Điều cần kiểm tra là quy mô, tần suất và điều kiện giá."
    }
    ]
  }),


  "modern-portfolio-theory": patch({
    "quiz": [
      {
        "question": "Lợi ích cốt lõi của đa dạng hóa theo MPT là gì?",
        "options": [
          "Giảm rủi ro danh mục mà không phải hy sinh lợi nhuận",
          "Tăng rủi ro lên để đổi lấy thêm phần phí quản lý cao hơn",
          "Chỉ phù hợp với các quỹ đầu tư quy mô lớn",
          "Xóa sạch mọi rủi ro trong danh mục đầu tư"
        ],
        "correct": 0,
        "explanation": "Điểm mấu chốt của MPT là ghép các tài sản ít tương quan làm biến động của cả danh mục nhỏ hơn trung bình biến động từng phần, trong khi lợi nhuận kỳ vọng vẫn là trung bình có trọng số - nên rủi ro giảm mà không phải đánh đổi. Nó không xóa sạch rủi ro: phần rủi ro hệ thống của cả thị trường thì đa dạng hóa không chạm tới. Và cơ chế này áp dụng cho danh mục ở mọi quy mô, không riêng quỹ lớn."
      },
      {
        "question": "Nếu hai tài sản có correlation thấp, điều gì xảy ra với danh mục?",
        "options": [
          "Danh mục chắc chắn lỗ vì hai tài sản triệt tiêu nhau",
          "Biến động danh mục có thể thấp hơn từng tài sản riêng",
          "Biến động danh mục không thay đổi so với trước khi ghép",
          "Danh mục bắt buộc phải vay thêm để cân bằng tỷ trọng"
        ],
        "correct": 1,
        "explanation": "Tương quan thấp nghĩa là hai tài sản ít khi cùng giảm một lúc, nên những nhịp xấu của cái này được cái kia bù bớt và biến động của danh mục có thể thấp hơn cả hai tài sản đứng riêng. Nó không làm danh mục lỗ - lợi nhuận kỳ vọng vẫn là trung bình có trọng số của hai phần. Nếu biến động không đổi thì ghép đã chẳng có tác dụng gì, và chuyện vay thêm để cân tỷ trọng là một quyết định khác hẳn."
      },
      {
        "question": "Đóng góp cốt lõi của Modern Portfolio Theory là gì?",
        "options": [
          "Rủi ro của danh mục phụ thuộc tương quan giữa các tài sản, không chỉ từng tài sản",
          "Danh mục có lợi nhuận cao nhất luôn là danh mục tối ưu cho mọi nhà đầu tư",
          "Tài sản có độ biến động thấp nhất luôn nên chiếm tỷ trọng lớn nhất",
          "Số lượng tài sản trong danh mục quyết định toàn bộ mức rủi ro phải chịu"
        ],
        "correct": 0,
        "explanation": "Trước Markowitz, người ta chọn từng khoản đầu tư riêng lẻ. Ý tưởng đột phá là một tài sản rủi ro cao vẫn có thể làm giảm rủi ro tổng thể nếu nó biến động ngược chiều với phần còn lại."
      },
      {
        "question": "Đường biên hiệu quả (efficient frontier) biểu diễn điều gì?",
        "options": [
          "Tập hợp danh mục có lợi nhuận cao nhất ứng với từng mức rủi ro cho trước",
          "Mức lợi nhuận tối đa mà thị trường có thể tạo ra trong một năm",
          "Ranh giới giữa nhóm tài sản an toàn và nhóm tài sản rủi ro cao",
          "Đường biểu diễn giá của một tài sản qua các giai đoạn của chu kỳ"
        ],
        "correct": 0,
        "explanation": "Mọi danh mục nằm dưới đường này đều kém tối ưu: có một danh mục khác cho lợi nhuận cao hơn ở cùng mức rủi ro. Mục tiêu không phải đạt lợi nhuận cao nhất mà là không đứng dưới đường đó."
      },
      {
        "question": "Hạn chế lớn nhất của Modern Portfolio Theory trong thực tế là gì?",
        "options": [
          "Tương quan giữa các tài sản tăng vọt đúng lúc khủng hoảng, khi cần nhất",
          "Lý thuyết này chỉ áp dụng được cho danh mục có trên một trăm tài sản",
          "Không thể tính được độ biến động của bất kỳ tài sản nào trong thực tế",
          "Lý thuyết yêu cầu nhà đầu tư phải nắm giữ toàn bộ tài sản trên thị trường"
        ],
        "correct": 0,
        "explanation": "Đa dạng hóa hoạt động tốt trong điều kiện bình thường và yếu đi đúng lúc thị trường sụp - khi mọi thứ cùng bị bán tháo. Đây là lời phê bình chính sau mỗi cuộc khủng hoảng lớn."
      },
      {
        "question": "Vì sao MPT vẫn có giá trị dù bị phê bình nhiều?",
        "options": [
          "Vì nó đưa ra khung tư duy đúng: đánh giá tài sản trong bối cảnh cả danh mục",
          "Vì các giả định của nó đã được chứng minh là đúng trong mọi điều kiện",
          "Vì nó cho phép dự đoán chính xác lợi suất của danh mục trong tương lai",
          "Vì mọi quỹ đầu tư đều bị pháp luật yêu cầu phải áp dụng lý thuyết này"
        ],
        "correct": 0,
        "explanation": "Các con số đầu vào có thể sai, nhưng câu hỏi mà MPT dạy người ta hỏi thì vẫn đúng: tài sản này ảnh hưởng thế nào tới rủi ro của toàn bộ danh mục, chứ không phải nó tốt hay xấu khi đứng một mình."
      }
    ],
  }),
  "fpa-la-gi-vai-tro-doanh-nghiep": patch({
    "quiz": [
      {
        "question": "Vai trò chính của FP&A là gì?",
        "options": [
          "Lập báo cáo tài chính theo chuẩn mực kế toán",
          "Lập ngân sách, dự báo, phân tích chênh lệch",
          "Quản lý dòng tiền và thanh khoản hàng ngày",
          "Kê khai thuế và làm việc với cơ quan thuế"
        ],
        "correct": 1,
        "explanation": "FP&A tập trung vào lập kế hoạch tương lai, không phải ghi chép quá khứ như kế toán. Vai trò chính là chuẩn bị thông tin để CEO ra quyết định chiến lược."
      },
      {
        "question": "Variance Analysis (phân tích chênh lệch) trong FP&A là gì?",
        "options": [
          "So sánh giá cổ phiếu giữa các công ty cùng ngành",
          "So sánh thực tế với kế hoạch, tìm nguyên nhân",
          "Đo lường mức rủi ro của một danh mục đầu tư",
          "Tính chi phí lãi vay phải trả trong kỳ kế hoạch"
        ],
        "correct": 1,
        "explanation": "Variance Analysis giúp hiểu: kế hoạch dự báo 100M lợi nhuận, nhưng thực tế 80M → chênh lệch 20M. Tại sao? Là do doanh thu thấp hơn, hay chi phí cao hơn? Từ đó điều chỉnh kế hoạch lần tới."
      },
      {
        "question": "Rolling Forecast là gì?",
        "options": [
          "Dự báo một lần đầu năm rồi giữ nguyên đến hết năm",
          "Dự báo luôn nhìn 12 tháng tới, cập nhật hàng tháng",
          "Dự báo chỉ dựa trên dữ liệu lịch sử của các năm trước",
          "Dự báo do kiểm toán độc lập lập lại vào cuối mỗi quý"
        ],
        "correct": 1,
        "explanation": "Rolling Forecast giữ horizon dự báo luôn là 12 tháng phía trước. Tháng 1 dự báo tháng 1-12, tháng 2 dự báo tháng 2-13, v.v. Điều này giúp kế hoạch luôn linh hoạt và không bị 'cũ' khi đến cuối năm."
      },
      {
        "question": "Khác biệt cốt lõi giữa kế toán và bộ phận lập kế hoạch - phân tích tài chính là gì?",
        "options": [
          "Kế toán làm việc với những con số lớn hơn nhiều",
          "Kế toán ghi quá khứ, FP&A ước tương lai",
          "FP&A không cần đọc hiểu báo cáo tài chính",
          "Kế toán chỉ làm việc vào kỳ khóa sổ cuối năm"
        ],
        "correct": 1,
        "explanation": "Hai chức năng có tiêu chuẩn thành công khác nhau: một bên là chính xác và tuân thủ, một bên là hữu ích và kịp thời cho việc ra quyết định."
      },
      {
        "question": "Vì sao một bản phân tích chính xác tuyệt đối vẫn có thể không tạo ra giá trị?",
        "options": [
          "Vì độ chính xác cao luôn tốn quá nhiều thời gian",
          "Vì nó không dẫn tới quyết định hay hành động nào",
          "Vì ban lãnh đạo thường không đọc báo cáo tài chính",
          "Vì mọi dự báo đều sai nên độ chính xác không quan trọng"
        ],
        "correct": 1,
        "explanation": "Giá trị của phân tích nằm ở chỗ nó thay đổi được hành động. Đó là lý do khả năng diễn giải và đề xuất quan trọng không kém khả năng dựng mô hình."
      }
    ]
  }),
  "aml-kyc-la-gi": patch({
    "quiz": [
      {
        "question": "Khác biệt cơ bản giữa AML (phòng chống rửa tiền) và KYC (nhận biết khách hàng) là gì?",
        "options": [
          "Hai thuật ngữ đồng nghĩa, chỉ khác cách gọi",
          "AML là mục tiêu tổng thể, KYC là một cấu phần trong đó",
          "KYC dành cho khách hàng cá nhân, AML cho khách hàng doanh nghiệp",
          "AML là việc của cơ quan điều tra, KYC là việc của ngân hàng"
        ],
        "correct": 1,
        "explanation": "AML là mục tiêu và cả hệ thống kiểm soát nhằm ngăn tổ chức tài chính bị dùng làm kênh hợp pháp hóa tiền bất hợp pháp. KYC là nền móng của hệ thống đó: nếu không biết rõ khách hàng là ai, làm nghề gì, nguồn tiền từ đâu, thì không có cơ sở nào để nói một giao dịch là bất thường."
      },
      {
        "question": "Ba giai đoạn kinh điển của quá trình rửa tiền theo thứ tự là gì?",
        "options": [
          "Đầu tư - vay vốn - trả nợ",
          "Sắp xếp - phân tán - hợp nhất vào nền kinh tế",
          "Gửi tiết kiệm - nhận lãi định kỳ - rút gốc khi đáo hạn",
          "Mở tài khoản - nộp thuế - chuyển tiền ra nước ngoài"
        ],
        "correct": 1,
        "explanation": "Ba giai đoạn này là khung tư duy nền tảng: giai đoạn sắp xếp dễ bị phát hiện nhất vì tiền mặt phải tiếp xúc với hệ thống, nên tội phạm bỏ nhiều công vào giai đoạn phân tán để cắt đứt liên hệ giữa tiền và nguồn gốc phạm tội. Hiểu ba giai đoạn giúp chuyên viên tuân thủ biết loại dấu hiệu nào cần tìm ở đâu."
      },
      {
        "question": "Vì sao KYC không thể chỉ là một thủ tục làm một lần vào thời điểm mở tài khoản?",
        "options": [
          "Vì giấy tờ tùy thân chỉ cần gia hạn định kỳ",
          "Vì quy định buộc khách hàng đến quầy giao dịch mỗi năm một lần",
          "Vì hoàn cảnh và hành vi khách hàng thay đổi theo thời gian",
          "Vì ngân hàng muốn thêm cơ hội bán chéo sản phẩm cho khách hàng"
        ],
        "correct": 2,
        "explanation": "Nếu chân dung khách hàng đóng băng ở thời điểm mở tài khoản, mọi so sánh về sau đều vô nghĩa. Đây là lý do khuôn khổ tuân thủ đòi hỏi cập nhật thông tin định kỳ, với tần suất dày hơn cho nhóm khách hàng rủi ro cao."
      },
      {
        "question": "Nhóm khách hàng nào thường được xếp vào diện phải áp dụng biện pháp nhận biết tăng cường (Enhanced Due Diligence)?",
        "options": [
          "PEP, khách từ quốc gia rủi ro cao, sở hữu bị che nhiều lớp",
          "Mọi khách hàng có số dư tài khoản vượt một ngưỡng nhất định",
          "Chỉ khách hàng từng bị ngân hàng khác từ chối mở tài khoản",
          "Khách hàng dưới 25 tuổi vì chưa có lịch sử tín dụng nào"
        ],
        "correct": 0,
        "explanation": "Tiêu chí xếp loại rủi ro cao không dựa trên số dư mà dựa trên khả năng bị lạm dụng: quyền lực chính trị có thể đi kèm rủi ro tham nhũng, cấu trúc sở hữu nhiều lớp che giấu người thụ hưởng thật, còn mô hình nhiều tiền mặt khiến việc truy nguồn gốc trở nên khó khăn."
      },
      {
        "question": "Scenario: Một khoản tiền mặt lớn được chia nhỏ nộp vào nhiều tài khoản rồi chuyển lòng vòng qua nhiều quốc gia. Đây là giai đoạn nào của quá trình rửa tiền?",
        "options": [
          "Phân tán, nhằm cắt đứt dấu vết nguồn gốc",
          "Sắp xếp, khi tiền mặt lần đầu vào hệ thống",
          "Hợp nhất, khi tiền quay lại dưới vỏ hợp pháp",
          "Không thuộc giai đoạn nào trong ba giai đoạn"
        ],
        "correct": 0,
        "explanation": "Sắp xếp là bước đưa tiền mặt vào hệ thống, đã xong trước đó. Phân tán là chuỗi giao dịch nhiều lớp qua nhiều pháp nhân và nhiều nước, cốt để không ai lần ngược được về nguồn - và cũng là giai đoạn để lại nhiều dấu vết nhất trong dữ liệu giao dịch."
      }
    ]
  }),
  "aml-kyc-quy-trinh-chi-tiet": patch({
    "quiz": [
      {
        "question": "Sàng lọc danh sách (screening) trong quy trình nhận biết khách hàng nhằm mục đích gì?",
        "options": [
          "Kiểm tra khách hàng có đủ điều kiện được cấp hạn mức vay không",
          "Chấm điểm mức hài lòng của khách",
          "Đối chiếu khách hàng với danh sách cấm vận và PEP",
          "Xác định phân khúc để phân công nhân viên bán hàng phù hợp"
        ],
        "correct": 2,
        "explanation": "Sàng lọc là bước bắt buộc và phải được thực hiện lặp lại, vì các danh sách cấm vận được cập nhật liên tục - một khách hàng hợp lệ hôm nay có thể xuất hiện trên danh sách vào tháng sau, và nghĩa vụ của tổ chức tài chính là phát hiện được sự thay đổi đó."
      },
      {
        "question": "Sự khác nhau giữa báo cáo giao dịch có giá trị lớn và báo cáo giao dịch đáng ngờ là gì?",
        "options": [
          "Hai loại giống nhau, chỉ khác tên gọi theo từng ngân hàng",
          "Báo cáo giá trị lớn do khách tự khai, báo cáo đáng ngờ do ngân hàng",
          "Báo cáo đáng ngờ chỉ áp dụng với khách hàng là người nước ngoài",
          "Một bên dựa trên ngưỡng số tiền, một bên dựa trên đánh giá"
        ],
        "correct": 3,
        "explanation": "Đây là điểm mấu chốt: một chuỗi giao dịch nhỏ dưới ngưỡng nhưng có mẫu hình xé nhỏ có chủ ý vẫn phải bị báo cáo là đáng ngờ, trong khi một giao dịch lớn của doanh nghiệp có hoạt động rõ ràng chỉ cần báo cáo theo ngưỡng mà không hàm ý gì bất thường."
      },
      {
        "question": "Hành vi 'structuring' (xé nhỏ giao dịch) là gì và vì sao nó là dấu hiệu đáng ngờ?",
        "options": [
          "Chia nhỏ giao dịch để né ngưỡng phải báo cáo",
          "Cấu trúc lại danh mục đầu tư của khách hàng để giảm rủi ro",
          "Ngân hàng chia nhỏ hạn mức tín dụng",
          "Chuyển tiền qua nhiều ngân hàng để tiết kiệm phí giao dịch"
        ],
        "correct": 0,
        "explanation": "Điểm quan trọng là hành vi né ngưỡng tự nó đã đáng ngờ. Một khách hàng liên tục nộp các khoản tiền mặt sát dưới ngưỡng báo cáo, nhiều lần trong tuần, ở nhiều điểm giao dịch khác nhau, đang thể hiện sự hiểu biết về ngưỡng và ý đồ tránh nó."
      },
      {
        "question": "Vì sao hạ ngưỡng cảnh báo xuống rất thấp lại có thể làm hệ thống tuân thủ yếu đi?",
        "options": [
          "Vì chi phí vận hành hệ thống công nghệ sẽ tăng lên đáng kể",
          "Vì cảnh báo giả quá nhiều, đội rà soát bị quá tải",
          "Vì cơ quan quản lý sẽ phạt tổ chức lập quá nhiều báo cáo",
          "Vì khách phàn nàn rồi bỏ đi"
        ],
        "correct": 1,
        "explanation": "Đây là nghịch lý quan trọng của nghề: nguồn lực rà soát là hữu hạn, nên một hệ thống cảnh báo quá nhạy thực chất làm giảm khả năng phát hiện. Chất lượng phân tích và việc tinh chỉnh ngưỡng theo từng nhóm khách hàng quan trọng hơn số lượng cảnh báo tạo ra."
      },
      {
        "question": "Scenario: Khách chia 500 triệu thành năm lần nộp, mỗi lần 99 triệu, trong cùng một tuần. Bộ phận tuân thủ nên làm gì?",
        "options": [
          "Báo cáo đáng ngờ, vì đây là dấu hiệu structuring",
          "Không làm gì, vì mỗi lần đều dưới ngưỡng quy định",
          "Chỉ báo cáo giao dịch giá trị lớn theo tổng số tiền",
          "Yêu cầu khách gộp lại thành một giao dịch duy nhất"
        ],
        "correct": 0,
        "explanation": "Chính việc mỗi lần đều nằm sát dưới ngưỡng mới là dấu hiệu: người bình thường không thiết kế giao dịch quanh một con số quy định. Báo cáo đáng ngờ dựa trên mẫu hình hành vi chứ không dựa trên việc có vượt ngưỡng hay không."
      }
    ]
  }),
  "aml-kyc-case-study": patch({
    "quiz": [
      {
        "question": "Tình huống: một doanh nghiệp xuất nhập khẩu thanh toán cho nhà cung cấp nước ngoài với giá hàng hóa cao hơn rõ rệt so với giá thị trường của cùng loại hàng. Đây có thể là dấu hiệu của hành vi gì?",
        "options": [
          "Nhà cung cấp đang cho doanh nghiệp vay trả chậm lãi ưu đãi",
          "Rửa tiền qua thương mại bằng chênh lệch giá hóa đơn",
          "Dấu hiệu doanh nghiệp sắp mở rộng quy mô nhập khẩu",
          "Doanh nghiệp đàm phán kém nên phải mua với giá đắt hơn"
        ],
        "correct": 1,
        "explanation": "Khai giá cao hơn hoặc thấp hơn giá trị thực trên hóa đơn là kỹ thuật phổ biến để chuyển giá trị qua biên giới. Vì vậy với khách hàng xuất nhập khẩu, việc đối chiếu giá trên hóa đơn với giá thị trường của hàng hóa cùng loại là một bước rà soát có giá trị cao."
      },
      {
        "question": "Một khách hàng mới được xác định là người thân của một cá nhân có ảnh hưởng chính trị. Điều này có nghĩa gì?",
        "options": [
          "Không hàm ý sai phạm, nhưng phải nhận biết tăng cường",
          "Phải từ chối thiết lập quan hệ vì rủi ro quá cao",
          "Được giảm bớt thủ tục vì khách hàng có địa vị đáng tin",
          "Chỉ lưu ý nếu chính khách hàng giữ chức vụ, người thân thì không"
        ],
        "correct": 0,
        "explanation": "Người thân và cộng sự gần của cá nhân có ảnh hưởng chính trị cũng thuộc diện phải áp dụng biện pháp tăng cường, chính vì tài sản có nguồn gốc không minh bạch thường được đặt dưới tên người thân. Trọng tâm của việc xác minh là nguồn gốc tài sản, không phải bản thân địa vị."
      },
      {
        "question": "Tình huống: bộ phận kinh doanh gây áp lực để nhanh chóng hoàn tất mở tài khoản cho một khách hàng lớn, trong khi hồ sơ xác định chủ sở hữu hưởng lợi chưa hoàn tất. Hướng xử lý đúng là gì?",
        "options": [
          "Mở tài khoản trước để giữ khách, hoàn thiện hồ sơ sau",
          "Chưa cho giao dịch và báo cáo lên tuyến tuân thủ",
          "Chuyển hồ sơ sang một chi nhánh khác để họ xử lý giúp",
          "Mở tài khoản với hạn mức thấp và bỏ qua bước xác minh"
        ],
        "correct": 1,
        "explanation": "Xác định chủ sở hữu hưởng lợi là điều kiện bắt buộc, không phải bước có thể làm sau. Điều quan trọng thứ hai trong tình huống này là ghi nhận áp lực từ bộ phận kinh doanh - đó là lý do chức năng tuân thủ được thiết kế có đường báo cáo độc lập lên cấp lãnh đạo cao nhất."
      },
      {
        "question": "Sau khi lập báo cáo giao dịch đáng ngờ về một khách hàng, tổ chức tài chính có bắt buộc phải đóng tài khoản của khách hàng đó không?",
        "options": [
          "Có, phải đóng ngay để cắt quan hệ và tránh trách nhiệm",
          "Phải đóng nếu là cá nhân, được giữ nếu là doanh nghiệp",
          "Không tự động phải đóng, tùy đánh giá rủi ro",
          "Chỉ đóng khi chính khách hàng yêu cầu chấm dứt quan hệ"
        ],
        "correct": 2,
        "explanation": "Đóng tài khoản ngay có thể vô tình cảnh báo đối tượng và làm mất dấu dòng tiền. Đây là lý do quyết định này cần được cân nhắc cùng cơ quan có thẩm quyền chứ không phải phản xạ tự động sau mỗi báo cáo."
      },
      {
        "question": "Scenario: Một khách hàng có năm năm giao dịch sạch bất ngờ nhận một khoản chuyển khoản rất lớn từ nước ngoài. Xử lý thế nào?",
        "options": [
          "Vẫn phải xác minh, lịch sử tốt không miễn nghĩa vụ",
          "Bỏ qua, vì lịch sử 5 năm đã đủ cơ sở tin cậy",
          "Đóng tài khoản ngay và thông báo cho khách biết",
          "Chờ thêm vài giao dịch nữa rồi mới đánh giá lại"
        ],
        "correct": 0,
        "explanation": "Tài khoản có lịch sử sạch chính là thứ tội phạm đi tìm, nên bề dày quan hệ làm tăng độ tin cậy chứ không thay thế việc xác minh nguồn tiền. Đóng tài khoản kèm giải thích lý do lại vi phạm quy định cấm tiết lộ - đó là ranh giới pháp lý nghiêm ngặt."
      }
    ]
  }),
  "cau-truc-von-toi-uu-cho-doanh-nghiep": patch({
    "quiz": [
      {
        "question": "Vì sao các công ty công nghệ giai đoạn tăng trưởng cao thường duy trì tỷ lệ nợ vay thấp hơn nhiều so với các công ty bất động sản hay tiện ích công cộng?",
        "options": [
          "Vì công ty công nghệ không được phép vay nợ theo quy định",
          "Vì dòng tiền biến động và ít tài sản thế chấp",
          "Vì công ty công nghệ luôn có lợi nhuận thấp hơn bất động sản",
          "Vì tỷ lệ nợ không liên quan tới ngành"
        ],
        "correct": 1,
        "explanation": "Khả năng chịu đựng nợ vay phụ thuộc nhiều vào tính ổn định của dòng tiền và giá trị tài sản có thể thế chấp - ngành có dòng tiền ổn định và tài sản hữu hình lớn (bất động sản) có thể an toàn duy trì tỷ lệ nợ cao hơn nhiều so với ngành dòng tiền biến động mạnh, tài sản chủ yếu vô hình (công nghệ giai đoạn tăng trưởng)."
      },
      {
        "question": "Chi phí kiệt quệ tài chính (financial distress cost) là gì, và vì sao nó là một yếu tố quan trọng giới hạn mức nợ vay tối ưu của doanh nghiệp?",
        "options": [
          "Chỉ đơn giản là chi phí lãi vay phải trả hàng kỳ cho ngân hàng",
          "Chỉ phát sinh sau khi đã phá sản",
          "Là tổn thất gián tiếp khi doanh nghiệp có nguy cơ vỡ nợ",
          "Là khoản chi phí cố định giống nhau với mọi doanh nghiệp"
        ],
        "correct": 2,
        "explanation": "Chi phí kiệt quệ tài chính là chi phí GIÁN TIẾP, thường bắt đầu xuất hiện ngay cả trước khi doanh nghiệp thực sự vỡ nợ - chỉ cần thị trường NHẬN THẤY rủi ro vỡ nợ tăng cao, các bên liên quan (khách hàng, nhà cung cấp, nhân sự giỏi) đã có thể bắt đầu rời bỏ hoặc yêu cầu điều khoản khắt khe hơn, làm tổn hại giá trị doanh nghiệp trước khi vỡ nợ thực sự xảy ra."
      },
      {
        "question": "Vì sao chi phí kiệt quệ tài chính lại xuất hiện trước khi doanh nghiệp thực sự vỡ nợ?",
        "options": [
          "Vì thuế suất tăng khi nợ vượt ngưỡng",
          "Vì kế toán phải trích lập dự phòng ngay khi nợ tăng lên",
          "Vì ngân hàng bắt buộc công bố tình trạng khó khăn ra thị trường",
          "Vì chỉ cần bị nghi ngờ là hành vi các bên đã đổi"
        ],
        "correct": 3,
        "explanation": "Đây là chi phí gián tiếp và không hiện trên báo cáo tài chính dưới một dòng riêng, nhưng lại là lý do chính khiến mức nợ tối ưu thấp hơn nhiều so với gợi ý từ lợi ích lá chắn thuế đơn thuần."
      },
      {
        "question": "Vì sao doanh nghiệp công nghệ có giá trị chủ yếu ở tài sản vô hình nên duy trì tỷ lệ nợ thấp?",
        "options": [
          "Vì ít tài sản thế chấp và giá trị nằm ở con người",
          "Vì doanh nghiệp công nghệ không được ngân hàng cho vay",
          "Vì lá chắn thuế không áp cho công nghệ",
          "Vì họ luôn có sẵn nhiều tiền mặt nên không cần vay thêm"
        ],
        "correct": 0,
        "explanation": "Khi khó khăn xảy ra, một nhà máy vẫn còn đó để bán, nhưng một đội ngũ kỹ sư có thể rời đi trong vài tuần. Giá trị dễ bốc hơi làm chi phí kiệt quệ tài chính cao hơn nhiều."
      }
    ,
    {
      "question": "Vì sao ngành có dòng tiền ổn định như điện nước thường vay nợ nhiều hơn ngành công nghệ?",
      "options": [
        "Vì dòng tiền dự đoán được cho phép gánh nghĩa vụ trả nợ cố định an toàn hơn",
        "Vì tài sản của ngành điện nước được nhà nước bảo lãnh khi doanh nghiệp vay vốn",
        "Vì ngành công nghệ không được hưởng lá chắn thuế từ chi phí lãi vay",
        "Vì doanh nghiệp công nghệ luôn có đủ tiền mặt nên không cần vay thêm"
      ],
      "correct": 0,
      "explanation": "Lãi vay phải trả đúng hạn bất kể kinh doanh thế nào, nên khả năng gánh nợ phụ thuộc vào độ chắc chắn của dòng tiền. Cộng thêm một yếu tố nữa: nhà máy điện thế chấp được, còn giá trị của công ty phần mềm nằm ở đội ngũ - thứ không ai nhận làm tài sản bảo đảm."
    }
    ]
  }),















  "xay-dung-ngan-sach-doanh-nghiep": patch({
    "quiz": [
      {
        "question": "Vì sao 'sandbagging' (đặt mục tiêu thấp để dễ đạt) là một vấn đề nghiêm trọng đối với chất lượng ngân sách doanh nghiệp?",
        "options": [
          "Ngân sách tổng hợp không phản ánh đúng tiềm năng thật",
          "Kiểm toán viên độc lập sẽ từ chối ký báo cáo tài chính",
          "Bộ phận sẽ bị phạt khi vượt kế hoạch quá nhiều lần",
          "Chi phí thực tế luôn vượt ngân sách đã được duyệt"
        ],
        "correct": 0,
        "explanation": "Sandbagging làm méo mó toàn bộ hệ thống thông tin dùng để ra quyết định - ban lãnh đạo có thể phân bổ vốn sai chỗ, đặt kỳ vọng cổ đông sai lệch, hoặc đánh giá hiệu suất quản lý không chính xác (khen thưởng người 'vượt kế hoạch thấp' thay vì người thực sự xuất sắc)."
      },
      {
        "question": "Zero-based budgeting (ngân sách từ số 0, mỗi khoản chi phải được biện minh lại từ đầu mỗi kỳ) khác gì so với cách lập ngân sách truyền thống (dựa trên ngân sách kỳ trước cộng/trừ điều chỉnh)?",
        "options": [
          "Mọi khoản chi phải được biện minh lại từ đầu mỗi kỳ",
          "Toàn bộ chi phí bị cắt về 0 rồi cấp lại theo thứ tự ưu tiên",
          "Chỉ áp dụng cho doanh nghiệp mới thành lập chưa có lịch sử",
          "Ngân sách được lập lại từ số 0 vào cuối mỗi quý"
        ],
        "correct": 0,
        "explanation": "Ngân sách truyền thống (incremental budgeting) dễ dẫn đến 'quán tính ngân sách' - các khoản chi được duy trì năm này qua năm khác chỉ vì đã tồn tại từ trước, không còn được đánh giá lại về hiệu quả. Zero-based budgeting khắc phục điều này bằng cách yêu cầu biện minh lại từ đầu, nhưng đòi hỏi nhiều thời gian và nguồn lực phân tích hơn."
      },
      {
        "question": "Vì sao việc bộ phận cố ý đặt mục tiêu thấp lại gây hại vượt ra ngoài chính bộ phận đó?",
        "options": [
          "Vì ngân sách là cơ sở phân bổ vốn cho cả doanh nghiệp",
          "Vì kiểm toán sẽ mở rộng phạm vi kiểm tra sang bộ phận khác",
          "Vì thuế phải nộp của cả tập đoàn sẽ bị tính sai lệch",
          "Vì các bộ phận khác sẽ bắt chước theo cách làm đó"
        ],
        "correct": 0,
        "explanation": "Ngân sách không chỉ là mục tiêu mà còn là đầu vào cho việc phân bổ nguồn lực. Một con số thấp giả tạo có thể khiến doanh nghiệp đầu tư thiếu vào đúng nơi đang có cơ hội."
      },
      {
        "question": "Ưu điểm chính của ngân sách từ số không so với cách lập dựa trên kỳ trước là gì?",
        "options": [
          "Cắt được chi phí đang duy trì chỉ vì quán tính",
          "Tiết kiệm thời gian lập ngân sách hơn cách truyền thống",
          "Đảm bảo tổng chi phí năm sau thấp hơn năm trước",
          "Không cần số liệu lịch sử nên áp dụng được ngay"
        ],
        "correct": 0,
        "explanation": "Cách lập dựa trên kỳ trước mặc định mọi khoản chi cũ vẫn hợp lý và chỉ điều chỉnh tỷ lệ. Cách từ số không phá bỏ giả định đó, đổi lại tốn công hơn nhiều nên thường áp dụng luân phiên."
      }
    ,
    {
      "question": "Vì sao gắn thưởng trực tiếp vào việc đạt ngân sách lại làm hỏng chất lượng của chính ngân sách đó?",
      "options": [
        "Vì người lập ngân sách có động cơ đặt mục tiêu dễ đạt thay vì đúng",
        "Vì tiền thưởng làm tăng chi phí nhân sự nên ngân sách chi phí bị vượt",
        "Vì bộ phận nhân sự phải tham gia vào quá trình lập ngân sách tài chính",
        "Vì ngân sách sẽ phải điều chỉnh lại mỗi khi cơ chế thưởng thay đổi"
      ],
      "correct": 0,
      "explanation": "Ngân sách phục vụ hai mục đích xung khắc: dự báo trung thực và làm thước đo thành tích. Khi mục đích thứ hai đi kèm tiền, nó luôn thắng - đó là lý do nhiều doanh nghiệp tách hẳn dự báo ra khỏi mục tiêu thưởng."
    }
    ]
  }),
  "du-bao-tai-chinh-rolling-forecast": patch({
    "quiz": [
      {
        "question": "Vì sao rolling forecast đặc biệt hữu ích cho các doanh nghiệp trong ngành có tốc độ thay đổi nhanh (công nghệ, thời trang nhanh) hơn là ngành ổn định (tiện ích công cộng)?",
        "options": [
          "Vì ngân sách cố định lập từ đầu năm nhanh mất tính liên quan",
          "Vì ngành thay đổi nhanh không được phép lập ngân sách cố định",
          "Vì rolling forecast cần ít nhân lực hơn ngân sách cố định",
          "Vì ngành ổn định không cần dự báo tài chính hằng năm nữa"
        ],
        "correct": 0,
        "explanation": "Trong ngành thay đổi nhanh, giả định đưa ra vào tháng 1 (về xu hướng thị trường, hành vi khách hàng, đối thủ cạnh tranh) có thể hoàn toàn lỗi thời chỉ sau vài tháng - rolling forecast cho phép doanh nghiệp liên tục cập nhật kế hoạch dựa trên thông tin mới nhất, thay vì tiếp tục vận hành theo một kế hoạch đã không còn phản ánh thực tế."
      },
      {
        "question": "Một nhược điểm thường gặp của rolling forecast so với ngân sách cố định là gì?",
        "options": [
          "Tốn nhiều thời gian và làm mục tiêu liên tục thay đổi",
          "Không dùng được cho doanh nghiệp có doanh thu theo mùa",
          "Chỉ dự báo được tối đa một quý nên tầm nhìn quá ngắn",
          "Không tương thích với chuẩn mực kế toán hiện hành"
        ],
        "correct": 0,
        "explanation": "Chi phí thực hiện là đánh đổi thực sự của rolling forecast - cập nhật thường xuyên (hàng quý hoặc hàng tháng) tốn nhiều công sức phân tích hơn lập ngân sách một lần mỗi năm, và một số doanh nghiệp vẫn cần một 'mục tiêu neo' (anchor target) tương đối ổn định để đánh giá hiệu suất và tạo động lực cho đội ngũ, thay vì mục tiêu liên tục di chuyển."
      },
      {
        "question": "Vì sao nên tách vai trò của ngân sách và của dự báo?",
        "options": [
          "Vì ngân sách là cam kết để đánh giá, dự báo cần trung thực",
          "Vì chuẩn mực kế toán yêu cầu tách riêng hai loại tài liệu",
          "Vì hai thứ do hai bộ phận khác nhau chịu trách nhiệm lập",
          "Vì ngân sách lập theo năm còn dự báo lập theo từng quý"
        ],
        "correct": 0,
        "explanation": "Khi con số vừa là mốc đánh giá vừa là ước lượng, người lập sẽ chịu áp lực làm nó đẹp. Tách hai vai trò giữ cho dự báo còn giá trị dùng để ra quyết định."
      },
      {
        "question": "Dấu hiệu nào cho thấy vấn đề của dự báo nằm ở giả định hoặc động cơ chứ không ở sự bất định của thị trường?",
        "options": [
          "Sai số dự báo luôn lệch về một chiều qua nhiều kỳ",
          "Sai số dự báo dao động mạnh quanh mức không qua các kỳ",
          "Sai số dự báo lớn dần theo quy mô doanh thu công ty",
          "Sai số dự báo lớn hơn ở các bộ phận mới thành lập"
        ],
        "correct": 0,
        "explanation": "Bất định thị trường tạo ra sai số hai chiều. Sai số lệch một chiều đều đặn là dấu hiệu có thiên lệch mang tính hệ thống trong cách lập dự báo."
      }
    ,
    {
      "question": "Điều gì thường khiến dự báo cuốn chiếu thất bại trong thực tế triển khai?",
      "options": [
        "Nó thành việc lập lại ngân sách chi tiết mỗi quý, tốn công mà ít giá trị",
        "Nó không cho phép so sánh kết quả thực tế với kế hoạch đã được duyệt",
        "Nó yêu cầu hệ thống phần mềm chuyên dụng mà đa số doanh nghiệp không có",
        "Nó chỉ áp dụng được cho doanh thu chứ không áp dụng được cho chi phí"
      ],
      "correct": 0,
      "explanation": "Dự báo cuốn chiếu chỉ hiệu quả khi được làm ở mức tổng hợp, tập trung vào vài biến số dẫn dắt. Bê nguyên mức chi tiết của ngân sách năm vào rồi làm lại mỗi quý là cách chắc chắn nhất để cả tổ chức chán và bỏ."
    }
    ]
  }),
  "phan-tich-variance-thuc-te-vs-ke-hoach": patch({
    "quiz": [
      {
        "question": "Vì sao việc tách variance thành 'variance theo giá' (price variance) và 'variance theo sản lượng' (volume variance) quan trọng hơn là chỉ nhìn tổng chênh lệch doanh thu?",
        "options": [
          "Vì hai nguyên nhân cần hành động khắc phục khác hẳn nhau",
          "Vì chuẩn mực kế toán bắt buộc trình bày tách hai phần này",
          "Vì chỉ variance theo giá mới ảnh hưởng đến lợi nhuận gộp",
          "Vì gộp lại sẽ làm tổng chênh lệch bị tính sai về số học"
        ],
        "correct": 0,
        "explanation": "Đây là giá trị cốt lõi của phân tích variance chi tiết: cùng một mức chênh lệch doanh thu tổng có thể đến từ những nguyên nhân hoàn toàn khác nhau, đòi hỏi hành động khắc phục khác nhau - tách riêng price variance và volume variance giúp ban lãnh đạo biết chính xác nên tập trung vào định giá hay vào nỗ lực bán hàng."
      },
      {
        "question": "Một bộ phận liên tục đạt kết quả 'sát đúng kế hoạch' (variance gần như bằng 0) trong nhiều quý liên tiếp. Điều này có nên tự động được xem là dấu hiệu quản lý xuất sắc không?",
        "options": [
          "Không hẳn - có thể là dấu hiệu số liệu đang được nắn cho khớp",
          "Không hẳn - vì ngành nào cũng có biến động ngẫu nhiên lớn",
          "Đúng, đó là bằng chứng rõ ràng của năng lực dự báo tốt",
          "Đúng, miễn là kế hoạch đã được ban lãnh đạo phê duyệt"
        ],
        "correct": 0,
        "explanation": "Đây là một 'red flag' tinh tế mà nhà phân tích tài chính có kinh nghiệm cần lưu ý: kết quả kinh doanh thực tế hiếm khi khớp chính xác với kế hoạch nhiều kỳ liên tiếp một cách tự nhiên - độ chính xác bất thường này đôi khi gợi ý về việc quản lý đang 'làm mượt' số liệu (earnings management) để tránh giải trình các khoản lệch lớn, cần được kiểm tra kỹ hơn."
      },
      {
        "question": "Kế hoạch 100.000 sản phẩm giá 50k; thực tế 80.000 sản phẩm giá 55k. Nhận định nào đúng?",
        "options": [
          "Hụt 600 triệu: sản lượng giảm nhiều hơn phần giá tăng bù",
          "Đúng kế hoạch: giá tăng và sản lượng giảm triệt tiêu nhau",
          "Vượt 400 triệu: giá tăng 10% bù được sản lượng giảm 20%",
          "Hụt 1 tỷ: chỉ tính phần sản lượng giảm 20.000 sản phẩm"
        ],
        "correct": 0,
        "explanation": "4,4 tỷ so với 5 tỷ là hụt 600 triệu. Nhưng vì bán ở giá cao hơn, biên lợi nhuận mỗi sản phẩm tăng, nên lợi nhuận có thể vượt - đó chính là lý do phải tách nguyên nhân thay vì chỉ nhìn tổng."
      },
      {
        "question": "Doanh nghiệp đạt 99-101% kế hoạch suốt tám quý liên tiếp trong một ngành biến động mạnh. Cách đọc thận trọng là gì?",
        "options": [
          "Đây là bằng chứng rõ ràng về năng lực điều hành xuất sắc",
          "Cần soi khả năng số liệu đang được làm mượt giữa các kỳ",
          "Đây là dấu hiệu kế hoạch được lập rất chính xác",
          "Không có gì đáng chú ý"
        ],
        "correct": 1,
        "explanation": "Trong môi trường biến động, sai số dự báo là điều bình thường. Sự chính xác đều đặn bất thường thường phản ánh việc điều tiết ghi nhận giữa các kỳ hơn là khả năng dự báo."
      }
    ,
    {
      "question": "Chênh lệch có lợi ở chỉ tiêu chi phí có thể là dấu hiệu xấu trong trường hợp nào?",
      "options": [
        "Khi nó đến từ việc cắt chi phí bảo trì đáng lẽ phải chi",
        "Khi nó xuất hiện đều đặn qua nhiều quý liên tiếp trong cùng một năm",
        "Khi bộ phận đạt được nó mà không báo cáo trước với phòng tài chính",
        "Khi mức chênh lệch vượt quá mười phần trăm so với kế hoạch ban đầu"
      ],
      "correct": 0,
      "explanation": "Chi ít hơn kế hoạch không phải lúc nào cũng là tiết kiệm - nó có thể là hoãn lại một khoản chi cần thiết sang năm sau. Đây là lý do phân tích chênh lệch phải hỏi nguyên nhân, chứ không chỉ gắn nhãn có lợi hay bất lợi theo dấu của con số."
    }
    ]
  }),
  "kpi-tai-chinh-doanh-nghiep-chon-dung-chi-so": patch({
    "quiz": [
      {
        "question": "Vì sao 'theo dõi quá nhiều KPI cùng lúc' có thể gây hại cho việc ra quyết định, thay vì chỉ đơn giản là 'có nhiều thông tin hơn thì tốt hơn'?",
        "options": [
          "Khó xác định đâu là ưu tiên thực sự cần hành động",
          "Ban lãnh đạo không đủ thời gian đọc hết báo cáo hằng tháng",
          "Các chỉ số sẽ tự động mâu thuẫn nhau về mặt toán học",
          "Chi phí phần mềm theo dõi KPI tăng theo số chỉ số"
        ],
        "correct": 0,
        "explanation": "Nguyên tắc quan trọng trong thiết kế hệ thống KPI là 'ít nhưng đúng trọng tâm' - một bộ dashboard với 30 chỉ số khiến người xem không biết nên tập trung vào đâu, trong khi 3-5 KPI thực sự phản ánh động lực giá trị cốt lõi của doanh nghiệp giúp ra quyết định rõ ràng và nhanh chóng hơn nhiều."
      },
      {
        "question": "Một công ty bán lẻ truyền thống áp dụng y hệt bộ KPI của công ty SaaS (Churn Rate, LTV/CAC) cho hoạt động kinh doanh của mình. Vấn đề tiềm ẩn ở đây là gì?",
        "options": [
          "KPI mô hình thuê bao không phản ánh đúng động lực bán lẻ",
          "Churn Rate và LTV/CAC là chỉ số marketing, không phải tài chính",
          "KPI của mô hình thuê bao chỉ dùng được cho công ty nước ngoài",
          "Bán lẻ không có đủ dữ liệu khách hàng để tính các chỉ số này"
        ],
        "correct": 0,
        "explanation": "Đây chính là sai lầm phổ biến của việc áp dụng KPI một cách máy móc mà không hiểu bản chất mô hình kinh doanh - KPI phải được thiết kế dựa trên động lực giá trị THỰC SỰ của từng loại hình doanh nghiệp, không phải sao chép nguyên bộ chỉ số 'thời thượng' từ ngành khác."
      },
      {
        "question": "Vì sao doanh nghiệp bán lẻ cần theo dõi tăng trưởng cửa hàng cũ chứ không chỉ tổng doanh thu?",
        "options": [
          "Vì mở cửa hàng mới luôn làm tổng doanh thu tăng",
          "Vì chuẩn mực kế toán yêu cầu tách hai loại doanh thu",
          "Vì tổng doanh thu không bao gồm doanh thu online",
          "Vì cửa hàng cũ luôn có biên lợi nhuận cao hơn"
        ],
        "correct": 0,
        "explanation": "Đây là ví dụ điển hình của chỉ số đối trọng: một chỉ số tăng trưởng đi kèm một chỉ số chất lượng, để tăng trưởng bằng cách mở rộng không che mất sự suy giảm ở nền tảng cũ."
      },
      {
        "question": "Nguyên tắc chỉ số đối trọng nghĩa là gì?",
        "options": [
          "Mỗi chỉ số tăng trưởng đi kèm một chỉ số chất lượng",
          "Mỗi chỉ số phải có một chỉ số dự phòng thay thế",
          "Mỗi bộ phận theo dõi đúng một chỉ số duy nhất",
          "Mỗi chỉ số phải được so với trung bình ngành"
        ],
        "correct": 0,
        "explanation": "Gần như mọi chỉ số đứng một mình đều có cách đẩy lên bằng việc gây hại nơi khác. Cặp chỉ số làm cho hành vi tối ưu hóa cục bộ lộ ra ngay."
      }
    ,
    {
      "question": "Chỉ số dẫn dắt khác chỉ số kết quả ở điểm nào?",
      "options": [
        "Chỉ số dẫn dắt đo hành động dự báo được kết quả, còn chỉ số kết quả đo cái đã xảy ra",
        "Chỉ số dẫn dắt đo tài chính, còn chỉ số kết quả đo hoạt động vận hành",
        "Chỉ số dẫn dắt do ban lãnh đạo đặt ra, còn chỉ số kết quả do bộ phận tự đề xuất",
        "Chỉ số dẫn dắt được theo dõi hằng tháng, còn chỉ số kết quả theo dõi hằng quý"
      ],
      "correct": 0,
      "explanation": "Doanh thu quý là kết quả - khi biết thì đã không sửa được. Số cuộc gặp khách hàng và tỷ lệ chuyển đổi là dẫn dắt: chúng thay đổi được ngay hôm nay và định hình con số quý sau. Một bộ chỉ số chỉ toàn kết quả là một bảng điều khiển nhìn về phía sau."
    }
    ]
  }),
  "treasury-management-quan-ly-dong-tien": patch({
    "quiz": [
      {
        "question": "Vì sao Treasury thường duy trì một khoản 'đệm thanh khoản' (liquidity buffer) ngay cả khi dòng tiền dự báo cho thấy đủ tiền cho mọi nghĩa vụ sắp tới?",
        "options": [
          "Vì dự báo dòng tiền luôn có sai số ngoài dự kiến",
          "Vì quy định buộc giữ tối thiểu 5% doanh thu bằng tiền",
          "Vì tiền mặt nhàn rỗi giúp cải thiện chỉ số thanh toán",
          "Vì ngân hàng yêu cầu số dư tối thiểu trên tài khoản"
        ],
        "correct": 0,
        "explanation": "Bất kỳ dự báo nào cũng có sai số - Treasury Management giỏi không chỉ dự báo chính xác mà còn CHUẨN BỊ cho khả năng dự báo sai. Đệm thanh khoản là 'bảo hiểm' cho những cú sốc bất ngờ (khách hàng trả chậm, chi phí phát sinh, gián đoạn kinh doanh) mà không ai có thể dự báo chính xác 100%."
      },
      {
        "question": "Giữ quá nhiều tiền mặt dư thừa không đầu tư sinh lời (thay vì chỉ đủ đệm thanh khoản cần thiết) có phải luôn là chiến lược tài chính tối ưu không?",
        "options": [
          "Không hẳn - tiền nhàn rỗi có chi phí cơ hội",
          "Đúng, miễn là lãi suất tiền gửi cao hơn lạm phát",
          "Đúng, vì tiền mặt là tài sản an toàn nhất",
          "Không hẳn - vì tiền mặt chịu thuế riêng"
        ],
        "correct": 0,
        "explanation": "Đây là bài toán cân bằng cốt lõi của Treasury: quá ít tiền mặt tạo rủi ro thanh khoản, nhưng quá nhiều tiền mặt nhàn rỗi (không đầu tư ngắn hạn an toàn, không dùng cho tăng trưởng, không trả lại cổ đông) tạo ra chi phí cơ hội - vốn đáng lẽ có thể tạo thêm giá trị lại nằm im không sinh lời."
      },
      {
        "question": "Số ngày tồn kho 70, phải thu 50, phải trả 40. Chu kỳ chuyển đổi tiền mặt là bao nhiêu?",
        "options": [
          "80 ngày",
          "160 ngày",
          "60 ngày",
          "20 ngày"
        ],
        "correct": 0,
        "explanation": "70 + 50 − 40 = 80 ngày. Đây là khoảng thời gian doanh nghiệp phải tự bỏ vốn ra tài trợ trước khi tiền quay về, và nó tăng theo quy mô doanh thu."
      },
      {
        "question": "Vì sao doanh nghiệp tăng trưởng nhanh có thể thiếu tiền dù vẫn có lãi?",
        "options": [
          "Vì chu kỳ tiền mặt dương nên doanh thu tăng thì vốn lưu động tăng",
          "Vì lợi nhuận kế toán luôn cao hơn dòng tiền thực ở mọi ngành",
          "Vì doanh nghiệp tăng trưởng phải trả thuế trước khi thu tiền",
          "Vì chi phí lãi vay tăng nhanh hơn tốc độ tăng doanh thu"
        ],
        "correct": 0,
        "explanation": "Mỗi đồng doanh thu tăng thêm kéo theo tồn kho và phải thu tăng theo. Tăng trưởng vì vậy tiêu tiền trước khi tạo ra tiền - và đó là lý do quản lý ngân quỹ tồn tại."
      }
    ,
    {
      "question": "Vì sao hạn mức tín dụng chưa giải ngân lại quan trọng với bộ phận ngân quỹ ngang với số dư tiền mặt?",
      "options": [
        "Vì nó là nguồn thanh khoản dự phòng gọi ra được nhanh khi cần",
        "Vì phần hạn mức chưa dùng vẫn được tính vào tài sản trên bảng cân đối",
        "Vì doanh nghiệp phải trả lãi cho toàn bộ hạn mức đã được cấp",
        "Vì hạn mức tín dụng quyết định mức xếp hạng tín nhiệm của doanh nghiệp"
      ],
      "correct": 0,
      "explanation": "Thanh khoản không chỉ là tiền đang có mà còn là tiền có thể lấy được ngay. Rủi ro nằm ở chỗ hạn mức thường kèm điều kiện tài chính, nên nó dễ bị cắt đúng vào lúc doanh nghiệp cần nhất - vì thế không thể coi nó tương đương tiền mặt."
    }
    ]
  }),
  "quan-ly-rui-ro-lai-suat-doanh-nghiep": patch({
    "quiz": [
      {
        "question": "Vì sao một doanh nghiệp có dòng tiền hoạt động ỔN ĐỊNH, DỰ ĐOÁN ĐƯỢC lại đặc biệt cần quản trị rủi ro lãi suất chặt chẽ hơn doanh nghiệp có dòng tiền biến động mạnh?",
        "options": [
          "Vì kế hoạch được xây trên giả định chi phí vốn ổn định",
          "Vì doanh nghiệp ổn định thường vay nhiều hơn doanh nghiệp khác",
          "Vì dòng tiền ổn định không chịu được bất kỳ biến động nào",
          "Vì ngân hàng áp lãi suất thả nổi cho nhóm khách hàng này"
        ],
        "correct": 0,
        "explanation": "Nghịch lý thú vị: chính vì dòng tiền hoạt động được dự báo chặt chẽ và toàn bộ kế hoạch tài chính (bao gồm cả các cam kết trả nợ, đầu tư, cổ tức) được xây dựng dựa trên giả định chi phí vốn tương đối ổn định, một biến động lãi suất ngoài dự kiến có thể phá vỡ toàn bộ cấu trúc kế hoạch đó, dù bản thân dòng tiền kinh doanh vẫn ổn định."
      },
      {
        "question": "Vì sao doanh nghiệp không nên hedge (phòng ngừa) 100% mọi khoản vay lãi suất thả nổi một cách máy móc, mà cần cân nhắc mức độ hedge phù hợp?",
        "options": [
          "Vì hedge có chi phí và làm mất phần lợi khi lãi suất giảm",
          "Vì quy định giới hạn tỷ lệ hedge tối đa ở mức 80% dư nợ",
          "Vì công cụ hedge không có sẵn cho mọi kỳ hạn khoản vay",
          "Vì hedge toàn bộ sẽ bị ghi nhận là hoạt động đầu cơ"
        ],
        "correct": 0,
        "explanation": "Hedging là một công cụ quản trị rủi ro, không phải công cụ đầu cơ để tối đa hóa lợi nhuận - hedge 100% loại bỏ hoàn toàn rủi ro nhưng cũng loại bỏ khả năng hưởng lợi nếu lãi suất di chuyển theo hướng có lợi, và có chi phí giao dịch riêng. Quyết định mức độ hedge phù hợp cần cân nhắc khẩu vị rủi ro và cấu trúc tài chính cụ thể của từng doanh nghiệp."
      },
      {
        "question": "Dư nợ thả nổi 500 tỷ, lãi suất tăng 3 điểm phần trăm. Chi phí lãi vay tăng thêm bao nhiêu mỗi năm?",
        "options": [
          "15 tỷ đồng (= 500 tỷ × 3 điểm phần trăm)",
          "150 tỷ đồng (= 500 × 30%, dư một chữ số 0)",
          "1,5 tỷ đồng (= 500 × 0,3%, thiếu một chữ số 0)",
          "Không xác định được nếu chưa biết kỳ hạn"
        ],
        "correct": 0,
        "explanation": "500 × 3% = 15 tỷ. Đặt con số này cạnh lợi nhuận trước thuế là cách nhanh nhất để biết mức độ phơi nhiễm có đáng lo hay không."
      },
      {
        "question": "Đâu là ranh giới giữa quản trị rủi ro và đầu cơ khi phòng hộ lãi suất?",
        "options": [
          "Bảo vệ kế hoạch trước kịch bản xấu, không phải đoán hướng",
          "Dùng công cụ niêm yết trên sàn, không dùng hợp đồng OTC",
          "Có phê duyệt của hội đồng quản trị trước khi thực hiện",
          "Hedge dưới 50% dư nợ, vượt mức đó bị coi là đầu cơ"
        ],
        "correct": 0,
        "explanation": "Cùng một giao dịch có thể là phòng hộ hoặc đầu cơ tùy vào lý do thực hiện. Câu hỏi kiểm tra là: nếu bỏ giao dịch này đi, doanh nghiệp có đang chịu rủi ro thật hay không?"
      }
    ,
    {
      "question": "Doanh nghiệp ký hợp đồng hoán đổi để chuyển nợ thả nổi sang cố định. Sau đó lãi suất giảm mạnh. Điều gì xảy ra?",
      "options": [
        "Doanh nghiệp chịu chi phí cao hơn thị trường, đổi lại là sự chắc chắn",
        "Hợp đồng tự động chấm dứt vì mục đích phòng vệ không còn cần thiết",
        "Doanh nghiệp được hưởng mức lãi suất thấp hơn theo diễn biến thị trường",
        "Ngân hàng đối tác phải bù phần chênh lệch lãi suất cho doanh nghiệp"
      ],
      "correct": 0,
      "explanation": "Phòng vệ khóa cả hai chiều: bạn thoát rủi ro lãi suất tăng nhưng cũng mất phần lợi khi nó giảm. Đánh giá một hợp đồng phòng vệ theo kết quả sau đó là sai - nó phải được đánh giá theo việc doanh nghiệp có cần sự chắc chắn ấy tại thời điểm ký hay không."
    }
    ]
  }),
  "quan-ly-rui-ro-ty-gia-doanh-nghiep-xnk": patch({
    "quiz": [
      {
        "question": "Forward contract (hợp đồng kỳ hạn) tỷ giá giúp doanh nghiệp xuất khẩu quản trị rủi ro tỷ giá như thế nào?",
        "options": [
          "Khóa trước tỷ giá, đổi lại mất phần lợi nếu tỷ giá thuận",
          "Bảo đảm doanh nghiệp luôn nhận được tỷ giá tốt hơn thị trường",
          "Cho quyền chọn thực hiện hoặc không, đổi lại phải trả phí",
          "Chuyển toàn bộ rủi ro tỷ giá sang cho ngân hàng đối tác"
        ],
        "correct": 0,
        "explanation": "Forward contract là công cụ hedging kinh điển: doanh nghiệp thỏa thuận trước một tỷ giá cố định cho giao dịch tương lai với ngân hàng, đổi lấy sự chắc chắn về dòng tiền - nhưng cũng đồng nghĩa với việc từ bỏ khả năng hưởng lợi nếu tỷ giá thực tế biến động theo hướng có lợi hơn so với tỷ giá đã khóa."
      },
      {
        "question": "Một doanh nghiệp vừa xuất khẩu vừa nhập khẩu với cùng một loại ngoại tệ (ví dụ USD) có thể có 'hedge tự nhiên' (natural hedge) một phần. Điều này có nghĩa là gì?",
        "options": [
          "Doanh thu và chi phí cùng ngoại tệ nên bù trừ lẫn nhau",
          "Doanh nghiệp giữ ngoại tệ trong tài khoản thay vì đổi ra",
          "Ngân hàng tự động bù trừ hai chiều giao dịch cho khách",
          "Tỷ giá được cố định theo hợp đồng dài hạn với đối tác"
        ],
        "correct": 0,
        "explanation": "Natural hedge là một chiến lược quản trị rủi ro thông minh và ít tốn kém: khi cả dòng tiền vào (doanh thu ngoại tệ) và dòng tiền ra (chi phí ngoại tệ) cùng bằng một loại tiền tệ với quy mô tương đồng, biến động tỷ giá tác động lên cả hai theo hướng bù trừ lẫn nhau một phần, giảm nhu cầu phải dùng thêm công cụ phái sinh tốn phí để hedge phần chênh lệch ròng còn lại."
      },
      {
        "question": "Doanh nghiệp thu 8 triệu USD từ xuất khẩu và chi 5 triệu USD nhập nguyên liệu trong cùng kỳ. Rủi ro tỷ giá ròng là bao nhiêu?",
        "options": [
          "3 triệu USD, phần trùng nhau tự triệt tiêu",
          "13 triệu USD, cộng cả dòng vào và dòng ra lại",
          "8 triệu USD, vì chỉ dòng tiền vào chịu rủi ro",
          "0 USD, vì đã có hedge tự nhiên nên hết rủi ro"
        ],
        "correct": 0,
        "explanation": "Đây là phòng hộ tự nhiên. Chỉ phần chênh lệch mới thực sự chịu rủi ro, và phòng hộ trên con số đó thay vì trên tổng doanh thu tiết kiệm được phần lớn chi phí."
      },
      {
        "question": "Khác biệt cơ bản giữa hợp đồng kỳ hạn và quyền chọn là gì?",
        "options": [
          "Kỳ hạn tạo nghĩa vụ; quyền chọn cho quyền và phải trả phí",
          "Kỳ hạn giao dịch trên sàn; còn quyền chọn giao dịch ngoài sàn",
          "Kỳ hạn dùng cho ngoại tệ; quyền chọn dùng cho lãi suất",
          "Kỳ hạn có phí trả trước; quyền chọn thì không mất phí"
        ],
        "correct": 0,
        "explanation": "Khoản phí của quyền chọn chính là giá của sự linh hoạt: giữ được phần lợi khi tỷ giá đi theo hướng thuận, trong khi hợp đồng kỳ hạn đánh đổi phần lợi đó lấy chi phí thấp hơn."
      }
    ,
    {
      "question": "Doanh nghiệp xuất khẩu vay USD để tài trợ vốn lưu động. Điều này ảnh hưởng thế nào tới rủi ro tỷ giá?",
      "options": [
        "Giảm rủi ro, vì nghĩa vụ trả nợ bằng USD khớp với doanh thu bằng USD",
        "Tăng rủi ro, vì doanh nghiệp phải chịu thêm biến động tỷ giá cho khoản vay",
        "Không ảnh hưởng, vì khoản vay và doanh thu được hạch toán riêng biệt",
        "Tăng rủi ro, vì lãi suất vay USD luôn cao hơn lãi suất vay bằng VND"
      ],
      "correct": 0,
      "explanation": "Đây là phòng vệ tự nhiên và thường rẻ hơn hợp đồng phái sinh: khi cả dòng vào lẫn dòng ra cùng một đồng tiền, tỷ giá dịch chuyển thế nào cũng bù trừ lẫn nhau. Nguyên tắc chung là khớp đồng tiền của nghĩa vụ với đồng tiền của doanh thu."
    }
    ]
  }),
  "tong-ket-vai-tro-cfo-hien-dai": patch({
    "quiz": [
      {
        "question": "Vì sao một CEO giỏi về sản phẩm và thị trường vẫn cần một CFO mạnh, thay vì tự mình quyết định mọi vấn đề tài chính?",
        "options": [
          "Vì CFO có chuyên môn sâu về đánh đổi rủi ro và lợi ích",
          "Vì luật doanh nghiệp bắt buộc công ty phải có chức danh CFO",
          "Vì CFO chịu trách nhiệm pháp lý thay cho CEO khi có sai sót",
          "Vì CEO không được phép ký các quyết định về tài chính"
        ],
        "correct": 0,
        "explanation": "Sự phân công vai trò CEO-CFO phản ánh việc quản trị doanh nghiệp hiện đại đòi hỏi chuyên môn sâu ở nhiều lĩnh vực khác nhau - CEO tập trung vào tầm nhìn, sản phẩm, thị trường; CFO mang chuyên môn sâu về phân tích, quản trị rủi ro tài chính, và cấu trúc vốn để đảm bảo các quyết định chiến lược của CEO được thực hiện trên nền tảng tài chính bền vững."
      },
      {
        "question": "Sau khi hoàn thành toàn bộ Chặng CFO & Vận hành, kỹ năng thực tế nào có giá trị nhất để áp dụng vào công việc phân tích tài chính doanh nghiệp thực tế?",
        "options": [
          "Nhận diện đúng vấn đề và chọn được khung phân tích phù hợp",
          "Thuộc lòng công thức của mọi chỉ số tài chính đã học",
          "Nhớ được toàn bộ quy định pháp lý liên quan tới CFO",
          "Dựng được mô hình Excel đầy đủ cho mọi tình huống"
        ],
        "correct": 0,
        "explanation": "Giống như các chặng trước trong chương trình, giá trị thực sự không nằm ở việc ghi nhớ định nghĩa riêng lẻ, mà ở khả năng NHẬN DIỆN đúng loại vấn đề tài chính doanh nghiệp đang gặp phải và áp dụng đúng công cụ/tư duy đã học - đây là kỹ năng phân biệt một nhà phân tích tài chính doanh nghiệp thực thụ với người chỉ thuộc lòng lý thuyết."
      },
      {
        "question": "Doanh nghiệp quyết định vay thêm 500 tỷ để mở rộng. Quyết định này ảnh hưởng đến những mảng nào?",
        "options": [
          "Cả bốn: cấu trúc vốn, kế hoạch, lãi suất, thanh khoản",
          "Chỉ cấu trúc vốn, vì các mảng khác không đổi theo nợ vay",
          "Chỉ phơi nhiễm lãi suất, nếu khoản vay là lãi thả nổi",
          "Chỉ kế hoạch tài chính và nhu cầu đệm thanh khoản"
        ],
        "correct": 0,
        "explanation": "Đây chính là điểm cốt lõi của chặng: các mảng tài chính doanh nghiệp không tách rời nhau. Một quyết định ở mảng này luôn tạo hệ quả cần xử lý ở các mảng còn lại."
      },
      {
        "question": "Đâu là câu hỏi thể hiện đúng vai trò đối tác chiến lược hơn là vai trò giữ sổ sách?",
        "options": [
          "Dự án nào tạo mức sinh lời vượt chi phí vốn?",
          "Báo cáo thuế tháng trước đã nộp đúng hạn chưa?",
          "Số dư tài khoản ngân hàng cuối kỳ là bao nhiêu?",
          "Chi phí quý này đã khớp với sổ cái chưa?"
        ],
        "correct": 0,
        "explanation": "Ba câu sau đều cần thiết nhưng chỉ mô tả trạng thái đã xảy ra. Câu đầu định hình việc doanh nghiệp sẽ phân bổ nguồn lực vào đâu - tức là ảnh hưởng đến tương lai chứ không chỉ ghi lại quá khứ."
      }
    ,
    {
      "question": "Vì sao vai trò giám đốc tài chính hiện đại được mô tả là đối tác chiến lược chứ không chỉ là người giữ sổ sách?",
      "options": [
        "Vì họ phải nói được mỗi lựa chọn kinh doanh ảnh hưởng thế nào tới dòng tiền và rủi ro",
        "Vì họ chịu trách nhiệm ký duyệt toàn bộ các khoản chi tiêu của doanh nghiệp",
        "Vì công việc ghi chép sổ sách đã được phần mềm kế toán tự động hóa hoàn toàn",
        "Vì họ là người đại diện doanh nghiệp làm việc với cơ quan thuế và kiểm toán"
      ],
      "correct": 0,
      "explanation": "Giữ sổ sách trả lời câu hỏi đã xảy ra chuyện gì. Đối tác chiến lược trả lời câu hỏi nếu làm việc này thì điều gì sẽ xảy ra - với dòng tiền, với cấu trúc vốn, với khả năng chịu đựng một năm xấu. Phần thứ hai là phần không tự động hóa được."
    }
    ]
  }),
  "ngan-sach-va-du-bao-tai-chinh": patch({
    "quiz": [
      {
        "question": "Bottom-up budgeting vs Top-down budgeting là gì?",
        "options": [
          "Bottom-up: phòng ban ước tính rồi báo lên; Top-down: CEO giao xuống",
          "Bottom-up: lập theo quý; Top-down: lập theo năm tài chính",
          "Bottom-up dùng cho chi phí; Top-down dùng cho doanh thu",
          "Bottom-up do kế toán lập; Top-down do kiểm toán duyệt"
        ],
        "correct": 0,
        "explanation": "Bottom-up: phòng bán hàng báo 'chúng tôi cần 50 tỷ để đạt 100 tỷ doanh thu', phòng IT báo 'chúng tôi cần 5 tỷ để maintain hệ thống'. Top-down: CEO quyết định 'năm nay chúng ta có 30 tỷ budget chi phí, bạn chia nó như thế nào'?"
      },
      {
        "question": "Flexible Budget là gì?",
        "options": [
          "Ngân sách thay đổi theo mức hoạt động thực tế",
          "Ngân sách không đặt trần cho các khoản chi thiết yếu",
          "Ngân sách được duyệt lại vào giữa mỗi năm tài chính",
          "Ngân sách cho phép chuyển tiền giữa các khoản mục"
        ],
        "correct": 0,
        "explanation": "Flexible Budget: kế hoạch doanh thu 100 tỷ, chi phí biến đổi 40 tỷ. Nếu doanh thu thực tế 80 tỷ, chi phí biến đổi sẽ giảm xuống 32 tỷ (theo tỉ lệ). Flexible budget giúp so sánh công bằng hơn."
      },
      {
        "question": "Scenario Planning giúp gì?",
        "options": [
          "Dự báo ba kịch bản để chuẩn bị trước cho tình huống xấu",
          "Chọn ra kịch bản khả dĩ nhất rồi lập kế hoạch theo đó",
          "Mô phỏng ngẫu nhiên hàng nghìn kịch bản bằng máy tính",
          "Lập kế hoạch riêng cho từng bộ phận rồi ghép lại"
        ],
        "correct": 0,
        "explanation": "Scenario Planning: Kế hoạch base case (tăng 10%/năm), worst case (nếu thị trường suy thoái, giảm 20%), best case (nếu có đơn hàng lớn, tăng 50%). Giúp CEO chuẩn bị kế hoạch B, C nếu tình huống thay đổi."
      },
      {
        "question": "Scenario: Doanh nghiệp lập ngân sách cho 1.000 sản phẩm nhưng thực tế bán được 1.400. Flexible budget xử lý chênh lệch này thế nào?",
        "options": [
          "Tính lại chi phí biến đổi theo mức 1.400 rồi mới so",
          "Giữ nguyên ngân sách 1.000, phần vượt tính là lãng phí",
          "Nhân toàn bộ ngân sách với 1,4, cả chi phí cố định",
          "Bỏ ngân sách cũ và lập lại từ đầu cho cả năm"
        ],
        "correct": 0,
        "explanation": "Bán nhiều hơn thì chi phí nguyên vật liệu và vận chuyển tăng theo là đương nhiên, nên so thẳng với ngân sách gốc sẽ kết luận sai rằng bộ phận sản xuất tiêu quá tay. Flexible budget dựng lại mức chi phí lẽ ra phải có ở sản lượng thực tế, rồi mới đo chênh lệch."
      },
      {
        "question": "Nhược điểm chính của ngân sách lập theo hướng top-down là gì?",
        "options": [
          "Người thực thi không cam kết vì không được tham gia",
          "Mất rất nhiều thời gian tổng hợp từ các phòng ban",
          "Không thể áp dụng cho doanh nghiệp trên 100 nhân sự",
          "Luôn cho ra con số thấp hơn năng lực thật của công ty"
        ],
        "correct": 0,
        "explanation": "Top-down nhanh và bám sát chiến lược, nhưng con số được giao xuống chứ không được thương lượng, nên trưởng bộ phận coi đó là chỉ tiêu của sếp chứ không phải cam kết của mình. Chậm chạp trong tổng hợp là nhược điểm của bottom-up, hướng ngược lại."
      }
    ]
  }),
  "phan-tich-ky-thuat-cho-moi-gioi": patch({
    "quiz": [
      {
        "question": "Support & Resistance là gì?",
        "options": [
          "Support: giá thường bật lên; Resistance: giá thường bị chặn",
          "Support: vùng khối lượng lớn; Resistance: vùng khối lượng nhỏ",
          "Support: mức giá sàn do sàn giao dịch quy định trong phiên",
          "Support: giá trung bình 50 ngày; Resistance: 200 ngày"
        ],
        "correct": 0,
        "explanation": "Phân tích kỹ thuật đọc giá và khối lượng trên biểu đồ để nhận diện xu hướng cùng các vùng hỗ trợ, kháng cự. Nó không nói doanh nghiệp đáng giá bao nhiêu - đó là việc của phân tích cơ bản - mà nói thị trường đang hành xử thế nào với cổ phiếu đó. Điều quan trọng nhất khi dùng là chấp nhận rằng mọi tín hiệu chỉ là xác suất, nên điểm cắt lỗ phải được đặt trước khi vào lệnh chứ không phải quyết định sau khi giá đã đi ngược."
      },
      {
        "question": "Moving Average (MA) là gì?",
        "options": [
          "Giá trung bình của N phiên gần nhất, dịch theo thời gian",
          "Giá trung bình có trọng số theo khối lượng giao dịch",
          "Đường nối các đỉnh và đáy của giá trong một giai đoạn",
          "Mức giá mà đa số nhà đầu tư đang nắm giữ vị thế"
        ],
        "correct": 0,
        "explanation": "MA 50: giá trung bình 50 ngày gần nhất. MA 200: giá trung bình 200 ngày gần nhất. Khi MA 50 vượt lên trên MA 200 = Gold Cross (tín hiệu mua), khi MA 50 đi xuống dưới MA 200 = Death Cross (tín hiệu bán)."
      },
      {
        "question": "RSI (Relative Strength Index) ở mức nào được coi là 'quá mua' (overbought)?",
        "options": [
          "Trên 50",
          "Trên 70",
          "Trên 80",
          "Trên 100"
        ],
        "correct": 1,
        "explanation": "RSI trên 70 = cổ phiếu quá mua (overbought) → có thể đảo chiều giảm. RSI dưới 30 = quá bán (oversold) → có thể đảo chiều tăng. RSI 30-70 = normal."
      },
      {
        "question": "Vào lệnh ở 1.250, cắt lỗ 1.200, mục tiêu 1.350. Tỷ lệ rủi ro trên lợi nhuận là bao nhiêu?",
        "options": [
          "1:2 (rủi ro 50, lợi nhuận 100)",
          "1:3 (tính từ giá cắt lỗ tới mục tiêu)",
          "2:1 (lấy lợi nhuận chia rủi ro)",
          "1:1 (rủi ro 50, lợi nhuận 50)"
        ],
        "correct": 0,
        "explanation": "Rủi ro 50, lợi nhuận kỳ vọng 100, tức 1:2. Với tỷ lệ này chỉ cần đúng khoảng 40% số lần đã hòa vốn - đó là lý do cấu trúc lệnh quan trọng hơn tỷ lệ đoán đúng."
      },
      {
        "question": "Vì sao tín hiệu giao cắt của các đường trung bình mang tính trễ?",
        "options": [
          "Vì nó tính từ dữ liệu giá quá khứ",
          "Vì sàn công bố dữ liệu chậm hơn thực tế",
          "Vì phải chờ đủ khối lượng mới xác nhận",
          "Vì nó chỉ cập nhật một lần mỗi phiên"
        ],
        "correct": 0,
        "explanation": "Trung bình là hàm của quá khứ. Đây là đánh đổi cố hữu: đường càng dài thì tín hiệu càng ít nhiễu nhưng càng đến muộn."
      }
    ]
  }),





  "esg-la-gi-va-tai-sao-quan-trong": patch({
    "quiz": [
      {
        "question": "GRI (Global Reporting Initiative) và SASB (Sustainability Accounting Standards Board) khác nhau như thế nào trong cách tiếp cận báo cáo ESG?",
        "options": [
          "GRI báo cáo cho mọi bên liên quan; SASB theo trọng yếu tài chính",
          "GRI bắt buộc theo luật; SASB chỉ là khuyến nghị tự nguyện",
          "GRI đo môi trường; SASB đo quản trị và yếu tố xã hội",
          "GRI dùng ở châu Âu; SASB dùng ở thị trường Bắc Mỹ"
        ],
        "correct": 0,
        "explanation": "Đây là phân biệt quan trọng nhất trong ESG reporting: GRI hướng đến TẤT CẢ bên liên quan (stakeholder-focused, toàn diện hơn nhưng có thể ít liên quan trực tiếp đến giá trị tài chính), còn SASB hướng đến NHÀ ĐẦU TƯ (investor-focused, chỉ tập trung vào các yếu tố ESG có 'tính trọng yếu tài chính' - tức có khả năng ảnh hưởng thực sự đến dòng tiền/rủi ro của doanh nghiệp). Nhiều doanh nghiệp lớn báo cáo theo cả hai khung để phục vụ các nhóm đối tượng khác nhau."
      },
      {
        "question": "'Materiality' (tính trọng yếu) trong ESG investing có nghĩa là gì?",
        "options": [
          "Yếu tố ESG nào trọng yếu phụ thuộc vào ngành nghề",
          "Chỉ những yếu tố ESG đã được kiểm toán độc lập xác nhận",
          "Mức tối thiểu điểm ESG để được đưa vào chỉ số bền vững",
          "Yếu tố ESG có tỷ trọng lớn nhất trong bộ tiêu chí chấm"
        ],
        "correct": 0,
        "explanation": "Nguyên lý cốt lõi của phân tích ESG chuyên nghiệp: không phải mọi yếu tố ESG đều quan trọng như nhau cho mọi ngành. SASB xây dựng các bộ tiêu chuẩn RIÊNG cho từng ngành (industry-specific standards) chính vì lý do này - một công ty khai khoáng cần báo cáo chi tiết về tác động môi trường và an toàn lao động, trong khi một ngân hàng cần báo cáo chi tiết về bảo mật dữ liệu và cho vay có trách nhiệm (responsible lending)."
      },
      {
        "question": "'Greenwashing' trong ESG là gì và tại sao nhà đầu tư cần cảnh giác với nó?",
        "options": [
          "Phóng đại hoặc giả mạo cam kết ESG để làm đẹp hình ảnh",
          "Đầu tư vào dự án xanh nhưng lại không công bố ra bên ngoài",
          "Áp dụng tiêu chuẩn ESG khắt khe hơn mức quy định yêu cầu",
          "Loại bỏ toàn bộ ngành gây ô nhiễm khỏi danh mục đầu tư"
        ],
        "correct": 0,
        "explanation": "Greenwashing là rủi ro thực sự trong ESG investing: nhiều doanh nghiệp công bố các cam kết ESG mơ hồ, không có số liệu cụ thể, hoặc không được kiểm toán độc lập, chỉ nhằm mục đích marketing/PR. Nhà đầu tư ESG chuyên nghiệp phải phân biệt được cam kết THỰC CHẤT (có mục tiêu định lượng rõ ràng, lộ trình cụ thể, báo cáo tiến độ minh bạch, kiểm toán bên thứ ba) với những tuyên bố ESG chỉ mang tính hình thức."
      },
      {
        "question": "Scenario: Một công ty dầu khí công bố báo cáo dày về hoạt động thiện nguyện nhưng không nêu số liệu phát thải. Đây là dấu hiệu gì?",
        "options": [
          "Greenwashing, đánh lạc hướng khỏi vấn đề chính",
          "Materiality tốt, vì đã chọn đúng chỉ tiêu xã hội",
          "Tuân thủ GRI, vì GRI ưu tiên bên liên quan",
          "Không có vấn đề, miễn là số liệu đều chính xác"
        ],
        "correct": 0,
        "explanation": "Với một công ty dầu khí, phát thải là chỉ tiêu trọng yếu còn thiện nguyện thì không - báo cáo đầy đủ về phần thứ hai và im lặng về phần thứ nhất là chọn sân để thi đấu. Số liệu thiện nguyện có thể hoàn toàn chính xác mà bức tranh tổng thể vẫn sai lệch."
      },
      {
        "question": "Vì sao GRI và SASB cùng tồn tại thay vì gộp thành một chuẩn duy nhất?",
        "options": [
          "Vì hai chuẩn phục vụ hai nhóm người đọc khác",
          "Vì SASB chỉ áp dụng cho doanh nghiệp tại Hoa Kỳ",
          "Vì GRI đo môi trường còn SASB đo phần quản trị",
          "Vì SASB thay thế GRI từ sau năm 2020 trở đi"
        ],
        "correct": 0,
        "explanation": "GRI viết cho toàn bộ bên liên quan - cộng đồng, người lao động, khách hàng - nên bao phủ rộng. SASB viết cho nhà đầu tư nên chỉ giữ những chỉ tiêu có ảnh hưởng tài chính rõ ràng, và vì thế mỏng hơn nhiều nhưng dùng được ngay trong định giá."
      }
    ]
  }),
  "cach-danh-gia-esg-cua-doanh-nghiep": patch({
    "quiz": [
      {
        "question": "Tại sao chỉ số 'board independence' (tính độc lập của hội đồng quản trị) - tỷ lệ thành viên HĐQT không liên quan đến ban điều hành - lại là một chỉ số Governance quan trọng?",
        "options": [
          "Vì thành viên độc lập giám sát khách quan hơn",
          "Vì họ có chuyên môn tài chính sâu hơn ban điều hành",
          "Vì luật yêu cầu tối thiểu một nửa hội đồng độc lập",
          "Vì họ đại diện cho cổ đông nhỏ lẻ trong hội đồng"
        ],
        "correct": 0,
        "explanation": "Tính độc lập của HĐQT là một trong những chỉ số Governance được theo dõi chặt chẽ nhất: khi phần lớn thành viên HĐQT có quan hệ với ban điều hành (là nhân viên cũ, người thân, đối tác kinh doanh), khả năng họ giám sát khách quan và bảo vệ lợi ích cổ đông giảm đi đáng kể - đây là một trong những nguyên nhân gốc rễ của nhiều vụ bê bối tài chính doanh nghiệp lớn trong lịch sử."
      },
      {
        "question": "Scope 1, Scope 2, và Scope 3 trong báo cáo phát thải carbon (một chỉ số Environmental quan trọng) khác nhau như thế nào?",
        "options": [
          "Scope 1 trực tiếp; Scope 2 từ năng lượng mua; Scope 3 chuỗi giá trị",
          "Scope 1 là khí CO2; Scope 2 khí methane; Scope 3 các khí còn lại",
          "Scope 1 trong nước; Scope 2 khu vực; Scope 3 phạm vi toàn cầu",
          "Scope 1 bắt buộc báo cáo; Scope 2 và 3 hoàn toàn tự nguyện"
        ],
        "correct": 0,
        "explanation": "Đây là phân loại phát thải carbon chuẩn quốc tế (GHG Protocol): Scope 1 (trực tiếp từ hoạt động của công ty), Scope 2 (gián tiếp từ năng lượng mua vào), Scope 3 (gián tiếp từ toàn chuỗi giá trị - thường chiếm 70-90% tổng phát thải của nhiều doanh nghiệp nhưng khó đo lường chính xác nhất vì phụ thuộc vào dữ liệu từ hàng trăm/nghìn nhà cung cấp và cách khách hàng sử dụng sản phẩm). Nhà phân tích ESG cần kiểm tra xem doanh nghiệp có báo cáo đầy đủ cả 3 Scope hay chỉ báo cáo Scope 1-2 (dễ hơn) để né tránh con số Scope 3 lớn hơn nhiều."
      },
      {
        "question": "Chỉ số 'employee turnover rate' (tỷ lệ nghỉ việc của nhân viên) cao bất thường so với trung bình ngành có thể là dấu hiệu 'red flag' về khía cạnh ESG nào?",
        "options": [
          "Cảnh báo về Social: điều kiện làm việc, văn hóa công ty",
          "Cảnh báo về Governance: hội đồng quản trị đang thiếu độc lập",
          "Cảnh báo về Environmental: nhà máy gây ô nhiễm nội bộ",
          "Không thuộc ESG, chỉ là chỉ số nhân sự thông thường"
        ],
        "correct": 0,
        "explanation": "Tỷ lệ nghỉ việc cao bất thường là một trong những 'proxy indicator' (chỉ số gián tiếp) phổ biến để đánh giá khía cạnh Social - nó có thể phản ánh văn hóa công ty độc hại, quản lý kém, lương thưởng không cạnh tranh, hoặc áp lực công việc quá mức. Nhà phân tích ESG thường theo dõi các chỉ số 'proxy' như thế này (cùng với dữ liệu từ Glassdoor, khảo sát nhân viên) để đánh giá khía cạnh Social khi doanh nghiệp không công bố đủ chi tiết."
      },
      {
        "question": "Scenario: Cùng một công ty, MSCI xếp hạng ESG cao trong khi Sustainalytics xếp thấp. Nên hiểu thế nào?",
        "options": [
          "Hai bên cân trọng số tiêu chí khác nhau",
          "Một trong hai chắc chắn đã tính toán sai",
          "Điểm ESG không có giá trị tham khảo nào",
          "Nên lấy trung bình cộng hai điểm làm chuẩn"
        ],
        "correct": 0,
        "explanation": "Không có chuẩn mực chung nào bắt buộc các tổ chức xếp hạng dùng cùng bộ tiêu chí và cùng trọng số, nên chênh lệch là chuyện bình thường chứ không phải lỗi. Cách dùng đúng là đọc phương pháp luận đằng sau điểm số, thay vì coi con số như một dữ kiện khách quan."
      },
      {
        "question": "Phát thải Scope 3 khác Scope 1 và Scope 2 ở chỗ nào?",
        "options": [
          "Scope 3 nằm ở chuỗi cung ứng và khâu sử dụng",
          "Scope 3 chỉ tính khí thải từ nhà máy sở hữu",
          "Scope 3 là phần điện mua ngoài của doanh nghiệp",
          "Scope 3 bắt buộc công bố còn hai loại kia thì không"
        ],
        "correct": 0,
        "explanation": "Scope 1 là phát thải trực tiếp, Scope 2 là điện năng mua ngoài, còn Scope 3 gom mọi thứ nằm ngoài tầm sở hữu: nhà cung cấp, vận chuyển, và cả việc khách hàng dùng sản phẩm. Với nhiều ngành, Scope 3 chiếm phần lớn tổng phát thải nhưng lại khó đo nhất."
      }
    ]
  }),
  "esg-investing-screening-den-portfolio": patch({
    "quiz": [
      {
        "question": "Chiến lược 'Best-in-class' trong ESG investing khác với 'Exclusionary screening' như thế nào?",
        "options": [
          "Best-in-class chọn công ty ESG tốt nhất trong mỗi ngành",
          "Best-in-class chỉ đầu tư vào công ty có điểm ESG tuyệt đối cao",
          "Best-in-class chỉ áp dụng cho trái phiếu, không cho cổ phiếu",
          "Best-in-class loại bỏ hoàn toàn các ngành gây ô nhiễm"
        ],
        "correct": 0,
        "explanation": "Đây là khác biệt chiến lược quan trọng: Best-in-class cho phép nhà đầu tư vẫn có tiếp cận đến những ngành có rủi ro ESG cao (như năng lượng, khai khoáng) bằng cách chọn lọc những công ty DẪN ĐẦU về thực hành ESG trong ngành đó (ví dụ, một công ty dầu khí đầu tư mạnh vào năng lượng tái tạo và có tiêu chuẩn an toàn cao) - trong khi exclusionary screening loại bỏ hoàn toàn khả năng đầu tư vào ngành đó."
      },
      {
        "question": "Impact investing khác với ESG investing thông thường ở điểm quan trọng nào?",
        "options": [
          "Đặt mục tiêu tác động đo lường được ngang với lợi nhuận",
          "Chấp nhận lợi nhuận thấp hơn để đổi lấy hình ảnh tốt",
          "Chỉ đầu tư vào công ty niêm yết có điểm ESG cao nhất",
          "Loại bỏ mọi ngành gây hại khỏi danh mục đầu tư"
        ],
        "correct": 0,
        "explanation": "Impact investing đặt YÊU CẦU ĐO LƯỜNG TÁC ĐỘNG cụ thể (ví dụ: số tấn CO2 giảm được, số hộ gia đình được tiếp cận tài chính) làm mục tiêu SONG SONG với lợi nhuận tài chính - thường đầu tư trực tiếp vào dự án/doanh nghiệp có sứ mệnh xã hội rõ ràng (năng lượng tái tạo, tài chính vi mô, nhà ở giá rẻ). Trong khi đó, các chiến lược ESG investing khác (exclusionary, best-in-class) chủ yếu vẫn đầu tư vào cổ phiếu niêm yết thông thường, dùng ESG như một lớp phân tích rủi ro bổ sung, không nhất thiết đòi hỏi đo lường tác động xã hội trực tiếp."
      },
      {
        "question": "Green bonds (trái phiếu xanh) là công cụ tài chính bền vững hoạt động như thế nào?",
        "options": [
          "Trái phiếu thường nhưng vốn cam kết dùng cho dự án xanh",
          "Trái phiếu được miễn thuế nếu đầu tư vào năng lượng sạch",
          "Trái phiếu có lãi suất gắn với kết quả giảm phát thải",
          "Trái phiếu do tổ chức môi trường quốc tế phát hành"
        ],
        "correct": 0,
        "explanation": "Green bonds có cấu trúc tài chính (lãi suất, kỳ hạn, mức độ rủi ro tín dụng) giống hệt trái phiếu thông thường - điểm khác biệt duy nhất là CAM KẾT SỬ DỤNG VỐN cho các dự án môi trường cụ thể, với báo cáo minh bạch định kỳ (thường theo chuẩn Green Bond Principles của ICMA) về việc vốn có thực sự được dùng đúng mục đích hay không. Đây là công cụ giúp nhà đầu tư ESG tiếp cận trực tiếp các dự án bền vững qua thị trường trái phiếu, thường không có lãi suất cao hơn đáng kể so với trái phiếu thông thường cùng mức xếp hạng tín dụng."
      },
      {
        "question": "Scenario: Một quỹ muốn giữ cả ngành dầu khí trong danh mục nhưng chỉ chọn doanh nghiệp có ESG tốt nhất ngành đó. Đây là chiến lược nào?",
        "options": [
          "Best-in-class, không loại trừ ngành nào",
          "Exclusionary screening, loại hẳn ngành xấu",
          "Impact investing, đo tác động cụ thể",
          "Green bond, tài trợ dự án môi trường"
        ],
        "correct": 0,
        "explanation": "Best-in-class giữ nguyên cơ cấu ngành của danh mục và chỉ chọn lọc bên trong từng ngành, nên tránh được rủi ro lệch ngành so với chỉ số tham chiếu. Lập luận đằng sau là thưởng cho doanh nghiệp làm tốt hơn đối thủ, thay vì rút vốn khỏi cả ngành."
      },
    {
      "question": "Nhược điểm chính của chiến lược exclusionary screening là gì?",
      "options": [
        "Loại cả ngành nên danh mục lệch so với chỉ số",
        "Không thể áp dụng cho quỹ có quy mô lớn",
        "Đòi hỏi đo lường tác động rất tốn kém",
        "Chỉ dùng được với trái phiếu, không dùng cổ phiếu"
      ],
      "correct": 0,
      "explanation": "Gạt hẳn vài ngành khỏi danh mục tạo ra sai lệch cấu trúc so với chỉ số tham chiếu, nên hiệu quả sẽ lệch đáng kể trong những năm các ngành đó chạy tốt. Đó là cái giá phải trả có ý thức, và cũng là lý do best-in-class ra đời như một lựa chọn thay thế."
    }
    ]
  }),
  "bao-hiem-la-gi-mo-hinh-kinh-doanh": patch({
    "quiz": [
      {
        "question": "'Dự phòng nghiệp vụ' (technical reserves/loss reserves) trong bảo hiểm là gì và tại sao nó quan trọng?",
        "options": [
          "Khoản trích lập để đảm bảo đủ tiền bồi thường tương lai",
          "Khoản lợi nhuận giữ lại chưa chia cho cổ đông công ty",
          "Khoản dự phòng cho các khoản đầu tư bị giảm giá trị",
          "Khoản tiền gửi bắt buộc tại ngân hàng theo quy định"
        ],
        "correct": 0,
        "explanation": "Dự phòng nghiệp vụ là 'xương sống' của ngành bảo hiểm - vì hợp đồng bảo hiểm thường kéo dài nhiều năm (đặc biệt bảo hiểm nhân thọ), công ty phải trích lập đủ dự phòng để đảm bảo có tiền chi trả cho các nghĩa vụ trong tương lai, kể cả khi doanh thu phí bảo hiểm mới giảm sút. Trích lập dự phòng không đủ là nguyên nhân chính dẫn đến phá sản của nhiều công ty bảo hiểm trong lịch sử."
      },
      {
        "question": "'Adverse selection' (lựa chọn bất lợi) trong bảo hiểm là gì?",
        "options": [
          "Người rủi ro cao có xu hướng mua bảo hiểm nhiều hơn",
          "Đại lý bán bảo hiểm cho khách không phù hợp để lấy hoa hồng",
          "Người mua bảo hiểm rồi thì hành xử bất cẩn hơn trước",
          "Công ty bảo hiểm chọn lọc chỉ nhận khách rủi ro thấp"
        ],
        "correct": 0,
        "explanation": "Adverse selection là vấn đề kinh điển trong kinh tế học bảo hiểm (thông tin bất cân xứng - asymmetric information): người mua bảo hiểm thường biết rõ về tình trạng sức khỏe/rủi ro của bản thân hơn công ty bảo hiểm, dẫn đến những người rủi ro cao có động lực mua bảo hiểm mạnh hơn. Đây là lý do công ty bảo hiểm yêu cầu khám sức khỏe, khai báo tiền sử bệnh (underwriting) trước khi cấp hợp đồng - để giảm thiểu vấn đề này và định phí chính xác theo mức rủi ro thực tế của từng cá nhân."
      },
      {
        "question": "'Moral hazard' (rủi ro đạo đức) khác với adverse selection như thế nào trong ngành bảo hiểm?",
        "options": [
          "Adverse selection xảy ra trước khi mua; moral hazard sau đó",
          "Adverse selection do khách hàng; moral hazard do công ty gây ra",
          "Adverse selection đo được bằng số liệu; moral hazard thì không",
          "Adverse selection ở nhân thọ; moral hazard ở phi nhân thọ"
        ],
        "correct": 0,
        "explanation": "Đây là phân biệt thời điểm quan trọng: adverse selection là vấn đề LỰA CHỌN (ai quyết định mua bảo hiểm) xảy ra TRƯỚC khi ký hợp đồng, còn moral hazard là vấn đề HÀNH VI (người được bảo hiểm thay đổi cách hành xử) xảy ra SAU khi đã có bảo hiểm. Cả hai đều là hệ quả của thông tin bất cân xứng, và công ty bảo hiểm dùng các công cụ khác nhau để kiểm soát: underwriting kỹ lưỡng cho adverse selection, và cơ chế đồng chi trả/miễn thường (deductible, co-payment) để giảm moral hazard."
      },
      {
        "question": "Scenario: Người biết mình có bệnh nền chủ động mua bảo hiểm sức khỏe, còn người khỏe mạnh thì không mua. Hiện tượng này gọi là gì?",
        "options": [
          "Adverse selection, xảy ra trước khi ký hợp đồng",
          "Moral hazard, xảy ra sau khi đã có hợp đồng",
          "Risk pooling, cơ chế chia sẻ rủi ro cơ bản",
          "Trích lập dự phòng nghiệp vụ chưa đủ mức"
        ],
        "correct": 0,
        "explanation": "Lựa chọn bất lợi phát sinh từ chênh lệch thông tin ngay tại thời điểm mua: người mua biết về sức khỏe mình rõ hơn công ty bảo hiểm. Hệ quả là nhóm tham gia rủi ro cao hơn nhóm dân số chung, phí phải tăng, và người khỏe càng rời đi."
      },
      {
        "question": "Vì sao trích lập dự phòng nghiệp vụ thiếu lại là nguyên nhân phá sản phổ biến trong ngành bảo hiểm?",
        "options": [
          "Vì nghĩa vụ chi trả đến sau khi phí đã tiêu",
          "Vì cơ quan quản lý phạt rất nặng khi phát hiện",
          "Vì dự phòng thiếu làm giảm điểm tín nhiệm ngay",
          "Vì phí bảo hiểm sẽ phải tăng cho khách hàng mới"
        ],
        "correct": 0,
        "explanation": "Bảo hiểm thu tiền trước và trả tiền sau, có khi sau hàng chục năm, nên dòng tiền hôm nay luôn trông rất dồi dào. Trích lập thiếu khiến công ty tưởng mình đang lãi trong lúc thực chất đang tiêu vào tiền của người khác - và hóa đơn chỉ đến khi đã quá muộn."
      }
    ]
  }),
  "actuarial-science-xac-suat-thong-ke": patch({
    "quiz": [
      {
        "question": "Tại sao actuary cần kết hợp cả xác suất tử vong VÀ giá trị thời gian của tiền (time value of money) khi tính phí bảo hiểm nhân thọ, thay vì chỉ dùng xác suất đơn thuần?",
        "options": [
          "Vì khoản chi trả có thể xảy ra sau nhiều năm, cần chiết khấu",
          "Vì quy định yêu cầu tính phí theo lãi suất trái phiếu chính phủ",
          "Vì lạm phát làm mức bồi thường danh nghĩa tăng theo thời gian",
          "Vì phí thu được phải đủ trả hoa hồng cho đại lý bán hàng"
        ],
        "correct": 0,
        "explanation": "Đây là lý do 'giá trị hiện tại kỳ vọng' (expected present value) là công cụ trung tâm của actuarial science: một hợp đồng bảo hiểm nhân thọ có thể kéo dài 20-30 năm, và khoản chi trả kỳ vọng trong tương lai xa cần được chiết khấu về hiện tại để tính phí phù hợp - kết hợp cả yếu tố XÁC SUẤT (khả năng sự kiện xảy ra) và THỜI GIAN (khi nào sự kiện có khả năng xảy ra, và giá trị tiền tệ thay đổi theo thời gian như thế nào)."
      },
      {
        "question": "Bảo hiểm nhân thọ (life insurance) và bảo hiểm phi nhân thọ (non-life/general insurance, như bảo hiểm xe, nhà) khác nhau như thế nào về phương pháp định phí?",
        "options": [
          "Nhân thọ dựa vào bảng tử suất; phi nhân thọ vào tần suất tổn thất",
          "Nhân thọ chịu quản lý chặt hơn; phi nhân thọ được tự do định phí",
          "Nhân thọ do actuary định phí; phi nhân thọ do bộ phận bán hàng",
          "Nhân thọ tính theo năm; phi nhân thọ tính theo từng sự kiện"
        ],
        "correct": 0,
        "explanation": "Hai nhánh chính của actuarial science có phương pháp luận khác biệt: Life Actuary tập trung vào mô hình hóa xác suất sự kiện SỐNG/CHẾT qua thời gian dài (bảng tử suất, bảng sống sót), trong khi Non-life/P&C Actuary (Property & Casualty) tập trung vào tần suất (frequency - bao lâu xảy ra một sự kiện tổn thất) và mức độ nghiêm trọng (severity - tổn thất trung bình mỗi sự kiện) trong khung thời gian ngắn hơn, thường phải xử lý thêm yếu tố biến động cao từ thiên tai/sự kiện bất thường (catastrophe modeling)."
      },
      {
        "question": "'Bảng sống sót' (survival curve) trong actuarial science thể hiện điều gì?",
        "options": [
          "Xác suất một người ở tuổi X còn sống đến các mốc sau",
          "Số năm sống trung bình còn lại của người ở tuổi X",
          "Xác suất tử vong trong vòng một năm ở mỗi độ tuổi",
          "Tỷ lệ khách hàng duy trì hợp đồng qua từng năm"
        ],
        "correct": 0,
        "explanation": "Bảng sống sót đặc biệt quan trọng cho sản phẩm niên kim (annuity - trả tiền định kỳ chừng nào người mua còn sống, phổ biến trong kế hoạch hưu trí): ở đây, RỦI RO của công ty bảo hiểm ngược lại với bảo hiểm nhân thọ thông thường - công ty phải trả tiền CÀNG LÂU nếu người đó CÀNG SỐNG THỌ, nên actuary cần mô hình hóa chính xác xác suất sống sót qua từng năm, không chỉ xác suất tử vong."
      },
      {
        "question": "Vì sao actuary phải kết hợp xác suất tử vong với giá trị thời gian của tiền khi định phí?",
        "options": [
          "Vì phí thu hôm nay, nghĩa vụ trả ở tương lai",
          "Vì bảng tử suất chỉ đúng khi đã được chiết khấu",
          "Vì lạm phát làm xác suất tử vong thay đổi",
          "Vì cơ quan quản lý yêu cầu báo cáo cả hai chỉ số"
        ],
        "correct": 0,
        "explanation": "Một hợp đồng nhân thọ nhận phí ngay và có thể chi trả sau ba mươi năm, nên nghĩa vụ đó phải quy về hiện tại mới so được với phí. Chỉ dùng xác suất mà bỏ chiết khấu sẽ định phí quá cao và mất khách; chỉ chiết khấu mà bỏ xác suất thì không biết trả cho ai."
      },
      {
        "question": "Bảo hiểm nhân thọ khác bảo hiểm phi nhân thọ ở điểm cốt lõi nào?",
        "options": [
          "Nhân thọ có kỳ hạn dài, dùng bảng tử suất",
          "Phi nhân thọ không cần trích lập dự phòng",
          "Nhân thọ không chịu quy định về vốn tối thiểu",
          "Phi nhân thọ luôn có tỷ lệ bồi thường thấp hơn"
        ],
        "correct": 0,
        "explanation": "Hợp đồng nhân thọ kéo dài hàng chục năm nên rủi ro chính là tuổi thọ và lãi suất, tính bằng bảng tử suất. Phi nhân thọ thường tái ký từng năm, rủi ro chính là tần suất và mức độ tổn thất - hai bài toán khác nhau nên cần hai loại chuyên môn khác nhau."
      }
    ]
  }),
  "solvency-ii-quy-dinh-bao-hiem": patch({
    "quiz": [
      {
        "question": "Sự khác biệt giữa SCR (Solvency Capital Requirement) và MCR (Minimum Capital Requirement) trong Solvency II là gì?",
        "options": [
          "SCR là mức mục tiêu; MCR là ngưỡng tối thiểu tuyệt đối",
          "SCR tính theo năm; MCR tính lại theo từng quý báo cáo",
          "SCR do công ty tự tính; MCR do cơ quan quản lý áp đặt",
          "SCR cho nhân thọ; MCR cho bảo hiểm phi nhân thọ"
        ],
        "correct": 0,
        "explanation": "Đây là cấu trúc 2 tầng của Solvency II: SCR là 'vùng an toàn mong muốn' (soft threshold - vi phạm dẫn đến giám sát tăng cường và yêu cầu kế hoạch khôi phục vốn trong thời hạn nhất định), MCR là 'ranh giới sống còn' (hard threshold - vi phạm có thể dẫn đến can thiệp khẩn cấp, thậm chí thu hồi giấy phép hoạt động ngay lập tức để bảo vệ quyền lợi khách hàng đã mua bảo hiểm)."
      },
      {
        "question": "Ba trụ cột (Pillar) của Solvency II tương tự cấu trúc Basel III trong ngành ngân hàng như thế nào?",
        "options": [
          "Vốn định lượng, giám sát quản trị, và công bố thông tin",
          "Giấy phép hoạt động, báo cáo tài chính, và kiểm toán độc lập",
          "Định phí, đầu tư tài sản, và quản lý bồi thường tổn thất",
          "Vốn tối thiểu, dự phòng nghiệp vụ, và tái bảo hiểm"
        ],
        "correct": 0,
        "explanation": "Solvency II được thiết kế theo cấu trúc 3 trụ cột tương tự Basel III (khung quy định vốn ngân hàng): Pillar 1 (yêu cầu vốn định lượng - SCR/MCR), Pillar 2 (quy trình giám sát của cơ quan quản lý và hệ thống quản trị rủi ro nội bộ - ORSA, Own Risk and Solvency Assessment), Pillar 3 (yêu cầu công bố thông tin - Solvency and Financial Condition Report). Sự tương đồng này phản ánh triết lý quản lý rủi ro tài chính chung: định lượng vốn, giám sát quy trình, và minh bạch thông tin."
      },
      {
        "question": "Tại sao các quy định như Solvency II lại đặc biệt quan trọng với ngành bảo hiểm hơn nhiều ngành kinh doanh khác?",
        "options": [
          "Vì nhận tiền trước, phát sinh nghĩa vụ chi trả rất lâu sau",
          "Vì ngành bảo hiểm có tỷ suất lợi nhuận cao hơn ngành khác",
          "Vì số lượng khách hàng của một công ty bảo hiểm rất đông",
          "Vì công ty bảo hiểm nắm giữ danh mục đầu tư rất lớn"
        ],
        "correct": 0,
        "explanation": "Đặc thù 'đảo ngược chu kỳ sản xuất' (nhận tiền trước, chi trả sau, có thể cách nhau hàng chục năm) là lý do cốt lõi khiến quy định vốn bảo hiểm quan trọng: nếu không có yêu cầu trích lập dự phòng và vốn đủ mạnh, một công ty bảo hiểm có thể duy trì vẻ ngoài 'khỏe mạnh về tài chính' trong nhiều năm (thu phí đều đặn, ít chi trả) trong khi thực chất đang bán các hợp đồng với mức phí không đủ để trang trải nghĩa vụ tương lai - rủi ro này chỉ 'phát nổ' nhiều năm sau, khi hàng loạt khách hàng cần chi trả cùng lúc mà công ty không còn đủ nguồn lực."
      },
      {
        "question": "Một công ty bảo hiểm rơi xuống dưới ngưỡng MCR. Hệ quả nghiêm trọng hơn so với rơi dưới SCR thế nào?",
        "options": [
          "Có thể bị can thiệp khẩn cấp hoặc thu giấy phép",
          "Chỉ phải nộp thêm báo cáo giải trình định kỳ",
          "Được gia hạn 5 năm để bổ sung phần vốn thiếu",
          "Không khác gì nhau, hai ngưỡng cùng một hệ quả pháp lý"
        ],
        "correct": 0,
        "explanation": "SCR là mức vốn mong muốn: xuống dưới thì phải trình kế hoạch khôi phục nhưng vẫn hoạt động bình thường. MCR là sàn tuyệt đối, xuống dưới nghĩa là khả năng chi trả cho người mua bảo hiểm đã bị đe dọa, nên cơ quan quản lý can thiệp ngay."
      },
      {
        "question": "Vì sao quy định về vốn lại đặc biệt quan trọng với ngành bảo hiểm?",
        "options": [
          "Vì khách trả tiền trước, nhận dịch vụ nhiều năm sau",
          "Vì ngành bảo hiểm có biên lợi nhuận cao bất thường",
          "Vì hợp đồng bảo hiểm không thể hủy giữa chừng",
          "Vì bảo hiểm không chịu giám sát của ngân hàng nhà nước"
        ],
        "correct": 0,
        "explanation": "Người mua bảo hiểm nhân thọ giao tiền hôm nay để đổi lấy lời hứa thực hiện sau ba mươi năm, và họ không có cách nào tự kiểm tra công ty còn đủ khả năng hay không. Quy định vốn đứng thay cho sự kiểm tra đó - đây là bảo vệ người tiêu dùng chứ không chỉ là ổn định hệ thống."
      }
    ]
  }),
  "derivatives-la-gi": patch({
    "quiz": [
      {
        "question": "Ai là người dùng phái sinh một cách hợp pháp và có ích cho nền kinh tế thực?",
        "options": [
          "Doanh nghiệp thực dùng để phòng hộ giá đầu vào đầu ra",
          "Nhà đầu cơ dùng đòn bẩy cao để khuếch đại lợi nhuận kỳ vọng",
          "Ngân hàng dùng để tăng lợi nhuận từ hoạt động tự doanh",
          "Nhà đầu tư cá nhân dùng thay cho việc mua cổ phiếu trực tiếp"
        ],
        "correct": 0,
        "explanation": "Mục đích gốc của phái sinh là hedging - giúp doanh nghiệp thực (không phải tài chính) giảm rủi ro giá cả, tỷ giá, lãi suất trong hoạt động kinh doanh cốt lõi. Vấn đề chỉ nảy sinh khi phái sinh bị dùng để đầu cơ với đòn bẩy quá cao."
      },
      {
        "question": "Nếu một nông dân dùng forward contract để chốt giá bán nông sản trước vụ mùa, đây có phải một dạng phái sinh dù không liên quan gì đến thị trường tài chính phức tạp?",
        "options": [
          "Có, vì giá trị hợp đồng bắt nguồn từ giá nông sản",
          "Không, vì nông dân không giao dịch trên sàn tài chính",
          "Không, vì phái sinh phải có tổ chức tài chính đứng giữa",
          "Có, nhưng chỉ khi hợp đồng được đăng ký với cơ quan quản lý"
        ],
        "correct": 0,
        "explanation": "Định nghĩa phái sinh không phụ thuộc vào độ phức tạp hay đối tượng sử dụng - bất kỳ hợp đồng nào có giá trị bắt nguồn từ một tài sản cơ sở khác đều là phái sinh, từ hợp đồng nông sản đơn giản đến CDS phức tạp của phố Wall."
      },
      {
        "question": "Điều gì làm một công cụ trở thành phái sinh?",
        "options": [
          "Giá trị của nó bắt nguồn từ một tài sản khác",
          "Nó được giao dịch trên sàn có thanh toán bù trừ",
          "Nó cho phép nhà đầu tư sử dụng đòn bẩy tài chính",
          "Nó có ngày đáo hạn cố định ghi trong hợp đồng"
        ],
        "correct": 0,
        "explanation": "Định nghĩa nằm ở chữ phái sinh: giá trị được dẫn xuất từ thứ khác. Đòn bẩy, sàn giao dịch, ngày đáo hạn đều là đặc điểm thường gặp chứ không phải điều kiện."
      },
      {
        "question": "Bốn nhóm phái sinh cơ bản là gì?",
        "options": [
          "Forward, futures, option và swap là bốn nhóm",
          "Cổ phiếu, trái phiếu, quỹ và tiền gửi",
          "Hedging, đầu cơ, kinh doanh chênh lệch và bảo hiểm",
          "Hàng hóa, tiền tệ, lãi suất và tín dụng"
        ],
        "correct": 0,
        "explanation": "Hàng hóa, tiền tệ, lãi suất và tín dụng là các loại tài sản cơ sở chứ không phải loại hợp đồng; hedging, đầu cơ và kinh doanh chênh lệch là các mục đích sử dụng. Bốn cấu trúc hợp đồng cơ bản kết hợp với mọi loại tài sản cơ sở tạo ra toàn bộ thị trường phái sinh."
      },
      {
        "question": "Vì sao phái sinh vừa bị coi là công cụ hữu ích vừa bị coi là nguy hiểm?",
        "options": [
          "Vì cùng một hợp đồng có thể dùng để giảm hoặc để tạo rủi ro",
          "Vì chỉ tổ chức tài chính lớn mới hiểu được cách vận hành",
          "Vì quy định quản lý phái sinh khác nhau giữa các quốc gia",
          "Vì giá phái sinh thường lệch khỏi giá tài sản cơ sở rất xa"
        ],
        "correct": 0,
        "explanation": "Một hợp đồng futures dầu giúp hãng bay ổn định chi phí, và cũng chính hợp đồng đó cho phép một quỹ đặt cược đòn bẩy hai mươi lần vào giá dầu. Công cụ không quyết định, mục đích sử dụng mới quyết định."
      }
    ]
  }),
  "futures-contract-la-gi": patch({
    "quiz": [
      {
        "question": "Mark-to-market trong futures nghĩa là gì?",
        "options": [
          "Sàn tính lại lãi lỗ và ghi vào tài khoản mỗi ngày",
          "Giá hợp đồng được cố định lại vào cuối mỗi phiên giao dịch",
          "Nhà đầu tư phải nhận hàng thật khi hợp đồng đáo hạn",
          "Sàn công bố giá tham chiếu cho phiên giao dịch hôm sau"
        ],
        "correct": 0,
        "explanation": "Mỗi ngày, sàn giao dịch tính lại giá trị hợp đồng theo giá thị trường hiện tại (mark-to-market), cộng/trừ lãi lỗ vào tài khoản ký quỹ của nhà đầu tư ngay lập tức. Nếu tài khoản xuống dưới mức ký quỹ tối thiểu, nhà đầu tư phải nộp thêm tiền (margin call) hoặc bị đóng vị thế."
      },
      {
        "question": "Một nhà đầu cơ mua futures dầu thô mà không hề có nhu cầu sử dụng dầu thực tế, chỉ để kiếm lời từ biến động giá. Khi hợp đồng gần đáo hạn, họ phải làm gì để tránh phải nhận giao hàng vật lý 1.000 thùng dầu?",
        "options": [
          "Bán một hợp đồng tương tự để đóng vị thế trước đáo hạn",
          "Đăng ký với sàn để được miễn nghĩa vụ nhận hàng vật lý",
          "Chuyển nhượng hợp đồng cho một nhà máy lọc dầu có nhu cầu",
          "Nộp phí hủy hợp đồng theo biểu phí của sàn giao dịch"
        ],
        "correct": 0,
        "explanation": "Tính thanh khoản cao của futures cho phép nhà đầu tư đóng vị thế bất kỳ lúc nào trước đáo hạn bằng giao dịch ngược chiều - đây là lý do đại đa số hợp đồng futures hàng hóa (ước tính trên 97%) không bao giờ dẫn đến giao hàng vật lý thực sự, chỉ có ý nghĩa tài chính thuần túy với phần lớn người tham gia."
      },
      {
        "question": "Futures khác forward ở điểm cốt lõi nào?",
        "options": [
          "Futures chuẩn hóa và có trung tâm thanh toán bù trừ",
          "Futures chỉ dùng cho hàng hóa còn forward cho tiền tệ",
          "Futures không có ngày đáo hạn còn forward thì có",
          "Futures do doanh nghiệp phát hành, forward do ngân hàng"
        ],
        "correct": 0,
        "explanation": "Chuẩn hóa cho thanh khoản, thanh toán bù trừ cho an toàn đối tác. Đổi lại là mất khả năng tùy chỉnh số lượng và ngày giao - đây chính là đánh đổi phân biệt hai công cụ."
      },
      {
        "question": "Margin call trong futures xảy ra khi nào?",
        "options": [
          "Khi số dư ký quỹ rơi xuống dưới mức duy trì",
          "Khi hợp đồng còn dưới ba mươi ngày là đáo hạn",
          "Khi giá tài sản cơ sở biến động quá năm phần trăm",
          "Khi nhà đầu tư muốn tăng quy mô vị thế đang nắm"
        ],
        "correct": 0,
        "explanation": "Mark-to-market hằng ngày làm lãi lỗ hiện thực hóa liên tục. Chuỗi phiên bất lợi rút cạn ký quỹ, và khi chạm ngưỡng duy trì thì phải nộp thêm ngay - nếu không, vị thế bị đóng đúng lúc bất lợi nhất."
      },
      {
        "question": "Vì sao mark-to-market hằng ngày làm giảm rủi ro đối tác?",
        "options": [
          "Vì khoản lỗ được thanh toán ngay thay vì dồn tới đáo hạn",
          "Vì sàn giao dịch đứng ra bảo lãnh toàn bộ giá trị hợp đồng",
          "Vì nhà đầu tư không được phép giữ vị thế quá một tháng",
          "Vì giá hợp đồng được điều chỉnh về đúng giá thị trường"
        ],
        "correct": 0,
        "explanation": "Với forward, khoản lỗ tích tụ âm thầm tới ngày đáo hạn rồi mới lộ ra là bên kia không trả nổi. Futures buộc kết toán mỗi ngày, nên khoản nợ chưa bao giờ kịp lớn tới mức nguy hiểm."
      }
    ]
  }),
  "call-option-la-gi": patch({
    "quiz": [
      {
        "question": "Nếu giá cổ phiếu X chỉ đạt 48.000đ khi đáo hạn (thấp hơn strike 50.000đ), người mua call option sẽ làm gì?",
        "options": [
          "Thực hiện quyền mua ở 50.000đ rồi bán ngay ra thị trường",
          "Không thực hiện quyền, chấp nhận mất premium đã trả",
          "Yêu cầu người bán hoàn lại premium vì option hết giá trị",
          "Gia hạn hợp đồng để chờ giá phục hồi"
        ],
        "correct": 1,
        "explanation": "Đây chính là ý nghĩa của 'quyền, không phải nghĩa vụ'. Nếu thực hiện quyền mua ở 50.000đ trong khi giá thị trường chỉ 48.000đ là bất lợi, người mua đơn giản không thực hiện - rủi ro tối đa chỉ giới hạn ở khoản premium đã trả, không bao giờ lỗ thêm."
      },
      {
        "question": "Vì sao người mua call option chỉ có rủi ro giới hạn (bằng premium đã trả) nhưng người bán (writer) call option lại có rủi ro về mặt lý thuyết là VÔ HẠN?",
        "options": [
          "Vì người bán không được đóng vị thế trước ngày đáo hạn",
          "Vì người bán phải nộp ký quỹ bổ sung không giới hạn cho sàn",
          "Vì giá cổ phiếu có thể tăng không giới hạn trên lý thuyết",
          "Vì phí giao dịch của người bán tăng theo biến động giá"
        ],
        "correct": 2,
        "explanation": "Đây là sự bất đối xứng rủi ro nổi tiếng trong option: người mua call có lãi tiềm năng vô hạn, lỗ giới hạn ở premium; người bán call (writer) có lãi giới hạn ở premium nhận được, nhưng lỗ tiềm năng vô hạn nếu giá cổ phiếu tăng mạnh - đây là lý do bán \"naked call\" (không có cổ phiếu bảo chứng) được xem là chiến lược cực kỳ rủi ro."
      },
      {
        "question": "Mua call strike 50.000đ, premium 3.000đ. Giá đáo hạn 58.000đ. Lãi ròng bao nhiêu?",
        "options": [
          "11.000đ (= 58.000 − 50.000 + 3.000, cộng premium)",
          "8.000đ (= 58.000 − 50.000, quên trừ premium)",
          "3.000đ (bằng premium đã trả)",
          "5.000đ (= 58.000 − 50.000 − 3.000 premium)"
        ],
        "correct": 3,
        "explanation": "Giá trị nội tại lúc đáo hạn là 8.000đ, trừ premium 3.000đ đã trả từ đầu còn lãi ròng 5.000đ. Điểm hòa vốn của call là strike cộng premium, ở đây là 53.000đ."
      },
      {
        "question": "Người mua call cần giá tăng bao nhiêu mới bắt đầu có lãi?",
        "options": [
          "Vượt strike cộng thêm phần premium đã trả",
          "Vượt đúng mức strike price",
          "Vượt giá thị trường tại thời điểm mua option",
          "Vượt strike trừ đi phần premium đã trả trước"
        ],
        "correct": 0,
        "explanation": "Đây là lý do phần lớn option hết hạn vô giá trị: đoán đúng hướng vẫn chưa đủ, giá phải đi đủ xa để bù premium, và phải đi trước ngày đáo hạn."
      },
      {
        "question": "Vì sao bán call khi đang nắm cổ phiếu ít rủi ro hơn bán call trần?",
        "options": [
          "Vì premium nhận được cao hơn",
          "Vì đã có sẵn cổ phiếu để giao nếu bị thực hiện quyền",
          "Vì sàn giao dịch không yêu cầu ký quỹ trong trường hợp này",
          "Vì người mua không được thực hiện quyền với call có bảo đảm"
        ],
        "correct": 1,
        "explanation": "Bán call trần thì giá tăng bao nhiêu cũng phải mua giá thị trường để giao - lỗ không có trần. Nắm sẵn cổ phiếu biến rủi ro vô hạn đó thành chi phí cơ hội: bỏ lỡ phần tăng trên strike."
      }
    ]
  }),
  "intrinsic-value-time-value": patch({
    "quiz": [
      {
        "question": "Vào đúng ngày đáo hạn, Time Value của một option sẽ bằng bao nhiêu?",
        "options": [
          "Bằng 0, vì không còn thời gian để giá biến động thêm",
          "Bằng đúng phần chênh lệch giữa giá thị trường và strike",
          "Bằng premium ban đầu trừ đi giá trị nội tại hiện tại",
          "Không xác định được nếu chưa biết độ biến động của cổ phiếu"
        ],
        "correct": 0,
        "explanation": "Time decay (theta): Time Value giảm dần đều theo thời gian và về 0 chính xác vào lúc đáo hạn. Đây là lý do người bán option (option writers) thường có lợi thế thời gian - mỗi ngày trôi qua, Time Value họ cần trả giảm dần, có lợi cho vị thế bán."
      },
      {
        "question": "Một call option đang sâu trong trạng thái in-the-money (giá cổ phiếu cao hơn nhiều so với strike price) và gần đến ngày đáo hạn. Tỷ trọng giữa Intrinsic Value và Time Value trong tổng giá option lúc này sẽ như thế nào?",
        "options": [
          "Giá trị nội tại chiếm gần hết, giá trị thời gian gần bằng 0",
          "Giá trị thời gian chiếm phần lớn vì biến động vẫn còn cao",
          "Hai thành phần chia đôi gần bằng nhau trong tổng premium",
          "Không xác định được nếu chưa biết mức độ biến động ngụ ý"
        ],
        "correct": 0,
        "explanation": "Khi option sâu trong trạng thái ITM và gần đáo hạn, hầu như chắc chắn sẽ được thực hiện quyền - điều này làm giảm mạnh \"giá trị của sự bất định\" (Time Value), khiến giá option gần như chỉ còn phản ánh đúng Intrinsic Value, một hiện tượng gọi là \"time decay\" tăng tốc gần đáo hạn."
      },
      {
        "question": "Put strike 60.000đ, cổ phiếu đang 55.000đ, premium 7.000đ. Time Value bằng bao nhiêu?",
        "options": [
          "2.000đ (= 7.000 − giá trị nội tại 5.000)",
          "5.000đ (= 60.000 − 55.000, chính là nội tại)",
          "7.000đ (toàn bộ premium là giá trị thời gian)",
          "12.000đ (= 7.000 + 5.000, cộng hai phần lại)"
        ],
        "correct": 0,
        "explanation": "Nội tại của put = max(strike − giá, 0) = 5.000đ. Time Value là phần còn lại của premium: 7.000 − 5.000 = 2.000đ, và chính 2.000đ này sẽ tan hết vào ngày đáo hạn."
      },
      {
        "question": "Vì sao người bán option thường được nói là có lợi thế thời gian?",
        "options": [
          "Vì mỗi ngày trôi qua, giá trị thời gian họ gánh giảm dần",
          "Vì họ được nhận thêm premium theo từng ngày nắm giữ vị thế",
          "Vì họ có quyền đóng vị thế bất cứ lúc nào mà không mất phí",
          "Vì giá cổ phiếu có xu hướng đứng yên trong phần lớn thời gian"
        ],
        "correct": 0,
        "explanation": "Time decay chạy về phía người bán một cách máy móc: không cần đoán đúng hướng giá, chỉ cần thời gian trôi. Đổi lại họ nhận rủi ro lớn khi giá chạy mạnh."
      },
      {
        "question": "Option ở trạng thái ngang tiền có đặc điểm gì về giá trị thời gian?",
        "options": [
          "Giá trị thời gian cao nhất so với các strike khác",
          "Giá trị thời gian bằng 0 vì giá trị nội tại cũng bằng 0",
          "Giá trị thời gian thấp nhất vì không có lãi khi thực hiện",
          "Giá trị thời gian bằng đúng một nửa của tổng premium"
        ],
        "correct": 0,
        "explanation": "Ngang tiền là điểm bất định nhất - chỉ cần giá nhích một chút là đổi từ có lãi sang không. Chính sự bất định đó là thứ giá trị thời gian định giá, nên nó đạt đỉnh ở đây."
      }
    ]
  }),
  "hedging-la-gi": patch({
    "quiz": [
      {
        "question": "Điều kiện để một giao dịch phái sinh được xem là hedging thuần túy?",
        "options": [
          "Phải có rủi ro thực và vị thế đi ngược chiều nó",
          "Phải được hội đồng quản trị phê duyệt bằng văn bản",
          "Phải có lãi ròng dương trên hợp đồng phái sinh",
          "Phải dùng công cụ niêm yết trên sàn giao dịch"
        ],
        "correct": 0,
        "explanation": "Bản chất hedging là có một exposure (rủi ro) có sẵn, và vị thế phái sinh đi NGƯỢC chiều với exposure đó để triệt tiêu rủi ro. Nếu không có exposure nền tảng mà vẫn giao dịch phái sinh chỉ để kiếm lời từ biến động giá, đó là đầu cơ (speculation), không phải hedging."
      },
      {
        "question": "Một công ty xuất khẩu Việt Nam ký hợp đồng bán hàng bằng USD, nhận thanh toán sau 3 tháng. Họ có nên hedge 100% giá trị hợp đồng này bằng forward tỷ giá không, hay nên để một phần không hedge?",
        "options": [
          "Tỷ lệ hedge là lựa chọn chiến lược, không có số đúng",
          "Chỉ nên hedge khi dự báo tỷ giá sẽ đi ngược hướng",
          "Không nên hedge vì tỷ giá VND khá ổn định lâu nay",
          "Phải hedge đúng 100% giá trị hợp đồng xuất khẩu"
        ],
        "correct": 0,
        "explanation": "Quyết định tỷ lệ hedge là một lựa chọn chiến lược, không phải công thức cố định - phụ thuộc vào mức độ chấp nhận rủi ro, tầm quan trọng của việc dự đoán chính xác dòng tiền, và quan điểm về hướng biến động tỷ giá tương lai của ban lãnh đạo doanh nghiệp."
      },
      {
        "question": "Hãng bay chốt giá dầu 80 USD/thùng, sau đó giá rơi về 60. Kết quả kinh tế thế nào?",
        "options": [
          "Chi phí thực là 70 USD, trung bình của hai mức giá",
          "Chi phí thực là 60 USD vì mua theo giá thị trường",
          "Chi phí thực là 100 USD vì cộng thêm khoản lỗ hợp đồng",
          "Chi phí thực vẫn đúng 80 USD, đúng như mục tiêu hedge"
        ],
        "correct": 3,
        "explanation": "Mua thật tốn 60, lỗ hợp đồng 20, tổng vẫn là 80 - đúng mức đã chốt. Nhưng báo cáo chỉ ghi rõ khoản lỗ 20, còn phần chắc chắn có được thì không nằm ở dòng nào."
      },
      {
        "question": "Vì sao khoản lỗ trên hợp đồng hedge không có nghĩa là hedge sai?",
        "options": [
          "Vì hedge là đổi phần được lấy phần mất",
          "Vì lỗ hedge được ghi nhận vào chi phí tài chính",
          "Vì hedge chỉ hiệu quả trong dài hạn nhiều năm",
          "Vì phí giao dịch phái sinh luôn khá cao"
        ],
        "correct": 0,
        "explanation": "Hedge đúng nghĩa là từ bỏ chiều tốt để loại chiều xấu. Ban lãnh đạo dừng chương trình sau một năm lỗ thường là lúc rủi ro quay lại đúng vào thời điểm tệ nhất."
      },
      {
        "question": "Basis risk trong hedging là gì?",
        "options": [
          "Rủi ro tài sản phòng hộ không khớp hẳn rủi ro thật",
          "Rủi ro giá cơ sở biến động mạnh hơn dự kiến ban đầu",
          "Rủi ro không đủ tiền ký quỹ khi thị trường bất lợi",
          "Rủi ro đối tác không thực hiện nghĩa vụ hợp đồng"
        ],
        "correct": 0,
        "explanation": "Hãng bay dùng futures dầu thô để phòng hộ nhiên liệu bay - hai loại giá đi cùng chiều nhưng không khớp hoàn toàn. Phần chênh lệch đó là rủi ro còn lại sau khi đã phòng hộ."
      }
    ]
  }),
  "speculation-la-gi": patch({
    "quiz": [
      {
        "question": "Vì sao speculation với phái sinh rủi ro cao hơn speculation bằng cổ phiếu thông thường?",
        "options": [
          "Vì ký quỹ chỉ 5-15% nên đòn bẩy lên tới bảy đến hai mươi lần",
          "Vì phái sinh không được cơ quan quản lý giám sát chặt chẽ",
          "Vì giá phái sinh biến động mạnh hơn giá cổ phiếu cơ sở",
          "Vì phái sinh bắt buộc phải nắm giữ tới ngày đáo hạn"
        ],
        "correct": 0,
        "explanation": "Margin trong futures/options thường chỉ 5-15% giá trị hợp đồng - đòn bẩy 7-20 lần. Biến động giá nhỏ trên tài sản cơ sở tạo ra biến động lớn gấp nhiều lần trên vốn đã bỏ ra, có thể mất trắng hoặc thậm chí nợ thêm tiền nếu không quản trị rủi ro chặt chẽ."
      },
      {
        "question": "Vì sao các quỹ đầu cơ (hedge fund) đôi khi bị chỉ trích là làm tăng thêm bất ổn thị trường, dù về lý thuyết speculation cũng cung cấp thanh khoản có ích cho thị trường?",
        "options": [
          "Vì đòn bẩy cao và vị thế tập trung khuếch đại biến động",
          "Vì quỹ đầu cơ không cung cấp thanh khoản cho thị trường",
          "Vì quỹ đầu cơ chỉ giao dịch với nhau chứ không với thị trường",
          "Vì quỹ đầu cơ được miễn mọi nghĩa vụ công bố thông tin"
        ],
        "correct": 0,
        "explanation": "Đây là sự cân bằng phức tạp: speculation vừa cung cấp thanh khoản cần thiết cho thị trường (ai đó phải sẵn sàng nhận rủi ro mà bên hedging muốn chuyển giao), vừa có thể khuếch đại bất ổn khi đòn bẩy cao và vị thế tập trung dẫn đến các đợt thanh lý hàng loạt gây biến động cực đoan."
      },
      {
        "question": "Ký quỹ 10%, giá tài sản cơ sở giảm 10%. Vốn của nhà đầu cơ thay đổi thế nào?",
        "options": [
          "Mất toàn bộ vốn (= 10% × đòn bẩy 10 lần)",
          "Mất 10% vốn, đúng bằng mức giảm của tài sản",
          "Mất 1% vốn (= 10% × 10%, nhân hai tỷ lệ)",
          "Không mất gì nếu giữ vị thế tới khi giá phục hồi"
        ],
        "correct": 0,
        "explanation": "Đòn bẩy 1/0,10 = 10 lần, nên 10% biến động giá xóa sạch vốn. Thực tế còn tệ hơn: margin call ập đến trước khi chạm 100%, buộc nộp thêm hoặc bị đóng vị thế ngay tại đáy."
      },
      {
        "question": "Điểm khác biệt duy nhất giữa hedging và speculation là gì?",
        "options": [
          "Có hay không một rủi ro nền tảng cần được bảo vệ",
          "Loại công cụ phái sinh được sử dụng trong giao dịch",
          "Quy mô vốn và mức đòn bẩy áp dụng cho vị thế",
          "Giao dịch qua sàn tập trung hay thỏa thuận song phương"
        ],
        "correct": 0,
        "explanation": "Cùng một hợp đồng futures dầu: hãng bay mua là hedge, quỹ mua là đầu cơ. Công cụ giống hệt nhau, khác nhau ở chỗ có exposure sẵn để triệt tiêu hay không."
      },
      {
        "question": "Vì sao speculation vẫn có vai trò cần thiết cho thị trường?",
        "options": [
          "Vì phải có ai đó sẵn sàng nhận rủi ro mà bên hedge chuyển đi",
          "Vì nó giúp giá phái sinh luôn cao hơn giá tài sản cơ sở",
          "Vì cơ quan quản lý yêu cầu tỷ lệ nhà đầu cơ tối thiểu trên sàn",
          "Vì nó làm giảm chi phí giao dịch cho doanh nghiệp phòng hộ"
        ],
        "correct": 0,
        "explanation": "Hedging là chuyển rủi ro, không phải xóa rủi ro - nó phải đi đâu đó. Không có bên sẵn sàng nhận, hãng bay sẽ không tìm được ai bán futures cho mình ở mức giá hợp lý."
      }
    ]
  }),
  "swap-la-gi": patch({
    "quiz": [
      {
        "question": "Notional principal trong một hợp đồng swap có được hai bên thực sự trao đổi cho nhau không?",
        "options": [
          "Không, nó chỉ là cơ sở để tính phần lãi phải trả nhau",
          "Có, hai bên trao đổi toàn bộ gốc ngay khi ký hợp đồng",
          "Có, nhưng chỉ trao đổi một lần vào ngày đáo hạn",
          "Không, vì notional chỉ là con số ghi trong hợp đồng mẫu"
        ],
        "correct": 0,
        "explanation": "Trong Interest Rate Swap thông thường, notional principal (ví dụ 100 tỷ đồng) không đổi tay - nó chỉ là cơ sở để tính lãi suất cố định và thả nổi mỗi bên nợ nhau. Cuối kỳ, chỉ phần chênh lệch (net) được thanh toán, giảm đáng kể rủi ro đối tác so với việc chuyển toàn bộ notional."
      },
      {
        "question": "Nếu lãi suất thị trường biến động rất mạnh trong thời gian một hợp đồng swap còn hiệu lực, ai là bên có lợi và ai là bên chịu bất lợi trong một Interest Rate Swap điển hình (một bên trả cố định, một bên trả thả nổi)?",
        "options": [
          "Bên trả cố định lợi khi lãi suất tăng, thiệt khi lãi suất giảm",
          "Cả hai bên cùng lợi vì rủi ro đã được chia đều cho nhau",
          "Bên trả thả nổi luôn lợi vì lãi suất dài hạn thường tăng",
          "Không bên nào lợi vì swap được thiết kế để trung lập"
        ],
        "correct": 0,
        "explanation": "Swap về bản chất là một trò chơi có tổng bằng không (zero-sum) giữa hai bên đối với biến động lãi suất - một bên luôn có lợi khi lãi suất di chuyển theo một hướng, bên còn lại chịu bất lợi tương ứng, đây chính là lý do các bên tham gia swap có kỳ vọng khác nhau về hướng lãi suất tương lai."
      },
      {
        "question": "Notional 200 tỷ, cố định 6%, thả nổi kỳ này 4,5%, kỳ hạn nửa năm. Ai chuyển bao nhiêu?",
        "options": [
          "Bên trả cố định chuyển 1,5 tỷ (= 200 × 1,5% × 0,5 năm)",
          "Bên trả thả nổi chuyển 1,5 tỷ cho bên trả cố định kia",
          "Bên trả cố định chuyển 3 tỷ (= 200 × 1,5%, cả năm)",
          "Hai bên trao đổi toàn bộ 200 tỷ theo hợp đồng"
        ],
        "correct": 0,
        "explanation": "Chênh 1,5 điểm phần trăm trên 200 tỷ trong nửa năm là 1,5 tỷ, và bên trả cố định là bên chịu vì mức cố định đang cao hơn thả nổi. Chỉ phần chênh lệch đổi tay, không phải notional."
      },
      {
        "question": "Vì sao swap giảm rủi ro đối tác so với việc trao đổi cả gốc?",
        "options": [
          "Vì chỉ phần chênh lệch nhỏ mới thực sự chuyển giao",
          "Vì swap luôn có tài sản bảo đảm kèm theo hợp đồng",
          "Vì trung tâm thanh toán bù trừ bảo lãnh toàn bộ giao dịch",
          "Vì hai bên có thể hủy hợp đồng bất cứ lúc nào không mất phí"
        ],
        "correct": 0,
        "explanation": "Notional 100 tỷ nhưng thanh toán ròng mỗi kỳ chỉ vài trăm triệu. Nếu phải trao đổi cả gốc hai chiều, rủi ro đối tác sẽ lớn hơn hàng trăm lần cho cùng một mục đích kinh tế."
      },
      {
        "question": "Doanh nghiệp vay thả nổi muốn chuyển sang cố định. Họ ký swap thế nào?",
        "options": [
          "Nhận thả nổi và trả cố định cho swap dealer",
          "Trả thả nổi và nhận cố định từ swap dealer",
          "Trả cả cố định lẫn thả nổi rồi nhận lại phần chênh",
          "Tất toán khoản vay cũ rồi vay mới với lãi suất cố định"
        ],
        "correct": 0,
        "explanation": "Chân thả nổi nhận được triệt tiêu đúng phần thả nổi đang phải trả cho ngân hàng, còn lại là nghĩa vụ cố định. Khoản vay gốc không đụng tới - đó là ưu điểm chính của cách làm này."
      }
    ]
  }),
  "interest-rate-swap-chuyen-sau": patch({
    "quiz": [
      {
        "question": "Ai thường là bên đối tác cung cấp Interest Rate Swap cho doanh nghiệp?",
        "options": [
          "Ngân hàng đầu tư lớn đóng vai trò tạo lập thị trường",
          "Cơ quan quản lý thị trường tài chính của mỗi quốc gia",
          "Các doanh nghiệp khác có nhu cầu lãi suất ngược chiều",
          "Quỹ đầu tư trái phiếu chuyên về công cụ lãi suất"
        ],
        "correct": 0,
        "explanation": "Các ngân hàng đầu tư lớn (Goldman Sachs, JP Morgan, HSBC...) đóng vai trò swap dealer, sẵn sàng làm đối tác cho cả hai chiều của swap, kiếm lợi nhuận từ chênh lệch giá (bid-ask spread) giữa lãi suất cố định và thả nổi họ báo giá."
      },
      {
        "question": "Một ngân hàng có nhiều khoản cho vay lãi suất thả nổi nhưng lại huy động vốn bằng tiền gửi lãi suất cố định. Rủi ro chính họ đang đối mặt là gì, và IRS có thể giúp gì?",
        "options": [
          "Lãi suất giảm làm biên lãi thu hẹp, IRS chuyển thu nhập sang cố định",
          "Lãi suất tăng làm chi phí huy động vọt lên, IRS khóa chi phí lại",
          "Không có rủi ro nào vì cho vay và huy động đã cân bằng nhau",
          "Rủi ro thanh khoản khi người gửi rút tiền, IRS bổ sung vốn ngay"
        ],
        "correct": 0,
        "explanation": "Đây là ứng dụng thực tế phổ biến của IRS trong quản trị rủi ro lãi suất ngân hàng (asset-liability management) - khớp đúng đặc tính lãi suất giữa tài sản (cho vay) và nợ phải trả (tiền gửi) giúp ổn định biên lợi nhuận ngân hàng trước biến động lãi suất thị trường."
      },
      {
        "question": "Vay SOFR + 2%, ký IRS nhận SOFR trả 5% cố định. Chi phí ròng bằng bao nhiêu?",
        "options": [
          "7% cố định (= 2% biên + 5% chân cố định)",
          "5% cố định (= chân cố định, biên đã được swap xử lý)",
          "3% cố định (= 5% − 2%, trừ biên ra khỏi chân cố định)",
          "Vẫn thả nổi vì khoản vay gốc không hề thay đổi"
        ],
        "correct": 0,
        "explanation": "SOFR ở hai vế triệt tiêu nhau, còn lại 2% biên của ngân hàng cho vay cộng 5% trả cho dealer. Phần biên 2% là thứ swap không xử lý được - nó gắn với rủi ro tín dụng của chính doanh nghiệp."
      },
      {
        "question": "Vì sao IRS được ưa chuộng hơn việc tất toán khoản vay cũ để vay lại lãi cố định?",
        "options": [
          "Vì không phải trả phí trả nợ trước hạn và đàm phán lại từ đầu",
          "Vì lãi suất cố định qua swap luôn thấp hơn lãi vay ngân hàng",
          "Vì swap không cần ghi nhận vào báo cáo tài chính của doanh nghiệp",
          "Vì ngân hàng cho vay không được phép từ chối yêu cầu đổi lãi suất"
        ],
        "correct": 0,
        "explanation": "Khoản vay gốc giữ nguyên, chỉ chồng thêm một lớp hợp đồng song song. Tránh được phí phạt trả trước hạn, thủ tục thẩm định lại, và cả việc phải công bố một khoản vay mới."
      },
      {
        "question": "Doanh nghiệp đã khóa 7% cố định, sau đó SOFR rơi từ 4% xuống 1%. Tình hình thế nào?",
        "options": [
          "Vẫn trả 7% trong khi bên không hedge chỉ trả 3%",
          "Được điều chỉnh xuống theo mức lãi suất mới của thị trường",
          "Hợp đồng swap tự động chấm dứt khi lãi suất giảm quá sâu",
          "Trả 4% vì phần chênh lệch được dealer hoàn lại hằng kỳ"
        ],
        "correct": 0,
        "explanation": "Đây là cái giá của sự chắc chắn, và nó có thật. Hợp đồng swap khi đó mang giá trị thị trường âm nằm trên bảng cân đối - cấp phê duyệt cần hiểu điều này trước khi ký, không phải sau."
      }
    ]
  }),
  "currency-swap-chuyen-sau": patch({
    "quiz": [
      {
        "question": "Currency swap khác Interest Rate Swap ở điểm cốt lõi nào?",
        "options": [
          "Currency swap thường trao đổi thật cả gốc ở đầu và cuối kỳ",
          "Currency swap chỉ áp dụng cho doanh nghiệp có vốn nước ngoài",
          "Currency swap có kỳ hạn tối đa ngắn hơn Interest Rate Swap",
          "Currency swap không tính lãi mà chỉ hoán đổi tỷ giá quy đổi"
        ],
        "correct": 0,
        "explanation": "Vì hai bên dùng hai đồng tiền khác nhau, currency swap thường thực sự trao đổi notional principal ở đầu kỳ (theo tỷ giá giao ngay) và trao đổi lại ở cuối kỳ (theo tỷ giá đã thỏa thuận trước hoặc tỷ giá ban đầu) - khác với Interest Rate Swap nơi notional cùng một đồng tiền nên không cần đổi tay."
      },
      {
        "question": "Một tập đoàn đa quốc gia có doanh thu bằng nhiều đồng tiền khác nhau (USD, EUR, JPY) nhưng báo cáo tài chính hợp nhất bằng USD. Vì sao họ có thể cần dùng currency swap thay vì chỉ đơn giản chuyển đổi tiền tệ ngay lập tức mỗi khi cần?",
        "options": [
          "Vì dòng tiền lặp nhiều kỳ, khóa một lần rẻ hơn đổi lẻ",
          "Vì chuyển đổi tiền tệ ngay lập tức bị cơ quan quản lý hạn chế",
          "Vì tỷ giá giao ngay luôn bất lợi hơn tỷ giá trong hợp đồng swap",
          "Vì báo cáo hợp nhất bắt buộc phải dùng công cụ phái sinh tỷ giá"
        ],
        "correct": 0,
        "explanation": "Currency swap đặc biệt hữu ích khi doanh nghiệp có dòng tiền định kỳ, lặp lại bằng ngoại tệ trong dài hạn (như trả lãi trái phiếu ngoại tệ hàng năm) - khóa tỷ giá một lần cho cả chuỗi dòng tiền tương lai hiệu quả hơn nhiều so với phải giao dịch tỷ giá riêng lẻ mỗi lần phát sinh."
      },
      {
        "question": "Vay 10 triệu USD, khóa tỷ giá 25.000. VND trượt về 27.000. Doanh nghiệp lợi bao nhiêu?",
        "options": [
          "20 tỷ VND (= 10tr × 2.000 chênh lệch tỷ giá)",
          "270 tỷ VND (= toàn bộ nghĩa vụ theo tỷ giá mới)",
          "2 tỷ VND (= 10tr × 200, lệch một chữ số 0)",
          "Không lợi gì vì tỷ giá đã được khóa từ trước"
        ],
        "correct": 0,
        "explanation": "Không swap thì trả 270 tỷ; có swap trả 250 tỷ. Chênh 20 tỷ này không phải lợi nhuận - đó là khoản lỗ đã không xảy ra, và nó chạy ngược đúng như vậy nếu VND lên giá."
      },
      {
        "question": "Vì sao currency swap có rủi ro đối tác lớn hơn interest rate swap?",
        "options": [
          "Vì toàn bộ notional đổi tay chứ không chỉ phần chênh",
          "Vì kỳ hạn của currency swap luôn dài hơn nhiều so với IRS",
          "Vì tỷ giá biến động mạnh hơn lãi suất trong mọi giai đoạn",
          "Vì currency swap không có trung tâm thanh toán bù trừ"
        ],
        "correct": 0,
        "explanation": "IRS chỉ thanh toán ròng vài phần trăm notional mỗi kỳ. Currency swap trao đổi cả gốc bằng hai đồng tiền, nên nếu đối tác sập giữa chừng, phần rủi ro là toàn bộ khoản gốc chứ không phải một lát nhỏ."
      },
      {
        "question": "Doanh nghiệp FDI vay USD từ công ty mẹ, doanh thu bằng VND. Rủi ro chính là gì?",
        "options": [
          "VND mất giá làm gánh nặng trả nợ quy ra VND tăng lên",
          "Lãi suất USD tăng làm chi phí lãi vay của khoản nợ tăng",
          "Công ty mẹ có thể yêu cầu trả nợ trước hạn bất cứ lúc nào",
          "Doanh thu VND không được phép dùng để trả nợ ngoại tệ"
        ],
        "correct": 0,
        "explanation": "Nợ một đồng tiền và kiếm tiền bằng đồng tiền khác là dạng lệch pha kinh điển. Doanh nghiệp có thể kinh doanh tốt lên mà vẫn khó trả nợ hơn, chỉ vì tỷ giá dịch chuyển."
      }
    ]
  }),
  "vi-sao-phai-sinh-nguy-hiem": patch({
    "quiz": [
      {
        "question": "Vì sao rủi ro phái sinh được gọi là có khả năng 'lan truyền hệ thống' (systemic risk)?",
        "options": [
          "Vì mạng lưới đối tác chằng chịt, một bên sập kéo theo nhiều bên",
          "Vì phái sinh luôn được giao dịch với đòn bẩy rất cao",
          "Vì giá phái sinh biến động mạnh hơn tài sản cơ sở nhiều lần",
          "Vì nhà đầu tư cá nhân tham gia quá nhiều vào thị trường này"
        ],
        "correct": 0,
        "explanation": "Mạng lưới đối tác (counterparty network) trong thị trường phái sinh OTC rất chằng chịt - ngân hàng A có hợp đồng với B, B có hợp đồng với C. Nếu A sụp đổ và không thể thực hiện nghĩa vụ, B chịu thiệt hại, có thể kéo theo C - đây chính là cơ chế 'too interconnected to fail' đã xảy ra năm 2008 với AIG và các hợp đồng CDS khổng lồ."
      },
      {
        "question": "Sau khủng hoảng tài chính 2008, các quy định như Dodd-Frank Act tại Mỹ yêu cầu nhiều loại phái sinh OTC phải giao dịch qua trung tâm thanh toán bù trừ (central clearing) thay vì song phương trực tiếp. Thay đổi này nhằm giải quyết vấn đề gì đã gây ra khủng hoảng 2008?",
        "options": [
          "Rủi ro đối tác phân tán và mờ đục, không ai biết ai nợ ai",
          "Chi phí giao dịch phái sinh OTC quá cao cho doanh nghiệp nhỏ",
          "Nhà đầu tư cá nhân không tiếp cận được thị trường phái sinh",
          "Các ngân hàng dùng phái sinh để trốn thuế thu nhập doanh nghiệp"
        ],
        "correct": 0,
        "explanation": "Central clearing giải quyết đúng vấn đề cốt lõi đã gây ra khủng hoảng 2008: minh bạch hóa và tập trung hóa rủi ro đối tác qua một trung tâm thanh toán bù trừ giám sát, thay vì mạng lưới hợp đồng song phương chồng chéo, không minh bạch giữa các tổ chức tài chính lớn."
      },
      {
        "question": "Vì sao đòn bẩy khiến khoản lỗ phái sinh vượt xa số vốn ban đầu?",
        "options": [
          "Vì ký quỹ chỉ là một phần nhỏ của giá trị hợp đồng thật",
          "Vì phí giao dịch được tính trên toàn bộ giá trị danh nghĩa",
          "Vì phái sinh bắt buộc phải nắm giữ tới ngày đáo hạn",
          "Vì lãi suất vay ký quỹ tăng lên khi thị trường biến động"
        ],
        "correct": 0,
        "explanation": "Đặt cọc 5% để kiểm soát một vị thế gấp hai mươi lần vốn nghĩa là biến động 5% đã xóa sạch tài khoản. Nick Leeson làm sập Barings với cơ chế đúng như vậy, chỉ trong vài tuần."
      },
      {
        "question": "Central clearing giải quyết vấn đề gì của thị trường OTC?",
        "options": [
          "Đặt một bên trung gian đứng giữa và công khai vị thế rủi ro",
          "Giảm chi phí giao dịch cho các doanh nghiệp nhỏ và vừa",
          "Cấm hoàn toàn việc sử dụng đòn bẩy trong giao dịch phái sinh",
          "Bắt buộc mọi hợp đồng phái sinh phải có tài sản bảo đảm"
        ],
        "correct": 0,
        "explanation": "Trước 2008, không ai biết tổng vị thế của AIG lớn tới đâu vì các hợp đồng nằm rải rác song phương. Trung tâm bù trừ vừa cắt chuỗi lây lan vừa làm quy mô rủi ro nhìn thấy được."
      },
      {
        "question": "Bài học chung từ các thảm họa phái sinh trong lịch sử là gì?",
        "options": [
          "Rủi ro đến từ đòn bẩy và thiếu giám sát, không từ công cụ",
          "Phái sinh nên bị cấm với mọi tổ chức tài chính lớn",
          "Chỉ ngân hàng trung ương mới nên được phép giao dịch phái sinh",
          "Các thảm họa đều do lỗi kỹ thuật của hệ thống giao dịch"
        ],
        "correct": 0,
        "explanation": "Barings, LTCM, AIG đều có chung ba yếu tố: đòn bẩy rất cao, vị thế tập trung, và không ai bên ngoài nhìn thấy quy mô thật. Cùng công cụ đó, hãng bay dùng để ổn định chi phí thì không có thảm họa nào."
      }
    ]
  }),
  "case-hang-hang-khong-phong-ho-gia-dau": patch({
    "quiz": [
      {
        "question": "Vì sao hãng hàng không thường không hedge 100% nhu cầu nhiên liệu?",
        "options": [
          "Vì hedge toàn bộ ở giá cao sẽ bất lợi khi giá dầu rơi",
          "Vì quy định hàng không giới hạn tỷ lệ phòng hộ tối đa",
          "Vì chi phí phòng hộ toàn bộ vượt quá lợi nhuận của hãng",
          "Vì không có đủ hợp đồng futures cho toàn bộ nhu cầu"
        ],
        "correct": 0,
        "explanation": "Hedging là con dao hai lưỡi: nếu hedge toàn bộ ở giá cao và sau đó giá thị trường giảm mạnh, đối thủ không hedge sẽ có lợi thế chi phí lớn hơn. Vì vậy các hãng hàng không thường chỉ hedge một phần, cân bằng giữa bảo vệ khỏi rủi ro tăng giá và không bị bất lợi cạnh tranh nếu giá giảm."
      },
      {
        "question": "Nếu hãng hàng không trong case này đã hedge 60% nhu cầu nhiên liệu ở giá 70 USD/thùng, nhưng giá dầu sau đó tăng vọt lên 120 USD/thùng, họ có lợi thế cạnh tranh gì so với đối thủ không hedge?",
        "options": [
          "Chi phí nhiên liệu thấp hơn hẳn, cho phép giữ giá vé cạnh tranh",
          "Được cơ quan quản lý cho phép tăng giá vé sớm hơn đối thủ",
          "Không phải chịu thuế nhiên liệu trong giai đoạn giá cao",
          "Có thể bán lại hợp đồng phòng hộ để thu lợi nhuận tài chính"
        ],
        "correct": 0,
        "explanation": "Đây chính là kịch bản mà hedging phát huy tác dụng rõ ràng nhất: khi giá nguyên liệu tăng vọt đúng như lo ngại ban đầu, phần đã hedge giúp doanh nghiệp tránh được cú sốc chi phí toàn phần, tạo lợi thế cạnh tranh thực sự so với đối thủ không có chiến lược phòng hộ."
      },
      {
        "question": "Hedge 60% ở 70 USD, giá thị trường lên 120 USD. Chi phí bình quân mỗi thùng là bao nhiêu?",
        "options": [
          "90 USD (= 0,6 × 70 + 0,4 × 120)",
          "70 USD (= giá đã chốt cho phần phòng hộ)",
          "120 USD (= giá thị trường tại thời điểm mua)",
          "95 USD (= trung bình cộng của 70 và 120)"
        ],
        "correct": 0,
        "explanation": "Bình quân có trọng số: 42 + 48 = 90 USD. Đối thủ không hedge trả đủ 120, nên chênh lệch 30 USD mỗi thùng là lợi thế chi phí thật trong giai đoạn giá cao."
      },
      {
        "question": "Vì sao Southwest Airlines nổi tiếng nhờ chiến lược phòng hộ giá dầu?",
        "options": [
          "Vì họ duy trì phòng hộ có kỷ luật qua nhiều chu kỳ giá",
          "Vì họ dự đoán chính xác thời điểm giá dầu sẽ tăng vọt",
          "Vì họ là hãng duy nhất được phép mua futures dầu thô",
          "Vì họ sở hữu cổ phần trong các công ty khai thác dầu"
        ],
        "correct": 0,
        "explanation": "Điểm mấu chốt là kỷ luật chứ không phải tài tiên tri: họ hedge đều đặn theo chính sách, kể cả những năm việc đó gây lỗ. Nhờ vậy khi giá vọt lên, lợi thế chi phí có sẵn chứ không phải may mắn."
      },
      {
        "question": "Rủi ro còn lại của hãng bay sau khi đã phòng hộ giá dầu là gì?",
        "options": [
          "Nhiên liệu bay và dầu thô không biến động khớp hoàn toàn",
          "Hợp đồng phòng hộ có thể bị sàn hủy khi giá biến động mạnh",
          "Giá vé máy bay bị cơ quan quản lý áp trần trong giai đoạn giá cao",
          "Chi phí phòng hộ được tính vào giá vốn nên làm giảm biên lợi nhuận"
        ],
        "correct": 0,
        "explanation": "Đây là basis risk: công cụ phòng hộ dùng dầu thô còn thứ hãng thật sự mua là nhiên liệu bay đã tinh chế. Hai giá đi cùng chiều nhưng chênh lệch giữa chúng vẫn dao động."
      }
    ]
  }),
  "tong-on-cong-cu-phai-sinh": patch({
    "quiz": [
      {
        "question": "Điểm chung quan trọng nhất giữa Forward, Futures, Options và Swaps là gì?",
        "options": [
          "Cả bốn đều chuyển rủi ro từ bên không muốn gánh sang bên chấp nhận",
          "Cả bốn đều bắt buộc giao dịch qua sàn có thanh toán bù trừ",
          "Cả bốn đều yêu cầu ký quỹ tối thiểu theo quy định của sàn",
          "Cả bốn đều có ngày đáo hạn cố định không quá mười hai tháng"
        ],
        "correct": 0,
        "explanation": "Dù cấu trúc khác nhau (cam kết bắt buộc với Forward/Futures, quyền chọn với Options, hoán đổi định kỳ với Swaps), bản chất chung của mọi phái sinh là công cụ cho phép chuyển giao một loại rủi ro cụ thể (giá, lãi suất, tỷ giá) từ bên này sang bên khác một cách có cấu trúc và có thể định giá được."
      },
      {
        "question": "Một sinh viên vừa học xong về Options, Futures, Swaps hỏi: \"Nếu phái sinh nguy hiểm như vậy, tại sao không cấm hoàn toàn để bảo vệ hệ thống tài chính?\" Câu trả lời hợp lý nhất là gì?",
        "options": [
          "Cấm sẽ lấy đi công cụ phòng hộ của hàng nghìn doanh nghiệp thật",
          "Cấm là hợp lý vì rủi ro hệ thống lớn hơn lợi ích mang lại",
          "Không cấm được vì phái sinh giao dịch xuyên biên giới",
          "Cấm sẽ làm giảm thanh khoản của thị trường cổ phiếu"
        ],
        "correct": 0,
        "explanation": "Đây là bài học cân bằng quan trọng: giải pháp chính sách hợp lý không phải là cấm đoán cực đoan một công cụ có giá trị thực sự (hedging cho nền kinh tế thực), mà là quản lý rủi ro có hệ thống (minh bạch, giới hạn đòn bẩy, central clearing) để tối đa hóa lợi ích và giảm thiểu tác hại tiềm tàng."
      },
      {
        "question": "Điểm khác biệt cấu trúc giữa option và ba công cụ còn lại là gì?",
        "options": [
          "Option cho quyền chứ không tạo nghĩa vụ cho người mua",
          "Option không có ngày đáo hạn cố định trong hợp đồng",
          "Option chỉ áp dụng cho cổ phiếu, ba loại kia cho mọi tài sản",
          "Option không cần bên đối tác đứng ở phía ngược lại"
        ],
        "correct": 0,
        "explanation": "Forward, futures và swap đều là cam kết hai chiều. Option bất đối xứng: người mua trả premium để có quyền chọn thực hiện hay không - và chính premium đó là cái giá của sự bất đối xứng."
      },
      {
        "question": "Doanh nghiệp cần phòng hộ một khoản thanh toán ngoại tệ đúng ngày và đúng số tiền. Công cụ nào hợp nhất?",
        "options": [
          "Forward, vì tùy chỉnh được số lượng và ngày giao",
          "Futures, vì có thanh khoản cao và ít rủi ro đối tác",
          "Option, vì giữ được quyền không thực hiện nếu bất lợi",
          "Swap, vì phù hợp với dòng tiền định kỳ nhiều kỳ"
        ],
        "correct": 0,
        "explanation": "Futures chuẩn hóa nên hiếm khi khớp chính xác số tiền và ngày. Đổi lại việc chấp nhận rủi ro đối tác, forward cho phép khớp đúng nhu cầu - điều quan trọng nhất khi phòng hộ một giao dịch cụ thể."
      },
      {
        "question": "Câu hỏi cần trả lời trước khi mở bất kỳ vị thế phái sinh nào là gì?",
        "options": [
          "Rủi ro nền tảng của tôi là gì, lớn bao nhiêu, xảy ra khi nào",
          "Công cụ nào đang có mức phí giao dịch thấp nhất hiện tại",
          "Thị trường đang dự báo giá sẽ đi theo hướng nào trong quý tới",
          "Mức đòn bẩy tối đa mà sàn cho phép áp dụng là bao nhiêu"
        ],
        "correct": 0,
        "explanation": "Không trả lời được ba vế đó thì vị thế sắp mở không phải phòng hộ - nó là một rủi ro mới, cộng thêm vào cái đang có chứ không trừ đi."
      }
    ]
  }),
  "ket-noi-tat-ca-tai-chinh": patch({
    "quiz": [
      {
        "question": "Vì sao một công ty có P/E thấp (có vẻ 'rẻ') đôi khi vẫn là một khoản đầu tư tệ?",
        "options": [
          "Vì P/E thấp có thể phản ánh triển vọng xấu, không phải giá hời",
          "Vì P/E thấp thường đi kèm thanh khoản cổ phiếu rất kém",
          "Vì P/E thấp nghĩa là doanh nghiệp không chia cổ tức đều đặn",
          "Vì P/E thấp chỉ tính được với doanh nghiệp đã niêm yết lâu năm"
        ],
        "correct": 0,
        "explanation": "Đây chính là bài học kết nối bốn lớp: một chỉ số định giá (P/E thấp) đơn lẻ không đủ để ra quyết định - cần kiểm tra chất lượng lợi nhuận (kế toán: liệu lợi nhuận có bền vững, hay đến từ khoản mục bất thường), rủi ro (đòn bẩy nợ cao, ngành đang suy thoái), và tâm lý thị trường (liệu giá thấp phản ánh đúng rủi ro hay là cơ hội bị định giá sai)."
      },
      {
        "question": "Một nhà phân tích chỉ giỏi đọc báo cáo tài chính nhưng không hiểu về định giá, rủi ro thị trường hay phái sinh (Chặng 10). Hạn chế lớn nhất của họ khi phân tích một doanh nghiệp thực tế là gì?",
        "options": [
          "Đọc được quá khứ nhưng không định giá được tương lai",
          "Không tính toán được các chỉ số tài chính cơ bản",
          "Không tiếp cận được dữ liệu thị trường theo thời gian thực",
          "Không hiểu được các chuẩn mực kế toán quốc tế hiện hành"
        ],
        "correct": 0,
        "explanation": "Đây chính là lý do toàn bộ chương trình 200 ngày được thiết kế như MỘT HỆ THỐNG liên kết - mỗi chặng xây dựng năng lực cần thiết cho các quyết định phân tích và đầu tư thực tế, thiếu bất kỳ mảnh ghép nào (kế toán, định giá, rủi ro, phái sinh) đều để lại một góc mù nguy hiểm trong quy trình phân tích hoàn chỉnh."
      },
      {
        "question": "P/E 6x, nợ/EBITDA 5,5x, dòng tiền hoạt động âm hai năm liền. Đọc thế nào?",
        "options": [
          "Rẻ vì lý do chính đáng, rủi ro tài chính đang rất cao",
          "Cơ hội hiếm vì thị trường chưa nhận ra giá trị thật",
          "Bình thường, vì P/E thấp luôn là dấu hiệu định giá hấp dẫn",
          "Chưa kết luận được nếu chưa biết tỷ suất cổ tức của cổ phiếu"
        ],
        "correct": 0,
        "explanation": "Ba lớp thông tin cùng chỉ về một hướng: định giá thấp, đòn bẩy nặng, dòng tiền không đủ nuôi nợ. Đây là hình dạng điển hình của bẫy giá trị chứ không phải cơ hội bị bỏ sót."
      },
      {
        "question": "Bốn lớp năng lực mà chương trình xây dựng theo thứ tự là gì?",
        "options": [
          "Đọc báo cáo, tính chỉ số, định giá, rồi quản rủi ro",
          "Kế toán, thuế, kiểm toán, rồi lập báo cáo tài chính",
          "Tiết kiệm, đầu tư, vay nợ, rồi lập kế hoạch hưu trí",
          "Phân tích ngành, chọn cổ phiếu, giao dịch, rồi chốt lời"
        ],
        "correct": 0,
        "explanation": "Mỗi lớp chỉ đứng vững trên lớp trước: không đọc được báo cáo thì chỉ số vô nghĩa, không hiểu định giá thì không biết giá nào là hợp lý, không hiểu rủi ro thì không biết mình đang đặt cược bao nhiêu."
      },
      {
        "question": "Vì sao một chỉ số đơn lẻ không bao giờ đủ để ra quyết định đầu tư?",
        "options": [
          "Vì mỗi chỉ số chỉ soi một mặt và đều có cách bị bóp méo",
          "Vì các chỉ số được công bố ở những thời điểm khác nhau",
          "Vì chuẩn mực kế toán thay đổi làm chỉ số cũ mất giá trị",
          "Vì nhà đầu tư cá nhân không tính được chỉ số chính xác"
        ],
        "correct": 0,
        "explanation": "P/E bị đòn bẩy làm lệch, ROE bị vay nợ thổi lên, EBITDA giấu chi phí đầu tư, Current Ratio che chất lượng tồn kho. Chúng chỉ bịt được điểm mù cho nhau khi đọc cùng lúc."
      }
    ]
  }),
  "bai-cuoi-phan-tich-doanh-nghiep-hoan-chinh": patch({
    "quiz": [
      {
        "question": "Trong thực tế phân tích doanh nghiệp, điều gì quan trọng hơn: thuộc lòng công thức hay hiểu tư duy đằng sau nó?",
        "options": [
          "Hiểu tư duy, vì công thức chỉ có nghĩa khi biết dùng lúc nào",
          "Thuộc công thức, vì phân tích thực tế đòi hỏi tính toán nhanh",
          "Hai điều quan trọng như nhau trong mọi tình huống phân tích",
          "Tùy vị trí công việc, phân tích viên cần thuộc công thức hơn"
        ],
        "correct": 0,
        "explanation": "200 ngày không phải để ghi nhớ hàng trăm công thức - mà để xây dựng một hệ thống tư duy phân tích: khi nào dùng P/E thay vì DCF, khi nào một chỉ số ratio đang bị bóp méo bởi kế toán, khi nào rủi ro đòn bẩy đáng lo hơn cơ hội tăng trưởng. Đây là nền tảng để tự tin đọc và phân tích BẤT KỲ doanh nghiệp nào trong tương lai, kể cả những ngành chưa từng học qua."
      },
      {
        "question": "Nếu phải chọn MỘT kỹ năng duy nhất để mang theo sau 200 ngày này vào mọi quyết định tài chính tương lai - dù là đọc một báo cáo tài chính mới, đánh giá một cơ hội đầu tư, hay hiểu một bản tin kinh tế - đó nên là kỹ năng gì?",
        "options": [
          "Biết đặt câu hỏi đúng trước mỗi con số gặp phải",
          "Nhớ được toàn bộ công thức định giá đã học qua",
          "Sử dụng thành thạo phần mềm mô hình tài chính",
          "Theo dõi tin tức thị trường mỗi ngày một cách đều đặn"
        ],
        "correct": 0,
        "explanation": "Đây là thông điệp cốt lõi khép lại toàn bộ hành trình 200 ngày: giá trị thực sự không nằm ở việc thuộc lòng công thức hay dự đoán ngắn hạn, mà ở tư duy hệ thống - khả năng nhìn thấy MỐI LIÊN KẾT giữa các mảnh kiến thức để hiểu bức tranh tài chính đầy đủ của bất kỳ tình huống nào trong tương lai, kể cả những tình huống chưa từng học qua."
      },
      {
        "question": "Quy trình phân tích một doanh nghiệp nên bắt đầu từ đâu?",
        "options": [
          "Hiểu mô hình kinh doanh trước khi mở bất kỳ con số nào",
          "Tính ngay các chỉ số tài chính của ba năm gần nhất",
          "So sánh định giá với các doanh nghiệp cùng ngành",
          "Đọc khuyến nghị của các công ty chứng khoán về cổ phiếu"
        ],
        "correct": 0,
        "explanation": "Không biết doanh nghiệp kiếm tiền bằng cách nào thì không biết chỉ số nào đáng nhìn. Biên gộp 20% là tốt với bán lẻ và tệ với phần mềm - chỉ bối cảnh mới cho con số ý nghĩa."
      },
      {
        "question": "Dấu hiệu nào đáng lo nhất khi đọc một bộ báo cáo tài chính?",
        "options": [
          "Lợi nhuận tăng đều nhưng dòng tiền hoạt động không theo kịp",
          "Doanh thu tăng chậm hơn mức trung bình của toàn ngành",
          "Biên lợi nhuận gộp thấp hơn đối thủ cạnh tranh gần nhất",
          "Chi phí bán hàng tăng nhanh trong giai đoạn mở rộng"
        ],
        "correct": 0,
        "explanation": "Lợi nhuận là ý kiến của kế toán, dòng tiền là sự thật. Khoảng cách giữa hai con số ngày càng rộng là cảnh báo sớm đáng tin nhất về chất lượng doanh thu."
      },
      {
        "question": "Sau khi hoàn thành phân tích, kết luận nên được trình bày thế nào?",
        "options": [
          "Kèm dải giá trị và các giả định chính đứng sau nó",
          "Bằng một mức giá mục tiêu duy nhất cho rõ ràng",
          "Chỉ nêu khuyến nghị mua hoặc bán, không cần con số",
          "Kèm toàn bộ bảng tính để người đọc tự kiểm chứng lại"
        ],
        "correct": 0,
        "explanation": "Một con số duy nhất tạo cảm giác chắc chắn mà mô hình không hề có. Dải giá trị kèm giả định cho người đọc biết luận điểm sẽ sai ở đâu - thứ hữu ích hơn nhiều so với một điểm."
      }
    ]
  }),
  "forward-contract-la-gi": patch({
    "quiz": [
      {
        "question": "Rủi ro lớn nhất của forward contract so với futures là gì?",
        "options": [
          "Forward luôn đắt hơn futures vì phải thương lượng riêng từng lần",
          "Forward yêu cầu ký quỹ hàng ngày nên chiếm dụng vốn nhiều hơn",
          "Counterparty risk cao hơn - OTC, không có sàn đứng ra đảm bảo",
          "Forward không thể dùng cho hàng hóa, chỉ dùng cho tiền tệ"
        ],
        "correct": 2,
        "explanation": "Forward là hợp đồng OTC (over-the-counter) - không qua trung gian sàn giao dịch đảm bảo thực hiện. Nếu một bên phá sản hoặc từ chối thực hiện, bên còn lại chịu tổn thất."
      },
      {
        "question": "Hai bên A và B ký forward contract mua/bán 100 tấn gạo sau 6 tháng ở giá 15.000đ/kg. Nếu sau 6 tháng, một bên phá sản và không thể thực hiện hợp đồng, hậu quả pháp lý xảy ra với bên còn lại là gì?",
        "options": [
          "Sàn giao dịch sẽ tự động bồi thường cho bên bị thiệt hại",
          "Cả hai bên đều không phải chịu trách nhiệm gì trong tình huống này",
          "Bên còn lại chịu tổn thất và phải tự đi đòi qua thủ tục pháp lý",
          "Không có hậu quả gì vì hợp đồng tự động hủy khi một bên phá sản"
        ],
        "correct": 2,
        "explanation": "Đây chính là rủi ro cốt lõi của forward contract (OTC, không qua sàn): không có clearing house đứng giữa đảm bảo thực hiện nghĩa vụ."
      },
      {
        "question": "Vì sao doanh nghiệp vẫn chọn forward dù có rủi ro đối tác?",
        "options": [
          "Vì tùy chỉnh được đúng số lượng và đúng ngày cần",
          "Vì phí giao dịch forward luôn thấp hơn futures nhiều",
          "Vì forward được cơ quan quản lý bảo lãnh thanh toán",
          "Vì forward có thể bán lại trên thị trường bất cứ lúc nào"
        ],
        "correct": 0,
        "explanation": "Futures chuẩn hóa theo lô và theo tháng đáo hạn, hiếm khi khớp đúng một hợp đồng xuất khẩu cụ thể. Forward khớp chính xác nhu cầu - và đó là điều đáng giá nhất khi phòng hộ một giao dịch thật."
      },
      {
        "question": "Chốt bán 1 triệu USD ở 25.000. Tỷ giá đáo hạn 24.000. Kết quả hợp đồng thế nào?",
        "options": [
          "Lãi 1 tỷ VND trên hợp đồng, bù phần doanh thu hụt",
          "Lỗ 1 tỷ VND vì tỷ giá đã đi ngược dự đoán ban đầu",
          "Không phát sinh gì vì tỷ giá vẫn nằm dưới mức đã chốt",
          "Lãi 24 tỷ VND, đúng bằng giá trị quy đổi của hợp đồng"
        ],
        "correct": 0,
        "explanation": "Bán ở 25.000 khi thị trường chỉ 24.000 cho lãi 1.000 đồng mỗi USD. Khoản lãi này bù đúng phần doanh thu USD quy ra VND bị hụt - tổng lại vẫn là 25 tỷ như kế hoạch."
      },
      {
        "question": "Vì sao forward gần như không thoát ra được giữa chừng?",
        "options": [
          "Vì đó là thỏa thuận riêng, không có thị trường thứ cấp",
          "Vì luật cấm chuyển nhượng hợp đồng phái sinh song phương",
          "Vì phí hủy hợp đồng thường cao hơn giá trị hợp đồng",
          "Vì phải chờ đối tác đồng ý mới được đóng vị thế sớm"
        ],
        "correct": 0,
        "explanation": "Futures đóng vị thế bằng một lệnh ngược chiều trên sàn. Forward là hợp đồng giữa hai bên cụ thể, muốn thoát phải đàm phán lại với chính đối tác đó - hoặc ký thêm một hợp đồng bù trừ."
      }
    ]
  }),
  "option-la-gi": patch({
    "quiz": [
      {
        "question": "Vì sao option được ví như một loại 'bảo hiểm' tài chính?",
        "options": [
          "Người mua trả phí cố định để được bảo vệ, lỗ tối đa là phí đó",
          "Vì chính các công ty bảo hiểm là bên phát hành option ra thị trường",
          "Vì option luôn có lãi nên là công cụ an toàn như bảo hiểm",
          "Option không liên quan gì tới bảo hiểm, chỉ là công cụ đầu cơ"
        ],
        "correct": 0,
        "explanation": "Giống hợp đồng bảo hiểm: bạn trả premium (phí) để có quyền bảo vệ nếu có sự kiện bất lợi xảy ra. Nếu sự kiện đó không xảy ra, bạn chỉ mất phí premium."
      },
      {
        "question": "Một nhà đầu tư mua cả call option VÀ put option cùng strike price, cùng ngày đáo hạn trên cùng một cổ phiếu (chiến lược \"straddle\"). Họ đang đặt cược vào điều gì?",
        "options": [
          "Đặt cược giá cổ phiếu sẽ hoàn toàn không thay đổi cho tới đúng ngày đáo hạn",
          "Giá biến động mạnh theo bất kỳ hướng nào - đứng yên thì lỗ cả hai phí",
          "Đặt cược giá tăng mạnh, vì call luôn có giá trị lớn hơn put",
          "Đặt cược giá giảm mạnh, vì put bảo vệ được toàn bộ danh mục"
        ],
        "correct": 1,
        "explanation": "Straddle là chiến lược đặt cược vào ĐỘ BIẾN ĐỘNG (volatility) chứ không phải hướng đi cụ thể của giá - phù hợp khi nhà đầu tư dự đoán một sự kiện lớn sắp xảy ra sẽ tạo biến động mạnh."
      },
      {
        "question": "Người mua option và người mua bảo hiểm giống nhau ở điểm nào?",
        "options": [
          "Cả hai trả phí trước để được bảo vệ khỏi kịch bản xấu",
          "Cả hai được hoàn lại phí nếu rủi ro không xảy ra",
          "Cả hai bắt buộc phải thực hiện hợp đồng khi đáo hạn",
          "Cả hai chỉ được bồi thường sau khi tổn thất đã xảy ra"
        ],
        "correct": 0,
        "explanation": "Premium giống phí bảo hiểm: mất đứt nếu không cần dùng, nhưng đổi lại là giới hạn được thiệt hại. Khác biệt là option còn cho phép kiếm lời nếu giá chạy đúng hướng, còn bảo hiểm thì không."
      },
      {
        "question": "Mua đồng thời call và put cùng strike, cùng đáo hạn là chiến lược gì?",
        "options": [
          "Đặt cược giá sẽ biến động mạnh, không quan tâm chiều nào",
          "Phòng hộ hoàn toàn để loại bỏ mọi rủi ro biến động giá",
          "Đặt cược giá sẽ đứng yên quanh mức strike đã chọn",
          "Nhân đôi lợi nhuận nếu giá đi đúng theo một chiều"
        ],
        "correct": 0,
        "explanation": "Đây là straddle. Giá chạy mạnh về bất kỳ phía nào cũng có một vế sinh lời đủ bù cả hai premium. Kẻ thù của chiến lược này là thị trường đi ngang - khi đó mất cả hai khoản phí."
      },
      {
        "question": "Rủi ro tối đa của người mua option là bao nhiêu?",
        "options": [
          "Đúng bằng phần premium đã trả, không hơn",
          "Bằng giá trị của toàn bộ hợp đồng option",
          "Không giới hạn nếu giá đi ngược hướng đặt cược",
          "Bằng chênh lệch giữa strike và giá thị trường"
        ],
        "correct": 0,
        "explanation": "Đây chính là sự bất đối xứng làm option hấp dẫn: lỗ có trần, lãi thì không. Nhưng phần lớn option hết hạn vô giá trị, nên trần đó bị chạm khá thường xuyên."
      }
    ]
  }),
  "put-option-la-gi": patch({
    "quiz": [
      {
        "question": "Người bán (writer) put option ở vị thế nào?",
        "options": [
          "Có nghĩa vụ mua ở strike nếu bên mua thực hiện - nhận premium",
          "Có quyền chọn thực hiện hay không, giống hệt như người mua put",
          "Không có rủi ro gì vì đã nhận được premium ngay từ đầu kỳ",
          "Luôn phải bán tài sản trước khi hợp đồng option đáo hạn"
        ],
        "correct": 0,
        "explanation": "Bất đối xứng quyền lợi trong option: người MUA có quyền chọn (không nghĩa vụ), người BÁN (writer) luôn có NGHĨA VỤ nếu bên mua thực hiện quyền. Đổi lại writer nhận premium."
      },
      {
        "question": "Một nhà đầu tư giữ cổ phiếu và bán (viết) covered call trên chính cổ phiếu đó (cam kết bán ở strike price nếu người mua thực hiện quyền). Chiến lược này giới hạn điều gì và tạo ra thu nhập từ đâu?",
        "options": [
          "Covered call luôn rủi ro cao hơn nắm giữ cổ phiếu thông thường",
          "Chiến lược này chỉ có lợi khi giá cổ phiếu giảm mạnh và nhanh",
          "Không giới hạn gì và cũng không tạo ra thu nhập gì thêm cả",
          "Giới hạn lợi nhuận tăng giá, đổi lấy thu nhập từ premium"
        ],
        "correct": 3,
        "explanation": "Covered call là chiến lược \"income generation\" phổ biến: nhà đầu tư chấp nhận giới hạn lợi nhuận tăng giá (upside) để đổi lấy thu nhập premium chắc chắn."
      },
      {
        "question": "Nhà đầu tư nắm cổ phiếu mua put option nhằm mục đích gì?",
        "options": [
          "Đặt sàn cho giá bán, giới hạn mức lỗ có thể xảy ra",
          "Tăng lợi nhuận nếu cổ phiếu tiếp tục tăng giá mạnh",
          "Nhận thêm phí premium từ người bán put option",
          "Loại bỏ nghĩa vụ phải nắm giữ cổ phiếu tới đáo hạn"
        ],
        "correct": 0,
        "explanation": "Đây là protective put - đúng nghĩa mua bảo hiểm cho danh mục. Cổ phiếu rơi bao nhiêu cũng bán được ở strike, đổi lại là premium mất đứt nếu giá không rơi."
      },
      {
        "question": "Mua put strike 40.000đ, premium 2.000đ. Giá đáo hạn 33.000đ. Lãi ròng bao nhiêu?",
        "options": [
          "5.000đ (= 40.000 − 33.000 − 2.000 premium)",
          "7.000đ (= 40.000 − 33.000, quên trừ premium)",
          "2.000đ (= đúng bằng premium đã bỏ ra ban đầu)",
          "9.000đ (= 40.000 − 33.000 + 2.000, cộng premium)"
        ],
        "correct": 0,
        "explanation": "Giá trị nội tại lúc đáo hạn là 7.000đ, trừ premium 2.000đ còn lãi ròng 5.000đ. Điểm hòa vốn của put là strike trừ premium, ở đây là 38.000đ."
      },
      {
        "question": "Người bán put chịu rủi ro gì?",
        "options": [
          "Phải mua cổ phiếu ở strike dù giá thị trường đã rơi sâu",
          "Phải bán cổ phiếu ở strike dù giá thị trường đã tăng cao",
          "Mất toàn bộ premium đã nhận nếu giá cổ phiếu đứng yên",
          "Không có rủi ro vì đã nhận premium ngay từ đầu"
        ],
        "correct": 0,
        "explanation": "Bán put là cam kết mua vào ở strike bất kể giá rơi tới đâu. Rủi ro có giới hạn - giá thấp nhất là 0 - nhưng khoản lỗ tối đa vẫn là gần như toàn bộ giá trị strike."
      }
    ]
  }),
  "strike-price-expiration-date": patch({
    "quiz": [
      {
        "question": "Option 'in-the-money' nghĩa là gì?",
        "options": [
          "Option không có ai mua bán nên mất thanh khoản hoàn toàn",
          "Option đã hết hạn nhưng vẫn còn giá trị nội tại để thực hiện",
          "Option chưa được niêm yết nên chỉ giao dịch trên thị trường OTC phi tập trung",
          "Có giá trị nếu thực hiện ngay: call thì giá > strike, put thì ngược lại"
        ],
        "correct": 3,
        "explanation": "In-the-money (ITM): thực hiện quyền ngay sẽ có lãi. Out-of-the-money (OTM): thực hiện quyền ngay sẽ lỗ, không ai làm vậy. At-the-money (ATM): giá thị trường bằng strike."
      },
      {
        "question": "Hai option cùng cổ phiếu, cùng strike price, nhưng một đáo hạn sau 1 tuần và một đáo hạn sau 1 năm. Nếu cả hai đều đang out-of-the-money (chưa có lãi nếu thực hiện ngay), option nào có Time Value cao hơn?",
        "options": [
          "Cả hai có Time Value bằng nhau vì cùng strike price và cùng một cổ phiếu cơ sở",
          "Option đáo hạn sau 1 tuần luôn có Time Value cao hơn vì gấp gáp hơn",
          "Time Value không liên quan gì tới thời gian còn lại đến ngày đáo hạn",
          "Option 1 năm - còn nhiều thời gian nghĩa là nhiều cơ hội giá chạy hơn"
        ],
        "correct": 3,
        "explanation": "Time Value phản ánh trực tiếp \"cơ hội\" còn lại để giá di chuyển có lợi trước khi đáo hạn - thời gian còn lại càng dài, xác suất giá di chuyển đủ xa càng cao."
      },
      {
        "question": "Option ngang tiền (at-the-money) có đặc điểm gì?",
        "options": [
          "Giá thị trường bằng strike, giá trị nội tại bằng 0",
          "Giá thị trường cao hơn strike, có lãi nếu thực hiện",
          "Giá thị trường thấp hơn strike, lỗ nếu thực hiện quyền",
          "Không xác định được nếu chưa biết ngày đáo hạn còn lại"
        ],
        "correct": 0,
        "explanation": "Nội tại bằng 0 nhưng premium vẫn dương, và toàn bộ phần đó là giá trị thời gian. Đây cũng là điểm giá trị thời gian đạt đỉnh, vì bất định về việc có thực hiện quyền hay không là lớn nhất."
      },
      {
        "question": "Hai call cùng cổ phiếu, strike 50.000đ và 60.000đ, cùng đáo hạn. Cái nào premium cao hơn?",
        "options": [
          "Strike 50.000đ, vì dễ có lãi hơn khi thực hiện",
          "Strike 60.000đ, vì tiềm năng lợi nhuận lớn hơn nhiều",
          "Hai cái bằng nhau vì cùng cổ phiếu và cùng đáo hạn",
          "Không so được nếu chưa biết giá cổ phiếu hiện tại"
        ],
        "correct": 0,
        "explanation": "Strike thấp hơn cho quyền mua rẻ hơn, nên đáng giá hơn với call. Đây là lý do một chuỗi option cùng ngày đáo hạn có premium giảm dần khi strike tăng lên."
      },
      {
        "question": "Vì sao option càng gần đáo hạn càng mất giá nhanh?",
        "options": [
          "Vì giá trị thời gian giảm nhanh dần về 0 khi tới hạn",
          "Vì thanh khoản của option giảm mạnh trong tuần cuối",
          "Vì sàn giao dịch tăng phí với option sắp đáo hạn",
          "Vì giá trị nội tại bị chiết khấu mạnh hơn theo thời gian"
        ],
        "correct": 0,
        "explanation": "Time decay không tuyến tính - nó tăng tốc ở giai đoạn cuối. Một option còn ba mươi ngày mất giá trị chậm hơn nhiều so với chính nó khi chỉ còn ba ngày."
      }
    ]
  }),
  "vi-sao-doanh-nghiep-dung-phai-sinh-phong-ho": patch({
    "quiz": [
      {
        "question": "Một công ty hedge giá dầu ở mức 70 USD/thùng, nhưng sau đó giá dầu giảm còn 50 USD. Công ty có 'thua lỗ' trong việc hedging này không?",
        "options": [
          "Có, họ đã mất tiền vì quyết định hedge sai thời điểm của thị trường dầu",
          "Công ty nên hủy hợp đồng hedging ngay lập tức để cắt lỗ",
          "Không thể xảy ra tình huống này vì forward tự điều chỉnh theo giá",
          "Kế toán thì trả cao hơn giá thị trường, nhưng mục tiêu là chắc chắn"
        ],
        "correct": 3,
        "explanation": "Đây là hiểu lầm phổ biến nhất về hedging: mục tiêu không phải là 'thắng thị trường' mà là loại bỏ sự bất định. Nếu giá giảm sau khi đã hedge ở mức cao hơn, đó là cái giá của sự chắc chắn."
      },
      {
        "question": "Một CFO quyết định KHÔNG hedge rủi ro giá nguyên liệu đầu vào, với lý do \"chúng tôi tin vào khả năng dự đoán thị trường tốt hơn đối thủ\". Quan điểm này có phù hợp với triết lý hedging đã học không?",
        "options": [
          "Không - đó là đầu cơ trá hình, ngược triết lý giảm bất định",
          "Hoàn toàn phù hợp, đây chính xác là mục đích của việc hedging",
          "CFO luôn đúng vì có nhiều kinh nghiệm hơn nhân viên cấp dưới",
          "Không có khác biệt nào giữa hedging và speculation ở đây cả"
        ],
        "correct": 0,
        "explanation": "Đây là một cái bẫy tư duy phổ biến ở cấp quản lý doanh nghiệp: viện lý do \"dự đoán tốt hơn thị trường\" để không hedge thực chất là đang đầu cơ (speculation), không phải quản trị rủi ro."
      },
      {
        "question": "Vì sao ổn định dòng tiền lại có giá trị với doanh nghiệp?",
        "options": [
          "Vì lập kế hoạch và đầu tư chính xác hơn khi chi phí dự đoán được",
          "Vì cơ quan thuế ưu đãi doanh nghiệp có dòng tiền ổn định",
          "Vì ngân hàng chỉ cho vay doanh nghiệp có dòng tiền không đổi",
          "Vì dòng tiền ổn định luôn đi kèm lợi nhuận cao hơn hẳn"
        ],
        "correct": 0,
        "explanation": "Không biết chi phí nguyên liệu năm sau là bao nhiêu thì không định giá bán được, không cam kết hợp đồng dài hạn được, không duyệt dự án đầu tư được. Phòng hộ mua lại khả năng lập kế hoạch."
      },
      {
        "question": "Covenant Nợ/EBITDA dưới 3,5x. Nợ 350 tỷ, EBITDA rơi từ 100 xuống 85 tỷ. Chuyện gì xảy ra?",
        "options": [
          "Tỷ lệ thành 4,1x - vi phạm covenant, chủ nợ có quyền đòi nợ sớm",
          "Tỷ lệ thành 2,9x - vẫn an toàn dưới ngưỡng quy định",
          "Không ảnh hưởng vì covenant chỉ tính trên nợ chứ không trên EBITDA",
          "Doanh nghiệp được tự động gia hạn thêm một năm để khắc phục"
        ],
        "correct": 0,
        "explanation": "350/85 = 4,1x. Doanh nghiệp không phá sản vì lỗ mà vì một điều khoản kích hoạt đúng lúc dòng tiền yếu nhất - và phòng hộ nguyên liệu chính là mua bảo hiểm cho điều khoản đó."
      },
      {
        "question": "Vì sao hedge theo chính sách tốt hơn hedge theo dự đoán?",
        "options": [
          "Vì quyết định trước bằng văn bản loại bỏ việc đoán chiều giá",
          "Vì chính sách được cơ quan quản lý phê duyệt trước khi áp dụng",
          "Vì hedge theo chính sách luôn cho chi phí thấp hơn dự đoán",
          "Vì kiểm toán chỉ chấp nhận giao dịch phòng hộ có chính sách"
        ],
        "correct": 0,
        "explanation": "Hedge khi nghĩ giá sẽ tăng và bỏ hedge khi nghĩ giá sẽ giảm là đầu cơ mang tên quản trị rủi ro. Chính sách viết sẵn cho kết quả nhàm chán và lặp lại - đó chính là dấu hiệu nó đang chạy đúng."
      }
    ]
  }),
  "case-xuat-khau-phong-ho-ty-gia": patch({
    "quiz": [
      {
        "question": "Nếu VND giảm giá mạnh so với USD sau khi doanh nghiệp đã ký forward bán USD ở tỷ giá cố định, doanh nghiệp có 'thiệt' không?",
        "options": [
          "Có, họ mất cơ hội thu về nhiều VND hơn nếu không hedge trước",
          "Thiệt về cơ hội, nhưng mục tiêu loại bỏ rủi ro đã đạt được",
          "Hợp đồng forward sẽ tự động hủy trong trường hợp tỷ giá biến động",
          "Ngân hàng phải bồi thường phần chênh lệch tỷ giá cho doanh nghiệp"
        ],
        "correct": 1,
        "explanation": "Tương tự case hedging giá dầu: khi đã chọn sự chắc chắn (certainty) thay vì đầu cơ vào biến động tỷ giá có lợi, doanh nghiệp chấp nhận đánh đổi cơ hội."
      },
      {
        "question": "Nếu doanh nghiệp xuất khẩu trong case này chọn hedge bằng option (mua put option bán USD) thay vì forward contract, điều gì khác biệt về khả năng linh hoạt so với dùng forward?",
        "options": [
          "Option cho quyền, không nghĩa vụ - linh hoạt hơn nhưng phải trả phí",
          "Option không được phép dùng để hedge rủi ro tỷ giá cho doanh thu xuất khẩu",
          "Option luôn rẻ hơn forward contract trong mọi trường hợp sử dụng",
          "Không có sự khác biệt nào giữa hai công cụ phòng hộ tỷ giá này"
        ],
        "correct": 0,
        "explanation": "Đây là sự đánh đổi cốt lõi giữa forward và option: forward miễn phí (không premium) nhưng bắt buộc thực hiện dù bất lợi; option có phí nhưng để ngỏ phần lợi."
      },
      {
        "question": "Doanh nghiệp xuất khẩu lo ngại điều gì nhất về tỷ giá?",
        "options": [
          "VND lên giá làm doanh thu USD quy ra VND giảm đi",
          "VND mất giá làm chi phí nhập nguyên liệu tăng lên",
          "Tỷ giá đứng yên khiến biên lợi nhuận không cải thiện",
          "Ngân hàng nhà nước thay đổi biên độ tỷ giá cho phép"
        ],
        "correct": 0,
        "explanation": "Bán hàng thu USD, chi phí trả bằng VND - nên VND mạnh lên là kịch bản xấu. Đây là lý do nhà xuất khẩu bán USD kỳ hạn, còn nhà nhập khẩu thì làm ngược lại."
      },
      {
        "question": "Phòng hộ bằng forward khác phòng hộ bằng option ở điểm nào?",
        "options": [
          "Forward khóa cứng cả hai chiều, option chỉ chặn chiều xấu",
          "Forward tốn phí trả trước, option thì không mất phí gì",
          "Forward chỉ dùng được cho USD, option cho mọi ngoại tệ",
          "Forward có thể hủy bất cứ lúc nào, option thì không"
        ],
        "correct": 0,
        "explanation": "Forward miễn phí nhưng mất luôn phần lợi nếu tỷ giá đi có lợi. Option giữ được chiều tốt nhưng phải trả premium ngay - lựa chọn giữa hai cái là lựa chọn giữa chắc chắn và linh hoạt."
      },
      {
        "question": "Doanh nghiệp hedge 100% rồi tỷ giá đi có lợi. Nên đánh giá thế nào?",
        "options": [
          "Đúng kế hoạch - phòng hộ đổi phần được lấy phần mất",
          "Sai lầm - lẽ ra nên chờ tỷ giá thay vì khóa sớm như vậy",
          "Không đánh giá được nếu chưa biết tỷ giá cuối năm",
          "Thành công vì doanh nghiệp đã tránh được mọi rủi ro"
        ],
        "correct": 0,
        "explanation": "Phòng hộ không phải là dự đoán đúng. Đánh giá nó bằng việc tỷ giá cuối cùng đi hướng nào là đánh giá sai tiêu chí - câu hỏi đúng là doanh nghiệp có lập được kế hoạch trên một con số chắc chắn hay không."
      }
    ]
  }),
  "prospect-theory-khung-ly-thuyet-chinh-thuc": patch({
    "quiz": [
      {
        "question": "'Điểm tham chiếu' (reference point) trong Prospect Theory có thể thay đổi như thế nào, và tại sao điều này quan trọng đối với nhà quản lý danh mục?",
        "options": [
          "Thường là hiện trạng hoặc giá mua, và có thể dịch chuyển",
          "Do công ty quản lý quỹ quy định trong hợp đồng ủy thác",
          "Luôn là mức lợi nhuận trung bình của thị trường chung",
          "Luôn cố định ở mức giá mua ban đầu của nhà đầu tư"
        ],
        "correct": 0,
        "explanation": "Hiểu điểm tham chiếu là công cụ thực tế quan trọng cho PM: khách hàng không đánh giá hiệu suất danh mục trong chân không, mà so với MỘT ĐIỂM THAM CHIẾU cụ thể (thường là benchmark, đỉnh tài khoản gần nhất, hoặc kỳ vọng ban đầu). Một danh mục giảm 10% có thể được coi là 'thành công tương đối' nếu benchmark giảm 20%, hoặc 'thất bại' nếu benchmark chỉ giảm 2% - communication hiệu quả với khách hàng cần định hình đúng điểm tham chiếu."
      },
      {
        "question": "'Hiệu ứng phản chiếu' (reflection effect) trong Prospect Theory dự đoán điều gì về hành vi chấp nhận rủi ro khi đối mặt với LÃI so với khi đối mặt với LỖ?",
        "options": [
          "Né rủi ro khi đang lãi, tìm rủi ro khi đang lỗ",
          "Né rủi ro khi đang lỗ và tìm rủi ro khi đang lãi",
          "Tìm rủi ro trong cả hai trường hợp lãi và lỗ",
          "Né rủi ro trong cả hai trường hợp lãi và lỗ"
        ],
        "correct": 0,
        "explanation": "Reflection effect giải thích trực tiếp disposition effect ở cấp độ lý thuyết: khi đối mặt với khoản LÃI, não bộ risk-averse (thích 'ăn chắc' - chốt lời sớm); khi đối mặt với khoản LỖ, não bộ risk-seeking (thích 'đánh cược' chờ hồi phục thay vì chốt lỗ chắc chắn). Đây là lý do tại sao đơn thuần 'biết' về ác cảm mất mát chưa đủ để hiểu tại sao hành vi khác nhau hoàn toàn ở hai vùng lãi/lỗ - cần hiểu cơ chế reflection effect."
      },
      {
        "question": "'Probability weighting function' (hàm trọng số xác suất) trong Prospect Theory cho thấy con người xử lý xác suất THẤP và xác suất CAO như thế nào so với xác suất thực tế?",
        "options": [
          "Định giá cao xác suất thấp, định giá thấp xác suất cao",
          "Định giá thấp xác suất thấp và định giá cao xác suất cao",
          "Chỉ quan tâm tới xác suất, bỏ qua độ lớn của kết quả",
          "Đánh giá mọi mức xác suất đúng như giá trị toán học"
        ],
        "correct": 0,
        "explanation": "Đây là một trong những phần tinh vi nhất của Prospect Theory: hàm trọng số xác suất (probability weighting function) không tuyến tính - biến dạng xác suất thấp thành cảm giác 'khả dĩ hơn' thực tế, và xác suất cao thành cảm giác 'kém chắc chắn hơn' thực tế. Điều này giải thích một nghịch lý: cùng một người vừa mua bảo hiểm (trả phí để tránh một rủi ro có xác suất thấp nhưng hậu quả nghiêm trọng) vừa mua vé số (trả tiền để theo đuổi một cơ hội có xác suất thấp nhưng phần thưởng lớn) - cả hai hành vi đều nhất quán với việc định giá cao bất thường các xác suất thấp."
      }
    ,
    {
      "question": "Theo hiệu ứng phản chiếu, người ta hành xử thế nào khi đang ở vùng lỗ so với điểm tham chiếu?",
      "options": [
        "Chấp nhận rủi ro hơn hẳn, sẵn sàng đánh cược lớn hơn để mong gỡ lại phần đã mất",
        "Thận trọng hơn hẳn, ưu tiên chốt lại phần vốn còn giữ được",
        "Không thay đổi, vì mức chấp nhận rủi ro là đặc điểm cố định của mỗi người",
        "Ngừng ra quyết định hoàn toàn cho tới khi giá quay về điểm tham chiếu cũ"
      ],
      "correct": 0,
      "explanation": "Hàm giá trị lồi ở vùng lỗ: mất thêm một chút không đau thêm bao nhiêu, còn cơ hội về bờ thì rất hấp dẫn. Đây là cơ chế đằng sau việc gấp thếp lệnh thua và các vụ giao dịch trái phép kinh điển - người thua tìm cách thắng lại bằng cược lớn hơn."
    },
    {
      "question": "Hàm trọng số xác suất trong Prospect Theory nói gì về cách con người xử lý xác suất rất thấp?",
      "options": [
        "Đánh giá cao hơn thực tế, nên cùng một người vừa mua vé số vừa mua bảo hiểm",
        "Đánh giá thấp hơn thực tế, nên bỏ qua hoàn toàn các rủi ro hiếm gặp",
        "Đánh giá đúng bằng xác suất thực tế nếu đã được cung cấp con số cụ thể",
        "Đánh giá cao hơn với khoản lãi nhưng thấp hơn với khoản lỗ tương đương"
      ],
      "correct": 0,
      "explanation": "Xác suất nhỏ bị thổi phồng trong cảm nhận, xác suất lớn bị hạ thấp. Điều đó giải thích một mâu thuẫn tưởng như vô lý: cùng một người vừa mua vé số vừa mua bảo hiểm - đánh cược vào cái hiếm và phòng ngừa cái hiếm, cả hai đều vì cùng một méo mó."
    }
    ]
  }),
  "thien-kien-hanh-vi-trong-phan-tich-equity": patch({
    "quiz": [
      {
        "question": "'Herding' (tâm lý bầy đàn) trong dự báo của các nhà phân tích equity biểu hiện như thế nào, và tại sao nó xảy ra ngay cả khi mỗi nhà phân tích có động cơ để nổi bật với dự báo riêng biệt?",
        "options": [
          "Dự báo có xu hướng hội tụ gần consensus của thị trường",
          "Analyst chỉ dự báo sau khi công ty công bố guidance",
          "Analyst luôn dự báo cao hơn consensus để gây chú ý",
          "Dự báo phân tán rộng vì mỗi bên dùng mô hình riêng"
        ],
        "correct": 0,
        "explanation": "Đây là một ví dụ tinh vi của herding có ĐỘNG CƠ NGHỀ NGHIỆP đằng sau (không chỉ thuần túy tâm lý): 'career risk' hay 'reputational risk' khiến các nhà phân tích thà sai CÙNG với đám đông (an toàn - 'ai cũng dự báo sai như vậy') hơn là sai KHÁC BIỆT với đám đông (rủi ro - 'chỉ mình tôi sai'), dù về lý thuyết, dự báo độc lập chính xác mới tạo ra giá trị thực sự cho khách hàng. Đây là lý do dự báo consensus thường 'dính chặt' gần nhau hơn mức độ phân tán hợp lý."
      },
      {
        "question": "'Post-Earnings Announcement Drift' (PEAD - độ trễ phản ứng giá sau công bố lợi nhuận) là một market anomaly liên quan trực tiếp đến thiên kiến hành vi nào của nhà đầu tư/nhà phân tích?",
        "options": [
          "Thị trường phản ứng chưa đủ nên giá còn trôi tiếp sau đó",
          "Giá phản ánh tức thì và đầy đủ ngay trong phiên công bố",
          "Thị trường phản ứng thái quá rồi điều chỉnh ngược lại",
          "Giá chỉ phản ứng khi báo cáo kiểm toán được phát hành"
        ],
        "correct": 0,
        "explanation": "PEAD là một trong những anomaly được nghiên cứu nhiều nhất, thách thức trực tiếp Efficient Market Hypothesis (giả thuyết thị trường hiệu quả). 'Conservatism bias' (thiên kiến bảo thủ - cập nhật niềm tin quá chậm khi có thông tin mới, trái ngược với representativeness bias là phản ứng quá mạnh) giải thích một phần tại sao thị trường 'underreact' ban đầu với tin tức lợi nhuận, rồi giá tiếp tục điều chỉnh dần trong nhiều tuần sau - tạo ra cơ hội cho các chiến lược momentum ngắn hạn dựa trên earnings surprise."
      },
      {
        "question": "Tại sao các ngân hàng đầu tư/công ty chứng khoán thường thiết kế 'Chinese Wall' (bức tường thông tin) giữa bộ phận Nghiên cứu (Research) và bộ phận Ngân hàng Đầu tư (Investment Banking), và điều này liên quan thế nào đến thiên kiến hành vi trong phân tích equity?",
        "options": [
          "Giảm xung đột lợi ích giữa bộ phận nghiên cứu và ngân hàng đầu tư",
          "Ngăn nhân viên giữa các bộ phận trao đổi thông tin cá nhân với nhau",
          "Đáp ứng yêu cầu bảo mật dữ liệu khách hàng theo luật hiện hành",
          "Phân tách hệ thống công nghệ thông tin giữa các chi nhánh"
        ],
        "correct": 0,
        "explanation": "Chinese Wall là một cơ chế cấu trúc (structural safeguard) được thiết kế đặc biệt để chống lại chính loại thiên kiến hành vi có nguồn gốc từ động cơ (motivated reasoning) - khi lợi ích tài chính của tổ chức (phí IB) có thể vô thức làm lệch lạc phán đoán 'khách quan' của nhà phân tích nghiên cứu. Đây là ví dụ thực tế về việc ngành tài chính đã xây dựng các quy định/cấu trúc tổ chức cụ thể để đối phó với behavioral finance, không chỉ dừng ở mức độ nhận thức lý thuyết."
      }
    ,
    {
      "question": "Vì sao khuyến nghị của khối phân tích bán lệch mạnh về phía 'mua'?",
      "options": [
        "Vì quan hệ với doanh nghiệp và mảng ngân hàng đầu tư tạo áp lực lên khuyến nghị",
        "Vì phần lớn cổ phiếu trên thị trường thực sự đang được định giá thấp hơn giá trị",
        "Vì quy định của cơ quan quản lý hạn chế việc công bố khuyến nghị bán ra công khai",
        "Vì các nhà phân tích không được tiếp cận đủ dữ liệu để đưa ra khuyến nghị bán"
      ],
      "correct": 0,
      "explanation": "Khuyến nghị bán làm mất quyền tiếp cận ban lãnh đạo và làm hỏng quan hệ với khách hàng tiềm năng của mảng ngân hàng đầu tư. Đó là thiên lệch do cấu trúc động cơ, nên chỉ nhắc nhà phân tích 'khách quan hơn' không sửa được - phải sửa bằng tường thông tin và cách trả lương."
    },
    {
      "question": "Độ trễ phản ứng giá sau công bố lợi nhuận (PEAD) mâu thuẫn với dạng hiệu quả thị trường nào?",
      "options": [
        "Dạng bán mạnh, vì giá không phản ánh ngay toàn bộ thông tin công khai",
        "Dạng yếu, vì nó cho thấy giá quá khứ dự báo được giá tương lai",
        "Dạng mạnh, vì nó cho thấy thông tin nội bộ đang được sử dụng để giao dịch",
        "Không mâu thuẫn với dạng nào, vì PEAD chỉ là hiện tượng thống kê ngẫu nhiên"
      ],
      "correct": 0,
      "explanation": "Lợi nhuận là thông tin công khai, mà giá vẫn tiếp tục trôi theo hướng bất ngờ đó trong nhiều tuần - tức thị trường phản ứng chưa đủ ngay lập tức. Đó đúng là điều dạng bán mạnh loại trừ, và là một trong những bất thường bền bỉ nhất từng được ghi nhận."
    }
    ]
  }),
  "thien-kien-hanh-vi-trong-tai-chinh-doanh-nghiep": patch({
    "quiz": [
      {
        "question": "'Sunk Cost Fallacy' trong Capital Budgeting (thẩm định dự án đầu tư doanh nghiệp) biểu hiện như thế nào, và tại sao nó đặc biệt nguy hiểm ở cấp độ tổ chức lớn?",
        "options": [
          "Đổ thêm vốn vào dự án thất bại vì đã lỡ chi quá nhiều",
          "Tính cả chi phí đã bỏ ra vào NPV của giai đoạn tiếp theo",
          "Dừng dự án ngay khi chi phí vượt ngân sách ban đầu",
          "Chỉ duyệt dự án có thời gian hoàn vốn dưới ba năm"
        ],
        "correct": 0,
        "explanation": "'Escalation of commitment' (leo thang cam kết) là biến thể tổ chức của sunk cost fallacy: người phê duyệt dự án ban đầu (thường là lãnh đạo cấp cao) có động cơ tâm lý VÀ chính trị mạnh mẽ để tiếp tục bảo vệ quyết định của mình, ngay cả khi dữ liệu mới cho thấy dự án nên bị hủy bỏ. Nguyên tắc tài chính doanh nghiệp chuẩn (NPV/IRR từ điểm hiện tại, bỏ qua chi phí đã bỏ ra) thường bị ghi đè bởi động lực bảo vệ danh tiếng cá nhân của người ra quyết định ban đầu."
      },
      {
        "question": "Tại sao các công ty thường thiết lập 'Investment Committee' (Ủy ban đầu tư) độc lập để phê duyệt các quyết định capital budgeting lớn, thay vì để một cá nhân (như CFO hoặc CEO) quyết định đơn phương?",
        "options": [
          "Phê duyệt tập thể giảm tác động của thiên kiến cá nhân",
          "Đáp ứng yêu cầu bắt buộc của chuẩn mực quản trị công ty",
          "Rút ngắn thời gian phê duyệt so với để một người quyết",
          "Chia sẻ trách nhiệm pháp lý khi dự án thất bại về sau"
        ],
        "correct": 0,
        "explanation": "Investment Committee là cơ chế cấu trúc (structural safeguard) tương tự Chinese Wall, nhằm chống lại thiên kiến hành vi ở cấp độ ra quyết định lớn - nhưng cần lưu ý: bản thân nhóm/ủy ban cũng dễ mắc 'groupthink' (một dạng herding tập thể) nếu không được thiết kế cẩn thận, nên các tổ chức tốt thường có quy trình phản biện chính thức (như chỉ định người đóng vai 'devil's advocate' để chủ động tìm lỗ hổng trong đề xuất)."
      },
      {
        "question": "'Confirmation bias' (thiên kiến xác nhận) ảnh hưởng thế nào đến việc thẩm định (due diligence) một thương vụ M&A sau khi ban lãnh đạo đã 'quyết tâm' theo đuổi thương vụ đó?",
        "options": [
          "Đội thẩm định tìm bằng chứng ủng hộ thương vụ đã định làm",
          "Đội thẩm định dựa quá nhiều vào số liệu bên bán cung cấp",
          "Đội thẩm định chỉ nhìn số liệu quá khứ, bỏ qua dự phóng",
          "Đội thẩm định bỏ sót dữ liệu vì thời gian quá gấp rút"
        ],
        "correct": 0,
        "explanation": "Đây là một rủi ro thực tế nghiêm trọng trong M&A: khi CEO/ban lãnh đạo đã công khai cam kết theo đuổi một thương vụ (đôi khi trước cả khi due diligence bắt đầu), toàn bộ tổ chức - bao gồm cả đội ngũ due diligence chuyên nghiệp - chịu áp lực tâm lý (và đôi khi chính trị nội bộ) để tìm ra lý do XÁC NHẬN quyết định đó là đúng, thay vì thực sự thách thức nó. Đây là lý do nhiều chuyên gia khuyến nghị giữ due diligence độc lập khỏi áp lực 'deal momentum' và tránh công bố ý định thương vụ quá sớm trước khi thẩm định hoàn tất."
      }
    ,
    {
      "question": "Theo giả thuyết ngạo mạn của Roll, vì sao bên mua thường trả phần thặng dư quá cao trong M&A?",
      "options": [
        "Vì lãnh đạo tin định giá của mình đúng hơn định giá của thị trường",
        "Vì bên bán luôn có nhiều thông tin nội bộ hơn nên ép được giá cao hơn",
        "Vì quy định buộc bên mua phải chào giá cao hơn thị giá một tỷ lệ tối thiểu",
        "Vì chi phí tư vấn của thương vụ được tính theo phần trăm giá trị giao dịch"
      ],
      "correct": 0,
      "explanation": "Ngạo mạn biến thành con số cụ thể: mức thặng dư chào mua. Cộng thêm lời nguyền của người thắng cuộc trong đấu giá - người trả cao nhất thường là người ước lượng lạc quan nhất - kết quả là phần lớn giá trị cộng hưởng rơi về cổ đông bên bán."
    },
    {
      "question": "Ngụy biện chi phí chìm ở cấp tổ chức nguy hiểm hơn ở cấp cá nhân vì lý do gì?",
      "options": [
        "Vì người phê duyệt tiếp thường là người đã phê duyệt khoản chi trước đó",
        "Vì doanh nghiệp không có công cụ kế toán để theo dõi các khoản đã chi ra",
        "Vì quy mô mỗi lần chi thêm ở doanh nghiệp luôn nhỏ hơn khoản đã bỏ ra",
        "Vì chi phí chìm ở doanh nghiệp được hạch toán vào lợi nhuận của kỳ sau"
      ],
      "correct": 0,
      "explanation": "Dừng dự án là công khai thừa nhận quyết định trước đó sai, và người phải thừa nhận thường chính là người có quyền quyết định tiếp. Đó là lý do các công ty tách quyền phê duyệt giai đoạn sau sang một ủy ban khác với người đã bảo trợ dự án ban đầu."
    }
    ]
  }),
  "ke-toan-don-tich-vs-ke-toan-tien-mat": patch({
    "quiz": [
      {
        "question": "Vì sao hầu hết các công ty đại chúng/niêm yết trên sàn chứng khoán BẮT BUỘC phải sử dụng kế toán dồn tích thay vì kế toán tiền mặt, dù kế toán tiền mặt đơn giản hơn nhiều?",
        "options": [
          "Vì nó khớp doanh thu với chi phí trong đúng kỳ phát sinh",
          "Vì nó cho biết chính xác số dư tiền mặt tại mọi thời điểm",
          "Vì cơ quan thuế chỉ chấp nhận số liệu theo cơ sở dồn tích",
          "Vì nó đơn giản hơn nên giảm chi phí kiểm toán hằng năm"
        ],
        "correct": 0,
        "explanation": "Nguyên tắc phù hợp (matching principle) là lý do cốt lõi: kế toán dồn tích ghép đúng doanh thu của một kỳ với các chi phí đã bỏ ra để tạo ra doanh thu đó, bất kể dòng tiền thực tế xảy ra khi nào - giúp báo cáo tài chính phản ánh đúng HIỆU QUẢ KINH DOANH thực chất, thay vì bị biến dạng bởi việc khách hàng trả tiền sớm hay muộn (yếu tố không liên quan đến hiệu quả vận hành thực sự của công ty)."
      },
      {
        "question": "'Chi phí trả trước' (prepaid expenses) như tiền thuê văn phòng trả trước 1 năm được xử lý như thế nào trong kế toán dồn tích?",
        "options": [
          "Ghi là tài sản lúc trả, phân bổ dần vào chi phí",
          "Ghi toàn bộ vào chi phí ngay tại thời điểm thanh toán",
          "Không ghi nhận cho đến khi hết thời hạn thuê nhà",
          "Ghi là nợ phải trả rồi giảm dần theo từng tháng"
        ],
        "correct": 0,
        "explanation": "Đây là ứng dụng trực tiếp của matching principle: dù tiền đã chi ra hết ngay từ đầu, chi phí thuê văn phòng thực sự 'phát sinh' dần theo từng tháng sử dụng - kế toán dồn tích ghi nhận khoản trả trước là TÀI SẢN, rồi phân bổ (amortize) dần thành CHI PHÍ qua các kỳ tương ứng, đảm bảo mỗi tháng chỉ ghi nhận đúng phần chi phí thực sự thuộc về tháng đó."
      },
      {
        "question": "Một công ty có lợi nhuận kế toán (theo dồn tích) dương nhưng dòng tiền hoạt động (operating cash flow) âm trong cùng kỳ. Điều này có thể phản ánh vấn đề gì cần kế toán viên/nhà phân tích lưu ý?",
        "options": [
          "Có thể do doanh thu tăng nhưng chưa thu được tiền",
          "Do công ty trích khấu hao quá lớn trong kỳ báo cáo",
          "Không thể xảy ra nếu kế toán ghi sổ đúng chuẩn mực",
          "Chắc chắn là dấu hiệu gian lận báo cáo tài chính"
        ],
        "correct": 0,
        "explanation": "Đây là lý do quan trọng nhất giải thích tại sao kế toán dồn tích - dù chuẩn xác về mặt ghi nhận hiệu quả kinh doanh - vẫn cần được bổ sung bằng báo cáo lưu chuyển tiền tệ (cash flow statement): lợi nhuận dồn tích dương nhưng dòng tiền âm là tín hiệu cảnh báo sớm phổ biến (early warning sign) mà nhiều vụ sụp đổ doanh nghiệp trong lịch sử đã bỏ qua - công ty có thể 'có lãi trên giấy' nhưng thực sự cạn kiệt tiền mặt để vận hành."
      },
      {
        "question": "Scenario: Doanh nghiệp trả trước 120 triệu tiền thuê văn phòng cho 12 tháng. Kế toán dồn tích ghi nhận thế nào trong tháng đầu tiên?",
        "options": [
          "Chi phí 10 triệu, còn 110 triệu là tài sản",
          "Chi phí 120 triệu ngay trong tháng chi tiền",
          "Không ghi chi phí nào cho tới khi hết 12 tháng",
          "Chi phí 10 triệu và 110 triệu ghi là nợ phải trả"
        ],
        "correct": 0,
        "explanation": "Nguyên tắc phù hợp ghép chi phí với kỳ mà nó tạo ra lợi ích: mỗi tháng dùng một tháng văn phòng nên ghi 10 triệu. Phần chưa dùng là quyền được sử dụng trong tương lai, tức một tài sản - không phải nợ, vì tiền đã trả xong rồi."
      },
      {
        "question": "Một công ty có lợi nhuận kế toán dương nhưng dòng tiền hoạt động âm kéo dài. Dấu hiệu đáng ngờ nhất là gì?",
        "options": [
          "Doanh thu ghi nhận nhưng tiền chưa thu về",
          "Công ty đang trả cổ tức vượt quá lợi nhuận",
          "Chi phí khấu hao được ghi nhận quá thấp",
          "Công ty vay thêm nợ dài hạn để mở rộng sản xuất"
        ],
        "correct": 0,
        "explanation": "Khoảng cách kéo dài giữa lãi và tiền gần như luôn nằm ở khoản phải thu phình ra: bán được hàng, ghi doanh thu, nhưng khách không trả. Trả cổ tức và vay nợ đều nằm ở dòng tiền tài chính nên không giải thích được phần hoạt động."
      }
    ]
  }),
  "quy-trinh-dau-tu-quy-tu-thesis-den-portfolio": patch({
    "quiz": [
      {
        "question": "'Position Sizing' (xác định quy mô vị thế) trong quản lý danh mục dựa trên những yếu tố nào, ngoài mức độ 'tự tin' của PM vào ý tưởng đầu tư đó?",
        "options": [
          "Mức tự tin vào thesis, biến động, và tương quan danh mục",
          "Theo tỷ trọng của cổ phiếu đó trong chỉ số tham chiếu",
          "Chỉ dựa vào mức lợi nhuận kỳ vọng của từng cổ phiếu",
          "Chia đều vốn cho mọi vị thế để đảm bảo đa dạng hóa"
        ],
        "correct": 0,
        "explanation": "Position sizing chuyên nghiệp là một bài toán đa chiều, không chỉ dựa vào 'niềm tin': một cổ phiếu có thesis xuất sắc nhưng biến động cực cao hoặc thanh khoản thấp (khó bán nhanh khi cần) thường được giới hạn tỷ trọng nhỏ hơn để kiểm soát rủi ro tổng thể của danh mục - đây là lý do các quỹ chuyên nghiệp dùng công cụ định lượng (như Kelly Criterion điều chỉnh, hoặc risk parity) thay vì chỉ dựa vào cảm tính của một cá nhân."
      },
      {
        "question": "Tại sao 'Risk Budget' (ngân sách rủi ro) là khái niệm quan trọng trong việc xây dựng danh mục, khác với việc chỉ đơn giản giới hạn số tiền đầu tư vào mỗi cổ phiếu?",
        "options": [
          "Phân bổ theo mức rủi ro đóng góp, không theo số tiền",
          "Đặt trần cho tổng số tiền được phép đầu tư trong mỗi tháng",
          "Giới hạn số lượng vị thế tối đa trong cùng một danh mục",
          "Quy định mức cắt lỗ tối đa cho từng vị thế riêng lẻ"
        ],
        "correct": 0,
        "explanation": "Đây là khác biệt tinh vi nhưng quan trọng: 'giới hạn tiền' ($10 triệu/cổ phiếu) không kiểm soát được rủi ro thực sự đóng góp vào danh mục, vì các cổ phiếu có mức độ biến động rất khác nhau. Risk Budget (phân bổ theo đóng góp rủi ro - risk contribution) đảm bảo mỗi vị thế đóng góp một mức rủi ro TƯƠNG ĐỐI CÂN BẰNG vào tổng thể, thay vì để một vài cổ phiếu biến động cao vô tình chi phối phần lớn rủi ro của cả danh mục dù số tiền đầu tư không lớn hơn các vị thế khác."
      },
      {
        "question": "Vì sao một quỹ có thể quyết định KHÔNG đầu tư vào một cổ phiếu dù đội ngũ Research đánh giá rất tích cực về triển vọng công ty, chỉ vì lý do thanh khoản (liquidity)?",
        "options": [
          "Vì thanh khoản quá thấp so với quy mô vốn quỹ cần vào",
          "Vì cổ phiếu đó không nằm trong chỉ số tham chiếu của quỹ",
          "Vì đội research không được quyền quyết định cuối cùng",
          "Vì quỹ đã hết ngân sách đầu tư cho năm tài chính đó"
        ],
        "correct": 0,
        "explanation": "Rủi ro thanh khoản (liquidity risk) là một trong những yếu tố bị đánh giá thấp nhất bởi nhà đầu tư cá nhân nhưng luôn được các quỹ chuyên nghiệp cân nhắc kỹ: một vị thế 'tốt' về mặt cơ bản có thể trở thành gánh nặng nếu quỹ cần thoát ra nhanh (do redemption pressure hoặc thay đổi điều kiện thị trường) mà thị trường không đủ thanh khoản để hấp thụ lệnh bán mà không gây tác động giá đáng kể - đây là lý do nhiều quỹ đặt giới hạn về % khối lượng giao dịch trung bình hàng ngày (average daily volume) mà một vị thế có thể chiếm."
      },
      {
        "question": "Scenario: Đội research đưa ra một ý tưởng rất thuyết phục nhưng quỹ vẫn quyết định không mua. Lý do hợp lý nhất là gì?",
        "options": [
          "Vị thế trùng rủi ro với phần đã có trong danh mục",
          "Vì đội research không đủ thẩm quyền quyết định",
          "Vì quỹ chỉ mua cổ phiếu nằm trong chỉ số tham chiếu",
          "Vì ý tưởng tốt luôn đã phản ánh hết vào giá"
        ],
        "correct": 0,
        "explanation": "Một cổ phiếu tốt vẫn có thể là lựa chọn tệ cho danh mục này: nếu nó cùng chịu một rủi ro với những gì đã nắm, mua thêm chỉ là đặt cược lớn hơn vào cùng một điều. Quyết định cuối nằm ở mức đóng góp rủi ro, không ở chất lượng riêng lẻ."
      },
      {
        "question": "Position sizing chuyên nghiệp dựa trên những yếu tố nào?",
        "options": [
          "Độ tự tin, biến động, tương quan và thanh khoản",
          "Chia đều vốn cho mọi mã trong danh sách",
          "Mức lợi nhuận kỳ vọng cao nhất của từng mã",
          "Thứ tự thời gian đội research đề xuất ý tưởng"
        ],
        "correct": 0,
        "explanation": "Chia đều nghe công bằng nhưng thực chất là để mã biến động nhất chi phối kết quả danh mục. Xác định quy mô vị thế là quy đổi mọi vị thế về cùng một đơn vị rủi ro, rồi mới nhân lên theo mức độ tin tưởng vào từng ý tưởng."
      }
    ]
  }),
  "quant-strategies-momentum-mean-reversion": patch({
    "quiz": [
      {
        "question": "Chiến lược 'Mean Reversion' (hồi quy về trung bình) khác với Momentum như thế nào về giả định cơ bản, và khi nào mỗi chiến lược có xu hướng hoạt động hiệu quả hơn?",
        "options": [
          "Mean reversion giả định giá quay về trung bình lịch sử",
          "Mean reversion dựa vào tin tức thay vì dữ liệu giá lịch sử",
          "Mean reversion giả định xu hướng hiện tại sẽ kéo dài thêm",
          "Mean reversion chỉ áp dụng cho thị trường hàng hóa cơ bản"
        ],
        "correct": 0,
        "explanation": "Đây là hai trường phái GIẢ ĐỊNH ĐỐI LẬP về hành vi giá, và việc chúng cùng tồn tại (và cùng có bằng chứng thực nghiệm hỗ trợ) cho thấy thị trường tài chính phức tạp hơn một mô hình đơn giản: Mean Reversion hoạt động tốt khi biến động giá phần lớn là 'noise' ngẫu nhiên quanh giá trị hợp lý (đặc biệt khung thời gian rất ngắn), trong khi Momentum hoạt động tốt khi có xu hướng thông tin cơ bản thực sự đang thay đổi (khung thời gian trung hạn). Quant chuyên nghiệp phải hiểu rõ ĐIỀU KIỆN THỊ TRƯỜNG nào phù hợp với chiến lược nào."
      },
      {
        "question": "'Statistical Arbitrage' (Stat Arb) - giao dịch cặp (pairs trading) là ví dụ phổ biến - hoạt động dựa trên nguyên lý gì?",
        "options": [
          "Tìm hai tài sản có quan hệ giá ổn định rồi giao dịch chênh lệch",
          "Mua cổ phiếu rẻ nhất và bán khống cổ phiếu đắt nhất ngành",
          "Giao dịch cùng lúc trên hai sàn để hưởng chênh lệch giá",
          "Dự báo giá bằng mô hình học máy trên dữ liệu tin tức"
        ],
        "correct": 0,
        "explanation": "Statistical Arbitrage là một biến thể tinh vi của Mean Reversion, áp dụng ở cấp độ MỐI QUAN HỆ TƯƠNG ĐỐI giữa hai tài sản thay vì giá tuyệt đối của một tài sản đơn lẻ. Tính chất 'market neutral' (trung lập thị trường) là điểm hấp dẫn quan trọng: bằng cách long một tài sản và short một tài sản khác có tương quan cao, chiến lược này về lý thuyết loại bỏ được rủi ro biến động chung của toàn thị trường, chỉ còn phụ thuộc vào việc chênh lệch tương đối giữa hai tài sản có hội tụ như kỳ vọng hay không."
      },
      {
        "question": "Tại sao các chiến lược quant dựa trên factor (như Momentum, Value) thường trải qua giai đoạn 'crowding' (quá đông người áp dụng), và điều gì xảy ra khi một factor trở nên quá crowded?",
        "options": [
          "Vì nhiều bên cùng khai thác nên biên lợi nhuận mỏng đi",
          "Vì chi phí giao dịch tăng lên khi có nhiều người tham gia",
          "Vì cơ quan quản lý hạn chế các chiến lược định lượng",
          "Vì dữ liệu lịch sử dùng kiểm định thường bị sai lệch"
        ],
        "correct": 0,
        "explanation": "Đây là một trong những rủi ro thực tế quan trọng nhất trong quant investing hiện đại: 'Quant Quake' tháng 8/2007 là ví dụ kinh điển - nhiều quỹ quant lớn đồng thời sử dụng các chiến lược tương tự nhau (dựa trên các factor phổ biến), và khi một số quỹ cần thanh lý vị thế nhanh (do margin call hoặc redemption), việc bán tháo đồng loạt các cổ phiếu có 'factor exposure' tương tự gây ra biến động giá cực đoan trong vài ngày, ảnh hưởng đến hầu hết các quỹ quant khác dù chiến lược của họ vốn không có lỗi về mặt logic."
      },
      {
        "question": "Momentum và Mean Reversion đưa ra tín hiệu trái ngược nhau. Khác biệt chính nằm ở đâu?",
        "options": [
          "Ở khung thời gian áp dụng của mỗi chiến lược",
          "Ở việc chiến lược nào dùng dữ liệu cơ bản hơn",
          "Ở chỗ chỉ một trong hai có cơ sở học thuật",
          "Ở loại tài sản, một cho cổ phiếu một cho trái phiếu"
        ],
        "correct": 0,
        "explanation": "Hai chiến lược không mâu thuẫn vì chúng nói về hai khung thời gian: giá có xu hướng nối tiếp ở khung trung hạn vài tháng, và có xu hướng quay về trung bình ở khung rất ngắn hoặc rất dài. Cùng một dữ liệu, đọc ở hai độ phân giải khác nhau."
      },
      {
        "question": "Vì sao các chiến lược dựa trên factor thường có giai đoạn kém hiệu quả kéo dài?",
        "options": [
          "Vì phần bù factor không xuất hiện đều theo năm",
          "Vì mô hình toán bị lỗi sau vài năm sử dụng",
          "Vì phí giao dịch ăn hết toàn bộ phần lợi nhuận",
          "Vì factor chỉ hoạt động ở thị trường phát triển"
        ],
        "correct": 0,
        "explanation": "Phần bù factor là trung bình dài hạn, và một trung bình dương hoàn toàn tương thích với nhiều năm liền âm. Đây chính là lý do factor còn tồn tại: nếu nó trả tiền đều đặn mọi năm thì đã bị chênh lệch giá xóa sạch từ lâu."
      }
    ]
  }),
  "ban-cheo-san-pham-va-kpi-cua-rm-ngan-hang": patch({
    "quiz": [
      {
        "question": "'Customer Lifetime Value' (CLV - giá trị vòng đời khách hàng) là khái niệm quan trọng như thế nào đối với chiến lược bán chéo dài hạn của một RM, so với việc chỉ tập trung vào doanh số giao dịch đơn lẻ?",
        "options": [
          "Tổng lợi nhuận khách mang lại suốt cả mối quan hệ",
          "Số sản phẩm khách đã mua nhân với biên lợi nhuận trung bình",
          "Doanh thu khách hàng tạo ra trong năm tài chính gần nhất",
          "Tổng số dư tiền gửi bình quân của khách trong một năm"
        ],
        "correct": 0,
        "explanation": "Tư duy CLV là nền tảng của bán chéo chuyên nghiệp bền vững: một RM giỏi hiểu rằng tối ưu hóa cho MỘT giao dịch (bán được sản phẩm hoa hồng cao nhất ngay lúc này) có thể phá hủy giá trị dài hạn nếu khách hàng cảm thấy bị 'bán hàng' thay vì được tư vấn - dẫn đến mất niềm tin, rời bỏ ngân hàng, hoặc không giới thiệu người quen. Ngược lại, tư vấn đúng nhu cầu xây dựng niềm tin, tạo ra nhiều giao dịch tự nhiên hơn qua nhiều năm và referral từ khách hàng hài lòng."
      },
      {
        "question": "Khi hệ thống KPI của ngân hàng đặt áp lực doanh số rất cao lên RM (như trường hợp Wells Fargo), rủi ro đạo đức nghề nghiệp nào có thể phát sinh, và làm sao một RM có trách nhiệm có thể cân bằng giữa áp lực KPI và lợi ích khách hàng?",
        "options": [
          "Dẫn tới mis-selling: tư vấn sản phẩm không phù hợp",
          "Dẫn tới chi phí marketing tăng vượt ngân sách được duyệt",
          "Dẫn tới ngân hàng phải giảm lãi suất để giữ khách hàng",
          "Dẫn tới RM nghỉ việc hàng loạt nên chi phí tuyển tăng"
        ],
        "correct": 0,
        "explanation": "Đây là tình huống đạo đức nghề nghiệp thực tế mà nhiều RM phải đối mặt: nhận diện được ranh giới giữa 'bán chéo có trách nhiệm' và 'mis-selling do áp lực KPI' là kỹ năng quan trọng - không chỉ vì rủi ro pháp lý (nhiều quốc gia có quy định bảo vệ người tiêu dùng tài chính ngày càng chặt chẽ), mà còn vì hậu quả dài hạn đến uy tín cá nhân và tổ chức khi mis-selling bị phát hiện."
      },
      {
        "question": "'Fact-Finding' (tìm hiểu thông tin khách hàng) trước khi tư vấn sản phẩm nên bao gồm những khía cạnh nào để đảm bảo đề xuất thực sự phù hợp?",
        "options": [
          "Mục tiêu, tình hình tài chính, khẩu vị rủi ro của khách",
          "Danh sách sản phẩm ngân hàng khách đã từng từ chối mua",
          "Lịch sử giao dịch và số dư tài khoản trong ba năm qua",
          "Thông tin nhân thân và giấy tờ tùy thân theo quy định"
        ],
        "correct": 0,
        "explanation": "Fact-finding toàn diện là bước nền tảng của tư vấn tài chính có trách nhiệm - tương tự quy trình mà các Certified Financial Planner (CFP) được đào tạo bài bản: hiểu đầy đủ bối cảnh tài chính và cuộc sống của khách hàng trước khi đề xuất bất kỳ sản phẩm nào, đảm bảo lời khuyên thực sự dựa trên NHU CẦU của khách hàng, không phải dựa trên sản phẩm nào ngân hàng đang cần đẩy doanh số."
      },
      {
        "question": "Scenario: Ngân hàng đặt KPI doanh số rất cao lên đội RM. Hệ quả nhiều khả năng nhất là gì?",
        "options": [
          "Bán sản phẩm khách không cần, mất khách về dài hạn",
          "Tăng bền vững doanh thu mảng bán lẻ mỗi năm",
          "Khách hàng chủ động giới thiệu thêm người quen",
          "RM tự động nâng cao kỹ năng tư vấn chuyên sâu"
        ],
        "correct": 0,
        "explanation": "Chỉ tiêu đo số hợp đồng bán được chứ không đo sự phù hợp, nên khi áp lực đủ lớn, RM sẽ tối ưu đúng thứ được đo. Vụ Wells Fargo là ví dụ cực đoan: hàng triệu tài khoản mở khống, và cái giá cuối cùng lớn hơn nhiều lần doanh thu đã thu được."
      },
      {
        "question": "Fact-finding trước khi tư vấn sản phẩm nên bao gồm những gì?",
        "options": [
          "Thu nhập, nợ, mục tiêu và mức chịu rủi ro",
          "Danh sách sản phẩm ngân hàng đang cần đẩy",
          "Chỉ tiêu doanh số còn thiếu của RM trong quý",
          "Lịch sử giao dịch để chọn sản phẩm hoa hồng cao"
        ],
        "correct": 0,
        "explanation": "Bán chéo dựa trên nhu cầu bắt đầu từ bức tranh tài chính của khách rồi mới tìm sản phẩm khớp vào, chứ không đi ngược lại. Ba phương án còn lại đều lấy nhu cầu của ngân hàng làm điểm xuất phát - đó chính là ranh giới giữa tư vấn và nhồi nhét."
      }
    ]
  }),
  "quy-trinh-hoach-dinh-tai-chinh-6-buoc": patch({
    "quiz": [
      {
        "question": "Sau bước 'thu thập dữ liệu', bước tiếp theo trong quy trình hoạch định tài chính là 'phân tích và đánh giá tình hình tài chính' (analyze and assess). Bước này bao gồm những phân tích cụ thể nào?",
        "options": [
          "Dòng tiền, tài sản ròng, mức bảo vệ rủi ro hiện có",
          "Lịch sử tín dụng và điểm xếp hạng tín dụng của cá nhân",
          "Danh sách sản phẩm phù hợp nhất với khách hàng đó",
          "Bản kế hoạch chi tiết cho từng mục tiêu tài chính"
        ],
        "correct": 0,
        "explanation": "Bước phân tích là nơi advisor thực sự tạo ra giá trị chuyên môn: không chỉ liệt kê con số, mà đánh giá TOÀN DIỆN sức khỏe tài chính - từ dòng tiền, tài sản ròng, mức độ bảo vệ rủi ro, đến khoảng cách giữa tình hình hiện tại và mục tiêu đã đặt ra. Đây là bước tạo nền tảng cho các khuyến nghị cụ thể ở bước tiếp theo, và là lý do một financial plan chất lượng thường dày nhiều trang phân tích, không chỉ là danh sách sản phẩm được đề xuất."
      },
      {
        "question": "Tại sao bước cuối cùng của quy trình - 'giám sát và cập nhật kế hoạch' (monitor and update) - lại quan trọng không kém các bước phân tích/đề xuất ban đầu, dù nhiều khách hàng (và cả advisor thiếu kinh nghiệm) có xu hướng bỏ qua bước này?",
        "options": [
          "Vì hoàn cảnh và mục tiêu của khách thay đổi liên tục",
          "Vì sản phẩm tài chính mới liên tục được tung ra thị trường",
          "Vì quy định yêu cầu rà soát hồ sơ khách hàng hằng năm",
          "Vì cần tính lại phí tư vấn theo giá trị tài sản mới"
        ],
        "correct": 0,
        "explanation": "Đây là điểm khác biệt giữa 'lập kế hoạch tài chính một lần' và 'quản lý tài chính liên tục' (ongoing financial planning relationship) - giá trị thực sự của một advisor chuyên nghiệp không chỉ nằm ở bản kế hoạch ban đầu, mà ở việc đồng hành và điều chỉnh kế hoạch đó qua các giai đoạn cuộc đời và biến động thị trường của khách hàng, đảm bảo kế hoạch luôn phù hợp với thực tế đang thay đổi."
      },
      {
        "question": "'Fiduciary Duty' (nghĩa vụ ủy thác) trong nghề tư vấn tài chính có ý nghĩa gì, và tại sao nó khác biệt quan trọng so với tiêu chuẩn 'suitability' (phù hợp) thấp hơn?",
        "options": [
          "Đặt lợi ích khách hàng lên trên lợi ích của bản thân",
          "Chỉ giới thiệu sản phẩm phù hợp với hồ sơ rủi ro khách",
          "Chịu trách nhiệm bồi thường nếu khách hàng bị thua lỗ",
          "Bảo mật tuyệt đối mọi thông tin khách hàng cung cấp"
        ],
        "correct": 0,
        "explanation": "Sự khác biệt giữa Fiduciary Standard và Suitability Standard là một trong những tranh luận quan trọng nhất trong ngành tư vấn tài chính hiện đại: Fiduciary Duty (áp dụng cho Registered Investment Advisors - RIA và CFP tại nhiều thị trường) đòi hỏi mức độ trách nhiệm cao nhất - luôn đặt lợi ích khách hàng lên trên, trong khi Suitability Standard (áp dụng cho nhiều broker-dealer) chỉ yêu cầu sản phẩm 'không gây hại rõ ràng' và 'phù hợp' với khách hàng, cho phép advisor vẫn ưu tiên sản phẩm có lợi cho họ hơn miễn là vẫn 'phù hợp' về mặt kỹ thuật."
      },
      {
        "question": "Scenario: Advisor gặp khách lần đầu và đề xuất ngay một hợp đồng bảo hiểm nhân thọ. Quy trình sai ở đâu?",
        "options": [
          "Bỏ qua thu thập dữ liệu và phân tích trước đó",
          "Bỏ qua bước giám sát và cập nhật kế hoạch",
          "Bỏ qua việc trình bày nhiều phương án khác nhau",
          "Không sai, miễn sản phẩm phù hợp với khách"
        ],
        "correct": 0,
        "explanation": "Đề xuất sản phẩm là bước gần cuối chứ không phải bước đầu. Chưa biết dòng tiền, tài sản ròng, nghĩa vụ và mục tiêu của khách thì không thể biết họ cần bảo vệ điều gì - và một sản phẩm đúng cho người khác vẫn có thể sai cho người này."
      },
      {
        "question": "Fiduciary Duty buộc người tư vấn tài chính phải làm gì?",
        "options": [
          "Đặt lợi ích khách hàng lên trên lợi ích của mình",
          "Đảm bảo khoản đầu tư của khách không bị lỗ",
          "Chỉ giới thiệu sản phẩm do công ty mình phát hành",
          "Báo cáo mọi giao dịch cho cơ quan quản lý"
        ],
        "correct": 0,
        "explanation": "Chuẩn này cao hơn hẳn mức 'sản phẩm phù hợp': khi có hai lựa chọn cùng phù hợp mà một cái trả hoa hồng cao hơn, nghĩa vụ ủy thác buộc phải chọn cái tốt hơn cho khách. Nó tồn tại vì khách hàng không có cách nào tự kiểm chứng lời khuyên."
      }
    ]
  }),
  "market-anomalies-va-behavioral-finance": patch({
    "quiz": [
      {
        "question": "'Small-Cap Effect' (hiệu ứng vốn hóa nhỏ) - cổ phiếu vốn hóa nhỏ có xu hướng outperform cổ phiếu vốn hóa lớn trong dài hạn - có thể được giải thích một phần bởi thiên kiến hành vi nào của nhà đầu tư tổ chức lớn?",
        "options": [
          "Nhà đầu tư tổ chức tránh vì giới hạn thanh khoản",
          "Công ty nhỏ luôn tăng trưởng lợi nhuận nhanh hơn hẳn",
          "Cổ phiếu nhỏ ít bị ảnh hưởng bởi biến động vĩ mô",
          "Cổ phiếu nhỏ được miễn thuế giao dịch trên sàn"
        ],
        "correct": 0,
        "explanation": "'Neglect effect' (hiệu ứng bị bỏ quên) là một giải thích hành vi quan trọng cho Small-Cap Effect: khi một cổ phiếu ít được các nhà phân tích chuyên nghiệp theo dõi và ít nhà đầu tư tổ chức lớn tham gia, khả năng thị trường 'định giá sai' (do thiếu thông tin/phân tích kỹ lưỡng) tăng lên - tạo ra cơ hội tiềm năng cho nhà đầu tư sẵn sàng nghiên cứu sâu các cổ phiếu ít được chú ý này, dù đi kèm rủi ro thanh khoản và biến động cao hơn."
      },
      {
        "question": "'January Effect' (hiệu ứng tháng Giêng - cổ phiếu, đặc biệt vốn hóa nhỏ, có xu hướng outperform trong tháng 1) từng được ghi nhận rộng rãi nhưng đã YẾU ĐI ĐÁNG KỂ theo thời gian. Điều này minh họa nguyên lý quan trọng nào về market anomalies nói chung?",
        "options": [
          "Nhiều anomaly suy yếu sau khi được công bố rộng rãi",
          "Anomaly luôn mạnh lên theo thời gian khi nhiều người biết",
          "Anomaly chỉ tồn tại ở thị trường Mỹ, không ở nơi khác",
          "Quy định mới cấm giao dịch dựa trên các anomaly này"
        ],
        "correct": 0,
        "explanation": "'Anomaly decay' là một phát hiện quan trọng và có phần tự tham chiếu (self-referential) thú vị trong tài chính hành vi/định lượng: chính việc công bố nghiên cứu về một anomaly có thể góp phần làm nó yếu đi, vì các quỹ đầu tư (đặc biệt quant funds) nhanh chóng xây dựng chiến lược khai thác nó, dần đẩy giá về mức 'hiệu quả' hơn. Đây là lý do một số nhà nghiên cứu coi đây như bằng chứng cho thấy thị trường có xu hướng TIẾN DẦN VỀ hiệu quả theo thời gian, dù không bao giờ hoàn toàn hiệu quả tuyệt đối."
      },
      {
        "question": "Tại sao 'limits to arbitrage' (giới hạn của kinh doanh chênh lệch giá) là khái niệm quan trọng giải thích tại sao các market anomaly có thể TỒN TẠI DAI DẲNG dù về lý thuyết, nhà đầu tư thông minh nên khai thác và loại bỏ chúng ngay lập tức?",
        "options": [
          "Arbitrage thực tế không phi rủi ro như lý thuyết giả định",
          "Arbitrage bị pháp luật cấm ở phần lớn thị trường phát triển",
          "Arbitrage chỉ thực hiện được bởi nhà đầu tư cá nhân nhỏ lẻ",
          "Arbitrage luôn xóa sạch mọi chênh lệch giá ngay lập tức"
        ],
        "correct": 0,
        "explanation": "Khái niệm 'Limits to Arbitrage' (Shleifer và Vishny, 1997) là cầu nối quan trọng giữa lý thuyết thị trường hiệu quả và thực tế quan sát được của market anomalies: ngay cả khi một nhà đầu tư nhận diện đúng một tài sản bị định giá sai, việc khai thác nó đòi hỏi vốn, chấp nhận rủi ro ngắn hạn (giá có thể lệch xa hơn trước khi đúng), và đối mặt với áp lực từ nhà đầu tư/người cho vay nếu vị thế tạm thời lỗ - những rào cản này giải thích tại sao thị trường không thể tự động và ngay lập tức loại bỏ mọi bất thường định giá."
      }
    ,
    {
      "question": "Vì sao các nhà đầu tư chuyên nghiệp không xóa sạch một bất thường thị trường ngay khi nó được công bố?",
      "options": [
        "Vì giới hạn của kinh doanh chênh lệch giá: vốn có thể cạn trước khi giá về đúng",
        "Vì quy định cấm quỹ đầu tư giao dịch dựa trên các nghiên cứu học thuật đã công bố",
        "Vì bất thường chỉ xuất hiện ở những thị trường mà nhà đầu tư tổ chức không tham gia",
        "Vì các quỹ lớn không đủ nguồn lực phân tích để nhận ra các bất thường này"
      ],
      "correct": 0,
      "explanation": "Chênh lệch giá không phải cỗ máy in tiền không rủi ro: định giá sai có thể sai thêm nữa, khách hàng rút vốn đúng lúc tệ nhất, và chi phí vay chứng khoán để bán khống rất đắt. Keynes tóm gọn: thị trường có thể phi lý lâu hơn bạn có thể trụ được."
    },
    {
      "question": "Hiệu ứng tháng Giêng đã yếu đi đáng kể sau khi được công bố rộng rãi. Điều đó minh họa cho hiện tượng gì?",
      "options": [
        "Bất thường bị bào mòn dần bởi chính dòng tiền giao dịch theo nó sau khi công bố",
        "Các bất thường thị trường chỉ là ảo giác thống kê và chưa từng tồn tại",
        "Cơ quan quản lý đã ban hành quy định cấm giao dịch theo mùa vụ trong tháng đầu năm",
        "Nhà đầu tư cá nhân đã ngừng bán cắt lỗ vào cuối năm để tối ưu thuế"
      ],
      "correct": 0,
      "explanation": "Khi đủ nhiều người mua sớm hơn để đón đầu, chính hành vi đó kéo mức lợi nhuận vượt trội về không. Đây là lập luận mạnh nhất bênh vực thị trường hiệu quả: bất thường có thật, nhưng công bố nó thường là bước đầu tiên giết chết nó."
    }
    ]
  }),
  "behavioral-portfolio-management-checklist": patch({
    "quiz": [
      {
        "question": "'Investment Journal' (nhật ký đầu tư) có hệ thống - ghi lại lý do mua/bán MỖI vị thế TRƯỚC khi thực hiện giao dịch - giúp Portfolio Manager chống lại thiên kiến nào một cách hiệu quả nhất?",
        "options": [
          "Chống hindsight bias: tin rằng mình đã biết trước kết quả",
          "Chống loss aversion: sợ mất tiền hơn là thích kiếm tiền",
          "Chống herding: làm theo đám đông thay vì tự phân tích",
          "Chống anchoring: neo vào mức giá tham chiếu ban đầu"
        ],
        "correct": 0,
        "explanation": "Hindsight bias ('Tôi đã biết trước mà!') là một trong những thiên kiến nguy hiểm nhất đối với việc HỌC HỎI từ kinh nghiệm đầu tư: nếu không có ghi chép khách quan tại thời điểm quyết định, não bộ có xu hướng 'viết lại lịch sử' để phù hợp với kết quả đã biết, khiến PM không thể đánh giá chính xác liệu QUY TRÌNH ra quyết định ban đầu có thực sự tốt hay chỉ đơn giản là may mắn/xui rủi - đầu tư journal tạo ra 'time-stamped record' chống lại sự bóp méo trí nhớ này."
      },
      {
        "question": "Vì sao nhiều quỹ đầu tư chuyên nghiệp thiết lập 'Devil's Advocate' chính thức (một người có trách nhiệm chủ động phản biện mọi đề xuất đầu tư lớn) thay vì chỉ dựa vào việc mọi thành viên team tự nhiên sẽ đưa ra ý kiến phản biện khi cần?",
        "options": [
          "Vì trong nhóm, người ta ngần ngại phản biện công khai",
          "Vì cần một người chịu trách nhiệm nếu quyết định sai",
          "Vì cần thêm một góc nhìn từ bên ngoài ngành đầu tư",
          "Vì quy định quản trị rủi ro yêu cầu có vai trò này"
        ],
        "correct": 0,
        "explanation": "Vai trò Devil's Advocate chính thức giải quyết một vấn đề tâm lý xã hội thực sự trong môi trường nhóm: 'groupthink' (Irving Janis, 1972) mô tả xu hướng các nhóm gắn kết chặt chẽ có xu hướng tránh xung đột và tìm kiếm sự đồng thuận, đôi khi phải trả giá bằng việc đánh giá thực tế kém đi. Bằng cách CHÍNH THỨC HÓA vai trò phản biện (thay vì để nó tự phát), tổ chức loại bỏ được rào cản xã hội khiến các cá nhân ngần ngại lên tiếng phản đối ý tưởng phổ biến."
      },
      {
        "question": "'Systematic Rules' (quy tắc hệ thống, như rebalancing tự động theo lịch cố định, hoặc stop-loss tự động) trong quản lý danh mục có ưu điểm gì so với việc để Portfolio Manager quyết định thủ công từng trường hợp dựa trên đánh giá tình huống?",
        "options": [
          "Vì được đặt ra trước, khi tư duy còn khách quan",
          "Vì chúng loại bỏ hoàn toàn rủi ro thua lỗ của danh mục",
          "Vì chúng luôn cho kết quả tốt hơn quyết định thủ công",
          "Vì máy tính thực thi nhanh hơn con người rất nhiều"
        ],
        "correct": 0,
        "explanation": "Đây là sự đánh đổi cốt lõi (trade-off) trong thiết kế quy trình đầu tư chuyên nghiệp: quy tắc hệ thống (systematic rules) hy sinh một phần linh hoạt tình huống để đổi lấy tính KHÁCH QUAN VÀ NHẤT QUÁN - đặc biệt có giá trị trong các thời điểm thị trường biến động mạnh, khi thiên kiến hành vi (đặc biệt loss aversion và herding) hoạt động mạnh nhất và dễ dẫn đến quyết định sai lầm nhất. Nhiều quỹ thành công kết hợp cả hai: quy tắc hệ thống cho phần lớn quyết định, kèm cơ chế 'override' có kiểm soát cho các tình huống đặc biệt cần phán đoán của con người."
      }
    ,
    {
      "question": "Phân tích tiền nghiệm (pre-mortem) khác gì so với việc hỏi 'rủi ro của khoản đầu tư này là gì'?",
      "options": [
        "Nó giả định thất bại đã xảy ra rồi và yêu cầu giải thích nguyên nhân",
        "Nó yêu cầu định lượng xác suất của từng rủi ro bằng mô hình thống kê",
        "Nó chuyển việc đánh giá rủi ro sang một bộ phận độc lập bên ngoài đội đầu tư",
        "Nó chỉ được thực hiện sau khi khoản đầu tư đã cho kết quả thua lỗ thực tế"
      ],
      "correct": 0,
      "explanation": "Đổi câu hỏi từ 'điều gì có thể sai' sang 'nó đã sai rồi, vì sao' mở khóa được những lo ngại mà người ta ngại nói ra khi cả nhóm đang hào hứng. Nghiên cứu của Klein cho thấy cách đặt câu hỏi này làm số nguyên nhân được nêu ra tăng lên rõ rệt."
    },
    {
      "question": "Vì sao chỉ định một người phản biện chính thức hiệu quả hơn là kêu gọi cả nhóm 'cứ thoải mái phản biện'?",
      "options": [
        "Vì phản biện trở thành vai trò được giao, không còn là hành động chống lại nhóm",
        "Vì người phản biện chính thức luôn có nhiều kinh nghiệm đầu tư hơn phần còn lại",
        "Vì quy định quản trị rủi ro yêu cầu mọi đề xuất đầu tư phải có một phiếu chống",
        "Vì chỉ cần một người phản đối là đề xuất đầu tư sẽ tự động bị loại khỏi danh mục"
      ],
      "correct": 0,
      "explanation": "Chi phí xã hội của việc phản đối trong một nhóm đang đồng thuận là rất cao, nên lời mời chung chung hiếm khi có ai nhận. Giao nó thành vai trò gỡ bỏ chi phí đó: người phản biện không tỏ ra tiêu cực, họ chỉ đang làm đúng phần việc được phân công."
    }
    ]
  }),
  "nudge-theory-thiet-ke-san-pham-tai-chinh": patch({
    "quiz": [
      {
        "question": "'Libertarian Paternalism' - triết lý nền tảng của Nudge Theory - cố gắng cân bằng giữa hai giá trị nào tưởng chừng đối lập nhau?",
        "options": [
          "Giữ tự do lựa chọn nhưng thiết kế mặc định theo hướng tốt",
          "Chính phủ quy định sẵn sản phẩm tài chính được phép bán",
          "Bắt buộc mọi người phải chọn phương án tốt nhất cho họ",
          "Để mọi người tự quyết mà không đưa ra gợi ý nào cả"
        ],
        "correct": 0,
        "explanation": "Libertarian Paternalism là triết lý cố tình mang tính nghịch lý: nó thừa nhận rằng THIẾT KẾ nào cũng có ảnh hưởng đến hành vi (không có lựa chọn 'trung lập'), nên thay vì giả vờ trung lập, nhà thiết kế nên chủ động chọn thiết kế có lợi cho đa số người dùng (dựa trên nghiên cứu hành vi) - trong khi vẫn bảo toàn hoàn toàn quyền tự do lựa chọn khác (opt-out) cho những ai có sở thích/hoàn cảnh khác biệt. Đây là điểm khác biệt quan trọng so với paternalism truyền thống (ép buộc, không cho lựa chọn khác)."
      },
      {
        "question": "Robo-advisor (nền tảng tư vấn đầu tư tự động) thường sử dụng các nguyên lý behavioral finance nào trong thiết kế sản phẩm để giúp nhà đầu tư tránh các sai lầm hành vi phổ biến?",
        "options": [
          "Tự động tái cân bằng theo lịch, loại bỏ chọn thời điểm",
          "Hiển thị lợi nhuận theo thời gian thực để tạo thêm động lực",
          "Đưa cảnh báo mỗi khi danh mục giảm quá 5% trong ngày",
          "Cho phép rút vốn bất cứ lúc nào không mất phí phạt"
        ],
        "correct": 0,
        "explanation": "Robo-advisor hiện đại là ví dụ ứng dụng thực tế phong phú của Choice Architecture trong fintech: từ việc tự động hóa tái cân bằng (loại bỏ yếu tố cảm xúc trong thời điểm biến động), đến cách trình bày biểu đồ hiệu suất (thường mặc định khung thời gian dài để giảm cảm giác lo lắng từ biến động ngắn hạn), đến các cơ chế 'cooling-off' trước khi cho phép rút tiền/thay đổi lớn - mỗi thiết kế đều dựa trên hiểu biết cụ thể về thiên kiến hành vi phổ biến của nhà đầu tư cá nhân."
      },
      {
        "question": "Ranh giới đạo đức nào phân biệt việc sử dụng Choice Architecture 'có trách nhiệm' (giúp khách hàng) với việc lạm dụng nó thành 'dark pattern' (thao túng vì lợi ích của tổ chức, gây hại cho khách hàng)?",
        "options": [
          "Thiết kế phục vụ lợi ích khách hay lợi ích công ty",
          "Có công bố rõ ràng thuật toán cho khách hàng biết không",
          "Có thu phí cho dịch vụ tư vấn tự động này hay không",
          "Có được cơ quan quản lý phê duyệt trước hay không"
        ],
        "correct": 0,
        "explanation": "Đây là câu hỏi đạo đức nghề nghiệp quan trọng nhất khi ứng dụng behavioral finance vào thiết kế sản phẩm: 'dark patterns' (thiết kế lừa dối/thao túng) khai thác CÙNG những nguyên lý tâm lý học như nudge có trách nhiệm, nhưng với mục đích ngược lại - ví dụ, làm phức tạp hóa quy trình hủy dịch vụ (trong khi đăng ký rất dễ dàng), hay dùng thiết kế tạo áp lực FOMO giả để thúc ép mua sản phẩm không phù hợp. Ranh giới cốt lõi là liệu thiết kế có thực sự vì lợi ích dài hạn của khách hàng, với sự minh bạch và tự do lựa chọn thực sự, hay chỉ đơn thuần khai thác điểm yếu tâm lý vì lợi nhuận ngắn hạn của tổ chức."
      }
    ,
    {
      "question": "Ranh giới giữa cú hích có trách nhiệm và mẫu thiết kế thao túng nằm ở đâu?",
      "options": [
        "Ở chỗ lựa chọn mặc định có phục vụ lợi ích người dùng và có dễ từ chối không",
        "Ở chỗ thiết kế đó có làm tăng tỷ lệ chuyển đổi của sản phẩm hay không",
        "Ở chỗ người dùng có được thông báo trước rằng giao diện đã được tối ưu hay không",
        "Ở chỗ doanh nghiệp có thu phí cho tính năng được thiết kế theo cách đó hay không"
      ],
      "correct": 0,
      "explanation": "Hai câu hỏi kiểm tra: mặc định đứng về phía ai, và rút lui có dễ như tham gia không. Tự động đăng ký tiết kiệm mà hủy bằng một cú nhấp là cú hích; tự động gia hạn mà muốn hủy phải gọi tổng đài trong giờ hành chính là thao túng."
    },
    {
      "question": "Chủ nghĩa gia trưởng tự do cố gắng dung hòa hai giá trị nào?",
      "options": [
        "Giữ nguyên quyền tự do lựa chọn nhưng vẫn dẫn hướng tới quyết định tốt hơn",
        "Tối đa hóa lợi nhuận doanh nghiệp đồng thời giảm chi phí tuân thủ quy định",
        "Bảo vệ người tiêu dùng bằng cách loại bỏ các lựa chọn được cho là có hại",
        "Cung cấp đầy đủ thông tin và để người dùng tự chịu trách nhiệm hoàn toàn"
      ],
      "correct": 0,
      "explanation": "Gia trưởng ở chỗ thiết kế thừa nhận có lựa chọn tốt hơn cho phần lớn người; tự do ở chỗ không lựa chọn nào bị cấm hay bị làm cho tốn kém. Phản biện chính đáng nhất với nó là câu hỏi: ai quyết định đâu là 'tốt hơn', và dựa trên cơ sở nào."
    }
    ]
  }),
  "embedded-finance-banking-as-a-service": patch({
    "quiz": [
      {
        "question": "Trong mô hình BaaS (Banking-as-a-Service), ai chịu trách nhiệm pháp lý CHÍNH về việc tuân thủ quy định ngân hàng (như KYC, chống rửa tiền, dự trữ vốn), công ty FinTech hay ngân hàng đối tác cấp phép?",
        "options": [
          "Ngân hàng đối tác có giấy phép chịu trách nhiệm chính",
          "Công ty FinTech vận hành ứng dụng chịu trách nhiệm chính",
          "Cơ quan quản lý chịu trách nhiệm giám sát toàn bộ luồng",
          "Hai bên chia đôi trách nhiệm theo tỷ lệ doanh thu chia"
        ],
        "correct": 0,
        "explanation": "Đây là cấu trúc cốt lõi của BaaS: ngân hàng đối tác - dù 'ẩn mình' phía sau giao diện FinTech - vẫn là thực thể chịu trách nhiệm pháp lý chính trước cơ quan quản lý về các nghĩa vụ ngân hàng cốt lõi (KYC/AML, tỷ lệ an toàn vốn, bảo vệ tiền gửi khách hàng). Đây là lý do các ngân hàng BaaS phải thực hiện due diligence rất kỹ lưỡng với đối tác FinTech trước khi hợp tác, vì rủi ro tuân thủ của đối tác có thể ảnh hưởng trực tiếp đến giấy phép của chính ngân hàng."
      },
      {
        "question": "'Unit Economics' của một sản phẩm BNPL (Mua trước Trả sau) cần phân tích những yếu tố nào để đánh giá tính bền vững của mô hình kinh doanh?",
        "options": [
          "Doanh thu mỗi giao dịch, chi phí vốn, tỷ lệ nợ xấu",
          "Tổng giá trị hàng hóa giao dịch qua nền tảng mỗi quý",
          "Thị phần so với các đối thủ cùng mô hình trong nước",
          "Số lượng người dùng đăng ký mới trong từng tháng"
        ],
        "correct": 0,
        "explanation": "Đây là bài học quan trọng đã được chứng minh qua nhiều thất bại thực tế trong ngành BNPL toàn cầu: tăng trưởng GMV (tổng giá trị giao dịch) ấn tượng có thể che giấu unit economics yếu kém - nếu tỷ lệ nợ xấu tăng nhanh hơn biên lợi nhuận từ phí, mô hình kinh doanh về cơ bản đang 'mua tăng trưởng bằng cách chấp nhận lỗ trên mỗi giao dịch', không bền vững về dài hạn dù số liệu tăng trưởng bề mặt trông ấn tượng."
      },
      {
        "question": "Tại sao nhiều ngân hàng truyền thống lớn chọn hợp tác với FinTech qua mô hình BaaS thay vì coi họ hoàn toàn là đối thủ cạnh tranh cần loại bỏ?",
        "options": [
          "Tận dụng giấy phép sẵn có để tiếp cận khách hàng mới",
          "Chuyển toàn bộ rủi ro tín dụng sang cho đối tác FinTech",
          "Giảm chi phí tuân thủ quy định xuống mức thấp nhất",
          "Tránh phải đầu tư vào hệ thống công nghệ lõi mới"
        ],
        "correct": 0,
        "explanation": "Mô hình BaaS tạo ra tình huống win-win chiến lược: ngân hàng đối tác kiếm doanh thu từ phí hạ tầng (infrastructure fees) mà không phải gánh chi phí marketing/thu hút khách hàng tốn kém, trong khi tiếp cận được phân khúc khách hàng mới thông qua trải nghiệm sản phẩm hấp dẫn của FinTech - đây là lý do nhiều ngân hàng lớn trên thế giới đã xây dựng bộ phận BaaS chuyên biệt, coi đây là dòng doanh thu chiến lược mới thay vì chỉ phòng thủ trước cạnh tranh FinTech."
      },
      {
        "question": "Trong mô hình BaaS, ai chịu trách nhiệm pháp lý chính về tuân thủ?",
        "options": [
          "Ngân hàng đối tác, vì giấy phép đứng tên họ",
          "FinTech, vì họ sở hữu trải nghiệm khách hàng",
          "Chia đôi theo tỷ lệ doanh thu giữa hai bên",
          "Người dùng cuối, vì họ ký điều khoản sử dụng"
        ],
        "correct": 0,
        "explanation": "FinTech nắm giao diện và thương hiệu, nhưng giấy phép ngân hàng - cùng toàn bộ nghĩa vụ AML, KYC và bảo vệ tiền gửi đi kèm - vẫn thuộc về ngân hàng đối tác. Đây là lý do ngân hàng phải giám sát chặt đối tác FinTech: rủi ro tuân thủ không thuê ngoài được."
      },
      {
        "question": "Unit economics của một sản phẩm BNPL cần tính tới những yếu tố nào?",
        "options": [
          "Phí thu từ người bán, tỷ lệ nợ xấu và chi phí vốn",
          "Chỉ cần số lượng đơn hàng và giá trị mỗi đơn",
          "Số người tải ứng dụng và thời gian dùng trung bình",
          "Thị phần so với các đối thủ BNPL cùng phân khúc"
        ],
        "correct": 0,
        "explanation": "BNPL không thu lãi từ người mua nên toàn bộ doanh thu đến từ chiết khấu người bán trả, trong khi chi phí gồm vốn ứng trước và phần khách không trả được. Mô hình chỉ có lãi khi phí đó lớn hơn tổng hai khoản kia - tăng trưởng đơn hàng tự nó không nói gì."
      }
    ]
  }),
  "khung-coso-va-danh-gia-rui-ro-gian-lan": patch({
    "quiz": [
      {
        "question": "'Fraud Triangle' (Tam giác Gian lận) - mô hình kinh điển trong đánh giá rủi ro gian lận - gồm 3 yếu tố nào cần đồng thời hiện diện để gian lận có khả năng xảy ra?",
        "options": [
          "Áp lực, cơ hội, và khả năng tự biện minh cho hành vi",
          "Áp lực, cơ hội, và mức độ nghiêm trọng của thiệt hại gây ra",
          "Kiểm soát yếu, giám sát kém, và chế tài chưa đủ mạnh",
          "Động cơ, phương tiện, và thời điểm thực hiện hành vi"
        ],
        "correct": 0,
        "explanation": "Fraud Triangle (Donald Cressey) là mô hình nền tảng trong đánh giá rủi ro gian lận: cả 3 yếu tố thường cần hiện diện đồng thời - một nhân viên trung thực có thể có áp lực tài chính nhưng không có cơ hội (kiểm soát chặt); người có cơ hội nhưng không có áp lực/biện minh cũng ít khả năng hành động. Kiểm toán viên nội bộ tập trung chủ yếu vào việc GIẢM YẾU TỐ CƠ HỘI (qua kiểm soát nội bộ mạnh) vì đây là yếu tố tổ chức có thể kiểm soát trực tiếp nhất, so với áp lực cá nhân và biện minh tâm lý khó can thiệp hơn."
      },
      {
        "question": "'Segregation of Duties' (Phân tách nhiệm vụ) - một trong những hoạt động kiểm soát cơ bản nhất - hoạt động dựa trên nguyên lý gì để giảm thiểu rủi ro gian lận?",
        "options": [
          "Không ai kiểm soát trọn vẹn một giao dịch từ đầu đến cuối",
          "Mỗi nhân viên chỉ được làm đúng một loại nghiệp vụ duy nhất",
          "Nhân viên phải luân chuyển vị trí sau mỗi hai năm làm việc",
          "Các bộ phận phải báo cáo lên hai cấp quản lý khác nhau"
        ],
        "correct": 0,
        "explanation": "Segregation of Duties là một trong những kiểm soát phòng ngừa (preventive control) mạnh nhất chống lại cả gian lận lẫn sai sót không cố ý: bằng cách tách các chức năng xung khắc (ủy quyền, thực hiện, ghi chép, đối chiếu) cho các cá nhân khác nhau, tổ chức nâng rào cản cho hành vi gian lận từ 'một người có thể tự ý thực hiện' lên 'cần nhiều người cùng câu kết' - một ngưỡng khó vượt qua hơn đáng kể trong hầu hết các trường hợp thực tế."
      },
      {
        "question": "Khi kiểm toán viên nội bộ phát hiện một 'material weakness' (điểm yếu trọng yếu) trong kiểm soát nội bộ nhưng ban lãnh đạo cho rằng chi phí khắc phục quá cao so với rủi ro thực tế, cách tiếp cận chuyên nghiệp phù hợp nhất của kiểm toán viên là gì?",
        "options": [
          "Trình bày phân tích chi phí - lợi ích của rủi ro đó",
          "Dừng toàn bộ quy trình có liên quan cho đến khi khắc phục",
          "Báo cáo thẳng lên cơ quan quản lý nhà nước ngay lập tức",
          "Ghi nhận vào hồ sơ và chờ kỳ kiểm toán tiếp theo xử lý"
        ],
        "correct": 0,
        "explanation": "Đây là tình huống thực tế phổ biến trong nghề kiểm toán nội bộ, đòi hỏi cân bằng giữa tính độc lập nghề nghiệp và thực tế quản trị doanh nghiệp: vai trò của kiểm toán nội bộ không phải là 'ra quyết định thay' ban lãnh đạo, mà là đảm bảo RỦI RO ĐƯỢC HIỂU RÕ VÀ QUYẾT ĐỊNH ĐƯỢC GHI NHẬN MINH BẠCH - với các rủi ro thực sự trọng yếu, chuẩn nghề nghiệp (như IIA Standards) thường yêu cầu báo cáo lên cấp cao hơn (Audit Committee) nếu ban điều hành không xử lý thỏa đáng, đảm bảo trách nhiệm giải trình cuối cùng."
      },
      {
        "question": "Scenario: Một nhân viên kế toán vừa lập phiếu chi, vừa ký duyệt, vừa đối chiếu sao kê ngân hàng. Nguyên tắc kiểm soát nào đang bị vi phạm?",
        "options": [
          "Segregation of Duties, một người nắm cả chu trình",
          "Control Environment, do lãnh đạo thiếu gương mẫu",
          "Risk Assessment, do chưa nhận diện rủi ro gian lận",
          "Monitoring, do thiếu kiểm toán nội bộ định kỳ"
        ],
        "correct": 0,
        "explanation": "Ba khâu tạo lập, phê duyệt và đối chiếu phải nằm ở ba người khác nhau, vì gộp lại thì một người có thể vừa tạo giao dịch giả vừa che dấu vết. Phân tách nhiệm vụ nâng rào cản từ một người quyết định lên thành phải có thông đồng."
      },
      {
        "question": "Kiểm soát nội bộ tác động chủ yếu vào cạnh nào của Fraud Triangle?",
        "options": [
          "Cơ hội, cạnh duy nhất tổ chức kiểm soát được",
          "Áp lực, bằng cách tăng lương và phúc lợi",
          "Biện minh, bằng cách đào tạo về đạo đức nghề",
          "Cả ba cạnh cùng lúc và với mức độ như nhau"
        ],
        "correct": 0,
        "explanation": "Áp lực tài chính của một nhân viên đến từ đời sống riêng, còn biện minh nằm trong đầu họ - tổ chức chỉ chạm được rất hạn chế. Cơ hội thì ngược lại: nó do chính thiết kế quy trình tạo ra, nên đó là chỗ kiểm soát nội bộ đặt toàn bộ trọng lượng."
      }
    ]
  }),
  "needs-analysis-tu-van-bao-hiem": patch({
    "quiz": [
      {
        "question": "'Capital Needs Analysis' (Phân tích Nhu cầu Vốn) khác với Human Life Value như thế nào về cách tiếp cận tính toán số tiền bảo hiểm cần thiết?",
        "options": [
          "Capital needs xuất phát từ nhu cầu chi tiêu cụ thể của gia đình",
          "Capital needs xuất phát từ tổng thu nhập còn lại của đời người",
          "Capital needs tính theo tỷ lệ phần trăm cố định trên thu nhập",
          "Capital needs chỉ áp dụng cho khách hàng doanh nghiệp lớn"
        ],
        "correct": 0,
        "explanation": "Đây là hai triết lý tiếp cận bổ sung cho nhau: HLV trả lời câu hỏi 'người này tạo ra bao nhiêu giá trị kinh tế', trong khi Capital Needs Analysis trả lời câu hỏi cụ thể hơn 'gia đình này THỰC SỰ CẦN bao nhiêu tiền để duy trì cuộc sống và đạt các mục tiêu tài chính nếu mất đi trụ cột này' - phương pháp thứ hai thường được ưa chuộng trong thực hành tư vấn hiện đại vì nó gắn trực tiếp với hoàn cảnh và mục tiêu cụ thể của từng gia đình, thay vì chỉ là một công thức tính thu nhập trừu tượng."
      },
      {
        "question": "Tại sao 'Needs Analysis' toàn diện (không chỉ tính con số bảo hiểm) lại quan trọng hơn nhiều so với việc chỉ đơn giản bán một sản phẩm bảo hiểm có sẵn với số tiền bảo hiểm 'tiêu chuẩn' theo độ tuổi/thu nhập?",
        "options": [
          "Vì mỗi gia đình có hoàn cảnh và nhu cầu khác hẳn nhau",
          "Vì công ty bảo hiểm yêu cầu trước khi phát hành hợp đồng",
          "Vì quy định bắt buộc tư vấn viên phải lập hồ sơ đầy đủ",
          "Vì cần thu thập đủ dữ liệu để tính hoa hồng chính xác"
        ],
        "correct": 0,
        "explanation": "Đây là nguyên lý cốt lõi của tư vấn bảo hiểm có trách nhiệm: 'one-size-fits-all' không phù hợp với bản chất của bảo hiểm nhân thọ, vì mục đích của nó là bảo vệ tài chính cho những người phụ thuộc cụ thể với nhu cầu cụ thể - Needs Analysis toàn diện (xem xét cả thu nhập, nợ, tài sản, mục tiêu giáo dục, và các nguồn bảo vệ đã có) đảm bảo khách hàng không bị bảo hiểm thiếu (dẫn đến rủi ro tài chính nghiêm trọng cho gia đình) hoặc bảo hiểm thừa (lãng phí phí bảo hiểm có thể dùng cho mục tiêu tài chính khác)."
      },
      {
        "question": "Khi thực hiện Needs Analysis, tại sao cần trừ đi 'tài sản/bảo hiểm hiện có' của khách hàng trước khi đưa ra khuyến nghị số tiền bảo hiểm bổ sung cần mua?",
        "options": [
          "Vì mục tiêu là lấp khoảng trống, không phải bán thêm",
          "Vì tài sản hiện có sẽ được tính vào phí bảo hiểm phải trả",
          "Vì công ty bảo hiểm không nhận khách đã có hợp đồng khác",
          "Vì luật giới hạn tổng mức bảo hiểm một người được mua"
        ],
        "correct": 0,
        "explanation": "Đây là bước quan trọng thường bị bỏ qua bởi tư vấn viên thiếu kinh nghiệm (đôi khi vì áp lực doanh số muốn bán số tiền bảo hiểm lớn hơn): Needs Analysis đúng chuẩn phải tính GAP ANALYSIS - Nhu cầu tài chính tổng thể trừ đi Nguồn lực hiện có (bảo hiểm công ty đã cấp, tiết kiệm, tài sản có thể thanh lý nhanh) = Số tiền bảo hiểm bổ sung thực sự cần thiết. Bỏ qua bước này dẫn đến khuyến nghị thừa, không phục vụ lợi ích tối ưu của khách hàng."
      },
      {
        "question": "Capital Needs Analysis khác Human Life Value ở điểm nào?",
        "options": [
          "Đi từ nhu cầu cụ thể của gia đình, không từ thu nhập",
          "Chiết khấu thu nhập tương lai về giá trị hiện tại",
          "Chỉ áp dụng cho khách hàng có thu nhập rất cao",
          "Không cần trừ đi tài sản và bảo hiểm đang có"
        ],
        "correct": 0,
        "explanation": "Human Life Value định giá con người như một tài sản tạo dòng tiền, nên cho ra con số lớn và khá trừu tượng. Capital Needs đi từ đầu kia: gia đình cần bao nhiêu để trả hết nợ, nuôi con học xong và sống tiếp - dễ giải thích và thường sát thực tế hơn."
      },
      {
        "question": "Vì sao Needs Analysis phải trừ đi tài sản và bảo hiểm đang có của khách?",
        "options": [
          "Để tránh mua thừa phần đã được bảo vệ",
          "Để hạ phí xuống dưới mức quy định tối thiểu",
          "Vì cơ quan quản lý cấm bảo hiểm chồng lấn",
          "Vì tài sản hiện có sẽ mất giá trị khi cần dùng"
        ],
        "correct": 0,
        "explanation": "Số tiền bảo hiểm cần mua là phần thiếu hụt, không phải tổng nhu cầu. Bỏ qua bước trừ này sẽ ra một con số lớn hơn thực tế - tiện cho người bán, nhưng khách trả phí cho phần họ đã có và ngân sách bảo vệ bị lãng phí."
      }
    ]
  }),
  "mo-hinh-cham-diem-tin-dung-credit-scoring": patch({
    "quiz": [
      {
        "question": "'Probability of Default' (PD - Xác suất vỡ nợ) khác với 'Loss Given Default' (LGD - Tổn thất khi vỡ nợ) như thế nào, và tại sao cả hai đều cần thiết để đánh giá đầy đủ rủi ro tín dụng?",
        "options": [
          "PD là xác suất vỡ nợ; LGD là tổn thất khi đã vỡ nợ",
          "PD tính cho cá nhân; LGD tính cho khách hàng doanh nghiệp",
          "PD do ngân hàng tự tính; LGD do cơ quan quản lý quy định",
          "PD là tổn thất kỳ vọng; LGD là xác suất khách trả chậm"
        ],
        "correct": 0,
        "explanation": "Đây là công thức nền tảng của quản trị rủi ro tín dụng hiện đại (theo khung Basel): Expected Loss = PD × LGD × EAD (Exposure at Default). Một khoản vay tín chấp (không tài sản đảm bảo) có thể có PD tương đương một khoản vay thế chấp, nhưng LGD của khoản vay tín chấp thường cao hơn nhiều (gần như mất trắng nếu vỡ nợ) so với vay thế chấp (có thể thu hồi phần lớn qua thanh lý tài sản) - đây là lý do lãi suất vay tín chấp luôn cao hơn đáng kể so với vay thế chấp cùng mức PD."
      },
      {
        "question": "'Reject Inference' (Suy luận về hồ sơ bị từ chối) là thách thức kỹ thuật quan trọng nào trong việc xây dựng và cải thiện mô hình chấm điểm tín dụng theo thời gian?",
        "options": [
          "Chỉ có dữ liệu kết quả của những hồ sơ đã được duyệt",
          "Khách bị từ chối thường chuyển sang vay ở ngân hàng khác",
          "Hồ sơ bị từ chối thường thiếu thông tin cần để chấm điểm",
          "Mô hình không được phép dùng dữ liệu hồ sơ bị từ chối"
        ],
        "correct": 0,
        "explanation": "Reject Inference là một trong những thách thức kỹ thuật tinh vi nhất trong xây dựng mô hình credit scoring: vì mô hình chỉ 'học' từ dữ liệu của khách hàng ĐÃ ĐƯỢC DUYỆT VAY, nó có nguy cơ trở nên ngày càng 'bảo thủ' qua mỗi lần huấn luyện lại (chỉ củng cố các tiêu chí đã dùng để duyệt trước đó), có thể bỏ lỡ những khách hàng tốt bị từ chối sai (false rejection) mà không bao giờ có cơ hội chứng minh khả năng trả nợ thực tế của họ - các kỹ thuật thống kê nâng cao được phát triển riêng để cố gắng 'suy luận' hiệu suất tiềm năng của nhóm bị từ chối, dù không bao giờ hoàn toàn chính xác."
      },
      {
        "question": "Tại sao các mô hình credit scoring hiện đại (dùng machine learning) cần đặc biệt cẩn trọng về vấn đề 'algorithmic bias' (thiên kiến thuật toán) khi đưa vào sử dụng thực tế cho quyết định cho vay?",
        "options": [
          "Vì dữ liệu lịch sử có thể mang sẵn thiên kiến xã hội",
          "Vì cần nhiều dữ liệu hơn mức ngân hàng thường thu thập",
          "Vì mô hình học máy chạy chậm hơn mô hình thống kê cũ",
          "Vì luật cấm dùng học máy trong chấm điểm tín dụng"
        ],
        "correct": 0,
        "explanation": "Đây là vấn đề đạo đức và pháp lý ngày càng quan trọng trong ngành tài chính hiện đại: mô hình học máy 'học' từ dữ liệu lịch sử, và nếu dữ liệu đó phản ánh những bất công tồn tại trong quá khứ (dù không cố ý), mô hình có nguy cơ tự động hóa và khuếch đại những bất công đó ở quy mô lớn hơn nhiều so với quyết định thủ công của từng cá nhân - đây là lý do các tổ chức tài chính có trách nhiệm phải thực hiện kiểm tra 'fairness audit' định kỳ cho mô hình chấm điểm tín dụng của họ, không chỉ tối ưu hóa độ chính xác dự đoán đơn thuần."
      },
      {
        "question": "Scenario: Một khoản vay có PD 2%, LGD 40% và EAD 10 tỷ đồng. Expected Loss là bao nhiêu?",
        "options": [
          "80 triệu (= 2% × 40% × 10 tỷ đồng)",
          "200 triệu (= 2% × 10 tỷ, bỏ qua LGD)",
          "4 tỷ (= 40% × 10 tỷ, bỏ qua PD)",
          "42 triệu (= cộng 2% và 40% rồi nhân)"
        ],
        "correct": 0,
        "explanation": "Expected Loss là tích của cả ba: 0,02 × 0,4 × 10 tỷ = 80 triệu. Bỏ LGD ra khỏi phép nhân là giả định vỡ nợ thì mất trắng, trong khi phần lớn khoản vay có tài sản bảo đảm nên chỉ mất một phần."
      },
      {
        "question": "Reject Inference là vấn đề gì trong xây dựng mô hình chấm điểm tín dụng?",
        "options": [
          "Mô hình chỉ học từ những hồ sơ đã được duyệt",
          "Mô hình từ chối quá nhiều hồ sơ vốn dĩ tốt",
          "Mô hình không giải thích được lý do từ chối",
          "Mô hình bị lệch do dữ liệu nhân khẩu học"
        ],
        "correct": 0,
        "explanation": "Chỉ hồ sơ được duyệt mới có kết quả trả nợ để học, nên dữ liệu huấn luyện đã bị lọc sẵn bởi chính chính sách cũ. Mô hình vì thế giỏi xếp hạng trong nhóm từng được chấp nhận, nhưng không biết gì về nhóm bị từ chối - kể cả những người lẽ ra sẽ trả tốt."
      }
    ]
  }),
  "doc-hieu-chi-bao-kinh-te-vi-mo": patch({
    "quiz": [
      {
        "question": "Ngưỡng '50' trong chỉ số PMI có ý nghĩa gì, và tại sao đây là mức tham chiếu quan trọng nhất cần nhớ khi đọc số liệu PMI hàng tháng?",
        "options": [
          "Trên 50 là mở rộng, dưới 50 là thu hẹp so với tháng trước",
          "Trên 50 nghĩa là hơn một nửa số doanh nghiệp có lãi trong kỳ",
          "Trên 50 là lạm phát cao, dưới 50 là giảm phát trong kỳ",
          "Trên 50 là mức trung bình lịch sử của nền kinh tế đó"
        ],
        "correct": 0,
        "explanation": "PMI là chỉ số 'diffusion index' (chỉ số khuếch tán) được tính từ tỷ lệ người trả lời khảo sát báo cáo 'cải thiện', 'không đổi', hay 'xấu đi' so với tháng trước - do đó bản chất của nó là đo TỐC ĐỘ THAY ĐỔI, không phải mức độ tuyệt đối. PMI = 52 nghĩa là hoạt động đang mở rộng (dù chậm), PMI = 65 nghĩa là mở rộng rất nhanh, còn PMI = 48 nghĩa là đang thu hẹp - nhà phân tích vĩ mô luôn theo dõi cả VỊ TRÍ so với ngưỡng 50 lẫn XU HƯỚNG thay đổi qua các tháng liên tiếp."
      },
      {
        "question": "'Core CPI' (CPI lõi - loại trừ giá thực phẩm và năng lượng) khác với 'Headline CPI' (CPI tổng thể) như thế nào, và tại sao các ngân hàng trung ương thường chú trọng Core CPI hơn khi ra quyết định chính sách tiền tệ?",
        "options": [
          "Core loại trừ giá thực phẩm và năng lượng khỏi rổ tính",
          "Core do ngân hàng trung ương tính, headline do thống kê",
          "Core tính theo năm, headline tính theo từng tháng một",
          "Core chỉ tính hàng hóa, headline tính cả dịch vụ"
        ],
        "correct": 0,
        "explanation": "Đây là phân biệt quan trọng trong phân tích lạm phát: giá thực phẩm và năng lượng có độ biến động (volatility) rất cao do các cú sốc cung tạm thời (thời tiết, xung đột địa chính trị, gián đoạn chuỗi cung ứng) không phản ánh áp lực lạm phát cơ bản trong nền kinh tế - nếu ngân hàng trung ương phản ứng chính sách (như tăng lãi suất) mỗi khi giá xăng dầu biến động tạm thời, chính sách tiền tệ sẽ trở nên bất ổn và kém hiệu quả. Core CPI cung cấp tín hiệu 'sạch' hơn về xu hướng lạm phát nền tảng, dù Headline CPI vẫn quan trọng vì phản ánh chi phí sinh hoạt thực tế mà người dân trải qua."
      },
      {
        "question": "'Nowcasting' trong kinh tế học vĩ mô khác với 'Forecasting' (dự báo) truyền thống như thế nào về mục tiêu và phương pháp?",
        "options": [
          "Ước tính giá trị hiện tại của chỉ số bị công bố trễ",
          "Cập nhật lại số liệu quá khứ khi có dữ liệu chính xác hơn",
          "Dự báo giá trị chỉ số cho quý tiếp theo trong tương lai",
          "Tính chỉ số theo thời gian thực bằng dữ liệu giao dịch"
        ],
        "correct": 0,
        "explanation": "Đây là phân biệt quan trọng về MỤC TIÊU THỜI GIAN: Nowcasting trả lời câu hỏi 'điều gì đang thực sự xảy ra NGAY BÂY GIỜ' (dù dữ liệu chính thức chưa công bố) bằng cách tổng hợp các chỉ báo tần suất cao sẵn có, trong khi Forecasting trả lời câu hỏi 'điều gì sẽ xảy ra trong TƯƠNG LAI' dựa trên mô hình và giả định. Cả hai đều là công cụ quan trọng của nhà nghiên cứu vĩ mô, nhưng phục vụ mục đích khác nhau: Nowcasting giúp phản ứng nhanh với tình hình hiện tại, Forecasting giúp lập kế hoạch dài hạn."
      },
      {
        "question": "Scenario: PMI sản xuất vừa công bố ở mức 47 điểm. Con số đó nói lên điều gì?",
        "options": [
          "Hoạt động sản xuất đang thu hẹp so với tháng trước",
          "Sản xuất đang mở rộng nhưng chậm hơn kỳ vọng",
          "Lạm phát ở mức 47% tính theo năm hiện hành",
          "GDP quý tới chắc chắn giảm 3% so với ngưỡng 50 điểm"
        ],
        "correct": 0,
        "explanation": "PMI là chỉ số khuếch tán: trên 50 là mở rộng, dưới 50 là thu hẹp, còn khoảng cách tới 50 cho biết mức độ lan rộng chứ không phải tốc độ. 47 nghĩa là nhiều doanh nghiệp báo cáo xấu đi hơn là tốt lên, không nghĩa là sản lượng giảm 3%."
      },
      {
        "question": "Vì sao ngân hàng trung ương theo dõi Core CPI thay vì chỉ nhìn Headline CPI?",
        "options": [
          "Vì giá thực phẩm và năng lượng biến động tạm thời",
          "Vì Core CPI luôn cao hơn nên an toàn khi điều hành",
          "Vì Headline CPI chỉ được công bố mỗi quý một lần",
          "Vì Core CPI phản ánh đúng chi tiêu của hộ gia đình"
        ],
        "correct": 0,
        "explanation": "Một cú sốc giá dầu đẩy Headline CPI lên rồi tự rút xuống, và nâng lãi suất để đuổi theo nó sẽ siết nền kinh tế đúng lúc cú sốc đã qua. Core CPI lọc phần nhiễu đó ra để lộ xu hướng nền - dù chính Headline CPI mới là thứ hộ gia đình thực sự trả."
      }
    ]
  }),
  "earnings-call-va-guidance-quan-ly-ky-vong": patch({
    "quiz": [
      {
        "question": "'Guidance' (dự báo/hướng dẫn) mà công ty đưa ra cho thị trường về kết quả kinh doanh tương lai đóng vai trò gì trong chiến lược quản lý kỳ vọng của IR, và tại sao nhiều công ty có xu hướng đưa ra guidance 'thận trọng' (conservative)?",
        "options": [
          "Thiết lập mốc tham chiếu để thị trường đánh giá kết quả",
          "Là số liệu bắt buộc phải công bố theo quy định về niêm yết",
          "Là cam kết pháp lý công ty buộc phải đạt được đúng mức",
          "Là dự báo do các nhà phân tích bên ngoài tổng hợp lại"
        ],
        "correct": 0,
        "explanation": "Chiến lược 'beat and raise' (vượt kỳ vọng và nâng dự báo) là một kỹ thuật quản lý kỳ vọng phổ biến: bằng cách đưa ra guidance ban đầu hơi thận trọng, công ty tạo dư địa để công bố kết quả thực tế 'vượt kỳ vọng' trong các quý tiếp theo - tạo ra chuỗi phản ứng tích cực liên tục từ thị trường, thay vì rủi ro đưa ra guidance quá lạc quan rồi liên tục phải 'hạ dự báo' (guide down), điều thường bị thị trường phạt nặng nề hơn nhiều so với việc chỉ đơn giản tăng trưởng chậm."
      },
      {
        "question": "'Quiet Period' (giai đoạn im lặng) trước khi công bố báo cáo tài chính là gì, và tại sao đội ngũ IR phải tuân thủ nghiêm ngặt quy định này?",
        "options": [
          "Giai đoạn công ty hạn chế trao đổi với nhà đầu tư",
          "Giai đoạn nội bộ không được mua bán cổ phiếu công ty",
          "Giai đoạn cổ phiếu bị tạm ngừng giao dịch trên sàn",
          "Giai đoạn kiểm toán viên làm việc tại công ty"
        ],
        "correct": 0,
        "explanation": "Quiet Period phản ánh nguyên tắc pháp lý cốt lõi của thị trường vốn: công bằng thông tin (fair disclosure). Quy định như Regulation FD (Fair Disclosure) tại Mỹ yêu cầu thông tin trọng yếu phải được công bố ĐỒNG THỜI cho TẤT CẢ nhà đầu tư, không được tiết lộ chọn lọc cho một số nhà phân tích/nhà đầu tư lớn trước công chúng. Đội ngũ IR đóng vai trò gác cổng quan trọng đảm bảo tuân thủ nguyên tắc này, đặc biệt nhạy cảm trong giai đoạn ngay trước khi công bố kết quả kinh doanh."
      },
      {
        "question": "Khi kết quả kinh doanh thực tế của công ty THẤP HƠN guidance đã công bố trước đó (một tình huống 'miss'), vai trò của IR trong việc soạn thảo thông điệp truyền thông với nhà đầu tư nên tập trung vào điều gì để duy trì niềm tin dài hạn?",
        "options": [
          "Giải thích rõ nguyên nhân là tạm thời hay cấu trúc",
          "Hoãn công bố báo cáo cho tới khi kết quả được cải thiện",
          "Đưa ra guidance mới cao hơn để trấn an nhà đầu tư",
          "Không đề cập tới guidance cũ để tránh gây chú ý"
        ],
        "correct": 0,
        "explanation": "Đây là nguyên tắc quan trọng trong quản trị niềm tin nhà đầu tư dài hạn: thị trường thường 'tha thứ' cho một kết quả kém nếu được giải thích minh bạch, có căn cứ, và đi kèm kế hoạch hành động rõ ràng - nhưng lại phản ứng rất tiêu cực với sự thiếu minh bạch, giải thích mơ hồ, hoặc thay đổi lý do liên tục qua các quý, vì điều này làm xói mòn NIỀM TIN vào khả năng dự báo và quản trị của ban lãnh đạo, một tài sản vô hình cực kỳ quan trọng đối với định giá dài hạn của công ty."
      },
      {
        "question": "Scenario: Công ty báo lợi nhuận tăng 20% so với cùng kỳ nhưng cổ phiếu vẫn rớt ngay sau đó. Vì sao?",
        "options": [
          "Vì thị trường đã kỳ vọng mức cao hơn 20%",
          "Vì tăng trưởng 20% là mức thấp trong mọi ngành",
          "Vì báo cáo lợi nhuận luôn khiến giá giảm ngắn hạn",
          "Vì nhà đầu tư chốt lời sau mọi tin tốt được công bố"
        ],
        "correct": 0,
        "explanation": "Giá hiện tại đã bao gồm kỳ vọng của thị trường, nên thứ làm giá dịch chuyển là chênh lệch giữa thực tế và kỳ vọng đó. Tăng 20% khi consensus chờ 28% là một tin xấu, còn tăng 5% khi consensus chờ 2% lại là tin tốt."
      },
      {
        "question": "Chiến lược 'beat and raise' trong quản lý kỳ vọng hoạt động thế nào?",
        "options": [
          "Đặt guidance thận trọng rồi vượt và nâng dần",
          "Đặt guidance cao để thể hiện sự tự tin ra thị trường",
          "Không đưa guidance nào để tránh bị so sánh",
          "Chỉ nâng guidance sau khi giá cổ phiếu đã giảm"
        ],
        "correct": 0,
        "explanation": "Đặt mức thấp có thể đạt rồi liên tục vượt và nâng dự báo tạo chuỗi tin tốt và xây được uy tín về độ đáng tin của ban lãnh đạo. Đặt cao rồi phải hạ dự báo thì tốn kém gấp bội, vì thị trường sẽ chiết khấu mọi con số công ty đưa ra sau đó."
      }
    ]
  }),
  "day-1-readiness-integration-playbook-m-and-a": patch({
    "quiz": [
      {
        "question": "Vì sao 'Cultural Integration' (Tích hợp văn hóa doanh nghiệp) thường được coi là yếu tố khó khăn và bị đánh giá thấp nhất trong các thương vụ M&A, dù các yếu tố tài chính/pháp lý thường được chuẩn bị kỹ lưỡng hơn nhiều?",
        "options": [
          "Vì văn hóa là yếu tố vô hình, khó đo lường định lượng",
          "Vì luật lao động cấm thay đổi chính sách nhân sự sau M&A",
          "Vì hai công ty luôn dùng hệ thống công nghệ khác nhau",
          "Vì chi phí đào tạo lại toàn bộ nhân viên là quá lớn"
        ],
        "correct": 0,
        "explanation": "Đây là một trong những bài học được lặp lại nhiều nhất trong nghiên cứu M&A: các yếu tố 'cứng' (tài chính, pháp lý, hệ thống) thường được due diligence kỹ lưỡng vì có thể đo lường định lượng rõ ràng, nhưng yếu tố 'mềm' (văn hóa, con người) - dù khó đo lường - lại thường là nguyên nhân thực sự khiến synergy kỳ vọng không thành hiện thực, vì nhân tài chủ chốt (thường là tài sản giá trị nhất của một thương vụ) có xu hướng rời đi khi cảm thấy văn hóa mới không phù hợp."
      },
      {
        "question": "'Synergy Tracking' (theo dõi giá trị cộng hưởng) sau khi deal hoàn tất khác với việc chỉ đơn giản dự báo synergy TRƯỚC khi deal như thế nào, và tại sao nó quan trọng cho vai trò của chuyên viên PMI?",
        "options": [
          "Đo lường thực tế synergy đạt được so với dự báo ban đầu",
          "Ghi nhận synergy vào báo cáo tài chính hợp nhất năm đầu",
          "Dự báo mức synergy có thể đạt trước khi ký thỏa thuận",
          "Phân bổ synergy giữa cổ đông hai bên theo tỷ lệ vốn"
        ],
        "correct": 0,
        "explanation": "Đây là khác biệt quan trọng giữa 'lý thuyết' và 'thực thi' trong M&A: nhiều nghiên cứu chỉ ra rằng phần lớn thương vụ M&A không đạt được đầy đủ synergy đã dự báo ban đầu - vai trò của PMI Specialist chính là đảm bảo khoảng cách này được thu hẹp thông qua theo dõi có hệ thống, xác định sớm các rào cản thực hiện, và điều chỉnh kế hoạch tích hợp khi cần thiết, biến các con số synergy từ 'giả định trên slide thuyết trình' thành 'kết quả tài chính thực tế'."
      },
      {
        "question": "'Retention Plan' (Kế hoạch giữ chân nhân tài) cho các vị trí chủ chốt của công ty bị mua lại thường được thiết kế và công bố ở giai đoạn nào của quy trình M&A, và tại sao thời điểm này quan trọng?",
        "options": [
          "Thiết kế và công bố càng sớm càng tốt, ngay khi công bố deal",
          "Áp dụng cho toàn bộ nhân viên chứ không riêng vị trí nào",
          "Chờ tới khi thấy nhân sự chủ chốt có ý định nghỉ việc",
          "Chỉ triển khai sau khi đã hoàn tất mọi thủ tục pháp lý"
        ],
        "correct": 0,
        "explanation": "Thời điểm công bố Retention Plan là yếu tố chiến lược quan trọng: khoảng thời gian 'bất định' giữa lúc công bố deal và khi hoàn tất chính thức là 'cửa sổ rủi ro' cao nhất cho việc mất nhân tài, vì đối thủ cạnh tranh thường chủ động tiếp cận nhân sự giỏi của công ty đang bị mua lại trong giai đoạn này, lợi dụng tâm lý bất an của họ. PMI Specialist giỏi nhận diện sớm những vị trí/cá nhân có nguy cơ cao nhất và đảm bảo họ nhận được sự rõ ràng về vai trò, đãi ngộ càng sớm càng tốt."
      },
      {
        "question": "Vì sao tích hợp văn hóa thường bị xem nhẹ trong quá trình due diligence?",
        "options": [
          "Vì nó khó đo bằng số so với tài chính",
          "Vì nó chỉ thành vấn đề sau khi deal đã đóng",
          "Vì luật không yêu cầu đánh giá phần văn hóa",
          "Vì bên mua luôn áp đặt được văn hóa của mình"
        ],
        "correct": 0,
        "explanation": "Due diligence chạy trên những thứ kiểm chứng được: sổ sách, hợp đồng, nghĩa vụ thuế. Văn hóa không có bảng biểu nào để soát, nên dễ bị đẩy xuống cuối danh sách - dù đây lại là nguyên nhân hàng đầu khiến các thương vụ không đạt được giá trị đã hứa."
      },
      {
        "question": "Synergy Tracking sau khi deal hoàn tất khác gì với ước tính synergy lúc định giá?",
        "options": [
          "Đo giá trị thực tế đã đạt so với cam kết ban đầu",
          "Chỉ là bước lặp lại phép tính đã làm khi định giá",
          "Do bên bán thực hiện và báo cáo lại cho bên mua",
          "Được thay bằng kiểm toán độc lập sau 12 tháng"
        ],
        "correct": 0,
        "explanation": "Con số synergy lúc định giá là lời hứa dùng để biện minh cho mức giá đã trả; theo dõi sau deal là kiểm tra xem lời hứa đó có thành hiện thực không, gắn với người chịu trách nhiệm và mốc thời gian. Không có bước này, phần chênh giá trả thêm không bao giờ bị đối chất."
      }
    ]
  }),
  "hoach-dinh-tai-chinh-toan-dien": patch({
    "quiz": [
      {
        "question": "Vì sao trả bớt khoản nợ tiêu dùng lãi 22%/năm thường được ưu tiên trước khi đầu tư thêm?",
        "options": [
          "Vì đó là lợi ích chắc chắn 22%/năm, không kèm rủi ro",
          "Vì lãi vay tiêu dùng được tính kép theo ngày nên tăng nhanh",
          "Vì luật yêu cầu tất toán nợ trước khi mở tài khoản đầu tư",
          "Vì ngân hàng sẽ hạ điểm tín dụng nếu còn dư nợ thẻ"
        ],
        "correct": 0,
        "explanation": "Đây là phép so sánh cốt lõi: mỗi đồng trả bớt nợ tránh được chi phí lãi ở mức đó một cách chắc chắn. So một lợi ích chắc chắn 22% với một kỳ vọng bất định thấp hơn thì lựa chọn khá rõ ràng."
      },
      {
        "question": "Sáu mảng của một kế hoạch tài chính toàn diện gồm những gì?",
        "options": [
          "Dòng tiền, nợ, bảo vệ, đầu tư, hưu trí, chuyển giao tài sản",
          "Mục tiêu, phân tích, đề xuất, thực thi, giám sát, báo cáo",
          "Thu nhập, chi tiêu, tiết kiệm, vay, bảo hiểm, và thừa kế",
          "Ngân sách, quỹ khẩn cấp, cổ phiếu, trái phiếu, vàng, nhà"
        ],
        "correct": 0,
        "explanation": "Sáu mảng này bao trùm toàn bộ vòng đời tài chính của một cá nhân. Điểm quan trọng là chúng liên kết với nhau: thay đổi ở một mảng luôn tạo hệ quả ở các mảng khác."
      },
      {
        "question": "Khách hàng muốn dồn hết tiền dư vào đầu tư và bỏ qua bảo hiểm vì 'chưa cần thiết'. Cách xử lý phù hợp của chuyên viên hoạch định là gì?",
        "options": [
          "Trình bày hệ quả định lượng nếu người trụ cột gặp sự cố",
          "Từ chối tiếp tục tư vấn cho tới khi khách mua bảo hiểm",
          "Giới thiệu gói bảo hiểm rẻ nhất để khách dễ chấp nhận",
          "Chiều theo ý khách vì đó là quyền quyết định của họ"
        ],
        "correct": 0,
        "explanation": "Vai trò của chuyên viên hoạch định không phải quyết định thay khách hàng, mà bảo đảm khách hàng quyết định trên cơ sở hiểu rõ hệ quả. Ghi lại việc đã cảnh báo cũng bảo vệ chính chuyên viên về sau."
      },
    {
      "question": "Vì sao tối ưu riêng một mảng có thể làm hỏng cả kế hoạch tổng thể?",
      "options": [
        "Vì sáu mảng ràng buộc lẫn nhau về cùng một dòng tiền",
        "Vì mỗi mảng do một chuyên gia khác nhau phụ trách",
        "Vì luật yêu cầu phải cân bằng đủ cả sáu mảng",
        "Vì tối ưu một mảng luôn làm tăng chi phí thuế"
      ],
      "correct": 0,
      "explanation": "Cả sáu mảng rút từ cùng một nguồn tiền hữu hạn, nên dồn tối đa cho đầu tư nghĩa là rút bớt khỏi bảo vệ rủi ro hoặc quỹ khẩn cấp. Một danh mục tối ưu đứng cạnh một lỗ hổng bảo hiểm không phải là kế hoạch tốt, mà là một kế hoạch dễ vỡ."
    },
    {
      "question": "Thứ tự ưu tiên chuẩn khi xây dựng một kế hoạch tài chính là gì?",
      "options": [
        "Quỹ khẩn cấp, nợ lãi cao, bảo vệ, rồi đầu tư",
        "Đầu tư tăng trưởng trước, phần còn lại tính sau",
        "Bảo hiểm trước tiên, rồi mới tới quỹ khẩn cấp",
        "Trả hết mọi khoản nợ rồi mới làm bất cứ điều gì khác"
      ],
      "correct": 0,
      "explanation": "Thứ tự này đi từ chắc chắn tới bất định: quỹ khẩn cấp chặn cú sốc, trả nợ lãi cao cho lợi suất chắc chắn, bảo vệ rủi ro chặn thảm họa, rồi mới tới đầu tư. Trả hết mọi khoản nợ trước là quá tay - khoản vay nhà lãi 8% không cùng nhóm với nợ thẻ 22%."
    }
    ]
  }),
  "hoach-dinh-tai-chinh-theo-giai-doan-cuoc-doi": patch({
    "quiz": [
      {
        "question": "Khả năng chịu rủi ro về mặt cấu trúc phụ thuộc chủ yếu vào hai yếu tố nào?",
        "options": [
          "Thời gian còn lại và khả năng bù đắp bằng thu nhập sau",
          "Quy mô tài sản ròng và kinh nghiệm đầu tư đã tích lũy",
          "Mức độ chịu đựng tâm lý khi thấy danh mục biến động",
          "Tuổi tác và mức thu nhập hiện tại của nhà đầu tư đó"
        ],
        "correct": 0,
        "explanation": "Hai yếu tố này khách quan và đo được, khác với khẩu vị rủi ro mang tính chủ quan. Một người có thể nói mình chấp nhận rủi ro cao, nhưng nếu cần dùng tiền sau 18 tháng thì khả năng chịu rủi ro thực tế của họ vẫn thấp."
      },
      {
        "question": "Rủi ro thứ tự lợi nhuận ảnh hưởng mạnh nhất đến nhóm nào?",
        "options": [
          "Người cận hưu trí và những năm đầu sau khi nghỉ hưu",
          "Người trẻ mới bắt đầu tích lũy trong mười năm đầu tiên",
          "Người có danh mục tập trung vào một vài mã cổ phiếu",
          "Người vay ký quỹ để đầu tư với tỷ lệ đòn bẩy cao"
        ],
        "correct": 0,
        "explanation": "Với người đang tích lũy, một đợt giảm còn có tác dụng cho phép mua ở giá thấp hơn. Với người đang rút tiền, đợt giảm buộc phải bán nhiều đơn vị tài sản hơn, làm giảm phần còn lại có thể hồi phục."
      },
      {
        "question": "Nhu cầu bảo hiểm nhân thọ của một người thường đạt mức cao nhất vào giai đoạn nào?",
        "options": [
          "Giai đoạn xây dựng gia đình: nợ nhà lớn, con còn nhỏ",
          "Giai đoạn mới đi làm, thu nhập còn thấp và chưa ổn định",
          "Giai đoạn cận hưu trí, khi tài sản tích lũy đạt đỉnh",
          "Giai đoạn đã nghỉ hưu và sống bằng danh mục đầu tư"
        ],
        "correct": 0,
        "explanation": "Bảo hiểm nhân thọ bảo vệ những người phụ thuộc vào thu nhập của bạn. Nhu cầu đạt đỉnh khi nghĩa vụ tài chính lớn nhất gặp đúng lúc tài sản tích lũy còn nhỏ nhất, rồi giảm dần khi nợ được trả bớt và tài sản tăng lên."
      },
    {
      "question": "Vì sao cùng một mức biến động lại tạo hệ quả rất khác giữa giai đoạn tích lũy và giai đoạn rút tiền?",
      "options": [
        "Vì lúc rút, phần vốn bán đi không còn để hồi phục",
        "Vì biến động thị trường lớn hơn ở tuổi nghỉ hưu",
        "Vì người nghỉ hưu chịu thuế cao hơn trên lợi nhuận",
        "Vì danh mục hưu trí không được phép nắm cổ phiếu"
      ],
      "correct": 0,
      "explanation": "Người đang tích lũy gặp thị trường giảm thì mua được nhiều đơn vị hơn với cùng số tiền góp. Người đang rút thì phải bán nhiều đơn vị hơn ở giá thấp, và phần đã bán không còn nằm đó để hưởng đợt hồi phục - cùng một biến động, hai kết cục ngược nhau."
    },
    {
      "question": "Scenario: Một người 55 tuổi còn khoảng 10 năm đi làm. Danh mục nên điều chỉnh theo hướng nào?",
      "options": [
        "Giảm dần tỷ trọng tài sản rủi ro theo thời gian còn lại",
        "Giữ nguyên tỷ trọng như hồi 30 tuổi để bù lại",
        "Tăng tỷ trọng cổ phiếu để kịp đạt mục tiêu hưu trí",
        "Chuyển toàn bộ sang tiền gửi ngay từ tuổi 55"
      ],
      "correct": 0,
      "explanation": "Thời gian còn lại để bù đắp một đợt giảm đang rút ngắn, nên tỷ trọng tài sản rủi ro phải giảm theo - đều đặn chứ không đột ngột. Chuyển hết sang tiền gửi ở tuổi 55 lại tạo rủi ro khác: ba mươi năm hưu trí phía trước cần phần tăng trưởng để chống lạm phát."
    }
    ]
  }),
  "ffo-affo-chi-so-loi-nhuan-cua-reit": patch({
    "quiz": [
      {
        "question": "Công thức cơ bản của FFO (Funds From Operations) là gì?",
        "options": [
          "Lợi nhuận sau thuế + khấu hao bất động sản − lãi bán tài sản",
          "Lợi nhuận sau thuế + khấu hao − chi phí vốn duy trì tài sản",
          "Lợi nhuận trước thuế cộng lãi vay và khấu hao trong kỳ",
          "Dòng tiền hoạt động trừ đi cổ tức đã chi trả trong kỳ"
        ],
        "correct": 0,
        "explanation": "FFO cộng lại khấu hao vì đó là chi phí phi tiền mặt, và loại bỏ lãi/lỗ từ việc bán tài sản vì đó là khoản một lần không phản ánh khả năng sinh lời lặp lại từ hoạt động cho thuê."
      },
      {
        "question": "AFFO khác FFO ở điểm nào và vì sao khác biệt đó quan trọng?",
        "options": [
          "AFFO trừ thêm chi phí vốn duy trì để giữ tài sản cho thuê được",
          "AFFO cộng thêm phần lãi từ việc bán bất động sản trong kỳ",
          "AFFO chỉ áp dụng cho REIT niêm yết, FFO cho mọi REIT",
          "AFFO tính trước thuế còn FFO tính sau thuế thu nhập"
        ],
        "correct": 0,
        "explanation": "FFO bỏ qua thực tế là một toà nhà cần chi tiền định kỳ để thay thang máy, sửa hệ thống điều hoà, cải tạo mặt bằng cho khách thuê mới. AFFO trừ những khoản đó ra, nên nó là thước đo thận trọng hơn về khả năng chi trả cổ tức bền vững."
      },
      {
        "question": "Vì sao dùng chỉ số P/E để so sánh một REIT với một doanh nghiệp sản xuất là không phù hợp?",
        "options": [
          "Vì khấu hao bất động sản rất lớn bóp méo mẫu số của P/E",
          "Vì giá cổ phiếu REIT biến động theo lãi suất chứ không lợi nhuận",
          "Vì REIT không có lợi nhuận kế toán theo chuẩn mực thường",
          "Vì REIT được miễn thuế nên lợi nhuận không so sánh được"
        ],
        "correct": 0,
        "explanation": "Vấn đề nằm ở mẫu số. Cùng một dòng tiền, một REIT sẽ có lợi nhuận kế toán thấp hơn nhiều so với doanh nghiệp có ít tài sản dài hạn - nên so P/E giữa hai loại là so hai thứ được tính theo cách khác nhau."
      },
      {
        "question": "Một REIT có tỷ lệ chi trả cổ tức trên AFFO là 115%. Điều này gợi ý gì?",
        "options": [
          "Cổ tức đang vượt dòng tiền thực có thể chia được",
          "REIT đang giữ lại quá ít lợi nhuận để tái đầu tư thêm",
          "REIT đang hoạt động rất hiệu quả nên chia được nhiều",
          "Đây là mức bình thường vì REIT phải chia trên 90%"
        ],
        "correct": 0,
        "explanation": "Tỷ lệ chi trả trên AFFO vượt 100% kéo dài là dấu hiệu cổ tức không được tài trợ bởi hoạt động cho thuê. Đây là một trong những chỉ số cảnh báo sớm quan trọng nhất khi phân tích REIT."
      },
      {
        "question": "Scenario: Một REIT có lợi nhuận kế toán 100 tỷ, khấu hao bất động sản 180 tỷ và lãi từ bán tài sản 30 tỷ. FFO là bao nhiêu?",
        "options": [
          "250 tỷ (= 100 + 180 − 30 lãi bán tài sản)",
          "280 tỷ (= 100 + 180, quên trừ lãi bán)",
          "310 tỷ (= 100 + 180 + 30, cộng cả lãi bán)",
          "100 tỷ (= lấy luôn lợi nhuận kế toán)"
        ],
        "correct": 0,
        "explanation": "FFO cộng lại khấu hao vì đó là chi phí phi tiền mặt, và trừ lãi bán tài sản vì đó là khoản một lần không lặp lại: 100 + 180 − 30 = 250 tỷ. Giữ lãi bán trong đó sẽ thổi phồng khả năng sinh lời thường xuyên của danh mục bất động sản."
      }
    ]
  }),
  "cau-truc-family-office-single-vs-multi": patch({
    "quiz": [
      {
        "question": "Khác biệt cơ bản giữa single-family office và multi-family office là gì?",
        "options": [
          "SFO phục vụ một gia đình với đội ngũ riêng, may đo hơn",
          "SFO chỉ quản lý đầu tư còn MFO quản lý cả pháp lý và thuế",
          "SFO do ngân hàng vận hành, MFO do gia đình tự lập ra",
          "SFO có quy mô tài sản nhỏ hơn nhiều so với MFO"
        ],
        "correct": 0,
        "explanation": "Đây là đánh đổi cốt lõi: kiểm soát và may đo đổi lấy chi phí và bề rộng chuyên môn. Không mô hình nào tốt hơn tuyệt đối - lựa chọn phụ thuộc vào quy mô tài sản và mức độ phức tạp của nhu cầu."
      },
      {
        "question": "Vì sao quản trị gia đình (family governance) lại là một cấu phần bắt buộc của văn phòng gia đình, không chỉ là việc quản lý đầu tư?",
        "options": [
          "Vì phần lớn thất bại đến từ xung đột giữa các thành viên",
          "Vì cơ quan quản lý yêu cầu có quy chế quản trị bằng văn bản",
          "Vì thuế thừa kế chỉ được ưu đãi nếu có quy chế rõ ràng",
          "Vì cần có người đại diện ký các hợp đồng đầu tư lớn"
        ],
        "correct": 0,
        "explanation": "Đây là điểm phân biệt văn phòng gia đình với một công ty quản lý tài sản thông thường. Thiếu cơ chế quyết định và giải quyết xung đột, một danh mục đầu tư tốt vẫn có thể bị phân rã khi chuyển sang thế hệ sau."
      },
      {
        "question": "Dịch vụ nào sau đây thuộc phạm vi của một văn phòng gia đình nhưng thường KHÔNG có ở một công ty quản lý quỹ thông thường?",
        "options": [
          "Chuyển giao thế hệ, quản trị xung đột, giáo dục tài chính",
          "Quản lý danh mục đầu tư cùng tư vấn phân bổ tài sản chi tiết",
          "Tư vấn thuế và cấu trúc pháp lý cho tài sản ở nước ngoài",
          "Cho vay thế chấp bằng danh mục chứng khoán đang nắm giữ"
        ],
        "correct": 0,
        "explanation": "Ba phương án còn lại là nghiệp vụ quản lý tài sản tiêu chuẩn. Phần khác biệt của văn phòng gia đình nằm ở các chức năng phi đầu tư gắn với gia đình như một thực thể nhiều thế hệ."
      },
      {
        "question": "Scenario: Một gia đình có 200 triệu USD, chi phí vận hành một single-family office khoảng 2 triệu USD mỗi năm. Phép thử đầu tiên khi chọn cấu trúc là gì?",
        "options": [
          "Tỷ lệ chi phí trên tài sản, ở đây là 1%",
          "Số lượng nhân sự cần tuyển cho văn phòng",
          "Mức thuế phải nộp khi lập pháp nhân riêng",
          "Danh tiếng của các multi-family office đang có"
        ],
        "correct": 0,
        "explanation": "Chi phí văn phòng gia đình gần như cố định, nên nó chỉ hợp lý khi tài sản đủ lớn để chia mỏng ra: 2 trên 200 triệu là 1%, ngang mức phí quản lý bên ngoài. Cùng bộ máy đó áp lên 50 triệu USD sẽ thành 4%, mức không kênh đầu tư nào bù nổi."
      },
      {
        "question": "Vì sao quản trị gia đình là cấu phần bắt buộc chứ không phải tùy chọn của văn phòng gia đình?",
        "options": [
          "Vì tài sản thường tan sau vài thế hệ do xung đột",
          "Vì cơ quan thuế yêu cầu có quy chế bằng văn bản",
          "Vì nó thay thế được nhu cầu quản lý đầu tư",
          "Vì nó giúp giảm phí dịch vụ của văn phòng"
        ],
        "correct": 0,
        "explanation": "Nguyên nhân tài sản gia đình biến mất qua các thế hệ hiếm khi là hiệu quả đầu tư kém, mà là bất đồng về quyết định và thiếu người kế nhiệm được chuẩn bị. Quản trị gia đình - quy tắc ra quyết định, cơ chế giải quyết bất đồng, đào tạo thế hệ sau - xử lý đúng nguyên nhân đó."
      }
    ]
  }),
  "co-che-tao-hoan-etf-authorized-participants": patch({
    "quiz": [
      {
        "question": "Thành viên lập quỹ (Authorized Participant) là ai và họ khác nhà đầu tư thông thường ở điểm gì?",
        "options": [
          "Định chế có thỏa thuận với quỹ, được tạo và hoàn chứng chỉ",
          "Nhà đầu tư tổ chức nắm trên 5% số chứng chỉ quỹ đang lưu hành",
          "Đơn vị lưu ký giữ tài sản cơ sở của quỹ ETF theo quy định",
          "Công ty chứng khoán được chỉ định làm tạo lập thị trường"
        ],
        "correct": 0,
        "explanation": "Sự tồn tại của một thị trường sơ cấp song song - nơi chứng chỉ quỹ có thể được tạo mới hoặc triệt tiêu theo NAV - là điểm khác biệt cấu trúc giữa ETF và quỹ đóng, và cũng là lý do ETF thường giao dịch sát NAV."
      },
      {
        "question": "Vì sao quỹ đóng (closed-end fund) có thể giao dịch chiết khấu sâu so với NAV trong thời gian dài, còn ETF thì thường không?",
        "options": [
          "Vì số chứng chỉ cố định, không có cơ chế tạo và hoàn",
          "Vì quỹ đóng thường nắm tài sản kém thanh khoản hơn ETF",
          "Vì phí quản lý của quỹ đóng cao hơn nhiều so với ETF",
          "Vì quỹ đóng không bắt buộc công bố NAV hằng ngày"
        ],
        "correct": 0,
        "explanation": "Chính khả năng tạo và hoàn theo NAV là yếu tố tạo ra lực kéo giá. Không có cơ chế đó, giá quỹ đóng chỉ phụ thuộc vào cung cầu thứ cấp và có thể lệch khỏi NAV rất lâu."
      },
      {
        "question": "Cơ chế tạo và hoàn bằng hiện vật (in-kind) mang lại lợi ích gì so với thực hiện bằng tiền?",
        "options": [
          "Quỹ không phải bán tài sản nên giảm chi phí và thuế",
          "Nhà đầu tư nhận được tiền mặt nhanh hơn cách thông thường",
          "Quỹ được miễn hoàn toàn thuế lãi vốn khi hoàn chứng chỉ",
          "Quỹ có thể thay đổi danh mục mà không cần báo cáo"
        ],
        "correct": 0,
        "explanation": "Khi việc hoàn lại được thực hiện bằng cách chuyển giao chính rổ chứng khoán thay vì bán ra lấy tiền, quỹ tránh được vòng giao dịch và các hệ quả về chi phí cùng thuế. Đây là một trong những lợi thế cấu trúc quan trọng của ETF so với quỹ mở truyền thống."
      },
      {
        "question": "Nhà đầu tư nên đặc biệt lưu ý điều gì khi mua ETF trên tài sản kém thanh khoản trong giai đoạn thị trường căng thẳng?",
        "options": [
          "Chênh lệch mua bán rộng ra và giá lệch khỏi NAV nhiều hơn",
          "NAV sẽ không được công bố trong những phiên biến động",
          "Quỹ có thể bị buộc đóng cửa bất ngờ mà không báo trước",
          "Phí quản lý sẽ tự động tăng lên khi thanh khoản giảm"
        ],
        "correct": 0,
        "explanation": "Đây là hệ quả thực tế quan trọng nhất của bài học: cơ chế tạo và hoàn chỉ hiệu quả bằng mức độ thanh khoản của tài sản cơ sở. Trong điều kiện đó, dùng lệnh giới hạn và tránh giao dịch vào đầu hoặc cuối phiên là biện pháp phòng vệ hợp lý."
      },
      {
        "question": "Scenario: Một ETF đang giao dịch cao hơn NAV 2%. Thành viên lập quỹ sẽ làm gì để kiếm lời từ chênh lệch này?",
        "options": [
          "Mua rổ chứng khoán, tạo chứng chỉ mới rồi bán ra",
          "Mua chứng chỉ trên sàn rồi chờ giá lên tiếp",
          "Bán khống chứng chỉ và chờ NAV tự tăng lên",
          "Yêu cầu quỹ tạm dừng giao dịch để giá về NAV"
        ],
        "correct": 0,
        "explanation": "Gom đúng rổ tài sản cơ sở, đổi lấy chứng chỉ mới theo NAV rồi bán ra thị trường ở mức cao hơn 2% - phần chênh chính là lợi nhuận. Nguồn cung tăng thêm đó tự kéo giá về NAV, nên cơ chế chạy bằng động cơ lợi nhuận chứ không cần ai can thiệp."
      }
    ]
  }),
  "duration-va-convexity-do-nhay-gia-trai-phieu": patch({
    "quiz": [
      {
        "question": "Modified duration đo lường điều gì?",
        "options": [
          "Phần trăm giá đổi khi lãi suất đổi một điểm phần trăm",
          "Thời gian còn lại tính đến ngày đáo hạn của trái phiếu",
          "Mức độ nhạy của lợi suất khi giá trái phiếu thay đổi",
          "Số năm trung bình để nhận lại toàn bộ dòng tiền gốc"
        ],
        "correct": 0,
        "explanation": "Đây là điểm hay bị nhầm với kỳ hạn còn lại. Một trái phiếu 10 năm có coupon cao sẽ có duration ngắn hơn một trái phiếu 10 năm không coupon, vì dòng tiền được nhận sớm hơn nên giá ít nhạy với lãi suất hơn."
      },
      {
        "question": "Yếu tố nào làm duration của một trái phiếu NGẮN lại?",
        "options": [
          "Coupon cao hơn và lợi suất thị trường cao hơn",
          "Khối lượng phát hành của đợt trái phiếu đó lớn hơn",
          "Xếp hạng tín nhiệm của tổ chức phát hành cao hơn",
          "Coupon thấp hơn cùng kỳ hạn còn lại dài hơn nữa"
        ],
        "correct": 0,
        "explanation": "Duration về bản chất là thời gian bình quân có trọng số của các dòng tiền. Coupon cao dồn nhiều giá trị về các kỳ sớm, còn lợi suất cao làm các dòng tiền xa bị chiết khấu mạnh hơn - cả hai đều kéo trọng số về phía trước."
      },
      {
        "question": "Convexity dương mang lại lợi ích gì cho nhà đầu tư trái phiếu?",
        "options": [
          "Giá giảm ít hơn và tăng nhiều hơn mức duration dự báo",
          "Giá luôn tăng bất kể lãi suất thị trường đi theo hướng nào",
          "Duration của trái phiếu không đổi khi lãi suất biến động",
          "Lợi suất đáo hạn được đảm bảo không đổi tới khi đáo hạn"
        ],
        "correct": 0,
        "explanation": "Chính tính bất đối xứng này khiến convexity là đặc tính đáng mong muốn, và cũng vì thế nó thường phải trả giá bằng lợi suất thấp hơn một chút so với trái phiếu cùng duration nhưng convexity thấp."
      },
      {
        "question": "Vì sao trái phiếu có quyền mua lại trước hạn (callable bond) thường có convexity âm khi lãi suất giảm?",
        "options": [
          "Vì khi lãi suất giảm đủ nhiều, tổ chức phát hành mua lại",
          "Vì callable bond luôn có coupon thấp hơn trái phiếu thường",
          "Vì nhà đầu tư có quyền bán lại trái phiếu cho tổ chức",
          "Vì kỳ hạn của callable bond luôn ngắn hơn năm năm"
        ],
        "correct": 0,
        "explanation": "Quyền mua lại nằm trong tay tổ chức phát hành, nên nó bất lợi cho nhà đầu tư đúng vào lúc thuận lợi nhất. Trần giá này tạo ra convexity âm, và đó là lý do trái phiếu có quyền mua lại thường phải bù cho nhà đầu tư bằng lợi suất cao hơn."
      },
      {
        "question": "Scenario: Một trái phiếu có modified duration bằng 6. Lãi suất thị trường tăng 0,5%. Giá trái phiếu thay đổi xấp xỉ bao nhiêu?",
        "options": [
          "Giảm khoảng 3% (= 6 × 0,5%, bậc một)",
          "Tăng khoảng 3%, vì lãi suất và giá cùng chiều",
          "Giảm khoảng 0,5%, đúng bằng mức lãi suất tăng",
          "Giảm khoảng 12% (= 6 ÷ 0,5, chia thay vì nhân)"
        ],
        "correct": 0,
        "explanation": "Modified duration nhân với mức thay đổi lãi suất cho ước lượng phần trăm biến động giá, ngược chiều: 6 × 0,5% = 3% giảm. Đây chỉ là xấp xỉ bậc một - với biến động lãi suất lớn, convexity sẽ sửa lại và mức giảm thực tế nhẹ hơn con số này."
      }
    ]
  }),
  "ma-phong-thu-thau-tom-thu-dich": patch({
    "quiz": [
      {
        "question": "Poison Pill hoạt động theo cơ chế nào để cản trở thâu tóm thù địch?",
        "options": [
          "Tạm dừng giao dịch cổ phiếu trên sàn theo quyết định của hội đồng",
          "Cổ đông khác được mua cổ phiếu giá rẻ, pha loãng bên thâu tóm",
          "Buộc bên thâu tóm phải trả gấp đôi thị giá đóng cửa gần nhất",
          "Tự động sáp nhập công ty mục tiêu với một đối thủ cạnh tranh khác"
        ],
        "correct": 1,
        "explanation": "Cơ chế cốt lõi của Poison Pill là pha loãng: khi kích hoạt, các cổ đông hiện hữu (trừ bên thâu tóm) được quyền mua cổ phiếu giá rẻ, làm tăng mạnh số lượng cổ phiếu lưu hành và giảm tỷ lệ sở hữu tương đối, khiến thương vụ thâu tóm trở nên tốn kém hơn nhiều so với dự tính ban đầu."
      },
      {
        "question": "White Knight (\"hiệp sĩ trắng\") trong chiến thuật phòng thủ M&A là gì?",
        "options": [
          "Một cố vấn pháp lý được thuê riêng để đại diện công ty mục tiêu",
          "Một loại trái phiếu chuyển đổi phát hành để huy động vốn phòng thủ",
          "Một bên mua thứ ba thân thiện hơn, do ban lãnh đạo chủ động tìm đến",
          "Cổ đông lớn nhất hiện hữu của chính công ty đang bị thâu tóm"
        ],
        "correct": 2,
        "explanation": "White Knight là chiến thuật tìm một bên mua thay thế, thường được ban lãnh đạo/cổ đông đánh giá là thân thiện hơn hoặc mang lại giá trị tốt hơn so với bên thâu tóm thù địch ban đầu, tạo ra một lựa chọn cạnh tranh cho cổ đông."
      },
      {
        "question": "Một số nhà đầu tư chỉ trích chiến thuật phòng thủ thâu tóm (như Poison Pill) vì lý do gì?",
        "options": [
          "Vì chúng luôn vi phạm pháp luật về chứng khoán ở mọi thị trường",
          "Vì chúng luôn làm giảm giá cổ phiếu ngay lập tức sau khi công bố",
          "Vì chúng chỉ áp dụng được cho công ty tư nhân chưa niêm yết trên sàn",
          "Vì chúng có thể bị dùng để giữ ghế ban lãnh đạo thay vì bảo vệ cổ đông"
        ],
        "correct": 3,
        "explanation": "Đây là tranh cãi cốt lõi về quản trị doanh nghiệp: liệu công cụ phòng thủ có thực sự bảo vệ lợi ích cổ đông dài hạn, hay chỉ đang bảo vệ vị trí của ban lãnh đạo hiện tại (một dạng xung đột lợi ích - agency problem) khi họ có thể ngăn cản một thương vụ mà cổ đông thực ra ủng hộ vì mức giá hấp dẫn."
      },
      {
        "question": "Vì sao ban lãnh đạo có thể muốn chống thâu tóm dù giá chào cao hơn thị trường?",
        "options": [
          "Vì họ có thể mất ghế sau khi thương vụ hoàn tất",
          "Vì cổ đông không được phép bán cổ phần khi bị thâu tóm",
          "Vì giá chào cao luôn kèm điều kiện bất lợi cho doanh nghiệp",
          "Vì luật buộc ban lãnh đạo phải từ chối mọi đề nghị thù địch"
        ],
        "correct": 0,
        "explanation": "Đây là xung đột đại diện kinh điển: người quyết định phòng thủ không phải người hưởng lợi từ giá chào. Chính vì thế các chiến thuật phòng thủ luôn bị soi kỹ về việc chúng bảo vệ ai."
      },
      {
        "question": "Staggered board làm khó bên thâu tóm bằng cách nào?",
        "options": [
          "Chỉ thay được một phần hội đồng mỗi năm, kéo dài nhiều năm",
          "Buộc bên thâu tóm phải mua toàn bộ cổ phần đang lưu hành",
          "Cho phép hội đồng phát hành thêm cổ phiếu không giới hạn",
          "Yêu cầu mọi quyết định phải được cổ đông nhỏ lẻ chấp thuận"
        ],
        "correct": 0,
        "explanation": "Nắm được đa số cổ phần mà vẫn chưa kiểm soát được hội đồng thì quyền kiểm soát bị trì hoãn nhiều năm. Chi phí vốn trong thời gian chờ đó thường đủ để bên thâu tóm bỏ cuộc."
      }
    ]
  }),
  "ma-cau-truc-earnout": patch({
    "quiz": [
      {
        "question": "Rủi ro lớn nhất đối với bên bán khi chấp nhận cấu trúc Earnout là gì?",
        "options": [
          "Không có rủi ro đáng kể, bên bán luôn nhận đủ tiền ngay khi ký kết",
          "Phụ thuộc vào cách bên mua vận hành dù đã mất quyền kiểm soát",
          "Earnout luôn có giá trị thấp hơn khoản trả trước theo quy định pháp luật",
          "Bên bán phải hoàn trả tiền nếu công ty không đạt mốc hiệu suất"
        ],
        "correct": 1,
        "explanation": "Đây là rủi ro cấu trúc cốt lõi của earnout: một khi deal đóng, quyền kiểm soát vận hành thường chuyển sang bên mua, nhưng bên bán vẫn phụ thuộc vào kết quả vận hành đó để nhận đủ khoản earnout - tạo ra xung đột lợi ích nếu bên mua có động cơ (dù không cố ý) đưa ra quyết định làm giảm khả năng đạt mốc hiệu suất."
      },
      {
        "question": "Vì sao các điều khoản earnout thường được đàm phán rất chi tiết, bao gồm cả cách đo lường và quyền giám sát của bên bán sau khi deal đóng?",
        "options": [
          "Vì pháp luật bắt buộc mọi hợp đồng trả chậm phải có điều khoản này",
          "Chỉ để làm hài lòng đội ngũ pháp lý của cả hai bên trong thương vụ",
          "Vì earnout luôn phức tạp hơn các hình thức thanh toán khác về mặt thuế",
          "Để giảm tranh chấp về cách tính mốc và xung đột lợi ích khi mất kiểm soát"
        ],
        "correct": 3,
        "explanation": "Chi tiết hóa các điều khoản đo lường (công thức tính, nguồn dữ liệu, quyền kiểm tra sổ sách) và quyền giám sát vận hành ở mức độ nhất định cho bên bán là cách quản lý rủi ro xung đột lợi ích đã nêu, giảm khả năng tranh chấp pháp lý sau khi deal hoàn tất."
      },
      {
        "question": "Earnout mang lại lợi ích gì cho BÊN MUA so với việc trả toàn bộ giá trị ngay tại thời điểm đóng deal?",
        "options": [
          "Không có lợi ích gì, earnout chỉ nhằm bảo vệ quyền lợi bên bán",
          "Cho phép bên mua đơn phương huỷ thương vụ vào bất cứ lúc nào",
          "Giúp bên mua tránh hoàn toàn nghĩa vụ thuế phát sinh từ thương vụ",
          "Giảm rủi ro trả giá cao cho dự báo tăng trưởng chưa được kiểm chứng"
        ],
        "correct": 3,
        "explanation": "Lợi ích cốt lõi cho bên mua: giảm rủi ro trả giá cao dựa trên các dự báo tăng trưởng chưa được kiểm chứng. Nếu công ty không đạt được các mốc hiệu suất như bên bán kỳ vọng, bên mua không phải trả phần earnout tương ứng - chia sẻ rủi ro định giá một cách công bằng hơn."
      },
      {
        "question": "Earnout giải quyết vấn đề gì giữa bên mua và bên bán?",
        "options": [
          "Bất đồng về triển vọng tương lai của doanh nghiệp mục tiêu",
          "Thiếu tiền mặt để thanh toán toàn bộ giá trị thương vụ",
          "Yêu cầu của cơ quan quản lý về minh bạch giá giao dịch",
          "Tranh chấp về quyền sở hữu tài sản trí tuệ sau sáp nhập"
        ],
        "correct": 0,
        "explanation": "Bên bán tin doanh thu sẽ gấp đôi, bên mua thì không. Earnout để kết quả thực tế phân xử thay vì bắt hai bên thống nhất một dự báo - nó biến bất đồng thành điều khoản hợp đồng."
      },
      {
        "question": "Vì sao chỉ tiêu earnout thường dùng doanh thu thay vì lợi nhuận?",
        "options": [
          "Vì doanh thu khó bị bên mua tác động hơn lợi nhuận",
          "Vì doanh thu luôn phản ánh giá trị doanh nghiệp chính xác hơn",
          "Vì lợi nhuận chỉ được kiểm toán một lần mỗi năm tài chính",
          "Vì quy định kế toán cấm dùng lợi nhuận làm mốc thanh toán"
        ],
        "correct": 0,
        "explanation": "Sau khi sáp nhập, bên mua kiểm soát việc phân bổ chi phí chung, đầu tư và nhân sự - tất cả đều ảnh hưởng tới lợi nhuận. Doanh thu ít bị can thiệp hơn, nên tranh chấp cũng ít hơn."
      }
    ]
  }),
  "ma-xuyen-bien-gioi": patch({
    "quiz": [
      {
        "question": "Vì sao giới hạn tỷ lệ sở hữu nước ngoài là rào cản cần đánh giá TRƯỚC khi tính đến định giá trong M&A xuyên biên giới vào Việt Nam?",
        "options": [
          "Có đủ vốn là mua được bất kỳ tỷ lệ nào ở bất kỳ ngành nghề nào",
          "Vì đây chỉ là thủ tục hành chính cần hoàn tất trước khi ký hợp đồng",
          "Vì nó chỉ ảnh hưởng tới nghĩa vụ thuế thu nhập doanh nghiệp sau này",
          "Vì nó quyết định cấu trúc thương vụ khả thi: chi phối hay chỉ thiểu số"
        ],
        "correct": 3,
        "explanation": "Giới hạn sở hữu nước ngoài là ràng buộc nền tảng: nó xác định liệu nhà đầu tư có thể mua chi phối (trên 50%) hay chỉ được phép mua tỷ lệ thiểu số, điều này ảnh hưởng trực tiếp đến cấu trúc giao dịch, quyền kiểm soát, và thậm chí cả chiến lược tích hợp sau M&A - nên cần được làm rõ sớm nhất."
      },
      {
        "question": "Rào cản văn hóa trong M&A xuyên biên giới thường biểu hiện rõ nhất ở giai đoạn nào của thương vụ?",
        "options": [
          "Chỉ ở giai đoạn định giá và đàm phán giá ban đầu của thương vụ",
          "Chỉ ảnh hưởng tới việc dịch thuật tài liệu hợp đồng pháp lý",
          "Ở giai đoạn tích hợp hậu sáp nhập, khi hai đội ngũ vận hành cùng nhau",
          "Không có rào cản văn hoá nào đáng kể trong M&A hiện đại ngày nay"
        ],
        "correct": 2,
        "explanation": "Dù rào cản văn hóa có thể xuất hiện từ giai đoạn đàm phán, nó thường bộc lộ rõ và gây hậu quả lớn nhất ở giai đoạn tích hợp hậu sáp nhập (PMI) - khi sự khác biệt trong văn hóa doanh nghiệp, phong cách quản lý, và kỳ vọng giao tiếp giữa hai đội ngũ phải được dung hòa trong vận hành hàng ngày."
      },
      {
        "question": "Một cấu trúc phổ biến để nhà đầu tư nước ngoài tiếp cận ngành có giới hạn sở hữu nghiêm ngặt tại nhiều thị trường mới nổi (bao gồm một số trường hợp tại Việt Nam) là gì?",
        "options": [
          "Liên doanh với đối tác trong nước hoặc thoả thuận hợp tác kinh doanh",
          "Mua qua công ty trung gian đứng tên hộ mà không khai báo",
          "Chỉ có thể đầu tư gián tiếp qua thị trường chứng khoán quốc tế",
          "Không có cách nào tiếp cận ngành có giới hạn sở hữu nghiêm ngặt"
        ],
        "correct": 0,
        "explanation": "Các cấu trúc hợp pháp phổ biến bao gồm liên doanh với đối tác trong nước, các thỏa thuận hợp tác kinh doanh, hoặc sở hữu gián tiếp qua nhiều lớp phù hợp với quy định - tất cả đều cần tuân thủ chặt chẽ khung pháp lý hiện hành, không phải là cách \"lách luật\"."
      },
      {
        "question": "Vì sao thẩm định pháp lý nên đi trước thẩm định tài chính trong M&A xuyên biên giới?",
        "options": [
          "Vì rào cản sở hữu có thể khiến thương vụ bất khả thi ngay từ đầu",
          "Vì cơ quan quản lý yêu cầu nộp hồ sơ pháp lý trước hồ sơ tài chính",
          "Vì chi phí thẩm định pháp lý thấp hơn thẩm định tài chính nhiều",
          "Vì kết quả thẩm định tài chính phụ thuộc vào tỷ giá tại thời điểm ký"
        ],
        "correct": 0,
        "explanation": "Định giá xong một doanh nghiệp mà luật không cho phép sở hữu quá 30% là công sức bỏ đi. Trần sở hữu quyết định cấu trúc thương vụ, và cấu trúc quyết định cả cách định giá."
      },
      {
        "question": "Rủi ro văn hóa trong M&A xuyên biên giới lộ ra rõ nhất ở giai đoạn nào?",
        "options": [
          "Giai đoạn tích hợp sau khi thương vụ đã hoàn tất",
          "Giai đoạn đàm phán giá và điều khoản hợp đồng",
          "Giai đoạn thẩm định trước khi ký thỏa thuận nguyên tắc",
          "Giai đoạn xin phê duyệt từ cơ quan quản lý cạnh tranh"
        ],
        "correct": 0,
        "explanation": "Đàm phán diễn ra giữa vài người và có phiên dịch. Tích hợp diễn ra giữa hàng nghìn người mỗi ngày - và đó là lúc khác biệt về cách ra quyết định, giờ giấc, thứ bậc bắt đầu ăn vào kết quả."
      }
    ]
  }),
  "danh-gia-du-an-npv-irr": patch({
    "quiz": [
      {
        "question": "NPV và IRR của một dự án đôi khi đưa ra kết luận trái ngược nhau khi so sánh giữa nhiều dự án loại trừ lẫn nhau (chỉ chọn một). Trong trường hợp đó, nên ưu tiên chỉ số nào?",
        "options": [
          "NPV, vì nó đo trực tiếp giá trị tạo ra bằng tiền",
          "IRR, vì nó cho biết tỷ suất sinh lời của dự án đó",
          "Payback, vì nó cho biết bao lâu thu hồi được vốn",
          "Cả ba đều tương đương nên chọn cái nào cũng được"
        ],
        "correct": 0,
        "explanation": "NPV đo giá trị tuyệt đối tạo ra (bằng tiền), còn IRR đo tỷ suất sinh lời (phần trăm) và có thể gây hiểu lầm khi so sánh các dự án có quy mô vốn khác nhau - một dự án IRR 40% trên vốn 1 triệu USD tạo ra ít giá trị hơn một dự án IRR 15% trên vốn 100 triệu USD. Vì mục tiêu doanh nghiệp là tối đa hóa giá trị (bằng tiền), NPV là chỉ số nên ưu tiên khi hai chỉ số mâu thuẫn."
      },
      {
        "question": "Payback Period = 3,2 năm cho dự án trên có ý nghĩa gì, và tại sao không nên dùng một mình để ra quyết định đầu tư?",
        "options": [
          "Chỉ đo tốc độ thu hồi vốn, bỏ qua dòng tiền sau đó",
          "Đo tỷ suất sinh lời bình quân trong 3,2 năm đầu tiên",
          "Cho biết dự án tạo ra bao nhiêu giá trị sau 3,2 năm",
          "Là thời điểm dự án bắt đầu có lợi nhuận kế toán dương"
        ],
        "correct": 0,
        "explanation": "Payback Period chỉ trả lời câu hỏi \"bao lâu thì lấy lại vốn\", không chiết khấu dòng tiền về hiện tại (bỏ qua time value of money) và hoàn toàn bỏ qua giá trị các dòng tiền phát sinh sau mốc hoàn vốn - hai dự án cùng payback 3,2 năm nhưng một dự án còn tạo dòng tiền lớn ở năm 4-5, một dự án dừng lại, sẽ có NPV rất khác nhau dù payback giống hệt."
      },
      {
        "question": "Dự án A cần 10 tỷ, IRR 40%, giá trị hiện tại ròng 3 tỷ. Dự án B cần 100 tỷ, IRR 18%, giá trị hiện tại ròng 12 tỷ. Chỉ chọn được một và doanh nghiệp đủ vốn. Nên chọn gì?",
        "options": [
          "Dự án B, vì làm tăng giá trị thêm 12 tỷ thay vì 3 tỷ",
          "Dự án A, vì IRR 40% cao hơn nhiều so với dự án B",
          "Dự án A, vì cần ít vốn hơn nên rủi ro cũng thấp hơn",
          "Không chọn dự án nào vì chưa biết thời gian hoàn vốn"
        ],
        "correct": 0,
        "explanation": "Mục tiêu là tối đa hóa giá trị tuyệt đối, không phải tối đa hóa tỷ suất phần trăm. Khi hai chỉ số mâu thuẫn ở các dự án loại trừ nhau, giá trị hiện tại ròng là chỉ số quyết định."
      },
      {
        "question": "Vì sao thời gian hoàn vốn không nên dùng một mình để quyết định đầu tư?",
        "options": [
          "Vì nó bỏ qua giá trị thời gian và dòng tiền sau mốc",
          "Vì nó luôn cho kết quả trái ngược với chỉ số NPV",
          "Vì nó chỉ áp dụng được cho dự án dưới năm năm",
          "Vì nó không tính được nếu dòng tiền đổi dấu"
        ],
        "correct": 0,
        "explanation": "Một dự án hoàn vốn nhanh rồi hết dòng tiền có thể kém hơn nhiều so với dự án hoàn vốn chậm nhưng tạo dòng tiền lớn kéo dài. Chỉ số này hữu ích như một thước đo rủi ro bổ sung, không phải tiêu chí quyết định."
      }
    ,
    {
      "question": "Dòng tiền của một dự án đổi dấu nhiều lần qua các năm. Điều này gây vấn đề gì cho IRR?",
      "options": [
        "Phương trình có thể có nhiều nghiệm nên IRR không còn duy nhất",
        "IRR sẽ luôn thấp hơn WACC nên dự án bị loại một cách sai lầm",
        "IRR không tính được vì công thức yêu cầu dòng tiền phải cùng dấu",
        "IRR chỉ phản ánh đúng phần dòng tiền của những năm đầu tiên"
      ],
      "correct": 0,
      "explanation": "IRR là nghiệm của một đa thức, và số lần đổi dấu quyết định số nghiệm có thể có. Dự án mỏ khoáng sản hay dự án có chi phí hoàn nguyên cuối đời thường rơi vào trường hợp này - lúc đó NPV là thước đo duy nhất còn đọc được."
    }
    ]
  }),





  "dung-mo-hinh-ba-bao-cao-trong-excel": patch({
    "quiz": [
      {
        "question": "Vòng lặp trong mô hình tài chính phát sinh từ đâu?",
        "options": [
          "Từ việc dùng quá nhiều hàm tra cứu lồng nhau",
          "Từ lãi vay: lãi phụ thuộc dư nợ, dư nợ lại phụ thuộc lãi",
          "Từ việc liên kết dữ liệu qua lại giữa quá nhiều sheet trong cùng một file",
          "Từ việc định dạng số không thống nhất giữa các vùng trong cùng bảng tính"
        ],
        "correct": 1,
        "explanation": "Đây là vòng lặp kinh điển và cũng gần như là vòng lặp duy nhất được chấp nhận trong mô hình tài chính. Cách xử lý là bật tính toán lặp trong tùy chọn của Excel, kèm một công tắc để ngắt vòng lặp khi mô hình bị treo."
      },
      {
        "question": "Vì sao nên có công tắc ngắt vòng lặp (circuit breaker)?",
        "options": [
          "Để mô hình tính toán nhanh hơn",
          "Vì chuẩn mực kiểm toán yêu cầu mọi mô hình phải có cơ chế ngắt tính toán",
          "Để đặt lãi vay về 0, phá vòng lặp và tìm được nguyên nhân lỗi",
          "Để giảm dung lượng file bằng cách hạn chế số công thức phải lưu lại"
        ],
        "correct": 2,
        "explanation": "Không có công tắc, một lỗi nhỏ trong vòng lặp sẽ khiến toàn bộ mô hình hiển thị lỗi và bạn không còn thấy được số nào đúng số nào sai. Công tắc là thứ giúp bạn quay lại trạng thái chẩn đoán được."
      },
      {
        "question": "Nguyên tắc đặt công thức giữa các sheet nên như thế nào?",
        "options": [
          "Càng nhiều liên kết chéo càng linh hoạt",
          "Mỗi công thức nên tham chiếu tới ít nhất ba sheet để tận dụng dữ liệu",
          "Dồn toàn bộ mô hình vào một sheet duy nhất để không phải liên kết gì cả",
          "Dữ liệu chảy một chiều, tránh liên kết qua lại giữa hai sheet"
        ],
        "correct": 3,
        "explanation": "Dòng chảy dữ liệu một chiều - từ giả định sang bảng hỗ trợ rồi sang báo cáo - giúp việc dò lỗi trở nên khả thi. Liên kết qua lại giữa hai sheet tạo ra vòng lặp ẩn rất khó tìm."
      },
      {
        "question": "Bảng hỗ trợ (schedule) phục vụ mục đích gì?",
        "options": [
          "Tách logic phức tạp ra khỏi báo cáo chính để kiểm tra độc lập",
          "Chỉ để trình bày mô hình cho đẹp",
          "Lưu trữ bản dự phòng của dữ liệu gốc trong trường hợp mô hình bị lỗi",
          "Thay thế cho báo cáo lưu chuyển tiền tệ trong mô hình dự phóng nhiều năm"
        ],
        "correct": 0,
        "explanation": "Nếu nhồi toàn bộ logic vào báo cáo chính, mỗi ô sẽ chứa một công thức dài không ai kiểm tra nổi. Bảng hỗ trợ giữ cho báo cáo sạch và làm cho từng phần logic có thể được kiểm tra độc lập."
      },
      {
        "question": "Dòng cân đối cuối cùng (plug) trong mô hình thường là gì?",
        "options": [
          "Doanh thu dự phóng năm cuối",
          "Tiền mặt dư thừa hoặc hạn mức vay quay vòng",
          "Vốn chủ sở hữu, chỉnh cho khớp tổng tài sản",
          "Chi phí bán hàng, ước theo tỷ lệ trên doanh thu"
        ],
        "correct": 1,
        "explanation": "Khi doanh nghiệp thừa tiền, phần dư chảy vào tiền mặt. Khi thiếu, mô hình rút hạn mức vay quay vòng. Đây là cơ chế giúp bảng cân đối luôn cân, và cũng là nơi bạn đọc ra doanh nghiệp cần bao nhiêu vốn trong kịch bản đang chạy."
      }
    ]
  }),
  "theo-doi-chi-tieu-truoc-khi-lap-ngan-sach": patch({
    "quiz": [
      {
        "question": "Nhóm chi tiêu nào thường bị ước lượng sai nhiều nhất?",
        "options": [
          "Khoản nhỏ lặp lại nhiều lần trong tháng",
          "Khoản lớn một lần trong năm như học phí",
          "Tiền thuê nhà và hóa đơn cố định hằng tháng",
          "Khoản chuyển khoản cho người thân trong nhà"
        ],
        "correct": 0,
        "explanation": "Tiền thuê nhà thì ai cũng nhớ chính xác vì nó lớn và lặp lại đều. Ba mươi lần chi năm mươi nghìn thì không ai nhớ nổi, nhưng cộng lại vẫn là một triệu rưỡi - và đó thường là chỗ chênh lệch giữa cảm giác và sao kê."
      },
      {
        "question": "Nên theo dõi chi tiêu trong bao lâu trước khi lập ngân sách?",
        "options": [
          "Đủ dài để bao một chu kỳ chi tiêu, thường vài tuần",
          "Đúng một ngày, vì thói quen chi tiêu lặp lại giống nhau",
          "Tối thiểu ba năm để có dữ liệu đủ tin cậy về xu hướng",
          "Không cần theo dõi, chỉ xem số dư đầu và cuối tháng"
        ],
        "correct": 0,
        "explanation": "Một ngày quá ngắn để thấy quy luật, ba năm thì bạn đã bỏ cuộc từ lâu. Điều quan trọng là bao được các khoản chỉ xuất hiện một lần mỗi tháng như hóa đơn và tiền nhà, nên vài tuần là mốc thực tế."
      },
      {
        "question": "Xem số dư đầu tháng và cuối tháng có thay thế được việc ghi chép không?",
        "options": [
          "Không, vì nó không cho biết tiền đi vào đâu",
          "Có, vì chênh lệch số dư chính là tổng chi tiêu",
          "Có, nếu bạn chỉ chuyển khoản chứ không dùng tiền mặt",
          "Không, vì số dư không phản ánh đúng thu nhập thật"
        ],
        "correct": 0,
        "explanation": "Biết mình tiêu hết mười lăm triệu không giúp bạn quyết định cắt gì. Ngân sách là bài toán phân bổ, và phân bổ đòi hỏi biết cơ cấu chứ không chỉ biết tổng."
      },
      {
        "question": "Thu nhập 18 triệu, sau bốn tuần ghi chép thấy chi 17,2 triệu. Bước tiếp theo hợp lý nhất?",
        "options": [
          "Xem cơ cấu chi để biết cắt được ở đâu trước đã",
          "Đặt ngay mục tiêu tiết kiệm 20% theo quy tắc chuẩn",
          "Kết luận thu nhập quá thấp và tìm cách tăng thu nhập",
          "Ngừng ghi chép vì đã biết tổng chi tiêu mỗi tháng"
        ],
        "correct": 0,
        "explanation": "Đặt mục tiêu 20% khi đang tiêu 96% thu nhập là đặt một mục tiêu chắc chắn thất bại. Dữ liệu vừa thu được có giá trị ở chỗ nó chỉ ra nhóm nào phình bất thường - và đó mới là chỗ bắt đầu."
      },
      {
        "question": "Vì sao việc ghi chép tự nó đã làm giảm chi tiêu ở nhiều người?",
        "options": [
          "Vì phải ghi lại biến khoản chi thành quyết định có ý thức",
          "Vì ứng dụng tự động chặn giao dịch vượt hạn mức đã đặt",
          "Vì phía ngân hàng sẽ giảm phí cho những tài khoản có theo dõi chi tiêu",
          "Vì ghi chép mất thời gian nên người ta mua sắm ít đi"
        ],
        "correct": 0,
        "explanation": "Phần lớn chi tiêu nhỏ diễn ra tự động, không qua suy nghĩ. Biết rằng lát nữa mình sẽ phải ghi nó xuống là đủ để một số khoản không xảy ra - hiệu ứng này có thật và nó là phần thưởng kèm theo của việc đo đạc."
      }
    ]
  }),
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
  "index-match-xlookup-va-sumifs": patch({
    "quiz": [
      {
        "question": "MATCH với tham số thứ ba bằng 0 nghĩa là gì?",
        "options": [
          "Tìm khớp chính xác, luôn nên dùng cho dữ liệu dạng mã và tên",
          "Tìm giá trị gần đúng lớn nhất nhưng không vượt quá khóa cần tra cứu",
          "Tìm giá trị gần đúng nhỏ nhất còn lớn hơn khóa",
          "Bỏ qua các ô trống trong vùng khóa trước khi thực hiện phép tra cứu"
        ],
        "correct": 0,
        "explanation": "Chế độ khớp gần đúng đòi hỏi dữ liệu đã được sắp xếp và sẽ trả về kết quả sai một cách im lặng nếu không. Với mã cổ phiếu, mã khách hàng hay tên tài khoản, luôn dùng khớp chính xác."
      },
      {
        "question": "SUMIFS khác SUMIF ở điểm nào?",
        "options": [
          "SUMIFS chạy nhanh hơn nhưng đánh đổi bằng độ chính xác của kết quả cộng",
          "SUMIFS chỉ cộng được các giá trị số nguyên, không xử lý được số thập phân",
          "SUMIFS cho phép lọc theo nhiều điều kiện cùng lúc",
          "Không có khác biệt giữa hai hàm"
        ],
        "correct": 2,
        "explanation": "SUMIFS là hàm tổng hợp được dùng nhiều nhất trong công việc phân tích thực tế, vì dữ liệu kinh doanh gần như luôn cần lọc theo nhiều chiều cùng lúc."
      },
      {
        "question": "Ưu điểm chính của XLOOKUP so với VLOOKUP là gì?",
        "options": [
          "Tự động sắp xếp lại dữ liệu nguồn trước khi thực hiện phép tra cứu",
          "Không cần chỉ định vùng dữ liệu vì hàm tự nhận diện bảng nguồn cần tra",
          "Tra được cả hai chiều, mặc định khớp chính xác, có xử lý lỗi sẵn",
          "Chạy được trên mọi phiên bản Excel"
        ],
        "correct": 2,
        "explanation": "XLOOKUP gộp ưu điểm của INDEX/MATCH vào một cú pháp dễ đọc hơn. Hạn chế duy nhất là nó không có trên các phiên bản Excel cũ, nên INDEX/MATCH vẫn là kỹ năng bắt buộc khi làm việc với file của người khác."
      },
      {
        "question": "Sau khi ghép hai bảng bằng hàm tra cứu, bước kiểm tra bắt buộc là gì?",
        "options": [
          "In cả hai bảng ra rồi đối chiếu bằng mắt",
          "Chuyển toàn bộ công thức thành giá trị tĩnh để kết quả không thay đổi nữa",
          "Sắp xếp lại bảng kết quả theo thứ tự bảng chữ cái của cột khóa tra cứu",
          "Đếm số dòng khớp được và so với tổng số dòng cần khớp"
        ],
        "correct": 3,
        "explanation": "Hàm tra cứu thất bại một cách rất im lặng. Đếm số dòng khớp được là kiểm tra rẻ nhất và bắt được gần như mọi vấn đề về khoảng trắng thừa, sai kiểu dữ liệu hay mã không tồn tại trong bảng nguồn."
      }
    ,
    {
      "question": "Vì sao lỗi do VLOOKUP tham chiếu theo số thứ tự cột lại nguy hiểm hơn lỗi báo #N/A?",
      "options": [
        "Vì công thức vẫn chạy và trả về một con số trông hợp lý",
        "Vì lỗi này làm hỏng toàn bộ các công thức khác trong cùng bảng tính",
        "Vì Excel không có công cụ nào dò được nguồn của lỗi loại này",
        "Vì nó chỉ xuất hiện khi bảng nguồn có nhiều hơn mười cột dữ liệu"
      ],
      "correct": 0,
      "explanation": "Lỗi ồn ào thì được sửa ngay. Lỗi im lặng đi vào mô hình, ra báo cáo, rồi thành cơ sở cho một quyết định - và không ai biết cho tới khi có người tình cờ đối chiếu. Đây là lý do INDEX/MATCH được ưa dùng dù viết dài hơn."
    }
    ]
  }),

  "ky-quy-va-margin-call": patch({
    "quiz": [
      {
        "question": "Margin Ratio là gì?",
        "options": [
          "Tỉ lệ vốn chủ (tiền bạn gửi) so với tổng vốn (tiền bạn + tiền vay)",
          "Tỉ lệ lợi nhuận của giao dịch",
          "Lãi vay",
          "Phí giao dịch"
        ],
        "correct": 0,
        "explanation": "Margin Ratio = (Vốn chủ) / (Tổng vốn). Ví dụ: bạn gửi 100 triệu, vay 100 triệu, tổng 200 triệu → Margin Ratio = 100/200 = 50%. Khi Margin Ratio rơi xuống mức tối thiểu (ví dụ 30%), bạn bị Margin Call."
      },
      {
        "question": "Margin Call là gì?",
        "options": [
          "Gọi điện thoại để hỏi giá cổ phiếu",
          "Cuộc gọi từ công ty chứng khoán để chúc mừng",
          "Yêu cầu khách hàng nộp thêm tiền (hoặc bán cổ phiếu) để duy trì Margin Ratio tối thiểu",
          "Lệnh tự động bán khi giá chạm mức cắt lỗ"
        ],
        "correct": 2,
        "explanation": "Khi cổ phiếu giảm giá, Margin Ratio của bạn giảm theo. Nếu rơi dưới mức tối thiểu (ví dụ 30%), môi giới sẽ Margin Call: bạn phải nộp thêm tiền hoặc bán một phần cổ phiếu để tăng Margin Ratio lên mức an toàn. Nếu không, môi giới sẽ tự bán cổ phiếu của bạn (Force Sell)."
      },
      {
        "question": "Nếu bạn gửi 100M, vay 100M, mua 200M cổ phiếu. Cổ phiếu giảm 50% (còn 100M), margin ratio bây giờ là bao nhiêu?",
        "options": [
          "100% (200M / 200M)",
          "25% (100M / 400M), lấy tổng giá trị mua ban đầu làm mẫu số",
          "50% (100M / 200M), vốn chủ trên tổng tài sản hiện tại",
          "0% vì tất cả đã mất"
        ],
        "correct": 2,
        "explanation": "Ban đầu: vốn chủ = 100M, tổng vốn = 200M (100M vốn + 100M vay), margin ratio = 50%. Sau khi giảm 50%: tài sản = 100M, nhưng nợ = 100M (vay không đổi), vốn chủ = 100M - 100M = 0. Margin ratio = 0 / 100M = 0% → bị margin call ngay!"
      },
      {
        "question": "Danh mục 1 tỷ với 500 triệu vay ký quỹ. Nếu danh mục giảm 30%, vốn tự có của nhà đầu tư giảm bao nhiêu phần trăm?",
        "options": [
          "50%",
          "30%, tương ứng mức giảm của thị trường",
          "15%",
          "60%, từ 500 triệu xuống 200 triệu"
        ],
        "correct": 3,
        "explanation": "Giá trị danh mục còn 700 triệu, nợ vẫn 500 triệu, nên vốn tự có còn 200 triệu. Đòn bẩy hai lần khuếch đại mức giảm 30% thành 60% - và cơ chế này chạy y hệt ở chiều tăng."
      },
      {
        "question": "Vì sao các phiên giảm mạnh thường giảm gấp gáp hơn về cuối phiên?",
        "options": [
          "Vì lệnh bán giải chấp từ các tài khoản ký quỹ tạo thêm lực bán, đẩy giá xuống và kích hoạt tiếp các tài khoản khác",
          "Vì nhà đầu tư nước ngoài chỉ giao dịch cuối phiên",
          "Vì thanh khoản luôn cao nhất vào cuối phiên",
          "Vì công ty chứng khoán chỉ khớp lệnh vào cuối ngày"
        ],
        "correct": 0,
        "explanation": "Đây là vòng phản hồi tự khuếch đại: giá giảm gây giải chấp, giải chấp tạo lực bán, lực bán làm giá giảm tiếp. Hiểu cơ chế này giải thích vì sao đòn bẩy nguy hiểm nhất đúng lúc thị trường biến động mạnh."
      }
    ]
  }),
  "sql-co-ban-cho-dan-tai-chinh": patch({
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
        "explanation": "Muốn lọc các giao dịch của năm 2025 thì dùng WHERE. Muốn chỉ lấy những chi nhánh có tổng doanh thu trên 10 tỷ thì dùng HAVING, vì điều kiện đó chỉ tồn tại sau khi đã gom nhóm và tính tổng."
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
        "explanation": "Đây là phân biệt quan trọng bậc nhất trong thực tế. Dùng INNER JOIN khi ghép danh mục với dữ liệu giá sẽ âm thầm làm biến mất các mã không có giá, khiến tổng danh mục bị thiếu mà bạn không hề biết."
      },
      {
        "question": "Vì sao SQL phù hợp hơn bảng tính khi dữ liệu lớn?",
        "options": [
          "Vì SQL có sẵn nhiều hàm tài chính chuyên dụng hơn so với bảng tính",
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
