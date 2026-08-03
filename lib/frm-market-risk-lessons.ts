import type { Lesson } from "./lesson-types";

// Chặng "FRM: Rủi ro thị trường" (ids 1551-1556, professional track).
//
// Market Risk Measurement and Management chiếm 20% FRM Part II nhưng trước
// chặng này chỉ có 5 bài, và cả 5 đều là bài mượn từ nơi khác: VaR nhập môn,
// duration/convexity, Greeks, độ biến động hàm ý. Phần lõi định lượng mà GARP
// thực sự kiểm tra - so sánh ba phương pháp VaR, kiểm định hậu nghiệm, tính
// nhất quán của thước đo rủi ro, mô hình hoá độ biến động, cấu trúc phụ thuộc
// đuôi - không có bài nào.
//
// Sáu bài dưới đây tiếp nối chứ không lặp lại bài 1217 (VaR là gì): bài đó
// định nghĩa VaR, chặng này hỏi VaR được tính bằng cách nào, sai ở đâu, và
// vì sao Basel đã chuyển sang thước đo khác.

export const FRM_MARKET_RISK_LESSONS: Lesson[] = [
  {
    id: 1551,
    slug: "ba-cach-tinh-var-va-danh-doi-cua-tung-cach",
    title: "Rủi ro TT, Bài 1: Ba cách tính VaR - và cái giá phải trả của từng cách",
    subtitle: "Mô phỏng lịch sử, tham số và Monte Carlo: giả định nào bị vi phạm, và điều đó làm sai lệch con số theo hướng nào",
    duration: "12 phút",
    difficulty: "Khó",
    emoji: "📉",
    track: "professional",
    whyItMatters:
      "Cùng một danh mục, ba phương pháp cho ba con số VaR khác nhau, đôi khi lệch nhau vài chục phần trăm. Biết phương pháp nào đang được dùng và giả định nào của nó đang bị vi phạm là điều tách người đọc báo cáo rủi ro với người chỉ nhìn con số cuối.",
    openingQuestion:
      "VaR tham số giả định lợi suất phân phối chuẩn. Trong khủng hoảng, giả định đó làm con số sai theo hướng nào?",
    openingOptions: [
      "Sai cao hơn thực tế, vì phân phối chuẩn phóng đại biến động",
      "Sai thấp hơn thực tế, vì phân phối chuẩn có đuôi mỏng hơn lợi suất thật nên đánh giá nhẹ các cú sốc lớn",
      "Không sai, vì định lý giới hạn trung tâm bảo đảm tính chuẩn",
      "Sai theo hướng ngẫu nhiên, không dự đoán được",
    ],
    correctOption: 1,
    explanation:
      "Đây là lỗi nguy hiểm vì nó lệch có hệ thống về một phía. Lợi suất tài sản tài chính có đuôi dày hơn phân phối chuẩn - các cú sốc cực đoan xảy ra thường xuyên hơn nhiều so với mức phân phối chuẩn dự báo. Dùng phân phối chuẩn nghĩa là mô hình đánh giá thấp đúng những ngày mà rủi ro thực sự quan trọng. Con số VaR trông yên tâm nhất chính vào lúc nó đáng tin cậy ít nhất, và đó là lý do bài 1421 ở chặng Định lượng mở đầu bằng chuyện đuôi luôn dày hơn ta nghĩ.",
    diagram: [
      { label: "Mô phỏng lịch sử: không giả định phân phối", arrow: true },
      { label: "Tham số: giả định chuẩn, tính nhanh", arrow: true },
      { label: "Monte Carlo: tự chọn phân phối, tốn máy", arrow: true },
      { label: "Ba con số khác nhau trên cùng danh mục" },
    ],
    interactiveType: "chart",
    realWorldExample: {
      company: "Vì sao mô phỏng lịch sử im lặng trước một cú sốc chưa từng có",
      description:
        "Mô phỏng lịch sử xếp lại toàn bộ lợi suất quá khứ và lấy phân vị - không giả định gì về hình dạng phân phối, đó là điểm mạnh của nó. Nhưng nó cũng chỉ biết những gì đã xảy ra trong cửa sổ dữ liệu. Một danh mục dùng cửa sổ 250 ngày trong giai đoạn thị trường yên ả sẽ cho VaR rất thấp, đúng đến ngày một biến cố chưa từng có trong 250 ngày đó xảy ra. Mô hình không sai về mặt tính toán; nó chỉ trả lời đúng một câu hỏi khác với câu hỏi người dùng tưởng mình đang hỏi.",
    },
    quiz: [
      {
        question: "Điểm mạnh cốt lõi của phương pháp mô phỏng lịch sử là gì?",
        options: [
          "Nó không cần giả định lợi suất tuân theo bất kỳ dạng phân phối lý thuyết nào",
          "Nó cho kết quả nhanh hơn hẳn hai phương pháp còn lại vì chỉ cần một phép nhân ma trận",
          "Nó dự báo được cả những biến cố chưa từng xuất hiện trong dữ liệu quá khứ của danh mục",
          "Nó luôn cho con số thận trọng hơn so với phương pháp tham số trong mọi điều kiện thị trường",
        ],
        correct: 0,
        explanation:
          "Đổi lại, nó bị giới hạn hoàn toàn trong cửa sổ dữ liệu: biến cố chưa từng xảy ra thì mô hình không có cách nào biết tới.",
      },
      {
        question: "Phương pháp Monte Carlo khác mô phỏng lịch sử ở điểm nào?",
        options: [
          "Nó sinh ra các kịch bản từ một phân phối do người dùng chọn, thay vì lấy lại đúng dữ liệu đã xảy ra",
          "Nó chỉ áp dụng được cho danh mục gồm các công cụ phái sinh chứ không dùng cho cổ phiếu thường",
          "Nó bỏ qua hoàn toàn dữ liệu lịch sử và chỉ dựa trên phán đoán chủ quan của chính người quản trị rủi ro",
          "Nó cho ra một con số duy nhất chứ không phải một phân phối các kết quả có thể xảy ra được",
        ],
        correct: 0,
        explanation:
          "Sự linh hoạt đó là con dao hai lưỡi: bạn mô hình hoá được đuôi dày và quan hệ phi tuyến, nhưng kết quả chỉ tốt bằng phân phối bạn đã chọn.",
      },
      {
        question: "Vì sao VaR tham số vẫn được dùng rộng rãi dù giả định của nó bị vi phạm?",
        options: [
          "Vì nó rẻ về mặt tính toán và đủ dùng cho danh mục tuyến tính trong điều kiện thị trường bình thường",
          "Vì các cơ quan quản lý ngân hàng bắt buộc phải dùng phương pháp này cho báo cáo vốn định kỳ",
          "Vì nó là phương pháp duy nhất xử lý được danh mục có chứa quyền chọn và những sản phẩm phi tuyến khác",
          "Vì độ chính xác của nó đã được chứng minh là cao hơn hai phương pháp còn lại trên thực nghiệm",
        ],
        correct: 0,
        explanation:
          "Nó chỉ cần ma trận hiệp phương sai, nên chạy được cho danh mục hàng nghìn vị thế trong vài giây. Vấn đề xuất hiện đúng lúc thị trường thôi bình thường.",
      },
      {
        question: "Cửa sổ dữ liệu dài hơn ảnh hưởng thế nào tới VaR mô phỏng lịch sử?",
        options: [
          "Con số ổn định hơn nhưng phản ứng chậm hơn khi chế độ biến động của thị trường vừa thay đổi",
          "Con số vừa ổn định hơn vừa nhạy hơn với thay đổi gần đây nên luôn là lựa chọn tốt hơn",
          "Không ảnh hưởng gì, vì phân vị được tính trên tỷ lệ phần trăm chứ không trên số quan sát",
          "Con số biến động mạnh hơn vì có thêm nhiều giá trị cực đoan từ các giai đoạn khủng hoảng cũ",
        ],
        correct: 0,
        explanation:
          "Đây là đánh đổi không có lời giải đúng tuyệt đối, và là lý do bài sau về EWMA tồn tại: gán trọng số giảm dần cho dữ liệu cũ là một cách thoát khỏi lựa chọn nhị phân này.",
      },
    
    {
      "question": "Cửa sổ dữ liệu dài hơn ảnh hưởng thế nào tới VaR tính bằng mô phỏng lịch sử?",
      "options": [
        "Ước lượng ổn định hơn nhưng phản ứng chậm hơn với biến động mới",
        "Ước lượng nhạy hơn với các cú sốc vừa xảy ra trong thị trường",
        "Ước lượng luôn cho ra mức rủi ro cao hơn so với cửa sổ ngắn",
        "Ước lượng không đổi vì mô phỏng lịch sử không phụ thuộc độ dài cửa sổ"
      ],
      "correct": 0,
      "explanation": "Đây là đánh đổi cơ bản của mọi ước lượng dựa trên cửa sổ trượt. Cửa sổ dài làm con số ít nhảy nhưng cũng làm mô hình chậm nhận ra thị trường vừa đổi chế độ - và cửa sổ ngắn thì ngược lại, nhạy nhưng ồn."
    }
    ],
    keyTakeaways: [
      "Ba phương pháp cho ba con số khác nhau trên cùng một danh mục - phải biết đang dùng cái nào",
      "Tham số giả định phân phối chuẩn, nên đánh giá thấp rủi ro đúng vào lúc rủi ro quan trọng nhất",
      "Mô phỏng lịch sử không giả định phân phối, nhưng mù với biến cố ngoài cửa sổ dữ liệu",
      "Monte Carlo linh hoạt nhất, và kết quả chỉ tốt bằng phân phối được chọn",
      "Cửa sổ dài thì ổn định nhưng chậm phản ứng; cửa sổ ngắn thì ngược lại",
    ],
    practicePrompt: {
      question:
        "Danh mục có nhiều quyền chọn. Phương pháp VaR nào kém phù hợp nhất và vì sao?",
      options: [
        "Mô phỏng lịch sử, vì dữ liệu quyền chọn thường không đủ dài",
        "Tham số, vì nó giả định quan hệ tuyến tính giữa giá tài sản cơ sở và giá trị danh mục",
        "Monte Carlo, vì chi phí tính toán quá lớn",
        "Cả ba đều phù hợp như nhau",
      ],
      correct: 1,
      explanation:
        "Quyền chọn có payoff cong: khi giá tài sản cơ sở đổi nhiều, giá trị vị thế không đổi theo tỷ lệ. Phương pháp tham số xấp xỉ danh mục bằng một quan hệ tuyến tính - về bản chất là chỉ dùng delta - nên nó bỏ sót đúng phần cong đó, và phần cong lại lớn nhất ở các mức biến động lớn, tức chính vùng VaR đang muốn đo. Chi phí tính toán của Monte Carlo là có thật nhưng đó là vấn đề nguồn lực, không phải sai lệch phương pháp.",
    },
    summary: {
      keyIdea: "Không có phương pháp VaR đúng, chỉ có phương pháp mà bạn biết rõ nó sai ở đâu",
      commonMistake: "So sánh VaR giữa hai đơn vị mà không kiểm tra họ dùng phương pháp và cửa sổ nào",
      action: "Với một báo cáo rủi ro bạn tiếp cận được, tìm xem VaR trong đó tính bằng phương pháp nào và cửa sổ bao nhiêu ngày.",
    },
    application: {
      title: "Việc cần làm",
      message:
        "Lấy chuỗi lợi suất một năm của một cổ phiếu, tính VaR 99% một ngày theo hai cách: phân vị 1% của dữ liệu thực tế, và 2,33 nhân độ lệch chuẩn. So hai con số - chênh lệch chính là phần mà giả định phân phối chuẩn đang bỏ sót.",
      secondary: "Làm lại với dữ liệu giai đoạn thị trường biến động mạnh, khoảng cách sẽ rộng ra rõ rệt.",
    },
    sections: [
      {
        type: "lead",
        text: "Bài 1217 đã trả lời VaR là gì. Chặng này bắt đầu ở câu hỏi tiếp theo, và là câu hỏi GARP thực sự kiểm tra: con số đó được tính ra bằng cách nào, và cách đó sai ở đâu.",
      },
      {
        type: "heading",
        text: "Ba phương pháp, ba kiểu sai",
      },
      {
        type: "conceptTable",
        title: "So sánh ba cách tính VaR",
        subtitle: "Không cách nào đúng tuyệt đối - chọn cách mà điểm yếu của nó ít ảnh hưởng tới danh mục của bạn",
        concepts: [
          { vi: "Mô phỏng lịch sử", en: "Historical simulation", def: "Sắp xếp lợi suất quá khứ, lấy phân vị. Không giả định phân phối, xử lý được phi tuyến. Mù hoàn toàn với biến cố ngoài cửa sổ dữ liệu." },
          { vi: "Tham số", en: "Parametric / variance-covariance", def: "Giả định phân phối chuẩn, chỉ cần độ lệch chuẩn và tương quan. Rất nhanh. Sai có hệ thống ở đuôi, và xấp xỉ tuyến tính nên hỏng với quyền chọn." },
          { vi: "Monte Carlo", en: "Monte Carlo simulation", def: "Sinh hàng chục nghìn kịch bản từ phân phối tự chọn. Linh hoạt nhất, xử lý được đuôi dày và phi tuyến. Tốn tính toán, và phụ thuộc hoàn toàn vào phân phối đã chọn." },
        ],
      },
      {
        type: "callout",
        label: "Ba con số, một danh mục",
        text: "Điều làm người mới bối rối nhất là ba phương pháp không hội tụ về một đáp án. Chúng trả lời ba câu hỏi hơi khác nhau: lịch sử hỏi nếu ngày mai giống một ngày nào đó trong quá khứ thì sao, tham số hỏi nếu thế giới phân phối chuẩn thì sao, Monte Carlo hỏi nếu thế giới giống mô hình tôi vừa dựng thì sao. Khi hai đơn vị báo VaR chênh nhau, câu hỏi đầu tiên không phải ai đúng mà là hai bên đang tính bằng cách nào.",
      },
      {
        type: "closing",
        lines: [
          "VaR không phải một con số, nó là một con số cộng với phương pháp và cửa sổ đã tạo ra nó.",
          "Bài sau hỏi câu mà mọi mô hình phải trả lời được: làm sao biết nó đúng.",
        ],
      },
    ],
  },
  {
    id: 1552,
    slug: "kiem-dinh-hau-nghiem-var-backtesting",
    title: "Rủi ro TT, Bài 2: Kiểm định hậu nghiệm VaR - đếm số lần mô hình sai",
    subtitle: "Số vi phạm kỳ vọng, kiểm định Kupiec, hệ đèn giao thông của Basel và bẫy cụm vi phạm",
    duration: "11 phút",
    difficulty: "Khó",
    emoji: "🚦",
    track: "professional",
    whyItMatters:
      "Một mô hình VaR không kiểm định hậu nghiệm là một lời khẳng định không có bằng chứng. Đây cũng là chỗ cơ quan quản lý can thiệp trực tiếp: số lần vi phạm quyết định hệ số nhân vốn của ngân hàng, nên nó có hậu quả bằng tiền thật.",
    openingQuestion:
      "VaR 99% một ngày. Trong 250 ngày giao dịch, bao nhiêu lần lỗ vượt VaR là bình thường?",
    openingOptions: [
      "Không lần nào - vượt VaR nghĩa là mô hình sai",
      "Khoảng 2 đến 3 lần, vì 1% của 250 ngày là 2,5",
      "Khoảng 25 lần",
      "Không xác định được nếu chưa biết quy mô danh mục",
    ],
    correctOption: 1,
    explanation:
      "Đây là hiểu lầm phổ biến nhất về VaR. Mức 99% có nghĩa là mô hình dự kiến bị vượt 1% số ngày - tức khoảng 2 đến 3 lần mỗi 250 ngày giao dịch. Không có lần vượt nào không phải dấu hiệu tốt mà là dấu hiệu mô hình quá thận trọng, và một ngân hàng đang giữ quá nhiều vốn cho rủi ro không tồn tại. Quá nhiều lần vượt thì mô hình đánh giá thấp rủi ro. Kiểm định hậu nghiệm là việc so số vi phạm thực tế với số kỳ vọng và hỏi chênh lệch này có lớn hơn mức ngẫu nhiên cho phép hay không.",
    diagram: [
      { label: "Đếm số ngày lỗ vượt VaR", arrow: true },
      { label: "So với số kỳ vọng: 1% × số ngày", arrow: true },
      { label: "Kiểm định Kupiec: chênh có ý nghĩa?", arrow: true },
      { label: "Vi phạm có bị dồn cụm không?" },
    ],
    interactiveType: "chart",
    realWorldExample: {
      company: "Hệ đèn giao thông và hệ số nhân vốn",
      description:
        "Khung Basel phân loại kết quả kiểm định hậu nghiệm thành ba vùng theo số lần vượt trong 250 ngày: vùng xanh chấp nhận được, vùng vàng cần giải trình, vùng đỏ buộc phải sửa mô hình. Điểm quan trọng là hệ quả không dừng ở lời nhắc nhở - số lần vượt càng nhiều thì hệ số nhân áp lên yêu cầu vốn càng cao, nghĩa là ngân hàng phải giữ nhiều vốn hơn cho cùng một danh mục. Đây là một trong số ít chỗ mà chất lượng một mô hình thống kê được quy đổi trực tiếp thành chi phí vốn.",
    },
    quiz: [
      {
        question: "Không có lần vượt VaR nào trong một năm nói lên điều gì?",
        options: [
          "Mô hình có thể đang quá thận trọng, khiến đơn vị giữ vốn cho rủi ro không thực sự tồn tại",
          "Mô hình đang hoạt động hoàn hảo và không cần điều chỉnh gì thêm trong kỳ đánh giá tới",
          "Danh mục đã được phòng hộ hoàn toàn nên không còn phải chịu bất kỳ rủi ro thị trường nào nữa",
          "Dữ liệu đầu vào của mô hình chắc chắn đã bị lỗi trong quá trình thu thập và xử lý",
        ],
        correct: 0,
        explanation:
          "Vốn là nguồn lực có chi phí. Một mô hình quá thận trọng không an toàn hơn, nó chỉ đắt hơn - và trong kiểm định hậu nghiệm thì nó cũng là một dạng sai lệch cần sửa.",
      },
      {
        question: "Kiểm định Kupiec trả lời câu hỏi gì?",
        options: [
          "Số vi phạm quan sát được có lệch khỏi số kỳ vọng nhiều hơn mức ngẫu nhiên cho phép không",
          "Các vi phạm có xu hướng xuất hiện liên tiếp gần nhau trong cùng một giai đoạn hay không",
          "Mức lỗ trung bình trong những ngày vượt ngưỡng VaR là bao nhiêu so với chính ngưỡng đó",
          "Mô hình VaR nào trong ba phương pháp cho kết quả gần với thực tế nhất trên cùng danh mục",
        ],
        correct: 0,
        explanation:
          "Đây là kiểm định về tần suất, và nó chỉ nhìn tổng số lần vượt. Nó hoàn toàn không quan tâm các lần vượt đó rơi vào lúc nào.",
      },
      {
        question: "Vì sao vi phạm dồn thành cụm lại đáng lo hơn vi phạm rải đều?",
        options: [
          "Vì nó cho thấy mô hình không bắt kịp khi chế độ biến động thay đổi, chứ không chỉ sai ngẫu nhiên",
          "Vì các vi phạm liên tiếp luôn có mức lỗ lớn hơn so với những vi phạm xảy ra riêng lẻ",
          "Vì khung Basel chỉ đếm các vi phạm xảy ra liên tiếp nhau khi xác định hệ số nhân vốn được áp dụng",
          "Vì vi phạm rải đều là hiện tượng bình thường còn vi phạm thành cụm là dấu hiệu gian lận",
        ],
        correct: 0,
        explanation:
          "Đúng số vi phạm nhưng dồn hết vào hai tuần khủng hoảng nghĩa là mô hình chỉ đúng khi thị trường yên - tức là sai đúng lúc cần nó nhất.",
      },
      {
        question: "Vì sao kiểm định hậu nghiệm dùng lỗ giả định thay vì lỗ thực tế của ngày đó?",
        options: [
          "Vì lỗ thực tế còn chứa kết quả giao dịch trong ngày và phí, không phản ánh riêng rủi ro của vị thế đầu ngày",
          "Vì lỗ thực tế chỉ được chốt sau khi kết thúc kỳ kế toán nên không có sẵn để kiểm định hằng ngày",
          "Vì lỗ giả định luôn lớn hơn lỗ thực tế nên cho ra kết quả kiểm định thận trọng hơn về vốn",
          "Vì cơ quan quản lý không cho phép sử dụng số liệu lãi lỗ thực tế cho mục đích kiểm định mô hình nội bộ của ngân hàng",
        ],
        correct: 0,
        explanation:
          "VaR đo rủi ro của danh mục đầu ngày nếu giữ nguyên. Trộn kết quả giao dịch trong ngày vào sẽ kiểm định lẫn lộn hai thứ khác nhau.",
      },
    
    {
      "question": "Vì sao kiểm định hậu nghiệm dùng lỗ giả định trên danh mục giữ nguyên thay vì lỗ thực tế trong ngày?",
      "options": [
        "Vì lỗ thực tế còn chứa kết quả giao dịch trong ngày, không phải rủi ro mô hình đo",
        "Vì lỗ thực tế chỉ được xác định sau khi kết thúc kỳ báo cáo tài chính",
        "Vì cơ quan quản lý không cho phép sử dụng số liệu lỗ thực tế của ngân hàng",
        "Vì lỗ giả định luôn lớn hơn nên cho kết quả kiểm định thận trọng hơn"
      ],
      "correct": 0,
      "explanation": "VaR dự báo cho danh mục đầu ngày. Nếu người giao dịch mua bán suốt phiên, lỗ cuối ngày phản ánh cả quyết định đó lẫn biến động thị trường - trộn hai thứ vào thì không còn kiểm định được bản thân mô hình nữa."
    }
    ],
    keyTakeaways: [
      "VaR 99% dự kiến bị vượt khoảng 2-3 lần mỗi 250 ngày - không vượt lần nào cũng là một vấn đề",
      "Kupiec kiểm định tần suất: số vi phạm có lệch quá mức ngẫu nhiên không",
      "Vi phạm dồn cụm nguy hiểm hơn vi phạm rải đều, dù cùng tổng số",
      "Basel quy đổi kết quả kiểm định thành hệ số nhân vốn - có hậu quả bằng tiền",
      "Dùng lỗ giả định trên danh mục đầu ngày, không dùng lỗ thực tế có lẫn giao dịch trong ngày",
    ],
    practicePrompt: {
      question:
        "Mô hình VaR 99% có 3 lần vượt trong 250 ngày, nhưng cả 3 rơi vào cùng một tuần. Kết luận gì?",
      options: [
        "Mô hình đạt yêu cầu, vì 3 lần nằm trong khoảng kỳ vọng",
        "Tần suất đạt nhưng phân bố không đạt: cụm vi phạm cho thấy mô hình không bắt kịp khi biến động tăng",
        "Mô hình quá thận trọng",
        "Cần tăng cửa sổ dữ liệu lên 500 ngày",
      ],
      correct: 1,
      explanation:
        "Đây chính là lý do kiểm định tần suất kiểu Kupiec là điều kiện cần chứ không đủ. Ba lần vượt trên 250 ngày hoàn toàn bình thường về số lượng, nhưng dồn vào một tuần nghĩa là mô hình không phản ứng khi chế độ biến động đổi - nó cho con số thấp suốt giai đoạn yên ả rồi tiếp tục cho con số thấp trong lúc thị trường đã chuyển động. Bài sau về EWMA và GARCH tồn tại đúng để xử lý điểm này.",
    },
    summary: {
      keyIdea: "Mô hình rủi ro phải chứng minh được nó đúng, và bằng chứng là số lần nó sai",
      commonMistake: "Coi việc không có lần vượt nào là dấu hiệu mô hình tốt",
      action: "Với một chuỗi VaR và lợi suất thực tế, đếm số lần vượt và vẽ chúng theo thời gian để xem có dồn cụm không.",
    },
    application: {
      title: "Việc cần làm",
      message:
        "Lấy chuỗi lợi suất hai năm, tính VaR 99% cuộn theo cửa sổ 250 ngày, rồi đánh dấu mọi ngày lỗ vượt VaR. Đếm tổng số và vẽ vị trí của chúng trên trục thời gian. So số đếm được với con số kỳ vọng 1%.",
      secondary: "Nếu các dấu tụ lại quanh một vài giai đoạn, bạn vừa tự tay tái tạo được lý do Basel không chỉ đếm tần suất.",
    },
    sections: [
      {
        type: "lead",
        text: "Mọi mô hình đều đưa ra một lời khẳng định về tương lai. Kiểm định hậu nghiệm là cơ chế duy nhất buộc lời khẳng định đó phải đối mặt với thực tế đã xảy ra.",
      },
      {
        type: "heading",
        text: "Hai câu hỏi, không phải một",
      },
      {
        type: "comparison",
        left: {
          label: "Tần suất đúng chưa",
          text: "Số lần vượt có gần với mức kỳ vọng không. Kiểm định Kupiec trả lời câu này. Quá nhiều thì mô hình đánh giá thấp rủi ro; quá ít thì nó đang bắt đơn vị giữ vốn thừa.",
        },
        right: {
          label: "Phân bố đúng chưa",
          text: "Các lần vượt có độc lập với nhau không, hay dồn thành cụm. Cụm vi phạm là dấu hiệu mô hình không cập nhật kịp khi chế độ biến động thay đổi - đúng lúc nó cần đúng nhất.",
        },
      },
      {
        type: "callout",
        label: "Vì sao dùng lỗ giả định",
        text: "Kiểm định hậu nghiệm không so VaR với lãi lỗ thực tế của ngày hôm đó, mà với lỗ giả định: giữ nguyên danh mục đầu ngày và định giá lại theo biến động thị trường trong ngày. Lý do là lãi lỗ thực tế còn chứa kết quả mua bán trong ngày, phí và hoa hồng - những thứ VaR không hề đo. Trộn chúng vào sẽ khiến một bàn giao dịch có ngày kinh doanh tốt che lấp một mô hình rủi ro tồi.",
      },
      {
        type: "closing",
        lines: [
          "Một mô hình chưa từng sai chưa chắc tốt - nhiều khả năng nó chỉ đang đắt.",
          "Bài sau nói về nhược điểm mà kiểm định hậu nghiệm không phát hiện được: VaR không cho biết vượt rồi thì lỗ bao nhiêu.",
        ],
      },
    ],
  },
  {
    id: 1553,
    slug: "expected-shortfall-va-thuoc-do-rui-ro-nhat-quan",
    title: "Rủi ro TT, Bài 3: Expected Shortfall - và vì sao Basel bỏ VaR",
    subtitle: "Bốn tính chất của một thước đo rủi ro nhất quán, tính cộng gộp mà VaR vi phạm, và cái giá của ES",
    duration: "12 phút",
    difficulty: "Khó",
    emoji: "⚖️",
    track: "professional",
    whyItMatters:
      "Việc Basel chuyển từ VaR sang Expected Shortfall là thay đổi lớn nhất trong đo lường rủi ro thị trường của thập kỷ, và nó không đến từ sở thích mà từ một lỗi toán học cụ thể của VaR. Hiểu lỗi đó cũng là hiểu vì sao gộp rủi ro giữa các bàn giao dịch có thể cho ra kết quả vô lý.",
    openingQuestion:
      "VaR của danh mục A là 10, của danh mục B là 10. Gộp hai danh mục lại, VaR có thể là bao nhiêu?",
    openingOptions: [
      "Luôn nhỏ hơn hoặc bằng 20, vì đa dạng hoá luôn làm giảm rủi ro",
      "Có thể lớn hơn 20 - VaR không bảo đảm tính cộng gộp, và đó chính là lỗi khiến nó bị thay thế",
      "Luôn đúng bằng 20",
      "Luôn bằng 20 nhân hệ số tương quan",
    ],
    correctOption: 1,
    explanation:
      "Đây là điểm mấu chốt. Một thước đo rủi ro hợp lý phải thoả mãn tính cộng gộp: rủi ro của tổng không lớn hơn tổng các rủi ro, vì gộp danh mục lại thì tệ nhất cũng chỉ là không có lợi ích đa dạng hoá nào. VaR vi phạm được tính chất này với các phân phối có đuôi lệch - hai danh mục trái phiếu riêng lẻ mỗi cái có xác suất vỡ nợ nhỏ hơn 1%, nên VaR 99% của từng cái bằng 0, nhưng gộp lại thì xác suất có ít nhất một vụ vỡ nợ vượt 1% và VaR nhảy vọt. Hệ quả thực tế: chia nhỏ một danh mục có thể làm tổng VaR giảm đi trên giấy tờ mà rủi ro thật không đổi.",
    diagram: [
      { label: "VaR: ngưỡng lỗ ở phân vị", arrow: true },
      { label: "ES: lỗ trung bình khi đã vượt ngưỡng", arrow: true },
      { label: "ES thoả tính cộng gộp, VaR thì không", arrow: true },
      { label: "Đổi lại: ES khó kiểm định hậu nghiệm hơn" },
    ],
    interactiveType: "chart",
    realWorldExample: {
      company: "Hai câu hỏi khác nhau về cùng một cái đuôi",
      description:
        "VaR 99% trả lời: ngưỡng lỗ mà 99% số ngày không vượt qua là bao nhiêu. Expected Shortfall 97,5% trả lời một câu khác: trong những ngày tệ nhất, lỗ trung bình là bao nhiêu. Khác biệt quan trọng khi đuôi phân phối rất dày - hai danh mục có thể có cùng VaR trong khi một cái, mỗi lần vượt ngưỡng, lỗ gấp ba cái kia. VaR không phân biệt được hai danh mục đó vì nó chỉ nhìn đúng một điểm trên phân phối và bỏ qua toàn bộ những gì nằm sau điểm ấy.",
    },
    quiz: [
      {
        question: "Expected Shortfall đo cái gì mà VaR không đo?",
        options: [
          "Mức lỗ trung bình trong các kịch bản đã vượt ngưỡng, tức toàn bộ phần đuôi chứ không phải một điểm",
          "Xác suất xảy ra một khoản lỗ vượt quá ngưỡng đã đặt ra trong suốt khoảng thời gian đang được xét đến",
          "Khoảng thời gian trung bình giữa hai lần danh mục chịu lỗ vượt ngưỡng liên tiếp nhau",
          "Mức vốn tối thiểu mà cơ quan quản lý yêu cầu đơn vị phải nắm giữ cho danh mục đó",
        ],
        correct: 0,
        explanation:
          "Hai danh mục có thể có cùng VaR nhưng ES rất khác nhau, và chênh lệch đó chính là thông tin về độ dày đuôi mà VaR vứt bỏ.",
      },
      {
        question: "Tính cộng gộp của một thước đo rủi ro nghĩa là gì?",
        options: [
          "Rủi ro của danh mục gộp không được lớn hơn tổng rủi ro của các danh mục thành phần",
          "Rủi ro của danh mục gộp phải đúng bằng tổng rủi ro của từng danh mục thành phần cộng lại",
          "Rủi ro của danh mục luôn tăng lên theo đúng tỷ lệ với số lượng tài sản có trong danh mục đó",
          "Rủi ro phải được tính riêng cho từng loại tài sản trước khi cộng dồn vào báo cáo tổng hợp",
        ],
        correct: 0,
        explanation:
          "Nó chính là cách phát biểu toán học của ý tưởng đa dạng hoá không bao giờ có hại. Một thước đo vi phạm nó có thể thưởng cho việc chia nhỏ danh mục trên giấy tờ.",
      },
      {
        question: "Hệ quả thực tế của việc VaR vi phạm tính cộng gộp là gì?",
        options: [
          "Chia một danh mục thành nhiều đơn vị nhỏ có thể làm tổng VaR báo cáo giảm mà rủi ro thật không đổi",
          "Con số VaR sẽ luôn nhỏ hơn giá trị thực tế của khoản lỗ lớn nhất có thể xảy ra với danh mục đang xét",
          "Không thể tính được VaR cho những danh mục có chứa nhiều loại tài sản khác nhau cùng lúc",
          "Kết quả VaR sẽ thay đổi mỗi lần tính lại ngay cả khi dữ liệu đầu vào giữ nguyên hoàn toàn",
        ],
        correct: 0,
        explanation:
          "Đây là động cơ lệch lạc rất thực: cấu trúc lại sổ sách để giảm con số báo cáo mà không giảm rủi ro nào cả.",
      },
      {
        question: "Nhược điểm chính của Expected Shortfall so với VaR là gì?",
        options: [
          "Kiểm định hậu nghiệm khó hơn nhiều, vì không còn là phép đếm số lần vượt ngưỡng đơn giản",
          "Nó chỉ áp dụng được cho danh mục cổ phiếu chứ không dùng cho trái phiếu hay phái sinh",
          "Nó luôn cho con số nhỏ hơn VaR nên đánh giá thấp rủi ro của danh mục đang được xét",
          "Nó đòi hỏi giả định lợi suất tuân theo phân phối chuẩn, điều mà VaR không hề yêu cầu",
        ],
        correct: 0,
        explanation:
          "VaR kiểm định dễ vì chỉ cần đếm vượt hay không vượt. ES là một giá trị trung bình có điều kiện, nên kiểm định nó cần nhiều dữ liệu đuôi hơn hẳn - đúng phần dữ liệu vốn khan hiếm nhất.",
      },
    
    {
      "question": "Nhược điểm chính của Expected Shortfall so với VaR là gì?",
      "options": [
        "Nó khó kiểm định hậu nghiệm hơn vì phụ thuộc vào vùng đuôi ít quan sát",
        "Nó không đo được mức lỗ trong các kịch bản cực đoan của thị trường",
        "Nó vi phạm tính cộng gộp nên không dùng được cho danh mục lớn",
        "Nó chỉ áp dụng được cho danh mục cổ phiếu chứ không cho phái sinh"
      ],
      "correct": 0,
      "explanation": "VaR chỉ cần đếm số lần bị vượt nên kiểm định rất gọn. Expected Shortfall là trung bình của phần đuôi, mà phần đuôi thì theo định nghĩa có rất ít quan sát - nên đánh giá xem con số đó đúng hay sai khó hơn hẳn."
    }
    ],
    keyTakeaways: [
      "VaR chỉ nhìn một điểm trên phân phối và bỏ qua mọi thứ nằm sau điểm đó",
      "ES đo lỗ trung bình khi đã vượt ngưỡng, nên phân biệt được hai danh mục cùng VaR",
      "Tính cộng gộp: rủi ro của tổng không lớn hơn tổng các rủi ro - VaR vi phạm được",
      "Hệ quả: chia nhỏ danh mục có thể làm giảm VaR báo cáo mà không giảm rủi ro thật",
      "Cái giá của ES: kiểm định hậu nghiệm khó hơn nhiều vì cần dữ liệu đuôi",
    ],
    practicePrompt: {
      question:
        "Hai danh mục cùng VaR 99% là 10 tỷ. Danh mục A khi vượt ngưỡng thì lỗ trung bình 12 tỷ, danh mục B lỗ trung bình 40 tỷ. Thước đo nào phân biệt được?",
      options: [
        "VaR, vì nó đã tính ở mức 99%",
        "Expected Shortfall, vì nó lấy trung bình toàn bộ phần đuôi thay vì dừng ở ngưỡng",
        "Cả hai đều phân biệt được",
        "Không thước đo nào phân biệt được",
      ],
      correct: 1,
      explanation:
        "Đây là ví dụ gọn nhất cho lý do Basel đổi thước đo. VaR của hai danh mục bằng nhau vì nó chỉ hỏi ngưỡng nằm ở đâu, và ngưỡng đúng là bằng nhau. Nhưng danh mục B tệ hơn hẳn ở chỗ mọi người thực sự quan tâm: khi chuyện xấu xảy ra thì xấu tới mức nào. ES của A là 12, của B là 40 - con số phản ánh đúng chênh lệch đó.",
    },
    summary: {
      keyIdea: "VaR trả lời ngưỡng ở đâu, ES trả lời vượt ngưỡng rồi thì tệ tới đâu",
      commonMistake: "Cho rằng VaR thấp hơn luôn nghĩa là danh mục an toàn hơn",
      action: "Với một phân phối lợi suất, tính cả VaR 99% và ES 97,5% rồi so hai con số - khoảng cách cho biết đuôi dày tới đâu.",
    },
    application: {
      title: "Việc cần làm",
      message:
        "Lấy 500 quan sát lợi suất. Tính VaR 99% bằng phân vị 1%. Sau đó lấy trung bình của toàn bộ các quan sát nằm dưới phân vị đó - đấy là ES. Lặp lại với một chuỗi có vài cú sốc lớn và so tỷ lệ ES trên VaR giữa hai chuỗi.",
      secondary: "Tỷ lệ đó là một cách đo độ dày đuôi mà không cần giả định phân phối nào.",
    },
    sections: [
      {
        type: "lead",
        text: "Bài trước cho thấy cách kiểm tra một mô hình VaR. Bài này nói về nhược điểm mà không phép kiểm định nào bắt được, vì nó nằm trong chính định nghĩa của thước đo.",
      },
      {
        type: "heading",
        text: "Bốn tính chất của một thước đo rủi ro nhất quán",
      },
      {
        type: "list",
        items: [
          "Đơn điệu: danh mục luôn cho kết quả tệ hơn thì phải bị đo là rủi ro hơn",
          "Bất biến tịnh tiến: thêm tiền mặt vào danh mục thì rủi ro phải giảm đúng bằng số tiền đó",
          "Thuần nhất bậc một: nhân đôi mọi vị thế thì rủi ro nhân đôi",
          "Cộng gộp: rủi ro của danh mục gộp không lớn hơn tổng rủi ro từng phần - đây là tính chất VaR vi phạm được",
        ],
      },
      {
        type: "comparison",
        left: {
          label: "VaR",
          text: "Một điểm trên phân phối: ngưỡng lỗ ứng với phân vị đã chọn. Dễ hiểu, dễ kiểm định hậu nghiệm bằng phép đếm. Không nói gì về phần nằm sau ngưỡng, và có thể vi phạm tính cộng gộp.",
        },
        right: {
          label: "Expected Shortfall",
          text: "Trung bình của toàn bộ phần đuôi vượt ngưỡng. Luôn thoả bốn tính chất trên. Đổi lại, kiểm định hậu nghiệm khó hơn nhiều vì cần đủ quan sát ở đúng vùng dữ liệu hiếm nhất.",
        },
      },
      {
        type: "callout",
        label: "Vì sao Basel chọn mức 97,5% cho ES",
        text: "Không phải con số tuỳ tiện. ES ở mức 97,5% cho ra độ lớn xấp xỉ VaR ở mức 99% với phân phối chuẩn, nên yêu cầu vốn không nhảy vọt khi chuyển thước đo. Đồng thời mức 97,5% để lại nhiều quan sát đuôi hơn mức 99%, nên ước lượng ES ổn định hơn và bớt phụ thuộc vào vài điểm dữ liệu cực đoan. Đây là một lựa chọn cân bằng giữa tính đúng đắn lý thuyết và khả năng ước lượng được trên dữ liệu thật.",
      },
      {
        type: "closing",
        lines: [
          "Thước đo rủi ro không chỉ cần đúng về trực giác, nó cần đúng về cả tính chất toán học - nếu không, người ta sẽ tối ưu vào đúng chỗ nó sai.",
          "Bài sau quay lại đầu vào của mọi mô hình trên: bản thân độ biến động được ước lượng thế nào.",
        ],
      },
    ],
  },
  {
    id: 1554,
    slug: "mo-hinh-hoa-do-bien-dong-ewma-garch",
    title: "Rủi ro TT, Bài 4: Mô hình hoá độ biến động - EWMA và GARCH",
    subtitle: "Vì sao biến động dồn cụm, cách gán trọng số giảm dần cho dữ liệu cũ, và ý nghĩa của việc quay về trung bình dài hạn",
    duration: "12 phút",
    difficulty: "Khó",
    emoji: "🌊",
    track: "professional",
    whyItMatters:
      "Mọi con số VaR đều đứng trên một ước lượng độ biến động. Dùng độ lệch chuẩn đơn giản của 250 ngày nghĩa là coi ngày hôm qua và ngày cách đây một năm quan trọng như nhau - giả định sai rõ ràng, và là lý do mô hình phản ứng chậm khi thị trường chuyển chế độ.",
    openingQuestion:
      "Đặc điểm nào của biến động thị trường mà độ lệch chuẩn tính trên cửa sổ cố định không nắm bắt được?",
    openingOptions: [
      "Biến động luôn tăng theo thời gian",
      "Biến động dồn cụm: giai đoạn biến động cao đi liền nhau, giai đoạn yên ả cũng vậy",
      "Biến động luôn tỷ lệ thuận với khối lượng giao dịch",
      "Biến động của mọi tài sản đều bằng nhau trong dài hạn",
    ],
    correctOption: 1,
    explanation:
      "Hiện tượng này được gọi là dồn cụm biến động, và nó là một trong những quy luật thực nghiệm chắc chắn nhất của thị trường tài chính: một ngày biến động mạnh có xác suất cao được theo sau bởi một ngày biến động mạnh nữa. Độ lệch chuẩn trên cửa sổ cố định gán trọng số bằng nhau cho mọi quan sát trong cửa sổ, nên nó không thể phản ánh việc thông tin gần đây nói nhiều hơn về ngày mai. Tệ hơn nữa là hiệu ứng bóng ma: khi một cú sốc lớn rơi ra khỏi cửa sổ, ước lượng đột ngột sụt xuống mà thị trường không hề thay đổi gì.",
    diagram: [
      { label: "Biến động dồn cụm theo giai đoạn", arrow: true },
      { label: "EWMA: trọng số giảm dần theo lambda", arrow: true },
      { label: "GARCH: thêm lực kéo về trung bình dài hạn", arrow: true },
      { label: "Dự báo nhiều kỳ hội tụ về mức dài hạn" },
    ],
    interactiveType: "chart",
    realWorldExample: {
      company: "Hiệu ứng bóng ma của cửa sổ cố định",
      description:
        "Một mô hình dùng độ lệch chuẩn 250 ngày trải qua cú sốc lớn vào tháng 3. Suốt 250 ngày sau đó, cú sốc ấy nằm trong cửa sổ và đẩy ước lượng biến động lên cao. Đúng ngày nó rơi ra khỏi cửa sổ, ước lượng sụt mạnh chỉ sau một đêm - không phải vì thị trường vừa yên đi, mà vì một quan sát cũ vừa hết hạn. VaR của cả một khối kinh doanh giảm theo, và hạn mức rủi ro nới ra, hoàn toàn do một tạo tác kỹ thuật của cách chọn cửa sổ.",
    },
    quiz: [
      {
        question: "Tham số lambda trong EWMA điều khiển điều gì?",
        options: [
          "Tốc độ giảm trọng số của các quan sát cũ, tức mô hình phản ứng nhanh hay chậm với dữ liệu mới",
          "Mức độ biến động dài hạn mà chuỗi ước lượng sẽ hội tụ về sau một số kỳ đủ lớn",
          "Số lượng quan sát tối đa được đưa vào cửa sổ tính toán của mô hình trong mỗi lần cập nhật",
          "Mức ý nghĩa thống kê dùng khi kiểm định xem ước lượng biến động có đáng tin cậy hay không",
        ],
        correct: 0,
        explanation:
          "Lambda thấp thì mô hình bám sát dữ liệu mới nhưng nhiễu; lambda cao thì mượt nhưng chậm. Giá trị quanh 0,94 cho dữ liệu ngày là lựa chọn phổ biến.",
      },
      {
        question: "GARCH khác EWMA ở điểm cốt lõi nào?",
        options: [
          "GARCH có thêm thành phần kéo ước lượng về mức biến động trung bình dài hạn",
          "GARCH chỉ sử dụng dữ liệu của đúng ngày liền trước còn EWMA dùng toàn bộ chuỗi lịch sử",
          "GARCH không cần ước lượng tham số nào từ dữ liệu mà dùng các giá trị chuẩn cố định",
          "GARCH chỉ áp dụng được cho chuỗi lợi suất cổ phiếu chứ không dùng cho tỷ giá hay lãi suất",
        ],
        correct: 0,
        explanation:
          "Chính thành phần đó khiến dự báo nhiều kỳ của GARCH hội tụ về mức dài hạn, trong khi EWMA dự báo mọi kỳ tương lai bằng đúng giá trị hiện tại.",
      },
      {
        question: "Hiệu ứng bóng ma trong ước lượng biến động là gì?",
        options: [
          "Ước lượng sụt đột ngột khi một cú sốc cũ rơi ra khỏi cửa sổ, dù thị trường không thay đổi gì",
          "Ước lượng tăng vọt mỗi khi có một quan sát mới với giá trị lớn được thêm vào cửa sổ tính toán",
          "Hiện tượng hai mô hình khác nhau cho ra cùng một kết quả ước lượng trên cùng bộ dữ liệu",
          "Sai lệch phát sinh khi dữ liệu giá bị thiếu ở một số ngày nghỉ lễ trong chuỗi thời gian",
        ],
        correct: 0,
        explanation:
          "Đây là hệ quả trực tiếp của việc gán trọng số bằng nhau rồi cắt cứng ở rìa cửa sổ. EWMA không có vấn đề này vì trọng số giảm dần chứ không rơi đột ngột về không.",
      },
      {
        question: "Vì sao dự báo biến động nhiều kỳ của GARCH hội tụ về một mức cố định?",
        options: [
          "Vì mô hình có thành phần quay về trung bình, nên càng xa hiện tại thì cú sốc gần đây càng ít ảnh hưởng",
          "Vì các tham số của mô hình được ràng buộc phải cộng lại đúng bằng một trong suốt quá trình ước lượng tham số",
          "Vì mô hình giả định biến động của thị trường sẽ giảm dần về không trong khoảng thời gian đủ dài",
          "Vì dữ liệu lịch sử luôn có xu hướng hội tụ về giá trị trung bình khi số quan sát tăng lên",
        ],
        correct: 0,
        explanation:
          "Tính chất này quan trọng khi tính VaR cho kỳ hạn dài: không thể chỉ nhân độ biến động một ngày với căn bậc hai của số ngày nếu biến động hiện tại đang lệch xa mức dài hạn.",
      },
    
    {
      "question": "Vì sao dự báo biến động nhiều kỳ của mô hình GARCH hội tụ về một mức cố định?",
      "options": [
        "Vì mô hình có thành phần kéo biến động về mức trung bình dài hạn",
        "Vì sai số dự báo tích lũy làm mọi kịch bản trở nên giống nhau",
        "Vì tham số của mô hình được ước lượng lại sau mỗi kỳ dự báo",
        "Vì biến động thực tế của thị trường luôn ổn định trong dài hạn"
      ],
      "correct": 0,
      "explanation": "Đây chính là điểm GARCH khác EWMA: nó có một mức biến động dài hạn được ước lượng từ dữ liệu, và mọi dự báo đều bị kéo dần về đó. EWMA không có neo này nên dự báo nhiều kỳ của nó phẳng ở mức hiện tại."
    }
    ],
    keyTakeaways: [
      "Biến động dồn cụm - đây là quy luật thực nghiệm chắc chắn nhất của chuỗi lợi suất",
      "Cửa sổ cố định gán trọng số bằng nhau, gây hiệu ứng bóng ma khi cú sốc cũ rơi ra khỏi cửa sổ",
      "EWMA gán trọng số giảm dần theo lambda: thấp thì nhạy, cao thì mượt",
      "GARCH thêm lực kéo về trung bình dài hạn, nên dự báo nhiều kỳ hội tụ",
      "Không nhân bừa độ biến động một ngày với căn bậc hai số ngày khi biến động đang lệch xa mức dài hạn",
    ],
    practicePrompt: {
      question:
        "Thị trường vừa trải qua một tuần biến động rất mạnh. Mô hình nào cho ước lượng biến động phản ứng nhanh nhất?",
      options: [
        "Độ lệch chuẩn cửa sổ 250 ngày",
        "EWMA với lambda thấp, vì trọng số dồn nhiều vào các quan sát gần nhất",
        "EWMA với lambda cao",
        "Ba cách phản ứng như nhau",
      ],
      correct: 1,
      explanation:
        "Lambda quyết định trọng số giảm nhanh hay chậm, nên lambda thấp làm các ngày vừa qua chi phối ước lượng. Nhưng nhanh không đồng nghĩa tốt: lambda quá thấp khiến ước lượng nhảy múa theo từng ngày và VaR mất ổn định tới mức không dùng để đặt hạn mức được. Cửa sổ 250 ngày phản ứng chậm nhất vì tuần vừa rồi chỉ chiếm 5 trong 250 quan sát cùng trọng số.",
    },
    summary: {
      keyIdea: "Ước lượng biến động là đầu vào của mọi mô hình rủi ro, và cách gán trọng số quyết định nó",
      commonMistake: "Dùng độ lệch chuẩn cửa sổ cố định rồi ngạc nhiên khi VaR sụt mà thị trường không đổi",
      action: "Tính song song độ lệch chuẩn 250 ngày và EWMA lambda 0,94 trên cùng chuỗi, vẽ hai đường lên một đồ thị.",
    },
    application: {
      title: "Việc cần làm",
      message:
        "Lấy chuỗi lợi suất hai năm có ít nhất một giai đoạn biến động mạnh. Vẽ ba đường ước lượng biến động: độ lệch chuẩn 250 ngày, EWMA lambda 0,94 và EWMA lambda 0,80. Quan sát cả tốc độ phản ứng lẫn thời điểm đường 250 ngày sụt đột ngột.",
      secondary: "Cú sụt đó xảy ra đúng 250 ngày sau cú sốc, và không có gì trên thị trường giải thích được nó.",
    },
    sections: [
      {
        type: "lead",
        text: "Ba bài trước đều giả định ta biết độ biến động của danh mục. Bài này mở giả định đó ra, vì mọi sai số của VaR đều bắt đầu từ đây.",
      },
      {
        type: "heading",
        text: "Ba cách ước lượng, một trục phát triển",
      },
      {
        type: "conceptTable",
        title: "Từ cửa sổ cố định tới GARCH",
        subtitle: "Mỗi bước xử lý đúng một nhược điểm của bước trước",
        concepts: [
          { vi: "Độ lệch chuẩn cửa sổ", en: "Rolling standard deviation", def: "Trọng số bằng nhau cho mọi quan sát trong cửa sổ, bằng không cho mọi thứ ngoài cửa sổ. Đơn giản, và sinh ra hiệu ứng bóng ma ở rìa." },
          { vi: "EWMA", en: "Exponentially weighted", def: "Trọng số giảm dần theo cấp số nhân với tham số lambda. Không còn rìa cứng, phản ứng nhanh với cú sốc. Nhưng dự báo mọi kỳ tương lai bằng giá trị hiện tại." },
          { vi: "GARCH", en: "GARCH(1,1)", def: "Thêm một thành phần kéo về mức biến động dài hạn. Nhờ đó dự báo nhiều kỳ hội tụ thay vì đứng yên - điều bắt buộc khi tính VaR cho kỳ hạn dài hơn một ngày." },
        ],
      },
      {
        type: "callout",
        label: "Vì sao không nhân bừa với căn bậc hai của thời gian",
        text: "Quy tắc quen thuộc là nhân độ biến động một ngày với căn bậc hai của số ngày để ra biến động nhiều ngày. Nó chỉ đúng khi lợi suất độc lập và biến động không đổi - hai điều kiện mà chính hiện tượng dồn cụm đã bác bỏ. Khi biến động hiện tại cao hơn nhiều so với mức dài hạn, quy tắc này sẽ phóng đại rủi ro mười ngày tới, vì GARCH cho biết biến động sẽ hạ dần về trung bình trong khoảng thời gian đó.",
      },
      {
        type: "closing",
        lines: [
          "Con số biến động không quan sát được - nó luôn là kết quả của một lựa chọn về cách gán trọng số cho quá khứ.",
          "Bài sau chuyển từ một tài sản sang cả danh mục: các tài sản cùng rơi thế nào.",
        ],
      },
    ],
  },
  {
    id: 1555,
    slug: "tuong-quan-copula-va-phu-thuoc-duoi",
    title: "Rủi ro TT, Bài 5: Tương quan, copula và phụ thuộc đuôi",
    subtitle: "Vì sao hệ số tương quan không mô tả đủ, cấu trúc phụ thuộc tách khỏi phân phối biên, và bài học từ khủng hoảng 2008",
    duration: "12 phút",
    difficulty: "Khó",
    emoji: "🔗",
    track: "professional",
    whyItMatters:
      "Đa dạng hoá dựa trên giả định các tài sản không cùng rơi. Hệ số tương quan đo quan hệ trung bình, nhưng cái quyết định số phận một danh mục là quan hệ trong những ngày tệ nhất - và hai đại lượng đó khác nhau xa hơn phần lớn người ta tưởng.",
    openingQuestion:
      "Hai tài sản có hệ số tương quan 0,3. Điều đó bảo đảm gì về hành vi của chúng trong khủng hoảng?",
    openingOptions: [
      "Bảo đảm chúng chỉ cùng giảm trong 30% số trường hợp",
      "Không bảo đảm gì: hệ số tương quan đo quan hệ tuyến tính trung bình, không mô tả riêng phần đuôi",
      "Bảo đảm danh mục gồm hai tài sản này giảm tối đa 30%",
      "Bảo đảm chúng độc lập khi thị trường bình thường",
    ],
    correctOption: 1,
    explanation:
      "Hệ số tương quan là một con số duy nhất tóm tắt toàn bộ quan hệ giữa hai chuỗi, và nó bị chi phối bởi vùng dữ liệu đông đúc nhất - tức các ngày bình thường. Hoàn toàn có thể có hai tài sản tương quan thấp trong điều kiện bình thường nhưng gần như luôn cùng giảm trong các cú sốc lớn. Tính chất đó gọi là phụ thuộc đuôi, và hệ số tương quan không đo được nó. Đây là lý do một danh mục trông đa dạng hoá tốt trên bảng tính vẫn có thể mất giá đồng loạt đúng vào ngày đa dạng hoá cần phát huy tác dụng.",
    diagram: [
      { label: "Tương quan: một số cho cả phân phối", arrow: true },
      { label: "Copula: tách phụ thuộc khỏi phân phối biên", arrow: true },
      { label: "Copula Gaussian: không có phụ thuộc đuôi", arrow: true },
      { label: "Copula t: có phụ thuộc đuôi" },
    ],
    interactiveType: "risk",
    realWorldExample: {
      company: "Copula Gaussian trong định giá tín dụng cấu trúc",
      description:
        "Trước 2008, các sản phẩm tín dụng cấu trúc được định giá rộng rãi bằng mô hình copula Gaussian để mô tả khả năng nhiều khoản vay cùng vỡ nợ. Copula Gaussian có một tính chất toán học cụ thể: phụ thuộc đuôi bằng không - nghĩa là dù tương quan cao đến đâu, xác suất hai biến cùng rơi vào vùng cực đoan vẫn tiến về không ở đuôi xa. Với các khoản vay thế chấp trong một cú sụt giá nhà toàn quốc, giả định đó sai theo đúng hướng nguy hiểm nhất, và các lớp cao của sản phẩm - vốn chỉ mất tiền khi vỡ nợ xảy ra đồng loạt - hoá ra rủi ro hơn hẳn xếp hạng của chúng.",
    },
    quiz: [
      {
        question: "Copula tách bạch được hai thứ gì?",
        options: [
          "Phân phối biên của từng biến, và cấu trúc phụ thuộc giữa các biến với nhau",
          "Phần biến động ngắn hạn của chuỗi dữ liệu, và phần xu hướng dài hạn nằm bên dưới nó",
          "Rủi ro có thể đa dạng hoá được, và phần rủi ro hệ thống không thể loại bỏ bằng đa dạng hoá",
          "Dữ liệu quan sát thực tế, và các giá trị được mô phỏng ra trong quá trình chạy mô hình",
        ],
        correct: 0,
        explanation:
          "Nhờ tách bạch này, ta mô hình hoá riêng từng tài sản bằng phân phối phù hợp nhất với nó, rồi ghép chúng lại bằng một cấu trúc phụ thuộc chọn riêng.",
      },
      {
        question: "Phụ thuộc đuôi nghĩa là gì?",
        options: [
          "Xu hướng các biến cùng rơi vào vùng giá trị cực đoan, vượt mức mà hệ số tương quan gợi ý",
          "Mức độ mà giá trị hôm nay của một chuỗi phụ thuộc vào chính giá trị của nó ở ngày hôm trước",
          "Hiện tượng phần đuôi của phân phối lợi suất dày hơn so với phân phối chuẩn tương ứng",
          "Quan hệ giữa độ dài của chuỗi dữ liệu lịch sử và độ tin cậy của ước lượng tương quan",
        ],
        correct: 0,
        explanation:
          "Đây chính là đại lượng quyết định lợi ích đa dạng hoá có còn tồn tại trong khủng hoảng hay không, và nó không xuất hiện trong hệ số tương quan.",
      },
      {
        question: "Copula Gaussian khác copula t ở điểm quan trọng nào?",
        options: [
          "Copula Gaussian không có phụ thuộc đuôi, còn copula t thì có, nên t mô tả các cú sốc đồng loạt tốt hơn",
          "Copula Gaussian chỉ áp dụng được cho hai biến còn copula t xử lý được số biến lớn tuỳ ý",
          "Copula Gaussian đòi hỏi các biến phải có cùng phân phối biên còn copula t thì không cần",
          "Copula Gaussian cho kết quả chính xác hơn trong mọi trường hợp nhưng lại tốn chi phí tính toán hơn nhiều",
        ],
        correct: 0,
        explanation:
          "Khác biệt nghe rất kỹ thuật này lại chính là điều làm nên chênh lệch lớn về giá và rủi ro của các sản phẩm tín dụng cấu trúc trước 2008.",
      },
      {
        question: "Vì sao tương quan giữa các loại tài sản thường tăng trong khủng hoảng?",
        options: [
          "Vì nhà đầu tư bán tháo mọi thứ để lấy tiền mặt, nên giá bị chi phối bởi nhu cầu thanh khoản chung",
          "Vì các cơ quan quản lý can thiệp đồng thời lên tất cả các thị trường trong giai đoạn khủng hoảng",
          "Vì khối lượng giao dịch giảm mạnh nên giá của các tài sản trở nên ít biến động hơn bình thường",
          "Vì mô hình định giá của các tổ chức lớn đều dùng chung một bộ tham số tương quan cố định",
        ],
        correct: 0,
        explanation:
          "Khi lý do bán không còn liên quan tới bản thân tài sản mà là nhu cầu tiền mặt, mọi thứ cùng bị bán - và đa dạng hoá theo ngành hay khu vực không giúp được gì.",
      },
    
    {
      "question": "Vì sao mô hình dùng copula Gaussian đánh giá thấp rủi ro danh mục tín dụng trước năm 2008?",
      "options": [
        "Vì nó không tạo phụ thuộc đuôi nên bỏ qua vỡ nợ đồng loạt",
        "Vì nó giả định các khoản vay có xác suất vỡ nợ bằng nhau",
        "Vì nó chỉ áp dụng được cho danh mục có ít hơn một trăm tài sản",
        "Vì nó đòi hỏi dữ liệu lịch sử dài hơn mức các tổ chức đang có"
      ],
      "correct": 0,
      "explanation": "Copula Gaussian cho phép đặt tương quan nhưng phần đuôi vẫn độc lập tiệm cận - nghĩa là mô hình gần như loại trừ kịch bản mọi khoản vay cùng vỡ một lúc. Đó đúng là kịch bản đã xảy ra, và nó nằm ngoài thứ mô hình có thể sinh ra."
    }
    ],
    keyTakeaways: [
      "Hệ số tương quan đo quan hệ trung bình, bị chi phối bởi các ngày bình thường",
      "Phụ thuộc đuôi là xu hướng cùng rơi vào vùng cực đoan - tương quan không đo được nó",
      "Copula tách cấu trúc phụ thuộc khỏi phân phối biên của từng tài sản",
      "Copula Gaussian có phụ thuộc đuôi bằng không; copula t thì không",
      "Trong khủng hoảng tương quan tăng vì lý do bán là nhu cầu tiền mặt, không phải bản thân tài sản",
    ],
    practicePrompt: {
      question:
        "Danh mục gồm 10 cổ phiếu ngành khác nhau, tương quan cặp trung bình 0,25. Rủi ro lớn nhất bị bỏ sót là gì?",
      options: [
        "Danh mục chưa đủ số lượng cổ phiếu để đa dạng hoá",
        "Tương quan 0,25 là mức trung bình các ngày bình thường; trong cú sốc chung nó có thể tiến gần 1 và lợi ích đa dạng hoá biến mất",
        "Các cổ phiếu cùng sàn niêm yết",
        "Chưa tính đến chi phí giao dịch khi tái cân bằng",
      ],
      correct: 1,
      explanation:
        "Đây là khoảng cách giữa rủi ro trên bảng tính và rủi ro thật. Mười ngành khác nhau bảo vệ được trước cú sốc riêng của một ngành, nhưng không bảo vệ được trước một cú sốc chung của thị trường - đúng loại biến cố mà người ta mua đa dạng hoá để phòng. Cách kiểm tra là tính lại tương quan chỉ trên 5% số ngày tệ nhất và so với con số 0,25.",
    },
    summary: {
      keyIdea: "Đa dạng hoá được đo bằng quan hệ trong ngày tệ nhất, không phải quan hệ trung bình",
      commonMistake: "Kết luận danh mục an toàn vì ma trận tương quan trông thấp",
      action: "Tính lại tương quan cặp chỉ trên các ngày thị trường giảm mạnh nhất và so với tương quan toàn kỳ.",
    },
    application: {
      title: "Việc cần làm",
      message:
        "Lấy dữ liệu hai chỉ số hoặc hai cổ phiếu trong năm năm. Tính hệ số tương quan trên toàn bộ mẫu, rồi tính lại chỉ trên 5% số ngày mà thị trường giảm mạnh nhất. So hai con số.",
      secondary: "Chênh lệch giữa chúng chính là phần rủi ro mà ma trận tương quan trong báo cáo đang không nói cho bạn biết.",
    },
    sections: [
      {
        type: "lead",
        text: "Bài trước ước lượng biến động của một tài sản. Danh mục lại phụ thuộc vào chuyện các tài sản chuyển động cùng nhau thế nào - và đây là chỗ mô hình rủi ro hay sai nhất, theo hướng lạc quan.",
      },
      {
        type: "heading",
        text: "Vì sao một con số là không đủ",
      },
      {
        type: "comparison",
        left: {
          label: "Hệ số tương quan",
          text: "Một con số cho toàn bộ phân phối, đo quan hệ tuyến tính. Bị chi phối bởi vùng dữ liệu đông nhất là các ngày bình thường. Đơn giản, quen thuộc, và im lặng về đúng phần đuôi.",
        },
        right: {
          label: "Cấu trúc phụ thuộc",
          text: "Mô tả các biến cùng chuyển động thế nào ở từng vùng của phân phối, kể cả vùng cực đoan. Copula là công cụ tách phần này ra để mô hình hoá riêng.",
        },
      },
      {
        type: "callout",
        label: "Đa dạng hoá biến mất đúng lúc cần nhất",
        text: "Đây là quan sát trở đi trở lại qua mọi cuộc khủng hoảng: các tài sản tương quan thấp trong điều kiện bình thường lại cùng giảm trong cú sốc lớn. Cơ chế không bí ẩn - khi nhà đầu tư cần tiền mặt, họ bán những gì bán được, nên lý do bán không còn liên quan tới bản thân tài sản. Hệ quả cho việc quản trị rủi ro là ma trận tương quan ước lượng trên dữ liệu bình thường sẽ đánh giá thấp rủi ro danh mục đúng vào các kịch bản mà con số đó tồn tại để cảnh báo.",
      },
      {
        type: "closing",
        lines: [
          "Đa dạng hoá không phải một tính chất cố định của danh mục, nó là một tính chất phụ thuộc trạng thái thị trường.",
          "Bài cuối chặng nói về công cụ không dựa vào phân phối nào cả: dựng thẳng kịch bản.",
        ],
      },
    ],
  },
  {
    id: 1556,
    slug: "stress-testing-va-kich-ban-nguoc",
    title: "Rủi ro TT, Bài 6: Stress testing và kịch bản ngược - khi mô hình không còn đủ",
    subtitle: "Kịch bản lịch sử và giả định, kịch bản ngược, và vì sao stress test bổ sung chứ không thay thế VaR",
    duration: "11 phút",
    difficulty: "Trung bình",
    emoji: "🧨",
    track: "professional",
    whyItMatters:
      "Mọi thước đo ở năm bài trước đều ước lượng từ dữ liệu quá khứ, nên chúng chỉ biết những gì đã xảy ra. Stress testing là công cụ duy nhất trong bộ đồ nghề trả lời được câu hỏi về những gì chưa từng xảy ra, và đó là lý do cơ quan quản lý bắt buộc nó song song với VaR.",
    openingQuestion:
      "Stress testing khác VaR ở điểm căn bản nào?",
    openingOptions: [
      "Stress testing chính xác hơn vì dùng dữ liệu mới hơn",
      "Stress testing không gắn xác suất: nó hỏi nếu kịch bản này xảy ra thì mất bao nhiêu, không hỏi khả năng bao nhiêu",
      "Stress testing chỉ áp dụng cho danh mục trái phiếu",
      "Stress testing thay thế hoàn toàn VaR trong khung Basel hiện hành",
    ],
    correctOption: 1,
    explanation:
      "Khác biệt này quyết định cách đọc kết quả. VaR là một phát biểu xác suất: với độ tin cậy 99%, lỗ không vượt mức này. Stress test là một phát biểu có điều kiện: nếu lãi suất tăng 300 điểm cơ bản đồng thời cổ phiếu giảm 30%, danh mục mất chừng này. Nó không nói kịch bản đó có khả năng xảy ra bao nhiêu, và chính việc bỏ xác suất đi mới là điểm mạnh - nó cho phép xét những kịch bản mà dữ liệu lịch sử không có đủ quan sát để ước lượng xác suất một cách đáng tin.",
    diagram: [
      { label: "Kịch bản lịch sử: lặp lại một cuộc khủng hoảng", arrow: true },
      { label: "Kịch bản giả định: tổ hợp cú sốc chưa từng có", arrow: true },
      { label: "Kịch bản ngược: đi từ mức lỗ về nguyên nhân", arrow: true },
      { label: "Kết quả gắn với hạn mức và kế hoạch hành động" },
    ],
    interactiveType: "risk",
    realWorldExample: {
      company: "Kịch bản ngược đặt câu hỏi theo chiều khác",
      description:
        "Stress test thông thường đi từ nguyên nhân tới hậu quả: giả sử thị trường giảm 30%, ta mất bao nhiêu. Kịch bản ngược đảo chiều: mức lỗ nào sẽ khiến vốn của chúng ta xuống dưới ngưỡng tối thiểu, và tổ hợp biến động nào tạo ra mức lỗ đó. Cách hỏi này hữu ích vì nó không đòi người làm phải nghĩ ra trước kịch bản đúng - vốn là điểm yếu lớn nhất của stress test truyền thống. Nó thường lộ ra những tổ hợp rủi ro mà không ai trong phòng nghĩ tới, chẳng hạn một mức giảm vừa phải kết hợp với việc mất một nguồn tài trợ cụ thể.",
    },
    quiz: [
      {
        question: "Kịch bản lịch sử trong stress testing là gì?",
        options: [
          "Áp lại biến động thực tế của một cuộc khủng hoảng đã xảy ra lên danh mục hiện tại",
          "Tính toán mức lỗ lớn nhất mà danh mục đã từng thực sự chịu trong toàn bộ lịch sử hoạt động",
          "Dùng toàn bộ dữ liệu lịch sử có được để ước lượng phân phối lợi suất của danh mục hiện tại",
          "So sánh hiệu quả của danh mục hiện nay với hiệu quả của chính nó trong các năm trước đó",
        ],
        correct: 0,
        explanation:
          "Ưu điểm là kịch bản chắc chắn khả thi vì nó đã xảy ra. Nhược điểm là cuộc khủng hoảng tới hiếm khi giống hệt cuộc khủng hoảng trước.",
      },
      {
        question: "Vì sao kịch bản ngược có giá trị riêng so với stress test thông thường?",
        options: [
          "Vì nó không đòi người làm phải đoán trước đúng kịch bản, mà đi ngược từ mức lỗ về các nguyên nhân",
          "Vì nó cho kết quả chính xác hơn do sử dụng nhiều dữ liệu lịch sử hơn so với cách làm thông thường",
          "Vì nó được cơ quan quản lý chấp nhận thay thế cho toàn bộ các kịch bản stress test khác",
          "Vì nó chỉ cần tính toán một lần duy nhất rồi dùng lại cho mọi kỳ báo cáo tiếp theo sau đó",
        ],
        correct: 0,
        explanation:
          "Điểm yếu lớn nhất của stress test truyền thống là bạn chỉ kiểm tra được những gì mình nghĩ ra. Kịch bản ngược lách qua đúng giới hạn đó.",
      },
      {
        question: "Vì sao stress test bổ sung chứ không thay thế VaR?",
        options: [
          "Vì nó không gắn xác suất, nên không dùng để tính vốn hay đặt hạn mức theo cách VaR làm được",
          "Vì nó chỉ tính được cho từng vị thế riêng lẻ chứ không tổng hợp lên cấp độ toàn danh mục",
          "Vì kết quả của nó thay đổi mỗi lần chạy lại do các kịch bản được sinh ra một cách ngẫu nhiên",
          "Vì nó đòi hỏi khối lượng dữ liệu lịch sử lớn hơn nhiều so với những gì VaR cần để tính toán",
        ],
        correct: 0,
        explanation:
          "Hai công cụ trả lời hai câu hỏi khác nhau và khung quản lý yêu cầu cả hai, chứ không xem cái nào là phiên bản tốt hơn của cái kia.",
      },
      {
        question: "Một kết quả stress test chỉ có giá trị khi nào?",
        options: [
          "Khi nó gắn với một hành động cụ thể: giảm vị thế, tăng vốn đệm, hoặc kích hoạt kế hoạch dự phòng",
          "Khi mức lỗ tính ra nằm dưới ngưỡng vốn tối thiểu mà cơ quan quản lý đã quy định cho đơn vị",
          "Khi kịch bản được sử dụng đã từng xảy ra ít nhất một lần trong lịch sử phát triển của thị trường tài chính",
          "Khi kết quả của nó trùng khớp với con số VaR đã tính ở cùng mức độ tin cậy tương ứng",
        ],
        correct: 0,
        explanation:
          "Một bộ kết quả stress test được trình bày rồi cất đi không làm tổ chức an toàn hơn chút nào - nó chỉ tạo cảm giác đã kiểm soát.",
      },
    
    {
      "question": "Kết quả một bài kiểm tra sức chịu đựng chỉ có giá trị khi nào?",
      "options": [
        "Khi nó dẫn tới một hành động cụ thể nếu kịch bản đó xảy ra thật",
        "Khi kịch bản được xây dựng dựa trên một sự kiện đã có trong lịch sử",
        "Khi mức lỗ tính ra nằm trong hạn mức rủi ro đã được phê duyệt",
        "Khi kịch bản được cơ quan quản lý chấp thuận trước khi thực hiện"
      ],
      "correct": 0,
      "explanation": "Một bảng kết quả cho thấy mất bao nhiêu mà không kèm việc phải làm gì thì chỉ là một con số. Giá trị nằm ở phần sau: giảm vị thế nào, cần thêm bao nhiêu vốn, kích hoạt kế hoạch tài trợ dự phòng ở ngưỡng nào."
    }
    ],
    keyTakeaways: [
      "Stress test không gắn xác suất: nó hỏi nếu xảy ra thì mất bao nhiêu, không hỏi khả năng bao nhiêu",
      "Kịch bản lịch sử chắc chắn khả thi nhưng khủng hoảng tới hiếm khi giống khủng hoảng trước",
      "Kịch bản ngược đi từ mức lỗ về nguyên nhân, nên không đòi phải đoán đúng kịch bản trước",
      "Bổ sung chứ không thay thế VaR - hai công cụ trả lời hai câu hỏi khác nhau",
      "Kết quả chỉ có giá trị khi gắn với một hành động cụ thể",
    ],
    practicePrompt: {
      question:
        "Ban lãnh đạo xem kết quả stress test cho thấy lỗ 800 tỷ trong kịch bản xấu, rồi kết luận kịch bản đó khó xảy ra nên không cần làm gì. Vấn đề ở đâu?",
      options: [
        "Không có vấn đề gì nếu xác suất thực sự thấp",
        "Stress test không đưa ra xác suất, nên bác bỏ nó bằng lập luận khó xảy ra là dùng một thông tin mà bài kiểm tra không hề cung cấp",
        "Cần chạy thêm nhiều kịch bản hơn",
        "Nên dùng VaR thay thế",
      ],
      correct: 1,
      explanation:
        "Đây là cách stress test bị vô hiệu hoá phổ biến nhất trong thực tế. Bài kiểm tra cố ý không phát biểu gì về xác suất - đó là thiết kế, không phải thiếu sót. Câu hỏi đúng phải trả lời không phải kịch bản này có khả năng bao nhiêu, mà nếu nó xảy ra thì chúng ta còn tồn tại không, và nếu câu trả lời là không thì mức xác suất thấp cũng không giúp được gì.",
    },
    summary: {
      keyIdea: "Stress test hỏi chuyện gì xảy ra nếu, chứ không hỏi khả năng bao nhiêu - và đó là điểm mạnh",
      commonMistake: "Bác bỏ kết quả stress test bằng lập luận kịch bản khó xảy ra",
      action: "Với một danh mục bạn theo dõi, viết ra ba kịch bản và mức lỗ ước tính, rồi gắn mỗi cái với một hành động.",
    },
    application: {
      title: "Việc cần làm",
      message:
        "Chọn một danh mục và dựng ba kịch bản: một lịch sử, một giả định, và một ngược. Với kịch bản ngược, bắt đầu từ câu hỏi mức lỗ nào khiến danh mục này không còn duy trì được, rồi lần ngược xem tổ hợp biến động nào tạo ra nó.",
      secondary: "Kịch bản ngược thường là cái cho ra phát hiện bất ngờ nhất, vì nó không bị giới hạn bởi trí tưởng tượng của người dựng.",
    },
    sections: [
      {
        type: "lead",
        text: "Năm bài trước xây một bộ công cụ thống kê ước lượng từ quá khứ. Chặng khép lại bằng công cụ tồn tại chính vì bộ đó có một giới hạn không vượt qua được: dữ liệu chỉ chứa những gì đã xảy ra.",
      },
      {
        type: "heading",
        text: "Ba loại kịch bản",
      },
      {
        type: "conceptTable",
        title: "Dựng kịch bản theo ba cách",
        subtitle: "Mỗi cách xử lý một điểm yếu của cách còn lại",
        concepts: [
          { vi: "Kịch bản lịch sử", en: "Historical scenario", def: "Áp lại biến động của một cuộc khủng hoảng đã xảy ra lên danh mục hiện tại. Chắc chắn khả thi, dễ giải thích, nhưng khủng hoảng tới hiếm khi lặp lại y hệt." },
          { vi: "Kịch bản giả định", en: "Hypothetical scenario", def: "Tổ hợp cú sốc do người làm dựng ra, kể cả tổ hợp chưa từng xảy ra. Linh hoạt, và bị giới hạn bởi đúng trí tưởng tượng của người dựng." },
          { vi: "Kịch bản ngược", en: "Reverse stress test", def: "Bắt đầu từ mức lỗ khiến tổ chức không trụ được, rồi tìm ngược tổ hợp nào tạo ra nó. Không cần đoán đúng kịch bản trước, nên hay lộ ra rủi ro không ai nghĩ tới." },
        ],
      },
      {
        type: "callout",
        label: "Cách stress test bị vô hiệu hoá",
        text: "Mô hình thất bại phổ biến nhất không nằm ở kỹ thuật mà ở phòng họp: kết quả được trình bày, ai đó nhận xét kịch bản này khó xảy ra, và không có hành động nào theo sau. Nhưng stress test cố ý không phát biểu gì về xác suất, nên lập luận đó dùng một thông tin mà bài kiểm tra không hề cung cấp. Cách phòng là buộc mỗi kịch bản đi kèm một ngưỡng và một hành động đã thoả thuận trước, để việc quyết định không xảy ra sau khi đã nhìn thấy con số.",
      },
      {
        type: "closing",
        lines: [
          "Mô hình cho biết điều gì thường xảy ra. Stress test cho biết điều gì sẽ kết thúc tổ chức.",
          "Chặng này khép lại phần rủi ro thị trường: từ cách tính một con số, tới việc biết khi nào không nên tin nó.",
        ],
      },
    ],
  },
];
