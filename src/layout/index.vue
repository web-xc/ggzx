<template>
    <div class="layout_container">
        <!-- 左侧菜单 -->
        <div class="layout_slider">
            <Logo></Logo>
            <!-- 展示菜单 -->
            <!-- 滚动组件 -->
            <el-scrollbar class="scrollbar">
                <!-- 菜单组件 -->
                <el-menu :collapse="LayOutSettingStore.fold ? true : false" :default-active="$route.path" background-color="#001529" text-color="#959ea6">
                    <!-- 根据路由动态生成菜单 -->
                    <Menu :menuList="useStore.menuRoutes"></Menu>
                </el-menu>
            </el-scrollbar>
        </div>
        <!-- 顶部导航 -->
        <div class="layout_tabbar" :class="{ fold: LayOutSettingStore.fold ? true : false }">
            <!-- layout组件的顶部导航Tabbar组件 -->
            <Tabbar></Tabbar>
        </div>
        <!-- 内容展示区 -->
        <div class="layout_main" :class="{ fold: LayOutSettingStore.fold ? true : false }">
            <Main></Main>
        </div>
    </div>
</template>

<script setup lang="ts">
// 引入路由对象
// import { useRoute } from 'vue-router'
// 引入左侧菜单Logn子组件
import Logo from './logo/index.vue'
// 引入菜单组件
import Menu from './menu/index.vue'
// 引入用户相关的小仓库
import useUserStore from '@/store/modules/user'
// 引入右侧内容展示区组件
import Main from './main/index.vue'
// 引入顶部Tabbar组件
import Tabbar from './tabbar/index.vue'
// 引入layout配置相关的仓库
import useLayOutSettingStore from '@/store/modules/setting'

// 获取用户相关小仓库
const useStore = useUserStore()
// 获取路由对象 
// const $route = useRoute()
// 获取layout配置相关的仓库
const LayOutSettingStore = useLayOutSettingStore()
</script>

<style scoped lang="scss">
  .layout_container {
    width: 100%;
    height: 100vh;
    .layout_slider {
        width: $base-menu-width;
        height: 100vh;
        color: #fff;
        background-color: $base-menu-background;
        transition: all 0.3s;
        .scrollbar {
            width: 100%;
            height: calc(100vh - $base-menu-logo-height);
            .el-menu {
                border-right: none;
            }
        }
        &.fold {
            width: $base-menu-min-width;
        }
    }
    .layout_tabbar {
        position: fixed;
        top: 0;
        left: $base-menu-width;
        width: calc(100% - $base-menu-width);
        height: $base-tabbar-height;
        transition: all 0.3s;
        &.fold {
            width: calc(100vw - $base-menu-min-width);
            left: $base-menu-min-width;
        }
    }
    .layout_main {
        position: absolute;
        top: $base-tabbar-height;
        left: $base-menu-width;
        padding: 20px;
        width: calc(100% - $base-menu-width);
        height: calc(100vh - $base-tabbar-height);
        // background-color: #e6e6e6;
        background-color: #fff;
        overflow: auto;
        transition: all 0.3s;
        
        &.fold {
            width: calc(100vw - $base-menu-min-width);
            left: $base-menu-min-width;
        }
    }
  }
</style>