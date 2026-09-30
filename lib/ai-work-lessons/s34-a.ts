import type { Lesson } from "../lesson-types";

// Chặng 34, bài 1-5. Giáo trình: scripts/curriculum/stage-34.json.
// Không nêu tính năng riêng của công cụ nào: chỉ dạy cách giao việc và kiểm kết quả.
export const S34_A_LESSONS: Lesson[] = [
  {
    id: 2080,
    slug: "viet-lai-mo-ta-mon-tren-menu",
    title: "Chặng 34, Bài 1: Viết lại mô tả món trên menu mà không hứa quá",
    subtitle: "Mô tả món giống lời chào của người phục vụ: hấp dẫn, nhưng nói đúng những gì có trong bát.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🍜",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Menu là nhân viên phục vụ thầm lặng: khách đọc nó trước khi hỏi ai. Dòng mô tả mơ hồ khiến khách hỏi lại giữa giờ đông, còn dòng mô tả hứa quá tay (thịt «nhập khẩu», nước dùng «không bột ngọt») có thể thành tranh cãi hoặc rủi ro thật với người dị ứng. AI viết nhanh phần chữ, nhưng chỉ bạn và bếp biết món có gì.",
    openingQuestion:
      "Bạn nhờ AI viết lại dòng «Phở bò đặc biệt» cho menu. Nó trả về «phở bò nấu từ xương hầm 24 giờ, hoàn toàn không chứa gluten». Bạn nên làm gì trước khi đưa dòng này lên menu?",
    openingOptions: [
      "Hỏi bếp xem xương có thật hầm 24 giờ không và gluten có trong món không",
      "Giữ nguyên, vì AI đã viết rất hấp dẫn và đúng kiểu menu nhà hàng lớn ở thành phố",
      "Chỉ bỏ chữ «24 giờ» cho đỡ dài, còn phần không chứa gluten thì để lại",
      "Nhờ AI viết lại lần nữa cho tới khi câu chữ nghe thật thuyết phục",
    ],
    correctOption: 0,
    explanation:
      "AI không biết bếp bạn hầm xương bao lâu, cũng không biết nước tương hay bánh phở của bạn có gluten hay không: nó chọn những cụm nghe hợp với một món phở. Câu «không chứa gluten» là lời cam kết về sức khoẻ, sai một lần là người ăn chịu hậu quả. Bỏ bớt chữ mà vẫn giữ cam kết chưa xử lý được gốc vấn đề, còn viết lại nhiều lần chỉ cho ra những lời hứa mới cũng không có căn cứ. Chỉ bếp mới xác nhận được từng chi tiết.",
    diagram: [
      { label: "Bếp đưa công thức và nguyên liệu thật", arrow: true },
      { label: "AI viết nháp mô tả từ chính dữ kiện đó", arrow: true },
      { label: "Bạn đối chiếu từng dòng với bếp", arrow: true },
      { label: "Dòng nào nói về dị ứng thì ghi «hỏi nhân viên»" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: quán bún riêu nhỏ",
      description:
        "Chủ quán chép nguyên đoạn AI viết «riêu cua đồng tươi mỗi sáng» lên menu. Thực tế những hôm hết cua đồng, bếp dùng gạch cua đóng hộp. Khách quen nhận ra và hỏi thẳng. Chủ quán sửa lại quy trình: nhờ AI viết nháp từ danh sách nguyên liệu bếp gửi mỗi tháng, rồi bếp trưởng ký duyệt từng dòng trước khi in.",
    },
    quiz: [
      {
        question: "Khi nhờ AI viết mô tả món, thứ nào phải do chính quán đưa vào?",
        options: [
          "Nguyên liệu thật của món theo công thức mà bếp đang nấu",
          "Chỉ tên món, vì AI đã biết món đó thường có những gì",
          "Danh sách món nổi tiếng của quán khác để AI viết cho giống",
          "Mức độ ngon do AI tự đánh giá dựa trên những gì nó đã đọc",
        ],
        correct: 0,
        explanation:
          "AI chỉ đoán nguyên liệu điển hình của một món, còn quán bạn có thể thay hoặc bỏ nhiều thứ. Đưa công thức thật thì mô tả bám đúng món. Chỉ đưa tên món khiến nó tự thêm nguyên liệu; bắt chước quán khác dễ kéo theo lời hứa của quán đó; AI không nếm được nên «độ ngon» là chữ nó bịa.",
      },
      {
        question: "Dòng nào đáng nghi nhất trong một mô tả món do AI viết?",
        options: [
          "«Không chứa đậu phộng, phù hợp mọi người kiêng ăn»",
          "«Bánh mì giòn, nhân pa-tê và dưa chua cắt mỏng»",
          "«Phần vừa cho một người ăn, kèm rau sống và ớt tươi»",
          "«Nước chấm chua ngọt pha theo công thức nhà làm»",
        ],
        correct: 0,
        explanation:
          "Dòng khẳng định «không chứa» một chất gây dị ứng là lời cam kết về sức khoẻ và AI không thể biết bếp có dùng chung dầu, chung thớt hay không. Các dòng còn lại mô tả hương vị và khẩu phần, bạn kiểm bằng mắt khi bếp ra món. Với chất gây dị ứng, hãy để bếp xác nhận rồi ghi «hỏi nhân viên».",
      },
      {
        question: "Vì sao nên yêu cầu AI viết mô tả «tối đa 15 chữ» thay vì «viết cho hay»?",
        options: [
          "Giới hạn cụ thể giúp mô tả gọn, ít chỗ để AI thêm lời hứa",
          "Vì AI chỉ viết được tối đa 15 chữ trong một lần nhận yêu cầu từ bạn",
          "Vì khách chỉ đọc menu khi mô tả ngắn hơn tên món",
          "Vì càng ngắn thì AI càng khỏi phải kiểm tra lại dữ kiện",
        ],
        correct: 0,
        explanation:
          "«Viết cho hay» khiến AI tô điểm bằng những tính từ nó tự nghĩ ra. Giới hạn độ dài buộc nó chỉ giữ ý chính từ dữ kiện bạn đưa. AI không bị giới hạn 15 chữ, và mô tả ngắn không tự làm dữ kiện đúng hơn: bạn vẫn phải đối chiếu.",
      },
      {
        question: "AI viết «thịt bò Úc nhập khẩu» nhưng bạn chỉ nói «thịt bò». Đây là lỗi gì?",
        options: [
          "AI thêm chi tiết nghe sang mà không ai cung cấp, có thể sai sự thật",
          "AI dịch sai vì bạn viết bằng tiếng Việt không dấu",
          "AI cố ý quảng cáo giúp nhà cung cấp mà quán đang dùng",
          "Không phải lỗi, vì thịt bò nào cũng có thể gọi là nhập khẩu",
        ],
        correct: 0,
        explanation:
          "AI điền chỗ trống bằng chữ nghe hợp lý: «Úc», «nhập khẩu» làm món có vẻ đắt giá hơn. Nếu bếp dùng bò trong nước, dòng này là thông tin sai với khách. AI không có ý quảng cáo cho ai, nó chỉ đoán chữ tiếp theo. Gọi mọi loại thịt là nhập khẩu là nói sai, không phải cách diễn đạt.",
      },
      {
        question: "Sau khi AI viết xong 10 mô tả, bước nào bắt buộc trước khi in menu?",
        options: [
          "Bếp trưởng đọc từng dòng đối chiếu với công thức",
          "Nhờ chính AI đọc lại rồi xác nhận các mô tả đều đúng",
          "Đăng thử lên mạng xã hội xem khách có ai góp ý không",
          "Cho nhân viên mới đọc thử, dễ hiểu là in",
        ],
        correct: 0,
        explanation:
          "Người duy nhất biết món thật sự có gì là bếp. AI tự soát lại chính nó thì dễ xác nhận luôn điều vừa bịa. Đợi khách góp ý nghĩa là để sai sót ra thị trường trước, còn nhân viên mới đọc dễ hiểu chỉ chứng minh câu chữ mượt chứ chưa chứng minh câu chữ đúng.",
      },
    ],
    keyTakeaways: [
      "Đưa AI nguyên liệu thật từ bếp, không chỉ tên món.",
      "Cho giới hạn cụ thể: số chữ, giọng, không thêm chi tiết không có trong công thức.",
      "AI không biết quán bạn dùng chung dầu hay thớt: mọi dòng về dị ứng phải do bếp xác nhận.",
      "Menu ghi «hỏi nhân viên về chất gây dị ứng» an toàn hơn một lời cam kết «không chứa».",
      "Bếp trưởng đối chiếu từng dòng trước khi in.",
    ],
    practicePrompt: {
      question:
        "Món «Gỏi cuốn tôm thịt» có tôm, thịt luộc, bún, rau thơm, nước chấm tương đậu. AI viết thêm «không chứa hải sản khác ngoài tôm». Bạn xử lý thế nào?",
      options: [
        "Bỏ câu đó, giữ mô tả nguyên liệu và ghi «hỏi nhân viên về dị ứng»",
        "Giữ câu đó vì bạn thấy trong công thức chỉ có mỗi tôm là hải sản mà thôi",
        "Sửa thành «không chứa hải sản» cho ngắn và dễ hiểu hơn",
        "Bỏ hẳn tên tôm khỏi mô tả để khỏi phải nhắc tới hải sản",
      ],
      correct: 0,
      explanation:
        "Nước chấm, nước sốt và dầu chiên đôi khi có thành phần mà người soạn menu không nhớ. Câu «không chứa» đòi hỏi bếp xác nhận cho từng nguyên liệu phụ. Sửa thành «không chứa hải sản» còn sai hơn vì món có tôm. Bỏ tên tôm làm khách hiểu nhầm nguyên liệu chính.",
    },
    summary: {
      keyIdea: "AI viết mô tả, bếp xác nhận sự thật, menu chỉ hứa điều bếp làm được.",
      formula: "Công thức thật từ bếp + giới hạn độ dài + đối chiếu từng dòng = mô tả không hứa quá.",
      commonMistake: "In luôn đoạn AI viết vì nó đọc trôi chảy, trong đó có cả lời khẳng định về dị ứng.",
      action: "Chọn một món, ghi nguyên liệu thật, nhờ AI viết một câu, gạch chân mọi chi tiết bạn chưa chắc.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn 3 món trên menu quán bạn (hoặc quán bạn hay ăn). Với mỗi món, ghi 4-6 nguyên liệu thật, nhờ AI viết mô tả tối đa 15 chữ. Rồi gạch dưới mọi chi tiết không có trong danh sách của bạn: đó là chỗ AI tự thêm. Ngày mai bạn sẽ được hỏi: có bao nhiêu chi tiết bị gạch?",
      secondary: "Với món có chất hay gây dị ứng như hải sản, đậu phộng, sữa, trứng, hãy ghi thêm dòng «hỏi nhân viên» thay vì cam kết.",
    },
    sections: [
      {
        type: "lead",
        text: "Giờ cao điểm, một khách chỉ vào dòng «Bún chả đặc biệt» và hỏi «đặc biệt là có gì vậy em?». Nhân viên nói ba câu khác nhau vì menu không ghi. Bài này giúp bạn nhờ AI viết dòng mô tả ngắn, đúng nguyên liệu, để khách khỏi hỏi lại mà quán cũng không hứa những điều mình không làm được.",
      },
      {
        type: "feynman",
        title: "Nhờ AI viết mô tả món đơn giản hơn bạn nghĩ",
        intro: "Hình dung bạn nhờ một người bạn giỏi viết giới thiệu món ăn cho quán. Bạn chưa từng đưa công thức, bạn chỉ nói tên món.",
        columns: ["Thành phần", "Người bạn giỏi viết", "AI tạo sinh"],
        rows: [
          ["Thiếu dữ kiện", "Nghe tên món rồi tự tưởng tượng nguyên liệu", "Điền chữ hợp lý theo món thường thấy"],
          ["Có công thức", "Viết đúng những gì bạn đã kể", "Bám dữ kiện bạn đưa, viết gọn theo giới hạn"],
          ["Lời hứa", "Có thể quá lời cho món nghe ngon", "Thêm tính từ, xuất xứ, lời cam kết chưa được kiểm"],
          ["Người chịu trách nhiệm", "Chủ quán, không phải người bạn", "Bạn và bếp, không phải AI"],
        ],
        oneLiner: "AI là người bạn viết giỏi chưa từng vào bếp quán bạn: cho công thức thật, rồi bếp đọc lại.",
      },
      { type: "heading", text: "Vấn đề: dòng mô tả trống hoặc hứa quá" },
      {
        type: "paragraph",
        text: "Menu hay rơi vào hai kiểu. Kiểu thứ nhất ghi trơ tên món: khách hỏi lại, nhân viên trả lời mỗi người một kiểu. Kiểu thứ hai viết cho kêu: «thượng hạng», «không bột ngọt», «nhập khẩu». AI (trí tuệ nhân tạo tạo sinh, tức chương trình viết chữ dựa trên những văn bản nó đã đọc) rất dễ đẩy bạn sang kiểu thứ hai, vì nó nghe quen với văn quảng cáo món ăn.",
      },
      {
        type: "flow",
        title: "Từ công thức của bếp đến dòng chữ trên menu",
        steps: [
          { label: "Bếp ghi nguyên liệu thật", detail: "Bếp trưởng liệt kê nguyên liệu chính, nước sốt, cách chế biến chính. Chỉ ghi điều bếp chắc chắn, còn chỗ nào không chắc thì đánh dấu để hỏi lại." },
          { label: "Bạn giao việc cho AI", detail: "Dán danh sách ấy kèm yêu cầu: tối đa 15 chữ, giọng thân thiện, không thêm nguyên liệu, xuất xứ hay lời cam kết ngoài danh sách." },
          { label: "AI viết nháp", detail: "AI trả về vài phương án. Phương án tốt bám danh sách; phương án tệ có thêm chữ như «tươi mỗi sáng» hay «không chứa»." },
          { label: "Bếp đối chiếu", detail: "Bạn đưa bản nháp cho bếp trưởng gạch từng chữ không có trong công thức. Dòng nào nhắc chất gây dị ứng thì đổi thành «hỏi nhân viên»." },
        ],
      },
      { type: "heading", text: "Ba cụm từ nên nghi ngờ" },
      {
        type: "list",
        items: [
          "Xuất xứ và độ tươi: «nhập khẩu», «tươi mỗi sáng», «đặc sản vùng». Chỉ giữ khi bếp xác nhận.",
          "Cách nấu: «hầm 24 giờ», «không dùng bột ngọt». Bếp phải đúng đến từng chi tiết.",
          "Lời cam kết về sức khoẻ: «không chứa», «tốt cho tim». AI không thể biết, bạn cũng không nên tự hứa.",
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Mô tả bám dữ kiện",
          text: "«Bún chả nướng than, chả viên và chả miếng, ăn kèm bún, rau sống, nước chấm chua ngọt.» Mỗi chữ có trong công thức. Khách hiểu món, bếp không lo bị hỏi vặn.",
        },
        right: {
          label: "Mô tả hứa quá",
          text: "«Bún chả gia truyền ba đời, thịt heo sạch tuyển chọn, không chất bảo quản.» Nghe hấp dẫn nhưng ba chi tiết đều là lời hứa mà quán chưa chắc chứng minh được.",
        },
      },
      {
        type: "callout",
        label: "Dị ứng không phải chuyện chữ nghĩa",
        text: "Người dị ứng có thể bị nguy hiểm nếu tin một dòng «không chứa» sai. Đừng để AI hay chính bạn tự viết lời khẳng định đó. Ghi «Vui lòng hỏi nhân viên nếu bạn dị ứng» và để bếp trả lời từng ca cụ thể. Nếu quán cần ghi nhãn chất gây dị ứng theo quy định, hãy hỏi chuyên gia hoặc cơ quan quản lý địa phương.",
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI viết mô tả cho món Cơm tấm sườn nướng",
        task: "Bếp gửi công thức: sườn heo ướp sả tỏi nướng than, cơm tấm, bì, trứng ốp la, dưa leo, nước mắm pha chua ngọt. Lắp một prompt để AI viết mô tả tối đa 15 chữ, không hứa quá.",
        parts: [
          {
            id: "data",
            label: "Dữ kiện",
            options: [
              { text: "Món tên là Cơm tấm sườn nướng.", feedback: "AI phải tự đoán nguyên liệu, nên sẽ thêm bì chả, hành phi hay «heo sạch» theo trí nhớ về món cơm tấm nói chung." },
              { text: "Sườn heo ướp sả tỏi nướng than, cơm tấm, bì, trứng ốp la, dưa leo, nước mắm chua ngọt.", good: true, feedback: "Dữ kiện thật từ bếp: AI chỉ việc viết gọn, ít chỗ trống để bịa." },
            ],
          },
          {
            id: "limit",
            label: "Giới hạn",
            options: [
              { text: "Viết thật hấp dẫn để khách thèm ăn.", feedback: "«Hấp dẫn» khiến AI thêm tính từ như «thơm lừng, mềm tan» và lời hứa nguồn gốc mà bạn không đưa." },
              { text: "Tối đa 15 chữ, không thêm nguyên liệu, xuất xứ hay cam kết nào ngoài danh sách.", good: true, feedback: "Giới hạn kiểm được bằng cách đếm chữ và soát từng cụm, nên bạn nhanh chóng biết AI có thêm gì không." },
            ],
          },
          {
            id: "allergy",
            label: "Xử lý chất gây dị ứng",
            options: [
              { text: "Ghi thêm món này không chứa gluten và không chứa đậu phộng.", feedback: "Bạn buộc AI nêu lời cam kết bạn chưa hỏi bếp, có thể sai với nước mắm hay dầu chiên." },
              { text: "Không nêu chất gây dị ứng; thêm cuối dòng «Dị ứng: vui lòng hỏi nhân viên».", good: true, feedback: "Trách nhiệm xác nhận thuộc về bếp với từng khách cụ thể; menu chỉ nhắc khách hỏi." },
            ],
          },
        ],
        responses: [
          { requires: ["data", "limit", "allergy"], text: "Sườn heo ướp sả tỏi nướng than, ăn cùng bì, trứng ốp la, dưa leo.\nDị ứng: vui lòng hỏi nhân viên.\n\n(Mọi chữ đều có trong công thức, còn lời nhắc dị ứng nằm ở đúng chỗ.)" },
          { requires: ["data"], text: "Sườn nướng than thơm lừng, mềm tan, ăn cùng bì, trứng ốp la và nước mắm gia truyền. Không chứa gluten.\n\n(Đủ nguyên liệu nhưng có thêm «gia truyền» và «không chứa gluten» mà bạn chưa kiểm.)" },
          { text: "Cơm tấm sườn bì chả đặc sản Sài Gòn, thịt heo sạch tuyển chọn, nước mắm pha theo bí quyết ba đời.\n\n(AI không có dữ kiện nên tự bịa «bì chả», «heo sạch», «ba đời» như một bài quảng cáo.)" },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI viết nốt phần dặn khách ở cuối menu",
        task: "Bạn muốn một câu ngắn cuối menu nhắc khách hỏi nhân viên nếu có dị ứng hoặc kiêng ăn. Lắp prompt để câu đó không tự hứa điều gì.",
        parts: [
          {
            id: "role",
            label: "Việc cần làm",
            options: [
              { text: "Viết một câu nhắc khách hỏi nhân viên nếu có dị ứng hay kiêng ăn, dưới 20 chữ.", good: true, feedback: "Việc cụ thể, kiểm được bằng cách đếm chữ." },
              { text: "Viết một câu để khách an tâm ăn ở quán.", feedback: "«An tâm» khiến AI dễ viết lời trấn an như «món ăn an toàn tuyệt đối» mà quán không chứng minh được." },
            ],
          },
          {
            id: "ban",
            label: "Điều cấm",
            options: [
              { text: "Không viết câu nào khẳng định món an toàn hoặc không chứa chất gì.", good: true, feedback: "Chặn đúng loại lời hứa nguy hiểm nhất, AI sẽ chỉ nhắc khách hỏi." },
              { text: "Không cần dặn thêm, AI tự biết cách viết cho đúng.", feedback: "AI hay chọn giọng trấn an vì văn bản quảng cáo nó đã đọc thường như vậy." },
            ],
          },
        ],
        responses: [
          { requires: ["role", "ban"], text: "Nếu bạn dị ứng hoặc kiêng ăn, vui lòng hỏi nhân viên trước khi gọi món." },
          { requires: ["role"], text: "Vui lòng hỏi nhân viên nếu bạn dị ứng. Mọi món của chúng tôi đều được chế biến sạch và an toàn.\n\n(Câu nhắc đúng, nhưng có thêm lời «an toàn» chưa ai kiểm.)" },
          { text: "Chúng tôi cam kết mọi món ăn an toàn tuyệt đối cho khách hàng thân yêu.\n\n(Lời cam kết quá tay, và không nhắc khách hỏi ai.)" },
        ],
      },
      {
        type: "closing",
        lines: [
          "Bếp đưa sự thật, AI viết chữ, bếp đọc lại trước khi in.",
          "Bài sau: soát một menu AI viết sẵn để tìm món ghi không khớp thực tế.",
        ],
      },
    ],
  },
  {
    id: 2081,
    slug: "soat-menu-tim-mon-ghi-khong-khop",
    title: "Chặng 34, Bài 2: Soát menu tìm món ghi không khớp với thực tế",
    subtitle: "Đối chiếu từng dòng menu với công thức thật, giống kiểm hàng khi nhập kho.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🔎",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Một menu do AI soạn đọc trơn tru đến mức bạn dễ lướt qua. Nhưng mỗi dòng ghi sai nguyên liệu là một lần khách gọi món vì thứ không có, hoặc tránh nhầm thứ họ kiêng. Soát menu bằng cách đối chiếu với công thức thật là kỹ năng rẻ nhất để tránh cả tranh cãi lẫn rủi ro sức khoẻ.",
    openingQuestion:
      "Chủ quán đưa bạn menu AI viết sẵn để «đọc lại cho chắc». Cách soát nào hiệu quả nhất?",
    openingOptions: [
      "Có công thức bếp bên cạnh, so từng dòng menu với từng nguyên liệu",
      "Đọc một lượt xem câu chữ có trôi chảy và có chính tả sai trong từng dòng không",
      "Nhờ AI đọc lại menu của chính nó rồi báo dòng nào chưa ổn",
      "Chọn ngẫu nhiên vài món để soát, món còn lại giả định là ổn",
    ],
    correctOption: 0,
    explanation:
      "Lỗi nguy hiểm trong menu không nằm ở chính tả mà ở dữ kiện: nguyên liệu, xuất xứ, lời cam kết. Muốn thấy phải có nguồn sự thật (công thức của bếp) đặt cạnh từng dòng. Đọc lướt câu chữ chỉ kiểm được độ mượt. Nhờ AI tự soát thì nó dễ xác nhận luôn điều vừa bịa, còn soát mẫu ngẫu nhiên có thể bỏ sót đúng món sai.",
    diagram: [
      { label: "Menu do AI soạn", arrow: true },
      { label: "Công thức và nguyên liệu thật của bếp", arrow: true },
      { label: "So từng dòng: khớp, thiếu, thừa, khác", arrow: true },
      { label: "Sửa dòng lệch, bếp xác nhận rồi mới in" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: quán cà phê ở khu văn phòng",
      description:
        "Menu AI soạn ghi món «Bánh mì bơ tỏi phô mai mozzarella». Bếp thực tế dùng phô mai cắt lát thông thường vì mozzarella không có sẵn. Một khách gọi vì chính món ấy, hỏi lại rồi trả tiền không vui. Quán thêm một bước: mỗi lần đổi nguyên liệu, người phụ trách sửa dòng menu trong cùng ngày và nhờ AI chỉ soạn nháp từ danh sách nguyên liệu mới.",
    },
    quiz: [
      {
        question: "Khi soát menu, «không khớp» nghĩa là gì?",
        options: [
          "Dòng menu ghi nguyên liệu, cách nấu hoặc lời hứa khác với thực tế",
          "Dòng menu có cách viết khác hẳn với menu của quán bên cạnh cùng con phố",
          "Dòng menu dài hơn các dòng còn lại nên trông chưa đều nhau",
          "Dòng menu dùng từ mà khách ít gặp nên phải đổi cho dễ đọc",
        ],
        correct: 0,
        explanation:
          "Trọng tâm là sự thật: menu nói một đằng, bếp làm một nẻo. Khác quán bên cạnh, dài ngắn hay từ lạ là chuyện phong cách, sửa được sau. Dòng ghi sai nguyên liệu mới gây tranh cãi và rủi ro cho người kiêng ăn.",
      },
      {
        question: "Bạn thấy menu ghi «gà ta thả vườn». Bếp nói dùng gà công nghiệp. Việc đúng là gì?",
        options: [
          "Sửa dòng menu theo thực tế bếp, không sửa bếp cho khớp menu",
          "Giữ dòng đó và dặn nhân viên nếu khách hỏi thì nói là gà ta cho khách yên tâm",
          "Đổi nguyên liệu bếp sang gà ta để menu khỏi phải sửa lại",
          "Bỏ hẳn dòng mô tả nguyên liệu cho khách đỡ có thể hỏi",
        ],
        correct: 0,
        explanation:
          "Menu phải phản ánh cái quán thực sự phục vụ. Dặn nhân viên nói sai là biến lỗi của AI thành lời nói dối có chủ ý. Đổi nguyên liệu vì một dòng văn tốn tiền và không phải việc của người soát menu. Bỏ mô tả thì mất thông tin khách cần.",
      },
      {
        question: "Vì sao không nên nhờ chính AI đã viết menu để nó tự kiểm menu?",
        options: [
          "Nó không biết công thức thật nên dễ xác nhận cả chỗ nó bịa",
          "Vì AI luôn từ chối kiểm tra công việc mà nó đã làm ra",
          "Vì AI chỉ soát được lỗi chính tả, không soát được nội dung và con số",
          "Vì lần thứ hai AI sẽ viết ra menu hoàn toàn khác lần đầu",
        ],
        correct: 0,
        explanation:
          "AI không có nguồn sự thật riêng của quán, nên khi được hỏi «có đúng không» nó xét độ hợp lý của câu chữ chứ không đối chiếu công thức. Nó không từ chối việc tự soát, và có thể soát nội dung nếu bạn đưa công thức cạnh menu; nhưng người quyết định vẫn là bếp.",
      },
      {
        question: "Thứ tự nào hợp lý khi bạn soát một menu 20 món?",
        options: [
          "Gạch các dòng có nguồn gốc, cách nấu, cam kết, rồi hỏi bếp từng dòng",
          "Chọn 5 món đắt nhất để soát, các món rẻ ít ai để ý nên bỏ qua",
          "Soát từ món cuối menu đi lên vì AI hay viết cẩu thả ở phần đầu",
          "Soát nhanh cả 20 món trong 5 phút để kịp gửi đi in ngay",
        ],
        correct: 0,
        explanation:
          "Những cụm dễ sai nhất là xuất xứ, cách chế biến và lời cam kết; gạch chúng trước rồi hỏi bếp thì nhanh mà không sót. Món rẻ vẫn có thể chứa chất gây dị ứng. AI không cẩu thả theo vị trí trong menu. Soát vội là cách để lỗi lọt in.",
      },
      {
        question: "Bạn tìm ra 3 dòng sai trong 20 món. Kết luận nào chính xác?",
        options: [
          "Vẫn phải soát hết vì 17 dòng còn lại chưa được kiểm",
          "17 dòng còn lại chắc đúng, vì AI sai ít hơn 15% số món",
          "Nên bỏ hết menu AI viết rồi soạn lại từ đầu hoàn toàn bằng tay",
          "Đủ rồi, ba lỗi này đã đại diện cho mọi lỗi có thể còn sót lại",
        ],
        correct: 0,
        explanation:
          "Tìm ra 3 lỗi không cho biết số lỗi còn lại. 17 dòng chưa soát là 17 chưa biết, không phải 17 chắc đúng. Bỏ menu đi cũng phí: AI vẫn tiết kiệm công viết, chỉ cần kèm bước đối chiếu. Ba lỗi không «đại diện» cho phần còn lại.",
      },
    ],
    keyTakeaways: [
      "Lỗi nguy hiểm nằm ở dữ kiện, không ở câu chữ.",
      "Soát bằng công thức của bếp đặt cạnh từng dòng menu.",
      "Gạch trước các cụm về xuất xứ, cách nấu, lời cam kết.",
      "Khi lệch, sửa menu theo thực tế chứ không dặn nhân viên nói cho khớp.",
      "Không dùng chính AI đó để tự xác nhận nội dung nó vừa viết.",
    ],
    practicePrompt: {
      question:
        "Menu ghi «Salad cá hồi, sốt mè rang không có sữa». Công thức bếp: cá hồi, rau xà lách, sốt mè rang mua sẵn từ nhà cung cấp, trên nhãn có ghi «có thể chứa sữa». Bạn làm gì?",
      options: [
        "Bỏ cụm «không có sữa» và ghi «hỏi nhân viên về dị ứng»",
        "Giữ cụm đó vì công thức của quán không có sữa trực tiếp",
        "Đổi thành «ít sữa» cho có vẻ đúng hơn với nhãn nhà cung cấp",
        "Bỏ tên món sốt mè khỏi menu để khỏi phải nhắc đến sữa trong mô tả",
      ],
      correct: 0,
      explanation:
        "Nhãn ghi «có thể chứa sữa» nghĩa là câu «không có sữa» có thể sai với người dị ứng. «Ít sữa» là con số bịa. Bỏ tên sốt thì món mất thông tin mà rủi ro vẫn còn. Cách an toàn là bỏ lời cam kết và dẫn khách hỏi nhân viên.",
    },
    summary: {
      keyIdea: "Soát menu là đối chiếu dữ kiện với công thức, không phải đọc cho trôi.",
      formula: "Menu AI + công thức bếp cạnh nhau + gạch cụm nhạy cảm = danh sách dòng cần sửa.",
      commonMistake: "Soát bằng cảm giác «đọc ổn» hoặc nhờ chính AI xác nhận.",
      action: "Lấy một menu bất kỳ, chọn 5 dòng, hỏi bếp hoặc tự đối chiếu nguyên liệu từng dòng.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy menu quán bạn (hoặc menu quán quen), chọn 5 món. Với mỗi món, ghi nguyên liệu bạn biết chắc hoặc hỏi bếp, rồi so với dòng mô tả. Đánh dấu dòng nào có chi tiết bạn không kiểm được. Ngày mai bạn sẽ được hỏi: bao nhiêu dòng lệch và lệch kiểu gì?",
      secondary: "Nếu không có bếp để hỏi, dòng nào bạn không kiểm được cứ ghi «chưa xác nhận» và không dùng.",
    },
    sections: [
      {
        type: "lead",
        text: "Cuối ngày, chủ quán đưa bạn tờ menu mới do AI viết và nói «xem giúp anh có gì sai không, mai in». Bạn đọc thấy trôi chảy cả. Bài này dạy cách nhìn ra chỗ sai giấu trong một bản trôi chảy: không phải bằng đọc kỹ hơn, mà bằng đặt công thức của bếp cạnh từng dòng.",
      },
      {
        type: "feynman",
        title: "Soát menu đơn giản hơn bạn nghĩ",
        intro: "Nhân viên kho nhận hàng: phiếu giao ghi 10 thùng nước mắm, họ không tin phiếu mà đếm thùng thật. Soát menu cũng vậy: menu là phiếu giao, công thức bếp là số thùng thật.",
        columns: ["Thành phần", "Kiểm hàng nhập kho", "Soát menu do AI viết"],
        rows: [
          ["Tài liệu cần kiểm", "Phiếu giao hàng", "Menu do AI soạn"],
          ["Nguồn sự thật", "Hàng thật đếm tại chỗ", "Công thức và nguyên liệu bếp thật sự dùng"],
          ["Điều nên nghi ngờ", "Số lượng, quy cách, hạn dùng", "Nguyên liệu, xuất xứ, cách nấu, cam kết"],
          ["Khi lệch", "Ghi biên bản, sửa phiếu", "Sửa menu theo bếp, không sửa bếp cho khớp menu"],
        ],
        oneLiner: "Menu là phiếu giao, công thức của bếp là hàng thật: đối chiếu từng dòng rồi mới ký nhận.",
      },
      { type: "heading", text: "Vì sao bản trôi chảy lại dễ lọt lỗi" },
      {
        type: "paragraph",
        text: "AI viết theo kiểu chữ nào hợp nhất với chữ đứng trước. Vì vậy khi nó thêm «mozzarella» vào một món phô mai, câu vẫn đúng ngữ pháp, đúng giọng menu. Lỗi ở đây không có dấu hiệu bên ngoài, giống hàng giả đóng thùng đẹp. Bạn chỉ thấy khi so với nguồn thật.",
      },
      {
        type: "flow",
        title: "Bốn bước soát một dòng menu",
        steps: [
          { label: "Tách cụm dữ kiện", detail: "Đọc dòng menu, gạch chân mọi cụm nói về nguyên liệu, xuất xứ, cách nấu, độ tươi, lời cam kết. Cụm mô tả cảm giác như «thơm giòn» để sau." },
          { label: "Tìm trong công thức", detail: "Với mỗi cụm đã gạch, tìm chỗ tương ứng trong công thức bếp. Có, không có, hay khác một chút?" },
          { label: "Gán nhãn", detail: "Khớp thì giữ. Không có trong công thức là thừa, có trong công thức mà menu thiếu là thiếu, khác nhau là lệch. Ghi nhãn cạnh dòng." },
          { label: "Bếp xác nhận và sửa", detail: "Dòng thừa hoặc lệch thì sửa theo công thức, rồi cho bếp trưởng đọc lần cuối. Chỉ sau đó mới in." },
        ],
      },
      { type: "heading", text: "Bốn nhãn để gán cho mỗi dòng" },
      {
        type: "list",
        items: [
          "Khớp: mọi chi tiết đều có trong công thức, giữ nguyên.",
          "Thừa: menu nói điều công thức không có, ví dụ thêm loại phô mai. Bỏ đi.",
          "Thiếu: công thức có chất quan trọng mà menu không nhắc, như nước sốt chứa đậu phộng. Bổ sung hoặc dẫn khách hỏi nhân viên.",
          "Lệch: cùng chỗ nhưng khác chi tiết, ví dụ menu ghi bò Úc còn bếp dùng bò trong nước. Sửa theo bếp.",
        ],
      },
      {
        type: "callout",
        label: "Đừng để AI xác nhận chính nó",
        text: "Hỏi AI «menu này có đúng không?» thì nó xét câu chữ có hợp lý hay không, không có công thức để so. Câu trả lời «đúng» chỉ có nghĩa là nghe hợp lý. Bạn có thể nhờ AI làm bảng đối chiếu nếu đưa cả công thức lẫn menu, nhưng bếp vẫn là người ký.",
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát menu quán cơm văn phòng",
        task: "Công thức bếp: gà rô-ti nấu nước dừa, ăn với cơm trắng và dưa góp; gà mua từ chợ đầu mối trong ngày; nước sốt không dùng đậu phộng nhưng bếp có dùng chung dầu chiên với món khác. Đánh dấu những dòng AI tự thêm hoặc làm lệch.",
        segments: [
          { text: "Cơm gà rô-ti: gà nấu nước dừa, ăn cùng cơm trắng và dưa góp." },
          { text: "Gà thả vườn nuôi tại trang trại riêng của quán.", error: "Công thức chỉ nói gà mua ở chợ đầu mối; «thả vườn» và «trang trại riêng» là AI thêm cho nghe sang." },
          { text: "Nước sốt cô đặc từ nước dừa, vị ngọt vừa." },
          { text: "Hoàn toàn không chứa đậu phộng, an toàn cho người dị ứng.", error: "Sốt không dùng đậu phộng nhưng dầu chiên dùng chung với món khác, nên không thể cam kết an toàn cho người dị ứng." },
          { text: "Dùng gà tươi mua mỗi ngày trong tuần." },
          { text: "Nấu theo công thức 30 năm không đổi.", error: "Không có thông tin nào về «30 năm», AI bịa lịch sử để câu có sức nặng." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI làm bảng đối chiếu menu với công thức",
        task: "Bạn muốn AI hỗ trợ so menu với công thức, không phải phán đúng sai. Lắp prompt.",
        parts: [
          {
            id: "input",
            label: "Dữ kiện đưa vào",
            options: [
              { text: "Dán menu và hỏi: menu này có đúng không?", feedback: "Không có công thức để so, AI chỉ nhận xét câu chữ và nói «có vẻ ổn»." },
              { text: "Dán cả công thức bếp lẫn menu, mỗi thứ dưới một tiêu đề riêng.", good: true, feedback: "AI có hai nguồn để so, và biết nguồn nào là sự thật." },
            ],
          },
          {
            id: "output",
            label: "Khuôn dạng kết quả",
            options: [
              { text: "Bảng ba cột: dòng menu, chi tiết không có trong công thức, nhãn thừa/thiếu/lệch.", good: true, feedback: "Bạn quét được nhanh và đối chiếu lại với bếp." },
              { text: "Viết đoạn nhận xét chung về chất lượng menu.", feedback: "Một đoạn chung chung giấu mất dòng nào sai, bạn phải đọc lại toàn bộ." },
            ],
          },
        ],
        responses: [
          { requires: ["input", "output"], text: "| Dòng menu | Chi tiết không có trong công thức | Nhãn |\n|---|---|---|\n| Gà thả vườn nuôi tại trang trại riêng | thả vườn, trang trại riêng | Thừa |\n| Hoàn toàn không chứa đậu phộng | dầu chiên dùng chung | Lệch |\n\n(Bạn vẫn phải cho bếp xem lại bảng này.)" },
          { requires: ["input"], text: "Menu nhìn chung khớp với công thức, chỉ có vài chi tiết nên xem lại.\n\n(Có công thức nhưng không có khuôn dạng, AI trả lời chung chung, chỉ ra thiếu cụ thể.)" },
          { text: "Menu này đúng và rất hấp dẫn, có thể đưa đi in.\n\n(Không có công thức nên AI khen câu chữ và xác nhận điều nó không kiểm được.)" },
        ],
      },
      {
        type: "closing",
        lines: [
          "Soát là đối chiếu với nguồn thật, không phải đọc cho xuôi tai.",
          "Bài sau: khi khách hỏi món không có trong menu giữa giờ đông.",
        ],
      },
    ],
  },
  {
    id: 2082,
    slug: "khach-hoi-mon-ngoai-menu-luc-dong",
    title: "Chặng 34, Bài 3: Giờ cao điểm khách hỏi món không có trong menu",
    subtitle: "Trả lời nhanh, nhã nhặn và đúng, không hứa món bếp không làm được.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🛎️",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Giờ cao điểm, một câu «làm giúp em món này được không?» dễ làm nhân viên nói bừa «được» rồi bếp không kịp, hoặc nói «không» cộc lốc làm khách bực. Câu trả lời soạn sẵn giúp mọi nhân viên cùng nói đúng và gọn; AI giúp bạn soạn nhanh, còn bạn quyết ranh giới của quán.",
    openingQuestion:
      "Khách đứng ở quầy hỏi «có làm trứng ốp la ăn kèm phở không?», món này không có trong menu và bếp đang quá tải. Câu nào của nhân viên tốt nhất?",
    openingOptions: [
      "«Dạ giờ đông bếp chưa làm kịp, anh dùng thêm trứng chần trong menu nhé?»",
      "«Dạ được ạ» rồi chạy vào bếp xin, mặc kệ bếp có kịp hay không",
      "«Dạ quán không có món đó» rồi quay đi vì còn nhiều khách chờ",
      "«Để em hỏi giúp anh» rồi để khách chờ mà quên quay lại trả lời",
    ],
    correctOption: 0,
    explanation:
      "Câu tốt làm ba việc: nói thẳng bếp chưa làm kịp, không hứa điều không chắc, và đưa một lựa chọn sẵn có trong menu. Trả lời «được ạ» khi chưa hỏi bếp làm khách chờ rồi thất vọng. Nói «không có» rồi quay đi thì đúng nhưng cộc, để mất khách. Hứa «để em hỏi» rồi quên còn tệ hơn vì khách chờ vô ích.",
    diagram: [
      { label: "Khách hỏi món ngoài menu", arrow: true },
      { label: "Nhân viên hỏi nhanh bếp: kịp hay không", arrow: true },
      { label: "Trả lời rõ, kèm lựa chọn thay thế", arrow: true },
      { label: "Ghi lại món hay bị hỏi để xem xét đưa vào menu" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: quán bún bò giờ trưa",
      description:
        "Chủ quán để ý mỗi ngày có 5-6 khách hỏi thêm chả lụa mà menu không có. Sau một tuần ghi lại, chị soạn một câu mẫu và một lựa chọn thay thế, nhờ AI viết nháp rồi tự sửa giọng. Nhân viên mới học câu này trong 10 phút, và khách hỏi lại giảm hẳn, vì họ được trả lời gọn và thấy quán có sẵn phương án.",
    },
    quiz: [
      {
        question: "Khách hỏi một món không có trong menu lúc đông. Điều nào nên tránh nhất?",
        options: [
          "Nói «được ạ» khi chưa biết bếp có làm được không",
          "Xin lỗi và nói thẳng bếp đang quá tải giờ này",
          "Đề nghị khách chọn món tương tự trong menu",
          "Ghi lại món khách hỏi để cuối ngày báo cho quản lý quán",
        ],
        correct: 0,
        explanation:
          "Hứa trước khi biết là lời hứa mà quán chưa chắc giữ được: khách chờ rồi thất vọng, bếp bị áp lực. Ba lựa chọn còn lại đều trung thực về khả năng của quán, đưa hướng đi khác và giúp quán học được nhu cầu của khách.",
      },
      {
        question: "Câu mẫu tốt để nhân viên dùng khi khách hỏi món ngoài menu có đặc điểm nào?",
        options: [
          "Ngắn, nói thẳng khả năng, kèm một lựa chọn thay thế",
          "Dài, xin lỗi nhiều lần cho khách thấy quán rất chu đáo",
          "Chỉ nói «không có», vì nói thêm sẽ mất thời gian giờ đông",
          "Hứa sẽ đưa món đó vào menu tuần sau để khách vui lòng",
        ],
        correct: 0,
        explanation:
          "Câu mẫu giờ đông phải nói được trong 5-10 giây: cho khách câu trả lời thật, và đường đi tiếp. Xin lỗi dài chiếm thời gian của khách khác. «Không có» trơ trọi làm khách bực. Hứa đưa vào menu là lời cam kết mà nhân viên không có quyền đưa ra.",
      },
      {
        question: "Bạn nhờ AI soạn 3 câu mẫu và nó viết «Chúng tôi sẽ làm món đó ngay cho quý khách». Nên làm gì?",
        options: [
          "Bỏ câu đó vì nó hứa điều bếp chưa xác nhận",
          "Giữ vì câu đó lịch sự và làm khách hài lòng nhất",
          "Giữ nhưng dặn nhân viên chỉ nói khi bếp hết đông",
          "Đổi «ngay» thành «sớm» để bớt cam kết rõ ràng",
        ],
        correct: 0,
        explanation:
          "Quyền quyết định làm hay không thuộc về bếp và quản lý, không thuộc về câu mẫu. Nhân viên mới thuộc lòng câu mẫu có thể nói ra khi bếp không kịp. Đổi «ngay» thành «sớm» vẫn là lời hứa. Câu mẫu chỉ nên có những điều nhân viên luôn làm được.",
      },
      {
        question: "Vì sao nên ghi lại món khách hay hỏi ngoài menu?",
        options: [
          "Đó là dữ liệu thật về nhu cầu khách để cân nhắc thêm món",
          "Để nhân viên bị nhắc vì đã không làm được món khách hỏi ngoài menu",
          "Để chứng minh với khách rằng quán đã ghi nhận ý kiến",
          "Vì AI cần danh sách này mới soạn được câu trả lời mẫu",
        ],
        correct: 0,
        explanation:
          "Vài lần hỏi lặp lại cùng một món là tín hiệu rằng menu thiếu thứ khách cần. Ghi chép không nhằm trách nhân viên hay để trấn an khách, và AI vẫn soạn được câu mẫu mà không cần danh sách; danh sách chỉ giúp câu mẫu sát thực tế hơn.",
      },
      {
        question: "Nhân viên mới chưa dám từ chối khách. Cách hỗ trợ tốt nhất là gì?",
        options: [
          "Đưa vài câu mẫu đã duyệt và cho tập nói thử trước giờ mở cửa",
          "Dặn cứ nói «được» rồi vào bếp tìm cách xoay xở sau",
          "Cấm nhân viên trả lời, mọi câu hỏi ngoài menu chuyển cho chủ quán",
          "Gửi một tài liệu dài về cách giao tiếp để họ tự đọc ở nhà",
        ],
        correct: 0,
        explanation:
          "Người mới sợ từ chối vì chưa có lời nào an toàn để nói. Câu mẫu đã duyệt cộng vài phút tập giúp họ tự tin. Bảo cứ nói «được» đẩy áp lực sang bếp. Chuyển hết cho chủ quán làm chậm quầy giờ đông. Tài liệu dài hiếm ai đọc, và càng ít ai nhớ lúc quầy đang đông.",
      },
    ],
    keyTakeaways: [
      "Nói thẳng khả năng của bếp, không hứa trước khi biết.",
      "Luôn kèm một lựa chọn thay thế có sẵn trong menu.",
      "Câu mẫu giờ đông phải nói trong 5-10 giây.",
      "AI giúp soạn nháp câu mẫu, bạn giữ quyền quyết định ranh giới của quán.",
      "Ghi lại món khách hay hỏi ngoài menu để cân nhắc đưa vào.",
    ],
    practicePrompt: {
      question:
        "Bạn nhờ AI soạn câu trả lời khi khách hỏi món chay mà quán chưa có. AI đưa hai bản: (A) «Dạ quán chưa có món chay riêng, anh chị có thể dùng món rau xào trong menu ạ», (B) «Dạ chúng tôi luôn có sẵn món chay cho mọi khách». Chọn bản nào?",
      options: [
        "Bản A, vì nó đúng thực tế và có lựa chọn thay thế",
        "Bản B, vì nó nghe thân thiện và làm khách yên tâm",
        "Bản B, rồi báo bếp làm món chay riêng cho kịp",
        "Cả hai đều được, tuỳ nhân viên thấy khách nào hợp bản nào",
      ],
      correct: 0,
      explanation:
        "Bản A nói đúng thực tế và đưa khách một hướng. Bản B là lời hứa sai với quán chưa có món chay. Báo bếp làm sau khi đã nói với khách là đảo ngược thứ tự và có thể không kịp. Để nhân viên tuỳ chọn khiến khách nhận hai câu trả lời trái nhau từ cùng một quán.",
    },
    summary: {
      keyIdea: "Giờ đông cần câu trả lời ngắn, thật, và có lối ra cho khách.",
      formula: "Xin lỗi ngắn + nói rõ khả năng + một lựa chọn thay thế = câu trả lời mẫu.",
      commonMistake: "Nói «được ạ» cho khách vui rồi để bếp gánh.",
      action: "Nhờ AI soạn 3 câu mẫu, xoá mọi lời hứa chưa được quản lý duyệt.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Ghi ra 3 món khách hay hỏi mà quán bạn (hoặc quán bạn hay ghé) không có. Nhờ AI soạn cho mỗi món một câu trả lời dưới 20 chữ, có lựa chọn thay thế thật. Gạch mọi chữ hứa hẹn. Ngày mai bạn sẽ được hỏi: câu nào bạn giữ, câu nào bạn sửa?",
      secondary: "Đọc to từng câu: nếu mất hơn 10 giây thì rút gọn.",
    },
    sections: [
      {
        type: "lead",
        text: "Mười hai giờ trưa, hàng dài trước quầy. Một khách hỏi «cho anh phở không hành, thêm nước béo, được không?». Món này không có, bếp đang quay cuồng. Trong 10 giây, nhân viên của bạn phải nói gì đó. Bài này tập cho bạn chọn câu nói ấy trước, để giờ đông không phải nghĩ.",
      },
      {
        type: "feynman",
        title: "Câu trả lời soạn sẵn đơn giản hơn bạn nghĩ",
        intro: "Hãy nghĩ tới cái biển «Hôm nay hết món X» treo trước quán: nó trả lời trước một câu hỏi lặp lại mà không ai phải nói lại nhiều lần.",
        columns: ["Thành phần", "Biển «hết món»", "Câu trả lời mẫu cho nhân viên"],
        rows: [
          ["Mục đích", "Trả lời trước câu khách hỏi lặp lại", "Trả lời gọn cho câu khách hay hỏi ngoài menu"],
          ["Nội dung", "Chỉ nói điều quán chắc chắn", "Chỉ nói điều quán làm được, kèm lựa chọn khác"],
          ["Người soạn", "Chủ quán", "Bạn, nhờ AI viết nháp"],
          ["Khi đổi tình hình", "Gỡ hoặc đổi biển", "Sửa câu mẫu và cho nhân viên biết"],
        ],
        oneLiner: "Câu trả lời mẫu là tấm biển nói bằng lời: soạn một lần cho đúng, để giờ đông ai cũng nói được.",
      },
      { type: "heading", text: "Ba điều một câu mẫu tốt có" },
      {
        type: "list",
        items: [
          "Thật: chỉ nói điều bếp và quản lý đã đồng ý, không hứa thay họ.",
          "Ngắn: nói trọn trong 5-10 giây, không làm chậm hàng phía sau.",
          "Có lối ra: đề nghị một món có sẵn hoặc hẹn giờ vắng để khách còn lựa chọn.",
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Câu tốt",
          text: "«Dạ giờ đông bếp chưa làm kịp món đó. Anh thử phở tái nạm trong menu, ra món nhanh và vị gần giống ạ.»",
        },
        right: {
          label: "Câu dễ gây rắc rối",
          text: "«Dạ được ạ, anh chờ chút.» Rồi bếp báo không kịp: khách chờ 15 phút để nghe «xin lỗi anh», còn nhân viên bị phàn nàn.",
        },
      },
      {
        type: "flow",
        title: "Nhờ AI soạn câu mẫu rồi đưa vào quầy",
        steps: [
          { label: "Liệt kê tình huống", detail: "Ghi 3-5 món hay bị hỏi ngoài menu và món thay thế thật của quán. Không có dữ kiện này AI sẽ tự nghĩ ra món." },
          { label: "Nhờ AI viết nháp", detail: "Yêu cầu: dưới 20 chữ, giọng thân thiện, không hứa làm, luôn nêu một món thay thế trong danh sách bạn đưa." },
          { label: "Gạch lời hứa", detail: "Đọc từng câu: chỗ nào nghe như cam kết làm món hay giảm giá thì xoá hoặc thay." },
          { label: "Quản lý duyệt và tập", detail: "Quản lý gật đầu, nhân viên đọc to hai lần trước giờ mở cửa. Sau một tuần, xem khách còn hỏi lại không và chỉnh câu." },
        ],
      },
      {
        type: "callout",
        label: "AI thích hứa giúp bạn",
        text: "AI viết theo kiểu dịch vụ khách hàng thường thấy nên hay chèn «chúng tôi sẽ làm ngay», «luôn sẵn sàng phục vụ». Đó là câu hay nhưng là lời cam kết mà quán chưa chắc giữ. Luôn đọc lại và gạch mọi động từ hứa hẹn.",
      },
      {
        type: "scenario",
        title: "Khách hỏi món ngoài menu giữa giờ cao điểm",
        start: "s1",
        nodes: {
          s1: {
            text: "12 giờ 15, quầy đông. Chị khách hỏi: «Em ơi, cho chị bún bò không huyết, thêm bắp bò được không? Menu không thấy ghi». Bếp đang trễ hai bàn.",
            choices: [
              { label: "Nói «Dạ được ạ» cho chị vui rồi ghi vào phiếu", next: "bad_promise" },
              { label: "Hỏi nhanh bếp một câu «bún bò không huyết, thêm bắp bò kịp không?»", next: "s2" },
            ],
          },
          bad_promise: {
            text: "Bếp báo hết bắp bò từ 11 giờ. Chị chờ 10 phút, nhận tô thiếu bắp, bực mình. Nhân viên bị phàn nàn trước cả hàng.",
            ending: "bad",
          },
          s2: {
            text: "Bếp đáp: «Không huyết thì được, bắp bò hết rồi, có gân bò». Chị khách vẫn đang đợi.",
            choices: [
              { label: "Nói thẳng: «Bún không huyết em làm được, bắp bò hết rồi, chị lấy gân bò thay nhé?»", next: "good" },
              { label: "Chỉ nói «Bên em hết bắp bò rồi ạ» rồi quay sang khách khác", next: "bad_cold" },
            ],
          },
          bad_cold: {
            text: "Chị cảm thấy bị bỏ mặc, rời hàng và để lại đánh giá «nhân viên thờ ơ». Câu trả lời đúng, nhưng không có lối ra.",
            ending: "bad",
          },
          good: {
            text: "Chị đồng ý gân bò. Bún ra đúng hẹn, và tối đó chủ quán ghi vào sổ: «không huyết, thêm gân» là yêu cầu lặp lại, nên soạn thành câu mẫu.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Nói thật, nói gọn, luôn kèm một lối ra cho khách.",
          "Bài sau: dịch tên món cho khách nước ngoài mà không làm họ hiểu nhầm nguyên liệu.",
        ],
      },
    ],
  },
  {
    id: 2083,
    slug: "doi-ten-mon-dich-sang-tieng-anh",
    title: "Chặng 34, Bài 4: Dịch tên món cho khách nước ngoài mà không mất hồn món",
    subtitle: "Dịch tên món giống làm bảng chú thích: khách hiểu món là gì, không đoán sai nguyên liệu.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🌏",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Khách nước ngoài không đọc được tên món và cũng không dám hỏi nhiều. Một bản dịch sai như «pig ear salad» cho món tai heo có thể làm họ sợ, còn bản dịch sót nước sốt chứa hải sản có thể gây hại thật. AI dịch rất nhanh, nhưng bạn phải kiểm bản dịch có làm khách hiểu nhầm nguyên liệu hay không.",
    openingQuestion:
      "AI dịch «Bánh xèo» thành «Vietnamese pancake» và không giải thích gì thêm. Điều gì đáng lo nhất với khách nước ngoài?",
    openingOptions: [
      "Khách tưởng là bánh ngọt ăn sáng, không biết trong có tôm và thịt",
      "Chữ pancake viết sai chính tả nên khách sẽ nghĩ quán thiếu cẩn thận",
      "AI dịch thiếu chữ «Vietnamese» nên khách không biết đây là món Việt",
      "Từ pancake quá dài nên làm menu tiếng Anh khó xếp gọn trên một trang",
    ],
    correctOption: 0,
    explanation:
      "Pancake với người nói tiếng Anh thường là bánh ngọt ngày sáng. Bánh xèo mặn có tôm, thịt, giá đỗ nên một bản dịch trần trụi làm khách hiểu nhầm cả loại món lẫn nguyên liệu, kể cả người kiêng hải sản. Chính tả đúng, chữ «Vietnamese» đã có, và độ dài không phải chuyện lớn. Cần thêm một dòng mô tả ngắn nêu nguyên liệu chính.",
    diagram: [
      { label: "Tên món tiếng Việt và mô tả thật", arrow: true },
      { label: "AI dịch tên và viết chú thích ngắn", arrow: true },
      { label: "Bạn kiểm nguyên liệu và từ dễ hiểu nhầm", arrow: true },
      { label: "Nhờ người biết tiếng Anh đọc thử trước khi in" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: quán ăn gần khu du lịch",
      description:
        "Quán để AI dịch cả menu sang tiếng Anh rồi in ngay. Vài tuần sau, một khách kiêng hải sản hỏi lại vì món «Vietnamese pancake» có tôm mà bản dịch không nhắc. Chủ quán làm lại: giữ tên gốc «Bánh xèo», thêm chú thích một dòng «crispy savory crêpe with shrimp, pork, bean sprouts», rồi nhờ một bạn biết tiếng Anh đọc thử trước khi in.",
    },
    quiz: [
      {
        question: "Cách nào giúp khách nước ngoài hiểu món nhất?",
        options: [
          "Giữ tên gốc rồi thêm chú thích tiếng Anh nêu nguyên liệu chính",
          "Dịch sát từng từ sang tiếng Anh, để khách nghe quen tai và tự đoán được món",
          "Chỉ ghi tên món tiếng Việt và để khách tự hỏi nhân viên",
          "Đặt tên tiếng Anh mới nghe hấp dẫn, không cần giống tên gốc",
        ],
        correct: 0,
        explanation:
          "Tên gốc giữ được nét riêng của món và giúp khách gọi đúng khi thấy nó ở chỗ khác; chú thích nêu món ấy là gì. Dịch sát từng từ hay gây hiểu nhầm. Bỏ hẳn tiếng Anh làm khách không dám gọi. Tên mới nghe hấp dẫn dễ lệch nguyên liệu và làm khách khó tìm lại món.",
      },
      {
        question: "Vì sao dịch «Bún đậu mắm tôm» thành «Tofu noodles with shrimp paste» có thể có vấn đề?",
        options: [
          "Thiếu chi tiết về thịt và rau, và mắm tôm cần cảnh báo mùi mạnh",
          "Vì chữ tofu trong tiếng Anh là một từ lạ đối với khách",
          "Vì mắm tôm không thể dịch sang bất kỳ ngôn ngữ nào khác",
          "Vì bản dịch dài hơn tên gốc nên khó in trên menu nhỏ",
        ],
        correct: 0,
        explanation:
          "Bản dịch bỏ qua nhiều thứ ăn kèm và không báo trước mùi mạnh của mắm tôm, nên khách có thể bất ngờ. Tofu là từ quen thuộc. Mắm tôm dịch được là «fermented shrimp paste». Độ dài không phải vấn đề.",
      },
      {
        question: "Khi AI dịch xong, việc nào bạn phải tự kiểm?",
        options: [
          "Nguyên liệu chính và chất gây dị ứng có bị bỏ sót hay dịch sai",
          "Bản dịch có đủ dài để trông chuyên nghiệp hơn bản cũ",
          "Bản dịch có dùng các từ khó để khách nghĩ quán sang trọng",
          "Bản dịch có giống hệt cách quán bên cạnh dịch hay không",
        ],
        correct: 0,
        explanation:
          "Rủi ro lớn nhất là khách hiểu nhầm thứ mình sắp ăn, nhất là chất gây dị ứng. Độ dài, từ khó hay giống quán khác không giúp khách hiểu món; từ khó còn làm khách lúng túng.",
      },
      {
        question: "Bạn không biết tiếng Anh. Làm sao kiểm bản dịch AI cho khách nước ngoài?",
        options: [
          "Nhờ người biết tiếng Anh đọc thử và đối chiếu với nguyên liệu thật",
          "Nhờ chính AI dịch ngược lại sang tiếng Việt rồi so",
          "Tin bản dịch vì AI dịch tiếng Anh rất tốt so với các thứ tiếng khác",
          "Đưa bản dịch cho khách đầu tiên xem rồi sửa nếu họ phàn nàn",
        ],
        correct: 0,
        explanation:
          "Người đọc thử biết cách khách nước ngoài sẽ hiểu, và bạn đối chiếu với công thức thật. Dịch ngược bằng AI cho ra bản gần giống bản đầu vì cùng một cách hiểu nên không phát hiện hiểu nhầm. Tin vì AI giỏi là bỏ bước kiểm. Đợi khách phàn nàn là để lỗi ra thị trường trước.",
      },
      {
        question: "Yêu cầu nào giúp AI dịch tên món tốt hơn?",
        options: [
          "Cho tên gốc, nguyên liệu thật, và yêu cầu giữ tên Việt kèm chú thích",
          "Chỉ nói «dịch menu này sang tiếng Anh cho hay»",
          "Yêu cầu dịch thật sáng tạo để món nghe khác biệt",
          "Yêu cầu dịch bằng từ ngắn nhất có thể, bỏ hết chú thích",
        ],
        correct: 0,
        explanation:
          "AI cần nguyên liệu thật để chú thích đúng và cần biết bạn muốn giữ tên gốc. «Cho hay» và «sáng tạo» khiến nó tự thêm tính từ và đặt tên mới. Bỏ chú thích khiến khách không hiểu món.",
      },
      {
        question: "Món có nước mắm và đậu phộng. Bản dịch AI không nhắc tới đậu phộng. Bạn nên làm gì?",
        options: [
          "Bổ sung tên nguyên liệu và ghi «ask staff about allergies»",
          "Để nguyên vì đậu phộng là nguyên liệu phụ, khách không cần biết",
          "Chỉ thêm chữ «nuts» cho ngắn gọn, vì như vậy khách nào cũng hiểu là đủ ý rồi",
          "Bỏ hẳn tên món ra khỏi bản tiếng Anh để tránh rủi ro",
        ],
        correct: 0,
        explanation:
          "Nguyên liệu phụ như đậu phộng vẫn có thể gây dị ứng nặng, nên nêu rõ và nhắc khách hỏi nhân viên. «Nuts» quá rộng, người dị ứng đậu phộng có thể không rõ. Bỏ món khỏi bản tiếng Anh làm khách nước ngoài mất quyền gọi món.",
      },
    ],
    keyTakeaways: [
      "Giữ tên gốc, thêm chú thích ngắn nêu nguyên liệu chính.",
      "Dịch sát từng từ hay gây hiểu nhầm loại món và nguyên liệu.",
      "Đưa cho AI nguyên liệu thật, đừng chỉ đưa tên món.",
      "Kiểm chất gây dị ứng trong bản dịch, thêm dòng hỏi nhân viên.",
      "Nhờ người biết tiếng Anh đọc thử trước khi in.",
    ],
    practicePrompt: {
      question:
        "AI dịch «Cà phê trứng» thành «Egg coffee» và không giải thích gì. Bạn thấy vấn đề gì và sửa thế nào?",
      options: [
        "Khách có thể nghĩ cà phê pha với trứng sống; thêm chú thích whipped egg yolk cream",
        "Không vấn đề gì vì «egg coffee» là bản dịch sát nghĩa nhất",
        "Đổi thành «coffee omelette» vì nghe hấp dẫn và quen tai hơn",
        "Bỏ món khỏi menu tiếng Anh vì khách nước ngoài không thích trứng",
      ],
      correct: 0,
      explanation:
        "Bản dịch sát nghĩa vẫn khiến khách đoán sai, họ có thể sợ mùi trứng sống hoặc không biết lớp kem đánh bông. Chú thích mô tả lớp kem trứng đánh bông giúp họ hiểu và tự quyết. «Coffee omelette» sai hoàn toàn. Bỏ món là mất khách thay vì giải thích.",
    },
    summary: {
      keyIdea: "Bản dịch tốt cho khách hiểu món, không chỉ đúng từ.",
      formula: "Tên gốc + chú thích nguyên liệu + dòng nhắc dị ứng + người biết tiếng Anh đọc thử.",
      commonMistake: "Chép bản dịch sát từng từ của AI, không kiểm nguyên liệu bị sót.",
      action: "Chọn 3 món, nhờ AI dịch kèm chú thích, rồi tự kiểm nguyên liệu.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn 3 món quán bạn (hoặc món bạn hay ăn). Ghi nguyên liệu thật, nhờ AI dịch tên và chú thích ngắn, giữ tên Việt. Rồi so từng chú thích với nguyên liệu bạn ghi, đánh dấu chỗ bị sót hoặc thêm. Ngày mai bạn sẽ được hỏi: AI sót hay thêm nguyên liệu nào?",
      secondary: "Nếu có bạn biết tiếng Anh, nhờ đọc thử và cho biết chỗ nào nghe lạ.",
    },
    sections: [
      {
        type: "lead",
        text: "Một đoàn khách nước ngoài bước vào quán, cầm menu lật qua lật lại rồi chỉ vào hình. Menu tiếng Anh của bạn là bản AI dịch vội. Bài này dạy cách nhờ AI dịch tên món để khách hiểu món là gì, đồng thời bạn giữ được quyền kiểm cái quan trọng: nguyên liệu và chất gây dị ứng.",
      },
      {
        type: "feynman",
        title: "Dịch tên món đơn giản hơn bạn nghĩ",
        intro: "Nghĩ tới chú thích dưới một bức ảnh bảo tàng: tên tác phẩm giữ nguyên, bên dưới một dòng nói nó là gì và làm bằng gì.",
        columns: ["Thành phần", "Chú thích bảo tàng", "Tên món song ngữ"],
        rows: [
          ["Tên gốc", "Giữ nguyên tên tác phẩm", "Giữ nguyên tên món Việt"],
          ["Dòng giải thích", "Chất liệu và bối cảnh", "Nguyên liệu chính và cách nấu"],
          ["Điều tránh", "Đặt tên mới làm lạc tác phẩm", "Dịch sát từng từ làm khách hiểu sai món"],
          ["Người kiểm", "Người phụ trách bảo tàng", "Bạn và người biết tiếng Anh"],
        ],
        oneLiner: "Dịch tên món là viết chú thích bảo tàng: giữ tên thật, thêm một dòng nói món ấy là gì.",
      },
      { type: "heading", text: "Vì sao dịch sát từng từ hay hỏng" },
      {
        type: "paragraph",
        text: "Tên món Việt hay nói về cách làm hoặc hình dáng: «bánh xèo» là tiếng kêu khi đổ bột, «cà phê trứng» không phải cà phê pha trứng sống. Người nói tiếng Anh nghe «pancake» hay «egg coffee» sẽ hình dung món mà họ đã biết, khác hẳn món trong bát. AI dịch theo nghĩa phổ biến nhất của từ, nên nó hay kéo bạn vào chỗ hiểu nhầm này.",
      },
      {
        type: "flow",
        title: "Từ tên món tiếng Việt đến dòng chú thích tiếng Anh",
        steps: [
          { label: "Chuẩn bị dữ kiện", detail: "Ghi tên món, nguyên liệu chính, nước chấm, cách nấu và chất gây dị ứng bạn biết. Càng đủ thì AI càng ít phải đoán." },
          { label: "Giao việc rõ", detail: "Yêu cầu: giữ tên Việt, chú thích một dòng tiếng Anh nêu nguyên liệu chính, không đặt tên mới, không thêm nguyên liệu." },
          { label: "Kiểm nguyên liệu", detail: "So chú thích với danh sách của bạn. Chỗ nào có chữ lạ hoặc thiếu chất gây dị ứng thì đánh dấu." },
          { label: "Người đọc thử", detail: "Nhờ người biết tiếng Anh đọc: họ hiểu món là gì? Có từ nào gây hiểu nhầm không? Sửa rồi mới in." },
        ],
      },
      { type: "heading", text: "Ba lỗi hay gặp khi dịch tên món" },
      {
        type: "list",
        items: [
          "Dịch quá sát: «bánh xèo» thành «pancake» làm khách tưởng bánh ngọt.",
          "Bỏ sót nguyên liệu phụ: nước mắm, đậu phộng, tôm khô là thứ khách dị ứng cần biết.",
          "Đặt tên mới để nghe sang: khách khó tìm lại món này ở chỗ khác và dễ hiểu sai.",
        ],
      },
      {
        type: "callout",
        label: "Không dịch thành lời cam kết",
        text: "AI có thể tự thêm «gluten-free», «vegan», «halal» vào bản dịch vì nghe hợp với món. Đó là những nhãn cần xác nhận từ bếp và nhà cung cấp, đôi khi cần chứng nhận. Nếu không chắc, ghi «ask staff» và hỏi chuyên gia hoặc cơ quan quản lý địa phương.",
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI dịch tên món Bún chả Hà Nội",
        task: "Món gồm chả viên và chả miếng nướng than, bún, rau sống, nước chấm chua ngọt có tỏi ớt. Bếp dùng nước mắm. Lắp prompt để AI dịch tên và chú thích sao cho khách nước ngoài hiểu đúng.",
        parts: [
          {
            id: "data",
            label: "Dữ kiện",
            options: [
              { text: "Dịch «Bún chả Hà Nội» sang tiếng Anh.", feedback: "AI chỉ có tên nên dịch thành «Hanoi noodles with meatballs» hoặc tự thêm nguyên liệu như sả." },
              { text: "Tên món, và nguyên liệu: chả viên, chả miếng nướng than, bún, rau sống, nước chấm chua ngọt tỏi ớt có nước mắm.", good: true, feedback: "AI có nguyên liệu thật để chú thích và không phải đoán." },
            ],
          },
          {
            id: "style",
            label: "Cách dịch",
            options: [
              { text: "Dịch sáng tạo cho khách nước ngoài thấy độc đáo.", feedback: "«Sáng tạo» khiến AI đặt tên mới và thêm tính từ như «legendary», làm khách khó nhận ra món." },
              { text: "Giữ tên Việt, thêm một dòng chú thích tiếng Anh nêu nguyên liệu, không đặt tên mới.", good: true, feedback: "Khách vừa nhớ tên món vừa hiểu nó là gì." },
            ],
          },
          {
            id: "allergy",
            label: "Dị ứng",
            options: [
              { text: "Ghi thêm dòng «contains fish sauce; ask staff about allergies», không tự thêm nhãn khác.", good: true, feedback: "Nêu nguyên liệu phụ có thể gây dị ứng và dẫn khách hỏi nhân viên." },
              { text: "Ghi thêm nhãn «allergy-friendly» cho khách yên tâm.", feedback: "Nhãn đó là lời cam kết chưa được kiểm, có thể sai với người dị ứng." },
            ],
          },
        ],
        responses: [
          { requires: ["data", "style", "allergy"], text: "Bún chả Hà Nội\nGrilled pork patties and pork slices with rice vermicelli, fresh herbs and sweet-sour dipping sauce (garlic, chili).\nContains fish sauce. Ask staff about allergies.\n\n(Tên giữ nguyên, nguyên liệu đủ, nhắc dị ứng đúng chỗ.)" },
          { requires: ["data"], text: "Bún chả Hà Nội - Legendary Hanoi grilled pork with noodles, allergy-friendly.\n\n(Đủ dữ kiện nhưng AI thêm «legendary» và «allergy-friendly» mà bạn không đưa.)" },
          { text: "Hanoi meatball noodle soup\n\n(Không có nguyên liệu, AI dịch thành món có nước và viên thịt: sai loại món.)" },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI kiểm bản dịch bạn đã có",
        task: "Bạn có sẵn bản dịch tên 10 món và muốn AI giúp phát hiện chỗ khách có thể hiểu nhầm. Lắp prompt.",
        parts: [
          {
            id: "input",
            label: "Dữ kiện",
            options: [
              { text: "Dán bản dịch cùng nguyên liệu thật của từng món.", good: true, feedback: "AI có nguồn sự thật để so." },
              { text: "Dán bản dịch và hỏi «có ổn không?».", feedback: "Không có nguyên liệu thật, AI chỉ nhận xét độ trôi chảy của câu tiếng Anh." },
            ],
          },
          {
            id: "task",
            label: "Việc cần làm",
            options: [
              { text: "Liệt kê dòng nào có thể làm khách hiểu nhầm loại món hoặc bỏ sót nguyên liệu, kèm lý do.", good: true, feedback: "Kết quả cụ thể, từng dòng, bạn kiểm được." },
              { text: "Viết lại toàn bộ cho hay hơn.", feedback: "AI viết lại cả những chỗ đã đúng và có thể thêm chi tiết mới, khó kiểm hơn." },
            ],
          },
        ],
        responses: [
          { requires: ["input", "task"], text: "1. «Vietnamese pancake» (bánh xèo): khách dễ nghĩ bánh ngọt; nên thêm shrimp, pork.\n2. «Egg coffee»: chưa nói lớp kem trứng đánh bông.\n3. «Spring rolls» (gỏi cuốn): chưa nêu đậu phộng trong nước chấm.\n\n(Bạn vẫn phải đối chiếu với bếp trước khi sửa.)" },
          { requires: ["input"], text: "Bản dịch tự nhiên và dễ hiểu. Có thể thêm tính từ để hấp dẫn hơn.\n\n(Có dữ kiện nhưng không có việc cụ thể, AI khen chung chung.)" },
          { text: "Bản dịch tốt, phù hợp cho khách nước ngoài.\n\n(Không có gì để so, AI khen.)" },
        ],
      },
      {
        type: "closing",
        lines: [
          "Giữ tên gốc, thêm một dòng chú thích thật, nhắc khách hỏi về dị ứng.",
          "Bài sau: gom 10 món thành menu một trang để in.",
        ],
      },
    ],
  },
  {
    id: 2084,
    slug: "mini-du-an-menu-mot-trang",
    title: "Chặng 34, Bài 5: Mini-dự án: menu một trang để in",
    subtitle: "Ghép mọi thứ đã học thành một trang menu bạn dám đưa đi in.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "📄",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Các bài trước dạy từng mảnh: viết mô tả, soát lỗi, trả lời khách, dịch tên món. Mini-dự án này nối chúng lại thành thứ bạn cầm được: một trang menu 10 món, có ghi chú dị ứng, đã đối chiếu với bếp. Làm trọn một lần thì lần sau chỉ còn chỉnh, không phải bắt đầu lại.",
    openingQuestion:
      "Bạn có 10 món và muốn gom thành menu một trang. Nên bắt đầu bằng bước nào?",
    openingOptions: [
      "Ghi nguyên liệu thật của 10 món từ bếp, rồi mới nhờ AI viết mô tả",
      "Nhờ AI thiết kế cả trang menu đẹp mắt, sau đó điền món vào",
      "Nhờ AI viết mô tả cho 10 món trước, rồi hỏi bếp xem có sai chỗ nào không",
      "Chọn phông chữ và màu sắc trước để menu thống nhất với quán",
    ],
    correctOption: 0,
    explanation:
      "Dữ kiện thật quyết định chất lượng của mọi bước sau: có nguyên liệu bếp xác nhận thì AI viết mô tả bám đúng và bạn soát nhanh. Thiết kế đẹp mà nội dung sai là menu đẹp và sai. Viết trước rồi mới hỏi bếp đảo thứ tự, làm bạn phải sửa nhiều. Phông chữ, màu sắc là bước cuối, không ảnh hưởng đến sự thật của món.",
    diagram: [
      { label: "Bếp xác nhận 10 món và nguyên liệu", arrow: true },
      { label: "AI viết mô tả và nhóm món", arrow: true },
      { label: "Soát bằng công thức, thêm ghi chú dị ứng", arrow: true },
      { label: "Bếp và chủ quán duyệt rồi in thử một bản" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: quán cơm trưa 10 món",
      description:
        "Chủ quán chỉ có menu chép tay dán tường. Chị chọn 10 món bán chạy, hỏi bếp ghi nguyên liệu, nhờ AI viết mô tả ngắn, rồi tự gạch những chỗ không có trong danh sách. Chị in thử một bản A4, mang cho bếp trưởng đọc lần cuối, sửa hai dòng rồi mới in hàng loạt. Cả việc mất một buổi tối, không dùng phần mềm thiết kế phức tạp.",
    },
    quiz: [
      {
        question: "Vì sao mini-dự án này chọn 10 món chứ không phải toàn bộ menu?",
        options: [
          "10 món đủ để soát kỹ từng dòng trong một buổi tối",
          "Vì AI không viết được quá 10 món trong một lần yêu cầu",
          "Vì menu nhiều hơn 10 món thì khách không đọc nổi",
          "Vì bếp chỉ có công thức chính xác cho đúng 10 món",
        ],
        correct: 0,
        explanation:
          "Số lượng vừa phải giúp bạn soát từng dòng với bếp mà không mệt. AI viết được nhiều hơn 10 món, nhưng bạn thì kiểm không xuể. Menu dài vẫn đọc được nếu chia nhóm, và bếp có công thức của nhiều món hơn.",
      },
      {
        question: "Dòng ghi chú dị ứng trên menu nên viết theo hướng nào?",
        options: [
          "Nhắc khách hỏi nhân viên, không tự cam kết món không chứa gì",
          "Liệt kê đầy đủ mọi chất gây dị ứng của từng món cho khách yên tâm",
          "Không ghi gì vì nhân viên sẽ tự nhớ và tự nói khi khách hỏi",
          "Ghi «tất cả món đều an toàn» để tránh làm khách lo lắng",
        ],
        correct: 0,
        explanation:
          "Bạn không đảm bảo được bếp tránh nhiễm chéo, nên đừng cam kết bằng chữ. Liệt kê đầy đủ đòi hỏi kiểm từng nguyên liệu phụ và dễ sót. Không ghi gì thì khách không biết mà hỏi. «Tất cả đều an toàn» là lời hứa sai.",
      },
      {
        question: "AI gom món thành nhóm «Khai vị», «Món chính», «Tráng miệng». Điều cần kiểm là gì?",
        options: [
          "Món có nằm đúng nhóm mà bếp và quán vẫn phục vụ",
          "Nhóm nào dài nhất để đưa lên đầu trang cho nổi bật",
          "Tên nhóm có dùng tiếng Anh hay không để trông sang hơn",
          "Số món mỗi nhóm có đều nhau để trang menu đẹp mắt",
        ],
        correct: 0,
        explanation:
          "AI có thể xếp món vào nhóm nghe hợp lý nhưng không đúng cách quán phục vụ, ví dụ đặt gỏi cuốn vào món chính. Dài ngắn, tiếng Anh và số món đều nhau là chuyện thẩm mỹ, không ảnh hưởng đến việc khách hiểu menu.",
      },
      {
        question: "Bạn in thử một bản A4. Mục đích chính của bước này là gì?",
        options: [
          "Bắt lỗi mà màn hình che, như chữ nhỏ và dòng bị cắt",
          "Để chứng minh với chủ quán là bạn đã xong",
          "Để AI đọc lại menu bản in rồi kiểm tra giúp bạn cho chắc",
          "Để biết mực in có đủ cho lần in hàng loạt sau đó hay không",
        ],
        correct: 0,
        explanation:
          "Trên giấy bạn thấy chữ quá nhỏ, dòng tràn trang, ghi chú dị ứng khuất. Người khác đọc thử cũng dễ hơn. Bước này không dành để trình diễn, AI không đọc bản in, và mực không phải mục tiêu chính.",
      },
      {
        question: "Ai có quyền chốt cuối cùng nội dung menu trước khi in?",
        options: [
          "Bếp trưởng về nguyên liệu, chủ quán về giá và cam kết",
          "AI, vì nó đã đọc nhiều menu hơn bất kỳ ai trong quán",
          "Người thiết kế, vì họ là người nhìn menu tổng thể nhất",
          "Khách quen đọc thử, vì họ hiểu quán rõ nhất",
        ],
        correct: 0,
        explanation:
          "Người chịu trách nhiệm về sự thật của món là bếp và chủ quán. AI không chịu trách nhiệm gì. Người thiết kế lo hình thức, khách quen đóng góp ý kiến nhưng không biết công thức.",
      },
    ],
    keyTakeaways: [
      "Bắt đầu bằng dữ kiện thật từ bếp, thiết kế để cuối.",
      "10 món là cỡ vừa đủ để soát kỹ.",
      "Dòng dị ứng nhắc khách hỏi nhân viên, không cam kết.",
      "In thử một bản A4 để bắt lỗi màn hình che.",
      "Bếp trưởng và chủ quán chốt nội dung, không phải AI.",
    ],
    practicePrompt: {
      question:
        "Còn một ngày trước hạn in, bếp trưởng nghỉ ốm và bạn chưa đối chiếu được 3 món. Làm gì hợp lý nhất?",
      options: [
        "Bỏ 3 món đó khỏi trang này hoặc ghi «đang cập nhật», in 7 món đã kiểm",
        "In đủ 10 món vì AI viết trôi chảy và ít khi sai",
        "Dịch hẳn lịch in sang tuần sau dù chủ quán cần dùng ngay",
        "Tự đoán nguyên liệu 3 món dựa theo món tương tự trên mạng",
      ],
      correct: 0,
      explanation:
        "Bỏ hoặc đánh dấu «đang cập nhật» giữ menu đúng với phần đã kiểm và vẫn kịp hạn. In món chưa kiểm là rủi ro thật. Dời cả lịch in không cần thiết khi có phương án khác. Đoán theo món trên mạng là thêm một lớp không chắc chắn.",
    },
    summary: {
      keyIdea: "Menu một trang là dữ kiện thật của bếp, AI viết gọn, bạn soát, bếp chốt.",
      formula: "10 món + nguyên liệu thật + mô tả AI + soát + ghi chú dị ứng + in thử = menu dùng được.",
      commonMistake: "Chạy đi thiết kế đẹp trước khi có dữ kiện đã kiểm.",
      action: "Chọn 10 món, gom nguyên liệu thật, làm trọn quy trình trong một buổi tối.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn 5 món (nếu chưa đủ thời gian cho 10) của quán bạn hoặc quán bạn hay ghé. Ghi nguyên liệu thật, nhờ AI viết mô tả tối đa 15 chữ, soát từng dòng, thêm một dòng nhắc dị ứng, rồi in thử một trang A4. Ngày mai bạn sẽ được hỏi: bạn đã sửa dòng nào sau khi in thử?",
      secondary: "Nếu chưa có bếp để hỏi, ghi rõ dòng nào bạn chưa chắc và không đưa dòng đó vào bản in.",
    },
    sections: [
      {
        type: "lead",
        text: "Thứ Sáu, chủ quán nói «cuối tuần này anh muốn có menu in đàng hoàng, thay tờ chép tay dán tường». Bạn có ba buổi tối và không có nhà thiết kế. Bài này dẫn bạn đi từ danh sách món đến tờ A4 in thử, dùng đúng những gì bạn đã học ở bốn bài trước.",
      },
      {
        type: "feynman",
        title: "Làm menu một trang đơn giản hơn bạn nghĩ",
        intro: "Nghĩ tới việc dọn một bàn ăn: bạn không bắt đầu bằng cắm hoa, bạn bắt đầu bằng biết ai ăn gì, rồi xếp bát đũa, cuối cùng mới trang trí.",
        columns: ["Thành phần", "Dọn bàn ăn", "Làm menu một trang"],
        rows: [
          ["Bước đầu", "Biết ai ngồi, ăn gì", "Biết 10 món và nguyên liệu thật"],
          ["Bước giữa", "Xếp bát đũa đúng chỗ", "Viết mô tả, nhóm món, soát dòng"],
          ["Bước cuối", "Cắm hoa cho đẹp", "Chọn phông chữ, bố cục"],
          ["Kiểm lần cuối", "Chủ nhà nhìn một lượt", "Bếp trưởng đọc bản in thử"],
        ],
        oneLiner: "Làm menu là dọn bàn: biết đủ dữ kiện trước, trang trí sau cùng.",
      },
      { type: "heading", text: "Vì sao chỉ 10 món và một trang" },
      {
        type: "paragraph",
        text: "Một trang buộc bạn chọn: món nào thật sự đáng lên menu. Mười món đủ ít để bạn soát từng dòng trong một buổi tối, đủ nhiều để khách có lựa chọn. Khi đã có quy trình làm trọn một lần, thêm món hay đổi mùa chỉ là lặp lại.",
      },
      {
        type: "flow",
        title: "Quy trình ba buổi tối làm menu một trang",
        steps: [
          { label: "Tối 1: dữ kiện", detail: "Chọn 10 món, hỏi bếp nguyên liệu chính, nước chấm, cách nấu và chất hay gây dị ứng. Ghi vào một bảng, món nào chưa chắc thì đánh dấu." },
          { label: "Tối 2: viết và soát", detail: "Dán bảng vào AI, yêu cầu mô tả tối đa 15 chữ, nhóm món, không thêm chi tiết. Rồi bạn gạch chữ nào không có trong bảng và sửa." },
          { label: "Tối 3: in thử và duyệt", detail: "Ghép vào một trang A4, thêm dòng nhắc dị ứng, in thử. Bếp trưởng và chủ quán đọc, gạch chỗ cần sửa." },
          { label: "In chính thức", detail: "Sửa theo góp ý, in một bản kiểm cuối rồi mới in hàng loạt. Lưu bảng dữ kiện để lần sau chỉ cập nhật." },
        ],
      },
      { type: "heading", text: "Bảng dữ kiện là tài sản quý nhất" },
      {
        type: "list",
        items: [
          "Cột món: tên món chính xác như bếp gọi.",
          "Cột nguyên liệu thật: những thứ bếp chắc chắn, không thêm điều đoán.",
          "Cột giá: chủ quán điền, không để AI tự đặt.",
          "Cột ghi chú dị ứng: chỉ ghi «hỏi nhân viên» hoặc những gì bếp xác nhận.",
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Menu làm đúng thứ tự",
          text: "Có bảng dữ kiện từ bếp, AI viết theo bảng, bạn soát từng dòng, bếp duyệt bản in thử. Ít lỗi, và lần sau chỉ sửa bảng.",
        },
        right: {
          label: "Menu làm ngược thứ tự",
          text: "Thiết kế đẹp trước, nhờ AI điền mô tả, in luôn. Trang đẹp nhưng dòng nào cũng có thể sai, và không ai biết dòng nào.",
        },
      },
      {
        type: "callout",
        label: "Giá và cam kết không do AI quyết",
        text: "Giá bán, khuyến mãi, lời hứa như «miễn phí», «tặng kèm» là quyết định của chủ quán. Đừng để AI tự điền hay gợi ý rồi in luôn. Cũng đừng để AI ghi chứng nhận, huy chương hay giải thưởng: chỉ ghi điều quán có giấy tờ chứng minh.",
      },
      {
        type: "scenario",
        title: "Ba ngày trước hạn in menu",
        start: "s1",
        nodes: {
          s1: {
            text: "Thứ Năm, chủ quán cần menu in vào Chủ nhật. Bạn có danh sách 10 món nhưng chưa hỏi bếp nguyên liệu. AI đã sẵn sàng viết. Bạn làm gì trước?",
            choices: [
              { label: "Nhờ AI viết mô tả luôn cho kịp, chỉ có tên món thôi", next: "bad_guess" },
              { label: "Xin bếp trưởng 15 phút để ghi nguyên liệu và chất gây dị ứng từng món", next: "s2" },
            ],
          },
          bad_guess: {
            text: "AI thêm «thịt heo sạch», «nước dùng hầm 12 giờ» và «không bột ngọt». Bếp trưởng đọc thấy ba dòng sai, còn chủ quán lo bị khách hỏi vặn. Bạn phải làm lại từ đầu, trễ một ngày.",
            ending: "bad",
          },
          s2: {
            text: "Bạn có bảng dữ kiện. AI trả về 10 mô tả trông ổn. Chủ quán nhắn: «Ổn rồi, em in luôn đi».",
            choices: [
              { label: "Gạch từng chữ không có trong bảng, sửa, rồi in thử một bản cho bếp đọc", next: "s3" },
              { label: "In luôn 100 bản vì chủ quán đã đồng ý và AI viết rất trôi", next: "bad_print" },
            ],
          },
          bad_print: {
            text: "Ngày khai trương có khách chỉ vào món và hỏi «gà này thả vườn thật à?». Trên menu ghi vậy, còn bếp mua gà công nghiệp. Bạn phải thu 100 bản đã in.",
            ending: "bad",
          },
          s3: {
            text: "Bạn tìm ra hai dòng có chữ thêm: «thả vườn» và «bí quyết gia truyền». Bếp trưởng xác nhận cả hai không đúng. Còn phần ghi chú dị ứng bạn viết «hỏi nhân viên».",
            choices: [
              { label: "Xoá hai cụm, giữ dòng nhắc dị ứng, in thử bản mới cho bếp ký", next: "good" },
              { label: "Thay «thả vườn» bằng «tuyển chọn» cho vẫn nghe sang", next: "bad_swap" },
            ],
          },
          bad_swap: {
            text: "«Tuyển chọn» là chữ khác nhưng cũng là lời hứa không ai chứng minh. Bếp trưởng gạch tiếp. Bạn mất thêm một buổi, và tự hỏi vì sao vẫn thêm khi mục tiêu là bỏ.",
            ending: "bad",
          },
          good: {
            text: "Chủ Nhật menu ra đúng hạn, 10 món khớp bếp, có dòng nhắc dị ứng. Bảng dữ kiện được lưu lại: lần sau đổi mùa chỉ sửa bảng, nhờ AI viết lại dòng thay đổi.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Dữ kiện thật trước, AI viết gọn, soát từng dòng, bếp chốt.",
          "Phần tiếp theo: đọc hết đánh giá của khách trong một buổi tối.",
        ],
      },
    ],
  },
];
