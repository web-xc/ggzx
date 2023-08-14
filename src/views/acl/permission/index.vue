<template>
    <div>
        <el-table :data="PermissionArr" row-key="id" expand-row-keys="" border class="table">
            <el-table-column label="名称" prop="name" width="180px"></el-table-column>
            <el-table-column label="权限数值" prop="code" width="200px" align="center"></el-table-column>
            <el-table-column label="修改时间" prop="updateTime" width="200px" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
                <template #="{row, $index}">
                    <el-button v-has="`btn.Permission.add`" @click="addPermission(row)" :type="row.level == 3 ? 'success' : 'primary'" size="small" icon="Plus" :disabled="row.level == 4 ? true : false">{{ row.level == 3 ? '添加功能' : '添加菜单' }}</el-button>
                    <el-button v-has="`btn.Permission.update`" @click="updatePermission(row)" type="info" size="small" icon="Edit" :disabled="row.level == 1 ? true : false">编辑</el-button>
                    <el-popconfirm :title="`确定删除${row.name}吗?`" @confirm="removeMenu(row.id)" width="220px" icon="Delete" icon-color="red" :hide-after="10">
                            <template #reference>
                                <el-button v-has="`btn.Permission.remove`" type="danger" size="small" icon="Delete" :disabled="row.level == 1 ? true : false">删除</el-button>
                            </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog v-model="show" :title="menuData.id ? '编辑菜单' : '添加菜单'">
            <el-form>
                <el-form-item label="菜单名称">
                    <el-input placeholder="请输入菜单名称" v-model="menuData.name"></el-input>
                </el-form-item>
                <el-form-item label="权限数值">
                    <el-input placeholder="请输入权限数值" v-model="menuData.code"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button type="primary" plain @click="show = false">取消</el-button>
                <el-button type="primary" @click="save">确定</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
// 引入组合式API函数
import { ref, reactive, onMounted } from 'vue'
// 引入菜单管理相关的请求接口
import { reqAllPermission, reqAddOrUpdateMenu, reqRemoveMenu } from '@/api/acl/menu/index'
// 引入菜单管理相关数据的数据类型
import type { PermissionResponseData, PermissionList, Permission, MenuParams } from '@/api/acl/menu/type'
// 引入Element-Plus的弹窗提示信息
import { ElMessage } from 'element-plus'

// 存储菜单数据
const PermissionArr = ref<PermissionList>([])
// 控制对话框的显示/隐藏
const show = ref<boolean>()
// 存储添加或编辑菜单收集的数据
const menuData = reactive<MenuParams>({
    code: '',
    level: 0,
    name: '',
    pid: 0
})

// 组件挂载完毕则调用函数发送请求, 并获取菜单数据
onMounted(() => {
    getHasPermission()
})
// 获取菜单数据的请求函数
const getHasPermission = async () => {
    const result: PermissionResponseData = await reqAllPermission()
    if (result.code == 200) {
        PermissionArr.value = result.data
    }
}
// 添加菜单按钮的回调
// 1. 对话框显示 2.清除表单数据 3.收集菜单level数值 4.给谁新增子菜单
const addPermission = (row: Permission) => {
// 调用此函数时, 使用assign拷贝方法清除表单数据
    Object.assign(menuData, {
        id: 0,
        code: '',
        level: 0,
        name: '',
        pid: 0
    })
    show.value = true
// 收集新增菜单level的数值
    menuData.level = row.level+1
// 给谁新增子菜单
    menuData.pid = (row.id as number)
} 
// 编辑菜单按钮的回调
// 点击编辑按钮时收集row传递的数据进行表单回显更新数据(通过assign赋值菜单数据)
const updatePermission = (row: Permission) => {
    show.value = true
    Object.assign(menuData, row)
}
// 添加/编辑菜单对话框确定按钮的回调
// 1.发送请求 2.对话框隐藏 3.提示信息 4.重新获取菜单数据
const save = async () => {
    const result: any = await reqAddOrUpdateMenu(menuData)
    if (result.code == 200) {
        show.value = false
        ElMessage({type: 'success', message: menuData.id ? '编辑成功' : '添加成功'})
        getHasPermission()
    } else {
        ElMessage({type: 'error', message: menuData.id ? '编辑失败' : '添加失败'})
    }
}
// 删除菜单按钮的回调
// 1.发送请求 2.提示信息 3.重新获取菜单数据
const removeMenu = async (id: number) => {
    const result: any = await reqRemoveMenu(id)
    if (result.code == 200) {
        ElMessage({type: 'success', message: '删除成功'})
        getHasPermission()
    } else {
        ElMessage({type: 'error', message: '删除失败'})
    }
}
</script>

<style lang="scss" scoped>
.table {
     width: 100%; 
     margin-bottom: 20px; 
     border-radius: 6px; 
     box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
}
</style>