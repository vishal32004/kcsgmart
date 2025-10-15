"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { BASE_URL } from "@/constant/data";
import {
  fetchCategoryProducts,
  fetchFilterCategory,
} from "@/helpers/apiActions";
import { CategorySlugPageSkeleton } from "@/components/skeleton/CategoryDetailSkeleton";
import { Product } from "@/types/product";
import { mapBackendProductsToProducts } from "@/helpers/mapBackendProductToProduct";

export default function CategoryPage() {
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const params = useParams();
  const slug = (params.categorySlug as string) || "";

  // Fetch filters (categories)
  const {
    data: filterCategoryData,
    isLoading: filterLoading,
    error: filterError,
  } = useQuery({
    queryKey: ["filterCategory", slug],
    queryFn: () => fetchFilterCategory(slug),
  });

  // Fetch products paginated
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: productLoading,
    error: productError,
  } = useInfiniteQuery({
    queryKey: ["products", slug],
    queryFn: ({ pageParam = 1 }: { pageParam: number }) =>
      fetchCategoryProducts(slug, pageParam),
    getNextPageParam: (lastPage: { data: any[] }, pages) =>
      lastPage?.data?.length === 10 ? pages.length + 1 : undefined,
    initialPageParam: 1,
  });

  // Combine all pages into one array
  const allProducts = useMemo(() => {
    return (
      data?.pages.flatMap((page) =>
        page?.data ? mapBackendProductsToProducts(page.data) : []
      ) || []
    );
  }, [data]);

  // Filter products client-side
  useEffect(() => {
    let filtered = allProducts;

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCategories.some((categoryId) =>
          product.category.split(",").includes(categoryId.toString())
        )
      );
    }

    if (selectedPriceRange) {
      const [minPrice, maxPrice] = selectedPriceRange.split("-").map(Number);
      filtered = filtered.filter(
        (product) => product.price >= minPrice && product.price <= maxPrice
      );
    }

    setFilteredProducts(filtered);
  }, [allProducts, selectedCategories, selectedPriceRange]);

  const handleCategoryChange = (categoryId: number) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handlePriceRangeChange = (range: string) => {
    setSelectedPriceRange(range);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedPriceRange(null);
  };

  if (productLoading || filterLoading) return <CategorySlugPageSkeleton />;

  return (
    <div className="flex flex-col gap-y-12 px-4 md:px-20">
      <h1 className="text-3xl md:text-4xl font-black mt-5 text-center">
        {slug
          .split("-")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ")}
      </h1>

      <div className="flex justify-between">
        <div className="flex gap-5">
          <Button
            variant="outline"
            size="lg"
            onClick={clearFilters}
            className="border-red-600 border-2 rounded-sm transition hover:bg-red-600 hover:text-white font-bold text-red-600"
          >
            Clear All
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        {/* Sidebar Filters */}
        <div className="w-full md:w-1/4">
          <div className="flex flex-col gap-y-5 p-4 bg-white shadow-lg md:shadow-none">
            <h3 className="font-semibold text-lg mt-4">Filter By Category</h3>
            <div className="space-y-2">
              {Array.isArray(filterCategoryData?.data) && filterCategoryData.data.length > 0 ? (
                filterCategoryData.data.map((cat: any) => (
                  <div key={cat.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${cat.id}`}
                      checked={selectedCategories.includes(cat.id)}
                      onCheckedChange={() => handleCategoryChange(cat.id)}
                    />
                    <Label htmlFor={`category-${cat.id}`}>{cat.title}</Label>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No categories available.</p>
              )}

            </div>

            <h3 className="font-semibold text-lg mt-4">Filter By Price</h3>
            <div className="space-y-2">
              {[
                ["0-50000", "All"],
                ["0-500", "Rs. 0 - Rs. 500"],
                ["500-1000", "Rs. 500 - Rs. 1000"],
                ["1000-5000", "Rs. 1000 - Rs. 5000"],
                ["5000-10000", "Rs. 5000 - Rs. 10000"],
                ["10000-50000", "Rs. 10000 - Rs. 50000"],
              ].map(([range, label]) => (
                <div key={range} className="flex items-center space-x-2">
                  <Checkbox
                    id={`price-${range}`}
                    checked={selectedPriceRange === range}
                    onCheckedChange={() => handlePriceRangeChange(range)}
                  />
                  <Label htmlFor={`price-${range}`}>{label}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="transition-all grid gap-4 p-4 gap-y-10 grid-cols-1 md:grid-cols-3 w-full md:w-3/4">
          {productError || filterError ? (
            <div className="col-span-full text-center text-red-500">
              Error loading products or categories. Please try again later.
            </div>
          ) : !filteredProducts || filteredProducts.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">
              No products found
            </div>
          ) : (
            filteredProducts.map((product: Product) => (
              <Link href={`/product/${product.slug}`} key={product.id}>
                <Image
                  src={BASE_URL + product.image}
                  alt={product.name}
                  width={750}
                  height={500}
                  className="max-w-full max-h-[300px] object-contain border border-gray-200"
                />
                <div className="flex flex-col gap-1 mt-5">
                  <h2 className="font-semibold">{product.name}</h2>
                  <p className="text-lg text-black">Mrp Rs.{product.price}</p>
                </div>
              </Link>
            ))
          )}
        </div>

      </div>

      {/* Load More Button */}
      {hasNextPage && (
        <div className="text-center mt-8">
          <Button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="px-6 py-2 text-white bg-red-600 hover:bg-red-700 rounded"
          >
            {isFetchingNextPage ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}
    </div>
  );
}
