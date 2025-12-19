import axios from 'axios'
import { message } from 'ant-design-vue'

const { error: MessageError } = message

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: import.meta.env.VITE_APP_BASE_API_URL,
  // 超时
  timeout: 10000
})
// request拦截器
service.interceptors.request.use(
  (config) => {
    // 是否需要设置 token
    return config
  },
  (error) => {
    console.log(error)
    Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (res) => {
    if (res.data.code === 200) {
      return res.data
    }

    MessageError({ '-1': '输入参数有误', '-2': '计算过程有误' }[res.data.msg] || '系统接口异常')

    return Promise.reject(res)
  },
  (error) => {
    console.log('err' + error)
    let { message } = error
    if (message === 'Network Error') {
      message = '后端接口连接异常'
    } else if (message.includes('timeout')) {
      message = '系统接口请求超时'
    } else if (message.includes('Request failed with status code')) {
      message = '系统接口' + message.substr(message.length - 3) + '异常'
    }
    MessageError(message)
    return Promise.reject(error)
  }
)

export default service
