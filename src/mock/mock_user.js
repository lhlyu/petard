import Mock from 'mockjs'
import M from './mock'
import api from '../api/urls'
import { getUrlParams } from '../utils'

export default ({ mock }) => {
  if (!mock) return
  // 获取用户列表
  M(api.ApiUsers, options => {
    const pageSize = parseInt(getUrlParams('pageSize', options.url))
    const pageNum = parseInt(getUrlParams('pageNum', options.url))
    const items = []
    for (let i = 0; i < pageSize; i++) {
      const item = {
        id: Mock.Random.natural(1000, 20000),
        account: Mock.Random.string('power', 6, 10),
        nickName: Mock.Random.cname(),
        source: 'github',
        avatar: `http://www.thiswaifudoesnotexist.net/example-${Mock.Random.natural(5000, 10000)}.jpg`,
        bio: Mock.Random.cword(16),
        url: 'https://github.com/lhlyu/petard',
        ip: Mock.Random.ip(),
        identity: Mock.Random.natural(1, 3),
        state: Mock.Random.natural(1, 2),
        lastAt: +new Date(Mock.Random.datetime()),
        createdAt: +new Date(Mock.Random.datetime()),
        updatedAt: +new Date(Mock.Random.datetime())
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
          total: 1000
        },
        list: items
      }
    }
  })

  // 更新用户信息
  M(api.ApiUpdUser, {
    code: 0,
    message: 'success',
    data: null
  })
}
