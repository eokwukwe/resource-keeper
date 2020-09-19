import { computed, ref } from 'vue'

export default function useSearch(resources) {
  const searchQuery = ref('')

  const setSearchQuery = value => (searchQuery.value = value)

  const searchedResources = computed(() => {
    if (!searchQuery.value) {
      return resources.value
    }

    const searchTerm = searchQuery.value.toLocaleLowerCase()

    return resources.value.filter(resource =>
      resource.title.toLocaleLowerCase().includes(searchTerm)
    )
  })

  return {
    setSearchQuery,
    searchedResources
  }
}
