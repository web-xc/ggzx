<template>
    <div>
        <!-- 三级分类全局组件 -->
        <Category :scene="scene"></Category>
        <el-card style="margin: 10px 0px;">
            <div v-show="scene == 0">
                <el-button v-has="`btn.Attr.add`" type="primary" size="default" icon="Plus" :disabled="categoryStore.c3Id ? false : true" @click="addAttr">添加属性</el-button>
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
                            <el-button v-has="`btn.Attr.update`" type="warning" size="default" icon="Edit" @click="updateAttr(row)"></el-button>
                            <el-popconfirm :title="`确定删除${row.attrName}吗?`" @confirm="deleteAttr(row.id)" width="170px" icon="Delete" icon-color="red" :hide-after="10">
                                <template #reference>
                                    <el-button v-has="`btn.Attr.remove`" type="danger" size="default" icon="Delete"></el-button>
                                </template>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div v-show="scene == 1">
                <!-- 添加属性与修改属性的结构 -->
                <el-form inline>
                    <el-form-item label="属性名称">
                        <el-input placeholder="请输入属性名称" v-model="attrParams.attrName"></el-input>
                    </el-form-item>
                </el-form>
                <el-button type="primary" size="default" icon="Plus" @click="addAttrValue" :disabled="attrParams.attrName ? false : true">添加属性</el-button>
                <el-button type="primary" size="default" plain @click="cancel">取消</el-button>
                <el-table border style="margin: 10px 0px;" :data="attrParams.attrValueList">
                    <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
                    <el-table-column label="属性值名称">
                        <template #="{row, $index}">
                            <el-input size="default" placeholder="请输入属性值名称" v-model="row.valueName" v-if="row.flag" @blur="toLook(row, $index)" :ref="(vc: any) => inputArr[$index] = vc"></el-input>
                            <div v-else @click="toEdit(row, $index)">{{ row.valueName }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="属性值操作">
                        <template #="{row, index}">
                            <el-button type="danger" size="default" icon="Delete" @click="attrParams.attrValueList.splice(index, 1)"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button type="primary" size="default" @click="save" :disabled="attrParams.attrValueList.length > 0 ? false : true">保存</el-button>
                <el-button type="primary" size="default" plain @click="cancel">取消</el-button>
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
// 引入组合式API函数
import { watch, ref, reactive, nextTick, onBeforeUnmount } from 'vue'
// 引入分类接口相关的小仓库
import useCategoryStore from "@/store/modules/category"
// 引入获取属性与属性值、添加或修改属性、删除属性的接口方法
import { reqAttr, reqAddOrUpdateAttr, reqRemoveAttr } from '@/api/product/attr'
// 引入属性与属性值的数据类型
import type { AttrResponseData, Attr, AttrValue } from '@/api/product/attr/type'
// 引入Element-Plus的提示信息组件
import { ElMessage } from 'element-plus'

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
// 定义一个数组(存储el-input组件实例)
const inputArr = ref<any>([])

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
// 每次点击时, 先清空上次数据, 再收集数据
    Object.assign(attrParams, {
        attrName: '',
        attrValueList: [],
        categoryId: categoryStore.c3Id,
        categoryLevel: 3
    })
    scene.value = 1
// 点击该按钮时, 收集新增属性的三级分类ID(可以在清空数据时, 将三级ID带上去)
// attrParams.categoryId = categoryStore.c3Id
}
// 修改属性按钮的回调
const updateAttr = (row: Attr) => {
    scene.value = 1
// 将已有属性通过row传递并赋值给attrParams对象(通过assign合并对象)
// 这里由于直接通过assign合并对象是浅拷贝, 导致修改数据会同步更新导致页面数据产生Bug(通过JSON.parse实现深拷贝)
    Object.assign(attrParams, JSON.parse(JSON.stringify(row)))
}
// 取消按钮的回调
const cancel = () => {
    scene.value = 0
}
// 添加属性值按钮的回调
const addAttrValue = () => {
// 点击添加属性按钮时, 向数组添加属性值对象
    attrParams.attrValueList.push({
        valueName: '',
        flag: true // 控制每个属性值编辑模式与查看模式的切换
    })
// 点击添加属性时, el-input组件最后一个表单自动聚焦
    nextTick(() => {
        inputArr.value[attrParams.attrValueList.length - 1].focus()
    })
}
// 保存按钮的回调
// 发送请求成功后, 应切换场景并提示成功信息, 再重新获取属性与属性值
const save = async () => {
    const result: any = await reqAddOrUpdateAttr(attrParams)
    console.log('添加属性成功', result)
    if (result.code == 200) {
        scene.value = 0
        ElMessage({
            type: 'success',
            message: attrParams.id ? '修改成功' : '添加成功'
        })
        getAttr()
    } else {
        ElMessage({
            type: 'error',
            message: attrParams.id ? '修改失败' : '添加失败'
        })
    }
}
// 属性值表单失去焦点的方法(相应的属性值对象flag变为false/展示div)
const toLook = (row: AttrValue, $index: number) => {
// 属性值非空判断
    if (row.valueName.trim() == '') {
// 值为空的话, 删除对应属性值的元素
        attrParams.attrValueList.splice($index, 1)
// 错误信息提示框
        ElMessage({
            type: 'error',
            message: '属性值不能为空'
        })
        return
    }
// 非法情况2(失去焦点前判断是否有重复属性值), 把当前属性值对象从数组中取出来进行判断
    const repeat = attrParams.attrValueList.find((item) => {
        if (item != row) {
            return item.valueName === row.valueName
        }
    })
// 若有重复的属性值就直接return出去, 并移除重复属性值/弹出错误提示框
    if (repeat) {
        attrParams.attrValueList.splice($index, 1)
        ElMessage({
            type: 'error',
            message: '属性值不能重复'
        })
        return
    }

    row.flag = false
}
// 属性值div点击显示的方事件法
const toEdit = (row: AttrValue, $index: number) => {
    row.flag = true
// nextTick: 响应式数据发生变化, 获取更新后的DOM
// 点击div时自动聚焦表单框(通过获取vc实例存储到数组中, 再通过nextTick方法调用vc身上的focus方法)
    nextTick(() => {
        inputArr.value[$index].focus()
    })
}
// 删除某个分类下的属性的方法回调
// 点击传递相应属性id发送删除请求并重新获取剩余属性, 然后则提示成功信息
const deleteAttr = async (attrId: number) => {
    const result: any = await reqRemoveAttr(attrId)
    console.log('删除成功', result)
    if (result.code == 200) {
        ElMessage({
            type: 'success',
            message: '删除成功'
        })
        getAttr()
    } else {
        ElMessage({
            type: 'error',
            message: '删除失败'
        })
    }
}
// 当路由跳转组件会被销毁时, 将仓库分类相关数据清空(调用路由组件$reset方法清空仓库数据)
onBeforeUnmount(() => {
    categoryStore.$reset()
})
</script>

<style lang="scss" scoped>

</style>