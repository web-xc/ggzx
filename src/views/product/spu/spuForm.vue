<template>
    <el-form label-width="100px">
        <el-form-item label="SPU名称">
            <el-input placeholder="请输入SPU名称" v-model="SpuParams.spuName"></el-input>
        </el-form-item>
        <el-form-item label="SPU品牌">
            <el-select v-model="SpuParams.tmId">
                <el-option v-for="(item, index) in AllTradeMark" :key="item.id" :label="item.tmName" :value="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="SPU描述">
            <el-input type="textarea" placeholder="请输入SPU描述" v-model="SpuParams.description"></el-input>
        </el-form-item>
        <el-form-item label="SPU图标">
        <!-- v-model:file-list: 展示默认图片 -->
        <!-- action: 是上传图片的接口地址 -->
        <!-- list-type: 文件列表展示类型 -->
        <!-- :on-preview: 预览图片触发的钩子函数 -->
        <!-- :on-remove: 图片删除触发的钩子函数 -->
            <el-upload
                v-model:file-list="imgLIst"
                action="/api/admin/product/fileUpload"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :before-upload="handerUpload">
                <el-icon><Plus/></el-icon>
            </el-upload>
            <el-dialog v-model="dialogVisible">
                <img w-full :src="dialogImageUrl" alt="SPU商品图片" style="width: 100%; height: 100%;"/>
            </el-dialog>
        </el-form-item>
        <el-form-item label="SPU销售属性">
        <!-- 展示销售属性的下拉菜单 -->
            <el-select v-model="saleAttrIdAndValueName" :placeholder="unSelectSaleAttr.length ? `还有${unSelectSaleAttr.length}个未选择` : '无'">
                <el-option v-for="(item, index) in unSelectSaleAttr" :key="item.id" :label="item.name" :value="`${item.id}:${item.name}`"></el-option>
            </el-select>
            <el-button type="primary" icon="Plus" style="margin-left: 10px;" :disabled="saleAttrIdAndValueName ? false : true" @click="addSaleAttr">添加属性</el-button>
        <!-- table是展示销售属性与属性值的 -->
            <el-table border style="margin: 10px 0px;" :data="saleAttr">
                <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
                <el-table-column label="销售属性名" width="120px" prop="saleAttrName"></el-table-column>
                <el-table-column label="销售属性值">
                    <template #="{row, $index}">
                        <el-tag v-for="(item, index) in row.spuSaleAttrValueList" :key="item.id" @close="row.spuSaleAttrValueList.splice(index, 1)" class="mx-1" closable style="margin: 0px 5px;">
                            {{ item.saleAttrValueName }}
                        </el-tag>
                        <el-input v-if="row.flag == true" v-model="row.saleAttrValue" @blur="toLook(row)" placeholder="请输入属性值" style="width: 110px; margin: 6px;" ></el-input>
                        <el-button v-else type="success" size="small" icon="Plus" @click="toEdit(row)"></el-button>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="120px">
                    <template #="{row, $index}">
                        <el-button type="danger" size="small" icon="Delete" @click="saleAttr.splice($index, 1)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="save" :disabled="saleAttr.length > 0 ? false : true">保存</el-button>
            <el-button type="primary" plain @click="cancel">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup lang="ts">
// 引入组合式API函数
import { ref, computed } from 'vue'
// 引入获取三级分类下的SPU数据接口
import { reqAllTradeMark, reqSpuImageList, reqSpuHasSaleAttr, reqAllSaleAttr, reqAddOrUpdateSpu } from '@/api/product/spu'
// 引入SPU相关数据的数据类型
import type { AllTradeMark, SpuHasImg, SaleAttrResponseData, HasSaleAttrResponseData, Trademark, SpuData, SpuImg, SaleAttr, HasSaleAttr, SaleAttrValue } from "@/api/product/spu/type"
// 引入Element-Plus的弹窗提示信息
import { ElMessage } from 'element-plus'

// 接收父组件的自定义事件
const $emit = defineEmits(['changeScene'])
// 点击取消按钮的回调(通知父组件切换场景为1, 展示SPU数据)(因为判断页码原因, 使用对象形式, 默认取消返回当前页)
const cancel = () => {
    $emit('changeScene', {flag: 0, params: 'update'})
}
// 存储全部SPU品牌数据
const AllTradeMark = ref<Trademark[]>([])
// 存储SPU品牌下的全部商品图片
const imgLIst = ref<SpuImg[]>([])
// 存储SPU销售属性
const saleAttr = ref<SaleAttr[]>([])
// 存储SPU全部销售属性
const allSaleAttr = ref<HasSaleAttr[]>([])
// 存储完整的SPU数据对象
const SpuParams = ref<SpuData>({
    category3Id: '',    // 三级分类id
    spuName: '',        // SPU名称
    description: '',    // SPU描述
    tmId: '',           // SPU品牌的id
    spuImageList: [],
    spuSaleAttrList: []
})
// 控制图片预览对话框的显示/隐藏
const dialogVisible = ref<boolean>(false)
// 存储预览图片的地址
const dialogImageUrl = ref<string>('')
// 存储收集未选择的销售属性的ID和属性值名字
const saleAttrIdAndValueName = ref<string>('')

// 给子组件写一个方法(对外暴露, 让其父组件获取子组件vc)
const initHasSpuData = async (spu: SpuData) => {
// 存储完整的SPU数据对象
    SpuParams.value = spu
// spu是父组件传递过来的SPU对象(不完整)
    console.log('SPU不完整数据获取成功', spu)
// 获取全部SPU品牌的数据
    const result: AllTradeMark = await reqAllTradeMark()
    console.log('SPU全部品牌数据获取成功', result)
// 获取某一个SPU品牌下的全部商品图片
    const result1: SpuHasImg = await reqSpuImageList((spu.id as number))
    console.log('SPU品牌图片获取成功', result1)
// 获取某一个SPU品牌下的全部销售属性
    const result2: SaleAttrResponseData = await reqSpuHasSaleAttr((spu.id as number))
    console.log('SPU某一个品牌销售属性获取成功', result2)
// 获取SPU全部的销售属性
    const result3: HasSaleAttrResponseData = await reqAllSaleAttr()
    console.log('获取SPU全部的销售属性', result3)
// 存储全部SPU品牌数据、存储SPU品牌商品图片、存储SPU销售属性、存储SPU全部销售属性
    AllTradeMark.value = result.data
// 通过Map方法修改数据为对象类型
    imgLIst.value = result1.data.map(item => {
        return {
            name: item.imgName,
            url: item.imgUrl
        }
    })
    saleAttr.value = result2.data
    allSaleAttr.value = result3.data
}
// 照片墙组件点击预览时触发的钩子函数(点击图片预览显示对话框, 再通过file赋值给dialogImageUrl)
const handlePictureCardPreview = (file: any) => {
    dialogVisible.value = true
    dialogImageUrl.value = file.url
}
// 照片墙删除图片时触发的钩子函数
const handleRemove = () => {
    
}
// 照片墙图片上传成功之前触发的钩子函数(可约束文件大小与类型)
const handerUpload = (file: any) => {
    if (file.type == 'image/png' || file.type == 'image/jpeg' || file.type == 'image/gif') {
        if (file.size / 1024 / 1024 < 4) {
            ElMessage({
                type: 'success',
                message: '上传文件成功'
            })
            return true
        } else {
            ElMessage({
                type: 'error',
                message: '上传文件大小超过4M 请重新上传'
            })
            return false
        }
    } else {
        ElMessage({
                type: 'error',
                message: '上传文件格式必须为 PNG | JPG | GIF'
            })
        return false
    }
}
// 计算出当前SPU未拥有的销售熟悉
// 全部销售属性: 颜色 版本 尺寸, 已有销售属性: 颜色 版本
const unSelectSaleAttr = computed(() => {
    const unSelectArr = allSaleAttr.value.filter(item => {
        return saleAttr.value.every(item1 => {
            return item.name != item1.saleAttrName
        })
    })
    return unSelectArr
})

// 添加销售属性的回调
const addSaleAttr = () => {
    const [baseSaleAttrId, saleAttrName] = saleAttrIdAndValueName.value.split(':')
// 准备新的销售属性对象: 将来带给服务器
    const newSaleAttr: SaleAttr = {
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: []
    }
// 追加到SPU销售属性的数组中
    saleAttr.value.push(newSaleAttr)
// 清空收集的数据
    saleAttrIdAndValueName.value = ''
}
// 添加销售属性值按钮的回调
const toEdit = (row: SaleAttr) => {
    row.flag = true
    row.saleAttrValue = ''
}
// 表单失去焦点的回调
const toLook = (row: SaleAttr) => {
// 整理收集属性ID/属性值名字
    const { baseSaleAttrId, saleAttrValue } = row
// 整理成服务器需要的属性值形式
    const newSaleAttrValue: SaleAttrValue = {
        baseSaleAttrId,
        saleAttrValueName: (saleAttrValue as string)
    }
// 非空情况判断
    if ((saleAttrValue as string).trim() == '') {
        ElMessage({
            type: 'error',
            message: '属性值不能为空'
        })
        return
    }
// 判断属性值是否重复
    const repeat =  row.spuSaleAttrValueList.find(item => {
        return item.saleAttrValueName == saleAttrValue
    })
    if (repeat) {
        ElMessage({
            type: 'error',
            message: '属性值重复'
        })
        return
    }
// 追加新的属性值对象
    row.spuSaleAttrValueList.push(newSaleAttrValue)
// 切换为查看模式
    row.flag = false
}
// 保存按钮的回调(整理参数)
const save = async () => {
// 1. 照片墙的数据 
    SpuParams.value.spuImageList = imgLIst.value.map((item: any) => {
        return {
            imgName: item.name, // 图片名字
            imgUrl: (item.response && item.response.data) || item.url
        }
    })
// 2. 整理销售属性的数据
    SpuParams.value.spuSaleAttrList = saleAttr.value
// 3. 发送请求: 添加或更新SPU数据
    const result = await reqAddOrUpdateSpu(SpuParams.value)
    if (result.code) {
        ElMessage({
            type: 'success',
            message: SpuParams.value.id ? '更新成功' : '添加成功'
        })
// 4. 请求成功则通知父组件切换场景0(再告诉父组件是修改还是添加)
        $emit('changeScene', {flag: 0, params: SpuParams.value.id ? 'update' : 'add'}) 
    } else {
        ElMessage({
            type: 'error',
            message: SpuParams.value.id ? '更新失败' : '添加失败'
        })
    }
}
// 添加SPU品牌的请求回调
const initAddSpu = async (c3Id: number | string) => {
// 每次点击添加品牌, 清空上一次的数据(因图片、销售属性值是另外存储合并的, 所以单独清空, 其他用assign合并清空)
    Object.assign(SpuParams.value, {
        category3Id: '',    // 三级分类id
        spuName: '',        // SPU名称
        description: '',    // SPU描述
        tmId: '',           // SPU品牌的id
        spuImageList: [],
        spuSaleAttrList: []
    })
    imgLIst.value = []
    saleAttr.value = []
    saleAttrIdAndValueName.value = '' // 清空销售属性
// 存储三级分类id
    SpuParams.value.category3Id = c3Id
// 获取全部SPU品牌的数据
    const result: AllTradeMark = await reqAllTradeMark()
// 获取SPU全部的销售属性
    const result1: HasSaleAttrResponseData = await reqAllSaleAttr()
// 存储全部SPU品牌数据、存储SPU全部销售属性
    AllTradeMark.value = result.data
    allSaleAttr.value = result1.data
}
// 对外暴露
defineExpose({ initHasSpuData, initAddSpu })
</script>

<style scoped>

</style>