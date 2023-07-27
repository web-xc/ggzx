<template>
    <div class="layout_container">
        <!-- 左侧菜单 -->
        <div class="layout_slider">
            <Logo></Logo>
        </div>
        <!-- 顶部导航 -->
        <div class="layout_tabbar">22</div>
        <!-- 内容展示区 -->
        <div class="layout_main"><p style="height: 1000px; background: #ccc;">我是测试代码</p></div>
    </div>
</template>

<script setup lang="ts">
// 引入左侧菜单Logn子组件
import Logo from './logo/index.vue'
</script>

<style scoped lang="scss">
  .layout_container {
    width: 100%;
    height: 100vh;
    .layout_slider {
        width: $base-menu-width;
        height: 100vh;
        background-color: $base-menu-background;
    }
    .layout_tabbar {
        position: fixed;
        top: 0;
        left: $base-menu-width;
        width: calc(100% - $base-menu-width);
        height: $base-tabbar-height;
        background-color: skyblue;
    }
    .layout_main {
        position: absolute;
        top: $base-tabbar-height;
        left: $base-menu-width;
        padding: 20px;
        width: calc(100% - $base-menu-width);
        height: calc(100vh - $base-tabbar-height);
        background-color: green;
        overflow: auto;
    }
  }
</style>