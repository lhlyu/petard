<template>
  <div class="u-article">
    <div class="u-article__cover">
    </div>
    <div class="u-article__container">
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  props: {
    data: {
      type: Object,
      default: () => {
        return null
      }
    }
  },
  data () {
    return {}
  },
  methods: {}
}
</script>
