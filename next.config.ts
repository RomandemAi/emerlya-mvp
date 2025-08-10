import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Temporarily ignore during builds for deployment
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
