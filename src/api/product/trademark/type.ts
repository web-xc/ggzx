// 定义请求相关的数据类型
export interface ResponseData {
    code: number,
    message: string,
    ok: boolean
}

// 定义已有品牌的数据类型
export interface TradeMark {
    id?: number,
    tmName: string,
    logoUrl: string
}

// 定义包含全部品牌的数据类型
export type Records = TradeMark[]

// 定义已有的全部品牌的数据类型
export interface TradeMarkResponseData extends TradeMark {
    data: {
        records: Records,
        total: number,
        size: number,
        current: number,
        searchCount: boolean,
        pages: number
    }
}