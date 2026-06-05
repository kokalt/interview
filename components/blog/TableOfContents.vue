<template>
  <nav v-if="headings.length" class="sticky top-24">
    <h3 class="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4">
      目录
    </h3>
    <ul class="space-y-1 border-l border-gray-200 dark:border-gray-800">
      <li
        v-for="(heading, index) in headings"
        :key="heading.id"
      >
        <a
          :href="`#${heading.id}`"
          class="block py-1.5 text-sm transition-all duration-200 hover:text-primary-600 dark:hover:text-primary-400"
          :class="[
            heading.level === 3 ? 'pl-6' : 'pl-4',
            activeId === heading.id
              ? 'text-primary-600 dark:text-primary-400 border-l-2 border-primary-500 -ml-px'
              : 'text-gray-500 dark:text-gray-400',
          ]"
        >
          <span class="line-clamp-2">{{ index + 1 }}. {{ heading.text }}</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
const { headings, activeId } = useTableOfContents()
</script>
