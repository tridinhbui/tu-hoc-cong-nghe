import type { Lesson } from "../lesson-types";

// Chặng 39, bài 1-5. Giáo trình: scripts/curriculum/stage-39.json.
// Không dựa vào tính năng riêng của công cụ AI nào: chỉ dạy cách giao việc và cách kiểm.

// Đáp án đúng luôn đặt ở vị trí 0 trong tệp này; vị trí được xáo lại lúc build.
const q = (question: string, options: [string, string, string, string], explanation: string) => ({
  question,
  options,
  correct: 0,
  explanation,
});

export const S39_A_LESSONS: Lesson[] = [
  {
    id: 2180,
    slug: "phong-kham-nhac-lich-hen-de-thuong",
    title: "Chặng 39, Bài 1: Nhắn nhắc lịch hẹn ngắn gọn, không lộ bệnh",
    subtitle: "Tin nhắc lịch giống tờ giấy nhớ dán ngoài cửa: ai đi ngang cũng đọc được, nên chỉ ghi giờ và chỗ.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "📅",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Sáng thứ Hai bạn phải nhắn 30 người, và tin nào cũng cần đúng giờ, đúng chỗ. Nhờ AI viết mẫu thì nhanh, nhưng thông tin về sức khỏe là loại thông tin riêng tư nhất: chỉ cần một tin nhắn hiện lên màn hình khoá trước mặt người khác là đã lộ. Học cách cho AI một mẫu chỉ có giờ, địa điểm và cách đổi lịch giúp bạn nhanh mà không làm người bệnh khó xử.",
    openingQuestion:
      "Bạn nhờ AI viết tin nhắc lịch hẹn cho người bệnh. Bản nháp có câu \"Nhắc anh Nam tái khám bệnh tim lúc 9 giờ\". Nên sửa thế nào?",
    openingOptions: [
      "Xoá phần \"bệnh tim\", chỉ giữ tên, giờ hẹn và địa chỉ phòng khám",
      "Giữ nguyên, vì người bệnh biết rõ mình đi khám vì lý do gì",
      "Đổi \"bệnh tim\" thành một từ nhẹ hơn nhưng vẫn nói rõ chuyên khoa",
      "Giữ nguyên nhưng gửi vào khung giờ khuya cho ít người nhìn thấy",
    ],
    correctOption: 0,
    explanation:
      "Tin nhắn có thể hiện ngay trên màn hình khoá, và điện thoại của người bệnh đôi khi nằm trên bàn làm việc hoặc ở nhà với người thân. Vì vậy tin nhắc lịch chỉ cần những gì để người ta đến đúng nơi, đúng giờ. Lý do khám thì người bệnh đã biết, không cần nhắc lại. Đổi sang từ nhẹ hơn hay nhắn khuya vẫn để lộ chuyên khoa, còn câu \"họ biết rồi\" bỏ qua việc người khác có thể liếc thấy.",
    diagram: [
      { label: "Bảng lịch hẹn của phòng khám", arrow: true },
      { label: "Mẫu tin có chỗ trống: tên, giờ", arrow: true },
      { label: "Bạn đọc lại, xoá mọi chữ về sức khỏe", arrow: true },
      { label: "Gửi thử, rồi gửi cho người bệnh" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: quầy lễ tân một phòng khám nhỏ",
      description:
        "Chị lễ tân dán bảng lịch có cả cột lý do khám vào một ứng dụng AI để nhờ viết 30 tin nhắn. Bản nháp ra rất nhanh, nhưng nhiều tin có nhắc tên bệnh. Chị đã phải đọc lại từng tin và xoá tay. Lần sau chị chỉ nhờ AI viết một mẫu có chỗ trống cho tên và giờ, rồi tự điền, và không dán cột lý do khám vào đâu cả.",
    },
    quiz: [
      q(
        "Tin nhắc lịch hẹn nên chứa những thông tin nào?",
        [
          "Giờ hẹn, địa chỉ, cách đổi lịch và số điện thoại quầy",
          "Giờ hẹn và lý do khám để người bệnh nhớ việc",
          "Tên bác sĩ và tình trạng bệnh của lần khám trước",
          "Tên phòng khám và lời chúc sức khỏe dài vài câu",
        ],
        "Tin nhắc lịch phải giúp người ta đến đúng nơi, đúng giờ và biết cách đổi khi bận. Lý do khám và tình trạng bệnh là thông tin sức khỏe, không thuộc tin nhắc. Lời chúc dài thì tốn chỗ mà không giúp người bệnh làm được gì.",
      ),
      q(
        "Vì sao không ghi lý do khám vào tin nhắc lịch?",
        [
          "Màn hình điện thoại có thể bị người khác nhìn thấy",
          "Tin nhắn có nội dung y tế thường bị nhà mạng chặn không gửi",
          "Người bệnh nào cũng đã nhớ kỹ lý do khám của mình",
          "AI không viết được câu nào có chứa từ chuyên môn y tế",
        ],
        "Lý do đúng là chuyện riêng tư: tin có thể hiện trên màn hình khoá trước mặt người khác. Nhà mạng không chặn tin theo nội dung như vậy, việc người bệnh nhớ rồi không phải lý do để lộ, và AI viết được từ y tế, chỉ là bạn không nên đưa vào.",
      ),
      q(
        "Bạn nhờ AI viết mẫu tin cho 30 người. Cách nào an toàn hơn cả?",
        [
          "Nhờ viết một mẫu có chỗ trống {Tên} và {Giờ}, rồi tự điền",
          "Dán cả bảng lịch đã che cột lý do, nhờ AI viết đủ 30 tin",
          "Dán cả bảng lịch cùng lý do khám để tin nào cũng đúng người",
          "Nhờ AI viết 30 tin khác nhau từ danh sách tên được đánh số",
        ],
        "Mẫu có chỗ trống cho phép AI làm phần chữ mà không thấy tên hay giờ của ai. Che một cột rồi vẫn dán cả bảng là vẫn đưa tên người bệnh ra ngoài. Dán kèm lý do khám là tệ nhất. Danh sách đánh số vẫn là dữ liệu người bệnh.",
      ),
      q(
        "AI viết mẫu và tự thêm câu \"Chúc anh mau khỏe sau ca mổ\". Bạn làm gì?",
        [
          "Xoá câu đó, vì bạn không hề đưa thông tin về ca mổ",
          "Giữ lại vì câu chúc thân thiện làm người bệnh thấy được quan tâm",
          "Giữ lại nhưng bỏ chữ \"ca mổ\" và chỉ chúc \"mau khỏe\" chung chung",
          "Hỏi lại AI xem câu đó có đúng với người bệnh không rồi tin theo",
        ],
        "AI tự bịa ra chi tiết nghe hợp lý, và ở đây còn chạm vào sức khỏe: nếu người nhận không hề mổ thì tin nhắn vừa sai vừa đáng sợ. Câu \"mau khỏe\" chung chung vẫn ngầm nói người ấy đang bệnh. Hỏi lại AI không phải kiểm chứng, vì nó không biết người bệnh thật.",
      ),
      q(
        "Trước khi gửi 30 tin, bước kiểm nào cần làm?",
        [
          "Gửi thử vài tin tới số của nhân viên, đọc trên điện thoại",
          "Gửi luôn cả 30 tin, có ai nhắn lại thì sửa sau cho nhanh",
          "Nhờ AI đọc lại chính mẫu nó viết để tự xác nhận là không sai",
          "Chỉ đọc dòng đầu của mẫu vì các dòng sau giống nhau hết",
        ],
        "Gửi thử tới máy nhân viên cho bạn thấy đúng cái người bệnh sẽ thấy, kể cả tên và giờ điền sai. Gửi hàng loạt rồi sửa sau là để người bệnh làm người thử. AI tự kiểm bài của chính nó thì dễ bỏ sót đúng lỗi nó vừa tạo ra. Dòng cuối của mẫu thường chứa số điện thoại hay cách đổi lịch nên phải đọc hết.",
      ),
    ],
    keyTakeaways: [
      "Tin nhắc lịch chỉ có giờ, địa chỉ, cách đổi lịch, số quầy.",
      "Không ghi lý do khám hay tên bệnh, vì tin có thể hiện trên màn hình khoá.",
      "Nhờ AI viết mẫu có chỗ trống, đừng dán danh sách người bệnh.",
      "AI hay tự thêm câu chúc nhắc tới sức khỏe: xoá.",
      "Gửi thử vài tin vào máy nhân viên trước khi gửi hàng loạt.",
    ],
    practicePrompt: {
      question:
        "Danh sách của bạn có cột lý do khám. Bạn cần AI viết mẫu nhắc lịch. Nên đưa gì cho AI?",
      options: [
        "Chỉ mô tả: nhắc lịch, có giờ, địa chỉ, cách đổi, chỗ trống cho tên",
        "Cả danh sách, kèm lời dặn đừng nhắc tới lý do khám trong tin",
        "Danh sách đã đổi tên thành số thứ tự nhưng vẫn còn cột lý do khám",
        "Vài dòng mẫu của người bệnh thật để AI viết giống giọng phòng khám",
      ],
      correct: 0,
      explanation:
        "Muốn có một mẫu thì AI chỉ cần biết mẫu đó làm gì, không cần biết ai. Dặn AI đừng nhắc tới lý do khám nhưng vẫn đưa cột đó vào là đã gửi dữ liệu ra ngoài rồi. Đổi tên thành số nhưng giữ lý do khám vẫn còn thông tin sức khỏe. Tin của người bệnh thật là dữ liệu riêng tư.",
    },
    summary: {
      keyIdea: "Tin nhắc lịch là giấy nhớ dán ngoài cửa: chỉ ghi giờ và chỗ, không ghi chuyện bệnh.",
      formula: "Mẫu có chỗ trống + bạn tự điền tên, giờ + đọc lại xoá chữ về sức khỏe + gửi thử.",
      commonMistake: "Dán cả bảng lịch có cột lý do khám vào AI cho nhanh.",
      action: "Viết một mẫu nhắc lịch và đọc kỹ xem có chữ nào cho biết người ta bị bệnh gì.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Viết mô tả cho một mẫu tin nhắc lịch của nơi bạn làm (không dán tên hay lý do khám của ai). Nhờ AI viết nháp, xoá mọi chữ nhắc tới sức khỏe, rồi gửi thử vào điện thoại của một đồng nghiệp. Ngày mai bạn sẽ được hỏi: mẫu đó có còn chữ nào để lộ lý do khám không?",
      secondary: "Lưu mẫu vào một tệp riêng để cả quầy dùng chung.",
    },
    sections: [
      {
        type: "lead",
        text: "Sáng thứ Hai, quầy lễ tân có 30 người hẹn khám và một điện thoại luôn bận. Bạn cần mỗi người nhận một tin nhắc lịch đúng giờ, đúng chỗ, và không tin nào được để lộ ai đến khám vì chuyện gì.",
      },
      {
        type: "feynman",
        title: "Nhắn nhắc lịch hẹn đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung bạn dán một tờ giấy nhớ ngoài cửa tủ lạnh chung của cả khu nhà. Ai đi ngang cũng đọc được, nên bạn chỉ viết giờ và chỗ, không viết chuyện riêng.",
        columns: ["Thành phần", "Tờ giấy nhớ ngoài cửa", "Tin nhắc lịch hẹn"],
        rows: [
          ["Ai đọc được", "Bất cứ ai đi ngang", "Bất cứ ai liếc thấy màn hình khoá"],
          ["Nên viết", "Giờ, chỗ, việc cần mang", "Giờ, địa chỉ, cách đổi lịch"],
          ["Không nên viết", "Chuyện riêng của người khác", "Lý do khám, tên bệnh, kết quả"],
          ["Ai kiểm", "Người dán đọc lại trước khi dán", "Bạn đọc lại trước khi gửi"],
        ],
        oneLiner: "Viết tin nhắc lịch như viết giấy nhớ dán nơi công cộng: chỉ ghi điều ai đọc cũng không sao.",
      },
      { type: "heading", text: "Một mẫu, không phải ba mươi tin" },
      {
        type: "paragraph",
        text: "Thay vì nhờ AI viết 30 tin, bạn nhờ nó viết một mẫu có chỗ trống cho tên và giờ, rồi tự điền từ bảng lịch của phòng khám. Như vậy AI không cần thấy tên ai, và mọi tin đều cùng một giọng.",
      },
      {
        type: "flow",
        title: "Từ bảng lịch tới tin nhắn tới tay người bệnh",
        steps: [
          { label: "Mô tả mẫu cho AI", detail: "Bạn chỉ nói tin này làm gì: nhắc lịch, có giờ, địa chỉ, cách đổi, số quầy, và chừa chỗ trống cho tên. Không dán tên hay lý do khám." },
          { label: "AI viết bản nháp", detail: "AI viết một mẫu ngắn. Nó có thể tự thêm câu chúc hoặc chi tiết không ai đưa, kể cả chi tiết về sức khỏe." },
          { label: "Bạn đọc và xoá", detail: "Đọc từng câu, xoá mọi chữ nhắc tới bệnh, thuốc, ca mổ, kết quả. Kiểm số điện thoại và địa chỉ với thông tin thật." },
          { label: "Điền và gửi thử", detail: "Điền tên, giờ từ bảng lịch của phòng khám, gửi thử vài tin vào máy nhân viên rồi mới gửi cho người bệnh." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Tin nhắc lịch tốt",
          text: "\"Chào anh Nam, phòng khám nhắc lịch hẹn của anh lúc 9:00 sáng thứ Tư tại số 12 đường ABC. Cần đổi lịch, anh nhắn lại hoặc gọi quầy trước 16:00 hôm trước.\"",
        },
        right: {
          label: "Tin nhắc lịch lộ thông tin",
          text: "\"Chào anh Nam, nhắc anh tái khám tim mạch lúc 9:00 sáng thứ Tư và mang theo kết quả siêu âm lần trước.\"",
        },
      },
      {
        type: "callout",
        label: "Rủi ro: tên bệnh cũng là thông tin riêng tư",
        text: "Một số người không muốn gia đình hay đồng nghiệp biết mình đi khám chuyên khoa nào. Nếu phòng khám có quy định về giữ kín thông tin người bệnh, hỏi quản lý trước khi dùng AI cho bất kỳ tin nào có tên người bệnh.",
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI viết mẫu nhắc lịch",
        task: "Bạn cần một mẫu nhắc lịch cho 30 người hẹn sáng thứ Hai. Lắp một prompt chỉ có giờ, địa điểm, cách đổi lịch, tuyệt đối không có lý do khám.",
        parts: [
          {
            id: "context",
            label: "Bối cảnh",
            options: [
              { text: "Viết tin nhắn cho bệnh nhân của tôi.", feedback: "AI không biết tin để làm gì, nên có thể tự thêm cả lời chúc chuyện bệnh." },
              { text: "Tôi làm lễ tân phòng khám. Cần mẫu tin nhắc lịch hẹn, có chỗ trống {Tên} và {Giờ}.", good: true, feedback: "Nói rõ việc và để chỗ trống, nên AI không cần biết tên ai." },
            ],
          },
          {
            id: "content",
            label: "Nội dung được phép",
            options: [
              { text: "Chỉ ghi giờ, địa chỉ, cách đổi lịch và số điện thoại quầy. Không nhắc lý do khám hay tình trạng sức khỏe.", good: true, feedback: "Giới hạn rõ nên AI không thêm chi tiết về bệnh." },
              { text: "Ghi thêm lý do khám để người bệnh chuẩn bị đúng.", feedback: "Đưa thông tin sức khỏe vào tin nhắn: tin hiện trên màn hình khoá là lộ." },
            ],
          },
          {
            id: "format",
            label: "Giọng và độ dài",
            options: [
              { text: "Viết thật hay và chu đáo.", feedback: "\"Hay và chu đáo\" khiến AI viết dài, dễ thêm câu chúc về sức khỏe." },
              { text: "Giọng lịch sự, dưới 50 chữ, xưng \"phòng khám\" và \"anh/chị\".", good: true, feedback: "Ngắn và rõ nên cả 30 tin đọc trên màn hình khoá cũng gọn." },
            ],
          },
        ],
        responses: [
          {
            requires: ["context", "content", "format"],
            text: "Chào {Tên}, phòng khám nhắc lịch hẹn của anh/chị lúc {Giờ} tại số 12 đường ABC. Cần đổi lịch, anh/chị nhắn lại hoặc gọi quầy. Cảm ơn anh/chị.\n\n(Mẫu gọn, có chỗ trống, không chữ nào nói về sức khỏe.)",
          },
          {
            requires: ["context"],
            text: "Chào {Tên}, phòng khám nhắc anh/chị tái khám lúc {Giờ}. Chúc anh/chị mau chóng bình phục sau đợt điều trị vừa rồi và luôn khỏe mạnh...\n\n(Có chỗ trống nhưng AI tự thêm câu nói về điều trị, và tin quá dài.)",
          },
          {
            text: "Chào anh/chị, nhắc lịch hẹn khám tuần này, mang theo hồ sơ bệnh án và kết quả xét nghiệm lần trước...\n\n(Không có giờ, không có địa chỉ, và tự bịa yêu cầu mang hồ sơ mà phòng khám chưa hề nói.)",
          },
        ],
      },
      {
        type: "scenario",
        title: "Sáng thứ Hai của chị lễ tân",
        start: "s1",
        nodes: {
          s1: {
            text: "7 giờ sáng, chị Hà cần nhắn 30 người hẹn hôm nay. Bảng lịch có cột lý do khám.",
            choices: [
              { label: "Dán cả bảng lịch, kể cả cột lý do khám, nhờ AI viết 30 tin cho khỏi phải điền", next: "bad_leak" },
              { label: "Nhờ AI viết một mẫu có chỗ trống {Tên}, {Giờ} và tự điền từ bảng lịch", next: "s2" },
            ],
          },
          bad_leak: {
            text: "Bản nháp ra nhanh, nhưng dữ liệu người bệnh vừa đi ra một dịch vụ bên ngoài, và vài tin có nhắc tên bệnh. Chị phải xin quản lý xử lý vì tin nhắn không thu hồi được.",
            ending: "bad",
          },
          s2: {
            text: "Mẫu AI viết có câu \"Chúc anh/chị mau chóng hồi phục sau ca khám lần trước\". Đã 7:40.",
            choices: [
              { label: "Gửi luôn, câu chúc nghe rất tử tế", next: "bad_send" },
              { label: "Xoá câu chúc và mọi chữ nói về sức khỏe, giữ giờ, địa chỉ, cách đổi lịch", next: "s3" },
            ],
          },
          bad_send: {
            text: "Một người nhận đang ngồi họp, tin hiện trên màn hình khoá, và đồng nghiệp cạnh anh ấy hỏi \"anh ốm à?\". Anh gọi lại phòng khám khó chịu.",
            ending: "bad",
          },
          s3: {
            text: "Mẫu đã gọn. Còn 30 tin cần gửi trước 8 giờ.",
            choices: [
              { label: "Gửi thử 2 tin vào điện thoại đồng nghiệp, đọc kỹ rồi mới gửi 30 tin", next: "good" },
              { label: "Gửi cả 30 tin ngay, có gì sai thì xin lỗi sau", next: "bad_rush" },
            ],
          },
          bad_rush: {
            text: "Hai tin điền nhầm giờ vì bảng có dòng lệch. Hai người đến sai giờ, quầy phải xin lỗi giữa lúc đông nhất.",
            ending: "bad",
          },
          good: {
            text: "Tin thử đọc gọn, đúng giờ, đúng chỗ. Bạn gửi 30 tin, quầy nhận vài lời hỏi đổi lịch và xử lý êm.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Tin nhắc lịch: giờ, chỗ, cách đổi. Không có chữ nào về sức khỏe.",
          "Bài sau: soạn bộ trả lời hỏi giờ mở cửa và cách đặt hẹn.",
        ],
      },
    ],
  },
  {
    id: 2181,
    slug: "phong-kham-tra-loi-hoi-gio-mo-cua",
    title: "Chặng 39, Bài 2: Trả lời câu hỏi giờ mở cửa và cách đặt hẹn",
    subtitle: "Bảng hỏi đáp dán ở quầy giống thực đơn: chỉ ghi món quán thật sự có.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🕗",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Điện thoại và Zalo của phòng khám hỏi đi hỏi lại vài câu: mấy giờ mở cửa, đặt hẹn thế nào, đổi lịch ra sao. Nhờ AI soạn bộ trả lời mẫu tiết kiệm nhiều giờ, nhưng nếu AI thêm một chi tiết nó tự nghĩ ra, chẳng hạn giờ mở cửa Chủ nhật, người bệnh sẽ đến một cánh cửa đóng.",
    openingQuestion:
      "Bạn nhờ AI viết câu trả lời cho câu \"Phòng khám mở cửa lúc mấy giờ?\" mà không đưa giờ thật. AI trả lời rất chi tiết. Điều gì có thể xảy ra?",
    openingOptions: [
      "AI tự điền giờ nghe hợp lý, và người bệnh đến sai giờ thật",
      "AI từ chối trả lời vì thiếu thông tin về giờ mở cửa của phòng khám",
      "AI tự tra giờ thật của phòng khám và điền đúng vào câu trả lời",
      "AI viết chung chung nhưng chắc chắn không có giờ nào sai sự thật",
    ],
    correctOption: 0,
    explanation:
      "AI dự đoán chữ nghe hợp lý nhất, nên khi thiếu giờ mở cửa nó điền một khung giờ thường gặp và viết tự tin như thật. Nó không từ chối, và cũng không biết giờ của phòng khám bạn. Vì vậy thông tin thật phải do bạn đưa vào, và bạn phải đối chiếu từng con số trong câu trả lời với thông tin đó trước khi dán lên quầy hay gửi Zalo.",
    diagram: [
      { label: "Thông tin thật của phòng khám do bạn đưa", arrow: true },
      { label: "AI soạn câu trả lời mẫu, chỉ từ thông tin đó", arrow: true },
      { label: "Bạn đối chiếu từng giờ, từng số điện thoại", arrow: true },
      { label: "Quản lý duyệt rồi dùng ở quầy và Zalo" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: Zalo của một phòng khám nhỏ",
      description:
        "Phòng khám nhận khoảng chục câu hỏi giống nhau mỗi ngày. Lễ tân đưa AI ba dòng thông tin thật rồi soạn bộ trả lời. Bản nháp có thêm dòng \"có chỗ đậu xe miễn phí\", chi tiết không ai đưa, và một người bệnh đã chạy xe tới mới biết không có. Từ đó bộ trả lời nào cũng qua bước đối chiếu từng dòng với ghi chú gốc.",
    },
    quiz: [
      q(
        "Muốn AI soạn câu trả lời về giờ mở cửa, bạn cần đưa gì trước?",
        [
          "Giờ mở cửa từng ngày trong tuần do phòng khám xác nhận",
          "Chỉ tên phòng khám, để AI tự tìm giờ",
          "Một câu trả lời của phòng khám khác làm mẫu",
          "Chỉ dặn \"viết giờ chính xác\" là đủ",
        ],
        "AI không biết giờ của phòng khám bạn, nên thông tin thật phải do bạn đưa. Chỉ cần tên thì nó chỉ đoán. Câu trả lời của nơi khác đưa sai giờ và có thể sai cả quy định. Dặn \"chính xác\" mà không có dữ kiện thì nó vẫn phải bịa.",
      ),
      q(
        "AI viết \"Chúng tôi mở cả Chủ nhật\", trong khi ghi chú bạn đưa không nhắc Chủ nhật. Đó là gì?",
        [
          "Chi tiết AI tự thêm, cần xoá hoặc hỏi lại quản lý",
          "Một suy luận hợp lý vì phòng khám nào cũng mở Chủ nhật",
          "Lỗi chính tả của AI, chỉ cần sửa lại từ ngữ là xong",
          "Thông tin đúng vì AI đã đọc website của phòng khám bạn",
        ],
        "Chủ nhật không có trong ghi chú của bạn nên đây là chi tiết AI bịa cho câu trả lời trọn vẹn. Không phải phòng khám nào cũng mở Chủ nhật, đó không phải lỗi chính tả, và AI không tự mở website của bạn nếu không được đưa vào.",
      ),
      q(
        "Ghi chú: thứ Hai đến thứ Sáu mở 7:30-11:30 và 13:30-17:00. Câu trả lời nào đúng?",
        [
          "Từ thứ Hai đến thứ Sáu: sáng 7:30-11:30, chiều 13:30-17:00",
          "Thứ Hai đến thứ Sáu mở liên tục 7:30-17:00, không nghỉ trưa",
          "Thứ Hai đến thứ Bảy: 7:30-11:30 và 13:30-17:00 mỗi ngày",
          "Thứ Hai đến thứ Sáu: 7:30-17:00, nghỉ trưa từ 12:00 đến 13:00",
        ],
        "Đáp án đúng giữ nguyên hai khung giờ và số ngày trong ghi chú. Gộp thành một khung 7:30-17:00 mất khoảng nghỉ trưa, thêm thứ Bảy là chi tiết bịa, còn nghỉ trưa 12:00-13:00 là giờ tự nghĩ ra, không khớp với 11:30-13:30 của ghi chú.",
      ),
      q(
        "Một người hỏi \"phòng khám có nhận bảo hiểm không?\" mà ghi chú không có thông tin này. Nên làm gì?",
        [
          "Nói sẽ hỏi lại quản lý rồi báo, và bổ sung vào ghi chú",
          "Nhờ AI trả lời cho nhanh vì câu này rất phổ biến",
          "Trả lời \"có\" cho khách yên tâm, vì phần lớn phòng khám nhận",
          "Bỏ qua tin nhắn đó cho đến khi người ta tự đến quầy hỏi",
        ],
        "Thông tin chưa có thì không nhờ AI trả lời và không đoán. Trả lời \"có\" nếu sai sẽ làm người bệnh đến rồi mới biết. Bỏ qua tin làm mất một người cần giúp. Hỏi quản lý rồi bổ sung ghi chú giúp lần sau trả lời được ngay.",
      ),
      q(
        "Bộ trả lời mẫu đã soạn xong. Bước cuối trước khi dùng là gì?",
        [
          "Đối chiếu từng giờ, số điện thoại với ghi chú và nhờ quản lý duyệt",
          "Đọc một lần cho thấy trôi chảy là có thể đưa vào dùng ngay",
          "Hỏi AI \"những câu trên có đúng không\" rồi làm theo câu trả lời",
          "Thử trả lời vài khách thật, nếu không ai phàn nàn thì dùng luôn",
        ],
        "Câu trôi chảy vẫn có thể sai giờ. Hỏi AI xác nhận chính bài của nó chỉ cho thêm một câu nghe hợp lý. Để khách thật làm người thử nghĩa là người bệnh chịu hậu quả khi có sai sót. Đối chiếu từng con số và cho quản lý duyệt mới chặn được lỗi trước khi nó tới người bệnh.",
      ),
    ],
    keyTakeaways: [
      "Thông tin thật của phòng khám do bạn đưa, AI không biết.",
      "AI điền chỗ thiếu bằng chi tiết nghe hợp lý: giờ, chỗ đậu xe, bảo hiểm.",
      "Đối chiếu từng giờ và từng số điện thoại với ghi chú gốc.",
      "Câu hỏi chưa có thông tin: hỏi quản lý, đừng đoán.",
      "Quản lý duyệt bộ trả lời trước khi dùng ở quầy hoặc Zalo.",
    ],
    practicePrompt: {
      question:
        "Bạn muốn AI soạn câu trả lời cho câu hỏi \"đổi lịch được không?\". Ghi chú thật: đổi lịch được nếu báo trước ít nhất 2 giờ. Cách giao việc tốt nhất là gì?",
      options: [
        "Đưa đúng dòng ghi chú đó và dặn chỉ dùng thông tin trong ghi chú",
        "Chỉ hỏi AI \"phòng khám đổi lịch thế nào\" rồi đọc lại xem hợp lý chưa",
        "Nhờ AI viết theo cách các phòng khám khác đang làm rồi sửa lại giờ",
        "Đưa dòng ghi chú kèm dặn AI viết thêm điều kiện cho đầy đủ và dễ hiểu hơn",
      ],
      correct: 0,
      explanation:
        "Đưa ghi chú thật và giới hạn AI trong đó là cách duy nhất để nó không thêm điều kiện. Hỏi không kèm dữ kiện thì nó tự bịa quy trình. Theo cách của phòng khám khác thì quy định có thể khác hẳn. Dặn viết thêm điều kiện là mời AI bịa điều kiện.",
    },
    summary: {
      keyIdea: "Bảng hỏi đáp là thực đơn: chỉ ghi món quán có, và AI không biết quán bạn có gì nếu bạn không nói.",
      formula: "Thông tin thật của bạn + dặn chỉ dùng thông tin đó + đối chiếu từng dòng + quản lý duyệt.",
      commonMistake: "Để AI tự điền chỗ thiếu vì câu trả lời trông rất đầy đủ.",
      action: "Chép ra 3 dòng thông tin thật của nơi bạn làm: giờ, cách đặt hẹn, cách đổi lịch.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Viết ra 3 dòng thông tin thật: giờ làm việc, cách đặt hẹn, cách đổi lịch của nơi bạn làm. Nhờ AI soạn 3 câu trả lời chỉ dùng thông tin đó, rồi đối chiếu từng chữ và gạch chân mọi chi tiết không có trong 3 dòng gốc. Ngày mai bạn sẽ được hỏi: AI đã tự thêm chi tiết nào?",
      secondary: "Chi tiết nào bị gạch, ghi lại: đó là chỗ AI hay bịa với nơi bạn làm.",
    },
    sections: [
      {
        type: "lead",
        text: "Điện thoại quầy reo, Zalo nhảy tin: \"mấy giờ mở cửa?\", \"đặt hẹn thế nào?\", \"đổi lịch được không?\". Cả ngày có khoảng chục câu như vậy, và câu nào cũng cần đúng.",
      },
      {
        type: "feynman",
        title: "Bộ trả lời hỏi giờ mở cửa đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung thực đơn dán ở quán cơm. Thực đơn chỉ ghi món quán thật sự nấu. Nếu người viết thực đơn thêm món chưa từng có trong bếp, khách gọi món đó sẽ thất vọng.",
        columns: ["Thành phần", "Thực đơn quán cơm", "Bộ trả lời của phòng khám"],
        rows: [
          ["Nguồn", "Bếp quán thật sự nấu gì", "Thông tin thật do bạn đưa cho AI"],
          ["Người viết", "Chủ quán viết từ thực đơn bếp", "AI viết từ ghi chú của bạn"],
          ["Lỗi hay gặp", "Ghi món chưa có", "Thêm giờ hay dịch vụ chưa từng có"],
          ["Ai kiểm", "Chủ quán đối chiếu với bếp", "Bạn đối chiếu với ghi chú, quản lý duyệt"],
        ],
        oneLiner: "Bộ trả lời chỉ nên có điều phòng khám thật sự có; phần AI thêm vào là món chưa từng nấu.",
      },
      { type: "heading", text: "Đưa dữ kiện, rồi dặn giới hạn" },
      {
        type: "paragraph",
        text: "Bước đầu là viết ra thông tin thật thành vài dòng ngắn: giờ làm việc, cách đặt hẹn, cách đổi lịch, số điện thoại quầy. Bước hai là dặn AI: chỉ dùng thông tin này, chỗ nào thiếu thì ghi \"cần hỏi quản lý\".",
      },
      {
        type: "flow",
        title: "Từ ghi chú thật tới câu trả lời an toàn",
        steps: [
          { label: "Viết ghi chú thật", detail: "Vài dòng: giờ làm việc từng ngày, cách đặt hẹn, cách đổi lịch, số quầy. Đây là nguồn duy nhất của mọi câu trả lời." },
          { label: "Dặn AI chỉ dùng ghi chú", detail: "Yêu cầu AI soạn 5 câu hỏi hay gặp và câu trả lời, chỉ từ ghi chú, chỗ thiếu thì ghi \"cần hỏi quản lý\"." },
          { label: "Đối chiếu từng dòng", detail: "Gạch chân mọi giờ, số điện thoại, điều kiện trong bản nháp và tìm nó trong ghi chú. Không tìm thấy nghĩa là AI tự thêm." },
          { label: "Quản lý duyệt, rồi dùng", detail: "Quản lý đọc bộ trả lời một lần, rồi mới dán lên quầy hoặc dùng để trả lời Zalo." },
        ],
      },
      {
        type: "list",
        items: [
          "Giờ mở cửa: ghi đủ từng khung giờ và ngày nghỉ.",
          "Đặt hẹn: qua kênh nào (gọi quầy, Zalo, đến trực tiếp).",
          "Đổi lịch: báo trước bao lâu, báo cho ai.",
          "Câu chưa có thông tin: ghi \"cần hỏi quản lý\", không để AI đoán.",
        ],
      },
      {
        type: "callout",
        label: "Lưu ý: tên riêng và số điện thoại",
        text: "Số điện thoại quầy in trong câu trả lời phải là số thật. Nếu AI viết một số khác với ghi chú, đó là số nó bịa, và người bệnh sẽ gọi nhầm cho một người lạ.",
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát bộ trả lời mẫu do AI viết",
        task: "Ghi chú thật bạn đưa AI: mở cửa thứ Hai đến thứ Bảy, sáng 7:30-11:30, chiều 13:30-17:00, nghỉ Chủ nhật. Đặt hẹn qua Zalo hoặc gọi quầy. Đổi lịch phải báo trước ít nhất 2 giờ. Đánh dấu những đoạn AI tự thêm hoặc sai.",
        segments: [
          { text: "Phòng khám mở cửa từ thứ Hai đến thứ Bảy." },
          { text: "Buổi sáng 7:30-11:30, buổi chiều 13:30-17:00." },
          { text: "Phòng khám cũng mở cửa sáng Chủ nhật từ 8:00 đến 11:00.", error: "Ghi chú nói nghỉ Chủ nhật. AI tự thêm giờ Chủ nhật và người bệnh sẽ đến một cánh cửa đóng." },
          { text: "Anh/chị đặt hẹn qua Zalo hoặc gọi quầy." },
          { text: "Phòng khám có chỗ đậu xe miễn phí ngay trước cửa.", error: "Ghi chú không nhắc chỗ đậu xe. Đây là chi tiết AI bịa cho câu trả lời đầy đủ." },
          { text: "Nếu cần đổi lịch, anh/chị vui lòng báo trước ít nhất 2 giờ." },
        ],
      },
      {
        type: "scenario",
        title: "Người bệnh hỏi điều ghi chú chưa có",
        start: "s1",
        nodes: {
          s1: {
            text: "Zalo có tin: \"Bên em có nhận bảo hiểm không ạ?\". Ghi chú của bạn không có thông tin này. Người bệnh đang chờ trả lời.",
            choices: [
              { label: "Nhờ AI viết câu trả lời cho câu này, vì nó là câu rất hay gặp", next: "bad_ai" },
              { label: "Nhắn: \"Em xin hỏi lại quản lý rồi báo anh/chị ngay\", và hỏi quản lý", next: "s2" },
            ],
          },
          bad_ai: {
            text: "AI viết \"Có, chúng tôi nhận đa số loại bảo hiểm\". Người bệnh đến và quầy phải giải thích rằng chưa chắc như vậy.",
            ending: "bad",
          },
          s2: {
            text: "Quản lý trả lời bằng một câu ngắn. Còn phải trả lời người bệnh.",
            choices: [
              { label: "Chép đúng câu quản lý vào Zalo, và thêm câu này vào ghi chú cho lần sau", next: "good" },
              { label: "Viết lại bằng lời của mình cho hay hơn, thêm vài điều em nghĩ là đúng", next: "bad_extra" },
            ],
          },
          bad_extra: {
            text: "Câu \"em nghĩ là đúng\" chứa một điều kiện quản lý không hề nói. Người bệnh làm theo và bị từ chối ở quầy.",
            ending: "bad",
          },
          good: {
            text: "Người bệnh nhận đúng câu trả lời quản lý duyệt. Lần sau ghi chú đã có sẵn, bạn trả lời trong 10 giây.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Ghi chú thật vào, câu trả lời ra. Chỗ AI thêm, bạn gạch.",
          "Bài sau: đọc ra ý chính trong tin nhắn dài dòng của người bệnh.",
        ],
      },
    ],
  },
  {
    id: 2182,
    slug: "phong-kham-doc-ra-tin-nhan-benh-nhan-kho-hieu",
    title: "Chặng 39, Bài 3: Đọc ra ý chính trong tin nhắn dài dòng của người bệnh",
    subtitle: "Như bóc một gói hàng lộn xộn: lấy việc hành chính ra trước, phần chuyên môn chuyển cho người có chuyên môn.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "💬",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Có người nhắn ba đoạn lộn xộn trong một tin: vừa xin đổi lịch, vừa hỏi giá, vừa kể chuyện sức khỏe. Bạn phải tìm ra việc cần làm ngay. AI giúp tách ý, nhưng chỉ trong việc hành chính; câu hỏi y khoa thuộc về người có chuyên môn, không phải của AI và cũng không phải của bạn.",
    openingQuestion:
      "Một tin nhắn dài kết thúc bằng \"có thuốc nào uống chung với thuốc cũ được không ạ?\". Bạn nhờ AI giúp xử lý tin này. Nên nhờ AI làm gì?",
    openingOptions: [
      "Tách phần việc hành chính và chuyển câu hỏi thuốc cho nhân viên chuyên môn",
      "Trả lời luôn câu hỏi thuốc bằng thông tin AI tìm được để người bệnh yên tâm",
      "Bỏ câu hỏi về thuốc và chỉ trả lời phần đổi lịch cho tin nhắn gọn hơn của người bệnh",
      "Nhờ AI viết câu trả lời chung chung về thuốc kèm lời khuyên hỏi thêm bác sĩ",
    ],
    correctOption: 0,
    explanation:
      "Câu hỏi thuốc là câu hỏi y khoa: trả lời sai có thể ảnh hưởng tới sức khỏe người bệnh. Việc của bạn là chuyển nó đến dược sĩ hoặc bác sĩ cùng nguyên văn câu hỏi, và ghi lại rằng đã chuyển. Trả lời luôn bằng AI là để một công cụ đoán thay người có chuyên môn. Bỏ câu hỏi thì người bệnh bị bỏ rơi. Câu trả lời chung chung vẫn là bạn đứng tên một lời khuyên y tế.",
    diagram: [
      { label: "Tin nhắn dài, lộn xộn", arrow: true },
      { label: "AI tách ý: việc hành chính và câu hỏi khác", arrow: true },
      { label: "Bạn xử lý phần hành chính", arrow: true },
      { label: "Phần chuyên môn chuyển cho người có chuyên môn" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: quầy lễ tân đầu giờ chiều",
      description:
        "Một người nhắn ba đoạn: xin dời lịch từ thứ Ba sang thứ Năm, hỏi giá một dịch vụ, và kể một triệu chứng rồi hỏi nên uống gì. Lễ tân nhờ AI tách thành ba việc, xử lý hai việc đầu ngay, còn việc thứ ba chuyển nguyên văn cho điều dưỡng trực. Người bệnh nhận lời hẹn lại đúng, giá đúng, và câu hỏi thuốc do người có chuyên môn trả lời.",
    },
    quiz: [
      q(
        "Nhờ AI đọc tin nhắn dài của người bệnh, việc nào phù hợp?",
        [
          "Tách thành các việc riêng: đổi lịch, hỏi giá, xin giấy",
          "Trả lời thay bạn mọi câu người bệnh hỏi trong tin",
          "Đoán xem người bệnh đang bị bệnh gì qua cách viết",
          "Quyết định ai cần được khám trước theo mức khẩn cấp",
        ],
        "Tách ý là việc chữ, và bạn kiểm được bằng cách đọc lại tin gốc. Trả lời thay mọi câu bao gồm cả câu y khoa. Đoán bệnh hay quyết định mức khẩn cấp là quyết định chuyên môn, không giao cho AI cũng không giao cho lễ tân.",
      ),
      q(
        "Câu nào trong tin nhắn nên chuyển cho nhân viên chuyên môn?",
        [
          "\"Uống thuốc này chung với thuốc huyết áp được không ạ?\"",
          "\"Cho em dời lịch từ thứ Ba sang thứ Năm được không ạ?\"",
          "\"Phí khám buổi đầu tiên là bao nhiêu vậy phòng khám ơi?\"",
          "\"Cho em xin bản in phiếu thu của lần khám tuần trước ạ\"",
        ],
        "Câu hỏi uống chung thuốc là câu hỏi y khoa. Dời lịch, hỏi phí và xin phiếu thu là việc hành chính mà quầy tự xử lý được bằng thông tin của phòng khám.",
      ),
      q(
        "AI tóm ý và ghi thêm \"người bệnh có vẻ bị viêm họng\". Bạn làm gì?",
        [
          "Xoá câu đó, vì AI không được phép chẩn đoán từ tin nhắn",
          "Giữ lại vì nó giúp điều dưỡng biết trước cách ưu tiên",
          "Sửa thành \"có thể bị viêm họng\" cho nhẹ nhàng và an toàn hơn",
          "Giữ lại nhưng ghi thêm \"do AI phỏng đoán\" ở cuối câu tóm ý",
        ],
        "Chẩn đoán là việc của người có chuyên môn. Một câu phỏng đoán của AI trong bản tóm tắt sẽ bị đọc như một nhận định thật, kể cả khi thêm \"có thể\" hay ghi chú do AI. Điều dưỡng cần đọc đúng lời người bệnh, không cần suy đoán của công cụ.",
      ),
      q(
        "Khi chuyển câu hỏi y khoa cho nhân viên chuyên môn, cách nào tốt nhất?",
        [
          "Chuyển nguyên văn câu người bệnh viết, kèm tên và cách liên lạc",
          "Viết lại bằng lời của bạn cho ngắn và dễ hiểu hơn nhiều",
          "Nhờ AI diễn đạt lại bằng thuật ngữ y khoa cho đúng chuyên môn",
          "Chỉ chuyển ý chính bằng hai từ khoá và đợi họ hỏi thêm nếu thấy cần thiết",
        ],
        "Người có chuyên môn cần nguyên văn để không mất chi tiết. Bạn hoặc AI viết lại có thể đổi nghĩa mà không biết. Hai từ khoá thì thiếu bối cảnh, và người bệnh phải chờ thêm một vòng hỏi lại.",
      ),
      q(
        "Người bệnh viết \"em đau lắm, cho em gặp bác sĩ ngay\". Việc đúng là gì?",
        [
          "Báo ngay cho điều dưỡng hoặc bác sĩ trực, đừng nhờ AI soạn tin",
          "Nhờ AI soạn câu trả lời ngắn để trấn an và hẹn giờ khám ngày mai",
          "Đợi tới cuối buổi gom các tin cần xử lý rồi trả lời cùng một lúc",
          "Trả lời bằng tin mẫu hướng dẫn cách đặt lịch cho khỏi mất thời gian",
        ],
        "Khi người bệnh nói đau nhiều, việc đầu tiên là chuyển ngay cho người có chuyên môn, không phải soạn tin cho hay. Trấn an và hẹn ngày mai là bạn tự quyết định mức khẩn cấp. Gom lại đợi cuối buổi hoặc trả lời bằng tin mẫu là làm chậm điều có thể gấp.",
      ),
    ],
    keyTakeaways: [
      "AI giúp tách tin dài thành từng việc: đổi lịch, hỏi giá, xin giấy.",
      "Câu hỏi y khoa không giao cho AI, cũng không tự bạn trả lời.",
      "Chuyển nguyên văn câu hỏi cho người có chuyên môn.",
      "Xoá mọi câu chẩn đoán hay phỏng đoán AI tự thêm vào bản tóm.",
      "Người nói đau nhiều hay khẩn cấp: báo người trực ngay.",
    ],
    practicePrompt: {
      question:
        "Bạn nhờ AI tóm một tin nhắn dài. Bản tóm có 3 dòng: (a) xin dời lịch sang thứ Năm, (b) hỏi giá dịch vụ, (c) \"có lẽ người bệnh bị dị ứng thuốc\". Nên làm gì?",
      options: [
        "Xử lý (a) và (b); xoá (c) và chuyển nguyên văn tin gốc cho người chuyên môn",
        "Xử lý cả ba vì (c) đã được AI tóm lại rất rõ ràng và hợp lý",
        "Xử lý (a), (b) và ghi (c) vào hồ sơ để bác sĩ tham khảo sau",
        "Nhờ AI viết thêm lời khuyên cho (c) rồi gửi kèm câu trả lời xử lý (a) và (b)",
      ],
      correct: 0,
      explanation:
        "(c) là một phỏng đoán y khoa do AI tự thêm. Ghi nó vào hồ sơ nghĩa là biến phỏng đoán thành hồ sơ. Nhờ AI viết lời khuyên cho (c) là mời một công cụ khuyên về thuốc. Cách đúng là xoá (c), xử lý (a) và (b), và chuyển tin gốc cho người có chuyên môn.",
    },
    summary: {
      keyIdea: "AI giúp tách tin lộn xộn thành việc; phần y khoa thuộc về người có chuyên môn.",
      formula: "Tách ý bằng AI + xử lý việc hành chính + chuyển nguyên văn câu y khoa + xoá mọi phỏng đoán của AI.",
      commonMistake: "Để AI trả lời hoặc tóm luôn cả phần y khoa vì \"nó nghe có vẻ đúng\".",
      action: "Lấy một tin nhắn dài từng nhận, tự gạch ra đâu là việc hành chính và đâu là câu y khoa.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một tin nhắn dài đã bỏ hết tên và số điện thoại (hoặc tự viết một tin giả). Nhờ AI tách thành các việc riêng, rồi tự đánh dấu việc nào là hành chính, việc nào phải chuyển cho người có chuyên môn. Ngày mai bạn sẽ được hỏi: có câu nào AI tự thêm mà tin gốc không hề có?",
      secondary: "Nếu tin gốc là của người bệnh thật, che tên, số điện thoại và mọi chi tiết nhận dạng trước khi dán vào AI.",
    },
    sections: [
      {
        type: "lead",
        text: "Một người bệnh nhắn ba đoạn: kể chuyện tuần trước, xin dời lịch, hỏi giá, cuối cùng hỏi có thuốc nào uống chung không. Bạn có 30 giây để biết việc nào cần làm ngay.",
      },
      {
        type: "feynman",
        title: "Đọc ý chính tin nhắn dài đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung bạn mở một gói hàng gửi ẩu, đồ đạc lẫn lộn. Bạn không vứt gói, cũng không tự lắp mọi thứ: bạn lấy từng món ra, xếp theo loại, và món nào không phải của mình thì chuyển cho đúng người.",
        columns: ["Thành phần", "Gói hàng lộn xộn", "Tin nhắn dài của người bệnh"],
        rows: [
          ["Việc đầu tiên", "Lấy từng món ra bàn", "Tách từng việc: đổi lịch, hỏi giá, xin giấy"],
          ["Món của mình", "Đồ bạn đặt mua", "Việc hành chính quầy tự xử lý"],
          ["Món không phải của mình", "Đồ gửi nhầm, chuyển cho đúng người", "Câu hỏi y khoa, chuyển cho người chuyên môn"],
          ["Người kiểm", "Bạn đối chiếu phiếu hàng", "Bạn đối chiếu với tin gốc"],
        ],
        oneLiner: "AI giúp bóc gói lộn xộn thành từng việc, còn món không phải của bạn thì chuyển đi đúng chỗ.",
      },
      { type: "heading", text: "Ba việc, ba người xử lý" },
      {
        type: "paragraph",
        text: "Khi tách ý, hãy phân loại ngay: việc quầy làm được (đổi lịch, hỏi giá, xin giấy tờ), việc cần hỏi quản lý (chính sách chưa rõ) và việc chuyên môn (thuốc, triệu chứng, kết quả). Loại thứ ba không nhờ AI trả lời.",
      },
      {
        type: "flow",
        title: "Đường đi của một tin nhắn dài",
        steps: [
          { label: "Đọc tin gốc một lượt", detail: "Bạn đọc nhanh cả tin trước, để biết có dấu hiệu khẩn cấp hay không. Khẩn cấp thì báo người trực ngay." },
          { label: "AI tách thành từng việc", detail: "AI liệt kê các việc: đổi lịch, hỏi giá, xin giấy, câu hỏi khác. Bạn dặn nó không thêm chẩn đoán hay lời khuyên." },
          { label: "Bạn đối chiếu với tin gốc", detail: "Mỗi việc trong bản tóm phải có trong tin gốc. Câu nào không tìm thấy là AI tự thêm, xoá đi." },
          { label: "Xử lý và chuyển", detail: "Việc hành chính bạn xử lý bằng thông tin của phòng khám; câu hỏi y khoa chuyển nguyên văn cho người có chuyên môn." },
        ],
      },
      {
        type: "callout",
        label: "Không nhờ AI trả lời câu y khoa",
        text: "Thuốc uống chung, triệu chứng, kết quả xét nghiệm là quyết định của bác sĩ hoặc dược sĩ. Một câu trả lời trôi chảy nhưng sai có thể ảnh hưởng người bệnh, và bạn sẽ là người đã gửi nó đi.",
      },
      {
        type: "scenario",
        title: "Tin nhắn ba đoạn lúc 14 giờ",
        start: "s1",
        nodes: {
          s1: {
            text: "Người bệnh nhắn: xin dời lịch thứ Ba sang thứ Năm, hỏi giá dịch vụ, và cuối tin hỏi \"có thuốc nào uống chung được với thuốc em đang dùng không ạ\". Đã 14:00, quầy đang đông.",
            choices: [
              { label: "Nhờ AI tóm và soạn luôn câu trả lời cho cả ba câu để gửi nhanh", next: "bad_all" },
              { label: "Nhờ AI tách ba việc, dặn không thêm lời khuyên y tế", next: "s2" },
            ],
          },
          bad_all: {
            text: "AI trả lời câu uống chung thuốc một cách tự tin. Bạn gửi luôn. Sau đó điều dưỡng phát hiện câu trả lời không đúng với tình trạng của người bệnh và phải gọi họ ngay.",
            ending: "bad",
          },
          s2: {
            text: "Bản tóm có 3 việc, kèm dòng \"người bệnh có thể đang dùng thuốc kháng sinh\". Tin gốc không nhắc kháng sinh.",
            choices: [
              { label: "Xoá dòng phỏng đoán, đối chiếu hai việc còn lại với tin gốc", next: "s3" },
              { label: "Giữ dòng đó lại, vì nó có vẻ hữu ích cho người trực", next: "bad_guess" },
            ],
          },
          bad_guess: {
            text: "Người trực đọc dòng \"kháng sinh\" như một thông tin từ người bệnh và trả lời dựa trên nó. Người bệnh không hề dùng thuốc đó.",
            ending: "bad",
          },
          s3: {
            text: "Hai việc hành chính đã đúng. Còn câu hỏi về thuốc.",
            choices: [
              { label: "Chuyển nguyên văn câu hỏi cho dược sĩ, báo người bệnh đã chuyển", next: "good" },
              { label: "Bỏ qua câu hỏi thuốc để tin nhắn trả lời ngắn gọn", next: "bad_ignore" },
            ],
          },
          bad_ignore: {
            text: "Người bệnh chờ mãi không có ai trả lời câu quan trọng nhất với họ, rồi tự hỏi người quen và uống theo lời họ.",
            ending: "bad",
          },
          good: {
            text: "Bạn dời lịch và báo giá đúng, dược sĩ trả lời câu thuốc trong buổi chiều. Người bệnh nhận đủ ba câu trả lời từ đúng người.",
            ending: "good",
          },
        },
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI tách việc từ tin nhắn dài",
        task: "Tin nhắn có 3 đoạn: xin dời lịch, hỏi giá, hỏi thuốc. Lắp một prompt để AI chỉ tách việc hành chính, không trả lời câu y khoa.",
        parts: [
          {
            id: "task",
            label: "Việc cần làm",
            options: [
              { text: "Đọc tin nhắn này rồi giúp tôi trả lời người bệnh.", feedback: "AI sẽ trả lời tất cả, kể cả câu hỏi thuốc, bằng những gì nó đoán." },
              { text: "Tách tin nhắn thành từng việc riêng, ghi mỗi việc một dòng, không trả lời.", good: true, feedback: "Bạn chỉ nhờ tách ý, việc trả lời do bạn và người chuyên môn." },
            ],
          },
          {
            id: "rule",
            label: "Giới hạn",
            options: [
              { text: "Việc nào liên quan thuốc hay triệu chứng thì ghi \"chuyển chuyên môn\", không nhận xét.", good: true, feedback: "AI đánh dấu chứ không nhận xét, nên không có lời khuyên y khoa tự chen vào." },
              { text: "Nếu có câu hỏi thuốc thì trả lời ngắn gọn cho người bệnh yên tâm.", feedback: "Biến AI thành người tư vấn thuốc: câu trả lời trôi chảy nhưng chưa ai kiểm." },
            ],
          },
          {
            id: "format",
            label: "Cách trình bày",
            options: [
              { text: "Viết thành một đoạn văn tóm tắt ngắn.", feedback: "Đoạn văn trộn các việc lại, khó thấy việc nào cần ai xử lý." },
              { text: "Bảng ba cột: việc, ai xử lý (quầy / quản lý / chuyên môn), trích nguyên văn từ tin.", good: true, feedback: "Có trích nguyên văn nên bạn đối chiếu được ngay với tin gốc." },
            ],
          },
        ],
        responses: [
          {
            requires: ["task", "rule", "format"],
            text: "| Việc | Ai xử lý | Trích nguyên văn |\n| Dời lịch thứ Ba sang thứ Năm | Quầy | \"cho em dời lịch...\" |\n| Hỏi giá dịch vụ | Quầy | \"giá bao nhiêu ạ\" |\n| Hỏi thuốc uống chung | Chuyển chuyên môn | \"thuốc nào uống chung được...\" |",
          },
          {
            requires: ["task"],
            text: "1. Dời lịch sang thứ Năm.\n2. Hỏi giá.\n3. Hỏi về thuốc, người bệnh có thể đang mệt nhiều.\n\n(Tách đúng ba việc nhưng AI thêm nhận xét \"mệt nhiều\" mà tin gốc không nói.)",
          },
          {
            text: "Chào anh/chị, đã dời lịch sang thứ Năm, giá khoảng 300.000 đồng, và anh/chị có thể uống thuốc đó chung...\n\n(AI trả lời thay: bịa giá, hứa lịch chưa có, và trả lời câu y khoa.)",
          },
        ],
      },
      {
        type: "closing",
        lines: [
          "Tách việc thì nhờ AI; câu hỏi y khoa thì chuyển cho người có chuyên môn.",
          "Bài sau: xin lỗi khi bác sĩ trễ giờ mà không hứa quá lời.",
        ],
      },
    ],
  },
  {
    id: 2183,
    slug: "phong-kham-tin-nhan-xin-loi-khi-tre-lich",
    title: "Chặng 39, Bài 4: Xin lỗi khi bác sĩ trễ giờ mà không hứa quá lời",
    subtitle: "Như báo chuyến xe trễ: nói mốc giờ đã biết chắc, đừng đoán.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "⏳",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Phòng chờ đông vì lịch bị dồn, người ngồi chờ đã nhìn đồng hồ nhiều lần. Một tin xin lỗi đúng lúc làm dịu cả phòng, nhưng một câu \"sẽ tới lượt bạn trong 5 phút nữa\" mà bác sĩ chưa xác nhận sẽ khiến bạn xin lỗi lần hai. AI viết lời xin lỗi rất trôi; việc của bạn là đưa mốc giờ thật.",
    openingQuestion:
      "Bác sĩ trễ khoảng nửa tiếng. Bạn nhờ AI viết tin xin lỗi và nó viết \"Chúng tôi sẽ mời anh/chị vào khám trong 10 phút nữa\". Điều gì sai nhất?",
    openingOptions: [
      "Mốc 10 phút là do AI đoán, bạn chưa hề xác nhận với bác sĩ",
      "Câu quá ngắn nên người bệnh sẽ nghĩ phòng khám không chân thành",
      "Chữ \"chúng tôi\" nghe lạnh, nên đổi thành \"em\" cho gần gũi hơn",
      "Nên hứa lâu hơn, chẳng hạn 30 phút, để người bệnh không thất vọng",
    ],
    correctOption: 0,
    explanation:
      "Con số 10 phút không đến từ ai ở phòng khám: AI nghĩ ra vì nghe hợp lý. Nếu bác sĩ ra muộn hơn, phòng khám đã hứa một điều không giữ được. Độ dài hay xưng hô chỉ là chuyện văn phong. Hứa 30 phút cũng vẫn là một con số đoán. Cách đúng là hỏi bác sĩ hoặc quản lý một mốc giờ chắc chắn, rồi mới đưa vào tin.",
    diagram: [
      { label: "Hỏi bác sĩ hoặc quản lý mốc giờ chắc chắn", arrow: true },
      { label: "Đưa mốc đó vào yêu cầu cho AI", arrow: true },
      { label: "AI viết lời xin lỗi quanh mốc thật", arrow: true },
      { label: "Bạn kiểm mốc, gửi, cập nhật khi có thay đổi" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: phòng chờ chiều thứ Sáu",
      description:
        "Lịch bị dồn vì một ca kéo dài. Lễ tân hỏi bác sĩ và được biết ca kế tiếp có thể bắt đầu lúc 15:30. Chị nhờ AI viết tin xin lỗi có mốc 15:30, và nói rõ sẽ báo lại nếu có thay đổi. Cả phòng bớt sốt ruột vì được biết một mốc cụ thể, thay vì nghe những câu đại loại \"sắp rồi\".",
    },
    quiz: [
      q(
        "Khi nhờ AI viết tin xin lỗi vì bác sĩ trễ, bạn cần đưa gì?",
        [
          "Mốc giờ bác sĩ hoặc quản lý đã xác nhận, và lý do chung",
          "Yêu cầu \"viết thật chân thành\", còn thời gian AI tự ước lượng",
          "Danh sách tên người đang chờ để tin nào cũng gọi tên",
          "Tên bệnh của từng người để lời xin lỗi có vẻ thấu hiểu hơn",
        ],
        "Mốc giờ đã xác nhận là thứ AI không thể biết. Để nó ước lượng là để nó bịa. Danh sách tên hay tên bệnh là dữ liệu người bệnh, mà một tin xin lỗi không cần.",
      ),
      q(
        "Bác sĩ chưa nói khi nào xong ca. Câu nào trong tin xin lỗi là ổn?",
        [
          "\"Chúng tôi sẽ báo lại ngay khi có giờ chính xác.\"",
          "\"Anh/chị chỉ cần chờ thêm khoảng 10 phút nữa là được vào.\"",
          "\"Bác sĩ đang xử lý xong ca cuối rồi, sẽ ra ngay bây giờ.\"",
          "\"Chúng tôi xin cam kết sẽ không có lần trễ giờ nào nữa.\"",
        ],
        "Khi chưa có mốc, lời xin lỗi vẫn thật nếu hứa điều làm được: sẽ báo lại. Hứa 10 phút, nói \"ra ngay\" hay cam kết không bao giờ trễ nữa đều là lời hứa bạn không biết mình giữ được.",
      ),
      q(
        "Ghi chú: ca kế tiếp bắt đầu khoảng 15:30 (đã hỏi bác sĩ). AI viết \"chắc chắn đúng 15:30\". Nên làm gì?",
        [
          "Sửa thành \"dự kiến khoảng 15:30\" và hứa báo nếu thay đổi",
          "Giữ nguyên vì 15:30 là giờ bạn đã hỏi bác sĩ xong",
          "Xoá hẳn mốc giờ cho khỏi phải chịu trách nhiệm về lời hứa",
          "Đổi thành 16:00 cho có dư, để chắc chắn không bị trễ nữa",
        ],
        "Mốc bác sĩ đưa là \"khoảng\", nên tin cũng phải là \"dự kiến\". Chữ \"chắc chắn\" là phần AI thêm. Xoá mốc bỏ đi thông tin người bệnh cần nhất. Đổi sang 16:00 là bạn tự đặt một con số không ai xác nhận.",
      ),
      q(
        "Vì sao không nên để AI thêm câu \"chúng tôi rất tiếc vì sự cố y tế\"?",
        [
          "Bạn không biết lý do thật, và \"sự cố y tế\" có thể khiến mọi người lo lắng",
          "Vì câu đó dài, và tin nhắn xin lỗi luôn cần phải ngắn hơn",
          "Vì AI không viết được những câu có chứa từ ngữ chuyên ngành",
          "Vì người bệnh nào cũng thích được biết lý do thật sự của việc trễ",
        ],
        "Bạn chưa xác nhận lý do, và một cụm như \"sự cố y tế\" khiến người chờ lo lắng và hỏi thêm những câu bạn không trả lời được. Việc dài hay ngắn không phải lý do chính, AI vẫn viết được từ ngữ chuyên ngành, và lý do của một ca cụ thể còn là chuyện riêng của người bệnh khác.",
      ),
      q(
        "Mốc 15:30 đã trôi qua mà bác sĩ vẫn chưa ra. Việc đúng là gì?",
        [
          "Hỏi lại bác sĩ và nhắn cập nhật mốc mới cho người đang chờ",
          "Im lặng cho tới khi bác sĩ ra, vì đã xin lỗi một lần rồi",
          "Nhờ AI viết tin mới với mốc 15:45 để trông có vẻ đã cập nhật",
          "Gửi lại đúng tin cũ một lần nữa để nhắc rằng phòng khám vẫn ghi nhớ",
        ],
        "Người đang chờ cần thông tin mới, không phải im lặng hay lặp lại. Mốc 15:45 do AI nghĩ ra vẫn là con số đoán. Gửi lại tin cũ không cho thêm thông tin. Hỏi lại bác sĩ rồi cập nhật giữ cho lời xin lỗi thật.",
      ),
    ],
    keyTakeaways: [
      "Mốc giờ trong tin xin lỗi phải do bác sĩ hoặc quản lý xác nhận.",
      "Chưa có mốc thì hứa điều làm được: sẽ báo lại.",
      "\"Dự kiến\" và \"chắc chắn\" là hai lời hứa khác nhau: dùng đúng chữ.",
      "Đừng để AI thêm lý do trễ mà bạn chưa xác nhận.",
      "Mốc trôi qua thì hỏi lại và cập nhật, đừng im lặng.",
    ],
    practicePrompt: {
      question:
        "Bạn cần tin xin lỗi. Bác sĩ nói ca kế tiếp \"khoảng 15:30\". Cách giao việc cho AI nào tốt nhất?",
      options: [
        "Cho biết mốc \"dự kiến khoảng 15:30\", dặn không thêm mốc hay lý do nào khác",
        "Nói \"bác sĩ trễ nửa tiếng\" và để AI tự tính giờ khám mới cho từng người",
        "Nói \"chắc chắn 15:30\" để AI viết tin thật tự tin, khách sẽ yên tâm",
        "Chỉ nhờ \"viết lời xin lỗi chân thành\" và tự thêm giờ vào bản nháp sau khi AI viết",
      ],
      correct: 0,
      explanation:
        "Đưa đúng mức chắc chắn của mốc (\"dự kiến khoảng\") và cấm AI thêm mốc hay lý do mới giữ được lời hứa nhỏ và thật. Để AI tự tính giờ là để nó bịa. \"Chắc chắn\" nói quá điều bác sĩ chưa hứa. Thêm giờ vào sau thì dễ quên đối chiếu với câu AI đã viết.",
    },
    summary: {
      keyIdea: "Lời xin lỗi tốt chỉ hứa điều bạn biết chắc: một mốc đã xác nhận và một lời sẽ báo lại.",
      formula: "Hỏi mốc giờ + đưa vào yêu cầu + dặn AI không thêm số + kiểm + báo lại khi đổi.",
      commonMistake: "Để AI điền \"10 phút nữa\" cho tin nghe an ủi hơn.",
      action: "Viết sẵn hai mẫu xin lỗi: có mốc dự kiến và chưa có mốc.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Viết hai mẫu tin xin lỗi trễ lịch cho nơi bạn làm: một có mốc \"dự kiến khoảng {giờ}\" và một chưa có mốc. Nhờ AI viết nháp, xoá mọi con số hoặc lý do bạn không đưa, rồi nhờ quản lý xem. Ngày mai bạn sẽ được hỏi: trong bản nháp AI đã tự thêm mốc hay lý do nào?",
      secondary: "Dán hai mẫu vào chỗ quầy lấy được nhanh, để lúc phòng chờ đông không phải viết lại.",
    },
    sections: [
      {
        type: "lead",
        text: "Ca trước kéo dài, lịch bị dồn, phòng chờ đông và ai cũng nhìn đồng hồ. Đây là lúc một tin nhắn ngắn, thật thà làm phòng chờ dịu đi.",
      },
      {
        type: "feynman",
        title: "Xin lỗi khi trễ giờ đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung chuyến xe khách trễ. Tài xế giỏi báo: \"Xe trễ, dự kiến 20 phút nữa tới bến, có gì đổi tôi báo lại\". Tài xế kém nói: \"Sắp tới rồi\" nhiều lần.",
        columns: ["Thành phần", "Tài xế xe khách", "Lễ tân phòng khám"],
        rows: [
          ["Nói điều đã biết", "Xe trễ, dự kiến tới bến lúc nào", "Bác sĩ trễ, mốc dự kiến đã xác nhận"],
          ["Không đoán", "Không hứa \"sắp tới rồi\" khi chưa biết", "Không hứa \"10 phút nữa\" khi chưa hỏi"],
          ["Lời hứa giữ được", "Sẽ báo nếu đổi", "Sẽ báo lại nếu có thay đổi"],
          ["Người kiểm", "Tài xế nhìn đồng hồ, bản đồ", "Bạn đối chiếu với bác sĩ, quản lý"],
        ],
        oneLiner: "Lời xin lỗi tốt nói thật điều đã biết và hứa điều làm được, không hơn.",
      },
      { type: "heading", text: "Càng nhiều ca trễ, phòng chờ càng lâu" },
      {
        type: "paragraph",
        text: "Một ca trễ không chỉ làm chậm một người: nó dồn cả các ca sau, nên thời gian chờ tăng theo số ca trễ trong buổi. Biểu đồ dưới cho bạn thấy điều đó bằng số liệu minh hoạ.",
      },
      {
        type: "chart",
        title: "Càng nhiều ca trễ, người chờ càng lâu",
        caption: "Số liệu minh hoạ, không phải số đo thật của phòng khám nào. Kéo thanh trượt để thấy thời gian chờ trung bình thay đổi thế nào.",
        kind: "line",
        xLabel: "Số ca trễ trong buổi",
        yLabel: "Thời gian chờ trung bình (phút)",
        x: { from: 0, to: 10, step: 1 },
        params: [
          { id: "base", label: "Thời gian chờ bình thường", min: 5, max: 20, step: 1, value: 10, unit: "phút" },
          { id: "delay", label: "Mỗi ca trễ làm dồn thêm", min: 5, max: 30, step: 1, value: 15, unit: "phút" },
        ],
        series: [{ label: "Thời gian chờ trung bình", expr: "base + x * delay * 0.5" }],
      },
      {
        type: "comparison",
        left: {
          label: "Lời xin lỗi thật thà",
          text: "\"Phòng khám xin lỗi vì lịch hôm nay bị dồn. Bác sĩ dự kiến khám anh/chị khoảng 15:30. Nếu có thay đổi, chúng tôi sẽ báo ngay.\"",
        },
        right: {
          label: "Lời xin lỗi hứa quá lời",
          text: "\"Rất xin lỗi vì sự cố y tế đột xuất. Chúng tôi cam kết sẽ khám cho anh/chị ngay trong 10 phút nữa và không bao giờ để tái diễn.\"",
        },
      },
      {
        type: "flow",
        title: "Từ phòng chờ đông tới tin xin lỗi",
        steps: [
          { label: "Hỏi mốc giờ", detail: "Hỏi bác sĩ hoặc quản lý: ca kế tiếp dự kiến bắt đầu lúc mấy giờ, và mức chắc chắn tới đâu." },
          { label: "Đưa mốc cho AI", detail: "Nói rõ: mốc dự kiến khoảng giờ đó, không có lý do chi tiết, không thêm mốc hay lời hứa khác." },
          { label: "Kiểm bản nháp", detail: "Tìm mọi con số, mọi lý do trong bản nháp. Cái nào bạn không đưa thì xoá." },
          { label: "Gửi và cập nhật", detail: "Gửi cho người đang chờ; mốc trôi qua thì hỏi lại và nhắn cập nhật." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI viết tin xin lỗi khi trễ giờ",
        task: "Bác sĩ trễ, mốc dự kiến khoảng 15:30 do bác sĩ nói. Lắp một prompt để AI viết tin xin lỗi có mốc thật và không hứa quá lời.",
        parts: [
          {
            id: "fact",
            label: "Dữ kiện",
            options: [
              { text: "Bác sĩ đang trễ, hãy viết xin lỗi và báo giờ khám mới.", feedback: "AI không biết giờ mới, nên nó tự nghĩ ra một giờ." },
              { text: "Bác sĩ trễ. Mốc ca kế tiếp dự kiến khoảng 15:30 do bác sĩ nói. Chưa biết lý do chi tiết.", good: true, feedback: "Có mốc thật và nói rõ điều chưa biết, nên AI không có chỗ để bịa." },
            ],
          },
          {
            id: "rule",
            label: "Giới hạn",
            options: [
              { text: "Không thêm mốc giờ hay lý do nào ngoài dữ kiện trên; hứa sẽ báo lại nếu đổi.", good: true, feedback: "Giới hạn rõ nên tin chỉ chứa điều biết chắc." },
              { text: "Hứa chắc chắn để khách yên tâm.", feedback: "\"Chắc chắn\" là lời hứa bạn không có quyền đưa khi bác sĩ mới nói \"khoảng\"." },
            ],
          },
          {
            id: "tone",
            label: "Giọng và độ dài",
            options: [
              { text: "Viết thật cảm động để khách hết giận.", feedback: "Cảm động dễ kéo theo lời hứa quá lời và một câu chuyện tự bịa." },
              { text: "Giọng lịch sự, ngắn, dưới 40 chữ.", good: true, feedback: "Ngắn, thật, khách đọc được ngay trên điện thoại khi đang ngồi chờ." },
            ],
          },
        ],
        responses: [
          {
            requires: ["fact", "rule", "tone"],
            text: "Phòng khám xin lỗi vì lịch hôm nay bị dồn. Bác sĩ dự kiến khám anh/chị khoảng 15:30. Nếu có thay đổi, chúng tôi sẽ báo ngay.",
          },
          {
            requires: ["fact"],
            text: "Phòng khám chân thành xin lỗi vì sự chậm trễ. Bác sĩ dự kiến khám anh/chị khoảng 15:30 và chúng tôi cam kết sẽ luôn phục vụ tốt hơn trong tương lai...\n\n(Có mốc thật nhưng thêm lời cam kết dài dòng.)",
          },
          {
            text: "Xin lỗi anh/chị vì sự cố y tế đột xuất. Chúng tôi sẽ mời anh/chị vào trong 10 phút nữa.\n\n(AI tự bịa \"sự cố y tế\" và mốc 10 phút.)",
          },
        ],
      },
      {
        type: "scenario",
        title: "15:20 mà bác sĩ vẫn chưa ra",
        start: "s1",
        nodes: {
          s1: {
            text: "Bác sĩ nói ca kế tiếp khoảng 15:30. Bây giờ 15:20 và có người đang hỏi liên tục ở quầy.",
            choices: [
              { label: "Nhờ AI viết tin xin lỗi với mốc \"dự kiến khoảng 15:30\" và hứa báo lại nếu thay đổi", next: "s2" },
              { label: "Nhắn \"chỉ còn 5 phút nữa thôi\" cho ai cũng yên tâm", next: "bad_promise" },
            ],
          },
          bad_promise: {
            text: "Đến 15:45 bác sĩ vẫn chưa xong ca. Những người đã được hứa 5 phút bắt đầu to tiếng ở quầy.",
            ending: "bad",
          },
          s2: {
            text: "Bản nháp có thêm câu \"do một ca cấp cứu\". Bạn chưa xác nhận điều này.",
            choices: [
              { label: "Xoá câu đó và gửi tin chỉ có mốc dự kiến và lời sẽ báo lại", next: "s3" },
              { label: "Giữ lại vì nghe có lý và làm mọi người thông cảm", next: "bad_reason" },
            ],
          },
          bad_reason: {
            text: "Lý do thật là một ca kéo dài bình thường. Vài người nghe \"cấp cứu\" thì lo và gọi hỏi thêm, quầy không có gì để trả lời.",
            ending: "bad",
          },
          s3: {
            text: "Đã 15:35 và bác sĩ vẫn chưa ra. Mốc trôi qua.",
            choices: [
              { label: "Hỏi lại bác sĩ và nhắn cập nhật mốc mới cho người đang chờ", next: "good" },
              { label: "Không nhắn nữa vì đã xin lỗi rồi", next: "bad_silent" },
            ],
          },
          bad_silent: {
            text: "Người chờ không nghe thêm thông tin nào trong hơn hai mươi phút, và sự sốt ruột chuyển thành bực bội.",
            ending: "bad",
          },
          good: {
            text: "Bạn nhắn mốc mới đã hỏi bác sĩ. Phòng chờ vẫn đông nhưng ai cũng biết mình đang chờ tới khi nào.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Xin lỗi thật thà: một mốc đã xác nhận và một lời sẽ báo lại.",
          "Bài sau: gom cả bộ tin mẫu dùng cả tuần cho quầy lễ tân.",
        ],
      },
    ],
  },
  {
    id: 2184,
    slug: "phong-kham-du-an-nho-bo-tin-mau-tuan",
    title: "Chặng 39, Bài 5: Dự án nhỏ: bộ 6 tin mẫu dùng cả tuần cho quầy lễ tân",
    subtitle: "Như bộ mẫu thư gửi sẵn trong ngăn kéo: có chỗ trống điền tên và giờ, và đã được đọc lại từng bản.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "🗂️",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bốn bài trước bạn đã làm từng loại tin: nhắc lịch, trả lời hỏi giờ, tóm tin dài, xin lỗi trễ giờ. Bài này gom chúng thành một bộ mẫu dùng cả tuần. Giá trị của bộ mẫu nằm ở bước cuối: kiểm lại từng mẫu để không có mẫu nào chứa thông tin sức khỏe.",
    openingQuestion:
      "Bạn gom 6 mẫu vào một tệp cho cả quầy dùng. Bước nào quan trọng nhất trước khi cả quầy bắt đầu dùng?",
    openingOptions: [
      "Đọc lại từng mẫu tìm chữ về sức khỏe và số liệu không có nguồn",
      "Đếm xem tổng bộ mẫu có đủ sáu bản, mỗi bản đủ ba dòng chưa",
      "Nhờ AI chấm điểm cả bộ mẫu về độ lịch sự trước khi dùng, rồi sửa theo điểm AI cho",
      "Đặt tên tệp thật gọn, dễ nhớ để cả quầy tìm thấy nhanh",
    ],
    correctOption: 0,
    explanation:
      "Bộ mẫu được dùng hàng trăm lần, nên một câu sai hay một chữ về sức khỏe lọt qua sẽ lặp lại hàng trăm lần. Việc đọc lại từng mẫu, tìm mọi chữ về bệnh và mọi con số không có nguồn, là bước duy nhất chặn được lỗi ở gốc. Đếm đủ bản hay đặt tên đẹp là việc tiện lợi chứ không phải an toàn, và AI chấm độ lịch sự thì không thấy được chuyện lộ thông tin.",
    diagram: [
      { label: "Sáu tình huống của quầy", arrow: true },
      { label: "Mẫu có chỗ trống cho mỗi tình huống", arrow: true },
      { label: "Đọc lại từng mẫu, xoá chữ về sức khỏe", arrow: true },
      { label: "Quản lý duyệt, cả quầy dùng chung" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: tệp mẫu của quầy lễ tân",
      description:
        "Một quầy gom sáu mẫu: nhắc lịch, đổi lịch, xác nhận đã đổi, xin lỗi trễ giờ, giờ mở cửa và thông báo nghỉ lễ. Khi soát, nhóm thấy mẫu nhắc lịch cũ còn dòng \"nhắc tái khám\" và mẫu xin lỗi có câu \"do một ca cấp cứu\". Cả hai bị xoá trước khi cả quầy dùng, và tệp được ghi tên người duyệt cùng ngày duyệt.",
    },
    quiz: [
      q(
        "Bộ mẫu dùng chung cho cả quầy cần kiểm điều gì trước tiên?",
        [
          "Không mẫu nào có chữ nói về bệnh hoặc sức khỏe của người nhận",
          "Mỗi mẫu đều có lời chào và lời cảm ơn ở đầu và cuối tin",
          "Các mẫu đều dài như nhau để nhìn cho cân đối và đẹp",
          "Cả bộ mẫu dùng cùng một kiểu chữ và cùng một cách xưng hô",
        ],
        "Mẫu dùng hàng trăm lần thì lỗi lộ thông tin sức khỏe cũng lặp hàng trăm lần. Lời chào, độ dài và cách xưng hô chỉ là chuyện trình bày, và không đè lên việc bảo vệ người bệnh.",
      ),
      q(
        "Mẫu xin lỗi có câu \"do một ca cấp cứu đột xuất\". Bạn xử lý thế nào?",
        [
          "Xoá câu đó, vì lý do trễ không phải điều bạn được xác nhận",
          "Giữ lại vì giải thích lý do làm khách dễ thông cảm hơn",
          "Đổi thành \"do việc đột xuất\" cho nghe chung chung hơn một chút",
          "Giữ lại và thêm \"xin đừng hỏi thêm chi tiết\" ngay sau đó",
        ],
        "Lý do thật có thể liên quan người bệnh khác, và bạn chưa xác nhận nó. \"Việc đột xuất\" vẫn là lý do do AI nghĩ ra. Thêm \"xin đừng hỏi\" khiến người nghe càng thắc mắc về điều đang bị giấu.",
      ),
      q(
        "Một mẫu có câu \"nhắc anh/chị tái khám tiểu đường\". Vì sao phải sửa?",
        [
          "Nó để lộ tên bệnh nếu tin hiện trên màn hình khoá",
          "Nó quá dài so với các mẫu khác trong bộ mẫu",
          "Nó dùng từ khó, người bệnh có thể không hiểu ngay nghĩa từ",
          "Nó viết sai chính tả nên trông kém chuyên nghiệp",
        ],
        "Tên bệnh trong tin nhắn là thông tin sức khỏe nằm ngay trên màn hình khoá. Nó không liên quan tới độ dài, độ khó của từ hay chính tả. Mẫu chỉ cần \"nhắc lịch hẹn lúc {Giờ}\".",
      ),
      q(
        "Vì sao mỗi mẫu cần ghi \"bản nháp chờ duyệt\", người duyệt và ngày duyệt?",
        [
          "Để biết mẫu nào đã có người chịu trách nhiệm đọc và khi nào",
          "Để khách hàng biết phòng khám có nhiều người tham gia soạn tin",
          "Để AI nhớ những mẫu nào đã dùng và không viết trùng nữa",
          "Để bộ mẫu trông chỉn chu hơn khi in ra cho cả quầy xem",
        ],
        "Nhãn giúp quầy biết mẫu nào đã qua kiểm và ai kiểm, và khi sửa thì biết ai cần xem lại. Nó không dành cho khách, AI không nhớ giữa các lần dùng, và mục đích không phải để in cho đẹp.",
      ),
      q(
        "Một tuần sau, phòng khám đổi giờ mở cửa. Việc đúng với bộ mẫu là gì?",
        [
          "Sửa mẫu giờ mở cửa, cho người duyệt xem lại và cập nhật ngày duyệt",
          "Để nguyên, khách hỏi thì lễ tân sửa miệng khi trả lời từng người",
          "Nhờ AI tự cập nhật mọi mẫu theo giờ mới rồi dùng luôn không cần đọc",
          "Xoá mẫu giờ mở cửa khỏi bộ mẫu để khỏi phải sửa mỗi lần đổi",
        ],
        "Mẫu lỗi thời làm cả quầy gửi sai giờ. Sửa miệng từng người thì mẫu vẫn sai với người khác. AI cập nhật mà không ai đọc lại là quay về lỗi ban đầu, và xóa mẫu bỏ mất một mẫu quầy dùng nhiều nhất.",
      ),
    ],
    keyTakeaways: [
      "Bộ mẫu gồm nhiều tình huống của quầy, mỗi tình huống một mẫu có chỗ trống.",
      "Đọc lại từng mẫu: không chữ nào nói về sức khỏe.",
      "Mọi con số trong mẫu phải có trong thông tin thật của phòng khám.",
      "Mẫu ghi \"bản nháp chờ duyệt\", người duyệt và ngày duyệt.",
      "Thông tin đổi thì mẫu đổi, và duyệt lại.",
    ],
    practicePrompt: {
      question:
        "Bạn xong bộ 6 mẫu. Thứ tự việc nào đúng trước khi cả quầy dùng?",
      options: [
        "Đọc lại từng mẫu, xoá chữ về sức khỏe, đối chiếu số, rồi cho quản lý duyệt",
        "Cho quản lý duyệt trước, rồi mới đọc lại nếu quản lý có ý kiến",
        "Cho cả quầy dùng thử một tuần, rồi gom các lỗi mà lễ tân gặp để sửa lại cho đúng",
        "Nhờ AI kiểm cả bộ mẫu và sửa giúp, rồi cho quản lý ký duyệt bản đó",
      ],
      correct: 0,
      explanation:
        "Bạn là người đọc gốc, nên phải đọc và đối chiếu trước; quản lý duyệt bản đã sạch. Đảo thứ tự khiến quản lý duyệt bản còn lỗi. Dùng thử một tuần nghĩa là để người bệnh gặp lỗi. Nhờ AI sửa rồi ký thì người ký chưa đọc lại từng dòng.",
    },
    summary: {
      keyIdea: "Bộ mẫu là tờ giấy được dùng nhiều lần: sai một chữ thì sai nhiều lần.",
      formula: "Sáu tình huống + mẫu có chỗ trống + đọc lại từng mẫu + người duyệt và ngày duyệt.",
      commonMistake: "Giữ lại câu AI thêm vì nghe tử tế, dù không ai đưa thông tin đó.",
      action: "Chép sáu tình huống của quầy và viết mẫu ngắn cho từng tình huống.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Liệt kê sáu tình huống nhắn tin của nơi bạn làm, nhờ AI viết mẫu có chỗ trống cho từng tình huống (không dán tên hay thông tin người bệnh thật). Đọc lại mỗi mẫu, xoá mọi chữ về sức khỏe, rồi ghi dưới mẫu: bản nháp chờ duyệt, người duyệt và ngày. Ngày mai bạn sẽ được hỏi: mẫu nào bạn đã phải xoá chữ về sức khỏe?",
      secondary: "Mẫu nào phải xoá nhiều nhất chính là mẫu bạn nên nhờ quản lý xem kỹ nhất.",
    },
    sections: [
      {
        type: "lead",
        text: "Cuối tuần, bạn nhìn lại: nhắc lịch, đổi lịch, xin lỗi, hỏi giờ. Cùng vài kiểu tin, tuần nào cũng gõ lại. Đã đến lúc gom chúng thành một bộ mẫu dùng chung.",
      },
      {
        type: "feynman",
        title: "Bộ tin mẫu đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung ngăn kéo có sẵn vài mẫu thư, chỗ tên và ngày để trống. Ai cần thì rút ra, điền tên, gửi. Nhưng nếu một mẫu trong ngăn kéo có lỗi, mọi lá thư rút ra từ đó đều mang lỗi ấy.",
        columns: ["Thành phần", "Ngăn kéo mẫu thư", "Bộ tin mẫu của quầy"],
        rows: [
          ["Chỗ trống", "Tên, ngày", "{Tên}, {Giờ}"],
          ["Lợi ích", "Không phải viết lại mỗi lần", "Cả quầy cùng một giọng, nhanh hơn"],
          ["Rủi ro", "Một lỗi lặp trong mọi lá thư", "Một câu lộ sức khỏe lặp trong mọi tin"],
          ["Cách chặn", "Đọc kỹ từng mẫu trước khi cho vào ngăn kéo", "Đọc lại từng mẫu, quản lý duyệt"],
        ],
        oneLiner: "Bộ mẫu tiết kiệm công vì nó được dùng lại; chính vì vậy mỗi mẫu phải sạch trước khi vào ngăn kéo.",
      },
      { type: "heading", text: "Sáu mẫu cho một tuần ở quầy" },
      {
        type: "list",
        items: [
          "Nhắc lịch hẹn: giờ, địa chỉ, cách đổi lịch.",
          "Xin đổi lịch: hỏi giờ mới thuận tiện.",
          "Xác nhận đã đổi: nhắc lại giờ mới.",
          "Xin lỗi trễ giờ: mốc dự kiến và lời sẽ báo lại.",
          "Trả lời giờ mở cửa: đúng theo ghi chú thật.",
          "Thông báo nghỉ lễ: ngày nghỉ, ngày mở lại.",
        ],
      },
      {
        type: "flow",
        title: "Từ sáu tình huống tới bộ mẫu đã duyệt",
        steps: [
          { label: "Liệt kê tình huống", detail: "Ghi sáu việc nhắn tin lặp lại nhiều nhất ở quầy, mỗi việc một dòng." },
          { label: "AI viết mẫu có chỗ trống", detail: "Mỗi tình huống một mẫu ngắn, chỗ trống cho tên và giờ. Bạn không dán thông tin người bệnh thật." },
          { label: "Đọc lại từng mẫu", detail: "Tìm chữ về sức khỏe, mọi con số, mọi lời hứa. Cái nào không có trong thông tin thật của phòng khám thì xoá." },
          { label: "Gắn nhãn và duyệt", detail: "Ghi dưới mỗi mẫu: bản nháp chờ duyệt, người duyệt và ngày duyệt. Duyệt xong mới cho cả quầy dùng." },
        ],
      },
      {
        type: "callout",
        label: "Rủi ro: câu AI tự thêm lặp lại nhiều lần",
        text: "Một câu chúc \"mau khỏe\" hay một dòng nhắc \"tái khám\" trong mẫu sẽ đi ra hàng trăm tin. Đọc kỹ từng mẫu một lần bây giờ rẻ hơn nhiều so với sửa sau khi đã gửi.",
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát bộ mẫu do AI soạn",
        task: "Bạn nhờ AI soạn bộ 6 mẫu cho quầy. Đây là bản nháp đầu. Đánh dấu những chỗ lộ thông tin sức khỏe hoặc hứa điều chưa ai xác nhận.",
        segments: [
          { text: "Mẫu 1: \"Chào {Tên}, phòng khám nhắc lịch hẹn lúc {Giờ}. Cần đổi lịch, anh/chị nhắn lại hoặc gọi quầy.\"" },
          { text: "Mẫu 2: \"Chào {Tên}, nhắc anh/chị tái khám tiểu đường lúc {Giờ}.\"", error: "Tên bệnh nằm ngay trong tin. Tin hiện trên màn hình khoá là lộ bệnh của người nhận." },
          { text: "Mẫu 3: \"Chào {Tên}, lịch mới của anh/chị đã đổi sang {Giờ}. Cảm ơn anh/chị.\"" },
          { text: "Mẫu 4: \"Xin lỗi anh/chị, do ca cấp cứu nên bác sĩ sẽ khám ngay khi anh/chị đến.\"", error: "Lý do \"ca cấp cứu\" chưa được xác nhận, và \"khám ngay\" là lời hứa không ai đưa." },
          { text: "Mẫu 5: \"Kết quả xét nghiệm của {Tên} đã có, mời anh/chị đến nhận trong tuần.\"", error: "Nhắc tới kết quả xét nghiệm cho biết người nhận đã làm xét nghiệm, đó là thông tin sức khỏe." },
          { text: "Mẫu 6: \"Phòng khám nghỉ lễ từ ngày {Ngày} đến hết ngày {Ngày}, mở lại theo giờ thường.\"" },
        ],
      },
      {
        type: "scenario",
        title: "Cuối tuần duyệt bộ mẫu",
        start: "s1",
        nodes: {
          s1: {
            text: "Chiều thứ Sáu, bộ 6 mẫu đã soạn xong và quản lý sắp họp. Đội muốn dùng ngay từ thứ Hai.",
            choices: [
              { label: "Gửi tệp cho quản lý mà chưa đọc lại, vì AI đã soạn khá kỹ", next: "bad_unread" },
              { label: "Đọc lại từng mẫu, xoá chữ về sức khỏe, rồi mới đưa quản lý", next: "s2" },
            ],
          },
          bad_unread: {
            text: "Quản lý duyệt lướt và tệp được dùng. Tuần sau, một người bệnh gọi hỏi vì sao tin nhắc lịch của mình nhắc tới bệnh tiểu đường trên màn hình khoá nơi làm việc.",
            ending: "bad",
          },
          s2: {
            text: "Bạn gạch được hai mẫu có chữ về sức khỏe và một mẫu có lời hứa chưa xác nhận. Bạn sửa xong.",
            choices: [
              { label: "Ghi dưới mỗi mẫu: bản nháp chờ duyệt, tên người duyệt và ngày", next: "s3" },
              { label: "Bỏ nhãn cho gọn, tệp chỉ có nội dung mẫu", next: "bad_label" },
            ],
          },
          bad_label: {
            text: "Vài tháng sau nhân viên mới không biết mẫu nào đã qua kiểm, ai duyệt. Một người tự thêm dòng vào mẫu mà không ai xem lại.",
            ending: "bad",
          },
          s3: {
            text: "Quản lý duyệt và hỏi: nếu giờ mở cửa đổi thì sao?",
            choices: [
              { label: "Cập nhật mẫu giờ mở cửa khi thông tin đổi, và ghi lại ngày duyệt mới", next: "good" },
              { label: "Không cần lo, lễ tân cứ sửa miệng khi trả lời khách", next: "bad_stale" },
            ],
          },
          bad_stale: {
            text: "Mẫu vẫn ghi giờ cũ, và mỗi lần lễ tân quên sửa miệng thì khách đến sai giờ.",
            ending: "bad",
          },
          good: {
            text: "Bộ mẫu sạch, có người duyệt, có ngày duyệt. Từ thứ Hai cả quầy dùng chung và chỉ còn phải điền tên, giờ.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Bộ mẫu dùng nhiều lần, nên mỗi mẫu phải được đọc kỹ một lần.",
          "Bài sau: soạn tờ hướng dẫn giấy tờ cần mang khi đến khám.",
        ],
      },
    ],
  },
];
