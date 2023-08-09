// 定义SKU相关的数据类型
export interface ResponseData {
    code: number,
    message: string,
    ok: boolean
}

// 定义SKU对象的数据类型
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

// 定义获取SKU接口返回的数据类型
export interface SkuResponseData extends ResponseData {
    date: {
        records: SkuData[],
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