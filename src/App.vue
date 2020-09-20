<template>
  <div id="teleportContent"></div>
  <div :class="`resource-app ${theme}`">
    <div
      class="container pb-5"
    >
      <resource-header />
      <router-view />
    </div>
  </div>
</template>

<script>
  import ResourceHeader from "@/components/ResourceHeader";

  export default {
    name: "App",

    components: {
      ResourceHeader,
    },

    data() {
      return {
        settings: this.getSettings(),
      };
    },

    provide() {
      return {
        getTheme: () => this.theme,
        setSettings: (settings) => (this.settings = settings),
      };
    },

    computed: {
      theme() {
        return this.settings?.theme ? this.settings.theme : "";
      },
    },

    methods: {
      getSettings() {
        const settings = localStorage.getItem("resource-settings");

        return settings ? JSON.parse(settings) : {};
      },
    },
  };
</script>

<style>
  @import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

  .resource-app.dark {
    background-color: #3a3939;
    min-height: 100vh;
    color: white;
  }
</style>
