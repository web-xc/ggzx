// 封装登录时间判断函数: 获取结果为: 早上|上午|下午|晚上
export const getTime = () => {
    let message = ''
// 通过内置构造函数Date获取当前时间
    const hours = new Date().getHours()
    if (hours <= 9) {
        message = '早上好'
    } else if (hours <= 12) {
        message = '上午好'
    } else if (hours <= 18) {
        message = '下午好'
    } else {
        message = '晚上好'
    }
    return message
}