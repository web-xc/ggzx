<template>
    <div style="margin-top: -23px;">
        <el-card style="margin: 10px 0px;">
            <el-table border :data="skuArr">
                <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
                <el-table-column label="名称" width="150px" show-overflow-tooltip prop="skuName"></el-table-column>
                <el-table-column label="描述" show-overflow-tooltip prop="skuDesc" ></el-table-column>
                <el-table-column label="默认图片">
                    <template #="{row, $index}">
                        <img :src="row.skuDefaultImg" style="width: 100px; height: 100px;">
                    </template>
                </el-table-column>
                <el-table-column label="重量(g)" prop="weight"></el-table-column>
                <el-table-column label="价格(元)" prop="price"></el-table-column>
                <el-table-column label="操作" width="250px">
                    <template #="{row, $index}">
                        <el-button v-has="`btn.Sku.updown`" :type="row.isSale == 1 ? 'success' : 'info'" :icon="row.isSale == 1 ? 'Bottom' : 'Top'" @click="updateSale(row)"></el-button>
                        <el-button v-has="`btn.Sku.update`" type="primary" icon="Edit" @click="updateSku"></el-button>
                        <el-button v-has="`btn.Sku.detail`" type="info" icon="infoFilled" @click="findSku(row)"></el-button>
                        <el-popconfirm :title="`确定删除${row.skuName}吗?`" @confirm="removeSku(row.id)" width="170px" icon="Delete" icon-color="red" :hide-after="10">
                            <template #reference>
                                <el-button v-has="`btn.Sku.remove`" type="danger" icon="Delete"></el-button>
                            </template>
                        </el-popconfirm>
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
                @size-change="handler"
                style="margin-top: 6px;"/>
        <!-- 抽屉组件: 用于展示商品详情 -->
            <el-drawer v-model="drawer">
                <template #header>
                    <h4>查看商品的详情</h4>
                </template>
                <template #default>
                    <el-row style="margin: 10px 0px;">
                        <el-col :span="6">名称</el-col>
                        <el-col :span="18">{{ skuInfo.skuName }}</el-col>
                    </el-row>
                    <el-row style="margin: 10px 0px;">
                        <el-col :span="6">描述</el-col>
                        <el-col :span="18">{{ skuInfo.skuDesc }}</el-col>
                    </el-row>
                    <el-row style="margin: 10px 0px;">
                        <el-col :span="6">价格</el-col>
                        <el-col :span="18">{{ skuInfo.price }}</el-col>
                    </el-row>
                    <el-row style="margin: 10px 0px;">
                        <el-col :span="6">平台属性</el-col>
                        <el-col :span="18">
                            <el-tag style="margin: 5px;" v-for="item in skuInfo.skuAttrValueList" :key="item.id">{{ item.valueName }}</el-tag>
                        </el-col>
                    </el-row>
                    <el-row style="margin: 10px 0px;">
                        <el-col :span="6">销售属性</el-col>
                        <el-col :span="18">
                            <el-tag style="margin: 5px;" v-for="item in skuInfo.skuSaleAttrValueList" :key="item.id">{{ item.saleAttrValueName }}</el-tag>
                        </el-col>
                    </el-row>
                    <el-row style="margin: 10px 0px;">
                        <el-col :span="6">商品图片</el-col>
                        <el-col :span="18">
                            <el-carousel :interval="4000" type="card" height="200px">
                                <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
                                    <img :src="item.imgUrl" style="width: 100%; height: 100%;">
                                </el-carousel-item>
                            </el-carousel>
                        </el-col>
                    </el-row>
                </template>
            </el-drawer>
        </el-card>
    </div>
</template>

<script setup lang="ts">
// 引入组合式API函数
import { ref, onMounted } from 'vue'
// 引入SKU相关请求接口
import { reqSkuList, reqSaleSku, reqCancelSale, reqSkuInfo, reqRemoveSku } from '@/api/product/sku'
// 引入SKU相关的数据类型
import { SkuResponseData, SkuData, SkuInfoData } from '@/api/product/sku/type'
// 引入Element-Plus的弹窗提示信息
import { ElMessage } from 'element-plus'

// 分页器默认页码
const pageNo = ref<number>(1)
// 每页默认展示几条数据
const pageSize = ref<number>(3)
// 存储每页总条数与SKU数据
const total = ref<number>()
const skuArr = ref<SkuData[]>([])
// 控制抽屉组件的显示/隐藏
const drawer = ref<boolean>(false)
// 存储SKU商品详情的数据(这里因为数据问题, 定义为any)
const skuInfo = ref<any>({})

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
// 上架下架SKU商品按钮的回调
// 1.上下架判断 2.提示信息 3.重新获取SKU数据
// 若当前商品的isSale == 1, 则是上架状态, 触发回调变为0则是下架状态
const updateSale = async (row: SkuData) => {
    if (row.isSale == 1) {
        await reqCancelSale((row.id  as number))
        ElMessage({type: 'success', message: '下架成功'})
        getHasSku(pageNo.value)
    } else {
        await reqSaleSku((row.id  as number))
        ElMessage({type: 'success', message: '上架成功'})
        getHasSku(pageNo.value)
    }
}
// 更新SKU按钮(没有功能, 仅提示信息)
const updateSku = () => {
    ElMessage({type: 'success', message: '程序员在努力更新中...'})
}
// 查看SKU商品详情按钮的回调
const findSku = async (row: SkuData) => {
    drawer.value = true
// 获取SKU商品详情数据的接口并发起请求
    const result: SkuInfoData = await reqSkuInfo((row.id as number))
    console.log('商品详情获取成功', result)
// 存储SKU商品详情数据
    skuInfo.value = result.data
}
// 删除SKU商品按钮的话回调
// 1.请求删除SKU接口 2.提示信息 3.重新获取SKU数据()
// 删除成功则重新获取SKU数据(若当前页SKU大于1则还是当前页, 若小于1则回到上一页)
const removeSku = async (id: number) => {
    const result: any = await reqRemoveSku(id)
    if (result.code == 200) {
        ElMessage({type: 'success', message: '删除成功'})
        getHasSku(skuArr.value.length > 1 ? pageNo.value : pageNo.value - 1)
    } else {
        ElMessage({type: 'error', message: '系统数据不能删除'})
    }
}
</script>

<style lang="scss" scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>