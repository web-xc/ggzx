<template>
    <div>
        <el-form label-width="100px">
            <el-form-item label="SKU名称">
                <el-input placeholder="SKU名称"></el-input>
            </el-form-item>
            <el-form-item label="价格(元)">
                <el-input type="number" placeholder="价格(元)"></el-input>
            </el-form-item>
            <el-form-item label="重量(克)">
                <el-input placeholder="重量(克)"></el-input>
            </el-form-item>
            <el-form-item label="SKU描述">
                <el-input type="textarea" placeholder="SKU描述"></el-input>
            </el-form-item>
            <el-form-item label="平台属性">
                <el-form inline>
                    <el-form-item v-for="(item, index) in attrArr" :key="item.id" :label="item.attrName">
                        <el-select>
                            <el-option v-for="(attValue, index) in item.attrValueList" :key="attValue.id" :label="attValue.valueName"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-form-item>
            <el-form-item label="销售属性">
                <el-form inline>
                    <el-form-item v-for="(item, index) in saleArr" :key="item.id" :label="item.saleAttrName">
                        <el-select>
                            <el-option v-for="(saleAttrValue, index) in item.spuSaleAttrValueList" :key="saleAttrValue.id" :label="saleAttrValue.saleAttrValueName"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-form-item>
            <el-form-item label="图片名称">
                <el-table border :data="imgArr">
                    <el-table-column type="selection" width="80px" align="center"></el-table-column>
                    <el-table-column label="图片">
                        <template #="{row, $index}">
                            <img :src="row.imgUrl" style="width: 100px; height: 100px;">
                        </template>
                    </el-table-column>
                    <el-table-column label="名称" prop="imgName"></el-table-column>
                    <el-table-column label="操作">
                        <template #="{row, $index}">
                            <el-button type="warning">设置默认</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">保存</el-button>
                <el-button type="primary" plain @click="cancel">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
// 引入组合式API函数
import { ref } from 'vue'
// 接收父组件的自定义事件
const $emit = defineEmits(['changeScene'])
// 引入分类属性与属性值请求接口
import { reqAttr } from '@/api/product/attr'
// 引入SPU品牌全部销售属性/全部商品图片请求接口
import { reqSpuHasSaleAttr, reqSpuImageList } from '@/api/product/spu'

// 存储平台属性
const attrArr = ref<any>()
// 存储销售属性
const saleArr = ref<any>()
// 存储照片墙数据
const imgArr = ref<any>()

// 点击取消按钮的回调
const cancel = () => {
    $emit('changeScene', {flag: 0, params: ''})
}
// 当前子组件的方法对外暴露(让父组件将数据传递过来, 并调用当前方法)
const initSkuData = async (c1Id: number, c2Id: number, spu: any) => {
// 获取平台属性
    const result: any = await reqAttr(c1Id, c2Id, spu.category3Id)
    console.log('平台属性获取成功', result)
// 获取对应的销售属性
    const result1: any = await reqSpuHasSaleAttr(spu.id)
    console.log('销售属性获取成功', result1)
// 获取照片墙数据 
    const result2: any = await reqSpuImageList(spu.id)   
    console.log('照片墙获取成功', result2)
// 存储平台属性、销售属性、照片墙数据
    attrArr.value = result.data
    saleArr.value = result1.data
    imgArr.value = result2.data
}
// 对外暴露当前子组件方法
defineExpose({ initSkuData })
</script>

<style scoped>

</style>