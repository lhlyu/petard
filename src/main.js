import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import 'animate.css'
import './styles/index.scss'

import 'vditor/src/assets/scss/index.scss'

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
