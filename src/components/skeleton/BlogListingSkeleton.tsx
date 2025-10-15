import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import Banner from "../ContentPageBanner";

export default function BlogListingSkeleton() {
  return (
    <>
      <Banner title="Blogs" />
      <section>
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="w-[200px] h-[40px] mb-8" />
          <Card className="mb-16">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2 gap-6">
                <Skeleton className="h-[300px] md:h-[400px] rounded-t-lg md:rounded-l-lg md:rounded-tr-none" />
                <div className="p-6 flex flex-col justify-between">
                  <div>
                    <Skeleton className="w-3/4 h-[36px] mb-4" />
                    <Skeleton className="w-full h-[20px] mb-2" />
                    <Skeleton className="w-full h-[20px] mb-2" />
                    <Skeleton className="w-3/4 h-[20px] mb-4" />
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Skeleton className="w-[60px] h-[24px]" />
                      <Skeleton className="w-[80px] h-[24px]" />
                      <Skeleton className="w-[70px] h-[24px]" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Skeleton className="w-[120px] h-[20px]" />
                    <Skeleton className="w-[100px] h-[36px]" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Other Posts Skeleton */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <Card key={index}>
                <CardContent className="p-0">
                  <Skeleton className="h-48 rounded-t-lg" />
                  <div className="p-6">
                    <Skeleton className="w-3/4 h-[28px] mb-2" />
                    <Skeleton className="w-full h-[20px] mb-2" />
                    <Skeleton className="w-full h-[20px] mb-2" />
                    <Skeleton className="w-3/4 h-[20px] mb-4" />
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Skeleton className="w-[60px] h-[24px]" />
                      <Skeleton className="w-[70px] h-[24px]" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Skeleton className="w-[100px] h-[20px]" />
                      <Skeleton className="w-[80px] h-[32px]" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
