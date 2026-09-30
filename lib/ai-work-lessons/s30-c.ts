import type { Lesson, QuizQuestion } from "../lesson-types";

// Chặng 30, bài 11-15. Giáo trình: scripts/curriculum/stage-30.json.
// Không bài nào dựa vào tính năng riêng của một công cụ AI: chỉ dạy cách giao việc và cách kiểm kết quả.

// Đáp án đúng luôn viết ở vị trí 0; thứ tự được cân lại lúc build (lib/lesson-quiz-balance.js).
const q = (question: string, options: [string, string, string, string], explanation: string): QuizQuestion => ({
  question,
  options,
  correct: 0,
  explanation,
});

export const S30_C_LESSONS: Lesson[] = [
  // ---------------------------------------------------------------- 2010
  {
    id: 2010,
    slug: "ghi-chu-phong-van-bang-ai-doc-lai-cho-dung",
    title: "Chặng 30, Bài 11: Ghi chú phỏng vấn do AI tóm tắt: đọc lại cho đúng lời ứng viên",
    subtitle: "Bản tóm tắt gọn và trôi chảy, nhưng có thể có một câu ứng viên chưa hề nói.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🗒️",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Sau buổi phỏng vấn, bản ghi chú là thứ người khác dùng để quyết định có mời ứng viên vào vòng sau hay không. Nếu AI thêm một kinh nghiệm ứng viên chưa nói, hoặc bỏ mất một điều kiện họ đã nêu, ứng viên bị đánh giá bằng lời của máy chứ không phải lời của họ. Đọc lại đúng cách chỉ mất vài phút.",
    openingQuestion:
      "Bạn nhờ AI tóm tắt buổi phỏng vấn 45 phút thành 8 dòng. Trong đó có dòng ứng viên từng quản lý nhóm 3 người, mà bạn không nhớ họ nói vậy. Bạn làm gì?",
    openingOptions: [
      "Đối chiếu với ghi chú tay hoặc bản ghi, dòng nào không có nguồn thì bỏ",
      "Giữ dòng đó vì AI đã nghe cả buổi nên chắc chắn có căn cứ",
      "Hỏi lại AI 'bạn có chắc không' rồi tin theo câu trả lời của nó",
      "Xoá cả bản tóm tắt và viết lại toàn bộ từ trí nhớ sau vài ngày",
    ],
    correctOption: 0,
    explanation:
      "AI tóm tắt bằng cách dự đoán câu nghe hợp lý, nên nó có thể thêm chi tiết khớp với vị trí đang tuyển dù ứng viên chưa nói. Cách kiểm chắc nhất là so từng dòng với nguồn gốc: ghi chú tay hoặc bản ghi được phép lưu. Hỏi lại 'có chắc không' thì AI thường xác nhận cho trôi chảy chứ không tra lại nguồn. Giữ dòng đó vì tin AI là để một lời không có thật đi vào hồ sơ. Viết lại từ trí nhớ sau nhiều ngày thì còn dễ sai hơn.",
    diagram: [
      { label: "Ghi chú tay hoặc bản ghi của buổi phỏng vấn", arrow: true },
      { label: "AI tóm tắt thành vài dòng gọn", arrow: true },
      { label: "Bạn đối chiếu từng dòng với nguồn gốc", arrow: true },
      { label: "Dòng không có nguồn thì bỏ hoặc gắn nhãn chưa xác nhận" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một chuyên viên nhân sự phỏng vấn 6 ứng viên trong một ngày và nhờ AI tóm tắt từng buổi. Ở bản tóm tắt thứ tư có câu 'ứng viên đã dẫn dắt dự án chuyển đổi hệ thống' trong khi ghi chú tay chỉ ghi 'có tham gia dự án'. Nhờ đối chiếu, chị sửa lại đúng vai trò trước khi gửi trưởng phòng.",
    },
    quiz: [
      q(
        "Vì sao bản tóm tắt phỏng vấn của AI cần được đối chiếu với nguồn gốc?",
        [
          "AI có thể thêm điều ứng viên chưa nói mà câu vẫn nghe rất hợp lý",
          "AI chỉ tóm tắt được văn bản ngắn nên hay bỏ quên nửa sau buổi phỏng vấn",
          "AI không biết tên riêng nên phải nhập lại tên ứng viên bằng tay từng chỗ",
          "AI luôn đổi lời ứng viên sang giọng trang trọng hơn",
        ],
        "Lỗi đáng sợ nhất là thêm điều không có: câu vẫn trôi chảy nên mắt đọc lướt không thấy. Bỏ quên nửa sau chỉ xảy ra khi văn bản quá dài so với khả năng xử lý, và tên riêng hay giọng văn thì bạn nhìn là thấy, không phải lý do chính để đối chiếu."
      ),
      q(
        "Ghi chú tay ghi 'ứng viên dùng Excel thành thạo, chưa dùng phần mềm ERP'. Bản AI viết 'ứng viên có kinh nghiệm hệ thống kế toán'. Nên xử lý thế nào?",
        [
          "Sửa lại đúng như ghi chú, vì AI đã gộp và làm rộng nghĩa điều ứng viên nói",
          "Giữ nguyên vì 'hệ thống kế toán' là cách nói gọn của Excel và ERP gộp lại nên không cần sửa gì thêm",
          "Thêm một dòng khen ứng viên để bản ghi chú cân bằng với dòng chưa dùng ERP",
          "Xoá cả hai dòng để bản tóm tắt không có chi tiết nào gây tranh cãi",
        ],
        "Câu của AI làm người đọc hiểu ứng viên đã dùng ERP, trái với ghi chú. Gộp gọn kiểu này là dạng thêm bớt khó thấy nhất. Không thêm lời khen vô căn cứ, và cũng không xoá thông tin thật chỉ vì nó không đẹp: người quyết định cần biết chính xác."
      ),
      q(
        "Ứng viên nói mong muốn lương 15 đến 18 triệu. Bản AI ghi 'ứng viên linh hoạt về mức lương'. Nên làm gì?",
        [
          "Ghi lại khoảng số ứng viên nêu",
          "Giữ 'linh hoạt' vì nghe lịch sự hơn con số cụ thể",
          "Ghi mức trung bình 16,5 triệu cho dễ so sánh (= (15 + 18) ÷ 2)",
          "Xoá luôn mục lương vì chưa đến vòng thương lượng",
        ],
        "Con số ứng viên nêu là dữ kiện, còn 'linh hoạt' là suy diễn của AI về thái độ. Lấy trung bình cũng là tự tạo ra một số ứng viên chưa nói. Xoá mục lương làm mất thông tin người quyết định sẽ cần."
      ),
      q(
        "Bản AI viết 'ứng viên rất trung thành và sẽ gắn bó lâu dài'. Dòng này nên xử lý thế nào?",
        [
          "Bỏ, vì đó là suy đoán tính cách, không phải điều ứng viên đã nói",
          "Giữ, vì đó là nhận định tích cực nên không gây hại cho ứng viên",
          "Giữ nhưng đổi 'rất trung thành' thành 'khá trung thành' cho nhẹ bớt",
          "Chuyển thành điểm cộng trong bảng chấm để tăng điểm tổng của ứng viên",
        ],
        "Không có câu nào của ứng viên cho biết họ sẽ gắn bó. Đó là AI suy đoán, và một lời khen sai vẫn đưa người ra quyết định đi lệch hướng. Đổi mức độ chỉ làm suy đoán nhẹ đi chứ không có thêm căn cứ, và chuyển thành điểm cộng còn làm số điểm sai theo."
      ),
      q(
        "Cách nào giúp bản tóm tắt AI ít bị thêm chi tiết nhất?",
        [
          "Ghi trong yêu cầu: chỉ dùng điều có trong ghi chú, chỗ thiếu thì ghi 'không rõ'",
          "Nhờ AI viết 'thật chi tiết và đầy đủ' để nó không bỏ sót ý nào",
          "Chọn công cụ AI mới nhất vì bản mới không còn thêm chi tiết",
          "Đưa cho AI cả mô tả công việc để nó hiểu vị trí đang tuyển",
        ],
        "Cho phép ghi 'không rõ' giúp AI không phải lấp chỗ trống bằng điều nghe hợp lý. Đòi 'chi tiết đầy đủ' thúc nó viết thêm cho đủ. Công cụ mới hơn vẫn có thể thêm chi tiết, và đưa mô tả công việc cho nó còn dễ khiến nó viết điều ứng viên 'lẽ ra phải có' theo vị trí."
      ),
    ],
    keyTakeaways: [
      "Tóm tắt của AI là bản nháp; nguồn gốc là ghi chú hoặc bản ghi của buổi phỏng vấn.",
      "Đối chiếu kỹ nhất ba loại dòng: kinh nghiệm, con số (lương, thời gian) và nhận xét về tính cách.",
      "Dòng không có nguồn thì bỏ hoặc gắn nhãn chưa xác nhận, không giữ vì nghe hợp lý.",
      "Ghi âm hoặc lưu bản ghi ứng viên phải theo quy định công ty; chưa rõ thì hỏi bộ phận pháp chế.",
    ],
    practicePrompt: {
      question:
        "Chị Lan nhờ AI tóm tắt ghi chú phỏng vấn rồi gửi thẳng cho trưởng phòng vì bản tóm tắt đọc rất mượt. Bước nào chị bỏ sót?",
      options: [
        "Đối chiếu từng dòng kinh nghiệm và con số với ghi chú gốc",
        "Nhờ AI viết lại bản tóm tắt để nó mượt hơn và dễ đọc hơn nữa",
        "Thêm nhận xét về tính cách ứng viên để trưởng phòng dễ hình dung",
        "Gửi bản tóm tắt cho chính ứng viên duyệt trước khi lưu hồ sơ",
      ],
      correct: 0,
      explanation:
        "Độ mượt không nói lên độ đúng. Bước còn thiếu là so với nguồn. Viết lại cho mượt hơn không tìm ra dòng bịa, nhận xét tính cách là thêm suy đoán, và việc gửi ứng viên duyệt hồ sơ nội bộ không phải quy trình thông thường.",
    },
    summary: {
      keyIdea: "Bản tóm tắt AI là bản nháp cần đối chiếu; điều ứng viên chưa nói thì không được nằm trong hồ sơ.",
      formula: "Ghi chú gốc + AI tóm tắt + đối chiếu từng dòng = hồ sơ đúng lời ứng viên.",
      commonMistake: "Thấy bản tóm tắt mượt và đầy đủ nên tin là đúng, rồi chuyển thẳng cho người quyết định.",
      action: "Lần phỏng vấn tới, ghi ba dòng số liệu bằng tay để dùng làm mốc đối chiếu.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy ghi chú của một buổi họp hoặc phỏng vấn gần đây của bạn (bỏ tên thật nếu công ty chưa duyệt công cụ AI). Nhờ AI tóm tắt thành 6 dòng, chỉ dùng điều có trong ghi chú. Sau đó gạch chân từng dòng và ghi bên cạnh 'có nguồn' hay 'không có nguồn'. Ghi lại số dòng không có nguồn để ngày mai bạn kể lại.",
      secondary: "Ghi lại loại dòng AI hay thêm nhất: kinh nghiệm, con số hay nhận xét tính cách.",
    },
    sections: [
      {
        type: "lead",
        text: "Chiều thứ Sáu, bạn vừa phỏng vấn xong ứng viên thứ năm trong ngày và đầu óc đã lẫn. Bản tóm tắt AI gửi lại đọc rất gọn, nhưng có một dòng bạn không nhớ ai đã nói. Bài này dạy cách đọc lại để hồ sơ đúng lời ứng viên.",
      },
      {
        type: "feynman",
        title: "Đọc lại ghi chú AI đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới người viết biên bản họp thay bạn. Họ viết nhanh và gọn, nhưng thỉnh thoảng nghe nhầm hoặc điền cho trọn ý. Trước khi ký, bạn đối chiếu với ghi chú của mình. AI tóm tắt cũng vậy: nó giúp viết nhanh, còn chữ ký duyệt là của bạn.",
        columns: ["Việc", "Người viết biên bản", "AI tóm tắt phỏng vấn"],
        rows: [
          ["Ai viết bản nháp", "Thư ký cuộc họp", "AI, từ ghi chú bạn đưa"],
          ["Lỗi hay gặp", "Nghe nhầm, điền cho trọn ý", "Thêm chi tiết nghe hợp lý, gộp hai ý làm một"],
          ["Nguồn để đối chiếu", "Ghi chú của bạn", "Ghi chú tay hoặc bản ghi được phép lưu"],
          ["Ai duyệt", "Bạn ký", "Bạn đọc từng dòng rồi mới lưu"],
        ],
        oneLiner: "AI viết bản nháp cho nhanh, còn mỗi dòng trong hồ sơ vẫn phải có nguồn từ lời ứng viên.",
      },
      { type: "heading", text: "Vấn đề: câu trôi chảy không có nghĩa là câu đúng" },
      {
        type: "paragraph",
        text: "AI tóm tắt bằng cách dự đoán câu nghe hợp lý sau các câu trước. Với một buổi phỏng vấn kế toán, câu 'có kinh nghiệm quản lý nhóm' nghe rất hợp lý, nên đôi khi nó xuất hiện dù ứng viên chưa hề nói. Câu này lại nằm giữa những dòng đúng, nên mắt đọc lướt không thấy.",
      },
      {
        type: "flow",
        title: "Từ ghi chú tay đến hồ sơ đã đối chiếu",
        steps: [
          { label: "Ghi nhanh trong lúc phỏng vấn", detail: "Chỉ cần vài dòng: các con số ứng viên nêu, tên công ty, vai trò và thời gian. Đó là mốc để đối chiếu về sau." },
          { label: "Đưa ghi chú cho AI kèm luật", detail: "Yêu cầu chỉ dùng điều có trong ghi chú, chỗ nào thiếu thì ghi 'không rõ', không suy đoán tính cách." },
          { label: "Đọc từng dòng với ghi chú bên cạnh", detail: "Đặt hai bản cạnh nhau. Mỗi dòng của AI phải tìm được dòng tương ứng trong ghi chú." },
          { label: "Bỏ hoặc gắn nhãn dòng không có nguồn", detail: "Dòng không tìm ra nguồn thì xoá. Nếu bạn chắc chắn có nói mà quên ghi, gắn nhãn 'chưa xác nhận' và hỏi lại ứng viên sau." },
          { label: "Lưu và chuyển cho người quyết định", detail: "Chỉ lưu bản đã đối chiếu, ghi rõ dòng nào là quan sát của bạn, dòng nào là lời ứng viên." },
        ],
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát bản tóm tắt AI vừa viết",
        task: "Ghi chú của bạn: ứng viên làm kế toán tổng hợp 4 năm ở một công ty phân phối; dùng Excel thành thạo, chưa dùng phần mềm ERP; nghỉ việc vì công ty chuyển xa nhà; mong muốn lương 15 đến 18 triệu. Đánh dấu những câu AI tự thêm.",
        segments: [
          { text: "Ứng viên có 4 năm làm kế toán tổng hợp tại một công ty phân phối." },
          { text: "Ứng viên từng quản lý một nhóm 3 kế toán viên.", error: "Ghi chú không có chi tiết quản lý nhóm. AI thêm vì nó khớp với một vị trí kế toán có kinh nghiệm." },
          { text: "Ứng viên dùng Excel thành thạo và chưa dùng phần mềm ERP." },
          { text: "Ứng viên nghỉ việc vì công ty chuyển địa điểm xa nhà." },
          { text: "Ứng viên rất trung thành và chắc chắn sẽ gắn bó lâu dài.", error: "Không có câu nào của ứng viên nói về điều này. Đó là AI suy đoán tính cách, và một lời khen sai vẫn làm người quyết định đi lệch hướng." },
          { text: "Mức lương ứng viên mong muốn là từ 15 đến 18 triệu." },
        ],
      },
      {
        type: "callout",
        label: "Ghi âm buổi phỏng vấn là chuyện khác",
        text: "Ghi âm hay đưa bản ghi của ứng viên vào một công cụ AI có thể cần sự đồng ý của họ và cần công cụ được công ty duyệt. Bạn không tự quyết bằng cảm giác: hỏi bộ phận pháp chế hoặc người phụ trách bảo mật dữ liệu của công ty trước khi làm.",
      },
      {
        type: "comparison",
        left: {
          label: "Đối chiếu từng dòng với nguồn",
          text: "Mất khoảng 5 đến 10 phút cho mỗi buổi. Bắt được dòng thêm và dòng gộp nghĩa. Hồ sơ mỗi dòng đều truy về được lời ứng viên. Người quyết định tin vào bản ghi của bạn.",
        },
        right: {
          label: "Đọc lướt vì bản tóm tắt nghe đúng",
          text: "Chỉ mất một phút nhưng dòng bịa nằm lẫn dòng đúng. Ứng viên bị đánh giá bằng kinh nghiệm không có thật hoặc bị bỏ sót điều kiện thật. Khi sai lộ ra thì đã qua vòng phỏng vấn.",
        },
      },
      {
        type: "scenario",
        title: "Năm phút trước cuộc họp chọn ứng viên",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn có bản tóm tắt AI của ứng viên Hà, ghi chú tay của bạn nằm cạnh, và trưởng phòng đợi bản ghi trong năm phút. Bản AI có dòng 'từng quản lý nhóm 3 người'.",
            choices: [
              { label: "Gửi luôn vì bản tóm tắt gọn và đã có đủ các mục", next: "bad_send" },
              { label: "So dòng đó với ghi chú tay trước khi gửi", next: "s2" },
            ],
          },
          bad_send: {
            text: "Trưởng phòng cho ứng viên vào vòng hai vì cần người có kinh nghiệm dẫn dắt. Ở vòng hai ứng viên nói rõ chưa từng quản lý ai. Cả hai bên mất thêm một buổi và bạn phải giải thích vì sao hồ sơ ghi khác.",
            ending: "bad",
          },
          s2: {
            text: "Ghi chú tay không có chữ nào về quản lý nhóm. Bạn cũng nhớ mang máng ứng viên có nhắc 'hướng dẫn bạn mới'.",
            choices: [
              { label: "Sửa thành 'hướng dẫn nhân viên mới' và ghi chưa xác nhận", next: "good" },
              { label: "Giữ 'quản lý nhóm' vì nghe gần giống hướng dẫn người mới", next: "bad_keep" },
            ],
          },
          bad_keep: {
            text: "Hai việc này khác nhau về trách nhiệm và khi đánh giá thì bị coi là một. Trưởng phòng đặt kỳ vọng quản lý lên người chưa từng quản lý.",
            ending: "bad",
          },
          good: {
            text: "Bạn gửi bản đã sửa, kèm một dòng ghi chú cần hỏi lại ứng viên về vai trò hướng dẫn. Cuộc họp dùng đúng thông tin và bạn không phải đính chính sau đó.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Ghi tay vài dòng số liệu ngay trong lúc phỏng vấn.",
          "Bước 2 - Nhờ AI tóm tắt, cấm suy đoán, chỗ thiếu ghi 'không rõ'.",
          "Bước 3 - Đối chiếu từng dòng, đặc biệt là kinh nghiệm, con số, nhận xét tính cách.",
          "Bước 4 - Xoá hoặc gắn nhãn dòng không có nguồn rồi mới lưu.",
        ],
      },
      {
        type: "closing",
        lines: [
          "AI viết nháp, nguồn gốc làm chứng, và dòng nào vào hồ sơ là do bạn quyết.",
          "Bài sau: thư mời phỏng vấn và thư từ chối lịch sự, đủ rõ.",
        ],
      },
    ],
  },
  // ---------------------------------------------------------------- 2011
  {
    id: 2011,
    slug: "thu-moi-phong-van-va-thu-cam-on-ung-vien",
    title: "Chặng 30, Bài 12: Thư mời phỏng vấn và thư từ chối lịch sự, đủ rõ",
    subtitle: "Một mẫu tử tế cho cả hai loại thư, rồi bạn sửa riêng cho từng người.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "📨",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Ứng viên nhớ rất lâu cách công ty đối xử với họ, kể cả khi họ không trúng tuyển. Thư mời thiếu giờ và địa điểm làm mất buổi phỏng vấn, thư từ chối cụt ngủn hay hứa hão làm mất thiện cảm. Có mẫu tốt và soát từng thư giúp bạn gửi 30 thư trong một buổi mà vẫn đủ rõ, đủ tử tế.",
    openingQuestion:
      "Bạn phải gửi 30 thư trả lời ứng viên: 15 thư mời phỏng vấn và 15 thư từ chối. Cách nào vừa nhanh vừa tử tế?",
    openingOptions: [
      "Một mẫu cho mỗi loại thư, chỗ trống điền từ bảng, rồi sửa riêng từng thư",
      "Nhờ AI viết 30 thư riêng cho từng người rồi gửi ngay vì đã được cá nhân hoá",
      "Gửi cùng một thư chung cho cả 30 người, chỉ đổi lời chào đầu thư",
      "Chỉ gửi thư mời và để ứng viên bị loại tự hiểu khi không nhận được tin",
    ],
    correctOption: 0,
    explanation:
      "Mẫu cho mỗi loại thư giữ phần chung ổn định (giờ, địa điểm, lời cảm ơn), chỗ trống lấy từ bảng để không lẫn tên, giờ. Bước sửa riêng cho từng người là chỗ bạn thêm một chi tiết thật về buổi trao đổi. Nhờ AI viết cả 30 thư rồi gửi ngay dễ lẫn giờ giữa các dòng. Một thư chung cho cả hai nhóm sẽ gửi thư mời cho người bị loại. Im lặng với người bị loại là cách nhanh nhất để họ nói xấu công ty.",
    diagram: [
      { label: "Tách hai nhóm: được mời và không được mời", arrow: true },
      { label: "Viết mẫu có chỗ trống cho mỗi nhóm", arrow: true },
      { label: "Điền tên, giờ, địa điểm từ bảng theo dõi", arrow: true },
      { label: "Sửa riêng vài chi tiết rồi gửi thử cho chính bạn" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một chuyên viên nhân sự có 40 hồ sơ vào vòng phỏng vấn của đợt tuyển. Chị dựng hai mẫu thư, điền giờ và địa điểm từ bảng tuyển dụng, gửi thử 3 thư cho chính mình và phát hiện hai thư ghi nhầm phòng họp vì cột địa điểm bị lệch. Sửa xong chị mới gửi loạt.",
    },
    quiz: [
      q(
        "Một thư từ chối lịch sự và đủ rõ cần có gì?",
        [
          "Lời cảm ơn, kết quả nêu thẳng, một lời chúc, không kèm so sánh với người khác",
          "Lời cảm ơn thật dài, kết quả nêu ở cuối thư để bớt phũ, kèm lời hứa sẽ liên hệ lại",
          "Kết quả ngắn gọn một câu, không cần lời cảm ơn vì ứng viên đã biết công ty bận",
          "Lý do chi tiết vì sao ứng viên thua người trúng tuyển để họ rút kinh nghiệm",
        ],
        "Người đọc muốn biết ngay kết quả và được đối xử tôn trọng, không cần bị so với người khác. Nêu kết quả ở cuối làm thư mập mờ, hứa liên hệ lại khi không có ý định thì thành hứa hão, và cụt ngủn thì thiếu tử tế."
      ),
      q(
        "Thư mời phỏng vấn thiếu yếu tố nào thì dễ làm ứng viên đến sai giờ hoặc sai chỗ?",
        [
          "Ngày giờ, địa điểm hoặc đường link, người gặp và cách xác nhận",
          "Lời giới thiệu lịch sử công ty và các giải thưởng đã nhận",
          "Danh sách đầy đủ các câu hỏi sẽ được hỏi trong buổi phỏng vấn",
          "Chữ ký số và con dấu đỏ của giám đốc nhân sự ở cuối mỗi thư gửi đi",
        ],
        "Ứng viên hành động dựa trên thông tin thực tế: khi nào, ở đâu, gặp ai, xác nhận bằng cách nào. Lịch sử công ty hay giải thưởng không giúp họ đến đúng chỗ. Danh sách câu hỏi không bắt buộc, và chữ ký số không phải điều kiện của thư mời thông thường."
      ),
      q(
        "AI viết thư từ chối có câu 'hồ sơ của bạn sẽ được lưu trong 1 năm'. Công ty chưa có quy định này. Nên làm gì?",
        [
          "Xoá câu đó",
          "Giữ lại vì 1 năm là khoảng thời gian thông dụng",
          "Đổi thành 6 tháng để ít cam kết hơn",
          "Giữ và nhờ AI viết thêm câu bảo đảm hồ sơ được bảo mật",
        ],
        "Cam kết về thời gian lưu hồ sơ là chuyện của công ty, không phải của AI. Đổi số vẫn là bạn tự bịa một cam kết. Hồ sơ ứng viên liên quan quy định bảo vệ dữ liệu, nên chưa rõ thì hỏi bộ phận pháp chế trước khi đưa vào thư."
      ),
      q(
        "Bạn cần gửi 40 thư. Soạn tay từng thư mất 8 phút, dùng mẫu rồi sửa riêng mất 3 phút mỗi thư và 20 phút dựng mẫu. Dùng mẫu tiết kiệm bao nhiêu?",
        [
          "180 phút (= 40 × 8 − (20 + 40 × 3) = 320 − 140)",
          "200 phút (= 320 − 120, quên 20 phút dựng mẫu)",
          "80 phút (= 40 × (8 − 3) ÷ 2.5, chia sai cho số thư)",
          "140 phút (= 20 + 40 × 3, là thời gian dùng mẫu, không phải phần tiết kiệm)",
        ],
        "Soạn tay: 40 × 8 = 320 phút. Dùng mẫu: 20 + 40 × 3 = 140 phút. Chênh lệch là 320 − 140 = 180 phút. Quên 20 phút dựng mẫu cho ra 200, còn 140 là thời gian dùng mẫu chứ không phải phần đã tiết kiệm. Đây là số minh hoạ, thời gian thật của bạn sẽ khác."
      ),
      q(
        "Vì sao vẫn phải sửa riêng từng thư dù đã có mẫu tốt?",
        [
          "Để thêm một chi tiết thật của buổi trao đổi, và bắt lỗi điền tên hoặc giờ",
          "Vì mẫu do AI viết luôn có nhiều lỗi chính tả nên phải sửa lại cả bức thư từ đầu",
          "Vì luật quy định mỗi thư gửi ứng viên phải có nội dung không trùng nhau",
          "Vì ứng viên sẽ so sánh thư với nhau và chê nếu chữ giống hệt",
        ],
        "Bước sửa riêng cho thấy bạn có đọc hồ sơ và bắt được lỗi ở chỗ điền. Mẫu do AI viết không luôn có lỗi chính tả, chuyện thư phải khác nhau theo luật là điều bạn không được tự khẳng định, và ứng viên hiếm khi có dịp so sánh thư của nhau."
      ),
    ],
    keyTakeaways: [
      "Hai loại thư, hai mẫu: thư mời cần đủ ngày giờ, địa điểm, người gặp; thư từ chối cần lời cảm ơn và kết quả nêu rõ.",
      "Tên, giờ, địa điểm lấy từ bảng theo dõi, không để AI tự điền.",
      "Không nêu so sánh với ứng viên khác và không hứa điều công ty chưa quyết, như lưu hồ sơ hay liên hệ lại.",
      "Gửi thử vài thư cho chính mình, đối chiếu với bảng rồi mới gửi loạt.",
    ],
    practicePrompt: {
      question:
        "Anh Tuấn nhờ AI viết thư từ chối, AI thêm câu 'bạn chưa đủ giỏi so với các ứng viên khác'. Anh nên làm gì?",
      options: [
        "Xoá câu so sánh, giữ lời cảm ơn và kết quả nêu rõ",
        "Giữ vì ứng viên cần biết lý do để cải thiện ở lần phỏng vấn sau",
        "Đổi thành 'bạn kém hơn một chút so với người trúng tuyển' cho nhẹ",
        "Gửi nguyên văn để công ty thể hiện sự minh bạch tuyệt đối",
      ],
      correct: 0,
      explanation:
        "So sánh với ứng viên khác dễ gây tổn thương và có thể gây rắc rối cho công ty. Đổi giọng nhẹ hơn vẫn là so sánh. Muốn nêu lý do cụ thể thì hỏi bộ phận pháp chế hoặc trưởng phòng nhân sự trước, không để AI tự quyết.",
    },
    summary: {
      keyIdea: "Hai mẫu thư tử tế, dữ liệu lấy từ bảng, một bước sửa riêng và gửi thử.",
      formula: "Mẫu thư mời + mẫu thư từ chối + chỗ trống từ bảng + sửa riêng = 30 thư đúng và tử tế.",
      commonMistake: "Để AI tự điền giờ, địa điểm hoặc viết lý do từ chối, rồi gửi mà không đối chiếu.",
      action: "Dựng hai mẫu thư cho đợt tuyển tiếp theo và lưu lại để dùng lần sau.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một đợt tuyển hoặc một lời mời họp có nhiều người nhận. Nhờ AI dựng một mẫu thư mời có chỗ trống {ten}, {ngay_gio}, {dia_diem} và một mẫu thư từ chối lịch sự dưới 90 chữ. Điền thử cho 2 người thật từ bảng của bạn và đối chiếu từng giờ, từng địa điểm. Ngày mai bạn sẽ được hỏi mẫu nào đã dùng thử.",
      secondary: "Ghi lại câu AI hay thêm mà công ty chưa quyết, như hứa lưu hồ sơ hoặc hứa liên hệ lại.",
    },
    sections: [
      {
        type: "lead",
        text: "Sáng thứ Ba, danh sách sau vòng lọc hồ sơ đã có: 15 người được mời, 15 người không. Thư nào cũng phải rõ ràng và tử tế, và bạn có một buổi sáng. Bài này dạy cách dựng mẫu để nhanh mà không lẫn.",
      },
      {
        type: "feynman",
        title: "Thư mời và thư từ chối đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới hai loại phong bì in sẵn ở quầy lễ tân: một loại mời, một loại cảm ơn. Chữ chung đã in đẹp sẵn, còn tên người nhận và ngày giờ viết tay vào chỗ trống. AI giúp bạn viết hai phong bì đó cho hay, còn tên và giờ vẫn lấy từ bảng của bạn.",
        columns: ["Thành phần", "Phong bì in sẵn", "Mẫu thư ứng viên"],
        rows: [
          ["Phần in một lần", "Lời mời, địa chỉ chung", "Lời chào, lời cảm ơn, cách xác nhận"],
          ["Chỗ trống", "Tên và giờ viết tay", "Tên, ngày giờ, địa điểm từ bảng"],
          ["Ai lo cho đẹp", "Người thiết kế", "AI viết và đổi cách nói"],
          ["Kiểm tra", "Đọc lại tên trên phong bì", "Gửi thử cho mình, đối chiếu với bảng"],
        ],
        oneLiner: "Hai mẫu cho hai loại thư, chỗ trống lấy từ bảng - AI giúp phần chữ, không đụng phần số.",
      },
      { type: "heading", text: "Vấn đề: 30 thư là 30 cơ hội nhầm" },
      {
        type: "paragraph",
        text: "Mỗi thư mời có ít nhất ba chỗ dễ nhầm: tên, giờ và địa điểm. Mỗi thư từ chối có một chỗ khó hơn: giọng. Một câu như 'bạn chưa phù hợp' nghe nhẹ với người viết nhưng có thể làm người đọc buồn cả ngày. Có mẫu tốt thì bạn tập trung vào phần này, thay vì gõ lại từng câu.",
      },
      {
        type: "chart",
        title: "Soạn tay hay dùng mẫu: mất bao nhiêu giờ",
        caption:
          "Số liệu minh hoạ, không phải số đo thật: hãy kéo thanh trượt cho khớp với thời gian của bạn. Dùng mẫu tốn thời gian dựng mẫu một lần, rồi mỗi thư tốn thêm thời gian sửa riêng.",
        kind: "line",
        xLabel: "Số thư cần gửi",
        yLabel: "Giờ",
        x: { from: 5, to: 60, step: 5 },
        params: [
          { id: "hand", label: "Phút soạn tay mỗi thư", min: 2, max: 15, step: 1, value: 8, unit: "phút" },
          { id: "edit", label: "Phút sửa riêng mỗi thư khi có mẫu", min: 1, max: 8, step: 1, value: 3, unit: "phút" },
          { id: "base", label: "Phút dựng mẫu một lần", min: 5, max: 60, step: 5, value: 20, unit: "phút" },
        ],
        series: [
          { label: "Soạn tay từng thư (giờ)", expr: "x * hand / 60" },
          { label: "Dùng mẫu rồi sửa riêng (giờ)", expr: "(base + x * edit) / 60" },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Dựng mẫu thư từ chối lịch sự",
        task: "Sau vòng lọc hồ sơ, 15 ứng viên không được mời tiếp. Lắp prompt để AI dựng một mẫu thư từ chối có chỗ trống, không hứa điều công ty chưa quyết.",
        parts: [
          {
            id: "tone",
            label: "Giọng và nội dung chính",
            options: [
              { text: "Viết thư từ chối lịch sự và chuyên nghiệp.", feedback: "Hai tính từ này ai đọc cũng hiểu khác nhau. AI ra một bức thư chung chung, có thể dài và nhiều lời sáo." },
              { text: "Viết thư từ chối dưới 90 chữ: cảm ơn đã ứng tuyển, nêu rõ kết quả ngay đoạn đầu, chúc thành công. Xưng 'công ty' và gọi 'bạn'.", good: true, feedback: "Có độ dài, thứ tự nội dung và cách xưng hô: AI viết đúng khuôn và ứng viên biết kết quả ngay." },
            ],
          },
          {
            id: "blank",
            label: "Chỗ thay đổi",
            options: [
              { text: "Ứng viên tên Ngọc Anh, ứng tuyển vị trí kế toán, phỏng vấn ngày 12.", feedback: "Đưa dữ liệu thật vào mẫu thì mẫu chỉ dùng được cho một người và giờ, tên đi qua AI." },
              { text: "Dùng {ten} và {vi_tri} ở chỗ thay đổi; không tự điền giá trị nào.", good: true, feedback: "Chỗ trống rõ, bạn điền từ bảng theo dõi và AI không có cơ hội đổi tên hoặc vị trí." },
            ],
          },
          {
            id: "limit",
            label: "Giới hạn",
            options: [
              { text: "Viết thật ấm áp và để lại cơ hội cho các lần sau.", feedback: "AI hiểu là phải hứa gì đó: 'chúng tôi sẽ lưu hồ sơ và liên hệ khi có vị trí phù hợp', trong khi công ty chưa có quy định như vậy." },
              { text: "Không nêu lý do so sánh với người khác, không hứa lưu hồ sơ hay liên hệ lại, không chê năng lực.", good: true, feedback: "Phạm vi rõ: AI không tự cam kết thay công ty và không viết câu làm tổn thương." },
            ],
          },
        ],
        responses: [
          {
            requires: ["tone", "blank", "limit"],
            text: "Chào {ten},\n\nCảm ơn bạn đã ứng tuyển vị trí {vi_tri} tại công ty. Sau khi xem xét, chúng tôi chưa thể mời bạn vào vòng tiếp theo trong đợt này.\n\nCảm ơn bạn đã dành thời gian, và chúc bạn sớm tìm được công việc như ý.",
          },
          {
            requires: ["tone", "blank"],
            text: "Chào {ten},\n\nCảm ơn bạn đã ứng tuyển vị trí {vi_tri}. Rất tiếc lần này chưa phù hợp. Hồ sơ của bạn sẽ được lưu trong 1 năm và chúng tôi sẽ liên hệ khi có vị trí mới...\n\n(Giọng đúng, chỗ trống đúng, nhưng AI tự hứa lưu hồ sơ 1 năm mà công ty chưa hề quy định.)",
          },
          {
            text: "Kính gửi ứng viên Ngọc Anh,\n\nChúng tôi rất tiếc phải thông báo rằng năng lực của bạn chưa đạt yêu cầu so với các ứng viên khác vào vị trí kế toán và rất mong bạn thông cảm...\n\n(Dữ liệu thật dính vào mẫu, giọng sáo rỗng, và câu so sánh làm tổn thương người đọc.)",
          },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Hai mẫu thư và sửa riêng từng thư",
          text: "Phần chung ổn định, giờ và địa điểm lấy từ bảng. Sửa mẫu một lần thì cả loạt đổi theo. Bạn có thời gian thêm một câu thật cho những ứng viên đã trao đổi lâu với bạn.",
        },
        right: {
          label: "Nhờ AI viết riêng từng thư rồi gửi ngay",
          text: "Giờ và tên đi qua đoạn AI đoán chữ nên dễ lẫn dòng. Mỗi thư là một văn bản cần đọc lại. Giọng mỗi thư một chút, và AI có thể tự hứa điều công ty chưa quyết.",
        },
      },
      {
        type: "callout",
        label: "Lý do từ chối cụ thể là chuyện nhạy cảm",
        text: "Nếu ứng viên hỏi vì sao bị loại, đừng để AI soạn câu trả lời rồi gửi luôn. Lý do liên quan tới công bằng trong tuyển dụng và có thể dẫn tới tranh chấp. Hãy hỏi trưởng phòng nhân sự hoặc bộ phận pháp chế trước khi trả lời chi tiết.",
      },
      {
        type: "scenario",
        title: "Buổi sáng gửi 30 thư ứng viên",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn có bảng 30 ứng viên chia hai nhóm và hai mẫu thư AI dựng sẵn. Trưởng phòng muốn thư đi trước 11 giờ.",
            choices: [
              { label: "Ghép dữ liệu từ bảng vào chỗ trống của từng mẫu", next: "s2" },
              { label: "Dán cả bảng cho AI và bảo viết luôn 30 thư có giờ và địa điểm", next: "bad_ai" },
            ],
          },
          bad_ai: {
            text: "Thư ra rất trơn tru, nhưng ở dòng 12 AI lấy giờ của ứng viên kế bên. Một ứng viên đến sớm hai tiếng và một ứng viên khác đến trễ mất buổi phỏng vấn.",
            ending: "bad",
          },
          s2: {
            text: "30 thư đã ghép xong. Còn 40 phút.",
            choices: [
              { label: "Gửi thử 3 thư cho chính bạn, đối chiếu tên, giờ, địa điểm với bảng", next: "s3" },
              { label: "Gửi luôn vì dữ liệu lấy thẳng từ bảng nên không thể sai", next: "bad_send" },
            ],
          },
          bad_send: {
            text: "Cột địa điểm trong bảng bị lệch một dòng từ tuần trước. Sáu ứng viên nhận thư ghi nhầm phòng họp và phải gọi lại hỏi.",
            ending: "bad",
          },
          s3: {
            text: "Ở thư thứ hai bạn thấy phòng họp không khớp với bảng gốc. Cột địa điểm bị lệch một dòng.",
            choices: [
              { label: "Sửa cột trong bảng, ghép lại, gửi thử rồi gửi loạt", next: "good" },
              { label: "Gửi loạt trước rồi nhắn đính chính cho các ứng viên bị sai", next: "bad_late" },
            ],
          },
          bad_late: {
            text: "Sáu ứng viên đã nhận thư sai và phải đọc thêm thư đính chính. Ấn tượng về sự cẩn thận của công ty giảm.",
            ending: "bad",
          },
          good: {
            text: "Bạn gửi loạt lúc 10 giờ 45. Không ứng viên nào phải hỏi lại và hai mẫu thư được lưu cho đợt sau.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Chia hai nhóm: được mời và không được mời.",
          "Bước 2 - Nhờ AI dựng mẫu có chỗ trống cho mỗi nhóm, cấm tự điền và cấm hứa điều công ty chưa quyết.",
          "Bước 3 - Điền tên, giờ, địa điểm từ bảng theo dõi.",
          "Bước 4 - Gửi thử vài thư cho chính mình, đối chiếu rồi mới gửi loạt.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Mẫu do AI giúp, dữ liệu do bảng của bạn, cam kết do công ty quyết.",
          "Bài sau: chuẩn bị hỏi chuyên viên pháp lý về hợp đồng thử việc.",
        ],
      },
    ],
  },
  // ---------------------------------------------------------------- 2012
  {
    id: 2012,
    slug: "hoi-nguoi-gioi-luat-ve-hop-dong-thu-viec",
    title: "Chặng 30, Bài 13: Chuẩn bị hỏi chuyên viên pháp lý về hợp đồng thử việc",
    subtitle: "Bạn không giải thích điều khoản. Bạn chuẩn bị câu hỏi rõ để người có chuyên môn trả lời nhanh.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "📑",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Nhân viên mới hỏi 'thử việc bao lâu, lương thử việc ra sao, nghỉ ngang thì thế nào', và bạn rất muốn trả lời ngay. Nhưng điều khoản hợp đồng là chuyện của người có chuyên môn: bạn giải thích sai một chữ có thể thành cam kết của công ty. Việc của bạn là chuẩn bị tốt để người đó trả lời đúng và nhanh.",
    openingQuestion:
      "Một ứng viên sắp ký hợp đồng thử việc hỏi bạn: 'Nếu tôi nghỉ giữa chừng thì có bị phạt không?' Bạn không rõ điều khoản. Bạn làm gì?",
    openingOptions: [
      "Ghi lại câu hỏi, gửi kèm điều khoản liên quan cho chuyên viên pháp lý",
      "Hỏi AI rồi trả lời ứng viên bằng đúng câu AI viết",
      "Trả lời theo trí nhớ về một hợp đồng cũ bạn từng thấy ở công ty",
      "Bảo ứng viên cứ ký trước rồi hỏi sau vì thử việc thì ít rủi ro cho cả hai bên",
    ],
    correctOption: 0,
    explanation:
      "Điều khoản hợp đồng và nghĩa vụ khi nghỉ là chuyện pháp lý, người có chuyên môn mới được giải thích. Việc hợp lý là ghi câu hỏi, đính kèm đúng điều khoản và chuyển đi. Câu trả lời của AI nghe chắc chắn nhưng có thể sai hoặc lỗi thời, và bạn không kiểm được. Nhớ theo hợp đồng cũ thì mẫu có thể đã đổi. Bảo ứng viên cứ ký là đẩy rủi ro sang họ.",
    diagram: [
      { label: "Ứng viên hỏi về một điều khoản", arrow: true },
      { label: "Bạn ghi câu hỏi và tìm đúng đoạn hợp đồng liên quan", arrow: true },
      { label: "AI giúp sắp xếp câu hỏi và tóm tắt, không giải thích luật", arrow: true },
      { label: "Chuyên viên pháp lý trả lời, bạn truyền đạt lại nguyên văn" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một chuyên viên nhân sự nhận câu hỏi của ứng viên về thời gian báo trước khi nghỉ trong hợp đồng thử việc. Thay vì tự trả lời, chị gửi cho bộ phận pháp chế một trang gồm: câu hỏi nguyên văn, đoạn hợp đồng liên quan và ba điều chị chưa chắc. Bộ phận pháp chế trả lời trong buổi chiều.",
    },
    quiz: [
      q(
        "Vì sao bạn không nên nhờ AI giải thích điều khoản hợp đồng thử việc rồi trả lời ứng viên?",
        [
          "Vì giải thích sai có thể thành cam kết của công ty, và bạn không kiểm được",
          "Vì AI không đọc được chữ trong hợp đồng dưới dạng văn bản có dấu",
          "Vì hợp đồng thử việc luôn giống hệt nhau nên không cần ai giải thích",
          "Vì AI chỉ trả lời được khi câu hỏi có sẵn trong bộ nhớ của nó",
        ],
        "AI trả lời nghe chắc chắn nhưng có thể sai hoặc không theo mẫu của công ty. Lời giải thích của nhân sự có thể bị coi là lời của công ty. AI đọc được văn bản, hợp đồng mỗi công ty một khác, và cách AI hoạt động không dựa trên câu hỏi có sẵn."
      ),
      q(
        "Bản chuẩn bị gửi chuyên viên pháp lý nên gồm những gì?",
        [
          "Câu hỏi nguyên văn, đoạn hợp đồng liên quan, điều bạn chưa chắc",
          "Câu trả lời bạn nghĩ là đúng, để chuyên viên chỉ cần gật đầu",
          "Toàn bộ hồ sơ cá nhân của ứng viên, kể cả giấy tờ tuỳ thân, cho đầy đủ",
          "Bản tóm tắt pháp luật lao động do AI viết để chuyên viên tham khảo",
        ],
        "Người có chuyên môn cần câu hỏi rõ và đúng đoạn văn bản để trả lời nhanh. Đưa sẵn đáp án của bạn dễ làm họ trả lời theo hướng đó, hồ sơ cá nhân đầy đủ là thông tin thừa, và tóm tắt luật do AI viết có thể sai mà họ phải mất công kiểm."
      ),
      q(
        "AI tóm tắt điều khoản mẫu có câu 'theo luật, thử việc tối đa 60 ngày cho mọi vị trí'. Văn bản không có câu này. Nên làm gì?",
        [
          "Xoá câu đó vì không có trong văn bản",
          "Giữ vì AI thường biết luật chính xác hơn người thường",
          "Giữ nhưng thêm chữ 'theo AI' để người đọc biết nguồn",
          "Kiểm tra trên mạng rồi thêm số điều luật vào bản tóm tắt",
        ],
        "Bản tóm tắt chỉ được chứa điều có trong văn bản. Quy định pháp luật phải do người có chuyên môn xác nhận. Ghi 'theo AI' không làm câu đó đúng hơn, và tự tra rồi thêm số điều luật là bạn tự làm việc của chuyên viên pháp lý."
      ),
      q(
        "Ứng viên nhắn 'chắc thử việc thì công ty không trừ lương phạt gì đâu nhỉ?'. Cách trả lời hợp lý nhất là gì?",
        [
          "Nói bạn chưa chắc về điều khoản này, sẽ hỏi bộ phận chuyên môn và trả lời trong ngày mai",
          "Xác nhận là không có, vì thử việc thì công ty nào cũng dễ dãi hơn nhiều so với hợp đồng chính thức",
          "Nhờ AI soạn một câu trả lời thật chắc chắn để ứng viên yên tâm",
          "Không trả lời vì câu hỏi chưa phải chuyện của công ty lúc này",
        ],
        "Nói rõ là chưa chắc và có hẹn ngày trả lời giúp ứng viên yên tâm mà công ty không cam kết điều gì. Xác nhận theo cảm giác có thể thành lời hứa sai, câu trả lời chắc chắn của AI thì thiếu căn cứ, còn im lặng làm mất thiện cảm."
      ),
      q(
        "Trước khi gửi câu hỏi và đoạn hợp đồng cho chuyên viên, bước nào bảo vệ dữ liệu ứng viên tốt nhất?",
        [
          "Bỏ tên, số điện thoại, số giấy tờ khỏi phần dán vào công cụ AI chưa được duyệt",
          "Dán nguyên hợp đồng đã ký của ứng viên vào công cụ AI để nó tóm tắt cho nhanh và đỡ phải đọc lại",
          "Gửi qua ứng dụng chat cá nhân của bạn cho tiện và nhanh nhất",
          "Chụp màn hình toàn bộ hợp đồng gửi cho chuyên viên, không cần che thông tin",
        ],
        "Dữ liệu cá nhân của ứng viên không nên đi vào công cụ chưa được công ty duyệt; bỏ các mục nhận dạng là bước tối thiểu. Hợp đồng đã ký chứa nhiều thông tin nhạy cảm, còn ứng dụng chat cá nhân và ảnh chụp không che thì không có quy trình bảo vệ nào."
      ),
    ],
    keyTakeaways: [
      "Giải thích điều khoản hợp đồng là việc của người có chuyên môn pháp lý, không phải của nhân sự hay AI.",
      "Việc của bạn: ghi câu hỏi nguyên văn, tìm đúng đoạn hợp đồng, nêu điều chưa chắc.",
      "AI được dùng để sắp xếp câu hỏi và tóm tắt điều khoản có trong văn bản, không để giải thích luật.",
      "Chưa chắc thì nói thẳng với ứng viên và hẹn ngày trả lời, không hứa theo cảm giác.",
    ],
    practicePrompt: {
      question:
        "Chị Mai soạn tóm tắt hợp đồng thử việc bằng AI rồi ghi thêm câu 'chế độ này áp dụng theo quy định chung'. Chị nên làm gì với câu đó?",
      options: [
        "Xoá câu đó và ghi thành câu hỏi để chuyên viên pháp lý xác nhận",
        "Giữ vì nó giúp ứng viên yên tâm hơn về quyền lợi",
        "Nhờ AI viết lại cho câu này nghe chính xác hơn về mặt pháp lý và dễ hiểu với ứng viên",
        "Thêm số điều luật cho có căn cứ vì AI thường nhớ đúng",
      ],
      correct: 0,
      explanation:
        "'Theo quy định chung' là khẳng định pháp lý không có trong văn bản. Nó phải được chuyển thành câu hỏi cho chuyên viên. Viết lại cho hay không làm câu đúng hơn, còn số điều luật do AI đưa ra thì bạn không kiểm được.",
    },
    summary: {
      keyIdea: "Với điều khoản hợp đồng, bạn là người chuẩn bị câu hỏi, không phải người giải thích.",
      formula: "Câu hỏi nguyên văn + đoạn hợp đồng liên quan + điều chưa chắc = gói câu hỏi cho chuyên viên pháp lý.",
      commonMistake: "Nhờ AI giải thích điều khoản rồi trả lời ứng viên bằng đúng câu AI viết.",
      action: "Lập sẵn một mẫu gói câu hỏi một trang để lần sau chỉ cần điền.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Nhớ lại ba câu ứng viên hoặc nhân viên mới hay hỏi về hợp đồng, lương thử việc hoặc nghỉ phép. Với mỗi câu, viết một dòng: câu hỏi nguyên văn, đoạn tài liệu công ty có liên quan, và điều bạn chưa chắc. Có thể nhờ AI sắp xếp thành một trang, nhưng không nhờ nó trả lời. Ngày mai bạn sẽ được hỏi trang đó đã gửi ai.",
      secondary: "Ghi lại câu nào bạn từng định trả lời theo trí nhớ, để lần sau chuyển đi.",
    },
    sections: [
      {
        type: "lead",
        text: "Ứng viên sắp ký hợp đồng thử việc và hỏi bạn một câu rất cụ thể về điều khoản. Bạn muốn giúp ngay, nhưng đây là chuyện của người có chuyên môn. Bài này dạy cách chuẩn bị để chuyên viên pháp lý trả lời nhanh và đúng.",
      },
      {
        type: "feynman",
        title: "Hỏi người có chuyên môn đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới lúc bạn mang xe đi sửa. Bạn không tự tháo máy, nhưng nói rõ xe kêu ở đâu, kêu khi nào, và mang đúng chiếc xe tới. Thợ nhìn là biết. Với hợp đồng cũng vậy: bạn không giải thích điều khoản, bạn mang đúng câu hỏi và đúng đoạn văn bản tới người chuyên môn.",
        columns: ["Việc", "Mang xe đi sửa", "Hỏi chuyên viên pháp lý"],
        rows: [
          ["Bạn mô tả", "Tiếng kêu, lúc nào, ở đâu", "Câu hỏi nguyên văn của ứng viên"],
          ["Bạn mang theo", "Chiếc xe", "Đoạn hợp đồng liên quan"],
          ["Bạn nói rõ", "Những gì bạn chưa biết", "Những điều bạn chưa chắc"],
          ["Ai chẩn đoán", "Thợ sửa xe", "Chuyên viên pháp lý"],
        ],
        oneLiner: "Bạn mang đúng câu hỏi và đúng đoạn văn bản tới người có chuyên môn, không tự chẩn đoán.",
      },
      { type: "heading", text: "Vấn đề: câu trả lời nghe chắc chắn nhưng không có căn cứ" },
      {
        type: "paragraph",
        text: "Khi ứng viên hỏi, bạn có thể hỏi AI hoặc nhớ lại một hợp đồng cũ. Cả hai đều cho ra câu trả lời nghe rất chắc. Nhưng hợp đồng mỗi công ty một khác và quy định có thể đã đổi. Nhân sự nói ra thì ứng viên hiểu đó là lời của công ty, nên câu sai không dễ rút lại.",
      },
      {
        type: "flow",
        title: "Từ câu hỏi của ứng viên tới câu trả lời đúng",
        steps: [
          { label: "Ghi nguyên văn câu hỏi", detail: "Chép đúng chữ của ứng viên, không diễn đạt lại theo ý bạn, vì diễn đạt lại có thể làm đổi nghĩa." },
          { label: "Tìm đúng đoạn hợp đồng liên quan", detail: "Đánh dấu điều khoản nói về vấn đề đó. Nếu ứng viên hỏi về nghỉ ngang thì tìm điều khoản chấm dứt và thời gian báo trước." },
          { label: "Nhờ AI sắp xếp thành gói một trang", detail: "AI có thể sắp câu hỏi theo thứ tự và tóm tắt điều khoản có trong văn bản. Không nhờ nó giải thích luật." },
          { label: "Gửi cho chuyên viên và chờ trả lời", detail: "Gửi qua kênh công ty cho phép, đã bỏ thông tin nhận dạng thừa. Hẹn ngày với ứng viên rằng bạn sẽ có câu trả lời." },
          { label: "Truyền đạt lại nguyên văn", detail: "Chuyển lại đúng điều chuyên viên trả lời, không diễn giải thêm cho dễ hiểu nếu chưa hỏi lại họ." },
        ],
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát bản tóm tắt điều khoản do AI viết",
        task: "Văn bản mẫu (số liệu minh hoạ): thử việc 60 ngày; lương thử việc bằng 85% lương chính thức; hai bên báo trước 3 ngày khi chấm dứt thử việc. Đánh dấu những câu AI tự thêm.",
        segments: [
          { text: "Thời gian thử việc theo mẫu là 60 ngày." },
          { text: "Lương thử việc bằng 85% mức lương chính thức." },
          { text: "Theo luật, mọi vị trí đều được thử việc tối đa 60 ngày.", error: "Văn bản chỉ nói 60 ngày cho mẫu này. Câu về luật là AI tự thêm, và đúng hay sai theo luật là việc của chuyên viên pháp lý." },
          { text: "Hai bên báo trước 3 ngày khi chấm dứt thử việc." },
          { text: "Nếu nghỉ ngang, ứng viên chắc chắn không phải bồi thường gì.", error: "Văn bản không nói về bồi thường. Đây là AI khẳng định thay công ty, và nếu sai thì thành lời hứa của nhân sự." },
          { text: "Ứng viên nên hỏi bộ phận pháp chế nếu có thắc mắc về điều khoản." },
        ],
      },
      {
        type: "callout",
        label: "Nói rõ giới hạn của bạn",
        text: "Câu 'tôi chưa chắc điều này, tôi hỏi bộ phận chuyên môn và trả lời bạn vào ngày mai' nghe không hay nhưng đó là câu an toàn nhất. Ứng viên yên tâm vì có hẹn, công ty không phải cam kết điều gì. Câu trả lời sai mới là thứ mất nhiều thời gian nhất để gỡ.",
      },
      {
        type: "comparison",
        left: {
          label: "Chuẩn bị gói câu hỏi rồi chuyển đi",
          text: "Chuyên viên có sẵn câu hỏi và đoạn văn bản nên trả lời trong một lần. Câu trả lời có căn cứ và có người chịu trách nhiệm. Ứng viên nhận được điều đúng và biết bạn có xử lý.",
        },
        right: {
          label: "Tự trả lời theo AI hoặc trí nhớ",
          text: "Nhanh trong một phút nhưng câu trả lời nghe chắc mà không có căn cứ. Nếu sai, ứng viên đã hành động theo lời bạn và công ty phải xử lý hậu quả. Không ai chịu trách nhiệm cho câu trả lời đó.",
        },
      },
      {
        type: "scenario",
        title: "Ứng viên hỏi về nghỉ ngang khi thử việc",
        start: "s1",
        nodes: {
          s1: {
            text: "Thứ Sáu, ứng viên nhắn: 'Nếu tôi nghỉ giữa thời gian thử việc thì có bị phạt không?' Bạn chưa đọc kỹ điều khoản này.",
            choices: [
              { label: "Nhờ AI trả lời rồi gửi đúng câu đó cho ứng viên", next: "bad_ai" },
              { label: "Ghi lại câu hỏi và tìm đoạn hợp đồng về chấm dứt thử việc", next: "s2" },
            ],
          },
          bad_ai: {
            text: "AI trả lời 'không bị phạt gì cả'. Ứng viên nghỉ sau hai tuần, và công ty sau đó viện dẫn một điều khoản khác. Ứng viên nói chính nhân sự đã bảo là không sao.",
            ending: "bad",
          },
          s2: {
            text: "Bạn có câu hỏi và đoạn hợp đồng. Bạn cần gửi cho chuyên viên pháp lý.",
            choices: [
              { label: "Gửi gói câu hỏi kèm điều chưa chắc, đã bỏ thông tin cá nhân thừa", next: "s3" },
              { label: "Dán nguyên hợp đồng đã ký, có đủ tên và số giấy tờ, vào công cụ AI để tóm tắt", next: "bad_data" },
            ],
          },
          bad_data: {
            text: "Công cụ AI chưa được công ty duyệt và hợp đồng chứa thông tin cá nhân của ứng viên. Bộ phận bảo mật hỏi lại vì sao dữ liệu ra ngoài.",
            ending: "bad",
          },
          s3: {
            text: "Chuyên viên pháp lý trả lời trong buổi chiều. Bạn cần nhắn lại cho ứng viên.",
            choices: [
              { label: "Chuyển lại nguyên văn câu trả lời và ghi rõ đó là ý kiến của bộ phận pháp chế", next: "good" },
              { label: "Diễn giải lại bằng lời của bạn cho ứng viên dễ hiểu hơn", next: "bad_paraphrase" },
            ],
          },
          bad_paraphrase: {
            text: "Bạn bỏ mất một điều kiện trong câu trả lời gốc. Ứng viên hiểu rộng hơn thực tế và về sau phát sinh tranh cãi.",
            ending: "bad",
          },
          good: {
            text: "Ứng viên nhận câu trả lời đúng và biết nó đến từ bộ phận pháp chế. Bạn lưu gói câu hỏi làm mẫu cho lần sau.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Ghi nguyên văn câu hỏi, tìm đoạn hợp đồng liên quan.",
          "Bước 2 - Bỏ thông tin nhận dạng thừa trước khi đưa vào bất kỳ công cụ AI nào.",
          "Bước 3 - Nhờ AI sắp xếp câu hỏi, không nhờ nó giải thích luật.",
          "Bước 4 - Gửi chuyên viên, rồi chuyển lại nguyên văn câu trả lời.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Bạn chuẩn bị câu hỏi thật rõ, người có chuyên môn mới là người trả lời.",
          "Bài sau: soạn thư chào mừng và lịch tuần đầu cho nhân viên mới.",
        ],
      },
    ],
  },
  // ---------------------------------------------------------------- 2013
  {
    id: 2013,
    slug: "soan-thu-chao-mung-va-lich-tuan-dau",
    title: "Chặng 30, Bài 14: Soạn thư chào mừng và lịch tuần đầu cho nhân viên mới",
    subtitle: "Người mới vào thứ Hai chưa biết gì: thư và lịch phải rõ giờ, rõ người gặp.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "👋",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Ngày đầu tiên quyết định cảm giác của người mới về công ty. Nếu họ đến mà không biết gặp ai, để xe ở đâu, mặc gì, họ bối rối ngay từ giờ đầu. Một thư chào mừng và lịch tuần đầu rõ ràng cho người mới đỡ lo, và cho người quản lý đỡ bị hỏi lặp lại cả tuần.",
    openingQuestion:
      "Chiều thứ Sáu, bạn biết người mới sẽ vào làm sáng thứ Hai. Thứ gì cần có trong thư chào mừng trước tiên?",
    openingOptions: [
      "Giờ đến, địa điểm, người đón và việc đầu tiên trong buổi sáng",
      "Lịch sử hình thành công ty và tầm nhìn của ban giám đốc",
      "Danh sách toàn bộ quy định nội bộ để người mới đọc kỹ trước ngày đầu tiên",
      "Mục tiêu công việc của cả năm để người mới thấy áp lực",
    ],
    correctOption: 0,
    explanation:
      "Người mới cần biết ngay những điều thực tế nhất: khi nào đến, đến đâu, gặp ai, làm gì đầu tiên. Lịch sử công ty có thể để dịp khác, và nó không giúp họ đến đúng chỗ. Danh sách quy định nội bộ dài dễ khiến họ không đọc gì cả. Mục tiêu cả năm gây áp lực khi họ còn chưa biết chỗ ngồi.",
    diagram: [
      { label: "Xác nhận ngày giờ, người đón, chỗ ngồi, tài khoản", arrow: true },
      { label: "AI dựng thư chào mừng và lịch tuần đầu từ thông tin bạn đưa", arrow: true },
      { label: "Đối chiếu giờ, tên, phòng với lịch thật của mọi người", arrow: true },
      { label: "Gửi cho người mới và người quản lý trước ngày đầu" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một chuyên viên nhân sự dựng lịch tuần đầu bằng AI cho nhân viên mới vào thứ Hai. Trước khi gửi, chị nhận ra AI xếp buổi làm quen với trưởng phòng vào giờ trưởng phòng đang họp cố định hằng tuần. Nhờ đối chiếu với lịch thật, chị dời buổi đó sang chiều.",
    },
    quiz: [
      q(
        "Thư chào mừng cho người mới cần có điều gì đầu tiên?",
        [
          "Giờ đến, nơi đến, người đón và việc buổi sáng",
          "Lời chào thật dài, giới thiệu kỹ từng thành viên trong công ty ngay ở đầu thư",
          "Toàn bộ nội quy và quy trình để người mới đọc trước ngày đầu",
          "Bảng mục tiêu ba tháng đầu để họ chuẩn bị sớm cho công việc",
        ],
        "Những điều thực tế giúp người mới đến đúng nơi, đúng giờ và không bối rối. Giới thiệu mọi người, nội quy và mục tiêu đều cần nhưng có thể đến sau, vì gộp hết vào thư đầu thì họ không đọc kỹ."
      ),
      q(
        "AI xếp lịch tuần đầu, có buổi 'làm quen với trưởng phòng' lúc 9 giờ thứ Ba. Trưởng phòng họp cố định lúc đó. Nên làm gì?",
        [
          "Đối chiếu với lịch thật của trưởng phòng và dời buổi làm quen sang giờ trống",
          "Giữ nguyên vì AI đã tính giờ hợp lý cho một tuần đầu tiên",
          "Nhờ AI kiểm tra lại xem lịch tuần đầu có trùng giờ họp của trưởng phòng hay không",
          "Bỏ buổi làm quen với trưởng phòng để người mới đỡ áp lực",
        ],
        "AI không nhìn thấy lịch thật của trưởng phòng nên không biết giờ đó bận. Chỉ bạn hoặc trưởng phòng mới xác nhận được. Nhờ AI kiểm tra thì nó cũng không có lịch để so, và bỏ buổi làm quen làm mất một việc quan trọng của tuần đầu."
      ),
      q(
        "Vì sao lịch tuần đầu nên có tên người phụ trách từng buổi?",
        [
          "Người mới biết hỏi ai, và người phụ trách biết mình có việc",
          "Để lịch trông dài hơn và chuyên nghiệp hơn",
          "Vì AI không viết được lịch nếu thiếu tên riêng của người",
          "Để người mới có thể đánh giá từng người ngay từ tuần đầu",
        ],
        "Tên người phụ trách giúp cả hai phía: người mới biết hỏi ai, và người phụ trách nhớ họ có một buổi. Lịch không cần dài hơn, AI viết lịch được không cần tên riêng, và tuần đầu không phải lúc người mới đánh giá ai."
      ),
      q(
        "Tuần đầu có 5 ngày, mỗi ngày 4 buổi, và bạn muốn chừa 1 buổi mỗi ngày để người mới tự làm quen. Có bao nhiêu buổi được xếp cho người phụ trách?",
        [
          "15 buổi (= 5 × (4 − 1))",
          "20 buổi (= 5 × 4, quên chừa buổi tự làm quen)",
          "16 buổi (= 5 × 4 − 4, chỉ chừa 4 buổi thay vì 5 buổi)",
          "10 buổi (= 5 × 4 ÷ 2, chia đôi thay vì trừ mỗi ngày một buổi)",
        ],
        "Mỗi ngày còn 4 − 1 = 3 buổi có người phụ trách, 5 ngày thành 15 buổi. Quên chừa thì ra 20, chỉ chừa 4 buổi thì ra 16, và chia đôi thì ra 10. Đây là số minh hoạ, lịch thật của bạn có thể khác."
      ),
      q(
        "Bạn muốn AI dựng lịch tuần đầu đúng với công ty mình. Cách đưa thông tin nào tốt nhất?",
        [
          "Đưa danh sách buổi cố định, người phụ trách và khung giờ trống, nhờ AI sắp xếp",
          "Chỉ ghi 'tuần đầu cho người mới' rồi để AI tự bịa nội dung cho lịch",
          "Đưa lịch tuần đầu của một công ty khác tìm được trên mạng để AI làm theo y như vậy",
          "Đưa cả cẩm nang nhân viên dài mấy chục trang và nhờ AI chọn ý",
        ],
        "Khi bạn đưa dữ kiện thật, AI chỉ sắp xếp còn tên và giờ vẫn đến từ bạn. Yêu cầu quá ngắn thì AI tự thêm buổi và tên người không tồn tại. Lịch của công ty khác có thể không hợp, và cẩm nang dài làm AI bỏ sót hoặc bịa thêm."
      ),
    ],
    keyTakeaways: [
      "Thư chào mừng ưu tiên điều thực tế: giờ đến, nơi đến, người đón, việc đầu tiên.",
      "Lịch tuần đầu có giờ, nội dung và tên người phụ trách từng buổi, và có buổi trống cho người mới tự làm quen.",
      "AI không biết lịch thật của mọi người, nên giờ và tên phải được bạn đối chiếu.",
      "Không dán dữ liệu cá nhân của người mới vào công cụ AI chưa được công ty duyệt.",
    ],
    practicePrompt: {
      question:
        "Anh Bảo nhờ AI dựng lịch tuần đầu, thấy lịch đẹp nên gửi luôn cho người mới. Bước nào anh bỏ sót?",
      options: [
        "Đối chiếu từng giờ và tên với lịch thật của những người được nhắc",
        "Nhờ AI làm lịch dài hơn để người mới thấy công ty chu đáo và có nhiều việc để làm",
        "Thêm mục tiêu công việc cả năm để người mới biết định hướng",
        "Gửi lịch cho toàn công ty để mọi người cùng biết người mới",
      ],
      correct: 0,
      explanation:
        "Lịch đẹp chưa chắc khớp với lịch thật của người được nhắc tên. Cần đối chiếu. Lịch dài hơn không làm lịch đúng hơn, mục tiêu cả năm gây áp lực, và gửi cho toàn công ty không cần thiết.",
    },
    summary: {
      keyIdea: "Thư chào mừng và lịch tuần đầu rõ giờ, rõ người, do AI giúp dựng và bạn đối chiếu.",
      formula: "Dữ kiện thật (giờ, người, nơi) + AI sắp xếp + đối chiếu lịch thật = tuần đầu không bối rối.",
      commonMistake: "Tin lịch AI xếp vì nó trông đầy đủ, không đối chiếu với lịch thật của người được nhắc tên.",
      action: "Dựng một lịch tuần đầu mẫu và lưu lại để dùng cho mọi người mới.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Hãy chọn một người mới sắp vào (hoặc tưởng tượng một người). Liệt kê các việc cố định của tuần đầu: đón, làm quen, cấp tài khoản, gặp trưởng phòng, học quy trình. Nhờ AI sắp thành lịch 5 ngày có giờ và tên người phụ trách, rồi đối chiếu từng giờ với lịch thật. Ngày mai bạn sẽ được hỏi lịch đó có buổi nào bị trùng không.",
      secondary: "Ghi lại buổi nào AI xếp trùng để lần sau đưa khung giờ bận vào yêu cầu.",
    },
    sections: [
      {
        type: "lead",
        text: "Chiều thứ Sáu, bạn nhận tin người mới vào làm sáng thứ Hai và chưa có gì chuẩn bị. Người mới sẽ đến không biết gặp ai, để đồ ở đâu, làm gì trước. Bài này dạy cách dựng thư chào mừng và lịch tuần đầu nhanh mà đúng.",
      },
      {
        type: "feynman",
        title: "Tuần đầu cho người mới đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới lúc bạn đón một người bạn từ xa đến chơi nhà. Bạn nhắn giờ tới, chỉ đường, nói trước sẽ ăn gì, ngủ ở đâu. Bạn không kể lịch sử gia đình. Người mới vào công ty cũng cần đúng như vậy: điều thực tế trước, chuyện lớn để sau.",
        columns: ["Điều cần", "Đón bạn đến nhà", "Đón người mới vào làm"],
        rows: [
          ["Đến khi nào", "Giờ tàu tới", "Giờ đến và người đón"],
          ["Đi đâu", "Địa chỉ và cách vào cổng", "Toà nhà, tầng, chỗ ngồi"],
          ["Làm gì", "Ăn gì, nghỉ đâu", "Việc đầu tiên trong buổi sáng"],
          ["Hỏi ai", "Số điện thoại chủ nhà", "Tên và cách liên hệ người phụ trách"],
        ],
        oneLiner: "Người mới cần biết khi nào, ở đâu, gặp ai, làm gì đầu tiên - phần còn lại để dần dần.",
      },
      { type: "heading", text: "Vấn đề: lịch đẹp nhưng không khớp đời thực" },
      {
        type: "paragraph",
        text: "AI xếp lịch rất nhanh và trình bày gọn. Nhưng nó không nhìn thấy lịch thật của trưởng phòng, giờ phòng họp đã đặt hay ngày tài khoản mới được cấp. Nếu bạn để nó tự điền thì lịch có thể đẹp mà trùng giờ họp, hoặc nhắc một buổi mà không ai biết.",
      },
      {
        type: "flow",
        title: "Từ thông tin thật đến lịch tuần đầu",
        steps: [
          { label: "Gom dữ kiện thật", detail: "Giờ đến, người đón, các buổi cố định (an toàn lao động, cấp tài khoản), khung giờ trống của người phụ trách." },
          { label: "Nhờ AI dựng thư và lịch", detail: "Yêu cầu dùng {ten}, {gio}, {nguoi_phu_trach}; chỗ chưa biết ghi 'chờ xác nhận', không tự bịa buổi hay tên người." },
          { label: "Đối chiếu với lịch thật", detail: "Mỗi buổi có tên ai thì kiểm với lịch người đó. Buổi nào trùng thì dời sang giờ trống." },
          { label: "Gửi thử cho người quản lý", detail: "Người quản lý đọc trước, xác nhận buổi làm quen, việc đầu tiên và chỗ ngồi." },
          { label: "Gửi cho người mới", detail: "Gửi vào cuối tuần trước, kèm số liên hệ của bạn." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Dựng thư chào mừng người mới",
        task: "Người mới vào làm thứ Hai, chưa biết gì về công ty. Lắp prompt để AI dựng thư chào mừng có chỗ trống, không bịa buổi hay tên người.",
        parts: [
          {
            id: "goal",
            label: "Nội dung thư",
            options: [
              { text: "Viết thư chào mừng thật nhiệt tình và ấn tượng.", feedback: "Nhiệt tình và ấn tượng là cảm giác chung chung. AI viết đoạn dài về văn hoá công ty mà thiếu giờ và nơi đến, chính là điều người mới cần nhất." },
              { text: "Viết thư dưới 120 chữ: lời chào, giờ đến, nơi đến, người đón, việc đầu tiên trong buổi sáng, số liên hệ.", good: true, feedback: "Nội dung thực tế và đủ độ dài: người mới biết ngay đến lúc nào, ở đâu, gặp ai." },
            ],
          },
          {
            id: "blank",
            label: "Chỗ thay đổi",
            options: [
              { text: "Người mới tên Khánh, đến 8 giờ 30, người đón là chị Hoa ở tầng 3.", feedback: "Dữ liệu thật dính vào mẫu nên mẫu chỉ dùng được một lần, và AI có thể đổi giờ hoặc tên khi viết." },
              { text: "Dùng {ten}, {gio_den}, {nguoi_don}, {tang}; chỗ nào tôi chưa cung cấp thì ghi 'chờ xác nhận'.", good: true, feedback: "Chỗ trống rõ, và 'chờ xác nhận' giúp AI không bịa điều bạn chưa biết." },
            ],
          },
          {
            id: "limit",
            label: "Giới hạn",
            options: [
              { text: "Thêm những thông tin hữu ích khác về công ty mà bạn nghĩ người mới cần.", feedback: "AI tự thêm phúc lợi, quy định, giờ ăn trưa mà công ty chưa xác nhận, và người mới tin theo." },
              { text: "Chỉ dùng thông tin tôi đưa; không thêm quy định, phúc lợi hay tên người chưa được cung cấp.", good: true, feedback: "Phạm vi rõ: AI không cam kết thay công ty và không nhắc người không có thật." },
            ],
          },
        ],
        responses: [
          {
            requires: ["goal", "blank", "limit"],
            text: "Chào {ten},\n\nChào mừng bạn đến với công ty. Sáng thứ Hai bạn đến lúc {gio_den}, chị/anh {nguoi_don} sẽ đón bạn ở tầng {tang} và đưa bạn đến chỗ ngồi.\n\nViệc đầu tiên là nhận tài khoản và gặp trưởng phòng (chờ xác nhận giờ). Cần gì bạn nhắn số này nhé.",
          },
          {
            requires: ["goal", "blank"],
            text: "Chào {ten},\n\nChào mừng bạn. Bạn đến lúc {gio_den}, {nguoi_don} sẽ đón. Công ty có bữa trưa miễn phí và gửi xe miễn phí cho nhân viên mới...\n\n(Đúng khuôn, nhưng AI tự thêm hai phúc lợi mà công ty chưa hề xác nhận.)",
          },
          {
            text: "Chào Khánh,\n\nChào mừng bạn đến với công ty đầy nhiệt huyết. Chúng tôi tin bạn sẽ có một hành trình tuyệt vời và ấn tượng...\n\n(Nhiều lời chào, không có giờ, không có nơi đến. Người mới vẫn không biết sáng thứ Hai làm gì.)",
          },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Lịch từ dữ kiện thật, đối chiếu rồi gửi",
          text: "Mỗi buổi có giờ, nội dung, người phụ trách và người đó đã biết. Người mới không phải hỏi lại. Quản lý đỡ bị gián đoạn cả tuần. Lịch dùng lại được cho người sau.",
        },
        right: {
          label: "Để AI tự xếp và gửi luôn",
          text: "Lịch đầy đủ và đẹp nhưng có thể trùng giờ họp hoặc nhắc tên người không có buổi đó. Người mới đến nơi và không ai biết mình được hẹn. Bạn phải giải thích lại.",
        },
      },
      {
        type: "scenario",
        title: "Chiều thứ Sáu, lịch tuần đầu",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn có danh sách các buổi cố định và AI vừa xếp thành lịch 5 ngày. Bạn chỉ còn một tiếng trước khi tan làm.",
            choices: [
              { label: "Gửi luôn cho người mới vì lịch trông đầy đủ và hợp lý", next: "bad_send" },
              { label: "Đối chiếu từng buổi có tên người với lịch thật của người đó", next: "s2" },
            ],
          },
          bad_send: {
            text: "Buổi làm quen thứ Ba trùng với cuộc họp cố định của trưởng phòng. Người mới đến phòng và phải đợi 40 phút, trưởng phòng cũng bất ngờ.",
            ending: "bad",
          },
          s2: {
            text: "Bạn phát hiện buổi thứ Ba trùng giờ họp. Ngoài ra buổi cấp tài khoản chưa có người xác nhận.",
            choices: [
              { label: "Dời buổi làm quen sang chiều và nhắn bộ phận IT xác nhận buổi cấp tài khoản", next: "good" },
              { label: "Xoá buổi cấp tài khoản khỏi lịch để khỏi phải hỏi ai", next: "bad_drop" },
            ],
          },
          bad_drop: {
            text: "Người mới đến làm mà không có tài khoản, không vào được hệ thống, và ngày đầu trôi qua chỉ ngồi đọc tài liệu.",
            ending: "bad",
          },
          good: {
            text: "Lịch đã khớp với lịch thật. Bạn gửi cho người quản lý xem, rồi gửi cho người mới trước cuối tuần.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Gom dữ kiện thật: giờ, người, nơi, các buổi cố định.",
          "Bước 2 - Nhờ AI dựng thư và lịch, có chỗ trống và 'chờ xác nhận'.",
          "Bước 3 - Đối chiếu từng buổi có tên người với lịch thật.",
          "Bước 4 - Cho quản lý xem trước, rồi gửi người mới trước cuối tuần.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Dữ kiện do bạn, dàn trang do AI, giờ giấc do lịch thật xác nhận.",
          "Bài sau: mini project ghép thành gói onboarding dùng cho mọi người mới.",
        ],
      },
    ],
  },
  // ---------------------------------------------------------------- 2014
  {
    id: 2014,
    slug: "mini-project-goi-onboarding-nguoi-moi",
    title: "Chặng 30, Bài 15: Mini project: gói onboarding cho người mới, từ thư đến lịch 30 ngày",
    subtitle: "Ghép thư, danh sách việc theo người phụ trách và lịch 30 ngày thành một gói dùng lại được.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🧳",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Mỗi lần có người mới, nhân sự lại làm lại từ đầu: thư, danh sách, lịch. Việc lặp lại như vậy chính là chỗ AI và mẫu giúp nhiều nhất, miễn là bạn làm một lần cho kỹ và có cách kiểm. Gói onboarding tốt giúp người sau vào việc nhanh hơn và bạn khỏi quên một bước nào.",
    openingQuestion:
      "Công ty tuyển liên tục và mỗi tháng có 3 người mới. Cách nào giúp bạn không phải làm lại thư, danh sách việc và lịch từ đầu mỗi lần?",
    openingOptions: [
      "Làm một gói mẫu có chỗ trống, kiểm kỹ một lần rồi dùng lại cho mọi người",
      "Nhờ AI viết lại toàn bộ từ đầu cho mỗi người mới cho luôn mới mẻ",
      "Copy gói của người trước và sửa tên, không cần đọc lại từng phần",
      "Để mỗi trưởng phòng tự soạn gói riêng cho người của họ",
    ],
    correctOption: 0,
    explanation:
      "Gói mẫu có chỗ trống giữ phần chung ổn định (thư, danh sách việc, mốc 30 ngày) và chỗ trống lấy từ dữ kiện của từng người. Kiểm kỹ một lần rồi dùng lại tiết kiệm thời gian mà không tăng sai sót. Nhờ AI viết lại từ đầu mỗi lần thì phải kiểm lại từ đầu mỗi lần. Copy rồi đổi tên dễ để lại tên, ngày, phòng của người cũ. Để mỗi trưởng phòng tự soạn thì mỗi người mới nhận một trải nghiệm khác nhau.",
    diagram: [
      { label: "Thư chào mừng có chỗ trống", arrow: true },
      { label: "Danh sách việc theo người phụ trách", arrow: true },
      { label: "Lịch 30 ngày với mốc kiểm tra", arrow: true },
      { label: "Bản checklist soát trước khi gửi và lưu để dùng lại" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một nhân sự công ty nhỏ dựng gói onboarding gồm thư, danh sách việc và lịch 30 ngày. Lần đầu dùng cho người mới, chị phát hiện trong danh sách việc còn sót tên của một đồng nghiệp đã nghỉ. Sau khi sửa, chị thêm bước 'soát tên người phụ trách' vào checklist để lần sau không sót nữa.",
    },
    quiz: [
      q(
        "Gói onboarding tốt gồm những phần nào?",
        [
          "Thư chào mừng, danh sách việc theo người phụ trách, lịch 30 ngày có mốc kiểm tra",
          "Chỉ một thư chào mừng dài, mọi việc còn lại để người mới tự hỏi",
          "Cẩm nang toàn bộ quy định công ty để người mới đọc trong tuần đầu",
          "Bảng đánh giá năng lực để chấm điểm người mới ngay từ tuần đầu",
        ],
        "Ba phần này giúp người mới biết đi đâu, làm gì, khi nào và ai hỗ trợ. Một thư dài thiếu danh sách việc, cẩm nang toàn bộ quy định làm người mới ngợp, còn chấm điểm ngay tuần đầu tạo áp lực không cần thiết."
      ),
      q(
        "Danh sách việc onboarding cần ghi tên người phụ trách vì lý do nào?",
        [
          "Mỗi việc có người chịu trách nhiệm và người mới biết hỏi ai",
          "Để ghi lại ai chậm trễ và trừ điểm thi đua cuối tháng",
          "Vì AI cần tên người mới xếp được danh sách việc",
          "Để danh sách trông đầy đủ hơn khi gửi cho ban giám đốc",
        ],
        "Việc không có người phụ trách thường không ai làm. Ghi tên còn giúp người mới biết hỏi ai. Mục đích không phải trừ điểm, AI không cần tên riêng để sắp danh sách, và trình bày cho đẹp không phải lý do chính."
      ),
      q(
        "Bạn copy gói của người trước rồi đổi tên người mới. Rủi ro lớn nhất là gì?",
        [
          "Còn sót tên, ngày, phòng hoặc người phụ trách của người cũ",
          "Gói bị trùng nội dung nên người mới thấy công ty thiếu sáng tạo",
          "Người trước sẽ phát hiện và phản đối vì gói dựa trên hồ sơ của họ",
          "Gói mất định dạng nên không mở được trên điện thoại",
        ],
        "Đổi tên chỉ sửa chỗ bạn nhìn thấy, còn các chi tiết khác của người cũ nằm rải trong thư và lịch. Gói giống nhau không phải vấn đề, người trước ít khi biết, và định dạng thường không mất khi sao chép."
      ),
      q(
        "Người mới vào ngày 1, lịch 30 ngày có mốc kiểm tra ở ngày 7, 14 và 30. Có bao nhiêu ngày giữa mốc đầu và mốc cuối?",
        [
          "23 ngày (= 30 − 7)",
          "22 ngày (= 30 − 7 − 1, trừ thêm một ngày)",
          "16 ngày (= 30 − 14, tính từ mốc giữa)",
          "30 ngày (= tổng số ngày của cả lịch, không phải khoảng giữa hai mốc)",
        ],
        "Từ ngày 7 đến ngày 30 là 30 − 7 = 23 ngày. Trừ thêm một ngày là tính sai cách đếm khoảng. Lấy mốc giữa thì ra 16, còn 30 là độ dài của cả lịch. Đây là số minh hoạ; mốc thật do công ty quyết."
      ),
      q(
        "Trước khi dùng gói mẫu cho người mới thứ hai, bước nào giữ cho gói không dần lỗi thời?",
        [
          "Soát lại tên người phụ trách, giờ cố định và đường link mỗi lần dùng",
          "Chờ tới khi có người mới phàn nàn về chỗ sai rồi mới sửa từng chỗ một",
          "Nhờ AI viết lại toàn bộ gói mỗi quý để luôn có bản mới",
          "Khoá gói không cho ai chỉnh sửa để không bị thay đổi",
        ],
        "Người phụ trách đổi, giờ cố định đổi, đường link hết hạn: soát lại mỗi lần dùng giữ gói đúng. Đợi phàn nàn thì người mới đã chịu thiệt, viết lại toàn bộ tốn công kiểm lại, còn khoá không cho sửa thì gói chắc chắn lỗi thời."
      ),
    ],
    keyTakeaways: [
      "Gói onboarding gồm ba phần: thư chào mừng, danh sách việc theo người phụ trách, lịch 30 ngày có mốc kiểm tra.",
      "Làm mẫu có chỗ trống, kiểm một lần cho kỹ, rồi dùng lại cho mọi người mới.",
      "Không sao chép gói của người trước rồi chỉ đổi tên: hãy soát tên, ngày, phòng, người phụ trách.",
      "Mỗi lần dùng, soát lại người phụ trách, giờ cố định và đường link.",
    ],
    practicePrompt: {
      question:
        "Chị Hạnh có gói onboarding mẫu và dùng cho người mới. Trước khi gửi, việc nào cần làm nhất?",
      options: [
        "Soát tên người phụ trách, ngày và đường link so với thông tin hiện tại",
        "Nhờ AI làm gói dài hơn để người mới thấy công ty chu đáo",
        "Thêm bản đánh giá năng lực vào tuần đầu để có dữ liệu sớm",
        "Gửi cùng gói cho người trước để họ góp ý",
      ],
      correct: 0,
      explanation:
        "Gói mẫu vẫn có chỗ có thể lỗi thời: người phụ trách đã nghỉ, đường link hết hạn. Soát lại từng chỗ mới giữ gói đúng. Gói dài hơn không đúng hơn, đánh giá năng lực tuần đầu gây áp lực, và người trước không phải người kiểm gói.",
    },
    summary: {
      keyIdea: "Một gói onboarding mẫu kiểm kỹ một lần, dùng lại nhiều lần, và soát lại phần dễ lỗi thời mỗi lần dùng.",
      formula: "Thư + danh sách việc theo người + lịch 30 ngày + checklist soát = gói onboarding dùng lại được.",
      commonMistake: "Sao chép gói cũ và chỉ đổi tên, để sót tên, ngày, phòng của người trước.",
      action: "Lưu gói mẫu ở nơi cả nhóm dùng chung và thêm ngày soát lại gần nhất.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Dựng khung gói onboarding trên chính tài liệu của bạn: một thư chào mừng có chỗ trống, một danh sách 8 việc kèm người phụ trách, và lịch 30 ngày có ba mốc (ngày 7, 14, 30). Nhờ AI sắp xếp, sau đó tự soát tên, ngày và link. Ngày mai bạn sẽ được hỏi gói đó đã đủ ba phần chưa và phần nào còn ghi 'chờ xác nhận'.",
      secondary: "Ghi lại ba chỗ dễ lỗi thời nhất trong gói để đưa vào checklist.",
    },
    sections: [
      {
        type: "lead",
        text: "Tháng này công ty có ba người mới và mỗi người lại nhận một bộ thư, danh sách, lịch khác nhau vì bạn soạn vội. Bài này ghép mọi thứ đã học thành một gói dùng lại được, có checklist để không sót.",
      },
      {
        type: "feynman",
        title: "Gói onboarding đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới hộp dụng cụ sơ cứu ở công ty. Bạn chuẩn bị một lần: băng, thuốc sát trùng, danh sách số gọi khẩn. Mỗi vài tháng có người kiểm hạn dùng. Khi có người bị thương, bạn không phải chạy đi mua từng thứ. Gói onboarding cũng vậy: chuẩn bị kỹ một lần, soát lại định kỳ, dùng khi cần.",
        columns: ["Điều cần", "Hộp sơ cứu", "Gói onboarding"],
        rows: [
          ["Chuẩn bị một lần", "Băng, thuốc, số khẩn cấp", "Thư mẫu, danh sách việc, lịch 30 ngày"],
          ["Chỗ thay đổi", "Ghi tên người, giờ xử lý", "Tên người mới, ngày bắt đầu, người phụ trách"],
          ["Soát định kỳ", "Kiểm hạn dùng của thuốc", "Kiểm người phụ trách, link, giờ cố định"],
          ["Dùng khi cần", "Khi có sự cố", "Khi có người mới"],
        ],
        oneLiner: "Chuẩn bị một gói cho kỹ, soát lại phần dễ hết hạn, rồi dùng cho mọi người mới.",
      },
      { type: "heading", text: "Vấn đề: làm lại từ đầu thì dễ sót, sao chép thì dễ để lại dấu vết" },
      {
        type: "paragraph",
        text: "Soạn từ đầu cho mỗi người mới thì mỗi lần một khác và dễ quên bước, như quên xin tài khoản hay quên nhắc buổi an toàn lao động. Sao chép gói cũ rồi đổi tên thì ngược lại: những chi tiết của người trước nằm trong thư, trong lịch mà bạn không thấy. Cách ở giữa là một gói mẫu có chỗ trống và một checklist soát.",
      },
      {
        type: "flow",
        title: "Dựng gói onboarding trong một buổi",
        steps: [
          { label: "Viết thư chào mừng có chỗ trống", detail: "Dùng {ten}, {ngay_bat_dau}, {nguoi_don}, {dia_diem}. Phần chung ngắn, rõ, có số liên hệ." },
          { label: "Lập danh sách việc theo người phụ trách", detail: "Mỗi việc một dòng: việc gì, ai làm, hạn khi nào. Ví dụ: cấp tài khoản, chỗ ngồi, học quy trình." },
          { label: "Dựng lịch 30 ngày có ba mốc", detail: "Ngày 7, 14, 30: gặp người quản lý xem người mới ổn chưa và vướng ở đâu." },
          { label: "Nhờ AI sắp xếp và đối chiếu chỗ thiếu", detail: "Yêu cầu chỉ dùng dữ kiện bạn đưa; chỗ chưa biết ghi 'chờ xác nhận'. Không để AI tự thêm việc hay tên người." },
          { label: "Viết checklist soát và lưu gói", detail: "Soát tên, ngày, phòng, link, người phụ trách. Lưu ở nơi cả nhóm dùng chung và ghi ngày soát gần nhất." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI sắp lịch 30 ngày",
        task: "Bạn có danh sách việc onboarding và ba mốc kiểm tra. Lắp prompt để AI sắp thành lịch 30 ngày mà không bịa việc hay tên người.",
        parts: [
          {
            id: "input",
            label: "Dữ kiện đưa vào",
            options: [
              { text: "Sắp cho tôi lịch 30 ngày cho người mới.", feedback: "Không có dữ kiện nên AI tự bịa tuần lễ định hướng, buổi học và tên người phụ trách không có thật." },
              { text: "Đây là danh sách 8 việc, người phụ trách từng việc và 3 mốc ngày 7, 14, 30. Chỉ sắp xếp, không thêm việc mới.", good: true, feedback: "Dữ kiện thật và phạm vi rõ: AI chỉ sắp xếp lại cái bạn đưa." },
            ],
          },
          {
            id: "gap",
            label: "Chỗ chưa biết",
            options: [
              { text: "Chỗ nào thiếu thông tin thì tự điền cho hợp lý.", feedback: "AI điền tên người và giờ nghe hợp lý, nhưng không có thật. Người mới đến nơi không ai biết mình được hẹn." },
              { text: "Chỗ nào thiếu thông tin thì ghi 'chờ xác nhận', không tự điền.", good: true, feedback: "Chỗ trống lộ ra rõ ràng: bạn biết cần đi hỏi ai thay vì tin một cái tên bịa." },
            ],
          },
          {
            id: "format",
            label: "Cách trình bày",
            options: [
              { text: "Trình bày thật đẹp và chi tiết cho ấn tượng.", feedback: "Đẹp và chi tiết khiến AI thêm ghi chú, mô tả và lời khuyên dài dòng mà bạn phải đọc lại để kiểm." },
              { text: "Trình bày bảng ba cột: ngày, việc, người phụ trách; không thêm mô tả ngoài dữ kiện.", good: true, feedback: "Bảng gọn nên bạn đối chiếu từng dòng nhanh và dễ chuyển cho người quản lý duyệt." },
            ],
          },
        ],
        responses: [
          {
            requires: ["input", "gap", "format"],
            text: "Ngày 1 | Đón, chỗ ngồi | chờ xác nhận\nNgày 2 | Cấp tài khoản | Bộ phận IT\nNgày 7 | Gặp quản lý, mốc 1 | Trưởng phòng\nNgày 14 | Mốc 2 | Trưởng phòng\nNgày 30 | Mốc 3, tổng kết | Trưởng phòng và nhân sự",
          },
          {
            requires: ["input"],
            text: "Ngày 1 | Đón, chỗ ngồi | chị Thu\nNgày 2 | Cấp tài khoản | anh Long\nNgày 3 | Học quy trình nội bộ | chị Vy\n...\n(Đúng khuôn, nhưng AI tự điền tên chị Thu, anh Long, chị Vy mà bạn chưa hề đưa.)",
          },
          {
            text: "Tuần 1: Định hướng văn hoá công ty, gặp giám đốc\nTuần 2: Đào tạo kỹ năng mềm\nTuần 3: Thử thách dự án nhỏ...\n\n(Lịch đẹp nhưng toàn buổi không có thật trong công ty của bạn.)",
          },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Gói mẫu có chỗ trống và checklist soát",
          text: "Mỗi người mới nhận đủ ba phần giống nhau. Soát tên, ngày, link mỗi lần dùng nên gói giữ được độ đúng. Thêm người mới chỉ tốn vài phút điền chỗ trống.",
        },
        right: {
          label: "Sao chép gói cũ rồi đổi tên",
          text: "Nhanh trong lần đầu nhưng tên, ngày, phòng của người trước còn nằm rải rác. Người phụ trách đã nghỉ vẫn nằm trong danh sách. Người mới nhận thư có tên người khác ở đoạn cuối.",
        },
      },
      {
        type: "scenario",
        title: "Ngày đầu tiên dùng gói cho người mới",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn đã có gói onboarding mẫu và người mới vào thứ Hai. Bạn cần điền chỗ trống cho người này.",
            choices: [
              { label: "Điền chỗ trống từ thông tin thật của người mới, rồi soát theo checklist", next: "s2" },
              { label: "Đổi tên trong bản của người trước và gửi luôn cho nhanh", next: "bad_copy" },
            ],
          },
          bad_copy: {
            text: "Cuối lịch vẫn còn dòng 'gặp chị Vy ở phòng 305', trong khi chị Vy đã chuyển bộ phận. Người mới đợi ở phòng 305 hơn nửa tiếng.",
            ending: "bad",
          },
          s2: {
            text: "Checklist báo một người phụ trách trong danh sách việc đã nghỉ tuần trước.",
            choices: [
              { label: "Hỏi trưởng phòng ai thay thế, cập nhật gói mẫu luôn cho lần sau", next: "good" },
              { label: "Xoá tên người đó khỏi bản của người mới, để gói mẫu vẫn còn tên", next: "bad_partial" },
            ],
          },
          bad_partial: {
            text: "Bản của người mới đúng, nhưng lần sau bạn dùng lại gói mẫu và tên người đã nghỉ xuất hiện lại. Sai lỗi cũ lặp lại với người mới thứ hai.",
            ending: "bad",
          },
          good: {
            text: "Người mới nhận gói đúng và gói mẫu đã được cập nhật. Bạn ghi ngày soát gần nhất để lần sau biết gói còn mới.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Dựng thư chào mừng có chỗ trống, danh sách việc theo người, lịch 30 ngày có ba mốc.",
          "Bước 2 - Nhờ AI sắp xếp, cấm tự điền và cấm thêm việc.",
          "Bước 3 - Điền chỗ trống cho từng người mới rồi soát theo checklist.",
          "Bước 4 - Lưu gói ở nơi dùng chung, ghi ngày soát gần nhất và người phụ trách gói.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Chuẩn bị một gói cho kỹ, dùng cho nhiều người, soát lại phần dễ hết hạn.",
          "Bài sau: bắt đầu phần đánh giá, số liệu và giữ người.",
        ],
      },
    ],
  },
];
