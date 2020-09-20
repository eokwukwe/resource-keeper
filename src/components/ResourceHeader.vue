<template>
  <div class="pt-3 pb-2 mb-4 text-center">
    <div class="user-container">
      <suspense>
        <template #default>
          <user-panel />
        </template>
        <template #fallback>Loading....</template>
      </suspense>
    </div>

    <div class="mx-auto">
      <img
        height="85"
        width="85"
        src="../assets/logo.png"
        alt
      />
    </div>

    <h2>Keep Resources</h2>
    <p class="lead">Keep your resources in one place</p>

    <router-link
      :to="{name: 'resourceHomePage'}"
      class="btn btn-outline-primary mr-2"
    >Home</router-link>

    <router-link
      :to="{name: 'resourceNewPage'}"
      class="btn btn-outline-primary"
    >New</router-link>
  </div>
</template>

<script>
import UserPanel from '@/components/UserPanel'

  export default {
    name: "ResourceHeader",

     components: { UserPanel }
  };
</script>

<style scoped>
  .user-container {
    padding: 5px;
    font-weight: bold;
    font-size: 20px;
    background-color: #ffd16c;
  }
</style>
