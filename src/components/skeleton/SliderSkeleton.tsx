import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";

type SliderType = "product" | "blog" | "banner" | "brand";

interface SliderSkeletonProps {
  type: SliderType;
  itemCount: number;
  slideToShow?: 1 | 2 | 3 | 4 | 5 | 6;
}

export function SliderSkeleton({
  type,
  itemCount,
  slideToShow = 4,
}: SliderSkeletonProps) {
  const slideClasses = {
    1: "lg:basis-full",
    2: "lg:basis-1/2",
    3: "lg:basis-1/3",
    4: "lg:basis-1/4",
    5: "lg:basis-1/5",
    6: "lg:basis-1/6",
  };

  const currentClass = slideClasses[slideToShow];

  const renderSkeletonItem = () => {
    switch (type) {
      case "product":
        return (
          <div className="space-y-2">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/3" />
          </div>
        );
      case "blog":
        return (
          <div className="space-y-2">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-3 w-1/4" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/3" />
          </div>
        );
      case "banner":
        return <Skeleton className="h-64 w-full" />;
      case "brand":
        return <Skeleton className="h-40 w-full" />;
    }
  };

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full group relative slide"
    >
      <CarouselContent>
        {[...Array(itemCount)].map((_, index) => (
          <CarouselItem key={index} className={`md:basis-1/2 ${currentClass}`}>
            {renderSkeletonItem()}
          </CarouselItem>
        ))}
      </CarouselContent>

      {type === "banner" ? (
        <>
          <CarouselPrevious className="left-[5px]" />
          <CarouselNext className="right-[5px]" />
        </>
      ) : (
        <>
          <CarouselPrevious className="absolute left-0 h-full rounded-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 disabled:invisible bg-[rgba(255,255,255,0.8)]" />
          <CarouselNext className="absolute right-0 h-full rounded-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 disabled:invisible bg-[rgba(255,255,255,0.8)]" />
        </>
      )}
    </Carousel>
  );
}
