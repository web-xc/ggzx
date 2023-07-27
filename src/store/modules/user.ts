// 创建用户相关的小仓库
import { defineStore } from 'pinia'
// 引入项目管理接口
import { reqLogin } from '@/api/user'
// 引入数据类型
import type { loginForm, loginResponseData } from '@/api/user/type'
// 引入小仓库数据类型
import type { UserState } from './types/type'
// 引入操作本地存储的工具方法
import { SET_TOKEN, GET_TOKEN } from '@/utils/token'

let useUserStore = defineStore('User', {
// 小仓库存储数据的地方
    state: (): UserState => {
        return {
            token: GET_TOKEN() // 用户唯一标识
        }
    },
// 异步|逻辑的地方
    actions: {
// 用户登录的方法
        async userLogin(data: loginForm) {
            let result: loginResponseData = await reqLogin(data)
            console.log(result)
// 请求成功: 200 => Token 请求失败: 201 登录失败错误信息
            if (result.code === 200) {
// 请求成功: 则Pinia仓库存储一下Token
                this.token = (result.data.token as string)
                console.log(result.data.token)
// Pinia/Vuex存储数利用的JS对象, 那么使用本地存储实现持久化存储
                SET_TOKEN(result.data.token as string)
// 要保证当前async函数返回一个成功的Promise
                return 'ok'
            } else {
                return Promise.reject(new Error(result.data.message))
            }
        }
    },
    getters: {

    }
})
// 暴露小仓库方法
export default useUserStore