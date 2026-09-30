import type { Lesson } from "../lesson-types";

// Chặng 61, bài 16-20. Giáo trình: scripts/curriculum/stage-61.json.
// Dạy khái niệm bền (đọc công thức từng mảnh, thử trên dòng đã biết đáp án, rà vùng tham chiếu,
// tách vùng nhập/tính/kiểm); không nêu đường dẫn nút bấm, giá hay phiên bản của Excel / Google Sheets.
// Tên hàm dùng trong ví dụ (IFERROR, VLOOKUP, TRIM, UPPER, SUM, COUNTA) có ở cả Excel và Google Sheets.
export const S61_D_LESSONS: Lesson[] = [
  {
    id: 2635,
    slug: "ai-viet-cong-thuc-dai-doc-tung-manh-truoc-khi-tin",
    title: "Chặng 61, Bài 16: AI viết công thức dài: tách từng mảnh đọc trước khi tin",
    subtitle: "Đọc công thức dài như đọc một hoá đơn: từng dòng một, rồi mới tin tổng.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🔬",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "AI viết công thức dài rất nhanh và trông rất chắc chắn. Nhưng công thức bạn không hiểu là công thức bạn không sửa được khi nó sai, và nó sẽ sai đúng lúc sếp hỏi. Tách công thức thành từng mảnh, nhờ AI giải thích từng mảnh rồi tự đoán kết quả cho một dòng là cách đọc hiểu trong năm phút thay vì tin mù.",
    openingQuestion:
      "AI đưa bạn một công thức dài bốn hàm lồng nhau cho cột Nhóm khách. Nó chạy ra kết quả trông hợp lý. Bước hợp lý nhất trước khi kéo xuống cả bảng là gì?",
    openingOptions: [
      "Nhờ AI giải thích từng mảnh, rồi tự đoán kết quả của một dòng",
      "Kéo xuống cả bảng vì kết quả trông hợp lý là đủ",
      "Hỏi AI: bạn chắc chắn công thức này đúng chứ, rồi tin câu trả lời có",
      "Xoá bớt hai hàm cho công thức ngắn lại, dễ nhìn hơn",
    ],
    correctOption: 0,
    explanation:
      "Kết quả trông hợp lý chưa chứng minh gì: công thức sai vẫn cho ra con số nhìn rất bình thường. Hỏi AI chắc chưa thì nó gần như luôn đáp là chắc, nên đó không phải kiểm chứng. Tự xoá hàm khi chưa hiểu còn làm hỏng chỗ đang đúng. Tách từng mảnh và tự đoán trước kết quả một dòng cho bạn một phép thử độc lập: đoán và kết quả thật khớp thì mới yên tâm.",
    diagram: [
      { label: "Công thức dài AI vừa viết", arrow: true },
      { label: "Tách thành từng mảnh, từ hàm trong cùng ra ngoài", arrow: true },
      { label: "Nhờ AI giải thích mỗi mảnh bằng lời thường", arrow: true },
      { label: "Bạn tự đoán kết quả một dòng, rồi so với kết quả thật" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: kế toán công nợ",
      description:
        "Một kế toán dán công thức AI viết vào cột tra giá, kéo xuống 600 dòng và gửi bảng đi. Hai tuần sau mới biết cả nhóm mã hàng có chữ hoa lẫn chữ thường bị tra ra Không thấy, vì công thức không xử lý chữ hoa. Đây là tình huống minh hoạ; chỉ cần đọc từng mảnh trước khi kéo, lỗi này sẽ lộ ra ở mảnh thứ hai.",
    },
    quiz: [
      {
        question: "Công thức lồng nhiều hàm nên được đọc theo thứ tự nào để dễ hiểu nhất?",
        options: [
          "Từ hàm trong cùng ra ngoài, mỗi hàm một bước",
          "Từ trái sang phải, đọc đến đâu tin đến đó",
          "Bỏ qua hàm phụ, chỉ đọc hàm đứng ngoài cùng",
          "Đọc từ hàm ngoài cùng vào, vì đó là hàm quan trọng nhất",
        ],
        correct: 0,
        explanation:
          "Bảng tính tính hàm trong cùng trước, rồi đưa kết quả cho hàm bao ngoài, nên đọc theo đúng thứ tự máy tính mới hiểu được từng bước. Đọc từ trái sang phải hay chỉ đọc hàm ngoài cùng bỏ lọt những bước làm sạch hoặc tra cứu nằm bên trong, nơi lỗi hay xảy ra.",
      },
      {
        question: "Bạn hỏi AI: công thức này đúng chứ? và nó đáp: đúng. Điều đó chứng minh được gì?",
        options: [
          "Chưa chứng minh gì, vì AI hầu như luôn đáp là đúng",
          "Công thức đúng, vì AI đã tự soát lại công thức của nó",
          "Công thức đúng cho mọi dòng, kể cả dòng trống hoặc âm",
          "Công thức đúng ít nhất với dòng bạn đang xem trên màn hình",
        ],
        correct: 0,
        explanation:
          "AI dự đoán câu nghe hợp lý nhất, và câu đáp đúng rất hợp lý sau câu hỏi chắc chứ. Nó không chạy thử công thức trên bảng của bạn. Kiểm chứng thật là tự đoán một dòng rồi so kết quả; câu đáp của AI không phải bằng chứng cho dòng nào, kể cả dòng trên màn hình.",
      },
      {
        question: "Ô A2 chứa chữ ' abc12 ' (thừa dấu cách hai đầu). Hàm TRIM(A2) cho kết quả gì?",
        options: [
          "abc12, không còn dấu cách thừa ở hai đầu",
          "ABC12, vì TRIM cũng đổi chữ thường thành chữ hoa luôn",
          "abc, vì TRIM cắt bỏ phần số ở cuối chuỗi ký tự",
          "' abc12 ' giữ nguyên, vì TRIM chỉ xử lý ô có số thuần",
        ],
        correct: 0,
        explanation:
          "TRIM chỉ bỏ dấu cách thừa ở đầu và cuối (và rút gọn dấu cách đôi ở giữa), không đổi hoa thường và không đụng tới số. Đổi sang chữ hoa là việc của UPPER. Hiểu đúng việc từng hàm làm là lý do phải tách mảnh: AI có thể lồng hàm đúng mà bạn vẫn đọc nhầm nó làm gì.",
      },
      {
        question: "Vì sao nên tự đoán kết quả của một dòng TRƯỚC khi nhìn kết quả công thức?",
        options: [
          "Đoán trước giữ cho bạn khỏi tin kết quả chỉ vì nó hiện ra",
          "Vì nhìn kết quả trước sẽ làm công thức chạy chậm hơn",
          "Vì AI chỉ tính đúng khi người dùng đã đoán sẵn đáp số",
          "Vì đoán đúng thì công thức không cần kiểm thêm dòng nào nữa",
        ],
        correct: 0,
        explanation:
          "Nhìn kết quả xong mới nghĩ thì não dễ thấy nó hợp lý và bỏ qua lỗi. Đoán trước buộc bạn tự lần theo từng mảnh. Một dòng khớp chưa đủ cho cả bảng (bài sau sẽ thử năm dòng), nhưng không có bước đoán thì bạn không có gì để so.",
      },
      {
        question: "AI giải thích: VLOOKUP tìm mã trong cột đầu của Bang rồi lấy cột thứ 3. Bảng Bang có 5 cột. Cột thứ 3 là cột nào?",
        options: [
          "Cột thứ ba tính từ cột ĐẦU của vùng tra, không phải từ cột A của cả sheet",
          "Cột C của cả sheet, dù vùng tra bắt đầu từ cột B",
          "Cột thứ ba tính từ bên phải, ngược lại với cách đếm thông thường",
          "Cột thứ ba của sheet hiện tại, không phải của bảng Bang",
        ],
        correct: 0,
        explanation:
          "Số cột trong VLOOKUP đếm trong vùng tra, bắt đầu từ cột đầu của vùng đó. Nếu vùng bắt đầu ở cột B thì cột thứ ba là cột D. Đếm theo chữ cột của cả sheet hay đếm từ bên phải đều cho ra cột khác, và đó là kiểu lỗi công thức vẫn chạy nhưng lấy nhầm cột.",
      },
    ],
    keyTakeaways: [
      "Công thức dài đọc từ hàm trong cùng ra ngoài, mỗi hàm một bước.",
      "Nhờ AI giải thích từng mảnh bằng lời thường, đừng hỏi nó có đúng không.",
      "Tự đoán kết quả một dòng TRƯỚC khi nhìn kết quả, rồi so.",
      "Công thức không lỗi vẫn có thể lấy nhầm cột hoặc bỏ sót trường hợp.",
    ],
    practicePrompt: {
      question:
        "Công thức =IFERROR(VLOOKUP(UPPER(TRIM(A2)),Bang!A:C,3,FALSE),\"Không thấy\") trả về Không thấy cho mã ' ab-07 ' (có dấu cách thừa, bảng ghi AB-07). Mảnh nào xử lý đúng việc này?",
      options: [
        "UPPER(TRIM(A2)) làm sạch dấu cách và đổi hoa trước khi tra",
        "IFERROR, vì nó tìm lại mã khi lần tra đầu thất bại",
        "FALSE, vì nó cho phép tra gần đúng khi mã viết hơi khác so với bảng",
        "Bang!A:C, vì vùng tra càng rộng thì càng dễ tìm ra mã",
      ],
      correct: 0,
      explanation:
        "TRIM bỏ dấu cách thừa và UPPER đưa về chữ hoa, nên ' ab-07 ' thành AB-07 khớp bảng. IFERROR chỉ che lỗi bằng chữ Không thấy, không tìm lại. FALSE nghĩa là khớp chính xác, đúng ngược với tra gần đúng. Vùng rộng hơn không làm khớp thêm mã nào.",
    },
    summary: {
      keyIdea: "Công thức dài chỉ đáng tin khi bạn đọc được từng mảnh và đoán đúng kết quả một dòng.",
      formula: "Tách mảnh → AI giải thích từng mảnh → tự đoán một dòng → so với kết quả thật.",
      commonMistake: "Hỏi AI công thức có đúng không rồi tin câu trả lời có.",
      action: "Lấy một công thức dài đang dùng, viết ra giấy mỗi hàm làm gì, tự đoán một dòng rồi so.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Mở một công thức dài có từ 3 hàm trở lên trong tệp của bạn (hoặc nhờ AI viết một công thức cho cột bạn cần). Dán công thức cho AI, nhờ giải thích từng hàm bằng lời thường, rồi chọn một dòng, tự viết kết quả bạn đoán ra giấy trước khi nhìn ô. Ghi lại: đoán khớp hay lệch, và hàm nào bạn đọc nhầm.",
      secondary: "Ngày mai dashboard sẽ hỏi bạn: công thức nào bạn đã tách mảnh, và hàm nào từng đọc nhầm?",
    },
    sections: [
      {
        type: "lead",
        text: "Sáng thứ Hai, bạn nhờ AI viết công thức tra nhóm khách cho cột G. Nó trả về một dòng dài bốn hàm lồng nhau, bạn dán vào, cột G hiện đầy chữ. Trông ổn. Sếp hỏi: cột này lấy từ đâu ra? Bạn cần đọc được nó trước khi ai đó hỏi.",
      },
      {
        type: "feynman",
        title: "Đọc công thức dài đơn giản hơn bạn nghĩ",
        intro: "Công thức dài giống một hoá đơn nhiều dòng: bạn không tin tổng tiền cho tới khi đã lướt từng dòng hàng.",
        columns: ["Thành phần", "Hoá đơn nhiều dòng", "Công thức dài"],
        rows: [
          ["Đơn vị nhỏ nhất", "Một dòng hàng: tên, số lượng, giá", "Một hàm: tên hàm và các ô nó nhận"],
          ["Cách kiểm", "Đọc từng dòng rồi mới nhìn tổng", "Đọc từng hàm từ trong ra ngoài rồi mới nhìn kết quả"],
          ["Dấu hiệu sai", "Một dòng hàng lạ giữa hoá đơn", "Một hàm làm khác việc bạn tưởng"],
          ["Phép thử cuối", "Tự nhẩm tổng vài dòng rồi so với tổng in sẵn", "Tự đoán một dòng rồi so với ô công thức"],
        ],
        oneLiner: "Công thức dài là hoá đơn nhiều dòng: đọc từng dòng, đoán tổng, rồi mới tin số cuối.",
      },
      { type: "heading", text: "Một công thức, bốn hàm, bốn việc" },
      {
        type: "paragraph",
        text: "Hãy xem công thức AI viết: IFERROR(VLOOKUP(UPPER(TRIM(A2)),Bang!A:C,3,FALSE),Không thấy). Nghe đáng sợ, nhưng chỉ là bốn việc xếp chồng. TRIM bỏ dấu cách thừa. UPPER đưa về chữ hoa. VLOOKUP tra mã đó trong bảng Bang. IFERROR thay lỗi bằng chữ Không thấy. Bạn chỉ cần nhớ thêm hai từ mới: hàm lồng nhau nghĩa là kết quả hàm này là đầu vào hàm kia, và tham chiếu là ô hay vùng mà hàm đọc.",
      },
      {
        type: "flow",
        title: "Công thức chạy từ trong ra ngoài",
        steps: [
          {
            label: "TRIM(A2)",
            detail: "Lấy nội dung ô A2 và bỏ dấu cách thừa ở hai đầu. Ô ' ab-07 ' thành 'ab-07'.",
          },
          {
            label: "UPPER(...)",
            detail: "Nhận kết quả bước trước và đổi sang chữ hoa: 'ab-07' thành 'AB-07', để khớp cách bảng Bang ghi mã.",
          },
          {
            label: "VLOOKUP(..., Bang!A:C, 3, FALSE)",
            detail: "Tìm AB-07 ở cột đầu của vùng Bang, khớp chính xác, rồi lấy giá trị ở cột thứ 3 của vùng đó, tức cột nhóm khách.",
          },
          {
            label: "IFERROR(..., Không thấy)",
            detail: "Nếu bước tra ra lỗi vì mã không có trong bảng thì hiện chữ Không thấy thay vì mã lỗi. Lưu ý: nó che lỗi, không sửa lỗi.",
          },
        ],
      },
      { type: "heading", text: "Nhờ AI giải thích, đừng nhờ AI bảo đảm" },
      {
        type: "list",
        items: [
          "Dán công thức, dặn: giải thích từng hàm từ trong ra ngoài, mỗi hàm một câu, cho tôi ví dụ với ô A2 = ' ab-07 '.",
          "Hỏi thêm: hàm nào có thể cho kết quả sai mà không báo lỗi? (thường là hàm tra cứu và hàm che lỗi).",
          "Bạn tự đoán kết quả một dòng ra giấy trước, rồi mới nhìn ô.",
          "Không hỏi: công thức đúng chứ? - AI gần như luôn đáp đúng.",
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI giải thích công thức từng mảnh",
        task: "Bạn cần hiểu công thức tra nhóm khách ở trên trước khi kéo xuống 600 dòng. Lắp một yêu cầu để AI giải thích sao cho bạn tự kiểm được.",
        parts: [
          {
            id: "give",
            label: "Đưa gì cho AI",
            options: [
              {
                text: "Công thức đầy đủ, một ví dụ ô A2 thật và cấu trúc bảng Bang (cột nào là mã, cột nào là nhóm khách).",
                good: true,
                feedback: "AI có đủ dữ kiện để giải thích bằng đúng ví dụ của bạn, nên bạn đối chiếu được.",
              },
              {
                text: "Chỉ nói: có một công thức tra cứu, giải thích giúp tôi.",
                feedback: "Không có công thức thì AI bịa ra một công thức nghe giống rồi giải thích nó, và bạn đang hiểu công thức không phải của mình.",
              },
            ],
          },
          {
            id: "ask",
            label: "Yêu cầu giải thích",
            options: [
              {
                text: "Giải thích từng hàm từ trong ra ngoài, mỗi hàm một câu, kèm kết quả trung gian cho ví dụ A2.",
                good: true,
                feedback: "Kết quả trung gian của từng bước cho bạn chỗ để tự đối chiếu, không phải tin suông.",
              },
              {
                text: "Công thức này có đúng không? Trả lời ngắn gọn.",
                feedback: "AI sẽ đáp đúng cho ngắn gọn. Bạn mất cả bước hiểu lẫn bước kiểm.",
              },
            ],
          },
          {
            id: "risk",
            label: "Hỏi thêm về rủi ro",
            options: [
              {
                text: "Chỉ cho tôi hàm nào có thể cho kết quả sai mà không báo lỗi, và một dòng dữ liệu sẽ làm nó sai.",
                good: true,
                feedback: "Bạn có sẵn một dòng thử để kiểm tra, thay vì chỉ có lời trấn an.",
              },
              {
                text: "Hãy chắc chắn công thức không có lỗi nào.",
                feedback: "AI không chạy công thức trên bảng của bạn nên không thể bảo đảm, nó chỉ nói câu nghe chắc chắn.",
              },
            ],
          },
        ],
        responses: [
          {
            requires: ["give", "ask", "risk"],
            text: "Từ trong ra ngoài, với A2 = ' ab-07 ':\n1) TRIM: ' ab-07 ' thành 'ab-07'.\n2) UPPER: thành 'AB-07'.\n3) VLOOKUP: tìm 'AB-07' ở cột đầu của Bang, lấy cột thứ 3 (nhóm khách), ví dụ 'Nhóm B'.\n4) IFERROR: nếu mã không có trong Bang thì hiện 'Không thấy'.\nHàm dễ sai êm: IFERROR - nó che cả lỗi do gõ sai vùng tra. Dòng thử: mã có trong bảng nhưng ghi dạng 'AB 07' (dấu cách thay dấu gạch) sẽ ra 'Không thấy'.",
          },
          {
            requires: ["give", "ask"],
            text: "4 hàm: TRIM bỏ dấu cách, UPPER đổi hoa, VLOOKUP tra mã, IFERROR thay lỗi bằng Không thấy. Ví dụ A2 = ' ab-07 ' cho 'Nhóm B'.\n(Giải thích rõ nhưng chưa nói hàm nào có thể sai êm, nên bạn chưa biết dòng nào cần thử.)",
          },
          {
            text: "Công thức này dùng hàm tra cứu để lấy thông tin khách từ một bảng khác và xử lý lỗi. Công thức này đúng và an toàn để kéo xuống cả bảng.\n(AI trả lời chung chung, không có ví dụ, rồi trấn an: bạn chưa hiểu thêm gì mà vẫn được khuyên tin.)",
          },
        ],
      },
      {
        type: "callout",
        label: "Cẩn thận với hàm che lỗi",
        text: "IFERROR biến mọi lỗi thành một chữ dễ nhìn, kể cả lỗi do công thức viết sai. Một cột đầy chữ Không thấy có thể là dữ liệu thiếu thật, hoặc công thức lấy nhầm vùng. Đếm xem bao nhiêu dòng ra Không thấy rồi xem vài dòng đó: con số bất thường là tín hiệu cần đọc lại công thức.",
      },
      {
        type: "scenario",
        title: "Công thức mới của AI: kéo hay đọc?",
        start: "s1",
        nodes: {
          s1: {
            text: "4 giờ chiều, sếp cần cột nhóm khách trước 5 giờ. AI vừa viết công thức 4 hàm, cột G hiện kết quả trông hợp lý cho 5 dòng đầu. Còn 600 dòng.",
            choices: [
              { label: "Kéo xuống hết 600 dòng, gửi sếp vì trông ổn rồi", next: "bad_blind" },
              { label: "Nhờ AI giải thích từng hàm và tự đoán kết quả dòng 2 ra giấy", next: "s2" },
            ],
          },
          bad_blind: {
            text: "Sếp lọc thử và thấy 140 dòng ra Không thấy. Bạn không biết vì sao và không sửa được vì chưa đọc công thức. Bạn mất cả buổi tối tìm lỗi.",
            ending: "bad",
          },
          s2: {
            text: "Bạn đoán dòng 2 (mã ' ab-07 ') ra Nhóm B, ô thật ra Nhóm B. Nhưng khi đọc lời giải thích, bạn để ý IFERROR che lỗi, và có 600 dòng mà bạn mới thử một.",
            choices: [
              { label: "Đếm số dòng ra Không thấy rồi mở vài dòng đó xem vì sao", next: "good" },
              { label: "Bỏ IFERROR đi cho khỏi che lỗi, rồi gửi sếp cột đầy mã lỗi", next: "bad_raw" },
            ],
          },
          bad_raw: {
            text: "Cột G giờ đầy mã lỗi. Bạn thực ra đã thấy đúng vấn đề nhưng bỏ chỗ che thay vì tìm nguyên nhân, và sếp nhận một cột khó đọc.",
            ending: "bad",
          },
          good: {
            text: "Có 12 dòng Không thấy: mã ghi 'AB 07' thay vì 'AB-07'. Bạn sửa 12 dòng hoặc nhờ AI thêm bước chuẩn hoá dấu gạch, và gửi sếp lúc 4 giờ 50 với ghi chú: 12 dòng mã sai định dạng đã sửa.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Đọc từng mảnh, đoán một dòng, rồi mới kéo cả bảng.",
          "Bài sau: thử công thức trên năm dòng bạn đã biết đáp án, gồm cả dòng lạ.",
        ],
      },
    ],
  },
  {
    id: 2636,
    slug: "thu-cong-thuc-ai-tren-5-dong-ban-biet-dap-an",
    title: "Chặng 61, Bài 17: Thử công thức AI trên 5 dòng mà bạn đã biết đáp án",
    subtitle: "Thử như thử giày: đi vài bước trước khi ra khỏi cửa hàng.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🧪",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Một dòng khớp không nói được gì về dòng trống, số âm hay dòng trùng. Những dòng lạ đó hiếm nên lọt qua mắt, nhưng chúng là nơi công thức hay sai. Chọn sẵn năm dòng gồm cả trường hợp lạ và ghi đáp án mong muốn trước khi chạy là bộ thử nhỏ nhất bắt được phần lớn lỗi thường gặp.",
    openingQuestion:
      "Công thức tính tiền hoàn cho 300 dòng vừa viết xong. Bạn chỉ có thời gian thử trên 5 dòng. Nên chọn 5 dòng nào?",
    openingOptions: [
      "Năm dòng khác kiểu nhau, có cả dòng trống, số âm, trùng lặp",
      "Năm dòng đầu của bảng, vì dễ tìm nhất",
      "Năm dòng bình thường nhất, để chắc chắn nó chạy được",
      "Năm dòng chọn ngẫu nhiên bằng cách nhắm mắt chỉ vào màn hình",
    ],
    correctOption: 0,
    explanation:
      "Công thức sai hiếm khi sai ở dòng bình thường; nó sai ở dòng trống, số âm, số 0, dòng trùng. Năm dòng đầu hay giống nhau nên mỗi lần thử gần như lặp lại một phép thử. Dòng bình thường nhất chỉ xác nhận điều bạn đã tin. Chọn có chủ đích các dòng khác kiểu nhau là cách đắt giá nhất trên mỗi dòng thử. Nhắm mắt chọn thì có thể đúng, nhưng không có chủ đích nên hay rơi toàn dòng bình thường.",
    diagram: [
      { label: "Chọn 5 dòng: thường, trống, âm, trùng, cực lớn", arrow: true },
      { label: "Ghi đáp án mong muốn ra giấy TRƯỚC khi chạy", arrow: true },
      { label: "Chạy công thức, đặt kết quả cạnh đáp án", arrow: true },
      { label: "Dòng nào lệch là một lỗi công thức cần tìm" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: bảng tính tiền hoàn",
      description:
        "Một bảng hoàn tiền có 300 dòng, công thức AI viết cho kết quả hợp lý ở các dòng đầu. Khi người làm thử riêng một dòng có số lượng âm (hàng trả lại), công thức cho ra tiền hoàn âm và cộng vào tổng thay vì trừ. Đây là tình huống minh hoạ: lỗi chỉ lộ ra nhờ một dòng lạ được chọn trước.",
    },
    quiz: [
      {
        question: "Vì sao phải ghi đáp án mong muốn TRƯỚC khi chạy công thức trên 5 dòng?",
        options: [
          "Ghi sau thì bạn dễ tự thuyết phục kết quả là hợp lý",
          "Vì công thức chỉ chạy đúng khi đã có đáp án viết sẵn",
          "Vì bảng tính bắt buộc có cột đáp án mới cho phép tính",
          "Vì đáp án viết trước được AI dùng để sửa công thức tự động",
        ],
        correct: 0,
        explanation:
          "Nhìn kết quả rồi mới nghĩ thì não có xu hướng thấy nó đúng. Đáp án viết trước là mốc độc lập để so. Công thức không cần đáp án để chạy, bảng tính không đòi cột đáp án, và AI không tự đọc tờ giấy của bạn nên không dùng nó để sửa gì.",
      },
      {
        question: "Dòng thử nào bắt được lỗi công thức không xử lý ô trống?",
        options: [
          "Một dòng có ô số lượng bỏ trống",
          "Một dòng có số lượng 1 và giá nhỏ nhất bảng",
          "Một dòng có tên khách dài nhất trong cột tên",
          "Một dòng có ngày gần nhất trong cột ngày",
        ],
        correct: 0,
        explanation:
          "Muốn thấy công thức ứng xử với ô trống thì phải có một dòng trống. Dòng số lượng 1, dòng tên dài hay dòng ngày mới nhất đều là dòng có đủ dữ liệu, nên công thức chạy bình thường và không lộ gì về chỗ yếu đó.",
      },
      {
        question: "Bộ 5 dòng thử: (1) bình thường, (2) bình thường, (3) bình thường, (4) bình thường khác một chút, (5) bình thường lớn hơn. Nhận xét nào đúng?",
        options: [
          "Bộ thử yếu, vì chưa có dòng trống, âm, trùng hay số 0",
          "Bộ thử tốt, vì năm dòng khác số liệu đã đủ đa dạng",
          "Bộ thử đủ nếu cả năm dòng ra đúng, không cần thêm",
          "Bộ thử tốt, vì toàn dòng bình thường nên kết quả đáng tin nhất",
        ],
        correct: 0,
        explanation:
          "Khác số liệu không có nghĩa là khác kiểu. Công thức xử lý số 100 và số 120 theo đúng một đường, nên năm dòng bình thường cho cùng một phép thử năm lần. Giá trị của bộ thử nằm ở các kiểu dòng lạ, không ở việc đủ năm dòng.",
      },
      {
        question: "Dòng thử cho ra kết quả khác đáp án bạn ghi. Bước tiếp theo hợp lý là gì?",
        options: [
          "Kiểm đáp án của bạn và công thức từng mảnh để tìm bên nào sai",
          "Đổi đáp án của bạn thành kết quả công thức cho khớp",
          "Xoá dòng thử đó khỏi bộ, vì nó làm bộ thử không đẹp",
          "Nhờ AI viết lại công thức cho tới khi dòng đó ra đúng ý bạn",
        ],
        correct: 0,
        explanation:
          "Lệch có thể do công thức, cũng có thể do chính đáp án bạn tính sai, nên phải xét cả hai bên. Đổi đáp án cho khớp hay xoá dòng thử là bỏ chỉ dấu duy nhất của lỗi. Nhờ AI viết lại liên tục chỉ đổi công thức chứ chưa biết vì sao lệch, và lỗi mới có thể sinh ra.",
      },
      {
        question: "Bạn thử 5 dòng, cả 5 ra đúng. Kết luận nào chính xác nhất?",
        options: [
          "Công thức đúng với 5 kiểu dòng đó, chưa chứng minh cho kiểu khác",
          "Công thức đúng với mọi dòng, vì cả năm lần thử đều qua",
          "Công thức đúng 100%, không cần nhìn lại tổng của cả bảng nữa",
          "Công thức đúng với toàn bộ 300 dòng, nhưng chỉ khi không có dòng trùng",
        ],
        correct: 0,
        explanation:
          "Bộ thử chứng minh được những gì nó phủ. Năm kiểu dòng qua thì tăng độ tin cậy, không biến thành bảo đảm cho mọi dòng. Vẫn nên đếm số dòng và đối chiếu tổng của cả bảng với một con số bạn biết, bước sẽ học ở bài sau.",
      },
    ],
    keyTakeaways: [
      "Chọn dòng thử theo kiểu, không theo vị trí: thường, trống, âm, trùng, cực lớn.",
      "Ghi đáp án mong muốn ra giấy trước khi chạy công thức.",
      "Dòng lệch là chỉ dấu: xét cả công thức lẫn đáp án bạn tự tính.",
      "Qua 5 dòng là tăng độ tin cậy, không phải bảo đảm cho cả bảng.",
    ],
    practicePrompt: {
      question:
        "Công thức tiền hoàn = số lượng trả × đơn giá × 0,9. Bạn thử dòng: số lượng 10, đơn giá 50.000 đ. Đáp án mong muốn đúng là bao nhiêu?",
      options: [
        "450.000 đ (= 10 × 50.000 × 0,9)",
        "500.000 đ (= 10 × 50.000, quên nhân hệ số 0,9)",
        "50.000 đ (= 10 × 50.000 × 0,9 ÷ 9, chia nhầm thay vì nhân)",
        "5.000.000 đ (= 10 × 50.000 × 10, nhầm 0,9 thành 10)",
      ],
      correct: 0,
      explanation:
        "10 × 50.000 = 500.000, nhân 0,9 được 450.000 đ. Con số 500.000 là khi quên hệ số. Hai đáp án còn lại là lỗi nhân chia phổ biến khi làm nhẩm. Ví dụ này cũng cho thấy vì sao phải tự tính đáp án ra giấy: bạn có mốc chắc chắn để nhìn thấy lệch.",
    },
    summary: {
      keyIdea: "Năm dòng chọn có chủ đích, kèm đáp án viết trước, là bộ thử nhỏ mà bắt được nhiều lỗi nhất.",
      formula: "Chọn kiểu dòng lạ → ghi đáp án → chạy → so từng dòng → tìm nguồn lệch.",
      commonMistake: "Thử bằng năm dòng đầu hoặc năm dòng đẹp rồi coi là đã kiểm xong.",
      action: "Với công thức kế tiếp AI viết, ghi ra giấy năm dòng thử và đáp án trước khi chạy.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy một công thức AI đã viết cho tệp của bạn (hoặc nhờ AI viết một công thức mới cho cột bạn đang cần). Chọn 5 dòng thật trong tệp: ít nhất một dòng trống, một dòng số âm hoặc số 0, một dòng trùng. Ghi đáp án mong muốn ra giấy, chạy công thức rồi đánh dấu dòng nào lệch và vì sao.",
      secondary: "Ngày mai dashboard sẽ hỏi: 5 dòng bạn chọn là dòng nào, và có dòng nào làm lộ lỗi không?",
    },
    sections: [
      {
        type: "lead",
        text: "Công thức tiền hoàn cho 300 dòng vừa chạy xong và 5 dòng đầu trông đều đẹp. Bạn chỉ có mười phút trước khi gửi bảng. Mười phút đó nên dùng thế nào để bắt được lỗi, thay vì lướt lại 300 dòng bằng mắt?",
      },
      {
        type: "feynman",
        title: "Thử công thức đơn giản hơn bạn nghĩ",
        intro: "Thử công thức giống thử giày trước khi mua: bạn không chỉ đứng yên mà đi vài bước, bước lên bậc thang, chạy nhẹ, chứ không chỉ nhìn giày đẹp.",
        columns: ["Thành phần", "Thử giày", "Thử công thức"],
        rows: [
          ["Tình huống thử", "Đi thẳng, bước lên bậc, đứng lâu", "Dòng thường, dòng trống, số âm, dòng trùng"],
          ["Mốc so sánh", "Bạn biết mình cần cảm giác thoải mái nào", "Đáp án bạn viết ra trước khi chạy"],
          ["Điều thử không thấy", "Giày có bền sau một năm không", "Kiểu dòng mà bạn chưa nghĩ tới"],
          ["Khi khó chịu", "Đổi cỡ hoặc đổi giày, không bỏ qua", "Tìm vì sao lệch, không đổi đáp án cho khớp"],
        ],
        oneLiner: "Thử công thức như thử giày: đi qua các tình huống khó, không chỉ đứng nhìn cho đẹp.",
      },
      { type: "heading", text: "Năm dòng, năm kiểu" },
      {
        type: "paragraph",
        text: "Bộ thử tốt chọn theo kiểu dòng, không theo số thứ tự. Một dòng bình thường để chắc cơ bản chạy. Một dòng có ô trống. Một dòng số âm hoặc bằng 0, như hàng trả lại. Một dòng trùng với dòng khác, như khách đặt hai lần trong ngày. Một dòng cực lớn hoặc cực nhỏ. Hai từ mới cần nhớ: trường hợp biên là dòng ở rìa dữ liệu, nơi công thức hay sai, và đáp án mong muốn là kết quả bạn tự tính tay trước khi chạy.",
      },
      {
        type: "flow",
        title: "Quy trình thử 5 dòng trong 10 phút",
        steps: [
          { label: "Chọn 5 dòng khác kiểu nhau", detail: "Tìm trong tệp thật: một dòng thường, một dòng trống, một dòng âm hoặc 0, một dòng trùng, một dòng cực trị." },
          { label: "Ghi đáp án mong muốn", detail: "Trên giấy hoặc một cột riêng, tự tính bằng tay hoặc máy tính cầm tay cho từng dòng, chưa nhìn ô công thức." },
          { label: "Chạy rồi so cạnh nhau", detail: "Đặt kết quả công thức cạnh đáp án của bạn. Lệch bao nhiêu thì đánh dấu bấy nhiêu dòng." },
          { label: "Tìm nguồn lệch", detail: "Hỏi: đáp án của tôi sai, hay công thức sai? Dùng bài trước: đọc từng hàm để xem hàm nào xử lý kiểu dòng đó." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Bộ thử yếu",
          text: "Năm dòng đầu của bảng, hoặc năm dòng đẹp nhất. Không ghi đáp án trước, chỉ nhìn kết quả rồi nghĩ: trông hợp lý. Cả năm dòng đều cùng một kiểu nên năm lần thử thực ra chỉ là một.",
        },
        right: {
          label: "Bộ thử tốt",
          text: "Năm dòng năm kiểu: thường, trống, âm, trùng, cực trị. Đáp án tự tính ghi trước. Dòng nào lệch thì truy nguyên nhân thay vì sửa đáp án cho khớp.",
        },
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI gợi ý dòng thử",
        task: "Bạn có công thức tiền hoàn cho bảng 300 dòng và cần nhờ AI gợi ý các kiểu dòng để thử. Lắp yêu cầu sao cho AI giúp bạn thử, không phải thử hộ bạn.",
        parts: [
          {
            id: "ctx",
            label: "Bối cảnh",
            options: [
              {
                text: "Công thức là tiền hoàn = số lượng trả × đơn giá × 0,9. Cột số lượng có ô trống, có số âm do hàng trả lại, có mã khách trùng.",
                good: true,
                feedback: "AI biết bảng của bạn có những loại dòng nào, nên gợi ý kiểu dòng thử sát dữ liệu thật.",
              },
              {
                text: "Tôi có một công thức tính tiền, bạn thử hộ tôi.",
                feedback: "AI không thấy bảng của bạn và sẽ tự bịa dòng cùng kết quả như thể nó đã chạy thử.",
              },
            ],
          },
          {
            id: "ask",
            label: "Điều cần AI làm",
            options: [
              {
                text: "Gợi ý 5 kiểu dòng thử, và với mỗi kiểu, nói đáp án bạn kỳ vọng công thức cho ra; tôi sẽ tự chạy trên bảng của tôi.",
                good: true,
                feedback: "AI đưa kiểu dòng và kỳ vọng, còn phép chạy thật thuộc về bạn nên kết quả kiểm chứng được.",
              },
              {
                text: "Chạy thử công thức rồi báo cho tôi biết nó đúng hay sai.",
                feedback: "AI không chạy công thức trên tệp của bạn. Nó sẽ trả lời nghe như đã thử, đó là một lời bịa.",
              },
            ],
          },
          {
            id: "fmt",
            label: "Dạng kết quả",
            options: [
              {
                text: "Bảng 4 cột: kiểu dòng, ví dụ số liệu, đáp án kỳ vọng, lý do; tối đa 5 hàng.",
                good: true,
                feedback: "Bảng đúng dạng để bạn in ra, điền thêm cột Kết quả thật và so cạnh nhau.",
              },
              {
                text: "Viết một đoạn văn dài giải thích vì sao nên thử công thức.",
                feedback: "Đoạn văn thuyết phục nhưng bạn không có dòng nào cụ thể để chạy thử.",
              },
            ],
          },
        ],
        responses: [
          {
            requires: ["ctx", "ask", "fmt"],
            text: "Kiểu dòng | Ví dụ | Đáp án kỳ vọng | Lý do\nThường | SL 10, giá 50.000 | 450.000 | đường chính\nTrống | SL để trống | 0 hoặc để trống, tuỳ quy ước | xem công thức có báo lỗi không\nÂm | SL -2, giá 50.000 | -90.000, hoặc cần quy ước rõ | hàng trả ngược chiều\nTrùng | hai dòng cùng mã khách | tính riêng từng dòng | tránh gộp nhầm\nCực lớn | SL 100.000 | số rất lớn, khớp máy tính cầm tay | xem công thức có tràn hay làm tròn không",
          },
          {
            requires: ["ctx"],
            text: "Bạn nên thử cả dòng trống, số âm và dòng trùng. Công thức của bạn là tiền hoàn = số lượng × đơn giá × 0,9...\n(Đúng hướng nhưng chưa có bảng ví dụ và đáp án kỳ vọng, nên bạn vẫn phải tự nghĩ từng dòng.)",
          },
          {
            text: "Tôi đã chạy thử công thức trên 5 dòng và cả năm đều cho kết quả chính xác. Bạn có thể dùng công thức cho toàn bộ bảng.\n(AI chưa hề chạy gì trên bảng của bạn. Đây là câu trấn an bịa ra.)",
          },
        ],
      },
      {
        type: "callout",
        label: "Một con số nên đo ngay",
        text: "Sau khi thử 5 dòng, đếm thêm hai thứ trên cả bảng: số dòng có kết quả (bằng số dòng dữ liệu không?) và số dòng ra lỗi hoặc Không thấy. Hai con số này không cần công thức thông minh nhưng bắt được nhiều lỗi hơn việc lướt mắt.",
      },
      {
        type: "scenario",
        title: "Mười phút trước khi gửi bảng tiền hoàn",
        start: "s1",
        nodes: {
          s1: {
            text: "Công thức tiền hoàn cho 300 dòng vừa chạy xong. Năm dòng đầu đều đẹp. Bạn còn mười phút.",
            choices: [
              { label: "Gửi luôn: năm dòng đầu đã đúng", next: "bad_early" },
              { label: "Tìm trong bảng một dòng trống, một dòng âm, một dòng trùng, tự tính đáp án ra giấy", next: "s2" },
            ],
          },
          bad_early: {
            text: "Kế toán trưởng phát hiện tổng hoàn cao hơn số phiếu trả hàng 18 triệu: các dòng số lượng âm bị cộng thay vì trừ. Bảng bị trả về.",
            ending: "bad",
          },
          s2: {
            text: "Bạn thử 3 dòng lạ. Dòng số lượng âm ra tiền hoàn âm, nhưng bạn mong đợi số dương vì đó là tiền trả lại khách.",
            choices: [
              { label: "Đổi đáp án mong muốn thành số âm cho khớp công thức", next: "bad_fit" },
              { label: "Hỏi lại quy ước với kế toán trưởng: hàng trả lại thể hiện bằng số âm hay dương", next: "good" },
            ],
          },
          bad_fit: {
            text: "Bạn đổi đáp án cho khớp và cả bảng qua kiểm tra. Nhưng không ai biết quy ước thật là gì nên tổng tiền hoàn vẫn lệch với sổ, và không ai biết vì sao.",
            ending: "bad",
          },
          good: {
            text: "Kế toán trưởng xác nhận: hàng trả lại ghi số dương ở cột riêng. Bạn sửa công thức, thử lại ba dòng lạ rồi gửi bảng kèm ghi chú quy ước.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Năm dòng năm kiểu, đáp án ghi trước, dòng lệch là chỉ dấu.",
          "Bài sau: công thức chạy không lỗi mà tổng vẫn sai vì vùng tham chiếu thiếu dòng.",
        ],
      },
    ],
  },
  {
    id: 2637,
    slug: "cong-thuc-chay-dung-nhung-ket-qua-sai-dong-cuoi-bi-bo-qua",
    title: "Chặng 61, Bài 18: Công thức chạy không lỗi mà tổng sai: dòng cuối bị bỏ ngoài vùng",
    subtitle: "Cái cân không báo lỗi khi bạn quên đặt một bao hàng lên.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "📏",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Công thức báo lỗi thì bạn biết mà sửa. Công thức không báo lỗi mà cộng thiếu mới nguy hiểm: con số vẫn đẹp, định dạng vẫn đẹp, chỉ sai ở chỗ không ai kiểm. Vùng tham chiếu dừng ở dòng 200 trong khi có 240 dòng là lỗi phổ biến nhất của công thức do AI viết, vì AI chỉ thấy phần dữ liệu bạn dán cho nó.",
    openingQuestion:
      "AI viết =SUM(D2:D200) cho cột doanh thu, kết quả ra đẹp, không báo lỗi. Bạn biết bảng có thể dài hơn. Phép kiểm nhanh nhất để biết vùng có đủ không là gì?",
    openingOptions: [
      "Đếm số dòng dữ liệu thật rồi so với số dòng mà vùng công thức phủ",
      "Nhìn xem ô kết quả có hiện lỗi đỏ hay không",
      "Hỏi AI: vùng này đủ chưa, rồi tin theo câu trả lời",
      "Kéo thử công thức sang cột khác xem có chạy không",
    ],
    correctOption: 0,
    explanation:
      "Công thức thiếu dòng không hiện lỗi, nên nhìn lỗi đỏ không có tác dụng. AI không thấy tệp đầy đủ của bạn nên không biết vùng đủ hay thiếu. Kéo sang cột khác chỉ thử công thức chạy được, không thử vùng đủ dòng. Chỉ có đếm dòng thật (ví dụ dùng hàm đếm ô không trống hoặc nhìn số dòng cuối) rồi so với vùng mới biết công thức bỏ sót dòng nào.",
    diagram: [
      { label: "Đếm số dòng dữ liệu thật trong bảng", arrow: true },
      { label: "Đọc vùng tham chiếu trong công thức", arrow: true },
      { label: "So hai con số: vùng có phủ hết dòng không", arrow: true },
      { label: "Sửa vùng, hoặc dùng cột nguyên để không bao giờ thiếu" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: báo cáo doanh thu tháng",
      description:
        "Một báo cáo có 240 dòng đơn hàng, công thức AI viết chỉ cộng đến dòng 200 vì người dán mới dán 200 dòng đầu khi nhờ viết. Tổng thiếu doanh thu của 40 dòng cuối, không ai thấy cho tới khi đối chiếu với sổ. Đây là tình huống minh hoạ; con số 200 và 240 lấy theo đúng ví dụ của bài học.",
    },
    quiz: [
      {
        question: "Vì sao công thức cộng thiếu dòng không hiện lỗi?",
        options: [
          "Vì nó vẫn cộng đúng mọi ô nằm trong vùng đã chỉ định",
          "Vì bảng tính tự động cộng thêm dòng còn thiếu ở cuối",
          "Vì bảng tính chỉ báo lỗi khi bảng có hơn 200 dòng",
          "Vì AI đã kiểm tra vùng trước khi đưa công thức cho bạn",
        ],
        correct: 0,
        explanation:
          "Công thức làm đúng điều nó được dặn: cộng vùng D2:D200. Nó không biết bạn muốn cộng cả dòng 240. Bảng tính không tự mở rộng vùng và cũng không có ngưỡng 200 dòng để báo lỗi. AI cũng không kiểm vùng vì nó không thấy phần dữ liệu ngoài đoạn bạn dán.",
      },
      {
        question: "Cách nào làm vùng công thức không bao giờ thiếu khi thêm dòng mới?",
        options: [
          "Tham chiếu cả cột, ví dụ D:D, cho cột chỉ có dữ liệu cần cộng",
          "Dùng vùng D2:D1000 cho dài thật dài",
          "Đếm lại dòng bằng tay mỗi tháng rồi sửa công thức",
          "Đổi công thức sang SUM cho bảng ngắn, còn bảng dài dùng hàm khác",
        ],
        correct: 0,
        explanation:
          "Tham chiếu cả cột phủ mọi dòng hiện có và dòng thêm sau này (miễn cột không chứa ô tổng khác). Vùng dài cố định như D2:D1000 vẫn sẽ hết khi bảng vượt 1000 và tạo lỗi im lặng khác. Đếm bằng tay dễ quên, và SUM không có chuyện ngắn dài khác nhau.",
      },
      {
        question: "Bảng có 240 dòng dữ liệu (dòng 2 đến 241) và công thức là =SUM(D2:D200). Công thức bỏ sót bao nhiêu dòng?",
        options: [
          "41 dòng (từ dòng 201 đến dòng 241)",
          "40 dòng (= 240 - 200, quên dòng tiêu đề chiếm dòng 1)",
          "39 dòng (= 240 - 201, đếm lệch thêm một lần nữa)",
          "240 dòng (toàn bộ, vì công thức bắt đầu ở D2 thay vì D1)",
        ],
        correct: 0,
        explanation:
          "Dữ liệu bắt đầu ở dòng 2 nên 240 dòng chiếm dòng 2 tới 241. Vùng D2:D200 phủ dòng 2 tới 200, bỏ sót dòng 201 tới 241, tức 41 dòng. Đáp án 40 quên dòng tiêu đề chiếm dòng 1, một lệch một rất hay gặp khi đếm nhẩm. Đáp án 240 thì cộng thiếu cả bảng, không đúng.",
      },
      {
        question: "Sau khi sửa vùng, đối chiếu nào chứng minh nhanh nhất rằng tổng đã đủ?",
        options: [
          "So tổng công thức với tổng của nguồn gốc (sổ, hệ thống)",
          "Nhìn ô tổng thấy số to hơn trước là coi như đủ",
          "Hỏi lại AI xem nó có thấy tổng hợp lý không",
          "Đếm lại số chữ số trong tổng có bằng lần trước không",
        ],
        correct: 0,
        explanation:
          "Con số bên ngoài bảng, như tổng trong sổ hoặc báo cáo hệ thống, là mốc độc lập. Tổng to hơn chưa nói là đủ: có thể vẫn thiếu. AI không biết tổng thật. Đếm chữ số là phép thử quá thô, hai tổng lệch vài triệu vẫn cùng số chữ số.",
      },
      {
        question: "Bạn dán 200 dòng đầu cho AI và nhờ viết công thức cộng. Điều gì nên dặn thêm để tránh lỗi vùng?",
        options: [
          "Bảng thực có nhiều dòng hơn đoạn dán, hãy dùng cả cột thay vì vùng cố định",
          "Hãy dùng vùng đúng bằng số dòng đã dán, để công thức chính xác hơn",
          "Hãy tự kiểm vùng của bạn sau khi viết rồi báo lại cho tôi",
          "Hãy viết công thức cho 200 dòng, chuyện còn lại tôi tự lo",
        ],
        correct: 0,
        explanation:
          "AI chỉ biết đoạn bạn dán, nên nó sẽ viết vùng vừa đúng 200 dòng. Bạn phải nói cho nó biết bảng còn dài hơn và cần vùng không cố định. Dặn vùng đúng số dòng đã dán chính là nguồn gốc lỗi. Nhờ AI tự kiểm vùng thì nó không có cách nhìn tệp đầy đủ, và để bạn tự lo mà không nói thì lỗi vẫn im lặng.",
      },
    ],
    keyTakeaways: [
      "Công thức thiếu dòng không báo lỗi: nó cộng đúng phần vùng đã chỉ.",
      "AI chỉ thấy phần bạn dán, nên vùng hay vừa khít đoạn dán.",
      "Đếm dòng thật rồi so với vùng công thức; nhớ dòng tiêu đề chiếm một dòng.",
      "Đối chiếu tổng với nguồn bên ngoài bảng mới là phép kiểm đủ.",
    ],
    practicePrompt: {
      question:
        "Bảng có 240 dòng dữ liệu, tổng thật trong sổ là 1.250 triệu. Công thức =SUM(D2:D200) ra 1.040 triệu. Hiểu đúng về khoảng chênh 210 triệu là gì?",
      options: [
        "Khả năng cao là doanh thu của các dòng cuối nằm ngoài vùng",
        "Chắc chắn là sổ ghi sai, vì bảng tính không bao giờ sai được",
        "Là sai số làm tròn vì bảng tính làm tròn theo từng dòng",
        "Là doanh thu đã bị trừ thuế tự động khi cộng vùng",
      ],
      correct: 0,
      explanation:
        "Số dòng thiếu (41 dòng) và khoảng chênh lớn cùng chỉ về vùng không đủ. Bảng tính hoàn toàn có thể đúng chỗ này mà sai chỗ kia, và sổ cần xét sau khi vùng đã sửa. Sai số làm tròn chỉ cỡ đồng lẻ, không phải 210 triệu. SUM không trừ thuế.",
    },
    summary: {
      keyIdea: "Công thức không báo lỗi vẫn có thể bỏ sót dòng: vùng tham chiếu phải được so với số dòng thật.",
      formula: "Đếm dòng thật → đọc vùng công thức → so → sửa → đối chiếu tổng với nguồn ngoài.",
      commonMistake: "Dán một phần bảng cho AI rồi dùng nguyên vùng nó viết cho cả bảng.",
      action: "Mở ba công thức tổng trong tệp của bạn và đọc vùng từng cái: nó có phủ dòng cuối không?",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Mở một tệp có công thức tổng hoặc đếm (của bạn hoặc do AI viết). Với mỗi công thức, ghi ra giấy: vùng nó đọc là từ dòng nào đến dòng nào, bảng thật có dòng dữ liệu cuối cùng là dòng mấy. Nếu thiếu, sửa vùng rồi đối chiếu tổng với một con số ngoài bảng (sổ, hệ thống, báo cáo cũ).",
      secondary: "Ngày mai dashboard sẽ hỏi: bao nhiêu công thức bạn đã rà vùng, và có cái nào thiếu dòng không?",
    },
    sections: [
      {
        type: "lead",
        text: "Bảng doanh thu tháng có 240 dòng. AI viết công thức tổng, bạn dán vào, ô tổng hiện một con số đẹp. Không màu đỏ, không dấu chấm than. Nhưng khi kế toán đối chiếu sổ, tổng lệch 210 triệu. Công thức không lỗi, chỉ là nó không nhìn thấy những dòng cuối.",
      },
      {
        type: "feynman",
        title: "Vùng tham chiếu đơn giản hơn bạn nghĩ",
        intro: "Hình dung một cái cân đặt ở cổng kho: nó cân rất đúng những bao hàng đặt lên bàn cân, nhưng nếu 40 bao còn nằm ngoài xe thì nó không báo gì.",
        columns: ["Thành phần", "Cân ở cổng kho", "Công thức tổng"],
        rows: [
          ["Thứ được cân", "Những bao đặt lên bàn cân", "Những ô trong vùng tham chiếu"],
          ["Thứ bị bỏ sót", "Bao còn nằm trên xe", "Dòng nằm ngoài vùng"],
          ["Tiếng báo lỗi", "Không có, cân vẫn ra số đẹp", "Không có, ô tổng vẫn ra số đẹp"],
          ["Cách kiểm", "Đếm số bao trên xe, so với số bao đã cân", "Đếm dòng thật, so với số dòng vùng phủ"],
        ],
        oneLiner: "Công thức tổng là cái cân ở cổng kho: nó cân đúng cái đặt lên, việc đếm bao còn trên xe là của bạn.",
      },
      { type: "heading", text: "Vì sao AI hay viết vùng thiếu" },
      {
        type: "paragraph",
        text: "AI chỉ thấy đoạn bạn dán. Bạn dán 200 dòng để tiết kiệm chỗ, nó viết vùng vừa khít 200 dòng. Nó không biết bảng của bạn còn 40 dòng nữa, và nó không hỏi. Hai từ mới: vùng tham chiếu là khoảng ô mà công thức đọc, và lỗi im lặng là lỗi không hiện cảnh báo nào. Kết hợp hai điều đó, bạn cần một thói quen: đọc vùng công thức của AI trước khi tin tổng.",
      },
      {
        type: "flow",
        title: "Rà vùng công thức trong năm phút",
        steps: [
          { label: "Đếm dòng dữ liệu thật", detail: "Nhấn xuống cuối bảng, ghi lại số dòng cuối cùng có dữ liệu và trừ dòng tiêu đề. Đó là số dòng mà mọi công thức tổng phải phủ." },
          { label: "Đọc vùng trong công thức", detail: "Nhìn dải ô trong ngoặc, ví dụ D2:D200. Ghi lại dòng bắt đầu và dòng kết thúc." },
          { label: "So hai con số", detail: "Dòng kết thúc của vùng có bằng dòng cuối của dữ liệu không? Dòng bắt đầu có sau dòng tiêu đề không?" },
          { label: "Sửa và đối chiếu", detail: "Mở rộng vùng (hoặc dùng cả cột), rồi so tổng mới với một con số ngoài bảng như sổ hoặc báo cáo hệ thống." },
        ],
      },
      { type: "heading", text: "Bốn chỗ vùng hay thiếu" },
      {
        type: "list",
        items: [
          "Vùng dừng sớm: dòng dữ liệu cuối nằm ngoài vùng, như D2:D200 trong khi có 240 dòng.",
          "Vùng bắt đầu sót: công thức bắt đầu ở dòng 3 nên bỏ dòng 2.",
          "Dòng chèn mới ở cuối bảng không được vùng cũ tính vào.",
          "Nhiều cột tổng dùng vùng khác nhau, nên một cột đủ còn cột kia thiếu.",
        ],
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Rà bản giải thích công thức AI viết",
        task: "Bạn dán 200 dòng đầu của bảng 240 dòng cho AI và nhờ viết công thức tổng doanh thu, rồi giải thích. Bảng thật: dòng 1 là tiêu đề, dữ liệu dòng 2 đến 241, cột D là doanh thu. Đánh dấu những câu giải thích có vấn đề.",
        segments: [
          { text: "Công thức =SUM(D2:D200) cộng các giá trị trong cột D, bắt đầu từ dòng 2 sau dòng tiêu đề." },
          {
            text: "Vùng D2:D200 bao trùm toàn bộ dữ liệu của bảng, nên tổng là tổng cả bảng.",
            error: "AI chỉ thấy 200 dòng bạn dán; bảng thật đến dòng 241. Câu khẳng định toàn bộ là bịa, vì nó chưa từng thấy dòng 201-241.",
          },
          { text: "Các ô trống trong vùng được bỏ qua khi cộng, nên không gây lỗi." },
          {
            text: "Tôi đã kiểm tra công thức trên bảng của bạn và tổng khớp với sổ sách.",
            error: "AI không có quyền truy cập vào sổ sách, cũng không chạy công thức trên tệp của bạn. Đây là lời kiểm tra bịa.",
          },
          { text: "Nếu bảng có thêm dòng mới, bạn cần mở rộng vùng hoặc dùng cả cột D:D." },
        ],
      },
      {
        type: "callout",
        label: "Nhắc khi dán một phần bảng",
        text: "Nếu bạn dán một phần bảng cho AI, hãy ghi rõ: đây là 200 dòng đầu, bảng thật có khoảng 240 dòng và sẽ dài thêm mỗi tháng. Một câu dặn này đủ để AI viết vùng không cố định. Sau đó vẫn tự kiểm: dặn giúp giảm lỗi chứ không thay phép đếm.",
      },
      {
        type: "scenario",
        title: "Tổng lệch 210 triệu trước giờ họp",
        start: "s1",
        nodes: {
          s1: {
            text: "Tổng doanh thu trong bảng là 1.040 triệu, sổ ghi 1.250 triệu. Họp lúc 2 giờ. Công thức không báo lỗi gì.",
            choices: [
              { label: "Báo sếp: sổ chắc ghi sai, bảng tính không sai bao giờ", next: "bad_blame" },
              { label: "Đọc vùng công thức, đếm dòng cuối thật của bảng", next: "s2" },
            ],
          },
          bad_blame: {
            text: "Sếp đem bảng vào họp nói số bảng là đúng. Kế toán trưởng mở sổ đối chiếu ngay tại bàn họp và chỉ ra 41 dòng bị thiếu. Sếp mất uy tín, và bạn mất luôn lòng tin của cả hai người.",
            ending: "bad",
          },
          s2: {
            text: "Công thức là =SUM(D2:D200), dữ liệu đến dòng 241. Bạn có thể sửa ngay, nhưng bảng tháng sau sẽ dài hơn nữa.",
            choices: [
              { label: "Sửa thành D2:D241 và gửi", next: "bad_fixed" },
              { label: "Đổi sang cả cột D:D, rồi so tổng mới với sổ", next: "good" },
            ],
          },
          bad_fixed: {
            text: "Tháng này tổng đã khớp. Tháng sau bảng có 260 dòng, công thức vẫn dừng ở dòng 241 và lỗi im lặng quay lại. Bạn chỉ vá đúng triệu chứng.",
            ending: "bad",
          },
          good: {
            text: "Tổng mới là 1.250 triệu, khớp sổ. Bạn ghi chú ở ô bên cạnh: dùng cả cột D, không cần sửa khi thêm dòng. Buổi họp diễn ra với con số đã đối chiếu.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Công thức đúng cú pháp vẫn có thể bỏ sót dòng; đếm dòng và đối chiếu tổng là phép kiểm.",
          "Bài sau: dựng mẫu báo cáo có vùng nhập, vùng tính, vùng kiểm để lỗi kiểu này tự lộ ra.",
        ],
      },
    ],
  },
  {
    id: 2638,
    slug: "dung-mau-bao-cao-tai-su-dung-vung-nhap-vung-tinh-vung-kiem",
    title: "Chặng 61, Bài 19: Dựng mẫu báo cáo dùng lại được: vùng nhập, vùng tính, vùng kiểm",
    subtitle: "Mẫu báo cáo như một khuôn bánh: đổ bột mới vào, hình dáng vẫn giữ nguyên.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🧱",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Mỗi tháng làm lại báo cáo từ đầu là hai giờ lặp đi lặp lại và mỗi lần lại có cơ hội sai mới. Tách tệp thành ba vùng để tháng sau chỉ dán số mới vào là cách biến công sức một lần thành công sức dùng nhiều lần, và ô kiểm tổng khớp báo ngay khi có chỗ hỏng.",
    openingQuestion:
      "Báo cáo tháng của bạn có số liệu dán vào, công thức tính, và bảng trình bày cho sếp, tất cả trộn trên một sheet. Điều gì nên làm đầu tiên để tháng sau dùng lại được?",
    openingOptions: [
      "Tách ba vùng: nơi chỉ dán số, nơi chỉ có công thức, nơi chỉ có ô kiểm",
      "Xoá hết công thức, tháng sau nhờ AI viết lại từ đầu",
      "Làm đẹp bảng trình bày trước, vì sếp chỉ nhìn vào đó",
      "Đổi tên tệp thành mẫu rồi lưu thêm một bản cho chắc",
    ],
    correctOption: 0,
    explanation:
      "Khi nhập, tính và kiểm lẫn trên một chỗ, tháng sau dán số mới có thể đè lên công thức mà không ai hay. Tách ba vùng cho mỗi vùng một luật: vùng nhập chỉ dán, vùng tính chỉ công thức, vùng kiểm chỉ ô báo khớp. Xoá hết công thức thì mỗi tháng lại phải dựng và kiểm lại từ đầu. Làm đẹp bảng hay lưu thêm bản không thay đổi việc số mới có đè công thức hay không.",
    diagram: [
      { label: "Vùng nhập: chỉ dán số mới mỗi tháng", arrow: true },
      { label: "Vùng tính: công thức đọc từ vùng nhập, không gõ tay", arrow: true },
      { label: "Vùng kiểm: so tổng với nguồn và đếm dòng", arrow: true },
      { label: "Báo cáo chỉ tin được khi ô kiểm báo khớp" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: báo cáo chi phí hàng tháng",
      description:
        "Một người làm báo cáo chi phí hàng tháng mất khoảng hai giờ lần đầu để tách ba vùng và thêm ô kiểm tổng khớp với bảng sao kê. Những tháng sau, họ chỉ dán sao kê mới vào vùng nhập, đọc ô kiểm rồi gửi. Đây là tình huống minh hoạ, số giờ trong biểu đồ bên dưới cũng là số liệu minh hoạ bạn có thể chỉnh.",
    },
    quiz: [
      {
        question: "Vùng nhập trong mẫu báo cáo nên chứa gì?",
        options: [
          "Chỉ số liệu thô dán từ nguồn, không có công thức nào",
          "Số liệu thô trộn cùng công thức trên một sheet để khỏi phải tìm chỗ khác",
          "Bảng trình bày đã định dạng sẵn cho sếp xem, cùng các biểu đồ minh hoạ",
          "Công thức tổng ở cuối cột, để tháng sau không phải gõ lại công thức nữa",
        ],
        correct: 0,
        explanation:
          "Vùng nhập là nơi tháng sau xoá đi dán lại. Nếu nó chứa công thức thì dán đè sẽ phá công thức mà không ai thấy. Bảng trình bày và công thức tổng thuộc vùng tính hoặc vùng xem, không thuộc vùng nhập.",
      },
      {
        question: "Ô kiểm tổng khớp nên làm việc gì?",
        options: [
          "So tổng trong báo cáo với một tổng độc lập và hiện chữ Khớp hoặc Lệch",
          "Hiện chữ Khớp gõ tay cố định ở ô kiểm, để sếp thấy báo cáo đã được kiểm rồi",
          "Cộng lại toàn bộ vùng nhập bằng đúng công thức mà vùng tính đang dùng",
          "Khoá tất cả các ô còn lại để không một ai sửa được báo cáo sau khi gửi",
        ],
        correct: 0,
        explanation:
          "Giá trị của ô kiểm nằm ở việc so với thứ độc lập, ví dụ tổng trên sao kê gốc hoặc số dòng đã dán. Chữ Khớp gõ tay là lời nói dối cố định. Cộng lại bằng chính công thức vùng tính chỉ so cái đó với chính nó, còn khoá ô là việc khác, không phải phép kiểm.",
      },
      {
        question: "Báo cáo làm tay mất 2 giờ. Dựng mẫu mất thêm 4 giờ một lần, sau đó mỗi tháng còn 0,5 giờ. Sau 4 tháng, thời gian tổng của mẫu so với làm tay là?",
        options: [
          "6 giờ so với 8 giờ: mẫu đã lời 2 giờ (= 4 + 4 × 0,5 so với 4 × 2)",
          "4 giờ so với 8 giờ: mẫu lời 4 giờ (quên cộng 0,5 giờ mỗi tháng)",
          "2 giờ so với 8 giờ: mẫu lời 6 giờ (chỉ tính 4 × 0,5 mà quên công dựng)",
          "8 giờ so với 8 giờ: hòa vốn (tính cả dựng lẫn mỗi tháng là 2 giờ)",
        ],
        correct: 0,
        explanation:
          "Làm tay 4 tháng: 4 × 2 = 8 giờ. Làm mẫu: 4 giờ dựng cộng 4 × 0,5 = 2 giờ chạy, tổng 6 giờ. Đáp án 4 giờ quên các lần chạy hằng tháng, đáp án 2 giờ quên công dựng mẫu, còn đáp án hòa vốn coi mẫu vẫn tốn 2 giờ mỗi lần. Điểm hòa vốn thật là sau khoảng 3 tháng (4 + 0,5 × n bằng 2 × n khi n ≈ 2,7).",
      },
      {
        question: "Tháng sau, bạn dán số mới vào vùng nhập và ô kiểm báo Lệch. Nên làm gì?",
        options: [
          "Tìm nguyên nhân lệch, ví dụ dòng thiếu hoặc số dán bị sai dạng",
          "Xoá ô kiểm cho báo cáo khỏi báo lỗi nữa, rồi yên tâm gửi sếp ngay hôm nay",
          "Đổi số tổng nguồn thành số báo cáo vừa tính, để hai bên khớp nhau",
          "Bỏ qua ô Lệch, vì ô kiểm chỉ để trang trí chứ không quan trọng gì",
        ],
        correct: 0,
        explanation:
          "Ô kiểm báo Lệch là chính xác thứ nó được dựng để làm: báo có chỗ hỏng trước khi sếp thấy. Xoá ô kiểm, sửa số nguồn cho khớp hay bỏ qua đều vứt bỏ phép kiểm đó và để lỗi đi tiếp.",
      },
      {
        question: "Vì sao nên khoá hoặc tô màu riêng vùng tính, còn vùng nhập để trống cho dán?",
        options: [
          "Để lúc dán số mới không ai vô tình gõ đè lên công thức",
          "Để bảng tính chạy nhanh hơn khi có nhiều công thức",
          "Để AI đọc được vùng tính mà không đọc được vùng nhập",
          "Để vùng nhập tự động xoá sạch số cũ khi mở tệp",
        ],
        correct: 0,
        explanation:
          "Công thức bị gõ đè bằng một con số tay thì trông vẫn như số thường và không ai nhận ra. Khoá hoặc tô màu vùng tính làm ranh giới hiện ra. Nó không làm bảng chạy nhanh, không liên quan tới việc AI đọc, và cũng không tự xoá số cũ.",
      },
    ],
    keyTakeaways: [
      "Ba vùng, ba luật: nhập chỉ dán, tính chỉ công thức, kiểm chỉ báo khớp.",
      "Ô kiểm phải so với thứ độc lập, không so với chính công thức của mình.",
      "Mẫu tốn công dựng một lần và hòa vốn sau vài lần dùng lại.",
      "Ô kiểm báo Lệch là tính năng, không phải phiền toái.",
    ],
    practicePrompt: {
      question:
        "Báo cáo chi phí 120 dòng sao kê. Ô kiểm nào đo đúng việc dán đủ dòng và đủ số tiền?",
      options: [
        "So số dòng đã dán và tổng tiền với số dòng và tổng ghi trên sao kê gốc",
        "So tổng vùng tính với tổng chính vùng tính sau khi dán, cho chắc không đổi",
        "Đếm số chữ trong tên ô kiểm xem có hiện đúng chữ Khớp không",
        "Kiểm xem tệp có lưu đúng tên và đúng thư mục hàng tháng không",
      ],
      correct: 0,
      explanation:
        "Số dòng và tổng tiền trên sao kê gốc là hai mốc độc lập với việc bạn dán: dòng thiếu làm lệch số dòng, số sai làm lệch tổng. So vùng tính với chính nó luôn khớp nên không bắt được gì. Đếm chữ hay kiểm tên tệp không liên quan đến số liệu.",
    },
    summary: {
      keyIdea: "Ba vùng tách bạch và một ô kiểm độc lập biến báo cáo một lần thành khuôn dùng lại nhiều lần.",
      formula: "Vùng nhập (dán) → vùng tính (công thức) → vùng kiểm (so với nguồn độc lập).",
      commonMistake: "Dán số mới đè lên ô công thức, hoặc ô kiểm so với chính công thức của nó.",
      action: "Chọn một báo cáo bạn làm hằng tháng và vạch ba vùng trên tệp của bạn.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Mở một báo cáo bạn làm lặp lại hằng tháng hoặc hằng tuần. Dùng ba màu nền khác nhau để tô: vùng nhập, vùng tính, vùng kiểm. Thêm một ô kiểm so số dòng và tổng tiền với nguồn. Lưu thành tệp mẫu (xoá số cũ ở vùng nhập) và ghi tên tệp vào ô ghi chú của bạn.",
      secondary: "Ngày mai dashboard sẽ hỏi: tệp nào của bạn đã có ba vùng và ô kiểm nào đang báo Khớp?",
    },
    sections: [
      {
        type: "lead",
        text: "Cuối tháng, bạn mở báo cáo của tháng trước, xoá số cũ, dán số mới, rồi phát hiện ô tổng không đổi vì hôm trước ai đó gõ đè một con số lên công thức. Báo cáo dùng lại được không phải là cái tệp đẹp, mà là cái tệp biết cách tự báo khi nó hỏng.",
      },
      {
        type: "feynman",
        title: "Mẫu báo cáo đơn giản hơn bạn nghĩ",
        intro: "Mẫu báo cáo giống một khuôn bánh: bột mới đổ vào mỗi lần, nhưng hình dáng khuôn giữ nguyên. Nếu bột tràn ra ngoài khuôn, bạn thấy ngay.",
        columns: ["Thành phần", "Khuôn bánh", "Mẫu báo cáo"],
        rows: [
          ["Phần thay mỗi lần", "Bột mới", "Vùng nhập: số liệu mới dán vào"],
          ["Phần giữ nguyên", "Hình dáng khuôn", "Vùng tính: công thức không bao giờ gõ tay"],
          ["Cách biết hỏng", "Bột tràn hoặc thiếu so với mép khuôn", "Vùng kiểm: số dòng và tổng so với nguồn"],
          ["Lợi ích", "Bánh nào cũng cùng hình", "Tháng nào báo cáo cũng cùng cấu trúc, làm nhanh hơn"],
        ],
        oneLiner: "Mẫu báo cáo là khuôn bánh: đổ số mới vào, hình dáng giữ nguyên và ô kiểm báo khi tràn.",
      },
      { type: "heading", text: "Ba vùng, ba luật" },
      {
        type: "paragraph",
        text: "Vùng nhập chỉ chứa số thô, dán từ sao kê hoặc hệ thống, không có công thức. Vùng tính chỉ chứa công thức đọc từ vùng nhập, không có số gõ tay. Vùng kiểm chứa các ô so sánh: số dòng vùng nhập có bằng số dòng nguồn không, tổng vùng tính có bằng tổng nguồn không. Bạn chỉ cần nhớ hai từ mới: vùng là một khoảng ô có chung một luật, và ô kiểm là ô tự báo khi số liệu không khớp.",
      },
      {
        type: "chart",
        title: "Thời gian làm báo cáo theo số lần dùng lại mẫu",
        caption: "Số liệu minh hoạ: kéo thanh trượt cho khớp việc của bạn. Đường mẫu tính trung bình giờ mỗi báo cáo, gồm cả công dựng mẫu chia đều cho các lần dùng. Hai đường giao nhau là điểm hòa vốn.",
        kind: "line",
        xLabel: "Số lần làm báo cáo",
        yLabel: "Giờ trung bình mỗi báo cáo",
        x: { from: 1, to: 12, step: 1 },
        params: [
          { id: "manual", label: "Giờ làm tay mỗi lần", min: 0.5, max: 6, step: 0.5, value: 2, unit: "giờ" },
          { id: "build", label: "Giờ dựng mẫu một lần", min: 1, max: 8, step: 0.5, value: 4, unit: "giờ" },
          { id: "run", label: "Giờ dùng mẫu mỗi lần", min: 0.25, max: 2, step: 0.25, value: 0.5, unit: "giờ" },
        ],
        series: [
          { label: "Làm tay mỗi lần", expr: "manual" },
          { label: "Dùng mẫu (gồm công dựng)", expr: "(build + run * x) / x" },
        ],
      },
      {
        type: "flow",
        title: "Dựng mẫu từ một tệp đang có",
        steps: [
          { label: "Tách số thô ra vùng nhập", detail: "Chuyển mọi số bạn gõ hoặc dán sang một sheet hoặc một khối riêng, không có công thức nào ở đây. Tô màu nền để nhận ra." },
          { label: "Chuyển mọi phép tính sang vùng tính", detail: "Mỗi ô ở đây phải là công thức đọc từ vùng nhập. Nếu thấy số gõ tay trong vùng tính, hoặc ghi chú vì sao nó là hằng số, hoặc đưa ra vùng nhập." },
          { label: "Thêm ô kiểm", detail: "So số dòng vùng nhập với số dòng nguồn, và tổng vùng tính với tổng nguồn. Ô hiện chữ Khớp hoặc Lệch, không ai phải diễn giải." },
          { label: "Lưu thành mẫu, xoá số cũ", detail: "Lưu tệp có vùng nhập đã xoá sạch. Tháng sau chỉ việc dán số mới, đọc ô kiểm rồi gửi." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI gợi ý ô kiểm cho mẫu",
        task: "Bạn đã tách ba vùng cho báo cáo chi phí tháng: dữ liệu sao kê ở sheet Nhap (cột A ngày, B nội dung, C số tiền), công thức tổng theo loại ở sheet Tinh. Lắp yêu cầu để AI gợi ý ô kiểm đúng.",
        parts: [
          {
            id: "ctx",
            label: "Cấu trúc bạn mô tả",
            options: [
              {
                text: "Sheet Nhap cột A là ngày, B là nội dung, C là số tiền; sheet Tinh tổng theo loại chi phí; sao kê gốc có tổng ghi ở cuối trang.",
                good: true,
                feedback: "AI biết cột nào là gì và nguồn đối chiếu nào tồn tại, nên gợi ý ô kiểm so đúng hai thứ đó.",
              },
              {
                text: "Tôi có một báo cáo chi phí, bạn gợi ý cách kiểm đi.",
                feedback: "AI không biết cấu trúc và sẽ gợi ý ô kiểm chung chung, có khi so vùng tính với chính nó.",
              },
            ],
          },
          {
            id: "ask",
            label: "Điều cần gợi ý",
            options: [
              {
                text: "Đề xuất 3 ô kiểm so với nguồn độc lập (số dòng, tổng tiền, và dòng không có loại chi phí), mỗi ô hiện Khớp hoặc Lệch.",
                good: true,
                feedback: "Ba phép kiểm có tên rõ ràng, so với nguồn ngoài, và có kết quả nhị phân không cần diễn giải.",
              },
              {
                text: "Viết một ô kiểm đảm bảo báo cáo luôn đúng.",
                feedback: "Không có ô kiểm nào bảo đảm luôn đúng. AI sẽ viết một ô tự so với chính nó và nó luôn hiện Khớp.",
              },
            ],
          },
          {
            id: "fmt",
            label: "Cách trình bày",
            options: [
              {
                text: "Mỗi ô kiểm gồm: tên, công thức mẫu, ô nào so với ô nào, và khi Lệch thì nên xem chỗ nào.",
                good: true,
                feedback: "Bạn có thể dán thẳng công thức, hiểu nó so gì, và biết bước tiếp theo khi báo Lệch.",
              },
              {
                text: "Chỉ cần đưa công thức, không cần giải thích.",
                feedback: "Bạn dán công thức mà không biết nó so cái gì, tới lúc báo Lệch thì không biết xem chỗ nào.",
              },
            ],
          },
        ],
        responses: [
          {
            requires: ["ctx", "ask", "fmt"],
            text: "Ô kiểm 1 - Số dòng: so COUNTA của cột C sheet Nhap với số dòng ghi trên sao kê (nhập tay vào ô Nguon_SoDong). Hiện Khớp nếu bằng nhau.\nÔ kiểm 2 - Tổng tiền: so tổng các loại ở sheet Tinh với tổng ghi ở cuối sao kê (ô Nguon_Tong). Lệch thì xem dòng thiếu hoặc số dán sai dạng.\nÔ kiểm 3 - Dòng không có loại: đếm dòng của Nhap chưa được gán loại ở Tinh; phải bằng 0.",
          },
          {
            requires: ["ctx"],
            text: "Bạn có thể thêm một ô so tổng vùng tính với tổng sao kê, và một ô đếm số dòng.\n(Đúng ý, nhưng chưa có công thức mẫu và chưa nói Lệch thì xem gì, nên bạn vẫn phải tự nghĩ.)",
          },
          {
            text: "Bạn thêm ô =IF(Tinh!B10=Tinh!B10,\"Khớp\",\"Lệch\") để chắc báo cáo luôn đúng.\n(Ô này so một ô với chính nó nên không bao giờ báo Lệch: nó trông như phép kiểm nhưng không kiểm gì.)",
          },
        ],
      },
      {
        type: "callout",
        label: "Ô kiểm không được tự so với chính nó",
        text: "Ô kiểm chỉ có giá trị khi so với thứ không do bạn tính: tổng trên sao kê, số dòng báo cáo hệ thống, con số từ tháng trước sau khi trừ đi phần thay đổi bạn biết. So vùng tính với vùng tính thì luôn Khớp và cho cảm giác an toàn giả.",
      },
      {
        type: "scenario",
        title: "Tháng thứ hai dùng mẫu",
        start: "s1",
        nodes: {
          s1: {
            text: "Tháng thứ hai, bạn dán sao kê mới vào vùng nhập. Ô kiểm số dòng hiện Lệch: vùng nhập có 118 dòng, sao kê ghi 120.",
            choices: [
              { label: "Tắt ô kiểm cho đỡ chướng mắt, rồi gửi báo cáo", next: "bad_hide" },
              { label: "Tìm hai dòng thiếu trong sao kê và dán lại cho đủ", next: "s2" },
            ],
          },
          bad_hide: {
            text: "Báo cáo gửi đi thiếu hai khoản chi. Hai tuần sau kế toán phát hiện chi phí thiếu 6 triệu. Ô kiểm đã báo đúng điều này từ đầu.",
            ending: "bad",
          },
          s2: {
            text: "Bạn thấy hai dòng bị mất do lọc khi sao chép. Dán đủ 120 dòng, ô kiểm số dòng chuyển Khớp nhưng ô tổng tiền vẫn Lệch 2 triệu.",
            choices: [
              { label: "Sửa số tổng nguồn thành số báo cáo vừa tính cho khớp", next: "bad_fudge" },
              { label: "Soát số tiền ở các dòng vừa dán: có thể có một dòng dán sai dạng số", next: "good" },
            ],
          },
          bad_fudge: {
            text: "Ô kiểm hiện Khớp vì bạn đã sửa mốc so sánh. Số sai vẫn nằm trong báo cáo và đã thành con số chính thức.",
            ending: "bad",
          },
          good: {
            text: "Một dòng 2.000.000 bị dán thành chữ nên không được cộng. Bạn sửa thành số, cả hai ô kiểm hiện Khớp. Cả quá trình mất mười phút thay vì hai giờ làm lại.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Ba vùng tách bạch, một ô kiểm độc lập, và báo cáo biết tự báo khi hỏng.",
          "Bài cuối: bàn giao một mẫu có trang hướng dẫn để đồng nghiệp dùng thay bạn.",
        ],
      },
    ],
  },
  {
    id: 2639,
    slug: "du-an-cuoi-mau-bao-cao-thang-cua-ban-kem-trang-huong-dan",
    title: "Chặng 61, Bài 20: Dự án cuối: mẫu báo cáo tháng của bạn kèm trang hướng dẫn",
    subtitle: "Mẫu tốt là mẫu mà người khác dùng được khi bạn đi vắng.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "📘",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Một mẫu chỉ bạn biết dùng thì tháng bạn nghỉ phép, báo cáo dừng lại. Trang hướng dẫn biến mẫu thành thứ đồng nghiệp dùng được: số từ đâu, dán vào đâu, bấm gì, ô kiểm báo gì thì làm gì, và những lỗi từng gặp. Đây là lúc gộp mọi thứ của chặng vào một sản phẩm bàn giao.",
    openingQuestion:
      "Bạn sắp nghỉ phép hai tuần và đồng nghiệp sẽ làm báo cáo tháng bằng mẫu của bạn. Trang hướng dẫn nên có gì quan trọng nhất?",
    openingOptions: [
      "Nguồn số, chỗ dán, cách đọc ô kiểm, và những lỗi từng gặp",
      "Một lời giải thích thật dài về mọi công thức có trong tệp, từng ô một",
      "Một lời chúc đồng nghiệp làm báo cáo thuận lợi",
      "Danh sách các hàm Excel mà bạn đã dùng trong mẫu",
    ],
    correctOption: 0,
    explanation:
      "Người kế nhiệm cần biết làm gì từng bước và khi có chuyện thì xem ở đâu, không cần hiểu hết công thức. Giải thích mọi công thức quá dài nên không ai đọc. Lời chúc không hướng dẫn gì, còn danh sách hàm cho biết tệp dùng gì mà không nói tháng này phải làm gì. Nguồn số, chỗ dán, ô kiểm và lỗi từng gặp là bốn thứ người đọc cần ngay.",
    diagram: [
      { label: "Nguồn số: lấy từ đâu, ai cung cấp, ngày nào", arrow: true },
      { label: "Cách cập nhật: dán vào đâu, xoá gì trước", arrow: true },
      { label: "Ô kiểm: báo Khớp thì gửi, báo Lệch thì xem gì", arrow: true },
      { label: "Lỗi từng gặp và cách xử lý" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: nhóm vận hành 4 người",
      description:
        "Một nhóm vận hành có báo cáo tồn kho hàng tháng do một người làm. Khi người đó nghỉ, đồng nghiệp mở mẫu nhưng không biết số lấy từ hệ thống nào và không hiểu ô Lệch nghĩa là gì, nên trì hoãn một tuần. Đây là tình huống minh hoạ: trang hướng dẫn bốn mục ở trên là phần còn thiếu.",
    },
    quiz: [
      {
        question: "Mục nào trong trang hướng dẫn giúp đồng nghiệp biết tháng này lấy số ở đâu?",
        options: [
          "Nguồn số: hệ thống hoặc người cung cấp, báo cáo nào, ngày nào",
          "Mục lịch sử chỉnh sửa tệp, ghi ai đã đổi gì trong các tháng trước",
          "Mục liệt kê các ô đã tô màu trong bảng tính",
          "Mục ghi tên người thiết kế mẫu và ngày tạo",
        ],
        correct: 0,
        explanation:
          "Nguồn số trả lời thẳng câu hỏi: lấy ở đâu, của ai, vào ngày nào. Lịch sử chỉnh sửa, danh sách ô tô màu hay tên người thiết kế đều hữu ích ở chỗ khác nhưng không cho người kế nhiệm biết lấy số từ đâu.",
      },
      {
        question: "Vì sao trang hướng dẫn nên ghi cả những lỗi từng gặp?",
        options: [
          "Để người kế nhiệm khỏi mất thời gian đi lại con đường bạn đã đi",
          "Để chứng minh với sếp rằng mẫu đã từng hỏng nhiều lần trước đây",
          "Để trang hướng dẫn dài ra trông có vẻ đầy đủ",
          "Để người dùng mẫu biết có thể bỏ qua ô kiểm",
        ],
        correct: 0,
        explanation:
          "Mỗi lỗi từng gặp, như số dán thành chữ hoặc sao kê thiếu dòng khi lọc, là một tốn kém bạn đã trả. Ghi lại để người sau không trả lần nữa. Mục đích không phải chứng minh hay làm dài trang, và càng không phải để bỏ ô kiểm, vì chính ô kiểm bắt các lỗi đó.",
      },
      {
        question: "Ô kiểm báo Lệch. Trang hướng dẫn nên dặn người dùng điều gì đầu tiên?",
        options: [
          "Đừng gửi báo cáo; xem lại số dòng, rồi dạng số ở các dòng vừa dán",
          "Gửi báo cáo và ghi chú có thể đã lệch một chút",
          "Xoá ô kiểm đi cho báo cáo gọn hơn, rồi gửi như mọi tháng",
          "Liên hệ người viết mẫu rồi chờ họ sửa công thức giúp",
        ],
        correct: 0,
        explanation:
          "Hướng dẫn tốt biến Lệch thành danh sách việc cần xem theo thứ tự thường gặp. Gửi báo cáo đã lệch hay xoá ô kiểm vứt bỏ phép kiểm. Chờ người viết mẫu làm người kế nhiệm phụ thuộc vào đúng người đang vắng mặt, mất ý nghĩa của trang hướng dẫn.",
      },
      {
        question: "Bạn nhờ AI soạn trang hướng dẫn từ mô tả của bạn. Phần nào của bản nháp bạn phải tự kiểm kỹ nhất?",
        options: [
          "Tên hệ thống nguồn, tên ô và bước thao tác, vì AI có thể bịa",
          "Giọng văn lịch sự, vì AI hay viết quá cộc",
          "Độ dài bản nháp, vì AI luôn viết quá ngắn so với điều bạn cần",
          "Định dạng gạch đầu dòng, vì AI hay viết đoạn văn dài",
        ],
        correct: 0,
        explanation:
          "Những gì cụ thể mà AI không biết, như tên hệ thống nguồn, ô nào là ô kiểm, bước dán nào, nó sẽ điền cho nghe trơn tru nếu bạn không đưa. Giọng văn, độ dài hay định dạng bạn thấy và sửa ngay. Một tên ô sai trong trang hướng dẫn làm người kế nhiệm dán nhầm chỗ.",
      },
      {
        question: "Cách tốt nhất để biết trang hướng dẫn đã đủ dùng là gì?",
        options: [
          "Nhờ một đồng nghiệp chưa từng dùng mẫu làm theo, và ghi nơi họ vướng",
          "Tự đọc lại một lần thật kỹ, vì bạn hiểu mẫu nhất",
          "Nhờ AI chấm điểm trang hướng dẫn trên thang mười rồi sửa tới khi được điểm cao",
          "Đếm số mục xem trang có đủ bốn mục như trong dàn ý ban đầu không",
        ],
        correct: 0,
        explanation:
          "Bạn đã biết mẫu nên không còn thấy chỗ thiếu; người chưa từng dùng thì vướng ngay chỗ đó. AI chấm điểm mà không làm theo thì cho một con số nghe hợp lý chứ không bằng chứng. Đủ mục theo dàn ý chưa nói mỗi mục có đủ dùng hay chưa.",
      },
    ],
    keyTakeaways: [
      "Trang hướng dẫn có bốn mục: nguồn số, cách cập nhật, ô kiểm, lỗi từng gặp.",
      "Ô kiểm Lệch cần một danh sách việc cần xem theo thứ tự.",
      "AI soạn nháp được, nhưng tên hệ thống, tên ô và bước thao tác bạn phải tự kiểm.",
      "Thử bằng một người chưa từng dùng mẫu: nơi họ vướng là nơi còn thiếu.",
    ],
    practicePrompt: {
      question:
        "Trang hướng dẫn viết: dán số mới vào sheet dữ liệu. Đồng nghiệp hỏi: sheet dữ liệu nào, dán từ ô nào, xoá số cũ chưa? Sửa câu nào tốt nhất?",
      options: [
        "Xoá số cũ ở sheet Nhap, cột A đến C, rồi dán số mới từ ô A2",
        "Dán số mới vào chỗ phù hợp nhất trong sheet dữ liệu của tháng trước",
        "Dán số mới như mọi tháng, bạn biết rồi mà",
        "Dán số mới cẩn thận, không làm hỏng công thức",
      ],
      correct: 0,
      explanation:
        "Câu tốt có tên sheet, vùng ô, bước xoá và ô bắt đầu: người chưa dùng mẫu không phải đoán gì. Hai câu sau dựa vào việc người đọc đã biết, và câu phù hợp nhất không chỉ ra chỗ nào. Hướng dẫn mơ hồ chính là chỗ người kế nhiệm dán sai và lỗi bắt đầu.",
    },
    summary: {
      keyIdea: "Mẫu chỉ thật sự xong khi người chưa từng dùng làm theo trang hướng dẫn và ra báo cáo đúng.",
      formula: "Nguồn số + cách cập nhật + ô kiểm + lỗi từng gặp = trang hướng dẫn đủ dùng.",
      commonMistake: "Viết hướng dẫn cho chính mình: thiếu tên sheet, vùng ô, thứ tự bước.",
      action: "Soạn trang hướng dẫn bốn mục cho mẫu của bạn và nhờ một đồng nghiệp làm thử.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Thêm một sheet Huong dan vào mẫu báo cáo của bạn với bốn mục: nguồn số (hệ thống, người cung cấp, ngày), cách cập nhật (xoá gì, dán vào đâu), ô kiểm (Khớp thì làm gì, Lệch thì xem gì), và ít nhất hai lỗi bạn từng gặp. Nhờ AI chuẩn hoá câu chữ, rồi tự kiểm mọi tên sheet và tên ô, và nhờ một đồng nghiệp làm thử.",
      secondary: "Ngày mai dashboard sẽ hỏi: trang hướng dẫn của bạn đã có mấy mục và ai đã thử làm theo?",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn đã biết làm sạch cột, tra cứu, ghép bảng, tổng hợp và kiểm công thức. Bài cuối gộp tất cả vào một sản phẩm: mẫu báo cáo tháng mà đồng nghiệp dùng được khi bạn đi vắng. Một mẫu có ô kiểm và một trang hướng dẫn, đó là bàn giao thật.",
      },
      {
        type: "feynman",
        title: "Trang hướng dẫn đơn giản hơn bạn nghĩ",
        intro: "Trang hướng dẫn giống tờ giấy dán trên máy pha cà phê của văn phòng: người mới đến chỉ cần đọc là pha được, không cần gọi người đã đi nghỉ.",
        columns: ["Thành phần", "Tờ giấy dán trên máy pha cà phê", "Trang hướng dẫn của mẫu"],
        rows: [
          ["Nguyên liệu", "Cà phê lấy ở ngăn nào", "Nguồn số: lấy từ hệ thống nào, của ai"],
          ["Các bước", "Đổ nước chỗ nào, bấm nút nào", "Cách cập nhật: xoá gì, dán vào đâu"],
          ["Đèn báo", "Đèn đỏ là hết nước, đổ thêm", "Ô kiểm: Lệch thì xem gì đầu tiên"],
          ["Chuyện đã xảy ra", "Đừng dùng cốc giấy mỏng, nước nóng làm mềm", "Lỗi từng gặp: số dán thành chữ, sao kê thiếu dòng"],
        ],
        oneLiner: "Trang hướng dẫn là tờ giấy dán trên máy: ai đến cũng làm được mà không phải hỏi người vắng mặt.",
      },
      { type: "heading", text: "Bốn mục, một trang" },
      {
        type: "paragraph",
        text: "Trang hướng dẫn tốt chỉ cần vừa một màn hình. Mục một, nguồn số: số lấy từ hệ thống hoặc từ ai, báo cáo nào, vào ngày nào. Mục hai, cách cập nhật: xoá vùng nào, dán vào ô nào. Mục ba, ô kiểm: Khớp nghĩa là gì, Lệch thì xem gì đầu tiên. Mục bốn, lỗi từng gặp: hai hoặc ba lỗi thật. Hai từ mới cần nhớ: bàn giao là khi người khác dùng được mà không cần bạn, và lỗi từng gặp là danh sách những chỗ đã hỏng thật.",
      },
      {
        type: "flow",
        title: "Từ mẫu của bạn đến mẫu của cả nhóm",
        steps: [
          { label: "Viết bốn mục bằng lời của bạn", detail: "Mỗi mục vài dòng, có tên sheet, tên ô, tên hệ thống thật. Chưa cần đẹp, cần đủ." },
          { label: "Nhờ AI chuẩn hoá câu chữ", detail: "Đưa bản nháp của bạn và dặn: giữ nguyên mọi tên sheet, tên ô, tên hệ thống; chỉ làm câu rõ hơn, mỗi bước một dòng." },
          { label: "Tự kiểm từng tên cụ thể", detail: "Đối chiếu mọi tên sheet, ô và hệ thống trong bản AI sửa với tệp thật. AI có thể đổi hoặc thêm tên nghe hợp lý." },
          { label: "Nhờ một người chưa dùng mẫu làm thử", detail: "Ngồi cạnh, không nói gì thêm, ghi lại nơi họ dừng lại hoặc hỏi. Mỗi chỗ đó là một câu còn thiếu trong trang hướng dẫn." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Hướng dẫn cho chính mình",
          text: "Dán số mới vào sheet dữ liệu rồi xem kết quả. Nếu lỗi thì sửa. Người viết biết hết nên không ghi tên sheet, vùng ô hay thứ tự bước, và người đọc phải đoán.",
        },
        right: {
          label: "Hướng dẫn cho người kế nhiệm",
          text: "Xoá cột A đến C ở sheet Nhap từ dòng 2, dán số mới từ A2, đọc ô kiểm ở Tinh!F1. Khớp thì gửi. Lệch thì đếm dòng, rồi xem dạng số. Mọi tên đều cụ thể.",
        },
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI chuẩn hoá trang hướng dẫn",
        task: "Bạn có bản nháp trang hướng dẫn bốn mục cho báo cáo chi phí tháng (sheet Nhap, Tinh, ô kiểm Tinh!F1, sao kê từ phòng kế toán). Lắp yêu cầu để AI làm câu chữ rõ hơn mà không bịa thêm.",
        parts: [
          {
            id: "give",
            label: "Đưa gì cho AI",
            options: [
              {
                text: "Bản nháp của bạn với mọi tên thật: sheet Nhap, Tinh, ô kiểm Tinh!F1, sao kê do phòng kế toán gửi ngày mùng 3.",
                good: true,
                feedback: "AI làm việc trên dữ kiện thật của bạn và chỉ chỉnh câu chữ, không phải điền chỗ trống.",
              },
              {
                text: "Chỉ nói: soạn giúp tôi trang hướng dẫn cho báo cáo chi phí.",
                feedback: "AI sẽ bịa tên sheet, tên hệ thống và quy trình nghe rất hợp lý mà không có thật trong tệp của bạn.",
              },
            ],
          },
          {
            id: "rule",
            label: "Ràng buộc",
            options: [
              {
                text: "Giữ nguyên mọi tên sheet, tên ô, tên hệ thống và con số; chỉ viết lại câu cho rõ. Chỗ nào thiếu thì hỏi tôi, đừng tự điền.",
                good: true,
                feedback: "Lời dặn giữ tên và cho phép hỏi lại ngăn AI điền chỗ trống bằng chi tiết bịa.",
              },
              {
                text: "Làm cho trang hướng dẫn thật đầy đủ, chi tiết.",
                feedback: "Đầy đủ chi tiết là lời mời AI thêm chi tiết: nó sẽ thêm cả bước và tên không có thật.",
              },
            ],
          },
          {
            id: "fmt",
            label: "Dạng trình bày",
            options: [
              {
                text: "Bốn mục có tiêu đề, mỗi bước một dòng đánh số, cả trang vừa một màn hình.",
                good: true,
                feedback: "Người kế nhiệm đọc và làm theo từng dòng, không phải lần trong đoạn văn dài.",
              },
              {
                text: "Viết thành một bài văn mạch lạc, có mở đầu và kết luận.",
                feedback: "Bài văn đẹp nhưng người dùng mẫu phải tìm bước trong các đoạn, dễ bỏ sót một bước.",
              },
            ],
          },
        ],
        responses: [
          {
            requires: ["give", "rule", "fmt"],
            text: "1. Nguồn số\n- Sao kê chi phí do phòng kế toán gửi vào ngày mùng 3 hằng tháng.\n2. Cách cập nhật\n- Xoá số cũ ở sheet Nhap, cột A đến C, từ dòng 2.\n- Dán sao kê mới từ ô A2.\n3. Ô kiểm\n- Đọc ô Tinh!F1. Khớp: gửi báo cáo. Lệch: đếm số dòng đã dán, rồi xem dạng số ở cột C.\n4. Lỗi từng gặp\n- (Bạn hãy bổ sung: ít nhất hai lỗi thật.) Tôi chưa có thông tin về lỗi từng gặp nên để trống thay vì đoán.",
          },
          {
            requires: ["give"],
            text: "Trang hướng dẫn: cập nhật sheet Nhap từ sao kê mùng 3 của phòng kế toán, rồi đọc ô kiểm Tinh!F1. Lưu ý kiểm tra cẩn thận và đảm bảo số liệu chính xác trước khi gửi.\n(Đúng tên, nhưng câu chung chung, không đủ bước cụ thể và thiếu phần lỗi từng gặp.)",
          },
          {
            text: "Bước 1: Đăng nhập hệ thống ERP và xuất báo cáo chi phí quý. Bước 2: Dán vào sheet Dữ liệu tổng hợp. Bước 3: Chạy macro Cập nhật và gửi cho giám đốc tài chính.\n(AI bịa ERP, macro và người nhận. Không chi tiết nào trong đó có thật trong tệp của bạn.)",
          },
        ],
      },
      {
        type: "callout",
        label: "Thử bằng người thật",
        text: "Đưa mẫu cùng trang hướng dẫn cho một đồng nghiệp chưa từng dùng, không nói gì thêm. Ngồi cạnh và chỉ ghi lại: họ dừng ở đâu, họ hỏi gì, họ dán nhầm chỗ nào. Mỗi lần dừng là một câu còn thiếu. Sửa rồi thử lại; hai vòng thường là đủ.",
      },
      {
        type: "scenario",
        title: "Bàn giao mẫu trước kỳ nghỉ",
        start: "s1",
        nodes: {
          s1: {
            text: "Còn hai ngày là bạn nghỉ phép. Mẫu có ba vùng và ô kiểm; chưa có trang hướng dẫn. Đồng nghiệp sẽ làm báo cáo tuần sau.",
            choices: [
              { label: "Nhắn đồng nghiệp: cứ dán số mới vào, có gì hỏi tôi qua tin nhắn", next: "bad_chat" },
              { label: "Viết trang hướng dẫn bốn mục rồi nhờ đồng nghiệp làm thử trước khi nghỉ", next: "s2" },
            ],
          },
          bad_chat: {
            text: "Đồng nghiệp dán số vào sheet Tinh thay vì Nhap và đè lên công thức. Bạn đang ở xa, tin nhắn không rõ, báo cáo trễ hai ngày và tổng sai.",
            ending: "bad",
          },
          s2: {
            text: "Bạn nhờ AI chuẩn hoá bản nháp, đối chiếu tên với tệp. Khi đồng nghiệp làm thử, họ dừng ở câu: dán sao kê mới, không rõ xoá số cũ trước hay không.",
            choices: [
              { label: "Bỏ qua, họ tự hiểu được thôi, rồi nghỉ phép", next: "bad_skip" },
              { label: "Thêm bước Xoá số cũ ở Nhap từ dòng 2 vào trước, rồi nhờ thử lại", next: "good" },
            ],
          },
          bad_skip: {
            text: "Tuần sau đồng nghiệp dán sao kê mới xuống dưới số cũ, tổng gấp đôi. Ô kiểm báo Lệch nhưng hướng dẫn không nói Lệch thì xem gì, nên họ gửi luôn.",
            ending: "bad",
          },
          good: {
            text: "Lần thử thứ hai, đồng nghiệp làm xong trong mười lăm phút, ô kiểm báo Khớp. Bạn đi nghỉ với một mẫu thật sự đã bàn giao.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Mẫu có ô kiểm và trang hướng dẫn là báo cáo biết tự giải thích và tự báo khi hỏng.",
          "Chặng này xong: bảng tính bạn giao đi, người khác dùng được và kiểm được.",
        ],
      },
    ],
  },
];
