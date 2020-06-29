<template>
  <div class="u-profile">
    <a-spin :spinning="loading" v-if="item">
      <a-row :gutter="[15,15]">
        <a-col :span="6">
          <a-card :bordered="false">
            <p slot="title" class="u-card-title"><i class="fa fa-id-card-o"></i>账号 / ID</p>
            {{item.account}} / {{item.id}}
          </a-card>
        </a-col>
        <a-col :span="6">
          <a-card :bordered="false" class="u-cursor" @click="nickNameVisible = true">
            <p slot="title" class="u-card-title"><i class="fa fa-user-o"></i>昵称</p>
            {{item.nickName}}
          </a-card>
        </a-col>
        <a-col :span="6">
          <a-card :bordered="false">
            <p slot="title" class="u-card-title"><i class="fa fa-clock-o"></i>上次登陆</p>
            <Time :time="item.lastAt"></Time>
          </a-card>
        </a-col>
        <a-col :span="6">
          <a-card :bordered="false">
            <p slot="title" class="u-card-title"><i class="fa fa-clock-o"></i>创建时间</p>
            <Time :time="item.createdAt"></Time>
          </a-card>
        </a-col>
        <a-col :span="6">
          <a-card :bordered="false">
            <p slot="title" class="u-card-title"><i class="fa fa-github"></i>来源</p>
            {{item.source}}
          </a-card>
        </a-col>
        <a-col :span="6">
          <a-card :bordered="false">
            <p slot="title" class="u-card-title"><i class="fa fa-home"></i>个人地址</p>
            <a :href="item.url" target="_blank">地址</a>
          </a-card>
        </a-col>
        <a-col :span="6">
          <a-card :bordered="false" class="u-cursor" @click="securityVisible = true">
            <p slot="title" class="u-card-title"><i class="fa fa-lock"></i>安全 / 密码</p>
            <a href="#">修改</a>
          </a-card>
        </a-col>
      </a-row>
      <a-row :gutter="[15,15]">
        <a-col :span="12">
          <a-card :bordered="false" class="u-cursor" @click="bioVisible = true">
            <p slot="title" class="u-card-title"><i class="fa fa-hashtag"></i>个性签名</p>
            {{item.bio}}
          </a-card>
        </a-col>
        <a-col :span="6">
          <a-card :bordered="false" class="u-profile-avatar u-cursor" :style="`--avatar: url('${item.avatar}')`" @click="avatarVisible = true">
          </a-card>
        </a-col>
      </a-row>
    </a-spin>
    <a-modal v-model="securityVisible" :destroyOnClose="true" title="修改密码" @ok="handleOk(1)" @cancel="handlerCancel">
      <a-form layout="horizontal" labelAlign="left" :labelCol="{ span: 4 }" :wrapperCol="{ span: 20 }">
        <a-form-item label="原始密码">
          <a-input type="password" placeholder="原始密码" allowClear v-model="req.oldPwd" />
        </a-form-item>
        <a-form-item label="新的密码">
          <a-input type="password" placeholder="新的密码" allowClear v-model="req.newPwd" />
        </a-form-item>
        <a-form-item label="确认密码">
          <a-input type="password" placeholder="确认密码" allowClear v-model="req.rePwd" />
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal v-model="bioVisible" :destroyOnClose="true" title="个性签名" @ok="handleOk(2)" @cancel="handlerCancel">
      <a-form layout="horizontal" labelAlign="left" :labelCol="{ span: 4 }" :wrapperCol="{ span: 20 }">
        <a-form-item label="Bio">
          <a-input placeholder="bio" allowClear v-model="req.bio" />
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal v-model="nickNameVisible" :destroyOnClose="true" title="昵称" @ok="handleOk(3)" @cancel="handlerCancel">
      <a-form layout="horizontal" labelAlign="left" :labelCol="{ span: 4 }" :wrapperCol="{ span: 20 }">
        <a-form-item label="昵称">
          <a-input placeholder="昵称" allowClear v-model="req.nickName" />
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal v-model="avatarVisible" :destroyOnClose="true" title="头像" @ok="handleOk(4)" @cancel="handlerCancel">
      <Uploadx @success="handlerAvatarUpload"></Uploadx>
    </a-modal>
  </div>
</template>

<script>

import 'babel-polyfill'
import Time from '@/components/Time'
import Uploadx from '@/components/Upload'

import { mapState } from 'vuex'

import { isEmpty } from '@/utils'

export default {
  name: 'index',
  components: {
    Time,
    Uploadx
  },
  data () {
    return {
      loading: false,
      securityVisible: false,
      bioVisible: false,
      nickNameVisible: false,
      avatarVisible: false,
      url: '/api/upload',
      headers: {
        token: this.token
      },
      item: null,
      req: {
        oldPwd: '',
        newPwd: '',
        rePwd: '',
        bio: '',
        nickName: '',
        avatar: ''
      }
    }
  },
  methods: {
    init () {
      this.search()
    },
    async search () {
      this.loading = true
      const result = await this.$request.fetchProfile(this.profile)
      if (result.code) {
        this.item = null
        this.loading = false
        return
      }
      this.item = result.data
      this.loading = false
    },
    check (flag) {
      switch (flag) {
        case 1:
          if (isEmpty(this.req.oldPwd) || isEmpty(this.req.newPwd) || isEmpty(this.req.rePwd)) {
            this.$message.warning('输入框不能为空！')
            return false
          }
          if (this.req.newPwd !== this.req.rePwd) {
            this.$message.warning('两次输入不一致！')
            return false
          }
          break
        case 2:
          if (isEmpty(this.req.bio)) {
            this.$message.warning('内容不能为空！')
            return false
          }
          break
        case 3:
          if (isEmpty(this.req.nickName)) {
            this.$message.warning('内容不能为空！')
            return false
          }
          break
        case 4:
          if (isEmpty(this.req.avatar)) {
            this.$message.warning('头像不能为空！')
            return false
          }
      }
      return true
    },
    handlerAvatarUpload (data) {
      if (!data) {
        return
      }
      this.req.avatar = data.url
    },
    handlerCancel () {
      this.req = {
        oldPwd: '',
        newPwd: '',
        rePwd: '',
        bio: '',
        nickName: '',
        avatar: ''
      }
      this.loading = false
    },
    async handleOk (flag) {
      this.loading = true
      if (!this.check(flag)) {
        this.loading = false
        return
      }
      this.req.flag = flag
      const result = await this.$request.fetchUpdProfile(this.req)
      if (result.code) {
        this.$message.warning(result.message)
        this.loading = false
        return
      }
      this.search()
      this.$message.success(result.message)
      this.loading = false
    }
  },
  events: {

  },
  computed: {
    ...mapState(['token', 'profile'])
  }
}
</script>
