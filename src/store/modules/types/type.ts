import type { RouteRecordRaw } from "vue-router"
// 引入分类相关数据的数据类型
import type { CategoryObj } from "@/api/product/attr/type"

// 定义小仓库State数据类型
export interface UserState {
    token: string | null;
    menuRoutes: RouteRecordRaw;
    username: string;
    avatar: string,
    buttons: string[] // 按钮权限
}

// 定义分类仓库State对象的数据类型
export interface CategoryState {
    C1Arr: CategoryObj[],
    C1Id: string | number,
    C2Arr: CategoryObj[],
    C2Id: string | number,
    C3Arr: CategoryObj[],
    C3Id: string | number
}