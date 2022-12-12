import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { VantResolver } from "unplugin-vue-components/resolvers";
import postCssPxToRem from "postcss-pxtorem";
const path = require("path");

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    // 配置路径别名
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 8084,
    proxy: {
      "/logistical-march": {
        target: "http://172.21.32.153:8095/logistical-march", //万志成本地
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/logistical-march/, ""),
      },
    },
  },
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [
        // 全局less变量存储路径
        path.resolve(__dirname, "./src/assets/css/base.less"),
      ],
    },
  },
  //样式表插件
  css: {
    postcss: {
      plugins: [
        postCssPxToRem({
          rootValue: 37.5, // 1rem的大小
          propList: ["*"], // 需要转换的属性，这里选择全部都进行转换
        }),
      ],
    },
  },
});
