import { Skeleton } from "@/components/ui/skeleton";

export function DynamicNavbarSkeleton() {
  return (
    <>
      {[...Array(5)].map((_, index) => (
        <Skeleton key={index} className="w-24 h-6 mx-2" />
      ))}
    </>
  );
}
