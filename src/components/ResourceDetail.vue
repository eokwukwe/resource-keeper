<template>
  <div
    v-if="!resource"
    class="card"
  >
    <div class="card-body">
      <span class="text-muted">No resource is selected 🤷‍♀️</span>
    </div>
  </div>

  <div
    v-else
    class="card"
  >
    <div class="card-header text-capitalize">{{resource.title}}</div>
    <div class="card-body">
      <blockquote class="blockquote mb-0">
        <p>{{resource.description}}</p>
        <footer
          class="badge badge-secondary text-lowercase mb-3 type"
        >{{resource.type}}</footer>
      </blockquote>
      <div class="d-flex justify-content-between align-items-center">
        <a
          target="_blank"
          :href="resource.link"
          class="btn btn-sm btn-outline-info text-capitalize"
        >
          Resource Link
        </a>

        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ResourceDetail",

    props: {
      resource: {
        validator: (prop) => typeof prop === "object" || prop === null,
        required: true,
      },
    },
  };
</script>

<style  lang="scss" scoped>
  .type {
    font-size: 0.75rem !important;
  }
</style>
