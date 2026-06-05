<template>
  <Transition name="modal">
    <button
      v-show="show"
      class="fixed bottom-8 right-8 z-40 w-10 h-10 rounded-full
             bg-primary-500 hover:bg-primary-600 text-white
             shadow-lg hover:shadow-xl
             flex items-center justify-center
             transition-all duration-300 hover:scale-110
             focus:outline-none focus:ring-2 focus:ring-primary-400"
      aria-label="回到顶部"
      @click="scrollToTop"
    >
      <Icon name="material-symbols:keyboard-arrow-up" class="w-6 h-6" />
    </button>
  </Transition>
</template>

<script setup lang="ts">
const show = ref(false)

function onScroll() {
  show.value = window.scrollY > 300
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>
