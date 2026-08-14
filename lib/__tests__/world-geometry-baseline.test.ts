import { describe, expect, it } from "vitest";
import { districtRoomsOf, STREET } from "@/components/career-district/district-space";
import { ROOM as STUDY_ROOM, SEATS, TABLE } from "@/components/study-room/study-room-space";
import { vi as viDict } from "@/lib/i18n/dictionaries/vi";

const DISTRICT_ROOMS = districtRoomsOf(viDict);

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
      // Chiều dài phố bị khoá vì nó quyết định biên đi lại: cửa phòng dân sự
      // đặt theo `streetX`, và một lần nới/thu phố mà quên nhìn lại danh sách
      // cửa là một cánh cửa nằm ngoài chỗ đi được. Đã suýt xảy ra khi thêm
      // Phòng Rủi Ro & Phân Bổ ở x = −84 trong lúc phố còn dài tới ±77.
      streetHalfLength: STREET.halfLength,
    };
    // Thêm một nghề, một trạm hay một địa điểm game đều làm đổi số ở đây - đó
    // là điểm: một lần đổi có chủ ý thì sửa mốc, một lần đổi ngoài ý muốn thì
    // bài này đỏ.
    // rooms 32 -> 34 và doorways 47 -> 51: lượt tách nhóm ngành từ 5 thành 7
    // (`dealmaking`, `risk` trong lib/finance-careers.ts) dựng thêm hai căn nhà
    // trên phố nghề, mỗi căn hai cánh cửa. Đổi có chủ ý, nên sửa mốc.
    expect(shape).toEqual({
      rooms: 34,
      desks: 44,
      portals: 23,
      doorways: 51,
      lifts: 10,
      streetHalfLength: 90,
    });
  });
});
