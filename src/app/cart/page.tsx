"use client";
import { useState } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useShallow } from "zustand/react/shallow";
import { useStore } from "@/store/store";
import { QuantitySelector } from "@/components/QuantitySelector";
import { BASE_URL } from "@/constant/data";
import Link from "next/link";

export default function CartPage() {
  const { products, removeProduct, total } = useStore(
    useShallow((state) => ({
      products: state.products,
      removeProduct: state.removeProduct,
      total: state.total,
    }))
  );

  const subtotal = products.reduce((sum, item) => {
    if (item.price !== undefined && item.qty !== undefined) {
      return sum + item.price * item.qty;
    }
    return sum;
  }, 0);

  const shipping = subtotal > 0 ? (subtotal > 100 ? 0 : 10) : 0;

  const totalPrice = total > 0 ? shipping + total : 0;
  // const totalPrice =  shipping + total
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {products.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center gap-4 py-4 border-b"
            >
              <Image
                src={BASE_URL + item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded"
                height={500}
                width={500}
              />
              <div className="flex-grow">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600">₹{item?.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-2">
                <QuantitySelector productId={item.id.toString()} />
              </div>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => removeProduct(item.id.toString())}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
        <div className="lg:col-span-1">
          <div className="bg-gray-50 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}</span>
            </div>
            <Separator className="my-4" />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>
            <Button className="w-full mt-6">
              <Link href="/checkout">Proceed to Checkout</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
