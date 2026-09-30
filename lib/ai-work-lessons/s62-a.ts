import type { Lesson } from "../lesson-types";

// Chặng 62, bài 1-5. Giáo trình: scripts/curriculum/stage-62.json.
// Không nêu nút bấm, giá hay tính năng riêng của công cụ nào: chỉ dạy cách chọn số,
// chọn biểu đồ và cách giao việc / kiểm kết quả.

// Đáp án đúng viết trước ở vị trí 0; vị trí được xáo lại khi build.
const Q = (question: string, options: [string, string, string, string], explanation: string) => ({
  question,
  options: [...options],
  correct: 0,
  explanation,
});

export const S62_A_LESSONS: Lesson[] = [
  {
    id: 2640,
    slug: "truoc-khi-ve-viet-cau-hoi-ma-sep-can-tra-loi",
    title: "Chặng 62, Bài 1: Trước khi vẽ: viết câu hỏi mà người xem cần trả lời",
    subtitle: "Bảng có 40 dòng chưa phải biểu đồ. Biểu đồ bắt đầu từ một câu hỏi.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "📊",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Nhiều biểu đồ rối không phải vì vẽ kém mà vì vẽ khi chưa biết người xem cần biết điều gì. Mất hai phút viết một câu hỏi trước khi mở công cụ vẽ giúp bạn biết nên giữ số nào, bỏ số nào, và tránh cảnh sếp nhìn biểu đồ rồi hỏi lại: vậy thì sao?",
    openingQuestion:
      "Sếp nhắn: \"Em vẽ cho anh biểu đồ doanh thu tháng này nhé.\" Bạn có sẵn bảng 40 dòng, 12 cột. Việc nên làm đầu tiên là gì?",
    openingOptions: [
      "Hỏi lại hoặc tự đoán: sếp cần biết điều gì để quyết định việc gì",
      "Chọn loại biểu đồ đẹp nhất trong công cụ rồi thả cả bảng vào",
      "Tô màu theo nhận diện thương hiệu của công ty trước cho chuyên nghiệp",
      "Vẽ thử ba kiểu biểu đồ khác nhau rồi gửi cả ba để sếp tự chọn",
    ],
    correctOption: 0,
    explanation:
      "Cùng một bảng doanh thu có thể trả lời rất nhiều câu hỏi: chi nhánh nào tụt, tháng nào cao nhất, món nào đóng góp nhiều nhất. Mỗi câu cần một cách vẽ và một nhóm số khác nhau. Nếu chưa biết câu hỏi, mọi lựa chọn sau đó là đoán. Chọn kiểu đẹp hay tô màu theo thương hiệu đều là việc hình thức, còn gửi ba bản là đẩy việc chọn sang người xem.",
    diagram: [
      { label: "Người xem cần quyết định gì", arrow: true },
      { label: "Viết thành một câu hỏi", arrow: true },
      { label: "Chọn đúng vài số trả lời câu hỏi đó", arrow: true },
      { label: "Rồi mới vẽ biểu đồ" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: cửa hàng trà sữa ba chi nhánh",
      description:
        "Chủ quán gửi chị quản lý bảng doanh thu và nhờ vẽ biểu đồ. Bản đầu có 12 đường chồng nhau, chủ quán nhìn rồi hỏi lại. Chị hỏi thêm một câu: anh định quyết định việc gì? Hoá ra anh muốn biết chi nhánh nào nên giảm ca làm. Câu hỏi thành: chi nhánh nào doanh thu buổi chiều thấp nhất? Bản vẽ lại chỉ có ba cột, và chủ quán quyết định ngay trong cuộc họp.",
    },
    quiz: [
      Q(
        "Điều đầu tiên cần có trước khi chọn loại biểu đồ là gì?",
        [
          "Một câu hỏi cụ thể mà người xem cần được trả lời",
          "Một bảng màu hợp với logo, màu nền công ty và các slide khác",
          "Phần mềm vẽ biểu đồ đẹp nhất mà bạn đang có",
          "Toàn bộ số liệu trong bảng để người xem tự chọn",
        ],
        "Câu hỏi quyết định giữ số nào và vẽ kiểu nào. Bảng màu chỉ là hình thức, công cụ đẹp không biết người xem cần gì, và đưa cả bảng thì biểu đồ không còn trả lời điều gì cụ thể, người xem tự phải đi tìm.",
      ),
      Q(
        "Sếp nhắn: vẽ biểu đồ doanh thu. Nên hỏi lại câu nào?",
        [
          "Anh cần biết điều gì sau khi nhìn biểu đồ này?",
          "Anh thích biểu đồ cột hay biểu đồ đường hơn?",
          "Anh muốn dùng màu nào cho biểu đồ này nhé?",
          "Anh cần gửi biểu đồ này ở định dạng nào?",
        ],
        "Hỏi về điều sếp cần biết mới lộ ra câu hỏi thật. Hỏi kiểu biểu đồ, màu hay định dạng là hỏi về hình thức khi nội dung chưa rõ, và sếp thường không có sẵn câu trả lời cho những câu đó.",
      ),
      Q(
        "Câu hỏi nào của người xem đủ rõ để vẽ biểu đồ?",
        [
          "Chi nhánh nào bán giảm nhiều nhất quý này?",
          "Doanh thu cả năm của công ty ra sao?",
          "Cho tôi xem toàn bộ số liệu bán hàng các chi nhánh",
          "Biểu đồ nào trông hiện đại và chuyên nghiệp nhất?",
        ],
        "Câu đúng có đối tượng (chi nhánh), số cần so (mức giảm) và khung thời gian (quý này). Ba câu còn lại quá rộng, đòi xem tất cả, hoặc hỏi về vẻ ngoài chứ không hỏi về điều cần quyết định.",
      ),
      Q(
        "Bảng có 12 cột số. Bạn nên làm gì trước khi vẽ?",
        [
          "Chỉ giữ cột nào trả lời câu hỏi",
          "Đưa cả 12 cột vào để người xem không thiếu gì",
          "Chọn 6 cột đầu tiên vì thường quan trọng nhất",
          "Vẽ hết rồi bỏ dần cột nào thấy rối khi xem lại",
        ],
        "Cột đầu bảng chưa chắc liên quan đến câu hỏi. Đưa hết vào làm người xem phải tự lọc, còn vẽ rồi bỏ dần tốn công và dễ bỏ nhầm cột quan trọng. Cách gọn là chọn theo câu hỏi ngay từ đầu.",
      ),
      Q(
        "Người xem chỉ có 30 giây. Nguyên tắc nào hợp lý nhất?",
        [
          "Mỗi biểu đồ chỉ trả lời một câu hỏi chính",
          "Thêm nhiều số phụ để họ không phải hỏi thêm câu nào",
          "Dùng thật nhiều màu để mắt họ không thấy chán khi xem",
          "Để biểu đồ nhỏ lại cho vừa một trang cùng với bảng số",
        ],
        "Ba mươi giây đủ để hiểu một ý, không đủ cho năm ý. Thêm số phụ hay nhiều màu làm mắt phải lọc nhiều hơn, còn thu nhỏ biểu đồ làm chữ khó đọc hơn mà không giúp hiểu nhanh hơn.",
      ),
    ],
    keyTakeaways: [
      "Biểu đồ trả lời một câu hỏi, không phải thứ trình bày mọi số trong bảng.",
      "Viết câu hỏi bằng lời của người xem: ai, so cái gì, trong khoảng nào.",
      "Chỉ giữ những số trả lời câu hỏi đó; số còn lại để ở bảng.",
      "Nếu chưa biết người xem cần quyết định gì, hỏi họ trước khi vẽ.",
    ],
    practicePrompt: {
      question:
        "Bảng có doanh thu theo tháng của 5 chi nhánh. Câu hỏi nào đủ rõ để bắt đầu vẽ?",
      options: [
        "Chi nhánh nào giảm doanh thu liên tiếp 3 tháng gần đây?",
        "Doanh thu các chi nhánh có những gì đáng chú ý không?",
        "Em thử vẽ hết xem nhìn ra gì rồi anh chọn sau nhé?",
        "Biểu đồ của năm ngoái làm kiểu gì thì làm lại kiểu đó luôn?",
      ],
      correct: 0,
      explanation:
        "Câu đúng nói rõ đối tượng, thứ cần so và khoảng thời gian, nên biết ngay cần 3 tháng gần nhất của từng chi nhánh. Các câu kia mơ hồ, đẩy việc chọn sang người khác, hoặc chép lại cách cũ mà không biết câu hỏi có còn giống.",
    },
    summary: {
      keyIdea: "Viết câu hỏi của người xem trước, rồi mới chọn số và kiểu vẽ.",
      formula: "Ai cần quyết định gì → câu hỏi một dòng → vài số trả lời nó → biểu đồ.",
      commonMistake: "Mở công cụ vẽ trước, hy vọng biểu đồ tự nói lên điều gì đó.",
      action: "Lấy bảng số gần nhất bạn phải báo cáo, viết một câu hỏi người nhận cần được trả lời.",
    },
    application: {
      title: "Làm ngay trong 15 phút",
      message:
        "Chọn một bảng số bạn sắp báo cáo cho ai đó. Hỏi người nhận (hoặc tự đoán): anh/chị sẽ quyết định việc gì sau khi xem? Viết thành một câu hỏi, rồi gạch ra 2-4 cột trong bảng trả lời câu đó. Ghi câu hỏi lên đầu trang báo cáo.",
      secondary: "Ngày mai, nhớ xem người nhận có còn hỏi lại: vậy thì sao?",
    },
    sections: [
      {
        type: "lead",
        text: "Sáng thứ Hai sếp nhắn: vẽ cho anh biểu đồ doanh thu. Bạn mở bảng 40 dòng, 12 cột và chưa biết bắt đầu từ đâu. Bài này cho bạn một thói quen hai phút: viết câu hỏi trước khi vẽ gì.",
      },
      {
        type: "feynman",
        title: "Biểu đồ đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung bạn chỉ đường cho người lạ đến quán cà phê. Bạn không vẽ mọi ngôi nhà trong phố, chỉ vẽ con đường họ cần đi và vài mốc để nhận ra.",
        columns: ["Thành phần", "Tờ giấy chỉ đường", "Biểu đồ"],
        rows: [
          ["Người xem hỏi", "Đến quán cà phê đi lối nào?", "Chi nhánh nào đang giảm?"],
          ["Cái giữ lại", "Con đường chính và vài mốc", "Vài số trả lời câu hỏi"],
          ["Cái bỏ đi", "Những ngõ không liên quan", "Các cột số không liên quan"],
          ["Kiểm tra", "Người lạ đến đúng chỗ", "Người xem nêu được điều cần biết"],
        ],
        oneLiner: "Biểu đồ tốt là tờ chỉ đường cho một câu hỏi, không phải bản đồ cả thành phố.",
      },
      { type: "heading", text: "Bảng số có hàng chục câu trả lời" },
      {
        type: "paragraph",
        text: "Một bảng doanh thu theo chi nhánh, tháng và nhóm hàng có thể trả lời hàng chục câu hỏi khác nhau. Khi bạn chưa chọn câu nào, mọi quyết định sau đó chỉ là đoán. Hai người cùng nhìn bảng ấy vẫn có thể cần hai biểu đồ hoàn toàn khác nhau.",
      },
      {
        type: "list",
        items: [
          "Ai sẽ xem, và họ sẽ làm gì sau khi xem (đổi ca, duyệt tiền, gọi khách)?",
          "Câu hỏi một dòng, có đối tượng, thứ đem so và khoảng thời gian.",
          "Những cột trong bảng trả lời câu hỏi đó, thường chỉ 2-4 cột.",
          "Phần còn lại giữ trong bảng, đưa ra khi có người hỏi thêm.",
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Vẽ trước, hỏi sau",
          text: "Thả cả bảng vào biểu đồ. Ra 12 đường chồng nhau. Người xem nhìn một lúc rồi hỏi: rốt cuộc anh muốn tôi thấy gì?",
        },
        right: {
          label: "Hỏi trước, vẽ sau",
          text: "Viết câu hỏi: chi nhánh nào giảm 3 tháng liền? Giữ 5 đường, làm nổi 1 đường đang giảm. Người xem trả lời được trong vài giây.",
        },
      },
      {
        type: "flow",
        title: "Từ bảng số đến biểu đồ trong bốn bước",
        steps: [
          { label: "Hỏi người xem", detail: "Sau khi xem, anh/chị sẽ quyết định việc gì? Nếu không hỏi được, tự đoán rồi ghi lại để xác nhận sau." },
          { label: "Viết câu hỏi một dòng", detail: "Có đối tượng, thứ đem so và khoảng thời gian, ví dụ: chi nhánh nào giảm doanh thu 3 tháng gần nhất?" },
          { label: "Chọn số trả lời câu hỏi", detail: "Gạch chân vài cột cần dùng. Cột nào không giúp trả lời thì để ngoài biểu đồ." },
          { label: "Vẽ và hỏi lại", detail: "Vẽ xong, đưa cho người xem 30 giây và hỏi họ thấy gì. Nếu khác câu hỏi, sửa biểu đồ chứ không sửa người xem." },
        ],
      },
      {
        type: "callout",
        label: "Nhờ AI cũng vậy",
        text: "Nếu bạn nhờ một công cụ AI gợi ý biểu đồ, hãy đưa câu hỏi và vài cột cần dùng thay vì cả bảng. AI đoán ý rất nhanh nhưng đoán sai cũng rất tự tin, và nó không biết sếp bạn đang cần quyết định gì.",
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI gợi ý biểu đồ từ câu hỏi của bạn",
        task: "Bảng doanh thu 3 chi nhánh trà sữa theo tháng (6 tháng). Chủ quán muốn biết nên giảm ca buổi chiều ở đâu. Lắp prompt để AI đề xuất biểu đồ.",
        parts: [
          {
            id: "question",
            label: "Câu hỏi của người xem",
            options: [
              { text: "Vẽ biểu đồ doanh thu cho đẹp.", feedback: "Không có câu hỏi, AI sẽ vẽ theo thói quen và đưa cả bảng vào." },
              { text: "Chủ quán cần chọn chi nhánh để giảm ca chiều: chi nhánh nào doanh thu chiều thấp nhất?", good: true, feedback: "Có người xem, quyết định và thứ cần so, nên AI biết chỉ cần số buổi chiều." },
            ],
          },
          {
            id: "data",
            label: "Số đưa vào",
            options: [
              { text: "Dán toàn bộ bảng 12 cột và nhờ AI tự chọn số.", feedback: "AI có thể chọn nhầm cột và bạn không biết nó đã bỏ gì." },
              { text: "Chỉ gửi 3 cột: chi nhánh, tháng, doanh thu buổi chiều.", good: true, feedback: "Đúng các cột cần cho câu hỏi; bớt nhiễu và bớt lộ dữ liệu không cần thiết." },
            ],
          },
          {
            id: "ask",
            label: "Điều cần AI làm",
            options: [
              { text: "Đề xuất một loại biểu đồ, nói lý do và những số nên bỏ ra ngoài.", good: true, feedback: "Bạn nhận được lý do để tự đánh giá, không phải chỉ một tấm hình." },
              { text: "Làm cho trang trí thật bắt mắt nhé.", feedback: "Yêu cầu về vẻ ngoài, AI sẽ thêm màu mè làm rối thêm câu hỏi." },
            ],
          },
        ],
        responses: [
          {
            requires: ["question", "data", "ask"],
            text: "Đề xuất: biểu đồ cột nhóm theo chi nhánh, mỗi cột là doanh thu trung bình buổi chiều 6 tháng. Lý do: câu hỏi là so chi nhánh nào thấp nhất, cột so sánh dễ nhất. Bỏ: buổi sáng, buổi tối, nhóm hàng. Bạn nên đối chiếu số trung bình với bảng gốc trước khi dùng.",
          },
          {
            requires: ["question"],
            text: "Gợi ý biểu đồ đường cho cả 3 chi nhánh. Tôi đã đưa cả doanh thu sáng, chiều, tối vào để đầy đủ.\n\n(Có đúng câu hỏi nhưng thiếu số cần thiết, AI đưa cả cột không liên quan.)",
          },
          {
            text: "Gợi ý biểu đồ tròn nhiều màu cho thấy doanh thu tăng 18% so với cùng kỳ năm ngoái...\n\n(Không có câu hỏi và dữ liệu, AI tự bịa con số 18% cho nghe thuyết phục.)",
          },
        ],
      },
      {
        type: "scenario",
        title: "Sếp nhắn: vẽ giúp anh biểu đồ doanh thu",
        start: "s1",
        nodes: {
          s1: {
            text: "Thứ Hai 9 giờ, sếp nhắn đúng một câu: vẽ giúp anh biểu đồ doanh thu tháng này, chiều gửi. Bạn có bảng doanh thu theo chi nhánh và nhóm hàng.",
            choices: [
              { label: "Vẽ ngay biểu đồ tròn theo chi nhánh vì nhanh nhất", next: "bad_guess" },
              { label: "Nhắn sếp: anh định dùng để quyết định việc gì để em chọn số cho đúng?", next: "s2" },
            ],
          },
          bad_guess: {
            text: "Chiều gửi, sếp nhìn biểu đồ rồi nói: anh đang muốn biết nhóm hàng nào kéo doanh thu xuống, đâu phải chi nhánh. Bạn phải vẽ lại ngay trước giờ họp.",
            ending: "bad",
          },
          s2: {
            text: "Sếp trả lời: anh cần biết nhóm hàng nào giảm để quyết định nhập hàng tuần sau. Bạn viết câu hỏi: nhóm hàng nào giảm doanh thu so với tháng trước?",
            choices: [
              { label: "Đưa tất cả 8 nhóm hàng và cả 5 chi nhánh vào cho đầy đủ", next: "bad_all" },
              { label: "Chỉ lấy nhóm hàng, doanh thu hai tháng, và làm nổi nhóm đang giảm", next: "good" },
            ],
          },
          bad_all: {
            text: "Biểu đồ có 40 cột, sếp nhìn một lúc rồi bảo: gửi anh cái bảng thôi. Công sức vẽ không giúp gì cho quyết định nhập hàng.",
            ending: "bad",
          },
          good: {
            text: "Sếp nhìn biểu đồ 8 cột, thấy ngay hai nhóm hàng giảm được tô khác màu, và chốt giảm lượng nhập hai nhóm đó. Cả cuộc trao đổi mất chưa đầy một phút.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Hỏi người xem cần quyết định gì, viết thành một câu hỏi, rồi mới chọn số.",
          "Bài sau: cùng một câu hỏi, chọn cột, đường hay tròn thế nào.",
        ],
      },
    ],
  },
  {
    id: 2641,
    slug: "chon-cot-duong-hay-tron-theo-cau-hoi-khong-theo-so-thich",
    title: "Chặng 62, Bài 2: Chọn cột, đường hay tròn theo câu hỏi, không theo sở thích",
    subtitle: "Ba loại biểu đồ, ba loại câu hỏi. Chọn sai loại thì câu trả lời bị giấu đi.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "📈",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Nhiều người chọn biểu đồ theo kiểu mình thích hoặc kiểu công cụ gợi ý đầu tiên. Nhưng mỗi loại biểu đồ làm nổi một kiểu so sánh: cột cho so sánh giữa các nhóm, đường cho thay đổi theo thời gian, tròn cho tỷ trọng của một tổng. Chọn đúng loại giúp người xem thấy câu trả lời mà bạn không cần giải thích thêm.",
    openingQuestion:
      "Sếp hỏi: \"Doanh thu từng tháng năm nay đi lên hay đi xuống?\" Loại biểu đồ nào cho thấy rõ nhất?",
    openingOptions: [
      "Biểu đồ đường, vì cho thấy xu hướng theo thời gian",
      "Biểu đồ tròn, vì mỗi tháng là một lát trong cả năm",
      "Biểu đồ cột xếp theo thứ tự từ cao xuống thấp nhất",
      "Biểu đồ nào cũng như nhau, chỉ khác màu sắc thôi",
    ],
    correctOption: 0,
    explanation:
      "Câu hỏi là về xu hướng theo thời gian, nên đường nối các tháng cho thấy ngay hướng đi lên hay xuống. Biểu đồ tròn chỉ cho biết tháng nào chiếm phần lớn, không cho thấy thứ tự tháng. Cột xếp từ cao xuống thấp làm mất thứ tự thời gian, nên không còn thấy xu hướng. Loại biểu đồ không hề giống nhau: mỗi loại làm nổi một kiểu so sánh.",
    diagram: [
      { label: "So sánh các nhóm với nhau", arrow: true },
      { label: "Theo thời gian: đường", arrow: true },
      { label: "Tỷ trọng trong một tổng: tròn" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: phòng kế toán công ty 30 người",
      description:
        "Chị kế toán vẽ chi phí từng tháng bằng biểu đồ tròn 12 lát. Ai xem cũng hỏi: tháng nào cao, có đang tăng không? Chị đổi sang biểu đồ đường, và câu hỏi về xu hướng được trả lời ngay. Số liệu không đổi, chỉ có loại biểu đồ đổi cho khớp với câu hỏi.",
    },
    quiz: [
      Q(
        "Bạn muốn so doanh thu của 5 chi nhánh trong tháng này. Nên dùng gì?",
        [
          "Biểu đồ cột, mỗi chi nhánh một cột",
          "Biểu đồ đường nối 5 chi nhánh với nhau theo thứ tự",
          "Biểu đồ tròn 5 lát cho mỗi chi nhánh một màu riêng",
          "Bảng số kèm biểu đồ vùng đặt chồng lên nhau",
        ],
        "So sánh giữa các nhóm là sở trường của cột, vì chiều cao dễ so bằng mắt. Đường ngụ ý có thứ tự giữa các chi nhánh vốn không có, tròn khó so lát gần bằng nhau, còn biểu đồ vùng chồng lên nhau thì khó đọc từng phần.",
      ),
      Q(
        "Câu hỏi nào hợp nhất với biểu đồ đường?",
        [
          "Số khách đến quán tăng hay giảm qua 12 tuần qua?",
          "Nhóm hàng nào bán chạy nhất tháng này?",
          "Mỗi nhóm hàng chiếm bao nhiêu phần trăm?",
          "Chi nhánh nào có nhiều nhân viên nhất?",
        ],
        "Đường cần trục thời gian có thứ tự. Câu về tăng hay giảm qua các tuần là câu đó. Ba câu còn lại so sánh nhóm (hợp với cột) hoặc hỏi tỷ trọng (hợp với tròn), nên không cần nối điểm theo thời gian.",
      ),
      Q(
        "Khi nào biểu đồ tròn là lựa chọn hợp lý?",
        [
          "Ít lát, và cần thấy phần chiếm bao nhiêu của tổng",
          "Có nhiều nhóm, lát gần bằng nhau",
          "Cần theo dõi từng nhóm thay đổi ra sao theo từng tháng",
          "Khi muốn cho biểu đồ trông khác biệt so với báo cáo cũ",
        ],
        "Tròn chỉ hợp khi ít lát và một lát chiếm phần rõ rệt. Nhiều lát gần bằng nhau thì mắt người rất khó phân biệt, còn theo dõi thay đổi theo tháng là việc của đường. Muốn khác biệt không phải lý do chọn loại biểu đồ.",
      ),
      Q(
        "Chi phí 6 loại, cần biết loại nào lớn nhất. Cách nào rõ nhất?",
        [
          "Cột ngang xếp từ lớn đến nhỏ",
          "Biểu đồ tròn sáu lát màu khác nhau, để người xem tự so",
          "Biểu đồ đường nối 6 loại theo thứ tự trong bảng",
          "Bảng số kèm ghi chú màu để tô loại lớn nhất lên",
        ],
        "Cột xếp theo thứ tự cho thấy ngay loại lớn nhất và thứ hạng của cả nhóm. Tròn khó so lát gần nhau, đường ngụ ý thứ tự không có, còn bảng số buộc người xem tự đọc từng số thay vì nhìn là thấy.",
      ),
      Q(
        "Bạn chọn loại biểu đồ dựa vào điều gì là đúng nhất?",
        [
          "Loại câu hỏi: so nhóm, theo thời gian hay tỷ trọng",
          "Loại biểu đồ mà công cụ vẽ đề xuất đầu tiên trong danh sách",
          "Loại bạn đã dùng ở báo cáo tuần trước",
          "Loại trông phức tạp nhất vì người xem sẽ tin là rất chuyên nghiệp",
        ],
        "Chọn theo câu hỏi, không theo thói quen hay sở thích. Gợi ý đầu tiên của công cụ chỉ dựa trên hình dạng bảng, dùng lại loại cũ chỉ đúng khi câu hỏi vẫn y nguyên, và phức tạp làm người xem khó hiểu hơn chứ không đáng tin hơn.",
      ),
    ],
    keyTakeaways: [
      "Cột: so sánh các nhóm với nhau ở cùng một thời điểm.",
      "Đường: thay đổi theo thời gian, có thứ tự từ trái sang phải.",
      "Tròn: phần của một tổng, chỉ khi ít lát và khác nhau rõ.",
      "Chọn theo câu hỏi của người xem, không theo loại bạn quen dùng.",
    ],
    practicePrompt: {
      question:
        "Bạn cần cho thấy chi nhánh nào đang bán giảm dần qua 6 tháng. Chọn thế nào?",
      options: [
        "Biểu đồ đường, mỗi chi nhánh một đường theo tháng",
        "Biểu đồ tròn cho từng tháng để thấy phần mỗi chi nhánh chiếm",
        "Một cột cho mỗi chi nhánh, lấy tổng doanh thu cả 6 tháng",
        "Bảng 6 cột tháng, tô đỏ những ô có doanh thu thấp hơn",
      ],
      correct: 0,
      explanation:
        "Giảm dần là câu hỏi theo thời gian của từng chi nhánh, nên mỗi chi nhánh cần một đường theo 6 tháng. Tròn từng tháng không cho thấy xu hướng, tổng 6 tháng nuốt mất thứ tự, và bảng tô đỏ bắt người xem đọc từng ô.",
    },
    summary: {
      keyIdea: "Cột để so nhóm, đường để theo thời gian, tròn để xem phần của tổng.",
      formula: "Câu hỏi so nhóm → cột. Câu hỏi theo thời gian → đường. Câu hỏi tỷ trọng ít lát → tròn.",
      commonMistake: "Dùng biểu đồ tròn cho mọi thứ vì trông dễ hiểu và quen mắt.",
      action: "Nhìn lại ba biểu đồ gần đây bạn làm: mỗi cái trả lời loại câu hỏi nào, và loại vẽ có khớp không?",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Viết ra ba câu hỏi thật ở chỗ bạn làm: một câu so nhóm (ví dụ: sản phẩm nào bán nhiều nhất), một câu theo thời gian (ví dụ: số đơn tăng hay giảm qua 8 tuần), một câu tỷ trọng (ví dụ: mỗi loại chi phí chiếm bao nhiêu). Ghi bên cạnh loại biểu đồ hợp và một lý do ngắn, rồi vẽ một cái từ số thật của bạn.",
      secondary: "Hôm sau xem người nhận có hiểu ngay, không cần bạn giải thích thêm.",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn đã có câu hỏi. Bước tiếp theo là chọn hình vẽ. Phần lớn biểu đồ rối không phải do công cụ kém mà do chọn nhầm loại cho câu hỏi. Bài này cho bạn ba loại đủ dùng cho hầu hết việc văn phòng.",
      },
      {
        type: "feynman",
        title: "Chọn biểu đồ đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung bạn chọn đồ đựng trong bếp. Cần đong nước thì dùng cốc chia vạch, cần so chiều cao hai chai thì đặt cạnh nhau, cần cắt bánh chia phần thì dùng dao. Mỗi việc một dụng cụ.",
        columns: ["Việc cần làm", "Dụng cụ trong bếp", "Loại biểu đồ"],
        rows: [
          ["Đặt cạnh nhau để so", "Đặt hai chai cạnh nhau", "Cột"],
          ["Theo dõi thay đổi", "Đánh dấu mực nước mỗi giờ", "Đường"],
          ["Chia phần của cả chiếc bánh", "Cắt bánh thành lát", "Tròn (ít lát)"],
          ["Chọn sai", "Đo chiều cao bằng dao cắt bánh", "Câu trả lời bị che đi"],
        ],
        oneLiner: "Mỗi loại biểu đồ làm tốt một việc, nên hãy chọn theo việc cần làm.",
      },
      { type: "heading", text: "Ba câu hỏi, ba loại biểu đồ" },
      {
        type: "paragraph",
        text: "Cột cho mắt so chiều cao giữa các nhóm, nhanh và khó nhầm. Đường nối các điểm theo thời gian nên cho thấy hướng đi. Tròn cho thấy phần nào chiếm bao nhiêu trong một tổng, nhưng mắt người so góc và diện tích kém hơn so chiều cao, nên chỉ hợp khi ít lát.",
      },
      {
        type: "list",
        items: [
          "Nhóm nào nhiều hơn nhóm nào? Dùng cột, xếp từ lớn đến nhỏ nếu không có thứ tự tự nhiên.",
          "Cái này tăng hay giảm theo thời gian? Dùng đường, thời gian chạy từ trái sang phải.",
          "Mỗi phần chiếm bao nhiêu trong tổng? Dùng tròn nếu dưới khoảng 5 phần, còn lại dùng cột.",
          "Còn cần đọc con số chính xác? Ghi số ngay trên cột hoặc điểm cuối của đường.",
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Chọn theo sở thích",
          text: "Doanh thu 12 tháng vẽ thành biểu đồ tròn vì trông đẹp. Người xem phải đoán tháng nào trước tháng nào và không thấy xu hướng.",
        },
        right: {
          label: "Chọn theo câu hỏi",
          text: "Câu hỏi về xu hướng nên vẽ đường 12 điểm. Người xem thấy hướng đi lên trong chưa đầy 5 giây.",
        },
      },
      {
        type: "flow",
        title: "Chọn loại biểu đồ trong ba câu hỏi",
        steps: [
          { label: "Có thời gian chạy trong câu hỏi không?", detail: "Nếu câu hỏi nói tăng, giảm, xu hướng, qua các tháng thì dùng đường và xếp thời gian từ trái sang phải." },
          { label: "Cần so nhóm với nhau không?", detail: "Nếu câu hỏi là cái nào nhiều hơn thì dùng cột, xếp từ lớn đến nhỏ để thứ hạng hiện ra ngay." },
          { label: "Cần thấy phần của một tổng không?", detail: "Nếu câu hỏi là mỗi phần chiếm bao nhiêu và có dưới 5 phần thì dùng tròn; nhiều hơn thì đổi sang cột ngang." },
          { label: "Thử 5 giây", detail: "Cho đồng nghiệp xem 5 giây rồi che đi và hỏi họ nhớ gì. Nếu họ nói đúng câu trả lời thì loại biểu đồ đã khớp." },
        ],
      },
      {
        type: "callout",
        label: "Nhờ AI chọn biểu đồ",
        text: "Nếu nhờ AI, hãy nói rõ câu hỏi bằng lời rồi hỏi: loại biểu đồ nào hợp và vì sao. Đừng chỉ nhờ vẽ cho đẹp, vì AI sẽ chọn kiểu phổ biến mà không biết người xem cần so cái gì.",
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI chọn loại biểu đồ cho một câu hỏi",
        task: "Bạn cần cho thấy doanh số 4 nhân viên bán hàng trong tháng này, để biết ai cần được hỗ trợ. Lắp prompt để AI gợi ý loại biểu đồ.",
        parts: [
          {
            id: "question",
            label: "Câu hỏi",
            options: [
              { text: "Gợi ý biểu đồ đẹp cho báo cáo doanh số.", feedback: "Không nói câu hỏi, AI chọn kiểu phổ biến, có thể là tròn." },
              { text: "Tôi cần so doanh số 4 nhân viên tháng này để biết ai cần hỗ trợ. Nên dùng loại biểu đồ nào?", good: true, feedback: "Có hành động so nhóm và mục đích, nên AI chọn được cột." },
            ],
          },
          {
            id: "data",
            label: "Dữ liệu mô tả",
            options: [
              { text: "4 người, mỗi người một con số doanh số tháng này, không chia theo thời gian.", good: true, feedback: "AI biết là so nhóm và không có thời gian, nên không đề xuất đường." },
              { text: "Có dữ liệu doanh số của mọi người.", feedback: "Mơ hồ, AI không biết có mấy người và có thời gian hay không." },
            ],
          },
          {
            id: "ask",
            label: "Cách trả lời",
            options: [
              { text: "Chọn một loại và giải thích bằng một câu vì sao hợp hơn hai loại còn lại.", good: true, feedback: "Bạn có lý do để đánh giá, và biết AI có hiểu câu hỏi không." },
              { text: "Cho tôi mọi loại biểu đồ có thể dùng.", feedback: "Nhận một danh sách dài, vẫn phải tự chọn." },
            ],
          },
        ],
        responses: [
          {
            requires: ["question", "data", "ask"],
            text: "Nên dùng biểu đồ cột, mỗi nhân viên một cột, xếp từ cao đến thấp. Vì bạn so 4 nhóm ở cùng một thời điểm, cột cho mắt so chiều cao nhanh nhất; đường cần thời gian và tròn chỉ hợp khi hỏi phần của một tổng.",
          },
          {
            requires: ["question"],
            text: "Có thể dùng biểu đồ cột hoặc đường tuỳ bạn thích. Đường cũng cho thấy doanh số từng người.\n\n(Đúng hướng nhưng chưa rõ, vì thiếu mô tả dữ liệu nên AI chưa loại được đường.)",
          },
          {
            text: "Biểu đồ tròn nhiều màu sẽ rất bắt mắt, tăng 25% mức độ chú ý của người xem...\n\n(Không có câu hỏi, AI chọn kiểu phổ biến và bịa ra con số 25% cho nghe thuyết phục.)",
          },
        ],
      },
      {
        type: "scenario",
        title: "Ba câu hỏi trong một buổi họp",
        start: "s1",
        nodes: {
          s1: {
            text: "Buổi họp tuần, ba người hỏi ba câu: (1) bán hàng tăng hay giảm qua 8 tuần, (2) nhóm hàng nào đóng góp nhiều nhất tháng này, (3) doanh thu chiếm bao nhiêu phần từ kênh online. Bạn chuẩn bị biểu đồ cho câu đầu tiên.",
            choices: [
              { label: "Dùng biểu đồ tròn 8 lát cho 8 tuần", next: "bad_pie" },
              { label: "Dùng biểu đồ đường với 8 tuần từ trái sang phải", next: "s2" },
            ],
          },
          bad_pie: {
            text: "Người xem nhìn 8 lát gần bằng nhau, không ai biết tuần nào trước tuần nào. Câu hỏi tăng hay giảm vẫn chưa được trả lời, và cuộc họp mất 10 phút để giải thích lại.",
            ending: "bad",
          },
          s2: {
            text: "Cả nhóm thấy ngay đường đi xuống nhẹ. Câu hỏi thứ hai: nhóm hàng nào đóng góp nhiều nhất trong 6 nhóm.",
            choices: [
              { label: "Vẽ cột ngang xếp từ lớn đến nhỏ", next: "s3" },
              { label: "Vẽ thêm đường cho 6 nhóm hàng theo 8 tuần", next: "bad_lines" },
            ],
          },
          bad_lines: {
            text: "Sáu đường chồng nhau làm cả nhóm lại phải đoán. Họ hỏi câu hỏi mới: đường nào là nhóm nào, và câu hỏi ban đầu vẫn chưa được trả lời.",
            ending: "bad",
          },
          s3: {
            text: "Cả phòng thấy nhóm đầu tiên dẫn rõ. Câu hỏi cuối: kênh online chiếm bao nhiêu phần doanh thu, chỉ có hai kênh: online và cửa hàng.",
            choices: [
              { label: "Biểu đồ tròn 2 lát, ghi phần trăm trên từng lát", next: "good" },
              { label: "Biểu đồ đường cho 2 kênh theo từng tháng trong năm", next: "bad_wrong" },
            ],
          },
          bad_wrong: {
            text: "Hai đường đẹp nhưng câu hỏi là phần của một tổng. Người xem phải tự ước lượng tỷ lệ bằng mắt và mỗi người đoán một số khác nhau.",
            ending: "bad",
          },
          good: {
            text: "Với hai lát, tròn là lựa chọn hợp lý: ai cũng thấy kênh online chiếm khoảng một phần ba. Ba câu hỏi, ba loại biểu đồ, và không ai hỏi lại.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Cột để so, đường để theo thời gian, tròn để chia phần của tổng.",
          "Bài sau: khi một biểu đồ nhồi quá nhiều số, bỏ gì đi để người xem hiểu.",
        ],
      },
    ],
  },
  {
    id: 2642,
    slug: "nhoi-ba-loai-so-lieu-vao-mot-bieu-do-nho-lai-con-mot",
    title: "Chặng 62, Bài 3: Nhồi ba loại số vào một biểu đồ: bỏ bớt để người xem hiểu",
    subtitle: "Tám đường chồng nhau trông như cuộn dây. Giữ một đường, làm mờ phần còn lại.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🧵",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Khi có đủ số trong bảng, cám dỗ lớn nhất là đưa hết vào một biểu đồ cho đầy đủ. Kết quả là người xem nhìn một cuộn dây và không biết đường nào đáng chú ý. Biết bỏ bớt, tách ra hoặc làm mờ là kỹ năng giúp biểu đồ của bạn được hiểu trong vài giây thay vì vài phút.",
    openingQuestion:
      "Biểu đồ của bạn có 8 đường cho 8 chi nhánh, chồng lên nhau. Sếp chỉ quan tâm chi nhánh Đà Nẵng đang giảm. Nên sửa thế nào?",
    openingOptions: [
      "Làm nổi đường Đà Nẵng, làm mờ bảy đường còn lại",
      "Thêm chú thích dài cho cả tám đường ở bên phải biểu đồ",
      "Đổi toàn bộ sang biểu đồ tròn để khỏi bị chồng nhau",
      "Giữ nguyên và dặn sếp nhìn kỹ đường Đà Nẵng thôi nhé",
    ],
    correctOption: 0,
    explanation:
      "Câu hỏi của sếp chỉ nhắm vào một chi nhánh, nên đường đó cần nổi bật còn các đường khác là nền để so. Thêm chú thích dài làm biểu đồ rối hơn, đổi sang tròn làm mất thứ tự thời gian, còn dặn sếp nhìn kỹ là đẩy công sức về người xem. Người làm biểu đồ mới là người phải bớt việc cho người xem.",
    diagram: [
      { label: "Nhiều đường chồng nhau", arrow: true },
      { label: "Hỏi: đường nào đáng chú ý", arrow: true },
      { label: "Làm nổi một đường, mờ phần còn lại" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: nhóm vận hành của một chuỗi cửa hàng",
      description:
        "Một báo cáo tuần có biểu đồ 9 đường cho 9 cửa hàng. Trưởng nhóm được hỏi: cửa hàng nào đang tụt? Cả phòng phải chỉ ngón tay lên màn hình dò từng đường. Bản mới tách làm hai: một đường nổi bật cho cửa hàng đang giảm, tám đường còn lại là màu xám nhạt. Câu hỏi được trả lời trước khi ai kịp mở miệng.",
    },
    quiz: [
      Q(
        "Biểu đồ có 8 đường chồng nhau. Điều gì giúp người xem nhiều nhất?",
        [
          "Làm nổi đường quan trọng, làm mờ các đường còn lại",
          "Đặt chú thích màu dài ở bên phải",
          "Thêm đường trung bình cả công ty",
          "Đổi cả tám đường sang màu tươi",
        ],
        "Người xem cần biết nhìn đường nào trước, làm mờ phần nền trả lời điều đó. Chú thích dài, thêm đường trung bình hay đổi màu tươi chỉ làm nhiều thông tin hơn, trong khi vấn đề gốc là nhiều hơn mức mắt lọc được.",
      ),
      Q(
        "Bạn nên giữ tối đa bao nhiêu đường trong một biểu đồ thông thường?",
        [
          "Ít đường đủ để phân biệt, thường không quá 4-5",
          "Bao nhiêu cũng được nếu màu khác nhau",
          "Đúng 8 đường để khớp với số chi nhánh công ty đang có",
          "Càng nhiều càng tốt vì người xem sẽ tin vào số liệu đầy đủ",
        ],
        "Mắt chỉ phân biệt được vài đường cùng lúc, nhiều hơn thì phải dò từng đường. Số đường không nên theo số chi nhánh, và đầy đủ không đồng nghĩa với dễ hiểu; nếu cần nhiều hơn, hãy tách biểu đồ.",
      ),
      Q(
        "Một biểu đồ có 3 loại số với thang rất khác nhau. Nên làm gì?",
        [
          "Tách thành các biểu đồ nhỏ, mỗi cái một loại số",
          "Gộp hết vào một biểu đồ và dùng thêm trục thứ hai ở bên phải cho đủ",
          "Bỏ hai loại số đi mà không nói cho người xem biết điều đó",
          "Dùng chữ in nhỏ để nhét đủ vào",
        ],
        "Thang khác nhau trong một biểu đồ dễ làm người xem hiểu sai, nên tách ra là an toàn nhất. Trục thứ hai cần thận trọng (sẽ nói ở bài sau), bỏ số mà không báo là giấu thông tin, còn chữ nhỏ làm đọc khó hơn.",
      ),
      Q(
        "Sếp chỉ hỏi một chi nhánh. Các đường còn lại nên làm gì?",
        [
          "Giữ lại làm nền, màu xám nhạt",
          "Xoá hết, để người xem không thấy chi nhánh nào khác",
          "Giữ nguyên màu tươi cho mỗi đường để không bị thiên vị",
          "Dồn sang một biểu đồ thứ hai đặt ở cuối báo cáo nhiều trang",
        ],
        "Đường nền giúp người xem biết đường chính đang cao hay thấp so với các chi nhánh khác. Xoá hết mất bối cảnh, giữ nguyên màu tươi lại kéo mắt vào từng đường, và đẩy sang cuối báo cáo thì không ai lật xem.",
      ),
      Q(
        "AI đề xuất thêm 5 đường nữa vào biểu đồ 'cho đầy đủ'. Bạn nên làm gì?",
        [
          "Hỏi lại: đường mới có giúp trả lời câu hỏi không?",
          "Thêm vào luôn vì AI thường biết rõ hơn người làm biểu đồ",
          "Thêm vào nhưng để màu thật nhạt để không ai để ý",
          "Bỏ hết đề xuất vì AI không hiểu gì về biểu đồ",
        ],
        "Mỗi đường phải trả lời được câu hỏi, nếu không chỉ làm rối thêm. AI có thể gợi ý hữu ích nhưng không biết người xem cần gì. Thêm rồi làm nhạt vẫn là nhiễu, còn bỏ hết đề xuất là bỏ luôn những gợi ý có thể dùng được.",
      ),
    ],
    keyTakeaways: [
      "Mỗi đường trong biểu đồ phải giúp trả lời câu hỏi; không thì bỏ hoặc làm mờ.",
      "Giữ tối đa vài đường, làm nổi một đường và làm mờ phần nền.",
      "Thang đo khác nhau thì tách thành các biểu đồ nhỏ.",
      "Đầy đủ khác với dễ hiểu: bảng số đã có để ai cần thì xem.",
    ],
    practicePrompt: {
      question:
        "Biểu đồ có doanh thu, chi phí quảng cáo và số khách theo tháng, ba thang rất khác nhau. Cách nào dễ đọc nhất?",
      options: [
        "Ba biểu đồ nhỏ xếp dọc, cùng trục thời gian",
        "Một biểu đồ, hai trục tung và đường số khách ẩn trong tooltip",
        "Một biểu đồ duy nhất, tô ba màu đậm để người xem thấy rõ",
        "Bỏ số khách, vẽ hai đường còn lại rồi không giải thích gì",
      ],
      correct: 0,
      explanation:
        "Ba biểu đồ nhỏ cùng trục thời gian cho phép so xu hướng mà không bị ép về cùng một thang. Hai trục tung làm dễ hiểu nhầm, ba màu đậm vẫn ép cả ba về một thang, còn bỏ một số mà không nói là giấu thông tin.",
    },
    summary: {
      keyIdea: "Mỗi số trong biểu đồ phải có lý do; nếu không, bỏ, làm mờ hoặc tách.",
      formula: "Nhiều đường → chọn đường chính → làm mờ phần nền → thang khác thì tách.",
      commonMistake: "Đưa hết số vào biểu đồ để khỏi bị hỏi sao thiếu.",
      action: "Mở biểu đồ rối nhất bạn từng làm và thử làm nổi một đường, làm mờ các đường còn lại.",
    },
    application: {
      title: "Làm ngay trong 15 phút",
      message:
        "Tìm một biểu đồ có từ 4 đường trở lên trong báo cáo của bạn (hoặc vẽ từ số thật). Viết câu hỏi của người xem, chọn một đường trả lời câu hỏi đó, tô nó màu đậm và đưa các đường còn lại về màu xám nhạt. Cho một đồng nghiệp xem 30 giây và hỏi họ thấy gì.",
      secondary: "Ghi lại số đường bạn bỏ hoặc làm mờ và xem có ai hỏi bạn thiếu không.",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn có 8 chi nhánh, nên bạn vẽ 8 đường. Nhìn vào, nó giống một cuộn len rối. Bài này dạy ba cách gỡ: làm nổi một đường, làm mờ phần nền, hoặc tách thành các biểu đồ nhỏ.",
      },
      {
        type: "feynman",
        title: "Bỏ bớt số đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung bạn nhờ bạn tìm chiếc chìa khoá trong ngăn kéo. Nếu ngăn kéo có 8 chùm chìa khoá lẫn nhau, bạn mất vài phút. Nếu bạn để chùm cần tìm lên mặt bàn, cả phòng thấy ngay.",
        columns: ["Tình huống", "Ngăn kéo chìa khoá", "Biểu đồ"],
        rows: [
          ["Quá nhiều thứ", "8 chùm lẫn lộn", "8 đường chồng nhau"],
          ["Việc cần làm", "Đưa chùm cần tìm ra ngoài", "Làm nổi đường quan trọng"],
          ["Phần còn lại", "Vẫn nằm trong ngăn kéo", "Màu xám nhạt làm nền"],
          ["Kết quả", "Thấy ngay chìa khoá", "Thấy ngay đường cần chú ý"],
        ],
        oneLiner: "Biểu đồ dễ hiểu là biểu đồ đã lấy sẵn thứ cần tìm ra để trên bàn.",
      },
      { type: "heading", text: "Vì sao tám đường là quá nhiều" },
      {
        type: "paragraph",
        text: "Mắt người chỉ theo dõi được vài đường cùng lúc. Khi có nhiều hơn, bạn phải tìm từng đường trong bảng chú thích rồi dò lại trên biểu đồ. Công sức đó thuộc về người xem, trong khi họ chỉ có vài chục giây.",
      },
      {
        type: "list",
        items: [
          "Hỏi: người xem cần chú ý đường nào? Đó là đường chính.",
          "Tô đường chính bằng một màu đậm, dày hơn một chút.",
          "Đưa các đường còn lại về màu xám nhạt làm nền để so.",
          "Nếu hai loại số có thang khác hẳn nhau, tách thành hai biểu đồ nhỏ cùng trục thời gian.",
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Nhồi tất cả",
          text: "8 đường, 8 màu, chú thích dài bên phải. Người xem dò từng đường, nhìn lên nhìn xuống, và hỏi lại: đường nào là Đà Nẵng?",
        },
        right: {
          label: "Bỏ bớt và làm nổi",
          text: "1 đường đậm có tên ngay trên đường, 7 đường xám nhạt làm nền. Người xem thấy ngay Đà Nẵng đang giảm và thấp hơn các chi nhánh khác.",
        },
      },
      {
        type: "flow",
        title: "Gỡ một biểu đồ quá tải",
        steps: [
          { label: "Đếm số đường", detail: "Nếu nhiều hơn khoảng 4-5 đường thì hỏi ngay: người xem cần chú ý đường nào." },
          { label: "Chọn đường chính", detail: "Đường chính là đường trả lời trực tiếp câu hỏi, ví dụ chi nhánh đang giảm hoặc chi nhánh sếp hỏi." },
          { label: "Làm mờ phần còn lại", detail: "Chuyển các đường còn lại sang xám nhạt. Chúng vẫn ở đó để so nhưng không tranh mắt với đường chính." },
          { label: "Tách nếu thang khác nhau", detail: "Nếu trong biểu đồ có số khác thang, như tiền và số khách, tách thành các biểu đồ nhỏ cùng trục thời gian." },
        ],
      },
      {
        type: "callout",
        label: "Nhờ AI đề xuất cách tách",
        text: "AI có thể gợi ý cách tách rất nhanh, nhưng nó hay thêm cho đầy đủ. Hãy đưa câu hỏi của người xem, rồi kiểm từng đường AI giữ hoặc bỏ: đường nào không giúp trả lời câu hỏi thì bỏ.",
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát đề xuất của AI cho biểu đồ 8 đường",
        task: "Bạn nhờ AI đề xuất cách sửa biểu đồ 8 đường. Sếp chỉ quan tâm chi nhánh Đà Nẵng. Bảng thật chỉ có doanh thu theo tháng của 8 chi nhánh, không có số khách hay chi phí. Đánh dấu những điều AI tự thêm.",
        segments: [
          { text: "Nên làm nổi đường Đà Nẵng bằng màu đậm." },
          { text: "Bảy đường còn lại chuyển sang xám nhạt để làm nền so sánh." },
          {
            text: "Nên thêm đường số khách của Đà Nẵng, thấy số khách đã giảm 12% trong ba tháng.",
            error: "Bảng không có số khách; con số 12% do AI bịa. Đây cũng là thêm số ngoài câu hỏi.",
          },
          { text: "Ghi tên Đà Nẵng ngay cạnh đường thay vì để trong chú thích." },
          {
            text: "Chi nhánh Đà Nẵng bị giảm vì cạnh tranh từ đối thủ mới mở cạnh đó.",
            error: "Bảng chỉ có doanh thu; AI tự đưa ra nguyên nhân mà không có số liệu nào chứng minh.",
          },
        ],
      },
      {
        type: "scenario",
        title: "Gỡ biểu đồ 8 đường trước giờ họp",
        start: "s1",
        nodes: {
          s1: {
            text: "Còn 30 phút nữa họp. Biểu đồ 8 đường của bạn đã gửi sếp xem trước, và sếp nhắn: anh nhìn không ra gì cả. Sếp quan tâm Đà Nẵng.",
            choices: [
              { label: "Thêm chú thích thật chi tiết, cỡ chữ nhỏ cho vừa chỗ", next: "bad_legend" },
              { label: "Làm nổi Đà Nẵng, các đường khác xám nhạt, ghi tên ngay cạnh đường", next: "s2" },
            ],
          },
          bad_legend: {
            text: "Sếp nhìn chú thích nhỏ xíu rồi nói: anh vẫn không thấy đâu. Bạn mất thêm 10 phút và vẫn chưa giải quyết được vấn đề.",
            ending: "bad",
          },
          s2: {
            text: "Sếp thấy ngay Đà Nẵng đang đi xuống. Đồng nghiệp đề nghị: thêm cả số khách và chi phí quảng cáo lên biểu đồ này cho đầy đủ luôn.",
            choices: [
              { label: "Thêm hai đường mới vào cùng biểu đồ, tô màu đậm cho dễ thấy", next: "bad_more" },
              { label: "Giữ biểu đồ như vậy, để số khách và chi phí ở biểu đồ nhỏ riêng nếu sếp hỏi", next: "good" },
            ],
          },
          bad_more: {
            text: "Biểu đồ lại thành cuộn dây, và hai loại số mới có thang khác hẳn nên đường doanh thu bị ép phẳng. Sếp lại nhắn: anh không thấy đâu nữa rồi.",
            ending: "bad",
          },
          good: {
            text: "Trong cuộc họp, sếp hỏi ngay: Đà Nẵng giảm từ tháng nào? Bạn trả lời được luôn, và khi sếp hỏi thêm về số khách, bạn mở biểu đồ phụ riêng.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Mỗi số trong biểu đồ phải trả lời câu hỏi; không thì bỏ, mờ hoặc tách.",
          "Bài sau: viết tiêu đề cho biểu đồ nói luôn kết luận.",
        ],
      },
    ],
  },
  {
    id: 2643,
    slug: "dat-ten-tieu-de-noi-luon-ket-luan-thay-vi-ten-bang",
    title: "Chặng 62, Bài 4: Tiêu đề nói luôn kết luận thay vì chỉ ghi tên bảng",
    subtitle: "Doanh thu Q3 là tên bảng. Doanh thu Q3 giảm ở hai chi nhánh miền Trung mới là điều để nhớ.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🏷️",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Người xem thường đọc tiêu đề trước và đôi khi chỉ đọc tiêu đề. Nếu tiêu đề chỉ ghi tên bảng, họ phải tự tìm ra điều đáng chú ý trong biểu đồ. Một tiêu đề nói luôn kết luận giúp họ biết cần nhìn gì và nhớ được điều bạn muốn họ nhớ.",
    openingQuestion:
      "Tiêu đề biểu đồ của bạn là \"Doanh thu Q3\". Sếp xem và hỏi: vậy thì sao? Cách sửa nào tốt nhất?",
    openingOptions: [
      "Viết thành câu nói điều cần thấy: doanh thu Q3 giảm ở miền Trung",
      "Thêm năm và tên công ty vào tiêu đề để rõ hơn nữa là doanh thu của ai",
      "Viết hoa toàn bộ tiêu đề để nổi bật hơn hẳn các biểu đồ khác",
      "Bỏ tiêu đề để biểu đồ nhìn gọn, người xem tự rút ra kết luận",
    ],
    correctOption: 0,
    explanation:
      "Tên bảng cho biết biểu đồ nói về cái gì, nhưng không nói điều bạn thấy. Một câu kết luận chỉ cho người xem điều cần nhìn và nhớ. Thêm năm hay tên công ty là thêm bối cảnh, viết hoa chỉ làm nổi chứ không thêm ý, còn bỏ tiêu đề đẩy hết việc giải thích sang người xem.",
    diagram: [
      { label: "Tên bảng: Doanh thu Q3", arrow: true },
      { label: "Hỏi: người xem nên thấy gì", arrow: true },
      { label: "Tiêu đề thành câu kết luận" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: báo cáo tuần của phòng kinh doanh",
      description:
        "Một trưởng nhóm có thói quen đặt tiêu đề kiểu Số đơn theo tuần. Sau hai tháng, không ai đọc kỹ báo cáo. Khi đổi tiêu đề thành Số đơn giảm 3 tuần liên tiếp, phần lớn người nhận hỏi ngay về tuần giảm. Biểu đồ không đổi, chỉ có tiêu đề nói điều cần nhìn.",
    },
    quiz: [
      Q(
        "Tiêu đề nào nói kết luận tốt hơn cho một biểu đồ?",
        [
          "Số đơn giảm 3 tuần liền, nhiều nhất ở Đà Nẵng",
          "Số đơn hàng theo tuần trong quý",
          "Báo cáo số đơn tuần từ 1/9 đến 29/9 (bản cập nhật)",
          "Biểu đồ số đơn hàng của toàn bộ công ty chúng ta",
        ],
        "Câu đầu nói thẳng điều cần thấy và nơi tập trung. Ba câu còn lại đều là tên gọi: cho biết biểu đồ nói về gì nhưng không nói người xem nên rút ra điều gì, nên họ phải tự tìm trong biểu đồ.",
      ),
      Q(
        "Vì sao tiêu đề kết luận giúp người xem?",
        [
          "Họ biết ngay cần nhìn vào đâu trên biểu đồ",
          "Nó làm biểu đồ trông chuyên nghiệp và tốn ít chỗ hơn",
          "Nó giúp biểu đồ khỏi cần trục nữa",
          "Nó khiến mọi người đồng ý với kết luận của bạn hơn",
        ],
        "Tiêu đề kết luận là chỉ đường cho mắt. Nó không thay thế trục hay chú thích, cũng không bảo đảm người xem đồng ý; họ vẫn có thể kiểm lại bằng biểu đồ, và đó là điều bạn muốn.",
      ),
      Q(
        "Bạn viết tiêu đề kết luận nhưng số liệu chỉ có 2 tháng. Nên viết thế nào?",
        [
          "Nói đúng phạm vi: doanh thu giảm trong 2 tháng gần nhất",
          "Doanh thu sụt giảm mạnh, sẽ còn giảm",
          "Doanh thu liên tục giảm từ đầu năm",
          "Doanh thu tăng ổn định, không đáng bàn",
        ],
        "Kết luận phải khớp với số liệu có trong biểu đồ. Hai tháng chỉ cho phép nói về hai tháng, không nói được dự báo sẽ còn giảm, cũng không nói được từ đầu năm hay ổn định khi không có số liệu đó.",
      ),
      Q(
        "Tiêu đề nên dài khoảng bao nhiêu?",
        [
          "Một câu ngắn, đọc được trong một hơi",
          "Hai câu, câu đầu là kết luận và câu sau là gợi ý việc cần làm",
          "Một đoạn ngắn giải thích cách tính từng con số dùng để vẽ",
          "Chỉ 2-3 chữ để gọn, ví dụ: Doanh thu Q3 theo từng chi nhánh",
        ],
        "Một câu ngắn đủ để nêu kết luận mà vẫn đọc nhanh. Hai câu hoặc cả đoạn làm tiêu đề thành bài viết, còn 2-3 chữ quay lại thành tên bảng. Cách tính nên để chú thích nhỏ phía dưới.",
      ),
      Q(
        "AI viết sẵn 5 tiêu đề kết luận cho biểu đồ của bạn. Bước tiếp theo là gì?",
        [
          "Đối chiếu từng tiêu đề với số liệu thật trong biểu đồ",
          "Chọn tiêu đề nghe hay nhất rồi dùng luôn",
          "Chọn tiêu đề dài nhất vì nó chắc chắn chứa nhiều thông tin nhất",
          "Hỏi lại AI tiêu đề nào đúng rồi tin theo câu trả lời của nó",
        ],
        "AI có thể viết tiêu đề khẳng định điều số liệu không hề nói, ví dụ tăng bao nhiêu phần trăm. Phải mở biểu đồ và kiểm từng con số. Nghe hay hay dài đều không chứng minh đúng, và hỏi lại AI không phải kiểm chứng.",
      ),
    ],
    keyTakeaways: [
      "Tên bảng cho biết biểu đồ về cái gì; tiêu đề kết luận cho biết cần thấy gì.",
      "Một câu ngắn, có con số hoặc hướng (tăng, giảm, cao nhất) khi có thể.",
      "Kết luận chỉ được nói điều có trong số liệu của biểu đồ.",
      "AI viết tiêu đề nhanh nhưng hay thêm con số; kiểm lại trước khi dùng.",
    ],
    practicePrompt: {
      question:
        "Bảng cho thấy chi phí vận chuyển tháng này cao hơn tháng trước ở 2 trong 5 tuyến. Tiêu đề nào hợp nhất?",
      options: [
        "Chi phí vận chuyển tăng ở 2 trên 5 tuyến so với tháng trước",
        "Chi phí vận chuyển theo tuyến trong tháng này và tháng trước",
        "Chi phí vận chuyển tăng mạnh ở tất cả các tuyến trong công ty",
        "Bảng so sánh chi phí vận chuyển giữa các tuyến đường với nhau",
      ],
      correct: 0,
      explanation:
        "Câu đúng nói điều số liệu cho thấy, đúng phạm vi (2 trên 5 tuyến). Câu thứ hai và thứ tư chỉ là tên bảng, còn câu thứ ba nói tăng ở tất cả các tuyến, vượt xa điều số liệu cho phép.",
    },
    summary: {
      keyIdea: "Tiêu đề biểu đồ nói điều người xem nên thấy, không chỉ tên bảng.",
      formula: "Đối tượng + hướng thay đổi + mức hoặc phạm vi, đúng như số liệu cho phép.",
      commonMistake: "Viết tiêu đề khẳng định rộng hơn số liệu, hoặc để AI thêm con số không có trong bảng.",
      action: "Viết lại 3 tiêu đề trong báo cáo gần nhất từ tên bảng thành một câu kết luận.",
    },
    application: {
      title: "Làm ngay trong 15 phút",
      message:
        "Lấy 3 biểu đồ trong báo cáo gần nhất của bạn. Với mỗi biểu đồ, viết câu trả lời cho: nếu người xem chỉ đọc tiêu đề, họ nên nhớ điều gì? Đổi tiêu đề thành câu đó, rồi đối chiếu từng con số trong tiêu đề với bảng gốc.",
      secondary: "Ngày mai hỏi một đồng nghiệp: chỉ nhìn tiêu đề, bạn hiểu biểu đồ nói gì?",
    },
    sections: [
      {
        type: "lead",
        text: "Hầu hết biểu đồ trong báo cáo có tiêu đề như Doanh thu Q3 hoặc Số đơn theo tuần. Người xem nhìn thấy, gật đầu, rồi hỏi: vậy thì sao? Bài này dạy bạn viết tiêu đề trả lời luôn câu hỏi đó.",
      },
      {
        type: "feynman",
        title: "Tiêu đề kết luận đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung bạn đi qua một tiệm sách. Một tấm biển ghi Sách, tấm khác ghi Giảm 30% sách thiếu nhi đến hết tháng. Bạn chỉ đọc một dòng mà biết ngay có nên bước vào không.",
        columns: ["Kiểu biển", "Biển ở tiệm sách", "Tiêu đề biểu đồ"],
        rows: [
          ["Chỉ ghi tên", "Sách", "Doanh thu Q3"],
          ["Nói điều cần biết", "Giảm 30% sách thiếu nhi đến hết tháng", "Doanh thu Q3 giảm ở hai chi nhánh miền Trung"],
          ["Người xem làm gì", "Quyết định vào hay không", "Biết ngay cần nhìn vào đâu"],
          ["Điều cần cẩn thận", "Không ghi giảm giá khi chưa có", "Không khẳng định hơn số liệu"],
        ],
        oneLiner: "Tiêu đề nên như tấm biển nói điều cần biết, không chỉ tên cửa hàng.",
      },
      { type: "heading", text: "Từ tên bảng sang câu kết luận" },
      {
        type: "paragraph",
        text: "Tên bảng thường là danh từ: Doanh thu Q3, Số đơn theo tuần. Kết luận thường có một động từ hoặc một so sánh: giảm, tăng, cao nhất, thấp hơn tháng trước. Khi viết tiêu đề, hãy hỏi: nếu người xem chỉ nhớ một câu, tôi muốn đó là câu nào?",
      },
      {
        type: "list",
        items: [
          "Nhìn biểu đồ và nói điều nổi bật bằng một câu bình thường, như nói với đồng nghiệp.",
          "Thêm đối tượng và hướng: ai hoặc cái gì, tăng hay giảm, so với gì.",
          "Thêm con số hoặc phạm vi khi có, và chỉ dùng số có trong bảng của bạn.",
          "Đọc lại: câu này có đúng với mọi số liệu trong biểu đồ không?",
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Tiêu đề tên bảng",
          text: "Doanh thu Q3. Người xem phải tự tìm điều đáng chú ý trong biểu đồ, và mỗi người tìm ra một điều khác nhau.",
        },
        right: {
          label: "Tiêu đề kết luận",
          text: "Doanh thu Q3 giảm ở hai chi nhánh miền Trung. Cả phòng nhìn đúng hai đường đó ngay, và thảo luận bắt đầu từ đó.",
        },
      },
      {
        type: "flow",
        title: "Viết tiêu đề kết luận trong bốn bước",
        steps: [
          { label: "Nhìn và nói", detail: "Nhìn biểu đồ và nói to điều nổi bật nhất như khi kể cho đồng nghiệp, chưa cần câu hay." },
          { label: "Viết thành một câu", detail: "Có đối tượng, hướng thay đổi và phạm vi, ví dụ: số đơn giảm 3 tuần liền." },
          { label: "Đối chiếu số liệu", detail: "Mở bảng gốc và kiểm từng con số hoặc từ như mạnh, liên tục, tất cả. Từ nào vượt quá số liệu thì bỏ." },
          { label: "Đưa cho người khác đọc", detail: "Cho một đồng nghiệp chỉ đọc tiêu đề rồi hỏi họ hiểu gì. Nếu khác điều bạn muốn nói, sửa tiêu đề." },
        ],
      },
      {
        type: "callout",
        label: "Cẩn thận khi nhờ AI viết tiêu đề",
        text: "AI viết tiêu đề rất trôi, nhưng hay thêm con số hoặc nguyên nhân không có trong bảng, như tăng 18% hay do đối thủ. Hãy đưa số liệu thật và kiểm từng con số trong tiêu đề với bảng gốc trước khi dùng.",
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI viết lại tiêu đề Doanh thu Q3",
        task: "Biểu đồ cột cho thấy doanh thu Q3 của 5 chi nhánh. Hai chi nhánh miền Trung giảm so với Q2, ba chi nhánh còn lại tăng nhẹ. Lắp prompt để AI đề xuất tiêu đề.",
        parts: [
          {
            id: "context",
            label: "Thông tin đưa cho AI",
            options: [
              { text: "Viết tiêu đề hay cho biểu đồ doanh thu.", feedback: "AI không biết biểu đồ nói gì, nên sẽ bịa một xu hướng." },
              { text: "Biểu đồ cột: 5 chi nhánh, Q3 so với Q2; hai chi nhánh miền Trung giảm, ba chi nhánh còn lại tăng nhẹ.", good: true, feedback: "Có đủ dữ kiện thật để AI viết tiêu đề đúng phạm vi." },
            ],
          },
          {
            id: "rule",
            label: "Ràng buộc",
            options: [
              { text: "Chỉ dùng thông tin tôi đưa, không thêm con số hay nguyên nhân nào.", good: true, feedback: "Chặn AI bịa số và nguyên nhân, đúng chỗ AI hay sai nhất." },
              { text: "Cho tiêu đề thật ấn tượng để sếp chú ý.", feedback: "Khuyến khích AI phóng đại, dễ có từ như giảm mạnh mà số liệu không nói." },
            ],
          },
          {
            id: "format",
            label: "Cách trả lời",
            options: [
              { text: "Đưa 3 tiêu đề, mỗi cái dưới 15 chữ, để tôi chọn và kiểm lại.", good: true, feedback: "Có lựa chọn ngắn để đối chiếu; bạn vẫn là người quyết định." },
              { text: "Viết một đoạn giải thích chi tiết về xu hướng doanh thu.", feedback: "Bạn cần tiêu đề, không phải bài viết, và đoạn dài dễ chứa thêm điều bịa." },
            ],
          },
        ],
        responses: [
          {
            requires: ["context", "rule", "format"],
            text: "1. Doanh thu Q3 giảm ở hai chi nhánh miền Trung\n2. Hai chi nhánh miền Trung giảm, ba chi nhánh còn lại tăng nhẹ\n3. Q3: miền Trung giảm so với Q2\n\nMỗi tiêu đề chỉ dùng thông tin bạn đưa.",
          },
          {
            requires: ["context"],
            text: "Doanh thu Q3 giảm mạnh ở miền Trung do cạnh tranh gia tăng.\n\n(Có dữ kiện nên gần đúng, nhưng tự thêm mạnh và nguyên nhân cạnh tranh mà bạn không cho.)",
          },
          {
            text: "Doanh thu Q3 bứt phá, tăng 22% nhờ chiến lược mới...\n\n(Không có dữ kiện nên AI bịa số 22% và nguyên nhân.)",
          },
        ],
      },
      {
        type: "scenario",
        title: "Tiêu đề cho báo cáo gửi giám đốc",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn gửi báo cáo doanh thu Q3 cho giám đốc. Biểu đồ của bạn có tiêu đề Doanh thu Q3. Giám đốc thường chỉ đọc tiêu đề và liếc hình.",
            choices: [
              { label: "Giữ Doanh thu Q3 vì đúng quy cách của công ty", next: "bad_name" },
              { label: "Viết lại: Doanh thu Q3 giảm ở hai chi nhánh miền Trung", next: "s2" },
            ],
          },
          bad_name: {
            text: "Giám đốc liếc hình, thấy 5 cột khá đều và lật sang trang khác. Hai chi nhánh đang giảm không ai nhắc đến cho đến khi số liệu Q4 còn xấu hơn.",
            ending: "bad",
          },
          s2: {
            text: "Tiêu đề mới được đọc, giám đốc hỏi ngay: giảm bao nhiêu và vì sao? Trong bảng chỉ có số doanh thu, không có nguyên nhân.",
            choices: [
              { label: "Trả lời giảm mạnh do đối thủ mở mới, nghe hợp lý nên chắc là đúng", next: "bad_guess" },
              { label: "Nói số giảm bao nhiêu theo bảng, và nói chưa có số liệu về nguyên nhân, sẽ hỏi chi nhánh", next: "good" },
            ],
          },
          bad_guess: {
            text: "Giám đốc ra quyết định tăng khuyến mại ở miền Trung để chống đối thủ. Tuần sau, chi nhánh cho biết nguyên nhân thật là thiếu nhân viên, và khuyến mại tốn tiền mà doanh thu không tăng.",
            ending: "bad",
          },
          good: {
            text: "Giám đốc giao chi nhánh báo lại nguyên nhân trong tuần. Tiêu đề kết luận đúng phạm vi làm cuộc họp bắt đầu từ điều cần bàn và không ai bị dẫn sai hướng.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Tiêu đề nên nói điều người xem cần thấy, và chỉ nói điều số liệu cho phép.",
          "Bài sau: dự án nhỏ làm một biểu đồ thật từ bảng của bạn.",
        ],
      },
    ],
  },
  {
    id: 2644,
    slug: "du-an-nho-mot-bieu-do-tu-bang-cua-ban-kem-mot-cau-ket-luan",
    title: "Chặng 62, Bài 5: Dự án nhỏ: một biểu đồ từ bảng của bạn kèm một câu kết luận",
    subtitle: "Ghép cả bốn bài trước: câu hỏi, loại biểu đồ, bớt số, tiêu đề, rồi thử với một đồng nghiệp.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "🧪",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Đọc về biểu đồ chưa đủ; bạn chỉ biết mình làm được khi có một biểu đồ thật, từ số thật của mình, và có người xem thật. Bài này là dự án nhỏ làm trong 20 phút và có phép thử rõ ràng: đồng nghiệp xem 30 giây và nói lại điều họ hiểu.",
    openingQuestion:
      "Bạn vừa vẽ xong biểu đồ từ bảng số của mình. Cách nào kiểm xem biểu đồ có tốt không?",
    openingOptions: [
      "Cho một người xem 30 giây rồi hỏi họ hiểu điều gì",
      "Tự xem lại thật kỹ xem màu có hài hoà không rồi gửi",
      "Hỏi công cụ AI chấm điểm cho biểu đồ trên thang mười",
      "Gửi ngay cho sếp, nếu sếp không phàn nàn là biểu đồ tốt",
    ],
    correctOption: 0,
    explanation:
      "Biểu đồ tốt là biểu đồ người xem hiểu đúng điều bạn muốn họ hiểu, và chỉ người xem mới cho bạn biết điều đó. Tự xem lại thì bạn đã biết đáp án nên không còn thấy chỗ khó hiểu. AI chấm điểm không biết câu hỏi của người xem, còn sếp không phàn nàn có thể chỉ vì họ chưa đọc kỹ.",
    diagram: [
      { label: "Bảng số thật của bạn", arrow: true },
      { label: "Câu hỏi, loại biểu đồ, tiêu đề", arrow: true },
      { label: "Đồng nghiệp xem 30 giây", arrow: true },
      { label: "Sửa theo điều họ hiểu" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: chị nhân sự làm biểu đồ nghỉ phép",
      description:
        "Chị nhân sự có bảng số ngày nghỉ phép của 6 phòng ban. Chị viết câu hỏi: phòng nào dùng ít phép nhất để nhắc sắp xếp nghỉ? Chị vẽ cột ngang xếp thứ tự, đặt tiêu đề kết luận, rồi cho đồng nghiệp xem 30 giây. Đồng nghiệp nói đúng tên phòng, và chị gửi đi. Nếu họ nói sai, chị sẽ sửa biểu đồ chứ không giải thích thêm.",
    },
    quiz: [
      Q(
        "Sau khi vẽ xong, phép thử nào cho biết biểu đồ có hiệu quả?",
        [
          "Đồng nghiệp xem 30 giây và nói đúng điều cần thấy",
          "Bạn tự xem lại nhiều lần thấy rất rõ",
          "Công cụ vẽ không báo lỗi nào khi bạn bấm lưu hoặc xuất ra",
          "Biểu đồ dùng đúng bảng màu công ty và có đủ chú thích",
        ],
        "Chỉ người xem mới cho bạn biết biểu đồ có truyền đạt được không. Tự xem lại thì bạn đã biết đáp án nên khó thấy chỗ rối, công cụ không báo lỗi không liên quan đến độ dễ hiểu, và đúng bảng màu là hình thức.",
      ),
      Q(
        "Đồng nghiệp xem xong nói: chắc là doanh thu giảm? Nhưng bạn định nói doanh thu tăng. Bạn làm gì?",
        [
          "Sửa biểu đồ hoặc tiêu đề cho người xem hiểu đúng",
          "Giải thích lại rằng họ đã hiểu nhầm vì xem quá nhanh vội",
          "Bỏ qua vì một người không đại diện",
          "Gửi nguyên bản cho sếp nhưng thêm một đoạn giải thích dài",
        ],
        "Nếu người xem hiểu sai, lỗi nằm ở biểu đồ chứ không ở người xem; sửa là cách rẻ nhất. Giải thích thêm hay đoạn dài chỉ che vấn đề, còn bỏ qua một phản ứng là bỏ qua phép thử duy nhất bạn có.",
      ),
      Q(
        "Dự án này nên dùng số liệu nào?",
        [
          "Số thật ở chỗ bạn làm, ít thôi, chưa cần nhiều",
          "Số mẫu trên mạng cho đẹp mắt hơn nữa",
          "Số tự bịa cho giống thật, thay số thật sau khi vẽ xong",
          "Toàn bộ số liệu công ty, để thử được hết các trường hợp",
        ],
        "Số thật mới cho thấy bạn có ích trong việc thật, và vài cột là đủ để thử. Số mẫu hay số bịa không có người xem thật quan tâm, còn dùng toàn bộ số liệu công ty thì quá nhiều và có thể vượt quyền truy cập của bạn.",
      ),
      Q(
        "Bảng có thông tin nhân viên (tên, lương). Khi nhờ AI gợi ý biểu đồ thì làm gì?",
        [
          "Chỉ đưa số đã gộp, không đưa tên và lương từng người",
          "Dán cả bảng vào cho AI vì nó cần đủ dữ liệu mới gợi ý đúng",
          "Dán cả bảng, chỉ xoá cột tên",
          "Dán vào bản AI miễn phí dùng tài khoản cá nhân cho nhanh",
        ],
        "AI gợi ý biểu đồ chỉ cần mô tả hoặc số đã gộp, không cần tên và lương từng người. Lương từng dòng vẫn có thể nhận ra người, và dán vào công cụ cá nhân là đưa dữ liệu ra ngoài công ty; nếu cần, hỏi bộ phận IT hoặc nhân sự.",
      ),
      Q(
        "Một biểu đồ dự án nhỏ hoàn chỉnh gồm những phần nào?",
        [
          "Câu hỏi, biểu đồ đúng loại, tiêu đề kết luận",
          "Biểu đồ, bảng số gốc và đoạn văn dài",
          "Biểu đồ, logo công ty, ngày tháng và tên người làm ra nó",
          "Hai biểu đồ cùng số liệu và để người xem tự chọn cái họ thích",
        ],
        "Một biểu đồ hoàn chỉnh có câu hỏi rõ, loại đúng và tiêu đề nói kết luận. Đoạn văn dài, logo, ngày tháng hay hai biểu đồ cho người xem chọn đều là thứ thêm vào, không làm câu trả lời rõ hơn.",
      ),
    ],
    keyTakeaways: [
      "Một dự án nhỏ: một câu hỏi, vài số thật, một biểu đồ, một tiêu đề kết luận.",
      "Phép thử: đồng nghiệp xem 30 giây rồi nói lại điều họ hiểu.",
      "Nếu họ hiểu sai, sửa biểu đồ hoặc tiêu đề, không giải thích thêm.",
      "Đưa cho AI số đã gộp, không đưa dữ liệu cá nhân của từng người.",
    ],
    practicePrompt: {
      question:
        "Đồng nghiệp xem biểu đồ 30 giây và nói được điều bạn định truyền đạt. Bước tiếp theo hợp lý là gì?",
      options: [
        "Gửi cho người nhận và hỏi lại họ hiểu gì sau một ngày",
        "Vẽ thêm hai biểu đồ phụ cho chắc chắn dù chưa có ai hỏi tới",
        "Đổi toàn bộ biểu đồ sang kiểu khác để xem có hay hơn",
        "Nhờ AI chấm điểm và chỉ gửi nếu được điểm cao hơn 8",
      ],
      correct: 0,
      explanation:
        "Phép thử đã đạt nên có thể gửi đi, và việc hỏi lại người nhận sau một ngày cho bạn thêm bằng chứng. Thêm biểu đồ phụ hay đổi kiểu không có lý do khi người xem đã hiểu, và điểm của AI không phản ánh người xem thật.",
    },
    summary: {
      keyIdea: "Làm thật, thử với người thật, sửa theo điều họ hiểu.",
      formula: "Câu hỏi → vài số → đúng loại → tiêu đề kết luận → 30 giây với đồng nghiệp.",
      commonMistake: "Tự thấy biểu đồ rõ vì mình đã biết đáp án.",
      action: "Làm dự án nhỏ hôm nay và ghi lại điều đồng nghiệp hiểu khác với điều bạn định nói.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một bảng số thật ở chỗ bạn làm, không chứa dữ liệu cá nhân từng người. Viết câu hỏi người xem cần trả lời, chọn 2-4 cột, vẽ một biểu đồ đúng loại và đặt tiêu đề là một câu kết luận. Cho một đồng nghiệp xem 30 giây rồi che đi, hỏi: bạn thấy điều gì? Ghi lại câu trả lời của họ.",
      secondary: "Ngày mai viết hai dòng: điều họ hiểu có khớp điều bạn định nói không, và bạn đã sửa gì.",
    },
    sections: [
      {
        type: "lead",
        text: "Bốn bài đầu cho bạn bốn công cụ: câu hỏi, loại biểu đồ, bớt số và tiêu đề kết luận. Bài này ghép lại thành một dự án nhỏ, làm bằng số thật của bạn và thử với một người thật.",
      },
      {
        type: "feynman",
        title: "Dự án nhỏ đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung bạn nấu món mới cho gia đình. Đọc công thức chưa đủ: bạn nấu, mang ra bàn và nhìn họ ăn miếng đầu tiên. Nét mặt của họ cho bạn biết món có ổn không.",
        columns: ["Bước", "Nấu món mới", "Dự án biểu đồ"],
        rows: [
          ["Chuẩn bị", "Chọn nguyên liệu thật", "Chọn số thật ở chỗ làm"],
          ["Làm", "Nấu theo công thức", "Vẽ theo bốn bài đã học"],
          ["Thử", "Nhìn người nhà ăn miếng đầu", "Đồng nghiệp xem 30 giây"],
          ["Sửa", "Nêm lại theo nét mặt", "Sửa biểu đồ theo điều họ hiểu"],
        ],
        oneLiner: "Biểu đồ tốt được kiểm bằng người xem, như món ăn được kiểm bằng người ăn.",
      },
      { type: "heading", text: "Năm bước cho dự án" },
      {
        type: "paragraph",
        text: "Dự án chỉ cần khoảng 20 phút. Bạn không cần số lớn hay biểu đồ phức tạp: vài cột số thật, một câu hỏi rõ và một người chịu xem 30 giây. Điều bạn học được ở đây sẽ dùng lại cho mọi báo cáo sau này.",
      },
      {
        type: "list",
        items: [
          "Chọn một bảng thật, nhỏ, không có dữ liệu cá nhân từng người.",
          "Viết câu hỏi một dòng mà người nhận cần được trả lời.",
          "Chọn 2-4 cột, vẽ biểu đồ đúng loại và làm nổi điều chính.",
          "Đặt tiêu đề là một câu kết luận, đúng với số liệu.",
          "Cho đồng nghiệp xem 30 giây, che đi, hỏi họ hiểu gì, và sửa.",
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Tự kiểm một mình",
          text: "Bạn xem lại và thấy rõ, vì bạn đã biết đáp án. Biểu đồ gửi đi, người nhận hiểu khác đi và bạn chỉ biết khi quá muộn.",
        },
        right: {
          label: "Kiểm với người xem",
          text: "Đồng nghiệp nói điều họ hiểu. Nếu khác điều bạn định nói, bạn sửa ngay khi còn rẻ, trước khi báo cáo đến tay sếp.",
        },
      },
      {
        type: "flow",
        title: "Dự án nhỏ từ bảng đến phép thử 30 giây",
        steps: [
          { label: "Chọn bảng và câu hỏi", detail: "Lấy một bảng nhỏ, thật, không có dữ liệu cá nhân. Viết câu hỏi một dòng có đối tượng, thứ đem so và khoảng thời gian." },
          { label: "Chọn số và loại biểu đồ", detail: "Giữ 2-4 cột trả lời câu hỏi. So nhóm thì cột, theo thời gian thì đường, phần của tổng ít lát thì tròn." },
          { label: "Đặt tiêu đề kết luận", detail: "Viết một câu nói điều cần thấy, rồi đối chiếu từng con số và từ như mạnh, liên tục với bảng gốc." },
          { label: "Thử 30 giây rồi sửa", detail: "Cho một đồng nghiệp xem 30 giây, che đi và hỏi họ thấy gì. Khác điều bạn định nói thì sửa biểu đồ hoặc tiêu đề." },
        ],
      },
      {
        type: "callout",
        label: "Dữ liệu trước khi nhờ AI",
        text: "Nếu nhờ AI gợi ý, chỉ đưa số đã gộp hoặc mô tả bảng, không đưa tên, lương hay thông tin từng người. Công cụ công ty chưa duyệt thì không đưa số liệu nội bộ chưa công bố; không chắc thì hỏi bộ phận IT hoặc người phụ trách dữ liệu.",
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI góp ý cho dự án biểu đồ của bạn",
        task: "Bạn có số ngày nghỉ phép đã dùng của 6 phòng ban (số đã gộp). Muốn biết phòng nào dùng ít phép nhất để nhắc sắp xếp nghỉ. Lắp prompt nhờ AI góp ý.",
        parts: [
          {
            id: "data",
            label: "Dữ liệu đưa vào",
            options: [
              { text: "Dán bảng chi tiết từng nhân viên gồm cả họ tên và ngày nghỉ.", feedback: "Đưa dữ liệu cá nhân không cần thiết; AI chỉ cần số đã gộp theo phòng." },
              { text: "Chỉ 6 số: tổng ngày phép đã dùng của mỗi phòng ban.", good: true, feedback: "Đủ để gợi ý biểu đồ và không lộ thông tin từng người." },
            ],
          },
          {
            id: "question",
            label: "Câu hỏi và tiêu chí",
            options: [
              { text: "Xem giúp tôi biểu đồ này có tốt không.", feedback: "Không nói tốt để làm gì; AI chỉ khen chung chung." },
              { text: "Câu hỏi: phòng nào dùng ít phép nhất? Góp ý loại biểu đồ và tiêu đề kết luận, không thêm số ngoài 6 số tôi đưa.", good: true, feedback: "Có câu hỏi, có việc cụ thể và có ràng buộc chặn bịa số." },
            ],
          },
          {
            id: "ask",
            label: "Cách kiểm",
            options: [
              { text: "Cho tôi 2 câu hỏi để hỏi đồng nghiệp sau khi họ xem 30 giây.", good: true, feedback: "Giúp bạn làm phép thử người xem thật thay vì tin vào AI." },
              { text: "Tự chấm điểm biểu đồ trên thang mười rồi tôi sẽ gửi nếu điểm cao.", feedback: "AI không phải người xem thật, điểm số là ý kiến chứ không phải bằng chứng." },
            ],
          },
        ],
        responses: [
          {
            requires: ["data", "question", "ask"],
            text: "Gợi ý: cột ngang xếp từ ít đến nhiều ngày phép, làm nổi phòng thấp nhất. Tiêu đề: Phòng ban nào dùng ít phép nhất cần được nhắc sắp xếp nghỉ. Câu hỏi thử: 1) Bạn thấy phòng nào đứng đầu? 2) Bạn định làm gì tiếp? Hãy đối chiếu tiêu đề với 6 số của bạn.",
          },
          {
            requires: ["data"],
            text: "Biểu đồ của bạn trông ổn. Nên có tiêu đề rõ ràng và màu sắc hài hoà.\n\n(Có số đúng nhưng câu hỏi chưa rõ nên lời góp ý chung chung, chưa dùng được.)",
          },
          {
            text: "Dựa trên dữ liệu, phòng Kinh doanh dùng ít phép nhất, ít hơn trung bình ngành 30%...\n\n(Không có dữ liệu thật, AI tự bịa tên phòng và con số trung bình ngành.)",
          },
        ],
      },
      {
        type: "scenario",
        title: "Phép thử 30 giây với đồng nghiệp",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn vừa vẽ xong biểu đồ ngày phép 6 phòng ban, tiêu đề: Phòng Kế toán dùng ít phép nhất. Còn 20 phút trước hạn gửi sếp. Đồng nghiệp đang ngồi bên cạnh.",
            choices: [
              { label: "Gửi ngay cho sếp, vì bạn thấy biểu đồ đã rất rõ", next: "bad_send" },
              { label: "Đưa cho đồng nghiệp xem 30 giây rồi che đi và hỏi họ thấy gì", next: "s2" },
            ],
          },
          bad_send: {
            text: "Sếp đọc tiêu đề và hiểu là Kế toán đang nghỉ quá ít nên sẽ bị ép nghỉ, trong khi bạn chỉ định nhắc sắp xếp. Sếp nhắn hỏi lại ngay, và bạn phải giải thích.",
            ending: "bad",
          },
          s2: {
            text: "Đồng nghiệp nói: phòng Kế toán dùng ít phép nhất, nhưng mình không biết ít hơn bao nhiêu. Bạn nhận ra biểu đồ thiếu số cụ thể ở đầu cột.",
            choices: [
              { label: "Giải thích cho đồng nghiệp rằng ít hơn khoảng 4 ngày, rồi gửi nguyên bản", next: "bad_explain" },
              { label: "Ghi số ngày ngay đầu mỗi cột, rồi cho một người khác thử lại", next: "good" },
            ],
          },
          bad_explain: {
            text: "Bạn giải thích bằng miệng nên đồng nghiệp hiểu, nhưng sếp đọc một mình không có bạn bên cạnh. Sếp lại hỏi đúng câu ấy, và bạn mất thêm thời gian.",
            ending: "bad",
          },
          good: {
            text: "Người thứ hai xem 30 giây và nói đúng: Kế toán dùng ít nhất, 4 ngày so với 9 ngày của phòng cao nhất. Bạn gửi sếp, và sếp không phải hỏi lại câu nào.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Làm một biểu đồ thật, cho người thật xem 30 giây, sửa theo điều họ hiểu.",
          "Bài sau: biểu đồ có thể đánh lừa, bắt đầu từ trục không bắt đầu ở 0.",
        ],
      },
    ],
  },
];
