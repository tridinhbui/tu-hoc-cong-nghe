import type { Lesson } from "./lesson-types";

// Chặng "Kỹ năng nghề phân tích tài chính" (ids 1481-1484).
//
// App có trang /phong-van-ky-thuat với ngân hàng câu hỏi, nhưng không có bài
// học nào dạy phần kỹ năng đứng sau: viết một trang memo mà người bận rộn đọc
// được, bảo vệ luận điểm trước hội đồng, và chuẩn bị cho bài kiểm tra dựng mô
// hình. Đây là những thứ quyết định kết quả tuyển dụng và cả sự nghiệp về sau,
// nhưng gần như không được dạy ở đâu ngoài việc làm sai vài lần rồi tự rút ra.

export const ANALYST_CRAFT_LESSONS: Lesson[] = [
  {
    id: 1481,
    slug: "viet-memo-dau-tu-mot-trang",
    title: "Kỹ năng nghề, Bài 1: Viết memo đầu tư một trang - kết luận trước, bằng chứng sau",
    subtitle: "Cấu trúc kim tự tháp, luận điểm kiểm chứng được và cách viết cho người chỉ đọc ba dòng đầu",
    duration: "11 phút",
    difficulty: "Trung bình",
    emoji: "✍️",
    track: "professional",
    whyItMatters:
      "Phân tích tốt mà trình bày kém thì không tồn tại. Người ra quyết định đọc mười memo mỗi tuần và dừng lại ở ba dòng đầu của mỗi cái; nếu ba dòng đó không nói được bạn khuyến nghị gì và vì sao, toàn bộ công sức phân tích phía sau không có ai đọc.",
    openingQuestion:
      "Memo đầu tư nên bắt đầu bằng gì?",
    openingOptions: [
      "Bối cảnh ngành và lịch sử hình thành của doanh nghiệp được phân tích",
      "Khuyến nghị cụ thể kèm ba lý do chính, ngay ở đoạn đầu tiên",
      "Phương pháp luận và các nguồn dữ liệu đã sử dụng trong quá trình phân tích",
      "Danh sách các rủi ro chính để người đọc hiểu giới hạn của phân tích",
    ],
    correctOption: 1,
    explanation:
      "Đây là nguyên tắc kim tự tháp: kết luận trước, lập luận sau, dữ liệu cuối. Nó ngược với cách viết ở trường, nơi bạn dẫn dắt dần tới kết luận. Lý do rất thực dụng: người đọc memo của bạn là người ra quyết định và có mười phút, không phải người chấm điểm và có cả buổi. Nếu họ đồng ý ngay sau đoạn đầu, phần còn lại chỉ là để họ kiểm tra khi cần. Nếu họ không đồng ý, họ biết ngay phải phản biện chỗ nào.",
    diagram: [
      { label: "Khuyến nghị và ba lý do chính", arrow: true },
      { label: "Luận điểm: điều gì thị trường đang bỏ sót", arrow: true },
      { label: "Bằng chứng và định giá", arrow: true },
      { label: "Rủi ro và điều gì sẽ chứng minh tôi sai" },
    ],
    realWorldExample: {
      company: "Memo trên bàn của giám đốc đầu tư",
      description:
        "Một giám đốc đầu tư điển hình nhận nhiều memo mỗi tuần từ các chuyên viên phân tích. Cách họ đọc gần như giống nhau: lướt đoạn đầu để biết khuyến nghị, nhảy xuống phần rủi ro để xem người viết có tự nhận thức không, rồi mới quay lại phần lập luận nếu thấy đáng. Memo dẫn dắt dài dòng trước khi tới kết luận thường bị đặt xuống ở đoạn thứ hai - không phải vì phân tích kém mà vì người đọc không tìm thấy thứ họ cần.",
    },
    quiz: [
      {
        question: "Luận điểm đầu tư khác mô tả doanh nghiệp ở điểm nào?",
        options: [
          "Luận điểm nêu điều thị trường đang định giá sai và vì sao bạn nghĩ khác",
          "Luận điểm trình bày đầy đủ hơn về lịch sử và mô hình kinh doanh của doanh nghiệp",
          "Luận điểm sử dụng nhiều số liệu định lượng hơn phần mô tả thông thường",
          "Luận điểm được viết ở cuối memo sau khi đã trình bày hết các bằng chứng",
        ],
        correct: 0,
        explanation:
          "Nói doanh nghiệp có thương hiệu mạnh và tăng trưởng tốt không phải luận điểm, vì thị trường cũng biết điều đó và đã trả giá cho nó. Luận điểm phải trả lời được: tôi thấy gì mà người đang bán cổ phiếu này cho tôi không thấy.",
      },
      {
        question: "Vì sao phần rủi ro không nên viết chung chung?",
        options: [
          "Vì người đọc dùng phần này để đánh giá mức độ tự nhận thức của người viết",
          "Vì quy định nội bộ yêu cầu liệt kê đầy đủ mọi rủi ro có thể xảy ra với khoản đầu tư",
          "Vì phần rủi ro là căn cứ pháp lý bảo vệ người viết nếu khuyến nghị sai",
          "Vì rủi ro chung chung làm memo dài hơn giới hạn một trang cho phép",
        ],
        correct: 0,
        explanation:
          "Viết rủi ro thị trường có thể biến động là không nói gì cả. Viết nếu biên lợi nhuận gộp giảm dưới 18% thì luận điểm này sai mới là rủi ro thật: nó cụ thể, kiểm chứng được, và cho người đọc biết cần theo dõi cái gì.",
      },
      {
        question: "Nguyên tắc kim tự tháp áp dụng thế nào trong một memo?",
        options: [
          "Kết luận ở trên cùng, các lập luận chính đỡ nó, dữ liệu chi tiết ở dưới",
          "Trình bày dữ liệu trước, phân tích sau, và kết luận ở phần cuối cùng của memo",
          "Chia memo thành ba phần bằng nhau về độ dài để đảm bảo cân đối nội dung",
          "Bắt đầu bằng phần dài nhất rồi thu hẹp dần tới phần ngắn nhất ở cuối memo",
        ],
        correct: 0,
        explanation:
          "Cấu trúc này cho phép người đọc dừng ở bất kỳ tầng nào mà vẫn nắm được điều quan trọng nhất. Nó cũng buộc chính người viết phải biết rõ mình kết luận gì - điều nhiều người chỉ phát hiện là mình chưa rõ khi thử viết câu đầu tiên.",
      },
      {
        question: "Vì sao nên nêu rõ điều gì sẽ chứng minh mình sai?",
        options: [
          "Vì nó biến luận điểm thành thứ kiểm chứng được và tạo kỷ luật thoát vị thế",
          "Vì người đọc sẽ đánh giá cao sự khiêm tốn của người viết trong lập luận",
          "Vì đó là yêu cầu bắt buộc trong mọi báo cáo phân tích được công bố ra thị trường",
          "Vì nó giúp giảm trách nhiệm của người viết nếu khuyến nghị không đúng như dự kiến",
        ],
        correct: 0,
        explanation:
          "Không có tiêu chí phủ định, một luận điểm sai có thể được biện minh vô thời hạn bằng cách đổi lý do - đúng cơ chế thiên kiến xác nhận đã học ở chặng tài chính hành vi. Nêu trước điều kiện sai là cách duy nhất để sau này bạn thừa nhận được.",
      },
    
    {
      "question": "Vì sao memo nên nêu rõ điều gì sẽ chứng minh luận điểm là sai?",
      "options": [
        "Vì nó biến luận điểm thành thứ kiểm chứng được thay vì một niềm tin",
        "Vì hội đồng đầu tư yêu cầu mọi memo phải có phần đánh giá rủi ro đầy đủ",
        "Vì nó giúp người viết tránh trách nhiệm nếu khoản đầu tư diễn biến xấu",
        "Vì phần này thay cho việc liệt kê rủi ro"
      ],
      "correct": 0,
      "explanation": "Một luận điểm không nói được điều gì làm nó sai thì không thể sai - và cũng không thể đúng theo cách có ích. Viết ra trước còn giúp bạn nhận ra khi nào nên thoát, thay vì diễn giải lại mọi tin xấu thành tin trung tính."
    }
    ],
    keyTakeaways: [
      "Kết luận trước, lập luận sau, dữ liệu cuối - ngược với cách viết ở trường",
      "Luận điểm phải nói được thị trường đang bỏ sót điều gì, không chỉ mô tả doanh nghiệp",
      "Rủi ro phải cụ thể và kiểm chứng được, kèm ngưỡng số liệu rõ ràng",
      "Luôn nêu trước điều gì sẽ chứng minh mình sai - đó là kỷ luật, không phải sự yếu thế",
    ],
    practicePrompt: {
      question:
        "Câu mở đầu nào phù hợp nhất cho một memo khuyến nghị mua?",
      options: [
        "Doanh nghiệp X là một trong những đơn vị dẫn đầu ngành bán lẻ tại Việt Nam",
        "Khuyến nghị mua X, giá mục tiêu cao hơn 35%, vì thị trường đang định giá mảng mới bằng 0",
        "Báo cáo này phân tích triển vọng của doanh nghiệp X trong giai đoạn ba năm tới",
        "Ngành bán lẻ Việt Nam đang trải qua giai đoạn chuyển đổi với nhiều cơ hội mới",
      ],
      correct: 1,
      explanation:
        "Chỉ phương án này chứa cả ba thành phần: khuyến nghị cụ thể, mức lợi nhuận kỳ vọng, và luận điểm về điều thị trường đang bỏ sót. Ba phương án còn lại đều đúng nhưng không mang thông tin - người đọc vẫn chưa biết bạn muốn họ làm gì.",
    },
    summary: {
      keyIdea: "Người đọc chỉ có ba dòng cho bạn; hãy dùng chúng cho kết luận, không cho bối cảnh",
      commonMistake: "Dẫn dắt dài dòng rồi mới tới khuyến nghị, khiến người đọc bỏ dở giữa chừng",
      action: "Lấy một phân tích bạn từng làm và viết lại thành một trang theo cấu trúc kim tự tháp.",
    },
    application: {
      title: "Bài kiểm tra một câu",
      message:
        "Trước khi viết bất cứ gì, hãy viết ra một câu duy nhất: tôi khuyến nghị làm gì, và vì sao. Nếu chưa viết được câu đó, bạn chưa sẵn sàng viết memo - vấn đề nằm ở phân tích chứ không ở câu chữ.",
      secondary: "Câu đó sau này thành dòng đầu tiên của memo, và thường là dòng duy nhất được nhớ.",
    },
    sections: [
      {
        type: "lead",
        text: "Có một khoảng cách ít được nói tới giữa việc phân tích đúng và việc được người khác hành động theo phân tích của mình. Khoảng cách đó gọi là cách trình bày, và trong nghề phân tích tài chính nó có một bộ quy tắc khá cụ thể.",
      },
      {
        type: "heading",
        text: "Bốn phần của một memo một trang",
      },
      {
        type: "list",
        items: [
          "Khuyến nghị: mua hay bán, mức giá mục tiêu, khung thời gian - trong hai đến ba câu",
          "Luận điểm: điều thị trường đang định giá sai và vì sao bạn nghĩ khác - đây là phần có giá trị nhất",
          "Bằng chứng: hai đến ba dữ kiện then chốt cùng phép định giá tóm tắt",
          "Rủi ro và tiêu chí phủ định: điều gì phải xảy ra để bạn thừa nhận mình sai",
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Mô tả",
          text: "Doanh nghiệp có thương hiệu mạnh, biên lợi nhuận tốt, ban điều hành giàu kinh nghiệm. Đúng, nhưng thị trường đã biết và đã trả tiền cho những điều này.",
        },
        right: {
          label: "Luận điểm",
          text: "Thị trường đang định giá mảng mới bằng 0 vì chưa có lãi, trong khi biên đóng góp đã dương từ quý trước và điểm hòa vốn dự kiến trong bốn quý tới.",
        },
      },
      {
        type: "callout",
        label: "Bài kiểm tra khắc nghiệt",
        text: "Đọc lại memo của bạn và hỏi: câu nào ở đây mà một người thông minh có quyền không đồng ý? Nếu mọi câu đều là sự thật hiển nhiên không ai phản đối, bạn chưa đưa ra luận điểm nào - bạn vừa viết một bản tóm tắt.",
      },
      {
        type: "closing",
        lines: [
          "Viết rõ là hệ quả của nghĩ rõ; câu văn lộn xộn hầu như luôn tố cáo một lập luận chưa xong.",
          "Bài sau nói về phần khó hơn: bảo vệ chính memo đó khi ngồi trước hội đồng đầu tư.",
        ],
      },
    ],
  },
  {
    id: 1482,
    slug: "trinh-bay-va-phan-bien-truoc-hoi-dong-dau-tu",
    title: "Kỹ năng nghề, Bài 2: Bảo vệ luận điểm trước hội đồng đầu tư",
    subtitle: "Trả lời câu hỏi khó, thừa nhận giới hạn, và phân biệt bị chất vấn với bị bác bỏ",
    duration: "11 phút",
    difficulty: "Trung bình",
    emoji: "🎯",
    track: "professional",
    whyItMatters:
      "Buổi bảo vệ trước hội đồng là nơi phân tích của bạn được thử lửa, và cách bạn phản ứng với câu hỏi khó ảnh hưởng tới uy tín nghề nghiệp nhiều hơn cả nội dung phân tích. Đây cũng chính là kỹ năng được kiểm tra trong vòng phỏng vấn cuối của gần như mọi vị trí đầu tư.",
    openingQuestion:
      "Bạn bị hỏi một con số mà bạn không nhớ chính xác. Cách xử lý tốt nhất là gì?",
    openingOptions: [
      "Đưa ra một con số gần đúng để giữ nhịp trình bày và tránh tạo khoảng lặng",
      "Nói rõ mình không nhớ chính xác, đưa khoảng ước lượng và cam kết kiểm tra lại",
      "Chuyển hướng sang một khía cạnh khác mà bạn nắm chắc hơn về mặt số liệu",
      "Giải thích rằng con số đó không quan trọng với luận điểm chính của bạn",
    ],
    correctOption: 1,
    explanation:
      "Người ngồi đối diện gần như luôn phát hiện được khi bạn đoán, và một lần bị bắt gặp đoán số sẽ khiến mọi con số khác trong bài của bạn bị nghi ngờ. Thừa nhận giới hạn kèm một khoảng ước lượng cho thấy bạn phân biệt được điều mình biết chắc với điều mình phỏng đoán - đó chính là phẩm chất mà hội đồng đang tìm. Điều duy nhất không được phép là bịa, và điều thứ hai không nên làm là né tránh câu hỏi.",
    diagram: [
      { label: "Nghe hết câu hỏi, không cắt ngang", arrow: true },
      { label: "Xác định câu hỏi thật đằng sau", arrow: true },
      { label: "Trả lời thẳng trước, giải thích sau", arrow: true },
      { label: "Phân biệt điều biết chắc với điều đang giả định" },
    ],
    realWorldExample: {
      company: "Buổi họp hội đồng đầu tư",
      description:
        "Trong một buổi bảo vệ điển hình, phần trình bày chiếm mười phút còn phần hỏi đáp kéo dài gấp ba. Các thành viên hội đồng thường không hỏi để làm khó mà hỏi để tìm chỗ yếu nhất của luận điểm, vì đó là việc của họ. Chuyên viên có kinh nghiệm hiểu điều đó nên không phòng thủ; họ còn chủ động nêu ra điểm yếu trước khi bị hỏi, và điều này gần như luôn làm tăng độ tin cậy chứ không giảm.",
    },
    quiz: [
      {
        question: "Vì sao nên chủ động nêu điểm yếu của luận điểm trước khi bị hỏi?",
        options: [
          "Cho thấy bạn đã tự phản biện, và tránh việc người khác tìm ra trước bạn",
          "Giúp rút ngắn thời gian hỏi đáp vì hội đồng sẽ không hỏi thêm về điểm đó nữa",
          "Chuyển trách nhiệm về quyết định đầu tư sang cho hội đồng thay vì người phân tích",
          "Làm cho phần trình bày cân đối hơn giữa các luận điểm ủng hộ và phản đối",
        ],
        correct: 0,
        explanation:
          "Nếu hội đồng phát hiện một lỗ hổng mà bạn không nhắc tới, họ sẽ tự hỏi bạn còn bỏ sót gì nữa. Nêu trước cho thấy bạn đã đi hết con đường và đã cân nhắc, nên phần còn lại của phân tích đáng tin hơn.",
      },
      {
        question: "Câu hỏi khó nhất thường nhắm vào đâu?",
        options: [
          "Giả định quan trọng nhất mà toàn bộ định giá phụ thuộc vào nó",
          "Các chi tiết kỹ thuật về công thức và cách trình bày trong bảng tính",
          "Lịch sử hình thành và cơ cấu cổ đông của doanh nghiệp được phân tích",
          "Nguồn dữ liệu và thời điểm cập nhật của các số liệu được sử dụng",
        ],
        correct: 0,
        explanation:
          "Người có kinh nghiệm không đi soi từng ô công thức; họ tìm giả định nào mà nếu sai sẽ làm sập cả kết luận. Vì vậy trước buổi bảo vệ, hãy tự xác định giả định đó và chuẩn bị bảng độ nhạy cho riêng nó.",
      },
      {
        question: "Khi hội đồng phản đối luận điểm của bạn, phản ứng phù hợp là gì?",
        options: [
          "Phân biệt phản đối về dữ kiện với phản đối về cách diễn giải, rồi xử lý riêng từng loại",
          "Bảo vệ đến cùng vì thay đổi quan điểm giữa buổi họp sẽ làm giảm uy tín cá nhân",
          "Rút lại khuyến nghị ngay để tránh kéo dài tranh luận không cần thiết",
          "Đề nghị hoãn quyết định sang buổi họp sau để có thêm thời gian chuẩn bị",
        ],
        correct: 0,
        explanation:
          "Nếu họ chỉ ra một dữ kiện bạn sai, hãy tiếp nhận ngay và nói rõ nó ảnh hưởng thế nào tới kết luận. Nếu họ diễn giải cùng dữ kiện theo cách khác, đó là tranh luận hợp lệ và bạn nên nêu vì sao cách của mình hợp lý hơn. Gộp hai loại làm một là nguyên nhân khiến các buổi họp trở nên căng thẳng vô ích.",
      },
      {
        question: "Vì sao trả lời thẳng trước rồi mới giải thích lại quan trọng?",
        options: [
          "Vì người nghe cần biết câu trả lời trước khi đủ kiên nhẫn nghe lý do",
          "Vì quy tắc trình bày trong ngành yêu cầu mọi câu trả lời phải ngắn gọn dưới ba câu",
          "Vì giải thích dài sẽ làm lộ ra những điểm yếu khác trong phân tích của bạn",
          "Vì hội đồng thường chỉ có thời gian nghe câu trả lời chứ không nghe phần giải thích",
        ],
        correct: 0,
        explanation:
          "Đây là nguyên tắc kim tự tháp áp dụng cho lời nói. Bắt đầu bằng bối cảnh dài rồi mới tới câu trả lời khiến người nghe phải chờ, và trong một buổi họp căng thẳng điều đó bị đọc thành né tránh.",
      },
    
    {
      "question": "Bị hỏi một con số bạn không nhớ chính xác. Cách xử lý tốt nhất là gì?",
      "options": [
        "Nói rõ khoảng ước lượng và cam kết gửi lại con số chính xác",
        "Đưa ra con số gần đúng nhất mà bạn nhớ được để duy trì mạch trình bày",
        "Chuyển sang phần khác và quay lại câu hỏi này ở cuối buổi",
        "Trả lời rằng con số đó có trong phụ lục của tài liệu đã gửi trước"
      ],
      "correct": 0,
      "explanation": "Người ngồi đối diện gần như luôn nhận ra khi bạn đoán, và một lần bị bắt gặp sẽ khiến mọi con số khác của bạn bị nghi ngờ. Nói rõ khoảng ước lượng cho thấy bạn phân biệt được điều mình biết chắc với điều mình chỉ áng chừng."
    }
    ],
    keyTakeaways: [
      "Không bao giờ đoán số - thừa nhận giới hạn kèm khoảng ước lượng đáng tin hơn nhiều",
      "Chủ động nêu điểm yếu trước khi bị hỏi làm tăng độ tin cậy của phần còn lại",
      "Phân biệt phản đối về dữ kiện với phản đối về cách diễn giải, xử lý riêng từng loại",
      "Trả lời thẳng trước, giải thích sau - kim tự tháp áp dụng cho cả lời nói",
    ],
    practicePrompt: {
      question:
        "Một thành viên hội đồng nói: giả định tăng trưởng 15% của bạn là quá lạc quan. Phản ứng tốt nhất là gì?",
      options: [
        "Bảo vệ con số 15% bằng cách dẫn lại toàn bộ lập luận đã trình bày trước đó",
        "Hỏi mức nào họ cho là hợp lý, rồi trình bày kết quả định giá ở mức đó",
        "Chấp nhận hạ xuống mức thấp hơn để buổi họp không kéo dài thêm nữa",
        "Giải thích rằng giả định này lấy từ báo cáo của một tổ chức nghiên cứu uy tín",
      ],
      correct: 1,
      explanation:
        "Cách này chuyển cuộc tranh luận từ đúng sai sang định lượng: nếu ở mức 10% mà khuyến nghị vẫn đứng vững thì tranh cãi về con số đã trở nên không quan trọng. Nếu ở mức 10% luận điểm sụp đổ, đó là thông tin cực kỳ giá trị cho cả bạn lẫn hội đồng, và bảng độ nhạy chuẩn bị sẵn sẽ trả lời trong vài giây.",
    },
    summary: {
      keyIdea: "Hội đồng đánh giá cách bạn suy nghĩ dưới áp lực nhiều hơn đánh giá kết luận của bạn",
      commonMistake: "Đoán một con số để lấp khoảng lặng, và mất độ tin cậy cho toàn bộ phần còn lại",
      action: "Trước buổi bảo vệ tiếp theo, xác định giả định dễ bị tấn công nhất và chuẩn bị bảng độ nhạy riêng cho nó.",
    },
    application: {
      title: "Chuẩn bị bằng cách tự tấn công",
      message:
        "Trước mỗi buổi bảo vệ, hãy viết ra năm câu hỏi khó nhất mà bạn sợ bị hỏi, rồi trả lời chúng bằng văn bản. Phần lớn câu hỏi thực tế sẽ nằm trong năm câu đó, và bạn đã có câu trả lời được cân nhắc thay vì phản ứng tức thời.",
      secondary: "Nếu có câu nào bạn không trả lời nổi trên giấy, đó là chỗ cần làm thêm việc trước khi vào phòng họp.",
    },
    sections: [
      {
        type: "lead",
        text: "Memo đưa bạn vào phòng họp. Phần hỏi đáp mới quyết định khuyến nghị của bạn có được thực hiện hay không. Và khác với phần trình bày, phần này không chuẩn bị được bằng cách học thuộc - chỉ chuẩn bị được bằng cách tự phản biện trước.",
      },
      {
        type: "heading",
        text: "Ba loại câu hỏi và ba cách xử lý",
      },
      {
        type: "conceptTable",
        title: "Nhận diện câu hỏi thật đằng sau",
        subtitle: "Cùng một câu hỏi có thể mang ba ý định khác nhau",
        concepts: [
          { vi: "Hỏi để kiểm tra dữ kiện", en: "Fact check", def: "Người hỏi muốn xác nhận một con số. Trả lời ngắn, chính xác, và nói rõ nguồn. Nếu không nhớ, nói không nhớ." },
          { vi: "Hỏi để thử độ chắc", en: "Stress test", def: "Người hỏi muốn biết luận điểm có sống sót khi giả định thay đổi. Trả lời bằng độ nhạy chứ không bằng lời khẳng định." },
          { vi: "Hỏi vì bất đồng", en: "Disagreement", def: "Người hỏi có quan điểm khác. Xác định chính xác chỗ hai bên tách nhau, rồi tranh luận đúng chỗ đó thay vì lặp lại toàn bộ lập luận." },
        ],
      },
      {
        type: "callout",
        label: "Điều duy nhất không được phép",
        text: "Bịa một con số. Trong nghề này uy tín được xây rất chậm và mất trong một câu. Nói tôi không nhớ chính xác, khoảng từ đây tới đây, tôi kiểm tra lại và trả lời trong chiều nay - câu này không bao giờ làm bạn mất điểm.",
      },
      {
        type: "comparison",
        left: {
          label: "Phòng thủ",
          text: "Coi mọi câu hỏi là công kích, lặp lại lập luận cũ to hơn. Kết quả: hội đồng kết luận bạn chưa tự phản biện.",
        },
        right: {
          label: "Hợp tác",
          text: "Coi câu hỏi là phần kiểm định miễn phí cho luận điểm của mình. Ghi nhận, định lượng, và nói rõ điều gì sẽ làm bạn đổi ý.",
        },
      },
      {
        type: "closing",
        lines: [
          "Mục tiêu của buổi bảo vệ không phải thắng cuộc tranh luận mà là ra được quyết định đúng.",
          "Bài sau chuyển sang bài kiểm tra cụ thể nhất trong tuyển dụng: bài dựng mô hình.",
        ],
      },
    ],
  },
  {
    id: 1483,
    slug: "chuan-bi-modeling-test-va-case-interview",
    title: "Kỹ năng nghề, Bài 3: Chuẩn bị bài kiểm tra dựng mô hình và phỏng vấn tình huống",
    subtitle: "Quản lý thời gian, thứ tự dựng mô hình và cách nói ra suy nghĩ khi làm bài",
    duration: "12 phút",
    difficulty: "Khó",
    emoji: "⏳",
    track: "professional",
    whyItMatters:
      "Bài kiểm tra dựng mô hình là vòng loại thực tế của gần như mọi vị trí phân tích. Phần lớn ứng viên trượt không vì thiếu kiến thức mà vì quản lý thời gian sai - và đó là thứ luyện được.",
    openingQuestion:
      "Trong một bài kiểm tra dựng mô hình 90 phút, việc đầu tiên nên làm là gì?",
    openingOptions: [
      "Bắt đầu nhập ngay số liệu lịch sử để tận dụng tối đa thời gian có sẵn",
      "Đọc hết đề, xác định kết quả cuối cùng cần nộp, rồi phân bổ thời gian ngược lại",
      "Dựng trước phần định giá vì đó là phần chiếm nhiều điểm nhất trong bài",
      "Thiết lập định dạng và quy ước màu cho toàn bộ bảng tính trước khi nhập số",
    ],
    correctOption: 1,
    explanation:
      "Ứng viên trượt nhiều nhất vì dựng rất kỹ phần đầu rồi hết giờ khi chưa ra kết quả cuối. Một mô hình thô nhưng chạy được và ra được con số luôn được chấm cao hơn một mô hình đẹp nhưng dở dang, vì nhà tuyển dụng muốn biết bạn có giao được sản phẩm dưới áp lực thời gian không. Đọc đề trước và phân bổ ngược từ kết quả cần nộp là kỹ thuật đơn giản nhất nhưng bị bỏ qua nhiều nhất.",
    diagram: [
      { label: "Đọc đề, xác định sản phẩm cuối cần nộp", arrow: true },
      { label: "Phân bổ thời gian ngược lại cho từng phần", arrow: true },
      { label: "Dựng bản chạy được trước, tinh chỉnh sau", arrow: true },
      { label: "Dành 10 phút cuối để kiểm tra và viết kết luận" },
    ],
    realWorldExample: {
      company: "Hai ứng viên cùng một đề bài",
      description:
        "Ứng viên thứ nhất dựng bảng doanh thu rất chi tiết theo từng dòng sản phẩm, định dạng đẹp, và hết giờ khi vừa xong báo cáo kết quả kinh doanh. Ứng viên thứ hai dựng dự phóng doanh thu bằng một giả định tăng trưởng đơn giản, chạy hết ba báo cáo, ra được định giá, rồi dùng thời gian còn lại quay lại làm mịn phần doanh thu và ghi chú các giả định. Người thứ hai gần như luôn được chọn, kể cả khi phần doanh thu của họ thô hơn.",
    },
    quiz: [
      {
        question: "Nguyên tắc dựng mô hình dưới áp lực thời gian là gì?",
        options: [
          "Dựng bản đơn giản chạy được từ đầu tới cuối trước, rồi mới làm mịn từng phần",
          "Hoàn thiện từng phần đến mức tốt nhất trước khi chuyển sang phần tiếp theo",
          "Ưu tiên phần định giá và bỏ qua báo cáo lưu chuyển tiền tệ nếu thiếu thời gian",
          "Sao chép cấu trúc từ một mô hình mẫu đã chuẩn bị sẵn trước buổi kiểm tra",
        ],
        correct: 0,
        explanation:
          "Cách này đảm bảo bạn luôn có một sản phẩm nộp được ở bất kỳ thời điểm nào, và nó cũng giúp phát hiện sớm các lỗi liên kết giữa các phần - thứ mà cách làm tuần tự chỉ lộ ra khi đã quá muộn.",
      },
      {
        question: "Vì sao nên nói ra suy nghĩ khi làm bài tình huống có người quan sát?",
        options: [
          "Vì người chấm đánh giá quá trình suy luận, và im lặng thì họ không thấy được gì",
          "Vì quy trình phỏng vấn yêu cầu ứng viên phải mô tả từng thao tác đang thực hiện",
          "Vì nói ra giúp ứng viên tự phát hiện lỗi trong tính toán của chính mình",
          "Vì người chấm cần ghi chép lại các bước để so sánh giữa các ứng viên với nhau",
        ],
        correct: 0,
        explanation:
          "Một ứng viên ra kết quả sai nhưng có lập luận mạch lạc thường được đánh giá cao hơn một ứng viên ra kết quả đúng mà không giải thích được vì sao. Trong công việc thật, bạn luôn phải bảo vệ con số của mình chứ không chỉ đưa ra nó.",
      },
      {
        question: "Khi thiếu một dữ liệu trong đề bài, cách xử lý đúng là gì?",
        options: [
          "Nêu rõ giả định của mình, ghi chú vào mô hình, và tiếp tục làm",
          "Dừng lại và hỏi người ra đề cho tới khi nhận được số liệu chính xác",
          "Bỏ qua phần cần dữ liệu đó và chuyển sang các phần khác của bài",
          "Dùng một con số ngẫu nhiên vì mục tiêu chính là hoàn thành cấu trúc mô hình",
        ],
        correct: 0,
        explanation:
          "Đề bài thiếu dữ liệu thường là cố ý, để xem bạn xử lý thế nào với thông tin không đầy đủ - đúng như trong công việc thật. Nêu giả định rõ ràng là câu trả lời đúng; im lặng tự chọn một con số rồi không nói gì là câu trả lời sai.",
      },
      {
        question: "Phần lớn thời gian trong 10 phút cuối nên dùng để làm gì?",
        options: [
          "Kiểm tra tính cân đối, rà lỗi và viết vài dòng kết luận về kết quả",
          "Định dạng lại bảng tính cho đẹp và thống nhất màu sắc trên các sheet",
          "Bổ sung thêm các kịch bản dự phóng để mô hình trông đầy đủ hơn",
          "Kiểm tra lại toàn bộ số liệu lịch sử đã nhập ở phần đầu bài làm",
        ],
        correct: 0,
        explanation:
          "Một mô hình có bảng cân đối lệch sẽ bị loại ngay bất kể phần còn lại tốt đến đâu. Và vài dòng kết luận cho thấy bạn hiểu con số mình vừa tạo ra có ý nghĩa gì - phần rất nhiều ứng viên bỏ qua vì hết giờ.",
      },
      {
        question: "Vì sao nhà tuyển dụng chấp nhận một mô hình thô nhưng chạy được?",
        options: [
          "Vì nó chứng minh ứng viên giao được sản phẩm hoàn chỉnh trong thời hạn",
          "Vì mô hình thô dễ chấm hơn nên tiết kiệm thời gian cho hội đồng tuyển dụng",
          "Vì độ chi tiết của mô hình không quan trọng trong công việc thực tế hằng ngày",
          "Vì họ giả định ứng viên sẽ được đào tạo thêm về kỹ thuật sau khi vào làm",
        ],
        correct: 0,
        explanation:
          "Trong công việc thật, hạn nộp là có thật và luôn sớm hơn mong muốn. Khả năng chia nhỏ công việc để luôn có một bản dùng được là kỹ năng nghề nghiệp cốt lõi, và bài kiểm tra được thiết kế để đo đúng nó.",
      },
    ],
    keyTakeaways: [
      "Đọc hết đề và phân bổ thời gian ngược từ sản phẩm cuối trước khi gõ ô đầu tiên",
      "Dựng bản chạy được từ đầu tới cuối trước, làm mịn sau - không hoàn thiện tuần tự từng phần",
      "Thiếu dữ liệu thì nêu giả định rõ ràng và ghi chú, đừng im lặng tự chọn",
      "Dành 10 phút cuối cho kiểm tra cân đối và vài dòng kết luận",
    ],
    practicePrompt: {
      question:
        "Còn 20 phút, mô hình của bạn chưa liên kết xong báo cáo lưu chuyển tiền tệ và bảng cân đối đang lệch. Nên làm gì?",
      options: [
        "Tiếp tục hoàn thiện liên kết cho đúng, chấp nhận không kịp phần định giá",
        "Ghi chú rõ phần chưa xong, dùng con số đơn giản để chạy tiếp và ra được định giá",
        "Xóa phần đang lệch để mô hình trông sạch rồi nộp phần đã hoàn chỉnh",
        "Dừng lại và giải thích với người chấm rằng đề bài quá dài so với thời gian cho phép",
      ],
      correct: 1,
      explanation:
        "Người chấm cần thấy bạn đi hết được quy trình tư duy tới kết quả cuối. Một ghi chú trung thực rằng phần liên kết chưa hoàn tất và đây là cách xử lý tạm thời cho thấy bạn kiểm soát được tình hình. Xóa phần lệch đi là lựa chọn tệ nhất - nó che giấu thay vì thừa nhận.",
    },
    summary: {
      keyIdea: "Bài kiểm tra đo khả năng giao sản phẩm dưới áp lực, không đo độ tinh xảo của mô hình",
      commonMistake: "Dồn thời gian vào phần đầu và hết giờ trước khi ra được kết quả cuối cùng",
      action: "Tự bấm giờ 90 phút dựng một mô hình ba báo cáo kèm định giá, làm lại ba lần với ba doanh nghiệp khác nhau.",
    },
    application: {
      title: "Kế hoạch luyện tập bốn tuần",
      message:
        "Tuần 1: dựng mô hình không giới hạn thời gian cho tới khi thành thạo cấu trúc. Tuần 2: bấm giờ 120 phút. Tuần 3: 90 phút. Tuần 4: 90 phút và vừa làm vừa nói to lập luận như đang có người quan sát.",
      secondary: "Kỹ năng ở đây gần với thể thao hơn với học thuật - nó đến từ số lần lặp chứ không từ số trang đã đọc.",
    },
    sections: [
      {
        type: "lead",
        text: "Chặng mô hình tài chính dạy bạn cấu trúc, chặng Excel dạy bạn thao tác. Bài này nói về tình huống mà cả hai được kiểm tra cùng lúc dưới đồng hồ đếm ngược, và về lý do phần lớn người trượt không phải vì thiếu kiến thức.",
      },
      {
        type: "heading",
        text: "Phân bổ thời gian cho một bài 90 phút",
      },
      {
        type: "list",
        items: [
          "10 phút: đọc đề, xác định sản phẩm cuối, phác cấu trúc và vùng giả định",
          "20 phút: nhập số liệu lịch sử và dựng dự phóng doanh thu ở mức đơn giản nhất chấp nhận được",
          "30 phút: dựng ba báo cáo và liên kết chúng cho tới khi bảng cân đối cân",
          "20 phút: định giá và chạy một hai kịch bản",
          "10 phút: rà lỗi, kiểm tra cân đối, viết kết luận ngắn",
        ],
      },
      {
        type: "callout",
        label: "Nguyên tắc bản chạy được",
        text: "Ở bất kỳ thời điểm nào trong 90 phút, bạn nên có một mô hình chạy được từ đầu tới cuối, chỉ khác nhau ở mức độ tinh xảo. Cách làm này giống hệt nguyên tắc phát triển phần mềm theo bản khả dụng tối thiểu, và lý do cũng giống nhau: nó bảo vệ bạn khỏi việc hết giờ với một sản phẩm dở dang.",
      },
      {
        type: "comparison",
        left: {
          label: "Điều bạn nghĩ đang bị chấm",
          text: "Độ chính xác của từng con số và mức độ chi tiết của dự phóng doanh thu.",
        },
        right: {
          label: "Điều thực sự bị chấm",
          text: "Cấu trúc có sạch không, ba báo cáo có liên kết đúng không, bạn xử lý thế nào khi thiếu dữ liệu, và bạn có ra được kết quả trong thời hạn không.",
        },
      },
      {
        type: "closing",
        lines: [
          "Bài kiểm tra dựng mô hình không đo kiến thức mà đo thói quen làm việc dưới áp lực.",
          "Bài cuối chặng lùi lại một bước: nhìn toàn bộ những kỹ năng này trong một lộ trình nghề nghiệp.",
        ],
      },
    ],
  },
  {
    id: 1484,
    slug: "lo-trinh-nghe-phan-tich-tai-chinh",
    title: "Kỹ năng nghề, Bài 4: Lộ trình nghề - từ chuyên viên phân tích đến người ra quyết định",
    subtitle: "Kỹ năng đổi theo cấp bậc, chọn giữa chuyên sâu và quản lý, và cách xây hồ sơ nghề nghiệp",
    duration: "11 phút",
    difficulty: "Trung bình",
    emoji: "🧗",
    track: "professional",
    whyItMatters:
      "Kỹ năng đưa bạn qua vòng tuyển dụng không phải kỹ năng giúp bạn thăng tiến, và điều này gây bất ngờ cho rất nhiều người sau vài năm đi làm. Biết trước bản đồ giúp bạn đầu tư đúng thứ vào đúng giai đoạn.",
    openingQuestion:
      "Khác biệt lớn nhất giữa công việc của chuyên viên phân tích và người ra quyết định đầu tư là gì?",
    openingOptions: [
      "Chuyên viên tạo ra phân tích; người ra quyết định chọn tin vào phân tích nào và chịu trách nhiệm",
      "Chuyên viên làm việc với số liệu còn người ra quyết định chỉ làm việc với con người",
      "Người ra quyết định dựng mô hình phức tạp hơn và sử dụng nhiều công cụ chuyên sâu hơn",
      "Chuyên viên tập trung vào ngắn hạn còn người ra quyết định chỉ quan tâm tới dài hạn",
    ],
    correctOption: 0,
    explanation:
      "Chuyển đổi khó nhất trong nghề này là từ việc sản xuất phân tích sang việc chịu trách nhiệm cho một quyết định dựa trên thông tin không bao giờ đầy đủ. Chuyên viên giỏi có thể trì hoãn bằng cách đòi thêm dữ liệu; người ra quyết định thì không, vì không quyết định cũng chính là một quyết định. Kỹ năng cần cho hai vai trò vì thế khác nhau về bản chất, và người giỏi nhất ở vai trò thứ nhất không tự động giỏi ở vai trò thứ hai.",
    diagram: [
      { label: "Cấp đầu: chính xác và tốc độ", arrow: true },
      { label: "Cấp giữa: phán đoán và ưu tiên", arrow: true },
      { label: "Cấp cao: ra quyết định và chịu trách nhiệm", arrow: true },
      { label: "Mỗi bước là một loại kỹ năng khác, không phải nhiều hơn" },
    ],
    realWorldExample: {
      company: "Bước hụt ở năm thứ ba",
      description:
        "Một mô thức lặp lại trong ngành: chuyên viên xuất sắc ở hai năm đầu nhờ làm nhanh, chính xác và không bao giờ sai số. Đến năm thứ ba, họ được kỳ vọng tự chọn việc gì đáng làm và tự đưa ra quan điểm, nhưng vẫn tiếp tục tối ưu cho sự chính xác và chờ được giao việc. Đánh giá của họ chững lại mà không ai giải thích rõ vì sao. Vấn đề không phải năng lực mà là họ chưa nhận ra tiêu chí đã đổi.",
    },
    quiz: [
      {
        question: "Kỹ năng quan trọng nhất ở hai năm đầu nghề là gì?",
        options: [
          "Độ chính xác và tốc độ - làm đúng, làm nhanh, không để sót lỗi",
          "Khả năng xây dựng quan hệ với khách hàng và đối tác bên ngoài tổ chức",
          "Kinh nghiệm ra quyết định đầu tư độc lập với quy mô vốn nhỏ",
          "Hiểu biết chiến lược về hướng phát triển dài hạn của cả tổ chức",
        ],
        correct: 0,
        explanation:
          "Ở giai đoạn này bạn được giao việc rõ ràng, và giá trị bạn tạo ra là làm việc đó chính xác và nhanh. Cố nhảy sang phần chiến lược quá sớm trong khi vẫn để sót lỗi trong bảng tính là cách chắc chắn để mất uy tín.",
      },
      {
        question: "Điều gì thay đổi khi lên cấp giữa?",
        options: [
          "Bạn phải tự xác định việc gì đáng làm và bảo vệ quan điểm của mình",
          "Bạn không còn phải làm việc trực tiếp với số liệu và mô hình tài chính nữa",
          "Bạn chuyển hoàn toàn sang quản lý con người thay vì làm chuyên môn",
          "Bạn chỉ cần rà soát công việc của người khác chứ không tạo ra sản phẩm mới",
        ],
        correct: 0,
        explanation:
          "Đây là bước hụt phổ biến nhất. Việc được giao ít cụ thể hơn, và giá trị bạn tạo ra chuyển từ thực thi sang phán đoán: chọn đúng vấn đề, ưu tiên đúng thứ, và đưa ra quan điểm mà người khác có thể hành động theo.",
      },
      {
        question: "Vì sao hồ sơ nghề nghiệp nên thể hiện được quan điểm chứ không chỉ liệt kê kỹ năng?",
        options: [
          "Vì kỹ năng kỹ thuật là điều kiện cần mà nhiều ứng viên đều có, quan điểm mới tạo khác biệt",
          "Vì nhà tuyển dụng không có thời gian đọc phần liệt kê kỹ năng trong hồ sơ",
          "Vì các kỹ năng kỹ thuật đều có thể kiểm tra trực tiếp trong vòng phỏng vấn",
          "Vì quy ước trình bày hồ sơ trong ngành tài chính không cho phép liệt kê kỹ năng",
        ],
        correct: 0,
        explanation:
          "Ai cũng ghi thành thạo Excel và định giá DCF. Rất ít người có thể trình bày một luận điểm đầu tư mà họ đã theo dõi qua thời gian và rút ra bài học. Thứ hai mới là bằng chứng cho khả năng phán đoán - phần không kiểm tra được bằng bài thi.",
      },
      {
        question: "Chọn giữa hướng chuyên sâu và hướng quản lý nên dựa vào đâu?",
        options: [
          "Việc bạn muốn tạo giá trị bằng độ sâu chuyên môn hay bằng năng lực của người khác",
          "Mức thu nhập bình quân của hai hướng tại thời điểm bạn đưa ra lựa chọn",
          "Hướng nào có ít cạnh tranh hơn trong tổ chức nơi bạn đang làm việc",
          "Lời khuyên của người quản lý trực tiếp vì họ hiểu rõ năng lực của bạn nhất",
        ],
        correct: 0,
        explanation:
          "Đây là hai nghề khác nhau chứ không phải hai bậc cao thấp. Người giỏi chuyên môn được thăng lên quản lý rồi phát hiện mình ghét công việc mới là mô thức phổ biến, và nó gây thiệt hại cho cả cá nhân lẫn tổ chức.",
      },
    
    {
      "question": "Bước chuyển khó nhất trong nghề phân tích tài chính là gì?",
      "options": [
        "Từ sản xuất phân tích sang chịu trách nhiệm cho quyết định thiếu dữ liệu",
        "Từ làm việc với báo cáo tài chính sang làm việc với mô hình định giá",
        "Từ vị trí chuyên viên sang vị trí quản lý một nhóm phân tích",
        "Từ phân tích một ngành sang phân tích nhiều ngành cùng lúc"
      ],
      "correct": 0,
      "explanation": "Chuyên viên giỏi luôn có thể xin thêm thời gian và thêm dữ liệu. Người ra quyết định thì không - dữ liệu không bao giờ đủ và cửa sổ cơ hội thì đóng. Đây là chỗ nhiều người phân tích xuất sắc dừng lại, và nó là kỹ năng khác chứ không phải mức độ cao hơn của cùng kỹ năng."
    }
    ],
    keyTakeaways: [
      "Cấp đầu được đánh giá bằng độ chính xác và tốc độ; cấp giữa bằng phán đoán; cấp cao bằng quyết định",
      "Bước hụt phổ biến nhất là tiếp tục tối ưu cho sự chính xác khi tiêu chí đã chuyển sang phán đoán",
      "Hồ sơ nghề nghiệp mạnh thể hiện quan điểm đã được kiểm chứng, không chỉ liệt kê kỹ năng",
      "Chuyên sâu và quản lý là hai nghề khác nhau, không phải hai bậc cao thấp",
    ],
    practicePrompt: {
      question:
        "Bạn đã làm chuyên viên phân tích hai năm, luôn hoàn thành việc được giao rất tốt nhưng đánh giá gần đây nói bạn cần chủ động hơn. Nên hiểu thế nào?",
      options: [
        "Tổ chức muốn bạn làm thêm giờ và nhận thêm khối lượng công việc lớn hơn",
        "Tiêu chí đã đổi: bạn được kỳ vọng tự chọn vấn đề và đưa ra quan điểm, không chỉ thực thi",
        "Đây là nhận xét mang tính hình thức và không phản ánh vấn đề thực chất nào",
        "Bạn nên chuyển sang một tổ chức khác nơi kỹ năng thực thi được đánh giá cao hơn",
      ],
      correct: 1,
      explanation:
        "Chủ động ở đây không có nghĩa là làm nhiều hơn mà là làm khác đi: mang đến một vấn đề chưa ai nêu, một quan điểm có bằng chứng, hoặc một cách làm tốt hơn. Cách thực hành cụ thể nhất là mỗi tuần gửi cho cấp trên một ghi chú ngắn về điều bạn nhận ra mà chưa ai hỏi tới.",
    },
    summary: {
      keyIdea: "Mỗi cấp bậc đòi hỏi một loại kỹ năng khác, không phải nhiều hơn của cùng một kỹ năng",
      commonMistake: "Tiếp tục tối ưu cho tiêu chí của cấp bậc cũ sau khi đã được kỳ vọng ở cấp bậc mới",
      action: "Viết ra ba việc bạn đang làm rất tốt và tự hỏi chúng thuộc tiêu chí của cấp bậc nào.",
    },
    application: {
      title: "Xây hồ sơ bằng sản phẩm thật",
      message:
        "Chọn hai đến ba doanh nghiệp và theo dõi chúng liên tục trong một năm: viết luận điểm ban đầu, ghi lại các mốc kiểm chứng, và tổng kết mình đúng sai ở đâu. Một tài liệu như vậy có sức thuyết phục hơn mọi dòng liệt kê kỹ năng trong hồ sơ.",
      secondary: "Nó cũng chính là thứ bạn mang vào phòng phỏng vấn khi được hỏi hãy nói về một khoản đầu tư bạn quan tâm.",
    },
    sections: [
      {
        type: "lead",
        text: "Ba bài trước là kỹ năng cụ thể. Bài này lùi lại nhìn toàn cảnh, vì thứ quyết định sự nghiệp dài hạn không phải bạn giỏi kỹ năng nào ở thời điểm này, mà là bạn có nhận ra tiêu chí đánh giá đã đổi hay không.",
      },
      {
        type: "conceptTable",
        title: "Ba giai đoạn, ba tiêu chí",
        subtitle: "Mỗi lần chuyển giai đoạn là một lần đổi định nghĩa về làm tốt",
        concepts: [
          { vi: "Thực thi", en: "Execution", def: "Hai đến ba năm đầu. Được giao việc rõ ràng. Giá trị nằm ở độ chính xác, tốc độ và độ tin cậy. Không được phép sai số." },
          { vi: "Phán đoán", en: "Judgment", def: "Giai đoạn giữa. Việc được giao mơ hồ hơn. Giá trị nằm ở việc chọn đúng vấn đề, ưu tiên đúng thứ và đưa ra quan điểm bảo vệ được." },
          { vi: "Quyết định", en: "Ownership", def: "Cấp cao. Chịu trách nhiệm cho kết quả với thông tin không đầy đủ. Giá trị nằm ở việc quyết định được và sống với hệ quả." },
        ],
      },
      {
        type: "callout",
        label: "Vì sao ít ai nói với bạn điều này",
        text: "Phần lớn tổ chức không nói rõ tiêu chí đã đổi; họ chỉ nhận xét rằng bạn cần chủ động hơn hoặc cần tư duy chiến lược hơn. Những cụm từ đó thường được hiểu thành làm nhiều hơn, trong khi ý thật là làm khác đi. Biết trước bản đồ giúp bạn dịch đúng nhận xét đó.",
      },
      {
        type: "comparison",
        left: {
          label: "Hướng chuyên sâu",
          text: "Giá trị đến từ độ sâu hiểu biết trong một lĩnh vực. Phù hợp với người thích tự mình đi đến tận cùng một vấn đề.",
        },
        right: {
          label: "Hướng quản lý",
          text: "Giá trị đến từ việc nhân năng lực của người khác. Phù hợp với người thấy hào hứng khi đội của mình làm được điều họ không tự làm được.",
        },
      },
      {
        type: "closing",
        lines: [
          "Kết thúc chặng: phân tích đúng chỉ là một nửa; nửa còn lại là làm cho phân tích đó được tin và được hành động theo.",
          "Và kỹ năng cuối cùng, dùng được suốt sự nghiệp, vẫn là kỹ năng đơn giản nhất: biết rõ mình đang chắc điều gì và đang giả định điều gì.",
        ],
      },
    ],
  },
];
