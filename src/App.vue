<template>
  <div id="app" class="container pb-5">
    <resource-header />
    <router-view />
  </div>
</template>

<script>
import ResourceHeader from '@/components/ResourceHeader'


export default {
  name: "App",

  components: {
    ResourceHeader
  }
};
</script>

<style>
@import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
</style>
