<template>
  <aside class="w-60 flex-shrink-0 hidden lg:block">
    <nav class="sticky top-20 space-y-1">
      <!-- Home link -->
      <NuxtLink
        to="/"
        class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
               text-gray-600 dark:text-gray-400
               hover:bg-gray-100 dark:hover:bg-gray-800
               transition-all duration-200"
        active-class="!text-primary-600 !bg-primary-50 dark:!text-primary-400 dark:!bg-primary-950/30"
      >
        <Icon name="material-symbols:home" class="w-5 h-5 flex-shrink-0" />
        <span>首页</span>
      </NuxtLink>

      <!-- Divider -->
      <div class="pt-4 pb-2">
        <h2 class="px-3 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
          分类导航
        </h2>
      </div>

      <!-- Category list -->
      <NuxtLink
        v-for="cat in categories"
        :key="cat.slug"
        :to="`/categories/${cat.slug}`"
        class="flex items-center gap-3 px-3 py-2 rounded-xl text-sm
               text-gray-600 dark:text-gray-400
               hover:bg-gray-100 dark:hover:bg-gray-800
               transition-all duration-200 group"
        active-class="!text-primary-600 !bg-primary-50 dark:!text-primary-400 dark:!bg-primary-950/30
                      border-l-2 border-primary-500"
      >
        <Icon :name="cat.icon" class="w-5 h-5 flex-shrink-0" />
        <span class="truncate">{{ cat.name }}</span>
      </NuxtLink>
    </nav>
  </aside>
</template>

<script setup lang="ts">
const { categories } = useCategoryMeta()
</script>
