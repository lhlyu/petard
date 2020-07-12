<template>
  <header class="u-header">
    <div class="u-header-left">
      <el-breadcrumb>
        <el-breadcrumb-item v-for="(v,i) in breadcrumbs" :key="i">
          <i :class="v.icon" style="margin-right: 5px"></i>
          <span>{{v.title}}</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="u-header-right">
      <el-dropdown :hide-on-click="false" class="u-cursor">
        <span class="el-dropdown-link">
          {{profile.nickName}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <el-link icon="el-icon-user" :underline="false" @click="my">我的</el-link>
          </el-dropdown-item>
          <el-dropdown-item>
            <el-link icon="el-icon-position" :underline="false" href="https://lhlyu.github.io/petard/docs" target="_blank">文档</el-link>
          </el-dropdown-item>
          <el-dropdown-item>
            <el-link icon="el-icon-switch-button" :underline="false" @click="logout">注销</el-link>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
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
    my () {
      this.$router.push('/admin/profile')
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
