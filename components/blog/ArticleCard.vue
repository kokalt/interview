<template>
  <NuxtLink
    :to="`/articles${article._path}`"
    class="card card-hover group flex flex-col overflow-hidden"
  >
    <!-- Difficulty stripe -->
    <div
      class="h-1 w-full"
      :class="difficultyColor"
    />

    <div class="p-5 flex-1 flex flex-col gap-3">
      <!-- Meta row: category + difficulty + date -->
      <div class="flex items-center gap-2 flex-wrap">
        <CategoryBadge :category="article.category" :show-icon="false" />
        <DifficultyBadge :difficulty="article.difficulty ?? 'medium'" />
        <span class="text-xs text-gray-400 dark:text-gray-500 ml-auto">
          {{ formattedDate }}
        </span>
      </div>

      <!-- Title -->
      <h3 class="text-base font-semibold text-gray-900 dark:text-gray-100
                 group-hover:text-primary-600 dark:group-hover:text-primary-400
                 transition-colors line-clamp-2 leading-snug">
        {{ article.title }}
      </h3>

      <!-- Description -->
      <p class="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
        {{ article.description }}
      </p>

      <!-- Tags -->
      <div v-if="article.tags?.length" class="flex items-center gap-1.5 flex-wrap mt-auto pt-2">
        <span
          v-for="tag in article.tags.slice(0, 3)"
          :key="tag"
          class="text-xs px-2 py-0.5 rounded-full
                 bg-gray-100 text-gray-500
                 dark:bg-gray-800 dark:text-gray-400"
        >
          {{ tag }}
        </span>
        <span
          v-if="article.tags.length > 3"
          class="text-xs text-gray-400 dark:text-gray-500"
        >
          +{{ article.tags.length - 3 }}
        </span>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { ArticleMeta } from '~/composables/useArticles'

const props = defineProps<{
  article: ArticleMeta
}>()

const formattedDate = computed(() => {
  try {
    return new Date(props.article.date).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
  } catch {
    return props.article.date
  }
})

const difficultyColor = computed(() => {
  switch (props.article.difficulty) {
    case 'easy': return 'bg-green-400'
    case 'medium': return 'bg-yellow-400'
    case 'hard': return 'bg-red-400'
    default: return 'bg-gray-300 dark:bg-gray-600'
  }
})
</script>
