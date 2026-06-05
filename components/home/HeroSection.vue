<template>
  <section class="relative mb-12">
    <!-- Animated gradient background -->
    <div class="absolute inset-0 rounded-3xl overflow-hidden">
      <div
        class="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-violet-500/10 to-purple-500/10
                   dark:from-primary-500/5 dark:via-violet-500/5 dark:to-purple-500/5
                   bg-[length:200%_200%] animate-gradient-shift"
      />
    </div>

    <!-- Content -->
    <div class="relative px-6 py-16 sm:py-24 text-center">
      <div class="animate-fade-in">
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
          <span class="gradient-text">前端面试</span>
          <span class="text-gray-900 dark:text-gray-100">知识体系</span>
        </h1>
        <p class="mt-4 text-lg sm:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          覆盖 React、Vue、JavaScript、TypeScript、CSS、浏览器原理、设计模式等
          <span class="font-semibold text-gray-700 dark:text-gray-300">18 个核心分类</span>
          的高频前端面试题库
        </p>
        <div class="mt-8 flex items-center justify-center gap-4">
          <a
            href="#categories"
            class="px-6 py-3 rounded-xl bg-primary-500 hover:bg-primary-600
                   text-white font-medium shadow-lg shadow-primary-500/25
                   hover:shadow-xl hover:shadow-primary-500/30
                   transition-all duration-300 hover:-translate-y-0.5"
          >
            浏览分类
          </a>
          <NuxtLink
            to="/search"
            class="px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-600
                   text-gray-700 dark:text-gray-300
                   hover:bg-gray-100 dark:hover:bg-gray-800
                   transition-all duration-300"
          >
            搜索文章
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
