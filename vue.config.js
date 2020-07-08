const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  devServer: {
    port: 8000 // 端口
  },
  publicPath: isProduction ? 'https://cdn.jsdelivr.net/gh/lhlyu/petard@gh-pages/' : '/',
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
          modifyVars: {
            'primary-color': '#00d2d3',
            'link-color': '#00d2d3',
            'border-radius-base': '5px'
          }
        }
      }
    }
  }
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
