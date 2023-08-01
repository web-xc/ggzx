<template>
    <div>
        <el-card class="box-card">
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
                        <el-button type="primary" size="small" icon="Edit" @click="updateTrademark(row)"></el-button>
                        <el-button type="primary" size="small" icon="Delete"></el-button>
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
            <el-form style="width: 50%;">
                <el-form-item label="品牌名称" label-width="80px">
                    <el-input placeholder="请您输入品牌名称" v-model="trademarkParams.tmName"></el-input>
                </el-form-item>
                <el-form-item label="品牌Logo" label-width="80px">
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
import { ref, onMounted, reactive } from 'vue'
import { reqHasTrademark, reqAddOrUpdateTrademark } from '@/api/product/trademark/index'
// 引入TS定义的数据类型
import type { Records, TradeMarkResponseData, TradeMark } from "@/api/product/trademark/type"
// 引入上传图片相关数据类型/ElMessage提示框
import { ElMessage, UploadProps } from 'element-plus'

// 当前页码, 每页展示多少条数据
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
}
// 编辑品牌按钮的回调
// row是当前品牌数据
const updateTrademark = (row: TradeMark) => {
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