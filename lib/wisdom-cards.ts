// Static content pool for the post-lesson "wisdom card" flip reveal - no
// table, no persistence of which card was shown, purely random each time a
// lesson is finished. Same "hardcoded content array" pattern as
// CHEST_REWARDS in lib/chests.ts.
export interface WisdomCard {
  id: string;
  text: string;
}

export const WISDOM_CARDS: WisdomCard[] = [
  { id: "wc-001", text: "Chi tiêu ít hơn số tiền kiếm được là quy tắc đầu tiên - không có công cụ đầu tư nào cứu được một người luôn tiêu nhiều hơn thu." },
  { id: "wc-002", text: "Quỹ khẩn cấp không phải để sinh lời - nó tồn tại để bạn không phải bán tài sản tốt vào đúng lúc giá đang xấu." },
  { id: "wc-003", text: "Lãi kép cần thời gian hơn là cần số tiền lớn. Bắt đầu sớm với số nhỏ thường thắng bắt đầu muộn với số lớn." },
  { id: "wc-004", text: "Rủi ro lớn nhất không phải là mất tiền trong ngắn hạn, mà là không bao giờ bắt đầu vì sợ mất tiền." },
  { id: "wc-005", text: "Một tài sản tốt mua ở giá cao vẫn tốt hơn một tài sản tệ mua ở giá thấp." },
  { id: "wc-006", text: "Đa dạng hóa không phải để tối đa lợi nhuận - nó để bạn không bị loại khỏi cuộc chơi chỉ vì một khoản đặt cược sai." },
  { id: "wc-007", text: "Nợ tốt giúp bạn xây dựng tài sản. Nợ xấu giúp người khác xây dựng tài sản bằng tiền của bạn." },
  { id: "wc-008", text: "Thị trường không quan tâm bạn mua ở giá nào - nó chỉ quan tâm giá trị thực sẽ đi về đâu." },
  { id: "wc-009", text: "Kỷ luật đầu tư đều đặn mỗi tháng thường thắng việc cố đoán đúng thời điểm thị trường." },
  { id: "wc-010", text: "Đọc báo cáo tài chính một công ty giống như đọc lý lịch một người trước khi kết hôn - đừng bỏ qua bước này." },
  { id: "wc-011", text: "Lạm phát là kẻ trộm âm thầm nhất - nó không lấy tiền của bạn, nó lấy sức mua của bạn." },
  { id: "wc-012", text: "Bảo hiểm không phải là chi phí lãng phí - nó là cách bạn chuyển giao rủi ro mà một mình bạn không gánh nổi." },
  { id: "wc-013", text: "Đừng nhầm giữa 'giá đang giảm' với 'giá đang rẻ' - hai điều này không phải lúc nào cũng giống nhau." },
  { id: "wc-014", text: "Một kế hoạch tài chính tồi vẫn tốt hơn không có kế hoạch nào - vì ít nhất nó cho bạn thứ để điều chỉnh." },
  { id: "wc-015", text: "Tài sản là thứ bỏ tiền vào túi bạn. Tiêu sản là thứ lấy tiền ra khỏi túi bạn - dù trông nó có sang trọng đến đâu." },
  { id: "wc-016", text: "Đừng đầu tư vào thứ bạn không hiểu, chỉ vì người khác đang kiếm tiền từ nó." },
  { id: "wc-017", text: "Thời gian trên thị trường thường quan trọng hơn việc canh đúng thời điểm vào thị trường." },
  { id: "wc-018", text: "Một đồng tiết kiệm hôm nay có giá trị hơn một đồng tiết kiệm ngày mai - đó là lý do lãi kép luôn thưởng cho người bắt đầu sớm." },
  { id: "wc-019", text: "Đừng để cảm xúc quyết định khi thị trường hoảng loạn - đó chính xác là lúc kỷ luật trở nên đắt giá nhất." },
  { id: "wc-020", text: "Chi phí ẩn (phí quản lý, phí giao dịch) âm thầm bào mòn lợi nhuận nhiều hơn bạn tưởng qua nhiều năm." },
  { id: "wc-021", text: "Một ngân sách không phải để hạn chế bạn - nó để bạn biết chính xác tiền của mình đang đi đâu." },
  { id: "wc-022", text: "Không ai quan tâm đến tiền của bạn nhiều hơn chính bạn - đừng giao toàn bộ quyết định cho người khác." },
  { id: "wc-023", text: "So sánh bản thân với người khác trong đầu tư là con đường nhanh nhất dẫn đến quyết định sai lầm." },
  { id: "wc-024", text: "Tự do tài chính không phải là có thật nhiều tiền - đó là có đủ lựa chọn để không phải làm việc mình không muốn." },
  { id: "wc-025", text: "Học cách đọc một hợp đồng vay trước khi ký - lãi suất ẩn thường nằm ở những dòng chữ nhỏ nhất." },
  { id: "wc-026", text: "Đầu tư vào kiến thức tài chính của chính mình luôn trả lãi cao nhất, và không ai đánh thuế được nó." },
  { id: "wc-027", text: "Một danh mục đầu tư tốt là danh mục bạn có thể ngủ ngon, không phải danh mục có lợi nhuận cao nhất trên giấy." },
  { id: "wc-028", text: "Đừng vay tiền để đầu tư vào thứ có thể giảm giá nhanh hơn tốc độ bạn trả lãi." },
  { id: "wc-029", text: "Sự kiên nhẫn là một chiến lược đầu tư - chỉ là ít người đủ kỷ luật để thực sự áp dụng nó." },
  { id: "wc-030", text: "Tiền không mua được hạnh phúc, nhưng thiếu kế hoạch tài chính chắc chắn mua được rất nhiều lo âu." },
  { id: "wc-031", text: "Hãy trả cho chính mình trước - trích tiết kiệm ngay khi nhận lương, trước khi kịp tiêu vào việc khác." },
  { id: "wc-032", text: "Giá trị của một tài sản đến từ dòng tiền nó tạo ra trong tương lai, không phải từ việc mọi người đang bàn tán về nó." },
  { id: "wc-033", text: "Quản lý rủi ro không phải là tránh mọi rủi ro - đó là chỉ chấp nhận những rủi ro bạn hiểu rõ và có thể chịu được." },
  { id: "wc-034", text: "Đừng để một khoản lãi lớn khiến bạn quên mất kỷ luật đã giúp bạn có được nó." },
  { id: "wc-035", text: "Chữ ký của bạn trên hợp đồng vay có giá trị hơn lời hứa miệng của bất kỳ ai - đọc kỹ trước khi ký." },
  { id: "wc-036", text: "Tiết kiệm mà không có mục tiêu cụ thể rất dễ bị bỏ cuộc giữa chừng - hãy gắn mỗi khoản tiết kiệm với một mục tiêu rõ ràng." },
  { id: "wc-037", text: "Người giàu mua tài sản trước, tiêu sản sau. Người nghèo thường làm ngược lại." },
  { id: "wc-038", text: "Không có khoản đầu tư nào 'chắc chắn thắng' - ai nói vậy với bạn đang bán thứ gì đó, không phải sự thật." },
  { id: "wc-039", text: "Học cách nói 'không' với những khoản chi tiêu theo cảm xúc là kỹ năng tài chính quan trọng nhất ít ai dạy bạn." },
  { id: "wc-040", text: "Một quyết định tài chính tốt hôm nay là món quà bạn gửi cho chính mình mười năm sau." },
  { id: "wc-041", text: "Đòn bẩy tài chính giống như con dao hai lưỡi - dùng đúng thì tăng tốc, dùng sai thì gây thương tích nặng." },
  { id: "wc-042", text: "Đừng đợi đến khi 'có nhiều tiền hơn' mới bắt đầu học về tài chính - kiến thức nên đi trước số tiền, không phải theo sau." },
  { id: "wc-043", text: "Chi phí cơ hội là thứ vô hình nhưng luôn hiện diện - mỗi đồng bạn tiêu hôm nay là một đồng không còn có thể sinh lời trong tương lai." },
  { id: "wc-044", text: "Đừng nhầm lẫn giữa thu nhập cao và giàu có - nhiều người thu nhập cao vẫn nghèo vì chi tiêu còn cao hơn." },
  { id: "wc-045", text: "Bảng cân đối kế toán cá nhân của bạn (tài sản trừ nợ) quan trọng hơn nhiều so với mức lương ghi trên hợp đồng." },
];

export function getRandomWisdomCard(): WisdomCard {
  return WISDOM_CARDS[Math.floor(Math.random() * WISDOM_CARDS.length)];
}
