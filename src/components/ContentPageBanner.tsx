import { banners } from "@/constant/imports";
import Image from "next/image";

interface BannerProps {
  imageUrl?: string;
  title: string;
  height?: string;
}

export default function Banner({
  imageUrl,
  title,
  height = "h-64",
}: BannerProps) {
  return (
    <div className={`relative w-full ${height} mt-6 overflow-hidden`}>
      <Image
        src={imageUrl || banners.whyUsPage}
        alt="Banner background"
        fill
        style={{ objectFit: "cover" }}
        priority
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <h1 className="text-white text-4xl md:text-5xl font-bold text-center px-4">
          {title}
        </h1>
      </div>
    </div>
  );
}
