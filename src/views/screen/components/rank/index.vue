<template>
    <div class="box">
        <div class="title">
            <p>热门景区排行</p>
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
            text: '景区排行',
            left: '5%',
            link: 'http://baidu.com', // 主标题设置超链接 
            textStyle: {
                color: '#29fcff',
                fontSize: 24
            },
            subtext: '各大景区排行', // 子标题
            subtextStyle: {         // 子标题样式
                color: '#29fcff',
                fontSize: 24
            },
        },
        xAxis: {
            type: 'category', // x轴均匀分布展示
        },
        yAxis: {},
        grid: {
            top: 0,
            left: 20,
            right: 20,
            bottom: 20
        },
        series: [
            {
                type: 'bar',
                data: [10, 20, 30, 40, 50, 60, 70],
                label: {              // 柱状图配置
                    show: true,       // 柱状图形显示文字
                    position: 'insideTop',  // 文字位置
                    color: '#fff'
                },
                showBackground: true, // 柱形背景颜色
                backgroundStyle: {    // 柱形底部背景颜色
                    color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                        { offset: 0, color: 'black' },
                        { offset: 1, color: 'blue' },
                    ],
                    global: false
                },
                },
                itemStyle: {
                    borderRadius: [10, 10, 0, 0], // 柱条圆角
                    color: function (data: any) { // 柱条颜色(使用dataIndex方法指定颜色)
                        const arr = ['red', 'orange', 'yellowgreen', 'green', 'purple', 'hotpink', 'skyblue']
                        return arr[data.dataIndex]
                    }
                }
            },
            {
                type: 'line',
                data: [10, 20, 30, 40, 50, 60, 70],
                smooth: true // 平滑曲线
            }
        ],
        tooltip: { } // 抽屉配置
    })
})
</script>

<style lang="scss" scoped>
.box {
    margin: 20px 0px;
    width: 100%;
    height: 100%;
    background: url(../../images/dataScreen-main-cb.png) no-repeat;
    background-size: 100% 100%;
    .title {
        margin-left: -5px;
        p {
            color: #fff;
            font-size: 20px;
        }
    }
    .charts {
        height: calc(100% - 30px);
    }
}
</style>