// Shared type for article metadata (without full body AST)
export interface ArticleMeta {
  _path: string
  _id: string
  title: string
  description: string
  category: string
  tags: string[]
  date: string
  difficulty: 'easy' | 'medium' | 'hard'
  image?: string
}

// Helper to query articles list
export async function useArticlesQuery() {
  const { data, status, error } = await useAsyncData('articles-list', () => {
    return queryContent<ArticleMeta>()
      .only(['title', 'description', 'category', 'tags', 'date', 'difficulty', 'image', '_path', '_id'])
      .sort({ date: -1 })
      .find()
  })

  return {
    articles: computed<ArticleMeta[]>(() => data.value ?? []),
    pending: computed(() => status.value === 'pending'),
    error,
  }
}

// Helper to query articles by category
export async function useCategoryArticles(slug: string) {
  const { data, status, error } = await useAsyncData(`category-${slug}`, () => {
    return queryContent<ArticleMeta>()
      .only(['title', 'description', 'category', 'tags', 'date', 'difficulty', 'image', '_path', '_id'])
      .where({ category: slug })
      .sort({ date: -1 })
      .find()
  })

  return {
    articles: computed<ArticleMeta[]>(() => data.value ?? []),
    pending: computed(() => status.value === 'pending'),
    error,
  }
}

// Helper to get a single article by path
export async function useArticle(path: string) {
  const fullPath = path.startsWith('/') ? path : `/${path}`

  const { data, status, error } = await useAsyncData(`article-${fullPath}`, () => {
    return queryContent(fullPath).findOne()
  })

  return {
    article: computed(() => data.value),
    pending: computed(() => status.value === 'pending'),
    error,
  }
}
