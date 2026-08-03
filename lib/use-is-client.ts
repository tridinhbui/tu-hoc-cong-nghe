"use client";

import { useSyncExternalStore } from "react";

// `false` khi dựng trên server, `true` sau khi đã gắn vào DOM.
//
// Thay cho cặp `useState(false)` + `useEffect(() => setMounted(true))` vẫn
// dùng để hoãn `createPortal(..., document.body)` tới lúc có DOM. Cặp cũ tốn
// một vòng render thừa cho mọi component dùng nó, và React Compiler chặn nó
// vì đó đúng là setState đồng bộ trong effect - thứ mà useSyncExternalStore
// sinh ra để thay thế.

const subscribe = () => () => {};

export function useIsClient(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
