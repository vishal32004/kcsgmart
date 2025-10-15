"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "@/components/ProductCard";
import { PaginationWrapper } from "@/components/PaginationWrapper";
import { BASE_URL } from "@/constant/data";
import {
  fetchProductList,
  fetchCategories,
  fetchBrands,
} from "@/helpers/apiActions";
import ProductPageSkeleton from "@/components/skeleton/ProductPageSkeletion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Brands } from "@/types/brands"; // Ensure this path matches where your types are defined
import { Input } from "@/components/ui/input";
import { ChevronDown, ChevronRight, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams, useRouter } from "next/navigation";

const ITEMS_PER_PAGE = 12;

const priceOptions = [
  { label: "Below Rs. 500", range: [0, 500] },
  { label: "Rs. 500 - Rs. 1000", range: [500, 1000] },
  { label: "Rs. 1000 - Rs. 2000", range: [1000, 2000] },
  { label: "Above Rs. 2000", range: [2000, Infinity] },
];

export default function ProductListing() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedPrices, setSelectedPrices] = useState<number[][]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [categoriesExpanded, setCategoriesExpanded] = useState(false);
  const [brandsExpanded, setBrandsExpanded] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  // Load search query from session storage on component mount
  useEffect(() => {
    const storedQuery = sessionStorage.getItem("searchQuery");
    if (storedQuery) {
      setSearchQuery(storedQuery);
      // Clear the stored query after use
      sessionStorage.removeItem("searchQuery");
    }
  }, []);

  useEffect(() => {
    const brandParam = searchParams.get("brand");

    if (brandParam && !selectedBrands.includes(brandParam)) {
      setSelectedBrands([brandParam]);
      setCurrentPage(1);

      // Optional: Clean the URL after loading the filter
      router.replace("/product", { scroll: false });
    }
  }, []);

  useEffect(() => {
    if (
      searchQuery &&
      (selectedCategories.length > 0 ||
        selectedPrices.length > 0 ||
        selectedBrands.length > 0)
    ) {
      setSearchQuery("");
    }
  }, [searchQuery, selectedCategories, selectedPrices, selectedBrands]);

  const { data: categoryData, isLoading: loadingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await fetchCategories();
      return response;
    },
  });

  const {
    data: productData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["productList"],
    queryFn: () => fetchProductList(0, 1000), // Fetch all for filtering
  });

  const { data: brandData } = useQuery({
    queryKey: ["brands"],
    queryFn: () => fetchBrands(0, 100),
  });

  const { data: productsRaw, total = 0 } = productData || {};

  const handleCategoryChange = (id: number) => {
    setSelectedCategories((prev) => {
      const newCategories = prev.includes(id)
        ? prev.filter((c) => c !== id)
        : [...prev, id];
      setCurrentPage(1); // Reset to first page
      return newCategories;
    });
  };

  const handlePriceChange = (range: number[]) => {
    setSelectedPrices((prev) => {
      const exists = prev.find((r) => r[0] === range[0] && r[1] === range[1]);
      const newPrices = exists
        ? prev.filter((r) => r !== exists)
        : [...prev, range];
      setCurrentPage(1); // Reset to first page
      return newPrices;
    });
  };

  const handleBrandChange = (brandId: string) => {
    setSelectedBrands((prev) => {
      const newBrands = prev.includes(brandId)
        ? prev.filter((b) => b !== brandId)
        : [...prev, brandId];
      setCurrentPage(1); // Reset to first page
      return newBrands;
    });
  };

  const filterProducts = () => {
    if (!productsRaw) return [];

    return productsRaw.filter((product) => {
      // Always apply search if it exists
      const matchesSearch = searchQuery
        ? product.name.toLowerCase().includes(searchQuery.toLowerCase())
        : true;

      // Apply other filters
      const productCategories =
        product.category
          ?.split(",")
          .map((id: string) => parseInt(id.trim(), 10)) || [];
      const matchCategory =
        selectedCategories.length === 0 ||
        selectedCategories.some((id) => productCategories.includes(id));
      const matchBrand =
        selectedBrands.length === 0 ||
        selectedBrands.includes(String(product.brand));
      const matchPrice =
        selectedPrices.length === 0 ||
        selectedPrices.some(
          ([min, max]) =>
            Number(product.Productprice[0].p_price) >= min &&
            Number(product.Productprice[0].p_price) <= max
        );

      return matchesSearch && matchCategory && matchBrand && matchPrice;
    });
  };

  const filteredProducts = filterProducts();
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (isLoading || loadingCategories) return <ProductPageSkeleton />;
  if (!productsRaw || error) return <div>There Are No Products</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Update the header section to show search status */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Our Products</h1>
        {/* Show search status only if there's an active search */}
        {/* {searchQuery && (
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Our Products</h1>
          <div className="flex items-center gap-2">
            
            <button 
              onClick={() => {
                setSearchQuery("");
                setCurrentPage(1);
              }}
              className="text-red-600 hover:underline text-sm"
            >
              Clear search
            </button>
          </div>
        </div>
      )} */}

        {/* If no active search, show normal heading */}
        {/* {!searchQuery && (
        <h1 className="text-3xl font-bold mb-6">Our Products</h1>
      )} */}
      </div>
      {/* <h1 className="text-3xl font-bold mb-6">Our Products</h1> */}

      {/* Add search input in the product page */}
      {/* <div className="mb-6">
      <div className="relative max-w-md">
        <Input
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1); // Reset to first page when typing
          }}
          className="pl-10 pr-4 py-2 w-full"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>
    </div> */}

      <div className="flex gap-8">
        {/* Sidebar Filters - No changes needed here */}
        <div className="w-full md:w-1/4 space-y-6">
          {/* Categories */}
          <div>
            <h3
              className="font-semibold text-lg cursor-pointer flex items-center justify-between"
              onClick={() => setCategoriesExpanded((prev) => !prev)}
            >
              Categories
              {categoriesExpanded ? (
                <ChevronDown className="w-5 h-5 font-bold mr-1" />
              ) : (
                <ChevronRight className="w-5 h-5 font-bold mr-1" />
              )}
            </h3>

            <AnimatePresence initial={false}>
              {categoriesExpanded && (
                <motion.div
                  key="category-content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  {categoryData?.data?.map((category: any) => (
                    <div key={category.id} className="space-y-3 ml-4 my-3">
                      <div className="flex items-start">
                        <Checkbox
                          id={`cat-${category.id}`}
                          checked={selectedCategories.includes(category.id)}
                          onCheckedChange={() =>
                            handleCategoryChange(category.id)
                          }
                        />
                        <Label
                          htmlFor={`cat-${category.id}`}
                          className="ml-2 text-base leading-[1rem] text-slate-600 font-semibold"
                        >
                          {category.title}
                        </Label>
                      </div>

                      {category.children?.map((child: any) => (
                        <div
                          key={child.id}
                          className="ml-4 flex items-start mt-1"
                        >
                          <Checkbox
                            id={`cat-${child.id}`}
                            checked={selectedCategories.includes(child.id)}
                            onCheckedChange={() =>
                              handleCategoryChange(child.id)
                            }
                          />
                          <Label
                            htmlFor={`cat-${child.id}`}
                            className="ml-2 text-base font-semibold text-slate-600 leading-[1rem]"
                          >
                            {child.title}
                          </Label>
                        </div>
                      ))}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Price */}
          <div>
            <h3 className="font-semibold text-lg">Price</h3>
            {priceOptions.map((option) => (
              <div key={option.label} className="ml-2">
                <Checkbox
                  id={`price-${option.label}`}
                  checked={selectedPrices.some(
                    (range) =>
                      range[0] === option.range[0] &&
                      range[1] === option.range[1]
                  )}
                  onCheckedChange={() => handlePriceChange(option.range)}
                />
                <Label
                  htmlFor={`price-${option.label}`}
                  className="ml-2 text-base leading-[1rem] text-slate-600 font-semibold"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </div>

          {/* Brands */}
          <div>
            <h3
              className="font-semibold text-lg cursor-pointer flex items-center justify-between"
              onClick={() => setBrandsExpanded((prev) => !prev)}
            >
              Brand
              {brandsExpanded ? (
                <ChevronDown className="w-5 h-5 font-bold mr-1" />
              ) : (
                <ChevronRight className="w-5 h-5 font-bold mr-1" />
              )}
            </h3>

            <AnimatePresence initial={false}>
              {brandsExpanded && (
                <motion.div
                  key="brand-content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  {brandData?.data?.map((brand: Brands) => (
                    <div key={brand.id} className="flex items-center ml-4 my-3">
                      <Checkbox
                        id={`brand-${brand.id}`}
                        checked={selectedBrands.includes(String(brand.id))}
                        onCheckedChange={() =>
                          handleBrandChange(String(brand.id))
                        }
                      />
                      <Label
                        htmlFor={`brand-${brand.id}`}
                        className="ml-2 text-base leading-[1rem] text-slate-600 font-semibold"
                      >
                        {brand.brand}
                      </Label>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Product Grid */}
        <div className="w-full md:w-3/4">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-lg text-gray-600">
                {searchQuery
                  ? `No products found matching "${searchQuery}"`
                  : "No products found matching your filters"}
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategories([]);
                  setSelectedPrices([]);
                  setSelectedBrands([]);
                  setCurrentPage(1);
                }}
                className="mt-4 text-red-600 hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {displayedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    src={BASE_URL + product.image}
                    price={Number(product.Productprice[0].p_price)}
                    name={product.name}
                    category={product.category}
                    href={`/product/${product.slug}`}
                    mrpPrice={Number(product.Productprice[0].p_mrp)}
                  />
                ))}
              </div>
              <PaginationWrapper
                className="mt-8"
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
