import Mock from 'mockjs'
import M from './mock'
import api from '../api/urls'

import { getUrlParams } from '../utils'

export default ({ mock }) => {
  if (!mock) return

  // 获取配置列表
  M(api.ApiQuantas, options => {
    const pageSize = parseInt(getUrlParams('pageSize', options.url))
    const pageNum = parseInt(getUrlParams('pageNum', options.url))
    const items = []
    for (let i = 0; i < pageSize; i++) {
      const item = {
        id: Mock.Random.natural(1, 1000),
        key: Mock.Random.string('power', 6, 10),
        value: Mock.Random.string('power', 10, 20),
        state: Mock.Random.natural(1, 2)
      }
      items.push(item)
    }
    return {
      code: 0,
      message: 'success',
      data: {
        page: {
          pageSize: pageSize,
          pageNum: pageNum,
          total: 100
        },
        list: items
      }
    }
  })

  // 添加配置信息
  M(api.ApiAddQuanta, {
    code: 0,
    message: 'success',
    data: null
  })

  // 更新配置信息
  M(api.ApiUpdQuanta, {
    code: 0,
    message: 'success',
    data: null
  })

  // 删除配置信息
  M(api.ApiDelQuanta, {
    code: 0,
    message: 'success',
    data: null
  })
}
