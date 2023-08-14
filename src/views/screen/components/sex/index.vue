<template>
    <div class="box">
        <div class="title">
            <p>男女比例</p>
            <img src="../../images/dataScreen-title.png">
        </div>
        <div class="sex">
            <div class="man">
                <img src="../../images/man.png">
            </div>
            <div class="woman">
                <img src="../../images/woman.png">
            </div>
        </div>
        <div class="rate">
            <p>男士58%</p>
            <p>女士42%</p>
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
// 1.获取echarts类的实例 2.设置实例的配置项
onMounted(() => {
    const mycharts = echarts.init(charts.value)
    mycharts.setOption({
        title: {
            text: '男女比例',
            left: '38%',
            textStyle: {
                color: '#29fcff',
                fontSize: 24
            }
        },
        xAxis: {
            show: false, // 隐藏X/Y轴
            min: 0,      // 最大/小占比多少
            max: 100
        },
        yAxis: {
            show: false,
            type: 'category' // 分开柱条图形
        },
        series: [
            {
                type: 'bar',
                data: [ 58 ],
                barWidth: 20,         // 柱条宽度
                z: 100,               // 柱条层级
                itemStyle: {
                    color: '#007afe', // 柱条颜色
                    borderRadius: 20  // 柱条圆角
                }
            },
            {
                type: 'bar',
                data: [ 100 ],        // 让柱条占比100, 然后其他柱条不能被覆盖
                barWidth: 20,
                barGap: '-100%',      // 柱条位置
                itemStyle: {
                    color: '#ff4b7a',
                    borderRadius: 20
                }
            }
        ],
        grid: {
            left: 60,
            right: 60,
            top: 0,
            bottom: 0
        }
    })
})
</script>

<style lang="scss" scoped>
.box {
    margin: 20px 0px;
    background: url(../../images/dataScreen-main-cb.png) no-repeat;
    background-size: 100% 100%;
    .title {
        margin-left: 20px;
        p {
            color: #Fff;
            font-size: 20px;
        }
    }
    .sex {
        display: flex;
        justify-content: center;
        .man {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 20px;
            width: 111px;
            height: 115px;
            background: url(../../images/man-bg.png) no-repeat;
        }
        .woman {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 20px;
            width: 111px;
            height: 115px;
            background: url(../../images/woman-bg.png) no-repeat;
        }
    }
    .rate {
        display: flex;
        justify-content: space-between;
        padding: 0px 30px;
        color: #fff;
    }
    .charts {
        height: 100px;
    }
}
</style>