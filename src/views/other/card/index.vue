<template>
  <div>
    <h2>卡片</h2>
    <Card></Card>
    <h2>评论</h2>
    <CardComment></CardComment>
  </div>

</template>

<script>

import Card from '@/components/Card/card-text.vue'
import CardComment from '@/components/Card/card-comment.vue'

export default {
  name: 'index',
  components: {
    Card,
    CardComment
  },
  data () {
    return {}
  },
  methods: {}
}
</script>
