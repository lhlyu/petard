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
    <div class="u-menu" v-for="(v,i) in menus" :key="i">
      <div class="u-menu-item u-menu-group" :ref="`menu${i}`" @click="v.children && v.children.length && triggerMenu(`menu${i}`)">
        <router-link :to="v.path">
          <span class="u-menu-icon"><i :class="v.icon"></i></span>
          <span class="u-menu-title">{{v.title}}</span>
          <span class="u-menu-group-icon" v-if="v.children && v.children.length"></span>
        </router-link>
      </div>
      <div class="u-menu-items u-transition u-hide" v-if="v.children && v.children.length">
        <div class="u-menu-item" v-for="(c,j) in v.children" :key="j">
          <router-link :to="c.path">
            <span class="u-menu-icon"><i :class="c.icon"></i></span>
            <span class="u-menu-title">{{c.title}}</span>
          </router-link>
        </div>
      </div>
    </div>
  </aside>
</template>

<script>

import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'index',
  data () {
    return {
    }
  },
  methods: {
    ...mapMutations(['SET_OPTIONS']),
    ...mapActions(['LOGOUT']),
    triggerLock () {
      const options = this.getOptions
      options.lockMenu = !options.lockMenu
      this.SET_OPTIONS(options)
    },
    triggerMenu (ref) {
      const dom = this.$refs[ref][0]
      const nextDom = dom.nextSibling
      if (!nextDom) {
        return
      }
      const lastDom = dom.getElementsByClassName('u-menu-group-icon')[0]
      if (nextDom.classList.contains('u-hide')) {
        nextDom.classList.remove('u-hide')
        lastDom.classList.add('u-menu-rotate')
        return
      }
      nextDom.classList.add('u-hide')
      lastDom.classList.remove('u-menu-rotate')
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
    }),
    ...mapGetters(['getOptions'])
  }
}
</script>
