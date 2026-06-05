<template>
  <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium" :class="badgeClass">
    <span class="w-1.5 h-1.5 rounded-full" :class="dotClass" />
    {{ label }}
  </span>
</template>

<script setup lang="ts">
const props = defineProps<{
  difficulty: 'easy' | 'medium' | 'hard'
}>()

const config = computed(() => {
  switch (props.difficulty) {
    case 'easy':
      return {
        label: '简单',
        badgeClass: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
        dotClass: 'bg-green-500',
      }
    case 'medium':
      return {
        label: '中等',
        badgeClass: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
        dotClass: 'bg-yellow-500',
      }
    case 'hard':
      return {
        label: '困难',
        badgeClass: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
        dotClass: 'bg-red-500',
      }
  }
})

const { label, badgeClass, dotClass } = computed(() => config.value)
</script>
