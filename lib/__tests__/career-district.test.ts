import { describe, expect, it } from "vitest";
import { FINANCE_CAREERS } from "@/lib/finance-careers";
import { CAREER_CATEGORY_ORDER, CAREER_CATEGORY_LABELS } from "@/lib/career-categories";
import { insideAnyObstacle, touchingPairs } from "@/lib/walkable-space";
import {
  formulasFor,
  lessonSlugsFor,
  lessonSlugsForCareer,
} from "@/components/career-district/district-content";
import { STATIONS } from "@/components/lobby/stations";
import {
  DISTRICT_ROOMS,
  TOWER_STOPS,
  floorRoomId,
  isAtLift,
  nearestPortal,
  STREET_SPAWN,
  getRoom,
  moveWithin,
  nearestDesk,
  nearestDoorway,
  type DistrictRoom,
} from "@/components/career-district/district-space";

/** Khu phố nghề được dựng từ dữ liệu nghề, nên mỗi lần thêm một nghề là hình
 *  học của một căn phòng đổi theo. Những ràng buộc dưới đây là thứ giữ cho
 *  việc đó không lặng lẽ sinh ra một cái bàn nằm trong tường hay một cánh cửa
 *  không đi tới được - chúng chỉ lộ ra sau vài chục bước đi trong trình duyệt,
 *  mà ở dạng số thì kiểm trong vài mili giây. */

const ALL_ROOMS: DistrictRoom[] = Object.values(DISTRICT_ROOMS);

function inBounds(room: DistrictRoom, x: number, z: number) {
  return (
    x >= room.bounds.minX - 1e-6 &&
    x <= room.bounds.maxX + 1e-6 &&
    z >= room.bounds.minZ - 1e-6 &&
    z <= room.bounds.maxZ + 1e-6
  );
}

describe("khu phố nghề", () => {
  it("có đúng một phòng cho mỗi nhóm ngành, một cho mỗi tầng tháp, cộng phố và sảnh", () => {
    expect(ALL_ROOMS).toHaveLength(CAREER_CATEGORY_ORDER.length + STATIONS.length + 2);
    for (const category of CAREER_CATEGORY_ORDER) {
      expect(getRoom(category).label).toBe(CAREER_CATEGORY_LABELS[category]);
    }
  });

  it("mọi nghề đều có đúng một cái bàn ở đâu đó", () => {
    const deskIds = ALL_ROOMS.flatMap((r) => r.desks.map((d) => d.careerId));
    expect(new Set(deskIds).size, "có nghề bị đặt bàn hai lần").toBe(deskIds.length);
    const missing = FINANCE_CAREERS.filter((c) => !deskIds.includes(c.id)).map((c) => c.id);
    expect(missing, "nghề không có bàn thì không ai tìm thấy trong phố").toEqual([]);
  });

  it("không có bàn hay đồ đạc nào nằm ngoài khung đi lại", () => {
    for (const room of ALL_ROOMS) {
      for (const desk of room.desks) {
        expect(inBounds(room, desk.x, desk.z), `${room.id}: bàn ${desk.careerId} nằm ngoài phòng`).toBe(true);
      }
    }
  });

  it("không có hai vùng chặn nào chạm nhau trong cùng một phòng", () => {
    for (const room of ALL_ROOMS) {
      expect(touchingPairs(room.obstacles), `phòng ${room.id}`).toEqual([]);
    }
  });
});

describe("đi lại giữa các phòng", () => {
  it("chỗ đứng khi vừa qua cửa luôn hợp lệ ở phòng bên kia", () => {
    for (const room of ALL_ROOMS) {
      for (const door of room.doorways) {
        const target = getRoom(door.to);
        expect(inBounds(target, door.arriveAt.x, door.arriveAt.z), `${room.id} → ${door.to}: rơi ra ngoài phòng`).toBe(true);
        expect(
          insideAnyObstacle(target.obstacles, door.arriveAt.x, door.arriveAt.z),
          `${room.id} → ${door.to}: rơi vào trong đồ đạc`
        ).toBe(false);
      }
    }
  });

  it("mỗi phòng ngành đều có đường về phố, và phố có cửa vào mọi phòng", () => {
    for (const category of CAREER_CATEGORY_ORDER) {
      expect(getRoom(category).doorways.map((d) => d.to)).toContain("street");
    }
    const fromStreet = getRoom("street").doorways.map((d) => d.to);
    for (const category of CAREER_CATEGORY_ORDER) {
      expect(fromStreet, "có phòng không vào được từ phố").toContain(category);
    }
  });

  it("đi dọc phố tới được cửa của mọi nhóm ngành", () => {
    // Đi bộ thật từ chỗ xuất hiện tới từng cửa, từng bước 0.08m, và phải chạm
    // được tầm cửa. Một cái cây kê chắn ngay trước cửa sẽ trượt bài này.
    const street = getRoom("street");
    for (const door of street.doorways) {
      let { x, z } = STREET_SPAWN;
      let reached = false;
      for (let i = 0; i < 1400 && !reached; i += 1) {
        const dx = door.x - x;
        const dz = door.z - z;
        const len = Math.hypot(dx, dz) || 1;
        const moved = moveWithin(street, x + (dx / len) * 0.08, z + (dz / len) * 0.08);
        x = moved.x;
        z = moved.z;
        reached = nearestDoorway(street, x, z)?.id === door.id;
      }
      expect(reached, `không đi tới được cửa ${door.id}`).toBe(true);
    }
  });

  it("đi từ cửa vào là tới được mọi cái bàn trong phòng", () => {
    // Đi như người thật: xuôi lối giữa phòng tới ngang cái bàn, rồi mới rẽ vào.
    // Đi thẳng một mạch từ cửa tới bàn thì đâm vào những cái bàn nằm giữa
    // đường - dãy bàn kê sát tường là một bức tường có chủ ý, và lối vào duy
    // nhất của mỗi bàn là từ lối đi.
    for (const category of CAREER_CATEGORY_ORDER) {
      const room = getRoom(category);
      const entry = getRoom("street").doorways.find((d) => d.to === category)!;
      for (const desk of room.desks) {
        let { x, z } = entry.arriveAt;
        const legs: Array<[number, number]> = [
          [0, desk.z],
          [desk.x, desk.z],
        ];
        let reached = false;
        for (const [tx, tz] of legs) {
          for (let i = 0; i < 900 && !reached; i += 1) {
            const dx = tx - x;
            const dz = tz - z;
            const len = Math.hypot(dx, dz);
            if (len < 0.05) break;
            const moved = moveWithin(room, x + (dx / len) * 0.08, z + (dz / len) * 0.08);
            x = moved.x;
            z = moved.z;
            reached = nearestDesk(room, x, z)?.careerId === desk.careerId;
          }
        }
        expect(reached, `${category}: không đi tới được bàn ${desk.careerId}`).toBe(true);
      }
    }
  });
});

describe("thứ treo trên tường trong phòng", () => {
  it("phòng nào cũng có công thức, và có cả hai nguồn khi kho còn", () => {
    for (const category of CAREER_CATEGORY_ORDER) {
      const formulas = formulasFor(category);
      expect(formulas.length, `${category}: tường trống`).toBeGreaterThanOrEqual(3);
      for (const f of formulas) {
        expect(f.equation.trim(), `${category}: công thức rỗng`).not.toBe("");
      }
      expect(new Set(formulas.map((f) => f.id)).size, `${category}: treo trùng id`).toBe(formulas.length);
      // Trùng NỘI DUNG mới là cái hay xảy ra: CAPM nằm trong cả sổ tay CFA lẫn
      // FRM với hai id khác nhau, và treo hai tấm giống hệt cạnh nhau thì căn
      // phòng trông như đang lỗi.
      const shapes = formulas.map((f) => f.equation.replace(/\s+/g, ""));
      expect(new Set(shapes).size, `${category}: treo trùng công thức`).toBe(shapes.length);
    }
  });

  it("phòng nào cũng có kệ bài học, và mọi slug đều là bài có thật", () => {
    const known = new Set(FINANCE_CAREERS.flatMap((c) => c.relatedLessonSlugs));
    for (const category of CAREER_CATEGORY_ORDER) {
      const slugs = lessonSlugsFor(category);
      expect(slugs.length, `${category}: kệ sách trống`).toBeGreaterThanOrEqual(4);
      expect(new Set(slugs).size, `${category}: bài trùng trên kệ`).toBe(slugs.length);
      for (const slug of slugs) expect(known.has(slug)).toBe(true);
    }
  });

  it("mọi nghề có bàn đều mang theo lộ trình bài học của nó", () => {
    for (const room of ALL_ROOMS) {
      for (const desk of room.desks) {
        expect(
          lessonSlugsForCareer(desk.careerId).length,
          `${desk.careerId}: đứng trước bàn mà không có bài nào để học tiếp`
        ).toBeGreaterThan(0);
      }
    }
  });
});

describe("toà tháp Tự Học", () => {
  it("có đúng một tầng cho mỗi trạm điều hướng", () => {
    // STATIONS cũng là danh sách cửa phòng trên ban công thư viện. Dựng tầng từ
    // chính nó là cách duy nhất để hai lối vào không bao giờ lệch nhau.
    for (const station of STATIONS) {
      const room = getRoom(floorRoomId(station));
      expect(room.label).toBe(station.room);
      expect(room.portals.map((p) => p.href)).toContain(station.href);
    }
    expect(TOWER_STOPS).toHaveLength(STATIONS.length + 1);
  });

  it("mọi tầng đều có thang máy, và thang máy đi được tới mọi tầng", () => {
    for (const station of STATIONS) {
      const room = getRoom(floorRoomId(station));
      expect(room.lift, `${room.id}: không có thang máy thì lên rồi không xuống được`).not.toBeNull();
    }
    expect(getRoom("thap").lift).not.toBeNull();
    const stopIds = TOWER_STOPS.map((s) => s.id);
    for (const station of STATIONS) expect(stopIds).toContain(floorRoomId(station));
  });

  it("bước ra khỏi thang máy là đứng ngay trong buồng thang, không phải đi tìm", () => {
    for (const stop of TOWER_STOPS) {
      const room = getRoom(stop.id);
      expect(
        isAtLift(room, stop.arriveAt.x, stop.arriveAt.z),
        `${stop.id}: ra thang máy xong lại đứng xa buồng thang`
      ).toBe(true);
    }
  });

  it("bàn chức năng của tầng đứng tới được và không nằm trong vật cản", () => {
    for (const station of STATIONS) {
      const room = getRoom(floorRoomId(station));
      for (const portal of room.portals) {
        // Đứng ngay trước bàn, phía lối vào.
        const standing = moveWithin(room, portal.x, portal.z + 1.8);
        expect(
          nearestPortal(room, standing.x, standing.z)?.id,
          `${room.id}: không đứng đọc được bàn ${portal.id}`
        ).toBe(portal.id);
      }
    }
  });

  it("phố có cửa vào tháp, và tháp có đường ra phố", () => {
    expect(getRoom("street").doorways.map((d) => d.to)).toContain("thap");
    expect(getRoom("thap").doorways.map((d) => d.to)).toContain("street");
  });
});
