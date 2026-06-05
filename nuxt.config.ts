import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-06-01',
  devtools: { enabled: true },

  components: {
    dirs: [
      { path: '~/components', pathPrefix: false },
    ],
  },

  ssr: true,
  nitro: {
    preset: 'node-server',
  },

  // Workaround: Nitro generates broken import.meta.url in prerender chunks
  // on Windows paths with CJK characters (e.g. "桌面").
  // We hook into the prerender Nitro instance's "compiled" event to patch the
  // generated file BEFORE it is loaded by import().
  hooks: {
    'nitro:init': (nitro: any) => {
      nitro.hooks.hook('prerender:init', (nitroRenderer: any) => {
        nitroRenderer.hooks.hook('compiled', () => {
          const prerenderNitro = resolve(
            nitroRenderer.options.buildDir,
            'prerender/chunks/_/nitro.mjs',
          )
          try {
            let content = readFileSync(prerenderNitro, 'utf-8')
            content = content.replace(
              'globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env}',
              'globalThis._importMeta_=globalThis._importMeta_||{url:import.meta.url,env:process.env}',
            )
            writeFileSync(prerenderNitro, content, 'utf-8')
            console.log('  ✓ Patched prerender nitro.mjs (CJK path workaround)')
          } catch {
            // File may not exist — that's OK
          }
        })
      })
    },
  },

  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxt/icon',
  ],

  content: {
    highlight: {
      theme: {
        default: 'github-light',
        dark: 'github-dark',
      },
      preload: ['ts', 'js', 'vue', 'html', 'css', 'tsx', 'jsx', 'json', 'bash', 'shell'],
    },
  },

  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light',
  },

  icon: {
    serverBundle: {
      collections: ['material-symbols', 'logos'],
    },
  },

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
