<template>
  <div>
    <a-spin size="large" :spinning="loading">
      <a-row :gutter="[15, 15]">
        <a-col :span="24">
          <a-card title="搜索">
            <a slot="extra" href="#"><a-icon type="plus-square" /> 新增</a>
            <a-form layout="inline">
              <a-form-item label="key">
                <a-input allowClear :maxLength="16" v-model="req.key"></a-input>
              </a-form-item>
              <a-form-item>
                <a-button icon="search" @click="search">搜索</a-button>
              </a-form-item>
              <a-form-item>
                <a-button icon="plus" @click="handlerAdd">添加</a-button>
              </a-form-item>
            </a-form>
          </a-card>
        </a-col>
        <a-col :span="24">
          <a-card>
            <a-table :pagination="req" :columns="columns" :data-source="items">
             <span slot="action" slot-scope="record">
                <a-button type="primary" size="small" icon="edit"  @click="handlerEdit(record)">
                  编辑
                </a-button>
                <a-divider type="vertical" />
                <a-button type="danger" size="small" icon="delete"  @click="del(record)">
                  删除
                </a-button>
              </span>
            </a-table>
          </a-card>
        </a-col>
      </a-row>
    </a-spin>
    <a-modal v-model="visible" :destroyOnClose="true" :title="editReq.title" @ok="handleOk" @cancel="handlerCancel">
      <a-form layout="horizontal" labelAlign="left" :labelCol="{ span: 4 }" :wrapperCol="{ span: 20 }">
        <a-form-item label="key">
          <a-input placeholder="key" allowClear v-model="editReq.key" />
        </a-form-item>
        <a-form-item label="value">
          <a-input placeholder="value" allowClear v-model="editReq.value" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>

import { isEmpty } from '@/utils'

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    scopedSlots: { customRender: 'id' }
  },
  {
    title: 'Key',
    dataIndex: 'key',
    key: 'key',
    scopedSlots: { customRender: 'key' }
  },
  {
    title: 'Value',
    dataIndex: 'value',
    key: 'value',
    scopedSlots: { customRender: 'value' }
  },
  {
    title: '状态',
    dataIndex: 'state',
    key: 'state',
    scopedSlots: { customRender: 'state' }
  },
  {
    title: '操作',
    key: 'action',
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  name: 'index',
  data () {
    return {
      columns,
      loading: false,
      visible: false,
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
        key: ''
      },
      editReq: {
        id: 0,
        key: '',
        value: ''
      }
    }
  },
  methods: {
    init () {
      this.search()
    },
    async search () {
      this.loading = true
      const result = await this.$request.fetchQuantas(this.req)
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
    handlerEdit (record) {
      this.editReq = {
        title: '编辑配置',
        id: record.id,
        key: record.key,
        value: record.value
      }
      this.visible = true
    },
    handlerAdd () {
      this.editReq = {
        title: '添加配置',
        id: 0,
        key: '',
        value: ''
      }
      this.visible = true
    },
    handlerCancel () {
      this.editReq = {
        id: 0,
        key: '',
        value: ''
      }
    },
    async handleOk () {
      if (isEmpty(this.editReq.key) || isEmpty(this.editReq.value)) {
        this.$message.warning('内容不能为空！')
        return
      }
      this.loading = true
      let result = null
      if (this.editReq.id > 0) {
        result = await this.$request.fetchUpdQuanta(this.editReq)
      } else {
        result = await this.$request.fetchAddQuanta(this.editReq)
      }
      if (result.code) {
        this.$message.warning(result.message)
        this.loading = false
        return
      }
      this.search()
      this.$message.success(result.message)
      this.loading = false
    },
    async del (record) {
      this.loading = true
      const result = await this.$request.fetchDelQuanta(record)
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
