import { computed, onMounted, ref } from 'vue'

import useSearch from './useSearch'
import { fetchResources } from '@/actions'

export default function useResources() {
  const resources = ref([])

  const getResources = async () => {
    resources.value = await fetchResources()
  }

  const hydrateResources = (resource, operation, selectResource) => {
    const index = resources.value.findIndex(r => r._id === resource._id)

    if (operation === 'update') {
      resources.value[index] = resource

      selectResource(resource)
    } else {
      resources.value.splice(index, 1)

      selectResource(resources.value[0] || null)
    }
  }

  onMounted(getResources)

  const resourcesLength = computed(() => resources.value.length)
  const hasResources = computed(() => resources.value.length > 0)

  const { searchedResources, setSearchQuery } = useSearch(resources)

  return {
    resources: searchedResources,
    hasResources,
    resourcesLength,
    getResources,
    setSearchQuery,
    hydrateResources
  }
}
