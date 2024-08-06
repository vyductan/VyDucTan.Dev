// vite.config.ts
import path from "path";
import react from "file:///Users/vyductan/Developer/VyDucTan.Dev/node_modules/@vitejs/plugin-react-swc/index.mjs";
import { internalIpV4 } from "file:///Users/vyductan/Developer/VyDucTan.Dev/node_modules/internal-ip/index.js";
import { defineConfig } from "file:///Users/vyductan/Developer/VyDucTan.Dev/node_modules/vite/dist/node/index.js";
var __vite_injected_original_dirname = "/Users/vyductan/Developer/VyDucTan.Dev/apps/tauri";
var mobile = !!/android|ios/.exec(process.env.TAURI_ENV_PLATFORM);
var vite_config_default = defineConfig(async () => ({
  plugins: [react()],
  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
    host: mobile ? "0.0.0.0" : false,
    hmr: mobile ? {
      protocol: "ws",
      host: await internalIpV4(),
      port: 1421
    } : void 0,
    watch: {
      // 3. tell vite to ignore watching `src-tauri`
      ignored: ["**/src-tauri/**"]
    }
  },
  // manual
  define: {
    "process.env": process.env
  },
  resolve: {
    alias: {
      "~": path.resolve(__vite_injected_original_dirname, "./src")
    }
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvdnlkdWN0YW4vRGV2ZWxvcGVyL1Z5RHVjVGFuLkRldi9hcHBzL3RhdXJpXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvdnlkdWN0YW4vRGV2ZWxvcGVyL1Z5RHVjVGFuLkRldi9hcHBzL3RhdXJpL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy92eWR1Y3Rhbi9EZXZlbG9wZXIvVnlEdWNUYW4uRGV2L2FwcHMvdGF1cmkvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2NcIjtcbmltcG9ydCB7IGludGVybmFsSXBWNCB9IGZyb20gXCJpbnRlcm5hbC1pcFwiO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcblxuLy8gQHRzLWV4cGVjdC1lcnJvciBwcm9jZXNzIGlzIGEgbm9kZWpzIGdsb2JhbFxuY29uc3QgbW9iaWxlID0gISEvYW5kcm9pZHxpb3MvLmV4ZWMocHJvY2Vzcy5lbnYuVEFVUklfRU5WX1BMQVRGT1JNKTtcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyhhc3luYyAoKSA9PiAoe1xuICBwbHVnaW5zOiBbcmVhY3QoKV0sXG5cbiAgLy8gVml0ZSBvcHRpb25zIHRhaWxvcmVkIGZvciBUYXVyaSBkZXZlbG9wbWVudCBhbmQgb25seSBhcHBsaWVkIGluIGB0YXVyaSBkZXZgIG9yIGB0YXVyaSBidWlsZGBcbiAgLy9cbiAgLy8gMS4gcHJldmVudCB2aXRlIGZyb20gb2JzY3VyaW5nIHJ1c3QgZXJyb3JzXG4gIGNsZWFyU2NyZWVuOiBmYWxzZSxcbiAgLy8gMi4gdGF1cmkgZXhwZWN0cyBhIGZpeGVkIHBvcnQsIGZhaWwgaWYgdGhhdCBwb3J0IGlzIG5vdCBhdmFpbGFibGVcbiAgc2VydmVyOiB7XG4gICAgcG9ydDogMTQyMCxcbiAgICBzdHJpY3RQb3J0OiB0cnVlLFxuICAgIGhvc3Q6IG1vYmlsZSA/IFwiMC4wLjAuMFwiIDogZmFsc2UsXG4gICAgaG1yOiBtb2JpbGVcbiAgICAgID8ge1xuICAgICAgICAgIHByb3RvY29sOiBcIndzXCIsXG4gICAgICAgICAgaG9zdDogYXdhaXQgaW50ZXJuYWxJcFY0KCksXG4gICAgICAgICAgcG9ydDogMTQyMSxcbiAgICAgICAgfVxuICAgICAgOiB1bmRlZmluZWQsXG4gICAgd2F0Y2g6IHtcbiAgICAgIC8vIDMuIHRlbGwgdml0ZSB0byBpZ25vcmUgd2F0Y2hpbmcgYHNyYy10YXVyaWBcbiAgICAgIGlnbm9yZWQ6IFtcIioqL3NyYy10YXVyaS8qKlwiXSxcbiAgICB9LFxuICB9LFxuXG4gIC8vIG1hbnVhbFxuICBkZWZpbmU6IHtcbiAgICBcInByb2Nlc3MuZW52XCI6IHByb2Nlc3MuZW52LFxuICB9LFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgIFwiflwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjXCIpLFxuICAgIH0sXG4gIH0sXG59KSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXFVLE9BQU8sVUFBVTtBQUN0VixPQUFPLFdBQVc7QUFDbEIsU0FBUyxvQkFBb0I7QUFDN0IsU0FBUyxvQkFBb0I7QUFIN0IsSUFBTSxtQ0FBbUM7QUFNekMsSUFBTSxTQUFTLENBQUMsQ0FBQyxjQUFjLEtBQUssUUFBUSxJQUFJLGtCQUFrQjtBQUdsRSxJQUFPLHNCQUFRLGFBQWEsYUFBYTtBQUFBLEVBQ3ZDLFNBQVMsQ0FBQyxNQUFNLENBQUM7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQUtqQixhQUFhO0FBQUE7QUFBQSxFQUViLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLFlBQVk7QUFBQSxJQUNaLE1BQU0sU0FBUyxZQUFZO0FBQUEsSUFDM0IsS0FBSyxTQUNEO0FBQUEsTUFDRSxVQUFVO0FBQUEsTUFDVixNQUFNLE1BQU0sYUFBYTtBQUFBLE1BQ3pCLE1BQU07QUFBQSxJQUNSLElBQ0E7QUFBQSxJQUNKLE9BQU87QUFBQTtBQUFBLE1BRUwsU0FBUyxDQUFDLGlCQUFpQjtBQUFBLElBQzdCO0FBQUEsRUFDRjtBQUFBO0FBQUEsRUFHQSxRQUFRO0FBQUEsSUFDTixlQUFlLFFBQVE7QUFBQSxFQUN6QjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLElBQ3RDO0FBQUEsRUFDRjtBQUNGLEVBQUU7IiwKICAibmFtZXMiOiBbXQp9Cg==
