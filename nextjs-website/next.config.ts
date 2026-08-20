import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  output: isDev ? undefined : "export",
  distDir: isDev ? ".next" : "out",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
