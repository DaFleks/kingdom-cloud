import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL("https://images.igdb.com/igdb/image/upload/t_cover_big/**"), new URL("https://ik.imagekit.io/f3yl3upyd/**")],
  },
};

export default nextConfig;
