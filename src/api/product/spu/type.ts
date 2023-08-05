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

// SPU品牌数据的数据类型
export interface Trademark {
    id: number,
    tmName: string,
    logoUrl: string
}

// SPU品牌接口返回的数据类型
export interface AllTradeMark extends ResponseData {
    data: Trademark[]
}

// SPU商品图片的数据类型
export interface SpuImg {
    id: number,
    createTime: string,
    updateTime: string,
    spuId: number,
    imgName: string,
    imgUrl: string
}

// 定义SPU商品图片为数组类型
export interface SpuHasImg extends ResponseData {
    data: SpuImg[]
}

// 定义SPU销售属性值对象的数据类型
export interface SaleAttrValue {
    id?: number,
    createTime: string,
    updateTime: string,
    spuId: number,
    baseSaleAttrId: number,
    saleAttrValueName: string,
    saleAttrName: string,
    isChecked: string
}

// 将SPU销售属性值对象赋值为数组类型
export type SpuSaleAttrValueList = SaleAttrValue[]

// 定义SPU销售属性对象的数据类型
export interface SaleAttr {
    id?: number,
    createTime: string,
    updateTime: string,
    spuId: number,
    baseSaleAttrId: number,
    saleAttrName: string,
    spuSaleAttrValueList: SpuSaleAttrValueList
}

// 定义SPU所有销售属性接口返回的数据类型
export interface SaleAttrResponseData extends ResponseData {
    data: []
}

// 定义SPU全部销售属性的数据类型
export interface HasSaleAttr {
    id: number,
    name: string
}
// 将SPU全部销售属性的数据赋值为数组类型
export interface HasSaleAttrResponseData extends ResponseData {
    data: HasSaleAttr[]
}