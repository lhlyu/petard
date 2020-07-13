import Mock from 'mockjs'
import M from './mock'
import api from '../api/urls'
import { getUrlParams } from '../utils'

export default ({ mock }) => {
  if (!mock) return
  // 获取文章列表
  M(api.ApiArticles, options => {
    const pageSize = parseInt(getUrlParams('pageSize', options.url))
    const pageNum = parseInt(getUrlParams('pageNum', options.url))
    const items = []
    for (let i = 0; i < pageSize; i++) {
      const tags = []
      const number = Mock.Random.natural(1, 6)
      for (let j = 0; j < number; j++) {
        const tag = Mock.Random.cword(2, 3)
        tags.push(tag)
      }
      const item = {
        id: Mock.Random.natural(1000, 20000),
        title: Mock.Random.cparagraph(1),
        summary: Mock.Random.cparagraph(0, 5),
        cover: `https://cdn.jsdelivr.net/gh/lhlyu/pb@master/b/${Mock.Random.natural(1, 50)}.jpg`,
        top: Mock.Random.integer(0, 10),
        categoryName: Mock.Random.cword(2, 4),
        tags: tags,
        viewCount: Mock.Random.natural(1, 10000),
        commentCount: Mock.Random.natural(1, 100),
        kind: Mock.Random.natural(1, 3),
        storeMode: 2,
        state: Mock.Random.natural(1, 4),
        commentState: Mock.Random.natural(1, 2),
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
          total: 200
        },
        list: items
      }
    }
  })

  // 获取单篇文章
  M(api.ApiArticle, options => {
    const id = getUrlParams('id', options.url)
    const tags = []
    const number = Mock.Random.natural(1, 6)
    for (let j = 0; j < number; j++) {
      const tag = Mock.Random.cword(2, 3)
      tags.push(tag)
    }
    const item = {
      id: id,
      title: Mock.Random.cparagraph(1),
      summary: Mock.Random.cparagraph(2, 3),
      cover: `https://cdn.jsdelivr.net/gh/lhlyu/pb@master/b/${Mock.Random.natural(1, 50)}.jpg`,
      top: 0,
      categoryId: Mock.Random.natural(1, 10),
      tags: tags,
      content: Mock.Random.cparagraph(10, 30),
      kind: Mock.Random.natural(1, 4),
      storeMode: 2,
      state: Mock.Random.natural(1, 4),
      commentState: Mock.Random.natural(1, 3)
    }
    return {
      code: 0,
      message: 'success',
      data: item
    }
  })

  // 修改文章
  M(api.ApiEditArticle, {
    code: 0,
    message: 'success',
    data: null
  })

  // 删除文章
  M(api.ApiDelArticle, {
    code: 0,
    message: 'success',
    data: null
  })
}
