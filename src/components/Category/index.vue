<template>
    <el-card>
        <el-form inline>
            <el-form-item label="一级分类">
                <el-select v-model="categoryStore.c1Id">
                    <!-- label即为展示数据,  value即为select下拉菜单收集的数据-->
                    <el-option v-for="(c1, index) in categoryStore.c1Arr" :key="c1.id" :label="c1.name" :value="c1.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="二级分类">
                <el-select>
                    <el-option label="北京"></el-option>
                    <el-option label="深圳"></el-option>
                    <el-option label="广州"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="三级分类">
                <el-select>
                    <el-option label="北京"></el-option>
                    <el-option label="深圳"></el-option>
                    <el-option label="广州"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script setup lang="ts">
// 引入生命周期钩子函数
import { onMounted } from 'vue'
// 引入分类接口相关的小仓库
import useCategoryStore from "@/store/modules/category"

// 获取分类接口相关的小仓库
const categoryStore = useCategoryStore()

// 组件挂载完毕, 通知仓库发送获取一级分类数据
onMounted(() => {
    getC1()
})
// 通知仓库获取一级分类数据的方法
const getC1 = () => {
    categoryStore.getC1()
}
</script>

<style lang="scss" scoped>

</style>