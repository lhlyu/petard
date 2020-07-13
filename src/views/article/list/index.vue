<template>
  <div v-loading="loading">
    <el-row>
      <el-collapse-transition>
        <el-card shadow="never" v-show="searchShow">
          <el-form inline :model="req" ref="form" label-position="left" label-suffix=":" size="mini">
            <el-form-item label="文章ID" prop="id">
              <el-input-number placeholder="文章ID" clearable controls-position="right" :min="0" :step-strictly="true" v-model="req.id"></el-input-number>
            </el-form-item>
            <el-form-item label="标题" prop="title">
              <el-input placeholder="标题" clearable maxlength="50" show-word-limit v-model="req.title"></el-input>
            </el-form-item>
            <el-form-item label="状态" prop="state">
              <el-select v-model="req.state" clearable placeholder="请选择">
                <el-option
                  v-for="item in dict.article.state"
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
        <Article v-for="(v, i) in items" :key="i" :cover="v.cover">
          <template #title>
            <span class="el-icon-document">[{{v.id}}]</span> <span>{{v.title}}</span>
          </template>
          <template #ext>
            <el-link :underline="false" icon="el-icon-edit" @click="handlerEdit(v.id)">编辑</el-link>
            <el-link :underline="false" icon="el-icon-share" style="margin-left: 10px" v-clipboard:copy="`${share}${v.id}`">分享</el-link>
          </template>
          <template #content>
            <p>
              {{v.summary}}
            </p>
          </template>
          <template #footer>
            <el-tooltip effect="light" content="类型" placement="top">
              <span class="u-cursor el-icon-notebook-2"> 普通</span>
            </el-tooltip>
            <el-divider direction="vertical"></el-divider>
            <el-tooltip effect="light" content="分类" placement="top">
              <span class="u-cursor el-icon-folder"> {{v.categoryName}}</span>
            </el-tooltip>
            <el-divider direction="vertical"></el-divider>
            <el-tooltip effect="light" content="评论状态" placement="top">
              <span class="u-cursor el-icon-chat-line-round"> 开放</span>
            </el-tooltip>
            <el-divider direction="vertical"></el-divider>
            <el-tooltip effect="light" content="状态" placement="top">
              <span class="u-cursor el-icon-set-up"> 正常</span>
            </el-tooltip>
            <el-divider direction="vertical"></el-divider>
            <el-tooltip effect="light" content="TOP" placement="top">
              <span class="u-cursor el-icon-trophy"> {{v.top}}</span>
            </el-tooltip>
            <el-divider direction="vertical"></el-divider>
            <el-tooltip effect="light" content="访问" placement="top">
              <span class="u-cursor el-icon-view"> {{v.viewCount}}</span>
            </el-tooltip>
            <el-divider direction="vertical"></el-divider>
            <el-tooltip effect="light" content="评论" placement="top">
              <span class="u-cursor el-icon-chat-dot-square"> {{v.commentCount}}</span>
            </el-tooltip>
            <el-divider direction="vertical"></el-divider>
            <el-tooltip effect="light" content="标签" placement="top">
              <span class="u-cursor el-icon-collection-tag"> {{v.tags.join('/')}}</span>
            </el-tooltip>
            <el-divider direction="vertical"></el-divider>
            <el-tooltip effect="light" content="创建时间" placement="top">
              <span class="u-cursor el-icon-time"> <Time type="date" :time="v.createdAt"></Time></span>
            </el-tooltip>
            <el-divider direction="vertical"></el-divider>
            <el-tooltip effect="light" content="更新时间" placement="top">
              <span class="u-cursor el-icon-time"> <Time type="datetime" :time="v.updatedAt"></Time></span>
            </el-tooltip>
          </template>
        </Article>
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

import Article from '@/components/Article'
import Time from '@/components/Time'
import { mapState } from 'vuex'

export default {
  name: 'index',
  components: {
    Article,
    Time
  },
  data () {
    return {
      loading: false,
      searchShow: true,
      dialogUserVisible: false,
      share: 'http://localhost:8000/#/admin/article/edit?id=',
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
        title: '',
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
      const result = await this.$request.fetchArticles(req)
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
    handlerEdit (id) {
      if (!id) {
        return
      }
      this.$router.push({
        path: '/admin/article/edit',
        query: {
          id: id
        }
      })
    }
  },
  computed: {
    ...mapState(['dict'])
  }
}
</script>
