<template>
  <div class="u-layout u-transition">
    <div class="u-aside u-transition" ref="aside">
      <div @mouseenter="changeWidth(true)" style="width:4px;position:fixed;left:0;top:21px;bottom:21px;z-index:9999;"></div>
      <ASide></ASide>
    </div>
    <div class="u-main u-transition"  @mouseenter="changeWidth(false)">
      <Header></Header>
      <main>
        <keep-alive>
          <router-view/>
        </keep-alive>
      </main>
    </div>
  </div>
</template>

<script>

import ASide from './components/ASide'
import Header from './components/Header'

import { mapGetters } from 'vuex'

export default {
  name: 'index',
  components: {
    ASide,
    Header
  },
  data () {
    return {
      flag: true
    }
  },
  methods: {
    changeWidth (flag) {
      if (this.getOptions.lockMenu) {
        return
      }
      if (!flag) {
        this.$refs.aside.style.width = '0px'
      } else {
        this.$refs.aside.style.width = '275px'
      }
    }
  },
  computed: {
    ...mapGetters(['getOptions'])
  }
}
</script>
