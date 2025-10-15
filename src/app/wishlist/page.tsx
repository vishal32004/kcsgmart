"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Heart, ShoppingCart, Trash2, Package, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useShallow } from "zustand/react/shallow";

import { useStore } from "@/store/store";
import { QuantitySelector } from "@/components/QuantitySelector";
import { fetchProductDetail } from "@/helpers/apiActions";
import { useQueryClient } from "@tanstack/react-query";

const BASE_URL =
  process.env.NEXT_PUBLIC_IMAGE_URL || "https://www.kcsgmart.in/";

export default function WishlistPage() {
  const wishlist = useStore((state) => state.wishlist);
  const removeFromWishlist = useStore((state) => state.removeFromWishlist);
  const user = useStore((state) => state.user);
  const router = useRouter();

  const { addProduct, cartProducts } = useStore(
    useShallow((state) => ({
      addProduct: state.addProduct,
      cartProducts: state.products,
    }))
  );

  useEffect(() => {
    if (!user) {
      toast.error("Please login to access your wishlist");
      router.push("/login");
    }
  }, [user, router]);

  if (!user) return null;

  const handleRemoveFromWishlist = (productId: number) => {
    removeFromWishlist(productId);
    toast.success("Item removed from wishlist");
  };

  const handleViewProduct = (slug?: string) => {
    if (slug) router.push(`/product/${slug}`);
  };

  const handleAddToCart = async (slug?: string, productId?: number) => {
    if (!slug || !productId) return toast.error("Product slug or ID missing");

    try {
      const response = await fetchProductDetail(slug);
      const data = response?.data;

      if (!data || !data.Productprice || data.Productprice.length === 0) {
        return toast.error("Invalid product data");
      }

      const priceList = data.Productprice;

      // Sort ascending to find lowest quantity price
      const sorted = [...priceList].sort(
        (a, b) => a.min_quantity - b.min_quantity
      );
      const defaultRange = sorted[0];
      const defaultQty = defaultRange.min_quantity;

      // Get price based on default quantity
      const matched = [...sorted]
        .reverse()
        .find((range) => defaultQty >= range.min_quantity);

      const cartProduct = {
        id: data.id,
        name: data.name,
        image: data.image,
        qty: defaultQty,
        minQuantity: defaultQty,
        price: matched ? +matched.p_price : +defaultRange.p_price,
        priceRange: data.Productprice, // 👈 required for dynamic pricing later
      };

      addProduct(cartProduct);
      removeFromWishlist(productId);
      toast.success("Product added to cart");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add product to cart");
    }
  };

  const EmptyWishlist = () => (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <Heart className="w-12 h-12 text-gray-400" />
      </div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">
        Your wishlist is empty
      </h2>
      <p className="text-gray-600 text-center mb-8 max-w-md">
        Save items you&apos;re interested in to your wishlist. You can review
        them anytime and easily move them to your cart.
      </p>
      <Button
        onClick={() => router.push("/product")}
        className="flex items-center gap-2"
      >
        <Package className="w-4 h-4" />
        Browse Products
      </Button>
    </div>
  );

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="rounded-full"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Heart className="w-8 h-8 text-red-500" />
              My Wishlist
            </h1>
            <p className="text-muted-foreground">
              {wishlist.length > 0
                ? `${wishlist.length} item${
                    wishlist.length !== 1 ? "s" : ""
                  } saved for later`
                : "No items in your wishlist"}
            </p>
          </div>
        </div>

        {wishlist.length > 0 && (
          <Button variant="outline" onClick={() => router.push("/product")}>
            Continue Shopping
          </Button>
        )}
      </div>

      {wishlist.length === 0 ? (
        <EmptyWishlist />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlist.map((product) => {
              const isProductInCart = () =>
                cartProducts.some((item) => item.id === product.id);
              return (
                <Card
                  key={product.id}
                  className="group rounded-none flex flex-col"
                >
                  <CardHeader className="p-0">
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={BASE_URL + product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                      <Button
                        variant="secondary"
                        size="icon"
                        className="absolute top-2 right-2 bg-white/90 hover:bg-white shadow-sm"
                        onClick={() => handleRemoveFromWishlist(product.id)}
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </CardHeader>

                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <h3
                        className="font-semibold text-lg leading-tight cursor-pointer hover:text-gray-600 transition-colors"
                        onClick={() => handleViewProduct(product.slug)}
                      >
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-md text-gray-600">
                          Rs.{product.price.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="p-4 pt-0 flex-1 space-y-2 flex flex-col justify-end items-center">
                    {isProductInCart() ? (
                      <QuantitySelector productId={String(product.id)} />
                    ) : (
                      <Button
                        className="w-full"
                        onClick={() =>
                          handleAddToCart(product.slug, product.id)
                        }
                      >
                        <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      className="w-full bg-transparent"
                      onClick={() => handleViewProduct(product.slug)}
                    >
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" onClick={() => router.push("/product")}>
              Continue Shopping
            </Button>
            <Button
              onClick={async () => {
                await Promise.all(
                  wishlist.map((product) =>
                    handleAddToCart(product.slug, product.id)
                  )
                );
              }}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Move All to Cart
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
