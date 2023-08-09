// SKU模块接口管理
// 对axios二次封装的请求接口
import request from "@/utils/request"
// 引入SKU相关数据的数据类型
import type { SkuResponseData } from "./type"

enum API {
    SKU_URL = '/admin/product/list/' // 获取商品SKU数据
}

// 获取商品SKU数据的接口
export const reqSkuList = (page: number, limit: number) => request.get<any, SkuResponseData>(API.SKU_URL + `${page}/${limit}`)