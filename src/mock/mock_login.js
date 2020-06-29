import Mock from 'mockjs'
import M from './mock'
import api from '../api/urls'

export default ({ mock }) => {
  if (!mock) return
  // 用户登录
  M(api.ApiLogin, options => {
    return {
      code: 0,
      message: 'success',
      data: {
        token: Mock.Random.string('power', 32),
        profile: {
          id: 1,
          account: Mock.Random.string('lower', 5, 20),
          nickName: '鱼酱',
          avatar: `http://www.thiswaifudoesnotexist.net/example-${Mock.Random.natural(5000, 10000)}.jpg`,
          roleName: '管理员'
        },
        options: {
          lockMenu: true,
          pageSize: 6
        }
      }
    }
  })

  // 用户注销
  M(api.ApiLogout, {
    code: 0,
    message: 'success',
    data: null
  })
}
