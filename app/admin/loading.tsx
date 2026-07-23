export default function AdminLoading() {
  return (
    <div className="space-y-6 animate-pulse p-2">
      {/* Header Skeleton */}
      <div className="space-y-2">
        <div className="h-7 w-64 bg-stone-200 dark:bg-stone-800 rounded-lg" />
        <div className="h-4 w-96 bg-stone-150 dark:bg-stone-850 rounded-md" />
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-28 bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-5" />
        ))}
      </div>

      {/* Main Content Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-72 bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl" />
        <div className="h-72 bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl" />
      </div>
    </div>
  );
}
