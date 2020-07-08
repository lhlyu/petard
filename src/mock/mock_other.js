import Mock from 'mockjs'
import M from './mock'
import api from '../api/urls'

export default ({ mock }) => {
  if (!mock) return

  // 字典
  M(api.ApiDict, options => {
    return {
      code: 0,
      message: 'success',
      data: {
        user: {
          identity: [
            { key: 1, value: '普通', color: '#45aaf2' },
            { key: 2, value: '好友', color: '#3ae374' },
            { key: 3, value: '管理', color: '#a55eea' }
          ],
          state: [
            { key: 1, value: '正常', color: '#3ae374' },
            { key: 2, value: '黑名', color: '#4b4b4b' }
          ]
        },
        article: {
          kind: [
            { key: 1, value: '普通', color: '#0abde3' },
            { key: 2, value: '灵感', color: '#0abde3' },
            { key: 3, value: '关于', color: '#0abde3' }
          ],
          storeMode: [
            { key: 1, value: '文件模式', color: '#FD7272' },
            { key: 2, value: 'text模式', color: '#FD7272' }
          ],
          state: [
            { key: 1, value: '草稿', color: '#d1d8e0' },
            { key: 2, value: '待审', color: '#ff9f1a' },
            { key: 3, value: '发布', color: '#3ae374' },
            { key: 4, value: '废弃', color: '#4b4b4b' }
          ],
          commentState: [
            { key: 1, value: '开放', color: '#3ae374' },
            { key: 2, value: '关闭', color: '#4b4b4b' }
          ]
        },
        comment: {
          state: [
            { key: 1, value: '待审', color: '#ff9f1a' },
            { key: 2, value: '正常', color: '#3ae374' },
            { key: 3, value: '禁用', color: '#4b4b4b' }
          ]
        },
        category: {
          state: [
            { key: 1, value: '正常', color: '#3ae374' },
            { key: 2, value: '禁用', color: '#4b4b4b' }
          ]
        },
        quanta: {
          state: [
            { key: 1, value: '正常', color: '#3ae374' },
            { key: 2, value: '禁用', color: '#4b4b4b' }
          ]
        }
      }
    }
  })

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
