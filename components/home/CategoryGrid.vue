<template>
  <section id="categories" class="mb-12">
    <div class="flex items-center gap-3 mb-6">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100">分类导航</h2>
      <span class="text-sm text-gray-400 dark:text-gray-500">
        {{ categories.length }} 个分类
      </span>
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      <NuxtLink
        v-for="(cat, index) in categories"
        :key="cat.slug"
        :to="`/categories/${cat.slug}`"
        class="card card-hover group flex flex-col items-center gap-2 p-4 text-center
               stagger-enter-active"
        :style="{ animationDelay: `${index * 40}ms` }"
      >
        <div
          class="w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center
                 group-hover:scale-110 transition-transform duration-300"
          :class="cat.gradient"
        >
          <Icon :name="cat.icon" class="w-5 h-5 text-white" />
        </div>
        <span class="text-xs font-medium text-gray-600 dark:text-gray-400
                     group-hover:text-gray-900 dark:group-hover:text-gray-200
                     transition-colors line-clamp-1">
          {{ cat.name }}
        </span>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
const { categories } = useCategoryMeta()
</script>
