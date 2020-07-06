<template>
  <div>
    <a-spin :spinning="loading" v-if="columns">
      <a-row :gutter="[15,15]">
        <a-col :span="24">
          <slot name="header"></slot>
        </a-col>
      </a-row>
      <a-card>
        <a-row :gutter="[15,5]">
          <a-col :span="24">
            <a-popconfirm placement="bottom" ok-text="Yes" cancel-text="No" @confirm="confirm">
              <template slot="title">
                <div>
                  <div :style="{ borderBottom: '1px solid #E9E9E9' }">
                    <a-checkbox :indeterminate="indeterminate" :checked="checkAll" @change="onCheckAllChange">
                      Check all
                    </a-checkbox>
                  </div>
                  <br />
                  <a-checkbox-group v-model="checkedList" :options="plainOptions" @change="onChange" />
                </div>
              </template>
              <a-button size="large" type="link">
                <a-icon type="control" />
              </a-button>
            </a-popconfirm>

          </a-col>
          <a-col :span="24">
            <a-table :pagination="req" :columns="columns" :data-source="datas">
              <template v-for="c in columns" :slot="c.key" slot-scope="text,record">
                <slot :name="c.key" :row="record">
                  {{text}}
                </slot>
              </template>
            </a-table>
          </a-col>
        </a-row>
      </a-card>
      <a-row :gutter="[15,15]">
        <a-col :span="24">
          <slot name="footer"></slot>
        </a-col>
      </a-row>
    </a-spin>
  </div>
</template>

<script>
export default {
  name: 'index',
  props: {
    columns: {
      type: Array,
      default: () => {
        return []
      }
    },
    datas: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      loading: false,
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
      }
    }
  },
  methods: {
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
    }
  }
}
</script>
