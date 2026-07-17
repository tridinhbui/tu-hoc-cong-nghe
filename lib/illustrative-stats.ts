// Illustrative "N people studying/learned this" counts shown on lesson
// cards - there is no real view/completion-count tracking per lesson in
// this codebase (no view_count column, no aggregate query). These are
// deterministic per-seed (same seed -> same number every render, so it
// doesn't flicker on re-render) but are NOT real telemetry - purely a
// social-proof visual. Shared by DashboardRecommendations and
// DashboardClient so both use the same hashing/range logic.
export function getIllustrativeCount(seed: string, min: number, max: number): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return min + (hash % (max - min + 1));
}
