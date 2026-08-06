import { describe, expect, it } from "vitest";
import { RECENTER_DELAY_MS, recenterOrbit, type OrbitState } from "@/components/world-controls/easy-walk";

/** Camera tự trôi về sau lưng nhân vật sau khi người dùng thả cú kéo.
 *
 *  Phần này kiểm được bằng số vì nó CHỈ là số: recenterOrbit không đụng tới
 *  three.js, không đụng tới React, nó sửa ba trường của một object thường. Cái
 *  đắt (dựng cảnh, gắn sự kiện chuột) nằm ở chỗ khác đúng vì lý do đó.
 *
 *  Thứ đáng sợ nhất ở tính năng này không phải là nó trôi sai, mà là nó trôi
 *  lúc không được phép: hướng đi được suy từ góc camera, nên camera tự quay
 *  trong lúc người dùng đang giữ phím đi ngang sẽ làm nhân vật đi thành vòng
 *  tròn. Bài "không trôi khi đang giữ phím" bên dưới giữ đúng chỗ đó. */

function orbit(over: Partial<OrbitState> = {}): OrbitState {
  return { yaw: 0, pitch: 0.5, dist: 6, idleSince: 0, ...over };
}

/** Chạy nhiều khung hình 60fps kể từ lúc thả tay. */
function run(o: OrbitState, heading: number, frames: number, opts: { allowed?: boolean; restPitch?: number } = {}) {
  const dt = 1 / 60;
  for (let i = 0; i < frames; i++) {
    recenterOrbit(o, heading, dt, {
      allowed: opts.allowed ?? true,
      restPitch: opts.restPitch,
      now: RECENTER_DELAY_MS + i * dt * 1000,
    });
  }
  return o;
}

describe("camera trôi về sau lưng", () => {
  it("không nhúc nhích trước khi hết thời gian chờ", () => {
    const o = orbit({ yaw: 1 });
    recenterOrbit(o, 0, 1 / 60, { allowed: true, now: RECENTER_DELAY_MS - 1 });
    expect(o.yaw).toBe(1);
  });

  it("về đúng hướng nhân vật sau vài giây", () => {
    const o = orbit({ yaw: 1 });
    run(o, 0, 300);
    expect(o.yaw).toBeCloseTo(0, 3);
  });

  it("kéo pitch về góc nghỉ, và để yên khi phía gọi không đưa góc nghỉ", () => {
    const withRest = orbit({ yaw: 0.4, pitch: 0.9 });
    run(withRest, 0, 300, { restPitch: 0.36 });
    expect(withRest.pitch).toBeCloseTo(0.36, 3);

    const without = orbit({ yaw: 0.4, pitch: 0.9 });
    run(without, 0, 300);
    expect(without.pitch).toBe(0.9);
  });

  it("không trôi khi đang giữ phím đi - đây là chỗ sinh ra vòng lặp xoáy tròn", () => {
    const o = orbit({ yaw: 1 });
    run(o, 0, 300, { allowed: false });
    expect(o.yaw).toBe(1);
  });

  it("không trôi khi chưa có cú kéo nào - idleSince null là 'không có gì phải làm'", () => {
    const o = orbit({ yaw: 1, idleSince: null });
    run(o, 0, 300);
    expect(o.yaw).toBe(1);
  });

  it("tự tắt khi về đến nơi, để khung hình sau không tính lại một phép đã hội tụ", () => {
    const o = orbit({ yaw: 0.4, pitch: 0.9 });
    run(o, 0, 300, { restPitch: 0.36 });
    expect(o.idleSince).toBeNull();
  });

  it("đi theo cung ngắn: kéo qua nhiều vòng vẫn về gần nhất, không quay ngược cả vòng", () => {
    // Người dùng kéo camera hơn một vòng tròn; hiệu hai góc là 6,1 rad nhưng
    // đường ngắn là 0,18 rad theo chiều ngược lại. Cộng thẳng thì camera quay
    // gần trọn một vòng trước mặt người học.
    const o = orbit({ yaw: Math.PI * 2 + 0.1 });
    const first = { ...o };
    recenterOrbit(o, 0, 1 / 60, { allowed: true, now: RECENTER_DELAY_MS });
    expect(o.yaw).toBeLessThan(first.yaw);
    run(o, 0, 300);
    // Về 0 chứ không về 2π: cùng một hướng nhìn, nhưng số phải hội tụ.
    expect(Math.abs(o.yaw)).toBeLessThan(0.01);
  });

  it("một cú kéo mới huỷ cú trôi đang dở", () => {
    const o = orbit({ yaw: 1 });
    run(o, 0, 30);
    const midway = o.yaw;
    expect(midway).not.toBe(1);
    // Đây là việc mà pointerdown làm.
    o.idleSince = null;
    run(o, 0, 300);
    expect(o.yaw).toBe(midway);
  });
});
