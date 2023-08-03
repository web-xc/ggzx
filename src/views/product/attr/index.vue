<template>
    <div>
        <!-- 三级分类全局组件 -->
        <Category :scene="scene"></Category>
        <el-card style="margin: 10px 0px;">
            <div v-show="scene == 0">
                <el-button type="primary" size="default" icon="Plus" :disabled="categoryStore.c3Id ? false : true" @click="addAttr">添加属性</el-button>
                <el-table style="margin: 10px 0px;" border :data="attrArr">
                    <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
                    <el-table-column label="属性名称" width="120px" prop="attrName"></el-table-column>
                    <el-table-column label="属性值名称">
                        <template #="{row, $index}">
                            <el-tag v-for="(item, index) in row.attrValueList" :key="item.id" style="margin: 3px;">{{ item.valueName }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="130px">
                        <template #="{row, $index}">
                            <el-button type="warning" size="default" icon="Edit" @click="updateAttr"></el-button>
                            <el-button type="danger" size="default" icon="Delete"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div v-show="scene == 1">
                <!-- 添加属性与修改属性的结构 -->
                <el-form inline>
                    <el-form-item label="属性名称">
                        <el-input placeholder="请输入属性名称"></el-input>
                    </el-form-item>
                </el-form>
                <el-button type="primary" size="default" icon="Plus">添加属性</el-button>
                <el-button type="primary" size="default" plain @click="cancel">取消</el-button>
                <el-table border style="margin: 10px 0px;">
                    <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
                    <el-table-column label="属性值名称"></el-table-column>
                    <el-table-column label="属性值操作"></el-table-column>
                </el-table>
                <el-button type="primary" size="default">保存</el-button>
                <el-button type="primary" size="default" plain @click="cancel">取消</el-button>
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
// 引入组合式API函数watch
import { watch, ref, reactive } from 'vue'
// 引入分类接口相关的小仓库
import useCategoryStore from "@/store/modules/category"
// 引入获取属性与属性值的接口方法
import { reqAttr } from '@/api/product/attr'
// 引入属性与属性值的数据类型
import type { AttrResponseData, Attr } from '@/api/product/attr/type'

// 存储属性与属性值
const attrArr = ref<Attr[]>([])
// 定义card组件内容切换, 用于展示添加与修改属性的结构/动态禁用下拉菜单(0显示/1隐藏)
const scene = ref<number>(0)
// 获取分类接口相关的小仓库、获取属性与属性值接口
const categoryStore = useCategoryStore()
// 收集新增属性对象的数据(新增属性的名称、新增属性值数组、三级分类ID、代表是三级分类)
const attrParams = reactive<Attr>({
    attrName: '',
    attrValueList: [],
    categoryId: '',
    categoryLevel: 3
})

// 监听仓库三级分类ID变化
watch(() => categoryStore.c3Id, () => {
// 若三级分类ID发生变化, 则清空上一次查询的属性与属性值
    attrArr.value = []
// 保证三级分类得到才能发起请求
    if (!categoryStore.c3Id) return
    getAttr()
})
// 获取分类下的属性与属性值的方法
const getAttr = async () => {
    const { c1Id, c2Id, c3Id } = categoryStore
    const result: AttrResponseData = await reqAttr(c1Id, c2Id, c3Id)
    console.log('属性值', result)
    if (result.code == 200) {
        attrArr.value = result.data
    }
}
// 添加属性按钮的回调
const addAttr = () => {
    scene.value = 1
}
// 修改属性按钮的回调
const updateAttr = () => {
    scene.value = 1
}
// 取消按钮的回调
const cancel = () => {
    scene.value = 0
}
</script>

<style lang="scss" scoped>

</style>