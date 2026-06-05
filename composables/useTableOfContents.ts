export interface TOCItem {
  id: string
  text: string
  level: number
}

export function useTableOfContents() {
  const headings = ref<TOCItem[]>([])
  const activeId = ref<string>('')

  onMounted(() => {
    // Give the content time to render
    nextTick(() => {
      const article = document.querySelector('article')
      if (!article) return

      const elements = article.querySelectorAll('h2, h3')
      const items: TOCItem[] = []

      elements.forEach((el, index) => {
        const id = el.id || `heading-${index}`
        if (!el.id) el.id = id

        items.push({
          id,
          text: el.textContent ?? '',
          level: parseInt(el.tagName.charAt(1)),
        })
      })

      headings.value = items

      // Setup intersection observer
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              activeId.value = entry.target.id
              break
            }
          }
        },
        {
          rootMargin: '-80px 0px -60% 0px',
          threshold: 0,
        },
      )

      elements.forEach(el => observer.observe(el))

      onUnmounted(() => observer.disconnect())
    })
  })

  return {
    headings,
    activeId,
  }
}
