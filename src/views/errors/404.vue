<template>
  <Bg class="u-center">
    <div class="u-notfound">
      <div class="u-notfound-header">
        <h2>404</h2>
      </div>
      <div class="u-notfound-container">
        <p class="u-align-left">我天性不宜交际，在多数场合，我不是觉得对方乏味，就是害怕对方觉得我乏味。可是我不愿意忍受对方的乏味，也不愿费劲使自己显得有趣味，那都太累了，我独处时最轻松，因为我不觉得自己乏味。即使乏味也自己承受，不累及他人，无需感到不安</p>
        <p class="u-align-right">—— 风中的纸屑</p>
      </div>
      <div class="u-notfound-footer">
        <span class="u-cursor"><el-link :underline="false" href="/">首页</el-link></span>
        <span class="u-cursor"><el-link :underline="false" href="javascript:history.back(-1)">← 返回</el-link></span>
      </div>
    </div>
  </Bg>
</template>

<script>

import Bg from '@/components/Bg'

export default {
  name: 'notfound',
  components: {
    Bg
  },
  data () {
    return {}
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
  .u-notfound{
    max-width: 560px;
    width: 100%;
    display:flex;
    flex-direction: column;
    margin: 0 auto;
    letter-spacing: 2px;
    box-sizing: border-box;
    padding: 15px;
    &-header{
      color: #ffffff;
      h2{
        padding-bottom: 10px;
        border-bottom: solid 1px #ffffff;
      }
    }
    &-container{
      text-align: center;
      border-bottom: 1px solid #e5e5e5;
      box-shadow: 0 8px 16px -6px black;
      padding: 30px;
      color: inherit;
      background-color: rgba(#eee, 0.8);
      border-radius: 6px;
      box-sizing: border-box;
      font-size: 16px;
      font-weight: 300;
      line-height: 1.5;
    }
    &-footer{
      margin-top: 20px;
      padding-top: 10px;
      border-top: solid 1px #ffffff;
      display: flex;
      justify-content: space-between;
      a{
        color: #ffffff;
        &:hover{
          color: #ffffff;
        }
      }
    }
  }
</style>
