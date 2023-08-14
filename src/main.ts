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
// 引入自定义插件: 注册整个项目全局组件(用于全局使用SVG、全局组件、全局图标...)
import gloalComponent from '@/components/index'
// 引入模板的全局样式
import '@/styles/index.scss'
// 引入路由器
import router from './router'
// 引入Pinia仓库
import pinia from './store/index'
// 引入路由鉴权
import './permisstion'
// 引入暗黑模式需要的样式
import 'element-plus/theme-chalk/dark/css-vars.css'
// 引入自定义指令文件
import { isHasButton } from '@/directive/has'

// 创建应用实例对象app
const app = createApp(App)

// 安装Element-Plus插件与国际化配置
app.use(ElementPlus, {
    locale: zhCn
})

// 安装自定义插件gloalComponent (用于全局使用SVG、全局组件、全局图标...)
app.use(gloalComponent)

// 安装模板路由器
app.use(router)

// 安装Pinia仓库
app.use(pinia)

// 挂载模板App
app.mount('#app')

// 调用自定义指令方法, 将app传递过去
isHasButton(app)

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