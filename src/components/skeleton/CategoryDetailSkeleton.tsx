import { Skeleton } from "@/components/ui/skeleton";

export function CategorySlugPageSkeleton() {
  return (
    <div className="flex flex-col gap-y-[3rem] px-4 md:px-20">
      <Skeleton className="h-10 w-3/4 mx-auto mt-5" />
      <div className="flex justify-between">
        <div className="flex gap-5">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>
      <div className="flex flex-col md:flex-row justify-start gap-4 items-start">
        <div className="w-full md:w-1/4">
          <div className="flex flex-col gap-y-5 p-4">
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-6 w-1/2 mt-4" />
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center space-x-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-1/4" />
              </div>
            ))}
            <Skeleton className="h-10 w-full mt-4" />
          </div>
        </div>
        <div className="grid gap-4 p-4 gap-y-10 grid-cols-1 md:grid-cols-3 w-full md:w-3/4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex flex-col gap-4">
              <Skeleton className="h-[300px] w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
