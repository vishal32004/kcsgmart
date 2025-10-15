"use client";
import { Suspense, lazy } from "react";
import Image from "next/image";
import Link from "next/link";
import { MoveRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { mostTrustedItems } from "@/constant/Items";
import { Slider } from "@/components/Slider";
import { useQuery } from "@tanstack/react-query";
import { mapBackendProductsToProducts } from "@/helpers/mapBackendProductToProduct";
import { SliderSkeleton } from "@/components/skeleton/SliderSkeleton";
import {
  fetchBlog,
  fetchBrands,
  fetchHomeProducts,
} from "@/helpers/apiActions";
import { Brands } from "@/types/brands";
const VideoModal = lazy(() => import("@/components/VideoModal"));

export default function Home() {
  return (
    <main className="flex flex-col gap-20 mt-5">
      <TrustedCompanyBanner />
      <ImageGrid />
      <ProductSection title="New Arrivals" type="New" />
      <ProductSection title="Featured Products" type="Featured" />
      <ProductSection title="BestSeller" type="BestSeller" />
      <PromoSection />
      <VideoSection />
      <CorporateGiftingSection />
      <BlogSection />
      <BrandsSection />
      <DrinkwareSection />
      {/*} <TShirtSection />*/}
    </main>
  );
}

function TrustedCompanyBanner() {
  return (
    <div className="bg-[#444444] container rounded-[5px] w-[88.5%]">
      <h2 className="text-sm text-center font-extrabold text-white my-2">
        Most Trusted Corporate Gifting Company in India
      </h2>
      <div className="flex justify-between items-center overflow-x-auto gap-5 lg:gap-1 max-w-full most-trusted py-5">
        {mostTrustedItems.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            {item.icon}
            <p className="text-white text-sm mt-1">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ImageGrid() {
  return (
    <section className="container">
      <div className="parent">
        <div className="div1">
          <Slider
            type="banner"
            items={[
              "/images/KCS/Home-Banner/home-banner-0.jpg",
              "/images/KCS/Home-Banner/home-banner-1-3.jpg",
              "/images/KCS/Home-Banner/home-banner-2.jpg",
            ]}
          />
        </div>
        <div className="div2">
          <Image
            src="/images/KCS/cat/Diwali-Gift-Hampers.jpg"
            alt="grid-images"
            height={750}
            width={750}
          />
        </div>
        <div className="div3">
          <Image
            src="/images/KCS/cat/MFI-Cross-Selling.jpg"
            alt="grid-images"
            height={750}
            width={750}
          />
        </div>
        <div className="div4">
          <Image
            src="/images/KCS/cat/NGO-CSR-Requirement.jpg"
            alt="grid-images"
            height={750}
            width={750}
          />
        </div>
        <div className="div5">
          <Image
            src="/images/KCS/cat/Pharma-gifting-&-promotion.jpg"
            alt="grid-images"
            height={750}
            width={750}
          />
        </div>
        <div className="div6">
          <Image
            src="/images/KCS/cat/Trade-Schemes.jpg"
            alt="grid-images"
            height={750}
            width={750}
            style={{ maxWidth: "100% !important" }}
          />
        </div>
        <div className="div7">
          <Image
            src="/images/KCS/cat/Gourmet-Range.jpg"
            alt="grid-images"
            height={750}
            width={750}
          />
        </div>
        <div className="div8">
          <Image
            src="/images/KCS/cat/Corporate-Gifting.jpg"
            alt="grid-images"
            height={750}
            width={750}
          />
        </div>
      </div>
    </section>
  );
}
function ProductSection({ title, type }: { title: string; type: string }) {
  const { data, isLoading, error } = useQuery({
    queryKey: [`homePageProduct${type}`],
    queryFn: async () => {
      const response = await fetchHomeProducts(type);
      return response.data;
    },
  });
  if (isLoading || error) {
    return (
      <section className="container">
        <div className="flex flex-col gap-5">
          <div className="flex justify-between items-center border-b border-[#f3f3f3] pb-3">
            <h2 className="text-3xl font-bold">{title}</h2>
            <Link
              href="#"
              className="flex items-center uppercase text-sm font-bold gap-5"
            >
              <span> View More</span>
              <MoveRight className="ml-1" />
            </Link>
          </div>
          <SliderSkeleton type="product" itemCount={5} />
        </div>
      </section>
    );
  }
  const items = mapBackendProductsToProducts(data);

  return (
    <section className="container">
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center border-b border-[#f3f3f3] pb-3">
          <h2 className="text-3xl font-bold">{title}</h2>
          <Link
            href="#"
            className="flex items-center uppercase text-sm font-bold gap-1"
          >
            View More <MoveRight className="ml-1" />
          </Link>
        </div>
        <Slider type="product" items={items} />
      </div>
    </section>
  );
}

function PromoSection() {
  const promoItems = [
    {
      src: "/images/Featured-cat/Bags.jpg",
      alt: "Bags",
      link: "Bags",
      href: "/category/bags",
      linkClass:
        "absolute bottom-5 bg-white px-2 py-3 text-center w-3/4 hover:bg-red-700 hover:text-white left-1/2 transform -translate-x-1/2",
    },

    {
      src: "/images/Featured-cat/Apparels.jpg",
      alt: "Apparels",
      link: "Apparels",
      href: "/category/apparels",
      linkClass:
        "absolute bottom-5 bg-white px-2 py-3 text-center left-1/2 transform -translate-x-1/2 w-3/4 hover:bg-red-600 hover:text-white",
    },

    {
      src: "/images/Featured-cat/Electronics-&-appliances.jpg",
      alt: "Electronics-&-appliances",
      link: "Electronics & appliances",
      href: "/category/electronics-appliances",
      linkClass:
        "absolute bottom-5 bg-white px-2 py-3 text-center left-1/2 transform -translate-x-1/2 w-3/4 hover:bg-red-600 hover:text-white",
    },

    {
      src: "/images/Featured-cat/Kitchenware-&-utensils.jpg",
      alt: "Kitchenware-&-utensils",
      link: "Kitchenware & utensilss",
      href: "/category/antiskid-suction-bottles",
      linkClass:
        "absolute bottom-5 bg-white px-2 py-3 text-center left-1/2 transform -translate-x-1/2 w-3/4 hover:bg-red-600 hover:text-white",
    },

    {
      src: "/images/Featured-cat/Mobile-&-Laptop-Accessories.jpg",
      alt: "Mobile-&-Laptop-Accessories",
      link: "Mobile & Laptop Accessories",
      href: "/category/mobile-laptop-accessories",
      linkClass:
        "absolute bottom-5 bg-white px-2 py-3 text-center left-1/2 transform -translate-x-1/2 w-3/4 hover:bg-red-600 hover:text-white",
    },
    {
      src: "/images/Featured-cat/Stationary.jpg",
      alt: "Stationary",
      link: "Stationary",
      href: "/category/stationary",
      linkClass:
        "absolute bottom-5 bg-white px-2 py-3 text-center left-1/2 transform -translate-x-1/2 w-3/4 hover:bg-red-600 hover:text-white",
    },
  ];

  return (
    <section className="container">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {promoItems.map((item, index) => (
          <div key={index} className="relative">
            <Image src={item.src} alt={item.alt} width={500} height={500} />
            {item.link && (
              <Link href={item.href} className={item.linkClass}>
                {item.link}
              </Link>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function VideoSection() {
  return (
    <section className="relative lg:h-auto h-[350px]">
      <Image
        src="/images/video.jpeg"
        alt="home-video"
        height={500}
        width={1500}
        className="w-full object-cover h-full lg:h-auto"
      />
      <Suspense fallback={<div></div>}>
        <VideoModal />
      </Suspense>
    </section>
  );
}

function CorporateGiftingSection() {
  return (
    <section className="container">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-4">
            Corporate Gifting Company | Pan India Delivery
          </h2>
          <p className="text-gray-600 mb-4">
            Who doesn&apos;t like a nice, meaningful gift? We all love it when
            we receive a little surprise packed with beautiful wrapping paper.
            The excitement of opening the pack and discovering what&apos;s
            inside is an experience we all enjoy. However, we never want to feel
            disappointed seeing a gift that makes no sense or adds nothing to
            our lives.
          </p>
          <Link href="/product">
            <Button
              variant="link"
              className="text-black font-bold text-sm uppercase p-0"
            >
              Visit Products <MoveRight className="ml-1" />
            </Button>
          </Link>
        </div>
        <div className="flex-1 flex justify-center">
          <Image
            src="/images/PAN-India.jpg"
            alt="Corporate Gifting"
            width={400}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}

function BlogSection() {
  const {
    data: blogData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const response = await fetchBlog();
      if (response) return response.Latest_Blogs;
    },
  });
  return (
    <section className="container">
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center border-b border-[#f3f3f3] pb-3">
          <h2 className="text-3xl font-bold">Latest Blogs</h2>
          <Link
            href="/blog"
            className="flex items-center uppercase text-sm font-bold"
          >
            View More <MoveRight className="ml-1" />
          </Link>
        </div>

        {isLoading || !blogData ? (
          <SliderSkeleton type="product" itemCount={5} />
        ) : (
          <Slider slideToShow={3} items={blogData} type="blog" />
        )}
      </div>
    </section>
  );
}

function BrandsSection() {
  const {
    data: brands,
    isLoading,
    error,
  } = useQuery<Brands[]>({
    queryKey: ["homePageBrands"],
    queryFn: async () => {
      const response = await fetchBrands(0, 10);
      return response.data;
    },
  });
  return (
    <section className="container">
      <h3 className="font-semibold text-3xl text-center mb-6">
        Popular Brands for Gifting
      </h3>
      {isLoading || error || !brands ? (
        <SliderSkeleton type="brand" itemCount={6} slideToShow={6} />
      ) : (
        <Slider
          type="brands"
          items={brands.map((brand) => ({
            ...brand,
            link: `/product?brand=${brand.id}`, // 👈 Pass brand ID as a query param
          }))}
          slideToShow={6}
        />
      )}
    </section>
  );
}

function DrinkwareSection() {
  return (
    <section className="container flex items-center justify-center relative lg:h-auto h-[350px]">
      <Image
        src="/images/apprals.jpeg"
        alt="drinkwares"
        width={1500}
        className="w-full h-full lg:h-auto object-cover"
        height={500}
      />
      <div className="text-white uppercase grid place-items-center absolute gap-4">
        <p className=" font-light text-[1.3rem]">Best Price & High Quality</p>
        <h3 className=" font-bold text-center text-[1rem] sm:text-[1.4rem] md:text-[2rem] lg:text-[2.3rem]">
          Drinkwares for Corporate Gifts
        </h3>
        <a
          href="#"
          className="flex gap-2 items-center font-bold text-[15px] px-6 py-3 bg-[#C31C18] rounded-[5px] hover:bg-[#42a2ff]"
        >
          SHOP NOW <MoveRight />
        </a>
      </div>
    </section>
  );
}

// function TShirtSection() {
//   const categories = ["T-shirt", "Bag", "Gadget Gifts", "Gift Set"];

//   // Filter the products based on the category and show only 3 items per column
//   const getFilteredProducts = (category: string) =>
//     tshirtProduct
//       .filter((product) => product.category.includes(category))
//       .slice(0, 3);

//   return (
//     <section className="container">
//       <div className="lg:px-20 flex flex-wrap lg:flex-nowrap gap-8">
//         {categories.map((category, index) => (
//           <div key={index} className="w-full md:w-1/2 lg:w-1/4 space-y-4">
//             <h3 className="text-lg font-black">{category}</h3>
//             <div className="w-full h-px bg-gray-400" />
//             <div className="space-y-4">
//               {getFilteredProducts(category).map((tshirt, tIndex) => (
//                 <Suspense key={tIndex} fallback={<div>Loading...</div>}>
//                   <Product
//                     imgSrc={tshirt.imgSrc}
//                     price={tshirt.price}
//                     oldPrice={tshirt.oldPrice}
//                     title={tshirt.title}
//                   />
//                 </Suspense>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }
