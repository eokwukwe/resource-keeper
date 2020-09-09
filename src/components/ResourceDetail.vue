<template>
  <div v-if="!resource" class="card">
    <div class="card-body">
      <span class="text-muted">No resource is selected 🤷‍♀️</span>
    </div>
  </div>

  <div v-else class="card">
    <div class="card-header text-capitalize">{{resource.title}}</div>
    <div class="card-body">
      <blockquote class="blockquote mb-0">
        <p>{{resource.description}}</p>
        <footer class="badge badge-secondary text-lowercase mb-3 type">{{resource.type}}</footer>
      </blockquote>
      <a href="#" class="btn btn-sm btn-primary btn-block w-50 text-uppercase">Edit</a>
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
