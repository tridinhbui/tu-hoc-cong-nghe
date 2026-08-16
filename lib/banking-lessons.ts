import type { Lesson } from "./lesson-types";

// Chặng "Ngân hàng, tín dụng & tuân thủ" (ids 1401-1402, professional track).
//
// Why these two lessons exist: the whole Track 2 spine - đọc 3 báo cáo, chỉ số,
// WACC, DCF - quietly assumes a non-financial company. Applied to a bank it
// produces nonsense (a bank has no "working capital", its debt IS its raw
// material, and EV/EBITDA is meaningless). Banks are ~40% of VN-Index market
// cap, so a learner who finishes Track 2 without this cannot analyse the
// largest sector on their own market. The rest of the chặng reuses lessons
// that already existed but were only reachable through a career path
// (Basel III, 5C, credit scoring, AML/KYC, COSO).

export const BANKING_LESSONS: Lesson[] = [
  {
    id: 1401,
    slug: "doc-bao-cao-tai-chinh-ngan-hang",
    title: "Ngân hàng, Bài 1: Đọc báo cáo tài chính ngân hàng - vì sao mọi chỉ số bạn đã học đều không dùng được",
    subtitle: "NIM, CASA, LDR, NPL, CIR và bộ đệm dự phòng - ngôn ngữ riêng của báo cáo ngân hàng",
    duration: "12 phút",
    difficulty: "Khó",
    emoji: "🏦",
    track: "professional",
    whyItMatters:
      "Ngân hàng chiếm khoảng 40% vốn hóa thị trường chứng khoán Việt Nam, nhưng toàn bộ khung phân tích doanh nghiệp thông thường - vốn lưu động, EBITDA, dòng tiền tự do - đều vô nghĩa với ngân hàng. Không nắm bộ chỉ số riêng này thì bạn không phân tích được nhóm cổ phiếu lớn nhất thị trường mình đang đầu tư.",
    openingQuestion:
      "Vì sao không thể dùng EV/EBITDA để định giá một ngân hàng?",
    openingOptions: [
      "Vì ngân hàng không công bố EBITDA theo quy định",
      "Vì nợ vay là nguyên liệu đầu vào của ngân hàng",
      "Vì ngân hàng luôn có EBITDA âm",
      "Vì EBITDA chỉ áp dụng cho công ty niêm yết ở nước ngoài",
    ],
    correctOption: 1,
    explanation:
      "Với doanh nghiệp thông thường, nợ vay là cách tài trợ cho tài sản hoạt động, nên ta tách giá trị doanh nghiệp (EV) khỏi cấu trúc vốn. Với ngân hàng thì ngược lại: tiền gửi và vốn huy động chính là nguyên liệu sản xuất, còn chênh lệch lãi suất chính là doanh thu. Tách nợ ra khỏi hoạt động kinh doanh của ngân hàng cũng vô lý như tách hàng tồn kho ra khỏi một công ty bán lẻ. Vì vậy ngân hàng luôn được phân tích và định giá ở góc nhìn vốn chủ sở hữu, với bộ chỉ số riêng.",
    diagram: [
      { label: "Huy động: tiền gửi, giấy tờ có giá", arrow: true },
      { label: "Cho vay & đầu tư sinh lãi", arrow: true },
      { label: "Thu nhập lãi thuần (NII) + thu ngoài lãi = TOI", arrow: true },
      { label: "Trừ chi phí hoạt động và chi phí dự phòng", arrow: true },
      { label: "Lợi nhuận trước thuế" },
    ],
    interactiveType: "process",
    realWorldExample: {
      company: "Nhóm ngân hàng niêm yết Việt Nam",
      description:
        "Khi đọc báo cáo quý của một ngân hàng Việt Nam, thứ tự đọc gần như cố định: tăng trưởng tín dụng (bị chặn bởi hạn mức Ngân hàng Nhà nước cấp), rồi NIM, rồi tỷ lệ CASA, rồi nợ xấu và tỷ lệ bao phủ nợ xấu. Hai ngân hàng cùng báo lãi tăng 20% có thể mang ý nghĩa hoàn toàn khác nhau: một bên tăng nhờ NIM cải thiện, bên kia tăng chỉ vì cắt giảm trích lập dự phòng - tức là đi vay lợi nhuận của tương lai.",
    },
    quiz: [
      {
        question: "NIM (Net Interest Margin) đo lường điều gì?",
        options: [
          "Lợi nhuận sau thuế chia cho vốn chủ sở hữu bình quân trong kỳ",
          "Thu nhập lãi thuần chia cho tài sản sinh lãi bình quân",
          "Dư nợ nhóm 3 đến nhóm 5 chia cho tổng dư nợ cho vay khách hàng",
          "Chi phí hoạt động chia tổng thu nhập",
        ],
        correct: 1,
        explanation:
          "NIM = Thu nhập lãi thuần / Tài sản sinh lãi bình quân. Đây là biên lợi nhuận cốt lõi của ngân hàng: chênh lệch giữa lãi suất cho vay và lãi suất huy động, sau khi tính trên toàn bộ tài sản sinh lãi.",
      },
      {
        question: "Tỷ lệ CASA cao có lợi thế gì cho ngân hàng?",
        options: [
          "Được Ngân hàng Nhà nước cấp hạn mức tăng trưởng tín dụng cao hơn",
          "Giá vốn huy động rẻ hơn, nên NIM cao hơn ở cùng mức lãi cho vay",
          "Giảm trực tiếp tỷ lệ nợ xấu vì người gửi tiền cũng là người đi vay",
          "Được miễn phần trích lập dự phòng cho các khoản vay tương ứng",
        ],
        correct: 1,
        explanation:
          "CASA là tiền gửi không kỳ hạn (thanh toán, tiết kiệm không kỳ hạn) - loại vốn gần như không phải trả lãi. Ngân hàng có CASA cao mua được nguyên liệu rẻ hơn đối thủ, nên có thể vừa cho vay cạnh tranh hơn vừa giữ NIM tốt hơn.",
      },
      {
        question: "Một ngân hàng có nợ xấu tăng nhưng lợi nhuận vẫn tăng mạnh. Điều đầu tiên cần kiểm tra là gì?",
        options: [
          "Mức cổ tức tiền mặt năm nay",
          "Chi phí trích lập dự phòng và tỷ lệ bao phủ nợ xấu",
          "Diễn biến giá cổ phiếu ngân hàng trong cùng giai đoạn",
          "Số lượng chi nhánh và phòng giao dịch mở mới trong kỳ",
        ],
        correct: 1,
        explanation:
          "Trích lập dự phòng là khoản chi phí có mức độ chủ quan cao nhất trong báo cáo ngân hàng. Nợ xấu tăng mà chi phí dự phòng giảm là dấu hiệu lợi nhuận đang được vay mượn từ các quý sau. Tỷ lệ bao phủ nợ xấu (dự phòng đã trích / nợ xấu) cho biết bộ đệm còn dày hay mỏng.",
      },
      {
        question: "CIR (Cost to Income Ratio) thấp phản ánh điều gì?",
        options: [
          "Ngân hàng đang cho vay với lãi suất cao hơn mặt bằng thị trường",
          "Tạo ra một đồng tổng thu nhập với ít chi phí vận hành hơn",
          "Ngân hàng có hệ số an toàn vốn cao hơn mức tối thiểu bắt buộc",
          "Ngân hàng ít chịu ảnh hưởng khi lãi suất đảo chiều",
        ],
        correct: 1,
        explanation:
          "CIR = Chi phí hoạt động / Tổng thu nhập hoạt động. Các ngân hàng số hóa mạnh thường kéo CIR xuống rõ rệt vì phục vụ thêm khách hàng mà không phải mở thêm chi nhánh hay tuyển thêm nhân sự tương ứng.",
      },
      {
        question: "Vì sao khái niệm vốn lưu động (working capital) không dùng cho ngân hàng?",
        options: [
          "Vì bảng cân đối của ngân hàng không có bất kỳ tài sản ngắn hạn nào",
          "Vì rủi ro thanh khoản của ngân hàng được đo bằng LDR và LCR",
          "Vì chuẩn mực kế toán cấm ngân hàng trình bày chỉ tiêu vốn lưu động",
          "Vì vốn lưu động của ngân hàng luôn âm do huy động lớn hơn cho vay",
        ],
        correct: 1,
        explanation:
          "Bảng cân đối của ngân hàng không chia ngắn hạn/dài hạn theo kiểu thông thường. Rủi ro thanh khoản của ngân hàng được đo bằng các công cụ riêng: LDR, tỷ lệ vốn ngắn hạn cho vay trung dài hạn, LCR - chứ không phải bằng current ratio.",
      },
    ],
    keyTakeaways: [
      "Với ngân hàng, tiền gửi là nguyên liệu chứ không phải cấu trúc vốn - nên EV, EBITDA, FCF và vốn lưu động đều không dùng được",
      "Bộ chỉ số cốt lõi: NIM (biên lãi ròng), CASA (giá vốn rẻ), LDR (thanh khoản), NPL và tỷ lệ bao phủ (chất lượng tài sản), CIR (hiệu quả vận hành), CAR (an toàn vốn)",
      "Chi phí dự phòng là đòn bẩy lợi nhuận chủ quan nhất - luôn đọc cùng lúc nợ xấu và tỷ lệ bao phủ",
      "Tổng thu nhập hoạt động (TOI) = thu nhập lãi thuần + thu ngoài lãi; ngân hàng có thu ngoài lãi lớn ít nhạy với biến động lãi suất hơn",
    ],
    practicePrompt: {
      question:
        "Ngân hàng A: NIM 4,2%, CASA 35%, NPL 1,1%, bao phủ nợ xấu 180%. Ngân hàng B: NIM 4,5%, CASA 12%, NPL 2,3%, bao phủ nợ xấu 60%. Nhận định nào hợp lý nhất?",
      options: [
        "B tốt hơn vì NIM cao hơn",
        "A tốt hơn: NIM từ CASA rẻ, bộ đệm dày",
        "Hai ngân hàng tương đương vì các chỉ số bù trừ nhau",
        "Không thể so sánh nếu chưa biết giá cổ phiếu",
      ],
      correct: 1,
      explanation:
        "NIM cao không phải lúc nào cũng tốt - câu hỏi luôn là NIM đến từ đâu. NIM cao nhờ giá vốn rẻ (CASA) là lợi thế bền vững. NIM cao nhờ cho vay phân khúc rủi ro cao là rủi ro được ghi nhận trước, chi phí đến sau, và bao phủ nợ xấu 60% cho thấy B chưa chuẩn bị cho chi phí đó.",
    },
    summary: {
      keyIdea: "Ngân hàng có bảng cân đối ngược với doanh nghiệp thường, nên cần bộ chỉ số riêng",
      formula: "NIM = Thu nhập lãi thuần / Tài sản sinh lãi bình quân",
      commonMistake: "Đọc lợi nhuận ngân hàng mà không soi chi phí dự phòng và tỷ lệ bao phủ nợ xấu",
      action: "Mở báo cáo quý gần nhất của một ngân hàng bạn quan tâm và tính đủ 6 chỉ số: NIM, CASA, LDR, NPL, bao phủ, CIR.",
    },
    application: {
      title: "Đọc một ngân hàng trong 15 phút",
      message:
        "Thứ tự đọc: (1) tăng trưởng tín dụng và huy động, (2) NIM và cấu phần giá vốn qua CASA, (3) thu ngoài lãi, (4) CIR, (5) nợ xấu, nợ nhóm 2 và tỷ lệ bao phủ, (6) CAR. Nếu lợi nhuận tăng mà bước (5) xấu đi, hãy coi phần tăng đó là tạm thời.",
      secondary: "Nợ nhóm 2 là chỉ báo sớm: nợ xấu của hai quý tới thường đang nằm ở đó hôm nay.",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn vừa học xong cách đọc ba báo cáo, tính chỉ số, dựng DCF. Rồi bạn mở báo cáo của một ngân hàng và gần như mọi thứ không khớp: không có doanh thu, không có giá vốn hàng bán, không có vốn lưu động, nợ vay gấp mười lần vốn chủ mà không ai coi đó là nguy hiểm. Không phải bạn đọc sai - mà vì ngân hàng là một mô hình kinh doanh khác hẳn.",
      },
      {
        type: "heading",
        text: "Ngân hàng bán tiền, và bảng cân đối của nó bị lộn ngược",
      },
      {
        type: "paragraph",
        text: "Với một công ty sản xuất, tài sản là nhà máy và hàng tồn kho, còn nợ là cách tài trợ cho chúng. Với ngân hàng, tài sản chính là các khoản cho vay, còn nợ chính là tiền gửi của khách hàng - tức là nguyên liệu đầu vào. Ngân hàng mua tiền với giá rẻ (lãi huy động) và bán lại đắt hơn (lãi cho vay). Phần chênh lệch đó là doanh thu cốt lõi.",
      },
      {
        type: "paragraph",
        text: "Hệ quả trực tiếp: mọi công cụ tách nợ khỏi hoạt động kinh doanh đều vô nghĩa. Không có EV, không có EBITDA, không có dòng tiền tự do cho doanh nghiệp. Mọi phân tích ngân hàng đều đứng ở góc nhìn cổ đông, và mọi định giá đều là định giá vốn chủ sở hữu.",
      },
      {
        type: "conceptTable",
        title: "Bộ chỉ số riêng của ngân hàng",
        subtitle: "Sáu con số quyết định bạn hiểu hay không hiểu một ngân hàng",
        concepts: [
          {
            vi: "Biên lãi ròng",
            en: "NIM",
            def: "Thu nhập lãi thuần / tài sản sinh lãi bình quân. Biên lợi nhuận cốt lõi. NIM chịu ảnh hưởng của cả giá vốn đầu vào lẫn khẩu vị rủi ro khi cho vay.",
          },
          {
            vi: "Tiền gửi không kỳ hạn",
            en: "CASA ratio",
            def: "Tỷ trọng tiền gửi thanh toán trong tổng huy động. CASA cao nghĩa là mua nguyên liệu rẻ hơn đối thủ - lợi thế cạnh tranh bền nhất của một ngân hàng bán lẻ.",
          },
          {
            vi: "Tỷ lệ cho vay trên huy động",
            en: "LDR",
            def: "Dư nợ cho vay / tiền gửi. Cao thì tận dụng vốn tốt nhưng mỏng thanh khoản. Ở Việt Nam chỉ tiêu này có trần theo quy định của Ngân hàng Nhà nước.",
          },
          {
            vi: "Nợ xấu",
            en: "NPL ratio",
            def: "Dư nợ nhóm 3-5 / tổng dư nợ. Luôn đọc kèm nợ nhóm 2 (nợ cần chú ý) vì đó là nợ xấu tương lai, và kèm tỷ lệ bao phủ để biết bộ đệm dày hay mỏng.",
          },
          {
            vi: "Hiệu quả chi phí",
            en: "CIR",
            def: "Chi phí hoạt động / tổng thu nhập hoạt động. Càng thấp càng hiệu quả. Số hóa mạnh thường thể hiện ở CIR giảm dần qua nhiều năm.",
          },
          {
            vi: "Hệ số an toàn vốn",
            en: "CAR",
            def: "Vốn tự có / tài sản có rủi ro quy đổi. Trần tăng trưởng thực sự của một ngân hàng: hết room vốn thì không cho vay thêm được, dù thị trường còn nhu cầu.",
          },
        ],
      },
      {
        type: "formula",
        title: "Từ huy động đến lợi nhuận",
        label: "Cấu trúc kết quả kinh doanh của ngân hàng",
        equation:
          "Lợi nhuận trước thuế = (Thu nhập lãi thuần + Thu ngoài lãi) − Chi phí hoạt động − Chi phí dự phòng",
        variables: [
          { symbol: "NII", name: "Thu nhập lãi thuần", description: "Lãi thu từ cho vay trừ lãi trả cho người gửi tiền" },
          { symbol: "Non-II", name: "Thu ngoài lãi", description: "Phí dịch vụ, bảo hiểm, ngoại hối, chứng khoán đầu tư" },
          { symbol: "OPEX", name: "Chi phí hoạt động", description: "Nhân sự, chi nhánh, công nghệ" },
          { symbol: "Provision", name: "Chi phí dự phòng", description: "Khoản trích lập cho các khoản vay có khả năng không thu hồi được" },
        ],
        example: {
          title: "Ví dụ minh họa",
          calculation: "(10.000 + 3.000) − 5.200 − 2.800",
          result: "5.000 tỷ đồng lợi nhuận trước thuế",
          explanation:
            "Nếu quý sau ngân hàng chỉ trích lập 1.500 tỷ thay vì 2.800 tỷ, lợi nhuận sẽ nhảy lên 6.300 tỷ mà hoạt động kinh doanh không hề tốt lên. Đây là lý do phải đọc chi phí dự phòng song song với chất lượng tài sản.",
        },
      },
      {
        type: "comparison",
        left: {
          label: "Doanh nghiệp sản xuất",
          text: "Nợ vay là cấu trúc vốn. Phân tích bằng biên lợi nhuận, vòng quay vốn lưu động, dòng tiền tự do, EV/EBITDA, DCF.",
        },
        right: {
          label: "Ngân hàng",
          text: "Nợ (tiền gửi) là nguyên liệu. Phân tích bằng NIM, CASA, chất lượng tài sản, CIR, CAR; định giá bằng P/B gắn với ROE.",
        },
      },
      {
        type: "callout",
        label: "Bẫy phổ biến nhất",
        text: "Lợi nhuận ngân hàng có thể được điều tiết gần như hợp pháp thông qua thời điểm và mức trích lập dự phòng. Một ngân hàng giảm trích lập trong quý khó khăn sẽ báo lãi đẹp - và trả giá ở hai đến sáu quý sau. Hãy luôn hỏi: nếu giữ nguyên tỷ lệ bao phủ nợ xấu của cùng kỳ năm trước, lợi nhuận quý này còn lại bao nhiêu?",
      },
      {
        type: "heading",
        text: "Ba câu hỏi trước khi kết luận về một ngân hàng",
      },
      {
        type: "list",
        items: [
          "NIM đến từ đâu: giá vốn rẻ nhờ CASA và thương hiệu, hay từ việc cho vay phân khúc rủi ro cao hơn?",
          "Chất lượng tài sản đang cải thiện hay xấu đi: nhìn nợ nhóm 2 trước, nợ xấu sau, rồi mới đến tỷ lệ bao phủ.",
          "Ngân hàng còn dư địa tăng trưởng không: CAR còn dày không, và hạn mức tín dụng được cấp là bao nhiêu?",
        ],
      },
      {
        type: "closing",
        lines: [
          "Ngân hàng không khó phân tích - chỉ là nó dùng một bộ từ vựng khác.",
          "Khi đã đổi đúng bộ từ vựng, mọi nguyên tắc bạn đã học vẫn đúng: chất lượng lợi nhuận quan trọng hơn con số lợi nhuận.",
        ],
      },
    ],
  },
  {
    id: 1402,
    slug: "dinh-gia-ngan-hang-pb-roe",
    title: "Ngân hàng, Bài 2: Định giá ngân hàng - P/B, ROE và mô hình thu nhập thặng dư",
    subtitle: "Vì sao P/B là bội số đúng cho ngân hàng, và mối liên hệ toán học giữa P/B với ROE",
    duration: "12 phút",
    difficulty: "Khó",
    emoji: "⚖️",
    track: "professional",
    whyItMatters:
      "Câu hỏi phỏng vấn kinh điển cho vị trí phân tích ngành ngân hàng là: vì sao ngân hàng này giao dịch ở P/B 2,0 còn ngân hàng kia chỉ 0,8? Nếu chỉ trả lời được là do thị trường thích hơn thì bạn chưa hiểu định giá ngân hàng. Có một công thức nối P/B với ROE, và nó giải thích gần hết chênh lệch định giá trong ngành.",
    openingQuestion:
      "Theo lý thuyết, một ngân hàng nên giao dịch ở P/B trên 1 khi nào?",
    openingOptions: [
      "Khi ngân hàng có quy mô tổng tài sản lớn nhất thị trường",
      "Khi ROE cao hơn chi phí vốn chủ sở hữu",
      "Khi ngân hàng trả cổ tức tiền mặt đều đặn hàng năm",
      "Khi tỷ lệ nợ xấu dưới 1%",
    ],
    correctOption: 1,
    explanation:
      "Giá trị sổ sách là số vốn cổ đông đã bỏ vào ngân hàng. Nếu ngân hàng sinh lời trên số vốn đó (ROE) cao hơn mức lợi suất nhà đầu tư đòi hỏi (chi phí vốn chủ, ke), thì mỗi đồng vốn chủ đang tạo ra giá trị vượt trội và thị trường sẵn sàng trả hơn một đồng cho nó, tức P/B lớn hơn 1. Nếu ROE thấp hơn ke, ngân hàng đang phá hủy giá trị và xứng đáng P/B dưới 1. Quy mô hay cổ tức chỉ là yếu tố phụ.",
    diagram: [
      { label: "ROE bền vững", arrow: true },
      { label: "So với chi phí vốn chủ (ke)", arrow: true },
      { label: "Chênh lệch ROE − ke = giá trị tạo thêm", arrow: true },
      { label: "Quyết định mức P/B hợp lý" },
    ],
    realWorldExample: {
      company: "Chênh lệch P/B trong nhóm ngân hàng niêm yết",
      description:
        "Trong cùng một thị trường, các ngân hàng có thể giao dịch từ khoảng 0,7 lần đến hơn 2 lần giá trị sổ sách cùng lúc. Nhóm P/B cao gần như luôn là nhóm có ROE bền vững trên 20%, CASA cao và nợ xấu thấp. Nhóm P/B thấp thường có ROE quanh 10% hoặc thấp hơn, hoặc thị trường nghi ngờ chất lượng của chính con số giá trị sổ sách vì nợ xấu chưa được ghi nhận đủ.",
    },
    quiz: [
      {
        question: "Công thức liên hệ P/B với ROE trong mô hình tăng trưởng bền vững là gì?",
        options: [
          "P/B = ROE × ke, nhân suất sinh lời với chi phí vốn chủ",
          "P/B = (ROE − g) / (ke − g), công thức Gordon",
          "P/B = ke / ROE, chi phí vốn chia cho suất sinh lời",
          "P/B = ROE + g − ke, cộng tăng trưởng trừ chi phí vốn",
        ],
        correct: 1,
        explanation:
          "Từ mô hình chiết khấu cổ tức với tỷ lệ chi trả bền vững, ta rút ra P/B = (ROE − g) / (ke − g). Khi ROE = ke thì P/B = 1 đúng như trực giác: sinh lời vừa đủ mức đòi hỏi thì giá trị đúng bằng vốn đã bỏ ra.",
      },
      {
        question: "Vì sao thị trường có thể định giá một ngân hàng dưới giá trị sổ sách dù ngân hàng vẫn báo lãi?",
        options: [
          "Vì ngân hàng đó nhiều năm liền không chi trả cổ tức tiền mặt",
          "Vì thị trường nghi ngờ chính giá trị sổ sách của ngân hàng đó",
          "Vì ngân hàng đó có mạng lưới chi nhánh lớn và chi phí vận hành cao",
          "Vì quy định kế toán buộc ghi nhận vốn chủ theo giá gốc lịch sử",
        ],
        correct: 1,
        explanation:
          "P/B dưới 1 thường là lời tuyên bố của thị trường rằng giá trị sổ sách đang bị thổi phồng, hoặc ROE tương lai sẽ thấp hơn chi phí vốn. Với ngân hàng, rủi ro lớn nhất luôn nằm ở chỗ tài sản chưa được ghi giảm về giá trị thật.",
      },
      {
        question: "Mô hình thu nhập thặng dư (residual income) định giá ngân hàng như thế nào?",
        options: [
          "Giá trị sổ sách cộng hiện giá phần lợi nhuận vượt chi phí vốn chủ",
          "Tổng cổ tức dự kiến nhân với số năm nhà đầu tư dự định nắm giữ",
          "Tổng tài sản trừ tổng nợ rồi nhân với hệ số bình quân của ngành",
          "EBITDA của ngân hàng nhân với bội số giao dịch của các thương vụ gần đây",
        ],
        correct: 0,
        explanation:
          "Thu nhập thặng dư mỗi năm bằng lợi nhuận ròng trừ đi (chi phí vốn chủ nhân vốn chủ đầu kỳ). Cộng hiện giá của chuỗi đó vào giá trị sổ sách hiện tại sẽ ra giá trị vốn chủ. Mô hình này đặc biệt hợp với ngân hàng vì giá trị sổ sách của ngân hàng phản ánh khá sát giá trị kinh tế của tài sản tài chính.",
      },
      {
        question: "Vì sao dùng dòng tiền tự do (FCF) để định giá ngân hàng là sai?",
        options: [
          "Vì ngân hàng gần như không phát sinh chi phí đầu tư tài sản cố định",
          "Vì biến động cho vay và tiền gửi là hoạt động cốt lõi, không phải dòng tiền tự do",
          "Vì ngân hàng không bắt buộc lập báo cáo lưu chuyển tiền tệ hợp nhất",
          "Vì lãi suất thay đổi liên tục nên không chiết khấu được dòng tiền dài hạn",
        ],
        correct: 1,
        explanation:
          "Một ngân hàng tăng trưởng cho vay mạnh sẽ có dòng tiền hoạt động âm rất lớn, dù đang kinh doanh rất tốt. Khái niệm FCF không phân biệt được đâu là đầu tư và đâu là hoạt động cốt lõi trong bối cảnh này, nên vô dụng.",
      },
      {
        question: "Yếu tố nào biện minh cho mức P/B cao một cách bền vững nhất?",
        options: [
          "Quy mô tổng tài sản thuộc nhóm dẫn đầu toàn hệ thống ngân hàng",
          "ROE cao được duy trì qua trọn một chu kỳ tín dụng",
          "Số lượng khách hàng cá nhân và tài khoản thanh toán đang mở",
          "Tốc độ tăng trưởng lợi nhuận của quý gần nhất so với cùng kỳ",
        ],
        correct: 1,
        explanation:
          "ROE của một năm thuận lợi không nói lên nhiều điều. Điều thị trường trả giá là ROE xuyên chu kỳ: ngân hàng giữ được ROE cao cả khi nợ xấu toàn ngành tăng mới thực sự có lợi thế cấu trúc.",
      },
    ],
    keyTakeaways: [
      "Ngân hàng được định giá ở góc nhìn vốn chủ: P/B, P/E, mô hình chiết khấu cổ tức và thu nhập thặng dư - không dùng EV/EBITDA hay DCF theo FCFF",
      "Quan hệ nền tảng: P/B = (ROE − g) / (ke − g); ROE bằng ke thì P/B bằng 1",
      "P/B dưới 1 thường là dấu hiệu thị trường nghi ngờ chất lượng của chính giá trị sổ sách",
      "ROE xuyên chu kỳ quan trọng hơn ROE của một năm thuận lợi",
    ],
    practicePrompt: {
      question:
        "Ngân hàng C có ROE bền vững 18%, tăng trưởng dài hạn 8%, chi phí vốn chủ 13%. P/B hợp lý theo mô hình là bao nhiêu?",
      options: [
        "Khoảng 0,7 lần",
        "Khoảng 1,0 lần",
        "Khoảng 2,0 lần",
        "Khoảng 3,5 lần",
      ],
      correct: 2,
      explanation:
        "P/B = (ROE − g) / (ke − g) = (0,18 − 0,08) / (0,13 − 0,08) = 0,10 / 0,05 = 2,0 lần. Nếu ngân hàng này đang giao dịch ở P/B 1,2 thì hoặc thị trường không tin ROE 18% là bền vững, hoặc nghi ngờ chất lượng tài sản - và đó chính là điều bạn cần đi kiểm chứng tiếp.",
    },
    summary: {
      keyIdea: "P/B của một ngân hàng là hàm số của khoảng cách giữa ROE và chi phí vốn chủ",
      formula: "P/B = (ROE − g) / (ke − g)",
      commonMistake: "Kết luận ngân hàng rẻ chỉ vì P/B thấp, mà không kiểm tra vì sao thị trường không tin vào giá trị sổ sách",
      action: "Tính P/B hợp lý theo công thức cho ba ngân hàng và so với P/B thị trường đang trả; chênh lệch chính là giả định ngầm của thị trường.",
    },
    application: {
      title: "Biến P/B thành một câu hỏi kiểm chứng được",
      message:
        "Thay vì hỏi cổ phiếu ngân hàng này đắt hay rẻ, hãy đảo ngược công thức: với P/B thị trường đang trả và chi phí vốn bạn ước lượng, thị trường đang ngầm giả định ROE bền vững là bao nhiêu? Rồi tự trả lời: giả định đó hợp lý hay không.",
      secondary: "Đây chính là kỹ thuật định giá ngược (reverse valuation) - hỏi thị trường đang tin gì, thay vì đoán giá mục tiêu.",
    },
    sections: [
      {
        type: "lead",
        text: "Bài trước cho thấy vì sao mọi chỉ số quen thuộc không dùng được cho ngân hàng. Bài này trả lời câu hỏi kế tiếp và cũng là câu hỏi phỏng vấn kinh điển của ngành: vậy thì định giá ngân hàng bằng cách nào, và vì sao hai ngân hàng cùng ngành lại chênh nhau gấp đôi về P/B?",
      },
      {
        type: "heading",
        text: "Vì sao là P/B chứ không phải P/E hay EV/EBITDA",
      },
      {
        type: "paragraph",
        text: "Tài sản của ngân hàng gần như toàn bộ là công cụ tài chính, được ghi nhận sát giá trị kinh tế hơn nhiều so với nhà máy hay thương hiệu của một doanh nghiệp sản xuất. Nghĩa là giá trị sổ sách của ngân hàng có ý nghĩa kinh tế thật - đây là điều hiếm có, và là lý do P/B trở thành bội số chính. P/E vẫn được dùng nhưng nhạy hơn với biến động trích lập dự phòng giữa các quý, còn EV/EBITDA thì hoàn toàn vô nghĩa vì không thể tách nợ khỏi hoạt động của ngân hàng.",
      },
      {
        type: "formula",
        title: "Cầu nối giữa P/B và ROE",
        label: "Từ mô hình chiết khấu cổ tức, với tỷ lệ giữ lại bền vững",
        equation: "P/B = (ROE − g) / (ke − g)",
        variables: [
          { symbol: "ROE", name: "Suất sinh lời trên vốn chủ", description: "Bền vững xuyên chu kỳ, không phải con số một năm đẹp" },
          { symbol: "g", name: "Tăng trưởng dài hạn", description: "Bị ràng buộc bởi ROE và tỷ lệ giữ lại: g = ROE × tỷ lệ giữ lại" },
          { symbol: "ke", name: "Chi phí vốn chủ sở hữu", description: "Lợi suất nhà đầu tư đòi hỏi, ước lượng qua CAPM" },
        ],
        example: {
          title: "Hai ngân hàng, cùng chi phí vốn 13%",
          calculation: "A: (0,20 − 0,09)/(0,13 − 0,09) = 2,75  |  B: (0,11 − 0,05)/(0,13 − 0,05)",
          result: "A ≈ 2,75 lần; B ≈ 0,75 lần",
          explanation:
            "Chênh lệch P/B gần bốn lần giữa hai ngân hàng không phải do khẩu vị thị trường, mà là hệ quả toán học của việc một bên sinh lời vượt xa chi phí vốn còn bên kia thấp hơn chi phí vốn.",
        },
      },
      {
        type: "heading",
        text: "Mô hình thu nhập thặng dư: cách định giá nghiêm túc hơn",
      },
      {
        type: "paragraph",
        text: "Thu nhập thặng dư của một năm là phần lợi nhuận ròng vượt trên mức tối thiểu mà cổ đông đòi hỏi: RI = Lợi nhuận ròng − (ke × Vốn chủ đầu kỳ). Giá trị vốn chủ bằng giá trị sổ sách hiện tại cộng hiện giá của toàn bộ chuỗi thu nhập thặng dư tương lai. Cách này buộc bạn nói rõ mình tin ngân hàng duy trì được lợi thế trong bao nhiêu năm, thay vì giấu tất cả giả định vào một bội số duy nhất.",
      },
      {
        type: "callout",
        label: "Rủi ro nằm ở mẫu số của chính P/B",
        text: "Với doanh nghiệp thường, sai lầm định giá thường nằm ở giả định tăng trưởng. Với ngân hàng, sai lầm chết người nằm ở chỗ giá trị sổ sách có thể không thật: nếu nợ xấu chưa được ghi nhận đủ, vốn chủ thực tế thấp hơn báo cáo, và P/B bạn tính ra đang thấp một cách giả tạo. Bẫy giá trị trong ngành ngân hàng gần như luôn có hình dạng này.",
      },
      {
        type: "comparison",
        left: {
          label: "P/B thấp vì bị định giá sai",
          text: "ROE ổn định, nợ xấu thấp, bao phủ dày, vốn chủ đáng tin. Đây là cơ hội.",
        },
        right: {
          label: "P/B thấp vì bẫy giá trị",
          text: "Nợ nhóm 2 phình to, bao phủ mỏng, ROE trượt dài, cần tăng vốn. Vốn chủ trên giấy sẽ co lại.",
        },
      },
      {
        type: "list",
        items: [
          "Bước 1: ước lượng ROE bền vững qua ít nhất một chu kỳ tín dụng, không lấy năm thuận lợi nhất",
          "Bước 2: ước lượng ke bằng CAPM với beta của ngành ngân hàng, vốn thường cao hơn 1",
          "Bước 3: kiểm tra chất lượng giá trị sổ sách trước khi tin vào P/B",
          "Bước 4: đảo ngược công thức để đọc ra giả định ngầm của thị trường và tự phản biện nó",
        ],
      },
      {
        type: "closing",
        lines: [
          "Định giá ngân hàng không cần mô hình phức tạp hơn, mà cần đúng mô hình.",
          "Câu hỏi cuối cùng luôn là một câu duy nhất: ngân hàng này sinh lời trên vốn chủ cao hơn hay thấp hơn mức nhà đầu tư đòi hỏi, và điều đó kéo dài được bao lâu?",
        ],
      },
    ],
  },
];
