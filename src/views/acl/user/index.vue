<template>
    <div>
        <el-card style="height: 80px;">
            <el-form inline class="form">
                <el-form-item label="用户名">
                    <el-input placeholder="请输入用户名 - 回车搜索" v-model="keyword" @keyup.enter="search"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" :disabled="keyword ? false : true" @click="search">搜索</el-button>
                    <el-button type="primary" plain @click="reset">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card style="margin: 10px 0px;">
            <el-button v-has="`btn.User.add`" type="primary" @click="addUser">添加用户</el-button>
            <el-button v-has="`btn.User.remove`" type="danger" :disabled="selectIdArr.length ? false : true" @click="deleteSelectUser">批量删除</el-button>
            <!-- table展示用户信息 -->
            <el-table style="margin: 10px 0px;" border :data="userArr" @selection-change="selectChange">
                <el-table-column type="selection" align="center"></el-table-column>
                <el-table-column label="#" align="center" type="index"></el-table-column>
                <el-table-column label="ID" align="center" prop="id"></el-table-column>
                <el-table-column label="用户名字" align="center" prop="username" show-overflow-tooltip></el-table-column>
                <el-table-column label="用户名称" align="center" prop="name" show-overflow-tooltip></el-table-column>
                <el-table-column label="用户角色" align="center" prop="roleName" show-overflow-tooltip></el-table-column>
                <el-table-column label="创建时间" align="center" prop="createTime" show-overflow-tooltip></el-table-column>
                <el-table-column label="更新时间" align="center" prop="updateTime" show-overflow-tooltip></el-table-column>
                <el-table-column label="操作" width="265px" align="center">
                    <template #="{row, $index}">
                        <el-button v-has="`btn.User.assgin`" type="primary" size="small" icon="User" @click="setRole(row)">分配角色</el-button>
                        <el-button v-has="`btn.User.update`" type="info" size="small" icon="Edit" @click="updateUser(row)">编辑</el-button>
                        <el-popconfirm :title="`确定删除${row.username}吗?`" @confirm="deleteUser(row.id)" width="260px" icon="Delete" icon-color="red" :hide-after="10">
                            <template #reference>
                                <el-button v-has="`btn.User.remove`" type="danger" size="small" icon="Delete">删除</el-button>
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
                @current-change="getHasUser"
                @size-change="handler"/>
        </el-card>
        <!-- 抽屉组件: 添加用户账号/编辑账号信息 -->
        <el-drawer v-model="drawer">
            <template #header>
                <h4>{{ userParams.id ? '编辑用户' : '添加用户' }}</h4>
            </template>
            <template #default>
                <el-form :model="userParams" :rules="rules" ref="formRef">
                    <el-form-item label="用户姓名" prop="username">
                        <el-input placeholder="请输入用户姓名" v-model="userParams.username"></el-input>
                    </el-form-item>
                    <el-form-item label="用户昵称" prop="name">
                        <el-input placeholder="请输入用户昵称" v-model="userParams.name"></el-input>
                    </el-form-item>
                    <el-form-item label="用户密码" prop="password" v-if="!userParams.id">
                        <el-input placeholder="请输入用户密码" v-model="userParams.password"></el-input>
                    </el-form-item>
                </el-form>
            </template>
            <template #footer>
                <el-button type="primary" plain @click="cancel">取消</el-button>
                <el-button type="primary" @click="save(row)">确定</el-button>
            </template>
        </el-drawer>
        <!-- 抽屉组件: 进行用户账号的分配角色 -->
        <el-drawer v-model="drawer1">
            <template #header>
                <h4>分配用户角色</h4>
            </template>
            <template #default>
                <el-form>
                    <el-form-item label="用户姓名">
                        <el-input v-model="userParams.username" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="角色列表">
                        <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">全选</el-checkbox>
                        <!-- 显示角色的复选框 -->
                        <el-checkbox-group v-model="userRole" @change="handleCheckedCitiesChange">
                            <el-checkbox v-for="(role, index) in allRole" :key="index" :label="role">{{ role.roleName }}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </el-form>
            </template>
            <template #footer>
                <el-button type="primary" plain @click="drawer1 = false">取消</el-button>
                <el-button type="primary" @click="confirmClick">确定</el-button>
            </template>
        </el-drawer>
    </div>
</template>

<script setup lang="ts">
// 引入组合式API函数
import { ref, reactive, onMounted, nextTick } from 'vue'
// 引入用户账号信息相关的请求接口
import { reqUserInfo, reqAddOrUpdateUser, reqAllRole, reqSetUserRole, reqRemoveUser, reqSelectUser } from '@/api/acl/user/index'
// 引入用户账号信息相关数据的数据类型
import type { UserResponseData, Records, User, AllRoleResponseData, AllRole, SetRoleData } from '@/api/acl/user/type'
// 引入Element-Plus的弹窗提示信息
import { ElMessage } from 'element-plus'
// 引入layout组件相关配置的仓库(用于重置刷新效果)
import useLayOutSettingStore from '@/store/modules/setting'

// 分页器默认页码
const pageNo = ref<number>(1)
// 每页默认展示几条数据
const pageSize = ref<number>(3)
// 存储用户总数
const total = ref<number>()
// 存储全部用户数据为数组
const userArr = ref<Records>([])
// 控制抽屉组件的显示/隐藏(第二个为分配角色的抽屉组件)
const drawer = ref<boolean>(false)
const drawer1 = ref<boolean>(false)
// 收集用户账号信息的数据对象
const userParams = reactive<User>({
    username: '',
    name: '',
    password: ''
})
// 获取el-form组件实例(用于对话框组件校验规则)
const formRef = ref<any>()
// 存储全部角色职位的数据/用户账号当前的职位
const allRole = ref<AllRole>([])
const userRole = ref<AllRole>([])
// 收集顶部复选框全选的数据
const checkAll = ref<boolean>(false)
// 控制顶部全部复选框不确定的样式
const isIndeterminate = ref<boolean>(true)
// 准备一个数组存储批量删除用户的id
const selectIdArr = ref<User[]>([])
// 存储收集用户输入的用户名(进行查询用户)
const keyword = ref<string>('')
// 获取setting仓库(用于重置刷新效果)
const settingStore = useLayOutSettingStore()

// 组件挂载完毕则调用函数发送请求, 并获取用户信息数据
onMounted(() => {
    getHasUser()
})

// 获取全部用户信息的请求函数
const getHasUser = async (pages = 1) => {
// 分页器默认页码(不传参为1)
    pageNo.value = pages
    const result: UserResponseData = await reqUserInfo(pageNo.value, pageSize.value, keyword.value)
    console.log('用户信息数据获取成功', result)
    if (result.code == 200) {
        total.value = result.data.total
        userArr.value = result.data.records
    }
}
// 分页器下拉菜单发生变化的回调
const handler = () => {
    getHasUser()
}
// 抽屉组件取消按钮的回调
const cancel = () => {
    drawer.value = false
}
// 添加用户按钮的回调(抽屉组件显示)
const addUser = () => {
    drawer.value = true
// 调用此函数时, 使用assign拷贝方法清除表单数据
    Object.assign(userParams, {
        id: 0,
        username: '',
        name: '',
        password: ''
    })
// 清除校验规则错误信息(nextTick语法)
    nextTick(() => {
        formRef.value.clearValidate('username')
        formRef.value.clearValidate('name')
        formRef.value.clearValidate('password')
    })
}
// 编辑用户按钮的回调(抽屉组件显示)
const updateUser = (row: User) => {
    drawer.value = true
// 将存储好的用户信息row传递过来, 使用assign赋值给userParams对象
    Object.assign(userParams, row)
// 清除校验规则错误信息(nextTick语法)
    nextTick(() => {
        formRef.value.clearValidate('username')
        formRef.value.clearValidate('name')
    })
}
// 抽屉组件保存按钮的回调
// 1.请求添加或修改接口 2.关闭抽屉组件 3.提示信息 4.重新获取用户信息 
// 5.表单校验 6.根据id定义页码(可选) 7.浏览器自动刷新(保证账号信息为最新状态)
const save = async () => {
// 在发送请求之前, 对整个表单进行校验(调用方法,若校验通过,会返回成功的Promiss, 再执行后面语法)
    await formRef.value.validate()

    const result: any = await reqAddOrUpdateUser(userParams)
    console.log('添加或修改用户信息', result)
    if (result.code == 200) {
        drawer.value = false
        ElMessage({type: 'success', message: userParams.id ? '更新成功' : '添加成功'})
// 若当前是编辑账号则留当前页, 若添加账号则回第一页(因加了自动刷新功能, 这段代码可留可不留)
        getHasUser(userParams.id ? pageNo.value : 1)
// 浏览器自动刷新(保证账号信息为最新状态)
        window.location.reload()
    } else {
        ElMessage({type: 'error', message: userParams.id ? '更新失败' : '添加失败'})
    }
}
// 添加抽屉组件表单自定义校验规则的方法(用户名字/名称至少五位/密码至少六位)
const validatorUsername = (rule: any, value: any, callBack: any) => {
    if (value.trim().length >= 5) {
        callBack()
    } else {
        callBack(new Error('用户名字至少五位'))
    }
}
const validatorname = (rule: any, value: any, callBack: any) => {
    if (value.trim().length >= 5) {
        callBack()
    } else {
        callBack(new Error('用户昵称至少五位'))
    }
}
const validatorPassword = (rule: any, value: any, callBack: any) => {
    if (value.trim().length >= 6) {
        callBack()
    } else {
        callBack(new Error('用户密码至少六位'))
    }
}
// 表单校验规则对象
const rules = {
    username: [{required: true, trigger: 'blur', validator: validatorUsername}],
    name: [{required: true, trigger: 'blur', validator: validatorname}],
    password: [{required: true, trigger: 'blur', validator: validatorPassword}]
}
// 分配角色按钮的回调(抽屉组件显示) 
// 1.assign赋值用户信息 2.发送获取角色职位的请求 2.存储角色职位与当前用户角色
const setRole = async (row: User) => {
// 将存储好的用户信息row传递过来, 使用assign赋值给userParams对象
    Object.assign(userParams, row)
    const result: AllRoleResponseData = await reqAllRole((userParams.id as number))
    console.log('角色职位获取成功', result)
// 存储角色职位与当前用户角色
    if (result.code == 200) {
        drawer1.value = true
        allRole.value = result.data.allRolesList
        userRole.value = result.data.assignRoles
    }
}
// 顶部全选复选框change事件的回调
const handleCheckAllChange = (val: boolean) => {
// val: true/false 全选则把userRole存储的数据赋值给val
    userRole.value = val ? allRole.value : []
// 将不确定的样式变为确定样式
    isIndeterminate.value = false
}
// 顶部全部复选框是否勾选事件的回调
// 1.顶部复选框是否勾选: 若当前value长度与全部角色数据相等, 则复选框全选(并判断不确定样式)
const handleCheckedCitiesChange = (value: string[]) => {
    checkAll.value = value.length === allRole.value.length
    isIndeterminate.value = value.length !== allRole.value.length
}
// 分配角色确定按钮的回调
// 收集参数并发送添加角色请求
// 1.收集参数 2.发送请求 3.提示信息 4.关闭抽屉组件 5.重新获取账号信息(留在当前页)
const confirmClick = async () => {
    const data: SetRoleData = {
        userId: (userParams.id as number),
        roleIdList: userRole.value.map(item => (item.id as number))
    }
    const result: any = await reqSetUserRole(data)
    console.log(result)
    if (result.code == 200) {
        ElMessage({type: 'success', message: '分配角色成功'})
        drawer1.value = false
        getHasUser(pageNo.value)
    } else {
        ElMessage({type: 'error', message: '分配角色失败'})
    }
}
// 删除用户账号按钮的回调
// 1.发送删除请求 2.提示信息 3.重新获取账号信息
// 删除成功则重新获取SKU数据(若当前页账号大于1则还是当前页, 若小于1则回到上一页)
const deleteUser = async (userId: number) => {
    const result: any = await reqRemoveUser(userId)
    console.log(result)
    if (result.code == 200) {
        ElMessage({type: 'success', message: '删除成功'})
        getHasUser(userArr.value.length > 1 ? pageNo.value : pageNo.value - 1)
    } else {
        ElMessage({type: 'error', message: '删除失败'})
    }
}
// table复选框勾选时触发的事件回调(将选中的用户存储在一个数组里)
const selectChange = (value: any) => {
    selectIdArr.value = value
}
// 批量删除用户按钮的回调
// 1.整理批量删除的参数 2.发送批量删除请求 3.提示信息 4.重新获取账号信息
const deleteSelectUser = async () => {
    const idList: any  = selectIdArr.value.map(item => item.id)
    const result: any = await reqSelectUser(idList)
    console.log(result)
    if (result.code == 200) {
        ElMessage({type: 'success', message: '批量删除成功'})
        getHasUser(userArr.value.length > 1 ? pageNo.value : pageNo.value - 1)
    } else {
        ElMessage({type: 'error', message: '批量删除失败'})
    }
}
// 搜索按钮的回调
// 1.根据用户名获取对应数据 2.清空用户名
const search = () => {
    getHasUser()
    keyword.value = ''
}
// 重置按钮的回调(调用setting仓库去取反实现重置效果)
const reset = () => {
    settingStore.refsh = !settingStore.refsh
}
</script>

<style lang="scss" scoped>
.form {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>