import type { RouteRecordRaw } from "vue-router"

// 定义小仓库State数据类型
export interface UserState {
    token: string | null;
    menuRoutes: RouteRecordRaw
}