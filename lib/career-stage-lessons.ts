import type { Lesson } from "./lesson-types";

// Chặng 20 của track cá nhân: nghề công nghệ theo giai đoạn.
//
// VÌ SAO CHẶNG NÀY TỒN TẠI. Các chặng khác dạy từng kỹ năng rời: ngôn ngữ, hệ
// thống, kiểm thử, phỏng vấn. Không chặng nào nói thứ nào đáng làm TRƯỚC, và
// câu trả lời cho câu đó đổi theo chỗ bạn đang đứng - thứ đúng cho người ba
// năm kinh nghiệm thường là thứ sai cho người mười lăm năm. Chặng này xếp lại
// theo trục thời gian.
//
// KHÔNG TRÙNG CHẶNG 11 VÀ 19. Chặng 11 nói về thu nhập và đãi ngộ, chặng 19 về
// sức khoẻ nghề nghiệp. Ở đây câu hỏi hẹp hơn: cùng một quỹ thời gian có hạn,
// giai đoạn này nên đổ vào đâu.
//
// Ids 390-393 nối tiếp Chặng 19 (380-387).
// Tám điểm nối phải cập nhật cùng lúc - xem chú thích đầu
// lib/income-growth-lessons.ts.

export const CAREER_STAGE_LESSONS: Lesson[] = [
  {
    id: 390,
    slug: "nghe-nhung-nam-dau",
    title: "Chặng 20, Bài 1: Những năm đầu - thói quen quan trọng hơn chức danh",
    subtitle: "Năng lực lúc này còn quá nhỏ để tạo khác biệt; cách làm việc thì không",
    duration: "7 phút",
    difficulty: "Dễ",
    emoji: "🌱",
    track: "personal",
    whyItMatters:
      "Vài năm đầu là giai đoạn người ta so sánh nhiều nhất và đo sai nhiều nhất, vì thứ dễ đo là chức danh và lương còn thứ quyết định mười năm sau thì không hiện ra ở đâu cả.",
    openingQuestion: "Trong hai năm đầu đi làm, thứ nào tạo khác biệt lớn nhất về sau?",
    openingOptions: [
      "Thói quen làm việc: đọc mã người khác, viết kiểm thử, hỏi sớm khi bí",
      "Chức danh đạt được, vì nó là mốc để đàm phán ở những lần chuyển việc tiếp theo",
      "Số công nghệ đã dùng qua, vì diện rộng mở ra nhiều hướng đi hơn về sau này",
      "Tên công ty đầu tiên, vì nó theo hồ sơ của bạn trong suốt phần còn lại của nghề",
    ],
    correctOption: 0,
    explanation:
      "Trong hai năm đầu, chênh lệch năng lực giữa các bạn cùng lứa còn nhỏ và gần như mọi thứ đều học được. Thứ phân hoá dần là cách làm việc: người có thói quen đọc mã của người khác trước khi viết mã của mình, người viết kiểm thử khi còn dễ viết, người hỏi sau ba mươi phút bí thay vì sau ba ngày. Những thói quen ấy không xuất hiện trên hồ sơ và không ai khen trong năm đầu, nhưng chúng cộng dồn: sau năm năm, khoảng cách giữa hai người khởi đầu như nhau chủ yếu đến từ đó chứ không từ công ty họ đã vào hay chức danh họ đã có.",
    diagram: [
      { label: "Năm 1-2: chênh lệch năng lực còn nhỏ", arrow: true },
      { label: "Thói quen bắt đầu phân hoá, không ai thấy", arrow: true },
      { label: "Năm 3-5: khoảng cách mở ra rõ rệt", arrow: true },
      { label: "Lúc này sửa thói quen tốn hơn nhiều lần" },
    ],
    realWorldExample: {
      company: "Hai người cùng vào một ngày",
      description:
        "Một bạn nhận việc rồi làm ngay, bí thì tự xoay tới lúc xong, và ít khi đọc phần mã xung quanh. Một bạn khác dành buổi sáng đầu tuần đọc những thay đổi người khác đã đưa lên, và hỏi khi bí quá ba mươi phút. Sau hai năm, bạn thứ hai nhận được những việc khó hơn - không phải vì giỏi hơn từ đầu mà vì người ta biết giao cho bạn ấy thì việc chạy.",
    },
    quiz: [
      {
        question: "Bí một vấn đề thì nên hỏi sau bao lâu?",
        options: [
          "Sau khoảng nửa giờ, kèm theo những gì mình đã thử",
          "Sau khi đã thử hết mọi hướng tiếp cận mà mình nghĩ ra được để không làm phiền người khác",
          "Càng sớm càng tốt, vì thời gian của cả đội quan trọng hơn thời gian của riêng bạn",
          "Sau một ngày, vì đó là khoảng đủ để tự tìm ra mà chưa ảnh hưởng tới tiến độ chung",
        ],
        correct: 0,
        explanation:
          "Một khung thời gian cụ thể giải quyết được cả hai nỗi lo trái ngược nhau. Hỏi kèm theo những gì đã thử biến câu hỏi từ nhờ làm hộ thành một cuộc trao đổi, và người trả lời cũng mất ít thời gian hơn hẳn. Ba ngày im lặng rồi ra kết quả sai là tình huống tệ nhất cho cả hai phía.",
      },
      {
        question: "Vì sao nên đọc mã của người khác dù không ai yêu cầu?",
        options: [
          "Vì đó là cách nhanh nhất học quy ước và ngữ cảnh của hệ thống",
          "Vì điều đó giúp bạn phát hiện lỗi trong mã của đồng nghiệp trước khi chúng lên môi trường thật",
          "Vì việc tham gia review được ghi nhận và tính vào kết quả đánh giá cuối kỳ của bạn",
          "Vì nó cho thấy bạn quan tâm tới sản phẩm chung chứ không chỉ tới phần việc của mình",
        ],
        correct: 0,
        explanation:
          "Phần lớn thứ khiến người mới chậm không phải cú pháp mà là ngữ cảnh: hệ thống này quen làm thế nào, vì sao chỗ kia lại viết lạ như vậy. Đọc thay đổi của người khác mỗi ngày mười lăm phút rút ngắn giai đoạn ấy nhanh hơn bất kỳ khoá học nào.",
      },
      {
        question: "Chọn nơi làm đầu tiên nên ưu tiên điều gì?",
        options: [
          "Có người đọc mã của bạn và nói cho bạn biết chỗ chưa được",
          "Mức lương khởi điểm cao nhất trong các lời mời, vì nó là nền cho mọi lần thương lượng sau",
          "Công nghệ mới và hiện đại, vì đó là thứ các nhà tuyển dụng tìm kiếm trong vài năm tới",
          "Quy mô công ty lớn, vì hệ thống lớn cho bạn nhiều vấn đề thú vị hơn để giải quyết",
        ],
        correct: 0,
        explanation:
          "Tốc độ tiến bộ trong hai năm đầu gần như hoàn toàn phụ thuộc vào vòng phản hồi. Không ai đọc mã của bạn thì bạn lặp lại cùng một cách làm trong hai năm và gọi đó là hai năm kinh nghiệm, trong khi thực chất là một năm lặp lại hai lần.",
      },
      {
        question: "Nhận việc vượt quá khả năng hiện tại thì nên xử lý ra sao?",
        options: [
          "Nhận, nói rõ phần chưa chắc, và hẹn một mốc để báo lại tiến độ",
          "Từ chối và đề nghị giao cho người có kinh nghiệm phù hợp hơn với yêu cầu của công việc",
          "Nhận và tự xoay xở, vì đây là cách học nhanh nhất mà không làm phiền tới ai khác",
          "Nhận nhưng xin thêm thời gian gấp đôi so với ước lượng ban đầu để phòng rủi ro",
        ],
        correct: 0,
        explanation:
          "Việc vượt khả năng là cách chính để tiến bộ, nên từ chối là bỏ lỡ. Nhưng nhận trong im lặng thì rủi ro dồn hết vào ngày hết hạn. Nói rõ phần chưa chắc ngay từ đầu và đặt một mốc báo lại giữa chừng giữ được cả hai: bạn vẫn học, còn đội vẫn thấy được tình hình sớm.",
      },
      {
        question: "So sánh với bạn cùng lứa trong vài năm đầu có ích không?",
        options: [
          "Ít, vì thứ dễ so là chức danh và lương, còn thứ quyết định thì không đo được",
          "Có, vì đó là cách duy nhất để biết mình đang đi nhanh hay chậm so với mặt bằng chung",
          "Có, nhưng chỉ nên so với những người cùng loại hình công ty và cùng thành phố",
          "Không, vì mỗi người có xuất phát điểm và hoàn cảnh khác nhau nên không so được",
        ],
        correct: 0,
        explanation:
          "Vấn đề không phải so sánh là xấu mà là bạn chỉ so được những thứ nhìn thấy, và chúng lại là những thứ ít dự đoán nhất. Chức danh phụ thuộc vào chỗ trống của công ty; lương phụ thuộc vào loại hình. Cả hai đều không nói gì về việc năm sau bạn có làm được thứ năm nay chưa làm nổi hay không.",
      },
    ],
    practicePrompt: {
      question:
        "Bạn đi làm được một năm, thấy mình chậm hơn bạn cùng khoá đang ở công ty lớn hơn. Nên làm gì?",
      options: [
        "Xem mã của mình có ai đọc không, và mỗi tuần học được gì mới",
        "Chuyển sang một công ty lớn hơn để có môi trường tương đương với bạn cùng khoá của mình",
        "Học thêm công nghệ mà công ty lớn đang dùng để rút ngắn khoảng cách về mặt kỹ năng",
        "Đặt mục tiêu lên chức danh tiếp theo trong vòng một năm để bắt kịp về mặt tiến độ",
      ],
      correct: 0,
      explanation:
        "Hai câu hỏi này đo đúng thứ tạo ra khác biệt về sau, và cả hai đều trả lời được ngay hôm nay. Nếu câu trả lời là không ai đọc mã của bạn và tuần nào cũng giống tuần nào, thì đó mới là vấn đề - và nó không được giải quyết bằng một cái tên công ty lớn hơn trong hồ sơ.",
    },
    keyTakeaways: [
      "Hai năm đầu chênh lệch năng lực còn nhỏ; thói quen mới là thứ phân hoá",
      "Hỏi sau nửa giờ, kèm những gì đã thử - không phải sau ba ngày",
      "Vòng phản hồi quyết định tốc độ tiến bộ, không phải tên công ty",
      "Thứ dễ so sánh nhất cũng là thứ ít dự đoán tương lai nhất",
    ],
    summary: {
      keyIdea: "Vài năm đầu, cách bạn làm việc quyết định nhiều hơn nơi bạn làm việc",
      commonMistake: "Đo tiến bộ bằng chức danh và lương, hai thứ phụ thuộc vào chỗ trống của công ty",
      action: "Trả lời hai câu: mã của mình có ai đọc không, và tuần này mình làm được gì mà tuần trước chưa làm nổi.",
    },
    application: {
      title: "Một khung giờ và một thói quen",
      message:
        "Đặt quy tắc bí quá ba mươi phút thì hỏi, kèm theo những gì đã thử. Và dành mười lăm phút đầu ngày đọc những thay đổi người khác đã đưa lên.",
      secondary:
        "Cả hai đều nhỏ tới mức trông như không đáng làm, và đó là lý do rất ít người làm chúng đủ lâu để thấy kết quả.",
    },
    sections: [
      {
        type: "lead",
        text: "Vài năm đầu là giai đoạn người ta lo lắng nhiều nhất về việc mình đang đi nhanh hay chậm, và đo bằng đúng những thứ không nói lên điều đó.",
      },
      {
        type: "heading",
        text: "Thứ cộng dồn không nằm trên hồ sơ",
      },
      {
        type: "paragraph",
        text: "Chức danh và lương là kết quả của một thời điểm: công ty đang thiếu chỗ nào, ngân sách năm đó ra sao. Cách làm việc thì cộng dồn mỗi ngày. Người quen đọc mã của người khác hiểu hệ thống nhanh hơn; người quen viết kiểm thử ít phải quay lại sửa hơn; người quen hỏi đúng lúc mất ít thời gian hơn cho mỗi vấn đề. Không cái nào tạo khác biệt trong một tháng, và cả ba tạo khác biệt rõ trong ba năm.",
      },
      {
        type: "list",
        items: [
          "Bí quá nửa giờ thì hỏi, và hỏi kèm theo những gì đã thử",
          "Mười lăm phút mỗi ngày đọc thay đổi của người khác trong cùng hệ thống",
          "Viết kiểm thử lúc còn dễ viết, không đợi tới lúc phải sửa lỗi mới viết",
          "Nhận việc vượt khả năng, nhưng nói rõ phần chưa chắc ngay từ đầu",
        ],
      },
      {
        type: "callout",
        label: "Hai năm kinh nghiệm và một năm lặp lại hai lần",
        text: "Khác biệt giữa hai thứ đó nằm ở việc có ai nói cho bạn biết chỗ chưa được hay không. Một nơi trả cao hơn nhưng không có review mã sẽ khiến bạn mất nhiều hơn phần chênh lệch ấy mỗi tháng, chỉ là khoản mất đó không hiện ra trên bảng lương và vì thế không ai tính vào.",
      },
      {
        type: "closing",
        lines: [
          "Giai đoạn này không phải để chạy nhanh, mà để tạo ra những thói quen sẽ chạy thay bạn trong mười năm.",
          "Bài sau: khi chuyên môn đã vững thì một loại việc khác bắt đầu chen vào.",
        ],
      },
    ],
  },
  {
    id: 391,
    slug: "nghe-giai-doan-giua",
    title: "Chặng 20, Bài 2: Giai đoạn giữa - vùng chồng lấn",
    subtitle: "Chuyên môn vẫn phải giữ, mà việc dẫn dắt đã bắt đầu chiếm chỗ",
    duration: "8 phút",
    difficulty: "Trung bình",
    emoji: "🔀",
    track: "personal",
    whyItMatters:
      "Đây là giai đoạn nhiều người thấy mình bận hơn hẳn mà tiến bộ chậm lại, và kết luận rằng mình đang chững. Thường thì không phải chững - chỉ là công việc đã đổi hình dạng mà cách đo vẫn giữ nguyên.",
    openingQuestion: "Vì sao nhiều người thấy mình chững ở giai đoạn giữa nghề?",
    openingOptions: [
      "Vì phần lớn thời gian chuyển sang việc không sinh ra mã, mà họ vẫn đo bằng mã",
      "Vì các công nghệ mới xuất hiện nhanh hơn tốc độ họ có thể học và cập nhật kịp thời",
      "Vì cơ hội thăng tiến ở giai đoạn này ít hơn hẳn nên động lực cũng giảm theo tương ứng",
      "Vì trách nhiệm gia đình chiếm mất phần thời gian trước đây dành cho việc học thêm",
    ],
    correctOption: 0,
    explanation:
      "Ở giai đoạn giữa, một phần lớn thời gian chuyển sang những việc không để lại dấu vết trong kho mã: xem lại thay đổi của người khác, giải thích một quyết định cũ, tách một yêu cầu mơ hồ thành việc làm được, gỡ một chỗ hai người đang hiểu khác nhau. Đó là công việc thật và nó tạo ra giá trị lớn hơn cùng số giờ dùng để viết mã, nhưng nó không đo được bằng thước cũ. Người dùng thước cũ sẽ thấy mình sản xuất ít đi mỗi năm và kết luận sai về chính mình.",
    diagram: [
      { label: "Việc viết mã giảm dần theo tỷ lệ", arrow: true },
      { label: "Việc gỡ vướng cho người khác tăng lên", arrow: true },
      { label: "Thước đo cũ báo là chững lại", arrow: true },
      { label: "Cần một thước khác, không phải cần quay lại thước cũ" },
    ],
    realWorldExample: {
      company: "Một năm ít mã nhất",
      description:
        "Một kỹ sư bảy năm kinh nghiệm nhìn lại năm vừa rồi và thấy mình đưa lên ít thay đổi nhất từ trước tới nay, nên nghĩ mình đã tụt lại. Nhìn theo cách khác: năm đó bạn ấy đã gỡ bế tắc cho ba người, viết lại phần tài liệu khiến người mới vào việc nhanh hơn hẳn, và dừng một hướng thiết kế mà cả đội đã suýt đi. Không việc nào nằm trong kho mã.",
    },
    quiz: [
      {
        question: "Cách đo phù hợp hơn cho giai đoạn này là gì?",
        options: [
          "Việc chạy được nhờ bạn, kể cả việc do người khác làm",
          "Số lượng thay đổi bạn tự đưa lên trong kỳ, vì đó vẫn là đóng góp trực tiếp và đo được",
          "Số cuộc họp và trao đổi mà bạn tham gia với vai trò dẫn dắt về mặt kỹ thuật",
          "Mức độ phức tạp của những phần hệ thống mà bạn đang chịu trách nhiệm chính",
        ],
        correct: 0,
        explanation:
          "Ở giai đoạn này, phần đóng góp lớn nhất thường nằm trong việc của người khác: một câu hỏi đúng lúc trong buổi review, một tài liệu khiến ba người khỏi phải hỏi lại, một quyết định thiết kế được sửa trước khi nó thành mã. Thước cũ không nhìn thấy gì trong số đó.",
      },
      {
        question: "Giữ chuyên môn kỹ thuật ở giai đoạn này bằng cách nào?",
        options: [
          "Giữ một phần việc thật mình vẫn tự làm, dù nhỏ",
          "Dành thời gian cố định mỗi tuần để đọc tài liệu và cập nhật các công nghệ mới xuất hiện",
          "Tham gia sâu vào những cuộc thảo luận kỹ thuật của đội để nắm được chi tiết triển khai",
          "Xem lại kỹ mọi thay đổi của đội để không mất cảm giác về mã đang chạy trong hệ thống",
        ],
        correct: 0,
        explanation:
          "Đọc và thảo luận đều hữu ích nhưng chúng không thay được việc tự làm. Người ngừng hẳn viết mã mất cảm giác về chi phí thật của một quyết định trong khoảng một tới hai năm, và mất rồi thì các lời khuyên kỹ thuật của họ dần trở nên xa thực tế mà chính họ không nhận ra.",
      },
      {
        question: "Được đề nghị lên vị trí quản lý thì nên cân nhắc điều gì trước?",
        options: [
          "Đây là một nghề khác, không phải bậc tiếp theo của nghề cũ",
          "Mức lương và phạm vi trách nhiệm mới có tương xứng với khối lượng công việc tăng thêm không",
          "Bạn đã có đủ kinh nghiệm kỹ thuật để đưa ra quyết định cho cả đội hay chưa",
          "Công ty có lộ trình rõ ràng để bạn quay lại vai trò kỹ thuật nếu thấy không phù hợp",
        ],
        correct: 0,
        explanation:
          "Cách trình bày phổ biến là bậc thang, và nó gây hiểu nhầm: quản lý dùng một bộ kỹ năng khác, có một loại niềm vui khác, và giỏi kỹ thuật không dự đoán được bạn có hợp với nó hay không. Câu hỏi đúng là bạn có muốn làm việc đó hằng ngày không, chứ không phải bạn đã xứng đáng chưa.",
      },
      {
        question: "Chuyên môn hẹp và diện rộng ở giai đoạn này nên cân bằng ra sao?",
        options: [
          "Sâu ở một mảng để có tiếng nói, đủ rộng để nối được các mảng",
          "Ưu tiên mở rộng diện vì giai đoạn này cần làm việc với nhiều phần khác nhau của hệ thống",
          "Ưu tiên đào sâu một mảng vì đó là thứ khiến bạn khó thay thế trong đội hiện tại",
          "Giữ nguyên tỷ lệ như giai đoạn đầu vì cả hai đều quan trọng như nhau về lâu dài",
        ],
        correct: 0,
        explanation:
          "Chỉ sâu mà không rộng thì bạn giải được vấn đề của mình nhưng không thấy được vấn đề nằm giữa hai đội. Chỉ rộng mà không sâu thì ý kiến của bạn không có sức nặng ở đâu cả. Hình dạng cần có là một chỗ đủ sâu để người ta tìm tới, cộng với đủ hiểu biết xung quanh để nối các mảnh lại.",
      },
      {
        question: "Dấu hiệu nào cho thấy bạn đang thật sự chững lại, chứ không phải đổi hình dạng công việc?",
        options: [
          "Một năm trôi qua mà không có quyết định nào bạn thấy khó",
          "Số lượng mã bạn viết ra giảm đi đáng kể so với những năm trước đó trong cùng vị trí",
          "Bạn không còn học được công nghệ mới nào trong khoảng thời gian mười hai tháng vừa qua",
          "Bạn cảm thấy công việc trở nên lặp lại và ít thú vị hơn so với giai đoạn trước đây",
        ],
        correct: 0,
        explanation:
          "Cảm giác lặp lại và ít mã hơn đều có thể chỉ là công việc đã đổi. Thứ phân biệt được là độ khó của những quyết định bạn phải đưa ra: nếu cả năm không có quyết định nào khiến bạn phải dừng lại cân nhắc, thì bạn đang làm lại thứ mình đã biết chứ không phải đang làm loại việc khác.",
      },
    ],
    practicePrompt: {
      question:
        "Bạn thấy năm nay mình viết ít mã hơn hẳn và lo là mình đang tụt lại. Nên kiểm bằng cách nào?",
      options: [
        "Liệt kê những việc chạy được nhờ bạn, kể cả việc người khác làm",
        "So sánh số lượng thay đổi bạn đưa lên năm nay với năm ngoái để có con số cụ thể",
        "Hỏi quản lý trực tiếp xem đóng góp của bạn có được ghi nhận đầy đủ trong kỳ đánh giá không",
        "Nhận thêm một dự án kỹ thuật để đảm bảo phần viết mã quay lại mức như trước đây",
      ],
      correct: 0,
      explanation:
        "Danh sách đó thường dài hơn người ta tưởng, và nó là thứ duy nhất đo được loại đóng góp đang chiếm phần lớn thời gian của bạn. Nếu liệt kê xong mà danh sách vẫn ngắn thì lúc ấy mới có cơ sở để lo, và lo về đúng chuyện.",
    },
    keyTakeaways: [
      "Phần lớn đóng góp giai đoạn này không để lại dấu vết trong kho mã",
      "Ngừng hẳn viết mã thì mất cảm giác về chi phí thật trong một tới hai năm",
      "Quản lý là một nghề khác, không phải bậc tiếp theo của nghề cũ",
      "Chững lại là một năm không có quyết định nào thấy khó",
    ],
    summary: {
      keyIdea: "Giai đoạn giữa, công việc đổi hình dạng trước khi cách đo kịp đổi theo",
      commonMistake: "Kết luận mình chững lại vì viết ít mã hơn, trong khi phần đóng góp lớn nhất đã chuyển chỗ",
      action: "Liệt kê những việc chạy được nhờ bạn trong sáu tháng qua, kể cả việc do người khác làm.",
    },
    application: {
      title: "Đổi thước, đừng đổi việc",
      message:
        "Mỗi quý, ghi ra ba việc đã chạy được nhờ bạn mà không nằm trong kho mã, và một quyết định bạn thấy khó. Hai con số đó nói nhiều hơn số thay đổi đã đưa lên.",
      secondary:
        "Giữ lấy một phần việc thật mình vẫn tự làm, dù nhỏ - đó là thứ giữ cho lời khuyên của bạn còn dính với thực tế.",
    },
    sections: [
      {
        type: "lead",
        text: "Giai đoạn giữa nghề hiếm khi được mô tả rõ, nên nhiều người đi qua nó với cảm giác mơ hồ rằng có gì đó đang không ổn với mình.",
      },
      {
        type: "heading",
        text: "Công việc đổi trước, cách đo đổi sau",
      },
      {
        type: "paragraph",
        text: "Ở giai đoạn đầu, gần như mọi giờ làm việc đều biến thành mã, nên đếm mã là một thước đo tạm ổn. Ở giai đoạn giữa, phần lớn giờ chuyển sang gỡ vướng, giải thích, và ngăn những hướng sai trước khi chúng thành mã. Thước cũ không đo được loại việc này, và nó báo về một con số đi xuống mỗi năm.",
      },
      {
        type: "callout",
        label: "Đừng ngừng hẳn việc tự làm",
        text: "Người rời hoàn toàn khỏi việc viết mã thường mất cảm giác về chi phí thật của một quyết định trong khoảng một tới hai năm, và điều khó chịu là họ không nhận ra lúc nó đang xảy ra. Giữ một phần việc thật, dù nhỏ, rẻ hơn nhiều so với việc lấy lại cảm giác ấy sau này.",
      },
      {
        type: "closing",
        lines: [
          "Bận hơn mà thấy tiến bộ chậm lại thường là dấu hiệu công việc đã đổi, không phải dấu hiệu bạn đã chững.",
          "Bài sau: khi chiều sâu đã có, câu hỏi chuyển thành dùng nó vào việc gì.",
        ],
      },
    ],
  },
  {
    id: 392,
    slug: "nghe-giai-doan-sau",
    title: "Chặng 20, Bài 3: Giai đoạn sau - chiều sâu, ảnh hưởng và lựa chọn",
    subtitle: "Không còn thiếu năng lực, mà thiếu chỗ đặt nó cho đúng",
    duration: "8 phút",
    difficulty: "Trung bình",
    emoji: "🧭",
    track: "personal",
    whyItMatters:
      "Sau mười năm, thứ giới hạn bạn hiếm khi còn là kỹ năng. Nó là việc chọn đặt thời gian vào đâu, và ở giai đoạn này một lựa chọn sai kéo dài nhiều năm chứ không phải vài tháng.",
    openingQuestion: "Sau mười năm làm nghề, thứ giới hạn thường là gì?",
    openingOptions: [
      "Chọn đặt thời gian vào đâu, chứ không phải thiếu kỹ năng nào",
      "Việc theo kịp các công nghệ mới, vì tốc độ thay đổi của ngành ngày càng nhanh hơn trước",
      "Cơ hội thăng tiến, vì số vị trí ở cấp cao luôn ít hơn nhiều so với số người đủ năng lực",
      "Năng lượng và thời gian, vì trách nhiệm ngoài công việc ở giai đoạn này thường nhiều hơn",
    ],
    correctOption: 0,
    explanation:
      "Đến giai đoạn này bạn đã có đủ nền để học bất cứ thứ gì cần trong vài tuần, nên thiếu kỹ năng hiếm khi là nút thắt thật. Nút thắt là bạn chỉ có một quỹ thời gian và có nhiều thứ đáng làm hơn số giờ bạn có: đi sâu thêm vào mảng mình đã mạnh, mở sang một mảng mới, dựng lại một hệ thống lớn, hay dành phần lớn thời gian nâng những người xung quanh lên. Không lựa chọn nào sai, nhưng chọn theo quán tính thì sau ba năm bạn ở đúng chỗ cũ với nhiều kinh nghiệm hơn về đúng những thứ mình đã biết.",
    diagram: [
      { label: "Kỹ năng đã đủ để học thứ mới trong vài tuần", arrow: true },
      { label: "Nút thắt chuyển sang: đặt thời gian vào đâu", arrow: true },
      { label: "Chọn theo quán tính thì ba năm trôi qua", arrow: true },
      { label: "Chọn có chủ đích thì ba năm đó đổi được hướng" },
    ],
    realWorldExample: {
      company: "Ba năm và hai lựa chọn",
      description:
        "Hai người cùng mười hai năm kinh nghiệm. Một bạn tiếp tục nhận những việc khó nhất của mảng mình đã giỏi, và sau ba năm là người giỏi nhất trong công ty ở mảng đó. Một bạn khác dành một phần thời gian dựng lại cách cả đội làm việc, và sau ba năm thì bốn người xung quanh làm nhanh hơn hẳn. Cả hai đều đúng; điều đáng nói là chỉ một người trong hai đã thật sự chọn.",
    },
    quiz: [
      {
        question: "Nâng người khác lên tạo ra đòn bẩy thế nào?",
        options: [
          "Kết quả không dừng lại khi bạn ngừng làm, vì nó ở trong cách người khác làm việc",
          "Nó giúp bạn có thêm thời gian để tập trung vào những vấn đề kỹ thuật khó hơn của hệ thống",
          "Nó được ghi nhận cao hơn trong các kỳ đánh giá so với đóng góp kỹ thuật trực tiếp",
          "Nó mở đường sang vai trò quản lý, vốn là hướng phát triển tự nhiên ở giai đoạn này",
        ],
        correct: 0,
        explanation:
          "Đây là khác biệt cốt lõi giữa làm và nhân lên. Một vấn đề bạn tự giải xong là xong; một cách làm bạn truyền được cho bốn người sẽ tiếp tục cho kết quả cả khi bạn đã chuyển sang việc khác, thậm chí cả khi bạn đã rời công ty.",
      },
      {
        question: "Dấu hiệu nào cho thấy bạn đang chọn theo quán tính?",
        options: [
          "Việc đến tay bạn vì bạn quen làm nó, không vì nó đáng làm nhất",
          "Bạn nhận nhiều việc hơn khả năng xử lý nên thường xuyên phải làm ngoài giờ để kịp tiến độ",
          "Bạn không còn thấy hứng thú với những phần việc kỹ thuật mà trước đây mình rất thích làm",
          "Bạn ít khi được hỏi ý kiến về những quyết định lớn của đội dù có nhiều kinh nghiệm nhất",
        ],
        correct: 0,
        explanation:
          "Người có kinh nghiệm thường bị việc tìm tới chứ không phải đi tìm việc, và điều đó rất dễ chịu nên rất khó nhận ra. Câu hỏi để kiểm là: nếu hôm nay mới vào công ty này, mình có chọn dành phần lớn thời gian cho đúng những việc đang làm không.",
      },
      {
        question: "Nên xử lý thế nào khi mảng mình giỏi đang mất dần chỗ đứng?",
        options: [
          "Tách phần nguyên lý khỏi phần công cụ, vì phần nguyên lý chuyển được",
          "Học một công nghệ mới đang lên để chuyển hẳn sang mảng đó trước khi mảng cũ hết nhu cầu",
          "Ở lại vì các hệ thống cũ vẫn cần người bảo trì và nhu cầu đó thường kéo dài rất lâu",
          "Chuyển sang vai trò quản lý để không còn phụ thuộc vào một mảng kỹ thuật cụ thể nào",
        ],
        correct: 0,
        explanation:
          "Phần lớn thứ bạn học được trong mười năm không nằm ở công cụ mà ở nguyên lý: cách một hệ thống hỏng, cách đánh đổi giữa nhất quán và tốc độ, cách một yêu cầu mơ hồ thành thứ làm được. Những thứ đó chuyển sang mảng mới gần như nguyên vẹn, và chúng là lý do người mười năm học mảng mới nhanh hơn người mới ra trường.",
      },
      {
        question: "Vì sao nên viết lại những gì mình biết ở giai đoạn này?",
        options: [
          "Vì phần lớn hiểu biết đang nằm trong đầu một người, và đó là rủi ro cho cả đội",
          "Vì tài liệu là căn cứ để chứng minh đóng góp của bạn trong các kỳ đánh giá cuối năm",
          "Vì viết ra giúp bạn hệ thống lại kiến thức và phát hiện những chỗ mình còn hiểu chưa kỹ",
          "Vì đội ngũ mới cần tài liệu để làm quen với hệ thống mà không phải hỏi lại nhiều lần",
        ],
        correct: 0,
        explanation:
          "Ba lý do kia đều đúng nhưng chúng là lợi ích phụ. Lý do chính là rủi ro tập trung: khi lý do đằng sau một quyết định kiến trúc chỉ tồn tại trong trí nhớ của một người, cả hệ thống phụ thuộc vào việc người đó có mặt - và không ai coi đó là rủi ro cho tới hôm người đó nghỉ.",
      },
      {
        question: "Người có kinh nghiệm nên phản đối một hướng đi sai như thế nào?",
        options: [
          "Nói rõ điều gì sẽ hỏng và khi nào, thay vì chỉ nói là không nên",
          "Trình bày phương án thay thế đầy đủ để đội có cơ sở so sánh trước khi đưa ra quyết định",
          "Nêu lại những lần tương tự trong quá khứ đã dẫn tới kết quả không tốt như thế nào",
          "Đề nghị lùi quyết định lại để có thêm thời gian nghiên cứu kỹ hơn các rủi ro liên quan",
        ],
        correct: 0,
        explanation:
          "Uy tín tích luỹ được rất dễ biến thành lối tắt: người có kinh nghiệm nói không nên và mọi người dừng lại vì người đó nói. Điều ấy khiến đội không học được gì và khiến bạn không bị kiểm chứng. Nói rõ cái gì hỏng và khi nào thì tạo ra một dự đoán, và dự đoán thì đúng hoặc sai được.",
      },
    ],
    practicePrompt: {
      question:
        "Bạn có mười hai năm kinh nghiệm, đang bận và mọi việc đều chạy. Câu hỏi nào đáng đặt ra nhất?",
      options: [
        "Nếu hôm nay mới vào đây, mình có chọn làm đúng những việc này không",
        "Mình có đang theo kịp các công nghệ mới mà thị trường đang tìm kiếm hay không",
        "Đóng góp của mình có được ghi nhận tương xứng với kinh nghiệm hiện có hay không",
        "Mình nên chuyển sang vai trò quản lý hay tiếp tục đi theo hướng chuyên môn kỹ thuật",
      ],
      correct: 0,
      explanation:
        "Mọi việc đều chạy là trạng thái dễ chịu nhất và cũng là trạng thái mà quán tính hoạt động mạnh nhất. Câu hỏi này tách được thứ bạn đang làm vì nó đáng làm khỏi thứ bạn đang làm vì nó đã ở đó, và đó là phân biệt duy nhất còn quan trọng ở giai đoạn này.",
    },
    keyTakeaways: [
      "Nút thắt chuyển từ thiếu kỹ năng sang chọn đặt thời gian vào đâu",
      "Việc tìm tới người có kinh nghiệm, nên quán tính rất khó nhận ra",
      "Nguyên lý chuyển được sang mảng mới; công cụ thì không",
      "Uy tín dùng để đưa ra dự đoán kiểm chứng được, không phải để kết thúc tranh luận",
    ],
    summary: {
      keyIdea: "Giai đoạn sau, câu hỏi không còn là làm được gì mà là đặt thời gian vào đâu",
      commonMistake: "Nhận việc vì mình quen làm nó, rồi ba năm sau vẫn ở đúng chỗ cũ",
      action: "Hỏi mỗi nửa năm: nếu hôm nay mới vào đây, mình có chọn làm đúng những việc đang làm không.",
    },
    application: {
      title: "Một câu hỏi mỗi sáu tháng",
      message:
        "Liệt kê năm việc chiếm nhiều thời gian nhất của bạn. Với mỗi việc, đánh dấu nó đang ở đó vì đáng làm hay vì bạn quen làm. Số dấu loại hai là câu trả lời.",
      secondary:
        "Viết lại lý do đằng sau hai quyết định kiến trúc mà chỉ mình bạn còn nhớ - đó là rủi ro rẻ nhất bạn gỡ được trong tuần này.",
    },
    sections: [
      {
        type: "lead",
        text: "Sau mười năm, câu hỏi mình có làm được không gần như luôn có câu trả lời là có. Điều đó nghe như tin tốt, và nó chuyển toàn bộ khó khăn sang một chỗ khác.",
      },
      {
        type: "heading",
        text: "Quán tính là thứ dễ chịu nhất",
      },
      {
        type: "paragraph",
        text: "Người có kinh nghiệm không phải đi tìm việc; việc tìm tới họ, và thường là loại việc họ đã làm tốt. Mỗi lần nhận đều hợp lý, và không lần nào là quyết định. Sau ba năm nhìn lại thì đó lại chính là một quyết định, chỉ là nó chưa bao giờ được đưa ra một cách có ý thức.",
      },
      {
        type: "list",
        items: [
          "Đi sâu thêm vào mảng đã mạnh, để trở thành chỗ dựa cuối cùng ở mảng đó",
          "Mở sang một mảng mới, mang theo nguyên lý và bỏ lại công cụ",
          "Nâng những người xung quanh, đổi kết quả một lần lấy kết quả còn lại sau khi bạn đi",
          "Dựng hoặc dựng lại một hệ thống lớn, thứ chỉ người đủ kinh nghiệm mới làm nổi",
        ],
      },
      {
        type: "callout",
        label: "Uy tín là thứ dễ dùng sai nhất ở giai đoạn này",
        text: "Khi bạn nói không nên và cả đội dừng lại vì bạn nói, hai chuyện xảy ra cùng lúc: đội không học được lý do, và bạn không bị kiểm chứng. Nói rõ cái gì sẽ hỏng và khi nào thì biến ý kiến thành một dự đoán - có thể sai, và chính vì thế mà nó đáng tin.",
      },
      {
        type: "closing",
        lines: [
          "Giai đoạn này không thiếu năng lực; nó thiếu những quyết định được đưa ra một cách có ý thức.",
          "Bài sau: gom cả ba giai đoạn lại, và chỗ trọng tâm dịch chuyển theo thời gian.",
        ],
      },
    ],
  },
  {
    id: 393,
    slug: "tu-tich-luy-sang-truyen-lai",
    title: "Chặng 20, Bài 4: Tổng kết - từ tích luỹ sang truyền lại",
    subtitle: "Ba giai đoạn, và trọng tâm dịch chuyển giữa chúng",
    duration: "7 phút",
    difficulty: "Trung bình",
    emoji: "🔁",
    track: "personal",
    whyItMatters:
      "Ba bài trước mỗi bài mô tả một chỗ đứng. Bài này nối chúng lại, vì thứ hay gây khó không phải bản thân từng giai đoạn mà là lúc chuyển giữa hai giai đoạn, khi cách làm cũ vẫn còn hiệu quả nhưng đã hết dư địa.",
    openingQuestion: "Điều gì dịch chuyển rõ nhất qua ba giai đoạn của nghề?",
    openingOptions: [
      "Tỷ lệ giữa việc tự làm và việc khiến người khác làm được",
      "Mức độ phức tạp của các vấn đề kỹ thuật mà bạn được giao xử lý trong công việc",
      "Số lượng công nghệ và công cụ mà bạn có thể sử dụng thành thạo ở mức chuyên sâu",
      "Phạm vi trách nhiệm và số người mà bạn phải phối hợp cùng trong mỗi dự án cụ thể",
    ],
    correctOption: 0,
    explanation:
      "Ở giai đoạn đầu, gần như toàn bộ giá trị bạn tạo ra đến từ việc tự làm, và đó là điều nên xảy ra - bạn đang dựng nền. Ở giai đoạn giữa, một phần đáng kể chuyển sang việc khiến người khác làm được: gỡ vướng, viết lại cho rõ, ngăn một hướng sai. Ở giai đoạn sau, phần đó thường lớn hơn phần tự làm. Ba thứ kia đều thay đổi nhưng chúng thay đổi theo cùng một chiều và không đòi hỏi đổi cách làm việc; riêng tỷ lệ này thì đòi, và đó là lý do các đoạn chuyển giai đoạn khó chịu.",
    diagram: [
      { label: "Giai đoạn đầu: gần như toàn bộ là tự làm", arrow: true },
      { label: "Giai đoạn giữa: một phần chuyển sang gỡ vướng cho người khác", arrow: true },
      { label: "Giai đoạn sau: phần truyền lại thường lớn hơn phần tự làm", arrow: true },
      { label: "Chỗ khó nằm ở đoạn chuyển, không ở từng giai đoạn" },
    ],
    realWorldExample: {
      company: "Cách làm cũ vẫn hiệu quả",
      description:
        "Một kỹ sư giỏi ở giai đoạn giữa vẫn giải quyết mọi việc bằng cách tự làm, và cách đó vẫn cho kết quả tốt hơn giao cho người khác - trong ngắn hạn. Sau hai năm, bạn ấy là nút thắt của bốn việc cùng lúc và không ai trong đội làm nổi phần bạn ấy đang giữ. Cách làm cũ chưa bao giờ ngừng hiệu quả; nó chỉ hết dư địa mà không báo trước.",
    },
    quiz: [
      {
        question: "Vì sao đoạn chuyển giữa hai giai đoạn lại khó?",
        options: [
          "Vì cách làm cũ vẫn còn hiệu quả, chỉ là đã hết dư địa",
          "Vì bạn phải học một bộ kỹ năng hoàn toàn mới trong khi vẫn giữ khối lượng công việc cũ",
          "Vì công ty thường không có lộ trình rõ ràng cho việc chuyển đổi vai trò giữa các giai đoạn",
          "Vì đồng nghiệp và quản lý vẫn kỳ vọng bạn làm việc theo cách bạn đã làm trước đó",
        ],
        correct: 0,
        explanation:
          "Nếu cách cũ ngừng cho kết quả thì việc phải đổi đã rõ ràng. Chuyện xảy ra ngược lại: nó vẫn cho kết quả tốt, thậm chí tốt hơn cách mới lúc bạn còn vụng, nên mọi tín hiệu ngắn hạn đều bảo bạn cứ tiếp tục. Thứ đã đổi là trần, chứ không phải hiệu quả.",
      },
      {
        question: "Ở giai đoạn đầu có nên tập trung vào việc nâng người khác không?",
        options: [
          "Không nhiều, vì chưa có gì đủ vững để truyền và nền của chính mình còn đang dựng",
          "Có, vì thói quen chia sẻ nên được hình thành từ sớm và càng sớm thì càng dễ duy trì",
          "Có, vì giải thích cho người khác là cách hiệu quả nhất để củng cố hiểu biết của chính mình",
          "Không, vì đó là trách nhiệm của những người ở vị trí cao hơn trong đội ngũ kỹ thuật",
        ],
        correct: 0,
        explanation:
          "Giải thích cho người khác đúng là củng cố hiểu biết, nên chia sẻ ở mức bình thường vẫn tốt. Nhưng đặt nó thành trọng tâm khi nền của mình còn mỏng thì bạn truyền đi những thứ chính mình chưa chắc, và cái giá trả sau. Mỗi giai đoạn có một việc chính, và giai đoạn đầu việc chính là tự dựng nền.",
      },
      {
        question: "Dấu hiệu rõ nhất cho thấy bạn đã thành nút thắt của đội?",
        options: [
          "Vài việc dừng lại khi bạn nghỉ một tuần",
          "Bạn nhận được nhiều câu hỏi từ đồng nghiệp hơn hẳn so với những người khác trong đội",
          "Khối lượng công việc của bạn nhiều hơn khả năng xử lý trong giờ làm việc bình thường",
          "Bạn là người duy nhất nắm được toàn bộ kiến trúc của hệ thống mà đội đang phát triển",
        ],
        correct: 0,
        explanation:
          "Đây là phép thử rẻ nhất và trung thực nhất, vì nó không phụ thuộc vào cảm nhận của ai. Nhận nhiều câu hỏi có thể chỉ là bạn dễ hỏi; bận có thể chỉ là phân việc lệch. Việc dừng lại thì là bằng chứng rằng hiểu biết đang nằm ở đúng một chỗ.",
      },
      {
        question: "Truyền lại hiệu quả nhất bằng cách nào?",
        options: [
          "Để người khác làm phần khó và mình ngồi cạnh, thay vì làm hộ rồi giải thích",
          "Viết tài liệu chi tiết về cách hệ thống hoạt động để mọi người có thể tự đọc khi cần",
          "Tổ chức các buổi chia sẻ định kỳ để truyền đạt kinh nghiệm cho cả đội cùng lúc",
          "Xem lại kỹ mọi thay đổi của người khác và góp ý chi tiết vào từng chỗ chưa hợp lý",
        ],
        correct: 0,
        explanation:
          "Ba cách kia đều truyền được thông tin, và thông tin không phải thứ đang thiếu. Thứ thiếu là kinh nghiệm ra quyết định trong lúc chưa đủ dữ kiện, và nó chỉ hình thành khi chính người đó phải quyết. Ngồi cạnh thì đắt hơn làm hộ ở lần đầu và rẻ hơn hẳn từ lần thứ ba.",
      },
      {
        question: "Ba giai đoạn này có gắn với số năm kinh nghiệm không?",
        options: [
          "Chỉ gắn lỏng lẻo; chỗ đứng phụ thuộc vào việc bạn đã gặp những gì",
          "Có, vì mỗi giai đoạn cần một khoảng thời gian tối thiểu để tích luỹ đủ kinh nghiệm cần thiết",
          "Có, và đó là lý do các công ty dùng số năm kinh nghiệm để phân cấp bậc trong đội ngũ",
          "Không, vì mỗi người có tốc độ phát triển riêng nên không thể so sánh theo bất kỳ mốc nào",
        ],
        correct: 0,
        explanation:
          "Số năm là một chỉ báo thô. Người ba năm ở nơi có phản hồi tốt và nhiều loại vấn đề có thể đã ở giai đoạn giữa, còn người tám năm lặp lại cùng một loại việc thì chưa. Điều hữu ích không phải xếp mình vào ô nào, mà là nhận ra thứ đang giới hạn mình là gì.",
      },
    ],
    practicePrompt: {
      question:
        "Bạn muốn biết mình đang ở giai đoạn nào. Phép thử nào cho câu trả lời thẳng nhất?",
      options: [
        "Nghỉ một tuần và xem có việc nào dừng lại vì bạn không có mặt",
        "Đếm số năm kinh nghiệm và so với thang cấp bậc mà công ty bạn đang áp dụng hiện nay",
        "Xem tỷ lệ thời gian dành cho viết mã so với thời gian dành cho họp hành và trao đổi",
        "Hỏi quản lý trực tiếp xem họ đánh giá bạn đang ở mức nào so với những người cùng vị trí",
      ],
      correct: 0,
      explanation:
        "Phép thử này trả lời một câu hỏi hữu ích hơn cả việc xếp mình vào giai đoạn nào: hiểu biết đang nằm trong đầu bạn hay đã nằm trong cách đội làm việc. Nếu ba việc dừng lại thì bạn biết chính xác nên đổ thời gian vào đâu trong quý tới.",
    },
    keyTakeaways: [
      "Thứ dịch chuyển qua ba giai đoạn là tỷ lệ giữa tự làm và khiến người khác làm được",
      "Đoạn chuyển khó vì cách cũ vẫn hiệu quả, chỉ là đã hết trần",
      "Việc dừng lại khi bạn nghỉ một tuần là phép thử rẻ nhất và trung thực nhất",
      "Ngồi cạnh đắt hơn làm hộ ở lần đầu và rẻ hơn hẳn từ lần thứ ba",
    ],
    summary: {
      keyIdea: "Nghề này dịch dần từ tích luỹ sang truyền lại, và chỗ khó nằm ở đoạn chuyển",
      commonMistake: "Giữ cách làm cũ vì nó vẫn cho kết quả tốt, cho tới lúc mình thành nút thắt của bốn việc",
      action: "Nghỉ một tuần và ghi lại việc nào dừng lại - đó là danh sách những gì cần truyền lại trước tiên.",
    },
    application: {
      title: "Phép thử một tuần",
      message:
        "Trong kỳ nghỉ gần nhất, ghi lại những việc phải chờ bạn quay lại. Mỗi việc trong danh sách đó là một chỗ hiểu biết đang nằm ở đúng một người.",
      secondary:
        "Với việc đầu tiên trong danh sách, lần tới hãy để người khác làm và bạn ngồi cạnh, thay vì làm hộ rồi giải thích lại.",
    },
    sections: [
      {
        type: "lead",
        text: "Ba bài trước mô tả ba chỗ đứng. Thứ ít được nói tới là các đoạn nối giữa chúng, và đó lại là chỗ phần lớn người mắc kẹt.",
      },
      {
        type: "heading",
        text: "Một trục duy nhất chạy qua cả ba",
      },
      {
        type: "paragraph",
        text: "Trục đó là tỷ lệ giữa giá trị bạn tạo ra bằng tay mình và giá trị tạo ra qua người khác. Giai đoạn đầu tỷ lệ nghiêng hẳn về vế thứ nhất, và điều đó đúng - chưa có nền thì không truyền được gì. Càng về sau, vế thứ hai càng chiếm chỗ, không phải vì bạn kém đi mà vì mỗi giờ đặt vào đó cho kết quả lớn hơn.",
      },
      {
        type: "callout",
        label: "Cách cũ không ngừng hiệu quả, nó chỉ hết trần",
        text: "Đây là lý do các đoạn chuyển giai đoạn khó nhận ra. Nếu tự làm bỗng cho kết quả tệ đi thì ai cũng biết phải đổi. Thực tế là nó vẫn cho kết quả tốt, và tốt hơn cách mới trong vài tháng đầu khi bạn còn vụng - nên mọi tín hiệu ngắn hạn đều bảo bạn giữ nguyên, đúng lúc đáng đổi nhất.",
      },
      {
        type: "closing",
        lines: [
          "Không có mốc năm nào đánh dấu các giai đoạn này; chỉ có việc nhận ra thứ đang giới hạn mình đã đổi.",
          "Chặng này không thêm kỹ năng nào vào tay bạn; nó chỉ đảm bảo những kỹ năng bạn đã có được đặt vào đúng chỗ.",
        ],
      },
    ],
  },
];
