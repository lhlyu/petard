// 自定义指令
import Vue from 'vue'
import { Message } from 'element-ui'

// 参考: https://cn.vuejs.org/v2/guide/custom-directive.html

// 权限指令
// Vue.directive('power', {
//   inserted: function (el, binding) {
//     const val = binding.value
//     if (!val) {
//       return
//     }
//     if (!contains(store.state.user.codes, val)) {
//       if (el.parentNode) {
//         el.parentNode.removeChild(el)
//       }
//     }
//   }
// })

// 节流指令
Vue.directive('throttling', {
  inserted: function (el, binding) {
    const { callback, time } = binding.value
    el.callback = callback
    el.time = time
    el.addEventListener('click', () => {
      const nowTime = new Date().getTime()
      if (!el.preTime || nowTime - el.preTime > el.time) {
        el.preTime = nowTime
        el.callback()
      } else {
        Message.warning('请求太频繁，休息一下~')
      }
    })
  },
  update: function (el, binding) {
    const { callback, time } = binding.value
    el.callback = callback
    el.time = time
  }
})
