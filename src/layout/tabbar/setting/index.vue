<template>
    <el-button size="small" icon="Refresh" circle @click="updataRefsh"></el-button>
    <el-button size="small" icon="FullScreen" circle @click="fullScreen"></el-button>
    <el-button size="small" icon="Setting" circle></el-button>
    <img :src="userStore.avatar" style="width: 20px; height: 24px; margin: 0px 10px; border-radius: 10%;">
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
</script>

<style scoped lang="scss">
  * {
    font-size: 20px;
    padding: 2px;
  }
  span {
    cursor: pointer !important;
  }
</style>