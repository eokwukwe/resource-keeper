<template>
  <div id="app">
    <resource-home></resource-home>
  </div>
</template>

<script>
import ResourceHome from "./pages/ResourceHome";

export default {
  name: "App",

  components: {
    ResourceHome,
  },
};
</script>

<style>
@import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
</style>
