import type { Lesson } from "./lesson-types";

// Chặng 11 của track cá nhân: tăng thu nhập.
//
// VÌ SAO CHẶNG NÀY TỒN TẠI. 138 bài của track cá nhân phủ rất kỹ phần phân bổ
// và đầu tư số tiền đã có - ngân sách, quỹ khẩn cấp, cổ phiếu, trái phiếu,
// danh mục - nhưng không có bài nào về vế còn lại của phương trình: số tiền
// đi vào. Với người đi làm ở Việt Nam, khoảng cách giữa lương 15 triệu và
// lương 25 triệu thay đổi kế hoạch tài chính nhiều hơn mọi kỹ thuật tối ưu
// danh mục cộng lại, và nó là biến duy nhất trong chặng này.
//
// Ids 300-309 nằm ngay sau Chặng 9 (289-298). Dải 299-800 trống hoàn toàn ở
// cả track-stages.ts lẫn career-competency.ts, nên chặng khai báo được bằng
// `days: [300, 309]` mà không cần extraLessonIds - xem chú thích của Chặng 1
// để biết vì sao chặng đó phải dùng cách kia.
//
// Id là VỊ TRÍ trong lộ trình chứ không phải số tự tăng: lấy max+1 của toàn
// kho sẽ rơi ra ngoài mọi khoảng và tạo bài mồ côi. Ba bộ kiểm nói điều đó -
// track-stage-coverage, skill-domain-coverage, stage-career-reach.

export const INCOME_GROWTH_LESSONS: Lesson[] = [
  {
    id: 300,
    slug: "tang-thu-nhap-don-bay-manh-hon-cat-chi",
    title: "Chặng 11, Bài 1: Vì sao tăng thu nhập là đòn bẩy mạnh hơn cắt chi",
    subtitle: "Tiết kiệm có trần, thu nhập thì không - và trần đó thấp hơn bạn tưởng",
    duration: "7 phút",
    difficulty: "Dễ",
    emoji: "📈",
    track: "personal",
    whyItMatters:
      "Gần như toàn bộ lời khuyên tài chính cá nhân phổ biến nói về cắt chi, vì cắt chi là việc làm được ngay. Nhưng cắt chi bị chặn bởi một trần cứng: bạn không thể cắt quá 100% chi tiêu của mình. Thu nhập không có trần tương ứng, và với người mới đi làm thì đó thường là biến có thể thay đổi nhiều nhất.",
    openingQuestion:
      "Thu nhập 15 triệu, chi 13 triệu. Cắt chi tối đa được thêm bao nhiêu mỗi tháng?",
    openingOptions: [
      "Tối đa 13 triệu, nhưng thực tế thấp hơn nhiều vì có khoản không cắt được",
      "Không giới hạn, vì luôn còn khoản có thể tối ưu thêm nếu đủ kỷ luật",
      "Đúng 2 triệu, tức bằng phần chênh lệch giữa thu nhập và chi tiêu hiện tại",
      "Khoảng 6,5 triệu, tức một nửa chi tiêu theo quy tắc cắt giảm phổ biến",
    ],
    correctOption: 0,
    explanation:
      "Trần lý thuyết của việc cắt chi là toàn bộ chi tiêu - 13 triệu. Trần thực tế thấp hơn hẳn, vì tiền nhà, ăn uống và đi lại không về 0 được. Nói cách khác, dư địa cắt chi của người này có thể là ba tới bốn triệu, và đó là mức trần vĩnh viễn: cắt xong thì hết. Trong khi đó một lần tăng lương 20% cho thêm ba triệu mỗi tháng, lặp lại mọi tháng sau đó, và còn làm nền cho lần tăng tiếp theo. Đây không phải lý do để tiêu bừa - ngân sách vẫn là nền - mà là lý do để không dừng ở đó.",
    diagram: [
      { label: "Cắt chi: trần cứng bằng tổng chi tiêu", arrow: true },
      { label: "Thực tế thấp hơn vì có khoản cố định", arrow: true },
      { label: "Tăng thu nhập: không có trần tương ứng", arrow: true },
      { label: "Và nó cộng dồn qua từng năm" },
    ],
    interactiveType: "budget",
    realWorldExample: {
      company: "Hai người cùng xuất phát 15 triệu",
      description:
        "Người thứ nhất dành ba năm tối ưu chi tiêu, đưa chi từ 13 xuống 9,5 triệu - tiết kiệm thêm 3,5 triệu mỗi tháng và không cắt được nữa. Người thứ hai giữ nguyên chi tiêu nhưng đổi việc hai lần, lương lên 26 triệu, dư ra 13 triệu mỗi tháng. Cả hai đều làm việc đúng, nhưng một người chạm trần còn người kia thì chưa.",
    },
    quiz: [
      {
        question: "Vì sao cắt chi có trần còn tăng thu nhập thì không?",
        options: [
          "Vì chi tiêu không thể giảm xuống dưới 0, còn thu nhập không có mức chặn trên tương đương",
          "Vì lạm phát làm chi phí sinh hoạt tăng đều qua mỗi năm nên cắt giảm được bao nhiêu rồi cũng vô ích",
          "Vì ngân hàng giới hạn số tiền một cá nhân được gửi tiết kiệm trong mỗi năm",
          "Vì thuế thu nhập cá nhân tăng theo bậc nên phần cắt chi bị đánh thuế lại",
        ],
        correct: 0,
        explanation:
          "Đây là bất đối xứng toán học chứ không phải quan điểm sống. Chi tiêu bị chặn dưới bởi 0 và trên thực tế bị chặn bởi các khoản không cắt được; thu nhập không có ràng buộc đối xứng nào ở phía trên.",
      },
      {
        question: "Cắt chi có ưu điểm gì mà tăng thu nhập không có?",
        options: [
          "Nó có tác dụng gần như ngay lập tức và hoàn toàn nằm trong tầm kiểm soát của bạn",
          "Nó làm tăng điểm tín dụng cá nhân nên khi vay mua nhà sẽ được hưởng lãi suất thấp hơn",
          "Nó được miễn thuế thu nhập cá nhân trong khi phần lương tăng thêm thì không",
          "Nó không đòi hỏi bất kỳ sự thay đổi nào trong thói quen sinh hoạt hằng ngày",
        ],
        correct: 0,
        explanation:
          "Đổi việc hay đàm phán lương phụ thuộc vào thị trường và vào người khác đồng ý; hủy một gói đăng ký thì có hiệu lực tối nay. Đó là lý do ngân sách vẫn là bước đầu tiên, chứ không phải bước duy nhất.",
      },
      {
        question:
          "Thu nhập 20 triệu, chi 18 triệu. Tăng lương 15% và cắt chi 15% - phương án nào cho thêm nhiều tiền hơn mỗi tháng?",
        options: [
          "Cắt chi 15%, vì 2,7 triệu lớn hơn phần lương tăng thêm sau thuế",
          "Tăng lương 15%, vì 3 triệu gross luôn lớn hơn 2,7 triệu tiết kiệm được",
          "Hai phương án cho kết quả bằng nhau vì cùng tỷ lệ phần trăm 15%",
          "Không so sánh được vì lương và chi tiêu là hai đại lượng khác nhau",
        ],
        correct: 0,
        explanation:
          "15% của 18 triệu là 2,7 triệu, giữ nguyên trong túi. 15% của 20 triệu là 3 triệu gross, sau thuế và bảo hiểm còn khoảng 2,5 triệu. Ở kỳ đầu tiên cắt chi thắng - nhưng phần tăng lương lặp lại mọi tháng sau và làm nền cho lần tăng kế, còn phần cắt chi thì đã dùng hết dư địa.",
      },
      {
        question: "Vì sao một lần tăng lương có giá trị lớn hơn con số của chính nó?",
        options: [
          "Vì lần tăng sau thường tính theo phần trăm trên mức lương đã cao hơn",
          "Vì công ty bắt buộc phải tăng lương tiếp trong vòng mười hai tháng kế",
          "Vì thuế suất giảm khi thu nhập vượt qua ngưỡng của bậc thuế hiện tại",
          "Vì bảo hiểm xã hội chi trả theo mức lương cao nhất từng đạt được",
        ],
        correct: 0,
        explanation:
          "Lương gần như luôn được điều chỉnh theo tỷ lệ phần trăm trên mức hiện tại, ở cả công ty cũ lẫn công ty mới. Một mức nền cao hơn hôm nay làm mọi lần tăng sau đó lớn hơn về số tuyệt đối - cùng cơ chế cộng dồn như lãi kép.",
      },
      {
        question: "Kết luận đúng từ bài này là gì?",
        options: [
          "Lập ngân sách trước để có nền, rồi dồn sức vào tăng thu nhập vì dư địa ở đó lớn hơn",
          "Bỏ hẳn việc ghi chép chi tiêu hằng tháng và chỉ tập trung vào việc kiếm được nhiều tiền hơn",
          "Chỉ cắt chi cho tới khi đạt tỷ lệ tiết kiệm 20% rồi ngừng mọi nỗ lực khác",
          "Tăng thu nhập trước, khi nào thu nhập đủ cao thì mới cần tới ngân sách",
        ],
        correct: 0,
        explanation:
          "Không có ngân sách thì lương tăng bao nhiêu cũng biến mất - đó là hiện tượng lạm phát lối sống, và bài Chặng 1 đã nói. Bài này không thay thế ngân sách, nó chỉ ra rằng dừng lại ở ngân sách là dừng ở nửa bài toán.",
      },
    ],
    keyTakeaways: [
      "Cắt chi bị chặn bởi tổng chi tiêu, và trên thực tế bởi các khoản không cắt được - đó là trần cứng",
      "Tăng thu nhập không có trần đối xứng, và mỗi lần tăng làm nền cho lần tăng sau",
      "Cắt chi thắng ở tốc độ và quyền kiểm soát; tăng thu nhập thắng ở quy mô và tính lặp lại",
      "Không có ngân sách thì lương tăng thêm bị lạm phát lối sống nuốt mất - hai việc bổ sung nhau",
    ],
    practicePrompt: {
      question:
        "Bạn đang tiêu 92% thu nhập và đã cắt hết các khoản dễ cắt. Bước tiếp theo hợp lý nhất là gì?",
      options: [
        "Chuyển trọng tâm sang tăng thu nhập, vì dư địa cắt chi đã gần cạn",
        "Tiếp tục cắt sâu vào tiền ăn và tiền đi lại cho tới khi đạt mục tiêu 20%",
        "Vay tiêu dùng để đầu tư nhằm bù phần chênh lệch giữa thu và chi hiện tại",
        "Giữ nguyên mọi thứ và chờ tăng lương định kỳ hằng năm của công ty",
      ],
      correct: 0,
      explanation:
        "Khi các khoản dễ cắt đã hết, mỗi đồng tiếp theo phải trả bằng chất lượng sống, và tỷ lệ đánh đổi ngày càng xấu. Đó chính là tín hiệu cho biết đòn bẩy đã chuyển sang phía thu nhập.",
    },
    summary: {
      keyIdea: "Cắt chi có trần, tăng thu nhập thì không - và phần lớn người học dừng lại ở vế có trần",
      commonMistake: "Coi tối ưu chi tiêu là toàn bộ tài chính cá nhân, rồi bế tắc khi đã cắt hết khoản dễ cắt",
      action: "Tính dư địa cắt chi còn lại của bạn bằng số tuyệt đối, rồi so nó với một lần tăng lương 20%.",
    },
    application: {
      title: "Đo dư địa còn lại của bạn",
      message:
        "Lấy bảng chi tiêu tháng gần nhất, đánh dấu những khoản thật sự cắt được mà không đổi chỗ ở hay công việc. Cộng lại - đó là toàn bộ dư địa cắt chi còn lại của bạn, tính bằng tiền chứ không phải cảm giác.",
      secondary:
        "So con số đó với 20% lương hiện tại. Nếu nó nhỏ hơn, phần còn lại của chặng này đáng giá hơn mọi mẹo tiết kiệm tiếp theo.",
    },
    sections: [
      {
        type: "lead",
        text: "Mười chặng vừa qua dạy bạn cách xử lý số tiền đang có: đo nó, chia nó, giữ nó, đầu tư nó. Chặng này nói về vế còn lại của phương trình - số tiền đi vào - và đó là vế mà phần lớn lời khuyên tài chính cá nhân bỏ qua vì nó khó hơn.",
      },
      { type: "heading", text: "Bất đối xứng mà ai cũng biết nhưng ít ai tính ra" },
      {
        type: "paragraph",
        text: "Chi tiêu bị chặn dưới bởi số 0, và trên thực tế bị chặn cao hơn thế nhiều: tiền nhà, tiền ăn, đi lại và các nghĩa vụ đã cam kết không biến mất được. Với người chi 13 triệu, dư địa thật thường nằm quanh ba tới bốn triệu - và khi đã cắt xong thì con số đó không lặp lại. Thu nhập không có ràng buộc đối xứng ở phía trên, nên mọi mức tăng đều lặp lại hằng tháng và làm nền cho lần tăng kế tiếp.",
      },
      {
        type: "conceptTable",
        title: "Hai đòn bẩy, hai tính chất khác nhau",
        subtitle: "Không phải chọn một, mà là biết cái nào đang còn dư địa",
        concepts: [
          {
            vi: "Cắt chi",
            en: "Expense reduction",
            def: "Nhanh, hoàn toàn trong tầm kiểm soát của bạn, có hiệu lực ngay. Nhưng bị chặn bởi tổng chi tiêu và cạn dần: khoản dễ cắt luôn được cắt trước.",
          },
          {
            vi: "Tăng thu nhập",
            en: "Income growth",
            def: "Chậm hơn, phụ thuộc thị trường và người khác đồng ý. Bù lại không có trần, lặp lại mỗi tháng, và mỗi lần tăng nâng nền cho lần sau.",
          },
          {
            vi: "Lạm phát lối sống",
            en: "Lifestyle inflation",
            def: "Chi tiêu tăng theo thu nhập nên phần dư không đổi. Đây là lý do tăng thu nhập mà không có ngân sách thì không đổi được kết quả nào.",
          },
        ],
      },
      {
        type: "callout",
        label: "Bài này không phủ nhận chín chặng trước",
        text: "Ngân sách vẫn là điều kiện cần: không có nó thì lương tăng bao nhiêu cũng bị lạm phát lối sống nuốt, và bạn sẽ kiếm nhiều hơn mà vẫn không dư ra đồng nào. Điều bài này bác bỏ chỉ là việc DỪNG LẠI ở tối ưu chi tiêu, khi phần lớn dư địa nằm ở phía bên kia.",
      },
      {
        type: "list",
        items: [
          "Dư địa cắt chi là con số hữu hạn - hãy tính nó ra bằng tiền, đừng ước lượng bằng cảm giác",
          "Một lần tăng lương lặp lại mọi tháng sau đó, một lần cắt chi cũng vậy, nhưng chỉ cắt được một lần",
          "Mức lương hôm nay là nền tính phần trăm cho mọi lần tăng sau - kể cả ở công ty khác",
          "Hai đòn bẩy bổ sung nhau: ngân sách giữ phần chênh lệch, thu nhập tạo ra phần chênh lệch",
        ],
      },
      {
        type: "closing",
        lines: [
          "Tiết kiệm quyết định bạn giữ được bao nhiêu phần của cái bánh; thu nhập quyết định cái bánh to cỡ nào.",
          "Bài sau: trước khi đàm phán bất cứ điều gì, bạn cần biết giá thị trường thật của công việc mình đang làm.",
        ],
      },
    ],
  },
  {
    id: 301,
    slug: "biet-gia-thi-truong-cua-minh",
    title: "Chặng 11, Bài 2: Biết giá thị trường của mình trước khi mở lời",
    subtitle: "Con số bạn xứng đáng là con số thị trường đang trả, không phải con số bạn cần",
    duration: "7 phút",
    difficulty: "Dễ",
    emoji: "🧭",
    track: "personal",
    whyItMatters:
      "Người đi làm thường định giá bản thân bằng mức lương hiện tại cộng một chút, hoặc bằng số tiền mình cần để sống. Cả hai đều là con số nội bộ, và cả hai đều không liên quan tới điều duy nhất quyết định kết quả đàm phán: thị trường đang trả bao nhiêu cho việc này.",
    openingQuestion: "Cách xác định mức lương nên đề nghị nào đáng tin nhất?",
    openingOptions: [
      "Lấy mức lương hiện tại cộng thêm phần trăm mà bạn cho là hợp lý",
      "Đối chiếu nhiều nguồn về dải lương thật của vị trí đó trên thị trường",
      "Tính tổng chi phí sinh hoạt hằng tháng của bạn rồi nhân với hệ số an toàn",
      "Hỏi một người bạn cùng ngành xem họ đang được trả bao nhiêu mỗi tháng",
    ],
    correctOption: 1,
    explanation:
      "Mức lương hiện tại của bạn phản ánh cuộc đàm phán trước đó, không phản ánh giá trị hôm nay - nếu lần trước bạn bị trả thấp, mọi lần cộng phần trăm sau đó đều kế thừa cái sai ấy. Chi phí sinh hoạt của bạn thì nhà tuyển dụng không quan tâm, vì nó không nói gì về giá trị công việc. Một người bạn cùng ngành là một điểm dữ liệu, và một điểm không tạo thành dải. Thứ duy nhất dùng được là dải lương thật cho vị trí đó, đối chiếu từ nhiều nguồn - vì đó là con số mà bên kia bàn cũng đang nhìn.",
    diagram: [
      { label: "Thu thập dải lương từ nhiều nguồn", arrow: true },
      { label: "Lọc theo cấp bậc, ngành và địa điểm", arrow: true },
      { label: "Xác định vị trí của bạn trong dải", arrow: true },
      { label: "Giờ mới có một con số để mở lời" },
    ],
    realWorldExample: {
      company: "Cùng một chức danh, hai mức lương",
      description:
        "Hai người cùng làm kế toán tổng hợp ba năm kinh nghiệm ở Hà Nội. Người thứ nhất đề nghị 15 triệu vì đang nhận 13 và muốn tăng một chút. Người thứ hai tra được dải thật cho vị trí ấy là 16 đến 22 triệu, đề nghị 20 và nhận được 19. Khác biệt không nằm ở năng lực mà ở việc một người biết dải còn người kia thì không.",
    },
    quiz: [
      {
        question: "Vì sao lấy lương hiện tại cộng phần trăm là cách định giá rủi ro?",
        options: [
          "Vì nó kế thừa mọi sai lệch của lần đàm phán trước mà không kiểm tra lại",
          "Vì phần trăm tăng lương hằng năm do nhà nước quy định chứ không do thị trường",
          "Vì mức lương cũ luôn được ghi trong hồ sơ bảo hiểm xã hội nên không giấu được",
          "Vì công ty mới bắt buộc phải trả cao hơn công ty cũ ít nhất mười phần trăm",
        ],
        correct: 0,
        explanation:
          "Nếu ba năm trước bạn nhận thấp hơn thị trường 20%, thì cộng 10% mỗi năm vẫn giữ nguyên khoảng cách ấy dưới dạng tương đối. Neo vào một con số sai thì mọi phép cộng sau đó đều sai theo.",
      },
      {
        question: "Vì sao chi phí sinh hoạt của bạn không phải căn cứ đàm phán?",
        options: [
          "Vì nó đo nhu cầu của bạn chứ không đo giá trị công việc trên thị trường",
          "Vì nhà tuyển dụng không có quyền hỏi về tình hình tài chính của ứng viên",
          "Vì chi phí sinh hoạt thay đổi theo từng tháng nên không dùng làm mốc được",
          "Vì mức lương tối thiểu vùng đã bao hàm toàn bộ chi phí sinh hoạt cơ bản",
        ],
        correct: 0,
        explanation:
          "Hai người làm cùng một việc với cùng chất lượng thì đáng được trả như nhau, dù một người thuê nhà và một người ở với bố mẹ. Đưa nhu cầu cá nhân vào bàn đàm phán là đưa vào một đại lượng bên kia không có lý do gì để trả tiền cho nó.",
      },
      {
        question: "Một dải lương đáng tin cần thỏa mãn điều gì?",
        options: [
          "Cùng cấp bậc, cùng ngành và cùng địa điểm với vị trí bạn đang nhắm tới",
          "Được công bố chính thức bởi cơ quan quản lý lao động của tỉnh hoặc thành phố",
          "Lấy trung bình toàn bộ mức lương của mọi ngành nghề trong cùng một năm",
          "Chỉ dựa trên các tin tuyển dụng có ghi rõ con số lương cụ thể trong bài đăng",
        ],
        correct: 0,
        explanation:
          "Chức danh giống nhau không có nghĩa công việc giống nhau. Kế toán ở công ty sản xuất trăm người và kế toán ở tập đoàn niêm yết là hai vị trí khác nhau, và trộn chúng vào một dải sẽ cho ra con số không dùng được cho trường hợp nào cả.",
      },
      {
        question:
          "Bạn tra được dải 16 đến 22 triệu và tự đánh giá mình ở mức khá. Nên mở lời ở đâu?",
        options: [
          "Ở nửa trên của dải, để phần thương lượng xuống vẫn còn nằm trong vùng hợp lý",
          "Ở mức 16 triệu, tức đáy dải, để chắc chắn không bị loại khỏi vòng xét duyệt",
          "Ở mức 30 triệu, tức trên hẳn dải, để lấy chỗ mặc cả xuống thật nhiều",
          "Ở đúng 19 triệu, tức điểm giữa dải, vì đó là con số công bằng cho cả hai bên",
        ],
        correct: 0,
        explanation:
          "Mở ở đáy dải thì không còn chỗ nào để đi ngoài đi xuống. Mở trên hẳn dải làm bên kia nghĩ bạn không nắm thị trường, và đó là ấn tượng đắt hơn số tiền chênh lệch. Nửa trên của dải cho bạn khoảng lùi mà vẫn giữ được sự tín nhiệm.",
      },
      {
        question: "Vì sao một điểm dữ liệu từ một người bạn là chưa đủ?",
        options: [
          "Vì lương của một người phản ánh cả đàm phán và hoàn cảnh riêng của người đó",
          "Vì chia sẻ mức lương giữa các đồng nghiệp bị cấm trong hợp đồng lao động",
          "Vì bạn bè thường nói cao hơn thực tế nên con số đó luôn bị thổi phồng lên",
          "Vì mức lương chỉ có giá trị tham chiếu khi được doanh nghiệp công bố công khai",
        ],
        correct: 0,
        explanation:
          "Người đó có thể đàm phán rất giỏi, hoặc đang được trả thấp, hoặc làm ở công ty có cơ cấu lương khác hẳn. Bạn cần biết dải, và dải cần nhiều điểm - một điểm chỉ nói cho bạn về đúng một người.",
      },
    ],
    keyTakeaways: [
      "Lương hiện tại là kết quả của lần đàm phán trước, không phải thước đo giá trị hôm nay",
      "Chi phí sinh hoạt là nhu cầu của bạn, và nhu cầu không phải căn cứ để bên kia trả tiền",
      "Dải lương chỉ dùng được khi khớp cấp bậc, ngành và địa điểm - chức danh giống nhau là chưa đủ",
      "Mở lời ở nửa trên của dải: đủ chỗ lùi mà vẫn cho thấy bạn nắm thị trường",
    ],
    practicePrompt: {
      question:
        "Bạn tra ba nguồn và được ba dải lệch nhau khá nhiều cho cùng một vị trí. Nên làm gì?",
      options: [
        "Tìm xem ba nguồn khác nhau ở cấp bậc, quy mô công ty hay địa điểm nào",
        "Lấy trung bình cộng của ba dải để ra một con số duy nhất rồi dùng nó",
        "Chọn dải cao nhất vì đó là mức mà thị trường đã chứng minh là trả được",
        "Bỏ qua cả ba vì dữ liệu mâu thuẫn thì không có nguồn nào đáng tin cả",
      ],
      correct: 0,
      explanation:
        "Ba dải lệch nhau thường không phải vì nguồn nào sai, mà vì chúng đang mô tả ba vị trí hơi khác nhau. Tìm ra biến gây lệch cho bạn thông tin quý hơn cả ba con số: nó cho biết yếu tố nào đang quyết định mức trả trong ngành của bạn.",
    },
    summary: {
      keyIdea: "Giá của bạn là con số thị trường đang trả cho công việc đó, không phải con số bạn đang nhận hay đang cần",
      commonMistake: "Neo vào lương hiện tại rồi cộng một tỷ lệ phần trăm cảm thấy hợp lý",
      action: "Tra dải lương thật cho vị trí của bạn từ ít nhất ba nguồn, khớp cấp bậc và địa điểm.",
    },
    application: {
      title: "Dựng dải của riêng bạn tuần này",
      message:
        "Thu thập ít nhất ba nguồn cho đúng cấp bậc và địa điểm của bạn: tin tuyển dụng có ghi lương, báo cáo lương ngành, và người trong nghề. Ghi ra mức thấp nhất và cao nhất bạn tìm được.",
      secondary:
        "Nếu mức bạn đang nhận nằm dưới đáy dải, bạn vừa tìm ra lý do rõ ràng nhất để bước vào bài tiếp theo.",
    },
    sections: [
      {
        type: "lead",
        text: "Bài trước kết luận rằng dư địa nằm ở phía thu nhập. Nhưng trước khi đàm phán bất cứ điều gì, bạn cần một con số - và con số đó không đến từ việc bạn nghĩ mình xứng đáng bao nhiêu.",
      },
      { type: "heading", text: "Ba con số sai mà ai cũng dùng" },
      {
        type: "paragraph",
        text: "Con số thứ nhất là lương hiện tại cộng một chút: nó kế thừa toàn bộ sai lệch của lần đàm phán trước, nên nếu bạn từng bị trả thấp thì bạn sẽ mãi bị trả thấp theo tỷ lệ. Con số thứ hai là chi phí sinh hoạt: nó đo nhu cầu của bạn, mà nhu cầu thì không phải thứ bên kia mua. Con số thứ ba là mức lương của một người quen: đó là một điểm, và một điểm không tạo thành dải.",
      },
      {
        type: "conceptTable",
        title: "Ba nguồn nên đối chiếu",
        subtitle: "Không nguồn nào đủ một mình, nhưng ba nguồn giao nhau thì đáng tin",
        concepts: [
          {
            vi: "Tin tuyển dụng có ghi lương",
            en: "Posted ranges",
            def: "Ưu điểm là con số thật đang được chào. Nhược điểm là nhiều tin ghi dải rất rộng hoặc không ghi, và mức chào thường là mức khởi điểm.",
          },
          {
            vi: "Báo cáo lương ngành",
            en: "Salary surveys",
            def: "Cho dải theo cấp bậc và địa điểm, cỡ mẫu lớn. Nhược điểm là thường trễ một năm và gộp nhiều loại hình doanh nghiệp vào một nhóm.",
          },
          {
            vi: "Người trong nghề",
            en: "Peer network",
            def: "Sát thực tế nhất về những gì không ghi trong tin tuyển dụng. Cần nhiều người mới thành dải, và nên hỏi về dải họ biết chứ không hỏi lương riêng của họ.",
          },
        ],
      },
      {
        type: "callout",
        label: "Chức danh giống nhau không có nghĩa công việc giống nhau",
        text: "Cùng gọi là chuyên viên phân tích, nhưng ở công ty ba mươi người và ở tập đoàn niêm yết là hai phạm vi trách nhiệm khác hẳn, và thị trường trả khác nhau. Khi lọc dải, hãy lọc theo quy mô doanh nghiệp và phạm vi công việc chứ không chỉ theo tên gọi vị trí.",
      },
      {
        type: "list",
        items: [
          "Ghi dải bằng hai số - thấp nhất và cao nhất - chứ không quy về một con số trung bình",
          "Lọc theo cấp bậc, ngành, quy mô công ty và địa điểm trước khi so sánh",
          "Ba nguồn lệch nhau là thông tin, không phải nhiễu: hãy tìm biến gây ra chênh lệch",
          "Biết dải rồi thì câu hỏi chuyển từ bạn muốn bao nhiêu sang bạn đứng ở đâu trong dải",
        ],
      },
      {
        type: "closing",
        lines: [
          "Đàm phán mà không biết dải thì không phải đàm phán, đó là đoán và hy vọng.",
          "Bài sau: có con số rồi, đây là cách đưa nó ra khi nhận một lời mời làm việc.",
        ],
      },
    ],
  },
  {
    id: 302,
    slug: "dam-phan-luong-khi-nhan-viec-moi",
    title: "Chặng 11, Bài 3: Đàm phán lương khi nhận việc mới",
    subtitle: "Thời điểm bạn có nhiều đòn bẩy nhất trong cả sự nghiệp là lúc chưa ký",
    duration: "8 phút",
    difficulty: "Trung bình",
    emoji: "🤝",
    track: "personal",
    whyItMatters:
      "Đổi việc là dịp mức lương có thể nhảy bậc thay vì nhích vài phần trăm, và cuộc trao đổi quyết định điều đó thường kéo dài chưa tới mười phút. Mức bạn chốt hôm ấy còn là nền để tính mọi lần tăng lương trong nhiều năm sau, ở cả công ty này lẫn công ty tiếp theo.",
    openingQuestion:
      "Nhà tuyển dụng hỏi mức lương mong muốn ngay ở vòng đầu. Phản ứng tốt nhất là gì?",
    openingOptions: [
      "Nói ngay một con số cụ thể để thể hiện sự thẳng thắn và tiết kiệm thời gian",
      "Hỏi ngược về dải ngân sách của vị trí, hoặc đưa dải dựa trên khảo sát thị trường",
      "Nói rằng bạn sẵn sàng chấp nhận mức lương công ty đề xuất vì đang rất cần công việc này",
      "Đưa mức lương hiện tại của bạn để hai bên có cơ sở chung mà thương lượng tiếp",
    ],
    correctOption: 1,
    explanation:
      "Ai nói con số trước sẽ đặt neo cho toàn bộ cuộc thương lượng, và ở vòng đầu bạn là bên có ít thông tin hơn - bạn chưa biết ngân sách của họ, họ đã biết. Nói mức hiện tại còn tệ hơn: nó biến cuộc đàm phán về giá trị công việc thành cuộc đàm phán về lịch sử lương của bạn, và nếu bạn đang bị trả thấp thì cái thấp ấy đi theo sang chỗ mới. Hỏi ngược về dải ngân sách là câu hỏi hợp lý mà phần lớn nhà tuyển dụng có chuẩn bị sẵn câu trả lời. Nếu buộc phải nói trước, hãy đưa một dải dựa trên khảo sát chứ không phải một con số dựa trên nhu cầu.",
    diagram: [
      { label: "Hoãn con số tới khi có lời mời", arrow: true },
      { label: "Để bên kia nêu dải ngân sách trước", arrow: true },
      { label: "Neo bằng dải thị trường, không phải lương cũ", arrow: true },
      { label: "Chốt trên giấy trước khi nghỉ việc cũ" },
    ],
    realWorldExample: {
      company: "Mười phút đổi lấy nhiều năm",
      description:
        "Một ứng viên nhận đề nghị 18 triệu cho vị trí mà dải thị trường là 18 đến 24. Thay vì đồng ý ngay, người này cảm ơn, xin một ngày suy nghĩ, rồi trả lời rằng dựa trên khảo sát và phạm vi công việc đã trao đổi, mức phù hợp là 22 triệu. Công ty chốt 21. Bốn năm sau, khoản chênh lệch ba triệu mỗi tháng ấy đã cộng thành hơn một trăm bốn mươi triệu, chưa kể nó còn nâng nền cho lần đổi việc kế tiếp.",
    },
    quiz: [
      {
        question: "Vì sao nói con số trước thường bất lợi cho ứng viên?",
        options: [
          "Vì con số nói ra đầu tiên trở thành neo mà cả cuộc thương lượng xoay quanh",
          "Vì nhà tuyển dụng bắt buộc phải từ chối mọi mức lương do ứng viên đề xuất",
          "Vì nói con số trước bị coi là thiếu chuyên nghiệp trong quy trình tuyển dụng",
          "Vì mức lương chỉ có hiệu lực khi được phòng nhân sự đưa ra bằng văn bản",
        ],
        correct: 0,
        explanation:
          "Neo là hiệu ứng tâm lý đã được đo nhiều lần: con số đầu tiên kéo mọi con số sau về phía nó. Ở vòng đầu bạn thiếu thông tin về ngân sách của họ, nên neo do bạn đặt gần như chắc chắn thấp hơn mức họ sẵn sàng trả.",
      },
      {
        question: "Vì sao không nên lấy lương hiện tại làm cơ sở thương lượng?",
        options: [
          "Vì nó chuyển chủ đề từ giá trị công việc sang lịch sử lương của riêng bạn",
          "Vì tiết lộ lương cũ là hành vi vi phạm thỏa thuận bảo mật với công ty cũ",
          "Vì công ty mới sẽ tự tra được mức lương cũ qua hồ sơ bảo hiểm xã hội",
          "Vì lương cũ luôn thấp hơn thị trường nên nói ra sẽ bị đánh giá năng lực thấp",
        ],
        correct: 0,
        explanation:
          "Việc bạn từng được trả bao nhiêu không nói gì về giá trị của công việc mới. Khi lương cũ vào bàn, câu hỏi mặc định trở thành nên cộng bao nhiêu phần trăm - và câu hỏi đó luôn cho ra con số nhỏ hơn dải thị trường.",
      },
      {
        question: "Thời điểm nào ứng viên có đòn bẩy lớn nhất?",
        options: [
          "Sau khi đã có lời mời chính thức nhưng trước khi hai bên ký hợp đồng",
          "Ngay ở vòng phỏng vấn đầu tiên, khi ấn tượng ban đầu về bạn còn mạnh nhất",
          "Sau khi đã làm việc được ba tháng và vượt qua thời gian thử việc",
          "Vào kỳ đánh giá nhân sự cuối năm đầu tiên tại công ty mới đó",
        ],
        correct: 0,
        explanation:
          "Có lời mời nghĩa là họ đã chọn bạn, đã bỏ công qua nhiều vòng và đang muốn kết thúc quy trình. Đó là khoảnh khắc chi phí của việc mất bạn là cao nhất với họ - và nó biến mất ngay khi bạn ký.",
      },
      {
        question:
          "Đề nghị 18 triệu, dải thị trường 18 đến 24. Bạn nên phản hồi thế nào?",
        options: [
          "Đề xuất mức nửa trên của dải kèm lý do dựa trên phạm vi công việc đã trao đổi",
          "Nhận 18 triệu ngay để giữ thiện cảm rồi xin xem xét lại sau sáu tháng",
          "Đề xuất 30 triệu, tức cao hơn hẳn dải, để sau đó có thật nhiều chỗ thương lượng xuống",
          "Từ chối lời mời và tiếp tục ứng tuyển cho tới khi gặp mức 24 triệu",
        ],
        correct: 0,
        explanation:
          "18 là đáy dải, tức bạn đang được chào mức thấp nhất mà thị trường trả. Xin xem xét lại sau sáu tháng gần như không bao giờ thành hiện thực vì lúc đó đòn bẩy đã mất. Một đề xuất có lý do gắn với phạm vi công việc là điều nhà tuyển dụng có thể mang đi thuyết phục cấp trên.",
      },
      {
        question: "Vì sao nên xin thời gian suy nghĩ trước khi trả lời một lời mời?",
        options: [
          "Vì nó cho bạn thời gian đối chiếu toàn bộ đãi ngộ thay vì phản ứng theo cảm xúc",
          "Vì quy định lao động buộc nhà tuyển dụng phải cho ứng viên ít nhất bảy ngày",
          "Vì trả lời ngay khiến công ty nghĩ bạn đang thất nghiệp và hạ mức đề nghị xuống",
          "Vì lời mời chỉ có giá trị pháp lý sau khi ứng viên đã suy nghĩ trong một ngày",
        ],
        correct: 0,
        explanation:
          "Lời mời hay đến kèm cảm giác nhẹ nhõm, và đó là trạng thái tệ nhất để đánh giá con số. Một ngày đủ để đối chiếu với dải, tính lại phần đãi ngộ ngoài lương, và soạn một câu trả lời có lý do thay vì một phản xạ.",
      },
    ],
    keyTakeaways: [
      "Ai nói con số trước sẽ đặt neo, và ở vòng đầu bạn là bên có ít thông tin hơn",
      "Lương cũ đưa vào bàn sẽ biến cuộc đàm phán thành phép cộng phần trăm trên một con số có thể đã sai",
      "Đòn bẩy lớn nhất nằm giữa lúc có lời mời và lúc ký, không sớm hơn và không muộn hơn",
      "Xin một ngày suy nghĩ là chuẩn mực, và nó đổi cảm xúc lấy một câu trả lời có lý do",
    ],
    practicePrompt: {
      question:
        "Nhà tuyển dụng nói ngân sách vị trí này tối đa 20 triệu, trong khi dải thị trường là 22 đến 28. Bước hợp lý nhất?",
      options: [
        "Hỏi về các phần đãi ngộ khác và lộ trình xem xét lại mức lương bằng văn bản",
        "Chấp nhận 20 triệu ngay vì ngân sách công ty là giới hạn không thể thay đổi",
        "Nói thẳng rằng công ty đang trả dưới thị trường và yêu cầu họ điều chỉnh lại",
        "Rút lui khỏi quy trình vì mức chào thấp hơn dải là dấu hiệu công ty không nghiêm túc",
      ],
      correct: 0,
      explanation:
        "Ngân sách lương thường cứng hơn các phần khác - thưởng ký hợp đồng, số ngày phép, thời điểm xem xét lại lương thì linh hoạt hơn nhiều. Chốt được mốc xem xét lại bằng văn bản biến một lời hứa miệng thành cam kết có ngày tháng.",
    },
    summary: {
      keyIdea: "Đòn bẩy lớn nhất nằm giữa lời mời và chữ ký - và nó chỉ tồn tại một lần cho mỗi công việc",
      commonMistake: "Nói con số trước, hoặc lấy lương hiện tại làm điểm xuất phát cho cuộc thương lượng",
      action: "Chuẩn bị sẵn một câu hỏi ngược về dải ngân sách, và một dải của riêng bạn dựa trên khảo sát.",
    },
    application: {
      title: "Soạn trước hai câu",
      message:
        "Viết ra câu bạn sẽ dùng khi bị hỏi mức lương mong muốn ở vòng đầu, và câu bạn sẽ dùng để phản hồi một lời mời thấp hơn dải. Đọc to hai câu đó vài lần - phần lớn người ta mất đòn bẩy vì lúng túng chứ không vì thiếu lý lẽ.",
      secondary:
        "Cả hai câu nên gắn con số với phạm vi công việc đã trao đổi, chứ không gắn với nhu cầu cá nhân của bạn.",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn đã có dải thị trường từ bài trước. Bài này nói về mười phút quyết định bạn đứng ở đâu trong dải ấy - và vì sao mười phút đó chỉ đến một lần cho mỗi công việc.",
      },
      { type: "heading", text: "Ai nói trước thì người đó đặt neo" },
      {
        type: "paragraph",
        text: "Con số đầu tiên xuất hiện trong cuộc trao đổi kéo mọi con số sau về phía nó, kể cả khi cả hai bên đều biết đó chỉ là điểm khởi đầu. Ở vòng phỏng vấn đầu, bạn là bên có ít thông tin hơn: họ biết ngân sách của vị trí, bạn thì không. Neo do bên thiếu thông tin đặt ra gần như luôn lệch về phía bất lợi cho chính họ.",
      },
      {
        type: "conceptTable",
        title: "Ba câu trả lời cho câu hỏi mức lương mong muốn",
        subtitle: "Xếp theo mức độ giữ được đòn bẩy",
        concepts: [
          {
            vi: "Hỏi ngược về dải",
            en: "Deflect to their range",
            def: "Tốt nhất: chuyển câu hỏi về phía có thông tin. Phần lớn nhà tuyển dụng có sẵn dải và việc hỏi là bình thường, không bị coi là né tránh.",
          },
          {
            vi: "Đưa dải thị trường",
            en: "Anchor with a researched range",
            def: "Dùng khi buộc phải nói trước. Đưa dải kèm nguồn, không đưa một con số - dải cho thấy bạn đã tra cứu chứ không phải đang mặc cả.",
          },
          {
            vi: "Nói lương hiện tại",
            en: "Disclose current pay",
            def: "Tệ nhất: nó đổi chủ đề từ giá trị công việc sang lịch sử lương của bạn, và mọi sai lệch cũ đi theo sang chỗ mới.",
          },
        ],
      },
      {
        type: "callout",
        label: "Lời hứa xem xét lại sau sáu tháng gần như không bao giờ thành hiện thực",
        text: "Không phải vì ai đó nói dối, mà vì đòn bẩy đã biến mất từ lúc bạn ký. Người quản lý đề xuất tăng lương cho bạn khi đó phải đi thuyết phục cùng bộ máy ấy mà không còn lý do cấp bách nào. Nếu nhận một lời hứa như vậy, hãy xin nó bằng văn bản kèm mốc thời gian và tiêu chí cụ thể.",
      },
      {
        type: "list",
        items: [
          "Hoãn con số càng lâu càng tốt, lý tưởng là tới khi đã có lời mời",
          "Nếu buộc phải nói, hãy nói dải có nguồn chứ đừng nói một con số có nhu cầu",
          "Xin một ngày suy nghĩ - đây là chuẩn mực, không phải đòi hỏi",
          "Khi ngân sách lương cứng, hãy chuyển sang thưởng ký hợp đồng, ngày phép và mốc xem xét lại",
        ],
      },
      {
        type: "closing",
        lines: [
          "Mức lương bạn chốt hôm ký là nền tính phần trăm cho nhiều năm sau đó, ở cả nơi này lẫn nơi kế tiếp.",
          "Bài sau: đàm phán khi bạn đang ở trong công ty - ít đòn bẩy hơn, nhưng không phải là không có.",
        ],
      },
    ],
  },
  {
    id: 303,
    slug: "dam-phan-tang-luong-o-cong-ty-hien-tai",
    title: "Chặng 11, Bài 4: Đàm phán tăng lương ở công ty hiện tại",
    subtitle: "Ít đòn bẩy hơn lúc nhận việc, nhưng bù lại bạn có thứ ứng viên bên ngoài không có",
    duration: "8 phút",
    difficulty: "Trung bình",
    emoji: "📊",
    track: "personal",
    whyItMatters:
      "Phần lớn người đi làm chờ tới kỳ đánh giá cuối năm rồi hy vọng, và nhận về mức tăng theo mặt bằng chung - thứ được quyết định trước khi cuộc trò chuyện diễn ra. Cuộc đàm phán thật xảy ra sớm hơn thế nhiều tháng, và nó cần một loại bằng chứng khác hẳn.",
    openingQuestion: "Lý do nào có sức thuyết phục nhất khi đề nghị tăng lương?",
    openingOptions: [
      "Bạn đã gắn bó với công ty đủ lâu và chưa được tăng lương trong hai năm qua",
      "Phạm vi công việc của bạn đã mở rộng và có kết quả đo được đi kèm",
      "Chi phí sinh hoạt tăng khiến mức lương hiện tại không còn đủ sống như trước",
      "Đồng nghiệp cùng cấp ở phòng bên đang được trả cao hơn bạn khá nhiều",
    ],
    correctOption: 1,
    explanation:
      "Thâm niên đo thời gian chứ không đo giá trị, và người quản lý không có ngân sách riêng cho thời gian. Chi phí sinh hoạt là vấn đề của bạn, không phải của công ty - nó không nói gì về việc công việc bạn làm đáng giá bao nhiêu. So sánh với đồng nghiệp thường phản tác dụng: nó biến cuộc trò chuyện thành chuyện công bằng nội bộ, và câu trả lời dễ nhất là giải thích vì sao trường hợp kia khác. Thứ duy nhất người quản lý mang đi thuyết phục được cấp trên là phạm vi công việc đã lớn hơn mức lương đang trả, kèm kết quả đo được.",
    diagram: [
      { label: "Ghi lại kết quả đo được suốt cả năm", arrow: true },
      { label: "Đối chiếu phạm vi hiện tại với mô tả cũ", arrow: true },
      { label: "Đặt vấn đề trước kỳ chốt ngân sách", arrow: true },
      { label: "Đề nghị con số kèm dải thị trường" },
    ],
    realWorldExample: {
      company: "Hai cuộc trò chuyện, hai kết quả",
      description:
        "Người thứ nhất vào phòng quản lý nói rằng đã ba năm chưa tăng lương và giá cả thì leo thang. Người thứ hai mang theo một trang giấy: nhận thêm hai đầu việc từ người nghỉ việc, rút thời gian chốt sổ từ mười ngày xuống sáu, và dải thị trường cho phạm vi mới. Người thứ nhất được tăng theo mặt bằng chung; người thứ hai được xét lại bậc lương.",
    },
    quiz: [
      {
        question: "Vì sao thâm niên là lý do yếu khi đề nghị tăng lương?",
        options: [
          "Vì nó đo thời gian đã ở lại chứ không đo giá trị công việc đang làm",
          "Vì luật lao động đã quy định mức tăng theo thâm niên nên không cần đàm phán",
          "Vì công ty luôn ưu tiên tuyển người mới với chi phí thấp hơn người cũ",
          "Vì thâm niên chỉ được tính khi người lao động ký hợp đồng không xác định hạn",
        ],
        correct: 0,
        explanation:
          "Một người ở lại năm năm mà phạm vi công việc không đổi thì đang làm đúng công việc đã được định giá năm năm trước. Thời gian tự nó không tạo ra giá trị mới, nên nó không mở được ngân sách nào.",
      },
      {
        question: "Vì sao viện dẫn chi phí sinh hoạt thường không hiệu quả?",
        options: [
          "Vì nó nói về nhu cầu của bạn chứ không nói gì về giá trị công việc",
          "Vì công ty đã tính trượt giá vào mức tăng lương chung hằng năm rồi",
          "Vì chỉ số giá tiêu dùng do cơ quan thống kê công bố mới có giá trị pháp lý",
          "Vì mọi nhân viên đều chịu chung mức trượt giá nên không ai có lợi thế riêng",
        ],
        correct: 0,
        explanation:
          "Đây là cùng một sai lầm với việc lấy chi phí sinh hoạt làm căn cứ khi phỏng vấn. Người quản lý cần một lý do có thể mang lên cấp trên, và cấp trên phê duyệt ngân sách theo giá trị công việc chứ không theo hoàn cảnh cá nhân.",
      },
      {
        question: "Thời điểm nào nên đặt vấn đề tăng lương?",
        options: [
          "Trước kỳ chốt ngân sách của công ty, không phải lúc thông báo kết quả",
          "Ngay sau khi nhận được kết quả đánh giá cuối năm để phản hồi kịp thời",
          "Vào đúng ngày kỷ niệm ký hợp đồng lao động của bạn với công ty",
          "Khi công ty vừa công bố một quý kinh doanh có lợi nhuận cao kỷ lục",
        ],
        correct: 0,
        explanation:
          "Tới kỳ thông báo kết quả thì con số đã được duyệt xong từ nhiều tuần trước, và người quản lý chỉ đang đọc lại nó. Cuộc trò chuyện có tác dụng phải xảy ra khi ngân sách còn đang được đề xuất.",
      },
      {
        question:
          "Bạn nhận thêm hai đầu việc từ đồng nghiệp nghỉ. Cách trình bày nào mạnh nhất?",
        options: [
          "Nêu phạm vi mới kèm dải thị trường cho phạm vi đó, không nêu số giờ tăng thêm",
          "Nêu tổng số giờ làm thêm mỗi tuần kể từ khi đồng nghiệp nghỉ việc",
          "Nêu rằng công ty đang tiết kiệm được toàn bộ lương của người đã nghỉ",
          "Nêu rằng bạn sẽ buộc phải từ chối bớt việc nếu mức lương không sớm được điều chỉnh",
        ],
        correct: 0,
        explanation:
          "Số giờ đo nỗ lực, mà nỗ lực không phải thứ được trả tiền. Chuyện công ty tiết kiệm được bao nhiêu là lập luận về ngân sách của họ chứ không về giá trị của bạn. Phạm vi công việc lớn hơn khớp với một dải lương cao hơn là lập luận duy nhất dùng được ở cấp phê duyệt.",
      },
      {
        question: "Nên chuẩn bị bằng chứng cho cuộc trò chuyện này từ khi nào?",
        options: [
          "Ghi lại kết quả ngay khi chúng xảy ra, suốt cả năm",
          "Khoảng hai tuần trước buổi trao đổi là đủ để tổng hợp lại",
          "Chỉ cần chuẩn bị nếu người quản lý yêu cầu bằng chứng cụ thể",
          "Sau khi đã nhận được mức tăng và muốn khiếu nại về con số đó",
        ],
        correct: 0,
        explanation:
          "Kết quả của tháng Ba sẽ biến mất khỏi trí nhớ vào tháng Mười một, và thứ biến mất trước tiên luôn là con số cụ thể - đúng phần có sức nặng nhất. Một ghi chép chạy suốt năm biến trí nhớ thành hồ sơ.",
      },
    ],
    keyTakeaways: [
      "Thâm niên đo thời gian, chi phí sinh hoạt đo nhu cầu - cả hai đều không đo giá trị công việc",
      "So sánh với đồng nghiệp biến cuộc trò chuyện thành chuyện công bằng nội bộ, và bạn sẽ thua ở đó",
      "Đặt vấn đề trước kỳ chốt ngân sách; tới lúc công bố kết quả thì con số đã duyệt xong",
      "Ghi kết quả ngay khi xảy ra - thứ mất trước nhất khỏi trí nhớ là con số cụ thể",
    ],
    practicePrompt: {
      question:
        "Người quản lý nói năm nay quỹ lương bị đóng băng nên không thể tăng cho ai. Bước hợp lý nhất?",
      options: [
        "Chốt tiêu chí và mốc thời gian xem xét lại bằng văn bản cho lần mở quỹ kế tiếp",
        "Chấp nhận và đợi tới kỳ đánh giá năm sau rồi đặt lại vấn đề từ đầu",
        "Nộp đơn xin nghỉ ngay để tạo áp lực buộc công ty phải cân nhắc lại",
        "Đề nghị giảm bớt khối lượng công việc đang làm cho tương xứng với mức lương hiện tại",
      ],
      correct: 0,
      explanation:
        "Quỹ đóng băng thường là sự thật, và ép vào một cánh cửa đang khóa chỉ làm hỏng quan hệ. Nhưng một lời hứa không có tiêu chí và không có ngày tháng thì năm sau sẽ bắt đầu lại từ con số không - văn bản là thứ biến nó thành điểm xuất phát.",
    },
    summary: {
      keyIdea: "Người quản lý cần một lý do mang lên cấp trên được, và chỉ phạm vi công việc kèm kết quả đo được làm nổi việc đó",
      commonMistake: "Đợi tới kỳ đánh giá cuối năm, rồi lập luận bằng thâm niên hoặc chi phí sinh hoạt",
      action: "Mở một ghi chép kết quả từ hôm nay, và tìm hiểu công ty chốt ngân sách lương vào tháng nào.",
    },
    application: {
      title: "Một trang giấy, ba phần",
      message:
        "Viết ra: phạm vi công việc lúc bạn được tuyển, phạm vi hiện tại, và ba kết quả có con số. Nếu phần giữa dài hơn phần đầu rõ rệt, bạn đã có nội dung cho cuộc trò chuyện.",
      secondary:
        "Hỏi bộ phận nhân sự công ty chốt ngân sách lương vào tháng nào - đó là thông tin công khai và nó quyết định thời điểm bạn mở lời.",
    },
    sections: [
      {
        type: "lead",
        text: "Ở trong công ty bạn mất đòn bẩy lớn nhất - khả năng đi chỗ khác - nhưng lại có thứ ứng viên bên ngoài không bao giờ có: bằng chứng đã được kiểm chứng về việc bạn làm được gì ở đúng nơi này.",
      },
      { type: "heading", text: "Ba lý do ai cũng dùng và đều yếu" },
      {
        type: "paragraph",
        text: "Thâm niên đo thời gian ở lại, không đo giá trị tạo ra. Chi phí sinh hoạt đo nhu cầu của bạn, và nhu cầu không phải thứ công ty mua. So sánh với đồng nghiệp thì nguy hiểm nhất: nó chuyển chủ đề sang công bằng nội bộ, nơi câu trả lời dễ nhất luôn là giải thích vì sao trường hợp kia khác bạn - và bạn không có thông tin để phản bác.",
      },
      {
        type: "conceptTable",
        title: "Đổi lập luận yếu lấy lập luận mạnh",
        subtitle: "Cùng một sự thật, nhưng chỉ một cách diễn đạt mang lên cấp trên được",
        concepts: [
          {
            vi: "Tôi làm nhiều giờ hơn",
            en: "Effort framing",
            def: "Đo nỗ lực. Người phê duyệt không có ngân sách cho nỗ lực, và câu trả lời tự nhiên là bàn về cách bạn sắp xếp công việc.",
          },
          {
            vi: "Phạm vi của tôi đã rộng hơn",
            en: "Scope framing",
            def: "Đo công việc. Nó so được với mô tả vị trí lúc tuyển và so được với dải thị trường - hai thứ mà cấp phê duyệt vốn đã dùng.",
          },
          {
            vi: "Đây là kết quả có con số",
            en: "Outcome evidence",
            def: "Biến lập luận thành dữ liệu. Rút thời gian chốt sổ từ mười ngày xuống sáu là một câu ai cũng kiểm chứng được.",
          },
        ],
      },
      {
        type: "callout",
        label: "Đừng dùng lời mời từ nơi khác làm vũ khí trừ khi bạn sẵn sàng đi",
        text: "Nó có tác dụng, và nó tiêu tốn thứ khó xây lại: niềm tin rằng bạn muốn ở lại. Nhiều nơi giữ người bằng mức lương cao hơn rồi bắt đầu tìm người thay thế. Nếu bạn thật sự muốn ở lại, hãy đàm phán bằng phạm vi công việc trước - và để lời mời bên ngoài cho tình huống bạn thật sự sẵn sàng nhận nó.",
      },
      {
        type: "closing",
        lines: [
          "Cuộc trò chuyện diễn ra vào tháng Mười một, nhưng nó được chuẩn bị từ tháng Giêng.",
          "Bài sau: lương chỉ là một phần của đãi ngộ, và phần còn lại thường không được đem ra so sánh.",
        ],
      },
    ],
  },
  {
    id: 304,
    slug: "tong-dai-ngo-khong-chi-luong-gross",
    title: "Chặng 11, Bài 5: Tổng đãi ngộ - không chỉ lương gross",
    subtitle: "Hai lời mời cùng 25 triệu có thể chênh nhau bốn mươi triệu mỗi năm",
    duration: "7 phút",
    difficulty: "Trung bình",
    emoji: "🎁",
    track: "personal",
    whyItMatters:
      "Người ta so sánh hai công việc bằng đúng một con số, vì đó là con số dễ hỏi nhất. Nhưng phần đãi ngộ nằm ngoài lương cơ bản thường chiếm hai tới ba tháng lương mỗi năm, và nó khác nhau rất nhiều giữa các nơi - nên so bằng lương gross là so sai ngay từ đơn vị.",
    openingQuestion:
      "Nơi A trả 25 triệu, thưởng tháng 13. Nơi B trả 25 triệu, thưởng hai tháng và đóng bảo hiểm trên toàn lương. Kết luận đúng?",
    openingOptions: [
      "Hai nơi trả như nhau vì lương hằng tháng của cả hai đều là 25 triệu",
      "Nơi B trả cao hơn đáng kể khi tính cả năm và cả phần bảo hiểm",
      "Nơi A trả cao hơn vì thưởng tháng 13 được miễn thuế thu nhập cá nhân",
      "Không so sánh được vì thưởng phụ thuộc kết quả kinh doanh từng năm",
    ],
    correctOption: 1,
    explanation:
      "Chênh lệch một tháng thưởng đã là 25 triệu mỗi năm, tức hơn 8% tổng thu nhập. Phần đóng bảo hiểm trên toàn lương còn quan trọng hơn về dài hạn: mức đóng quyết định lương hưu và các khoản trợ cấp sau này, và nhiều nơi chỉ đóng trên mức tối thiểu để giảm chi phí. Thưởng tháng 13 không được miễn thuế - nó là thu nhập chịu thuế như lương. Còn chuyện thưởng phụ thuộc kết quả kinh doanh là lý do để hỏi về lịch sử chi trả vài năm gần nhất, chứ không phải lý do để bỏ nó khỏi phép so sánh.",
    diagram: [
      { label: "Lương cơ bản mười hai tháng", arrow: true },
      { label: "Cộng thưởng và các khoản định kỳ", arrow: true },
      { label: "Xét mức đóng bảo hiểm và phúc lợi", arrow: true },
      { label: "Giờ mới so được hai lời mời" },
    ],
    realWorldExample: {
      company: "Cùng 25 triệu, chênh gần bốn mươi triệu",
      description:
        "Nơi A: 25 triệu, thưởng một tháng, đóng bảo hiểm trên mức tối thiểu, mười hai ngày phép. Nơi B: 25 triệu, thưởng hai tháng, đóng bảo hiểm trên toàn lương, mười tám ngày phép và hỗ trợ ăn trưa. Tính cả năm, nơi B hơn khoảng ba mươi lăm tới bốn mươi triệu - và sáu ngày phép thêm còn chưa được quy ra tiền.",
    },
    quiz: [
      {
        question: "Vì sao mức đóng bảo hiểm xã hội đáng đưa vào phép so sánh?",
        options: [
          "Vì mức đóng hôm nay quyết định lương hưu và các khoản trợ cấp sau này",
          "Vì người lao động được nhận lại toàn bộ số tiền đã đóng khi nghỉ việc",
          "Vì mức đóng cao hơn giúp giảm số thuế thu nhập cá nhân phải nộp mỗi tháng",
          "Vì công ty đóng bảo hiểm càng cao thì càng ít khả năng chậm trả lương",
        ],
        correct: 0,
        explanation:
          "Nhiều nơi tách lương thành phần cơ bản thấp cộng phụ cấp, rồi chỉ đóng bảo hiểm trên phần cơ bản. Tiền về tay hằng tháng nhìn giống nhau, nhưng khoản tích lũy dài hạn thì không.",
      },
      {
        question: "Thưởng tháng 13 được xử lý thế nào về thuế?",
        options: [
          "Là thu nhập chịu thuế thu nhập cá nhân giống như tiền lương",
          "Được miễn thuế hoàn toàn vì mang tính chất phúc lợi cuối năm",
          "Chỉ chịu thuế phần vượt quá một tháng lương cơ bản của người lao động",
          "Chịu thuế suất cố định thấp hơn mức áp dụng cho thu nhập từ lương",
        ],
        correct: 0,
        explanation:
          "Đây là ngộ nhận phổ biến vì khoản này về tay vào dịp cuối năm và cảm giác như quà. Về bản chất nó là tiền công, và nó cộng vào thu nhập chịu thuế của kỳ nhận.",
      },
      {
        question: "Cách hỏi nào cho thông tin đáng tin nhất về thưởng?",
        options: [
          "Hỏi mức thưởng thực chi trong hai tới ba năm gần nhất của vị trí đó",
          "Hỏi mức thưởng tối đa mà công ty từng chi trả cho một nhân viên",
          "Hỏi công thức tính thưởng được ghi trong quy chế nội bộ của công ty",
          "Hỏi xem thưởng có được cam kết bằng văn bản trong hợp đồng hay không",
        ],
        correct: 0,
        explanation:
          "Mức tối đa là một điểm ngoại lệ và công thức trên giấy thường có nhiều biến do công ty tự quyết. Lịch sử chi trả vài năm cho biết điều duy nhất bạn cần: nơi này thường trả bao nhiêu.",
      },
      {
        question: "Vì sao ngày phép nên được quy ra tiền khi so sánh?",
        options: [
          "Vì mỗi ngày phép thêm tương đương một ngày công được trả mà không phải làm",
          "Vì ngày phép không dùng hết luôn được công ty thanh toán bằng tiền mặt",
          "Vì số ngày phép quyết định mức đóng bảo hiểm thất nghiệp hằng tháng",
          "Vì luật đã quy định số ngày phép tối thiểu nên nơi nào cho ít hơn thế là vi phạm",
        ],
        correct: 0,
        explanation:
          "Sáu ngày phép chênh lệch trên nền lương 25 triệu là khoảng bảy triệu mỗi năm nếu quy theo ngày công. Không phải nơi nào cũng thanh toán phép chưa dùng, nên giá trị thật của nó nằm ở chỗ bạn được nghỉ mà vẫn nhận lương.",
      },
      {
        question: "Khi ngân sách lương đã kịch trần, phần nào thường còn thương lượng được?",
        options: [
          "Thưởng ký hợp đồng, ngày phép và mốc xem xét lại mức lương",
          "Mức đóng bảo hiểm xã hội, vì công ty tự quyết định tỷ lệ đóng",
          "Thuế suất thu nhập cá nhân áp dụng cho phần lương vượt ngưỡng",
          "Số ngày nghỉ lễ trong năm theo quy định chung của nhà nước",
        ],
        correct: 0,
        explanation:
          "Quỹ lương thường bị ràng buộc bởi bậc lương và mặt bằng nội bộ, nên nó cứng. Các khoản chi một lần hoặc không nằm trong bậc lương thì linh hoạt hơn nhiều - và chúng vẫn là tiền thật.",
      },
    ],
    keyTakeaways: [
      "So hai công việc bằng lương gross là so sai đơn vị - phần ngoài lương thường bằng hai tới ba tháng mỗi năm",
      "Mức đóng bảo hiểm quyết định khoản tích lũy dài hạn, và nhiều nơi chỉ đóng trên phần lương cơ bản",
      "Thưởng tháng 13 là thu nhập chịu thuế, không phải khoản được miễn",
      "Khi quỹ lương đã cứng, thưởng ký hợp đồng và ngày phép là chỗ còn thương lượng được",
    ],
    practicePrompt: {
      question:
        "Nơi A: 28 triệu, thưởng một tháng. Nơi B: 25 triệu, thưởng ba tháng. Cách so đúng là gì?",
      options: [
        "Tính tổng cả năm của từng nơi rồi mới so, kèm hỏi lịch sử chi trả thưởng",
        "Chọn nơi A vì lương hằng tháng cao hơn nên dòng tiền đều đặn hơn",
        "Chọn nơi B vì tổng cả năm luôn cao hơn khi số tháng thưởng nhiều gấp ba",
        "Không so được vì thưởng là khoản không chắc chắn còn lương thì chắc chắn",
      ],
      correct: 0,
      explanation:
        "A cho 364 triệu, B cho 375 triệu - B nhỉnh hơn, nhưng khoảng cách nhỏ hơn nhiều so với cảm giác khi nghe ba tháng thưởng. Và toàn bộ phần chênh lệch của B nằm ở khoản phụ thuộc kết quả kinh doanh, nên lịch sử chi trả mới là thứ quyết định.",
    },
    summary: {
      keyIdea: "Đơn vị so sánh đúng là tổng đãi ngộ cả năm, không phải con số trên bảng lương tháng",
      commonMistake: "So hai lời mời bằng lương gross rồi bỏ qua thưởng, mức đóng bảo hiểm và ngày phép",
      action: "Lập một bảng hai cột quy mọi khoản về tổng cả năm trước khi quyết định.",
    },
    application: {
      title: "Bảng hai cột",
      message:
        "Với mỗi lời mời, ghi: lương nhân mười hai, cộng thưởng theo lịch sử chi trả, cộng các khoản định kỳ, rồi ghi riêng mức đóng bảo hiểm và số ngày phép. Con số cuối cùng mới là thứ đem so.",
      secondary:
        "Nếu một nơi từ chối cho biết lịch sử chi trả thưởng, hãy coi phần thưởng đó bằng không khi tính - đó là cách định giá thận trọng và thường là đúng.",
    },
    sections: [
      {
        type: "lead",
        text: "Câu hỏi lương bao nhiêu có một câu trả lời gọn gàng, và đó chính là vấn đề: nó gọn vì nó bỏ qua phần lớn những thứ công ty thật sự trả cho bạn.",
      },
      { type: "heading", text: "Những khoản không nằm trên bảng lương tháng" },
      {
        type: "paragraph",
        text: "Thưởng cuối năm là khoản lớn nhất và biến động nhất. Mức đóng bảo hiểm là khoản ít ai hỏi nhất và có ảnh hưởng dài nhất, vì nhiều nơi tách lương thành phần cơ bản thấp cộng phụ cấp rồi chỉ đóng trên phần cơ bản. Ngày phép, hỗ trợ ăn trưa, đi lại, bảo hiểm sức khỏe cho người thân - mỗi khoản nhỏ, cộng lại thường bằng một tháng lương nữa.",
      },
      {
        type: "conceptTable",
        title: "Bốn nhóm cần hỏi trước khi so sánh",
        subtitle: "Ba nhóm đầu quy được ra tiền, nhóm cuối thì không nhưng vẫn phải cân nhắc",
        concepts: [
          {
            vi: "Tiền mặt định kỳ",
            en: "Cash compensation",
            def: "Lương mười hai tháng, thưởng theo lịch sử chi trả, phụ cấp cố định. Hỏi số thực chi vài năm gần nhất chứ đừng hỏi công thức.",
          },
          {
            vi: "Khoản tích lũy dài hạn",
            en: "Long-term accrual",
            def: "Mức đóng bảo hiểm xã hội trên lương nào. Không ảnh hưởng tiền về tay tháng này, quyết định rất nhiều tới lương hưu sau này.",
          },
          {
            vi: "Thời gian",
            en: "Time off",
            def: "Ngày phép, chế độ làm việc linh hoạt. Quy được ra tiền theo ngày công, và thường là khoản dễ thương lượng nhất.",
          },
          {
            vi: "Không quy ra tiền được",
            en: "Non-monetary",
            def: "Người quản lý trực tiếp, cơ hội học nghề, quãng đường đi làm. Không có trong bảng tính, nhưng quyết định bạn ở lại bao lâu.",
          },
        ],
      },
      {
        type: "callout",
        label: "Khoản không cam kết bằng văn bản thì hãy định giá bằng không",
        text: "Thưởng miệng, cổ phần hứa hẹn, mốc tăng lương nói cho vui - đó không phải lời nói dối, nhưng chúng phụ thuộc vào những người và điều kiện có thể thay đổi. Cách tính thận trọng là để chúng ngoài phép so sánh, rồi coi mọi thứ xảy ra như phần thêm.",
      },
      {
        type: "closing",
        lines: [
          "Hai lời mời cùng một con số lương có thể chênh nhau hơn một tháng lương mỗi năm, và không ai nói cho bạn biết trừ khi bạn hỏi.",
          "Bài sau: khi cả lương lẫn đãi ngộ đã kịch trần, nguồn thu nhập thứ hai bắt đầu có ý nghĩa.",
        ],
      },
    ],
  },
  {
    id: 305,
    slug: "nghe-tay-trai-chon-cai-cong-don",
    title: "Chặng 11, Bài 6: Nghề tay trái - chọn cái cộng dồn với việc chính",
    subtitle: "Có loại việc phụ làm bạn giỏi hơn ở việc chính, và có loại chỉ đổi giờ lấy tiền",
    duration: "8 phút",
    difficulty: "Trung bình",
    emoji: "🌱",
    track: "personal",
    whyItMatters:
      "Nghề tay trái được quảng cáo như một cách kiếm thêm, và phần lớn lựa chọn phổ biến đúng là như vậy - đổi giờ rảnh lấy tiền, hết giờ thì hết tiền. Nhưng một số việc phụ vừa trả tiền vừa xây thêm kỹ năng và quan hệ có ích cho việc chính, và khác biệt giữa hai loại quyết định bạn ở đâu sau ba năm.",
    openingQuestion: "Điều gì phân biệt một nghề tay trái tốt với một nghề chỉ kiếm thêm?",
    openingOptions: [
      "Nghề tay trái tốt trả theo giờ cao hơn mức lương theo giờ của việc chính",
      "Nghề tay trái tốt để lại kỹ năng, tác phẩm hoặc quan hệ dùng được về sau",
      "Nghề tay trái tốt không đòi hỏi bất kỳ khoản đầu tư ban đầu nào cả",
      "Nghề tay trái tốt có thể làm hoàn toàn tự động mà không cần bạn tham gia",
    ],
    correctOption: 1,
    explanation:
      "Mức trả theo giờ cao là điều kiện tốt nhưng không phân biệt được hai loại: chạy xe ban đêm có thể trả cao hơn lương giờ của bạn mà không để lại gì. Việc không cần vốn cũng vậy - nó nói về rào cản gia nhập chứ không nói về giá trị tích lũy. Còn thu nhập hoàn toàn tự động thì gần như không tồn tại ở giai đoạn đầu, và tin rằng nó tồn tại là lý do phổ biến nhất khiến người ta mất tiền. Thứ phân biệt thật là cái đọng lại sau khi việc đã xong: một kỹ năng sâu hơn, một sản phẩm cho người sau xem, hay một mối quan hệ mang tới việc tiếp theo.",
    diagram: [
      { label: "Việc phụ tiêu giờ và trả tiền", arrow: true },
      { label: "Hỏi: sau khi xong còn đọng lại gì", arrow: true },
      { label: "Kỹ năng, tác phẩm, quan hệ đọng lại", arrow: true },
      { label: "Chúng nâng cả thu nhập chính lẫn phụ" },
    ],
    realWorldExample: {
      company: "Hai người cùng bỏ ra mười giờ mỗi tuần",
      description:
        "Một kế toán viên nhận làm sổ sách cho ba hộ kinh doanh nhỏ vào cuối tuần: thu nhập thêm khoảng sáu triệu mỗi tháng, và sau hai năm là kinh nghiệm xử lý ba mô hình kinh doanh khác nhau cùng một mạng lưới khách hàng. Một người khác chạy xe công nghệ buổi tối, thu nhập tương đương, và sau hai năm vẫn là một người chạy xe buổi tối. Cả hai đều làm việc thật; chỉ một người có thứ tích lũy lại.",
    },
    quiz: [
      {
        question: "Vì sao thu nhập theo giờ không phải tiêu chí chọn nghề tay trái tốt nhất?",
        options: [
          "Vì nó chỉ đo tiền của giờ hiện tại, không đo phần đọng lại cho các năm sau",
          "Vì thu nhập theo giờ của nghề phụ luôn thấp hơn của công việc toàn thời gian",
          "Vì các khoản thu nhập ngoài lương đều phải chịu thuế suất cao hơn tiền lương",
          "Vì làm theo giờ khiến người lao động không được đóng bảo hiểm xã hội",
        ],
        correct: 0,
        explanation:
          "Hai việc trả cùng một mức mỗi giờ có thể để lại hai kết quả hoàn toàn khác sau ba năm. Tiền là phần thấy ngay; phần tích lũy chỉ hiện ra khi bạn nhìn lại và thấy mình làm được việc mà trước kia không làm được.",
      },
      {
        question: "Rủi ro lớn nhất của một nghề tay trái không liên quan gì tới việc chính là gì?",
        options: [
          "Nó tiêu năng lượng nhưng không nâng được giá trị của bạn ở việc chính",
          "Nó khiến người lao động vi phạm điều khoản độc quyền trong hợp đồng",
          "Nó buộc bạn phải đăng ký hộ kinh doanh và nộp thuế theo hình thức khoán",
          "Nó luôn đòi hỏi vốn đầu tư ban đầu lớn hơn khả năng của người mới bắt đầu",
        ],
        correct: 0,
        explanation:
          "Giờ và sức là nguồn lực hữu hạn, và việc chính vẫn là nơi tạo ra phần lớn thu nhập. Một việc phụ rút năng lượng khỏi đó mà không trả lại gì ngoài tiền mặt trước mắt có thể làm chậm chính đòn bẩy lớn nhất của bạn.",
      },
      {
        question: "Dấu hiệu nào cho thấy một việc phụ đang cộng dồn?",
        options: [
          "Mỗi lần làm lại nhanh hơn hoặc bán được giá cao hơn lần trước",
          "Số giờ bạn bỏ ra mỗi tuần tăng đều đặn qua từng tháng",
          "Khách hàng mới đến hoàn toàn từ quảng cáo trả tiền chứ không qua giới thiệu",
          "Công việc lặp lại giống hệt nhau nên bạn không phải học thêm gì mới",
        ],
        correct: 0,
        explanation:
          "Cộng dồn hiện ra ở đường cong: cùng một việc mà tốn ít giờ hơn, hoặc cùng số giờ mà thu về nhiều hơn. Nếu năm thứ ba giống hệt năm thứ nhất về cả hai chỉ số, bạn đang đổi giờ lấy tiền chứ không đang xây gì cả.",
      },
      {
        question: "Nên bắt đầu nghề tay trái từ đâu?",
        options: [
          "Từ kỹ năng bạn đã có sẵn ở việc chính, để rút ngắn thời gian tới khách đầu tiên",
          "Từ lĩnh vực hoàn toàn mới để đa dạng hóa rủi ro nghề nghiệp của bạn",
          "Từ ngành đang được nhắc tới nhiều nhất trên mạng xã hội trong khoảng một năm gần đây",
          "Từ việc đòi hỏi vốn lớn, vì rào cản cao thì cạnh tranh sẽ ít hơn hẳn",
        ],
        correct: 0,
        explanation:
          "Khách hàng đầu tiên là chặng khó nhất, và kỹ năng sẵn có rút ngắn nó nhiều nhất. Bắt đầu từ lĩnh vực mới nghĩa là trả học phí bằng thời gian ở giai đoạn bạn có ít thời gian nhất - và phần lớn người bỏ cuộc ở đúng đoạn đó.",
      },
      {
        question: "Khi nào nên dừng một nghề tay trái?",
        options: [
          "Khi nó không còn cộng dồn và đang lấy đi năng lượng của việc chính",
          "Khi thu nhập từ nó chưa vượt được một phần ba thu nhập chính sau một năm",
          "Khi có người quen khác bắt đầu làm cùng lĩnh vực ở cùng khu vực",
          "Khi bạn đã đạt được mục tiêu tiết kiệm ngắn hạn ban đầu đặt ra",
        ],
        correct: 0,
        explanation:
          "Ngưỡng thu nhập là tiêu chí sai vì phần lớn việc phụ không bao giờ vượt được việc chính, và cũng không cần vượt. Câu hỏi đúng là nó đang xây hay đang bào mòn - và bào mòn việc chính là cái giá đắt nhất.",
      },
    ],
    keyTakeaways: [
      "Câu hỏi phân loại là sau khi xong việc còn đọng lại gì: kỹ năng, tác phẩm, hay quan hệ",
      "Cộng dồn hiện ra ở đường cong - cùng việc mà nhanh hơn, hoặc cùng giờ mà thu nhiều hơn",
      "Bắt đầu từ kỹ năng sẵn có rút ngắn chặng khó nhất là tìm khách hàng đầu tiên",
      "Việc phụ bào mòn việc chính là lỗ ròng, kể cả khi nó có lãi tính riêng",
    ],
    practicePrompt: {
      question:
        "Bạn có mười giờ rảnh mỗi tuần và hai lựa chọn trả tiền như nhau. Chọn thế nào?",
      options: [
        "Chọn việc để lại kỹ năng hoặc quan hệ dùng được cho công việc chính",
        "Chọn việc trả tiền ngay trong tuần đầu để có động lực duy trì lâu dài",
        "Chọn việc ít tốn công suy nghĩ nhất để giữ sức cho công việc ban ngày",
        "Chia đôi thời gian cho cả hai để thử xem việc nào phù hợp hơn với mình",
      ],
      correct: 0,
      explanation:
        "Khi tiền bằng nhau, biến còn lại là thứ đọng lại - và chỉ nó tạo ra khác biệt sau ba năm. Chia đôi nghe hợp lý nhưng thường cho ra hai việc đều chưa đủ sâu để qua được giai đoạn khó nhất của bất kỳ việc nào.",
    },
    summary: {
      keyIdea: "Nghề tay trái đáng làm là nghề để lại thứ dùng được sau khi công việc đã xong",
      commonMistake: "Chọn theo mức trả mỗi giờ, rồi ba năm sau vẫn đứng đúng chỗ cũ với nhiều giờ đã tiêu",
      action: "Với việc phụ bạn đang cân nhắc, viết ra chính xác thứ còn lại sau khi giao hàng xong.",
    },
    application: {
      title: "Phép thử một câu",
      message:
        "Với mỗi lựa chọn việc phụ, trả lời: sau một năm làm việc này, tôi làm được gì mà hôm nay chưa làm được? Nếu câu trả lời là không có gì, đó là việc đổi giờ lấy tiền - vẫn hợp lệ, nhưng hãy biết mình đang chọn gì.",
      secondary:
        "Việc đổi giờ lấy tiền có chỗ đứng chính đáng khi bạn cần tiền gấp trong một giai đoạn ngắn. Vấn đề chỉ xuất hiện khi giai đoạn ngắn kéo dài ba năm.",
    },
    sections: [
      {
        type: "lead",
        text: "Khi lương và đãi ngộ ở việc chính đã kịch trần trong ngắn hạn, nguồn thu nhập thứ hai là bước tiếp theo. Nhưng phần lớn lời khuyên về nghề tay trái chỉ so sánh tiền, mà tiền là biến ít quan trọng nhất trong lựa chọn này.",
      },
      { type: "heading", text: "Hai loại việc phụ trông giống hệt nhau trên bảng lương" },
      {
        type: "paragraph",
        text: "Cả hai đều tiêu mười giờ mỗi tuần và trả về một khoản tương đương. Khác biệt nằm ở thứ còn lại khi công việc kết thúc. Loại thứ nhất trả tiền rồi hết; giờ bạn bỏ ra tuần này không làm tuần sau dễ hơn. Loại thứ hai để lại một kỹ năng sâu hơn, một sản phẩm để người sau xem, hoặc một người sẽ giới thiệu bạn cho việc tiếp theo - và cả ba thứ đó đều nâng giá trị của bạn ở việc chính.",
      },
      {
        type: "conceptTable",
        title: "Ba thứ đáng để một việc phụ để lại",
        subtitle: "Nếu không có thứ nào trong ba, bạn đang đổi giờ lấy tiền",
        concepts: [
          {
            vi: "Kỹ năng sâu hơn",
            en: "Compounding skill",
            def: "Việc phụ buộc bạn làm phần mà việc chính không cho làm - nói chuyện với khách, ra giá, chịu trách nhiệm toàn bộ đầu ra.",
          },
          {
            vi: "Tác phẩm cho xem",
            en: "Portfolio",
            def: "Thứ tồn tại sau khi giao hàng và bán được lần sau. Đây là lý do việc phụ thứ ba luôn dễ tìm hơn việc phụ đầu tiên.",
          },
          {
            vi: "Quan hệ",
            en: "Network",
            def: "Khách hài lòng giới thiệu tiếp là kênh có chi phí thấp nhất và cũng bền nhất. Nó chỉ hình thành khi bạn làm cùng một nhóm khách đủ lâu.",
          },
        ],
      },
      {
        type: "callout",
        label: "Kiểm tra hợp đồng lao động trước khi bắt đầu",
        text: "Nhiều hợp đồng có điều khoản về công việc bên ngoài hoặc về xung đột lợi ích, đặc biệt khi việc phụ cùng ngành với việc chính. Đọc trước rẻ hơn nhiều so với xử lý sau, và trong phần lớn trường hợp thì chỉ cần thông báo là đủ.",
      },
      {
        type: "closing",
        lines: [
          "Việc phụ tốt không chỉ cộng thêm thu nhập, nó còn nâng cả mức trần của thu nhập chính.",
          "Bài sau: khi đã có khách, câu hỏi khó nhất là ra giá bao nhiêu.",
        ],
      },
    ],
  },
  {
    id: 306,
    slug: "dinh-gia-dich-vu-freelance",
    title: "Chặng 11, Bài 7: Định giá dịch vụ freelance",
    subtitle: "Lấy lương chia cho số giờ là cách nhanh nhất để làm việc nhiều hơn mà thu về ít hơn",
    duration: "8 phút",
    difficulty: "Trung bình",
    emoji: "🧮",
    track: "personal",
    whyItMatters:
      "Người mới làm tự do gần như luôn ra giá bằng cách chia lương tháng cho số giờ làm việc, rồi phát hiện mình kiếm ít hơn lúc đi làm dù bận hơn hẳn. Nguyên nhân không phải giá thấp một chút, mà là phép chia ấy bỏ sót ba khoản mà người làm công không phải nghĩ tới.",
    openingQuestion:
      "Lương 24 triệu, làm 160 giờ mỗi tháng. Ra giá 150 nghìn mỗi giờ khi làm tự do thì sao?",
    openingOptions: [
      "Hợp lý, vì nó bằng đúng mức lương theo giờ bạn đang được trả hiện nay",
      "Quá thấp, vì mức đó chưa tính giờ không bán được, chi phí và phần bảo hiểm tự lo",
      "Quá cao, vì khách hàng tự do thường trả thấp hơn mức lương của nhân viên",
      "Không đủ dữ liệu, vì còn phụ thuộc vào việc bạn làm cho khách trong nước hay nước ngoài",
    ],
    correctOption: 1,
    explanation:
      "Người làm công được trả cho cả những giờ không tạo ra sản phẩm bán được: họp, học, chờ việc. Người làm tự do thì không - và tỷ lệ giờ bán được thường chỉ quanh 60%. Người làm công cũng không tự trả tiền máy móc, phần mềm, chỗ ngồi, và không tự đóng toàn bộ bảo hiểm. Cộng ba khoản đó lại, mức 150 nghìn mỗi giờ tương đương thu nhập thực thấp hơn hẳn lương cũ. Con số đúng thường gấp rưỡi tới gấp đôi phép chia đơn giản, và đó không phải làm giá - đó là bù lại đúng những gì công ty từng gánh.",
    diagram: [
      { label: "Lương chia số giờ: điểm xuất phát", arrow: true },
      { label: "Chia cho tỷ lệ giờ thật sự bán được", arrow: true },
      { label: "Cộng chi phí công cụ và bảo hiểm tự lo", arrow: true },
      { label: "Ra mức giá giữ được thu nhập cũ" },
    ],
    realWorldExample: {
      company: "Bận gấp rưỡi, thu về ít hơn",
      description:
        "Một người thiết kế nghỉ việc với lương 24 triệu và ra giá 150 nghìn mỗi giờ. Sau sáu tháng, trung bình mỗi tháng bán được 95 giờ - phần còn lại là tìm khách, sửa theo góp ý không tính phí và làm báo giá. Doanh thu khoảng 14 triệu, trừ phần mềm và bảo hiểm tự đóng còn khoảng 11 triệu. Người này làm nhiều giờ hơn lúc đi làm và thu về chưa tới một nửa.",
    },
    quiz: [
      {
        question: "Vì sao tỷ lệ giờ bán được là biến quan trọng nhất khi định giá?",
        options: [
          "Vì toàn bộ chi phí sống phải được gánh bởi phần giờ có thu, không phải mọi giờ làm",
          "Vì khách hàng thường yêu cầu người làm tự do báo cáo chi tiết số giờ đã bỏ ra",
          "Vì cơ quan thuế tính thu nhập chịu thuế dựa trên tổng số giờ làm việc trong năm",
          "Vì phần mềm quản lý dự án tự động ghi lại thời gian nên không thể khai báo khác đi được",
        ],
        correct: 0,
        explanation:
          "Nếu chỉ 60% số giờ bán được, thì mỗi giờ có thu phải gánh phần của chính nó cộng thêm hai phần ba giờ không thu. Bỏ qua biến này là bỏ qua khoảng cách lớn nhất giữa giá báo và thu nhập thật.",
      },
      {
        question: "Khoản nào người làm công không phải nghĩ tới mà người làm tự do phải tự lo?",
        options: [
          "Phần bảo hiểm mà công ty vốn đóng, cộng công cụ và chỗ làm việc",
          "Thuế thu nhập cá nhân, vì người làm công được công ty nộp thay hoàn toàn",
          "Chi phí đi lại tới chỗ khách hàng trong giờ hành chính mỗi ngày",
          "Tiền ăn trưa và các khoản sinh hoạt cá nhân phát sinh trong ngày làm việc",
        ],
        correct: 0,
        explanation:
          "Thuế thì cả hai đều phải nộp, chỉ khác cách thu. Phần thật sự chuyển sang vai bạn là khoản công ty đóng bảo hiểm, cộng toàn bộ công cụ và chỗ ngồi mà trước kia có sẵn.",
      },
      {
        question: "Báo giá theo gói công việc thay vì theo giờ có lợi thế gì?",
        options: [
          "Nó gắn giá với kết quả nhận được, nên làm nhanh hơn không bị phạt bằng ít tiền hơn",
          "Nó giúp người làm tự do không phải kê khai thu nhập với cơ quan thuế",
          "Nó bảo đảm khách hàng sẽ không bao giờ yêu cầu chỉnh sửa gì thêm sau khi đã bàn giao",
          "Nó luôn cho doanh thu cao hơn tính theo giờ trong mọi loại dự án",
        ],
        correct: 0,
        explanation:
          "Tính theo giờ trừng phạt đúng người làm giỏi: bạn càng thạo thì càng nhanh, càng nhanh thì càng ít tiền. Giá theo gói tách thu nhập khỏi số giờ, nên kinh nghiệm bắt đầu được trả công.",
      },
      {
        question:
          "Muốn giữ mức sống tương đương lương 24 triệu, giờ bán được 60% và chi phí 3 triệu mỗi tháng thì nên ra giá quanh mức nào?",
        options: [
          "Khoảng 280 nghìn mỗi giờ (= 27 triệu ÷ 96 giờ bán được)",
          "Khoảng 150 nghìn mỗi giờ (= 24 triệu ÷ 160 giờ làm việc)",
          "Khoảng 170 nghìn mỗi giờ (= 27 triệu ÷ 160 giờ làm việc)",
          "Khoảng 250 nghìn mỗi giờ (= 24 triệu ÷ 96 giờ bán được)",
        ],
        correct: 0,
        explanation:
          "Cần 24 triệu về tay cộng 3 triệu chi phí, tức 27 triệu doanh thu. Chỉ 96 trong 160 giờ bán được, nên 27 triệu chia 96 ra khoảng 280 nghìn. Phương án 250 nghìn quên phần chi phí; hai phương án còn lại chia cho toàn bộ số giờ làm, tức giả định bán được hết.",
      },
      {
        question: "Vì sao hạ giá để lấy khách đầu tiên thường phản tác dụng?",
        options: [
          "Vì mức giá đầu tiên trở thành mốc mà chính khách đó neo vào cho các lần sau",
          "Vì khách hàng trả giá thấp thường yêu cầu hoàn tiền nhiều hơn khách trả giá cao",
          "Vì cơ quan thuế sẽ ấn định lại doanh thu nếu giá bán thấp hơn mặt bằng thị trường",
          "Vì giá thấp khiến bạn không đủ điều kiện đăng ký hộ kinh doanh cá thể",
        ],
        correct: 0,
        explanation:
          "Tăng giá với khách cũ khó hơn nhiều so với ra giá đúng ngay từ đầu với khách mới. Nếu buộc phải giảm để mở hàng, hãy giảm bằng cách thu hẹp phạm vi công việc chứ đừng hạ đơn giá.",
      },
    ],
    keyTakeaways: [
      "Lương chia số giờ là điểm xuất phát, không phải mức giá - nó giả định mọi giờ đều bán được",
      "Tỷ lệ giờ bán được thường quanh 60%, và toàn bộ chi phí sống dồn lên phần giờ có thu ấy",
      "Bảo hiểm, công cụ và chỗ làm việc chuyển từ vai công ty sang vai bạn",
      "Giá theo gói tách thu nhập khỏi số giờ, nên nó trả công cho kinh nghiệm thay vì phạt nó",
    ],
    practicePrompt: {
      question:
        "Khách đề nghị giảm 30% giá vì họ sẽ thuê bạn dài hạn. Cách xử lý hợp lý nhất?",
      options: [
        "Giữ đơn giá, thu hẹp phạm vi hoặc giãn tiến độ để tổng chi phí giảm tương ứng",
        "Đồng ý giảm vì khối lượng lớn thì đơn giá thấp hơn là chuyện bình thường",
        "Từ chối thẳng vì mọi đề nghị giảm giá đều là dấu hiệu khách hàng không nghiêm túc",
        "Đồng ý giảm cho ba tháng đầu rồi đưa giá về mức cũ mà không báo trước",
      ],
      correct: 0,
      explanation:
        "Cam kết dài hạn thường không thành hiện thực, còn mức giá thì ở lại vĩnh viễn. Giữ đơn giá và điều chỉnh phạm vi giữ cho giá trị mỗi giờ của bạn không bị neo xuống, mà khách vẫn có được con số tổng họ cần.",
    },
    summary: {
      keyIdea: "Giá đúng bằng thu nhập mong muốn cộng chi phí, chia cho số giờ THẬT SỰ bán được",
      commonMistake: "Lấy lương tháng chia số giờ làm việc, rồi bận hơn mà thu về ít hơn lúc đi làm",
      action: "Tính lại mức giá của bạn với tỷ lệ giờ bán được 60% và cộng đủ chi phí tự lo.",
    },
    application: {
      title: "Tính lại giá của bạn tối nay",
      message:
        "Lấy thu nhập bạn muốn về tay mỗi tháng, cộng chi phí công cụ và bảo hiểm tự đóng, rồi chia cho số giờ bạn thật sự bán được - không phải số giờ bạn ngồi làm.",
      secondary:
        "Nếu chưa có dữ liệu về tỷ lệ giờ bán được, hãy dùng 60% cho vài tháng đầu rồi thay bằng con số thật của chính bạn.",
    },
    sections: [
      {
        type: "lead",
        text: "Câu hỏi khó nhất của người mới làm tự do không phải tìm khách ở đâu, mà là ra giá bao nhiêu. Và phép tính mà gần như ai cũng dùng đầu tiên là phép tính sai.",
      },
      { type: "heading", text: "Ba khoản mà phép chia đơn giản bỏ sót" },
      {
        type: "paragraph",
        text: "Thứ nhất là giờ không bán được: họp, báo giá, tìm khách, sửa theo góp ý. Người làm công vẫn được trả cho những giờ ấy, người làm tự do thì không. Thứ hai là chi phí trước đây công ty gánh: phần mềm, máy móc, chỗ ngồi. Thứ ba là phần bảo hiểm công ty từng đóng, nay bạn tự lo toàn bộ. Bỏ qua cả ba nghĩa là ra giá bằng đúng lương cũ trong khi phải gánh thêm ba khoản mới.",
      },
      {
        type: "formula",
        title: "Giá theo giờ tối thiểu",
        equation: "Giá = (Thu nhập mong muốn + Chi phí) ÷ Số giờ bán được",
        variables: [
          {
            symbol: "Thu nhập mong muốn",
            name: "Khoản về tay mỗi tháng",
            description: "Lấy mức bạn cần để giữ nguyên mức sống, chưa trừ thuế",
          },
          {
            symbol: "Chi phí",
            name: "Công cụ, bảo hiểm, chỗ làm việc",
            description: "Mọi khoản trước đây công ty trả mà nay bạn tự lo",
          },
          {
            symbol: "Số giờ bán được",
            name: "Giờ có hóa đơn, không phải giờ ngồi làm",
            description: "Thường quanh 60% tổng thời gian làm việc trong tháng",
          },
        ],
        example: {
          title: "Từ lương 24 triệu ra mức giá thật",
          calculation:
            "Cần về tay 24 triệu · chi phí 3 triệu · làm 160 giờ nhưng bán được 96 giờ · (24 + 3) ÷ 96",
          result: "Khoảng 280 nghìn mỗi giờ",
          explanation:
            "Gần gấp đôi con số 150 nghìn mà phép chia lương cho giờ đưa ra. Khoảng cách ấy chính là ba khoản bị bỏ sót, và nó là lý do phần lớn người mới làm tự do thấy mình bận hơn mà nghèo hơn.",
        },
      },
      {
        type: "callout",
        label: "Giá thấp không mở được cánh cửa nào lâu dài",
        text: "Khách tìm tới vì giá rẻ sẽ rời đi vì có người rẻ hơn, và trong lúc đó bạn đã tự đặt một mốc rất khó nâng lên. Nếu cần nhượng bộ để mở hàng, hãy nhượng bộ ở phạm vi công việc hoặc tiến độ - hai thứ điều chỉnh lại được - chứ đừng nhượng ở đơn giá.",
      },
      {
        type: "closing",
        lines: [
          "Ra giá đúng không phải là đòi nhiều, nó là bù lại đúng những gì công ty từng gánh thay bạn.",
          "Bài sau: thu nhập thụ động - phần nào có thật, và phần nào chỉ là quảng cáo.",
        ],
      },
    ],
  },
  {
    id: 307,
    slug: "thu-nhap-thu-dong-that-va-quang-cao",
    title: "Chặng 11, Bài 8: Thu nhập thụ động - cái nào thật, cái nào là quảng cáo",
    subtitle: "Thứ thật sự thụ động thì lợi suất khiêm tốn; thứ hứa lợi suất cao thì luôn có người phải làm việc",
    duration: "8 phút",
    difficulty: "Trung bình",
    emoji: "🛌",
    track: "personal",
    whyItMatters:
      "Cụm từ thu nhập thụ động bán được rất nhiều khóa học, và nó khiến người ta bỏ tiền vào những thứ đòi hỏi lao động thật hoặc rủi ro thật mà không nhận ra. Phân biệt được ba nhóm - thật sự thụ động, thụ động sau khi đã làm rất nhiều, và không thụ động chút nào - là cách rẻ nhất để không mất tiền học phí.",
    openingQuestion: "Nguồn nào dưới đây gần với thu nhập thụ động thật nhất?",
    openingOptions: [
      "Cho thuê căn hộ mà bạn tự quản lý, tự tìm khách và tự xử lý sửa chữa",
      "Lãi từ trái phiếu chính phủ hoặc cổ tức từ một quỹ chỉ số nắm dài hạn",
      "Bán khóa học trực tuyến do chính bạn quay, cập nhật và chăm sóc học viên",
      "Kinh doanh online có người khác vận hành nhưng bạn duyệt mọi đơn hàng",
    ],
    correctOption: 1,
    explanation:
      "Lãi trái phiếu và cổ tức quỹ chỉ số là những dòng tiền hiếm hoi không đòi hỏi lao động nào sau khi đã mua - đổi lại, lợi suất của chúng khiêm tốn và ai cũng tiếp cận được. Ba phương án còn lại đều có người phải làm việc, và trong cả ba trường hợp người đó là bạn: tìm khách thuê, quay lại bài giảng khi nội dung lỗi thời, duyệt đơn mỗi ngày. Chúng có thể là nguồn thu tốt, nhưng gọi chúng là thụ động sẽ khiến bạn tính sai cả thời gian lẫn lợi suất thật.",
    diagram: [
      { label: "Hỏi: ai làm việc để dòng tiền này chảy", arrow: true },
      { label: "Nếu là bạn thì đó là kinh doanh", arrow: true },
      { label: "Nếu là vốn thì lợi suất sẽ khiêm tốn", arrow: true },
      { label: "Lợi suất cao mà không ai làm việc là dấu hiệu rủi ro" },
    ],
    realWorldExample: {
      company: "Căn hộ cho thuê không thụ động như quảng cáo",
      description:
        "Một căn hộ hai tỷ cho thuê mười triệu mỗi tháng nghe như dòng tiền tự chảy. Trừ tháng trống, phí quản lý, sửa chữa và thuế, phần còn lại khoảng bảy tới tám triệu - tức lợi suất quanh 4,5% một năm trên vốn. Kèm theo đó là tìm khách, xử lý hỏng hóc và những cuộc gọi lúc mười giờ đêm. Đó là một khoản đầu tư hợp lý, nhưng nó là công việc chứ không phải sự nhàn rỗi.",
    },
    quiz: [
      {
        question: "Câu hỏi nào phân loại nhanh nhất một nguồn thu nhập là thụ động hay không?",
        options: [
          "Ai đang làm việc để dòng tiền này tiếp tục chảy vào mỗi tháng",
          "Nguồn thu này có được pháp luật công nhận là thu nhập hợp pháp không",
          "Số vốn ban đầu bỏ ra có lớn hơn thu nhập của một năm hay không",
          "Dòng tiền có về đúng vào một ngày cố định mỗi tháng hay không",
        ],
        correct: 0,
        explanation:
          "Nếu câu trả lời là bạn, đó là kinh doanh hoặc là việc làm. Nếu câu trả lời là vốn, đó là đầu tư. Nếu không ai làm việc mà lợi suất vẫn cao bất thường, thứ đang chảy nhiều khả năng là tiền của người tham gia sau.",
      },
      {
        question: "Vì sao nguồn thật sự thụ động thường có lợi suất khiêm tốn?",
        options: [
          "Vì ai cũng tiếp cận được nên phần bù cho công sức và kỹ năng gần như bằng không",
          "Vì pháp luật đã giới hạn mức lãi suất tối đa mà một nhà đầu tư cá nhân được hưởng",
          "Vì các tổ chức phát hành luôn giữ lại phần lợi nhuận cao nhất cho chính họ",
          "Vì thu nhập thụ động chịu thuế suất cao hơn thu nhập từ tiền lương",
        ],
        correct: 0,
        explanation:
          "Lợi suất là phần bù cho rủi ro, cho công sức, hoặc cho kỹ năng hiếm. Bỏ hết công sức và kỹ năng ra khỏi phương trình thì chỉ còn phần bù rủi ro - và đó là một con số vừa phải chứ không phải con số trong quảng cáo.",
      },
      {
        question: "Nhóm thụ động sau khi đã làm rất nhiều có đặc điểm gì?",
        options: [
          "Phải bỏ công lớn ở giai đoạn đầu và bỏ công duy trì đều đặn sau đó",
          "Không cần bất kỳ khoản đầu tư ban đầu nào ngoài thời gian rảnh của bạn",
          "Cho dòng tiền ổn định ngay từ tháng đầu tiên sau khi hoàn thành sản phẩm",
          "Luôn cho lợi suất cao hơn đầu tư tài chính vì bạn tự kiểm soát toàn bộ",
        ],
        correct: 0,
        explanation:
          "Sách, khóa học, phần mềm nhỏ đều thuộc nhóm này. Chúng có thể tạo doanh thu khi bạn ngủ, nhưng chỉ sau hàng trăm giờ ban đầu và chỉ khi vẫn được cập nhật - nội dung không ai chăm sẽ lỗi thời rồi tắt dần.",
      },
      {
        question:
          "Một chương trình hứa lãi 3% mỗi tháng, cam kết không rủi ro, không cần làm gì. Kết luận đúng?",
        options: [
          "Mức lãi ấy cao gấp nhiều lần lợi suất thị trường, và cam kết không rủi ro là điều không tồn tại",
          "Hợp lý nếu chương trình có giấy phép kinh doanh và hợp đồng rõ ràng",
          "Hợp lý nếu đã có nhiều người nhận được tiền lãi đều đặn trong một năm qua",
          "Cần góp thử một khoản nhỏ để tự mình kiểm chứng trong vài tháng trước khi quyết định góp thêm nhiều hơn",
        ],
        correct: 0,
        explanation:
          "3% mỗi tháng là hơn 42% một năm. Việc nhiều người đã nhận lãi đều đặn không chứng minh điều gì - đó chính là cơ chế hoạt động của mô hình lấy tiền người sau trả người trước, và nó luôn trả rất đều cho tới ngay trước lúc sụp.",
      },
      {
        question: "Vì sao nên tính lợi suất trên vốn thay vì nhìn số tiền thu về mỗi tháng?",
        options: [
          "Vì chỉ lợi suất mới so sánh được nguồn này với các lựa chọn khác cùng số vốn",
          "Vì số tiền thu về mỗi tháng luôn biến động nên không thể dùng để tính toán được",
          "Vì cơ quan thuế yêu cầu kê khai thu nhập cho thuê theo tỷ lệ phần trăm",
          "Vì lợi suất cao hơn đồng nghĩa với rủi ro thấp hơn trong dài hạn",
        ],
        correct: 0,
        explanation:
          "Mười triệu mỗi tháng nghe hấp dẫn cho tới khi biết nó đến từ hai tỷ đồng vốn. Cùng số vốn ấy đặt ở nơi khác có thể cho nhiều hơn mà không kèm theo các cuộc gọi lúc nửa đêm - và phép so sánh đó chỉ hiện ra khi quy về lợi suất.",
      },
    ],
    keyTakeaways: [
      "Hỏi ai đang làm việc: nếu là bạn thì đó là kinh doanh, nếu là vốn thì đó là đầu tư",
      "Nguồn thật sự thụ động cho lợi suất khiêm tốn, vì đã bỏ công sức và kỹ năng ra khỏi phương trình",
      "Nhóm thụ động sau khi làm rất nhiều vẫn cần duy trì, nếu không nó sẽ lỗi thời rồi tắt",
      "Lợi suất cao bất thường mà không ai làm việc là dấu hiệu tiền đang chảy từ người tham gia sau",
    ],
    practicePrompt: {
      question:
        "Bạn định mua căn hộ hai tỷ cho thuê mười triệu mỗi tháng. Bước nên làm trước tiên là gì?",
      options: [
        "Quy về lợi suất năm sau khi trừ tháng trống, phí và thuế, rồi so với lựa chọn khác",
        "So sánh tiền thuê hằng tháng với khoản trả góp ngân hàng mỗi tháng",
        "Kiểm tra xem giá căn hộ ở khu vực đó đã tăng được bao nhiêu phần trăm trong năm vừa qua",
        "Tính xem sau bao nhiêu năm thì tiền thuê thu về đủ bằng giá mua ban đầu",
      ],
      correct: 0,
      explanation:
        "Tiền thuê gộp luôn nhìn đẹp hơn thực tế. Chỉ khi trừ hết chi phí và quy về phần trăm trên vốn thì mới so được với các lựa chọn khác cùng số tiền - và đó là phép so sánh duy nhất có ý nghĩa.",
    },
    summary: {
      keyIdea: "Không có dòng tiền nào vừa cao vừa không ai phải làm việc - hãy tìm xem ai đang làm",
      commonMistake: "Gọi mọi nguồn thu ngoài lương là thụ động, rồi tính sai cả thời gian bỏ ra lẫn lợi suất thật",
      action: "Với mỗi nguồn bạn đang cân nhắc, viết ra ai làm việc và lợi suất năm trên vốn là bao nhiêu.",
    },
    application: {
      title: "Phân loại ba nhóm",
      message:
        "Liệt kê các nguồn thu nhập bạn đang có hoặc đang cân nhắc, rồi xếp mỗi cái vào một trong ba nhóm: thật sự thụ động, thụ động sau khi đã làm rất nhiều, và không thụ động chút nào.",
      secondary:
        "Cả ba nhóm đều chính đáng. Vấn đề chỉ nảy sinh khi bạn xếp nhầm nhóm rồi lập kế hoạch dựa trên cái nhãn sai đó.",
    },
    sections: [
      {
        type: "lead",
        text: "Thu nhập thụ động là cụm từ bán được nhiều khóa học nhất trong tài chính cá nhân, và cũng là cụm từ được dùng lỏng lẻo nhất. Bài này không bác bỏ khái niệm, nó chỉ tách ba thứ rất khác nhau đang bị gọi chung một tên.",
      },
      { type: "heading", text: "Ba nhóm bị gọi chung một tên" },
      {
        type: "conceptTable",
        title: "Ai làm việc, và bạn được trả cho cái gì",
        subtitle: "Cả ba nhóm đều hợp lệ - xếp nhầm nhóm mới là vấn đề",
        concepts: [
          {
            vi: "Thật sự thụ động",
            en: "Truly passive",
            def: "Lãi trái phiếu, cổ tức quỹ chỉ số, lãi tiền gửi. Vốn làm việc chứ không phải bạn. Đổi lại lợi suất khiêm tốn, vì ai cũng làm được.",
          },
          {
            vi: "Thụ động sau khi làm rất nhiều",
            en: "Front-loaded",
            def: "Sách, khóa học, phần mềm nhỏ. Hàng trăm giờ trước khi có đồng đầu tiên, và vẫn cần cập nhật để không tắt dần.",
          },
          {
            vi: "Không thụ động chút nào",
            en: "Actually a business",
            def: "Cho thuê tự quản lý, bán hàng online, nhận việc theo dự án. Đây là kinh doanh, và gọi đúng tên giúp bạn tính đúng công sức bỏ ra.",
          },
        ],
      },
      {
        type: "paragraph",
        text: "Cách phân loại này không phải để chê nhóm nào. Cho thuê căn hộ là khoản đầu tư hợp lý với nhiều người; bán khóa học có thể là nguồn thu tốt. Vấn đề nằm ở chỗ khi gọi chúng là thụ động, bạn sẽ không tính công sức vào chi phí, không tính tháng trống vào doanh thu, và so sánh chúng với gửi tiết kiệm như thể hai bên cùng đòi hỏi số giờ như nhau.",
      },
      {
        type: "callout",
        label: "Lợi suất cao mà không ai làm việc là câu hỏi, không phải cơ hội",
        text: "Mọi lợi suất đều là phần bù cho một thứ gì đó: rủi ro, công sức, hoặc kỹ năng hiếm. Khi ai đó hứa lợi suất cao mà không có cả ba, hãy hỏi tiền đến từ đâu. Trong phần lớn trường hợp câu trả lời là từ người tham gia sau bạn - và mô hình ấy luôn chi trả rất đều cho tới đúng lúc nó dừng.",
      },
      {
        type: "closing",
        lines: [
          "Không có dòng tiền nào tự chảy; luôn có ai đó hoặc thứ gì đó đang làm việc, và đáng biết đó là ai.",
          "Bài sau: khoản đầu tư có lợi suất cao nhất thường không nằm trong danh mục nào cả.",
        ],
      },
    ],
  },
  {
    id: 308,
    slug: "dau-tu-vao-ban-than-hoc-gi-co-roi",
    title: "Chặng 11, Bài 9: Đầu tư vào bản thân - học gì có ROI, học gì không",
    subtitle: "Không phải mọi khóa học đều là đầu tư, và tấm bằng đắt nhất chưa chắc trả về nhiều nhất",
    duration: "8 phút",
    difficulty: "Trung bình",
    emoji: "🎓",
    track: "personal",
    whyItMatters:
      "Câu đầu tư vào bản thân luôn lãi nhất được lặp lại nhiều tới mức nó thành cái cớ để chi bất cứ khoản nào cho việc học. Nhưng một khóa học vẫn là một khoản đầu tư có chi phí và có xác suất hoàn vốn, và cả hai đều tính được trước khi trả tiền.",
    openingQuestion: "Yếu tố nào quyết định nhiều nhất tới khả năng hoàn vốn của một khóa học?",
    openingOptions: [
      "Uy tín của đơn vị đào tạo và giá của khóa học so với các nơi khác",
      "Việc thị trường có trả thêm cho kỹ năng đó, và bạn có cơ hội dùng nó ngay không",
      "Thời lượng của khóa học và số lượng chứng chỉ bạn nhận được sau khi hoàn thành nó",
      "Việc khóa học có được giảng dạy bởi người đang làm nghề thực tế hay không",
    ],
    correctOption: 1,
    explanation:
      "Một kỹ năng chỉ trả về tiền khi thị trường trả thêm cho nó và khi bạn có chỗ dùng nó đủ sớm để không quên. Uy tín và giá là tín hiệu gián tiếp, và chúng thường tương quan yếu với mức tăng thu nhập thật. Chứng chỉ có giá trị ở những ngành mà nhà tuyển dụng dùng nó để sàng lọc, và không có giá trị ở những ngành đánh giá bằng sản phẩm. Người dạy giỏi làm việc học dễ hơn nhưng không đổi được chuyện thị trường có cần kỹ năng ấy hay không - đó là câu hỏi phải trả lời trước khi so sánh các khóa học với nhau.",
    diagram: [
      { label: "Thị trường có trả thêm cho kỹ năng này không", arrow: true },
      { label: "Bạn có chỗ dùng nó trong sáu tháng tới không", arrow: true },
      { label: "Chi phí gồm cả tiền lẫn thời gian", arrow: true },
      { label: "Chia phần tăng thu nhập cho chi phí" },
    ],
    realWorldExample: {
      company: "Hai khóa học, hai kết quả",
      description:
        "Một người học chứng chỉ phân tích dữ liệu mười hai triệu và dùng ngay vào báo cáo hằng tuần ở công ty; sáu tháng sau phạm vi công việc mở rộng và lương được xét lại. Người khác học một khóa quản trị bốn mươi triệu vì nghe nói bằng cấp đó có giá, nhưng công việc hiện tại không có chỗ áp dụng và cũng không định đổi việc. Sau một năm, phần lớn nội dung đã quên.",
    },
    quiz: [
      {
        question: "Vì sao chỗ dùng ngay lại quan trọng tới vậy?",
        options: [
          "Vì kỹ năng không được dùng sẽ mai một trước khi kịp tạo ra thu nhập nào",
          "Vì chứng chỉ có thời hạn hiệu lực và sẽ hết giá trị sau một khoảng thời gian",
          "Vì nhà tuyển dụng chỉ công nhận kỹ năng được học trong vòng mười hai tháng",
          "Vì học phí chỉ được khấu trừ thuế nếu bạn dùng kỹ năng đó trong năm tài chính",
        ],
        correct: 0,
        explanation:
          "Khoảng cách giữa lúc học và lúc dùng là biến quyết định. Kỹ năng học xong để đó sẽ phai, và khoản đã chi trở thành chi phí thuần chứ không phải khoản đầu tư.",
      },
      {
        question: "Chi phí thật của một khóa học gồm những gì?",
        options: [
          "Học phí cộng giá trị thời gian bạn bỏ ra và những việc đã phải từ chối",
          "Chỉ học phí, vì thời gian học thường rơi vào buổi tối và những ngày cuối tuần",
          "Học phí cộng chi phí đi lại và tài liệu bắt buộc phải mua thêm",
          "Học phí trừ đi phần được công ty hỗ trợ theo chính sách đào tạo",
        ],
        correct: 0,
        explanation:
          "Hai trăm giờ là hai trăm giờ, dù nó rơi vào buổi tối. Chúng có thể đã dành cho một việc phụ đang cộng dồn hoặc cho một dự án ở việc chính, và bỏ qua chi phí ấy sẽ làm mọi khóa học trông rẻ hơn thực tế.",
      },
      {
        question: "Khi nào một chứng chỉ có giá trị rõ rệt?",
        options: [
          "Khi nhà tuyển dụng trong ngành đó dùng nó làm điều kiện sàng lọc hồ sơ",
          "Khi nó được cấp bởi một tổ chức có tên tuổi quốc tế và học phí cao",
          "Khi nó đòi hỏi kỳ thi khó nên số người sở hữu trong nước còn rất ít",
          "Khi nội dung của nó bao phủ nhiều lĩnh vực khác nhau cùng lúc",
        ],
        correct: 0,
        explanation:
          "Giá trị của chứng chỉ đến từ việc nó tiết kiệm công sàng lọc cho người tuyển, nên nó chỉ có giá ở nơi người ta thật sự sàng lọc bằng nó. Ở những ngành đánh giá bằng sản phẩm, một hồ sơ tác phẩm có sức nặng hơn nhiều.",
      },
      {
        question:
          "Khóa học 12 triệu, học 100 giờ, sau đó lương tăng 1,5 triệu mỗi tháng. Nhận xét đúng?",
        options: [
          "Hoàn vốn tiền mặt trong khoảng tám tháng, chưa kể phần tăng lặp lại các năm sau",
          "Chưa hoàn vốn được vì 12 triệu lớn hơn tổng mức tăng lương của cả năm đầu",
          "Không tính được vì mức tăng lương còn phụ thuộc vào nhiều yếu tố khác nữa",
          "Hoàn vốn ngay lập tức vì lương tăng là khoản thu nhập kéo dài mãi mãi",
        ],
        correct: 0,
        explanation:
          "12 triệu chia 1,5 triệu là 8 tháng. Điểm quan trọng hơn con số ấy: mức tăng lương lặp lại mọi tháng sau đó và còn nâng nền cho các lần tăng kế tiếp, nên tỷ suất thật cao hơn nhiều so với phép chia đơn giản.",
      },
      {
        question: "Khoản đầu tư vào bản thân nào thường bị đánh giá thấp nhất?",
        options: [
          "Kỹ năng viết và trình bày, vì chúng nâng giá trị của mọi kỹ năng khác bạn có",
          "Các khóa học có cấp bằng do trường đại học nước ngoài liên kết đào tạo",
          "Chứng chỉ ngoại ngữ ở mức điểm cao nhất mà kỳ thi đó có thể cấp",
          "Khóa học về công cụ phần mềm mới nhất đang được nhắc tới nhiều nhất",
        ],
        correct: 0,
        explanation:
          "Một phân tích đúng mà không ai hiểu thì không tạo ra quyết định nào. Kỹ năng diễn đạt hoạt động như một hệ số nhân lên mọi kỹ năng chuyên môn, và nó hiếm khi xuất hiện trong danh sách khóa học người ta cân nhắc.",
      },
    ],
    keyTakeaways: [
      "Hai câu hỏi trước khi trả tiền: thị trường có trả thêm cho kỹ năng này, và bạn có chỗ dùng ngay không",
      "Chi phí thật gồm cả thời gian và những việc đã phải từ chối, không chỉ học phí",
      "Chứng chỉ có giá ở ngành dùng nó để sàng lọc; ngành đánh giá bằng sản phẩm thì cần tác phẩm",
      "Kỹ năng viết và trình bày nhân giá trị mọi kỹ năng khác, và thường bị bỏ qua",
    ],
    practicePrompt: {
      question:
        "Bạn muốn học một kỹ năng nhưng công việc hiện tại không có chỗ dùng. Cách hợp lý nhất?",
      options: [
        "Tìm trước một chỗ áp dụng thật, dù nhỏ, rồi mới đăng ký khóa học",
        "Cứ học trước đi vì kiến thức không bao giờ là thừa trong sự nghiệp",
        "Chọn khóa học dài hơn để có nhiều thời gian ghi nhớ nội dung hơn",
        "Đợi tới khi đổi sang công việc có dùng kỹ năng đó rồi mới bắt đầu học",
      ],
      correct: 0,
      explanation:
        "Chỗ áp dụng có thể là một dự án nhỏ, một việc phụ, hay một phần việc bạn xin nhận thêm - nó không cần lớn, nó cần có thật. Còn đợi tới khi đổi việc thì thường không đổi được, vì chính kỹ năng ấy là điều kiện để đổi.",
    },
    summary: {
      keyIdea: "Một khóa học là khoản đầu tư có chi phí và xác suất hoàn vốn, và cả hai tính được trước khi trả tiền",
      commonMistake: "Coi mọi khoản chi cho việc học là đầu tư, rồi học thứ không có chỗ dùng và quên sau một năm",
      action: "Trước khi đăng ký, viết ra chỗ bạn sẽ áp dụng kỹ năng đó trong sáu tháng tới.",
    },
    application: {
      title: "Hai câu hỏi trước khi chuyển khoản",
      message:
        "Thị trường có đang trả thêm cho kỹ năng này không - kiểm bằng tin tuyển dụng và dải lương. Và tôi sẽ dùng nó ở đâu trong sáu tháng tới - trả lời bằng một dự án cụ thể, không phải bằng một dự định.",
      secondary:
        "Nếu câu thứ hai chưa có câu trả lời, hãy tìm chỗ áp dụng trước. Việc đó thường mất ít thời gian hơn khóa học và nó quyết định khóa học có sinh lời hay không.",
    },
    sections: [
      {
        type: "lead",
        text: "Đầu tư vào bản thân là câu khẩu hiệu đúng tới mức nó thành cái cớ. Bài này giữ nguyên phần đúng của nó và thêm vào thứ khẩu hiệu bỏ qua: một phép tính.",
      },
      { type: "heading", text: "Hai điều kiện, và cả hai đều phải có" },
      {
        type: "paragraph",
        text: "Điều kiện thứ nhất là thị trường trả thêm cho kỹ năng đó - kiểm được bằng tin tuyển dụng và dải lương của vị trí yêu cầu nó. Điều kiện thứ hai là bạn có chỗ dùng nó đủ sớm. Thiếu điều kiện đầu thì bạn học một thứ không ai mua; thiếu điều kiện sau thì bạn học một thứ sẽ quên trước khi kịp bán. Cả hai đều trả lời được trước khi trả tiền, và phần lớn người ta không hỏi câu nào.",
      },
      {
        type: "conceptTable",
        title: "Ba loại chi cho việc học",
        subtitle: "Chỉ loại đầu tiên là đầu tư theo đúng nghĩa tài chính",
        concepts: [
          {
            vi: "Có thị trường, có chỗ dùng",
            en: "Investment",
            def: "Hoàn vốn tính được bằng tháng. Kỹ năng được dùng ngay nên không phai, và phần tăng thu nhập lặp lại các năm sau.",
          },
          {
            vi: "Có thị trường, chưa có chỗ dùng",
            en: "Option",
            def: "Là quyền chọn chứ chưa là thu nhập. Chỉ đáng chi khi bạn đang chủ động tạo ra chỗ dùng, không phải khi đang chờ nó xuất hiện.",
          },
          {
            vi: "Học vì thích",
            en: "Consumption",
            def: "Hoàn toàn chính đáng, và nên gọi đúng tên là tiêu dùng. Đặt nó vào ngân sách giải trí thay vì ngân sách đầu tư.",
          },
        ],
      },
      {
        type: "callout",
        label: "Chi phí lớn nhất thường không phải học phí",
        text: "Hai trăm giờ học là hai trăm giờ không dành cho việc phụ đang cộng dồn, cho một dự án ở việc chính, hay cho gia đình. Với người đi làm, thời gian thường khan hiếm hơn tiền - nên khi so hai khóa học, hãy so cả số giờ chứ không chỉ so học phí.",
      },
      {
        type: "closing",
        lines: [
          "Khoản đầu tư vào bản thân sinh lời không phải khoản đắt nhất, mà là khoản được đem ra dùng sớm nhất.",
          "Bài cuối chặng: gộp tất cả thành một bản đồ mười hai tháng cho riêng bạn.",
        ],
      },
    ],
  },
  {
    id: 309,
    slug: "ban-do-tang-thu-nhap-12-thang",
    title: "Chặng 11, Bài 10: Tổng kết - bản đồ tăng thu nhập 12 tháng",
    subtitle: "Chín bài trước là các mảnh rời; bài này ghép chúng thành thứ tự có thể làm theo",
    duration: "8 phút",
    difficulty: "Trung bình",
    emoji: "🗺️",
    track: "personal",
    whyItMatters:
      "Biết chín thứ rời rạc không đổi được thu nhập của ai. Thứ đổi được là một thứ tự đúng, vì các bước trong chặng này phụ thuộc lẫn nhau: không biết dải thị trường thì không đàm phán được, không có bằng chứng thì không có gì để đàm phán, và không có ngân sách thì phần tăng thêm sẽ biến mất.",
    openingQuestion: "Thứ tự nào hợp lý nhất cho mười hai tháng tới?",
    openingOptions: [
      "Nghỉ việc trước để có thời gian, rồi mới xây nguồn thu nhập mới từ đầu",
      "Đo dải thị trường và gom bằng chứng trước, rồi đàm phán, rồi mới tính nguồn thứ hai",
      "Bắt đầu ngay bằng một nghề tay trái vì nó không phụ thuộc vào ai đồng ý",
      "Học thêm một chứng chỉ trước, vì mọi mức tăng lương đều đòi hỏi bằng cấp mới",
    ],
    correctOption: 1,
    explanation:
      "Đàm phán ở việc chính là bước có tỷ suất cao nhất trên thời gian bỏ ra: nó cần vài chục giờ chuẩn bị và có thể đổi vài triệu mỗi tháng, lặp lại mãi. Nghề tay trái cần hàng trăm giờ để tới cùng một con số, nên nó là bước sau chứ không phải bước đầu. Nghỉ việc trước khi có nguồn thay thế là bỏ mất chính dòng tiền đang nuôi giai đoạn xây dựng. Còn chứng chỉ chỉ sinh lời khi thị trường trả thêm và bạn có chỗ dùng - đó là điều kiện, không phải bước mở đầu mặc định.",
    diagram: [
      { label: "Tháng 1-2: đo dải và mở sổ bằng chứng", arrow: true },
      { label: "Tháng 3-6: đàm phán ở việc chính", arrow: true },
      { label: "Tháng 6-12: nguồn thứ hai nếu còn dư địa", arrow: true },
      { label: "Suốt cả năm: giữ ngân sách để phần tăng ở lại" },
    ],
    realWorldExample: {
      company: "Một năm, ba bước, không bước nào ngoạn mục",
      description:
        "Tháng Một: tra dải lương, phát hiện mình đang ở dưới đáy dải. Tháng Hai tới Năm: ghi lại kết quả có con số, nhận thêm một mảng việc. Tháng Sáu: đặt vấn đề trước kỳ chốt ngân sách, lương từ 18 lên 22 triệu. Tháng Chín: nhận việc phụ cùng chuyên môn, thêm bốn triệu mỗi tháng. Cuối năm thu nhập tăng gần 45%, và không tháng nào có gì kịch tính xảy ra.",
    },
    quiz: [
      {
        question: "Vì sao đàm phán ở việc chính nên đứng trước nghề tay trái?",
        options: [
          "Vì nó cần ít thời gian hơn nhiều để đạt tới cùng một mức tăng thu nhập",
          "Vì nghề tay trái luôn vi phạm điều khoản trong hợp đồng lao động",
          "Vì thu nhập từ việc chính chịu thuế suất thấp hơn thu nhập ngoài lương",
          "Vì công ty sẽ từ chối tăng lương nếu biết bạn đang làm thêm bên ngoài",
        ],
        correct: 0,
        explanation:
          "Vài chục giờ chuẩn bị đổi lấy vài triệu mỗi tháng lặp lại, so với hàng trăm giờ để một việc phụ đạt cùng con số. Khi thời gian là nguồn lực khan hiếm nhất, thứ tự này quyết định kết quả của cả năm.",
      },
      {
        question: "Vì sao ngân sách phải chạy song song suốt cả năm?",
        options: [
          "Vì không có nó thì phần thu nhập tăng thêm bị lạm phát lối sống nuốt mất",
          "Vì ngân hàng yêu cầu bảng ngân sách khi xét duyệt các khoản vay tiêu dùng",
          "Vì phần thu nhập tăng thêm phải được kê khai riêng với cơ quan thuế",
          "Vì chỉ khi có ngân sách thì công ty mới đồng ý xem xét tăng lương",
        ],
        correct: 0,
        explanation:
          "Đây là lý do nhiều người thu nhập tăng gấp đôi sau năm năm mà tài sản ròng gần như đứng yên. Chi tiêu tự nhiên dâng theo thu nhập, và chỉ một kế hoạch phân bổ có sẵn mới chặn được điều đó.",
      },
      {
        question: "Điều gì nên làm ngay trong hai tháng đầu?",
        options: [
          "Tra dải lương thị trường và bắt đầu ghi lại kết quả công việc có con số",
          "Đăng ký một khóa học dài hạn để chuẩn bị nền tảng cho cả năm",
          "Nộp hồ sơ ứng tuyển hàng loạt để thăm dò phản ứng của thị trường",
          "Thông báo với người quản lý rằng bạn dự định đề nghị tăng lương",
        ],
        correct: 0,
        explanation:
          "Hai việc này rẻ về thời gian và là điều kiện cần cho mọi bước sau. Báo trước ý định tăng lương mà chưa có bằng chứng thì chỉ tạo ra một cuộc trò chuyện sớm và yếu.",
      },
      {
        question: "Nếu đàm phán ở việc chính thất bại vì quỹ lương đóng băng thì sao?",
        options: [
          "Chốt tiêu chí bằng văn bản cho lần sau, và chuyển sức sang nguồn thứ hai",
          "Nghỉ việc ngay để tìm nơi khác, vì công ty này sẽ không bao giờ tăng lương",
          "Lặp lại đề nghị mỗi tháng cho tới khi người quản lý đồng ý xem xét",
          "Giảm bớt khối lượng công việc cho tương xứng với mức lương hiện tại",
        ],
        correct: 0,
        explanation:
          "Quỹ đóng băng là ràng buộc thật và ép vào nó chỉ làm hỏng quan hệ. Nhưng thời gian của bạn thì không đóng băng - chuyển nó sang nhánh còn mở là cách dùng đúng mười hai tháng ấy.",
      },
      {
        question: "Sai lầm phổ biến nhất khi thực hiện kế hoạch này là gì?",
        options: [
          "Làm cả bốn nhánh cùng lúc rồi không nhánh nào đủ sâu để tạo ra kết quả",
          "Dành quá nhiều thời gian cho việc tra cứu dải lương thị trường",
          "Đàm phán tăng lương quá sớm trước khi hết năm tài chính của công ty",
          "Ghi chép kết quả công việc quá chi tiết khiến người quản lý khó đọc",
        ],
        correct: 0,
        explanation:
          "Vừa học chứng chỉ, vừa xây việc phụ, vừa chuẩn bị đàm phán, vừa tìm việc mới - mỗi thứ nhận vài giờ mỗi tuần và không thứ nào qua được ngưỡng tạo ra kết quả. Thứ tự tồn tại chính là để tránh điều này.",
      },
    ],
    keyTakeaways: [
      "Đàm phán ở việc chính có tỷ suất cao nhất trên thời gian, nên nó đứng trước nghề tay trái",
      "Hai tháng đầu chỉ cần hai việc rẻ: đo dải thị trường và mở sổ ghi kết quả",
      "Ngân sách chạy song song suốt năm, nếu không phần tăng thêm sẽ biến mất",
      "Làm cả bốn nhánh cùng lúc là cách chắc chắn để không nhánh nào đủ sâu",
    ],
    practicePrompt: {
      question:
        "Bạn chỉ có năm giờ mỗi tuần cho việc tăng thu nhập. Nên dồn vào đâu trước?",
      options: [
        "Vào một nhánh duy nhất cho tới khi nó cho kết quả, bắt đầu bằng việc chính",
        "Chia đều cho bốn nhánh để giảm rủi ro nếu một nhánh không thành công",
        "Vào nghề tay trái, vì nó không phụ thuộc vào việc người khác có đồng ý hay không",
        "Vào việc học thêm, vì kỹ năng là nền tảng cho cả ba nhánh còn lại",
      ],
      correct: 0,
      explanation:
        "Năm giờ mỗi tuần chia bốn là hơn một giờ cho mỗi việc - dưới ngưỡng tạo ra bất cứ kết quả nào. Dồn cả năm giờ vào việc chính trong ba tháng thường đủ để chuẩn bị một cuộc đàm phán tử tế, và đó là nhánh trả về nhanh nhất.",
    },
    summary: {
      keyIdea: "Thứ tự quan trọng hơn nỗ lực: việc chính trước, nguồn thứ hai sau, ngân sách chạy suốt",
      commonMistake: "Khởi động cả bốn nhánh cùng lúc, rồi sau một năm không nhánh nào đủ sâu để cho kết quả",
      action: "Chọn đúng một nhánh cho quý này, và ghi ra kết quả cụ thể bạn muốn thấy vào cuối quý.",
    },
    application: {
      title: "Bản đồ mười hai tháng của bạn",
      message:
        "Viết ra bốn dòng: tháng 1-2 làm gì, tháng 3-6 làm gì, tháng 6-12 làm gì, và việc gì chạy suốt cả năm. Mỗi dòng một việc duy nhất - nếu có hai việc trong một dòng, bạn đang lặp lại sai lầm phổ biến nhất.",
      secondary:
        "Dán nó ở chỗ nhìn thấy hằng ngày. Kế hoạch này thất bại vì bị quên chứ hiếm khi vì sai.",
    },
    sections: [
      {
        type: "lead",
        text: "Chín bài trước cho bạn chín công cụ. Bài này không thêm công cụ nào - nó chỉ trả lời câu hỏi mà chín bài kia để ngỏ: làm cái nào trước.",
      },
      { type: "heading", text: "Vì sao thứ tự lại quan trọng đến vậy" },
      {
        type: "paragraph",
        text: "Các bước trong chặng này phụ thuộc lẫn nhau. Không biết dải thị trường thì không biết mình đang ở đâu, nên không biết nên đề nghị con số nào. Không có sổ ghi kết quả thì cuộc đàm phán chỉ còn lại thâm niên và chi phí sinh hoạt - hai lý do yếu nhất. Và nếu không có ngân sách chạy nền, mọi thứ đạt được ở trên sẽ hòa tan vào chi tiêu tăng theo.",
      },
      {
        type: "conceptTable",
        title: "Bốn nhánh, xếp theo tỷ suất trên thời gian",
        subtitle: "Làm lần lượt, không làm song song",
        concepts: [
          {
            vi: "Đàm phán ở việc chính",
            en: "Raise where you are",
            def: "Vài chục giờ chuẩn bị, có thể đổi vài triệu mỗi tháng lặp lại. Tỷ suất cao nhất, nên nó luôn là nhánh đầu tiên.",
          },
          {
            vi: "Đổi việc",
            en: "Change employer",
            def: "Mức nhảy lớn nhất trong một lần, nhưng tốn nhiều tuần và có rủi ro. Hợp lý khi bạn đã ở đáy dải và nội bộ không mở.",
          },
          {
            vi: "Nguồn thu thứ hai",
            en: "Side income",
            def: "Hàng trăm giờ để đạt cùng con số, bù lại nó không phụ thuộc vào ai đồng ý và có thể cộng dồn thành thứ lớn hơn.",
          },
          {
            vi: "Đầu tư vào bản thân",
            en: "Skill investment",
            def: "Không phải một nhánh riêng mà là điều kiện của ba nhánh trên. Chỉ chi khi đã có chỗ dùng trong sáu tháng tới.",
          },
        ],
      },
      {
        type: "callout",
        label: "Một nhánh mỗi quý, không phải bốn nhánh mỗi tuần",
        text: "Sai lầm phổ biến nhất không phải chọn sai nhánh mà là chọn hết. Năm giờ mỗi tuần chia cho bốn việc thì không việc nào qua được ngưỡng tạo ra kết quả, và sau mười hai tháng bạn có bốn thứ dở dang thay vì một thứ xong.",
      },
      {
        type: "list",
        items: [
          "Tháng 1-2: tra dải thị trường và mở sổ ghi kết quả - hai việc rẻ nhất và cần nhất",
          "Tháng 3-6: chuẩn bị và thực hiện cuộc đàm phán, đặt trước kỳ chốt ngân sách",
          "Tháng 6-12: nếu nhánh chính đã kịch trần, chuyển sang nguồn thu thứ hai",
          "Suốt cả năm: giữ ngân sách, để phần tăng thêm ở lại thay vì hòa vào chi tiêu",
        ],
      },
      {
        type: "closing",
        lines: [
          "Thu nhập tăng 45% trong một năm không cần tháng nào ngoạn mục, nó cần mười hai tháng đúng thứ tự.",
          "Hết Chặng 11. Bạn đã có cả hai vế của phương trình: giữ được tiền, và tạo ra nhiều tiền hơn để giữ.",
        ],
      },
    ],
  },
];
