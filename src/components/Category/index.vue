<template>
    <el-card>
        <el-form inline>
            <el-form-item label="一级分类">
                <el-select v-model="categoryStore.c1Id" @change="handler" :disabled="scene == 0 ? false : true">
                    <!-- label即为展示数据,  value即为select下拉菜单收集的数据-->
                    <el-option v-for="(c1, index) in categoryStore.c1Arr" :key="c1.id" :label="c1.name" :value="c1.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="二级分类">
                <el-select v-model="categoryStore.c2Id" @change="handler1" :disabled="scene == 0 ? false : true">
                    <el-option v-for="(c2, index) in categoryStore.c2Arr" :key="c2.id" :label="c2.name" :value="c2.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="三级分类">
                <el-select v-model="categoryStore.c3Id" :disabled="scene == 0 ? false : true">
                    <el-option v-for="(c3, index) in categoryStore.c3Arr" :key="c3.id" :label="c3.name" :value="c3.id"></el-option>
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
// 接收父组件传递过来的scene(用于禁用下拉菜单)
defineProps(['scene'])

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
// 此方法是一级分类下拉菜单change事件(选中值, 保证有一级分类ID)
const handler = () => {
// 当一级分类数据id发生变化时, 需将二、三级分类数据清空
    categoryStore.c2Id = ''
    categoryStore.c3Arr = []
    categoryStore.c3Id = ''

    categoryStore.getC2()
}
// 此方法是二级分类下拉菜单change事件(选中值, 保证有二级分类ID)
const handler1 = () => {
// 当二级分类数据id发生变化时, 需将三级分类数据清空
    categoryStore.c3Id = ''

    categoryStore.getC3()
}
</script>

<style lang="scss" scoped>

</style>