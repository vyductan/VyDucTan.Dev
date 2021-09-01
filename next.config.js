const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value:
      "default-src 'none'; style-src 'self' 'unsafe-inline'; script-src 'self' connect-src vitals.vercel-insights.com; img-src 'self' data:",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
];

const config = {
  reactStrictMode: true,
  images: {
    domains: ["platform-lookaside.fbsbx.com", "firebasestorage.googleapis.com"],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};
module.exports = withBundleAnalyzer(config);
