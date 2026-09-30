import type { Lesson } from "../lesson-types";

// Chặng 46, bài 6-10. Giáo trình: scripts/curriculum/stage-46.json.
// Không nêu tên nút bấm, giá hay tính năng riêng của công cụ nào: chỉ dạy cách giao việc và cách kiểm.
export const S46_B_LESSONS: Lesson[] = [
  {
    id: 2325,
    slug: "mau-mau-phong-cach-de-anh-nhat-quan",
    title: "Chặng 46, Bài 6: Ghi lại màu, phong cách để mọi ảnh trông cùng một nhà",
    subtitle: "Một đoạn quy định ngắn, dán vào đầu mọi yêu cầu, là thứ giữ cho ảnh tuần này giống ảnh tuần trước.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🎨",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bạn làm ảnh cho bản tin tuần này bằng AI và ưng ý. Tuần sau bạn làm lại, nhưng ảnh ra màu khác, kiểu khác, nhìn như của một phòng khác. Người đọc không gọi tên được vì sao, họ chỉ thấy bản tin thiếu chuyên nghiệp. Một đoạn quy định viết một lần sẽ giữ mọi ảnh cùng một nhà mà bạn không phải nhớ từng chi tiết.",
    openingQuestion:
      "Bạn đã tạo ba ảnh cho bản tin, nhưng mỗi ảnh một màu và một kiểu vẽ. Bạn nên làm gì trước khi tạo ảnh thứ tư?",
    openingOptions: [
      "Viết đoạn quy định về màu, kiểu ảnh rồi dán vào mọi yêu cầu",
      "Thêm chữ 'đẹp, chuyên nghiệp, đồng bộ' vào cuối mỗi yêu cầu mới",
      "Tạo thật nhiều ảnh rồi chọn ba ảnh ngẫu nhiên trông gần nhau nhất",
      "Đổi sang một công cụ AI khác vì công cụ này không giữ được phong cách",
    ],
    correctOption: 0,
    explanation:
      "Công cụ tạo ảnh thường không tự nhớ quy định của lần trước, nên mỗi yêu cầu mới là một lần bắt đầu lại. Một đoạn quy định cụ thể (màu, kiểu ảnh, điều cấm) dán vào đầu mọi yêu cầu cho AI cùng một đề bài mỗi lần. Tính từ như 'đồng bộ' ai hiểu cũng khác nhau nên không ràng buộc được gì. Chọn ngẫu nhiên là nhờ may rủi và tốn lượt. Đổi công cụ vẫn để bạn tự lo chuyện nhất quán.",
    diagram: [
      { label: "Nhìn 3-5 ảnh bạn thấy ưng, ghi ra điểm chung", arrow: true },
      { label: "Viết thành đoạn quy định: màu, kiểu ảnh, tỉ lệ, điều cấm", arrow: true },
      { label: "Dán đoạn đó vào đầu mọi yêu cầu tạo ảnh", arrow: true },
      { label: "So kết quả với bảng màu thật, sửa đoạn quy định nếu lệch" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một nhân viên truyền thông nội bộ làm bản tin mỗi tháng. Sau hai số bản tin có ảnh lệch nhau, cô viết năm dòng: màu chính xanh đậm, ảnh kiểu minh hoạ phẳng, nền sáng, không có chữ trong ảnh, không vẽ khuôn mặt thật. Cô dán năm dòng đó vào mọi yêu cầu. Số sau, ba ảnh nhìn ra ngay là cùng một bộ.",
    },
    quiz: [
      {
        question: "Vì sao nên dán đoạn quy định vào đầu mỗi yêu cầu tạo ảnh?",
        options: [
          "Để mỗi lần AI đều nhận cùng một đề bài về màu và kiểu ảnh",
          "Vì AI tự nhớ mọi ảnh cũ nên đoạn này chỉ để cho đẹp khi gửi yêu cầu",
          "Vì đoạn dán vào làm ảnh ra nhanh hơn và đỡ tốn lượt",
          "Vì công cụ chỉ tạo ảnh khi đã có mã màu của thương hiệu",
        ],
        correct: 0,
        explanation:
          "Mỗi yêu cầu thường là một lần bắt đầu mới, nên điều gì bạn muốn giữ thì phải nói lại. Đoạn quy định là cách nói lại đó. Công cụ không bảo đảm nhớ ảnh cũ, đoạn dán vào không làm ảnh ra nhanh hơn, và công cụ vẫn tạo được ảnh khi bạn chưa có mã màu nào.",
      },
      {
        question: "Cách nào ghi màu giúp AI đi đúng hướng nhất?",
        options: [
          "Tên màu kèm mã, ví dụ xanh đậm #1F4E79",
          "Viết 'xanh dương hiện đại, trẻ trung' để AI tự chọn sắc hợp lý cho từng ảnh",
          "Đính kèm logo và bảo AI tự lấy màu nào nó thấy hợp ở đó nhất",
          "Ghi 'màu thương hiệu' và tin là AI biết màu thương hiệu của phòng bạn",
        ],
        correct: 0,
        explanation:
          "Mã màu cho AI một điểm tựa cụ thể; tính từ như 'hiện đại, trẻ trung' thì mỗi người hiểu một khác. AI không biết màu thương hiệu của phòng bạn nếu bạn không nói, và tự lấy màu từ logo là để nó quyết thay bạn. Mã màu chỉ là hướng dẫn, nên bạn vẫn phải so kết quả với bảng màu thật.",
      },
      {
        question: "Hai trong sáu ảnh lệch phong cách so với bốn ảnh còn lại. Bước hợp lý nhất là gì?",
        options: [
          "Làm rõ hơn đoạn quy định rồi tạo lại đúng hai ảnh lệch",
          "Giữ nguyên, bấm tạo lại cho tới khi may mắn",
          "Bỏ đoạn quy định, vì AI không tuân theo được nên ảnh nào ra cũng dùng",
          "Đổi bốn ảnh còn lại cho giống hai ảnh lệch để cả bộ thống nhất",
        ],
        correct: 0,
        explanation:
          "Lệch thường có nghĩa là đoạn quy định còn chỗ mơ hồ, nên sửa câu chữ ở đó rồi làm lại phần lệch. Tạo lại mà không đổi gì là cầu may. Bỏ quy định thì sáu ảnh sẽ lệch hết, và đổi bốn ảnh đã đúng chỉ làm thêm việc mà không sửa nguyên nhân.",
      },
      {
        question: "Đoạn quy định hình ảnh nên gồm những gì?",
        options: [
          "Màu chính, kiểu ảnh, tỉ lệ khung và những thứ không được xuất hiện",
          "Toàn bộ lịch sử công ty để AI hiểu rõ ngữ cảnh thương hiệu của phòng hơn",
          "Họ tên người duyệt ảnh để AI biết ai sẽ chịu trách nhiệm",
          "Số điện thoại, địa chỉ khách hàng để ảnh có thông tin thật",
        ],
        correct: 0,
        explanation:
          "Đoạn quy định chỉ cần những gì quyết định diện mạo của ảnh. Lịch sử công ty không đổi được màu hay kiểu vẽ, tên người duyệt không giúp AI vẽ gì cả. Thông tin khách hàng thì tuyệt đối không nên đưa vào một công cụ chưa được công ty duyệt.",
      },
      {
        question: "Cả phòng cùng tạo ảnh bằng AI. Cách nào giữ ảnh đồng bộ?",
        options: [
          "Lưu đoạn quy định thành một tệp chung cả phòng cùng dán, một người giữ bản mới nhất",
          "Mỗi người tự viết đoạn quy định theo cách hiểu của mình",
          "Nhắn miệng quy định màu, ai nhớ gì dùng nấy",
          "Chỉ một người được tạo ảnh, những người khác xin ảnh qua người đó",
        ],
        correct: 0,
        explanation:
          "Một bản chung có người giữ thì mọi người dùng cùng đề bài và khi sửa, cả phòng cùng đổi. Mỗi người tự viết thì ra nhiều phong cách, nhắn miệng thì mỗi người nhớ một khác. Dồn hết vào một người thì đúng là đồng bộ nhưng tạo nút thắt, ai vắng thì cả phòng chờ.",
      },
    ],
    keyTakeaways: [
      "AI thường không tự nhớ quy định của lần trước, nên điều cần giữ phải được nói lại.",
      "Đoạn quy định hình ảnh gồm màu (có mã), kiểu ảnh, tỉ lệ khung và điều cấm.",
      "Mã màu chỉ là hướng dẫn: luôn so kết quả với bảng màu thật.",
      "Ảnh lệch thì sửa đoạn quy định trước rồi mới tạo lại.",
      "Cả phòng dùng chung một bản, một người giữ bản mới nhất.",
    ],
    practicePrompt: {
      question:
        "Chị Lan tạo ảnh cho ba bài đăng, ảnh nào cũng một kiểu khác nhau. Chị định thêm 'nhất quán' vào cuối mỗi yêu cầu. Điều gì hiệu quả hơn?",
      options: [
        "Viết năm dòng cụ thể về màu, kiểu ảnh, điều cấm và dán vào đầu",
        "Viết 'nhất quán' bằng chữ in hoa để AI chú ý hơn",
        "Tạo mỗi ảnh hai lần và chọn ảnh ra gần nhau hơn",
        "Dùng thêm nhiều từ khen như 'đẹp', 'sang trọng', 'chuẩn chỉnh'",
      ],
      correct: 0,
      explanation:
        "'Nhất quán' là một tính từ, AI không biết nhất quán với cái gì. Năm dòng cụ thể cho nó điều để bám vào. Viết hoa không thêm thông tin. Chọn trong hai ảnh vẫn là nhờ may rủi. Từ khen cũng không nói màu nào hay kiểu nào.",
    },
    summary: {
      keyIdea: "Một đoạn quy định hình ảnh ngắn, cụ thể, dán vào mọi yêu cầu, giữ cho ảnh cùng một nhà.",
      formula: "Màu (có mã) + kiểu ảnh + tỉ lệ khung + điều cấm = đề bài giống nhau cho mọi lần tạo ảnh.",
      commonMistake: "Viết 'đồng bộ, chuyên nghiệp' và tin rằng AI hiểu đó là màu và kiểu nào của phòng bạn.",
      action: "Viết năm dòng quy định hình ảnh cho loại ảnh bạn hay cần và lưu vào một tệp ghi chú.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Mở 3-5 ảnh hoặc ấn phẩm của phòng mà bạn thấy ưng. Ghi ra điểm chung: màu chính (kèm mã nếu có), kiểu ảnh, nền sáng hay tối, điều bạn không muốn thấy. Gộp thành năm dòng, dán vào một yêu cầu tạo ảnh thật cho việc tuần này và so kết quả với ảnh mẫu.",
      secondary: "Lưu năm dòng đó vào tệp ghi chú để dán lại ở lần sau.",
    },
    sections: [
      {
        type: "lead",
        text: "Thứ Sáu bạn gửi bản tin có ba ảnh AI, và ba ảnh nhìn như của ba phòng khác nhau. Bài này dạy cách viết một đoạn quy định ngắn để mọi ảnh bạn tạo về sau trông cùng một nhà.",
      },
      {
        type: "feynman",
        title: "Chuẩn hình ảnh đơn giản hơn bạn nghĩ",
        intro: "Một quán phở có công thức nước dùng ghi sẵn: hôm nào ai nấu cũng ra cùng một vị. Đoạn quy định hình ảnh là công thức đó, còn AI là người phụ bếp mới mỗi lần bạn mở cửa và chưa biết vị quán bạn.",
        columns: ["Thành phần", "Công thức nước dùng", "Đoạn quy định hình ảnh"],
        rows: [
          ["Nguyên liệu cố định", "Xương, hành nướng, gừng", "Màu chính, kiểu ảnh, nền"],
          ["Điều không được làm", "Không cho đường quá tay", "Không chữ trong ảnh, không khuôn mặt thật"],
          ["Ai đọc", "Người nấu ca tối", "AI ở mỗi lần tạo ảnh"],
          ["Nếu vị lệch", "Sửa công thức, không đổ lỗi người nấu", "Sửa đoạn quy định rồi tạo lại"],
        ],
        oneLiner: "Viết công thức một lần cho rõ, rồi đưa nó cho người phụ bếp mới mỗi lần nấu.",
      },
      { type: "heading", text: "Vì sao ảnh mỗi lần mỗi khác" },
      {
        type: "paragraph",
        text: "Khi bạn viết 'ảnh đội nhóm đang họp', có hàng nghìn cách vẽ hợp lệ: ảnh chụp thật hay tranh vẽ, tông ấm hay lạnh. AI chọn một cách ngẫu nhiên và lần sau chọn cách khác. Muốn chúng giống nhau, bạn phải thu hẹp những lựa chọn đó bằng chữ.",
      },
      { type: "heading", text: "Đoạn quy định gồm những gì" },
      {
        type: "list",
        items: [
          "Màu chính và màu phụ, ghi tên kèm mã màu nếu phòng bạn có.",
          "Kiểu ảnh: ảnh chụp thật, minh hoạ phẳng hay tranh vẽ tay; nền sáng hay tối.",
          "Tỉ lệ khung: ngang cho bản tin, vuông cho bài đăng.",
          "Điều cấm: không có chữ trong ảnh, không khuôn mặt thật, không logo của bên khác.",
        ],
      },
      {
        type: "callout",
        label: "Mã màu chỉ là hướng dẫn",
        text: "AI có thể ra màu gần mã bạn ghi chứ không chắc khớp đến từng số. Đặt ảnh cạnh bảng màu thật hoặc logo của phòng để so bằng mắt, và nếu lệch hãy nói rõ với AI chỗ nào lệch chứ đừng chỉ bảo 'làm lại'.",
      },
      {
        type: "flow",
        title: "Từ vài ảnh ưng ý tới một bộ ảnh đồng bộ",
        steps: [
          { label: "Gom vài ảnh bạn ưng", detail: "Chọn 3-5 ảnh hoặc ấn phẩm của phòng mà bạn thấy đúng nhà. Nhìn chúng cạnh nhau để tìm điểm chung." },
          { label: "Ghi điểm chung thành dòng", detail: "Mỗi điểm chung một dòng ngắn: màu nào, kiểu nào, nền ra sao, điều gì không có mặt." },
          { label: "Dán vào đầu yêu cầu", detail: "Đoạn quy định đứng đầu, nội dung ảnh cần tạo hôm nay đứng sau. Cách làm này giữ nguyên đề bài mỗi lần." },
          { label: "So với bảng màu thật", detail: "Đặt ảnh mới cạnh ảnh cũ. Chỗ nào lệch thì sửa câu chữ trong đoạn quy định, không chỉ bấm tạo lại." },
        ],
      },
      {
        type: "scenario",
        title: "Ba ảnh cho bản tin tháng này",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn đã tạo hai ảnh: một ảnh minh hoạ phẳng xanh dương, một ảnh chụp thật tông cam. Bản tin cần thêm ảnh thứ ba và ba ảnh phải đi cùng nhau.",
            choices: [
              { label: "Tạo lại ảnh cam, thêm chữ 'đẹp hơn, đồng bộ hơn' vào yêu cầu", next: "bad_adj" },
              { label: "Viết năm dòng về màu, kiểu ảnh, điều cấm và dán vào đầu cả ba yêu cầu", next: "s2" },
            ],
          },
          bad_adj: {
            text: "Ảnh mới ra một kiểu thứ ba, xanh lá. Bạn mất cả buổi chiều bấm tạo lại, cuối cùng chọn đại ba ảnh nhìn khá gần nhau và bản tin vẫn trông lộn xộn.",
            ending: "bad",
          },
          s2: {
            text: "Ba ảnh nhìn đã cùng kiểu minh hoạ phẳng. Nhưng màu xanh ở ảnh thứ ba hơi nhạt hơn màu trên logo phòng.",
            choices: [
              { label: "Gửi luôn, AI đã nhận mã màu thì chắc chắn khớp", next: "bad_trust" },
              { label: "Đặt cạnh logo để so, nói rõ với AI 'xanh nhạt hơn logo' rồi làm lại", next: "good" },
            ],
          },
          bad_trust: {
            text: "Bản tin phát đi với một ảnh xanh lệch. Không ai nói gì nhưng sếp nhận ra ngay khi mở bản in cạnh các ấn phẩm cũ.",
            ending: "bad",
          },
          good: {
            text: "Ảnh làm lại khớp màu logo. Bạn lưu năm dòng quy định vào tệp ghi chú, và tháng sau chỉ cần dán lại.",
            ending: "good",
          },
        },
      },
      {
        type: "comparison",
        left: {
          label: "Có đoạn quy định dán sẵn",
          text: "Mỗi lần tạo ảnh AI nhận cùng đề bài. Ảnh lệch thì biết sửa ở đâu. Cả phòng dùng chung một bản. Người mới vào tuần sau vẫn ra ảnh đúng nhà.",
        },
        right: {
          label: "Chỉ gõ nội dung ảnh",
          text: "Mỗi lần AI tự chọn màu và kiểu khác. Ảnh lệch thì chỉ còn cách bấm tạo lại. Mỗi người trong phòng ra một phong cách riêng, nên ấn phẩm nhìn như của nhiều phòng.",
        },
      },
      {
        type: "closing",
        lines: [
          "Viết quy định một lần, dán mọi lần, rồi so với màu thật.",
          "Bài sau: từ dàn ý tới bản nháp slide trong một buổi chiều.",
        ],
      },
    ],
  },
  {
    id: 2326,
    slug: "slide-tu-dan-y-den-ban-nhap-bang-ai",
    title: "Chặng 46, Bài 7: Từ dàn ý tới bản nháp slide trong một buổi chiều",
    subtitle: "Bạn giữ dàn ý và số liệu, AI dựng khung: kết quả là bản nháp để sửa, không phải bản cuối.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "📽️",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Sáng mai bạn báo cáo 10 phút và chiều nay mới có dàn ý trong đầu. Dựng khung slide bằng tay mất hai tiếng chỉ để chia ý vào từng trang. AI làm phần chia đó trong vài phút, nhưng nếu bạn chỉ nói 'làm slide về doanh thu' thì nó sẽ bịa số để trang nào cũng đầy. Đưa dàn ý và số thật, bạn nhận khung đúng ý để dùng thời gian còn lại cho phần quan trọng là sửa và tập nói.",
    openingQuestion:
      "Bạn có dàn ý sáu ý và một bảng số cho buổi báo cáo 10 phút. Bạn nên giao gì cho AI để dựng bản nháp slide?",
    openingOptions: [
      "Dàn ý và bảng số đã kiểm, cùng yêu cầu mỗi slide một ý",
      "Chỉ tên buổi báo cáo, để AI tự tìm số liệu cho đầy đủ và đúng",
      "Bản báo cáo cũ của năm ngoái, nhờ AI đổi chữ cho thành năm nay",
      "Cả thư mục dữ liệu của phòng để AI tự chọn phần nó thấy hay nhất",
    ],
    correctOption: 0,
    explanation:
      "AI dựng khung rất nhanh, nhưng chỉ dựng đúng khi có nguyên liệu thật từ bạn. Dàn ý cho nó biết cần chia ý nào vào trang nào, số liệu đã kiểm cho nó chỗ dựa để khỏi bịa. Chỉ đưa tên buổi báo cáo thì nó tự lấp chỗ trống bằng những con số nghe hợp lý. Sửa số của năm ngoái dễ sót một con số cũ. Giao cả thư mục thì vừa có dữ liệu không nên đưa ra ngoài vừa để AI quyết thay bạn điều gì quan trọng.",
    diagram: [
      { label: "Bạn viết dàn ý và gom số liệu đã kiểm", arrow: true },
      { label: "Bạn tính số slide theo số phút trình bày", arrow: true },
      { label: "AI dựng khung: mỗi slide một ý, thiếu số thì để [cần bổ sung]", arrow: true },
      { label: "Bạn đối chiếu số, cắt chữ, tập nói một lượt" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một nhân viên vận hành có buổi báo cáo quý 10 phút. Cô viết dàn ý sáu dòng, dán bảng số đã kiểm và dặn AI chỉ dùng số trong bảng, thiếu thì ghi [cần bổ sung]. Bản nháp có sáu slide, trong đó hai chỗ ghi [cần bổ sung]. Cô điền hai chỗ đó từ báo cáo thật thay vì để AI đoán, và còn dư thời gian tập nói.",
    },
    quiz: [
      {
        question: "Nên đưa gì cho AI để dựng khung slide?",
        options: [
          "Dàn ý của bạn cùng số liệu đã kiểm",
          "Chỉ tên chủ đề, để AI tự tìm số liệu thị trường mới nhất cho đủ",
          "Toàn bộ thư mục dữ liệu của phòng để AI chọn phần hay nhất cho bạn",
          "Báo cáo năm ngoái, nhờ AI sửa các con số cho hợp với năm nay",
        ],
        correct: 0,
        explanation:
          "Dàn ý là quyết định của bạn về điều cần nói, số đã kiểm là nguyên liệu thật. Đưa chủ đề trơn thì AI bịa cho đủ trang, đưa cả thư mục là đưa dữ liệu ra ngoài không cần thiết, và sửa báo cáo cũ dễ để sót một con số của năm trước.",
      },
      {
        question: "Buổi báo cáo 10 phút, bạn ước chừng mỗi slide mất khoảng 2 phút. Nên có khoảng bao nhiêu slide nội dung?",
        options: [
          "5 slide (= 10 phút ÷ 2 phút mỗi slide)",
          "20 slide (= 10 phút × 2, nhân thay vì chia)",
          "12 slide (= 10 + 2, cộng thay vì chia)",
          "8 slide (= 10 − 2, trừ thay vì chia)",
        ],
        correct: 0,
        explanation:
          "Số slide bằng số phút chia cho số phút mỗi slide: 10 ÷ 2 = 5. Nhân cho ra 20 slide, tức cứ nửa phút một trang, người nghe không kịp đọc. Cộng và trừ không có nghĩa gì ở đây. Con số 2 phút chỉ là ước chừng của ví dụ, bạn tự điều chỉnh theo cách nói của mình.",
      },
      {
        question: "Khung slide AI dựng có câu 'Doanh thu tăng 35% so với năm ngoái', nhưng bảng số bạn đưa không có con số này. Bạn làm gì?",
        options: [
          "Xoá, hoặc thay bằng số từ bảng của bạn",
          "Giữ lại, AI tính tỷ lệ tăng khá chuẩn",
          "Giữ lại nhưng ghi chú nhỏ để nhớ kiểm tra sau buổi báo cáo",
          "Hỏi AI 'chắc chưa' và tin nếu nó trả lời rất chắc chắn",
        ],
        correct: 0,
        explanation:
          "Số không có trong dữ liệu của bạn là số AI tự thêm, dù nó nghe rất hợp lý. Giữ lại rồi kiểm sau là để sếp nghe một con số chưa được kiểm. Hỏi 'chắc chưa' không giúp vì AI trả lời chắc chắn cả khi nó đoán.",
      },
      {
        question: "Vì sao nên yêu cầu mỗi slide chỉ một ý?",
        options: [
          "Người nghe đọc chữ trên màn hình thì không nghe kịp lời bạn nói",
          "Vì AI chỉ hiểu được một ý cho mỗi slide nên nhiều ý sẽ bị lỗi khi dựng khung",
          "Vì slide ít chữ thì không cần phải kiểm lại số liệu nữa",
          "Vì công cụ dựng slide giới hạn số chữ tối đa trên mỗi trang",
        ],
        correct: 0,
        explanation:
          "Người ta không đọc và nghe cùng lúc một cách trọn vẹn, nên slide ít chữ để họ nhìn một ý và nghe bạn giải thích. AI dựng được nhiều ý trên một trang. Slide ít chữ vẫn có số cần kiểm. Giới hạn số chữ không phải lý do của nguyên tắc này.",
      },
      {
        question: "Khi nào bản nháp slide được coi là xong?",
        options: [
          "Khi bạn đã đối chiếu số và sửa cho hợp người nghe",
          "Khi AI báo đã hoàn thành và mọi slide đều có tiêu đề đầy đủ",
          "Khi mỗi slide đã có hình minh hoạ đẹp đi kèm nội dung",
          "Khi đã nhờ AI đọc lại toàn bộ và nó không thấy lỗi nào",
        ],
        correct: 0,
        explanation:
          "Bản nháp chỉ xong khi người chịu trách nhiệm đã kiểm số và chỉnh cho đúng người nghe. AI báo hoàn thành chỉ nghĩa là nó đã viết hết. Hình đẹp không làm con số đúng hơn. AI đọc lại không có bảng gốc để so nên không phát hiện được số bịa.",
      },
    ],
    keyTakeaways: [
      "Bạn giữ dàn ý và số liệu, AI dựng khung.",
      "Số slide xấp xỉ số phút chia số phút mỗi slide, tự điều chỉnh theo cách nói của mình.",
      "Mỗi slide một ý, thiếu số thì ghi [cần bổ sung].",
      "Số AI tự thêm là số bịa: xoá hoặc thay bằng số thật.",
      "Bản nháp xong khi bạn đã đối chiếu số và tập nói một lượt.",
    ],
    practicePrompt: {
      question:
        "Anh Nam gõ: 'Làm 15 slide báo cáo doanh thu quý 3.' AI trả về 15 slide đầy đủ số liệu. Điều đáng ngờ nhất là gì?",
      options: [
        "Anh chưa đưa số nào, nên các con số trên slide là AI tự nghĩ ra",
        "Mười lăm slide là quá ít cho một báo cáo quý",
        "AI đã dùng font chữ khác với mẫu của công ty",
        "Báo cáo quý 3 thường phải làm bằng bảng tính chứ không phải slide",
      ],
      correct: 0,
      explanation:
        "Không có số nào trong yêu cầu mà slide lại đầy số thì chúng là số AI điền cho đủ trang. Số slide, font chữ có thể sửa dễ dàng. Còn chọn bảng tính hay slide là tuỳ người nghe, không phải lỗi của AI.",
    },
    summary: {
      keyIdea: "AI dựng khung nhanh nhưng chỉ dựng đúng với dàn ý và số liệu thật của bạn.",
      formula: "Số slide ≈ số phút ÷ số phút mỗi slide; mỗi slide một ý; thiếu số thì để [cần bổ sung].",
      commonMistake: "Chỉ gõ chủ đề rồi tin những con số AI điền vào cho đủ trang.",
      action: "Viết dàn ý sáu dòng cho một buổi báo cáo sắp tới và tính số slide theo số phút.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một buổi báo cáo hoặc họp sắp tới của bạn. Viết dàn ý 5-6 dòng, tính số slide theo số phút, rồi nhờ AI dựng khung với dặn rõ: mỗi slide một ý, chỉ dùng số bạn đưa, thiếu thì ghi [cần bổ sung]. Đếm xem có bao nhiêu chỗ [cần bổ sung] và điền từ tài liệu thật của bạn.",
      secondary: "Gạch dưới mọi con số trên khung và ghi nguồn của nó ở bên cạnh.",
    },
    sections: [
      {
        type: "lead",
        text: "Chiều nay bạn có dàn ý trong đầu và sáng mai phải báo cáo 10 phút. Bài này chỉ cách giao cho AI phần dựng khung slide, và giữ phần nội dung quan trọng là dàn ý và con số thuộc về bạn.",
      },
      {
        type: "feynman",
        title: "Dựng slide bằng AI đơn giản hơn bạn nghĩ",
        intro: "Hãy nghĩ tới người thợ dựng khung nhà: bạn đưa bản vẽ, anh ta dựng khung rất nhanh. Nếu bạn không đưa bản vẽ, anh ta tự vẽ theo ý mình và khung không còn là nhà của bạn.",
        columns: ["Thành phần", "Dựng khung nhà", "Dựng khung slide"],
        rows: [
          ["Bản vẽ", "Bản vẽ của chủ nhà", "Dàn ý và số liệu của bạn"],
          ["Người dựng", "Thợ dựng khung", "AI"],
          ["Chỗ chưa có vật liệu", "Để trống, chờ mua", "Ghi [cần bổ sung]"],
          ["Nghiệm thu", "Chủ nhà đi kiểm từng phòng", "Bạn đối chiếu từng con số"],
        ],
        oneLiner: "Bạn đưa bản vẽ, AI dựng khung, và bạn vẫn là người nghiệm thu.",
      },
      { type: "heading", text: "Bước đầu: tính số slide trước khi nhờ AI" },
      {
        type: "paragraph",
        text: "Nhiều người mở AI trước khi biết mình cần bao nhiêu trang. Hãy lấy số phút trình bày chia cho số phút mỗi slide. Người mới thường cần khoảng hai phút cho một slide có số liệu, ít hơn với slide chỉ có một câu. Biểu đồ dưới đây cho bạn thử.",
      },
      {
        type: "chart",
        title: "Bao nhiêu slide cho buổi báo cáo của bạn",
        caption: "Số liệu minh hoạ: kéo thanh trượt để đổi số phút mỗi slide theo cách nói của bạn. Đây là ước chừng để lập kế hoạch, không phải quy tắc cố định.",
        kind: "line",
        xLabel: "Số phút trình bày",
        yLabel: "Số slide nội dung",
        x: { from: 5, to: 60, step: 5 },
        params: [
          { id: "pace", label: "Phút cho mỗi slide", min: 1, max: 4, step: 0.5, value: 2, unit: "phút" },
        ],
        series: [{ label: "Số slide vừa", expr: "round(x / pace)" }],
      },
      { type: "heading", text: "Bước hai: giao việc cho AI" },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI dựng khung cho buổi báo cáo 10 phút",
        task: "Bạn có dàn ý sáu dòng và bảng số đã kiểm về doanh thu ba tháng. Lắp yêu cầu để AI dựng khung slide đúng ý bạn.",
        parts: [
          {
            id: "input",
            label: "Đưa gì cho AI",
            options: [
              { text: "Làm slide về doanh thu quý này.", feedback: "Không có dàn ý và không có số, AI sẽ tự chọn ý và bịa số để các trang đầy." },
              { text: "Đây là dàn ý sáu dòng và bảng doanh thu ba tháng của tôi (dán nguyên).", good: true, feedback: "Có dàn ý và số thật, AI biết chia ý vào trang nào và lấy số ở đâu." },
            ],
          },
          {
            id: "size",
            label: "Kích cỡ",
            options: [
              { text: "Làm khoảng 15 slide cho đầy đủ.", feedback: "Mười lăm slide cho 10 phút là một trang mỗi 40 giây, người nghe không theo kịp." },
              { text: "Năm slide nội dung, mỗi slide một ý và một tiêu đề nói rõ ý đó.", good: true, feedback: "Số slide khớp thời gian, mỗi trang một ý nên người nghe nhìn một thứ và nghe bạn nói." },
            ],
          },
          {
            id: "gap",
            label: "Khi thiếu số",
            options: [
              { text: "Nếu thiếu số liệu thì tự bổ sung cho hợp lý.", feedback: "Tự bổ sung nghĩa là cho phép bịa, và số bịa nhìn giống hệt số thật." },
              { text: "Chỉ dùng số trong bảng; chỗ nào thiếu ghi [cần bổ sung].", good: true, feedback: "Chỗ trống lộ rõ nên bạn biết phải đi tìm gì và không có số bịa lọt vào." },
            ],
          },
        ],
        responses: [
          {
            requires: ["input", "size", "gap"],
            text: "Slide 1 - Doanh thu quý: tháng 1 đến tháng 3 (số theo bảng của bạn)\nSlide 2 - Tháng tốt nhất và lý do: [cần bổ sung lý do]\nSlide 3 - Chi phí tăng ở đâu\nSlide 4 - Rủi ro quý sau\nSlide 5 - Đề nghị sếp quyết định\n\n(Mỗi slide một ý, chỗ chưa có dữ liệu được đánh dấu.)",
          },
          {
            requires: ["input"],
            text: "Slide 1 - Doanh thu quý tăng 35% so với cùng kỳ\nSlide 2 - Khách hàng mới tăng 120 người\n...(tiếp tục đến slide 15)\n\n(Dàn ý đúng nhưng AI tự thêm tỷ lệ 35% và 120 khách mà bảng không có.)",
          },
          {
            text: "Slide 1 - Doanh thu quý 3: 4,2 tỷ đồng\nSlide 2 - Thị phần: 18%\n...(15 slide đầy đủ số liệu)\n\n(Không có dàn ý, không có số từ bạn: toàn bộ con số là AI nghĩ ra.)",
          },
        ],
      },
      {
        type: "callout",
        label: "Số AI điền là số chưa được kiểm",
        text: "Một slide đầy số trông chuyên nghiệp hơn một slide có chỗ trống, nên AI có xu hướng lấp đầy. Hãy coi mọi con số không nằm trong dữ liệu bạn đưa là con số cần xoá hoặc kiểm nguồn. Với số liên quan tới thuế hay hợp đồng, hỏi kế toán trưởng hoặc pháp chế trước khi đưa lên slide.",
      },
      {
        type: "scenario",
        title: "Chiều hôm trước buổi báo cáo",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn có dàn ý và bảng số. Bản nháp 5 slide của AI vừa xong, trông rất gọn. Còn hai tiếng.",
            choices: [
              { label: "Gửi luôn cho sếp xem trước vì bản nháp nhìn ổn", next: "bad_send" },
              { label: "Đối chiếu từng con số trên slide với bảng gốc", next: "s2" },
            ],
          },
          bad_send: {
            text: "Sếp hỏi nguồn con số 35% ở slide 2. Bạn không có nguồn vì AI tự thêm, và cả buổi họp bạn phải nói 'để em kiểm lại'.",
            ending: "bad",
          },
          s2: {
            text: "Bạn thấy hai con số không có trong bảng và một chỗ ghi [cần bổ sung]. Còn một tiếng rưỡi.",
            choices: [
              { label: "Xoá số lạ, điền chỗ trống từ báo cáo thật, rồi tập nói một lượt", next: "good" },
              { label: "Nhờ AI điền nốt chỗ [cần bổ sung] cho nhanh", next: "bad_fill" },
            ],
          },
          bad_fill: {
            text: "AI điền một con số nghe rất hợp lý. Sáng hôm sau một đồng nghiệp đối chiếu với báo cáo và số đó lệch. Bạn mất uy tín ngay đầu buổi họp.",
            ending: "bad",
          },
          good: {
            text: "Bạn tập nói hết lượt trong 9 phút 30 giây. Khi sếp hỏi nguồn, bạn chỉ đúng dòng trong bảng gốc.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Viết dàn ý, tính số slide theo số phút.",
          "Bước 2 - Dán dàn ý và số đã kiểm, dặn mỗi slide một ý.",
          "Bước 3 - Xoá mọi số không có trong dữ liệu của bạn.",
          "Bước 4 - Tập nói một lượt và điều chỉnh độ dài.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Dàn ý và số liệu là của bạn, AI chỉ dựng khung.",
          "Bài sau: rút gọn slide quá dày chữ mà không làm sai ý.",
        ],
      },
    ],
  },
  {
    id: 2327,
    slug: "slide-day-chu-cach-bo-bot-cho-nguoi-nghe",
    title: "Chặng 46, Bài 8: Slide dày chữ: cách bỏ bớt cho người nghe",
    subtitle: "Mỗi trang còn một ý lên màn hình, phần còn lại thành lời bạn nói.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "✂️",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bạn nhận một bộ slide của đồng nghiệp, mỗi trang mười hai dòng chữ nhỏ. Người nghe sẽ đọc màn hình và bỏ qua lời bạn nói. Nhờ AI rút gọn thì nhanh, nhưng rút gọn cũng là lúc AI dễ làm sai: nó đổi một con số, gộp hai ý thành một hoặc thêm một nhận xét không có trong bản gốc. Biết cách chọn ý và soát lại giúp slide gọn mà không sai.",
    openingQuestion:
      "Slide có 12 dòng chữ, bạn rút còn một ý lên màn hình. Mười một dòng còn lại nên xử lý thế nào?",
    openingOptions: [
      "Chuyển vào ghi chú người nói để bạn nói ra thay vì để trên màn hình",
      "Xoá hẳn, vì người nghe không cần biết những chi tiết đó và sếp sẽ tự hỏi khi cần",
      "Thu nhỏ chữ để vẫn giữ đủ 12 dòng trên một trang",
      "Chuyển hết sang slide phụ phía sau rồi không nhắc tới nữa",
    ],
    correctOption: 0,
    explanation:
      "Mười một dòng kia vẫn là nội dung bạn muốn truyền đạt, nên chúng chuyển từ màn hình sang lời nói, để người nghe nhìn một ý và nghe phần giải thích. Xoá hẳn thì mất thông tin bạn cần. Thu nhỏ chữ chỉ làm slide khó đọc hơn mà vẫn dày. Đưa sang slide phụ mà không nhắc tới thì coi như bỏ đi, người nghe không biết nó tồn tại.",
    diagram: [
      { label: "Đọc slide dày, tìm ý người nghe cần nhớ nhất", arrow: true },
      { label: "Giữ ý đó làm tiêu đề hoặc một dòng trên màn hình", arrow: true },
      { label: "Chuyển phần còn lại vào ghi chú người nói", arrow: true },
      { label: "Soát số và tên với bản gốc vì AI có thể đã đổi khi rút gọn" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một chuyên viên nhân sự nhận bộ slide đào tạo 20 trang, mỗi trang đầy chữ. Chị nhờ AI đề xuất mỗi trang một ý chính và chuyển chi tiết sang ghi chú. Khi soát, chị thấy ở một trang AI viết 'hầu hết nhân viên hoàn thành khoá học' trong khi bản gốc ghi 'phần lớn đã đăng ký'. Chị sửa lại theo bản gốc trước khi trình bày.",
    },
    quiz: [
      {
        question: "Slide có 12 dòng chữ, bạn chỉ giữ một ý. Phần còn lại nên để ở đâu?",
        options: [
          "Ghi chú người nói, để bạn nói ra thay vì để chữ trên màn hình",
          "Xoá hẳn, vì người nghe không cần những chi tiết đó",
          "Thu nhỏ chữ để vẫn giữ đủ 12 dòng trên một trang",
          "Slide phụ phía sau mà bạn không nhắc tới trong buổi họp",
        ],
        correct: 0,
        explanation:
          "Phần còn lại vẫn là nội dung bạn muốn truyền đạt, nên nó đi từ màn hình vào lời nói. Xoá thì mất thông tin, thu nhỏ chữ không làm slide bớt dày, còn đưa xuống slide phụ không nhắc tới là bỏ phần đó mà không nói cho ai biết.",
      },
      {
        question: "Khi nhờ AI rút gọn slide, điều gì cần soát nhất?",
        options: [
          "Số và tên có còn giống bản gốc",
          "Mỗi dòng có dài bằng nhau không, để slide nhìn cân đối hơn",
          "AI có dùng đủ từ chuyên ngành để bài nghe chuyên nghiệp không",
          "Có nhiều gạch đầu dòng hơn bản gốc để thông tin rõ ràng hơn không",
        ],
        correct: 0,
        explanation:
          "Rút gọn là lúc số và tên dễ bị đổi, làm tròn hoặc gộp sai. Độ dài dòng chỉ là chuyện trình bày, từ chuyên ngành không làm bài đúng hơn, và thêm gạch đầu dòng ngược với mục tiêu rút gọn.",
      },
      {
        question: "Bản gốc ghi 'khách quay lại 38%, trước đó 30%' (số liệu minh hoạ). AI rút thành 'khách quay lại tăng gần gấp đôi'. Đánh giá nào đúng?",
        options: [
          "Rút gọn đã thổi phồng: từ 30% lên 38% không phải gần gấp đôi",
          "Không sai, vì tăng 8 điểm phần trăm là rất nhiều nên gọi gấp đôi được",
          "Sai vì thiếu ký hiệu %, còn ý nghĩa thì hoàn toàn đúng",
          "Sai vì AI không được dùng từ 'gấp đôi' trong bất kỳ slide nào",
        ],
        correct: 0,
        explanation:
          "Từ 30% lên 38% là tăng 8 điểm phần trăm, tức khoảng một phần tư mức cũ, còn gấp đôi phải là 60%. Đây là kiểu sai hay gặp: rút gọn làm câu mạnh hơn sự thật. Thiếu ký hiệu không phải vấn đề chính, và từ 'gấp đôi' dùng được khi số liệu thật là vậy.",
      },
      {
        question: "Mỗi slide chỉ giữ được một ý. Nên chọn ý nào?",
        options: [
          "Ý mà người nghe cần nhớ nếu họ chỉ nhớ được một điều từ trang đó",
          "Câu đầu tiên của đoạn gốc trên trang đó, vì câu đầu thường chứa ý chính",
          "Ý có nhiều con số nhất để slide trông thuyết phục",
          "Ý ngắn nhất cho slide thật gọn",
        ],
        correct: 0,
        explanation:
          "Chọn theo điều người nghe cần mang về, không theo vị trí hay độ dài. Câu đầu của đoạn gốc có khi chỉ là lời dẫn. Nhiều số chưa chắc là ý chính, và ý ngắn nhất có thể là ý phụ.",
      },
      {
        question: "Slide chỉ còn một ý nhưng sếp hỏi chi tiết. Cách chuẩn bị nào hợp lý?",
        options: [
          "Chi tiết nằm ở ghi chú người nói và slide phụ để lật ra khi được hỏi",
          "Đưa lại toàn bộ chi tiết lên slide chính cho chắc",
          "Hẹn sếp hỏi sau buổi họp vì slide gọn thì không cần chi tiết",
          "In bản gốc 12 dòng phát cho mọi người đọc trong lúc bạn nói",
        ],
        correct: 0,
        explanation:
          "Slide chính gọn để nói, còn chi tiết để sẵn chỗ khác, sếp hỏi thì bạn lật ra. Đưa lại hết lên slide thì quay về vấn đề cũ. Hẹn sau buổi họp nghe như né câu hỏi, và phát bản gốc thì người nghe lại đọc thay vì nghe.",
      },
    ],
    keyTakeaways: [
      "Mỗi slide một ý lên màn hình, phần còn lại thành lời nói hoặc ghi chú.",
      "Chọn ý theo điều người nghe cần nhớ, không theo thứ tự hay độ dài.",
      "Rút gọn là lúc số và tên dễ bị đổi: luôn soát với bản gốc.",
      "AI có xu hướng làm câu mạnh hơn sự thật khi rút gọn.",
      "Để chi tiết sẵn ở ghi chú hoặc slide phụ phòng khi có người hỏi.",
    ],
    practicePrompt: {
      question:
        "Bản gốc ghi 'đã hoàn thành 45 trên 60 khoá học'. AI rút gọn thành 'gần như mọi người đã hoàn thành'. Bạn nên làm gì?",
      options: [
        "Sửa lại thành '45 trên 60 đã hoàn thành' đúng bản gốc",
        "Giữ nguyên vì 'gần như mọi người' nghe gọn và thuyết phục hơn",
        "Bỏ hẳn dòng này khỏi slide để khỏi phải giải thích với người xem",
        "Nhờ AI viết lại thêm lần nữa và tin nếu nó giữ nguyên câu đó",
      ],
      correct: 0,
      explanation:
        "45 trên 60 là ba phần tư, chưa phải 'gần như mọi người'. Đưa đúng số gốc là cách an toàn nhất. Giữ câu thổi phồng thì người nghe hiểu sai, bỏ dòng thì mất thông tin, và hỏi lại AI không có bản gốc để so, nó có thể vẫn giữ nguyên.",
    },
    summary: {
      keyIdea: "Slide gọn là chuyển chữ từ màn hình sang lời nói, không phải xoá thông tin.",
      formula: "Một ý trên màn hình + phần còn lại ở ghi chú người nói + soát số với bản gốc.",
      commonMistake: "Để AI rút gọn rồi dùng luôn, không thấy rằng số và mức độ đã bị đổi.",
      action: "Chọn một slide dày chữ của bạn, giữ một ý và viết phần còn lại thành ghi chú.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy một bộ slide thật mà bạn hoặc đồng nghiệp đã làm và chọn ba trang dày nhất. Nhờ AI đề xuất một ý chính cho mỗi trang và chuyển phần còn lại thành ghi chú người nói. Đặt bản rút gọn cạnh bản gốc và gạch chân mọi số, tên, mức độ (tăng, giảm, hầu hết) để đối chiếu từng chỗ.",
      secondary: "Ghi lại chỗ nào AI làm câu mạnh hơn bản gốc để lần sau dặn rõ.",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn mở bộ slide đồng nghiệp gửi và thấy mỗi trang mười hai dòng chữ nhỏ. Bài này dạy cách rút mỗi trang còn một ý mà không làm sai nội dung.",
      },
      {
        type: "feynman",
        title: "Bỏ bớt chữ trên slide đơn giản hơn bạn nghĩ",
        intro: "Hãy nghĩ tới tấm biển chỉ đường: nó chỉ ghi tên đường và mũi tên. Người lái xe không đọc cả trang chỉ dẫn, còn chi tiết nằm ở bản đồ trong tay người ngồi cạnh. Slide là tấm biển, ghi chú của bạn là bản đồ.",
        columns: ["Thành phần", "Biển chỉ đường", "Slide"],
        rows: [
          ["Thứ nhìn lướt", "Tên đường, mũi tên", "Một ý, một tiêu đề"],
          ["Thứ giải thích thêm", "Bản đồ chi tiết", "Lời bạn nói, ghi chú người nói"],
          ["Nếu ghi quá nhiều", "Lái xe không kịp đọc", "Người nghe đọc và bỏ qua bạn"],
          ["Ai kiểm", "Người làm biển", "Bạn đối chiếu với bản gốc"],
        ],
        oneLiner: "Trên màn hình chỉ đủ để người nghe nhìn lướt, phần giải thích là việc của bạn.",
      },
      { type: "heading", text: "Vấn đề: người nghe chỉ làm được một việc một lúc" },
      {
        type: "paragraph",
        text: "Khi màn hình có mười hai dòng, người nghe đọc hết rồi mới ngẩng lên, lúc đó bạn đã nói sang ý khác. Họ không nghe được phần bạn giải thích. Một ý trên màn hình thì họ nhìn một lần và quay lại nghe bạn.",
      },
      {
        type: "flow",
        title: "Từ slide mười hai dòng tới slide một ý",
        steps: [
          { label: "Đọc cả trang, hỏi một câu", detail: "Nếu người nghe chỉ nhớ được một điều từ trang này thì đó là điều gì? Câu trả lời là ý lên màn hình." },
          { label: "Viết ý đó thành một dòng", detail: "Nên là một câu có chủ ngữ và động từ, không phải từ khoá rời rạc. Ví dụ: 'Khoá học đã hoàn thành ở mức ba phần tư'." },
          { label: "Chuyển phần còn lại vào ghi chú", detail: "Những dòng còn lại đi vào ghi chú người nói. Bạn nói ra, người nghe không phải đọc." },
          { label: "Soát với bản gốc", detail: "Đặt hai bản cạnh nhau: số, tên, mức độ (tăng, giảm, hầu hết) có còn đúng không." },
        ],
      },
      { type: "heading", text: "Nhờ AI rút gọn, rồi soát" },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát bản rút gọn của AI",
        task: "Bản gốc ghi: 'Đã hoàn thành 45 trên 60 khoá học; 12 người chưa đăng ký; hạn chót là cuối tháng.' AI rút gọn thành các dòng dưới đây. Đánh dấu dòng nào bị AI đổi hoặc thêm so với bản gốc.",
        segments: [
          { text: "Tiến độ đào tạo: 45 trên 60 khoá học đã hoàn thành." },
          { text: "Phần lớn nhân viên đã hoàn thành toàn bộ khoá học." , error: "Bản gốc chỉ có 45 trên 60, tức ba phần tư, không phải toàn bộ. AI làm câu mạnh hơn sự thật." },
          { text: "Hạn chót là cuối tháng." },
          { text: "Khoá học được đánh giá tốt bởi 90% người tham gia.", error: "Bản gốc không hề nói về đánh giá hay con số 90%. AI tự thêm cho slide có vẻ tích cực." },
          { text: "Đang có 12 người chưa đăng ký." },
        ],
      },
      {
        type: "callout",
        label: "Rút gọn hay làm câu mạnh hơn",
        text: "Khi nén nhiều ý thành một câu, AI thường chọn cách nói nghe gọn và dứt khoát, và đó là lúc 'ba phần tư' thành 'hầu hết'. Những chữ đáng nghi nhất là: tất cả, hầu hết, gần gấp đôi, đều. Gặp chúng hãy quay về con số gốc.",
      },
      {
        type: "scenario",
        title: "Bộ slide đồng nghiệp gửi lúc 4 giờ chiều",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn nhận bộ 8 slide dày chữ và sáng mai phải trình bày. Bạn nhờ AI đề xuất một ý chính cho mỗi trang.",
            choices: [
              { label: "Dán bản AI vào slide ngay vì nó gọn và đọc nghe hợp lý", next: "bad_paste" },
              { label: "Đặt bản AI cạnh bản gốc, đối chiếu số và từ chỉ mức độ", next: "s2" },
            ],
          },
          bad_paste: {
            text: "Sáng hôm sau đồng nghiệp hỏi: 'Sao slide 4 bảo tất cả hoàn thành, báo cáo của mình ghi ba phần tư?'. Bạn phải sửa tại chỗ trước cả phòng.",
            ending: "bad",
          },
          s2: {
            text: "Bạn tìm thấy hai chỗ AI làm câu mạnh hơn bản gốc. Còn ba tiếng.",
            choices: [
              { label: "Sửa hai chỗ theo số gốc, chuyển phần còn lại vào ghi chú người nói", next: "good" },
              { label: "Xoá hai dòng đó cho đỡ rắc rối, không thay thế gì", next: "bad_drop" },
            ],
          },
          bad_drop: {
            text: "Hai slide chỉ còn tiêu đề trơ trọi. Khi sếp hỏi về tỷ lệ hoàn thành bạn không có con số nào để nói và phải mở lại báo cáo giữa buổi họp.",
            ending: "bad",
          },
          good: {
            text: "Bộ slide gọn và khớp bản gốc. Bạn mở ghi chú khi được hỏi và trả lời bằng số đúng.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Mỗi trang, tìm ý người nghe cần nhớ nhất.",
          "Bước 2 - Chuyển phần còn lại vào ghi chú người nói.",
          "Bước 3 - Đối chiếu số, tên và các từ chỉ mức độ với bản gốc.",
          "Bước 4 - Giữ chi tiết sẵn để trả lời khi được hỏi.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Một ý lên màn hình, phần còn lại là việc của bạn, và luôn soát với bản gốc.",
          "Bài sau: kiểm số và trục của biểu đồ AI vẽ trên slide.",
        ],
      },
    ],
  },
  {
    id: 2328,
    slug: "bieu-do-tren-slide-ai-ve-sai-cho-nao",
    title: "Chặng 46, Bài 9: Biểu đồ AI vẽ trên slide: kiểm số và trục",
    subtitle: "Một biểu đồ đẹp vẫn có thể sai ở hai chỗ: con số của từng cột và điểm bắt đầu của trục.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "📊",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bạn nhờ AI vẽ biểu đồ doanh thu từ bảng số để đưa vào slide. Nó ra rất đẹp, nhưng một cột có thể không khớp bảng và cái trục bị cắt làm chênh lệch nhỏ trông như một bước nhảy lớn. Sếp nhìn biểu đồ trước khi đọc số, nên sai ở đây thường dẫn tới quyết định sai. Kiểm hai chỗ này chỉ mất năm phút.",
    openingQuestion:
      "AI vừa vẽ biểu đồ cột từ bảng số của bạn và trông rất đẹp. Bạn nên kiểm điều gì đầu tiên?",
    openingOptions: [
      "Từng cột có khớp với số trong bảng gốc, và trục bắt đầu từ đâu",
      "Màu của các cột có hợp với màu thương hiệu không hơn là số liệu có đúng không",
      "Tiêu đề biểu đồ có đủ dài để người xem hiểu không",
      "Biểu đồ có nhiều cột hơn bảng số để trông đầy đủ không",
    ],
    correctOption: 0,
    explanation:
      "Biểu đồ là con số được vẽ thành hình, nên lỗi nguy hiểm nhất là cột không khớp số hoặc trục làm chênh lệch trông to hơn thật. Màu và tiêu đề là chuyện trình bày, chỉnh sau cũng được. Nhiều cột hơn bảng số là dấu hiệu AI đã thêm dữ liệu không có, tức là lỗi chứ không phải ưu điểm.",
    diagram: [
      { label: "Đặt biểu đồ cạnh bảng số gốc", arrow: true },
      { label: "So từng cột với một số trong bảng", arrow: true },
      { label: "Nhìn trục dọc: có bắt đầu từ 0 không, đơn vị có rõ không", arrow: true },
      { label: "Sai chỗ nào thì sửa và nói rõ với AI, hoặc tự dựng bằng bảng tính" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một nhân viên kinh doanh nhờ AI vẽ doanh thu hai quý là 40 và 44 triệu (số minh hoạ). Biểu đồ có trục bắt đầu từ 38, nên cột quý sau cao gấp ba lần cột quý trước. Khi so với bảng, cô thấy mức tăng thật là 10%, và dặn AI vẽ lại với trục bắt đầu từ 0.",
    },
    quiz: [
      {
        question: "Bước đầu tiên khi nhận biểu đồ AI vẽ là gì?",
        options: [
          "So từng cột với bảng số gốc",
          "Đổi màu các cột cho hợp màu thương hiệu của phòng bạn rồi mới xem tiếp",
          "Đọc tiêu đề và nhờ AI viết lại cho hay hơn trước khi kiểm phần số",
          "Xem biểu đồ có nhìn đẹp và cân đối không rồi mới quyết định có dùng",
        ],
        correct: 0,
        explanation:
          "Biểu đồ chỉ có giá trị khi khớp số gốc. Màu, tiêu đề, độ cân đối đều chỉnh sau được, còn nếu cột sai thì mọi thứ sau đó chỉ làm cái sai trông đẹp hơn.",
      },
      {
        question: "Trục dọc của biểu đồ cột bắt đầu từ 90 thay vì 0. Vấn đề là gì?",
        options: [
          "Chênh lệch nhỏ trông rất lớn, nên với biểu đồ cột thường bắt đầu trục từ 0",
          "Không có vấn đề, vì AI luôn chọn trục hợp lý nhất cho dữ liệu của bạn",
          "Chỉ là chuyện thẩm mỹ, vì người xem nào cũng đọc số ghi trên cột",
          "Trục bắt đầu từ 90 làm các cột ngắn đi, nên biểu đồ bớt gây chú ý",
        ],
        correct: 0,
        explanation:
          "Độ cao của cột biểu thị độ lớn, nên khi cắt trục thì cột thấp trông như mất hẳn một phần. Hai cột 92 và 98 sẽ trông như một cột cao gấp nhiều lần cột kia. Nhiều người xem chỉ nhìn hình, không đọc số. Và ngược lại, cắt trục làm chênh lệch trông lớn hơn chứ không nhỏ đi.",
      },
      {
        question: "Bảng ghi quý 1 là 40, quý 2 là 44 (số liệu minh hoạ). Mức tăng của quý 2 so với quý 1 là bao nhiêu?",
        options: [
          "10% (= (44 − 40) ÷ 40, chia cho số gốc)",
          "4% (= 44 − 40, lấy hiệu số làm luôn phần trăm)",
          "110% (= 44 ÷ 40, quên trừ phần gốc)",
          "9% (= (44 − 40) ÷ 44, chia cho số mới)",
        ],
        correct: 0,
        explanation:
          "Mức tăng là phần tăng thêm chia cho số ban đầu: 4 ÷ 40 = 10%. Lấy hiệu làm phần trăm cho 4%, chia 44 bằng 110% là tỷ lệ chứ chưa phải mức tăng, và chia cho số mới cho 9%, sai mẫu số.",
      },
      {
        question: "Biểu đồ tròn AI vẽ có các phần cộng lại thành 112%. Cách nghĩ nào đúng?",
        options: [
          "Có lỗi: làm tròn chỉ lệch 1-2%, không lệch 12%",
          "Bình thường, AI làm tròn nên tổng hay vượt",
          "Bình thường nếu có các nhóm nhỏ gộp chung vào mục 'khác' khi vẽ",
          "Do AI dùng công thức tính phần trăm riêng không theo quy tắc chung",
        ],
        correct: 0,
        explanation:
          "Biểu đồ tròn là một tổng thể nên các phần phải ra đủ 100%, sai số do làm tròn chỉ nhỏ. 112% nghĩa là có phần bị tính hai lần hoặc con số sai. Gộp nhóm nhỏ vào 'khác' vẫn cho tổng 100%, và AI không có công thức riêng, chỉ có khả năng nhầm.",
      },
      {
        question: "Cách nào an toàn nhất để có biểu đồ đáng tin cho slide?",
        options: [
          "Dựng bằng công cụ bảng tính từ dữ liệu gốc, hoặc nhờ AI vẽ rồi so từng cột",
          "Nhờ AI vẽ rồi nhờ chính AI kiểm tra lại xem có sai không",
          "Dùng biểu đồ AI vẽ nếu nhìn đẹp và không có cột nào trông lạ",
          "Vẽ tay trên giấy để chắc chắn số liệu không đi qua máy",
        ],
        correct: 0,
        explanation:
          "Công cụ bảng tính vẽ thẳng từ ô dữ liệu nên cột khớp số, còn biểu đồ AI vẽ thì cần bạn so từng cột. AI tự kiểm không có bảng gốc để so. Nhìn đẹp không chứng minh số đúng, còn vẽ tay thì chậm và dễ sai hơn, không an toàn hơn.",
      },
    ],
    keyTakeaways: [
      "Biểu đồ là con số vẽ thành hình: kiểm số từng cột với bảng gốc.",
      "Trục cột nên bắt đầu từ 0; trục bị cắt làm chênh lệch nhỏ trông lớn.",
      "Mức tăng = phần tăng thêm chia cho số gốc.",
      "Biểu đồ tròn phải cộng đủ 100%.",
      "Dữ liệu trong bảng tính vẽ thẳng thành biểu đồ thì cột luôn khớp số.",
    ],
    practicePrompt: {
      question:
        "AI vẽ biểu đồ doanh thu 3 tháng: 50, 52, 55 triệu (số minh hoạ), trục bắt đầu từ 49 nên cột tháng 3 cao gấp sáu lần tháng 1. Bạn nên làm gì?",
      options: [
        "Dặn AI vẽ lại với trục bắt đầu từ 0, hoặc dựng bằng bảng tính",
        "Giữ nguyên vì biểu đồ trông rõ và dễ thấy xu hướng hơn",
        "Xoá các số ghi trên cột để người xem không thấy trục bị cắt",
        "Thêm chú thích 'số liệu ước tính' nhỏ mà không đổi gì ở biểu đồ",
      ],
      correct: 0,
      explanation:
        "Từ 50 lên 55 chỉ tăng 10%, nhưng trục cắt làm cột cao gấp sáu lần. Vẽ lại với trục từ 0 cho người xem thấy đúng độ lớn. Giữ nguyên là làm sai lệch, xoá số càng che giấu, và chú thích 'ước tính' không sửa được hình dáng của biểu đồ.",
    },
    summary: {
      keyIdea: "Biểu đồ đẹp vẫn có thể sai số cột hoặc cắt trục: luôn so với bảng gốc.",
      formula: "Mức tăng = (số mới − số cũ) ÷ số cũ; trục cột bắt đầu từ 0; biểu đồ tròn cộng đủ 100%.",
      commonMistake: "Dùng biểu đồ vì nhìn đẹp và cho rằng AI đã tính đúng từng cột.",
      action: "Mở một biểu đồ trong slide gần đây của bạn và so từng cột với bảng số gốc.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy một bảng số nhỏ thật của bạn (doanh thu, số đơn, chi phí, 4-6 dòng). Nhờ AI vẽ thành biểu đồ cột, rồi tự tay so từng cột với từng dòng của bảng và nhìn trục dọc xem bắt đầu từ đâu. Ghi lại lỗi tìm được (hoặc ghi 'không lỗi') kèm con số cụ thể.",
      secondary: "Dựng cùng biểu đồ đó bằng công cụ bảng tính và so hai bản.",
    },
    sections: [
      {
        type: "lead",
        text: "Sếp nhìn biểu đồ trước khi đọc bất kỳ con số nào, nên sai ở biểu đồ là sai ở chỗ dễ bị tin nhất. Bài này dạy hai phép kiểm nhanh: số từng cột và điểm bắt đầu của trục.",
      },
      {
        type: "feynman",
        title: "Kiểm biểu đồ đơn giản hơn bạn nghĩ",
        intro: "Hãy nghĩ tới cây thước có phần đầu bị cưa mất: nó vẫn có vạch và số, nhưng đo gì cũng ra con số quá lớn. Trục bị cắt cũng vậy, nhìn vẫn chuẩn mà mọi cột đều bị phóng to.",
        columns: ["Thành phần", "Thước đo", "Biểu đồ"],
        rows: [
          ["Vạch chia", "Các vạch trên thước", "Các mốc trên trục dọc"],
          ["Điểm bắt đầu", "Vạch số 0 ở đầu thước", "Trục bắt đầu từ 0"],
          ["Sai số", "Đầu thước bị cưa", "Trục bị cắt: chênh lệch nhỏ trông lớn"],
          ["Cách kiểm", "Đo thử một vật đã biết", "So cột với một số đã biết trong bảng"],
        ],
        oneLiner: "Trục là cây thước của biểu đồ: muốn tin được hình thì xem thước còn nguyên đầu không.",
      },
      { type: "heading", text: "Hai chỗ AI hay sai khi vẽ biểu đồ" },
      {
        type: "paragraph",
        text: "Chỗ thứ nhất là con số của cột: AI đọc bảng rồi vẽ, nhưng nó có thể đọc lệch một dòng, bỏ một cột hoặc thêm một cột không có trong bảng. Chỗ thứ hai là trục: để biểu đồ nhìn rõ hơn, AI hoặc công cụ có thể cắt trục cho cột bắt đầu từ giữa chừng.",
      },
      {
        type: "flow",
        title: "Năm phút kiểm một biểu đồ",
        steps: [
          { label: "Đặt biểu đồ cạnh bảng gốc", detail: "Bảng số là chuẩn. Biểu đồ chỉ là hình vẽ lại bảng đó, nên mọi chỗ khác nhau đều là lỗi của biểu đồ." },
          { label: "So từng cột với một dòng", detail: "Đếm số cột bằng số dòng trong bảng. Mỗi cột đối chiếu với đúng một con số." },
          { label: "Nhìn trục dọc", detail: "Trục bắt đầu từ đâu? Nếu không phải 0 với biểu đồ cột thì chênh lệch đang bị phóng to." },
          { label: "Đọc đơn vị và tiêu đề", detail: "Triệu hay tỷ, tháng hay quý. Sai đơn vị là lỗi nhỏ nhưng làm sai cả câu chuyện." },
        ],
      },
      {
        type: "callout",
        label: "Mức tăng thật thường nhỏ hơn hình vẽ",
        text: "Từ 40 lên 44 là tăng 4 trên 40, tức 10%. Nếu trục bị cắt từ 38, cột thứ hai cao gấp ba lần cột thứ nhất (6 so với 2) và người xem tưởng tăng 200%. Những số ở đây là số liệu minh hoạ, nhưng cách tính thì luôn đúng: chia phần tăng cho số gốc.",
      },
      {
        type: "scenario",
        title: "Biểu đồ doanh thu trước giờ họp",
        start: "s1",
        nodes: {
          s1: {
            text: "AI vừa vẽ biểu đồ cột doanh thu 4 quý cho slide. Trông rất đẹp, cột quý 4 nhô hẳn lên. Bạn còn 30 phút trước buổi họp.",
            choices: [
              { label: "Đưa vào slide luôn vì hình rõ và dễ thấy xu hướng", next: "bad_use" },
              { label: "So từng cột với bảng số và nhìn trục dọc", next: "s2" },
            ],
          },
          bad_use: {
            text: "Sếp khen quý 4 'tăng vọt' và đề xuất thêm ngân sách. Sau buổi họp bạn mới thấy mức tăng thật chỉ khoảng 10%, còn cột cao vì trục bắt đầu từ 90.",
            ending: "bad",
          },
          s2: {
            text: "Số các cột khớp bảng, nhưng trục bắt đầu từ 90 chứ không phải 0.",
            choices: [
              { label: "Vẽ lại với trục từ 0 hoặc dựng bằng bảng tính rồi kiểm lại", next: "good" },
              { label: "Giữ trục như cũ, chỉ ghi thêm mức tăng 10% ở góc slide", next: "bad_note" },
            ],
          },
          bad_note: {
            text: "Người xem vẫn nhìn hình trước: cột cao gấp ba khiến họ nghĩ mức tăng lớn hơn nhiều con số 10% ở góc. Hình và số mâu thuẫn nhau nên câu hỏi dồn vào bạn.",
            ending: "bad",
          },
          good: {
            text: "Biểu đồ vẽ lại cho thấy mức tăng khiêm tốn đúng với số liệu. Sếp quyết định dựa trên con số thật.",
            ending: "good",
          },
        },
      },
      {
        type: "comparison",
        left: {
          label: "Dựng từ bảng tính",
          text: "Cột vẽ thẳng từ ô dữ liệu nên khớp số. Đổi số trong bảng thì biểu đồ đổi theo. Bạn chủ động chọn trục từ 0. Dễ kiểm lại khi có người hỏi.",
        },
        right: {
          label: "AI vẽ từ bảng dán vào",
          text: "Có thể đọc lệch dòng hoặc thêm bớt cột. Trục do AI tự chọn và có thể bị cắt. Đổi số phải nhờ vẽ lại. Bạn luôn phải so từng cột với bảng gốc.",
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Đặt bảng số gốc cạnh biểu đồ.",
          "Bước 2 - So từng cột, đếm số cột.",
          "Bước 3 - Nhìn trục bắt đầu từ đâu, đơn vị là gì.",
          "Bước 4 - Tính mức tăng thật và so với cảm giác từ hình vẽ.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Hình nói trước số, nên hãy kiểm hình trước khi đưa cho sếp.",
          "Bài sau: dự án nhỏ làm năm slide cho một đề xuất.",
        ],
      },
    ],
  },
  {
    id: 2329,
    slug: "du-an-nho-slide-nam-trang-cho-mot-de-xuat",
    title: "Chặng 46, Bài 10: Dự án nhỏ: năm slide cho một đề xuất",
    subtitle: "Vấn đề, giải pháp, chi phí, rủi ro và việc sếp cần quyết: năm trang, mỗi trang một việc.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "🗂️",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bạn muốn xin sếp duyệt một khoản mua hoặc một thay đổi trong phòng. Sếp có năm phút và không muốn đọc mười slide. Bộ năm slide có cấu trúc rõ giúp họ quyết nhanh, nhưng nếu bạn để AI tự viết thì phần chi phí và rủi ro dễ bị bịa hoặc nói giảm. Dự án này gộp những gì bạn đã học: dàn ý, số thật, rút gọn và kiểm.",
    openingQuestion:
      "Bạn cần bộ slide xin sếp duyệt một đề xuất trong năm phút. Năm slide nên gồm những gì?",
    openingOptions: [
      "Vấn đề, giải pháp, chi phí, rủi ro, việc cần sếp quyết định",
      "Giới thiệu phòng, lịch sử dự án, đội ngũ, cảm ơn, rồi mới hỏi đáp",
      "Năm phương án khác nhau, mỗi slide trình bày một phương án",
      "Tiêu đề, mục lục, nội dung chính, tóm tắt, slide cảm ơn",
    ],
    correctOption: 0,
    explanation:
      "Sếp duyệt một đề xuất cần biết năm điều: vấn đề đang gặp, cách giải quyết, tốn bao nhiêu, có rủi ro gì, và bạn cần họ quyết điều gì. Giới thiệu phòng hay lịch sử không giúp quyết định. Năm phương án bắt sếp tự so sánh mà không có khuyến nghị. Khung tiêu đề, mục lục, cảm ơn là hình thức chứ không phải nội dung đề xuất.",
    diagram: [
      { label: "Viết một câu: xin sếp quyết điều gì, trước ngày nào", arrow: true },
      { label: "Gom số thật: báo giá, số người ảnh hưởng, thời hạn", arrow: true },
      { label: "AI dựng năm slide từ dữ liệu của bạn, thiếu thì [cần bổ sung]", arrow: true },
      { label: "Bạn cộng lại chi phí, loại rủi ro giả, tập nói trong năm phút" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một trưởng nhóm muốn xin duyệt mua công cụ quản lý lịch cho cả nhóm. Anh đưa cho AI ba báo giá, số người dùng và một đoạn mô tả việc đang mất thời gian, rồi dặn chỉ dùng số đó. Khi soát bản nháp, anh cộng lại chi phí và thấy AI bỏ sót một khoản phí triển khai có trong báo giá. Anh sửa trước khi trình sếp.",
    },
    quiz: [
      {
        question: "Bộ năm slide xin duyệt một đề xuất nên gồm những phần nào?",
        options: [
          "Vấn đề, giải pháp, chi phí, rủi ro, việc cần sếp quyết định",
          "Giới thiệu phòng, lịch sử, đội ngũ, cảm ơn",
          "Năm phương án, mỗi slide một phương án",
          "Tiêu đề, mục lục, nội dung, tóm tắt, cảm ơn",
        ],
        correct: 0,
        explanation:
          "Sếp cần biết vấn đề gì, giải quyết ra sao, tốn bao nhiêu, rủi ro nào và cần quyết điều gì. Giới thiệu phòng và lịch sử không đưa ra quyết định, năm phương án bắt sếp tự chọn thay bạn, còn tiêu đề, mục lục và cảm ơn là khung hình thức.",
      },
      {
        question: "Nguồn của con số ở slide chi phí nên là gì?",
        options: [
          "Báo giá bạn đang có, ghi rõ nguồn",
          "Con số AI ước tính từ mức giá phổ biến trên thị trường mà nó biết",
          "Một con số tròn bạn đoán rồi nhờ AI trình bày cho thuyết phục",
          "Giá của đề xuất tương tự mà AI nhớ từ các tài liệu nó đã đọc",
        ],
        correct: 0,
        explanation:
          "Chi phí phải truy được về một báo giá thật để khi sếp hỏi bạn chỉ ra được. AI không có giá thật của nhà cung cấp của bạn, nên con số nó đưa ra chỉ là đoán. Số tròn bạn đoán hay giá của đề xuất khác cũng không phải căn cứ để xin duyệt tiền.",
      },
      {
        question: "Slide cuối 'việc cần sếp quyết định' nên ghi thế nào?",
        options: [
          "Một câu rõ việc và hạn, ví dụ 'Duyệt 25 triệu trước thứ Sáu để kịp mua'",
          "Một đoạn tóm tắt lại các slide trước cho sếp nhớ",
          "Lời cảm ơn và mong sếp xem xét khi có thời gian",
          "Một danh sách các câu hỏi để sếp tự chọn hướng xử lý",
        ],
        correct: 0,
        explanation:
          "Sếp có năm phút nên slide cuối phải nói đúng việc cần họ làm và hạn chót. Tóm tắt lại thì lặp, 'khi có thời gian' không tạo hạn, và danh sách câu hỏi đẩy việc quyết định ngược về phía sếp.",
      },
      {
        question: "Chi phí gồm ba khoản 12, 8 và 5 triệu (số minh hoạ). Tổng đúng là bao nhiêu?",
        options: [
          "25 triệu (= 12 + 8 + 5)",
          "20 triệu (= 12 + 8, sót khoản 5)",
          "480 triệu (= 12 × 8 × 5, nhân thay vì cộng)",
          "17 triệu (= 12 + 5, sót khoản 8)",
        ],
        correct: 0,
        explanation:
          "Tổng chi phí là cộng cả ba khoản: 12 + 8 + 5 = 25. Sót một khoản cho 20 hoặc 17, nhân ba số cho 480 là nhầm phép tính. AI làm phép cộng nhiều khoản vẫn có thể sót, nên bạn tự cộng lại rồi so với báo giá.",
      },
      {
        question: "AI viết slide rủi ro là 'Dự án không có rủi ro đáng kể'. Nên làm gì?",
        options: [
          "Nhờ AI gợi ý rủi ro rồi tự chọn những rủi ro có thật với nhóm bạn",
          "Giữ lại vì nói ít rủi ro thì sếp dễ duyệt hơn",
          "Xoá slide rủi ro vì đề xuất nào cũng có rủi ro nên không cần nhắc tới chúng",
          "Chép các rủi ro chung về mọi dự án mà AI liệt kê cho đủ trang",
        ],
        correct: 0,
        explanation:
          "Đề xuất nào cũng có rủi ro, và nói không có sẽ làm sếp mất tin. AI gợi ý thì hữu ích, nhưng chỉ bạn biết rủi ro nào có thật ở nhóm mình. Xoá slide rủi ro là che giấu, còn chép rủi ro chung cho đủ trang thì không giúp sếp quyết định.",
      },
    ],
    keyTakeaways: [
      "Năm slide: vấn đề, giải pháp, chi phí, rủi ro, việc cần sếp quyết định.",
      "Mỗi con số chi phí phải truy được về một báo giá thật.",
      "Tự cộng lại tổng chi phí, đừng tin phép cộng của AI.",
      "Rủi ro thật của nhóm bạn, không phải danh sách chung.",
      "Slide cuối nói rõ việc cần quyết và hạn chót.",
    ],
    practicePrompt: {
      question:
        "AI dựng xong năm slide đề xuất, slide chi phí ghi tổng 20 triệu nhưng báo giá của bạn có ba khoản 12, 8 và 5 triệu. Bạn nên làm gì?",
      options: [
        "Sửa tổng thành 25 triệu, rồi kiểm tiếp các con số khác với báo giá",
        "Giữ 20 triệu vì AI đã tính và nhiều khả năng báo giá có khoản bị trùng",
        "Xoá các khoản lẻ và chỉ ghi 'khoảng 20 triệu' cho gọn",
        "Nhờ AI cộng lại và tin kết quả nếu nó vẫn ra 20 triệu",
      ],
      correct: 0,
      explanation:
        "12 + 8 + 5 = 25, nên AI đã sót một khoản. Bạn phải tự cộng và so với báo giá. Giữ số sai vì đoán có khoản trùng là bịa thêm một lý do. 'Khoảng 20 triệu' vẫn sai 5 triệu, và hỏi lại AI có thể cho cùng một đáp án sai.",
    },
    summary: {
      keyIdea: "Năm slide xin duyệt: mỗi trang một việc, số thật từ báo giá, rủi ro có thật.",
      formula: "Vấn đề + giải pháp + chi phí (tự cộng) + rủi ro thật + việc cần quyết định và hạn.",
      commonMistake: "Để AI tự viết chi phí và rủi ro rồi trình sếp mà không đối chiếu với báo giá.",
      action: "Chọn một việc bạn muốn xin duyệt và viết một câu: xin sếp quyết điều gì, trước ngày nào.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một đề xuất có thật của bạn (mua một công cụ, đổi cách làm, xin thêm người). Viết một câu việc cần sếp quyết và hạn, gom báo giá hoặc số liệu có sẵn, rồi nhờ AI dựng năm slide với dặn: chỉ dùng số tôi đưa, thiếu thì ghi [cần bổ sung]. Tự cộng lại chi phí và gạch bỏ mọi rủi ro không có thật với nhóm bạn.",
      secondary: "Tập nói bộ slide trong đúng năm phút và ghi lại chỗ vượt giờ.",
    },
    sections: [
      {
        type: "lead",
        text: "Sếp có năm phút và bạn cần một quyết định. Dự án nhỏ này gộp những gì đã học ở các bài trước thành một bộ năm slide gọn, có số thật và dễ kiểm.",
      },
      {
        type: "feynman",
        title: "Bộ slide xin duyệt đơn giản hơn bạn nghĩ",
        intro: "Hãy nghĩ tới tờ đơn xin nghỉ phép: nó chỉ có lý do, thời gian, người thay thế và chỗ để sếp ký. Không ai viết lịch sử cả năm vào đó. Bộ năm slide là tờ đơn ấy, chỉ khác là có hình.",
        columns: ["Thành phần", "Đơn xin nghỉ phép", "Bộ năm slide"],
        rows: [
          ["Lý do", "Vì sao cần nghỉ", "Vấn đề đang gặp"],
          ["Cách làm", "Ai thay việc trong lúc nghỉ", "Giải pháp đề xuất"],
          ["Cái giá", "Những việc phải dời lại", "Chi phí và rủi ro"],
          ["Chỗ ký", "Dòng 'Sếp duyệt'", "Slide việc cần sếp quyết định"],
        ],
        oneLiner: "Sếp chỉ cần đủ thông tin để ký, nên mỗi trang trả lời một câu hỏi họ sẽ hỏi.",
      },
      { type: "heading", text: "Năm trang, năm câu hỏi của sếp" },
      {
        type: "list",
        items: [
          "Slide 1 - Vấn đề: chuyện gì đang xảy ra, ảnh hưởng ai, bao lâu.",
          "Slide 2 - Giải pháp: bạn đề xuất làm gì, một phương án được khuyến nghị.",
          "Slide 3 - Chi phí: từng khoản và tổng, lấy từ báo giá thật.",
          "Slide 4 - Rủi ro: những rủi ro có thật với nhóm bạn và cách giảm.",
          "Slide 5 - Việc cần sếp quyết định: một câu rõ việc và hạn.",
        ],
      },
      {
        type: "flow",
        title: "Từ một đề xuất trong đầu tới bộ năm slide",
        steps: [
          { label: "Viết câu chốt", detail: "Một câu: xin sếp quyết điều gì, trước ngày nào. Câu này sẽ là slide 5 và dẫn dắt bốn slide còn lại." },
          { label: "Gom số thật", detail: "Báo giá, số người bị ảnh hưởng, thời gian đang mất. Có nguồn rõ thì AI không phải bịa." },
          { label: "Giao AI dựng khung", detail: "Đưa câu chốt và số thật, dặn chỉ dùng chúng, thiếu thì ghi [cần bổ sung]." },
          { label: "Soát và tập nói", detail: "Tự cộng lại chi phí, loại rủi ro không có thật, tập nói trong năm phút." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI dựng năm slide xin duyệt",
        task: "Bạn muốn xin sếp duyệt một công cụ quản lý lịch cho nhóm, chi phí ba khoản theo báo giá bạn đang có. Lắp yêu cầu cho AI.",
        parts: [
          {
            id: "goal",
            label: "Câu chốt",
            options: [
              { text: "Làm bộ slide giới thiệu công cụ quản lý lịch.", feedback: "Một bộ giới thiệu không có việc cần quyết, sếp xem xong không biết bạn muốn gì." },
              { text: "Tôi muốn xin sếp duyệt công cụ này trước thứ Sáu. Dựng năm slide: vấn đề, giải pháp, chi phí, rủi ro, việc cần quyết định.", good: true, feedback: "Có việc cần quyết, có hạn và có cấu trúc năm trang rõ ràng." },
            ],
          },
          {
            id: "data",
            label: "Số liệu",
            options: [
              { text: "Tự ước lượng chi phí và số giờ tiết kiệm cho hợp lý.", feedback: "AI không có báo giá của bạn, nên các số ước lượng là số bịa có vẻ hợp lý." },
              { text: "Chi phí theo báo giá: 12, 8 và 5 triệu (dán báo giá). Chỉ dùng các số này; thiếu thì ghi [cần bổ sung].", good: true, feedback: "Số đi từ báo giá thật và chỗ thiếu bị đánh dấu thay vì bị lấp bằng số đoán." },
            ],
          },
          {
            id: "risk",
            label: "Rủi ro",
            options: [
              { text: "Viết slide rủi ro, nếu không có thì ghi không đáng kể.", feedback: "Cho phép ghi 'không đáng kể' sẽ ra slide trấn an, mất tin cậy khi sếp hỏi." },
              { text: "Gợi ý 3 rủi ro có thể có; tôi sẽ chọn cái nào đúng với nhóm mình.", good: true, feedback: "AI cho danh sách để bạn chọn, còn quyết định rủi ro nào có thật là của bạn." },
            ],
          },
        ],
        responses: [
          {
            requires: ["goal", "data", "risk"],
            text: "Slide 1 - Vấn đề: lịch họp của nhóm bị chồng chéo [cần bổ sung: số lần trong tháng]\nSlide 2 - Giải pháp: dùng công cụ quản lý lịch chung\nSlide 3 - Chi phí: 12 + 8 + 5 = 25 triệu (theo báo giá)\nSlide 4 - Rủi ro (chọn 2/3 gợi ý): thời gian làm quen; cần người phụ trách\nSlide 5 - Xin duyệt 25 triệu trước thứ Sáu.",
          },
          {
            requires: ["goal"],
            text: "Slide 1 - Vấn đề: nhóm mất trung bình 6 giờ mỗi tuần vì chồng lịch\nSlide 3 - Chi phí: 18 triệu\nSlide 4 - Rủi ro: không đáng kể\n\n(Cấu trúc đúng nhưng 6 giờ, 18 triệu đều do AI nghĩ ra, và rủi ro bị nói giảm.)",
          },
          {
            text: "Giới thiệu công cụ quản lý lịch: tính năng nổi bật, giao diện thân thiện, được nhiều đội nhóm ưa chuộng...\n\n(Không có việc cần sếp quyết, không có số thật.)",
          },
        ],
      },
      {
        type: "scenario",
        title: "Xin duyệt trước thứ Sáu",
        start: "s1",
        nodes: {
          s1: {
            text: "Bản nháp năm slide của AI vừa xong, nhìn chỉn chu. Slide chi phí ghi tổng 20 triệu, báo giá của bạn có ba khoản 12, 8 và 5 triệu.",
            choices: [
              { label: "Giữ nguyên vì AI đã tính và bản nháp nhìn hợp lý", next: "bad_keep" },
              { label: "Tự cộng: 12 + 8 + 5 = 25, sửa tổng rồi kiểm tiếp các số khác", next: "s2" },
            ],
          },
          bad_keep: {
            text: "Sếp duyệt 20 triệu. Khi thanh toán mới phát hiện thiếu 5 triệu và bạn phải xin duyệt lại, mất uy tín vì sai con số đầu tiên.",
            ending: "bad",
          },
          s2: {
            text: "Tổng đã sửa. Ở slide rủi ro AI ghi 'không có rủi ro đáng kể'.",
            choices: [
              { label: "Để nguyên, nói ít rủi ro thì dễ được duyệt", next: "bad_risk" },
              { label: "Thay bằng hai rủi ro có thật: thời gian làm quen và cần người phụ trách", next: "good" },
            ],
          },
          bad_risk: {
            text: "Sếp hỏi ngay: 'Nhóm mất bao lâu để làm quen?'. Bạn không có câu trả lời và đề xuất bị hoãn sang tuần sau.",
            ending: "bad",
          },
          good: {
            text: "Bạn trình bày đủ năm slide trong năm phút. Sếp hỏi về người phụ trách, bạn đã có sẵn câu trả lời và được duyệt.",
            ending: "good",
          },
        },
      },
      {
        type: "callout",
        label: "Quyết định có thể liên quan đến hợp đồng hoặc thuế",
        text: "Nếu đề xuất có điều khoản hợp đồng, bảo mật dữ liệu hoặc cách hạch toán chi phí, hãy hỏi bộ phận pháp chế hoặc kế toán trưởng trước khi đưa lên slide, đừng để AI tự viết phần đó.",
      },
      {
        type: "closing",
        lines: [
          "Năm slide, năm câu hỏi của sếp, và mọi số đều truy được về nguồn thật.",
          "Bài sau: logo và biểu tượng, khi nào tự làm bằng AI, khi nào thuê.",
        ],
      },
    ],
  },
];
