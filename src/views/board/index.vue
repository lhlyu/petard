<template>
  <div v-loading="loading">
    <el-row>
      <el-card shadow="never">
        <div ref="viewStat" style="width: 100%;height: 450px">
        </div>
      </el-card>
    </el-row>
    <br>
    <el-row>
      <el-card shadow="never">
        <div ref="baseStat" style="width: 100%;height: 450px">
        </div>
      </el-card>
    </el-row>
  </div>
</template>

<script>

// 引入基本模板
import { mapState } from 'vuex'

const echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/bar')
require('echarts/lib/chart/line')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')

export default {
  name: 'index',
  data () {
    return {
      loading: false
    }
  },
  methods: {
    init () {
      this.loadBaseStat()
      this.loadViewStat()
    },
    async loadBaseStat () {
      this.loading = true
      const result = await this.$request.fetchBaseStat()
      if (result.code) {
        this.loading = false
        return
      }
      const chart = echarts.init(this.$refs.baseStat)
      // 绘制图表
      chart.setOption({
        title: { text: '统计' },
        tooltip: {},
        xAxis: {
          data: ['用户', '好友', '文章', '分类', '评论']
        },
        yAxis: {},
        series: [{
          name: '数量',
          type: 'bar',
          data: Object.values(result.data)
        }]
      })
      this.loading = false
    },
    async loadViewStat () {
      this.loading = true
      const result = await this.$request.fetchViewStat()
      if (result.code) {
        this.loading = false
        return
      }
      const chart = echarts.init(this.$refs.viewStat)
      // 绘制图表
      chart.setOption({
        title: { text: '最近十日访问统计' },
        tooltip: {},
        xAxis: {
          type: 'category',
          data: result.data.days
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          name: '数量',
          type: 'line',
          data: result.data.counts
        }]
      })
      this.loading = false
    }
  },
  computed: {
    ...mapState(['dict'])
  }
}
</script>
