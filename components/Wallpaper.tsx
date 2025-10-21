"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import mainWallpaper from "@/public/images/main-wallpaper.webp";
import loginWallpaper from "@/public/images/login-wallpaper.webp";

export default function Wallpaper() {
  const pathname = usePathname();

  const getWallpaper = () => {
    if (pathname.startsWith("/login")) return mainWallpaper.src;
    if (pathname.startsWith("/")) return loginWallpaper.src;
    return "/images/default-bg.jpg";
  };

  return <Image src={getWallpaper()} alt="" fill priority className="fixed top-0 left-0 w-full h-full object-cover -z-10" />;
}
