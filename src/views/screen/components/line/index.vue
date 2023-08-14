<template>
    <div class="box">
        <div class="title">
            <p>未来七天游客量趋势图</p>
            <img src="../../images/dataScreen-title.png">
        </div>
        <div class="charts" ref="charts"></div>
    </div>
</template>

<script setup lang="ts">
// 引入组合式API函数
import { ref, onMounted } from 'vue'
// 引入echarts插件
import * as echarts from 'echarts'

// 获取charts盒子的DOM节点
const charts = ref()

// 组件挂载完毕(初始化echarts)
onMounted(() => {
    const mycharts = echarts.init(charts.value)
    mycharts.setOption({
        title: {
            text: '访问量',
            textStyle: {
                color: '#29fcff',
                fontSize: 24
            }
        },
        xAxis: { 
            type: 'category',
            boundaryGap: true,          // 两侧不留白
            splitLine: { show: false }, // 取消分割线
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周七'], // 底部文字
            axisLine: { show: true}, // 轴线显示
            axisTick: { show: true}  // 轴线刻度显示
         },
        yAxis: {
            splitLine: { show: false },
            axisLine: { show: true},
            axisTick: { show: true}
        },
        grid: {
            top: 0,
            left: 40,
            right: 0,
            bottom: 35
        },
        series: [
            {
                type: 'line',
                data: [120, 1400, 100, 1400, 100, 2000, 100],
                smooth: true, // 设置平滑曲线
                areaStyle: {
                    color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                        { offset: 0, color: '#00fffb' },  // 0%的颜色
                        { offset: 1, color: '#0061ce' },  // 100%的颜色
                    ],
                    global: false                         // 缺省为false
                },
                }
            }
        ] 
    })
})
</script>

<style lang="scss" scoped>
.box {
    margin: 27px 20px;
    width: 100%;
    height: 100%;
    background: url(../../images/dataScreen-main-cb.png) no-repeat;
    background-size: 100% 100%;
    .title {
        margin-left: 10px;
        p {
            color: #fff;
            font-size: 20px;
        }
    }
    .charts {
        height: calc(100% - 40px);
    }
}
</style>