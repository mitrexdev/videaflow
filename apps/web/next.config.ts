import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Internal packages ship TS source — let Next transpile them.
  transpilePackages: ["@videaflow/api-client", "@videaflow/video-schema"],
};

export default nextConfig;
