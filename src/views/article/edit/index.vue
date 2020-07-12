<template>
  <div v-loading="loading">
    <el-row>
      <el-card shadow="never">
        <el-tabs tab-position="left" style="min-height: 400px;">
          <el-tab-pane label="基本信息">
            <el-card shadow="never">
              <el-form label-position="left" label-width="80px" label-suffix=":" v-if="req">
                <el-form-item label="主键" v-if="req.id">
                  <el-input placeholder="主键" disabled v-model="req.id">
                  </el-input>
                </el-form-item>
                <el-form-item label="标题">
                  <el-input placeholder="标题" v-model="req.title">
                  </el-input>
                </el-form-item>
                <el-form-item label="摘要">
                  <el-input placeholder="摘要" type="textarea" :rows="2" v-model="req.summary">
                  </el-input>
                </el-form-item>
                <el-form-item label="排序">
                  <el-input-number style="width: 50%" placeholder="值越大越靠前(选填)" v-model="req.top" controls-position="right" :min="0" :step="1">
                  </el-input-number>
                </el-form-item>
                <el-form-item label="分类">
                  <el-select style="width: 50%" v-model="req.categoryId" filterable placeholder="请选择">
                    <el-option
                      v-for="item in categorys"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="标签">
                  <el-select
                    style="width: 50%"
                    v-model="req.tags"
                    multiple
                    filterable
                    allow-create
                    default-first-option
                    placeholder="请选择文章标签">
                  </el-select>
                </el-form-item>
                <el-form-item label="类型">
                  <el-select style="width: 50%" v-model="req.kind" placeholder="请选择">
                    <el-option
                      v-for="item in dict.article.kind"
                      :key="item.key"
                      :label="item.value"
                      :value="item.key">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="状态">
                  <el-select style="width: 50%" v-model="req.state" placeholder="请选择">
                    <el-option
                      v-for="item in dict.article.state"
                      :key="item.key"
                      :label="item.value"
                      :value="item.key">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="存储模式">
                  <el-select style="width: 50%" v-model="req.storeMode" placeholder="请选择">
                    <el-option
                      v-for="item in dict.article.storeMode"
                      :key="item.key"
                      :label="item.value"
                      :value="item.key">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="评论状态">
                  <el-select style="width: 50%" v-model="req.commentState" placeholder="请选择">
                    <el-option
                      v-for="item in dict.article.commentState"
                      :key="item.key"
                      :label="item.value"
                      :value="item.key">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button size="mini" plain @click="save">保存</el-button>
                </el-form-item>
              </el-form>
            </el-card>
          </el-tab-pane>
          <el-tab-pane label="封面信息">
            <el-card shadow="never">
              <div style="width: 460px;height: 300px;background: #f5f7fa;color: #909399;font-size: 26px">
                <el-image class="u-center" :src="req.cover" :srcList="[req.cover]" fit="cover" style="width: 100%;height: 100%">
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
              </div>
              <br>
              <br>
              <el-button size="mini" type="primary" plain @click="dialogCoverVisible = true">修改</el-button>
              <el-button size="mini" plain @click="save">保存</el-button>
            </el-card>
          </el-tab-pane>
          <el-tab-pane label="内容信息">
            <div id="vditor"></div>
            <br>
            <el-button size="mini" plain @click="save">保存</el-button>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </el-row>
    <el-dialog title="编辑封面" :visible.sync="dialogCoverVisible">
      <Upload @success="handlerUpload"></Upload>
    </el-dialog>
  </div>
</template>

<script>

import Vditor from 'vditor'

import Upload from '@/components/Upload'
import { mapState } from 'vuex'

export default {
  name: 'index',
  components: {
    Upload
  },
  watch: {
    $route (val, oldVal) {
      if (val.name !== 'article-edit') {
        return
      }
      this.loadArticle(val.query.id)
    }
  },
  data () {
    return {
      loading: false,
      dialogCoverVisible: false,
      contentEditor: null,
      categorys: null,
      req: {
        id: 0,
        title: '',
        summary: '',
        cover: '',
        top: 0,
        categoryId: null,
        tags: [],
        content: '',
        kind: 1,
        storeMode: 2,
        state: 1,
        commentState: 1
      }
    }
  },
  methods: {
    init () {
      this.initEdtor()
      this.loadCategorys()
      this.loadArticle(this.$route.query.id)
    },
    initEdtor (value) {
      this.contentEditor = new Vditor('vditor', {
        mode: 'sv',
        minHeight: 550,
        cache: {
          enable: true,
          id: 'petardEditor'
        }
      })
    },
    async loadArticle (id) {
      if (!id) {
        this.req = {
          id: 0,
          title: '',
          summary: '',
          cover: '',
          top: 0,
          categoryId: null,
          tags: [],
          content: '',
          kind: 1,
          storeMode: 2,
          state: 1,
          commentState: 1
        }
        return
      }
      this.loading = true
      const result = await this.$request.fetchArticle({
        id: id
      })
      if (result.code) {
        this.$message.warning(result.message)
        this.loading = false
        return
      }
      this.req = result.data
      this.contentEditor.setValue(this.req.content)
      this.loading = false
    },
    async loadCategorys () {
      this.loading = true
      const result = await this.$request.fetchCategorys({
        pageNum: 1,
        pageSize: 20
      })
      if (result.code) {
        this.categorys = []
        this.$message.warning(result.message)
        this.loading = false
        return
      }
      this.categorys = result.data.list
      this.loading = false
    },
    save () {
      const length = this.contentEditor.getHTML().trim().length
      if (length === 0) {
        this.$message.warning('内容不能为空！')
      }
    },
    // ------------ handler -----------------
    handlerUpload (data) {
      if (!data) {
        return
      }
      this.req.cover = data.url
    }
  },
  computed: {
    ...mapState(['dict'])
  }
}
</script>
