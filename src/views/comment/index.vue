<template>
  <a-spin :spinning="loading">
    <a-row :gutter="[0,15]">
      <a-col :span="24">
        <a-card>
          <a-form layout="inline">
            <a-form-item label="用户ID">
              <a-input-number allowClear :maxLength="11" :min="0" v-model="req.userId"></a-input-number>
            </a-form-item>
            <a-form-item label="文章ID">
              <a-input-number allowClear :maxLength="11" :min="0" v-model="req.articleId"></a-input-number>
            </a-form-item>
            <a-form-item label="状态">
              <a-select style="width: 120px" v-model="req.state" allowClear>
                <a-select-option :value="i" v-for="(v, i) in states" :key="i">
                  {{v}}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="时间范围">
              <a-range-picker @change="handlerPickDatetime" allowClear />
            </a-form-item>
            <a-form-item>
              <a-button icon="search" @click="search">搜索</a-button>
            </a-form-item>
          </a-form>
        </a-card>
      </a-col>
      <a-col :span="24">
        <a-card>
          <a-list :pagination="req" item-layout="horizontal" :data-source="items">
            <a-list-item slot="renderItem" slot-scope="item">
              <a-comment :author="`${item.userExt.n} 「 id:${item.userId} 」`" :avatar="item.userExt.a">
                <a-tooltip slot="datetime">
                  <span><Time :time="item.createdAt"></Time></span>
                </a-tooltip>
                <p slot="content" style="letter-spacing: 2px;line-height: 1.8;margin-top: 15px">
                  {{ item.content }}
                </p>
                <template slot="actions">
                  <div>
                    <a-badge :color="stateColors[item.state]" :text="states[item.state]" />
                    <a-divider type="vertical" />
                    <span class="fa fa-file-text-o"> {{item.articleId}}</span>
                    <a-divider type="vertical" v-if="item.atUserId" />
                    <span v-if="item.atUserId" class="fa fa-at">
                     {{item.atUserExt.n}}「 id:{{item.atUserId}} 」
                    </span>
                  </div>
                </template>
              </a-comment>
              <div slot="actions">
                <a-radio-group v-model="item.state" @change="handlerStateChange(item)">
                  <a-radio :style="radioStyle" :value="1">
                    {{states[1]}}
                  </a-radio>
                  <a-radio :style="radioStyle" :value="2">
                    {{states[2]}}
                  </a-radio>
                  <a-radio :style="radioStyle" :value="3">
                    {{states[3]}}
                  </a-radio>
                </a-radio-group>
              </div>
            </a-list-item>
          </a-list>
        </a-card>
      </a-col>
    </a-row>
  </a-spin>
</template>

<script>

import Time from '@/components/Time'

export default {
  name: 'index',
  components: {
    Time
  },
  data () {
    return {
      loading: false,
      states: ['所有', '待审', '正常', '禁用'],
      stateColors: ['#eeeeee', 'red', 'green', '#000000'],
      radioStyle: {
        display: 'block',
        height: '30px',
        width: '100px',
        lineHeight: '30px',
        textAlign: 'left'
      },
      items: [],
      req: {
        onChange: this.handlerPageChange,
        onShowSizeChange: this.handlerPageSizeChange,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '20', '30', '40', '50'],
        current: 1,
        pageNum: 1,
        pageSize: 5,
        total: 0,
        userId: 0,
        articleId: 0,
        start: 0,
        end: 0,
        state: 0
      }
    }
  },
  methods: {
    init () {
      this.search()
    },
    async search () {
      this.loading = true
      const result = await this.$request.fetchComments(this.req)
      if (result.code) {
        this.items = []
        this.req.current = 1
        this.req.pageNum = 1
        this.req.total = 0
        this.loading = false
        return
      }
      this.items = result.data.list
      this.req = Object.assign(this.req, result.data.page)
      this.req.current = this.req.pageNum
      this.loading = false
    },
    handlerPageChange (page, pageSize) {
      this.req.pageNum = parseInt(page)
      this.req.current = parseInt(page)
      this.req.pageSize = parseInt(pageSize)
      this.search()
    },
    handlerPageSizeChange (current, size) {
      this.req.pageNum = parseInt(current)
      this.req.current = parseInt(current)
      this.req.pageSize = parseInt(size)
      this.search()
    },
    async handlerStateChange (item) {
      this.loading = true
      const result = await this.$request.fetchUpdComment(item)
      if (result.code) {
        this.$message.warning(result.message)
        this.search()
        this.loading = false
        return
      }
      this.$message.success(result.message)
      this.loading = false
    },
    handlerPickDatetime (value) {
      this.req.start = +value[0]
      this.req.end = +value[1]
    }
  }
}
</script>
