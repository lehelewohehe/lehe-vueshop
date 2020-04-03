<template>
  <div>
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
<script>
export default {

}
</script>
<style>
@import './assets/css/common/public.css';
</style>
