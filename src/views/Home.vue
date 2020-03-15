<template>
  <div class="home">
    <Menu :menus="menus" :options="options" @onClick="clickMenuHandler"></Menu>
    <router-view/>

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
      menus:[{
        name: "首页",
        display: true,
        to:"/",
        active: false,
        icon:"iconfont icon-shouye"
      },{
        name: "文章",
        display: true,
        to:"/",
        active: false,
        icon:"iconfont icon-List"
      },{
        name: "创作",
        display: true,
        to:"/create",
        active: true,
        icon:"iconfont icon-chuangzuo"
      },{
        name: "设置",
        display: true,
        to:"/",
        active: false,
        icon:"iconfont icon-shezhi"
      },{
        name: "顶部",
        display: true,
        to:"/",
        active: false,
        icon:"iconfont icon-top"
      }],
      options:{
        theme:"default",
        display: true,
        defaultImg: "",
        position:"right"
      }
    }
  },
  methods:{
    init(){

    },
    clickMenuHandler(m){
      if(m.name == "顶部"){
        this.scrollTop(() => {

        })
        return
      }
      this.menus.map(v => {
        if(v.name == m.name){
          v.active = true
        }else{
          v.active = false
        }
      })
      this.$router.push({
        path: m.to
      })
    }
  }
}
</script>
