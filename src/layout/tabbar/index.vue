<template>
    <!-- 顶部左侧静态 -->
    <div class="tabbar">
        <div class="tabbar_left">
            <Breadcrumb></Breadcrumb>
        </div>
        <div class="tabbar_right">
            <Setting></Setting>
        </div>
    </div>
</template>

<script setup lang="ts">
// 引入左侧面包屑组件与右侧下拉菜单组件
import Breadcrumb from './breadcrumb/index.vue'
import Setting from './setting/index.vue'
</script>

<style scoped lang="scss">
  .tabbar {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    font-size: 20px;
    .tabbar_left {
        display: flex;
        align-items: center;
        margin-left: 20px;
    }
    .tabbar_right {
        display: flex;
        align-items: center;
        margin-right: 30px;
    }
  }
</style>