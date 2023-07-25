import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')

const fn = () => {
  console.log('测试没有格式化的代码')
}
fn()

const fnn = () => {
  console.log('1111')
}
