<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader @toggle-mobile-nav="mobileNavOpen = !mobileNavOpen" />

    <div class="flex-1 flex max-w-7xl mx-auto w-full">
      <!-- Sidebar (desktop) -->
      <AppSidebar />

      <!-- Main content area -->
      <main class="flex-1 min-w-0 px-4 sm:px-6 lg:px-8 py-8">
        <slot />
      </main>
    </div>

    <AppFooter />

    <!-- Mobile navigation -->
    <MobileNav v-model="mobileNavOpen" />

    <!-- Back to top -->
    <BackToTop />
  </div>
</template>

<script setup lang="ts">
const mobileNavOpen = ref(false)
</script>
