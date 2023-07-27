<template>
    <!-- SVG标签的使用: 图标外层容器, 内部需使用use标签结合使用 -->
    <!-- xlink:href指定用哪个图标, 属性值必须为#icon-图标名字 -->
    <!-- use标签fill属性可以设置图标颜色 -->
    <svg :style="{ width, height }">
        <use :xlink:href="prefix + name" :fill="color"></use>
    </svg>
</template>

<script setup lang="ts">
defineProps({
// xlink:href属性值前缀
    prefix: {
        type: String,
        default: '#icon-'
    },
// 提供使用图标的名字
    name: String,
// 接收父组件传递的SVG颜色
    color: {
        type: String,
        default: ''
    },
// 接收父组件传递的图标宽度, 默认16px
    width: {
        type: String,
        default: '16px'
    },
// 接收父组件传递的图标高度, 默认16px
    height: {
        type: String,
        default: '16px'
    }
})
</script>