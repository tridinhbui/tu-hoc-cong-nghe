import type { Lesson } from "../lesson-types";

// Chặng 61, bài 6-10. Giáo trình: scripts/curriculum/stage-61.json.
// Chỉ dạy khái niệm bền (tra cứu theo khoá, ghép bảng, cột phụ, đối chiếu) và
// cách kiểm kết quả; không nêu đường dẫn nút bấm, giá tiền hay phiên bản.

// Đáp án đúng viết đầu tiên (chỉ số 0); vị trí được xáo lại lúc build.
const q = (question: string, options: [string, string, string, string], explanation: string) => ({
  question,
  options,
  correct: 0,
  explanation,
});

export const S61_B_LESSONS: Lesson[] = [
  {
    id: 2625,
    slug: "tra-gia-theo-ma-hang-thay-vi-do-mat",
    title: "Chặng 61, Bài 6: Tra giá theo mã hàng thay vì dò bằng mắt",
    subtitle: "Bảng đơn 300 dòng ở một tab, bảng giá ở tab khác: để công thức đi tìm thay bạn.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🔎",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Sáng thứ Hai bạn có 300 dòng đơn chưa có giá và một bảng giá nằm ở tab khác. Dò từng dòng bằng mắt vừa chậm vừa dễ nhìn nhầm hàng. Hiểu công thức tra cứu đang tìm cái gì ở đâu thì bạn giao được việc cho AI và biết chắc kết quả nó viết có đáng tin hay không.",
    openingQuestion:
      "Bạn có bảng đơn 300 dòng (cột mã hàng, số lượng) và bảng giá riêng (cột mã hàng, đơn giá). Bạn nhờ AI viết công thức điền đơn giá vào bảng đơn. Điều gì bạn phải nói rõ nhất trong yêu cầu?",
    openingOptions: [
      "Mã hàng nằm ở cột nào, giá nằm ở cột nào của bảng nào",
      "Bảng tính của bạn là Excel hay Google Sheets, bản nào mới nhất",
      "Bạn muốn công thức ngắn hay dài, nhìn cho đẹp mắt hơn",
      "Bạn đã dùng AI được bao lâu và thích giọng trả lời kiểu nào",
    ],
    correctOption: 0,
    explanation:
      "Một công thức tra cứu chỉ làm đúng ba việc: lấy mã ở dòng hiện tại, tìm mã đó trong một cột của bảng giá, rồi trả về giá nằm cùng dòng ở cột khác. AI không nhìn thấy tệp của bạn nên nó không biết cột nào là cột nào; thiếu thông tin đó nó sẽ tự đặt tên cột và công thức chạy ra lỗi hoặc ra giá của hàng khác. Loại phần mềm chỉ là chi tiết phụ, độ dài công thức và thói quen dùng AI không liên quan gì tới việc công thức tìm đúng hay sai.",
    diagram: [
      { label: "Bảng đơn: mã hàng ở dòng này", arrow: true },
      { label: "Công thức đi tìm mã đó trong cột mã của bảng giá", arrow: true },
      { label: "Lấy đơn giá nằm cùng dòng, ở cột giá", arrow: true },
      { label: "Bạn kiểm ba dòng bằng mắt rồi mới kéo xuống hết" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: kế toán một cửa hàng phân phối nhỏ",
      description:
        "Một bạn kế toán nhận tệp đơn tuần có 300 dòng, mỗi dòng chỉ có mã hàng và số lượng. Trước đây bạn mở bảng giá bên cạnh và gõ từng giá, hết gần hai tiếng và tuần nào cũng sai vài dòng vì nhìn lệch hàng. Sau khi hiểu cách tra cứu, bạn mô tả hai bảng cho AI, nhận công thức, kiểm ba dòng rồi kéo xuống; việc còn lại là rà các dòng ra lỗi. Thời gian và số dòng trong tình huống này là ví dụ tự dựng.",
    },
    quiz: [
      q(
        "Công thức tra giá theo mã hàng cần biết rõ những gì để chạy đúng?",
        [
          "Mã cần tìm, bảng để tìm, cột lấy giá về, và khớp đúng hay gần đúng",
          "Chỉ tên cột giá, vì công thức tự đoán ra hàng nào cần dùng",
          "Chỉ số dòng của bảng giá, vì mã hàng không đứng vào công thức",
          "Chỉ tổng số đơn, vì công thức dùng nó để chia đều giá cho các hàng trong bảng",
        ],
        "Tra cứu là tìm một khoá (mã) trong một cột rồi lấy giá trị cùng dòng ở cột khác, nên cần đủ bốn thứ. Không có mã thì công thức không biết tìm gì; thiếu cột giá thì không biết lấy gì về. Số dòng hay tổng đơn không phải thông tin để tìm, và công thức không chia đều giá cho hàng nào cả.",
      ),
      q(
        "Với mã hàng, chọn kiểu khớp nào cho cột tra cứu?",
        [
          "Khớp chính xác",
          "Khớp gần đúng, vì mã SP-10 nằm gần SP-1 nên vẫn có giá để dùng",
          "Khớp gần đúng, vì nó nhanh hơn và bảng giá ít khi đổi thứ tự",
          "Kiểu nào cũng ra cùng kết quả nếu bảng giá có đủ mã hàng của bạn",
        ],
        "Mã hàng là định danh: SP-10 và SP-1 là hai hàng khác nhau, nên chỉ chấp nhận mã trùng hẳn. Khớp gần đúng dành cho dải số như bậc thuế hay bậc chiết khấu, và nó sẽ âm thầm lấy giá của một hàng khác khi mã không có. Hai kiểu không cho cùng kết quả khi bảng giá thiếu mã hoặc chưa xếp thứ tự.",
      ),
      q(
        "Mỗi dòng bạn dò tay mất 20 giây, bảng có 300 dòng. Tổng thời gian dò là bao nhiêu?",
        [
          "100 phút (= 300 × 20 giây ÷ 60)",
          "6.000 phút (= 300 × 20, quên đổi giây ra phút)",
          "5 phút (= 300 ÷ 60, quên nhân với 20 giây mỗi dòng)",
          "1,7 phút (= 100 ÷ 60, chia đổi phút thêm một lần nữa)",
        ],
        "300 dòng × 20 giây = 6.000 giây, chia 60 được 100 phút. Con số 6.000 chính là số giây chưa đổi, 5 phút quên mất 20 giây mỗi dòng, còn 1,7 phút là chia đổi đơn vị hai lần. Đây là số ví dụ, nhưng phép tính đơn vị thì áp dụng cho mọi bảng của bạn.",
      ),
      q(
        "Một dòng đơn ra lỗi #N/A sau khi tra giá. Hiểu đúng nhất về lỗi đó là gì?",
        [
          "Công thức không tìm thấy mã đó trong cột mã của bảng giá",
          "Tệp bị hỏng, cần mở lại rồi dán lại toàn bộ công thức",
          "Giá của mã đó bằng 0 nên công thức không hiện được kết quả",
          "AI viết sai công thức, nên cả 300 dòng đều phải làm lại từ đầu",
        ],
        "#N/A nghĩa là 'không tìm thấy'. Công thức chạy bình thường nhưng mã ở dòng đó không có trong cột mã của bảng giá, vì thiếu thật hoặc vì viết khác đi. Nó không phải tệp hỏng, không phải giá bằng 0 và thường chỉ vài dòng bị chứ không phải cả bảng; bài sau sẽ học cách tìm cặp mã lệch nhau.",
      ),
      q(
        "Khi nhờ AI viết công thức tra giá, bạn nên đưa gì cho nó?",
        [
          "Tên các cột và hai hoặc ba dòng mẫu của cả hai bảng",
          "Toàn bộ 300 dòng đơn và bảng giá để nó tự chọn",
          "Chỉ câu 'điền giá cho tôi', vì AI tự hiểu bảng tính của người dùng",
          "Mật khẩu tệp và đường dẫn thư mục, để nó mở trực tiếp bảng của bạn",
        ],
        "AI chỉ cần hình dạng của dữ liệu: tên cột và vài dòng mẫu là đủ để viết đúng công thức. Dán cả bảng đơn hàng khách thật lên một công cụ chưa được duyệt là gửi dữ liệu ra ngoài mà không cần thiết. Câu quá ngắn khiến AI tự bịa tên cột, còn mật khẩu hay đường dẫn tuyệt đối không nên gửi cho bất kỳ ai.",
      ),
    ],
    keyTakeaways: [
      "Tra cứu = lấy khoá ở dòng này, tìm trong một cột, trả về giá trị cùng dòng ở cột khác.",
      "Mã hàng dùng khớp chính xác; khớp gần đúng chỉ dành cho dải số.",
      "Nhờ AI bằng tên cột và vài dòng mẫu, không cần dán cả bảng.",
      "#N/A là 'không tìm thấy', không phải tệp hỏng.",
      "Kiểm ba dòng bằng mắt trước khi kéo công thức xuống hết.",
    ],
    practicePrompt: {
      question:
        "Công thức AI viết cho ra giá của 298 dòng và #N/A ở hai dòng. Bạn làm gì đầu tiên?",
      options: [
        "Mở hai dòng lỗi, so mã đó với bảng giá để xem khác ở đâu",
        "Xoá hai dòng đó khỏi bảng đơn để tổng hiện ra cho gọn",
        "Gõ tay một mức giá đoán được vào hai ô cho đủ dòng",
        "Bảo AI viết lại công thức cho đến khi hết lỗi bằng mọi giá",
      ],
      correct: 0,
      explanation:
        "Hai ô lỗi là thông tin: chúng chỉ ra đúng chỗ dữ liệu không khớp. Xoá dòng làm mất đơn hàng thật, gõ giá đoán tạo con số không có nguồn, còn ép AI sửa đến hết lỗi thường khiến nó bọc lỗi thành số 0 để che đi thay vì tìm nguyên nhân.",
    },
    summary: {
      keyIdea: "Công thức tra cứu thay việc dò bằng mắt: nó tìm mã ở đâu thì bạn phải nói cho rõ.",
      formula: "Mã ở dòng này → tìm trong cột mã bảng giá → lấy giá cùng dòng → kiểm 3 dòng.",
      commonMistake: "Chọn khớp gần đúng cho mã hàng, nên ra giá của hàng khác mà không có lỗi nào báo.",
      action: "Mở một bảng của bạn có hai nơi lưu thông tin cho cùng một mã, ghi ra cột khoá của mỗi bảng.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một tệp của bạn có hai bảng liên quan (ví dụ bảng đơn và bảng giá, hoặc danh sách nhân viên và bảng phòng ban). Ghi ra: cột khoá của mỗi bảng, cột bạn muốn lấy về. Mô tả bằng lời cho AI, xin công thức, rồi kiểm ba dòng với số bạn tự biết chắc. Ngày mai dashboard sẽ hỏi bạn: công thức có ra đúng ở cả ba dòng không?",
      secondary: "Ghi lại số dòng ra #N/A nếu có; bài sau bạn sẽ dùng nó để tìm nguyên nhân.",
    },
    sections: [
      {
        type: "lead",
        text: "Sáng thứ Hai, sếp cần tổng giá trị đơn tuần trước trước giờ họp. Bạn có 300 dòng đơn chỉ ghi mã hàng và số lượng, còn giá nằm ở một bảng khác. Bài này cho bạn cách để công thức đi tìm giá thay vì mắt bạn.",
      },
      {
        type: "feynman",
        title: "Tra cứu trong bảng tính đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung bạn tra số điện thoại trong cuốn danh bạ: bạn đã biết tên, lật tới đúng tên, rồi đọc số ở cột bên cạnh. Công thức tra cứu làm đúng từng ấy việc, chỉ là nhanh hơn và không nhìn nhầm dòng.",
        columns: ["Bước", "Tra danh bạ giấy", "Công thức tra cứu"],
        rows: [
          ["Điều đã biết", "Tên người cần gọi", "Mã hàng ở dòng đơn này"],
          ["Nơi đi tìm", "Cột tên trong danh bạ", "Cột mã hàng của bảng giá"],
          ["Thứ lấy về", "Số điện thoại cùng dòng", "Đơn giá cùng dòng ở cột giá"],
          ["Khi không thấy tên", "Bạn biết ngay là chưa lưu", "Công thức báo lỗi #N/A"],
        ],
        oneLiner: "Tra cứu là tìm khoá ở một cột rồi đọc giá trị cùng dòng ở cột bên cạnh.",
      },
      { type: "heading", text: "Vì sao dò bằng mắt không bền" },
      {
        type: "paragraph",
        text: "Mỗi dòng bạn phải nhìn mã, cuộn sang tab giá, tìm mã đó, đọc giá, quay lại gõ. Làm vài chục dòng thì ổn; làm vài trăm dòng thì mắt mỏi và nhìn lệch hàng. Quan trọng hơn: lần sau bảng giá đổi, bạn phải làm lại từ đầu, còn công thức thì tính lại ngay.",
      },
      {
        type: "chart",
        title: "Thời gian dò tay theo số dòng đơn hàng",
        caption:
          "Số liệu minh hoạ tự dựng: kéo thanh trượt cho khớp với bảng của bạn. Đường trên là dò tay (số dòng × giây mỗi dòng ÷ 60); đường dưới là thời gian một lần mô tả bảng, nhận công thức và kiểm ba dòng.",
        kind: "line",
        xLabel: "Số dòng đơn hàng",
        yLabel: "Phút",
        x: { from: 50, to: 500, step: 50 },
        params: [
          { id: "secs", label: "Giây dò tay mỗi dòng", min: 5, max: 60, step: 5, value: 20, unit: "giây" },
          { id: "setup", label: "Phút dựng và kiểm công thức", min: 5, max: 30, step: 5, value: 10, unit: "phút" },
        ],
        series: [
          { label: "Dò tay", expr: "x * secs / 60" },
          { label: "Dùng công thức tra cứu", expr: "setup + x * 0" },
        ],
      },
      { type: "heading", text: "Hiểu công thức AI viết đang tìm gì ở đâu" },
      {
        type: "paragraph",
        text: "Dù AI viết hàm nào (tuỳ phần mềm có thể là VLOOKUP, XLOOKUP hoặc cách ghép INDEX và MATCH), nó luôn trả lời bốn câu hỏi. Giá trị cần tìm là gì? Tìm trong cột nào của bảng nào? Lấy giá trị ở cột nào về? Khớp chính xác hay gần đúng? Nếu bạn đọc được bốn câu đó trong công thức thì bạn đã hiểu nó.",
      },
      {
        type: "flow",
        title: "Một dòng đơn đi tìm giá của nó",
        steps: [
          { label: "Lấy mã ở dòng này", detail: "Công thức đọc ô mã hàng của dòng đang đứng, ví dụ SP-0417. Đây là 'điều đã biết' của phép tra." },
          { label: "Đi vào cột mã của bảng giá", detail: "Nó duyệt cột mã hàng của bảng giá từ trên xuống, tìm ô bằng đúng mã vừa lấy. Với mã hàng, chọn khớp chính xác." },
          { label: "Đọc giá cùng dòng", detail: "Khi thấy mã ở dòng thứ k của bảng giá, nó lấy ô ở dòng k của cột giá và điền vào bảng đơn." },
          { label: "Không thấy thì báo lỗi", detail: "Nếu mã không có trong bảng giá, ô hiện #N/A. Đó là tín hiệu để bạn tra nguyên nhân, không phải để che đi." },
          { label: "Bạn kiểm ba dòng", detail: "Chọn ba dòng có giá bạn tự biết chắc, đối chiếu rồi mới kéo công thức xuống cả 300 dòng." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI viết công thức tra giá",
        task: "Bảng 'Đơn' có cột A là Mã hàng, cột B là Số lượng (300 dòng). Bảng 'Giá' có cột A là Mã hàng, cột C là Đơn giá. Lắp prompt để AI viết công thức điền đơn giá vào cột C của bảng Đơn.",
        parts: [
          {
            id: "context",
            label: "Mô tả hai bảng",
            options: [
              { text: "Tôi có bảng đơn và bảng giá, cần giá cho mỗi đơn.", feedback: "AI không biết cột nào là cột nào nên sẽ tự đặt tên cột; công thức chạy ra lỗi hoặc lấy nhầm cột." },
              { text: "Bảng 'Đơn': cột A Mã hàng, cột B Số lượng. Bảng 'Giá': cột A Mã hàng, cột C Đơn giá, hàng 2 trở đi. Mẫu: SP-0417 | 12 và SP-0417 | 85.000.", good: true, feedback: "Có tên bảng, cột và dòng mẫu: AI viết công thức dùng đúng ô của bạn và bạn đối chiếu được với mẫu." },
            ],
          },
          {
            id: "task",
            label: "Yêu cầu tra cứu",
            options: [
              { text: "Điền đơn giá vào cột C của bảng Đơn theo mã hàng, chỉ khớp đúng từng mã; nếu không thấy mã thì để báo lỗi, đừng che.", good: true, feedback: "Nói rõ kiểu khớp và cách xử lý mã thiếu: lỗi hiện ra để bạn tra, không bị giấu thành số 0." },
              { text: "Điền giá cho hết các dòng, nếu không thấy thì cho giá gần nhất.", feedback: "'Giá gần nhất' là khớp gần đúng: mã thiếu sẽ âm thầm lấy giá hàng khác, tổng sai mà không có lỗi nào báo." },
            ],
          },
          {
            id: "format",
            label: "Cách kiểm",
            options: [
              { text: "Chỉ cần đưa công thức, tôi sẽ kéo xuống luôn.", feedback: "Không có bước kiểm: nếu công thức lệch cột, cả 300 dòng sai cùng lúc và bạn chỉ biết khi sếp hỏi." },
              { text: "Giải thích từng phần của công thức bằng lời thường, rồi cho tôi ba dòng mẫu để tự đối chiếu trước khi kéo xuống.", good: true, feedback: "Bạn hiểu công thức đang tìm gì ở đâu, và có ba dòng để kiểm bằng số bạn biết chắc." },
            ],
          },
        ],
        responses: [
          {
            requires: ["context", "task", "format"],
            text: "Công thức cho ô C2 của bảng Đơn (tìm mã ở A2 trong cột A của bảng Giá, lấy cột C, chỉ khớp chính xác), kéo xuống dòng 301.\n\nGiải thích: (1) lấy mã ở A2; (2) tìm đúng mã đó trong cột Mã hàng của bảng Giá; (3) lấy Đơn giá cùng dòng ở cột C; (4) nếu không có mã, ô báo #N/A.\n\nKiểm ba dòng: A2 = SP-0417 phải ra 85.000; A5 và A9 bạn đối chiếu với bảng giá trước khi kéo hết.",
          },
          {
            requires: ["context"],
            text: "Công thức cho ô C2 tìm mã ở A2 trong bảng Giá rồi lấy cột C, kéo xuống hết.\n\n(Đúng cột nhưng không nói rõ kiểu khớp và không có ba dòng để kiểm, nên bạn chưa biết công thức có lấy nhầm giá khi mã thiếu hay không.)",
          },
          {
            text: "Bạn thử công thức =GIA(A2) rồi kéo xuống. Cột 'Giá_SP' của bảng giá sẽ được điền tự động.\n\n(Hàm GIA và cột 'Giá_SP' không có trong tệp của bạn: AI thiếu thông tin nên bịa tên cho nghe hợp lý.)",
          },
        ],
      },
      {
        type: "callout",
        label: "Đừng tin một cột giá toàn số đẹp",
        text: "Công thức tra sai không ồn ào. Nếu chọn nhầm cột giá hoặc khớp gần đúng, mọi ô vẫn hiện số hợp lý. Cách duy nhất để biết là chọn ba dòng có giá bạn tự biết chắc rồi so từng dòng, trước khi kéo xuống và trước khi tính tổng.",
      },
      { type: "heading", text: "Các bước tự làm lần sau" },
      {
        type: "list",
        items: [
          "Bước 1 - Xác định cột khoá (mã hàng) của mỗi bảng và cột cần lấy về.",
          "Bước 2 - Mô tả bằng tên bảng, tên cột và hai ba dòng mẫu; không dán cả bảng khách thật.",
          "Bước 3 - Yêu cầu khớp chính xác và để mã thiếu hiện lỗi, không che thành số 0.",
          "Bước 4 - Kiểm ba dòng bằng số bạn biết chắc rồi mới kéo xuống.",
          "Bước 5 - Đếm số ô lỗi; nếu còn, đó là việc của bài sau.",
        ],
      },
      {
        type: "scenario",
        title: "Tổng giá trị đơn cho cuộc họp 10 giờ",
        start: "s1",
        nodes: {
          s1: {
            text: "AI đưa bạn công thức. Bạn kéo xuống 300 dòng, không còn lỗi nào. Sếp đang chờ tổng để họp lúc 10 giờ.",
            choices: [
              { label: "Tính tổng và gửi luôn, vì không có ô nào báo lỗi", next: "bad_trust" },
              { label: "Chọn ba dòng có giá bạn biết chắc, đối chiếu với bảng giá rồi mới tính tổng", next: "s2" },
            ],
          },
          bad_trust: {
            text: "Công thức đã lấy nhầm cột đơn giá cũ ở bảng giá. Mọi ô đều hiện số, tổng thấp hơn thật khoảng một phần mười. Trong cuộc họp, bộ phận bán hàng chỉ ra ngay con số không khớp doanh thu họ biết.",
            ending: "bad",
          },
          s2: {
            text: "Hai dòng khớp, dòng thứ ba ra giá của mã SP-10 trong khi đơn ghi SP-1. Bạn mở công thức và thấy nó đang ở chế độ khớp gần đúng.",
            choices: [
              { label: "Bỏ qua vì chỉ lệch một dòng trong ba dòng", next: "bad_ignore" },
              { label: "Đổi sang khớp chính xác, kiểm lại ba dòng rồi mới tính tổng", next: "good" },
            ],
          },
          bad_ignore: {
            text: "Kiểu khớp gần đúng vẫn chạy cho mọi mã, nên không chỉ một dòng mà nhiều dòng âm thầm lấy giá của hàng liền kề. Tổng vẫn sai, và bạn đã nhìn thấy dấu hiệu rồi lờ đi.",
            ending: "bad",
          },
          good: {
            text: "Sau khi đổi sang khớp chính xác, ba dòng đều đúng và hai dòng còn ra #N/A để bạn tra sau. Bạn gửi sếp tổng kèm ghi chú 'còn 2 dòng chưa có giá', đúng với thực tế.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Công thức tra cứu thay mắt bạn tìm mã; bạn vẫn là người kiểm kết quả.",
          "Bài sau: vài dòng ra lỗi vì mã viết khác nhau, và cách tìm cặp mã lệch.",
        ],
      },
    ],
  },
  {
    id: 2626,
    slug: "tra-cuu-tra-ve-loi-hoac-ket-qua-sai-vi-ma-hang-la-khac",
    title: "Chặng 61, Bài 7: Tra cứu ra lỗi hoặc giá sai vì mã hàng viết khác nhau",
    subtitle: "Hai mã nhìn y hệt nhưng máy thấy khác nhau: tìm cặp lệch và hiểu vì sao.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🧩",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Sau khi tra giá, vài dòng vẫn ra lỗi dù bạn nhìn thấy mã có trong bảng giá. Đó là lúc nhiều người gõ tay giá vào cho xong, và từ đó con số không còn nguồn. Biết vì sao hai mã nhìn giống nhau mà máy coi là khác giúp bạn sửa tận gốc, và nhận ra khi AI đoán sai nguyên nhân.",
    openingQuestion:
      "Dòng đơn ghi mã SP-0417, bảng giá cũng có SP-0417, nhưng công thức tra báo #N/A. Nguyên nhân thường gặp nhất là gì?",
    openingOptions: [
      "Một trong hai ô có ký tự thừa mắt không thấy, như dấu cách cuối",
      "Công thức không tra nổi mã có dấu gạch ngang nên bị lỗi, phải bỏ dấu đi",
      "Bảng giá đã quá cũ nên phần mềm từ chối cho tra",
      "Mã hàng trên 6 ký tự thì công thức luôn báo lỗi",
    ],
    correctOption: 0,
    explanation:
      "Với công thức tra cứu, hai ô chỉ khớp khi từng ký tự giống hệt nhau, kể cả dấu cách ở đầu hoặc cuối. Dấu cách thừa nhìn không ra nhưng khiến 'SP-0417 ' khác 'SP-0417'. Dấu gạch ngang là ký tự bình thường, bảng giá cũ vẫn tra được, và độ dài mã không phải giới hạn của công thức. Vì vậy thử đếm độ dài ký tự của hai ô là cách nhanh nhất để xem chúng có thật sự giống nhau không.",
    diagram: [
      { label: "Lọc các dòng ra lỗi", arrow: true },
      { label: "Lấy một mã lỗi, tìm nó trong bảng giá", arrow: true },
      { label: "So độ dài ký tự của hai ô để thấy chỗ lệch", arrow: true },
      { label: "Sửa ở nguồn rồi tra lại, đếm số lỗi còn lại" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: nhân viên điều phối kho",
      description:
        "Một bạn điều phối kho nhận bảng đơn do nhiều người gõ tay. Sau khi tra giá còn 14 dòng lỗi trên 300 dòng. Bạn mở thử một mã lỗi, thấy nó có dấu cách ở cuối; một mã khác trong bảng giá viết số 0 thành chữ O. Bạn sửa ở nguồn và số lỗi còn hai dòng thật sự thiếu mã. Các con số ở đây là ví dụ tự dựng để minh hoạ quy trình.",
    },
    quiz: [
      q(
        "Hai ô nhìn đều là SP-0417 nhưng công thức coi là khác nhau. Cách kiểm nhanh nhất là gì?",
        [
          "So độ dài ký tự của hai ô, ô nào dài hơn là ô có ký tự thừa",
          "Đổi màu nền hai ô cho giống nhau rồi chạy lại",
          "Gõ lại mã vào ô lỗi và tin là lần này gõ đúng",
          "Xoá cả bảng giá rồi dán lại từ đầu trong tệp mới",
        ],
        "Độ dài ký tự tiết lộ ký tự vô hình: 7 so với 8 nghĩa là có một dấu cách thừa. Đổi màu nền không đổi nội dung ô; gõ lại chỉ chữa một ô và bạn vẫn chưa biết vì sao; dán lại cả bảng mất rất nhiều thời gian và có thể mang lỗi y hệt sang bản mới.",
      ),
      q(
        "Bảng đơn ghi 'sp-0417', bảng giá ghi 'SP-0417'. Nhận định nào đúng nhất?",
        [
          "Nhiều phần mềm không phân biệt hoa thường, nên đây thường không phải nguyên nhân",
          "Chắc chắn là nguyên nhân, vì máy coi sp và SP là hai chữ khác",
          "Chữ thường tra nhanh hơn nên bảng giá phải viết lại theo chữ thường",
          "Phải đổi cả hai bảng sang chữ in hoa, nếu không công thức không chạy",
        ],
        "Các hàm tra cứu phổ biến thường xem chữ hoa và chữ thường như nhau, nên đây hiếm khi là lý do ra lỗi; thủ phạm thực sự hay là dấu cách, chữ O thay cho số 0 hay dấu gạch khác kiểu. Cách chắc chắn là thử ngay trên ví dụ thật của bạn chứ không tin vào một lời đoán, kể cả lời đoán của AI.",
      ),
      q(
        "Bạn thấy mã 'SP-0417' trong bảng đơn đứng sau một dấu cách. Sửa ở đâu là bền nhất?",
        [
          "Làm sạch mã ở nguồn hoặc cột phụ, để lần sau dán số mới vẫn sạch",
          "Sửa tay từng ô lỗi tuần này, tuần sau bảng mới sẽ tự sạch",
          "Thêm vào bảng giá một dòng có cả mã dấu cách, cho tra thấy",
          "Bỏ dòng lỗi đó khỏi bảng đơn và ghi chú là không có giá",
        ],
        "Nếu lỗi nằm ở cách nhập liệu thì tuần sau nó lặp lại. Làm sạch ở nguồn hoặc thêm cột phụ cắt dấu cách thừa thì việc chỉ làm một lần. Thêm mã lệch vào bảng giá làm bảng giá bẩn theo, còn bỏ dòng thì mất đơn hàng thật khỏi tổng.",
      ),
      q(
        "AI nói 'nguyên nhân chắc chắn là khác hoa thường'. Bạn nên làm gì?",
        [
          "Coi đó là giả thuyết và thử bằng đúng hai ô lỗi của mình",
          "Tin luôn vì AI đã học nhiều hơn bạn về hàm bảng tính",
          "Hỏi lại chính AI 'bạn có chắc không' rồi làm theo câu trả lời",
          "Đổi hết dữ liệu sang chữ in hoa ngay vì thế là an toàn nhất",
        ],
        "AI trả lời nghe chắc chắn cả khi đoán. Cách kiểm chứng là thử trực tiếp trên hai ô lỗi: đếm độ dài, so từng ký tự. Hỏi lại chính nó có thể chỉ cho bạn một câu khẳng định mới; đổi cả dữ liệu theo một lời đoán có thể làm hỏng cột đang đúng.",
      ),
      q(
        "Trên 300 dòng còn 2 dòng ra #N/A sau khi làm sạch mã. Kết luận hợp lý là gì?",
        [
          "Có thể hai mã đó thật sự chưa có trong bảng giá, cần hỏi người giữ bảng giá",
          "Công thức vẫn hỏng, cần viết lại toàn bộ cho đến khi 300 dòng không còn lỗi nào",
          "Chỉ hai dòng, cứ tính giá bằng mức trung bình cũng được",
          "Phần mềm bị lỗi nhỏ nên khởi động lại và kéo công thức lại là hết",
        ],
        "Sau khi dấu cách và ký tự lạ đã xử lý, dòng còn lỗi thường là mã thật sự thiếu trong bảng giá. Việc đúng là hỏi người phụ trách giá, không tự đoán. Điền trung bình tạo số không có nguồn, còn viết lại công thức không làm xuất hiện mã chưa từng có trong bảng giá.",
      ),
      q(
        "Một mã trong bảng giá viết 'SP-O417' (chữ O) thay vì 'SP-0417' (số 0). Vì sao khó thấy?",
        [
          "Chữ O và số 0 nhìn rất giống nhau, nhưng máy xem là hai ký tự khác",
          "Phần mềm tự đổi O thành 0 nên công thức chạy đúng còn mắt thấy sai",
          "Chữ O chỉ xuất hiện trong bảng in ra giấy chứ không có trong tệp",
          "Hai ký tự này luôn khác màu nên dễ nhận ra ngay khi cuộn bảng",
        ],
        "Máy so từng ký tự: O và 0 là hai ký tự khác dù nhìn gần như giống. Phần mềm không tự sửa và chúng cùng màu, nên mắt thường bỏ sót. Đếm độ dài thì hai mã bằng nhau, vì vậy bạn cần so từng ký tự hoặc dùng công cụ tìm để thử từng mã.",
      ),
    ],
    keyTakeaways: [
      "Hai ô chỉ khớp khi từng ký tự giống hệt, kể cả dấu cách vô hình.",
      "So độ dài ký tự là cách nhanh nhất thấy ký tự thừa.",
      "Chữ hoa thường thường không phải thủ phạm; hãy thử bằng ví dụ thật.",
      "Sửa ở nguồn hoặc cột phụ để lần sau không lặp lại.",
      "Dòng còn lỗi sau khi làm sạch có thể là mã thiếu thật: hỏi người giữ bảng giá.",
    ],
    practicePrompt: {
      question:
        "Mã lỗi 'SP-0417 ' dài 8 ký tự còn mã trong bảng giá 'SP-0417' dài 7 ký tự. Kết luận đúng là gì?",
      options: [
        "Mã đầu có một ký tự thừa, có thể là dấu cách ở cuối",
        "Bảng giá thiếu mã SP-0417 nên phải thêm vào ngay",
        "Hai mã giống nhau, lỗi nằm ở công thức cần viết lại",
        "Mã 8 ký tự luôn hợp lệ, còn mã 7 ký tự mới bị lỗi",
      ],
      correct: 0,
      explanation:
        "Dài hơn đúng một ký tự so với mã chuẩn cho thấy có ký tự thừa, thường là dấu cách. Bảng giá đã có mã này nên không cần thêm; hai mã chưa giống nhau theo máy; và không có quy tắc nào bảo mã dài hơn thì hợp lệ.",
    },
    summary: {
      keyIdea: "Máy so từng ký tự; thứ mắt bạn không thấy vẫn làm hai mã thành khác nhau.",
      formula: "Lọc dòng lỗi → so độ dài → tìm ký tự thừa → sửa ở nguồn → tra lại → đếm lỗi còn lại.",
      commonMistake: "Gõ tay giá vào ô lỗi cho xong, làm con số không còn nguồn và lần sau lỗi lại lặp.",
      action: "Lấy một mã lỗi của bạn và đếm độ dài ký tự ở cả hai bảng.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Mở bảng có ô ra #N/A từ bài trước (hoặc một bảng tra cứu khác của bạn). Chọn ba dòng lỗi, đếm độ dài ký tự của mã ở hai bảng và ghi nguyên nhân từng dòng: dấu cách, ký tự lạ hay thiếu mã thật. Ngày mai dashboard sẽ hỏi: bao nhiêu dòng lỗi là do ký tự thừa, bao nhiêu là thiếu mã thật?",
      secondary: "Nếu phát hiện một kiểu lỗi lặp lại, ghi nó vào một dòng ghi chú cạnh bảng.",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn đã kéo công thức tra giá xuống 300 dòng, và mười mấy dòng ra lỗi dù mã nhìn y hệt bảng giá. Bài này chỉ cách tìm ra cặp mã lệch nhau và hiểu vì sao, để bạn sửa gốc chứ không gõ tay.",
      },
      {
        type: "feynman",
        title: "Hai mã khác nhau dù nhìn giống nhau đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung bảo vệ tòa nhà so tên bạn với danh sách khách: tên viết thừa một khoảng trống hay một nét lạ thì ông vẫn trả lời 'không có tên này'. Công thức tra cứu khó tính y như vậy, vì nó so từng ký tự chứ không đoán ý.",
        columns: ["Điểm so sánh", "Bảo vệ đối chiếu danh sách", "Công thức tra cứu"],
        rows: [
          ["Cách so", "Từng chữ của tên trên danh sách", "Từng ký tự của mã trong ô"],
          ["Lỗi hay gặp", "Khách viết thừa khoảng trống hay sai dấu", "Dấu cách thừa, chữ O thay số 0, dấu gạch khác kiểu"],
          ["Kết quả khi lệch", "Bảo vệ báo 'không có tên này'", "Ô báo #N/A dù mắt thấy giống nhau"],
          ["Cách xử lý", "Sửa tên trên danh sách cho khớp", "Làm sạch mã ở nguồn rồi tra lại"],
        ],
        oneLiner: "Công thức không đoán ý: hai mã khác nhau một ký tự là hai mã khác nhau.",
      },
      { type: "heading", text: "Ba kiểu lệch hay gặp" },
      {
        type: "paragraph",
        text: "Kiểu thứ nhất là dấu cách ở đầu hoặc cuối, rất hay có khi mã được dán từ email hoặc phần mềm khác. Kiểu thứ hai là ký tự trông giống nhau như chữ O và số 0, hoặc chữ l và số 1. Kiểu thứ ba là dấu nối khác loại, như gạch ngang và gạch dài. Chữ hoa thường thì thường không gây lỗi, nhưng hãy thử bằng ví dụ thật thay vì tin một lời đoán.",
      },
      {
        type: "flow",
        title: "Tìm cặp mã lệch nhau trong bốn bước",
        steps: [
          { label: "Lọc các dòng ra lỗi", detail: "Lọc cột giá để chỉ còn các ô #N/A, ghi lại số dòng. Đây là số bạn sẽ so với sau khi sửa." },
          { label: "Chọn một mã lỗi và tìm trong bảng giá", detail: "Dùng ô tìm kiếm của bảng tính để tìm mã đó trong bảng giá. Nếu thấy một mã trông giống, bạn đã có cặp nghi ngờ." },
          { label: "So độ dài và từng ký tự", detail: "Dùng hàm đếm độ dài ký tự (thường tên là LEN) cho cả hai ô. Lệch một ký tự nghĩa là có ký tự thừa; bằng nhau mà vẫn lệch thì nghi O với 0." },
          { label: "Sửa ở nguồn, tra lại, đếm", detail: "Làm sạch ở cột nguồn hoặc thêm cột phụ cắt dấu cách (thường là hàm TRIM), tra lại và đếm lỗi còn lại. Dòng còn lỗi có thể là mã thiếu thật." },
        ],
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát lời giải thích của AI về 14 dòng lỗi",
        task: "Bạn dán cho AI vài mã lỗi và nhờ giải thích. Sự thật bạn đã kiểm: mã 'SP-0417 ' trong bảng đơn dài 8 ký tự còn mã 'SP-0417' trong bảng giá dài 7 ký tự; bảng giá có 86 mã, có đủ SP-0417; chữ hoa thường của hai mã giống nhau. Đánh dấu các câu AI tự thêm hoặc khẳng định sai.",
        segments: [
          { text: "Có 14 dòng ở bảng đơn ra #N/A khi tra giá." },
          { text: "Mã 'SP-0417 ' ở bảng đơn dài 8 ký tự, còn mã trong bảng giá dài 7 ký tự." },
          { text: "Nguyên nhân là bảng giá không có mã SP-0417, nên bạn phải thêm vào ngay.", error: "Bảng giá có đủ SP-0417; hai mã chỉ khác nhau một dấu cách ở cuối. Thêm mã mới chỉ làm bảng giá bẩn." },
          { text: "Một dấu cách ở cuối mã khiến máy coi hai mã là hai giá trị khác nhau." },
          { text: "Chắc chắn đây là do chữ hoa chữ thường khác nhau, nên phải đổi cả hai bảng sang chữ hoa.", error: "Hai mã đều viết hoa giống nhau; và các hàm tra cứu phổ biến thường không phân biệt hoa thường. Đây là lời đoán nghe chắc chắn, không phải phát hiện." },
          { text: "Cách sửa bền là làm sạch mã ở nguồn hoặc thêm cột phụ cắt dấu cách rồi tra lại." },
        ],
      },
      {
        type: "callout",
        label: "Vì sao không gõ tay giá vào ô lỗi",
        text: "Gõ tay xong bảng trông đủ, nhưng con số đó không còn nguồn, lần sau cập nhật giá nó vẫn nằm đó, và lỗi nhập liệu thì lặp lại. Hãy để ô lỗi nhắc bạn, rồi sửa nguyên nhân thay vì sửa kết quả.",
      },
      {
        type: "list",
        items: [
          "Mỗi lần có #N/A: ghi số dòng lỗi trước khi sửa.",
          "So độ dài ký tự của hai ô; đừng chỉ nhìn bằng mắt.",
          "Dòng còn lỗi sau khi làm sạch: hỏi người giữ bảng giá, đừng tự thêm mã.",
          "Sau khi sửa: đếm lại số dòng lỗi và ghi số đó vào ghi chú cạnh bảng.",
        ],
      },
      {
        type: "scenario",
        title: "Hai dòng lỗi cuối cùng",
        start: "s1",
        nodes: {
          s1: {
            text: "Sau khi cắt dấu cách và sửa O thành 0, 12 trong 14 dòng lỗi đã có giá. Còn hai mã, 'SP-0999' và 'SP-1203', vẫn ra #N/A; bạn tìm không thấy mã nào giống trong bảng giá.",
            choices: [
              { label: "Gõ tay mức giá bạn nhớ mang máng vào hai ô cho đủ dòng", next: "bad_guess" },
              { label: "Đánh dấu hai mã, hỏi người phụ trách bảng giá xem hai hàng này có giá chưa", next: "good" },
              { label: "Xoá hai dòng đơn khỏi bảng để tổng không còn lỗi", next: "bad_delete" },
            ],
          },
          bad_guess: {
            text: "Giá bạn nhớ là của năm trước. Tổng đơn vẫn chạy, nhưng hai dòng dùng giá cũ và không ai biết vì ô không còn báo lỗi. Hai tuần sau kế toán đối chiếu thấy lệch.",
            ending: "bad",
          },
          bad_delete: {
            text: "Hai đơn thật bị mất khỏi tổng. Khách vẫn nhận hàng nhưng báo cáo doanh thu không có hai đơn đó, và bạn phải giải thích vì sao.",
            ending: "bad",
          },
          good: {
            text: "Người phụ trách xác nhận hai mã mới chưa được thêm vào bảng giá và gửi giá chính thức. Bạn thêm vào bảng giá, tra lại và số lỗi về 0, kèm ghi chú nguồn giá.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Hai mã chỉ khớp khi giống từng ký tự; hãy đo bằng độ dài chứ đừng tin mắt.",
          "Bài sau: ghép hai bảng khi một bên có khách mà bên kia không có.",
        ],
      },
    ],
  },
  {
    id: 2627,
    slug: "ghep-hai-bang-khi-mot-ben-co-khach-ben-kia-khong-co",
    title: "Chặng 61, Bài 8: Ghép hai bảng khi một bên có khách mà bên kia không có",
    subtitle: "Muốn tìm cái còn thiếu thì phải giữ lại cả những dòng không có cặp.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "🔗",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Câu hỏi 'khách nào đã mua mà chưa có trong danh bạ' không thể trả lời bằng cách ghép chỉ những dòng có cặp, vì chính những dòng thiếu cặp mới là đáp án. Chọn sai cách ghép là cách làm cho bảng kết quả trông đầy đủ nhưng lặng lẽ giấu đi thứ bạn cần tìm.",
    openingQuestion:
      "Bạn có bảng 'Đơn hàng' (có mã khách) và 'Danh bạ khách'. Bạn muốn biết khách nào đã mua mà chưa có trong danh bạ. Cách ghép nào đúng?",
    openingOptions: [
      "Giữ mọi dòng ở bảng đơn, ghép danh bạ vào, rồi lọc dòng không có cặp",
      "Chỉ giữ dòng có mặt ở cả hai bảng, vì đó là dữ liệu sạch nhất",
      "Xoá các đơn có mã khách lạ khỏi bảng đơn trước khi ghép",
      "Ghép theo thứ tự dòng, dòng thứ k của bảng này với dòng thứ k của bảng kia",
    ],
    correctOption: 0,
    explanation:
      "Khách mua nhưng chưa có trong danh bạ chính là những dòng của bảng đơn không tìm được cặp ở danh bạ. Nếu chỉ giữ dòng có mặt ở cả hai bảng thì đúng những dòng đó bị loại ngay từ đầu và bạn không bao giờ thấy chúng. Xoá đơn lạ làm mất luôn câu trả lời, còn ghép theo thứ tự dòng là ghép hai người không liên quan vì hai bảng sắp xếp khác nhau.",
    diagram: [
      { label: "Bảng bên trái: thứ bạn muốn hỏi về (đơn hàng)", arrow: true },
      { label: "Ghép bảng bên phải theo mã khách, giữ mọi dòng bên trái", arrow: true },
      { label: "Dòng không tìm được cặp có ô trống ở các cột bên phải", arrow: true },
      { label: "Lọc các ô trống: đó là câu trả lời" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: nhân viên chăm sóc khách hàng",
      description:
        "Một bạn CSKH muốn gửi lời cảm ơn cho mọi khách đã mua trong quý, nhưng danh bạ chỉ lưu khách đã đăng ký. Bạn ghép bảng đơn với danh bạ và giữ mọi dòng đơn; các dòng có ô thông tin khách để trống là những người đã mua mà chưa có trong danh bạ, cần bổ sung. Con số và tên trong tình huống này là tự dựng.",
    },
    quiz: [
      q(
        "Muốn tìm khách đã mua mà chưa có trong danh bạ, bảng nào phải giữ trọn mọi dòng?",
        [
          "Bảng đơn hàng, vì đó là bên bạn đang hỏi về",
          "Danh bạ, vì khách nào cũng có trong đó",
          "Cả hai, vì bảng nào cũng phải giữ đủ thì kết quả mới đáng tin",
          "Không bảng nào, vì ghép xong thì bạn lọc lại bằng tay cho nhanh",
        ],
        "Câu hỏi là 'trong các đơn, đơn nào chưa có cặp trong danh bạ', nên bảng đơn là bên phải giữ hết. Giữ trọn danh bạ sẽ trả lời câu ngược lại: khách trong danh bạ chưa từng mua. Giữ cả hai cho ra bảng lộn xộn, còn lọc tay tốn công và dễ sót.",
      ),
      q(
        "Khi ghép giữ mọi dòng của bảng bên trái, dòng không tìm được cặp ở bảng phải trông thế nào?",
        [
          "Các cột của bảng phải ở dòng đó để trống",
          "Nó biến mất khỏi kết quả",
          "Nó được gán cho khách đứng đầu danh bạ cho đủ dòng",
          "Nó được ghép với khách có tên gần giống nhất",
        ],
        "Ghép giữ bên trái không bỏ dòng nào: nếu không có cặp thì các cột lấy từ bảng phải để trống. Chính ô trống đó là dấu hiệu để lọc. Ghép theo tên 'gần giống' là kiểu khớp gần đúng, không phải cách ghép này.",
      ),
      q(
        "Bảng đơn có 300 dòng, 280 dòng tìm được khách trong danh bạ. Có bao nhiêu dòng là khách chưa có trong danh bạ?",
        [
          "20 dòng (= 300 − 280)",
          "280 dòng (= số dòng có cặp, nhầm với số dòng thiếu)",
          "580 dòng (= 300 + 280, cộng hai số thay vì trừ)",
          "0 dòng, vì ghép bảng luôn cho ra đủ cặp cho mọi dòng",
        ],
        "Trong 300 dòng đơn, 280 dòng có cặp nên 300 − 280 = 20 dòng không có cặp. Con số 280 là số dòng đã khớp chứ không phải số thiếu, 580 là cộng nhầm, và ghép bảng không tự bịa ra cặp cho dòng thiếu. Số liệu ở đây là ví dụ.",
      ),
      q(
        "Nếu chỉ giữ những dòng có mặt ở cả hai bảng, điều gì xảy ra với câu hỏi 'ai thiếu trong danh bạ'?",
        [
          "Bạn không bao giờ thấy họ, vì chúng bị loại ngay từ đầu",
          "Bạn thấy họ ở cuối bảng vì dòng thiếu xếp xuống dưới",
          "Bạn thấy họ với tên ghi 'không xác định' do phần mềm tự gắn nhãn",
          "Kết quả không đổi, vì dòng thiếu luôn được ghép với dòng trống",
        ],
        "Giữ phần giao của hai bảng nghĩa là mọi dòng không có cặp bị bỏ, và chúng chính là câu trả lời bạn cần. Phần mềm không xếp dòng thiếu xuống cuối, không gắn nhãn 'không xác định' và không ghép với dòng trống.",
      ),
      q(
        "Trong mô phỏng SQL, lệnh 'LEFT JOIN ... WHERE o.id IS NULL' lọc ra những dòng nào?",
        [
          "Dòng ở bảng bên trái không tìm được cặp ở bảng bên phải",
          "Dòng cả hai bảng đều có, vì IS NULL là 'có dữ liệu'",
          "Dòng ở bảng bên phải, vì WHERE luôn lọc bảng viết sau",
          "Mọi dòng của cả hai bảng, vì NULL nghĩa là không lọc gì",
        ],
        "LEFT JOIN giữ hết dòng bên trái; dòng thiếu cặp có ô bên phải là NULL, và IS NULL lọc đúng những dòng đó. NULL nghĩa là 'không có giá trị', không phải 'có dữ liệu'; và điều kiện áp dụng cho kết quả ghép chứ không chọn một bảng theo thứ tự viết.",
      ),
    ],
    keyTakeaways: [
      "Muốn tìm cái thiếu thì giữ trọn bảng đang hỏi về và ghép bảng kia vào.",
      "Dòng không có cặp hiện ô trống ở các cột bên kia; lọc ô trống ra đáp án.",
      "Ghép chỉ phần chung sẽ làm biến mất đúng thứ bạn cần tìm.",
      "Bên nào đứng bên trái phụ thuộc câu hỏi, không phụ thuộc thứ tự bạn mở tệp.",
      "Khách thiếu trong danh bạ và khách chưa từng mua là hai câu hỏi ngược nhau.",
    ],
    practicePrompt: {
      question:
        "Bạn muốn biết khách nào trong danh bạ chưa từng mua gì. Bảng nào phải giữ trọn?",
      options: [
        "Danh bạ khách, rồi ghép đơn hàng vào và lọc dòng không có đơn",
        "Đơn hàng, rồi ghép danh bạ vào và lọc dòng không có khách",
        "Cả hai, rồi đếm số dòng của mỗi bảng để so với nhau xem có bằng nhau không",
        "Không bảng nào, chỉ cần so số dòng của hai bảng là đủ",
      ],
      correct: 0,
      explanation:
        "Câu hỏi là về khách trong danh bạ, nên danh bạ là bên giữ trọn; các dòng không có đơn là khách chưa từng mua. Giữ bảng đơn sẽ trả lời câu ngược lại, và so số dòng không cho biết khách nào thiếu mà chỉ cho biết có lệch hay không.",
    },
    summary: {
      keyIdea: "Câu hỏi 'cái gì còn thiếu' cần giữ trọn bảng đang hỏi về rồi ghép bảng kia vào.",
      formula: "Giữ mọi dòng bên hỏi → ghép theo khoá → lọc ô trống bên kia → đếm để so với kỳ vọng.",
      commonMistake: "Ghép chỉ phần chung rồi tự hỏi vì sao không thấy khách thiếu.",
      action: "Viết ra một câu hỏi 'cái gì thiếu' trong công việc và gọi tên bảng nào phải giữ trọn.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn hai danh sách của bạn có chung một khoá (ví dụ danh sách đơn và danh bạ khách, hoặc nhân viên và danh sách đào tạo). Viết một câu hỏi dạng 'ai có ở A mà chưa có ở B'. Nhờ AI chỉ cách ghép giữ trọn bảng A rồi lọc dòng trống, kiểm bằng ba dòng bạn biết chắc. Ngày mai dashboard sẽ hỏi: bạn tìm được bao nhiêu dòng thiếu?",
      secondary: "Ghi lại số dòng của bảng A, số dòng có cặp và số dòng thiếu; ba số này phải cộng lại đúng.",
    },
    sections: [
      {
        type: "lead",
        text: "Sếp hỏi: 'Quý này có khách nào mua mà mình chưa có trong danh bạ không?' Bạn có hai bảng: một bảng đơn, một danh bạ. Chọn cách ghép nào quyết định bạn có thấy câu trả lời hay không.",
      },
      {
        type: "feynman",
        title: "Ghép hai bảng giữ dòng thiếu đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung bạn cầm danh sách khách mời và danh sách người đã đến cửa. Muốn biết ai đã đến mà không có tên trong danh sách mời, bạn đi từng người đã đến và tìm tên họ trong danh sách; ai không tìm thấy thì ghi lại, chứ không bỏ họ đi.",
        columns: ["Điểm so sánh", "Đối chiếu danh sách khách mời", "Ghép bảng giữ bên trái"],
        rows: [
          ["Bên bạn đi từng dòng", "Người đã đến cửa", "Bảng đơn hàng"],
          ["Bên bạn tìm trong đó", "Danh sách khách mời", "Danh bạ khách"],
          ["Khi không tìm thấy", "Bạn ghi lại tên người đó", "Các cột danh bạ để trống ở dòng đó"],
          ["Kết quả cần", "Người đến mà không có tên mời", "Dòng có ô danh bạ trống"],
        ],
        oneLiner: "Muốn tìm cái thiếu, hãy đi từng dòng của bên bạn hỏi về và ghi lại dòng nào không có cặp.",
      },
      { type: "heading", text: "Hai cách ghép cho hai câu hỏi khác nhau" },
      {
        type: "comparison",
        left: {
          label: "Chỉ giữ dòng có ở cả hai bảng",
          text: "Dùng khi bạn cần số liệu của những khách chắc chắn có đủ thông tin ở cả hai nơi, ví dụ tính doanh thu theo vùng của khách đã đăng ký. Dòng không có cặp bị bỏ khỏi kết quả.",
        },
        right: {
          label: "Giữ mọi dòng của bảng đang hỏi",
          text: "Dùng khi bạn hỏi 'cái gì thiếu'. Dòng không có cặp vẫn ở lại với ô trống bên kia, và bạn lọc ô trống để ra câu trả lời.",
        },
      },
      {
        type: "flow",
        title: "Ghép giữ bên trái, từng bước",
        steps: [
          { label: "Chọn bảng bên trái", detail: "Là bảng bạn đang hỏi về, ở đây là bảng đơn hàng. Mọi dòng của nó sẽ có mặt trong kết quả." },
          { label: "Chọn khoá để ghép", detail: "Cột mã khách ở cả hai bảng, sạch dấu cách và cùng kiểu (bài 7). Khoá lệch thì ghép lệch." },
          { label: "Ghép bảng phải vào", detail: "Với mỗi dòng đơn, tìm khách cùng mã trong danh bạ và kéo thông tin sang. Không thấy thì để trống." },
          { label: "Lọc các dòng trống", detail: "Giữ những dòng có cột danh bạ trống. Đó là khách đã mua mà chưa có trong danh bạ." },
          { label: "Đếm để kiểm", detail: "Số dòng có cặp cộng số dòng thiếu phải bằng tổng số dòng của bảng đơn. Nếu lệch, còn chỗ ghép nhân đôi hoặc khoá lệch." },
        ],
      },
      {
        type: "sim",
        tool: "sql",
        mission: "left-join-null",
        title: "Thử ghép giữ bên trái ngay trong trình mô phỏng SQL",
        task: "Đây là mẫu đảo chiều của câu hỏi trong bài: tìm khách trong danh bạ chưa có đơn nào. Bạn vẫn dùng đúng mẫu ghép giữ trọn bảng bên trái rồi lọc ô trống; khi làm xong, tự hỏi nếu muốn tìm khách mua mà chưa có trong danh bạ thì bảng nào phải đứng bên trái.",
      },
      {
        type: "callout",
        label: "Hai câu hỏi ngược nhau, hai cách đặt bảng",
        text: "'Khách đã mua mà chưa có trong danh bạ' giữ bảng đơn; 'khách trong danh bạ chưa từng mua' giữ bảng danh bạ. Nếu AI trả về một bảng trông đầy đủ, đừng tin ngay: hỏi nó đã giữ trọn bảng nào, rồi tự đếm lại dòng.",
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát lời giải thích của AI về hai bảng ghép",
        task: "Bạn có 300 dòng đơn, 280 dòng tìm được khách trong danh bạ, 20 dòng không tìm được. AI giải thích cách ghép; đánh dấu câu sai hoặc tự thêm.",
        segments: [
          { text: "Để tìm khách mua mà chưa có trong danh bạ, hãy giữ mọi dòng của bảng đơn hàng." },
          { text: "Các dòng không tìm được cặp sẽ có ô danh bạ trống." },
          { text: "Trong 300 dòng đơn có 280 dòng khớp, nên có 20 dòng thiếu." },
          { text: "Nếu chỉ giữ dòng có ở cả hai bảng, 20 dòng thiếu vẫn được giữ lại ở cuối bảng.", error: "Chỉ giữ dòng có ở cả hai bảng thì 20 dòng thiếu bị loại ngay từ đầu, không được xếp ở cuối." },
          { text: "Nhóm 20 khách này đều là khách mới đăng ký tuần này nên chưa nhập danh bạ.", error: "AI tự bịa nguyên nhân; từ số liệu bạn chỉ biết họ chưa có trong danh bạ chứ không biết vì sao." },
        ],
      },
      {
        type: "scenario",
        title: "Chọn cách ghép cho câu hỏi của sếp",
        start: "s1",
        nodes: {
          s1: {
            text: "Sếp hỏi có khách nào mua mà chưa có trong danh bạ. AI gợi ý hai cách ghép và bạn phải chọn một.",
            choices: [
              { label: "Chỉ giữ dòng có ở cả hai bảng vì nó 'sạch' hơn", next: "bad_inner" },
              { label: "Giữ mọi dòng bảng đơn, ghép danh bạ vào, lọc dòng không có cặp", next: "s2" },
            ],
          },
          bad_inner: {
            text: "Bảng ra 280 dòng đẹp đẽ, không có dòng nào trống. Bạn báo sếp 'không có khách nào thiếu' trong khi 20 dòng thật sự thiếu. Một tuần sau khách kêu chưa nhận được thông báo vì họ không có trong danh bạ.",
            ending: "bad",
          },
          s2: {
            text: "Bảng có 300 dòng, trong đó 20 dòng có ô danh bạ trống. Bạn cộng 280 dòng có cặp với 20 dòng thiếu thì được đúng 300.",
            choices: [
              { label: "Gửi sếp danh sách 20 dòng, ghi rõ 'chưa có trong danh bạ' và không suy đoán vì sao", next: "good" },
              { label: "Xoá 20 dòng đó khỏi bảng đơn vì chưa có trong danh bạ", next: "bad_delete" },
            ],
          },
          bad_delete: {
            text: "20 đơn thật biến khỏi báo cáo doanh thu. Khách vẫn mua, nhưng tổng tháng thiếu đúng những đơn đó.",
            ending: "bad",
          },
          good: {
            text: "Sếp nhận danh sách 20 dòng cùng số kiểm 300 = 280 + 20. Bộ phận CSKH bổ sung danh bạ và hỏi từng khách lý do, thay vì tin vào một lời đoán.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Muốn tìm cái thiếu, giữ trọn bảng đang hỏi về; đếm lại để kiểm.",
          "Bài sau: tra cứu theo hai điều kiện cùng lúc, như mã hàng và tháng.",
        ],
      },
    ],
  },
  {
    id: 2628,
    slug: "tra-cuu-hai-dieu-kien-cung-luc-vd-ma-hang-va-thang",
    title: "Chặng 61, Bài 9: Tra cứu theo hai điều kiện: mã hàng và tháng",
    subtitle: "Cùng một mã nhưng giá đổi theo tháng: một khoá là chưa đủ.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "🗝️",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Khi giá thay đổi theo tháng, tra theo mã hàng một mình chỉ lấy dòng đầu tiên tìm thấy, tức là giá của một tháng nào đó cho mọi tháng. Bảng vẫn đầy số, không báo lỗi, nhưng tổng sai. Hiểu khoá hai điều kiện và cách tự kiểm ba ô với số bạn biết chắc giúp bạn tránh được loại lỗi âm thầm này.",
    openingQuestion:
      "Bảng giá có cột Mã hàng, Tháng và Đơn giá: SP-0417 có giá khác nhau ở tháng 1, 2, 3. Bạn tra giá chỉ theo mã hàng. Điều gì xảy ra?",
    openingOptions: [
      "Công thức lấy giá của dòng đầu tiên có mã đó, sai cho các tháng khác",
      "Công thức báo lỗi vì có nhiều hơn một dòng trùng mã nên không chọn được",
      "Công thức tính trung bình các giá của mã đó cho bạn",
      "Công thức tự hỏi bạn muốn lấy tháng nào rồi mới trả kết quả",
    ],
    correctOption: 0,
    explanation:
      "Tra cứu thông thường dừng ở dòng khớp đầu tiên và trả giá trị ở đó, nên mọi đơn mã SP-0417 đều nhận giá của tháng nằm đầu bảng giá. Không có lỗi nào báo vì công thức vẫn tìm được mã. Nó không báo lỗi khi trùng mã, không tự tính trung bình và không hỏi lại bạn. Vì vậy với giá đổi theo tháng bạn phải đưa cả mã lẫn tháng vào điều kiện tra.",
    diagram: [
      { label: "Dòng đơn có Mã hàng và Tháng", arrow: true },
      { label: "Ghép hai điều kiện thành một khoá, ví dụ SP-0417|2025-03", arrow: true },
      { label: "Bảng giá cũng có cột khoá ghép như vậy", arrow: true },
      { label: "Tra khoá ghép, rồi kiểm ba ô bằng số bạn biết chắc" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: nhân viên kinh doanh hàng tiêu dùng",
      description:
        "Một bạn kinh doanh có bảng giá theo tháng vì chương trình khuyến mãi thay đổi. Lần đầu tra giá chỉ theo mã hàng, tổng doanh thu tháng 3 cao hơn bảng của kế toán vì mọi đơn lấy giá tháng 1. Sau khi thêm điều kiện tháng và kiểm ba ô với hoá đơn bạn nhớ rõ, hai số khớp nhau. Con số cụ thể trong tình huống này là tự dựng.",
    },
    quiz: [
      q(
        "Giá thay đổi theo mã hàng và theo tháng. Cần bao nhiêu điều kiện để xác định đúng một giá?",
        [
          "Hai điều kiện: mã hàng và tháng",
          "Một điều kiện là mã hàng, còn tháng thì máy tự đoán ra",
          "Ba điều kiện, vì luôn cần thêm điều kiện số lượng mua",
          "Không cần điều kiện nào nếu bảng giá được sắp xếp gọn gàng",
        ],
        "Một giá được xác định bởi cặp (mã, tháng). Chỉ có mã thì công thức dừng ở dòng khớp đầu tiên; máy không tự đoán tháng và sắp xếp gọn cũng không thay được điều kiện. Thêm điều kiện số lượng chỉ cần khi chính bảng giá có bậc theo số lượng.",
      ),
      q(
        "Cách đơn giản để tra theo hai điều kiện là gì?",
        [
          "Thêm cột phụ ghép mã và tháng thành một khoá ở cả hai bảng",
          "Tra theo mã, rồi sửa tay các dòng có tháng khác",
          "Chia bảng giá thành mỗi mã một tệp riêng và mở từng tệp một",
          "Khớp gần đúng để công thức tự chọn tháng hợp lý",
        ],
        "Cột phụ ghép (ví dụ SP-0417|2025-03) biến hai điều kiện thành một khoá, rồi tra khoá như bình thường. Sửa tay từng dòng thì hết sức chậm, tách ra nhiều tệp làm việc thêm, và khớp gần đúng không biết 'tháng hợp lý' là gì nên lấy nhầm dòng.",
      ),
      q(
        "Cột khoá ghép trong bảng giá cần thêm điều kiện nào để tra ra đúng một giá?",
        [
          "Mỗi khoá ghép chỉ xuất hiện một lần trong bảng giá",
          "Mỗi khoá ghép phải có đúng hai lần để dự phòng",
          "Khoá ghép phải dài tối thiểu 20 ký tự",
          "Khoá ghép phải viết toàn chữ hoa và không có số",
        ],
        "Nếu một khoá ghép xuất hiện hai lần với hai giá khác nhau thì công thức chỉ lấy dòng đầu và bạn không biết. Khoá nên duy nhất, nên kiểm bằng cách đếm trùng. Độ dài tối thiểu hay chữ hoa không liên quan, và yêu cầu hai lần là sai hẳn.",
      ),
      q(
        "Bạn tra xong và kiểm ba ô, hai ô khớp hoá đơn bạn biết, một ô lệch. Bước tiếp theo?",
        [
          "Tìm vì sao ô đó lệch trước khi dùng cả bảng",
          "Dùng bảng luôn vì hai trên ba ô đã khớp",
          "Xoá ô lệch và điền tay giá đúng vào, để bảng nhìn đầy đủ",
          "Đổi ba ô kiểm khác cho tới khi cả ba đều khớp",
        ],
        "Một ô lệch là dấu hiệu công thức hoặc dữ liệu có vấn đề, và nhiều ô khác có thể lệch cùng lý do. Hai trên ba ô khớp không phải là 'gần đúng đủ dùng'. Điền tay che lỗi, còn đổi ba ô kiểm để cho đẹp là lờ đi đúng thứ bạn cần biết.",
      ),
      q(
        "Một ô 'Tháng' được lưu dạng chữ '3/2025' ở bảng đơn và dạng ngày thật ở bảng giá. Điều gì xảy ra với khoá ghép?",
        [
          "Hai khoá nhìn giống nhau nhưng khác nhau nên tra ra lỗi",
          "Công thức tự đổi chữ thành ngày rồi khớp chúng với nhau",
          "Khoá luôn khớp vì ô nào cũng hiện '3/2025' trên màn hình",
          "Công thức bỏ qua cột tháng và chỉ dùng mã hàng để tra",
        ],
        "Ô hiển thị giống nhưng nội dung khác: chữ và ngày thật là hai kiểu dữ liệu, nên khoá ghép khác nhau và tra báo lỗi. Công thức không tự đổi kiểu, hiển thị trùng không đủ để khớp, và nó cũng không tự bỏ cột tháng. Hãy thống nhất kiểu tháng trước khi ghép (bài 2).",
      ),
    ],
    keyTakeaways: [
      "Giá theo mã và tháng cần hai điều kiện; chỉ một điều kiện lấy dòng khớp đầu tiên.",
      "Cột phụ ghép hai điều kiện thành một khoá là cách dễ kiểm nhất.",
      "Khoá ghép phải duy nhất trong bảng giá.",
      "Thống nhất kiểu dữ liệu của tháng ở cả hai bảng.",
      "Tự kiểm ba ô bằng số bạn biết chắc trước khi tin cả bảng.",
    ],
    practicePrompt: {
      question:
        "Bạn đã dựng khoá ghép và công thức chạy không lỗi. Điều nào là bằng chứng mạnh nhất rằng nó đúng?",
      options: [
        "Ba ô bạn chọn, có giá bạn biết chắc từ hoá đơn, đều khớp",
        "Không có ô nào hiện lỗi trong toàn bộ 300 dòng",
        "AI xác nhận lại rằng công thức của nó chắc chắn đúng",
        "Công thức chạy nhanh hơn công thức tra theo mã hàng một mình",
      ],
      correct: 0,
      explanation:
        "Số bạn biết chắc từ nguồn độc lập (hoá đơn) mới là thước đo. Không báo lỗi chỉ chứng minh công thức tìm được khoá, không chứng minh nó tìm đúng dòng. Lời xác nhận của AI không phải kiểm chứng, và tốc độ chạy không nói gì về độ đúng.",
    },
    summary: {
      keyIdea: "Khi một mã có nhiều giá theo tháng, khoá phải gồm cả mã và tháng.",
      formula: "Khoá ghép = mã & tháng ở cả hai bảng → tra khoá → đếm trùng → kiểm ba ô.",
      commonMistake: "Tra theo mã hàng một mình nên mọi tháng lấy giá của một tháng.",
      action: "Chọn ba đơn có giá bạn biết chắc và ghi đáp án mong muốn trước khi chạy công thức.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một bảng giá hoặc bảng định mức của bạn thay đổi theo hai yếu tố (ví dụ mã hàng và tháng, hoặc loại khách và quý). Nhờ AI chỉ cách ghép hai yếu tố thành một khoá ở cả hai bảng và tra giá. Trước khi chạy, ghi ra giấy ba ô bạn biết chắc đáp án, rồi đối chiếu. Ngày mai dashboard sẽ hỏi: cả ba ô có khớp không?",
      secondary: "Đếm xem có khoá ghép nào xuất hiện hai lần trong bảng giá không.",
    },
    sections: [
      {
        type: "lead",
        text: "Quý này giá của cùng một mã hàng đổi mỗi tháng vì khuyến mãi. Bạn tra giá theo mã như lần trước thì bảng vẫn đầy số, nhưng tổng tháng 3 lại cao hơn bảng của kế toán. Bài này chỉ cách tra đúng khi một khoá là chưa đủ.",
      },
      {
        type: "feynman",
        title: "Tra cứu hai điều kiện đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung bảng giờ tàu: bạn không chỉ hỏi 'tàu đi Đà Nẵng', mà là 'tàu đi Đà Nẵng vào thứ Sáu'. Hai thông tin cùng lúc mới chỉ ra đúng một chuyến. Bảng giá theo tháng cũng vậy: mã hàng và tháng cùng nhau mới chỉ ra đúng một giá.",
        columns: ["Điểm so sánh", "Bảng giờ tàu", "Bảng giá theo mã và tháng"],
        rows: [
          ["Yếu tố thứ nhất", "Ga đến", "Mã hàng"],
          ["Yếu tố thứ hai", "Ngày đi", "Tháng"],
          ["Nếu chỉ dùng một yếu tố", "Có nhiều chuyến, bạn chọn nhầm", "Có nhiều giá, công thức lấy dòng đầu"],
          ["Kết quả khi đủ hai yếu tố", "Đúng một chuyến", "Đúng một đơn giá"],
        ],
        oneLiner: "Khi một mã có nhiều giá, hãy ghép mã với tháng thành một khoá duy nhất rồi mới tra.",
      },
      { type: "heading", text: "Lỗi không ồn ào" },
      {
        type: "paragraph",
        text: "Tra theo mã hàng một mình không báo lỗi, vì nó vẫn tìm được mã. Nó chỉ dừng ở dòng khớp đầu tiên, nên mọi đơn cùng mã nhận một giá. Đây là loại lỗi nguy hiểm nhất của bảng tính: kết quả trông hoàn toàn bình thường. Chỉ có kiểm bằng số bạn biết chắc mới lộ ra.",
      },
      {
        type: "flow",
        title: "Dựng tra cứu hai điều kiện",
        steps: [
          { label: "Thống nhất kiểu của tháng", detail: "Cả hai bảng đều lưu tháng theo cùng một kiểu, ví dụ ngày thật đầu tháng hoặc cùng một chữ như 2025-03. Khác kiểu thì khoá ghép lệch." },
          { label: "Thêm cột khoá ghép ở bảng giá", detail: "Nối mã hàng, một dấu ngăn và tháng, ví dụ SP-0417|2025-03. Dấu ngăn tránh hai cặp khác nhau cho cùng chuỗi." },
          { label: "Thêm cột khoá ghép ở bảng đơn", detail: "Dùng cách nối y hệt, từ mã hàng và tháng của dòng đơn." },
          { label: "Kiểm khoá ghép có trùng không", detail: "Trong bảng giá, mỗi khoá chỉ nên xuất hiện một lần. Đếm khoá trùng; nếu có, hỏi người giữ bảng giá." },
          { label: "Tra theo khoá ghép và kiểm ba ô", detail: "Tra khoá ở bảng đơn trong cột khoá của bảng giá, lấy đơn giá. Chọn ba ô có đáp án bạn biết chắc và so." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI dựng tra cứu theo mã hàng và tháng",
        task: "Bảng 'Giá' có Mã hàng (A), Tháng (B, dạng ngày thật đầu tháng), Đơn giá (C). Bảng 'Đơn' có Mã hàng (A), Ngày đơn (B). Bạn muốn điền đơn giá của đúng tháng của đơn. Lắp prompt cho AI.",
        parts: [
          {
            id: "context",
            label: "Mô tả bảng và quy tắc",
            options: [
              { text: "Giá của tôi thay đổi theo tháng, cần tra giá cho đơn.", feedback: "Thiếu tên cột và kiểu tháng: AI tự đoán, dễ trả về công thức chỉ tra theo mã hàng." },
              { text: "Bảng 'Giá': A Mã hàng, B Tháng (ngày đầu tháng), C Đơn giá. Bảng 'Đơn': A Mã hàng, B Ngày đơn. Một mã có một giá mỗi tháng. Mẫu: SP-0417 | 01/03/2025 | 92.000.", good: true, feedback: "Có tên cột, kiểu tháng, quy tắc một giá mỗi tháng và dòng mẫu: AI dựng khoá đúng và bạn so được với mẫu." },
            ],
          },
          {
            id: "task",
            label: "Yêu cầu",
            options: [
              { text: "Tra theo mã hàng và giá gần nhất cho nhanh.", feedback: "Bỏ tháng và dùng khớp gần đúng: công thức trả giá của một tháng khác mà không báo." },
              { text: "Tra theo hai điều kiện mã hàng và tháng của ngày đơn, bằng cột khoá ghép ở cả hai bảng, chỉ khớp chính xác; mã-tháng thiếu thì hiện lỗi.", good: true, feedback: "Nói rõ hai điều kiện, cách dựng khoá và hành vi khi thiếu: bạn được một công thức kiểm được." },
            ],
          },
          {
            id: "format",
            label: "Cách kiểm",
            options: [
              { text: "Giải thích từng bước, chỉ cho tôi cách đếm khoá trùng trong bảng giá, và cho 3 ô mẫu để tôi tự đối chiếu trước khi dùng.", good: true, feedback: "Bạn hiểu mỗi bước, biết kiểm khoá trùng và có ba ô để so với số bạn biết." },
              { text: "Chỉ cần đưa công thức, tôi tin là đúng.", feedback: "Không có bước kiểm: lỗi âm thầm của khoá thiếu sẽ chỉ lộ khi có người đối chiếu tổng." },
            ],
          },
        ],
        responses: [
          {
            requires: ["context", "task", "format"],
            text: "Bước 1: ở bảng Giá thêm cột D = mã hàng nối dấu | nối tháng (định dạng năm-tháng). Bước 2: ở bảng Đơn thêm cột C = mã hàng nối dấu | nối tháng của ngày đơn, cùng định dạng. Bước 3: tra giá bằng khoá C trong cột D, lấy cột Đơn giá, chỉ khớp chính xác.\n\nKiểm trùng: đếm từng khoá ở cột D; khoá nào đếm lớn hơn 1 thì hỏi người giữ bảng giá.\n\nBa ô mẫu: SP-0417 | 03/2025 phải ra 92.000; hai ô còn lại bạn tự đối chiếu với hoá đơn.",
          },
          {
            requires: ["context"],
            text: "Bạn thêm một cột khoá ghép ở hai bảng rồi tra giá theo khoá đó.\n\n(Đúng hướng, nhưng thiếu yêu cầu khớp chính xác và không có bước kiểm khoá trùng, nên chưa biết công thức có âm thầm lấy nhầm dòng hay không.)",
          },
          {
            text: "Bạn chỉ cần tra giá theo cột Mã hàng là xong, phần tháng tự động được chọn là tháng gần nhất.\n\n(Không có cơ chế 'tự chọn tháng': công thức lấy dòng đầu khớp mã, và AI trả lời chắc chắn dù thiếu dữ kiện.)",
          },
        ],
      },
      {
        type: "callout",
        label: "Kiểm bằng số có nguồn, không bằng cảm giác",
        text: "Ba ô kiểm phải có đáp án bạn biết độc lập với công thức: hoá đơn cũ, báo giá đã gửi, hoặc phép tính tay. Nếu đáp án mong muốn bạn chỉ ghi sau khi thấy công thức ra gì, đó không còn là kiểm mà là tự thuyết phục.",
      },
      {
        type: "list",
        items: [
          "Kiểu của tháng phải giống nhau ở cả hai bảng (xem lại bài về ngày tháng).",
          "Dùng dấu ngăn trong khoá ghép để không lẫn các cặp khác nhau.",
          "Đếm khoá trùng trong bảng giá trước khi tra.",
          "Ghi đáp án mong muốn của ba ô trước khi chạy công thức.",
        ],
      },
      {
        type: "scenario",
        title: "Ba ô kiểm và một ô lệch",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn đã ghi ba đáp án mong muốn từ hoá đơn cũ. Công thức chạy xong: hai ô khớp, ô thứ ba ra lỗi #N/A dù mã hàng và tháng của nó đều có trong bảng giá.",
            choices: [
              { label: "Bỏ ô thứ ba, dùng bảng vì hai ô khớp là đủ", next: "bad_skip" },
              { label: "So khoá ghép của ô lỗi với khoá trong bảng giá để xem kiểu tháng có lệch không", next: "s2" },
            ],
          },
          bad_skip: {
            text: "Lỗi do cột tháng của bảng đơn lưu dạng chữ, nên hàng chục dòng khác cũng ra lỗi hoặc lấy nhầm dòng. Tổng tháng sai và bạn đã có tín hiệu nhưng bỏ qua.",
            ending: "bad",
          },
          s2: {
            text: "Bạn thấy khoá của ô lỗi là 'SP-0417|3/2025' còn trong bảng giá là 'SP-0417|2025-03'. Cột tháng ở bảng đơn đang lưu dạng chữ.",
            choices: [
              { label: "Đổi tháng ở bảng đơn sang cùng kiểu với bảng giá, dựng lại khoá rồi kiểm lại ba ô", next: "good" },
              { label: "Gõ tay giá đúng vào ô lỗi cho nhìn đủ bảng", next: "bad_hand" },
            ],
          },
          bad_hand: {
            text: "Ô này hết lỗi nhưng các dòng cùng kiểu tháng vẫn lệch. Lần sau cập nhật giá, ô gõ tay giữ nguyên giá cũ và không ai biết.",
            ending: "bad",
          },
          good: {
            text: "Sau khi thống nhất kiểu tháng, cả ba ô khớp đáp án bạn đã ghi. Bạn ghi một dòng chú thích 'khoá = mã|tháng, đã kiểm 3 ô' cạnh bảng để lần sau dùng lại.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Khi giá đổi theo hai yếu tố, khoá phải có cả hai; kiểm bằng số bạn biết chắc.",
          "Bài sau: dự án nhỏ ghép hoá đơn với tiền về.",
        ],
      },
    ],
  },
  {
    id: 2629,
    slug: "du-an-nho-bang-doi-chieu-hoa-don-va-tien-ve",
    title: "Chặng 61, Bài 10: Dự án nhỏ: bảng đối chiếu hoá đơn và tiền về",
    subtitle: "Ghép hoá đơn với sao kê để ra hoá đơn chưa thu, và quyết định trước cách xử lý dòng lệch vài nghìn.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "🧾",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Cuối tháng, bạn phải biết hoá đơn nào khách đã trả và hoá đơn nào chưa. Ghép hai bảng cho ra 'chưa thu' nhanh hơn dò tay, nhưng dòng lệch vài nghìn là chỗ dễ tự quyết sai: cho qua thì có thể bỏ sót tiền, tự sửa số thì làm sổ sách mất dấu. Dự án này luyện cách xử lý có nguyên tắc.",
    openingQuestion:
      "Bạn ghép danh sách hoá đơn với sao kê theo số hoá đơn. Một hoá đơn 5.000.000 đồng thấy tiền về 4.985.000 đồng. Bạn làm gì đúng nhất?",
    openingOptions: [
      "Giữ dòng lệch, ghi riêng số chênh 15.000 và hỏi người phụ trách có coi là đã thu không",
      "Sửa số hoá đơn thành 4.985.000 cho khớp sao kê",
      "Đánh dấu 'đã thu' luôn vì chênh lệch chỉ 0,3%",
      "Xoá dòng khỏi bảng đối chiếu vì không thể khớp chính xác",
    ],
    correctOption: 0,
    explanation:
      "Số chênh 15.000 có thể là phí ngân hàng, khách trừ phí chuyển tiền, hoặc chỉ là thiếu thật; bạn không biết và không có quyền quyết định thay kế toán. Giữ dòng, ghi riêng số chênh và hỏi người có thẩm quyền là cách duy nhất vừa không mất dấu vừa không tự phán. Sửa số hoá đơn làm sai chứng từ gốc, đánh dấu 'đã thu' là tự đặt ra quy tắc mà chưa ai duyệt, còn xoá dòng thì hoá đơn biến mất khỏi đối chiếu.",
    diagram: [
      { label: "Danh sách hoá đơn (số, khách, số tiền)", arrow: true },
      { label: "Ghép với sao kê theo số hoá đơn, giữ mọi hoá đơn", arrow: true },
      { label: "Phân ba nhóm: khớp, lệch số tiền, chưa thấy tiền về", arrow: true },
      { label: "Dòng lệch đi theo quy tắc người có thẩm quyền đã duyệt" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: kế toán thu tiền ở một công ty dịch vụ nhỏ",
      description:
        "Một bạn kế toán thu tiền có 120 hoá đơn trong tháng và một sao kê. Bạn ghép theo số hoá đơn ghi trong nội dung chuyển khoản, giữ trọn danh sách hoá đơn và chia thành ba nhóm: khớp đủ, lệch số tiền, chưa thấy tiền. Nhóm lệch bạn gửi kế toán trưởng kèm số chênh để chị quyết định cách xử lý. Con số trong tình huống này là tự dựng.",
    },
    quiz: [
      q(
        "Để ra danh sách hoá đơn chưa thu tiền, bạn ghép theo hướng nào?",
        [
          "Giữ mọi hoá đơn, ghép sao kê vào, lọc dòng không có tiền về",
          "Giữ mọi dòng sao kê, ghép hoá đơn vào, lọc dòng trống",
          "Chỉ giữ dòng có ở cả hai bảng, vì đó là giao dịch khớp",
          "Ghép theo thứ tự dòng của hai bảng rồi so từng cặp",
        ],
        "Hoá đơn chưa thu là hoá đơn không tìm được khoản tiền về, nên bảng hoá đơn phải giữ trọn (bài 8). Giữ trọn sao kê cho ra khoản tiền chưa biết trả cho hoá đơn nào; chỉ giữ phần chung bỏ mất đúng hoá đơn chưa thu; ghép theo thứ tự dòng ghép hai thứ không liên quan.",
      ),
      q(
        "Khoá nào đáng tin nhất để ghép hoá đơn với dòng sao kê?",
        [
          "Số hoá đơn mà khách ghi trong nội dung chuyển khoản",
          "Số tiền, vì mỗi hoá đơn có một số tiền riêng",
          "Ngày chuyển khoản, vì khách luôn trả đúng hạn",
          "Tên khách, vì tên luôn viết giống nhau ở hai bảng",
        ],
        "Số hoá đơn là định danh riêng của từng hoá đơn. Nhiều hoá đơn có thể cùng số tiền, khách thường trả sớm hoặc muộn hơn hạn, và tên khách có thể viết khác nhau hoặc có nhiều khách trùng tên. Khoá lệch thì cả bảng đối chiếu lệch.",
      ),
      q(
        "Khoản tiền về lệch so với hoá đơn vài nghìn đồng. Ai quyết định cách xử lý?",
        [
          "Người có thẩm quyền về sổ sách, như kế toán trưởng",
          "Người làm bảng đối chiếu, vì họ hiểu số liệu nhất",
          "AI, vì nó tính nhanh và cho ra một ngưỡng hợp lý nhất",
          "Khách hàng, vì họ biết chính xác mình đã trả bao nhiêu",
        ],
        "Cách coi khoản lệch có thể bỏ qua hay không là quy tắc kế toán của công ty, nên người có thẩm quyền quyết định. Bạn chỉ báo số chênh và nguồn số liệu. AI không biết quy tắc công ty và có thể đưa một ngưỡng nghe hợp lý nhưng không có căn cứ; khách chỉ là một bên của giao dịch.",
      ),
      q(
        "Khi nhờ AI dựng bảng đối chiếu, nên cho nó xem gì?",
        [
          "Tên cột và vài dòng mẫu đã che số tài khoản, tên khách",
          "Toàn bộ sao kê kèm số tài khoản để nó đối chiếu chính xác",
          "Chỉ mô tả bằng lời 'hoá đơn và sao kê' mà không có cột nào",
          "Mật khẩu ngân hàng, để nó tải sao kê giúp bạn",
        ],
        "AI chỉ cần hình dạng của dữ liệu; số tài khoản và tên khách là dữ liệu nhạy cảm không cần gửi ra ngoài. Mô tả không có cột khiến nó tự đặt tên cột. Mật khẩu ngân hàng không bao giờ nên đưa cho công cụ hay người nào.",
      ),
      q(
        "Bảng đối chiếu có 120 hoá đơn: 96 khớp đủ, 9 lệch số tiền. Bao nhiêu hoá đơn chưa thấy tiền về?",
        [
          "15 hoá đơn (= 120 − 96 − 9)",
          "24 hoá đơn (= 120 − 96, quên trừ nhóm lệch số tiền)",
          "9 hoá đơn (= số hoá đơn lệch, nhầm với nhóm chưa thấy tiền)",
          "225 hoá đơn (= 120 + 96 + 9, cộng cả ba số lại với nhau)",
        ],
        "Ba nhóm cộng lại bằng tổng số hoá đơn: 96 khớp + 9 lệch + số chưa thấy = 120, nên số chưa thấy là 120 − 96 − 9 = 15. 24 là phần chưa khớp đủ, gồm cả nhóm lệch; 9 chỉ là nhóm lệch; 225 là cộng nhầm. Đây là số ví dụ, nhưng phép kiểm tổng này dùng được với mọi bảng.",
      ),
    ],
    keyTakeaways: [
      "Giữ trọn bảng hoá đơn, ghép sao kê vào, rồi chia ba nhóm: khớp, lệch, chưa thấy.",
      "Khoá là số hoá đơn, không phải số tiền hay tên khách.",
      "Dòng lệch đi theo quy tắc người có thẩm quyền duyệt, không tự sửa số.",
      "Ba nhóm cộng lại phải bằng tổng số hoá đơn.",
      "Che số tài khoản và tên khách khi nhờ AI.",
    ],
    practicePrompt: {
      question:
        "Bảng đối chiếu có một hoá đơn trả hai lần (hai dòng sao kê cùng số hoá đơn). Bước đúng là gì?",
      options: [
        "Ghi nhận trả trùng, báo người có thẩm quyền và không tự xoá dòng",
        "Xoá dòng thứ hai vì đã trả ở lần đầu",
        "Cộng hai khoản lại và coi như trả đủ cho hai hoá đơn",
        "Bỏ cả hai dòng khỏi bảng đối chiếu vì không biết dòng nào là đúng",
      ],
      correct: 0,
      explanation:
        "Trả trùng là chuyện cần xử lý (hoàn tiền hoặc trừ vào kỳ sau) theo quyết định của người có thẩm quyền. Xoá dòng làm mất dấu khoản tiền, cộng lại sai bản chất, và bỏ cả hai dòng thì tiền về biến mất khỏi đối chiếu.",
    },
    summary: {
      keyIdea: "Đối chiếu là ghép giữ trọn hoá đơn rồi phân ba nhóm; dòng lệch đi theo quy tắc đã duyệt.",
      formula: "Hoá đơn (giữ trọn) + sao kê theo số hoá đơn → khớp / lệch / chưa thấy → tổng ba nhóm = tổng hoá đơn.",
      commonMistake: "Tự sửa số hoặc đánh dấu 'đã thu' cho dòng lệch mà chưa ai duyệt quy tắc.",
      action: "Xin người phụ trách quy tắc xử lý dòng lệch trước khi dựng bảng, và ghi quy tắc vào đầu tệp.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn hai danh sách của bạn cần đối chiếu (hoá đơn và tiền về, hoặc đơn đặt và phiếu nhận hàng). Ghép giữ trọn danh sách bên bạn hỏi về, chia ba nhóm, rồi kiểm tổng ba nhóm bằng tổng số dòng. Với dòng lệch, hỏi người phụ trách quy tắc thay vì tự quyết. Ngày mai dashboard sẽ hỏi: bao nhiêu dòng mỗi nhóm và ai duyệt quy tắc?",
      secondary: "Che số tài khoản và tên khách trước khi dán mẫu cho AI.",
    },
    sections: [
      {
        type: "lead",
        text: "Cuối tháng, sếp hỏi: 'Còn hoá đơn nào khách chưa trả?' Bạn có danh sách hoá đơn và sao kê ngân hàng. Dự án nhỏ này ghép hai bảng thành một bảng đối chiếu, và đặt sẵn cách xử lý dòng lệch vài nghìn.",
      },
      {
        type: "feynman",
        title: "Đối chiếu hoá đơn đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung bạn có xấp phiếu nợ và sổ ghi tiền đã nhận. Bạn đi từng phiếu và tìm số phiếu trong sổ: thấy đủ tiền thì tick, thấy thiếu hoặc thừa thì đánh dấu riêng, không thấy thì ghi 'chưa thu'. Bảng tính làm đúng việc đó.",
        columns: ["Điểm so sánh", "Xấp phiếu nợ và sổ tiền", "Bảng đối chiếu"],
        rows: [
          ["Bên bạn đi từng dòng", "Từng phiếu nợ", "Từng hoá đơn"],
          ["Bên bạn tra trong đó", "Sổ ghi tiền đã nhận", "Sao kê ngân hàng"],
          ["Ba kết quả", "Đủ tiền, lệch, chưa thu", "Khớp, lệch số tiền, chưa thấy tiền về"],
          ["Khi lệch", "Bạn hỏi người giữ sổ trước khi gạch nợ", "Bạn báo người có thẩm quyền, không tự sửa"],
        ],
        oneLiner: "Đối chiếu là đi từng hoá đơn, tìm khoản tiền của nó và chia thành khớp, lệch, hoặc chưa thấy.",
      },
      { type: "heading", text: "Dựng bảng trong năm bước" },
      {
        type: "paragraph",
        text: "Bạn đã có hai kỹ năng: giữ trọn bảng đang hỏi về khi ghép (bài 8) và làm sạch khoá trước khi tra (bài 7). Dự án này ghép chúng lại: khoá là số hoá đơn tách ra từ nội dung chuyển khoản, bảng giữ trọn là hoá đơn, và có thêm một cột so số tiền.",
      },
      {
        type: "flow",
        title: "Từ hai bảng tới ba nhóm",
        steps: [
          { label: "Tách số hoá đơn từ sao kê", detail: "Nội dung chuyển khoản của khách thường chứa số hoá đơn lẫn chữ khác. Tách hoặc nhờ AI đề xuất cách tách, rồi kiểm mười dòng khó nhất." },
          { label: "Ghép giữ trọn hoá đơn", detail: "Mỗi hoá đơn tìm khoản tiền có cùng số hoá đơn. Hoá đơn không có khoản nào sẽ để trống cột tiền về." },
          { label: "Thêm cột chênh lệch", detail: "Chênh lệch = số tiền hoá đơn trừ tiền về. Bằng 0 là khớp; khác 0 là lệch; trống là chưa thấy tiền." },
          { label: "Chia ba nhóm", detail: "Khớp đủ, lệch số tiền, chưa thấy tiền về. Nhóm lệch giữ số chênh riêng, không sửa số hoá đơn." },
          { label: "Kiểm tổng ba nhóm", detail: "Số dòng ba nhóm cộng lại phải bằng tổng số hoá đơn. Lệch nghĩa là còn dòng bị ghép nhân đôi hoặc khoá lệch." },
        ],
      },
      {
        type: "callout",
        label: "Không có 'chênh lệch nhỏ thì cho qua' nếu chưa ai duyệt",
        text: "Một số công ty có ngưỡng chênh lệch được bỏ qua, một số thì không. Ngưỡng đó do kế toán trưởng hoặc người có thẩm quyền quy định; bạn và AI không tự đặt. Hãy ghi quy tắc vào đầu tệp cùng tên người duyệt, để tháng sau người khác dùng lại không phải đoán.",
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI dựng bảng đối chiếu",
        task: "Bảng 'HoaDon': A Số hoá đơn, B Khách, C Số tiền. Bảng 'SaoKe': A Ngày, B Nội dung chuyển khoản (có số hoá đơn lẫn chữ), C Số tiền. Lắp prompt để AI giúp bạn dựng đối chiếu.",
        parts: [
          {
            id: "context",
            label: "Mô tả bảng (đã che dữ liệu nhạy cảm)",
            options: [
              { text: "Tôi có hoá đơn và sao kê, hãy đối chiếu giúp tôi.", feedback: "Không có tên cột hay dòng mẫu: AI tự đặt tên cột và đưa ra công thức không chạy trên tệp của bạn." },
              { text: "HoaDon: A Số hoá đơn, B Khách, C Số tiền. SaoKe: A Ngày, B Nội dung (ví dụ 'CK HD0412 thanh toan'), C Số tiền. Mẫu đã che tên khách và số tài khoản.", good: true, feedback: "Có tên cột, dòng mẫu thật về hình dạng nội dung và đã che dữ liệu nhạy cảm." },
            ],
          },
          {
            id: "task",
            label: "Yêu cầu",
            options: [
              { text: "Giữ mọi hoá đơn, ghép với sao kê theo số hoá đơn tách từ nội dung, thêm cột chênh lệch, rồi chia ba nhóm: khớp, lệch, chưa thấy; đừng tự quyết định nhóm lệch.", good: true, feedback: "Nói rõ bảng nào giữ trọn, cách ghép, cột chênh lệch và ranh giới việc AI không được làm." },
              { text: "Cho tôi danh sách hoá đơn đã thu, dòng nào gần khớp thì coi là đã thu luôn.", feedback: "Bạn tự đặt quy tắc 'gần khớp' mà chưa ai duyệt, và bảng chỉ cho thấy đã thu, không thấy dòng lệch cần hỏi." },
            ],
          },
          {
            id: "format",
            label: "Cách kiểm",
            options: [
              { text: "Kết quả hiện ra là được.", feedback: "Không có cách kiểm: dòng bị ghép nhân đôi hay khoá lệch sẽ làm tổng sai mà bạn không thấy." },
              { text: "Giải thích các bước và cho tôi cách kiểm: số dòng ba nhóm phải bằng tổng số hoá đơn, và liệt kê ba dòng mẫu để tôi đối chiếu tay.", good: true, feedback: "Có phép kiểm tổng và ba dòng đối chiếu tay: lỗi ghép sẽ lộ ra trước khi bạn gửi sếp." },
            ],
          },
        ],
        responses: [
          {
            requires: ["context", "task", "format"],
            text: "Bước 1: ở SaoKe thêm cột D tách số hoá đơn từ nội dung (ví dụ HD0412). Bước 2: ở HoaDon thêm cột D tra số tiền về theo số hoá đơn trong cột D của SaoKe. Bước 3: cột E = C − D (bằng 0 là khớp, khác 0 là lệch, trống là chưa thấy tiền).\n\nKiểm: số dòng khớp + lệch + chưa thấy phải bằng tổng số hoá đơn. Ba dòng mẫu để đối chiếu tay: HD0412, HD0413, HD0414.\n\nNhóm lệch: giữ nguyên số hoá đơn và chỉ ghi số chênh; báo người có thẩm quyền quyết định.",
          },
          {
            requires: ["context"],
            text: "Bạn thêm một cột tra tiền về theo số hoá đơn rồi tính chênh lệch.\n\n(Đúng hướng nhưng thiếu phép kiểm tổng và không nói rõ dòng lệch phải để người có thẩm quyền quyết định.)",
          },
          {
            text: "Đã đối chiếu xong: 112 hoá đơn đã thu, 8 hoá đơn chưa thu. Các chênh lệch dưới 50.000 đồng được bỏ qua.\n\n(AI chưa thấy tệp mà vẫn đưa số cụ thể và tự đặt ngưỡng 50.000 đồng: cả hai đều bịa.)",
          },
        ],
      },
      {
        type: "scenario",
        title: "Dòng lệch 15.000 đồng trước giờ chốt sổ",
        start: "s1",
        nodes: {
          s1: {
            text: "Bảng đối chiếu xong. Có 96 hoá đơn khớp, 15 chưa thấy tiền, và 9 dòng lệch số tiền, trong đó dòng HD0412 lệch 15.000 đồng. Kế toán trưởng chốt sổ lúc 4 giờ chiều.",
            choices: [
              { label: "Sửa số tiền trên hoá đơn HD0412 cho bằng tiền về để hết lệch", next: "bad_edit" },
              { label: "Gửi kế toán trưởng 9 dòng lệch kèm số chênh và hỏi quy tắc xử lý", next: "s2" },
              { label: "Đánh dấu cả 9 dòng lệch là 'đã thu' vì chênh lệch đều nhỏ", next: "bad_mark" },
            ],
          },
          bad_edit: {
            text: "Hoá đơn là chứng từ gốc đã gửi khách; số trên bảng đối chiếu không còn khớp hoá đơn thật. Khi kiểm toán hỏi, không ai giải thích được vì sao hai số khác nhau.",
            ending: "bad",
          },
          bad_mark: {
            text: "Trong 9 dòng có một dòng lệch 1.200.000 đồng vì khách mới trả một phần. Nó được tính là đã thu, và cuối kỳ con số phải thu bị thấp đi mà không ai hay.",
            ending: "bad",
          },
          s2: {
            text: "Kế toán trưởng trả lời: khoản lệch do phí chuyển tiền được xử lý theo quy tắc của công ty, còn dòng lệch lớn cần liên hệ khách. Chị ghi quy tắc vào một dòng.",
            choices: [
              { label: "Ghi quy tắc và tên người duyệt vào đầu tệp, đánh dấu từng dòng lệch theo quy tắc đó", next: "good" },
              { label: "Chỉ nhớ trong đầu, lần sau hỏi lại nếu cần", next: "bad_memory" },
            ],
          },
          bad_memory: {
            text: "Tháng sau một bạn khác dùng tệp và tự đoán quy tắc khác. Hai tháng có hai cách xử lý, báo cáo không so sánh được.",
            ending: "bad",
          },
          good: {
            text: "Bảng có ba nhóm rõ ràng, tổng 96 + 15 + 9 = 120 khớp tổng hoá đơn, và quy tắc cùng người duyệt nằm đầu tệp. Tháng sau ai mở cũng làm được giống nhau.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Ghép giữ trọn hoá đơn, chia ba nhóm, kiểm tổng; dòng lệch đi theo quy tắc đã được duyệt.",
          "Bạn vừa xong phần tra cứu và ghép bảng; phần tiếp theo là bảng tổng hợp.",
        ],
      },
    ],
  },
];
