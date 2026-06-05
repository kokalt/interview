<template>
  <header class="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800
                  bg-white/80 dark:bg-gray-950/80 backdrop-blur-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-14">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2 group">
          <span class="text-xl font-bold gradient-text">前端面试</span>
          <span class="hidden sm:inline text-sm text-gray-500 dark:text-gray-400
                         group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
            知识体系
          </span>
        </NuxtLink>

        <!-- Right actions -->
        <div class="flex items-center gap-1">
          <!-- Search button -->
          <button
            class="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm
                   text-gray-500 dark:text-gray-400
                   border border-gray-200 dark:border-gray-700
                   hover:border-gray-300 dark:hover:border-gray-600
                   bg-gray-50 dark:bg-gray-800/50
                   transition-all duration-200 min-w-[200px]"
            @click="showSearch = true"
          >
            <Icon name="material-symbols:search" class="w-4 h-4" />
            <span>搜索文章...</span>
            <kbd class="ml-auto text-xs px-1.5 py-0.5 rounded
                       bg-gray-200 dark:bg-gray-700
                       text-gray-500 dark:text-gray-400">
              Ctrl+K
            </kbd>
          </button>

          <!-- Mobile search button -->
          <button
            class="sm:hidden w-9 h-9 rounded-lg flex items-center justify-center
                   hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="搜索"
            @click="showSearch = true"
          >
            <Icon name="material-symbols:search" class="w-5 h-5" />
          </button>

          <!-- Theme toggle -->
          <ThemeToggle />

          <!-- Mobile menu button -->
          <button
            class="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center
                   hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="菜单"
            @click="emit('toggle-mobile-nav')"
          >
            <Icon name="material-symbols:menu" class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>

    <!-- Search Modal -->
    <SearchModal v-if="showSearch" @close="showSearch = false" />
  </header>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  'toggle-mobile-nav': []
}>()

const showSearch = ref(false)

// Global keyboard shortcut
onMounted(() => {
  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      showSearch.value = !showSearch.value
    }
  }
  window.addEventListener('keydown', handleKeydown)
  onUnmounted(() => window.removeEventListener('keydown', handleKeydown))
})
</script>
