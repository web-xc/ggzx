<template>
    <div class="box">
        <div class="title">
            <p>年龄比例</p>
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
    const option = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: 40,
            right: 20,          // 图例位置
            orient: 'vertical', // 图例组件方向设置
            textStyle: {
                color: '#fff',
                fontSize: 25
            }
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: [ '30%', '90%' ],
                avoidLabelOverlap: false,
                top: -10,
                right: 70, 
                itemStyle: {
                    borderRadius: 8,
                    borderColor: '#fff',
                    borderWidth: 3
                },
                label: {
                    show: true,
                    position: 'inside', // 设置饼状图形文字位置在内侧
                    color: '#fff',
                    fontSize: 20
                },
                labelLine: {
                    show: false
                },
                data: [
                    { value: 1048, name: '军事' },
                    { value: 735, name: '新闻' },
                    { value: 580, name: '直播' },
                    { value: 484, name: '娱乐' },
                    { value: 300, name: '财经' }
                ]
            }
        ],
        grid: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        }
    };
    mycharts.setOption(option)
})
</script>

<style lang="scss" scoped>
.box {
    background: url(../../images/dataScreen-main-cb.png) no-repeat;
    background-size: 100% 100%;
    .title {
        margin-left: 20px;
        p {
            color: #fff;
            font-size: 20px;
        }
    }
    .charts {
        height: 260px;
    }
}
</style>