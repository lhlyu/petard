<template>
  <a-spin :spinning="loading">
    <a-row :gutter="[15,15]">
      <a-col :span="6">
        <a-card v-if="stats">
          <a-statistic title="用户数量" :value="stats.userCount" />
          <a-statistic title="好友数量" :value="stats.friendCount" />
          <a-statistic title="文章数量" :value="stats.articleCount" />
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card v-if="stats">
          <a-statistic title="分类数量" :value="stats.categoryCount" />
          <a-statistic title="访问总量" :value="stats.viewCount" />
          <a-statistic title="评论总量" :value="stats.commentCount" />
        </a-card>
      </a-col>
      <a-col :span="12">
        <a-card title="访问量">
          <div id="view"></div>
        </a-card>
      </a-col>
    </a-row>
  </a-spin>
</template>

<script>

import { Chart } from '@antv/g2'

export default {
  name: 'index',
  data () {
    return {
      loading: false,
      stats: null
    }
  },
  methods: {
    init () {
      this.loading = true
      this.loadView()
      this.loadBase()
      this.loading = false
    },
    async loadView () {
      const result = await this.$request.fetchViewStat()
      if (result.code) {
        this.$message.warning('数据加载失败！')
        return
      }
      const chart = new Chart({
        container: 'view',
        autoFit: true,
        height: 500
      })
      chart.data(result.data)
      chart.scale({
        day: {
          range: [0, 1]
        },
        count: {
          min: 0,
          nice: true
        }
      })
      chart.tooltip({
        showCrosshairs: true, // 展示 Tooltip 辅助线
        shared: true
      })
      chart.line().position('day*count').label('count')
      chart.point().position('day*count')
      chart.render()
    },
    async loadBase () {
      const result = await this.$request.fetchBaseStat()
      if (result.code) {
        this.$message.warning('数据加载失败！')
        return
      }
      this.stats = result.data
    }
  }
}
</script>
