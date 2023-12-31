// 全部接口返回的数据类型
export interface ResponseData {
    code: number,
    message: string,
    ok: boolean
}

// SPU数据的数据类型: 需修改
// 修改后是完整SPU数据 => 三级分类id、SPU品牌id、品牌名称、品牌属于哪个、品牌描述、品牌图片、品牌销售属性
export interface SpuData {
    category3Id: string | number,
    id?: number,
    spuName: string,
    tmId: number | string,
    description: string,
    spuImageList: null | SpuImg[]
    spuSaleAttrList: null | SaleAttr[],
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
    id?: number,
    imgName?: string,
    imgUrl?: string
    createTime?: string,
    updateTime?: string,
    spuId?: number,
    name?: string,
    url?: string
}

// 定义SPU商品图片为数组类型
export interface SpuHasImg extends ResponseData {
    data: SpuImg[]
}

// 定义SPU销售属性值对象的数据类型
export interface SaleAttrValue {
    id?: number,
    createTime?: string,
    updateTime?: string,
    spuId?: number,
    baseSaleAttrId: number | string,
    saleAttrValueName: string,
    saleAttrName?: string,
    isChecked?: string
}

// 将SPU销售属性值对象赋值为数组类型
export type SpuSaleAttrValueList = SaleAttrValue[]

// 定义SPU销售属性对象的数据类型
export interface SaleAttr {
    id?: number,
    createTime?: string,
    updateTime?: string,
    spuId?: number,
    baseSaleAttrId: number | string,
    saleAttrName: string,
    spuSaleAttrValueList: SpuSaleAttrValueList,
    flag?: boolean,
    saleAttrValue?: string
}

// 定义SPU所有销售属性接口返回的数据类型
export interface SaleAttrResponseData extends ResponseData {
    data: SaleAttr[]
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

// SKU平台属性的数据类型
export interface Attr {
    attrId: number | string,  // 平台属性id
    valueId: number | string  // 属性值id
}
// SKU属性与属性值的数据类型
export interface saleAttr {
    saleAttrId: number | string,      // 属性id
    saleAttrValueId: number | string  // 属性值id
}

// 定义添加SKU的数据类型
export interface SkuData {
    category3Id: string | number,        // 三级分类id
    spuId: string | number,              // 已有的SPU的id
    tmId: string | number,               // SPU品牌id
    skuName: string,                     // sku名称
    price: string | number,              // sku价格
    weight: string | number,             // sku重量
    skuDesc: string,                     // sku描述
    skuAttrValueList?: Attr[],           // 平台属性收集
    skuSaleAttrValueList?: saleAttr[],   // 销售属性
    skuDefaultImg: string                // sku图片地址
}

// 定义获取SKU的数据类型
export interface SkuInfoData extends ResponseData {
    data: SkuData[]
}