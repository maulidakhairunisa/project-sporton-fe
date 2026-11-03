import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "be-sporton.agunacourse.com",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "project-sporton-be.vercel.app",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "5001",
        pathname: "/uploads/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/category",
        destination: "/#category-section",
        permanent: false,
      },
      {
        source: "/categories",
        destination: "/#category-section",
        permanent: false,
      },
      {
        source: "/products",
        destination: "/#products-section",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
