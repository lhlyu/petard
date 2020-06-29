<template>
  <div>
    <a-spin :spinning="loading">
      <a-row :gutter="[0,15]">
        <a-col :span="24">
          <a-card>
            <a-form layout="inline">
              <a-form-item label="key">
                <a-input allowClear :maxLength="16" v-model="req.name"></a-input>
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
             <span slot="state" slot-scope="state">
               <a-badge :color="stateColors[state]" :text="states[state]" />
             </span>
             <span slot="createdAt" slot-scope="createdAt"><Time :time="createdAt"></Time></span>
             <span slot="updatedAt" slot-scope="updatedAt"><Time :time="updatedAt"></Time></span>
             <span slot="action" slot-scope="record">
                <a @click="handlerEdit(record)">编辑</a>
                <a-divider type="vertical" v-if="record.count === 0" />
                <a @click="del(record)" v-if="record.count === 0">删除</a>
              </span>
            </a-table>
          </a-card>
        </a-col>
      </a-row>
    </a-spin>
    <a-modal v-model="visible" :destroyOnClose="true" :title="editReq.title" @ok="handleOk" @cancel="handlerCancel">
      <a-form layout="horizontal" labelAlign="left" :labelCol="{ span: 4 }" :wrapperCol="{ span: 20 }">
        <a-form-item label="名字">
          <a-input placeholder="key" allowClear v-model="editReq.name" />
        </a-form-item>
        <a-form-item label="是否启用">
          <a-switch checked-children="启用" un-checked-children="禁止" v-model="enable" @change="handlerEnableChange" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>

import Time from '@/components/Time'
import { isEmpty } from '@/utils'

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    scopedSlots: { customRender: 'id' }
  },
  {
    title: '名字',
    dataIndex: 'name',
    key: 'name',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '关联文章数量',
    align: 'center',
    dataIndex: 'count',
    key: 'count',
    scopedSlots: { customRender: 'count' }
  },
  {
    title: '状态',
    dataIndex: 'state',
    key: 'state',
    scopedSlots: { customRender: 'state' }
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    key: 'createdAt',
    scopedSlots: { customRender: 'createdAt' }
  },
  {
    title: '更新时间',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    scopedSlots: { customRender: 'updatedAt' }
  },
  {
    title: 'Action',
    key: 'action',
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  name: 'index',
  components: {
    Time
  },
  data () {
    return {
      columns,
      states: ['', '启用', '禁止'],
      stateColors: ['#eeeeee', 'green', '#000000'],
      loading: false,
      visible: false,
      enable: false,
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
        name: ''
      },
      editReq: {
        id: 0,
        name: '',
        state: 2
      }
    }
  },
  methods: {
    init () {
      this.search()
    },
    async search () {
      this.loading = true
      const result = await this.$request.fetchCategorys(this.req)
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
    handlerEnableChange (checked) {
      this.editReq.state = checked ? 1 : 2
    },
    handlerEdit (record) {
      this.editReq = {
        title: '编辑分类',
        id: record.id,
        name: record.name,
        state: record.state
      }
      this.enable = record.state === 1
      this.visible = true
    },
    handlerAdd () {
      this.editReq = {
        title: '添加分类',
        id: 0,
        name: '',
        state: 1
      }
      this.enable = true
      this.visible = true
    },
    handlerCancel () {
      this.editReq = {
        id: 0,
        name: '',
        state: 2
      }
      this.enable = false
    },
    async handleOk () {
      if (isEmpty(this.editReq.name)) {
        this.$message.warning('内容不能为空！')
        return
      }
      this.loading = true
      let result = null
      if (this.editReq.id > 0) {
        result = await this.$request.fetchUpdCategory(this.editReq)
      } else {
        result = await this.$request.fetchAddCategory(this.editReq)
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
      const result = await this.$request.fetchDelCategory(record)
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
