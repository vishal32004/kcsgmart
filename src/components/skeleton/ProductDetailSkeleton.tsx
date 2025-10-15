import { Skeleton } from "@/components/ui/skeleton";

export function ProductDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <Skeleton className="aspect-square w-full h-[600px]" />
          <div className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="aspect-square w-full" />
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <Skeleton className="h-10 w-3/4" />
          <div className="flex items-center space-x-2">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="w-5 h-5" />
            ))}
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-20 w-full" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
          <Skeleton className="h-32 w-full" />
        </div>
      </div>

      <div className="mt-12">
        <Skeleton className="h-10 w-40 mb-6" />
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
      </div>

      <div className="mt-12">
        <Skeleton className="h-10 w-48 mb-6" />
        <Skeleton className="h-64 w-full" />
      </div>
    </div>
  );
}
