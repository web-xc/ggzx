<template>
    <div>
        <el-card style="height: 80px;">
            <el-form inline class="form">
                <el-form-item label="角色搜索">
                    <el-input placeholder="请输入角色名 - 回车搜索" v-model="keyword" @keyup.enter="search"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" :disabled="keyword ? false : true" @click="search">搜索</el-button>
                    <el-button type="primary" plain @click="reset">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card style="margin: 10px 0px;">
            <el-button v-has="`btn.Role.add`" type="primary" icon="Plus" @click="addRole">添加角色</el-button>
            <el-table border style="margin: 10px 0px;" :data="allRole">
                <el-table-column label="#" align="center" type="index"></el-table-column>
                <el-table-column label="ID" align="center" prop="id"></el-table-column>
                <el-table-column label="角色名称" align="center" prop="roleName" show-overflow-tooltip></el-table-column>
                <el-table-column label="创建时间" align="center" prop="createTime" show-overflow-tooltip></el-table-column>
                <el-table-column label="更新时间" align="center" prop="updateTime" show-overflow-tooltip></el-table-column>
                <el-table-column label="操作" align="center" width="265px">
                    <template #="{row, index}">
                        <el-button v-has="`btn.Role.assgin`" type="primary" size="small" icon="User" @click="setPermisstion(row)">分配权限</el-button>
                        <el-button v-has="`btn.Role.update`" type="info" size="small" icon="Edit" @click="updateRole(row)">编辑</el-button>
                        <el-popconfirm :title="`确定删除${row.roleName}吗?`" @confirm="removeRole(row.id)" width="250px" icon="Delete" icon-color="red" :hide-after="10">
                            <template #reference>
                                <el-button v-has="`btn.Role.remove`" type="danger" size="small" icon="Delete">删除</el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页器 -->
            <el-pagination
                v-model:current-page="pageNo"
                v-model:page-size="pageSize"
                :page-sizes="[3, 5, 6, 10]"
                :background="true"
                layout="prev, pager, next, jumper, ->, sizes, total"
                :total="total"
                @current-change="getHasRole"
                @size-change="sizeChange"/>
            </el-card>
        <!-- dialog对话框: 添加角色职位 -->
        <el-dialog :title="RoleParams.id ? '编辑角色' : '添加角色'" v-model="show">
            <el-form :model="RoleParams" :rules="rules" ref="formRef">
                <el-form-item label="角色名称" prop="roleName">
                    <el-input placeholder="请输入角色名称" v-model="RoleParams.roleName"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button type="primary" plain @click="show = false">取消</el-button>
                <el-button type="primary" @click="save">确定</el-button>
            </template>
        </el-dialog>
        <!-- 抽屉对话框: 分配角色职位 -->
        <el-drawer v-model="drawer">
            <template #header>
                <h4>分配菜单与按钮的权限</h4>
            </template>
        <!-- 树形控件 -->
            <template #default>
                <el-tree ref="tree" :data="menuArr" show-checkbox node-key="id" default-expand-all :default-checked-keys="selectArr" :props="defaultProps"/>
            </template>
            <template #footer>
                <el-button type="primary" plain @click="drawer = false">取消</el-button>
                <el-button type="primary" @click="handler">确定</el-button>
            </template>
        </el-drawer>
    </div>
</template>

<script setup lang="ts">
// 引入组合式API函数
import { ref, reactive, onMounted, nextTick, handleError } from 'vue'
// 引入角色管理相关的请求接口
import { reqAllRoleList, reqAddOrUpdateRole, reqAllMenuList, reqSetPermission, reqRemoveRole } from '@/api/acl/role/index'
// 引入角色管理相关数据的数据类型
import type { RoleResponseData, Records, RoleData, MenuResponseData, MenuList } from '@/api/acl/role/type'
// 引入layout组件相关配置的仓库(用于重置刷新效果)
import useLayOutSettingStore from '@/store/modules/setting'
// 引入Element-Plus的弹窗提示信息
import { ElMessage } from 'element-plus'

// 分页器默认页码
const pageNo = ref<number>(1)
// 每页默认展示几条数据
const pageSize = ref<number>(3)
// 存储角色总数
const total = ref<number>()
// 存储收集用户输入的用户名(进行查询用户)
const keyword = ref<string>('')
// 存储全部角色职位
const allRole = ref<Records>([])
// 获取setting仓库(用于重置刷新效果)
const settingStore = useLayOutSettingStore()
// 定义控制dialog对话框显示/隐藏
const show = ref<boolean>(false)
// 存储收集添加角色的数据
const RoleParams = reactive<RoleData>( { roleName: '' } )
// 获取el-form组件实例(用于对话框组件校验规则)
const formRef = ref<any>()
// 控制抽屉组件显示/隐藏
const drawer = ref<boolean>(false)
// 定义数组存储用户权限数据
const menuArr = ref<MenuList>([])
// 定义数组存储用户权限是否勾选节点的ID(四级)
const selectArr = ref<number[]>([])
// 获取树形组件实例(用于存储复选框选中或半选的id)
const tree = ref<any>()

// 组件挂载完毕则调用函数发送请求, 并获取角色数据
onMounted(() => {
    getHasRole()
})

// 获取全部角色的请求函数
const getHasRole = async (pages = 1) => {
// 分页器默认页码(不传参为1)
    pageNo.value = pages
    const result: RoleResponseData = await reqAllRoleList(pageNo.value, pageSize.value, keyword.value)
    console.log('角色数据获取成功', result)
    if (result.code == 200) {
        total.value = result.data.total
        allRole.value = result.data.records
    }
}
// 分页器下拉菜单发生变化的回调
const sizeChange = () => {
    getHasRole()
}
// 搜索按钮的回调
// 1.根据角色名称获取对应数据 2.清空角色名称
const search = () => {
    getHasRole()
    keyword.value = ''
}
// 重置按钮的回调(调用setting仓库去取反实现重置效果)
const reset = () => {
    settingStore.refsh = !settingStore.refsh
}
// 添加角色按钮的回调(对话框组件显示、清除表单数据、清除校验错误信息)
const addRole = () => {
    show.value = true
// 调用此函数时, 使用assign拷贝方法清除表单数据
    Object.assign(RoleParams, {
        id: '',
        roleName: ''
    })
// 清除校验规则错误信息(nextTick语法)
    nextTick(() => {
        formRef.value.clearValidate('roleName')
    })
}
// 编辑角色按钮的回调(对话框显示、assign赋值角色数据/回显、清除校验错误信息)
const updateRole = (row: RoleData) => {
    show.value = true
    Object.assign(RoleParams, row)
// 清除校验规则错误信息(nextTick语法)
    nextTick(() => {
        formRef.value.clearValidate('roleName')
    })
}
// 添加/编辑角色职位的表单自定义校验规则的回调
const validatorRoleName = (rule: any, value: any, callBack: any) => {
    if (value.trim().length >= 2) {
        callBack()
    } else {
        callBack(new Error('角色名称至少两位'))
    }
}
// 添加/编辑角色职位的表单校验
const rules = {
    roleName: [{required: true, trigger: 'blur', validator: validatorRoleName}]
}
// 添加角色确定按钮的回调
// 1.发送请求前对表单校验 2.发送请求 3.对话框隐藏 4.提示信息 5.重新获取角色数据(若是编辑角色则留当前页)
const save= async () => {
// 在发送请求之前, 对整个表单进行校验(调用方法,若校验通过,会返回成功的Promiss, 再执行后面语法)
    await formRef.value.validate()
// 发送添加请求, 对话框隐藏, 提示信息, 重新获取角色数据
    const reset: any = await reqAddOrUpdateRole(RoleParams)
    if (reset.code == 200) {
        show.value = false
        ElMessage({type: 'success', message: RoleParams.id ? '编辑成功' : '添加成功'})
// 若是编辑角色则留当前页, 若添加角色则跳转第一页
        getHasRole(RoleParams.id ? pageNo.value : 1)
    } else {
        ElMessage({type: 'error', message: RoleParams.id ? '编辑失败' : '添加失败'})
    }
}
// 树形控件的数据
const defaultProps = {
    children: 'children',
    label: 'name'
}
// 分配角色权限按钮的回调(抽屉组件显示)
// 1.显示抽屉组件 2.收集角色职位id数据 3.根据角色职位id获取权限数据(将数据传给递归函数)
const setPermisstion= async (row: RoleData) => {
    drawer.value = true
    Object.assign(RoleParams, row)
    const result: MenuResponseData = await reqAllMenuList((RoleParams.id as number))
    console.log('角色职位与按钮数据获取成功', result)
    if (result.code) {
        menuArr.value = result.data
        selectArr.value = filterSelectArr(menuArr.value, [])
    }
}
// 判断角色职位是否勾选的函数(利用递归实现判断)
// 将select值为true或level值为4的选出来, 追加给新数组
// 若没有这些值, 则判断children或大于0的选出来后递归当前函数重新判断一次
const filterSelectArr = (allData: any, initArr: any) => {
    allData.forEach((item: any) => {
        if (item.select && item.level == 4) {
            initArr.push(item.id)
        }
        if (item.children && item.children.length > 0) {
            filterSelectArr(item.children, initArr)
        }
    })
    return initArr
}
// 分配角色职位确定按钮的回调
const handler = async () => {
// 1.收集角色id
    const roleId = (RoleParams.id as number)
// 2.收集选中复选框id(两个方法: 返回复选框选中/半选的id的key数组/合并id) 
    const arr = tree.value.getCheckedKeys()
    const arr1 = tree.value.getHalfCheckedKeys()
    const permissionId = arr.concat(arr1)
// 3.发送分配权限请求
    const result: any = await reqSetPermission(roleId, permissionId)
    if (result.code == 200) {
// 4.请求成功抽屉组件关闭, 并提示信息
        drawer.value = false
        ElMessage({type: 'success', message: '分配权限成功'})
// 5.分配成功则刷新页面(保证权限最新状态)
        window.location.reload()
    } else {
        ElMessage({type: 'error', message: '分配权限失败'})
    }
}
// 删除角色职位按钮的回调
// 1.接收id 2.发送请求 3.提示信息 4.重新获取角色数据
const removeRole = async (id: number) => {
    const result: any = await reqRemoveRole(id)
    if (result.code == 200) {
        ElMessage({type: 'success', message: '删除成功'})
// 若当前页角色大于1则还是当前页, 若小于1则回到上一页
        getHasRole(allRole.value.length > 1 ? pageNo.value : pageNo.value - 1)
    } else {
        ElMessage({type: 'error', message: '删除失败'})
    }
}
</script>

<style lang="scss" scoped>
.form {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>