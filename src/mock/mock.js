import Mock from 'mockjs'

Mock.setup({
  timeout: '200-1000'
})

const M = (api, template) => {
  if (!api) {
    return
  }
  const url = RegExp(api.u + '.*')
  Mock.mock(url, api.m, template)
}

export default M
