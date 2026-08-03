/** Kích thước và mốc toạ độ của sảnh thư viện - số thuần, không React.
 *
 *  Vì sao tách khỏi ReadingRoom.tsx: file đó mở đầu bằng `"use client"`, và một
 *  module client được import từ phía server không trả về giá trị thật mà trả
 *  về một tham chiếu để trình duyệt nạp sau. Nghĩa là mọi hằng số khai trong
 *  đó, nhìn từ server, là `undefined`.
 *
 *  Điều đó không sao cho tới khi có một đường đi từ server tới đây. Nó xuất
 *  hiện khi `/pho-nghe` (server component) đọc DISTRICT_ROOMS:
 *
 *      page.tsx → district-space → lobby/stations → lobby/world
 *               → lobby/room-obstacles → ReadingRoom  ← "use client"
 *
 *  room-obstacles gọi `TABLE_ZS.map(...)` ngay ở tầng module, nên bản dựng
 *  chết ngay khi thu thập dữ liệu trang với "TABLE_ZS.map is not a function".
 *  Compile vẫn qua - kiểu vẫn đúng, chỉ có giá trị lúc chạy là không.
 *
 *  Đưa các hằng số ra một module thuần khiến cả nhánh đó không còn chạm vào
 *  ranh giới client nữa. ReadingRoom xuất lại chúng để không nơi nào phải sửa
 *  đường import.
 */

/** Kích thước sảnh. Phòng đọc Rose thật dài 297 feet, rộng 78, cao 52 - tỷ lệ
 *  ~4:1:0.7. Giữ đúng tỷ lệ đó nhưng thu nhỏ về đơn vị mét cho vừa tầm đi bộ,
 *  vì cảm giác "dài hun hút, trần rất cao" mới là thứ nhận ra căn phòng, không
 *  phải con số tuyệt đối. */
export const ROOM = {
  length: 56,
  width: 24,
  height: 13,
  /** Nhân vật không đi được ra ngoài khung này. */
  get bounds() {
    return { x: this.width / 2 - 1.6, z: this.length / 2 - 1.6 };
  },
};

export const WINDOW_COUNT = 7;
export const TABLE_ROWS = 6;

/** Vị trí tâm các hàng bàn, tính một lần ở tầng module thay vì trong component.
 *  Va chạm phía người chơi (LobbySceneInner) phải dùng đúng những con số này -
 *  để hai nơi tự tính riêng là cách chắc chắn nhất khiến hình vẽ và khối chặn
 *  lệch nhau sau lần đầu ai đó đổi số hàng bàn. */
export const TABLE_ZS: number[] = Array.from(
  { length: TABLE_ROWS },
  (_, i) => -ROOM.length / 2 + (ROOM.length / (TABLE_ROWS + 1)) * (i + 1)
);

/** Nửa kích thước khối chặn của một bàn, khớp với boxGeometry bên trong phòng. */
export const TABLE_HALF_W = 9.5 / 2;
export const TABLE_HALF_D = 1.7 / 2;

/** Ô cửa trổ trên tường đầu nam, lối ra phố. Khai báo cùng chỗ với kích thước
 *  tường - để hai nơi tự chọn số riêng thì sớm muộn cũng có người đi xuyên
 *  tường hoặc đâm vào khoảng trống. */
export const DOOR_HALF_W = 2.8;
export const DOOR_HEIGHT = 5.6;
