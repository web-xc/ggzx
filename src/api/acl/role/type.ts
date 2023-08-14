// 定义用户角色管理相关的数据类型
export interface ResponseData {
    code: number,
    message: string,
    ok: boolean
}

// 角色的数据类型
export interface RoleData {
    id?: number,
    createTime?: string,
    updataTime?: string,
    roleName: string,
    remark?: string
} 

// 定义角色数据为数组类型
export type Records = RoleData[]

// 定义获取角色接口返回的全部数据类型
export interface RoleResponseData extends ResponseData {
    data: {
        records: Records,
        total: number,
        size: number,
        current: number,
        orders: [],
        optimizeCountSql: boolean,
        hitCount: boolean,
        countId: null,
        maxLimit: null,
        searchCount: boolean,
        pages: number
    }
}

// 分配角色菜单权限与按钮权限的数据类型
export interface MunuData {
    id: number,
    createTime: string,
    updateTime: string,
    pid: number,
    name: string,
    code: string,
    toCode: string,
    type: number,
    status: null,
    level: number,
    children?: MenuList,
    select: boolean,
}

// 定义全部菜单权限与按钮权限数据为数组类型
export type MenuList = MunuData[]

// 全部菜单权限与按钮权限的数据类型
export interface MenuResponseData extends ResponseData {
    data: MenuList
}