// 用户管理模块的接口
// 对axios二次封装的请求接口
import request from "@/utils/request"
// 引入用户账号信息相关数据的数据类型
import type { UserResponseData, User, AllRoleResponseData, SetRoleData } from "./type"

enum API {
    ALLUSER_URL = '/admin/acl/user/',    // 获取全部用户账号信息
    ADDUSER_URL = '/admin/acl/user/save', // 添加用户账号
    UPDATEUSER_URL = '/admin/acl/user/update', // 编辑用户账号
    ALLROLE_URL = '/admin/acl/user/toAssign/',  // 获取角色职位
    SETROLE_URL = '/admin/acl/user/doAssignRole', // 给用户分配角色
    DELETEUSER_URL = '/admin/acl/user/remove/', // 删除某一个账号
    DELETEALLUSER_URL = '/admin/acl/user/batchRemove', // 批量删除账号
    
}

// 获取全部用户账号信息的接口(查询用户账号)
export const reqUserInfo = (page: number, limit: number, username: string) => request.get<any, UserResponseData>(API.ALLUSER_URL + `${page}/${limit}/?username=${username}`)
// 添加用户账号/编辑用户账号的接口(若有携带id则是编辑用户, 没有id则是添加用户)
export const reqAddOrUpdateUser = (data: User) => {
    if (data.id) {
        return request.put<any, any>(API.UPDATEUSER_URL, data)
    } else {
        return request.post<any, any>(API.ADDUSER_URL, data)
    }
}
// 获取全部角色职位和当前用户职位的接口
export const reqAllRole = (userId: number) => request.get<any, AllRoleResponseData>(API.ALLROLE_URL + userId)
// 给用户分配角色职位的接口
export const reqSetUserRole = (data: SetRoleData) => request.post<any, any>(API.SETROLE_URL, data)
// 删除某一个账号的接口
export const reqRemoveUser = (userId: number) => request.delete<any, any>(API.DELETEUSER_URL + userId)
// 批量删除账号的接口
export const reqSelectUser = (idList: number[]) => request.delete<any, any>(API.DELETEALLUSER_URL, { data: idList })