// eslint-disable-next-line no-unused-vars
const G = 'get'
// eslint-disable-next-line no-unused-vars
const P = 'post'
// eslint-disable-next-line no-unused-vars
const D = 'delete'
// eslint-disable-next-line no-unused-vars
const U = 'put'

const S = (url, method = 'get') => {
  return {
    u: url,
    m: method
  }
}

export default {
  // 登陆
  ApiLogin: S('/api/login', G),
  // 注销
  ApiLogout: S('/api/logout', G),
  // 个人信息
  ApiProfile: S('/api/profile', G),
  // 更新个人信息
  ApiUpdProfile: S('/api/profile', U),
  // 上传文件
  ApiUpload: S('/api/upload', P),
  // 获取配置列表
  ApiQuantas: S('/api/quantas', G),
  // 添加配置信息
  ApiAddQuanta: S('/api/quanta', P),
  // 更新配置信息
  ApiUpdQuanta: S('/api/quanta', U),
  // 删除配置信息
  ApiDelQuanta: S('/api/quanta', D),
  // 获取用户列表
  ApiUsers: S('/api/users', G),
  // 更新用户信息
  ApiUpdUser: S('/api/user', U),
  // 获取文章列表
  ApiArticles: S('/api/articles', G),
  // 获取单篇文章
  ApiArticle: S('/api/article', G),
  // 添加文章
  ApiEditArticle: S('/api/article', P),
  // 删除文章
  ApiDelArticle: S('/api/article', D),
  // 获取分类列表
  ApiCategorys: S('/api/categorys', G),
  // 添加分类
  ApiAddCategory: S('/api/category', P),
  // 更新分类
  ApiUpdCategory: S('/api/category', U),
  // 删除分类
  ApiDelCategory: S('/api/category', D),
  // 获取评论列表
  ApiComments: S('/api/comments', G),
  // 更新评论
  ApiUpdComment: S('/api/comment', U),
  // ------------------------------------------------------------
  // 字典
  ApiDict: S('/api/dict'),
  // 最近十天访问量数据
  ApiViewStat: S('/api/view/stat'),
  // 数据统计
  ApiBaseStat: S('/api/base/stat')
}
