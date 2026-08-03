import { describe, it, expect } from "vitest";
import { STATIONS, STATION_X, nearestStation } from "@/components/lobby/stations";
import { ARMCHAIR_ZS, CARREL_ZS } from "@/components/lobby/room-obstacles";
import { MEZZ_BAND } from "@/components/lobby/world";

/** Các cửa phòng học vừa là hình học vừa là điều hướng, nên hai loại lỗi đều
 *  câm lặng: một cái cửa trùng chỗ với cái bàn thì không ai vào được phòng đó,
 *  và một đường dẫn gõ sai chỉ lộ ra khi người dùng bấm vào. */

const BAND_X = (MEZZ_BAND[0] + MEZZ_BAND[1]) / 2;

/** Nửa bề sâu của một cửa và của từng món đồ trên ban công, theo trục z. */
const DOOR_HALF = 2.76 / 2;
const CARREL_HALF = 0.95;
const CHAIR_HALF = 0.62;

describe("khai báo cửa", () => {
  it("id không trùng nhau", () => {
    expect(new Set(STATIONS.map((s) => s.id)).size).toBe(STATIONS.length);
  });

  it("mọi đường dẫn là đường tuyệt đối trong app", () => {
    for (const s of STATIONS) expect(s.href).toMatch(/^\/[a-z0-9-]+$/);
  });

  it("mỗi cửa có công thức thật, không phải khẩu hiệu", () => {
    for (const s of STATIONS) {
      // Có quan hệ toán học, không phải một câu chữ. Nhận cả ≈ vì đường cong
      // quên là xấp xỉ chứ không phải đẳng thức.
      expect(s.formula).toMatch(/[=≈]/);
      expect(s.formula.length).toBeGreaterThan(8);
      expect(s.note.length).toBeGreaterThan(15);
    }
  });

  it("hai bên ban công chia đều số cửa", () => {
    const left = STATIONS.filter((s) => s.side === -1).length;
    expect(left).toBe(STATIONS.length - left);
  });

  it("hai cửa cùng bên không chồng lên nhau", () => {
    for (const side of [-1, 1] as const) {
      const zs = STATIONS.filter((s) => s.side === side)
        .map((s) => s.z)
        .sort((a, b) => a - b);
      for (let i = 1; i < zs.length; i += 1) {
        expect(zs[i] - zs[i - 1]).toBeGreaterThan(DOOR_HALF * 2);
      }
    }
  });

  it("không cửa nào bị bàn học hay ghế bành chắn mất", () => {
    for (const s of STATIONS) {
      for (const cz of CARREL_ZS) {
        expect(Math.abs(s.z - cz)).toBeGreaterThan(DOOR_HALF + CARREL_HALF);
      }
      for (const az of ARMCHAIR_ZS) {
        expect(Math.abs(s.z - az)).toBeGreaterThan(DOOR_HALF + CHAIR_HALF);
      }
    }
  });

  it("cửa nằm ngoài dải đi lại, tức là trên tường chứ không giữa lối đi", () => {
    expect(STATION_X).toBeGreaterThan(MEZZ_BAND[1]);
  });
});

describe("bắt cửa gần nhất", () => {
  const east = STATIONS.find((s) => s.side === 1)!;

  it("đứng ngay trước cửa thì bắt được", () => {
    expect(nearestStation(BAND_X, east.z, 1)?.id).toBe(east.id);
  });

  it("đứng dưới sảnh, ngay dưới gầm ban công, thì không bắt", () => {
    expect(nearestStation(BAND_X, east.z, 0)).toBeNull();
  });

  it("không bắt nhầm cửa bên kia ban công", () => {
    const found = nearestStation(-BAND_X, east.z, 1);
    expect(found?.side).not.toBe(1);
  });

  it("đi quá xa theo z thì nhả ra", () => {
    expect(nearestStation(BAND_X, east.z + 6, 1)?.id).not.toBe(east.id);
  });

  it("mọi cửa đều tới được từ dải đi lại của ban công", () => {
    for (const s of STATIONS) {
      expect(nearestStation(s.side * BAND_X, s.z, 1)?.id).toBe(s.id);
    }
  });
});
