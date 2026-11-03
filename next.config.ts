import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Retired case studies go to the work index instead of a 404.
  async redirects() {
    return [
      { source: "/work/techwizard-solutions", destination: "/work", permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
