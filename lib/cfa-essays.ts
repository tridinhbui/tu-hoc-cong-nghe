/**
 * Câu tự luận (constructed response) - dạng đề buổi sáng của CFA Level III.
 *
 * Vì sao không làm thành trắc nghiệm: buổi sáng Level III không hỏi "đáp án nào
 * đúng" mà hỏi "hãy nêu và giải thích". Người chấm cho điểm theo từng ý, và
 * phần lớn thí sinh trượt vì viết dài mà thiếu ý, chứ không phải vì chọn sai
 * phương án. Đưa nó về bốn ô A/B/C/D là bỏ mất đúng thứ kỳ thi này đo.
 *
 * Cũng vì thế mà ở đây không có máy chấm. Cái ta đưa ra là `rubric` - danh sách
 * ý mà người chấm thật sẽ tìm, kèm số điểm của từng ý. Người học viết ra giấy,
 * bấm mở thang chấm, rồi tự tick những ý mình thực sự đã viết. Tự chấm nghiêm
 * hơn hẳn khi thang chấm chỉ hiện ra SAU khi đã viết xong, nên giao diện phải
 * giữ đúng thứ tự đó.
 *
 * Điểm tự chấm không đi đâu cả: không lưu, không vào XP, không vào
 * `avg_quiz_score`. Một con số do chính người học tự cho mình mà lại chảy vào
 * phần trăm năng lực ở /su-nghiep thì còn tệ hơn là không có gì.
 */

export interface RubricPoint {
  /** Ý mà người chấm tìm. Viết ở dạng "phải nói được X", không phải câu văn mẫu. */
  text: string;
  /** Điểm của ý này. Tổng các ý bằng `minutes` - đúng quy ước 1 điểm 1 phút. */
  points: number;
}

export interface CfaEssay {
  id: string;
  topic: string;
  /** Bối cảnh khách hàng - luôn có ràng buộc, vì Level III hỏi trong ràng buộc. */
  vignette: string;
  /** Yêu cầu (command word: nêu, giải thích, tính, biện luận). */
  prompt: string;
  /** Thời lượng khuyến nghị, phút. Bằng tổng điểm. */
  minutes: number;
  rubric: RubricPoint[];
  /** Lỗi thường gặp - đọc sau khi tự chấm, không phải trước. */
  commonMistake: string;
}

export const CFA_ESSAYS: CfaEssay[] = [
  {
    id: "es-ips-01",
    topic: "IPS cá nhân",
    vignette:
      "Ông Trần, 58 tuổi, vừa bán xưởng cơ khí của mình được 42 tỷ đồng sau thuế. Ông dự định nghỉ hưu ở tuổi 60 và cần rút 1,4 tỷ mỗi năm (theo giá hiện tại) để sinh hoạt. Ngoài danh mục này ông có lương hưu 180 triệu/năm và một căn nhà cho thuê thu 400 triệu/năm. Vợ ông 55 tuổi, sức khỏe tốt. Ông nói: \"Tôi không chịu nổi khi thấy tài khoản mất quá 15% trong một năm.\"",
    prompt:
      "Xác định khả năng chịu rủi ro (ability) và mức sẵn sàng chịu rủi ro (willingness) của ông Trần, và nêu mức chấp nhận rủi ro tổng thể mà bạn sẽ ghi vào IPS.",
    minutes: 8,
    rubric: [
      { text: "Kết luận ability ở mức trên trung bình - và phải chỉ ra căn cứ, không chỉ nói suông", points: 2 },
      { text: "Tính tỷ lệ rút vốn: (1,4 − 0,18 − 0,4) / 42 ≈ 1,95%, thấp so với danh mục", points: 2 },
      { text: "Nêu chân trời đầu tư dài (còn ~30 năm, tính cả tuổi thọ của vợ), làm tăng ability", points: 1 },
      { text: "Kết luận willingness thấp, căn cứ trực tiếp vào câu nói về mức sụt 15%", points: 2 },
      { text: "Khi hai bên lệch nhau thì lấy bên thấp hơn, tức willingness, làm mức tổng thể", points: 1 },
    ],
    commonMistake:
      "Viết \"ability cao vì ông ấy giàu\". Giàu không phải là căn cứ - con số phải là tỷ lệ rút vốn trên quy mô danh mục. Ba mươi tỷ mà rút 8% một năm thì ability thấp.",
  },
  {
    id: "es-beh-01",
    topic: "Tài chính hành vi",
    vignette:
      "Bà Lê giữ 62% danh mục ở cổ phiếu công ty cũ nơi bà làm 20 năm. Bà từ chối bán, nói rằng \"tôi hiểu công ty này hơn bất kỳ ai\". Bà cũng bán sạch quỹ chỉ số hồi tháng 3 sau khi nó giảm 9%, và giữ nguyên một khoản lỗ 40% ở cổ phiếu bất động sản vì \"bán là mất thật\".",
    prompt:
      "Nhận diện hai thiên lệch hành vi trong hành vi của bà Lê, phân loại mỗi thiên lệch là nhận thức (cognitive) hay cảm xúc (emotional), và nêu cách xử lý phù hợp với từng loại.",
    minutes: 6,
    rubric: [
      { text: "Nhận diện familiarity/overconfidence ở khoản 62% cổ phiếu công ty cũ", points: 1 },
      { text: "Nhận diện disposition effect: giữ khoản lỗ 40%, cắt khoản mới giảm 9%", points: 1 },
      { text: "Phân loại đúng: familiarity là cognitive, disposition là emotional", points: 2 },
      { text: "Thiên lệch nhận thức thì khắc phục bằng thông tin và kỷ luật quy trình", points: 1 },
      { text: "Thiên lệch cảm xúc thì thích nghi (adapt) chứ khó sửa - điều chỉnh IPS quanh nó", points: 1 },
    ],
    commonMistake:
      "Gọi mọi thứ là \"loss aversion\" rồi khuyên \"giáo dục khách hàng\". Với thiên lệch cảm xúc, giáo dục hầu như không có tác dụng; đề thi cho điểm ở chỗ phân biệt moderate/adapt.",
  },
  {
    id: "es-fi-01",
    topic: "Thu nhập cố định",
    vignette:
      "Một quỹ hưu trí có nghĩa vụ chi trả 500 tỷ đồng sau đúng 7 năm nữa. Danh mục trái phiếu hiện có duration 4,2 và giá trị 340 tỷ. Nhà quản lý đề xuất chuyển sang một rổ trái phiếu có duration 7,0, cùng giá trị hiện tại với nghĩa vụ, và có độ lồi (convexity) lớn hơn nghĩa vụ.",
    prompt:
      "Nêu ba điều kiện để chiến lược immunization một nghĩa vụ đơn lẻ đạt mục tiêu, và cho biết đề xuất trên có thỏa mãn không.",
    minutes: 7,
    rubric: [
      { text: "Điều kiện 1: giá trị hiện tại của danh mục bằng giá trị hiện tại của nghĩa vụ", points: 2 },
      { text: "Điều kiện 2: money duration (hoặc BPV) của danh mục khớp với nghĩa vụ", points: 2 },
      { text: "Điều kiện 3: convexity danh mục lớn hơn nhưng ở mức tối thiểu, để giảm rủi ro cấu trúc kỳ hạn", points: 2 },
      { text: "Kết luận đề xuất thỏa mãn cả ba, và nêu rằng phải tái cân bằng định kỳ khi duration trôi", points: 1 },
    ],
    commonMistake:
      "Viết \"convexity càng cao càng tốt\". Convexity cao hơn nghĩa vụ là cần, nhưng cao quá thì dòng tiền dàn rộng và danh mục nhạy hơn với thay đổi hình dạng đường cong - đúng thứ immunization muốn tránh.",
  },
  {
    id: "es-gips-01",
    topic: "Đạo đức & GIPS",
    vignette:
      "Một công ty quản lý quỹ ở TP.HCM quảng cáo: \"Tuân thủ GIPS cho quỹ cổ phiếu tăng trưởng của chúng tôi. Hiệu suất 5 năm qua đạt 18,4%/năm, đã kiểm toán độc lập.\" Composite cổ phiếu tăng trưởng gồm 12 tài khoản; ba tài khoản có phí thấp bất thường đã bị loại khỏi composite để \"tránh làm nhiễu\".",
    prompt: "Nêu hai vi phạm GIPS trong tình huống trên và giải thích vì sao mỗi hành vi là vi phạm.",
    minutes: 6,
    rubric: [
      { text: "Vi phạm 1: tuyên bố tuân thủ cho một phần công ty - GIPS áp dụng cho toàn firm", points: 2 },
      { text: "Vi phạm 2: loại tài khoản khỏi composite theo tiêu chí tùy ý, tạo cherry-picking", points: 2 },
      { text: "Giải thích: mọi tài khoản có phí, được quản lý theo cùng chiến lược, phải nằm trong composite", points: 1 },
      { text: "Nêu rằng \"đã kiểm toán\" không đồng nghĩa với verification theo GIPS", points: 1 },
    ],
    commonMistake:
      "Chỉ bắt được lỗi cherry-picking mà bỏ qua chuyện tuyên bố ở cấp sản phẩm. Đó là lỗi cơ bản nhất của GIPS và gần như luôn có điểm riêng.",
  },
];

export function totalEssayMinutes(): number {
  return CFA_ESSAYS.reduce((sum, e) => sum + e.minutes, 0);
}

/** Tổng điểm của một câu. Bằng `minutes` theo quy ước 1 điểm 1 phút của kỳ thi;
 *  tính lại từ rubric thay vì tin vào `minutes` để lệch sẽ lộ ra ở test. */
export function essayMaxPoints(essay: CfaEssay): number {
  return essay.rubric.reduce((sum, r) => sum + r.points, 0);
}
