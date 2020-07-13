<template>
  <div class="u-login u-transition">
    <Bg class="u-center">
      <div class="u-land">
        <el-card shadow="never">
          <div slot="header">
            <h2>登陆</h2>
            <el-input placeholder="账号" clearable v-model="req.account">
              <template slot="prepend">账号</template>
            </el-input>
            <br>
            <br>
            <el-input type="password" clearable placeholder="密码" v-model="req.password">
              <template slot="prepend">密码</template>
            </el-input>
            <br>
            <br>
            <el-button plain v-throttling="loginThrottling">登陆</el-button>
            <el-button plain @click="login" disabled>第三方登陆</el-button>
          </div>
        </el-card>
      </div>
    </Bg>
  </div>
</template>

<script>

import Bg from '@/components/Bg'
import { mapMutations, mapActions } from 'vuex'

export default {
  name: 'index',
  components: {
    Bg
  },
  data () {
    return {
      req: {
        account: 'admin',
        password: '123456'
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
