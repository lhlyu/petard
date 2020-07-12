<template>
  <div v-loading="loading">
    <el-row>
      <el-collapse-transition>
        <el-card shadow="never" v-show="searchShow">
          <el-form inline :model="req" ref="form" label-position="left" label-suffix=":" size="mini">
            <el-form-item label="主键" prop="id">
              <el-input-number placeholder="主键" clearable controls-position="right" :min="1" :step-strictly="true" v-model="req.id"></el-input-number>
            </el-form-item>
            <el-form-item label="账号" prop="account">
              <el-input placeholder="账号" clearable maxlength="25" show-word-limit v-model="req.account"></el-input>
            </el-form-item>
            <el-form-item label="昵称" prop="nickName">
              <el-input placeholder="昵称" clearable maxlength="50" show-word-limit v-model="req.nickName"></el-input>
            </el-form-item>
            <el-form-item label="身份" prop="identity">
              <el-select v-model="req.identity" clearable placeholder="请选择">
                <el-option
                  v-for="item in dict.user.identity"
                  :key="item.key"
                  :label="item.value"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="状态" prop="state">
              <el-select v-model="req.state" clearable placeholder="请选择">
                <el-option
                  v-for="item in dict.user.state"
                  :key="item.key"
                  :label="item.value"
                  :value="item.value">
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
        <el-table resizable :data="items" style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="scope">
              <el-form label-position="left" label-suffix=":" label-width="100px">
                <el-form-item label="头像地址" v-if="scope.row.avatar && scope.row.avatar">
                  <span style="margin-right: 5px">{{ scope.row.avatar }}</span>
                  <el-link :underline="false" icon="el-icon-document-copy" v-clipboard:copy="scope.row.avatar"></el-link>
                </el-form-item>
                <el-form-item label="个性签名" v-if="scope.row.bio && scope.row.bio">
                  <span style="margin-right: 5px">{{ scope.row.bio }}</span>
                  <el-link :underline="false" icon="el-icon-document-copy" v-clipboard:copy="scope.row.bio"></el-link>
                </el-form-item>
                <el-form-item label="个人网站" v-if="scope.row.url && scope.row.url.length">
                  <span style="margin-right: 5px">{{ scope.row.url }}</span>
                  <el-link :underline="false" icon="el-icon-document-copy" v-clipboard:copy="scope.row.url"></el-link>
                </el-form-item>
                <el-form-item label="最近访问IP">
                  <span style="margin-right: 5px">{{ scope.row.ip }}</span>
                  <el-link :underline="false" icon="el-icon-document-copy" v-clipboard:copy="scope.row.ip"></el-link>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column type="index" label="序号" v-if="columnShow.index"></el-table-column>
          <el-table-column prop="avatar" label="头像" v-if="columnShow.avatar">
            <template slot-scope="scope">
              <el-avatar v-if="scope.row.avatar && scope.row.avatar.length" size="medium" :src="scope.row.avatar"></el-avatar>
              <span v-else>暂无</span>
            </template>
          </el-table-column>
          <el-table-column prop="id" label="主键" v-if="columnShow.id"></el-table-column>
          <el-table-column prop="account" align="center" label="账号" v-if="columnShow.account"></el-table-column>
          <el-table-column prop="nickName" align="center" label="昵称" v-if="columnShow.nickName"></el-table-column>
          <el-table-column prop="source" align="center" label="来源" v-if="columnShow.source"></el-table-column>
          <el-table-column prop="url" align="center" label="个人网站" v-if="columnShow.url">
            <template slot-scope="scope">
              <el-link v-if="scope.row.url && scope.row.url.length" icon="el-icon-s-promotion" :href="scope.row.url" target="_blank">链接</el-link>
              <span v-else>暂无</span>
            </template>
          </el-table-column>
          <el-table-column prop="identity" align="center" label="身份" v-if="columnShow.identity">
            <template slot-scope="scope">
              <el-tag :type="dict.user.identity.find(v => v.key == scope.row.identity).color">{{dict.user.identity.find(v => v.key == scope.row.identity).value}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="state" align="center" label="状态" v-if="columnShow.state">
            <template slot-scope="scope">
              <el-tag :type="dict.user.state.find(v => v.key == scope.row.state).color">{{dict.user.state.find(v => v.key == scope.row.state).value}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="lastAt" align="center" label="最近访问" v-if="columnShow.lastAt">
            <template slot-scope="scope">
              <span><Time :time="scope.row.lastAt"></Time></span>
            </template>
          </el-table-column>
          <el-table-column prop="createdAt" align="center" label="创建时间" v-if="columnShow.createdAt">
            <template slot-scope="scope">
              <span><Time type="date" :time="scope.row.createdAt"></Time></span>
            </template>
          </el-table-column>
          <el-table-column prop="updatedAt" align="center" label="修改时间" v-if="columnShow.updatedAt">
            <template slot-scope="scope">
              <span><Time type="date" :time="scope.row.updatedAt"></Time></span>
            </template>
          </el-table-column>
          <el-table-column align="right">
            <template slot="header" slot-scope="scope">
              <el-tooltip placement="top" effect="light">
                <div slot="content">{{searchShow ? '隐藏搜索' : '展开搜索'}}</div>
                <el-button type="text" icon="el-icon-search" @click="handlerSearchShow"></el-button>
              </el-tooltip>
              <el-tooltip placement="top" effect="light" content="刷新">
                <el-button type="text" icon="el-icon-refresh" style="margin-right: 10px" @click="search"></el-button>
              </el-tooltip>
              <el-popover
                :width="60"
                placement="bottom"
                title="展示字段"
                trigger="click">
                <div>
                  <el-checkbox :indeterminate="indeterminate" v-model="columnShow.all"  @change="handleCheckAllChange">全选</el-checkbox><br>
                  <el-checkbox label="序号" v-model="columnShow.index"></el-checkbox><br>
                  <el-checkbox label="头像" v-model="columnShow.avatar"></el-checkbox><br>
                  <el-checkbox label="主键" v-model="columnShow.id"></el-checkbox><br>
                  <el-checkbox label="账号" v-model="columnShow.account"></el-checkbox><br>
                  <el-checkbox label="昵称" v-model="columnShow.nickName"></el-checkbox><br>
                  <el-checkbox label="来源" v-model="columnShow.source"></el-checkbox><br>
                  <el-checkbox label="个人网站" v-model="columnShow.url"></el-checkbox><br>
                  <el-checkbox label="身份" v-model="columnShow.identity"></el-checkbox><br>
                  <el-checkbox label="状态" v-model="columnShow.state"></el-checkbox><br>
                  <el-checkbox label="最近访问" v-model="columnShow.lastAt"></el-checkbox><br>
                  <el-checkbox label="创建时间" v-model="columnShow.createdAt"></el-checkbox><br>
                  <el-checkbox label="更新时间" v-model="columnShow.updatedAt"></el-checkbox><br>
                </div>
                <el-button type="text" icon="el-icon-s-operation" slot="reference"></el-button>
              </el-popover>
            </template>
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" plain size="mini" @click="handlerEidt(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
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
  </div>
</template>

<script>

import Time from '@/components/Time'
import { mapState } from 'vuex'

export default {
  name: 'index',
  components: {
    Time
  },
  watch: {
    columnShow: {
      deep: true,
      immediate: true,
      handler () {
        this.handlerCheckChange()
      }
    }
  },
  data () {
    return {
      loading: false,
      searchShow: true,
      indeterminate: false,
      columnShow: {
        all: false,
        index: true,
        avatar: true,
        id: true,
        account: true,
        nickName: true,
        source: true,
        url: true,
        identity: true,
        state: true,
        lastAt: true,
        createdAt: true,
        updatedAt: false
      },
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
        id: null,
        account: '',
        nickName: '',
        identity: null,
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
      const result = await this.$request.fetchUsers(req)
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
    handleCheckAllChange (checked) {
      for (const key in this.columnShow) {
        this.columnShow[key] = checked
      }
      this.handlerCheckChange()
    },
    handlerCheckChange () {
      let b = true
      for (const key in this.columnShow) {
        if (key === 'all') {
          continue
        }
        if (!this.columnShow[key]) {
          b = false
        }
      }
      if (b) {
        this.columnShow.all = true
        this.indeterminate = false
        return
      }
      this.columnShow.all = false
      this.indeterminate = true
    },
    handlerSearchShow () {
      this.searchShow = !this.searchShow
    },
    handlerEidt (row) {

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
    }
  },
  computed: {
    ...mapState(['dict'])
  }
}
</script>
