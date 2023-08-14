<template>
    <div class="box">
        <div class="top">
            <p class="title">实时旅客统计</p>
            <div class="bg"></div>
            <p class="right">可预约总量 <span>9999</span>人</p>
        </div>
        <div class="number">
            <span v-for="(item, index) in people" :key="index">{{ item }}</span>
        </div>
        <!-- charts盒子展示echarts图形图标的内容 -->
        <div class="charts" ref="charts"></div>
    </div>
</template>

<script setup lang="ts">
// 引入组合式API函数
import { ref, onMounted } from 'vue'
// 引入echarts插件
import * as echarts from 'echarts'
// 引入echarts-水球图拓展插件
import 'echarts-liquidfill'


// 定义实时旅客人数
const people = ref('215908人')
// 获取charts盒子的DOM节点
const charts = ref()
// 组件挂载完毕(初始化echarts)
onMounted(() => {
// 1.获取echarts类的实例
    const mycharts = echarts.init(charts.value)
// 2.设置实例的配置项
    mycharts.setOption({
        // 标题组件
        title: {
            text: '人数比例',
            textStyle: {
                color: '#29fcff', // 字体颜色
                fontSize: 24      // 字体大小
            }
        },
        // x/y轴组件
        xAxis: {},
        yAxis: {},
        // 系列: 决定展示什么样的图形图标
        series: {
            type: 'liquidFill',        // 图形系列
            data: [ 0.6, 0.4, 0.2 ],   // 展示的数据
            waveAnimation: true,       // 动画开关
            animationDuration: 3,      // 动画时长
            animationDurationUpdate: 0,// 动画时长
            radius: '96%',             // 图形半径 
            outline: {
                show: true,
                borderDistance: 8,
                itemStyle: {
                    color: '#7dc2df',  // 圆角颜色
                    borderColor: '#294D99',
                    borderWidth: 8,
                    shadowBlur: 20,
                    shadowColor: 'rgba(0, 0, 0, 0.25)'
                }
            }
        },
        // 布局组件
        grid: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        }
    })
})
</script>

<style lang="scss" scoped>
.box {
    margin-left: 20px;
    margin-top: 10px;
    background: url(../../images/dataScreen-main-lb.png) no-repeat;
    background-size: 100% 100%;
    .top {
        .title {
            color: #fff;
            font-size: 20px;
        }
        .bg {
            margin-top: 10px;
            width: 68px;
            height: 7px;
            background: url(../../images/dataScreen-title.png) no-repeat;
            background-size: 100% 100%;
        }
        .right {
            float: right;
            color: #fff;
            font-size: 20px;
            span {
                color: yellowgreen;
            }
        }
    }
    .number {
        display: flex;
        margin-top: 30px;
        padding: 20px;
        span {
            flex: 1;
            color: #29fcff;
            height: 50px;
            text-align: center;
            line-height: 50px;
            background: url(../../images/total.png) no-repeat;
            background-size: 100% 100%;
        }
    }
    .charts {
        width: 100%;
        height: 210px;
    }
}
</style>