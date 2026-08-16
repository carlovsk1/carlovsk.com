import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Product screenshots carry 10px UI text, which the default quality of 75 turns to mush.
    qualities: [75, 92],
  },
};

export default nextConfig;
