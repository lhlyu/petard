<template>
  <div v-loading="loading">
    <el-row>
      <el-collapse-transition>
        <el-card shadow="never" v-show="searchShow">
          <el-form inline :model="req" ref="form" label-position="left" label-suffix=":" size="mini">
            <el-form-item label="用户ID" prop="userId">
              <el-input-number placeholder="用户ID" clearable controls-position="right" :min="0" :step-strictly="true" v-model="req.userId"></el-input-number>
            </el-form-item>
            <el-form-item label="文章ID" prop="articleId">
              <el-input-number placeholder="文章ID" clearable controls-position="right" :min="0" :step-strictly="true" v-model="req.articleId"></el-input-number>
            </el-form-item>
            <el-form-item label="昵称" prop="nickName">
              <el-input placeholder="昵称" clearable maxlength="50" show-word-limit v-model="req.nickName"></el-input>
            </el-form-item>
            <el-form-item label="状态" prop="state">
              <el-select v-model="req.state" clearable placeholder="请选择">
                <el-option
                  v-for="item in dict.comment.state"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="时间范围" prop="range">
              <el-date-picker
                v-model="req.range"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions"
                @change="handlerDaterange"
              >
              </el-date-picker>
            </el-form-item>
            <br>
            <el-form-item>
              <el-button type="primary" plain @click="search">搜索</el-button>
              <el-button plain @click="reset">重置</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-collapse-transition>
    </el-row>

    <el-row>
      <el-card shadow="never">
        <Comment v-for="(v, i) in items" :key="i">
          <template #avatar>
            <el-avatar class="u-cursor" :size="45" :src="v.userExt.a" @click.native="handlerEdit(v.userId)">
            </el-avatar>
          </template>
          <template #info>
            <el-link :underline="false" :href="v.userExt.u" target="_blank">{{v.userExt.n}}</el-link><br>
            <span style="margin-top: 4px;font-size: 12px">({{v.userId}})</span>
          </template>
          <template #title>
            <span class="el-icon-document">[ID:{{v.articleId}}]</span><span>{{v.userExt.t}}</span>
          </template>
          <template #ext>
            <el-link :underline="false" icon="el-icon-finished" v-if="v.state !== 2" @click="edit(v, 2)">正常</el-link>
            <el-link :underline="false" icon="el-icon-remove-outline" v-if="v.state !== 3" @click="edit(v, 3)" style="margin-left: 10px">禁用</el-link>
          </template>
          <template #content>
            <blockquote class="u-row-1" v-if="v.atUserId">
              @<el-link :underline="false" @click="handlerEdit(v.atUserId)">{{v.atUserExt.n}}({{v.atUserId}})</el-link>：{{v.atUserExt.c}}
            </blockquote>
            <p>{{v.content}}</p>
          </template>
          <template #footer>
            <el-badge is-dot :type="dict.comment.state.find(val => val.key == v.state).color">
              {{dict.comment.state.find(val => val.key == v.state).value}}
            </el-badge>
            <el-divider direction="vertical"></el-divider>
            <span class="el-icon-time"><Time :time="v.createdAt"></Time></span>
          </template>
        </Comment>
        <br>
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[5,10,15,20,25,30,50]"
          layout="total, sizes, prev, pager, next, jumper"
          :current-page="page.pageNum"
          :page-size="page.pageSize"
          :total="page.total">
        </el-pagination>
      </el-card>
    </el-row>

    <el-dialog title="编辑用户" width="350px" :visible.sync="dialogUserVisible" @close="handlerDialogClose">
      <User :id="userId"></User>
    </el-dialog>
  </div>
</template>

<script>

import Comment from '@/components/Comment'
import Time from '@/components/Time'
import User from '@/components/User'
import { mapState } from 'vuex'

export default {
  name: 'index',
  components: {
    Comment,
    Time,
    User
  },
  data () {
    return {
      loading: false,
      searchShow: true,
      dialogUserVisible: false,
      userId: null,
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      page: {
        pageNum: 1,
        pageSize: 5,
        total: 0
      },
      req: {
        userId: null,
        articleId: null,
        nickName: '',
        state: null,
        range: null,
        start: null,
        end: null
      },
      items: []
    }
  },
  methods: {
    init () {
      this.search()
    },
    async search () {
      this.loading = true
      const req = { ...this.req, ...this.page }
      const result = await this.$request.fetchComments(req)
      if (result.code) {
        this.items = []
        this.$message.warning(result.message)
        this.loading = false
        return
      }
      this.items = result.data.list
      Object.assign(this.page, result.data.page)
      this.loading = false
    },
    reset () {
      this.$refs.form.resetFields()
    },
    async edit (data, state) {
      const result = await this.$request.fetchUpdComment({
        id: data.id,
        state: state
      })
      if (result.code) {
        this.$message.warning(result.message)
        return
      }
      this.$message.success(result.message)
      this.search()
    },
    // ------------ handler -----------------
    handleSizeChange (pageSize) {
      this.page.pageSize = pageSize
      this.page.pageNum = 1
      this.search()
    },
    handleCurrentChange (pageNum) {
      this.page.pageNum = pageNum
      this.search()
    },
    handlerDaterange (range) {
      if (!range) {
        this.req.start = 0
        this.req.end = 0
        return
      }
      const [start, end] = range
      this.req.start = +start
      this.req.end = +end
    },
    handlerEdit (userId) {
      this.dialogUserVisible = true
      this.userId = userId
    },
    handlerDialogClose () {
      this.userId = 0
    }
  },
  computed: {
    ...mapState(['dict'])
  }
}
</script>
