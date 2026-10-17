import type { Lesson } from "../lesson-types";
import { VIBECODE_PROJECT_EXERCISE } from "./s67-project";

// Chặng 67, bài 9-10: "Bộ thử và nghiệm thu". Hai bài cuối của chặng, đi sau
// "đọc git diff". Mỗi bài có đúng một bước dự án (bài tập trong s67-project.ts).
export const S67_D_LESSONS: Lesson[] = [
  {
    id: 2748,
    slug: "chay-bo-thu-doc-bao-loi-va-sua-tung-cho-mot",
    title: "Chặng 67, Bài 9: Chạy bộ thử, đọc báo lỗi và sửa từng chỗ một",
    subtitle: "Bộ thử là bảng điểm của mã: mỗi dòng ✗ chỉ đúng ca sai, nên bạn sửa được từng chỗ.",
    duration: "17 phút",
    difficulty: "Trung bình",
    emoji: "🧪",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Khi mã sai, cách tệ nhất là sửa mọi chỗ cùng lúc rồi hy vọng. Bộ thử cho bạn thứ AI không tự có: một bảng điểm nói rõ ca nào sai, hàm trả gì và đáng lẽ phải trả gì. Đọc được một dòng ✗ và sửa từng chỗ một, chạy lại sau mỗi lần, là cách biến một đống lỗi thành vài việc nhỏ, và là cách bạn giữ quyền kiểm soát khi AI viết mã.",
    openingQuestion:
      "Quán nhận đơn từ 7 đến 21 giờ. Bộ thử in: ✗ đúng giờ 21: nhận \"ngoài giờ nhận\", mong \"ok\". Dòng này cho bạn biết điều gì?",
    openingOptions: [
      "Mong là \"ngoài giờ nhận\" nhưng hàm trả \"ok\", tức là hàm nhận nhầm giờ 21",
      "Hàm đúng, còn bộ thử viết sai ở ca giờ 21 nên cần sửa bộ thử trước",
      "Với giờ 21, hàm trả \"ngoài giờ nhận\" thay vì \"ok\"",
      "Cả bộ thử hỏng, mọi ca khác cũng sai nên cần viết lại toàn bộ hàm",
    ],
    correctOption: 2,
    explanation:
      "Mỗi dòng ✗ có ba phần: tên ca (đúng giờ 21), điều hàm thật sự trả (nhận) và điều bảng mong đợi (mong). Ở đây hàm từ chối giờ 21 trong khi quy tắc của quán còn nhận đến hết 21 giờ. Vì vậy nghi phạm là điều kiện so sánh giờ ở đầu hàm, chứ không phải bộ thử. Đảo hai phần nhận và mong sẽ đọc ngược cả lỗi. Một dòng ✗ chỉ nói về đúng ca đó, nên các ca khác chưa có gì để kết luận.",
    diagram: [
      { label: "Chạy bộ thử: nhiều ca chạy một lượt", arrow: true },
      { label: "Đọc dòng ✗: ca nào, nhận gì, mong gì", arrow: true },
      { label: "Sửa MỘT chỗ gây ra ca sai đó", arrow: true },
      { label: "Chạy lại cả bộ thử: ca đó qua, ca khác không hỏng" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một bạn nhờ AI viết hàm kiểm tra đơn rồi chạy bộ thử sáu ca, được \"Qua 4/6\". Bạn ấy sửa liền ba chỗ cùng lúc, chạy lại thì thành 3/6 mà không biết chỗ nào làm hỏng. Lần sau bạn ấy đọc dòng ✗ đầu, sửa đúng điều kiện giờ, chạy lại được 5/6, rồi sửa nốt chỗ còn lại. Hai lần sửa nhỏ nhanh hơn một lần sửa lớn.",
    },
    quiz: [
      {
        question: "Bộ thử chạy xong in \"Qua 4/6\" và hai dòng ✗. Việc đầu tiên nên làm là gì?",
        options: [
          "Sửa mọi chỗ nghi ngờ cùng lúc rồi chạy lại đúng một lần",
          "Đọc dòng ✗ đầu tiên, tìm chỗ gây sai ca đó rồi sửa riêng chỗ ấy",
          "Xoá hàm cũ và nhờ AI viết lại từ đầu cho sạch",
          "Bỏ ca khó ra khỏi bộ thử để số ca qua tăng lên",
        ],
        correct: 1,
        explanation:
          "Dòng ✗ cho biết ca nào sai và sai thế nào, nên đó là điểm xuất phát. Sửa một chỗ rồi chạy lại cho bạn biết chỗ nào có tác dụng. Sửa nhiều chỗ cùng lúc thì không biết chỗ nào đúng, viết lại từ đầu bỏ phần đang chạy tốt, còn bỏ ca khó chỉ làm bảng điểm đẹp hơn chứ mã không đúng hơn.",
      },
      {
        question: "Bạn vừa sửa một chỗ trong hàm. Bước tiếp theo hợp lý là gì?",
        options: [
          "Chạy lại đúng ca vừa sửa, nếu qua thì coi như cả bộ thử đã qua",
          "Sửa luôn chỗ kế tiếp, chạy lại một lượt ở cuối cùng",
          "Chạy lại cả bộ thử, xem ca đó qua chưa và ca khác còn qua",
          "Dán kết quả cũ cho AI để nó nhớ ca nào từng sai",
        ],
        correct: 2,
        explanation:
          "Chạy cả bộ thử vừa cho thấy ca đã sửa, vừa cho thấy các ca từng qua có bị hỏng lại không. Chỉ chạy ca vừa sửa bỏ lỡ lỗi mới sinh ra ở chỗ khác. Dồn việc chạy về cuối làm các lỗi chồng nhau, còn dán kết quả cũ cho AI không giúp ích gì khi chưa có kết quả mới.",
      },
      {
        question: "Khi nào nên dán báo lỗi cho AI để nhờ sửa?",
        options: [
          "Ngay khi thấy chữ ✗ đầu tiên, vì AI sửa nhanh hơn người đọc",
          "Khi bạn đã đọc ca sai mà chưa tìm ra nguyên nhân",
          "Khi muốn AI sửa luôn các hàm khác đã xong cho cùng một kiểu viết",
          "Chỉ khi cả bộ thử đã qua, để AI giải thích lại vì sao đúng",
        ],
        correct: 1,
        explanation:
          "Đọc dòng ✗ trước vì nhiều lỗi nhỏ, như so sánh lệch một đơn vị, bạn tự nhìn ra trong một phút. Khi bạn đã hiểu ca sai mà vẫn kẹt, dán báo lỗi cho AI mới có giá trị. Dán ngay mọi lúc làm bạn mất thói quen đọc, và nhờ sửa các hàm đã xong là mở rộng phạm vi, đúng điều bài trước dặn tránh.",
      },
      {
        question: "Bạn dán báo lỗi cho AI. Gói thông tin nào đầy đủ và an toàn nhất?",
        options: [
          "Toàn bộ tệp cấu hình để AI hiểu hết, kể cả khoá bí mật bên trong",
          "Dòng ✗, đoạn mã liên quan và ca thử; đã xoá khoá bí mật",
          "Chỉ câu \"không chạy được\" vì AI sẽ tự đoán ra lỗi",
          "Ảnh chụp cả màn hình, gồm mọi cửa sổ đang mở",
        ],
        correct: 1,
        explanation:
          "AI cần thấy ca sai, mã liên quan và điều bạn mong đợi để sửa đúng, và khoá bí mật (mật khẩu, mã truy cập) không bao giờ cần cho việc đó. Câu \"không chạy được\" thiếu mọi dữ kiện. Tệp cấu hình có thể chứa khoá bí mật nên dán vào là làm lộ, còn ảnh cả màn hình thừa thông tin và cũng có thể lộ thứ không liên quan.",
      },
      {
        question: "AI sửa ca giờ 21 và báo \"đã sửa\". Bằng chứng đáng tin nhất là gì?",
        options: [
          "Lời AI nói đã sửa kèm giải thích nghe rất hợp lý",
          "Bộ thử chạy lại, ca đó qua và các ca khác vẫn còn qua",
          "Đoạn mã mới trông gọn hơn đoạn mã cũ rõ rệt",
          "Không còn thông báo lỗi đỏ nào khi mở tệp mã",
        ],
        correct: 1,
        explanation:
          "Bằng chứng là kết quả chạy: ca sai chuyển sang qua và những ca từng qua không đổi. Lời báo \"đã xong\" của AI chưa phải bằng chứng, và mã trông gọn không có nghĩa đúng. Không có lỗi đỏ chỉ cho biết mã đọc được, không nói gì về việc nó trả đúng kết quả.",
      },
    ],
    keyTakeaways: [
      "Bộ thử là bảng điểm: nhiều ca chạy một lượt, mỗi dòng ✗ là một ca sai.",
      "Một dòng ✗ có ba phần: tên ca, điều hàm trả (nhận), điều bảng mong (mong).",
      "Sửa từng chỗ một và chạy lại cả bộ thử sau mỗi lần sửa.",
      "Dán lỗi cho AI khi đã đọc mà vẫn kẹt, kèm ca thử và đã xoá khoá bí mật.",
      "Sau khi sửa, kiểm các ca từng qua và các hàm đã xong còn nguyên.",
    ],
    practicePrompt: {
      question: "Bộ thử báo ✗ ở hai ca khác nhau. Cách sửa nào hợp lý nhất?",
      options: [
        "Sửa cả hai ca cùng lúc để chạy bộ thử đúng một lần",
        "Sửa chỗ gây sai ca thứ nhất, chạy lại, rồi mới sang ca thứ hai",
        "Nhờ AI viết lại hàm để cả hai ca chắc chắn qua",
        "Sửa ca dễ trước, ca khó để mặc AI tự quyết",
      ],
      correct: 1,
      explanation:
        "Sửa một ca rồi chạy lại cho bạn biết sửa đó có tác dụng và không làm hỏng ca còn lại. Sửa cả hai cùng lúc lẫn lộn nguyên nhân, nhờ AI viết lại thì bỏ phần đang chạy đúng, còn để mặc AI tự quyết là trao lại quyền kiểm soát.",
    },
    summary: {
      keyIdea: "Đọc từng dòng ✗, sửa một chỗ, chạy lại cả bộ thử, rồi mới sửa chỗ kế.",
      formula: "Dòng ✗ = tên ca + điều hàm trả (nhận) + điều bảng mong (mong).",
      commonMistake: "Sửa nhiều chỗ cùng lúc rồi không biết chỗ nào gây hỏng thêm.",
      action: "Lần tới bộ thử báo lỗi, chỉ sửa dòng ✗ đầu tiên rồi chạy lại trước khi làm gì khác.",
    },
    application: {
      title: "Làm ngay trong 10 phút",
      message:
        "Lấy một hàm bất kỳ bạn có, viết sáu ca thử gồm ca thường, ca biên và ca sai. Chạy, đọc từng dòng ✗, sửa một chỗ, chạy lại và ghi số ca qua sau mỗi lần để thấy nó tăng dần.",
      secondary: "Nếu số ca qua tụt xuống sau một lần sửa, hoàn tác lần sửa đó rồi nghĩ lại.",
    },
    sections: [
      {
        type: "lead",
        text: "AI viết xong hàm và bạn chạy bộ thử: một đống chữ đỏ hiện ra. Bài này dạy cách đọc đống đó như một bảng điểm, và sửa từng chỗ một thay vì sửa lung tung.",
      },
      {
        type: "feynman",
        title: "Bộ thử đơn giản hơn bạn nghĩ",
        intro: "Bài kiểm tra có nhiều câu và mỗi câu có điểm riêng. Bộ thử cũng vậy: nhiều ca chạy một lượt, ca nào sai thì được đánh dấu.",
        columns: ["Điều cần làm", "Với bài kiểm tra", "Với bộ thử"],
        rows: [
          ["Xem điểm", "Đọc bảng điểm: sai những câu nào", "Đọc các dòng ✗: sai những ca nào"],
          ["Hiểu lỗi", "Xem đáp án mình viết và đáp án đúng", "Xem phần nhận (hàm trả) và phần mong"],
          ["Sửa", "Học lại đúng chỗ sai, rồi làm lại", "Sửa đúng chỗ gây sai ca, chạy lại"],
          ["Kiểm lại", "Câu đúng trước đó vẫn đúng", "Ca từng qua vẫn qua, hàm khác không đổi"],
        ],
        oneLiner: "Bộ thử cho bạn bảng điểm; đọc nó, sửa một chỗ, chạy lại.",
      },
      {
        type: "flow",
        title: "Một vòng đọc báo lỗi và sửa",
        steps: [
          { label: "Chạy bộ thử", detail: "Xem dòng tổng: ví dụ \"Qua 4/6\", rồi các dòng ✗." },
          { label: "Chọn một dòng ✗", detail: "Bắt đầu từ dòng đầu tiên, đừng nhảy cóc." },
          { label: "Đọc ba phần", detail: "Ca nào, nhận gì, mong gì: từ đó suy ra chỗ nghi ngờ." },
          { label: "Sửa một chỗ", detail: "Chỉ chỗ gây ra ca sai đó, không dọn thêm chỗ khác." },
          { label: "Chạy lại cả bộ thử", detail: "Ca đó qua chưa? Ca từng qua còn qua không?" },
        ],
      },
      { type: "heading", text: "Đọc một dòng ✗" },
      {
        type: "paragraph",
        text: "Hãy lấy dòng: ✗ tên toàn khoảng trắng: nhận \"ok\", mong \"thiếu tên\". Ca có tên là một ô tên chỉ gồm dấu cách. Hàm trả \"ok\" tức là coi mấy dấu cách là một cái tên. Bảng mong \"thiếu tên\". Chỉ riêng dòng này đã khoanh vùng: chỗ kiểm tra tên đang không cắt khoảng trắng thừa. Bạn chưa cần đọc cả hàm.",
      },
      {
        type: "comparison",
        left: {
          label: "Sửa nhiều chỗ cùng lúc",
          text: "Bạn đổi ba điều kiện, chạy lại và được 3/6. Có ca mới sai, không biết do chỗ nào. Muốn hoàn tác cũng không biết hoàn tác cái gì.",
        },
        right: {
          label: "Sửa từng chỗ một",
          text: "Bạn sửa đúng điều kiện giờ, chạy lại được 5/6. Chỗ tiếp theo chỉ còn một dòng ✗ để lo. Mỗi lần chạy đều có một kết luận rõ.",
        },
      },
      { type: "heading", text: "Tự sửa hay nhờ AI?" },
      {
        type: "list",
        items: [
          "Tự sửa khi dòng ✗ cho thấy chỗ sai rõ, như so sánh lệch một đơn vị hoặc thiếu bước cắt khoảng trắng.",
          "Nhờ AI khi bạn đã đọc ba phần của dòng ✗ mà vẫn không biết chỗ nào sinh ra kết quả đó.",
          "Khi nhờ AI, dán kèm dòng ✗, đoạn mã liên quan và ca thử; ghi rõ chỉ sửa hàm đó.",
          "Sau mỗi bản AI trả về, vẫn chạy lại cả bộ thử: lời \"đã sửa\" chưa phải bằng chứng.",
        ],
      },
      {
        type: "callout",
        label: "Giấu khoá bí mật trước khi dán",
        text: "Mật khẩu, mã truy cập hay khoá kết nối nằm trong tệp cấu hình thì xoá hoặc thay bằng chữ \"(đã giấu)\" trước khi dán cho AI. Để sửa lỗi, AI không bao giờ cần thấy chúng.",
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Lắp lời nhờ AI sửa đúng một ca sai",
        task: "Bộ thử báo ✗ ở ca \"tên toàn khoảng trắng\". Bạn đọc rồi vẫn chưa chắc chỗ nào sai. Ghép lời nhờ AI.",
        parts: [
          {
            id: "evidence",
            label: "Bằng chứng gửi kèm",
            options: [
              { text: "Hàm kiểm tra đơn không chạy đúng, sửa giúp tôi.", feedback: "Thiếu ca sai và thiếu điều bạn mong: AI phải đoán lỗi." },
              { text: "Dòng ✗: tên toàn khoảng trắng, nhận \"ok\", mong \"thiếu tên\"; kèm đoạn mã kiểm tra tên.", good: true, feedback: "Có ca sai, kết quả thật và kết quả mong, nên AI khoanh vùng được." },
            ],
          },
          {
            id: "secret",
            label: "Dữ liệu nhạy cảm",
            options: [
              { text: "Dán nguyên cả tệp cấu hình cho AI thấy hết bối cảnh.", feedback: "Tệp cấu hình có thể chứa khoá bí mật: dán vào là làm lộ." },
              { text: "Chỉ dán đoạn mã liên quan; khoá và mật khẩu đã được giấu.", good: true, feedback: "AI đủ thông tin để sửa mà không thấy thứ không cần." },
            ],
          },
          {
            id: "scope",
            label: "Phạm vi sửa",
            options: [
              { text: "Chỉ sửa hàm kiemTraDon, giữ nguyên các hàm khác và liệt kê dòng đã đổi.", good: true, feedback: "Ranh giới rõ: sửa xong bạn đối chiếu được và các hàm khác không bị đụng." },
              { text: "Sửa luôn cho hàm gọn và tốt hơn, tôi tin bạn.", feedback: "Mở rộng phạm vi: các hàm đang chạy tốt có thể bị đổi mà không ai báo." },
            ],
          },
        ],
        responses: [
          {
            requires: ["evidence", "secret", "scope"],
            text: "Ca này sai vì chỗ kiểm tra tên chưa cắt khoảng trắng thừa nên một chuỗi toàn dấu cách vẫn được coi là có tên. Tôi chỉ đổi dòng kiểm tra tên trong kiemTraDon để cắt khoảng trắng trước khi so với chuỗi rỗng.\nThay đổi: (1) một dòng trong kiemTraDon; (2) không đổi hàm nào khác.\n(Chạy lại cả bộ thử để xác nhận.)",
          },
          {
            requires: ["evidence", "scope"],
            text: "Tôi đã sửa kiemTraDon cho ca tên toàn khoảng trắng và liệt kê dòng đổi bên dưới.\n(Sửa đúng, nhưng bản dán đầu có thể làm lộ khoá bí mật nếu tệp có chứa.)",
          },
          {
            text: "Tôi đã làm lại hàm kiểm tra đơn cho gọn hơn và cũng chỉnh vài hàm khác. Bạn chạy thử nhé.\n(Không nói rõ ca nào sai, không nói rõ đổi gì: khó kiểm.)",
          },
        ],
      },
      {
        type: "callout",
        label: "Dự án xuyên suốt: quán cà phê Hẻm - bước 9/10",
        text: "Bước 9: AI viết hàm kiểm tra đơn nhưng bộ thử cho thấy hàm còn sai hai chỗ. Đọc dòng ✗, sửa từng chỗ một và chạy lại cho tới khi qua đủ sáu ca. Chương trình cũng kiểm xem các hàm đã xong còn nguyên không.",
      },
      VIBECODE_PROJECT_EXERCISE[2748],
      {
        type: "scenario",
        title: "Hai dòng ✗ trong bộ thử",
        start: "s1",
        nodes: {
          s1: {
            text: "Bộ thử in \"Qua 4/6\" với hai dòng ✗: một về giờ 21, một về tên toàn khoảng trắng. Bạn cần chọn cách làm.",
            choices: [
              { label: "Đọc dòng ✗ về giờ 21, sửa điều kiện giờ rồi chạy lại cả bộ thử", next: "good" },
              { label: "Nhờ AI sửa tất cả cùng lúc, nhận bản mới rồi gửi luôn cho khách", next: "bad_blind" },
            ],
          },
          bad_blind: {
            text: "Bản mới trông ổn và AI báo \"đã xong\", nhưng bạn không chạy lại. Hai ngày sau khách báo đơn lúc 21 giờ vẫn bị từ chối.",
            ending: "bad",
          },
          good: {
            text: "Chạy lại được 5/6: ca giờ 21 đã qua và các ca khác vẫn qua. Bạn sửa tiếp dòng kiểm tra tên, chạy lại được 6/6 và các hàm cũ vẫn nguyên.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Đọc dòng ✗, sửa một chỗ, chạy lại cả bộ thử, rồi mới sang chỗ kế.",
          "Bài sau: ghép các phần lại thành quy trình và nghiệm thu trước khi giao cho khách.",
        ],
      },
    ],
  },
  {
    id: 2749,
    slug: "nghiem-thu-va-ban-giao-kiem-ca-quy-trinh-truoc-khi-dua-cho-khach",
    title: "Chặng 67, Bài 10: Nghiệm thu và bàn giao - kiểm cả quy trình trước khi đưa cho khách",
    subtitle: "Từng phần đúng chưa đủ: lỗi hay nằm ở chỗ ghép chúng lại với nhau.",
    duration: "16 phút",
    difficulty: "Trung bình",
    emoji: "🏁",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bạn đã có từng hàm chạy đúng, nhưng khách không dùng từng hàm: họ đặt một đơn và đi qua cả chuỗi. Nhiều lỗi chỉ lộ khi các phần ghép với nhau, như dùng nhầm con số của bước trước ở bước sau. Nghiệm thu cả quy trình và có danh sách trước khi bàn giao là bước cuối cùng giúp bạn đưa cho khách một thứ mình đã thật sự kiểm.",
    openingQuestion:
      "Ba hàm tongTien, apGiamGia, phiGiao đều qua bộ thử riêng. Ghép thành đặt hàng thì đơn 520.000đ có mã giảm giá tính sai phí giao. Vì sao?",
    openingOptions: [
      "Hàm phiGiao viết sai nên cần viết lại, dù bộ thử riêng của nó vẫn qua",
      "Hàm đúng riêng lẻ, nhưng chỗ ghép đưa nhầm số tiền trước giảm vào phí giao",
      "Mã giảm giá GIAM10 tính sai phần trăm nên phí giao lệch theo",
      "Số lượng 20 ly quá lớn nên chương trình cộng dồn sai ở bước tính tổng",
    ],
    correctOption: 1,
    explanation:
      "Mỗi hàm làm đúng việc của nó khi được đưa đúng con số. Lỗi nằm ở chỗ ghép: quy tắc quán là phí giao tính theo số tiền sau giảm, nhưng datHang lại đưa số tiền trước giảm vào phiGiao. Đơn 520.000đ trước giảm được miễn phí, trong khi sau giảm còn 468.000đ và phải trả 30.000đ phí giao. Bộ thử riêng của từng hàm không bao giờ thấy lỗi này vì không ai ghép chúng lại để thử.",
    diagram: [
      { label: "Từng hàm qua bộ thử riêng của nó", arrow: true },
      { label: "Ghép thành quy trình đặt hàng", arrow: true },
      { label: "Chạy bảng nghiệm thu năm ca trên cả quy trình", arrow: true },
      { label: "Qua hết và đủ danh sách thì mới bàn giao" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một bạn làm xong ba hàm, hàm nào cũng qua bộ thử riêng nên gửi cho quán dùng thử. Đơn nhỏ vẫn đúng. Đến đơn lớn có mã giảm giá, phí giao bị tính theo giá chưa giảm nên mỗi đơn lệch 30.000đ. Nếu có một bảng nghiệm thu năm ca chạy trên cả quy trình, lỗi này lộ ra ngay từ lần chạy đầu.",
    },
    quiz: [
      {
        question: "Vì sao phải nghiệm thu cả quy trình, không chỉ từng hàm?",
        options: [
          "Mỗi hàm chỉ được phép kiểm tra đúng một lần trong suốt dự án",
          "Hàm riêng lẻ luôn không qua bộ thử nếu chưa ghép vào nhau",
          "Lỗi hay nằm ở chỗ ghép các phần đúng riêng lẻ",
          "Nghiệm thu cả quy trình thay được việc viết ca thử cho từng hàm",
        ],
        correct: 2,
        explanation:
          "Một hàm đúng với đầu vào của nó vẫn có thể bị đưa nhầm số ở bước sau, và chỉ khi chạy cả chuỗi mới thấy. Hàm riêng lẻ qua bộ thử được, không có giới hạn một lần kiểm tra. Nghiệm thu cả quy trình bổ sung chứ không thay thế ca thử riêng của từng hàm.",
      },
      {
        question: "Bảng nghiệm thu năm ca nên gồm những loại ca nào?",
        options: [
          "Mọi tổ hợp món, mã và số điện thoại có thể có, càng nhiều càng chắc",
          "Chỉ ca sai, vì ca thường chắc chắn đã chạy đúng lúc viết",
          "Ca thường, ca biên và ca sai, kể cả ca ghép nhiều tính năng",
          "Ca thường của từng hàm, bỏ ca sai vì khách ít gặp",
        ],
        correct: 2,
        explanation:
          "Ba loại ca thường, biên và sai phủ những chỗ lỗi hay nằm, và ca ghép nhiều tính năng (đơn lớn có mã giảm giá) kiểm chính chỗ ghép. Cố thử mọi tổ hợp là không làm nổi. Bỏ ca thường hay ca sai đều để hở một nhóm lỗi: ca sai như số điện thoại sai hoặc giỏ trống là thứ khách làm hằng ngày.",
      },
      {
        question: "Trước khi bàn giao, khoá bí mật như mật khẩu và mã truy cập nên ở đâu?",
        options: [
          "Trong tệp mã, để chương trình tìm thấy dễ nhất",
          "Trong ghi chú đầu tệp để cả nhóm cùng nhìn thấy",
          "Ngoài mã nguồn, cất ở chỗ riêng và không dán vào lời nhờ AI",
          "Trong ảnh chụp màn hình gửi kèm cho khách xem",
        ],
        correct: 2,
        explanation:
          "Khoá để trong mã sẽ đi theo mã tới bất cứ ai nhận được nó, kể cả khi bạn dán mã cho AI hay đưa cho khách. Vì vậy chúng phải nằm ngoài mã, ở nơi cất riêng. Ghi chú đầu tệp và ảnh chụp màn hình cũng là các nơi mà người khác nhìn thấy.",
      },
      {
        question: "Mục nào nên có trong danh sách trước khi bàn giao?",
        options: [
          "AI đã xác nhận bằng lời rằng toàn bộ mã đều chạy đúng",
          "Có cách quay lại bản cũ nếu bản mới gặp sự cố",
          "Mã nguồn đã được làm cho thật ngắn và đẹp mắt",
          "Khách đã đọc hết từng dòng mã trước khi nhận",
        ],
        correct: 1,
        explanation:
          "Bản mới nào cũng có thể gặp sự cố, nên cần sẵn cách quay về bản đang chạy tốt. Lời xác nhận của AI không phải bằng chứng, mã ngắn đẹp không làm sản phẩm đúng hơn, và khách dùng sản phẩm chứ không phải đọc mã.",
      },
      {
        question: "AI chỉ đổi một dòng trong datHang. Bạn nên nghiệm thu thế nào?",
        options: [
          "Chỉ chạy ca vừa sửa, vì một dòng thì không thể ảnh hưởng ca khác",
          "Chạy lại cả bảng nghiệm thu, không chỉ ca vừa sửa",
          "Bỏ qua nghiệm thu vì bản trước đã qua và thay đổi rất nhỏ",
          "Đọc lại dòng vừa đổi, thấy hợp lý thì xem như đã nghiệm thu xong",
        ],
        correct: 1,
        explanation:
          "Một dòng đổi trong hàm ghép có thể ảnh hưởng nhiều ca, nên chạy lại cả bảng mới thấy đủ. Nghĩ rằng một dòng không thể làm hỏng chỗ khác chính là điều khiến lỗi lọt qua. Bản trước qua không chứng minh bản sau qua, và đọc thấy hợp lý chưa phải là chạy thấy đúng.",
      },
    ],
    keyTakeaways: [
      "Các phần đúng riêng lẻ vẫn có thể sai khi ghép; nghiệm thu phải chạy trên cả quy trình.",
      "Bảng nghiệm thu có ca thường, ca biên, ca sai và ít nhất một ca ghép nhiều tính năng.",
      "Danh sách bàn giao: đã chạy ba loại ca, đã xem thay đổi, khoá bí mật ngoài mã, có đường quay lại bản cũ.",
      "Sửa dù chỉ một dòng cũng phải chạy lại cả bảng nghiệm thu.",
      "Cả chặng: giao việc rõ, chia bước, đặt ranh giới, nghiệm thu, đọc mã, tìm lỗi, đọc diff, bộ thử, bàn giao.",
    ],
    practicePrompt: {
      question: "Trước khi đưa cho khách, bạn nên giữ gì để quay lại nếu bản mới có lỗi?",
      options: [
        "Một bản sao của phiên bản đang chạy tốt, đặt tên rõ ràng",
        "Ảnh chụp màn hình các kết quả đẹp để làm bằng chứng",
        "Lời hứa của AI sẽ sửa nhanh nếu khách báo lỗi",
        "Tên các hàm cũ ghi trên giấy để gõ lại khi cần",
      ],
      correct: 0,
      explanation:
        "Bản sao đang chạy tốt cho phép quay về ngay trong vài phút. Ảnh chụp màn hình không chạy được, lời hứa của AI không kiểm được, và gõ lại hàm cũ từ tên thì không khôi phục được phần mã.",
    },
    summary: {
      keyIdea: "Nghiệm thu cả quy trình bằng bảng năm ca rồi mới bàn giao, kèm cách quay lại bản cũ.",
      formula: "Sẵn sàng giao = qua cả bảng nghiệm thu + đủ danh sách bàn giao.",
      commonMistake: "Tin rằng từng hàm qua bộ thử riêng thì ghép lại chắc chắn đúng.",
      action: "Viết bảng năm ca cho sản phẩm của bạn, gồm một ca ghép nhiều tính năng, và chạy trước khi giao.",
    },
    application: {
      title: "Làm ngay trong 15 phút",
      message:
        "Chọn một sản phẩm nhỏ bạn đã làm. Viết bảng nghiệm thu năm ca: thường, biên, sai và hai ca ghép nhiều tính năng. Chạy cả bảng, sửa một chỗ nếu có ca sai, rồi chạy lại cả bảng và đối chiếu danh sách bàn giao.",
      secondary: "Giữ một bản sao đang chạy tốt trước mỗi lần thay đổi, kể cả thay đổi nhỏ.",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn có bốn hàm, hàm nào cũng qua bộ thử riêng. Nhưng khách không dùng bốn hàm; khách đặt một đơn và đi qua cả chuỗi. Bài cuối này dạy cách kiểm cả chuỗi trước khi giao, và nhìn lại những gì bạn đã học cả chặng.",
      },
      {
        type: "feynman",
        title: "Nghiệm thu đơn giản hơn bạn nghĩ",
        intro: "Thợ làm xong từng phần căn nhà, nhưng chủ nhà chỉ chịu nhận khi đã đi một vòng, bật vòi, bật đèn và đóng cửa thử.",
        columns: ["Điều cần làm", "Với căn nhà", "Với phần mềm"],
        rows: [
          ["Kiểm từng phần", "Ống nước thử áp, dây điện thử tải", "Mỗi hàm qua bộ thử riêng"],
          ["Kiểm chỗ ghép", "Bật vòi xem nước có chảy tới bồn không", "Chạy cả quy trình đặt hàng bằng một đơn thật"],
          ["Thử tình huống xấu", "Cúp điện thì cầu dao có ngắt không", "Số điện thoại sai, giỏ trống, đơn rất lớn"],
          ["Giữ đường lui", "Giữ bản vẽ cũ để sửa lại", "Giữ bản cũ để quay về khi bản mới lỗi"],
        ],
        oneLiner: "Từng phần đúng chưa đủ; phải đi hết cả đường mới biết chỗ ghép có đúng.",
      },
      {
        type: "flow",
        title: "Từ ba hàm đúng tới một quy trình sẵn sàng giao",
        steps: [
          { label: "Ghép các hàm", detail: "datHang gọi kiểm tra đơn, tính tiền, giảm giá, phí giao." },
          { label: "Lập bảng nghiệm thu", detail: "Năm đơn thử: thường, lớn không mã, lớn có mã, sai số điện thoại, giỏ trống." },
          { label: "Chạy cả bảng", detail: "Mỗi dòng ✗ cho biết đơn nào chưa đạt." },
          { label: "Sửa từng chỗ một", detail: "Sửa một chỗ, chạy lại cả bảng, như bài trước." },
          { label: "Đối chiếu danh sách bàn giao", detail: "Đủ các mục thì mới đưa cho khách." },
        ],
      },
      { type: "heading", text: "Vì sao lỗi nằm ở chỗ ghép" },
      {
        type: "paragraph",
        text: "Quy tắc quán là phí giao tính theo số tiền sau khi giảm giá. Hàm phiGiao nhận một con số và trả phí; nó đúng với mọi con số bạn đưa. Nhưng nếu chỗ ghép đưa số tiền trước giảm thì phí vẫn sai, dù không hàm nào sai. Đó là lý do chỉ chạy cả đơn mới thấy.",
      },
      {
        type: "comparison",
        left: {
          label: "Chỉ kiểm từng hàm",
          text: "Mỗi hàm qua hết ca thử của nó và bạn thấy yên tâm. Nhưng không ai thử đơn lớn có mã giảm giá đi qua cả chuỗi, nên lỗi ở chỗ ghép lọt tới tay khách.",
        },
        right: {
          label: "Kiểm cả quy trình",
          text: "Bảng năm đơn chạy qua toàn bộ datHang. Ca đơn lớn có mã giảm giá lộ ngay phí giao sai, và bạn sửa đúng một chỗ trước khi giao.",
        },
      },
      { type: "heading", text: "Danh sách trước khi bàn giao" },
      {
        type: "list",
        items: [
          "Đã chạy ba loại ca: thường, biên và sai, trong đó có ca ghép nhiều tính năng.",
          "Đã xem thay đổi lần cuối (diff) và mọi dòng đổi đều nằm trong phạm vi đã dặn.",
          "Khoá bí mật không nằm trong mã và chưa từng được dán vào lời nhờ AI.",
          "Có cách quay lại bản cũ nếu bản mới gặp sự cố.",
        ],
      },
      {
        type: "callout",
        label: "Báo cáo \"đã xong\" chưa phải bằng chứng",
        text: "Điều đúng với từng bài trong chặng này vẫn đúng ở bài cuối: bạn chỉ tin kết quả đã tự chạy và nhìn thấy, không tin lời báo cáo.",
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soi bản báo cáo bàn giao của AI",
        task: "AI gửi bản báo cáo trước khi bàn giao. Bấm vào những dòng không đạt chuẩn bàn giao, rồi nộp.",
        segments: [
          { text: "Đã chạy cả bảng nghiệm thu năm đơn thử trên datHang: 5/5 đạt." },
          { text: "Khoá truy cập được đặt thẳng trong tệp mã cho tiện triển khai.", error: "Không đạt: khoá bí mật phải nằm ngoài mã, nếu không nó đi theo mã tới mọi người nhận được." },
          { text: "Chưa chạy ca giỏ trống vì ca này rất hiếm xảy ra.", error: "Không đạt: ca sai là một trong ba loại ca bắt buộc và khách vẫn gặp nó." },
          { text: "Bản đang chạy tốt đã được lưu lại để quay về khi cần." },
          { text: "Danh sách thay đổi so với bản trước chỉ gồm một dòng trong datHang." },
        ],
      },
      {
        type: "callout",
        label: "Dự án xuyên suốt: quán cà phê Hẻm - bước 10/10",
        text: "Bước cuối: ghép bốn tính năng thành datHang, chạy bảng nghiệm thu năm đơn, tìm đơn không đạt và sửa đúng một chỗ trong datHang. Khi qua đủ năm đơn, quy trình sẵn sàng giao khách.",
      },
      VIBECODE_PROJECT_EXERCISE[2749],
      {
        type: "scenario",
        title: "Trước giờ giao cho quán",
        start: "s1",
        nodes: {
          s1: {
            text: "Bốn hàm đã xong và AI báo \"đã ghép xong, chạy tốt\". Quán hẹn nhận sản phẩm sáng mai.",
            choices: [
              { label: "Chạy bảng nghiệm thu năm đơn trên cả datHang trước khi giao", next: "s2" },
              { label: "Gửi luôn cho quán, vì AI đã báo chạy tốt", next: "bad_trust" },
            ],
          },
          bad_trust: {
            text: "Sáng hôm sau quán báo đơn lớn có mã giảm giá bị tính phí giao sai. Bạn phải sửa trong lúc quán đang mở cửa.",
            ending: "bad",
          },
          s2: {
            text: "Bảng báo một dòng ✗: đơn lớn có mã giảm giá sai phí giao. Bạn sửa đúng một chỗ trong datHang. Bước tiếp theo là gì?",
            choices: [
              { label: "Chạy lại cả bảng năm đơn, rồi đối chiếu danh sách bàn giao", next: "good" },
              { label: "Chỉ chạy lại đơn vừa sửa rồi gửi đi", next: "bad_partial" },
            ],
          },
          bad_partial: {
            text: "Đơn vừa sửa qua, nhưng thay đổi làm đơn giỏ trống bị trả sai. Bạn chỉ biết khi quán gọi điện.",
            ending: "bad",
          },
          good: {
            text: "Cả năm đơn đạt, khoá bí mật nằm ngoài mã và bản cũ đã được giữ lại. Bạn giao cho quán với một danh sách rõ ràng thay vì hy vọng.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Bạn đã đi hết chặng: giao việc rõ, chia bước, ranh giới, nghiệm thu, đọc mã, tìm lỗi, đọc diff, bộ thử và bàn giao.",
          "Bước tiếp theo: học cách giữ lại các phiên bản cũ và đưa sản phẩm lên mạng trong hành trình giữ bản cũ và đưa lên mạng.",
        ],
      },
    ],
  },
];
