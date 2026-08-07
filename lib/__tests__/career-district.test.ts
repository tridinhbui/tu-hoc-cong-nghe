import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { FINANCE_CAREERS } from "@/lib/finance-careers";
import {
  CAREER_CATEGORY_ORDER,
  careerCategoryLabelsOf,
  isCareerCategory,
} from "@/lib/career-categories";
import { insideAnyObstacle, touchingPairs } from "@/lib/walkable-space";
import {
  buildStageIndex,
  formulasFor,
  lessonSlugsFor,
  lessonSlugsForCareer,
} from "@/components/career-district/district-content";
import { stationsOf } from "@/components/lobby/stations";
import { ORGANIC_BUILDINGS } from "@/lib/rpg-buildings";
import {
  districtRoomsOf,
  STREET_SPAWN,
  towerStopsOf,
  civicRoomsOf,
  buildPathRoom,
  floorRoomId,
  isAtLift,
  nearestPortal,
  nearestStop,
  getRoom as getRoomOf,
  moveWithin,
  nearestDesk,
  nearestDoorway,
  type DistrictRoom,
} from "@/components/career-district/district-space";
import { vi as viDict } from "@/lib/i18n/dictionaries/vi";
import { en as enDict } from "@/lib/i18n/dictionaries/en";

/** Khu phố nghề được dựng từ dữ liệu nghề, nên mỗi lần thêm một nghề là hình
 *  học của một căn phòng đổi theo. Những ràng buộc dưới đây là thứ giữ cho
 *  việc đó không lặng lẽ sinh ra một cái bàn nằm trong tường hay một cánh cửa
 *  không đi tới được - chúng chỉ lộ ra sau vài chục bước đi trong trình duyệt,
 *  mà ở dạng số thì kiểm trong vài mili giây.
 *
 *  Nhãn/blurb giờ dịch được (t.worldSpaces), nên các phòng được dựng bằng
 *  dictionary tiếng Việt cố định - bài này kiểm HÌNH HỌC, không kiểm chữ. */

const STATIONS = stationsOf(viDict);
const CIVIC_ROOMS = civicRoomsOf(viDict);
const TOWER_STOPS = towerStopsOf(viDict);
const getRoom = (id: Parameters<typeof getRoomOf>[1]) => getRoomOf(viDict, id);
const ALL_ROOMS: DistrictRoom[] = Object.values(districtRoomsOf(viDict));

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
    // +7 chỗ chung (phố, sảnh tháp, tầng chặng học, quảng trường game, công
    // viên, quảng trường trung tâm, quán cà phê) cộng các căn nhà dân sự.
    expect(ALL_ROOMS).toHaveLength(
      CAREER_CATEGORY_ORDER.length + STATIONS.length + 7 + CIVIC_ROOMS.length
    );
    for (const category of CAREER_CATEGORY_ORDER) {
      expect(getRoom(category).label).toBe(careerCategoryLabelsOf(viDict)[category]);
    }
  });

  it("mọi nghề đều có đúng một cái bàn ở đâu đó", () => {
    const deskIds = ALL_ROOMS.flatMap((r) => r.desks.map((d) => d.careerId));
    expect(new Set(deskIds).size, "có nghề bị đặt bàn hai lần").toBe(deskIds.length);
    const missing = FINANCE_CAREERS.filter((c) => !deskIds.includes(c.id)).map((c) => c.id);
    expect(missing, "nghề không có bàn thì không ai tìm thấy trong phố").toEqual([]);
  });

  it("không có bàn, bục hay cửa nào nằm ngoài khung đi lại", () => {
    // Bục và cửa cũng phải kiểm, không chỉ bàn: chúng không chặn đường nên khi
    // tràn ra ngoài tường thì không có gì báo - căn phòng vẫn chạy, chỉ là ba
    // cái bục cuối nằm bên kia bức tường và không ai tìm thấy.
    for (const room of ALL_ROOMS) {
      for (const desk of room.desks) {
        expect(inBounds(room, desk.x, desk.z), `${room.id}: bàn ${desk.careerId} nằm ngoài phòng`).toBe(true);
      }
      for (const portal of room.portals) {
        expect(inBounds(room, portal.x, portal.z), `${room.id}: bục ${portal.id} nằm ngoài phòng`).toBe(true);
      }
      for (const door of room.doorways) {
        // Cửa thì NẰM TRÊN TƯỜNG, nên nó được phép ở ngoài dải đi lại - điều
        // phải đúng là đứng trong phòng vẫn với tới được nó.
        const stand = {
          x: Math.max(room.bounds.minX, Math.min(room.bounds.maxX, door.x)),
          z: Math.max(room.bounds.minZ, Math.min(room.bounds.maxZ, door.z)),
        };
        expect(
          Math.hypot(stand.x - door.x, stand.z - door.z) <= door.reach,
          `${room.id}: cửa ${door.id} đứng trong phòng không với tới được`
        ).toBe(true);
      }
      if (room.lift) {
        // Buồng thang cũng áp tường, cùng lý do với cửa: chỉ cần đứng trong
        // phòng là bấm được nút.
        const stand = {
          x: Math.max(room.bounds.minX, Math.min(room.bounds.maxX, room.lift.x)),
          z: Math.max(room.bounds.minZ, Math.min(room.bounds.maxZ, room.lift.z)),
        };
        expect(
          Math.hypot(stand.x - room.lift.x, stand.z - room.lift.z) <= room.lift.reach,
          `${room.id}: đứng trong phòng không với tới được thang máy`
        ).toBe(true);
      }
    }
  });

  it("không có hai vùng chặn nào chạm nhau trong cùng một phòng", () => {
    for (const room of ALL_ROOMS) {
      expect(touchingPairs(room.obstacles), `phòng ${room.id}`).toEqual([]);
    }
  });
});

describe("isCareerCategory", () => {
  it("nhận đúng năm nhóm ngành", () => {
    for (const category of CAREER_CATEGORY_ORDER) {
      expect(isCareerCategory(category), category).toBe(true);
    }
  });

  it("từ chối tên trên chuỗi nguyên mẫu", () => {
    // Bản đầu kiểm bằng `id in CAREER_CATEGORY_LABELS`, và `in` đi cả chuỗi
    // nguyên mẫu: năm chuỗi dưới đây đều LỌT QUA lá chắn kiểu, rồi đi thẳng vào
    // chỗ đang chờ một nhóm ngành. Cùng lỗ đã bắt ở ?phong= (lesson-room-links).
    const labels = careerCategoryLabelsOf(viDict);
    for (const evil of ["constructor", "toString", "valueOf", "__proto__", "hasOwnProperty"]) {
      expect(evil in labels, `${evil} nằm trên chuỗi nguyên mẫu`).toBe(true);
      expect(isCareerCategory(evil), `${evil} phải bị từ chối`).toBe(false);
    }
  });

  it("từ chối chuỗi vô nghĩa", () => {
    expect(isCareerCategory("")).toBe(false);
    expect(isCareerCategory("khong-co-nhom-nay")).toBe(false);
  });

  it("không phụ thuộc vào từ điển đang chọn", () => {
    // Lý do thứ hai của lần đổi: nhãn đi theo ngôn ngữ, nên một phép kiểm cấu
    // trúc đọc bảng nhãn sẽ đổi kết quả theo từ điển. Kiểm bằng cách so với
    // bảng nhãn tiếng Anh - id là hằng số, nhãn thì không.
    const enLabels = careerCategoryLabelsOf(enDict);
    for (const category of CAREER_CATEGORY_ORDER) {
      expect(enLabels[category], `thiếu nhãn tiếng Anh cho ${category}`).toBeTruthy();
      expect(isCareerCategory(category)).toBe(true);
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
    // +2: sảnh và tầng chặng học.
    expect(TOWER_STOPS).toHaveLength(STATIONS.length + 2);
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

describe("hành lang lộ trình", () => {
  it("mọi cột bài đều đứng tới được, không cột nào chồng lên cột nào", () => {
    // Hành lang dựng theo yêu cầu nên hình học của nó phụ thuộc số bài. Kiểm ở
    // hai đầu quang phổ: một nghề chỉ vài bài, và một chặng dài tối đa.
    for (const n of [1, 2, 3, 8, 20, 24]) {
      const slugs = Array.from({ length: n }, (_, i) => `bai-${i}`);
      const room = buildPathRoom(`thu-${n}`, `Thử ${n}`, "#5eead4", slugs, {
        to: "street",
        label: "Ra phố",
        arriveAt: STREET_SPAWN,
      });
      expect(touchingPairs(room.obstacles), `${n} bài: cột chạm nhau`).toEqual([]);
      expect(room.stops).toHaveLength(n);
      for (const s of room.stops ?? []) {
        expect(
          s.x >= room.bounds.minX && s.x <= room.bounds.maxX && s.z >= room.bounds.minZ && s.z <= room.bounds.maxZ,
          `${n} bài: cột ${s.index} nằm ngoài hành lang`
        ).toBe(true);
        // Đi từ lối vào tới ngang cột rồi rẽ vào, như người thật đi.
        let x = 0;
        let z = room.size.depth / 2 - 2.4;
        let reached = false;
        for (const [tx, tz] of [[0, s.z], [s.x, s.z]] as Array<[number, number]>) {
          for (let i = 0; i < 900 && !reached; i += 1) {
            const dx = tx - x;
            const dz = tz - z;
            const len = Math.hypot(dx, dz);
            if (len < 0.05) break;
            const moved = moveWithin(room, x + (dx / len) * 0.08, z + (dz / len) * 0.08);
            x = moved.x;
            z = moved.z;
            reached = nearestStop(room, x, z)?.slug === s.slug;
          }
        }
        expect(reached, `${n} bài: không đi tới được cột ${s.index}`).toBe(true);
      }
    }
  });

  it("dựng lại cùng một hành lang thì trả về đúng phòng cũ", () => {
    // Cùng id phải là cùng phòng: nếu mỗi lần bấm lại dựng một phòng mới thì
    // vào ra vài lần là bộ nhớ đầy những hành lang không ai đứng trong đó.
    const a = buildPathRoom("cache-thu", "Thử", "#fff", ["x"], {
      to: "street",
      label: "Ra phố",
      arriveAt: STREET_SPAWN,
    });
    const b = buildPathRoom("cache-thu", "Thử", "#fff", ["x", "y", "z"], {
      to: "street",
      label: "Ra phố",
      arriveAt: STREET_SPAWN,
    });
    expect(b).toBe(a);
  });

  it("chặng học đổ ra bài học thật và không chặng nào rỗng", () => {
    const lessons = Array.from({ length: 1400 }, (_, i) => ({ id: i + 1, slug: `bai-${i + 1}` }));
    const index = buildStageIndex(lessons);
    expect(index.length, "không dựng được chặng nào").toBeGreaterThan(10);
    for (const stage of index) {
      expect(stage.slugs.length, `${stage.key}: chặng rỗng`).toBeGreaterThan(0);
      expect(new Set(stage.slugs).size, `${stage.key}: bài trùng trong chặng`).toBe(stage.slugs.length);
    }
    expect(new Set(index.map((s) => s.key)).size, "hai chặng trùng khoá").toBe(index.length);
  });
});

describe("quảng trường game", () => {
  it("có đúng một bục cho mỗi địa điểm của bản đồ game", () => {
    // Dựng từ chính ORGANIC_BUILDINGS, nên hai bản đồ không bao giờ lệch nhau.
    const square = getRoom("khu-game");
    expect(square.portals).toHaveLength(ORGANIC_BUILDINGS.length);
    for (const b of ORGANIC_BUILDINGS) {
      const portal = square.portals.find((p) => p.id === `game-${b.id}`);
      expect(portal, `${b.id}: không có bục`).toBeTruthy();
      expect(portal?.href).toBe(`/game?building=${b.id}`);
    }
  });

  it("bục nào cũng đứng tới được và không bục nào chặn bục nào", () => {
    const square = getRoom("khu-game");
    expect(touchingPairs(square.obstacles)).toEqual([]);
    const entry = getRoom("street").doorways.find((d) => d.to === "khu-game")!;
    for (const portal of square.portals) {
      let { x, z } = entry.arriveAt;
      let reached = false;
      for (const [tx, tz] of [[0, portal.z], [portal.x, portal.z]] as Array<[number, number]>) {
        for (let i = 0; i < 900 && !reached; i += 1) {
          const dx = tx - x;
          const dz = tz - z;
          const len = Math.hypot(dx, dz);
          if (len < 0.05) break;
          const moved = moveWithin(square, x + (dx / len) * 0.08, z + (dz / len) * 0.08);
          x = moved.x;
          z = moved.z;
          reached = nearestPortal(square, x, z)?.id === portal.id;
        }
      }
      expect(reached, `không đi tới được bục ${portal.id}`).toBe(true);
    }
  });
});

describe("bảng vào thẳng phòng", () => {
  /** Đọc PLACE_ICONS ra khỏi mã nguồn thay vì export nó: DistrictWorld là
   *  client component kéo theo three, supabase và cả cây cảnh 3D, còn bài này
   *  chỉ cần một danh sách khoá. */
  function placeIcons(): Set<string> {
    const src = readFileSync("components/career-district/RoomDirectory.tsx", "utf8");
    const start = src.indexOf("const PLACE_ICONS");
    const block = src.slice(start, src.indexOf("};", start));
    return new Set([...block.matchAll(/^\s*"?([a-z0-9-]+)"?:/gm)].map((m) => m[1]));
  }

  it("mọi nơi trên phố đều có ký hiệu riêng", () => {
    // Thiếu một id thì mục đó rơi về "■" trong bảng vào thẳng phòng và trông
    // như một chỗ kém quan trọng hơn hàng xóm. Đã xảy ra với cả sáu căn phòng
    // DẠY - tức sáu thứ đáng vào nhất lại là sáu dòng mờ nhạt nhất, và không
    // có gì báo vì "■" là một mặc định hợp lệ.
    const icons = placeIcons();
    const targets = getRoom("street")
      .doorways.map((d) => d.to as string)
      // Nhóm ngành cố ý không có ký hiệu: chúng dùng ô vuông màu của nhóm.
      .filter((t) => t !== "street" && !CAREER_CATEGORY_ORDER.includes(t as never));
    for (const t of targets) {
      expect(icons.has(t), `${t} chưa có ký hiệu trong PLACE_ICONS`).toBe(true);
    }
  });

  it("không có ký hiệu thừa trỏ tới nơi không còn tồn tại", () => {
    const targets = new Set(getRoom("street").doorways.map((d) => d.to as string));
    for (const id of placeIcons()) {
      expect(targets.has(id), `${id} có ký hiệu nhưng không có cửa nào trên phố`).toBe(true);
    }
  });
});
