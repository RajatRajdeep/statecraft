import ListLayout from '@/layouts/ListLayoutWithTags'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allPublications } from 'contentlayer/generated'
import { getAuthorMap } from '@/data/authorMap'
import { notFound } from 'next/navigation'

export const POSTS_PER_PAGE = 5

export type PubFilter = 'all' | 'commentary' | 'book-review' | 'interview'

/** Draft-filtered, date-sorted core content for a given publication type. */
export function getPublications(filter: PubFilter) {
  const filtered =
    filter === 'all' ? allPublications : allPublications.filter((p) => p.pubType === filter)
  return allCoreContent(sortPosts(filtered))
}

/** Static params for a filter's paginated `page/[page]` route. */
export function pagesFor(filter: PubFilter) {
  const total = Math.ceil(getPublications(filter).length / POSTS_PER_PAGE)
  return Array.from({ length: total }, (_, i) => ({ page: (i + 1).toString() }))
}

/** Renders a single page of a filtered publication listing. */
export default function PublicationListPage({
  filter,
  title,
  pageNumber = 1,
}: {
  filter: PubFilter
  title: string
  pageNumber?: number
}) {
  const posts = getPublications(filter)
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
    />
  )
}
