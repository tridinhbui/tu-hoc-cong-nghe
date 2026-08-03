import { describe, it, expect } from "vitest";
import { ROOM } from "@/components/lobby/ReadingRoom";
import {
  CURB_Z,
  MEZZ_BAND,
  MEZZ_Y,
  PLAZA_Y,
  STAIR_STEPS,
  STAIR_Z0,
  STAIR_Z1,
  stairHeightAt,
  stepWorld,
} from "@/components/lobby/world";

/** Thế giới 3D không chạy được trong vitest - nó cần WebGL. Nhưng phần QUYẾT
 *  ĐỊNH người chơi đi được tới đâu và đứng ở cao độ nào lại là số học thuần,
 *  tách hẳn khỏi three.js, nên kiểm được ở đây.
 *
 *  Đáng kiểm vì đây đúng là chỗ dễ hỏng lặng lẽ nhất: lệch một bậc thang thì
 *  nhân vật đi xuyên qua sàn, và trên màn hình nó chỉ trông như "hơi lún" chứ
 *  không nổ ra lỗi nào cả. */

const BODY = 0.34;
/** Một điểm chắc chắn nằm trên dải đi được của ban công. */
const BAND_X = (MEZZ_BAND[0] + MEZZ_BAND[1]) / 2;

/** stepWorld nhận cả chỗ ĐANG đứng vì mặt bằng ghép từ nhiều mảnh rời: chỉ xét
 *  điểm đích thì không phân biệt được "bước qua ô cửa" với "nhảy xuyên tường". */
const at = (x: number, z: number) => ({ x, z });

describe("cao độ cầu thang", () => {
  it("chân thang ở cốt 0, đầu thang đúng cao độ ban công", () => {
    expect(stairHeightAt(STAIR_Z0 - 1)).toBe(0);
    expect(stairHeightAt(STAIR_Z1)).toBeCloseTo(MEZZ_Y);
    expect(stairHeightAt(STAIR_Z1 + 8)).toBeCloseTo(MEZZ_Y);
  });

  it("lên đều, không có bậc nào tụt xuống", () => {
    let prev = -1;
    for (let z = STAIR_Z0; z <= STAIR_Z1; z += 0.1) {
      const h = stairHeightAt(z);
      expect(h).toBeGreaterThanOrEqual(prev);
      prev = h;
    }
  });

  it("mặt bậc luôn ở hoặc cao hơn nền dốc - chân không lún vào bậc", () => {
    const rise = MEZZ_Y / STAIR_STEPS;
    for (let i = 0; i < STAIR_STEPS; i += 1) {
      const zMid = STAIR_Z0 + ((i + 0.5) * (STAIR_Z1 - STAIR_Z0)) / STAIR_STEPS;
      expect(stairHeightAt(zMid)).toBeCloseTo((i + 1) * rise);
    }
  });
});

describe("chuyển tầng", () => {
  it("đi vào chân thang thì lên tầng hai", () => {
    const s = stepWorld(at(BAND_X, STAIR_Z0 + 0.2), BAND_X, STAIR_Z0 + 0.5, 0, BODY);
    expect(s.floor).toBe(1);
  });

  it("đứng giữa phòng thì vẫn ở tầng trệt, cốt 0", () => {
    const s = stepWorld(at(0, 0.2), 0, 0, 0, BODY);
    expect(s.floor).toBe(0);
    expect(s.y).toBe(0);
  });

  it("đi dưới gầm ban công KHÔNG bị hút lên tầng hai", () => {
    // Cùng dải x với ban công nhưng ở giữa phòng, xa chân thang.
    const s = stepWorld(at(BAND_X, 6.2), BAND_X, 6, 0, BODY);
    expect(s.floor).toBe(0);
    expect(s.y).toBe(0);
  });

  it("bước ngược khỏi chân thang thì về lại tầng trệt", () => {
    const s = stepWorld(at(BAND_X, STAIR_Z0 + 0.3), BAND_X, STAIR_Z0 - 0.3, 1, BODY);
    expect(s.floor).toBe(0);
    expect(s.y).toBe(0);
  });

  it("leo hết thang thì đứng đúng cao độ ban công", () => {
    const s = stepWorld(at(BAND_X, STAIR_Z1 - 0.2), BAND_X, STAIR_Z1 + 2, 1, BODY);
    expect(s.floor).toBe(1);
    expect(s.y).toBeCloseTo(MEZZ_Y);
  });

  it("trên ban công không rơi khỏi mép trong", () => {
    // Cố đi thẳng về giữa phòng từ trên ban công.
    const s = stepWorld(at(BAND_X, 10), 0, 10, 1, BODY);
    expect(s.floor).toBe(1);
    expect(Math.abs(s.x)).toBeGreaterThanOrEqual(MEZZ_BAND[0]);
    expect(s.y).toBeCloseTo(MEZZ_Y);
  });
});

describe("ranh giới đi lại", () => {
  it("không xuyên tường dài", () => {
    const s = stepWorld(at(9, 0), 999, 0, 0, BODY);
    expect(s.x).toBeLessThanOrEqual(ROOM.bounds.x);
  });

  it("ra được phố qua ô cửa giữa tường nam", () => {
    let pos = { x: 0, z: ROOM.bounds.z - 1 };
    // Đi từng bước nhỏ như thật, không nhảy một phát - đó cũng chính là điều
    // duy nhất phân biệt lối ra hợp lệ với việc chui qua tường.
    for (let i = 0; i < 400; i += 1) {
      const s = stepWorld(pos, pos.x, pos.z + 0.05, 0, BODY);
      pos = { x: s.x, z: s.z };
    }
    expect(pos.z).toBeGreaterThan(ROOM.bounds.z + 4);
  });

  it("tường nam vẫn chặn ở chỗ không có cửa", () => {
    let pos = { x: 9, z: ROOM.bounds.z - 1 };
    for (let i = 0; i < 200; i += 1) {
      const s = stepWorld(pos, pos.x, pos.z + 0.05, 0, BODY);
      pos = { x: s.x, z: s.z };
    }
    expect(pos.z).toBeLessThanOrEqual(ROOM.bounds.z + 0.001);
  });

  it("một bước nhảy lớn không đưa được ra ngoài tường", () => {
    const s = stepWorld(at(9, 0), 9, ROOM.bounds.z + 3, 0, BODY);
    expect(s.z).toBeLessThanOrEqual(ROOM.bounds.z + 0.001);
  });

  it("dừng ở mép vỉa hè, không bước xuống lòng đường", () => {
    const s = stepWorld(at(0, CURB_Z - 2), 0, CURB_Z + 6, 0, BODY);
    expect(s.z).toBeLessThan(CURB_Z);
  });

  it("mặt phố thấp hơn sàn thư viện đúng bằng bậc thềm", () => {
    const s = stepWorld(at(0, CURB_Z - 3.2), 0, CURB_Z - 3, 0, BODY);
    expect(s.y).toBeCloseTo(PLAZA_Y);
  });
});
