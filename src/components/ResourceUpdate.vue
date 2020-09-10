<template>
  <form @submit.prevent="submitUpdate">
    <div v-if="alert?.success" class="alert alert-success">
      {{alert.success}}
    </div>
     
    <div v-if="alert?.error" class="alert alert-danger">
      {{alert.error}}
    </div>

    <div class="mb-3">
      <label for="title">Title</label>
      <input
        type="text"
        class="form-control form-control-sm"
        id="title"
        v-model="newResource.title"
        placeholder="How to survice in mountains"
      />
    </div>
    <div class="mb-3">
      <label for="description">Description</label>
      <textarea
        class="form-control form-control-sm"
        id="description"
        v-model="newResource.description"
        placeholder="Just some description"
      ></textarea>
    </div>
    <div class="mb-3">
      <label for="type">
        Resource Type
        <!-- <span class="text-muted">(Optional)</span> -->
      </label>
      <select class="form-control form-control-sm" id="type" v-model="newResource.type">
        <option
          v-for="(resourceType, i) in types"
          :key="i"
          :value="resourceType"
          class="text-capitalize"
        >{{resourceType}}</option>
      </select>
    </div>
    <div class="mb-3">
      <label for="link">Resource Link</label>
      <div class="input-group">
        <input
          type="text"
          class="form-control form-control-sm"
          id="link"
          v-model="newResource.link"
          placeholder="http://www.link.com"
        />
      </div>
    </div>
    <!-- <hr class="mb-4" /> -->
    <button type="submit" class="btn btn-primary btn-sm btn-block text-uppercase">update</button>
  </form>
</template>

<script>
import { updateResource } from "@/actions";

export default {
  name: "ResourceUpdate",

  props: {
    resource: {
      validator: (prop) => typeof prop === "object" || prop === null,
      required: true,
    },
  },

  data() {
    return {
      newResource: { ...this.resource },
      types: ["blog", "book", "video", "audio", "audio book"],
      alert: {
        success: null,
        error: null,
      },
    };
  },

  emits: ["on-resource-update"],

  watch: {
    resource(resource) {
      this.newResource = { ...resource };
    },
  },

  methods: {
    initAlert() {
      return { success: null, error: null };
    },
    setAlert(type, message) {
      this.alert = this.initAlert();
      this.alert[type] = message;

      setTimeout(() => {
        this.alert = this.initAlert()
      }, 5000)
    },
    async submitUpdate() {
      try {
        const updated = await updateResource(
          this.newResource._id,
          this.newResource
        );

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
