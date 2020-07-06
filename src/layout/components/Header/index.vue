<template>
  <header class="u-header">
    <div class="u-header-left">
      <a-breadcrumb>
        <a-breadcrumb-item v-for="(v,i) in breadcrumbs" :key="i">
          <i :class="v.icon" style="margin-right: 5px"></i>
          <span>{{v.title}}</span>
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <div class="u-header-right">
      <a href="https://lhlyu.github.io/petard/docs" target="_blank" style="margin-right: 40px">文档</a>
      <a-dropdown>
        <a class="ant-dropdown-link">
          <a-avatar size="small" icon="user" :src="profile.avatar" style="margin-right: 5px" /> {{profile.nickName}}
        </a>
        <a-menu slot="overlay">
          <a-menu-item>
            <router-link to="/admin/profile">个人中心</router-link>
          </a-menu-item>
          <a-menu-item>
            <a href="javascript:;" @click="logout">注销</a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </header>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'index',
  data () {
    return {
      breadcrumbs: []
    }
  },
  watch: {
    $route (val, oldVal) {
      this.breadcrumbs = this.getBreadcrumbs(val.path, this.menus)
    }
  },
  mounted () {
    this.breadcrumbs = this.getBreadcrumbs(this.$route.path, this.menus)
  },
  methods: {
    ...mapActions(['LOGOUT']),
    getBreadcrumbs (path, menus) {
      if (!menus) {
        return
      }
      const length = menus.length
      const breadcrumbs = []
      for (let i = 0; i < length; i++) {
        if (menus[i].children && menus[i].children.length) {
          const items = this.getBreadcrumbs(path, menus[i].children)
          if (items && items.length) {
            breadcrumbs.push({
              title: menus[i].title,
              icon: menus[i].icon
            }, ...items)
            return breadcrumbs
          }
        } else {
          if (menus[i].path === path) {
            return [{
              title: menus[i].title,
              icon: menus[i].icon
            }]
          }
        }
      }
      return null
    },
    logout () {
      sessionStorage.clear()
      this.LOGOUT()
      this.$router.push('/')
    }
  },
  computed: {
    ...mapState({
      profile: state => state.profile,
      menus: state => state.layout.menus
    })
  }
}
</script>
