<template>
  <div class="u-land">
    <div class="u-land__board u-margin-bottom animate__animated animate__fadeInLeftBig animate__delay-1s">
      <input v-model="req.account" class="u-input u-margin-bottom u-border-radius" placeholder="账号" maxlength="30" type="text" autocomplete="off">
      <input v-model="req.password" class="u-input u-margin-bottom u-border-radius" placeholder="密码" type="password" maxlength="16" autocomplete="off">
      <div class="u-land__board--check">
        <div class="left">
          <span>记住密码</span>
          <input type="checkbox" name="u-checkbox" class="u-checkbox" id="u-checkbox" v-model="req.remember">
          <label for="u-checkbox"></label>
        </div>
        <div class="right">
          <a-icon type="github" :style="{fontSize: '15px',cursor: 'pointer'}" />
        </div>
      </div>
    </div>
    <div class="u-land__btn animate__animated animate__fadeInRightBig animate__delay-1s">
      <button v-throttling="loginThrottling">登陆</button>
    </div>
  </div>
</template>

<script>
// 登陆板

import { mapMutations, mapActions } from 'vuex'
// import routes from '../../router/basic_routers'
//
// import Demo from '@/views/demo/index.vue'

export default {
  name: 'land',
  components: {
  },
  data () {
    return {
      req: {
        account: 'admin',
        password: '123456',
        remember: true
      },
      loginThrottling: {
        callback: this.login,
        time: 2000
      }
    }
  },
  methods: {
    ...mapMutations(['SET_TOKEN', 'SET_CODES', 'SET_PROFILE', 'SET_OPTIONS', 'SET_MENUS']),
    ...mapActions(['SET_DICT']),
    login () {
      if (this.isEmpty(this.req.account)) {
        this.$message.warning('账号为空！')
        return
      }
      if (this.isEmpty(this.req.password) && this.req.account !== '@github') {
        this.$message.warning('密码为空！')
        return
      }
      const that = this
      this.$request.fetchLogin(this.req).then(v => {
        if (v.code) {
          this.$message.warning(v.message)
          return
        }
        that.SET_DICT()
        const codes = [9999]
        that.SET_TOKEN(v.data.token)
        that.SET_CODES(codes)
        that.SET_PROFILE(v.data.profile)
        that.SET_OPTIONS(v.data.options)
        that.SET_MENUS(codes)
        that.$router.$addRoutes()
        that.$router.push({ path: '/admin' })
      })
    }
  }
}
</script>
