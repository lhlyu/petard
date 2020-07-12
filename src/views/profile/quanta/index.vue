<template>
  <div v-loading="loading">
    <el-row>
      <el-collapse-transition>
        <el-card shadow="never" v-show="searchShow">
          <el-form inline :model="req" ref="form" label-position="left" label-suffix=":" size="mini">
            <el-form-item label="Key" prop="key">
              <el-input placeholder="属性" clearable maxlength="50" show-word-limit v-model="req.key"></el-input>
            </el-form-item>
            <el-form-item label="状态" prop="state">
              <el-select v-model="req.state" clearable placeholder="请选择">
                <el-option
                  v-for="item in dict.quanta.state"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key">
                </el-option>
              </el-select>
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
        <el-table :data="items" :fit="false">
          <el-table-column type="index" label="序号" v-if="columnShow.index"></el-table-column>
          <el-table-column prop="id" label="主键" v-if="columnShow.id"></el-table-column>
          <el-table-column prop="key" label="Key" v-if="columnShow.key"></el-table-column>
          <el-table-column prop="value" label="Value" v-if="columnShow.value"></el-table-column>
          <el-table-column prop="state" align="center" label="状态" v-if="columnShow.state">
            <template slot-scope="scope">
              <el-tag :type="dict.quanta.state.find(v => v.key == scope.row.state).color">{{dict.quanta.state.find(v => v.key == scope.row.state).value}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="right">
            <template slot="header" slot-scope="scope">
              <el-tooltip placement="top" effect="light">
                <div slot="content">{{searchShow ? '隐藏搜索' : '展开搜索'}}</div>
                <el-button type="text" icon="el-icon-search" @click="handlerSearchShow"></el-button>
              </el-tooltip>
              <el-tooltip placement="top" effect="light" content="新增">
                <el-button type="text" icon="el-icon-plus" @click="handlerEidt(null)"></el-button>
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
                  <el-checkbox label="主键" v-model="columnShow.id"></el-checkbox><br>
                  <el-checkbox label="Key" v-model="columnShow.key"></el-checkbox><br>
                  <el-checkbox label="Value" v-model="columnShow.value"></el-checkbox><br>
                  <el-checkbox label="状态" v-model="columnShow.state"></el-checkbox>
                </div>
                <el-button type="text" icon="el-icon-s-operation" slot="reference"></el-button>
              </el-popover>
            </template>
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" plain size="mini" @click="handlerEidt(scope.row)">编辑</el-button>
              <el-button type="danger" icon="el-icon-delete" plain size="mini" @click="handlerDel(scope.row)">删除</el-button>
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

    <el-dialog :title="editReq.title" :visible.sync="dialogQuantaVisible">
      <el-form label-position="left" label-suffix=":" label-width="80px" size="mini">
        <el-form-item label="Key">
          <el-input placeholder="Key" clearable maxlength="20" show-word-limit :disabled="editReq.id > 0" v-model="editReq.key"></el-input>
        </el-form-item>
        <el-form-item label="Value">
          <el-input placeholder="Value" clearable maxlength="20" show-word-limit v-model="editReq.value"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="editReq.state" placeholder="请选择">
            <el-option
              v-for="item in dict.quanta.state"
              :key="item.key"
              :label="item.value"
              :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
        <br>
        <el-form-item>
          <el-button type="primary" plain @click="edit">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'index',
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
      dialogQuantaVisible: false,
      columnShow: {
        all: true,
        index: true,
        id: true,
        key: true,
        value: true,
        state: true
      },
      page: {
        pageNum: 1,
        pageSize: 5,
        total: 0
      },
      req: {
        key: '',
        state: null
      },
      editReq: {
        title: '新增配置',
        id: 0,
        key: '',
        value: '',
        state: 1
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
      const result = await this.$request.fetchQuantas(req)
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
    async edit () {
      if (this.isEmpty(this.editReq.key, 'Key不能为空！')) {
        return
      }
      if (this.isEmpty(this.editReq.value, 'Value不能为空！')) {
        return
      }
      let result = null
      if (this.editReq.id) {
        result = await this.$request.fetchUpdQuanta(this.editReq)
      } else {
        result = await this.$request.fetchAddQuanta(this.editReq)
      }
      if (result.code) {
        this.$message.warning(result.message)
        return
      }
      this.$message.success(result.message)
      this.search()
    },
    async del (data) {
      const result = await this.$request.fetchDelQuanta(data)
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
      this.editReq = {
        title: '新增配置',
        id: 0,
        key: '',
        value: '',
        state: 1
      }
      if (row) {
        this.editReq = {
          title: '编辑配置',
          id: row.id,
          key: row.key,
          value: row.value,
          state: row.state
        }
      }
      this.dialogQuantaVisible = true
    },
    handlerDel (row) {
      const that = this
      this.$confirm('此操作将永久删除该记录？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '再想想~',
        type: 'warning'
      }).then(() => {
        that.del()
      })
    }
  },
  computed: {
    ...mapState(['dict'])
  }
}
</script>
