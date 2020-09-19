<template>
  <!-- {/* Resource Search Inputs Starts */} -->
  <form class="card p-2">
    <div class="input-group">
      <input
        @keyup="$emit('on-search', $event.target.value)"
        type="text"
        class="form-control form-control-sm"
        placeholder="Some title"
      />
    </div>
  </form>
  <!-- {/* Resource Search Inputs Ends */} -->
</template>

<script>
  export default {
    name: "ResourceSearch",

    emits: ["on-search"],
  };
</script>

<style>
</style>
