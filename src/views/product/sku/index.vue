<template>
    <div>
        <el-card style="margin: 10px 0px;">
            <el-table border :data="skuArr">
                <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
                <el-table-column label="名称" width="150px" show-overflow-tooltip prop="skuName"></el-table-column>
                <el-table-column label="描述" prop="skuDesc"></el-table-column>
                <el-table-column label="默认图片">
                    <template #="{row, $index}">
                        <img :src="row.skuDefaultImg" style="width: 100px; height: 100px;">
                    </template>
                </el-table-column>
                <el-table-column label="重量(g)" prop="weight"></el-table-column>
                <el-table-column label="价格(元)" prop="price"></el-table-column>
                <el-table-column label="操作" width="250px" fixed="right">
                    <template #="{row, $index}">
                        <el-button type="info" icon="Top"></el-button>
                        <el-button type="primary" icon="Edit"></el-button>
                        <el-button type="info" icon="infoFilled"></el-button>
                        <el-button type="danger" icon="Delete"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                v-model:current-page="pageNo"
                v-model:page-size="pageSize"
                :page-sizes="[3, 5, 6, 10]"
                :background="true"
                layout="prev, pager, next, jumper, ->, sizes, total"
                :total="total"
                @current-change="getHasSku"
                @size-change="handler"/>
        </el-card>
    </div>
</template>

<script setup lang="ts">
// 引入组合式API函数
import { ref, onMounted, handleError } from 'vue'
// 引入SKU相关请求接口
import { reqSkuList } from '@/api/product/sku'
// 引入SKU相关的数据类型
import { SkuResponseData, SkuData } from '@/api/product/sku/type'

// 分页器默认页码
const pageNo = ref<number>(1)
// 每页默认展示几条数据
const pageSize = ref<number>(3)
// 存储每页总条数与SKU数据
const total = ref<number>()
const skuArr = ref<SkuData[]>([])

// 组件挂载完毕则调用函数发送请求, 并获取SKU数据
onMounted(() => {
    getHasSku()
})
// 获取SKU数据的请求函数
const getHasSku = async (pages = 1) => {
// 分页器默认页码(不传参为1)
    pageNo.value = pages
    const result: SkuResponseData = await reqSkuList(pageNo.value, pageSize.value)
    console.log('SKU数据获取成功', result)
    if (result.code == 200) {
        total.value = result.data.total
        skuArr.value = result.data.records
    }
}
// 分页器下拉菜单发生变化的回调
const handler = (pageSizes: number) => {
    getHasSku()
}
</script>

<style lang="scss" scoped>

</style>