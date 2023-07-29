<template>
    <div class="logo" v-if="setting.logoHidden">
        <img :src="setting.logo" :title="setting.title">
        <p>{{ setting.title }}</p>
    </div>
</template>

<script setup lang="ts">
// 引入项目Logo/标题的配置
import setting from '@/setting'
</script>

<style lang="scss" scoped>
  .logo {
    width: 100%;
    height: $base-menu-logo-height;
    color: #fff;
    display: flex;
    align-items: center;
    padding: 10px;
    img {
        width: 40px;
        height: 40px;
    }
    p {
        font-size: $base-logo-title-fontSize;
        margin-left: 10px;
    }
  }
</style>