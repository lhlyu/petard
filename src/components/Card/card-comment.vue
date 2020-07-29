<template>
  <div class="container">
    <div class="card">
      <div class="avatar">
        <img src="http://www.thiswaifudoesnotexist.net/example-9369.jpg" alt="">
      </div>
      <div class="zs">
      </div>
      <p><strong>姓名</strong> <span>栗子</span></p>
      <p><strong>性别</strong> <span>女</span></p>
      <p><strong>身高</strong> <span>165</span></p>
      <p><strong>体重</strong> <span>85</span></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'card-comment',
  data () {
    return {}
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
  $theme: #e84393;
  .container {
    padding: 50px 100px;
  }
  .card{
    height: 120px;
    width: 350px;
    border: 1px solid rgba($theme,0.4);
    border-radius: 2px;
    position: relative;
    border-top: 2px solid rgba($theme,0.6);
    padding: 10px 5px 10px 100px;
    box-sizing: border-box;
    background: #FFFFFF;
    p {
      margin: 0;
      padding: 0;
      letter-spacing: 1px;
      font-size: 14px;
      line-height: 1.7;
    }
    strong {
      color: $theme;
      margin-right: 8px;
    }
    span{
      color: #888888;
    }
  }
  .zs{
    background: rgba($theme,0.95);
    height: 14px;
    width: 14px;
    position: absolute;
    right: -7px;
    top: -7px;
    transform: rotate(45deg);
  }
  .avatar{
    position: absolute;
    left: -60px;
    top: 0;
    height: 120px;
    width: 120px;
    border: 2px solid rgba($theme,0.9);
    box-sizing: border-box;
    transform: rotate(45deg);
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      transform: rotate(-45deg) scale(1.4);
    }
  }
</style>
