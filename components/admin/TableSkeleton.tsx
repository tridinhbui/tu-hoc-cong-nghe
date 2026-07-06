export default function TableSkeleton({ rows = 6, cols = 5 }: { rows?: number; cols?: number }) {
  return (
    <div className="animate-pulse divide-y divide-stone-200 dark:divide-stone-800">
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="flex items-center gap-4 px-4 py-3">
          {Array.from({ length: cols }).map((_, c) => (
            <div
              key={c}
              className="h-4 bg-stone-200 dark:bg-stone-800 rounded"
              style={{ width: c === 0 ? "20%" : `${60 / (cols - 1)}%` }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
