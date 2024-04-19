import baseConfig from "@acme/eslint-config/base";
import reactConfig from "@acme/eslint-config/react";
import tailwindConfig from "@acme/eslint-config/tailwind";

/** @type {import('typescript-eslint').Config} */
export default [...baseConfig, ...reactConfig, ...tailwindConfig];
