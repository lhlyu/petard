import Vue from 'vue'
import isMobile from 'ismobilejs'
import request from '@/api/apis.js'

Vue.prototype.$isMobile = isMobile().phone
Vue.prototype.$request = request

Vue.mixin({
  components: {
  },
  data () {
    return {
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initData()
      this.init()
    })
  },
  methods: {
    initData () {},
    init () {},
    isEmpty (v) {
      if (!v || v.length === 0) {
        return true
      }
      return false
    },
    scrollTop (cb, top) {
      window.scrollTo({
        top: top || 0,
        behavior: 'smooth'
      })
      if (cb) {
        setTimeout(() => {
          cb()
        }, this.$isMobile ? 0 : 400)
      }
    }
  }
})
