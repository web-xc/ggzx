// 用户管理模块的接口
// 对axios二次封装的请求接口
import request from "@/utils/request"
// 引入用户账号信息相关数据的数据类型
import type { UserResponseData, User } from "./type"

enum API {
    ALLUSER_URL = '/admin/acl/user/',    // 获取全部用户账号信息
    ADDUSER_URL = '/admin/acl/user/save', // 添加用户账号
    UPDATEUSER_URL = '/admin/acl/user/update', // 编辑用户账号
}

// 获取全部用户账号信息的接口
export const reqUserInfo = (page: number, limit: number) => request.get<any, UserResponseData>(API.ALLUSER_URL + `${page}/${limit}`)
// 添加用户账号/编辑用户账号的接口(若有携带id则是编辑用户, 没有id则是添加用户)
export const reqAddOrUpdateUser = (data: User) => {
    if (data.id) {
        return request.put<any, any>(API.UPDATEUSER_URL, data)
    } else {
        return request.post<any, any>(API.ADDUSER_URL, data)
    }
}




// export const 
// export const 
// export const 
// export const 
// export const 