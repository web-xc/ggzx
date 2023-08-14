// 创建用户相关的小仓库
import { defineStore } from 'pinia'
// 引入项目管理接口
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user'
// 引入数据类型
import type { loginFormData, loginResponseData, userInfoResponseData } from "@/api/user/type"
// 引入小仓库数据类型
import type { UserState } from './types/type'
// 引入操作本地存储的工具方法
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
// 引入路由器
import router from '@/router'
// 引入路由(常量路由器、异步路由、任意路由做权限判断)
import { constantRoute, asyncRoute, anyRoute } from '@/router/routes'
// 引入lodash库(使用深拷贝方法解决异步路由Bug)
import cloneDeep from 'lodash/cloneDeep'

// 1.定义过滤异步路由的函数(用于权限判断)
function filterAsyncRoute(asyncRoute: any, routes: any) {
    return asyncRoute.filter((item: any) => {
        if (routes.includes(item.name)) {
            if (item.children && item.children.length > 0) {
                item.children = filterAsyncRoute(item.children, routes)
            }
            return true
        }
    })
}

const useUserStore = defineStore('User', {
// 小仓库存储数据的地方
    state: (): UserState => {
        return {
            token: GET_TOKEN(), // 用户唯一标识
            menuRoutes: constantRoute, // 仓库存储生成菜单需要的数组(路由)
            username: '',
            avatar: '',
            buttons: [] // 存储用户是否包含某一个按钮权限
        }
    },
// 异步|逻辑的地方
    actions: {
// 用户登录的方法
        async userLogin(data: loginFormData) {
            const result: loginResponseData = await reqLogin(data)
            console.log(result)
// 请求成功: 200 => Token 请求失败: 201 登录失败错误信息
            if (result.code == 200) {
// 请求成功: 则Pinia仓库存储一下Token
                this.token = (result.data as string)
// Pinia/Vuex存储数据是利用的JS对象, 那么使用本地存储实现持久化存储
                SET_TOKEN(result.data as string)
// 要保证当前async函数返回一个成功的Promise
                return 'ok'
            } else {
                return Promise.reject(new Error(result.data))
            }
        },
// 获取用户信息的方法
        async userInfo() {
// 获取用户信息进行存储仓库中的用户头像、名字...
            const result: userInfoResponseData = await reqUserInfo()
            console.log(result)
// 若获取用户信息成功, 则存储用户信息
            if (result.code == 200) {
                this.username = result.data.name;
                this.avatar = result.data.avatar
                this.buttons = result.data.buttons

// 2.调用过滤异步路由函数, 并传递异步路由与用户请求成功返回的路由(用于计算用户需展示的异步路由, 利用深拷贝)
                let userAsyncRoute = filterAsyncRoute(cloneDeep(asyncRoute), result.data.routes)
// 3.存储计算好的路由数据到本地(将路由数据展开)
                this.menuRoutes = [...constantRoute, ...userAsyncRoute, ...anyRoute],
// 4.目前路由管理的只有常量路由, 将计算好的异步路由、任意路由动态追加给路由器
                [...userAsyncRoute, anyRoute].forEach((route: any) => {
                    router.addRoute(route)
                })
                
                return 'ok'
            } else {
                return Promise.reject(new Error(result.message))
            }
        },
// 退出登录的方法
        async userLogout () {
            const result: any = await reqLogout()
            console.log(result)
            if (result.code == 200) {
                this.token = ''
                this.username = ''
                this.avatar = ''
                REMOVE_TOKEN()
                return 'ok'
            } else {
                return Promise.reject(new Error(result.message))
            }
        }  
    },
    getters: {

    }
})
// 暴露小仓库方法
export default useUserStore


// 引入数据类型
// import type { loginForm, loginResponseData } from '@/api/user/type'