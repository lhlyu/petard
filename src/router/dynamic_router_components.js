// 动态路由组件设置
const dynamicRouterComponents = {
  404: () => import('@/views/errors/404.vue'),
  board: () => import('@/views/board/index.vue'),
  profile: () => import('@/layout/blank.vue'),
  'profile-info': () => import('@/views/profile/info/index.vue'),
  'profile-quanta': () => import('@/views/profile/quanta/index.vue'),
  user: () => import('@/views/user/index.vue'),
  article: () => import('@/layout/blank.vue'),
  'article-list': () => import('@/views/article/list/index.vue'),
  'article-edit': () => import('@/views/article/edit/index.vue'),
  category: () => import('@/views/article/category/index.vue'),
  comment: () => import('@/views/comment/index.vue'),
  demo: () => import('@/views/demo/index.vue')
}

export default dynamicRouterComponents
