<template>
    <div class="login_container">
        <el-row>
            <el-col :span="12" :xs="0"></el-col>
            <el-col :span="12" :xs="24">
                <el-form class="login_form" :model="loginForm" :rules="rules" ref="loginForms">
                    <h1>Hello</h1>
                    <h2>欢迎来到硅谷甄选</h2>
                        <el-form-item prop="username">
                            <el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input type="password" :prefix-icon="Lock" v-model="loginForm.password" show-password></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button :loading="loading" type="primary" size="default" class="login_btn" @click="login">登录</el-button>
                        </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
// 引入登录时间判断函数
import { getTime } from '@/utils/time'
// 引入用户相关的小仓库
import useUserStore from '@/store/modules/user'
const useStore = useUserStore()
// 获取路由器
const $router = useRouter()
// 定义变量: 控制按钮加载效果
const loading = ref(false)
// 获取el-form组件
const loginForms = ref()

// 收集账号与密码数据
const loginForm = reactive({username: 'admin', password: '111111'})
// 登录按钮回调
const login = async () => {
// 保证全部表单校验通过再发送请求
    await loginForms.value.validate()
// 按钮加载效果: 开始加载
    loading.value = true
// 点击登录按钮要干的事: 1.通知仓库发送登录请求 2.请求成功则首页展示数据 3.请求失败则弹出登录失败信息
    try {
        await useStore.userLogin(loginForm)
// 登录成功则利用编程式导航跳转到展示数据的首页
        $router.push('/')
// 利用Element-Plus的ElNotification提示登录成功信息
        ElNotification({
            type: 'success',
            message: '欢迎回来',
            title: `Hi, ${getTime()} !`
        })
// 登录成功: 按钮加载效果也消失
        loading.value = false
    } catch (error) {
// 登录失败: 按钮加载效果消失
        loading.value = false
// 登录失败提示的信息
        ElNotification({
            type: 'error',
            message: (error as Error).message
        })
    }
}
// 自定义表单校验规则的函数
// rule: 表单校验规则对象
// value: 表单文本内容
// callback: 即为一个函数, 校验符合则放行通过, 若不符合需注入错误提示信息
const validatorUserName = (rule: any, value: any, callback: any) => {
    if (value.length >= 5) {
        callback()
    } else {
        callback(new Error('账号长度至少五位'))
    }
}
const validatorPassword = (rule: any, value: any, callback: any) => {
    if (value.length >= 6) {
        callback()
    } else {
        callback(new Error('密码长度至少六位'))
    }
}
// 定义表单校验需要配置的对象
// required: 表示这个字段必须校验
// min/mix: 文本长度最大值与最小值
// message: 错误提示信息
// trigger: 触发校验表单时机: change/blur
const rules = {
    username: [ {trigger: 'change', validator: validatorUserName} ],
    password: [ {trigger: 'change', validator: validatorPassword} ]
    // {required: true, min: 6, mix: 10, message: '账号长度至少六位', trigger: 'change'}
    // {required: true, min: 6, mix: 15, message: '密码长度至少六位', trigger: 'change'}
}
</script>

<style scoped lang="scss">
  .login_container {
    width: 100%;
    height: 100vh;
    background: url('@/assets/images/background.jpg') no-repeat;
    background-size: cover;
    .login_form {
        position: relative;
        width: 80%;
        top: 30vh;
        background: url('@/assets/images/login_form.png') no-repeat;
        background-size: cover;
        padding: 40px;
        h1 {
            color: #fff;
            font-size: 40px;
        }
        h2 {
            color: #fff;
            font-size: 20px;
            margin: 20px 0px;
        }
        .login_btn {
            width: 100%;
        }
    }
  }
</style>