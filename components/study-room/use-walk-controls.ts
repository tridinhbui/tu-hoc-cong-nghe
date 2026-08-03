"use client";

import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

/** Điều khiển đi lại dùng chung cho cảnh 3D đi được: phím giữ và camera quỹ đạo.
 *
 *  Tách khỏi component cảnh vì cả hai đều là logic ngoài-React thuần - chúng
 *  ghi vào ref và đọc mỗi khung hình, không sinh render nào - nên nhét vào
 *  giữa một file cảnh 500 dòng chỉ làm khó đọc cả hai. */

export interface HeldKeys {
  up?: boolean;
  down?: boolean;
  left?: boolean;
  right?: boolean;
}

function normalize(key: string): keyof HeldKeys | null {
  switch (key) {
    case "w": case "W": case "ArrowUp": return "up";
    case "s": case "S": case "ArrowDown": return "down";
    case "a": case "A": case "ArrowLeft": return "left";
    case "d": case "D": case "ArrowRight": return "right";
    default: return null;
  }
}

/** Trạng thái phím giữ, sống trong ref: đọc mỗi frame, không re-render. */
export function useHeldKeys(keysRef: React.MutableRefObject<HeldKeys>) {
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      // Không nuốt phím khi người dùng đang gõ - gõ chat mà nhân vật chạy theo
      // từng chữ thì cả hai đều không dùng được.
      const target = e.target as HTMLElement | null;
      if (target && (/INPUT|TEXTAREA|SELECT/.test(target.tagName) || target.isContentEditable)) return;
      const key = normalize(e.key);
      if (!key) return;
      keysRef.current[key] = true;
      e.preventDefault();
    };
    const up = (e: KeyboardEvent) => {
      const key = normalize(e.key);
      if (key) keysRef.current[key] = false;
    };
    // Rời tab thì nhả hết phím, nếu không nhân vật tự đi mãi.
    const blur = () => {
      keysRef.current = {};
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    window.addEventListener("blur", blur);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      window.removeEventListener("blur", blur);
    };
  }, [keysRef]);
}

export interface OrbitState {
  /** Lệch góc ngang so với hướng nhân vật đang quay, radian. */
  yaw: number;
  /** Góc chúc xuống, chặn hai đầu để không lộn qua đỉnh đầu hay chui xuống sàn. */
  pitch: number;
  /** Khoảng cách camera tới nhân vật. */
  dist: number;
}

/** Kéo để xoay quanh nhân vật, lăn để tiến/lùi camera.
 *
 *  Góc xoay là ĐỘ LỆCH so với hướng nhân vật chứ không phải góc tuyệt đối: đi
 *  tới đâu camera vẫn giữ góc nhìn tương đối người dùng vừa chọn, thay vì giật
 *  về sau lưng mỗi lần quay người.
 *
 *  Bắt sự kiện trên chính canvas WebGL chứ không trên window: HUD nằm đè lên
 *  trên, và kéo từ nút "Ngồi xuống" mà camera xoay theo thì bấm nút gần như
 *  không trúng. */
export function useCameraOrbit(
  orbit: React.MutableRefObject<OrbitState>,
  range: { min: number; max: number } = { min: 2, max: 13 }
) {
  const { gl } = useThree();

  useEffect(() => {
    const el = gl.domElement;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;

    const down = (e: PointerEvent) => {
      if (e.button !== 0) return;
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      el.setPointerCapture(e.pointerId);
      el.style.cursor = "grabbing";
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      orbit.current.yaw -= dx * 0.005;
      orbit.current.pitch = THREE.MathUtils.clamp(orbit.current.pitch + dy * 0.004, -0.2, 1.05);
    };
    const up = (e: PointerEvent) => {
      dragging = false;
      if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
      el.style.cursor = "grab";
    };
    const wheel = (e: WheelEvent) => {
      e.preventDefault();
      orbit.current.dist = THREE.MathUtils.clamp(orbit.current.dist + e.deltaY * 0.006, range.min, range.max);
    };

    el.style.cursor = "grab";
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    el.addEventListener("wheel", wheel, { passive: false });
    return () => {
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
      el.removeEventListener("wheel", wheel);
      el.style.cursor = "";
    };
  }, [gl, orbit, range.min, range.max]);
}

/** Đặt camera theo quỹ đạo quanh nhân vật. `distOverride` cho phép ngồi thì
 *  ngồi gần hơn mà vẫn giữ nguyên góc người dùng đã xoay. */
export function applyOrbitCamera(
  camera: THREE.Camera,
  pose: { x: number; z: number; ry: number },
  orbit: OrbitState,
  delta: number,
  distOverride?: number
) {
  const dist = distOverride ?? orbit.dist;
  const angle = pose.ry + orbit.yaw;
  const horizontal = Math.cos(orbit.pitch) * dist;
  const target = new THREE.Vector3(
    pose.x + Math.sin(angle) * horizontal,
    // Chặn sàn: pitch âm cộng khoảng cách xa sẽ dìm camera xuống dưới nền, và
    // lúc đó nửa dưới khung hình là mặt sau của sàn - một mảng đen. Kẹp ở đây
    // thay vì siết pitch, vì giới hạn thật phụ thuộc cả vào dist.
    Math.max(0.6, 1.5 + Math.sin(orbit.pitch) * dist),
    pose.z + Math.cos(angle) * horizontal
  );
  camera.position.lerp(target, Math.min(1, delta * 6));
  camera.lookAt(pose.x, 1.45, pose.z);
}
