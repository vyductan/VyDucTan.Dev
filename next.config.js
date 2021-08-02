module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["platform-lookaside.fbsbx.com", "firebasestorage.googleapis.com"],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      // issuer: {
      //   test: /\.(js|ts)x?$/,
      // },
      use: ["@svgr/webpack"],
    });
    return config;
  },
};
