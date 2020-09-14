<template>
    <div class="row">
      <div class="col-md-6 order-md-2 mb-5">
        <h4 class="d-flex align-items-center mb-3">
          <span class="text-muted">Your Resources</span>
          <span class="badge badge-secondary count ml-2 mt-1">{{resourcesLength}}</span>
        </h4>

        <!-- {/* Resource Search Inputs */} -->
        <resource-search></resource-search>

        <!-- {/* Resource List */} -->
        <resource-list
          :resources="resources"
          @on-resource-click="selectResource"
          :activeId="activeResource?._id"
        />

        <!-- <button 
          @click="addResource" 
          class="btn btn-sm btn-primary text-uppercase"
        >
          add resource
        </button> -->
      </div>

      <!-- {/* Detail View Starts */} -->
      <div class="col-md-6 order-md-1">
        <h4 class="mb-3">
          Resource {{activeResource?._id}}

          <template v-if="hasResources">
            <button
              @click="toggleView"
              :class="`btn btn-sm text-uppercase mr-2 ${toggleBtnClass}`"
            >
              {{isDetailView ? 'update' : 'detail'}}
            </button>

            <resource-delete 
              :activeId="activeResource?._id"          @on-resource-delete="hydrateResources($event, 'delete'); !hasResources ? isDetailView = true : null"
            />
          </template>
        </h4>

        <resource-detail v-if="isDetailView" :resource="activeResource" />

        <resource-update 
          v-else :resource="activeResource" @on-resource-update="hydrateResources($event, 'update')" 
        />
      </div>
    </div>
</template>

<script>
import { fetchResources } from "@/actions";
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
      resources: [],
    };
  },

  async created() {
    const data = await fetchResources();
    this.resources = data;
  },

  computed: {
    resourcesLength() {
      return this.resources.length;
    },

    toggleBtnClass() {
      return this.isDetailView ? "btn-success" : "btn-info";
    },

    hasResources() {
      return this.resourcesLength > 0;
    },

    activeResource() {
      return (
        this.selectedResource || (this.hasResources && this.resources[0]) || null
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

    hydrateResources(newResource, operation) {
      const index = this.resources.findIndex((r) => r._id === newResource._id);
      
      if (operation === 'update') {
        this.resources[index] = newResource

        this.selectResource(newResource)
      } else {
        this.resources.splice(index, 1)

        this.selectResource(this.resources[0] || null)
      }
    },
  },
};
</script>

<style scoped lang="scss">
.count {
  font-size: 0.75rem !important;
}
</style>
