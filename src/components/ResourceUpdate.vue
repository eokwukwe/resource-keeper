<template>
  <div
    v-if="!resource"
    class="card"
  >
    <div class="card-body">
      <span class="text-muted">No resource is selected 🤷‍♀️</span>
    </div>
  </div>

  <resource-form
    v-else
    :alert="alert"
    :resource="resource"
    @on-form-submit="updateResource"
  />
</template>

<script>
  import { updateResourceApi } from "@/actions";
  import ResourceForm from "./ResourceForm";
  import alertMixin from "@/mixins/alert.mixin";

  export default {
    name: "ResourceUpdate",

    components: {
      ResourceForm,
    },

    props: {
      resource: {
        validator: (prop) => typeof prop === "object" || prop === null,
        required: true,
      },
    },

    mixins: [alertMixin],

    emits: ["on-resource-update"],

    beforeUnmount() {
      this.clearAlertTimeout();
    },

    watch: {
      resource(newResource, prevResource) {
        if (newResource?._id !== prevResource?._id) {
          this.clearAlertTimeout();
          this.alert = this.initAlert();
        }
        this.resourceToUpate = { ...newResource };
      },
    },

    methods: {
      async updateResource(resource) {
        try {
          const updated = await updateResourceApi(resource._id, resource);

          this.$emit("on-resource-update", updated);

          this.setAlert("success", "Resource was updated!");
        } catch (error) {
          this.setAlert("error", error);
        }
      },
    },
  };
</script>

<style>
</style>
