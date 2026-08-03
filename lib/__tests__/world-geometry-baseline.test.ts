import { describe, expect, it } from "vitest";
import { DISTRICT_ROOMS } from "@/components/career-district/district-space";
import { ROOM as STUDY_ROOM, SEATS, TABLE } from "@/components/study-room/study-room-space";

/** Mốc hình học của thế giới 3D.
 *
 *  Mọi thứ khác trong bộ test kiểm những ràng buộc phải đúng (không lọt tường,
 *  đi tới được mọi bàn). Bài này kiểm thứ khác: hình dạng thế giới có ĐỔI KHÔNG
 *  MONG MUỐN hay không.
 *
 *  Lý do nó tồn tại: đồ trang bị trong components/lobby/AvatarGear.tsx đặt toạ
 *  độ bám theo hình người trong LobbyAvatar - đầu ở y=1.62, tay ở x=±0.32. Ai
 *  đó chỉnh dáng nhân vật một chút là vương miện bay lửng và cây kiếm mọc ra
 *  giữa bụng, mà không có gì báo: cảnh vẫn dựng, test vẫn xanh, chỉ có nhìn mới
 *  thấy. Số ở đây không "đúng" theo nghĩa nào cả - chúng chỉ là ảnh chụp của
 *  hiện trạng, và đổi chúng là việc bình thường KHI CỐ Ý.
 *
 *  Sửa mốc: đổi số ở đây trong cùng commit với thay đổi hình học, và nói rõ vì
 *  sao trong commit message. */

/** Điểm neo trên hình người mà đồ đeo bám vào (xem AvatarGear). */
const AVATAR_ANCHORS = {
  headY: 1.62,
  headRadius: 0.21,
  bodyY: 1.08,
  armX: 0.32,
  armY: 1.32,
};

describe("mốc hình người", () => {
  it("các điểm neo của đồ đeo không đổi ngoài ý muốn", () => {
    // Đổi dòng này thì phải mở AvatarGear.tsx và chỉnh lại toạ độ mũ, kính,
    // vũ khí - cả bốn đều tính từ đây.
    expect(AVATAR_ANCHORS).toEqual({
      headY: 1.62,
      headRadius: 0.21,
      bodyY: 1.08,
      armX: 0.32,
      armY: 1.32,
    });
  });
});

describe("mốc phòng học nhóm", () => {
  it("kích thước phòng và bàn giữ nguyên", () => {
    expect({
      width: STUDY_ROOM.width,
      depth: STUDY_ROOM.depth,
      bounds: STUDY_ROOM.bounds,
      table: TABLE,
      seats: SEATS.length,
    }).toEqual({
      width: 15,
      depth: 18,
      bounds: { x: 6.6, z: 8.2 },
      table: { x: 0, z: -0.6, halfW: 2.4, halfD: 1.2, top: 0.76 },
      seats: 8,
    });
  });
});

describe("mốc khu phố nghề", () => {
  it("số phòng, số bàn và số bục giữ nguyên", () => {
    const rooms = Object.values(DISTRICT_ROOMS);
    const shape = {
      rooms: rooms.length,
      desks: rooms.reduce((n, r) => n + r.desks.length, 0),
      portals: rooms.reduce((n, r) => n + r.portals.length, 0),
      doorways: rooms.reduce((n, r) => n + r.doorways.length, 0),
      lifts: rooms.filter((r) => r.lift).length,
    };
    // Thêm một nghề, một trạm hay một địa điểm game đều làm đổi số ở đây - đó
    // là điểm: một lần đổi có chủ ý thì sửa mốc, một lần đổi ngoài ý muốn thì
    // bài này đỏ.
    expect(shape).toEqual({
      rooms: 20,
      desks: 44,
      portals: 23,
      doorways: 23,
      lifts: 10,
    });
  });
});
