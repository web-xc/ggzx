<template>
    <div>
        <el-card>
            <div class="box">
                <img :src="userStore.avatar" class="avatar">
                <div class="bottom">
                    <h3 class="title">{{ getTime() }}😀{{ userStore.username }}, 开始你一天的工作吧！</h3>
                    <p class="subtitle">{{ setting.title }}</p>
                </div>
            </div>
        </el-card>
        <div class="icon">
            <svg-icon name="welcome" width="600px" height="300px"></svg-icon>
        </div>
    </div>
</template>

<script setup lang="ts">
// 引入用户相关的小仓库(用于获取用户头像、昵称)
import useUserStore from '@/store/modules/user'
// 引入登录时间判断函数
import { getTime } from '@/utils/time'
// 引入项目标题的配置
import setting from '@/setting'

// 获取用户相关小仓库
const userStore = useUserStore()
</script>

<style scoped lang="scss">
.box {
    display: flex;
    .avatar {
        width: 100px;
        height: 100px;
        border-radius: 50%;
    }
    .bottom {
        margin-left: 20px;
        .title {
            font-size: 25px;
            font-weight: bold;
            margin-top: 10px;
            margin-bottom: 30px;
        }
        .subtitle {
            color: #7200ff;
            font-weight: bold;
            font-style: italic;
        }
    }
}
.icon {
    display: flex;
    justify-content: center;
    margin-top: 30px;
}
</style>

<!-- 测试代码
引入组合式API函数的生命周期函数
import { onMounted } from 'vue'
import useUserStore from '@/store/modules/user'

获取仓库
const userStore = useUserStore()
首页挂载完毕就发送请求获取用户信息
onMounted(() => {
    userStore.userInfo()
}) -->