// 对axios二次封装: 使用请求拦截器与响应拦截器
import axios from "axios"
import { ElMessage } from "element-plus"

// 1. 创建axios实例: 利用axios对象create方法创建
let request = axios.create({
// 基础路径: 会携带/api
    baseURL: import.meta.env.VITE_APP_BASE_API,
// 请求超时的时间
    timeout: 5000
})
// 2. 为request实例添加请求拦截器与响应拦截器
// 请求拦截器
request.interceptors.request.use(config => {
// 返回config配置对象: 有个header属性请求头, 经常给服务端携带公共参数
    return config 
})
// 响应拦截器
request.interceptors.response.use((response) => {
    return response.data  // 成功回调: 简化返回的数据
}, (error) => {
// 失败回调: 处理网络错误
// msg变量: 存储网络错误信息
    let msg = '';
// HTTP状态码
    let status = error.response.status
    switch (status) {
        case 401:
            msg = "token过期"
            break
        case 403:
            msg = '无权访问'
            break
        case 404:
            msg = "请求地址错误"
            break
        case 500:
            msg = "服务器出现问题"
            break
        default:
            msg = "无网络"
    }
// ElMessage提示错误信息
    ElMessage({
        type: 'error',
        message: msg
    })
    return Promise.reject(error)
})

export default request