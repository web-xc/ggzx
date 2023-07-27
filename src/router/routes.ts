// 暴露路由配置(常量路由)
export const consttantRoute = [
    {
        path: '/login',  // 登录路由
        component: () => import('@/views/login/index.vue'),
        name: 'login'    // 命名路由
    },
    {
        path: '/',       // 登录成功展示的路由
        component: () => import('@/views/home/index.vue'),
        name: 'layout'
    },
    {
        path: '/404',
        component: () => import('@/views/404/index.vue'),
        name: '404'
    },
    {
        path: '/:pathMatch(.*)*',  // 任意路由
        redirect: '/404',          // 重定向到404
        name: 'Any'
    }
]