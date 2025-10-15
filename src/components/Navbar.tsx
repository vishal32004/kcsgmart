"use client";
import { Heart, Info, MapPin, Phone, Search } from "lucide-react";
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
import { fetchNavbarMenus } from "@/helpers/apiActions";
import { MenuItemCategoriesLinks, MenuLink } from "@/types/navbar";
import { cn } from "@/lib/utils";
import { DynamicNavbarSkeleton } from "./skeleton/NavbarSkeleton";
import { CartSidebar } from "./CartSidebar";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import BookingModal from "./book-a-meeting/book-model";

import { usePathname, useRouter } from "next/navigation";
import { useStore } from "@/store/store";
import { toast } from "sonner";



function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Store the search query in session storage
      sessionStorage.setItem('searchQuery', searchQuery.trim());
      
      // If we're already on the product page, we need to force a reload
      if (pathname === '/product') {
        window.location.reload();
      } else {
        // Otherwise navigate to the product page
        router.push('/product');
      }
    }
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

  const { user, clearUser } = useStore();
  // ... other code

  // Remove the local user state and useEffect



  // useEffect(() => {
  //   if (user) {
  //     console.log("User updated:", user);
  //   }
  // }, [user]);

   const handleLogout = () => {
    clearUser();
    localStorage.removeItem("user"); // Optional if using persist middleware
    toast("logout successfully")
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <nav className="w-full">
      <div className="w-full md:px-20 bg-gray-100 flex justify-between">
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
      <div className="w-full h-28 px-5 md:px-20  items-center justify-between flex">
        <Link href={"/"} className="hidden md:block">
          <Image src="/images/logo.webp" width={100} height={100} alt="logo" />
        </Link>

        <div className="flex px-2 items-center justify-center  md:w-2/4 gap-2 bg-white rounded-md border-[3px] border-red-900">
          <form 
          onSubmit={handleSearch}
          className="flex px-2 items-center justify-center w-full gap-2 bg-white rounded-md"
        >
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ outline: "none", boxShadow: "none", border: "none" }}
          />
          <button type="submit">
            <Search />
          </button>
        </form>
          {/* <Search /> */}
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
