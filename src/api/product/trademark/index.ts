// 对axios二次封装的请求接口
import request from "@/utils/request"
// 引入TS定义的数据类型
import type { TradeMarkResponseData, TradeMark } from './type'

// 模块接口地址
enum API {
// 获取品牌接口
    TRADEMARK_URL = "/admin/product/baseTrademark/", 
// 添加品牌接口
    ADDTRADEMARK_URL = "/admin/product/baseTrademark/save",
// 修改品牌接口
    UPDATETRADEMARK_URL = "/admin/product/baseTrademark/update",
// 删除品牌接口
    DELETE_URL = "/admin/product/baseTrademark/remove/"
}

// 获取品牌接口的方法
export const reqHasTrademark = (page: number, limit: number) => request.get<any, TradeMarkResponseData>(API.TRADEMARK_URL + `${page}/${limit}`)

// 添加与修改品牌接口的方法
export const reqAddOrUpdateTrademark = (data: TradeMark) => {
// 判断是否携带id, 若有id则是修改品牌, 若没有则是添加品牌
    if (data.id) {
        return request.put<any, any>(API.UPDATETRADEMARK_URL, data)
    } else {
        return request.post<any, any>(API.ADDTRADEMARK_URL, data)
    }
}
// 删除品牌数据的方法
export const reqDeleteTrademark = (id: number) => request.delete<any>(API.DELETE_URL + id)