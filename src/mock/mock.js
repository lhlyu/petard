import Mock from 'mockjs'

Mock.setup({
  timeout: '200-1000'
})

const M = (api, template) => {
  if (!api) {
    return
  }
  let url = api.u
  if (api.m === 'get') {
    url = RegExp(api.u + '.*')
  }
  Mock.mock(url, api.m, template)
}

export default M
