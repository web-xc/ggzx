<template>
    <div>
        <!-- 三级分类全局组件 -->
        <Category :scene="scene"></Category>
        <el-card style="margin: 10px 0px;">
            <div v-show="scene == 0">
                <el-button type="primary" size="default" icon="Plus" :disabled="categoryStore.c3Id ? false : true" @click="addSpu">添加SPU</el-button>
        <!-- 展示SPU数据 -->
                <el-table style="margin: 10px 0px;" border :data="records">
                    <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
                    <el-table-column label="SPU名称" prop="spuName"></el-table-column>
                    <el-table-column label="SPU描述" prop="description" show-overflow-tooltip></el-table-column>
                    <el-table-column label="SPU操作">
                        <template #="{row, $index}">
                            <el-button type="primary" size="small" icon="Plus" title="添加SPU"></el-button>
                            <el-button type="warning" size="small" icon="Edit" title="修改SPU" @click="updateSpu"></el-button>
                            <el-button type="info" size="small" icon="WarningFilled" title="查看SPU列表"></el-button>
                            <el-button type="danger" size="small" icon="Delete" title="删除SPU"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
        <!-- 分页器 -->
                <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[2, 5, 6]" :background="true" layout="prev, pager, next, jumper, ->, sizes, total" :total="total" @current-change="getHasSpu" @size-change="changeSize"/>    
            </div>
        <!-- 添加SPU或修改SPU的子组件 -->
            <SpuForm v-show="scene == 1" @changeScene="changeScene"></SpuForm>
        <!-- 添加SKU的子组件 -->
            <SkuForm v-show="scene == 2"></SkuForm>
        </el-card>
    </div>
</template>

<script setup lang="ts">
// 引入子组件
import SpuForm from './spuForm.vue'
import SkuForm from './skuForm.vue'
// 引入组合式API函数
import { ref, watch } from 'vue'
// 引入分类接口相关的小仓库
import useCategoryStore from "@/store/modules/category"
// 引入获取三级分类下的SPU数据接口
import { reqHasSpu } from '@/api/product/spu'
// 引入SPU相关数据的数据类型
import type { HasSpuResponseData, Records } from "@/api/product/spu/type"

// 获取分类接口相关的小仓库、获取属性与属性值接口
const categoryStore = useCategoryStore()
// 定义card组件内容切换(0显示/1隐藏) (1.添加或修改SPU) (2.添加SKU)
const scene = ref<number>(0)
// 分页器默认页码
const pageNo = ref<number>(1)
// 每页默认展示几条数据
const pageSize = ref<number>(3)
// 存储SPU数据
const records = ref<Records>([])
// 存储SPU数据总条数
const total = ref<number>(0)

// 监听三级分类ID变化
watch(() => categoryStore.c3Id, () => {
// 保证三级分类得到才能发起请求
    if (!categoryStore.c3Id) return
    getHasSpu()
})
// 获取三级分类下全部的SPU数据
const getHasSpu = async (pages = 1) => {
// 当每页数据发生变化时, 当前页码归1
    pageNo.value = pages
    const result: HasSpuResponseData = await reqHasSpu(pageNo.value, pageSize.value, categoryStore.c3Id)
    console.log('SPU数据请求成功', result)
    if (result.code == 200) {
        records.value = result.data.records
        total.value = result.data.total
    }
}
// 分页器下拉菜单发生变化时触发的回调
const changeSize = () => {
    getHasSpu()
}
// 添加SPU按钮的回调(切换为场景1: 添加或修改SPU结构)
const addSpu = () => {
    scene.value = 1
}
// 子组件SpuForm绑定自定义事件(让子组件取消按钮通知父组件切换场景为0)
const changeScene = (num: number) => {
    scene.value = 0
}
// 修改SPU按钮的回调
const updateSpu = () => {
    scene.value = 1
}
</script>

<style lang="scss" scoped>

</style>