import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/photos/**",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/oraciones/:path*",
        destination: "/devocionales/:path*",
        permanent: true,
      },
      {
        source: "/oraciones",
        destination: "/devocionales",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
