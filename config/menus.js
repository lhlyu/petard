// 页面及其权限设定

const menus = {
  board: { title: '仪表板', name: 'board', icon: 'fa fa-dashboard', path: '/admin/board', upper: 'admin' },
  // ----------------------------------------------------------------------------------------------
  profile: { title: '个人中心', name: 'profile', icon: 'fa fa-snowflake-o', path: '/admin/profile', upper: 'admin' },
  profileInfo: { title: '个人信息', name: 'profile-info', icon: 'fa fa-user-o', path: '/admin/profile/info', upper: 'profile' },
  profileQuanta: { title: '配置管理', name: 'profile-quanta', icon: 'fa fa-sliders', path: '/admin/profile/quanta', upper: 'profile' },
  // ----------------------------------------------------------------------------------------------
  user: { title: '用户管理', name: 'user', icon: 'fa fa-users', path: '/admin/user', upper: 'admin' },
  // ----------------------------------------------------------------------------------------------
  article: { title: '文章管理', name: 'article', icon: 'fa fa-file-text-o', path: '/admin/article', upper: 'admin' },
  articleList: { title: '文章列表', name: 'article-list', icon: 'fa fa-files-o', path: '/admin/article/list', upper: 'article' },
  articleEdit: { title: '编辑文章', name: 'article-edit', icon: 'fa fa-plus', path: '/admin/article/edit', upper: 'article' },
  category: { title: '文章分类', name: 'category', icon: 'fa fa-bookmark-o', path: '/admin/article/category', upper: 'article' },
  // ----------------------------------------------------------------------------------------------
  comment: { title: '评论管理', name: 'comment', icon: 'fa fa-commenting-o', path: '/admin/comment', upper: 'admin' },
  demo: { title: '示例页面', name: 'demo', icon: 'fa fa-web', path: '/admin/demo', upper: 'admin' }

}

export default menus
