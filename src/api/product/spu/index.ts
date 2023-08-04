// SPU管理模块的接口
// 对axios二次封装的请求接口
import request from "@/utils/request"
// 引入SPU相关数据的数据类型
import type { HasSpuResponseData } from "./type"

enum API {
    HASSPU_URL = '/admin/product/', // 获取所有SPU数据
}

// 获取三级分类下的SPU数据
export const reqHasSpu = (page: number, limit: number, category3Id: string | number) => request.get<any, HasSpuResponseData>(API.HASSPU_URL + `${page}/${limit}?category3Id=${category3Id}`)
