<template>
  <div v-loading="loading">
    <el-row>
      <el-card shadow="never">
        <el-tabs tab-position="left" style="min-height: 400px;">
          <el-tab-pane label="基本信息">
            <el-card shadow="never">
              <el-form label-position="right" v-if="item">
                <el-form-item>
                  <el-input placeholder="主键" disabled v-model="item.id">
                    <template slot="prepend">主键</template>
                  </el-input>
                </el-form-item>
                <el-form-item>
                  <el-input placeholder="账号" disabled v-model="item.account">
                    <template slot="prepend">账号</template>
                  </el-input>
                </el-form-item>
                <el-form-item>
                  <el-input placeholder="昵称" clearable v-model="item.nickName">
                    <template slot="prepend">昵称</template>
                  </el-input>
                </el-form-item>
                <el-form-item>
                  <el-input placeholder="签名" clearable v-model="item.bio">
                    <template slot="prepend">签名</template>
                  </el-input>
                </el-form-item>
                <el-divider content-position="left">链接</el-divider>
                <el-form-item>
                  <el-input placeholder="网站" clearable v-model="item.url">
                    <template slot="prepend"><span class="fa fa-link"></span></template>
                  </el-input>
                </el-form-item>
                <el-form-item>
                  <el-input placeholder="Github" clearable>
                    <template slot="prepend"><span class="fa fa-github"></span></template>
                  </el-input>
                </el-form-item>
                <el-form-item>
                  <el-input placeholder="QQ" clearable>
                    <template slot="prepend"><span class="fa fa-qq"></span></template>
                  </el-input>
                </el-form-item>
                <el-form-item>
                  <el-input placeholder="Wechat" clearable>
                    <template slot="prepend"><span class="fa fa-weixin"></span></template>
                  </el-input>
                </el-form-item>
                <el-form-item>
                  <el-input placeholder="Codepen" clearable>
                    <template slot="prepend"><span class="fa fa-codepen"></span></template>
                  </el-input>
                </el-form-item>
                <el-form-item>
                  <el-input placeholder="邮箱" clearable>
                    <template slot="prepend"><span class="fa fa-envelope-o"></span></template>
                  </el-input>
                </el-form-item>
                <el-form-item>
                  <el-input placeholder="手机" clearable>
                    <template slot="prepend"><span class="fa fa-phone"></span></template>
                  </el-input>
                </el-form-item>
                <el-form-item>
                  <el-input placeholder="打赏码" clearable>
                    <template slot="prepend"><span class="fa fa-qrcode"></span></template>
                  </el-input>
                </el-form-item>
                <el-form-item>
                  <el-button size="mini" plain @click="save">保存</el-button>
                </el-form-item>
              </el-form>
            </el-card>
          </el-tab-pane>
          <el-tab-pane label="头像信息">
            <el-card shadow="never">
              <el-avatar shape="square" :size="100" fit="cover" :src="item.avatar" class="u-margin-right"></el-avatar>
              <el-avatar shape="square" :size="60" fit="cover" :src="item.avatar"  class="u-margin-right"></el-avatar>
              <el-avatar shape="square" :size="40" fit="cover" :src="item.avatar"  class="u-margin-right"></el-avatar>
              <el-avatar shape="circle" :size="100" fit="cover" :src="item.avatar"  class="u-margin-right"></el-avatar>
              <el-avatar shape="circle" :size="60" fit="cover" :src="item.avatar"  class="u-margin-right"></el-avatar>
              <el-avatar shape="circle" :size="40" fit="cover" :src="item.avatar"  class="u-margin-right"></el-avatar>
              <br>
              <br>
              <el-button size="mini" type="primary" plain @click="dialogAvatarVisible = true">修改</el-button>
              <el-button size="mini" plain @click="save">保存</el-button>
            </el-card>
          </el-tab-pane>
          <el-tab-pane label="安全信息">
            <el-card shadow="never">
              <el-form label-position="right" v-if="item">
                <el-form-item>
                  <el-input type="password" placeholder="原始密码" clearable show-password v-model="req.oldPwd">
                    <template slot="prepend">原始密码</template>
                  </el-input>
                </el-form-item>
                <el-form-item>
                  <el-input type="password" placeholder="新的密码" clearable show-password v-model="req.newPwd">
                    <template slot="prepend">新的密码</template>
                  </el-input>
                </el-form-item>
                <el-form-item>
                  <el-input type="password" placeholder="确认密码" clearable show-password v-model="req.rePwd">
                    <template slot="prepend">确认密码</template>
                  </el-input>
                </el-form-item>
                <el-form-item>
                  <el-input type="password" placeholder="加密盐值(选填)" clearable show-password v-model="req.salt">
                    <template slot="prepend">加密盐值</template>
                  </el-input>
                </el-form-item>
                <el-form-item>
                  <el-button size="mini" plain @click="upd">修改</el-button>
                </el-form-item>
              </el-form>
            </el-card>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </el-row>
    <el-dialog title="修改头像" :visible.sync="dialogAvatarVisible">
      <Upload @success="handlerUpload"></Upload>
    </el-dialog>
  </div>
</template>

<script>

import Upload from '@/components/Upload'
import { mapState } from 'vuex'

export default {
  name: 'index',
  components: {
    Upload
  },
  data () {
    return {
      loading: false,
      dialogAvatarVisible: false,
      item: null,
      req: {
        id: 0,
        oldPwd: '',
        newPwd: '',
        rePwd: '',
        salt: ''
      }
    }
  },
  methods: {
    init () {
      this.search()
    },
    async search () {
      this.loading = true
      const result = await this.$request.fetchProfile()
      if (result.code) {
        this.item = null
        this.$message.warning(result.message)
        this.loading = false
        return
      }
      this.item = result.data
      this.req.id = this.item.id
      this.loading = false
    },
    async save () {
      if (!this.item) {
        return
      }
      const result = await this.$request.fetchUpdProfile(this.item)
      if (result.code) {
        this.$message.warning(result.message)
        return
      }
      this.$message.success(result.message)
    },
    async upd () {
      if (!this.req.id) {
        return
      }
      if (this.isEmpty(this.req.oldPwd, '原始密码不能为空！')) {
        return
      }
      if (this.isEmpty(this.req.newPwd, '新的密码不能为空！')) {
        return
      }
      if (this.isEmpty(this.req.rePwd, '确认密码不能为空！')) {
        return
      }
      if (this.req.newPwd !== this.req.rePwd) {
        this.$message.warning('两次密码不一样！')
        return
      }
      const result = await this.$request.fetchUpdSecurity(this.req)
      if (result.code) {
        this.$message.warning(result.message)
        return
      }
      this.$message.success(result.message)
    },
    // ------------ handler -----------------
    handlerUpload (data) {
      if (!data) {
        return
      }
      this.item.avatar = data.url
    }
  },
  computed: {
    ...mapState(['dict'])
  }
}
</script>
