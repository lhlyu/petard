<template>
  <div></div>
</template>

<script>

export default {
  name: 'index',
  components: {
  },
  data () {
    return {
      loading: false,
      req: {
        id: 0,
        title: '',
        summary: '',
        cover: '',
        top: 0,
        categoryId: 0,
        tags: [],
        content: '',
        kind: 1,
        storeMode: 2,
        state: 1,
        commentState: 1
      }
    }
  },
  methods: {

  }
}
</script>
