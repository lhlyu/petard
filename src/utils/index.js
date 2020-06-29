export const getUrlParams = (param, url) => {
  if (url.indexOf('?') === 1) {
    return false
  }
  url = url.substr(1)
  url = url.split('&')
  let nameres
  // 获取全部参数及其值
  for (let i = 0; i < url.length; i++) {
    const info = url[i].split('=')
    const obj = {}
    obj[info[0]] = decodeURI(info[1])
    url[i] = obj
  }
  // 如果传入一个参数名称，就匹配其值
  if (param) {
    for (let i = 0; i < url.length; i++) {
      for (const key in url[i]) {
        if (key === param) {
          nameres = url[i][key]
        }
      }
    }
  } else {
    nameres = url
  }
  // 返回结果
  return nameres
}

// 判断字符串是否为空
export const isEmpty = s => {
  if (!s || s.length === 0) {
    return true
  }
  return false
}
