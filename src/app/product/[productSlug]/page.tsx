"use client";
import { useState } from "react";
import {
  Star,
  ShoppingCart,
  Heart,
  ChevronLeft,
  ChevronRight,
  Phone,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { fetchProductDetail } from "@/helpers/apiActions";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { ProductDetailSkeleton } from "@/components/skeleton/ProductDetailSkeleton";
import type { BackendProduct } from "@/types/product";
import { BASE_URL } from "@/constant/data";
import { useStore } from "@/store/store";
import { Video } from "@/components/video";
import { useShallow } from "zustand/react/shallow";
import { QuantitySelector } from "@/components/QuantitySelector";

import ProductSpecification from "@/components/ProductSpecification";
import ReviewForm from "@/components/forms/ReviewForm";
import BulkInquiryTable from "@/components/BulkInquiryTable";
import { BulkEnquiryFormDialog } from "@/components/VideoModal";
import { toast } from "sonner";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = (params.productSlug as string) || "";
  const {
    data: productData,
    isLoading,
    error,
  } = useQuery<BackendProduct>({
    queryKey: ["productDetail", slug],
    queryFn: async () => {
      const response = await fetchProductDetail(slug);
      return response.data;
    },
  });
  const [isBulkInquiryOpen, setIsBulkInquiryOpen] = useState(false);

  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);

  const { addProduct, cartProducts } = useStore(
    useShallow((state) => ({
      addProduct: state.addProduct,
      cartProducts: state.products,
    }))
  );

  const { addToWishlist, removeFromWishlist, isInWishlist, wishlist } =
    useStore(
      useShallow((state) => ({
        addToWishlist: state.addToWishlist,
        removeFromWishlist: state.removeFromWishlist,
        isInWishlist: state.isInWishlist,
        wishlist: state.wishlist,
      }))
    );

  const user = useStore((state) => state.user);

  if (isLoading) return <ProductDetailSkeleton />;

  if (error || !productData)
    return (
      <div className="h-[300px] flex justify-center items-center">
        No product data available
      </div>
    );

  const images =
    productData.images.length > 0
      ? productData.images.map((img) => img.filename)
      : [productData.image];

  // const product = {
  //   id: productData.id,
  //   name: productData.name,
  //   image: productData.image,
  //   price: +productData.Productprice[productData.Productprice.length - 1].p_price,
  //   qty: 1,
  //   minQuantity: +productData.Productprice[productData.Productprice.length - 1].min_quantity,
  // };

  const sortedPriceList = [...productData.Productprice].sort(
    (a, b) => a.min_quantity - b.min_quantity
  );
  const baseTier = sortedPriceList[0]; // lowest quantity tier

  const product = {
    id: productData.id,
    name: productData.name,
    image: productData.image,
    price: +baseTier.p_price,
    qty: baseTier.min_quantity,
    minQuantity: baseTier.min_quantity,
    priceRange: sortedPriceList, // pass the whole range
  };

  const wishlistProduct = {
    id: productData.id,
    name: productData.name,
    image: productData.image,
    price: +productData.Productprice[0].p_price,
    slug: productData.slug,
    brand: productData.brand,
    category: productData.category,
  };

  const isProductInCart = () => {
    return cartProducts.some((item) => item.id === productData.id);
  };

  const inWishlist = isInWishlist(wishlistProduct.id);

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="aspect-square relative w-full max-h-[500px] flex items-center">
              <Image
                src={BASE_URL + images[currentImage] || "/placeholder.svg"}
                alt={`Product Image ${currentImage + 1}`}
                className="object-contain rounded-lg max-w-full w-full h-full"
                fill
              />
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {images.map((src, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`aspect-square relative ${
                    currentImage === index ? "ring-2 ring-white" : ""
                  }`}
                >
                  <Image
                    src={BASE_URL + src || "/placeholder.svg"}
                    alt={`Product thumbnail ${index + 1}`}
                    className="border-solid rounded-md w-full h-full object-cover border-2 border-gray-500"
                    width={150}
                    height={150}
                  />
                </button>
              ))}
            </div>
            {productData.video && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Product Video</h3>
                <Video src={productData.video} />
              </div>
            )}
          </div>
          <div className="space-y-6">
            <h1 className="text-3xl font-bold capitalize">
              {productData.name}
            </h1>
            <div className="flex items-center space-x-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
              <span className="text-sm text-gray-600">(128 reviews)</span>
            </div>

            {/* Todo Add Table Here */}
            <BulkInquiryTable productPrice={productData.Productprice} />

            <p className="text-xl font-bold">
              {productData.Productprice[0].p_price ? (
                <>
                  <span className="line-through text-gray-500">
                    ₹{productData.Productprice[0].p_mrp}
                  </span>
                  <span className="ml-2">
                    ₹{productData.Productprice[0].p_price}
                  </span>
                </>
              ) : (
                <span>₹{productData.Productprice[0].p_mrp}</span>
              )}
            </p>

            <p className="text-gray-600">{productData.introtext}</p>

            <div className="grid grid-rows-4 grid-cols-1 gap-2 text-2xl">
              {isProductInCart() ? (
                <QuantitySelector productId={String(product.id)} />
              ) : (
                <Button className="w-full" onClick={() => addProduct(product)}>
                  <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                </Button>
              )}
              <Button
                variant="outline"
                className="w-full"
                onClick={() =>
                  inWishlist
                    ? removeFromWishlist(wishlistProduct.id)
                    : addToWishlist(wishlistProduct)
                }
              >
                <Heart className="mr-2 h-4 w-4" />
                {inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
              </Button>

              <Button
                variant="secondary"
                className="w-full"
                onClick={() => setIsBulkInquiryOpen(true)}
              >
                <Phone className="mr-2 h-4 w-4" /> Enquire Now
              </Button>
              <Button
                variant="secondary"
                className="w-full bg-green-500 hover:bg-green-600 text-white"
              >
                <MessageCircle className="mr-2 h-4 w-4" /> Enquire on WhatsApp
              </Button>
            </div>

            {productData.delivery && (
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">Shipping Information</h3>
                  <p className="text-sm text-gray-600">
                    {productData.delivery}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        <div className="mt-12">
          <ProductSpecification productData={productData} />
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
          <div className="space-y-6">
            {[...Array(3)].map((_, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center mb-2">
                    <div className="flex mr-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < 4
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-semibold">John Doe</span>
                  </div>
                  <p className="text-gray-600">
                    This product is amazing! It&apos;s exactly what I needed and
                    the quality is outstanding.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Write a Review</h2>
          <ReviewForm />
        </div>
      </div>

      <BulkEnquiryFormDialog
        isBulkInquiryOpen={isBulkInquiryOpen}
        setIsBulkInquiryOpen={setIsBulkInquiryOpen}
      />
    </>
  );
}
