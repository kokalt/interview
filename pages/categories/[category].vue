<template>
  <div>
    <!-- Category header -->
    <div v-if="meta" class="mb-8">
      <div class="flex items-center gap-4 mb-4">
        <div
          class="w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center"
          :class="meta.gradient"
        >
          <Icon :name="meta.icon" class="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">{{ meta.name }}</h1>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{{ meta.description }}</p>
        </div>
      </div>
      <p class="text-sm text-gray-400 dark:text-gray-500">
        共 {{ articles.length }} 篇文章
      </p>
    </div>

    <!-- Loading -->
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
    <ArticleList v-else :articles="articles" />

    <!-- Empty -->
    <div v-if="!pending && articles.length === 0" class="flex flex-col items-center py-20 text-gray-400 dark:text-gray-500">
      <Icon name="material-symbols:article-outline" class="w-16 h-16 mb-4" />
      <p class="text-lg">该分类暂无文章</p>
      <NuxtLink to="/" class="text-sm text-primary-500 hover:text-primary-600 mt-2">
        返回首页
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const category = route.params.category as string
const { categories, getCategory } = useCategoryMeta()
const { articles, pending } = await useCategoryArticles(category)

const meta = computed(() => getCategory(category))

// SEO meta
useSeoMeta({
  title: meta.value?.name ?? category,
  description: meta.value?.description ?? '',
})

// Validate category
const validCategories = categories.map(c => c.slug)
if (!validCategories.includes(category)) {
  throw createError({
    statusCode: 404,
    message: `分类 "${category}" 不存在`,
  })
}
</script>
