import type { ReactNode } from 'react'
import ListLayout from '@/layouts/ListLayoutWithTags'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allPublications } from 'contentlayer/generated'
import { getAuthorMap } from '@/data/authorMap'
import { notFound } from 'next/navigation'

export const POSTS_PER_PAGE = 5

export type PubFilter = 'all' | 'commentary' | 'book-review' | 'interview' | 'research'

/**
 * Draft-filtered, date-sorted core content for a given publication type.
 *
 * Research papers live in their own top-level Research Projects section, so the
 * `all` filter — which backs /publications — deliberately excludes them.
 *
 * When a `series` slug is supplied the list is narrowed to that series and
 * ordered by `seriesOrder` ascending ("Part 1, Part 2…"). Papers without a
 * `seriesOrder` sort after the numbered ones, keeping their date order.
 */
export function getPublications(filter: PubFilter, series?: string) {
  let filtered =
    filter === 'all'
      ? allPublications.filter((p) => p.pubType !== 'research')
      : allPublications.filter((p) => p.pubType === filter)
  if (series) {
    filtered = filtered.filter((p) => p.series === series)
  }
  const sorted = allCoreContent(sortPosts(filtered))
  if (!series) return sorted
  return sorted.sort((a, b) => {
    const ao = typeof a.seriesOrder === 'number' ? a.seriesOrder : Infinity
    const bo = typeof b.seriesOrder === 'number' ? b.seriesOrder : Infinity
    return ao - bo
  })
}

/** Static params for a filter's paginated `page/[page]` route. */
export function pagesFor(filter: PubFilter, series?: string) {
  const total = Math.ceil(getPublications(filter, series).length / POSTS_PER_PAGE)
  return Array.from({ length: total }, (_, i) => ({ page: (i + 1).toString() }))
}

/** Renders a single page of a filtered publication listing. */
export default function PublicationListPage({
  filter,
  title,
  pageNumber = 1,
  series,
  intro,
}: {
  filter: PubFilter
  title: string
  pageNumber?: number
  series?: string
  intro?: ReactNode
}) {
  const posts = getPublications(filter, series)
  const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE))

  if (pageNumber < 1 || pageNumber > totalPages || Number.isNaN(pageNumber)) {
    return notFound()
  }

  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )

  return (
    <ListLayout
      posts={posts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={{ currentPage: pageNumber, totalPages }}
      title={title}
      authorsBySlug={getAuthorMap()}
      intro={intro}
    />
  )
}
