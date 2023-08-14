// 引入Pinia仓库
import pinia from "@/store"
// 引入用户相关的仓库
import useUserStore from '@/store/modules/user'
// 获取用户相关的仓库(用于实现按钮权限)
const userStore = useUserStore(pinia)

// 1.获取对应用户的仓库
// 2.定义方法将app实例传递过来(directive方法获取按钮)
// 3.全局自定义指令: 实现按钮权限, 
export const isHasButton = (app: any) => {
    app.directive('has', {
// 4.组件挂载完毕全局自定义指令会执行一次
        mounted(el: any, options: any) {
// 5.判断用户仓库buttons数组是否有对应按钮信息, 若有则显示, 没有则从DOM树删除
            if (!userStore.buttons.includes(options.value)) {
                el.parentNode.removeChild(el)
            }
        }
    })
}