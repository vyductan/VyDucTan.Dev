// Importing env files here to validate on build
import "./src/env.mjs";
import "@vyductan/auth/env.mjs";

import bundleAnalyzer from "@next/bundle-analyzer";
import withPlugins from "next-compose-plugins";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: true },
  rewrites: async () => {
    return [
      {
        source: "/api/cambridge/search/amp",
        destination: "https://dictionary.cambridge.org/vi/autocomplete/amp",
      },
    ];
  },
  experimental: {
    // TODO: add necessary packages
    optimizePackageImports: ["@vyductan/components"],
  },
  images: {
    domains: [],
  },
  /** Enables hot reloading for local packages without a build step */
  transpilePackages: [
    "@vyductan/components",
    "@vyductan/tailwind",
    "@vyductan/ui",
  ],
  typescript: { ignoreBuildErrors: true },
  // images: {
  //   domains: ['platform-lookaside.fbsbx.com', 'firebasestorage.googleapis.com'],
  // },
  // webpack(config) {
  //   config.module.rules.push({
  //     test: /\.svg$/,
  //     use: ['@svgr/webpack'],
  //   })
  //   return config
  // },
  // webpack: (config) => {
  //   config.module.rules.push({
  //     test: /index\.(js|mjs|jsx|ts|tsx)$/,
  //     include: (mPath) => mPath.includes("@vyductan/react/components"),
  //     sideEffects: false,
  //   });
  //   return config;
  // },
  // experimental: {
  //   serverActions: true,
  // },
};
export default withPlugins([withBundleAnalyzer], config);