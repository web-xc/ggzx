<template>
    <div class="container">
        <!-- 数据大屏展示内容区域  -->
        <div class="screen" ref="screen">
            <!-- 数据大屏顶部区域 -->
            <div class="top">
                <Top/>
            </div>
            <div class="bottom">
            <!-- 左侧三个子组件 -->
                <div class="left">
                    <Tourist class="tourist"></Tourist>
                    <Sex class="sex"></Sex>
                    <Age class="age"></Age>
                </div>
            <!-- 中间两个子组件 -->
                <div class="center">
                    <Map class="map"></Map>
                    <Line class="line"></Line>
                </div>
            <!-- 右侧三个子组件 -->
                <div class="right">
                    <Rank class="rank"></Rank>
                    <Year class="year"></Year>
                    <Couter class="couter"></Couter>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// 引入组合式API函数
import { ref, onMounted, watch } from 'vue'
// 引入顶部子组件
import Top from './components/top/index.vue'
// 引入左侧三个子组件
import Tourist from './components/tourist/index.vue'
import Sex from './components/sex/index.vue'
import Age from './components/age/index.vue'
// 引入中间两个子组件
import Map from './components/map/index.vue'
import Line from './components/line/index.vue'
// 引入右侧三个子组件
import Rank from './components/rank/index.vue'
import Year from './components/year/index.vue'
import Couter from './components/couter/index.vue'

// 获取数据大屏展示内容盒子的DOM元素
const screen = ref()

// 组件一挂载就调用缩放比例函数
onMounted(() => {
    screen.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`
})
// 定义数据大屏缩放比例的函数
function getScale(w = 1920, h = 1080) {
    const ww = window.innerWidth / w
    const wh = window.innerHeight / h
    return ww < wh ? ww : wh
}
// 监听视口变化(实现响应式缩放)
window.onresize = () => {
    screen.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`
}
</script>

<style lang="scss" scoped>
.container {
    width: 100vw;
    height: 100vh;
    background: url(./images//bg.png) no-repeat;
    background-size: cover;
    color: #fff;
    font-size: 28px;
    .screen {
        position: fixed;
        top: 50%;
        left: 50%;
        transform-origin: top left;
        width: 1920px;
        height: 1080px;
        .top {
            width: 100%;
            height: 40px;
        }
        .bottom {
            display: flex;
            .left {
                display: flex;
                flex-direction: column;
                flex: 1;
                height: 1040px;
                .tourist {
                    flex: 1.2;
                }
                .sex {
                    flex: 1;
                }
                .age {
                    flex: 1;
                }
            }
            .right {
                display: flex;
                flex-direction: column;
                flex: 1;
                margin-left: 40px;
                .rank {
                    flex: 1.5;
                }
                .year {
                    flex: 1;
                }
                .couter {
                    flex: 1;
                }
            }
            .center {
                display: flex;
                flex-direction: column;
                flex: 1.5;
                .map {
                    flex: 4;
                }
                .line {
                    flex: 1;
                }
            }
        }
    }
}
</style>