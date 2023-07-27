import { createApp } from 'vue'
import App from '@/App.vue'
// 引入Element-Plus插件与样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 配置Element-Plus国际化 (@ts-ignore代表忽略TS类型检测)
// @ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// 引入Svg插件配置
import 'virtual:svg-icons-register'
// 引入自定义插件: 注册整个项目全局组件(用于全局使用SVG)
import gloalComponent from '@/components/index'
// 引入模板的全局样式
import '@/styles/index.scss'
// 引入路由器
import router from './router'

// 创建应用实例对象app
const app = createApp(App)

// 安装Element-Plus插件与国际化配置
app.use(ElementPlus, {
    locale: zhCn
})

// 安装自定义插件gloalComponent (用于全局使用SVG)
app.use(gloalComponent)

// 安装模板路由器
app.use(router)

// 挂载模板App
app.mount('#app')

// 引入封装SVG全局组件
// import SvgIcon from '@/components/SvgIcon/index.vue'
// app.component('SvgIcon', SvgIcon)

// 测试mock代码: 看假接口能否使用
// import axios from 'axios'
// axios({
//     url: '/api/user/login',
//     method: 'post',
//     data: {
//         username: 'admin',
//         password: '111111'
//     }
// })

// 测试代码
// const fn = () => {
//   console.log("测试没有格式化的代码")
// }
// fn()
