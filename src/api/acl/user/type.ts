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

// 
// export interface 


// export interface 
// export interface 
// export interface 