import { ReactNode, useEffect, useState } from "react";
import { Button, ButtonProps } from "@heroui/button";
import { Divider } from "@heroui/divider";

import { title } from "@/components/utils/primitives.ts";

interface BannerItem {
  value: string;
  color: any;
}


interface BannerButtonProps extends ButtonProps {
  banners: BannerItem[];
  children: ReactNode;
  interval?: number;

  [key: string]: any;
}

const BannerButton = (
  {
    banners,
    children,
    interval = 2000,
    ...props
  }: BannerButtonProps
) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (banners.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, interval);

    return () => clearInterval(timer);
  }, [banners.length]);

  return (
    <Button
      className="flex flex-row justify-start align-middle"
      {...props}
    >
      {children}
      <Divider className="ml-0.5 h-3.5" orientation="vertical" />
      <div className="relative w-16 h-5">
        {banners.map((banner, index) => (
          <span
            key={index}
            className={`absolute top-0 left-0 ${title({
              color: banner.color,
              size: "xs"
            })} transition-opacity duration-500 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            {banner.value}
          </span>
        ))}
      </div>
    </Button>
  );
};

export default BannerButton;