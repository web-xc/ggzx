// 定义菜单管理相关的数据类型
export interface ResponseData {
    code: number,
    message: string,
    ok: boolean
}

// 菜单与按钮的数据类型
export interface Permission {
    id?: number,
    createTime: string,
    updateTime: string,
    pid: number,
    name: string,
    code: null,
    toCode: null,
    type: number,
    status: null,
    level: number,
    children?: PermissionList,
    select: boolean,
}

// 定义菜单与按钮的数据为数组类型
export type PermissionList = Permission[]

// 定义全部菜单数据返回的数据类型
export interface PermissionResponseData extends ResponseData {
    data: PermissionList
}

// 添加与修改菜单携带参数的数据类型
export interface MenuParams {
    id?: number,   // ID
    code: string,  // 权限数值
    level: number, // 几级菜单
    name: string,  // 菜单名称
    pid: number    // 菜单ID
}