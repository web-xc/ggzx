// 全部接口返回的数据类型
export interface ResponseData {
    code: number,
    message: string,
    ok: boolean
}

// SPU数据的数据类型: 需修改
export interface SpuData {
    id?: number,
    spuName: string,
    descripttion: string,
    category3Id: string | number,
    tmId: number,
    spuSaleAttrList: null,
    spuImageList: null
}

// 将SPU数据赋值为数组类型
export type Records = SpuData[]

// 定义所有SPU接口返回的数据类型
export interface HasSpuResponseData extends ResponseData {
    data: {
        records: Records,
        total: number,
        size: number,
        current: number,
        searchCount: boolean,
        pages: number
    }
}