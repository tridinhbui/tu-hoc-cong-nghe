import type { DistrictRoomId } from "@/components/career-district/district-space";

/** Bài học nào mở thẳng được sang căn phòng 3D dạy đúng điều đó.
 *
 *  Sáu căn phòng dạy trong Phố nghề chỉ tới được bằng cách tìm ra /pho-nghe,
 *  đi bộ dọc con phố dài 180 m, rồi đoán đúng một trong 22 cánh cửa. Đo ra thì
 *  cả ứng dụng chỉ có HAI đường dẫn tới /pho-nghe. Một căn phòng không ai tìm
 *  thấy thì không khác gì một căn phòng không tồn tại.
 *
 *  Bảng này nối theo chiều ngược lại: đang đọc bài về vốn lưu động thì có một
 *  nút đi thẳng tới Phòng Vòng Quay Tiền. Đó là lúc căn phòng có ích nhất -
 *  ngay sau khi đọc, chứ không phải một lúc nào đó khi tình cờ đi ngang.
 *
 *  MỌI SLUG Ở ĐÂY LÀ VIẾT TAY, nên chúng phải bị đối chiếu bằng test. Đêm nay
 *  bảo tàng ra đời với bốn hiện vật do tôi tự nghĩ slug và ba trong bốn dẫn
 *  tới trang 404, trong khi mọi test khác vẫn xanh và cảnh 3D vẫn dựng bình
 *  thường. lib/__tests__/lesson-room-links.test.ts là người đối chiếu. */

export interface LessonRoomLink {
  /** Phòng sẽ mở ra. */
  room: DistrictRoomId;
  /** Chữ trên nút. Nói căn phòng LÀM GÌ, không nói tên nó. */
  cta: string;
  /** Vì sao căn phòng nói được điều mà trang bài học không nói được. Nếu chỗ
   *  này viết ra chỉ là "xem thêm về X" thì cái nối đó không đáng có. */
  why: string;
}

export const LESSON_ROOM_LINKS: Record<string, LessonRoomLink> = {
  // ── Phòng Vòng Quay Tiền ──────────────────────────────────────────────────
  "von-luu-dong-la-gi": {
    room: "vong-quay-tien",
    cta: "Nhìn vốn lưu động thành một vòng đi được",
    why: "Vốn lưu động trên giấy là một hiệu số. Trong phòng nó là một vòng tròn có chiều, và chỗ nó âm thì nhìn thấy được.",
  },
  "cash-conversion-cycle": {
    room: "vong-quay-tien",
    cta: "Đi thử bốn mô hình có vòng quay khác nhau",
    why: "Cùng một công thức cho ra vòng quay dương ở nhà thầu và âm ở siêu thị. Phòng bày cả bốn cạnh nhau để thấy dấu, không chỉ thấy độ lớn.",
  },
  "cash-conversion-cycle-2": {
    room: "vong-quay-tien",
    cta: "Đi thử bốn mô hình có vòng quay khác nhau",
    why: "Cùng một công thức cho ra vòng quay dương ở nhà thầu và âm ở siêu thị. Phòng bày cả bốn cạnh nhau để thấy dấu, không chỉ thấy độ lớn.",
  },
  "working-capital-management": {
    room: "vong-quay-tien",
    cta: "Xem rút kho một ngày thì đổi bao nhiêu tiền",
    why: "Phòng đổi 'ngày' sang 'tiền' theo doanh thu ngày - bước nhảy mà bài học để lại cho người đọc tự làm.",
  },
  "hang-ton-kho-la-gi": {
    room: "vong-quay-tien",
    cta: "Xem hàng tồn kho chiếm bao nhiêu vòng quay",
    why: "Tồn kho là một trong ba cung của vòng quay tiền. Phòng cho thấy nó dài bao nhiêu so với hai cung kia.",
  },
  "khoan-phai-thu-la-gi": {
    room: "vong-quay-tien",
    cta: "Xem khoản phải thu kéo dài vòng quay thế nào",
    why: "Phải thu là quãng tiền đã bán nhưng chưa về. Phòng vẽ đúng quãng đó trên vòng tròn.",
  },

  // ── Phòng Rủi Ro & Phân Bổ ────────────────────────────────────────────────
  "diversification-da-dang-hoa": {
    room: "phan-bo-rui-ro",
    cta: "Nhìn thấy phần được cho không",
    why: "Phòng dựng cột rủi ro thật bên dưới vạch trung bình có trọng số. Khoảng hụt giữa hai thứ chính là lợi ích đa dạng hoá, và nó teo dần khi tương quan tăng.",
  },
  "da-dang-hoa-danh-muc-theo-nganh": {
    room: "phan-bo-rui-ro",
    cta: "Thử bốn mức tương quan xem còn lợi gì",
    why: "Chia theo ngành có ích vì các ngành không đi khít nhau. Phòng cho kéo thẳng hệ số tương quan để thấy lợi ích mất đi ở đâu.",
  },
  "volatility-bien-dong": {
    room: "phan-bo-rui-ro",
    cta: "Xem hai độ biến động cộng lại thành gì",
    why: "Trộn 20% với 7% KHÔNG ra 13,5%. Phòng bày cả con số ai cũng đoán lẫn con số thật, cạnh nhau.",
  },
  "modern-portfolio-theory": {
    room: "phan-bo-rui-ro",
    cta: "Nhảy tới tỉ trọng ít dao động nhất",
    why: "Phòng tính điểm phương sai nhỏ nhất bằng công thức đóng và cho nhảy thẳng tới đó, thay vì để người học tin vào một cái hình.",
  },

  // ── Bàn Tròn Giảng Lại ────────────────────────────────────────────────────
  "dong-tien": {
    room: "ban-tron",
    cta: "Thử giảng lại cho một người bạn mở quán ăn",
    why: "Đọc hiểu và giải thích được là hai việc khác nhau. Bàn tròn bắt nói ra rồi soi lại xem thiếu ý nào.",
  },
  "lai-don-lai-kep": {
    room: "ban-tron",
    cta: "Thử giảng lãi kép cho em họ 18 tuổi",
    why: "Người nghe là một đứa em vừa đi làm thêm, không phải giám khảo. Đổi người nghe là đổi cả cách nói - và đó là lúc lộ ra chỗ mình chưa hiểu.",
  },
  "lai-kep-huu-tri-bat-dau-som": {
    room: "ban-tron",
    cta: "Thử nói vì sao thời gian hơn số tiền",
    why: "Bài đã cho biết mười năm đầu quan trọng nhất. Bàn tròn hỏi bạn có nói lại được lý do mà không đọc lại không.",
  },

  // ── Phòng Ba Báo Cáo ──────────────────────────────────────────────────────
  "mo-hinh-ba-bao-cao-lien-ket": {
    room: "ba-bao-cao",
    cta: "Chạm một khoản, nhìn nó chạy qua cả ba bảng",
    why: "Trang giấy phải kể ba bảng lần lượt. Phòng đổi cả ba cùng lúc và tô đúng dòng vừa đổi, nên mối nối nhìn thấy được thay vì phải hình dung.",
  },
  "bang-ho-tro-khau-hao-von-luu-dong": {
    room: "ba-bao-cao",
    cta: "Xem khấu hao làm tiền mặt TĂNG",
    why: "Khấu hao là chi phí nhưng không chi tiền, nên nó làm tiền tăng chứ không giảm. Phòng bắt bạn đoán trước khi lật ba bảng.",
  },
};

/** Đường dẫn mở thẳng một căn phòng. */
export function roomHref(room: DistrictRoomId): string {
  return `/pho-nghe?phong=${room}`;
}

export function linkForLesson(slug: string): LessonRoomLink | null {
  return LESSON_ROOM_LINKS[slug] ?? null;
}
