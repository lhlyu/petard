import axios from 'axios'

// axios默认配置
axios.defaults.timeout = 10000 // 超时时间

// http request 拦截器
axios.interceptors.request.use(config => {
  config.headers['Content-Type'] = 'application/json;charset=UTF-8'
  return config
// eslint-disable-next-line handle-callback-err
}, error => {
  return Promise.resolve({
    code: -1,
    message: 'error',
    data: null
  })
})

// http response 拦截器
axios.interceptors.response.use(
  response => {
    if (!response.data) {
      return Promise.resolve({
        code: 1,
        message: 'failure',
        data: null
      })
    }
    return Promise.resolve(response.data)
    // eslint-disable-next-line handle-callback-err
  }, error => {
    return Promise.resolve({
      code: -1,
      message: 'error',
      data: null
    }) // 返回接口返回的错误信息
  })
export default axios
