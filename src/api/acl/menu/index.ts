// 菜单管理模块的接口
// 对axios二次封装的请求接口
import request from "@/utils/request"
// 引入菜单管理相关数据的数据类型
import type { PermissionResponseData, MenuParams } from "./type"

enum API {
    ALLPERMISSION_URL = '/admin/acl/permission', // 获取全部菜单数据
    ADDMENU_URL = '/admin/acl/permission/save',  // 给某一个菜单添加一个子菜单
    UPDATE_URL = '/admin/acl/permission/update', // 编辑某一个菜单
    DELETEMENU_URL = '/admin/acl/permission/remove/' // 删除某一个菜单
}

// 获取全部菜单数据的接口
export const reqAllPermission = () => request.get<any, PermissionResponseData>(API.ALLPERMISSION_URL)
// 添加菜单/编辑菜单的接口
export const reqAddOrUpdateMenu = (data: MenuParams) => {
    if (data.id) {
        return request.put<any, any>(API.UPDATE_URL, data)
    } else {
        return request.post<any, any>(API.ADDMENU_URL, data)
    }
}
// 删除某一个菜单的接口
export const reqRemoveMenu = (id: number) => request.delete<any, any>(API.DELETEMENU_URL + id)