// 定义分类相关的数据类型
export interface ResponseData {
    code: number,
    message: string,
    ok: boolean
}

// 分类的数据类型
export interface CategoryObj {
    id: number | string,
    name: string,
    category1Id?: number,
    category2Id?: number,
}

// 相应分类接口返回数据的数据类型
export interface CategoryResponseData extends ResponseData {
    data: CategoryObj[]
}

// 分类的属性与属性值的数据类型
// 分类属性值对象的数据类型
export interface AttrValue {
    id?: number,
    valueName: string,
    arrtId?: number
}

// 存储每一个属性值为数组类型
export type AttrValueList = AttrValue[]

// 分类属性对象的数据类型
export interface Attr {
    id?: number,
    attrName: string,
    categoryId: number | string,
    categoryLevel: number,
    attrValueList: AttrValueList
}

// 存储每一个属性对象为数组类型
export type AttrList = Attr[]

// 属性接口返回数据的数据类型
export interface AttrResponseData extends ResponseData {
    data: Attr[]
}