<template>
  <div class="row">
    <div class="col-md-6 order-md-2 mb-5">
      <h4 class="d-flex align-items-center mb-3">
        <span class="text-muted">Your Resources</span>
        <span class="badge badge-secondary count ml-2 mt-1">{{resourcesLength}}</span>
      </h4>

      <!-- {/* Resource Search Inputs */} -->
      <resource-search @on-search="handleSearch" />

      <!-- {/* Resource List */} -->
      <resource-list
        :resources="resources"
        @on-resource-click="selectResource"
        :activeId="activeResource?._id"
      />
    </div>

    <!-- {/* Detail View Starts */} -->
    <div class="col-md-6 order-md-1">
      <h4 class="mb-3">
        Resource {{activeResource?._id}}
        <template v-if="hasResources">
          <button
            @click="toggleView"
            :class="`btn btn-sm text-uppercase mr-2 ${toggleBtnClass}`"
          >{{isDetailView ? 'update' : 'detail'}}</button>

          <resource-delete
            :activeId="activeResource?._id"
            @on-resource-delete="handleResourceChange($event, 'delete'); !hasResources ? isDetailView = true : null"
          />
        </template>
      </h4>

      <resource-detail
        v-if="isDetailView"
        :resource="activeResource"
      >
        <router-link
          class="text-capitalize btn btn-sm btn-outline-success"
          :to="{name: 'resourceDetailPage', params: {id: activeResource._id}}"
        >detail page</router-link>
      </resource-detail>

      <resource-update
        v-else
        :resource="activeResource"
        @on-resource-update="handleResourceChange($event, 'update')"
      />
    </div>
  </div>
</template>

<script>
  // import { searchResourcesApi } from "@/actions";

  import useResources from "@/composition/useResources";

  import ResourceList from "@/components/ResourceList";
  import ResourceSearch from "@/components/ResourceSearch";
  import ResourceUpdate from "@/components/ResourceUpdate";
  import ResourceDelete from "@/components/ResourceDelete";
  import ResourceDetail from "@/components/ResourceDetail";

  export default {
    name: "ResourceHome",

    components: {
      ResourceList,
      ResourceSearch,
      ResourceDetail,
      ResourceUpdate,
      ResourceDelete,
    },

    data() {
      return {
        isDetailView: true,
        selectedResource: null,
      };
    },

    setup() {
      return { ...useResources() };
    },

    computed: {
      toggleBtnClass() {
        return this.isDetailView ? "btn-success" : "btn-info";
      },

      activeResource() {
        return (
          this.selectedResource ||
          (this.hasResources && this.resources[0]) ||
          null
        );
      },
    },

    methods: {
      toggleView() {
        this.isDetailView = !this.isDetailView;
      },

      selectResource(resource) {
        this.selectedResource = resource;
      },

      handleResourceChange(newResource, operation) {
        this.hydrateResources(newResource, operation, this.selectResource);
      },

      async handleSearch(title) {
        if (!title) {
          this.getResources();
          return;
        }

        this.setSearchQuery(title);

        this.selectedResource = null;
      },
    },
  };
</script>

<style scoped lang="scss">
  .count {
    font-size: 0.75rem !important;
  }
</style>
