<template>
  <ul class="list-group resource-list mb-3">
    <li
      v-for="resource in resources"
      :key="resource._id"
      @click="onResourceClick(resource)"
      :class="`list-group-item d-flex justify-content-between lh-condensed resource-list-item ${activeItemClass(resource)}`"
    >
      <div>
        <h6 class="my-0 text-capitalize">{{resource.title}}</h6>
        <small class="text-muted">{{resource.description}}</small>
      </div>
      <span class="text-muted">{{resource.type}}</span>
    </li>
  </ul>
</template>

<script>
export default {
  name: "ResourceList",

  props: {
    resources: {
      type: Array,
      required: true,
      default: () => [],
    },
    activeId: {
      validator: (prop) => typeof prop === "string" || prop === undefined,
      required: true,
    },
  },

  emit: ["on-resource-click"],

  methods: {
    onResourceClick(resource) {
      this.$emit("on-resource-click", resource);
    },
    activeItemClass(resource) {
      return resource._id === this.activeId ? "is-active" : "";
    },
  },
};
</script>

<style lang="scss" scoped>
.resource-list {
  max-height: 200px;
  overflow-y: auto;

  &-item {
    cursor: pointer;

    &:hover {
      background-color: #f3f3f3;
    }
  }
}

.is-active {
  background-color: #f3f3f3;
}
</style>

