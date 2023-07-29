// 小仓库: 用于layout组件相关配置的仓库
import { defineStore } from "pinia"

let useLayOutSettingStore = defineStore('SettingStore', {
    state: () => {
        return {
            fold: false, // 用于控制菜单折叠是否收起
            refsh: false // 这个属性用于控制刷新效果
        }
    }
})

export default useLayOutSettingStore