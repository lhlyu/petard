import axios from './axios'
import api from './urls'

const baseUrl = ''

const fetch = (url, method = 'get', data = null) => {
  if (method.toLowerCase() === 'get') {
    return axios.request({
      url: url,
      method: method,
      baseURL: baseUrl,
      params: data
    })
  }
  return axios.request({
    url: url,
    method: method,
    baseURL: baseUrl,
    data: data
  })
}

const fetchMap = m => {
  const mp = {}
  for (const item in m) {
    const key = `fetch${item.slice(3)}`
    const value = m[item]
    mp[key] = data => fetch(value.u, value.m, data)
  }
  return mp
}

// 上面的写法类似于下面注释这种，上面简化了
// const fetchs = {
//   fetchLogin: data => fetch(api.LoginApi.u, api.LoginApi.m, data)
// }

export default fetchMap(api)
