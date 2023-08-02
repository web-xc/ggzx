// 商品分类全局组件的小仓库
import { defineStore } from "pinia"
// 引入商品分类接口方法
import { reqC1 } from "@/api/product/attr"

const useCategoryStore = defineStore('Category', {
    state: () => {
        return {
            c1Arr: [], // 存储一级分类的数据
            c1Id: ''   // 存储一级分类的ID 
        }
    },
    actions: {
        // 发送请求获取一级分类数据的方法
        async getC1() {
            const result: any = await reqC1()
            console.log(result)
            if (result.code == 200) {
                this.c1Arr = result.data
            }
        }
    },
    getters: {

    }
})

export default useCategoryStore