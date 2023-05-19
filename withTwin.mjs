import babelPluginSyntaxTypescript from '@babel/plugin-syntax-typescript'
import babelPluginMacros from 'babel-plugin-macros'
import path from 'path'
import { fileURLToPath } from 'url'

// The folders containing files importing twin.macro
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const includedDirs = [
  path.resolve(__dirname, 'src'),
  path.resolve(__dirname, '@vyductan/react'),
]

export default function withTwin(nextConfig) {
  return {
    ...nextConfig,
    webpack(config, options) {
      const { dev, isServer } = options

      config.module = config.module || {}
      config.module.rules = config.module.rules || []

      const patchedDefaultLoaders = options.defaultLoaders.babel
      patchedDefaultLoaders.options.hasServerComponents = false
      // TODO(igm): can't use react refresh
      patchedDefaultLoaders.options.hasReactRefresh = false

      config.module.rules.push({
        test: /\.(tsx|ts)$/,
        include: includedDirs,
        use: [
          patchedDefaultLoaders,
          {
            loader: 'babel-loader',
            options: {
              sourceMaps: dev,
              plugins: [
                babelPluginMacros,
                [babelPluginSyntaxTypescript, { isTSX: true }],
              ],
            },
          },
        ],
      })

      if (!isServer) {
        config.resolve.fallback = {
          ...(config.resolve.fallback || {}),
          fs: false,
          module: false,
          path: false,
          os: false,
          crypto: false,
        }
      }

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      } else {
        return config
      }
    },
  }
}
// export default function withTwin(nextConfig) {
//   return {
//     ...nextConfig,
//     webpack(config, options) {
//       const { dev, isServer } = options
//       config.module = config.module || {}
//       config.module.rules = config.module.rules || []
//       config.module.rules.push({
//         test: /\.(tsx|ts)$/,
//         include: includedDirs,
//         use: [
//           options.defaultLoaders.babel,
//           {
//             loader: 'babel-loader',
//             options: {
//               sourceMaps: dev,
//               plugins: [
//                 babelPluginMacros,
//                 [babelPluginSyntaxTypescript, { isTSX: true }],
//               ],
//             },
//           },
//         ],
//       })
//
//       if (!isServer) {
//         config.resolve.fallback = {
//           ...(config.resolve.fallback || {}),
//           fs: false,
//           module: false,
//           path: false,
//           os: false,
//           crypto: false,
//         }
//       }
//
//       if (typeof nextConfig.webpack === 'function') {
//         return nextConfig.webpack(config, options)
//       } else {
//         return config
//       }
//     },
//   }
// }
