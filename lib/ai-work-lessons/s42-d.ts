import type { Lesson } from "../lesson-types";

// Chặng 42, bài 16-20. Giáo trình: scripts/curriculum/stage-42.json.
// Không nêu tính năng, giá hay điều khoản cụ thể của công cụ nào: bài dạy cách hỏi
// và cách kiểm, phần điều khoản người học tự đọc bản chính thức còn hiệu lực.
export const S42_D_LESSONS: Lesson[] = [
  {
    id: 2255,
    slug: "goi-ca-nhan-hay-goi-doanh-nghiep-cau-hoi-can-hoi",
    title: "Chặng 42, Bài 16: Gói cá nhân hay gói doanh nghiệp: những câu cần hỏi trước khi trả tiền",
    subtitle: "Trước khi so giá, hãy có sẵn một tờ giấy ghi những câu hỏi mà nhà cung cấp phải trả lời bằng văn bản.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🧾",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Sếp bảo tìm công cụ AI cho cả phòng. Nếu bạn chỉ so giá thì dễ chọn nhầm: rẻ mà dữ liệu công ty nằm ở đâu không ai biết, hoặc mỗi người một tài khoản riêng nên nghỉ việc là mất hết. Bài này cho bạn danh sách câu hỏi để đưa nhà cung cấp và phòng IT.",
    openingQuestion:
      "Sếp bảo: 'Cả phòng mình dùng thử công cụ AI đi, em tìm giúp một gói'. Việc đầu tiên nên làm là gì?",
    openingOptions: [
      "Lập danh sách câu hỏi về dữ liệu, quyền truy cập và người quản trị để hỏi trước",
      "Chọn gói rẻ nhất để đỡ tốn ngân sách, không hợp thì đổi gói sau",
      "Cho mỗi người tự đăng ký gói cá nhân bằng email riêng cho nhanh gọn",
      "Chọn công cụ được nhiều người khen nhất trên mạng rồi mua ngay",
    ],
    correctOption: 0,
    explanation:
      "Giá là câu hỏi cuối, không phải câu hỏi đầu. Điều quyết định gói có hợp hay không là: dữ liệu công ty đi đâu, ai được vào, ai quản trị tài khoản khi có người nghỉ việc. Chọn gói rẻ nhất dễ dẫn tới thiếu những thứ đó và phải mua lại. Mỗi người một tài khoản riêng khiến công ty không nhìn thấy gì. Lời khen trên mạng nói về trải nghiệm cá nhân, không nói về yêu cầu của một phòng ban.",
    diagram: [
      { label: "Viết ra việc cả phòng định dùng AI để làm", arrow: true },
      { label: "Lập câu hỏi: dữ liệu, quyền truy cập, người quản trị", arrow: true },
      { label: "Gửi nhà cung cấp và phòng IT, xin trả lời bằng văn bản", arrow: true },
      { label: "So câu trả lời với nhau, rồi mới xét giá" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một phòng kinh doanh 8 người, mỗi người tự đăng ký một tài khoản cá nhân và dán bảng giá khách hàng vào để soạn thư. Khi một bạn nghỉ việc, cả lịch sử làm việc nằm trong tài khoản riêng của bạn ấy, công ty không xoá được cũng không lấy lại được. Trưởng phòng mới lập danh sách câu hỏi và gửi phòng IT trước khi chọn gói cho cả nhóm.",
    },
    quiz: [
      {
        question: "Vì sao không nên để mỗi người trong phòng tự đăng ký gói cá nhân bằng email riêng?",
        options: [
          "Công ty không biết ai dán dữ liệu gì vào đâu, và không thu lại được khi người đó nghỉ việc",
          "Vì gói cá nhân luôn chạy chậm hơn gói doanh nghiệp khi nhiều người dùng",
          "Vì mỗi email chỉ được tạo một tài khoản duy nhất",
          "Vì gói cá nhân không cho dùng cho việc soạn văn bản",
        ],
        correct: 0,
        explanation:
          "Tài khoản riêng nằm ngoài tầm nhìn của công ty: không ai kiểm được dữ liệu nào đã được dán vào và không có cách thu hồi khi nhân viên rời đi. Tốc độ không phải lý do, việc một email có thể đăng ký nhiều dịch vụ khác nhau là bình thường, và gói cá nhân vẫn soạn văn bản được, vấn đề nằm ở quản trị chứ không ở tính năng.",
      },
      {
        question: "Trong danh sách câu hỏi gửi nhà cung cấp, câu nào quan trọng nhất về dữ liệu?",
        options: [
          "Dữ liệu chúng tôi nhập vào có được dùng để huấn luyện không?",
          "Giao diện có nhiều màu để nhân viên thấy thích dùng không? Có hỗ trợ giờ hành chính không?",
          "Công ty bạn có bao nhiêu khách hàng đang dùng gói này, ở những nước nào?",
          "Bạn có thể giảm giá bao nhiêu phần trăm nếu chúng tôi mua thêm nhiều chỗ ngồi?",
        ],
        correct: 0,
        explanation:
          "Câu về việc dữ liệu có bị dùng để huấn luyện hay không quyết định bạn được phép dán loại tài liệu nào. Giao diện và giờ hỗ trợ là câu hỏi phụ, số khách hàng là quảng cáo chứ không phải cam kết về dữ liệu của bạn, và giảm giá là chuyện thương lượng sau khi các câu hỏi về rủi ro đã có trả lời.",
      },
      {
        question: "Nhà cung cấp trả lời miệng qua điện thoại rằng dữ liệu 'rất an toàn'. Bạn nên làm gì?",
        options: [
          "Xin họ ghi câu trả lời bằng văn bản hoặc chỉ đúng trang điều khoản",
          "Ghi lại 'rất an toàn' vào báo cáo cho sếp vì người bán hàng đã khẳng định rõ ràng",
          "Bỏ qua câu đó, vì mọi nhà cung cấp đều nói giống nhau nên không đáng để hỏi",
          "Hỏi lại cùng câu đó cho tới khi họ đổi câu trả lời sang cách nói dễ nghe hơn",
        ],
        correct: 0,
        explanation:
          "Câu 'rất an toàn' không đo được và không ràng buộc ai. Bản ghi bằng văn bản hoặc trang điều khoản chính thức mới là thứ bạn đối chiếu và đưa cho pháp chế xem. Ghi lời nói miệng vào báo cáo biến lời quảng cáo thành sự thật, bỏ qua thì mất cơ hội hỏi, và hỏi lặp lại chỉ đổi cách nói chứ không tạo ra cam kết.",
      },
      {
        question: "Vì sao cần hỏi 'ai là người quản trị tài khoản chung của phòng'?",
        options: [
          "Để có người thêm, bớt thành viên và thu lại quyền truy cập khi ai đó nghỉ việc",
          "Để người quản trị đọc được mọi câu hỏi riêng tư của từng người",
          "Để công ty biết chính xác ai sử dụng công cụ nhiều nhất trong tháng và báo lên sếp",
          "Để nhà cung cấp có địa chỉ liên hệ khi họ cần gửi hóa đơn",
        ],
        correct: 0,
        explanation:
          "Vai trò quản trị là chỗ thêm, bớt người và thu quyền. Việc quản trị viên có đọc được nội dung của từng người hay không là một câu hỏi riêng cần hỏi thẳng, đừng mặc định. Thống kê người dùng nhiều nhất chỉ là phần phụ, và địa chỉ nhận hóa đơn là chuyện tài chính, không phải lý do để cần người quản trị.",
      },
      {
        question: "Bảng câu hỏi của bạn nên xếp theo thứ tự nào?",
        options: [
          "Dữ liệu và quyền truy cập trước, tính năng sau, giá cuối cùng",
          "Giá trước để loại nhanh những gói ngoài ngân sách, rồi mới hỏi các chuyện còn lại",
          "Tính năng trước vì đó là thứ đầu tiên mà người dùng nhìn thấy khi bắt đầu",
          "Thứ tự nào cũng như nhau vì cuối cùng vẫn phải hỏi hết mọi câu hỏi",
        ],
        correct: 0,
        explanation:
          "Câu về rủi ro có thể loại một gói ngay dù rẻ hay nhiều tính năng, nên hỏi trước cho đỡ mất công so sánh vô ích. Xếp giá trước loại nhầm gói an toàn hơn nhưng đắt hơn chút. Tính năng chỉ có nghĩa khi gói đã qua được vòng dữ liệu. Thứ tự có ý nghĩa vì nó quyết định gói nào bị loại sớm.",
      },
    ],
    keyTakeaways: [
      "Giá là câu hỏi cuối; dữ liệu, quyền truy cập, người quản trị là câu hỏi đầu.",
      "Tài khoản riêng của từng người nằm ngoài tầm nhìn của công ty.",
      "Câu trả lời miệng không đủ: xin văn bản hoặc trang điều khoản chính thức.",
      "Hỏi rõ ai quản trị và có đọc được nội dung của từng người không.",
      "Điều khoản có thể thay đổi: ghi ngày bạn đọc.",
    ],
    practicePrompt: {
      question:
        "Chị Lan được giao chọn công cụ AI cho phòng 6 người. Chị đã so xong ba bảng giá. Bước còn thiếu quan trọng nhất là gì?",
      options: [
        "Hỏi từng nhà cung cấp về dữ liệu, quyền truy cập và quản trị, xin trả lời bằng văn bản",
        "Chọn gói rẻ nhất trong ba gói vì tính năng ba gói chắc cũng giống nhau",
        "Cho cả phòng dùng thử ba gói cùng lúc để xem người nào thích gói nào",
        "Hỏi mọi người trong phòng gói nào có giao diện đẹp nhất rồi chốt theo số đông, không hỏi thêm",
      ],
      correct: 0,
      explanation:
        "Bảng giá chưa nói gì về nơi dữ liệu đi tới và ai kiểm soát. Chọn rẻ nhất bỏ qua rủi ro, cho dùng thử ba gói cùng lúc là tự tạo thêm ba nơi dữ liệu có thể rò rỉ, còn giao diện đẹp là tiêu chí phụ.",
    },
    summary: {
      keyIdea: "Chọn gói cho cả nhóm là chọn cách kiểm soát dữ liệu, không chỉ chọn tính năng và giá.",
      formula: "Câu hỏi về dữ liệu + quyền truy cập + quản trị (bằng văn bản) -> loại gói không đạt -> rồi mới so giá.",
      commonMistake: "So giá trước, hỏi dữ liệu sau, hoặc tin lời nói miệng của người bán.",
      action: "Viết 6 câu hỏi về dữ liệu, quyền truy cập và quản trị, gửi cho một nhà cung cấp hoặc phòng IT.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một công cụ AI nhóm bạn đang cân nhắc. Viết ra giấy 6 câu hỏi: dữ liệu có dùng để huấn luyện không, dữ liệu lưu ở đâu bao lâu, ai là quản trị viên, khi người nghỉ việc thì thu quyền thế nào, quản trị viên có đọc được nội dung không, và cam kết nằm ở trang điều khoản nào. Tìm trang điều khoản chính thức và ghi ngày bạn đọc bên cạnh mỗi câu trả lời tìm được.",
      secondary: "Câu nào không tìm thấy trả lời, đánh dấu để hỏi phòng IT hoặc nhà cung cấp.",
    },
    sections: [
      {
        type: "lead",
        text: "Sáng thứ Hai sếp bảo bạn tìm một công cụ AI cho cả phòng. Trang giá hiện ra ngay, và rất dễ để chuyện chọn biến thành chuyện so giá. Bài này đổi thứ tự: hỏi trước, so giá sau.",
      },
      {
        type: "feynman",
        title: "Chọn gói cho cả nhóm đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới việc thuê một căn nhà cho cả nhóm ở chung. Bạn không chỉ hỏi giá thuê: bạn hỏi ai giữ chìa khóa, ai đứng tên hợp đồng, ai được vào phòng nào, và khi có người dọn đi thì chìa khóa lấy lại thế nào. Công cụ AI cho nhóm cũng vậy.",
        columns: ["Câu hỏi", "Thuê nhà chung", "Công cụ AI cho nhóm"],
        rows: [
          ["Ai đứng tên", "Người ký hợp đồng thuê", "Người quản trị tài khoản chung"],
          ["Ai được vào", "Người có chìa khóa", "Thành viên được mời vào nhóm"],
          ["Khi có người đi", "Lấy lại chìa khóa", "Thu quyền truy cập và dữ liệu của người đó"],
          ["Đồ để trong nhà", "Ai có thể vào xem", "Dữ liệu bạn dán vào đi tới đâu, ai đọc được"],
        ],
        oneLiner: "Trước khi hỏi giá thuê, hãy hỏi ai giữ chìa khóa và đồ của bạn nằm ở đâu.",
      },
      { type: "heading", text: "Vì sao gói cá nhân không đủ cho một phòng" },
      {
        type: "paragraph",
        text: "Gói cá nhân sinh ra cho một người: tài khoản của người đó, lịch sử của người đó, dữ liệu của người đó. Khi cả phòng dùng gói cá nhân thì có 8 người, 8 tài khoản, và công ty không nhìn thấy cái nào. Đó là chuyện quản trị, chưa phải chuyện tính năng.",
      },
      {
        type: "list",
        items: [
          "Dữ liệu: thứ bạn dán vào có được dùng để huấn luyện không, lưu ở đâu, lưu bao lâu, xoá được không.",
          "Quyền truy cập: ai được vào, có đăng nhập chung của công ty không, người nghỉ việc bị thu quyền thế nào.",
          "Người quản trị: ai thêm bớt người, quản trị viên có đọc được nội dung của từng người không.",
          "Hỗ trợ và cam kết: có văn bản nào ghi lại câu trả lời để pháp chế xem không.",
        ],
      },
      {
        type: "flow",
        title: "Từ 'sếp bảo tìm công cụ' tới danh sách câu hỏi",
        steps: [
          { label: "Ghi việc cả phòng định làm với AI", detail: "Viết 3-5 việc cụ thể: soạn thư khách, tóm tắt cuộc họp, làm bảng so sánh. Việc quyết định loại dữ liệu sẽ bị dán vào." },
          { label: "Xếp loại dữ liệu theo độ nhạy", detail: "Dữ liệu công khai, dữ liệu nội bộ, dữ liệu khách hàng. Loại nhạy nhất quyết định câu hỏi nào bắt buộc." },
          { label: "Viết câu hỏi", detail: "Mỗi câu một ý, hỏi được bằng có hoặc không, hoặc trả lời được bằng một trang điều khoản." },
          { label: "Gửi nhà cung cấp và IT", detail: "Xin trả lời bằng văn bản hoặc chỉ đúng trang điều khoản. Điều khoản có thể đổi: ghi ngày bạn đọc." },
          { label: "So câu trả lời, rồi xét giá", detail: "Gói nào không trả lời được hoặc trả lời mơ hồ thì bị loại trước, rẻ đến đâu cũng vậy." },
        ],
      },
      {
        type: "callout",
        label: "Không hỏi về luật thì hỏi ai",
        text: "Câu hỏi về việc dữ liệu khách hàng có được phép để ở nước ngoài hay không, hợp đồng có bị ràng buộc thế nào: đó là việc của bộ phận pháp chế hoặc chuyên gia. Bạn chỉ chuẩn bị danh sách câu hỏi và mang câu trả lời của nhà cung cấp tới cho họ xem.",
      },
      {
        type: "comparison",
        left: {
          label: "Mỗi người một tài khoản cá nhân",
          text: "Nhanh, không cần thủ tục. Nhưng công ty không nhìn thấy dữ liệu nào đã được dán vào, không thu hồi được khi người đó nghỉ, và mỗi người tự hiểu điều khoản theo cách của mình.",
        },
        right: {
          label: "Một gói chung có quản trị",
          text: "Có người đứng tên và quản trị, thêm bớt thành viên được, có văn bản để pháp chế xem. Mất công hỏi trước, nhưng công ty biết mình đã đồng ý điều gì.",
        },
      },
      {
        type: "scenario",
        title: "Sếp giao: 'Tìm gói AI cho phòng trước thứ Sáu'",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn đã tìm được ba công cụ có vẻ hợp. Bảng giá của cả ba nằm trên màn hình, và một công cụ rẻ hơn hẳn hai công cụ kia.",
            choices: [
              { label: "Đề xuất luôn công cụ rẻ nhất cho sếp", next: "bad_cheap" },
              { label: "Viết danh sách câu hỏi về dữ liệu, quyền truy cập, quản trị trước", next: "s2" },
            ],
          },
          bad_cheap: {
            text: "Sếp duyệt. Hai tuần sau phòng IT hỏi dữ liệu khách hàng được lưu ở đâu và không ai trả lời được. Cả phòng phải ngừng dùng và làm lại từ đầu.",
            ending: "bad",
          },
          s2: {
            text: "Bạn gửi 6 câu hỏi cho ba nhà cung cấp. Hai nơi gửi văn bản trả lời. Nơi thứ ba chỉ nhắn 'yên tâm, rất an toàn'.",
            choices: [
              { label: "Vẫn giữ nơi thứ ba vì giá rẻ nhất và họ đã bảo yên tâm", next: "bad_vague" },
              { label: "Xin nơi thứ ba chỉ đúng trang điều khoản, nếu không có thì loại", next: "s3" },
            ],
          },
          bad_vague: {
            text: "Lời 'yên tâm' không nằm trong văn bản nào. Khi có thắc mắc về dữ liệu, bạn không có gì để đưa cho pháp chế xem.",
            ending: "bad",
          },
          s3: {
            text: "Nơi thứ ba không chỉ được trang nào. Bạn còn hai gói có văn bản trả lời, giá chênh nhau không nhiều.",
            choices: [
              { label: "Mang hai văn bản cho pháp chế xem cùng bảng giá rồi mới đề xuất", next: "good" },
              { label: "Chọn ngẫu nhiên một trong hai cho nhanh vì cùng có văn bản", next: "bad_random" },
            ],
          },
          bad_random: {
            text: "Bạn chọn xong mà chưa biết điểm khác nhau giữa hai gói. Một tháng sau mới phát hiện gói kia cho quản trị viên thu quyền người nghỉ việc dễ hơn.",
            ending: "bad",
          },
          good: {
            text: "Pháp chế chỉ ra một điều khoản cần hỏi lại, nhà cung cấp trả lời trong một ngày. Bạn đề xuất một gói kèm ghi chú những điều đã hỏi và ngày đọc điều khoản.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Ghi 3-5 việc cả nhóm định làm với AI và loại dữ liệu đi kèm.",
          "Bước 2 - Viết 6 câu hỏi về dữ liệu, quyền truy cập và quản trị.",
          "Bước 3 - Xin trả lời bằng văn bản hoặc chỉ đúng trang điều khoản, ghi ngày.",
          "Bước 4 - Đưa cho pháp chế hoặc IT xem, rồi mới so giá.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Hỏi trước, so giá sau; nghe bằng văn bản chứ đừng nghe bằng lời.",
          "Bài sau: tính chi phí thật của một công cụ AI, gồm cả thời gian kiểm lại.",
        ],
      },
    ],
  },
  {
    id: 2256,
    slug: "chi-phi-that-cua-mot-cong-cu-ai",
    title: "Chặng 42, Bài 17: Tính chi phí thật: tiền, thời gian và rủi ro",
    subtitle: "Thuyết phục sếp bằng số của chính bạn: tiết kiệm bao nhiêu phút, trừ đi thời gian kiểm lại.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "⚖️",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Nói 'AI giúp tiết kiệm nhiều thời gian' thì sếp không duyệt được. Nói 'mỗi tuần em tiết kiệm 3 giờ, trừ 1 giờ kiểm lại, còn 2 giờ ròng' thì sếp có con số để cân với chi phí. Bài này dạy bạn tính bằng số của chính mình.",
    openingQuestion:
      "Bạn muốn xin sếp duyệt một công cụ AI. Cách trình bày nào có sức thuyết phục nhất?",
    openingOptions: [
      "Số phút tiết kiệm mỗi tuần trừ số phút kiểm lại, đối chiếu với chi phí",
      "Đưa bài báo nói rằng AI giúp tăng năng suất của mọi ngành nên công ty mình cũng sẽ tăng",
      "Cho sếp xem một câu trả lời thật hay mà công cụ vừa tạo ra",
      "Nói rằng đồng nghiệp ở công ty khác ai cũng đã dùng rồi",
    ],
    correctOption: 0,
    explanation:
      "Sếp cần số của chính công việc bạn: bao nhiêu phút mỗi tuần được tiết kiệm, bao nhiêu phút phải kiểm lại, và còn lại bao nhiêu sau chi phí. Bài báo nói chung không nói về việc của bạn, một câu trả lời hay chỉ là một lần thử đẹp, và việc người khác đã dùng không cho biết nó có lợi cho bạn không.",
    diagram: [
      { label: "Đo số phút bạn làm việc đó khi chưa có AI", arrow: true },
      { label: "Đo số phút làm với AI, cộng thời gian kiểm lại", arrow: true },
      { label: "Nhân với số lần mỗi tuần, trừ chi phí công cụ", arrow: true },
      { label: "Trình sếp con số ròng kèm cách bạn đo" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một nhân viên hành chính soạn 10 biên bản họp mỗi tuần, mỗi biên bản 30 phút khi tự viết. Với AI, mỗi biên bản mất 12 phút soạn và 10 phút kiểm lại. Số liệu minh hoạ: 10 x (30 - 22) = 80 phút tiết kiệm ròng mỗi tuần. Cô ghi cả hai con số vào đề xuất, không chỉ con số 18 phút đẹp hơn.",
    },
    quiz: [
      {
        question: "Mỗi biên bản tự viết mất 30 phút, làm với AI mất 12 phút soạn và 10 phút kiểm lại. Mỗi biên bản tiết kiệm được bao nhiêu phút ròng?",
        options: [
          "8 phút (= 30 - 12 - 10)",
          "18 phút (= 30 - 12, quên trừ thời gian kiểm lại)",
          "20 phút (= 30 - 10, chỉ trừ thời gian kiểm lại)",
          "22 phút (= 12 + 10, cộng thời gian của cách dùng AI)",
        ],
        correct: 0,
        explanation:
          "Phải trừ cả thời gian soạn và thời gian kiểm lại: 30 - 12 - 10 = 8. Kết quả 18 quên bước kiểm lại. Kết quả 20 quên thời gian soạn với AI. Kết quả 22 chỉ là tổng thời gian khi dùng AI, chưa so với 30 phút ban đầu nên không phải phần tiết kiệm.",
      },
      {
        question: "Vì sao phải tính cả thời gian kiểm lại?",
        options: [
          "Vì kết quả của AI phải được người đọc soát trước khi dùng, và đó cũng là công sức",
          "Vì AI luôn sai nên phải đọc lại từng chữ của nó trước khi dùng, không có ngoại lệ nào",
          "Vì sếp thích thấy con số lớn hơn khi cộng thêm nhiều mục chi phí",
          "Vì thời gian kiểm lại được tính là giờ làm thêm được trả lương",
        ],
        correct: 0,
        explanation:
          "Việc soát kết quả là thời gian thật của bạn và là chỗ chịu trách nhiệm, bỏ nó đi thì con số tiết kiệm bị thổi phồng. Không phải AI luôn sai, chỉ là bạn không biết lần nào sai. Cộng thêm mục để con số lớn hơn là làm đẹp số liệu chứ không phải đo, và giờ làm thêm không liên quan tới cách tính này.",
      },
      {
        question: "Bạn chỉ thử công cụ đúng một lần và thấy tiết kiệm 20 phút. Nên kết luận thế nào?",
        options: [
          "Chưa đủ để kết luận, cần đo lặp lại vài lần trên việc thật",
          "Kết luận tiết kiệm 20 phút mỗi lần, nhân với số lần trong tuần rồi báo sếp",
          "Kết luận công cụ này tốt hơn mọi công cụ khác vì lần thử rất thành công",
          "Kết luận chi phí công cụ chắc chắn đáng, không cần đo thêm lần nữa",
        ],
        correct: 0,
        explanation:
          "Một lần đo có thể may hoặc rủi: hôm đó việc dễ, hoặc bạn chưa gặp trường hợp khó. Nhân thẳng 20 phút cho cả tuần thổi phồng con số. Một lần thử thành công không so được với công cụ khác vì bạn chưa thử công cụ khác. Và chi phí đáng hay không cần cả số lần lẫn thời gian kiểm lại.",
      },
      {
        question: "Ngoài tiền và thời gian, 'rủi ro' trong chi phí thật của một công cụ AI là gì?",
        options: [
          "Khả năng lỗi lọt qua khâu kiểm và gây hậu quả, hoặc dữ liệu nhạy cảm bị dán nhầm",
          "Rủi ro công cụ đổi giao diện khiến bạn mất vài phút làm quen lại",
          "Rủi ro đồng nghiệp học được cách làm của bạn rồi làm nhanh hơn",
          "Rủi ro hết hạn dùng thử, vì nhà cung cấp gợi ý bạn mua gói cao hơn",
        ],
        correct: 0,
        explanation:
          "Rủi ro đáng tính là loại có thể gây thiệt hại: một con số sai lọt vào báo cáo, hoặc dữ liệu khách hàng bị dán vào nơi không được phép. Đổi giao diện chỉ tốn vài phút, đồng nghiệp học cách làm là lợi chứ không phải rủi ro, và hết hạn dùng thử là chuyện giá chứ không phải rủi ro về kết quả công việc.",
      },
      {
        question: "Phần kiểm lại nên được tính thế nào khi việc đó có hậu quả lớn nếu sai (báo cáo gửi khách hàng)?",
        options: [
          "Tính kỹ và để nhiều thời gian hơn, vì chi phí một lỗi lớn hơn nhiều so với vài phút",
          "Tính bằng đúng thời gian như việc thường, vì cách kiểm không phụ thuộc vào hậu quả của việc đó",
          "Bỏ qua, vì báo cáo gửi khách đã có người khác duyệt lại trước khi gửi",
          "Giảm xuống còn một nửa, vì việc quan trọng thì công cụ thường làm rất kỹ",
        ],
        correct: 0,
        explanation:
          "Việc càng nhiều hậu quả thì càng cần thời gian kiểm, nên phần này phải lớn hơn khi làm việc quan trọng. Kiểm bằng thời gian như nhau cho mọi việc là bỏ qua khác biệt về hậu quả. Người duyệt sau không thay được người soạn kiểm đúng, và công cụ không làm kỹ hơn chỉ vì việc quan trọng.",
      },
    ],
    keyTakeaways: [
      "Tiết kiệm ròng = thời gian tự làm - thời gian làm với AI - thời gian kiểm lại.",
      "Đo trên việc thật của bạn, lặp lại vài lần, không dựa một lần thử.",
      "Việc càng nhiều hậu quả nếu sai thì thời gian kiểm càng phải lớn.",
      "Rủi ro là một khoản chi phí: lỗi lọt qua và dữ liệu dán nhầm.",
      "Trình sếp cả con số đẹp lẫn con số kiểm lại.",
    ],
    practicePrompt: {
      question:
        "Anh Tuấn báo sếp: 'Dùng AI mỗi email tiết kiệm 10 phút, một tuần 20 email là 200 phút'. Anh chưa đo thời gian đọc soát lại. Điểm yếu lớn nhất của con số là gì?",
      options: [
        "Thiếu thời gian kiểm lại nên tiết kiệm bị thổi phồng",
        "Con số 200 phút quá lớn nên sếp sẽ không tin",
        "Anh nên chia cho 7 ngày thay vì tính theo tuần để số nhỏ đi",
        "Anh không nêu tên công cụ nên không so được",
      ],
      correct: 0,
      explanation:
        "Tiết kiệm ròng phải trừ thời gian kiểm lại. Thiếu bước đó thì con số 200 phút có thể thực tế chỉ còn một nửa. Con số lớn không tự nó là lỗi, đơn vị tuần là hợp lý cho sếp duyệt, và tên công cụ không sửa được cách tính.",
    },
    summary: {
      keyIdea: "Chi phí thật gồm tiền, thời gian kiểm lại và rủi ro; con số đưa sếp phải là số ròng bạn đã đo.",
      formula: "Tiết kiệm ròng mỗi tuần = số lần x (phút tự làm - phút làm với AI - phút kiểm lại) - chi phí quy ra phút.",
      commonMistake: "Chỉ báo phút tiết kiệm mà quên phút kiểm lại, hoặc nhân từ một lần thử duy nhất.",
      action: "Đo một việc lặp lại 3 lần: phút tự làm, phút làm với AI, phút kiểm lại.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một việc bạn làm mỗi tuần (ví dụ soạn email hoặc tóm tắt cuộc họp). Bấm giờ khi bạn tự làm một lần và khi làm với AI một lần, gồm cả thời gian bạn đọc soát kết quả. Ghi ba con số vào một dòng, nhân với số lần mỗi tuần, rồi kéo thanh trượt trong biểu đồ của bài để xem điểm hòa vốn.",
      secondary: "Lặp lại hai lần nữa vào những ngày sau để xem con số có ổn định không.",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn định xin sếp duyệt một công cụ AI, và sếp hỏi câu quen thuộc: 'Được bao nhiêu?'. Nếu bạn trả lời bằng cảm giác thì rất khó duyệt. Trả lời bằng số phút bạn đã đo thì sếp có gì để cân.",
      },
      {
        type: "feynman",
        title: "Tính chi phí thật đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới việc mua máy rửa bát. Giá máy chưa phải toàn bộ chi phí: còn tiền điện, nước, viên rửa, và thời gian bạn xếp bát vào rồi lấy ra. Máy chỉ đáng khi phần thời gian bạn tiết kiệm lớn hơn phần bạn tốn thêm.",
        columns: ["Khoản", "Máy rửa bát", "Công cụ AI"],
        rows: [
          ["Tiền mua hoặc thuê", "Giá máy", "Phí sử dụng công cụ"],
          ["Công sức phải bỏ thêm", "Xếp bát, lấy bát ra", "Viết yêu cầu và kiểm lại kết quả"],
          ["Thứ tiết kiệm được", "Thời gian rửa tay", "Thời gian tự làm từ đầu"],
          ["Việc có thể hỏng", "Bát vỡ, chưa sạch", "Con số sai, dữ liệu dán nhầm"],
        ],
        oneLiner: "Đáng dùng khi thời gian tiết kiệm lớn hơn phần công sức và rủi ro bạn tốn thêm.",
      },
      { type: "heading", text: "Ba khoản cần cộng vào" },
      {
        type: "list",
        items: [
          "Tiền: phí công cụ, quy ra phút làm việc của bạn nếu cần so sánh.",
          "Thời gian: phút viết yêu cầu và quan trọng nhất là phút kiểm lại kết quả.",
          "Rủi ro: một lỗi lọt qua có thể tốn hơn cả giờ tiết kiệm được.",
        ],
      },
      {
        type: "paragraph",
        text: "Nhiều người quên khoản thứ hai. Kết quả của AI nghe trơn tru nên rất dễ tin rằng không cần soát. Nhưng người ký tên dưới báo cáo vẫn là bạn, nên thời gian soát là phần không thể bỏ.",
      },
      {
        type: "chart",
        title: "Số phút tiết kiệm mỗi tuần so với thời gian kiểm lại",
        caption:
          "Số liệu minh hoạ. Kéo thanh trượt để dùng số của chính bạn: phút tiết kiệm mỗi việc, phút kiểm lại mỗi việc và chi phí công cụ quy ra phút mỗi tuần.",
        kind: "line",
        xLabel: "Số việc làm với AI mỗi tuần",
        yLabel: "Phút mỗi tuần",
        x: { from: 0, to: 20, step: 1 },
        params: [
          { id: "tk", label: "Phút tự làm nhưng AI làm thay, mỗi việc", min: 5, max: 60, step: 1, value: 25, unit: " phút" },
          { id: "kl", label: "Phút kiểm lại kết quả, mỗi việc", min: 0, max: 40, step: 1, value: 10, unit: " phút" },
          { id: "cp", label: "Chi phí công cụ quy ra phút mỗi tuần", min: 0, max: 120, step: 5, value: 30, unit: " phút" },
        ],
        series: [
          { label: "Phút tiết kiệm (chưa kiểm lại)", expr: "x*tk" },
          { label: "Phút kiểm lại", expr: "x*kl" },
          { label: "Ròng sau chi phí", expr: "x*(tk-kl)-cp" },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI dựng bảng tính chi phí cho đề xuất",
        task: "Bạn có số liệu đo của mình và cần AI dựng một bảng tính đơn giản để trình sếp. Lắp prompt để bảng có đủ ba khoản.",
        parts: [
          {
            id: "data",
            label: "Số liệu bạn đưa",
            options: [
              { text: "Tôi nghĩ AI giúp tiết kiệm khoảng nửa thời gian.", feedback: "Cảm giác không phải số đo. AI sẽ bịa ra các số cho có vẻ hợp lý." },
              { text: "Số đo của tôi: tự làm 30 phút, làm với AI 12 phút, kiểm lại 10 phút, 10 lần mỗi tuần.", good: true, feedback: "Có số đo thật. AI chỉ việc tính, không cần bịa." },
            ],
          },
          {
            id: "items",
            label: "Các khoản cần tính",
            options: [
              { text: "Chỉ tính số phút tiết kiệm được mỗi tuần.", feedback: "Bảng sẽ thổi phồng lợi ích vì thiếu thời gian kiểm lại và chi phí." },
              { text: "Tính ba khoản: phút tiết kiệm, phút kiểm lại, chi phí công cụ; cho ra số ròng mỗi tuần.", good: true, feedback: "Đủ ba khoản nên con số ròng có thể đưa sếp cân." },
            ],
          },
          {
            id: "risk",
            label: "Ghi chú rủi ro",
            options: [
              { text: "Không cần ghi gì về rủi ro, sếp chỉ quan tâm số phút.", feedback: "Bảng thiếu phần sếp sẽ hỏi: nếu sai thì sao. Bạn bị hỏi ngược khi trình." },
              { text: "Thêm một dòng nêu việc nào có hậu quả lớn nếu sai và cách bạn sẽ kiểm lại.", good: true, feedback: "Sếp thấy bạn đã nghĩ tới lỗi lọt qua, đề xuất đáng tin hơn." },
            ],
          },
        ],
        responses: [
          {
            requires: ["data", "items", "risk"],
            text: "Bảng chi phí mỗi tuần (10 việc):\n- Tiết kiệm trước kiểm: 10 x (30 - 12) = 180 phút\n- Kiểm lại: 10 x 10 = 100 phút\n- Ròng: 80 phút, trước khi trừ chi phí công cụ\n- Ghi chú: việc gửi khách hàng cần soát kỹ, bạn dành thêm thời gian cho các việc này.",
          },
          {
            requires: ["data"],
            text: "Tiết kiệm 10 x (30 - 12) = 180 phút mỗi tuần. Đây là con số tuyệt vời cho thấy công cụ mang lại hiệu quả vượt trội.\n\n(Đúng số học nhưng thiếu kiểm lại, chi phí và rủi ro nên thổi phồng.)",
          },
          {
            text: "Theo nghiên cứu chung, AI giúp tiết kiệm trung bình 40% thời gian làm việc, tương đương 6 giờ mỗi tuần...\n\n(Con số bịa, không dựa trên số đo của bạn.)",
          },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Trình sếp bằng số đã đo",
          text: "Có phút tự làm, phút làm với AI, phút kiểm lại, số lần mỗi tuần. Sếp có thể hỏi lại từng con số và bạn trả lời được. Con số ròng nhỏ hơn nhưng đáng tin.",
        },
        right: {
          label: "Trình sếp bằng cảm giác",
          text: "Nghe hấp dẫn nhưng không kiểm được. Nếu sau một tháng con số thật thấp hơn, bạn mất uy tín cho những đề xuất sau.",
        },
      },
      {
        type: "scenario",
        title: "Sếp hỏi: 'Em nói tiết kiệm được bao nhiêu?'",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn đã thử công cụ hai tuần. Có một lần nó làm rất nhanh và rất hay. Sếp đang chờ con số.",
            choices: [
              { label: "Báo con số từ lần nhanh nhất vì trông ấn tượng nhất", next: "bad_best" },
              { label: "Lấy trung bình ba lần đo gần nhất, gồm cả phút kiểm lại", next: "s2" },
            ],
          },
          bad_best: {
            text: "Sếp duyệt theo con số đó. Tháng sau báo cáo thật thấp hơn nhiều, sếp hỏi lại và bạn phải giải thích vì sao khác.",
            ending: "bad",
          },
          s2: {
            text: "Con số ròng còn 8 phút mỗi việc, ít hơn con số bạn hy vọng. Sếp hỏi việc nào cũng dùng được không.",
            choices: [
              { label: "Nói mọi việc đều dùng được để đề xuất trông mạnh hơn", next: "bad_all" },
              { label: "Chỉ ra hai việc lặp lại tiết kiệm rõ nhất và việc nào cần kiểm kỹ", next: "good" },
            ],
          },
          bad_all: {
            text: "Bạn áp dụng cho cả việc gửi khách hàng mà chưa đo thời gian kiểm. Một số sai lọt qua và sếp mất tin vào cả đề xuất.",
            ending: "bad",
          },
          good: {
            text: "Sếp duyệt dùng thử một tháng cho hai việc đó, kèm lịch xem lại số đo. Bạn có cả con số lẫn cách kiểm lại.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Đo phút tự làm một việc lặp lại.",
          "Bước 2 - Đo phút làm với AI, gồm cả phút kiểm lại.",
          "Bước 3 - Nhân với số lần mỗi tuần, trừ chi phí công cụ.",
          "Bước 4 - Lặp lại vài lần rồi trình sếp con số ròng.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Con số ròng nhỏ mà thật thắng con số lớn mà chưa đo.",
          "Bài sau: dữ liệu của bạn có bị dùng để huấn luyện không, và điều gì tuyệt đối không dán.",
        ],
      },
    ],
  },
  {
    id: 2257,
    slug: "du-lieu-cua-ban-co-dung-de-huan-luyen-khong",
    title: "Chặng 42, Bài 18: Dữ liệu của bạn có bị dùng để huấn luyện không",
    subtitle: "Tìm đúng trang điều khoản và cài đặt về dữ liệu, và biết những thứ không bao giờ dán vào.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🔐",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bạn sắp dán một hợp đồng vào công cụ để nhờ tóm tắt. Nhưng dữ liệu đó đi đâu, ai đọc được, có bị dùng để huấn luyện hay không thì tuỳ từng công cụ và từng loại gói. Bài này dạy bạn tự tìm đúng chỗ đọc, và quy tắc những thứ không bao giờ dán.",
    openingQuestion:
      "Bạn sắp dán một hợp đồng khách hàng vào một công cụ AI để nhờ tóm tắt. Bước đầu tiên nên làm là gì?",
    openingOptions: [
      "Tìm trang điều khoản và cài đặt về dữ liệu của chính công cụ đó rồi đọc",
      "Dán ngay vì công cụ AI nào cũng xử lý dữ liệu theo cách giống nhau nên khỏi đọc gì",
      "Xoá tên công ty trong hợp đồng rồi dán, còn lại thì để nguyên",
      "Hỏi trên mạng xem người khác dán hợp đồng vào công cụ đó chưa",
    ],
    correctOption: 0,
    explanation:
      "Cách công cụ xử lý dữ liệu khác nhau giữa các công cụ, giữa các gói và có thể đổi theo thời gian, nên nguồn đáng tin duy nhất là điều khoản và cài đặt chính thức. Không có chuyện công cụ nào cũng như nhau. Xoá tên công ty vẫn để lại giá, điều khoản, tên đối tác. Và câu trả lời trên mạng có thể đã cũ hoặc nói về gói khác.",
    diagram: [
      { label: "Xác định thứ bạn định dán: có dữ liệu nhạy cảm không", arrow: true },
      { label: "Tìm điều khoản và cài đặt dữ liệu chính thức của công cụ", arrow: true },
      { label: "Ghi lại điều đã đọc kèm ngày, hỏi IT nếu chưa rõ", arrow: true },
      { label: "Chỉ dán khi được phép, bỏ bớt phần nhạy cảm" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một nhân viên pháp lý mới vào nghề dán nguyên hợp đồng có tên khách và giá vào công cụ AI miễn phí để tóm tắt cho nhanh. Sau đó trưởng phòng hỏi công cụ đó xử lý dữ liệu thế nào và không ai trả lời được. Từ hôm đó cả nhóm có một trang ghi: công cụ nào được dán loại tài liệu nào, ngày đọc điều khoản.",
    },
    quiz: [
      {
        question: "Muốn biết công cụ có dùng nội dung bạn nhập để huấn luyện hay không, nguồn nào đáng tin nhất?",
        options: [
          "Trang điều khoản và cài đặt dữ liệu chính thức của công cụ, kèm ngày bạn đọc",
          "Bài đăng trên diễn đàn có nhiều người cùng xác nhận và đã được nhiều lượt thích",
          "Câu trả lời của chính công cụ khi bạn hỏi nó về chuyện này",
          "Ý kiến của đồng nghiệp đã dùng công cụ đó lâu hơn bạn",
        ],
        correct: 0,
        explanation:
          "Chỉ văn bản chính thức mới ràng buộc nhà cung cấp và mới cập nhật khi họ đổi. Bài đăng diễn đàn có thể cũ, câu trả lời của công cụ có thể bịa vì nó không đọc điều khoản của chính mình theo cách bạn nghĩ, và đồng nghiệp dùng lâu chưa chắc đã đọc điều khoản hoặc dùng cùng loại gói.",
      },
      {
        question: "Bạn tìm thấy một cài đặt cho phép tắt việc dùng dữ liệu để huấn luyện. Điều gì đúng?",
        options: [
          "Cài đặt đó có thể chỉ áp dụng cho một số gói hoặc loại tài khoản, cần đọc kỹ phạm vi",
          "Tắt xong là mọi dữ liệu đã dán trước đó cũng bị xoá khỏi hệ thống của nhà cung cấp ngay lập tức",
          "Cài đặt đó áp dụng cho mọi công cụ AI khác bạn đang dùng trong cùng máy",
          "Sau khi tắt, bạn có thể dán mọi loại dữ liệu mà không cần cân nhắc gì nữa",
        ],
        correct: 0,
        explanation:
          "Phạm vi của một cài đặt thường gắn với gói hoặc loại tài khoản, nên đọc nó áp dụng cho ai. Tắt huấn luyện không đồng nghĩa với xoá dữ liệu cũ, không lan sang công cụ khác, và cũng không cho phép dán mọi thứ: dữ liệu nhạy cảm vẫn cần quy tắc riêng của công ty.",
      },
      {
        question: "Loại nào dưới đây bạn KHÔNG nên dán vào công cụ khi chưa được công ty cho phép?",
        options: [
          "Danh sách khách hàng kèm số điện thoại và số tiền công nợ",
          "Một đoạn văn bản bạn tự viết để nhờ sửa cho gọn",
          "Câu hỏi chung về cách viết một email xin lỗi khách",
          "Đề cương một bài thuyết trình đã được công khai từ lâu trên website của công ty",
        ],
        correct: 0,
        explanation:
          "Danh sách khách và công nợ là dữ liệu kinh doanh và dữ liệu cá nhân, rời khỏi công ty là có rủi ro. Ba lựa chọn còn lại không chứa thông tin nhạy cảm: văn bản tự viết chưa có dữ liệu ai khác, câu hỏi chung không gắn khách nào, và nội dung đã công khai thì không có gì để lộ.",
      },
      {
        question: "Bạn muốn dùng AI xử lý một hợp đồng nhưng chưa biết công cụ có được phép không. Làm gì an toàn nhất?",
        options: [
          "Hỏi phòng IT hoặc pháp chế, trong lúc chờ thì dùng bản hợp đồng mẫu hoặc dữ liệu giả",
          "Dán một nửa hợp đồng thôi, vì nửa còn lại đủ để giữ bí mật",
          "Dán cả hợp đồng rồi xoá cuộc trò chuyện ngay sau khi công cụ trả lời xong",
          "Chờ tới khi có sự cố rồi mới xin phép, vì hỏi trước mất thời gian chờ đợi",
        ],
        correct: 0,
        explanation:
          "Hỏi người có thẩm quyền và dùng dữ liệu giả trong lúc chờ vừa tiến độ vừa an toàn. Một nửa hợp đồng vẫn chứa điều khoản nhạy cảm. Xoá cuộc trò chuyện chưa chắc xoá được dữ liệu ở phía nhà cung cấp. Xin phép sau sự cố là muộn: thứ đã dán không lấy lại được.",
      },
      {
        question: "Điều khoản của công cụ đã được bạn đọc hôm nay. Ba tháng sau cần dùng lại, nên làm gì?",
        options: [
          "Đọc lại điều khoản, vì nhà cung cấp có thể đã thay đổi",
          "Không cần đọc lại vì điều khoản một khi đã đọc thì không bao giờ đổi",
          "Chỉ cần đọc lại nếu công cụ gửi thông báo ầm ĩ về việc đổi điều khoản",
          "Hỏi chính công cụ xem điều khoản có đổi không rồi tin câu trả lời của nó",
        ],
        correct: 0,
        explanation:
          "Điều khoản có thể được cập nhật, nên ghi ngày đọc và đọc lại định kỳ. Không phải điều khoản nào cũng đứng yên. Không phải thay đổi nào cũng có thông báo nổi bật, và hỏi chính công cụ không đáng tin bằng đọc văn bản, vì câu trả lời của nó có thể sai hoặc cũ.",
      },
    ],
    keyTakeaways: [
      "Nguồn đáng tin là điều khoản và cài đặt chính thức của đúng công cụ và đúng gói bạn dùng.",
      "Ghi ngày bạn đọc: điều khoản có thể đổi.",
      "Danh sách khách, hợp đồng, số liệu nội bộ chưa được phép thì không dán.",
      "Tắt một cài đặt chưa chắc xoá dữ liệu đã dán.",
      "Chưa chắc thì hỏi IT hoặc pháp chế, trong lúc chờ dùng dữ liệu giả.",
    ],
    practicePrompt: {
      question:
        "Chị Hà thấy người khác nói trên mạng rằng công cụ A 'không bao giờ dùng dữ liệu của bạn'. Chị định dán báo cáo doanh thu nội bộ vào. Nên làm gì trước?",
      options: [
        "Tìm trang điều khoản chính thức của gói chị đang dùng và đọc, rồi hỏi IT",
        "Dán luôn vì nhiều người trên mạng cùng nói giống nhau",
        "Hỏi công cụ A: 'Bạn có dùng dữ liệu của tôi không?' và tin câu trả lời của nó",
        "Chia báo cáo thành nhiều phần nhỏ rồi dán từng phần một",
      ],
      correct: 0,
      explanation:
        "Điều khoản chính thức là nguồn ràng buộc. Số đông trên mạng không thay được nó, câu trả lời của công cụ không phải văn bản điều khoản, và chia nhỏ báo cáo không làm dữ liệu bớt nhạy cảm.",
    },
    summary: {
      keyIdea: "Biết dữ liệu đi đâu bằng cách đọc điều khoản chính thức, và không dán thứ chưa được phép.",
      formula: "Điều khoản chính thức + cài đặt của đúng gói + ngày đọc + hỏi IT khi chưa rõ = quyết định dán hay không.",
      commonMistake: "Tin lời đồn, bài đăng cũ hoặc chính câu trả lời của công cụ thay cho văn bản điều khoản.",
      action: "Tìm trang điều khoản dữ liệu của công cụ bạn hay dùng và ghi ngày đọc.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn công cụ AI bạn dùng nhiều nhất. Tìm trang điều khoản hoặc chính sách về dữ liệu chính thức và trang cài đặt liên quan tới dữ liệu. Ghi vào một tệp ba dòng: công cụ, ngày bạn đọc, và loại tài liệu bạn quyết định không dán. Nếu có chỗ chưa hiểu, đánh dấu để hỏi phòng IT.",
      secondary: "Gửi cho một đồng nghiệp ba dòng đó để họ cùng kiểm.",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn có một hợp đồng 12 trang cần tóm tắt trước cuộc họp chiều nay. Công cụ AI mở sẵn trên màn hình, chỉ cần dán vào. Bài này dạy bạn dừng ba mươi giây để biết dữ liệu đó sẽ đi đâu.",
      },
      {
        type: "feynman",
        title: "Chuyện dữ liệu và huấn luyện đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới việc gửi một tập hồ sơ cho tiệm photo. Bạn cần biết tiệm có giữ lại bản sao không, ai trong tiệm xem được, họ tiêu huỷ giấy thừa thế nào. Điều đó nằm trong quy định của tiệm, không nằm trong lời hứa miệng của người đứng quầy.",
        columns: ["Câu hỏi", "Tiệm photo", "Công cụ AI"],
        rows: [
          ["Có giữ bản sao không", "Có lưu tệp sau khi in không", "Có lưu nội dung bạn nhập không, bao lâu"],
          ["Ai xem được", "Nhân viên trong tiệm", "Nhân viên nhà cung cấp, người quản trị"],
          ["Dùng vào việc khác", "Có dùng bản của bạn làm mẫu không", "Có dùng để huấn luyện mô hình không"],
          ["Đọc ở đâu", "Bảng quy định của tiệm", "Trang điều khoản và cài đặt dữ liệu"],
        ],
        oneLiner: "Đừng hỏi người đứng quầy, hãy đọc bảng quy định của tiệm: điều khoản chính thức.",
      },
      { type: "heading", text: "Huấn luyện là gì, nói gọn" },
      {
        type: "paragraph",
        text: "Công cụ AI học cách trả lời từ một lượng dữ liệu rất lớn. 'Huấn luyện' là việc dùng thêm dữ liệu để cải thiện nó. Câu bạn cần hỏi: nội dung tôi nhập vào có nằm trong số dữ liệu đó không. Câu trả lời khác nhau giữa các công cụ, các gói và có thể đổi theo thời gian.",
      },
      {
        type: "flow",
        title: "Trước khi dán một tài liệu vào công cụ AI",
        steps: [
          { label: "Nhìn lại thứ định dán", detail: "Có tên khách, số điện thoại, giá, điều khoản hợp đồng, số liệu nội bộ chưa công bố không? Nếu có, dừng lại." },
          { label: "Tìm trang điều khoản dữ liệu", detail: "Tìm trang chính sách về dữ liệu của chính công cụ và gói bạn dùng, không đọc bài của người khác." },
          { label: "Tìm cài đặt dữ liệu", detail: "Xem có cài đặt liên quan tới việc lưu hoặc dùng nội dung của bạn không, và nó áp dụng cho gói nào." },
          { label: "Ghi ngày đọc và hỏi khi chưa rõ", detail: "Điều khoản có thể đổi. Chỗ chưa hiểu thì hỏi IT hoặc pháp chế." },
          { label: "Bỏ bớt phần nhạy cảm hoặc dùng dữ liệu giả", detail: "Cần AI dựng cấu trúc thì đưa mẫu với tên và số bịa, phần thật bạn tự điền." },
        ],
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Tìm chỗ bịa trong bản ghi chú về dữ liệu",
        task: "Một đồng nghiệp nhờ AI viết ghi chú về chuyện dữ liệu cho cả nhóm. Bấm vào những câu bạn thấy không đáng tin rồi nộp.",
        segments: [
          { text: "Trước khi dán tài liệu, hãy xác định xem nó có chứa tên khách hàng hoặc số liệu nội bộ hay không." },
          { text: "Công cụ AI nào cũng cam kết tuyệt đối không bao giờ dùng nội dung bạn nhập để huấn luyện.", error: "Bịa và khái quát quá: cách xử lý khác nhau giữa các công cụ và gói, không ai nói thay được cho mọi công cụ." },
          { text: "Điều khoản dữ liệu của công cụ có thể thay đổi, nên hãy ghi lại ngày bạn đọc." },
          { text: "Chỉ cần xoá cuộc trò chuyện là dữ liệu bạn dán đã bị xoá khỏi mọi hệ thống của nhà cung cấp.", error: "Không chắc: xoá cuộc trò chuyện chưa chắc xoá bản lưu ở phía nhà cung cấp, cần đọc điều khoản về lưu trữ." },
          { text: "Khi chưa chắc, hãy hỏi phòng IT hoặc pháp chế và dùng dữ liệu giả trong lúc chờ." },
        ],
      },
      {
        type: "callout",
        label: "Những thứ không dán khi chưa được phép",
        text: "Danh sách khách kèm số điện thoại, hợp đồng có giá và tên đối tác, số liệu tài chính nội bộ chưa công bố, mật khẩu hay khoá truy cập, hồ sơ nhân sự. Nếu công ty đã có quy định riêng thì quy định đó đi trước bài này.",
      },
      {
        type: "comparison",
        left: {
          label: "Đọc điều khoản chính thức",
          text: "Có văn bản ràng buộc, có ngày cập nhật, đúng với gói bạn dùng. Mất vài phút nhưng bạn biết chắc mình đang đồng ý điều gì.",
        },
        right: {
          label: "Nghe lời đồn hoặc hỏi công cụ",
          text: "Nhanh nhưng có thể cũ, thuộc gói khác, hoặc là câu trả lời công cụ tự tạo ra. Không có gì để đưa cho pháp chế khi cần.",
        },
      },
      {
        type: "scenario",
        title: "Hợp đồng chiều nay cần tóm tắt",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn có một hợp đồng chứa giá và tên khách. Công cụ AI đã mở sẵn, còn ba tiếng nữa họp.",
            choices: [
              { label: "Dán nguyên hợp đồng vào vì chỉ cần tóm tắt nhanh", next: "bad_paste" },
              { label: "Tìm điều khoản dữ liệu của gói bạn đang dùng trước", next: "s2" },
            ],
          },
          bad_paste: {
            text: "Bạn nhận được bản tóm tắt tốt. Nhưng sau đó trưởng phòng hỏi công cụ đó đã được duyệt chưa, và bạn không trả lời được gì.",
            ending: "bad",
          },
          s2: {
            text: "Bạn đọc điều khoản nhưng có một câu về lưu dữ liệu mà bạn chưa hiểu rõ.",
            choices: [
              { label: "Đoán là ổn rồi dán để kịp giờ họp", next: "bad_guess" },
              { label: "Hỏi phòng IT, trong lúc chờ thay tên và giá bằng dữ liệu giả để thử bố cục", next: "good" },
            ],
          },
          bad_guess: {
            text: "Bạn đoán sai. Hợp đồng nằm ở nơi công ty chưa cho phép, và bạn phải báo cáo sự việc cho quản lý.",
            ending: "bad",
          },
          good: {
            text: "IT trả lời trong buổi sáng. Bạn biết chắc loại tài liệu nào được dán và có bản tóm tắt đúng giờ họp.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Nhìn lại thứ định dán: có tên, số, giá, điều khoản nhạy cảm không.",
          "Bước 2 - Tìm điều khoản và cài đặt dữ liệu chính thức của đúng gói.",
          "Bước 3 - Ghi ngày đọc, hỏi IT hoặc pháp chế nếu chưa rõ.",
          "Bước 4 - Dùng dữ liệu giả cho phần cần thử.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Dữ liệu đã dán thì không lấy lại được, nên hỏi trước khi dán.",
          "Bài sau: gom những gì đã thử thành quy tắc chọn công cụ theo loại việc trong một trang.",
        ],
      },
    ],
  },
  {
    id: 2258,
    slug: "quy-tac-chon-cong-cu-theo-viec-mot-trang",
    title: "Chặng 42, Bài 19: Quy tắc chọn công cụ theo loại việc trong một trang",
    subtitle: "Gom những gì đã thử thành một trang: việc nào dùng công cụ nào, vì sao, để đồng nghiệp làm theo.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "📋",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bạn đã thử nhiều công cụ và có kinh nghiệm riêng, nhưng đồng nghiệp mới chưa biết. Một trang quy tắc ngắn giúp cả nhóm chọn đúng công cụ cho đúng việc mà không phải thử lại từ đầu, và giúp bạn nhìn ra chỗ mình chưa kiểm chứng.",
    openingQuestion:
      "Đồng nghiệp mới hỏi: 'Việc nào nên dùng công cụ nào?'. Cách trả lời hữu ích nhất là gì?",
    openingOptions: [
      "Đưa một trang ghi loại việc, công cụ đã dùng, lý do và cách kiểm lại",
      "Bảo họ cứ dùng công cụ nào cũng được vì đều làm được mọi việc",
      "Gửi danh sách tên các công cụ đang có trên thị trường cho họ",
      "Nói miệng công cụ bạn thích nhất rồi để họ tự làm theo",
    ],
    correctOption: 0,
    explanation:
      "Một trang có loại việc, công cụ, lý do và cách kiểm cho người mới thứ họ cần: quyết định đã được thử, kèm cách kiểm. Bảo công cụ nào cũng được bỏ qua chuyện mỗi công cụ hợp một loại việc khác nhau. Danh sách tên không nói việc nào hợp công cụ nào. Lời nói miệng chỉ chứa sở thích, không có lý do và mất khi bạn nghỉ.",
    diagram: [
      { label: "Liệt kê 5-6 loại việc nhóm hay làm", arrow: true },
      { label: "Ghi công cụ đã thử cho từng loại việc, kèm lý do", arrow: true },
      { label: "Ghi cách kiểm và loại dữ liệu được phép", arrow: true },
      { label: "Ghi ngày xem lại, chia sẻ cho nhóm" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một nhóm chăm sóc khách hàng 6 người, mỗi người tự chọn công cụ nên cùng một câu hỏi của khách nhận sáu kiểu trả lời. Một chị trong nhóm gom thành một trang: soạn thư dùng công cụ nào, tóm tắt cuộc gọi dùng công cụ nào, việc nào cấm dán dữ liệu khách. Nhờ trang đó người mới vào chỉ mất một buổi để làm theo.",
    },
    quiz: [
      {
        question: "Trang quy tắc chọn công cụ theo loại việc nên có ít nhất những cột nào?",
        options: [
          "Loại việc, công cụ đã thử, lý do chọn, cách kiểm lại và dữ liệu được phép dán",
          "Loại việc, tên công cụ, và người thích công cụ đó nhất trong nhóm",
          "Tên công cụ, giá và ngày nhóm bắt đầu sử dụng công cụ đó",
          "Tên người thích công cụ, giao diện đẹp hay xấu, số sao đánh giá",
        ],
        correct: 0,
        explanation:
          "Lý do, cách kiểm và loại dữ liệu là thứ khiến trang dùng được cho người khác. Hai cột loại việc và tên công cụ thì thiếu lý do và cách kiểm nên không ai biết vì sao chọn. Giá và ngày bắt đầu không giúp chọn việc, và sở thích cá nhân hay số sao không phải bằng chứng cho việc của nhóm.",
      },
      {
        question: "Một dòng trong trang ghi 'Tóm tắt biên bản: công cụ B, vì tốt hơn'. Điều gì còn thiếu?",
        options: [
          "Tốt hơn ở điểm nào, đo thế nào, và ngày đã thử",
          "Tên người đã thử và số lần người đó đã dùng công cụ",
          "Một câu khen công cụ B thật dài để người đọc tin",
          "Danh sách các công cụ khác mà nhóm chưa hề thử qua",
        ],
        correct: 0,
        explanation:
          "'Tốt hơn' phải đi với tiêu chí và ngày thử thì mới kiểm được và mới đổi được khi công cụ thay đổi. Tên người thử chỉ hữu ích phụ. Thêm lời khen không cho thêm thông tin, và liệt kê công cụ chưa thử làm trang dài mà không có bằng chứng.",
      },
      {
        question: "Bạn mới thử công cụ C cho một việc một lần. Ghi vào trang thế nào là trung thực?",
        options: [
          "Ghi rõ 'mới thử một lần, chưa đủ để kết luận'",
          "Ghi luôn 'công cụ C là lựa chọn tốt nhất cho việc này' cho trang trông chắc chắn hơn",
          "Không ghi gì, vì trang chỉ dành cho công cụ đã được thử kỹ nhiều lần",
          "Ghi công cụ C vào mọi dòng của trang để đồng nghiệp thử giúp mình",
        ],
        correct: 0,
        explanation:
          "Đánh dấu mức độ chắc chắn giúp người đọc biết chỗ nào cần kiểm thêm. Ghi 'tốt nhất' từ một lần thử là thổi phồng. Không ghi gì thì mất thông tin bạn đã có, và ghi công cụ C vào mọi dòng biến trang thành quảng cáo chứ không phải quy tắc.",
      },
      {
        question: "Bao lâu nên xem lại trang quy tắc một lần?",
        options: [
          "Đặt lịch xem lại định kỳ, vì công cụ và điều khoản thay đổi theo thời gian",
          "Không cần xem lại, vì quy tắc đã ghi thì đúng mãi",
          "Chỉ khi có người trong nhóm phàn nàn to tiếng về một công cụ",
          "Mỗi ngày, để trang luôn mới nhất và không lạc hậu chút nào so với các công cụ",
        ],
        correct: 0,
        explanation:
          "Công cụ đổi tính năng và điều khoản nên quy tắc cũ có thể sai. Đặt lịch, ví dụ một hoặc ba tháng, là cân bằng. Coi quy tắc đúng mãi thì lạc hậu. Chỉ đổi khi có người phàn nàn thì bỏ sót lỗi thầm lặng, còn mỗi ngày quá dày và không ai theo nổi.",
      },
      {
        question: "Đồng nghiệp muốn dùng công cụ ngoài trang cho một việc. Nhóm nên xử lý thế nào?",
        options: [
          "Cho thử theo cùng bảng tiêu chí, ghi kết quả rồi bổ sung vào trang",
          "Cấm hẳn, vì công cụ nào không có trong trang đều không đáng tin và có thể gây rủi ro",
          "Cho dùng ngay cho mọi việc mà không cần kiểm hay ghi lại gì",
          "Bảo họ hỏi lại sau ba tháng khi trang được xem lại lần sau",
        ],
        correct: 0,
        explanation:
          "Trang là tài liệu sống: công cụ mới thử theo cùng tiêu chí rồi bổ sung. Cấm hẳn khiến trang dừng lại và người dùng lén dùng ngoài tầm nhìn. Cho dùng ngay không kiểm thì bỏ qua rủi ro dữ liệu, còn bắt chờ ba tháng làm mất giá trị của kinh nghiệm hiện tại.",
      },
    ],
    keyTakeaways: [
      "Một trang, sáu dòng: loại việc, công cụ, lý do, cách kiểm, dữ liệu được phép, ngày thử.",
      "Ghi rõ mức chắc chắn: đã thử nhiều lần hay mới một lần.",
      "'Tốt hơn' phải đi với tiêu chí và ngày.",
      "Đặt lịch xem lại vì công cụ và điều khoản đổi.",
      "Công cụ mới đi qua cùng bảng tiêu chí rồi bổ sung vào trang.",
    ],
    practicePrompt: {
      question:
        "Trang của nhóm ghi 'Soạn email: dùng công cụ A'. Không có lý do hay ngày thử. Một tháng sau công cụ A đổi cách hoạt động. Vì sao trang này khó dùng?",
      options: [
        "Không có lý do và ngày thử nên không ai biết có nên còn tin dòng đó không",
        "Vì công cụ A chắc chắn là lựa chọn tệ và trang phải bỏ nó đi",
        "Vì một trang không nên chỉ có một dòng về việc soạn email",
        "Vì trang chưa nêu tên người viết nên không ai dám tin",
      ],
      correct: 0,
      explanation:
        "Không có lý do và ngày thì dòng đó không kiểm lại được khi công cụ đổi. Không có bằng chứng công cụ A tệ, số dòng không quyết định độ tin cậy, và tên người viết cũng không thay được lý do.",
    },
    summary: {
      keyIdea: "Biến kinh nghiệm cá nhân thành một trang quy tắc kiểm lại được cho cả nhóm.",
      formula: "Loại việc + công cụ + lý do + cách kiểm + dữ liệu được phép + ngày thử = một dòng dùng được.",
      commonMistake: "Ghi tên công cụ mà thiếu lý do và ngày thử, hoặc ghi 'tốt nhất' từ một lần thử.",
      action: "Viết một trang 5 dòng cho 5 việc bạn hay làm với AI nhất.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Mở một tài liệu trống và kẻ bảng 6 cột: loại việc, công cụ, lý do, cách kiểm, dữ liệu được phép, ngày thử. Điền 5 dòng từ những việc bạn đã làm với AI trong hai tuần qua. Dòng nào mới thử một lần thì ghi rõ. Gửi trang cho một đồng nghiệp và nhờ họ chỉ ra dòng nào họ không hiểu.",
      secondary: "Đặt lịch nhắc xem lại trang sau một tháng.",
    },
    sections: [
      {
        type: "lead",
        text: "Hai tuần qua bạn đã thử nhiều thứ: một công cụ cho email, một công cụ khác cho tóm tắt, một công cụ cho bảng biểu. Trong đầu bạn có sẵn kinh nghiệm, nhưng đồng nghiệp thì không. Hôm nay bạn viết nó ra một trang.",
      },
      {
        type: "feynman",
        title: "Trang quy tắc đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới hộp dụng cụ trong nhà. Cái búa dùng đóng đinh, cái tua vít dùng vặn ốc, và bạn dán một mẩu giấy ghi 'việc nào dùng cái nào, cẩn thận chỗ nào'. Người mới mở hộp ra là làm được, không cần hỏi.",
        columns: ["Phần", "Hộp dụng cụ", "Trang quy tắc công cụ AI"],
        rows: [
          ["Dụng cụ", "Búa, tua vít, kìm", "Các công cụ AI nhóm đã thử"],
          ["Việc hợp", "Đóng đinh, vặn ốc", "Soạn thư, tóm tắt, làm bảng so sánh"],
          ["Cẩn thận", "Đeo găng khi cắt", "Không dán dữ liệu khách, luôn kiểm số"],
          ["Mẩu giấy ghi chú", "Ngày và người thử dụng cụ", "Ngày thử và mức chắc chắn của dòng đó"],
        ],
        oneLiner: "Mỗi việc một công cụ, kèm lý do và điều cần cẩn thận, viết một lần cho cả nhóm.",
      },
      { type: "heading", text: "Một dòng tốt gồm những gì" },
      {
        type: "list",
        items: [
          "Loại việc: một việc cụ thể, ví dụ 'soạn email nhắc thanh toán', không phải 'viết lách'.",
          "Công cụ và lý do: vì sao chọn nó, bạn đã so với công cụ nào.",
          "Cách kiểm lại: số nào phải đối chiếu với bảng gốc, phần nào phải đọc từng chữ.",
          "Dữ liệu được phép: loại tài liệu nào dán được, loại nào không.",
          "Ngày thử và mức chắc chắn: mới thử một lần hay đã lặp lại.",
        ],
      },
      {
        type: "flow",
        title: "Từ những gì đã thử tới một trang dùng được",
        steps: [
          { label: "Liệt kê loại việc", detail: "Nhìn lại hai tuần qua, ghi 5-6 việc lặp lại nhất bạn đã làm với AI." },
          { label: "Ghi công cụ và lý do cho mỗi việc", detail: "Không ghi 'tốt hơn'. Ghi tốt ở điểm nào: nhanh hơn, ít sai số hơn, giọng đúng hơn." },
          { label: "Ghi cách kiểm và dữ liệu được phép", detail: "Đây là phần đồng nghiệp mới hay bỏ qua nhất và cần nhất." },
          { label: "Đánh dấu mức chắc chắn và ngày", detail: "Dòng nào mới thử một lần thì ghi rõ, để người khác biết chỗ nào cần kiểm thêm." },
          { label: "Chia sẻ, nhận góp ý, đặt lịch xem lại", detail: "Nhờ một người đọc thử và chỉ chỗ họ không hiểu; đặt lịch nhắc sau một tháng." },
        ],
      },
      {
        type: "callout",
        label: "Trang này không thay điều khoản",
        text: "Cột 'dữ liệu được phép' phải khớp với quy định của công ty và điều khoản của công cụ. Chưa chắc thì ghi 'chưa xác nhận, hỏi IT' thay vì đoán.",
      },
      {
        type: "comparison",
        left: {
          label: "Trang có lý do và ngày",
          text: "Người mới biết vì sao chọn, kiểm thế nào, dòng nào còn chưa chắc. Khi công cụ đổi thì biết dòng nào cần thử lại.",
        },
        right: {
          label: "Trang chỉ có tên công cụ",
          text: "Ngắn nhưng chỉ ghi kết luận. Không ai biết có nên tin, khi công cụ đổi cũng không biết dòng nào cần sửa.",
        },
      },
      {
        type: "scenario",
        title: "Đồng nghiệp mới đọc trang của bạn",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn vừa viết xong trang 5 dòng. Một đồng nghiệp mới hỏi: 'Cho em dùng công cụ D cho việc tóm tắt hợp đồng được không? Trang chưa nói gì về công cụ D.'",
            choices: [
              { label: "Bảo họ cứ dùng đi, chắc cũng giống công cụ khác", next: "bad_same" },
              { label: "Cho thử theo bảng tiêu chí và hỏi IT về dữ liệu hợp đồng", next: "s2" },
            ],
          },
          bad_same: {
            text: "Họ dán hợp đồng vào công cụ D mà chưa ai đọc điều khoản. Trang của bạn trở thành thứ nhóm nhắc tới sau sự cố, không phải trước.",
            ending: "bad",
          },
          s2: {
            text: "IT chưa xác nhận được loại dữ liệu nào dán vào công cụ D. Đồng nghiệp muốn thử ngay trên một hợp đồng thật để kịp việc.",
            choices: [
              { label: "Đồng ý để họ dán hợp đồng thật rồi hỏi IT sau", next: "bad_real" },
              { label: "Bảo họ thử trên hợp đồng mẫu đã bỏ tên và giá, chờ IT trả lời", next: "good" },
            ],
          },
          bad_real: {
            text: "Hợp đồng thật đã nằm trong công cụ chưa được xác nhận. Nếu IT trả lời là không được phép thì lúc đó đã quá muộn.",
            ending: "bad",
          },
          good: {
            text: "Họ có kết quả thử trên bản mẫu. Khi IT xác nhận, bạn thêm dòng công cụ D vào trang với ngày thử và mức chắc chắn.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Liệt kê 5-6 loại việc và công cụ đã thử.",
          "Bước 2 - Ghi lý do, cách kiểm và dữ liệu được phép.",
          "Bước 3 - Ghi ngày và mức chắc chắn.",
          "Bước 4 - Chia sẻ và đặt lịch xem lại.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Một trang có lý do và ngày thử đáng giá hơn mười lời khuyên miệng.",
          "Bài sau, bài tổng kết: báo cáo đề xuất công cụ AI cho nhóm của bạn.",
        ],
      },
    ],
  },
  {
    id: 2259,
    slug: "capstone-bao-cao-de-xuat-cong-cu-cho-nhom",
    title: "Chặng 42, Bài 20: Tổng kết: báo cáo đề xuất công cụ AI cho nhóm của bạn",
    subtitle: "Ba việc thật, một bảng tiêu chí, một dòng rủi ro dữ liệu và một cách kiểm lại sau một tháng.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🏁",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Cả chặng này dẫn tới một sản phẩm: báo cáo đề xuất một lựa chọn công cụ cho nhóm, dựa trên việc thật, số đo thật và rủi ro dữ liệu đã xét. Sếp đọc báo cáo này sẽ duyệt được hoặc hỏi ngược đúng chỗ, và bạn có sẵn câu trả lời.",
    openingQuestion:
      "Bạn viết báo cáo đề xuất công cụ AI cho nhóm. Phần nào không thể thiếu?",
    openingOptions: [
      "Kết quả ba việc thật chấm bằng tiêu chí, rủi ro dữ liệu và cách kiểm lại sau một tháng",
      "Danh sách tính năng đầy đủ của công cụ được chọn, lấy từ trang quảng cáo",
      "Nhiều lời khen của người dùng khác về công cụ, sưu tầm từ mạng",
      "Bảng giá của tất cả các gói mà công cụ đang bán trên thị trường",
    ],
    correctOption: 0,
    explanation:
      "Báo cáo thuyết phục khi dựa trên việc thật của nhóm, có tiêu chí chấm, nêu rõ rủi ro dữ liệu và có cách kiểm lại để sửa nếu sai. Danh sách tính năng từ trang quảng cáo nói về khả năng chung chứ không phải về việc của nhóm. Lời khen trên mạng là ý kiến của người khác, và bảng giá chỉ trả lời một phần câu hỏi về chi phí.",
    diagram: [
      { label: "Chọn ba việc thật của nhóm và chạy thử", arrow: true },
      { label: "Chấm bằng bảng tiêu chí, ghi cả điểm yếu", arrow: true },
      { label: "Ghi rủi ro dữ liệu và điều đã hỏi nhà cung cấp", arrow: true },
      { label: "Đề xuất một lựa chọn kèm cách kiểm lại sau một tháng" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một trưởng nhóm marketing 7 người thử hai công cụ trên ba việc thật: soạn bản tin tuần, tóm tắt khảo sát khách, dựng dàn ý bài đăng. Chị chấm bằng bốn tiêu chí, ghi một dòng rủi ro rằng khảo sát chứa thông tin khách nên chỉ dùng bản đã ẩn tên, và đề xuất dùng thử một tháng rồi đo lại. Sếp duyệt vì mọi con số đều kiểm được.",
    },
    quiz: [
      {
        question: "Vì sao báo cáo nên dựa trên ba việc thật của nhóm thay vì bài thử chung chung?",
        options: [
          "Việc thật cho thấy công cụ có hợp với cách nhóm làm và dữ liệu nhóm dùng hay không",
          "Vì ba việc thật luôn dễ hơn các bài thử chung nên cho kết quả đẹp hơn",
          "Vì sếp chỉ đọc báo cáo khi có đúng ba việc, không nhiều hơn",
          "Vì bài thử chung không được phép dùng với công cụ của nhóm",
        ],
        correct: 0,
        explanation:
          "Công cụ hợp hay không thể hiện trên chính công việc của nhóm. Việc thật thường khó hơn bài thử chung chứ không dễ hơn. Con số ba không phải quy định của sếp, chỉ là đủ để so sánh mà không quá dài. Và bài thử chung không bị cấm, chỉ là ít giá trị cho quyết định này.",
      },
      {
        question: "Bảng tiêu chí cho báo cáo nên chọn tiêu chí thế nào?",
        options: [
          "Vài tiêu chí đo được như đúng số, đúng giọng, thời gian kiểm lại, viết trước khi chạy thử",
          "Càng nhiều tiêu chí càng tốt, mười lăm hay hai mươi tiêu chí cũng được, để chấm thật kỹ mọi khía cạnh",
          "Chọn tiêu chí sau khi biết công cụ nào thắng để bảng nhìn hợp lý",
          "Chỉ dùng một tiêu chí duy nhất là 'bạn thấy thích công cụ nào hơn'",
        ],
        correct: 0,
        explanation:
          "Tiêu chí viết trước và đo được giữ cho việc chấm công bằng. Quá nhiều tiêu chí làm bảng khó dùng và loãng. Chọn tiêu chí sau khi biết kết quả là chỉnh bảng cho khớp kết luận. Một tiêu chí về cảm giác thích thì không kiểm được và không thuyết phục được sếp.",
      },
      {
        question: "Một công cụ chấm điểm cao nhất nhưng chưa xác nhận được dữ liệu khách hàng đi đâu. Đề xuất thế nào?",
        options: [
          "Nêu rõ rủi ro chưa xác nhận, chỉ dùng dữ liệu đã ẩn danh hoặc dữ liệu giả cho tới khi có trả lời",
          "Đề xuất luôn, vì điểm cao nhất tức là công cụ tốt nhất",
          "Giấu chuyện dữ liệu để báo cáo trông chắc chắn và dễ được duyệt",
          "Loại công cụ đó ngay, vì chưa xác nhận nghĩa là chắc chắn không an toàn",
        ],
        correct: 0,
        explanation:
          "Trung thực về điều chưa biết và nêu cách hạn chế rủi ro là đúng. Điểm cao không bù được rủi ro dữ liệu chưa xác nhận. Giấu rủi ro thì sếp duyệt trong khi thiếu thông tin. Loại ngay cũng sai vì chưa xác nhận chưa có nghĩa là không an toàn, chỉ có nghĩa là chưa biết.",
      },
      {
        question: "Vì sao báo cáo cần cách kiểm lại sau một tháng?",
        options: [
          "Vì lựa chọn hôm nay có thể sai và số đo sau một tháng cho biết có nên tiếp tục",
          "Vì sếp thường quên báo cáo nếu không có lịch",
          "Vì công cụ tự đổi hoàn toàn sau đúng ba mươi ngày dùng",
          "Vì đề xuất không có ngày xem lại thì không được coi là báo cáo hoàn chỉnh trong doanh nghiệp",
        ],
        correct: 0,
        explanation:
          "Một tháng dùng thật cho số liệu thật hơn buổi thử ban đầu, và đề xuất tự chịu kiểm chứng là đề xuất đáng tin. Lý do 'sếp quên' là chuyện nhỏ. Công cụ không tự đổi hoàn toàn theo một mốc nào. Và một báo cáo không có ngày xem lại vẫn là báo cáo, chỉ là kém chắc chắn hơn.",
      },
      {
        question: "Khi trình bày, con số nào nên đặt lên đầu báo cáo?",
        options: [
          "Số phút tiết kiệm ròng sau khi trừ thời gian kiểm lại, kèm cách bạn đo",
          "Số phút tiết kiệm lớn nhất từng đạt được trong một lần thử",
          "Số lượng tính năng mà công cụ được chọn quảng cáo",
          "Số người trên thế giới đang dùng công cụ được chọn mỗi ngày, lấy từ trang giới thiệu của nhà cung cấp",
        ],
        correct: 0,
        explanation:
          "Con số ròng kèm cách đo là thứ sếp kiểm được. Lần thử tốt nhất là ngoại lệ, không đại diện cho việc hằng tuần. Số tính năng và số người dùng nói về công cụ chung, không nói về giá trị với nhóm của bạn.",
      },
    ],
    keyTakeaways: [
      "Ba việc thật của nhóm, chấm bằng tiêu chí viết trước.",
      "Rủi ro dữ liệu ghi rõ, kể cả điều chưa xác nhận.",
      "Con số ròng kèm cách đo đứng đầu báo cáo.",
      "Đề xuất một lựa chọn, kèm ngày xem lại sau một tháng.",
      "Điều khoản và luật để pháp chế, IT xem; bạn mang câu hỏi và văn bản tới họ.",
    ],
    practicePrompt: {
      question:
        "Anh Bình viết báo cáo đề xuất công cụ cho nhóm nhưng chỉ có ý kiến 'cả nhóm thấy dùng tiện'. Điều quan trọng nhất còn thiếu là gì?",
      options: [
        "Kết quả chấm theo tiêu chí trên việc thật, rủi ro dữ liệu và cách kiểm lại",
        "Thêm nhiều ý kiến 'tiện' từ những người ở nhóm khác nữa",
        "Một trang giới thiệu dài về lịch sử của công cụ được chọn",
        "Ảnh chụp màn hình giao diện đẹp để sếp thấy hấp dẫn",
      ],
      correct: 0,
      explanation:
        "'Tiện' là cảm giác, chưa phải bằng chứng. Báo cáo cần kết quả đo, rủi ro và cách kiểm lại. Thêm ý kiến từ nhóm khác chỉ nhân cảm giác lên, lịch sử công cụ không liên quan tới quyết định, và ảnh giao diện không nói về chất lượng công việc.",
    },
    summary: {
      keyIdea: "Báo cáo đề xuất đáng tin gồm việc thật, tiêu chí đo được, rủi ro dữ liệu và ngày kiểm lại.",
      formula: "3 việc thật + bảng tiêu chí + dòng rủi ro dữ liệu + số ròng + lịch kiểm lại = báo cáo duyệt được.",
      commonMistake: "Đề xuất theo cảm giác, hoặc giấu điều chưa xác nhận về dữ liệu.",
      action: "Viết bản nháp một trang cho báo cáo, gồm ba việc thật của nhóm bạn.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Viết bản nháp báo cáo một trang: ba việc thật của nhóm bạn, bốn tiêu chí chấm, hai công cụ đã thử, một dòng rủi ro dữ liệu (kể cả điều chưa xác nhận) và ngày xem lại sau một tháng. Ở chỗ chưa có số đo, ghi 'chưa đo' thay vì đoán. Gửi cho một đồng nghiệp đọc và hỏi họ có tin được từng dòng không.",
      secondary: "Đánh dấu dòng nào cần hỏi phòng IT hoặc pháp chế.",
    },
    sections: [
      {
        type: "lead",
        text: "Sếp nói: 'Em đề xuất giúp anh một công cụ AI cho cả nhóm, trước thứ Sáu'. Suốt chặng này bạn đã thử, chấm, hỏi về dữ liệu và tính chi phí. Hôm nay gom tất cả thành một báo cáo một trang.",
      },
      {
        type: "feynman",
        title: "Báo cáo đề xuất đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới việc chọn một chiếc xe cho cả đội. Bạn không chỉ nhìn ảnh quảng cáo: bạn chạy thử trên đúng những con đường đội hay đi, chấm theo vài tiêu chí, hỏi kỹ điều khoản bảo hành và hẹn kiểm tra lại sau một tháng sử dụng.",
        columns: ["Bước", "Chọn xe cho đội", "Chọn công cụ AI cho nhóm"],
        rows: [
          ["Chạy thử", "Đường đội hay đi", "Ba việc thật của nhóm"],
          ["Chấm điểm", "Tiết kiệm xăng, chỗ ngồi, độ êm", "Đúng số, đúng giọng, thời gian kiểm lại"],
          ["Điều khoản", "Bảo hành, bảo hiểm", "Dữ liệu, quyền truy cập, người quản trị"],
          ["Kiểm lại", "Xem sau một tháng chạy", "Đo lại số phút ròng sau một tháng"],
        ],
        oneLiner: "Chạy thử trên đường thật, chấm theo tiêu chí, hỏi rõ điều khoản, hẹn ngày kiểm lại.",
      },
      { type: "heading", text: "Một trang báo cáo gồm những gì" },
      {
        type: "list",
        items: [
          "Ba việc thật: việc nhóm hay làm, nhóm đã thử trên công cụ nào.",
          "Bảng tiêu chí: bốn tiêu chí đo được, viết trước khi chạy thử, điểm của từng công cụ.",
          "Rủi ro dữ liệu: loại dữ liệu nào được dùng, điều đã hỏi, điều chưa xác nhận.",
          "Số ròng: phút tiết kiệm sau khi trừ thời gian kiểm lại, kèm cách đo.",
          "Đề xuất và ngày kiểm lại: một lựa chọn, một tháng dùng thử, số nào thì dừng hoặc tiếp tục.",
        ],
      },
      {
        type: "flow",
        title: "Từ ba việc thật tới báo cáo một trang",
        steps: [
          { label: "Chọn ba việc thật", detail: "Việc nhóm làm mỗi tuần, có kết quả kiểm được: soạn thư, tóm tắt, dàn ý." },
          { label: "Viết tiêu chí trước", detail: "Bốn tiêu chí đo được, ví dụ đúng số, đúng giọng, ít phải sửa, thời gian kiểm lại." },
          { label: "Chạy thử và chấm", detail: "Cho hai công cụ làm cùng ba việc, chấm từng kết quả theo tiêu chí, ghi cả điểm yếu." },
          { label: "Ghi rủi ro dữ liệu", detail: "Nêu điều đã hỏi và điều chưa xác nhận; chỗ chưa rõ ghi hỏi IT hoặc pháp chế." },
          { label: "Đề xuất và hẹn kiểm lại", detail: "Chọn một lựa chọn, dùng thử một tháng, đặt số nào thì tiếp tục, số nào thì dừng." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI dàn khung báo cáo đề xuất",
        task: "Bạn đã có kết quả chấm và ghi chú rủi ro. Lắp prompt để AI dàn khung báo cáo một trang, không tự thêm số.",
        parts: [
          {
            id: "input",
            label: "Thứ bạn đưa AI",
            options: [
              { text: "Viết báo cáo đề xuất công cụ AI cho nhóm marketing.", feedback: "Không có số đo nào, AI sẽ tự bịa điểm, phút tiết kiệm và cả lời khen." },
              { text: "Đây là bảng điểm của hai công cụ trên ba việc (dán), và ghi chú rủi ro dữ liệu của tôi (dán).", good: true, feedback: "AI làm việc trên số của bạn, không phải số nó tự nghĩ ra." },
            ],
          },
          {
            id: "rule",
            label: "Quy tắc cho AI",
            options: [
              { text: "Viết cho hấp dẫn để sếp chắc chắn duyệt.", feedback: "AI sẽ chọn lời lẽ tăng sức thuyết phục và có thể giấu chỗ yếu." },
              { text: "Chỉ dùng số tôi đưa; chỗ nào thiếu thì ghi 'chưa đo'; giữ nguyên dòng rủi ro chưa xác nhận.", good: true, feedback: "AI không được điền chỗ trống bằng số bịa và không giấu rủi ro." },
            ],
          },
          {
            id: "format",
            label: "Khuôn dạng",
            options: [
              { text: "Viết thành một bài văn liền mạch, càng dài càng thể hiện sự chuyên nghiệp.", feedback: "Khó đọc và khó kiểm; sếp phải lục tìm con số trong đoạn văn." },
              { text: "Một trang: bảng điểm, dòng rủi ro, số ròng, đề xuất, ngày kiểm lại sau một tháng.", good: true, feedback: "Sếp thấy ngay các phần cần duyệt và bạn kiểm từng phần được." },
            ],
          },
        ],
        responses: [
          {
            requires: ["input", "rule", "format"],
            text: "Báo cáo đề xuất (một trang)\n1. Bảng điểm: công cụ A 3,6/5, công cụ B 3,1/5 (số liệu bạn cung cấp).\n2. Rủi ro dữ liệu: khảo sát khách chưa xác nhận, chỉ dùng bản đã ẩn tên.\n3. Số ròng: chưa đo cho việc thứ ba.\n4. Đề xuất: dùng thử công cụ A một tháng.\n5. Kiểm lại: đo lại số phút ròng vào ngày xem lại.",
          },
          {
            requires: ["input"],
            text: "Công cụ A vượt trội hoàn toàn, mọi rủi ro đã được giải quyết, sếp có thể yên tâm duyệt ngay.\n\n(Có số của bạn nhưng bị viết cho hấp dẫn: giấu chỗ chưa xác nhận về dữ liệu.)",
          },
          {
            text: "Nghiên cứu cho thấy công cụ này giúp tăng 45% năng suất và được 90% người dùng đánh giá tốt...\n\n(Số bịa, không có nguồn, không khớp số đo của nhóm.)",
          },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Báo cáo dựa trên việc thật",
          text: "Có bảng điểm, dòng rủi ro rõ ràng, số ròng kèm cách đo và ngày kiểm lại. Sếp hỏi chỗ nào bạn cũng chỉ ra được nguồn.",
        },
        right: {
          label: "Báo cáo dựa trên cảm giác",
          text: "Nhiều lời khen, ít số. Không có dòng rủi ro và ngày kiểm lại nên nếu kết quả thật kém thì không ai biết lúc nào cần dừng.",
        },
      },
      {
        type: "scenario",
        title: "Hai ngày trước khi nộp báo cáo",
        start: "s1",
        nodes: {
          s1: {
            text: "Công cụ A có điểm cao nhất, nhưng bạn chưa có văn bản xác nhận về dữ liệu khảo sát khách hàng. Bản nháp báo cáo đang thiếu đúng dòng đó.",
            choices: [
              { label: "Bỏ dòng về dữ liệu, đề xuất công cụ A cho gọn", next: "bad_hide" },
              { label: "Ghi rõ 'chưa xác nhận' và hỏi IT trong lúc hoàn thiện báo cáo", next: "s2" },
            ],
          },
          bad_hide: {
            text: "Sếp duyệt mà không biết có điều chưa rõ. Một tuần sau ai đó dán khảo sát khách vào công cụ và phòng IT hỏi ai cho phép.",
            ending: "bad",
          },
          s2: {
            text: "IT chưa trả lời kịp trước hạn nộp. Sếp muốn biết bạn có đề xuất được không.",
            choices: [
              { label: "Đề xuất dùng thử với dữ liệu đã ẩn tên, việc có dữ liệu khách chờ IT xác nhận", next: "good" },
              { label: "Hoãn nộp cả báo cáo cho tới khi IT trả lời mọi thứ", next: "bad_wait" },
            ],
          },
          bad_wait: {
            text: "Báo cáo trễ hạn hai tuần dù hai việc đầu không dính dữ liệu khách. Nhóm mất thời gian mà vẫn chưa thử được gì.",
            ending: "bad",
          },
          good: {
            text: "Sếp duyệt dùng thử một tháng cho hai việc an toàn, việc thứ ba chờ IT. Bạn đặt lịch xem lại và đo số phút ròng.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Chọn ba việc thật và viết bốn tiêu chí.",
          "Bước 2 - Chạy thử, chấm, ghi cả điểm yếu.",
          "Bước 3 - Ghi rủi ro dữ liệu và điều chưa xác nhận.",
          "Bước 4 - Đề xuất một lựa chọn, hẹn ngày kiểm lại sau một tháng.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Báo cáo tốt là báo cáo mà mỗi con số đều có cách kiểm, kể cả con số bạn chưa có.",
          "Chặng sau: dùng công cụ AI vào việc hằng ngày với những thói quen bạn vừa xây.",
        ],
      },
    ],
  },
];
