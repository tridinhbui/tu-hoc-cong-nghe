import type { Lesson } from "../lesson-types";

// Chặng 42, bài 1-5. Giáo trình: scripts/curriculum/stage-42.json.
// Cố ý không nêu nút bấm, tên gói hay giá của từng công cụ: bài dạy cách giao việc
// và cách chấm kết quả, những thứ không đổi khi giao diện đổi.

// Câu hỏi quiz: phương án đầu tiên là đáp án đúng (vị trí được cân lại lúc build).
const Q = (question: string, options: string[], explanation: string) => ({
  question,
  options,
  correct: 0,
  explanation,
});

export const S42_A_LESSONS: Lesson[] = [
  // ───────────────────────── Bài 1 ─────────────────────────
  {
    id: 2240,
    slug: "thu-mot-viec-tren-hai-cong-cu",
    title: "Chặng 42, Bài 1: Thử một việc thật trên hai công cụ AI",
    subtitle: "Muốn biết giày nào vừa chân, đi thử cả hai chiếc trong cùng một buổi.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "⚖️",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Đọc bài so sánh công cụ trên mạng chỉ cho bạn ý kiến của người khác, làm trên việc của họ. Việc của bạn có giọng văn, dữ kiện và người đọc riêng. Mười lăm phút thử cùng một việc trên hai công cụ cho bạn bằng chứng thật, và bằng chứng đó thuộc về bạn.",
    openingQuestion:
      "Bạn phân vân giữa hai công cụ AI để viết một email từ chối báo giá khéo léo. Cách thử nào cho bạn kết luận đáng tin nhất?",
    openingOptions: [
      "Dán đúng cùng một yêu cầu, cùng dữ kiện vào cả hai rồi đặt cạnh nhau",
      "Đọc ba bài đánh giá trên mạng rồi chọn công cụ được khen nhiều hơn",
      "Hỏi mỗi công cụ một việc khác nhau để xem cái nào làm nhiều việc hơn",
      "Chọn công cụ có giao diện đẹp hơn vì bạn sẽ nhìn nó mỗi ngày",
    ],
    correctOption: 0,
    explanation:
      "So sánh chỉ có nghĩa khi hai bên nhận cùng một đầu vào: nếu mỗi bên một yêu cầu thì khác biệt trong kết quả có thể do câu hỏi chứ không do công cụ. Bài đánh giá trên mạng nói về việc của người khác, nên chưa chắc hợp với email của bạn. Giao diện đẹp là chuyện thứ yếu so với chất lượng bản nháp bạn nhận về. Cùng yêu cầu, cùng dữ kiện, đặt cạnh nhau: đó mới là một phép thử.",
    diagram: [
      { label: "Chọn một việc thật của bạn", arrow: true },
      { label: "Viết yêu cầu một lần, dán y hệt vào hai công cụ", arrow: true },
      { label: "Đặt hai câu trả lời cạnh nhau", arrow: true },
      { label: "Ghi lại: bản nào bạn dùng được nhiều hơn và vì sao" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: nhân viên kinh doanh viết email từ chối báo giá",
      description:
        "Chị Hà cần từ chối giảm giá cho một khách quen mà không làm mất khách. Chị viết yêu cầu một lần, có tên khách, mức giá và điều chị có thể nhường, rồi dán y hệt vào hai công cụ. Bản thứ nhất lịch sự nhưng hứa thêm quà tặng chị chưa từng đề nghị; bản thứ hai ngắn hơn và đúng dữ kiện. Chị chọn bản thứ hai để sửa, và ghi lại lý do để lần sau khỏi phải thử lại từ đầu.",
    },
    quiz: [
      Q(
        "Để so sánh công bằng hai công cụ, điều gì nên giống hệt nhau ở cả hai lần thử?",
        [
          "Yêu cầu và dữ kiện bạn đưa vào",
          "Mỗi công cụ một câu lệnh riêng đã chỉnh cho hợp với nó",
          "Chỉ cùng chủ đề chung, còn câu chữ mỗi bên tự viết lại",
          "Số lần bấm nút gửi, dù nội dung yêu cầu khác nhau",
        ],
        "Nếu yêu cầu khác nhau, mọi khác biệt trong kết quả đều có thể do câu hỏi chứ không do công cụ, nên phép thử mất giá trị. Chỉnh riêng câu lệnh cho từng bên hay chỉ giữ chung chủ đề đều làm lẫn nguyên nhân. Số lần bấm gửi không nói gì về chất lượng.",
      ),
      Q(
        "Bạn nên dùng loại việc nào để thử hai công cụ AI lần đầu?",
        [
          "Một việc bạn từng làm tay nên đã biết bản tốt trông ra sao",
          "Một việc hoàn toàn mới lạ, để thấy công cụ nào sáng tạo hơn",
          "Một câu hỏi kiến thức chung mà bạn cũng chưa biết đáp án",
          "Bất kỳ việc gì miễn là nhờ AI làm dài nhất có thể",
        ],
        "Khi bạn đã biết bản tốt trông ra sao, bạn chấm được ngay. Việc lạ hoặc câu hỏi bạn cũng chưa biết đáp án khiến bạn không phân biệt được câu tự tin với câu đúng. Độ dài không phải thước đo chất lượng, và bản dài thường chỉ tốn thời gian đọc hơn.",
      ),
      Q(
        "Hai công cụ trả lời khác nhau về giọng văn, cả hai đều đúng dữ kiện. Bạn nên làm gì?",
        [
          "Chọn bản gần giọng bạn nhất rồi sửa tay",
          "Kết luận công cụ có bản ngắn hơn luôn tốt hơn",
          "Chạy thêm mười lần cho tới khi hai bản giống hệt nhau",
          "Bỏ cả hai vì chúng không đưa ra cùng một câu chữ",
        ],
        "Khác giọng nhưng đúng dữ kiện là kết quả bình thường; việc của bạn là chọn bản ít phải sửa nhất. Ngắn hay dài chưa nói lên độ hợp với người đọc. Hai công cụ khác nhau sẽ không bao giờ ra câu chữ giống hệt, và đòi hỏi điều đó chỉ tốn thời gian. Bỏ cả hai là bỏ bản nháp đã dùng được.",
      ),
      Q(
        "Sau khi thử, điều nào đáng ghi lại nhất cho lần chọn công cụ sau?",
        [
          "Công cụ nào cho bản nháp ít phải sửa nhất với loại việc này, và vì sao",
          "Tên công cụ đang được nhắc tới nhiều nhất trong tuần này",
          "Khung giờ trong ngày mà công cụ trả lời nhanh nhất cho bạn",
          "Tổng số chữ mà mỗi công cụ đã viết ra trong lần thử đó, đếm bằng tay từng bản",
        ],
        "Ghi loại việc, công cụ ít phải sửa nhất và lý do biến một lần thử thành bằng chứng dùng lại được. Mức độ được nhắc nhiều là dư luận, không phải kết quả trên việc của bạn. Tốc độ theo giờ hay số chữ đều không nói bản nháp có dùng được hay không.",
      ),
      Q(
        "Một công cụ đưa email có câu 'giảm thêm 10%' mà bạn chưa hề đề nghị. Điều đó cho thấy gì?",
        [
          "Nó thêm chi tiết không có trong dữ kiện, cần bị trừ điểm",
          "Nó thông minh hơn vì tự nghĩ ra một phương án bù cho khách",
          "Yêu cầu của bạn chưa đủ dài nên lần sau hãy viết ngắn lại",
          "Đây là lỗi hiển thị nên có thể bỏ qua và dùng nguyên bản",
        ],
        "Chi tiết không có trong dữ kiện là dấu hiệu công cụ tự bịa để câu văn nghe trọn vẹn, và nó có thể khiến bạn hứa điều công ty chưa duyệt. Đó không phải sự thông minh, cũng không phải lỗi hiển thị. Yêu cầu càng đủ dữ kiện càng ít chỗ cho nó tự thêm, chứ viết ngắn lại không giúp gì.",
      ),
    ],
    keyTakeaways: [
      "So sánh công cụ bằng chính việc của bạn, không bằng bài đánh giá của người khác.",
      "Cùng một yêu cầu, cùng dữ kiện, dán y hệt vào cả hai công cụ.",
      "Chọn việc bạn đã biết bản tốt trông ra sao để chấm được ngay.",
      "Chi tiết lạ, không có trong dữ kiện của bạn, là dấu hiệu bịa.",
      "Ghi lại loại việc, công cụ chọn và lý do, để khỏi thử lại từ đầu.",
    ],
    practicePrompt: {
      question:
        "Anh Sơn muốn thử hai công cụ AI cho việc viết email nhắc khách trả nợ. Cách chuẩn bị nào đúng?",
      options: [
        "Viết yêu cầu một lần với tên khách, số tiền, hạn trả rồi dán y hệt vào cả hai",
        "Cho công cụ A yêu cầu thật kỹ, công cụ B chỉ một dòng, xem cái nào giỏi hơn theo ý bạn",
        "Nhờ công cụ A viết rồi dán bản đó cho công cụ B chấm điểm thay bạn",
        "Thử công cụ A hôm nay, đợi cuối tuần thử B với một khách khác",
      ],
      correct: 0,
      explanation:
        "Cùng đầu vào là điều kiện để so sánh. Cho mỗi bên một mức chi tiết khác nhau thì thắng thua do câu hỏi. Nhờ B chấm bản của A là để một công cụ tự phán xét mà bạn chưa hiểu tiêu chuẩn của nó. Thử vào hai thời điểm với hai khách khác nhau làm lẫn lộn công cụ với đề bài.",
    },
    summary: {
      keyIdea: "Chọn công cụ bằng một phép thử nhỏ trên việc thật của mình.",
      formula: "Một yêu cầu + cùng dữ kiện + hai công cụ + đặt cạnh nhau = bằng chứng.",
      commonMistake: "Đổi yêu cầu giữa hai lần thử rồi kết luận công cụ nào giỏi hơn.",
      action: "Chọn một email tuần này, thử trên hai công cụ và ghi ba dòng kết luận.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một email bạn phải viết trong tuần này. Viết yêu cầu một lần: người nhận, việc cần nói, hai dữ kiện thật, độ dài. Dán y hệt vào hai công cụ AI. Đặt hai bản cạnh nhau và ghi ba dòng: bản nào ít phải sửa hơn, chỗ nào công cụ tự thêm chi tiết bạn không đưa, bạn sẽ chọn công cụ nào cho loại email này.",
      secondary: "Lưu ba dòng ghi chú đó lại, ngày mai bạn sẽ được hỏi kết quả.",
    },
    sections: [
      {
        type: "lead",
        text: "Sáng thứ Hai, bạn có một email khó: từ chối giảm giá cho khách quen mà không làm mất khách. Bạn đang có hai công cụ AI trong tay và không biết dùng cái nào. Bài này cho bạn cách trả lời trong mười lăm phút, bằng chính việc của bạn.",
      },
      {
        type: "feynman",
        title: "So sánh công cụ AI đơn giản hơn bạn nghĩ",
        intro:
          "Bạn mua giày mà không đọc bài đánh giá nào cả: bạn xỏ cả hai chiếc vào chân rồi đi vài bước trong tiệm. Thử công cụ AI cũng vậy: đưa cùng một việc cho cả hai và xem cái nào vừa tay.",
        columns: ["Thành phần", "Thử giày trong tiệm", "Thử công cụ AI"],
        rows: [
          ["Đề bài", "Cùng đôi chân của bạn", "Cùng một yêu cầu và dữ kiện của bạn"],
          ["Cách thử", "Đi thử cả hai chiếc trong một buổi", "Dán y hệt vào cả hai, đặt cạnh nhau"],
          ["Điều đáng để ý", "Chỗ nào chật, chỗ nào lỏng", "Chỗ nào phải sửa, chỗ nào tự bịa thêm"],
          ["Kết luận", "Chiếc nào bạn không muốn cởi ra", "Bản nào bạn ít phải sửa nhất"],
        ],
        oneLiner: "Đưa cùng một việc thật cho cả hai và chọn bản bạn ít phải sửa nhất.",
      },
      { type: "heading", text: "Vì sao không nên tin bảng xếp hạng" },
      {
        type: "paragraph",
        text: "Bài xếp hạng công cụ AI luôn viết cho một người đọc chung chung, làm trên việc chung chung. Email của bạn có giọng văn của công ty bạn, khách của bạn và dữ kiện của bạn. Một công cụ đứng đầu bảng chưa chắc viết được email từ chối báo giá theo cách bạn cần. Hai phần này bài xếp hạng không cho bạn biết được: chỗ nào bạn phải sửa, và chỗ nào công cụ tự thêm điều bạn không nói.",
      },
      {
        type: "flow",
        title: "Một lần thử công bằng, từng bước",
        steps: [
          {
            label: "Chọn việc",
            detail: "Chọn một việc thật đã làm tay ít nhất một lần, để bạn biết bản tốt trông ra sao. Ví dụ: email từ chối báo giá.",
          },
          {
            label: "Viết yêu cầu một lần",
            detail: "Ghi người nhận, việc cần nói, hai dữ kiện thật và độ dài mong muốn. Đây là bản duy nhất, không chỉnh riêng cho công cụ nào.",
          },
          {
            label: "Dán y hệt vào hai công cụ",
            detail: "Mở mỗi công cụ ở một cuộc trò chuyện mới, dán nguyên văn. Không sửa chữ giữa hai lần dán.",
          },
          {
            label: "Đặt hai bản cạnh nhau",
            detail: "Đọc từng câu, đánh dấu chỗ sai dữ kiện, chỗ tự thêm chi tiết lạ, chỗ giọng không hợp.",
          },
          {
            label: "Ghi kết luận ba dòng",
            detail: "Bản nào ít phải sửa hơn, chỗ nào bị bịa thêm, và bạn chọn công cụ nào cho loại việc này.",
          },
        ],
      },
      { type: "heading", text: "Ba thứ cần nhìn khi đặt cạnh nhau" },
      {
        type: "list",
        items: [
          "Đúng dữ kiện: mọi tên, con số, ngày trong bản trả lời có nằm trong yêu cầu của bạn không?",
          "Đúng giọng: người nhận đọc xong có thấy đây là bạn viết không?",
          "Ít phải sửa: bạn mất bao nhiêu phút để biến bản nháp thành bản gửi được?",
          "Thứ không cần nhìn: độ dài, tốc độ và độ bay bổng của câu chữ.",
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Phép thử công bằng",
          text: "Cùng yêu cầu, cùng dữ kiện, cuộc trò chuyện mới ở mỗi bên. Kết quả khác nhau vì công cụ khác nhau, nên kết luận của bạn có nghĩa.",
        },
        right: {
          label: "Phép thử lệch",
          text: "Mỗi bên một câu hỏi, hoặc bên này đã có lịch sử trò chuyện còn bên kia thì không. Khác biệt có thể do câu hỏi, nên kết luận không đáng tin.",
        },
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Lắp yêu cầu để dán vào cả hai công cụ",
        task: "Bạn cần email từ chối giảm giá 15% cho khách Thành Đạt, nhưng đồng ý giao miễn phí một lần. Lắp một yêu cầu đủ tốt để dán y hệt vào hai công cụ.",
        parts: [
          {
            id: "context",
            label: "Dữ kiện",
            options: [
              {
                text: "Viết email từ chối giảm giá cho khách.",
                feedback: "Thiếu tên khách, mức giảm và điều bạn có thể nhường: mỗi công cụ sẽ tự bịa một phương án khác nhau và bạn không so sánh được.",
              },
              {
                text: "Khách Thành Đạt xin giảm 15% cho đơn 200 triệu. Chúng tôi không giảm nhưng giao miễn phí một lần.",
                good: true,
                feedback: "Đủ tên, mức xin và điều nhường được: hai công cụ có cùng dữ kiện để so.",
              },
            ],
          },
          {
            id: "tone",
            label: "Giọng và người đọc",
            options: [
              {
                text: "Viết thật khéo léo.",
                feedback: "'Khéo léo' mỗi công cụ hiểu một kiểu, nên khác biệt giữa hai bản khó nói do đâu.",
              },
              {
                text: "Người đọc là giám đốc mua hàng, quen làm việc lâu năm. Giọng lịch sự, thẳng, không xin lỗi quá mức.",
                good: true,
                feedback: "Giọng và người đọc rõ: bạn chấm được bản nào đúng giọng.",
              },
            ],
          },
          {
            id: "format",
            label: "Độ dài và ràng buộc",
            options: [
              {
                text: "Viết dài đủ ý.",
                feedback: "Hai công cụ sẽ hiểu 'đủ ý' khác nhau; bản dài hơn dễ chứa thêm chi tiết bịa.",
              },
              {
                text: "Dưới 120 chữ. Không thêm ưu đãi hay con số nào ngoài những gì tôi đã nêu.",
                good: true,
                feedback: "Giới hạn độ dài và cấm thêm chi tiết: chi tiết bịa sẽ lộ ra rất rõ.",
              },
            ],
          },
        ],
        responses: [
          {
            requires: ["context", "tone", "format"],
            text: "Kính gửi anh Đạt,\n\nCảm ơn anh đã tin tưởng đơn 200 triệu. Chúng tôi chưa thể giảm 15%, nhưng sẽ giao miễn phí lần này để hỗ trợ tiến độ của anh.\n\nMong anh xác nhận để chúng tôi lên lịch giao.\n\nTrân trọng.\n\n(Đúng dữ kiện, đúng giọng, không thêm ưu đãi lạ: bản hai công cụ sẽ so được với nhau.)",
          },
          {
            requires: ["context"],
            text: "Kính gửi Quý khách Thành Đạt,\n\nChúng tôi rất tiếc không thể giảm 15% cho đơn hàng của Quý khách, tuy nhiên chúng tôi rất mong tiếp tục đồng hành cùng Quý khách trong thời gian tới với nhiều chương trình hấp dẫn...\n\n(Đủ dữ kiện nhưng giọng dài dòng, chưa nêu rõ điều công ty nhường.)",
          },
          {
            text: "Kính gửi Quý khách,\n\nCảm ơn bạn đã quan tâm. Chúng tôi xin gửi tặng voucher 5 triệu đồng và giảm 8% cho đơn tiếp theo...\n\n(Yêu cầu quá thiếu nên công cụ tự bịa voucher và mức giảm chưa hề tồn tại.)",
          },
        ],
      },
      {
        type: "callout",
        label: "Chuyện thường gặp",
        text: "Hai công cụ cho hai bản khác nhau, cả hai đều nghe hợp lý. Đừng chọn bản nghe trôi chảy hơn: hãy chọn bản đúng dữ kiện và ít phải sửa hơn. Nghe trôi chảy là điểm mạnh chung của mọi công cụ, nên nó không phân biệt được ai hơn ai.",
      },
      {
        type: "scenario",
        title: "Anh Sơn thử hai công cụ cho email nhắc nợ",
        start: "s1",
        nodes: {
          s1: {
            text: "Anh Sơn (kế toán công nợ) muốn chọn công cụ AI cho email nhắc khách trả nợ. Anh có hai công cụ và 15 phút.",
            choices: [
              { label: "Tra bảng xếp hạng trên mạng rồi chọn công cụ đứng đầu", next: "bad_rank" },
              { label: "Viết một yêu cầu với dữ kiện một khách thật và dán y hệt vào cả hai", next: "s2" },
            ],
          },
          bad_rank: {
            text: "Công cụ đứng đầu viết rất trôi, nhưng giọng quá mềm cho khách đã trễ hạn hai tháng. Anh Sơn nhận ra sau khi đã gửi ba email và khách vẫn chưa trả.",
            ending: "bad",
          },
          s2: {
            text: "Hai bản trả về. Bản A đúng số tiền 48 triệu và hạn 30/10. Bản B viết hay hơn nhưng có câu 'phạt trễ hạn 2%' mà anh Sơn không hề đưa.",
            choices: [
              { label: "Chọn bản B vì viết hay hơn, giữ nguyên câu phạt", next: "bad_invent" },
              { label: "Chọn bản A, ghi lại lý do: B tự thêm điều khoản phạt", next: "good" },
            ],
          },
          bad_invent: {
            text: "Khách gọi lại hỏi 'phạt 2% theo hợp đồng nào'. Anh Sơn không có căn cứ nào và phải xin lỗi rút lại email.",
            ending: "bad",
          },
          good: {
            text: "Anh Sơn gửi bản A sau khi sửa vài chữ. Ba dòng ghi chú của anh giúp lần sau anh không phải thử lại: với email nhắc nợ, công cụ A ít bịa hơn.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Cùng một việc, cùng một yêu cầu, hai công cụ, đặt cạnh nhau.",
          "Bài sau: chấm điểm hai câu trả lời bằng bảng tiêu chí bốn dòng.",
        ],
      },
    ],
  },

  // ───────────────────────── Bài 2 ─────────────────────────
  {
    id: 2241,
    slug: "cham-diem-cau-tra-loi-bang-bang-tieu-chi",
    title: "Chặng 42, Bài 2: Chấm điểm hai câu trả lời bằng bảng tiêu chí",
    subtitle: "Thầy chấm thi có thang điểm; bạn chấm câu trả lời của AI cũng nên có bảng.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "📋",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Khi sếp hỏi vì sao chọn công cụ này, 'em thấy nó hay hơn' không phải câu trả lời. Bảng bốn tiêu chí biến cảm giác thành lý do bạn nói được trong ba mươi giây, và dùng lại được cho mọi lần so sánh sau.",
    openingQuestion:
      "Bạn có hai câu trả lời AI cho cùng một email. Sếp hỏi: 'Vì sao em chọn bản này?' Câu trả lời nào thuyết phục nhất?",
    openingOptions: [
      "Bản này đúng dữ kiện, đúng giọng, ít phải sửa nhất, em đã chấm từng mục",
      "Bản này em đọc thấy hay hơn và nghe chuyên nghiệp hơn bản kia",
      "Bản này dài hơn nên chắc đầy đủ hơn so với bản còn lại",
      "Công cụ này đang được nhiều người dùng nên em tin hơn",
    ],
    correctOption: 0,
    explanation:
      "Lý do chấm theo tiêu chí kiểm chứng được: sếp có thể tự mở hai bản và thấy đúng như bạn nói. 'Hay hơn' và 'nghe chuyên nghiệp' là cảm giác, người khác không kiểm được. Bản dài hơn chưa chắc đủ hơn, thường chỉ lặp nhiều hơn. Được nhiều người dùng nói về độ phổ biến chứ không nói bản này hợp với email của bạn.",
    diagram: [
      { label: "Hai câu trả lời cho cùng một yêu cầu", arrow: true },
      { label: "Bảng bốn tiêu chí: đúng, đủ, giọng, ít sửa", arrow: true },
      { label: "Chấm từng mục, ghi lý do một dòng", arrow: true },
      { label: "Chọn bản điểm cao và nói được vì sao" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: trưởng nhóm CSKH chọn công cụ viết thư trả lời khiếu nại",
      description:
        "Anh Bình cho hai công cụ cùng viết một thư trả lời khiếu nại giao nhầm hàng. Thay vì chọn theo cảm giác, anh lập bảng bốn cột: đúng dữ kiện, đủ ý, đúng giọng, ít phải sửa. Bản thứ nhất được điểm cao ở giọng nhưng sai mã đơn; bản thứ hai sạch dữ kiện. Anh chọn bản thứ hai và đưa bảng cho cả nhóm dùng chung.",
    },
    quiz: [
      Q(
        "Bảng tiêu chí đơn giản để chấm một câu trả lời AI nên có những mục nào?",
        [
          "Đúng dữ kiện, đủ ý, đúng giọng, ít phải sửa",
          "Độ dài, độ bay bổng của câu chữ, số từ khó, tốc độ trả lời",
          "Có emoji, có gạch đầu dòng, có tiêu đề, có lời chào",
          "Độ giống với câu trả lời của công cụ kia, chấm theo từng câu",
        ],
        "Bốn mục đó đo đúng thứ người dùng cần: bản nháp có đúng, có đủ, hợp người đọc và tiết kiệm công sửa hay không. Độ dài, tốc độ hay số từ khó không cho biết bản có dùng được. Hình thức như emoji hay gạch đầu dòng chỉ là vẻ ngoài. Giống câu trả lời kia không phải thước đo chất lượng.",
      ),
      Q(
        "Bản A đúng dữ kiện nhưng khô khan; bản B hay nhưng sai một con số. Bạn nên nghiêng về đâu?",
        [
          "Bản A, vì giọng thì sửa được trong vài phút còn số sai dễ lọt",
          "Bản B, vì người đọc nhớ giọng văn lâu hơn là nhớ con số",
          "Bản B, nếu con số sai chỉ lệch nhỏ thì coi như đúng",
          "Chấm hoà, vì mỗi bản chỉ có một điểm yếu",
        ],
        "Sửa giọng là việc chữ, bạn nhìn là thấy. Con số sai thì nằm im trong bản nháp cho tới khi ai đó đối chiếu. Sai lệch nhỏ vẫn là sai, và không tiêu chí nào cho phép coi như đúng. Hai điểm yếu không nặng bằng nhau nên chấm hoà là bỏ qua khác biệt thật.",
      ),
      Q(
        "Vì sao nên ghi lý do một dòng bên cạnh mỗi điểm số?",
        [
          "Để người khác kiểm lại được và bạn nhớ vì sao chấm vậy",
          "Để bảng trông đầy đặn và có vẻ nhiều công sức hơn",
          "Vì công cụ AI đòi hỏi lý do thì mới ghi nhận điểm",
          "Để lần sau chép lại đúng câu chữ của bản được chọn",
        ],
        "Điểm không kèm lý do là một con số không ai kiểm được, kể cả chính bạn sau một tuần. Lý do một dòng cho sếp và đồng nghiệp thấy căn cứ. Đây là việc của bạn chứ không có công cụ nào đòi. Mục đích không phải chép lại câu chữ mà là giữ được lập luận.",
      ),
      Q(
        "Hai bản đều được 3 trên 4 điểm. Bước hợp lý tiếp theo là gì?",
        [
          "Xem bản nào cần ít thời gian sửa hơn để về đích",
          "Ghép tất cả câu của hai bản thành một bản dài hơn",
          "Chọn ngẫu nhiên bằng đồng xu vì hai bản đã ngang điểm",
          "Thêm một tiêu chí mới cho tới khi có bản thắng",
        ],
        "Thời gian sửa là thước đo cuối cùng: cùng điểm thì bản nào nhanh về đích hơn là bản đáng chọn. Ghép hai bản dễ ra một bản dài lủng củng, lẫn hai giọng. Chọn ngẫu nhiên bỏ qua thông tin bạn có. Thêm tiêu chí sau khi đã thấy kết quả là chỉnh thước cho hợp ý mình.",
      ),
      Q(
        "Khi nào nên chỉnh bảng tiêu chí của mình?",
        [
          "Trước khi chấm, theo loại việc, và giữ nguyên khi chấm hai bản",
          "Trong lúc chấm, mỗi lần gặp bản có điểm lạ thì thêm một mục mới",
          "Sau khi chấm, để bản bạn thích thắng cuộc rõ hơn",
          "Chỉ khi công cụ đổi phiên bản mới, còn không thì giữ mãi",
        ],
        "Bảng phải có trước khi nhìn kết quả để công bằng với cả hai bản; loại việc khác thì mục quan trọng cũng khác, như thư khiếu nại cần giọng nhiều hơn báo cáo số. Chỉnh trong lúc hay sau khi chấm là vẽ đích quanh mũi tên. Đổi phiên bản công cụ không phải lý do duy nhất để xem lại bảng.",
      ),
    ],
    keyTakeaways: [
      "Bốn tiêu chí: đúng dữ kiện, đủ ý, đúng giọng, ít phải sửa.",
      "Ghi lý do một dòng cạnh mỗi điểm để người khác kiểm lại được.",
      "Số sai nặng hơn giọng khô: giọng sửa nhanh, số sai dễ lọt.",
      "Lập bảng trước khi nhìn kết quả, không chỉnh giữa chừng.",
      "Ngang điểm thì chọn bản tốn ít thời gian sửa hơn.",
    ],
    practicePrompt: {
      question:
        "Chị Mai chấm hai bản báo cáo tuần do AI viết: bản A 4 điểm nhưng thiếu ý chốt cuối, bản B 3 điểm nhưng đủ ý. Chị nên nói gì với sếp?",
      options: [
        "Em chọn A: điểm cao hơn, ý chốt thì em bổ sung một câu",
        "Em chọn B vì đủ ý, điểm số chỉ là con số tham khảo, đỡ phải sửa",
        "Em chọn cả hai và để sếp tự chọn giữa hai bản",
        "Em chọn A vì nó dài hơn nên chắc kỹ hơn",
      ],
      correct: 0,
      explanation:
        "Bảng cho điểm cao hơn cho A, và chỗ thiếu là một câu dễ bổ sung, nên nói thẳng cả hai điều đó là câu trả lời có căn cứ. Coi điểm chỉ để tham khảo là bỏ bảng ngay khi nó không hợp ý. Đẩy quyết định sang sếp là né việc chính bạn được giao. Độ dài không nằm trong tiêu chí nào.",
    },
    summary: {
      keyIdea: "Một bảng bốn dòng biến cảm giác 'hay hơn' thành lý do nói được với sếp.",
      formula: "Đúng dữ kiện + đủ ý + đúng giọng + ít phải sửa, chấm từng mục, ghi lý do.",
      commonMistake: "Chỉnh tiêu chí sau khi đã thấy kết quả để bản mình thích thắng.",
      action: "Chép bảng bốn tiêu chí vào ghi chú và dùng cho lần so sánh tới.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy hai câu trả lời AI cho một việc thật của bạn (có thể là hai bản từ bài trước). Kẻ bảng bốn cột: đúng dữ kiện, đủ ý, đúng giọng, ít phải sửa. Chấm mỗi cột từ 0 đến 1 điểm cho từng bản, viết một dòng lý do. Rồi soạn hai câu bạn sẽ nói nếu sếp hỏi 'sao chọn bản này'.",
      secondary: "Dán bảng vào ghi chú của bạn: ngày mai bạn sẽ được hỏi đã chấm thử chưa.",
    },
    sections: [
      {
        type: "lead",
        text: "Sếp đứng cạnh bàn và hỏi: 'Sao em chọn công cụ này?' Nếu bạn chỉ có câu 'em thấy nó hay hơn', cuộc trò chuyện dừng ở đó. Bài này đưa bạn một bảng bốn dòng để trả lời trong ba mươi giây.",
      },
      {
        type: "feynman",
        title: "Bảng tiêu chí đơn giản hơn bạn nghĩ",
        intro:
          "Thầy cô chấm bài văn không bằng cảm giác: có thang điểm cho ý, bố cục, chính tả. Cùng một bài, hai thầy chấm ra gần nhau vì cùng nhìn vào thang. Bảng tiêu chí là thang điểm bạn tự làm cho câu trả lời của AI.",
        columns: ["Thành phần", "Chấm bài văn", "Chấm câu trả lời AI"],
        rows: [
          ["Thang điểm", "Ý, bố cục, chính tả, diễn đạt", "Đúng dữ kiện, đủ ý, đúng giọng, ít phải sửa"],
          ["Cách chấm", "Cho điểm từng mục rồi cộng", "Cho điểm từng mục, ghi lý do một dòng"],
          ["Khi ngang điểm", "Xem bài nào rõ ràng hơn", "Xem bản nào tốn ít thời gian sửa hơn"],
          ["Lợi ích", "Học sinh biết mình mất điểm ở đâu", "Sếp và đồng nghiệp kiểm lại được lập luận"],
        ],
        oneLiner: "Chấm câu trả lời AI bằng bốn mục có lý do, đừng chấm bằng cảm giác.",
      },
      { type: "heading", text: "Bốn mục, mỗi mục một câu hỏi" },
      {
        type: "list",
        items: [
          "Đúng dữ kiện: mọi tên, số, ngày có khớp với những gì bạn đưa vào không?",
          "Đủ ý: những điều bạn cần nói có mặt hết trong bản trả lời chưa?",
          "Đúng giọng: người nhận đọc có thấy đây là công ty bạn viết không?",
          "Ít phải sửa: bạn mất mấy phút để biến bản này thành bản gửi được?",
        ],
      },
      {
        type: "paragraph",
        text: "Mỗi mục chấm 0 hoặc 1 điểm, kèm một dòng lý do. Đơn giản như vậy là đủ: bảng càng nhiều mục thì càng khó ngồi chấm thật, và bạn sẽ bỏ nó sau hai lần dùng. Mục 'đúng dữ kiện' luôn đứng đầu vì một bản sai số không thể được coi là đáng chọn dù giọng có mượt tới đâu.",
      },
      {
        type: "flow",
        title: "Từ hai bản trả lời tới câu nói với sếp",
        steps: [
          {
            label: "Có hai bản cạnh nhau",
            detail: "Hai câu trả lời cho cùng một yêu cầu, như bài trước. Chưa chọn vội theo cảm giác.",
          },
          {
            label: "Đọc theo từng mục",
            detail: "Đọc một lượt chỉ để tìm dữ kiện sai. Đọc lượt hai chỉ để xem đủ ý chưa. Mỗi lượt một câu hỏi, đừng vừa đọc vừa chấm hết.",
          },
          {
            label: "Cho điểm và ghi lý do",
            detail: "0 hoặc 1 điểm mỗi mục, một dòng lý do. Ví dụ: 'Bản B ghi hạn 30/11, yêu cầu ghi 30/10'.",
          },
          {
            label: "So tổng điểm rồi thời gian sửa",
            detail: "Bản điểm cao hơn thắng. Nếu ngang điểm, chọn bản bạn sửa nhanh hơn.",
          },
          {
            label: "Nói với sếp hai câu",
            detail: "Bản nào được chọn và một lý do đo được. Ví dụ: 'Bản A sạch dữ kiện, em chỉ sửa một câu chào.'",
          },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Lý do kiểm chứng được",
          text: "'Bản B ghi sai hạn nộp, bản A đúng.' Sếp mở hai bản là thấy ngay. Lý do như vậy có thể đúng hay sai, nên nó có giá trị.",
        },
        right: {
          label: "Lý do cảm giác",
          text: "'Bản B đọc nghe chuyên nghiệp hơn.' Không ai kiểm được, và chính bạn tuần sau cũng không nhớ mình đã nghĩ gì.",
        },
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ công cụ AI chấm giúp bảng tiêu chí, nhưng bạn giữ quyền quyết",
        task: "Bạn có hai bản email và muốn công cụ AI kẻ giúp bảng chấm. Lắp yêu cầu sao cho bảng ra dùng được và không tự chọn hộ bạn.",
        parts: [
          {
            id: "criteria",
            label: "Tiêu chí",
            options: [
              {
                text: "Cho tôi biết bản nào hay hơn.",
                feedback: "Bạn giao nguyên quyết định cho công cụ, và 'hay hơn' không có thước đo: không lý do nào kiểm lại được.",
              },
              {
                text: "Chấm hai bản theo bốn mục: đúng dữ kiện, đủ ý, đúng giọng, ít phải sửa, mỗi mục 0 hoặc 1 điểm.",
                good: true,
                feedback: "Bốn mục và thang điểm rõ: công cụ điền bảng chứ không phán xét thay bạn.",
              },
            ],
          },
          {
            id: "evidence",
            label: "Yêu cầu bằng chứng",
            options: [
              {
                text: "Chỉ cần ghi điểm cho gọn.",
                feedback: "Điểm không kèm lý do sẽ không ai kiểm lại được, kể cả bạn.",
              },
              {
                text: "Mỗi điểm phải trích đúng câu trong bản email làm căn cứ và ghi một dòng lý do.",
                good: true,
                feedback: "Trích câu làm căn cứ để bạn đối chiếu lại được từng điểm.",
              },
            ],
          },
          {
            id: "role",
            label: "Ai quyết định",
            options: [
              {
                text: "Hãy chọn luôn bản tốt nhất giúp tôi.",
                feedback: "Người chịu trách nhiệm với sếp là bạn; giao việc chọn đi là giao luôn phần bạn phải giải thích.",
              },
              {
                text: "Chỉ điền bảng và nêu chỗ hai bản khác nhau; tôi sẽ tự quyết định.",
                good: true,
                feedback: "Công cụ làm phần lập bảng, bạn giữ phần quyết định và giải thích.",
              },
            ],
          },
        ],
        responses: [
          {
            requires: ["criteria", "evidence", "role"],
            text: "Bản A: đúng dữ kiện 1 (ghi đúng hạn 30/10), đủ ý 1, đúng giọng 1, ít phải sửa 0 (câu chào quá cứng). Bản B: đúng dữ kiện 0 (ghi hạn 30/11, sai với yêu cầu), đủ ý 1, đúng giọng 1, ít phải sửa 1.\nKhác biệt chính: bản B sai ngày. Quyết định thuộc về bạn.",
          },
          {
            requires: ["criteria"],
            text: "Bản A 3 điểm, bản B 3 điểm. Cả hai đều ổn.\n\n(Có điểm nhưng không có căn cứ, và không chỉ ra được bản B sai hạn: bạn không dùng được bảng này trước mặt sếp.)",
          },
          {
            text: "Bản B hay hơn, bạn nên chọn bản B vì nó chuyên nghiệp hơn.\n\n(Không thước đo, không lý do, và chọn hộ bạn: đúng cái bạn muốn tránh.)",
          },
        ],
      },
      {
        type: "callout",
        label: "Ghi nhớ",
        text: "Công cụ có thể giúp bạn kẻ bảng, nhưng người ký tên dưới email là bạn. Bảng chỉ có giá trị khi chính bạn đã mở hai bản và đối chiếu ít nhất mục 'đúng dữ kiện' bằng mắt mình.",
      },
      {
        type: "scenario",
        title: "Sếp hỏi vì sao chọn bản này",
        start: "s1",
        nodes: {
          s1: {
            text: "Chị Mai có hai bản báo cáo tuần do AI viết và 10 phút trước cuộc họp. Sếp ghé qua: 'Em chọn bản nào, vì sao?'",
            choices: [
              { label: "Nói: 'Bản này em thấy hay hơn ạ'", next: "bad_feel" },
              { label: "Mở bảng bốn mục và chấm nhanh từng bản, ghi lý do một dòng", next: "s2" },
            ],
          },
          bad_feel: {
            text: "Sếp hỏi lại 'hay chỗ nào?' và chị Mai không nói được. Sếp bảo chị làm lại và mang cả hai bản đến cuộc họp, mất thêm nửa giờ.",
            ending: "bad",
          },
          s2: {
            text: "Bản A: 4/4 nhưng thiếu ý chốt. Bản B: 3/4, đủ ý nhưng sai doanh số vùng Bắc (ghi 82 tỷ, số liệu gốc 78 tỷ).",
            choices: [
              { label: "Chọn A, thêm một câu chốt, và nói rõ B sai doanh số vùng Bắc", next: "good" },
              { label: "Chọn B vì đủ ý, sửa doanh số sau nếu có ai hỏi", next: "bad_lazy" },
            ],
          },
          bad_lazy: {
            text: "Trong họp, giám đốc vùng Bắc chỉ ra ngay con số 82 tỷ sai. Chị Mai phải xin lỗi và sếp mất niềm tin vào cả báo cáo.",
            ending: "bad",
          },
          good: {
            text: "Chị Mai đưa sếp bản A cùng bảng điểm. Sếp gật đầu và hỏi có thể dùng bảng đó cho cả nhóm không.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Bốn mục, mỗi mục một dòng lý do: đủ để nói được với sếp.",
          "Bài sau: vì sao hỏi lại một lần, câu trả lời lại khác.",
        ],
      },
    ],
  },

  // ───────────────────────── Bài 3 ─────────────────────────
  {
    id: 2242,
    slug: "cung-cau-hoi-khac-ket-qua-vi-sao",
    title: "Chặng 42, Bài 3: Cùng một câu hỏi, sao mỗi lần một kết quả",
    subtitle: "Nhờ hai đầu bếp nấu cùng món, hai đĩa không bao giờ giống nhau y hệt.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🎲",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Nhiều người thấy kết quả khác nhau giữa hai lần hỏi và kết luận công cụ hỏng hoặc thất thường. Thực ra đó là cách công cụ chạy. Hiểu điều này bạn sẽ không hoảng, và biết cách chốt một kết quả cần dùng thay vì cứ bấm hỏi lại mãi.",
    openingQuestion:
      "Bạn nhờ công cụ AI viết ba gạch đầu dòng tóm tắt một báo cáo. Hỏi lại lần hai, bản tóm tắt dùng câu chữ khác hẳn. Điều gì đang xảy ra?",
    openingOptions: [
      "Công cụ hoạt động bình thường: mỗi lần nó chọn chữ có phần ngẫu nhiên",
      "Công cụ bị lỗi nên đưa ra hai kết quả trái ngược nhau và cần báo hãng sửa ngay",
      "Bạn gõ sai nên công cụ hiểu yêu cầu ở hai lần khác nhau",
      "Lần đầu công cụ chưa quen bạn, lần hai đã học được ý bạn",
    ],
    correctOption: 0,
    explanation:
      "Công cụ AI tạo sinh chọn từng chữ theo xác suất, nên cùng một câu hỏi có thể ra những cách diễn đạt khác nhau. Đây là thiết kế chứ không phải hỏng. Nếu bạn gõ y hệt thì không phải lỗi gõ. Nó cũng không học từ lần hỏi trước để nhớ ý bạn theo nghĩa nâng cấp bản thân. Điều cần làm là kiểm phần dữ kiện có nhất quán không và chốt bản bạn dùng.",
    diagram: [
      { label: "Bạn hỏi cùng một câu", arrow: true },
      { label: "Công cụ chọn từng chữ theo xác suất", arrow: true },
      { label: "Mỗi lần ra cách diễn đạt hơi khác", arrow: true },
      { label: "Bạn kiểm dữ kiện, rồi chốt một bản để dùng" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: nhân viên hành chính tóm tắt quy chế nghỉ phép",
      description:
        "Chị Thu hỏi công cụ AI cùng một câu ba lần: 'Tóm tắt quy chế nghỉ phép công ty trong ba ý'. Ba lần ra ba cách viết, nhưng cả ba đều nói nghỉ phép năm 12 ngày. Lần thứ tư, công cụ ghi 14 ngày. Chị nhận ra: khác giọng văn thì bình thường, khác con số là tín hiệu phải mở quy chế gốc ra đối chiếu.",
    },
    quiz: [
      Q(
        "Vì sao hai lần hỏi cùng một câu lại có thể cho hai câu trả lời khác nhau?",
        [
          "Công cụ chọn từng chữ theo xác suất nên câu chữ có phần ngẫu nhiên",
          "Công cụ đang tự cập nhật liên tục nên mỗi lần chạy là một phiên bản khác",
          "Máy chủ ở xa nên gói dữ liệu của bạn bị đổi chữ trên đường đi",
          "Công cụ cố ý trả lời khác đi để bạn không sao chép cho người khác",
        ],
        "Cách chạy của mô hình là chọn chữ tiếp theo theo xác suất, nên câu chữ có thể khác dù đầu vào y hệt. Không phải mỗi lần một phiên bản, không phải gói dữ liệu bị đổi chữ, và công cụ không cố ý chống sao chép. Khác câu chữ là bình thường; khác dữ kiện mới đáng lo.",
      ),
      Q(
        "Hai lần hỏi cho hai bản tóm tắt, cùng nói hạn nộp là 30/10 nhưng khác nhau ở giọng văn. Nên coi thế nào?",
        [
          "Bình thường: dữ kiện nhất quán, chỉ khác cách diễn đạt",
          "Đáng ngờ: khác câu chữ nghĩa là ít nhất một bản sai",
          "Lỗi công cụ: nó phải luôn viết đúng một câu duy nhất",
          "Vô nghĩa: hai bản khác nhau thì chẳng bản nào dùng được",
        ],
        "Khi dữ kiện nhất quán qua các lần hỏi, đó là dấu hiệu tương đối tốt, còn cách diễn đạt thì tự nhiên khác. Khác câu chữ không có nghĩa là có bản sai. Công cụ không được thiết kế để luôn viết một câu duy nhất. Hai bản cùng đúng dữ kiện đều dùng được.",
      ),
      Q(
        "Hai lần hỏi cho hai con số khác nhau (12 ngày và 14 ngày). Bạn nên làm gì?",
        [
          "Mở tài liệu gốc để lấy con số đúng, không chọn theo số lần xuất hiện",
          "Chọn con số xuất hiện nhiều lần hơn sau khi hỏi thêm vài lần nữa",
          "Lấy trung bình 13 ngày để công bằng cho cả hai câu trả lời",
          "Dùng con số của lần hỏi sau cùng vì công cụ đã điều chỉnh",
        ],
        "Số liệu lệch giữa các lần hỏi cho biết công cụ đang đoán, và số lần xuất hiện không biến một điều đoán thành sự thật. Trung bình hai con số chưa ai xác nhận là bịa thêm một con số. Lần hỏi sau cùng không hề được điều chỉnh bằng kiểm chứng. Tài liệu gốc mới quyết định.",
      ),
      Q(
        "Bạn ưng ý một bản trả lời và muốn dùng đúng nội dung đó ngày mai. Cách chắc nhất là gì?",
        [
          "Sao chép bản đó vào tài liệu của bạn ngay lúc này",
          "Hỏi lại sáng mai với cùng câu chữ và hy vọng ra y hệt",
          "Ghi nhớ đại ý trong đầu, mai bảo công cụ viết lại như thế nhé",
          "Xin công cụ hứa sẽ trả lời giống hệt mỗi lần bạn hỏi nó",
        ],
        "Hỏi lại là mở một lần chọn chữ mới, không có gì đảm bảo ra y hệt. Nhớ đại ý cũng mất câu chữ. Công cụ không giữ được lời hứa 'trả lời giống hệt' vì nó vận hành theo xác suất. Sao chép bản bạn ưng vào tài liệu của mình là cách duy nhất chắc chắn.",
      ),
      Q(
        "Hỏi thêm nhiều lần có giúp công cụ trả lời đúng hơn không?",
        [
          "Không tự động: hỏi thêm chỉ cho thêm phiên bản, mức đúng vẫn phải kiểm",
          "Có, vì sau mỗi lần hỏi công cụ học được và sẽ trả lời đúng dần lên",
          "Có, nếu hỏi đủ mười lần thì bản trùng nhau nhiều nhất chắc chắn đúng",
          "Không, vì lần đầu luôn là bản chính xác nhất còn các lần về sau chỉ kém đi",
        ],
        "Hỏi thêm cho thêm phiên bản, không thêm bằng chứng. Công cụ không học sau mỗi câu hỏi theo nghĩa nâng độ đúng. Nhiều lần trùng nhau chỉ nghĩa là điều đó phổ biến, không phải đúng. Lần đầu cũng không luôn tốt nhất. Kiểm tra dữ kiện vẫn là việc của bạn.",
      ),
    ],
    keyTakeaways: [
      "Cùng một câu hỏi có thể ra cách viết khác nhau: đó là cách công cụ chạy.",
      "Khác giọng văn thì bình thường; khác con số hay ngày tháng thì phải kiểm.",
      "Hỏi thêm cho nhiều bản hơn, không cho thêm bằng chứng.",
      "Ưng bản nào thì sao chép lại ngay, đừng trông vào việc hỏi lại ra y hệt.",
      "Số liệu quan trọng luôn đối chiếu tài liệu gốc.",
    ],
    practicePrompt: {
      question:
        "Anh Nam hỏi một công cụ ba lần về mức phí dịch vụ trong hợp đồng. Ba lần ra 5%, 5% và 7%. Anh nên làm gì?",
      options: [
        "Mở hợp đồng gốc tìm đúng mục phí, vì hai lần trùng chưa phải bằng chứng",
        "Dùng 5% vì hai trên ba lần cho kết quả này",
        "Hỏi thêm hai lần nữa, ai nhiều phiếu hơn thì dùng",
        "Dùng 6% cho công bằng giữa hai con số",
      ],
      correct: 0,
      explanation:
        "Lệch nhau giữa các lần hỏi cho thấy công cụ đang đoán, và số lần trùng không biến điều đoán thành sự thật. Bỏ phiếu thêm hay lấy trung bình chỉ thêm các con số chưa xác nhận. Hợp đồng gốc là nguồn duy nhất trả lời được.",
    },
    summary: {
      keyIdea: "Mỗi lần hỏi, công cụ chọn chữ lại từ đầu, nên câu chữ khác nhau là bình thường.",
      formula: "Khác câu chữ = bình thường. Khác con số = mở tài liệu gốc.",
      commonMistake: "Hỏi đi hỏi lại rồi chọn con số xuất hiện nhiều nhất như thể đó là bằng chứng.",
      action: "Chọn bản ưng ý, sao chép lại ngay, và đối chiếu mọi con số với nguồn.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy một câu hỏi thật trong công việc, ví dụ 'Tóm tắt ba ý chính của tài liệu này'. Hỏi cùng một câu ba lần trong ba cuộc trò chuyện mới. Kẻ bảng ba cột và ghi lại: chỗ nào câu chữ khác, chỗ nào con số hay ngày tháng khác. Mở tài liệu gốc kiểm mọi chỗ khác con số.",
      secondary: "Chọn một bản và sao chép vào tài liệu của bạn: ngày mai bạn sẽ được hỏi kết quả.",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn hỏi một câu, ưng ý. Mười phút sau bạn hỏi lại y hệt và nhận về một câu trả lời khác hẳn. Bạn nghi công cụ hỏng. Bài này giải thích vì sao chuyện này bình thường, và khi nào thì nó đáng lo.",
      },
      {
        type: "feynman",
        title: "Kết quả khác nhau mỗi lần đơn giản hơn bạn nghĩ",
        intro:
          "Nhờ một đầu bếp nấu cùng món canh hai lần, hai bát không giống nhau y hệt: hơi mặn hơn, rau nhiều hơn. Nhưng cả hai vẫn là canh đó. Công cụ AI cũng vậy: hai lần cho hai cách viết, còn nguyên liệu, tức dữ kiện, phải giống nhau.",
        columns: ["Thành phần", "Đầu bếp nấu canh", "Công cụ AI"],
        rows: [
          ["Cùng đề bài", "Cùng món canh chua", "Cùng câu hỏi bạn gõ"],
          ["Điều khác được", "Độ mặn, cách bày, lượng rau", "Câu chữ, thứ tự ý, giọng văn"],
          ["Điều không được khác", "Nguyên liệu chính", "Con số, ngày tháng, tên riêng"],
          ["Khi khác thật", "Món canh bị thay bằng thịt kho", "Con số đổi từ 12 ngày sang 14 ngày: hãy kiểm"],
        ],
        oneLiner: "Khác câu chữ thì bình thường, khác con số thì mở tài liệu gốc ra kiểm.",
      },
      { type: "heading", text: "Vì sao công cụ không trả lời y hệt" },
      {
        type: "paragraph",
        text: "Công cụ tạo ra câu trả lời từng chữ một, và ở mỗi bước có nhiều chữ hợp lý để chọn. Nó chọn có phần ngẫu nhiên trong số đó. Vì vậy hai lần chạy có thể rẽ sang hai lối viết khác nhau ngay từ vài chữ đầu, rồi đi xa dần. Đó là cách nó được thiết kế, không phải lỗi.",
      },
      {
        type: "chart",
        title: "Hỏi lại nhiều lần: bạn thấy thêm bao nhiêu cách diễn đạt",
        caption:
          "Số liệu minh hoạ, không phải đo từ công cụ thật: giả sử mỗi lần hỏi lại có một xác suất nhất định ra một cách viết mới. Kéo thanh trượt để xem bạn thu thêm được bao nhiêu phiên bản, và để ý rằng thêm phiên bản không nói gì về việc phiên bản nào đúng.",
        kind: "line",
        xLabel: "Số lần hỏi",
        yLabel: "Số cách diễn đạt khác nhau (minh hoạ)",
        x: { from: 1, to: 10, step: 1 },
        params: [
          {
            id: "fresh",
            label: "Tỷ lệ lần hỏi ra cách viết mới",
            min: 10,
            max: 100,
            step: 5,
            value: 70,
            unit: "%",
          },
        ],
        series: [
          { label: "Số cách viết thu được (minh hoạ)", expr: "1 + (x - 1) * fresh / 100" },
        ],
      },
      { type: "heading", text: "Phân biệt khác vô hại và khác đáng lo" },
      {
        type: "comparison",
        left: {
          label: "Khác vô hại",
          text: "Thứ tự ý đổi, câu ngắn hơn hay dài hơn, từ đồng nghĩa. Con số, ngày tháng, tên riêng vẫn giống hệt giữa các lần hỏi. Bạn chọn bản hợp giọng nhất.",
        },
        right: {
          label: "Khác đáng lo",
          text: "Con số đổi, ngày đổi, có thêm một tên hay điều khoản lần này mà lần trước không có. Đó là chỗ công cụ đang đoán: mở tài liệu gốc kiểm.",
        },
      },
      {
        type: "flow",
        title: "Từ nhiều bản trả lời tới một bản để dùng",
        steps: [
          {
            label: "Hỏi và lưu bản ưng",
            detail: "Khi gặp bản gần dùng được, sao chép ngay vào tài liệu của bạn. Đừng trông vào việc hỏi lại ra đúng bản đó.",
          },
          {
            label: "Gạch chân mọi con số và tên",
            detail: "Lấy bút gạch chân mọi con số, ngày tháng, tên riêng và điều khoản trong bản.",
          },
          {
            label: "Đối chiếu tài liệu gốc",
            detail: "Mỗi chỗ gạch chân tìm đúng dòng trong tài liệu gốc. Không có trong gốc thì gạch bỏ.",
          },
          {
            label: "Chốt bản cuối",
            detail: "Bản đã đối chiếu là bản bạn dùng. Ghi nguồn cạnh các con số quan trọng.",
          },
        ],
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát bản tóm tắt quy chế nghỉ phép",
        task: "Quy chế gốc chỉ nói: nghỉ phép năm 12 ngày; xin nghỉ phải báo trước ít nhất 3 ngày làm việc; phép chưa dùng hết được chuyển sang quý 1 năm sau. Công cụ tóm tắt lần thứ tư ra bản dưới đây. Bấm vào những câu công cụ tự thêm hoặc làm lệch.",
        segments: [
          { text: "Nhân viên được nghỉ phép năm 12 ngày." },
          { text: "Xin nghỉ phải báo trước ít nhất 3 ngày làm việc." },
          {
            text: "Phép năm chưa dùng hết được cộng dồn tối đa 5 ngày sang năm sau.",
            error: "Quy chế gốc nói chuyển sang quý 1 năm sau, không nói 'cộng dồn 5 ngày'. Con số 5 là công cụ bịa thêm.",
          },
          {
            text: "Nhân viên thử việc cũng được hưởng 12 ngày phép.",
            error: "Quy chế gốc không nhắc nhân viên thử việc: công cụ tự suy diễn một quyền lợi không có trong văn bản.",
          },
          { text: "Phép chưa dùng hết được chuyển sang quý 1 năm sau." },
        ],
      },
      {
        type: "callout",
        label: "Cách nhớ",
        text: "Khi hai lần hỏi ra hai con số khác nhau, đừng bỏ phiếu. Số lần một con số xuất hiện không biến nó thành đúng: công cụ có thể lặp lại cùng một điều đoán nhiều lần.",
      },
      {
        type: "scenario",
        title: "Ba lần hỏi, ba bản, một cuộc họp trong 20 phút",
        start: "s1",
        nodes: {
          s1: {
            text: "Chị Thu hỏi công cụ ba lần về quy chế nghỉ phép. Câu chữ khác nhau nhưng cả ba bản đều nói 12 ngày phép. Bản thứ tư nói 14 ngày. Còn 20 phút để gửi bản cho cả phòng.",
            choices: [
              { label: "Gửi bản đầu tiên vì cả ba bản đầu đều nói 12 ngày", next: "s2" },
              { label: "Dùng bản thứ tư vì nó là bản mới nhất", next: "bad_latest" },
            ],
          },
          bad_latest: {
            text: "Chị Thu gửi bản ghi 14 ngày. Một nhân viên hỏi lại và bộ phận nhân sự phải gửi thư đính chính cho cả phòng.",
            ending: "bad",
          },
          s2: {
            text: "Chị Thu nhận ra ba bản trùng nhau nhưng chưa được kiểm với quy chế gốc, và vẫn còn một câu lạ về 'cộng dồn' ở bản đầu.",
            choices: [
              { label: "Gửi luôn vì ba bản trùng nhau nên chắc đúng", next: "bad_vote" },
              { label: "Mở quy chế gốc, gạch bỏ mọi câu không có trong đó rồi gửi", next: "good" },
            ],
          },
          bad_vote: {
            text: "Câu 'cộng dồn 5 ngày' đi vào thông báo. Hai nhân viên xin nghỉ dồn theo câu đó và trưởng phòng phải từ chối vì quy chế không cho phép.",
            ending: "bad",
          },
          good: {
            text: "Chị Thu gửi bản đã đối chiếu, chỉ giữ những gì có trong quy chế gốc và ghi số mục bên cạnh. Không ai phải đính chính.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Khác câu chữ thì chọn bản hợp giọng; khác con số thì mở tài liệu gốc.",
          "Bài sau: khi công cụ nói rất tự tin mà lại sai.",
        ],
      },
    ],
  },

  // ───────────────────────── Bài 4 ─────────────────────────
  {
    id: 2243,
    slug: "cong-cu-noi-tu-tin-nhung-sai",
    title: "Chặng 42, Bài 4: Khi công cụ nói rất tự tin mà lại sai",
    subtitle: "Người dẫn đường nói chắc nịch không có nghĩa là anh ấy biết đường.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🧭",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Công cụ AI viết câu sai bằng đúng giọng tự tin như câu đúng. Bạn không thể dựa vào 'nghe có vẻ chắc' để tin. Ba phút kiểm tra đúng chỗ giúp bạn không gửi sếp một con số bịa.",
    openingQuestion:
      "Công cụ AI viết: 'Theo thống kê, 63,4% doanh nghiệp nhỏ đã dùng AI trong năm nay.' Câu này nghe rất chắc chắn. Việc đầu tiên nên làm là gì?",
    openingOptions: [
      "Hỏi nguồn cụ thể của con số và tự mở nguồn để tìm đúng con số đó",
      "Dùng luôn vì con số lẻ đến một chữ số thập phân thì phải rất chính xác",
      "Hỏi lại công cụ 'câu này có đúng không' và tin theo câu trả lời",
      "Làm tròn thành 63% để đỡ sai, rồi đưa vào báo cáo",
    ],
    correctOption: 0,
    explanation:
      "Con số lẻ và giọng chắc chắn là dấu hiệu bịa nghe rất giống dấu hiệu chính xác: công cụ biết một con số 'lẻ' nghe đáng tin. Hỏi lại chính nó không phải kiểm chứng vì nó có thể xác nhận luôn điều vừa nói. Làm tròn không làm một con số bịa thành thật. Chỉ khi bạn mở nguồn và thấy con số trong đó bạn mới biết.",
    diagram: [
      { label: "Bạn thấy một con số hay tên nghe rất chắc", arrow: true },
      { label: "Nhận ra dấu hiệu: quá cụ thể, không nguồn", arrow: true },
      { label: "Kiểm ba phút: mở nguồn hoặc tài liệu gốc", arrow: true },
      { label: "Giữ nếu khớp, gạch bỏ hoặc nói rõ 'chưa kiểm' nếu không" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: nhân viên marketing viết báo cáo thị trường",
      description:
        "Anh Đức nhờ công cụ AI viết đoạn mở đầu báo cáo thị trường. Công cụ viết một câu có số liệu và tên một tổ chức nghiên cứu. Anh tìm tên tổ chức đó trên mạng thì không thấy báo cáo nào có con số như vậy. Anh gạch câu ấy và viết lại theo số liệu công ty có. Ba phút kiểm tra cứu anh khỏi một câu đưa lên trang đầu.",
    },
    quiz: [
      Q(
        "Dấu hiệu nào cho thấy một con số trong câu trả lời AI cần được kiểm kỹ?",
        [
          "Rất cụ thể, có chữ số thập phân, mà không kèm nguồn nào",
          "Nằm ở đoạn cuối của bản trả lời thay vì đoạn đầu",
          "Được viết bằng chữ số thay vì viết bằng chữ",
          "Đi kèm một lời chúc chung chung ở cuối câu trả lời",
        ],
        "Sự cụ thể mà không có nguồn là dấu hiệu phổ biến của con số bịa: công cụ biết số lẻ nghe đáng tin. Vị trí trong bài, cách viết bằng chữ số hay lời chúc không liên quan tới việc con số có thật hay không.",
      ),
      Q(
        "Bạn hỏi 'nguồn con số này là gì?' và công cụ đưa một tên báo cáo cùng đường dẫn. Bước tiếp theo đúng là gì?",
        [
          "Mở đường dẫn và tìm đúng con số đó trong trang",
          "Coi như đã kiểm, vì công cụ đã trả lời được nguồn",
          "Hỏi lại 'nguồn này thật chứ' và tin nếu nó nói có",
          "Ghi nguồn vào báo cáo và mở lại sau nếu có ai hỏi",
        ],
        "Tên báo cáo và đường dẫn cũng có thể bị sinh ra cho nghe hợp lý. Hỏi lại công cụ chỉ cho thêm một câu trả lời từ chính nó. Ghi nguồn chưa mở vào báo cáo là gắn thêm chữ ký vào điều chưa kiểm. Chỉ khi thấy con số trong trang thật bạn mới có bằng chứng.",
      ),
      Q(
        "Ba phút kiểm tra một câu có số liệu nên gồm việc nào?",
        [
          "Tìm con số trong tài liệu gốc hoặc nguồn công khai, và ghi lại trang",
          "Đọc lại câu đó ba lần liên tiếp cho tới khi thấy nó hợp lý",
          "Nhờ một công cụ khác cùng loại xác nhận lại con số đó giúp bạn",
          "Kiểm ngữ pháp và cách dùng từ của câu đó",
        ],
        "Kiểm là đối chiếu với thứ nằm ngoài công cụ: tài liệu gốc hoặc nguồn công khai. Đọc lại nhiều lần chỉ đo độ trôi chảy. Một công cụ khác cùng loại có thể bịa cùng kiểu, hoặc cùng đoán một con số. Ngữ pháp đúng không nói câu có thật.",
      ),
      Q(
        "Bạn không tìm được nguồn cho một con số nhưng câu văn vẫn cần ý đó. Cách xử lý đúng là gì?",
        [
          "Bỏ con số, hoặc ghi 'chưa kiểm chứng' và nói rõ trong báo cáo",
          "Giữ nguyên con số vì công cụ đã viết tự tin như vậy",
          "Đổi con số cho gần thực tế hơn theo cảm nhận của bạn",
          "Đổi câu thành 'nhiều nghiên cứu cho thấy' để nghe an toàn hơn mà khỏi cần nguồn",
        ],
        "Điều không kiểm được thì bỏ hoặc ghi rõ đó là chưa kiểm chứng. Giữ nguyên vì giọng chắc là tin vào giọng chứ không tin vào bằng chứng. Tự đổi con số theo cảm nhận là bịa thêm lần nữa. 'Nhiều nghiên cứu cho thấy' là cách che chỗ thiếu nguồn, và thực chất còn khó kiểm hơn.",
      ),
      Q(
        "Công cụ nào ít bị bịa con số nhất khi chưa có tài liệu bạn đưa vào?",
        [
          "Không công cụ nào miễn nhiễm, nên con số quan trọng luôn cần kiểm",
          "Công cụ nào có giao diện chuyên nghiệp và được nhiều người dùng nhất",
          "Công cụ nào trả lời dài và giải thích kỹ lưỡng nhất",
          "Công cụ trả phí, vì gói trả phí luôn có dữ liệu chính xác",
        ],
        "Mọi công cụ tạo sinh đều có thể sai với con số và trích dẫn, kể cả bản trả phí hay được nhiều người dùng. Giải thích dài không đảm bảo đúng, chỉ dài. Vì vậy thói quen tốt là kiểm con số quan trọng bất kể dùng công cụ nào.",
      ),
    ],
    keyTakeaways: [
      "Giọng tự tin không phải bằng chứng: câu sai và câu đúng nghe giống nhau.",
      "Dấu hiệu bịa: con số quá cụ thể, tên tổ chức nghe uy tín, không nguồn.",
      "Hỏi lại chính công cụ 'có đúng không' không phải là kiểm chứng.",
      "Ba phút kiểm: tìm con số trong nguồn thật và ghi lại trang.",
      "Không kiểm được thì bỏ hoặc ghi rõ 'chưa kiểm chứng'.",
    ],
    practicePrompt: {
      question:
        "Chị Hương nhận bản nháp có câu 'Theo Hiệp hội Bán lẻ Việt Nam, doanh số online tăng 37,2% quý này.' Chị không tìm thấy báo cáo đó. Chị nên làm gì?",
      options: [
        "Gạch câu đó hoặc ghi 'chưa kiểm chứng', và viết lại theo số liệu chị có",
        "Giữ câu vì hiệp hội nghe rất uy tín",
        "Đổi thành 'khoảng 37%' cho an toàn hơn",
        "Thêm một đường dẫn vào cuối câu cho có vẻ chắc",
      ],
      correct: 0,
      explanation:
        "Không tìm thấy nguồn thì con số chưa được phép đứng như một sự thật. Tên tổ chức uy tín khiến bịa nghe thật hơn. Làm tròn không làm một con số vô chủ thành thật. Thêm đường dẫn chưa mở là thêm chữ ký giả.",
    },
    summary: {
      keyIdea: "Giọng chắc chắn là đặc điểm của cách công cụ viết, không phải dấu hiệu đúng.",
      formula: "Số quá cụ thể + không nguồn = kiểm ba phút.",
      commonMistake: "Hỏi lại công cụ 'có đúng không' rồi tin câu trả lời của chính nó.",
      action: "Gạch chân mọi con số trong bản nháp và tìm từng số trong nguồn thật.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Nhờ công cụ AI viết một đoạn ngắn về một chủ đề trong ngành bạn, yêu cầu có ít nhất ba con số. Với mỗi con số, tìm nguồn trong tài liệu của bạn hoặc trang công khai. Ghi ba cột: con số, tìm thấy nguồn hay không, hành động (giữ, bỏ, ghi chưa kiểm chứng).",
      secondary: "Ghi lại có bao nhiêu con số không tìm thấy nguồn: ngày mai bạn sẽ được hỏi.",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn đọc bản nháp công cụ vừa viết và một con số làm bạn dừng lại: nghe rất chắc chắn, lẻ tới một chữ số thập phân, kèm tên một tổ chức uy tín. Bài này dạy bạn ba phút kiểm để biết nó có thật hay không.",
      },
      {
        type: "feynman",
        title: "Công cụ nói chắc mà sai đơn giản hơn bạn nghĩ",
        intro:
          "Bạn hỏi đường một người lạ, anh ấy chỉ rất nhanh và rất tự tin. Nhưng anh ấy không muốn nói 'tôi không biết' nên chỉ đại một hướng. Giọng chắc nịch không nói gì về việc anh ấy có biết đường. Công cụ AI cũng thế: nó luôn viết trôi chảy, kể cả khi đang đoán.",
        columns: ["Thành phần", "Người chỉ đường tự tin", "Công cụ AI"],
        rows: [
          ["Giọng nói", "Chắc nịch, không do dự", "Trôi chảy, không thêm chữ 'có thể'"],
          ["Khi không biết", "Chỉ đại một hướng", "Sinh ra con số hoặc tên nghe hợp lý"],
          ["Cách kiểm", "Hỏi thêm người thứ hai hoặc nhìn bản đồ", "Mở nguồn hoặc tài liệu gốc"],
          ["Điều không nên làm", "Hỏi lại chính anh ấy 'anh chắc chưa'", "Hỏi lại chính công cụ 'có đúng không'"],
        ],
        oneLiner: "Giọng chắc chắn không phải bằng chứng: hãy đối chiếu với nguồn thật.",
      },
      { type: "heading", text: "Ba dấu hiệu nên dừng lại kiểm" },
      {
        type: "list",
        items: [
          "Con số quá cụ thể: có chữ số thập phân, phần trăm lẻ, mà không có nguồn đi kèm.",
          "Tên nghe uy tín nhưng bạn chưa từng nghe: một hiệp hội, một báo cáo, một nghiên cứu.",
          "Trích lời hoặc số hiệu văn bản: những thứ này công cụ rất hay sinh ra cho nghe thật.",
          "Câu quá vừa ý bạn: đúng điều bạn đang muốn chứng minh, đề phòng nó chiều theo bạn.",
        ],
      },
      {
        type: "paragraph",
        text: "Không phải câu nào cũng cần kiểm. Câu về cách viết, cấu trúc hay gợi ý thì bạn nhìn là biết có hợp hay không. Sự chú ý của bạn nên dành cho con số, tên riêng, ngày tháng, trích lời và văn bản pháp lý: những thứ khi sai thì gây hậu quả và khi đúng thì phải kiểm được.",
      },
      {
        type: "flow",
        title: "Kiểm ba phút một con số",
        steps: [
          {
            label: "Gạch chân",
            detail: "Đọc bản nháp và gạch chân mọi con số, tên riêng, ngày tháng, trích lời. Đừng kiểm gì ngoài những chỗ đó.",
          },
          {
            label: "Tìm trong nguồn của bạn trước",
            detail: "Mở tài liệu công ty hoặc tệp bạn đã đưa vào. Con số có mặt ở đó không, ở trang nào?",
          },
          {
            label: "Nếu không có, tìm nguồn công khai",
            detail: "Tìm tên tổ chức và con số. Mở đúng trang và tìm con số bằng mắt. Chưa thấy trong trang thì chưa tính là kiểm.",
          },
          {
            label: "Quyết định",
            detail: "Khớp thì giữ và ghi nguồn. Lệch thì sửa theo nguồn. Không tìm thấy thì bỏ hoặc ghi 'chưa kiểm chứng'.",
          },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Kiểm chứng thật",
          text: "Mở tài liệu gốc hoặc trang nguồn, tìm đúng con số bằng mắt, ghi trang. Bằng chứng nằm ngoài công cụ, nên nó mới có giá trị.",
        },
        right: {
          label: "Trông giống kiểm chứng",
          text: "Hỏi lại công cụ 'chắc chưa', nhờ công cụ khác xác nhận, đọc lại câu cho thấy hợp lý. Không có bằng chứng mới: chỉ có thêm chữ từ chính hệ thống đang bị nghi.",
        },
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát đoạn mở đầu báo cáo thị trường",
        task: "Bạn có số liệu công ty: doanh thu quý 3 là 4,2 tỷ đồng, tăng 8% so với quý 2, 60% đơn hàng đến từ khách cũ. Công cụ viết đoạn mở đầu dưới đây. Bấm vào những câu nghe chắc chắn nhưng không có trong dữ kiện của bạn.",
        segments: [
          { text: "Doanh thu quý 3 của công ty đạt 4,2 tỷ đồng." },
          { text: "Con số này tăng 8% so với quý 2." },
          {
            text: "Theo Hiệp hội Doanh nghiệp Nhỏ, mức tăng này cao hơn trung bình ngành 2,3 điểm phần trăm.",
            error: "Bạn không đưa nguồn ngành nào: tên hiệp hội và '2,3 điểm phần trăm' là công cụ tự sinh ra cho nghe có căn cứ.",
          },
          { text: "Khoảng 60% đơn hàng đến từ khách cũ." },
          {
            text: "Đội ngũ chăm sóc khách hàng mới thành lập đã góp phần tăng tỷ lệ này thêm 12%.",
            error: "Dữ kiện không nói gì về đội chăm sóc khách hàng hay mức '12%': công cụ bịa một nguyên nhân và một con số.",
          },
          {
            text: "Xu hướng này được dự báo sẽ tiếp tục trong quý 4.",
            error: "Không có dữ kiện nào để dự báo: đây là câu kết luận nghe hợp lý nhưng không có căn cứ.",
          },
        ],
      },
      {
        type: "callout",
        label: "Lưu ý",
        text: "Không có công cụ nào 'không bịa'. Khác biệt giữa các công cụ là tần suất và loại bịa, không phải có hay không. Vì vậy thói quen kiểm ba phút áp dụng cho mọi công cụ, kể cả bản trả phí.",
      },
      {
        type: "scenario",
        title: "Con số 63,4% trong báo cáo gửi sếp",
        start: "s1",
        nodes: {
          s1: {
            text: "Anh Đức có bản nháp báo cáo, trong đó công cụ viết: 'Theo Viện Nghiên cứu Kinh tế Số, 63,4% doanh nghiệp nhỏ đã dùng AI năm nay.' Sếp cần bản này lúc 3 giờ chiều.",
            choices: [
              { label: "Hỏi lại công cụ 'nguồn này có thật không' và nếu nó nói có thì giữ", next: "bad_ask" },
              { label: "Tìm tên viện và con số đó trên trang công khai", next: "s2" },
            ],
          },
          bad_ask: {
            text: "Công cụ trả lời chắc chắn 'có', thậm chí thêm một đường dẫn. Anh Đức giữ câu. Trong họp, một trưởng phòng hỏi lại nguồn và anh không mở được trang nào có con số đó.",
            ending: "bad",
          },
          s2: {
            text: "Sau ba phút tìm, anh Đức không thấy viện nào tên như vậy, cũng không thấy báo cáo nào có con số 63,4%.",
            choices: [
              { label: "Bỏ câu đó và viết theo số liệu công ty có, ghi rõ nguồn nội bộ", next: "good" },
              { label: "Giữ câu nhưng làm tròn thành 'hơn 60%' cho an toàn", next: "bad_round" },
            ],
          },
          bad_round: {
            text: "Câu vẫn không có nguồn, chỉ là bớt lẻ. Người đọc vẫn tin nó là số liệu thật, và nếu sai thì anh Đức vẫn phải giải thích.",
            ending: "bad",
          },
          good: {
            text: "Anh Đức viết lại đoạn theo số liệu bán hàng của công ty và ghi nguồn nội bộ. Sếp không hỏi gì thêm vì mọi con số đều mở được ra.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Giọng chắc chắn không phải bằng chứng: kiểm con số ở nguồn thật.",
          "Bài sau: dự án nhỏ, cho hai công cụ cùng làm một việc của bạn.",
        ],
      },
    ],
  },

  // ───────────────────────── Bài 5 ─────────────────────────
  {
    id: 2244,
    slug: "du-an-nho-so-sanh-ba-cau-tra-loi",
    title: "Chặng 42, Bài 5: Dự án nhỏ, so sánh ba câu trả lời cho một việc của bạn",
    subtitle: "Thử món ăn mới ba lần rồi mới quyết định quán nào là quán quen.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "🧪",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bốn bài trước cho bạn từng mảnh: thử cùng một việc, chấm bằng bảng, chấp nhận câu chữ khác nhau, kiểm con số. Dự án nhỏ ghép các mảnh lại trên một việc lặp lại trong tuần của bạn, và kết quả là một dòng ghi chú 'với việc này, dùng công cụ nào' dùng được thật.",
    openingQuestion:
      "Bạn định chọn công cụ AI cho việc lặp lại hằng tuần: viết báo cáo tiến độ gửi sếp. Cách bắt đầu nào là hợp lý nhất?",
    openingOptions: [
      "Chọn một báo cáo tuần trước, viết một yêu cầu, thử hai công cụ và chấm bằng bảng",
      "Dùng công cụ bạn đã quen, nếu chưa vừa ý thì đổi sang cái khác vào tuần sau, không cần chấm điểm",
      "Đọc so sánh chi tiết của các công cụ rồi chọn công cụ nhiều tính năng nhất",
      "Thử cả hai công cụ với hai báo cáo khác nhau để có nhiều dữ liệu hơn",
    ],
    correctOption: 0,
    explanation:
      "Báo cáo tuần trước bạn đã viết tay nên biết bản tốt trông ra sao, và một yêu cầu chung cho hai công cụ cho phép so sánh công bằng. Đổi công cụ mỗi tuần làm lẫn lộn công cụ với đề bài của từng tuần. Nhiều tính năng chưa chắc hợp việc của bạn. Hai báo cáo khác nhau thì khác biệt có thể do báo cáo chứ không do công cụ.",
    diagram: [
      { label: "Chọn một việc lặp lại trong tuần", arrow: true },
      { label: "Viết một yêu cầu, cho hai công cụ làm", arrow: true },
      { label: "Kiểm con số rồi chấm bằng bảng bốn tiêu chí", arrow: true },
      { label: "Ghi kết luận: với việc này, dùng công cụ nào và vì sao" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: phụ trách nhân sự chọn công cụ soạn thông báo tuyển dụng",
      description:
        "Chị Lan phải soạn thông báo tuyển dụng mỗi tháng. Chị chọn thông báo tháng trước làm đề, viết một yêu cầu có vị trí, yêu cầu và quyền lợi thật, rồi cho hai công cụ làm. Chị kiểm con số lương (công cụ thứ nhất tự thêm 'thưởng tháng 13') và chấm bằng bảng. Chị ghi một dòng: 'Thông báo tuyển dụng: dùng công cụ B, luôn kiểm phần quyền lợi.' Từ tháng sau, chị mất mười phút thay vì bốn mươi.",
    },
    quiz: [
      Q(
        "Khi chọn việc cho dự án nhỏ, tiêu chí nào quan trọng nhất?",
        [
          "Việc lặp lại trong tuần và bạn đã từng làm tay",
          "Việc mới lạ nhất để công cụ có cơ hội thể hiện hết mình",
          "Việc dài nhất để thấy rõ sự khác biệt giữa các công cụ",
          "Việc khó nhất trong cả tháng để thử tới giới hạn của công cụ",
        ],
        "Việc lặp lại cho bạn nhiều cơ hội dùng kết luận, còn việc đã làm tay giúp bạn biết bản tốt trông thế nào. Việc quá mới, quá dài hay quá khó làm bạn khó chấm và khó dùng lại kết quả, nên kết luận cuối ít giá trị.",
      ),
      Q(
        "Sau khi có hai bản, bạn nên làm gì trước khi chấm bằng bảng tiêu chí?",
        [
          "Gạch chân mọi con số và tên riêng rồi đối chiếu với dữ liệu của bạn",
          "Chọn ngay bản nào đọc thấy trôi chảy và tự nhiên hơn khi bạn đọc lướt",
          "Dán hai bản vào công cụ thứ ba nhờ chọn hộ",
          "Đếm số chữ của mỗi bản để chọn ra bản đủ ý hơn cho việc này",
        ],
        "Đối chiếu con số trước là bước phát hiện chi tiết bịa, thứ mà cảm giác tự nhiên hay độ trôi chảy che mất. Nhờ công cụ thứ ba chọn hộ là giao lại phần bạn phải chịu trách nhiệm. Đếm chữ đo độ dài chứ không đo độ đúng.",
      ),
      Q(
        "Hai công cụ đều ra bản dùng được. Bạn nên ghi gì vào dòng kết luận?",
        [
          "Loại việc, công cụ chọn, lý do đo được và điều luôn phải kiểm",
          "Chỉ tên công cụ thắng cuộc để dòng ghi chú ngắn gọn",
          "Điểm tổng của mỗi công cụ, không cần thêm gì khác",
          "Cảm nhận chung của bạn về giao diện và tốc độ làm việc của hai công cụ",
        ],
        "Một dòng kết luận dùng lại được cần bốn thứ: loại việc, công cụ chọn, lý do đo được, và điều luôn phải kiểm. Chỉ ghi tên công cụ hoặc điểm mất bối cảnh, còn cảm nhận về giao diện không giúp lần chọn sau.",
      ),
      Q(
        "Một công cụ cho bản đẹp hơn nhưng tự thêm chi tiết bạn không đưa. Bạn nên chấm thế nào?",
        [
          "Trừ điểm mục đúng dữ kiện, vì chi tiết thêm là rủi ro thật",
          "Cộng điểm cho công cụ vì nó đã chủ động bổ sung thêm ý",
          "Bỏ qua chi tiết thêm nếu nó nghe hợp lý",
          "Trừ điểm giọng văn thay vì mục dữ kiện",
        ],
        "Chi tiết ngoài dữ kiện là thứ dễ lọt vào bản gửi đi và không ai kiểm cho đến khi có chuyện, nên nó phải trừ ở mục đúng dữ kiện. Hợp lý không có nghĩa là có thật. Trừ ở mục giọng là ghi sai chỗ lỗi nằm.",
      ),
      Q(
        "Bạn nên xem lại kết luận về công cụ khi nào?",
        [
          "Khi loại việc đổi, khi công cụ đổi cách làm, hoặc sau vài tháng",
          "Mỗi sáng thứ Hai để luôn dùng được công cụ mới nhất hiện có",
          "Không bao giờ, vì kết luận đã đúng thì luôn đúng",
          "Chỉ khi đồng nghiệp gợi ý một công cụ khác",
        ],
        "Kết luận chỉ đúng cho loại việc và thời điểm bạn thử. Việc khác đi hay công cụ thay đổi thì bằng chứng cũ hết giá trị. Xem lại mỗi sáng là quá nhiều, và không bao giờ là bỏ qua thay đổi. Lời gợi ý của đồng nghiệp là lý do để thử, không thay cho việc thử.",
      ),
    ],
    keyTakeaways: [
      "Chọn một việc lặp lại trong tuần mà bạn đã từng làm tay.",
      "Một yêu cầu, hai công cụ, đặt cạnh nhau, chấm bằng bảng bốn tiêu chí.",
      "Đối chiếu con số trước khi chấm: chi tiết bịa che mất bởi độ trôi chảy.",
      "Kết luận một dòng: loại việc, công cụ chọn, lý do, điều luôn phải kiểm.",
      "Xem lại khi việc hay công cụ đổi, không phải mỗi tuần.",
    ],
    practicePrompt: {
      question:
        "Anh Toàn thử hai công cụ cho báo cáo tuần và kết luận 'công cụ A tốt hơn' sau một lần thử. Điều gì còn thiếu để kết luận đáng dùng?",
      options: [
        "Ghi rõ loại việc, lý do đo được và điều luôn phải kiểm với công cụ A",
        "Thử thêm mười công cụ khác cho chắc",
        "Hỏi đồng nghiệp xem ai cũng dùng công cụ A không",
        "Không thiếu gì: một lần thử là đủ để kết luận mãi mãi",
      ],
      correct: 0,
      explanation:
        "Một dòng kết luận tốt nói được việc nào, công cụ nào, vì sao, và phải kiểm gì. 'Tốt hơn' đơn thuần không dùng lại được. Thử thêm nhiều công cụ không thay được việc ghi lại. Việc đồng nghiệp dùng gì là dư luận. Một lần thử chỉ đúng cho loại việc đó.",
    },
    summary: {
      keyIdea: "Dự án nhỏ ghép bốn kỹ năng thành một dòng kết luận dùng lại được.",
      formula: "Một việc thật + một yêu cầu + hai công cụ + kiểm số + bảng tiêu chí = kết luận một dòng.",
      commonMistake: "Kết luận 'công cụ A tốt hơn' mà không ghi loại việc và điều cần kiểm.",
      action: "Chạy dự án nhỏ trên việc lặp lại của bạn và lưu dòng kết luận.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một việc bạn lặp lại trong tuần (báo cáo tiến độ, email nhắc việc, biên bản họp). Lấy bản tuần trước của bạn làm chuẩn. Viết một yêu cầu với dữ kiện thật, dán y hệt vào hai công cụ. Gạch chân mọi con số và đối chiếu, chấm bằng bảng bốn tiêu chí, rồi viết một dòng: 'Với [việc], dùng [công cụ] vì [lý do đo được]; luôn kiểm [điều gì]'.",
      secondary: "Dán dòng đó ở nơi bạn thấy hằng ngày: ngày mai bạn sẽ được hỏi.",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn có một việc lặp lại mỗi tuần và hai công cụ AI. Bốn bài trước đưa bạn từng mảnh: cùng yêu cầu, bảng tiêu chí, câu chữ khác nhau là bình thường, kiểm con số. Hôm nay bạn ghép lại thành một dự án nhỏ, và kết thúc bằng một dòng ghi chú dùng được cả tháng.",
      },
      {
        type: "feynman",
        title: "Dự án nhỏ đơn giản hơn bạn nghĩ",
        intro:
          "Bạn muốn chọn quán cơm trưa quen. Bạn không thử một lần rồi kết luận, cũng không đọc hết bình luận trên mạng. Bạn ăn thử ở hai quán, cùng món, cùng giờ, rồi ghi nhớ quán nào ngon hơn và món nào nên tránh. Dự án nhỏ này là bản làm việc của chuyện đó.",
        columns: ["Thành phần", "Chọn quán cơm trưa", "Chọn công cụ AI"],
        rows: [
          ["Cùng đề bài", "Cùng món cơm gà", "Cùng yêu cầu, cùng dữ kiện"],
          ["Cách thử", "Ăn ở cả hai quán, cùng buổi", "Dán y hệt vào cả hai công cụ"],
          ["Chấm điểm", "Vị, giá, sạch, phục vụ", "Đúng dữ kiện, đủ ý, đúng giọng, ít phải sửa"],
          ["Ghi nhớ", "Quán nào cho món nào, và món nên tránh", "Việc nào dùng công cụ nào, và điều luôn phải kiểm"],
        ],
        oneLiner: "Thử cùng đề, chấm cùng thang, rồi ghi một dòng để lần sau khỏi phải thử lại.",
      },
      { type: "heading", text: "Chọn việc cho dự án" },
      {
        type: "paragraph",
        text: "Việc tốt để thử có ba đặc điểm: lặp lại ít nhất mỗi tuần, bạn đã từng làm tay ít nhất một lần, và sản phẩm không quá nhạy cảm (không có dữ liệu cá nhân hay số liệu chưa công bố). Ví dụ: báo cáo tiến độ, email nhắc việc, tóm tắt biên bản họp, thông báo nội bộ. Nếu việc có dữ liệu nhạy cảm, thay bằng dữ kiện giả cùng dạng.",
      },
      {
        type: "flow",
        title: "Dự án nhỏ trong 20 phút",
        steps: [
          {
            label: "Chọn việc và lấy bản chuẩn",
            detail: "Lấy bản tuần trước của bạn làm chuẩn để biết bản tốt trông thế nào. Gạch dưới ba dữ kiện quan trọng nhất.",
          },
          {
            label: "Viết một yêu cầu duy nhất",
            detail: "Người đọc, việc cần nói, ba dữ kiện thật, độ dài, và lời dặn không thêm điều ngoài dữ kiện.",
          },
          {
            label: "Cho hai công cụ làm",
            detail: "Dán y hệt vào mỗi công cụ ở một cuộc trò chuyện mới. Sao chép hai bản vào một tài liệu để đặt cạnh nhau.",
          },
          {
            label: "Kiểm con số rồi chấm điểm",
            detail: "Gạch chân mọi con số và đối chiếu với dữ kiện. Sau đó chấm bốn mục, mỗi mục một dòng lý do.",
          },
          {
            label: "Viết dòng kết luận",
            detail: "'Với [việc], dùng [công cụ] vì [lý do]; luôn kiểm [điều gì].' Lưu ở nơi bạn thấy hằng ngày.",
          },
        ],
      },
      { type: "heading", text: "Dòng kết luận tốt trông như thế nào" },
      {
        type: "comparison",
        left: {
          label: "Kết luận dùng lại được",
          text: "'Báo cáo tiến độ tuần: dùng công cụ B vì đúng số liệu và ít phải sửa giọng; luôn kiểm phần ngày hoàn thành vì công cụ hay tự đổi.'",
        },
        right: {
          label: "Kết luận mất dần giá trị",
          text: "'Công cụ B tốt hơn.' Ba tuần sau bạn không nhớ tốt hơn ở việc nào, vì sao, và phải kiểm gì.",
        },
      },
      {
        type: "list",
        items: [
          "Việc: báo cáo tiến độ, email nhắc việc, biên bản họp hay thông báo?",
          "Công cụ chọn và lý do đo được (ít sửa hơn bao nhiêu phút, sai dữ kiện ở đâu).",
          "Điều luôn phải kiểm với công cụ này cho việc này.",
          "Ngày thử, để biết khi nào nên xem lại.",
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Lắp yêu cầu cho dự án báo cáo tiến độ",
        task: "Bạn cần báo cáo tiến độ tuần cho dự án đổi phần mềm chấm công: hoàn thành 3 trên 5 hạng mục, hạng mục 4 trễ 2 ngày vì chờ tài khoản, hạng mục 5 đúng hạn. Lắp yêu cầu để dán vào cả hai công cụ.",
        parts: [
          {
            id: "facts",
            label: "Dữ kiện",
            options: [
              {
                text: "Viết báo cáo tiến độ dự án tuần này.",
                feedback: "Không có hạng mục, số lượng hay lý do trễ: công cụ sẽ tự bịa tiến độ, và hai bản bịa khác nhau thì bạn không so sánh được.",
              },
              {
                text: "Dự án đổi phần mềm chấm công: xong 3/5 hạng mục, hạng mục 4 trễ 2 ngày vì chờ tài khoản, hạng mục 5 đúng hạn.",
                good: true,
                feedback: "Đủ số lượng, lý do trễ và hạng mục đúng hạn: mọi con số trong bản trả lời đều kiểm được.",
              },
            ],
          },
          {
            id: "reader",
            label: "Người đọc và giọng",
            options: [
              {
                text: "Viết cho chuyên nghiệp.",
                feedback: "'Chuyên nghiệp' hai công cụ hiểu hai kiểu, nên khác biệt giữa hai bản khó nói do đâu.",
              },
              {
                text: "Người đọc là giám đốc vận hành, cần đọc trong hai phút. Giọng thẳng, nêu rủi ro trước.",
                good: true,
                feedback: "Người đọc, thời gian và giọng đều rõ: bạn chấm được mục đúng giọng.",
              },
            ],
          },
          {
            id: "limit",
            label: "Ràng buộc",
            options: [
              {
                text: "Viết đầy đủ chi tiết.",
                feedback: "Bảo viết 'đầy đủ chi tiết' là mời công cụ tự thêm chi tiết bạn chưa hề đưa.",
              },
              {
                text: "Dưới 150 chữ. Không thêm nguyên nhân, ngày hay con số nào ngoài dữ kiện tôi đưa.",
                good: true,
                feedback: "Giới hạn độ dài và cấm thêm chi tiết: chi tiết bịa nếu có sẽ hiện rõ khi đặt hai bản cạnh nhau.",
              },
            ],
          },
        ],
        responses: [
          {
            requires: ["facts", "reader", "limit"],
            text: "Tiến độ tuần này: xong 3/5 hạng mục. Rủi ro: hạng mục 4 trễ 2 ngày do chờ cấp tài khoản, cần giám đốc vận hành thúc bộ phận IT. Hạng mục 5 đúng hạn.\nĐề nghị: chốt ngày cấp tài khoản trong tuần này.\n\n(Đúng số, nêu rủi ro trước, không thêm chi tiết lạ: sẵn sàng để hai công cụ so sánh.)",
          },
          {
            requires: ["facts"],
            text: "Dự án đổi phần mềm chấm công đã hoàn thành 3/5 hạng mục. Hạng mục 4 trễ 2 ngày vì chờ tài khoản. Hạng mục 5 đúng hạn. Nhìn chung dự án đang đi đúng hướng và nhóm đang nỗ lực hết mình...\n\n(Đúng dữ kiện nhưng dài dòng và không nêu điều giám đốc cần làm.)",
          },
          {
            text: "Dự án đang tiến triển tốt, hoàn thành khoảng 80% khối lượng. Nhóm đã phối hợp với ba bộ phận và dự kiến nghiệm thu trước 20/11...\n\n(Yêu cầu quá thiếu: '80%', 'ba bộ phận' và '20/11' đều do công cụ tự bịa.)",
          },
        ],
      },
      {
        type: "callout",
        label: "Quy tắc an toàn",
        text: "Khi thử với dữ liệu thật của công ty, dùng công cụ công ty đã cho phép, và không dán dữ liệu cá nhân hay số liệu chưa công bố. Nếu không chắc, thay bằng dữ kiện giả cùng dạng: dự án nhỏ vẫn cho bạn kết luận về công cụ.",
      },
      {
        type: "scenario",
        title: "Chị Lan chạy dự án nhỏ cho thông báo tuyển dụng",
        start: "s1",
        nodes: {
          s1: {
            text: "Chị Lan (nhân sự) soạn thông báo tuyển dụng mỗi tháng. Chị có hai công cụ AI và 20 phút. Thông báo tháng trước là bản chuẩn của chị.",
            choices: [
              { label: "Cho công cụ A yêu cầu chi tiết còn công cụ B chỉ một dòng, xem ai giỏi hơn", next: "bad_unfair" },
              { label: "Viết một yêu cầu với vị trí, yêu cầu và quyền lợi thật rồi dán y hệt vào cả hai", next: "s2" },
            ],
          },
          bad_unfair: {
            text: "Công cụ A thắng vì yêu cầu chi tiết hơn chứ không vì giỏi hơn. Chị Lan kết luận sai và dùng A cho mọi việc, kể cả việc B làm tốt hơn.",
            ending: "bad",
          },
          s2: {
            text: "Hai bản trả về. Bản A đúng mức lương và địa điểm. Bản B viết hay hơn nhưng thêm 'thưởng tháng 13' chị không đưa.",
            choices: [
              { label: "Chọn B vì viết hay hơn, giữ nguyên câu thưởng", next: "bad_bonus" },
              { label: "Chọn A, trừ điểm B ở mục đúng dữ kiện, ghi dòng kết luận", next: "good" },
            ],
          },
          bad_bonus: {
            text: "Thông báo đi ra với câu 'thưởng tháng 13'. Ba ứng viên hỏi trong phỏng vấn, và chị Lan phải xin lỗi rồi đính chính với ban giám đốc.",
            ending: "bad",
          },
          good: {
            text: "Chị Lan ghi: 'Thông báo tuyển dụng: dùng công cụ A vì đúng quyền lợi; luôn kiểm phần thưởng và phúc lợi.' Tháng sau chị mất mười phút thay vì bốn mươi.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Một việc thật, một yêu cầu, hai công cụ, một dòng kết luận.",
          "Bài sau: cửa sổ ngữ cảnh, và vì sao công cụ có lúc quên phần đầu.",
        ],
      },
    ],
  },
];
