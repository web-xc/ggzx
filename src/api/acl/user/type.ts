// 定义用户账号信息相关的数据类型
export interface ResponseData {
    code: number,
    message: string,
    ok: boolean
}

// 定义账号信息的数据类型
export interface User {
    id?: number,
    creatTime?: string,
    updateTime?: string,
    username?: string,
    password?: string, 
    name?: string,
    phone?: null,
    roleName?: string
}
// 定义账号信息数据为数组类型
export type Records = User[]

// 定义获取全部账号信息接口返回的数据类型
export interface UserResponseData extends ResponseData {
    data: {
        records: Records,
        total: number,
        size: number,
        current: number,
        pages: number
    }
}

// 角色职位的数据类型
export interface RoleData {
    id?: number,
    creatTime?: string,
    updateTime?: string,
    roleName: string,
    remark: null
}
// 定义角色职位数据为数组类型
export type AllRole = RoleData[]

// 定义全部职位返回的数据类型
export interface AllRoleResponseData extends ResponseData {
    data: {
        assignRoles: AllRole,
        allRolesList: AllRole
    }
}

// 用户分配角色职位接口的数据类型
export interface SetRoleData {
    roleIdList: number[],
    userId: number
}