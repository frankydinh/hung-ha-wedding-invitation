import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  // Note: basePath/assetPrefix removed for Vercel deployment
  // The app now runs at root domain instead of subdirectory
};

export default nextConfig;
