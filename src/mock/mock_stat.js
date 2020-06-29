import Mock from 'mockjs'
import M from './mock'
import api from '../api/urls'

export default ({ mock }) => {
  if (!mock) return
  // 最近十天访问量数据
  M(api.ApiViewStat, options => {
    const items = []
    const today = new Date().getTime()
    for (let i = 0; i < 10; i++) {
      const item = {
        day: new Date(today - i * 3600 * 24 * 1000).getDate(),
        count: Mock.Random.natural(10, 500)
      }
      items.push(item)
    }
    return {
      code: 0,
      message: 'success',
      data: items
    }
  })

  // 数据统计
  M(api.ApiBaseStat, options => {
    return {
      code: 0,
      message: 'success',
      data: {
        userCount: Mock.Random.natural(20, 3000),
        friendCount: Mock.Random.natural(10, 100),
        articleCount: Mock.Random.natural(10, 200),
        categoryCount: Mock.Random.natural(5, 30),
        viewCount: Mock.Random.natural(5000, 100000),
        commentCount: Mock.Random.natural(100, 300)
      }
    }
  })
}
