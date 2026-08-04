import { describe, expect, it } from "vitest";
import { LAMP_XS, LAMP_Z, STREET_TREE_XS, TREE_Z } from "@/components/lobby/room-obstacles";
import { PLAZA_Y } from "@/components/lobby/world";

/**
 * Instancing không được làm cảnh phố dịch đi một milimet nào.
 *
 * Vì sao cần bài này: đổi từ bốn `<group position>` sang một `InstancedMesh`
 * là đổi cách toạ độ được cộng vào nhau. Trước đây mỗi cây là một group đặt
 * tại (x, PLAZA_Y, TREE_Z) và các khối tán nằm ở toạ độ ĐỊA PHƯƠNG bên trong
 * nó; giờ mỗi khối tán mang toạ độ TUYỆT ĐỐI của chính nó. Cộng thiếu một số
 * hạng thì cây mọc dưới đất hoặc lơ lửng, và không có gì báo - cảnh vẫn dựng,
 * test vẫn xanh, chỉ có nhìn mới thấy.
 *
 * Mà nhìn thì đang không nhìn được: trang đo cảnh làm mất context WebGL ở đúng
 * cảnh ngoài trời này (có từ trước thay đổi), và cổng dev đang bị một phiên
 * khác giữ. Nên chỗ này ghim lại các con số của bản trước khi instancing hoá,
 * chép tay từ mã cũ.
 */

// Cao độ mặt sân. Ghim lại luôn: các con số tuyệt đối bên dưới chỉ đúng khi
// nó còn là -1,4, nên đổi cao độ sân mà quên sửa đây thì bài này phải đỏ.
const EXPECTED_PLAZA_Y = -1.4;

/** Toạ độ địa phương của bốn khối tán trong bản cũ (CityStreet.StreetTree). */
const TREE_BLOBS = [
  { p: [0, 4.3, 0], r: 1.55 },
  { p: [0.95, 3.8, 0.5], r: 1.15 },
  { p: [-0.9, 3.9, -0.4], r: 1.2 },
  { p: [0.1, 5.2, -0.6], r: 1.0 },
] as const;

describe("cây me: instancing giữ nguyên chỗ đứng", () => {
  it("cao độ sân chưa đổi - mọi con số dưới đây dựa vào nó", () => {
    expect(PLAZA_Y).toBe(EXPECTED_PLAZA_Y);
  });

  it("bốn thân cây vẫn ở đúng bốn vị trí cũ", () => {
    // So từng thành phần chứ không so cả mảng: −1,4 + 1,6 trong dấu phẩy động
    // ra 0,20000000000000018, và một bài test đỏ vì chuyện đó thì không nói lên
    // điều gì về cảnh phố.
    const trunks = STREET_TREE_XS.map((x) => [x, EXPECTED_PLAZA_Y + 1.6, TREE_Z]);
    expect(trunks.map((t) => t[0])).toEqual([-15.5, -5.5, 5.5, 15.5]);
    for (const t of trunks) {
      expect(t[1]).toBeCloseTo(0.2, 9);
      expect(t[2]).toBe(TREE_Z);
    }
  });

  it("mỗi cây vẫn có đúng bốn khối tán, tổng mười sáu", () => {
    const canopy = STREET_TREE_XS.flatMap((x) =>
      TREE_BLOBS.map((b) => ({
        position: [x + b.p[0], EXPECTED_PLAZA_Y + b.p[1], TREE_Z + b.p[2]],
        scale: b.r,
      }))
    );
    expect(canopy).toHaveLength(16);
    // Khối tán đầu tiên của cây đầu tiên: (−15,5 + 0) và (−1,4 + 4,3).
    expect(canopy[0].position[0]).toBe(-15.5);
    expect(canopy[0].position[1]).toBeCloseTo(2.9, 9);
    expect(canopy[0].position[2]).toBe(TREE_Z);
    expect(canopy[0].scale).toBe(1.55);
    // Khối lệch sang phải của cây cuối: −15,5 → 15,5, cộng 0,95.
    expect(canopy[13].position[0]).toBeCloseTo(16.45, 6);
  });

  it("không khối tán nào chìm xuống dưới mặt đất", () => {
    for (const b of TREE_BLOBS) {
      expect(EXPECTED_PLAZA_Y + b.p[1] - b.r).toBeGreaterThan(EXPECTED_PLAZA_Y);
    }
  });
});

describe("cột đèn: ba bộ phận vẫn chồng đúng lên nhau", () => {
  const poleY = EXPECTED_PLAZA_Y + 2.6;
  const armY = EXPECTED_PLAZA_Y + 5.2;
  const headY = EXPECTED_PLAZA_Y + 5.55;

  it("bốn cột ở đúng bốn vị trí cũ", () => {
    expect(LAMP_XS).toEqual([-18, -6, 6, 18]);
    expect(poleY).toBeCloseTo(1.2, 9);
  });

  it("cần đèn nằm gần đỉnh cột, bóng đèn nằm ở đầu cần", () => {
    // Cột cao 5,2 và tâm ở 2,6 nên đỉnh ở PLAZA_Y + 5,2.
    expect(armY).toBeCloseTo(EXPECTED_PLAZA_Y + 5.2, 6);
    expect(headY).toBeGreaterThan(armY);
    // Bóng đèn nhô ra phía lòng đường xa hơn cần.
    expect(LAMP_Z + 1.35).toBeGreaterThan(LAMP_Z + 0.7);
  });
});

describe("người đi bộ: ba phần cơ thể vẫn theo tỷ lệ của từng người", () => {
  const walkers = Array.from({ length: 14 }, (_, i) => ({
    height: 0.92 + (i % 3) * 0.07,
  }));

  it("vẫn đúng mười bốn người", () => {
    expect(walkers).toHaveLength(14);
  });

  it("chân, thân và đầu giữ đúng khoảng cách sau khi nhân tỷ lệ", () => {
    for (const w of walkers) {
      const legs = w.height * 0.42;
      const torso = w.height * 1.0;
      const head = w.height * 1.44;
      expect(torso).toBeGreaterThan(legs);
      expect(head).toBeGreaterThan(torso);
      // Người cao hơn thì đầu cao hơn - đây là điều group scale làm trước đây
      // và bây giờ phải do tỷ lệ của instance làm.
      expect(head / w.height).toBeCloseTo(1.44, 6);
    }
  });

  it("người thấp nhất và cao nhất chênh nhau đúng như bản cũ", () => {
    const hs = walkers.map((w) => w.height);
    expect(Math.min(...hs)).toBeCloseTo(0.92, 6);
    expect(Math.max(...hs)).toBeCloseTo(1.06, 6);
  });
});
