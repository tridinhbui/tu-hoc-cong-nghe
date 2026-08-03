import { describe, expect, it } from "vitest";
import { BODY_RADIUS, insideAnyObstacle, touchingPairs } from "@/lib/walkable-space";
import {
  OBSTACLES,
  ROOM,
  SEATS,
  TABLE,
  isNearDoor,
  nearestFreeSeat,
  resolveStudyObstacles,
} from "@/components/study-room/study-room-space";

/** Hình học của phòng học nhóm đi lại được.
 *
 *  Kiểm ở đây chứ không kiểm bằng mắt trong trình duyệt, vì hai lỗi nặng nhất
 *  của một căn phòng đi được - đi xuyên bàn và ngồi chồng lên nhau - chỉ lộ ra
 *  sau vài chục bước đi, và một khung xem thử không chạy đủ số khung hình đó
 *  khi tab đang bị ẩn. Ở dạng số thì cả hai kiểm được trong vài mili giây. */

describe("vật cản trong phòng học nhóm", () => {
  it("chặn người đi thẳng từ cửa vào bàn", () => {
    // Đi từ chỗ xuất hiện về phía bảng, 3.6 m/s ở 60fps, dài hơn cả chiều sâu
    // phòng để chắc chắn có va vào bàn.
    let z = 3.2;
    const x = 0;
    for (let i = 0; i < 400; i += 1) {
      const solved = resolveStudyObstacles(x, z - 3.6 / 60, BODY_RADIUS);
      z = solved.z;
      expect(insideAnyObstacle(OBSTACLES, solved.x, solved.z), `bước ${i} lọt vào trong vật cản`).toBe(false);
    }
    // Dừng lại ở mép nam của bàn, không đi qua được sang bên kia.
    expect(z).toBeGreaterThan(TABLE.z + TABLE.halfD);
  });

  it("không để lọt qua vật cản nào khi quét cả sàn", () => {
    // Mọi hướng, mọi điểm xuất phát: kết quả của resolveStudyObstacles không
    // bao giờ được nằm trong lòng một vật cản.
    for (let a = 0; a < 16; a += 1) {
      const angle = (a / 16) * Math.PI * 2;
      let x = 0;
      let z = 5.6;
      for (let i = 0; i < 200; i += 1) {
        const solved = resolveStudyObstacles(
          Math.max(-ROOM.bounds.x, Math.min(ROOM.bounds.x, x + Math.sin(angle) * 0.06)),
          Math.max(-ROOM.bounds.z, Math.min(ROOM.bounds.z, z + Math.cos(angle) * 0.06)),
          BODY_RADIUS
        );
        x = solved.x;
        z = solved.z;
        expect(insideAnyObstacle(OBSTACLES, x, z), `hướng ${a}, bước ${i}`).toBe(false);
      }
    }
  });
});

describe("khoảng cách giữa các món đồ", () => {
  it("không có hai vùng chặn nào chạm nhau", () => {
    // resolveObstacles chỉ giải MỘT vật cản mỗi lần gọi - cố ý, vì giải hết
    // trong một vòng lặp gây kẹt góc. Cái giá là hai món kê quá sát sẽ đá
    // người học qua lại giữa chúng. Ràng buộc đó không đọc ra được từ code.
    expect(touchingPairs(OBSTACLES), "kê xa nhau ra, hoặc gộp thành một vật cản").toEqual([]);
  });
});

describe("chỗ ngồi quanh bàn", () => {
  it("có tám ghế và không ghế nào nằm trong lòng bàn", () => {
    expect(SEATS).toHaveLength(8);
    for (const seat of SEATS) {
      const insideTable =
        Math.abs(seat.x - TABLE.x) < TABLE.halfW && Math.abs(seat.z - TABLE.z) < TABLE.halfD;
      expect(insideTable, `ghế ${seat.index} nằm trong mặt bàn`).toBe(false);
    }
  });

  it("không có hai ghế trùng chỗ", () => {
    const keys = new Set(SEATS.map((s) => `${s.x.toFixed(3)}:${s.z.toFixed(3)}`));
    expect(keys.size).toBe(SEATS.length);
  });

  it("chỉ mời ngồi khi đứng cạnh bàn", () => {
    expect(nearestFreeSeat(0, 1.4, new Set())).not.toBeNull();
    // Đứng ở góc nghỉ phía đông nam thì không phải chỗ ngồi học.
    expect(nearestFreeSeat(4.7, 5.2, new Set())).toBeNull();
    // Ngay cửa cũng vậy.
    expect(nearestFreeSeat(0, 7.6, new Set())).toBeNull();
  });

  it("bỏ qua ghế đã có người và trả về ghế trống gần nhất", () => {
    const nearest = nearestFreeSeat(SEATS[0].x, SEATS[0].z, new Set());
    expect(nearest).toBe(SEATS[0].index);
    const withoutIt = nearestFreeSeat(SEATS[0].x, SEATS[0].z, new Set([SEATS[0].index]));
    expect(withoutIt).not.toBeNull();
    expect(withoutIt).not.toBe(SEATS[0].index);
  });

  it("hết ghế thì không mời ngồi, thay vì xếp chồng lên người khác", () => {
    const allTaken = new Set(SEATS.map((s) => s.index));
    expect(nearestFreeSeat(0, 1.4, allTaken)).toBeNull();
  });

  it("mọi ghế đều đứng tới được từ trong phòng", () => {
    for (const seat of SEATS) {
      const solved = resolveStudyObstacles(seat.x, seat.z, BODY_RADIUS);
      expect(
        Math.hypot(solved.x - seat.x, solved.z - seat.z),
        `ghế ${seat.index} nằm chồng vào vật cản nên không đứng vào được`
      ).toBeLessThan(1e-6);
    }
  });
});

describe("cửa ra", () => {
  it("chỉ hiện lời mời ra khi thực sự đứng ở cửa", () => {
    expect(isNearDoor(0, ROOM.bounds.z)).toBe(true);
    expect(isNearDoor(0, 0)).toBe(false);
    // Sát tường nam nhưng lệch hẳn sang một bên thì không phải đang ở cửa.
    expect(isNearDoor(6, ROOM.bounds.z)).toBe(false);
  });
});
