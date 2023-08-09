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
                            <el-button type="primary" icon="Plus" title="添加SKU" @click="addSku(row)"></el-button>
                            <el-button type="warning" icon="Edit" title="修改SPU" @click="updateSpu(row)"></el-button>
                            <el-button type="info" icon="WarningFilled" title="查看SPU列表" @click="findSku(row)"></el-button>
                            <el-popconfirm :title="`确定删除${row.spuName}吗?`" @confirm="deleteSpu(row)" width="170px" icon="Delete" icon-color="red" :hide-after="10">
                                <template #reference>
                                    <el-button type="danger" icon="Delete" title="删除SPU"></el-button>
                                </template>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
        <!-- 分页器 -->
                <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[2, 5, 6, 10]" :background="true" layout="prev, pager, next, jumper, ->, sizes, total" :total="total" @current-change="getHasSpu" @size-change="changeSize"/>    
            </div>
        <!-- 添加SPU或修改SPU的子组件 -->
            <SpuForm v-show="scene == 1" @changeScene="changeScene" ref="spu"></SpuForm>
        <!-- 添加SKU的子组件 -->
            <SkuForm v-show="scene == 2" @changeScene="changeScene" ref="sku"></SkuForm>
            <!-- dialog对话框: 展示SKU数据 -->
            <el-dialog title="SKU列表" v-model="show">
                <el-table border :data="skuArr">
                    <el-table-column label="SKU名称" prop="skuName"></el-table-column>
                    <el-table-column label="SKU价格" prop="price"></el-table-column>
                    <el-table-column label="SKU重量" prop="weight"></el-table-column>
                    <el-table-column label="SKU图片">
                        <template #="{row, $index}">
                            <img :src="row.skuDefaultImg" style="width: 100px; height: 100px;">
                        </template>
                    </el-table-column>
                </el-table>
            </el-dialog>
        </el-card>
    </div>
</template>

<script setup lang="ts">
// 引入子组件
import SpuForm from './spuForm.vue'
import SkuForm from './skuForm.vue'
// 引入组合式API函数
import { ref, watch, onBeforeUnmount } from 'vue'
// 引入分类接口相关的小仓库
import useCategoryStore from "@/store/modules/category"
// 引入获取三级分类下的SPU数据接口
import { reqHasSpu, reqSkuList, reqRemoveSpu } from '@/api/product/spu'
// 引入SPU相关数据的数据类型
import type { HasSpuResponseData, Records, SpuData, SkuInfoData, SkuData } from "@/api/product/spu/type"
// 引入Element-Plus的弹窗提示信息
import { ElMessage } from 'element-plus'

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
// 获取子组件实例SpuForm/SkuForm
const spu = ref<any>()
const sku = ref<any>()
// 存储全部的SKU数据
const skuArr = ref<SkuData[]>([])
// 定义控制dialog对话框显示/隐藏(查看SKU数据)
const show = ref<boolean>(false)

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
// 点击添加SPU按钮, 调用子组件实例的方法初始数据(SPU品牌、销售属性)
    spu.value.initAddSpu(categoryStore.c3Id)
}
// 子组件SpuForm绑定自定义事件(让子组件取消按钮通知父组件切换场景为0)
const changeScene = (obj: any) => {
    scene.value = obj.flag
// 若修改SPU则留在当前页, 若添加SPU则跳转第一页(根据子组件判断传递来的对象判断是修改还是添加)
    if (obj.params == 'update') {
        getHasSpu(pageNo.value)
    } else {
// 保存成功则再次获取全部的SPU数据
        getHasSpu()
    }
}
// 修改SPU按钮的回调
const updateSpu = (row: SpuData) => {
    scene.value = 1
// 调用子组件实例方法获取完整的SPU数据(将row数据回传给子组件)
    spu.value.initHasSpuData(row)
}
// 添加SKU按钮的回调(切换为场景2)
const addSku = (row: SpuData) => {
    scene.value = 2
// 调用子组件的方法初始化添加SKU数据
    sku.value.initSkuData(categoryStore.c1Id, categoryStore.c2Id, row)
}
// 查看SKU列表数据按钮的回调
const findSku = async (row: SpuData) => {
    const result: SkuInfoData = await reqSkuList((row.id as number))
    if (result.code == 200) {
        skuArr.value = result.data
// 点击查看SKU按钮 则dialog对话框显示
        show.value = true
    }
}
// 删除SPU按钮的回调
const deleteSpu = async (row: SpuData) => {
    const result: any = await reqRemoveSpu((row.id as number))
    if (result.code == 200) {
        ElMessage({
            type: 'success',
            message: 'SPU删除成功'
        })
// 删除成功则重新获取SPU数据(若当前页SPU大于1则还是当前页, 若小于1则回到上一页)
        getHasSpu(records.value.length > 1 ? pageNo.value : pageNo.value - 1)
    } else {
        ElMessage({
            type: 'error',
            message: 'SPU删除失败'
        })
    }
}
// 当路由跳转组件会被销毁时, 将仓库分类相关数据清空(调用路由组件$reset方法清空仓库数据)
onBeforeUnmount(() => {
    categoryStore.$reset()
})
</script>

<style lang="scss" scoped>

</style>