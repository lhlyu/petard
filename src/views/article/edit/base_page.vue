<template>
  <div v-if="article">
    {{article.title}}
  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'base_page',
  data () {
    return {
    }
  },
  methods: {
    init () {
    }
  },
  computed: {
    ...mapState({
      article: state => state.article.article
    })
  }
}
</script>
