<template>
  <div class="home">
    <Menu :options="options"></Menu>
  </div>
</template>

<script>

  import Menu from '@/components/Menu'

export default {
  name: 'Home',
  components: {
    Menu
  },
  data(){
    return {
      options:{
        theme:"default",
        display: true,
        defaultImg: "",
        position:"right"
      }
    }
  },
  methods:{

  }
}
</script>
