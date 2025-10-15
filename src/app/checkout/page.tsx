"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BASE_URL } from "@/constant/data";
import { useStore } from "@/store/store";
import { useShallow } from "zustand/react/shallow";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { fetchUserDetails } from "@/helpers/apiActions";
import { Loader2 } from "lucide-react";
import { RegisterData } from "@/types/Auth"; // Import your RegisterData interface

export default function CheckoutPage() {
  const { products } = useStore(
    useShallow((state) => ({
      products: state.products,
      total: state.total,
    }))
  );

  const {user} = useStore();

  const email = user?.email || '';

  // Fetch user details with proper typing
  const { data: userData, isLoading } = useQuery({
    queryKey: ["userDetails", email],
    queryFn: () => fetchUserDetails(email),
  });

  const addressInfo: Partial<RegisterData> = userData?.Registerdata || {};
  const companyInfo = {
    company_name: addressInfo.company_name,
    gst_no: addressInfo.gst_no,
    pan_no: addressInfo.pan_no
  };

  const subtotal = products.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = subtotal > 1000 ? 0 : 100;
  const total = subtotal + shipping;

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  // Helper function to format address lines
  const formatAddress = (addressData: Partial<RegisterData>, isShipping = false) => {
    const prefix = isShipping ? 'Shipping_' : '';
    return [
      addressData[`${prefix}Address` as keyof RegisterData],
      [
        addressData[`${prefix}City` as keyof RegisterData],
        addressData[`${prefix}State` as keyof RegisterData],
        addressData[`${prefix}PinCode` as keyof RegisterData]
      ].filter(Boolean).join(', '),
      addressData[`${prefix}Country` as keyof RegisterData],
      addressData[`${prefix}Landmark` as keyof RegisterData] && 
        `Landmark: ${addressData[`${prefix}Landmark` as keyof RegisterData]}`
    ].filter(Boolean).join('\n');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Column - Address Info + Cart Products */}
        <div className="lg:col-span-2 space-y-6">
          {/* Address Information */}
          <Card>
            <CardHeader>
              <CardTitle>Shipping & Billing Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium mb-2">Billing Address</h3>
                  <div className="text-sm whitespace-pre-line">
                    {formatAddress(addressInfo) || "Not provided"}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Shipping Address</h3>
                  <div className="text-sm whitespace-pre-line">
                    {addressInfo.Shipping_Address 
                      ? formatAddress(addressInfo, true)
                      : "Same as billing"}
                  </div>
                </div>
              </div>

              {/* Company Information */}
              {(companyInfo.company_name || companyInfo.gst_no || companyInfo.pan_no) && (
                <div className="pt-4 border-t mt-4">
                  <h3 className="font-medium mb-2">Company Details</h3>
                  <div className="text-sm space-y-1">
                    {companyInfo.company_name && (
                      <p>{companyInfo.company_name}</p>
                    )}
                    {companyInfo.gst_no && <p>GST: {companyInfo.gst_no}</p>}
                    {companyInfo.pan_no && <p>PAN: {companyInfo.pan_no}</p>}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Cart Products */}
          <Card>
            <CardHeader>
              <CardTitle>Your Order ({products.length})</CardTitle>
            </CardHeader>
            <CardContent className="divide-y">
              {products.map((item) => (
                <div key={item.id} className="flex items-center gap-4 py-4">
                  <div className="relative w-20 h-20">
                    <Image
                      src={`${BASE_URL}${item.image}`}
                      alt={item.name}
                      fill
                      className="rounded object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      ₹{item.price.toFixed(2)} × {item.qty}
                    </p>
                  </div>
                  <p className="font-medium">
                    ₹{(item.price * item.qty).toFixed(2)}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Checkout Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>

              <Button className="w-full mt-6" size="lg">
                Place Order
              </Button>
            </CardContent>
          </Card>

          {/* Payment Options */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <input 
                  type="radio" 
                  id="cod" 
                  name="payment" 
                  defaultChecked
                  className="h-4 w-4 border-primary text-primary focus:ring-primary" 
                />
                <label htmlFor="cod" className="text-sm font-medium">
                  Cash on Delivery
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input 
                  type="radio" 
                  id="online" 
                  name="payment" 
                  className="h-4 w-4 border-primary text-primary focus:ring-primary" 
                />
                <label htmlFor="online" className="text-sm font-medium">
                  Online Payment
                </label>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}