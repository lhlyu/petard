import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import VueClipboard from 'vue-clipboard2'

import 'animate.css'
import './styles/el.scss'
import './styles/index.scss'
import 'vditor/dist/index.css'

import './mixins'
import './directives'
import './mock'

Vue.use(Element)
Vue.use(VueClipboard)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
