<template>
  <div>
    <Uploadx @success="handlerSuccess"></Uploadx>
  </div>
</template>

<script>
import Uploadx from '@/components/Upload'

export default {
  name: 'index',
  components: {
    Uploadx
  },
  data () {
    return {}
  },
  methods: {
    handlerSuccess (data) {
      console.log(data)
    }
  }
}
</script>
