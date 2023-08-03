<template>
    <el-icon style="margin-right: 10px" @click="changeIcon">
        <component :is="LayOutSettingStore.fold ? 'Fold' : 'Expand'"></component>
    </el-icon>
    <!-- 左侧面包屑 -->
    <el-breadcrumb separator-icon="ArrowRight">
        <!-- 面包屑需要动态展示路由名字与标题 -->
        <el-breadcrumb-item v-for="(item, index) in $route.matched" :key="index" v-show="item.meta.title" :to="item.path">
            <!-- 面包屑动态展示图标 -->
            <el-icon style="vertical-align: bottom;">
                <component :is="item.meta.icon"></component>
            </el-icon>
            <!-- 面包屑展示匹配路由的标题 -->
            <span style="margin: 0px 2px;">{{ item.meta.title }}</span>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script setup lang="ts">
import useLayOutSettingStore from '@/store/modules/setting'
import { useRoute } from 'vue-router'

// 获取layout配置相关的仓库
const LayOutSettingStore = useLayOutSettingStore()
// 获取路由对象
const $route = useRoute()
// 图标进行切换的方法
const changeIcon = () => {
    LayOutSettingStore.fold = !LayOutSettingStore.fold
}
</script>

<style scoped lang="scss">

</style>