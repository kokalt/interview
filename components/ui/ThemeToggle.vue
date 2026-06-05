<template>
  <button
    class="relative w-9 h-9 rounded-lg flex items-center justify-center
           hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors
           focus:outline-none focus:ring-2 focus:ring-primary-400"
    :aria-label="isDark ? '切换亮色模式' : '切换暗色模式'"
    @click="toggle"
  >
    <Icon
      :name="isDark ? 'material-symbols:dark-mode' : 'material-symbols:light-mode'"
      class="w-5 h-5 text-gray-700 dark:text-yellow-300 transition-transform duration-300"
      :class="{ 'rotate-180 scale-0': isDark, 'rotate-0 scale-100': !isDark }"
    />
    <Icon
      :name="isDark ? 'material-symbols:dark-mode' : 'material-symbols:light-mode'"
      class="absolute w-5 h-5 text-yellow-400 dark:text-gray-400 transition-transform duration-300"
      :class="{ 'rotate-0 scale-100': isDark, '-rotate-180 scale-0': !isDark }"
    />
  </button>
</template>

<script setup lang="ts">
const { isDark, toggle } = useTheme()
</script>
