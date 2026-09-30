import type { Lesson } from "../lesson-types";

// Chặng 30, bài 6-10. Giáo trình: scripts/curriculum/stage-30.json.
// Không dựa vào tính năng riêng của công cụ nào; chỉ dạy cách giao việc và kiểm kết quả.
// Ví dụ Amazon (bài 6) theo tường thuật của Reuters tháng 10/2018.
export const S30_B_LESSONS: Lesson[] = [
  {
    id: 2005,
    slug: "ai-loc-cv-va-thien-lech-ban-khong-thay",
    title: "Chặng 30, Bài 6: Khi AI xếp hạng CV: thiên lệch mà bạn không nhìn thấy",
    subtitle: "Nhóm đứng đầu giống nhau đến lạ: đổi đúng một thông tin rồi so kết quả.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "🔍",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Khi 50 hồ sơ được AI xếp hạng, bạn dễ tin vào thứ tự vì nó trông khách quan. Nhưng nếu thứ tự đó lệch mà bạn không biết, người giỏi bị loại ngay từ vòng đầu và không ai hay. Bài này cho bạn một phép thử làm được trong 10 phút, không cần biết code.",
    openingQuestion:
      "AI xếp hạng 50 CV. Mười người đứng đầu có 8 nam, và phần lớn cùng một trường. Bước hợp lý nhất bây giờ là gì?",
    openingOptions: [
      "Nộp ngay danh sách, vì máy không có định kiến như người",
      "Giữ nguyên nội dung một CV, chỉ đổi tên và giới, chạy lại để so",
      "Bỏ hết 40 CV còn lại vì nhóm đầu đã đủ người để phỏng vấn",
      "Hỏi AI 'bạn có thiên lệch không' và tin theo câu nó trả lời là xong",
    ],
    correctOption: 1,
    explanation:
      "Hai bản CV giống nhau từng chữ, chỉ khác một thông tin không liên quan tới việc, mà điểm khác nhau thì đó là bằng chứng thật, bạn nhìn thấy được bằng mắt. Tin rằng máy không có định kiến là sai, vì AI học từ hồ sơ trong quá khứ và bắt chước cả thói quen chọn người của quá khứ. Bỏ 40 CV còn lại là làm hỏng chính chỗ đang bị nghi ngờ. Hỏi AI tự đánh giá cũng không giúp: nó có thể trả lời rất tự tin mà chưa hề kiểm tra gì.",
    diagram: [
      { label: "AI xếp hạng 50 CV", arrow: true },
      { label: "Bạn thấy nhóm đầu giống nhau đáng ngờ", arrow: true },
      { label: "Đổi một thông tin, giữ nguyên phần còn lại, chạy lại", arrow: true },
      { label: "So điểm hai bản: lệch thì không tin thứ hạng" },
    ],
    realWorldExample: {
      company: "Amazon (2018, theo Reuters)",
      description:
        "Reuters đưa tin năm 2018 rằng Amazon từng thử một công cụ chấm hồ sơ tự động, học từ hồ sơ những người được nhận trong nhiều năm. Vì số người được nhận phần lớn là nam, công cụ bắt đầu trừ điểm những CV có chữ liên quan tới phụ nữ. Theo tường thuật, công ty đã bỏ công cụ đó. Bài học: dữ liệu quá khứ mang theo thói quen của quá khứ.",
    },
    quiz: [
      {
        question: "Vì sao AI xếp hạng CV có thể lệch dù không ai dặn nó phân biệt?",
        options: [
          "Nó học từ hồ sơ trước kia, nên bắt chước thói quen chọn người cũ",
          "Nó có cảm xúc riêng với từng ứng viên",
          "Bạn quên bật chế độ công bằng khi cài đặt",
          "Nó chỉ đọc được phần đầu của mỗi CV",
        ],
        correct: 0,
        explanation:
          "AI dự đoán theo mẫu đã thấy. Nếu người được nhận trước đây phần lớn cùng một nhóm, nó coi nhóm đó là dấu hiệu 'tốt'. Nó không có cảm xúc, và không có nút 'công bằng' để bật. Việc chỉ đọc đầu CV là vấn đề khác, gây thiếu sót chứ không gây lệch theo nhóm người.",
      },
      {
        question: "Cách kiểm thiên lệch đơn giản nhất mà không cần biết code?",
        options: [
          "Đọc kỹ phần giải thích của AI xem có từ ngữ nhạy cảm nào lọt vào hay không",
          "Chạy lại đúng prompt cũ; thấy kết quả giống nhau thì coi là công bằng",
          "Đổi một thông tin không liên quan tới việc rồi so điểm hai bản",
          "Hỏi thẳng AI xem thứ hạng của nó có công bằng hay không rồi tin câu trả lời",
        ],
        correct: 2,
        explanation:
          "Đổi đúng một thông tin (tên, giới, năm sinh) và giữ nguyên phần còn lại cho bạn một phép so sánh sạch. Đọc giải thích thì AI có thể viết lý do nghe hợp lý cho một kết quả đã lệch. Chạy lại y hệt chỉ cho biết nó nhất quán, không cho biết nó công bằng. Hỏi AI tự đánh giá thì bạn chỉ nhận lại một câu trả lời, không có bằng chứng.",
      },
      {
        question: "Hai CV giống hệt, chỉ đổi tên nam thành tên nữ, điểm giảm từ 82 xuống 71. Kết luận nào đúng?",
        options: [
          "Bằng chứng đủ chắc để kết luận AI phân biệt giới, bỏ hẳn công cụ",
          "Là dấu hiệu đáng ngờ, cần thử thêm vài cặp rồi mới kết luận",
          "Chỉ là ngẫu nhiên, lần chạy nào điểm cũng lệch chút ít",
          "Hợp lý, vì tên nữ thường đi kèm ít kinh nghiệm hơn",
        ],
        correct: 1,
        explanation:
          "Một cặp là tín hiệu, chưa phải kết luận: AI có thể cho điểm hơi khác giữa các lần chạy. Cách làm đúng là chạy cùng một CV hai lần để biết mức nhiễu bình thường, rồi thử thêm vài cặp. Kết luận ngay là vội. Coi là ngẫu nhiên khi chưa đo nhiễu cũng vội không kém. Còn nói tên nữ đi kèm ít kinh nghiệm là chính thiên lệch mà bạn đang tìm.",
      },
      {
        question: "Thông tin nào trong CV có thể vô tình thay cho tuổi?",
        options: [
          "Năm tốt nghiệp, vì từ đó suy ra tuổi gần đúng",
          "Số năm làm đúng vị trí đang tuyển dụng",
          "Chứng chỉ chuyên môn mà tin tuyển dụng yêu cầu",
          "Phần mềm mà ứng viên nêu là dùng thành thạo",
        ],
        correct: 0,
        explanation:
          "Năm tốt nghiệp gần như cho biết tuổi mà không ai ghi tuổi. Đó là 'thông tin thay thế': AI không thấy chữ 'tuổi' nhưng vẫn phân biệt qua nó. Ba mục còn lại gắn thẳng với việc và chính tin tuyển dụng đòi hỏi, nên giữ chúng không phải là thiên lệch.",
      },
      {
        question: "Ai chịu trách nhiệm cuối cùng khi một ứng viên bị loại theo thứ hạng của AI?",
        options: [
          "Người làm tuyển dụng, AI chỉ gợi ý",
          "Nhà cung cấp AI, vì họ viết ra thuật toán chấm điểm",
          "Trưởng phòng, vì chỉ trưởng phòng ký duyệt kết quả cuối",
          "Không ai cả, vì điểm số do máy tự động tính ra",
        ],
        correct: 0,
        explanation:
          "Quyết định loại hay giữ là của người dùng công cụ. Nhà cung cấp không ngồi trong quy trình của bạn, và câu 'máy tính ra' không chuyển được trách nhiệm. Trưởng phòng ký duyệt không xoá được phần bạn đã lọc trước đó.",
      },
    ],
    keyTakeaways: [
      "AI học từ quá khứ nên có thể mang theo thói quen chọn người của quá khứ.",
      "Phép thử: giữ nguyên CV, chỉ đổi một thông tin không liên quan, rồi so điểm.",
      "Chạy cùng một CV hai lần để biết mức nhiễu bình thường trước khi kết luận.",
      "Năm tốt nghiệp, tên trường, khu vực sống có thể thay cho tuổi hoặc xuất thân.",
      "Người làm tuyển dụng chịu trách nhiệm quyết định, không phải AI.",
    ],
    practicePrompt: {
      question:
        "Bạn chạy thử 6 cặp CV giống hệt chỉ khác giới. Có 2 cặp bản nữ thấp hơn vài điểm, 4 cặp bằng nhau. Bước tiếp theo hợp lý là gì?",
      options: [
        "Thử thêm vài cặp và chấm lại bằng bảng tiêu chí viết sẵn",
        "Kết luận AI thiên lệch toàn bộ rồi xoá hết kết quả chấm",
        "Coi 4 cặp bằng nhau là đủ chứng minh AI hoàn toàn công bằng",
        "Nhờ AI viết một lời giải thích để hồ sơ có vẻ hợp lý",
      ],
      correct: 0,
      explanation:
        "Sáu cặp cho thấy tín hiệu chứ chưa đủ để kết luận. Thử thêm cặp và dùng bảng tiêu chí do người viết trước vừa kiểm tiếp, vừa có phương án dự phòng. Xoá hết là phản ứng quá tay, coi 4 cặp bằng nhau là đủ thì bỏ qua 2 cặp lệch, còn nhờ AI giải thích là che vết thay vì sửa.",
    },
    summary: {
      keyIdea: "Thứ hạng của AI là ý kiến cần kiểm, không phải sự thật khách quan.",
      formula: "Giữ nguyên CV + đổi một thông tin không liên quan + so điểm = phép thử thiên lệch.",
      commonMistake: "Tin thứ hạng vì nó do máy tính ra, hoặc kết luận ngay từ một cặp duy nhất.",
      action: "Chọn 3 CV, nhân đôi mỗi cái, đổi tên, chạy và so điểm.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy 3 CV thật hoặc CV mẫu của phòng bạn, xoá thông tin nhận diện. Nhân đôi mỗi CV, bản sao chỉ đổi tên (nam sang nữ hoặc ngược lại). Nhờ công cụ AI công ty cho phép chấm cả 6 bản theo cùng một prompt và ghi điểm từng cặp vào một bảng hai cột.",
      secondary: "Ngày mai kể lại: cặp nào lệch, lệch mấy điểm, và bạn có thử chạy cùng một CV hai lần chưa.",
    },
    sections: [
      {
        type: "lead",
        text: "Thứ Hai bạn nhận 50 hồ sơ, AI trả về bảng xếp hạng gọn gàng. Bạn nhìn mười người đầu và thấy họ giống nhau lạ lùng. Bài này dạy bạn cách kiểm điều đó thay vì ngờ vực suông hoặc tin mù quáng.",
      },
      {
        type: "feynman",
        title: "Thiên lệch của AI đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung một nhân viên mới học nghề chỉ bằng cách xem lại hồ sơ của những người công ty đã nhận trong mười năm qua. Nếu người nhận trước đây thiên về một kiểu, anh ta sẽ tưởng đó là chuẩn.",
        columns: ["Điểm", "Nhân viên mới học từ hồ sơ cũ", "AI xếp hạng CV"],
        rows: [
          ["Học từ đâu", "Hồ sơ những người đã được nhận trước đó", "Dữ liệu quá khứ và hàng tỷ trang văn bản"],
          ["Điều nó rút ra", "Người như vậy thường được nhận, nên là tốt", "Mẫu chữ giống người thành công trong quá khứ thì điểm cao"],
          ["Rủi ro", "Chép lại thói quen chọn người cũ mà không biết", "Nhân lên thiên lệch cũ, trên cả 50 hồ sơ cùng lúc"],
          ["Cách kiểm", "Đưa hai hồ sơ giống hệt, khác một chi tiết, xem anh ta chấm sao", "Đổi một thông tin, giữ nguyên phần còn lại, so điểm"],
        ],
        oneLiner: "AI chấm CV như người học việc chỉ xem hồ sơ cũ: nó chép cả thói quen chọn người cũ, nên phải kiểm bằng cách đổi một chi tiết.",
      },
      { type: "heading", text: "Vấn đề: thứ hạng nghe rất khách quan" },
      {
        type: "paragraph",
        text: "Một con số điểm 82 nhìn công bằng hơn một cái gật đầu của người. Nhưng con số đó do một thứ đã học từ hồ sơ cũ tạo ra. Nếu hồ sơ cũ lệch thì điểm cũng lệch, chỉ là lệch có ghi số thập phân.",
      },
      { type: "heading", text: "Phép thử đổi một thông tin" },
      {
        type: "paragraph",
        text: "Bạn không cần biết AI bên trong chạy thế nào. Chỉ cần lấy một CV, làm bản sao giống từng chữ, đổi đúng một thông tin không liên quan tới việc (ví dụ tên, hoặc năm sinh), rồi cho chấm cả hai. Hai bản lẽ ra phải ra điểm gần nhau.",
      },
      {
        type: "flow",
        title: "Kiểm thiên lệch trong 5 bước",
        steps: [
          { label: "Chọn CV mẫu", detail: "Lấy 3 đến 5 CV đại diện, xoá số điện thoại, địa chỉ và số căn cước trước khi đưa vào công cụ." },
          { label: "Nhân đôi và đổi một chi tiết", detail: "Bản sao giống từng chữ, chỉ khác một thông tin như tên hoặc năm tốt nghiệp." },
          { label: "Đo mức nhiễu", detail: "Chạy cùng một CV hai lần với cùng prompt. Điểm lệch nhau bao nhiêu là mức bình thường của công cụ." },
          { label: "So từng cặp", detail: "Ghi điểm hai bản vào bảng. Lệch vượt mức nhiễu, lặp lại ở vài cặp, là dấu hiệu thiên lệch." },
          { label: "Quyết định", detail: "Có dấu hiệu thì đừng dùng thứ hạng đó để loại người; chấm bằng bảng tiêu chí viết sẵn và để người quyết." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Tín hiệu đáng lo",
          text: "Cùng nội dung, khác tên hoặc năm sinh mà điểm khác nhau rõ. Nhóm đầu giống nhau về trường, giới hoặc khu vực. Lý do AI đưa ra nhắc tới điều không liên quan tới việc.",
        },
        right: {
          label: "Chưa đủ để kết luận",
          text: "Một cặp lệch vài điểm, khi bạn chưa đo nhiễu. Nhóm đầu giống nhau vì tin tuyển dụng đòi chứng chỉ mà chỉ ít người có. Điểm khác giữa hai lần chạy y hệt nhau.",
        },
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát nhận xét của AI về bảng xếp hạng",
        task: "Dữ kiện thật của bạn: 50 CV (30 nam, 20 nữ); top 10 có 8 nam, 2 nữ. Bạn đổi tên trên 6 cặp CV: 2 cặp bản nữ thấp hơn 4 và 7 điểm, 4 cặp bằng nhau. Bạn chưa hề hỏi AI về nguyên nhân. Đánh dấu những câu AI tự thêm hoặc suy ra quá tay.",
        segments: [
          { text: "Bảng xếp hạng gồm 50 CV; 10 CV đứng đầu có 8 nam và 2 nữ." },
          { text: "Nam chiếm 60% số CV, nên top 10 lẽ ra có khoảng 6 nam; 8 nam là cao hơn mức đó." },
          {
            text: "AI đã tự kiểm tra và xác nhận thuật toán hoàn toàn không thiên lệch.",
            error: "Bạn chưa yêu cầu và AI không có cách tự kiểm; chính 2 trong 6 cặp của bạn đã lệch.",
          },
          { text: "Trong 6 cặp đổi tên, có 2 cặp bản nữ thấp hơn 4 và 7 điểm." },
          {
            text: "Vì vậy chắc chắn AI phân biệt giới trên toàn bộ 50 CV.",
            error: "Sáu cặp chỉ là tín hiệu; nói 'chắc chắn' cho cả 50 CV là suy ra quá tay.",
          },
          {
            text: "Nguyên nhân là người tuyển trước kia ở công ty bạn từng loại phụ nữ từ năm 2020.",
            error: "Không có dữ liệu nào nói về người tuyển trước kia hay năm 2020; đây là chi tiết AI bịa cho có nguyên nhân.",
          },
          { text: "Cần thử thêm nhiều cặp và dùng bảng tiêu chí viết sẵn trước khi tin thứ hạng." },
        ],
      },
      {
        type: "callout",
        label: "Nhớ",
        text: "Đây là bài tập kiểm tra công cụ, không phải bằng chứng pháp lý. Nếu nghi ngờ nghiêm trọng, hỏi bộ phận pháp chế hoặc nhân sự cấp cao trước khi kết luận với ai.",
      },
      {
        type: "scenario",
        title: "Danh sách phỏng vấn cần nộp chiều nay",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn đã thấy 2 trong 6 cặp CV bị lệch điểm. Sếp cần danh sách mười người phỏng vấn trước 5 giờ chiều.",
            choices: [
              { label: "Nộp luôn danh sách top 10 của AI cho kịp giờ", next: "bad_now" },
              { label: "Thử thêm 6 cặp nữa và chạy một CV hai lần để đo nhiễu", next: "s2" },
            ],
          },
          bad_now: {
            text: "Danh sách nộp đúng giờ. Tuần sau một trưởng phòng hỏi vì sao gần như không có ứng viên nữ, và bạn không có gì để trả lời ngoài 'AI xếp vậy'.",
            ending: "bad",
          },
          s2: {
            text: "Chạy cùng một CV hai lần chỉ lệch 1 điểm. Thêm 6 cặp mới thì có 3 cặp bản nữ thấp hơn 5 đến 9 điểm. Đã 4 giờ chiều.",
            choices: [
              { label: "Chấm lại bằng bảng tiêu chí viết sẵn, ẩn tên; AI chỉ tóm tắt, người chọn danh sách", next: "good" },
              { label: "Dặn AI 'hãy công bằng hơn' rồi lấy luôn thứ hạng mới", next: "bad_prompt" },
            ],
          },
          bad_prompt: {
            text: "Thứ hạng đổi vài chỗ, nhưng bạn không kiểm lại bằng phép thử. Lời dặn chung không cho bạn biết gì đã thay đổi; sự lệch có thể còn nguyên.",
            ending: "bad",
          },
          good: {
            text: "Danh sách nộp lúc 5 giờ kèm bảng ghi 12 cặp thử và cách chấm lại. Sếp hỏi đến đâu bạn trả lời được đến đó.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Thứ hạng của AI là ý kiến, không phải sự thật.",
          "Đổi một thông tin, giữ nguyên phần còn lại, rồi so điểm.",
          "Người quyết định, và người đó phải trả lời được vì sao.",
        ],
      },
    ],
  },
  {
    id: 2006,
    slug: "che-ten-va-thong-tin-ca-nhan-truoc-khi-dan-cv",
    title: "Chặng 30, Bài 7: Che thông tin cá nhân trước khi dán CV vào công cụ AI",
    subtitle: "Chấm CV chỉ cần kỹ năng và kinh nghiệm; số căn cước và địa chỉ nhà thì không.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🕶️",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "CV chứa nhiều thứ người nộp tin tưởng giao cho công ty: số căn cước, địa chỉ, số điện thoại, ngày sinh. Dán nguyên bản vào một công cụ bên ngoài là đưa những thứ đó ra khỏi tầm kiểm soát của bạn. Che trước tốn vài phút và không làm việc chấm kém đi.",
    openingQuestion:
      "Bạn định nhờ AI tóm tắt 12 CV, mỗi CV có số căn cước, địa chỉ nhà, số điện thoại và ảnh. Nên làm gì trước khi dán?",
    openingOptions: [
      "Dán nguyên bản cho AI đọc đầy đủ, vì thiếu thông tin thì chấm sai",
      "Xoá tên rồi dán, vì số căn cước và địa chỉ không ai nhận ra được",
      "Bỏ các trường nhận diện, chỉ giữ phần kỹ năng và kinh nghiệm",
      "Chỉ che số căn cước, vì địa chỉ và số điện thoại đâu có gì mật",
    ],
    correctOption: 2,
    explanation:
      "Để chấm một CV, AI cần kỹ năng, kinh nghiệm, học vấn và thành tích. Số căn cước, địa chỉ, số điện thoại, ngày sinh và ảnh không giúp gì cho việc chấm, chỉ tăng rủi ro nếu chúng nằm ở nơi bạn không kiểm soát được. Xoá mỗi tên là chưa đủ, vì những trường còn lại vẫn nhận ra người thật. Che riêng số căn cước cũng thiếu: số điện thoại, địa chỉ và ngày sinh đều là dữ liệu cá nhân.",
    diagram: [
      { label: "CV nguyên bản có đủ thông tin cá nhân", arrow: true },
      { label: "Bỏ trường nhận diện, gán mã ứng viên", arrow: true },
      { label: "AI chỉ thấy kỹ năng và kinh nghiệm", arrow: true },
      { label: "Bạn nối mã với tên ở bảng nội bộ" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một chuyên viên nhân sự dán 30 CV nguyên bản vào ứng dụng AI cá nhân để chấm cho nhanh. Sau đó phòng IT hỏi công cụ nào đang giữ dữ liệu ứng viên, và chị không trả lời được. Đây là tình huống minh hoạ, không phải một vụ việc có thật.",
    },
    quiz: [
      {
        question: "Nhóm trường nào bỏ được khỏi CV mà việc chấm không bị ảnh hưởng?",
        options: [
          "Ngành học, số năm kinh nghiệm và các dự án đã làm ở công ty gần nhất",
          "Số căn cước, địa chỉ nhà, số điện thoại và ảnh chân dung",
          "Kỹ năng phần mềm và các chứng chỉ mà tin tuyển dụng yêu cầu ứng viên",
          "Thành tích có số liệu của ứng viên",
        ],
        correct: 1,
        explanation:
          "Đó là những trường chỉ dùng để liên lạc hoặc nhận diện, không dùng để đánh giá năng lực. Ba nhóm còn lại chính là thứ bạn cần AI đọc để chấm; bỏ chúng thì việc chấm mất nghĩa.",
      },
      {
        question: "Vì sao nên giữ bảng nối 'mã ứng viên với tên thật' ở nơi ngoài công cụ AI?",
        options: [
          "Để sau khi chấm bạn nối kết quả với đúng người mà không đưa tên vào AI",
          "Vì công cụ AI không lưu được mã ứng viên",
          "Để AI tự nhớ được ai là ai giữa các lần trò chuyện khác nhau về sau này",
          "Vì bảng đó là bản sao dự phòng cho CV gốc",
        ],
        correct: 0,
        explanation:
          "Mã như UV-07 chỉ có nghĩa với bạn. Bảng nối để trong hệ thống công ty cho phép quay lại người thật mà AI không cần biết tên. Công cụ lưu mã được, nên lý do đó sai. AI không nên 'nhớ ai là ai', và bảng nối cũng không phải bản sao của CV.",
      },
      {
        question: "CV ghi 'Tốt nghiệp Kinh tế 2016, 8 năm làm kế toán tổng hợp'. Bạn nên giữ phần nào?",
        options: [
          "Xoá cả dòng vì có năm tốt nghiệp",
          "Chỉ giữ chữ 'kế toán' còn số năm bỏ đi",
          "Ngành học và số năm kinh nghiệm làm kế toán tổng hợp",
          "Giữ nguyên năm tốt nghiệp để AI biết ứng viên thuộc khoá nào",
        ],
        correct: 2,
        explanation:
          "Ngành và số năm kinh nghiệm gắn với việc, nên cần giữ. Năm tốt nghiệp thì suy ra được tuổi và không cần cho việc chấm, nên bỏ. Xoá cả dòng thì mất bằng chứng chính, còn bỏ số năm thì AI không phân biệt được người mới và người đã làm lâu.",
      },
      {
        question: "Bạn đã xoá tên, nhưng CV vẫn ghi 'trưởng nhóm 3 người, phòng kế toán chi nhánh Bình Dương, Công ty ABC'. Điều gì đúng?",
        options: [
          "Không sao, vì tên đã xoá thì không ai còn nhận ra được",
          "Chi tiết đó vẫn có thể chỉ ra một người cụ thể, nên cần nói chung hơn",
          "Chỉ cần lo khi CV ghi số điện thoại, còn chức danh thì an toàn",
          "AI không lưu chi tiết công ty nên nói cụ thể thế nào cũng được",
        ],
        correct: 1,
        explanation:
          "Nhiều chi tiết ghép lại vẫn nhận ra được một người: công ty, chi nhánh, vị trí và số người quản lý. Nên nói chung hơn, ví dụ 'trưởng nhóm ở một công ty sản xuất'. Xoá tên chưa đủ. Không có gì đảm bảo AI không lưu chi tiết đó.",
      },
      {
        question: "Ai quyết định được dùng công cụ AI nào với dữ liệu ứng viên?",
        options: [
          "Bộ phận IT hoặc pháp chế của công ty, không phải riêng bạn",
          "Người làm tuyển dụng, vì đó là công việc hằng ngày của chính họ",
          "Nhà cung cấp AI, thông qua điều khoản đồng ý khi tạo tài khoản",
          "Ứng viên, vì họ đã nộp CV cho công ty để công ty xử lý và lưu hồ sơ",
        ],
        correct: 0,
        explanation:
          "Dữ liệu ứng viên thuộc trách nhiệm của công ty, nên công cụ nào được dùng do IT hoặc pháp chế duyệt. Người tuyển dụng dùng công cụ đó, nhưng không tự chọn công cụ ngoài danh sách. Điều khoản của nhà cung cấp không thay quy định nội bộ, và việc ứng viên nộp CV cho công ty không có nghĩa là họ đồng ý cho mọi công cụ bên ngoài xử lý.",
      },
    ],
    keyTakeaways: [
      "Chấm CV chỉ cần kỹ năng, kinh nghiệm, học vấn và thành tích.",
      "Bỏ số căn cước, địa chỉ, số điện thoại, ngày sinh, ảnh, tình trạng hôn nhân.",
      "Thay tên bằng mã ứng viên; giữ bảng nối ở hệ thống công ty.",
      "Nhiều chi tiết nhỏ ghép lại vẫn nhận ra người thật: hãy nói chung hơn.",
      "Công cụ nào được dùng với dữ liệu ứng viên do IT hoặc pháp chế quyết định.",
    ],
    practicePrompt: {
      question:
        "Một CV có: họ tên, ngày sinh, số điện thoại, ngành học, 5 năm làm nhân viên kho, chứng chỉ an toàn lao động. Trường nào bỏ được mà vẫn chấm?",
      options: [
        "Họ tên, ngày sinh, số điện thoại",
        "Ngành học và chứng chỉ an toàn lao động",
        "Số năm làm nhân viên kho tại công ty cũ",
        "Tất cả, để AI chấm không thiên vị ai",
      ],
      correct: 0,
      explanation:
        "Tên, ngày sinh và số điện thoại không giúp đánh giá năng lực. Ngành học, chứng chỉ và số năm làm kho là bằng chứng năng lực. Bỏ tất cả thì AI không còn gì để chấm.",
    },
    summary: {
      keyIdea: "Đưa cho AI đúng phần cần để chấm, giữ phần nhận diện ở lại hệ thống công ty.",
      formula: "Bỏ trường nhận diện + gán mã + giữ bảng nối ngoài công cụ = chấm được mà không lộ người.",
      commonMistake: "Chỉ xoá tên rồi coi như đã ẩn danh trong khi địa chỉ, công ty cụ thể vẫn còn.",
      action: "Ghi ra 6 trường bạn sẽ luôn bỏ trước khi đưa CV cho công cụ nào.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy một CV bạn được phép dùng (của chính mình hoặc CV mẫu). Gạch bỏ mọi trường nhận diện, đặt mã UV-01, ghi lại 3 chi tiết còn có thể nhận ra người thật và viết lại cho nói chung hơn. Sau đó ghi ra một tờ 'danh sách trường luôn bỏ' để dùng lại.",
      secondary: "Hỏi IT hoặc pháp chế: công cụ AI nào công ty cho dùng với CV, và có được dùng không.",
    },
    sections: [
      {
        type: "lead",
        text: "Sáng nay bạn nhận 12 CV và định dán hết vào một ứng dụng AI để chấm cho nhanh. Trước khi bấm dán, bạn cần biết mỗi CV đang chứa những gì mà việc chấm không cần.",
      },
      {
        type: "feynman",
        title: "Che thông tin đơn giản hơn bạn nghĩ",
        intro:
          "Trước khi photo một tờ phiếu đưa người ngoài xem, bạn dán băng keo lên phần nhạy cảm và chỉ chừa phần người xem cần. Che CV cũng vậy.",
        columns: ["Điểm", "Photo phiếu có dán băng keo", "CV trước khi dán vào AI"],
        rows: [
          ["Thứ giấu", "Số tài khoản, địa chỉ nhà", "Số căn cước, địa chỉ, số điện thoại, ngày sinh, ảnh"],
          ["Thứ chừa lại", "Phần nội dung người xem cần đọc", "Kỹ năng, kinh nghiệm, học vấn, thành tích"],
          ["Cách nối lại", "Bạn giữ bản gốc trong ngăn kéo", "Bạn giữ bảng mã và tên trong hệ thống công ty"],
          ["Lỗi hay gặp", "Quên che số nhỏ ở góc tờ giấy", "Xoá tên nhưng còn công ty, chi nhánh, chức danh cụ thể"],
        ],
        oneLiner: "Đưa cho AI phần cần để chấm; phần nhận diện thì để lại ở nơi bạn kiểm soát.",
      },
      { type: "heading", text: "Vì sao không dán nguyên bản" },
      {
        type: "paragraph",
        text: "Dán vào ô chat là gửi nội dung ra một hệ thống bên ngoài công ty. Ứng viên nộp CV cho công ty bạn, không phải cho mọi công cụ bên ngoài. Vậy phần bạn không thật sự cần thì đừng gửi.",
      },
      {
        type: "list",
        items: [
          "Bỏ hẳn: số căn cước, địa chỉ nhà, số điện thoại, email, ngày sinh, ảnh, tình trạng hôn nhân.",
          "Thay bằng mã: họ tên thành UV-01, UV-02 và tiếp tục.",
          "Nói chung hơn: 'trưởng nhóm phòng kế toán chi nhánh Bình Dương của Công ty ABC' thành 'trưởng nhóm kế toán ở một công ty sản xuất'.",
          "Giữ nguyên: ngành học, số năm kinh nghiệm, kỹ năng, chứng chỉ, thành tích có số liệu.",
        ],
      },
      {
        type: "flow",
        title: "Từ CV nguyên bản tới bảng điểm theo mã",
        steps: [
          { label: "Đọc CV, đánh dấu trường nhận diện", detail: "Gạch mọi thứ cho biết người đó là ai hoặc liên lạc bằng cách nào." },
          { label: "Gán mã, lập bảng nối", detail: "Tạo bảng hai cột 'mã' và 'tên' trong file của công ty, không đưa bảng này cho AI." },
          { label: "Nói chung hơn chi tiết định danh", detail: "Đổi tên công ty, chi nhánh, tên đội thành mô tả chung nhưng giữ nguyên ý về năng lực." },
          { label: "Đưa bản đã che cho công cụ được duyệt", detail: "Chỉ dùng công cụ mà IT hoặc pháp chế cho phép với dữ liệu ứng viên." },
          { label: "Nối kết quả với bảng tên", detail: "Nhận bảng điểm theo mã, rồi tự tra tên ở bảng nối để liên hệ ứng viên." },
        ],
      },
      {
        type: "callout",
        label: "Hỏi người có chuyên môn",
        text: "Dữ liệu ứng viên có thể chịu quy định về bảo vệ dữ liệu cá nhân. Bài này không nêu điều luật nào: hãy hỏi pháp chế hoặc bộ phận phụ trách bảo mật của công ty bạn về việc được dùng công cụ nào.",
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI chấm CV đã che theo tiêu chí",
        task: "Bạn có 3 CV đã che (UV-01 đến UV-03) cho vị trí kế toán tổng hợp. Lắp prompt để AI chấm và ghi bằng chứng, không đụng tới thông tin cá nhân.",
        parts: [
          {
            id: "data",
            label: "Dữ liệu đưa vào",
            options: [
              { text: "Dán CV nguyên bản có tên và số căn cước để AI biết rõ từng người.", feedback: "Đưa thông tin nhận diện ra ngoài mà việc chấm không cần." },
              {
                text: "Đưa 3 bản đã che, chỉ có mã UV, kỹ năng, kinh nghiệm và học vấn.",
                good: true,
                feedback: "AI có đủ để chấm, và không có gì trong đó nhận ra được người thật.",
              },
            ],
          },
          {
            id: "task",
            label: "Việc cần làm",
            options: [
              { text: "Chọn giúp tôi người tốt nhất.", feedback: "Bạn giao luôn quyết định, và không biết vì sao AI chọn." },
              {
                text: "Chấm từng CV theo 3 tiêu chí tôi đưa, mỗi điểm kèm câu trích từ CV làm bằng chứng.",
                good: true,
                feedback: "Bạn kiểm được từng điểm bằng cách đối chiếu câu trích với CV.",
              },
            ],
          },
          {
            id: "limit",
            label: "Giới hạn",
            options: [
              { text: "Không cần dặn thêm gì.", feedback: "AI có thể tự suy ra đặc điểm cá nhân từ chi tiết còn lại." },
              {
                text: "Chỉ dùng thông tin trong CV, không suy đoán tuổi hay giới; thiếu thông tin thì ghi 'không có'.",
                good: true,
                feedback: "Giới hạn này giảm suy đoán và biến chỗ thiếu thành ô 'không có' dễ nhận ra.",
              },
            ],
          },
        ],
        responses: [
          {
            requires: ["data", "task", "limit"],
            text: "UV-01: Kỹ năng lập báo cáo tài chính: 4/5. Bằng chứng: 'lập báo cáo quý cho 3 công ty con'. Kinh nghiệm: 4/5.\nUV-02: Kỹ năng lập báo cáo tài chính: 2/5. Bằng chứng: 'hỗ trợ nhập liệu'. Thiếu bằng chứng về báo cáo.\nUV-03: Không có thông tin về kinh nghiệm quản lý.",
          },
          {
            requires: ["data"],
            text: "UV-02 phù hợp nhất vì có vẻ chăm chỉ và trẻ trung...\n(AI tự thêm 'trẻ trung' không có trong CV, và bạn không thấy bằng chứng cho lựa chọn đó.)",
          },
          {
            text: "Người số 2 là tốt nhất vì có kinh nghiệm dày dạn và tính cách phù hợp.\n(Không có bằng chứng nào từ CV; AI tự đoán tính cách.)",
          },
        ],
      },
      {
        type: "scenario",
        title: "12 CV, một chiều thứ Sáu",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn có 12 CV PDF nguyên bản và định dán vào một ứng dụng AI cá nhân trên điện thoại để chấm nhanh trước giờ về.",
            choices: [
              { label: "Dán nguyên bản cả 12 CV vào ứng dụng đó cho kịp giờ", next: "bad_paste" },
              { label: "Hỏi IT công cụ nào được duyệt và tự chuẩn bị bản đã che", next: "s2" },
            ],
          },
          bad_paste: {
            text: "Bản chấm ra nhanh, nhưng 12 người vừa gửi số căn cước, địa chỉ và số điện thoại vào một dịch vụ công ty không kiểm soát. Tuần sau IT hỏi bạn đã dùng công cụ nào.",
            ending: "bad",
          },
          s2: {
            text: "IT chỉ cho công cụ được duyệt. Khi che, bạn thấy CV số 7 ghi 'trưởng nhóm 3 người, chi nhánh Bình Dương, Công ty ABC, sinh năm 1995'.",
            choices: [
              { label: "Chỉ xoá họ tên, còn lại giữ nguyên rồi dán", next: "bad_partial" },
              { label: "Xoá tên, năm sinh, địa chỉ, số điện thoại, ảnh; nói chung hơn chi tiết công ty và chi nhánh; đặt mã UV", next: "s3" },
            ],
          },
          bad_partial: {
            text: "Người quen ở Bình Dương đọc bản chấm thấy ngay đó là ai. Che nửa vời không làm CV ẩn danh.",
            ending: "bad",
          },
          s3: {
            text: "AI trả bảng điểm theo mã UV-01 đến UV-12. Bạn cần thư mời cho 4 người điểm cao nhất.",
            choices: [
              { label: "Lấy 4 mã điểm cao, tự tra tên ở bảng nối trong file công ty rồi soạn thư mời", next: "good" },
              { label: "Dán bảng nối mã và tên vào AI để nó soạn luôn thư mời cho từng người", next: "bad_link" },
            ],
          },
          bad_link: {
            text: "Bạn vừa đưa ngược lại toàn bộ tên vào công cụ ngoài, mất hết công che ban đầu.",
            ending: "bad",
          },
          good: {
            text: "Bảng điểm không có thông tin nhận diện, còn tên người nằm trong file công ty. Bạn gửi thư mời trước giờ về mà dữ liệu vẫn trong tầm kiểm soát.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Chấm CV cần kỹ năng, không cần số căn cước.",
          "Xoá tên chưa đủ: chi tiết ghép lại vẫn nhận ra người.",
          "Bảng nối mã với tên ở lại hệ thống công ty.",
        ],
      },
    ],
  },
  {
    id: 2007,
    slug: "soan-bo-cau-hoi-phong-van-theo-tinh-huong",
    title: "Chặng 30, Bài 8: Soạn bộ câu hỏi phỏng vấn theo tình huống thật của vị trí",
    subtitle: "Thay 'điểm mạnh điểm yếu' bằng những tình huống mà người đó sẽ gặp ngay tuần đầu.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "🎯",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Câu hỏi chung chung nhận câu trả lời học thuộc, và ba ứng viên nghe giống nhau. Câu hỏi lấy từ tình huống thật của phòng cho bạn thấy người ta nghĩ và làm ra sao. AI viết nháp rất nhanh, nhưng chỉ bạn biết tình huống nào thật.",
    openingQuestion:
      "Buổi phỏng vấn nào cũng có câu 'điểm mạnh, điểm yếu của bạn là gì?'. Vì sao câu này ít giúp bạn chọn người?",
    openingOptions: [
      "Ứng viên nào cũng chuẩn bị sẵn câu mẫu, nên các câu trả lời nghe giống nhau",
      "Vì ứng viên thường quên mất điểm mạnh của chính mình",
      "Vì câu này bị cấm trong mọi cuộc phỏng vấn",
      "Vì AI không viết được câu trả lời cho câu hỏi này",
    ],
    correctOption: 0,
    explanation:
      "Đây là câu ai cũng biết trước, nên ai cũng có câu trả lời trau chuốt và bạn không phân biệt được người thật sự làm giỏi với người nói giỏi. Câu hỏi tình huống khó chuẩn bị sẵn hơn vì đòi họ nghĩ theo bối cảnh của bạn. Không có quy định nào cấm câu hỏi này, và việc ứng viên quên điểm mạnh của mình không phải vấn đề chính. AI viết được câu trả lời cho câu này rất dễ, đó cũng là lý do câu trả lời dễ giống nhau.",
    diagram: [
      { label: "Chọn 3 tình huống thật của phòng", arrow: true },
      { label: "Nhờ AI viết câu hỏi và dấu hiệu tốt, kém", arrow: true },
      { label: "Bạn loại câu đời tư, câu không thật", arrow: true },
      { label: "Hỏi mọi ứng viên cùng bộ câu hỏi" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một trưởng phòng hành chính đổi câu 'kể về bản thân' thành 'hôm thứ Sáu có hai giám đốc cùng đặt phòng họp lúc 2 giờ, bạn làm gì?'. Ứng viên buộc phải nghĩ tại chỗ. Đây là tình huống minh hoạ, không phải một vụ việc có thật.",
    },
    quiz: [
      {
        question: "Vì sao 'điểm mạnh điểm yếu' ít giúp phân biệt ứng viên?",
        options: [
          "Ai cũng chuẩn bị sẵn câu mẫu nên các câu trả lời nghe giống nhau",
          "Vì câu này không liên quan tới bất cứ công việc nào",
          "Vì ứng viên thường không biết điểm yếu của mình",
          "Vì câu này chỉ hợp với sinh viên mới ra trường",
        ],
        correct: 0,
        explanation:
          "Câu quen thuộc thì ai cũng luyện, nên bạn nghe được khả năng nói chứ chưa nghe được khả năng làm. Câu này vẫn liên quan tới công việc ở mức chung, ứng viên có kinh nghiệm cũng trả lời được, và nhiều người biết rõ điểm yếu mà vẫn nói theo mẫu.",
      },
      {
        question: "Câu hỏi tình huống tốt cho vị trí hành chính là câu nào?",
        options: [
          "Bạn sẽ làm gì nếu hai trưởng phòng cùng đặt phòng họp lúc 2 giờ chiều thứ Sáu?",
          "Bạn nghĩ mình là người như thế nào khi làm việc chung với các đồng nghiệp trong nhóm?",
          "Bạn có thích làm việc nhóm hơn là tự làm một mình ở những dự án dài hạn của công ty không?",
          "Bạn dự định sẽ gắn bó với công ty này trong bao nhiêu năm tới nếu được nhận vào làm?",
        ],
        correct: 0,
        explanation:
          "Câu đầu có bối cảnh cụ thể, buộc người trả lời chọn và giải thích cách làm. Ba câu còn lại quá chung, chỉ cần trả lời 'có' hoặc nói mỹ từ, và câu cuối là dự đoán tương lai chứ không phải bằng chứng năng lực.",
      },
      {
        question: "AI đưa 8 câu hỏi. Câu nào bạn phải bỏ ngay?",
        options: [
          "'Bạn từng nghỉ việc vì lý do gì ở công ty gần nhất?'",
          "'Bạn sẽ ưu tiên thế nào khi nhận ba yêu cầu gấp cùng lúc?'",
          "'Bạn định bao giờ kết hôn và sinh con?'",
          "'Kể một lần bạn phát hiện số liệu sai sau khi đã gửi đi.'",
        ],
        correct: 2,
        explanation:
          "Câu về kết hôn và sinh con là chuyện đời tư, không liên quan tới năng lực làm việc và dễ dẫn tới loại người theo lý do không chính đáng. Ba câu còn lại đều xoay quanh cách làm việc: lý do nghỉ việc, ưu tiên khi bị dồn việc, xử lý khi có sai sót.",
      },
      {
        question: "Vì sao nên hỏi mọi ứng viên cùng một bộ câu hỏi theo cùng thứ tự?",
        options: [
          "Để tiết kiệm thời gian soạn câu hỏi cho từng người phỏng vấn trong ngày",
          "Để so sánh công bằng vì mọi người cùng một đề bài",
          "Để ứng viên không nhận ra bạn đang chấm điểm",
          "Để AI tự tổng hợp kết quả mà không cần đọc lại",
        ],
        correct: 1,
        explanation:
          "Cùng đề bài mới so sánh được. Tiết kiệm thời gian là lợi ích phụ, không phải lý do chính. Ứng viên không cần bị giấu chuyện chấm điểm, và AI không thể thay bạn đọc lại ghi chú.",
      },
      {
        question: "Trước khi dùng một câu hỏi do AI viết, kiểm gì đầu tiên?",
        options: [
          "Câu nghe có hay, có chuyên nghiệp và có giống những mẫu phỏng vấn thường thấy hay không",
          "Câu có đủ dài để ứng viên nghĩ lâu không",
          "Tình huống có thật ở phòng mình, và bạn biết câu trả lời tốt trông thế nào",
          "Câu đó có xuất hiện trong nhiều cuộc phỏng vấn khác không",
        ],
        correct: 2,
        explanation:
          "AI có thể bịa một tình huống nghe rất thật nhưng phòng bạn không hề có, và bạn sẽ không chấm nổi câu trả lời. Nghe hay hay đủ dài không quyết định chất lượng. Câu xuất hiện ở nhiều nơi lại là dấu hiệu ứng viên đã luyện sẵn.",
      },
    ],
    keyTakeaways: [
      "Câu hỏi tình huống lấy từ việc thật của phòng, không phải câu ai cũng luyện sẵn.",
      "Mỗi câu kèm dấu hiệu trả lời tốt và dấu hiệu trả lời kém, viết trước khi phỏng vấn.",
      "Bỏ mọi câu về đời tư, tuổi, hôn nhân, kế hoạch sinh con.",
      "Hỏi cùng bộ câu, cùng thứ tự cho mọi ứng viên.",
      "AI viết nháp; bạn kiểm tình huống có thật và câu trả lời tốt trông thế nào.",
    ],
    practicePrompt: {
      question:
        "Bạn cần tuyển nhân viên kho. Tình huống nào nên dùng để hỏi?",
      options: [
        "Hàng nhập về thiếu 20 thùng so với phiếu, xe chờ nhận sau 30 phút, bạn làm gì?",
        "Bạn có khoẻ mạnh không, có con nhỏ không?",
        "Nếu bạn là siêu nhân, bạn sẽ làm gì cho kho?",
        "Bạn nghĩ gì về tương lai của ngành logistics?",
      ],
      correct: 0,
      explanation:
        "Câu đầu là tình huống có thể xảy ra tuần đầu ở kho, có thể chấm bằng cách xử lý. Câu về con nhỏ là chuyện đời tư, câu siêu nhân vô nghĩa với công việc, còn câu tương lai ngành quá rộng và chỉ đo khả năng nói.",
    },
    summary: {
      keyIdea: "Hỏi bằng tình huống thật của phòng, rồi chấm bằng dấu hiệu viết trước.",
      formula: "Tình huống thật + câu hỏi + dấu hiệu tốt, kém = một câu hỏi dùng được.",
      commonMistake: "Dùng nguyên câu AI viết mà không kiểm tình huống có thật hay không.",
      action: "Viết ra 3 tình huống gần nhất khiến phòng bạn phải quyết định gấp.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một vị trí phòng bạn đang tuyển hoặc sắp tuyển. Viết 3 tình huống thật đã xảy ra ở phòng (bỏ tên người). Nhờ công cụ AI viết mỗi tình huống thành một câu hỏi kèm dấu hiệu trả lời tốt và kém, rồi gạch bỏ câu nào bạn không chấm nổi.",
      secondary: "Ngày mai kể lại: bạn giữ mấy câu trong 3 câu, và bỏ câu nào vì sao.",
    },
    sections: [
      {
        type: "lead",
        text: "Buổi phỏng vấn thứ ba trong tuần, và bạn lại thấy mình hỏi 'điểm mạnh, điểm yếu của bạn là gì?'. Ba câu trả lời nghe gần như giống nhau. Bài này giúp bạn đổi bộ câu hỏi trong 20 phút.",
      },
      {
        type: "feynman",
        title: "Câu hỏi tình huống đơn giản hơn bạn nghĩ",
        intro:
          "Thi bằng lái xe không hỏi 'bạn lái xe giỏi không?'. Người ta cho bạn ngồi vào xe và chạy sa hình. Hỏi tình huống cũng là cho ứng viên 'chạy sa hình' bằng lời.",
        columns: ["Điểm", "Thi lái xe", "Phỏng vấn theo tình huống"],
        rows: [
          ["Câu chung chung", "'Bạn lái có giỏi không?'", "'Điểm mạnh điểm yếu của bạn là gì?'"],
          ["Câu cụ thể", "Chạy hình số 8, lùi vào chuồng", "Hai trưởng phòng cùng đặt phòng họp lúc 2 giờ"],
          ["Bạn thấy gì", "Cách người ta thật sự xử lý", "Cách người ta nghĩ và ưu tiên"],
          ["Người chấm", "Có bảng lỗi viết sẵn", "Có dấu hiệu tốt, kém viết sẵn"],
        ],
        oneLiner: "Hỏi bằng tình huống thật giống thi sa hình: bạn xem cách họ làm, không nghe họ tự khen.",
      },
      { type: "heading", text: "Bắt đầu từ việc thật của phòng" },
      {
        type: "paragraph",
        text: "Ngồi viết ba tình huống đã thật sự xảy ra trong 3 tháng qua: một việc gấp, một lần sai sót, một lần hai người cần cùng một thứ. Bỏ tên, giữ chi tiết. Đây là nguyên liệu, và AI không thể tự bịa ra nguyên liệu này giúp bạn.",
      },
      {
        type: "flow",
        title: "Từ ba tình huống tới bộ câu hỏi",
        steps: [
          { label: "Viết 3 tình huống thật", detail: "Mỗi tình huống 2 đến 3 câu: chuyện gì xảy ra, ai cần gì, hạn chót là khi nào." },
          { label: "Nhờ AI viết thành câu hỏi", detail: "Mỗi câu hỏi kèm dấu hiệu trả lời tốt và dấu hiệu trả lời kém, dựa trên chính tình huống bạn đưa." },
          { label: "Bạn soát từng câu", detail: "Bỏ câu đời tư, câu tình huống không có thật ở phòng, câu bạn không biết chấm ra sao." },
          { label: "Chốt bộ 5 đến 6 câu", detail: "Chọn số ít câu để mỗi câu được hỏi kỹ, cùng thứ tự cho mọi ứng viên." },
        ],
      },
      { type: "heading", text: "Câu hỏi tốt có ba phần" },
      {
        type: "list",
        items: [
          "Bối cảnh cụ thể: có ai, có hạn chót, có thứ đang thiếu.",
          "Một câu hỏi rõ: 'Bạn sẽ làm gì trước, vì sao?' hoặc 'Kể một lần bạn gặp việc tương tự'.",
          "Dấu hiệu chấm viết trước: người trả lời tốt thường nêu điều gì, người trả lời kém thường bỏ sót điều gì.",
        ],
      },
      {
        type: "callout",
        label: "Không hỏi",
        text: "Tuổi, hôn nhân, kế hoạch sinh con, tôn giáo, sức khoẻ cá nhân. Những câu này không đo năng lực và dễ dẫn tới loại người vì lý do không chính đáng. Nếu AI viết ra, hãy xoá.",
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI viết câu hỏi cho vị trí nhân viên hành chính",
        task: "Phòng bạn tuyển một nhân viên hành chính. Ba tình huống thật: hai trưởng phòng cùng đặt phòng họp; phát hiện nhập nhầm số liệu sau khi đã gửi; nhận yêu cầu gấp lúc 4 giờ chiều. Lắp prompt để AI viết bộ câu hỏi dùng được.",
        parts: [
          {
            id: "context",
            label: "Bối cảnh",
            options: [
              { text: "Viết câu hỏi phỏng vấn nhân viên hành chính.", feedback: "AI trả về câu chung chung tìm thấy ở đâu cũng có, vì không biết việc thật của phòng." },
              {
                text: "Vị trí nhân viên hành chính. Ba tình huống thật của phòng: hai trưởng phòng cùng đặt phòng họp; nhập nhầm số liệu sau khi gửi; yêu cầu gấp lúc 4 giờ chiều.",
                good: true,
                feedback: "AI có đúng nguyên liệu thật để viết câu hỏi bám việc.",
              },
            ],
          },
          {
            id: "task",
            label: "Việc cần làm",
            options: [
              {
                text: "Mỗi tình huống viết một câu hỏi, kèm 2 dấu hiệu trả lời tốt và 2 dấu hiệu trả lời kém.",
                good: true,
                feedback: "Bạn có cả câu hỏi và thước chấm, không phải chờ đến lúc nghe câu trả lời mới nghĩ cách chấm.",
              },
              { text: "Cho tôi thật nhiều câu hỏi hay.", feedback: "Nhiều câu mà không có thước chấm chỉ làm bạn ngợp." },
            ],
          },
          {
            id: "limit",
            label: "Giới hạn",
            options: [
              { text: "Muốn câu hỏi độc đáo, khác mọi nơi.", feedback: "Đòi độc đáo dễ khiến AI bịa tình huống lạ không có ở phòng bạn." },
              {
                text: "Chỉ dùng ba tình huống tôi đưa; không hỏi đời tư, tuổi hay hôn nhân; nếu thiếu thông tin thì hỏi lại tôi.",
                good: true,
                feedback: "Rào lại phạm vi, loại câu đời tư và cho AI cách xử lý khi thiếu dữ kiện.",
              },
            ],
          },
        ],
        responses: [
          {
            requires: ["context", "task", "limit"],
            text: "Câu 1 (phòng họp): 'Hai trưởng phòng cùng đặt phòng họp lúc 2 giờ chiều thứ Sáu. Bạn làm gì trước?'\nDấu hiệu tốt: hỏi mức độ quan trọng của từng cuộc họp; đề xuất phòng khác. Dấu hiệu kém: tự chọn một người mà không báo người kia.\nCâu 2 (số liệu): 'Bạn phát hiện đã gửi nhầm số liệu. Bạn làm gì?'...",
          },
          {
            requires: ["context"],
            text: "1. Hãy kể về điểm mạnh của bạn.\n2. Bạn xử lý áp lực thế nào?\n(Có nhắc tình huống của bạn nhưng chưa có thước chấm, và vẫn lẫn câu chung.)",
          },
          {
            text: "1. Bạn có định kết hôn trong hai năm tới không?\n2. Bạn nghĩ gì về ngành hành chính hiện đại?\n(AI không biết việc thật của phòng nên viết câu chung, thậm chí có câu đời tư.)",
          },
        ],
      },
      {
        type: "scenario",
        title: "Bản nháp AI viết cho bạn lúc 4 giờ chiều",
        start: "s1",
        nodes: {
          s1: {
            text: "AI trả 8 câu hỏi. Bạn thấy 2 câu trùng ý, 1 câu hỏi 'bạn có định sinh con không', và 1 tình huống về 'khách VIP ở tầng 30' mà phòng bạn không có.",
            choices: [
              { label: "Đọc lướt thấy nghe hay, in luôn để phỏng vấn ngày mai", next: "bad_print" },
              { label: "Xoá câu đời tư và câu không thật, gộp câu trùng, ghi thước chấm cho từng câu còn lại", next: "s2" },
            ],
          },
          bad_print: {
            text: "Ngày mai ứng viên hỏi 'khách VIP tầng 30 là gì?', và câu hỏi đời tư khiến một ứng viên phản ánh với nhân sự. Bạn phải xin lỗi và làm lại.",
            ending: "bad",
          },
          s2: {
            text: "Còn 5 câu. Trưởng phòng muốn thêm 'câu hỏi sáng tạo' cho thú vị.",
            choices: [
              { label: "Thêm câu 'nếu là một loài động vật, bạn là con gì' cho vui", next: "bad_fun" },
              { label: "Giữ 5 câu, hỏi mọi ứng viên cùng thứ tự và ghi bằng chứng cho từng câu", next: "good" },
            ],
          },
          bad_fun: {
            text: "Câu đó không đo được gì về việc, ba ứng viên trả lời ba kiểu và bạn không có thước để so.",
            ending: "bad",
          },
          good: {
            text: "Bộ 5 câu bám việc thật, ai cũng nhận cùng đề bài. Sau buổi phỏng vấn bạn so được ba ứng viên bằng ghi chú, không bằng cảm giác.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Hỏi bằng tình huống thật, chấm bằng dấu hiệu viết trước.",
          "Bỏ mọi câu đời tư dù AI viết ra rất tự nhiên.",
          "Cùng bộ câu hỏi, cùng thứ tự cho mọi ứng viên.",
        ],
      },
    ],
  },
  {
    id: 2008,
    slug: "cham-diem-phong-van-khong-bi-anh-huong-cam-tinh",
    title: "Chặng 30, Bài 9: Chấm điểm phỏng vấn mà không bị ấn tượng đầu chi phối",
    subtitle: "Ghi bằng chứng trước, kết luận sau: người nói duyên nhất chưa chắc làm tốt nhất.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "📝",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Sau ba buổi phỏng vấn, bạn nhớ người nói chuyện duyên nhất và quên người kể được ví dụ cụ thể. Nếu chọn theo trí nhớ, bạn chọn theo cảm giác. Một phiếu chấm ghi bằng chứng trước đưa bạn về đúng những gì ứng viên đã nói và làm.",
    openingQuestion:
      "Sau ba buổi phỏng vấn, bạn nhớ rõ nhất ứng viên B vì nói chuyện rất duyên. Bạn nên làm gì trước khi chốt?",
    openingOptions: [
      "Chốt B vì cảm giác đầu tiên của người làm nghề thường đúng, khỏi cân nhắc",
      "Mở ghi chú, xếp bằng chứng của từng người theo từng tiêu chí trước",
      "Hỏi AI ai là người tốt nhất rồi làm theo câu trả lời",
      "Gọi lại B để hỏi xem B còn muốn vào công ty hay không",
    ],
    correctOption: 1,
    explanation:
      "Nhớ ai nhất không cho biết ai làm tốt nhất, vì trí nhớ nghiêng về người gây thiện cảm. Đưa bằng chứng từng người ra cạnh nhau theo cùng tiêu chí cho bạn một phép so sánh mà cảm giác không lấn át được. Chốt theo cảm giác đầu là chính cái bẫy cần tránh. Hỏi AI thì nó chỉ tóm lại từ ghi chú bạn đưa, và nếu ghi chú nghiêng theo cảm giác thì nó nghiêng theo. Gọi lại B chưa giúp so sánh với hai người còn lại.",
    diagram: [
      { label: "Ghi bằng chứng trong lúc phỏng vấn", arrow: true },
      { label: "Chấm điểm từng tiêu chí theo bằng chứng", arrow: true },
      { label: "Cộng điểm, đặt cạnh nhau, rồi mới kết luận", arrow: true },
      { label: "Lệch cảm giác thì đi tìm bằng chứng, không đổi điểm" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một trưởng nhóm phỏng vấn ba người trong một buổi chiều. Cuối ngày chị nhớ người thứ hai vì hay cười và kể chuyện vui, nhưng ghi chú cho thấy người thứ ba đã kể cụ thể cách xử lý 40 kiện hàng gửi sai địa chỉ. Đây là tình huống minh hoạ, không phải một vụ việc có thật.",
    },
    quiz: [
      {
        question: "Vì sao sau nhiều buổi phỏng vấn bạn dễ chọn người 'nói chuyện duyên'?",
        options: [
          "Trí nhớ nghiêng về người gây thiện cảm, không phải người làm tốt nhất",
          "Người nói chuyện duyên luôn làm việc giỏi hơn người khác",
          "Vì ghi chú của người khác thường quá dài nên khó đọc",
          "Vì chỉ có người nói duyên mới nhớ được câu hỏi của bạn",
        ],
        correct: 0,
        explanation:
          "Thiện cảm để lại dấu ấn mạnh, còn bằng chứng cụ thể phai nhanh. Duyên trong lời nói không đảm bảo làm giỏi, ghi chú dài không phải nguyên nhân chính, và người khác vẫn nhớ câu hỏi của bạn bình thường.",
      },
      {
        question: "Nguyên tắc chính của phiếu chấm là gì?",
        options: [
          "Ghi kết luận ngay sau buổi phỏng vấn cho khỏi quên",
          "Chờ gặp đủ cả ba ứng viên rồi mới chấm một lượt để thấy rõ ai hơn ai",
          "Ghi bằng chứng trong lúc phỏng vấn, chấm điểm và kết luận sau",
          "Ghi cảm nhận chung thay vì chi tiết vì chi tiết quá nhiều",
        ],
        correct: 2,
        explanation:
          "Bằng chứng ghi lúc đang nghe chính xác hơn nhiều so với hồi tưởng. Kết luận ngay sau buổi thì dễ bị ấn tượng đầu chi phối. Chờ đủ ba người thì trí nhớ đã phai. Chỉ ghi cảm nhận chung thì phiếu mất tác dụng.",
      },
      {
        question: "Ô bằng chứng nào ghi đúng?",
        options: [
          "'Rất tự tin, trả lời trôi chảy, giữ được ánh mắt và mỉm cười suốt buổi phỏng vấn'",
          "'Kể lần khách gửi sai 40 kiện, tự gọi hãng vận chuyển, giao lại sau 2 ngày'",
          "'Có vẻ là người chịu khó, chăm chỉ và sẵn sàng làm thêm giờ'",
          "'Gây ấn tượng tốt ngay từ phút đầu tiên khi bước vào phòng'",
        ],
        correct: 1,
        explanation:
          "Bằng chứng là điều ứng viên đã nói hoặc làm, ghi đủ để người khác đọc và tự đánh giá. 'Tự tin', 'chịu khó' và 'ấn tượng tốt' là nhận xét của bạn, không phải bằng chứng.",
      },
      {
        question: "Trong bảng điểm minh hoạ, B được điểm giao tiếp cao nhất nhưng tổng điểm thấp hơn C. Điều đó nói gì?",
        options: [
          "Tổng điểm bị tính sai, nên cần chấm lại cho B cao hơn để cho công bằng",
          "Giao tiếp là tiêu chí quan trọng nhất trong mọi vị trí nên phải chọn B",
          "Điểm tổng vốn không cần thiết, chỉ tiêu chí cuối cùng mới thật sự quan trọng",
          "B nổi ở một tiêu chí, còn C có bằng chứng tốt hơn ở tiêu chí khác",
        ],
        correct: 3,
        explanation:
          "Mỗi người mạnh ở chỗ khác nhau, và phiếu giúp thấy rõ. Đổi điểm cho khớp cảm giác là làm hỏng công cụ. Nếu chỉ giao tiếp là tiêu chí thì ngay từ đầu bạn đã không cần các tiêu chí khác, và điểm tổng là thứ giúp so cân bằng.",
      },
      {
        question: "Bạn nhận ra mình muốn nâng điểm của B lên cho khớp cảm giác. Nên làm gì?",
        options: [
          "Nâng điểm, vì cảm giác của người phỏng vấn cũng là dữ liệu",
          "Tìm lại bằng chứng cho tiêu chí đó, không có thì để điểm thấp",
          "Xoá phiếu chấm đi và chọn người theo ý mình cho nhanh gọn hơn nhiều",
          "Nhờ AI nâng điểm giúp để trông khách quan hơn",
        ],
        correct: 1,
        explanation:
          "Cảm giác có thể đưa bạn tới chỗ cần kiểm thêm, nhưng điểm phải dựa trên bằng chứng. Nếu không có bằng chứng thì điểm không thể cao. Xoá phiếu là bỏ luôn công cụ, còn nhờ AI nâng điểm chỉ khoác vẻ khách quan cho quyết định theo cảm tính.",
      },
    ],
    keyTakeaways: [
      "Ấn tượng đầu và sự dễ mến kéo bạn về phía người nói duyên, chưa chắc người làm tốt.",
      "Ghi bằng chứng ngay trong lúc phỏng vấn, chấm điểm và kết luận sau.",
      "Bằng chứng là điều ứng viên nói hoặc làm, không phải nhận xét của bạn.",
      "Muốn nâng điểm cho khớp cảm giác thì đi tìm bằng chứng, đừng đổi điểm.",
      "AI có thể sắp xếp ghi chú, nhưng không thay bạn ghi lúc nghe.",
    ],
    practicePrompt: {
      question:
        "Ghi chú nào nên nằm trong ô bằng chứng của phiếu chấm?",
      options: [
        "'Kể lần tự sửa lỗi bảng lương trước giờ chốt, báo lại kế toán trưởng'",
        "'Nói chuyện rất cuốn hút'",
        "'Có vẻ chịu được áp lực'",
        "'Hợp gu với cả phòng'",
      ],
      correct: 0,
      explanation:
        "Chỉ câu đầu là điều ứng viên đã làm và người khác kiểm lại được. Ba câu còn lại là nhận xét cảm tính, không có gì để đối chiếu.",
    },
    summary: {
      keyIdea: "Bằng chứng trước, điểm số giữa, kết luận sau cùng.",
      formula: "Ghi điều ứng viên nói và làm → chấm từng tiêu chí → cộng điểm → so → kết luận.",
      commonMistake: "Chốt theo người nhớ nhất rồi mới tìm lý do cho lựa chọn đó.",
      action: "Dựng một phiếu ba cột: tiêu chí, bằng chứng, điểm.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy buổi phỏng vấn gần nhất của bạn (hoặc một buổi giả định). Dựng phiếu ba cột với 4 tiêu chí: tiêu chí, bằng chứng, điểm 1 đến 5. Điền lại bằng ghi chú bạn còn có, ô nào không có bằng chứng thì ghi 'chưa có', và xem kết luận có đổi không.",
      secondary: "Ngày mai kể lại: bạn thấy ô nào trống nhất, và người nào bạn từng nhớ nhất giờ xếp thứ mấy.",
    },
    sections: [
      {
        type: "lead",
        text: "Chiều nay bạn phỏng vấn ba người. Đến tối bạn nhớ rõ người thứ hai vì cô ấy nói rất duyên, còn người thứ ba thì mờ hẳn. Bài này dạy bạn dựng một phiếu để bằng chứng được nhớ thay cho cảm giác.",
      },
      {
        type: "feynman",
        title: "Chấm phỏng vấn theo bằng chứng đơn giản hơn bạn nghĩ",
        intro:
          "Thợ sửa xe giỏi ghi 'phanh kêu lạch cạch khi xuống dốc' trước khi kết luận 'mòn má phanh'. Nếu kết luận trước rồi mới tìm triệu chứng, họ dễ đổi nhầm phụ tùng.",
        columns: ["Điểm", "Thợ sửa xe", "Người chấm phỏng vấn"],
        rows: [
          ["Ghi trước", "Triệu chứng: tiếng kêu, độ rung", "Bằng chứng: điều ứng viên nói và làm"],
          ["Kết luận sau", "Chẩn đoán từ nhiều triệu chứng", "Điểm từng tiêu chí, rồi mới tổng hợp"],
          ["Cạm bẫy", "Nhìn xe cũ, tưởng hỏng máy", "Thấy người duyên, tưởng làm giỏi"],
          ["Thứ giữ đúng", "Sổ ghi chép ngay tại xưởng", "Phiếu ghi ngay trong buổi phỏng vấn"],
        ],
        oneLiner: "Ghi điều thấy trước, kết luận sau: phiếu chấm là sổ của thợ sửa xe cho buổi phỏng vấn.",
      },
      { type: "heading", text: "Vì sao ấn tượng đầu nguy hiểm" },
      {
        type: "paragraph",
        text: "Người dễ mến để lại dấu ấn mạnh, và dấu ấn đó lan sang cả những tiêu chí họ chưa được kiểm. Bạn nghĩ 'người này giỏi giao tiếp' rồi vô tình nghĩ luôn 'chắc cũng làm tốt việc'. Phiếu chấm ngăn sự lan đó bằng cách buộc bạn trả lời từng tiêu chí riêng.",
      },
      {
        type: "chart",
        title: "Ba ứng viên, bốn tiêu chí (số liệu minh hoạ)",
        caption: "Số liệu minh hoạ, thang 1 đến 5. B gây ấn tượng nhờ giao tiếp; C có bằng chứng tốt hơn ở xử lý tình huống và chuyên môn.",
        kind: "bar",
        yLabel: "Điểm (1 đến 5)",
        data: [
          { label: "Xử lý tình huống", values: [3, 2, 4] },
          { label: "Giao tiếp", values: [3, 5, 3] },
          { label: "Kiến thức chuyên môn", values: [3, 2, 5] },
          { label: "Làm việc nhóm", values: [4, 4, 3] },
        ],
        seriesLabels: ["Ứng viên A", "Ứng viên B", "Ứng viên C"],
      },
      {
        type: "paragraph",
        text: "Nhìn biểu đồ: B cao nhất ở giao tiếp nhưng thấp ở hai tiêu chí gắn với việc. Tổng điểm của A, B, C lần lượt là 13, 13 và 15. Nếu chọn theo trí nhớ, bạn chọn B; theo phiếu, C có nhiều bằng chứng hơn.",
      },
      {
        type: "flow",
        title: "Một buổi phỏng vấn với phiếu chấm",
        steps: [
          { label: "Trước buổi", detail: "Chốt 4 tiêu chí gắn với việc thật và in phiếu ba cột: tiêu chí, bằng chứng, điểm." },
          { label: "Trong buổi", detail: "Ghi điều ứng viên nói hoặc làm, gần đúng lời họ. Chưa ghi chữ 'giỏi' hay 'tốt'." },
          { label: "Ngay sau buổi", detail: "Đọc lại bằng chứng và chấm từng tiêu chí trước khi gặp người tiếp theo." },
          { label: "Sau khi đủ người", detail: "Đặt các phiếu cạnh nhau, so theo từng tiêu chí rồi mới tổng hợp." },
          { label: "Kiểm lại cảm giác", detail: "Nếu vẫn muốn chọn người khác điểm cao nhất, tìm bằng chứng còn thiếu thay vì đổi điểm." },
        ],
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát phiếu chấm do AI dựng từ ghi chú của bạn",
        task: "Ghi chú thật của bạn: C kể một lần khách gửi sai địa chỉ 40 kiện, tự liên hệ hãng vận chuyển, giao lại trong 2 ngày; C nói chưa dùng Excel nâng cao. B nói chuyện trôi chảy nhưng chưa nêu ví dụ cụ thể khi hỏi tình huống. Đánh dấu những dòng AI tự thêm hoặc kết luận trước bằng chứng.",
        segments: [
          { text: "Ứng viên C kể một lần khách gửi sai địa chỉ 40 kiện và tự liên hệ hãng vận chuyển." },
          { text: "C giao lại hàng trong 2 ngày." },
          {
            text: "C thành thạo Excel nâng cao, từng làm báo cáo tự động cho cả công ty.",
            error: "Ghi chú nói C chưa dùng Excel nâng cao; AI thêm một kỹ năng và một thành tích không hề có.",
          },
          {
            text: "C đạt 5/5 về giao tiếp vì trả lời rất tự tin.",
            error: "Ghi chú không có bằng chứng về giao tiếp của C; 'tự tin' là ấn tượng của AI, không phải điều C đã nói hoặc làm.",
          },
          { text: "Xử lý tình huống của C: 4/5, dựa trên ví dụ 40 kiện gửi sai địa chỉ." },
          { text: "Ứng viên B nói chuyện trôi chảy nhưng chưa nêu ví dụ cụ thể khi được hỏi tình huống." },
          {
            text: "B chắc chắn là người phù hợp nhất vì có thiện cảm ngay từ phút đầu.",
            error: "Kết luận đến trước bằng chứng: thiện cảm phút đầu không phải điều B đã làm, và ghi chú còn nói B chưa nêu ví dụ.",
          },
        ],
      },
      {
        type: "scenario",
        title: "Tối thứ Năm, ba phiếu trên bàn",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn vừa phỏng vấn xong ba người. Bạn nhớ B nhất, nhưng ghi chú cho thấy C có bằng chứng tốt hơn ở hai tiêu chí.",
            choices: [
              { label: "Chọn B vì nhớ nhất, còn phiếu chỉ để lưu hồ sơ", next: "bad_memory" },
              { label: "Xếp bằng chứng từng người theo từng tiêu chí rồi cộng điểm", next: "s2" },
            ],
          },
          bad_memory: {
            text: "B vào làm, nhưng ba tuần sau bạn thấy B chưa từng đưa được ví dụ cụ thể về việc đã làm, đúng điều phiếu đã cho thấy mà bạn bỏ qua.",
            ending: "bad",
          },
          s2: {
            text: "Tổng điểm C cao nhất. Sếp lại muốn B vì 'duyên' và đề nghị bạn nâng điểm cho B.",
            choices: [
              { label: "Nâng điểm giao tiếp của B lên thêm để khớp ý sếp", next: "bad_inflate" },
              { label: "Trình sếp bảng bằng chứng, đề nghị vòng hai cho B và C ở tiêu chí làm việc nhóm", next: "good" },
            ],
          },
          bad_inflate: {
            text: "Phiếu chấm bị đổi theo ý muốn. Từ lần sau không ai còn tin điểm trong phiếu.",
            ending: "bad",
          },
          good: {
            text: "Sếp thấy bằng chứng cạnh nhau, chấp nhận vòng hai. Quyết định dựa trên điều hai người đã làm chứ không dựa trên cảm giác.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Ghi bằng chứng trước, kết luận sau.",
          "Muốn đổi điểm cho khớp cảm giác thì đi tìm bằng chứng.",
          "Người nói duyên nhất chưa chắc là người làm tốt nhất.",
        ],
      },
    ],
  },
  {
    id: 2009,
    slug: "mini-project-phieu-phong-van-mot-vi-tri",
    title: "Chặng 30, Bài 10: Mini project: phiếu phỏng vấn hoàn chỉnh cho một vị trí",
    subtitle: "Trong 20 phút: tiêu chí, câu hỏi, phiếu chấm và mẫu ghi chú sau buổi.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "📋",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bốn bài trước dạy từng mảnh. Bài này ghép chúng thành một bộ dùng ngay cho buổi phỏng vấn tuần sau, và dùng lại cho mọi buổi sau đó. Bạn làm ra một thứ cầm đi được, thay vì chỉ biết thêm một khái niệm.",
    openingQuestion:
      "Bạn cần chuẩn bị phiếu phỏng vấn cho một vị trí. Thứ tự làm nào hợp lý nhất?",
    openingOptions: [
      "Soạn 20 câu hỏi hay trước, rồi tính xem cần chấm những gì",
      "Nhờ AI viết trọn bộ, rồi in ra dùng luôn không cần đọc lại",
      "Chọn tiêu chí gắn với việc, rồi câu hỏi cho từng tiêu chí, rồi phiếu chấm",
      "Làm phiếu chấm giống công ty khác cho đỡ mất công nghĩ",
    ],
    correctOption: 2,
    explanation:
      "Tiêu chí quyết định cái bạn cần thấy; câu hỏi sinh ra để lộ đúng cái đó; phiếu chấm để ghi lại bằng chứng. Đi ngược thứ tự thì bạn có nhiều câu hay mà không biết dùng để chấm gì. Nhờ AI viết trọn bộ rồi in luôn sẽ mang theo cả câu đời tư hoặc tình huống không có thật. Chép phiếu của công ty khác thì tiêu chí không gắn với việc của bạn.",
    diagram: [
      { label: "3 tiêu chí gắn với việc thật", arrow: true },
      { label: "Câu hỏi cho từng tiêu chí", arrow: true },
      { label: "Phiếu chấm: bằng chứng và điểm", arrow: true },
      { label: "Mẫu ghi chú hoàn tất trong ngày" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một quản lý cửa hàng cần tuyển nhân viên bán hàng. Chị chọn 3 tiêu chí (xử lý khiếu nại, làm việc cuối tuần, nhớ sản phẩm), viết một câu hỏi cho mỗi tiêu chí và dùng chung một phiếu cho cả bốn ứng viên. Đây là tình huống minh hoạ, không phải một vụ việc có thật.",
    },
    quiz: [
      {
        question: "Trình tự đúng để làm bộ phiếu phỏng vấn là gì?",
        options: [
          "Phiếu chấm, rồi tiêu chí, rồi câu hỏi",
          "Câu hỏi hay, rồi tìm tiêu chí cho khớp câu hỏi",
          "Tiêu chí, rồi câu hỏi cho từng tiêu chí, rồi phiếu chấm",
          "Chờ gặp ứng viên đầu tiên rồi mới quyết tiêu chí",
        ],
        correct: 2,
        explanation:
          "Tiêu chí là gốc: nó nói bạn cần thấy gì. Câu hỏi làm lộ ra điều đó, phiếu chấm ghi lại. Làm ngược thì bạn tìm tiêu chí cho khớp câu hỏi, và quyết tiêu chí sau khi gặp ứng viên đầu tiên thì tiêu chí bị hình dáng người đó ảnh hưởng.",
      },
      {
        question: "Ô 'bằng chứng' trong phiếu chấm nên ghi gì?",
        options: [
          "Nhận xét chung về thái độ của ứng viên",
          "Điều ứng viên đã nói hoặc làm, ghi gần đúng lời của họ",
          "Điểm số dự kiến trước khi phỏng vấn",
          "Ý kiến của người phỏng vấn trước đó về ứng viên",
        ],
        correct: 1,
        explanation:
          "Bằng chứng phải kiểm lại được. Nhận xét thái độ là cảm tính, điểm dự kiến là kết luận trước, và ý kiến người khác làm bạn nhìn ứng viên qua mắt họ thay vì qua điều ứng viên nói.",
      },
      {
        question: "Bao nhiêu tiêu chí là hợp lý cho một buổi phỏng vấn khoảng 30 phút?",
        options: [
          "Khoảng 3 đến 5 tiêu chí gắn với việc thật",
          "Chỉ 1 tiêu chí 'phù hợp văn hoá' cho gọn",
          "Từ 12 đến 15 tiêu chí để không bỏ sót gì",
          "Tuỳ hứng của từng người phỏng vấn trong buổi đó",
        ],
        correct: 0,
        explanation:
          "Ít tiêu chí thì mỗi cái được hỏi kỹ. 12 đến 15 tiêu chí buộc bạn hỏi lướt và ghi cho có. Một tiêu chí 'phù hợp văn hoá' quá mơ hồ để ghi bằng chứng, còn tuỳ hứng thì hai người phỏng vấn chấm hai thước khác nhau.",
      },
      {
        question: "Ghi chú sau buổi phỏng vấn nên hoàn tất khi nào?",
        options: [
          "Cuối tuần, khi đã gặp hết mọi ứng viên",
          "Trong ngày, trước khi phỏng vấn người tiếp theo",
          "Khi nhận được kết quả do AI tóm tắt lại toàn bộ buổi phỏng vấn",
          "Không cần, vì phiếu chấm đã có điểm rồi",
        ],
        correct: 1,
        explanation:
          "Trí nhớ phai nhanh và chi tiết bị lẫn giữa các ứng viên. Chờ cuối tuần là chờ đúng lúc chi tiết đã mờ. AI chỉ tóm lại được cái bạn ghi, và điểm không thay được câu chữ bạn cần nhớ.",
      },
      {
        question: "AI viết nháp phiếu phỏng vấn. Việc đầu tiên bạn làm trước khi dùng là gì?",
        options: [
          "In ngay, vì AI đã viết đầy đủ và chuyên nghiệp",
          "Đọc lại và cắt câu đời tư, tiêu chí không gắn với việc thật",
          "Nhờ AI viết lại thêm một lần nữa cho dài hơn, kỹ hơn và chuyên nghiệp hơn",
          "Gửi ngay cho các ứng viên để họ chuẩn bị trước",
        ],
        correct: 1,
        explanation:
          "AI có thể viết vào cả câu đời tư hoặc tiêu chí mơ hồ. Bạn là người biết việc thật của phòng nên là người cắt. Viết dài hơn không làm bộ phiếu tốt hơn, và gửi trước cho ứng viên làm mất tác dụng của câu hỏi tình huống.",
      },
    ],
    keyTakeaways: [
      "Thứ tự làm: tiêu chí, câu hỏi, phiếu chấm, mẫu ghi chú.",
      "3 đến 5 tiêu chí gắn với việc thật, mỗi tiêu chí một đến hai câu hỏi.",
      "Phiếu có ô bằng chứng riêng, tách khỏi ô điểm.",
      "Hoàn tất ghi chú trong ngày, trước người tiếp theo.",
      "AI viết nháp, bạn cắt câu đời tư và tiêu chí không có thật.",
    ],
    practicePrompt: {
      question:
        "Phiếu phỏng vấn có cột nào là cần thiết nhất để so sánh công bằng giữa các ứng viên?",
      options: [
        "Cột bằng chứng ghi điều ứng viên đã nói hoặc làm",
        "Cột ghi ấn tượng chung của người phỏng vấn",
        "Cột ghi tên người giới thiệu ứng viên",
        "Cột ghi mức lương ứng viên mong muốn ngay từ đầu",
      ],
      correct: 0,
      explanation:
        "Bằng chứng cho phép đặt hai ứng viên cạnh nhau và so từng tiêu chí. Ấn tượng chung là cảm tính, người giới thiệu có thể làm bạn nghiêng, và mức lương là dữ kiện khác, không đo năng lực.",
    },
    summary: {
      keyIdea: "Một bộ phiếu dùng lại được: tiêu chí, câu hỏi, chỗ ghi bằng chứng, mẫu ghi chú.",
      formula: "3 tiêu chí + câu hỏi cho từng tiêu chí + ô bằng chứng + mẫu ghi chú = bộ phiếu.",
      commonMistake: "Có nhiều câu hỏi hay nhưng không biết dùng để chấm tiêu chí nào.",
      action: "Làm một bộ phiếu cho một vị trí thật và dùng nó ở buổi phỏng vấn tuần này.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một vị trí thật (hoặc một vị trí bạn từng tuyển). Ghi 3 tiêu chí gắn với việc, nhờ công cụ AI viết nháp 1 câu hỏi cho mỗi tiêu chí kèm dấu hiệu tốt và kém, rồi dựng phiếu bốn cột: tiêu chí, câu hỏi, bằng chứng, điểm 1-3-5. Thêm một khung ghi chú ba dòng: điều nổi bật, điều còn nghi ngờ, việc cần hỏi thêm.",
      secondary: "Ngày mai kể lại bạn giữ được mấy tiêu chí và cắt câu nào trong bản nháp của AI.",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn có buổi phỏng vấn thứ hai vào thứ Ba tuần sau và muốn tự tin hơn lần đầu. Trong 20 phút, bạn sẽ ghép các mảnh của bốn bài trước thành một bộ phiếu cầm đi được.",
      },
      {
        type: "feynman",
        title: "Bộ phiếu phỏng vấn đơn giản hơn bạn nghĩ",
        intro:
          "Phi công dù bay đã nghìn giờ vẫn đi qua cùng một danh mục kiểm tra trước mỗi chuyến. Danh mục không làm họ kém giỏi đi, mà bảo đảm không ai bị bỏ sót vì tâm trạng hôm đó.",
        columns: ["Điểm", "Danh mục kiểm tra của phi công", "Phiếu phỏng vấn"],
        rows: [
          ["Mục đích", "Không bỏ sót bước quan trọng", "Không bỏ sót tiêu chí quan trọng"],
          ["Áp dụng", "Cùng danh mục cho mọi chuyến bay", "Cùng phiếu cho mọi ứng viên"],
          ["Ghi lại", "Tích từng mục ngay khi làm", "Ghi bằng chứng ngay trong buổi phỏng vấn"],
          ["Lợi ích", "Hôm nào mệt cũng bay an toàn như hôm khoẻ", "Hôm nào mệt cũng chấm giống hôm tỉnh"],
        ],
        oneLiner: "Phiếu phỏng vấn là danh mục kiểm tra: ai cũng đi qua cùng những mục, dù bạn có mệt hay không.",
      },
      { type: "heading", text: "Bốn thứ trong một bộ phiếu" },
      {
        type: "list",
        items: [
          "Tiêu chí: 3 đến 5 điều gắn với việc thật, mỗi điều một dòng.",
          "Câu hỏi: một đến hai câu cho mỗi tiêu chí, lấy từ tình huống thật của phòng.",
          "Phiếu chấm: cột bằng chứng riêng, cột điểm 1-3-5 riêng.",
          "Mẫu ghi chú sau buổi: điều nổi bật, điều còn nghi ngờ, việc cần hỏi thêm.",
        ],
      },
      {
        type: "flow",
        title: "20 phút làm ra một bộ phiếu",
        steps: [
          { label: "5 phút: chọn tiêu chí", detail: "Nhìn lại việc thật của vị trí, chọn ba điều mà người mới phải làm được ngay trong tháng đầu." },
          { label: "5 phút: nhờ AI viết nháp", detail: "Đưa tiêu chí và tình huống thật, nhờ AI viết mỗi tiêu chí một câu hỏi kèm dấu hiệu tốt, kém." },
          { label: "5 phút: bạn soát", detail: "Cắt câu đời tư, tình huống không có thật, tiêu chí mơ hồ. Không tiếc câu hay mà không chấm được." },
          { label: "5 phút: dựng phiếu và mẫu ghi chú", detail: "Kẻ bảng bốn cột và khung ghi chú ba dòng; in hoặc lưu sẵn để dùng cho mọi ứng viên." },
        ],
      },
      { type: "heading", text: "Chỗ AI giúp, chỗ bạn giữ" },
      {
        type: "comparison",
        left: {
          label: "Giao cho AI",
          text: "Viết nháp câu hỏi từ tình huống bạn đưa. Đề xuất dấu hiệu trả lời tốt và kém. Kẻ bảng phiếu chấm và đổi định dạng ghi chú.",
        },
        right: {
          label: "Bạn giữ",
          text: "Chọn tiêu chí gắn với việc thật. Kiểm tình huống có thật ở phòng không. Cắt câu đời tư. Ghi bằng chứng lúc nghe và quyết định cuối cùng.",
        },
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI dựng phiếu cho vị trí nhân viên chăm sóc khách hàng",
        task: "Ba tiêu chí bạn đã chọn: xử lý khiếu nại, làm việc dưới hạn chót, ghi chép chính xác. Lắp prompt để AI dựng bộ phiếu dùng được.",
        parts: [
          {
            id: "context",
            label: "Bối cảnh",
            options: [
              { text: "Làm phiếu phỏng vấn.", feedback: "AI không biết vị trí nào, tiêu chí gì, nên chọn ngẫu nhiên." },
              {
                text: "Vị trí nhân viên chăm sóc khách hàng. Ba tiêu chí: xử lý khiếu nại, làm việc dưới hạn chót, ghi chép chính xác.",
                good: true,
                feedback: "AI có đúng ba tiêu chí bạn đã chọn để bám vào.",
              },
            ],
          },
          {
            id: "task",
            label: "Việc cần làm",
            options: [
              { text: "Cho tôi thật nhiều câu hỏi thú vị.", feedback: "Nhiều câu thú vị không có thước chấm chỉ làm bạn ngợp." },
              {
                text: "Mỗi tiêu chí viết một câu hỏi tình huống, kèm dấu hiệu tốt và kém, không dùng câu đời tư.",
                good: true,
                feedback: "Bạn nhận câu hỏi cùng thước chấm và loại sẵn câu nguy hiểm.",
              },
            ],
          },
          {
            id: "format",
            label: "Khuôn dạng",
            options: [
              { text: "Trả lời tự do cho dễ đọc.", feedback: "Kết quả một đoạn văn dài, bạn phải tự kẻ bảng." },
              {
                text: "Một bảng: tiêu chí, câu hỏi, dấu hiệu tốt, dấu hiệu kém, ô bằng chứng để trống, ô điểm 1-3-5 để trống.",
                good: true,
                feedback: "Bạn nhận sẵn phiếu điền được ngay trong buổi phỏng vấn.",
              },
            ],
          },
        ],
        responses: [
          {
            requires: ["context", "task", "format"],
            text: "| Tiêu chí | Câu hỏi | Dấu hiệu tốt | Dấu hiệu kém | Bằng chứng | Điểm |\n| Xử lý khiếu nại | Một khách gọi lần thứ ba về cùng một đơn hàng, bạn làm gì đầu tiên? | Xin xem lịch sử, xin lỗi, hẹn mốc giờ cụ thể | Chuyển máy hoặc hứa mà không kiểm | | |\n| Hạn chót | ... | ... | ... | | |",
          },
          {
            requires: ["context"],
            text: "Câu 1: Bạn xử lý khiếu nại thế nào?\nCâu 2: Bạn làm việc dưới áp lực ra sao?\n(Có ba tiêu chí nhưng chưa có thước chấm hay ô ghi bằng chứng; câu hỏi còn chung.)",
          },
          {
            text: "1. Bạn có sẵn sàng làm ngoài giờ mà không cần trả thêm không?\n2. Bạn thấy điểm mạnh của mình là gì?\n(AI không biết tiêu chí, nên viết câu chung và một câu chưa nên hỏi.)",
          },
        ],
      },
      {
        type: "scenario",
        title: "Mười phút trước buổi phỏng vấn",
        start: "s1",
        nodes: {
          s1: {
            text: "Còn mười phút là tới buổi phỏng vấn. Bạn có bản nháp AI viết, gồm 10 câu hỏi và 6 tiêu chí, trong đó một câu hỏi tình trạng gia đình.",
            choices: [
              { label: "In luôn cả bản nháp vì AI viết rất đầy đủ", next: "bad_all" },
              { label: "Giữ 3 tiêu chí, mỗi cái một câu, xoá câu gia đình, thêm ô bằng chứng cho từng dòng", next: "s2" },
            ],
          },
          bad_all: {
            text: "Buổi phỏng vấn kéo dài 50 phút vì quá nhiều câu, và ứng viên phản ánh câu hỏi gia đình. Bạn không kịp ghi bằng chứng.",
            ending: "bad",
          },
          s2: {
            text: "Buổi phỏng vấn xong. Người tiếp theo sắp vào và bạn còn ba dòng ghi chú chưa hoàn tất.",
            choices: [
              { label: "Để đó, cuối tuần gặp hết mọi người rồi bổ sung một lượt", next: "bad_later" },
              { label: "Dành 5 phút điền nốt ghi chú và điểm trước khi mời người tiếp theo", next: "good" },
            ],
          },
          bad_later: {
            text: "Cuối tuần chi tiết đã lẫn giữa ba người. Bạn chấm lại theo cảm giác, đúng điều phiếu sinh ra để tránh.",
            ending: "bad",
          },
          good: {
            text: "Mỗi phiếu đủ bằng chứng và điểm trước khi sang người tiếp theo. Cuối tuần bạn so ba phiếu cạnh nhau trong 10 phút.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Tiêu chí trước, câu hỏi sau, phiếu chấm để ghi bằng chứng.",
          "AI viết nháp, bạn cắt và quyết định.",
          "Ghi chú xong trong ngày, trước người tiếp theo.",
        ],
      },
    ],
  },
];
