<template>
    <div class="box">
        <img src="../../assets\images\error_images\404.png">
        <button @click="goHome">首页</button>
    </div>
</template>

<script setup lang="ts">
// 引入路由对象
import { useRouter } from 'vue-router'

// 获取路由对象
const $router = useRouter()

// 首页按钮的回调(跳转到路由首页)
const goHome = () => {
    $router.push('/home')
}
</script>

<style scoped lang="scss">
.box {
    display: flex;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    background-color: rgb(172, 158, 160);
    img {
        width: 800px;
        height: 400px;
    }
    button {
        margin-top: 310px;
        margin-left: -310px;
        width: 80px;
        height: 50px;
        border-radius: 10px;
        border: 0;
        background-color: #fff;
        cursor: pointer;
    }
}
</style>