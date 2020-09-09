<template>
  <form>
    <div class="mb-3">
      <label for="firstName">Title</label>
      <input
        type="text"
        class="form-control form-control-sm"
        id="firstName"
        placeholder="How to survice in mountains"
      />
    </div>
    <div class="mb-3">
      <label for="email">
        Description
        <span class="text-muted">(Optional)</span>
      </label>
      <input
        type="email"
        class="form-control form-control-sm"
        id="email"
        placeholder="Very interesting book"
      />
    </div>
    <div class="mb-3">
      <label for="description">Description</label>
      <textarea
        class="form-control form-control-sm"
        id="description"
        placeholder="Just some description"
      ></textarea>
    </div>
    <div class="mb-3">
      <label for="username">Resource Link</label>
      <div class="input-group">
        <input
          type="text"
          class="form-control form-control-sm"
          id="username"
          placeholder="Username"
        />
      </div>
    </div>
    <!-- <hr class="mb-4" /> -->
    <button class="btn btn-primary btn-sm btn-block text-uppercase" type="submit">Submit</button>
  </form>
</template>

<script>
export default {
  name: "ResourceUpdate",
};
</script>

<style>
</style>
