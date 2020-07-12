<template>
  <div class="u-bg">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {}
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
  .u-bg{
    height: 100vh;
    width: 100vw;
    background: url('../../assets/imgs/bg.jpg') no-repeat center center fixed;
    background-size: cover;
    overflow: hidden;
  }
</style>
