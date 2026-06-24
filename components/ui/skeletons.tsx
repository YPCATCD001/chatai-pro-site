import { Skeleton } from "./skeleton";

export function CardSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-2xl border border-border/60 bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <Skeleton className="h-10 w-10 rounded-xl" />
            <Skeleton className="h-3 w-12 rounded-full" />
          </div>
          <Skeleton className="h-8 w-20 mb-2 rounded-lg" />
          <Skeleton className="h-4 w-24 rounded-md" />
          <div className="mt-3">
            <Skeleton className="h-9 w-full rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function BotCardSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-2xl border border-border/60 bg-card overflow-hidden">
          <Skeleton className="h-1.5 w-full" />
          <div className="p-5">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <Skeleton className="h-11 w-11 rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24 rounded-md" />
                  <Skeleton className="h-3 w-12 rounded-full" />
                </div>
              </div>
              <Skeleton className="h-7 w-7 rounded-lg" />
            </div>
            <div className="space-y-2 mb-4">
              <Skeleton className="h-3 w-full rounded-md" />
              <Skeleton className="h-3 w-3/4 rounded-md" />
            </div>
            <div className="flex gap-2 pt-4 border-t border-border/40">
              <Skeleton className="h-9 flex-1 rounded-lg" />
              <Skeleton className="h-9 w-9 rounded-lg" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ListItemSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 p-3 rounded-xl">
          <Skeleton className="h-9 w-9 rounded-lg" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-1/3 rounded-md" />
            <Skeleton className="h-3 w-1/4 rounded-md" />
          </div>
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
      ))}
    </div>
  );
}
