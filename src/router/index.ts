// 通过vue-router插件实现模板路由配置
import { createRouter, createWebHashHistory } from 'vue-router'
// 引入常量路由
import { consttantRoute } from './routes'

// 创建路由器
let router = createRouter({
// 路由模式: hash
    history: createWebHashHistory(),
    routes: consttantRoute,
// 滚动行为
    scrollBehavior() {
        return {
            top: 0,
            left: 0
        }
    }
})

export default router