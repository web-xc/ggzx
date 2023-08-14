<template>
    <div class="box">
        <div class="title">
            <p>年度游客量对比</p>
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
            text: '散点图',
            top: '10%',
            left: '2%',
            textStyle: {
                color: '#29fcff',
                fontSize: 24
            }
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            show: false
        },
        grid: {
            top: 20,
            left: 20,
            right: 20,
            bottom: 20
        },
        series: [
            {
                type: 'scatter',   // 散点图系列
                data: [100, 220, 350, 300, 100, 200, 150, 250],
                symbol: 'diamond', // 散点图标
                symbolSize: 25,    // 散点大小
                label: {
                    show: true,    // 散点数据文字显示
                    position: 'top',
                    color: '#fff',
                    fontSize: 20
                },
                itemStyle: {
                    color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                        { offset: 0, color: '#00fffb' },
                        { offset: 1, color: '#0061ce' },
                    ],
                }
                }
            }
        ]
    })
})
</script>

<style lang="scss" scoped>
.box {
    margin: 5px 0px;
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
        height: calc(100% - 30px);
    }
}
</style>