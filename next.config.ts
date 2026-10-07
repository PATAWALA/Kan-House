import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Unsplash
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },

      // Supabase Storage — ton projet
      {
        protocol: "https",
        hostname: "ztvsmpquqtqzkjmburdr.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "zctchbacqywysbkwrzde.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },

      // Fallback générique (au cas où)
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;