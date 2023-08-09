<template>
    <div>
        <el-form label-width="100px">
            <el-form-item label="SKU名称">
                <el-input placeholder="SKU名称" v-model="skuParams.skuName"></el-input>
            </el-form-item>
            <el-form-item label="价格(元)">
                <el-input type="number" placeholder="价格(元)" v-model="skuParams.price"></el-input>
            </el-form-item>
            <el-form-item label="重量(克)">
                <el-input placeholder="重量(克)" v-model="skuParams.weight"></el-input>
            </el-form-item>
            <el-form-item label="SKU描述">
                <el-input type="textarea" placeholder="SKU描述" v-model="skuParams.skuDesc"></el-input>
            </el-form-item>
            <el-form-item label="平台属性">
                <el-form inline>
                    <el-form-item v-for="(item, index) in attrArr" :key="item.id" :label="item.attrName">
                        <el-select v-model="item.attrIdAndValueId">
                            <el-option v-for="(attrValue, index) in item.attrValueList" :key="attrValue.id" :label="attrValue.valueName" :value="`${item.id}:${attrValue.id}`"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-form-item>
            <el-form-item label="销售属性">
                <el-form inline>
                    <el-form-item v-for="(item, index) in saleArr" :key="item.id" :label="item.saleAttrName">
                        <el-select v-model="item.saleIdAndValueId">
                            <el-option v-for="(saleAttrValue, index) in item.spuSaleAttrValueList" :key="saleAttrValue.id" :label="saleAttrValue.saleAttrValueName" :value="`${item.id}:${saleAttrValue.id}`"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-form-item>
            <el-form-item label="图片名称">
                <el-table border :data="imgArr" ref="table">
                    <el-table-column type="selection" width="80px" align="center"></el-table-column>
                    <el-table-column label="图片">
                        <template #="{row, $index}">
                            <img :src="row.imgUrl" style="width: 100px; height: 100px;">
                        </template>
                    </el-table-column>
                    <el-table-column label="名称" prop="imgName"></el-table-column>
                    <el-table-column label="操作">
                        <template #="{row, $index}">
                            <el-button type="warning" @click="handler(row)">设置默认</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="save">保存</el-button>
                <el-button type="primary" plain @click="cancel">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
// 引入组合式API函数
import { ref, reactive } from 'vue'
// 接收父组件的自定义事件
const $emit = defineEmits(['changeScene'])
// 引入分类属性与属性值请求接口
import { reqAttr } from '@/api/product/attr'
// 引入SPU品牌全部销售属性/全部商品图片请求接口
import { reqSpuHasSaleAttr, reqSpuImageList, reqAddSku } from '@/api/product/spu'
// 引入SKU相关数据的数据类型
import type { SkuData } from "@/api/product/spu/type"
// 引入Element-Plus的弹窗提示信息
import { ElMessage } from 'element-plus'

// 存储平台属性
const attrArr = ref<any>()
// 存储销售属性
const saleArr = ref<any>()
// 存储照片墙数据
const imgArr = ref<any>()
// 收集SKU数据的参数
const skuParams = reactive<SkuData>({   
// 前三个是父组件传递过来的数据
    category3Id: '', // 三级分类id
    spuId: '',       // 已有的SPU的id
    tmId: '',        // SPU品牌id
// 通过v-model收集数据
    skuName: '',     // sku名称
    price: '',       // sku价格
    weight: '',      // sku重量
    skuDesc: '',           // sku描述
    skuAttrValueList: [    // 平台属性收集
        // { 
        //     attrId: '',    // 平台属性id
        //     valueId: ''    // 属性值id
        // }
    ],
    skuSaleAttrValueList: [     // 销售属性
        // {
        //     saleAttrId: '',     // 属性id
        //     saleAttrValueId: '' // 属性值id
        // }
    ],
    skuDefaultImg: ''           // sku图片地址
})
// 获取table组件实例(用于控制设置默认图片后勾选当前项)
const table = ref<any>()

// 点击取消按钮的回调
const cancel = () => {
    $emit('changeScene', {flag: 0, params: ''})
}
// 当前子组件的方法对外暴露(让父组件将数据传递过来, 并调用当前方法)
const initSkuData = async (c1Id: number, c2Id: number, spu: any) => {
// 收集父组件传递过来的数据
    skuParams.category3Id = spu.category3Id
    skuParams.spuId = spu.id
    skuParams.tmId = spu.tmId
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
// 设置SKU默认图片按钮的回调
const handler = (row: any) => {
// 复选框选中当前项(点击时, 全部复选框不勾选, 旋转的图片才勾选)
    imgArr.value.forEach((item: any) => {
        table.value.toggleRowSelection(item, false)
    })
    table.value.toggleRowSelection(row, true)
// 收集图片地址
    skuParams.skuDefaultImg = row.imgUrl
}
// 保存SKU数据按钮的回调
const save = async () => {
// 1.整理平台参数
    skuParams.skuAttrValueList = attrArr.value.reduce((prev: any, next: any) => {
        if (next.attrIdAndValueId) {
            const [ attrId, valueId ] = next.attrIdAndValueId.split(':')
            prev.push({
                attrId,
                valueId
            })
        }
        return prev
    }, [])
// 2.整理销售属性
    skuParams.skuSaleAttrValueList = saleArr.value.reduce((prev: any, next: any) => {
        if (next.saleIdAndValueId) {
            const [ saleAttrId, saleAttrValueId ] = next.saleIdAndValueId.split(':')
            prev.push({
                saleAttrId,
                saleAttrValueId
            })
        }
        return prev
    }, [])
// 3.添加SKU的请求接口
    const result = await reqAddSku(skuParams)
    console.log('添加SKU成功', result)
    if (result.code == 200) {
        ElMessage({
            type: 'success',
            message: '添加SKU成功'
        })
// 通知父组件切换场景为0
        $emit('changeScene', { flag: 0, params: '' })
        return true
    } else {
        ElMessage({
            type: 'error',
            message: '添加SKU失败'
        })
        return false
    }
}
// 对外暴露当前子组件方法
defineExpose({ initSkuData })
</script>

<style scoped>

</style>