import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { truncateText } from "@/helpers/normalHelperFunction";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type ProductCardProps = {
  src: string;
  price: number | null;
  name: string;
  category: string;
  href: string;
  mrpPrice: number | null;
};

export default function ProductCard({
  src,
  price,
  name,
  category,
  href,
  mrpPrice,
}: ProductCardProps) {
  return (
    <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out productCard relative h-full">
      <CardContent className="p-0">
        <div className="relative aspect-square border-2 rounded-t-2xl overflow-hidden">
          <Image
            src={src}
            alt={name}
            fill
            className="w-full h-full object-cover transition-transform duration-300 ease-in-out"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out flex items-center justify-center gap-4">
            <Button className="bg-white text-black hover:bg-white/90">
              <Link href={href}>View Details</Link>
            </Button>
            {/* <Button className="bg-white text-black hover:bg-white/90">
              Add to Cart
            </Button> */}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start justify-between p-3 bg-white">
        {/* <span className="text-sm text-[#888] uppercase font-semibold tracking-wide">
          {category}
        </span> */}
        <div className="overflow-hidden mb-3">
          <p className="text-lg font-medium text-[#333] line-clamp-2">
            {truncateText(name, 7)}
          </p>
        </div>

        {mrpPrice && (
          <p className="mt-1 text-sm text-[#888] line-through">₹{mrpPrice}</p>
        )}

        <p className="mt-1 text-xl font-bold text-[#222]">
          {price ? `₹${price}` : "Price not available"}
        </p>
      </CardFooter>
    </Card>
  );
}
