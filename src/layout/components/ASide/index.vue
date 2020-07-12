<template>
  <aside>
    <div class="u-user-basic">
      <div class="u-user-avatar">
        <router-link to="/admin/profile">
          <img :src="profile.avatar" height="50" :alt="profile.nickName">
          <span>{{profile.nickName}}.{{profile.roleName}}</span>
        </router-link>
      </div>
      <div class="u-menu-lock">
        <el-tooltip class="item" effect="light" placement="bottom">
          <span slot="content">{{getOptions.lockMenu ? '解锁菜单' : '锁定菜单'}}</span>
          <i class="u-transition" :class="`${getOptions.lockMenu ? 'fa fa-unlock' : 'fa fa-lock'}`" @click="triggerLock"></i>
        </el-tooltip>
      </div>
      <div class="u-user-logout">
        <el-tooltip class="item" effect="light" placement="bottom">
          <span slot="content">注销</span>
          <i class="u-transition fa fa-power-off" @click="logout"></i>
        </el-tooltip>
      </div>
    </div>
    <div class="u-menu">
      <el-menu style="width: 100%" v-for="(v,i) in menus" :key="i" :router="true" :default-active="activePath" :default-openeds="openSub" @open="handlerOpen" @close="handlerClose">
        <el-menu-item :index="v.path" v-if="!v.children || v.children.length === 0">
          <i class="u-menu-icon" :class="v.icon"></i>
          {{v.title}}
        </el-menu-item>
        <el-submenu :index="v.path" v-else>
          <span slot="title">
            <i class="u-menu-icon" :class="v.icon"></i><span>{{v.title}}</span>
          </span>
          <el-menu-item :index="w.path" :key="w.name" v-for="w in v.children">
            <i class="u-menu-icon" :class="w.icon"></i>
            {{w.title}}
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  </aside>
</template>

<script>

import menus from '../../../../config/menus'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'index',
  watch: {
    $route (val, oldVal) {
      this.activeMenu(val)
    }
  },
  data () {
    return {
      openSub: [],
      activePath: ''
    }
  },
  methods: {
    ...mapMutations(['SET_OPTIONS']),
    ...mapActions(['LOGOUT']),
    init () {
      this.activeMenu(this.$route)
    },
    activeMenu (route) {
      if (!route) {
        return
      }
      this.activePath = route.path
      const that = this
      Object.values(menus).forEach(v => {
        if (v.path === route.path) {
          if (v.upper === 'admin') {
            return
          }
          that.openSub.push(menus[v.upper].path)
        }
      })
    },
    triggerLock () {
      const options = this.getOptions
      options.lockMenu = !options.lockMenu
      this.SET_OPTIONS(options)
    },
    logout () {
      sessionStorage.clear()
      this.LOGOUT()
      this.$router.push('/')
    },
    handlerOpen (index) {
      if (this.openSub.indexOf(index) > -1) {
        return
      }
      this.openSub.push(index)
    },
    handlerClose (index) {
      const i = this.openSub.indexOf(index)
      if (i === -1) {
        return
      }
      this.openSub.splice(i, 1)
    }
  },
  computed: {
    ...mapState({
      profile: state => state.profile,
      menus: state => state.layout.menus
    }),
    ...mapGetters(['getOptions'])
  }
}
</script>
