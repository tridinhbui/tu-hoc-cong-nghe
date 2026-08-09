// Khai báo kiểu cho scripts/build-route-segments.mjs, để bài test
// lib/__tests__/route-segments.test.ts import được mà không cần @ts-expect-error.
export function collectRouteSegments(appDir?: string): string[];
