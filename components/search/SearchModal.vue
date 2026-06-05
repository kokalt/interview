<template>
  <Teleport to="body">
    <!-- Backdrop -->
    <div
      class="fixed inset-0 z-[80] bg-black/50 backdrop-blur-sm"
      @click="$emit('close')"
    />

    <!-- Modal -->
    <div class="fixed inset-0 z-[90] flex items-start justify-center pt-[15vh] px-4">
      <div class="w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-2xl
                  border border-gray-200 dark:border-gray-700 overflow-hidden
                  animate-scale-in">
        <!-- Search input -->
        <div class="flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <Icon name="material-symbols:search" class="w-5 h-5 text-gray-400 flex-shrink-0" />
          <input
            ref="inputRef"
            v-model="query"
            type="text"
            class="w-full bg-transparent border-none outline-none text-base
                   text-gray-900 dark:text-gray-100
                   placeholder-gray-400 dark:placeholder-gray-500"
            placeholder="搜索文章标题、描述、标签..."
            autocomplete="off"
            @input="onSearch"
          />
          <kbd
            class="hidden sm:block text-xs px-1.5 py-0.5 rounded
                   bg-gray-200 dark:bg-gray-800
                   text-gray-400 dark:text-gray-500"
          >
            ESC
          </kbd>
        </div>

        <!-- Results -->
        <div class="max-h-80 overflow-y-auto">
          <div v-if="isSearching" class="flex items-center justify-center py-10">
            <div class="w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
          </div>

          <div v-else-if="query && results.length === 0" class="flex flex-col items-center py-10 text-gray-400">
            <Icon name="material-symbols:search-off" class="w-10 h-10 mb-2" />
            <p class="text-sm">没有找到相关文章</p>
          </div>

          <template v-else-if="results.length > 0">
            <NuxtLink
              v-for="result in results"
              :key="result._path"
              :to="`/articles${result._path}`"
              class="flex flex-col gap-1 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800
                     transition-colors border-b border-gray-100 dark:border-gray-800
                     last:border-b-0"
              @click="$emit('close')"
            >
              <div class="flex items-center gap-2">
                <span class="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-1">
                  {{ result.title }}
                </span>
                <CategoryBadge :category="result.category" :show-icon="false" />
              </div>
              <p class="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                {{ result.description }}
              </p>
            </NuxtLink>
          </template>

          <!-- No query yet -->
          <div v-else class="flex flex-col items-center py-10 text-gray-400">
            <Icon name="material-symbols:search" class="w-10 h-10 mb-2 opacity-50" />
            <p class="text-sm">输入关键词搜索文章</p>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  close: []
}>()

const { query, results, isSearching, search, clear } = useSearch()
const inputRef = ref<HTMLInputElement>()

onMounted(() => {
  nextTick(() => inputRef.value?.focus())

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      emit('close')
    }
  }
  window.addEventListener('keydown', handleKeydown)
  onUnmounted(() => window.removeEventListener('keydown', handleKeydown))
})

let debounceTimer: ReturnType<typeof setTimeout>
function onSearch() {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    search(query.value)
  }, 200)
}

onUnmounted(() => clear())
</script>
