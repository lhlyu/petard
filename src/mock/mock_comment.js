import Mock from 'mockjs'
import M from './mock'
import api from '../api/urls'
import { getUrlParams } from '../utils'

export default ({ mock }) => {
  if (!mock) return
  // 获取评论列表
  M(api.ApiComments, options => {
    const pageSize = parseInt(getUrlParams('pageSize', options.url))
    const pageNum = parseInt(getUrlParams('pageNum', options.url))
    const state = parseInt(getUrlParams('state', options.url))
    const items = []
    for (let i = 0; i < pageSize; i++) {
      const item = {
        id: Mock.Random.natural(1000, 20000),
        articleId: Mock.Random.natural(100, 1000),
        content: Mock.Random.cparagraph(2, 10),
        userId: Mock.Random.natural(1000, 20000),
        userExt: {
          t: Mock.Random.cparagraph(1),
          a: `http://www.thiswaifudoesnotexist.net/example-${Mock.Random.natural(5000, 10000)}.jpg`,
          n: Mock.Random.cname(),
          u: Mock.Random.url('http')
        },
        atId: Mock.Random.natural(1000, 20000),
        atUserId: Mock.Random.natural(1000, 20000),
        atUserExt: {
          c: Mock.Random.cparagraph(2, 4),
          a: `http://www.thiswaifudoesnotexist.net/example-${Mock.Random.natural(5000, 10000)}.jpg`,
          n: Mock.Random.cname(),
          u: Mock.Random.url('http')
        },
        state: Mock.Random.integer(1, 3),
        createdAt: +new Date(Mock.Random.datetime()),
        updatedAt: +new Date(Mock.Random.datetime())
      }
      if (Mock.Random.boolean()) {
        item.atUserId = 0
      }
      if (state) {
        item.state = state
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
          total: 50
        },
        list: items
      }
    }
  })

  // 更新评论
  M(api.ApiUpdComment, {
    code: 0,
    message: 'success',
    data: null
  })
}
