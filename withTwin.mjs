import path from "path";
import { fileURLToPath } from "url";
import babelPluginMacros from "babel-plugin-macros";
import babelPluginSyntaxTypescript from "@babel/plugin-syntax-typescript";

// The folders containing files importing twin.macro
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const includedDirs = [path.resolve(__dirname, "src")];

export default function withTwin(nextConfig) {
  return {
    ...nextConfig,
    webpack(config, options) {
      const { dev, isServer } = options;
      config.module = config.module || {};
      config.module.rules = config.module.rules || [];
      config.module.rules.push({
        test: /\.(tsx|ts)$/,
        include: includedDirs,
        use: [
          options.defaultLoaders.babel,
          {
            loader: "babel-loader",
            options: {
              sourceMaps: dev,
              plugins: [
                babelPluginMacros,
                [babelPluginSyntaxTypescript, { isTSX: true }],
              ],
            },
          },
        ],
      });

      if (!isServer) {
        config.resolve.fallback = {
          ...(config.resolve.fallback || {}),
          fs: false,
          module: false,
          path: false,
          os: false,
          crypto: false,
        };
      }

      if (typeof nextConfig.webpack === "function") {
        return nextConfig.webpack(config, options);
      } else {
        return config;
      }
    },
  };
}
