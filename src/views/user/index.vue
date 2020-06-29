<template>
  <div>
    <a-spin :spinning="loading">
      <a-row :gutter="[0,15]">
        <a-col :span="24">
          <a-card>
            <a-form layout="inline">
              <a-form-item label="用户昵称">
                <a-input allowClear :maxLength="16" v-model="req.name"></a-input>
              </a-form-item>
              <a-form-item label="用户ID">
                <a-input-number allowClear :maxLength="11" :min="0" v-model="req.userId"></a-input-number>
              </a-form-item>
              <a-form-item label="状态">
                <a-select style="width: 120px" v-model="req.state" allowClear>
                  <a-select-option :value="i" v-for="(v, i) in states" :key="i">
                    {{v}}
                  </a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item label="身份">
                <a-select style="width: 120px" v-model="req.identity" allowClear>
                  <a-select-option :value="i" v-for="(v, i) in identitys" :key="i">
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
            <a-list :pagination="req" item-layout="vertical" :data-source="items">
              <a-list-item slot="renderItem" :key="item.id" slot-scope="item">
                <span slot="extra">
                  <a-icon type="clock-circle" /> <Time :time="item.createdAt"></Time>
                  <br>
                  <br>
                  <a-radio-group v-model="item.state" size="small" @change="handlerStateChange(item)">
                    <a-radio :value="1">
                      {{states[1]}}
                    </a-radio>
                    <a-radio :value="2">
                      {{states[2]}}
                    </a-radio>
                  </a-radio-group>
                  <br>
                  <br>
                  <a-radio-group v-model="item.identity" size="small" @change="handlerIdentitysChange(item)">
                    <a-radio :value="1">
                      {{identitys[1]}}
                    </a-radio>
                    <a-radio :value="2">
                      {{identitys[2]}}
                    </a-radio>
                    <a-radio :value="3">
                      {{identitys[3]}}
                    </a-radio>
                  </a-radio-group>
                  <br>
                  <br>
                  <a @click="handlerSetFriend(item)">设置个人网站</a>
                </span>
                <a-list-item-meta :description="item.bio">
                  <a slot="title" :href="item.url">{{ item.nickName }}「 id:{{item.id}} 」</a>
                  <a-avatar slot="avatar" :src="item.avatar" />
                </a-list-item-meta>
                <span>最近访问：<Time :time="item.lastAt"></Time></span>
                <div slot="actions">
                  <a-badge :color="stateColors[item.state]" :text="states[item.state]" />
                </div>
                <div slot="actions">
                  <a-tag :color="identitysColors[item.identity]">
                    {{identitys[item.identity]}}
                  </a-tag>
                </div>
                <div slot="actions">
                  <a-tag color="cyan">
                    {{item.source}}
                  </a-tag>
                </div>
                <div slot="actions">
                  <span>{{item.ip}}</span>
                </div>
              </a-list-item>
            </a-list>
          </a-card>
        </a-col>
      </a-row>
    </a-spin>

    <a-modal v-model="visible" :destroyOnClose="true" v-if="item" title="个人网站" @ok="handleOk" @cancel="handlerCancel">
      <a-form layout="horizontal" labelAlign="left" :labelCol="{ span: 4 }" :wrapperCol="{ span: 20 }">
        <a-form-item label="URL">
          <a-input type="url" placeholder="URL" allowClear v-model="item.url" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>

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
      visible: false,
      identitys: ['所有', '普通', '好友', '管理'],
      identitysColors: ['#eeeeee', 'blue', 'green', 'purple'],
      states: ['所有', '正常', '禁止'],
      stateColors: ['#eeeeee', 'green', '#000000'],
      items: [],
      item: null,
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
        start: 0,
        end: 0,
        state: 0,
        identity: 0,
        name: ''
      }
    }
  },
  methods: {
    init () {
      this.search()
    },
    async search () {
      this.loading = true
      const result = await this.$request.fetchUsers(this.req)
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
      const result = await this.$request.fetchUpdUser(item)
      if (result.code) {
        this.$message.warning(result.message)
        this.search()
        this.loading = false
        return
      }
      this.$message.success(result.message)
      this.loading = false
    },
    async handlerIdentitysChange (item) {
      this.loading = true
      const result = await this.$request.fetchUpdUser(item)
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
    },
    handlerSetFriend (item) {
      this.item = item
      this.visible = true
    },
    async handleOk () {
      this.loading = true
      const result = await this.$request.fetchUpdUser(this.item)
      if (result.code) {
        this.$message.warning(result.message)
        this.search()
        this.loading = false
        return
      }
      this.$message.success(result.message)
      this.loading = false
    },
    handlerCancel () {
      this.item = null
    }
  }
}
</script>
