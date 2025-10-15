import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductCard from "./ProductCard";
import Image from "next/image";
import { BASE_URL } from "@/constant/data";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import { Product } from "@/types/product";
import { Brands } from "@/types/brands";
import { BlogPost } from "@/types/blog";
import { truncateText } from "@/helpers/normalHelperFunction";

type SliderType = "product" | "blog" | "banner" | "brands";
type AvailableItems = Product[] | BlogPost[] | string[] | Brands[];
interface SliderProps {
  type: SliderType;
  items: AvailableItems;
  slideToShow?: 1 | 2 | 3 | 4 | 5 | 6;
}

function isProductArray(items: AvailableItems): items is Product[] {
  return (items as Product[])[0]?.price !== undefined;
}

function isBlogArray(items: AvailableItems): items is BlogPost[] {
  return (items as BlogPost[])[0]?.created_at !== undefined;
}

function isStringArray(items: AvailableItems): items is string[] {
  return typeof (items as string[])[0] === "string";
}
function isBrandsArray(items: AvailableItems): items is Brands[] {
  return (items as Brands[])[0]?.brand_img !== undefined;
}

export function Slider({ type, items, slideToShow = 4 }: SliderProps) {
  const slideClasses = {
    1: "lg:basis-full",
    2: "lg:basis-1/2",
    3: "lg:basis-1/3",
    4: "lg:basis-1/4",
    5: "lg:basis-1/5",
    6: "lg:basis-1/6",
  };

  const currentClass = slideClasses[slideToShow];

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full group relative slide"
    >
      <CarouselContent>
        {type === "product" &&
          isProductArray(items) &&
          items.map((el) => (
            <CarouselItem
              key={el.id}
              className={`md:basis-1/2 ${currentClass} my-3`}
            >
              <ProductCard
                src={BASE_URL + el.image}
                price={el.price ? el.price : null}
                name={el.name}
                category={el.category}
                href={`/product/${el.slug}`}
                mrpPrice={el.mrpPrice || null}
              />
            </CarouselItem>
          ))}

        {type === "blog" &&
          isBlogArray(items) &&
          items.map((el) => (
            <CarouselItem
              key={el.created_at}
              className={`md:basis-1/2 ${currentClass}`}
            >
              <div className="card-image min-h-[100%]">
                <Image
                  src={BASE_URL + el.image}
                  height={800}
                  width={800}
                  alt={el.title}
                  className="w-full object-cover mb-3 blog-image h-[233px]"
                />
                <h3 className="font-bold text-[1.1rem] mt-1">{el.title}</h3>

                <small className="font-semibold">
                  {truncateText(el.short, 15)}
                </small>
                <Link
                  href={`/blog/${el.slug}`}
                  className="flex uppercase text-[11px] font-bold items-center gap-2 mt-3 text-[#666]"
                >
                  Read More <MoveRight />
                </Link>
              </div>
            </CarouselItem>
          ))}

        {type === "banner" &&
          isStringArray(items) &&
          items.map((image, index) => (
            <CarouselItem key={index}>
              <Image
                src={image}
                className="img-fluid rounded-top"
                alt="slider-image"
                height={511}
                width={581}
              />
            </CarouselItem>
          ))}

        {type === "brands" &&
          isBrandsArray(items) &&
          items.map((brand) => {
            if (!brand.brand_img) {
              return null;
            }
            return (
              <CarouselItem
                key={brand.id}
                className={`md:basis-1/ ${currentClass}`}
              >
                <Link
                  href={`/product?brand=${brand.id}`}
                  className="grid place-items-center h-full w-fll"
                >
                  <Image
                    src={BASE_URL + brand.brand_img}
                    alt={brand.brand}
                    width={200}
                    height={200}
                    className="w-[150px] h-[150px] object-contain border-2"
                  />
                </Link>
              </CarouselItem>
            );
          })}
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
