<template>
  <section class="mb-12">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100">最新文章</h2>
      <NuxtLink
        to="/search"
        class="text-sm text-primary-500 hover:text-primary-600 transition-colors"
      >
        查看全部 →
      </NuxtLink>
    </div>

    <!-- Loading skeleton -->
    <div v-if="pending" class="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      <div
        v-for="i in 6"
        :key="i"
        class="card p-5 animate-pulse space-y-3"
      >
        <div class="h-1 bg-gray-200 dark:bg-gray-700 rounded" />
        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
        <div class="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>
    </div>

    <!-- Articles -->
    <ArticleList v-else :articles="featuredArticles" />
  </section>
</template>

<script setup lang="ts">
import type { ArticleMeta } from '~/composables/useArticles'

const { articles, pending } = await useArticlesQuery()

const featuredArticles = computed<ArticleMeta[]>(() => {
  return (articles.value ?? []).slice(0, 6)
})
</script>
