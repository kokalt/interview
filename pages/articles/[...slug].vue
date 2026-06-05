<template>
  <div>
    <ArticleContent v-if="article" :article="article" />
    <div v-else-if="pending" class="animate-fade-in space-y-4 animate-pulse">
      <div class="h-48 sm:h-64 bg-gray-200 dark:bg-gray-800 rounded-2xl" />
      <div class="h-10 bg-gray-200 dark:bg-gray-800 rounded-lg w-3/4" />
      <div class="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/3" />
      <div class="space-y-2">
        <div class="h-4 bg-gray-200 dark:bg-gray-800 rounded" />
        <div class="h-4 bg-gray-200 dark:bg-gray-800 rounded" />
        <div class="h-4 bg-gray-200 dark:bg-gray-800 rounded w-2/3" />
      </div>
    </div>
    <div v-else class="flex flex-col items-center py-20 text-gray-400 dark:text-gray-500">
      <Icon name="material-symbols:error-outline" class="w-16 h-16 mb-4" />
      <p class="text-lg">文章不存在</p>
      <NuxtLink to="/" class="text-sm text-primary-500 hover:text-primary-600 mt-2">
        返回首页
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'article',
})

const route = useRoute()
const slug = (route.params.slug as string[]).join('/')
const { article, pending } = await useArticle(slug)

// SEO meta
useSeoMeta({
  title: article.value?.title ?? '文章详情',
  description: article.value?.description ?? '',
  ogTitle: article.value?.title,
  ogDescription: article.value?.description,
})
</script>
