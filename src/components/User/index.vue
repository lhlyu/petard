<template>
   <div class="u-user" v-loading="loading">
     <el-form label-position="left" label-suffix=":" label-width="100px" v-if="item">
       <el-form-item label="ID">
         <span>{{item.id}}</span>
       </el-form-item>
       <el-form-item label="账号">
         <span>{{item.account}}</span>
       </el-form-item>
       <el-form-item label="昵称">
         <span>{{item.nickName}}</span>
       </el-form-item>
       <el-form-item label="身份">
         <el-select v-model="item.identity" placeholder="请选择">
           <el-option
             v-for="item in dict.user.identity"
             :key="item.key"
             :label="item.value"
             :value="item.key">
           </el-option>
         </el-select>
       </el-form-item>
       <el-form-item label="状态">
         <el-select v-model="item.state" placeholder="请选择">
           <el-option
             v-for="item in dict.user.state"
             :key="item.key"
             :label="item.value"
             :value="item.key">
           </el-option>
         </el-select>
       </el-form-item>
       <el-form-item label="个人网站">
         <el-input type="url" placeholder="个人网站" clearable maxlength="200" show-word-limit v-model="item.url"></el-input>
       </el-form-item>
       <el-form-item>
         <el-button type="primary" size="mini" plain @click="edit">修改</el-button>
       </el-form-item>
     </el-form>
   </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'index',
  props: {
    id: {
      type: Number,
      default: 0
    }
  },
  watch: {
    id (val) {
      if (!val) {
        this.item = null
        return
      }
      this.search()
    }
  },
  data () {
    return {
      loading: false,
      item: null
    }
  },
  methods: {
    init () {
      if (!this.id) {
        this.item = null
        return
      }
      this.search()
    },
    async search () {
      this.loading = true
      const result = await this.$request.fetchUser({ id: this.id })
      if (result.code) {
        this.item = null
        this.$message.warning(result.message)
        this.loading = false
        return
      }
      this.item = result.data
      this.loading = false
    },
    async edit () {
      const result = await this.$request.fetchUpdUser(this.item)
      if (result.code) {
        this.$message.warning(result.message)
        return
      }
      this.$message.success(result.message)
    }
  },
  computed: {
    ...mapState(['dict'])
  }
}
</script>
