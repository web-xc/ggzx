<template>
    <div class="box">
        <div class="title">
            <p>数据统计</p>
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
        title: {
            text: '游客消费统计',
            top: '5%',
            left: '2%',
            textStyle: {
                color: '#29fcff',
                fontSize: 24
            }
        },
        radar: {
            indicator: [
                { name: '消费', max: 6500 },
                { name: '好感', max: 16000 },
                { name: '出行', max: 30000 },
                { name: '小吃', max: 38000 },
                { name: '爱好', max: 52000 },
                { name: '景点', max: 25000 }
            ]   
        },
        series: [
            {
                name: 'Budget vs spending',
                type: 'radar',
                symbolSize: 15,
                data: [
                {
                    value: [4200, 3000, 20000, 35000, 50000, 18000],
                    name: '购物'
                },
                {
                    value: [5000, 14000, 28000, 26000, 42000, 21000],
                    name: '工作'
                }
              ]
            }
        ]
    };
    mycharts.setOption(option)
})
</script>

<style lang="scss" scoped>
.box {
    margin: 10px 0px;
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