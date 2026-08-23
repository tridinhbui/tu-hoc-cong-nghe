// `patch` không làm gì - nó chỉ đặt tên cho hình dạng của một entry, để chỗ
// này đọc ra là "vá lên bài học" chứ không phải "định nghĩa bài học".
//
// Hai hàm dựng `d(...)` và `q(...)` từng ở đây đã được gỡ: chúng không còn
// chỗ gọi nào, và một hàm dựng `diagram`/`quiz` nằm sẵn trong file này là lời
// mời viết nội dung dạy vào đây - đúng cái bẫy mà lesson-override-shadowing
// vừa được dọn.
const patch = (lesson) => lesson;

export const lessonOverrides = {
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
          "Lạm phát kỳ vọng hạn của trái phiếu là 7% mỗi năm"
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
          "Tính lại VaR với mức tin cậy cao hơn"
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
