<template>
  <div class="row justify-content-md-center">
    <div class="col-md-8 col-lg-6">
      <resource-detail :resource="resource">
        <button
          class="text-capitalize btn btn-sm btn-outline-success"
          @click="$router.go(-1)"
        >Back home</button>
      </resource-detail>
    </div>
  </div>
</template>


<script>
  import { fetchResourceByIdApi } from "@/actions";
  import ResourceDetail from "@/components/ResourceDetail";

  export default {
    name: "ResourceDetailPage",

    components: { ResourceDetail },
    data() {
      return {
        resource: null,
      };
    },

    async created() {
      const { id } = this.$route.params;
      this.resource = await fetchResourceByIdApi(id);
    },
  };
</script>

<style>
</style>
