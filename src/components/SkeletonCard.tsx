export default function SkeletonCard() {
  return (
    <div className="border-b border-black/10 dark:border-white/10 pb-8 flex flex-col justify-between h-full animate-pulse">
      <div>
        {/* Index header skeleton */}
        <div className="flex justify-between items-start mb-4">
          <div className="w-16 h-3 bg-black/5 dark:bg-white/5" />
          <div className="flex gap-1.5">
            <div className="w-14 h-4 bg-black/5 dark:bg-white/5" />
            <div className="w-12 h-4 bg-black/5 dark:bg-white/5" />
          </div>
        </div>

        {/* Image preview skeleton */}
        <div className="aspect-[16/10] bg-black/5 dark:bg-white/5 mb-5 border border-black/10 dark:border-white/10" />

        {/* Title skeleton */}
        <div className="w-3/4 h-7 bg-black/5 dark:bg-white/5 mb-3" />
        <div className="w-1/2 h-7 bg-black/5 dark:bg-white/5 mb-4" />

        {/* Description skeleton */}
        <div className="w-full h-3 bg-black/5 dark:bg-white/5 mb-2" />
        <div className="w-5/6 h-3 bg-black/5 dark:bg-white/5 mb-2" />
        <div className="w-2/3 h-3 bg-black/5 dark:bg-white/5 mb-5" />
      </div>

      {/* Footer skeleton */}
      <div className="flex justify-between items-center">
        <div className="w-20 h-3 bg-black/5 dark:bg-white/5" />
        <div className="w-8 h-3 bg-black/5 dark:bg-white/5" />
      </div>
    </div>
  );
}
