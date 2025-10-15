import { Skeleton } from "@/components/ui/skeleton";

export const CategorySkeleton = () => (
  <div className="flex flex-col items-center gap-y-3">
    <Skeleton className="h-20 w-20 rounded-full" />
    <Skeleton className="h-4 w-24" />
  </div>
);

export const BrandSkeleton = () => (
  <div className="flex flex-col items-center gap-y-3">
    <Skeleton className="h-20 w-20" />
  </div>
);

export const ThemeSkeleton = () => (
  <div className="flex flex-col items-center gap-y-3">
    <Skeleton className="h-20 w-20 rounded" />
    <Skeleton className="h-4 w-24" />
  </div>
);

export const FeaturedSkeleton = () => (
  <div className="flex flex-col items-center gap-y-3">
    <Skeleton className="h-20 w-20 rounded" />
    <Skeleton className="h-4 w-24" />
  </div>
);
