import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      // Ajoute ici tes futurs domaines (Cloudinary, Sanity, S3, etc.)
      // {
      //   protocol: "https",
      //   hostname: "cdn.sanity.io",
      // },
    ],
  },
};

export default nextConfig;