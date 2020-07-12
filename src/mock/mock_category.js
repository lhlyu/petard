import Mock from 'mockjs'
import M from './mock'
import api from '../api/urls'
import { getUrlParams } from '../utils'

export default ({ mock }) => {
  if (!mock) return
  // 获取分类列表
  M(api.ApiCategorys, options => {
    const pageSize = parseInt(getUrlParams('pageSize', options.url))
    const pageNum = parseInt(getUrlParams('pageNum', options.url))
    const items = []
    for (let i = 0; i < pageSize; i++) {
      const item = {
        id: i + 1,
        name: Mock.Random.cname(2, 4),
        color: Mock.Random.color(),
        count: Mock.Random.integer(0, 10),
        state: Mock.Random.natural(1, 2),
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
          total: 50
        },
        list: items
      }
    }
  })

  // 添加分类
  M(api.ApiAddCategory, {
    code: 0,
    message: 'success',
    data: null
  })

  // 更新分类
  M(api.ApiUpdCategory, {
    code: 0,
    message: 'success',
    data: null
  })

  // 删除分类
  M(api.ApiDelCategory, {
    code: 0,
    message: 'success',
    data: null
  })
}
