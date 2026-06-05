import type { ArticleMeta } from './useArticles'

let fuseInstance: any = null
let articlesCache: ArticleMeta[] = []

async function getFuse() {
  const FuseModule = await import('fuse.js')
  return FuseModule.default
}

async function initIndex(articles: ArticleMeta[]) {
  if (fuseInstance && articlesCache === articles) return

  const Fuse = await getFuse()
  articlesCache = articles

  fuseInstance = new Fuse(articles, {
    keys: [
      { name: 'title', weight: 2 },
      { name: 'description', weight: 1.5 },
      { name: 'tags', weight: 1.2 },
      { name: 'category', weight: 0.8 },
    ],
    threshold: 0.4,
    distance: 100,
    includeMatches: true,
    minMatchCharLength: 1,
  })
}

export function useSearch() {
  const query = ref('')
  const results = ref<ArticleMeta[]>([])
  const isSearching = ref(false)

  async function search(searchQuery: string) {
    query.value = searchQuery

    if (!searchQuery.trim()) {
      results.value = []
      return
    }

    // Fetch articles for indexing if not already cached
    if (!fuseInstance) {
      isSearching.value = true
      try {
        const articles = await queryContent<ArticleMeta>()
          .only(['title', 'description', 'category', 'tags', 'date', 'difficulty', 'image', '_path', '_id'])
          .sort({ date: -1 })
          .find()

        await initIndex(articles)
      } catch (e) {
        console.error('Failed to load search index:', e)
        results.value = []
        return
      } finally {
        isSearching.value = false
      }
    }

    const fuseResults = fuseInstance.search(searchQuery)
    results.value = fuseResults.map((r: any) => r.item) as ArticleMeta[]
  }

  function clear() {
    query.value = ''
    results.value = []
  }

  return {
    query,
    results,
    isSearching,
    search,
    clear,
  }
}
