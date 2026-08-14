import type { Lesson } from "./lesson-types";

// Chặng "Tư duy phân tích dữ liệu" (ids 1501-1506, professional track).
//
// Chặng trước (1491-1496) lo phần công cụ. Chặng này lo phần khiến công cụ
// đó có ích hay có hại: chọn đo cái gì, đọc con số ra sao, và ở đâu thì
// một phân tích đúng về mặt kỹ thuật vẫn dẫn tới kết luận sai.
//
// Đây là phần khó dạy nhất và cũng là phần phân biệt người phân tích với
// người chạy truy vấn. Chặng Định lượng (1421-1426) đã dựng nền thống kê;
// chặng này dùng lại nền đó cho các tình huống kinh doanh cụ thể, và tập
// trung vào những cái bẫy mà phép tính đúng vẫn không cứu được.

export const DATA_THINKING_LESSONS: Lesson[] = [
  {
    id: 1501,
    slug: "chon-chi-so-do-luong-va-vanity-metric",
    title: "Tư duy DL, Bài 1: Chọn chỉ số - và vì sao chỉ số đẹp thường là chỉ số vô dụng",
    subtitle: "Phân biệt chỉ số phù phiếm với chỉ số dẫn tới hành động, và cái bẫy khi chỉ số thành mục tiêu",
    duration: "11 phút",
    difficulty: "Trung bình",
    emoji: "🎯",
    track: "professional",
    whyItMatters:
      "Chọn sai chỉ số là sai lầm đắt nhất trong phân tích, vì nó xảy ra trước mọi phép tính và không phép tính nào sửa được. Một tổ chức đo sai thứ sẽ tối ưu sai hướng một cách rất hiệu quả, và thường chỉ nhận ra sau nhiều quý.",
    openingQuestion:
      "Điều gì phân biệt một chỉ số phù phiếm với một chỉ số thực sự hữu ích?",
    openingOptions: [
      "Chỉ số hữu ích luôn là con số tuyệt đối, còn chỉ số phù phiếm là tỷ lệ phần trăm",
      "Chỉ số hữu ích khi thay đổi thì có người biết phải làm gì khác đi",
      "Chỉ số hữu ích được tính từ dữ liệu nội bộ, chỉ số phù phiếm từ dữ liệu bên ngoài",
      "Chỉ số hữu ích luôn khó tính toán hơn",
    ],
    correctOption: 1,
    explanation:
      "Tổng số người đăng ký từ trước tới nay là chỉ số phù phiếm kinh điển: nó chỉ có thể tăng, nên luôn trông đẹp, nhưng không ai làm gì khác đi khi nhìn nó. Số người đăng ký tuần này có hoạt động trở lại thì khác - nó lên xuống được, và khi giảm thì có người phải tìm hiểu vì sao. Phép thử duy nhất cần nhớ: nếu con số này xấu đi, ai sẽ làm gì?",
    diagram: [
      { label: "Chỉ số này thay đổi được không?", arrow: true },
      { label: "Ai chịu trách nhiệm về nó?", arrow: true },
      { label: "Xấu đi thì làm gì khác?", arrow: true },
      { label: "Có bị lách được không?" },
    ],
    realWorldExample: {
      company: "Ngân hàng đo số tài khoản mở mới",
      description:
        "Một chỉ tiêu phổ biến của mạng lưới chi nhánh là số tài khoản mở mới trong kỳ. Chỉ số này dễ đo, tăng đều và trông rất tốt trên báo cáo. Vấn đề là nó bị lách quá dễ: nhân viên mở tài khoản cho người thân, cho khách không có nhu cầu thật, và con số vẫn đạt trong khi số tài khoản có phát sinh giao dịch không hề tăng. Khi chuyển sang đo số tài khoản còn hoạt động sau 90 ngày, chỉ tiêu khó đạt hơn nhiều nhưng bắt đầu phản ánh đúng thứ ngân hàng thực sự cần.",
    },
    quiz: [
      {
        question: "Vì sao tổng số người dùng tích lũy được xem là chỉ số phù phiếm?",
        options: [
          "Vì con số này thường được các doanh nghiệp báo cáo với độ chính xác không cao lắm",
          "Vì nó chỉ có thể tăng, nên không phát tín hiệu nào để ai đó phải thay đổi hành động",
          "Vì việc thu thập nó đòi hỏi hệ thống theo dõi phức tạp và tốn kém hơn các chỉ số khác",
          "Vì các nhà đầu tư chuyên nghiệp hiện nay đều đã không còn quan tâm tới chỉ số này nữa",
        ],
        correct: 1,
        explanation:
          "Chỉ số chỉ đi một hướng thì không mang thông tin. Cái đáng đo là phần lên xuống được: bao nhiêu người còn quay lại, bao nhiêu người rời đi trong kỳ.",
      },
      {
        question: "Định luật Goodhart nói điều gì về chỉ số?",
        options: [
          "Khi một chỉ số trở thành mục tiêu, nó không còn là thước đo tốt cho điều ta muốn đo",
          "Chỉ số càng được đo thường xuyên thì độ chính xác của phép đo càng được cải thiện dần",
          "Mọi chỉ số kinh doanh đều có xu hướng hội tụ về giá trị trung bình của toàn ngành",
          "Số lượng chỉ số theo dõi nên tỷ lệ thuận với quy mô nhân sự của tổ chức đang đo",
        ],
        correct: 0,
        explanation:
          "Đây là lý do phải hỏi chỉ số này bị lách bằng cách nào trước khi gắn thưởng phạt vào nó. Người ta luôn tối ưu đúng cái được đo, kể cả khi cách tối ưu đó làm hại mục tiêu thật.",
      },
      {
        question: "Vì sao nên đi kèm một chỉ số đối trọng bên cạnh chỉ số chính?",
        options: [
          "Vì việc theo dõi hai chỉ số cùng lúc sẽ làm tăng độ chính xác của cả hai phép đo đó",
          "Vì nó chặn cách tối ưu chỉ số chính bằng việc hy sinh một thứ quan trọng khác",
          "Vì các chuẩn mực báo cáo hiện hành yêu cầu mỗi mục tiêu phải có tối thiểu hai thước đo",
          "Vì chỉ số đối trọng thường dễ thu thập dữ liệu hơn so với chỉ số chính được chọn ra",
        ],
        correct: 1,
        explanation:
          "Đo tốc độ xử lý hồ sơ mà không đo tỷ lệ hồ sơ phải làm lại thì sẽ nhanh lên thật, nhưng bằng cách làm ẩu. Cặp chỉ số buộc phải cải thiện đồng thời khó lách hơn nhiều.",
      },
      {
        question: "Chỉ số dẫn báo khác chỉ số kết quả ở chỗ nào?",
        options: [
          "Chỉ số dẫn báo được tính bằng dữ liệu dự báo, còn chỉ số kết quả dùng dữ liệu thực tế",
          "Chỉ số dẫn báo thay đổi trước và còn can thiệp kịp, chỉ số kết quả chỉ xác nhận việc đã rồi",
          "Chỉ số dẫn báo dành cho ban lãnh đạo, còn chỉ số kết quả dành cho các bộ phận vận hành",
          "Chỉ số dẫn báo được đo hằng ngày, trong khi chỉ số kết quả luôn được đo theo từng quý",
        ],
        correct: 1,
        explanation:
          "Doanh thu quý là chỉ số kết quả: khi biết thì đã hết quý. Số cuộc hẹn khách hàng trong tuần là chỉ số dẫn báo cho chính doanh thu đó, và còn kịp điều chỉnh.",
      },
    
    {
      "question": "Định luật Goodhart cảnh báo điều gì về việc dùng chỉ số làm mục tiêu?",
      "options": [
        "Khi một thước đo thành mục tiêu, nó thôi là thước đo tốt",
        "Chỉ số đo càng chính xác thì càng khó thu thập dữ liệu để tính",
        "Mọi chỉ số đều mất dần ý nghĩa theo thời gian và phải thay mới",
        "Chỉ số tổng hợp luôn che giấu biến động của các thành phần bên trong"
      ],
      "correct": 0,
      "explanation": "Khi tiền thưởng gắn vào một con số, người ta tối ưu chính con số đó chứ không tối ưu điều nó đại diện. Đây là lý do mỗi chỉ số chính nên có một chỉ số đối trọng: đẩy số cuộc gọi thì phải nhìn cả tỷ lệ khách quay lại."
    }
    ],
    keyTakeaways: [
      "Phép thử: nếu chỉ số này xấu đi, ai làm gì khác? Không trả lời được thì đừng đo",
      "Chỉ số chỉ đi một hướng là chỉ số phù phiếm - cái đáng đo là phần lên xuống được",
      "Định luật Goodhart: chỉ số thành mục tiêu thì thôi làm thước đo tốt",
      "Luôn đi kèm chỉ số đối trọng để chặn việc tối ưu bằng cách hy sinh thứ khác",
      "Chỉ số dẫn báo còn can thiệp kịp, chỉ số kết quả chỉ xác nhận việc đã rồi",
    ],
    practicePrompt: {
      question:
        "Bộ phận chăm sóc khách hàng được giao chỉ tiêu giảm thời gian xử lý trung bình mỗi cuộc gọi. Rủi ro lớn nhất là gì?",
      options: [
        "Nhân viên sẽ phải làm việc quá sức và tăng tỷ lệ nghỉ việc",
        "Nhân viên kết thúc cuộc gọi sớm khi vấn đề chưa được giải quyết, khiến khách phải gọi lại",
        "Chi phí hệ thống tổng đài sẽ tăng lên",
        "Dữ liệu thời gian gọi khó đo chính xác",
      ],
      correct: 1,
      explanation:
        "Đây là Goodhart trong thực tế: chỉ tiêu đạt được, thời gian trung bình giảm thật, nhưng tổng số cuộc gọi tăng lên vì cùng một vấn đề bị gọi lại nhiều lần. Chỉ số đối trọng cần thiết ở đây là tỷ lệ giải quyết ngay trong lần gọi đầu tiên - hai chỉ số này phải cải thiện cùng nhau thì mới thật.",
    },
    summary: {
      keyIdea: "Chỉ số tốt là chỉ số mà khi nó xấu đi, có người biết phải làm gì",
      commonMistake: "Chọn chỉ số vì dễ đo và trông đẹp, thay vì vì nó dẫn tới hành động",
      action: "Với mỗi chỉ số đang theo dõi, viết một câu: nếu nó giảm 20%, ai sẽ làm gì trong tuần tới?",
    },
    application: {
      title: "Việc cần làm",
      message:
        "Lấy bộ chỉ số của phòng ban bạn và phân loại từng cái theo hai trục: nó lên xuống được hay chỉ đi một hướng, và nó dẫn báo hay chỉ xác nhận kết quả. Những chỉ số nằm ở góc chỉ đi một hướng và chỉ xác nhận kết quả là ứng viên nên bỏ.",
      secondary: "Sau đó, với mỗi chỉ số còn lại, hỏi thêm: nếu tôi muốn gian lận con số này, tôi sẽ làm thế nào?",
    },
    sections: [
      {
        type: "lead",
        text: "Mọi kỹ thuật ở chặng trước đều giả định bạn đã biết mình cần đo cái gì. Nhưng chọn đo cái gì mới là quyết định quan trọng nhất, và nó được đưa ra trước khi bất kỳ dòng code nào được viết.",
      },
      {
        type: "heading",
        text: "Bốn câu hỏi sàng lọc một chỉ số",
      },
      {
        type: "conceptTable",
        title: "Bộ câu hỏi trước khi chấp nhận một chỉ số",
        subtitle: "Trượt bất kỳ câu nào cũng đủ để cân nhắc lại",
        concepts: [
          { vi: "Thay đổi được không", en: "Actionable", def: "Chỉ số phải lên xuống được theo hành động của ai đó. Tổng tích lũy từ trước tới nay chỉ đi một hướng, nên không mang tín hiệu." },
          { vi: "Ai chịu trách nhiệm", en: "Ownership", def: "Một chỉ số không thuộc về ai sẽ không ai theo dõi. Không có chủ thì dù đẹp đến đâu nó cũng chỉ nằm trên báo cáo." },
          { vi: "Dẫn báo hay kết quả", en: "Leading vs lagging", def: "Chỉ số dẫn báo thay đổi trước và còn kịp can thiệp. Chỉ số kết quả chỉ xác nhận điều đã xảy ra. Cần cả hai, nhưng đừng nhầm vai trò." },
          { vi: "Bị lách thế nào", en: "Gaming risk", def: "Hỏi trước khi gắn thưởng phạt. Người ta luôn tối ưu đúng cái được đo, kể cả khi cách đó phá hỏng mục tiêu thật." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Chỉ số phù phiếm",
          text: "Tổng người dùng tích lũy, tổng lượt xem, tổng số hồ sơ đã tiếp nhận. Luôn tăng, luôn đẹp trên slide, và không ai đổi hành vi khi nhìn chúng.",
        },
        right: {
          label: "Chỉ số dẫn tới hành động",
          text: "Tỷ lệ khách quay lại trong 30 ngày, số ngày thu tiền bình quân, tỷ lệ hồ sơ phải làm lại. Lên xuống được, có chủ, và khi xấu đi thì có việc phải làm.",
        },
      },
      {
        type: "callout",
        label: "Cặp chỉ số đối trọng",
        text: "Gần như mọi chỉ số đơn lẻ đều lách được. Cách phòng thủ đơn giản nhất là ghép cặp: tốc độ đi cùng chất lượng, tăng trưởng đi cùng tỷ lệ rời bỏ, doanh số đi cùng tỷ lệ hoàn trả. Khi hai chỉ số buộc phải cải thiện đồng thời, phần lớn đường tắt bị chặn lại.",
      },
      {
        type: "closing",
        lines: [
          "Không phép tính nào cứu được việc đo sai thứ. Quyết định này đến trước mọi công cụ.",
          "Bài sau nói về cách một con số trung bình có thể che giấu toàn bộ sự thật.",
        ],
      },
      {
        type: "formula",
        title: "Thay số để tách chỉ số thật khỏi chỉ số làm đẹp",
        equation: "Chỉ số thật gắn với tiền: Doanh thu trên mỗi người dùng hoạt động = Doanh thu ÷ Số người dùng THỰC SỰ dùng",
        example: {
                title: "Một ứng dụng khoe 'một triệu người dùng'",
                calculation: "Đăng ký tích luỹ 1.000.000 · người dùng hoạt động tháng 40.000 · trả phí 3.000 · doanh thu tháng 300 triệu",
                result: "Doanh thu trên mỗi lượt đăng ký = 300đ · trên mỗi người hoạt động = 7.500đ · trên mỗi người trả phí = 100.000đ",
                explanation: "Cùng một doanh nghiệp, ba con số cách nhau hơn 300 lần, và chỉ con số đầu tiên được đưa lên trang chủ. Đăng ký tích luỹ là chỉ số làm đẹp vì nó chỉ tăng, không bao giờ giảm - nó không phản ứng với bất cứ điều gì xảy ra sau đó. Chỉ số đáng theo là chỉ số có thể ĐI XUỐNG khi doanh nghiệp làm dở."
        }
}
    ],
  },
  {
    id: 1502,
    slug: "phan-tich-cohort-va-cai-bay-trung-binh",
    title: "Tư duy DL, Bài 2: Phân tích cohort - khi số trung bình che mất sự thật",
    subtitle: "Vì sao chia dữ liệu theo nhóm thời điểm lại lộ ra những xu hướng mà tổng thể giấu kín",
    duration: "11 phút",
    difficulty: "Trung bình",
    emoji: "👥",
    track: "professional",
    whyItMatters:
      "Một chỉ số tổng thể đi ngang có thể đang che giấu hai xu hướng ngược chiều triệt tiêu lẫn nhau. Phân tích cohort là công cụ đơn giản nhất để nhìn thấy điều đó, và nó thường lật ngược kết luận rút ra từ con số trung bình.",
    openingQuestion:
      "Tỷ lệ khách hàng quay lại của công ty giữ nguyên 40% suốt một năm. Điều này có nghĩa là tình hình ổn định?",
    openingOptions: [
      "Đúng, con số không đổi nghĩa là chất lượng dịch vụ được duy trì",
      "Không chắc: nhóm cũ tốt lên trong khi nhóm mới xấu đi",
      "Đúng, vì tỷ lệ đã được tính trên toàn bộ khách hàng",
      "Không, tỷ lệ 40% luôn là mức thấp đáng báo động",
    ],
    correctOption: 1,
    explanation:
      "Đây là tình huống nguy hiểm nhất trong phân tích: chỉ số tổng thể đứng yên vì hai lực ngược chiều đang cân bằng. Nếu khách hàng cũ ngày càng gắn bó còn khách mới ngày càng rời sớm, con số trung bình vẫn là 40% cho tới thời điểm nhóm cũ không còn đủ để bù, rồi chỉ số sụt rất nhanh và không ai kịp hiểu vì sao. Chia theo cohort - tức theo tháng khách hàng bắt đầu - làm lộ ra điều này ngay từ đầu.",
    diagram: [
      { label: "Chia theo tháng gia nhập", arrow: true },
      { label: "Theo dõi từng nhóm qua thời gian", arrow: true },
      { label: "So sánh các nhóm ở cùng độ tuổi", arrow: true },
      { label: "Nhóm mới tốt hơn hay xấu hơn?" },
    ],
    realWorldExample: {
      company: "Ứng dụng tài chính và cái bẫy tăng trưởng che lấp",
      description:
        "Một ứng dụng tăng trưởng người dùng nhanh, tỷ lệ hoạt động hằng tháng trên tổng người dùng giữ ổn định, ban lãnh đạo yên tâm. Khi chia theo cohort, bức tranh khác hẳn: nhóm gia nhập tháng 1 còn 45% hoạt động sau sáu tháng, nhóm tháng 6 chỉ còn 22% ở cùng mốc sáu tháng. Chất lượng người dùng mới đang giảm đều, nhưng vì số lượng người mới tăng nhanh nên tỷ lệ tổng thể vẫn đẹp. Đó là một khoản nợ tích lũy: khi tốc độ tăng trưởng chậm lại, toàn bộ vấn đề hiện ra cùng lúc.",
    },
    quiz: [
      {
        question: "Cohort trong phân tích dữ liệu là gì?",
        options: [
          "Nhóm đối tượng được chia ngẫu nhiên nhằm so sánh hiệu quả giữa hai phương án khác nhau hoàn toàn",
          "Nhóm đối tượng cùng bắt đầu tại một thời điểm, được theo dõi song song qua thời gian",
          "Nhóm đối tượng có giá trị giao dịch nằm trong cùng một khoảng được xác định trước",
          "Nhóm đối tượng thuộc cùng một khu vực địa lý hoặc cùng một kênh bán hàng nhất định",
        ],
        correct: 1,
        explanation:
          "Điểm mấu chốt là cùng thời điểm bắt đầu. Nhờ vậy mới so sánh được các nhóm ở cùng độ tuổi, thay vì so nhóm sáu tháng tuổi với nhóm một tháng tuổi.",
      },
      {
        question: "Vì sao phải so sánh các cohort ở cùng độ tuổi thay vì cùng thời điểm lịch?",
        options: [
          "Vì dữ liệu ở các thời điểm lịch khác nhau thường được thu thập bằng phương pháp khác nhau",
          "Vì nhóm mới gia nhập luôn có tỷ lệ hoạt động cao hơn, nên so cùng thời điểm là so lệch",
          "Vì các thời điểm lịch khác nhau chịu ảnh hưởng của những mức lạm phát không giống nhau",
          "Vì số lượng thành viên trong mỗi nhóm thay đổi liên tục nên không thể so sánh trực tiếp",
        ],
        correct: 1,
        explanation:
          "So sánh phải công bằng: nhóm ba tháng tuổi so với nhóm ba tháng tuổi. So ở cùng thời điểm lịch sẽ khiến nhóm vừa gia nhập luôn trông tốt hơn một cách giả tạo.",
      },
      {
        question: "Chỉ số tổng thể đi ngang trong khi cohort mới xấu dần nghĩa là gì?",
        options: [
          "Chất lượng nhóm mới đang giảm nhưng bị che bởi nhóm cũ, và vấn đề sẽ lộ ra khi tăng trưởng chậm lại",
          "Dữ liệu đang có lỗi vì hai kết quả này về mặt toán học không thể cùng xảy ra được",
          "Nhóm khách hàng cũ đang rời bỏ nhanh hơn so với tốc độ gia nhập của nhóm khách mới",
          "Cách phân chia cohort theo tháng gia nhập đã được chọn với độ phân giải quá thô",
        ],
        correct: 0,
        explanation:
          "Đây là dạng nợ tích lũy điển hình. Chừng nào lượng người mới còn tăng nhanh thì con số tổng vẫn đẹp; khi tăng trưởng chững lại, mọi thứ hiện ra cùng lúc.",
      },
      {
        question: "Ngoài thời điểm gia nhập, còn có thể chia cohort theo tiêu chí nào?",
        options: [
          "Theo kênh thu hút khách, để biết kênh nào mang về khách gắn bó lâu hơn các kênh còn lại",
          "Theo thứ tự bảng chữ cái của tên khách hàng, nhằm bảo đảm tính ngẫu nhiên cho từng nhóm một",
          "Theo số lượng thành viên sao cho các nhóm có quy mô hoàn toàn bằng nhau khi so sánh",
          "Theo mức độ hoàn thiện của dữ liệu, ưu tiên những nhóm có ít giá trị bị thiếu nhất",
        ],
        correct: 0,
        explanation:
          "Cohort theo kênh thu hút là một trong những phân tích có giá trị nhất về chi phí marketing: kênh rẻ nhất thường mang về nhóm khách rời bỏ sớm nhất.",
      },
    
    {
      "question": "Vì sao chỉ số giữ chân trung bình đứng yên vẫn có thể che giấu một vấn đề nghiêm trọng?",
      "options": [
        "Vì nhóm cũ cải thiện có thể đang bù cho nhóm mới rời bỏ nhanh hơn",
        "Vì giá trị trung bình luôn chậm hơn thực tế một vài kỳ báo cáo",
        "Vì chỉ số này không tính những khách hàng đã rời đi hoàn toàn",
        "Vì mỗi bộ phận tính giữ chân một kiểu"
      ],
      "correct": 0,
      "explanation": "Hai lực ngược chiều cân bằng nhau tạo ra một đường phẳng, và đường phẳng thì không ai đặt câu hỏi. Tách theo nhóm khách hàng theo thời điểm gia nhập là cách duy nhất thấy được điều đó - trước khi nhóm cũ không còn đủ lớn để che nữa."
    }
    ],
    keyTakeaways: [
      "Cohort là nhóm cùng thời điểm bắt đầu, theo dõi song song qua thời gian",
      "Luôn so sánh các cohort ở cùng độ tuổi, không phải cùng thời điểm lịch",
      "Chỉ số tổng đi ngang có thể đang che hai xu hướng ngược chiều triệt tiêu nhau",
      "Cohort xấu dần là nợ tích lũy: nó chỉ lộ ra khi tăng trưởng chậm lại",
      "Chia cohort theo kênh thu hút cho biết kênh nào mang về khách thật sự gắn bó",
    ],
    practicePrompt: {
      question:
        "Doanh thu trung bình trên mỗi khách hàng của công ty giảm dần, nhưng không nhóm khách hàng nào chi tiêu ít đi. Giải thích khả dĩ nhất?",
      options: [
        "Dữ liệu doanh thu đang bị ghi nhận thiếu ở một số chi nhánh",
        "Tỷ trọng khách hàng chi tiêu thấp trong tổng số đang tăng lên, kéo giá trị trung bình xuống",
        "Lạm phát làm giảm giá trị thực của doanh thu",
        "Khách hàng cũ đang rời bỏ hàng loạt",
      ],
      correct: 1,
      explanation:
        "Đây là nghịch lý Simpson dưới dạng hay gặp nhất: mỗi nhóm đều giữ nguyên hoặc tốt lên, nhưng tỷ trọng giữa các nhóm thay đổi nên số tổng hợp đi ngược. Một chiến dịch thu hút khách giá rẻ thành công có thể kéo doanh thu trung bình xuống trong khi không có gì xấu đi cả - và phản ứng đúng là nhìn từng nhóm, không phải hoảng lên vì con số trung bình.",
    },
    summary: {
      keyIdea: "Chia dữ liệu theo nhóm thời điểm bắt đầu để thấy điều mà số trung bình che đi",
      commonMistake: "Kết luận từ chỉ số tổng thể mà không kiểm tra cơ cấu bên dưới có đang đổi không",
      action: "Với mỗi chỉ số tổng thể quan trọng, hãy dựng thêm một bảng cohort theo tháng - thường mất một buổi và đổi hẳn cách hiểu.",
    },
    application: {
      title: "Việc cần làm",
      message:
        "Lấy dữ liệu khách hàng và dựng một bảng cohort: dòng là tháng gia nhập, cột là số tháng kể từ khi gia nhập, ô là tỷ lệ còn hoạt động. Đọc bảng theo cột để so các nhóm ở cùng độ tuổi - đó là chiều cho biết mọi thứ đang tốt lên hay xấu đi.",
      secondary: "Nếu các con số trong cùng một cột giảm dần khi đi xuống, chất lượng khách mới đang xấu đi.",
    },
    sections: [
      {
        type: "lead",
        text: "Giá trị trung bình là công cụ tóm tắt tiện lợi và cũng là công cụ che giấu hiệu quả. Nó gộp mọi thứ thành một con số, và trong quá trình gộp, phần lớn thông tin thú vị biến mất.",
      },
      {
        type: "heading",
        text: "Bảng cohort đọc theo hai chiều",
      },
      {
        type: "conceptTable",
        title: "Cách đọc một bảng cohort",
        subtitle: "Cùng một bảng, hai chiều đọc trả lời hai câu hỏi khác nhau",
        concepts: [
          { vi: "Đọc theo dòng", en: "Trong một nhóm", def: "Theo dõi một cohort qua thời gian: nhóm gia nhập tháng 3 rơi rụng thế nào qua từng tháng. Cho biết hình dạng vòng đời khách hàng." },
          { vi: "Đọc theo cột", en: "Giữa các nhóm", def: "So các cohort ở cùng độ tuổi: nhóm tháng 3 và nhóm tháng 9 sau ba tháng thì bên nào tốt hơn. Đây là chiều cho biết xu hướng." },
          { vi: "Đường chéo", en: "Cùng thời điểm lịch", def: "Các ô nằm trên một đường chéo cùng thuộc một tháng lịch. Hữu ích khi muốn tách ảnh hưởng của một sự kiện chung như đổi giá hay đổi sản phẩm." },
        ],
      },
      {
        type: "callout",
        label: "Nghịch lý Simpson",
        text: "Có những trường hợp mọi nhóm con đều cải thiện nhưng số tổng hợp lại xấu đi, chỉ vì tỷ trọng giữa các nhóm thay đổi. Đây không phải lỗi tính toán mà là tính chất thật của dữ liệu gộp. Hệ quả thực tế: khi một chỉ số tổng hợp chuyển động bất thường, việc đầu tiên phải kiểm tra là cơ cấu bên dưới có đổi không - trước khi đi tìm nguyên nhân trong bản thân từng nhóm.",
      },
      {
        type: "heading",
        text: "Mọi nhóm đều tốt lên, tổng thể xấu đi"
      },
      {
        type: "paragraph",
        text: "Năm thứ nhất có hai nhóm khách: nhóm đến từ giới thiệu, 100 người, tỷ lệ ở lại 50%; nhóm đến từ quảng cáo, 100 người, tỷ lệ ở lại 20%. Tỷ lệ chung là 35%. Năm thứ hai, cả hai nhóm đều làm tốt hơn: giới thiệu lên 55%, quảng cáo lên 25%. Nhưng công ty đẩy mạnh chi quảng cáo nên cơ cấu đổi - 50 người từ giới thiệu và 250 người từ quảng cáo. Tỷ lệ chung năm hai là (50×55% + 250×25%)/300 = 30%. Cả hai nhóm cùng cải thiện, con số tổng vẫn giảm từ 35% xuống 30%."
      },
      {
        type: "callout",
        label: "Không có gì sai trong phép tính - sai ở câu hỏi",
        text: "Con số 30% trả lời đúng câu hỏi khách hàng của tôi năm nay ở lại bao nhiêu phần trăm. Nó không trả lời câu hỏi sản phẩm của tôi có giữ chân tốt hơn năm ngoái không, và đó mới là câu người ta thực sự muốn hỏi khi nhìn vào nó. Đây là nghịch lý Simpson, và bài học vận hành rút ra rất cụ thể: một chỉ số tổng hợp đang xấu đi mà mọi nhóm con đều tốt lên thì vấn đề nằm ở CƠ CẤU, không nằm ở chất lượng - và cách xử lý là xem lại kênh thu hút khách, không phải xem lại sản phẩm."
      },
      {
        type: "comparison",
        left: {
          label: "Đọc bảng cohort theo hàng",
          text: "Một nhóm khách cụ thể thay đổi ra sao qua thời gian: tháng đầu bao nhiêu phần trăm ở lại, tháng thứ ba, tháng thứ sáu. Đây là đường cong giữ chân, và nó cho biết sản phẩm hoạt động thế nào với một nhóm người cố định."
        },
        right: {
          label: "Đọc bảng cohort theo cột",
          text: "So các nhóm gia nhập ở những thời điểm khác nhau tại cùng độ tuổi: nhóm tháng 1 ở tháng thứ ba so với nhóm tháng 6 ở tháng thứ ba. Đây là chiều cho biết sản phẩm hay chất lượng khách đang tốt lên hay xấu đi - và là chiều mà số trung bình không bao giờ hiện ra được."
        }
      },
      {
        type: "closing",
        lines: [
          "Trước khi tin một con số trung bình, hãy hỏi nó đang trung bình trên những nhóm nào.",
          "Bài sau nói về cách so sánh hai phương án mà không tự lừa mình: thử nghiệm A/B.",
        ],
      },
    ],
  },
  {
    id: 1503,
    slug: "ab-testing-va-y-nghia-thong-ke",
    title: "Tư duy DL, Bài 3: Thử nghiệm A/B - và vì sao dừng sớm là cách tự lừa mình phổ biến nhất",
    subtitle: "Nhóm đối chứng, cỡ mẫu, ý nghĩa thống kê, và những cái bẫy khiến kết quả trông thuyết phục nhưng sai",
    duration: "12 phút",
    difficulty: "Khó",
    emoji: "🔬",
    track: "professional",
    whyItMatters:
      "Thử nghiệm có đối chứng là cách đáng tin cậy nhất để biết một thay đổi có thực sự gây ra kết quả hay không - mọi phương pháp khác đều chỉ cho thấy tương quan. Nhưng thiết kế sai hoặc đọc kết quả sai sẽ cho ra những kết luận tự tin mà không đúng, và điều đó tệ hơn là không thử nghiệm gì.",
    openingQuestion:
      "Đang chạy thử nghiệm A/B, sau ba ngày nhóm B đã vượt nhóm A rõ rệt. Nên dừng và triển khai luôn?",
    openingOptions: [
      "Nên, vì kết quả đã rõ ràng nên kéo dài thêm chỉ tốn chi phí",
      "Không nên: dừng sớm làm tăng xác suất kết luận sai",
      "Nên, nếu chênh lệch vượt quá 10%",
      "Không nên, vì thử nghiệm luôn phải chạy tối thiểu ba tháng",
    ],
    correctOption: 1,
    explanation:
      "Trong những ngày đầu, chênh lệch giữa hai nhóm dao động rất mạnh do mẫu còn nhỏ. Nếu bạn liên tục nhìn kết quả và dừng ngay khi thấy đẹp, bạn gần như chắc chắn sẽ bắt được một dao động ngẫu nhiên và tưởng đó là hiệu ứng thật. Đây gọi là peeking, và nó có thể đẩy tỷ lệ kết luận sai từ mức 5% dự kiến lên trên 30%. Cách phòng duy nhất là tính cỡ mẫu cần thiết trước khi bắt đầu, rồi chạy đủ và chỉ kết luận một lần.",
    diagram: [
      { label: "Đặt giả thuyết và chỉ số chính", arrow: true },
      { label: "Tính cỡ mẫu cần trước khi chạy", arrow: true },
      { label: "Chia nhóm ngẫu nhiên, chạy đủ thời gian", arrow: true },
      { label: "Kết luận một lần, không nhìn giữa chừng" },
    ],
    interactiveType: "regression",
    realWorldExample: {
      company: "Thử nghiệm giao diện đăng ký của một ứng dụng tài chính",
      description:
        "Một đội sản phẩm thử nghiệm rút gọn biểu mẫu đăng ký từ tám trường xuống bốn trường. Sau bốn ngày, tỷ lệ hoàn tất đăng ký của phiên bản mới cao hơn 18% và cả đội chuẩn bị triển khai. Cỡ mẫu tính trước đó yêu cầu chạy hai tuần. Đến ngày thứ mười bốn, chênh lệch còn 3% và không đạt ngưỡng ý nghĩa thống kê. Thay đổi vẫn được giữ vì có lý do khác, nhưng con số 18% - nếu được báo cáo lên - sẽ trở thành cơ sở cho những kỳ vọng không bao giờ thành hiện thực.",
    },
    quiz: [
      {
        question: "Vai trò của nhóm đối chứng trong một thử nghiệm là gì?",
        options: [
          "Cung cấp mốc so sánh cho biết điều gì sẽ xảy ra nếu không thực hiện thay đổi nào cả",
          "Tăng tổng cỡ mẫu của thử nghiệm lên nhằm cải thiện độ tin cậy của kết quả cuối cùng",
          "Dự phòng trong trường hợp nhóm thử nghiệm gặp sự cố kỹ thuật giữa chừng phải dừng lại",
          "Xác nhận rằng dữ liệu đang được thu thập một cách chính xác ở cả hai phía của thử nghiệm",
        ],
        correct: 0,
        explanation:
          "Không có nhóm đối chứng thì không tách được ảnh hưởng của thay đổi khỏi mọi thứ khác đang diễn ra cùng lúc: mùa vụ, chiến dịch quảng cáo, biến động thị trường.",
      },
      {
        question: "Vì sao phải tính cỡ mẫu trước khi bắt đầu chạy thử nghiệm?",
        options: [
          "Để ước tính trước tổng chi phí vận hành mà thử nghiệm sẽ tiêu tốn trong suốt thời gian chạy",
          "Để biết cần bao nhiêu quan sát mới phát hiện được hiệu ứng, và tránh dừng tùy hứng giữa chừng",
          "Để đảm bảo hai nhóm thử nghiệm có số lượng thành viên bằng nhau tuyệt đối khi phân chia",
          "Để hệ thống phân bổ người dùng vào các nhóm một cách ngẫu nhiên và không bị thiên lệch",
        ],
        correct: 1,
        explanation:
          "Cỡ mẫu tính trước biến điểm dừng thành một cam kết thay vì một lựa chọn. Đó chính là thứ chặn được việc dừng đúng lúc số liệu đang có lợi cho mình.",
      },
      {
        question: "Giá trị p bằng 0,03 có nghĩa là gì?",
        options: [
          "Xác suất phương án B thực sự tốt hơn phương án A là 97% theo kết quả thử nghiệm này",
          "Nếu hai phương án thực sự như nhau, xác suất thấy chênh lệch lớn thế này là 3%",
          "Phương án B mang lại kết quả tốt hơn phương án A khoảng 3% xét trên toàn bộ mẫu",
          "Có 3% dữ liệu trong thử nghiệm bị lỗi hoặc thiếu nên cần được loại bỏ trước khi kết luận",
        ],
        correct: 1,
        explanation:
          "Đây là hiểu lầm phổ biến nhất về giá trị p. Nó nói về xác suất của dữ liệu khi giả định hai bên như nhau, không nói về xác suất giả thuyết nào đúng.",
      },
      {
        question: "Vì sao chạy nhiều thử nghiệm cùng lúc lại làm tăng nguy cơ kết luận sai?",
        options: [
          "Vì các thử nghiệm chạy song song sẽ chia sẻ cùng một nhóm đối chứng nên kết quả bị lẫn",
          "Vì càng so sánh nhiều lần thì xác suất có ít nhất một kết quả đẹp do ngẫu nhiên càng cao",
          "Vì hệ thống không đủ khả năng phân bổ người dùng ngẫu nhiên cho quá nhiều nhóm cùng lúc",
          "Vì cỡ mẫu cần thiết cho mỗi thử nghiệm sẽ tăng lên theo cấp số nhân khi chạy song song",
        ],
        correct: 1,
        explanation:
          "Với ngưỡng 5%, cứ hai mươi phép so sánh trên dữ liệu hoàn toàn ngẫu nhiên thì trung bình có một cái đạt ý nghĩa. Thử đủ nhiều thì luôn tìm được thứ trông như phát hiện.",
      },
    
    {
      "question": "Vì sao nhìn kết quả thử nghiệm mỗi ngày rồi dừng khi thấy đẹp lại là cách tự lừa mình?",
      "options": [
        "Vì mỗi lần nhìn là một cơ hội bắt trúng dao động ngẫu nhiên",
        "Vì dữ liệu những ngày đầu chưa được hệ thống ghi nhận đầy đủ",
        "Vì việc dừng sớm làm nhóm đối chứng có ít người tham gia hơn nhóm thử nghiệm",
        "Vì thử nghiệm phải chạy đủ một chu kỳ tuần"
      ],
      "correct": 0,
      "explanation": "Mẫu nhỏ dao động rất mạnh, nên nếu bạn kiểm tra hai chục lần thì gần như chắc chắn có lúc chênh lệch trông có ý nghĩa. Dừng đúng lúc đó biến nhiễu thành kết luận - đây là lý do cỡ mẫu và thời điểm dừng phải quyết định trước khi chạy."
    }
    ],
    keyTakeaways: [
      "Nhóm đối chứng là thứ tách ảnh hưởng của thay đổi khỏi mọi biến động khác cùng thời điểm",
      "Tính cỡ mẫu trước khi chạy, và coi điểm dừng là cam kết chứ không phải lựa chọn",
      "Nhìn kết quả giữa chừng rồi dừng khi đẹp có thể đẩy tỷ lệ sai từ 5% lên trên 30%",
      "Giá trị p nói về xác suất của dữ liệu, không phải xác suất giả thuyết đúng",
      "Càng so sánh nhiều lần càng dễ bắt được một kết quả đẹp thuần túy do ngẫu nhiên",
    ],
    practicePrompt: {
      question:
        "Thử nghiệm chạy đủ cỡ mẫu, kết quả cho thấy nhóm B tốt hơn 0,4% với p = 0,04. Kết luận phù hợp là gì?",
      options: [
        "Triển khai ngay vì kết quả đã đạt ý nghĩa thống kê",
        "Đạt ý nghĩa thống kê nhưng cần hỏi tiếp: mức 0,4% có đáng với chi phí triển khai không",
        "Bác bỏ vì chênh lệch quá nhỏ",
        "Chạy lại thử nghiệm với cỡ mẫu lớn hơn",
      ],
      correct: 1,
      explanation:
        "Ý nghĩa thống kê và ý nghĩa thực tiễn là hai chuyện khác nhau, và nhầm lẫn giữa chúng là lỗi phổ biến sau khi người ta đã học đúng phần thống kê. Với cỡ mẫu đủ lớn, gần như mọi chênh lệch đều đạt ý nghĩa thống kê. Câu hỏi kinh doanh vẫn là: 0,4% quy ra bao nhiêu tiền, và chi phí triển khai cùng rủi ro vận hành là bao nhiêu.",
    },
    summary: {
      keyIdea: "Thiết kế thử nghiệm trước khi chạy, và kết luận đúng một lần theo kế hoạch đã đặt",
      commonMistake: "Nhìn kết quả mỗi ngày và dừng ngay khi con số có lợi cho giả thuyết của mình",
      action: "Trước mỗi thử nghiệm, viết ra ba thứ: chỉ số chính, cỡ mẫu cần, và ngày dừng. Rồi không sửa chúng nữa.",
    },
    application: {
      title: "Việc cần làm",
      message:
        "Chọn một thay đổi mà công ty bạn từng triển khai dựa trên cảm nhận. Thiết kế lại nó thành một thử nghiệm: chỉ số chính là gì, nhóm đối chứng là ai, cần bao nhiêu quan sát, và mức cải thiện tối thiểu bao nhiêu thì mới đáng triển khai.",
      secondary: "Câu hỏi cuối cùng - mức cải thiện tối thiểu đáng triển khai - là câu ít được hỏi nhất và quan trọng nhất.",
    },
    sections: [
      {
        type: "lead",
        text: "Chặng Định lượng đã dựng nền về kiểm định giả thuyết và bẫy p-hacking trong backtest. Bài này áp dụng đúng bộ khái niệm đó vào tình huống mà bạn gặp thường xuyên hơn nhiều: so sánh hai phương án kinh doanh.",
      },
      {
        type: "heading",
        text: "Bốn bước của một thử nghiệm đáng tin",
      },
      {
        type: "list",
        items: [
          "Viết giả thuyết cụ thể và chọn đúng một chỉ số chính - nhiều chỉ số chính nghĩa là không có chỉ số nào chính",
          "Tính cỡ mẫu cần thiết dựa trên mức cải thiện tối thiểu mà bạn quan tâm",
          "Chia nhóm ngẫu nhiên và chạy đủ thời gian đã định, kể cả khi số liệu giữa chừng trông hấp dẫn",
          "Kết luận một lần theo kế hoạch, và báo cáo cả trường hợp không có khác biệt",
        ],
      },
      {
        type: "conceptTable",
        title: "Ba cái bẫy khiến kết quả sai mà trông thuyết phục",
        subtitle: "Cả ba đều xảy ra khi phép tính hoàn toàn đúng",
        concepts: [
          { vi: "Nhìn giữa chừng", en: "Peeking", def: "Liên tục kiểm tra và dừng khi thấy kết quả đẹp. Biến ngưỡng sai 5% thành trên 30% mà không ai nhận ra." },
          { vi: "So sánh nhiều lần", en: "Multiple comparisons", def: "Thử hai mươi biến thể hoặc cắt lát dữ liệu theo hai mươi cách thì trung bình có một cái đạt ý nghĩa thuần do ngẫu nhiên." },
          { vi: "Đổi chỉ số sau khi thấy dữ liệu", en: "Outcome switching", def: "Chỉ số chính không đạt nên chuyển sang báo cáo một chỉ số phụ có kết quả đẹp. Rất phổ biến và rất khó phát hiện từ bên ngoài." },
        ],
      },
      {
        type: "callout",
        label: "Ý nghĩa thống kê không phải ý nghĩa kinh doanh",
        text: "Với cỡ mẫu đủ lớn, hầu như mọi chênh lệch dù nhỏ đến đâu cũng sẽ đạt ý nghĩa thống kê. Điều đó chỉ nói rằng chênh lệch nhiều khả năng có thật, không nói rằng nó đáng để làm gì. Luôn quy đổi mức cải thiện ra tiền và đặt cạnh chi phí triển khai trước khi quyết định.",
      },
      {
        type: "closing",
        lines: [
          "Một thử nghiệm được thiết kế trước và báo cáo trung thực có giá trị hơn mười thử nghiệm tìm kiếm kết quả đẹp.",
          "Bài sau đi vào cái bẫy nền tảng nhất: nhầm tương quan với nhân quả.",
        ],
      },
    ],
  },
  {
    id: 1504,
    slug: "tuong-quan-khong-phai-nhan-qua",
    title: "Tư duy DL, Bài 4: Tương quan không phải nhân quả - và ba cách bị đánh lừa",
    subtitle: "Biến gây nhiễu, nhân quả ngược, thiên lệch sống sót: ba cơ chế khiến số liệu thật dẫn tới kết luận sai",
    duration: "11 phút",
    difficulty: "Khó",
    emoji: "🔗",
    track: "professional",
    whyItMatters:
      "Câu tương quan không phải nhân quả ai cũng thuộc, nhưng vẫn liên tục bị vi phạm trong thực tế, vì trong tình huống cụ thể mối quan hệ nhân quả trông rất hiển nhiên. Biết tên ba cơ chế đánh lừa phổ biến giúp bạn nhận ra chúng đúng lúc, thay vì chỉ nhớ câu khẩu hiệu.",
    openingQuestion:
      "Dữ liệu cho thấy khách hàng dùng ứng dụng di động của ngân hàng có số dư cao hơn hẳn. Kết luận nào hợp lý?",
    openingOptions: [
      "Nên đẩy mạnh cài đặt ứng dụng vì nó làm tăng số dư của khách hàng",
      "Chưa kết luận được: khách số dư cao vốn đã khác",
      "Ứng dụng di động là kênh sinh lời tốt nhất của ngân hàng",
      "Cần thiết kế lại ứng dụng để phục vụ khách hàng số dư thấp",
    ],
    correctOption: 1,
    explanation:
      "Đây là nhân quả ngược ở dạng kinh điển. Nhiều khả năng là khách hàng có tài sản lớn và giao dịch thường xuyên thì tự nhiên dùng ứng dụng nhiều hơn, chứ không phải ứng dụng làm họ giàu lên. Cũng có thể có một biến gây nhiễu đứng sau cả hai: người trẻ có thu nhập cao vừa thích công nghệ vừa tích lũy nhanh. Cách duy nhất tách bạch được là một thử nghiệm có đối chứng, hoặc ít nhất là so sánh cùng một khách hàng trước và sau khi cài ứng dụng.",
    diagram: [
      { label: "A và B đi cùng nhau", arrow: true },
      { label: "A gây ra B? B gây ra A?", arrow: true },
      { label: "Hay C gây ra cả hai?", arrow: true },
      { label: "Hay chỉ là cách chọn mẫu?" },
    ],
    interactiveType: "regression",
    realWorldExample: {
      company: "Thiên lệch sống sót trong dữ liệu quỹ đầu tư",
      description:
        "Khi thống kê hiệu suất trung bình của các quỹ đầu tư đang hoạt động, kết quả thường vượt trội so với chỉ số thị trường. Lý do không phải các quỹ giỏi hơn: những quỹ hoạt động kém đã bị đóng hoặc sáp nhập và biến khỏi cơ sở dữ liệu. Mẫu còn lại chỉ gồm bên sống sót. Đây là lý do các nhà cung cấp dữ liệu nghiêm túc phải duy trì riêng bộ dữ liệu có cả quỹ đã chấm dứt, và chênh lệch giữa hai cách tính thường lên tới hơn một điểm phần trăm mỗi năm.",
    },
    quiz: [
      {
        question: "Biến gây nhiễu là gì?",
        options: [
          "Một biến số có giá trị dao động mạnh khiến kết quả phân tích trở nên kém ổn định hơn",
          "Một yếu tố thứ ba tác động lên cả hai biến đang xét, tạo ra tương quan giữa chúng",
          "Một biến số bị thiếu quá nhiều giá trị nên phải loại khỏi mô hình trước khi phân tích",
          "Một biến được đo bằng đơn vị khác với các biến còn lại trong cùng một tập dữ liệu",
        ],
        correct: 1,
        explanation:
          "Ví dụ kinh điển: doanh số kem và số vụ đuối nước tương quan chặt, nhưng nhiệt độ mới là thứ gây ra cả hai. Không có kem nào làm ai đuối nước cả.",
      },
      {
        question: "Thiên lệch sống sót xuất hiện khi nào?",
        options: [
          "Khi mẫu chỉ còn lại những đối tượng đã vượt qua một quá trình sàng lọc nào đó trước đó",
          "Khi dữ liệu được thu thập trong một khoảng thời gian quá ngắn để phản ánh đúng xu hướng",
          "Khi cỡ mẫu quá nhỏ nên kết quả thống kê không đạt được mức ý nghĩa cần thiết",
          "Khi người thu thập dữ liệu vô tình ưu tiên ghi nhận các trường hợp có kết quả tích cực",
        ],
        correct: 0,
        explanation:
          "Phần bị mất khỏi mẫu mới là phần mang thông tin. Nghiên cứu các công ty thành công để tìm bí quyết sẽ vô nghĩa nếu các công ty thất bại cũng làm đúng những việc ấy.",
      },
      {
        question: "Cách đáng tin cậy nhất để xác lập quan hệ nhân quả là gì?",
        options: [
          "Thu thập thêm dữ liệu quan sát cho tới khi hệ số tương quan giữa hai biến đủ lớn",
          "Thử nghiệm có đối chứng với việc phân nhóm ngẫu nhiên giữa nhóm thử và nhóm đối chứng",
          "Đưa thêm nhiều biến kiểm soát vào mô hình hồi quy cho đến khi hệ số trở nên ổn định",
          "Kiểm tra xem biến nguyên nhân có luôn xảy ra trước biến kết quả về mặt thời gian không",
        ],
        correct: 1,
        explanation:
          "Phân nhóm ngẫu nhiên là thứ cân bằng mọi biến gây nhiễu, kể cả những biến bạn chưa nghĩ tới. Đó là lý do nó đứng cao hơn mọi phương pháp quan sát.",
      },
      {
        question: "Vì sao thứ tự thời gian không đủ để chứng minh nhân quả?",
        options: [
          "Vì thời điểm ghi nhận trong dữ liệu thường không trùng với thời điểm sự việc thực sự xảy ra",
          "Vì một biến gây nhiễu vẫn có thể tác động lên hai biến ở hai thời điểm khác nhau",
          "Vì trong nhiều hệ thống kinh tế thì kết quả có thể xuất hiện trước nguyên nhân của nó",
          "Vì dữ liệu chuỗi thời gian luôn chứa yếu tố mùa vụ làm sai lệch thứ tự các sự kiện",
        ],
        correct: 1,
        explanation:
          "Thứ tự thời gian là điều kiện cần nhưng không đủ. Quảng cáo chạy trước khi doanh số tăng, nhưng mùa mua sắm có thể là thứ đứng sau cả hai.",
      },
    
    {
      "question": "Vì sao việc A xảy ra trước B vẫn chưa đủ để kết luận A gây ra B?",
      "options": [
        "Vì một nguyên nhân thứ ba có thể tác động lên cả hai theo thứ tự đó",
        "Vì khoảng cách thời gian giữa hai sự kiện thường không đo được chính xác",
        "Vì quan hệ nhân quả chỉ tồn tại khi hai sự kiện xảy ra đồng thời",
        "Vì cần lặp lại ba lần mới xác lập được"
      ],
      "correct": 0,
      "explanation": "Thứ tự thời gian là điều kiện cần chứ không phải điều kiện đủ. Doanh số kem tăng trước số vụ đuối nước, nhưng mùa hè mới là nguyên nhân của cả hai - và nó xuất hiện trước cả hai đúng theo thứ tự bạn quan sát."
    }
    ],
    keyTakeaways: [
      "Biến gây nhiễu: một yếu tố thứ ba tạo ra tương quan giữa hai biến không liên quan nhân quả",
      "Nhân quả ngược: chiều tác động đi ngược lại điều bạn giả định",
      "Thiên lệch sống sót: phần biến mất khỏi mẫu mới là phần mang thông tin",
      "Phân nhóm ngẫu nhiên cân bằng cả những biến gây nhiễu bạn chưa nghĩ tới",
      "Thứ tự thời gian là điều kiện cần nhưng không đủ để kết luận nhân quả",
    ],
    practicePrompt: {
      question:
        "Nghiên cứu cho thấy nhân viên tham gia khóa đào tạo nội bộ có tỷ lệ thăng tiến cao hơn hẳn. Điều gì cần kiểm tra trước khi kết luận khóa đào tạo hiệu quả?",
      options: [
        "Số lượng nhân viên tham gia đã đủ lớn để có ý nghĩa thống kê chưa",
        "Ai được chọn tham gia: nếu quản lý chọn sẵn người có triển vọng thì kết quả đã bị định trước",
        "Nội dung khóa đào tạo có phù hợp với công việc thực tế không",
        "Chi phí đào tạo trên mỗi nhân viên là bao nhiêu",
      ],
      correct: 1,
      explanation:
        "Đây là thiên lệch chọn mẫu, và nó là biến gây nhiễu mạnh nhất trong hầu hết các đánh giá chương trình nội bộ. Nếu quản lý cử những người họ vốn đã đánh giá cao đi học, thì nhóm tham gia sẽ thăng tiến nhiều hơn dù khóa học không dạy gì cả. Cách kiểm chứng đúng là chọn ngẫu nhiên trong số những người cùng đủ điều kiện.",
    },
    summary: {
      keyIdea: "Trước khi kết luận A gây ra B, hãy loại trừ chiều ngược lại, biến thứ ba và cách chọn mẫu",
      commonMistake: "Thuộc lòng câu tương quan không phải nhân quả nhưng vẫn kết luận nhân quả khi nó trông hiển nhiên",
      action: "Mỗi lần thấy hai biến đi cùng nhau, viết ra ba lời giải thích thay thế trước khi chấp nhận lời giải thích đầu tiên.",
    },
    application: {
      title: "Việc cần làm",
      message:
        "Tìm một kết luận nhân quả trong báo cáo nội bộ hoặc bài báo tài chính gần đây. Với kết luận đó, thử trả lời: chiều ngược lại có hợp lý không, có biến thứ ba nào giải thích được cả hai không, và mẫu dữ liệu đã bị sàng lọc bởi cái gì trước khi đến tay người phân tích.",
      secondary: "Câu hỏi thứ ba là câu ít người hỏi nhất và thường cho ra phát hiện lớn nhất.",
    },
    sections: [
      {
        type: "lead",
        text: "Đây là bài mà ai cũng nghĩ mình đã biết. Vấn đề là trong một tình huống cụ thể, với dữ liệu thật và một cơ chế nghe rất hợp lý, mối quan hệ nhân quả gần như luôn trông hiển nhiên - và đó chính là lúc người ta sai.",
      },
      {
        type: "heading",
        text: "Ba cơ chế đánh lừa phổ biến",
      },
      {
        type: "conceptTable",
        title: "Khi tương quan không phải nhân quả",
        subtitle: "Ba cơ chế này giải thích phần lớn các kết luận nhân quả sai trong phân tích kinh doanh",
        concepts: [
          { vi: "Biến gây nhiễu", en: "Confounding", def: "Một yếu tố thứ ba tác động lên cả hai biến. Doanh số kem và số vụ đuối nước tương quan chặt vì nhiệt độ đứng sau cả hai." },
          { vi: "Nhân quả ngược", en: "Reverse causality", def: "Chiều tác động đi ngược điều bạn giả định. Khách giàu dùng ứng dụng nhiều, chứ không phải ứng dụng làm khách giàu lên." },
          { vi: "Thiên lệch sống sót", en: "Survivorship bias", def: "Mẫu chỉ còn bên sống sót. Hiệu suất trung bình của quỹ đang hoạt động đẹp hơn thực tế vì quỹ kém đã đóng cửa và biến mất khỏi dữ liệu." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Bằng chứng yếu",
          text: "Hai biến tương quan trong dữ liệu quan sát. Có một cơ chế nghe hợp lý giải thích được. Kết quả lặp lại ở nhiều kỳ. Tất cả những điều này vẫn tương thích với cả ba cơ chế đánh lừa ở trên.",
        },
        right: {
          label: "Bằng chứng mạnh",
          text: "Phân nhóm ngẫu nhiên có đối chứng. Hoặc một biến động ngoại sinh mà không ai chọn được - thay đổi chính sách, sự kiện tự nhiên - tác động lên một nhóm mà không tác động lên nhóm còn lại.",
        },
      },
      {
        type: "callout",
        label: "Khi không thể thử nghiệm",
        text: "Rất nhiều câu hỏi kinh doanh không cho phép phân nhóm ngẫu nhiên: không thể chọn ngẫu nhiên nửa số khách hàng để tăng giá. Trong những trường hợp đó, cách trung thực nhất là nêu rõ kết luận mang tính tương quan, liệt kê các lời giải thích thay thế chưa loại trừ được, và tránh dùng những động từ ngụ ý nhân quả như thúc đẩy hay làm tăng.",
      },
      {
        type: "closing",
        lines: [
          "Kỷ luật ở đây không nằm ở phép tính, mà ở việc chịu khó liệt kê những cách giải thích mình không thích.",
          "Bài sau chuyển từ việc tìm ra kết luận sang việc làm cho nó được nghe: kể chuyện bằng dữ liệu.",
        ],
      },
    ],
  },
  {
    id: 1505,
    slug: "ke-chuyen-bang-du-lieu",
    title: "Tư duy DL, Bài 5: Kể chuyện bằng dữ liệu - từ bảng số tới một quyết định",
    subtitle: "Cấu trúc một bản trình bày phân tích, và vì sao kết luận phải nằm ở slide đầu chứ không phải slide cuối",
    duration: "11 phút",
    difficulty: "Trung bình",
    emoji: "🗣️",
    track: "professional",
    whyItMatters:
      "Một phân tích đúng mà không ai hành động theo thì không tạo ra giá trị nào. Phần lớn người làm dữ liệu đầu tư gần hết công sức vào việc tìm ra câu trả lời và gần như không đầu tư gì vào việc làm cho câu trả lời đó được nghe và được tin.",
    openingQuestion:
      "Trình bày kết quả phân tích cho ban lãnh đạo, nên bắt đầu từ đâu?",
    openingOptions: [
      "Từ phương pháp và nguồn dữ liệu, để người nghe tin vào độ tin cậy trước",
      "Từ kết luận và khuyến nghị, rồi mới đến bằng chứng",
      "Từ biểu đồ ấn tượng nhất để thu hút sự chú ý",
      "Từ bối cảnh thị trường chung rồi thu hẹp dần",
    ],
    correctOption: 1,
    explanation:
      "Trình tự dựng bài phân tích và trình tự trình bày nó là hai thứ khác nhau, và nhầm lẫn giữa chúng là lỗi phổ biến nhất. Bạn làm việc theo trình tự dữ liệu rồi phương pháp rồi kết luận, nên có xu hướng kể lại đúng thứ tự đó. Nhưng người nghe cần biết kết luận trước để có khung tiếp nhận mọi thứ phía sau. Trong nhiều cuộc họp, bạn chỉ thực sự có ba phút - và nếu ba phút đó dành cho phương pháp thì kết luận sẽ không bao giờ được nghe.",
    diagram: [
      { label: "Kết luận và khuyến nghị", arrow: true },
      { label: "Ba bằng chứng chính", arrow: true },
      { label: "Giới hạn và rủi ro", arrow: true },
      { label: "Phụ lục cho người muốn đào sâu" },
    ],
    realWorldExample: {
      company: "Hai cách trình bày cùng một phân tích công nợ",
      description:
        "Cách thứ nhất: mười lăm slide bắt đầu bằng nguồn dữ liệu, phương pháp làm sạch, các biểu đồ phân bố, rồi đến slide cuối mới có khuyến nghị. Cuộc họp hết giờ ở slide thứ chín. Cách thứ hai: slide đầu ghi một câu - đề xuất siết hạn mức với nhóm khách hàng có số ngày quá hạn trên 60, ước tính giảm 12 tỷ nợ xấu mỗi năm. Ba slide tiếp theo là bằng chứng. Phần phương pháp chuyển thành phụ lục. Quyết định được đưa ra trong hai mươi phút.",
    },
    quiz: [
      {
        question: "Vì sao nên đặt kết luận ở đầu bản trình bày?",
        options: [
          "Vì người nghe cần một khung để hiểu và đánh giá mọi bằng chứng được đưa ra phía sau",
          "Vì phần kết luận thường ngắn gọn nên phù hợp để mở đầu một buổi trình bày dài",
          "Vì các bằng chứng chi tiết sẽ khiến người nghe mất tập trung nếu đưa ra ngay từ đầu",
          "Vì cách sắp xếp này giúp rút ngắn tổng số slide cần chuẩn bị cho buổi họp xuống",
        ],
        correct: 0,
        explanation:
          "Không có kết luận dẫn đường, người nghe phải tự đoán mỗi con số đang phục vụ lập luận nào. Đó là gánh nặng không cần thiết và thường dẫn tới hiểu sai.",
      },
      {
        question: "Vì sao nên nêu rõ giới hạn của phân tích thay vì giấu đi?",
        options: [
          "Vì các chuẩn mực nghề nghiệp bắt buộc mọi báo cáo phân tích phải có phần nêu giới hạn",
          "Vì người nghe sẽ tìm ra chúng, và tự nêu trước làm tăng độ tin cậy của phần còn lại",
          "Vì phần giới hạn giúp kéo dài bản trình bày khi lượng bằng chứng còn khá mỏng",
          "Vì việc nêu giới hạn cho phép người phân tích tránh trách nhiệm nếu kết luận về sau sai",
        ],
        correct: 1,
        explanation:
          "Người nghe có kinh nghiệm luôn tìm điểm yếu. Nếu họ tìm ra một điểm bạn không nhắc tới, mọi thứ còn lại lập tức bị nghi ngờ theo.",
      },
      {
        question: "Một slide nên chứa bao nhiêu thông điệp chính?",
        options: [
          "Đúng một, và tiêu đề slide nên chính là thông điệp đó thay vì tên của loại biểu đồ",
          "Từ ba đến năm, để tận dụng hết diện tích trình bày và giảm tổng số slide phải chuẩn bị",
          "Càng nhiều càng tốt, miễn là mỗi thông điệp đều có số liệu cụ thể đi kèm chứng minh",
          "Không có quy tắc, vì điều này hoàn toàn phụ thuộc vào thói quen của từng tổ chức",
        ],
        correct: 0,
        explanation:
          "Đặt tiêu đề là thông điệp thay vì mô tả biểu đồ là thay đổi nhỏ nhưng hiệu quả nhất. Người lướt qua bộ slide chỉ đọc tiêu đề, và như vậy họ vẫn nhận đủ lập luận.",
      },
      {
        question: "Khi khuyến nghị đi ngược mong đợi của người nghe, nên làm gì?",
        options: [
          "Làm nhẹ kết luận đi để tránh đối đầu trực tiếp với quan điểm sẵn có của người nghe",
          "Nêu rõ kết luận, đồng thời trình bày cả bằng chứng ủng hộ quan điểm cũ và lý do nó chưa đủ",
          "Trình bày toàn bộ số liệu thô và để người nghe tự rút ra kết luận của riêng họ",
          "Hoãn buổi trình bày lại cho tới khi thu thập được thêm dữ liệu ủng hộ kết luận mới",
        ],
        correct: 1,
        explanation:
          "Cho thấy bạn đã thực sự cân nhắc quan điểm của họ là điều kiện để kết luận được lắng nghe. Bỏ qua lập luận đối lập khiến người nghe cho rằng bạn chưa xét tới nó.",
      },
    
    {
      "question": "Khuyến nghị của bạn đi ngược mong đợi của người nghe. Cách trình bày phù hợp là gì?",
      "options": [
        "Nêu trước bằng chứng mạnh nhất rồi mới đưa ra khuyến nghị",
        "Đưa khuyến nghị ngay từ đầu như mọi bản trình bày khác",
        "Trình bày cả hai phương án và để người nghe tự chọn",
        "Gửi tài liệu trước để họ chuẩn bị tâm lý"
      ],
      "correct": 0,
      "explanation": "Kết luận đặt trước là quy tắc chung, nhưng nó có ngoại lệ: khi người nghe đã có sẵn niềm tin ngược lại, nói kết luận trước sẽ kích hoạt phản bác trước khi họ nghe bằng chứng. Dựng bằng chứng trước để họ tự đi tới kết luận cùng bạn."
    }
    ],
    keyTakeaways: [
      "Trình tự dựng phân tích khác trình tự trình bày - đừng kể lại theo thứ tự bạn đã làm",
      "Kết luận và khuyến nghị đứng đầu, phương pháp chuyển xuống phụ lục",
      "Tiêu đề slide là thông điệp, không phải tên biểu đồ",
      "Tự nêu giới hạn trước khi người nghe tìm ra chúng",
      "Trình bày cả lập luận đối lập, đặc biệt khi kết luận đi ngược mong đợi",
    ],
    practicePrompt: {
      question:
        "Bạn có 30 giây trong thang máy để báo cáo kết quả phân tích cho giám đốc. Nên nói gì?",
      options: [
        "Mô tả phương pháp và nguồn dữ liệu đã dùng để đảm bảo tính tin cậy",
        "Một câu kết luận kèm con số tác động, và một câu về việc cần quyết định gì",
        "Đề nghị sắp xếp một buổi họp riêng để trình bày đầy đủ",
        "Kể lại phát hiện bất ngờ nhất trong quá trình phân tích",
      ],
      correct: 1,
      explanation:
        "Bài kiểm tra thang máy là cách tốt nhất để biết bạn đã thực sự hiểu kết quả của mình hay chưa. Nếu không nén được thành hai câu, thường là vì bạn chưa xác định rõ đâu là điều quan trọng nhất. Câu thứ hai - cần quyết định gì - là câu biến một thông tin thành một hành động.",
    },
    summary: {
      keyIdea: "Người nghe cần kết luận trước để có khung tiếp nhận bằng chứng phía sau",
      commonMistake: "Kể lại phân tích theo đúng trình tự đã làm, để kết luận ở slide cuối cùng",
      action: "Viết kết luận thành một câu duy nhất trước khi làm slide. Không viết được nghĩa là chưa xong phân tích.",
    },
    application: {
      title: "Việc cần làm",
      message:
        "Lấy một báo cáo bạn từng làm và viết lại thành bốn phần: một câu kết luận kèm con số, ba bằng chứng chính, phần giới hạn, và phụ lục. So sánh với bản gốc xem phần nào thực sự cần thiết.",
      secondary: "Sau đó đổi tiêu đề mọi biểu đồ từ tên loại biểu đồ thành thông điệp mà biểu đồ đó chứng minh.",
    },
    sections: [
      {
        type: "lead",
        text: "Phần lớn công sức của người làm dữ liệu đổ vào việc tìm ra câu trả lời đúng. Nhưng giá trị chỉ xuất hiện ở bước cuối cùng: khi ai đó thay đổi quyết định vì kết quả của bạn.",
      },
      {
        type: "heading",
        text: "Cấu trúc kim tự tháp ngược",
      },
      {
        type: "conceptTable",
        title: "Bốn tầng của một bản trình bày phân tích",
        subtitle: "Xếp theo thứ tự trình bày, ngược với thứ tự bạn đã làm việc",
        concepts: [
          { vi: "Kết luận", en: "Answer first", def: "Một câu, có con số, có khuyến nghị hành động. Đây là thứ duy nhất chắc chắn được nghe nếu cuộc họp bị cắt ngắn." },
          { vi: "Bằng chứng", en: "Evidence", def: "Ba điểm tựa chính, mỗi điểm một slide, tiêu đề là thông điệp chứ không phải tên biểu đồ. Ba là con số vừa đủ để nhớ." },
          { vi: "Giới hạn", en: "Caveats", def: "Điều phân tích này không trả lời được, và giả định nào đang chống đỡ kết luận. Tự nêu ra sẽ mạnh hơn nhiều so với bị hỏi." },
          { vi: "Phụ lục", en: "Appendix", def: "Phương pháp, nguồn dữ liệu, các cách cắt lát khác. Dành cho người muốn kiểm chứng - và phải có, vì sẽ có người hỏi." },
        ],
      },
      {
        type: "callout",
        label: "Tiêu đề là thông điệp",
        text: "Đổi tiêu đề slide từ Doanh thu theo quý thành Doanh thu quý 4 giảm 8% do nhóm khách hàng doanh nghiệp là thay đổi nhỏ nhất mang lại hiệu quả lớn nhất. Lý do đơn giản: rất nhiều người chỉ lướt qua bộ slide và đọc mỗi tiêu đề. Nếu các tiêu đề ghép lại thành một lập luận hoàn chỉnh, họ vẫn nhận được toàn bộ nội dung mà không cần bạn đứng đó giải thích.",
      },
      {
        type: "comparison",
        left: {
          label: "Trình bày yếu",
          text: "Bắt đầu từ phương pháp. Tiêu đề slide mô tả loại biểu đồ. Mọi phát hiện được nêu ngang hàng nhau. Không nói gì về giới hạn. Kết thúc bằng câu cần phân tích thêm.",
        },
        right: {
          label: "Trình bày mạnh",
          text: "Kết luận ở slide đầu kèm con số tác động. Ba bằng chứng có thứ bậc rõ. Nêu trước giới hạn và giả định. Kết thúc bằng một đề xuất cụ thể cần được quyết định.",
        },
      },
      {
        type: "closing",
        lines: [
          "Phân tích không được hành động theo thì về mặt kết quả không khác gì phân tích chưa từng làm.",
          "Bài cuối chặng nói về trách nhiệm đi kèm: đạo đức và rủi ro khi làm việc với dữ liệu.",
        ],
      },
    ],
  },
  {
    id: 1506,
    slug: "dao-duc-du-lieu-va-thien-lech-thuat-toan",
    title: "Tư duy DL, Bài 6: Đạo đức dữ liệu - quyền riêng tư, thiên lệch và trách nhiệm giải trình",
    subtitle: "Vì sao một mô hình chấm điểm tín dụng có thể phân biệt đối xử mà không dùng bất kỳ dữ liệu nhạy cảm nào",
    duration: "11 phút",
    difficulty: "Trung bình",
    emoji: "⚖️",
    track: "professional",
    whyItMatters:
      "Trong tài chính, mô hình dữ liệu quyết định ai được vay, ai bị từ chối, ai bị đánh dấu là rủi ro. Sai sót ở đây không dừng ở một con số lệch - nó ảnh hưởng trực tiếp tới người thật, và thường ảnh hưởng nặng nhất lên nhóm vốn đã yếu thế.",
    openingQuestion:
      "Một mô hình chấm điểm tín dụng không hề dùng giới tính làm biến đầu vào. Nó có thể phân biệt đối xử theo giới không?",
    openingOptions: [
      "Không, vì biến giới tính đã bị loại khỏi mô hình",
      "Có, vì các biến khác có thể tương quan với giới tính",
      "Không, trừ khi người xây mô hình cố tình can thiệp",
      "Có, nhưng chỉ khi dữ liệu huấn luyện quá nhỏ",
    ],
    correctOption: 1,
    explanation:
      "Loại bỏ biến nhạy cảm là bước cần thiết nhưng hoàn toàn không đủ. Ngành nghề, lịch sử gián đoạn công việc, khu vực cư trú hay thậm chí thói quen chi tiêu đều có thể tương quan mạnh với giới tính hoặc dân tộc, và mô hình sẽ học được đúng ranh giới đó thông qua chúng. Hiện tượng này gọi là biến thay thế, và cách duy nhất phát hiện là đo kết quả đầu ra theo từng nhóm - chứ không phải kiểm tra danh sách biến đầu vào.",
    diagram: [
      { label: "Dữ liệu lịch sử có thiên lệch không?", arrow: true },
      { label: "Biến nào đang thay thế biến nhạy cảm?", arrow: true },
      { label: "Đo kết quả theo từng nhóm", arrow: true },
      { label: "Giải thích được quyết định không?" },
    ],
    realWorldExample: {
      company: "Mô hình duyệt hồ sơ học từ dữ liệu lịch sử",
      description:
        "Một mô hình được huấn luyện trên các quyết định duyệt hồ sơ trong quá khứ sẽ học lại chính những thiên lệch đã có trong các quyết định đó. Nếu trước đây một nhóm khách hàng bị từ chối nhiều hơn vì định kiến của người thẩm định, mô hình sẽ thấy nhóm đó có tỷ lệ được duyệt thấp và tái tạo lại đúng khuôn mẫu ấy - lần này ở quy mô lớn hơn, nhanh hơn, và khoác vẻ khách quan của một con số. Mô hình không phát minh ra thiên lệch, nó chỉ tự động hóa cái đã có.",
    },
    quiz: [
      {
        question: "Biến thay thế trong mô hình là gì?",
        options: [
          "Một biến được dùng tạm khi biến chính bị thiếu quá nhiều giá trị trong tập dữ liệu",
          "Một biến tưởng như trung tính nhưng tương quan chặt với một đặc điểm nhạy cảm",
          "Một biến được tạo ra bằng cách kết hợp nhiều biến gốc để giảm số chiều của dữ liệu",
          "Một biến chỉ xuất hiện trong tập kiểm tra mà không có mặt trong tập dữ liệu huấn luyện",
        ],
        correct: 1,
        explanation:
          "Mã bưu chính là ví dụ kinh điển: hoàn toàn trung tính trên giấy tờ, nhưng ở nhiều nơi nó gần như xác định được thành phần dân cư của khu vực.",
      },
      {
        question: "Vì sao mô hình học từ dữ liệu lịch sử có thể tái tạo lại bất công trong quá khứ?",
        options: [
          "Vì dữ liệu lịch sử thường được lưu trữ ở định dạng cũ nên chứa nhiều lỗi kỹ thuật hơn",
          "Vì mô hình học các khuôn mẫu trong quyết định cũ, kể cả những khuôn mẫu đến từ định kiến",
          "Vì dữ liệu càng cũ thì độ chính xác của các trường thông tin trong đó càng giảm dần đi",
          "Vì các quy định pháp lý áp dụng ở thời điểm thu thập dữ liệu khác với quy định hiện nay",
        ],
        correct: 1,
        explanation:
          "Mô hình không phân biệt được khuôn mẫu nào phản ánh rủi ro thật và khuôn mẫu nào phản ánh định kiến của người ra quyết định trước đây. Nó học cả hai như nhau.",
      },
      {
        question: "Cách kiểm tra thiên lệch đáng tin cậy nhất là gì?",
        options: [
          "Rà soát danh sách biến đầu vào để chắc chắn không còn biến nhạy cảm nào sót lại",
          "Đo tỷ lệ chấp thuận và tỷ lệ sai của mô hình riêng cho từng nhóm dân cư quan tâm",
          "Tăng kích thước tập dữ liệu huấn luyện cho tới khi các nhóm đều có đủ số quan sát",
          "Chọn thuật toán đơn giản hơn vì mô hình càng phức tạp thì càng khó kiểm soát thiên lệch",
        ],
        correct: 1,
        explanation:
          "Thiên lệch nằm ở kết quả đầu ra, không nằm ở danh sách biến. Chỉ có đo theo nhóm mới phát hiện được, và đó cũng là thứ cơ quan quản lý sẽ hỏi.",
      },
      {
        question: "Vì sao khả năng giải thích quyết định lại quan trọng trong tài chính?",
        options: [
          "Vì mô hình giải thích được thường có độ chính xác dự báo cao hơn mô hình phức tạp",
          "Vì khách hàng bị từ chối có quyền được biết lý do, và tổ chức phải trả lời được",
          "Vì mô hình giải thích được sẽ chạy nhanh hơn khi triển khai trên hệ thống thực tế",
          "Vì các thư viện học máy hiện nay chỉ hỗ trợ diễn giải cho một số loại mô hình nhất định",
        ],
        correct: 1,
        explanation:
          "Đây là yêu cầu pháp lý ở nhiều thị trường và là yêu cầu đạo đức ở mọi nơi. Câu trả lời mô hình quyết định vậy không phải một lời giải thích chấp nhận được.",
      },
    
    {
      "question": "Vì sao bỏ biến giới tính khỏi mô hình chấm điểm tín dụng vẫn chưa loại được thiên lệch giới?",
      "options": [
        "Vì nhiều biến còn lại tương quan mạnh với giới tính và thay thế cho nó",
        "Vì mô hình vẫn lưu lại thông tin giới tính từ các lần huấn luyện trước",
        "Vì dữ liệu lịch sử luôn phải có biến giới tính để kiểm tra tính hợp lệ",
        "Vì quy định buộc theo dõi kết quả theo giới"
      ],
      "correct": 0,
      "explanation": "Ngành nghề, quãng gián đoạn công việc, thậm chí thói quen chi tiêu đều có thể vẽ lại đường ranh giới mà bạn vừa xóa. Cách kiểm tra duy nhất đáng tin là đo tỷ lệ chấp thuận và tỷ lệ sai theo từng nhóm ở đầu ra, chứ không rà lại danh sách biến đầu vào."
    }
    ],
    keyTakeaways: [
      "Loại bỏ biến nhạy cảm là cần nhưng không đủ - biến thay thế vẫn mang thông tin đó vào mô hình",
      "Mô hình học từ quyết định cũ sẽ tự động hóa cả những định kiến trong các quyết định đó",
      "Thiên lệch phải đo ở kết quả đầu ra theo từng nhóm, không phải kiểm tra danh sách biến",
      "Người bị từ chối có quyền biết lý do - mô hình quyết định vậy không phải lời giải thích",
      "Thu thập tối thiểu: dữ liệu không thu thập là dữ liệu không thể bị rò rỉ",
    ],
    practicePrompt: {
      question:
        "Mô hình mới có độ chính xác tổng thể cao hơn mô hình cũ, nhưng tỷ lệ từ chối nhầm ở nhóm khách hàng thu nhập thấp tăng gấp đôi. Nên làm gì?",
      options: [
        "Triển khai vì độ chính xác tổng thể đã tốt hơn",
        "Xem đây là vấn đề phải xử lý trước khi triển khai, vì chi phí sai lệch không chia đều cho các nhóm",
        "Giữ mô hình cũ vì mô hình mới có lỗi kỹ thuật",
        "Bổ sung thêm dữ liệu về nhóm thu nhập thấp rồi triển khai ngay",
      ],
      correct: 1,
      explanation:
        "Độ chính xác tổng thể là một giá trị trung bình, và như bài cohort đã chỉ ra, trung bình che giấu cơ cấu bên dưới. Một mô hình tốt lên ở nhóm đa số nhưng xấu đi ở nhóm thiểu số vẫn có thể cho ra con số tổng đẹp hơn. Câu hỏi phải trả lời là ai gánh chi phí của sai sót, chứ không phải sai sót trung bình là bao nhiêu.",
    },
    summary: {
      keyIdea: "Thiên lệch nằm ở kết quả đầu ra theo từng nhóm, không nằm ở danh sách biến đầu vào",
      commonMistake: "Cho rằng bỏ biến nhạy cảm ra khỏi mô hình là đã xử lý xong vấn đề phân biệt đối xử",
      action: "Với mỗi mô hình đang dùng, đo tỷ lệ chấp thuận và tỷ lệ sai riêng cho từng nhóm khách hàng chính.",
    },
    application: {
      title: "Việc cần làm",
      message:
        "Chọn một quy trình ra quyết định tự động trong tổ chức bạn và trả lời bốn câu: dữ liệu huấn luyện đến từ những quyết định nào trong quá khứ, biến nào có thể đang thay thế cho một đặc điểm nhạy cảm, kết quả khác nhau thế nào giữa các nhóm, và một khách hàng bị từ chối sẽ được giải thích ra sao.",
      secondary: "Nếu câu cuối không có câu trả lời, ba câu đầu chưa quan trọng bằng.",
    },
    sections: [
      {
        type: "lead",
        text: "Chặng này kết thúc ở phần ít được dạy nhất và có hậu quả thật nhất. Trong tài chính, mô hình dữ liệu không dừng ở việc mô tả thế giới - nó quyết định ai được vay tiền và ai không.",
      },
      {
        type: "heading",
        text: "Ba trách nhiệm khi làm việc với dữ liệu",
      },
      {
        type: "conceptTable",
        title: "Những gì phải kiểm tra trước khi một mô hình được dùng thật",
        subtitle: "Ba nhóm này bao phủ phần lớn rủi ro đạo đức trong ứng dụng dữ liệu ở tài chính",
        concepts: [
          { vi: "Quyền riêng tư", en: "Privacy", def: "Nguyên tắc thu thập tối thiểu: chỉ lấy dữ liệu thực sự cần cho mục đích đã nêu. Dữ liệu không thu thập là dữ liệu không thể bị rò rỉ." },
          { vi: "Thiên lệch", en: "Fairness", def: "Đo kết quả theo từng nhóm, không chỉ đo độ chính xác tổng thể. Một mô hình tốt lên ở nhóm đa số có thể đang xấu đi ở nhóm thiểu số." },
          { vi: "Giải trình được", en: "Explainability", def: "Phải trả lời được vì sao một hồ sơ cụ thể bị từ chối. Đây vừa là yêu cầu pháp lý ở nhiều thị trường vừa là điều kiện để sửa được mô hình khi nó sai." },
        ],
      },
      {
        type: "callout",
        label: "Vì sao bỏ biến nhạy cảm là chưa đủ",
        text: "Một mô hình không dùng giới tính vẫn có thể học được ranh giới giới tính thông qua ngành nghề, thời gian gián đoạn công việc hoặc thói quen chi tiêu. Một mô hình không dùng dân tộc vẫn có thể học được nó qua mã bưu chính. Đây không phải lỗi lập trình mà là hệ quả tự nhiên của việc dữ liệu xã hội vốn đan xen nhau. Kiểm tra danh sách biến đầu vào cho cảm giác an toàn nhưng không phát hiện được gì; chỉ có đo kết quả theo nhóm mới phát hiện được.",
      },
      {
        type: "closing",
        lines: [
          "Con số không trung lập. Nó mang theo cách thu thập, cách chọn mẫu và những quyết định trong quá khứ đã tạo ra nó.",
          "Hai chặng này khép lại phần dữ liệu: có công cụ để tìm câu trả lời, và có kỷ luật để câu trả lời đó đáng tin.",
        ],
      },
    ],
  },
];
