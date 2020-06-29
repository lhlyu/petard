<template>
  <a-spin :spinning="loading">
    <a-row :gutter="[0,15]">
      <a-col :span="24">
        <a-card>
          <a-form layout="inline">
            <a-form-item label="标题">
              <a-input allowClear :maxLength="30" v-model="req.title"></a-input>
            </a-form-item>
            <a-form-item label="标签">
              <a-input allowClear :maxLength="30" v-model="req.tagName"></a-input>
            </a-form-item>
            <a-form-item label="文章ID">
              <a-input-number allowClear :maxLength="11" :min="0" v-model="req.id"></a-input-number>
            </a-form-item>
            <a-form-item label="状态">
              <a-select style="width: 150px" v-model="req.state" allowClear>
                <a-select-option :value="i" v-for="(v, i) in states" :key="i">
                  {{v}}
                </a-select-option>
              </a-select>
            </a-form-item>

            <a-form-item label="评论状态">
              <a-select style="width: 150px" v-model="req.commentState" allowClear>
                <a-select-option :value="i" v-for="(v, i) in commentStates" :key="i">
                  {{v}}
                </a-select-option>
              </a-select>
            </a-form-item>

            <a-form-item label="存储模式">
              <a-select style="width: 150px" v-model="req.storeMode" allowClear>
                <a-select-option :value="i" v-for="(v, i) in storeModes" :key="i">
                  {{v}}
                </a-select-option>
              </a-select>
            </a-form-item>

            <a-form-item label="类型">
              <a-select style="width: 150px" v-model="req.kind" allowClear>
                <a-select-option :value="i" v-for="(v, i) in kinds" :key="i">
                  {{v}}
                </a-select-option>
              </a-select>
            </a-form-item>

            <a-form-item label="分类">
              <a-select style="width: 150px" v-model="req.categoryI" allowClear placeholder="所有">
                <a-select-option :value="v.id" v-for="(v, i) in categorys" :key="i">
                  {{v.name}}
                </a-select-option>
              </a-select>
            </a-form-item>

            <a-form-item label="时间范围">
              <a-range-picker @change="handlerPickDatetime" allowClear />
            </a-form-item>
            <a-form-item>
              <a-button icon="search" @click="search">搜索</a-button>
            </a-form-item>
            <a-form-item>
              <a-button icon="plus" @click="edit(null)">新增</a-button>
            </a-form-item>
          </a-form>
        </a-card>
      </a-col>

      <a-col :span="24">
        <a-card>
          <a-list :pagination="req" item-layout="vertical" :data-source="items">
            <a-list-item slot="renderItem" :key="item.id" slot-scope="item">
              <span slot="extra">
                <img :src="item.cover" width="200" height="100" style="object-fit: cover">
              </span>
              <a-list-item-meta :description="item.summary">
                <a slot="title"><a-icon type="file" /> {{item.title}}</a>
              </a-list-item-meta>
              <div slot="actions">
                <a-descriptions bordered>
                  <a-descriptions-item label="状态">
                    <a-badge :color="stateColors[item.state]" :text="states[item.state]" />
                  </a-descriptions-item>
                  <a-descriptions-item label="评论状态">
                    <a-tag :color="commentStateColors[item.commentState]">
                      {{commentStates[item.commentState]}}
                    </a-tag>
                  </a-descriptions-item>
                  <a-descriptions-item label="类型">
                    <a-tag color="blue">
                      {{kinds[item.kind]}}
                    </a-tag>
                  </a-descriptions-item>
                  <a-descriptions-item label="存储模式">
                    <a-tag :color="storeModeColors[item.storeMode]">
                      {{storeModes[item.storeMode]}}
                    </a-tag>
                  </a-descriptions-item>
                  <a-descriptions-item label="分类">
                    <span><a-icon type="folder" /> {{item.categoryName}}</span>
                  </a-descriptions-item>
                  <a-descriptions-item label="TOP">
                    <span>{{item.top}}</span>
                  </a-descriptions-item>
                  <a-descriptions-item label="标签" :span="3">
                    <span><a-icon type="tags" /> {{item.tags.join(' / ')}}</span>
                  </a-descriptions-item>
                  <a-descriptions-item label="创建时间">
                    <a-icon type="clock-circle" /> <Time :time="item.createdAt"></Time>
                  </a-descriptions-item>
                  <a-descriptions-item label="更新时间">
                    <a-icon type="clock-circle" /> <Time :time="item.updatedAt"></Time>
                  </a-descriptions-item>
                </a-descriptions>
              </div>
              <div slot="actions">
                <a-button type="link" size="small" icon="edit" @click="edit(item.id)">
                </a-button>
                <a-popconfirm
                  :title="`确认${item.state === 4 ? '删除' : '废弃'}所选文章！`"
                  ok-text="确认"
                  cancel-text="取消"
                  @confirm="handlerDel(item)"
                >
                  <a-button type="link" size="small" icon="delete">
                  </a-button>
                </a-popconfirm>
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
      commentStates: ['所有', '开放', '关闭'],
      commentStateColors: ['#eeeeee', 'green', '#000000'],
      states: ['所有', '草稿', '待审', '发布', '废弃'],
      stateColors: ['#eeeeee', 'purple', 'magenta', 'green', '#000000'],
      storeModes: ['所有', '文件模式', 'text模式'],
      storeModeColors: ['#eeeeee', 'green', 'cyan'],
      kinds: ['所有', '普通', '灵感', '关于'],
      categorys: [],
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
        id: 0,
        title: '',
        tagName: '',
        categoryId: 0,
        kind: 0,
        storeMode: 0,
        state: 0,
        commentState: 0,
        start: 0,
        end: 0
      }
    }
  },
  methods: {
    init () {
      this.getCategorys()
      this.search()
    },
    async search () {
      this.loading = true
      const result = await this.$request.fetchArticles(this.req)
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
    edit (id) {
      const query = {}
      if (id) {
        query.id = id
      }
      this.$router.push({ path: '/admin/article/edit', query })
    },
    async getCategorys () {
      const result = await this.$request.fetchCategorys({
        pageNum: 1,
        pageSize: 10
      })
      if (result.code) {
        this.categorys = []
        return
      }
      this.categorys = result.data.list
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
    handlerPickDatetime (value) {
      this.req.start = +value[0]
      this.req.end = +value[1]
    },
    async handlerDel (item) {
      this.loading = true
      const result = await this.$request.fetchDelArticle(item)
      if (result.code) {
        this.$message.warning(result.message)
        this.loading = false
        return
      }
      this.search()
      this.$message.success(result.message)
      this.loading = false
    }
  }
}
</script>
