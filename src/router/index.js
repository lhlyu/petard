import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import LastOrder from '../views/pages/LastOrder'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children:[  {
      path: '/create',
      name: 'LastOrder',
      component: LastOrder
    }]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
