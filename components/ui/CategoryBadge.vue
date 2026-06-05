<template>
  <NuxtLink
    :to="`/categories/${category}`"
    class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium
           transition-all duration-200 hover:scale-105"
    :class="badgeClass"
  >
    <Icon v-if="showIcon" :name="icon" class="w-3.5 h-3.5" />
    <span>{{ label }}</span>
  </NuxtLink>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  category: string
  showIcon?: boolean
}>(), {
  showIcon: true,
})

const { getCategoryName, getCategoryIcon, getCategory } = useCategoryMeta()

const meta = computed(() => getCategory(props.category))
const label = computed(() => getCategoryName(props.category))
const icon = computed(() => getCategoryIcon(props.category))
const badgeClass = computed(() => meta.value?.badge ?? 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300')
</script>
