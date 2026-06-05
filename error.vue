<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
    <div class="text-center max-w-md">
      <!-- Animated error icon -->
      <div class="mb-8 animate-fade-in">
        <div v-if="error.statusCode === 404" class="text-8xl font-extrabold gradient-text">
          404
        </div>
        <div v-else class="text-6xl mb-4">
          😿
        </div>
      </div>

      <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2 animate-slide-up">
        {{ error.statusCode === 404 ? '页面不存在' : '出错了' }}
      </h1>

      <p class="text-gray-500 dark:text-gray-400 mb-8 animate-slide-up" style="animation-delay: 0.1s">
        {{ error.statusCode === 404
          ? '您访问的页面可能已被移除或链接失效'
          : error.message || '发生了意外错误，请稍后再试'
        }}
      </p>

      <div class="flex items-center justify-center gap-4 animate-slide-up" style="animation-delay: 0.2s">
        <NuxtLink
          to="/"
          class="px-6 py-3 rounded-xl bg-primary-500 hover:bg-primary-600
                 text-white font-medium shadow-lg shadow-primary-500/25
                 transition-all duration-300 hover:-translate-y-0.5"
        >
          返回首页
        </NuxtLink>
        <button
          class="px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-600
                 text-gray-700 dark:text-gray-300
                 hover:bg-gray-100 dark:hover:bg-gray-800
                 transition-all duration-300"
          @click="handleError"
        >
          重试
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  error: {
    statusCode: number
    message: string
  }
}>()

function handleError() {
  clearError({ redirect: '/' })
}
</script>
