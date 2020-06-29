<template>
  <div id="vditor"></div>
</template>

<script>
import Vditor from 'vditor'

export default {
  name: 'add_page',
  data () {
    return {
      contentEditor: null
    }
  },
  methods: {
    init () {
      this.contentEditor = new Vditor('vditor', {
        mode: 'sv',
        minHeight: 550
      })
    }
  }
}
</script>
