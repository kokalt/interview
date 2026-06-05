<template>
  <Teleport to="body">
    <!-- Backdrop -->
    <Transition name="modal">
      <div
        v-show="modelValue"
        class="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm lg:hidden"
        @click="$emit('update:modelValue', false)"
      />
    </Transition>

    <!-- Drawer -->
    <Transition name="modal-content">
      <div
        v-show="modelValue"
        class="fixed top-0 left-0 bottom-0 z-[70] w-72
               bg-white dark:bg-gray-950
               shadow-2xl shadow-black/20
               lg:hidden overflow-y-auto"
      >
        <div class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
          <span class="text-lg font-bold gradient-text">前端面试</span>
          <button
            class="w-9 h-9 rounded-lg flex items-center justify-center
                   hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="关闭菜单"
            @click="$emit('update:modelValue', false)"
          >
            <Icon name="material-symbols:close" class="w-5 h-5" />
          </button>
        </div>

        <nav class="p-3 space-y-1">
          <NuxtLink
            to="/"
            class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                   text-gray-600 dark:text-gray-400
                   hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            @click="$emit('update:modelValue', false)"
          >
            <Icon name="material-symbols:home" class="w-5 h-5 flex-shrink-0" />
            <span>首页</span>
          </NuxtLink>

          <div class="pt-4 pb-2">
            <h2 class="px-3 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
              分类导航
            </h2>
          </div>

          <NuxtLink
            v-for="cat in categories"
            :key="cat.slug"
            :to="`/categories/${cat.slug}`"
            class="flex items-center gap-3 px-3 py-2 rounded-xl text-sm
                   text-gray-600 dark:text-gray-400
                   hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            @click="$emit('update:modelValue', false)"
          >
            <Icon :name="cat.icon" class="w-5 h-5 flex-shrink-0" />
            <span class="truncate">{{ cat.name }}</span>
          </NuxtLink>
        </nav>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: boolean
}>()

defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const { categories } = useCategoryMeta()
</script>
