import type { Lesson } from "./lesson-types";

// Chặng "Thị trường chứng khoán Việt Nam" (ids 1451-1454).
//
// Track 2 dạy cổ phiếu, trái phiếu và danh mục ở mức nguyên lý phổ quát, nhưng
// người học đang đầu tư trên một thị trường cụ thể với luật chơi riêng: chu kỳ
// thanh toán, biên độ, room ngoại, tiêu chí nâng hạng, và một cuộc khủng hoảng
// trái phiếu riêng lẻ mà bất kỳ ai phân tích tín dụng doanh nghiệp Việt Nam
// cũng cần hiểu. Không bài nào trong app chạm tới những thứ này.
//
// Quy tắc viết giống chặng thuế: cơ chế là phần bền, con số là phần thay đổi.
// Biên độ, tỷ lệ room, chu kỳ thanh toán và trạng thái nâng hạng đều do cơ quan
// quản lý và tổ chức xếp hạng điều chỉnh theo thời gian, nên bài học dạy cách
// đọc và tra cứu chứ không cố chốt một con số sẽ lỗi thời.

export const VN_MARKET_LESSONS: Lesson[] = [
  {
    id: 1451,
    slug: "co-che-giao-dich-tren-thi-truong-viet-nam",
    title: "Thị trường VN, Bài 1: Cơ chế giao dịch - chu kỳ thanh toán, biên độ và các loại lệnh",
    subtitle: "Những luật chơi quyết định bạn mua bán được gì, khi nào và với giá nào",
    duration: "11 phút",
    difficulty: "Trung bình",
    emoji: "🏛️",
    track: "professional",
    whyItMatters:
      "Mọi lý thuyết danh mục đều giả định bạn mua bán được ngay ở giá thị trường. Trên thực tế, chu kỳ thanh toán, biên độ dao động và cách khớp lệnh quyết định bạn có thoát được vị thế hay không đúng lúc cần nhất - và đó là khoảng cách giữa mô hình và tiền thật.",
    openingQuestion:
      "Chu kỳ thanh toán ảnh hưởng thế nào đến nhà đầu tư?",
    openingOptions: [
      "Không ảnh hưởng gì vì lệnh đã khớp là quyền sở hữu đã chuyển ngay lập tức",
      "Nó quyết định khi nào cổ phiếu hoặc tiền thực sự về tài khoản để dùng tiếp",
      "Nó quyết định mức giá khớp lệnh của phiên giao dịch tiếp theo trong ngày",
      "Nó chỉ liên quan tới nhà đầu tư tổ chức nước ngoài chứ không tới nhà đầu tư cá nhân",
    ],
    correctOption: 1,
    explanation:
      "Khớp lệnh và thanh toán là hai việc khác nhau. Lệnh khớp xác định giá và khối lượng, nhưng cổ phiếu chỉ về tài khoản để có thể bán tiếp sau khi hoàn tất thanh toán bù trừ. Khoảng trễ đó nghĩa là bạn không thể mua bán liên tục trong ngày như ở một số thị trường khác, và trong một phiên biến động mạnh, nó là khác biệt giữa việc cắt lỗ được và phải ngồi nhìn. Chu kỳ này đã được rút ngắn qua nhiều lần cải cách, nên hãy luôn kiểm chứng quy định hiện hành thay vì nhớ một con số cũ.",
    diagram: [
      { label: "Đặt lệnh", arrow: true },
      { label: "Khớp lệnh: xác định giá và khối lượng", arrow: true },
      { label: "Thanh toán bù trừ", arrow: true },
      { label: "Chứng khoán hoặc tiền về tài khoản, mới dùng tiếp được" },
    ],
    interactiveType: "process",
    realWorldExample: {
      company: "Phiên thị trường giảm sàn hàng loạt",
      description:
        "Trong những phiên bán tháo, hai cơ chế cộng hưởng với nhau theo hướng bất lợi cho người muốn thoát. Giá chạm sàn nên bên mua biến mất, lệnh bán chất đống không khớp được; đồng thời cổ phiếu mua trong các phiên trước chưa về tài khoản nên không bán ra được. Nhà đầu tư dùng đòn bẩy ký quỹ trong tình huống này bị kẹt giữa hai bên: giá trị tài sản giảm buộc phải bổ sung ký quỹ, mà tài sản thì không bán được để lấy tiền.",
    },
    quiz: [
      {
        question: "Biên độ dao động giá trong phiên có tác dụng gì?",
        options: [
          "Đảm bảo mọi nhà đầu tư đều mua bán được ở mức giá công bằng trong phiên",
          "Giới hạn mức tăng giảm tối đa so với giá tham chiếu trong một phiên",
          "Xác định mức giá mà công ty chứng khoán được phép cho vay ký quỹ",
          "Quy định khối lượng tối đa một nhà đầu tư được đặt trong một lệnh duy nhất",
        ],
        correct: 1,
        explanation:
          "Biên độ nhằm hạn chế biến động cực đoan trong một phiên, và mức biên độ khác nhau giữa các sàn. Mặt trái là khi tin xấu lớn xuất hiện, giá không thể điều chỉnh hết trong một phiên nên thanh khoản biến mất - giá chạm sàn mà không ai mua.",
      },
      {
        question: "Vì sao giá sàn không đồng nghĩa với cơ hội mua giá tốt?",
        options: [
          "Vì lệnh mua ở giá sàn không được hệ thống chấp nhận theo quy định giao dịch",
          "Vì giá sàn thường phản ánh tin xấu chưa được hấp thụ hết, và có thể sàn tiếp",
          "Vì phải chờ hết phiên mới biết giá sàn chính thức của ngày giao dịch đó",
          "Vì cổ phiếu chạm sàn sẽ bị tạm ngừng giao dịch trong phiên kế tiếp",
        ],
        correct: 1,
        explanation:
          "Biên độ chỉ trì hoãn chứ không xóa bỏ việc giá phải phản ánh thông tin. Một cổ phiếu có tin xấu nghiêm trọng có thể sàn nhiều phiên liên tiếp; việc nó đang ở giá sàn không nói gì về việc nó đã rẻ hay chưa.",
      },
      {
        question: "Lệnh thị trường khác lệnh giới hạn ở điểm nào?",
        options: [
          "Lệnh thị trường ưu tiên khớp ngay theo giá đối ứng tốt nhất đang có",
          "Lệnh thị trường luôn được khớp ở đúng mức giá tham chiếu của phiên hôm đó",
          "Lệnh giới hạn được ưu tiên khớp trước mọi lệnh khác trong cùng một mức giá",
          "Lệnh giới hạn chỉ dành cho nhà đầu tư tổ chức và các quỹ đầu tư chuyên nghiệp",
        ],
        correct: 0,
        explanation:
          "Lệnh thị trường đổi sự chắc chắn về giá lấy sự chắc chắn về việc khớp. Với cổ phiếu thanh khoản kém, đây là cách nhanh nhất để mua đắt hoặc bán rẻ hơn dự tính rất nhiều - nên với những mã như vậy, lệnh giới hạn gần như luôn là lựa chọn đúng.",
      },
      {
        question: "Vì sao thanh khoản của một cổ phiếu quan trọng ngang với định giá của nó?",
        options: [
          "Vì thanh khoản cao luôn đi kèm với chất lượng doanh nghiệp tốt hơn hẳn",
          "Vì cổ phiếu thanh khoản kém có thể không bán được ở mức giá đang hiển thị",
          "Vì quy định yêu cầu nhà đầu tư chỉ được mua cổ phiếu đạt thanh khoản tối thiểu",
          "Vì thanh khoản quyết định mức biên độ dao động áp dụng cho cổ phiếu đó",
        ],
        correct: 1,
        explanation:
          "Định giá nói cho bạn giá trị, thanh khoản nói cho bạn khả năng biến giá trị đó thành tiền. Một khoản đầu tư đúng về định giá nhưng không thoát được vẫn có thể thành khoản lỗ thực tế nếu bạn cần tiền vào đúng lúc thị trường xấu.",
      },
    ],
    keyTakeaways: [
      "Khớp lệnh và thanh toán là hai việc khác nhau; khoảng trễ giữa chúng giới hạn khả năng xoay xở của bạn",
      "Biên độ hạn chế biến động trong phiên nhưng cũng làm thanh khoản biến mất khi tin xấu lớn xuất hiện",
      "Lệnh thị trường đổi sự chắc chắn về giá lấy sự chắc chắn về việc khớp - nguy hiểm với mã thanh khoản kém",
      "Thanh khoản là một phần của rủi ro, không phải chi tiết kỹ thuật của việc đặt lệnh",
    ],
    practicePrompt: {
      question:
        "Bạn muốn xây vị thế lớn ở một cổ phiếu có khối lượng khớp trung bình rất thấp. Rủi ro chính là gì?",
      options: [
        "Không mua được vì hệ thống giới hạn khối lượng tối đa cho mỗi nhà đầu tư",
        "Chính lệnh mua của bạn đẩy giá lên, và khi cần bán thì không có bên mua đối ứng",
        "Cổ phiếu thanh khoản thấp bị áp biên độ hẹp hơn nên khó đạt lợi nhuận mục tiêu",
        "Phải nắm giữ tối thiểu một khoảng thời gian theo quy định trước khi được bán ra",
      ],
      correct: 1,
      explanation:
        "Đây là rủi ro tác động giá, và nó có hai chiều bất đối xứng: bạn tự đẩy giá vốn của mình lên khi mua, rồi tự đạp giá xuống khi bán. Với vị thế lớn trên mã thanh khoản kém, chi phí này có thể vượt cả phần lợi nhuận mà luận điểm đầu tư của bạn kỳ vọng.",
    },
    summary: {
      keyIdea: "Luật chơi của sàn quyết định bạn có thực hiện được ý tưởng đầu tư hay không",
      commonMistake: "Coi thanh khoản là chi tiết kỹ thuật thay vì một thành phần của rủi ro",
      action: "Tra khối lượng khớp trung bình 30 phiên của các mã bạn đang nắm và so với quy mô vị thế của mình.",
    },
    application: {
      title: "Kiểm tra trước khi đặt lệnh",
      message:
        "Vị thế của tôi bằng bao nhiêu ngày khối lượng giao dịch trung bình? Nếu cần thoát trong ba phiên thì tôi phải chấp nhận giảm giá bao nhiêu? Và nếu cổ phiếu sàn liên tiếp, kế hoạch của tôi là gì?",
      secondary: "Quy tắc thô của nhiều quỹ: vị thế không nên vượt vài ngày khối lượng giao dịch trung bình.",
    },
    sections: [
      {
        type: "lead",
        text: "Toàn bộ phần đầu tư của Track 2 giả định một thị trường lý tưởng: bạn mua bán được ngay, ở giá hiển thị, với khối lượng tùy ý. Không thị trường nào như vậy, và biết chỗ thị trường thật khác mô hình chính là phần thực hành của lý thuyết danh mục.",
      },
      {
        type: "conceptTable",
        title: "Bốn cơ chế cần nắm",
        subtitle: "Chúng quyết định lệnh của bạn được thực hiện thế nào",
        concepts: [
          { vi: "Chu kỳ thanh toán", en: "Settlement cycle", def: "Khoảng thời gian từ khi khớp lệnh tới khi chứng khoán hoặc tiền thực sự về tài khoản. Đã được rút ngắn qua nhiều lần cải cách - luôn tra quy định hiện hành." },
          { vi: "Biên độ dao động", en: "Price band", def: "Giới hạn tăng giảm so với giá tham chiếu trong một phiên, khác nhau giữa các sàn niêm yết và sàn giao dịch cổ phiếu chưa niêm yết." },
          { vi: "Đơn vị giao dịch", en: "Lot size", def: "Khối lượng tối thiểu của một lệnh trong phiên khớp lệnh thông thường; phần lẻ được xử lý theo cơ chế riêng." },
          { vi: "Phiên khớp lệnh", en: "Auction vs continuous", def: "Phiên định kỳ xác định giá mở cửa và đóng cửa bằng một mức giá duy nhất; phiên liên tục khớp theo thứ tự ưu tiên giá rồi thời gian." },
        ],
      },
      {
        type: "callout",
        label: "Vì sao biên độ vừa bảo vệ vừa gây hại",
        text: "Biên độ ngăn giá sập trong một phiên vì hoảng loạn nhất thời. Nhưng khi tin xấu là thật và lớn, nó chỉ kéo dài quá trình điều chỉnh thành nhiều phiên sàn liên tiếp không có thanh khoản. Với người cần thoát vị thế, phiên có biên độ đôi khi tệ hơn một phiên giảm sâu nhưng vẫn giao dịch được.",
      },
      {
        type: "closing",
        lines: [
          "Ý tưởng đầu tư chỉ có giá trị khi thực hiện được trong luật chơi thực tế.",
          "Bài sau nói về một giới hạn khác, thứ định hình dòng vốn ngoại vào thị trường: room ngoại và câu chuyện nâng hạng.",
        ],
      },
    ],
  },
  {
    id: 1452,
    slug: "room-ngoai-va-nang-hang-thi-truong",
    title: "Thị trường VN, Bài 2: Room ngoại và nâng hạng thị trường - dòng vốn ngoại đến từ đâu",
    subtitle: "Giới hạn sở hữu nước ngoài, tiêu chí xếp hạng thị trường và ý nghĩa với định giá",
    duration: "11 phút",
    difficulty: "Khó",
    emoji: "🌏",
    track: "professional",
    whyItMatters:
      "Câu chuyện nâng hạng thị trường được nhắc tới trong hầu hết báo cáo chiến lược, nhưng ít người giải thích được cơ chế thật đằng sau nó. Hiểu tiêu chí xếp hạng giúp bạn phân biệt kỳ vọng đã phản ánh vào giá với dòng vốn thật sẽ chảy vào.",
    openingQuestion:
      "Vì sao việc một thị trường được nâng hạng lại kéo theo dòng vốn ngoại?",
    openingOptions: [
      "Vì nhà đầu tư nước ngoài được miễn thuế khi giao dịch ở thị trường mới nổi",
      "Vì nhiều quỹ chỉ số bắt buộc phân bổ theo rổ chỉ số của hạng thị trường đó",
      "Vì lãi suất trong nước giảm ngay sau khi thị trường được nâng hạng chính thức",
      "Vì doanh nghiệp niêm yết được phép phát hành cổ phiếu ra nước ngoài sau nâng hạng",
    ],
    correctOption: 1,
    explanation:
      "Một lượng vốn khổng lồ trên thế giới được quản lý thụ động, bám theo các bộ chỉ số của những tổ chức xếp hạng lớn. Quỹ mô phỏng chỉ số thị trường mới nổi không được phép mua cổ phiếu ở thị trường cận biên, dù nhà quản lý quỹ có thích đến đâu. Khi một thị trường đổi hạng, các cổ phiếu của nó được đưa vào rổ chỉ số mới, và toàn bộ nhóm quỹ thụ động phải mua theo tỷ trọng - đó là dòng vốn mang tính cơ học chứ không phải quyết định đầu tư.",
    diagram: [
      { label: "Tổ chức xếp hạng đánh giá tiêu chí", arrow: true },
      { label: "Thị trường được đưa vào rổ chỉ số mới", arrow: true },
      { label: "Quỹ thụ động bắt buộc mua theo tỷ trọng", arrow: true },
      { label: "Dòng vốn cơ học, không phụ thuộc quan điểm đầu tư" },
    ],
    interactiveType: "process",
    realWorldExample: {
      company: "Cổ phiếu hết room ngoại",
      description:
        "Một số cổ phiếu chất lượng cao tại Việt Nam thường xuyên ở trạng thái nhà đầu tư nước ngoài đã mua hết phần được phép sở hữu. Khi đó, người nước ngoài muốn mua phải chờ có người nước ngoài khác bán ra, và thực tế thị trường hình thành mức giá cao hơn giá sàn giao dịch cho các thương vụ thỏa thuận. Hệ quả với người phân tích: cùng một cổ phiếu có thể có hai mặt bằng giá, và mức chênh đó là thước đo trực tiếp cho nhu cầu bị dồn nén của khối ngoại.",
    },
    quiz: [
      {
        question: "Room ngoại là gì?",
        options: [
          "Khu vực giao dịch riêng dành cho nhà đầu tư nước ngoài trên sàn niêm yết",
          "Tỷ lệ sở hữu tối đa mà nhà đầu tư nước ngoài được nắm tại doanh nghiệp",
          "Hạn mức ngoại tệ mà nhà đầu tư nước ngoài được chuyển vào trong một năm",
          "Số lượng tài khoản giao dịch mà một tổ chức nước ngoài được phép mở",
        ],
        correct: 1,
        explanation:
          "Tỷ lệ này khác nhau theo ngành nghề, với các ngành có điều kiện như ngân hàng bị giới hạn chặt hơn. Đây vừa là công cụ quản lý vừa là một trong những điểm mà các tổ chức xếp hạng thị trường nêu ra khi đánh giá khả năng tiếp cận.",
      },
      {
        question: "Tiêu chí nào thường được các tổ chức xếp hạng nhấn mạnh nhất?",
        options: [
          "Tốc độ tăng trưởng của chỉ số chính trong ba đến năm năm gần nhất",
          "Khả năng tiếp cận thực tế của nhà đầu tư nước ngoài",
          "Số lượng doanh nghiệp niêm yết mới bổ sung trong mỗi năm tài chính",
          "Mức vốn hóa bình quân của nhóm doanh nghiệp lớn nhất đang niêm yết",
        ],
        correct: 1,
        explanation:
          "Quy mô và thanh khoản là điều kiện cần, nhưng thứ thường giữ chân một thị trường lại là các vấn đề vận hành: yêu cầu ký quỹ trước khi giao dịch, mức độ công bố thông tin bằng tiếng Anh, thủ tục mở tài khoản, và cơ chế xử lý giao dịch thất bại.",
      },
      {
        question: "Vì sao kỳ vọng nâng hạng có thể đã nằm trong giá trước khi nó xảy ra?",
        options: [
          "Vì tổ chức xếp hạng công bố kết quả trước ngày có hiệu lực rất lâu",
          "Vì thị trường định giá theo kỳ vọng chứ không theo thời điểm công bố",
          "Vì các quỹ thụ động được phép mua trước khi việc nâng hạng có hiệu lực chính thức",
          "Vì doanh nghiệp niêm yết công bố kế hoạch kinh doanh mới ngay khi có tin nâng hạng",
        ],
        correct: 1,
        explanation:
          "Đây là bài học chung của mọi sự kiện được dự báo trước. Phần lợi nhuận thường thuộc về người mua sớm trong giai đoạn kỳ vọng hình thành, còn người mua vào ngày tin chính thức có khi lại là người cung cấp thanh khoản cho họ thoát ra.",
      },
      {
        question: "Cổ phiếu hết room ngoại tạo ra hệ quả gì cho người phân tích?",
        options: [
          "Cổ phiếu đó bị loại khỏi mọi rổ chỉ số quốc tế cho tới khi room được nới",
          "Có thể tồn tại hai mặt bằng giá, và mức chênh phản ánh nhu cầu bị dồn nén",
          "Nhà đầu tư trong nước cũng bị giới hạn tỷ lệ sở hữu tương ứng tại doanh nghiệp",
          "Doanh nghiệp buộc phải phát hành thêm cổ phiếu để mở rộng phần room còn lại",
        ],
        correct: 1,
        explanation:
          "Mức chênh giữa giá thỏa thuận cho khối ngoại và giá sàn là một tín hiệu định lượng hiếm có: nó cho biết nhà đầu tư nước ngoài sẵn sàng trả thêm bao nhiêu để sở hữu doanh nghiệp đó, và nó thường co lại khi thị trường xấu đi.",
      },
    ],
    keyTakeaways: [
      "Nâng hạng tạo dòng vốn cơ học từ các quỹ thụ động bám chỉ số, không phụ thuộc quan điểm đầu tư",
      "Tiêu chí xếp hạng nhấn mạnh khả năng tiếp cận thực tế: ký quỹ trước giao dịch, công bố thông tin, thủ tục",
      "Room ngoại giới hạn sở hữu theo ngành nghề, và cổ phiếu hết room có thể hình thành hai mặt bằng giá",
      "Kỳ vọng nâng hạng thường đã phản ánh vào giá trước khi tin chính thức được công bố",
    ],
    practicePrompt: {
      question:
        "Nhà phân tích nói cổ phiếu này sẽ tăng vì thị trường sắp được nâng hạng. Câu hỏi phản biện sắc nhất là gì?",
      options: [
        "Tổ chức xếp hạng nào đưa ra quyết định và trụ sở của họ đặt ở đâu",
        "Cổ phiếu này có đủ điều kiện vào rổ chỉ số không, còn room ngoại không, và giá đã phản ánh bao nhiêu",
        "Việc nâng hạng có làm tăng số lượng doanh nghiệp niêm yết mới hay không",
        "Chỉ số chính đã tăng bao nhiêu phần trăm kể từ đầu năm đến thời điểm hiện tại",
      ],
      correct: 1,
      explanation:
        "Ba điều kiện phải cùng đúng thì luận điểm mới đứng vững. Nếu cổ phiếu không đủ vốn hóa và thanh khoản để vào rổ, dòng vốn thụ động không chạm tới nó. Nếu đã hết room, khối ngoại không mua thêm được trên sàn. Và nếu kỳ vọng đã nằm trong giá suốt hai năm qua thì phần lợi nhuận đã thuộc về người khác.",
    },
    summary: {
      keyIdea: "Nâng hạng là câu chuyện về dòng vốn cơ học, không phải về chất lượng doanh nghiệp",
      commonMistake: "Mua cổ phiếu theo chủ đề nâng hạng mà không kiểm tra nó có vào được rổ chỉ số hay không",
      action: "Chọn ba cổ phiếu bạn quan tâm, tra tỷ lệ sở hữu nước ngoài hiện tại và mức trần áp dụng cho từng mã.",
    },
    application: {
      title: "Đọc dòng vốn ngoại như một dữ liệu",
      message:
        "Theo dõi ba con số: tỷ lệ room còn lại của các mã bạn nắm, giá trị mua bán ròng của khối ngoại theo tuần, và mức chênh giá thỏa thuận ở các mã hết room. Bộ ba này cho biết dòng vốn ngoại đang vào hay ra và với mức khẩn thiết nào.",
      secondary: "Trạng thái xếp hạng thị trường và các tiêu chí đánh giá được cập nhật định kỳ - hãy tra công bố mới nhất của tổ chức xếp hạng thay vì dựa vào trí nhớ.",
    },
    sections: [
      {
        type: "lead",
        text: "Có hai loại người mua trên thị trường: người mua vì tin vào doanh nghiệp, và người mua vì buộc phải mua. Nhóm thứ hai - các quỹ mô phỏng chỉ số - là lý do chủ đề nâng hạng thị trường xuất hiện trong mọi báo cáo chiến lược, và cũng là chủ đề bị hiểu sai nhiều nhất.",
      },
      {
        type: "heading",
        text: "Cơ chế: vì sao xếp hạng lại tạo ra dòng tiền",
      },
      {
        type: "paragraph",
        text: "Các tổ chức xếp hạng phân loại thị trường thành nhiều hạng, và mỗi hạng có bộ chỉ số riêng. Quỹ thụ động cam kết mô phỏng một chỉ số cụ thể, nên danh mục của họ hoàn toàn do thành phần chỉ số quyết định. Khi một thị trường chuyển hạng, cổ phiếu của nó được thêm vào rổ chỉ số mới với một tỷ trọng nhất định, và mọi quỹ bám chỉ số đó phải mua đúng tỷ trọng ấy, bất kể họ nghĩ gì về triển vọng của thị trường.",
      },
      {
        type: "list",
        items: [
          "Điều kiện cần: quy mô vốn hóa và thanh khoản đủ lớn ở một số lượng cổ phiếu nhất định",
          "Điều kiện thường gây vướng: yêu cầu có đủ tiền trước khi đặt lệnh mua, một tập quán khác biệt so với thông lệ quốc tế",
          "Điều kiện khác: mức độ công bố thông tin bằng tiếng Anh, thủ tục mở tài khoản cho nhà đầu tư nước ngoài, cơ chế xử lý giao dịch thất bại",
          "Điều kiện dài hạn: mức độ mở của giới hạn sở hữu nước ngoài theo ngành nghề",
        ],
      },
      {
        type: "callout",
        label: "Phân biệt hai câu chuyện",
        text: "Dòng vốn thụ động là cơ học, có thể ước lượng được từ quy mô các quỹ bám chỉ số và tỷ trọng dự kiến. Dòng vốn chủ động thì không: nó phụ thuộc vào việc nhà quản lý quỹ có thấy cơ hội hay không. Một báo cáo nghiêm túc phải tách hai con số này thay vì gộp thành một ước tính hàng tỷ đô la nghe ấn tượng.",
      },
      {
        type: "closing",
        lines: [
          "Dòng vốn cơ học có thể ước lượng; kỳ vọng thì đã nằm trong giá từ lâu.",
          "Bài sau xử lý phần kém vui hơn của thị trường vốn Việt Nam: cuộc khủng hoảng trái phiếu doanh nghiệp riêng lẻ và những gì nó dạy về rủi ro tín dụng.",
        ],
      },
    ],
  },
  {
    id: 1453,
    slug: "trai-phieu-doanh-nghiep-rieng-le-bai-hoc",
    title: "Thị trường VN, Bài 3: Trái phiếu doanh nghiệp riêng lẻ - giải phẫu một cuộc khủng hoảng",
    subtitle: "Phát hành riêng lẻ, nhà đầu tư chuyên nghiệp và bài học về rủi ro tái cấp vốn",
    duration: "12 phút",
    difficulty: "Khó",
    emoji: "⚠️",
    track: "professional",
    whyItMatters:
      "Đây là sự kiện tín dụng lớn nhất của thị trường vốn Việt Nam trong thập kỷ qua, và mọi cơ chế gây ra nó đều nằm trong những gì bạn đã học: rủi ro tái cấp vốn, chênh lệch kỳ hạn, và khoảng cách giữa lãi suất cao với rủi ro thật.",
    openingQuestion:
      "Nguyên nhân trực tiếp khiến nhiều doanh nghiệp mất khả năng thanh toán trái phiếu là gì?",
    openingOptions: [
      "Lợi nhuận kinh doanh của họ sụt giảm đột ngột ngay trong quý phát sinh sự việc",
      "Rủi ro tái cấp vốn: họ dựa vào việc phát hành đợt mới để trả đợt cũ, và cửa đó đóng lại",
      "Lãi suất coupon được điều chỉnh tăng đột ngột theo điều khoản của hợp đồng",
      "Nhà đầu tư đồng loạt yêu cầu chuyển đổi trái phiếu thành cổ phiếu phổ thông",
    ],
    correctOption: 1,
    explanation:
      "Nhiều doanh nghiệp, đặc biệt trong lĩnh vực bất động sản, dùng trái phiếu ngắn hạn để tài trợ cho dự án có vòng đời dài nhiều năm. Mô hình đó chỉ vận hành khi luôn phát hành được đợt mới để trả đợt cũ. Khi quy định siết lại và niềm tin thị trường sụt giảm cùng lúc, cửa phát hành đóng lại, và khoản nợ đến hạn trở thành nghĩa vụ phải trả bằng tiền thật - thứ mà dự án dở dang không tạo ra được. Đây chính xác là chênh lệch kỳ hạn giữa tài sản và nguồn vốn.",
    diagram: [
      { label: "Dự án dài hạn, dòng tiền về sau nhiều năm", arrow: true },
      { label: "Tài trợ bằng trái phiếu kỳ hạn ngắn", arrow: true },
      { label: "Phụ thuộc vào việc phát hành đợt mới trả đợt cũ", arrow: true },
      { label: "Cửa phát hành đóng: mất khả năng thanh toán" },
    ],
    interactiveType: "risk",
    realWorldExample: {
      company: "Thị trường trái phiếu riêng lẻ giai đoạn siết chặt",
      description:
        "Trước giai đoạn khủng hoảng, trái phiếu riêng lẻ được phân phối rộng rãi tới nhà đầu tư cá nhân qua kênh tư vấn, nhiều người mua chỉ dựa trên mức lãi suất cao hơn tiền gửi ngân hàng vài điểm phần trăm. Phần lớn không đọc bản công bố thông tin, không biết tài sản bảo đảm là gì, và không phân biệt được giữa việc ngân hàng phân phối với việc ngân hàng bảo lãnh thanh toán. Khi doanh nghiệp phát hành mất khả năng trả nợ, khoảng cách giữa hai khái niệm đó trở thành toàn bộ số tiền họ mất.",
    },
    quiz: [
      {
        question: "Phát hành riêng lẻ khác phát hành ra công chúng ở điểm cốt lõi nào?",
        options: [
          "Phát hành riêng lẻ có lãi suất coupon cao hơn theo quy định của cơ quan quản lý",
          "Riêng lẻ chỉ chào bán cho nhà đầu tư đủ điều kiện, với yêu cầu công bố nhẹ hơn",
          "Phát hành ra công chúng không cần được cơ quan quản lý chấp thuận trước khi chào bán",
          "Riêng lẻ bắt buộc phải có tài sản bảo đảm còn ra công chúng thì không cần",
        ],
        correct: 1,
        explanation:
          "Logic của phát hành riêng lẻ là nhà đầu tư chuyên nghiệp có đủ năng lực tự thẩm định nên không cần mức bảo vệ như nhà đầu tư đại chúng. Vấn đề xảy ra khi tiêu chuẩn xác định nhà đầu tư chuyên nghiệp trở thành một thủ tục hình thức dễ đáp ứng.",
      },
      {
        question: "Vì sao lãi suất coupon cao không phải là bằng chứng khoản đầu tư tốt?",
        options: [
          "Vì lãi suất cao luôn đi kèm điều khoản cho phép doanh nghiệp mua lại sớm",
          "Vì lãi suất cao chính là mức bù rủi ro cho xác suất mất vốn cao hơn",
          "Vì lãi suất coupon sẽ bị giảm xuống nếu doanh nghiệp gặp khó khăn tài chính",
          "Vì phần lãi suất vượt mức tiền gửi ngân hàng phải chịu thuế suất cao hơn",
        ],
        correct: 1,
        explanation:
          "Đây là nguyên lý đã học ở chặng trái phiếu, nhưng trong thực tế bị bỏ qua nhiều nhất. Lãi suất cao hơn tiền gửi vài điểm phần trăm không phải quà tặng mà là mức giá thị trường đòi cho rủi ro mất toàn bộ vốn gốc.",
      },
      {
        question: "Ngân hàng phân phối trái phiếu có nghĩa là ngân hàng bảo lãnh thanh toán không?",
        options: [
          "Có, vì ngân hàng chỉ phân phối những trái phiếu mà mình đã thẩm định và cam kết",
          "Không, phân phối chỉ là môi giới; nghĩa vụ trả nợ vẫn thuộc về doanh nghiệp phát hành",
          "Có, nếu nhà đầu tư mua trực tiếp tại quầy giao dịch của ngân hàng đó",
          "Không, nhưng ngân hàng phải bồi thường một phần vốn gốc theo quy định hiện hành",
        ],
        correct: 1,
        explanation:
          "Đây là hiểu lầm gây thiệt hại lớn nhất trong toàn bộ sự việc. Bảo lãnh phát hành và bảo lãnh thanh toán là hai khái niệm hoàn toàn khác nhau, và chỉ khái niệm thứ hai mới tạo ra nghĩa vụ trả nợ thay.",
      },
      {
        question: "Tài sản bảo đảm là cổ phiếu của chính doanh nghiệp phát hành có vấn đề gì?",
        options: [
          "Giá trị tài sản bảo đảm sụt cùng lúc với khả năng trả nợ của doanh nghiệp",
          "Cổ phiếu không được pháp luật công nhận là tài sản bảo đảm hợp lệ",
          "Việc xử lý tài sản bảo đảm dạng này đòi hỏi sự đồng ý của toàn bộ cổ đông",
          "Giá trị cổ phiếu được cố định theo mệnh giá tại thời điểm ký hợp đồng bảo đảm",
        ],
        correct: 0,
        explanation:
          "Tài sản bảo đảm chỉ có ý nghĩa khi giá trị của nó độc lập với sức khỏe của bên vay. Khi doanh nghiệp lâm nguy, cổ phiếu của chính nó gần như mất giá trị - đúng vào lúc trái chủ cần dùng đến. Tương quan này khiến khoản bảo đảm trở nên vô nghĩa ở đúng kịch bản mà nó được thiết kế để bảo vệ.",
      },
      {
        question: "Bài học chuyển giao được cho việc phân tích tín dụng doanh nghiệp là gì?",
        options: [
          "Chỉ nên đầu tư vào trái phiếu do các doanh nghiệp nhà nước phát hành",
          "Luôn đối chiếu lịch trả nợ với dòng tiền tự tạo, không với khả năng vay mới",
          "Ưu tiên trái phiếu có kỳ hạn càng ngắn càng tốt để giảm thiểu rủi ro lãi suất",
          "Chỉ mua trái phiếu được phân phối qua các ngân hàng thương mại lớn trong nước",
        ],
        correct: 1,
        explanation:
          "Đây là câu hỏi trung tâm của mọi phân tích tín dụng: nếu không ai cho doanh nghiệp này vay thêm một đồng nào nữa, nó có trả được các khoản đến hạn trong hai năm tới bằng dòng tiền tự tạo không? Doanh nghiệp trả lời không mà vẫn được vay là doanh nghiệp đang sống nhờ niềm tin của thị trường, thứ có thể biến mất trong vài tuần.",
      },
    ],
    keyTakeaways: [
      "Nguyên nhân cốt lõi là chênh lệch kỳ hạn: dự án dài hạn tài trợ bằng nợ ngắn hạn",
      "Lãi suất coupon cao là giá của rủi ro, không phải bằng chứng về chất lượng khoản đầu tư",
      "Phân phối không phải bảo lãnh thanh toán - đây là hiểu lầm gây thiệt hại lớn nhất",
      "Tài sản bảo đảm tương quan với sức khỏe bên vay thì gần như vô giá trị đúng lúc cần đến",
    ],
    practicePrompt: {
      question:
        "Một doanh nghiệp có 5.000 tỷ trái phiếu đáo hạn trong 12 tháng tới, dòng tiền hoạt động 800 tỷ mỗi năm, dự án đang dở dang. Đánh giá thế nào?",
      options: [
        "An toàn nếu doanh nghiệp có tài sản bảo đảm với giá trị sổ sách lớn hơn dư nợ",
        "Rủi ro tái cấp vốn rất cao: khoảng cách phải bù bằng vay mới hoặc bán tài sản",
        "An toàn vì dự án hoàn thành sẽ tạo ra dòng tiền đủ trả toàn bộ khoản đến hạn",
        "Không đánh giá được nếu chưa biết lãi suất coupon của các lô trái phiếu đó",
      ],
      correct: 1,
      explanation:
        "Dòng tiền tự tạo chỉ đáp ứng khoảng một phần sáu nghĩa vụ đến hạn. Phần còn lại phụ thuộc hoàn toàn vào việc thị trường có tiếp tục cho vay hay không, hoặc doanh nghiệp có bán được tài sản kịp thời và đúng giá hay không - cả hai đều là điều kiện nằm ngoài tầm kiểm soát của doanh nghiệp và thường biến mất cùng lúc.",
    },
    summary: {
      keyIdea: "Khủng hoảng tín dụng hiếm khi bắt đầu từ thua lỗ; nó bắt đầu từ việc không tái cấp vốn được",
      commonMistake: "Đánh giá trái phiếu bằng lãi suất coupon thay vì bằng khả năng trả nợ của bên phát hành",
      action: "Chọn một doanh nghiệp có dư nợ trái phiếu và lập bảng lịch đáo hạn so với dòng tiền hoạt động ba năm gần nhất.",
    },
    application: {
      title: "Bốn câu hỏi trước khi mua bất kỳ trái phiếu doanh nghiệp nào",
      message:
        "Ai là bên có nghĩa vụ trả nợ và sức khỏe tài chính của họ ra sao? Tiền trả nợ đến từ dòng tiền tự tạo hay từ khoản vay mới? Tài sản bảo đảm là gì và giá trị của nó có độc lập với bên vay không? Và tổ chức bán cho tôi đang bảo lãnh điều gì, bằng văn bản nào?",
      secondary: "Nếu không trả lời được cả bốn, mức lãi suất cao đến đâu cũng không bù được phần bạn không biết.",
    },
    sections: [
      {
        type: "lead",
        text: "Chặng trái phiếu đã dạy bạn về rủi ro vỡ nợ, xếp hạng tín nhiệm và chênh lệch lợi suất. Bài này cho thấy toàn bộ những khái niệm đó vận hành thế nào trong một sự kiện có thật, trên chính thị trường mà bạn đang đầu tư.",
      },
      {
        type: "heading",
        text: "Ba cơ chế cộng hưởng",
      },
      {
        type: "list",
        items: [
          "Chênh lệch kỳ hạn: dự án bất động sản cần nhiều năm mới ra tiền, trong khi trái phiếu tài trợ nó có kỳ hạn ngắn hơn nhiều",
          "Phân phối vượt tầm: sản phẩm thiết kế cho nhà đầu tư chuyên nghiệp đến tay người mua đánh giá khoản đầu tư bằng đúng một con số lãi suất",
          "Bảo đảm mang tính hình thức: tài sản bảo đảm là cổ phiếu hoặc dự án của chính bên phát hành, mất giá trị đúng vào lúc cần xử lý",
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Điều nhà đầu tư nghĩ mình mua",
          text: "Một khoản tiết kiệm lãi cao hơn ngân hàng vài điểm phần trăm, có ngân hàng đứng sau và có tài sản bảo đảm.",
        },
        right: {
          label: "Điều họ thực sự mua",
          text: "Khoản cho vay không có bảo lãnh thanh toán từ bên thứ ba, phụ thuộc vào một dự án chưa hoàn thành và vào khả năng vay tiếp của bên phát hành.",
        },
      },
      {
        type: "callout",
        label: "Phần khung pháp lý",
        text: "Sau giai đoạn khủng hoảng, các quy định về điều kiện phát hành, tiêu chuẩn nhà đầu tư chuyên nghiệp, xếp hạng tín nhiệm bắt buộc và công bố thông tin đều đã được sửa đổi nhiều lần, kèm các biện pháp cho phép gia hạn và đàm phán lại. Vì khung này còn tiếp tục thay đổi, hãy tra văn bản có hiệu lực tại thời điểm bạn phân tích; điều không đổi là các cơ chế rủi ro mô tả trong bài.",
      },
      {
        type: "closing",
        lines: [
          "Mọi cuộc khủng hoảng tín dụng đều là cùng một câu chuyện: nghĩa vụ ngắn hạn gắn với tài sản dài hạn.",
          "Bài cuối chặng nói về lớp bảo vệ đầu tiên của nhà đầu tư: công bố thông tin và quản trị công ty.",
        ],
      },
    ],
  },
  {
    id: 1454,
    slug: "cong-bo-thong-tin-va-quan-tri-cong-ty-niem-yet",
    title: "Thị trường VN, Bài 4: Công bố thông tin và quản trị công ty - lớp bảo vệ đầu tiên của nhà đầu tư nhỏ",
    subtitle: "Giao dịch bên liên quan, sở hữu chéo, cổ đông lớn và những dấu hiệu cần đọc trong tài liệu đại hội",
    duration: "11 phút",
    difficulty: "Khó",
    emoji: "🔍",
    track: "professional",
    whyItMatters:
      "Ở thị trường có tỷ lệ sở hữu tập trung cao, rủi ro lớn nhất với cổ đông nhỏ thường không phải doanh nghiệp làm ăn kém, mà là giá trị bị chuyển ra ngoài qua các giao dịch với bên liên quan. Không đọc được dấu hiệu này thì mọi mô hình định giá đều vô nghĩa.",
    openingQuestion:
      "Vì sao giao dịch với bên liên quan là khoản mục cần soi kỹ nhất trong thuyết minh?",
    openingOptions: [
      "Vì các giao dịch này luôn bị pháp luật cấm và cần được báo cáo cho cơ quan quản lý",
      "Vì đó là kênh giá trị có thể chuyển từ công ty sang cổ đông lớn mà vẫn hợp lệ",
      "Vì chúng làm sai lệch việc tính thuế thu nhập doanh nghiệp phải nộp trong kỳ",
      "Vì chuẩn mực kế toán yêu cầu loại bỏ toàn bộ các giao dịch này khỏi báo cáo",
    ],
    correctOption: 1,
    explanation:
      "Giao dịch với bên liên quan tự nó hoàn toàn hợp pháp và nhiều khi cần thiết cho hoạt động của tập đoàn. Vấn đề nằm ở giá: khi công ty niêm yết mua nguyên liệu đắt hơn thị trường từ một công ty do cổ đông lớn sở hữu, hoặc bán tài sản rẻ hơn giá thị trường cho một bên liên quan, giá trị lặng lẽ chảy khỏi cổ đông nhỏ mà không có giao dịch nào là bất hợp pháp. Đây là lý do thuyết minh về bên liên quan quan trọng ngang với chính báo cáo tài chính.",
    diagram: [
      { label: "Cổ đông lớn kiểm soát doanh nghiệp", arrow: true },
      { label: "Giao dịch với công ty do họ sở hữu", arrow: true },
      { label: "Giá không theo thị trường", arrow: true },
      { label: "Giá trị chuyển ra ngoài, cổ đông nhỏ chịu thiệt" },
    ],
    interactiveType: "process",
    realWorldExample: {
      company: "Cấu trúc tập đoàn có nhiều công ty liên quan",
      description:
        "Một mô hình thường gặp: công ty niêm yết là đơn vị sản xuất, nhưng nguyên liệu đầu vào mua qua một công ty thương mại của gia đình cổ đông lớn, còn sản phẩm bán qua một công ty phân phối cũng thuộc nhóm đó. Công ty niêm yết vẫn có lãi, chỉ là biên lợi nhuận bị ép ở cả hai đầu và phần chênh nằm ở các công ty ngoài. Báo cáo tài chính hoàn toàn sạch, kiểm toán chấp nhận toàn phần, và cổ đông nhỏ chỉ có thể phát hiện qua thuyết minh về bên liên quan cùng việc so biên lợi nhuận với doanh nghiệp cùng ngành.",
    },
    quiz: [
      {
        question: "Dấu hiệu nào trong thuyết minh đáng chú ý nhất?",
        options: [
          "Doanh nghiệp có nhiều công ty con hoạt động tại các tỉnh thành khác nhau",
          "Tỷ trọng lớn doanh thu hoặc chi phí đến từ giao dịch với bên liên quan",
          "Doanh nghiệp thay đổi công ty kiểm toán sau nhiều năm hợp tác liên tục",
          "Ban điều hành có tỷ lệ sở hữu cổ phần thấp so với mặt bằng chung của ngành",
        ],
        correct: 1,
        explanation:
          "Tỷ trọng cao tự nó chưa phải bằng chứng sai phạm, nhưng nó xác định chỗ cần soi. Bước tiếp theo là so biên lợi nhuận của doanh nghiệp với các đối thủ cùng ngành không có cấu trúc tương tự.",
      },
      {
        question: "Vì sao cấu trúc sở hữu chéo gây khó cho việc phân tích?",
        options: [
          "Vì nó làm cho báo cáo tài chính hợp nhất không được kiểm toán đầy đủ",
          "Vì khó xác định ai thực sự kiểm soát và vốn nào bị tính trùng",
          "Vì các công ty trong cấu trúc này không phải công bố thông tin định kỳ",
          "Vì cơ quan quản lý cấm nhà đầu tư nước ngoài sở hữu các doanh nghiệp như vậy",
        ],
        correct: 1,
        explanation:
          "Khi các công ty nắm vốn lẫn nhau, cùng một đồng vốn có thể được tính nhiều lần trên các bảng cân đối khác nhau, và quyền kiểm soát thực tế bị che dưới nhiều lớp. Vốn chủ sở hữu hợp nhất khi đó không phản ánh đúng năng lực chịu lỗ thật sự.",
      },
      {
        question: "Tài liệu đại hội cổ đông nên được đọc kỹ ở phần nào?",
        options: [
          "Phần báo cáo kết quả kinh doanh, vì nó đã có sẵn trong báo cáo tài chính năm",
          "Các tờ trình về phát hành thêm, thù lao và giao dịch lớn",
          "Phần giới thiệu lịch sử hình thành và các thành tựu doanh nghiệp đạt được",
          "Danh sách các đơn vị tư vấn và kiểm toán mà doanh nghiệp đang hợp tác",
        ],
        correct: 1,
        explanation:
          "Đây là nơi các quyết định ảnh hưởng trực tiếp tới tỷ lệ sở hữu và dòng tiền của cổ đông nhỏ được đưa ra biểu quyết. Phát hành riêng lẻ dưới giá thị trường cho một nhóm cổ đông cụ thể là hình thức pha loãng phổ biến và hoàn toàn hợp lệ nếu được thông qua.",
      },
      {
        question: "Vai trò của thành viên hội đồng quản trị độc lập là gì?",
        options: [
          "Điều hành hoạt động hằng ngày của doanh nghiệp thay cho ban giám đốc",
          "Đại diện cho lợi ích chung, đặc biệt khi có xung đột với cổ đông kiểm soát",
          "Thực hiện kiểm toán nội bộ và ký duyệt báo cáo tài chính trước khi công bố",
          "Đại diện cho người lao động trong các cuộc thương lượng về chế độ đãi ngộ",
        ],
        correct: 1,
        explanation:
          "Tính độc lập là điều kiện để cơ chế này có ý nghĩa. Khi thành viên độc lập thực chất là người thân hoặc đối tác lâu năm của cổ đông kiểm soát, lớp bảo vệ chỉ còn trên giấy - và điều này kiểm tra được qua phần công bố lý lịch trong báo cáo thường niên.",
      },
    ],
    keyTakeaways: [
      "Ở thị trường có sở hữu tập trung, rủi ro lớn nhất với cổ đông nhỏ là giá trị bị chuyển ra ngoài chứ không phải kinh doanh kém",
      "Giao dịch với bên liên quan hợp pháp nhưng cần soi ở khía cạnh giá có theo thị trường không",
      "Sở hữu chéo làm vốn chủ hợp nhất không phản ánh đúng năng lực chịu lỗ thật",
      "Tài liệu đại hội cổ đông chứa các quyết định pha loãng và giao dịch lớn - phải đọc trước khi biểu quyết",
    ],
    practicePrompt: {
      question:
        "Một doanh nghiệp có biên lợi nhuận gộp thấp hơn hẳn các đối thủ cùng ngành, đồng thời mua phần lớn nguyên liệu từ một công ty của cổ đông lớn. Nên kết luận thế nào?",
      options: [
        "Doanh nghiệp có năng lực đàm phán với nhà cung cấp kém hơn các đối thủ",
        "Đây là dấu hiệu giá trị có thể đang bị chuyển qua giá mua nội bộ, cần soi kỹ hơn",
        "Doanh nghiệp đang chấp nhận biên thấp để giành thị phần trong ngắn hạn",
        "Không kết luận được gì vì biên lợi nhuận gộp phụ thuộc nhiều yếu tố khác nhau",
      ],
      correct: 1,
      explanation:
        "Chưa phải bằng chứng, nhưng là dấu hiệu đủ mạnh để chuyển sang chế độ hoài nghi. Bước tiếp theo: xem tỷ trọng giao dịch bên liên quan qua nhiều năm, so giá mua với giá thị trường của nguyên liệu nếu có dữ liệu, và kiểm tra biên lợi nhuận có phục hồi trong những năm cấu trúc sở hữu thay đổi hay không.",
    },
    summary: {
      keyIdea: "Ở thị trường sở hữu tập trung, quản trị công ty là biến số định giá chứ không phải chủ đề đạo đức",
      commonMistake: "Định giá doanh nghiệp bằng mô hình hoàn hảo mà không hỏi lợi nhuận đó có đến tay cổ đông nhỏ không",
      action: "Đọc phần bên liên quan trong thuyết minh của một doanh nghiệp bạn đang nắm và tính tỷ trọng trên doanh thu.",
    },
    application: {
      title: "Ba tài liệu phải đọc trước khi mua",
      message:
        "Thuyết minh về giao dịch với bên liên quan; phần cơ cấu cổ đông và người có liên quan trong báo cáo thường niên; và toàn bộ tờ trình của kỳ đại hội gần nhất. Ba tài liệu này mất khoảng một giờ và trả lời câu hỏi quan trọng nhất: lợi nhuận có chảy về cổ đông nhỏ không.",
      secondary: "Mô hình định giá đẹp đến đâu cũng vô nghĩa nếu câu trả lời cho câu hỏi đó là không.",
    },
    sections: [
      {
        type: "lead",
        text: "Mọi phương pháp định giá bạn đã học đều ngầm giả định một điều: lợi nhuận doanh nghiệp tạo ra sẽ thuộc về cổ đông theo tỷ lệ sở hữu. Ở thị trường có tỷ lệ sở hữu tập trung cao, giả định đó không tự động đúng, và kiểm tra nó là phần việc mà không mô hình nào làm thay được.",
      },
      {
        type: "heading",
        text: "Ba kênh giá trị rời khỏi cổ đông nhỏ",
      },
      {
        type: "conceptTable",
        title: "Những gì cần tìm trong tài liệu công bố",
        subtitle: "Đều hợp pháp, đều để lại dấu vết trên giấy tờ",
        concepts: [
          { vi: "Giao dịch bên liên quan", en: "Related-party transactions", def: "Mua bán hàng hóa, dịch vụ, tài sản hoặc cho vay giữa công ty niêm yết và các bên do cổ đông lớn kiểm soát. Vấn đề nằm ở giá, không ở bản thân giao dịch." },
          { vi: "Pha loãng qua phát hành", en: "Dilution", def: "Phát hành riêng lẻ với giá thấp hơn thị trường cho một nhóm cụ thể, hoặc phát hành cổ phiếu thưởng cho ban lãnh đạo với điều kiện thực hiện dễ đạt." },
          { vi: "Sở hữu chéo", en: "Cross-ownership", def: "Các công ty trong nhóm nắm vốn lẫn nhau, làm cùng một đồng vốn được tính nhiều lần và che giấu quyền kiểm soát thực tế." },
        ],
      },
      {
        type: "callout",
        label: "Vì sao đây là biến số định giá",
        text: "Thị trường định giá quản trị công ty bằng tiền thật: hai doanh nghiệp có cùng lợi nhuận và cùng tốc độ tăng trưởng nhưng khác nhau về chất lượng quản trị luôn giao dịch ở hai mức bội số khác nhau. Phần chiết khấu đó không phải định kiến, mà là ước lượng của thị trường về phần lợi nhuận sẽ không đến được tay cổ đông nhỏ.",
      },
      {
        type: "closing",
        lines: [
          "Câu hỏi cuối cùng của mọi phân tích không phải doanh nghiệp kiếm được bao nhiêu, mà bao nhiêu trong số đó đến được tay bạn.",
          "Kết thúc chặng: bạn đã có bộ công cụ đọc thị trường Việt Nam đúng với luật chơi thật của nó.",
        ],
      },
    ],
  },
];
