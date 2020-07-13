<template>
  <div class="u-comment">
    <div class="u-user">
      <div class="u-avatar">
        <slot name="avatar"></slot>
      </div>
      <div class="u-user-info">
        <slot name="info"></slot>
      </div>
    </div>
    <div class="u-comment__container">
      <div class="u-comment__header">
        <div class="u-comment--left">
          <slot name="title"></slot>
        </div>
        <div class="u-comment--right">
          <slot name="ext"></slot>
        </div>
      </div>
      <div class="u-comment__content">
        <slot name="content"></slot>
      </div>
      <div class="u-comment__footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {}
  },
  methods: {}
}
</script>
