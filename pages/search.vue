<template>
  <div>
    <h1 class="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
      搜索文章
    </h1>

    <!-- Search input -->
    <div class="max-w-lg mb-8">
      <div class="flex items-center gap-3 px-4 py-3 rounded-xl
                  border border-gray-300 dark:border-gray-600
                  bg-white dark:bg-gray-900
                  focus-within:border-primary-400 dark:focus-within:border-primary-500
                  focus-within:ring-2 focus-within:ring-primary-100 dark:focus-within:ring-primary-900/30
                  transition-all duration-200">
        <Icon name="material-symbols:search" class="w-5 h-5 text-gray-400" />
        <input
          ref="inputRef"
          v-model="searchQuery"
          type="text"
          class="w-full bg-transparent border-none outline-none text-base
                 text-gray-900 dark:text-gray-100
                 placeholder-gray-400 dark:placeholder-gray-500"
          placeholder="输入关键词搜索..."
          autocomplete="off"
          @input="onSearch"
        />
      </div>
    </div>

    <!-- Loading -->
    <div v-if="isSearching" class="flex items-center justify-center py-20">
      <div class="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
    </div>

    <!-- Results -->
    <SearchResults
      v-else-if="searchQuery"
      :query="searchQuery"
      :results="results"
    />

    <!-- Empty state -->
    <div v-else class="flex flex-col items-center py-20 text-gray-400 dark:text-gray-500">
      <Icon name="material-symbols:search" class="w-16 h-16 mb-4 opacity-50" />
      <p class="text-lg">输入关键词开始搜索</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { query, results, isSearching, search } = useSearch()
const searchQuery = ref('')
const inputRef = ref<HTMLInputElement>()

// Get search query from URL
onMounted(() => {
  const q = route.query.q as string
  if (q) {
    searchQuery.value = q
    search(q)
  }
  nextTick(() => inputRef.value?.focus())
})

let debounceTimer: ReturnType<typeof setTimeout>
function onSearch() {
  // Update URL without reload
  const url = new URL(window.location.href)
  if (searchQuery.value) {
    url.searchParams.set('q', searchQuery.value)
  } else {
    url.searchParams.delete('q')
  }
  window.history.replaceState({}, '', url.toString())

  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    search(searchQuery.value)
  }, 200)
}
</script>
