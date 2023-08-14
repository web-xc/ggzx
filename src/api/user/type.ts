// 定义用户相关数据返回的数据类型
// 登录接口需要携带 TS定义的数据类型参数
export interface loginFormData {
    username: string,
    password: string
}
// 定义全部接口返回的数据都拥有的TS定义的数据类型
export interface ResponseData {
    code: number,
    message: string,
    ok: boolean
}
// 定义登录接口返回的数据类型, 并继承全部接口返回的TS数据类型
export interface loginResponseData extends ResponseData {
    data: string
}
// 定义获取用户信息返回的数据类型
export interface userInfoResponseData extends ResponseData {
    data: {
        routes: string[],
        buttons: string[],
        roles: string[],
        name: string,
        avatar: string
    }
}


// // 登录接口需要携带 TS定义的类型参数
// export interface loginForm {
//     username: string,
//     password: string
// }
// interface dataType {
//     token?: string,
//     message?: string
// }
// // 登录接口返回的数据类型
// export interface loginResponseData {
//     code: number,
//     data: dataType
// }
// interface userInfo {
//     userId: number,
//     avatar: string
//     username: string,
//     password: string,
//     desc: string,
//     roles: string[],
//     buttons: string[],
//     routes: string[],
//     token: string,
// }
// // 定义服务器返回用户信息相关的数据类型
// interface user {
//     checkUser: userInfo
// }
// export interface userResponseData {
//     code: number,
//     data: user
// }