<template>
  <div id="app" :class="[`${prefix}root`]">
    <div id="nav">
      <router-link to="/">Home</router-link> |
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
  @import "style/index";
</style>
