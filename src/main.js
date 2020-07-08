import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Antd from 'ant-design-vue'

import 'ant-design-vue/dist/antd.less'

import 'animate.css'
import './styles/index.scss'

import 'vditor/dist/index.css'

import './mixins'
import './directives'
import './mock'

Vue.use(Antd)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
