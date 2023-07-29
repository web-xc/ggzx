// 引入项目中的全局组件 
import SvgIcon from '@/components/SvgIcon/index.vue'
// 引入Element-Plus全部图标组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 全局对象
const allGloalComponent = { SvgIcon, ElementPlusIconsVue }

// 暴露插件对象, 必须为install方法
export default {
    install(app) {
// 注册项目中全部的全局组件, 将组件注册为全局组件
        Object.keys(allGloalComponent).forEach(key => {
            app.component(key, allGloalComponent[key])
        });
// 将Element-Plus图标注册为全局组件
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            app.component(key, component)
          }
    }
}