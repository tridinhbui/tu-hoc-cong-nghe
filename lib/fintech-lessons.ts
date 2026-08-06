import type { Lesson } from "./lesson-types";

// Chặng "Tài chính sản phẩm FinTech" (ids 1701-1706, professional track).
//
// Vì sao chặng này tồn tại: nghề "Chuyên viên Tài chính Sản phẩm FinTech"
// trong bản đồ nghề là nghề duy nhất mà kho bài học thực sự mỏng - đo bằng
// cách quét toàn bộ 689 bài, nó chỉ có đúng mấy bài chung chung để nối vào,
// trong khi mọi nghề khác đều đã có sẵn bài đúng chủ đề nằm rải rác.
//
// Chặng này cố ý KHÔNG dạy công nghệ. Người làm tài chính sản phẩm ở một công
// ty fintech không viết code và không thiết kế giao diện; việc của họ là trả
// lời một câu mà cả công ty phụ thuộc vào: sản phẩm này kiếm tiền ở đâu, mỗi
// khách hàng lãi hay lỗ, và bao lâu thì hoàn vốn. Đó là kế toán quản trị áp
// vào một mô hình kinh doanh mới, không phải là một môn tin học.
//
// Thứ tự sáu bài đi theo đúng thứ tự người ta phải hiểu: doanh thu đến từ đâu
// (take rate) → mỗi khách tốn bao nhiêu và trả lại bao nhiêu (CAC/LTV) → tiền
// của khách nằm ở đâu (float) → phần mất đi vì gian lận và tín dụng → và cuối
// cùng là câu hỏi tất cả dẫn tới: đốt tiền tới bao giờ.

export const FINTECH_LESSONS: Lesson[] = [
  {
    id: 1701,
    slug: "fintech-take-rate-doanh-thu-den-tu-dau",
    title: "FinTech, Bài 1: Take rate - sản phẩm này thực sự kiếm tiền ở đâu",
    subtitle:
      "Bốn nguồn doanh thu của một sản phẩm tài chính số và vì sao con số phần trăm nhỏ xíu lại quyết định cả mô hình",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "💳",
    track: "professional",
    whyItMatters:
      "Câu hỏi đầu tiên trong mọi cuộc họp sản phẩm ở một công ty fintech là chúng ta lấy bao nhiêu trên mỗi giao dịch. Trả lời sai câu đó thì mọi dự báo phía sau đều sai theo, vì take rate nhân với khối lượng chính là toàn bộ dòng doanh thu.",
    openingQuestion:
      "Một ví điện tử xử lý 10.000 tỷ đồng giao dịch một năm với take rate 0,4%. Doanh thu là bao nhiêu?",
    openingOptions: [
      "40 tỷ đồng",
      "400 tỷ đồng",
      "4 tỷ đồng",
      "10.000 tỷ, vì toàn bộ khối lượng chảy qua ví đều là doanh thu của ví",
    ],
    correctOption: 0,
    explanation:
      "Take rate là phần công ty giữ lại trên mỗi đồng chảy qua nền tảng, không phải toàn bộ số tiền chảy qua. 10.000 tỷ × 0,4% = 40 tỷ. Đây là chỗ nhầm phổ biến nhất khi đọc báo cáo của một công ty fintech: khối lượng giao dịch (GMV, TPV) là con số được đưa lên tiêu đề vì nó lớn, nhưng doanh thu thực chỉ là một lát rất mỏng của nó. Một nền tảng công bố TPV 100.000 tỷ với take rate 0,2% có doanh thu 200 tỷ - nhỏ hơn một chuỗi cà phê cỡ vừa. Ngược lại, một sản phẩm cho vay có take rate hiệu dụng 8-15% trên dư nợ chỉ cần khối lượng bằng một phần trăm cũng cho doanh thu tương đương.",
    diagram: [
      { label: "Khối lượng giao dịch (TPV)", arrow: true },
      { label: "× take rate", arrow: true },
      { label: "Doanh thu gộp", arrow: true },
      { label: "− chi phí trả đối tác (interchange, ngân hàng)", arrow: true },
      { label: "Doanh thu ròng - con số thật sự dùng để so sánh" },
    ],
    interactiveType: "profit-calc",
    realWorldExample: {
      company: "MoMo, VNPay, ZaloPay",
      description:
        "Ba ví lớn nhất Việt Nam đều công bố khối lượng giao dịch chứ hiếm khi công bố take rate. Với thanh toán hoá đơn và nạp tiền, phần giữ lại thường dưới 0,5% và một phần đáng kể còn phải chia cho ngân hàng; đó là lý do cả ba đều đẩy mạnh sang cho vay, bảo hiểm và đầu tư, nơi biên giữ lại cao hơn hàng chục lần.",
    },
    quiz: [
      {
        question: "Take rate đo cái gì?",
        options: [
          "Phần nền tảng giữ lại trên mỗi đồng giao dịch",
          "Tổng giao dịch chảy qua nền tảng",
          "Tỷ lệ người dùng quay lại sử dụng trong tháng kế tiếp",
          "Tỷ lệ giao dịch thất bại phải hoàn tiền cho khách hàng",
        ],
        correct: 0,
        explanation:
          "Take rate là doanh thu chia cho khối lượng giao dịch. Tổng giá trị giao dịch là TPV/GMV, một con số khác hẳn và lớn hơn nhiều lần.",
      },
      {
        question:
          "Nền tảng A: TPV 50.000 tỷ, take rate 0,3%. Nền tảng B: TPV 3.000 tỷ, take rate 9%. Nền tảng nào doanh thu cao hơn?",
        options: [
          "B, doanh thu 270 tỷ so với 150 tỷ",
          "A, vì khối lượng lớn hơn 16 lần",
          "Bằng nhau, vì take rate cao bù lại đúng phần khối lượng thấp",
          "Không kết luận được nếu chưa biết số người dùng",
        ],
        correct: 0,
        explanation:
          "A: 50.000 × 0,3% = 150 tỷ. B: 3.000 × 9% = 270 tỷ. Khối lượng lớn không đồng nghĩa doanh thu lớn - đây chính là lý do các ví thanh toán tìm đường sang sản phẩm tín dụng.",
      },
      {
        question: "Vì sao doanh thu ròng mới là con số dùng để so sánh giữa hai công ty fintech?",
        options: [
          "Vì doanh thu gộp còn chứa phần phải trả lại cho ngân hàng và tổ chức thẻ",
          "Vì doanh thu ròng luôn lớn hơn và trông đẹp hơn trong báo cáo gửi nhà đầu tư",
          "Vì chuẩn mực kế toán Việt Nam cấm công bố doanh thu gộp",
          "Vì doanh thu gộp chỉ tính giao dịch thành công",
        ],
        correct: 0,
        explanation:
          "Với thanh toán thẻ, phần lớn phí thu của khách chảy thẳng sang tổ chức phát hành thẻ dưới dạng interchange. Hai công ty cùng doanh thu gộp có thể chênh nhau vài lần ở doanh thu ròng.",
      },
      {
        question: "Nguồn doanh thu nào thường có take rate hiệu dụng cao nhất?",
        options: [
          "Cho vay tiêu dùng qua ứng dụng",
          "Nạp tiền điện thoại và thanh toán hoá đơn điện nước",
          "Chuyển tiền trong cùng ví",
          "Quét mã thanh toán tại cửa hàng tạp hoá và quán ăn nhỏ",
        ],
        correct: 0,
        explanation:
          "Lãi và phí trên dư nợ cho vay thường cho biên giữ lại 8-15%, trong khi thanh toán hoá đơn dưới 0,5% và chuyển tiền nội bộ gần như bằng 0. Đó là lý do gần như mọi ví đều đi cùng một con đường sang tín dụng.",
      },
      {
        question:
          "Một công ty công bố 'GMV tăng 80%' nhưng doanh thu chỉ tăng 12%. Cách đọc hợp lý nhất là gì?",
        options: [
          "Take rate đang giảm - phần tăng trưởng đến từ sản phẩm biên mỏng",
          "Công ty đang giấu doanh thu để giảm nghĩa vụ thuế phải nộp trong kỳ",
          "GMV và doanh thu không liên quan gì đến nhau nên không so sánh được",
          "Số liệu chắc chắn có lỗi, vì doanh thu phải tăng cùng nhịp với GMV",
        ],
        correct: 0,
        explanation:
          "Doanh thu = GMV × take rate. GMV tăng nhanh hơn doanh thu nghĩa là take rate bình quân đang mỏng đi, thường vì tăng trưởng đến từ mảng phí thấp hoặc vì phải giảm giá để giành thị phần.",
      },
    ],
    keyTakeaways: [
      "Doanh thu = khối lượng giao dịch × take rate. Khối lượng là con số lên tiêu đề, take rate mới là con số quyết định.",
      "Doanh thu gộp trừ phần trả cho ngân hàng và tổ chức thẻ mới ra doanh thu ròng - chỉ so sánh được ở mức ròng.",
      "Thanh toán có take rate mỏng, tín dụng dày hơn hàng chục lần; gần như mọi ví đều đi theo con đường đó.",
      "GMV tăng nhanh hơn doanh thu là dấu hiệu take rate đang bị bào mòn.",
    ],
    summary: {
      keyIdea: "Doanh thu = khối lượng giao dịch × take rate, và con số thứ hai mới quyết định mô hình",
      formula: "Doanh thu ròng = GMV × take rate − chi phí trả cho ngân hàng và tổ chức thẻ",
      commonMistake: "So sánh hai công ty bằng doanh thu gộp, trong khi phần trả cho đối tác khác nhau rất xa.",
      action: "Lấy báo cáo một fintech niêm yết, chia doanh thu cho GMV và xem take rate đó đang tăng hay giảm qua bốn quý.",
    },
    application: {
      title: "Tính take rate của một sản phẩm bạn dùng",
      message: "Chọn một ví hoặc sàn bạn đang dùng, tìm biểu phí công khai, rồi ước lượng họ giữ lại bao nhiêu phần trăm trên mỗi giao dịch sau khi trả cho ngân hàng.",
      secondary: "Nếu con số dưới 0,5%, mô hình đó phải sống bằng khối lượng cực lớn hoặc bằng một sản phẩm khác.",
    },
    sections: [
      {
        type: "lead",
        text: "Mọi công ty fintech đều thích nói về khối lượng giao dịch, vì nó là con số lớn nhất họ có. Nhưng khối lượng chảy qua nền tảng không phải tiền của nền tảng - phần giữ lại mới là.",
      },
      { type: "heading", text: "Take rate là gì" },
      {
        type: "paragraph",
        text: "Take rate là tỷ lệ giữa doanh thu và khối lượng giao dịch. Một ví xử lý 10.000 tỷ đồng với take rate 0,4% có doanh thu 40 tỷ. Con số 10.000 tỷ là tiền của người dùng đi từ tài khoản này sang tài khoản khác; công ty chỉ chạm vào 0,4% của nó.",
      },
      {
        type: "formula",
        title: "Doanh thu của một nền tảng thanh toán",
        equation: "Doanh thu = TPV × take rate",
        variables: [
          { symbol: "TPV", name: "Total Payment Volume", description: "tổng giá trị giao dịch chảy qua nền tảng trong kỳ" },
          { symbol: "take rate", name: "tỷ lệ giữ lại", description: "phần nền tảng giữ được trên mỗi đồng giao dịch" },
        ],
        example: {
          title: "Ví điện tử cỡ trung",
          calculation: "12.000 tỷ × 0,35%",
          result: "42 tỷ đồng doanh thu gộp",
          explanation:
            "Nếu 40% số này phải chia cho ngân hàng liên kết, doanh thu ròng chỉ còn khoảng 25 tỷ - và đó mới là con số so sánh được với một công ty khác.",
        },
      },
      { type: "heading", text: "Bốn nguồn, bốn mức biên rất khác nhau" },
      {
        type: "conceptTable",
        title: "Doanh thu của sản phẩm tài chính số đến từ đâu",
        concepts: [
          { vi: "Phí giao dịch", en: "Transaction fee", def: "Thu trên mỗi lần chuyển tiền, thanh toán, nạp rút. Biên mỏng, thường dưới 1%, và phần lớn phải chia lại cho ngân hàng." },
          { vi: "Chênh lệch lãi", en: "Net interest spread", def: "Lãi cho vay trừ chi phí vốn. Biên dày nhất nhưng đi kèm rủi ro tín dụng - phần lãi cao là để bù cho khoản không đòi được." },
          { vi: "Hoa hồng phân phối", en: "Distribution commission", def: "Bán bảo hiểm, chứng chỉ quỹ, vé máy bay qua ứng dụng. Không chịu rủi ro vốn, nhưng phụ thuộc vào lưu lượng người dùng sẵn có." },
          { vi: "Phí thuê bao", en: "SaaS / subscription", def: "Thu cố định theo tháng từ doanh nghiệp dùng hạ tầng. Đều đặn và dễ dự báo nhất, nhưng bán chậm và cần đội bán hàng riêng." },
        ],
      },
      {
        type: "callout",
        label: "Chỗ hay bị nhầm",
        text: "Đọc báo cáo của một công ty fintech, luôn tìm doanh thu ròng chứ không dừng ở doanh thu gộp. Với thanh toán thẻ, phần lớn phí thu của khách chảy thẳng sang tổ chức phát hành thẻ dưới dạng interchange và không bao giờ thuộc về công ty.",
      },
      {
        type: "closing",
        lines: [
          "Take rate nhân khối lượng ra doanh thu - và trong hai số đó, số nhỏ mới là số bạn kiểm soát được.",
          "Một nền tảng muốn tăng doanh thu chỉ có hai đường: đẩy khối lượng lên, hoặc chuyển người dùng sang sản phẩm có biên dày hơn. Bài sau nói về cái giá của đường thứ nhất.",
        ],
      },
    ],
  },

  {
    id: 1702,
    slug: "fintech-cac-ltv-va-thoi-gian-hoan-von",
    title: "FinTech, Bài 2: CAC, LTV và thời gian hoàn vốn - mỗi khách hàng lãi hay lỗ",
    subtitle: "Cách tính chi phí có được một khách hàng, giá trị họ mang lại, và vì sao tỷ lệ LTV/CAC nói ít hơn thời gian hoàn vốn",
    duration: "11 phút",
    difficulty: "Trung bình",
    emoji: "🎯",
    track: "professional",
    whyItMatters:
      "Một sản phẩm có thể tăng trưởng rất nhanh và vẫn phá sản, nếu mỗi khách hàng mới lấy đi nhiều tiền hơn số họ mang lại. Đây là phép tính quyết định điều đó, và là phép tính nhà đầu tư hỏi đầu tiên khi xem một vòng gọi vốn.",
    openingQuestion:
      "Công ty chi 5 tỷ marketing trong quý và có thêm 25.000 khách hàng, trong đó 5.000 người đến tự nhiên không qua quảng cáo. CAC là bao nhiêu?",
    openingOptions: [
      "250.000 đồng",
      "200.000 đồng",
      "1.000.000 đồng",
      "Không tính được nếu chưa biết bao nhiêu khách trong số đó còn hoạt động sau ba tháng",
    ],
    correctOption: 0,
    explanation:
      "CAC chỉ chia cho số khách hàng mà chi phí đó thực sự mang về: 5 tỷ / 20.000 = 250.000 đồng. Chia cho cả 25.000 sẽ ra 200.000 và làm CAC trông đẹp hơn thực tế, vì 5.000 người kia đến mà không tốn đồng nào - họ không phải thành quả của khoản chi. Đây là cách làm đẹp số liệu phổ biến nhất trong bộ chỉ số tăng trưởng, và cũng là chỗ đầu tiên một nhà đầu tư có kinh nghiệm sẽ hỏi lại. Quy tắc: tử số chỉ gồm chi phí thực sự nhằm thu hút khách hàng mới, mẫu số chỉ gồm khách hàng đến từ những chi phí đó.",
    diagram: [
      { label: "Chi phí marketing + bán hàng", arrow: true },
      { label: "÷ số khách mới do chi phí đó mang về", arrow: true },
      { label: "CAC", arrow: true },
      { label: "So với lợi nhuận gộp mỗi khách mỗi tháng", arrow: true },
      { label: "Số tháng hoàn vốn" },
    ],
    interactiveType: "cash-flow-simulator",
    realWorldExample: {
      company: "Các ứng dụng cho vay tiêu dùng tại Việt Nam giai đoạn 2019-2022",
      description:
        "Nhiều ứng dụng chi 300.000-800.000 đồng để có một người vay lần đầu, trong khi khoản vay đầu tiên chỉ 2-3 triệu đồng và lãi thu được trong kỳ đó chưa tới 200.000 đồng. Mô hình chỉ hoà vốn nếu người vay quay lại lần hai và lần ba - nên toàn bộ bài toán chuyển từ 'giành khách' sang 'giữ khách', và những công ty không kịp nhận ra đã đóng cửa.",
    },
    quiz: [
      {
        question: "Mẫu số của CAC gồm những khách hàng nào?",
        options: [
          "Chỉ khách hàng mới đến từ chi phí thu hút đã bỏ ra",
          "Mọi khách hàng mới trong kỳ",
          "Toàn bộ khách hàng đang hoạt động tại thời điểm cuối kỳ báo cáo",
          "Khách hàng mới đã phát sinh ít nhất một giao dịch có thu phí",
        ],
        correct: 0,
        explanation:
          "Gộp cả khách đến tự nhiên vào mẫu số sẽ kéo CAC xuống thấp giả tạo. Người đến mà không tốn chi phí không phải thành quả của khoản chi đó.",
      },
      {
        question: "LTV được tính từ đâu?",
        options: [
          "Lợi nhuận gộp mỗi khách, không phải doanh thu",
          "Doanh thu trung bình mỗi khách nhân với số tháng họ ở lại",
          "Tổng tiền khách đã nạp vào ví",
          "Giá trị giao dịch bình quân nhân số lần giao dịch mỗi tháng",
        ],
        correct: 0,
        explanation:
          "Dùng doanh thu thay vì lợi nhuận gộp sẽ thổi phồng LTV đúng bằng phần chi phí phục vụ - với fintech, chi phí xử lý giao dịch và chi phí rủi ro không hề nhỏ.",
      },
      {
        question: "Vì sao thời gian hoàn vốn quan trọng hơn tỷ lệ LTV/CAC?",
        options: [
          "Vì LTV trải trên nhiều năm, còn tiền mặt thì phải chi ngay hôm nay",
          "Vì LTV/CAC là chỉ số không có trong chuẩn mực kế toán nên không đáng tin",
          "Vì thời gian hoàn vốn dễ tính hơn và không cần dữ liệu lịch sử",
          "Vì nhà đầu tư quốc tế chỉ chấp nhận chỉ số tính theo tháng",
        ],
        correct: 0,
        explanation:
          "LTV/CAC bằng 3 nghe rất khoẻ, nhưng nếu phải mất 30 tháng mới thu hồi được CAC thì công ty phải nuôi khoản chi đó bằng vốn suốt 30 tháng. Đó là lý do một công ty có LTV/CAC đẹp vẫn có thể hết tiền.",
      },
      {
        question:
          "CAC 250.000 đồng, lợi nhuận gộp 25.000 đồng mỗi khách mỗi tháng. Bao lâu hoàn vốn?",
        options: [
          "10 tháng (= 250.000 / 25.000)",
          "6 tháng (chia cho doanh thu)",
          "25 tháng (nhầm đơn vị)",
          "Không đủ dữ liệu để tính",
        ],
        correct: 0,
        explanation:
          "250.000 / 25.000 = 10 tháng. Tỷ lệ rời bỏ ảnh hưởng tới LTV, nhưng thời gian hoàn vốn chỉ cần lợi nhuận gộp hằng tháng của người còn ở lại.",
      },
      {
        question: "Dấu hiệu nào cho thấy tăng trưởng đang được mua bằng tiền chứ không phải bằng sản phẩm?",
        options: [
          "CAC tăng đều qua từng quý trong khi LTV đứng yên",
          "Người dùng hoạt động tăng nhanh hơn lượt tải",
          "Chi phí marketing tăng chậm hơn doanh thu",
          "Tỷ lệ quay lại tháng thứ hai cao hơn quý trước",
        ],
        correct: 0,
        explanation:
          "CAC leo thang trong khi giá trị mỗi khách không đổi nghĩa là những khách dễ thuyết phục đã hết, và công ty đang trả giá cao dần cho nhóm khách kém phù hợp hơn.",
      },
    ],
    keyTakeaways: [
      "CAC = chi phí thu hút / số khách mà chi phí đó mang về. Đừng gộp khách đến tự nhiên vào mẫu số.",
      "LTV tính trên lợi nhuận gộp, không phải doanh thu - nếu không thì chi phí phục vụ biến mất khỏi phép tính.",
      "Thời gian hoàn vốn nói nhiều hơn tỷ lệ LTV/CAC, vì nó nói về tiền mặt chứ không phải về một con số nhiều năm.",
      "CAC tăng dần trong khi LTV đứng yên là dấu hiệu nhóm khách dễ đã cạn.",
    ],
    summary: {
      keyIdea: "Thời gian hoàn vốn nói nhiều hơn tỷ lệ LTV/CAC, vì nó nói về tiền mặt",
      formula: "Thời gian hoàn vốn = CAC / lợi nhuận gộp mỗi khách mỗi tháng",
      commonMistake: "Tính LTV trên doanh thu thay vì lợi nhuận gộp, khiến chi phí phục vụ biến mất khỏi phép tính.",
      action: "Với một sản phẩm bạn biết, ước lượng CAC và lợi nhuận gộp mỗi tháng, rồi chia ra số tháng hoàn vốn.",
    },
    application: {
      title: "Kiểm tra mẫu số của CAC",
      message: "Khi đọc một con số CAC, hỏi ngay: mẫu số có gồm cả khách đến tự nhiên không. Nếu có, con số đó thấp hơn thực tế và mọi kết luận dựa trên nó đều lệch.",
      secondary: "CAC tăng dần trong khi LTV đứng yên là dấu hiệu nhóm khách dễ đã cạn.",
    },
    sections: [
      {
        type: "lead",
        text: "Tăng trưởng người dùng là thứ dễ mua nhất trong kinh doanh: chỉ cần chi đủ tiền. Câu hỏi duy nhất đáng hỏi là mỗi người mua về có trả lại nhiều hơn số đã bỏ ra hay không, và trong bao lâu.",
      },
      { type: "heading", text: "CAC: cái giá của một khách hàng" },
      {
        type: "paragraph",
        text: "CAC gồm toàn bộ chi phí nhằm có thêm khách hàng mới - quảng cáo, khuyến mãi, thưởng giới thiệu, lương đội tăng trưởng - chia cho số khách hàng mà những chi phí đó thực sự mang về. Chỗ dễ sai nằm ở mẫu số: cộng cả những người tự tìm đến sẽ làm CAC trông thấp hơn thực tế.",
      },
      { type: "heading", text: "LTV: khách hàng trả lại bao nhiêu" },
      {
        type: "formula",
        title: "Giá trị vòng đời khách hàng",
        equation: "LTV = lợi nhuận gộp mỗi tháng × số tháng ở lại",
        variables: [
          { symbol: "lợi nhuận gộp", name: "doanh thu trừ chi phí phục vụ", description: "gồm cả chi phí xử lý giao dịch và chi phí rủi ro" },
          { symbol: "số tháng ở lại", name: "vòng đời trung bình", description: "nghịch đảo của tỷ lệ rời bỏ hằng tháng" },
        ],
        example: {
          title: "Người dùng một ví điện tử",
          calculation: "18.000 đ/tháng × 24 tháng",
          result: "LTV ≈ 432.000 đồng",
          explanation: "Nếu CAC là 250.000 thì tỷ lệ LTV/CAC là 1,7 - dưới mức 3 mà phần lớn quỹ coi là ngưỡng lành mạnh.",
        },
      },
      {
        type: "comparison",
        left: { label: "LTV/CAC = 3", text: "Nghe khoẻ, nhưng không nói gì về việc tiền quay lại lúc nào. Ba năm hay ba tháng đều cho ra cùng con số này." },
        right: { label: "Hoàn vốn 10 tháng", text: "Nói thẳng: công ty phải nuôi mỗi khách hàng bằng vốn trong 10 tháng trước khi họ bắt đầu đóng góp." },
      },
      {
        type: "callout",
        label: "Vì sao một công ty tăng trưởng tốt vẫn hết tiền",
        text: "Vì CAC được chi ngay hôm nay còn LTV rải ra nhiều năm. Càng tăng trưởng nhanh, khoảng cách giữa hai dòng tiền đó càng rộng - đây là lý do những công ty gọi vốn liên tục thường là những công ty đang lớn nhanh nhất, không phải những công ty yếu nhất.",
      },
      {
        type: "closing",
        lines: [
          "Ba con số phải đọc cùng nhau: CAC, lợi nhuận gộp mỗi khách, và số tháng hoàn vốn.",
          "Nếu chỉ được hỏi một câu về một sản phẩm fintech, hãy hỏi câu thứ ba.",
        ],
      },
    ],
  },

  {
    id: 1703,
    slug: "fintech-so-du-vi-float-va-tien-cua-khach",
    title: "FinTech, Bài 3: Số dư ví và float - tiền của khách nằm ở đâu, ai hưởng lãi",
    subtitle: "Vì sao tiền trong ví không phải doanh thu, không phải tài sản của công ty, và vì sao quy định bắt tách riêng",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🏦",
    track: "professional",
    whyItMatters:
      "Số dư khách để trong ví là khoản lớn nhất trên bảng cân đối của nhiều công ty fintech, và cũng là khoản bị hiểu sai nhiều nhất. Hiểu sai nó dẫn tới hai hậu quả rất khác nhau: một là định giá sai công ty, hai là vi phạm quy định về tài khoản đảm bảo thanh toán.",
    openingQuestion: "Người dùng để tổng cộng 2.000 tỷ đồng trong ví. Khoản này ghi nhận thế nào?",
    openingOptions: [
      "Nợ phải trả - tiền của khách, công ty phải trả lại bất cứ lúc nào",
      "Doanh thu chưa thực hiện, phân bổ dần theo thời gian khách để tiền",
      "Vốn chủ sở hữu, vì tiền đang nằm trong tài khoản của công ty",
      "Tài sản của công ty, vì công ty là bên đứng tên tài khoản tại ngân hàng",
    ],
    correctOption: 0,
    explanation:
      "Số dư ví là nợ phải trả. Công ty đang giữ hộ, và khách có quyền rút bất cứ lúc nào - về bản chất giống hệt tiền gửi không kỳ hạn ở ngân hàng, chỉ khác là công ty fintech không được phép đem nó đi cho vay. Ở Việt Nam, Ngân hàng Nhà nước yêu cầu toàn bộ số dư ví phải được đảm bảo bằng một tài khoản riêng tại ngân hàng thương mại, số dư tài khoản đó không được thấp hơn tổng số dư của khách tại mọi thời điểm. Nghĩa là công ty không được dùng tiền này để trả lương, chạy quảng cáo hay bù lỗ - kể cả khi đang thiếu tiền mặt trầm trọng.",
    diagram: [
      { label: "Khách nạp tiền vào ví", arrow: true },
      { label: "Tài sản: tiền tại tài khoản đảm bảo thanh toán", arrow: true },
      { label: "Nợ phải trả: số dư của khách - hai bên luôn khớp nhau", arrow: true },
      { label: "Lãi sinh ra từ tài khoản đó = thu nhập của công ty" },
    ],
    interactiveType: "money-vs-asset",
    realWorldExample: {
      company: "Thông tư 23/2019 và các thông tư sửa đổi của Ngân hàng Nhà nước",
      description:
        "Quy định buộc tổ chức cung ứng dịch vụ ví điện tử mở tài khoản đảm bảo thanh toán riêng và duy trì số dư không thấp hơn tổng số dư ví của khách hàng. Đây là hàng rào dựng lên sau những vụ đổ vỡ ở các thị trường khác, nơi công ty trung gian thanh toán tiêu vào tiền khách rồi mất khả năng chi trả khi có làn sóng rút tiền.",
    },
    quiz: [
      {
        question: "Số dư ví của khách được ghi nhận ở đâu trên bảng cân đối?",
        options: [
          "Nợ phải trả với khách hàng",
          "Doanh thu trong kỳ",
          "Tài sản ngắn hạn của công ty",
          "Vốn chủ sở hữu, phần thặng dư",
        ],
        correct: 0,
        explanation:
          "Công ty giữ hộ và có nghĩa vụ trả lại bất cứ lúc nào, nên đây là nợ phải trả. Tiền tương ứng nằm bên tài sản dưới dạng số dư tại tài khoản đảm bảo thanh toán.",
      },
      {
        question: "Float của một ví điện tử sinh ra thu nhập bằng cách nào?",
        options: [
          "Lãi sinh ra từ số dư khách gửi nằm tại ngân hàng",
          "Phí khách trả khi rút tiền khỏi ví",
          "Chênh lệch giữa số tiền nạp vào và số tiền khách đã tiêu",
          "Phần số dư khách bỏ quên quá lâu được ghi thành doanh thu",
        ],
        correct: 0,
        explanation:
          "Tiền nằm ở tài khoản đảm bảo thanh toán vẫn sinh lãi, và lãi đó thuộc về công ty. Với số dư lớn, đây có thể là dòng thu nhập đáng kể mà không cần bán thêm gì.",
      },
      {
        question: "Vì sao công ty ví điện tử không được dùng số dư khách để chi tiêu?",
        options: [
          "Vì quy định buộc duy trì tài khoản đảm bảo không thấp hơn tổng số dư ví",
          "Vì phần lớn khách hàng sẽ rút toàn bộ tiền ra ngay trong cùng ngày",
          "Vì ngân hàng thương mại không cho phép rút tiền khỏi tài khoản này",
          "Vì chi phí chuyển tiền giữa các tài khoản quá cao so với lợi ích thu về",
        ],
        correct: 0,
        explanation:
          "Đây là ràng buộc pháp lý, không phải lựa chọn kinh doanh. Hàng rào này dựng lên sau những vụ trung gian thanh toán tiêu vào tiền khách rồi mất khả năng chi trả.",
      },
      {
        question: "Vì sao float lớn không làm công ty đáng giá hơn theo tỷ lệ tương ứng?",
        options: [
          "Vì mỗi đồng float đi kèm đúng một đồng nghĩa vụ trả lại",
          "Vì float bị đánh thuế ở mức cao hơn các nguồn thu khác",
          "Vì float không được tính vào tổng tài sản khi định giá công ty",
          "Vì float biến động theo mùa nên không thể đưa vào mô hình dự báo",
        ],
        correct: 0,
        explanation:
          "Float làm cả hai bên bảng cân đối phình ra cùng lúc, nên giá trị ròng không đổi. Thứ đáng giá là dòng lãi sinh ra từ nó, không phải bản thân con số.",
      },
      {
        question: "Số dư ví tăng gấp đôi trong một quý. Điều này nói lên gì?",
        options: [
          "Khách để tiền lại lâu hơn hoặc số người dùng tăng - chưa nói gì về doanh thu",
          "Doanh thu của công ty trong quý đó cũng tăng khoảng gấp đôi",
          "Công ty vừa được cấp thêm hạn mức vốn từ ngân hàng đối tác",
          "Lợi nhuận sẽ tăng tương ứng ngay trong kỳ báo cáo kế tiếp",
        ],
        correct: 0,
        explanation:
          "Float là một chỉ báo về hành vi người dùng, không phải một dòng doanh thu. Doanh thu chỉ tăng nếu số tiền đó được đem đi giao dịch, hoặc gián tiếp qua phần lãi thu thêm.",
      },
    ],
    keyTakeaways: [
      "Số dư ví là nợ phải trả, không phải doanh thu và không phải tài sản thuộc về công ty.",
      "Tiền tương ứng nằm ở tài khoản đảm bảo thanh toán riêng, và quy định cấm dùng nó cho hoạt động của công ty.",
      "Thu nhập thật từ float là phần lãi sinh ra, không phải bản thân số dư.",
      "Float phình lên làm cả hai bên bảng cân đối phình theo, giá trị ròng không đổi.",
    ],
    summary: {
      keyIdea: "Số dư ví là nợ phải trả người dùng, không phải doanh thu và không phải vốn của công ty",
      commonMistake: "Đọc tổng tài sản đang phình lên như dấu hiệu sức khoẻ, trong khi phần lớn là nghĩa vụ với khách.",
      action: "Mở báo cáo một công ty ví, tách số dư người dùng ra khỏi tài sản của công ty và xem phần còn lại lớn tới đâu.",
    },
    application: {
      title: "Tách hai dòng thu nhập",
      message: "Với một fintech bạn quan tâm, tách thu nhập từ lãi trên số dư khách ra khỏi thu nhập từ phí dịch vụ. Rồi hỏi: nếu lãi suất giảm một nửa, mô hình này còn lãi không.",
      secondary: "Nhiều mô hình ví chỉ có lãi trong môi trường lãi suất cao, và điều đó không hiện ra ở dòng doanh thu tổng.",
    },
    sections: [
      {
        type: "lead",
        text: "Với nhiều công ty fintech, con số lớn nhất trên bảng cân đối không phải tài sản của họ. Đó là tiền của khách, và toàn bộ nghề nghiệp của người làm tài chính sản phẩm là không bao giờ lẫn lộn hai thứ đó.",
      },
      { type: "heading", text: "Float là gì" },
      {
        type: "paragraph",
        text: "Float là tổng số tiền người dùng để lại trong ví, chưa tiêu và chưa rút. Nó xuất hiện đồng thời ở hai bên bảng cân đối: bên tài sản là số dư tại tài khoản đảm bảo thanh toán, bên nguồn vốn là nghĩa vụ trả lại cho khách. Hai bên luôn khớp, nên float lớn không tự nó làm công ty giàu hơn.",
      },
      { type: "heading", text: "Vì sao quy định bắt tách riêng" },
      {
        type: "list",
        items: [
          "Tiền khách không được nằm chung với tiền hoạt động của công ty.",
          "Số dư tài khoản đảm bảo phải luôn ít nhất bằng tổng số dư ví của mọi khách hàng.",
          "Không được đem cho vay - đó là ranh giới phân biệt một ví điện tử với một ngân hàng.",
          "Bị kiểm tra và đối chiếu định kỳ, vì đây là chỗ dễ vi phạm nhất khi công ty cạn tiền.",
        ],
      },
      {
        type: "callout",
        label: "Chỗ float thực sự có giá trị",
        text: "Không phải ở con số, mà ở phần lãi nó sinh ra và ở việc tiền nằm sẵn trong ví làm giao dịch tiếp theo dễ xảy ra hơn. Một người có 500.000 đồng trong ví sẽ thanh toán bằng ví thay vì mở ứng dụng ngân hàng - và mỗi giao dịch đó mới là doanh thu.",
      },
      {
        type: "heading",
        text: "Vì sao float đáng chú ý hơn con số của nó"
      },
      {
        type: "paragraph",
        text: "Giả sử một ví điện tử giữ 1.000 tỷ số dư của người dùng và gửi toàn bộ ở ngân hàng với lãi suất 4% một năm. Riêng khoản lãi đó là 40 tỷ mỗi năm, không cần thêm một giao dịch nào. Nếu công ty thu phí 0,5% trên giá trị giao dịch, phải xử lý 8.000 tỷ giao dịch mới tạo ra doanh thu tương đương. Với nhiều mô hình ví, thu nhập từ float lớn hơn thu nhập từ phí - nên đọc báo cáo mà không tách hai dòng này ra thì hiểu sai hẳn nguồn lợi nhuận của doanh nghiệp."
      },
      {
        type: "callout",
        label: "Và vì sao quy định bắt tách riêng",
        text: "Số dư ví xuất hiện đồng thời ở hai chỗ trên bảng cân đối: một tài sản là tiền gửi tại ngân hàng, và một khoản NỢ PHẢI TRẢ người dùng đúng bằng như vậy. Nó không phải doanh thu và không phải vốn của công ty. Quy định vì thế buộc ba điều: tiền khách không được nằm chung với tiền hoạt động, số dư tài khoản đảm bảo phải luôn bằng hoặc lớn hơn tổng nghĩa vụ với người dùng, và không được dùng khoản đó để cho vay hay đầu tư rủi ro. Lý do rất cụ thể - nếu công ty phá sản, tiền đó phải còn nguyên và không được xếp chung với tài sản đem chia cho chủ nợ."
      },
      {
        type: "comparison",
        left: {
          label: "Đọc một fintech đúng cách",
          text: "Tách số dư ví khỏi tài sản của công ty, tách thu nhập từ float khỏi thu nhập từ phí, rồi hỏi: nếu lãi suất giảm một nửa thì mô hình này còn lãi không. Nhiều mô hình chỉ có lãi trong môi trường lãi suất cao."
        },
        right: {
          label: "Cái bẫy khi đọc nhanh",
          text: "Tổng tài sản trông rất lớn và tăng nhanh, nhưng phần lớn là nợ phải trả người dùng. Tốc độ tăng của nó đo mức độ phổ biến của sản phẩm, không đo sức khoẻ tài chính - và nó có thể rút đi nhanh hơn bất kỳ nguồn vốn nào khác."
        }
      },
      {
        type: "closing",
        lines: [
          "Float là tiền của người khác đi qua tay bạn.",
          "Đọc báo cáo một công ty fintech, tách được số dư ví ra khỏi doanh thu là đã tránh được phần lớn cách hiểu sai về mô hình này.",
        ],
      },
    ],
  },

  {
    id: 1704,
    slug: "fintech-cho-vay-so-va-chi-phi-rui-ro",
    title: "FinTech, Bài 4: Cho vay số - duyệt trong ba giây và cái giá của nó",
    subtitle: "Chi phí rủi ro tín dụng trong mô hình cho vay qua ứng dụng, và vì sao lãi suất cao không đồng nghĩa lợi nhuận cao",
    duration: "12 phút",
    difficulty: "Khó",
    emoji: "⚡",
    track: "professional",
    whyItMatters:
      "Cho vay là nơi biên lợi nhuận của fintech dày nhất và cũng là nơi công ty chết nhanh nhất. Biết cách trừ chi phí rủi ro ra khỏi lãi thu được là khác biệt giữa một sản phẩm sinh lời và một sản phẩm chỉ trông có vẻ sinh lời trong hai quý đầu.",
    openingQuestion:
      "Khoản vay lãi 40%/năm, chi phí vốn 12%, chi phí vận hành 6%, tỷ lệ mất vốn 25%. Biên còn lại bao nhiêu?",
    openingOptions: [
      "−3%",
      "22%",
      "40%",
      "Không tính được nếu chưa biết kỳ hạn trung bình của khoản vay",
    ],
    correctOption: 0,
    explanation:
      "40 − 12 − 6 − 25 = −3%. Sản phẩm này lỗ, dù lãi suất niêm yết nghe rất cao. Đây là hiểu lầm cốt lõi về cho vay tiêu dùng số: lãi suất cao không phải là lợi nhuận cao, nó là giá phải trả để bù cho tỷ lệ mất vốn cao. Một sản phẩm lãi 40% với tỷ lệ mất vốn 25% kém hơn hẳn một sản phẩm lãi 18% với tỷ lệ mất vốn 3%. Chính vì thế, chỉ số quan trọng nhất của một đội cho vay số không phải doanh số giải ngân mà là chi phí rủi ro - và nó chỉ lộ ra sau vài tháng, đúng lúc công ty đã giải ngân xong một tập lớn.",
    diagram: [
      { label: "Lãi và phí thu được", arrow: true },
      { label: "− chi phí vốn", arrow: true },
      { label: "− chi phí vận hành và thu hồi nợ", arrow: true },
      { label: "− chi phí rủi ro (phần không đòi được)", arrow: true },
      { label: "Biên đóng góp thật của sản phẩm" },
    ],
    interactiveType: "risk",
    realWorldExample: {
      company: "Làn sóng ứng dụng cho vay tiêu dùng 2019-2022",
      description:
        "Hàng chục ứng dụng vào thị trường với lãi suất hiệu dụng rất cao và quy trình duyệt vài phút. Phần lớn tăng trưởng dư nợ rất nhanh trong năm đầu - vì nợ xấu chưa kịp xuất hiện - rồi biến mất khi tập vay đầu tiên đến hạn và tỷ lệ mất vốn hiện ra đúng bản chất của nó.",
    },
    quiz: [
      {
        question: "Chi phí rủi ro trong một sản phẩm cho vay là gì?",
        options: [
          "Phần dư nợ dự kiến không thu hồi được",
          "Phí trả cho bên chấm điểm tín dụng",
          "Lãi phải trả cho nguồn vốn công ty đi vay để cho vay lại",
          "Khoản dự phòng bắt buộc phải nộp cho cơ quan quản lý theo quy định",
        ],
        correct: 0,
        explanation:
          "Chi phí rủi ro là phần mất đi vì khách không trả. Lãi trả cho nguồn vốn là chi phí vốn - một khoản hoàn toàn khác và phải trừ riêng.",
      },
      {
        question: "Sản phẩm nào tốt hơn: lãi 45% mất vốn 28%, hay lãi 20% mất vốn 4%?",
        options: [
          "Cái thứ hai, biên trước chi phí khác là 16% so với 17%… nhưng ổn định hơn nhiều",
          "Cái thứ nhất, vì lãi suất cao hơn gấp đôi",
          "Bằng nhau, vì rủi ro cao luôn đi kèm lợi nhuận cao tương ứng",
          "Cái thứ nhất, vì tỷ lệ mất vốn có thể giảm dần khi mô hình chấm điểm học thêm",
        ],
        correct: 0,
        explanation:
          "Hai biên gần bằng nhau (17% và 16%), nhưng sản phẩm thứ nhất chỉ cần tỷ lệ mất vốn xấu thêm vài điểm là lỗ, còn sản phẩm thứ hai chịu được sai số lớn hơn nhiều lần.",
      },
      {
        question: "Vì sao tỷ lệ nợ xấu của một danh mục đang tăng trưởng nhanh trông thấp giả tạo?",
        options: [
          "Vì mẫu số phình nhanh hơn tốc độ khoản vay cũ kịp hỏng",
          "Vì khoản vay mới luôn có chất lượng tín dụng tốt hơn khoản vay cũ",
          "Vì chuẩn mực kế toán cho phép hoãn ghi nhận nợ xấu trong hai quý đầu",
          "Vì khách hàng mới thường trả đúng hạn hơn để xây dựng lịch sử tín dụng",
        ],
        correct: 0,
        explanation:
          "Nợ xấu cần thời gian để lộ ra, còn dư nợ thì tăng ngay. Chia một tử số chậm cho một mẫu số nhanh luôn cho ra tỷ lệ đẹp - cho tới khi tăng trưởng chậm lại.",
      },
      {
        question: "Cách đọc đúng chất lượng tín dụng của một danh mục đang lớn nhanh là gì?",
        options: [
          "Theo dõi từng tập vay theo tháng giải ngân",
          "Nợ quá hạn chia tổng dư nợ",
          "So sánh tỷ lệ nợ xấu với trung bình ngành trong cùng giai đoạn",
          "Đợi hết năm tài chính rồi tính trên số liệu đã được kiểm toán xác nhận",
        ],
        correct: 0,
        explanation:
          "Phân tích theo tập giải ngân (vintage) so những khoản vay cùng tuổi với nhau, nên tăng trưởng không che được xu hướng. Đây là công cụ chuẩn của mọi đội rủi ro tín dụng.",
      },
      {
        question: "Duyệt vay trong ba giây có thể chấp nhận được khi nào?",
        options: [
          "Khi khoản vay nhỏ tới mức chi phí thẩm định kỹ vượt quá phần mất vốn tiết kiệm được",
          "Khi công ty có đủ vốn để chịu đựng tỷ lệ mất vốn ở bất kỳ mức nào",
          "Khi lãi suất đủ cao để bù cho mọi mức rủi ro có thể xảy ra",
          "Không bao giờ, vì thẩm định tự động luôn kém hơn thẩm định bởi con người",
        ],
        correct: 0,
        explanation:
          "Đây là bài toán đánh đổi chi phí. Với khoản vài triệu đồng, gọi điện xác minh còn tốn hơn số tiền cứu được; với khoản vài trăm triệu thì ngược lại hoàn toàn.",
      },
    ],
    keyTakeaways: [
      "Lãi suất cao là giá của rủi ro cao, không phải dấu hiệu lợi nhuận cao.",
      "Biên thật = lãi thu − chi phí vốn − chi phí vận hành − chi phí rủi ro. Thiếu vế cuối là thiếu vế quyết định.",
      "Danh mục lớn nhanh luôn có tỷ lệ nợ xấu trông đẹp, vì mẫu số chạy nhanh hơn tử số.",
      "Đọc theo tập giải ngân, không đọc theo tổng danh mục.",
    ],
    summary: {
      keyIdea: "Lãi suất cao là giá của rủi ro cao, không phải dấu hiệu lợi nhuận cao",
      formula: "Biên thật = lãi thu − chi phí vốn − chi phí vận hành − chi phí rủi ro",
      commonMistake: "Đọc tỷ lệ nợ xấu trên tổng danh mục đang tăng nhanh - mẫu số chạy nhanh hơn tử số nên con số luôn đẹp.",
      action: "Yêu cầu số liệu theo tập giải ngân từng tháng thay vì theo tổng danh mục, rồi so các tập cùng độ tuổi với nhau.",
    },
    application: {
      title: "Đọc một danh mục cho vay theo tập giải ngân",
      message: "Lấy tỷ lệ quá hạn của các khoản giải ngân tháng 1 khi chúng được sáu tháng tuổi, rồi so với tỷ lệ của tập tháng 6 cũng ở sáu tháng tuổi. Đó là phép so duy nhất có nghĩa.",
      secondary: "Nếu tập sau xấu hơn tập trước ở cùng độ tuổi, chất lượng thẩm định đang đi xuống dù tổng danh mục vẫn trông ổn.",
    },
    sections: [
      {
        type: "lead",
        text: "Cho vay là mảng có biên dày nhất trong fintech, và cũng là mảng khiến nhiều công ty biến mất nhanh nhất. Cả hai điều đó đến từ cùng một con số: phần tiền không đòi được.",
      },
      { type: "heading", text: "Bốn khoản trừ" },
      {
        type: "formula",
        title: "Biên đóng góp của một sản phẩm cho vay",
        equation: "Biên = lãi và phí − chi phí vốn − chi phí vận hành − chi phí rủi ro",
        variables: [
          { symbol: "chi phí vốn", name: "giá của tiền", description: "lãi công ty phải trả cho nguồn vốn đi vay để cho vay lại" },
          { symbol: "chi phí rủi ro", name: "phần mất vốn", description: "tỷ lệ dư nợ dự kiến không thu hồi được" },
        ],
        example: {
          title: "Khoản vay tiêu dùng nhỏ",
          calculation: "40% − 12% − 6% − 25%",
          result: "−3%",
          explanation: "Lãi suất nghe rất cao mà sản phẩm vẫn lỗ. Con số quyết định là 25%, không phải 40%.",
        },
      },
      { type: "heading", text: "Vì sao nợ xấu luôn xuất hiện muộn" },
      {
        type: "paragraph",
        text: "Một khoản vay chỉ hỏng sau vài kỳ trả nợ. Trong khi đó dư nợ tăng ngay khi giải ngân. Chia một tử số đến chậm cho một mẫu số đến nhanh sẽ luôn ra tỷ lệ đẹp, và tỷ lệ đó chỉ xấu đi khi tốc độ tăng trưởng chậm lại - tức là đúng lúc công ty đã giải ngân xong một tập rất lớn.",
      },
      {
        type: "comparison",
        left: { label: "Đọc theo tổng danh mục", text: "Nợ quá hạn / tổng dư nợ. Tăng trưởng nhanh sẽ pha loãng con số này và giấu đi xu hướng thật." },
        right: { label: "Đọc theo tập giải ngân", text: "So các khoản vay cùng tuổi với nhau: tập tháng 3 sau 6 tháng, tập tháng 4 sau 6 tháng. Tăng trưởng không che được gì." },
      },
      {
        type: "callout",
        label: "Câu hỏi để hỏi trong mọi cuộc họp sản phẩm cho vay",
        text: "Không phải 'tháng này giải ngân bao nhiêu' mà 'tập giải ngân tháng thứ sáu trước đang xấu hơn hay tốt hơn tập tháng thứ mười hai trước'. Câu thứ nhất đo tốc độ, câu thứ hai đo chất lượng - và chỉ câu thứ hai báo trước được rắc rối.",
      },
      {
        type: "closing",
        lines: [
          "Một sản phẩm cho vay tốt không phải sản phẩm lãi cao nhất, mà là sản phẩm có khoảng cách rộng nhất giữa lãi thu và chi phí rủi ro.",
          "Và khoảng cách đó chỉ đo được khi những khoản vay đầu tiên đã đủ già.",
        ],
      },
    ],
  },

  {
    id: 1705,
    slug: "fintech-gian-lan-va-chi-phi-chargeback",
    title: "FinTech, Bài 5: Gian lận và chargeback - khoản chi phí không ai đưa vào dự báo",
    subtitle: "Cách gian lận thanh toán ăn vào biên lợi nhuận, và vì sao siết quá tay còn tốn hơn chính khoản mất",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🛡️",
    track: "professional",
    whyItMatters:
      "Với take rate dưới 1%, chỉ cần tỷ lệ gian lận 0,3% là mất một phần ba biên lợi nhuận. Đây là khoản chi phí duy nhất trong fintech mà cả việc kiểm soát quá lỏng lẫn quá chặt đều gây thiệt hại, nên nó phải được quản trị chứ không phải triệt tiêu.",
    openingQuestion:
      "Nền tảng có take rate 0,8% và tỷ lệ gian lận 0,2% trên khối lượng. Gian lận ăn mất bao nhiêu phần biên?",
    openingOptions: [
      "Một phần tư",
      "0,2% - đúng bằng tỷ lệ gian lận",
      "Không đáng kể vì 0,2% là con số rất nhỏ",
      "Không tính được nếu chưa biết số lượng giao dịch trung bình mỗi ngày",
    ],
    correctOption: 0,
    explanation:
      "Gian lận ăn vào khối lượng, còn doanh thu chỉ là một lát mỏng của khối lượng đó - nên phải so hai con số trên cùng một mẫu số. 0,2% chia cho 0,8% bằng 25%: một phần tư biên biến mất. Đây là điều làm gian lận trở thành vấn đề sinh tử với thanh toán mà không phải với bán lẻ thông thường: một cửa hàng có biên 30% mất 0,2% doanh số chỉ mất chưa tới một phần trăm lợi nhuận, còn nền tảng thanh toán mất một phần tư. Cùng một tỷ lệ, hậu quả chênh nhau vài chục lần, chỉ vì biên mỏng.",
    diagram: [
      { label: "Giao dịch gian lận lọt qua", arrow: true },
      { label: "Chủ thẻ khiếu nại với ngân hàng", arrow: true },
      { label: "Chargeback: tiền bị đòi lại", arrow: true },
      { label: "Nền tảng chịu khoản mất + phí xử lý + rủi ro bị nâng mức giám sát" },
    ],
    interactiveType: "sampling",
    realWorldExample: {
      company: "Ngưỡng chargeback của Visa và Mastercard",
      description:
        "Cả hai tổ chức thẻ đều đặt ngưỡng tỷ lệ chargeback, thường quanh 0,9% số giao dịch. Vượt ngưỡng, đơn vị chấp nhận thanh toán bị đưa vào chương trình giám sát, chịu phí phạt theo từng giao dịch và có thể bị ngừng kết nối. Nghĩa là gian lận không chỉ tốn tiền mất - nó có thể tốn cả quyền được hoạt động.",
    },
    quiz: [
      {
        question: "Chargeback là gì?",
        options: [
          "Giao dịch bị đòi lại sau khi chủ thẻ khiếu nại",
          "Phí phạt giao dịch nghi ngờ",
          "Khoản hoàn tiền nền tảng chủ động trả cho khách để giữ quan hệ",
          "Khoản dự phòng trích lập cho các giao dịch có dấu hiệu bất thường",
        ],
        correct: 0,
        explanation:
          "Chargeback là quy trình chủ thẻ khiếu nại với ngân hàng phát hành và tiền bị lấy lại từ bên nhận. Bên bán chịu cả khoản mất lẫn phí xử lý.",
      },
      {
        question: "Vì sao gian lận nguy hiểm với thanh toán hơn với bán lẻ thông thường?",
        options: [
          "Vì biên của thanh toán mỏng nên cùng tỷ lệ mất ăn vào phần lợi nhuận lớn hơn nhiều",
          "Vì giao dịch thanh toán không thể truy vết được sau khi đã hoàn tất",
          "Vì luật Việt Nam buộc nền tảng thanh toán bồi thường gấp đôi giá trị giao dịch",
          "Vì khách hàng của nền tảng thanh toán khiếu nại nhiều hơn khách bán lẻ",
        ],
        correct: 0,
        explanation:
          "Mất 0,2% khối lượng khi take rate là 0,8% nghĩa là mất một phần tư biên. Cửa hàng bán lẻ biên 30% mất cùng tỷ lệ thì gần như không thấy gì.",
      },
      {
        question: "Siết chặt kiểm soát gian lận quá tay gây thiệt hại gì?",
        options: [
          "Chặn nhầm giao dịch thật, mất doanh thu và mất khách",
          "Làm tăng chi phí hạ tầng máy chủ vượt quá phần mất vốn tiết kiệm được",
          "Vi phạm quy định về bảo vệ dữ liệu cá nhân của người dùng",
          "Kéo dài thời gian xử lý giao dịch vượt ngưỡng cho phép của tổ chức thẻ",
        ],
        correct: 0,
        explanation:
          "Tỷ lệ chặn nhầm (false positive) là chi phí thật và thường lớn hơn chính khoản gian lận cứu được. Một khách bị từ chối oan hiếm khi thử lại lần hai.",
      },
      {
        question: "Mức gian lận tối ưu cho một nền tảng là bao nhiêu?",
        options: [
          "Mức mà chi phí chặn thêm một đồng gian lận bắt đầu vượt quá một đồng",
          "Bằng không - mọi giao dịch đáng ngờ đều phải bị chặn lại",
          "Bằng đúng ngưỡng chargeback mà tổ chức thẻ quy định",
          "Bằng mức trung bình của các nền tảng cùng quy mô trên thị trường",
        ],
        correct: 0,
        explanation:
          "Đây là bài toán biên. Đưa gian lận về 0 đòi hỏi siết tới mức chặn nhầm hàng loạt giao dịch thật, và phần doanh thu mất đi sẽ lớn hơn phần cứu được.",
      },
      {
        question: "Vượt ngưỡng chargeback của tổ chức thẻ dẫn tới hậu quả gì nghiêm trọng nhất?",
        options: [
          "Bị giám sát, chịu phí phạt và có thể mất kết nối thanh toán",
          "Bị buộc phải hoàn lại toàn bộ phí đã thu của khách trong kỳ",
          "Bị hạ mức tín nhiệm và tăng chi phí vốn khi vay ngân hàng",
          "Bị yêu cầu tăng vốn điều lệ theo quy định của cơ quan quản lý",
        ],
        correct: 0,
        explanation:
          "Mất kết nối là hậu quả tồi tệ nhất vì nó chấm dứt hoạt động, không chỉ làm giảm lợi nhuận. Đó là lý do quản trị gian lận thuộc nhóm rủi ro sống còn chứ không phải rủi ro chi phí.",
      },
    ],
    keyTakeaways: [
      "Gian lận ăn vào khối lượng, doanh thu chỉ là lát mỏng của khối lượng - phải so trên cùng mẫu số mới thấy mức thiệt hại.",
      "Chargeback lấy đi cả khoản tiền lẫn phí xử lý, và vượt ngưỡng thì mất luôn quyền kết nối.",
      "Chặn nhầm là chi phí thật, thường lớn hơn phần gian lận cứu được.",
      "Mục tiêu không phải gian lận bằng không, mà là mức tối ưu về chi phí biên.",
    ],
    summary: {
      keyIdea: "Mục tiêu không phải gian lận bằng không, mà là mức tối ưu về chi phí biên",
      commonMistake: "So tổn thất gian lận với doanh thu thay vì với khối lượng giao dịch, khiến con số trông nhỏ hơn nhiều lần thực tế.",
      action: "Ước lượng cả hai vế: tiền mất vì gian lận, và doanh thu mất vì giao dịch thật bị chặn nhầm.",
    },
    application: {
      title: "Tìm điểm siết quá tay",
      message: "Với một quy tắc chặn gian lận bất kỳ, hỏi nó chặn được bao nhiêu tiền gian lận và làm mất bao nhiêu giao dịch thật. Nếu vế thứ hai lớn hơn, quy tắc đó đang lỗ.",
      secondary: "Chặn nhầm không xuất hiện trong bất kỳ báo cáo tổn thất nào, nên nó gần như luôn bị bỏ ngoài phép tính.",
    },
    sections: [
      {
        type: "lead",
        text: "Trong mọi mô hình dự báo của một sản phẩm thanh toán, có một dòng gần như luôn bị để trống ở bản đầu tiên: phần tiền sẽ mất vì gian lận. Nó không bao giờ bằng không, và với biên mỏng thì nó không hề nhỏ.",
      },
      { type: "heading", text: "Vì sao một con số nhỏ lại ăn miếng lớn" },
      {
        type: "paragraph",
        text: "Gian lận tính trên khối lượng giao dịch, còn doanh thu chỉ là take rate nhân khối lượng. Với take rate 0,8% và gian lận 0,2%, một phần tư biên biến mất. Cùng tỷ lệ đó ở một cửa hàng bán lẻ biên 30% thì gần như không ai để ý.",
      },
      { type: "heading", text: "Hai chiều đều tốn tiền" },
      {
        type: "comparison",
        left: { label: "Quá lỏng", text: "Gian lận lọt qua, chargeback tăng, phí phạt tăng, và nếu vượt ngưỡng của tổ chức thẻ thì mất kết nối." },
        right: { label: "Quá chặt", text: "Chặn nhầm giao dịch thật. Khách bị từ chối oan hiếm khi quay lại, nên khoản mất này kéo dài chứ không dừng ở một lần." },
      },
      {
        type: "list",
        items: [
          "Đo tỷ lệ gian lận trên khối lượng, không trên số giao dịch - một giao dịch lớn bằng hàng trăm giao dịch nhỏ.",
          "Đo cả tỷ lệ chặn nhầm, nếu không thì mọi cải tiến sẽ chỉ đi theo một hướng là siết chặt hơn.",
          "Theo dõi tỷ lệ chargeback so với ngưỡng của tổ chức thẻ, vì đó là ngưỡng sống còn chứ không phải ngưỡng chi phí.",
          "Đưa chi phí gian lận vào biên đóng góp của sản phẩm ngay từ bản dự báo đầu tiên.",
        ],
      },
      {
        type: "callout",
        label: "Cách đặt mục tiêu đúng",
        text: "Không đặt mục tiêu 'giảm gian lận xuống 0'. Đặt mục tiêu ở mức mà chi phí để chặn thêm một đồng gian lận bắt đầu vượt quá chính đồng đó - phần dưới ngưỡng ấy là khoản mất rẻ hơn khoản chi để tránh nó.",
      },
      {
        type: "closing",
        lines: [
          "Gian lận là chi phí kinh doanh, không phải sự cố.",
          "Sản phẩm nào không có dòng đó trong mô hình thì mô hình đó chưa xong.",
        ],
      },
    ],
  },

  {
    id: 1706,
    slug: "fintech-duong-toi-hoa-von-va-dot-tien",
    title: "FinTech, Bài 6: Đường tới hoà vốn - đốt tiền tới bao giờ thì dừng được",
    subtitle: "Burn rate, runway và cách đọc một kế hoạch tăng trưởng để biết nó dẫn tới hoà vốn hay dẫn tới vòng gọi vốn kế tiếp",
    duration: "11 phút",
    difficulty: "Khó",
    emoji: "🔥",
    track: "professional",
    whyItMatters:
      "Mọi thứ học ở năm bài trước đổ về một câu hỏi duy nhất mà ban điều hành phải trả lời được: với tốc độ hiện tại, còn bao nhiêu tháng nữa hết tiền, và tới lúc đó công ty đã tự nuôi được mình chưa. Người làm tài chính sản phẩm là người dựng ra con số đó.",
    openingQuestion:
      "Công ty còn 120 tỷ tiền mặt, mỗi tháng chi vượt thu 8 tỷ và mức chi vượt thu đang giảm 5% mỗi tháng. Runway khoảng bao lâu?",
    openingOptions: [
      "Dài hơn 15 tháng, vì mức đốt đang giảm dần",
      "Đúng 15 tháng",
      "Ngắn hơn 15 tháng do chi phí luôn phát sinh thêm",
      "Không xác định được nếu chưa biết vòng gọi vốn kế tiếp",
    ],
    correctOption: 0,
    explanation:
      "Phép chia thô 120/8 cho ra 15 tháng, nhưng đó là runway khi mức đốt đứng yên. Nếu mỗi tháng đốt ít đi 5%, tổng số tiền cần cho 15 tháng tới nhỏ hơn 120 tỷ, nên công ty trụ được lâu hơn - và nếu xu hướng giữ nguyên đủ lâu thì có thể không bao giờ chạm đáy. Đây là khác biệt giữa hai câu hỏi rất khác nhau: 'còn bao nhiêu tháng tiền' và 'đường cong đốt tiền đang đi về đâu'. Câu thứ nhất là một phép chia, câu thứ hai là thứ nhà đầu tư thực sự muốn thấy, vì nó nói cho họ biết công ty đang tiến tới tự nuôi được mình hay chỉ đang tiến tới vòng gọi vốn kế tiếp.",
    diagram: [
      { label: "Doanh thu ròng", arrow: true },
      { label: "− chi phí biến đổi theo giao dịch", arrow: true },
      { label: "Biên đóng góp", arrow: true },
      { label: "− chi phí cố định (đội ngũ, hạ tầng)", arrow: true },
      { label: "Mức đốt hằng tháng → runway" },
    ],
    interactiveType: "cash-flow-simulator",
    realWorldExample: {
      company: "Thị trường vốn mạo hiểm Đông Nam Á sau 2022",
      description:
        "Khi lãi suất toàn cầu tăng, dòng vốn mạo hiểm siết lại và câu hỏi từ nhà đầu tư đổi hẳn: từ 'tăng trưởng bao nhiêu phần trăm' sang 'bao giờ hoà vốn'. Hàng loạt công ty phải cắt giảm để kéo dài runway, và những công ty có biên đóng góp dương từ trước là những công ty sống sót mà không cần gọi vốn ở định giá thấp hơn vòng trước.",
    },
    quiz: [
      {
        question: "Biên đóng góp của một sản phẩm là gì?",
        options: [
          "Doanh thu ròng trừ chi phí biến đổi theo từng giao dịch",
          "Doanh thu ròng trừ mọi chi phí",
          "Lợi nhuận sau thuế chia cho tổng số khách hàng đang hoạt động",
          "Phần doanh thu còn lại sau khi trừ chi phí thu hút khách hàng mới",
        ],
        correct: 0,
        explanation:
          "Biên đóng góp chỉ trừ chi phí biến đổi. Nó trả lời câu: mỗi giao dịch thêm vào có bù được chi phí cố định hay không - và nếu âm thì càng bán càng lỗ.",
      },
      {
        question: "Biên đóng góp âm nghĩa là gì?",
        options: [
          "Mỗi đơn vị bán thêm làm khoản lỗ to ra",
          "Công ty chưa đủ quy mô, sẽ hoà vốn khi lớn hơn",
          "Chi phí cố định quá cao so với quy mô",
          "Sản phẩm cần tăng giá khoảng 10% để về mức an toàn",
        ],
        correct: 0,
        explanation:
          "Quy mô chỉ cứu được chi phí cố định. Nếu mỗi giao dịch đã lỗ thì làm nhiều giao dịch hơn chỉ khiến lỗ lớn hơn - đây là cái bẫy 'lớn lên rồi sẽ có lãi'.",
      },
      {
        question: "Runway đo cái gì?",
        options: [
          "Số tháng tiền mặt còn đủ với mức đốt hiện tại",
          "Số tháng cần để đạt điểm hoà vốn theo kế hoạch đã duyệt",
          "Số tháng còn lại cho tới kỳ gọi vốn tiếp theo đã ký cam kết",
          "Số tháng doanh thu đủ bù chi phí cố định của công ty",
        ],
        correct: 0,
        explanation:
          "Runway = tiền mặt / mức đốt hằng tháng. Nó không nói gì về việc bao giờ hoà vốn - đó là một câu hỏi khác và phải trả lời riêng.",
      },
      {
        question: "Vì sao cắt chi phí marketing luôn kéo dài runway ngay lập tức?",
        options: [
          "Vì đó là chi phí trả trước, còn doanh thu từ khách đã có vẫn tiếp tục chảy về",
          "Vì marketing là khoản chi duy nhất công ty có quyền dừng bất cứ lúc nào",
          "Vì khách hàng có được từ marketing thường rời bỏ ngay trong tháng đầu",
          "Vì chi phí marketing thường chiếm hơn một nửa tổng chi phí của công ty",
        ],
        correct: 0,
        explanation:
          "Dừng chi thu hút khách thì dòng tiền ra giảm ngay, trong khi tập khách cũ vẫn tạo doanh thu. Đổi lại là tăng trưởng dừng - nên đây là cách mua thêm thời gian, không phải cách sửa mô hình.",
      },
      {
        question: "Kế hoạch nào cho thấy công ty đang tiến tới tự nuôi được mình?",
        options: [
          "Biên đóng góp dương và đang mở rộng qua từng quý",
          "Doanh thu tăng nhanh hơn tốc độ tăng của tổng chi phí",
          "Số người dùng hoạt động hằng tháng tăng đều trong bốn quý liên tiếp",
          "Runway kéo dài thêm sau khi hoàn tất vòng gọi vốn gần nhất",
        ],
        correct: 0,
        explanation:
          "Chỉ khi biên đóng góp dương thì tăng trưởng mới đưa công ty lại gần hoà vốn. Doanh thu tăng nhanh hơn chi phí có thể chỉ là do cắt giảm, và gọi vốn thì không sửa gì trong mô hình.",
      },
    ],
    keyTakeaways: [
      "Biên đóng góp dương là điều kiện cần: nếu âm, tăng trưởng chỉ làm lỗ lớn hơn.",
      "Runway = tiền mặt / mức đốt, và nó không trả lời câu hỏi bao giờ hoà vốn.",
      "Mức đốt đang giảm dần quan trọng hơn mức đốt hiện tại - đó là hình dạng của đường đi.",
      "Cắt marketing mua thêm thời gian nhưng không sửa được mô hình.",
    ],
    summary: {
      keyIdea: "Biên đóng góp dương là điều kiện cần - nếu âm, tăng trưởng chỉ làm lỗ lớn hơn",
      formula: "Runway = tiền mặt hiện có / mức đốt mỗi tháng",
      commonMistake: "Coi runway là câu trả lời cho bao giờ hoà vốn. Nó chỉ trả lời còn bao lâu nữa hết tiền.",
      action: "Với một kế hoạch tăng trưởng bất kỳ, kiểm tra biên đóng góp trước, rồi mới nhìn tới quy mô.",
    },
    application: {
      title: "Đọc hình dạng, không đọc mức",
      message: "Lấy mức đốt của bốn quý gần nhất và xem nó đang giảm dần, đứng yên hay tăng. Hình dạng đó nói nhiều hơn con số của quý gần nhất.",
      secondary: "Cắt marketing làm mức đốt giảm ngay nhưng không sửa được mô hình - đó là mua thời gian, không phải tiến tới hoà vốn.",
    },
    sections: [
      {
        type: "lead",
        text: "Năm bài trước đều dẫn về đây. Doanh thu đến từ đâu, mỗi khách tốn bao nhiêu, tiền của khách nằm ở đâu, mất bao nhiêu vì tín dụng và gian lận - cộng lại thành một câu hỏi: công ty này có tự nuôi được mình không, và khi nào.",
      },
      { type: "heading", text: "Hai tầng chi phí" },
      {
        type: "paragraph",
        text: "Chi phí biến đổi đi theo từng giao dịch: phí ngân hàng, chi phí rủi ro, chi phí xử lý. Chi phí cố định thì không: lương, hạ tầng, giấy phép. Doanh thu ròng trừ tầng thứ nhất ra biên đóng góp, và chỉ khi con số đó dương thì việc bán nhiều hơn mới có ý nghĩa.",
      },
      {
        type: "formula",
        title: "Điểm hoà vốn theo khối lượng",
        equation: "Khối lượng hoà vốn = chi phí cố định / biên đóng góp trên mỗi đơn vị",
        variables: [
          { symbol: "biên đóng góp", name: "phần còn lại mỗi giao dịch", description: "doanh thu ròng trừ chi phí biến đổi của chính giao dịch đó" },
          { symbol: "chi phí cố định", name: "khoản không đổi theo khối lượng", description: "lương, hạ tầng, tuân thủ, giấy phép" },
        ],
        example: {
          title: "Khi biên đóng góp âm",
          calculation: "Chi phí cố định / số âm",
          result: "không có điểm hoà vốn",
          explanation: "Phép chia không cho ra một khối lượng nào cả. Đó là cách toán học nói rằng mô hình này không hoà vốn ở bất kỳ quy mô nào.",
        },
      },
      { type: "heading", text: "Runway và hình dạng của nó" },
      {
        type: "comparison",
        left: { label: "Mức đốt đứng yên", text: "Runway là một phép chia đơn giản, và ngày hết tiền là một ngày cố định trên lịch." },
        right: { label: "Mức đốt giảm dần", text: "Runway dài hơn phép chia, và nếu xu hướng đủ bền thì đường cong chạm trục trước khi tiền chạm đáy." },
      },
      {
        type: "callout",
        label: "Câu hỏi phân biệt hai loại kế hoạch",
        text: "Một kế hoạch dẫn tới hoà vốn sẽ có biên đóng góp dương và đang mở rộng. Một kế hoạch chỉ dẫn tới vòng gọi vốn kế tiếp thì mọi con số đẹp đều nằm ở phần tăng trưởng, còn biên thì không nhúc nhích. Nhìn vào biên trước, nhìn vào tăng trưởng sau.",
      },
      {
        type: "closing",
        lines: [
          "Gọi vốn mua thêm thời gian. Nó không sửa được biên đóng góp.",
          "Và biên đóng góp là thứ duy nhất quyết định công ty có bao giờ dừng đốt tiền được hay không.",
        ],
      },
    ],
  },
];
