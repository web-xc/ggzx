<template>
    <h2>我是App组件</h2>
    <el-button type="primary" size="default" :icon="Plus">主要按钮</el-button>
    <el-button type="success" size="small" :icon="Edit">编辑按钮</el-button>
    <el-button type="danger" size="default" :icon="Delete">删除按钮</el-button>
    <el-pagination
      :page-sizes="[100, 200, 300, 400]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
    />
    <svg-icon name="home" color="pink" width="50px" height="50px"></svg-icon>
    <div class="box">
        <h2>你好</h2>
    </div>
    <!-- 测试四个常量路由器 -->
    <router-view></router-view>
</template>

<script setup lang="ts">
    import { onMounted } from 'vue'
    // 引入图标组件
    import { Plus, Edit, Delete } from '@element-plus/icons-vue'
    // 引入请求拦截器与响应拦截器
    import request from '@/utils/request'
    // 引入统一管理项目用户相关的接口
    import { reqLogin } from './api/user';

    // 当组件挂载完毕, 测试发一个请求
    onMounted(() => {
        request({
            url: '/user/login',
            method: 'post',
            data: {
                username: 'admin',
                password: '111111'
            }
        }).then((res) => {
            console.log(res)
        })
        reqLogin({username: 'admin', password: '111111'})
    })
</script>

<style scoped lang="scss"> 
  .box {
    h2 {
        color: $color;
    }
  }
</style>