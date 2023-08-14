// 角色管理模块的接口
// 对axios二次封装的请求接口
import request from "@/utils/request"
// 引入用户账号信息相关数据的数据类型
import type { RoleResponseData, RoleData, MenuResponseData } from "./type"

enum API {
    ALLROLE = '/admin/acl/role/', // 获取全部角色
    ADDROLE_URL = '/admin/acl/role/save', // 新增角色职位
    UPDATEROLE_URL = '/admin/acl/role/update', // 更新角色职位
    ALLPERMISSION_URL = '/admin/acl/permission/toAssign/', // 获取全部菜单与按钮权限数据
    SETPERMISSION_URL = '/admin/acl/permission/doAssign/?', // 给相应角色职位分配权限
    REMOVEROLE_URL = '/admin/acl/role/remove/' // 删除角色职位
}

// 获取全部角色的接口
export const reqAllRoleList = (page: number, limit: number, roleName: string) => request.get<any, RoleResponseData>(API.ALLROLE + `${page}/${limit}/?roleName=${roleName}`)
// 添加角色职位/更新角色职位的接口(若有携带id则是更新角色, 没有id则是添加角色)
export const reqAddOrUpdateRole = (data: RoleData) => {
    if (data.id) {
        return request.put<any, any>(API.UPDATEROLE_URL, data)
    } else {
        return request.post<any, any>(API.ADDROLE_URL, data)
    }
} 
// 获取全部权限菜单与按钮权限数据的接口
export const reqAllMenuList = (roleId: number) => request.get<any, MenuResponseData>(API.ALLPERMISSION_URL + roleId)
// 给相应角色职位分配权限的接口
export const reqSetPermission = (roleId: number, permissionId: number[]) => request.post(API.SETPERMISSION_URL + `roleId=${roleId}&permissionId=${permissionId}`)
// 删除角色职位的接口
export const reqRemoveRole = (roleId: number) => request.delete<any, any>(API.REMOVEROLE_URL + roleId)