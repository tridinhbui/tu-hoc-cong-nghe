"use client";

import { useCallback, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import {
  applyLevel,
  createGovernor,
  observeFrame,
  type GovernorState,
  type QualityLike,
} from "@/lib/adaptive-quality";

/**
 * Đo thời lượng khung hình thật và hạ chất lượng khi cảnh không theo kịp.
 *
 * Phần quyết định nằm ở lib/adaptive-quality.ts và kiểm được bằng test; ở đây
 * chỉ còn hai việc: lấy `delta` từ vòng lặp vẽ, và báo lên trên khi mức đổi.
 *
 * Vì sao mức phải do phía TRÊN giữ chứ không giữ trong này: `shadows` và `dpr`
 * là thuộc tính của `<Canvas>`, mà component này nằm BÊN TRONG Canvas đó. Nó
 * chỉ có thể đo và báo; đổi thì phải là người dựng Canvas.
 */
export function QualityGovernor({ onLevel }: { onLevel: (level: number) => void }) {
  const state = useRef<GovernorState>(createGovernor());

  useFrame((_, delta) => {
    const next = observeFrame(state.current, delta * 1000);
    if (next.level !== state.current.level) onLevel(next.level);
    state.current = next;
  });

  return null;
}

/**
 * Móc dùng ở phía ngoài Canvas: trả về chất lượng đã điều tiết và hàm nhận mức
 * mới để truyền cho `<QualityGovernor>`.
 *
 *   const base = useRenderQuality();
 *   const { quality, onLevel } = useGovernedQuality(base);
 *   <Canvas shadows={quality.shadows} dpr={quality.dpr}>
 *     <QualityGovernor onLevel={onLevel} />
 *
 * Đặt state ở đây thay vì trong QualityGovernor để việc hạ mức làm Canvas dựng
 * lại đúng một lần, thay vì mỗi khung hình đều gọi setState.
 */
export function useGovernedQuality<T extends QualityLike>(base: T): {
  quality: T;
  level: number;
  onLevel: (level: number) => void;
} {
  const [level, setLevel] = useState(0);
  const onLevel = useCallback((next: number) => setLevel(next), []);
  const adjusted = applyLevel(base, level);
  return {
    quality: level === 0 ? base : ({ ...base, ...adjusted } as T),
    level,
    onLevel,
  };
}
