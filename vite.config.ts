// 引入mock配置文件
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// 引入Svg需用到的插件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { viteMockServe } from 'vite-plugin-mock'

export default defineConfig(({ command }) => {
    return {
        plugins: [
            vue(),
            createSvgIconsPlugin({
                iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
                symbolId: 'icon-[dir]-[name]'
              }),
            viteMockServe({
                localEnabled: command === 'serve' // 保证开发阶段可使用mock接口
              })
        ],
        resolve: {
          alias: {
              '@': path.resolve('./src')          // 相对路径别名配置, 使用@代替src
          }
        },
        css: {                                    // SCSS全局变量$配置
          preprocessorOptions: {
            scss: {
              javascriptEnabled: true,
              additionalData: '@import "./src/styles/variable.scss";'
            }
          }
        }
    }
})
