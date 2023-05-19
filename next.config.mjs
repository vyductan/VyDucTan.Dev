import bundleAnalyzer from '@next/bundle-analyzer'
import withPlugins from 'next-compose-plugins'

import withTwin from './withTwin.mjs'

// import withTwin from './withTwin.mjs'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
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
  experimental: {
    serverActions: true,
  },
}
export default withPlugins([withBundleAnalyzer, withTwin], config)
