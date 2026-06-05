<template>
  <div class="min-h-screen flex flex-col">
    <!-- Simplified header for article view -->
    <header
      class="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md"
    >
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-14">
          <NuxtLink to="/" class="flex items-center gap-2 group">
            <Icon
              name="material-symbols:arrow-back"
              class="w-5 h-5 text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors"
            />
            <span
              class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors"
              >返回首页</span
            >
          </NuxtLink>

          <div class="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>

    <!-- Article content with TOC -->
    <div class="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex gap-8">
        <!-- Main article -->
        <article class="flex-1 min-w-0">
          <slot />
        </article>

        <!-- Table of Contents (desktop) -->
        <TableOfContents class="hidden xl:block w-56 flex-shrink-0" />
      </div>
    </div>

    <AppFooter />
    <BackToTop />
  </div>
</template>
