<template>
    <div>
        <!-- 三级分类全局组件 -->
        <Category :scene="scene"></Category>
        <el-card style="margin: 10px 0px;">
            <el-button type="primary" size="default" icon="Plus">添加SPU</el-button>
            <el-table style="margin: 10px 0px;" border>
                <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
                <el-table-column label="SPU名称"></el-table-column>
                <el-table-column label="SPU描述"></el-table-column>
                <el-table-column label="SPU操作"></el-table-column>
            </el-table>
        <!-- 分页器 -->
            <el-pagination
                v-model:current-page="pageNo"
                v-model:page-size="pageSize"
                :page-sizes="[2, 5, 6]"
                :background="true"
                layout="prev, pager, next, jumper, ->, sizes, total"
                :total="20"/>          
        </el-card>
    </div>
</template>

<script setup lang="ts">
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
// 定义card组件内容切换(0显示/1隐藏)
const scene = ref<number>(0)
// 分页器默认页码
const pageNo = ref<number>(1)
// 每页默认展示几条数据
const pageSize = ref<number>(3)
// 存储SPU数据
const records = ref<Records>([])

// 监听三级分类ID变化
watch(() => categoryStore.c3Id, () => {
    getHasSpu()
})
const getHasSpu = async () => {
    const result: HasSpuResponseData = await reqHasSpu(pageNo.value, pageSize.value, categoryStore.c3Id)
    console.log('SPU数据请求成功', result)
    if (result.code == 200) {
        records.value = result.data.records
    }
}
</script>

<style lang="scss" scoped>

</style>