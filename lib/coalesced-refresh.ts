/** Gộp một chuỗi sự kiện dồn dập thành một lần tải lại.
 *
 *  VÌ SAO CẦN. `subscribeToCommunityFeed` đăng ký ba kênh realtime KHÔNG lọc -
 *  feed cộng đồng là chung, nên nó phải thế - và cả ba đều gọi cùng một
 *  `onChange()` không mang payload. Client nhận được nó thì tải lại TOÀN BỘ
 *  feed, cộng thêm một truy vấn bình luận cho mỗi thread đang mở.
 *
 *  Nghĩa là một người thả cảm xúc ở đâu đó làm MỌI người đang mở /bang-tin
 *  chạy một truy vấn feed. N người xem nhân M sự kiện, và cảm xúc là loại sự
 *  kiện dày nhất trong một mạng xã hội. Đây không phải chuyện số message
 *  realtime - đó là phần rẻ - mà là chuyện số truy vấn và lượng dữ liệu ra.
 *
 *  Hai thứ hàm này làm, cả hai đều không đổi thứ người dùng nhìn thấy:
 *
 *  1. GỘP. Mười sự kiện trong một giây thành một lần tải lại. Feed không cần
 *     tươi tới từng phần nghìn giây, và mười lần tải lại liên tiếp thì chín
 *     lần đầu bị lần cuối ghi đè ngay.
 *
 *  2. HOÃN KHI TAB BỊ ẨN. Một tab /bang-tin để nền vẫn đang trả tiền cho mọi
 *     hoạt động của cả nền tảng để dựng lại thứ không ai nhìn. Khi tab hiện
 *     lại, nếu có sự kiện bị bỏ lỡ thì tải lại đúng MỘT lần - người dùng thấy
 *     nội dung mới ngay lúc họ quay lại nhìn, không sớm hơn.
 *
 *  Tách khỏi supabase-community.ts để kiểm được bằng đồng hồ giả, không cần
 *  websocket. */

export type CoalescerOptions = {
  /** Cửa sổ gộp, tính bằng mili giây. */
  windowMs: number;
  /** Tab có đang hiện không. Mặc định đọc `document.visibilityState`. */
  isVisible?: () => boolean;
};

export type Coalescer = {
  /** Ghi nhận một sự kiện. Nhiều lần gọi trong cùng cửa sổ chỉ chạy một lần. */
  trigger: () => void;
  /** Gọi khi tab hiện trở lại: chạy ngay nếu có sự kiện bị bỏ lỡ. */
  onVisible: () => void;
  /** Dọn hẹn giờ đang treo. */
  cancel: () => void;
};

const defaultIsVisible = () =>
  typeof document === "undefined" || document.visibilityState === "visible";

export function createCoalescer(run: () => void, options: CoalescerOptions): Coalescer {
  const isVisible = options.isVisible ?? defaultIsVisible;
  let timer: ReturnType<typeof setTimeout> | null = null;
  // Sự kiện đã tới trong lúc tab bị ẩn. Chỉ cần một cờ: mọi sự kiện đều dẫn
  // tới cùng một hành động là tải lại, nên đếm chúng không thêm thông tin gì.
  let missedWhileHidden = false;

  function fire() {
    timer = null;
    if (!isVisible()) {
      missedWhileHidden = true;
      return;
    }
    missedWhileHidden = false;
    run();
  }

  return {
    trigger() {
      if (!isVisible()) {
        // Không đặt hẹn giờ khi tab bị ẩn: một tab nền có thể nhận sự kiện
        // suốt nhiều giờ, và mọi lần chạy đều dựng lại thứ không ai nhìn.
        missedWhileHidden = true;
        return;
      }
      if (timer !== null) return;
      timer = setTimeout(fire, options.windowMs);
    },
    onVisible() {
      if (!missedWhileHidden) return;
      missedWhileHidden = false;
      // Chạy ngay chứ không chờ hết cửa sổ: người dùng vừa quay lại nhìn, và
      // ở đây không có chuỗi dồn dập nào để gộp.
      run();
    },
    cancel() {
      if (timer !== null) clearTimeout(timer);
      timer = null;
      // Bỏ luôn phần treo: bên gọi đang gỡ bỏ, nên không còn ai để tải lại cho.
      missedWhileHidden = false;
    },
  };
}
