import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import postCssPxToRem from "postcss-pxtorem"
const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        // 全局less变量存储路径
        path.resolve(__dirname, './src/assets/css/base.less'),
      ]
    }
  },
   //样式表插件
   css: {
    postcss: {
      plugins: [
        postCssPxToRem({
          rootValue: 37.5, // 1rem的大小
          propList: ['*'], // 需要转换的属性，这里选择全部都进行转换
        })
      ]
    }
  }
})
