// SPU管理模块的接口
// 对axios二次封装的请求接口
import request from "@/utils/request"
// 引入SPU相关数据的数据类型
import type { HasSpuResponseData, AllTradeMark, SpuHasImg, SaleAttrResponseData, HasSaleAttrResponseData, SpuData } from "./type"

enum API {
    HASSPU_URL = '/admin/product/', // 获取所有SPU数据
    ALLTRADEMARK_URL = '/admin/product/baseTrademark/getTrademarkList', // 获取全部SPU品牌数据
    IMAGE_URL = '/admin/product/spuImageList/', // 获取某一个SPU品牌下的全部商品图片数据
    SPUHASSALEATTR_URL = '/admin/product/spuSaleAttrList/', // 获取某一个SPU品牌下的全部销售属性
    ALLSALEATTR_URL = '/admin/product/baseSaleAttrList', // 获取SPU全部的销售属性(颜色、版本、尺寸...)
    ADDSPU_URL = '/admin/product/saveSpuInfo', // 添加一个新的SPU
    UPDATESPU_URL = '/admin/product/updateSpuInfo', // 更新SPU数据
    ADDSKU_URL = '/admin/product/saveSkuInfo', // 新增SKU数据接口
}

// 获取三级分类下的SPU数据
export const reqHasSpu = (page: number, limit: number, category3Id: string | number) => request.get<any, HasSpuResponseData>(API.HASSPU_URL + `${page}/${limit}?category3Id=${category3Id}`)
// 获取全部SPU品牌的数据
export const reqAllTradeMark = () => request.get<any, AllTradeMark>(API.ALLTRADEMARK_URL)
// 获取某一个SPU品牌下的全部商品图片
export const reqSpuImageList = (spuId: number) => request.get<any, SpuHasImg>(API.IMAGE_URL + spuId)
// 获取某一个SPU品牌下的全部销售属性
export const reqSpuHasSaleAttr = (spuId: number) => request.get<any, SaleAttrResponseData>(API.SPUHASSALEATTR_URL + spuId)
// 获取SPU全部的销售属性
export const reqAllSaleAttr = () => request.get<any, HasSaleAttrResponseData>(API.ALLSALEATTR_URL)
// 添加一个新的SPU + 更新已有的SPU数据
// data是新增SPU或是已有SPU对象(判断SPU是否有id, 有则是修改SPU, 没有则是新增SPU)
export const reqAddOrUpdateSpu = (data: SpuData) => {
    if (data.id) {
        return request.post<any, any>(API.UPDATESPU_URL, data)
    } else {
        return request.post<any, any>(API.ADDSPU_URL, data)
    }
}

// 添加SKU数据的请求方法
export const 