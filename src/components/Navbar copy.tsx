"use client";
import { Heart, Info, MapPin, Phone, Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Input } from "./ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import MobileNavbar from "./MobileNavbar";
import DropDown from "./DropDown";
import { useQuery } from "@tanstack/react-query";
import { fetchNavbarMenus, fetchProductList } from "@/helpers/apiActions";
import { MenuItemCategoriesLinks, MenuLink } from "@/types/navbar";
import { cn } from "@/lib/utils";
import { DynamicNavbarSkeleton } from "./skeleton/NavbarSkeleton";
import { CartSidebar } from "./CartSidebar";
import { use, useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import BookingModal from "./book-a-meeting/book-model";
import { usePathname, useRouter } from "next/navigation";
import { useStore } from "@/store/store";
import { toast } from "sonner";
import { useShallow } from "zustand/react/shallow";
import { ProductListData } from "@/types/product";

function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<ProductListData[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  const { setProducts, productsList } = useStore(
    useShallow((state) => ({
      productsList: state.productsList,
      setProducts: state.setProducts,
    }))
  );

  // Filter products based on search query
  useEffect(() => {
    if (searchQuery.trim() && productsList.length > 0) {
      const filtered = productsList.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.Category.some(cat =>
          cat.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      ).slice(0, 8); // Limit to 8 suggestions
      setFilteredProducts(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [searchQuery, productsList]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      sessionStorage.setItem('searchQuery', searchQuery.trim());
      setShowSuggestions(false);

      if (pathname === '/product') {
        window.location.reload();
      } else {
        router.push('/product');
      }
    }
  };

  const handleSuggestionClick = (product: ProductListData) => {
    setSearchQuery(product.name);
    setShowSuggestions(false);
    router.push(`/product/${product.slug}`);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setShowSuggestions(false);
  };

  const {
    data: menuItems,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["menus"],
    queryFn: async () => {
      const response = await fetchNavbarMenus();
      return response;
    },
  });

  const {
    data: productData,
    isLoading: productLoading,
    error: productError,
  } = useQuery({
    queryKey: ["productListNavbar"],
    queryFn: () => fetchProductList(0, 1000),
  });

  const { user, clearUser } = useStore();
  const handleLogout = () => {
    clearUser();
    localStorage.removeItem("store");
    toast("logout successfully")
  };

  useEffect(
    () => {
      if (productData && productData.data.length > 0) {
        setProducts(productData.data);
      }
    }, [productData]
  )

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to get product price
  const getProductPrice = (product: ProductListData) => {
    if (product.Productprice && product.Productprice.length > 0) {
      const price = product.Productprice[0];
      return {
        original: price.p_mrp,
        discounted: price.p_price,
      };
    }
    return { original: 0, discounted: 0, discount: 0 };
  };

  return (
    <nav className="w-full">
      <div className="w-full md:px-20 bg-gray-100 flex justify-between">
        {/* ... rest of your top bar code remains the same ... */}
        <div className="items-center gap-3 md:flex hidden">
          <div className="text-xs text-gray-700 hover:text-red-500 transition-all">
            <Link href="#" className="flex items-center gap-1">
              <Info size={20} strokeWidth={1.5} />
              Free Standard Shipping
            </Link>
          </div>
          <div className="text-xs text-gray-700 hover:text-red-500 transition-all">
            <Link href="#" className="flex items-center gap-1">
              <MapPin size={20} strokeWidth={1.5} />
              100% Customized Hampers
            </Link>
          </div>
        </div>
        <div className="flex justify-center items-center md:hidden w-[30%]">
          <div className="marquee">
            <span className="marquee-inner">
              Free Standard Shipping | 100% Customized Hampers | 30-Day Return
              Policy | Secure Payments
            </span>
          </div>
        </div>
        <div className="flex items-center md:px-3 gap-6">
          <div className="w-[1px] h-1/2 bg-gray-200" />
          <div className="flex items-center">
            <ul className="hidden text-xs gap-6 lg:flex ">
              <li className="text-gray-700 hover:text-red-500 transition-all">
                <Link href="/product">Product</Link>
              </li>
              <li className="text-gray-700 hover:text-red-500 transition-all">
                <Link href="#">FAQ</Link>
              </li>
              <li className="text-gray-700 hover:text-red-500 transition-all">
                {user?.id ? (
                  <div className="flex items-center gap-2">
                    <span className="text-sm cursor-pointer">
                      <Link href="/profile">Hello, {user.first_name}</Link>
                    </span>
                    <button
                      onClick={handleLogout}
                      className="text-red-500 hover:underline text-sm"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link href="/signup">Sign in / Register</Link>
                )}
              </li>
            </ul>
            <div className="block lg:hidden">
              <DropDown />
            </div>
          </div>
          <Link href="#" className="bg-red-700 p-4 text-white text-sm">
            Contact
          </Link>
        </div>
      </div>

      <div className="w-full h-28 px-5 md:px-20 items-center justify-between flex">
        <Link href={"/"} className="hidden md:block">
          <Image src="/images/logo.webp" width={100} height={100} alt="logo" />
        </Link>

        {/* Search Bar with Suggestions */}
        <div ref={searchRef} className="relative flex px-2 items-center justify-center md:w-2/4 gap-2 bg-white rounded-md border-[3px] border-red-900">
          <form
            onSubmit={handleSearch}
            className="flex px-2 items-center justify-center w-full gap-2 bg-white rounded-md"
          >
            <div className="relative flex-1">
              <Input
                placeholder="Search products, brands, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery.trim() && setShowSuggestions(true)}
                style={{ outline: "none", boxShadow: "none", border: "none" }}
                className="pr-8"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={16} />
                </button>
              )}
            </div>
            <button
              type="submit"
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <Search className="text-gray-600" />
            </button>
          </form>

          {/* Product Suggestions Dropdown */}
          {showSuggestions && filteredProducts.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
              <div className="p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-semibold text-gray-700">
                    Product Suggestions ({filteredProducts.length})
                  </h3>
                  <span className="text-xs text-gray-500">
                    Press Enter to see all results
                  </span>
                </div>

                <div className="grid gap-3">
                  {filteredProducts.map((product) => {
                    return (
                      <div
                        key={product.id}
                        onClick={() => handleSuggestionClick(product)}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-all duration-200 border border-transparent hover:border-gray-200 group"
                      >
                        <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
                          {product.image ? (
                            <Image
                              src={product.image}
                              alt={product.name}
                              width={48}
                              height={48}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-200">
                              <span className="text-xs text-gray-500">No Image</span>
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 truncate group-hover:text-red-600 transition-colors">
                            {product.name}
                          </h4>
                          <p className="text-xs text-gray-500 truncate">
                            {product.brand} • {product.Category[0]?.title || 'Uncategorized'}
                          </p>
                        </div>

                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {filteredProducts.length === 8 && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <button
                      type="submit"
                      onClick={handleSearch}
                      className="w-full text-center text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
                    >
                      View all search results for "{searchQuery}"
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* No Results State */}
          {showSuggestions && searchQuery.trim() && filteredProducts.length === 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-50 p-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Search size={20} className="text-gray-400" />
                </div>
                <h3 className="text-sm font-medium text-gray-900 mb-1">
                  No products found
                </h3>
                <p className="text-xs text-gray-500 mb-3">
                  We couldn't find any products matching "{searchQuery}"
                </p>
                <button
                  onClick={handleSearch}
                  className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
                >
                  Search all products
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="gap-4 h-full items-center hidden lg:flex ">
          <a
            href="tel:+917838152753"
            className="flex items-center gap-2 hover:text-red-600 transition-all"
          >
            <Phone size={30} />
            <span className="flex flex-col">
              <small className="text-xs">Call Us Now:</small>
              <span className="font-bold"> (+91) 78 3815 2753</span>
            </span>
          </a>
          <div className="w-[1px] h-1/4 bg-gray-300" />
          <Link
            href="/wishlist"
            className="flex items-center gap-2 hover:text-red-600 transition-all"
          >
            <Heart />
            <div>
              <p className="text-xs">Gifting Ideas</p>
              <p className="font-bold text-sm leading-tight">Wishlist</p>
            </div>
          </Link>
          <CartSidebar />
        </div>
        <div className="block lg:hidden">
          <MobileNavbar />
        </div>
      </div>

      {/* ... rest of your navbar code remains the same ... */}
      <div className="w-full px-20 items-center justify-between hidden lg:flex">
        <NavigationMenu>
          <NavigationMenuList className="flex gap-10">
            <NavigationMenuItem>
              <Link href="/" className="font-bold">
                Home
              </Link>
            </NavigationMenuItem>

            {isLoading ? (
              <DynamicNavbarSkeleton />
            ) : (
              menuItems.data.map((item: MenuLink) => {
                if (
                  item.title === "Product" ||
                  item.title === "Special Category"
                ) {
                  const category =
                    item.title === "Product"
                      ? menuItems.ProductCategory
                      : menuItems.SpecialCategory;
                  return (
                    <NavigationMenuItem
                      className="underline-animation"
                      key={item.id}
                    >
                      <NavigationMenuTrigger className="font-bold">
                        {item.title == "Product" ? (
                          <Link href="/product">{item.title}</Link>
                        ) : (
                          item.title
                        )}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="h-fit w-fit p-6 flex gap-10">
                          <div
                            className={cn(
                              "text-small",
                              item.title === "Product"
                                ? "space-y-4 columns-4 gap-10 justify-between lg:min-h-[200px] lg:min-w-[900px]"
                                : "lg:min-w-[700px] grid grid-cols-2 space-y-2"
                            )}
                          >
                            {category.map((el: MenuItemCategoriesLinks) => {
                              if (el.children.length > 0) {
                                return (
                                  <div className="bg-white" key={el.id}>
                                    <p className="text-sm font-semibold">
                                      <Link href={`/category/${el.slug}`}>
                                        {el.title}
                                      </Link>
                                    </p>
                                    <div className="flex flex-col">
                                      {el.children.map(
                                        (child: MenuItemCategoriesLinks) => (
                                          <Link
                                            href={`/category/${child.slug}`}
                                            key={child.id}
                                            className="mt-1"
                                          >
                                            <p className="text-[12px] font-normal">
                                              {child.title}
                                            </p>
                                          </Link>
                                        )
                                      )}
                                    </div>
                                  </div>
                                );
                              }
                              return (
                                <Link
                                  href={`/category/${el.slug}`}
                                  key={el.slug}
                                >
                                  <p className="text-lg font-bold">
                                    {el.title}
                                  </p>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  );
                } else {
                  return (
                    <NavigationMenuItem key={item.id}>
                      <Link
                        className="flex justify-center items-center text-sm font-black underline-animation"
                        href={`/${item.alias}`}
                      >
                        {item.title}
                      </Link>
                    </NavigationMenuItem>
                  );
                }
              })
            )}
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex items-center gap-8 ml-4">
          <Link
            className="flex justify-center items-center text-sm font-black"
            href="/contact-us"
          >
            Quick Quotation
          </Link>
          <Button
            variant="destructive"
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
          >
            Book a Meeting
          </Button>

          <BookingModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;