<template>
  <div>
    <a-tabs default-active-key="1" tab-position="top" type="line">
      <a-tab-pane v-for="i in 30" :key="i" :tab="`Tab-${i}`"></a-tab-pane>
    </a-tabs>
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
