import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({
    // 包括哪些文件
    include: [/\.vue$/]
  }),],
  build: {
    outDir: "lib", //输出文件名称
    lib: {
      entry: path.resolve(__dirname, "./src/package/index.ts"), //指定组件编译入口文件
      name: "vue-d3-cloud",
      fileName: "vue-d3-cloud",
    }, //库编译模式配置
    rollupOptions: {
      external: ["vue"],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: "Vue",
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
