<template>
    <div>
        <el-card>
            <!-- 卡片顶部添加品牌按钮 -->
            <el-button type="primary" size="default" icon="Plus" @click="addTrademark">添加品牌</el-button>
            <!-- 表格组件: 用于展示已有的平台数据 -->
            <!-- 1. border: 设置表格是否有边框 -->
            <!-- 2. label: 列表名称 3. width: 表格列的宽度 4. align: 列的对齐方式 -->
            <el-table style="margin: 10px 0px;" border :data="trademarkArr">
                <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
                <el-table-column label="品牌名称">
            <!-- table-column: 默认展示数据用的div, 可使用插槽自定义结构 -->
                    <template #="{row, $index}">
                        <p>{{ row.tmName }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="品牌LOGO">
                    <template #="{ row, $index }">
                        <img :src="row.logoUrl" style="width: 60px; height: 60px; border-radius: 8px;">
                    </template>
                </el-table-column>
                <el-table-column label="品牌操作">
                    <template #="{ row, $index }">
                        <el-button type="warning" size="default" icon="Edit" @click="updateTrademark(row)"></el-button>
                        <el-popconfirm :title="`确定删除${row.tmName}吗?`" width="170px" icon="Delete" icon-color="red" @confirm="removeTrademark(row.id)" :hide-after="10">
                            <template #reference>
                                <el-button type="danger" size="default" icon="Delete"></el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页器组件 -->
            <!-- v-model:current-pag: 设置当前页码 -->
            <!-- v-model:page-size: 设置每页展示几条数据 -->
            <!-- :page-sizes: 设置下拉菜单数据 -->
            <!-- :background: 设置分页器按钮颜色 -->
            <!-- layout: 设置分页器6个子组件布局(->符号调整样式) -->
            <el-pagination
                v-model:current-page="pageNo"
                v-model:page-size="limit"
                :page-sizes="[2, 5, 6]"
                :background="true"
                layout="prev, pager, next, jumper, ->, sizes, total"
                :total="total"
                @current-change="getHasTrademark"
                @size-change="sizeChange"/>
        </el-card>
        <!-- 对话框组件: 添加品牌与修改品牌业务时使用的结构 -->
        <!-- v-model: 控制对话框显示隐藏/true/false -->
        <!-- title: 设置对话框左上角标题 -->
        <el-dialog v-model="dialogFormVisible" :title="trademarkParams.id ? '修改品牌' : '添加品牌'">
            <el-form style="width: 50%;" :model="trademarkParams" :rules="rules" ref="formRef">
                <el-form-item label="品牌名称" label-width="100px" prop="tmName">
                    <el-input placeholder="请您输入品牌名称" v-model="trademarkParams.tmName"></el-input>
                </el-form-item>
                <el-form-item label="品牌Logo" label-width="100px" prop="logoUrl">
        <!-- action: 图片上传路径, 要配置/api, 否则代理服务器不发送请求 -->
        <!-- :before-upload: 上传图片之前调用的钩子函数(可约束文件类型与大小) -->
        <!-- :on-success: 图片上传成功时调用的钩子函数 -->
                    <el-upload class="avatar-uploader" action="/api/admin/product/fileUpload" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="trademarkParams.logoUrl" :src="trademarkParams.logoUrl" class="avatar"/>
                        <el-icon v-else class="avatar-uploader-icon"><Plus/></el-icon>
                    </el-upload>
                </el-form-item>
            </el-form>
        <!-- 对话框取消/确定按钮: 使用具名插槽footer -->
            <template #footer>
                <el-button type="primary" size="default" @click="cancel">取消</el-button>
                <el-button type="primary" size="default" @click="confirm">确定</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
// 引入组合式API函数
import { ref, onMounted, reactive, nextTick } from 'vue'
import { reqHasTrademark, reqAddOrUpdateTrademark, reqDeleteTrademark } from '@/api/product/trademark/index'
// 引入TS定义的数据类型
import type { Records, TradeMarkResponseData, TradeMark } from "@/api/product/trademark/type"
// 引入上传图片相关数据类型/ElMessage提示框
import { ElMessage, UploadProps } from 'element-plus'

// 当前页码/每页展示多少条数据
const pageNo = ref<number>(1)
const limit = ref<number>(3)
// 存储已有品牌数据总条数
const total = ref<number>(0)
// 存储已有品牌数据
const trademarkArr = ref<Records>([])
// 控制对话框的显示/隐藏
const dialogFormVisible = ref<boolean>(false)
// 定义收集添加品牌的数据
const trademarkParams = reactive<TradeMark>({
    tmName: '',
    logoUrl: ''
})
// 获取el-form组件实例(用于对话框组件校验规则)
const formRef = ref()

// 获取已有品牌的接口并封装为函数, 在任何情况下获取数据, 调用函数即可
// 1. 当前页码发生变化时会触发, 并发起请求获取对应品牌数据
// 2. 当前页码变化时, pagination父组件回传了数据(当前页码)
const getHasTrademark = async (pages = 1) => {
// 当每页数据发生变化时, 当前页码归1
    pageNo.value = pages
    const result: TradeMarkResponseData = await reqHasTrademark(pageNo.value, limit.value)
    console.log(result)
// 存储已有品牌的总条数、品牌数据
    total.value = result.data.total
    trademarkArr.value = result.data.records
}
// 组件挂载完毕则调用函数发送一次请求, 并获取数据
onMounted(() => {
    getHasTrademark()
})
// 当下拉菜单发生变化时调用此方法, 这个自定义事件也会将数据回传给父组件
const sizeChange = () => {
// 第一种写法: 当每页数据发生变化时, 当前页码归1
// pageNo.value = 1
// 第二种写法: 当调用请求方法没传参时, 默认当前页码为1
    getHasTrademark()
}
// 添加品牌按钮的回调
const addTrademark = () => {
    dialogFormVisible.value = true // 对话框显示
// 每次点击添加品牌按钮时, 应清空对话框信息 (也要清空id, 因为使用的是ES6拷贝对象)
    trademarkParams.id = 0
    trademarkParams.tmName = ''
    trademarkParams.logoUrl = ''
// 清除校验规则错误信息(第一种写法：TS问号语法)
    // formRef.value?.clearValidate('tmName')
    // formRef.value?.clearValidate('logoUrl')
// 第二种写法: nextTick语法
    nextTick(() => {
        formRef.value.clearValidate('tmName')
        formRef.value.clearValidate('logoUrl')
    })
}
// 编辑品牌按钮的回调
// row是当前品牌数据
const updateTrademark = (row: TradeMark) => {
// 清除校验规则错误信息(nextTick写法不知道为什么报错, 暂时使用TS问号语法)
    formRef.value?.clearValidate('tmName')
    formRef.value?.clearValidate('logoUrl')

    dialogFormVisible.value = true
// 显示当前品牌数据: ES6语法合并对象, 将已有品牌数据row拷贝赋值给trademarkParams对象
    Object.assign(trademarkParams, row)
}
// 对话框底部取消/确定按钮的回调
const cancel = () => {
    dialogFormVisible.value = false // 对话框隐藏
}
// 确定按钮的功能: 对话框收集数据后发送请求的方法
const confirm = async () => {
// 在发送请求之前, 对整个表单进行校验(调用方法,若校验通过,会返回成功的Promiss, 再执行后面语法)
    await formRef.value.validate()

    const result: any = await reqAddOrUpdateTrademark(trademarkParams)
    console.log(result)
    if (result.code == 200) {
        dialogFormVisible.value = false // 关闭对话框
// 弹出提示信息
        ElMessage({
            type: 'success',
// 动态指定message是修改还是添加品牌的提示信息
            message: trademarkParams.id ? '修改品牌成功' : '添加品牌成功'
        })
// 再次发送请求获取全部品牌数据(若是修改品牌, 则留在当前页)
        getHasTrademark(trademarkParams.id ? pageNo.value : 1) 
    } else {
        dialogFormVisible.value = false
        ElMessage({
            type: 'error',
            message: trademarkParams.id ? '修改品牌失败' : '添加品牌失败'
        })
    }
}
// 上传图片组件: 上传图片成功之前调用的钩子函数
// 上传文件之前约束文件类型与大小, 这里限制了文件格式与文件大小, 并用了ElMessage提示框
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    console.log(rawFile)   
    if (rawFile.type == 'image/png' || rawFile.type == 'image/jpeg' || rawFile.type == 'image/gif') {
        if (rawFile.size / 1024 / 1024 < 4) {
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
// 图片上传成功时调用的钩子函数
// response是上传图片请求成功后返回的数据
const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
// 将response返回的图片url赋值给定义好的变量, 并在el-upload组件中回显图片
    trademarkParams.logoUrl = response.data
    console.log(response)
// 图片上传成功后, 清除校验规则错误信息
    formRef.value.clearValidate('logoUrl')
}
// 添加品牌自定义校验规则的方法
const validatorTmName = (rule: any, value: any, callBack: any) => {
    if (value.trim().length >= 2) {
        callBack()
    } else {
// 校验未通过则返回错误提示信息
        callBack(new Error('品牌名称要大于等于两位'))
    }
}
const validatorLogoUrl = (rule: any, value: any, callBack: any) => {
    if (value) {
        callBack()
    } else {
        callBack(new Error('LOGO图片务必上传'))
    }
}
// 表单校验规则对象
const rules = {
    tmName: [{required: true, trigger: 'blur', validator: validatorTmName}],
    logoUrl:[{required: true, validator: validatorLogoUrl}]
}
// 气泡确认框确定按钮的回调
// 点击确定按钮并发送删除请求, 成功删除则重新获取品牌数据并弹出提示信息
const removeTrademark = async (id: number) => {
    const result = await reqDeleteTrademark(id)
    console.log(result)
    if (result.code == 200) {
        ElMessage({
            type: 'success',
            message: '删除品牌成功'
        })
// 删除成功则重新获取品牌数据(若当前页品牌大于1则还是当前页, 若小于1则回到上一页)
        getHasTrademark(trademarkArr.value.length > 1 ? pageNo.value : pageNo.value -1)
    } else {
        ElMessage({
            type: 'error',
            message: '删除品牌失败'
        })
    }
}
</script>

<style scoped>
.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}
.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}
.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>