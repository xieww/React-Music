import axios from 'axios'
//BASE_URL是默认的url地址，如果你安装了webpack，可以在webpack配置全局变量
axios.defaults.baseURL = BASE_URL;

export const getData = (url, param) => {
    return (
        axios.get(`${url}`)
    )
}

export const postData = (url, param) => {
    return (
        axios.post(`${url}`, param)
    )
}