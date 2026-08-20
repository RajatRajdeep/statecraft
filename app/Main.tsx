import Image from '@/components/Image'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import Button from '@/components/Button'
import CategoryBadge from '@/components/CategoryBadge'
import AuthorCard from '@/components/AuthorCard'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from '@/data/formatDate'
import { getAuthorMap, resolveAuthors } from '@/data/authorMap'
import { getSeries } from '@/data/researchSeriesData'

const MAX_DISPLAY = 6

export default function Home({ posts }) {
  const authorMap = getAuthorMap()
  return (
    <>
      {/* Hero Section — full viewport width */}
      <div className="full-bleed bg-navy mb-12 px-4 py-20 text-white sm:px-8 lg:px-16">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-gold mb-4 text-sm font-semibold tracking-widest uppercase">
            The Statecraft Institute
          </p>
          <h1 className="mb-6 text-4xl leading-tight font-bold md:text-5xl">
            Calibrating Power. Interpreting Strategy
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-300">
            In-depth research and strategic analysis on geopolitics, statecraft, and international
            relations.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/publications" variant="primary">
              Read Publications
            </Button>
            <Button href="/write-for-us" variant="outline">
              Write For Us
            </Button>
          </div>
        </div>
      </div>

      {/* Latest Commentaries — full viewport width */}
      <div className="full-bleed px-4 py-12 sm:px-8 lg:px-16 xl:px-24">
        <div className="mx-auto max-w-screen-2xl">
          <div className="mb-8">
            <h2 className="text-navy border-gold inline-block border-b-2 pb-2 text-2xl font-bold dark:text-gray-100">
              Latest Publications
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {!posts.length && <p className="text-gray-500">No posts found.</p>}
            {posts.slice(0, MAX_DISPLAY).map((post) => {
              const { slug, path, date, title, summary, tags, images, pubType, authors, series } =
                post
              const postAuthors = resolveAuthors(authors, authorMap)
              const seriesEntry = series ? getSeries(series) : undefined
              return (
                <article
                  key={slug}
                  className="overflow-hidden rounded-lg border border-gray-200 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700"
                >
                  {images && images[0] && (
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={images[0]}
                        alt={title}
                        width={400}
                        height={192}
                        className="h-full w-full object-cover"
                      />
                      <CategoryBadge
                        type={pubType}
                        variant="overlay"
                        className="absolute top-3 left-3"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    {(!images || !images[0]) && <CategoryBadge type={pubType} className="mb-2" />}
                    <h3 className="mb-2 text-lg leading-snug font-bold">
                      <Link
                        href={`/${path}`}
                        className="text-navy hover:text-gold transition-colors dark:text-gray-100"
                      >
                        {title}
                      </Link>
                    </h3>
                    {tags.length > 0 && (
                      <div className="mb-2 flex flex-wrap gap-x-1 gap-y-1">
                        {tags.slice(0, 2).map((tag) => (
                          <Tag key={tag} text={tag} />
                        ))}
                      </div>
                    )}
                    {seriesEntry && (
                      <Link
                        href={`/research-projects/${seriesEntry.slug}`}
                        prefetch={false}
                        className="border-gold hover:text-gold mb-2 inline-flex items-center border-l-2 pl-2 text-[10px] font-bold tracking-[0.18em] text-gray-900 uppercase transition-colors dark:text-gray-100"
                      >
                        {seriesEntry.title}
                      </Link>
                    )}
                    <p className="mb-3 line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
                      {summary}
                    </p>
                    {postAuthors.length > 0 && (
                      <AuthorCard authors={postAuthors} className="mb-4" />
                    )}
                    <div className="flex items-center justify-between">
                      <time className="text-xs text-gray-400" dateTime={date}>
                        {formatDate(date)}
                      </time>
                      <Link
                        href={`/${path}`}
                        className="text-gold text-xs font-semibold hover:underline"
                      >
                        Read more →
                      </Link>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
          {posts.length > MAX_DISPLAY && (
            <div className="mt-8 text-center">
              <Button href="/publications" variant="secondary">
                View All Publications →
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
