import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React Strict Mode for better debugging during development
  reactStrictMode: true,

  // SWC Minification for faster builds and smaller bundle sizes
  swcMinify: true,

  // Environment variable settings (optional, to verify values at runtime)
  env: {
    NEXT_PUBLIC_EMAILJS_TEMPLATE_ID:
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
    NEXT_PUBLIC_EMAILJS_SERVICE_ID: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
    NEXT_PUBLIC_EMAILJS_PUBLIC_KEY: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
    NEXT_PUBLIC_GITHUB_TOKEN: process.env.NEXT_PUBLIC_GITHUB_TOKEN,
  },

  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Example: Fixing dependencies that require node modules in client builds
      config.resolve.fallback = { fs: false, path: false };
    }
    return config;
  },

  output: "standalone",
};

export default nextConfig;
