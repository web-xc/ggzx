// 统一管理项目用户相关的接口
import request from "@/utils/request"
// 引入接口TS数据类型
import type { loginFormData, loginResponseData, userInfoResponseData } from "./type"

// 项目用户相关的请求地址
enum API {
    LOGIN_URL = "/admin/acl/index/login",
    USERINFO_URL = "/admin/acl/index/info",
    LOGOUT_URL = "/admin/acl/index/logout"
}

// 登录接口
export const reqLogin = (data: loginFormData) => request.post<any, loginResponseData>(API.LOGIN_URL, data)
// 获取用户信息
export const reqUserInfo = () => request.get<any, userInfoResponseData>(API.USERINFO_URL)
// 退出登录
export const reqLogout = () => request.post<any, any>(API.LOGOUT_URL)



// mock假接口配置
// import type { loginForm, loginResponseData, userResponseData } from "./type";
// 统一管理接口
// enum API {
//     LOGIN_URL = "/user/login",
//     USERINFO_URL = "/user/info"
// }
// 暴露请求函数
// 登录接口方法
// export const reqLogin = ((data: loginForm) => request.post<any, loginResponseData>(API.LOGIN_URL, data))
// 获取用户信息接口方法
// export const reqUserInfo = (() => request.get<any, userResponseData>(API.USERINFO_URL))