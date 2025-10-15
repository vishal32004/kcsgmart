import Image from "next/image";
import React from "react";

function Product({
  price,
  oldPrice,
  imgSrc,
  title,
}: {
  imgSrc: string;
  price: number;
  oldPrice?: number;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <Image
        src={imgSrc}
        alt="product"
        height={500}
        width={750}
        className="w-full max-w-[100px] max-h-[114px]"
      />
      <div className="space-y-2">
        <p className="text-sm">{title}</p>
        <div className="flex text-sm font-extrabold gap-4">
          <p className="font-extrabold">Rs. {price}</p>
          {oldPrice && (
            <p className="text-gray-500 line-through">Rs. {oldPrice}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Product;
