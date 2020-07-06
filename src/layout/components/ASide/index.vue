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
        <a-tooltip placement="bottom">
          <template slot="title">
            <span>{{getOptions.lockMenu ? '解锁菜单' : '锁定菜单'}}</span>
          </template>
          <i class="u-transition" :class="`${getOptions.lockMenu ? 'fa fa-unlock' : 'fa fa-lock'}`" @click="triggerLock"></i>
        </a-tooltip>
      </div>
      <div class="u-user-logout">
        <a-tooltip placement="bottom">
          <template slot="title">
            <span>注销</span>
          </template>
          <i class="u-transition fa fa-power-off" @click="logout"></i>
        </a-tooltip>
      </div>
    </div>
    <div class="u-menu">
      <a-menu style="width: 274px" v-model="menuSelect" :open-keys="openSub" mode="inline" v-for="(v,i) in menus" :key="i" @select="handlerSelect" @openChange="handlerOpen">
        <a-menu-item :key="v.name" v-if="!v.children || v.children.length === 0">
          <i class="u-menu-icon" :class="v.icon"></i>
          {{v.title}}
        </a-menu-item>
        <a-sub-menu :key="v.name" v-else>
          <span slot="title">
            <i class="u-menu-icon" :class="v.icon"></i><span>{{v.title}}</span>
          </span>
          <a-menu-item :key="w.name" v-for="w in v.children">
            <i class="u-menu-icon" :class="w.icon"></i>
            {{w.title}}
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
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
      menuSelect: [],
      openSub: []
    }
  },
  methods: {
    ...mapMutations(['SET_OPTIONS']),
    ...mapActions(['LOGOUT']),
    init () {
      this.activeMenu(this.$route)
    },
    activeMenu (route) {
      Object.values(menus).forEach(v => {
        if (v.path === route.path) {
          this.menuSelect = [v.name]
          if (v.upper !== 'admin') {
            this.openSub.push(v.upper)
          }
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
    handlerSelect (item, key, selectedKeys) {
      Object.values(menus).forEach(v => {
        if (v.name === item.key) {
          this.$router.push(v.path)
        }
      })
    },
    handlerOpen (openKeys) {
      console.log(openKeys)
      this.openSub = [...openKeys]
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
