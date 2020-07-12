<template>
  <div class="u-comment" v-if="data">
    <div class="u-user">
      <div class="u-avatar">
        <slot name="avatar" :data="data">
          <el-avatar :size="45" :src="data.avatar">
          </el-avatar>
        </slot>
      </div>
      <div class="u-user-info">
        <slot name="info" :data="data">
          <span>{{data.nickName}}</span>
          <span>[{{data.userId}}]</span>
        </slot>
      </div>
    </div>
    <div class="u-container">
      <div class="u-comment-header">
        <div class="u-left">
          <slot name="title" :data="data">
            {{data.title}}
          </slot>
        </div>
        <div class="u-right">
          <slot name="ext" :data="data"></slot>
        </div>
      </div>
      <div class="u-comment-content">
        <slot name="content" :data="data"></slot>
      </div>
      <div class="u-comment-footer">
        <slot name="footer" :data="data"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  props: {
    data: {
      type: Object,
      default: () => {
        return null
      }
    }
  },
  data () {
    return {}
  },
  methods: {}
}
</script>
