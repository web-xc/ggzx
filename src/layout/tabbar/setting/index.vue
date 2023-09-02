<template>
    <el-button icon="Refresh" circle @click="updataRefsh"></el-button>
    <el-button icon="FullScreen" circle @click="fullScreen"></el-button>
    <!-- popover组件: 用于切换暗黑模式/主题颜色 -->
    <el-popover placement="bottom" title="主题设置" :width="210" trigger="hover">
        <el-form>
            <el-form-item label="主题颜色">
                <el-color-picker @change="setColor" v-model="color" show-alpha :predefine="predefineColors"></el-color-picker>
            </el-form-item>
            <el-form-item label="暗黑模式">
                <el-switch @change="changeDark" v-model="dark" active-icon="MoonNight" inactive-icon="Sunny" inline-prompt></el-switch>
            </el-form-item>
        </el-form>
        <template #reference>
            <el-button icon="Setting" circle></el-button>
        </template>
    </el-popover>
    <img :src="userStore.avatar" style="width: 32px; height: 32px; margin: 0px 10px; border-radius: 50%;">
    <!-- 下拉菜单 -->
    <el-dropdown>
        <span class="el-dropdown-link">{{ userStore.username }}
            <el-icon class="el-icon--right"><arrow-down/></el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup lang="ts">
// 引入组合式API函数
import { ref } from 'vue'
// 引入路由对象
import { useRouter, useRoute } from 'vue-router'
import useLayOutSettingStore from '@/store/modules/setting'
import useUserStore from '@/store/modules/user'

// 获取layout配置相关的仓库
const LayOutSettingStore = useLayOutSettingStore()
// 获取用户相关的小仓库
const userStore = useUserStore()
// 刷新按钮的回调
const updataRefsh = () => {
    LayOutSettingStore.refsh = !LayOutSettingStore.refsh
}
// 切换全屏模式与退出全屏模式的按钮回调
// document.fullscreenElement对象: 可用来判断当前是否全屏模式: true全屏/false非全屏
// document.documentElement.requestFullscreen方法: 实现全屏模式
// document.exitFullscreen方法: 退出全屏模式
const fullScreen = () => {
    const full = document.fullscreenElement
    if (!full) {
        document.documentElement.requestFullscreen()
    } else {
        document.exitFullscreen()
    }
}
// 获取路由对象
const $router = useRouter()
const $route = useRoute()
// 退出登录的回调
const logout = async () => {
    await userStore.userLogout()
    $router.push({path: '/login', query: {redirect: $route.path}})
}
// 收集暗黑模式切换按钮的数据
const dark = ref<boolean>(false)
// switch开关按钮的回调(进行暗黑模式切换)
// 1.获取HTML根节点 2.判断HTML标签是否有类名dark
const changeDark = () => {
    const html = document.documentElement
    dark.value ? html.className = 'dark' : html.className = ''
}
// 主题颜色设置的回调
// 1.获取HTML根节点 2.调用根节点setProperty方法修改为当前选择的颜色
const setColor = () => {
    const html = document.documentElement
    html.style.setProperty('--el-color-primary', color.value)
}
// 主题颜色组件切换配置的数据
const color = ref('rgba(64 158 255)')
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577'
])
</script>

<style scoped lang="scss">
  span {
    cursor: pointer !important;
  }
</style>