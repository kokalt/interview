<template>
  <div v-if="query">
    <div class="mb-6">
      <p class="text-lg text-gray-600 dark:text-gray-400">
        搜索 "<span class="font-semibold text-gray-900 dark:text-gray-100">{{ query }}</span>"
        的结果，共找到 <span class="font-semibold text-primary-600">{{ results.length }}</span> 篇文章
      </p>
    </div>

    <ArticleList :articles="results" />
  </div>
</template>

<script setup lang="ts">
import type { ArticleMeta } from '~/composables/useArticles'

defineProps<{
  query: string
  results: ArticleMeta[]
}>()
</script>
