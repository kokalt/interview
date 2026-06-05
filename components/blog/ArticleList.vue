<template>
  <div v-if="articles.length" class="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
    <div
      v-for="(article, index) in articles"
      :key="article._path"
      class="stagger-enter-active"
      :style="{ animationDelay: `${index * 60}ms` }"
    >
      <ArticleCard :article="article" />
    </div>
  </div>

  <!-- Empty state -->
  <div v-else class="flex flex-col items-center justify-center py-20 text-gray-400 dark:text-gray-500">
    <Icon name="material-symbols:article-outline" class="w-16 h-16 mb-4" />
    <p class="text-lg">暂无文章</p>
  </div>
</template>

<script setup lang="ts">
import type { ArticleMeta } from '~/composables/useArticles'

defineProps<{
  articles: ArticleMeta[]
}>()
</script>
