// 对axios二次封装的请求接口
import request from "@/utils/request"
// 引入分类相关数据的数据类型
import type { CategoryResponseData, AttrResponseData, Attr } from "./type"

// 属性管理模块的接口地址(一级、二级、三级接口)
enum API {
    C1_API = '/admin/product/getCategory1',
    C2_API = '/admin/product/getCategory2/',
    C3_API = '/admin/product/getCategory3/',
    ATTR_API = '/admin/product/attrInfoList/',          // 获取分类下的属性与属性值
    ADDORUPDATEATTR_API = '/admin/product/saveAttrInfo' // 添加或修改属性的接口
}

// 获取一级分类接口的方法
export const reqC1 = () => request.get<any, CategoryResponseData>(API.C1_API)
// 获取二级分类接口的方法
export const reqC2 = (category1id: number | string) => request.get<any, CategoryResponseData>(API.C2_API + category1id)
// 获取三级分类接口的方法
export const reqC3 = (category2id: number | string) => {
    return request.get<any, CategoryResponseData>(API.C3_API + category2id)
}
// 获取分类下的属性与属性值接口的方法
export const reqAttr = (category1id: number | string, category2id: number | string, category3id: number | string) => request.get<any, AttrResponseData>(API.ATTR_API + `${category1id}/${category2id}/${category3id}`)

// 添加或修改属性接口的方法
export const reqAddOrUpdateAttr = (data: Attr) => request.post<any, any>(API.ADDORUPDATEATTR_API, data)