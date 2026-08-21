import type { NextConfig } from "next";
import path from "node:path";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  output: isDev ? undefined : "export",
  distDir: isDev ? ".next" : "out",
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ["localhost", "127.0.0.1"],
};

export default nextConfig;
