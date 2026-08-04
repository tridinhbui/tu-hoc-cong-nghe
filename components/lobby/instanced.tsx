"use client";

import { useLayoutEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Nhiều bản sao của cùng một hình khối, vẽ bằng MỘT draw call.
 *
 * Vì sao cần: mỗi `<mesh>` là một draw call, và cảnh ngoài trời của thư viện
 * đã đo được 298 draw call - nặng nhất trong ba thế giới, gấp rưỡi con phố của
 * Phố nghề sau khi phố đó đã được instancing hoá. Phần lớn con số ấy là những
 * thứ lặp lại y hệt nhau: 22 căn nhà ống, 14 người đi bộ, 4 cây, 4 cột đèn.
 *
 * `InstancedMesh` của three.js vẽ tất cả trong một lần gọi, với một ma trận
 * riêng cho mỗi bản sao - nên vị trí, xoay và tỷ lệ vẫn khác nhau được. Cái
 * phải giống nhau là hình khối và vật liệu.
 *
 * Hai kiểu dùng, cố ý tách:
 *
 *   - `<StaticInstances>` cho thứ đứng yên. Ma trận tính một lần lúc gắn.
 *   - `<AnimatedInstances>` cho thứ chuyển động. Ma trận cập nhật mỗi khung
 *     hình qua ref - KHÔNG qua state React, vì đặt state 60 lần một giây sẽ
 *     tốn hơn nhiều so với chỗ vừa tiết kiệm được.
 *
 * Màu riêng cho từng bản sao đi qua `colors`; bỏ trống thì cả đàn dùng màu của
 * vật liệu.
 */

export interface InstanceTransform {
  position: [number, number, number];
  scale?: [number, number, number] | number;
  rotation?: [number, number, number];
}

const dummy = new THREE.Object3D();
const tint = new THREE.Color();

/** Ghi một ma trận vào phần tử thứ i. Dùng chung một Object3D tạm cho cả file:
 *  tạo mới mỗi lần sẽ sinh rác đúng trong vòng lặp mỗi khung hình. */
export function writeInstance(
  mesh: THREE.InstancedMesh,
  i: number,
  t: InstanceTransform
): void {
  dummy.position.set(...t.position);
  if (typeof t.scale === "number") dummy.scale.setScalar(t.scale);
  else if (t.scale) dummy.scale.set(...t.scale);
  else dummy.scale.setScalar(1);
  if (t.rotation) dummy.rotation.set(...t.rotation);
  else dummy.rotation.set(0, 0, 0);
  dummy.updateMatrix();
  mesh.setMatrixAt(i, dummy.matrix);
}

export function StaticInstances({
  transforms,
  colors,
  castShadow,
  receiveShadow,
  children,
}: {
  transforms: InstanceTransform[];
  colors?: string[];
  castShadow?: boolean;
  receiveShadow?: boolean;
  /** Đúng hai phần tử con: một geometry và một material. */
  children: React.ReactNode;
}) {
  const ref = useRef<THREE.InstancedMesh>(null);

  useLayoutEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    transforms.forEach((t, i) => writeInstance(mesh, i, t));
    mesh.instanceMatrix.needsUpdate = true;
    if (colors) {
      colors.forEach((c, i) => mesh.setColorAt(i, tint.set(c)));
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    }
    // Cụm nằm rải khắp phố nên hộp bao mặc định (tính từ bản sao đầu tiên) sẽ
    // sai, và three.js sẽ cắt cả cụm khỏi khung hình khi bản sao đầu đi khuất.
    mesh.computeBoundingSphere();
  }, [transforms, colors]);

  return (
    <instancedMesh
      ref={ref}
      args={[undefined, undefined, transforms.length]}
      castShadow={castShadow}
      receiveShadow={receiveShadow}
      frustumCulled={false}
    >
      {children}
    </instancedMesh>
  );
}

/**
 * Như trên nhưng dành cho vật chuyển động: phía gọi nhận `meshRef` và tự cập
 * nhật ma trận trong `useFrame` của mình.
 */
export function AnimatedInstances({
  count,
  colors,
  meshRef,
  castShadow,
  children,
}: {
  count: number;
  colors?: string[];
  meshRef: React.RefObject<THREE.InstancedMesh | null>;
  castShadow?: boolean;
  children: React.ReactNode;
}) {
  useLayoutEffect(() => {
    const mesh = meshRef.current;
    if (!mesh || !colors) return;
    colors.forEach((c, i) => mesh.setColorAt(i, tint.set(c)));
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [colors, meshRef]);

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, count]}
      castShadow={castShadow}
      frustumCulled={false}
    >
      {children}
    </instancedMesh>
  );
}
