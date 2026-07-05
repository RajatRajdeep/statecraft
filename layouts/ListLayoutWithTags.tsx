'use client'

import { usePathname } from 'next/navigation'
import { slug } from 'github-slugger'
import { formatDate } from '@/data/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Publication } from 'contentlayer/generated'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import CategoryBadge from '@/components/CategoryBadge'
import CategoryTabs from '@/components/CategoryTabs'
import AuthorCard from '@/components/AuthorCard'
import type { AuthorInfo } from '@/data/authorMap'
import { resolveAuthors } from '@/data/authorMap'
import siteMetadata from '@/data/siteMetadata'
import tagData from 'app/tag-data.json'

interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface ListLayoutProps {
  posts: CoreContent<Publication>[]
  title: string
  initialDisplayPosts?: CoreContent<Publication>[]
  pagination?: PaginationProps
  authorsBySlug?: Record<string, AuthorInfo>
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const segments = pathname.split('/')
  const lastSegment = segments[segments.length - 1]
  const basePath = pathname
    .replace(/^\//, '') // Remove leading slash
    .replace(/\/page\/\d+\/?$/, '') // Remove any trailing /page
    .replace(/\/$/, '') // Remove trailing slash
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="pt-8 pb-10">
      <nav className="flex items-center justify-between">
        {!prevPage ? (
          <span className="cursor-not-allowed text-base font-semibold text-gray-300 dark:text-gray-600">
            &larr; Previous
          </span>
        ) : (
          <Link
            href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
            rel="prev"
            className="text-base font-semibold text-[#1a3a5c] transition-colors hover:text-[#c9a84c] dark:text-gray-300 dark:hover:text-[#c9a84c]"
          >
            &larr; Previous
          </Link>
        )}
        <span className="text-base font-semibold text-[#1a3a5c] dark:text-gray-300">
          {currentPage} of {totalPages}
        </span>
        {!nextPage ? (
          <span className="cursor-not-allowed text-base font-semibold text-gray-300 dark:text-gray-600">
            Next &rarr;
          </span>
        ) : (
          <Link
            href={`/${basePath}/page/${currentPage + 1}`}
            rel="next"
            className="text-base font-semibold text-[#1a3a5c] transition-colors hover:text-[#c9a84c] dark:text-gray-300 dark:hover:text-[#c9a84c]"
          >
            Next &rarr;
          </Link>
        )}
      </nav>
    </div>
  )
}

export default function ListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
  authorsBySlug = {},
}: ListLayoutProps) {
  const pathname = usePathname()
  // On a single-type listing (e.g. /publications/commentaries) every row is the
  // same type, so the badge is redundant — only show it where types are mixed
  // (the "all" listing and tag pages).
  const singleTypeListing = /^\/publications\/(commentaries|book-reviews|interviews)(\/|$)/.test(
    pathname
  )
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8 xl:px-0">
        <div className="pt-6 pb-6">
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:hidden sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
            {title}
          </h1>
        </div>
        <div className="flex sm:space-x-24">
          <div className="hidden h-full max-h-screen max-w-[280px] min-w-[280px] flex-wrap overflow-auto rounded-sm bg-gray-50 pt-5 shadow-md sm:flex dark:bg-gray-900/70 dark:shadow-gray-800/40">
            <div className="px-6 py-4">
              {pathname.startsWith('/publications') ? (
                <h3 className="text-primary-500 font-bold uppercase">All Posts</h3>
              ) : (
                <Link
                  href={`/publications`}
                  className="hover:text-primary-500 dark:hover:text-primary-500 font-bold text-gray-700 uppercase dark:text-gray-300"
                >
                  All Posts
                </Link>
              )}
              <ul>
                {sortedTags.map((t) => {
                  return (
                    <li key={t} className="my-3">
                      {decodeURI(pathname.split('/tags/')[1]) === slug(t) ? (
                        <h3 className="text-primary-500 inline px-3 py-2 text-sm font-bold uppercase">
                          {`${t} (${tagCounts[t]})`}
                        </h3>
                      ) : (
                        <Link
                          href={`/tags/${slug(t)}`}
                          className="hover:text-primary-500 dark:hover:text-primary-500 px-3 py-2 text-sm font-medium text-gray-500 uppercase dark:text-gray-300"
                          aria-label={`View posts tagged ${t}`}
                        >
                          {`${t} (${tagCounts[t]})`}
                        </Link>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
          <div className="mx-8 w-full">
            {pathname.startsWith('/publications') && <CategoryTabs />}
            <ul>
              {displayPosts.map((post) => {
                const { path, date, title, summary, tags, pubType, authors } = post
                const postAuthors = resolveAuthors(authors, authorsBySlug)
                return (
                  <li
                    key={path}
                    className="border-b border-gray-200 py-6 last:border-0 dark:border-gray-700"
                  >
                    <article className="flex flex-col space-y-2 xl:space-y-0">
                      <dl>
                        <dt className="sr-only">Published on</dt>
                        <dd className="flex items-center gap-3 text-base leading-6 font-medium text-gray-500 dark:text-gray-400">
                          <time dateTime={date} suppressHydrationWarning>
                            {formatDate(date)}
                          </time>
                          {!singleTypeListing && (
                            <CategoryBadge type={pubType} variant="chip" className="ml-auto" />
                          )}
                        </dd>
                      </dl>
                      <div className="space-y-3">
                        <div>
                          <h2 className="text-2xl leading-8 font-bold tracking-tight">
                            <Link href={`/${path}`} className="text-gray-900 dark:text-gray-100">
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            {tags?.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                          {summary}
                        </div>
                        {postAuthors.length > 0 && <AuthorCard authors={postAuthors} />}
                      </div>
                    </article>
                  </li>
                )
              })}
            </ul>
            {pagination && pagination.totalPages > 1 && (
              <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
