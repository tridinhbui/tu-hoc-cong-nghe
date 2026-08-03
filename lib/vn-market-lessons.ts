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
    
    {
      "question": "Vì sao chu kỳ thanh toán ảnh hưởng tới cách nhà đầu tư quản lý tiền mặt?",
      "options": [
        "Vì tiền bán cổ phiếu chỉ dùng được sau khi hoàn tất thanh toán bù trừ",
        "Vì lệnh mua chỉ được đặt sau khi tiền đã về đủ trong tài khoản",
        "Vì chu kỳ thanh toán quyết định mức phí giao dịch mà công ty chứng khoán thu",
        "Vì cổ phiếu mua trong ngày có thể bán lại ngay trong cùng phiên giao dịch"
      ],
      "correct": 0,
      "explanation": "Khớp lệnh không phải nhận tiền. Khoảng trễ giữa hai việc nghĩa là bạn không xoay vòng vốn liên tục được, và nếu có nghĩa vụ chi trả đúng ngày thì phải tính lùi lịch bán - chi tiết nhỏ nhưng gây kẹt tiền thật."
    }
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
          "type": "heading",
          "text": "Chu kỳ thanh toán ảnh hưởng tới việc gì trong thực tế"
        },
        {
          "type": "paragraph",
          "text": "Khớp lệnh và nhận tiền là hai việc tách nhau. Bán xong, cổ phiếu và tiền chỉ thực sự đổi chủ sau khi hoàn tất bù trừ, nên bạn không xoay vòng vốn liên tục trong ngày như ở một số thị trường khác. Hệ quả thực dụng có hai phần: nếu có nghĩa vụ chi trả vào một ngày cụ thể thì phải tính lùi lịch bán, và trong một phiên thị trường rơi mạnh, khoảng trễ đó là thời gian bạn không làm gì được với số tiền vừa bán ra."
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
    
    {
      "question": "Cổ phiếu đã hết room ngoại tạo ra hệ quả gì cho việc phân tích?",
      "options": [
        "Giá có thể giao dịch cao hơn giá trị vì cầu ngoại không mua thêm được",
        "Cổ phiếu đó sẽ bị loại khỏi các bộ chỉ số của tổ chức xếp hạng quốc tế",
        "Nhà đầu tư trong nước cũng bị giới hạn tỷ lệ sở hữu tương ứng",
        "Doanh nghiệp buộc phải phát hành thêm cổ phiếu để mở rộng room"
      ],
      "correct": 0,
      "explanation": "Cầu bị chặn ở đúng nhóm nhà đầu tư sẵn sàng trả giá cao nhất, nên hình thành cơ chế mua bán thỏa thuận ngoài sàn với mức chênh so với thị giá. Khi phân tích, giá niêm yết lúc này không còn phản ánh đủ mức giá mà người mua thật sự sẵn sàng trả."
    }
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
    
    {
      "question": "Trong thuyết minh báo cáo tài chính, dấu hiệu nào về giao dịch bên liên quan đáng chú ý nhất?",
      "options": [
        "Giá giao dịch lệch rõ so với mặt bằng thị trường của cùng loại hàng hóa",
        "Số lượng giao dịch với bên liên quan tăng lên qua các năm báo cáo",
        "Việc doanh nghiệp có nhiều công ty con và công ty liên kết cùng ngành",
        "Giao dịch được thực hiện với công ty do cổ đông lớn nắm quyền chi phối"
      ],
      "correct": 0,
      "explanation": "Bản thân việc giao dịch trong nội bộ tập đoàn là bình thường và thường cần thiết. Thứ chuyển nó thành vấn đề là mức giá: mua đắt bán rẻ so với thị trường chính là cách giá trị rời khỏi công ty niêm yết mà vẫn đúng quy trình."
    }
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
  {
    id: 1455,
    slug: "chi-so-vn-index-va-von-hoa-chi-phoi",
    title: "Thị trường VN, Bài 5: VN-Index nói gì và giấu gì",
    subtitle: "Vì sao chỉ số xanh mà phần lớn danh mục vẫn đỏ",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "📊",
    track: "professional",
    whyItMatters:
      "Chỉ số là thứ đầu tiên ai cũng nhìn và là thứ dễ hiểu sai nhất. Biết nó được tính bằng cách nào giải thích được hiện tượng quen thuộc: chỉ số tăng điểm trong khi phần lớn cổ phiếu giảm - và giúp bạn chọn đúng thước đo để so sánh hiệu suất của chính mình.",
    openingQuestion: "VN-Index tăng 1% nghĩa là gì về mặt thị trường?",
    openingOptions: [
      "Phần lớn cổ phiếu trên sàn đã tăng giá trong phiên hôm đó",
      "Tổng vốn hóa của rổ tính chỉ số tăng 1%, không nói gì về số mã tăng",
      "Mọi cổ phiếu trong rổ đều tăng đúng 1% so với giá tham chiếu",
      "Khối lượng giao dịch toàn thị trường đã tăng 1% so với phiên trước",
    ],
    correctOption: 1,
    explanation:
      "VN-Index là chỉ số vốn hóa gia quyền: mỗi cổ phiếu đóng góp theo quy mô vốn hóa chứ không theo đầu mã. Một mã vốn hóa rất lớn tăng trần có thể kéo chỉ số xanh trong khi hàng trăm mã nhỏ cùng giảm. Đây không phải lỗi của chỉ số - nó đo giá trị thị trường, không đo tỷ lệ cổ phiếu tăng giá. Nhưng nếu bạn dùng nó để đánh giá xem hôm nay thị trường tốt hay xấu với danh mục của mình thì nó có thể trả lời sai câu hỏi bạn đang hỏi.",
    diagram: [
      { label: "Giá từng cổ phiếu", arrow: true },
      { label: "Nhân với vốn hóa tương ứng", arrow: true },
      { label: "Cộng lại thành tổng vốn hóa rổ", arrow: true },
      { label: "So với kỳ gốc ra chỉ số" },
    ],
    realWorldExample: {
      company: "Phiên chỉ số xanh, độ rộng đỏ",
      description:
        "Một kịch bản lặp đi lặp lại trên thị trường Việt Nam: VN-Index đóng cửa tăng điểm, báo chí đưa tin thị trường hồi phục, nhưng số mã giảm nhiều gấp đôi số mã tăng. Nguyên nhân là một vài mã vốn hóa lớn nhất - thường thuộc nhóm ngân hàng và bất động sản - đủ sức kéo cả chỉ số một mình. Nhà đầu tư cá nhân nắm danh mục cổ phiếu vừa và nhỏ hôm đó lỗ, dù chỉ số nói ngược lại.",
    },
    quiz: [
      {
        question: "Vì sao chỉ số có thể tăng khi phần lớn cổ phiếu giảm giá?",
        options: [
          "Vì chỉ số tính theo vốn hóa nên vài mã lớn có thể kéo cả rổ",
          "Vì chỉ số chỉ tính các cổ phiếu tăng giá trong phiên giao dịch",
          "Vì chỉ số được làm mượt bằng dữ liệu của nhiều phiên trước đó",
          "Vì cổ phiếu giảm sàn bị loại khỏi công thức tính chỉ số hôm đó",
        ],
        correct: 0,
        explanation:
          "Vốn hóa gia quyền nghĩa là một mã chiếm 10% rổ có ảnh hưởng gấp một trăm lần mã chiếm 0,1%. Chỉ số trả lời câu hỏi tổng giá trị thị trường thay đổi ra sao, không trả lời câu hỏi bao nhiêu cổ phiếu tăng giá.",
      },
      {
        question: "Chỉ số độ rộng thị trường (số mã tăng so với số mã giảm) bổ sung thông tin gì?",
        options: [
          "Cho biết đà tăng đến từ toàn thị trường hay chỉ vài mã lớn",
          "Cho biết khối lượng giao dịch đã tăng hay giảm so với phiên trước",
          "Cho biết nhà đầu tư nước ngoài đang mua ròng hay bán ròng",
          "Cho biết mức biên độ dao động áp dụng cho phiên kế tiếp",
        ],
        correct: 0,
        explanation:
          "Chỉ số và độ rộng trả lời hai câu hỏi khác nhau, nên đọc cùng lúc mới đủ. Đà tăng có độ rộng hẹp - chỉ số lên nhờ vài mã - thường kém bền hơn đà tăng mà đa số cổ phiếu cùng tham gia.",
      },
      {
        question: "VN30 khác VN-Index ở điểm nào?",
        options: [
          "VN30 chỉ gồm 30 mã lớn và thanh khoản nhất, có giới hạn tỷ trọng",
          "VN30 tính theo số mã tăng giảm thay vì theo vốn hóa thị trường",
          "VN30 chỉ bao gồm cổ phiếu ngân hàng và bất động sản niêm yết",
          "VN30 được tính một lần cuối phiên còn VN-Index tính liên tục",
        ],
        correct: 0,
        explanation:
          "Giới hạn tỷ trọng là điểm đáng chú ý: nó ngăn một mã quá lớn chi phối toàn bộ chỉ số. Đây cũng là lý do VN30 thường được dùng làm tham chiếu cho sản phẩm phái sinh và quỹ chỉ số hơn là VN-Index.",
      },
      {
        question: "Nhà đầu tư nên so sánh hiệu suất danh mục với chỉ số nào?",
        options: [
          "Chỉ số có cơ cấu gần nhất với danh mục mình đang nắm giữ",
          "Luôn dùng VN-Index vì đó là chỉ số đại diện toàn thị trường",
          "Chỉ số có mức tăng thấp nhất để dễ đạt kết quả vượt trội hơn",
          "Không cần so sánh vì mỗi danh mục có mục tiêu riêng biệt",
        ],
        correct: 0,
        explanation:
          "So một danh mục toàn cổ phiếu vừa và nhỏ với VN-Index là so hai thứ khác nhau. Chọn tham chiếu sai khiến bạn tự khen hoặc tự trách nhầm, và che mất câu hỏi thật là danh mục có xứng đáng với rủi ro đã chịu hay không.",
      },
      {
        question: "Vì sao một cổ phiếu mới niêm yết vốn hóa lớn có thể làm chỉ số nhảy bất thường?",
        options: [
          "Vì nó được cộng vào rổ với vốn hóa lớn dù chưa có lịch sử giá",
          "Vì cổ phiếu mới niêm yết được áp biên độ rộng hơn trong phiên đầu",
          "Vì nhà đầu tư nước ngoài luôn mua mạnh cổ phiếu mới lên sàn",
          "Vì chỉ số phải được tính lại từ kỳ gốc mỗi khi có mã mới",
        ],
        correct: 0,
        explanation:
          "Cách xử lý mã mới vào rổ là một chi tiết kỹ thuật có ảnh hưởng thật tới con số chỉ số. Đây là lý do khi so sánh chỉ số qua các giai đoạn dài, cần biết rổ tính đã thay đổi thế nào chứ không chỉ nhìn đường biểu diễn.",
      },
    ],
    keyTakeaways: [
      "VN-Index là chỉ số vốn hóa gia quyền: vài mã lớn nhất có thể quyết định hướng của cả chỉ số",
      "Chỉ số đo giá trị thị trường, độ rộng đo mức độ tham gia - hai câu hỏi khác nhau",
      "VN30 giới hạn tỷ trọng từng mã nên ít bị một cổ phiếu chi phối hơn",
      "Chọn sai chỉ số tham chiếu sẽ đánh giá sai hiệu suất của chính danh mục mình",
    ],
    practicePrompt: {
      question:
        "Danh mục của bạn gồm toàn cổ phiếu vốn hóa vừa. VN-Index tăng 8% trong năm còn danh mục bạn tăng 5%. Kết luận nào hợp lý nhất?",
      options: [
        "Danh mục kém hiệu quả và cần chuyển sang mua cổ phiếu vốn hóa lớn",
        "Chưa kết luận được - cần so với chỉ số của nhóm vốn hóa vừa trước đã",
        "Danh mục tốt vì vẫn tăng trưởng dương trong năm vừa qua",
        "VN-Index đã bị thổi phồng nên con số 8% không đáng tin cậy",
      ],
      correct: 1,
      explanation:
        "Nếu nhóm vốn hóa vừa chỉ tăng 2% trong năm đó thì 5% là kết quả vượt trội chứ không phải thua kém. So sai tham chiếu dẫn tới quyết định sai: bán đúng thứ đang làm tốt để mua thứ vừa tăng mạnh.",
    },
    summary: {
      keyIdea: "Chỉ số trả lời một câu hỏi cụ thể, và thường không phải câu hỏi bạn đang hỏi",
      commonMistake: "Dùng VN-Index làm thước đo cho mọi danh mục bất kể cơ cấu",
      action: "Tra tỷ trọng năm mã lớn nhất trong VN-Index và tính xem chúng chiếm bao nhiêu phần trăm chỉ số.",
    },
    application: {
      title: "Đọc một phiên cho đúng",
      message:
        "Chỉ số hôm nay tăng nhờ bao nhiêu mã? Số mã tăng so với số mã giảm ra sao? Và danh mục của tôi giống rổ nào hơn - nhóm vốn hóa lớn hay nhóm vừa và nhỏ?",
      secondary: "Nhiều nền tảng dữ liệu công bố sẵn số mã tăng, giảm và đóng góp điểm của từng cổ phiếu vào chỉ số.",
    },
    sections: [
      {
        type: "lead",
        text: "Chỉ số là con số được trích dẫn nhiều nhất và bị hiểu sai nhiều nhất trên thị trường. Nó không phải nhiệt kế đo tâm trạng nhà đầu tư, cũng không phải trung bình của các cổ phiếu - nó là tổng giá trị của một rổ cụ thể, tính theo một công thức cụ thể.",
      },
      {
        type: "conceptTable",
        title: "Ba cách một chỉ số có thể được tính",
        subtitle: "Công thức quyết định chỉ số phản ánh điều gì",
        concepts: [
          { vi: "Vốn hóa gia quyền", en: "Market-cap weighted", def: "Mỗi mã đóng góp theo quy mô vốn hóa. VN-Index thuộc loại này, nên vài mã lớn nhất có ảnh hưởng áp đảo." },
          { vi: "Giá gia quyền", en: "Price weighted", def: "Mỗi mã đóng góp theo mức giá tuyệt đối, bất kể quy mô doanh nghiệp. Dow Jones là ví dụ kinh điển và cũng là lý do nó bị phê phán." },
          { vi: "Bình quân đều", en: "Equal weighted", def: "Mỗi mã đóng góp như nhau. Phản ánh cổ phiếu trung bình sát hơn, nhưng đòi hỏi tái cân bằng liên tục nên ít dùng làm chỉ số chính." },
        ],
      },
      {
        type: "callout",
        label: "Độ rộng là phần chỉ số không nói",
        text: "Một phiên chỉ số tăng 1,5% với 120 mã tăng và 280 mã giảm kể một câu chuyện hoàn toàn khác so với phiên tăng 1,5% với 300 mã tăng. Cái đầu là vài trụ kéo, cái sau là cả thị trường đi lên. Chỉ nhìn con số chỉ số thì hai phiên đó trông giống hệt nhau.",
      },
      {
          "type": "heading",
          "text": "Vì sao vài mã có thể kéo cả chỉ số"
        },
        {
          "type": "paragraph",
          "text": "Trong chỉ số gia quyền theo vốn hóa, đóng góp của một mã tỷ lệ với quy mô của nó. Khi vài doanh nghiệp lớn nhất chiếm phần lớn vốn hóa sàn, một phiên tăng của riêng chúng đủ để đẩy chỉ số lên trong khi phần lớn cổ phiếu còn lại đi xuống. Đây không phải lỗi của cách tính - nó là đúng thứ chỉ số được thiết kế để đo, tức tổng giá trị thị trường. Cái sai nằm ở việc đọc nó như thể nó đại diện cho cổ phiếu trung bình."
        },
      {
        type: "closing",
        lines: [
          "Chỉ số là một thước đo, không phải toàn bộ sự thật về một phiên.",
          "Bài sau nói về cơ chế khuếch đại cả hai chiều trên thị trường này: giao dịch ký quỹ.",
        ],
      },
    ],
  },
  {
    id: 1456,
    slug: "giao-dich-ky-quy-va-call-margin",
    title: "Thị trường VN, Bài 6: Ký quỹ và vòng xoáy call margin",
    subtitle: "Cơ chế biến một phiên giảm thành nhiều phiên sàn liên tiếp",
    duration: "11 phút",
    difficulty: "Khó",
    emoji: "⚠️",
    track: "professional",
    whyItMatters:
      "Phần lớn các đợt giảm sâu trên thị trường Việt Nam đều có cùng một cơ chế khuếch đại phía sau. Hiểu nó giúp bạn đọc được vì sao giá rơi nhanh hơn tin xấu, và vì sao đáy thường xuất hiện sau khi lực bán cưỡng bức cạn chứ không phải khi tin tốt trở lại.",
    openingQuestion: "Giao dịch ký quỹ làm gì với rủi ro của nhà đầu tư?",
    openingOptions: [
      "Giảm rủi ro vì công ty chứng khoán cùng chịu một phần khoản lỗ",
      "Khuếch đại cả lãi lẫn lỗ, và thêm rủi ro bị bán cưỡng bức",
      "Không đổi rủi ro, chỉ giúp mua được nhiều cổ phiếu hơn",
      "Chỉ tăng rủi ro khi nhà đầu tư vay quá tỷ lệ cho phép",
    ],
    correctOption: 1,
    explanation:
      "Ký quỹ là vay tiền công ty chứng khoán để mua thêm cổ phiếu, lấy chính cổ phiếu làm tài sản bảo đảm. Nó nhân đôi hoặc hơn cả lãi lẫn lỗ - đó là phần ai cũng biết. Phần nguy hiểm hơn là rủi ro thứ hai mà mua bằng tiền tự có không hề có: khi giá giảm tới ngưỡng, bạn bị buộc bán ở đúng mức giá tệ nhất, không phải lúc bạn chọn. Bạn mất quyền quyết định thời điểm - thứ quý nhất của một nhà đầu tư dài hạn.",
    diagram: [
      { label: "Giá cổ phiếu giảm", arrow: true },
      { label: "Tỷ lệ ký quỹ chạm ngưỡng", arrow: true },
      { label: "Call margin: nộp thêm tiền hoặc bị bán", arrow: true },
      { label: "Bán cưỡng bức đẩy giá giảm tiếp" },
    ],
    interactiveType: "risk",
    realWorldExample: {
      company: "Chuỗi phiên sàn liên tiếp",
      description:
        "Kịch bản này lặp lại ở mọi đợt giảm sâu: tin xấu làm giá rơi, nhóm dùng ký quỹ chạm ngưỡng và bị bán giải chấp, lực bán cưỡng bức đẩy giá xuống tiếp, kéo thêm nhóm ký quỹ khác vào ngưỡng. Vòng lặp tự nuôi nhau này không cần thêm tin xấu nào để tiếp tục - nó chỉ dừng khi lượng ký quỹ đã bị xả hết. Biên độ càng làm tình hình khó hơn vì cổ phiếu sàn không có bên mua, lệnh giải chấp không khớp được và bị dồn sang phiên sau.",
    },
    quiz: [
      {
        question: "Call margin xảy ra khi nào?",
        options: [
          "Khi tỷ lệ tài sản ròng trên tổng tài sản rơi xuống dưới ngưỡng duy trì",
          "Khi nhà đầu tư muốn tăng thêm hạn mức vay ký quỹ đang có",
          "Khi cổ phiếu trong danh mục bị tạm ngừng giao dịch trên sàn",
          "Khi công ty chứng khoán thay đổi lãi suất cho vay ký quỹ",
        ],
        correct: 0,
        explanation:
          "Giá giảm làm giá trị tài sản bảo đảm co lại trong khi khoản vay giữ nguyên, nên tỷ lệ an toàn tụt xuống. Chạm ngưỡng thì phải nộp thêm tiền hoặc giảm dư nợ - và nếu không kịp, công ty chứng khoán bán thay bạn.",
      },
      {
        question: "Vì sao bán giải chấp thường xảy ra ở đúng mức giá xấu nhất?",
        options: [
          "Vì nó bị kích hoạt bởi chính việc giá đã giảm sâu trước đó",
          "Vì công ty chứng khoán cố tình bán ở giá thấp để thu phí cao hơn",
          "Vì lệnh giải chấp bắt buộc phải đặt ở mức giá sàn của phiên",
          "Vì quy định yêu cầu bán toàn bộ danh mục trong một phiên duy nhất",
        ],
        correct: 0,
        explanation:
          "Đây là điều làm ký quỹ khác hẳn việc tự dùng đòn bẩy có kỷ luật: thời điểm bán không do bạn chọn mà do mức giá quyết định. Cơ chế đảm bảo bạn luôn bán sau khi giá đã rơi, không bao giờ trước đó.",
      },
      {
        question: "Nhà đầu tư mua 100 triệu tiền mặt và vay thêm 100 triệu. Cổ phiếu giảm 30%. Vốn tự có còn bao nhiêu?",
        options: [
          "40 triệu (= 200 × 0,7 − 100 nợ, tức mất 60%)",
          "70 triệu (= 100 × 0,7, giảm đúng theo mức giá)",
          "140 triệu (= 200 × 0,7, chưa trừ khoản vay)",
          "100 triệu, vì khoản vay đã bù phần giảm giá",
        ],
        correct: 0,
        explanation:
          "Tài sản còn 140 triệu, trừ nợ 100 triệu còn 40 triệu vốn tự có. Giá giảm 30% nhưng vốn mất 60% - đòn bẩy hai lần nhân đôi mức thiệt hại, và đó là trước khi tính lãi vay.",
      },
      {
        question: "Vì sao đáy thị trường thường xuất hiện khi tin tức vẫn còn rất xấu?",
        options: [
          "Vì lực bán cưỡng bức cạn trước khi tin tức chuyển biến tích cực",
          "Vì cơ quan quản lý can thiệp trực tiếp để chặn đà giảm của thị trường",
          "Vì nhà đầu tư nước ngoài luôn mua vào khi tin tức xấu nhất",
          "Vì biên độ dao động tự động thu hẹp khi thị trường giảm quá sâu",
        ],
        correct: 0,
        explanation:
          "Bán giải chấp là lực bán không phụ thuộc vào việc người bán nghĩ gì về giá trị - họ buộc phải bán. Khi lượng ký quỹ đã bị xả hết, nguồn cung cưỡng bức biến mất và giá có thể ổn định lại dù chưa có tin tốt nào.",
      },
      {
        question: "Cách quản trị rủi ro ký quỹ hợp lý nhất là gì?",
        options: [
          "Tính trước mức giá gây call margin và giữ khoảng đệm tới đó",
          "Vay tối đa hạn mức để tận dụng hết đòn bẩy được cấp",
          "Chỉ dùng ký quỹ với cổ phiếu vốn hóa lớn vì chúng không giảm sàn",
          "Nộp thêm tiền mỗi khi bị call margin để giữ nguyên vị thế",
        ],
        correct: 0,
        explanation:
          "Biết trước giá nào thì bị gọi ký quỹ biến một cú sốc thành một con số đã tính. Nộp thêm tiền để giữ vị thế đang lỗ là cách nhanh nhất biến một khoản lỗ chịu được thành khoản lỗ không chịu nổi.",
      },
    ],
    keyTakeaways: [
      "Ký quỹ khuếch đại lãi lỗ, nhưng rủi ro thật là mất quyền chọn thời điểm bán",
      "Bán giải chấp luôn xảy ra sau khi giá đã giảm, nên nó bán ở mức giá xấu theo thiết kế",
      "Lực bán cưỡng bức tự nuôi nhau và không cần thêm tin xấu để tiếp tục",
      "Quản trị ký quỹ nghĩa là tính trước mức giá gây call margin, không phải hy vọng không tới đó",
    ],
    practicePrompt: {
      question:
        "Bạn dùng ký quỹ và cổ phiếu giảm liên tiếp ba phiên sàn, không bán ra được vì không có bên mua. Vấn đề cốt lõi là gì?",
      options: [
        "Công ty chứng khoán đã cấp hạn mức ký quỹ cao hơn quy định cho phép",
        "Nghĩa vụ trả nợ cố định trong khi tài sản bảo đảm vừa mất giá vừa mất thanh khoản",
        "Biên độ dao động khiến bạn không được phép đặt lệnh bán trong ba phiên đó",
        "Lãi suất vay ký quỹ tăng lên khi thị trường biến động mạnh hơn bình thường",
      ],
      correct: 1,
      explanation:
        "Hai rủi ro cộng hưởng đúng lúc: giá trị tài sản bảo đảm co lại và khả năng bán nó cũng biến mất, trong khi khoản vay không thay đổi một đồng. Đây là lý do quy mô ký quỹ nên được quyết định dựa trên thanh khoản của cổ phiếu, không chỉ dựa trên hạn mức được cấp.",
    },
    summary: {
      keyIdea: "Đòn bẩy không chỉ nhân đôi khoản lỗ, nó còn tước mất quyền quyết định thời điểm",
      formula: "Vốn tự có còn lại = Giá trị danh mục sau giảm − Dư nợ ký quỹ",
      commonMistake: "Coi hạn mức ký quỹ được cấp là mức nên dùng",
      action: "Tính mức giá làm bạn bị call margin ở vị thế hiện tại, rồi so với biên độ giảm của cổ phiếu đó trong ba năm qua.",
    },
    application: {
      title: "Ba câu trước khi vay ký quỹ",
      message:
        "Giá giảm bao nhiêu phần trăm thì tôi bị gọi ký quỹ? Cổ phiếu này đã từng giảm sâu hơn mức đó chưa? Và nếu bị gọi đúng lúc tôi không có tiền mặt, chuyện gì xảy ra?",
      secondary: "Một cổ phiếu từng giảm 50% trong quá khứ hoàn toàn có thể làm lại điều đó.",
    },
    sections: [
      {
        type: "lead",
        text: "Ký quỹ được giới thiệu như một công cụ tăng hiệu quả sử dụng vốn, và về mặt số học thì đúng như vậy. Nhưng nó thêm vào danh mục một rủi ro hoàn toàn mới, không có trong bất kỳ mô hình đầu tư nào: khả năng bạn bị buộc bán ở thời điểm tệ nhất, bất kể bạn nghĩ gì về giá trị doanh nghiệp.",
      },
      {
        type: "formula",
        title: "Đòn bẩy nhân mức thiệt hại lên bao nhiêu",
        equation: "% mất trên vốn tự có = % giá giảm × (Tổng tài sản ÷ Vốn tự có)",
        variables: [
          { symbol: "Tổng tài sản", name: "Giá trị danh mục", description: "Vốn tự có cộng khoản vay ký quỹ" },
          { symbol: "Vốn tự có", name: "Phần tiền thật của bạn", description: "Phần còn lại sau khi trừ hết dư nợ" },
        ],
        example: {
          title: "Vốn 100 triệu, vay thêm 100 triệu, cổ phiếu giảm 30%",
          calculation: "Đòn bẩy = 200 ÷ 100 = 2 lần · Mất trên vốn = 30% × 2 = 60%",
          result: "Vốn tự có còn 40 triệu",
          explanation: "Và đó là chưa tính lãi vay. Giá cần tăng lại 150% từ đáy để vốn tự có về mốc cũ - trong khi cổ phiếu chỉ cần tăng 43% là về giá ban đầu.",
        },
      },
      {
        type: "callout",
        label: "Vì sao vòng xoáy tự nuôi nhau",
        text: "Bán giải chấp không phải quyết định đầu tư, nó là nghĩa vụ hợp đồng. Nhóm bị bán đẩy giá xuống, mức giá mới kéo nhóm tiếp theo chạm ngưỡng, và cứ thế. Không cần thêm tin xấu nào cho vòng lặp này tiếp diễn - điều đó giải thích vì sao mức giảm thường vượt xa quy mô của tin tức ban đầu.",
      },
      {
          "type": "heading",
          "text": "Vì sao vòng xoáy tự nuôi chính nó"
        },
        {
          "type": "paragraph",
          "text": "Bán giải chấp không phải quyết định đầu tư mà là nghĩa vụ hợp đồng, nên nó xảy ra bất kể người bán nghĩ gì về giá trị doanh nghiệp. Điều làm nó nguy hiểm là tính đồng loạt: nhiều tài khoản dùng cùng một mã làm tài sản bảo đảm sẽ chạm ngưỡng gần như cùng lúc, lượng bán đó đẩy giá xuống, và giá xuống lại kéo thêm nhóm tiếp theo vào ngưỡng. Không cần tin xấu mới nào để vòng thứ hai xảy ra."
        },
      {
        type: "closing",
        lines: [
          "Đòn bẩy đổi khả năng chờ đợi lấy khả năng khuếch đại - và khả năng chờ đợi mới là lợi thế lớn nhất của nhà đầu tư cá nhân.",
          "Bài sau nói về hướng ngược lại: các công cụ giúp nhà đầu tư cá nhân đa dạng hóa mà không cần vốn lớn.",
        ],
      },
    ],
  },
  {
    id: 1457,
    slug: "quy-mo-etf-noi-va-chung-chi-quy",
    title: "Thị trường VN, Bài 7: Quỹ mở, ETF nội và chứng chỉ quỹ",
    subtitle: "Cách tiếp cận đa dạng hóa khi vốn còn nhỏ",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🧺",
    track: "professional",
    whyItMatters:
      "Đa dạng hóa là bữa trưa miễn phí duy nhất trong đầu tư, nhưng tự mua ba mươi mã cổ phiếu với vài chục triệu đồng thì phí và công sức ăn hết phần lợi ích. Quỹ là cách giải bài toán đó - nếu chọn đúng loại và đọc được phí.",
    openingQuestion: "Vì sao nhà đầu tư vốn nhỏ khó tự đa dạng hóa?",
    openingOptions: [
      "Vì quy định giới hạn số mã cổ phiếu một cá nhân được nắm giữ",
      "Vì chi phí giao dịch và công theo dõi trên mỗi mã gần như cố định",
      "Vì cổ phiếu vốn hóa lớn chỉ bán cho nhà đầu tư tổ chức",
      "Vì cần tối thiểu ba mươi mã mới được mở tài khoản chứng khoán",
    ],
    correctOption: 1,
    explanation:
      "Chia mười triệu đồng cho ba mươi mã cho ra những vị thế quá nhỏ để phí giao dịch không ăn mòn, và ba mươi doanh nghiệp là quá nhiều để một người theo dõi nghiêm túc. Quỹ giải quyết cả hai: gộp vốn của nhiều người để đạt quy mô, và tập trung việc theo dõi vào một đội ngũ. Cái giá là phí quản lý hằng năm - và với một quỹ chỉ số, phí đó chính là thứ quyết định phần lớn chênh lệch hiệu suất giữa các lựa chọn.",
    diagram: [
      { label: "Vốn nhỏ của nhiều nhà đầu tư", arrow: true },
      { label: "Gộp lại thành quỹ quy mô lớn", arrow: true },
      { label: "Mua rổ tài sản đa dạng", arrow: true },
      { label: "Mỗi người sở hữu một phần của cả rổ" },
    ],
    realWorldExample: {
      company: "Quỹ chỉ số so với quỹ chủ động",
      description:
        "Hai quỹ cùng đầu tư cổ phiếu Việt Nam, một bám chỉ số với phí thấp, một chủ động chọn mã với phí cao hơn đáng kể. Chênh lệch phí mỗi năm nghe nhỏ, nhưng nó là khoản trừ chắc chắn trong khi phần vượt trội chỉ là khả năng. Qua hai mươi năm, chênh lệch phí cộng dồn có thể lấy đi một phần đáng kể tài sản cuối cùng - và dữ liệu quốc tế cho thấy phần lớn quỹ chủ động không bù lại được khoản đó.",
    },
    quiz: [
      {
        question: "Quỹ mở và ETF khác nhau chủ yếu ở điểm nào?",
        options: [
          "ETF giao dịch trên sàn như cổ phiếu, quỹ mở khớp theo NAV cuối ngày",
          "ETF chỉ dành cho nhà đầu tư tổ chức còn quỹ mở cho cá nhân",
          "Quỹ mở luôn có phí thấp hơn ETF do không phải niêm yết",
          "ETF bắt buộc nắm giữ tối thiểu một năm mới được bán ra",
        ],
        correct: 0,
        explanation:
          "Cơ chế giao dịch quyết định trải nghiệm thực tế: ETF mua bán trong phiên nên linh hoạt hơn, nhưng cũng dễ dẫn tới giao dịch quá nhiều. Quỹ mở khớp một giá mỗi ngày - bất tiện hơn, và với nhiều người thì đó lại là điều tốt.",
      },
      {
        question: "Vì sao phí quản lý quan trọng hơn với quỹ chỉ số so với quỹ chủ động?",
        options: [
          "Vì hai quỹ chỉ số cùng bám một chỉ số thì phí là khác biệt chính",
          "Vì quỹ chỉ số không được phép thu phí hiệu suất theo quy định",
          "Vì phí của quỹ chỉ số được tính trên lợi nhuận thay vì trên tài sản",
          "Vì quỹ chỉ số có chi phí giao dịch cao hơn quỹ chủ động nhiều",
        ],
        correct: 0,
        explanation:
          "Hai quỹ cùng bám VN30 sẽ cho danh mục gần như giống hệt nhau, nên thứ duy nhất bạn kiểm soát được khi chọn là phí. Với quỹ chủ động, phí cao có thể được biện minh bằng kết quả - vấn đề là phần lớn trường hợp thì không.",
      },
      {
        question: "Quỹ 100 tỷ, phí quản lý 2%/năm, danh mục tăng 10%. Nhà đầu tư nhận bao nhiêu?",
        options: [
          "Khoảng 8% (= 10% lợi nhuận − 2% phí quản lý)",
          "Đúng 10%, vì phí đã được trừ vào tài sản của quỹ",
          "Khoảng 12% (= 10% + 2%, phí được hoàn lại cuối năm)",
          "Khoảng 5%, vì phí được tính hai lần trong năm",
        ],
        correct: 0,
        explanation:
          "Phí quản lý trừ thẳng vào giá trị tài sản ròng nên nhà đầu tư nhận phần còn lại. Điểm đáng chú ý là phí thu trên tài sản chứ không trên lợi nhuận - năm quỹ lỗ, phí vẫn được thu đầy đủ.",
      },
      {
        question: "Rủi ro riêng của ETF trên thị trường thanh khoản thấp là gì?",
        options: [
          "Giá giao dịch có thể lệch khỏi giá trị tài sản ròng của quỹ",
          "Quỹ bị buộc giải thể khi thanh khoản xuống dưới ngưỡng quy định",
          "Nhà đầu tư không được phép bán trong giai đoạn thị trường giảm",
          "Phí quản lý tự động tăng lên khi thanh khoản thị trường giảm",
        ],
        correct: 0,
        explanation:
          "Cơ chế giữ giá ETF bám sát giá trị thật phụ thuộc vào bên tạo lập thị trường mua bán để hưởng chênh lệch. Khi tài sản cơ sở kém thanh khoản, cơ chế đó hoạt động yếu đi và khoảng lệch có thể rộng ra đúng lúc thị trường căng thẳng.",
      },
      {
        question: "Chứng chỉ quỹ khác cổ phiếu ở điểm cốt lõi nào?",
        options: [
          "Nó đại diện cho một phần của rổ tài sản, không phải một doanh nghiệp",
          "Nó không được mua bán tự do trên thị trường thứ cấp",
          "Nó luôn được bảo đảm hoàn vốn gốc khi đáo hạn quỹ",
          "Nó cho phép nhà đầu tư biểu quyết tại đại hội của các doanh nghiệp",
        ],
        correct: 0,
        explanation:
          "Mua một cổ phiếu là đặt cược vào một doanh nghiệp; mua chứng chỉ quỹ là mua một lát của nhiều doanh nghiệp cùng lúc. Đây chính là lý do quỹ là cách đa dạng hóa hiệu quả nhất khi vốn còn nhỏ.",
      },
    ],
    keyTakeaways: [
      "Quỹ giải bài toán quy mô: gộp vốn để đạt mức đa dạng hóa mà cá nhân khó tự làm",
      "ETF giao dịch trong phiên, quỹ mở khớp một giá mỗi ngày - khác biệt về trải nghiệm chứ không về bản chất",
      "Với quỹ chỉ số, phí là biến số quan trọng nhất vì danh mục gần như giống nhau",
      "Phí quản lý thu trên tài sản, nên nó được trừ đều đặn cả những năm quỹ thua lỗ",
    ],
    practicePrompt: {
      question:
        "Hai quỹ cùng bám một chỉ số, một quỹ phí 0,5%/năm và một quỹ phí 1,8%/năm. Sau hai mươi năm, khác biệt ra sao?",
      options: [
        "Không đáng kể vì cả hai đều bám cùng một chỉ số tham chiếu",
        "Chênh lệch phí cộng dồn lấy đi một phần đáng kể tài sản cuối cùng",
        "Quỹ phí cao hơn sẽ bù lại bằng kết quả tốt hơn nhờ quản lý chặt hơn",
        "Chỉ khác nhau trong năm đầu, sau đó hai quỹ hội tụ về cùng kết quả",
      ],
      correct: 1,
      explanation:
        "Chênh 1,3 điểm phần trăm mỗi năm nghe rất nhỏ, nhưng compounding khuếch đại phí đúng như cách nó khuếch đại lãi. Đây là biến số hiếm hoi trong đầu tư mà bạn kiểm soát được hoàn toàn trước khi bỏ tiền vào.",
    },
    summary: {
      keyIdea: "Quỹ mua cho bạn sự đa dạng hóa; phí là cái giá, và nó là phần duy nhất chắc chắn",
      commonMistake: "So sánh quỹ bằng hiệu suất năm ngoái thay vì bằng phí và cơ cấu danh mục",
      action: "Tra tỷ lệ chi phí toàn phần của các quỹ bạn đang cân nhắc và so sánh trực tiếp với nhau.",
    },
    application: {
      title: "Bốn câu khi chọn quỹ",
      message:
        "Quỹ này bám chỉ số nào hay chọn mã chủ động? Tỷ lệ chi phí toàn phần là bao nhiêu? Danh mục thực tế có giống điều quỹ tự mô tả không? Và tôi có mua được, bán được khi cần không?",
      secondary: "Báo cáo định kỳ của quỹ công bố danh mục nắm giữ - đó là cách kiểm chứng một quỹ chủ động có thực sự chủ động hay không.",
    },
    sections: [
      {
        type: "lead",
        text: "Toàn bộ lý thuyết danh mục giả định bạn nắm được nhiều tài sản cùng lúc. Với vài chục triệu đồng, tự làm điều đó bằng cổ phiếu riêng lẻ là bất khả thi về mặt chi phí. Quỹ tồn tại chính xác để lấp khoảng cách này.",
      },
      {
        type: "comparison",
        left: {
          label: "Quỹ chỉ số",
          text: "Bám một rổ có sẵn, không cần đội nghiên cứu chọn mã, nên phí thấp. Kết quả gần như chắc chắn xấp xỉ chỉ số trừ đi phí - nhàm chán và dự đoán được.",
        },
        right: {
          label: "Quỹ chủ động",
          text: "Chọn mã với mục tiêu vượt chỉ số, phí cao hơn để trả cho đội ngũ. Có khả năng vượt trội, và cũng có khả năng thua chỉ số sau khi trừ phí - dữ liệu dài hạn nghiêng về vế sau.",
        },
      },
      {
        type: "callout",
        label: "Đọc phí cho đúng",
        text: "Phí quản lý công bố thường không phải toàn bộ chi phí. Còn phí phát hành, phí mua lại nếu bán sớm, và chi phí giao dịch bên trong quỹ. Con số cần so sánh là tỷ lệ chi phí toàn phần, và nó thường nằm trong bản cáo bạch chứ không nằm trên trang quảng cáo.",
      },
      {
          "type": "heading",
          "text": "Chênh lệch giá và giá trị tài sản ròng"
        },
        {
          "type": "paragraph",
          "text": "Chứng chỉ quỹ ETF giao dịch trên sàn nên giá của nó do cung cầu quyết định, trong khi giá trị tài sản ròng được tính từ danh mục bên trong. Hai con số này thường sát nhau nhờ cơ chế tạo lập và hoàn đổi của các thành viên lập quỹ, nhưng chúng có thể lệch khi thanh khoản mỏng hoặc thị trường biến động mạnh. Với quỹ mở thì không có vấn đề này - bạn luôn mua bán ở giá trị tài sản ròng - nhưng đổi lại lệnh chỉ khớp theo kỳ chứ không khớp trong phiên."
        },
      {
        type: "closing",
        lines: [
          "Đa dạng hóa không đòi hỏi vốn lớn, chỉ đòi hỏi chọn đúng công cụ và đọc được phí.",
          "Đây cũng là điểm khép lại chặng: thị trường Việt Nam có luật chơi riêng, nhưng nguyên tắc đầu tư thì không đổi.",
        ],
      },
    ],
  },
];
