<template>
  <div>
    <h2>卡片</h2>
    <Card></Card>
    <h2>卡片2</h2>
    <Article></Article>
  </div>

</template>

<script>

import Card from '@/components/Card/card-text.vue'
import Article from '@/components/Article'

export default {
  name: 'index',
  components: {
    Card,
    Article
  },
  data () {
    return {}
  },
  methods: {}
}
</script>
