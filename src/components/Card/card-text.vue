<template>
    <div class="u-card-text">
        <h3>测试</h3>
        <p>殷其雷，天阴霾，雨零耶，盼君留。 殷其雷，纵不零，卿若留，吾将</p>
        <div class="u-card-text--meta">
            <span class="u-card-text--meta__label">说说</span>
            <span class="u-card-text--meta__date">1天前</span>
        </div>
    </div>
</template>

<script>
export default {
  name: 'card-text',
  data () {
    return {}
  },
  methods: {}
}
</script>
<style lang="scss">
    .u-card-text{
        padding: 20px 25px;
        margin: 10px 20px;
        background: #F8F8F8;
        border-radius: 6px;
        box-shadow: 2px 2px 20px #ccc;
        width: 320px;
        h3{
            color: #00a680;
            background-color: transparent;
            text-decoration: none;
            outline: none;
            cursor: pointer;
            transition: color .3s;
        }
        p{
            margin-top: 10PX;
            font-size: 14px;
            line-height: 22px;
            color: #333;
        }
        &--meta{
            margin-top: 5px;
            display: flex;
            justify-content: space-between;
            color: #777;
            font-size: 12px;
            text-overflow: ellipsis;
            word-break: break-all;
            &__label{

            }
            &__date{

            }
        }
    }
</style>
