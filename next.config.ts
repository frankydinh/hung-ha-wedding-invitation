import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/wedding-invitation' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/wedding-invitation/' : '',
};

export default nextConfig;
