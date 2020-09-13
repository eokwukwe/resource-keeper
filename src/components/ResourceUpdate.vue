<template>
  <form @submit.prevent="submitUpdate">
    <div v-if="alert?.success" class="alert alert-success">{{alert.success}}</div>

    <div v-if="alert?.error" class="alert alert-danger">{{alert.error}}</div>

    <div class="mb-3">
      <label for="title">Title</label>
      <input
        type="text"
        class="form-control form-control-sm"
        id="title"
        v-model="resourceToUpate.title"
        placeholder="How to survice in mountains"
      />
    </div>
    <div class="mb-3">
      <label for="description">Description</label>
      <textarea
        class="form-control form-control-sm"
        id="description"
        v-model="resourceToUpate.description"
        placeholder="Just some description"
      ></textarea>
    </div>
    <div class="mb-3">
      <label for="type">
        Resource Type
        <!-- <span class="text-muted">(Optional)</span> -->
      </label>
      <select class="form-control form-control-sm" id="type" v-model="resourceToUpate.type">
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
          v-model="resourceToUpate.link"
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
import alertMixin from '@/mixins/alert.mixin'

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
      resourceToUpate: { ...this.resource },
      types: ["blog", "book", "video", "audio", "audio book"],
    };
  },

  mixins: [alertMixin],

  emits: ["on-resource-update"],

  beforeUnmount() {
    this.clearAlertTimeout();
  },

  watch: {
    resource(newResource, prevResource) {
      if (newResource && newResource._id !== prevResource._id) {
        this.clearAlertTimeout();
        this.alert = this.initAlert();
      }
      this.resourceToUpate = { ...newResource };
    },
  },

  methods: {
    async submitUpdate() {
      try {
        const updated = await updateResource(
          this.resourceToUpate._id,
          this.resourceToUpate
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
