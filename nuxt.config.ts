// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-06-01',
  devtools: { enabled: true },

  // Auto-import components without path prefix
  components: {
    dirs: [
      { path: '~/components', pathPrefix: false },
    ],
  },

  // Build: SSR + optional static prerender
  // Note: nuxi dev works perfectly; nuxi generate (SSG) may fail on Windows
  // paths with CJK characters due to a Nitro prerender bug.
  // Deploy to Vercel/Netlify which run on Linux to avoid this issue.
  ssr: true,

  // Nuxt modules
  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxt/icon',
  ],

  // Content module config (v2)
  content: {
    highlight: {
      theme: {
        default: 'github-light',
        dark: 'github-dark',
      },
      preload: ['ts', 'js', 'vue', 'html', 'css', 'tsx', 'jsx', 'json', 'bash', 'shell'],
    },
  },

  // Color mode config
  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light',
  },

  // Icon config
  icon: {
    serverBundle: {
      collections: ['material-symbols', 'logos'],
    },
  },

  // App config
  app: {
    head: {
      title: '前端面试个人博客',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '前端面试知识体系 — React、Vue、JavaScript、TypeScript、CSS、浏览器原理、设计模式等高频面试题' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      ],
      htmlAttrs: {
        lang: 'zh-CN',
      },
    },
  },
})
