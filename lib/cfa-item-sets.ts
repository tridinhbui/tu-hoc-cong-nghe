/**
 * Item set luyện Level II: một tình huống dài, nhiều câu hỏi cùng dựa vào nó.
 *
 * Vì sao viết mới thay vì ghép câu có sẵn: lib/cfa-levels.ts đã ghi rõ rằng
 * gộp các câu đơn lẻ lại rồi gọi là "đề Level II" sẽ luyện sai đúng kỹ năng mà
 * kỳ thi kiểm tra. Cái khó của cấp này không nằm ở từng câu hỏi mà ở chỗ phải
 * đọc một đoạn dữ liệu dài, nhận ra số nào cần dùng, và trả lời nhiều câu phụ
 * thuộc lẫn nhau. Kỹ năng đó chỉ luyện được bằng vignette viết ra cho đúng
 * mục đích - nên đây là vignette viết mới, không phải câu cũ đóng gói lại.
 *
 * Nguyên tắc viết bám theo AGENTS.md, và có một ràng buộc thêm của riêng dạng
 * này: mỗi tình huống phải chứa nhiều dữ kiện hơn số dữ kiện cần dùng. Một
 * vignette mà mọi con số đều được dùng đúng một lần thì không luyện được việc
 * chọn dữ liệu - nó chỉ là một câu hỏi dài dòng.
 */

export interface ItemSetQuestion {
  id: string;
  question: string;
  options: string[];
  /** Chỉ số đáp án đúng trong `options`. */
  correct: number;
  explanation: string;
}

export interface CfaItemSet {
  id: string;
  /** Môn thi, đúng tên trong bảng trọng số của CFA Institute. */
  topic: string;
  title: string;
  /** Đoạn tình huống. Xuống dòng bằng \n để hiện thành nhiều đoạn. */
  vignette: string;
  questions: ItemSetQuestion[];
}

export const CFA_ITEM_SETS: CfaItemSet[] = [
  {
    id: "is-fsa-01",
    topic: "Financial Statement Analysis",
    title: "Vốn hoá chi phí phát triển và cái giá của nó ở các năm sau",
    vignette:
      "Công ty Bách Hợp và công ty Trường An cùng ngành phần mềm doanh nghiệp, quy mô doanh thu tương đương. Năm vừa rồi mỗi bên chi 120 tỷ đồng cho phát triển sản phẩm.\n" +
      "Bách Hợp vốn hoá 90 tỷ trong số đó và khấu hao đều trong 3 năm; phần 30 tỷ còn lại ghi thẳng vào chi phí. Trường An ghi thẳng toàn bộ 120 tỷ vào chi phí trong kỳ.\n" +
      "Trước khoản chi này, cả hai đều có doanh thu 900 tỷ, chi phí hoạt động khác 700 tỷ, và không có nợ vay. Thuế suất 20%. Cả hai đều không có khoản chi phát triển nào ở các năm trước.\n" +
      "Một nhà phân tích đang so sánh hai công ty và ghi chú: 'Bách Hợp có biên lợi nhuận hoạt động cao hơn hẳn, nên chất lượng lợi nhuận tốt hơn.'",
    questions: [
      {
        id: "is-fsa-01-q1",
        question: "Chênh lệch lợi nhuận hoạt động năm nay giữa hai công ty là bao nhiêu?",
        options: [
          "Bách Hợp cao hơn 60 tỷ",
          "Bách Hợp cao hơn 90 tỷ, đúng bằng phần được vốn hoá",
          "Cao hơn 30 tỷ",
          "Hai bên bằng nhau vì tổng chi phát triển như nhau",
        ],
        correct: 0,
        explanation:
          "Bách Hợp ghi chi phí 30 tỷ chi thẳng cộng 30 tỷ khấu hao năm đầu (90 chia 3), tổng 60 tỷ. Trường An ghi đủ 120 tỷ. Chênh lệch là 60 tỷ, không phải 90 tỷ - phần vốn hoá vẫn quay lại báo cáo ngay trong năm nay qua khấu hao.",
      },
      {
        id: "is-fsa-01-q2",
        question: "Dòng tiền hoạt động của hai công ty năm nay khác nhau thế nào?",
        options: [
          "Bách Hợp cao hơn 90 tỷ vì phần vốn hoá nằm ở dòng tiền đầu tư",
          "Bách Hợp cao hơn 60 tỷ, đúng bằng chênh lệch lợi nhuận",
          "Hai bên bằng nhau vì cùng chi ra 120 tỷ tiền mặt",
          "Trường An cao hơn vì được khấu trừ thuế nhiều hơn trong kỳ",
        ],
        correct: 0,
        explanation:
          "Tiền chi ra như nhau, nhưng cách phân loại khác: phần vốn hoá của Bách Hợp nằm ở dòng tiền đầu tư, nên dòng tiền HOẠT ĐỘNG của họ cao hơn 90 tỷ. Đây là lý do vốn hoá làm đẹp cả lợi nhuận lẫn dòng tiền hoạt động cùng lúc, và cũng là lý do phải nhìn dòng tiền tự do khi so hai bên.",
      },
      {
        id: "is-fsa-01-q3",
        question: "Ghi chú của nhà phân tích về chất lượng lợi nhuận nên được đánh giá thế nào?",
        options: [
          "Sai: biên cao hơn đến từ lựa chọn kế toán, không từ hoạt động",
          "Đúng: biên lợi nhuận hoạt động cao hơn luôn phản ánh vận hành hiệu quả hơn",
          "Sai: chất lượng lợi nhuận chỉ đo được bằng tỷ lệ chi trả cổ tức",
          "Đúng nhưng chưa đủ: cần thêm dữ liệu về vòng quay tài sản mới kết luận",
        ],
        correct: 0,
        explanation:
          "Hai công ty có cùng doanh thu và cùng mức chi thật. Toàn bộ chênh lệch biên đến từ việc một bên vốn hoá còn một bên thì không. Chất lượng lợi nhuận thấp hơn chứ không cao hơn: phần chi phí được đẩy sang các năm sau vẫn sẽ tới.",
      },
      {
        id: "is-fsa-01-q4",
        question: "Nếu cả hai giữ nguyên mức chi 120 tỷ mỗi năm, đến năm thứ tư điều gì xảy ra?",
        options: [
          "Chênh lệch lợi nhuận biến mất vì khấu hao đã chồng đủ ba lớp",
          "Chênh lệch tăng dần vì phần vốn hoá tích lại ngày một lớn",
          "Bách Hợp bắt đầu có lợi nhuận thấp hơn Trường An từ năm thứ tư",
          "Chênh lệch giữ nguyên 60 tỷ mỗi năm cho tới khi ngừng chi",
        ],
        correct: 0,
        explanation:
          "Từ năm thứ ba trở đi, Bách Hợp gánh cùng lúc ba lớp khấu hao 30 tỷ, cộng 30 tỷ chi thẳng, tổng đúng 120 tỷ - bằng Trường An. Vốn hoá không tạo ra lợi nhuận, nó chỉ dời thời điểm ghi nhận; ở trạng thái ổn định thì lợi thế biến mất.",
      },
    ],
  },
  {
    id: "is-eq-01",
    topic: "Equity Investments",
    title: "Hai mô hình định giá cho một doanh nghiệp đang đổi chính sách cổ tức",
    vignette:
      "Công ty Minh Phát vừa công bố sẽ ngừng chia cổ tức trong ba năm tới để dồn vốn cho một nhà máy mới, sau đó khôi phục chia cổ tức từ năm thứ tư.\n" +
      "Số liệu năm gần nhất: lợi nhuận sau thuế 400 tỷ, cổ tức đã chia 160 tỷ, vốn chủ sở hữu đầu kỳ 2.000 tỷ, số cổ phiếu 100 triệu, giá thị trường 62 nghìn đồng.\n" +
      "Nhà phân tích ước tính ROE duy trì ở mức 20% trong suốt giai đoạn dự phóng, chi phí vốn chủ 12%, và từ năm thứ tư tỷ lệ chi trả cổ tức quay lại đúng mức của năm gần nhất.\n" +
      "Nhà máy mới dự kiến hoàn thành cuối năm thứ ba; ban lãnh đạo chưa công bố công suất cụ thể.",
    questions: [
      {
        id: "is-eq-01-q1",
        question: "Tốc độ tăng trưởng bền vững trong ba năm không chia cổ tức là bao nhiêu?",
        options: [
          "20%, vì toàn bộ lợi nhuận được giữ lại",
          "12%, bằng chi phí vốn chủ",
          "8%, tính theo tỷ lệ giữ lại của năm gần nhất",
          "Không tính được nếu chưa biết công suất nhà máy mới",
        ],
        correct: 0,
        explanation:
          "Tăng trưởng bền vững bằng ROE nhân tỷ lệ giữ lại. Không chia cổ tức thì tỷ lệ giữ lại bằng 1, nên g bằng đúng ROE là 20%. Con số 8% là g của năm gần nhất (20% nhân 40% giữ lại) - đúng cho giai đoạn sau, sai cho giai đoạn này.",
      },
      {
        id: "is-eq-01-q2",
        question: "Vì sao mô hình chiết khấu cổ tức một giai đoạn không dùng được ở đây?",
        options: [
          "Vì cổ tức bằng 0 trong ba năm nên công thức tăng trưởng đều không áp được",
          "Vì ROE 20% cao hơn chi phí vốn 12% nên mô hình cho kết quả âm",
          "Vì mô hình này chỉ áp dụng cho doanh nghiệp không có kế hoạch đầu tư lớn",
          "Vì số cổ phiếu sẽ thay đổi khi nhà máy mới đi vào hoạt động",
        ],
        correct: 0,
        explanation:
          "Mô hình một giai đoạn giả định dòng cổ tức tăng đều mãi mãi. Ba năm không có đồng cổ tức nào rồi mới khôi phục là đúng định nghĩa của một mô hình nhiều giai đoạn: chiết khấu riêng giai đoạn đầu, rồi tính giá trị cuối kỳ tại thời điểm dòng tiền trở nên đều.",
      },
      {
        id: "is-eq-01-q3",
        question: "Giá trị cuối kỳ nên được tính tại thời điểm nào?",
        options: [
          "Cuối năm thứ ba, ngay trước kỳ cổ tức đầu tiên được khôi phục",
          "Cuối năm thứ tư, sau khi đã nhận kỳ cổ tức khôi phục đầu tiên",
          "Ngay hôm nay, rồi trừ đi giá trị hiện tại của ba năm không cổ tức",
          "Cuối năm thứ năm, khi nhà máy đã chạy trọn một năm đầy đủ",
        ],
        correct: 0,
        explanation:
          "Công thức tăng trưởng đều cho ra giá trị tại thời điểm ngay TRƯỚC dòng tiền đầu tiên mà nó chiết khấu. Cổ tức khôi phục ở năm thứ tư, nên giá trị cuối kỳ đặt ở cuối năm thứ ba rồi chiết khấu về hiện tại qua ba năm. Lệch một năm ở bước này là lỗi phổ biến nhất của cả dạng bài.",
      },
      {
        id: "is-eq-01-q4",
        question: "Chi tiết 'chưa công bố công suất nhà máy' nên được xử lý ra sao trong bài phân tích?",
        options: [
          "Nêu thành giả định và đưa vào bảng độ nhạy, không tự đặt một con số",
          "Bỏ qua vì mô hình đã có ROE, công suất không ảnh hưởng tới định giá",
          "Hoãn định giá lại cho tới khi ban lãnh đạo công bố con số chính thức",
          "Giả định công suất tăng gấp đôi, vì đó là mức thường thấy của nhà máy mới",
        ],
        correct: 0,
        explanation:
          "Vignette cố tình để lại một khoảng trống - đó là phần bài kiểm tra xem bạn có nhận ra hay không. Giả định ROE giữ 20% sau khi nhà máy chạy chính là chỗ chi tiết này ẩn vào, nên nó phải được nêu rõ và thử ở nhiều mức, chứ không lặng lẽ trôi vào một con số duy nhất.",
      },
    ],
  },
  {
    id: "is-fi-01",
    topic: "Fixed Income",
    title: "Trái phiếu có quyền mua lại trong một chu kỳ lãi suất giảm",
    vignette:
      "Quỹ An Bình đang nắm hai trái phiếu doanh nghiệp cùng tổ chức phát hành, cùng xếp hạng, mệnh giá như nhau, đáo hạn còn 7 năm.\n" +
      "Trái phiếu A: coupon 8%, không kèm quyền chọn. Trái phiếu B: coupon 8,6%, tổ chức phát hành có quyền mua lại sau 2 năm ở mức 102% mệnh giá.\n" +
      "Lãi suất thị trường cho kỳ hạn này hiện ở mức 8%, và ban điều hành quỹ dự báo sẽ giảm khoảng 150 điểm cơ bản trong 18 tháng tới.\n" +
      "Duration hiệu dụng hiện tại: A là 5,4; B là 3,1. Convexity của A dương; của B âm ở vùng lợi suất thấp.",
    questions: [
      {
        id: "is-fi-01-q1",
        question: "Vì sao trái phiếu B có coupon cao hơn A dù cùng tổ chức phát hành và cùng xếp hạng?",
        options: [
          "Vì người mua bán cho tổ chức phát hành một quyền, và phải được trả cho quyền đó",
          "Vì trái phiếu có quyền mua lại luôn có rủi ro tín dụng cao hơn trái phiếu thường",
          "Vì kỳ hạn thực tế của B ngắn hơn nên lợi suất phải cao hơn để bù",
          "Vì tổ chức phát hành muốn khuyến khích nhà đầu tư giữ tới ngày mua lại",
        ],
        correct: 0,
        explanation:
          "Quyền mua lại thuộc về tổ chức phát hành, và nó có giá trị. Người mua nhận phần bù coupon chính là tiền bán quyền đó. Giá trái phiếu có quyền mua lại bằng giá trái phiếu thường trừ đi giá trị quyền chọn.",
      },
      {
        id: "is-fi-01-q2",
        question: "Nếu dự báo giảm 150 điểm cơ bản thành hiện thực, giá hai trái phiếu diễn biến thế nào?",
        options: [
          "A tăng mạnh hơn B, vì giá B bị chặn quanh mức mua lại",
          "B tăng mạnh hơn A, vì coupon cao hơn nên nhạy hơn với lãi suất",
          "Hai bên tăng như nhau vì cùng tổ chức phát hành và cùng kỳ hạn",
          "A tăng còn B giảm, vì quyền mua lại được thực hiện sẽ ép giá xuống",
        ],
        correct: 0,
        explanation:
          "Duration hiệu dụng đã nói trước điều này: 5,4 so với 3,1. Khi lãi suất giảm, khả năng bị mua lại tăng lên, và giá B tiến dần tới mức mua lại 102 rồi dừng ở đó - đó chính là biểu hiện của convexity âm.",
      },
      {
        id: "is-fi-01-q3",
        question: "Rủi ro tái đầu tư rơi vào bên nào và vào lúc nào?",
        options: [
          "Người nắm B, khi trái phiếu bị mua lại đúng lúc lãi suất đã xuống thấp",
          "Người nắm A, vì kỳ hạn dài hơn nên phải tái đầu tư coupon nhiều lần hơn",
          "Tổ chức phát hành, vì phải huy động lại vốn sau khi mua lại trái phiếu",
          "Không bên nào, vì cả hai trái phiếu đều trả coupon cố định tới đáo hạn",
        ],
        correct: 0,
        explanation:
          "Đây là nút thắt của cả vignette: quyền mua lại được thực hiện đúng vào lúc bất lợi nhất cho người nắm giữ. Họ nhận lại tiền gốc trong môi trường lãi suất thấp, và chỉ tái đầu tư được ở mức thấp hơn hẳn coupon 8,6% vừa mất.",
      },
      {
        id: "is-fi-01-q4",
        question: "Nếu ban điều hành tin chắc vào dự báo giảm lãi suất, hành động nhất quán với dự báo đó là gì?",
        options: [
          "Tăng tỷ trọng A và giảm B, để giữ được phần tăng giá",
          "Tăng tỷ trọng B để có coupon cao hơn",
          "Giữ nguyên cả hai, vì cùng tổ chức phát hành nên rủi ro đã cân bằng",
          "Bán cả hai và chuyển sang tiền gửi ngắn hạn để chờ lãi suất chạm đáy",
        ],
        correct: 0,
        explanation:
          "Câu hỏi kiểm tra tính nhất quán giữa dự báo và hành động. Tin lãi suất giảm nghĩa là muốn duration cao và convexity dương - tức là A. Giữ B trong kịch bản đó là nhận phần bù coupon để đổi lấy việc từ bỏ đúng phần tăng giá mà bạn đang dự báo.",
      },
    ],
  },
  {
    id: "is-eth-01",
    topic: "Ethical and Professional Standards",
    title: "Một chuyến thăm nhà máy, một tin đồn, và một khuyến nghị sắp phát hành",
    vignette:
      "Chị Hà, CFA, là nhà phân tích ngành thép tại một công ty chứng khoán. Chị đang hoàn thiện báo cáo nâng khuyến nghị lên MUA cho công ty Thép Đại Việt.\n" +
      "Tuần trước, Thép Đại Việt mời chị đi thăm nhà máy mới, đài thọ vé máy bay và hai đêm khách sạn. Trong bữa tối, một phó tổng giám đốc nói rằng kết quả quý sắp công bố 'sẽ làm thị trường bất ngờ theo hướng tốt'.\n" +
      "Về tới văn phòng, chị nghe một đồng nghiệp kể lại rằng bộ phận tư vấn của công ty đang đàm phán một thương vụ phát hành trái phiếu cho chính Thép Đại Việt.\n" +
      "Chị Hà đã hoàn tất mô hình định giá của mình từ trước chuyến đi, và khuyến nghị MUA dựa trên mô hình đó chứ không dựa vào điều nghe được trong bữa tối.",
    questions: [
      {
        id: "is-eth-01-q1",
        question: "Chuyến đi được đài thọ đặt ra vấn đề gì theo Standard I(B)?",
        options: [
          "Khoản đài thọ có giá trị đáng kể tạo cảm giác mắc nợ, dù chị vẫn tin mình khách quan",
          "Không vấn đề gì, vì thăm nhà máy là hoạt động nghiên cứu chính đáng",
          "Vi phạm ngay lập tức, vì Standard I(B) cấm mọi hình thức nhận từ bên được phân tích",
          "Chỉ thành vấn đề nếu chuyến đi diễn ra sau khi báo cáo đã phát hành",
        ],
        correct: 0,
        explanation:
          "Standard I(B) không cấm đi thăm nhà máy - đó là nghiên cứu tốt. Vấn đề nằm ở ai trả tiền: thiên kiến đáp trả hoạt động dưới mức nhận thức, nên việc chị tin mình vẫn khách quan không phải bằng chứng. Cách xử lý chuẩn là đi nhưng công ty tự trả chi phí.",
      },
      {
        id: "is-eth-01-q2",
        question: "Câu nói của phó tổng giám đốc trong bữa tối nên được xử lý thế nào?",
        options: [
          "Coi là thông tin trọng yếu chưa công bố: không giao dịch, không truyền, báo tuân thủ",
          "Được phép dùng vì nó chỉ là nhận định chung, không có con số cụ thể",
          "Được phép dùng vì chị nghe được trong một sự kiện có nhiều nhà phân tích khác cùng tham dự",
          "Bỏ qua vì mô hình định giá đã hoàn tất trước đó nên không bị ảnh hưởng",
        ],
        correct: 0,
        explanation:
          "Không cần con số mới là trọng yếu: một lời báo trước rằng kết quả sẽ vượt kỳ vọng thị trường thừa sức làm nhà đầu tư đổi quyết định. Việc mô hình đã xong từ trước không gỡ được nghĩa vụ - Standard II quan tâm bạn đang nắm thông tin gì, không quan tâm bạn định dùng hay không.",
      },
      {
        id: "is-eth-01-q3",
        question: "Việc bộ phận tư vấn đang đàm phán với chính doanh nghiệp này kéo theo nghĩa vụ nào?",
        options: [
          "Công bố xung đột theo Standard VI(A), và tường thông tin không thay thế được việc đó",
          "Không phát sinh nghĩa vụ nào, vì tường thông tin giữa hai bộ phận đã xử lý xong xung đột này",
          "Phải rút lại khuyến nghị cho tới khi thương vụ kết thúc hoàn toàn",
          "Chỉ cần báo cho trưởng bộ phận nghiên cứu, không cần công bố ra ngoài",
        ],
        correct: 0,
        explanation:
          "Tường thông tin chặn dòng thông tin nhưng không xoá động cơ kinh tế của tổ chức - và chính động cơ đó là thứ người đọc báo cáo cần biết để tự đánh giá. Công bố là bắt buộc; nó không thay cho tường, và tường không thay cho nó.",
      },
      {
        id: "is-eth-01-q4",
        question: "Hành động nào phù hợp nhất với toàn bộ tình huống?",
        options: [
          "Báo tuân thủ về cả ba việc, hoãn phát hành, và công bố xung đột khi phát hành",
          "Phát hành báo cáo như dự định vì kết luận dựa trên mô hình độc lập",
          "Huỷ hẳn báo cáo và chuyển việc theo dõi mã cổ phiếu này cho một đồng nghiệp khác trong nhóm",
          "Phát hành nhưng hạ khuyến nghị xuống NẮM GIỮ để tỏ ra thận trọng",
        ],
        correct: 0,
        explanation:
          "Ba vấn đề chồng lên nhau và mỗi cái có cách xử lý riêng, nhưng cùng đi qua một cửa: bộ phận tuân thủ, vì họ mới có thẩm quyền đưa mã vào danh sách hạn chế. Hạ khuyến nghị để tỏ ra thận trọng lại là vi phạm mới - khuyến nghị phải phản ánh phân tích, không phản ánh sự lúng túng.",
      },
    ],
  },
  {
    id: "is-der-01",
    topic: "Derivatives",
    title: "Phòng hộ một khoản phải thu ngoại tệ, và cái giá của từng cách",
    vignette:
      "Công ty Hải Đăng xuất khẩu và sẽ nhận 5 triệu USD sau 6 tháng. Chi phí của công ty gần như toàn bộ bằng đồng nội tệ.\n" +
      "Tỷ giá giao ngay hiện tại 25.400. Tỷ giá kỳ hạn 6 tháng được ngân hàng chào ở 25.750. Quyền chọn bán USD kỳ hạn 6 tháng, giá thực hiện 25.400, có phí 180 đồng cho mỗi USD.\n" +
      "Giám đốc tài chính tin rằng đồng nội tệ nhiều khả năng sẽ yếu đi, nhưng thừa nhận mình không chắc chắn.\n" +
      "Hội đồng quản trị vừa ra một chính sách mới: mọi khoản phơi nhiễm ngoại tệ đã chắc chắn phải được phòng hộ ít nhất 70%.",
    questions: [
      {
        id: "is-der-01-q1",
        question: "Nếu dùng hợp đồng kỳ hạn cho toàn bộ khoản phải thu, kết quả là gì?",
        options: [
          "Chốt được 128,75 tỷ đồng, không hơn không kém, bất kể tỷ giá sau đó",
          "Chốt được mức sàn 127 tỷ đồng và vẫn hưởng phần vượt nếu tỷ giá tăng",
          "Chốt được 127 tỷ đồng, tính theo tỷ giá giao ngay hiện tại",
          "Không xác định được cho tới khi biết tỷ giá giao ngay tại ngày đáo hạn",
        ],
        correct: 0,
        explanation:
          "5 triệu USD nhân 25.750 bằng 128,75 tỷ. Hợp đồng kỳ hạn là nghĩa vụ hai chiều: nó cắt cả rủi ro lẫn phần lợi, nên con số này cố định. Phương án nói tới mức sàn là mô tả của quyền chọn, không phải kỳ hạn.",
      },
      {
        id: "is-der-01-q2",
        question: "Quyền chọn bán khác hợp đồng kỳ hạn ở điểm nào trong tình huống này?",
        options: [
          "Đặt sàn 25.400 nhưng vẫn hưởng phần tăng, đổi lại trả trước 900 triệu",
          "Cho kết quả giống hệt kỳ hạn nhưng linh hoạt hơn về ngày thực hiện",
          "Bảo vệ tốt hơn vì giá thực hiện 25.400 cao hơn tỷ giá kỳ hạn 25.750",
          "Không dùng được trong trường hợp này vì công ty ở vị thế nhận ngoại tệ chứ không phải trả ra",
        ],
        correct: 0,
        explanation:
          "Phí là 5 triệu nhân 180 bằng 900 triệu đồng, trả ngay. Đổi lại giữ được phần tăng nếu đồng nội tệ yếu đi như giám đốc tài chính dự đoán. Lưu ý phương án ba: 25.400 THẤP hơn 25.750, và đó là dữ kiện bẫy trong vignette.",
      },
      {
        id: "is-der-01-q3",
        question: "Niềm tin của giám đốc tài chính về hướng tỷ giá nên ảnh hưởng tới quyết định thế nào?",
        options: [
          "Nó nghiêng lựa chọn về phía quyền chọn, nhưng không phải lý do để bỏ phòng hộ",
          "Nó là lý do chính đáng để không phòng hộ, vì phòng hộ ngược dự báo là lãng phí",
          "Nó không được phép ảnh hưởng, vì chính sách đã quy định mức phòng hộ tối thiểu",
          "Nó nên dẫn tới việc bán khống thêm USD để hưởng lợi từ dự báo",
        ],
        correct: 0,
        explanation:
          "Có quan điểm về hướng đi là hợp lý; biến nó thành lý do bỏ phòng hộ thì không, vì chính giám đốc tài chính thừa nhận mình không chắc. Quyền chọn đúng là công cụ cho trường hợp này - trả một khoản chắc chắn để giữ lại phần tăng. Bán khống thêm thì đã là đầu cơ, không còn là phòng hộ.",
      },
      {
        id: "is-der-01-q4",
        question: "Chính sách phòng hộ tối thiểu 70% của hội đồng quản trị phục vụ mục đích gì?",
        options: [
          "Đặt trước một giới hạn để quyết định không bị dẫn dắt bởi dự báo của từng thời điểm",
          "Bảo đảm công ty luôn có lãi từ hoạt động phòng hộ ngoại tệ",
          "Giảm chi phí phòng hộ so với việc phòng hộ toàn bộ khoản phơi nhiễm",
          "Đáp ứng yêu cầu bắt buộc của chuẩn mực kế toán hiện hành về ghi nhận công cụ phái sinh",
        ],
        correct: 0,
        explanation:
          "Chính sách viết trước là cách tổ chức tự bảo vệ khỏi chính mình: nó được đặt ra lúc bình tĩnh và ràng buộc quyết định lúc thị trường biến động. Phòng hộ không nhằm tạo lãi - nó mua sự chắc chắn, và đó là thứ được trả tiền để có.",
      },
    ],
  },
];

/** Tổng số câu hỏi trong toàn bộ bộ item set. */
export function totalItemSetQuestions(sets: CfaItemSet[] = CFA_ITEM_SETS): number {
  return sets.reduce((n, s) => n + s.questions.length, 0);
}

/** Các môn đã có item set, không trùng, giữ nguyên thứ tự xuất hiện. */
export function itemSetTopics(sets: CfaItemSet[] = CFA_ITEM_SETS): string[] {
  return [...new Set(sets.map((s) => s.topic))];
}
