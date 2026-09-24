export default function AdminLoading() {
  return (
    <div className="space-y-6 animate-pulse p-2">
      {/* Header Skeleton */}
      <div className="space-y-2">
        <div className="h-7 w-64 bg-surface-sunken rounded-lg" />
        <div className="h-4 w-96 bg-surface-raised rounded-md" />
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-28 bg-surface-raised border border-line rounded-xl p-5" />
        ))}
      </div>

      {/* Main Content Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-72 bg-surface-raised border border-line rounded-xl" />
        <div className="h-72 bg-surface-raised border border-line rounded-xl" />
      </div>
    </div>
  );
}
