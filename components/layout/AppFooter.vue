<template>
  <footer class="border-t border-gray-200 dark:border-gray-800
                  bg-white dark:bg-gray-950 mt-auto">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500 dark:text-gray-400">
        <div class="flex items-center gap-2">
          <span class="font-medium gradient-text">前端面试个人博客</span>
          <span>© {{ new Date().getFullYear() }}</span>
        </div>
        <div class="flex items-center gap-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            <Icon name="logos:github-icon" class="w-5 h-5" />
          </a>
          <span class="text-xs">
            技术栈: Nuxt 3 + Vue 3 + Tailwind CSS
          </span>
        </div>
      </div>
    </div>
  </footer>
</template>
