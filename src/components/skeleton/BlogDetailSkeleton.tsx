import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function BlogDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <article className="lg:w-2/3">
          <Skeleton className="w-full h-[400px] rounded-lg mb-8" />
          <Skeleton className="w-3/4 h-[48px] mb-4" />
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <Skeleton className="w-[120px] h-[24px]" />
            <Skeleton className="w-[100px] h-[24px]" />
            <Skeleton className="w-[80px] h-[24px]" />
          </div>
          <div className="space-y-4 mb-8">
            <Skeleton className="w-full h-[20px]" />
            <Skeleton className="w-full h-[20px]" />
            <Skeleton className="w-3/4 h-[20px]" />
            <Skeleton className="w-full h-[20px]" />
            <Skeleton className="w-full h-[20px]" />
            <Skeleton className="w-5/6 h-[20px]" />
          </div>
          <div className="flex flex-wrap gap-2 mb-8">
            <Skeleton className="w-[80px] h-[32px]" />
            <Skeleton className="w-[100px] h-[32px]" />
            <Skeleton className="w-[90px] h-[32px]" />
            <Skeleton className="w-[70px] h-[32px]" />
          </div>
        </article>

        <aside className="lg:w-1/3">
          <div className="sticky top-8">
            <Skeleton className="w-[150px] h-[32px] mb-6" />
            <div className="space-y-6">
              {[...Array(4)].map((_, index) => (
                <Card key={index}>
                  <CardContent className="p-4 flex gap-4">
                    <Skeleton className="w-[100px] h-[100px] rounded-md" />
                    <div className="flex-1">
                      <Skeleton className="w-full h-[24px] mb-2" />
                      <Skeleton className="w-5/6 h-[20px] mb-2" />
                      <Skeleton className="w-1/2 h-[20px]" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Skeleton className="w-full h-[40px] mt-8" />
          </div>
        </aside>
      </div>
    </div>
  );
}
