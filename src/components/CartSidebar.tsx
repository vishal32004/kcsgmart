import React from "react";
import { ShoppingCart, Trash, X } from "lucide-react";
import { useShallow } from "zustand/react/shallow";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "./ui/sheet";
import { useStore } from "@/store/store";
import Image from "next/image";
import { BASE_URL } from "@/constant/data";
import { QuantitySelector } from "./QuantitySelector";
import Link from "next/link";

export function CartSidebar() {
  const { reset, products, removeProduct, total } = useStore(
    useShallow((state) => ({
      reset: state.reset,
      products: state.products,
      removeProduct: state.removeProduct,
      total: state.total,
    }))
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-4 w-4" />
          <span className="sr-only">Open cart</span>
          {products.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {products.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col h-full">
        <SheetHeader className="flex-shrink-0">
          <SheetTitle className="flex justify-between">
            Your Cart
            <Trash
              className="bg-red-600 text-white w-7 h-7 rounded-md mr-9 p-1 cursor-pointer"
              onClick={reset}
            />
          </SheetTitle>
        </SheetHeader>
        <div className="flex-grow overflow-y-auto mt-4">
          {products.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <div className="flex flex-col gap-4">
              {products.map((product) => (
                <div key={product.id} className="flex items-center gap-4">
                  <Image
                    src={BASE_URL + product.image}
                    alt={product.name}
                    width={50}
                    height={50}
                    className="rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold capitalize">{product.name}</h3>
                    <p className="text-sm text-gray-500">₹{product.price}</p>
                    <div className="flex items-center gap-2">
                      <QuantitySelector
                        productId={product.id.toString()}
                        className="w-full"
                      />
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeProduct(product.id.toString())}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
        {products.length > 0 && (
          <div className="flex-shrink-0 pt-4 mt-auto border-t">
            <div className="flex justify-between mb-4">
              <span className="font-semibold">Total:</span>
              <span className="font-semibold">₹{total.toFixed(2)}</span>
            </div>
            <SheetClose asChild>
              <Button className="w-full">
                <Link href="/checkout">Checkout</Link>
              </Button>
            </SheetClose>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
