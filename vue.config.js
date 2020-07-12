const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  devServer: {
    port: 8000 // 端口
  },
  publicPath: isProduction ? 'https://cdn.jsdelivr.net/gh/lhlyu/petard@gh-pages/' : '/'
  // chainWebpack: (config) => {
  //   //忽略的打包文件
  //   config.externals({
  //     'vue': 'Vue',
  //     'vue-router': 'VueRouter',
  //     'vuex': 'Vuex',
  //     'axios': 'axios',
  //     'element-ui': 'ELEMENT',
  //   })
  //   const entry = config.entry('app')
  //   entry
  //     .add('@/mock')
  //     .end()
  // }
}
