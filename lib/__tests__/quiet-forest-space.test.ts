import { describe, expect, it } from "vitest";
import { forestTrees } from "../quiet-flame-scene";
import {
  FIRE_KEEPOUT,
  SIGN_POSITIONS,
  SIGN_REACH,
  SPAWN,
  SPAWN_CLEAR,
  SPAWN_SIGN_CLEARANCE,
  WALK_RADIUS,
  clearsSigns,
  resolveQuietWalk,
} from "../quiet-forest-space";

const trees = forestTrees().filter(
  (t) => clearsSigns(t) && Math.hypot(t.x - SPAWN.x, t.z - SPAWN.z) > SPAWN_CLEAR
);

describe("chỗ xuất hiện", () => {
  // Bản đầu đặt cách tấm biển "Ở lại" đúng 2,37 trong khi tầm đọc là 2,4 -
  // thẻ chữ bật ra ngay khi cảnh vừa dựng, và cả việc đi tới đọc biển mất
  // nghĩa. Hai con số ở hai chỗ khác nhau trong file nên đọc bằng mắt không
  // thấy; chỉ nhìn màn hình mới thấy.
  it("đứng ngoài tầm đọc của mọi tấm biển", () => {
    for (const sign of SIGN_POSITIONS) {
      const d = Math.hypot(SPAWN.x - sign.x, SPAWN.z - sign.z);
      expect(d, `biển ${sign.id}`).toBeGreaterThan(SPAWN_SIGN_CLEARANCE);
      expect(d, `biển ${sign.id}`).toBeGreaterThan(SIGN_REACH);
    }
  });

  it("đứng trong vành đi lại và ngoài đống lửa", () => {
    const d = Math.hypot(SPAWN.x, SPAWN.z);
    expect(d).toBeGreaterThan(FIRE_KEEPOUT);
    expect(d).toBeLessThan(WALK_RADIUS);
  });

  it("không sinh ra đã dính vật cản", () => {
    const p = resolveQuietWalk(SPAWN.x, SPAWN.z, trees);
    expect(Math.hypot(p.x - SPAWN.x, p.z - SPAWN.z)).toBeLessThan(1e-6);
  });
});

describe("mọi tấm biển đều đi tới được", () => {
  // Một tấm biển nằm ngoài vành đi lại, hoặc bị một thân cây ép ra xa hơn tầm
  // đọc, là một tấm biển không ai đọc được - và nó vẫn sáng đèn mời người ta
  // đi tới. Kiểm bằng cách đi thẳng từ chỗ xuất hiện tới sát biển.
  for (const sign of SIGN_POSITIONS) {
    it(`biển ${sign.id}`, () => {
      let x = SPAWN.x;
      let z = SPAWN.z;
      for (let step = 0; step < 4000; step++) {
        const dx = sign.x - x;
        const dz = sign.z - z;
        const d = Math.hypot(dx, dz);
        if (d < SIGN_REACH * 0.8) break;
        const p = resolveQuietWalk(x + (dx / d) * 0.02, z + (dz / d) * 0.02, trees);
        // Đứng im nghĩa là bị kẹp giữa hai vật cản - đi vòng là việc của người
        // dùng, nhưng ở đây nó nghĩa là đường thẳng không tới nơi.
        if (Math.hypot(p.x - x, p.z - z) < 1e-6) break;
        x = p.x;
        z = p.z;
      }
      expect(Math.hypot(x - sign.x, z - sign.z)).toBeLessThan(SIGN_REACH);
    });
  }
});

describe("resolveQuietWalk", () => {
  it("không cho đi vào đống lửa", () => {
    const p = resolveQuietWalk(0.05, 0.02, trees);
    expect(Math.hypot(p.x, p.z)).toBeGreaterThanOrEqual(FIRE_KEEPOUT - 1e-9);
  });

  it("giữ trong vành rừng", () => {
    const p = resolveQuietWalk(40, -30, trees);
    expect(Math.hypot(p.x, p.z)).toBeLessThanOrEqual(WALK_RADIUS + 1e-9);
  });

  it("đúng tâm đống lửa vẫn trả ra một điểm hợp lệ, không phải NaN", () => {
    const p = resolveQuietWalk(0, 0, trees);
    expect(Number.isFinite(p.x)).toBe(true);
    expect(Number.isFinite(p.z)).toBe(true);
    expect(Math.hypot(p.x, p.z)).toBeGreaterThan(0);
  });
});
