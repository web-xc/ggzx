// 商品分类全局组件的小仓库
import { defineStore } from "pinia"
// 引入商品分类接口方法
import { reqC1, reqC2, reqC3 } from "@/api/product/attr"
// 引入分类相关数据的数据类型
import type { CategoryResponseData } from "@/api/product/attr/type"
// 引入小仓库数据类型
import type { CategoryState } from './types/type'

const useCategoryStore = defineStore('Category', {
    state: (): CategoryState => {
        return {
            c1Arr: [], // 存储一级分类数据
            c1Id: '',  // 存储一级分类ID 
            c2Arr: [], // 存储二级分类数据
            c2Id: '',  // 存储二级分类ID 
            c3Arr: [], // 存储三级分类数据
            c3Id: '',  // 存储三级分类ID 
        }
    },
    actions: {
        // 获取一级分类数据的方法
        async getC1() {
            const result: CategoryResponseData = await reqC1()
            console.log('一级分类', result)
            if (result.code == 200) {
                this.c1Arr = result.data
            }
        },
        // 获取二级分类数据的方法
        async getC2() {
            const result: CategoryResponseData = await reqC2(this.c1Id)
            console.log('二级分类', result)
            if (result.code == 200) {
                this.c2Arr = result.data
            }
        },
        // 获取三级分类数据的方法
        async getC3() {
            const result: CategoryResponseData = await reqC3(this.c2Id)
            console.log('三级分类', result)
            if (result.code == 200) {
                this.c3Arr = result.data
            }
        }
    },
    getters: {

    }
})

export default useCategoryStore