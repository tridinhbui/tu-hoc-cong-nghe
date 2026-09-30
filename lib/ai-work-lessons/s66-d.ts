import type { Lesson } from "../lesson-types";

// Chặng 66, bài 16-20. Giáo trình: scripts/curriculum/stage-66.json.
// Nội dung dạy khái niệm bền (sao lưu, cập nhật, đọc lỗi, viết yêu cầu hỗ trợ), không nêu đường dẫn nút hay giá của công cụ nào.

const q = (question: string, correctText: string, d: [string, string, string], explanation: string) => ({
  question,
  options: [correctText, d[0], d[1], d[2]],
  correct: 0,
  explanation,
});

export const S66_D_LESSONS: Lesson[] = [
  // ───────────── Bài 16 ─────────────
  {
    id: 2735,
    slug: "sao-luu-quy-tac-ba-ban-hai-noi-mot-noi-xa",
    title: "Chặng 66, Bài 16: Sao lưu: ba bản, hai nơi, một nơi xa chỗ làm",
    subtitle: "Máy hỏng đúng đêm trước ngày nộp hồ sơ: bạn còn giữ được bao nhiêu công việc?",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "💾",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Máy tính nào rồi cũng có ngày hỏng, bị rơi, bị mất hoặc dính phần mềm đòi tiền chuộc. Nếu tất cả hồ sơ của bạn chỉ nằm ở một chỗ, ngày đó bạn mất luôn cả tháng công việc, không chỉ mất chiếc máy. Sao lưu là việc nhàm nhất trong công nghệ, nhưng là việc duy nhất cứu được bạn khi mọi thứ khác đã hỏng.",
    openingQuestion:
      "Đêm trước ngày nộp hồ sơ, máy của bạn không lên nguồn nữa. Trong tình huống nào bạn mất ít nhất?",
    openingOptions: [
      "Hồ sơ có thêm một bản ở kho chung trên mạng và một bản trên ổ rời",
      "Hồ sơ nằm trên máy, nhưng máy mới mua nên chắc là khó hỏng",
      "Hồ sơ chép sang ổ USB một lần hồi đầu năm rồi cất trong ngăn kéo",
      "Hồ sơ gửi qua email cho chính mình, nhưng chỉ gửi bản đầu tiên từ năm ngoái",
    ],
    correctOption: 0,
    explanation:
      "Hai bản ở hai nơi khác nhau nghĩa là một sự cố không thể lấy hết cả hai cùng lúc: máy hỏng thì kho chung và ổ rời vẫn còn. Máy mới vẫn có thể bị rơi, mất cắp hoặc hỏng ổ. Bản chép hồi đầu năm bỏ sót mọi thứ bạn làm sau đó, nên bạn chỉ khôi phục được công việc cũ. Email của bản đầu tiên cũng không theo kịp các lần sửa sau.",
    diagram: [
      { label: "Bản gốc trên máy bạn đang dùng", arrow: true },
      { label: "Bản thứ hai ở nơi lưu khác loại (ổ rời hoặc kho chung)", arrow: true },
      { label: "Bản thứ ba ở nơi xa chỗ làm (kho trên mạng hoặc nhà người thân)", arrow: true },
      { label: "Thử mở lại một tệp từ bản sao lưu để chắc nó dùng được" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một kế toán làm việc tại nhà để toàn bộ bảng tính quý trên một chiếc máy xách tay. Đêm trước hạn nộp, cà phê đổ vào bàn phím. Cô chỉ có bản chép ra USB từ ba tuần trước, nên phải nhập lại ba tuần số liệu trong hai ngày. Sau lần đó cô để một thư mục tự đồng bộ lên kho chung và chép thêm vào ổ rời mỗi Chủ nhật. Sự việc là giả định để minh hoạ, không phải số liệu thật.",
    },
    quiz: [
      q(
        "Quy tắc 3-2-1 trong sao lưu nói gì?",
        "Có ba bản dữ liệu, trên hai loại nơi lưu, một bản ở xa chỗ làm",
        [
          "Sao lưu ba lần một ngày, hai lần một tuần, một lần một tháng",
          "Dùng ba ổ cứng, hai máy tính và một tài khoản email để đăng nhập mọi nơi",
          "Giữ bản sao ba ngày, xoá sau hai ngày nếu đã có bản mới",
        ],
        "3-2-1 là về số bản và nơi để bản, không phải về tần suất. Ba lần mỗi ngày, hai ổ cứng hay ba ngày giữ bản là những cách nhớ nhầm: chúng không bảo đảm có một bản nằm xa chỗ làm khi cả văn phòng bị cháy hoặc ngập."
      ),
      q(
        "Vì sao bản thứ ba nên để ở xa chỗ làm?",
        "Để hỏa hoạn, ngập nước hay mất cắp không lấy đi cả ba bản cùng lúc",
        [
          "Vì bản ở xa luôn mở nhanh hơn bản để trên bàn làm việc",
          "Vì nơi xa thì không ai sửa nhầm được tệp",
          "Vì pháp luật bắt buộc mọi dữ liệu công việc phải cất ở nơi khác",
        ],
        "Mục đích là chia rủi ro theo địa điểm: một biến cố tại chỗ không lấy hết mọi bản. Tốc độ mở tệp thường chậm hơn chứ không nhanh hơn; tệp ở xa vẫn sửa nhầm được nếu đồng bộ; còn chuyện bắt buộc theo luật thì hỏi pháp chế, không phải lý do của quy tắc này."
      ),
      q(
        "Một thư mục tự đồng bộ lên kho chung có thay thế được sao lưu không?",
        "Không hẳn, vì xoá nhầm trên máy cũng bị xoá theo ở kho chung",
        [
          "Có, vì mọi thay đổi đều có bản ở nơi thứ hai ngay lập tức, nên khỏi lo",
          "Có, nhưng chỉ khi kho chung đắt tiền hơn chiếc máy của bạn",
          "Không, vì đồng bộ chỉ chạy khi máy bị hỏng và đã thay mới",
        ],
        "Đồng bộ là giữ hai nơi giống hệt nhau, kể cả khi bạn xoá nhầm hay tệp bị mã hoá bởi phần mềm xấu. Sao lưu phải giữ được bản cũ. Giá không liên quan, và đồng bộ chạy liên tục chứ không đợi máy hỏng."
      ),
      q(
        "Bạn sao lưu vào ổ rời mỗi Chủ nhật. Máy hỏng vào tối thứ Sáu. Tối đa bạn mất bao nhiêu công việc?",
        "Khoảng năm ngày làm việc, từ Chủ nhật đến tối thứ Sáu",
        [
          "Không mất gì cả, vì đã có sẵn bản sao lưu từ tuần trước đó",
          "Bảy ngày, vì cả tuần đều phải làm lại từ đầu, kể cả cuối tuần",
          "Hai ngày, vì chỉ có thứ Bảy và Chủ nhật là chưa được sao lưu",
        ],
        "Sao lưu cách nhau bao lâu thì tối đa mất bấy nhiêu việc. Bản Chủ nhật chứa công việc tới hết Chủ nhật; từ đó tới tối thứ Sáu là khoảng 5 ngày làm việc (thứ Hai đến thứ Sáu). Không mất gì là sai, bảy ngày đếm cả hai ngày cuối tuần bạn chưa làm, còn hai ngày là đếm ngược."
      ),
      q(
        "Bao lâu thì nên thử mở lại một tệp từ bản sao lưu?",
        "Thỉnh thoảng, vì bản chưa thử mở có thể hỏng mà bạn không biết",
        [
          "Không cần, vì phần mềm báo 'hoàn tất' là mọi bản đều mở được bình thường",
          "Chỉ khi máy hỏng thật, lúc đó thử một lần là đủ",
          "Mỗi sáng mở toàn bộ bản sao lưu để kiểm từng tệp một",
        ],
        "Thông báo hoàn tất chỉ nói rằng việc chép đã chạy xong, không nói bản chép dùng được. Chờ đến khi máy hỏng thì đã quá muộn để phát hiện bản hỏng. Mở toàn bộ mỗi sáng thì quá tốn công; chọn vài tệp mở thử định kỳ là đủ."
      ),
    ],
    keyTakeaways: [
      "Ba bản dữ liệu, hai loại nơi lưu, một bản xa chỗ làm.",
      "Đồng bộ không phải sao lưu: xoá nhầm là mất ở cả hai nơi.",
      "Sao lưu cách nhau bao lâu thì tối đa mất bấy nhiêu ngày việc.",
      "Bản sao lưu chưa từng mở thử thì chưa chắc dùng được.",
    ],
    practicePrompt: {
      question:
        "Chị Lan chép hồ sơ sang một ổ rời, để ổ đó ngay cạnh máy xách tay trong cùng chiếc túi. Điều gì còn thiếu?",
      options: [
        "Một bản ở nơi khác, vì mất túi là mất cả máy lẫn ổ rời",
        "Một ổ rời thứ hai cùng loại để trong cùng chiếc túi",
        "Một mật khẩu dài hơn cho chiếc máy xách tay đang dùng",
        "Một lần chép lại bằng tay mỗi tối, dù không có thay đổi nào",
      ],
      correct: 0,
      explanation:
        "Hai bản nằm cùng chỗ thì cùng một biến cố lấy được cả hai, nên cần bản ở nơi khác. Ổ rời thứ hai cùng túi vẫn chung rủi ro. Mật khẩu bảo vệ dữ liệu khỏi người lạ, không cứu dữ liệu khi mất máy. Chép lại khi không có thay đổi chỉ tốn công.",
    },
    summary: {
      keyIdea: "Sao lưu là bảo hiểm cho công việc của bạn: nhiều bản, nhiều nơi, một nơi xa.",
      formula: "Bản gốc + một bản nơi khác loại + một bản ở xa = mất tối đa một khoảng giữa hai lần sao lưu.",
      commonMistake: "Tưởng đồng bộ hoặc một ổ USB cất trong ngăn kéo là đã sao lưu xong.",
      action: "Tìm xem hồ sơ quan trọng nhất của bạn hiện có mấy bản và nằm ở mấy nơi.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một thư mục hồ sơ bạn không thể mất (báo cáo, hợp đồng, ảnh quan trọng). Đếm hiện có mấy bản, ở mấy nơi, bản nào ở xa chỗ làm. Nếu thiếu, chép một bản sang nơi khác ngay hôm nay và thử mở một tệp trong bản chép. Ghi lại ngày bạn sẽ làm lại lần nữa.",
      secondary: "Hỏi IT công ty xem nơi nào được phép lưu hồ sơ công việc trước khi chép ra ngoài.",
    },
    sections: [
      {
        type: "lead",
        text: "Sáng nay máy bạn vẫn chạy, nên sao lưu có vẻ không gấp. Nhưng ngày máy hỏng không báo trước, và lúc đó chỉ có một câu hỏi đáng giá: bạn còn bản nào?",
      },
      {
        type: "feynman",
        title: "Sao lưu đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới chiếc chìa khoá nhà. Nếu chỉ có một chiếc và bạn làm mất, bạn phải gọi thợ phá ổ. Người khôn sẽ đánh thêm một chiếc gửi nhà hàng xóm và một chiếc để ở nơi làm việc. Sao lưu là đánh thêm chìa khoá cho dữ liệu.",
        columns: ["Điều cần", "Chìa khoá nhà", "Dữ liệu"],
        rows: [
          ["Bản gốc", "Chiếc chìa bạn mang theo", "Tệp trên máy bạn đang dùng"],
          ["Bản dự phòng gần", "Chiếc để trong ngăn kéo", "Ổ rời hoặc thư mục đồng bộ"],
          ["Bản dự phòng xa", "Chiếc gửi nhà hàng xóm", "Kho chung trên mạng hoặc máy ở nhà người thân"],
          ["Thử lại", "Thử mở ổ khoá bằng chiếc dự phòng", "Mở thử một tệp từ bản sao lưu"],
        ],
        oneLiner: "Đừng để mọi chiếc chìa ở cùng một chỗ, và nhớ thử xem chiếc dự phòng có mở được cửa không.",
      },
      { type: "heading", text: "Ba bản, hai loại nơi, một nơi xa" },
      {
        type: "paragraph",
        text: "Quy tắc thường gọi là 3-2-1: giữ ba bản dữ liệu, trên hai loại nơi lưu khác nhau (ví dụ máy của bạn và một ổ rời, hoặc máy và kho trên mạng), và ít nhất một bản ở xa chỗ làm. Lý do rất đơn giản: mỗi sự cố chỉ lấy đi được một thứ. Máy hỏng không làm hỏng kho trên mạng. Cháy ở văn phòng không ảnh hưởng tới bản ở nhà người thân.",
      },
      {
        type: "callout",
        label: "Đồng bộ không phải sao lưu",
        text: "Thư mục tự đồng bộ giữ hai nơi giống hệt nhau. Nếu bạn xoá nhầm một tệp, hoặc phần mềm xấu mã hoá cả thư mục, sự thay đổi chạy sang nơi kia luôn. Một bản sao lưu đúng nghĩa phải giữ được phiên bản cũ. Muốn biết công cụ bạn đang dùng giữ được bản cũ không, hỏi bộ phận IT hoặc đọc phần trợ giúp của chính công cụ đó.",
      },
      {
        type: "chart",
        title: "Sao lưu cách nhau càng lâu, càng có thể mất nhiều ngày việc",
        caption:
          "Đường cho thấy số ngày làm việc tối đa bạn phải làm lại nếu máy hỏng ngay trước lần sao lưu tiếp theo. Số liệu minh hoạ: kéo thanh trượt để đổi số ngày bạn thật sự làm việc trong một tuần.",
        kind: "line",
        xLabel: "Số ngày giữa hai lần sao lưu",
        yLabel: "Ngày làm việc có thể mất",
        x: { from: 1, to: 30, step: 1 },
        params: [
          { id: "d", label: "Số ngày làm việc mỗi tuần", min: 1, max: 7, step: 1, value: 5, unit: "ngày" },
        ],
        series: [{ label: "Ngày việc có thể mất", expr: "x * d / 7" }],
      },
      {
        type: "list",
        items: [
          "Liệt kê ba loại tệp bạn không thể mất: đang làm dở, đã nộp, và ảnh hoặc giấy tờ cá nhân.",
          "Với mỗi loại, ghi ra nó hiện nằm ở mấy nơi.",
          "Nơi nào là duy nhất thì thêm một bản ở nơi khác trước.",
          "Đặt lịch nhắc làm lại hằng tuần, vì sao lưu một lần là chưa đủ.",
        ],
      },
      {
        type: "scenario",
        title: "Đêm trước ngày nộp hồ sơ",
        start: "s1",
        nodes: {
          s1: {
            text: "Máy bạn không lên nguồn nữa. Hồ sơ nộp vào 9 giờ sáng mai. Bạn nhớ tuần trước có chép hồ sơ sang một ổ rời để trong ngăn kéo.",
            choices: [
              { label: "Đem máy đi sửa ngay và hy vọng họ cứu được ổ cứng", next: "bad_repair" },
              { label: "Lấy ổ rời, mở thử hồ sơ rồi làm tiếp trên một máy khác", next: "s2" },
            ],
          },
          bad_repair: {
            text: "Cửa hàng sửa nói cần hai ngày mới biết có cứu được không. Đến 9 giờ sáng bạn chưa có gì để nộp và phải xin gia hạn.",
            ending: "bad",
          },
          s2: {
            text: "Ổ rời mở được. Bản chép là từ tuần trước nên thiếu phần bạn sửa trong ba ngày gần đây. Bạn nhớ phần mềm soạn thảo có gửi bản tự lưu lên kho chung.",
            choices: [
              { label: "Bỏ qua kho chung, nhập lại ba ngày sửa từ trí nhớ", next: "bad_memory" },
              { label: "Mở kho chung, lấy bản mới hơn rồi đối chiếu với bản trên ổ rời", next: "good" },
            ],
          },
          bad_memory: {
            text: "Bạn nhập lại thiếu hai đoạn số liệu mà không nhận ra. Hồ sơ nộp lên có chỗ sai và bạn chỉ phát hiện sau đó vài ngày.",
            ending: "bad",
          },
          good: {
            text: "Bản ở kho chung mới hơn và đầy đủ. Bạn đối chiếu nhanh với ổ rời, sửa hai chỗ lệch và nộp đúng giờ. Sáng hôm sau bạn lên lịch sao lưu hằng tuần.",
            ending: "good",
          },
        },
      },
      {
        type: "flow",
        title: "Một vòng sao lưu đơn giản",
        steps: [
          { label: "Chọn thư mục quan trọng", detail: "Bạn không cần chép cả máy. Hãy chọn thư mục hồ sơ, ảnh giấy tờ, và bảng tính đang làm." },
          { label: "Chép sang nơi thứ hai", detail: "Ổ rời hoặc một thư mục tự đồng bộ. Hai nơi khác loại thì một sự cố khó lấy cả hai." },
          { label: "Đưa một bản ra xa", detail: "Kho trên mạng hoặc máy ở nhà người thân. Hỏi IT trước nếu hồ sơ thuộc về công ty." },
          { label: "Mở thử một tệp", detail: "Bản chưa mở thử thì chưa chắc dùng được. Mở ngẫu nhiên một vài tệp." },
          { label: "Đặt lịch lặp lại", detail: "Chọn một ngày cố định trong tuần. Cách nhau bao lâu thì tối đa mất bấy nhiêu công việc." },
        ],
      },
      {
        type: "closing",
        lines: [
          "Ba bản, hai loại nơi, một nơi xa, và nhớ mở thử một tệp.",
          "Bài sau: vì sao thông báo cập nhật phần mềm phiền nhưng đáng bấm.",
        ],
      },
    ],
  },

  // ───────────── Bài 17 ─────────────
  {
    id: 2736,
    slug: "cap-nhat-phan-mem-vi-sao-thong-bao-do-dang-phien",
    title: "Chặng 66, Bài 17: Cập nhật phần mềm: vì sao thông báo phiền ấy đáng bấm",
    subtitle: "Bạn đã chọn 'để sau' mười lần. Đến lúc chọn một giờ hợp lý thay vì né mãi.",
    duration: "8 phút",
    difficulty: "Trung bình",
    emoji: "🔄",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bản cập nhật thường vá những lỗ hổng đã bị người xấu biết và khai thác. Càng để lâu, máy của bạn càng là cánh cửa có khoá hỏng mà cả thế giới đã biết. Nhưng cập nhật giữa buổi họp cũng là cách nhanh nhất để mất uy tín. Giải pháp không phải né mãi mà là chọn giờ.",
    openingQuestion:
      "Máy nhắc cập nhật lần thứ mười và bạn luôn chọn 'để sau'. Cách làm nào hợp lý nhất?",
    openingOptions: [
      "Chọn một giờ cố định ngoài giờ làm việc để máy tự cập nhật",
      "Cứ chọn để sau mãi cho tới khi nào rảnh hẳn, rồi mới cập nhật một lượt",
      "Tắt hẳn thông báo cập nhật để khỏi bị làm phiền nữa",
      "Chỉ cập nhật khi máy đã có dấu hiệu chạy chậm hay bị lỗi",
    ],
    correctOption: 0,
    explanation:
      "Hẹn giờ ngoài giờ làm việc vừa giữ máy được vá, vừa không chen vào công việc. 'Để sau' mãi nghĩa là không bao giờ làm, vì lúc nào cũng có việc. Tắt thông báo che mất điều cần biết mà lỗ hổng vẫn còn. Đợi máy có dấu hiệu lỗi thì có khi bạn đã bị lợi dụng mà không thấy triệu chứng gì.",
    diagram: [
      { label: "Nhà sản xuất phát hiện một lỗ hổng hoặc lỗi", arrow: true },
      { label: "Họ viết bản vá và gửi thành bản cập nhật", arrow: true },
      { label: "Bạn hẹn giờ cập nhật ngoài giờ họp và lưu việc trước", arrow: true },
      { label: "Máy khởi động lại, bạn kiểm tra công việc vẫn chạy bình thường" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một nhân viên kinh doanh bấm 'để sau' suốt hai tháng vì sợ máy khởi động lại giữa cuộc gọi. Một buổi sáng máy tự cập nhật đúng lúc anh chuẩn bị trình bày với khách, và màn hình kẹt hai mươi phút ở 'đang cài đặt'. Sau đó anh đặt giờ cập nhật là 10 giờ đêm thứ Sáu và lưu việc trước khi về. Đây là tình huống giả định để minh hoạ.",
    },
    quiz: [
      q(
        "Vì sao bản cập nhật thường quan trọng hơn vẻ bề ngoài của nó?",
        "Nó thường vá lỗ hổng bảo mật mà người xấu đã biết cách lợi dụng",
        [
          "Nó đổi giao diện cho đẹp hơn, còn phần an toàn thì không ảnh hưởng",
          "Nó làm máy chạy nhanh gấp đôi sau khi khởi động lại, ở mọi trường hợp",
          "Nó xoá bớt tệp cũ trong máy để giải phóng ổ đĩa cho bạn, đỡ phải dọn",
        ],
        "Nhiều bản cập nhật sửa lỗ hổng an toàn mà kẻ xấu đã biết. Đổi giao diện chỉ là một phần nhỏ. Tốc độ có thể cải thiện chút ít nhưng không phải lúc nào, và cập nhật không tự xoá tệp của bạn."
      ),
      q(
        "Nên cập nhật vào lúc nào để ít rủi ro nhất cho công việc?",
        "Ngoài giờ họp, sau khi đã lưu hết việc đang mở",
        [
          "Ngay khi thông báo hiện lên, dù đang trình bày với khách hàng",
          "Đúng lúc cần nộp báo cáo gấp, vì máy sẽ chạy mượt hơn sau đó",
          "Chỉ khi máy hỏng, để khỏi cập nhật một bản không cần thiết",
        ],
        "Cập nhật có thể khởi động lại máy, nên cần chọn giờ rảnh và lưu việc trước. Cập nhật giữa buổi trình bày hay sát hạn nộp đều làm mất thời gian đúng lúc không có thời gian. Đợi máy hỏng là quá muộn."
      ),
      q(
        "Bạn thấy một cửa sổ lạ tự hiện ra, ghi 'Cài bản cập nhật khẩn cấp ngay' kèm nút tải về. Nên làm gì?",
        "Đóng cửa sổ, mở phần cập nhật chính thức của máy để kiểm tra",
        [
          "Bấm nút tải về ngay vì có chữ khẩn cấp nên chắc chắn là thật, đỡ mất công kiểm",
          "Gửi cửa sổ đó cho đồng nghiệp cài thử rồi bạn cài theo sau",
          "Bỏ qua nhưng để cửa sổ mở cả ngày phòng khi cần dùng đến",
        ],
        "Cập nhật thật đến từ phần cập nhật chính thức của hệ điều hành hay ứng dụng, không từ một cửa sổ lạ. Chữ 'khẩn cấp' là chiêu tạo áp lực của lừa đảo. Nhờ đồng nghiệp cài thử chỉ lan nguy cơ, còn để cửa sổ mở thì vẫn có nguy cơ bấm nhầm."
      ),
      q(
        "Sau khi cập nhật xong, việc nào đáng làm nhất?",
        "Mở nhanh vài ứng dụng hay tệp hay dùng để chắc vẫn chạy bình thường",
        [
          "Không cần làm gì, vì cập nhật chưa từng làm đổi điều gì cả",
          "Cài lại toàn bộ ứng dụng trong máy cho chắc rằng chúng mới",
          "Xoá bản cập nhật vừa cài nếu thấy giao diện hơi khác trước",
        ],
        "Thỉnh thoảng cập nhật làm một ứng dụng hay một thiết bị không còn khớp, nên kiểm tra nhanh vài thứ hay dùng là hợp lý. Cài lại mọi thứ là quá tay, còn gỡ bản cập nhật chỉ vì giao diện khác thì để lại lỗ hổng."
      ),
      q(
        "Máy của bạn là máy công ty. Bạn thấy nhắc cập nhật nhưng IT bảo chờ. Bạn nên làm gì?",
        "Chờ theo hướng dẫn của IT và hỏi khi nào họ sẽ cập nhật",
        [
          "Tự cập nhật luôn vì biết rõ hơn IT là việc nào cần làm",
          "Tắt hẳn chức năng tự cập nhật để máy không nhắc nữa",
          "Cập nhật trên máy cá nhân rồi dùng máy đó cho việc công ty",
        ],
        "Máy công ty thường có lịch cập nhật chung vì IT phải kiểm xem bản mới có khớp phần mềm của công ty không. Tự làm khác đi hoặc chuyển công việc sang máy cá nhân có thể phá quy định và mở thêm rủi ro."
      ),
    ],
    keyTakeaways: [
      "Nhiều bản cập nhật vá lỗ hổng an toàn đã bị biết tới.",
      "Chọn giờ cập nhật cố định ngoài giờ họp thay vì né mãi.",
      "Cửa sổ lạ đòi cập nhật khẩn cấp là dấu hiệu lừa đảo, không phải cập nhật.",
      "Máy công ty: làm theo lịch của IT.",
    ],
    practicePrompt: {
      question:
        "Anh Nam muốn AI giúp anh soạn một lịch cập nhật máy ít ảnh hưởng tới công việc. Anh nên đưa cho AI thông tin nào?",
      options: [
        "Giờ làm việc và các cuộc họp hằng tuần, không cần đưa mật khẩu",
        "Mật khẩu đăng nhập để AI thử cập nhật thử cho anh",
        "Toàn bộ hồ sơ công việc để AI chọn giờ phù hợp nhất",
        "Không đưa gì cả, chỉ nhờ AI nói giờ cập nhật tốt nhất cho mọi người",
      ],
      correct: 0,
      explanation:
        "Lịch cập nhật chỉ cần biết khung giờ bận rảnh của anh. Mật khẩu và hồ sơ công việc không liên quan và không nên đưa cho AI. Nếu không đưa gì, AI chỉ có thể đoán một giờ chung chung cho mọi người.",
    },
    summary: {
      keyIdea: "Cập nhật là việc bảo trì nhỏ, định kỳ, giữ máy không có lỗ hổng cũ.",
      formula: "Giờ cố định ngoài giờ họp + lưu việc trước + kiểm nhanh sau = cập nhật không làm hỏng ngày làm việc.",
      commonMistake: "Bấm 'để sau' mãi, hoặc bấm vào cửa sổ lạ có chữ 'khẩn cấp'.",
      action: "Mở phần cập nhật chính thức của máy và đặt giờ cố định.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Mở phần cập nhật của máy bạn (hệ điều hành và một ứng dụng bạn dùng nhiều nhất) và xem có bản nào đang chờ không. Chọn một giờ cố định ngoài giờ họp, ví dụ tối thứ Sáu. Ghi ngày giờ đó vào lịch cá nhân. Nếu là máy công ty, hỏi IT khi nào họ cập nhật và ghi lại câu trả lời.",
      secondary: "Nếu không thấy bản nào đang chờ, ghi ngày bạn đã kiểm tra để lần sau so sánh.",
    },
    sections: [
      {
        type: "lead",
        text: "Thông báo cập nhật luôn hiện đúng lúc bạn đang bận. Bài này giúp bạn thôi 'để sau' và chọn một giờ hợp lý, để cập nhật không còn là chuyện bạn phải né.",
      },
      {
        type: "feynman",
        title: "Cập nhật phần mềm đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới việc thay khoá khi nhà sản xuất báo 'loại khoá này bị bẻ được'. Bạn không thích phải đổi, nhưng nếu không đổi thì ai cũng biết cách mở cửa nhà bạn. Bản cập nhật là chiếc khoá mới được phát cho chiếc khoá cũ đã bị bẻ.",
        columns: ["Điều cần", "Ổ khoá nhà", "Phần mềm"],
        rows: [
          ["Vấn đề", "Loại khoá bị bẻ được", "Lỗ hổng bảo mật đã bị biết"],
          ["Cách sửa", "Thay bằng ổ khoá mới", "Cài bản cập nhật"],
          ["Lúc làm", "Khi cả nhà đi vắng", "Ngoài giờ họp, sau khi lưu việc"],
          ["Mối nguy giả", "Người lạ tới tự xưng thợ khoá", "Cửa sổ lạ đòi cập nhật khẩn cấp"],
        ],
        oneLiner: "Đổi khoá khi nhà vắng, và chỉ nhận thợ do chính hãng cử tới.",
      },
      { type: "heading", text: "Vì sao phiền mà vẫn đáng" },
      {
        type: "paragraph",
        text: "Khi một lỗ hổng được phát hiện, nhà sản xuất viết bản vá và gửi ra thành bản cập nhật. Kẻ xấu cũng đọc thông tin đó, nên họ nhắm vào những máy chưa cập nhật. Máy bạn càng để lâu thì càng giống cánh cửa mà ai cũng biết cách mở. Đó là lý do cập nhật đáng hơn vẻ phiền của nó.",
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI lập lịch cập nhật",
        task: "Bạn muốn nhờ AI đề xuất một khung giờ cập nhật máy ít làm phiền công việc. Lắp prompt cho AI.",
        parts: [
          {
            id: "context",
            label: "Bối cảnh",
            options: [
              { text: "Tôi bận lắm, hãy nói giờ cập nhật tốt nhất.", feedback: "AI không biết bạn bận lúc nào nên sẽ đoán một giờ chung chung, có thể trúng buổi họp của bạn." },
              { text: "Tôi họp từ 9 đến 11 giờ thứ Hai và thứ Tư, làm đến 17 giờ các ngày thường, và nghỉ cuối tuần.", good: true, feedback: "Có khung giờ bận rảnh thật của bạn nên AI chọn được giờ tránh được các cuộc họp." },
            ],
          },
          {
            id: "secret",
            label: "Thông tin nhạy cảm",
            options: [
              { text: "Đây là mật khẩu đăng nhập máy của tôi để bạn kiểm tra hộ.", feedback: "Mật khẩu không bao giờ cần cho việc này. Đưa mật khẩu cho công cụ nào cũng là rủi ro không cần thiết." },
              { text: "Không đưa mật khẩu, tên khách hay hồ sơ; chỉ đưa lịch bận rảnh.", good: true, feedback: "Bạn chỉ chia sẻ phần AI cần, nên không lộ thứ gì nhạy cảm." },
            ],
          },
          {
            id: "limit",
            label: "Yêu cầu trả lời",
            options: [
              { text: "Cho tôi mọi thông tin về cập nhật phần mềm.", feedback: "Yêu cầu quá rộng nên AI trả về một bài dài mà bạn không cần." },
              { text: "Đề xuất ba khung giờ, mỗi khung kèm một lý do ngắn, và nhắc tôi lưu việc trước.", good: true, feedback: "Có số lượng, lý do và một việc cần nhớ, nên câu trả lời dùng được ngay." },
            ],
          },
        ],
        responses: [
          {
            requires: ["context", "secret", "limit"],
            text: "1) Tối thứ Sáu sau 18 giờ: hết tuần làm việc, không đụng họp nào.\n2) Sáng thứ Bảy 8 giờ: máy nghỉ, nếu khởi động lại cũng không ảnh hưởng ai.\n3) Trưa thứ Ba 12-13 giờ: khoảng trống giữa hai buổi làm.\n\nNhớ lưu việc đang mở trước khi đi.",
          },
          {
            requires: ["context"],
            text: "Bạn có thể cập nhật vào thứ Sáu. Ngoài ra nên cập nhật mọi thứ một lần, nhiều thứ nhỏ khác cũng cần xem...\n\n(AI trả lời dài và lan man vì yêu cầu không có giới hạn.)",
          },
          {
            text: "Giờ tốt nhất thường là 2 giờ sáng vì ai cũng đang ngủ. Bạn nên để máy bật và nhập mật khẩu khi được hỏi...\n\n(AI không biết lịch của bạn nên bịa ra một giờ chung, còn gợi ý để máy bật qua đêm.)",
          },
        ],
      },
      {
        type: "callout",
        label: "Cửa sổ lạ không phải cập nhật",
        text: "Bản cập nhật thật đến từ phần cập nhật chính thức của hệ điều hành hoặc ứng dụng. Một cửa sổ hiện ra giữa trang web, một email hay tin nhắn đòi 'cài ngay' thì nên đóng lại rồi tự mở phần cập nhật chính thức để kiểm tra. Nếu đã lỡ bấm, báo ngay cho IT.",
      },
      {
        type: "flow",
        title: "Một lần cập nhật không làm hỏng buổi họp",
        steps: [
          { label: "Kiểm tra từ nguồn chính thức", detail: "Tự mở phần cập nhật của máy hoặc ứng dụng, không bấm vào cửa sổ hay email lạ." },
          { label: "Chọn giờ ngoài giờ họp", detail: "Tối cuối tuần hoặc khoảng trống bạn biết chắc. Máy có thể phải khởi động lại." },
          { label: "Lưu việc và đóng ứng dụng", detail: "Lưu tệp đang mở trước khi đi để khởi động lại không làm mất phần dở." },
          { label: "Để máy chạy", detail: "Đừng tắt nguồn giữa chừng, vì máy có thể bị lỗi nếu bị ngắt khi đang cập nhật." },
          { label: "Kiểm nhanh sau đó", detail: "Mở vài ứng dụng bạn hay dùng. Nếu có gì lạ, ghi lại và báo IT." },
        ],
      },
      {
        type: "scenario",
        title: "Lời nhắc cập nhật lần thứ mười",
        start: "s1",
        nodes: {
          s1: {
            text: "Sáng thứ Hai, máy nhắc cập nhật. Bạn có buổi họp với khách lúc 10 giờ, bây giờ là 9 giờ 40.",
            choices: [
              { label: "Bấm 'cập nhật ngay' cho xong một lần", next: "bad_now" },
              { label: "Chọn hẹn giờ tối nay ngoài giờ làm và lưu việc", next: "s2" },
            ],
          },
          bad_now: {
            text: "Máy khởi động lại và kẹt ở màn hình 'đang cài đặt' hai mươi phút. Bạn vào buổi họp trễ với khách.",
            ending: "bad",
          },
          s2: {
            text: "Buổi tối, máy cập nhật xong. Sáng hôm sau bạn thấy một ứng dụng in ấn không kết nối được máy in.",
            choices: [
              { label: "Gỡ bản cập nhật vừa cài rồi tắt chức năng cập nhật luôn", next: "bad_remove" },
              { label: "Ghi lại lỗi, khởi động lại máy in và hỏi IT nếu vẫn lỗi", next: "good" },
            ],
          },
          bad_remove: {
            text: "Máy in chạy lại, nhưng máy của bạn lại nằm trong diện lỗ hổng cũ mà bản vá đã sửa. Hai tuần sau IT phải kiểm tra máy vì có dấu hiệu bất thường.",
            ending: "bad",
          },
          good: {
            text: "Sau khi khởi động lại máy in, mọi thứ chạy bình thường. Bạn ghi vào lịch giờ cập nhật tuần sau.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Chọn giờ thay vì né mãi: cập nhật là việc nhỏ giúp máy khỏi bị lợi dụng.",
          "Bài sau: đọc thông báo lỗi mà không hoảng.",
        ],
      },
    ],
  },

  // ───────────── Bài 18 ─────────────
  {
    id: 2737,
    slug: "doc-thong-bao-loi-khong-hoang-ba-cau-hoi-dau-tien",
    title: "Chặng 66, Bài 18: Đọc thông báo lỗi mà không hoảng: ba câu hỏi đầu tiên",
    subtitle: "Cửa sổ đỏ hiện lên lúc đang nộp báo cáo: điều gì đã xảy ra, ở đâu, và dòng chữ nào cần chép lại?",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🚨",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Thông báo lỗi thường làm người ta hoảng và đóng ngay, nên lúc hỏi người khác thì chỉ nói được 'nó bị lỗi'. Thực ra trong cửa sổ lỗi có sẵn ba mẩu tin: chuyện gì đã xảy ra, xảy ra ở đâu, và một dòng chữ mà người sửa rất cần. Đọc được ba mẩu đó, bạn vừa bớt sợ, vừa được giúp nhanh hơn rất nhiều.",
    openingQuestion:
      "Cửa sổ lỗi bật lên đúng lúc bạn nộp báo cáo. Việc nào nên làm đầu tiên?",
    openingOptions: [
      "Đọc chậm dòng chữ trong cửa sổ và chụp lại trước khi đóng",
      "Bấm đóng thật nhanh rồi thử nộp lại cho đến khi được, không cần đọc",
      "Khởi động lại máy ngay để xoá sạch mọi thứ rồi làm lại từ đầu",
      "Nhờ đồng nghiệp nộp hộ mà không nói gì về cửa sổ vừa hiện ra",
    ],
    correctOption: 0,
    explanation:
      "Dòng chữ trong cửa sổ lỗi là thứ duy nhất giúp người sửa biết chuyện gì đã xảy ra, và nó biến mất khi bạn đóng. Bấm đóng rồi thử lại không biết lỗi từ đâu nên có thể lặp lại mãi. Khởi động lại có thể xoá luôn dấu vết và phần việc chưa lưu. Nhờ người khác nộp mà không nói gì thì lỗi vẫn còn đó với lần sau.",
    diagram: [
      { label: "Dừng lại, chưa đóng cửa sổ lỗi", arrow: true },
      { label: "Đọc: điều gì đã xảy ra, ở đâu, cần làm gì tiếp", arrow: true },
      { label: "Chụp màn hình hoặc chép đúng dòng chữ", arrow: true },
      { label: "Nhờ người hoặc AI giúp, kèm việc bạn đã làm trước khi lỗi" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một nhân viên nhân sự nộp bảng lương lên cổng của công ty thì hiện cửa sổ đỏ. Chị đóng ngay rồi nộp lại, ba lần liền vẫn lỗi. Lần thứ tư chị chụp lại thì thấy dòng chữ nói rằng tệp lớn hơn mức cổng cho phép. Chị nén tệp lại và nộp được ngay. Đây là tình huống giả định để minh hoạ.",
    },
    quiz: [
      q(
        "Ba câu hỏi đầu tiên khi đọc thông báo lỗi là gì?",
        "Điều gì đã xảy ra, xảy ra ở đâu, và thông báo gợi ý làm gì tiếp",
        [
          "Ai gây ra lỗi, lỗi này do hãng nào, và có phải lỗi của bạn không",
          "Máy hiệu gì, mua lúc nào, và còn trong thời hạn bảo hành hay không",
          "Lỗi có nguy hiểm không, có xoá dữ liệu không, và có lây sang máy khác không",
        ],
        "Ba câu hỏi này giúp bạn tách thông báo thành các mẩu dùng được. Hỏi ai gây lỗi hay hãng nào không giúp sửa được gì. Hiệu máy và bảo hành không nằm trong thông báo. Và hai câu về nguy hiểm, xoá dữ liệu, lây lan là những nỗi sợ, chưa phải thông tin trong cửa sổ."
      ),
      q(
        "Vì sao nên chụp hoặc chép đúng dòng chữ trong thông báo lỗi?",
        "Người sửa cần đúng chữ đó để tìm ra nguyên nhân, nhớ lại thường sai",
        [
          "Vì thông báo nào cũng chứa mật khẩu mà bạn cần lưu lại",
          "Vì chụp màn hình sẽ tự động làm lỗi biến mất khỏi máy",
          "Vì dòng chữ lỗi luôn dài nên không thể nhớ được hết",
        ],
        "Mã hoặc câu chữ cụ thể trong thông báo là manh mối. Nhớ lại bằng trí nhớ thường sai một chữ hay một con số, và sai chữ là đi tìm sai hướng. Thông báo lỗi không chứa mật khẩu của bạn, chụp màn hình không sửa lỗi, và không phải dòng nào cũng dài."
      ),
      q(
        "Thông báo ghi 'Tệp đang được người dùng khác mở'. Điều hợp lý nhất là gì?",
        "Hỏi xem ai đang mở tệp đó, hoặc chờ họ đóng rồi thử lại",
        [
          "Khởi động lại máy vì tệp của bạn đã hỏng và không mở được nữa",
          "Xoá tệp đi rồi tạo lại từ đầu để khỏi bị khoá nữa",
          "Cài lại hệ điều hành vì đây là lỗi của cả máy tính",
        ],
        "Câu chữ nói rõ tệp đang bị người khác mở, nên hướng xử lý nằm ngay trong đó. Máy không hỏng, tệp không hỏng, cũng không cần xoá hay cài lại hệ thống. Làm những việc đó chỉ tốn công và có thể mất việc."
      ),
      q(
        "Thông báo lỗi hiện một dãy chữ số dài. Bạn nên xử lý thế nào?",
        "Chép nguyên dãy số đó vào yêu cầu hỗ trợ kèm việc bạn đang làm",
        [
          "Bỏ qua dãy số vì nó chỉ dành cho kỹ thuật viên, không phải cho bạn",
          "Đọc thành lời cho đồng nghiệp nghe rồi tự nhớ trong đầu",
          "Chỉ ghi 'có dãy số dài' vì dãy số cụ thể không ảnh hưởng gì",
        ],
        "Dãy số hay mã lỗi chính là thứ người sửa dùng để tra. Bỏ qua thì họ mất công hỏi lại. Đọc nhớ trong đầu dễ sai chữ số. Chỉ ghi 'có dãy số dài' thì mất luôn phần thông tin hữu ích nhất."
      ),
      q(
        "Một email giả làm thông báo lỗi nói 'Tài khoản của bạn bị khoá, nhập mật khẩu tại đây để mở'. Nên làm gì?",
        "Không bấm; vào trang chính thức bằng cách tự gõ địa chỉ để kiểm tra",
        [
          "Bấm vào đường dẫn và nhập mật khẩu ngay cho kịp trước khi tài khoản bị khoá",
          "Trả lời email để hỏi họ có thật là bộ phận hỗ trợ không",
          "Chuyển tiếp email cho cả nhóm để xem ai gặp lỗi tương tự chưa",
        ],
        "Thông báo lỗi thật hiện trong ứng dụng, hiếm khi yêu cầu nhập mật khẩu qua đường dẫn trong email. Nhập mật khẩu vào đó là trao nó cho kẻ lừa đảo. Trả lời hoặc chuyển tiếp email cho cả nhóm cũng làm lan rủi ro thay vì chặn nó."
      ),
    ],
    keyTakeaways: [
      "Ba câu hỏi: đã xảy ra gì, ở đâu, gợi ý làm gì.",
      "Chụp hoặc chép đúng dòng chữ trước khi đóng cửa sổ.",
      "Mã hoặc dãy số lạ là manh mối, không phải chuyện để bỏ qua.",
      "Thông báo đòi mật khẩu qua email là dấu hiệu lừa đảo.",
    ],
    practicePrompt: {
      question:
        "Chị Mai thấy cửa sổ 'Không thể lưu tệp: ổ đĩa đã đầy'. Bước nào hợp lý nhất?",
      options: [
        "Đọc ra ổ nào đầy, dọn hoặc chuyển bớt tệp rồi mới lưu lại",
        "Khởi động lại máy vì ổ đĩa đầy thường tự hết sau khi khởi động",
        "Đổi tên tệp thật dài để máy nhận ra là tệp mới",
        "Tắt máy tính và bật lại cho tới khi lưu được",
      ],
      correct: 0,
      explanation:
        "Thông báo đã nói nguyên nhân: ổ đầy. Việc cần làm là tạo chỗ trống rồi lưu. Khởi động lại không làm ổ bớt đầy. Đổi tên tệp không thay đổi dung lượng. Và tắt bật liên tục chỉ tốn thời gian và có thể mất bản chưa lưu.",
    },
    summary: {
      keyIdea: "Lỗi nói cho bạn biết chuyện gì đã xảy ra, nếu bạn đọc chậm và chép đúng chữ.",
      formula: "Xảy ra gì + ở đâu + gợi ý gì + dòng chữ chính xác = yêu cầu hỗ trợ giúp được ngay.",
      commonMistake: "Đóng cửa sổ thật nhanh rồi chỉ nhớ 'nó báo lỗi'.",
      action: "Lần sau gặp lỗi, chụp màn hình trước rồi mới làm gì khác.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Nhớ lại một lỗi bạn gặp gần đây, hoặc tìm một ảnh chụp lỗi cũ. Viết ra ba dòng: điều gì đã xảy ra, ở đâu, và thông báo gợi ý gì. Chép đúng dòng chữ hoặc mã lỗi. Nếu chưa có lỗi nào, tạo thói quen: lần tới có lỗi thì chụp trước khi đóng.",
      secondary: "Cất ảnh chụp trong một thư mục tên 'Lỗi' để lần sau cần hỏi ai cũng tìm thấy ngay.",
    },
    sections: [
      {
        type: "lead",
        text: "Cửa sổ lỗi bật lên và tim bạn đập nhanh hơn. Nhưng trong đó có sẵn những mẩu tin hữu ích, nếu bạn dừng lại hai mươi giây để đọc.",
      },
      {
        type: "feynman",
        title: "Đọc thông báo lỗi đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới biên bản một vụ va quẹt xe nhỏ. Người ghi biên bản hỏi: chuyện gì đã xảy ra, ở đâu, và các bên có hẹn gì tiếp. Thông báo lỗi là biên bản máy tính tự viết về chuyện vừa xảy ra, bạn chỉ cần đọc lại cho đúng.",
        columns: ["Câu hỏi", "Biên bản va quẹt", "Thông báo lỗi"],
        rows: [
          ["Chuyện gì xảy ra", "Xe A chạm xe B", "'Không thể lưu tệp', 'mất kết nối'"],
          ["Ở đâu", "Ngã tư nào", "Tên tệp, ứng dụng, hoặc ổ đĩa nào"],
          ["Làm gì tiếp", "Gọi bảo hiểm, chụp hiện trường", "Gợi ý trong cửa sổ, hoặc mã lỗi để hỏi người khác"],
          ["Bằng chứng", "Ảnh chụp hiện trường", "Ảnh chụp màn hình hoặc dòng chữ chép đúng"],
        ],
        oneLiner: "Đọc thông báo lỗi như đọc biên bản: chuyện gì, ở đâu, làm gì tiếp, và chụp lại.",
      },
      { type: "heading", text: "Ba câu hỏi đầu tiên" },
      {
        type: "paragraph",
        text: "Trước khi làm gì khác, tự hỏi ba câu. Một, chuyện gì đã xảy ra: lưu được hay không, mở được hay không, kết nối được hay không? Hai, ở đâu: lỗi nói tới tệp nào, ứng dụng nào, hay nguồn nào? Ba, thông báo gợi ý gì: có lời khuyên hay mã lỗi? Trả lời xong ba câu này là bạn đã có một bản mô tả lỗi tốt hơn đa số người gọi hỗ trợ.",
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "AI đọc hộ thông báo lỗi: chỗ nào bịa?",
        task: "Bạn dán dòng chữ lỗi 'Không thể gửi tệp: tệp vượt quá kích thước cho phép (25 MB)' và nhờ AI giải thích. Bấm vào những đoạn bạn thấy AI bịa hoặc suy diễn quá tay, rồi nộp.",
        segments: [
          { text: "Thông báo nói tệp của bạn lớn hơn mức cho phép là 25 MB." },
          { text: "Đó là lý do lần gửi này không thành công." },
          {
            text: "Nguyên nhân chắc chắn là máy chủ của công ty bạn bị tấn công và đang bị khoá.",
            error: "Thông báo chỉ nói tệp quá lớn. Việc 'bị tấn công' là AI bịa ra một nguyên nhân không có trong dòng chữ.",
          },
          { text: "Bạn có thể nén tệp hoặc tách thành nhiều phần nhỏ hơn rồi gửi lại." },
          {
            text: "Theo quy định hiện hành của pháp luật, công ty phải lưu lại mọi tệp quá 25 MB trong năm năm.",
            error: "Không có căn cứ nào trong thông báo. AI tự nêu một quy định, bạn cần hỏi pháp chế chứ không tin câu này.",
          },
          { text: "Nếu vẫn không được, chép nguyên dòng thông báo gửi cho bộ phận IT." },
        ],
      },
      {
        type: "list",
        items: [
          "Dừng lại và chưa đóng cửa sổ.",
          "Đọc ra: xảy ra gì, ở đâu, gợi ý gì.",
          "Chụp màn hình hoặc chép đúng dòng chữ.",
          "Ghi việc bạn đang làm ngay trước khi lỗi hiện ra.",
        ],
      },
      {
        type: "callout",
        label: "Lỗi nào cũng không cần mật khẩu của bạn",
        text: "Khi nhờ AI hoặc người khác đọc hộ lỗi, chỉ đưa dòng chữ lỗi và tên ứng dụng. Che hoặc bỏ tên khách, số liệu công việc, mật khẩu, và mọi thứ nhạy cảm trong ảnh chụp. Và nếu có email hay cửa sổ đòi nhập mật khẩu 'để sửa lỗi', đó nhiều khả năng là lừa đảo.",
      },
      {
        type: "flow",
        title: "Từ cửa sổ lỗi tới một câu hỏi tốt",
        steps: [
          { label: "Dừng lại và chưa đóng", detail: "Cửa sổ lỗi có thể biến mất sau khi đóng. Hãy dành vài giây để đọc chậm." },
          { label: "Chụp lại", detail: "Chụp màn hình, hoặc chép đúng từng chữ của thông báo, gồm cả mã lỗi nếu có." },
          { label: "Tách ba mẩu tin", detail: "Xảy ra gì, ở đâu, gợi ý làm gì. Viết mỗi mẩu ra một dòng." },
          { label: "Thử một việc an toàn", detail: "Làm theo gợi ý trong thông báo nếu nó là việc nhỏ, dễ đảo ngược, như lưu sang tên khác." },
          { label: "Hỏi người hoặc AI", detail: "Gửi ảnh, dòng chữ, và việc bạn đang làm. Không gửi mật khẩu hay dữ liệu khách." },
        ],
      },
      {
        type: "scenario",
        title: "Cửa sổ đỏ lúc đang nộp báo cáo",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn nộp báo cáo lên cổng của công ty thì hiện cửa sổ đỏ: 'Không thể tải lên: tệp quá lớn (giới hạn 20 MB)'. Còn một giờ là hết hạn.",
            choices: [
              { label: "Bấm đóng rồi thử nộp lại nhiều lần cho tới khi được", next: "bad_retry" },
              { label: "Đọc lại dòng chữ: tệp quá lớn, cần giảm dưới 20 MB", next: "s2" },
            ],
          },
          bad_retry: {
            text: "Ba lần nộp đều hiện cùng một lỗi. Bạn mất mười lăm phút và bắt đầu hoảng vì hạn chót sắp tới.",
            ending: "bad",
          },
          s2: {
            text: "Bạn thấy rõ vấn đề là dung lượng. Tệp của bạn đang là 34 MB vì nhúng nhiều ảnh lớn.",
            choices: [
              { label: "Gửi cả tệp cho đồng nghiệp nhờ nộp hộ mà không nói gì về lỗi", next: "bad_pass" },
              { label: "Nén ảnh trong tệp hoặc lưu thành bản nhỏ hơn rồi nộp lại", next: "good" },
            ],
          },
          bad_pass: {
            text: "Đồng nghiệp cũng gặp đúng lỗi đó và cả hai mất thêm mười phút trước khi biết nguyên nhân.",
            ending: "bad",
          },
          good: {
            text: "Bạn nén ảnh, tệp còn 12 MB và nộp thành công với mười phút dư. Bạn ghi lại giới hạn 20 MB cho lần sau.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Dừng lại, đọc ba câu hỏi, chụp đúng dòng chữ.",
          "Bài sau: nhờ IT hay AI giúp, cách mô tả lỗi để được giúp nhanh.",
        ],
      },
    ],
  },

  // ───────────── Bài 19 ─────────────
  {
    id: 2738,
    slug: "hoi-nho-it-hay-hoi-ai-cach-mo-ta-loi-de-duoc-giup-nhanh",
    title: "Chặng 66, Bài 19: Nhờ bộ phận IT hay AI giúp: cách mô tả lỗi để được giúp nhanh",
    subtitle: "Một yêu cầu có ảnh chụp, giờ xảy ra và việc đã thử thường được xử lý trong một lượt trả lời.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🛟",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Hai người cùng gặp một lỗi: một người viết 'máy em bị hỏng, giúp với', người kia gửi ảnh chụp, giờ xảy ra và việc đã thử. Người thứ hai thường xong trong một lượt trả lời, người thứ nhất mất cả buổi hỏi qua hỏi lại. Bạn cũng cần biết việc nào nên hỏi IT, việc nào hỏi AI, và thứ gì tuyệt đối không được dán vào yêu cầu.",
    openingQuestion:
      "Bạn cần nhờ IT giúp vì không vào được thư mục chung. Cách viết yêu cầu nào giúp họ xử lý nhanh nhất?",
    openingOptions: [
      "Ảnh chụp lỗi, giờ xảy ra, thư mục nào, và việc bạn đã thử rồi",
      "Một câu ngắn: 'Em không vào được, nhờ anh xem giúp với, gấp lắm'",
      "Một bài dài kể cả tuần làm việc vất vả của bạn rồi mới nói lỗi",
      "Ảnh chụp lỗi kèm mật khẩu của bạn để họ tự vào xem cho nhanh hơn",
    ],
    correctOption: 0,
    explanation:
      "Ảnh, giờ, nơi xảy ra và việc đã thử cho người nhận đủ manh mối để làm ngay, không phải hỏi lại. Câu ngắn 'không vào được' buộc họ hỏi từng thứ một, mất thời gian qua lại. Bài kể dài làm chìm thông tin cần thiết. Còn gửi mật khẩu là việc không bao giờ được làm, vì IT thật không cần biết mật khẩu của bạn.",
    diagram: [
      { label: "Bạn tóm tắt: việc muốn làm và điều đã xảy ra", arrow: true },
      { label: "Đính kèm ảnh chụp, ghi giờ và việc đã thử", arrow: true },
      { label: "Xoá mật khẩu, số thẻ, tên khách khỏi ảnh và nội dung", arrow: true },
      { label: "Gửi tới đúng nơi, nhận phản hồi và báo lại kết quả" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: hai nhân viên văn phòng đều không in được báo cáo. Người thứ nhất nhắn 'máy in hỏng' và chờ cả buổi sáng vì IT phải hỏi lại ba lần. Người thứ hai gửi ảnh chụp thông báo, ghi 'từ 9 giờ 10, máy in tầng 2, đã khởi động lại máy in', và được hướng dẫn xong trong năm phút. Đây là tình huống giả định để minh hoạ.",
    },
    quiz: [
      q(
        "Một yêu cầu hỗ trợ tốt nên có đủ những gì?",
        "Điều bạn muốn làm, điều xảy ra, ảnh chụp, giờ và việc đã thử",
        [
          "Tên sếp của bạn, mức độ khẩn cấp và lời xin lỗi vì làm phiền nhiều lần",
          "Mật khẩu của bạn, địa chỉ email và số điện thoại cá nhân",
          "Lịch sử mọi lỗi bạn từng gặp từ khi dùng chiếc máy này",
        ],
        "Yêu cầu tốt cho người nhận đủ thông tin để hành động ngay. Mức khẩn cấp và lời xin lỗi không giúp tìm lỗi. Mật khẩu là thứ không được chia sẻ. Kể mọi lỗi cũ làm chìm đúng lỗi đang cần sửa."
      ),
      q(
        "Vì sao nên ghi việc bạn đã thử trong yêu cầu hỗ trợ?",
        "Để người nhận khỏi bảo bạn làm lại điều bạn đã làm rồi",
        [
          "Để chứng minh rằng lỗi chắc chắn không phải do bạn gây ra",
          "Để người nhận thấy bạn giỏi công nghệ hơn mức họ nghĩ",
          "Để yêu cầu dài hơn và được xếp vào nhóm ưu tiên cao hơn",
        ],
        "Việc đã thử giúp người nhận bỏ qua những bước quen thuộc và loại trừ vài nguyên nhân. Việc này không nhằm đổ lỗi hay khoe kỹ năng, và độ dài của yêu cầu không quyết định mức ưu tiên."
      ),
      q(
        "Ảnh chụp lỗi của bạn có tên khách và số liệu công việc. Nên làm gì trước khi gửi?",
        "Che hoặc cắt phần nhạy cảm, chỉ giữ dòng chữ lỗi và ứng dụng",
        [
          "Gửi nguyên ảnh vì IT trong công ty đều biết các khách này rồi",
          "Đổi tên tệp ảnh thành 'lỗi' là đủ, còn phần trong ảnh thì cứ để nguyên",
          "Dán ảnh vào AI trước để AI tự quyết định phần nào cần che giúp bạn",
        ],
        "Người hỗ trợ chỉ cần dòng chữ lỗi, không cần dữ liệu khách. Đổi tên tệp không đổi nội dung ảnh, còn dán vào AI chính là đưa dữ liệu ra ngoài trước khi che. Dù IT cùng công ty, nguyên tắc giữ tối thiểu thông tin vẫn đúng."
      ),
      q(
        "Khi nào nên hỏi bộ phận IT chứ không chỉ hỏi AI?",
        "Khi liên quan tới máy, tài khoản hay dữ liệu của công ty bạn",
        [
          "Khi câu hỏi chỉ là cách dùng một phần mềm văn phòng phổ biến hằng ngày",
          "Khi bạn muốn xem ví dụ mẫu cho một yêu cầu hỗ trợ",
          "Khi muốn hiểu một thuật ngữ lạ trong thông báo lỗi",
        ],
        "AI giúp tốt các câu hỏi chung: cách dùng, giải thích thuật ngữ, viết mẫu. Nhưng AI không thấy máy, tài khoản hay hệ thống công ty của bạn, và quyết định nào liên quan tới chúng phải do IT làm."
      ),
      q(
        "AI trả lời rằng 'vào mục Cài đặt, bấm Nâng cao, chọn Đặt lại kết nối' nhưng bạn không thấy mục đó. Nên xử lý thế nào?",
        "Nói với AI đúng điều bạn thấy trên màn hình và xin hướng dẫn lại",
        [
          "Tin AI và tìm cho bằng được mục đó, chắc là bạn chưa thấy",
          "Đổi sang công cụ AI khác rồi làm theo câu trả lời đầu tiên",
          "Bỏ cuộc và kết luận rằng máy của bạn bị lỗi nặng",
        ],
        "AI có thể mô tả một giao diện khác với cái bạn đang có, vì nó không nhìn thấy màn hình của bạn. Hướng xử lý đúng là cho nó thấy thực tế và hỏi lại. Tìm mãi, đổi công cụ hay kết luận máy lỗi đều không dựa trên bằng chứng."
      ),
    ],
    keyTakeaways: [
      "Yêu cầu tốt: muốn làm gì, đã xảy ra gì, ảnh, giờ, việc đã thử.",
      "Không bao giờ gửi mật khẩu, số thẻ hay dữ liệu khách.",
      "IT cho việc liên quan tới máy, tài khoản và dữ liệu công ty.",
      "AI có thể sai về giao diện, hãy nói lại điều bạn thực sự thấy.",
    ],
    practicePrompt: {
      question:
        "Chị Hà muốn nhờ AI viết giúp một yêu cầu hỗ trợ gửi IT. Chị nên đưa cho AI cái gì?",
      options: [
        "Dòng chữ lỗi và việc đã thử, bỏ mật khẩu và tên khách",
        "Toàn bộ email công việc gần đây để AI hiểu ngữ cảnh đầy đủ hơn",
        "Mật khẩu của chị để AI kiểm tra xem lỗi ở đâu",
        "Chỉ câu 'máy bị hỏng' để AI tự đoán phần còn lại",
      ],
      correct: 0,
      explanation:
        "Dòng chữ lỗi và việc đã thử đủ để AI soạn một yêu cầu rõ ràng. Toàn bộ email chứa dữ liệu không liên quan. Mật khẩu không bao giờ cần. Và câu quá ngắn buộc AI phải đoán, nên bản soạn cũng mơ hồ như câu gốc.",
    },
    summary: {
      keyIdea: "Mô tả rõ thì được giúp nhanh; và đừng gửi thứ không cần như mật khẩu.",
      formula: "Muốn làm gì + xảy ra gì + ảnh + giờ + đã thử = một lượt trả lời là xong.",
      commonMistake: "Viết 'máy hỏng rồi, giúp với' hoặc dán cả mật khẩu vào yêu cầu.",
      action: "Soạn sẵn một mẫu yêu cầu hỗ trợ có năm mục để lần sau chỉ điền.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Nhớ lại một lỗi bạn từng phải nhờ giúp. Viết lại yêu cầu theo năm mục: muốn làm gì, xảy ra gì, ảnh chụp (đã che thông tin nhạy cảm), giờ xảy ra, đã thử gì. Lưu thành một mẫu trong ghi chú để lần sau chỉ điền. Nếu công ty có cổng hỗ trợ, tìm xem nó yêu cầu điền những mục nào.",
      secondary: "Ghi tên kênh hỗ trợ IT của công ty vào sổ tay để lúc cần khỏi tìm.",
    },
    sections: [
      {
        type: "lead",
        text: "Lần tới cần nhờ giúp về công nghệ, hãy thử viết yêu cầu theo một khuôn cố định. Bài này đưa cho bạn khuôn đó và dạy bạn giữ mật khẩu ra khỏi nó.",
      },
      {
        type: "feynman",
        title: "Nhờ hỗ trợ đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới việc tả bệnh cho bác sĩ. Nói 'tôi thấy mệt' thì bác sĩ phải hỏi mười câu. Nói 'tôi đau đầu từ 8 giờ sáng, đã uống nước, chưa ăn sáng' thì họ vào việc ngay. Yêu cầu hỗ trợ cũng là tả triệu chứng: chuyện gì, từ lúc nào, đã thử gì.",
        columns: ["Điều cần tả", "Khi đi khám", "Khi nhờ hỗ trợ công nghệ"],
        rows: [
          ["Triệu chứng", "Đau ở đâu, đau thế nào", "Lỗi gì, ở ứng dụng nào"],
          ["Thời điểm", "Bắt đầu từ lúc nào", "Giờ xảy ra, có lặp lại không"],
          ["Đã thử", "Đã uống thuốc gì", "Đã khởi động lại, đã thử máy khác chưa"],
          ["Điều không kể", "Không đưa giấy tờ không liên quan", "Không đưa mật khẩu, dữ liệu khách"],
        ],
        oneLiner: "Tả như đi khám: triệu chứng, thời điểm, việc đã thử, và đừng kể điều không cần.",
      },
      { type: "heading", text: "Năm mục của một yêu cầu tốt" },
      {
        type: "paragraph",
        text: "Một yêu cầu tốt có năm mục: bạn muốn làm gì, điều gì đã xảy ra, ảnh chụp hoặc dòng chữ lỗi, giờ xảy ra, và việc bạn đã thử. Viết đủ năm mục chỉ mất hai phút, nhưng thường cứu bạn khỏi ba lượt hỏi đáp qua lại. Đó là lý do người gọi hỗ trợ tốt thường được giúp trước.",
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI soạn yêu cầu hỗ trợ",
        task: "Bạn không vào được thư mục chung từ sáng nay. Lắp prompt để AI soạn một yêu cầu gửi bộ phận IT.",
        parts: [
          {
            id: "facts",
            label: "Sự việc",
            options: [
              { text: "Máy tôi lỗi rồi, soạn giúp tôi một yêu cầu.", feedback: "AI không biết lỗi nào, ở đâu, nên bản soạn chung chung và có thể bịa chi tiết như 'lỗi mạng'." },
              { text: "Từ 9 giờ 10 sáng nay tôi không mở được thư mục chung 'Kế hoạch', hiện dòng 'Không có quyền truy cập'. Tôi đã khởi động lại máy và thử mở lại.", good: true, feedback: "Có giờ, nơi, dòng chữ lỗi và việc đã thử nên AI soạn đủ năm mục." },
            ],
          },
          {
            id: "secret",
            label: "Thông tin nhạy cảm",
            options: [
              { text: "Mật khẩu của tôi là (dán) để bạn ghi vào yêu cầu cho IT tiện vào kiểm tra.", feedback: "Mật khẩu không bao giờ được gửi. IT thật không cần nó, và nó có thể bị lộ khi lưu trong yêu cầu." },
              { text: "Không đưa mật khẩu hay tên khách; chỉ có tên thư mục và dòng chữ lỗi.", good: true, feedback: "Bạn chỉ chia sẻ phần cần thiết nên không lộ gì." },
            ],
          },
          {
            id: "format",
            label: "Dạng trả lời",
            options: [
              { text: "Viết một bức thư thật dài, trang trọng để họ thấy tôi nghiêm túc.", feedback: "Thư dài làm chìm thông tin quan trọng, người nhận phải đọc lâu hơn mới thấy lỗi." },
              { text: "Viết dưới 100 chữ, chia thành năm mục ngắn, có chỗ [đính kèm ảnh].", good: true, feedback: "Ngắn, có cấu trúc và nhắc bạn đính kèm ảnh." },
            ],
          },
        ],
        responses: [
          {
            requires: ["facts", "secret", "format"],
            text: "Tiêu đề: Không mở được thư mục chung 'Kế hoạch'\n\n1) Muốn làm: mở thư mục chung 'Kế hoạch'.\n2) Xảy ra: từ 9 giờ 10 sáng nay hiện 'Không có quyền truy cập'.\n3) Ảnh chụp: [đính kèm ảnh].\n4) Đã thử: khởi động lại máy, mở lại thư mục.\n5) Nhờ anh/chị kiểm tra quyền của tài khoản tôi.",
          },
          {
            requires: ["facts"],
            text: "Kính gửi Bộ phận IT,\n\nTôi xin trình bày một vấn đề mà tôi gặp phải trong quá trình làm việc, rất mong quý bộ phận xem xét và hỗ trợ trong thời gian sớm nhất, vì công việc của tôi đang bị ảnh hưởng...\n\n(Đủ thông tin nhưng chìm trong lời lẽ dài dòng.)",
          },
          {
            text: "Chào IT, máy của tôi bị lỗi mạng và có thể do cập nhật tối qua. Nhờ anh kiểm tra giúp.\n\n(AI tự đoán 'lỗi mạng' và 'cập nhật tối qua' vì bạn không nói gì cụ thể; thông tin này có thể dẫn IT đi sai hướng.)",
          },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Hỏi bộ phận IT",
          text: "Việc liên quan tới máy, tài khoản, quyền truy cập và dữ liệu của công ty. IT nhìn thấy hệ thống thật và có quyền xử lý. Đây cũng là nơi quyết định những chuyện như cài phần mềm hoặc cấp quyền.",
        },
        right: {
          label: "Hỏi AI",
          text: "Câu hỏi chung: giải thích thuật ngữ, cách làm một việc phổ biến, soạn yêu cầu hỗ trợ. AI không thấy hệ thống của bạn và có thể mô tả giao diện sai, nên cần kiểm tra lại điều nó nói.",
        },
      },
      {
        type: "flow",
        title: "Từ vấn đề tới một yêu cầu gửi đi",
        steps: [
          { label: "Viết một câu: bạn muốn làm gì", detail: "Ví dụ 'mở thư mục chung Kế hoạch'. Đây là đích bạn cần tới." },
          { label: "Ghi điều đã xảy ra và giờ", detail: "Dòng chữ lỗi chính xác, lúc nào bắt đầu, có lặp lại không." },
          { label: "Ghi việc đã thử", detail: "Khởi động lại, thử máy khác, thử lúc khác. Giúp loại trừ nguyên nhân." },
          { label: "Đính kèm ảnh đã che thông tin nhạy cảm", detail: "Che tên khách, số liệu, mật khẩu. Chỉ giữ dòng chữ lỗi và tên ứng dụng." },
          { label: "Gửi đúng kênh và báo lại kết quả", detail: "Dùng cổng hỗ trợ của công ty nếu có. Khi xong, báo lại để họ đóng yêu cầu." },
        ],
      },
      {
        type: "scenario",
        title: "Yêu cầu hỗ trợ lúc 9 giờ 30",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn không mở được thư mục chung và có cuộc họp lúc 11 giờ cần tệp trong đó. Bạn chuẩn bị nhắn cho IT.",
            choices: [
              { label: "Nhắn 'không vào được thư mục, gấp lắm' rồi chờ", next: "bad_short" },
              { label: "Viết theo năm mục và đính kèm ảnh chụp lỗi", next: "s2" },
            ],
          },
          bad_short: {
            text: "IT trả lời hỏi bạn thư mục nào, lỗi gì, từ lúc nào. Qua ba lượt trao đổi thì đã gần 11 giờ.",
            ending: "bad",
          },
          s2: {
            text: "Ảnh chụp của bạn có một cột tên khách hàng ở nền sau màn hình và bạn chưa nhận ra.",
            choices: [
              { label: "Gửi nguyên ảnh vì IT đâu có quan tâm khách", next: "bad_leak" },
              { label: "Cắt ảnh chỉ còn cửa sổ lỗi rồi mới gửi", next: "good" },
            ],
          },
          bad_leak: {
            text: "IT xử lý xong, nhưng ảnh có tên khách bị lưu trong cổng hỗ trợ mà nhiều người đọc được. Sau đó bạn phải nhờ gỡ ảnh.",
            ending: "bad",
          },
          good: {
            text: "IT thấy ngay dòng 'Không có quyền truy cập', cấp lại quyền trong năm phút. Bạn có tệp trước cuộc họp.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Năm mục, một tấm ảnh đã che, và không bao giờ gửi mật khẩu.",
          "Bài sau: gom cả chặng thành một trang sổ tay công nghệ của riêng bạn.",
        ],
      },
    ],
  },

  // ───────────── Bài 20 ─────────────
  {
    id: 2739,
    slug: "tong-ket-so-tay-an-toan-cong-nghe-mot-trang-cua-ban",
    title: "Chặng 66, Bài 20: Tổng kết: sổ tay công nghệ một trang cho chính bạn",
    subtitle: "Máy, mạng, tài khoản, sao lưu, ai gọi khi có sự cố: gom về một trang bạn tìm được trong một phút.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "📒",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Khi sự cố xảy ra, người ta ít khi hỏng vì thiếu hiểu biết, mà vì không nhớ mình đã làm gì, để gì ở đâu và nên gọi ai. Một trang ghi sẵn những điều đó, cất ở nơi tìm được, biến bốn tuần học rời rạc thành thứ dùng được lúc cần. Và đây là chỗ AI giúp đúng việc: rà xem bạn còn thiếu mục nào, không phải thay bạn nhớ.",
    openingQuestion:
      "Tuần sau bạn đi công tác và có thể gặp sự cố công nghệ. Trang ghi chú nào giúp bạn nhất?",
    openingOptions: [
      "Một trang ngắn: máy, mạng, tài khoản, sao lưu và số người cần gọi",
      "Một bản ghi chú dài chép lại mọi thứ bạn đã học trong các bài trước",
      "Một tệp chứa toàn bộ mật khẩu của bạn để khỏi phải nhớ",
      "Không cần ghi gì, vì cần thì cứ hỏi AI là được",
    ],
    correctOption: 0,
    explanation:
      "Trang ngắn với đúng các mục cần dùng khi sự cố xảy ra thì tìm được trong một phút. Bản ghi dài chép lại mọi bài học thì lúc vội bạn không đọc nổi. Tệp chứa mọi mật khẩu thì ai lấy được nó là lấy được tất cả, nên sổ tay chỉ ghi nơi cất mật khẩu, không ghi mật khẩu. Còn cần thì hỏi AI sẽ không có thông tin về máy và tài khoản của bạn.",
    diagram: [
      { label: "Gom thông tin về máy và mạng bạn đang dùng", arrow: true },
      { label: "Ghi nơi cất mật khẩu, tài khoản quan trọng, nơi sao lưu", arrow: true },
      { label: "Ghi ai gọi khi có sự cố và việc làm trong 10 phút đầu", arrow: true },
      { label: "Nhờ AI rà chỗ thiếu, rồi cất trang ở nơi tìm được lúc cần" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một nhân viên kinh doanh bị mất điện thoại khi đang đi công tác. Nhờ trang sổ tay in sẵn trong túi xách, anh biết ngay phải khoá tài khoản thế nào, gọi ai ở công ty, và ổ rời nào chứa bản hồ sơ. Đây là tình huống giả định để minh hoạ, không phải số liệu thật.",
    },
    quiz: [
      q(
        "Một trang sổ tay công nghệ nên có những mục nào?",
        "Máy và mạng, tài khoản, sao lưu, người cần gọi, việc làm 10 phút đầu",
        [
          "Mọi mật khẩu của bạn, danh sách ứng dụng đã cài và lịch sử lỗi cũ của máy",
          "Bảng giá thiết bị, tên nhà cung cấp và điều khoản bảo hành",
          "Toàn bộ nội dung các bài học đã xem, chép lại nguyên văn",
        ],
        "Sổ tay có ích là sổ trả lời được ba câu khi sự cố xảy ra: tôi có gì, để ở đâu, gọi ai. Mật khẩu không bao giờ nằm ngay trong sổ tay. Bảng giá và bảo hành là chuyện mua sắm, còn chép nguyên văn các bài học thì quá dài để dùng lúc vội."
      ),
      q(
        "Sổ tay có nên ghi mật khẩu của bạn không?",
        "Không, chỉ ghi nơi cất mật khẩu, ví dụ tên trình quản lý mật khẩu",
        [
          "Có, nhưng viết bằng chữ nhỏ để người khác khó đọc",
          "Có, vì sổ tay cất trong ngăn kéo nên không ai lấy được",
          "Có, nhưng chỉ ghi nửa đầu của mỗi mật khẩu cho an toàn",
        ],
        "Sổ tay có thể bị đánh rơi, chụp ảnh, hay bị người khác xem, nên không ghi mật khẩu. Chữ nhỏ, ngăn kéo hay một nửa mật khẩu đều chỉ làm chậm kẻ xấu chứ không chặn được họ."
      ),
      q(
        "Vì sao nên ghi 'việc làm trong 10 phút đầu' khi có sự cố?",
        "Lúc hoảng ta quên mất điều đã học, một danh sách ngắn thì làm theo được",
        [
          "Vì mười phút đầu là khoảng thời gian duy nhất mà sự cố còn sửa được bằng tay",
          "Vì làm nhanh trong mười phút luôn tốt hơn làm kỹ sau đó",
          "Vì IT chỉ nhận yêu cầu trong mười phút đầu của mỗi sự cố",
        ],
        "Sự cố làm người ta hoảng, nên một danh sách ngắn (dừng lại, chụp lỗi, báo người cần báo) giúp làm đúng việc. Không có quy tắc rằng mười phút đầu là hạn cuối, và làm vội chưa chắc tốt hơn làm cẩn thận."
      ),
      q(
        "Bạn nhờ AI rà trang sổ tay xem thiếu mục nào. Điều nào hợp lý nhất?",
        "Đưa cho AI cấu trúc các mục, bỏ số điện thoại, mật khẩu và tên khách",
        [
          "Đưa luôn mật khẩu và số điện thoại thật của bạn để AI kiểm tra từng chi tiết",
          "Đưa tên khách và số liệu công việc để AI hiểu nghề của bạn",
          "Không đưa gì, chỉ hỏi AI một sổ tay hoàn hảo trông thế nào",
        ],
        "AI chỉ cần cấu trúc (có mục nào, mục nào trống) để chỉ ra chỗ thiếu. Số điện thoại, mật khẩu và tên khách là thông tin không cần thiết và không nên đưa. Hỏi chung chung thì nhận về một mẫu không phản ánh sổ tay của bạn."
      ),
      q(
        "Bạn nên cất trang sổ tay ở đâu?",
        "Nơi tìm được cả khi máy hỏng, ví dụ bản in hoặc trên điện thoại",
        [
          "Trong thư mục sâu nhất của chính chiếc máy xách tay mà bạn đang dùng",
          "Trong một tệp đặt tên ngẫu nhiên để người lạ khó tìm ra được nó",
          "Chỉ trong đầu bạn, vì viết ra giấy hay lưu lại sẽ làm lộ thông tin",
        ],
        "Sổ tay dùng khi máy gặp sự cố, nên không thể chỉ nằm trên máy đó. Tên tệp ngẫu nhiên làm chính bạn cũng khó tìm. Và để trong đầu thì chính là lúc hoảng bạn dễ quên nhất."
      ),
    ],
    keyTakeaways: [
      "Một trang: máy, mạng, tài khoản, sao lưu, người cần gọi, việc làm 10 phút đầu.",
      "Ghi nơi cất mật khẩu, không ghi mật khẩu.",
      "Cất ở nơi tìm được cả khi máy hỏng.",
      "AI giúp rà chỗ thiếu; đừng đưa cho nó số điện thoại, mật khẩu hay tên khách.",
    ],
    practicePrompt: {
      question:
        "Chú Hùng muốn nhờ AI rà sổ tay của chú. Chú nên đưa gì cho AI?",
      options: [
        "Tiêu đề các mục và mục nào còn trống, đã bỏ thông tin nhạy cảm",
        "Nguyên trang sổ tay có cả mật khẩu thật và số điện thoại cá nhân",
        "Toàn bộ thư mục hồ sơ công việc để AI biết chú làm nghề gì",
        "Chỉ tên chú và nghề nghiệp để AI tự viết hộ cả trang sổ tay",
      ],
      correct: 0,
      explanation:
        "AI chỉ cần cấu trúc để chỉ ra mục thiếu. Đưa mật khẩu, số điện thoại hay cả hồ sơ là đưa dữ liệu không cần thiết. Và nếu chỉ đưa tên nghề thì AI viết một trang mẫu không phản ánh thiết bị và quy trình thật của chú.",
    },
    summary: {
      keyIdea: "Một trang ngắn, cất đúng nơi, giúp bạn làm đúng việc khi sự cố xảy ra.",
      formula: "Máy + mạng + tài khoản + sao lưu + người gọi + việc 10 phút đầu = sổ tay một trang.",
      commonMistake: "Viết quá dài, ghi cả mật khẩu, hoặc cất trang ở đúng chiếc máy có thể hỏng.",
      action: "Dựng bản nháp một trang rồi nhờ AI rà chỗ thiếu bằng cấu trúc đã bỏ thông tin nhạy cảm.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Mở một trang mới và đặt sáu đề mục: Máy và hệ điều hành; Mạng ở chỗ làm và ở nhà; Tài khoản quan trọng và nơi cất mật khẩu; Sao lưu (mấy bản, ở đâu); Người cần gọi khi có sự cố; Việc làm 10 phút đầu. Điền những gì bạn biết, để trống chỗ chưa biết, rồi nhờ AI chỉ ra đề mục nào còn thiếu hoặc mơ hồ. Đừng đưa mật khẩu hay số điện thoại.",
      secondary: "In trang ra giấy hoặc lưu vào điện thoại để tìm được khi máy không lên.",
    },
    sections: [
      {
        type: "lead",
        text: "Bốn tuần học rời rạc chỉ có ích khi lúc cần bạn tìm lại được. Bài cuối cùng gom chúng thành một trang duy nhất, và dùng AI đúng việc nó giỏi: chỉ ra chỗ bạn còn bỏ trống.",
      },
      {
        type: "feynman",
        title: "Sổ tay công nghệ đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới tấm thẻ dán trên tủ lạnh: số điện thoại cấp cứu, nơi để chìa dự phòng, tên ông thợ điện. Bạn không đọc nó mỗi ngày, nhưng khi cần thì thấy ngay, không phải nhớ. Sổ tay công nghệ là tấm thẻ đó cho máy và tài khoản của bạn.",
        columns: ["Mục", "Thẻ dán tủ lạnh", "Sổ tay công nghệ"],
        rows: [
          ["Nơi để đồ", "Chìa dự phòng ở đâu", "Bản sao lưu ở đâu"],
          ["Người gọi", "Thợ điện, bảo vệ toà nhà", "IT, người quản trị, nhà mạng"],
          ["Việc làm ngay", "Khoá van gas, ngắt cầu dao", "Dừng lại, chụp lỗi, báo người cần báo"],
          ["Điều không ghi", "Không ghi mã két sắt lên thẻ", "Không ghi mật khẩu, chỉ ghi nơi cất chúng"],
        ],
        oneLiner: "Sổ tay là tấm thẻ dán tủ lạnh cho công nghệ của bạn: ngắn, tìm được, và không chứa bí mật.",
      },
      { type: "heading", text: "Sáu mục đủ cho một trang" },
      {
        type: "list",
        items: [
          "Máy: loại máy, hệ điều hành, ai quản lý (bạn hay công ty).",
          "Mạng: mạng ở chỗ làm, mạng ở nhà, và khi nào nên dùng dữ liệu di động.",
          "Tài khoản: những tài khoản quan trọng nhất và nơi cất mật khẩu, không ghi mật khẩu.",
          "Sao lưu: mấy bản, ở những nơi nào, lần gần nhất là khi nào.",
          "Người gọi: IT, người quản trị, người thân giữ bản dự phòng.",
          "Việc làm 10 phút đầu: dừng lại, chụp lỗi, báo người cần báo, không tự sửa liều.",
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI rà chỗ thiếu trong sổ tay",
        task: "Bạn đã dựng bản nháp sổ tay sáu mục. Lắp prompt để AI chỉ ra mục nào còn thiếu hay mơ hồ, mà không cần biết thông tin riêng của bạn.",
        parts: [
          {
            id: "input",
            label: "Đưa gì cho AI",
            options: [
              { text: "Dán nguyên trang, kể cả mật khẩu và số điện thoại thật của tôi.", feedback: "Bạn đưa ra thông tin nhạy cảm mà AI không cần để rà chỗ thiếu." },
              { text: "Dán sáu đề mục, ghi mục nào đã điền và mục nào còn trống, bỏ mọi số điện thoại và mật khẩu.", good: true, feedback: "AI chỉ cần cấu trúc, nên bạn giữ được thông tin riêng." },
            ],
          },
          {
            id: "task",
            label: "Việc cần làm",
            options: [
              { text: "Viết lại cả sổ tay cho tôi cho đẹp và đầy đủ hơn.", feedback: "AI sẽ bịa thông tin về máy và tài khoản của bạn để cho đầy đủ." },
              { text: "Chỉ ra mục nào còn thiếu hoặc mơ hồ và hỏi tôi từng câu để tôi tự điền.", good: true, feedback: "AI chỉ hỏi lại, bạn giữ quyền điền thông tin thật." },
            ],
          },
          {
            id: "limit",
            label: "Giới hạn",
            options: [
              { text: "Nói càng nhiều càng tốt về mọi rủi ro công nghệ có thể xảy ra.", feedback: "Không có giới hạn nên AI trả về một bài dài, lạc khỏi sáu mục của bạn." },
              { text: "Tối đa năm câu hỏi, mỗi câu gắn với một mục, không bịa thông tin.", good: true, feedback: "Giới hạn rõ nên câu trả lời ngắn và bám vào các mục của bạn." },
            ],
          },
        ],
        responses: [
          {
            requires: ["input", "task", "limit"],
            text: "1) Mục Sao lưu: bạn đã ghi lần sao lưu gần nhất chưa?\n2) Mục Người gọi: bạn có ghi ai gọi khi IT không bắt máy không?\n3) Mục Tài khoản: bạn đã ghi tài khoản nào có xác minh hai bước chưa?\n4) Mục Mạng: bạn đã ghi việc làm khi mất Wi-Fi chưa?\n5) Mục 10 phút đầu: các bước này đã đủ ba việc chưa?",
          },
          {
            requires: ["input"],
            text: "Sổ tay của bạn cần có thêm phần bảo mật nâng cao, kế hoạch khắc phục thảm hoạ, chính sách dữ liệu, và quy trình phân quyền...\n\n(AI lan sang những việc một trang sổ tay cá nhân không cần.)",
          },
          {
            text: "Dưới đây là sổ tay hoàn chỉnh: máy Dell 16GB, mật khẩu Wi-Fi nhà bạn là 12345678, IT là anh Tuấn số 090...\n\n(AI bịa ra thiết bị, mật khẩu và số điện thoại vì bạn đã nhờ nó viết hộ thay vì rà chỗ thiếu.)",
          },
        ],
      },
      {
        type: "flow",
        title: "Từ bốn tuần học tới một trang",
        steps: [
          { label: "Lật lại bài đã học", detail: "Máy, mạng, tài khoản, sao lưu, cập nhật, đọc lỗi: mỗi bài cho bạn một việc cụ thể." },
          { label: "Điền sáu mục", detail: "Ghi ngắn, đúng thông tin của bạn. Mục nào chưa biết thì để trống." },
          { label: "Bỏ thông tin nhạy cảm", detail: "Chỉ ghi nơi cất mật khẩu, không ghi mật khẩu; không ghi số thẻ hay mã khôi phục." },
          { label: "Nhờ AI rà chỗ thiếu", detail: "Đưa cấu trúc đã bỏ thông tin riêng, xin tối đa năm câu hỏi." },
          { label: "Cất ở nơi tìm được", detail: "Bản in hoặc trong điện thoại, không chỉ trên chiếc máy có thể hỏng." },
        ],
      },
      {
        type: "scenario",
        title: "Sự cố đầu tiên sau khi có sổ tay",
        start: "s1",
        nodes: {
          s1: {
            text: "Một buổi sáng bạn mở máy và thấy màn hình đòi nhập mã lạ, như thể tài khoản bị khoá. Bạn đang đi công tác, còn hai giờ nữa phải báo cáo.",
            choices: [
              { label: "Thử đoán mật khẩu nhiều lần cho tới khi vào được", next: "bad_guess" },
              { label: "Mở sổ tay, xem mục 'Việc làm 10 phút đầu' và 'Người gọi'", next: "s2" },
            ],
          },
          bad_guess: {
            text: "Sau nhiều lần thử sai, tài khoản bị khoá hẳn và bạn phải chờ IT mở lại, mất cả buổi sáng.",
            ending: "bad",
          },
          s2: {
            text: "Sổ tay bảo bạn dừng lại, chụp màn hình và gọi IT. IT cần xác minh bạn là ai trước khi làm gì.",
            choices: [
              { label: "Gửi cho người gọi điện tự xưng là IT cả mã và mật khẩu cho nhanh", next: "bad_phish" },
              { label: "Tự gọi IT theo số bạn đã ghi trong sổ tay và làm theo hướng dẫn", next: "good" },
            ],
          },
          bad_phish: {
            text: "Người gọi không phải IT thật. Họ dùng mã và mật khẩu để vào tài khoản của bạn và bạn phải báo sự cố nghiêm trọng hơn nhiều.",
            ending: "bad",
          },
          good: {
            text: "IT thật xác minh và mở lại tài khoản trong mười phút. Bạn kịp báo cáo và ghi thêm vào sổ tay: luôn tự gọi theo số đã lưu, không nghe số gọi tới.",
            ending: "good",
          },
        },
      },
      {
        type: "callout",
        label: "Một trang, không phải một cuốn sách",
        text: "Nếu trang sổ tay dài quá một mặt giấy, bạn sẽ không đọc nổi lúc vội. Giữ mỗi mục vài dòng, bỏ những gì chưa từng dùng tới, và xem lại sau mỗi vài tháng hoặc khi bạn đổi máy, đổi việc.",
      },
      {
        type: "closing",
        lines: [
          "Sáu mục, một trang, cất ở nơi tìm được lúc máy không lên.",
          "Bạn đã xong chặng nền tảng công nghệ: máy, mạng, tài khoản, sao lưu và cách hỏi giúp.",
        ],
      },
    ],
  },
];
