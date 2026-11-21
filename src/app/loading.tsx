export default function Loading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Banner Skeleton */}
      <div className="w-full h-80 bg-slate-900 rounded-3xl" />

      {/* Grid Skeleton */}
      <div className="space-y-4">
        <div className="h-6 w-48 bg-slate-900 rounded-lg" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="aspect-[2/3] bg-slate-900 rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  );
}