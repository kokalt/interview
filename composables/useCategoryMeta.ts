export interface CategoryMeta {
  slug: string
  name: string
  icon: string
  gradient: string
  badge: string
  description: string
}

export const categories: CategoryMeta[] = [
  {
    slug: 'react',
    name: 'React 高频面试题',
    icon: 'logos:react',
    gradient: 'gradient-react',
    badge: 'badge-react',
    description: 'React 核心概念、Hooks、状态管理、性能优化等高频面试题',
  },
  {
    slug: 'javascript',
    name: 'JavaScript 系列知识点',
    icon: 'logos:javascript',
    gradient: 'gradient-javascript',
    badge: 'badge-javascript',
    description: 'JS 基础、原型链、闭包、异步编程等核心知识',
  },
  {
    slug: 'browser',
    name: '浏览器原理核心知识点',
    icon: 'material-symbols:language',
    gradient: 'gradient-browser',
    badge: 'badge-browser',
    description: '浏览器渲染流程、DOM 解析、重绘回流、V8 引擎等',
  },
  {
    slug: 'vue',
    name: 'Vue 高频面试题',
    icon: 'logos:vue',
    gradient: 'gradient-vue',
    badge: 'badge-vue',
    description: 'Vue 响应式原理、虚拟 DOM、组合式 API、Vue Router 等',
  },
  {
    slug: 'typescript',
    name: 'TypeScript 核心知识点',
    icon: 'logos:typescript-icon',
    gradient: 'gradient-typescript',
    badge: 'badge-typescript',
    description: '类型系统、泛型、工具类型、类型体操等核心知识',
  },
  {
    slug: 'css',
    name: 'CSS 面试题库',
    icon: 'logos:css-3',
    gradient: 'gradient-css',
    badge: 'badge-css',
    description: 'Flex 布局、Grid 布局、BFC、层叠上下文、动画等',
  },
  {
    slug: 'html',
    name: 'HTML 面试题库',
    icon: 'logos:html-5',
    gradient: 'gradient-html',
    badge: 'badge-html',
    description: '语义化标签、表单、SEO、离线存储、Canvas 等',
  },
  {
    slug: 'es6',
    name: 'ES6 高频面试题',
    icon: 'material-symbols:code-blocks',
    gradient: 'gradient-es6',
    badge: 'badge-es6',
    description: '箭头函数、解构、Promise、模块化、Proxy 等 ES6+ 特性',
  },
  {
    slug: 'handwriting',
    name: 'JS 手写题',
    icon: 'material-symbols:draw',
    gradient: 'gradient-handwriting',
    badge: 'badge-handwriting',
    description: '手写 call/apply/bind、深拷贝、防抖节流、Promise 等',
  },
  {
    slug: 'nodejs',
    name: 'NodeJS 面试题',
    icon: 'logos:nodejs-icon',
    gradient: 'gradient-nodejs',
    badge: 'badge-nodejs',
    description: '事件循环、模块系统、流、中间件、进程管理等',
  },
  {
    slug: 'typescript-interview',
    name: 'TypeScript 面试题',
    icon: 'logos:typescript-icon',
    gradient: 'gradient-typescript-interview',
    badge: 'badge-typescript-interview',
    description: 'TypeScript 实战面试题、类型挑战、工程实践',
  },
  {
    slug: 'cs-fundamentals',
    name: '计算机网络 / 操作系统 / 数据结构',
    icon: 'material-symbols:account-tree',
    gradient: 'gradient-cs-fundamentals',
    badge: 'badge-cs-fundamentals',
    description: 'HTTP/HTTPS、TCP/UDP、进程线程、基本数据结构与算法',
  },
  {
    slug: 'event-loop',
    name: '理解事件循环',
    icon: 'material-symbols:repeat',
    gradient: 'gradient-event-loop',
    badge: 'badge-event-loop',
    description: '宏任务/微任务、Node.js 事件循环、requestAnimationFrame',
  },
  {
    slug: 'security',
    name: '前端安全相关面试题',
    icon: 'material-symbols:security',
    gradient: 'gradient-security',
    badge: 'badge-security',
    description: 'XSS、CSRF、CSP、SQL 注入、点击劫持等安全问题',
  },
  {
    slug: 'engineering',
    name: '前端工程化面试题库',
    icon: 'material-symbols:engineering',
    gradient: 'gradient-engineering',
    badge: 'badge-engineering',
    description: 'Webpack/Vite、CI/CD、Monorepo、自动化测试、代码规范',
  },
  {
    slug: 'miniprogram',
    name: '前端小程序八股文',
    icon: 'material-symbols:smartphone',
    gradient: 'gradient-miniprogram',
    badge: 'badge-miniprogram',
    description: '微信小程序、双线程架构、性能优化、Taro/uni-app',
  },
  {
    slug: 'performance',
    name: '前端性能优化面试题',
    icon: 'material-symbols:speed',
    gradient: 'gradient-performance',
    badge: 'badge-performance',
    description: '加载优化、渲染优化、缓存策略、懒加载、虚拟列表等',
  },
  {
    slug: 'design-patterns',
    name: '设计模式',
    icon: 'material-symbols:pattern',
    gradient: 'gradient-design-patterns',
    badge: 'badge-design-patterns',
    description: '单例/工厂/观察者/策略模式、SOLID 原则等常见设计模式',
  },
]

export function useCategoryMeta() {
  function getCategory(slug: string): CategoryMeta | undefined {
    return categories.find(c => c.slug === slug)
  }

  function getCategoryName(slug: string): string {
    return getCategory(slug)?.name ?? slug
  }

  function getCategoryIcon(slug: string): string {
    return getCategory(slug)?.icon ?? 'material-symbols:article'
  }

  function getCategoryGradient(slug: string): string {
    return getCategory(slug)?.gradient ?? 'gradient-design-patterns'
  }

  return {
    categories,
    getCategory,
    getCategoryName,
    getCategoryIcon,
    getCategoryGradient,
  }
}
