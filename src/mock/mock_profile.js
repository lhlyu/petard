import Mock from 'mockjs'
import M from './mock'
import api from '../api/urls'

import { getUrlParams } from '../utils'

export default ({ mock }) => {
  if (!mock) return
  // 个人信息
  M(api.ApiProfile, {
    code: 0,
    message: 'success',
    data: {
      id: Mock.Random.natural(1000, 20000),
      account: Mock.Random.string('power', 6, 10),
      nickName: Mock.Random.cname(),
      source: 'github',
      avatar: `http://www.thiswaifudoesnotexist.net/example-${Mock.Random.natural(5000, 10000)}.jpg`,
      bio: Mock.Random.cword(16),
      url: 'https://github.com/lhlyu',
      ip: Mock.Random.ip(),
      lastAt: +new Date(Mock.Random.datetime()),
      createdAt: +new Date(Mock.Random.datetime())
    }
  })

  // 更新个人信息
  M(api.ApiUpdProfile, {
    code: 0,
    message: 'success',
    data: null
  })

  // 获取配置列表
  M(api.ApiQuantas, options => {
    const pageSize = parseInt(getUrlParams('pageSize', options.url))
    const pageNum = parseInt(getUrlParams('pageNum', options.url))
    const items = []
    for (let i = 0; i < pageSize; i++) {
      const item = {
        id: Mock.Random.natural(1, 1000),
        key: Mock.Random.string('power', 6, 10),
        value: Mock.Random.string('power', 10, 20)
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

  // 上传文件
  M(api.ApiUpload, {
    code: 0,
    message: 'success',
    data: {
      url: `http://www.thiswaifudoesnotexist.net/example-${Mock.Random.natural(5000, 10000)}.jpg`
    }
  })
}
