<template>
  <div class="container">
    <resource-header></resource-header>

    <div class="row">
      <div class="col-md-4 order-md-2 mb-4">
        <h4 class="d-flex justify-content-between align-items-center mb-3">
          <span class="text-muted">Your Resources</span>
          <span class="badge badge-secondary badge-pill">6</span>
        </h4>

        <!-- {/* Resource Search Inputs */} -->
        <resource-search></resource-search>

        <!-- {/* Resource List */} -->
        <resource-list></resource-list>
      </div>

      <!-- {/* Resource Update Form */} -->
      <!-- <div class="col-md-8 order-md-1">
        <h4 class="mb-3">Resource</h4>
        <resource-update></resource-update>
      </div> -->

      <!-- {/* Detail View Starts */} -->
      <div class="col-md-8 order-md-1">
        <h4 class="mb-3">Resource</h4>
        <resource-detail></resource-detail>
      </div>
    </div>
  </div>
</template>

<script>
import ResourceList from "@/components/ResourceList";
import ResourceHeader from "@/components/ResourceHeader";
import ResourceSearch from "@/components/ResourceSearch";
// import ResourceUpdate from "@/components/ResourceUpdate";
import ResourceDetail from "@/components/ResourceDetail";

export default {
  name: "ResourceHome",

  components: {
    ResourceList,
    ResourceHeader,
    ResourceSearch,
    ResourceDetail,
    // ResourceUpdate,
  },
};
</script>

<style>
</style>
