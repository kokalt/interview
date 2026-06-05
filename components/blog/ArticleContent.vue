<template>
  <div v-if="article" class="animate-fade-in">
    <!-- Cover image -->
    <img
      v-if="article.image"
      :src="article.image"
      :alt="article.title"
      class="w-full h-48 sm:h-64 object-cover rounded-2xl mb-6 shadow-md"
    />

    <!-- Title -->
    <h1 class="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-4">
      {{ article.title }}
    </h1>

    <!-- Meta bar -->
    <div class="flex items-center gap-3 mb-8 flex-wrap">
      <CategoryBadge :category="article.category" />
      <DifficultyBadge :difficulty="article.difficulty ?? 'medium'" />
      <span class="text-sm text-gray-400 dark:text-gray-500">
        {{ formattedDate }}
      </span>
    </div>

    <!-- Description -->
    <div
      v-if="article.description"
      class="p-4 mb-8 rounded-xl bg-primary-50/50 dark:bg-primary-950/20
             border-l-4 border-primary-400 text-gray-600 dark:text-gray-300 text-sm leading-relaxed"
    >
      {{ article.description }}
    </div>

    <!-- Article body -->
    <div class="prose dark:prose-invert article-prose">
      <ContentRenderer v-if="article.body" :value="article" />
      <slot v-else />
    </div>

    <!-- Tags -->
    <div v-if="article.tags?.length" class="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
      <div class="flex items-center gap-2 flex-wrap">
        <span class="text-sm text-gray-400 dark:text-gray-500">标签：</span>
        <span
          v-for="tag in article.tags"
          :key="tag"
          class="text-sm px-3 py-1 rounded-full
                 bg-gray-100 text-gray-600
                 dark:bg-gray-800 dark:text-gray-300
                 hover:bg-primary-100 hover:text-primary-700
                 dark:hover:bg-primary-900/30 dark:hover:text-primary-400
                 transition-colors cursor-default"
        >
          #{{ tag }}
        </span>
      </div>
    </div>
  </div>

  <!-- Loading skeleton -->
  <div v-else class="space-y-4 animate-pulse">
    <div class="h-48 sm:h-64 bg-gray-200 dark:bg-gray-800 rounded-2xl" />
    <div class="h-10 bg-gray-200 dark:bg-gray-800 rounded-lg w-3/4" />
    <div class="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/3" />
    <div class="space-y-2">
      <div class="h-4 bg-gray-200 dark:bg-gray-800 rounded" />
      <div class="h-4 bg-gray-200 dark:bg-gray-800 rounded" />
      <div class="h-4 bg-gray-200 dark:bg-gray-800 rounded w-2/3" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  article: any
}>()

const formattedDate = computed(() => {
  if (!props.article?.date) return ''
  try {
    return new Date(props.article.date).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return props.article.date
  }
})
</script>
