// vite.config.ts
import { defineConfig } from "file:///F:/%E7%A1%85%E8%B0%B7%E7%94%84%E9%80%89/node_modules/vite/dist/node/index.js";
import vue from "file:///F:/%E7%A1%85%E8%B0%B7%E7%94%84%E9%80%89/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import path from "path";
import { createSvgIconsPlugin } from "file:///F:/%E7%A1%85%E8%B0%B7%E7%94%84%E9%80%89/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import { viteMockServe } from "file:///F:/%E7%A1%85%E8%B0%B7%E7%94%84%E9%80%89/node_modules/vite-plugin-mock/dist/index.js";
var vite_config_default = defineConfig(({ command }) => {
  return {
    plugins: [
      vue(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
        symbolId: "icon-[dir]-[name]"
      }),
      viteMockServe({
        localEnabled: command === "serve"
        // 保证开发阶段可使用mock接口
      })
    ],
    resolve: {
      alias: {
        "@": path.resolve("./src")
        // 相对路径别名配置, 使用@代替src
      }
    },
    css: {
      // SCSS全局变量$配置
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";'
        }
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJGOlxcXFxcdTc4NDVcdThDMzdcdTc1MDRcdTkwMDlcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkY6XFxcXFx1Nzg0NVx1OEMzN1x1NzUwNFx1OTAwOVxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRjovJUU3JUExJTg1JUU4JUIwJUI3JUU3JTk0JTg0JUU5JTgwJTg5L3ZpdGUuY29uZmlnLnRzXCI7Ly8gXHU1RjE1XHU1MTY1bW9ja1x1OTE0RFx1N0Y2RVx1NjU4N1x1NEVGNlxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbi8vIFx1NUYxNVx1NTE2NVN2Z1x1OTcwMFx1NzUyOFx1NTIzMFx1NzY4NFx1NjNEMlx1NEVGNlxuaW1wb3J0IHsgY3JlYXRlU3ZnSWNvbnNQbHVnaW4gfSBmcm9tICd2aXRlLXBsdWdpbi1zdmctaWNvbnMnXG5pbXBvcnQgeyB2aXRlTW9ja1NlcnZlIH0gZnJvbSAndml0ZS1wbHVnaW4tbW9jaydcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IGNvbW1hbmQgfSkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIHBsdWdpbnM6IFtcbiAgICAgICAgICAgIHZ1ZSgpLFxuICAgICAgICAgICAgY3JlYXRlU3ZnSWNvbnNQbHVnaW4oe1xuICAgICAgICAgICAgICAgIGljb25EaXJzOiBbcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksICdzcmMvYXNzZXRzL2ljb25zJyldLFxuICAgICAgICAgICAgICAgIHN5bWJvbElkOiAnaWNvbi1bZGlyXS1bbmFtZV0nXG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgdml0ZU1vY2tTZXJ2ZSh7XG4gICAgICAgICAgICAgICAgbG9jYWxFbmFibGVkOiBjb21tYW5kID09PSAnc2VydmUnIC8vIFx1NEZERFx1OEJDMVx1NUYwMFx1NTNEMVx1OTYzNlx1NkJCNVx1NTNFRlx1NEY3Rlx1NzUyOG1vY2tcdTYzQTVcdTUzRTNcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgXSxcbiAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgIGFsaWFzOiB7XG4gICAgICAgICAgICAgICdAJzogcGF0aC5yZXNvbHZlKCcuL3NyYycpICAgICAgICAgIC8vIFx1NzZGOFx1NUJGOVx1OERFRlx1NUY4NFx1NTIyQlx1NTQwRFx1OTE0RFx1N0Y2RSwgXHU0RjdGXHU3NTI4QFx1NEVFM1x1NjZGRnNyY1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgY3NzOiB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gU0NTU1x1NTE2OFx1NUM0MFx1NTNEOFx1OTFDRiRcdTkxNERcdTdGNkVcbiAgICAgICAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XG4gICAgICAgICAgICBzY3NzOiB7XG4gICAgICAgICAgICAgIGphdmFzY3JpcHRFbmFibGVkOiB0cnVlLFxuICAgICAgICAgICAgICBhZGRpdGlvbmFsRGF0YTogJ0BpbXBvcnQgXCIuL3NyYy9zdHlsZXMvdmFyaWFibGUuc2Nzc1wiOydcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUNBLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUNoQixPQUFPLFVBQVU7QUFFakIsU0FBUyw0QkFBNEI7QUFDckMsU0FBUyxxQkFBcUI7QUFFOUIsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxRQUFRLE1BQU07QUFDekMsU0FBTztBQUFBLElBQ0gsU0FBUztBQUFBLE1BQ0wsSUFBSTtBQUFBLE1BQ0oscUJBQXFCO0FBQUEsUUFDakIsVUFBVSxDQUFDLEtBQUssUUFBUSxRQUFRLElBQUksR0FBRyxrQkFBa0IsQ0FBQztBQUFBLFFBQzFELFVBQVU7QUFBQSxNQUNaLENBQUM7QUFBQSxNQUNILGNBQWM7QUFBQSxRQUNWLGNBQWMsWUFBWTtBQUFBO0FBQUEsTUFDNUIsQ0FBQztBQUFBLElBQ1A7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxRQUNILEtBQUssS0FBSyxRQUFRLE9BQU87QUFBQTtBQUFBLE1BQzdCO0FBQUEsSUFDRjtBQUFBLElBQ0EsS0FBSztBQUFBO0FBQUEsTUFDSCxxQkFBcUI7QUFBQSxRQUNuQixNQUFNO0FBQUEsVUFDSixtQkFBbUI7QUFBQSxVQUNuQixnQkFBZ0I7QUFBQSxRQUNsQjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDSjtBQUNKLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
