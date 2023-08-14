<template>
    <div class="box" ref="map">
    </div>
</template>

<script setup lang="ts">
// 引入组合式API函数
import { ref, onMounted } from 'vue'
// 引入echarts插件
import * as echarts from 'echarts'
// 引入中国地图JSON数据
import chinaJSON from './china.json'

// 获取charts盒子的DOM节点
const map = ref()
// 注册中国地图
echarts.registerMap('china', chinaJSON as any)

// 组件挂载完毕(初始化echarts)
onMounted(() => {
    const mycharts = echarts.init(map.value)
    mycharts.setOption({  // 设置配置项
        geo: {            // 地图组件
            map: 'china', // 这中国地图
            roam: true,   // 鼠标缩放效果
            top: 80,     // 地图位置调试
            left: 50,
            right: 50,
            label: {      // 地图文字设置
                show: true, 
                color: '#fff', 
                fontSize: 16
            },
            itemStyle: {    // 每个多边形样式
                normal: {
                    areaColor: 'transparent',
                    borderColor: '#3fdaff',
                    borderWidth: 2,
                    shadowColor: 'rgba(63, 218, 255, 0.5)',
                    shadowBlur: 30,
                },
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
                opacity: .8 // 透明度
            },
            emphasis: {   // 地图高亮效果
                itemStyle: {
                    color: '#2B91B7' // 鼠标hover背景颜色
                },
                label: {
                    color: '#fff', // 鼠标hover文字颜色
                    fontSize: 30   // 鼠标hover文字大小
                }
            }
        },
        grid: {           // 布局位置
            top: 0, 
            left: 0,
            right: 0,
            bottom: 0
        },
        series: [
            {
                type: 'lines', // 航线图形
                data: [
                    {
                        coords: [
                            [116.405285, 39.904989], // 起点
                            [118.02449, 25.66268]    // 终点
                        ],
                        lineStyle: {                 // 航线统一样式设置
                            color: '#fff',
                            width: 6
                        }
                    },
                    {
                        coords: [
                            [116.405285, 39.904989],
                            [104.06888, 30.66856]
                        ],
                        lineStyle: {
                            color: '#fff',
                            width: 6
                        }
                    },
                    {
                        coords: [
                            [116.405285, 39.904989],
                            [85.30123, 41.05903]
                        ],
                        lineStyle: {
                            color: '#fff',
                            width: 6
                        }
                    }
                ],
                effect: {      // 开启航线动画特效
                    show: true,
                    symbol: 'arrow',
                    color: 'red',
                    symbolSize: 25
                }
            }
        ]
    })
})
</script>

<style lang="scss" scoped>

</style>