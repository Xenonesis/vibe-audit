import type { NextConfig } from "next";
import path from "node:path";

const isDev = process.env.NODE_ENV === "development";
const isGitHubPages = process.env.GITHUB_PAGES === "true" || !isDev;
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || (isGitHubPages ? "/vibe-audit" : "");

const nextConfig: NextConfig = {
  output: isDev ? undefined : "export",
  distDir: isDev ? ".next" : "out",
  basePath: basePath || undefined,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ["localhost", "127.0.0.1"],
};

export default nextConfig;
