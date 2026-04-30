import type { NextConfig } from "next";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { withPayload } from '@payloadcms/next/withPayload'

const projectRoot = dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: {
    root: projectRoot,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flagcdn.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
      },
    ],
  },
};

export default withPayload(nextConfig) 
