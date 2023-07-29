<template>
    <!-- 路由组件出口位置 -->
    <router-view v-slot="{ Component }">
        <transition name="fade">
    <!-- 渲染layout一级路由组件的子路由器 -->
            <component :is="Component" v-if="flag"/>
        </transition>
    </router-view>
</template>

<script setup lang="ts">
import { watch, ref, nextTick } from 'vue'
// 引入layout组件相关配置的仓库
import useLayOutSettingStore from '@/store/modules/setting'

// 获取layout配置相关的仓库
const LayOutSettingStore = useLayOutSettingStore()
// 控制当前组件是否销毁重建
const flag = ref(true)
// 监听仓库内部数据是否发生变化, 若发生变化, 说明用户点击过刷新按钮
watch(() => LayOutSettingStore.refsh, () => {
// 点击刷新按钮, 路由组件被销毁后, 使用nextTick再次创建
    flag.value = false
    nextTick(() => {
        flag.value = true
    })
})
</script>

<style scoped>
  .fade-enter-from {
    opacity: 0;
    transform: scale(0);
  }
  .fade-enter-active {
    transition: all 0.3s;
  }
  .fade-enter-to {
    opacity: 1;
    transform: scale(1);
  }
</style>