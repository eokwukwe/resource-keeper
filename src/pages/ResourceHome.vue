<template>
  <div class="container pb-5">
    <resource-header></resource-header>

    <div class="row">
      <div class="col-md-6 order-md-2 mb-sm-5">
        <h4 class="d-flex align-items-center mb-3">
          <span class="text-muted">Your Resources</span>
          <span class="badge badge-secondary badge-pill ml-2">{{resourcesLength}}</span>
        </h4>

        <!-- {/* Resource Search Inputs */} -->
        <resource-search></resource-search>

        <!-- {/* Resource List */} -->
        <resource-list
          :resources="resources"
          @on-resource-click="selectResource"
          :activeId="activeResource?._id"
        />

        <button @click="addResource" class="btn btn-sm btn-primary text-uppercase">add resource</button>
      </div>

      <!-- {/* Detail View Starts */} -->
      <div class="col-md-6 order-md-1">
        <h4 class="mb-3">
          Resource {{activeResource?._id}}
          <button
            @click="toggleView"
            :class="`btn btn-sm text-uppercase ${toggleBtnClass}`"
          >{{isDetailView ? 'update' : 'detail'}}</button>
        </h4>
        <resource-detail v-if="isDetailView" :resource="activeResource" />
        <resource-update v-else></resource-update>
      </div>
    </div>
  </div>
</template>

<script>
import ResourceList from "@/components/ResourceList";
import ResourceHeader from "@/components/ResourceHeader";
import ResourceSearch from "@/components/ResourceSearch";
import ResourceUpdate from "@/components/ResourceUpdate";
import ResourceDetail from "@/components/ResourceDetail";

export default {
  name: "ResourceHome",

  components: {
    ResourceList,
    ResourceHeader,
    ResourceSearch,
    ResourceDetail,
    ResourceUpdate,
  },

  data() {
    return {
      isDetailView: true,
      selectedResource: null,
      resources: [
        {
          _id: "1",
          title: "resource one title",
          description: "resource one description",
          type: "book",
          link: "",
        },
        {
          _id: "2",
          title: "resource two title",
          description: "resource two description",
          type: "video",
          link: "",
        },
        {
          _id: "3",
          title: "resource three title",
          description: "resource three description",
          type: "audio book",
          link: "",
        },
      ],
    };
  },

  computed: {
    resourcesLength() {
      return this.resources.length;
    },

    toggleBtnClass() {
      return this.isDetailView ? "btn-success" : "btn-info";
    },

    hasResource() {
      return this.resourcesLength > 0;
    },

    activeResource() {
      return (
        this.selectedResource || (this.hasResource && this.resources[0]) || null
      );
    },
  },

  methods: {
    toggleView() {
      this.isDetailView = !this.isDetailView;
    },

    addResource() {
      const _id = `_${Math.random().toString(36).slice(2)}`;
      const type = ["book", "blog", "video", "audo book"][
        Math.floor(Math.random() * 4)
      ];
      const newResource = {
        _id,
        type,
        title: `Resource ${_id} title`,
        description: `Resource ${_id} description`,
        link: "",
      };

      this.resources.push(newResource);
    },

    selectResource(resource) {
      this.selectedResource = resource;
    },
  },
};
</script>

<style>
</style>
