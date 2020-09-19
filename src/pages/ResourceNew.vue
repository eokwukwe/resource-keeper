<template>
  <div class="row justify-content-md-center">
    <div class="col-md-8 col-lg-6">
      <resource-form
        :alert="alert"
        :resource="resource"
        @on-form-submit="createResource"
      />
    </div>
  </div>
</template>

<script>
  import { createResourceApi } from "@/actions";
  import ResourceForm from "@/components/ResourceForm";
  import alertMixin from "@/mixins/alert.mixin";

  export default {
    name: "ResourceNew",

    components: {
      ResourceForm,
    },

    data() {
      return {
        resource: {
          title: "",
          description: "",
          type: "",
          link: "",
        },
      };
    },

    mixins: [alertMixin],

    beforeUnmount() {
      this.clearAlertTimeout();
    },

    methods: {
      async createResource(resource) {
        try {
          await createResourceApi(resource);

          this.setAlert("success", "Resource was create!");

          this.$router.push({ name: "resourceHomePage" });
        } catch (error) {
          this.setAlert("error", error);
        }
      },
    },
  };
</script>

<style>
</style>
