import Mock from 'mockjs'
import M from './mock'
import api from '../api/urls'

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

  // 安全设置
  M(api.ApiUpdSecurity, {
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
