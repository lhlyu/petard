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
            { key: 1, value: '普通', color: 'primary' },
            { key: 2, value: '好友', color: 'success' },
            { key: 3, value: '管理', color: 'danger' }
          ],
          state: [
            { key: 1, value: '正常', color: 'success' },
            { key: 2, value: '黑名', color: 'info' }
          ]
        },
        article: {
          kind: [
            { key: 1, value: '普通', color: 'primary' },
            { key: 2, value: '灵感', color: 'primary' },
            { key: 3, value: '关于', color: 'primary' }
          ],
          storeMode: [
            { key: 1, value: '文件模式', color: 'primary' },
            { key: 2, value: 'text模式', color: 'primary' }
          ],
          state: [
            { key: 1, value: '草稿', color: 'primary' },
            { key: 2, value: '待审', color: 'warning' },
            { key: 3, value: '发布', color: 'success' },
            { key: 4, value: '废弃', color: 'info' }
          ],
          commentState: [
            { key: 1, value: '开放', color: 'success' },
            { key: 2, value: '关闭', color: 'info' }
          ]
        },
        comment: {
          state: [
            { key: 1, value: '待审', color: 'warning' },
            { key: 2, value: '正常', color: 'success' },
            { key: 3, value: '禁用', color: 'info' }
          ]
        },
        category: {
          state: [
            { key: 1, value: '正常', color: 'success' },
            { key: 2, value: '禁用', color: 'info' }
          ]
        },
        quanta: {
          state: [
            { key: 1, value: '正常', color: 'success' },
            { key: 2, value: '禁用', color: 'info' }
          ]
        }
      }
    }
  })

  // 最近十天访问量数据
  M(api.ApiViewStat, options => {
    const days = []
    const counts = []
    const today = new Date().getTime()
    for (let i = 9; i >= 0; i--) {
      days.push(new Date(today - i * 3600 * 24 * 1000).getDate())
      counts.push(Mock.Random.natural(10, 500))
    }
    return {
      code: 0,
      message: 'success',
      data: {
        days,
        counts
      }
    }
  })

  // 数据统计
  M(api.ApiBaseStat, options => {
    return {
      code: 0,
      message: 'success',
      data: {
        userCount: Mock.Random.natural(20, 300),
        friendCount: Mock.Random.natural(10, 100),
        articleCount: Mock.Random.natural(10, 200),
        categoryCount: Mock.Random.natural(5, 30),
        commentCount: Mock.Random.natural(100, 300)
      }
    }
  })
}
