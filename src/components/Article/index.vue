<template>
  <div class="u-article">
    <div class="u-article__cover" :style="`--cover: url('${cover}')`">
    </div>
    <div class="u-article__container">
      <div class="u-article__header">
        <div class="u-article--left">
          <slot name="title"></slot>
        </div>
        <div class="u-article--right">
          <slot name="ext"></slot>
        </div>
      </div>
      <div class="u-article__content">
        <slot name="content"></slot>
      </div>
      <div class="u-article__footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  props: {
    cover: {
      type: String,
      default: ''
    }
  },
  data () {
    return {}
  },
  methods: {}
}
</script>
