<template>
  <a-page-header :ghost="false" :title="title" :sub-title="subTitle">
    <template slot="extra">
      <a-button @click="save" :loading="loading">
        保存
      </a-button>
    </template>
    <a-tabs default-active-key="1" tabPosition="left">
      <a-tab-pane key="1" tab="基本信息" :forceRender="true">
        <a-form labelAlign="left" :labelCol="{ span: 2 }" :wrapperCol="{ span: 22 }">
          <a-form-item label="标题">
            <a-input allowClear :maxLength="100" v-model="req.title"></a-input>
          </a-form-item>
          <a-form-item label="摘要">
            <a-textarea v-model="req.summary" allowClear :maxLength="200" :auto-size="{ minRows: 3, maxRows: 3 }"/>
          </a-form-item>
          <a-form-item label="置顶值">
            <a-input-number id="inputNumber" v-model="req.top" :min="0" />
          </a-form-item>
          <a-form-item label="标签">
            <a-select mode="tags" style="width: 100%" v-model="req.tags">
            </a-select>
          </a-form-item>
          <a-form-item label="状态">
            <a-select style="width: 150px" v-model="req.state" allowClear>
              <a-select-option :value="i+1" v-for="(v, i) in states" :key="i">
                {{v}}
              </a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item label="评论状态">
            <a-select style="width: 150px" v-model="req.commentState" allowClear>
              <a-select-option :value="i+1" v-for="(v, i) in commentStates" :key="i">
                {{v}}
              </a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item label="存储模式">
            <a-select style="width: 150px" v-model="req.storeMode" allowClear>
              <a-select-option :value="i+1" v-for="(v, i) in storeModes" :key="i">
                {{v}}
              </a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item label="类型">
            <a-select style="width: 150px" v-model="req.kind" allowClear>
              <a-select-option :value="i+1" v-for="(v, i) in kinds" :key="i">
                {{v}}
              </a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item label="分类">
            <a-select style="width: 150px" v-model="req.categoryI" allowClear placeholder="未选择">
              <a-select-option :value="v.id" v-for="(v, i) in categorys" :key="i">
                {{v.name}}
              </a-select-option>
            </a-select>
          </a-form-item>

        </a-form>
      </a-tab-pane>
      <a-tab-pane key="2" tab="其他信息" :forceRender="true">
        <img :src="req.cover" height="200">
        <br v-if="req.cover.length">
        <br v-if="req.cover.length">
        <Upload @success="handlerUpload"></Upload>
      </a-tab-pane>
      <a-tab-pane key="3" tab="文章内容" :forceRender="true">
        <div id="vditor"></div>
      </a-tab-pane>
    </a-tabs>
  </a-page-header>
</template>

<script>
import Vditor from 'vditor'

import Upload from '@/components/Upload'

export default {
  name: 'index',
  components: {
    Upload
  },
  data () {
    return {
      loading: false,
      contentEditor: null,
      commentStates: ['开放', '关闭'],
      states: ['草稿', '待审', '发布', '废弃'],
      storeModes: ['文件模式', 'text模式'],
      kinds: ['普通', '灵感', '关于'],
      categorys: [],
      title: '新增文章',
      subTitle: '',
      req: {
        id: 0,
        title: '',
        summary: '',
        cover: '',
        top: 0,
        categoryId: 0,
        tags: [],
        content: '',
        kind: 1,
        storeMode: 2,
        state: 1,
        commentState: 1
      }
    }
  },
  watch: {
    $route (val, oldVal) {
      if (val.path !== '/admin/article/edit') {
        return
      }
      this.load()
    }
  },
  methods: {
    init () {
      this.contentEditor = new Vditor('vditor', {
        mode: 'sv',
        minHeight: 500,
        counter: {
          enable: true
        }
      })
      this.getCategorys()
      this.load()
    },
    async load () {
      const id = this.$route.query.id
      if (!id) {
        this.title = '新增文章'
        this.subTitle = ''
        this.req = { id: 0, title: '', summary: '', cover: '', top: 0, tags: [], content: '', kind: 1, storeMode: 2, state: 1, commentState: 1 }
        this.contentEditor.setValue('')
        return
      }
      this.title = '编辑文章'
      if (id === this.req.id) {
        this.subTitle = this.req.title
        this.contentEditor.setValue(this.req.content)
        return
      }
      const result = await this.$request.fetchArticle({
        id: id
      })
      if (result.code) {
        this.$message.warning(result.message)
        return
      }
      this.subTitle = result.data.title
      this.req = result.data
      this.contentEditor.setValue(this.req.content)
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
    handlerUpload (data) {
      this.req.cover = data.url
    },
    async save () {
      this.req.content = this.contentEditor.getValue()
      if (this.contentEditor.getHTML().length === 0) {
        this.$message.warning('文章内容不能为空！')
        return
      }
      this.loading = true
      const result = await this.$request.fetchEditArticle(this.req)
      if (result.code) {
        this.$message.warning(result.message)
        this.loading = false
        return
      }
      this.$message.success(result.message)
      this.loading = false
    }
  }
}
</script>
