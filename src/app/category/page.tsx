"use client";
import {  BASE_URL } from "@/constant/data";
import { fetchBrands, fetchCategories } from "@/helpers/apiActions";
import { Brands } from "@/types/brands";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import {
  CategorySkeleton,
  BrandSkeleton,
  ThemeSkeleton,
  FeaturedSkeleton,
} from "@/components/skeleton/CategoryPageSkeleton";
import { CatagoryItem } from "@/types/category";

const DEFAULT_IMAGE = "/images/accessories-gift-set-89-2024-04.webp";

const Products = () => {
  const {
    data: categories,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useQuery<CatagoryItem[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await fetchCategories();
      return response.data;
    },
  });
  const {
    data: brands,
    isLoading: brandsLoading,
    error: brandsError,
  } = useQuery<Brands[]>({
    queryKey: ["CategoryPageBrands"],
    queryFn: async () => {
      const response = await fetchBrands(0, 100);
      return response.data;
    },
  });

  return (
    <div className="flex flex-col gap-y-[3rem]">
      <div className="container my-3">
        <h1 className="text-[2.5rem] font-bold">
          Assured Quality Branded Corporate Gifts
        </h1>
        <p className="text-center my-10 text-[#666]">
          Searching the perfect corporate gift considering purpose of gifting is
          very essential in getting desired marketing results. Check below
          Corporate Gifting Ideas filtered by Categories, Brands, Themes and
          Range to zero down to the best gift featuring your brand logo.
        </p>
      </div>

      <section className="container">
        <h2 className="flex flex-col items-center justify-center text-[1.7rem] font-bold gap-y-2 mb-7">
          <span>Find By Categories</span>
          <div className="bg-[#C31C18] h-[3px] w-[8%]"></div>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {categoriesLoading
            ? Array(6)
                .fill(0)
                .map((_, index) => <CategorySkeleton key={index} />)
            : categories?.map((el) => (
                <div key={el.id} className="flex flex-col items-center gap-y-3">
                  <Image
                    alt={el.title}
                    height={500}
                    width={500}
                    src={
                      el.home_image
                        ? BASE_URL + el.home_image
                        : BASE_URL + el.image
                    }
                    className="aspect-square object-cover"
                  />
                  <p className="text-[#666] capitalize">{el.title}</p>
                </div>
              ))}
        </div>
      </section>

      <section className="container">
        <h2 className="flex flex-col items-center justify-center text-[1.7rem] font-bold gap-y-2 mb-7">
          <span>Find By Brands</span>
          <div className="bg-[#C31C18] h-[3px] w-[8%]"></div>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 gap-y-10">
          {brandsLoading
            ? Array(6)
                .fill(0)
                .map((_, index) => <BrandSkeleton key={index} />)
            : brands?.map((el) => (
                <div key={el.id} className="flex flex-col items-center gap-y-3">
                  <Image
                    alt={el.brand}
                    height={500}
                    width={500}
                    src={el.brand_img ? BASE_URL + el.brand_img : DEFAULT_IMAGE}
                    className="aspect-square object-contain"
                  />
                </div>
              ))}
        </div>
      </section>
    </div>
  );
};

export default Products;
