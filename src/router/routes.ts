// 暴露路由配置(常量路由)
export const constantRoute = [
    {
        path: '/login',  // 登录路由
        component: () => import('@/views/login/index.vue'),
        name: 'login',    // 命名路由
        meta: {
            title: '登录', // 菜单标题
            hidden: true,  // 控制路由标题在菜单中是否隐藏
            icon: 'Promotion' // 菜单文字左侧图标, 支持Element-Plus全部图标
        }
    },
    {
        path: '/',       // 登录成功展示的路由
        component: () => import('@/layout/index.vue'),
        name: 'layout',
        meta: {
            title: '',
            hidden: false,
            icon: ''
        },
        redirect: '/home',
        children: [
            {
                path: '/home',
                component: () => import('@/views/home/index.vue'),
                meta: {
                    title: '首页',
                    hidden: false,
                    icon: 'HomeFilled'
                }
            }
        ]
    },
    {
        path: '/404',
        component: () => import('@/views/404/index.vue'),
        name: '404',
        meta: {
            title: '404',
            hidden: true,
            icon: 'DocumentAdd'
        }
    },
    {
        path: '/screen',       
        name: 'Screen',
        component: () => import('@/views/screen/index.vue'),
        meta: {
            title: '数据大屏',
            hidden: false,
            icon: 'Platform'
        }  
    }
]

// 异步路由
export const asyncRoute = [
    {
        path: '/acl',       
        name: 'Acl',
        component: () => import('@/layout/index.vue'),
        meta: {
            title: '权限管理',
            hidden: false,
            icon: 'Lock'
        },
        redirect: '/acl/user',
        children: [
            {
                path: '/acl/user',       
                name: 'Acl',
                component: () => import('@/views/acl/user/index.vue'),
                meta: {
                    title: '用户管理',
                    hidden: false,
                    icon: 'User'
                }  
            },
            {
                path: '/acl/role',       
                name: 'Role',
                component: () => import('@/views/acl/role/index.vue'),
                meta: {
                    title: '角色管理',
                    hidden: false,
                    icon: 'UserFilled'
                }  
            },
            {
                path: '/acl/permission',       
                name: 'Permission',
                component: () => import('@/views/acl/permission/index.vue'),
                meta: {
                    title: '菜单管理',
                    hidden: false,
                    icon: 'List'
                }  
            },
        ]
    },
    {
        path: '/product',       
        name: 'Product',
        component: () => import('@/layout/index.vue'),
        meta: {
            title: '商品管理',
            hidden: false,
            icon: 'Goods'
        }, 
        redirect: '/product/trademark',
        children: [
            {
                path: '/product/trademark',       
                name: 'Trademark',
                component: () => import('@/views/product/trademark/index.vue'),
                meta: {
                    title: '品牌管理',
                    hidden: false,
                    icon: 'ShoppingCart'
                }, 
            },
            {
                path: '/product/attr',       
                name: 'Attr',
                component: () => import('@/views/product/attr/index.vue'),
                meta: {
                    title: '属性管理',
                    hidden: false,
                    icon: 'Management'
                }, 
            },
            {
                path: '/product/spu',       
                name: 'Spu',
                component: () => import('@/views/product/spu/index.vue'),
                meta: {
                    title: 'SPU管理',
                    hidden: false,
                    icon: 'SetUp'
                }, 
            },
            {
                path: '/product/sku',       
                name: 'Sku',
                component: () => import('@/views/product/sku/index.vue'),
                meta: {
                    title: 'SKU管理',
                    hidden: false,
                    icon: 'ScaleToOriginal'
                },
            }
        ]
    }
]

// 任意路由
export const anyRoute = [
    {
        path: '/:pathMatch(.*)*',  // 任意路由
        redirect: '/404',          // 重定向到404
        name: 'Any',
        meta: {
            title: '任意路由',
            hidden: true,
            icon: 'VideoPause'
        }
    }
]