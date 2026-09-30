import type { Lesson } from "../lesson-types";

// Chặng 38, bài 1-5. Giáo trình: scripts/curriculum/stage-38.json.
// Không bài nào dựa vào tính năng riêng của một công cụ AI: chỉ dạy cách giao việc và cách kiểm kết quả.
export const S38_A_LESSONS: Lesson[] = [
  {
    id: 2160,
    slug: "viet-lai-sop-tu-loi-giai-thich-cua-tho-lanh-nghe",
    title: "Chặng 38, Bài 1: Viết lại SOP từ lời thợ lành nghề kể miệng",
    subtitle: "Anh thợ giỏi làm bằng tay, bạn ghi lại bằng tai: AI dựng khung, anh thợ kiểm từng bước.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "📋",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Xưởng nào cũng có một người mà ai hỏi cũng bảo 'cứ hỏi anh Hùng'. Khi anh nghỉ phép hay nghỉ việc, cách làm đi theo anh. SOP (quy trình làm việc chuẩn, viết thành các bước) là cách giữ nó lại. AI dựng khung từ lời kể của anh rất nhanh, nhưng người quyết định bước nào đúng vẫn phải là người đang đứng máy.",
    openingQuestion:
      "Anh Hùng, thợ vận hành máy đóng gói 15 năm, kể miệng cách thay cuộn màng cho bạn nghe. Bạn ghi lại lộn xộn rồi nhờ AI viết SOP. Bước quan trọng nhất sau khi có bản nháp là gì?",
    openingOptions: [
      "Đưa bản nháp cho anh Hùng đọc và sửa từng bước",
      "Nhờ AI làm bản nháp đẹp hơn, đánh số và in đậm tiêu đề",
      "Phát ngay cho cả ca vì AI đã sắp xếp đúng thứ tự",
      "Nhờ một AI khác kiểm bản nháp thay cho anh Hùng đỡ mất công",
    ],
    correctOption: 0,
    explanation:
      "Người biết bước nào đúng là người đứng máy mỗi ngày. AI chỉ sắp lại lời kể; nó có thể bỏ một thao tác mà anh Hùng làm theo thói quen và quên nhắc, hoặc thêm một bước nghe hợp lý nhưng không ai làm thật. Làm bản nháp đẹp hơn không sửa được nội dung sai. Phát ngay cho cả ca là biến chỗ sai thành thói quen của cả ca. AI thứ hai cũng chưa từng đứng cạnh cái máy đó nên không thay được anh.",
    diagram: [
      { label: "Ghi lời kể của thợ, giữ nguyên từ ngữ và con số", arrow: true },
      { label: "AI dựng khung các bước từ đúng bản ghi đó", arrow: true },
      { label: "Thợ đọc từng bước, sửa và bổ sung chỗ thiếu", arrow: true },
      { label: "Người mới làm thử theo SOP, chỗ vấp là chỗ cần sửa tiếp" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một xưởng đóng gói có một thợ lâu năm sắp chuyển ca. Người quản đốc ghi âm cách anh thay cuộn màng, gỡ lời thành chữ rồi nhờ AI xếp thành các bước. Khi đọc lại, anh nhận ra bản nháp thiếu việc lau con lăn - việc anh làm theo phản xạ nên quên kể. Chính lần đọc lại đó mới bổ sung được bước bị bỏ.",
    },
    quiz: [
      {
        question: "Vì sao SOP dựng từ lời kể của thợ phải được chính thợ đó đọc lại?",
        options: [
          "Thợ là người phát hiện được bước AI bỏ sót hoặc thêm bừa",
          "Vì thợ có quyền ký duyệt mọi văn bản trong xưởng",
          "Vì AI luôn viết sai chính tả các thuật ngữ của nghề",
          "Vì đọc lại giúp thợ nhớ lâu hơn cách làm của mình đã kể ra",
        ],
        correct: 0,
        explanation:
          "Việc kiểm là để bắt chỗ thiếu và chỗ thừa mà chỉ người làm thật mới thấy. Quyền ký duyệt là chuyện thủ tục và không làm SOP đúng hơn. Chính tả là lỗi nhỏ nhìn ra được, không phải nguy cơ chính. Chuyện thợ nhớ lâu không phải mục đích của việc kiểm.",
      },
      {
        question: "Khi ghi lời kể của thợ để đưa cho AI, nên làm gì?",
        options: [
          "Giữ nguyên lời và con số thợ nói, kể cả chỗ nói tắt",
          "Viết lại cho gọn và trang trọng trước khi đưa AI",
          "Chỉ ghi những bước bạn cho là quan trọng nhất trong đó",
          "Bỏ bớt các con số, để AI tự chọn thông số hợp lý cho SOP",
        ],
        correct: 0,
        explanation:
          "Bản ghi càng sát lời thợ thì AI càng ít phải đoán. Viết lại cho trang trọng dễ làm mất chi tiết nhỏ. Tự lọc bước 'quan trọng' là thay thợ quyết định, và bước bị lọc thường là bước ai cũng quên. Để AI tự chọn thông số là để nó bịa con số, mà thông số máy sai có thể hỏng hàng hoặc gây nguy hiểm.",
      },
      {
        question: "AI viết trong SOP: 'Siết bu lông với lực 45 N·m', nhưng thợ không hề nói con số đó. Xử lý thế nào?",
        options: [
          "Xoá con số, hỏi thợ hoặc xem tài liệu máy để lấy số thật",
          "Giữ lại, vì 45 N·m là mức phổ biến cho loại bu lông cỡ này nên chắc chắn dùng được",
          "Làm tròn xuống 40 cho an toàn rồi ghi vào SOP",
          "Giữ lại và ghi thêm chữ 'tham khảo' phía sau con số",
        ],
        correct: 0,
        explanation:
          "Con số thợ không nói là con số AI tự thêm; thông số máy phải đến từ người vận hành hoặc tài liệu của nhà sản xuất. 'Phổ biến' không có nghĩa là đúng với máy này. Làm tròn xuống chỉ là bịa một con số khác. Ghi 'tham khảo' vẫn để một thông số chưa kiểm trong tài liệu mà người mới sẽ làm theo.",
      },
      {
        question: "Cách nào cho biết SOP đã đủ dùng cho người mới?",
        options: [
          "Một người chưa từng làm việc đó thử làm theo mà không phải hỏi thêm",
          "Ba người trong ca cùng đọc, cùng gật đầu và nói 'nhìn ổn, không thiếu gì'",
          "SOP dài đúng một trang, đánh số 1 đến 10 và có đủ mọi đề mục",
          "AI trả lời 'có, bản này đã đầy đủ' mỗi khi bạn hỏi lại nhiều lần liền",
        ],
        correct: 0,
        explanation:
          "Chỗ người mới phải dừng lại hỏi chính là chỗ SOP còn thiếu. Người trong ca đọc thì tự điền phần thiếu bằng kinh nghiệm nên không thấy lỗ hổng. Độ dài và số bước là hình thức. AI đọc lại chỉ nói 'có' một cách trôi chảy chứ chưa từng thử làm.",
      },
      {
        question: "SOP có bước 'kiểm tra máy đã tắt' nhưng thợ nói anh còn khoá nguồn bằng ổ khoá riêng. Điều đúng là gì?",
        options: [
          "Thêm bước khoá nguồn, vì bước bị quên thường là bước thợ làm theo phản xạ",
          "Không cần thêm vì việc tắt máy đã bao gồm cả khoá nguồn, ghi hai lần sẽ thừa và rối",
          "Chỉ ghi khoá nguồn trong phần lưu ý cuối trang cho đỡ dài",
          "Bỏ ý này, vì thợ mới chỉ cần biết cách thay cuộn màng",
        ],
        correct: 0,
        explanation:
          "Đây là loại bước AI hay bỏ và thợ hay quên kể: việc làm quen tay. Tắt máy khác với khoá nguồn: máy tắt vẫn có thể bị người khác bật lại. Đẩy xuống lưu ý cuối trang thì người mới sẽ bỏ qua. Bỏ ý này là bỏ đúng bước bảo vệ người làm.",
      },
    ],
    keyTakeaways: [
      "SOP là các bước làm việc viết ra để người khác làm lại được, không cần hỏi người giỏi.",
      "Ghi nguyên lời và con số của thợ rồi mới đưa AI dựng khung.",
      "Con số thợ không nói mà AI thêm vào là số bịa: hỏi lại thợ hoặc tài liệu máy.",
      "Thợ đọc kiểm từng bước; người mới làm thử để tìm chỗ thiếu.",
      "Bước bị quên thường là bước làm theo phản xạ, nhất là bước an toàn.",
    ],
    practicePrompt: {
      question:
        "Chị Mai nhờ AI dựng SOP từ lời kể của thợ, xong thấy bản nháp rất gọn. Chị nên làm gì trước khi dán lên tường xưởng?",
      options: [
        "Mời thợ và một người mới làm thử theo từng bước",
        "Nhờ AI thêm hình minh hoạ cho bản nháp sinh động",
        "Hỏi quản đốc xem bản nháp có đẹp không rồi mới dán lên",
        "In nhiều bản và phát cho mỗi ca để ai thấy sai thì báo lại sau",
      ],
      correct: 0,
      explanation:
        "Làm thử là cách duy nhất biết bước nào thiếu hay sai trước khi có người làm theo. Hình minh hoạ và độ đẹp không sửa được nội dung. Phát ra rồi chờ báo lại nghĩa là để chính đồng nghiệp làm thí nghiệm trên máy thật.",
    },
    summary: {
      keyIdea: "AI sắp xếp lời kể thành các bước; người đứng máy mới biết bước đó đúng hay thiếu.",
      formula: "Ghi nguyên lời thợ -> AI dựng khung -> thợ kiểm -> người mới làm thử -> sửa.",
      commonMistake: "Tin bản nháp vì nó gọn, đủ số bước và có đánh số.",
      action: "Chọn một việc mà chỉ một người trong ca biết làm và xin họ kể cho bạn ghi lại.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một thao tác nhỏ (ví dụ thay vật tư, bật máy đầu ca) mà chỉ một đồng nghiệp làm thành thạo. Xin họ kể trong 5 phút, ghi lại nguyên lời, nhờ AI xếp thành các bước rồi đưa chính người đó đọc và gạch bước sai hoặc thiếu. Ngày mai bạn sẽ được hỏi: họ đã sửa hay thêm mấy bước?",
      secondary: "Đếm số bước mà người kể bổ sung: đó là phần AI không thể biết.",
    },
    sections: [
      {
        type: "lead",
        text: "Sáng thứ Hai, anh Hùng xin nghỉ ba ngày và bạn phải cho người mới thay cuộn màng. Anh chỉ nói: 'Dễ thôi, làm vài lần là quen.' Bài này cho bạn cách biến câu 'dễ thôi' đó thành các bước ai cũng làm lại được, có AI phụ và có người thật kiểm.",
      },
      {
        type: "feynman",
        title: "Viết SOP đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới việc chép công thức nấu ăn từ một bà nội trợ giỏi. Bà nấu ngon nhưng không cân đo; bạn đứng cạnh ghi lại, rồi một người khác nấu thử theo tờ giấy. Chỗ nào nồi canh chưa giống, chỗ đó công thức còn thiếu.",
        columns: ["Thành phần", "Chép công thức từ bà nội trợ", "Viết SOP từ thợ lành nghề"],
        rows: [
          ["Nguồn", "Bà nấu bằng tay, kể bằng lời", "Thợ làm bằng tay, kể bằng lời"],
          ["Người ghi", "Bạn đứng cạnh chép", "Bạn ghi, AI xếp thành các bước"],
          ["Chỗ dễ sót", "Bà quên nói 'nêm chút muối cuối cùng'", "Thợ quên nói bước khoá nguồn làm theo phản xạ"],
          ["Cách thử", "Người khác nấu thử theo tờ giấy", "Người mới làm thử theo SOP"],
        ],
        oneLiner: "SOP là công thức của một người giỏi, viết đủ để người khác làm lại được.",
      },
      { type: "heading", text: "Vấn đề: kiến thức nằm trong bàn tay" },
      {
        type: "paragraph",
        text: "Người làm lâu năm không nhớ từng bước, họ nhớ bằng cơ thể. Hỏi 'anh làm thế nào' thì họ kể những gì nghĩ tới, và bỏ đúng những thao tác đã thành phản xạ. Vì vậy SOP chỉ từ lời kể luôn có lỗ hổng, và AI không lấp được vì nó chưa từng đứng cạnh cái máy đó.",
      },
      {
        type: "flow",
        title: "Từ lời kể thành SOP",
        steps: [
          { label: "Ghi lời kể", detail: "Ghi âm hoặc chép lại nguyên lời thợ, kể cả câu nói tắt và con số. Đừng sửa lời, vì chỗ bạn thấy 'thừa' có thể là chi tiết quan trọng." },
          { label: "Nhờ AI dựng khung", detail: "Đưa bản ghi cho AI, dặn chỉ dùng thông tin trong đó, chỗ thiếu thì để [cần hỏi thợ] chứ không tự điền." },
          { label: "Thợ kiểm từng bước", detail: "Thợ đọc và gạch chỗ sai, bổ sung bước quên kể. Đây là lúc bước làm theo phản xạ lộ ra." },
          { label: "Người mới làm thử", detail: "Một người chưa từng làm đọc và thử làm. Mỗi lần họ phải hỏi lại là một chỗ cần sửa trong SOP." },
          { label: "Chốt và ghi ngày", detail: "Ghi ngày, người soạn, người kiểm. Chỗ nào còn chưa chắc ghi rõ là chưa xác nhận." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Giao cho AI làm",
          text: "Xếp lời kể thành các bước theo thứ tự, đổi văn nói thành câu ngắn rõ ràng, gợi ý chỗ có vẻ thiếu để bạn đi hỏi, gom chuẩn bị và dụng cụ thành một danh sách.",
        },
        right: {
          label: "Giữ cho người làm",
          text: "Quyết định bước nào đúng, điền thông số máy, xác nhận bước an toàn, làm thử ngoài xưởng. Việc gì liên quan tới quy định an toàn thì hỏi bộ phận an toàn hoặc chuyên gia.",
        },
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI dựng SOP thay cuộn màng từ lời anh Hùng",
        task: "Bạn có bản ghi lời anh Hùng kể về việc thay cuộn màng. Lắp prompt để AI dựng khung SOP mà không tự bịa thêm.",
        parts: [
          {
            id: "source",
            label: "Nguồn dữ liệu",
            options: [
              { text: "Viết SOP thay cuộn màng máy đóng gói.", feedback: "Không đưa bản ghi nào nên AI dùng kiến thức chung về máy đóng gói: SOP nghe hợp lý nhưng không phải máy của bạn." },
              { text: "Dưới đây là lời anh Hùng kể nguyên văn khi thay cuộn màng. Chỉ dùng thông tin trong bản ghi này: [dán bản ghi].", good: true, feedback: "AI có nguồn đúng để bám vào, và bạn dễ đối chiếu từng bước với bản ghi." },
            ],
          },
          {
            id: "gap",
            label: "Xử lý chỗ thiếu",
            options: [
              { text: "Chỗ nào thiếu thì bạn tự bổ sung cho hợp lý.", feedback: "AI sẽ điền số và thao tác 'hợp lý' mà thợ chưa hề nói: một thông số sai có thể làm hỏng hàng." },
              { text: "Chỗ nào bản ghi không nói thì ghi [cần hỏi anh Hùng], không tự điền.", good: true, feedback: "Chỗ trống lộ ra thành danh sách câu hỏi cho thợ, thay vì nằm im trong SOP như một thông tin đã kiểm." },
            ],
          },
          {
            id: "format",
            label: "Khuôn dạng",
            options: [
              { text: "Trình bày thật chuyên nghiệp.", feedback: "'Chuyên nghiệp' không đo được: AI sẽ viết văn hoa và gộp nhiều thao tác vào một bước." },
              { text: "Đánh số bước, mỗi bước một thao tác, ghi rõ dụng cụ ở đầu bài và tách riêng bước an toàn.", good: true, feedback: "Mỗi bước một thao tác giúp người mới làm theo, và bước an toàn tách riêng nên không bị nuốt mất." },
            ],
          },
        ],
        responses: [
          {
            requires: ["source", "gap", "format"],
            text: "Dụng cụ: cờ lê, khăn lau, cuộn màng mới.\n\nBước an toàn: 1. Tắt máy và khoá nguồn.\nCác bước: 2. Mở nắp che. 3. Tháo cuộn màng cũ. 4. Lau con lăn. 5. Đặt cuộn mới, luồn màng qua con lăn. 6. Siết chặt: [cần hỏi anh Hùng: siết đến mức nào]. 7. Đóng nắp, mở khoá nguồn, chạy thử một mẻ.\n\n(Chỗ chưa có trong bản ghi được để trống thay vì bịa.)",
          },
          {
            requires: ["source"],
            text: "1. Tháo cuộn màng cũ. 2. Đặt cuộn mới. 3. Siết chặt 45 N·m. 4. Chạy thử.\n\n(Đúng nguồn nhưng AI tự điền lực siết 45 N·m mà thợ không nói, và gộp bước an toàn vào cho có.)",
          },
          {
            text: "Quy trình thay cuộn màng chuyên nghiệp gồm 12 bước, thực hiện trong 3 phút, theo tiêu chuẩn quốc tế...\n\n(AI không có dữ liệu về máy của bạn nên bịa số bước, thời gian và tiêu chuẩn.)",
          },
        ],
      },
      {
        type: "callout",
        label: "Bước an toàn không được rút gọn",
        text: "Khoá nguồn, cách ly năng lượng, đeo bảo hộ: những bước này thợ hay làm theo phản xạ và AI hay gộp mất. Luôn hỏi thợ 'trước khi đưa tay vào máy anh làm gì', và với quy định an toàn cụ thể thì hỏi bộ phận an toàn hoặc chuyên gia.",
      },
      {
        type: "scenario",
        title: "Bản nháp đã sẵn, ca đêm sắp bắt đầu",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn có bản nháp SOP thay cuộn màng do AI dựng từ lời anh Hùng. 6 giờ tối ca đêm nhận máy, mà anh Hùng đang nghỉ.",
            choices: [
              { label: "Dán bản nháp lên tường vì trông đã đủ bước", next: "bad_wall" },
              { label: "Gọi anh Hùng, đọc từng bước cho anh xác nhận", next: "s2" },
            ],
          },
          bad_wall: {
            text: "Ca đêm làm đúng theo tờ giấy. Bản nháp không có bước lau con lăn nên màng dính, phải dừng máy hai tiếng để gỡ.",
            ending: "bad",
          },
          s2: {
            text: "Anh Hùng nói thiếu bước lau con lăn và bước khoá nguồn. Bạn thêm cả hai.",
            choices: [
              { label: "Dán luôn bản đã sửa vì chính anh Hùng đã duyệt", next: "s3" },
              { label: "Nhờ một bạn ca đêm chưa từng làm việc này làm thử theo tờ giấy trước", next: "good" },
            ],
          },
          s3: {
            text: "Ca đêm làm gần đúng, nhưng bước 6 ghi 'siết chặt' mà không nói mức nào. Hai người siết hai kiểu khác nhau, một cuộn bị lỏng và rách màng.",
            ending: "bad",
          },
          good: {
            text: "Bạn kia dừng ở bước 6 và hỏi 'chặt là chặt tới đâu?'. Bạn hỏi lại anh Hùng, ghi thêm 'siết tới khi con lăn không xoay bằng tay'. Ca đêm làm trơn tru.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Xin người giỏi kể một thao tác, ghi nguyên lời.",
          "Bước 2 - Nhờ AI dựng khung, dặn chỉ dùng bản ghi và để [cần hỏi] chỗ thiếu.",
          "Bước 3 - Người giỏi đọc kiểm từng bước.",
          "Bước 4 - Người mới làm thử, mỗi chỗ phải hỏi lại là một chỗ sửa.",
        ],
      },
      {
        type: "closing",
        lines: [
          "SOP tốt là SOP mà người mới làm được không cần hỏi lại.",
          "Bài sau: bàn giao ca không sót việc bằng một trang.",
        ],
      },
    ],
  },
  {
    id: 2161,
    slug: "ban-giao-ca-khong-sot-viec-bang-mot-trang",
    title: "Chặng 38, Bài 2: Bàn giao ca không sót việc bằng một trang",
    subtitle: "Như tờ ghi chú dán trên tủ lạnh: ngắn, đủ những gì người kế tiếp cần, không cần gọi hỏi lại.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🔁",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Phần lớn sự cố đầu ca không do máy hỏng mà do thông tin rơi mất lúc đổi ca: ca ngày đã chỉnh nhiệt độ mà ca đêm không biết, một lô hàng đang chờ kiểm mà không ai nhắc. Một trang bàn giao có khuôn cố định giúp việc dở không biến mất, và AI giúp bạn dựng khuôn đó trong vài phút.",
    openingQuestion:
      "Ca đêm nhận máy và phát hiện nhiệt độ đã bị chỉnh khác so với thường lệ, không ai nói. Nội dung nào trong tờ bàn giao ca ngày quan trọng nhất phải có?",
    openingOptions: [
      "Việc đã chỉnh, giá trị cũ và mới, và lý do chỉnh",
      "Danh sách tên toàn bộ người có mặt trong ca ngày hôm đó",
      "Lời cảm ơn và nhận xét chung về không khí làm việc của ca",
      "Bản sao toàn bộ nhật ký máy của tuần vừa rồi để ca đêm tự đọc",
    ],
    correctOption: 0,
    explanation:
      "Người nhận ca cần biết cái gì đã khác đi so với bình thường và vì sao, để không chỉnh ngược lại hoặc để ý đúng chỗ. Danh sách tên và lời cảm ơn không giúp vận hành máy. Cả tuần nhật ký thì dài đến mức người ta không đọc, trong khi thay đổi quan trọng nằm chìm trong đó. Một trang ngắn có đúng việc cần biết được đọc, còn hàng chục trang thì không.",
    diagram: [
      { label: "Ca ngày ghi: máy, sự cố, việc dở, thay đổi bất thường", arrow: true },
      { label: "Hai người cùng đọc, ca đêm hỏi ngay chỗ chưa rõ", arrow: true },
      { label: "Ca đêm nhận ca và ký nhận vào tờ bàn giao", arrow: true },
      { label: "Ca đêm để lại tờ mới cho ca sáng theo cùng mẫu" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một xưởng đùn nhựa có ba ca. Ca sáng tăng nhiệt đầu đùn thêm một mức vì nhựa lô mới hơi đặc, nhưng chỉ nói miệng. Ca chiều tưởng nhiệt bị lệch nên chỉnh về mức cũ, sản phẩm ra bị rỗ. Sau đó xưởng dùng một trang bàn giao cố định, có mục 'thay đổi so với thường lệ', và chuyện này không lặp lại.",
    },
    quiz: [
      {
        question: "Vì sao tờ bàn giao ca nên có mục 'việc đang dở'?",
        options: [
          "Người nhận ca biết việc nào phải làm tiếp, khỏi bắt đầu lại",
          "Để ca sau có cớ phàn nàn ca trước làm chưa xong việc",
          "Vì máy chỉ chạy được khi tờ bàn giao ghi đủ mọi mục",
          "Để quản đốc đếm được ca nào làm nhiều việc hơn ca nào",
        ],
        correct: 0,
        explanation:
          "Việc dở là loại thông tin rơi mất nhiều nhất khi đổi ca: người làm nghĩ 'ca sau biết rồi'. Mục này để nối việc, không để quy lỗi. Máy không phụ thuộc tờ giấy. Đếm việc giữa các ca là mục đích khác, làm người viết ngại ghi đủ.",
      },
      {
        question: "Tờ bàn giao nên dài khoảng bao nhiêu?",
        options: [
          "Một trang, đọc xong trong vài phút",
          "Sáu bảy trang cho đầy đủ mọi chi tiết trong ca",
          "Chỉ một dòng ghi 'ca ngày bình thường, không có gì'",
          "Dài ngắn tuỳ người viết, xưởng không nên đặt khuôn cố định",
        ],
        correct: 0,
        explanation:
          "Một trang có khuôn cố định là mức người nhận đọc thật sự và người viết ghi đủ. Sáu bảy trang khiến người ta lướt và bỏ qua chỗ quan trọng. Một dòng 'không có gì' bỏ đúng những thay đổi cần biết. Không có khuôn thì mỗi người ghi một kiểu và mục quan trọng bị thiếu tuỳ tâm trạng.",
      },
      {
        question: "Nhờ AI dựng mẫu bàn giao ca, bạn nên đưa AI thông tin nào?",
        options: [
          "Các mục hiện có trong nhật ký và những việc thường bị sót",
          "Chỉ tên công ty, để AI tự đoán mẫu bàn giao phù hợp",
          "Thông tin cá nhân của từng công nhân để mẫu gắn theo tên họ",
          "Toàn bộ bảng lương ca để AI biết ai làm nhiều hơn",
        ],
        correct: 0,
        explanation:
          "AI dựng mẫu tốt khi biết xưởng đang ghi gì và hay sót gì. Chỉ có tên công ty thì nó dựng mẫu chung chung. Thông tin cá nhân và bảng lương không cần cho một mẫu bàn giao và không nên đưa vào công cụ công ty chưa duyệt.",
      },
      {
        question: "Ca ngày ghi 'máy 3 hơi lạ' vào tờ bàn giao. Vì sao đây là ghi chú yếu?",
        options: [
          "Ca đêm không biết lạ ở chỗ nào, từ lúc nào và đã thử gì",
          "Vì từ 'lạ' bị cấm dùng trong mọi tài liệu kỹ thuật",
          "Vì máy 3 không cần được nhắc trong tờ bàn giao ca",
          "Vì ghi chú nên viết bằng con số chứ không được dùng chữ để mô tả",
        ],
        correct: 0,
        explanation:
          "Ghi chú tốt nói hiện tượng cụ thể (tiếng gì, từ giờ nào), việc đã thử và kết quả. 'Hơi lạ' để ca sau tự đoán. Không có từ nào bị cấm; máy có dấu hiệu bất thường là điều cần được nhắc, và chữ vẫn dùng được miễn là cụ thể.",
      },
      {
        question: "Ai nên ký nhận trên tờ bàn giao ca?",
        options: [
          "Người nhận ca, sau khi đọc và hỏi lại chỗ chưa rõ",
          "Người giao ca, thay cho người nhận để đỡ mất thời gian",
          "Quản đốc, vào cuối tuần, cho cả các ca trong tuần",
          "Không ai cả, vì tờ bàn giao chỉ là giấy nháp",
        ],
        correct: 0,
        explanation:
          "Chữ ký nhận có ý nghĩa khi người nhận đã đọc và hiểu, vì từ lúc đó việc là của họ. Người giao ký thay thì không ai xác nhận đã hiểu. Quản đốc ký cuối tuần thì mọi ca đã đổi nhiều lần. Coi đó là giấy nháp thì không ai chịu trách nhiệm về những gì trong đó.",
      },
    ],
    keyTakeaways: [
      "Bàn giao ca là nơi thông tin rơi mất nhiều nhất: cần một khuôn cố định.",
      "Mỗi tờ có: tình trạng máy, sự cố, việc dở, thay đổi so với thường lệ.",
      "Ghi hiện tượng cụ thể, không ghi 'hơi lạ' hay 'bình thường'.",
      "Một trang, hai người cùng đọc, người nhận hỏi rồi mới ký.",
      "AI dựng khuôn; nội dung mỗi ca do người trong ca ghi.",
    ],
    practicePrompt: {
      question:
        "Tờ bàn giao hiện tại của xưởng chỉ có một ô 'ghi chú'. Ca nào cũng ghi 'bình thường'. Cách sửa hiệu quả nhất là gì?",
      options: [
        "Đổi thành các ô cố định: máy, sự cố, việc dở, thay đổi so với thường lệ",
        "Bắt mọi người ghi nhiều hơn trong ô ghi chú duy nhất",
        "Thưởng cho ca nào ghi ghi chú dài nhất trong tháng",
        "Bỏ tờ bàn giao vì không ai chịu ghi nghiêm túc",
      ],
      correct: 0,
      explanation:
        "Ô trống mở khiến người ta ghi 'bình thường' vì không biết phải ghi gì. Các ô có tên hỏi đúng thứ cần biết. Bắt ghi nhiều hơn chỉ tăng chữ chứ không tăng thông tin. Thưởng ghi dài khuyến khích viết dài chứ không viết đúng. Bỏ tờ bàn giao là quay về nói miệng.",
    },
    summary: {
      keyIdea: "Bàn giao tốt là một trang có khuôn cố định để việc dở và thay đổi không biến mất.",
      formula: "Máy + sự cố + việc dở + thay đổi so với thường lệ, ký nhận sau khi hỏi lại.",
      commonMistake: "Ghi 'bình thường' hoặc 'hơi lạ' và tin rằng ca sau sẽ hiểu.",
      action: "Đếm xem tờ bàn giao hiện tại có bao nhiêu mục cố định.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy tờ hoặc file bàn giao ca hiện tại của bạn (hoặc vài tin nhắn nhóm Zalo lúc đổi ca). Nhờ AI dựng một mẫu một trang có các mục: máy, sự cố, việc dở, thay đổi so với thường lệ. Điền thử cho ca hôm nay và nhờ một đồng nghiệp ca kế đọc, hỏi họ còn thiếu gì. Ngày mai bạn sẽ được hỏi: họ đã bổ sung mục nào?",
      secondary: "Lưu mẫu ở nơi cả ca thấy được, không chỉ trong máy của bạn.",
    },
    sections: [
      {
        type: "lead",
        text: "6 giờ sáng, ca đêm nhắn: 'Máy 2 hơi nóng, em có chỉnh chút.' Ca ngày không biết chỉnh chỗ nào, chút là bao nhiêu. Bài này giúp bạn biến những câu nói vội đó thành một trang có khuôn để ca nào nhận cũng đủ thông tin.",
      },
      {
        type: "feynman",
        title: "Bàn giao ca đơn giản hơn bạn nghĩ",
        intro:
          "Bạn đi công tác và dán một tờ giấy lên tủ lạnh cho người ở nhà: hôm nay đã cho mèo ăn chưa, bình gas đang dở, cái vòi trong bếp đang rỉ. Tờ giấy ngắn, đủ, không cần gọi điện hỏi lại. Bàn giao ca là tờ giấy đó cho xưởng.",
        columns: ["Thành phần", "Tờ giấy trên tủ lạnh", "Tờ bàn giao ca"],
        rows: [
          ["Mục đích", "Người ở nhà làm tiếp việc mà không phải gọi hỏi", "Ca sau làm tiếp mà không phải gọi ca trước"],
          ["Nội dung", "Việc đã làm, đang dở, chỗ hỏng", "Máy, sự cố, việc dở, thay đổi bất thường"],
          ["Độ dài", "Vài dòng, đọc trong một phút", "Một trang, đọc trong vài phút"],
          ["Điểm dễ sai", "Viết 'chắc ổn' thay cho sự thật", "Viết 'bình thường' thay cho hiện tượng cụ thể"],
        ],
        oneLiner: "Bàn giao ca là tờ giấy trên tủ lạnh của xưởng: ngắn, đủ, không cần gọi hỏi lại.",
      },
      { type: "heading", text: "Vấn đề: nói miệng thì chỉ nhớ được vài thứ" },
      {
        type: "paragraph",
        text: "Lúc đổi ca ai cũng vội. Người giao nhớ thứ vừa xảy ra, người nhận nhớ thứ họ hỏi. Những gì hai bên không nhắc tới, như một thay đổi nhỏ hay việc dở, sẽ biến mất. Khuôn cố định làm việc nhớ thay con người: ô nào trống thì phải hỏi.",
      },
      {
        type: "flow",
        title: "Một lượt bàn giao ca",
        steps: [
          { label: "Ca giao điền tờ", detail: "Trước khi hết ca 10 phút, người giao điền các mục: tình trạng máy, sự cố, việc dở, thay đổi. Mục nào không có thì ghi 'không', không để trống." },
          { label: "Hai người cùng đọc", detail: "Người giao và người nhận đứng cạnh máy, đọc lần lượt từng mục. Chỗ nào là hiện tượng thì nhìn tận nơi." },
          { label: "Người nhận hỏi lại", detail: "Người nhận hỏi mọi chỗ chưa rõ, ví dụ 'chỉnh từ bao nhiêu lên bao nhiêu'. Câu trả lời được ghi thêm vào tờ." },
          { label: "Ký nhận", detail: "Người nhận ký, từ lúc đó việc dở là của ca mình. Tờ được lưu ở nơi cả ca thấy." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Ghi chú yếu",
          text: "'Máy 3 hơi lạ.' 'Có chỉnh chút.' 'Việc dở còn ít.' Ca sau phải tự đoán chỗ lạ, mức chỉnh và số việc dở.",
        },
        right: {
          label: "Ghi chú dùng được",
          text: "'Máy 3 kêu lạch cạch ở đầu nén từ 2 giờ chiều, đã bôi trơn, vẫn kêu.' 'Đã chỉnh nhiệt từ 180 lên 185 vì nhựa lô mới đặc.' 'Còn 2 pallet chờ kiểm, khu B.'",
        },
      },
      {
        type: "callout",
        label: "AI dựng khuôn, không ghi hộ nội dung",
        text: "Nhờ AI làm mẫu bàn giao thì được. Nhờ nó viết 'tình trạng máy hôm nay' thì nó sẽ bịa cho nghe hợp lý. Nội dung mỗi tờ phải do người trong ca ghi từ những gì họ thấy.",
      },
      {
        type: "scenario",
        title: "Sáu giờ sáng, đổi ca",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn là trưởng ca đêm. Ca ngày đến nhận trong 10 phút nữa. Trên tờ bàn giao bạn mới ghi: 'Máy 2 hơi nóng, đã chỉnh chút.'",
            choices: [
              { label: "Để nguyên, ca ngày tự hỏi nếu cần", next: "bad_vague" },
              { label: "Sửa lại cụ thể: hiện tượng, giờ, mức chỉnh, việc đã thử", next: "s2" },
            ],
          },
          bad_vague: {
            text: "Ca ngày không biết chỉnh chỗ nào nên chỉnh thêm. Nhiệt độ vượt ngưỡng, dây chuyền phải dừng 40 phút để hạ nhiệt.",
            ending: "bad",
          },
          s2: {
            text: "Bạn viết: 'Máy 2 nóng vỏ từ 3 giờ sáng, đã hạ tốc độ 5%, vẫn nóng.' Ca ngày đến nhận.",
            choices: [
              { label: "Đưa tờ cho ca ngày ký ngay rồi về vì hết giờ", next: "bad_rush" },
              { label: "Cùng ca ngày đứng cạnh máy 2, đọc tờ rồi để họ hỏi", next: "good" },
            ],
          },
          bad_rush: {
            text: "Ca ngày ký mà chưa hiểu 'hạ tốc độ 5%' là từ mức nào. Họ nâng lại về mức cũ và máy nóng trở lại.",
            ending: "bad",
          },
          good: {
            text: "Ca ngày hỏi mức tốc độ ban đầu và bạn ghi thêm. Họ để nguyên mức đã hạ và gọi kỹ thuật kiểm máy trước khi tăng lại.",
            ending: "good",
          },
        },
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI dựng mẫu bàn giao ca",
        task: "Xưởng bạn hiện chỉ ghi 'bình thường' vào một ô ghi chú. Lắp prompt để AI dựng mẫu bàn giao một trang.",
        parts: [
          {
            id: "context",
            label: "Bối cảnh",
            options: [
              { text: "Làm cho tôi mẫu bàn giao ca.", feedback: "AI không biết xưởng có mấy máy hay hay sót gì, nên dựng mẫu chung chung như của văn phòng." },
              { text: "Xưởng đùn nhựa, 3 ca, 4 máy. Hay sót: thay đổi nhiệt độ, lô hàng chờ kiểm, tiếng máy bất thường.", good: true, feedback: "Mẫu sẽ có mục đúng những thứ xưởng hay sót." },
            ],
          },
          {
            id: "limit",
            label: "Giới hạn",
            options: [
              { text: "Càng chi tiết càng tốt.", feedback: "AI dựng mẫu bốn năm trang, người ta sẽ bỏ qua." },
              { text: "Tối đa một trang, các mục có tên cố định, mục không có thì ghi 'không'.", good: true, feedback: "Đủ ngắn để đọc, và ô 'không' buộc người ghi trả lời từng mục." },
            ],
          },
          {
            id: "rule",
            label: "Quy tắc điền",
            options: [
              { text: "Điền sẵn ví dụ cho từng mục để ca sau bắt chước.", feedback: "Ví dụ điền sẵn dễ bị copy y nguyên, nên tờ ghi giống nhau mọi ngày." },
              { text: "Ô trống có gợi ý hỏi: 'hiện tượng gì, từ giờ nào, đã thử gì'.", good: true, feedback: "Câu gợi ý buộc người ghi nêu hiện tượng thay vì viết 'hơi lạ'." },
            ],
          },
        ],
        responses: [
          {
            requires: ["context", "limit", "rule"],
            text: "BÀN GIAO CA - ngày __ / ca __\n1. Tình trạng từng máy (hiện tượng gì, từ giờ nào, đã thử gì): __\n2. Sự cố trong ca (giờ, máy, dừng bao lâu): __\n3. Thay đổi so với thường lệ (từ bao nhiêu lên bao nhiêu, vì sao): __\n4. Việc dở và lô chờ kiểm: __\n5. Người giao / người nhận ký: __",
          },
          {
            requires: ["context"],
            text: "BÀN GIAO CA - phần 1 đến phần 9 gồm thông tin chung, nhân sự, năng suất, chất lượng, an toàn, vệ sinh, kho, kế hoạch, ghi chú...\n\n(Đúng bối cảnh nhưng quá dài và không có gợi ý, người ghi sẽ điền 'bình thường' cho xong.)",
          },
          {
            text: "PHIẾU BÀN GIAO CA\nTên nhân viên: __\nĐánh giá tinh thần làm việc: __\nĐiểm KPI: __\n\n(AI không biết xưởng nên dựng mẫu văn phòng, thiếu mục máy và sự cố.)",
          },
        ],
      },
      {
        type: "list",
        items: [
          "Bước 1 - Nhìn lại 5 lần đổi ca gần đây: thông tin nào từng bị sót?",
          "Bước 2 - Nhờ AI dựng mẫu một trang có các mục đúng những thứ đó.",
          "Bước 3 - Thử một tuần, người nhận hỏi lại mọi chỗ chưa rõ.",
          "Bước 4 - Sửa mẫu theo những câu hỏi lặp lại.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Một trang, có khuôn, hai người cùng đọc: việc dở không còn biến mất.",
          "Bài sau: bắt lỗi bước thiếu trong SOP do AI soạn.",
        ],
      },
    ],
  },
  {
    id: 2162,
    slug: "bat-loi-buoc-thieu-trong-sop-do-ai-soan",
    title: "Chặng 38, Bài 3: Bắt lỗi bước thiếu trong SOP do AI soạn",
    subtitle: "Như kiểm công thức chép lại: đọc thì thấy đủ, làm thử mới thấy thiếu bước.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "🔍",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "SOP do AI soạn thường đẹp, đủ đầu mục, có đánh số. Cái đẹp đó làm bạn tin rằng nó đủ. Nhưng AI chưa từng đứng cạnh máy nên có thể bỏ đúng những bước sinh ra từ kinh nghiệm, như khoá nguồn trước khi vệ sinh. Học cách đối chiếu SOP với thao tác thật là kỹ năng giữ người làm an toàn.",
    openingQuestion:
      "AI soạn SOP vệ sinh máy trộn gồm 8 bước rất gọn. Bạn đọc thấy không có gì sai. Cách nào phát hiện bước còn thiếu hiệu quả nhất?",
    openingOptions: [
      "Đối chiếu từng bước với thao tác thật tại máy cùng người vận hành",
      "Đọc lại bản SOP thêm hai lần thật chậm ở bàn làm việc, không cần ra máy",
      "Nhờ AI kiểm tra xem SOP của chính nó có thiếu bước không",
      "Đếm xem SOP có đủ 8 bước đúng như AI đã nói lúc đầu",
    ],
    correctOption: 0,
    explanation:
      "Bước thiếu là bước không nằm trên giấy, nên đọc giấy thêm bao nhiêu lần cũng không thấy. Chỉ khi đứng cạnh máy và làm, người vận hành mới nhận ra 'khoan, trước khi mở nắp mình còn phải khoá nguồn'. Nhờ chính AI kiểm thì nó sẽ xác nhận bản nó vừa viết là đủ. Đếm bước chỉ cho biết số lượng, không cho biết bước nào bị bỏ.",
    diagram: [
      { label: "AI soạn SOP đủ đầu mục, có đánh số", arrow: true },
      { label: "Người vận hành đọc, đối chiếu với thao tác thật tại máy", arrow: true },
      { label: "Chỗ thiếu hoặc bịa được gạch ra kèm lý do", arrow: true },
      { label: "Bổ sung, làm thử lại và mới ban hành" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một xưởng bánh nhờ AI soạn SOP vệ sinh máy trộn bột. Bản nháp có đủ tám bước từ tháo cánh khuấy đến lau khô, nhưng không có bước khoá nguồn điện trước khi đưa tay vào thùng. Người thợ đọc thì thấy 'ổn' vì tự mình luôn khoá nguồn theo thói quen; chỉ khi một người mới được yêu cầu làm đúng từng chữ trên giấy thì lỗ hổng mới lộ ra.",
    },
    quiz: [
      {
        question: "Vì sao SOP do AI soạn có thể thiếu bước khoá nguồn?",
        options: [
          "AI viết theo cách thường thấy trong văn bản, không theo máy cụ thể",
          "Vì AI cố ý bỏ các bước an toàn để bản SOP ngắn gọn hơn",
          "Vì bước khoá nguồn chỉ cần thiết ở những xưởng lớn",
          "Vì AI luôn dừng viết khi đạt đủ tám bước",
        ],
        correct: 0,
        explanation:
          "AI dựng SOP từ những văn bản nó đã đọc, không biết máy của bạn cần khoá nguồn. Nó không cố ý bỏ gì; nó chỉ không biết. Khoá nguồn cần ở mọi nơi có người đưa tay vào máy chứ không riêng xưởng lớn. Không có giới hạn tám bước.",
      },
      {
        question: "Trong một bản SOP, chi tiết nào đáng nghi nhất là do AI bịa?",
        options: [
          "Con số thông số hoặc tiêu chuẩn mà không ai từng cung cấp",
          "Câu mở đầu nói mục đích của việc vệ sinh máy",
          "Đề mục 'Dụng cụ cần chuẩn bị' ở đầu văn bản",
          "Thứ tự đánh số các bước từ 1 đến 8, vì AI hay đánh số nhảy cóc giữa bài",
        ],
        correct: 0,
        explanation:
          "Con số và tiêu chuẩn cần nguồn: nếu bạn không đưa, AI tự thêm cho nghe hợp lý. Câu mở đầu, đề mục và cách đánh số là khung trình bày, ít gây hại nếu sai.",
      },
      {
        question: "Người đối chiếu SOP với thao tác thật nên làm thế nào?",
        options: [
          "Làm từng bước đúng như chữ trên giấy, không thêm việc theo thói quen",
          "Làm theo thói quen của mình cho nhanh, rồi so lại xem có khớp với giấy hay không",
          "Đọc to từng bước, rồi đánh dấu tích vào mọi bước nào nghe quen tai với mình",
          "Hỏi AI xem thao tác nào trong thực tế mới đúng chuẩn, rồi làm theo câu trả lời",
        ],
        correct: 0,
        explanation:
          "Làm đúng chữ mới lộ ra chỗ thiếu: nếu bạn tự thêm theo thói quen, giấy vẫn 'có vẻ đủ'. Làm theo thói quen rồi so lại khiến trí nhớ điền vào chỗ trống. Đọc và tích chỉ kiểm sự quen tai. AI không thấy máy nên không so được.",
      },
      {
        question: "Bạn phát hiện SOP thiếu bước khoá nguồn. Việc đúng là gì?",
        options: [
          "Thêm bước khoá nguồn thành bước đầu và cho thợ kiểm lại",
          "Ghi thêm vào cuối SOP dưới dạng ghi chú tham khảo, để không phải sắp lại các bước",
          "Nói miệng với ca này, khi nào tái bản thì sửa sau",
          "Bỏ SOP này và quay lại làm theo trí nhớ của thợ",
        ],
        correct: 0,
        explanation:
          "Bước an toàn phải đứng trước việc nó bảo vệ, không nằm ghi chú cuối trang. Nói miệng nghĩa là người mới và ca sau vẫn theo bản sai. Bỏ SOP là bỏ cả phần đúng đã có và quay về tình trạng chỉ một người biết làm.",
      },
      {
        question: "Vì sao không nên nhờ chính AI đã soạn SOP để kiểm lỗi của nó?",
        options: [
          "Nó dùng cùng cách 'nghe hợp lý' nên dễ xác nhận bản của mình là đủ",
          "Vì AI bị cấm sửa các văn bản do chính nó tạo ra nên không thể tự kiểm lại",
          "Vì AI chỉ kiểm được chính tả chứ không kiểm được nội dung",
          "Vì lần kiểm thứ hai luôn tốn thời gian hơn lần soạn đầu",
        ],
        correct: 0,
        explanation:
          "AI có thể cho gợi ý chỗ có vẻ thiếu, nhưng người kiểm phải là người có thao tác thật. Nó có thể sửa văn bản của mình, và kiểm được nhiều thứ ngoài chính tả. Thời gian không phải lý do; vấn đề là nó không thấy máy.",
      },
    ],
    keyTakeaways: [
      "SOP đẹp và đủ số bước chưa chắc đủ việc.",
      "Bước thiếu thường là bước sinh ra từ kinh nghiệm: khoá nguồn, xả áp, đeo bảo hộ.",
      "Đối chiếu bằng cách làm đúng từng chữ tại máy, không thêm việc theo thói quen.",
      "Con số và tiêu chuẩn AI tự thêm là dấu hiệu bịa.",
      "Sửa bằng cách thêm bước vào đúng chỗ trong trình tự, không để thành ghi chú.",
    ],
    practicePrompt: {
      question:
        "Người mới làm đúng từng chữ trong SOP và bị kẹt ở bước 5 vì không biết van nào cần mở. Điều này cho thấy gì?",
      options: [
        "SOP thiếu thông tin về van, cần bổ sung tên hoặc vị trí van",
        "Người mới chưa đủ giỏi, cần đào tạo thêm trước khi được đọc SOP của xưởng",
        "AI soạn sai nên phải bỏ cả bản và soạn lại từ đầu",
        "Chỗ kẹt là bình thường, ai làm việc mới cũng phải hỏi",
      ],
      correct: 0,
      explanation:
        "Chỗ người mới kẹt là chỗ SOP còn thiếu, và sửa đúng chỗ đó là mục đích của lần làm thử. Đổ cho người mới thì giữ nguyên lỗ hổng. Bỏ cả bản là bỏ phần đúng. Coi là bình thường thì lần sau người khác vẫn kẹt.",
    },
    summary: {
      keyIdea: "SOP do AI soạn phải được kiểm bằng thao tác thật, không phải bằng cách đọc.",
      formula: "Làm đúng từng chữ tại máy -> gạch chỗ thiếu và chỗ bịa -> bổ sung -> làm thử lại.",
      commonMistake: "Tin SOP vì nó có đủ đầu mục và đánh số gọn gàng.",
      action: "Chọn một SOP hiện có và cho một người chưa làm việc đó thử làm đúng từng chữ.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Nhờ AI soạn SOP một việc bạn biết rõ (ví dụ vệ sinh hoặc khởi động một máy). Đọc từng bước và đánh dấu: bước nào thiếu, bước nào bạn không hề làm, con số nào bạn không cung cấp. Ngày mai bạn sẽ được hỏi: AI đã bỏ hoặc bịa mấy chỗ?",
      secondary: "Ghi lại loại chỗ sai lặp lại, đó là danh sách kiểm cho lần sau.",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn nhờ AI soạn SOP vệ sinh máy trộn và nhận được tám bước sạch đẹp trong mười giây. Nhưng bản đẹp không có nghĩa là bản đủ. Bài này dạy bạn nhìn ra bước bị bỏ và chi tiết bị bịa bằng cách đối chiếu với thao tác thật.",
      },
      {
        type: "feynman",
        title: "Bắt lỗi SOP đơn giản hơn bạn nghĩ",
        intro:
          "Bạn chép lại công thức món canh từ một tờ giấy do người quen đánh máy giúp. Đọc lên thì thấy đầy đủ, nhưng nấu thử mới thấy thiếu dòng 'nêm nước mắm'. Kiểm công thức bằng cách nấu, kiểm SOP bằng cách làm.",
        columns: ["Thành phần", "Nấu thử công thức chép lại", "Làm thử SOP do AI soạn"],
        rows: [
          ["Đọc trên giấy", "Thấy đủ nguyên liệu và các bước", "Thấy đủ đầu mục, có đánh số"],
          ["Chỗ thiếu", "Dòng nêm nước mắm bị bỏ", "Bước khoá nguồn bị bỏ"],
          ["Cách lộ ra", "Nấu xong nhạt", "Làm đúng từng chữ tới bước cần khoá nguồn thì kẹt"],
          ["Người kiểm", "Người biết vị món canh", "Người biết máy"],
        ],
        oneLiner: "Đọc thấy đủ chưa chắc đủ: chỉ làm thử mới lộ ra bước thiếu.",
      },
      { type: "heading", text: "Vấn đề: bản sạch đẹp làm người ta cả tin" },
      {
        type: "paragraph",
        text: "Một SOP viết tay lộn xộn khiến bạn cảnh giác. Một SOP AI soạn sạch sẽ thì bạn tin. Nhưng AI hai loại lỗi mà mắt thường khó thấy: bỏ bước mà người trong nghề làm theo phản xạ, và thêm chi tiết như con số hay tiêu chuẩn mà bạn không hề đưa.",
      },
      {
        type: "flow",
        title: "Đối chiếu SOP với máy thật",
        steps: [
          { label: "Đọc lướt để hiểu khung", detail: "Đọc cả bản để nắm trình tự. Ở bước này bạn chưa kết luận gì." },
          { label: "Làm đúng từng chữ", detail: "Người vận hành làm tại máy, chỉ làm đúng điều giấy viết. Việc nào họ thấy cần làm mà giấy không có thì đánh dấu là bước thiếu." },
          { label: "Soi con số và tiêu chuẩn", detail: "Mỗi con số, đơn vị, tên tiêu chuẩn hỏi: ai cung cấp? Nếu không ai thì đó là số AI thêm." },
          { label: "Bổ sung đúng chỗ", detail: "Thêm bước vào đúng vị trí trong trình tự, đặc biệt bước an toàn phải đứng trước việc nó bảo vệ." },
          { label: "Làm thử bản sửa", detail: "Một người khác làm lại theo bản đã sửa. Hết chỗ kẹt thì mới phát hành." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Loại lỗi AI hay mắc",
          text: "Bỏ bước làm theo phản xạ (khoá nguồn, xả áp). Thêm con số hay tiêu chuẩn không có nguồn. Gộp hai thao tác thành một. Sai thứ tự hai bước gần nhau.",
        },
        right: {
          label: "Cách bắt",
          text: "Làm đúng chữ tại máy. Hỏi nguồn mọi con số. Đọc từng bước và đếm số thao tác. Đọc thứ tự với câu hỏi 'làm bước sau trước có nguy hiểm không?'. Việc gì thuộc quy định an toàn thì hỏi bộ phận an toàn hoặc chuyên gia.",
        },
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát SOP vệ sinh máy trộn do AI soạn",
        task: "Bạn chỉ cung cấp: máy trộn bột 50 lít, vệ sinh cuối ca, dụng cụ gồm khăn và nước rửa. Đánh dấu những đoạn AI bỏ sót hoặc tự thêm.",
        segments: [
          { text: "Bước 1: Chuẩn bị khăn và nước rửa." },
          { text: "Bước 2: Mở nắp thùng và đưa tay vào tháo cánh khuấy.", error: "Thiếu bước khoá nguồn trước khi đưa tay vào. Nếu ai bật máy lúc này, tay đang ở trong thùng. Bước này phải có trước bước 2." },
          { text: "Bước 3: Rửa cánh khuấy bằng nước rửa cho đến khi sạch bột." },
          { text: "Bước 4: Xả thùng bằng nước ở 85 độ C trong đúng 12 phút theo tiêu chuẩn ISO.", error: "Bạn không cung cấp nhiệt độ, thời gian hay tiêu chuẩn nào. Ba chi tiết này do AI thêm cho nghe chuyên nghiệp, không có nguồn." },
          { text: "Bước 5: Lau khô thùng và cánh khuấy bằng khăn sạch." },
          { text: "Bước 6: Lắp cánh khuấy lại và đóng nắp thùng." },
        ],
      },
      {
        type: "callout",
        label: "Bước an toàn đứng trước việc nó bảo vệ",
        text: "Một bước khoá nguồn để ở cuối SOP thì vô dụng. Khi sửa, đặt nó trước thao tác đưa tay vào máy. Quy định an toàn cụ thể của xưởng thì hỏi bộ phận an toàn hoặc chuyên gia, đừng để AI quyết.",
      },
      {
        type: "scenario",
        title: "SOP mới về tới ca đêm",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn là trưởng ca. AI vừa soạn SOP vệ sinh máy trộn và quản đốc nhờ bạn duyệt trước 5 giờ chiều. Bản nháp trông rất gọn.",
            choices: [
              { label: "Đọc kỹ ở bàn, thấy ổn thì duyệt", next: "bad_read" },
              { label: "Mời một bạn ca đêm làm đúng từng chữ tại máy đang tắt", next: "s2" },
            ],
          },
          bad_read: {
            text: "Bản được duyệt. Đêm đó một bạn mới đưa tay vào thùng khi chưa khoá nguồn vì SOP không nói; may mà có người bật máy chậm nên không ai bị thương, nhưng cả xưởng được một phen hú vía.",
            ending: "bad",
          },
          s2: {
            text: "Bạn làm đến bước 2 thì dừng: 'trước khi đưa tay vào phải khoá nguồn'. Bạn ghi thêm bước đó.",
            choices: [
              { label: "Sửa xong là duyệt luôn, vì đã tìm được lỗi", next: "s3" },
              { label: "Soi tiếp các con số, hỏi nguồn của 85 độ và 12 phút", next: "good" },
            ],
          },
          s3: {
            text: "Bản được duyệt với '85 độ C, 12 phút'. Thùng xả ở nhiệt độ đó làm hỏng gioăng cao su vốn chỉ chịu nhiệt thấp hơn, hai tuần sau phải thay gioăng.",
            ending: "bad",
          },
          good: {
            text: "Không ai cung cấp hai con số đó. Bạn hỏi kỹ thuật, họ báo mức nước phù hợp với gioăng. SOP được sửa và duyệt với thông số thật.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Nhờ AI soạn SOP, chỉ đưa thông tin bạn chắc chắn.",
          "Bước 2 - Người vận hành làm đúng từng chữ tại máy, đánh dấu chỗ kẹt.",
          "Bước 3 - Hỏi nguồn mọi con số và tiêu chuẩn.",
          "Bước 4 - Bổ sung đúng chỗ, làm thử lại rồi mới phát hành.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Đọc chỉ thấy cái có, làm thử mới thấy cái thiếu.",
          "Bài sau: biến ghi chú lộn xộn cuối ca thành báo cáo gọn.",
        ],
      },
    ],
  },
  {
    id: 2163,
    slug: "bao-cao-ca-tu-ghi-chu-roi-thanh-ban-gon",
    title: "Chặng 38, Bài 4: Biến ghi chú lộn xộn cuối ca thành báo cáo gọn",
    subtitle: "Bạn cung cấp con số và sự việc, AI chỉ sắp chữ: con số không được phép đổi.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "📝",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Cuối ca bạn mệt, chỉ có vài dòng ghi vội và sản lượng, mà quản đốc cần báo cáo rõ ràng trước khi bạn về. AI viết nhanh phần chữ, nhưng nếu bạn để nó tự 'làm cho đẹp' thì con số có thể bị làm tròn, nguyên nhân bị thêm thắt. Biết cách giao đúng việc cho AI giúp báo cáo nhanh mà không sai.",
    openingQuestion:
      "Bạn dán vài dòng ghi chú và sản lượng cuối ca cho AI: 'Viết báo cáo ca.' Bản trả về có một câu 'do nguyên liệu kém nên năng suất giảm', mà bạn không nói vậy. Việc đầu tiên nên làm là gì?",
    openingOptions: [
      "Xoá câu đó vì bạn không cung cấp, rồi dặn AI chỉ dùng ghi chú",
      "Giữ lại vì nghe hợp lý và giúp báo cáo có nguyên nhân, dù bạn không cung cấp",
      "Nhờ AI giải thích thêm về nguyên liệu kém để câu thuyết phục",
      "Kiểm xem câu đó có hay không rồi giữ nếu văn phong tốt",
    ],
    correctOption: 0,
    explanation:
      "Nguyên nhân là thông tin bạn không cung cấp nên là AI tự thêm cho báo cáo 'có đầu có đuôi'. Trong báo cáo ca, một nguyên nhân bịa có thể khiến quản đốc điều tra sai chỗ. Giữ lại vì nghe hợp lý là làm đúng cái bẫy mà AI hay tạo ra. Nhờ giải thích thêm chỉ làm chỗ bịa dài hơn. Văn phong tốt không làm nó thành sự thật.",
    diagram: [
      { label: "Bạn gom số liệu ca và các sự việc thật", arrow: true },
      { label: "AI sắp thành báo cáo, chỉ dùng số và việc bạn đưa", arrow: true },
      { label: "Bạn đối chiếu từng con số với bảng gốc", arrow: true },
      { label: "Gửi quản đốc, chỗ chưa biết ghi rõ là chưa rõ" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một trưởng ca xưởng in nhờ AI viết báo cáo ca từ ghi chú. Ghi chú nói 'Máy 1 dừng 25 phút', nhưng bản AI viết 'dừng khoảng nửa tiếng do sự cố cơ khí'. Con số bị làm tròn và nguyên nhân bị thêm vào. Anh nhận ra khi đối chiếu với nhật ký và sửa lại thành đúng 25 phút, nguyên nhân chưa rõ.",
    },
    quiz: [
      {
        question: "Khi nhờ AI viết báo cáo ca, dữ liệu nào nên tự bạn giữ lại chứ không để AI tính?",
        options: [
          "Con số sản lượng và tổng của chúng",
          "Cách xếp các đoạn trong báo cáo",
          "Cách dùng từ cho lịch sự với quản đốc",
          "Tiêu đề và thứ tự trình bày của báo cáo",
        ],
        correct: 0,
        explanation:
          "AI viết chữ tốt nhưng cộng và tổng hợp số thì có thể sai. Số liệu nên lấy từ bảng hoặc máy tính rồi đưa vào để AI chỉ đặt vào câu. Sắp xếp đoạn, dùng từ và tiêu đề là việc chữ nó làm tốt.",
      },
      {
        question: "Ghi chú của bạn nói 'máy 1 dừng 25 phút', bản AI viết 'khoảng nửa tiếng'. Nên làm gì?",
        options: [
          "Sửa lại đúng 25 phút và dặn AI không làm tròn số của bạn",
          "Giữ 'khoảng nửa tiếng' vì làm tròn cho báo cáo gọn hơn và quản đốc dễ nhớ số",
          "Đổi thành 30 phút cho chẵn và dễ nhớ với quản đốc",
          "Bỏ hẳn thông tin về thời gian dừng vì không quan trọng",
        ],
        correct: 0,
        explanation:
          "25 phút và 30 phút cách nhau 5 phút, đủ để sai lệch khi quản đốc cộng thời gian dừng cả tuần. AI làm tròn để câu nghe gọn. Đổi thành 30 là bịa số. Bỏ thông tin là mất dữ liệu quản đốc cần.",
      },
      {
        question: "Kế hoạch ca là 400 sản phẩm, thực tế 340. Tỷ lệ đạt kế hoạch là bao nhiêu?",
        options: [
          "85%",
          "60% (= 400 - 340, lấy số thiếu làm tỷ lệ)",
          "117,6% (= 400 / 340, chia ngược thứ tự)",
          "15% (= (400 - 340) / 400, đây là tỷ lệ thiếu chứ không phải tỷ lệ đạt)",
        ],
        correct: 0,
        explanation:
          "Tỷ lệ đạt là thực tế chia kế hoạch: 340 / 400 = 85%. Lấy hiệu 60 là số thiếu chứ không phải tỷ lệ. Chia ngược 400 / 340 cho 117,6% là tỷ lệ vượt, sai chiều. 15% là phần thiếu, người đọc dễ hiểu nhầm với phần đạt.",
      },
      {
        question: "Ghi chú cuối ca chỉ có 'máy 2 dừng lúc 3 giờ chiều'. AI viết thêm 'do đứt dây curoa'. Đây là gì?",
        options: [
          "Nguyên nhân do AI tự thêm, cần bỏ hoặc hỏi kỹ thuật xác nhận",
          "Một chi tiết hợp lý mà AI suy ra đúng từ ngữ cảnh máy dừng",
          "Nguyên nhân phổ biến nhất nên có thể giữ trong báo cáo",
          "Một cách viết chuyên môn nên không cần kiểm lại",
        ],
        correct: 0,
        explanation:
          "Bạn không nói nguyên nhân, nên đó là chi tiết AI bịa cho báo cáo có đầu có đuôi. Suy ra từ ngữ cảnh không có nghĩa là đúng: máy dừng vì rất nhiều lý do. 'Phổ biến' không thay được kiểm chứng. Câu viết chuyên môn càng dễ khiến người đọc tin.",
      },
      {
        question: "Nên đưa cho AI phần nào của báo cáo ca để tiết kiệm thời gian nhất mà vẫn an toàn?",
        options: [
          "Sắp thành câu văn gọn từ ghi chú và số liệu đã có sẵn",
          "Tự điền mọi chỗ trống mà ghi chú chưa nhắc tới",
          "Đoán nguyên nhân sự cố từ triệu chứng bạn ghi vội, rồi viết thành kết luận cuối",
          "Đánh giá ca nào làm tốt hơn dựa trên vài con số",
        ],
        correct: 0,
        explanation:
          "Sắp chữ từ dữ kiện có sẵn là việc AI làm nhanh và bạn kiểm được ngay bằng cách đối chiếu. Tự điền chỗ trống là bịa. Đoán nguyên nhân là việc cần bằng chứng từ người làm. Đánh giá ca dựa vài con số bỏ qua hoàn cảnh và thuộc về người quản lý.",
      },
    ],
    keyTakeaways: [
      "Số liệu và sự việc do bạn cung cấp; AI chỉ sắp chữ.",
      "Dặn AI: chỉ dùng số bạn đưa, không làm tròn, không thêm nguyên nhân.",
      "Chỗ chưa biết ghi là 'chưa rõ', không để AI lấp.",
      "Tỷ lệ đạt kế hoạch = thực tế chia kế hoạch.",
      "Đối chiếu từng con số với bảng gốc trước khi gửi.",
    ],
    practicePrompt: {
      question:
        "Báo cáo AI viết có câu 'năng suất ca đạt 92%', nhưng bạn không nhớ đã đưa số đó. Việc đúng là gì?",
      options: [
        "Tự tính lại từ sản lượng và kế hoạch rồi đối chiếu với con số đó",
        "Giữ con số vì báo cáo cần có phần trăm cho chuyên nghiệp, thuyết phục",
        "Hỏi AI 92% tính từ đâu và tin theo lời nó giải thích",
        "Đổi thành 90% cho dễ đọc rồi gửi",
      ],
      correct: 0,
      explanation:
        "Nếu bạn không đưa số đó thì AI tự tạo ra hoặc tính sai; tự tính lại từ dữ liệu gốc là cách chắc chắn. Con số 'cho chuyên nghiệp' vẫn là số bịa. Hỏi AI giải thích thì nó có thể bịa luôn cách tính. Đổi thành 90% là bịa số khác.",
    },
    summary: {
      keyIdea: "Trong báo cáo ca, AI viết chữ còn con số và sự việc là của bạn.",
      formula: "Số bạn đưa + việc bạn ghi -> AI sắp chữ -> bạn đối chiếu -> gửi.",
      commonMistake: "Để AI làm tròn số hoặc thêm nguyên nhân cho báo cáo 'nghe đầy đủ'.",
      action: "Lấy báo cáo ca gần nhất và gạch chân mọi nguyên nhân: có nguồn không?",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Cuối ca hôm nay, gom 5-6 dòng ghi chú và số liệu thật. Nhờ AI dựng báo cáo, dặn 'chỉ dùng số và việc tôi đưa, chỗ chưa biết ghi chưa rõ'. Rồi đối chiếu từng con số và từng nguyên nhân với ghi chú gốc. Ngày mai bạn sẽ được hỏi: AI đã thêm hoặc đổi mấy chỗ?",
      secondary: "Lưu prompt tốt lại để cuối ca sau dán vào, chỉ đổi dữ liệu.",
    },
    sections: [
      {
        type: "lead",
        text: "5 giờ 45, còn 15 phút hết ca, quản đốc nhắn: 'Gửi anh báo cáo ca nhé.' Bạn chỉ có vài dòng ghi vội và bảng sản lượng. Bài này giúp bạn biến chúng thành báo cáo gọn trong vài phút mà không để AI đổi con số của bạn.",
      },
      {
        type: "feynman",
        title: "Báo cáo ca từ ghi chú đơn giản hơn bạn nghĩ",
        intro:
          "Bạn đọc số liệu qua điện thoại cho một người thư ký viết lại thành thư. Người thư ký viết câu chữ rất giỏi, nhưng nếu bạn không nhắc, họ sẽ tự làm tròn con số hoặc thêm lý do cho thư 'nghe đầy đủ'. Bạn phải dặn: số nào cũng đúng nguyên, chỗ nào chưa biết thì để trống.",
        columns: ["Thành phần", "Thư ký viết thư", "AI viết báo cáo ca"],
        rows: [
          ["Bạn đưa", "Con số và ý chính đọc qua điện thoại", "Ghi chú và số liệu ca"],
          ["Họ giỏi", "Câu chữ trôi chảy, đúng giọng thư", "Sắp thành đoạn gọn, đúng khuôn báo cáo"],
          ["Chỗ dễ sai", "Làm tròn số, thêm lý do", "Làm tròn số, thêm nguyên nhân bịa"],
          ["Cách dặn", "Số nào cũng đúng nguyên, chưa biết thì để trống", "Chỉ dùng số tôi đưa, chưa biết ghi chưa rõ"],
        ],
        oneLiner: "AI là thư ký viết giỏi: số và sự việc do bạn đưa, chỗ chưa biết để trống.",
      },
      { type: "heading", text: "Vấn đề: báo cáo hay nhưng số thì lệch" },
      {
        type: "paragraph",
        text: "Cuối ca bạn mệt nên rất dễ tin bản AI viết vì nó gọn và có câu mở kết. Nhưng đằng sau câu chữ trơn tru có thể là một con số đã bị làm tròn hoặc một nguyên nhân bạn chưa từng nói. Quản đốc dựa vào báo cáo để quyết định hôm sau, nên số sai và nguyên nhân bịa sẽ đi thẳng vào quyết định đó.",
      },
      {
        type: "chart",
        title: "Sản lượng thực tế so với kế hoạch theo từng giờ",
        caption:
          "Số liệu minh hoạ, không phải của xưởng nào. Kéo hai thanh trượt để thấy đường thực tế (cộng dồn) so với đường kế hoạch: khoảng cách giữa hai đường là số còn thiếu khi hết ca.",
        kind: "line",
        xLabel: "Giờ trong ca",
        yLabel: "Sản phẩm cộng dồn",
        x: { from: 1, to: 8, step: 1 },
        params: [
          { id: "plan", label: "Kế hoạch mỗi giờ", min: 20, max: 80, step: 5, value: 50, unit: "sản phẩm" },
          { id: "actual", label: "Thực tế mỗi giờ", min: 10, max: 80, step: 5, value: 42, unit: "sản phẩm" },
        ],
        series: [
          { label: "Kế hoạch cộng dồn", expr: "x * plan" },
          { label: "Thực tế cộng dồn", expr: "x * actual" },
        ],
      },
      {
        type: "flow",
        title: "Từ ghi chú tới báo cáo ca",
        steps: [
          { label: "Gom dữ kiện", detail: "Lấy sản lượng từ bảng, thời gian dừng từ nhật ký, sự việc từ ghi chú của bạn. Mỗi thứ có nguồn." },
          { label: "Giao AI sắp chữ", detail: "Dán dữ kiện và dặn: chỉ dùng thông tin này, không làm tròn, chưa biết thì ghi chưa rõ." },
          { label: "Đối chiếu số", detail: "Đặt bản AI viết cạnh bảng gốc, kiểm từng con số và mỗi câu có nguyên nhân." },
          { label: "Gửi và lưu prompt", detail: "Gửi báo cáo, lưu lại prompt tốt để ca sau chỉ đổi dữ liệu." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Việc giao cho AI",
          text: "Sắp ghi chú thành câu gọn. Đặt số vào đúng chỗ trong khuôn báo cáo. Đổi giọng cho phù hợp quản đốc. Gợi ý chỗ báo cáo còn thiếu thông tin.",
        },
        right: {
          label: "Việc giữ cho bạn",
          text: "Tính tổng và tỷ lệ đạt (thực tế chia kế hoạch). Xác định nguyên nhân sự cố. Quyết định điều gì đáng báo. Chuyện thuộc pháp lý hay chi phí thì hỏi bộ phận phụ trách.",
        },
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI viết báo cáo ca từ ghi chú",
        task: "Ghi chú: kế hoạch 400 sản phẩm, thực tế 340; máy 1 dừng 25 phút lúc 2 giờ chiều, chưa rõ nguyên nhân. Lắp prompt để AI viết báo cáo mà không bịa.",
        parts: [
          {
            id: "data",
            label: "Dữ liệu",
            options: [
              { text: "Ca hôm nay hơi thiếu sản lượng, có máy dừng, viết báo cáo giúp.", feedback: "Không có con số nào nên AI tự bịa: sản lượng, thời gian dừng và cả nguyên nhân." },
              { text: "Kế hoạch 400, thực tế 340. Máy 1 dừng 25 phút lúc 14:00, chưa rõ nguyên nhân.", good: true, feedback: "Có số cụ thể và có cả chỗ chưa rõ, nên AI không cần tự điền." },
            ],
          },
          {
            id: "rule",
            label: "Quy tắc",
            options: [
              { text: "Viết cho đầy đủ, thiếu gì thì bổ sung cho hợp lý.", feedback: "'Bổ sung cho hợp lý' là giấy phép để AI bịa nguyên nhân." },
              { text: "Chỉ dùng số và việc trên. Không làm tròn. Chỗ chưa biết ghi 'chưa rõ'.", good: true, feedback: "Ba ràng buộc chặn đúng ba loại lỗi: số thêm, số làm tròn, nguyên nhân bịa." },
            ],
          },
          {
            id: "form",
            label: "Khuôn dạng",
            options: [
              { text: "Viết thành một bài dài để quản đốc nắm được cả bối cảnh.", feedback: "Bài dài làm chìm con số quan trọng; AI cũng có nhiều chỗ để thêm chi tiết bịa." },
              { text: "Ba mục ngắn: sản lượng (kèm tỷ lệ đạt), sự cố, việc cần ca sau làm.", good: true, feedback: "Khuôn ngắn có chỗ cho từng loại thông tin và dễ đối chiếu." },
            ],
          },
        ],
        responses: [
          {
            requires: ["data", "rule", "form"],
            text: "BÁO CÁO CA\n1. Sản lượng: 340/400 sản phẩm (đạt 85%, thiếu 60).\n2. Sự cố: Máy 1 dừng 25 phút lúc 14:00, nguyên nhân chưa rõ.\n3. Việc cho ca sau: xác định nguyên nhân dừng máy 1.",
          },
          {
            requires: ["data"],
            text: "Trong ca, sản lượng đạt khoảng 85% kế hoạch. Máy 1 dừng khoảng nửa tiếng do sự cố cơ khí, đã được xử lý kịp thời.\n\n(Đúng số gốc nhưng bị làm tròn, và AI thêm 'sự cố cơ khí' và 'đã xử lý' mà bạn không nói.)",
          },
          {
            text: "Ca hôm nay nhìn chung khá tốt, sản lượng đạt 92% kế hoạch. Máy 1 dừng ngắn do đứt dây curoa...\n\n(Không có dữ liệu nên AI bịa con số 92% và nguyên nhân đứt dây curoa.)",
          },
        ],
      },
      {
        type: "callout",
        label: "Chưa rõ là một câu trả lời hợp lệ",
        text: "Báo cáo ghi 'nguyên nhân chưa rõ, đang kiểm tra' còn hơn một nguyên nhân nghe đẹp mà sai. Quản đốc sẽ biết cần điều tra tiếp, thay vì tin và đi tìm chỗ khác.",
      },
      {
        type: "scenario",
        title: "Mười lăm phút cuối ca",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn có ghi chú vội và bảng sản lượng. Quản đốc chờ báo cáo trong 15 phút. AI vừa trả về bản báo cáo trông gọn.",
            choices: [
              { label: "Gửi luôn vì bản này gọn và rất chuyên nghiệp", next: "bad_send" },
              { label: "Đặt bản AI cạnh bảng gốc và ghi chú, đối chiếu từng số", next: "s2" },
            ],
          },
          bad_send: {
            text: "Báo cáo ghi máy 1 dừng do đứt dây curoa. Sáng hôm sau kỹ thuật thay dây curoa nhưng nguyên nhân thật là cảm biến; máy lại dừng sau hai giờ.",
            ending: "bad",
          },
          s2: {
            text: "Bạn thấy AI viết 'khoảng nửa tiếng' thay vì 25 phút và thêm 'do đứt dây curoa'.",
            choices: [
              { label: "Sửa thành 25 phút và bỏ nguyên nhân bịa, ghi 'chưa rõ'", next: "s3" },
              { label: "Sửa thành 25 phút nhưng giữ nguyên nhân vì nghe hợp lý", next: "bad_cause" },
            ],
          },
          bad_cause: {
            text: "Số đúng nhưng nguyên nhân vẫn là bịa; kỹ thuật thay dây curoa và máy tiếp tục dừng.",
            ending: "bad",
          },
          s3: {
            text: "Bạn còn thấy 'đạt 92%'. Bạn tự tính: 340 chia 400 là 85%.",
            choices: [
              { label: "Sửa thành 85% rồi gửi, ghi thêm việc cho ca sau: xác định nguyên nhân dừng máy 1", next: "good" },
              { label: "Để 92% vì báo cáo cũ hôm trước cũng gần con số đó", next: "bad_num" },
            ],
          },
          bad_num: {
            text: "Quản đốc thấy đạt 92% nên không quan tâm ca này, trong khi thiếu 60 sản phẩm bị bỏ qua và đơn hàng trễ.",
            ending: "bad",
          },
          good: {
            text: "Báo cáo đúng số, nguyên nhân ghi 'chưa rõ', ca sau biết phải xác định nguyên nhân. Quản đốc phản hồi báo cáo dễ đọc.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Gom số từ bảng gốc và sự việc từ ghi chú.",
          "Bước 2 - Dặn AI: chỉ dùng dữ kiện này, không làm tròn, chưa biết ghi 'chưa rõ'.",
          "Bước 3 - Tự tính tỷ lệ đạt = thực tế chia kế hoạch.",
          "Bước 4 - Đối chiếu từng số và nguyên nhân với nguồn rồi gửi.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Số của bạn, chữ của AI, chỗ chưa biết ghi chưa rõ.",
          "Bài sau: mini-dự án gộp một SOP ngắn với mẫu bàn giao ca.",
        ],
      },
    ],
  },
  {
    id: 2164,
    slug: "mini-mot-sop-va-mot-mau-ban-giao-ca",
    title: "Chặng 38, Bài 5: Mini-dự án: một SOP ngắn kèm mẫu bàn giao ca",
    subtitle: "Ghép bốn bài đầu thành một sản phẩm nhỏ: SOP một trang, mẫu bàn giao, và thử với ca kế.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "🧩",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Học từng kỹ thuật riêng thì dễ quên; ghép chúng vào một việc thật thì nhớ lâu. Mini-dự án này dùng một công đoạn bạn đã quen, để bạn thấy AI rút ngắn phần dựng khung ra sao và phần nào vẫn phải là người làm. Kết quả là hai tờ giấy đồng nghiệp ca kế dùng được ngay.",
    openingQuestion:
      "Bạn chọn công đoạn để làm mini-dự án SOP kèm bàn giao ca. Tiêu chí nào giúp chọn đúng nhất cho lần đầu?",
    openingOptions: [
      "Công đoạn bạn làm đủ quen, nhỏ, và ca sau phải làm tiếp",
      "Công đoạn phức tạp nhất xưởng để tận dụng hết sức mạnh AI",
      "Công đoạn bạn chưa từng làm để AI dạy bạn từ đầu",
      "Công đoạn mà đúng một người biết, dù bạn chưa hiểu lắm",
    ],
    correctOption: 0,
    explanation:
      "Lần đầu, bạn cần tự kiểm được kết quả: chỉ công đoạn bạn quen mới cho bạn nhận ra bước thiếu và số bịa. Công đoạn nhỏ làm xong trong vài chục phút, và có ca sau tiếp nối thì bàn giao mới có nghĩa. Công đoạn phức tạp nhất khiến bạn không kiểm nổi. Công đoạn bạn chưa từng làm thì không biết AI sai ở đâu. Việc chỉ một người biết là tốt cho SOP, nhưng lần đầu bạn cần chính mình kiểm được.",
    diagram: [
      { label: "Chọn một công đoạn quen, nhỏ, có ca sau tiếp nối", arrow: true },
      { label: "Dựng SOP một trang và mẫu bàn giao với AI", arrow: true },
      { label: "Đối chiếu tại máy: bước thiếu, số bịa", arrow: true },
      { label: "Cho đồng nghiệp ca kế thử, sửa theo chỗ họ vấp" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một tổ trưởng xưởng may chọn công đoạn 'thay kim máy may công nghiệp'. Cô ghi lời kể của thợ, nhờ AI dựng SOP một trang và mẫu bàn giao, rồi đưa cho một bạn ca chiều thử. Bạn ca chiều vấp ở bước 'chỉnh độ sâu kim' vì SOP chỉ ghi 'chỉnh vừa'. Cô hỏi thợ, ghi 'kim chạm đúng mép ổ thoi khi kéo bánh xe tay' và bản cuối dùng được.",
    },
    quiz: [
      {
        question: "Mini-dự án này gồm những sản phẩm nào?",
        options: [
          "Một SOP một trang và một mẫu bàn giao ca, thử với đồng nghiệp",
          "Một báo cáo dài về toàn bộ quy trình sản xuất của xưởng",
          "Một bài thuyết trình về lợi ích của AI trong xưởng",
          "Một bảng đánh giá năng suất của từng công nhân trong ca",
        ],
        correct: 0,
        explanation:
          "Mục tiêu là hai tờ giấy nhỏ dùng được ngay và được thử thật. Báo cáo dài về cả quy trình quá rộng cho một mini-dự án. Bài thuyết trình không làm việc ở xưởng dễ hơn. Bảng đánh giá công nhân là chuyện khác, và không thuộc phạm vi bài này.",
      },
      {
        question: "Bước nào của mini-dự án không nên giao cho AI làm thay?",
        options: [
          "Xác nhận từng bước và thông số là đúng với máy thật",
          "Xếp lời kể thành các bước theo thứ tự",
          "Đổi văn nói thành câu ngắn rõ ràng",
          "Dựng khuôn các mục của mẫu bàn giao",
        ],
        correct: 0,
        explanation:
          "Xác nhận đúng với máy thật cần người đứng máy: AI chưa từng thấy máy. Xếp bước, đổi câu và dựng khuôn là việc chữ nó làm nhanh và bạn kiểm được.",
      },
      {
        question: "Bạn ca kế làm thử SOP và hỏi lại ở bước 4 hai lần. Điều này nghĩa là gì?",
        options: [
          "Bước 4 còn thiếu hoặc mơ hồ, cần viết lại cho rõ",
          "Bạn ca kế đọc chưa kỹ, cần nhắc đọc lại từ đầu và dặn hỏi lại ít hơn",
          "SOP đã tốt vì người đọc chịu khó hỏi lại",
          "Nên bỏ bước 4 để SOP ngắn gọn hơn cho lần sau",
        ],
        correct: 0,
        explanation:
          "Câu hỏi lặp lại tại một bước là dấu hiệu rõ nhất SOP chưa đủ ở bước đó. Đổ cho người đọc thì giữ nguyên lỗ hổng. Coi chuyện hỏi lại là dấu hiệu tốt là bỏ qua cơ hội sửa. Bỏ bước có thể làm mất đúng thao tác cần thiết.",
      },
      {
        question: "Vì sao mẫu bàn giao nên thử cùng SOP trong mini-dự án?",
        options: [
          "Việc dở của SOP cần được ghi lại cho ca sau tiếp nối",
          "Vì mẫu bàn giao và SOP luôn phải dài đúng một trang, không hơn không kém",
          "Vì AI chỉ làm đúng khi được giao hai tài liệu cùng một lúc",
          "Vì quản đốc đã yêu cầu mọi dự án trong xưởng đều phải có hai sản phẩm",
        ],
        correct: 0,
        explanation:
          "SOP mô tả cách làm, bàn giao mô tả việc còn lại và điều đã thay đổi. Hai tài liệu nối nhau: ca sau cần cả hai để làm tiếp đúng. Độ dài một trang là mục tiêu gọn chứ không phải lý do. AI không bị ràng buộc số tài liệu. Yêu cầu của quản đốc không phải lý do kỹ thuật.",
      },
      {
        question: "Sau khi thử, đồng nghiệp ca kế đề nghị thêm 20 mục vào mẫu bàn giao. Bạn nên làm gì?",
        options: [
          "Giữ những mục đã từng bị sót thật, bỏ mục chưa ai cần",
          "Thêm hết 20 mục cho đầy đủ mọi trường hợp có thể xảy ra ở các ca sau này",
          "Từ chối tất cả vì mẫu chỉ được có đúng bốn mục",
          "Nhờ AI tự chọn 20 mục nào là quan trọng nhất",
        ],
        correct: 0,
        explanation:
          "Mẫu ngắn giữ được vì chỉ có mục từng gây sót thật. Thêm 20 mục làm tờ dài, không ai đọc. Đặt cứng bốn mục thì bỏ qua nhu cầu thật của ca kế. AI không biết xưởng đã sót gì nên chọn theo cách chung chung.",
      },
    ],
    keyTakeaways: [
      "Chọn công đoạn quen, nhỏ, và có ca sau tiếp nối.",
      "AI dựng khung; người đứng máy xác nhận bước và thông số.",
      "Người thử là người chưa từng làm: chỗ họ hỏi lại là chỗ cần sửa.",
      "Mẫu bàn giao chỉ giữ mục từng bị sót thật.",
      "Cả hai tài liệu ngắn, một trang, lưu nơi cả ca thấy.",
    ],
    practicePrompt: {
      question:
        "Bạn ca kế làm thử SOP và bị kẹt ở bước ghi 'chỉnh vừa'. Sửa thế nào là tốt nhất?",
      options: [
        "Hỏi thợ dấu hiệu nhận ra 'vừa' rồi ghi dấu hiệu đó vào bước",
        "Nhờ AI viết lại bước đó cho hay và chuyên nghiệp hơn, khỏi hỏi thợ",
        "Thêm chữ 'cẩn thận' để người làm biết phải chú ý",
        "Xoá bước đó vì ai làm lâu cũng biết chỉnh thế nào",
      ],
      correct: 0,
      explanation:
        "'Vừa' chỉ có nghĩa với người đã biết; ghi dấu hiệu nhìn thấy được (ví dụ kim chạm mép ổ thoi) là thứ người mới làm theo được. Viết hay hơn không thêm thông tin. 'Cẩn thận' là lời nhắc, không phải hướng dẫn. Xoá bước làm mất đúng thứ người mới cần.",
    },
    summary: {
      keyIdea: "Mini-dự án ghép SOP và bàn giao ca thành hai tờ giấy nhỏ được thử bằng người thật.",
      formula: "Chọn công đoạn quen -> AI dựng khung -> đối chiếu tại máy -> ca kế thử -> sửa.",
      commonMistake: "Chọn việc quá lớn hoặc quá lạ nên không kiểm nổi kết quả AI.",
      action: "Chọn một công đoạn quen và lên lịch để đồng nghiệp ca kế thử.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một công đoạn nhỏ bạn thuộc lòng. Kể lại cho AI (hoặc ghi vài dòng), nhờ dựng SOP một trang và mẫu bàn giao bốn mục. Đối chiếu tại máy, rồi nhờ một đồng nghiệp ca kế làm thử và ghi lại mọi chỗ họ hỏi. Ngày mai bạn sẽ được hỏi: đồng nghiệp đã vấp ở bước nào?",
      secondary: "Chụp hoặc lưu hai tờ đã sửa vào nơi cả ca thấy được.",
    },
    sections: [
      {
        type: "lead",
        text: "Bốn bài trước dạy từng kỹ thuật: dựng SOP từ lời thợ, bàn giao ca, bắt lỗi SOP, báo cáo ca. Bài này bạn ghép tất cả vào một việc thật, nhỏ, và thử nó với đồng nghiệp ca kế ngay trong tuần.",
      },
      {
        type: "feynman",
        title: "Mini-dự án đơn giản hơn bạn nghĩ",
        intro:
          "Bạn muốn dạy con trai đạp xe. Bạn không đưa cả cuốn sách kỹ thuật; bạn chọn một bãi đất nhỏ, chỉ vài điều cần nhớ, cho con thử và sửa chỗ con vấp. Mini-dự án cũng vậy: nhỏ, thật, có người thử.",
        columns: ["Thành phần", "Dạy con đạp xe", "Mini-dự án SOP và bàn giao"],
        rows: [
          ["Chọn việc", "Một bãi đất nhỏ, không phải cả thành phố", "Một công đoạn quen, không phải cả xưởng"],
          ["Điều cần nhớ", "Vài điều thiết yếu", "SOP một trang, mẫu bàn giao bốn mục"],
          ["Người thử", "Con trai đạp thử", "Đồng nghiệp ca kế làm thử"],
          ["Sửa", "Chỗ con chao đảo thì dạy lại", "Chỗ đồng nghiệp hỏi lại thì viết lại"],
        ],
        oneLiner: "Mini-dự án là một việc nhỏ, có người thử thật và sửa theo chỗ họ vấp.",
      },
      { type: "heading", text: "Vấn đề: chọn việc quá lớn thì không xong" },
      {
        type: "paragraph",
        text: "Sai lầm phổ biến là chọn ngay quy trình phức tạp nhất vì 'AI làm được hết'. Nhưng nếu bạn không đủ quen để kiểm, bạn không biết AI sai ở đâu, và một tờ SOP sai còn nguy hiểm hơn không có SOP. Việc nhỏ, quen, có ca sau tiếp nối là điểm khởi đầu an toàn.",
      },
      {
        type: "flow",
        title: "Bốn chặng của mini-dự án",
        steps: [
          { label: "Chọn công đoạn", detail: "Một việc bạn làm đủ quen, xong trong vài chục phút, và ca sau phải làm tiếp hoặc tiếp nhận kết quả." },
          { label: "Dựng khung với AI", detail: "Ghi lời kể hoặc các bước bạn biết, nhờ AI dựng SOP một trang và mẫu bàn giao bốn mục; chỗ thiếu ghi [cần hỏi]." },
          { label: "Đối chiếu tại máy", detail: "Làm đúng từng chữ, đánh dấu bước thiếu và con số bịa, sửa lại." },
          { label: "Ca kế thử", detail: "Một đồng nghiệp chưa làm việc đó thử theo SOP và đọc mẫu bàn giao. Ghi chỗ họ hỏi, sửa, và lưu hai tờ ở nơi cả ca thấy." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Chọn công đoạn tốt",
          text: "Bạn làm nhiều lần và tự kiểm được. Việc xong trong vài chục phút. Có ca khác tiếp nối. Ít nguy cơ nếu bản nháp sai trong lúc thử.",
        },
        right: {
          label: "Chọn công đoạn kém",
          text: "Quy trình dài cả ngày. Việc bạn chưa từng làm. Việc chỉ một người hiểu mà chưa ai kiểm. Việc có quy định an toàn phức tạp: hỏi bộ phận an toàn trước.",
        },
      },
      {
        type: "scenario",
        title: "Chọn công đoạn và thử với ca kế",
        start: "s1",
        nodes: {
          s1: {
            text: "Quản đốc cho bạn một tuần làm mini-dự án SOP và bàn giao ca. Bạn được chọn công đoạn.",
            choices: [
              { label: "Chọn quy trình chạy thử toàn bộ dây chuyền mới, vì đó là việc lớn nhất", next: "bad_big" },
              { label: "Chọn công đoạn thay vật tư đầu ca mà bạn làm mỗi ngày", next: "s2" },
            ],
          },
          bad_big: {
            text: "Bạn không đủ quen để kiểm SOP AI dựng; một tuần trôi qua mà chỉ có bản nháp chưa ai dám thử, và dự án bị đóng lại.",
            ending: "bad",
          },
          s2: {
            text: "Bạn dựng SOP và mẫu bàn giao với AI, đối chiếu tại máy xong. Đến lúc cho ca kế thử.",
            choices: [
              { label: "Đưa cho một bạn ca kế chưa từng làm việc này và ghi chỗ họ hỏi", next: "s3" },
              { label: "Đưa cho thợ lâu năm đọc vì họ đọc nhanh và ít hỏi", next: "bad_expert" },
            ],
          },
          bad_expert: {
            text: "Thợ lâu năm đọc thấy 'ổn' vì tự điền phần thiếu bằng kinh nghiệm. Ca kế mới vào làm thử thì kẹt hai chỗ mà SOP không nói.",
            ending: "bad",
          },
          s3: {
            text: "Bạn kia hỏi hai lần ở bước 4 và mẫu bàn giao thiếu ô 'lô chờ kiểm'.",
            choices: [
              { label: "Sửa bước 4, thêm ô lô chờ kiểm, rồi nhờ bạn ấy thử lại", next: "good" },
              { label: "Nhắc miệng bạn ấy lần sau chú ý bước 4 và bỏ qua ô mới", next: "bad_verbal" },
            ],
          },
          bad_verbal: {
            text: "Bản giấy vẫn thiếu, người khác vào làm lại vấp đúng chỗ đó và mẫu bàn giao tiếp tục sót lô chờ kiểm.",
            ending: "bad",
          },
          good: {
            text: "Bước 4 được viết lại rõ ràng, mẫu bàn giao có thêm ô lô chờ kiểm. Bạn kia làm thử lại không phải hỏi nữa và hai tờ được lưu ở nơi cả ca thấy.",
            ending: "good",
          },
        },
      },
      {
        type: "callout",
        label: "Người thử phải là người chưa từng làm",
        text: "Người đã làm thành thạo sẽ tự điền chỗ thiếu bằng kinh nghiệm, nên họ đọc thấy 'ổn'. Người mới hỏi lại đúng chỗ giấy còn thiếu. Chỗ nào liên quan tới an toàn hoặc quy định thì cho bộ phận an toàn hoặc chuyên gia xem trước khi ban hành.",
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI dựng SOP một trang cho công đoạn thay vật tư đầu ca",
        task: "Bạn ghi vài dòng về công đoạn thay vật tư đầu ca. Lắp prompt để AI dựng SOP một trang mà không bịa.",
        parts: [
          {
            id: "input",
            label: "Đầu vào",
            options: [
              { text: "Viết SOP thay vật tư đầu ca cho tôi.", feedback: "Không có dữ kiện, AI tả quy trình chung; bạn mất công gỡ những chi tiết không đúng xưởng mình." },
              { text: "Đây là các bước tôi làm hằng ngày và những chỗ tôi hay sai: [dán ghi chú của bạn].", good: true, feedback: "AI bám đúng cách làm thật của bạn và gợi ý được chỗ hay sai." },
            ],
          },
          {
            id: "limit",
            label: "Giới hạn",
            options: [
              { text: "Thêm số liệu và tiêu chuẩn cho thuyết phục.", feedback: "AI sẽ bịa số và tiêu chuẩn; không ai kiểm được." },
              { text: "Không thêm số hoặc tiêu chuẩn tôi không đưa; chỗ thiếu ghi [cần hỏi].", good: true, feedback: "Chỗ thiếu lộ ra thành danh sách câu hỏi thay vì số bịa." },
            ],
          },
          {
            id: "form",
            label: "Khuôn dạng",
            options: [
              { text: "Viết một đoạn văn liền mạch cho dễ đọc.", feedback: "Đoạn văn liền gộp nhiều thao tác; người mới không biết làm tới đâu." },
              { text: "Một trang: dụng cụ, bước an toàn tách riêng, các bước đánh số, mỗi bước một thao tác.", good: true, feedback: "Người mới làm theo từng dòng, bước an toàn không bị lẫn." },
            ],
          },
        ],
        responses: [
          {
            requires: ["input", "limit", "form"],
            text: "SOP - Thay vật tư đầu ca\nDụng cụ: [cần hỏi: loại găng tay]\nAn toàn: 1. Tắt máy và khoá nguồn.\nCác bước: 2. Tháo vật tư cũ. 3. Kiểm vật tư mới đúng mã. 4. Lắp và chỉnh: [cần hỏi: dấu hiệu chỉnh đúng]. 5. Mở nguồn, chạy thử một mẻ, ghi vào tờ bàn giao.",
          },
          {
            requires: ["input"],
            text: "1. Thay vật tư. 2. Chỉnh máy theo tiêu chuẩn nhà sản xuất ở mức 75%. 3. Chạy thử.\n\n(Dùng đúng ghi chú nhưng AI thêm 'mức 75%' và 'tiêu chuẩn' mà bạn không đưa.)",
          },
          {
            text: "Thay vật tư là một quy trình quan trọng gồm nhiều bước, thực hiện theo tiêu chuẩn ISO 9001...\n\n(Không có dữ liệu nên AI viết chung chung và bịa tiêu chuẩn.)",
          },
        ],
      },
      {
        type: "list",
        items: [
          "Bước 1 - Chọn một công đoạn quen, nhỏ, có ca sau tiếp nối.",
          "Bước 2 - Nhờ AI dựng SOP một trang và mẫu bàn giao bốn mục.",
          "Bước 3 - Làm đúng từng chữ tại máy, sửa bước thiếu và số bịa.",
          "Bước 4 - Cho đồng nghiệp ca kế thử, sửa theo chỗ họ hỏi, lưu ở nơi cả ca thấy.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Nhỏ, thật, có người thử: đó là mini-dự án tốt.",
          "Bài sau bắt đầu phần số liệu chuyền: đọc tìm giờ năng suất tụt.",
        ],
      },
    ],
  },
];
