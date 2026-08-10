/** Huy hiệu thông báo của nút Kết nối ở góc phải dưới.
 *
 *  VÌ SAO CÓ FILE NÀY. Ba nút nổi trước đây - góp ý, mời bạn, nhóm - gộp thành
 *  một nút duy nhất. Gộp xong thì mỗi widget vẫn tự biết số chưa đọc của mình,
 *  nhưng KHÔNG ai biết tổng, và cái nút đứng ngoài thì không nói được gì.
 *
 *  Đó chính là điều người dùng kêu: lời mời kết bạn tới mà không thấy báo ở
 *  đâu cả. Trước khi gộp, lời mời kết bạn thậm chí không có nút nào ở góc -
 *  trang Bạn bè chỉ tới được từ menu - nên nó im lặng theo đúng nghĩa đen.
 *
 *  Ba nguồn, ba nơi khác nhau, nên phép cộng phải nằm ở một chỗ đọc được:
 *
 *  - lời mời kết bạn đang chờ (bảng user_friendships, chiều "incoming")
 *  - tin nhắn riêng chưa đọc (bảng direct_messages, cột read_by_recipient)
 *  - tin nhắn góp ý chưa đọc (admin trả lời, cột `read` của chat_messages)
 *  - tin nhắn nhóm học chưa đọc (so với mốc đọc cuối trong localStorage)
 *
 *  Tin nhắn riêng vào sau ba nguồn kia, và vì đúng lý do đã dựng file này.
 *  Dòng "Bạn bè & kết nối" ghi phụ đề "lời mời và tin nhắn riêng" ngay từ đầu,
 *  nhưng huy hiệu chỉ đếm lời mời - nên tin nhắn riêng im lặng y hệt cách lời
 *  mời từng im lặng, chỉ khác là lần này có một cái nhãn nói rằng nó không im.
 *
 *  Không gộp trong component: một phép cộng nằm giữa ba lời gọi mạng thì
 *  không có cách nào kiểm nó cộng đúng, mà cộng sai theo chiều thiếu thì
 *  người dùng lại mất tin - đúng lỗi vừa được báo. */

export interface ConnectCounts {
  /** Lời mời kết bạn đang chờ mình trả lời. */
  friendRequests: number;
  /** Tin nhắn riêng từ bạn bè mà mình chưa mở ra đọc. */
  directMessages: number;
  /** Tin admin trả lời trong luồng góp ý mà mình chưa đọc. */
  feedbackReplies: number;
  /** Tin nhắn mới trong nhóm học kể từ lần mình mở gần nhất. */
  groupMessages: number;
}

export const EMPTY_CONNECT_COUNTS: ConnectCounts = {
  friendRequests: 0,
  directMessages: 0,
  feedbackReplies: 0,
  groupMessages: 0,
};

/** Tổng số việc đang chờ. Số âm hoặc không phải số đều bị coi là 0. */
export function totalConnectCount(counts: ConnectCounts): number {
  const safe = (n: number) => (Number.isFinite(n) && n > 0 ? Math.floor(n) : 0);
  return (
    safe(counts.friendRequests) +
    safe(counts.directMessages) +
    safe(counts.feedbackReplies) +
    safe(counts.groupMessages)
  );
}

/** Chữ trên huy hiệu, hoặc null khi không có gì để báo.
 *
 *  Cắt ở "9+" thay vì in số thật: huy hiệu nằm trên một nút tròn 56px, và một
 *  con số ba chữ số hoặc tràn ra ngoài hoặc phải thu nhỏ tới mức không đọc
 *  được. Người dùng cần biết CÓ việc đang chờ, còn chính xác 47 hay 48 thì
 *  đọc trong danh sách. */
export function connectBadgeLabel(counts: ConnectCounts): string | null {
  const total = totalConnectCount(counts);
  if (total <= 0) return null;
  return total > 9 ? "9+" : String(total);
}

/** Mục nào trong menu đang có việc chờ - để chấm báo đứng cạnh đúng dòng. */
export function hasPending(counts: ConnectCounts, item: keyof ConnectCounts): boolean {
  const value = counts[item];
  return Number.isFinite(value) && value > 0;
}
