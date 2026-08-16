import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  basePath,
  distDir: process.env.NEXT_DIST_DIR ?? ".next",
  output: "export",
  reactStrictMode: true,
  trailingSlash: true,
};

export default nextConfig;
