// `patch` không làm gì - nó chỉ đặt tên cho hình dạng của một entry, để chỗ
// này đọc ra là "vá lên bài học" chứ không phải "định nghĩa bài học".
//
// Hai hàm dựng `d(...)` và `q(...)` từng ở đây đã được gỡ: chúng không còn
// chỗ gọi nào, và một hàm dựng `diagram`/`quiz` nằm sẵn trong file này là lời
// mời viết nội dung dạy vào đây - đúng cái bẫy mà lesson-override-shadowing
// vừa được dọn.
const patch = (lesson) => lesson;

export const lessonOverrides = {
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
