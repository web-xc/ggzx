// SKU模块接口管理
// 对axios二次封装的请求接口
import request from "@/utils/request"
// 引入SKU相关数据的数据类型
import type { SkuResponseData, SkuInfoData } from "./type"

enum API {
    SKU_URL = '/admin/product/list/',               // 获取商品SKU数据
    SALE_URL = '/admin/product/onSale/',            // 上架SKU商品
    CANCELSALE_URL = '/admin/product/cancelSale/',  // 下架SKU商品
    SKUINFO_URL = '/admin/product/getSkuInfo/',     // 获取SKU商品详情
    DELETESKU_URL = '/admin/product/deleteSku/'     // 删除SKU商品
}

// 获取商品SKU数据的接口
export const reqSkuList = (page: number, limit: number) => request.get<any, SkuResponseData>(API.SKU_URL + `${page}/${limit}`)
// 上架SKU商品的接口
export const reqSaleSku = (skuId: number) => request.get<any, any>(API.SALE_URL + skuId)
// 下架SKU商品的接口
export const reqCancelSale = (skuId: number) => request.get<any, any>(API.CANCELSALE_URL + skuId)
// 获取SKU商品详情的接口
export const reqSkuInfo = (skuId: number) => request.get<any, SkuInfoData>(API.SKUINFO_URL + skuId)
// 删除SKU商品的接口
export const reqRemoveSku = (skuId: number) => request.delete<any, any>(API.DELETESKU_URL + skuId)