<template>
    <div>
        <el-card class="box-card">
            <!-- 卡片顶部添加品牌按钮 -->
            <el-button type="primary" size="default" icon="Plus">添加品牌</el-button>
            <!-- 表格组件: 用于展示已有的平台数据 -->
            <!-- 1. border: 设置表格是否有边框 -->
            <!-- 2. label: 列表名称 3. width: 表格列的宽度 4. align: 列的对齐方式 -->
            <el-table style="margin: 10px 0px;" border>
                <el-table-column label="序号" width="80px" align="center"></el-table-column>
                <el-table-column label="品牌名称"></el-table-column>
                <el-table-column label="品牌LOGO"></el-table-column>
                <el-table-column label="品牌操作"></el-table-column>
            </el-table>
            <!-- 分页器组件 -->
            <!-- v-model:current-pag: 设置当前页码 -->
            <!-- v-model:page-size: 设置每页展示几条数据 -->
            <!-- :page-sizes: 设置下拉菜单数据 -->
            <!-- :background: 设置分页器按钮颜色 -->
            <!-- layout: 设置分页器6个子组件布局(->符号调整样式) -->
            <el-pagination
                v-model:current-page="pageNo"
                v-model:page-size="limit"
                :page-sizes="[11, 22, 33]"
                :background="true"
                layout="prev, pager, next, jumper, ->, sizes, total"
                :total="20"/>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const pageNo = ref(1)
const limit = ref(3)
</script>

<style lang="scss" scoped>

</style>