// 对axios二次封装的请求接口
import request from "@/utils/request"

// 属性管理模块的接口地址(一级、二级、三级接口)
enum API {
    C1_API = '/admin/product/getCategory1',
    C2_API = '/admin/product/getCategory2/',
    C3_API = '/admin/product/getCategory3/'
}

// 获取一级分类接口的方法
export const reqC1 = () => request.get<any, any>(API.C1_API)
// 获取二级分类接口的方法
export const reqC2 = (category1id: number | string) => request.get<any, any>(API.C2_API + category1id)
// 获取三级分类接口的方法
export const reqC3 = (category2id: number | string) => {
    return request.get<any, any>(API.C3_API + category2id)
}