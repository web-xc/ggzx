<template>
    <div class="top">
        <div class="left">
            <span class="lbtn" @click="goHome">首页</span>
        </div>
        <div class="center">
            <div class="title">智慧旅游可视化大数据展示平台</div>
        </div>
        <div class="right">
            <span class="rbtn">统计报告</span>
            <span class="time">当前时间: {{ time }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
// 引入组合式API函数
import { ref, onMounted, onBeforeUnmount } from 'vue'
// 引入路由对象
import { useRouter } from 'vue-router'
// 引入moment插件相关配置
import moment from 'moment'

// 获取路由对象
const $router = useRouter()
// 存储当前时间(利用moment插件)
const time = ref(moment().format('YYYY年MM月DD日 HH:mm:ss'))
const timer = ref(0)

// 首页按钮的回调(跳转到路由首页)
const goHome = () => {
    $router.push('/home')
}
// 组件挂载完毕(开启定时器, 更新当前时间)
onMounted(() => {
    timer.value = setInterval(() => {
        time.value = moment().format('YYYY年MM月DD日 HH:mm:ss')
    }, 1000) 
})
// 组件销毁之前(清除时间定时器)
onBeforeUnmount(() => {
    clearInterval(timer.value)
})
</script>

<style lang="scss" scoped>
.top {
    display: flex;
    width: 100%;
    height: 40px;
    .left {
        flex: 1.5;
        background: url(../../images/dataScreen-header-left-bg.png) no-repeat;
        background-size: cover;
        .lbtn {
            float: right;
            width: 150px;
            height: 40px;
            color: #29fcff;
            font-size: 22px;
            text-align: center;
            line-height: 40px;
            background: url(../../images/dataScreen-header-btn-bg-l.png) no-repeat;
            background-size: cover;
            cursor: pointer;
        }
    }
    .center {
        flex: 2;
        .title {
            width: 100%;
            height: 74px;
            color: #29fcff;
            font-size: 35px;
            text-align: center;
            line-height: 74px;
            background: url(../../images/dataScreen-header-center-bg.png) no-repeat;
            background-size: 100% 100%;
        }
    }
    .right {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex: 1.5;
        background: url(../../images/dataScreen-header-left-bg.png) no-repeat;
        background-size: cover;
        .rbtn {
            float: left;
            width: 150px;
            height: 40px;
            color: #29fcff;
            font-size: 22px;
            text-align: center;
            line-height: 40px;
            background: url(../../images/dataScreen-header-btn-bg-r.png) no-repeat;
            background-size: cover;
        }
        .time {
            margin-right: 60px;
            color: #29fcff;
            font-size: 20px;
        }
    }
}
</style>