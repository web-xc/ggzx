// 路由鉴权, 项目中路由的权限设置
import router from "@/router"
// 引入nprogress插件以及nprogress样式
import nprogress from "nprogress"
import "nprogress/nprogress.css"
// 引入用户相关的小仓库并获取内部token, 去判断用户是否登录成功
import pinia from "./store"
import useUserStore from "./store/modules/user"
import setting from "./setting"

// 获取用户相关的小仓库
const userStore = useUserStore(pinia)

// 全局守卫: 项目中任意路由切换都会触发的钩子函数
// to: 将访问的路由, from: 从哪个路由来, next: 放行路由
// 全局前置守卫
router.beforeEach(async (to: any, from: any, next: any) => {
// 动态显示网页title
    document.title = `${setting.title} - ${to.meta.title}`
    nprogress.start()
// 获取token, 并判断用户是否登录
    const token = userStore.token
// 获取用户信息
    const username = userStore.username
    if (token) {
// 登录成功后, 则不能访问login了, 若访问login则重定向到首页
        if (to.path == '/login') {
            next({path: '/'})
        } else {
// 登录成功访问其余6个路由(登录排除)
// 有用户信息则放行, 没有则在守卫里发送请求获取用户信息后再放行
            if (username) {
                next()
            } else {
                try {
                    await userStore.userInfo()
// 1.方法一: 刷新时是异步路由, 有可能获取到用户信息, 但异步路由没有加载完毕, 出现空白效果Bug(使用...to解决)
                    next({...to})
                } catch (error) {
// token过期或用户修改本地存储, 应清空token相关数据, 并携带当前query参数跳转至login
                    await userStore.userLogout()
                    next({path: '/login', query: {redirect: to.path}})
                }
            }
        }
    } else {
// 判断用户未登录, 若未登录可跳转login, 访问其余路由则重定向到login, 并携带当前路由query参数跳转
        if (to.path == '/login') {
            next()
        } else {
            next({path: '/login', query: {redirect: to.path}})
        }
    }
})

// 全局后置守卫
router.afterEach((to: any, from: any) => {
    nprogress.done()
})

// 第一个业务: 任意路由切换实现进度条加载: nprogress
// 第二个业务: 路由鉴权(路由组件访问权限设置)
// 1. 用户未登录: 可访问login, 其余6个路由不能访问 (指向login)
// 2. 用户已登录, 不可访问login(指向首页), 其余路由可以访问 