import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import { useShallow } from "zustand/react/shallow";
import { useStore } from "@/store/store";

interface QuantitySelectorProps {
  productId: string;
  className?: string;
}

export function QuantitySelector({ productId }: QuantitySelectorProps) {
  const { getProductById, decQty, incQty, setTotal } = useStore(
    useShallow((state) => ({
      getProductById: state.getProductById,
      decQty: state.decQty,
      incQty: state.incQty,
      setTotal: state.setTotal,
    }))
  );
  const product = getProductById(productId);
  console.log(product);
  useEffect(() => {
    const unSub = useStore.subscribe(
      (state) => state.products,
      (products) => {
        setTotal(
          products.reduce((acc, item) => {
            // Check if item.price and item.qty are defined
            if (item.price !== undefined && item.qty !== undefined) {
              // const index = item.priceRange.findIndex(
              //   (el) => el.min_quantity <= item.qty
              // );

              // if (index !== -1) {
              //   const price = Number(item.priceRange[index].p_price);
              //   return acc + price * item.qty;
              // }
              return acc + item.price * item.qty;
            }
            return acc; // Return the accumulator if price or qty is undefined
          }, 0)
        );
      },
      { fireImmediately: true }
    );
    return unSub;
  }, [setTotal]);

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => decQty(productId)}
        aria-label="Decrease quantity"
      >
        <Minus className="h-4 w-4" />
      </Button>
      <p>{product?.qty}</p>
      <Button
        variant="outline"
        size="icon"
        onClick={() => incQty(productId)}
        aria-label="Increase quantity"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}
