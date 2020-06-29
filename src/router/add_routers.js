import menus from '../../config/menus'
import routes from './basic_routers'
import dynamicRouterComponents from './dynamic_router_components'

import Layout from '@/layout/index.vue'
import Blank from '@/layout/blank.vue'

const getDynamicRoutes = items => {
  const r = [{
    path: '/admin',
    name: 'layout',
    component: Layout,
    redirect: items && items[0].path,
    children: items
  }, {
    path: '*',
    name: '404',
    component: dynamicRouterComponents['404']
  }]
  return routes.concat(r)
}

const getTree = (upper, arr) => {
  const nodes = arr.filter(a => a.upper === upper)
  if (nodes.length === 0) {
    return []
  }
  for (let i = 0, length = nodes.length; i < length; i++) {
    const items = getTree(nodes[i].name, arr)
    if (items.length === 0) {
      nodes[i].component = dynamicRouterComponents[nodes[i].name]
    } else {
      nodes[i].component = Blank
      nodes[i].redirect = items[0].path
      nodes[i].children = items
    }
  }
  return nodes
}

const getMenus = codes => {
  if (!codes || codes.length === 0) {
    return null
  }
  const filterMenus = []
  for (const value of Object.values(menus)) {
    if (codes.indexOf(value.code) > -1 || codes[0] === 9999) {
      filterMenus.push(value)
    }
  }
  if (filterMenus.length === 0) {
    return null
  }
  // 生成树
  return getTree('admin', filterMenus)
}

export {
  getMenus,
  getDynamicRoutes
}
