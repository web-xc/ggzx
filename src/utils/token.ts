// 封装本地存储数据与读取数据方法
// 存储数据
export const SET_TOKEN = (token: string) => {
    localStorage.setItem('TOKEN', token)
}
// 读取本地存储数据
export const GET_TOKEN = () => {
    localStorage.getItem('TOKEN')
}